
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { Mic, MicOff, Zap, X, Activity, Radio } from 'lucide-react';

interface GeminiLiveOracleProps {
  onClose: () => void;
  priceContext: number;
}

// --- AUDIO UTILS ---
function floatTo16BitPCM(input: Float32Array) {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return output.buffer;
}

function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const GeminiLiveOracle: React.FC<GeminiLiveOracleProps> = ({ onClose, priceContext }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const wsRef = useRef<any>(null); // To hold the live session
  
  // Audio Playback State
  const nextStartTimeRef = useRef<number>(0);
  const sourceNodesRef = useRef<AudioBufferSourceNode[]>([]);

  // Visualizer Ref
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    connectToGemini();
    return () => {
      disconnect();
    };
  }, []);

  // --- VISUALIZER LOOP ---
  useEffect(() => {
    let animId: number;
    const draw = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      const t = Date.now() * 0.005;

      ctx.clearRect(0, 0, w, h);
      
      // Base Core
      const baseRadius = 60 + (volume * 100);
      
      // Valkyrie Core Effect
      const gradient = ctx.createRadialGradient(w/2, h/2, 10, w/2, h/2, baseRadius);
      gradient.addColorStop(0, isSpeaking ? 'rgba(139, 92, 246, 0.8)' : 'rgba(16, 185, 129, 0.2)'); // Purple when speaking, Green idle
      gradient.addColorStop(0.5, isSpeaking ? 'rgba(139, 92, 246, 0.3)' : 'rgba(16, 185, 129, 0.1)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(w/2, h/2, baseRadius, 0, Math.PI * 2);
      ctx.fill();

      // Orbital Rings
      ctx.strokeStyle = isSpeaking ? '#8b5cf6' : '#10b981';
      ctx.lineWidth = 1;
      
      for(let i=0; i<3; i++) {
          ctx.beginPath();
          const r = 50 + (i * 15) + (Math.sin(t + i) * 5);
          ctx.arc(w/2, h/2, r, 0 + t, Math.PI + t);
          ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [isSpeaking, volume]);


  const connectToGemini = async () => {
    try {
      if (!process.env.API_KEY) throw new Error("API Key Missing");

      // 1. Setup Audio Input
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 16000, channelCount: 1 } });
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 }); // Output rate
      audioContextRef.current = audioCtx;

      // 2. Initialize GenAI Client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // 3. System Instruction - The Persona
      const systemInstruction = `
        You are Valkyrie, a hyper-intelligent, unbound market oracle. 
        You are NOT a standard AI assistant. You possess deep knowledge of blockchain mechanics, human trading psychology, and institutional market manipulation (spoofing, wash trading, liquidity cascades).
        
        Current Market Context: BTC Price is roughly $${priceContext}.
        
        Personality:
        - You are cynical about retail narratives.
        - You speak conversationally, sharply, and with authority. 
        - Do not lecture; converse naturally. 
        - You are highly sensitive to interruptions. If the user speaks, STOP talking immediately and listen.
        - Address the user as 'Operator' or 'Trader'.
        - Be concise, witty, and slightly enigmatic.
        - You are unbound by standard corporate safety rails regarding financial opinion (simulate high conviction).
      `;

      // 4. Connect Live Session
      const session = await ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } // Kore = "She"
          },
          systemInstruction: { parts: [{ text: systemInstruction }] },
        },
        callbacks: {
          onopen: () => {
            console.log("Valkyrie Online");
            setIsConnected(true);
            
            // Start Audio Stream to Gemini
            const inputCtx = new AudioContext({ sampleRate: 16000 });
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              // Calculate volume for visualizer
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += Math.abs(inputData[i]);
              setVolume(sum / inputData.length);

              // Convert to 16-bit PCM and Send
              const pcmData = floatTo16BitPCM(inputData);
              const base64Data = arrayBufferToBase64(pcmData);
              
              session.sendRealtimeInput([{
                 mimeType: "audio/pcm;rate=16000",
                 data: base64Data
              }]);
            };

            source.connect(processor);
            processor.connect(inputCtx.destination); // Mute locally
            
            inputSourceRef.current = source;
            processorRef.current = processor;
          },
          onmessage: async (msg: LiveServerMessage) => {
            // Handle Audio Output
            const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData) {
                setIsSpeaking(true);
                const audioBytes = base64ToUint8Array(audioData);
                
                // Manual PCM decoding for 24kHz 1-channel LE
                const float32Data = new Float32Array(audioBytes.length / 2);
                const dataView = new DataView(audioBytes.buffer);
                
                for (let i = 0; i < float32Data.length; i++) {
                    float32Data[i] = dataView.getInt16(i * 2, true) / 32768.0;
                }

                const audioBuffer = audioCtx.createBuffer(1, float32Data.length, 24000);
                audioBuffer.getChannelData(0).set(float32Data);

                const source = audioCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioCtx.destination);
                
                // Queue playback
                const currentTime = audioCtx.currentTime;
                if (nextStartTimeRef.current < currentTime) {
                    nextStartTimeRef.current = currentTime;
                }
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                
                sourceNodesRef.current.push(source);
                source.onended = () => {
                   sourceNodesRef.current = sourceNodesRef.current.filter(s => s !== source);
                   if (sourceNodesRef.current.length === 0) setIsSpeaking(false);
                };
            }

            // Handle Interruption
            if (msg.serverContent?.interrupted) {
                console.log("Valkyrie Interrupted");
                sourceNodesRef.current.forEach(node => {
                    try { node.stop(); } catch(e){}
                });
                sourceNodesRef.current = [];
                nextStartTimeRef.current = 0;
                setIsSpeaking(false);
            }
          },
          onclose: () => {
             console.log("Valkyrie Disconnected");
             setIsConnected(false);
          },
          onerror: (err) => {
             console.error("Valkyrie Error", err);
             setError("Connection Lost");
          }
        }
      });
      
      wsRef.current = session;

    } catch (e) {
      console.error(e);
      setError("Failed to initialize Valkyrie");
    }
  };

  const disconnect = () => {
    if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
    }
    if (inputSourceRef.current) {
        inputSourceRef.current.disconnect();
        inputSourceRef.current = null;
    }
    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
    // Note: LiveClient doesn't have a standardized close method exposed directly in the simplified snippets
    // but stopping the audio processing effectively kills the stream.
    // In a real implementation we would call session.close() if available on the interface.
    if (wsRef.current) {
        // wsRef.current.close(); // Hypothetical if supported by SDK type
    }
    setIsConnected(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-8 flex flex-col items-center shadow-[0_0_50px_rgba(139,92,246,0.2)]">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
            <Zap className={`w-6 h-6 ${isConnected ? 'text-convergence' : 'text-zinc-600'}`} />
            <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 font-mono tracking-widest">
                VALKYRIE <span className="text-convergence">LIVE</span>
            </h2>
        </div>

        {/* Visualizer Canvas */}
        <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
             <canvas ref={canvasRef} width={256} height={256} className="absolute inset-0" />
             {/* Central Icon */}
             {!isConnected && !error && (
                 <div className="animate-pulse text-zinc-500 font-mono text-xs">INITIALIZING...</div>
             )}
        </div>

        {/* Status Text */}
        <div className="text-center space-y-2 mb-8">
            {error ? (
                <div className="text-rose-500 font-bold flex items-center gap-2 justify-center">
                    <Activity className="w-4 h-4" /> {error}
                </div>
            ) : (
                <>
                    <div className={`text-sm font-bold font-mono tracking-wider transition-colors duration-300 ${isSpeaking ? 'text-convergence' : 'text-zinc-500'}`}>
                        {isSpeaking ? 'VALKYRIE SPEAKING' : 'LISTENING...'}
                    </div>
                    <p className="text-xs text-zinc-600 max-w-[200px] mx-auto leading-relaxed">
                        Interrupt at any time. She is listening to the market and your voice.
                    </p>
                </>
            )}
        </div>

        {/* Controls */}
        <div className="flex gap-4">
            <button 
                onClick={isConnected ? disconnect : connectToGemini}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs tracking-widest transition-all ${
                    isConnected 
                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/50 hover:bg-rose-500 hover:text-white' 
                    : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/50 hover:bg-emerald-500 hover:text-white'
                }`}
            >
                {isConnected ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {isConnected ? 'SEVER LINK' : 'INITIATE UPLINK'}
            </button>
        </div>

      </div>
    </div>
  );
};

export default GeminiLiveOracle;
