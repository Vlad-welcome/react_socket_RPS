import { useState } from "react";
import { useGame } from "./useGame.js";
import { Button, Form, InputGroup } from "react-bootstrap";

export const Game = () => {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState(false);
  const [invitePlayer, setInvitePlayer] = useState("");
  const [start, setStart] = useState(false);

  const onInvited = () => {
    setStart(true);
    setRoom(true);
  };

  const onStarted = () => {
    setStart(true);
  };

  const game = useGame(username, onInvited, onStarted);

  const join = () => {
    if (!username.trim()) return;
    game.join((res) => setJoined(res));
  };

  const board = () => {
    game.room();
    setRoom(true);
  };

  const invite = () => {
    game.invite(invitePlayer);
  };

  const exit = () => {
    game.exit();
    setRoom(false);
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
  } else if (start) {
    return <p>game start</p>;
  } else {
    return (
      <div className="d-flex justify-content-center mt-3 mx-3">
        <InputGroup>
          <Form.Control
            type="text"
            value={invitePlayer}
            onChange={(e) => setInvitePlayer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && invite()}
            placeholder="Имя игрока"
          />
          <Button variant="outline-primary" onClick={invite}>
            Пригласить
          </Button>
          <Button variant="outline-danger" onClick={exit}>
            Выйти
          </Button>
        </InputGroup>
      </div>
    );
  }
};
