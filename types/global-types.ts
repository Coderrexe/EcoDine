export interface getAnalyticsHistoryInterface {
  take: number;
  skip: number;
}

export interface StatsData {
  label: string;
  value: number;
}

export interface rankingDataInterface {
  _avg: {
    foodRating: number | null;
    foodWastage: number | null;
  };
  foodName: string;
}
