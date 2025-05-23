/* @ts-ignore */
import GlslEditor from "glslEditor/build/glslEditor.js";
import { SideBar } from "./components/side_bar";
import { SideBarItem } from "./components/side_bar_item";
import { LocalStore } from "./localstore";
import { TopBar } from "./components/top_bar";
import { CustomEvents } from "./events";

console.log("main.ts loaded");

let localstore = new LocalStore();

let top_bar = new TopBar();
document.body.appendChild(top_bar);

let sidebar = new SideBar("Fragment Shader Editor");
document.body.appendChild(sidebar);

const default_glsl_code = `#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    color = vec3(st.x,st.y,abs(sin(u_time)));

    gl_FragColor = vec4(color,1.0);
}
`;

let new_file_button = new SideBarItem("New File", () => {
  localstore.add_file("new_file.glsl", default_glsl_code);
  localstore.set_current_file("new_file.glsl");
  let created_ev = new CustomEvent(CustomEvents.FileCreated, {
    detail: "new file !!!!",
  });
  window.dispatchEvent(created_ev);
});
sidebar.appendChild(new_file_button);
let reset_button = new SideBarItem("Reset", () => {});
sidebar.appendChild(reset_button);
let code_editor = document.createElement("div");
code_editor.id = "code_editor";
document.body.appendChild(code_editor);
function init_save() {
  var isCtrl = false;
  document.onkeyup = function (e) {
    if (e.key == "Control") isCtrl = false;
  };

  document.onkeydown = function (e) {
    if (e.key == "Control") isCtrl = true;
    if (e.key == "s" && isCtrl == true) {
      //run code for CTRL+S -- ie, save!

      let cur_name = localstore.get_current_file_name();
      if (cur_name) {
        localstore.set_file_content(cur_name, glslEditor.getContent());
      }

      console.log(`saved file ${cur_name}`);
      return false;
    }
  };
}

const glslEditor = new GlslEditor(code_editor, {
  canvas_size: 500,
  canvas_draggable: true,
  theme: "monokai",
  multipleBuffers: false,
  watchHash: true,
  fileDrops: true,
  menu: true,
});

window.addEventListener(CustomEvents.CurrentFileChanged, (ev: Event) => {
  let file_name = (ev as CustomEvent).detail;
  glslEditor.setContent(localstore.get_file_content(file_name)!);
});

window.addEventListener(CustomEvents.FileDeleted, () => {
  localstore.set_current_file(localstore.get_shader_files()[0].name);
});
init_save();
