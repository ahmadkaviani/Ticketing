import React from 'react'
import { Container, Grid, Header, List, ListItem } from 'semantic-ui-react';
import { Ticket } from './Ticket';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import TicketForm from './TicketForm';

interface Props {
    tickets: Ticket[];
    selectedTicket: Ticket | undefined;
    handleSelectTicket: (id: string) => void;
    handleCancelTicket: () => void;
    editMode: boolean;
    handleFormOpen: (id: string) => void;
    handleFormClose: () => void;
    createOrEditTicket : (ticket:Ticket) => void;
    deleteTicket : (id: string) => void;
}

export default function TicketsDashboard({ tickets, selectedTicket, handleSelectTicket, handleCancelTicket, editMode, handleFormOpen, handleFormClose, createOrEditTicket, deleteTicket }: Props) {
    return (
        <Container style={{ marginTop: '7em' }} >
            <Grid>
                <Grid.Column width={10}>

                    <TicketList tickets={tickets} handleSelectTicket={handleSelectTicket} deleteTicket={deleteTicket} ></TicketList>

                </Grid.Column>
                <Grid.Column width={6}>
                    {selectedTicket &&
                        <>
                            <TicketDetail ticket={selectedTicket} handleCancelTicket={handleCancelTicket} handleFormOpen={handleFormOpen} />
                        </>
                    }
                    {editMode &&
                        <TicketForm handleFormClose={handleFormClose} selectedTicket={selectedTicket} createOrEditTicket={createOrEditTicket} ></TicketForm>
                    }

                </Grid.Column>
            </Grid>
        </Container>
    );
}