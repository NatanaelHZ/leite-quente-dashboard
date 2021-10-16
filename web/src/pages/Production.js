import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved
import ProductionAdd from 'src/components/production/ProductionAdd';
// eslint-disable-next-line import/no-unresolved
import ProductionEdit from 'src/components/production/ProductionEdit';
// eslint-disable-next-line import/no-unresolved
import ProductionAddDetail from 'src/components/production/ProductionAddDetail';

const Production = () => {
  const { state } = useLocation();

  const [idProduction, setIdProduction] = useState(0);

  useEffect(() => {
    const has = Object.prototype.hasOwnProperty;

    if (has.call(state, 'id')) {
      setIdProduction(state.id);
    }

    console.log(`Production: ${idProduction}`);
  }, [state]);

  return (
    <>
      <Helmet>
        <title>Production | Leite Quente</title>
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
              lg={4}
              md={6}
              xs={12}
            >
              <ProductionAddDetail />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              { idProduction ? <ProductionEdit id={idProduction} /> : <ProductionAdd /> }
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Production;
