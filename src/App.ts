import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/Routes";
import { Server } from "./presentation/Server";


//** Main
( async () => { 
    Main();
})();

function Main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });
    server.start();
}