import { Segment, Form, Button  } from "semantic-ui-react";

interface Props {
    handleFormClose : () => void;

}

export default function TicketForm({handleFormClose}:Props)
{
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='title'></Form.Input>
                <Button floated="right" positive type="submit" content="submit"></Button>
                <Button floated="right" content="cancel" onClick={() => {handleFormClose()}}></Button>
            </Form>
        </Segment>
    );

}