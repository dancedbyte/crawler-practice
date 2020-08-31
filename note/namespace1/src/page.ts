// namespace提供类似模块化开发的功能。避免污染全局变量，可以通过export导出我们想要暴露的方法或变量

namespace Home {
  class Header {
    constructor() {
      const elem = document.createElement('div');
      elem.innerText = 'This is Header';
      document.body.appendChild(elem);
    }
  }

  class Content {
    constructor() {
      const elem = document.createElement('div');
      elem.innerText = 'This is Content';
      document.body.appendChild(elem);
    }
  }

  class Footer {
    constructor() {
      const elem = document.createElement('div');
      elem.innerText = 'This is Footer';
      document.body.appendChild(elem);
    }
  }

  // 导出page类。在html通过 new Home.Page(); 去调用
  export class Page {
    constructor() {
      new Header();
      new Content();
      new Footer();
    }
  }
}
