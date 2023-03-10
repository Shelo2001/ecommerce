import React from "react";
import { Formik } from "formik";
import { InputControl } from "formik-chakra-ui";
import { Link as ReachLink } from "react-router-dom";
import * as Yup from "yup";
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
import { useTranslation } from "react-i18next";

const Profile = ({ id }) => {
    const { t } = useTranslation();
    const initialValues = {
        email: "",
        name: "",
        phone_number: "",
    };
    const validationSchema = Yup.object({
        email: Yup.string().email(),
        name: Yup.string().max(255),
        phone_number: Yup.string(),
    });
    const onSubmit = () => {
        console.log("first");
    };
    return (
        <div>
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
                                    {t("Update your profile.1")}
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
                                        name="name"
                                        label={t("Name.1")}
                                    />
                                    <InputControl
                                        name="email"
                                        label={t("Email.1")}
                                    />
                                    <InputGroup>
                                        <InputLeftAddon children="+995" />
                                        <InputControl name="phone_number" />
                                    </InputGroup>

                                    <Button
                                        onClick={handleSubmit}
                                        colorScheme="teal"
                                    >
                                        {t("Update profile.1")}
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

export default Profile;
