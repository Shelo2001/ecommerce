import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Stack,
    Text,
    Tooltip,
    useDisclosure,
    ModalOverlay,
    ButtonGroup,
    Select,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { allProducts, getProduct } from "../features/products/productsSlice";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Products = () => {
    const dispatch = useDispatch();
    const { products, product, loading, error } = useSelector(
        (state) => state.products
    );
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        dispatch(allProducts());
    }, []);

    const productDetailsHandler = (id) => {
        onOpen();
        dispatch(getProduct(id));
    };

    const addToCartHandler = () => {};

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
                                        <Button
                                            onClick={() =>
                                                productDetailsHandler(p.id)
                                            }
                                            rightIcon={<ChevronRightIcon />}
                                            colorScheme="teal"
                                        >
                                            See details
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Modal
                                    size="xl"
                                    isCentered
                                    isOpen={isOpen}
                                    onClose={onClose}
                                >
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>
                                            {product.title}
                                        </ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <div className="container-between">
                                                <Image
                                                    src={product.image}
                                                    alt="Green double couch with wooden legs"
                                                    boxSize="200px"
                                                    borderRadius="lg"
                                                />
                                                <Divider />
                                                <div className="container-column">
                                                    <Text>
                                                        Description:{" "}
                                                        {product.description}
                                                    </Text>
                                                    <Text>
                                                        Category:{" "}
                                                        {product.category}
                                                    </Text>
                                                    <Select
                                                        placeholder={`In Stock: ${product.quantity}`}
                                                        size="sm"
                                                        bg="gray.300"
                                                        borderColor="gray.300"
                                                        color="black"
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.quantity
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                defaultValue={x}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Select>
                                                    <Text
                                                        color="blue.600"
                                                        fontSize="2xl"
                                                    >
                                                        ${product.price}
                                                    </Text>
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <ButtonGroup>
                                                <Button
                                                    bg="red.500"
                                                    _hover={{ bg: "red.600" }}
                                                    color="white"
                                                    onClick={onClose}
                                                >
                                                    Close
                                                </Button>
                                                {product.quantity == 0 ? (
                                                    <Tooltip
                                                        label="No items in stock yet"
                                                        placement="top"
                                                    >
                                                        <Button
                                                            isDisabled="true"
                                                            colorScheme="teal"
                                                        >
                                                            Add To Cart
                                                        </Button>
                                                    </Tooltip>
                                                ) : (
                                                    <Button
                                                        onClick={
                                                            addToCartHandler
                                                        }
                                                        colorScheme="teal"
                                                    >
                                                        Add To Cart
                                                    </Button>
                                                )}
                                            </ButtonGroup>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;
