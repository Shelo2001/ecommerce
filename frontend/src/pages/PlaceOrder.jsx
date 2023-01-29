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
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as ReachLink } from "react-router-dom";
import Steps from "../components/Steps";
import {
    decrementQuantity,
    incrementQuantity,
    removeItem,
} from "../features/cart/cartSlice";
import { userShippingAddress } from "../features/order/orderSlice";

const PlaceOrder = () => {
    const { cart } = useSelector((state) => state.cart);

    const { shippingAddress } = useSelector((state) => state.order);
    const { address } = shippingAddress;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(shippingAddress);

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
            title: "Are you sure you want to place an order?",
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "rgb(49, 151, 149)",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "Order placed successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

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
                                            <Th>Item</Th>
                                            <Th>Quantity</Th>
                                            <Th>Price</Th>
                                            <Th></Th>
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
                                                            {c.quantity} item
                                                        </Text>
                                                    </Stack>
                                                </Td>
                                                <Td>${c.price * c.quantity}</Td>
                                                <Td>
                                                    <Button
                                                        ml={"52"}
                                                        color={"white"}
                                                        bg={"red.400"}
                                                        _hover={{
                                                            bg: "red.600",
                                                        }}
                                                    >
                                                        <i class="fa-solid fa-trash"></i>
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>

                            <Divider />

                            <Box maxW={"400px"} my={"10"}>
                                <Text fontSize={"20px"} fontWeight="bold">
                                    Shipping address info
                                </Text>
                                <Text>City: {address?.city}</Text>
                                <Text>Street: {address?.street}</Text>
                                <Text>
                                    Additional info: {address?.additional_info}
                                </Text>
                            </Box>

                            <Divider />

                            <Box maxW={"400px"} my={"10"}>
                                <Text fontSize={"20px"} fontWeight="bold">
                                    User info
                                </Text>
                                <Text>Name: {address?.user.name}</Text>
                                <Text>Email: {address?.user.email}</Text>
                                <Text>
                                    Phone number: +995{" "}
                                    {address?.user.phone_number}
                                </Text>
                            </Box>
                        </Box>
                    ) : (
                        <Alert status="info">
                            <AlertIcon />
                            No items in cart.{" "}
                            <Link as={ReachLink} colorScheme={"teal"} to="/">
                                Go back to shopping
                            </Link>
                        </Alert>
                    )}
                    <Box flex={1}>
                        <Card>
                            <CardHeader>
                                <Heading size="md">Order Summary</Heading>
                            </CardHeader>

                            <Divider />

                            <CardBody>
                                <Stack divider={<StackDivider />} spacing="4">
                                    <Box>
                                        <Heading
                                            size="xs"
                                            textTransform="uppercase"
                                        >
                                            Items
                                        </Heading>
                                        <Text pt="2" fontSize="sm">
                                            Overall {cart.length} items in cart
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading
                                            size="xs"
                                            textTransform="uppercase"
                                        >
                                            Items Price
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
                                            Shipping
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
                                            Price Summary
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
                                                onClick={placeOrderHandler}
                                                colorScheme={"teal"}
                                            >
                                                Place order
                                            </Button>
                                        ) : (
                                            <Button
                                                isDisabled
                                                colorScheme={"teal"}
                                            >
                                                Place order
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
