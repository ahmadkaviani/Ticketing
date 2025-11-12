import { Form, Formik } from "formik";
import MyTextInput from "../common/form/MyTextInput";
import { Button } from "semantic-ui-react";

export default function LoginForm() {
    return (<Formik initialValues={{ email: '', password: '' }}
        onSubmit={values => console.log(values)}
    >
        {({ handleSubmit }) => (<Form className='ui form' onSubmit={handleSubmit}>
            <MyTextInput placeholder="Email" name="email"></MyTextInput>
            <MyTextInput placeholder="Password" name="password" type="password"></MyTextInput>
            <Button positive content='login' type="submit" fluid></Button>

        </Form>)}
    </Formik>)
}