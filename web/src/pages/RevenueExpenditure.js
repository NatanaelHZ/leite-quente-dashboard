import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved
import RevenueExpenditureAdd from 'src/components/revenueExpenditure/RevenueExpenditureAdd';
// eslint-disable-next-line import/no-unresolved
import RevenueExpenditureEdit from 'src/components/revenueExpenditure/RevenueExpenditureEdit';

const RevenueExpenditure = () => {
  const { state } = useLocation();

  const [idRevenueExpenditure, setIdRevenueExpenditure] = useState(0);

  useEffect(() => {
    const has = Object.prototype.hasOwnProperty;

    if (has.call(state, 'id')) {
      setIdRevenueExpenditure(state.id);
    }

    console.log(`RevenueExpenditure: ${idRevenueExpenditure}`);
  }, [state]);

  return (
    <>
      <Helmet>
        <title>RevenueExpenditure | Leite Quente</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
            >
              {
                idRevenueExpenditure ? <RevenueExpenditureEdit id={idRevenueExpenditure} /> : <RevenueExpenditureAdd />
              }
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default RevenueExpenditure;
