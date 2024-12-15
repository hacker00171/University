// Valid state names in the application
export type StateNames = 
  | "Eastern"
  | "Riyadh" 
  | "Makkah"
  | "Medina"
  | "Qassim"
  | "Asir"
  | "Tabuk"
  | "Hail"
  | "Jazan"
  | "Najran"
  | "Al-Bahah"
  | "Northern Borders"
  | "Al-Jawf";

export interface StateInfo {
  name: StateNames;
  universities: {
    name: string;
    students: number;
    graduates: number;
    employmentRate: number;
  }[];
  colleges: number;
  students: number;
  literacyRate: number;
  statistics: {
    totalStudents: number;
    totalGraduates: number;
    averageEmploymentRate: number;
  };
}

export interface StateData {
  states: {
    [key in StateNames]: StateInfo;
  };
}
