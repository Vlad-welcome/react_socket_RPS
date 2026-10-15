import { useState } from "react";
import { useGame } from "./useGame.js";
import { Button, Form, InputGroup } from "react-bootstrap";

export const Game = () => {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState(false);
  const game = useGame(username);

  const join = () => {
    if (!username.trim()) return;
    game.join();
    setJoined(true);
  };

  const board = () => {
    game.room();
    setRoom(true);
  };

  if (!joined) {
    return (
      <div className="d-flex justify-content-center mt-3 mx-3">
        <InputGroup>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && join()}
            placeholder="Ваше имя"
          />
          <Button variant="outline-primary" onClick={join}>
            Войти
          </Button>
        </InputGroup>
      </div>
    );
  } else if (!room) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <Button variant="primary" onClick={board}>
          Создать комнату
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Комната создана</p>
      </div>
    );
  }
};
