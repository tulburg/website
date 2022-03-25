import {Container, Style, A, EM, P, H4} from "@js-native/core/components"
import {Color} from "@js-native/core/types";
import {Link} from "./config";

export default {
  globals: {
    '*': {
      padding: 0,
      margin: 0,
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: 16,
      boxSizing: 'border-box'
    },
    body: {
      backgroundColor: '#000000'
    }
  },
  colors: {
    white: 'white', 
    black: 'black',
    text: '#777777'
  },
  styles: {
    linkStyle: new Style({
      color: '#777777', 
      textDecoration: 'none'
    }).pseudo({
      ':hover': { 
        color: 'white',
        textDecoration: 'underline'
      }
    })
  }
}

export class Scene extends Container {
  constructor(bgColor: Color) {
    super();
    this.size(['100vw', '100vh']).backgroundColor(bgColor);
  }
}

export class Layout extends Container {
  constructor(...children: Container[]) {
    super();
    this.display('grid').gridTemplateColumns('280px 720px auto')
      .padding(80)
    this.addChild(...children);
  }
}

export class TopLink extends A {
  constructor(link: Link, opts?: { new_tab: boolean }) {
    super();
    this.text(link.name).href(link.url)
      .styles(Theme.styles.linkStyle).width('fit-content');
    if(opts && opts.new_tab) this.target('_blank');
  }
}

export class IconLink extends Container {
  constructor(footerLink: Link) {
    super();
    this.display('inline-flex').addChild(
      new EM().addClassName(footerLink.icon),
      new TopLink(footerLink, { new_tab: true })
    )
  }
}

export class LeftPane extends Container {
  constructor(links: Link[]) {
    super();
    const topLinks = new Container().height(160)
      .display('flex').flexDirection('column');
    links.forEach(link => {
      if(link.name === 'interview') topLinks.addChild(
        new TopLink(link, { new_tab: true }).color(Theme.colors.white)
      )
      else topLinks.addChild(
        new TopLink(link).color(Theme.colors.white)
      )
    });
    const arrows = new Container().height('100%').addChild(
      new EM().addClassName('icon-arrow-right'),
      new EM().addClassName('icon-arrow-right').addClassName('right')
    );
    this.display('flex').flexDirection('column')
      .addChild(topLinks, arrows);
  }
}


export class Footer extends Container {
  constructor() {
    super();
    this.display('grid').gridTemplateColumns('440px auto')
    .addChild(
      new H4().text('Tolu Oluwagbemi').fontSize(20)
        .color(Theme.colors.white).marginBottom(32).gridArea('1/1/3/3'),
      ...Config.footerLinks.map((link: Link) => new IconLink(link)),
      new P().text(Config.copyrightText), new P().text(Config.statusText)
    )
  }
}

export class MiddlePane extends Container {
  constructor(slides: string[], footer: Footer) {
    super();
    this.position('relative').marginTop(160).height('45vh')
      .display('flex').flexDirection('column') 
      .addChild(
        new Container().height('100%')
          .global({
            '*': { display: 'none' },
            ':first-child': { display: 'block' }
          })
          .addChild(
            ...slides.map(slide => new P().text(slide).fontSize(48)
                        .fontWeight('500').color(Theme.colors.white)
                       .position('absolute'))
          ),
        footer
      )
  }
}
