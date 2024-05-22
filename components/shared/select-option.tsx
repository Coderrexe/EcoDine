"use client";
import { FC } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface mentionOptionsInterface {
  id: number;
  label: string;
}

interface SelectOptionsProps {
  selectedCard: string;
  setSelected: (e: string) => void;
  options: mentionOptionsInterface[];
}

const SelectOptions: FC<SelectOptionsProps> = ({
  options,
  selectedCard,
  setSelected,
}) => {
  return (
    <Select defaultValue={selectedCard} onValueChange={(e) => setSelected(e)}>
      <SelectTrigger
        className="flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          <span className="ml-2">
            {options.find((account) => account?.label === selectedCard)?.label}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options?.map((Data) => {
          return (
            <SelectItem key={Data?.id} value={Data?.label}>
              <div className="flex items-center gap-3 ">{Data?.label}</div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SelectOptions;
