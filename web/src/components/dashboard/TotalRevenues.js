import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import PropTypes from 'prop-types';
import moment from 'moment';

const TotalRevenues = ({ total, ...rest }) => (
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
            FATURAMENTO MÊS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {`R$ ${total.toFixed(2)}`}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: green[600],
              height: 56,
              width: 56
            }}
          >
            <ArrowUpward />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={(parseInt(moment().date(), 10) * 100) / parseInt(moment().daysInMonth(), 10)}
          variant="determinate"
        />
      </Box>
    </CardContent>
  </Card>
);

TotalRevenues.propTypes = {
  total: PropTypes.array.isRequired
};

export default TotalRevenues;
