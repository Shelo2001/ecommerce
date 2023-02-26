import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./components/theme";
import { Provider } from "react-redux";
import store from "./store";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import i18next from "./i18next";

window.Swal = Swal;
const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});
window.toast = toast;

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <Suspense fallback={<div>Loading...</div>}>
                <App />
            </Suspense>
        </ChakraProvider>
    </Provider>
);
