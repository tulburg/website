import {Container, Style, A, EM, P, H4, Animation} from "@js-native/core/components"
import {Color} from "@js-native/core/types";
import {Link} from "./config";
import './assets/css/ms.css';

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
    this.display('inline-flex').alignItems('center').addChild(
      new EM().addClassName(footerLink.icon)
        .color(Theme.colors.text).fontSize(24).marginRight(16)
        .transition('all .2s ease-in-out').pseudo({
          ':before': { marginLeft: 0 }
        }),
      new TopLink(footerLink, { new_tab: true }).on({
        mousemove: function() {
          this.node().previousSibling.style.transform = 'translateX(12px)';
          this.node().previousSibling.style.color = Theme.colors.white;
        },
        mouseout: function() {
          this.node().previousSibling.style.transform = 'translateX(0) scale(1)'
          this.node().previousSibling.style.color = Theme.colors.text;
        }
      })
    )
  }
}

export class LeftPane extends Container {
  constructor(links: Link[]) {
    super();
    const topLinks = new Container().height(200)
      .display('flex').flexDirection('column');
    links.forEach(link => {
      if(link.name === 'interview') topLinks.addChild(
        new TopLink(link, { new_tab: true }).color(Theme.colors.white)
      )
      else topLinks.addChild(
        new TopLink(link).color(Theme.colors.white)
      )
    });
    const arrowStyles = new Style({
      fontSize: 32, color: Theme.colors.text
    }).pseudo({
      ':before': {
        marginLeft: 0
      }
    });
    const arrowAnim = new Animation({
      '0%': { transform: 'translateX(4px)' },
      '50%': { transform: 'translateX(8px) scale(0.8)' },
      '100%': { transform: 'translateX(12px)'}
    });
    const arrows = new Container()
      .position('relative').height('100%').addChild(
        new EM().addClassName('icon-arrow').marginLeft(-8).styles(arrowStyles),
        new EM().addClassName('icon-arrow').opacity('0.7')
          .marginLeft(-32).styles(arrowStyles).position('relative')
          .display('inline-block')
          .animation(arrowAnim.name + ' 1s cubic-bezier(0, 0.5, 0.1, 0.25) infinite forwards ')
      );
    this.display('flex').flexDirection('column')
      .addChild(topLinks, arrows);
  }
}


export class Footer extends Container {
  constructor() {
    super();
    const footerTextStyle = new Style({
      color: Theme.colors.text, fontSize: 12, maxWidth: 150
    })
    this.addChild(
      new H4().text('Tolu Oluwagbemi').fontSize(20).fontWeight('500')
        .color(Theme.colors.white).marginBottom(32).gridArea('1/1/3/3'),
      new Container().display('grid').gridTemplateColumns('440px auto')
        .gap(8)
        .addChild(
          ...Config.footerLinks.map((link: Link) => {
            if(link.name.match('@')) return new IconLink(link).global({
              'em': { visibility: 'hidden' }
            })
            else return new IconLink(link)
          }),
        ),
      new Container().display('grid').gridTemplateColumns('440px auto')
        .marginTop(150).gap(8)
        .addChild(
          new P().text(Config.copyrightText).styles(footerTextStyle), 
          new P().text(Config.statusText).styles(footerTextStyle)
        )
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
