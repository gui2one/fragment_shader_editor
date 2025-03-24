import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { LocalStore, ShaderFile } from "../localstore";
import { CustomEvents } from "../events";

@customElement("files-list")
export class FilesList extends LitElement {
  files: ShaderFile[] = [];

  store: LocalStore = new LocalStore();

  @property()
  get current_file(): string | undefined {
    return this.store.get_current_file_name();
  }
  set current_file(value: string | undefined) {
    if (value === this.current_file) return;
    this.store.set_current_file(value!);
    let ev = new CustomEvent(CustomEvents.CurrentFileChanged, {
      detail: value,
    });
    window.dispatchEvent(ev);
  }
  constructor() {
    super();
    this.update_list();
    window.addEventListener(CustomEvents.CurrentFileRenamed, () => {
      console.log("CurrentFileRenamed");

      this.update_list();
      this.requestUpdate();
    });
    window.addEventListener(CustomEvents.FileCreated, () => {
      console.log("File Created");

      this.update_list();
      this.requestUpdate();
    });
  }
  static styles = css`
    :host {
      display: block;
      background-color: white;
      color: black;
      padding: 0.5em;
    }
    .title {
      margin: 0.3em 0;
      font-weight: bold;
      font-size: 0.8em;
    }
    .file-name {
      font-family: "Courier New", Courier, monospace;
      margin: 0.5em 0;
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
  `;
  update_list() {
    let localstore = new LocalStore();
    this.files = localstore.get_shader_files();
  }

  render() {
    return html`<div class="title">Your Files (local storage)</div>
      ${this.files.map((file) => {
        return html`
          <div
            class="file-name"
            @click=${() => {
              this.current_file = file.name;
            }}
          >
            ${file.name}
          </div>
        `;
      })} `;
  }
}
