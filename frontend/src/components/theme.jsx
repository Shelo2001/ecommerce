import { extendTheme } from "@chakra-ui/react";
import "@fontsource/heebo";

const theme = extendTheme({
    fonts: {
        body: `Heebo`,
        heading: `Heebo`,
    },
    config: {
        initialColorMode: "light",
        useSystemColorMode: false,
    },
});

export default theme;
