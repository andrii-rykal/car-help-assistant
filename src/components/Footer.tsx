import { AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Typography variant='h6' component='span' sx={{}}>
          <Link href='/'>Car Assistant</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
