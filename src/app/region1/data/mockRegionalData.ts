import { RegionalData } from "../types/regional";

const generateYearlyData = (baseCount: number, years: number = 5) => {
  const currentYear = 2024; // Using fixed year to avoid hydration issues
  return Array.from({ length: years }, (_, i) => {
    // Using a deterministic growth pattern instead of random
    const growthFactor = 1 + (0.03 * i);
    return {
      year: currentYear - (years - 1) + i,
      students: Math.round(baseCount * growthFactor)
    };
  });
};

const generateEmploymentTrends = (baseRate: number = 70) => {
  const years = 5;
  const currentYear = 2024;
  return Array.from({ length: years }, (_, i) => {
    const year = currentYear - (years - 1) + i;
    const growthFactor = 1 + (0.02 * i);
    return {
      year,
      localMale: Math.round(baseRate * growthFactor),
      localFemale: Math.round((baseRate - 5) * growthFactor),
      internationalMale: Math.round((baseRate - 10) * growthFactor),
      internationalFemale: Math.round((baseRate - 15) * growthFactor),
    };
  });
};

const generateSalaryTrends = (baseSalary: number = 50000) => {
  const years = 5;
  const currentYear = 2024;
  return Array.from({ length: years }, (_, i) => {
    const year = currentYear - (years - 1) + i;
    const growthFactor = 1 + (0.03 * i); // 3% annual growth
    return {
      year,
      averageSalary: Math.round(baseSalary * growthFactor),
    };
  });
};

