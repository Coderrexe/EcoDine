"use client";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-[calc(100vh_-_5rem)] flex items-center justify-center">
      <span className="flex items-center justify-center gap-3 flex-col">
        <Loader2 className="animate-spin size-6 text-slate-400" />
        <span className="text-sm text-slate-400">Data is loading ...</span>
      </span>
    </div>
  );
};

export default Loading;
