import { PageComponent, Container, Animation, Style, EM, H4, P, H1 } from "@js-native/core/components";
import {Layout, TopLink, IconLink} from "./theme";
import {Link} from "./config";

export default class App extends PageComponent { 

  middlePane: MiddlePane;
  constructor() {
    super();
    this.middlePane = new MiddlePane(
      Config.slides, 
      new Footer()
    );
    this.addChild(
      new Layout(
        new LeftPane(Config.links),
        this.middlePane,
        new Container()
      )
    );
  }

  onCreate() {
    this.middlePane.startAnim();
  }
}


export class LeftPane extends Container {
  constructor(links: Link[]) {
    super();
    const topLinks = new Container().height('calc(100px + 4vh)')
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
  slides: H1[];
  slidesContainer: Container;
  constructor(slides: string[], footer: Footer) {
    super();
    this.slides = slides.map(
      slide => new H1().text(slide).fontSize(64).position('absolute')
      .fontWeight('600').color(Theme.colors.white).transition('all .3s cubic-bezier(0.5, 1, 0.75, 1.5)')
      .transform('translateX(-20px)').opacity('0')
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
        '(max-width: 460px)': { fontSize: 32 }
      })
    )
    this.slides[0].transform('translateX(0)').opacity('1');
    this.slidesContainer = new Container().position('relative')
      .addChild(...this.slides)
    this.position('relative').marginTop(100).minHeight(680)
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
      .addChild(this.slidesContainer, footer)
  }

  startAnim() {
    let index = 0, prev = 0;
    const setSize = () => {
      const maxHeight = Math.max.apply(null, this.slides.map(i => i.node().getBoundingClientRect().height));
      this.slidesContainer.height(maxHeight + 64);
    }
    window.onresize = () => setSize();
    setSize();
    setInterval(() => {
      index++;
      if(index > this.slides.length - 1) index = 0;
      if(prev !== undefined) {
        this.slides[prev].transform('translateX(-20px)').opacity('0')
      }
      this.slides[index].transform('translateX(0)').opacity('1');
      prev = index;
    }, 7200);
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

