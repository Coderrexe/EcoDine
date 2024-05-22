"use client";

import { FC, useEffect, useState, useTransition } from "react";
import { DataTable } from "./data-table";
import { ColumnType, columns } from "./columns";
import { getAnalyticsHistory } from "@/app/actions/getHistory";
import { toast } from "sonner";
import { pageCount } from "@/constants";
import { ToastEmitter } from "@/lib/toast-emitter";

interface HistoryTableProps {}

const HistoryTable: FC<HistoryTableProps> = () => {
  const [tableData, setData] = useState<ColumnType[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNoData, setIsNoData] = useState(false);
  const [isPending, startTransition] = useTransition();

  const fetchData = async () => {
    try {
      startTransition(async () => {
        const res = await getAnalyticsHistory({
          skip: (currentPage - 1) * pageCount,
          take: pageCount,
        });
        if (res?.length > 0) {
          if (res?.length < pageCount) {
            setIsNoData(true);
          }
          setData(res);
        } else if (res?.length === 0) {
          setIsNoData(true);
          ToastEmitter({
            error: "Please create atleast one data.",
          });
        } else {
          setCurrentPage((prev) => prev - 1);
          setIsNoData(true);
          ToastEmitter({
            error: "No data to Load",
          });
        }
      });
    } catch (error) {
      return toast.error("Internal server error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <DataTable
      columns={columns}
      data={tableData}
      isNoData={isNoData}
      isPending={isPending}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      setIsNoData={setIsNoData}
    />
  );
};

export default HistoryTable;
