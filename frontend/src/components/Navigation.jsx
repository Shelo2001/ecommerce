import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Profile from "./Profile";
import { useParams } from "react-router";
import MyOrders from "./MyOrders";
import { useTranslation } from "react-i18next";

const Navigation = () => {
    const { id, name } = useParams();
    const { t } = useTranslation();

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
                    {t("Profile.1")}
                </Tab>
                <Tab fontSize={"2xl"} fontWeight="bold">
                    {t("My orders.1")}
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
