"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import axios from "axios";
import { useRouter } from 'next/navigation';

export function AnimatedModalDemo() {
  const router = useRouter();
  const [orgUrl, setOrgUrl] = useState('');
  const [id, setId] = useState<string>()

  const [loading, setLoading] = useState<boolean>(false)
  const fetchDetails = async () =>{
    try {
      setLoading(true)
      const response = await axios.get('')
      if(response.data.id){
        setId(response.data.id)
        router.push(`leaderboard/${id}`)
      }
      else{
        console.log("Error fetching ID")
      }
    } catch (error) {
      console.log("Error, jao jaake coffee pike ao")
    }
  }
 
  return (
    <div className="py-5 flex items-center justify-center display:inline">
      <Modal>
        <ModalTrigger
          className="px-6 py-3 display:inline hover:bg-transparent text-primary-bg bg-primary-text hover:text-primary-text font-semibold border border-primary-text backdrop-blur-sm rounded-full text-lg transition duration-500"
        >
          <span>
            Register Your Organisation
          </span>
        </ModalTrigger>

        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Register Your GitHub

              Organization

            </h4>

            <div className="w-4/5 max-w-md mx-auto space-y-6 ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <input
                  type="text"
                  placeholder="Enter GitHub Organization URL"
                  value={orgUrl}
                  onChange={(e) => setOrgUrl(e.target.value)}
                  className="w-full px-10 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                />
              </motion.div>

              <div className="py-4 flex flex-wrap gap-x-4 gap-y-6 items-center justify-center">
                <div className="flex items-center justify-center">
                  <Github className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Organization Verification
                  </span>
                </div>
                <div className="flex items-center justify-center">


                </div>
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            {loading?<button className="px-6 py-1   display:inline hover:bg-transparent text-primary-bg bg-primary-text hover:text-primary-text font-semibold border border-primary-text backdrop-blur-sm rounded-full text-lg transition duration-500  ">
              Fetching
            </button>:<button onClick={fetchDetails} className=" px-6 py-1   display:inline hover:bg-transparent text-primary-bg bg-primary-text hover:text-primary-text font-semibold border border-primary-text backdrop-blur-sm rounded-full text-lg transition duration-500 ">
              Register
            </button>}
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}