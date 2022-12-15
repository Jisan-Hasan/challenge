import Content from "./Content";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: "/",
        element: <Content />,
    },
]);

export default router;
