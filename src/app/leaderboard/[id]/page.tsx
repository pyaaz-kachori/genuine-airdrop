import Image from "next/image";
import { players } from "../../utils/dummyData";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Leaderboard = async ({
  params: { id: userId },
}: {
  params: { id: string };
}) => {
  const [isLoading,setIsLoading] = useState(false)
  const [details,setDetails] = useState<[]|null>(null)
  const router = useRouter()
  const fetchDetails = useCallback(async () => {
    try {
      console.log('dhjdshcbjh')
      setIsLoading(true);
      const response = await axios.get('');
      if (response.data.details) {
        setDetails(response.data.details) //! ab details agar aa gyi to aage kya karna hai
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const pollingInterval = setInterval(() => {
      if (!details) {
        fetchDetails();
      } else {
        clearInterval(pollingInterval);
      }
    }, 150000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [fetchDetails, details]);

  
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
        <Link
          href={`/contribution/${players[1].userId}`}
          className="text-center mb-8 flex flex-col justify-center items-center border border-gray rounded-lg py-5 px-2"
        >
          <Image
            src={players[1].image}
            alt="Second Place"
            width={100}
            height={100}
            className="rounded-lg mb-2"
          />
          <p className="text-gray-400">[2] {players[1].player}</p>
          <p className="text-blue-400">◈ {players[1].volume}</p>
          <p className="text-gray-500">VOLUME</p>
        </Link>

        {/* First Place */}
        <Link
          href={`/contribution/${players[0].userId}`}
          className="text-center mb-16 flex flex-col justify-center items-center border border-gray rounded-lg py-5 px-2"
        >
          <Image
            src={players[0].image}
            alt="First Place"
            width={100}
            height={100}
            className="rounded-lg mb-2"
          />
          <p className="text-[#4ade80]">[1] {players[0].player}</p>
          <p className="text-blue-400">◈ {players[0].volume}</p>
          <p className="text-gray-500">VOLUME</p>
        </Link>

        {/* Third Place */}
        <Link
          href={`/contribution/${players[2].userId}`}
          className="text-center mb-8 w-44 flex flex-col justify-center items-center border border-gray rounded-lg py-5 px-2"
        >
          <Image
            src={players[2].image}
            alt="Third Place"
            width={100}
            height={100}
            className="rounded-lg mb-2"
          />
          <p className="text-gray-400">[3] {players[2].player}</p>
          <p className="text-blue-400">◈ {players[2].volume}</p>
          <p className="text-gray-500">VOLUME</p>
        </Link>
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
              <tr
                key={player.rank}
                className="border-b border-gray-800 hover:bg-gray-900 cursor-pointer"
              >
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
