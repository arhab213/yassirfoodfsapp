import ServerParmeters from "./functions.js";
import shoprouter from "./routes/shoproutes.js";
import PublicUserRouter from "./routes/PublicUserRoutes.js";
import { AdminUserRoute } from "./routes/AdminUserRoutes.js";
//ServerParmeters
let { HandlingConnection, ServerSetup, IndexesCreation } = ServerParmeters;
//connecting to db
HandlingConnection(true);
//setting up the server
//routes and paths
let RoutesAndPaths = [
    //shop router
    {
        path: "/shop/",
        route: shoprouter,
    },
    //public user router
    {
        path: "/public/",
        route: PublicUserRouter,
    },
    //admin user router
    {
        path: "/admin/",
        route: AdminUserRoute,
    },
];
//indexes creation
IndexesCreation();
//Setting Up server
ServerSetup(RoutesAndPaths);
//# sourceMappingURL=main.js.map