import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProduct } from "../features/products/productsSlice";
import Spinner from "../components/Spinner";
import {
    Button,
    ButtonGroup,
    Divider,
    Flex,
    Image,
    Select,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Cart from "../components/Cart";
import { addToCart } from "../features/cart/cartSlice";
import { set } from "lodash";

const Product = () => {
    const dispatch = useDispatch();
    const { product, loading } = useSelector((state) => state.products);
    const { id } = useParams();

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(getProduct(id));
    }, []);

    const onClickHandler = () => {
        const newProduct = { ...product, quantity };
        dispatch(addToCart(newProduct));
    };

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className="container-equal">
                    <div className="left">
                        <Image boxSize="500px" src={product.image} />
                    </div>
                    <div className="right">
                        <Text fontSize={"4xl"} color={"gray.700"}>
                            {product.title}
                        </Text>
                        <Divider />
                        <Text color={"gray.500"}>
                            Description: {product.description}
                        </Text>
                        <Text color={"gray.500"}>
                            Category: {product.category}
                        </Text>
                        <Select
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder={`${product.quantity} item in stock`}
                        >
                            {[...Array(product.quantity).keys()].map((x) => (
                                <option defaultValue={x}>{x + 1}</option>
                            ))}
                        </Select>
                        <Text color="teal.600" fontSize="2xl">
                            Price: ${product.price}
                        </Text>
                        <Divider />
                        <Flex align="center" justify="space-between">
                            <Button color={"black"} variant="link">
                                {" "}
                                <Link to="/">Go back</Link>
                            </Button>
                            {product.quantity > 0 ? (
                                <Button
                                    onClick={onClickHandler}
                                    colorScheme="teal"
                                >
                                    Add to cart
                                </Button>
                            ) : (
                                <Tooltip
                                    placement="top"
                                    label="No items in stock!"
                                >
                                    <Button
                                        onClick={onClickHandler}
                                        colorScheme="teal"
                                        isDisabled
                                    >
                                        Add to cart
                                    </Button>
                                </Tooltip>
                            )}
                        </Flex>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
