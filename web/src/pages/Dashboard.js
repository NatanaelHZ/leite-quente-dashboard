/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import TotalAnimal from 'src/components/dashboard/TotalAnimal';
import Sales from 'src/components/dashboard/Sales';
import TotalRevenues from 'src/components/dashboard/TotalRevenues';
import TotalLiters from 'src/components/dashboard/TotalLiters';
import TotalExpenditure from 'src/components/dashboard/TotalExpenditure';
import GenreAnimal from 'src/components/dashboard/GenreAnimal';
import * as dashboardService from 'src/services/dashboardService';

const data = {
  animals: 0,
  production: 0,
  month: 0,
  revenues: 0,
  expenditures: 0,
  males: 0,
  females: 0
};

const Dashboard = () => {
  const [results, setResults] = useState(data);

  useEffect(() => {
    dashboardService.results().then(
      (result) => {
        setResults(result.data.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard | Leite Quente</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalAnimal total={results.animals} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalLiters total={results.production} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalRevenues total={results.revenues} />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalExpenditure sx={{ height: '100%' }} total={results.expenditures} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <Sales />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <GenreAnimal sx={{ height: '100%' }} male={results.males} female={results.females} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
