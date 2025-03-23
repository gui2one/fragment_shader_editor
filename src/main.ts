/* @ts-ignore */
import GlslEditor from "glslEditor/build/glslEditor.js";
import { SideBar } from "./components/side_bar";
import { SideBarItem } from "./components/side_bar_item";
console.log("main.ts loaded");

let sidebar = new SideBar();
document.body.appendChild(sidebar);
let title = document.createElement("h1");
title.innerText = sidebar.title;
sidebar.appendChild(title);
let item1 = new SideBarItem();
item1.label = "Item 1";
item1.onClick = () => {
  console.log("item 1 clicked");
};
sidebar.appendChild(item1);

let item2 = new SideBarItem();
item2.label = "Item 2";
item2.onClick = () => {
  console.log("item 2 clicked");
};
sidebar.appendChild(item2);

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

init_save();
