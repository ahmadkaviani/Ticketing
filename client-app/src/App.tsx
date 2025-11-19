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
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';

function App() {

  const {ticketStore} = useStore();
  const [tickets, setTickets] = React.useState<Ticket[]>([]);


  useEffect(() => {
    ticketStore.loadTickets();

  }, [ticketStore]);

  
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

  if (ticketStore.loading) return <div>Loading tickets...</div>;

  return (
    <>
      <NavBar></NavBar>
      <Container style={{marginTop : '7em'}} >
        <Outlet></Outlet>
      </Container>
      
    </>
  );
}

export default observer(App);
