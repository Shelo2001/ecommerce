import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
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
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as ReachLink } from "react-router-dom";
import Steps from "../components/Steps";
import { saveOrder, userShippingAddress } from "../features/order/orderSlice";

const PlaceOrder = () => {
    const { cart } = useSelector((state) => state.cart);

    const {
        shippingAddress,
        success,
        order: orderState,
    } = useSelector((state) => state.order);
    const { address } = shippingAddress;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("token")) == null) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        let userFromStorage = JSON.parse(localStorage.getItem("user"));
        dispatch(userShippingAddress(userFromStorage.id));
    }, []);

    const placeOrderHandler = () => {
        Swal.fire({
            title: t("Are you sure you want to place an order?.1"),
            confirmButtonText: t("Yes.1"),
            showCancelButton: true,
            confirmButtonColor: "rgb(49, 151, 149)",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                let order = {
                    products: cart,
                    user_id: address?.user.id,
                    shipping_address_id: address?.id,
                };
                dispatch(saveOrder(order));
                Swal.fire({
                    icon: "success",
                    title: t("Order placed successfully.1"),
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    useEffect(() => {
        if (success) {
            navigate(`/order/${orderState[0]?.order_id}`);
        }
    }, [orderState, success]);

    return (
        <div>
            <Container m={"auto"}>
                <Steps firstStep secondStep thirdStep />
            </Container>
            <Container mt={"10"} maxW={"full"}>
                <Flex gap={"10"}>
                    {cart.length > 0 ? (
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
                                        {cart.map((c) => (
                                            <Tr>
                                                <Td>
                                                    <Image
                                                        w={"100px"}
                                                        h={"100px"}
                                                        src={c.image}
                                                    />
                                                </Td>
                                                <Td>
                                                    <Link
                                                        as={ReachLink}
                                                        to={`/product/${c.id}`}
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

                            <Box maxW={"400px"} my={"10"}>
                                <Text fontSize={"20px"} fontWeight="bold">
                                    {t("Shipping address info.1")}
                                </Text>
                                <Text>
                                    {t("City.1")}: {address?.city}
                                </Text>
                                <Text>
                                    {t("Street.1")}: {address?.street}
                                </Text>
                                <Text>
                                    {t("Additional info.1")}:{" "}
                                    {address?.additional_info}
                                </Text>
                            </Box>

                            <Divider />

                            <Box maxW={"400px"} my={"10"}>
                                <Text fontSize={"20px"} fontWeight="bold">
                                    {t("User info.1")}
                                </Text>
                                <Text>
                                    {t("Name.1")}: {address?.user.name}
                                </Text>
                                <Text>
                                    {t("Email.1")}: {address?.user.email}
                                </Text>
                                <Text>
                                    {t("Phone number.1")}: +995{" "}
                                    {address?.user.phone_number}
                                </Text>
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
                                            {t("Items.1")}
                                        </Heading>
                                        <Text pt="2" fontSize="sm">
                                            {cart.length} {t("items in cart.1")}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading
                                            size="xs"
                                            textTransform="uppercase"
                                        >
                                            {t("Items Price.1")}
                                        </Heading>
                                        <Text pt="2" fontSize="sm">
                                            {cart
                                                .reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        item.quantity *
                                                            item.price,
                                                    0
                                                )
                                                .toFixed(2)}
                                            $
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading
                                            size="xs"
                                            textTransform="uppercase"
                                        >
                                            {t("Shipping.1")}
                                        </Heading>
                                        <Text pt="2" fontSize="sm">
                                            {cart
                                                .reduce(
                                                    (acc, item) =>
                                                        ((acc +
                                                            item.quantity *
                                                                item.price) *
                                                            3) /
                                                        100,
                                                    0
                                                )
                                                .toFixed(2)}
                                            $
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading
                                            size="xs"
                                            textTransform="uppercase"
                                        >
                                            {t("Price Summary.1")}
                                        </Heading>
                                        <Text pt="2" fontSize="sm">
                                            {Number(
                                                cart
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc +
                                                            item.quantity *
                                                                item.price,
                                                        0
                                                    )
                                                    .toFixed(2)
                                            ) +
                                                Number(
                                                    cart
                                                        .reduce(
                                                            (acc, item) =>
                                                                ((acc +
                                                                    item.quantity *
                                                                        item.price) *
                                                                    3) /
                                                                100,
                                                            0
                                                        )
                                                        .toFixed(2)
                                                )}
                                            $
                                        </Text>
                                    </Box>
                                    <Box>
                                        {cart.length > 0 ? (
                                            <Button
                                                w={"full"}
                                                onClick={placeOrderHandler}
                                                colorScheme={"teal"}
                                            >
                                                {t("Place order.1")}
                                            </Button>
                                        ) : (
                                            <Button
                                                w={"full"}
                                                isDisabled
                                                colorScheme={"teal"}
                                            >
                                                {t("Place order.1")}
                                            </Button>
                                        )}
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Box>
                </Flex>
            </Container>
        </div>
    );
};

export default PlaceOrder;
