import { Box } from '@mui/material'
import React from 'react'
import BarChart from '../../components/BarChart'
import Header from '../../components/Header'

function Bar() {
  return (
    <div className='container'>
        <Header title="Bar Chart" subTitle="Basic Bar Chart"/>
        <Box height="75vh">
        <BarChart/>
        </Box>
    </div>
  )
}

export default Bar