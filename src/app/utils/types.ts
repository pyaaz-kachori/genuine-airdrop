export interface Player {
  userId: string;
  rank: number;
  player: string;
  won: number;
  trades: number;
  winRate: string;
  volume: number;
  image: string;
}

export type leaderboardEntry = {
  username: string;
  rank: number;
  score: number;
};
