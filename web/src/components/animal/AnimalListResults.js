import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved
import getInitials from 'src/utils/getInitials';
// eslint-disable-next-line import/no-unresolved
import getBreeds from 'src/utils/getBreeds';

const AnimalListResults = ({ animals, ...rest }) => {
  const [selectedAnimalIds, setSelectedAnimalIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [avatar, setAvatar] = useState('');

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedAnimalIds.indexOf(id);
    let newSelectedAnimalIds = [];

    if (selectedIndex === -1) {
      newSelectedAnimalIds = newSelectedAnimalIds.concat(selectedAnimalIds, id);
    } else if (selectedIndex === 0) {
      newSelectedAnimalIds = newSelectedAnimalIds.concat(selectedAnimalIds.slice(1));
    } else if (selectedIndex === selectedAnimalIds.length - 1) {
      newSelectedAnimalIds = newSelectedAnimalIds.concat(selectedAnimalIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedAnimalIds = newSelectedAnimalIds.concat(
        selectedAnimalIds.slice(0, selectedIndex),
        selectedAnimalIds.slice(selectedIndex + 1)
      );
    }

    setSelectedAnimalIds(newSelectedAnimalIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setAvatar('/static/images/avatars/avatar.png');
  }, []);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: 'transparent' }}>
                  +
                </TableCell>
                <TableCell>
                  Nome
                </TableCell>
                <TableCell>
                  N° Registro
                </TableCell>
                <TableCell>
                  Raça
                </TableCell>
                <TableCell>
                  Sexo
                </TableCell>
                <TableCell>
                  Data Nasc.
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {animals.slice(0, limit).map((animal) => (
                <TableRow
                  hover
                  key={animal.id}
                  selected={selectedAnimalIds.indexOf(animal.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAnimalIds.indexOf(animal.id) !== -1}
                      onChange={(event) => handleSelectOne(event, animal.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={avatar}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(animal.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {animal.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {animal.registerNumber}
                  </TableCell>
                  <TableCell>
                    {`${getBreeds(animal.breed_id)}`}
                  </TableCell>
                  <TableCell>
                    {animal.genre === 'M' ? 'Macho' : 'Fêmea'}
                  </TableCell>
                  <TableCell>
                    {moment('1995-04-28').format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={animals.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AnimalListResults.propTypes = {
  animals: PropTypes.array.isRequired
};

export default AnimalListResults;
