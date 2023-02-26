import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams, Link as ReachLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getOrderById,
    payOrder,
    updateOrderPayOnDelivery,
} from "../features/order/orderSlice";
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Code,
    Container,
    Divider,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    StackDivider,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { getPlacedProduct } from "../features/products/productsSlice";

const PlacedOrder = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { placedOrder, paymentSuccess } = useSelector((state) => state.order);
    const { placedProducts } = useSelector((state) => state.products);
    const { t } = useTranslation();
    const totalPrice =
        Number(
            placedOrder
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)
        ) +
        Number(
            placedOrder
                .reduce(
                    (acc, item) =>
                        ((acc + item.quantity * item.price) * 3) / 100,
                    0
                )
                .toFixed(2)
        );

    useEffect(() => {
        dispatch(getOrderById(id));
    }, []);

    useEffect(() => {
        placedOrder.forEach((element) => {
            dispatch(getPlacedProduct(element.product_id));
        });
    }, [placedOrder, dispatch]);

    // Paypal integration
    const PayPalButton = window.paypal.Buttons.driver("react", {
        React,
        ReactDOM,
    });
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalPrice,
                    },
                },
            ],
        });
    };
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            console.log(details);
            let paymentData = {
                payment_id: details.id,
                payment_status: details.status,
                order_id: placedOrder[0]?.order_id,
            };
            dispatch(payOrder(paymentData));
        });
    };
    // End paypal integration

    const updatePayOnDeliveryHandler = (id) => {
        Swal.fire({
            title: t("Are you sure you want to pay on delivery?.1"),
            confirmButtonText: t("Yes.1"),
            showCancelButton: true,
            confirmButtonColor: "rgb(49, 151, 149)",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(updateOrderPayOnDelivery(id));
                window.location.reload();
            }
        });
    };

    useEffect(() => {
        if (paymentSuccess) {
            window.location.reload();
        }
    }, [paymentSuccess]);

    return (
        <div>
            <Container mt={"10"} maxW={"full"}>
                <Flex gap={"10"}>
                    {placedOrder?.length > 0 ? (
                        <Box flex={3}>
                            <TableContainer>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th></Th>
                                            <Th>{t("Item.1")}</Th>
                                            <Th>{t("Quantity.1")}</Th>
                                            <Th>{t("Price.1")}</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {placedOrder.map((c, index) => (
                                            <Tr>
                                                <Td>
                                                    <Image
                                                        w={"100px"}
                                                        h={"100px"}
                                                        src={
                                                            placedProducts[
                                                                index
                                                            ]?.image
                                                        }
                                                    />
                                                </Td>
                                                <Td>
                                                    <Link
                                                        as={ReachLink}
                                                        to={`/product/${c.product_id}`}
                                                    >
                                                        {c.title}
                                                    </Link>
                                                </Td>
                                                <Td>
                                                    <Stack>
                                                        <Text fontSize={16}>
                                                            {c.quantity}{" "}
                                                            {t("item.1")}
                                                        </Text>
                                                    </Stack>
                                                </Td>
                                                <Td>${c.price * c.quantity}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>

                            <Divider />

                            <Box maxW={"full"}>
                                <Text
                                    py={"5"}
                                    fontSize={"20px"}
                                    fontWeight="bold"
                                >
                                    {t("Payment status.1")}
                                </Text>
                                {placedOrder[0].is_paid ? (
                                    <Alert status="success">
                                        <AlertIcon />
                                        {t("Order price is paid.1")} !!!
                                    </Alert>
                                ) : (
                                    <Alert status="error">
                                        <AlertIcon />
                                        {t("Order is not paid yet.1")} !!!
                                    </Alert>
                                )}
                            </Box>

                            <Divider />

                            {placedOrder[0].pay_on_delivery ? (
                                <Box maxW={"full"}>
                                    <Text
                                        py={"5"}
                                        fontSize={"20px"}
                                        fontWeight="bold"
                                    >
                                        {t("Delivery information.1")}
                                    </Text>
                                    <Alert status="info">
                                        <AlertIcon />
                                        {t(
                                            "You chose pay on delivery, our courier will contact you within a week.1"
                                        )}{" "}
                                        !!!
                                    </Alert>
                                </Box>
                            ) : (
                                <></>
                            )}

                            <Divider />

                            <Box maxW={"full"}>
                                <Text
                                    py={"5"}
                                    fontSize={"20px"}
                                    fontWeight="bold"
                                >
                                    {t("Delivery status.1")}
                                </Text>
                                {placedOrder[0].is_delivered ? (
                                    <Alert status="success">
                                        <AlertIcon />
                                        {t("Order is delivered.1")} !!!
                                    </Alert>
                                ) : (
                                    <Alert status="error">
                                        <AlertIcon />
                                        {t("Order is not delivered yet.1")} !!!
                                    </Alert>
                                )}
                            </Box>
                        </Box>
                    ) : (
                        <Alert status="info">
                            <AlertIcon />
                            {t("No items in cart.1")}.{" "}
                            <Link as={ReachLink} colorScheme={"teal"} to="/">
                                {t("Go back to shopping.1")}
                            </Link>
                        </Alert>
                    )}
                    <Box flex={1}>
                        <Card>
                            <CardHeader>
                                <Heading size="md">
                                    {t("Order Summary.1")}
                                </Heading>
                            </CardHeader>

                            <Divider />

                            <CardBody>
                                <Stack divider={<StackDivider />} spacing="4">
                                    <Box>
                                        <Heading
                                            size="xs"
                                            textTransform="uppercase"
                                        >
                                            {t(
                                                "Price Summary (including shipping).1"
                                            )}
                                        </Heading>
                                        <Text pt="2" fontSize="sm">
                                            ${totalPrice}
                                        </Text>
                                    </Box>
                                    {placedOrder[0]?.is_paid ||
                                    placedOrder[0]?.pay_on_delivery ? (
                                        <></>
                                    ) : (
                                        <Box>
                                            <PayPalButton
                                                createOrder={(data, actions) =>
                                                    createOrder(data, actions)
                                                }
                                                onApprove={(data, actions) =>
                                                    onApprove(data, actions)
                                                }
                                            />
                                            <Box
                                                display={"flex"}
                                                flexDirection={"column"}
                                            >
                                                <Code>
                                                    Paypal sample user(completly
                                                    free)
                                                </Code>
                                                <Code>
                                                    Email:
                                                    sb-1yabz14480910@personal.example.com
                                                </Code>
                                                <Code>Password: asdasd123</Code>
                                            </Box>
                                            <Flex align="center" mb={"5"}>
                                                <Divider />
                                                <Text padding="2">or</Text>
                                                <Divider />
                                            </Flex>
                                            <Button
                                                onClick={() =>
                                                    updatePayOnDeliveryHandler(
                                                        placedOrder[0]?.order_id
                                                    )
                                                }
                                                colorScheme={"teal"}
                                                w="full"
                                            >
                                                {t("Pay on delivery.1")}
                                            </Button>
                                        </Box>
                                    )}
                                </Stack>
                            </CardBody>
                        </Card>
                    </Box>
                </Flex>
            </Container>
        </div>
    );
};

export default PlacedOrder;
