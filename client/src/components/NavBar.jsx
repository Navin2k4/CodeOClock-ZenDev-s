import { AccountCircle, Agriculture } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
<<<<<<< HEAD
    <AppBar position="static" color="success">
        <Toolbar>
          <Agriculture sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FarmZ
          </Typography>
          <IconButton color="inherit" aria-label="sign up">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
=======
<nav className="bg-green-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Farmer's Friend</Link>
          <div className="space-x-4">
            <Link to="/about" className="hover:text-green-300 transition duration-300">About</Link>
            <Link to="/features" className="hover:text-green-300 transition duration-300">Features</Link>
            <Link to="/contact" className="hover:text-green-300 transition duration-300">Contact</Link>
          </div>
        </div>
      </nav>

>>>>>>> f85cc1ede99ec52d00d586549684fcf71bfe7ac6

      
  )
}
