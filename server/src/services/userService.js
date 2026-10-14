import { User } from "../models/userModel.js";

class userService
{
    async join(username, socketId)
    {
        const user = await User.create({ username: username, socketId: socketId, joinedAt: new Date() });
        return user;
    }

    async leave(id)
    {
        const count = await User.destroy({
            where: { id: id }
        });
        return count > 0;
    }

    async getBySocket(socketId)
    {
        const user = await User.findOne({
            where: { socketId: socketId }
        });
        return user;
    }

    async getById(id)
    {
        const user = await User.findOne({
            where: { id: id }
        });
        return user;
    }

    async list()
    {
        const users = await User.findAll();
        return users;
    }
}

export default new userService();