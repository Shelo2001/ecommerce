import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link as ReachLink } from "react-router-dom";

const Steps = ({ firstStep, secondStep, thirdStep }) => {
    const { t } = useTranslation();
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
                            <i class="fa-solid fa-cart-shopping"></i>{" "}
                            {t("Review Cart.1")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ) : (
                    <BreadcrumbItem color={"gray"}>
                        <p>
                            <i class="fa-solid fa-cart-shopping"></i>{" "}
                            {t("Review Cart.1")}
                        </p>
                    </BreadcrumbItem>
                )}

                {secondStep ? (
                    <BreadcrumbItem color={"teal"}>
                        <BreadcrumbLink as={ReachLink} to="/shipping">
                            <i class="fa-solid fa-truck-fast"></i>{" "}
                            {t("Shipping Address.1")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ) : (
                    <BreadcrumbItem color={"gray"}>
                        <p>
                            <i class="fa-solid fa-truck-fast"></i>{" "}
                            {t("Shipping Address.1")}
                        </p>
                    </BreadcrumbItem>
                )}

                {thirdStep ? (
                    <BreadcrumbItem color={"teal"} isCurrentPage>
                        <BreadcrumbLink as={ReachLink} to="/placeorder">
                            <i class="fa-solid fa-check"></i> {t("Order.1")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ) : (
                    <BreadcrumbItem color={"gray"} isCurrentPage>
                        <p>
                            <i class="fa-solid fa-check"></i> {t("Order.1")}
                        </p>
                    </BreadcrumbItem>
                )}
            </Breadcrumb>
        </div>
    );
};

export default Steps;
