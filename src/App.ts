import { envs } from "./config/envs";
import { Server } from "./presentation/Server";


( async () => { 
    Main();
})();

function Main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
    });
    server.start();
}