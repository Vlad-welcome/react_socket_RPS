import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { sequelize } from '../config/db.js';

class messageService
{
    async create(userId, text)
    {
        console.log('create message ' + userId + text);
        const message = await Message.create({ text: text, userId: userId, time: new Date() });
        return await Message.findOne({
            where: { id: message.id },
            attributes: [
                "id",
                "text",
                "time",
                "userId",
                [sequelize.col("user.username"), "username"],
            ],
            include: [{
                model: User,
                attributes: [],
            }]
        });
    }

    async history()
    {
        return await Message.findAll({
            attributes: [
                "id",
                "text",
                "time",
                "userId",
                [sequelize.col("user.username"), "username"],
            ],
            include: [{
                model: User,
                attributes: [],
            }]
        });
    }
}

export default new messageService();