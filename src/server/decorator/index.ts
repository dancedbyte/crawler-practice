import {RequestHandler} from 'express';
import 'reflect-metadata';
import router from "../route";
import {LoginController} from '../controllers';

// 包装接口真实路径，及用到的中间件
function prefix(prefix: string) {
    return function (target: new (...args: any[]) => any) {
        for (let key in target.prototype) {
            if (target.prototype.hasOwnProperty(key)) {
                const path: string = Reflect.getMetadata('path', target.prototype, key);
                const method: Methods = Reflect.getMetadata('method', target.prototype, key);
                const middleware: RequestHandler[] = Reflect.getMetadata('middleware', target.prototype, key);
                const handler = target.prototype[key];

                if (path && method) {
                    const fullPath = prefix === '/' ? path : `${prefix}${path}`;

                    if (middleware) {
                        router[method](fullPath, ...middleware, handler);
                    } else {
                        router[method](fullPath, handler);
                    }
                }
            }
        }
    }
}

// 封装请求
enum Methods {
    get = 'get',
    post = 'post',
}

function request(type: Methods) {
    return function (path: string) {
        return function (target: LoginController, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        }
    }
}

// 自定义中间件
function use(middleware: RequestHandler[]) {
    return function(target: LoginController, key: string) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}

const get = request(Methods.get);
const post = request(Methods.post);

export {
    prefix,
    get,
    post,
    use
}
