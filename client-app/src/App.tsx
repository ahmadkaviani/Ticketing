import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Ticket } from './Ticket';
import NavBar from './NavBar';
import TicketsDashboard from './TicketsDashboard';
import {v4 as uuid} from 'uuid'
import agent from './api/agent'
import { useStore } from './stores/store';
import { Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

function App() {

  const {ticketStore} = useStore();

  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | undefined>(undefined);
  const [editMode, setEditMode] = React.useState<boolean>(false);

  useEffect(() => {
    agent.Tickets.list().then(response => { setTickets(response) })

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
      <br /><br /><br /><br /><br />
      <h2>{ticketStore.title}</h2>
      <Button content="Add" positive onClick={ticketStore.setTitle}></Button>
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

export default observer(App);
