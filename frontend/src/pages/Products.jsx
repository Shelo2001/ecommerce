import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
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
                            <>
                                <Card maxW="sm">
                                    <CardBody>
                                        <Image
                                            src={p.image}
                                            alt="Green double couch with wooden legs"
                                            boxSize="160px"
                                            borderRadius="lg"
                                        />
                                        <Stack mt="6" spacing="3">
                                            <Heading size="md">
                                                {p.title.substring(0, 30)}
                                                ...
                                            </Heading>
                                            <Text>
                                                {p.description.substring(
                                                    0,
                                                    100
                                                )}
                                                ...
                                            </Text>
                                            <Text color="teal" fontSize="2xl">
                                                ${p.price}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                    <Divider />
                                    <CardFooter>
                                        <ButtonGroup>
                                            {p.quantity > 0 ? (
                                                <Button
                                                    onClick={() =>
                                                        onClickHandler(p)
                                                    }
                                                    rightIcon={
                                                        <i class="fa-solid fa-cart-shopping"></i>
                                                    }
                                                    colorScheme="teal"
                                                    variant={"outline"}
                                                >
                                                    Add to cart
                                                </Button>
                                            ) : (
                                                <Tooltip
                                                    placement="top"
                                                    label="No items in stock yet !"
                                                >
                                                    <Button
                                                        rightIcon={
                                                            <i class="fa-solid fa-cart-shopping"></i>
                                                        }
                                                        isDisabled
                                                        variant={"teal"}
                                                    >
                                                        Add to cart
                                                    </Button>
                                                </Tooltip>
                                            )}

                                            <Link to={`/product/${p.id}`}>
                                                <Button
                                                    rightIcon={
                                                        <ChevronRightIcon />
                                                    }
                                                    colorScheme="teal"
                                                >
                                                    See details
                                                </Button>
                                            </Link>
                                        </ButtonGroup>
                                    </CardFooter>
                                </Card>
                            </>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;
