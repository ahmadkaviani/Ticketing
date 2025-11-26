import React, { useEffect } from 'react';
import { Container, Grid, Header, List, ListItem } from 'semantic-ui-react';
import { Ticket } from './Ticket';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import TicketForm from './TicketForm';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';



export default observer(function TicketsDashboard() {
    
    const {ticketStore} = useStore();
    
    
    return (
        <Container style={{ marginTop: '7em' }} >
            <Grid>
                <Grid.Column width={10}>

                    <TicketList ></TicketList>

                </Grid.Column>
                <Grid.Column width={6}>
                    { ticketStore.selectedTicket &&
                        <>
                            <TicketDetail />
                        </>
                    }
                    {ticketStore.editMode &&
                        <TicketForm ></TicketForm>
                    }

                </Grid.Column>
            </Grid>
        </Container>
    );
})