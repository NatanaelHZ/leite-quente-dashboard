import { Alert } from '@material-ui/core';

const AlertSuccess = (props) => (
  <Alert {...props} variant="outlined" severity="success">
    Operação realizada com sucesso!
  </Alert>
);

export default AlertSuccess;
