import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProduct } from "../features/products/productsSlice";
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
    Tooltip,
} from "@chakra-ui/react";
import Cart from "../components/Cart";
import { addToCart } from "../features/cart/cartSlice";
import Spinner from "../components/Spinner";
const Product = () => {
    const dispatch = useDispatch();
    const { product, loading } = useSelector((state) => state.products);
    const { id } = useParams();
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
    useEffect(() => {
        dispatch(getProduct(id));
    }, []);

    const onClickHandler = () => {
        const newProduct = { ...product, quantity: 1 };
        dispatch(addToCart(newProduct));
        Swal.fire({
            icon: "success",
            title: "Product added in cart",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div>
            <Tooltip label="Copy URL">
                <Button
                    margin={"10"}
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setShareLinkCopied(true);
                        setTimeout(() => {
                            setShareLinkCopied(false);
                        }, 2000);
                    }}
                >
                    <i class="fa-solid fa-share-nodes"></i>
                </Button>
            </Tooltip>
            {loading ? (
                <Spinner />
            ) : (
                <Container maxW={"7xl"}>
                    <SimpleGrid
                        columns={{ base: 1, lg: 2 }}
                        spacing={{ base: 8, md: 10 }}
                        py={{ base: 18, md: 24 }}
                    >
                        <Flex>
                            <Image
                                rounded={"md"}
                                alt={"product image"}
                                src={product.image}
                                align={"center"}
                                w={"100%"}
                                h={{ base: "100%", sm: "400px", lg: "500px" }}
                            />
                        </Flex>
                        <Stack spacing={{ base: 6, md: 10 }}>
                            <Box as={"header"}>
                                <Heading
                                    lineHeight={1.1}
                                    fontWeight={600}
                                    fontSize={{
                                        base: "2xl",
                                        sm: "4xl",
                                        lg: "5xl",
                                    }}
                                >
                                    {product.title}
                                </Heading>
                                <Text
                                    color={useColorModeValue(
                                        "gray.900",
                                        "gray.400"
                                    )}
                                    fontWeight={300}
                                    fontSize={"2xl"}
                                >
                                    ${product.price} USD
                                </Text>
                            </Box>

                            <Stack
                                spacing={{ base: 4, sm: 6 }}
                                direction={"column"}
                                divider={
                                    <StackDivider
                                        borderColor={useColorModeValue(
                                            "gray.200",
                                            "gray.600"
                                        )}
                                    />
                                }
                            >
                                <VStack spacing={{ base: 4, sm: 6 }}>
                                    <Text
                                        color={useColorModeValue(
                                            "gray.500",
                                            "gray.400"
                                        )}
                                        fontSize={"2xl"}
                                        fontWeight={"300"}
                                    >
                                        {product.description}
                                    </Text>
                                    <Text fontSize={"lg"}>
                                        {product.description}
                                    </Text>
                                </VStack>
                                <Box>
                                    <Text
                                        fontSize={{ base: "16px", lg: "18px" }}
                                        color={useColorModeValue(
                                            "teal.500",
                                            "teal.300"
                                        )}
                                        fontWeight={"500"}
                                        textTransform={"uppercase"}
                                        mb={"4"}
                                    >
                                        Features
                                    </Text>

                                    <SimpleGrid
                                        columns={{ base: 1, md: 2 }}
                                        spacing={10}
                                    >
                                        <List spacing={2}>
                                            <ListItem>Chronograph</ListItem>
                                            <ListItem>
                                                Master Chronometer Certified
                                            </ListItem>{" "}
                                            <ListItem>Tachymeter</ListItem>
                                        </List>
                                        <List spacing={2}>
                                            <ListItem>Anti‑magnetic</ListItem>
                                            <ListItem>Chronometer</ListItem>
                                            <ListItem>Small seconds</ListItem>
                                        </List>
                                    </SimpleGrid>
                                </Box>
                            </Stack>

                            {product.quantity > 0 ? (
                                <Button
                                    rounded={"none"}
                                    w={"full"}
                                    mt={8}
                                    size={"lg"}
                                    py={"7"}
                                    bg={useColorModeValue(
                                        "teal.500",
                                        "teal.500"
                                    )}
                                    color={useColorModeValue(
                                        "white",
                                        "teal.900"
                                    )}
                                    textTransform={"uppercase"}
                                    _hover={{
                                        transform: "translateY(2px)",
                                        boxShadow: "lg",
                                    }}
                                    onClick={onClickHandler}
                                >
                                    Add to cart
                                </Button>
                            ) : (
                                <Tooltip
                                    placement="top"
                                    label="No items in stock yet !"
                                >
                                    <Button
                                        rounded={"none"}
                                        w={"full"}
                                        mt={8}
                                        size={"lg"}
                                        isDisabled
                                        py={"7"}
                                        cursor={"auto"}
                                        disabled={"true"}
                                        color={useColorModeValue(
                                            "gray.900",
                                            "gray.900"
                                        )}
                                        textTransform={"uppercase"}
                                    >
                                        Add to cart
                                    </Button>
                                </Tooltip>
                            )}

                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent={"center"}
                            >
                                <Text>
                                    <i class="fa-solid fa-truck"></i> 2-3
                                    business days delivery
                                </Text>
                            </Stack>
                        </Stack>
                    </SimpleGrid>
                </Container>
            )}
        </div>
    );
};

export default Product;
