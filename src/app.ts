import { PageComponent, SVG, Component, Container, Animation } from "@js-native/core/components";
import svg from "./assets/svg";
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
    
    this.addChild(new InfinitDreamsSection().display('none'));
  }

  onCreate() {
    document.body.style.overflow = 'hidden'
    // setTimeout(() => document.body.style.overflow = 'auto', 7600);
  }
}


class InfinitDreamsSection extends Component {

  infinite: SVG;
  infiniteOverlay: SVG;
  dreams: SVG;
  dreamsOverlay: SVG;

  svgContainer: Container;

  constructor() {
    super();
    this.size(['100vw', '100vh'])
      .backgroundColor(Theme.colors.black)
      .position('relative');

    this.infiniteOverlay = new SVG().width(446).height(280).viewBox('0 0 446 280').fill('none')
      .position('absolute').left('50%').top('40%').transform('translate(-50%, -50%) scale(1.8)');
    this.infinite = new SVG().width(446).height(280).viewBox('0 0 446 280').fill('none')
      .position('absolute').left('50%').top('40%').transform('translate(-50%, -50%) scale(1.8)')
      .filter('saturate(3) blur(10px)');
    this.dreamsOverlay = new SVG().width(501).height(222).viewBox('0 0 501 222').fill('none')
      .position('absolute').left('60%').top('55%').transform('translate(-50%, -55%) scale(1.8)');
    this.dreams = new SVG().width(501).height(222).viewBox('0 0 501 222').fill('none')
      .position('absolute').left('60%').top('55%').transform('translate(-50%, -55%) scale(1.8)')
      .filter('saturate(3) blur(10px)');

    this.svgContainer = new Container().addChild(
      this.infinite, this.infiniteOverlay, this.dreams, this.dreamsOverlay
    ).size(['100%', '80%']).marginTop('10%')
      .transform('rotate(-45deg) scale(0.6)');
    this.addChild(this.svgContainer);

    const rollInAnim = new Animation({
      from: { transform: 'rotate(-45deg) scale(2.5)' },
      to: { transform: 'rotate(0deg) scale(1)' }
    })
    this.svgContainer.animation(rollInAnim.name + ' 7.6s ease-in-out forwards');
  }

  onCreate() { 
    this.infinite.node().innerHTML = svg.infinite;
    this.infiniteOverlay.node().innerHTML = svg.infinite;
    this.dreams.node().innerHTML = svg.dreams;
    this.dreamsOverlay.node().innerHTML = svg.dreams;

    let delay = 0;
    [
      this.infinite.node(), this.infiniteOverlay.node(),
      this.dreams.node(), this.dreamsOverlay.node()
    ].forEach((svg, jindex) => {
      if(jindex === 1) delay = 0.25;
        if(jindex === 2) delay = 4;
        if(jindex === 3) delay = 4.25;
      svg.querySelectorAll('path').forEach((path: any, index) => {
        const pathLength = path.getTotalLength(), duration = pathLength / 500;
        path.setAttribute('id', 'exp-' + index);
        if(jindex === 0 || jindex === 2) path.style = `stroke: url(#gradient); stroke-dasharray: ${pathLength}; stroke-dashoffset: ${pathLength}; stroke-opacity: 1`;
        else path.style = `stroke: white; stroke-dasharray: ${pathLength}; stroke-dashoffset: ${pathLength}; stroke-opacity: 1`;
        if(index === 0) {
          path.innerHTML = `
            <animate id="anim${index}" attributeName="stroke-dashoffset" begin="${delay}s" dur="${duration}" to="0" fill="freeze" delay="${delay}" keySplines="0; 0.25; 0.1; 0.5; 1">
          `;
        }else path.innerHTML = `
          <animate attributeName="stroke-dashoffset" id="anim${index}" begin="anim${index-1}.end + ${delay}s" dur="${duration}" to="0" fill="freeze" delay="${delay}" keySplines="0; 0.25; 0.1; 0.5; 1">
        `;
      })
    });

    setTimeout(() => {
      [this.dreams, this.infinite].forEach(i => i.transition('all 4s ease-in-out').filter('saturate(3) blur(0px)'));
    }, 7600);
    const fadeOut = new Animation({
      from: { filter: 'blur(0px)', transform: 'rotate(0deg) scale(1)' },
      to: { filter: 'blur(50px)', transform: 'rotate(25deg) scale(0.2)' }
    });
    setTimeout(() => {
      this.svgContainer.animation(fadeOut.name + ' 8s ease-in-out forwards');
    }, 8000);
  }
}
