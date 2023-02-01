import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    Tooltip,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { allProducts } from "../features/products/productsSlice";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(allProducts());
    }, []);

    const onClickHandler = (product) => {
        const newProduct = { ...product, quantity: 1 };
        dispatch(addToCart(newProduct));
        Swal.fire({
            icon: "success",
            title: "Product added in cart",
            showConfirmButton: false,
            timer: 1000,
        });
    };

    return (
        <div className="container-products">
            <div className="container-start">
                {error && <div>{error}</div>}
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        {products.map((p) => (
                            <Tooltip label="Details" placement="top">
                                <Box
                                    _hover={{
                                        transform: "scale(1.05)",
                                        transition: "1s",
                                        zIndex: "1",
                                    }}
                                    bg={useColorModeValue("white", "gray.800")}
                                    maxW="sm"
                                    borderWidth="1px"
                                    rounded="lg"
                                    shadow="lg"
                                    position="relative"
                                >
                                    <Link to={`/product/${p.id}`}>
                                        <Image
                                            src={p.image}
                                            alt={`Picture of ${p.name}`}
                                            roundedTop="lg"
                                        />
                                    </Link>
                                    <Box p="6">
                                        <Box d="flex" alignItems="baseline">
                                            {p.created_at && (
                                                <Badge
                                                    rounded="full"
                                                    px="2"
                                                    fontSize="0.8em"
                                                    colorScheme="red"
                                                >
                                                    New
                                                </Badge>
                                            )}
                                        </Box>
                                        <Flex
                                            mt="1"
                                            justifyContent="space-between"
                                            alignContent="center"
                                        >
                                            <Link to={`/product/${p.id}`}>
                                                <Box
                                                    fontSize="md"
                                                    fontWeight="semibold"
                                                    as="h4"
                                                    lineHeight="tight"
                                                    isTruncated
                                                >
                                                    {p.title}
                                                </Box>
                                            </Link>
                                            {p.quantity > 0 ? (
                                                <Tooltip
                                                    label="Add to cart"
                                                    placement={"top"}
                                                    fontSize={"1.2em"}
                                                >
                                                    <Button
                                                        _hover={{
                                                            backgroundColor:
                                                                "transparent",
                                                            border: "1px solid black",
                                                            transition: ".5s",
                                                        }}
                                                        bg={"transparent"}
                                                        border="1px solid transparent"
                                                        onClick={() =>
                                                            onClickHandler(p)
                                                        }
                                                    >
                                                        <i className="fa-solid fa-shopping-cart"></i>
                                                    </Button>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip
                                                    label="No items in cart"
                                                    placement={"top"}
                                                    fontSize={"1.2em"}
                                                >
                                                    <Button
                                                        isDisabled
                                                        _hover={{
                                                            backgroundColor:
                                                                "transparent",
                                                            border: "1px solid black",
                                                            transition: ".5s",
                                                        }}
                                                        bg={"transparent"}
                                                        border="1px solid transparent"
                                                        onClick={() =>
                                                            onClickHandler(p)
                                                        }
                                                    >
                                                        <i className="fa-solid fa-shopping-cart"></i>
                                                    </Button>
                                                </Tooltip>
                                            )}
                                        </Flex>

                                        <Flex
                                            justifyContent="space-between"
                                            alignContent="center"
                                        >
                                            <Box
                                                fontSize="2xl"
                                                color={useColorModeValue(
                                                    "gray.800",
                                                    "white"
                                                )}
                                            >
                                                <Box
                                                    as="span"
                                                    color={"gray.600"}
                                                    fontSize="lg"
                                                >
                                                    $
                                                </Box>
                                                {p.price.toFixed(2)}
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Box>
                            </Tooltip>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;
