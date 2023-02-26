import { Checkbox, Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Steps from "../components/Steps";
import { Flex, Box, Stack, Button, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { InputControl, TextareaControl } from "formik-chakra-ui";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { saveShippingAddress } from "../features/order/orderSlice";
import { useTranslation } from "react-i18next";

const Shipping = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        let user = JSON.parse(localStorage.getItem("user"));
        let address = { ...values, user_id: user.id };
        dispatch(saveShippingAddress(address));
        navigate("/placeorder");
    };
    const { t } = useTranslation();
    const initialValues = {
        City: "",
        Street: "",
        AdditionalInfo: "",
    };
    const validationSchema = Yup.object({
        city: Yup.string().required().max(25),
        street: Yup.string().required().max(50),
        additional_info: Yup.string()
            .required("Additional info is a required field")
            .max(250),
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
                            w={"container.sm"}
                            py={12}
                            px={6}
                        >
                            <Box
                                rounded={"lg"}
                                onSubmit={handleSubmit}
                                boxShadow={"lg"}
                                p={8}
                            >
                                <Stack spacing={4}>
                                    <InputControl
                                        isRequired
                                        name="city"
                                        label={t("City.1")}
                                    />
                                    <InputControl
                                        isRequired
                                        name="street"
                                        label={t("Street.1")}
                                    />
                                    <TextareaControl
                                        isRequired
                                        name="additional_info"
                                        label={t("Additional info.1")}
                                        rows={10}
                                    />

                                    <Button
                                        onClick={handleSubmit}
                                        colorScheme="teal"
                                    >
                                        {t("Save Shipping Address.1")}
                                    </Button>
                                    <Text
                                        textAlign={"center"}
                                        fontSize={"lg"}
                                        color={"gray.600"}
                                    >
                                        <i class="fa-solid fa-truck"></i>
                                        {t("2-3 business days delivery.1")} 🚀
                                    </Text>
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
