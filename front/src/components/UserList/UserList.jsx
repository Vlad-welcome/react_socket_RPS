import { ListGroup } from "react-bootstrap";

export const UserList = ({ users }) =>
{
    return (
        <aside>
            <h4>Онлайн ({users.length})</h4>
            <ListGroup>
                {users.map((u) => (
                    <ListGroup.Item key={u.id}>🟢 {u.username}</ListGroup.Item>
                ))}
            </ListGroup>
        </aside>
    );
}