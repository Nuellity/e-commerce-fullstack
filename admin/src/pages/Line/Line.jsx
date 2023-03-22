import { Box } from '@mui/material'
import React from 'react'

import Header from '../../components/Header'
import Chart from '../../components/Chart'

function Line() {
  return (
    <div className='container'>
    <Header title="Line Chart" subTitle="Basic Line Chart"/>
    <Box height="75vh">
    <Chart/>
    </Box>
</div>
  )
}

export default Line