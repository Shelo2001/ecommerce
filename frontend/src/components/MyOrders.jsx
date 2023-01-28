import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React from "react";

const MyOrders = ({ name }) => {
    return (
        <div>
            <TableContainer mt={"10"}>
                <Table size="md">
                    <Thead>
                        <Tr>
                            <Th>1</Th>
                            <Th>2</Th>
                            <Th>3</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>2</Td>
                            <Td>3</Td>
                        </Tr>
                        <Tr>
                            <Td>1</Td>
                            <Td>2</Td>
                            <Td>3</Td>
                        </Tr>
                        <Tr>
                            <Td>1</Td>
                            <Td>2</Td>
                            <Td>3</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>1</Th>
                            <Th>2</Th>
                            <Th>3</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyOrders;
