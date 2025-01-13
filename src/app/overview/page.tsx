"use client";

import Image from "next/image";
import nloSymbol from "../../../public/logo/nlo_logo_symbol.png";
import mockData from "./overview_insights 3 (1).json";
import { useEffect, useState } from "react";
import SmallCircles from "@/app/overview/component/Small";
import { PiMoneyFill } from "react-icons/pi";
import { FaBusinessTime } from "react-icons/fa6";
import { BiFemale } from "react-icons/bi";
import { BiMale } from "react-icons/bi";

import {
  FaGraduationCap,
  FaLaptopCode,
  FaBalanceScale,
  FaPaintBrush,
  FaHeartbeat,
  FaFlask,
  FaCogs,
  FaSeedling,
  FaBook,
  FaUserGraduate,
  FaCog,
} from "react-icons/fa";

const CircularText = ({
  text,
  angle,
  radius,
  startAngle = 0,
  fontSize = "17px",
  letterSpacing = "normal",
  flip = false,
}) => {
  const characters = text.split("");
  const deltaAngle = angle / (characters.length - 1);

  return (
    <>
      {characters.map((char, i) => {
        const charAngle = (startAngle + i * deltaAngle) * (Math.PI / 180);
        const x = radius * Math.cos(charAngle);
        const y = radius * Math.sin(charAngle);
        const rotation = flip
          ? startAngle + i * deltaAngle - 90
          : startAngle + i * deltaAngle + 90;

        return (
          <div
            key={i}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-[#21265E] font-bold"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              fontSize,
              letterSpacing,
            }}
          >
            {char}
          </div>
        );
      })}
    </>
  );
};

