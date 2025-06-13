import {
  Container,
  Typography,
  Paper,
} from '@mui/material';
import PrivateLayout from '../../components/Layout/PrivateLayout';

const OS = () => {
  return (
    <PrivateLayout title="Clientes">
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Gestão de Ordem de Serviço
          </Typography>
          <Typography variant="body1">
            Aqui você pode gerenciar todas as ordens de serviço do sistema.
          </Typography>
        </Paper>
      </Container>
    </PrivateLayout>
  );
};

export default OS;