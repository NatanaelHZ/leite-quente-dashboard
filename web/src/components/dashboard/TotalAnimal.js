import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { GiCow as AnimalIcon } from 'react-icons/gi';
import { indigo } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

const TotalAnimal = ({ total, ...rest }) => (
  <Card
    sx={{ height: '100%' }}
    {...rest}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            TOTAL ANIMAIS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {total}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: indigo[600],
              height: 56,
              width: 56
            }}
          >
            <AnimalIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Cadastrados na propriedade
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

TotalAnimal.propTypes = {
  total: PropTypes.array.isRequired
};

export default TotalAnimal;
