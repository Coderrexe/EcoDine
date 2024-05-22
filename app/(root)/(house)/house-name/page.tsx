"use client";

import { FC, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useHouseModal } from "@/hooks/use-house-modal";

interface HousePageProps {}

const HousePage: FC<HousePageProps> = ({}) => {
  const { isOpen, onOpen, hasHouse, onClose } = useHouseModal((state) => ({
    isOpen: state.isOpen,
    hasHouse: state.hasHouse,
    onClose: state.onClose,
    onOpen: state.onOpen,
  }));

  useEffect(() => {
    if (hasHouse) {
      return onClose();
    }
    if (!isOpen) {
      return onOpen();
    }
  }, [isOpen, onOpen, hasHouse]);

  return (
    <div className="w-full h-[calc(100vh_-_5rem)] flex items-center justify-center">
      <Loader2 className="animate-spin size-6 text-slate-300" />
    </div>
  );
};

export default HousePage;
