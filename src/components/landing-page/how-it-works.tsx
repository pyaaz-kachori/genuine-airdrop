"use client";
import React from "react";
import RenderTree from "./tree/Tree";
import { initialEdges, initialNodes } from "./tree/config";

const Working = () => {
  return (
    <div className="h-screen border p-24">
      <RenderTree initialNodes={initialNodes} initialEdges={initialEdges} />
    </div>
  );
};

export default Working;
