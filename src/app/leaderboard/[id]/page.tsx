"use client";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { leaderboardEntry } from "@/app/utils/types";
import { dummyLeaderboardEntries } from "../../utils/dummyData";
import { AnonAadharModal } from "@/components/leaderboard/anon-aadhar";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { Trophy, Medal } from "lucide-react";
import Link from "next/link";

const Leaderboard = ({
  params: { id: orgname },
}: {
  params: { id: string };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState<
    leaderboardEntry[]
  >(dummyLeaderboardEntries);

  const fetchDetails = useCallback(async () => {
    console.log("Fetching details");
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard/${orgname}`
      );
      if (response.data) {
        setLeaderboardEntries(response.data);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [orgname]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const topThreePlayers = leaderboardEntries.slice(0, 3);
  const remainingPlayers = leaderboardEntries.slice(3);

  const playerCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      <div className="absolute top-5 right-5">
        <AnonAadhaarProvider
          _useTestAadhaar={true}
          // _artifactslinks={{
          //   zkey_url: "/circuit_final.zkey",
          //   vkey_url: "/vkey.json",
          //   wasm_url: "/aadhaar-verifier.wasm",
          // }}
        >
          <AnonAadharModal />
        </AnonAadhaarProvider>
      </div>

      <h1 className="text-center text-[#4ade80] text-5xl mb-4 font-bold tracking-tight">
        LEADERBOARD
      </h1>
      <p className="text-center text-gray-400 mb-12 text-xl">
        Top performers ranked by score
      </p>

      <motion.div
        initial="hidden"
        animate="visible"
        className="flex justify-center items-end gap-4 mb-24 h-[400px]"
      >
        {/* Second Place */}
        <Link href={`/contribution/${topThreePlayers[1]?.username}`}>
          <motion.div
            custom={1}
            variants={playerCardVariants}
            whileHover="hover"
            className="text-center w-64 bg-[#1a1a1a] rounded-xl overflow-hidden shadow-xl border border-gray-800 h-64 relative top-20"
          >
            <div className="bg-gray-700/30 p-4 flex justify-between items-center">
              <Medal className="text-silver h-8 w-8" />
              <span className="text-3xl font-bold text-silver">2</span>
            </div>
            <div className="p-6 flex flex-col justify-center h-[calc(100%-76px)]">
              <p className="text-xl font-semibold text-gray-300 mb-4">
                {topThreePlayers[1]?.username || "N/A"}
              </p>
              <p className="text-blue-400 text-2xl font-bold">
                {topThreePlayers[1]?.score || 0}
              </p>
            </div>
          </motion.div>
        </Link>

        {/* First Place */}
        <Link href={`/contribution/${topThreePlayers[0]?.username}`}>
          <motion.div
            custom={0}
            variants={playerCardVariants}
            whileHover="hover"
            className="text-center w-72 h-72 bg-[#1a1a1a] rounded-xl overflow-hidden shadow-xl border border-gray-800"
          >
            <div className="bg-green-700/30 p-4 flex justify-between items-center">
              <Trophy className="text-[#FFD700] h-10 w-10" />
              <span className="text-4xl font-bold text-[#FFD700]">1</span>
            </div>
            <div className="p-6 flex flex-col justify-center h-[calc(100%-84px)]">
              <p className="text-2xl font-bold text-[#4ade80] mb-4">
                {topThreePlayers[0]?.username || "N/A"}
              </p>
              <p className="text-blue-300 text-3xl font-extrabold">
                {topThreePlayers[0]?.score || 0}
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Third Place */}
        <Link href={`/contribution/${topThreePlayers[2]?.username}`}>
          <motion.div
            custom={2}
            variants={playerCardVariants}
            whileHover="hover"
            className="text-center w-64 h-64 bg-[#1a1a1a] rounded-xl overflow-hidden shadow-xl border border-gray-800  relative top-20"
          >
            <div className="bg-gray-700/30 p-4 flex justify-between items-center">
              <Medal className="text-bronze h-8 w-8" />
              <span className="text-3xl font-bold text-bronze">3</span>
            </div>
            <div className="p-6 flex flex-col justify-center h-[calc(100%-76px)]">
              <p className="text-xl font-semibold text-gray-300 mb-4">
                {topThreePlayers[2]?.username || "N/A"}
              </p>
              <p className="text-blue-400 text-2xl font-bold">
                {topThreePlayers[2]?.score || 0}
              </p>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Updated Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800">
              <th className="py-4 px-6 text-sm font-medium">Pool</th>
              <th className="py-4 px-6 text-sm font-medium">Username</th>
              <th className="py-4 px-6 text-sm font-medium text-right">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {remainingPlayers.map((entry, index) => (
              <motion.tr
                key={entry.rank}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                exit="hidden"
                className="hover:bg-[#1a1a1a] transition-colors duration-200"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">#{entry.rank}</span>
                    <span className="font-medium">{entry.username}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-400">{entry.username}</td>
                <td className="py-4 px-6 text-right font-medium text-blue-400">
                  {entry.score}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
