import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface CandidateData {
  name: string;
  votes: number;
}

interface CategoryPieChartProps {
  category: string;
  data: CandidateData[];
  delay?: number;
}

const COLORS = [
  "hsl(43, 74%, 49%)",   // Gold
  "hsl(36, 90%, 55%)",   // Amber
  "hsl(43, 80%, 65%)",   // Light Gold
  "hsl(39, 50%, 70%)",   // Champagne
  "hsl(30, 40%, 50%)",   // Bronze
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-gold-light/30 rounded-lg p-2 sm:p-3 gold-shadow text-xs sm:text-sm">
        <p className="font-medium text-foreground">{payload[0].payload.name}</p>
        <p className="text-gold font-semibold">{payload[0].value} votes ({payload[0].payload.percentage}%)</p>
      </div>
    );
  }
  return null;
};

export const CategoryPieChart = ({ category, data, delay = 0 }: CategoryPieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.votes, 0);
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: ((item.votes / total) * 100).toFixed(1)
  }));

  return (
    <div 
      className="gradient-card rounded-xl sm:rounded-2xl p-3 sm:p-6 gold-shadow border border-gold-light/30 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="font-display text-sm sm:text-xl font-semibold text-center mb-2 sm:mb-4 text-foreground">
        {category}
      </h3>
      <div className="h-32 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithPercentage}
              cx="50%"
              cy="50%"
              innerRadius="35%"
              outerRadius="65%"
              paddingAngle={3}
              dataKey="votes"
            >
              {dataWithPercentage.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="hsl(43, 30%, 97%)"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend below chart for mobile */}
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-2 sm:mt-4">
        {dataWithPercentage.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <div 
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-[9px] sm:text-xs text-muted-foreground">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
