import React, { useEffect, useState } from 'react';
/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AnimalListResults from 'src/components/animal/AnimalListResults';
import AnimalListToolbar from 'src/components/animal/AnimalListToolbar';
import * as animalService from 'src/services/AnimalService';

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    animalService.get().then(
      (result) => {
        console.log(`Registros: ${JSON.stringify(result.data.animals)}`);
        console.log(`Mesg: ${JSON.stringify(result.data.message)}`);

        setAnimals(result.data.animals);
      },
      (error) => {
        alert(`Erro ao carregar animais: ${error}`);
      }
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>Animais | Leite Quente</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <AnimalListToolbar />
          <Box sx={{ pt: 3 }}>
            <AnimalListResults animals={animals} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AnimalList;
