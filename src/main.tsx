import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { Notifications } from '@mantine/notifications';
import { ColorSchemeToggle } from './components/ColorShemeToggle';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme='dark'>
      <ColorSchemeToggle/>
      <Notifications position="top-right" />
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
