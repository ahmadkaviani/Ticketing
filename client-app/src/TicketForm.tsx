import { Segment, Form, Button } from "semantic-ui-react";
import { Ticket } from "./Ticket";
import { ChangeEvent, useState } from "react";

interface Props {
    selectedTicket: Ticket | undefined;
    handleFormClose: () => void;
    createOrEditTicket: (ticket:Ticket) => void;

}

export default function TicketForm({ selectedTicket, handleFormClose, createOrEditTicket }: Props) {

    const initialState = selectedTicket ??
        {
            id: '',
            title: '',
            initiateTime: '',
            lastModifiedTime: '',
            status: 'initiated'
        }

    const [ticket, setTicket] = useState(initialState);

    function handleSubmit()
    {
        console.log(ticket);
        createOrEditTicket(ticket);
    }

    function handleInputChange(event : ChangeEvent<HTMLInputElement>)
    {
        console.log(event.target.name);
        console.log(event.target.value);
        const {name, value} = event.target;
        setTicket({...ticket, [name]:value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='title' name='title' value={ticket.title} onChange={handleInputChange}></Form.Input>
                <Button floated="right" positive type="submit" content="submit"></Button>
                <Button floated="right" content="cancel" onClick={() => { handleFormClose() }}></Button>
            </Form>
        </Segment>
    );

}