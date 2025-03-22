import { html, LitElement, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import GlslEditor from "glslEditor/build/glslEditor";
// import "glslEditor/build/glslEditor.css";

@customElement("code-editor")
export class CodeEditor extends LitElement {
  view: GlslEditor | undefined;
  constructor() {
    super();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    let container = this.querySelector(".container") as HTMLElement;
    const glslEditor = new GlslEditor(container, {
      canvas_size: 500,
      canvas_draggable: false,
      theme: "monokai",
      multipleBuffers: false,
      watchHash: true,
      fileDrops: true,
      menu: true,
    });
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
  render() {
    return html`<div class="container"></div>`;
  }
}
