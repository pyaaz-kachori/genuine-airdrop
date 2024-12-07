"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../ui/animated-modal";
// import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Github } from "lucide-react";
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";

export function AnonAadharModal() {
  const [githubUsername, setGithubUsername] = useState("");
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add verification logic here
    console.log("Verifying GitHub username:", githubUsername);
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-primary-bg text-primary-text flex flex-col items-center max-h-[70vh] overflow-y-scroll gap-2"
            >
              <div className="flex items-center justify-center mb-6">
                <ShieldCheck className="w-16 h-16 text-primary-text opacity-70" />
              </div>

              <h2 className="text-2xl font-bold text-center mb-4">
                Increase Your Airdrop Chances
              </h2>

              <p className="text-center mb-6 opacity-80">
                Verify the authenticity of your GitHub account using Anonymous
                Aadhar to boost your eligibility for airdrops.
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full">
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
                  type="submit"
                  className="w-full bg-primary-text text-primary-bg py-3 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center"
                >
                  <ShieldCheck className="mr-2 w-5 h-5" />
                  Verify with Anon Aadhar
                </button>
              </form>
              <LogInWithAnonAadhaar nullifierSeed={1234} />
              {anonAadhaar?.status === "logged-in" && (
                <>
                  <p>✅ Proof is valid</p>
                  {latestProof && (
                    <AnonAadhaarProof
                      code={JSON.stringify(latestProof, null, 2)}
                    />
                  )}
                </>
              )}

              <p className="text-center text-sm mt-4 opacity-60">
                Your privacy is our priority. Verification is secure and
                anonymous.
              </p>
            </motion.div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
