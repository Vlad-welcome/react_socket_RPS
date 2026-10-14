export const Events = {
    // server → client
    HISTORY: "chat:history",
    MESSAGE: "chat:message",
    USER_JOINED: "user:joined",
    USER_LEFT: "user:left",
    USER_TYPING: "user:typing",
    USERS_LIST: "users:list",

    // client → server
    JOIN: "user:join",
    SEND: "chat:message",
    TYPING: "user:typing",
};