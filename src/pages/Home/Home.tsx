import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea
} from '@mui/material';
import {
  Inventory2Outlined,
  AssignmentOutlined,
  PeopleOutlined,
  CloudUploadOutlined
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PrivateLayout from '../../components/Layout/PrivateLayout';
import api from '../../services/api';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(api);

  const menuItems = [
    {
      title: 'Produtos',
      icon: <Inventory2Outlined sx={{ fontSize: 60 }} />,
      path: '/products'
    },
    {
      title: 'Ordem de Serviço',
      icon: <AssignmentOutlined sx={{ fontSize: 60 }} />,
      path: '/os'
    },
    {
      title: 'Clientes',
      icon: <PeopleOutlined sx={{ fontSize: 60 }} />,
      path: '/customers'
    },
    {
      title: 'Subir Dados',
      icon: <CloudUploadOutlined sx={{ fontSize: 60 }} />,
      path: null
    }
  ];

  const handleCardClick = (path: string | null) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <PrivateLayout title="Home">
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Bem-vindo!
          </Typography>
          <Typography variant="body1">
            Você está logado como: <strong>{user?.email}</strong>
          </Typography>
        </Paper>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 3
          }}
        >
          {menuItems.map((item, index) => (
            <Card
              key={index}
              elevation={2}
              sx={{
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  elevation: 4,
                  transform: 'translateY(-4px)',
                  cursor: item.path ? 'pointer' : 'default'
                }
              }}
            >
              <CardActionArea
                onClick={() => handleCardClick(item.path)}
                disabled={!item.path}
                sx={{ height: '100%', p: 3 }}
              >
                <CardContent sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '100%',
                  justifyContent: 'center'
                }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" component="h3">
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </PrivateLayout>
  );
};

export default Home;