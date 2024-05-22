"use client";

import { useCollegeModal } from "@/hooks/use-college-modal";
import { FC, useEffect } from "react";

interface CollegePageProps {}

const CollegePage: FC<CollegePageProps> = ({}) => {
  const { isOpen, onOpen, hasCollege, onClose } = useCollegeModal((state) => ({
    isOpen: state.isOpen,
    hasCollege: state.hasCollege,
    onClose: state.onClose,
    onOpen: state.onOpen,
  }));

  useEffect(() => {
    if (hasCollege) {
      return onClose();
    }
    if (!isOpen) {
      return onOpen();
    }
  }, [isOpen, onOpen, hasCollege]);

  return (
    <div className="w-full h-[calc(100vh_-_5rem)] flex items-center justify-center">
      <Loader2 className="animate-spin size-6 text-slate-300" />
    </div>
  );
};

export default CollegePage;

import { Loader2 } from "lucide-react";
