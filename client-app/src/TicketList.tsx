import { Segment, Item, Button, Label } from 'semantic-ui-react';
import { Ticket } from './Ticket';

interface Props {
    tickets: Ticket[];
}

export default function TicketList({ tickets }: Props) {
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
                                <Button floated='right' content='View' color='blue'></Button>
                                <Label basic content={item.title}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )
                )
                }</Item.Group>
        </Segment>
        // <List>
        //     {
        //         tickets.map((item) => <ListItem key={item.title} >{item.title}</ListItem>)
        //     }
        // </List>
    )
}