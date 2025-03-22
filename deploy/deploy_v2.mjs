import { Client } from "basic-ftp";
import { dirname } from "path";
import { createInterface } from "readline";
import { SingleBar, Presets } from "cli-progress";
import getFolderSize from "get-folder-size";
import dotenv from "dotenv";
dotenv.config();

let DISTANT_DIR = process.env.DISTANT_DIR;

if (!DISTANT_DIR) {
  throw new Error("NO DISTANT_DIR SET");
}

const PARENT_DIR = dirname(DISTANT_DIR);
const LOCAL_DIR = process.env.LOCAL_DIR;

if (!LOCAL_DIR) {
  throw new Error("NO LOCAL_DIR SET");
}

var options = {
  port: 21,
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASS,
  secure: true,
  secureOptions: {
    rejectUnauthorized: false, // Accept self-signed certificates
  },
};

let COLORS = {
  Black: 30,
  Red: 31,
  Green: 32,
  Yellow: 33,
  Blue: 34,
  Magenta: 35,
  Cyan: 36,
  White: 37,
};
function color_console_string(message, color_code = COLORS.White) {
  let start = ``;
  console.log(start);
  let end = "";
  let str = `\x1b[${color_code}m${message}${end}\x1b[0m`;
  return str;
}
async function confirmDelete(msg) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(msg, (ans) => {
      rl.close();
      if (ans !== "y") {
        console.warn("aborting ... ");
        resolve(false);
      } else {
        console.warn("removing distant directory content");
        resolve(true);
      }
    });
  });
}
async function init() {
  if (!LOCAL_DIR) {
    throw new Error("NO LOCAL_DIR SET");
  }
  if (!DISTANT_DIR) {
    throw new Error("NO DISTANT_DIR SET");
  }
  const progress = new SingleBar({}, Presets.shades_classic);
  let total_size = await getFolderSize(LOCAL_DIR);
  let bytes_count = 0;
  let client = new Client();
  await client.access(options);
  let message = `About to delete distance folder conent at ${options.host} --- ${DISTANT_DIR}. \nAre you sure ? (y/n) : `;
  let confirm_delete = await confirmDelete(
    color_console_string(message, COLORS.Yellow)
  );

  if (!confirm_delete) process.exit(1);

  try {
    await client.ensureDir(DISTANT_DIR);
    await client.clearWorkingDir();
    progress.start(100, 0);
    client.trackProgress((info) => {
      bytes_count += info.bytes;
      progress.update(Math.floor((bytes_count / total_size.size) * 100));
    });
    await client.uploadFromDir(LOCAL_DIR);
  } finally {
    client.close();
    progress.stop();
    let msg = color_console_string("__DONE__DEPLOY__", COLORS.Green);
    console.log(msg);
  }
}

init();
