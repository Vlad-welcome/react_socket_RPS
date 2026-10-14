import { io } from "socket.io-client";

export const socket = io("http://localhost:3000",
    {
        autoConnect: false,
        withCredentials: true
    });

export const Events = {
    HISTORY: "chat:history",
    MESSAGE: "chat:message",
    USER_JOINED: "user:joined",
    USER_LEFT: "user:left",
    USER_TYPING: "user:typing",
    USERS_LIST: "users:list",
    JOIN: "user:join",
    SEND: "chat:message",
    TYPING: "user:typing",
};