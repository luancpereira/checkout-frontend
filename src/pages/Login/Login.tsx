import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const LoginContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = await login({ email, password });
      
      if (!success) {
        setError('Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer maxWidth={false}>
      <LoginPaper elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Seu email"
            margin="normal"
            autoComplete="email"
          />
          
          <TextField
            fullWidth
            id="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Sua senha"
            margin="normal"
            autoComplete="current-password"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, height: 48 }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Carregando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </Box>
      </LoginPaper>
    </LoginContainer>
  );
};

export default Login;