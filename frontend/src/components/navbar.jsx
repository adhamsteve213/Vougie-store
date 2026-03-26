import  React,{useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { InputBase, Paper, List, ListItem, ListItemText, ClickAwayListener } from '@mui/material';
const userNavLinks = [
  { title: 'Home', path: '/' },
  { title: 'Sets', path: '/sets' },
  { title: 'Tops', path: '/tops' },
  { title: 'Bottoms', path: '/bottoms' },
  { title: 'Cart', path: '/carts' },
  { title: 'My Orders', path: '/my-orders' },
  { title: 'Wishlist', path: '/wishlist' },
  { title: 'Contacts', path: '/contacts' },
  { title: 'About', path: '/about' },
];

const adminNavLinks = [
  { title: 'Dashboard', path: '/admin' },
  { title: 'Manage Users', path: '/admin/users' },
  { title: 'Orders', path: '/admin/orders' },
];

export default function Navbar() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = !!token;
  const isAdmin = role === 'admin';
  const navLinks = isAdmin ? adminNavLinks : userNavLinks;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(()=>{
    console.log("Role in Navbar:", role);
      console.log("Is Admin:", isAdmin);
      fetch ('http://127.0.0.1:8000/admin/',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${token}`
        }
      })
      .then (response => {
        if (response.ok){
          console.log("Admin access granted");
        } else {
          console.log("Admin access denied");
        }
      })
    }, [token, role, isAdmin]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      fetch(`http://127.0.0.1:8000/search/?q=${query}`)
        .then(response => response.json())
        .then(data => {
          setSearchResults(data.results || []);
          setShowResults(true);
        })
        .catch(error => console.error('Search error:', error));
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/product/${result.category}/${result.id}`);
  };

  const handleClickAway = () => {
    setShowResults(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }} // Show only on mobile
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2 }}
          >
            Vougie
          </Typography>

          {/* Desktop Nav Links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component="a" // Using 'a' tag for example, use Link from react-router-dom
                href={link.path}
                sx={{ color: 'white', display: 'block' }}
              >
                {link.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <Box sx={{ position: 'relative' }}>
                <Paper
                  component="form"
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 300,
                    mr: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1, color: 'white' }}
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    inputProps={{ 'aria-label': 'search products' }}
                  />
                  <IconButton type="button" sx={{ p: '10px', color: 'white' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
                {showResults && searchResults.length > 0 && (
                  <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1000, maxHeight: 300, overflow: 'auto' }}>
                    <List>
                      {searchResults.map((result) => (
                        <ListItem button key={result.id} onClick={() => handleResultClick(result)}>
                          <ListItemText primary={result.name} secondary={`${result.category} - ${result.price}EGP`} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}
              </Box>
            </ClickAwayListener>
            <Link to="/carts" style={{ color: 'inherit', textDecoration: 'none' }}>
              <IconButton size="large" aria-label="shopping cart" color="inherit">
                <ShoppingCartIcon />
              </IconButton>
            </Link>
            <Link to="/wishlist" style={{ color: 'inherit', textDecoration: 'none' }}>
              <IconButton size="large" aria-label="wishlist" color="inherit">
                <FavoriteBorderIcon />
              </IconButton>
            </Link>
            {isAuthenticated ? (
              <>
                <Button color="inherit" href="/profile"><AccountCircle/></Button>
                <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" href="/login" startIcon={<LoginIcon />}>
                  Login
                </Button>
                <Button color="inherit" href="/signup" startIcon={<PersonAddIcon />}>
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
//+20 109 920 4026
//https://www.instagram.com/maldiniiixx/
//https://www.instagram.com/vougi_eg/