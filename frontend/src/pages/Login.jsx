import {
    Box,
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { FormControl, InputControl, SubmitButton } from "formik-chakra-ui";
import * as React from "react";
import { Link as ReachLink } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
    const onSubmit = (values) => {};
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
    });

    return (
        <>
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
                                <Heading fontSize={"4xl"}>
                                    Sign in to your account
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
                                        name="email"
                                        label="Email"
                                    />
                                    <InputControl
                                        isRequired
                                        name="password"
                                        inputProps={{ type: "password" }}
                                        label="Password"
                                    />

                                    <Button
                                        onClick={handleSubmit}
                                        colorScheme="teal"
                                    >
                                        Sign in
                                    </Button>
                                    <Text
                                        textAlign={"center"}
                                        fontSize={"lg"}
                                        color={"gray.600"}
                                    >
                                        Don't have an account?{" "}
                                        <Link
                                            as={ReachLink}
                                            to="/register"
                                            color="teal"
                                        >
                                            Register here
                                        </Link>{" "}
                                        ✌️
                                    </Text>
                                </Stack>
                            </Box>
                        </Stack>
                    </Flex>
                )}
            </Formik>
        </>
    );
};

export default Login;
