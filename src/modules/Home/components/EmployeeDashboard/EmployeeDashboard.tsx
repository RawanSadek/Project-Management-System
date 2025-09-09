import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { TasksCount } from "../../../../types/types";

interface EmployeeDashboardProps {
  tasks: TasksCount | null;
}

export default function EmployeeDashboard({ tasks }: EmployeeDashboardProps) {
  const data = [
    { name: "To Do", value: tasks?.toDo },
    { name: "In Progress", value: tasks?.inProgress },
    { name: "Done", value: tasks?.done },
  ];

  const RADIAN = Math.PI / 180;
  const COLORS = ["#ffd966", "#80caff", "#85e0a3"];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }: {
    cx?: number | string;
    cy?: number | string;
    midAngle?: number;
    innerRadius?: number | string;
    outerRadius?: number | string;
    percent?: number;
  }) => {
    if (!percent || percent <= 0) return null;

    const cxNum = Number(cx ?? 0);
    const cyNum = Number(cy ?? 0);
    const innerNum = Number(innerRadius ?? 0);
    const outerNum = Number(outerRadius ?? 0);


    const radius =
      Number(innerNum ?? 0) +
      (Number(outerNum ?? 0) - Number(innerNum ?? 0)) * 0.5;

    const x = Number(cxNum ?? 0) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = Number(cyNum ?? 0) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cxNum ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-[100%] h-100">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={70}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          {/* Legend */}
        <Legend
          verticalAlign="bottom"
          align="center"         
          iconType="square"       // 'circle', 'square', 'line', etc.
          formatter={(value) => (
            <span style={{ color: "black", fontWeight: 500, marginRight: '25px' }}>
              {value}
            </span>
          )}
        />
        </PieChart>
      </ResponsiveContainer>

      
    </div>
  );
}
