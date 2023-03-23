import React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useMediaQuery } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Chart({ data, dataKey }) {
  const isSmallerScreen = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );
  const aspectRatio = isSmallerScreen ? 4 / 2 : 4 / 1;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveContainer width="100%" aspect={aspectRatio}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke={colors.redAccent[200]} />
        <YAxis stroke={colors.blueAccent[200]} />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={colors.blueAccent[700]}
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
