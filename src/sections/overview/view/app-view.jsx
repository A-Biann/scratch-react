// import { faker } from '@faker-js/faker';
import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { account } from 'src/_mock/account';

import AppTasks from '../app-tasks';
import AppWidgetSummary from '../app-widget-summary';
import AppScratchStatus from '../app-scratch-status';
import AppScratchPercentage from '../app-scratch-percentage';

// ----------------------------------------------------------------------

export default function AppView() {

  const data = [
    { date: '01/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '02/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '03/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '04/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '05/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '06/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '07/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '08/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '09/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '10/01/2003', hand: 23, body: 24, lower: 25 },
    { date: '11/01/2003', hand: 23, body: 24, lower: 25 },
  ];

  const data1 = [
    { date: '01/01/2003', hand: 20, body: 24, lower: 25 },
    { date: '02/01/2003', hand: 23, body: 2, lower: 25 },
    { date: '03/01/2003', hand: 1, body: 2, lower: 25 },
    { date: '04/01/2003', hand: 3, body: 4, lower: 25 },
    { date: '05/01/2003', hand: 23, body: 2, lower: 25 },
    { date: '06/01/2003', hand: 23, body: 2, lower: 25 },
    { date: '07/01/2003', hand: 3, body: 2, lower: 25 },
    { date: '08/01/2003', hand: 23, body: 4, lower: 25 },
    { date: '09/01/2003', hand: 21, body: 4, lower: 25 },
    { date: '10/01/2003', hand: 9, body: 4, lower: 25 },
    { date: '11/01/2003', hand: 23, body: 24, lower: 25 },
  ];
  const [currentData, setCurrentData] = useState(data1);

  const handleButtonClick = (newData) => {
    setCurrentData(newData);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3 }} align='center'>
        Hi, Welcome to ScritchCare👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={6} sm={6} md={3}>
            <AppScratchPercentage
              chart={{
                series: [
                  { label: 'Scratch', value: 1300 },
                  { label: 'Good', value: 5435 },
                ],
              }}
            />
        </Grid>

        <Grid xs={6} sm={6} md={3}>
          <AppWidgetSummary
            title={account.displayName}
            total={234}
            color="error"
            icon={<Avatar 
              alt="icon" 
              src={account.photoURL} />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
        <Button onClick={() => handleButtonClick(data)}>12 hr</Button>
        <Button onClick={() => handleButtonClick(data1)}>Day</Button>
        {/* <Button onClick={() => handleButtonClick(data3)}>Week</Button>
        <Button onClick={() => handleButtonClick(data4)}>Month</Button> */}
          <AppScratchStatus
            title="Scratch Status"
            chart={{
              labels: currentData.map(d => d.date),
              series: [
                {
                  name: 'Hand',
                  type: 'bar',
                  stacked: true,
                  data: currentData.map(d => d.hand)  
                },
                {
                  name: 'Body',
                  type: 'bar',
                  stacked: true,
                  data: currentData.map(d => d.body)
                },
                {
                  name: 'Lower',
                  type: 'bar',
                  stacked: true,
                  data: currentData.map(d => d.lower)
                },
                {
                  name: 'Percent',
                  type: 'area',
                  fill: 'gradient',
                  data: [10, 80, 30, 40, 50, 60, 70, 50, 90, 100, 10] 
                }
                
              ],
              options: {
                chart: {
                  type: 'bar',
                  stacked: true
                },

                plotOptions: {
                  bar: {
                    horizontal: false,
                    stacked: true,
                    columnWidth: '70%'  
                  }
                }
              }
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Go skin doctor' },
              { id: '2', name: 'Buy face cream' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
