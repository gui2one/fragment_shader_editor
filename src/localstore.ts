import { CustomEvents } from "./events";

export type ShaderFile = {
  name: string;
  content: string;
};

type AppData = {
  shader_files: ShaderFile[];
  current_file: string;
};
export class LocalStore {
  name: string = "fragment_editor";
  data: AppData | null = null;

  constructor() {
    this.load();
    if (this.data === null) {
      this.data = { shader_files: [], current_file: "" };
      this.save();
    }
  }
  save() {
    localStorage.setItem(this.name, JSON.stringify(this.data));
  }

  load(): void {
    let data = localStorage.getItem(this.name);
    this.data = data ? JSON.parse(data) : null;
  }

  get_shader_files(): ShaderFile[] {
    this.load();
    if (!this.data) return [];
    if (!this.data.shader_files) return [];

    return this.data ? this.data.shader_files : [];
  }

  private file_exists(name: string): boolean {
    this.load();
    if (!this.data) return false;
    if (!this.data.shader_files) return false;

    return this.data.shader_files.some((file) => file.name === name);
  }

  get_current_file_name(): string | undefined {
    this.load();
    if (!this.data) return undefined;
    return this.data.current_file;
  }
  get_file_content(file_name: string): string | undefined {
    this.load();
    if (!this.data) return undefined;
    if (!this.data.current_file) return undefined;
    return this.data.shader_files?.find((file) => file.name === file_name)
      ?.content;
  }

  set_current_file(name: string) {
    this.load();
    if (this.data) {
      this.data.current_file = name;
      this.save();
      let ev = new CustomEvent(CustomEvents.CurrentFileChanged, {
        detail: name,
      });
      window.dispatchEvent(ev);
    }
  }
  rename_current_file(old_name: string, new_name: string) {
    this.load();
    if (this.data) {
      this.data.shader_files = this.data.shader_files.map((file) => {
        if (file.name === old_name) {
          file.name = new_name;
        }
        return file;
      });

      this.data.current_file = new_name;
      this.save();
    }
  }
  add_file(name: string, content: string) {
    this.load();
    if (this.file_exists(name)) return;
    this.data?.shader_files?.push({ name, content });
    this.save();
  }

  delete_file(name: string) {
    this.load();
    if (this.data) {
      this.data.current_file = this.data.shader_files[0].name;

      this.data.shader_files = this.data?.shader_files?.filter((file) => {
        return file.name !== name;
      });
      this.save();
    }
  }
  set_file_content(name: string, content: string) {
    this.load();
    if (this.data) {
      this.data.shader_files = this.data?.shader_files?.map((file) => {
        if (file.name === name) file.content = content;
        return file;
      });
      this.save();
    }
  }
}
