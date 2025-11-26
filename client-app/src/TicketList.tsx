import React, { useEffect } from 'react';
import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { Ticket } from './Ticket';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';
import './index.css';
import { toFarsiStatus, toShamsiDateTime } from './common/Helper';


export default observer (function TicketList() {

    const { ticketStore } = useStore();


    useEffect(() => {
        ticketStore.loadTickets();
    }, [ticketStore]);


    if (ticketStore.loading) return <div>بارگذاری ...</div>;

    return (
        <Segment>
            <Item.Group divided>
                {ticketStore.tickets.map((item) => (
                    <Item key={item.id} >
                        <Item.Content>
                            <Item.Header as={'a'}>{item.title}</Item.Header>
                            {/* <item.Meta>{item.title}</item.Meta> */}
                            <Item.Description>
                                <div>{toShamsiDateTime(item.lastModifiedTime)}</div>
                            </Item.Description>
                            <Item.Extra>
                                {/* <Button floated='right' content='Delete' onClick={() => { }} color='red'></Button> */}
                                <Button floated='right' content='مشاهده' onClick={() => { ticketStore.selectTicket(item.id); }} color='blue'></Button>
                                <Label basic content={toFarsiStatus(item.status)}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )
                )
                }</Item.Group>
        </Segment>
    )
})