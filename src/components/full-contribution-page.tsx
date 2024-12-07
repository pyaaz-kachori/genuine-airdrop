import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChevronRight } from "lucide-react";
 
import { cn } from "@/lib/utils";
import AnimatedGradientText from "../components/ui/animated-gradient-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const ContributionView = (props: { id: string }) => {
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
              Satoshi Nakamoto
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Developer at MDG Space
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-4 text-center">
          <p className="text-base text-gray-700">
            Innovative blockchain developer with a passion for decentralized technologies.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pt-4 pb-6">
        <AnimatedGradientText>
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          Kachori Lover : Verified
        </span>
        
      </AnimatedGradientText>
        </CardFooter>
      </Card>
    </div>
    <hr className="mx-2  my-5 h-5/6 bg-white w-px shrink-0 " />
    <div className="flex flex-col justify-start items-center p-4">
      <div className="flex w-full flex-row justify-start">Attested Pull Requests</div>
      <div></div>
    </div>
    </div>
  );
};

export default ContributionView;
