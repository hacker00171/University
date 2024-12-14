'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles/StateView.module.css';
import { FaUniversity, FaUserGraduate, FaMoneyBillWave, FaClock, FaBriefcase } from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import regionData from '../data/regionData.json';

type LanguageKey = 'en' | 'ar';

export type RegionName = keyof typeof regionData.regions;

interface Position {
  x: number;
  y: number;
}

interface UniversityMarkerProps {
  name: string;
  position: Position | null;
  isActive: boolean;
  onClick: (name: string) => void;
}

interface GenderDistribution {
  males: number;
  females: number;
}

interface QualificationData {
  count: number;
  en: string;
  ar: string;
  [key: string]: string | number;
}

interface SpecializationData {
  count: number;
  en: string;
  ar: string;
  [key: string]: string | number;
}

interface EmploymentMetrics {
  employedBeforeGraduation: number;
  employedAfterGraduation: number;
  overallEmploymentRate: number;
  averageWaitingDays: number;
}

interface MetricsLabels {
  title: string;
  employedBeforeGraduation: string;
  employedAfterGraduation: string;
  employmentByGender: string;
  employmentRate: string;
}

interface UniversityLabels {
  graduates: string;
  days: string;
  waitingTime: string;
  forJob: string;
  riyal: string;
  averageSalary: string;
  forGraduates: string;
  males: string;
  females: string;
  genderDistribution: string;
  qualifications: string;
  specializations: string;
  graduate: string;
  employmentMetrics: MetricsLabels;
  salaryMetrics: {
    title: string;
  };
  specializationMetrics: {
    title: string;
  };
}

interface UniversityData {
  name: string;
  nameEn: string;
  position: Position;
  totalGraduates: number;
  employmentMetrics: EmploymentMetrics;
  averageSalary: number;
  genderDistribution: GenderDistribution;
  graduatesByQualification: {
    [key: string]: QualificationData;
  };
  graduatesBySpecialization: {
    [key: string]: SpecializationData;
  };
  labels: {
    [key in LanguageKey]: UniversityLabels;
  };
  specializationMetrics: {
    [key: string]: number;
  };
}

interface RegionData {
  arabicName: string;
  englishName: string;
  mapImage: string;
  universities: {
    [key: string]: UniversityData;
  }
}

interface StateViewProps {
  language?: LanguageKey;
  selectedState?: RegionName;
}

