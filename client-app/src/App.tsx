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
  const [editMode, setEditMode] = React.useState<boolean>(false);

  useEffect(() => {
    axios.get('http://localhost:5152/api/tickets/')
      .then(response => { setTickets(response.data) })

  }, []);

  function handleSelectTicket(id:string) {
    setSelectedTicket(tickets.find(x => x.id == id));
  }

  function handleCancelTicket() {
    setSelectedTicket(undefined);
  }

  function handleFormOpen(id? : string)
  {
    id ? handleSelectTicket(id) : handleCancelTicket();
    setEditMode(true);
  }

  function handleFormClose()
  {
    handleCancelTicket();
    setEditMode(false);
  }


  return (
    <>
      <NavBar handleFormOpen={handleFormOpen} ></NavBar>
      <TicketsDashboard 
        tickets={tickets} 
        selectedTicket={selectedTicket} 
        handleSelectTicket={handleSelectTicket} 
        handleCancelTicket={handleCancelTicket} 
        editMode={editMode}
        handleFormOpen={handleFormOpen}
        handleFormClose={handleFormClose}  ></TicketsDashboard>

    </>
  );
}

export default App;
