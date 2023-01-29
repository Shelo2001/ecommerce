import { Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Steps from "../components/Steps";
import {
    Flex,
    Box,
    Stack,
    Button,
    Heading,
    Text,
    Link,
    InputLeftAddon,
    InputGroup,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import { Link as ReachLink } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/users/usersSlice";

const Shipping = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = (values) => {
        dispatch(registerUser(values));
    };
    const initialValues = {
        email: "",
        name: "",
        phone_number: "",
        password: "",
        confirmPassword: "",
    };
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        name: Yup.string().max(255).required(),
        phone_number: Yup.string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("phone number is a required field"),
        password: Yup.string().min(6).required(),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("confirm password is a required field"),
    });
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("token")) == null) {
            navigate("/login");
        }
    }, []);
    return (
        <div>
            <Container m={"auto"}>
                <Steps firstStep secondStep />
            </Container>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ handleSubmit, values, errors }) => (
                    <Flex minH={"80vh"} align={"center"} justify={"center"}>
                        <Stack
                            spacing={8}
                            mx={"auto"}
                            maxW={"lg"}
                            py={12}
                            px={6}
                        >
                            <Stack align={"center"}>
                                <Heading fontSize={"3xl"}>
                                    Register to your account
                                </Heading>
                            </Stack>
                            <Box
                                rounded={"lg"}
                                onSubmit={handleSubmit}
                                boxShadow={"lg"}
                                p={8}
                            >
                                <Stack spacing={4}>
                                    <InputControl
                                        isRequired
                                        name="name"
                                        label="Name"
                                    />
                                    <InputControl
                                        isRequired
                                        name="email"
                                        label="Email"
                                    />
                                    <InputControl
                                        isRequired
                                        name="email"
                                        label="Email"
                                    />
                                    <InputControl
                                        isRequired
                                        name="password"
                                        inputProps={{ type: "password" }}
                                        label="Password"
                                    />
                                    <InputControl
                                        isRequired
                                        name="confirmPassword"
                                        inputProps={{ type: "password" }}
                                        label="Confirm Password"
                                    />
                                    <Button
                                        onClick={handleSubmit}
                                        colorScheme="teal"
                                    >
                                        Save Shipping Address
                                    </Button>
                                </Stack>
                            </Box>
                        </Stack>
                    </Flex>
                )}
            </Formik>
        </div>
    );
};

export default Shipping;
