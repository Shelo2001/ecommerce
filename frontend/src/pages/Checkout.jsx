import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
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

const Checkout = () => {
    const { cart } = useSelector((state) => state.cart);

    const navigate = useNavigate();

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("token")) == null) {
            navigate("/login");
        }
    }, []);

    const dispatch = useDispatch();

    const decreaseQuantityHandler = (id) => {
        dispatch(decrementQuantity(id));
    };
    const increaseQuantityHandler = (id) => {
        dispatch(incrementQuantity(id));
    };
    const removeFromCartHandler = (item) => {
        dispatch(removeItem(item));
    };
    const navigateToShipping = () => {
        navigate("/shipping");
    };

    return (
        <div>
            <Container m={"auto"}>
                <Steps firstStep />
            </Container>
            <Container mt={"10"} maxW={"full"}>
                <Flex gap={"10"}>
                    {cart.length > 0 ? (
                        <Box flex={3}>
                            <TableContainer>
                                <Table variant="simple">
                                    <TableCaption>
                                        Shopping Cart Review
                                    </TableCaption>
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
                                                    <Stack
                                                        spacing={0}
                                                        gap={5}
                                                        display={"flex"}
                                                        flexDirection="row"
                                                        alignItems="center"
                                                    >
                                                        <Button
                                                            onClick={() =>
                                                                decreaseQuantityHandler(
                                                                    c.id
                                                                )
                                                            }
                                                            colorScheme={"teal"}
                                                            size={"sm"}
                                                        >
                                                            -
                                                        </Button>
                                                        <Text
                                                            mx="auto"
                                                            fontSize={16}
                                                            textAlign={"center"}
                                                        >
                                                            {c.quantity}
                                                        </Text>
                                                        <Button
                                                            onClick={() =>
                                                                increaseQuantityHandler(
                                                                    c.id
                                                                )
                                                            }
                                                            colorScheme={"teal"}
                                                            size={"sm"}
                                                        >
                                                            +
                                                        </Button>
                                                    </Stack>
                                                </Td>
                                                <Td>${c.price * c.quantity}</Td>
                                                <Td>
                                                    <Button
                                                        ml={"52"}
                                                        onClick={() =>
                                                            removeFromCartHandler(
                                                                c
                                                            )
                                                        }
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
                                <Heading size="md">Cart Summary</Heading>
                            </CardHeader>

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
                                                onClick={navigateToShipping}
                                                colorScheme={"teal"}
                                            >
                                                Proceed to checkout
                                            </Button>
                                        ) : (
                                            <Button
                                                isDisabled
                                                colorScheme={"teal"}
                                            >
                                                Proceed to checkout
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

export default Checkout;
