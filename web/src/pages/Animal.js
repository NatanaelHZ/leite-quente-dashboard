import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved
import AnimalAdd from 'src/components/animal/AnimalAdd';
// eslint-disable-next-line import/no-unresolved
import AnimalEdit from 'src/components/animal/AnimalEdit';
// eslint-disable-next-line import/no-unresolved
import AnimalAddDetail from 'src/components/animal/AnimalAddDetail';

const Animal = () => {
  const { state } = useLocation();

  const [idAnimal, setIdAnimal] = useState(0);

  useEffect(() => {
    const has = Object.prototype.hasOwnProperty;

    if (has.call(state, 'id')) {
      setIdAnimal(state.id);
    }

    console.log(`Animal: ${idAnimal}`);
  }, [state]);

  return (
    <>
      <Helmet>
        <title>Animal | Leite Quente</title>
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
              <AnimalAddDetail />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              { idAnimal ? <AnimalEdit id={idAnimal} /> : <AnimalAdd /> }
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Animal;
