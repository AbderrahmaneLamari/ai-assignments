import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/connect4/player_move',
        destination: 'http://127.0.0.1:8000/player_move', // FastAPI backend
      },
      {
        source: '/api/connect4/new_game',
        destination: 'http://120.0.0.1:8000/new_game', // FastAPI backend
      },
      {
        source: '/api/logic/execute-code',
        destination: 'http://127.0.0.1:8000/execute-code', // FastAPI backend
      }
    ]
  },
};

export default nextConfig;
