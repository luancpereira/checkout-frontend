import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '../components/RouteGuards';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Customers from '../pages/Customers/Customers';
import OS from '../pages/OS/OS';
import Products from '../pages/Products/Products';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      
      {/* Rotas Privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/os" element={<OS />} />
        <Route path="/products" element={<Products />} />
      </Route>
      
      {/* Redirecionamentos */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;