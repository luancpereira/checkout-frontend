import {
  Container,
  Typography,
  Paper,
} from '@mui/material';
import PrivateLayout from '../../components/Layout/PrivateLayout';

const Customers = () => {
  return (
    <PrivateLayout title="Clientes">
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Gestão de Clientes
          </Typography>
          <Typography variant="body1">
            Aqui você pode gerenciar todos os clientes do sistema.
          </Typography>
        </Paper>
      </Container>
    </PrivateLayout>
  );
};

export default Customers;