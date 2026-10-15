import { useEffect, useState } from "react";
import { socket } from "../../api/socket";
import { Events } from "../../../../packages/shared/socketEvents.js";

export function useGame(username) {
  const [connected, setConnected] = useState(false);
  const [boardId, setBoardId] = useState(-1);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
      console.log("connect");
    });
    socket.on("disconnect", () => {
      setConnected(false);
      console.log("disconnect");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const join = () => {
    console.log("join", username);
    socket.connect();
    socket.emit(Events.JOIN, username);
  };

  const room = () => {
    console.log("room");
    socket.emit(Events.ROOM, (response) => {
      setBoardId(response.id);
    });
  };

  return { connected, join, room };
}
