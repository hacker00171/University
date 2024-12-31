import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EducationLevelMetrics {
  level: string;
  employmentRate: number;
  averageSalary: number;
  averageTimeToEmployment: number;
}

interface Props {
  metrics: EducationLevelMetrics;
}

export default function EducationLevelMetricsCard({ metrics }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{metrics.level}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Employment Rate</span>
            <span className="font-medium">{metrics.employmentRate}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Average Salary</span>
            <span className="font-medium">${metrics.averageSalary.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time to Employment</span>
            <span className="font-medium">{metrics.averageTimeToEmployment} days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 