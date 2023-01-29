import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import { Link as ReachLink } from "react-router-dom";

const Steps = ({ firstStep, secondStep, thirdStep }) => {
    return (
        <div>
            <Breadcrumb
                fontSize={"md"}
                textAlign={"center"}
                fontWeight={"bold"}
            >
                {firstStep ? (
                    <BreadcrumbItem color={"teal"}>
                        <BreadcrumbLink as={ReachLink} to="/checkout">
                            <i class="fa-solid fa-cart-shopping"></i> Review
                            Cart
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ) : (
                    <BreadcrumbItem color={"gray"}>
                        <p>
                            <i class="fa-solid fa-cart-shopping"></i> Review
                            Cart
                        </p>
                    </BreadcrumbItem>
                )}

                {secondStep ? (
                    <BreadcrumbItem color={"teal"}>
                        <BreadcrumbLink as={ReachLink} to="/shipping">
                            <i class="fa-solid fa-truck-fast"></i> Shipping
                            Address
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ) : (
                    <BreadcrumbItem color={"gray"}>
                        <p>
                            <i class="fa-solid fa-truck-fast"></i> Shipping
                            Address
                        </p>
                    </BreadcrumbItem>
                )}

                {thirdStep ? (
                    <BreadcrumbItem color={"teal"} isCurrentPage>
                        <BreadcrumbLink as={ReachLink} to="/placeorder">
                            <i class="fa-solid fa-check"></i> Order
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ) : (
                    <BreadcrumbItem color={"gray"} isCurrentPage>
                        <p>
                            <i class="fa-solid fa-check"></i> Order
                        </p>
                    </BreadcrumbItem>
                )}
            </Breadcrumb>
        </div>
    );
};

export default Steps;
