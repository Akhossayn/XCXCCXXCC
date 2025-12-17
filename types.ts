
export type IndicatorType = 'ALPHA' | 'OMEGA' | 'ACCELERATION' | 'POWER_ALPHA' | 'EXECUTION_PROTOCOL' | 'MACRO_EVENT';

export interface AnalysisPayload {
    condition: string;     // e.g. "Retail Trapped"
    bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    trigger: string;       // e.g. "> 2.0M Delta"
    invalidation: string;  // e.g. "Close below 90k"
    strategy: string;      // e.g. "Squeeze imminent. Hold."
}

export interface MetricData {
  id: string;
  title: string;
  type: IndicatorType;
  tag: 'ALP' | 'OME' | 'ACC';
  value: number; // Normalized 0-1 for the chart/gauge fill
  displayValue: string; // Real number string (e.g. "$2.4M")
  unit?: string; // Unit label (e.g. "VOL", "DELTA")
  description: string;
  chartType?: 'area' | 'bar' | 'gauge'; 
  chartData: { value: number; opacity?: number }[];
  analysis?: AnalysisPayload; // New payload for detailed view
  isOptimal?: boolean; // For confluence scoring
}

export interface WeightingRow {
  indicator: string;
  type: IndicatorType;
  weight: number;
  description: string;
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface LiquidityWall {
  id: string;
  price: number;
  volume: number;
  cumulative_vol: number;
  type: 'BID' | 'ASK';
  spoofed_volume: number;
  hidden_volume: number;
  is_dark: boolean;
  is_void: boolean;
  aggressor_vol?: number; 
}

export interface LiquidationEvent {
  price: number;
  volume: number;
  side: 'LONG' | 'SHORT';
  time: string;
  leverage: string;
}

export interface Alert {
    id: string;
    time: string;
    type: 'CRITICAL' | 'WARNING' | 'EXECUTION' | 'OPPORTUNITY';
    msg: string;
}

export interface TowerData {
    name: string;
    align: number; // 0-100
    status: 'SYNCED' | 'LAGGING' | 'OFFLINE';
    bias: 'LONG' | 'SHORT' | 'NEUTRAL';
    cvd: string;
}

export interface LongShortRatio {
  timeframe: string;
  longs: number;
  shorts: number;
  longVol: number;
  shortVol: number;
}
