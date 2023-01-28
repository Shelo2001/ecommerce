import {
    Alert,
    AlertIcon,
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    Image,
    Spacer,
    Stack,
    Text,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    decrementQuantity,
    incrementQuantity,
    removeItem,
} from "../features/cart/cartSlice";

const Cart = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { cart } = useSelector((state) => state.cart);
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

    return (
        <>
            <Button
                className="cart-container"
                color="black"
                variant="outline"
                onClick={onOpen}
            >
                <i className="fa-solid fa-lg fa-cart-shopping"></i>
                <p className="cart-length">{cart ? cart.length : 0}</p>
            </Button>
            <Drawer
                size="lg"
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent overflow="scroll">
                    <DrawerCloseButton />
                    <DrawerHeader>Shopping Cart</DrawerHeader>

                    <DrawerBody
                        display={"flex"}
                        flexDirection={"column"}
                        gap={"20px"}
                    >
                        {cart.length > 0 ? (
                            <>
                                {cart.map((item) => (
                                    <Card
                                        maxW={"fit-content"}
                                        direction={{
                                            base: "column",
                                            sm: "row",
                                        }}
                                        maxH="160px"
                                        overflow="hidden"
                                        variant="outline"
                                    >
                                        <Image
                                            objectFit="cover"
                                            boxSize="160px"
                                            src={item.image}
                                            alt="Caffe Latte"
                                        />

                                        <Stack>
                                            <CardBody>
                                                <Flex justify={"space-between"}>
                                                    <Tooltip
                                                        placement="top"
                                                        label={`${item.title}`}
                                                    >
                                                        <Heading size="sm">
                                                            {item.title.substring(
                                                                0,
                                                                30
                                                            )}
                                                            ...
                                                        </Heading>
                                                    </Tooltip>
                                                    <Spacer />
                                                    <Button
                                                        ml={"52"}
                                                        onClick={() =>
                                                            removeFromCartHandler(
                                                                item
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
                                                </Flex>
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
                                                                item.id
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
                                                        {item.quantity}
                                                    </Text>
                                                    <Button
                                                        onClick={() =>
                                                            increaseQuantityHandler(
                                                                item.id
                                                            )
                                                        }
                                                        colorScheme={"teal"}
                                                        size={"sm"}
                                                    >
                                                        +
                                                    </Button>
                                                </Stack>
                                            </CardBody>

                                            <CardFooter></CardFooter>
                                        </Stack>
                                    </Card>
                                ))}
                            </>
                        ) : (
                            <Alert status="info">
                                <AlertIcon />
                                No Items In Cart Yet !
                            </Alert>
                        )}
                    </DrawerBody>
                    <DrawerFooter>
                        <Text fontSize={32} fontWeight={"extrabold"}>
                            Summary: $
                            {cart
                                .reduce(
                                    (acc, item) =>
                                        acc +
                                        Number(item.quantity) * item.price,
                                    0
                                )
                                .toFixed(2)}
                        </Text>
                    </DrawerFooter>
                    <Divider />
                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        {cart.length > 0 ? (
                            <Link to="/checkout">
                                <Button onClick={onClose} colorScheme="teal">
                                    Checkout
                                </Button>
                            </Link>
                        ) : (
                            <Tooltip
                                placement="top"
                                label="Cannot proceed to checkout"
                            >
                                <Button isDisabled colorScheme="teal">
                                    Checkout
                                </Button>
                            </Tooltip>
                        )}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Cart;
