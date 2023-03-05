import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Button } from '@mui/material';

const Header = () => {
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Button  component={Link} to="/" color="inherit">
            home
        </Button>
        <Button  component={Link} to="/register" color="inherit">
        register
        </Button>
        <Button  component={Link} to="/login" color="inherit">
        login
        </Button>
        <Button  component={Link} to="/Search" color="inherit">
        Search
        </Button>

        
      </Toolbar>
    </AppBar>
  );
};

export default Header;