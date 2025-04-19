import server from "./server"
import { PORT } from "./config/envs"
import "reflect-metadata"

const initializeApp = () => {
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        
})
}

initializeApp()