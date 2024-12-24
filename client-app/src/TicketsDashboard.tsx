import React from 'react'
import { Container, Header, List, ListItem } from 'semantic-ui-react';
import { Ticket } from './Ticket';
import TicketList from './TicketList';

interface Props {
    tickets: Ticket[];
}

export default function TicketsDashboard({ tickets }: Props) {
    return (
        <Container style={{ marginTop: '7em' }} >
            <TicketList tickets={tickets} ></TicketList>
        </Container>
    );
}