import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import PropTypes from 'prop-types';

const GenreAnimal = ({ male, female, ...rest }) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [male, female],
        backgroundColor: [
          colors.indigo[500],
          colors.orange[700]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Macho', 'Fêmea']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Macho',
      value: ((male * 100) / (male + female)).toFixed(2),
      color: colors.indigo[500]
    },
    {
      title: 'Fêmea',
      value: ((female * 100) / (male + female)).toFixed(2),
      color: colors.orange[600]
    }
  ];

  return (
    <Card {...rest}>
      <CardHeader title="Animais" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

GenreAnimal.propTypes = {
  male: PropTypes.array.isRequired,
  female: PropTypes.array.isRequired
};

export default GenreAnimal;
