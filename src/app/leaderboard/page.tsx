import Image from "next/image";
import { players } from "../utils/dummyData";
const Leaderboard = async () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-center text-[#4ade80] text-4xl mb-2">LEADERBOARD</h1>
      <p className="text-center text-gray-400 mb-12">
        Provide liquidity to the house by purchasing $DGN and earning yield from
        the losses of the players.
      </p>

      {/* Top 3 Players Podium */}
      <div className="flex justify-center items-end gap-4 mb-16">
        {/* Second Place */}
        <div className="text-center mb-8">
          <Image
            src="/avatars/player2.png"
            alt="Second Place"
            width={100}
            height={100}
            className="rounded-lg mb-2"
          />
          <p className="text-gray-400">[2] {players[1].player}</p>
          <p className="text-blue-400">◈ {players[1].volume}</p>
          <p className="text-gray-500">VOLUME</p>
        </div>

        {/* First Place */}
        <div className="text-center mb-16">
          <Image
            src="/avatars/player1.png"
            alt="First Place"
            width={100}
            height={100}
            className="rounded-lg mb-2"
          />
          <p className="text-[#4ade80]">[1] {players[0].player}</p>
          <p className="text-blue-400">◈ {players[0].volume}</p>
          <p className="text-gray-500">VOLUME</p>
        </div>

        {/* Third Place */}
        <div className="text-center">
          <Image
            src="/avatars/player3.png"
            alt="Third Place"
            width={100}
            height={100}
            className="rounded-lg mb-2"
          />
          <p className="text-gray-400">[3] {players[2].player}</p>
          <p className="text-blue-400">◈ {players[2].volume}</p>
          <p className="text-gray-500">VOLUME</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-400 border-b border-gray-800">
            <tr>
              <th className="py-4 px-6">RANK</th>
              <th className="py-4 px-6">PLAYER</th>
              <th className="py-4 px-6">WON</th>
              <th className="py-4 px-6">TRADES</th>
              <th className="py-4 px-6">WIN RATE</th>
              <th className="py-4 px-6">VOLUME</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.rank} className="border-b border-gray-800">
                <td className="py-4 px-6">[{player.rank}]</td>
                <td className="py-4 px-6">{player.player}</td>
                <td className="py-4 px-6 text-blue-400">
                  ◈ {player.won.toFixed(2)}
                </td>
                <td className="py-4 px-6">{player.trades}</td>
                <td className="py-4 px-6">{player.winRate}</td>
                <td className="py-4 px-6 text-blue-400">
                  ◈ {player.volume.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
