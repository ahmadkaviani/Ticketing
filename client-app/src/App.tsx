import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Ticket } from './Ticket';
import NavBar from './NavBar';
import TicketsDashboard from './TicketsDashboard';
import TicketDetail from './TicketDetail';

function App() {


  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | undefined>(undefined);

  useEffect(() => {
    axios.get('http://localhost:5152/api/tickets/')
      .then(response => { setTickets(response.data) })

  }, []);

  function handleSelectTicket(id:string) {
    setSelectedTicket(tickets.find(x => x.id == id));
  }


  return (
    <>
      <NavBar></NavBar>
      <TicketsDashboard tickets={tickets} selectedTicket={selectedTicket} handleSelectedTicket={handleSelectTicket} ></TicketsDashboard>

    </>
  );
}

export default App;
