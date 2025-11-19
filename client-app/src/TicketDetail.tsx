import React from 'react'
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
    Button,
    ButtonGroup
} from 'semantic-ui-react'
import { Ticket } from './Ticket';
import { useStore } from './stores/store';


export default function TicketDetail() {

    const {ticketStore} = useStore();    

    return (
        <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <CardContent>
                <CardHeader>{ticketStore.selectedTicket?.title}</CardHeader>
                <CardMeta>
                    <span className='date'>{ticketStore.selectedTicket?.initiateTime}</span>
                </CardMeta>
                <CardDescription>
                    {ticketStore.selectedTicket?.lastModifiedTime}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <a>
                    <Icon name='user' />
                    {ticketStore.selectedTicket?.status}
                </a>
            </CardContent>
            <CardContent extra>
                <ButtonGroup>
                    <Button floated="right" basic color='blue' content="Edit" onClick={() => {ticketStore.formOpen(ticketStore.selectedTicket?.id)}} />
                    <Button floated="right" basic color='grey' content="Cancel" onClick={() => {ticketStore.formClose()}} />
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}