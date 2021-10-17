import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { ShoppingBag as ShoppingBagIcon } from 'react-feather';
import PropTypes from 'prop-types';

const TotalLiters = ({ total, ...rest }) => (
  <Card {...rest}>
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
            LITROS MÊS
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
              backgroundColor: orange[600],
              height: 56,
              width: 56
            }}
          >
            <ShoppingBagIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Produção leiteira propriedade
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

TotalLiters.propTypes = {
  total: PropTypes.array.isRequired
};

export default TotalLiters;
