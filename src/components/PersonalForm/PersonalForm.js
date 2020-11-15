import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';

import FormMessage from './FormMessage';

const StyledContainer = styled.div`
    max-width: 400px;
    margin: 100px auto 50px;
    padding: 40px 20px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

const StyledTitle = styled.div`
    font-size: 18px;
    margin-bottom: 20px;
`;

const StyledFormSection = styled.div`
    margin-top: 20px;
`;

const fieldStyles = withError => `
    width: 100%;
    padding: 10px;
    border: 1px solid ${withError ? '#d3170d' : '#ccc'};
    border-radius: 4px;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    ${!withError && 'margin-bottom: 10px;'}
`;

const StyledInput = styled.input`
    ${props => fieldStyles(props.withError)}
`;

const StyledTextArea = styled.textarea`
    ${props => fieldStyles(props.withError)}
`;

const StyledErrorMessage = styled(ErrorMessage)`
    color: #d3170d;
    font-size: 12px;
    margin: 3px 0 10px;
`;

const StyledButton = styled.button`
    display: block;
    border-radius: 4px;
    border: none;
    outline: none;
    background-color: #00b894;
    padding: 10px 0;
    margin-top: 40px;
    color: #fff;
    width: 100%;
    cursor: pointer;
`;

const PersonalForm = () => {
    const [ showMessage, setShowMessage ] = useState(false);

    const validateForm = values => {
        const errors = {};

        Object.keys(values).forEach(item => !values[item] && (errors[item] = 'This field is required'));

        return errors;
    };

    const submitForm = (values, { resetForm }) => {
        resetForm();
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
    };

    return (
        <StyledContainer>
            <StyledTitle>Please enter your personal details</StyledTitle>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', bio: '', gender: '', termsAccepted: false }}
                validate={validateForm}
                onSubmit={submitForm}
            >
                {({ errors }) => (
                    <React.Fragment>
                        { showMessage && <FormMessage message="Thank you for sending the form"/>}
                        <Form>
                            <StyledFormSection>
                                <Field as={StyledInput} type="text" name="firstName" placeholder="First name" withError={!!errors.firstName} />
                                <StyledErrorMessage name="firstName" component="div"/>
                                <Field as={StyledInput} type="text" name="lastName" placeholder="Last name" withError={!!errors.lastName} />
                                <StyledErrorMessage name="lastName" component="div"/>
                                <Field as={StyledInput} type="email" name="email" placeholder="Email address" withError={!!errors.email} />
                                <StyledErrorMessage name="email" component="div"/>
                                <Field as={StyledTextArea} rows="8" name="bio" placeholder="Short bio" withError={!!errors.bio} />
                                <StyledErrorMessage name="bio" component="div"/>
                            </StyledFormSection>

                            <StyledFormSection>
                                <div>Gender</div>
                                <div>
                                    <Field type="radio" id="female" name="gender" value="female"/>
                                    <label htmlFor="female">Female</label>
                                </div>
                                <div>
                                    <Field type="radio" id="male" name="gender" value="male"/>
                                    <label htmlFor="male">Male</label>
                                </div>
                                <StyledErrorMessage name="gender" component="div"/>
                            </StyledFormSection>

                            <StyledFormSection>
                                <Field type="checkbox" id="termsAccepted" name="termsAccepted"/>
                                <label htmlFor="termsAccepted">I accept Terms & Conditions</label>
                                <StyledErrorMessage name="termsAccepted" component="div"/>
                            </StyledFormSection>

                            <StyledButton type="submit">Send</StyledButton>
                        </Form>
                    </React.Fragment>
                )}
            </Formik>
        </StyledContainer>
    )
};

export default PersonalForm;
