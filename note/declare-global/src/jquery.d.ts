// 定义全局变量
// declare var $: (param: () => void) => void;

// 定义全局函数
interface JqueryInstance {
  html: (html: string) => JqueryInstance;
}

// 函数重载
declare function $(readyFunc: () => void): void;
declare function $(selector: string): JqueryInstance; // 返回一个对象，对象中有html方法，并且html方法接收string参数返回一个函数。

// namespace嵌套，对 对象及类进行类型定义
declare namespace $ {
    namespace fn {
        class init {}
    }
}

// 使用interface实现函数重载
// interface Jquery {
//     (readyFunc: () => void): void;
//     (selector: string): JqueryInstance;
// }
//
// declare var $: Jquery;
