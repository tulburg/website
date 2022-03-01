import { PageComponent, Container } from "@js-native/core/components";

export default class App extends PageComponent {

  constructor() {
    super();

    const container = new Container();
    container.size([500, 500]).backgroundColor('green').borderRadius(20);
    this.addChild(container, new Container().size([100, 200]).backgroundColor('pink'));
  }

  onCreate() { 
  }
}
