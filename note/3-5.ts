// 泛型 用<>编写 generic 泛指的类型

function join<T, P>(first: T, second: P) {
    return `${first}${second}`;
}

// 也可以泛指函数的返回类型
function anotherJoin<T>(first: T, second: T): T {
    return first;
}

// Array<T> 等价于 T[]
function map<T>(params: Array<T>) {
    return params;
}

// join<number, string>(1, '1');
// map<string>(['123']);
join(1, '1');
anotherJoin(1, 2);
