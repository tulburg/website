import {Container, Style, A, EM} from "@js-native/core/components"
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

export class Layout extends Container {
  constructor(...children: Container[]) {
    super();
    this.display('grid').gridTemplateColumns('auto auto 1fr')
    .padding(80).medias({
      '(max-width: 840px)': { padding: 40 },
      '(max-width: 560px)': {
        padding: 40,
        gridTemplateColumns: '1fr'
      }
    })
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
