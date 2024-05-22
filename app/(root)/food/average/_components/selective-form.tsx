"use client";

import { FC, useEffect } from "react";
import { Loader2 } from "lucide-react";

import {
  getOverAllRanking,
  getRankingByPast7Days,
} from "@/app/actions/getRanking";
import { rankingDataInterface } from "@/types/global-types";
import StatsData from "@/components/shared/stats";
import { useRankingModal } from "@/hooks/use-ranking";
import { cardOptions, mentionOptions } from "@/constants/constants";
import SelectOptions from "@/components/shared/select-option";

interface SelectiveFormProps {}

const SelectiveForm: FC<SelectiveFormProps> = ({}) => {
  const {
    cardType,
    filterType,
    setCardType,
    setFilterType,
    data,
    setData,
    setIsLoading,
    isLoading,
  } = useRankingModal((state) => ({
    cardType: state.cardType,
    setCardType: state.setCardType,
    filterType: state.filterType,
    setFilterType: state.setFilterType,
    data: state.data,
    setData: state.setData,
    isLoading: state.isLoading,
    setIsLoading: state.setIsLoading,
  }));

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let res: rankingDataInterface[] = [];
      if (cardType === "Overall") {
        res = await getOverAllRanking();
      } else if (cardType === "7Days") {
        res = await getRankingByPast7Days();
      }
      setData(res);
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cardType]);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="max-w-[8rem] w-full">
          <SelectOptions
            options={cardOptions}
            selectedCard={cardType}
            setSelected={setCardType}
          />
        </div>

        <div className="max-w-[8rem] w-full">
          <SelectOptions
            options={mentionOptions}
            selectedCard={filterType}
            setSelected={setFilterType}
          />
        </div>
      </div>

      {!isLoading ? (
        !!(data?.length > 0) ? (
          <StatsData rankingData={data!} type={filterType} />
        ) : (
          <div className="flex items-center justify-center h-52 w-full text-sm text-slate-400 border rounded-md my-12">
            <span className="text-sm text-slate-400">No data to load.</span>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center h-52 w-full text-sm text-slate-400 border rounded-md my-12">
          <Loader2 className="animate-spin size-6 text-slate-300" />
        </div>
      )}
    </>
  );
};

export default SelectiveForm;
