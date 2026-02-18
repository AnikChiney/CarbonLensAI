import { useTheme } from "@mui/material/styles";
import { ResponsiveLine } from "@nivo/line";

const OverviewChart = ({ isDashboard = false }) => {
  const theme = useTheme();

  const carbonData = [
    { x: "Mar", y: 210 },
    { x: "Apr", y: 180 },
    { x: "May", y: 240 },
    { x: "Jun", y: 200 },
    { x: "Jul", y: 265 },
    { x: "Aug", y: 230 },
    { x: "Sep", y: 190 },
    { x: "Oct", y: 220 },
    { x: "Nov", y: 170 },
    { x: "Dec", y: 205 },
    { x: "Jan", y: 195 },
    { x: "Feb", y: 215 },
  ];

  return (
    <ResponsiveLine
      data={[{ id: "carbonFootprint", data: carbonData }]}
      theme={{
        axis: {
          domain: { line: { stroke: theme.palette.secondary[200] } },
          legend: { text: { fill: theme.palette.secondary[200] } },
          ticks: {
            line: { stroke: theme.palette.secondary[200], strokeWidth: 1 },
            text: { fill: theme.palette.secondary[200] },
          },
        },
        tooltip: {
          container: { color: theme.palette.primary.main },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: "auto", max: "auto" }}
      curve="catmullRom"
      enableArea={isDashboard}
      areaOpacity={0.15}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        legend: "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        legend: "KGs CO₂ released",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      pointSize={6}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      useMesh={true}
      animate={true}
      motionConfig="gentle"
    />
  );
};

export default OverviewChart;
