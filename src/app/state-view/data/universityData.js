export const universityData = {
  overview: {
    total_universities: 51,
    university_types: {
      public: 27,
      private: 24
    },
    graduates: {
      total: 207900,
      breakdown: {
        citizens: 203600,
        non_citizens: 4300
      },
      gender_distribution: {
        males: 39,
        females: 61
      }
    }
  },
  regions: {
    Riyadh: {
      total_graduates: 40000,
      employment_rate: 58,
      gender_distribution: {
        males: 16000,
        females: 24000
      },
      graduates_by_qualification: {
        doctorate: 800,
        masters: 4000,
        bachelor: 32000,
        associate_diploma: 1600,
        intermediate_diploma: 1600
      },
      graduates_by_major: [
        { major: "Business, Management and Law", graduates: 14000 },
        { major: "Health and Welfare", graduates: 10000 },
        { major: "Engineering and Manufacturing", graduates: 8000 },
        { major: "ICT", graduates: 8000 }
      ],
      mapImage: "/data/riyadh15-Photoroom.png"
    },
    "Eastern Province": {
      total_graduates: 30000,
      employment_rate: 59,
      gender_distribution: {
        males: 13500,
        females: 16500
      },
      graduates_by_qualification: {
        doctorate: 600,
        masters: 3000,
        bachelor: 24000,
        associate_diploma: 1200,
        intermediate_diploma: 1200
      },
      graduates_by_major: [
        { major: "Engineering and Manufacturing", graduates: 12000 },
        { major: "Business, Management and Law", graduates: 8000 },
        { major: "ICT", graduates: 6000 },
        { major: "Health and Welfare", graduates: 4000 }
      ],
      mapImage: "/data/eastern-province.png"
    },
    Mecca: {
      total_graduates: 21500,
      employment_rate: 54,
      gender_distribution: {
        males: 9675,
        females: 11825
      },
      graduates_by_qualification: {
        doctorate: 430,
        masters: 2150,
        bachelor: 17200,
        associate_diploma: 860,
        intermediate_diploma: 860
      },
      graduates_by_major: [
        { major: "Business, Management and Law", graduates: 7525 },
        { major: "Health and Welfare", graduates: 5375 },
        { major: "Engineering and Manufacturing", graduates: 4300 },
        { major: "ICT", graduates: 4300 }
      ],
      mapImage: "/data/mecca.png"
    }
  }
};