export const mockRegionalData: RegionalData[] = [
  {
    region: "RIYADH",
    totalStudents: 120000,
    genderDistribution: {
      male: 65000,
      female: 55000
    },
    nationalityDistribution: {
      saudi: 100000,
      nonSaudi: 20000
    },
    totalUniversities: 3,
    totalGraduates: 25000,
    graduationStats: {
      bachelors: 120000,
      masters: 50000,
      doctorate: 15000,
      diploma: 30000
    },
    universityTrends: [
      {
        name: "King Saud University",
        color: "#E91E63",
        yearlyData: generateYearlyData(45000)
      },
      {
        name: "Princess Nourah University",
        color: "#673AB7",
        yearlyData: generateYearlyData(40000)
      },
      {
        name: "Imam Muhammad University",
        color: "#FF5722",
        yearlyData: generateYearlyData(35000)
      }
    ],
    employmentTrends: generateEmploymentTrends(75),
    salaryTrends: generateSalaryTrends(60000)
  },
  {
    region: "MAKKAH",
    totalStudents: 95000,
    genderDistribution: {
      male: 50000,
      female: 45000
    },
    nationalityDistribution: {
      saudi: 80000,
      nonSaudi: 15000
    },
    totalUniversities: 3,
    totalGraduates: 20000,
    graduationStats: {
      bachelors: 45000,
      masters: 25000,
      doctorate: 5000,
      diploma: 20000
    },
    universityTrends: [
      {
        name: "King Abdulaziz University",
        color: "#3F51B5",
        yearlyData: generateYearlyData(40000)
      },
      {
        name: "Umm Al-Qura University",
        color: "#009688",
        yearlyData: generateYearlyData(35000)
      },
      {
        name: "Taibah University",
        color: "#795548",
        yearlyData: generateYearlyData(20000)
      }
    ],
    employmentTrends: generateEmploymentTrends(72),
    salaryTrends: generateSalaryTrends(55000)
  },
  {
    region: "MADINAH",
    totalStudents: 85000,
    genderDistribution: {
      male: 45000,
      female: 40000
    },
    nationalityDistribution: {
      saudi: 75000,
      nonSaudi: 10000
    },
    totalUniversities: 3,
    totalGraduates: 20000,
    graduationStats: {
      bachelors: 40000,
      masters: 20000,
      doctorate: 4000,
      diploma: 15000
    },
    universityTrends: [
      {
        name: "Islamic University",
        color: "#9C27B0",
        yearlyData: generateYearlyData(35000)
      },
      {
        name: "Taibah University",
        color: "#FF9800",
        yearlyData: generateYearlyData(30000)
      },
      {
        name: "University of Madinah",
        color: "#00BCD4",
        yearlyData: generateYearlyData(20000)
      }
    ],
    employmentTrends: generateEmploymentTrends(70),
    salaryTrends: generateSalaryTrends(58000)
  },
  {
    region: "QASSIM",
    totalStudents: 55000,
    genderDistribution: {
      male: 30000,
      female: 25000
    },
    nationalityDistribution: {
      saudi: 50000,
      nonSaudi: 5000
    },
    totalUniversities: 2,
    totalGraduates: 15000,
    graduationStats: {
      bachelors: 30000,
      masters: 10000,
      doctorate: 2000,
      diploma: 10000
    },
    universityTrends: [
      {
        name: "Qassim University",
        color: "#607D8B",
        yearlyData: generateYearlyData(30000)
      },
      {
        name: "Buraydah College",
        color: "#FFC107",
        yearlyData: generateYearlyData(25000)
      }
    ],
    employmentTrends: generateEmploymentTrends(70),
    salaryTrends: generateSalaryTrends(52000)
  },
  {
    region: "ASH-SHARQIYAH",
    totalStudents: 85000,
    genderDistribution: {
      male: 45000,
      female: 40000
    },
    nationalityDistribution: {
      saudi: 75000,
      nonSaudi: 10000
    },
    totalUniversities: 3,
    totalGraduates: 20000,
    graduationStats: {
      bachelors: 40000,
      masters: 20000,
      doctorate: 4000,
      diploma: 15000
    },
    universityTrends: [
      {
        name: "King Fahd University",
        color: "#9C27B0",
        yearlyData: generateYearlyData(35000)
      },
      {
        name: "Imam Abdulrahman University",
        color: "#FF9800",
        yearlyData: generateYearlyData(30000)
      },
      {
        name: "University of Dammam",
        color: "#00BCD4",
        yearlyData: generateYearlyData(20000)
      }
    ],
    employmentTrends: generateEmploymentTrends(70),
    salaryTrends: generateSalaryTrends(60000)
  },
  {
    region: "ASIR",
    totalStudents: 45000,
    genderDistribution: {
      male: 24000,
      female: 21000
    },
    nationalityDistribution: {
      saudi: 42000,
      nonSaudi: 3000
    },
    totalUniversities: 2,
    totalGraduates: 12000,
    graduationStats: {
      bachelors: 25000,
      masters: 8000,
      doctorate: 1500,
      diploma: 8000
    },
    universityTrends: [
      {
        name: "King Khalid University",
        color: "#4CAF50",
        yearlyData: generateYearlyData(25000)
      },
      {
        name: "University of Bisha",
        color: "#2196F3",
        yearlyData: generateYearlyData(20000)
      }
    ],
    employmentTrends: generateEmploymentTrends(70),
    salaryTrends: generateSalaryTrends(48000)
  },
  {
    region: "TABUK",
    totalStudents: 45000,
    genderDistribution: {
      male: 24000,
      female: 21000
    },
    nationalityDistribution: {
      saudi: 42000,
      nonSaudi: 3000
    },
    totalUniversities: 2,
    totalGraduates: 13000,
    graduationStats: {
      bachelors: 25000,
      masters: 8000,
      doctorate: 1500,
      diploma: 8000
    },
    universityTrends: [
      {
        name: "University of Tabuk",
        color: "#4CAF50",
        yearlyData: generateYearlyData(25000)
      },
      {
        name: "Fahad Bin Sultan University",
        color: "#2196F3",
        yearlyData: generateYearlyData(20000)
      }
    ],
    employmentTrends: generateEmploymentTrends(70),
    salaryTrends: generateSalaryTrends(50000)
  },
  {
    region: "HAIL",
    totalStudents: 35000,
    genderDistribution: {
      male: 19000,
      female: 16000
    },
    nationalityDistribution: {
      saudi: 32000,
      nonSaudi: 3000
    },
    totalUniversities: 2,
    totalGraduates: 10000,
    graduationStats: {
      bachelors: 20000,
      masters: 5000,
      doctorate: 1000,
      diploma: 5000
    },
    universityTrends: [
      {
        name: "University of Hail",
        color: "#9C27B0",
        yearlyData: generateYearlyData(20000)
      },
      {
        name: "Hail Community College",
        color: "#FF9800",
        yearlyData: generateYearlyData(15000)
      }
    ],
    employmentTrends: generateEmploymentTrends(70),
    salaryTrends: generateSalaryTrends(46000)
  },
  {
    region: "NORTHERN BORDERS",
    totalStudents: 25000,
    genderDistribution: {
      male: 13000,
      female: 12000
    },
    nationalityDistribution: {
      saudi: 23000,
      nonSaudi: 2000
    },
    totalUniversities: 2,
    totalGraduates: 7000,
    graduationStats: {
      bachelors: 15000,
      masters: 3000,
      doctorate: 500,
      diploma: 3000
    },
    universityTrends: [
      {
        name: "Northern Border University",
        color: "#607D8B",
        yearlyData: generateYearlyData(15000)
      },
      {
        name: "Arar Technical College",
        color: "#FFC107",
        yearlyData: generateYearlyData(10000)
      }
    ],
    employmentTrends: generateEmploymentTrends(70),
    salaryTrends: generateSalaryTrends(44000)
  },
  {
    region: "JAZAN",
    totalStudents: 40000,
    genderDistribution: {
      male: 22000,
      female: 18000
    },
    nationalityDistribution: {
      saudi: 37000,
      nonSaudi: 3000
    },
    totalUniversities: 2,
    totalGraduates: 12000,
    graduationStats: {
      bachelors: 25000,
      masters: 6000,
      doctorate: 1000,
      diploma: 6000
    },
    universityTrends: [
      {
        name: "Jazan University",
        color: "#3F51B5",
        yearlyData: generateYearlyData(25000)
      },
      {
        name: "Technical College of Jazan",
        color: "#009688",
        yearlyData: generateYearlyData(15000)
      }
    ],
    employmentTrends: generateEmploymentTrends(70),
    salaryTrends: generateSalaryTrends(52000)
  },
  {
    region: "NAJRAN",
    totalStudents: 30000,
    genderDistribution: {
      male: 16000,
      female: 14000
    },
    nationalityDistribution: {
      saudi: 28000,
      nonSaudi: 2000
    },
    totalUniversities: 2,
    totalGraduates: 9000,
    graduationStats: {
      bachelors: 18000,
      masters: 4000,
      doctorate: 500,
      diploma: 4000
    },
    universityTrends: [
      {
        name: "Najran University",
        color: "#E91E63",
        yearlyData: generateYearlyData(20000)
      },
      {
        name: "Najran Technical College",
        color: "#673AB7",
        yearlyData: generateYearlyData(10000)
      }
    ],
    employmentTrends: generateEmploymentTrends(70),
    salaryTrends: generateSalaryTrends(50000)
  },
  {
    region: "AL BAHAH",
    totalStudents: 20000,
    genderDistribution: {
      male: 11000,
      female: 9000
    },
    nationalityDistribution: {
      saudi: 19000,
      nonSaudi: 1000
    },
    totalUniversities: 2,
    totalGraduates: 6000,
    graduationStats: {
      bachelors: 12000,
      masters: 3000,
      doctorate: 500,
      diploma: 3000
    },
    universityTrends: [
      {
        name: "Al Baha University",
        color: "#FF5722",
        yearlyData: generateYearlyData(12000)
      },
      {
        name: "Al Baha Technical College",
        color: "#795548",
        yearlyData: generateYearlyData(8000)
      }
    ],
    employmentTrends: generateEmploymentTrends(70),
    salaryTrends: generateSalaryTrends(48000)
  },
  {
    region: "AL JAWF",
    totalStudents: 15000,
    genderDistribution: {
      male: 8000,
      female: 7000
    },
    nationalityDistribution: {
      saudi: 14000,
      nonSaudi: 1000
    },
    totalUniversities: 2,
    totalGraduates: 4500,
    graduationStats: {
      bachelors: 10000,
      masters: 2000,
      doctorate: 500,
      diploma: 2000
    },
    universityTrends: [
      {
        name: "Al Jouf University",
        color: "#607D8B",
        yearlyData: generateYearlyData(10000)
      },
      {
        name: "Sakaka Technical College",
        color: "#FFC107",
        yearlyData: generateYearlyData(5000)
      }
    ],
    employmentTrends: generateEmploymentTrends(70),
    salaryTrends: generateSalaryTrends(46000)
  }
];
