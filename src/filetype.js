const extensions = {
  // archives
  tar: "archive",
  sbx: "archive",
  mar: "archive",
  lbr: "archive",
  shar: "archive",
  cpio: "archive",
  ar: "archive",
  a: "archive",
  bz2: "archive",
  gz: "archive",
  lz: "archive",
  lzma: "archive",
  lzo: "archive",
  rz: "archive",
  sfark: "archive",
  sz: "archive",
  xz: "archive",
  z: "archive",
  "7z": "archive",
  s7z: "archive",
  ace: "archive",
  afa: "archive",
  alz: "archive",
  apk: "archive",
  b1: "archive",
  cab: "archive",
  cfs: "archive",
  dar: "archive",
  dgc: "archive",
  dmg: "archive",
  lzx: "archive",
  pak: "archive",
  partimg: "archive",
  sfx: "archive",
  tgz: "archive",
  txz: "archive",
  zz: "archive",
  xar: "archive",
  rar: "archive",
  r00: "archive",

  // zip
  zip: "zip",
  zipx: "zip",

  // main extensions
  ai: "ai",
  avi: "avi",
  css: "css",
  exe: "exe",
  html: "html",
  iso: "iso",
  js: "js",
  json: "json",
  mp3: "mp3",
  mp4: "mp4",
  pdf: "pdf",
  psd: "psd",
  svg: "svg",

  // docs
  csv: "csv",
  doc: "doc",
  docx: "doc",
  docm: "doc",
  dotx: "doc",
  dotm: "doc",

  ppt: "ppt",
  pptx: "ppt",
  pot: "ppt",
  pps: "ppt",
  pptm: "ppt",
  potx: "ppt",
  potm: "ppt",
  ppam: "ppt",
  ppsx: "ppt",
  ppsm: "ppt",
  sldx: "ppt",
  sldm: "ppt",

  rft: "rtf",
  xls: "xls",
  xlt: "xls",
  xlm: "xls",
  xlsx: "xls",
  xlsm: "xls",
  xltx: "xls",
  xltm: "xls",
  xlsb: "xls",
  xlw: "xls",

  txt: "txt",
  xml: "xml",
  xps: "xml",

  // images
  jpg: "jpg",
  png: "png",

  // anything else
  file: "file",
};

const getVectorOf = (ext = "") => {
  let found = Object.keys(extensions).filter((o) => o == ext.toLowerCase());
  if (found.length > 0) return extensions[found[0]];
  return "file";
};

const getExt = (filename) => {
  let ext = filename.split(".");
  return ext.length > 0 ? ext[ext.length - 1] : "";
};

export default {
  getVectorOf,
  getExt,
};
