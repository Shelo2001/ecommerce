import React from "react";
import {
    Box,
    Button,
    Container,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

const Footer = () => {
    return (
        <div>
            <Box
                mt={"50px"}
                bg={useColorModeValue("gray.50", "gray.900")}
                color={useColorModeValue("gray.700", "gray.200")}
            >
                <Container
                    as={Stack}
                    maxW={"6xl"}
                    py={4}
                    direction={{ base: "column", md: "row" }}
                    spacing={4}
                    justify={{ base: "center", md: "space-between" }}
                    align={{ base: "center", md: "center" }}
                >
                    <Text>© {new Date().getFullYear()} Store.</Text>
                    <Stack direction={"row"} spacing={6}>
                        <a href="linkedin.com">
                            <Button label={"YouTube"} href={"#"}>
                                <i class="fa-brands fa-linkedin"></i>
                            </Button>
                        </a>
                        <a href="https://github.com/Shelo2001?tab=repositories">
                            <Button label={"Instagram"} href={"#"}>
                                <i class="fa-brands fa-github"></i>
                            </Button>
                        </a>
                    </Stack>
                </Container>
            </Box>
        </div>
    );
};

export default Footer;
