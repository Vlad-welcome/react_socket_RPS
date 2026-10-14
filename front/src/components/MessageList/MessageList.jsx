export const MessageList = ({ messages, userId }) =>
{
    return (
        <div>
            {messages.map((m) => (
                <div
                    key={m.id}
                    className={`${m.userId == userId ? "border border-1 rounded-2 mb-2 p-2" : "border border-1 border-primary rounded-2 mb-2 p-2"}`}
                >
                    <b>{m.username}</b>
                    <div>{m.text}</div>
                    <small>{new Date(m.time).toLocaleTimeString()}</small>
                </div>
            ))}
        </div>
    );
}