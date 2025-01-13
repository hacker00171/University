"use client";

import mockDataMajor from "./mock_data_major.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BiFemale } from "react-icons/bi";
import { BiMale } from "react-icons/bi";
import { PiMoneyFill } from "react-icons/pi";
import { FaBusinessTime } from "react-icons/fa6";
// import { GiGraduateCap } from "react-icons/gi";
import { Row, Col } from "antd";

export default function SecondPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMajor, setSelectedMajor] = useState(
    "Business, administration and law"
  );

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
  const topOccupations = majorData?.overall.topOccupationsBySalary || [];
  const narrowMajors = majorData?.overall.topNarrowMajorsInsights || [];

  // Find the highest salary for scaling the occupation bars
  const maxSalary = Math.max(...topOccupations.map((occ) => occ.averageSalary));

  // Find the highest graduates count for scaling the narrow major bars
  const maxGraduates = Math.max(
    ...narrowMajors.map((major) => major.graduates)
  );

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
          <p className="text-white/60 font-['Neo_Sans_Medium']">
            {selectedMajor}
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Graduates */}
          <div className="bg-[#1E1F5E]/30 rounded-2xl p-4 backdrop-blur-sm border border-white hover:border-[#2CCAD3]/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-[#2CCAD3]/10 p-2.5 rounded-xl">
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
                <p className="text-2xl font-['Neo_Sans_Bold'] text-white">
                  {overviewStats?.graduates.totalGraduates.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="bg-[#2CCAD3]/20 rounded-full flex items-center gap-1 px-2 py-0.5">
                    <BiMale style={{ color: "#2CCAD3" }} />
                    <span className="text-xs text-white">
                      {overviewStats?.graduates.male.percentage}%
                    </span>
                  </div>
                  <div className="bg-[#2CCAD3]/20 rounded-full flex items-center gap-1 px-2 py-0.5">
                    <BiFemale style={{ color: "#fe1684 " }} />
                    <span className="text-xs text-white">
                      {overviewStats?.graduates.female.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Rate */}
          <div className="bg-[#1E1F5E]/30 rounded-2xl p-4 backdrop-blur-sm border border-white hover:border-[#2CCAD3]/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-[#2CCAD3]/10 p-2.5 rounded-xl">
                <Image
                  src="/icons/employmentrateicon.svg"
                  alt="Employment"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <p className="text-sm font-['Neo_Sans_Medium'] text-white/80">
                  Employment Rate
                </p>
                <p className="text-2xl font-['Neo_Sans_Bold'] text-white">
                  {overviewStats?.employmentRate}%
                </p>
              </div>
            </div>
          </div>

          {/* Average Salary */}
          <div className="bg-[#1E1F5E]/30 rounded-2xl p-4 backdrop-blur-sm border border-white hover:border-[#2CCAD3]/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-[#2CCAD3]/10 p-2.5 rounded-xl">
                <PiMoneyFill
                  style={{ color: "#2CCAD3", width: 32, height: 32 }}
                />
              </div>
              <div>
                <p className="text-sm font-['Neo_Sans_Medium'] text-white/80">
                  Average Salary
                </p>
                <p className="text-2xl font-['Neo_Sans_Bold'] text-white">
                  {overviewStats?.averageSalary.toLocaleString()} SAR
                </p>
              </div>
            </div>
          </div>

          {/* Time to Employment */}
          <div className="bg-[#1E1F5E]/30 rounded-2xl p-4 backdrop-blur-sm border border-white hover:border-[#2CCAD3]/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-[#2CCAD3]/10 p-2.5 rounded-xl">
                <FaBusinessTime
                  style={{ color: "#2CCAD3", width: 32, height: 32 }}
                />
              </div>
              <div>
                <p className="text-sm font-['Neo_Sans_Medium'] text-white/80">
                  Time to Employment
                </p>
                <p className="text-2xl font-['Neo_Sans_Bold'] text-white">
                  {overviewStats?.timeToEmployment.overall} Days
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
                    <span className="text-sm text-white/90 ml-1">
                      before gudurate
                    </span>
                    <span className="text-lg font-bold text-white">
                      {
                        majorData?.overall.totalMetrics.timeToEmployment
                          .beforeGraduation
                      }{" "}
                      days
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
                    <span className="text-sm text-white/90 ml-1">
                      within first year
                    </span>
                    <span className="text-lg font-bold text-white">
                      {
                        majorData?.overall.totalMetrics.timeToEmployment
                          .withinFirstYear
                      }{" "}
                      days
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
                    <span className="text-sm text-white/90 ml-1">
                      After first year
                    </span>
                    <span className="text-lg font-bold text-white">
                      {
                        majorData?.overall.totalMetrics.timeToEmployment
                          .afterFirstYear
                      }{" "}
                      days
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
        {/* Top 5 Occupations */}
        <Col xs={24} lg={6}>
          <div className="bg-[#1E1F5E]/60 rounded-xl p-6 backdrop-blur-sm border hover:border-white transition-colors h-full">
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
              <div className="absolute left-[120px] top-0 bottom-0 w-[1px] bg-white/20" />
              {topOccupations.map((occupation, index) => {
                const width = (occupation.averageSalary / maxSalary) * 100;
                return (
                  <div key={index} className="flex items-center group">
                    <div className="w-[120px] relative">
                      <div className="absolute inset-0 bg-[#1E1F5E]/90 rounded-full group-hover:bg-[#2CCAD3]/20 transition-colors" />
                      <span className="relative z-10 text-sm font-['Roboto_Regular'] text-white px-3 py-1 block truncate">
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
                          <span className="text-sm font-['Neo_Sans_Bold'] text-white">
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

        {/* Degrees - Wider column */}
        <Col xs={24} lg={11}>
          <div className="bg-[#1E1F5E]/60 rounded-xl p-6 backdrop-blur-sm border hover:border-white transition-colors h-full">
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
              <div className="absolute left-[160px] top-0 bottom-0 w-[1px] bg-white/20" />

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
                        <span className="relative z-10 text-sm font-['Roboto_Regular'] text-white px-3 py-1 block truncate">
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
                            <span className="text-sm font-['Neo_Sans_Bold'] text-white whitespace-nowrap">
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
                                <BiFemale style={{ color: "#2CCAD3" }} />
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
                              <BiFemale style={{ color: "#2CCAD3" }} />
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

        {/* Narrow Majors */}
        <Col xs={24} lg={7}>
          <div className="bg-[#1E1F5E]/60 rounded-xl p-6 backdrop-blur-sm border hover:border-white transition-colors h-full">
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
            {/* Legend */}
            <div className="flex gap-3 items-center mb-6 ml-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#176481]"></div>
                <span className="text-xs font-['Roboto_Regular'] text-white/80">
                  Before Graduation
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2CCAD3]"></div>
                <span className="text-xs font-['Roboto_Regular'] text-white/80">
                  Within First Year
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#377eab]"></div>
                <span className="text-xs font-['Roboto_Regular'] text-white/80">
                  After First Year
                </span>
              </div>
            </div>

            {/* Chart */}
            <div className="space-y-4">
              {majorData?.overall.topNarrowMajorsInsights.map(
                (major, index) => {
                  const beforeGraduation =
                    major.employmentTiming.beforeGraduation.percentage || 0;
                  const withinFirstYear =
                    major.employmentTiming.withinFirstYear.percentage || 0;
                  const afterFirstYear =
                    major.employmentTiming.afterFirstYear.percentage || 0;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        router.push(
                          `/narrow_major?major=${encodeURIComponent(
                            major.narrowMajor
                          )}&generalMajor=${encodeURIComponent(selectedMajor)}`
                        );
                      }}
                      className="group cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <div className="flex items-center gap-2">
                        {/* Major Name */}
                        <div className="w-[200px] shrink-0">
                          <span className="text-sm font-['Roboto_Regular'] text-white/80 leading-tight line-clamp-2 px-2 py-1 rounded-lg group-hover:bg-[#2CCAD3]/20 transition-colors">
                            {major.narrowMajor}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-7 flex-1 flex rounded-full overflow-hidden bg-[#1E1F5E]/40">
                          {/* Before Graduation */}
                          {beforeGraduation > 0 && (
                            <div
                              className="bg-[#176481] flex items-center justify-center relative"
                              style={{
                                width: `calc(${beforeGraduation}% + 30px)`,
                                borderTopLeftRadius: "9999px",
                                borderBottomLeftRadius: "9999px",
                                borderTopRightRadius:
                                  withinFirstYear === 0 && afterFirstYear === 0
                                    ? "9999px"
                                    : "0px",
                                borderBottomRightRadius:
                                  withinFirstYear === 0 && afterFirstYear === 0
                                    ? "9999px"
                                    : "0px",
                              }}
                            >
                              <span className="text-xs font-['Roboto_Regular'] text-white">
                                {beforeGraduation}%
                              </span>
                            </div>
                          )}

                          {/* Within First Year */}
                          {withinFirstYear > 0 && (
                            <div
                              className="bg-[#2CCAD3] flex items-center justify-center relative"
                              style={{
                                width: `calc(${withinFirstYear}% + 10px)`,
                                borderRadius:
                                  beforeGraduation === 0 && afterFirstYear === 0
                                    ? "9999px"
                                    : "0px",
                              }}
                            >
                              <span className="text-xs font-['Roboto_Regular'] text-white">
                                {withinFirstYear}%
                              </span>
                            </div>
                          )}

                          {/* After First Year */}
                          {afterFirstYear > 0 && (
                            <div
                              className="bg-[#377eab] flex items-center justify-center relative"
                              style={{
                                width: `calc(${afterFirstYear}% + 20px)`,
                                borderTopRightRadius: "9999px",
                                borderBottomRightRadius: "9999px",
                                borderTopLeftRadius:
                                  beforeGraduation === 0 &&
                                  withinFirstYear === 0
                                    ? "9999px"
                                    : "0px",
                                borderBottomLeftRadius:
                                  beforeGraduation === 0 &&
                                  withinFirstYear === 0
                                    ? "9999px"
                                    : "0px",
                              }}
                            >
                              <span className="text-xs font-['Roboto_Regular'] text-white">
                                {afterFirstYear}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
              {!majorData?.overall.topNarrowMajorsInsights?.length && (
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
