import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export const MessageForm = ({ onSend, onTyping, className }) =>
{
    const [text, setText] = useState("");

    const submit = (e) =>
    {
        e.preventDefault();
        const id = localStorage.getItem('id');
        console.log('id', id);
        onSend(id, text);
        setText("");
    };

    const change = (e) =>
    {
        setText(e.target.value);
        const id = localStorage.getItem('id');
        onTyping(id, e.target.value.length > 0);
    };

    return (
        <Form onSubmit={submit} className={className}>
            <InputGroup>
                <Form.Control
                    value={text}
                    onChange={change}
                    placeholder="Сообщение..."
                />
                <Button type="submit" variant="primary">
                    Отправить
                </Button>
            </InputGroup>
        </Form>
    );
}