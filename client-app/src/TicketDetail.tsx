import React from 'react'
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
} from 'semantic-ui-react'
import { Ticket } from './Ticket';

interface Props {
    ticket: Ticket;
}

export default function TicketDetail({ticket}:Props) {
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
        </Card>
    )
}