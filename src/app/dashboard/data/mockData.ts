export const mockData = {
    "overview": {
        "total_universities": 51,
        "total_graduates": 207900,
        "average_employment_rate": 58.5,
        "average_salary": 6500,
        "university_types": {
            "public": 27,
            "private": 24
        },
        "graduates": {
            "total": 207900,
            "breakdown": {
                "citizens": 203600,
                "non_citizens": 4300
            },
            "gender_distribution": {
                "males": 39,
                "females": 61
            }
        },
        "graduates_by_qualification": {
            "bachelor": 174636,
            "master": 11892,
            "doctorate": 3405,
            "diploma": 16258
        }
    },
    "employment": {
        "total_employed_graduates": {
            "one_year_after_graduation": 63016,
            "during_study_and_continuing": 20360
        },
        "top_employment_majors": [
            {"major": "Engineering", "employment_rate": 92, "graduates": 15420},
            {"major": "Computer Science", "employment_rate": 89, "graduates": 12850},
            {"major": "Business Administration", "employment_rate": 85, "graduates": 18960},
            {"major": "Medicine", "employment_rate": 95, "graduates": 8740},
            {"major": "Education", "employment_rate": 78, "graduates": 22140}
        ],
        "median_wages_by_major": [
            {"major": "Engineering", "wage": 12500},
            {"major": "Computer Science", "wage": 13200},
            {"major": "Business Administration", "wage": 10800},
            {"major": "Medicine", "wage": 18500},
            {"major": "Education", "wage": 9200}
        ]
    },
    "regions": {
        "universities": [
            {"name": "Riyadh", "count": 11, "employment_rate": 58},
            {"name": "Eastern", "count": 7, "employment_rate": 59},
            {"name": "Mecca", "count": 3, "employment_rate": 55},
            {"name": "Western", "count": 6, "employment_rate": 54},
            {"name": "Southern", "count": 5, "employment_rate": 53},
            {"name": "Northern", "count": 4, "employment_rate": 50}
        ],
        "graduates": [
            {"name": "Riyadh", "count": 40000, "employment_rate": 58},
            {"name": "Eastern", "count": 30000, "employment_rate": 59},
            {"name": "Western", "count": 25000, "employment_rate": 55},
            {"name": "Mecca", "count": 21500, "employment_rate": 54},
            {"name": "Southern", "count": 17000, "employment_rate": 53},
            {"name": "Northern", "count": 12000, "employment_rate": 50}
        ]
    },
    "top_universities": [
        {"name": "King Saud University", "graduates": 25000, "employment_rate": 65, "research_score": 85},
        {"name": "King Abdulaziz University", "graduates": 22000, "employment_rate": 63, "research_score": 82},
        {"name": "KFUPM", "graduates": 18000, "employment_rate": 68, "research_score": 88},
        {"name": "Umm Al-Qura University", "graduates": 20000, "employment_rate": 60, "research_score": 75},
        {"name": "King Faisal University", "graduates": 16000, "employment_rate": 59, "research_score": 72},
        {"name": "King Khalid University", "graduates": 15000, "employment_rate": 58, "research_score": 70}
    ],
    "graduates_by_major": [
        {"major": "Business", "graduates": 65792, "employment_rate": 59},
        {"major": "Engineering", "graduates": 45000, "employment_rate": 64},
        {"major": "Sciences", "graduates": 38406, "employment_rate": 45},
        {"major": "Health", "graduates": 28777, "employment_rate": 62},
        {"major": "ICT", "graduates": 24058, "employment_rate": 61}
    ]
} as const;
