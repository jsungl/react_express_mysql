import React from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function Header(props) {
    const { title } = props;
    return (
        <Box>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                    component="h2"
                    variant="h3"
                    color="inherit"
                    align="left"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" size="small">
                        Join
                    </Button>
                    <Button variant="contained" size="small">
                        Login
                    </Button>
                </Stack>
            </Toolbar>
        </Box>
    );
}