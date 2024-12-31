import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TopNarrowMajor {
  name: string;
  graduates?: number;
  percentageOfTotal?: number;
  employmentRate?: number;
  quickEmploymentRate?: number;
  averageSalary?: number;
  medianSalary?: number;
}

interface TopNarrowMajorsData {
  mostPopular: TopNarrowMajor[];
  mostEmployable: TopNarrowMajor[];
  highestPaying: TopNarrowMajor[];
}

interface Props {
  data: TopNarrowMajorsData;
}

export default function TopNarrowMajorsChart({ data }: Props) {
  return (
    <Tabs defaultValue="popular" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="popular">Most Popular</TabsTrigger>
        <TabsTrigger value="employable">Most Employable</TabsTrigger>
        <TabsTrigger value="salary">Highest Paying</TabsTrigger>
      </TabsList>

      <TabsContent value="popular" className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.mostPopular}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="graduates" name="Graduates" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>

      <TabsContent value="employable" className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.mostEmployable}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="employmentRate" name="Employment Rate (%)" fill="#82ca9d" />
            <Bar dataKey="quickEmploymentRate" name="Quick Employment Rate (%)" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>

      <TabsContent value="salary" className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.highestPaying}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="averageSalary" name="Average Salary ($)" fill="#8884d8" />
            <Bar dataKey="medianSalary" name="Median Salary ($)" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  );
} 