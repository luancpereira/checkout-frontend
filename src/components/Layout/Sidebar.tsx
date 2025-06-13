import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  IconButton
} from '@mui/material';
import {
  HomeOutlined,
  Inventory2Outlined,
  AssignmentOutlined,
  PeopleOutlined,
  LogoutOutlined,
  CloseOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: 'Home',
      icon: <HomeOutlined />,
      path: '/'
    },
    {
      title: 'Produtos',
      icon: <Inventory2Outlined />,
      path: '/products'
    },
    {
      title: 'Ordem de Serviço',
      icon: <AssignmentOutlined />,
      path: '/os'
    },
    {
      title: 'Clientes',
      icon: <PeopleOutlined />,
      path: '/customers'
    }
  ];

  const handleNavigation = (path: string | null) => {
    if (path) {
      navigate(path);
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const drawerWidth = 280;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ width: drawerWidth }} role="presentation">
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'white'
        }}>
          <Typography variant="h6" component="div">
            Menu
          </Typography>
          <IconButton 
            onClick={onClose}
            sx={{ color: 'white' }}
          >
            <CloseOutlined />
          </IconButton>
        </Box>

        <Box sx={{ p: 2, backgroundColor: 'grey.50' }}>
          <Typography variant="body2" color="text.secondary">
            Logado como:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {user?.email}
          </Typography>
        </Box>

        <Divider />

        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                disabled={!item.path}
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                    '& .MuiListItemText-primary': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'primary.main',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.title}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.95rem',
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Logout */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: 'error.light',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'error.main',
                  minWidth: 40,
                }}
              >
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;