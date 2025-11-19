import { Segment, Form, Button, FormField, Label, Header } from "semantic-ui-react";
import { Ticket } from "./Ticket";
import { ChangeEvent, useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { title } from "process";
import { error } from "console";
import MyTextInput from "./common/form/MyTextInput";
import { useStore } from "./stores/store";


export default function TicketForm() {

    const {ticketStore}= useStore();

    const initialState =  ticketStore.selectedTicket ??
    {
        id: '',
        title: '',
        initiateTime: '',
        lastModifiedTime: '',
        status: 'initiated'
    }

    const [ticket, setTicket] = useState(initialState);

    const validationSchema = Yup.object({
        title: Yup.string().required('الزامی')
    })

    function handleFormSubmit(ticket: Ticket)
    {
        console.log(ticket);
        //createOrEditTicket(ticket);
    }

    // function handleInputChange(event : ChangeEvent<HTMLInputElement>)
    // {
    //     console.log(event.target.name);
    //     console.log(event.target.value);
    //     const {name, value} = event.target;
    //     setTicket({...ticket, [name]:value});
    // }

    return (
        <Segment clearing>
            <Header content='Ticket Detail' sub color="teal"></Header>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize initialValues={ticket} onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting,dirty }) => (
                    <Form onSubmit={handleSubmit}>
                        {/* <FormField>
                            <Field placeholder='title' name='title' />
                            <ErrorMessage name="title" render={error => <Label basic color="red" content={error}></Label>}></ErrorMessage>
                        </FormField> */}
                        <MyTextInput name="title" placeholder="title"></MyTextInput>
                        <Button disabled={!isValid || isSubmitting || !dirty} floated="right" positive type="submit" content="submit"></Button>
                        <Button floated="right" content="cancel" onClick={() => { ticketStore.cancelTicket();} }></Button>
                    </Form>
                )
                }

            </Formik>

        </Segment>
    );

}