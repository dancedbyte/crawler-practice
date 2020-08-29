"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var Course = /** @class */ (function () {
    function Course() {
    }
    // 实现单例模式
    Course.getInstance = function () {
        if (!Course.instance) {
            Course.instance = new Course();
        }
        return Course.instance;
    };
    // 解析html
    Course.prototype.handleDealHtml = function (html) {
        var $ = cheerio_1.default.load(html); // load cheerio语法。使我们可以像jquery语法那样去获取dom
        var courseItems = $('.course-item');
        var courseInfos = [];
        courseItems.map(function (idx, it) {
            var descs = $(it).find('.course-desc');
            var title = descs.eq(0).text(); // .eq 指获取当前dom中的第几个子元素
            var count = idx; // 先写死。
            courseInfos.push({ title: title, count: count });
        });
        return {
            time: new Date().getTime(),
            data: courseInfos,
        };
    };
    // 将获取的数据进入json文件
    Course.prototype.initToJson = function (courseInfo, filePath) {
        var fileContent = {};
        // 处理 course.json 数据
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    };
    ;
    Course.prototype.analyze = function (html, filePath) {
        var res = this.handleDealHtml(html);
        var fileContent = this.initToJson(res, filePath);
        return JSON.stringify(fileContent);
    };
    return Course;
}());
exports.default = Course;
