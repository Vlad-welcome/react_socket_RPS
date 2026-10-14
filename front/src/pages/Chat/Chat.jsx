import { useState } from "react";
import { useChat } from "./useChat.js";
import { MessageList, UserList, MessageForm } from "../../components/index.js";
import { Button, Form } from 'react-bootstrap'

export const Chat = () =>
{
    const [username, setUsername] = useState("");
    const [joined, setJoined] = useState(false);
    const chat = useChat(username);

    const join = () =>
    {
        if (!username.trim()) return;

        console.log('username', username);
        console.log('chat', chat)

        chat.join();
        setJoined(true);
    };

    if (!joined)
    {
        return (
            <div className="d-flex justify-content-center mt-3 mx-3">
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && join()}
                    placeholder="Ваше имя"
                    className="me-3"
                />
                <Button variant="outline-primary" onClick={join}>Войти</Button>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center mt-3">
            <div className="d-flex justify-content-between gap-3 w-75">
                <UserList users={chat.users} />
                <div className="w-75">
                    <h2 className="text-center">💬 Чат — {username}</h2>
                    <MessageList messages={chat.messages} userId={localStorage.getItem('id')} />
                    {chat.typingUser && <div className="p-2">{chat.typingUser} печатает...</div>}
                    <MessageForm onSend={chat.send} onTyping={chat.typing} className="mt-2" />
                </div>
            </div>
        </div>
    );
};