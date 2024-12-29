import React from 'react'
import { Container, Grid, Header, List, ListItem } from 'semantic-ui-react';
import { Ticket } from './Ticket';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import TicketForm from './TicketForm';

interface Props {
    tickets: Ticket[];
    selectedTicket:Ticket | undefined;
    handleSelectedTicket : (id:string) => void;
}

export default function TicketsDashboard({ tickets, selectedTicket, handleSelectedTicket }: Props) {
    return (
        <Container style={{ marginTop: '7em' }} >
            <Grid>
                <Grid.Column width={10}>

                    <TicketList tickets={tickets} handleSelectedTicket={handleSelectedTicket} ></TicketList>

                </Grid.Column>
                <Grid.Column width={6}>
                    {selectedTicket &&
                        <TicketDetail ticket={selectedTicket} />

                    }
                    <TicketForm handleSelectedTicket={handleSelectedTicket}></TicketForm>
                </Grid.Column>
            </Grid>
        </Container >
    );
}