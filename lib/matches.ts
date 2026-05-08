import type { Match } from './types';

// 2026 World Snooker Championship — verified from SnookerHQ.

export const ROUND1_MATCHES: Match[] = [
  { id: 1, p1: 'Zhao Xintong', p2: 'Liam Highfield', winner: 'Zhao Xintong', score: '10-7', seed1: 1 },
  { id: 2, p1: 'Judd Trump', p2: 'Gary Wilson', winner: 'Judd Trump', score: '10-5', seed1: 2 },
  { id: 3, p1: 'Kyren Wilson', p2: 'Stan Moody', winner: 'Kyren Wilson', score: '10-7', seed1: 3 },
  { id: 4, p1: 'Neil Robertson', p2: 'Pang Junxu', winner: 'Neil Robertson', score: '10-6', seed1: 4 },
  { id: 5, p1: 'John Higgins', p2: 'Ali Carter', winner: 'John Higgins', score: '10-7', seed1: 5 },
  { id: 6, p1: 'Mark Williams', p2: 'Antoni Kowalski', winner: 'Mark Williams', score: '10-4', seed1: 6 },
  { id: 7, p1: 'Mark Selby', p2: 'Jak Jones', winner: 'Mark Selby', score: '10-2', seed1: 7 },
  { id: 8, p1: 'Shaun Murphy', p2: 'Fan Zhengyi', winner: 'Shaun Murphy', score: '10-9', seed1: 8 },
  { id: 9, p1: 'Xiao Guodong', p2: 'Zhou Yuelong', winner: 'Xiao Guodong', score: '10-6', seed1: 9 },
  { id: 10, p1: 'Wu Yize', p2: 'Lei Peifan', winner: 'Wu Yize', score: '10-2', seed1: 10 },
  { id: 11, p1: 'Barry Hawkins', p2: 'Matthew Stevens', winner: 'Barry Hawkins', score: '10-4', seed1: 11 },
  { id: 12, p1: "Ronnie O'Sullivan", p2: 'He Guoqiang', winner: "Ronnie O'Sullivan", score: '10-2', seed1: 12 },
  { id: 13, p1: 'Chris Wakelin', p2: 'Liam Pullen', winner: 'Chris Wakelin', score: '10-6', seed1: 13 },
  { id: 14, p1: 'Mark Allen', p2: 'Zhang Anda', winner: 'Mark Allen', score: '10-6', seed1: 14 },
  { id: 15, p1: 'Si Jiahui', p2: 'Hossein Vafaei', winner: 'Hossein Vafaei', score: '3-10', seed1: 15 },
  { id: 16, p1: 'Ding Junhui', p2: 'David Gilbert', winner: 'Ding Junhui', score: '10-5', seed1: 16 },
];

export const ROUND2_MATCHES: Match[] = [
  { id: 17, p1: 'Zhao Xintong', p2: 'Ding Junhui', winner: 'Zhao Xintong', score: '13-9' },
  { id: 18, p1: 'Xiao Guodong', p2: 'Shaun Murphy', winner: 'Shaun Murphy', score: '3-13' },
  { id: 19, p1: 'Kyren Wilson', p2: 'Mark Allen', winner: 'Mark Allen', score: '9-13' },
  { id: 20, p1: 'Barry Hawkins', p2: 'Mark Williams', winner: 'Barry Hawkins', score: '13-9' },
  { id: 21, p1: 'John Higgins', p2: "Ronnie O'Sullivan", winner: 'John Higgins', score: '13-12' },
  { id: 22, p1: 'Mark Selby', p2: 'Wu Yize', winner: 'Wu Yize', score: '11-13' },
  { id: 23, p1: 'Hossein Vafaei', p2: 'Judd Trump', winner: 'Hossein Vafaei', score: '13-12' },
  { id: 24, p1: 'Neil Robertson', p2: 'Chris Wakelin', winner: 'Neil Robertson', score: '13-7' },
];

export const QF_MATCHES: Match[] = [
  { id: 25, p1: 'Zhao Xintong', p2: 'Shaun Murphy', winner: 'Shaun Murphy', score: '10-13' },
  { id: 26, p1: 'Mark Allen', p2: 'Barry Hawkins', winner: 'Mark Allen', score: '13-11' },
  { id: 27, p1: 'John Higgins', p2: 'Neil Robertson', winner: 'John Higgins', score: '13-10' },
  { id: 28, p1: 'Wu Yize', p2: 'Hossein Vafaei', winner: 'Wu Yize', score: '13-8' },
];

export const SF_MATCHES: Match[] = [
  { id: 29, p1: 'Shaun Murphy', p2: 'John Higgins', winner: 'Shaun Murphy', score: '17-15' },
  { id: 30, p1: 'Wu Yize', p2: 'Mark Allen', winner: 'Wu Yize', score: '17-16' },
];

export const FINAL_MATCH: Match[] = [
  { id: 31, p1: 'Shaun Murphy', p2: 'Wu Yize', winner: 'Wu Yize', score: '17-18' },
];
