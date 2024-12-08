"use client";
import React from "react";
import RenderTree from "./tree/Tree";
import { initialEdges, initialNodes } from "./tree/config";
import HyperText from "../ui/hyper-text";

const Working = () => {
  return (
    <div className="h-screen border px-10 flex flex-col">
      <HyperText text="How it works" className="text-center text-3xl" />
      <RenderTree initialNodes={initialNodes} initialEdges={initialEdges} />
    </div>
  );
};

export default Working;
