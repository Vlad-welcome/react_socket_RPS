import { useEffect, useState } from "react";
import { socket, Events } from "../../api/socket";

export function useChat(username)
{
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [typingUser, setTypingUser] = useState("");
    const [connected, setConnected] = useState(false);

    useEffect(() =>
    {
        socket.on("connect", () => { setConnected(true); console.log('connect'); });
        socket.on("disconnect", () => { setConnected(false); console.log('disconnect'); });
        socket.on(Events.HISTORY, setMessages);
        socket.on(Events.MESSAGE, (m) => setMessages((prev) => [...prev, m]));
        socket.on(Events.USERS_LIST, setUsers);
        socket.on(Events.USER_TYPING, ({ username, isTyping }) =>
            setTypingUser(isTyping ? username : "")
        );

        return () =>
        {
            socket.off("connect");
            socket.off("disconnect");
            socket.off(Events.HISTORY);
            socket.off(Events.MESSAGE);
            socket.off(Events.USERS_LIST);
            socket.off(Events.USER_TYPING);
        };
    }, []);

    const join = () =>
    {
        console.log('username', username);
        socket.connect();
        socket.emit(Events.JOIN, username, (response) =>
        {
            console.log("Сервер подтвердил:", response);
            localStorage.setItem('id', response.id);
        });
    };

    const send = (id, text) =>
    {
        console.log('text', text);
        if (!text.trim()) return;
        socket.emit(Events.SEND, id, text);
        socket.emit(Events.TYPING, id, false);
    };

    const typing = (id, isTyping) => socket.emit(Events.TYPING, id, isTyping);

    return { messages, users, typingUser, connected, join, send, typing };
}