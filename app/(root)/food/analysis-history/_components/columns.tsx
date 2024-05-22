"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPercent } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Star } from "lucide-react";
import { format } from "date-fns";

export type ColumnType = {
  id: string;
  food: string;
  rating: number;
  wastage: number;
  isLiked: boolean;
  timing: string;
  createdAt: Date;
};

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "food",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Food Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return (
        <span className="flex  items-center">
          {rating}
          <Star className="fill-yellow-300  stroke-none size-4 ml-3" />
        </span>
      );
    },
  },
  {
    accessorKey: "wastage",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Wastage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const percentage = row.getValue("wastage") as number;
      return <span>{formatPercent(percentage)}</span>;
    },
  },
  {
    accessorKey: "isLiked",
    header: "IsLiked",
    cell: ({ row }) => {
      const isLiked = !!row.getValue("isLiked") as boolean;
      const status = isLiked ? "yes" : "no";
      return (
        <Badge variant={status} className="first-letter:uppercase">
          {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "timing",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const timing = row.getValue("timing") as string;
      return <span className="lowercase">{timing}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          createdAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      return (
        <Badge variant="secondary">{format(createdAt, "dd-MM-yyyy")}</Badge>
      );
    },
  },
];
