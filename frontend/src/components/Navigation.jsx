import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Profile from "./Profile";
import { useParams } from "react-router";
import MyOrders from "./MyOrders";

const Navigation = () => {
    const { id, name } = useParams();

    return (
        <Tabs
            colorScheme={"blackAlpha"}
            mt={"10"}
            px={"40"}
            isFitted
            variant="soft-rounded"
        >
            <TabList>
                <Tab fontSize={"2xl"} fontWeight="bold">
                    Profile
                </Tab>
                <Tab fontSize={"2xl"} fontWeight="bold">
                    My orders
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Profile name={name} id={id} />
                </TabPanel>
                <TabPanel>
                    <MyOrders name={name} id={id} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default Navigation;
