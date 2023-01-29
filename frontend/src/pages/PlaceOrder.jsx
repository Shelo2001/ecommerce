import { Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Steps from "../components/Steps";

const PlaceOrder = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("token")) == null) {
            navigate("/login");
        }
    }, []);
    return (
        <div>
            <Container m={"auto"}>
                <Steps firstStep secondStep thirdStep />
            </Container>
            <p>PlaceOrder</p>
        </div>
    );
};

export default PlaceOrder;