const UniversityMarker: React.FC<UniversityMarkerProps> = ({ name, position, isActive, onClick }) => {
  if (!position) return null;

  return (
    <div 
      className={`${styles.universityMarker} ${isActive ? styles.active : ''}`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      onClick={() => onClick(name)}
      title={name}
    >
      <FaUniversity />
    </div>
  );
};

const StateView: React.FC<StateViewProps> = ({ language = 'en', selectedState: initialState }) => {
  const [selectedState, setSelectedState] = useState<RegionName>(initialState || 'Riyadh');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [currentRegion, setCurrentRegion] = useState<RegionData | null>(null);
  const [currentUniData, setCurrentUniData] = useState<UniversityData | null>(null);

  useEffect(() => {
    if (initialState && initialState !== selectedState) {
      setSelectedState(initialState);
    }
  }, [initialState, selectedState]);

  useEffect(() => {
    const region = (regionData.regions[selectedState] as unknown) as RegionData;
    if (!region) return;
    
    setCurrentRegion(region);
    
    const universities = Object.keys(region.universities);
    if (!selectedUniversity || !universities.includes(selectedUniversity)) {
      setSelectedUniversity(universities[0]);
    }
  }, [selectedState, selectedUniversity]);

  useEffect(() => {
    if (currentRegion && selectedUniversity) {
      setCurrentUniData(currentRegion.universities[selectedUniversity]);
    }
  }, [currentRegion, selectedUniversity]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value as RegionName);
  };

  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUniversity(e.target.value);
  };

  const handleUniversityClick = (uniName: string) => {
    setSelectedUniversity(uniName);
  };

  const getMapFileName = (stateName: string) => {
    if (stateName === 'Eastern Province') return 'eastern';
    return stateName.toLowerCase().replace(' ', '-');
  };

  if (!currentRegion || !currentUniData) {
    return <div>Loading...</div>;
  }

  const isRTL = language === 'ar';

  const renderStateMap = () => {
    const mapPath = `/state-view/state_images/${getMapFileName(selectedState)}.png`;

    return (
      <div className={styles.mapContainer}>
        <Image
          src={mapPath}
          alt={`${selectedState} Map`}
          layout="fill"
          objectFit="contain"
          priority
        />
        {Object.entries(currentRegion.universities).map(([name, data]) => (
          <UniversityMarker
            key={name}
            name={name}
            position={data.position}
            isActive={name === selectedUniversity}
            onClick={handleUniversityClick}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`${styles.container} ${isRTL ? styles.rtl : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={styles.analytics}>
        <div className={styles.controls}>
          <select 
            value={selectedState}
            onChange={handleStateChange}
            className={styles.select}
          >
            {(Object.keys(regionData.regions) as RegionName[]).map((state) => (
              <option key={state} value={state}>
                {language === 'ar' ? regionData.regions[state].arabicName : state}
              </option>
            ))}
          </select>

          <select
            value={selectedUniversity}
            onChange={handleUniversityChange}
            className={styles.select}
          >
            {Object.keys(currentRegion.universities).map((uni) => (
              <option key={uni} value={uni}>
                {language === 'ar' 
                  ? currentRegion.universities[uni].name 
                  : currentRegion.universities[uni].nameEn}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.metricsContainer}>
          <div className={styles.section}>
            <div className={styles.topRow}>
              <div className={styles.metricBox}>
                <div className={styles.universityBox}>
                  <FaUniversity size={24} color="#4fc3f7" />
                  <div className={styles.uniName}>
                    <h1>{language === 'ar' ? currentUniData.name : currentUniData.nameEn}</h1>
                  </div>
                </div>
              </div>

              <div className={styles.metricBox}>
                <div className={styles.graduateCount}>
                  <div className={styles.gradIcon}>
                    <FaUserGraduate size={24} color="#4fc3f7" />
                  </div>
                  <div className={styles.gradNumber}>
                    {currentUniData.totalGraduates.toLocaleString()}
                  </div>
                  <div className={styles.gradLabel}>{currentUniData.labels[language].graduates}</div>
                </div>
              </div>

              <div className={styles.metricBox}>
                <div className={styles.waitingTime}>
                  <FaClock size={24} color="#4fc3f7" />
                  <div className={styles.timeValue}>
                    {currentUniData.employmentMetrics.averageWaitingDays}
                  </div>
                  <div className={styles.timeUnit}>{currentUniData.labels[language].days}</div>
                  <div className={styles.timeLabel}>{currentUniData.labels[language].waitingTime}</div>
                  <div className={styles.timeSubLabel}>{currentUniData.labels[language].forJob}</div>
                </div>
              </div>

              <div className={styles.metricBox}>
                <div className={styles.salaryMetric}>
                  <FaMoneyBillWave size={24} color="#4fc3f7" />
                  <div className={styles.salaryTop}>
                    <div className={styles.salaryValue}>
                      {currentUniData.averageSalary.toLocaleString()}
                    </div>
                    <div className={styles.salaryUnit}>{currentUniData.labels[language].riyal}</div>
                  </div>
                  <div className={styles.salaryLabel}>{currentUniData.labels[language].averageSalary}</div>
                  <div className={styles.salarySubLabel}>{currentUniData.labels[language].forGraduates}</div>
                </div>
              </div>
            </div>

            <div className={styles.bottomRow}>
              <div className={styles.genderBox}>
                <h3>{currentUniData?.labels[language].genderDistribution}</h3>
                <div className={styles.genderBars}>
                  <div className={styles.maleBar}>
                    <div className={styles.barValue}>
                      {currentUniData?.genderDistribution.males}%
                    </div>
                    <div>{currentUniData?.labels[language].males}</div>
                  </div>
                  <div className={styles.femaleBar}>
                    <div className={styles.barValue}>
                      {currentUniData?.genderDistribution.females}%
                    </div>
                    <div>{currentUniData?.labels[language].females}</div>
                  </div>
                </div>
              </div>

              <div className={styles.qualificationsBox}>
                <h3>{currentUniData?.labels[language].qualifications}</h3>
                <div className={styles.qualBars}>
                  {Object.entries(currentUniData?.graduatesByQualification || {}).map(([qual, data]) => {
                    const maxCount = Math.max(...Object.values(currentUniData?.graduatesByQualification || {}).map(q => q.count));
                    const width = `${(data.count / maxCount) * 100}%`;
                    
                    return (
                      <div key={qual} className={styles.qualBar}>
                        <span>{data[language]}</span>
                        <div 
                          className={styles.barFill} 
                          style={{ width }}
                        >
                          {data.count.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.specializationsBox}>
                <h3>{currentUniData?.labels[language]?.specializations}</h3>
                <div className={styles.specList}>
                  {Object.entries(currentUniData?.graduatesBySpecialization ?? {}).map(([spec, data]) => (
                    <div key={spec} className={styles.specItem}>
                      <span>{data[language]}</span>
                      <span className={styles.specCount}>
                        {data.count.toLocaleString()} {currentUniData?.labels[language]?.graduate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              {currentUniData?.labels[language]?.employmentMetrics?.title}
            </div>
            <div className={styles.employmentMetrics}>
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <FaBriefcase size={24} color="#4fc3f7" />
                  <div className={styles.metricValue}>
                    {Math.round(currentUniData?.totalGraduates * 0.3).toLocaleString()}
                  </div>
                  <div className={styles.metricLabel}>
                    {currentUniData?.labels[language].employmentMetrics.employedBeforeGraduation}
                  </div>
                </div>
                <div className={styles.metricCard}>
                  <FaBriefcase size={24} color="#4fc3f7" />
                  <div className={styles.metricValue}>
                    {Math.round(currentUniData?.totalGraduates * 0.7).toLocaleString()}
                  </div>
                  <div className={styles.metricLabel}>
                    {currentUniData?.labels[language].employmentMetrics.employedAfterGraduation}
                  </div>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <Bar
                  data={{
                    labels: [
                      currentUniData?.labels[language].males,
                      currentUniData?.labels[language].females
                    ],
                    datasets: [{
                      label: currentUniData?.labels[language]?.employmentMetrics?.employmentByGender,
                      data: [
                        (currentUniData?.genderDistribution.males / currentUniData?.totalGraduates) * 100,
                        (currentUniData?.genderDistribution.females / currentUniData?.totalGraduates) * 100
                      ],
                      backgroundColor: ['#42a5f5', '#ec407a']
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: { color: '#fff' }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { 
                          color: '#fff',
                          callback: value => `${value}%`
                        }
                      },
                      x: {
                        ticks: { color: '#fff' }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              {currentUniData?.labels[language]?.salaryMetrics?.title}
            </div>
            <div className={styles.salaryMetrics}>
              <div className={styles.chartContainer}>
                <Bar
                  data={{
                    labels: Object.entries(currentUniData?.graduatesByQualification || {}).map(
                      ([, data]) => data[language]
                    ),
                    datasets: [{
                      label: currentUniData?.labels[language].averageSalary,
                      data: [
                        currentUniData?.averageSalary * 1.8,  // doctorate
                        currentUniData?.averageSalary * 1.4,  // masters
                        currentUniData?.averageSalary,        // bachelor
                        currentUniData?.averageSalary * 0.8,  // associate
                        currentUniData?.averageSalary * 0.7   // diploma
                      ],
                      backgroundColor: '#4fc3f7'
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: { color: '#fff' }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: { 
                          color: '#fff',
                          callback: value => `${value.toLocaleString()} ${currentUniData?.labels[language].riyal}`
                        }
                      },
                      x: {
                        ticks: { color: '#fff' }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              {currentUniData?.labels[language]?.specializationMetrics?.title}
            </div>
            <div className={styles.specializationMetrics}>
              <div className={styles.chartContainer}>
                <Line
                  data={{
                    labels: Object.entries(currentUniData?.graduatesBySpecialization ?? {}).map(
                      ([, data]) => data[language]
                    ),
                    datasets: [{
                      label: currentUniData?.labels[language]?.employmentMetrics?.employmentRate,
                      data: Object.entries(currentUniData?.graduatesBySpecialization ?? {}).map(() => 
                        Math.floor(80 + Math.random() * 15)  // Random employment rate between 80-95%
                      ),
                      borderColor: '#4fc3f7',
                      tension: 0.4
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: { color: '#fff' }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { 
                          color: '#fff',
                          callback: value => `${value}%`
                        }
                      },
                      x: {
                        ticks: { color: '#fff' }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mapSection}>
        {renderStateMap()}
      </div>
    </div>
  );
};

export default StateView;
