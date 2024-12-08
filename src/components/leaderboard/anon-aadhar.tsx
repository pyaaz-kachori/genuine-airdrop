"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../ui/animated-modal";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Github, ArrowRight, Check, Zap } from "lucide-react";
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";

// Animation variants for smooth transitions
const pageVariants = {
  initial: { opacity: 0, x: 100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -100 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export function AnonAadharModal() {
  const [currentStep, setCurrentStep] = useState(1);
  const [githubUsername, setGithubUsername] = useState("");
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubVerification = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/anon-adhaar/${githubUsername}`
      );

      if (!response.data.anonAdhaarId) {
        // No verification found, proceed to proof generation
        setCurrentStep(2);
      } else {
        // User already verified, show success screen
        toast.success("You're already verified!", {
          description: "Great job! You're all set for the airdrop.",
          icon: <Check className="text-green-500" />,
        });
        setCurrentStep(3);
      }
    } catch (error) {
      toast.error("Verification failed", {
        description: "Please try again or check your GitHub username.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProofSubmission = async () => {
    if (!latestProof) {
      toast.error("Generate proof first");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/anon-adhaar/`,
        {
          username: githubUsername,
          anonAadhaarId: latestProof.proof.nullifier, // Assuming nullifier is the unique ID
        }
      );

      if (response.data.id) {
        toast.success("Verification Complete!", {
          description: "You're now eligible for the airdrop.",
          icon: <Zap className="text-yellow-500" />,
        });
        setCurrentStep(3);
      }
    } catch (error) {
      toast.error("Submission failed", {
        description: "Please try the verification process again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-primary-bg w-24 hover:bg-primary-text hover:text-primary-bg border border-primary-text text-primary flex justify-center group/modal-btn px-2 py-2 text-lg font-semibold rounded-full transition duration-500">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Verify
          </span>
          <div className="-translate-x-40 text-primary-bg group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 z-20">
            ✈️ ...
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent className="bg-primary-bg">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="p-6 bg-primary-bg text-primary-text flex flex-col items-center max-h-[70vh] overflow-y-scroll gap-2"
                >
                  <div className="flex items-center justify-center mb-6">
                    <Github className="w-16 h-16 text-primary-text opacity-70" />
                  </div>

                  <h2 className="text-2xl font-bold text-center mb-4">
                    GitHub Verification
                  </h2>

                  <p className="text-center mb-6 opacity-80">
                    Enter your GitHub username to check eligibility
                  </p>

                  <div className="max-w-md mx-auto w-full">
                    <div className="mb-4">
                      <label
                        htmlFor="github-username"
                        className="block mb-2 font-semibold opacity-80"
                      >
                        GitHub Username
                      </label>
                      <div className="flex items-center border border-primary-text/30 rounded-lg">
                        <span className="pl-3 opacity-50">
                          <Github className="w-5 h-5" />
                        </span>
                        <input
                          type="text"
                          id="github-username"
                          value={githubUsername}
                          onChange={(e) => setGithubUsername(e.target.value)}
                          placeholder="Enter your GitHub username"
                          className="w-full p-3 bg-transparent outline-none placeholder-primary-text/50"
                          required
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleGithubVerification}
                      disabled={isLoading || !githubUsername}
                      className="w-full bg-primary-text text-primary-bg py-3 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center disabled:opacity-50"
                    >
                      {isLoading ? (
                        "Checking..."
                      ) : (
                        <>
                          Next <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="p-6 bg-primary-bg text-primary-text flex flex-col items-center max-h-[70vh] overflow-y-scroll gap-2"
                >
                  <div className="flex items-center justify-center mb-6">
                    <ShieldCheck className="w-16 h-16 text-primary-text opacity-70" />
                  </div>

                  <h2 className="text-2xl font-bold text-center mb-4">
                    Prove Your Identity
                  </h2>

                  <p className="text-center mb-6 opacity-80">
                    Generate an anonymous proof to verify your eligibility
                  </p>

                  <div className="w-full max-w-md">
                    <LogInWithAnonAadhaar nullifierSeed={1234} />

                    {anonAadhaar?.status === "logged-in" && (
                      <>
                        {latestProof && (
                          <>
                            <div className="my-4 bg-green-900/20 p-4 rounded-lg">
                              <p className="text-green-400 flex items-center">
                                <Check className="mr-2" /> Proof Generated
                              </p>
                            </div>
                            <button
                              onClick={handleProofSubmission}
                              className="w-full bg-primary-text text-primary-bg py-3 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center"
                            >
                              Submit Verification
                              <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="p-6 bg-primary-bg text-primary-text flex flex-col items-center justify-center text-center max-h-[70vh] overflow-y-scroll"
                >
                  <Zap className="w-24 h-24 text-yellow-400 mb-6 animate-pulse" />
                  <h2 className="text-3xl font-bold mb-4">
                    You're All Set! 🎉
                  </h2>
                  <p className="text-xl mb-6 opacity-80">
                    Your GitHub account is now verified and eligible for the
                    airdrop.
                  </p>
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="bg-green-900/20 p-4 rounded-lg">
                      <p className="text-green-400 font-semibold">
                        GitHub Verified
                      </p>
                      <p className="text-sm opacity-70">{githubUsername}</p>
                    </div>
                    <div className="bg-blue-900/20 p-4 rounded-lg">
                      <p className="text-blue-400 font-semibold">
                        Airdrop Status
                      </p>
                      <p className="text-sm opacity-70">Eligible ✈️</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
