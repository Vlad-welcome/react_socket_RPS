import jwt from 'jsonwebtoken';

const key = process.env.JWT_SECRET || 'default_secret_key_123456789';

class JwtService
{
    generateToken(user)
    {
        return jwt.sign(
            {
                id: user.id
            },
            key,
            { expiresIn: '30d' }
        );
    }

    decodeToken(tocken)
    {
        return jwt.verify(tocken, key);
    }
}

export default new JwtService();