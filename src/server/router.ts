import {Router, Response, Request, NextFunction} from 'express';
import Course from "../course";
import Crowller from "../crowller";
import {getResponseData} from './utils/util';

interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined
    }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : false;

    if(isLogin) {
        next()
    } else {
        res.json(getResponseData(null, '请登陆'));
    }
};

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send(
        `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>登陆</title>
            </head>
            <body>
            <form action="/getData" method="post">
                <input type="password" name="password">
                <button type="submit">登陆</button>
            </form>
            </body>
            </html>
        `
    );
});

router.post('/getData', checkLogin, (req: RequestWithBody, res: Response) => {
    const {password} = req.body;

    if(password === '123') {
        const secret = 'secretKey';
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

        const course = Course.getInstance();
        new Crowller(url, course);

        res.send('爬取成功！');
    } else {
        res.send('密码错误！');
    }

});

export default router;
