import { css, html, LitElement, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import { Application, Filter, Rectangle } from "pixijs";

@customElement("fragment-canvas")
export class FragmentCanvas extends LitElement {
  private app: Application;

  static styles = css`
    :host {
      display: block;
      position: relative;
      padding: 0;
      margin: 0;
      width: 50%;
      height: 100vh;
    }
    .container {
      width: 100%;
      height: 100%;
      outline: 2px solid blue;
    }
    canvas {
      display: block;

      padding: 0;
      margin: 0;
    }
  `;
  constructor() {
    super();
    this.app = new Application({
      antialias: true,
    });

    // Fragment shader (GLSL)
    const fragmentShader = `
      precision mediump float;
      varying vec2 vTextureCoord;


      void main() {

          gl_FragColor = vec4(vTextureCoord, 0.0, 1.0);
      }
      `;

    // Create a PIXI filter with the shader
    const filter = new Filter(undefined, fragmentShader, {
      time: 0,
      resolution: [this.app.screen.width, this.app.screen.height],
    });

    this.app.stage.filterArea = this.app.screen;
    this.app.stage.filters = [filter];
    // Update shader time uniform
    this.app.ticker.add((delta) => {
      filter.uniforms["time"] += delta * 0.05; // Animate over time
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    let container = this.shadowRoot?.querySelector(".container") as HTMLElement;
    console.log(container);

    if (container) {
      window.addEventListener("resize", () => {
        this.app.renderer.resize(container.offsetWidth, container.offsetHeight);
        let rect = container.getBoundingClientRect();
        this.app.stage.filterArea = new Rectangle(
          rect.left,
          rect.top,
          rect.width,
          rect.height
        );
      });

      window.dispatchEvent(new Event("resize"));
    }
  }
  render() {
    return html`<div class="container">${this.app.view}</div> `;
  }
}
