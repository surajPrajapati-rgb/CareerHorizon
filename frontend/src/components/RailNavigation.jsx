import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

function RailNavigation() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Navigation Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <HomeIcon sx={{ fontSize: 45, mr: 3}}/>
          </IconButton>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} sx={{ ml: 2 }} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flex: 1}}>
        {/* Left Part: Search Boxes */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            borderRight: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Paper component="form" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="From Station"
              inputProps={{ 'aria-label': 'from station' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Paper component="form" sx={{ display: 'flex', alignItems: 'center' }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="To Station"
              inputProps={{ 'aria-label': 'to station' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        {/* Right Part: Content Display */}
        <Box
          sx={{
            flex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Typography variant="h4">RailNavigation</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default RailNavigation;
