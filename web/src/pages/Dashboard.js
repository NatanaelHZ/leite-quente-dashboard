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

const Dashboard = () => (
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
            <TotalAnimal total={10} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalLiters total={120} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalRevenues total={2800.00} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalExpenditure sx={{ height: '100%' }} total={100.33} />
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
            <GenreAnimal sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
