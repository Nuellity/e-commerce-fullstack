import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

function StatBox({
  title,
  subTitle,
  icon,
  progress,
  increase,
  isProgress,
  isIncrease,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      component="div"
      sx={{ padding: "5px", width: "100%", margin: "15px 20px" }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100], margin: "5px" }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: isProgress && "none" }}>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subTitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600], display: isIncrease && "none" }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
}

export default StatBox;
