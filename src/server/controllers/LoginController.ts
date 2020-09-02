import {Request, Response} from "express";
import {prefix, get, post, use} from '../decorator';
import {checkLogin} from "../utils/util";
import Course from "../../course";
import Crowller from "../../crowller";

interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined
    }
}

@prefix('/')
export class LoginController {
    @get('/login')
    login(req: Request, res: Response): void {
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
    }

    @post('/')
    @use([checkLogin])
    index(req: Request, res: Response): void {
        res.send('首页');
    }

    @post('/getData')
    getData(req: RequestWithBody, res: Response) {
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
    }
}
