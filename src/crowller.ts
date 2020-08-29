// 对类的功能进行抽离。该类只负责读取html、写入json。

import path from 'path';
import fs from 'fs';
import superagent from 'superagent';
import Course from './course';

// 定义 course 参数类型。
export interface CourseAnalyze {
    analyze: (html: string, filePath: string) => string;
}

class Crowller {
    private filePath = path.resolve(__dirname, '../data/course.json'); // 写入的 json 路径

    // 获取爬虫地址所对应的html
    private async getRowHtml() {
        const res = await superagent.get(this.url);

        return res.text;
    }

    // 写文件
    private writeFile(content: string) {
        fs.writeFileSync(this.filePath, content);
    }

    private async initSpider() {
        const html = await this.getRowHtml();
        const fileContent = this.course.analyze(html, this.filePath);

        this.writeFile(fileContent);
    }

    constructor(private url: string, private course: CourseAnalyze) {
        this.initSpider();
    }
}

const secret = 'secretKey';
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

const course = Course.getInstance();
new Crowller(url, course);
