import React from 'react';
import Typography from '@mui/material/Typography';
//import { Link } from 'react-router-dom';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default function Footer() {
    //const description
    return (
        <Box component="footer">
            <Divider />
            <Copyright />
        </Box>
    );
}