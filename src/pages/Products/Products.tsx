import {
  Container,
  Typography,
  Paper,
} from '@mui/material';
import PrivateLayout from '../../components/Layout/PrivateLayout';

const Products = () => {
  return (
    <PrivateLayout title="Produtos">
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Gestão de Produtos
          </Typography>
          <Typography variant="body1">
            Aqui você pode gerenciar todos os produtos do sistema.
          </Typography>
        </Paper>
      </Container>
    </PrivateLayout>
  );
};

export default Products;