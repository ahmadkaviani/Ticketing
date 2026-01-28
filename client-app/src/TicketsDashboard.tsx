import React, { useEffect } from 'react';
import { Button, Container, Grid, Header, List, ListItem } from 'semantic-ui-react';
import { Ticket } from './Ticket';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import TicketForm from './TicketForm';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router-dom";



export default observer(function TicketsDashboard() {

    const { ticketStore } = useStore();
    const navigate = useNavigate();


    return (
        <>
            <Container style={{ marginTop: '2em' }}>
                <Grid>
                    <Grid.Column width={13}>
                        <fieldset style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
                            <legend style={{ fontSize: "1.2rem", fontWeight: "bold", padding: "0 8px" }}>
                                تیکت های ثبت شده
                            </legend>

                            <TicketList />

                            {ticketStore.selectedTicket && <TicketDetail />}
                            {ticketStore.editMode && <TicketForm />}
                        </fieldset>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Button style={{ marginTop: '1em' }}
                            positive
                            fluid
                            content="تیکت جدید"
                            onClick={() => ticketStore.formOpen()}
                        />
                        <br />
                        <Button
                            negative
                            fluid
                            content="سوالات متداول"
                            onClick={() => navigate("/faq")}
                        />
                    </Grid.Column>
                </Grid>
            </Container>

        </>
    );
})