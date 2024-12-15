export interface GenderDistribution {
  male: number;
  female: number;
}

export interface NationalityDistribution {
  saudi: number;
  nonSaudi: number;
}

export interface YearlyData {
  year: number;
  students: number;
}

export interface UniversityTrend {
  name: string;
  color: string;
  yearlyData: YearlyData[];
}

export interface RegionalStats {
  totalStudents: number;
  genderDistribution: GenderDistribution;
  nationalityDistribution: NationalityDistribution;
  totalUniversities: number;
  totalGraduates: number;
  universityTrends: UniversityTrend[];
  graduationStats: GraduationStats;
  employmentTrends: EmploymentTrend[];
  salaryTrends: SalaryTrend[];
  employmentRate: number;
}

export interface GraduationStats {
  bachelors: number;
  masters: number;
  doctorate: number;
  diploma: number;
}

export interface EmploymentTrend {
  year: number;
  localMale: number;
  localFemale: number;
  internationalMale: number;
  internationalFemale: number;
}

export interface SalaryTrend {
  year: number;
  averageSalary: number;
}

export interface RegionalData {
  region: string;
  totalStudents: number;
  totalUniversities: number;
  totalGraduates: number;
  genderDistribution: GenderDistribution;
  nationalityDistribution: NationalityDistribution;
  graduationStats: GraduationStats;
  universityTrends: UniversityTrend[];
  employmentTrends: EmploymentTrend[];
  salaryTrends: SalaryTrend[];
}
