import { useEffect, useState } from "react";
import { socket } from "../../api/socket";
import { Events } from "../../../../packages/shared/socketEvents.js";

export function useGame(username, onInvited, onStarted) {
  const [connected, setConnected] = useState(false);
  const [boardId, setBoardId] = useState(-1);
  const [player, setPlayer] = useState(-1);
  const [enemySocketId, setEnemySocketId] = useState(-1);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
      console.log("connect");
    });
    socket.on("disconnect", () => {
      setConnected(false);
      console.log("disconnect");
    });
    socket.on(Events.INVITED, (response) => {
      console.log("invited");
      const ok = window.confirm(`Вас приглашает в игру. Принять?`);
      if (ok) {
        setPlayer(2);
        setBoardId(response.boardId);
        setEnemySocketId(response.playerSocketId);

        socket.emit(Events.GAME_START, response.playerSocketId);
        onInvited();
      }
    });

    socket.on(Events.GAME_STARTED, (response) => {
      console.log("started");
      onStarted(response.start);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off(Events.INVITED);
      socket.off(Events.GAME_STARTED);
    };
  }, []);

  const join = (onResult) => {
    console.log("join", username);
    socket.connect();
    socket.emit(Events.JOIN, username, (response) => {
      if (response.success) {
        onResult(true);
      } else {
        socket.disconnect();
        onResult(false);
      }
    });
  };

  const room = () => {
    console.log("room");
    socket.emit(Events.ROOM, (response) => {
      setBoardId(response.boardId);
    });
    setPlayer(1);
  };

  const invite = (invitePlayer) => {
    console.log("invite");
    const name = invitePlayer?.trim();
    if (!name) {
      return;
    }
    socket.emit(Events.INVITE, name, boardId);
  };

  return { connected, join, room, invite };
}
