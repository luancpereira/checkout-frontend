import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import {
  MenuOutlined
} from '@mui/icons-material';
import Sidebar from './Sidebar';

interface PrivateLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ 
  children, 
  title = 'Home' 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleSidebarOpen}
            sx={{ mr: 2 }}
          >
            <MenuOutlined />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar 
        open={sidebarOpen} 
        onClose={handleSidebarClose} 
      />

      {children}
    </Box>
  );
};

export default PrivateLayout;