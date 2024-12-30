import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { Ticket } from './Ticket';

interface Props {
    tickets: Ticket[];
    handleSelectTicket: (id: string) => void;
    deleteTicket : (id: string) => void;
}

export default function TicketList({ tickets, handleSelectTicket, deleteTicket }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {tickets.map((item) => (
                    <Item key={item.id} >
                        <Item.Content>
                            <Item.Header as={'a'}>{item.title}</Item.Header>
                            {/* <item.Meta>{item.title}</item.Meta> */}
                            <Item.Description>
                                <div>{item.id}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='Delete' onClick={() => { deleteTicket(item.id); }} color='red'></Button>
                                <Button floated='right' content='View' onClick={() => { handleSelectTicket(item.id); }} color='blue'></Button>
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