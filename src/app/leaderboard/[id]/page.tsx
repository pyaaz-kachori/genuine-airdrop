"use client";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { leaderboardEntry } from "@/app/utils/types";
import { dummyLeaderboardEntries } from "../../utils/dummyData";
import { AnonAadharModal } from "@/components/leaderboard/anon-aadhar";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { Trophy, Medal, ArrowUpRight } from "lucide-react";

const Leaderboard = ({
  params: { id: orgname },
}: {
  params: { id: string };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<[] | null>(null);
  const router = useRouter();
  const fetchDetails = useCallback(async () => {
    try {
      console.log("dhjdshcbjh");
      setIsLoading(true);
      const response = await axios.get("");
      if (response.data.details) {
        setDetails(response.data.details); //! ab details agar aa gyi to aage kya karna hai
      }
    } catch (error) {
      console.error("Error fetching details:", error);
      setIsLoading(false);
    }
  }, [orgname]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPolling) {
        fetchDetails();
      }
    }, 5000); // Poll every 5 seconds

    return () => {
      clearInterval(intervalId); // Cleanup on unmount or polling stop
    };
  }, [fetchDetails, isPolling]);

  useEffect(() => {
    fetchDetails(); // Initial fetch when the component mounts
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
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8 relative">
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

      {/* Top 3 Players Podium */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex justify-center items-end gap-8 mb-16"
      >
        {/* Second Place */}
        <motion.div
          variants={playerCardVariants}
          whileHover="hover"
          className="text-center w-64 bg-gray-800/50 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 transform -translate-y-8"
        >
          <div className="bg-gray-700/30 p-4 flex justify-between items-center">
            <Medal className="text-gray-400" />
            <span className="text-2xl font-bold text-gray-400">[2]</span>
          </div>
          <div className="p-6">
            <p className="text-xl font-semibold text-gray-300 mb-2">
              {topThreePlayers[1]?.username || "N/A"}
            </p>
            <p className="text-blue-400 text-2xl font-bold">
              {topThreePlayers[1]?.score || 0}
            </p>
          </div>
        </motion.div>

        {/* First Place */}
        <motion.div
          variants={playerCardVariants}
          whileHover="hover"
          className="text-center w-72 bg-gradient-to-br from-green-600/50 to-green-900/50 rounded-2xl overflow-hidden shadow-2xl border border-green-700 scale-110"
        >
          <div className="bg-green-700/30 p-4 flex justify-between items-center">
            <Trophy className="text-[#4ade80]" />
            <span className="text-2xl font-bold text-[#4ade80]">[1]</span>
          </div>
          <div className="p-6">
            <p className="text-2xl font-bold text-[#4ade80] mb-2">
              {topThreePlayers[0]?.username || "N/A"}
            </p>
            <p className="text-blue-300 text-3xl font-extrabold">
              {topThreePlayers[0]?.score || 0}
            </p>
          </div>
        </motion.div>

        {/* Third Place */}
        <motion.div
          variants={playerCardVariants}
          whileHover="hover"
          className="text-center w-64 bg-gray-800/50 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 transform -translate-y-4"
        >
          <div className="bg-gray-700/30 p-4 flex justify-between items-center">
            <Medal className="text-gray-400" />
            <span className="text-2xl font-bold text-gray-400">[3]</span>
          </div>
          <div className="p-6">
            <p className="text-xl font-semibold text-gray-300 mb-2">
              {topThreePlayers[2]?.username || "N/A"}
            </p>
            <p className="text-blue-400 text-2xl font-bold">
              {topThreePlayers[2]?.score || 0}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="overflow-x-auto"
      >
        <table className="w-full text-left bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden">
          <thead className="bg-gray-700/30 text-gray-400">
            <tr>
              <th className="py-6 px-8 text-lg">RANK</th>
              <th className="py-6 px-8 text-lg">USERNAME</th>
              <th className="py-6 px-8 text-lg">SCORE</th>
              <th className="py-6 px-8 text-lg">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {remainingPlayers.map((entry, index) => (
                <motion.tr
                  key={entry.rank}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  exit="hidden"
                  className="border-b border-gray-700 hover:bg-gray-700/30 transition-all duration-300"
                >
                  <td className="py-5 px-8 text-lg font-medium">
                    [{entry.rank}]
                  </td>
                  <td className="py-5 px-8 text-lg font-semibold">
                    {entry.username}
                  </td>
                  <td className="py-5 px-8 text-blue-400 text-xl font-bold">
                    {entry.score}
                  </td>
                  <td className="py-5 px-8">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600/30 text-blue-400 p-2 rounded-full hover:bg-blue-600/50 transition-all"
                    >
                      <ArrowUpRight />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
