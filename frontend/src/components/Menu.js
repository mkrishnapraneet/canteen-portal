import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicMenu() {
  const [user_type, setUser] = React.useState('');

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user_type}
          label="User Type"
          onChange={handleChange}
        >
          <MenuItem value="Vendor">Vendor</MenuItem>
          <MenuItem value="Buyer">Buyer</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
