import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("confirm-dialog")
export class ConfirmDialog extends LitElement {
  cb: Function;
  msg: string;
  constructor(msg: string, cb: () => void) {
    super();
    this.msg = msg;
    this.cb = cb;
  }

  static styles = css`
    :host {
      display: flex;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000000;
      background-color: black;
      width: 100%;
      height: 100vh;
      color: white;

      align-items: center;
      justify-content: center;
    }
  `;

  render() {
    return html`
      <div class="container">
        <div>${this.msg}</div>
        <div class="buttons">
          <button
            @click=${() => {
              this.cb();
              this.remove();
            }}
          >
            OK
          </button>
          <button @click=${this.remove}>Cancel</button>
        </div>
      </div>
    `;
  }
}
