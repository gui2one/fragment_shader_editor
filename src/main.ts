import GlslEditor from "glslEditor/build/glslEditor.js";
console.log("main.ts loaded");

let code_editor = document.createElement("div");
code_editor.id = "code_editor";
document.body.appendChild(code_editor);

const glslEditor = new GlslEditor(code_editor, {
  canvas_size: 500,
  canvas_draggable: true,
  theme: "monokai",
  multipleBuffers: false,
  watchHash: true,
  fileDrops: true,
  menu: true,
});
// console.log(glslEditor);
// console.log(glslEditor.editor.options.value);
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
