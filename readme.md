# 说明

## 启动

#### dev:build
    
    根据tsconfig.json中outDir定义输出路径。即编译后的js输出和路径。

#### dev:start
    
    监听主文件变化，及时编译并更新js文件。
                            
#### dev
    
    借助concurrently，集合以上两个命令。


## 随记

1. 引第三方包时，需要引该包对应的ts版本。

2. src目录下，crowller.js只负责读取html及写入json文件，将具体的实现逻辑抽离出来。

3. 例如新建的course1.ts。在里面处理自己的逻辑，最后只需保证新建的ts文件返回analyze方法即可。这种模式叫组合设计模式。

4. crowller.ts 和 course.ts 应用了单例模式。


