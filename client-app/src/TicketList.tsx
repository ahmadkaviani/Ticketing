import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { Ticket } from './Ticket';
import { useStore } from './stores/store';

export default function TicketList() {

    const {ticketStore} = useStore();

    return (
        <Segment>
            <Item.Group divided>
                {ticketStore.tickets.map((item) => (
                    <Item key={item.id} >
                        <Item.Content>
                            <Item.Header as={'a'}>{item.title}</Item.Header>
                            {/* <item.Meta>{item.title}</item.Meta> */}
                            <Item.Description>
                                <div>{item.id}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='Delete' onClick={() => { }} color='red'></Button>
                                <Button floated='right' content='View' onClick={() => { ticketStore.selectTicket(item.id); }} color='blue'></Button>
                                <Label basic content={item.status}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )
                )
                }</Item.Group>
        </Segment>
    )
}