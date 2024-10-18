import { AccountCircle, Agriculture } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'

export const NavBar = () => {
  return (
    <AppBar position="static" color="primary">
        <Toolbar>
          <Agriculture sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Farmer's Friend
          </Typography>
          <IconButton color="inherit" aria-label="sign up">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      
  )
}
