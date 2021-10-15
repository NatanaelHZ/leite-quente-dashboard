import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved
import AnimalAdd from 'src/components/animal/AnimalAdd';
// eslint-disable-next-line import/no-unresolved
import AnimalAddDetail from 'src/components/animal/AnimalAddDetail';

const Animal = () => (
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
            <AnimalAdd />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Animal;
