import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import PropTypes from 'prop-types';

const TotalExpenditure = ({ total, ...rest }) => (
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
            DESPESAS MÊS
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
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

TotalExpenditure.propTypes = {
  total: PropTypes.array.isRequired
};

export default TotalExpenditure;
