import { RequestHandler, Request, Response, NextFunction } from "express"

export const getEmail: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    const token = auth?.split(' ')[1]
    const base64url = token?.split('.')[1]
    const claim = JSON.parse(Buffer.from(base64url ?? '', "base64").toString())
    if (typeof claim["https://test-api.com/email"] !== 'string') {
        res.status(401).send('Please provide an email')
        return
    }
    req.body.email = claim["https://test-api.com/email"]
    next()
}