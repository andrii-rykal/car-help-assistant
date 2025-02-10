'use client';

import { Close, Menu } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { title: 'Домашня', path: '/' },
  { title: 'Про додаток', path: '/about' },
  { title: 'Новини', path: '/news' },
  { title: 'Контакти', path: '/contacts' },
  { title: 'Допомога', path: '/help' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h6' component='span' sx={{}}>
            <Link href='/'>Car Assistant</Link>
          </Typography>

          <nav>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                color='inherit'
                LinkComponent={Link}
                href={link.path}
                sx={{ display: { xs: 'none', md: 'inline-flex' } }}
              >
                {link.title}
              </Button>
            ))}
          </nav>
          <Box
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
            }}
          >
            <Button color='inherit'>Увійти</Button>
            <Button color='inherit'>Реєстрація</Button>
          </Box>

          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={toggleDrawer}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='right'
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box sx={{ width: 250, display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, mr: 2 }}
          >
            <IconButton onClick={toggleDrawer}>
              <Close />
            </IconButton>
          </Box>
          <List sx={{ width: 250, mb: 3 }}>
            {navLinks.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton
                  LinkComponent={Link}
                  href={link.path}
                  onClick={toggleDrawer}
                >
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              width: 'fit-content',
              gap: 1,
              alignItems: 'flex-start',
              p: 1,
            }}
          >
            <Button>Увійти</Button>
            <Button>Реєстрація</Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
