import { PageComponent, Container, Animation, Style, EM, H4, P, H1 } from "@js-native/core/components";
import {Layout, TopLink, IconLink} from "./theme";
import {Link} from "./config";

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


export class LeftPane extends Container {
  constructor(links: Link[]) {
    super();
    const topLinks = new Container().height('16vh')
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
      ).medias({
        '(max-width: 560px)': { display: 'none' }
      });
    this.display('flex').flexDirection('column').width('15vw').minWidth(120).maxWidth(420)
      .addChild(topLinks, arrows);
  }
}

export class MiddlePane extends Container {
  constructor(slides: string[], footer: Footer) {
    super();
    this.position('relative').marginTop('12vh').height('64vh').minHeight(680)
      .display('flex').flexDirection('column').maxHeight(1000).width(800)  
      .medias({
        '(max-width: 3200px)': { width: 800 },
        '(max-width: 2000px)': { width: 660 },
        '(max-width: 1200px)': { width: 560 },
        '(max-width: 840px)': { width: 'calc(100vw - 240px)' },
        '(max-width: 560px)': {
          marginTop: 0,
          width: 'calc(100vw - 80px)'
        }
      })
      .addChild(
        new Container().height('100%')
          .global({
            '*': { display: 'none', top: 0 },
            ':nth-child(4)': { display: 'block' }
          })
          .addChild(
            ...slides.map(
              slide => new H1().text(slide).fontSize(64)
              .fontWeight('600').color(Theme.colors.white)
              .medias({
                '(max-width: 3200px)': { fontSize: 64 },
                '(max-width: 2000px)': { fontSize: 58 },
                '(max-width: 1600px)': { fontSize: 54 },
                '(max-width: 1200px)': { fontSize: 48 },
                '(max-width: 840px)': { fontSize: 42 },
                '(max-width: 700px)': { fontSize: 36 },
                '(max-width: 640px)': { fontSize: 32 },
                '(max-width: 560px)': { fontSize: 42 },
                '(max-width: 520px)': { fontSize: 36 },
                '(max-width: 460px)': { fontSize: 32 },
                
              })
            )
          ),
        footer
      )
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
        .medias({
          '(max-width: 1200px)': { gridTemplateColumns: '340px auto' },
          '(max-width: 700px)': { gridTemplateColumns: '1fr' },
          '(max-width: 560px)': { gridTemplateColumns: '300px auto' },
          '(max-width: 520px)': { gridTemplateColumns: '1fr' },
        })
        .gap([8, 0])
        .addChild(
          ...Config.footerLinks.map((link: Link) => {
            if(link.name.match('@')) return new IconLink(link).global({
              'em': { visibility: 'hidden' }
            })
            else return new IconLink(link)
          }),
        ),
      new Container().display('grid').gridTemplateColumns('440px auto')
        .marginTop(150).gap(8).medias({
          '(max-width: 1200px)': { gridTemplateColumns: '340px auto' },
          '(max-width: 700px)': { 
            gridTemplateColumns: '1fr 1fr',
            marginTop: 100
          },
          '(max-width: 580px)': { 
            gridTemplateColumns: '1fr', 
            gridGap: 40,
            marginTop: 80
          },
          '(max-width: 560px)': {
            gridTemplateColumns: '300px auto',
            gridGap: 0
          },
          '(max-width: 520px)': {
            gridTemplateColumns: '1fr 1fr'
          }
        }).addChild(
          new P().text(Config.copyrightText).styles(footerTextStyle), 
          new P().text(Config.statusText).styles(footerTextStyle)
        )
    )
  }
}

