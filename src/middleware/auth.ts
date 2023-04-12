import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { SECRET } from '../config';

export default function loginRequired(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);
    try {
        const user: JwtPayload | String = jwt.verify(token, SECRET);
        req['user'] = user;
    } catch (e) {
        return res.sendStatus(403);
    }
    next()
}