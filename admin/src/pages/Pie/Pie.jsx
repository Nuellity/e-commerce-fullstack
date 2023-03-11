import { Box } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'
import PieChart from '../../components/PieChart'

function Pie() {
  return (
    <div className='container'>
    <Header title="Pie Chart" subTitle="Basic Pie Chart"/>
   <Box height="75vh">
    <PieChart/>
   </Box>

    </div>
  )
}

export default Pie