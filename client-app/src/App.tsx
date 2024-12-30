import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Ticket } from './Ticket';
import NavBar from './NavBar';
import TicketsDashboard from './TicketsDashboard';
import {v4 as uuid} from 'uuid'

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

  function createOrEditTicket(ticket:Ticket)
  {
    ticket.id 
      ? setTickets([...tickets.filter(x => x.id != ticket.id),ticket])
      : setTickets([...tickets,{...ticket,id:uuid()}]);
  }

  function deleteTicket(id:string)
  {
      setTickets([...tickets.filter(x => x.id != id)]);
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
        handleFormClose={handleFormClose}
        createOrEditTicket={createOrEditTicket} 
        deleteTicket={deleteTicket} ></TicketsDashboard>
        

    </>
  );
}

export default App;
