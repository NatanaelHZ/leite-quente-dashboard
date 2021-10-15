/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AnimalListResults from 'src/components/animal/AnimalListResults';
import AnimalListToolbar from 'src/components/animal/AnimalListToolbar';
import animals from 'src/__mocks__/animals';

const AnimalList = () => (
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

export default AnimalList;
