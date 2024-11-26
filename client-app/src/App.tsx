import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List, ListItem } from 'semantic-ui-react';

function App() {


  const [tickets, setTickets] = React.useState([]);

  useEffect(() => {
    axios.get('http://localhost:5152/api/tickets/')
    .then(response => { setTickets(response.data)})
  
  },[]);

  return (
    <div className="App">
      <Header as='h2' icon="chess queen" content='Tickets' ></Header>
      <List>
        {
          tickets.map((item : any) => <ListItem key={item.title} >{item.title}</ListItem>)
        }
        </List>
      
    </div>
  );
}

export default App;
