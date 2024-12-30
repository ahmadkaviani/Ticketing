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

interface Props {
    ticket: Ticket;
    handleCancelTicket: () => void;
    handleFormOpen: (id:string) => void;
}

export default function TicketDetail({ ticket, handleCancelTicket, handleFormOpen }: Props) {
    return (
        <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <CardContent>
                <CardHeader>{ticket.title}</CardHeader>
                <CardMeta>
                    <span className='date'>{ticket.initiateTime}</span>
                </CardMeta>
                <CardDescription>
                    {ticket.lastModifiedTime}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <a>
                    <Icon name='user' />
                    {ticket.status}
                </a>
            </CardContent>
            <CardContent extra>
                <ButtonGroup>
                    <Button floated="right" basic color='blue' content="Edit" onClick={() => {handleFormOpen(ticket.id)}} />
                    <Button floated="right" basic color='grey' content="Cancel" onClick={handleCancelTicket} />
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}