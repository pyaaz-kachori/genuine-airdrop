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
const dummyData = [
  {
    _id: "6754a8cf37b94de6af9e9657",
    organisation: null,
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/2",
    username: "tanishadixit0206",
    review: "1700",
    score: 1700,
    blobId: "oVN912JdNALW8lwmONKeu0IOmE_PZALzUXwhVWkMVn0",
    createdAt: "2024-12-07T19:58:07.719+00:00",
  },
  {
    _id: "6754a9acc23ff41500edd635",
    organisation: null,
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/2",
    username: "tanishadixit0206",
    review: "850",
    score: 850,
    blobId: "ICkzktH2mhfKxocJyIdW-2emSqNQ9rqkJ_sHfThxYPs",
    createdAt: "2024-12-07T20:01:48.424+00:00",
  },
  {
    _id: "6754aa060af3492b3a950b8b",
    organisation: "DoubtifyOrg",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/2",
    username: "tanishadixit0206",
    review: "850",
    score: 850,
    blobId: "3WC_7P3qSmpHfWsuKB9dQb5Ed-_Sc0KB9U1IzSqe42w",
    createdAt: "2024-12-07T20:03:18.437+00:00",
  },
  {
    _id: "6754b4a02009b0fa288d2fc4",
    organisation: "DoubtifyOrg",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/1",
    username: "tanishadixit0206",
    review: "850",
    score: 850,
    blobId: "3WC_7P3qSmpHfWsuKB9dQb5Ed-_Sc0KB9U1IzSqe42w",
    createdAt: "2024-01-15T10:00:00.000+00:00",
  },
  {
    _id: "6754b4a02009b0fa288d2fc5",
    organisation: "DoubtifyOrg",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/2",
    username: "tanishadixit0206",
    review: "750",
    score: 750,
    blobId: "4XD_8P4rTnqIgXwvLC0eRc6Fe-_Td1LC0V2JzTre53x",
    createdAt: "2024-01-16T11:30:00.000+00:00",
  },
  {
    _id: "6754b4a02009b0fa288d2fc6",
    organisation: "DoubtifyOrg",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/3",
    username: "johndoe87",
    review: "1200",
    score: 1200,
    blobId: "5YE_9Q5sTorJhYxwmD1fSd7Gf-_Ue2MD1W3KzUse64y",
    createdAt: "2024-01-17T14:45:00.000+00:00",
  },
  {
    _id: "6754b4a02009b0fa288d2fc7",
    organisation: "DoubtifyOrg",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/4",
    username: "johndoe87",
    review: "950",
    score: 950,
    blobId: "6ZF_0R6uUpskIzxyNE2gTe8Hg-_Vf3NE2X4LzVtf75z",
    createdAt: "2024-01-18T09:15:00.000+00:00",
  },
  {
    _id: "6754b4a02009b0fa288d2fc8",
    organisation: "DoubtifyOrg",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/5",
    username: "sarahcode",
    review: "1100",
    score: 1100,
    blobId: "7AG_1S7vVqtlJ0yyOF3hUf9Ih-_Wg4OF3Y5MzWug86a",
    createdAt: "2024-01-19T16:20:00.000+00:00",
  },
  {
    _id: "6754b4a02009b0fa288d2fc9",
    organisation: "DoubtifyOrg",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/6",
    username: "alexweb",
    review: "800",
    score: 800,
    blobId: "8BH_2T8wWruqK1zzPG4iVg0Jj-_Xh5PG4Z6NzXvh97b",
    createdAt: "2024-01-20T13:40:00.000+00:00",
  },
  {
    _id: "6754b4a02009b0fa288d2fca",
    organisation: "MoonDevs",
    link: "https://github.com/MoonDevs/moon-portal-app/pull/1",
    username: "coderninja",
    review: "1300",
    score: 1300,
    blobId: "9CI_3U9xXsvr3dA0QH5jWh1Kk-_Yi6QH5a7OzYwi08c",
    createdAt: "2024-01-21T10:30:00.000+00:00",
  },
  {
    _id: "6754b4a02009b0fa288d2fcb",
    organisation: "MoonDevs",
    link: "https://github.com/MoonDevs/moon-portal-app/pull/2",
    username: "webwarrior",
    review: "1050",
    score: 1050,
    blobId: "0DJ_4V0yYtws4eB1RI6kXi2Ll-_Zj7RI6b8PzZxj19d",
    createdAt: "2024-01-22T15:50:00.000+00:00",
  },
  {
    _id: "6754b4a02009b0fa288d2fcc",
    organisation: "MoonDevs",
    link: "https://github.com/MoonDevs/moon-portal-app/pull/3",
    username: "techguru",
    review: "900",
    score: 900,
    blobId: "1EK_5W1zZuxn5fC2SJ7lYj3Mm-_Ak8SJ7c9QzAyk20e",
    createdAt: "2024-01-23T11:10:00.000+00:00",
  },
  {
    _id: "6754b4a02009b0fa288d2fcd",
    organisation: "MoonDevs",
    link: "https://github.com/MoonDevs/moon-portal-app/pull/4",
    username: "devdiva",
    review: "1150",
    score: 1150,
    blobId: "2FL_6X2aAvy09gD3TK8mZk4Nn-_Bl9TK8d0RzBzl31f",
    createdAt: "2024-01-24T17:25:00.000+00:00",
  },
  {
    _id: "6754b4a02009b0fa288d2fce",
    organisation: "MoonDevs",
    link: "https://github.com/MoonDevs/moon-portal-app/pull/5",
    username: "coderninja",
    review: "1000",
    score: 1000,
    blobId: "3GM_7Y3bBwz10hE4UL9nAl5Oo-_Cm0UL9e1SzCam42g",
    createdAt: "2024-01-25T12:35:00.000+00:00",
  },
];
const Leaderboard = ({
  params: { id: orgname },
}: {
  params: { id: string };
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Calculate aggregated scores from dummyData
  const aggregatedScores = dummyData.reduce(
    (acc: { [key: string]: number }, entry) => {
      acc[entry.username] = (acc[entry.username] || 0) + entry.score;
      return acc;
    },
    {}
  );

  // Create sorted leaderboard entries
  const leaderboardEntries = Object.entries(aggregatedScores)
    .map(([username, score]) => ({
      username,
      score,
      rank: 0, // Will be set after sorting
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  const topThreePlayers = leaderboardEntries.slice(0, 3);
  const remainingPlayers = leaderboardEntries.slice(3);

  const playerCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
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
          _artifactslinks={{
            zkey_url: "/circuit_final.zkey",
            vkey_url: "/vkey.json",
            wasm_url: "/aadhaar-verifier.wasm",
          }}
        >
          <AnonAadharModal />
        </AnonAadhaarProvider>
      </div>

      <h1 className="text-center text-[#4ade80] text-5xl mb-4 font-bold tracking-tight">
        LEADERBOARD
      </h1>
      <p className="text-center text-gray-400 text-xl">
        Top performers ranked by score
      </p>

      {/* Top 3 Players Podium */}
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
