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
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link as ReachLink } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../features/users/usersSlice";

const Login = () => {
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        dispatch(login(values));
    };
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
    });
    const { t } = useTranslation();

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
                                <Heading fontSize={"3xl"}>
                                    {t("Sign in to your account.1")}
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
                                        label={t("Email.1")}
                                    />
                                    <InputControl
                                        isRequired
                                        name="password"
                                        inputProps={{ type: "password" }}
                                        label={t("Password.1")}
                                    />

                                    <Button
                                        onClick={handleSubmit}
                                        colorScheme="teal"
                                    >
                                        {t("Sign in.1")}
                                    </Button>
                                    <Text
                                        textAlign={"center"}
                                        fontSize={"lg"}
                                        color={"gray.600"}
                                    >
                                        {t("Don't have an account.1")}?{" "}
                                        <Link
                                            as={ReachLink}
                                            to="/register"
                                            color="teal"
                                        >
                                            {t("Register here.1")}
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
