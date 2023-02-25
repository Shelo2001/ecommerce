import React, { useEffect } from "react";

const RouterChat = () => {
    useEffect(() => {
        var Tawk_API = Tawk_API || {},
            Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = "https://embed.tawk.to/63f7b75b31ebfa0fe7eef749/1gpvq8g7c";
            s1.charset = "UTF-8";
            s1.setAttribute("crossorigin", "*");
            s0.parentNode.insertBefore(s1, s0);
        })();
    }, []);

    return <></>;
};

export default RouterChat;
