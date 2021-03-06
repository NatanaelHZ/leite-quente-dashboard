import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const AnimalListToolbar = (props) => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/app/animal', { replace: true });
  };

  const handleEdit = () => {
    navigate('/app/animal', { replace: true });
  };

  return (
    <>
      <Box {...props}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            color="danger"
          >
            Excluir
          </Button>
          <Button
            sx={{ mx: 1 }}
            variant="outlined"
            startIcon={<EditIcon />}
            color="edit"
            onClick={handleEdit}
          >
            Editar
          </Button>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Novo Animal
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Pesquisar Animal"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default AnimalListToolbar;
