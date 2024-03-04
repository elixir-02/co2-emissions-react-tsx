
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import './App.css';
import DataTable from './components/DataTable';
import VulnerabilityChart from './components/VulnerabilityChart';
import About from './components/About';

interface DataRow {
  ISO3: string;
  Name: string;
  [year: string]: string;
}

function App(): JSX.Element {
  const [data, setData] = useState<DataRow[]>([]);
  const [rowsPerPage] = useState(9);

  const styling = {
    textDecoration:'none',
    color:'white',
    marginLeft:'10rem',
    display:'flex',
    justifyContent:'space-evenly'
  }

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch('/data/vulnerability.csv');
      const reader = response.body?.getReader();

      if (reader) {
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvData = decoder.decode(result.value);

        setData(Papa.parse(csvData, { header: true, skipEmptyLines: true }).data as DataRow[]);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <AppBar position="static" style={{background:'rgb(13 42 73)',marginTop: '-8px',marginLeft:'-8px',width:'99vw'}}>
          <Toolbar >
          <h2 style={{textAlign:'left',marginLeft: '10px'}}>CO2 Emissions Worldwide</h2>

            <Typography style={styling} variant="h6" component={Link} to="/">
              Table
            </Typography>
            <Typography style={styling} variant="h6" component={Link} to="/chart">
              Chart
            </Typography>
            <Typography style={styling} variant="h6" component={Link} to="/about">
              About
            </Typography>
          </Toolbar>
        </AppBar>

        <Container>
          <Routes>
            <Route path="/" exact element={data.length > 0 && <DataTable data={data} rowsPerPage={rowsPerPage} />} />
            <Route path="/chart" element={ <VulnerabilityChart />}/>
            <Route path="/about" element={ <About />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
