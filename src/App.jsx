import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DataTable from './components/Users/users';
import ProductCard from './components/Products/products';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="aside">
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#000', marginTop: '25px' }}>
            <Divider />
            <nav aria-label="secondary">
              <List>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/users">
                    <ListItemText primary="Users" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/products">
                    <ListItemText primary="Products" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </div>
        <div className="main">
          <Routes>
            <Route path="/users" element={<DataTable />} />
            <Route path="/products" element={<ProductCard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
