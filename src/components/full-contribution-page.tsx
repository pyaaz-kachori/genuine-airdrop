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

interface Contribution {
  id: string;
  blobId: string;
  createdAt: string;
  link: string;
  organisation: string | null;
  review: string;
  score: number;
  username: string;
}

const ContributionView = (props: { id: string }) => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch contributions and verification status in parallel
        const [contributionsResponse, verificationResponse] = await Promise.all(
          [
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/contribution/${props.id}`
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/anon-adhaar/${props.id}`
            ),
          ]
        );

        console.log(verificationResponse.data);

        setContributions(contributionsResponse.data);
        setIsVerified(!!verificationResponse.data);

        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.id]);

  return (
    <div className="flex min-h-screen w-full flex-row gap-8 p-8">
      <div
        className={`w-1/3 transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-col items-center space-y-4 pb-6">
            <Avatar className="w-24 h-24 border-2 border-white">
              <AvatarImage
                src={`https://github.com/${props.id}.png`}
                alt="User avatar"
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-gray-100 text-gray-600">
                {props.id.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                {props.id}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Developer
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-6 py-4 text-center">
            <p className="text-base text-gray-700">Blockchain Developer</p>
          </CardContent>
          <CardFooter className="flex justify-center pt-4 pb-6">
            {isVerified && (
              <AnimatedGradientText>
                <span
                  className={cn(
                    "inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent"
                  )}
                >
                  Verified Developer
                </span>
              </AnimatedGradientText>
            )}
          </CardFooter>
        </Card>
      </div>

      <div
        className={`flex-1 transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="w-16 h-16 border-t-4 border-[#4ade80] border-solid rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6">Attested Pull Requests</h2>
            <div className="space-y-4">
              {contributions.map((contribution) => (
                <Card
                  key={contribution.id}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">
                        Score: {contribution.score}
                      </h3>
                      <a
                        href={contribution.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        View PR <ChevronRight className="inline h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-gray-600">{contribution.review}</p>
                    <a
                      href={`https://aggregator.walrus-testnet.walrus.space/v1/${contribution.blobId}`}
                    >
                      {" "}
                      <div className="text-sm text-gray-500">
                        blobId: {contribution.blobId}
                      </div>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContributionView;
