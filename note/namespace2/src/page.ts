// reference表示当前namespace依赖于哪个namespace。便于阅读理解

///<reference path="components.ts" />

namespace Home {
  export namespace Dell {
    export const teacher: Components.user = {
      name: 'dell'
    };
  }
  export class Page {
    constructor() {
      new Components.Header();
      new Components.Content();
      new Components.Footer();
    }
  }
}
