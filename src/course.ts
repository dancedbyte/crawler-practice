import cheerio from "cheerio";
import fs from "fs";
import {CourseAnalyze} from './crowller';

interface Cource {
    title: string,
    count: number,
}

interface CourseRes {
    time: number,
    data: Cource[],
}

// data/course.json的数据格式
interface Content {
    [propName: number]: Cource[],
}

export default class Course implements CourseAnalyze {
    private static instance: Course;

    // 实现单例模式
    static getInstance() {
        if (!Course.instance) {
            Course.instance = new Course();
        }

        return Course.instance;
    }

    private constructor() {}

    // 解析html
    private handleDealHtml(html: string) {
        const $ = cheerio.load(html); // load cheerio语法。使我们可以像jquery语法那样去获取dom
        const courseItems = $('.course-item');
        const courseInfos: Cource[] = [];

        courseItems.map((idx, it) => {
            const descs = $(it).find('.course-desc');
            const title = descs.eq(0).text(); // .eq 指获取当前dom中的第几个子元素
            const count = idx; // 先写死。

            courseInfos.push({title, count});
        });

        return {
            time: new Date().getTime(),
            data: courseInfos,
        };
    }

    // 将获取的数据进入json文件
    private initToJson(courseInfo: CourseRes, filePath: string) {
        let fileContent: Content = {};

        // 处理 course.json 数据
        if (fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseInfo.time] = courseInfo.data;

        return fileContent;
    };

    public analyze(html: string, filePath: string) {
        const res = this.handleDealHtml(html);
        const fileContent = this.initToJson(res, filePath);

        return JSON.stringify(fileContent);
    }
}
