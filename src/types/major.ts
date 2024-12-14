export interface Major {
  name: string;
  graduates: number;
  employment: {
    during_study: number;
    within_one_year: number;
    after_one_year: number;
    total_employment_rate: number;
  };
  median_wage: number;
  average_waiting_time: number;
}
