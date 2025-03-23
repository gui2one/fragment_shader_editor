/* @ts-ignore */
import GlslEditor from "glslEditor/build/glslEditor.js";
import { SideBar } from "./components/side_bar";
import { SideBarItem } from "./components/side_bar_item";
import { LocalStore } from "./localstore";
import { TopBar } from "./components/top_bar";

console.log("main.ts loaded");

let localstore = new LocalStore();
// localstore.add_file("test.glsl", "content before");

let top_bar = new TopBar();
document.body.appendChild(top_bar);

let sidebar = new SideBar("Fragment Shader Editor");
document.body.appendChild(sidebar);

let new_file_button = new SideBarItem("New File", () => {
  localstore.add_file("new_file.glsl", "// your code goes here");
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
      let store = new LocalStore();

      let cur_name = store.get_current_file_name();
      if (cur_name) {
        console.log(cur_name, "!!!!!");

        localstore.set_file_content(cur_name, glslEditor.getContent());
      }

      console.log("save triggered");
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

const btn1 = document.createElement("button");
btn1.id = "btn1";
btn1.innerText = "btn1";
document.body.appendChild(btn1);
btn1.addEventListener("click", () => {
  console.log(glslEditor);
  glslEditor.setContent(`// Author:
// Title:

#ifdef GL_ES
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

    gl_FragColor = vec4(color,1.);
}`);
});

window.addEventListener("current-file-changed", (ev: Event) => {
  let file_name = (ev as CustomEvent).detail;

  glslEditor.setContent(localstore.get_file_content(file_name)!);
});
init_save();
