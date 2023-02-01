import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    Link,
    Box,
    Text,
    TableCaption,
    Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link as ReachLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../features/order/orderSlice";

const MyOrders = ({ name, id }) => {
    const dispatch = useDispatch();

    const { myOrders: myOrdersArray } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(myOrders(id));
    }, []);

    const clickHandler = (e) => {
        console.log(e);
    };

    return (
        <div>
            <TableContainer mt={"10"}>
                <Table size="md">
                    <TableCaption>
                        <Text autoCapitalize="true">
                            Note for customers: if you don't pay order price
                            within a 3 day or don't choose pay on delivery, the
                            order will be automatically deleted from database!{" "}
                        </Text>
                    </TableCaption>

                    <Thead>
                        <Tr>
                            <Th>{name}</Th>
                            <Th>Order id</Th>
                            <Th>Payment status</Th>
                            <Th>Payment id</Th>
                            <Th>Delivery status</Th>
                            <Th>Create date</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {myOrdersArray?.map((order) => (
                            <>
                                <Tr>
                                    <Td>{name}</Td>
                                    <Link
                                        as={ReachLink}
                                        to={`/order/${order.order_id}`}
                                    >
                                        <Td>{order.order_id}</Td>{" "}
                                    </Link>
                                    <Td>
                                        {order.is_paid ? (
                                            <Box color={"teal"}>
                                                <i class="fa-solid fa-check"></i>
                                            </Box>
                                        ) : (
                                            <Box color={"red.600"}>
                                                <i class="fa-solid fa-x"></i>
                                            </Box>
                                        )}
                                    </Td>
                                    <Td>
                                        {order.payment_id === "" ? (
                                            <Box color={"red.600"}>
                                                <i class="fa-solid fa-x"></i>
                                            </Box>
                                        ) : (
                                            order.payment_id
                                        )}
                                    </Td>
                                    <Td>
                                        {order.is_delivered ? (
                                            <Box color={"teal"}>
                                                <i class="fa-solid fa-check"></i>
                                            </Box>
                                        ) : order.pay_on_delivery ? (
                                            <Box color={"blue.600"}>
                                                Pay on delivery
                                            </Box>
                                        ) : (
                                            <Box color={"red.600"}>
                                                <i class="fa-solid fa-x"></i>
                                            </Box>
                                        )}
                                    </Td>
                                    <Td>{order.created_at.slice(0, 10)}</Td>
                                    <Td>
                                        <Button
                                            color={"white"}
                                            bg={"red.400"}
                                            _hover={{
                                                bg: "red.600",
                                            }}
                                        >
                                            Cancel order
                                        </Button>
                                    </Td>
                                </Tr>
                            </>
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>{name}</Th>
                            <Th>Order id</Th>
                            <Th>Payment status</Th>
                            <Th>Payment id</Th>
                            <Th>Delivery status</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyOrders;
