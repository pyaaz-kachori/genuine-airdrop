"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import AnimatedGradientText from "../components/ui/animated-gradient-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import axios from "axios";

const contibutions = [
  {
    id: "6754a8cf37b94de6af9e9657",
    blobId: "oVN912JdNALW8lwmONKeu0IOmE_PZALzUXwhVWkMVn0",
    createdAt: "2024-12-07T19:58:07.719Z",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/2",
    organisation: null,
    review: "1700",
    score: 1700,
    username: "tanishadixit0206",
  },
  {
    id: "6754a9acc23ff41500edd635",
    blobId: "ICkzktH2mhfKxocJyIdW-2emSqNQ9rqkJ_sHfThxYPs",
    createdAt: "2024-12-07T20:01:48.424Z",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/2",
    organisation: null,
    review: "850",
    score: 850,
    username: "tanishadixit0206",
  },
  {
    id: "6754aa060af3492b3a950b8b",
    blobId: "3WC_7P3qSmpHfWsuKB9dQb5Ed-_Sc0KB9U1IzSqe42w",
    createdAt: "2024-12-07T20:03:18.437Z",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/2",
    organisation: "DoubtifyOrg",
    review: "850",
    score: 850,
    username: "tanishadixit0206",
  },
  {
    id: "6754b4a02009b0fa288d2fc4",
    blobId: "3WC_7P3qSmpHfWsuKB9dQb5Ed-_Sc0KB9U1IzSqe42w",
    createdAt: "2024-01-15T10:00:00.000Z",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/1",
    organisation: "DoubtifyOrg",
    review: "850",
    score: 850,
    username: "tanishadixit0206",
  },
  {
    id: "6754b4a02009b0fa288d2fc5",
    blobId: "4XD_8P4rTnqIgXwvLC0eRc6Fe-_Td1LC0V2JzTre53x",
    createdAt: "2024-01-16T11:30:00.000Z",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/2",
    organisation: "DoubtifyOrg",
    review: "750",
    score: 750,
    username: "tanishadixit0206",
  },
  {
    id: "6754b4cf2009b0fa288d2fd1",
    blobId: "3WC_7P3qSmpHfWsuKB9dQb5Ed-_Sc0KB9U1IzSqe42w",
    createdAt: "2024-01-15T10:00:00.000Z",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/1",
    organisation: "DoubtifyOrg",
    review: "850",
    score: 850,
    username: "tanishadixit0206",
  },
  {
    id: "6754b4cf2009b0fa288d2fd2",
    blobId: "4XD_8P4rTnqIgXwvLC0eRc6Fe-_Td1LC0V2JzTre53x",
    createdAt: "2024-01-16T11:30:00.000Z",
    link: "https://github.com/DoubtifyOrg/Doubtify/pull/2",
    organisation: "DoubtifyOrg",
    review: "750",
    score: 750,
    username: "tanishadixit0206",
  },
];

const ContributionView = (props: { id: string }) => {
  const [userData, setUserData] = useState<any>(null);
  // useEffect(() => {
  //   const getUserData = async () => {
  //     const details = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/user/${props.id}`
  //     );
  //     setUserData(details.data);
  //   };
  //   getUserData();
  // }, [props.id]);
  //async function getUserData(id:string) {
  //const details = await
  //}

  return (
    <div className="flex h-screen w-screen min-w-0 flex-row justify-end">
      <div className="flex justify-center fixed left-0 top-5  items-center p-4">
        <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300 ">
          <CardHeader className="flex flex-col items-center space-y-4 pb-6">
            <Avatar className="w-50 h-50 border-3 border-white-200">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User avatar"
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-gray-100 text-gray-600">
                SN
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Tanisha Dixit
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Developer at MDG Space
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-6 py-4 text-center">
            <p className="text-base text-gray-700">
              Innovative blockchain developer with a passion for decentralized
              technologies.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pt-4 pb-6">
            <AnimatedGradientText>
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                Kachori Lover : Verified by anon adhaar
              </span>
            </AnimatedGradientText>
          </CardFooter>
        </Card>
      </div>
      <hr className="mx-2  my-5 h-5/6 bg-white w-px shrink-0 " />
      <div className="flex flex-col justify-start items-center p-4 w-4/6">
        <div className="flex w-full flex-row justify-start text-3xl font-bold">
          Attested Pull Requests
        </div>
        <div className="w-full flex flex-col gap-4">
          {contibutions.map((contribution) => (
            <div
              className="flex flex-col border rounded-2xl p-4 gap-2"
              key={contribution.id}
            >
              <p>ID: {contribution.id}</p>
              <p>Review: {contribution.review}</p>
              <p>
                <a
                  href={`https://aggregator.walrus-testnet.walrus.space/v1/${contribution.blobId}`}
                >
                  Blob ID: {contribution.blobId}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionView;
