import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Ticket } from './Ticket';
import NavBar from './NavBar';
import TicketsDashboard from './TicketsDashboard';

function App() {


  const [tickets, setTickets] = React.useState<Ticket[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5152/api/tickets/')
      .then(response => { setTickets(response.data) })

  }, []);

  return (
    <>
      <NavBar></NavBar>
      <TicketsDashboard tickets={tickets} ></TicketsDashboard>
    </> 
  );
}

export default App;
