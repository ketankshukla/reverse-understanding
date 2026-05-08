export type RoundKey = 'r1' | 'r2' | 'qf' | 'sf' | 'final';

export interface Match {
  id: number;
  p1: string;
  p2: string;
  winner?: string;
  score?: string;
  seed1?: number;
}

export interface Team {
  name: string;
  icon: string;
  accent: string;
  color: string;
  motto: string;
  r1: string[];
  r2: string[];
  qf: string[];
  sf: string[];
  final: string;
}

export interface PlayerInfo {
  country: string;
  seed: number | null;
  status: string;
  flag: string;
}

export interface ScoreDetail {
  match: Match;
  pick: string;
  points: number | null;
  correct: boolean | null;
}

export interface TeamScores {
  r1: number;
  r2: number;
  qf: number;
  sf: number;
  f: number;
  total: number;
  r1Details: ScoreDetail[];
  r2Details: ScoreDetail[];
  qfDetails: ScoreDetail[];
  sfDetails: ScoreDetail[];
  fDetails: ScoreDetail[];
}

export type TeamWithScores = Team & { scores: TeamScores };
