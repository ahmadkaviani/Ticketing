import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../common/form/MyTextInput";
import { Button, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import './../index.css';

export default observer( function LoginForm() {
    const {userStore} = useStore();
    return (<Formik initialValues={{ email: '', password: '', error:null }}
        onSubmit={(values,{setErrors}) => userStore.login(values).catch(error =>
             setErrors({error: 'Invalid email or passwrord'}))}
    >
        {({ handleSubmit,isSubmitting,errors }) => (<Form className='ui form' onSubmit={handleSubmit}>
            <Label >سامانه ثبت نظرات و شکایات سایت tsetmc.com :</Label>
            <MyTextInput placeholder="Email" name="email"></MyTextInput>
            <MyTextInput placeholder="Password" name="password" type="password"></MyTextInput>
            <ErrorMessage 
                name='error' render={() => <Label style={{'margin-bottom' : '10px'}} basic color="red" content={errors.error} ></Label>}
            ></ErrorMessage>
            <br />
            <Button loading={isSubmitting} positive content='ورود' type="submit" fluid></Button>

        </Form>)}
    </Formik>)
})