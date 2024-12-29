import { Segment, Form, Button  } from "semantic-ui-react";

interface Props {
    handleSelectedTicket : (id:string) => void;
}

export default function TicketForm({handleSelectedTicket}:Props)
{
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='title'></Form.Input>
                <Button floated="right" positive type="submit" content="submit"></Button>
                <Button floated="right" content="cancel" onClick={() => {handleSelectedTicket('')}}></Button>
            </Form>
        </Segment>
    );

}