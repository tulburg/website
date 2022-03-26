import { PageComponent, Container } from "@js-native/core/components";
import {Layout, LeftPane, MiddlePane, Footer} from "./theme";

export default class App extends PageComponent { 

  constructor() {
    super();
    
    this.addChild(
      new Layout(
        new LeftPane(Config.links),
        new MiddlePane(
          Config.slides, 
          new Footer()
        ),
        new Container()
      )
    )
  }
}
