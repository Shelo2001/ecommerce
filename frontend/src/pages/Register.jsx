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
import React from "react";
import { Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import { Link as ReachLink } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/users/usersSlice";
import { useTranslation } from "react-i18next";

const Register = () => {
    const dispatch = useDispatch();
    const onSubmit = (values) => {
        dispatch(registerUser(values));
    };
    const { t } = useTranslation();
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

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, values, errors }) => (
                <Flex minH={"80vh"} align={"center"} justify={"center"}>
                    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                        <Stack align={"center"}>
                            <Heading fontSize={"3xl"}>
                                {t("Register to your account.1")}
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
                                    label={t("Name.1")}
                                />
                                <InputControl
                                    isRequired
                                    name="email"
                                    label={t("Email.1")}
                                />
                                <InputGroup>
                                    <InputLeftAddon children="+995" />
                                    <InputControl
                                        isRequired
                                        name="phone_number"
                                    />
                                </InputGroup>
                                <InputControl
                                    isRequired
                                    name="password"
                                    inputProps={{ type: "password" }}
                                    label={t("Password.1")}
                                />
                                <InputControl
                                    isRequired
                                    name="confirmPassword"
                                    inputProps={{ type: "password" }}
                                    label={t("Confirm Password.1")}
                                />
                                <Button
                                    onClick={handleSubmit}
                                    colorScheme="teal"
                                >
                                    {t("Sign Up.1")}
                                </Button>
                                <Text
                                    textAlign={"center"}
                                    fontSize={"lg"}
                                    color={"gray.600"}
                                >
                                    {t("Already have an account.1")}?{" "}
                                    <Link
                                        as={ReachLink}
                                        to="/login"
                                        color="teal"
                                    >
                                        {t("Login here.1")}
                                    </Link>{" "}
                                    ✌️
                                </Text>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            )}
        </Formik>
    );
};

export default Register;
