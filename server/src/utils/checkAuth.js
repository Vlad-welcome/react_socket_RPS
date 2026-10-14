import JwtService from '../services/jwtService.js';

export default (req, res, next) =>
{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token)
    {
        try
        {
            const decoded = JwtService.decodeToken(token);
            req.UserId = decoded.id;
            next();
        } catch (e)
        {
            return res.status(403).json({
                success: false,
                message: 'Нет доступа token'
            });
        }
    } else
    {
        return res.status(403).json({
            success: false,
            message: 'Нет доступа'
        });
    }
};

