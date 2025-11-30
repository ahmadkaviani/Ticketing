import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Header, Label, List, ListItem } from 'semantic-ui-react';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import agent from './api/agent';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { toFarsiStatus } from './common/Helper';


export default observer(function CommentsDashboard() {

    const { ticketStore } = useStore();

    const { ticketId } = useParams<string>();

    const [ticketTitle, setTicketTitle] = useState<string>('');
    const [ticketStatus, setTicketStatus] = useState<string>('');

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchTicket = async () => {
            const ticket = await agent.Tickets.detail(ticketId!);
            setTicketTitle(ticket.title);
            setTicketStatus(ticket.status);
        };

        fetchTicket();

    }, [editMode]);

    return (
        <>
            <Container style={{ marginTop: '7em' }} >
                {/* <div style={{ display: "flex", alignItems: "center", gap: "8px" }}> */}
                <div>
                    <div>
                        <Header>{ticketTitle}</Header>
                    </div>
                    <br/>
                    <div>
                        <Label basic content={toFarsiStatus(ticketStatus)} />
                    </div>
                </div>
                <br/>
                <Grid>
                    <Grid.Column width={10}>

                        <CommentList ticketId={ticketId!} ></CommentList>

                    </Grid.Column>
                    <Grid.Column width={6}>
                        {editMode &&
                            <CommentForm ticketId={ticketId!} setEditMode={setEditMode} ></CommentForm>
                        }
                    </Grid.Column>
                </Grid>
                <br></br>
                <Button positive content='افزودن پیام جدید' onClick={() => { setEditMode(true); }}></Button>
                <br></br>
                <br />
                <br />
            </Container>

        </>
    );
})
