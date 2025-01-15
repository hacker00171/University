"use client";

import Image from "next/image";
import nloSymbol from "../../../public/logo/nlo_logo_symbol.png";
import mockData from "./final_data_version4.json";
import { useEffect, useState } from "react";
import SmallCircles from "@/app/overview/component/Small";
import { PiMoneyFill } from "react-icons/pi";
import { PiStudentFill } from "react-icons/pi";
import { PiGraduationCapFill } from "react-icons/pi";
import { FaUniversity } from "react-icons/fa";
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
    <div className="flex-1 p-6 bg-transparent backdrop-blur-sm flex items-center justify-center sm:flex-col">
      {/* Add a blur overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#24285E]/80 to-transparent backdrop-blur-sm"></div>
      {/* Left Side Education Stats */}
      <div className="absolute left-20 top-1/2 -translate-y-1/2 w-[270px] flex flex-col gap-4 p-0 2xl:w-3/12 3xl:w-3/12">
        <p className="text-white/70 text-center mb-2">
          A statistical study of university and institute graduates in one year
        </p>
        {/* Education Title */}
        <div className="flex flex-col items-center gap-2 w-[300px] h-[48px] justify-center">
          <div className="flex items-center gap-2">
            <currentData.icon className="h-8 w-8 text-[#2cd7c4] flex-shrink-0 transform transition-transform duration-300 hover:scale-110" />
            <span className="text-white text-xl font-['Neo_Sans_Bold'] leading-tight tracking-wide text-center flex-1">
              {currentData.title}
            </span>
          </div>
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
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Total Graduates
                </span>
                <div className="text-white text-4xl font-['Neo_Sans_Bold'] font-bold">
                  {currentData.graduates.totalGraduates.toLocaleString()}
                </div>

                <div className="flex gap-4 mt-2">
                  <div className="bg-[#1d3862]/80 rounded-[7px] flex items-center gap-0 px-1 py-0.5">
                    <span className="flex items-center gap-0 text-[#ffff] text-sm font-['Roboto_regular']">
                      <BiMale style={{ color: "#2CCAD3" }} size={18} />
                      {/* <span className="text-[#ffff] flex items-center gap-1 text-lg">
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
                    </svg> */}
                      <span>{currentData.graduates.male.percentage}%</span>
                    </span>
                  </div>
                  <div className="bg-[#1d3862]/90 rounded-[7px] flex items-center gap-0 px-1 py-0.5">
                    <span className="flex items-center gap-0 text-[#ffff] text-sm font-['Roboto_regular']">
                      <BiFemale style={{ color: "#fe1684 " }} size={18} />
                      {/* <span className="text-[#ffff] flex items-center gap-1 text-lg">
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
                    </svg> */}
                      <span>{currentData.graduates.female.percentage}%</span>
                    </span>
                  </div>
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
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Employment Rate
                </span>
                <div className="text-white text-4xl font-['Neo_Sans_Bold'] font-bold">
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
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Average Salary
                </span>
                <div className="text-white text-4xl font-['Neo_Sans_Bold'] font-bold">
                  {currentData.averageSalary.toLocaleString()}{" "}
                  <span
                    style={{
                      fontFamily: "Roboto regular",
                      fontSize: "1.4rem",
                      fontWeight: 300,
                    }}
                  >
                    SAR
                  </span>
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
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Time to Employment
                </span>
                <div className="text-white text-4xl font-['Neo_Sans_Bold'] font-bold">
                  {currentData.timeToEmployment.overall.days}{" "}
                  <span
                    style={{
                      fontFamily: "Roboto regular",
                      fontSize: "1.5rem",
                      fontWeight: 400,
                    }}
                  >
                    days
                  </span>
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
            style={{ marginTop: "70px" }}
          >
            <Image
              src={nloSymbol}
              alt="NLO Logo"
              fill
              className="object-contain brightness-0 invert logo-glow"
              priority
            />
            {/* <p
              className="text-white text-center text-xs mt-[180px] max-w-[120px] leading-tight" */}
            {/* // style={{ marginTop: "150px" }} */}
            {/* >
              A statistical study of university and institute graduates in one
              year
            </p> */}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="absolute right-32 top-1/2 -translate-y-1/2 w-[500px] flex flex-col gap-3 translate-x-[80px]">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-[20px] shadow-lg border border-[#ffff] bg-gradient-to-r from-[#24285E]/20 via-[#24285E]/10 to-[#244975]/90 w-[245px]">
            <div className="flex items-start gap-8">
              <div className="mt-7">
                <PiGraduationCapFill
                  style={{ color: "#2CCAD3", width: 38, height: 38 }}
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Total Student Enrollment
                </span>
                <div className="text-white text-4xl font-['Neo_Sans_Bold'] mt-1 font-bold">
                  {totalMetrics.totalStudentsEnrolled.toLocaleString()}{" "}
                  <span
                    style={{
                      fontFamily: "Roboto regular",
                      fontSize: "1.2rem",
                      fontWeight: 200,
                    }}
                  ></span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-[20px] shadow-lg border border-[#ffff] bg-gradient-to-r from-[#24285E]/20 via-[#24285E]/10 to-[#244975]/90 w-[245px]">
            <div className="grid grid-cols-[auto_1fr] gap-4">
              <div className="mt-7">
                <FaUniversity
                  style={{ color: "#2CCAD3", width: 38, height: 38 }}
                />
              </div>
              <div className="flex flex-col gap-0">
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Number of Universities and Educational Institutions
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex h-7 items-center bg-[#1a1f4d]/100 rounded-sm">
                    <span className="text-white text-sm pl-1 font-['Neo_Sans_Medium'] font-bold">
                      Public Universities
                    </span>
                    <span className="text-white text-3xl font-['Neo_Sans_Bold'] ml-auto pr-3 font-bold">
                      27
                    </span>
                  </div>
                  <div className="flex h-7 items-center bg-[#1a1f4d]/100 rounded-sm">
                    <span className="text-white text-sm pl-1 font-['Neo_Sans_Medium'] font-bold">
                      Private Universities
                    </span>
                    <span className="text-white text-3xl font-['Neo_Sans_Bold'] ml-auto pr-3 font-bold">
                      24
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-[20px] shadow-lg border border-[#ffff] bg-gradient-to-r from-[#24285E]/20 via-[#24285E]/10 to-[#244975]/90 w-[245px]">
            <div className="flex items-start gap-8">
              <div className="mt-7">
                <Image
                  src="/icons/employmentrateicon.svg"
                  alt="Employment"
                  width={38}
                  height={38}
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Employment Rate
                </span>
                <div className="text-white text-4xl font-['Neo_Sans_Bold'] mt-1 font-bold">
                  {totalMetrics.employmentRate}%
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-[20px] shadow-lg border border-[#ffff] bg-gradient-to-r from-[#24285E]/20 via-[#24285E]/10 to-[#244975]/90 w-[245px]">
            <div className="flex items-start gap-8">
              <div className="mt-7">
                <Image
                  src="/icons/graduateicon.svg"
                  alt="Employment"
                  width={38}
                  height={38}
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Total Graduates
                </span>
                <div className="text-white text-4xl font-['Neo_Sans_Bold'] font-bold mt-1">
                  {totalMetrics.graduates.totalGraduates.toLocaleString()}
                  <div className="flex gap-2 mt-1 text-sm font-['Roboto_Regular']">
                    <div className="bg-[#1a1f4d]/90 rounded-[7px] flex items-center gap-0 px-1 py-0.5">
                      <span className="flex items-center gap-1">
                        <BiMale style={{ color: "#2CCAD3" }} size={20} />
                        {totalMetrics.graduates.male.percentage}%
                      </span>
                    </div>
                    <div className="bg-[#1a1f4d]/90 rounded-[7px] flex items-center gap-0 px-1 py-0.5">
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
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-[20px] shadow-lg border border-[#ffff] bg-gradient-to-r from-[#24285E]/20 via-[#24285E]/10 to-[#244975]/90 w-[245px]">
            <div className="flex items-start gap-8">
              <div className="mt-6">
                <PiMoneyFill
                  style={{ color: "#2CCAD3", width: 38, height: 38 }}
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Average Salary
                </span>
                <div className="text-white text-4xl font-['Neo_Sans_Bold'] mt-1 font-bold">
                  {totalMetrics.averageSalary.toLocaleString()}{" "}
                  <span
                    style={{
                      fontFamily: "Roboto regular",
                      fontSize: "1.2rem",
                      fontWeight: 200,
                    }}
                  >
                    SAR
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-[20px] shadow-lg border border-[#ffff] bg-gradient-to-r from-[#24285E]/20 via-[#24285E]/10 to-[#244975]/90 w-[245px]">
            <div className="flex items-start gap-8">
              <div className="mt-6">
                <FaBusinessTime
                  style={{ color: "#2CCAD3", width: 38, height: 38 }}
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Time to Employment
                </span>
                <div className="text-white text-4xl font-['Neo_Sans_Bold'] mt-1 font-bold">
                  {totalMetrics.timeToEmployment.overall.days}{" "}
                  <span
                    style={{
                      fontFamily: "Roboto regular",
                      fontSize: "1.2rem",
                      fontWeight: 200,
                    }}
                  >
                    days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Degree Overview Card */}
        <div className="p-4 rounded-[20px] shadow-lg border border-[#ffff] bg-gradient-to-r from-[#24285E]/20 via-[#24285E]/10 to-[#244975]/90 w-[500px]">
          <div className="grid grid-cols-[120px_1fr]">
            <div className="flex items-center gap-0">
              <div className="certificate-icon"></div>
              <div className="flex flex-col gap-0">
                <p className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Education
                </p>
                <p className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Degree
                </p>
                <p className="text-sm font-['Neo_Sans_Medium'] text-[#ffff]/70">
                  Overview
                </p>
              </div>
            </div>
            <div className="flex flex-col p-1 bg-[#1d2655] rounded-[15px]">
              <div className="flex items-end justify-between px-5 gap-0">
                <div className="flex flex-col items-center">
                  <div className="h-24 w-5 bg-gradient-to-b from-[#1a1f4d]/90 to-[#1a1f4d]/40 rounded-t-xl flex items-end overflow-hidden relative">
                    <div
                      className="w-full bg-gradient-to-t from-[#2cd7c4] via-[#2cd7c4]/80 to-[#2cd7c4]/40 rounded-t-lg shadow-[0_0_10px_rgba(44,215,196,0.5)]"
                      style={{ height: "72%" }}
                    ></div>
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-[11px] font-bold">
                      378
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-24 w-5 bg-gradient-to-b from-[#1a1f4d]/90 to-[#1a1f4d]/40 rounded-t-xl flex items-end overflow-hidden relative">
                    <div
                      className="w-full bg-gradient-to-t from-[#2cd7c4] via-[#2cd7c4]/80 to-[#2cd7c4]/40 rounded-t-lg shadow-[0_0_10px_rgba(44,215,196,0.5)]"
                      style={{ height: "62%" }}
                    ></div>
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-[11px]  font-bold">
                      295
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-24 w-5 bg-gradient-to-b from-[#1a1f4d]/90 to-[#1a1f4d]/40 rounded-t-xl flex items-end overflow-hidden relative">
                    <div
                      className="w-full bg-gradient-to-t from-[#2cd7c4] via-[#2cd7c4]/80 to-[#2cd7c4]/40 rounded-t-lg shadow-[0_0_10px_rgba(44,215,196,0.5)]"
                      style={{ height: "75%" }}
                    ></div>
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-[11px]  font-bold">
                      358
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-24 w-5 bg-gradient-to-b from-[#1a1f4d]/90 to-[#1a1f4d]/40 rounded-t-xl flex items-end overflow-hidden relative">
                    <div
                      className="w-full bg-gradient-to-t from-[#2cd7c4] via-[#2cd7c4]/80 to-[#2cd7c4]/40 rounded-t-lg shadow-[0_0_10px_rgba(44,215,196,0.5)]"
                      style={{ height: "75%" }}
                    ></div>
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-[11px]  font-bold">
                      358
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-24 w-5 bg-gradient-to-b from-[#1a1f4d]/90 to-[#1a1f4d]/40 rounded-t-xl flex items-end overflow-hidden relative">
                    <div
                      className="w-full bg-gradient-to-t from-[#2cd7c4] via-[#2cd7c4]/80 to-[#2cd7c4]/40 rounded-t-lg shadow-[0_0_10px_rgba(44,215,196,0.5)]"
                      style={{ height: "66%" }}
                    ></div>
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-[11px] font-bold">
                      314
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-24 w-5 bg-gradient-to-b from-[#1a1f4d]/90 to-[#1a1f4d]/40 rounded-t-xl flex items-end overflow-hidden relative">
                    <div
                      className="w-full bg-gradient-to-t from-[#2cd7c4] via-[#2cd7c4]/80 to-[#2cd7c4]/40 rounded-t-lg shadow-[0_0_10px_rgba(44,215,196,0.5)]"
                      style={{ height: "18%" }}
                    ></div>
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-[11px] font-bold">
                      88
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-24 w-5 bg-gradient-to-b from-[#1a1f4d]/90 to-[#1a1f4d]/40 rounded-t-xl flex items-end overflow-hidden relative">
                    <div
                      className="w-full bg-gradient-to-t from-[#2cd7c4] via-[#2cd7c4]/80 to-[#2cd7c4]/40 rounded-t-lg shadow-[0_0_10px_rgba(44,215,196,0.5)]"
                      style={{ height: "100%" }}
                    ></div>
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-[11px] font-bold">
                      478
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between px-0 mt-2 text-[10px]">
                <div className="text-white/60 text-center w-5">Bachelor's</div>
                <div className="text-white/60 text-center w-5">Master's</div>
                <div className="text-white/60 text-center w-5 -translate-x-2">
                  Associate Diploma
                </div>
                <div className="text-white/60 text-center w-5 -translate-x-2">
                  Intermediate Diploma
                </div>
                <div className="text-white/60 text-center w-5">
                  Higher Diploma
                </div>
                <div className="text-white/60 text-center w-5 -translate-x-3">
                  PhD (Doctoral)
                </div>
                <div className="text-white/60 text-center w-5 -translate-x-7">
                  Fellowship
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
