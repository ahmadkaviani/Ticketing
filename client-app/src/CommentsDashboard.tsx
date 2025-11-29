import React, { useEffect } from 'react';
import { Container, Grid, Header, List, ListItem } from 'semantic-ui-react';
import { Ticket } from './Ticket';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import TicketForm from './TicketForm';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';



export default observer(function CommentsDashboard() {
    
    const {ticketStore} = useStore();
    
    const { ticketId } = useParams();
        
    return (

        <Container style={{ marginTop: '7em' }} >
            <span>{ ticketId }</span>
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