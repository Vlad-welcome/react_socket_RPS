import userService from "../services/userService.js";
import { Events } from "../services/socketEventService.js";

export const userController = (io, socket) =>
{
    socket.on(Events.JOIN, async (username, callback) =>
    {
        console.log('user connect ' + username);

        if (!username?.trim()) return;
        const user = await userService.join(username.trim(), socket.id);
        io.emit(Events.USER_JOINED, { username: username.trim() });
        io.emit(Events.USERS_LIST, await userService.list());
        console.log('user.id', user.id);
        callback({ id: user.id });
    });

    socket.on("disconnect", async () =>
    {
        console.log('user disconnect: ' + socket.id);

        const user = await userService.getBySocket(socket.id);
        const leave = await userService.leave(user?.id);
        if (leave)
        {
            io.emit(Events.USER_LEFT, { username: user.username });
            io.emit(Events.USERS_LIST, await userService.list());
        }
    });
};

export const users = async (req, res) =>
{
    try
    {
        console.log('users get');
        res.json(await userService.list());
    } catch (err)
    {
        res.status(500).json({
            success: false
        });
    }
};