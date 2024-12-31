import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  value: string | number;
  description?: string;
}

export default function SummaryCard({ title, value, description }: Props) {
  return (
    <Card className="bg-black/40 backdrop-blur-sm border-white/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {description && (
          <p className="text-xs text-white/70">{description}</p>
        )}
      </CardContent>
    </Card>
  );
} 