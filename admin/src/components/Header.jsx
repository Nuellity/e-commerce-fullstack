import React from 'react'
import { Typography, useMediaQuery, useTheme } from "@mui/material"
import { tokens } from "../theme"

function Header({title, subTitle}) {
    const theme = useTheme()
    const colors =tokens( theme.palette.mode)
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className='mb-5'>
        <Typography variant={isMatch ? "h3" : "h2"} color={colors.grey[100]} fontWeight="bold" sx={{mb: "5px"}}>{title}</Typography>
        <Typography variant={isMatch ? "h6" : "h5"} color={colors.greenAccent[400]}>{subTitle}</Typography>
    </div>
  )
}

export default Header