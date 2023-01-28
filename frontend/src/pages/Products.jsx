import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { allProducts } from "../features/products/productsSlice";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(allProducts());
    }, []);

    return (
        <div className="container-products">
            <Box
                m={"auto"}
                borderBottom={"2px"}
                borderColor="teal"
                borderRadius={"md"}
                py={"10"}
                w="60%"
                p={4}
                color="white"
            >
                <ImageSlider slides={products} />
            </Box>
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
                                        <Link to={`/product/${p.id}`}>
                                            <Button
                                                rightIcon={<ChevronRightIcon />}
                                                colorScheme="teal"
                                            >
                                                See details
                                            </Button>
                                        </Link>
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
