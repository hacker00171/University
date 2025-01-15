"use client";

import mockDataMajor from "./mock_data_major.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BiFemale } from "react-icons/bi";
import { BiMale } from "react-icons/bi";
import { PiMoneyFill } from "react-icons/pi";
import { FaBusinessTime } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import { Row, Col } from "antd";
import { ResponsiveSankey, SankeyNodeDatum } from "@nivo/sankey";

interface SankeyCustomNodeData {
  id: string;
  nodeColor: string;
}

interface SankeyCustomLinkData {
  source: string;
  target: string;
  value: number;
}

export default function SecondPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMajor, setSelectedMajor] = useState(
    "Business, administration and law"
  );

  // Color mapping for majors and employment timing
  const colorMapping = {
    // General Majors
    "Health and Welfare": "#06b6d4",
    "Engineering, manufacturing and construction": "#8b5cf6",
    "Business, administration and law": "#f59e0b",
    "Communications and Information Technology": "#ec4899",
    "Natural Sciences, Mathematics and Statistics": "#3b82f6",
    "Social Sciences, Journalism, Information and Media": "#14b8a6",
    "Agriculture, Forestry, Fisheries and Veterinary": "#84cc16",
    Education: "#7c3aed",
    Services: "#f43f5e",
    "Generic Programs and Qualifications": "#6366f1", // Changed to ensure uniqueness

    // Employment timing nodes
    "Before Graduation": "#c6c630",
    "Within First Year": "#19ce91",
    "After First Year": "#25b0ba", // Changed to ensure uniqueness
  };

  // Helper function to get color for narrow major based on selected general major
  const getNarrowMajorColor = (narrowMajor: string, selectedMajor: string) => {
    // Return the color of the selected general major
    return colorMapping[selectedMajor] || "#6366f1";
  };

  useEffect(() => {
    const majorParam = searchParams.get("major");
    if (majorParam) {
      setSelectedMajor(decodeURIComponent(majorParam));
    }
  }, [searchParams]);

  // Find the selected major's data
  const majorData =
    mockDataMajor.majorsInsights.byGeneralMajor.generalMajors.find(
      (major) =>
        major.generalMajor.toLowerCase() === selectedMajor.toLowerCase()
    );

  const overviewStats = majorData?.overall.totalMetrics;
  const topOccupations =
    majorData?.overall.topOccupationsInsights.highestPaying || [];
  const narrowMajors =
    majorData?.overall.topNarrowMajorsInsights.topByEmploymentTiming || [];

  // Find the highest salary for scaling the occupation bars
  const maxSalary = Math.max(...topOccupations.map((occ) => occ.averageSalary));

  // Find the highest graduates count for scaling the narrow major bars
  // const maxGraduates = Math.max(...narrowMajors.map(major => major.graduates));

  return (
    <div className="min-h-screen bg-transparent backdrop-blur-sm">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-8 max-w-7xl">
        {/* Major Selection */}
        {/* <div className="mb-6">
          <select 
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            className="bg-[#1E1F5E]/30 text-white border border-white/30 rounded-xl px-4 py-2 w-full md:w-auto"
          >
            {mockDataMajor.majorsInsights.byGeneralMajor.generalMajors.map((major) => (
              <option key={major.generalMajor} value={major.generalMajor}>
                {major.generalMajor}
              </option>
            ))}
          </select>
        </div> */}

        {/* Major Title */}
        <div className="mb-5">
          <h1 className="text-white/90 font-['Neo_Sans_Medium'] text-2xl text-center">
            {selectedMajor}
          </h1>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Graduates */}
          <div className="bg-gradient-to-r from-transparent to-[#2CCAD3]/20 rounded-2xl p-3 backdrop-blur-sm border border-white hover:border-[#2CCAD3]/30 transition-colors flex flex-col justify-center items-center">
            <div className="flex items-center gap-3">
              <div
                className="bg-[#2CCAD3]/10 p-2 rounded-xl"
                style={{ backgroundColor: "transparent", borderRadius: 0 }}
              >
                <Image
                  src="/icons/graduateicon.svg"
                  alt="Employment"
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-['Neo_Sans_Medium'] text-white/80">
                  Total Graduates
                </p>
                <p className="text-4xl font-bold text-white text-left">
                  {overviewStats?.graduates.totalGraduates.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-1 justify-start">
                  <div className="bg-[#2CCAD3]/20 rounded-full flex items-center gap-1 px-2 py-0.5">
                    <BiMale style={{ color: "#2CCAD3" }} />
                    <span className="text-xs text-white">
                      {overviewStats?.graduates.male.percentage}%
                    </span>
                  </div>
                  <div className="bg-[#2CCAD3]/20 rounded-full flex items-center gap-1 px-2 py-0.5">
                    <BiFemale style={{ color: "#fe1684" }} />
                    <span className="text-xs text-white">
                      {overviewStats?.graduates.female.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Rate */}
          <div className="bg-gradient-to-r from-transparent to-[#2CCAD3]/20 rounded-2xl p-3 backdrop-blur-sm border border-white hover:border-[#2CCAD3]/30 transition-colors flex flex-col justify-center items-center">
            <div className="flex items-center gap-3">
              <div
                className="bg-[#2CCAD3]/10 p-2 rounded-xl"
                style={{ backgroundColor: "transparent", borderRadius: 0 }}
              >
                <Image
                  src="/icons/employmentrateicon.svg"
                  alt="Employment"
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-['Neo_Sans_Medium'] text-white/80">
                  Employment Rate
                </p>
                <p className="text-4xl font-bold text-white text-left">
                  {overviewStats?.employmentRate}%
                </p>
              </div>
            </div>
          </div>

          {/* Average Salary */}
          <div className="bg-gradient-to-r from-transparent to-[#2CCAD3]/20 rounded-2xl p-3 backdrop-blur-sm border border-white hover:border-[#2CCAD3]/30 transition-colors flex flex-col justify-center items-center">
            <div className="flex items-center gap-3">
              <div
                className="bg-[#2CCAD3]/10 p-2 rounded-xl"
                style={{ backgroundColor: "transparent", borderRadius: 0 }}
              >
                <PiMoneyFill
                  style={{ color: "#2CCAD3", width: 32, height: 32 }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-['Neo_Sans_Medium'] text-white/80">
                  Average Salary
                </p>
                <p className="text-4xl font-bold text-white text-left">
                  {overviewStats?.averageSalary.toLocaleString()}
                  <span className="font-normal text-lg">SAR</span>
                </p>
              </div>
            </div>
          </div>

          {/* Time to Employment */}
          <div className="bg-gradient-to-r from-transparent to-[#2CCAD3]/20 rounded-l-2xl p-3 backdrop-blur-sm border border-white hover:border-[#2CCAD3]/30 transition-colors flex flex-col justify-center items-center">
            <div className="flex items-center gap-3">
              <div
                className="bg-[#2CCAD3]/10 p-2 rounded-xl"
                style={{ backgroundColor: "transparent", borderRadius: 0 }}
              >
                <FaBusinessTime
                  style={{ color: "#2CCAD3", width: 32, height: 32 }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-['Neo_Sans_Medium'] text-white/80">
                  Time to Employment
                </p>
                <p className="text-4xl font-bold text-white text-left">
                  {overviewStats?.timeToEmployment.overall.days}
                  <span className="font-normal text-lg">days</span>
                </p>
              </div>
            </div>
          </div>

          {/* Time to Employment Breakdown */}
          <div className="rounded-xl py-1">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="space-y-1.5">
                  {/* Before Graduate */}
                  <div
                    className="p-0.5 flex justify-between items-center"
                    style={{
                      background:
                        "linear-gradient(90deg, #176481 0%, #1E1F5E 100%)",
                    }}
                  >
                    <span className="text-sm text-white/50 ml-1">
                      before gudurate
                    </span>
                    <span className="text-lg font-['Neo_Sans_Bold'] font-bold text-white">
                      {
                        majorData?.overall.totalMetrics.timeToEmployment
                          .beforeGraduation.percentage
                      }
                      %
                    </span>
                  </div>

                  {/* Within First Year */}
                  <div
                    className="p-0.5 flex justify-between items-center"
                    style={{
                      background:
                        "linear-gradient(90deg, #176481 0%, #1E1F5E 100%)",
                    }}
                  >
                    <span className="text-sm text-white/50 ml-1">
                      within first year
                    </span>
                    <span className="text-lg font-['Neo_Sans_Bold'] font-bold text-white">
                      {
                        majorData?.overall.totalMetrics.timeToEmployment
                          .withinFirstYear.percentage
                      }
                      %
                    </span>
                  </div>

                  {/* After First Year */}
                  <div
                    className=" p-0.5 flex justify-between items-center"
                    style={{
                      background:
                        "linear-gradient(90deg, #176481 0%, #1E1F5E 100%)",
                    }}
                  >
                    <span className="text-sm text-white/50 ml-1">
                      After first year
                    </span>
                    <span className="text-lg font-['Neo_Sans_Bold'] font-bold text-white">
                      {
                        majorData?.overall.totalMetrics.timeToEmployment
                          .afterFirstYear.percentage
                      }
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Using Ant Design Grid */}
      </div>
      <Row
        gutter={[12, 12]}
        className="w-full"
        style={{ padding: "0em 0.2em 0em 1.4em", marginTop: "-0.5em" }}
      >
        {/* Top Popular Occupations */}
        <Col xs={24} lg={7}>
          <div className="bg-[#1E1F5E]/50 rounded-2xl p-6 backdrop-blur-sm border hover:border-white transition-colors h-full">
            <h2 className="text-xl font-['Neo_Sans_Bold'] mb-6 flex items-center gap-2">
              <div className="bg-[#2CCAD3]/10 p-1.5 rounded-lg">
                <Image
                  src="/icons/occupation.svg"
                  alt="Occupation"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-white">Top Popular Occupations</span>
            </h2>
            <div className="space-y-4 relative">
              {/* Vertical line */}
              <div className="absolute left-[180px] top-0 bottom-0 w-[1.5px] bg-gray-100" />
              {majorData?.overall?.topOccupationsInsights?.mostPopular?.map(
                (occupation, index) => {
                  // Find the maximum salary to calculate the percentage width
                  const maxSalary = Math.max(
                    ...(majorData?.overall?.topOccupationsInsights?.mostPopular?.map(
                      (o) => o.totalGraduates
                    ) || [0])
                  );
                  const width = (occupation.totalGraduates / maxSalary) * 100;

                  return (
                    <div key={index} className="flex items-center group">
                      <div className="w-[180px] relative">
                        <div className="absolute inset-0 bg-[#1E1F5E]/90 rounded-full group-hover:bg-[#2CCAD3]/20 transition-colors" />
                        <span className="relative z-10 text-sm font-['Roboto_Regular'] text-white/70 px-3 py-1 block break-words capitalize">
                          {occupation.occupation}
                        </span>
                      </div>
                      <div className="relative flex-1 h-8">
                        <div
                          className="absolute border-[1px] border-white left-0 top-1/2 -translate-y-1/2 h-7 rounded-r-full group-hover:opacity-90 transition-opacity"
                          style={{
                            width: `${width}%`,
                            maxWidth: "100%",
                            background:
                              "linear-gradient(90deg, #377eab 0%, #1A1B4B 100%)",
                          }}
                        >
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <span className="text-base font-['Neo_Sans_Bold'] font-bold text-white">
                              {occupation.totalGraduates.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
              {!majorData?.overall?.topOccupationsInsights?.mostPopular
                ?.length && (
                <div className="flex items-center justify-center h-[200px] text-white/40">
                  No data available
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* Degrees - Wider column */}
        <Col xs={24} lg={11}>
          <div className="bg-[#1E1F5E]/50 rounded-2xl p-6 backdrop-blur-sm border hover:border-white transition-colors h-full">
            <h2 className="text-xl font-['Neo_Sans_Bold'] mb-6 flex items-center gap-2">
              <div className="bg-[#2CCAD3]/10 p-1.5 rounded-lg">
                <Image
                  src="/icons/degree.svg"
                  alt="Degree"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-white">Degree</span>
            </h2>
            <div className="space-y-4 relative">
              {/* Vertical line */}
              <div className="absolute left-[160px] top-0 bottom-0 w-[1.5px] bg-gray-100 " />

              {majorData?.overall.totalMetrics.educationLevelInsights.map(
                (level, index) => {
                  const maxGraduates = Math.max(
                    ...majorData.overall.totalMetrics.educationLevelInsights.map(
                      (l) => l.totalGraduates
                    )
                  );
                  const width = (level.totalGraduates / maxGraduates) * 100;
                  const isSmallBar = width < 30;

                  return (
                    <div key={index} className="flex items-center group">
                      <div className="w-[160px] relative">
                        <div className="absolute inset-0 bg-[#1E1F5E]/90 rounded-full group-hover:bg-[#2CCAD3]/20 transition-colors" />
                        <span className="relative z-10 text-sm font-['Roboto_Regular'] text-white/70 px-3 py-1 block truncate">
                          {level.educationLevel}
                        </span>
                      </div>
                      <div className="relative flex-1 h-8 flex items-center">
                        {/* Bar with total graduates */}
                        <div
                          className="absolute border-[1px] border-white left-0 top-1/2 -translate-y-1/2 h-7 rounded-r-full group-hover:opacity-90 transition-opacity"
                          style={{
                            width: `${Math.max(width, 12)}%`,
                            maxWidth: "100%",
                            background:
                              "linear-gradient(90deg, #377eab 0%, #1A1B4B 100%)",
                          }}
                        >
                          {/* Total Graduates - Always inside bar */}
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <span className="text-sm font-['Neo_Sans_Bold'] font-bold text-white whitespace-nowrap">
                              {level.totalGraduates.toLocaleString()}
                            </span>
                          </div>

                          {/* Gender percentages - Inside bar when enough space */}
                          {!isSmallBar && (
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                              <div className="bg-[#2CCAD3]/20 rounded-full flex items-center gap-1 px-2">
                                <BiMale style={{ color: "#2CCAD3" }} />
                                <span className="text-xs font-['Roboto_Regular'] text-white whitespace-nowrap">
                                  {level.malePercentage}%
                                </span>
                              </div>
                              <div className="bg-[#2CCAD3]/20 rounded-full flex items-center gap-1 px-2">
                                <BiFemale style={{ color: "#fe1684" }} />
                                <span className="text-xs font-['Roboto_Regular'] text-white whitespace-nowrap">
                                  {level.femalePercentage}%
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Gender percentages - Outside bar when not enough space */}
                        {isSmallBar && (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none"
                            style={{
                              left: `calc(${Math.max(width, 12)}% + 8px)`,
                              minWidth: "max-content",
                            }}
                          >
                            <div className="bg-[#2CCAD3]/20 rounded-full flex items-center gap-1 px-2 whitespace-nowrap">
                              <BiMale style={{ color: "#2CCAD3" }} />
                              <span className="text-xs font-['Roboto_Regular'] text-white">
                                {level.malePercentage}%
                              </span>
                            </div>
                            <div className="bg-[#2CCAD3]/20 rounded-full flex items-center gap-1 px-2 whitespace-nowrap">
                              <BiFemale style={{ color: "#fe1684" }} />
                              <span className="text-xs font-['Roboto_Regular'] text-white">
                                {level.femalePercentage}%
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
              {!majorData?.overall.totalMetrics.educationLevelInsights
                ?.length && (
                <div className="flex items-center justify-center h-[200px] text-white/40">
                  No data available
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* Top Majors by Gender */}
        <Col xs={24} lg={6}>
          <div className="bg-[#1E1F5E]/50 rounded-2xl p-6 backdrop-blur-sm border hover:border-white transition-colors h-full">
            <h2 className="text-xl font-['Neo_Sans_Bold'] mb-6 flex items-center gap-2">
              <div className="bg-[#2CCAD3]/10 p-1.5 rounded-lg">
                <div className="flex gap-1">
                  <BiMale style={{ color: "#2CCAD3", width: 12, height: 12 }} />
                  <BiFemale
                    style={{ color: "#2CCAD3", width: 12, height: 12 }}
                  />
                </div>
              </div>
              <span className="text-white">Top Majors by Gender</span>
            </h2>
            <div className="space-y-4">
              {majorData?.overall?.topNarrowMajorsInsights?.topByGender
                ?.slice(0, 5)
                .map((major, index) => (
                  <div key={index} className="relative">
                    <div className="mb-1 flex justify-between items-center">
                      <span className="text-sm font-['Roboto_Regular'] text-white/70">
                        {major.narrowMajor}
                      </span>
                      <span className="text-xs font-['Roboto_Regular'] text-white/50">
                        {major.graduates} graduates
                      </span>
                    </div>
                    <div className="relative h-8 bg-[#1E1F5E] rounded-full overflow-hidden">
                      {/* Male percentage */}
                      <div
                        className="absolute h-full bg-gradient-to-r from-[#2CCAD3]/30 to-[#2CCAD3]/50 group-hover:opacity-90 transition-opacity cursor-pointer"
                        style={{
                          width: `${major.genderDistribution.male.percentage}%`,
                          left: 0,
                        }}
                        onClick={() => {
                          router.push(
                            `/narrow_major?major=${encodeURIComponent(
                              major.narrowMajor
                            )}&generalMajor=${encodeURIComponent(
                              selectedMajor
                            )}`
                          );
                        }}
                      >
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <BiMale style={{ color: "#2CCAD3" }} />
                          <span className="text-xs font-['Roboto_Regular'] text-white">
                            {major.genderDistribution.male.percentage}%
                          </span>
                        </div>
                      </div>
                      {/* Female percentage */}
                      <div
                        className="absolute h-full bg-gradient-to-r from-[#fe1684]/30 to-[#fe1684]/50 group-hover:opacity-90 transition-opacity cursor-pointer"
                        style={{
                          width: `${major.genderDistribution.female.percentage}%`,
                          right: 0,
                        }}
                        onClick={() => {
                          router.push(
                            `/narrow_major?major=${encodeURIComponent(
                              major.narrowMajor
                            )}&generalMajor=${encodeURIComponent(
                              selectedMajor
                            )}`
                          );
                        }}
                      >
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <span className="text-xs font-['Roboto_Regular'] text-white">
                            {major.genderDistribution.female.percentage}%
                          </span>
                          <BiFemale style={{ color: "#fe1684" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {!majorData?.overall?.topNarrowMajorsInsights?.topByGender
                ?.length && (
                <div className="flex items-center justify-center h-[200px] text-white/40">
                  No data available
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row
        gutter={[12, 12]}
        className="w-full"
        style={{ padding: "0em 0.2em 0em 1.4em", marginTop: "1em" }}
      >
        {/* Top 5 Occupations */}
        <Col xs={24} lg={7}>
          <div className="bg-[#1E1F5E]/50 rounded-2xl p-6 backdrop-blur-sm border hover:border-white transition-colors h-full">
            <h2 className="text-xl font-['Neo_Sans_Bold'] mb-6 flex items-center gap-2">
              <div className="bg-[#2CCAD3]/10 p-1.5 rounded-lg">
                <Image
                  src="/icons/occupation.svg"
                  alt="Occupation"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-white">Top 5 occupation by salary</span>
            </h2>
            <div className="space-y-4 relative">
              {/* Vertical line */}
              <div className="absolute left-[150px] top-0 bottom-0 w-[1.5px] bg-gray-100 " />
              {topOccupations.map((occupation, index) => {
                const width = (occupation.averageSalary / maxSalary) * 100;
                return (
                  <div key={index} className="flex items-center group">
                    <div className="w-[150px] relative">
                      <div className="absolute inset-0 bg-[#1E1F5E]/90 rounded-full group-hover:bg-[#2CCAD3]/20 transition-colors" />
                      <span className="relative z-10 text-sm font-['Roboto_Regular'] text-white/70 px-3 py-1 block break-words">
                        {occupation.occupation}
                      </span>
                    </div>
                    <div className="relative flex-1 h-8">
                      <div
                        className="absolute border-[1px] border-white left-0 top-1/2 -translate-y-1/2 h-7 rounded-r-full group-hover:opacity-90 transition-opacity"
                        style={{
                          width: `${width}%`,
                          maxWidth: "100%",
                          background:
                            "linear-gradient(90deg, #377eab 0%, #1A1B4B 100%)",
                        }}
                      >
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                          <span className="text-base font-['Neo_Sans_Bold'] font-bold text-white">
                            {occupation.averageSalary.toLocaleString()}
                          </span>
                          <span className="text-xs font-['Roboto_Regular'] text-white ml-1">
                            SAR
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
        {/* Sankey Chart Row */}
        <Col xs={24} lg={11}>
          <div className="bg-[#1E1F5E]/50 rounded-2xl p-6 backdrop-blur-sm border hover:border-white transition-colors">
            <h2 className="text-xl font-['Neo_Sans_Bold'] mb-6 flex items-center gap-2">
              <div className="bg-[#2CCAD3]/10 p-1.5 rounded-lg">
                <Image
                  src="/icons/major.svg"
                  alt="Major"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-white">
                Narrow Majors By Time of Employment
              </span>
            </h2>

            {/* Chart */}
            <div className="h-[300px] w-[648px]">
              {majorData?.overall.topNarrowMajorsInsights.topByEmploymentTiming
                .length > 0 ? (
                <ResponsiveSankey
                  data={{
                    nodes: [
                      ...majorData.overall.topNarrowMajorsInsights.topByEmploymentTiming.map(
                        (major) => ({
                          id: major.narrowMajor,
                          nodeColor: getNarrowMajorColor(
                            major.narrowMajor,
                            selectedMajor
                          ),
                        })
                      ),
                      {
                        id: "Before Graduation",
                        nodeColor: colorMapping["Before Graduation"],
                      },
                      {
                        id: "Within First Year",
                        nodeColor: colorMapping["Within First Year"],
                      },
                      {
                        id: "After First Year",
                        nodeColor: colorMapping["After First Year"],
                      },
                    ],
                    links:
                      majorData.overall.topNarrowMajorsInsights.topByEmploymentTiming.flatMap(
                        (major) => [
                          {
                            source: major.narrowMajor,
                            target: "Before Graduation",
                            value:
                              major.employmentTiming.beforeGraduation
                                .percentage,
                          },
                          {
                            source: major.narrowMajor,
                            target: "Within First Year",
                            value:
                              major.employmentTiming.withinFirstYear.percentage,
                          },
                          {
                            source: major.narrowMajor,
                            target: "After First Year",
                            value:
                              major.employmentTiming.afterFirstYear.percentage,
                          },
                        ]
                      ),
                  }}
                  onClick={(
                    node: SankeyNodeDatum<
                      SankeyCustomNodeData,
                      SankeyCustomLinkData
                    >
                    // node: SankeyNodeDatum<SankeyCustomNodeData, never>
                  ) => {
                    // Only navigate if clicking on a major node (not timing nodes)
                    if (
                      node.id !== "Before Graduation" &&
                      node.id !== "Within First Year" &&
                      node.id !== "After First Year"
                    ) {
                      router.push(
                        `/narrow_major?major=${encodeURIComponent(
                          node.id
                        )}&generalMajor=${encodeURIComponent(selectedMajor)}`
                      );
                    }
                  }}
                  margin={{ top: 20, right: 120, bottom: 20, left: 240 }}
                  align="justify"
                  colors={(node) => {
                    // For employment timing nodes
                    if (
                      [
                        "Before Graduation",
                        "Within First Year",
                        "After First Year",
                      ].includes(node.id)
                    ) {
                      return colorMapping[node.id];
                    }
                    // For narrow majors, use the selected general major's color
                    return getNarrowMajorColor(node.id, selectedMajor);
                  }}
                  nodeOpacity={1}
                  nodeThickness={20}
                  nodeInnerPadding={3}
                  nodeSpacing={24}
                  nodeBorderWidth={0}
                  nodeBorderRadius={3}
                  linkOpacity={0.3}
                  linkHoverOpacity={0.7}
                  linkContract={3}
                  enableLinkGradient={true}
                  labelPosition="outside"
                  labelOrientation="horizontal"
                  labelPadding={4}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1]],
                  }}
                  animate={true}
                  theme={{
                    labels: {
                      text: {
                        fontSize: 12,
                        fill: "#fff",
                        fontFamily: "Neo_Sans_Medium",
                      },
                    },
                    tooltip: {
                      container: {
                        background: "#1E1F5E",
                        color: "#fff",
                        fontSize: 12,
                        borderRadius: 8,
                        padding: "8px 12px",
                      },
                    },
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-[200px] text-white/40">
                  No data available
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* Employment Rate by Narrow Major */}
        <Col xs={24} lg={6}>
          <div className="bg-[#1E1F5E]/50 rounded-2xl p-6 backdrop-blur-sm border hover:border-white transition-colors h-full">
            <h2 className="text-xl font-['Neo_Sans_Bold'] mb-6 flex items-center gap-2">
              <div className="bg-[#2CCAD3]/10 p-1.5 rounded-lg">
                <Image
                  src="/icons/employmentrateicon.svg"
                  alt="Employment Rate"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-white">Employment Rate by Major</span>
            </h2>
            <div className="space-y-4 relative">
              {/* Vertical line */}
              <div className="absolute left-[200px] top-0 bottom-0 w-[1.5px] bg-gray-100" />
              {majorData?.overall?.topNarrowMajorsInsights?.topByGender
                ?.slice(0, 5)
                .map((major, index) => {
                  const width = (major.employmentRate / 100) * 100; // Convert to percentage
                  return (
                    <div key={index} className="flex items-center group">
                      <div
                        className="w-[200px] relative cursor-pointer"
                        onClick={() => {
                          router.push(
                            `/narrow_major?major=${encodeURIComponent(
                              major.narrowMajor
                            )}&generalMajor=${encodeURIComponent(
                              selectedMajor
                            )}`
                          );
                        }}
                      >
                        <div className="absolute inset-0 bg-[#1E1F5E]/90 rounded-full group-hover:bg-[#2CCAD3]/20 transition-colors" />
                        <span className="relative z-10 text-sm font-['Roboto_Regular'] text-white/70 px-3 py-1 block break-words">
                          {major.narrowMajor}
                        </span>
                      </div>
                      <div className="relative flex-1 h-18">
                        <div
                          className="absolute border-[1px] border-white left-0 top-1/2 -translate-y-1/2 h-7 rounded-r-full group-hover:opacity-90 transition-opacity cursor-pointer"
                          style={{
                            width: `${width}%`,
                            maxWidth: "100%",
                            background:
                              "linear-gradient(90deg, #377eab 0%, #1A1B4B 100%)",
                          }}
                          onClick={() => {
                            router.push(
                              `/narrow_major?major=${encodeURIComponent(
                                major.narrowMajor
                              )}&generalMajor=${encodeURIComponent(
                                selectedMajor
                              )}`
                            );
                          }}
                        >
                          <div className="absolute top-1/2 -translate-y-1/2">
                            <span className="text-base font-['Neo_Sans_Bold'] font-bold text-white">
                              {major.employmentRate}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {!majorData?.overall?.topNarrowMajorsInsights?.topByGender
                ?.length && (
                <div className="flex items-center justify-center h-[200px] text-white/40">
                  No data available
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
