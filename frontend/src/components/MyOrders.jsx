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
    Alert,
    AlertIcon,
    Tooltip,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    ButtonGroup,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link as ReachLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteMyOrders,
    generateInvoice,
    myOrders,
} from "../features/order/orderSlice";

const MyOrders = ({ name, id }) => {
    const dispatch = useDispatch();

    const { myOrders: myOrdersArray } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(myOrders(id));
    }, []);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const deleteOrderHandler = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete an order?",
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "rgb(49, 151, 149)",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteMyOrders(id));
                Swal.fire({
                    icon: "success",
                    title: "Order deleted successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    const doubleClickHandler = (id) => {
        console.log(id);
        onOpen();
    };

    const generateInvoiceHandler = (orderid) => {
        console.log(id);
        generateInvoice(orderid);
    };

    return (
        <div>
            {myOrdersArray.length === 0 ? (
                <Alert status="info">
                    <AlertIcon />
                    You dont have any orders yet.
                </Alert>
            ) : (
                <TableContainer mt={"10"}>
                    <Table size="md" w={{ sm: "full" }}>
                        <TableCaption>
                            <Text autoCapitalize="true">
                                Note for customers: if you don't pay order price
                                within a 3 day or don't choose pay on delivery,
                                the order will be automatically deleted from
                                database after 3 days!{" "}
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
                                    <Tooltip
                                        placement="left"
                                        label="double click to see info"
                                    >
                                        <Tr
                                            _hover={{
                                                bg: "gray.100",
                                            }}
                                            onDoubleClick={() =>
                                                doubleClickHandler(
                                                    order.order_id
                                                )
                                            }
                                        >
                                            <Td>{name}</Td>
                                            <Td color={"teal"}>
                                                <Link
                                                    as={ReachLink}
                                                    to={`/order/${order.order_id}`}
                                                >
                                                    {order.order_id}
                                                </Link>
                                            </Td>
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
                                            <Td>
                                                {order.created_at.slice(0, 10)}
                                            </Td>
                                            <Td>
                                                {order.is_paid ? (
                                                    <Button
                                                        colorScheme={"teal"}
                                                        onClick={() =>
                                                            (window.location.href =
                                                                import.meta.env
                                                                    .VITE_BASE_API_URL +
                                                                "/order/myorders/generateinvoice/" +
                                                                order.order_id)
                                                        }
                                                    >
                                                        Generate Invoice
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() =>
                                                            deleteOrderHandler(
                                                                order.order_id
                                                            )
                                                        }
                                                        color={"white"}
                                                        bg={"red.400"}
                                                        _hover={{
                                                            bg: "red.600",
                                                        }}
                                                    >
                                                        Cancel order
                                                    </Button>
                                                )}
                                            </Td>
                                        </Tr>
                                    </Tooltip>
                                </>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>
                            asdsadsdsdsadsdadasdasasdsadsdsdsadsdadasdasasdsadsdsdsadsdadasdasasdsadsdsdsadsdadasdas
                        </p>
                    </ModalBody>

                    <ModalFooter>
                        <ButtonGroup>
                            <Button
                                colorScheme="red"
                                color={"white"}
                                mr={3}
                                onClick={onClose}
                            >
                                Close
                            </Button>
                            <Button colorScheme="teal">Secondary Action</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default MyOrders;
