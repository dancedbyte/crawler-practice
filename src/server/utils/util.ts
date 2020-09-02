import {NextFunction, Request, Response} from "express";

interface Result {
    success: boolean,
    errorMsg?: string,
    data: any
}

// 封装统一响应
const getResponseData = (data: any, errorMsg?: string): Result => {
    const isHasError = errorMsg ? {errorMsg} : {};

    return {
        success: !errorMsg,
        ...isHasError,
        data,
    }
};

// 检测是否登陆
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : false;

    if(isLogin) {
        next()
    } else {
        res.json(getResponseData(null, '请登陆'));
    }
};

export {
    getResponseData,
    checkLogin
}
