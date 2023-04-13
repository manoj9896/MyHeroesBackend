import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.SECRET;

export default function loginOptional(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        next();
        return;
    }
    try {
        const user: JwtPayload | String = jwt.verify(token, SECRET);
        req['user'] = user['id'];
    } catch (e) {
        return res.sendStatus(403);
    }
    next()
}