import GlslEditor from "glslEditor/build/glslEditor";
console.log("main.ts loaded");

let code_editor = document.createElement("div");

document.body.appendChild(code_editor);

const glslEditor = new GlslEditor(code_editor, {
  canvas_size: 500,
  canvas_draggable: false,
  theme: "monokai",
  multipleBuffers: false,
  watchHash: true,
  fileDrops: true,
  menu: true,
});
