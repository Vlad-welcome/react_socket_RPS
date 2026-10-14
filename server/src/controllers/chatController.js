import messageService from "../services/messageService.js";
import userService from "../services/userService.js";
import { Events } from "../services/socketEventService.js";

export const chatController = async (io, socket) =>
{
    // отправка истории при подключении
    socket.emit(Events.HISTORY, await messageService.history());

    // новое сообщение
    socket.on(Events.SEND, async (id, text) =>
    {
        console.log('text', text);
        if (!text?.trim()) return;
        const msg = await messageService.create(id, text.trim());
        io.emit(Events.MESSAGE, msg);
    });

    // индикатор набора
    socket.on(Events.TYPING, async (id, isTyping) =>
    {
        console.log('isTyping', isTyping);
        const user = await userService.getById(id);
        if (!user) return;
        socket.broadcast.emit(Events.USER_TYPING, {
            username: user.username,
            isTyping,
        });
    });
};

export const messages = async (req, res) =>
{
    try
    {
        console.log('messages get');
        res.json(await messageService.history());
    } catch (err)
    {
        res.status(500).json({
            success: false
        });
    }
};