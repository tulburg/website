import { PageComponent, SVG } from "@js-native/core/components";
import svg from "./assets/svg";

export default class App extends PageComponent {

  infinite: SVG;
  infiniteOverlay: SVG;
  dreams: SVG;
  dreamsOverlay: SVG;

  constructor() {
    super();
    this.infiniteOverlay = new SVG().width(446).height(280).viewBox('0 0 446 280').fill('none')
      .position('absolute').left('50%').transform('translateX(-50%) scale(1.8)')
      .top(200);
    this.infinite = new SVG().width(446).height(280).viewBox('0 0 446 280').fill('none')
      .position('absolute').left('50%').transform('translateX(-50%) scale(1.8)')
      .top(200);
    this.dreamsOverlay = new SVG().width(501).height(222).viewBox('0 0 501 222').fill('none')
      .position('absolute').left('60%').transform('translateX(-50%) scale(1.8)')
      .top(380);
    this.dreams = new SVG().width(501).height(222).viewBox('0 0 501 222').fill('none')
      .position('absolute').left('60%').transform('translateX(-50%) scale(1.8)')
      .top(380);
    this.addChild(this.infinite, this.infiniteOverlay, this.dreams, this.dreamsOverlay);
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
    })
  }
}
