// path: types/index.ts

export interface SensorFrame {
  deviceId: string;
  timestamp: number;
  sequence?: number[][];
  features?: Record<string, number>;
  meta?: Record<string, unknown>;
}

export interface GestureResult {
  label: string;
  confidence: number;
  ts: number;
}

export interface MLInferenceResult {
  label: string;
  confidence: number;
}

export interface DBGestureRecord extends SensorFrame {
  _id?: string;
  result?: GestureResult;
  createdAt: Date;
}