export default function HomePage() {
  const { totalMetrics, overall } = mockData.majorsInsights;
  const [animate, setAnimate] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const getSelectedMajorData = () => {
    if (!selectedMajor) {
      return {
        title: "Education",
        icon: FaGraduationCap,
        graduates: totalMetrics.graduates,
        employmentRate: totalMetrics.employmentRate,
        averageSalary: totalMetrics.averageSalary,
        timeToEmployment: totalMetrics.timeToEmployment,
      };
    }

    const majorData = overall.basicMetrics.find(
      (major) =>
        major.generalMajor.toLowerCase() === selectedMajor.toLowerCase()
    );

    const majorIcons = {
      education: FaGraduationCap,
      "communications and information technology": FaLaptopCode,
      "business, administration and law": FaBalanceScale,
      "arts and humanities": FaPaintBrush,
      "health and welfare": FaHeartbeat,
      "natural sciences, mathematics and statistics": FaFlask,
      "engineering, manufacturing and construction": FaCogs,
      "agriculture, forestry, fisheries and veterinary": FaSeedling,
      "social sciences, journalism, information and media": FaBook,
      "generic programs and qualifications": FaUserGraduate,
      services: FaCog,
    };

    const selectedIcon =
      majorIcons[selectedMajor.toLowerCase()] || FaGraduationCap;

    return majorData
      ? {
          title: selectedMajor,
          icon: selectedIcon,
          graduates: majorData.graduates,
          employmentRate: majorData.employmentRate,
          averageSalary: majorData.averageSalary,
          timeToEmployment: majorData.timeToEmployment,
        }
      : {
          title: "Education",
          icon: FaGraduationCap,
          graduates: totalMetrics.graduates,
          employmentRate: totalMetrics.employmentRate,
          averageSalary: totalMetrics.averageSalary,
          timeToEmployment: totalMetrics.timeToEmployment,
        };
  };

  const currentData = getSelectedMajorData();

  return (
    <div className="flex-1 p-6 bg-transparent backdrop-blur-sm flex items-center justify-center sm:flex-col relative min-h-screen">
      {/* Add a blur overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#24285E]/80 to-transparent backdrop-blur-sm"></div>
      {/* Left Side Education Stats */}
      <div className="absolute left-20 top-1/2 -translate-y-1/2 w-[300px] flex flex-col gap-4 p-0 2xl:w-3/12 3xl:w-3/12 ">
        {/* Education Title */}
        <div className="flex items-center justify-center gap-2 mb-0">
          <currentData.icon className="h-8 w-8 text-[#2cd7c4]" />
          <span className="text-white text-xl font-['Neo_Sans_Bold']">
            {currentData.title}
          </span>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-col gap-2 p-4 bg-[#1d3862] rounded-[15px]">
          {/* Total Graduates Card */}
          <div className="bg-[#1a1f4d] p-3 rounded-[15px] shadow-lg">
            <div className="flex items-center gap-4 mb-1">
              <div className="w-12">
                <Image
                  src="/icons/graduateicon.svg"
                  alt="Employment"
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]">
                  Total Graduates
                </span>
                <div className="text-white text-3xl font-['Neo_Sans_Bold']">
                  {currentData.graduates.totalGraduates.toLocaleString()}
                </div>
                <div className="flex gap-4 mt-2">
                  <span className="text-[#2cd7c4] flex items-center gap-1 text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-[#2a6dee]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="7" r="4" strokeWidth="2" />
                      <path strokeWidth="2" d="M15 14h-6l-2 8h10z" />
                      <line x1="12" y1="14" x2="12" y2="22" strokeWidth="2" />
                    </svg>
                    <span>{currentData.graduates.male.percentage}%</span>
                  </span>
                  <span className="text-[#2cd7c4] flex items-center gap-1 text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-[#ff69b4]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="7" r="4" strokeWidth="2" />
                      <path strokeWidth="2" d="M8 14h8l2 4h-12z" />
                      <path strokeWidth="2" d="M15 18l-3 4l-3-4" />
                    </svg>
                    <span>{currentData.graduates.female.percentage}%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Rate Card */}
          <div className="bg-[#1a1f4d] p-3 rounded-[15px] shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12">
                <Image
                  src="/icons/employmentrateicon.svg"
                  alt="Employment"
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]">
                  Employment Rate
                </span>
                <div className="text-white text-3xl font-['Neo_Sans_Bold']">
                  {currentData.employmentRate}%
                </div>
              </div>
            </div>
          </div>

          {/* Average Salary Card */}
          <div className="bg-[#1a1f4d] p-3 rounded-[15px] shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12">
                <PiMoneyFill
                  style={{ color: "#2CCAD3", width: 32, height: 32 }}
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]">Average Salary</span>
                <div className="text-white text-3xl font-['Neo_Sans_Bold']">
                  {currentData.averageSalary.toLocaleString()} SAR
                </div>
              </div>
            </div>
          </div>

          {/* Time to Employment Card */}
          <div className="bg-[#1a1f4d] p-3 rounded-[15px] shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12">
                <FaBusinessTime
                  style={{ color: "#2CCAD3", width: 32, height: 32 }}
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]">Time to Employment</span>
                <div className="text-white text-3xl font-['Neo_Sans_Bold']">
                  {currentData.timeToEmployment.overall} days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main container with transition */}
      <div className=" w-[400px] h-[400px] flex items-center mt-[150px] ">
        {/* Main circle container */}
        <div className=" left-10 top-1/2 -translate-y-1/2 mt-8 w-[230px] h-[230px] rounded-full shadow-2xl shadow-[#2e6bb2]/500 bg-gradient-to-br from-[#24285E] from-20% via-[#24285E] via-20% to-[#244975]">
          {/* Outer glowing border */}
          <div className="absolute -inset-1 rounded-full border-[3px] border-[#ffff] outer-circle-glow"></div>

          {/* Small Circles */}
          <SmallCircles animate={animate} onSelect={setSelectedMajor} />

          {/* Centered Logo */}
          <div
            className="absolute inset-0 m-auto w-[100px] h-[100px] rounded-full flex flex-col items-center justify-center z-20 logo-container"
            style={{ marginTop: "30px" }}
          >
            <Image
              src={nloSymbol}
              alt="NLO Logo"
              fill
              className="object-contain brightness-0 invert logo-glow"
              priority
            />
            <p
              className="text-white text-center text-xs mt-[180px] max-w-[120px] leading-tight"
              // style={{ marginTop: "150px" }}
            >
              A statistical study of university and institute graduates in one
              year
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[450px] flex flex-col gap-2 2xl:w-4/12">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-[12px] shadow-lg border border-[#ffff] bg-gradient-to-r from-[#24285E]/20 via-[#24285E]/10 to-[#244975]/90">
            <div className="flex items-start gap-8">
              <div className="mt-5">
                <Image
                  src="/icons/employmentrateicon.svg"
                  alt="Employment"
                  width={38}
                  height={38}
                />
              </div>
              <div className="flex-1">
                <span className="text-white text-sm font-['Neo_Sans_Medium']">Employment Rate</span>
                <div className="text-white text-3xl font-['Neo_Sans_Bold'] mt-1">
                  {totalMetrics.employmentRate}%
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-[12px] shadow-lg border border-[#ffff] bg-gradient-to-r from-[#24285E]/20 via-[#24285E]/10 to-[#244975]/90">
            <div className="flex items-start gap-8">
              <div className="mt-5">
                <Image
                  src="/icons/graduateicon.svg"
                  alt="Employment"
                  width={38}
                  height={38}
                />
              </div>
              <div className="flex-1">
                <span className="text-white text-sm font-['Neo_Sans_Medium']">Total Graduates</span>
                <div className="text-white text-3xl font-['Neo_Sans_Bold'] mt-1">
                  {totalMetrics.graduates.totalGraduates.toLocaleString()}
                  <div className="flex gap-2 mt-1 text-sm font-['Roboto_Regular']">
                    <span className="flex items-center gap-1">
                      <BiMale style={{ color: "#2CCAD3" }} size={20} />
                      {totalMetrics.graduates.male.percentage}%
                    </span>
                    <span className="flex items-center gap-1">
                      <BiFemale style={{ color: "#fe1684 " }} size={20} />
                      {totalMetrics.graduates.female.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-4 rounded-[12px] shadow-lg border border-[#ffff] bg-gradient-to-r from-[#24285E]/20 via-[#24285E]/10 to-[#244975]/90">
            <div className="flex items-start gap-6">
              <div className="mt-5">
                <PiMoneyFill
                  style={{ color: "#2CCAD3", width: 32, height: 32 }}
                />
              </div>
              <div className="flex-1">
                <span className="text-white text-sm font-['Neo_Sans_Medium']">Average Salary</span>
                <div className="text-white text-2xl font-['Neo_Sans_Bold'] mt-1">
                  {totalMetrics.averageSalary.toLocaleString()} SAR
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-[12px] shadow-lg border border-[#ffff] bg-gradient-to-r from-[#24285E]/20 via-[#24285E]/10 to-[#244975]/90">
            <div className="flex items-start gap-6">
              <div className="mt-5">
                <FaBusinessTime
                  style={{ color: "#2CCAD3", width: 32, height: 32 }}
                />
              </div>
              <div className="flex-1">
                <span className="text-white text-sm font-['Neo_Sans_Medium']">Time to Employment</span>
                <div className="text-white text-2xl font-['Neo_Sans_Bold'] mt-1">
                  {totalMetrics.timeToEmployment.overall} days
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Degree Overview Card */}
        <div className="p-4 rounded-[12px] shadow-lg border border-[#ffff] bg-gradient-to-r from-[#24285E]/20 via-[#24285E]/10 to-[#244975]/90">
          <div className="grid grid-cols-[80px_1fr] gap-10">
            {/* <div className="flex flex-col gap-1 justify-center h-full">
              <div className="flex flex-col items-start gap-1"> */}
            <div className="flex items-center h-full">
              {/* Icon Column */}
              <div className="flex items-center gap-1">
                <div className="certificate-icon"></div>

                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#2cd7c4]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg> */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-white text-sm font-['Neo_Sans_Medium']">
                    Education
                  </h3>
                  <p className="text-white/80 text-[11px] font-['Roboto_Regular']">Degree Overview</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
              {/* <div className="grid grid-cols-2 gap-3"> */}
              <div className="flex items-center gap-1.5">
                {/* <div className="text-[#2cd7c4] text-base font-bold">378</div> */}
                <div className="text-white text-[12px] bg-[#1a1f4d]/90 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  <span className="text-[#2cd7c4] text-[20px] text-base font-['Neo_Sans_Bold']">
                    378
                  </span>
                  &nbsp; Bachelor's
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* <div className="text-[#2cd7c4] text-base font-bold">314</div> */}
                <div className="text-white text-[12px] bg-[#1a1f4d]/90 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  <span className="text-[#2cd7c4] text-[20px] text-base font-['Neo_Sans_Bold']">
                    314
                  </span>
                  &nbsp; Higher Diploma
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* <div className="text-[#2cd7c4] text-base font-bold">358</div> */}
                <div className="text-white text-[12px] bg-[#1a1f4d]/90 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  <span className="text-[#2cd7c4] text-[20px] text-base font-['Neo_Sans_Bold']">
                    358
                  </span>
                  &nbsp; Associate Diploma
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* <div className="text-[#2cd7c4] text-base font-bold">88</div> */}
                <div className="text-white text-[12px] bg-[#1a1f4d]/90 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  <span className="text-[#2cd7c4] text-[20px] text-base font-['Neo_Sans_Bold']">
                    88
                  </span>
                  &nbsp;PhD (Doctoral)
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* <div className="text-[#2cd7c4] text-base font-bold">295</div> */}
                <div className="text-white text-[12px] bg-[#1a1f4d]/90 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  <span className="text-[#2cd7c4] text-[20px] text-base font-['Neo_Sans_Bold']">
                    295
                  </span>
                  &nbsp; Master's
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* <div className="text-[#2cd7c4] text-base font-bold">478</div> */}
                <div className="text-white text-[12px] bg-[#1a1f4d]/90 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  <span className="text-[#2cd7c4] text-[20px] text-base font-['Neo_Sans_Bold']">
                    478
                  </span>
                  &nbsp; Fellowship
                </div>
              </div>

              <div className="flex items-center gap-1.5 col-span-2">
                {/*  <div className="text-[#2cd7c4] text-base font-bold">358</div> */}
                <div className="text-white text-[12px] bg-[#1a1f4d]/90 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  <span className="text-[#2cd7c4] text-[20px] text-base font-['Neo_Sans_Bold']">
                    358
                  </span>
                  &nbsp; Intermediate Diploma
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
