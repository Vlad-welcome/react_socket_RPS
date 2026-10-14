import { Server } from "socket.io";
import { chatController } from "../controllers/chatController.js";
import { userController } from "../controllers/userController.js";

export function initSocket(httpServer)
{
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:4000",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) =>
    {
        console.log("connected:", socket.id);
        // каждый контроллер вешает свои обработчики
        userController(io, socket);
        chatController(io, socket);
    });

    return io;
}