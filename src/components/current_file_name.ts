import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { LocalStore } from "../localstore";
import { CustomEvents } from "../events";

@customElement("current-file-name")
export class CurrentFileName extends LitElement {
  @property({ type: String }) file_name = "";

  constructor() {
    super();
    window.addEventListener(CustomEvents.CurrentFileChanged, (ev: Event) => {
      this.file_name = (ev as CustomEvent).detail;
    });
    window.addEventListener(CustomEvents.FileCreated, () => {
      this.file_name = "new_file.glsl";
    });
  }

  static styles = css`
    .container {
      display: flex;
    }
    .name {
      min-width: 100px;
      text-align: right;
    }
    .extension {
      margin-right: 1em;
    }
  `;

  file_name_no_extension() {
    return this.file_name.split(".")[0];
  }
  onClickEdit() {
    let localstore = new LocalStore();

    let input = this.shadowRoot?.querySelector(".name") as HTMLDivElement;
    let old_name = localstore.get_current_file_name();
    input?.setAttribute("contenteditable", "true");
    input?.focus();
    input?.addEventListener("blur", (ev: Event) => {
      input?.removeAttribute("contenteditable");

      let new_name = (ev.target as HTMLDivElement).innerText;
      new_name += ".glsl";
      localstore.rename_current_file(old_name!, new_name);
      let rename_ev = new CustomEvent(CustomEvents.CurrentFileRenamed, {
        detail: new_name,
      });
      window.dispatchEvent(rename_ev);
    });
    input?.addEventListener("keypress", (ev: KeyboardEvent) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        input?.blur();
      }
    });
  }
  render() {
    return html`
      <div class="container">
        <div class="name">${this.file_name_no_extension()}</div>
        <div class="extension">.glsl</div>
        <button @click=${this.onClickEdit}>Edit Name</button>
      </div>
    `;
  }
}
