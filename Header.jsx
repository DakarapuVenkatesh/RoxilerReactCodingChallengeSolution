import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

function Header() {
  const styles = {
    appBar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '40px',
      backgroundColor: 'black'
    },
    title: {
      flexGrow: 1
    }
  };

  return (
    <AppBar position="static" style={styles.appBar}>
      <Toolbar>
        <Typography variant="h6" style={styles.title}>
          React Coding Challenge
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
