import { createRequire } from "node:module";
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = /* @__PURE__ */ createRequire(import.meta.url);

// node_modules/@napi-rs/canvas-linux-x64-musl/skia.linux-x64-musl.node
var require_skia_linux_x64_musl = __commonJS((exports, module) => {
  module.exports = __require("./skia.linux-x64-musl-sbsaf71t.node");
});

// node_modules/@napi-rs/canvas-linux-x64-gnu/skia.linux-x64-gnu.node
var require_skia_linux_x64_gnu = __commonJS((exports, module) => {
  module.exports = __require("./skia.linux-x64-gnu-znngvktt.node");
});

// node_modules/@napi-rs/canvas/js-binding.js
var require_js_binding = __commonJS((exports, module) => {
  var { readFileSync } = __require("fs");
  var nativeBinding = null;
  var loadErrors = [];
  var isMusl = () => {
    let musl = false;
    if (process.platform === "linux") {
      musl = isMuslFromFilesystem();
      if (musl === null) {
        musl = isMuslFromReport();
      }
      if (musl === null) {
        musl = isMuslFromChildProcess();
      }
    }
    return musl;
  };
  var isFileMusl = (f) => f.includes("libc.musl-") || f.includes("ld-musl-");
  var isMuslFromFilesystem = () => {
    try {
      return readFileSync("/usr/bin/ldd", "utf-8").includes("musl");
    } catch {
      return null;
    }
  };
  var isMuslFromReport = () => {
    let report = null;
    if (typeof process.report?.getReport === "function") {
      process.report.excludeNetwork = true;
      report = process.report.getReport();
    }
    if (!report) {
      return null;
    }
    if (report.header && report.header.glibcVersionRuntime) {
      return false;
    }
    if (Array.isArray(report.sharedObjects)) {
      if (report.sharedObjects.some(isFileMusl)) {
        return true;
      }
    }
    return false;
  };
  var isMuslFromChildProcess = () => {
    try {
      return __require("child_process").execSync("ldd --version", { encoding: "utf8" }).includes("musl");
    } catch (e) {
      return false;
    }
  };
  function requireNative() {
    if (process.env.NAPI_RS_NATIVE_LIBRARY_PATH) {
      try {
        return __require(process.env.NAPI_RS_NATIVE_LIBRARY_PATH);
      } catch (err) {
        loadErrors.push(err);
      }
    } else if (process.platform === "android") {
      if (process.arch === "arm64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.android-arm64.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-android-arm64");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "arm") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.android-arm-eabi.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-android-arm-eabi");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        loadErrors.push(new Error(`Unsupported architecture on Android ${process.arch}`));
      }
    } else if (process.platform === "win32") {
      if (process.arch === "x64") {
        if (process.config?.variables?.shlib_suffix === "dll.a" || process.config?.variables?.node_target_type === "shared_library") {
          try {
            return (()=>{throw new Error("Cannot require module "+"./skia.win32-x64-gnu.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-win32-x64-gnu");})();
          } catch (e) {
            loadErrors.push(e);
          }
        } else {
          try {
            return (()=>{throw new Error("Cannot require module "+"./skia.win32-x64-msvc.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-win32-x64-msvc");})();
          } catch (e) {
            loadErrors.push(e);
          }
        }
      } else if (process.arch === "ia32") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.win32-ia32-msvc.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-win32-ia32-msvc");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "arm64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.win32-arm64-msvc.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-win32-arm64-msvc");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        loadErrors.push(new Error(`Unsupported architecture on Windows: ${process.arch}`));
      }
    } else if (process.platform === "darwin") {
      try {
        return (()=>{throw new Error("Cannot require module "+"./skia.darwin-universal.node");})();
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-darwin-universal");})();
      } catch (e) {
        loadErrors.push(e);
      }
      if (process.arch === "x64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.darwin-x64.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-darwin-x64");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "arm64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.darwin-arm64.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-darwin-arm64");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        loadErrors.push(new Error(`Unsupported architecture on macOS: ${process.arch}`));
      }
    } else if (process.platform === "freebsd") {
      if (process.arch === "x64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.freebsd-x64.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-freebsd-x64");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "arm64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.freebsd-arm64.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-freebsd-arm64");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        loadErrors.push(new Error(`Unsupported architecture on FreeBSD: ${process.arch}`));
      }
    } else if (process.platform === "linux") {
      if (process.arch === "x64") {
        if (isMusl()) {
          try {
            return (()=>{throw new Error("Cannot require module "+"./skia.linux-x64-musl.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return require_skia_linux_x64_musl();
          } catch (e) {
            loadErrors.push(e);
          }
        } else {
          try {
            return (()=>{throw new Error("Cannot require module "+"./skia.linux-x64-gnu.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return require_skia_linux_x64_gnu();
          } catch (e) {
            loadErrors.push(e);
          }
        }
      } else if (process.arch === "arm64") {
        if (isMusl()) {
          try {
            return (()=>{throw new Error("Cannot require module "+"./skia.linux-arm64-musl.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-linux-arm64-musl");})();
          } catch (e) {
            loadErrors.push(e);
          }
        } else {
          try {
            return (()=>{throw new Error("Cannot require module "+"./skia.linux-arm64-gnu.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-linux-arm64-gnu");})();
          } catch (e) {
            loadErrors.push(e);
          }
        }
      } else if (process.arch === "arm") {
        if (isMusl()) {
          try {
            return (()=>{throw new Error("Cannot require module "+"./skia.linux-arm-musleabihf.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-linux-arm-musleabihf");})();
          } catch (e) {
            loadErrors.push(e);
          }
        } else {
          try {
            return (()=>{throw new Error("Cannot require module "+"./skia.linux-arm-gnueabihf.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-linux-arm-gnueabihf");})();
          } catch (e) {
            loadErrors.push(e);
          }
        }
      } else if (process.arch === "loong64") {
        if (isMusl()) {
          try {
            return (()=>{throw new Error("Cannot require module "+"./skia.linux-loong64-musl.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-linux-loong64-musl");})();
          } catch (e) {
            loadErrors.push(e);
          }
        } else {
          try {
            return (()=>{throw new Error("Cannot require module "+"./skia.linux-loong64-gnu.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-linux-loong64-gnu");})();
          } catch (e) {
            loadErrors.push(e);
          }
        }
      } else if (process.arch === "riscv64") {
        if (isMusl()) {
          try {
            return (()=>{throw new Error("Cannot require module "+"./skia.linux-riscv64-musl.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-linux-riscv64-musl");})();
          } catch (e) {
            loadErrors.push(e);
          }
        } else {
          try {
            return (()=>{throw new Error("Cannot require module "+"./skia.linux-riscv64-gnu.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-linux-riscv64-gnu");})();
          } catch (e) {
            loadErrors.push(e);
          }
        }
      } else if (process.arch === "ppc64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.linux-ppc64-gnu.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-linux-ppc64-gnu");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "s390x") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.linux-s390x-gnu.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-linux-s390x-gnu");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        loadErrors.push(new Error(`Unsupported architecture on Linux: ${process.arch}`));
      }
    } else if (process.platform === "openharmony") {
      if (process.arch === "arm64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.openharmony-arm64.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-openharmony-arm64");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "x64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.openharmony-x64.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-openharmony-x64");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "arm") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./skia.openharmony-arm.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-openharmony-arm");})();
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        loadErrors.push(new Error(`Unsupported architecture on OpenHarmony: ${process.arch}`));
      }
    } else {
      loadErrors.push(new Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`));
    }
  }
  nativeBinding = requireNative();
  if (!nativeBinding || process.env.NAPI_RS_FORCE_WASI) {
    let wasiBinding = null;
    let wasiBindingError = null;
    try {
      wasiBinding = (()=>{throw new Error("Cannot require module "+"./skia.wasi.cjs");})();
      nativeBinding = wasiBinding;
    } catch (err) {
      if (process.env.NAPI_RS_FORCE_WASI) {
        wasiBindingError = err;
      }
    }
    if (!nativeBinding) {
      try {
        wasiBinding = (()=>{throw new Error("Cannot require module "+"@napi-rs/canvas-wasm32-wasi");})();
        nativeBinding = wasiBinding;
      } catch (err) {
        if (process.env.NAPI_RS_FORCE_WASI) {
          wasiBindingError.cause = err;
          loadErrors.push(err);
        }
      }
    }
  }
  if (!nativeBinding) {
    if (loadErrors.length > 0) {
      throw new Error(`Cannot find native binding. ` + `npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). ` + "Please try `npm i` again after removing both package-lock.json and node_modules directory.", {
        cause: loadErrors.reduce((err, cur) => {
          cur.cause = err;
          return cur;
        })
      });
    }
    throw new Error(`Failed to load native binding`);
  }
  module.exports = nativeBinding;
  module.exports.GlobalFonts = nativeBinding.GlobalFonts;
  module.exports.CanvasElement = nativeBinding.CanvasElement;
  module.exports.CanvasGradient = nativeBinding.CanvasGradient;
  module.exports.CanvasPattern = nativeBinding.CanvasPattern;
  module.exports.CanvasRenderingContext2D = nativeBinding.CanvasRenderingContext2D;
  module.exports.FontKey = nativeBinding.FontKey;
  module.exports.Image = nativeBinding.Image;
  module.exports.ImageData = nativeBinding.ImageData;
  module.exports.Path = nativeBinding.Path;
  module.exports.PdfDocument = nativeBinding.PdfDocument;
  module.exports.SVGCanvas = nativeBinding.SVGCanvas;
  module.exports.ChromaSubsampling = nativeBinding.ChromaSubsampling;
  module.exports.clearAllCache = nativeBinding.clearAllCache;
  module.exports.convertSVGTextToPath = nativeBinding.convertSVGTextToPath;
  module.exports.FillType = nativeBinding.FillType;
  module.exports.PathOp = nativeBinding.PathOp;
  module.exports.StrokeCap = nativeBinding.StrokeCap;
  module.exports.StrokeJoin = nativeBinding.StrokeJoin;
  module.exports.SvgExportFlag = nativeBinding.SvgExportFlag;
  module.exports.GifEncoder = nativeBinding.GifEncoder;
  module.exports.GifDisposal = nativeBinding.GifDisposal;
});

// node_modules/@napi-rs/canvas/geometry.js
var require_geometry = __commonJS((exports, module) => {
  var { inspect } = __require("util");

  class DOMPoint {
    constructor(x = 0, y = 0, z = 0, w = 1) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    }
    static fromPoint(otherPoint) {
      return new DOMPoint(otherPoint.x, otherPoint.y, otherPoint.z !== undefined ? otherPoint.z : 0, otherPoint.w !== undefined ? otherPoint.w : 1);
    }
    matrixTransform(matrix) {
      if ((matrix.is2D || matrix instanceof SVGMatrix) && this.z === 0 && this.w === 1) {
        return new DOMPoint(this.x * matrix.a + this.y * matrix.c + matrix.e, this.x * matrix.b + this.y * matrix.d + matrix.f, 0, 1);
      } else {
        return new DOMPoint(this.x * matrix.m11 + this.y * matrix.m21 + this.z * matrix.m31 + this.w * matrix.m41, this.x * matrix.m12 + this.y * matrix.m22 + this.z * matrix.m32 + this.w * matrix.m42, this.x * matrix.m13 + this.y * matrix.m23 + this.z * matrix.m33 + this.w * matrix.m43, this.x * matrix.m14 + this.y * matrix.m24 + this.z * matrix.m34 + this.w * matrix.m44);
      }
    }
    toJSON() {
      return {
        x: this.x,
        y: this.y,
        z: this.z,
        w: this.w
      };
    }
  }

  class DOMRect {
    constructor(x = 0, y = 0, width = 0, height = 0) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    static fromRect(otherRect) {
      return new DOMRect(otherRect.x, otherRect.y, otherRect.width, otherRect.height);
    }
    get top() {
      return this.y;
    }
    get left() {
      return this.x;
    }
    get right() {
      return this.x + this.width;
    }
    get bottom() {
      return this.y + this.height;
    }
    toJSON() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        top: this.top,
        left: this.left,
        right: this.right,
        bottom: this.bottom
      };
    }
  }
  for (const propertyName of ["top", "right", "bottom", "left"]) {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(DOMRect.prototype, propertyName);
    propertyDescriptor.enumerable = true;
    Object.defineProperty(DOMRect.prototype, propertyName, propertyDescriptor);
  }
  var M11 = 0;
  var M12 = 1;
  var M13 = 2;
  var M14 = 3;
  var M21 = 4;
  var M22 = 5;
  var M23 = 6;
  var M24 = 7;
  var M31 = 8;
  var M32 = 9;
  var M33 = 10;
  var M34 = 11;
  var M41 = 12;
  var M42 = 13;
  var M43 = 14;
  var M44 = 15;
  var A = M11;
  var B = M12;
  var C = M21;
  var D = M22;
  var E = M41;
  var F = M42;
  var DEGREE_PER_RAD = 180 / Math.PI;
  var RAD_PER_DEGREE = Math.PI / 180;
  var VALUES = Symbol("values");
  var IS_2D = Symbol("is2D");
  function parseMatrix(init) {
    let parsed = init.replace(/matrix\(/, "").split(/,/, 7);
    if (parsed.length !== 6) {
      throw new Error(`Failed to parse ${init}`);
    }
    parsed = parsed.map(parseFloat);
    return [parsed[0], parsed[1], 0, 0, parsed[2], parsed[3], 0, 0, 0, 0, 1, 0, parsed[4], parsed[5], 0, 1];
  }
  function parseMatrix3d(init) {
    const parsed = init.replace(/matrix3d\(/, "").split(/,/, 17);
    if (parsed.length !== 16) {
      throw new Error(`Failed to parse ${init}`);
    }
    return parsed.map(parseFloat);
  }
  function parseTransform(tform) {
    const type = tform.split(/\(/, 1)[0];
    if (type === "matrix") {
      return parseMatrix(tform);
    } else if (type === "matrix3d") {
      return parseMatrix3d(tform);
    } else {
      throw new Error(`${type} parsing not implemented`);
    }
  }
  var setNumber2D = (receiver, index, value) => {
    if (typeof value !== "number") {
      throw new TypeError("Expected number");
    }
    receiver[VALUES][index] = value;
  };
  var setNumber3D = (receiver, index, value) => {
    if (typeof value !== "number") {
      throw new TypeError("Expected number");
    }
    if (index === M33 || index === M44) {
      if (value !== 1) {
        receiver[IS_2D] = false;
      }
    } else if (value !== 0) {
      receiver[IS_2D] = false;
    }
    receiver[VALUES][index] = value;
  };
  var newInstance = (values) => {
    const instance = Object.create(DOMMatrix.prototype);
    instance.constructor = DOMMatrix;
    instance[IS_2D] = true;
    instance[VALUES] = values;
    return instance;
  };
  var multiply = (first, second) => {
    const dest = new Float64Array(16);
    for (let i = 0;i < 4; i++) {
      for (let j = 0;j < 4; j++) {
        let sum = 0;
        for (let k = 0;k < 4; k++) {
          sum += first[i * 4 + k] * second[k * 4 + j];
        }
        dest[i * 4 + j] = sum;
      }
    }
    return dest;
  };

  class DOMMatrix {
    get m11() {
      return this[VALUES][M11];
    }
    set m11(value) {
      setNumber2D(this, M11, value);
    }
    get m12() {
      return this[VALUES][M12];
    }
    set m12(value) {
      setNumber2D(this, M12, value);
    }
    get m13() {
      return this[VALUES][M13];
    }
    set m13(value) {
      setNumber3D(this, M13, value);
    }
    get m14() {
      return this[VALUES][M14];
    }
    set m14(value) {
      setNumber3D(this, M14, value);
    }
    get m21() {
      return this[VALUES][M21];
    }
    set m21(value) {
      setNumber2D(this, M21, value);
    }
    get m22() {
      return this[VALUES][M22];
    }
    set m22(value) {
      setNumber2D(this, M22, value);
    }
    get m23() {
      return this[VALUES][M23];
    }
    set m23(value) {
      setNumber3D(this, M23, value);
    }
    get m24() {
      return this[VALUES][M24];
    }
    set m24(value) {
      setNumber3D(this, M24, value);
    }
    get m31() {
      return this[VALUES][M31];
    }
    set m31(value) {
      setNumber3D(this, M31, value);
    }
    get m32() {
      return this[VALUES][M32];
    }
    set m32(value) {
      setNumber3D(this, M32, value);
    }
    get m33() {
      return this[VALUES][M33];
    }
    set m33(value) {
      setNumber3D(this, M33, value);
    }
    get m34() {
      return this[VALUES][M34];
    }
    set m34(value) {
      setNumber3D(this, M34, value);
    }
    get m41() {
      return this[VALUES][M41];
    }
    set m41(value) {
      setNumber2D(this, M41, value);
    }
    get m42() {
      return this[VALUES][M42];
    }
    set m42(value) {
      setNumber2D(this, M42, value);
    }
    get m43() {
      return this[VALUES][M43];
    }
    set m43(value) {
      setNumber3D(this, M43, value);
    }
    get m44() {
      return this[VALUES][M44];
    }
    set m44(value) {
      setNumber3D(this, M44, value);
    }
    get a() {
      return this[VALUES][A];
    }
    set a(value) {
      setNumber2D(this, A, value);
    }
    get b() {
      return this[VALUES][B];
    }
    set b(value) {
      setNumber2D(this, B, value);
    }
    get c() {
      return this[VALUES][C];
    }
    set c(value) {
      setNumber2D(this, C, value);
    }
    get d() {
      return this[VALUES][D];
    }
    set d(value) {
      setNumber2D(this, D, value);
    }
    get e() {
      return this[VALUES][E];
    }
    set e(value) {
      setNumber2D(this, E, value);
    }
    get f() {
      return this[VALUES][F];
    }
    set f(value) {
      setNumber2D(this, F, value);
    }
    get is2D() {
      return this[IS_2D];
    }
    get isIdentity() {
      const values = this[VALUES];
      return values[M11] === 1 && values[M12] === 0 && values[M13] === 0 && values[M14] === 0 && values[M21] === 0 && values[M22] === 1 && values[M23] === 0 && values[M24] === 0 && values[M31] === 0 && values[M32] === 0 && values[M33] === 1 && values[M34] === 0 && values[M41] === 0 && values[M42] === 0 && values[M43] === 0 && values[M44] === 1;
    }
    static fromMatrix(init) {
      if (init instanceof DOMMatrix) {
        return new DOMMatrix(init[VALUES]);
      } else if (init instanceof SVGMatrix) {
        return new DOMMatrix([init.a, init.b, init.c, init.d, init.e, init.f]);
      } else {
        throw new TypeError("Expected DOMMatrix");
      }
    }
    static fromFloat32Array(init) {
      if (!(init instanceof Float32Array))
        throw new TypeError("Expected Float32Array");
      return new DOMMatrix(init);
    }
    static fromFloat64Array(init) {
      if (!(init instanceof Float64Array))
        throw new TypeError("Expected Float64Array");
      return new DOMMatrix(init);
    }
    constructor(init) {
      this[IS_2D] = true;
      this[VALUES] = new Float64Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      if (typeof init === "string") {
        if (init === "") {
          return;
        } else {
          const tforms = init.split(/\)\s+/, 20).map(parseTransform);
          if (tforms.length === 0) {
            return;
          }
          init = tforms[0];
          for (let i2 = 1;i2 < tforms.length; i2++) {
            init = multiply(tforms[i2], init);
          }
        }
      }
      let i = 0;
      if (init && init.length === 6) {
        setNumber2D(this, A, init[i++]);
        setNumber2D(this, B, init[i++]);
        setNumber2D(this, C, init[i++]);
        setNumber2D(this, D, init[i++]);
        setNumber2D(this, E, init[i++]);
        setNumber2D(this, F, init[i++]);
      } else if (init && init.length === 16) {
        setNumber2D(this, M11, init[i++]);
        setNumber2D(this, M12, init[i++]);
        setNumber3D(this, M13, init[i++]);
        setNumber3D(this, M14, init[i++]);
        setNumber2D(this, M21, init[i++]);
        setNumber2D(this, M22, init[i++]);
        setNumber3D(this, M23, init[i++]);
        setNumber3D(this, M24, init[i++]);
        setNumber3D(this, M31, init[i++]);
        setNumber3D(this, M32, init[i++]);
        setNumber3D(this, M33, init[i++]);
        setNumber3D(this, M34, init[i++]);
        setNumber2D(this, M41, init[i++]);
        setNumber2D(this, M42, init[i++]);
        setNumber3D(this, M43, init[i++]);
        setNumber3D(this, M44, init[i]);
      } else if (init !== undefined) {
        throw new TypeError("Expected string or array.");
      }
    }
    dump() {
      const mat = this[VALUES];
      console.info([mat.slice(0, 4), mat.slice(4, 8), mat.slice(8, 12), mat.slice(12, 16)]);
    }
    [inspect.custom](depth) {
      if (depth < 0)
        return "[DOMMatrix]";
      const { a, b, c, d, e, f, is2D, isIdentity } = this;
      if (this.is2D) {
        return `DOMMatrix ${inspect({ a, b, c, d, e, f, is2D, isIdentity }, { colors: true })}`;
      } else {
        const { m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44, is2D: is2D2, isIdentity: isIdentity2 } = this;
        return `DOMMatrix ${inspect({
          a,
          b,
          c,
          d,
          e,
          f,
          m11,
          m12,
          m13,
          m14,
          m21,
          m22,
          m23,
          m24,
          m31,
          m32,
          m33,
          m34,
          m41,
          m42,
          m43,
          m44,
          is2D: is2D2,
          isIdentity: isIdentity2
        }, { colors: true })}`;
      }
    }
    multiply(other) {
      return newInstance(this[VALUES]).multiplySelf(other);
    }
    multiplySelf(other) {
      this[VALUES] = multiply(other[VALUES], this[VALUES]);
      if (!other.is2D) {
        this[IS_2D] = false;
      }
      return this;
    }
    preMultiplySelf(other) {
      this[VALUES] = multiply(this[VALUES], other[VALUES]);
      if (!other.is2D) {
        this[IS_2D] = false;
      }
      return this;
    }
    translate(tx, ty, tz) {
      return newInstance(this[VALUES]).translateSelf(tx, ty, tz);
    }
    translateSelf(tx = 0, ty = 0, tz = 0) {
      this[VALUES] = multiply([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1], this[VALUES]);
      if (tz !== 0) {
        this[IS_2D] = false;
      }
      return this;
    }
    scale(scaleX, scaleY, scaleZ, originX, originY, originZ) {
      return newInstance(this[VALUES]).scaleSelf(scaleX, scaleY, scaleZ, originX, originY, originZ);
    }
    scale3d(scale, originX, originY, originZ) {
      return newInstance(this[VALUES]).scale3dSelf(scale, originX, originY, originZ);
    }
    scale3dSelf(scale, originX, originY, originZ) {
      return this.scaleSelf(scale, scale, scale, originX, originY, originZ);
    }
    scaleSelf(scaleX, scaleY, scaleZ, originX, originY, originZ) {
      if (typeof originX !== "number")
        originX = 0;
      if (typeof originY !== "number")
        originY = 0;
      if (typeof originZ !== "number")
        originZ = 0;
      this.translateSelf(originX, originY, originZ);
      if (typeof scaleX !== "number")
        scaleX = 1;
      if (typeof scaleY !== "number")
        scaleY = scaleX;
      if (typeof scaleZ !== "number")
        scaleZ = 1;
      this[VALUES] = multiply([scaleX, 0, 0, 0, 0, scaleY, 0, 0, 0, 0, scaleZ, 0, 0, 0, 0, 1], this[VALUES]);
      this.translateSelf(-originX, -originY, -originZ);
      if (scaleZ !== 1 || originZ !== 0) {
        this[IS_2D] = false;
      }
      return this;
    }
    rotateFromVector(x, y) {
      return newInstance(this[VALUES]).rotateFromVectorSelf(x, y);
    }
    rotateFromVectorSelf(x = 0, y = 0) {
      const theta = x === 0 && y === 0 ? 0 : Math.atan2(y, x) * DEGREE_PER_RAD;
      return this.rotateSelf(theta);
    }
    rotate(rotX, rotY, rotZ) {
      return newInstance(this[VALUES]).rotateSelf(rotX, rotY, rotZ);
    }
    rotateSelf(rotX, rotY, rotZ) {
      if (rotY === undefined && rotZ === undefined) {
        rotZ = rotX;
        rotX = rotY = 0;
      }
      if (typeof rotY !== "number")
        rotY = 0;
      if (typeof rotZ !== "number")
        rotZ = 0;
      if (rotX !== 0 || rotY !== 0) {
        this[IS_2D] = false;
      }
      rotX *= RAD_PER_DEGREE;
      rotY *= RAD_PER_DEGREE;
      rotZ *= RAD_PER_DEGREE;
      let c = Math.cos(rotZ);
      let s = Math.sin(rotZ);
      this[VALUES] = multiply([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this[VALUES]);
      c = Math.cos(rotY);
      s = Math.sin(rotY);
      this[VALUES] = multiply([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1], this[VALUES]);
      c = Math.cos(rotX);
      s = Math.sin(rotX);
      this[VALUES] = multiply([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1], this[VALUES]);
      return this;
    }
    rotateAxisAngle(x, y, z, angle) {
      return newInstance(this[VALUES]).rotateAxisAngleSelf(x, y, z, angle);
    }
    rotateAxisAngleSelf(x = 0, y = 0, z = 0, angle = 0) {
      const length = Math.sqrt(x * x + y * y + z * z);
      if (length === 0) {
        return this;
      }
      if (length !== 1) {
        x /= length;
        y /= length;
        z /= length;
      }
      angle *= RAD_PER_DEGREE;
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const t = 1 - c;
      const tx = t * x;
      const ty = t * y;
      this[VALUES] = multiply([
        tx * x + c,
        tx * y + s * z,
        tx * z - s * y,
        0,
        tx * y - s * z,
        ty * y + c,
        ty * z + s * x,
        0,
        tx * z + s * y,
        ty * z - s * x,
        t * z * z + c,
        0,
        0,
        0,
        0,
        1
      ], this[VALUES]);
      if (x !== 0 || y !== 0) {
        this[IS_2D] = false;
      }
      return this;
    }
    skewX(sx) {
      return newInstance(this[VALUES]).skewXSelf(sx);
    }
    skewXSelf(sx) {
      if (typeof sx !== "number") {
        return this;
      }
      const t = Math.tan(sx * RAD_PER_DEGREE);
      this[VALUES] = multiply([1, 0, 0, 0, t, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this[VALUES]);
      return this;
    }
    skewY(sy) {
      return newInstance(this[VALUES]).skewYSelf(sy);
    }
    skewYSelf(sy) {
      if (typeof sy !== "number") {
        return this;
      }
      const t = Math.tan(sy * RAD_PER_DEGREE);
      this[VALUES] = multiply([1, t, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this[VALUES]);
      return this;
    }
    flipX() {
      return newInstance(multiply([-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this[VALUES]));
    }
    flipY() {
      return newInstance(multiply([1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this[VALUES]));
    }
    inverse() {
      return newInstance(this[VALUES].slice()).invertSelf();
    }
    invertSelf() {
      if (this[IS_2D]) {
        const det = this[VALUES][A] * this[VALUES][D] - this[VALUES][B] * this[VALUES][C];
        if (det !== 0) {
          const newA = this[VALUES][D] / det;
          const newB = -this[VALUES][B] / det;
          const newC = -this[VALUES][C] / det;
          const newD = this[VALUES][A] / det;
          const newE = (this[VALUES][C] * this[VALUES][F] - this[VALUES][D] * this[VALUES][E]) / det;
          const newF = (this[VALUES][B] * this[VALUES][E] - this[VALUES][A] * this[VALUES][F]) / det;
          this.a = newA;
          this.b = newB;
          this.c = newC;
          this.d = newD;
          this.e = newE;
          this.f = newF;
          return this;
        } else {
          this[IS_2D] = false;
          this[VALUES] = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
          return this;
        }
      } else {
        throw new Error("3D matrix inversion is not implemented.");
      }
    }
    setMatrixValue(transformList) {
      const temp = new DOMMatrix(transformList);
      this[VALUES] = temp[VALUES];
      this[IS_2D] = temp[IS_2D];
      return this;
    }
    transformPoint(point) {
      const x = point.x || 0;
      const y = point.y || 0;
      const z = point.z || 0;
      const w = point.w || 1;
      const values = this[VALUES];
      const nx = values[M11] * x + values[M21] * y + values[M31] * z + values[M41] * w;
      const ny = values[M12] * x + values[M22] * y + values[M32] * z + values[M42] * w;
      const nz = values[M13] * x + values[M23] * y + values[M33] * z + values[M43] * w;
      const nw = values[M14] * x + values[M24] * y + values[M34] * z + values[M44] * w;
      return new DOMPoint(nx, ny, nz, nw);
    }
    toFloat32Array() {
      return Float32Array.from(this[VALUES]);
    }
    toFloat64Array() {
      return this[VALUES].slice(0);
    }
    toJSON() {
      return {
        a: this.a,
        b: this.b,
        c: this.c,
        d: this.d,
        e: this.e,
        f: this.f,
        m11: this.m11,
        m12: this.m12,
        m13: this.m13,
        m14: this.m14,
        m21: this.m21,
        m22: this.m22,
        m23: this.m23,
        m24: this.m24,
        m31: this.m31,
        m32: this.m32,
        m33: this.m33,
        m34: this.m34,
        m41: this.m41,
        m42: this.m42,
        m43: this.m43,
        m44: this.m44,
        is2D: this.is2D,
        isIdentity: this.isIdentity
      };
    }
    toString() {
      if (this.is2D) {
        return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`;
      } else {
        return `matrix3d(${this[VALUES].join(", ")})`;
      }
    }
  }
  for (const propertyName of [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "m11",
    "m12",
    "m13",
    "m14",
    "m21",
    "m22",
    "m23",
    "m24",
    "m31",
    "m32",
    "m33",
    "m34",
    "m41",
    "m42",
    "m43",
    "m44",
    "is2D",
    "isIdentity"
  ]) {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(DOMMatrix.prototype, propertyName);
    propertyDescriptor.enumerable = true;
    Object.defineProperty(DOMMatrix.prototype, propertyName, propertyDescriptor);
  }
  module.exports = { DOMPoint, DOMMatrix, DOMRect };
});

// node_modules/@napi-rs/canvas/load-image.js
var require_load_image = __commonJS((exports, module) => {
  var fs = __require("fs");
  var { Readable } = __require("stream");
  var { URL } = __require("url");
  var { Image } = require_js_binding();
  var http;
  var https;
  var MAX_REDIRECTS = 20;
  var REDIRECT_STATUSES = new Set([301, 302]);
  module.exports = async function loadImage(source, options = {}) {
    if (Buffer.isBuffer(source) || source instanceof Uint8Array)
      return createImage(source, options.alt);
    if (source instanceof Readable)
      return createImage(await consumeStream(source), options.alt);
    if (source instanceof ArrayBuffer || source instanceof SharedArrayBuffer)
      return createImage(new Uint8Array(source), options.alt);
    if (isBufferLike(source))
      return createImage(Buffer.from(source), options.alt);
    if (source instanceof Image)
      return createImage(source.src, options.alt);
    if (typeof source === "string" && source.trimStart().startsWith("data:")) {
      const commaIdx = source.indexOf(",");
      const encoding = source.lastIndexOf("base64", commaIdx) < 0 ? "utf-8" : "base64";
      const data = Buffer.from(source.slice(commaIdx + 1), encoding);
      return createImage(data, options.alt);
    }
    if (typeof source === "string") {
      if (!source.startsWith("http") && !source.startsWith("https") && await exists(source)) {
        return createImage(source, options.alt);
      } else {
        source = new URL(source);
        const data = await new Promise((resolve, reject) => makeRequest(source, resolve, reject, typeof options.maxRedirects === "number" && options.maxRedirects >= 0 ? options.maxRedirects : MAX_REDIRECTS, options.requestOptions));
        return createImage(data, options.alt);
      }
    }
    if (source instanceof URL) {
      if (source.protocol === "file:") {
        return createImage(process.platform === "win32" ? source.pathname.substring(1) : source.pathname, options.alt);
      } else {
        const data = await new Promise((resolve, reject) => makeRequest(source, resolve, reject, typeof options.maxRedirects === "number" && options.maxRedirects >= 0 ? options.maxRedirects : MAX_REDIRECTS, options.requestOptions));
        return createImage(data, options.alt);
      }
    }
    throw new TypeError("unsupported image source");
  };
  function makeRequest(url, resolve, reject, redirectCount, requestOptions) {
    const isHttps = url.protocol === "https:";
    const lib = isHttps ? !https ? https = __require("https") : https : !http ? http = __require("http") : http;
    lib.get(url.toString(), requestOptions || {}, (res) => {
      try {
        const shouldRedirect = REDIRECT_STATUSES.has(res.statusCode) && typeof res.headers.location === "string";
        if (shouldRedirect && redirectCount > 0)
          return makeRequest(new URL(res.headers.location, url.origin), resolve, reject, redirectCount - 1, requestOptions);
        if (typeof res.statusCode === "number" && (res.statusCode < 200 || res.statusCode >= 300)) {
          return reject(new Error(`remote source rejected with status code ${res.statusCode}`));
        }
        consumeStream(res).then(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }).on("error", reject);
  }
  function consumeStream(res) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
  }
  async function createImage(src, alt) {
    const image = new Image;
    if (typeof alt === "string")
      image.alt = alt;
    return new Promise((resolve, reject) => {
      image.onload = () => {
        image.decode().then(() => resolve(image), reject);
      };
      image.onerror = (e) => reject(e);
      image.src = src;
    });
  }
  function isBufferLike(src) {
    return src && src.type === "Buffer" || Array.isArray(src);
  }
  async function exists(path) {
    try {
      await fs.promises.access(path, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }
});

// node_modules/@napi-rs/canvas/index.js
var require_canvas = __commonJS((exports, module) => {
  var { platform, homedir } = __require("os");
  var { join } = __require("path");
  var {
    clearAllCache,
    CanvasRenderingContext2D,
    CanvasElement,
    SVGCanvas,
    Path: Path2D,
    ImageData,
    Image,
    FontKey,
    GlobalFonts,
    PathOp,
    FillType,
    StrokeJoin,
    StrokeCap,
    convertSVGTextToPath,
    PdfDocument,
    GifEncoder,
    GifDisposal,
    LottieAnimation
  } = require_js_binding();
  var { DOMPoint, DOMMatrix, DOMRect } = require_geometry();
  var loadImage = require_load_image();
  if (GifEncoder && typeof Symbol.dispose !== "undefined") {
    GifEncoder.prototype[Symbol.dispose] = function() {
      this.dispose();
    };
  }
  var SvgExportFlag = {
    ConvertTextToPaths: 1,
    NoPrettyXML: 2,
    RelativePathEncoding: 4
  };
  if (!("families" in GlobalFonts)) {
    Object.defineProperty(GlobalFonts, "families", {
      get: function() {
        return JSON.parse(GlobalFonts.getFamilies().toString());
      }
    });
  }
  if (!("has" in GlobalFonts)) {
    Object.defineProperty(GlobalFonts, "has", {
      value: function has(name) {
        return !!JSON.parse(GlobalFonts.getFamilies().toString()).find(({ family }) => family === name);
      },
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  var _toBlob = CanvasElement.prototype.toBlob;
  var _convertToBlob = CanvasElement.prototype.convertToBlob;
  if ("Blob" in globalThis) {
    CanvasElement.prototype.toBlob = function toBlob(callback, mimeType, quality) {
      _toBlob.call(this, function(imageBuffer) {
        const blob = new Blob([imageBuffer.buffer], { type: mimeType });
        callback(blob);
      }, mimeType, quality);
    };
    CanvasElement.prototype.convertToBlob = function convertToBlob(options) {
      return _convertToBlob.call(this, options).then((imageBuffer) => {
        const blob = new Blob([imageBuffer.buffer], { type: options?.mime || "image/png" });
        return blob;
      });
    };
  } else {
    CanvasElement.prototype.toBlob = function toBlob(callback, mimeType, quality) {
      callback(null);
    };
    CanvasElement.prototype.convertToBlob = function convertToBlob(options) {
      return Promise.reject(new Error("Blob is not supported in this environment"));
    };
  }
  var _getTransform = CanvasRenderingContext2D.prototype.getTransform;
  CanvasRenderingContext2D.prototype.getTransform = function getTransform() {
    const transform = _getTransform.apply(this, arguments);
    if (transform instanceof DOMMatrix) {
      return transform;
    }
    const { a, b, c, d, e, f } = transform;
    return new DOMMatrix([a, b, c, d, e, f]);
  };
  var _drawImage = CanvasRenderingContext2D.prototype.drawImage;
  CanvasRenderingContext2D.prototype.drawImage = function drawImage(image, ...args) {
    if (image && typeof image === "object") {
      if (image.canvas instanceof CanvasElement || image.canvas instanceof SVGCanvas) {
        image = image.canvas;
      } else if (image._canvas instanceof CanvasElement || image._canvas instanceof SVGCanvas) {
        image = image._canvas;
      } else if (typeof image.getContext === "function" && image.width && image.height) {
        if (!(image instanceof CanvasElement) && !(image instanceof SVGCanvas)) {
          Object.setPrototypeOf(image, CanvasElement.prototype);
        }
      }
    }
    return _drawImage.apply(this, [image, ...args]);
  };
  function createCanvas(width, height, flag) {
    const isSvgBackend = typeof flag !== "undefined";
    return isSvgBackend ? new SVGCanvas(width, height, flag) : new CanvasElement(width, height);
  }

  class Canvas {
    constructor(width, height, flag) {
      return createCanvas(width, height, flag);
    }
    static [Symbol.hasInstance](instance) {
      return instance instanceof CanvasElement || instance instanceof SVGCanvas;
    }
  }
  if (!process.env.DISABLE_SYSTEM_FONTS_LOAD) {
    GlobalFonts.loadSystemFonts();
    const platformName = platform();
    const homedirPath = homedir();
    switch (platformName) {
      case "win32":
        GlobalFonts.loadFontsFromDir(join(homedirPath, "AppData", "Local", "Microsoft", "Windows", "Fonts"));
        break;
      case "darwin":
        GlobalFonts.loadFontsFromDir(join(homedirPath, "Library", "Fonts"));
        break;
      case "linux":
        GlobalFonts.loadFontsFromDir(join("usr", "local", "share", "fonts"));
        GlobalFonts.loadFontsFromDir(join(homedirPath, ".fonts"));
        break;
    }
  }
  module.exports = {
    clearAllCache,
    Canvas,
    createCanvas,
    Path2D,
    ImageData,
    Image,
    PathOp,
    FillType,
    StrokeCap,
    StrokeJoin,
    SvgExportFlag,
    GlobalFonts,
    convertSVGTextToPath,
    DOMPoint,
    DOMMatrix,
    DOMRect,
    loadImage,
    FontKey,
    CanvasElement,
    SVGCanvas,
    PDFDocument: PdfDocument,
    GifEncoder,
    GifDisposal,
    LottieAnimation
  };
});

// node_modules/pngjs/lib/chunkstream.js
var require_chunkstream = __commonJS((exports, module) => {
  var util = __require("util");
  var Stream = __require("stream");
  var ChunkStream = module.exports = function() {
    Stream.call(this);
    this._buffers = [];
    this._buffered = 0;
    this._reads = [];
    this._paused = false;
    this._encoding = "utf8";
    this.writable = true;
  };
  util.inherits(ChunkStream, Stream);
  ChunkStream.prototype.read = function(length, callback) {
    this._reads.push({
      length: Math.abs(length),
      allowLess: length < 0,
      func: callback
    });
    process.nextTick(function() {
      this._process();
      if (this._paused && this._reads && this._reads.length > 0) {
        this._paused = false;
        this.emit("drain");
      }
    }.bind(this));
  };
  ChunkStream.prototype.write = function(data, encoding) {
    if (!this.writable) {
      this.emit("error", new Error("Stream not writable"));
      return false;
    }
    let dataBuffer;
    if (Buffer.isBuffer(data)) {
      dataBuffer = data;
    } else {
      dataBuffer = Buffer.from(data, encoding || this._encoding);
    }
    this._buffers.push(dataBuffer);
    this._buffered += dataBuffer.length;
    this._process();
    if (this._reads && this._reads.length === 0) {
      this._paused = true;
    }
    return this.writable && !this._paused;
  };
  ChunkStream.prototype.end = function(data, encoding) {
    if (data) {
      this.write(data, encoding);
    }
    this.writable = false;
    if (!this._buffers) {
      return;
    }
    if (this._buffers.length === 0) {
      this._end();
    } else {
      this._buffers.push(null);
      this._process();
    }
  };
  ChunkStream.prototype.destroySoon = ChunkStream.prototype.end;
  ChunkStream.prototype._end = function() {
    if (this._reads.length > 0) {
      this.emit("error", new Error("Unexpected end of input"));
    }
    this.destroy();
  };
  ChunkStream.prototype.destroy = function() {
    if (!this._buffers) {
      return;
    }
    this.writable = false;
    this._reads = null;
    this._buffers = null;
    this.emit("close");
  };
  ChunkStream.prototype._processReadAllowingLess = function(read) {
    this._reads.shift();
    let smallerBuf = this._buffers[0];
    if (smallerBuf.length > read.length) {
      this._buffered -= read.length;
      this._buffers[0] = smallerBuf.slice(read.length);
      read.func.call(this, smallerBuf.slice(0, read.length));
    } else {
      this._buffered -= smallerBuf.length;
      this._buffers.shift();
      read.func.call(this, smallerBuf);
    }
  };
  ChunkStream.prototype._processRead = function(read) {
    this._reads.shift();
    let pos = 0;
    let count = 0;
    let data = Buffer.alloc(read.length);
    while (pos < read.length) {
      let buf = this._buffers[count++];
      let len = Math.min(buf.length, read.length - pos);
      buf.copy(data, pos, 0, len);
      pos += len;
      if (len !== buf.length) {
        this._buffers[--count] = buf.slice(len);
      }
    }
    if (count > 0) {
      this._buffers.splice(0, count);
    }
    this._buffered -= read.length;
    read.func.call(this, data);
  };
  ChunkStream.prototype._process = function() {
    try {
      while (this._buffered > 0 && this._reads && this._reads.length > 0) {
        let read = this._reads[0];
        if (read.allowLess) {
          this._processReadAllowingLess(read);
        } else if (this._buffered >= read.length) {
          this._processRead(read);
        } else {
          break;
        }
      }
      if (this._buffers && !this.writable) {
        this._end();
      }
    } catch (ex) {
      this.emit("error", ex);
    }
  };
});

// node_modules/pngjs/lib/interlace.js
var require_interlace = __commonJS((exports) => {
  var imagePasses = [
    {
      x: [0],
      y: [0]
    },
    {
      x: [4],
      y: [0]
    },
    {
      x: [0, 4],
      y: [4]
    },
    {
      x: [2, 6],
      y: [0, 4]
    },
    {
      x: [0, 2, 4, 6],
      y: [2, 6]
    },
    {
      x: [1, 3, 5, 7],
      y: [0, 2, 4, 6]
    },
    {
      x: [0, 1, 2, 3, 4, 5, 6, 7],
      y: [1, 3, 5, 7]
    }
  ];
  exports.getImagePasses = function(width, height) {
    let images = [];
    let xLeftOver = width % 8;
    let yLeftOver = height % 8;
    let xRepeats = (width - xLeftOver) / 8;
    let yRepeats = (height - yLeftOver) / 8;
    for (let i = 0;i < imagePasses.length; i++) {
      let pass = imagePasses[i];
      let passWidth = xRepeats * pass.x.length;
      let passHeight = yRepeats * pass.y.length;
      for (let j = 0;j < pass.x.length; j++) {
        if (pass.x[j] < xLeftOver) {
          passWidth++;
        } else {
          break;
        }
      }
      for (let j = 0;j < pass.y.length; j++) {
        if (pass.y[j] < yLeftOver) {
          passHeight++;
        } else {
          break;
        }
      }
      if (passWidth > 0 && passHeight > 0) {
        images.push({ width: passWidth, height: passHeight, index: i });
      }
    }
    return images;
  };
  exports.getInterlaceIterator = function(width) {
    return function(x, y, pass) {
      let outerXLeftOver = x % imagePasses[pass].x.length;
      let outerX = (x - outerXLeftOver) / imagePasses[pass].x.length * 8 + imagePasses[pass].x[outerXLeftOver];
      let outerYLeftOver = y % imagePasses[pass].y.length;
      let outerY = (y - outerYLeftOver) / imagePasses[pass].y.length * 8 + imagePasses[pass].y[outerYLeftOver];
      return outerX * 4 + outerY * width * 4;
    };
  };
});

// node_modules/pngjs/lib/paeth-predictor.js
var require_paeth_predictor = __commonJS((exports, module) => {
  module.exports = function paethPredictor(left, above, upLeft) {
    let paeth = left + above - upLeft;
    let pLeft = Math.abs(paeth - left);
    let pAbove = Math.abs(paeth - above);
    let pUpLeft = Math.abs(paeth - upLeft);
    if (pLeft <= pAbove && pLeft <= pUpLeft) {
      return left;
    }
    if (pAbove <= pUpLeft) {
      return above;
    }
    return upLeft;
  };
});

// node_modules/pngjs/lib/filter-parse.js
var require_filter_parse = __commonJS((exports, module) => {
  var interlaceUtils = require_interlace();
  var paethPredictor = require_paeth_predictor();
  function getByteWidth(width, bpp, depth) {
    let byteWidth = width * bpp;
    if (depth !== 8) {
      byteWidth = Math.ceil(byteWidth / (8 / depth));
    }
    return byteWidth;
  }
  var Filter = module.exports = function(bitmapInfo, dependencies) {
    let width = bitmapInfo.width;
    let height = bitmapInfo.height;
    let interlace = bitmapInfo.interlace;
    let bpp = bitmapInfo.bpp;
    let depth = bitmapInfo.depth;
    this.read = dependencies.read;
    this.write = dependencies.write;
    this.complete = dependencies.complete;
    this._imageIndex = 0;
    this._images = [];
    if (interlace) {
      let passes = interlaceUtils.getImagePasses(width, height);
      for (let i = 0;i < passes.length; i++) {
        this._images.push({
          byteWidth: getByteWidth(passes[i].width, bpp, depth),
          height: passes[i].height,
          lineIndex: 0
        });
      }
    } else {
      this._images.push({
        byteWidth: getByteWidth(width, bpp, depth),
        height,
        lineIndex: 0
      });
    }
    if (depth === 8) {
      this._xComparison = bpp;
    } else if (depth === 16) {
      this._xComparison = bpp * 2;
    } else {
      this._xComparison = 1;
    }
  };
  Filter.prototype.start = function() {
    this.read(this._images[this._imageIndex].byteWidth + 1, this._reverseFilterLine.bind(this));
  };
  Filter.prototype._unFilterType1 = function(rawData, unfilteredLine, byteWidth) {
    let xComparison = this._xComparison;
    let xBiggerThan = xComparison - 1;
    for (let x = 0;x < byteWidth; x++) {
      let rawByte = rawData[1 + x];
      let f1Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
      unfilteredLine[x] = rawByte + f1Left;
    }
  };
  Filter.prototype._unFilterType2 = function(rawData, unfilteredLine, byteWidth) {
    let lastLine = this._lastLine;
    for (let x = 0;x < byteWidth; x++) {
      let rawByte = rawData[1 + x];
      let f2Up = lastLine ? lastLine[x] : 0;
      unfilteredLine[x] = rawByte + f2Up;
    }
  };
  Filter.prototype._unFilterType3 = function(rawData, unfilteredLine, byteWidth) {
    let xComparison = this._xComparison;
    let xBiggerThan = xComparison - 1;
    let lastLine = this._lastLine;
    for (let x = 0;x < byteWidth; x++) {
      let rawByte = rawData[1 + x];
      let f3Up = lastLine ? lastLine[x] : 0;
      let f3Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
      let f3Add = Math.floor((f3Left + f3Up) / 2);
      unfilteredLine[x] = rawByte + f3Add;
    }
  };
  Filter.prototype._unFilterType4 = function(rawData, unfilteredLine, byteWidth) {
    let xComparison = this._xComparison;
    let xBiggerThan = xComparison - 1;
    let lastLine = this._lastLine;
    for (let x = 0;x < byteWidth; x++) {
      let rawByte = rawData[1 + x];
      let f4Up = lastLine ? lastLine[x] : 0;
      let f4Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
      let f4UpLeft = x > xBiggerThan && lastLine ? lastLine[x - xComparison] : 0;
      let f4Add = paethPredictor(f4Left, f4Up, f4UpLeft);
      unfilteredLine[x] = rawByte + f4Add;
    }
  };
  Filter.prototype._reverseFilterLine = function(rawData) {
    let filter = rawData[0];
    let unfilteredLine;
    let currentImage = this._images[this._imageIndex];
    let byteWidth = currentImage.byteWidth;
    if (filter === 0) {
      unfilteredLine = rawData.slice(1, byteWidth + 1);
    } else {
      unfilteredLine = Buffer.alloc(byteWidth);
      switch (filter) {
        case 1:
          this._unFilterType1(rawData, unfilteredLine, byteWidth);
          break;
        case 2:
          this._unFilterType2(rawData, unfilteredLine, byteWidth);
          break;
        case 3:
          this._unFilterType3(rawData, unfilteredLine, byteWidth);
          break;
        case 4:
          this._unFilterType4(rawData, unfilteredLine, byteWidth);
          break;
        default:
          throw new Error("Unrecognised filter type - " + filter);
      }
    }
    this.write(unfilteredLine);
    currentImage.lineIndex++;
    if (currentImage.lineIndex >= currentImage.height) {
      this._lastLine = null;
      this._imageIndex++;
      currentImage = this._images[this._imageIndex];
    } else {
      this._lastLine = unfilteredLine;
    }
    if (currentImage) {
      this.read(currentImage.byteWidth + 1, this._reverseFilterLine.bind(this));
    } else {
      this._lastLine = null;
      this.complete();
    }
  };
});

// node_modules/pngjs/lib/filter-parse-async.js
var require_filter_parse_async = __commonJS((exports, module) => {
  var util = __require("util");
  var ChunkStream = require_chunkstream();
  var Filter = require_filter_parse();
  var FilterAsync = module.exports = function(bitmapInfo) {
    ChunkStream.call(this);
    let buffers = [];
    let that = this;
    this._filter = new Filter(bitmapInfo, {
      read: this.read.bind(this),
      write: function(buffer) {
        buffers.push(buffer);
      },
      complete: function() {
        that.emit("complete", Buffer.concat(buffers));
      }
    });
    this._filter.start();
  };
  util.inherits(FilterAsync, ChunkStream);
});

// node_modules/pngjs/lib/constants.js
var require_constants = __commonJS((exports, module) => {
  module.exports = {
    PNG_SIGNATURE: [137, 80, 78, 71, 13, 10, 26, 10],
    TYPE_IHDR: 1229472850,
    TYPE_IEND: 1229278788,
    TYPE_IDAT: 1229209940,
    TYPE_PLTE: 1347179589,
    TYPE_tRNS: 1951551059,
    TYPE_gAMA: 1732332865,
    COLORTYPE_GRAYSCALE: 0,
    COLORTYPE_PALETTE: 1,
    COLORTYPE_COLOR: 2,
    COLORTYPE_ALPHA: 4,
    COLORTYPE_PALETTE_COLOR: 3,
    COLORTYPE_COLOR_ALPHA: 6,
    COLORTYPE_TO_BPP_MAP: {
      0: 1,
      2: 3,
      3: 1,
      4: 2,
      6: 4
    },
    GAMMA_DIVISION: 1e5
  };
});

// node_modules/pngjs/lib/crc.js
var require_crc = __commonJS((exports, module) => {
  var crcTable = [];
  (function() {
    for (let i = 0;i < 256; i++) {
      let currentCrc = i;
      for (let j = 0;j < 8; j++) {
        if (currentCrc & 1) {
          currentCrc = 3988292384 ^ currentCrc >>> 1;
        } else {
          currentCrc = currentCrc >>> 1;
        }
      }
      crcTable[i] = currentCrc;
    }
  })();
  var CrcCalculator = module.exports = function() {
    this._crc = -1;
  };
  CrcCalculator.prototype.write = function(data) {
    for (let i = 0;i < data.length; i++) {
      this._crc = crcTable[(this._crc ^ data[i]) & 255] ^ this._crc >>> 8;
    }
    return true;
  };
  CrcCalculator.prototype.crc32 = function() {
    return this._crc ^ -1;
  };
  CrcCalculator.crc32 = function(buf) {
    let crc = -1;
    for (let i = 0;i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 255] ^ crc >>> 8;
    }
    return crc ^ -1;
  };
});

// node_modules/pngjs/lib/parser.js
var require_parser = __commonJS((exports, module) => {
  var constants = require_constants();
  var CrcCalculator = require_crc();
  var Parser = module.exports = function(options, dependencies) {
    this._options = options;
    options.checkCRC = options.checkCRC !== false;
    this._hasIHDR = false;
    this._hasIEND = false;
    this._emittedHeadersFinished = false;
    this._palette = [];
    this._colorType = 0;
    this._chunks = {};
    this._chunks[constants.TYPE_IHDR] = this._handleIHDR.bind(this);
    this._chunks[constants.TYPE_IEND] = this._handleIEND.bind(this);
    this._chunks[constants.TYPE_IDAT] = this._handleIDAT.bind(this);
    this._chunks[constants.TYPE_PLTE] = this._handlePLTE.bind(this);
    this._chunks[constants.TYPE_tRNS] = this._handleTRNS.bind(this);
    this._chunks[constants.TYPE_gAMA] = this._handleGAMA.bind(this);
    this.read = dependencies.read;
    this.error = dependencies.error;
    this.metadata = dependencies.metadata;
    this.gamma = dependencies.gamma;
    this.transColor = dependencies.transColor;
    this.palette = dependencies.palette;
    this.parsed = dependencies.parsed;
    this.inflateData = dependencies.inflateData;
    this.finished = dependencies.finished;
    this.simpleTransparency = dependencies.simpleTransparency;
    this.headersFinished = dependencies.headersFinished || function() {};
  };
  Parser.prototype.start = function() {
    this.read(constants.PNG_SIGNATURE.length, this._parseSignature.bind(this));
  };
  Parser.prototype._parseSignature = function(data) {
    let signature = constants.PNG_SIGNATURE;
    for (let i = 0;i < signature.length; i++) {
      if (data[i] !== signature[i]) {
        this.error(new Error("Invalid file signature"));
        return;
      }
    }
    this.read(8, this._parseChunkBegin.bind(this));
  };
  Parser.prototype._parseChunkBegin = function(data) {
    let length = data.readUInt32BE(0);
    let type = data.readUInt32BE(4);
    let name = "";
    for (let i = 4;i < 8; i++) {
      name += String.fromCharCode(data[i]);
    }
    let ancillary = Boolean(data[4] & 32);
    if (!this._hasIHDR && type !== constants.TYPE_IHDR) {
      this.error(new Error("Expected IHDR on beggining"));
      return;
    }
    this._crc = new CrcCalculator;
    this._crc.write(Buffer.from(name));
    if (this._chunks[type]) {
      return this._chunks[type](length);
    }
    if (!ancillary) {
      this.error(new Error("Unsupported critical chunk type " + name));
      return;
    }
    this.read(length + 4, this._skipChunk.bind(this));
  };
  Parser.prototype._skipChunk = function() {
    this.read(8, this._parseChunkBegin.bind(this));
  };
  Parser.prototype._handleChunkEnd = function() {
    this.read(4, this._parseChunkEnd.bind(this));
  };
  Parser.prototype._parseChunkEnd = function(data) {
    let fileCrc = data.readInt32BE(0);
    let calcCrc = this._crc.crc32();
    if (this._options.checkCRC && calcCrc !== fileCrc) {
      this.error(new Error("Crc error - " + fileCrc + " - " + calcCrc));
      return;
    }
    if (!this._hasIEND) {
      this.read(8, this._parseChunkBegin.bind(this));
    }
  };
  Parser.prototype._handleIHDR = function(length) {
    this.read(length, this._parseIHDR.bind(this));
  };
  Parser.prototype._parseIHDR = function(data) {
    this._crc.write(data);
    let width = data.readUInt32BE(0);
    let height = data.readUInt32BE(4);
    let depth = data[8];
    let colorType = data[9];
    let compr = data[10];
    let filter = data[11];
    let interlace = data[12];
    if (depth !== 8 && depth !== 4 && depth !== 2 && depth !== 1 && depth !== 16) {
      this.error(new Error("Unsupported bit depth " + depth));
      return;
    }
    if (!(colorType in constants.COLORTYPE_TO_BPP_MAP)) {
      this.error(new Error("Unsupported color type"));
      return;
    }
    if (compr !== 0) {
      this.error(new Error("Unsupported compression method"));
      return;
    }
    if (filter !== 0) {
      this.error(new Error("Unsupported filter method"));
      return;
    }
    if (interlace !== 0 && interlace !== 1) {
      this.error(new Error("Unsupported interlace method"));
      return;
    }
    this._colorType = colorType;
    let bpp = constants.COLORTYPE_TO_BPP_MAP[this._colorType];
    this._hasIHDR = true;
    this.metadata({
      width,
      height,
      depth,
      interlace: Boolean(interlace),
      palette: Boolean(colorType & constants.COLORTYPE_PALETTE),
      color: Boolean(colorType & constants.COLORTYPE_COLOR),
      alpha: Boolean(colorType & constants.COLORTYPE_ALPHA),
      bpp,
      colorType
    });
    this._handleChunkEnd();
  };
  Parser.prototype._handlePLTE = function(length) {
    this.read(length, this._parsePLTE.bind(this));
  };
  Parser.prototype._parsePLTE = function(data) {
    this._crc.write(data);
    let entries = Math.floor(data.length / 3);
    for (let i = 0;i < entries; i++) {
      this._palette.push([data[i * 3], data[i * 3 + 1], data[i * 3 + 2], 255]);
    }
    this.palette(this._palette);
    this._handleChunkEnd();
  };
  Parser.prototype._handleTRNS = function(length) {
    this.simpleTransparency();
    this.read(length, this._parseTRNS.bind(this));
  };
  Parser.prototype._parseTRNS = function(data) {
    this._crc.write(data);
    if (this._colorType === constants.COLORTYPE_PALETTE_COLOR) {
      if (this._palette.length === 0) {
        this.error(new Error("Transparency chunk must be after palette"));
        return;
      }
      if (data.length > this._palette.length) {
        this.error(new Error("More transparent colors than palette size"));
        return;
      }
      for (let i = 0;i < data.length; i++) {
        this._palette[i][3] = data[i];
      }
      this.palette(this._palette);
    }
    if (this._colorType === constants.COLORTYPE_GRAYSCALE) {
      this.transColor([data.readUInt16BE(0)]);
    }
    if (this._colorType === constants.COLORTYPE_COLOR) {
      this.transColor([
        data.readUInt16BE(0),
        data.readUInt16BE(2),
        data.readUInt16BE(4)
      ]);
    }
    this._handleChunkEnd();
  };
  Parser.prototype._handleGAMA = function(length) {
    this.read(length, this._parseGAMA.bind(this));
  };
  Parser.prototype._parseGAMA = function(data) {
    this._crc.write(data);
    this.gamma(data.readUInt32BE(0) / constants.GAMMA_DIVISION);
    this._handleChunkEnd();
  };
  Parser.prototype._handleIDAT = function(length) {
    if (!this._emittedHeadersFinished) {
      this._emittedHeadersFinished = true;
      this.headersFinished();
    }
    this.read(-length, this._parseIDAT.bind(this, length));
  };
  Parser.prototype._parseIDAT = function(length, data) {
    this._crc.write(data);
    if (this._colorType === constants.COLORTYPE_PALETTE_COLOR && this._palette.length === 0) {
      throw new Error("Expected palette not found");
    }
    this.inflateData(data);
    let leftOverLength = length - data.length;
    if (leftOverLength > 0) {
      this._handleIDAT(leftOverLength);
    } else {
      this._handleChunkEnd();
    }
  };
  Parser.prototype._handleIEND = function(length) {
    this.read(length, this._parseIEND.bind(this));
  };
  Parser.prototype._parseIEND = function(data) {
    this._crc.write(data);
    this._hasIEND = true;
    this._handleChunkEnd();
    if (this.finished) {
      this.finished();
    }
  };
});

// node_modules/pngjs/lib/bitmapper.js
var require_bitmapper = __commonJS((exports) => {
  var interlaceUtils = require_interlace();
  var pixelBppMapper = [
    function() {},
    function(pxData, data, pxPos, rawPos) {
      if (rawPos === data.length) {
        throw new Error("Ran out of data");
      }
      let pixel = data[rawPos];
      pxData[pxPos] = pixel;
      pxData[pxPos + 1] = pixel;
      pxData[pxPos + 2] = pixel;
      pxData[pxPos + 3] = 255;
    },
    function(pxData, data, pxPos, rawPos) {
      if (rawPos + 1 >= data.length) {
        throw new Error("Ran out of data");
      }
      let pixel = data[rawPos];
      pxData[pxPos] = pixel;
      pxData[pxPos + 1] = pixel;
      pxData[pxPos + 2] = pixel;
      pxData[pxPos + 3] = data[rawPos + 1];
    },
    function(pxData, data, pxPos, rawPos) {
      if (rawPos + 2 >= data.length) {
        throw new Error("Ran out of data");
      }
      pxData[pxPos] = data[rawPos];
      pxData[pxPos + 1] = data[rawPos + 1];
      pxData[pxPos + 2] = data[rawPos + 2];
      pxData[pxPos + 3] = 255;
    },
    function(pxData, data, pxPos, rawPos) {
      if (rawPos + 3 >= data.length) {
        throw new Error("Ran out of data");
      }
      pxData[pxPos] = data[rawPos];
      pxData[pxPos + 1] = data[rawPos + 1];
      pxData[pxPos + 2] = data[rawPos + 2];
      pxData[pxPos + 3] = data[rawPos + 3];
    }
  ];
  var pixelBppCustomMapper = [
    function() {},
    function(pxData, pixelData, pxPos, maxBit) {
      let pixel = pixelData[0];
      pxData[pxPos] = pixel;
      pxData[pxPos + 1] = pixel;
      pxData[pxPos + 2] = pixel;
      pxData[pxPos + 3] = maxBit;
    },
    function(pxData, pixelData, pxPos) {
      let pixel = pixelData[0];
      pxData[pxPos] = pixel;
      pxData[pxPos + 1] = pixel;
      pxData[pxPos + 2] = pixel;
      pxData[pxPos + 3] = pixelData[1];
    },
    function(pxData, pixelData, pxPos, maxBit) {
      pxData[pxPos] = pixelData[0];
      pxData[pxPos + 1] = pixelData[1];
      pxData[pxPos + 2] = pixelData[2];
      pxData[pxPos + 3] = maxBit;
    },
    function(pxData, pixelData, pxPos) {
      pxData[pxPos] = pixelData[0];
      pxData[pxPos + 1] = pixelData[1];
      pxData[pxPos + 2] = pixelData[2];
      pxData[pxPos + 3] = pixelData[3];
    }
  ];
  function bitRetriever(data, depth) {
    let leftOver = [];
    let i = 0;
    function split() {
      if (i === data.length) {
        throw new Error("Ran out of data");
      }
      let byte = data[i];
      i++;
      let byte8, byte7, byte6, byte5, byte4, byte3, byte2, byte1;
      switch (depth) {
        default:
          throw new Error("unrecognised depth");
        case 16:
          byte2 = data[i];
          i++;
          leftOver.push((byte << 8) + byte2);
          break;
        case 4:
          byte2 = byte & 15;
          byte1 = byte >> 4;
          leftOver.push(byte1, byte2);
          break;
        case 2:
          byte4 = byte & 3;
          byte3 = byte >> 2 & 3;
          byte2 = byte >> 4 & 3;
          byte1 = byte >> 6 & 3;
          leftOver.push(byte1, byte2, byte3, byte4);
          break;
        case 1:
          byte8 = byte & 1;
          byte7 = byte >> 1 & 1;
          byte6 = byte >> 2 & 1;
          byte5 = byte >> 3 & 1;
          byte4 = byte >> 4 & 1;
          byte3 = byte >> 5 & 1;
          byte2 = byte >> 6 & 1;
          byte1 = byte >> 7 & 1;
          leftOver.push(byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8);
          break;
      }
    }
    return {
      get: function(count) {
        while (leftOver.length < count) {
          split();
        }
        let returner = leftOver.slice(0, count);
        leftOver = leftOver.slice(count);
        return returner;
      },
      resetAfterLine: function() {
        leftOver.length = 0;
      },
      end: function() {
        if (i !== data.length) {
          throw new Error("extra data found");
        }
      }
    };
  }
  function mapImage8Bit(image, pxData, getPxPos, bpp, data, rawPos) {
    let imageWidth = image.width;
    let imageHeight = image.height;
    let imagePass = image.index;
    for (let y = 0;y < imageHeight; y++) {
      for (let x = 0;x < imageWidth; x++) {
        let pxPos = getPxPos(x, y, imagePass);
        pixelBppMapper[bpp](pxData, data, pxPos, rawPos);
        rawPos += bpp;
      }
    }
    return rawPos;
  }
  function mapImageCustomBit(image, pxData, getPxPos, bpp, bits, maxBit) {
    let imageWidth = image.width;
    let imageHeight = image.height;
    let imagePass = image.index;
    for (let y = 0;y < imageHeight; y++) {
      for (let x = 0;x < imageWidth; x++) {
        let pixelData = bits.get(bpp);
        let pxPos = getPxPos(x, y, imagePass);
        pixelBppCustomMapper[bpp](pxData, pixelData, pxPos, maxBit);
      }
      bits.resetAfterLine();
    }
  }
  exports.dataToBitMap = function(data, bitmapInfo) {
    let width = bitmapInfo.width;
    let height = bitmapInfo.height;
    let depth = bitmapInfo.depth;
    let bpp = bitmapInfo.bpp;
    let interlace = bitmapInfo.interlace;
    let bits;
    if (depth !== 8) {
      bits = bitRetriever(data, depth);
    }
    let pxData;
    if (depth <= 8) {
      pxData = Buffer.alloc(width * height * 4);
    } else {
      pxData = new Uint16Array(width * height * 4);
    }
    let maxBit = Math.pow(2, depth) - 1;
    let rawPos = 0;
    let images;
    let getPxPos;
    if (interlace) {
      images = interlaceUtils.getImagePasses(width, height);
      getPxPos = interlaceUtils.getInterlaceIterator(width, height);
    } else {
      let nonInterlacedPxPos = 0;
      getPxPos = function() {
        let returner = nonInterlacedPxPos;
        nonInterlacedPxPos += 4;
        return returner;
      };
      images = [{ width, height }];
    }
    for (let imageIndex = 0;imageIndex < images.length; imageIndex++) {
      if (depth === 8) {
        rawPos = mapImage8Bit(images[imageIndex], pxData, getPxPos, bpp, data, rawPos);
      } else {
        mapImageCustomBit(images[imageIndex], pxData, getPxPos, bpp, bits, maxBit);
      }
    }
    if (depth === 8) {
      if (rawPos !== data.length) {
        throw new Error("extra data found");
      }
    } else {
      bits.end();
    }
    return pxData;
  };
});

// node_modules/pngjs/lib/format-normaliser.js
var require_format_normaliser = __commonJS((exports, module) => {
  function dePalette(indata, outdata, width, height, palette) {
    let pxPos = 0;
    for (let y = 0;y < height; y++) {
      for (let x = 0;x < width; x++) {
        let color = palette[indata[pxPos]];
        if (!color) {
          throw new Error("index " + indata[pxPos] + " not in palette");
        }
        for (let i = 0;i < 4; i++) {
          outdata[pxPos + i] = color[i];
        }
        pxPos += 4;
      }
    }
  }
  function replaceTransparentColor(indata, outdata, width, height, transColor) {
    let pxPos = 0;
    for (let y = 0;y < height; y++) {
      for (let x = 0;x < width; x++) {
        let makeTrans = false;
        if (transColor.length === 1) {
          if (transColor[0] === indata[pxPos]) {
            makeTrans = true;
          }
        } else if (transColor[0] === indata[pxPos] && transColor[1] === indata[pxPos + 1] && transColor[2] === indata[pxPos + 2]) {
          makeTrans = true;
        }
        if (makeTrans) {
          for (let i = 0;i < 4; i++) {
            outdata[pxPos + i] = 0;
          }
        }
        pxPos += 4;
      }
    }
  }
  function scaleDepth(indata, outdata, width, height, depth) {
    let maxOutSample = 255;
    let maxInSample = Math.pow(2, depth) - 1;
    let pxPos = 0;
    for (let y = 0;y < height; y++) {
      for (let x = 0;x < width; x++) {
        for (let i = 0;i < 4; i++) {
          outdata[pxPos + i] = Math.floor(indata[pxPos + i] * maxOutSample / maxInSample + 0.5);
        }
        pxPos += 4;
      }
    }
  }
  module.exports = function(indata, imageData, skipRescale = false) {
    let depth = imageData.depth;
    let width = imageData.width;
    let height = imageData.height;
    let colorType = imageData.colorType;
    let transColor = imageData.transColor;
    let palette = imageData.palette;
    let outdata = indata;
    if (colorType === 3) {
      dePalette(indata, outdata, width, height, palette);
    } else {
      if (transColor) {
        replaceTransparentColor(indata, outdata, width, height, transColor);
      }
      if (depth !== 8 && !skipRescale) {
        if (depth === 16) {
          outdata = Buffer.alloc(width * height * 4);
        }
        scaleDepth(indata, outdata, width, height, depth);
      }
    }
    return outdata;
  };
});

// node_modules/pngjs/lib/parser-async.js
var require_parser_async = __commonJS((exports, module) => {
  var util = __require("util");
  var zlib = __require("zlib");
  var ChunkStream = require_chunkstream();
  var FilterAsync = require_filter_parse_async();
  var Parser = require_parser();
  var bitmapper = require_bitmapper();
  var formatNormaliser = require_format_normaliser();
  var ParserAsync = module.exports = function(options) {
    ChunkStream.call(this);
    this._parser = new Parser(options, {
      read: this.read.bind(this),
      error: this._handleError.bind(this),
      metadata: this._handleMetaData.bind(this),
      gamma: this.emit.bind(this, "gamma"),
      palette: this._handlePalette.bind(this),
      transColor: this._handleTransColor.bind(this),
      finished: this._finished.bind(this),
      inflateData: this._inflateData.bind(this),
      simpleTransparency: this._simpleTransparency.bind(this),
      headersFinished: this._headersFinished.bind(this)
    });
    this._options = options;
    this.writable = true;
    this._parser.start();
  };
  util.inherits(ParserAsync, ChunkStream);
  ParserAsync.prototype._handleError = function(err) {
    this.emit("error", err);
    this.writable = false;
    this.destroy();
    if (this._inflate && this._inflate.destroy) {
      this._inflate.destroy();
    }
    if (this._filter) {
      this._filter.destroy();
      this._filter.on("error", function() {});
    }
    this.errord = true;
  };
  ParserAsync.prototype._inflateData = function(data) {
    if (!this._inflate) {
      if (this._bitmapInfo.interlace) {
        this._inflate = zlib.createInflate();
        this._inflate.on("error", this.emit.bind(this, "error"));
        this._filter.on("complete", this._complete.bind(this));
        this._inflate.pipe(this._filter);
      } else {
        let rowSize = (this._bitmapInfo.width * this._bitmapInfo.bpp * this._bitmapInfo.depth + 7 >> 3) + 1;
        let imageSize = rowSize * this._bitmapInfo.height;
        let chunkSize = Math.max(imageSize, zlib.Z_MIN_CHUNK);
        this._inflate = zlib.createInflate({ chunkSize });
        let leftToInflate = imageSize;
        let emitError = this.emit.bind(this, "error");
        this._inflate.on("error", function(err) {
          if (!leftToInflate) {
            return;
          }
          emitError(err);
        });
        this._filter.on("complete", this._complete.bind(this));
        let filterWrite = this._filter.write.bind(this._filter);
        this._inflate.on("data", function(chunk) {
          if (!leftToInflate) {
            return;
          }
          if (chunk.length > leftToInflate) {
            chunk = chunk.slice(0, leftToInflate);
          }
          leftToInflate -= chunk.length;
          filterWrite(chunk);
        });
        this._inflate.on("end", this._filter.end.bind(this._filter));
      }
    }
    this._inflate.write(data);
  };
  ParserAsync.prototype._handleMetaData = function(metaData) {
    this._metaData = metaData;
    this._bitmapInfo = Object.create(metaData);
    this._filter = new FilterAsync(this._bitmapInfo);
  };
  ParserAsync.prototype._handleTransColor = function(transColor) {
    this._bitmapInfo.transColor = transColor;
  };
  ParserAsync.prototype._handlePalette = function(palette) {
    this._bitmapInfo.palette = palette;
  };
  ParserAsync.prototype._simpleTransparency = function() {
    this._metaData.alpha = true;
  };
  ParserAsync.prototype._headersFinished = function() {
    this.emit("metadata", this._metaData);
  };
  ParserAsync.prototype._finished = function() {
    if (this.errord) {
      return;
    }
    if (!this._inflate) {
      this.emit("error", "No Inflate block");
    } else {
      this._inflate.end();
    }
  };
  ParserAsync.prototype._complete = function(filteredData) {
    if (this.errord) {
      return;
    }
    let normalisedBitmapData;
    try {
      let bitmapData = bitmapper.dataToBitMap(filteredData, this._bitmapInfo);
      normalisedBitmapData = formatNormaliser(bitmapData, this._bitmapInfo, this._options.skipRescale);
      bitmapData = null;
    } catch (ex) {
      this._handleError(ex);
      return;
    }
    this.emit("parsed", normalisedBitmapData);
  };
});

// node_modules/pngjs/lib/bitpacker.js
var require_bitpacker = __commonJS((exports, module) => {
  var constants = require_constants();
  module.exports = function(dataIn, width, height, options) {
    let outHasAlpha = [constants.COLORTYPE_COLOR_ALPHA, constants.COLORTYPE_ALPHA].indexOf(options.colorType) !== -1;
    if (options.colorType === options.inputColorType) {
      let bigEndian = function() {
        let buffer = new ArrayBuffer(2);
        new DataView(buffer).setInt16(0, 256, true);
        return new Int16Array(buffer)[0] !== 256;
      }();
      if (options.bitDepth === 8 || options.bitDepth === 16 && bigEndian) {
        return dataIn;
      }
    }
    let data = options.bitDepth !== 16 ? dataIn : new Uint16Array(dataIn.buffer);
    let maxValue = 255;
    let inBpp = constants.COLORTYPE_TO_BPP_MAP[options.inputColorType];
    if (inBpp === 4 && !options.inputHasAlpha) {
      inBpp = 3;
    }
    let outBpp = constants.COLORTYPE_TO_BPP_MAP[options.colorType];
    if (options.bitDepth === 16) {
      maxValue = 65535;
      outBpp *= 2;
    }
    let outData = Buffer.alloc(width * height * outBpp);
    let inIndex = 0;
    let outIndex = 0;
    let bgColor = options.bgColor || {};
    if (bgColor.red === undefined) {
      bgColor.red = maxValue;
    }
    if (bgColor.green === undefined) {
      bgColor.green = maxValue;
    }
    if (bgColor.blue === undefined) {
      bgColor.blue = maxValue;
    }
    function getRGBA() {
      let red;
      let green;
      let blue;
      let alpha = maxValue;
      switch (options.inputColorType) {
        case constants.COLORTYPE_COLOR_ALPHA:
          alpha = data[inIndex + 3];
          red = data[inIndex];
          green = data[inIndex + 1];
          blue = data[inIndex + 2];
          break;
        case constants.COLORTYPE_COLOR:
          red = data[inIndex];
          green = data[inIndex + 1];
          blue = data[inIndex + 2];
          break;
        case constants.COLORTYPE_ALPHA:
          alpha = data[inIndex + 1];
          red = data[inIndex];
          green = red;
          blue = red;
          break;
        case constants.COLORTYPE_GRAYSCALE:
          red = data[inIndex];
          green = red;
          blue = red;
          break;
        default:
          throw new Error("input color type:" + options.inputColorType + " is not supported at present");
      }
      if (options.inputHasAlpha) {
        if (!outHasAlpha) {
          alpha /= maxValue;
          red = Math.min(Math.max(Math.round((1 - alpha) * bgColor.red + alpha * red), 0), maxValue);
          green = Math.min(Math.max(Math.round((1 - alpha) * bgColor.green + alpha * green), 0), maxValue);
          blue = Math.min(Math.max(Math.round((1 - alpha) * bgColor.blue + alpha * blue), 0), maxValue);
        }
      }
      return { red, green, blue, alpha };
    }
    for (let y = 0;y < height; y++) {
      for (let x = 0;x < width; x++) {
        let rgba = getRGBA(data, inIndex);
        switch (options.colorType) {
          case constants.COLORTYPE_COLOR_ALPHA:
          case constants.COLORTYPE_COLOR:
            if (options.bitDepth === 8) {
              outData[outIndex] = rgba.red;
              outData[outIndex + 1] = rgba.green;
              outData[outIndex + 2] = rgba.blue;
              if (outHasAlpha) {
                outData[outIndex + 3] = rgba.alpha;
              }
            } else {
              outData.writeUInt16BE(rgba.red, outIndex);
              outData.writeUInt16BE(rgba.green, outIndex + 2);
              outData.writeUInt16BE(rgba.blue, outIndex + 4);
              if (outHasAlpha) {
                outData.writeUInt16BE(rgba.alpha, outIndex + 6);
              }
            }
            break;
          case constants.COLORTYPE_ALPHA:
          case constants.COLORTYPE_GRAYSCALE: {
            let grayscale = (rgba.red + rgba.green + rgba.blue) / 3;
            if (options.bitDepth === 8) {
              outData[outIndex] = grayscale;
              if (outHasAlpha) {
                outData[outIndex + 1] = rgba.alpha;
              }
            } else {
              outData.writeUInt16BE(grayscale, outIndex);
              if (outHasAlpha) {
                outData.writeUInt16BE(rgba.alpha, outIndex + 2);
              }
            }
            break;
          }
          default:
            throw new Error("unrecognised color Type " + options.colorType);
        }
        inIndex += inBpp;
        outIndex += outBpp;
      }
    }
    return outData;
  };
});

// node_modules/pngjs/lib/filter-pack.js
var require_filter_pack = __commonJS((exports, module) => {
  var paethPredictor = require_paeth_predictor();
  function filterNone(pxData, pxPos, byteWidth, rawData, rawPos) {
    for (let x = 0;x < byteWidth; x++) {
      rawData[rawPos + x] = pxData[pxPos + x];
    }
  }
  function filterSumNone(pxData, pxPos, byteWidth) {
    let sum = 0;
    let length = pxPos + byteWidth;
    for (let i = pxPos;i < length; i++) {
      sum += Math.abs(pxData[i]);
    }
    return sum;
  }
  function filterSub(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
    for (let x = 0;x < byteWidth; x++) {
      let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
      let val = pxData[pxPos + x] - left;
      rawData[rawPos + x] = val;
    }
  }
  function filterSumSub(pxData, pxPos, byteWidth, bpp) {
    let sum = 0;
    for (let x = 0;x < byteWidth; x++) {
      let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
      let val = pxData[pxPos + x] - left;
      sum += Math.abs(val);
    }
    return sum;
  }
  function filterUp(pxData, pxPos, byteWidth, rawData, rawPos) {
    for (let x = 0;x < byteWidth; x++) {
      let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
      let val = pxData[pxPos + x] - up;
      rawData[rawPos + x] = val;
    }
  }
  function filterSumUp(pxData, pxPos, byteWidth) {
    let sum = 0;
    let length = pxPos + byteWidth;
    for (let x = pxPos;x < length; x++) {
      let up = pxPos > 0 ? pxData[x - byteWidth] : 0;
      let val = pxData[x] - up;
      sum += Math.abs(val);
    }
    return sum;
  }
  function filterAvg(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
    for (let x = 0;x < byteWidth; x++) {
      let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
      let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
      let val = pxData[pxPos + x] - (left + up >> 1);
      rawData[rawPos + x] = val;
    }
  }
  function filterSumAvg(pxData, pxPos, byteWidth, bpp) {
    let sum = 0;
    for (let x = 0;x < byteWidth; x++) {
      let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
      let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
      let val = pxData[pxPos + x] - (left + up >> 1);
      sum += Math.abs(val);
    }
    return sum;
  }
  function filterPaeth(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
    for (let x = 0;x < byteWidth; x++) {
      let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
      let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
      let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
      let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
      rawData[rawPos + x] = val;
    }
  }
  function filterSumPaeth(pxData, pxPos, byteWidth, bpp) {
    let sum = 0;
    for (let x = 0;x < byteWidth; x++) {
      let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
      let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
      let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
      let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
      sum += Math.abs(val);
    }
    return sum;
  }
  var filters = {
    0: filterNone,
    1: filterSub,
    2: filterUp,
    3: filterAvg,
    4: filterPaeth
  };
  var filterSums = {
    0: filterSumNone,
    1: filterSumSub,
    2: filterSumUp,
    3: filterSumAvg,
    4: filterSumPaeth
  };
  module.exports = function(pxData, width, height, options, bpp) {
    let filterTypes;
    if (!("filterType" in options) || options.filterType === -1) {
      filterTypes = [0, 1, 2, 3, 4];
    } else if (typeof options.filterType === "number") {
      filterTypes = [options.filterType];
    } else {
      throw new Error("unrecognised filter types");
    }
    if (options.bitDepth === 16) {
      bpp *= 2;
    }
    let byteWidth = width * bpp;
    let rawPos = 0;
    let pxPos = 0;
    let rawData = Buffer.alloc((byteWidth + 1) * height);
    let sel = filterTypes[0];
    for (let y = 0;y < height; y++) {
      if (filterTypes.length > 1) {
        let min = Infinity;
        for (let i = 0;i < filterTypes.length; i++) {
          let sum = filterSums[filterTypes[i]](pxData, pxPos, byteWidth, bpp);
          if (sum < min) {
            sel = filterTypes[i];
            min = sum;
          }
        }
      }
      rawData[rawPos] = sel;
      rawPos++;
      filters[sel](pxData, pxPos, byteWidth, rawData, rawPos, bpp);
      rawPos += byteWidth;
      pxPos += byteWidth;
    }
    return rawData;
  };
});

// node_modules/pngjs/lib/packer.js
var require_packer = __commonJS((exports, module) => {
  var constants = require_constants();
  var CrcStream = require_crc();
  var bitPacker = require_bitpacker();
  var filter = require_filter_pack();
  var zlib = __require("zlib");
  var Packer = module.exports = function(options) {
    this._options = options;
    options.deflateChunkSize = options.deflateChunkSize || 32 * 1024;
    options.deflateLevel = options.deflateLevel != null ? options.deflateLevel : 9;
    options.deflateStrategy = options.deflateStrategy != null ? options.deflateStrategy : 3;
    options.inputHasAlpha = options.inputHasAlpha != null ? options.inputHasAlpha : true;
    options.deflateFactory = options.deflateFactory || zlib.createDeflate;
    options.bitDepth = options.bitDepth || 8;
    options.colorType = typeof options.colorType === "number" ? options.colorType : constants.COLORTYPE_COLOR_ALPHA;
    options.inputColorType = typeof options.inputColorType === "number" ? options.inputColorType : constants.COLORTYPE_COLOR_ALPHA;
    if ([
      constants.COLORTYPE_GRAYSCALE,
      constants.COLORTYPE_COLOR,
      constants.COLORTYPE_COLOR_ALPHA,
      constants.COLORTYPE_ALPHA
    ].indexOf(options.colorType) === -1) {
      throw new Error("option color type:" + options.colorType + " is not supported at present");
    }
    if ([
      constants.COLORTYPE_GRAYSCALE,
      constants.COLORTYPE_COLOR,
      constants.COLORTYPE_COLOR_ALPHA,
      constants.COLORTYPE_ALPHA
    ].indexOf(options.inputColorType) === -1) {
      throw new Error("option input color type:" + options.inputColorType + " is not supported at present");
    }
    if (options.bitDepth !== 8 && options.bitDepth !== 16) {
      throw new Error("option bit depth:" + options.bitDepth + " is not supported at present");
    }
  };
  Packer.prototype.getDeflateOptions = function() {
    return {
      chunkSize: this._options.deflateChunkSize,
      level: this._options.deflateLevel,
      strategy: this._options.deflateStrategy
    };
  };
  Packer.prototype.createDeflate = function() {
    return this._options.deflateFactory(this.getDeflateOptions());
  };
  Packer.prototype.filterData = function(data, width, height) {
    let packedData = bitPacker(data, width, height, this._options);
    let bpp = constants.COLORTYPE_TO_BPP_MAP[this._options.colorType];
    let filteredData = filter(packedData, width, height, this._options, bpp);
    return filteredData;
  };
  Packer.prototype._packChunk = function(type, data) {
    let len = data ? data.length : 0;
    let buf = Buffer.alloc(len + 12);
    buf.writeUInt32BE(len, 0);
    buf.writeUInt32BE(type, 4);
    if (data) {
      data.copy(buf, 8);
    }
    buf.writeInt32BE(CrcStream.crc32(buf.slice(4, buf.length - 4)), buf.length - 4);
    return buf;
  };
  Packer.prototype.packGAMA = function(gamma) {
    let buf = Buffer.alloc(4);
    buf.writeUInt32BE(Math.floor(gamma * constants.GAMMA_DIVISION), 0);
    return this._packChunk(constants.TYPE_gAMA, buf);
  };
  Packer.prototype.packIHDR = function(width, height) {
    let buf = Buffer.alloc(13);
    buf.writeUInt32BE(width, 0);
    buf.writeUInt32BE(height, 4);
    buf[8] = this._options.bitDepth;
    buf[9] = this._options.colorType;
    buf[10] = 0;
    buf[11] = 0;
    buf[12] = 0;
    return this._packChunk(constants.TYPE_IHDR, buf);
  };
  Packer.prototype.packIDAT = function(data) {
    return this._packChunk(constants.TYPE_IDAT, data);
  };
  Packer.prototype.packIEND = function() {
    return this._packChunk(constants.TYPE_IEND, null);
  };
});

// node_modules/pngjs/lib/packer-async.js
var require_packer_async = __commonJS((exports, module) => {
  var util = __require("util");
  var Stream = __require("stream");
  var constants = require_constants();
  var Packer = require_packer();
  var PackerAsync = module.exports = function(opt) {
    Stream.call(this);
    let options = opt || {};
    this._packer = new Packer(options);
    this._deflate = this._packer.createDeflate();
    this.readable = true;
  };
  util.inherits(PackerAsync, Stream);
  PackerAsync.prototype.pack = function(data, width, height, gamma) {
    this.emit("data", Buffer.from(constants.PNG_SIGNATURE));
    this.emit("data", this._packer.packIHDR(width, height));
    if (gamma) {
      this.emit("data", this._packer.packGAMA(gamma));
    }
    let filteredData = this._packer.filterData(data, width, height);
    this._deflate.on("error", this.emit.bind(this, "error"));
    this._deflate.on("data", function(compressedData) {
      this.emit("data", this._packer.packIDAT(compressedData));
    }.bind(this));
    this._deflate.on("end", function() {
      this.emit("data", this._packer.packIEND());
      this.emit("end");
    }.bind(this));
    this._deflate.end(filteredData);
  };
});

// node_modules/pngjs/lib/sync-inflate.js
var require_sync_inflate = __commonJS((exports, module) => {
  var assert = __require("assert").ok;
  var zlib = __require("zlib");
  var util = __require("util");
  var kMaxLength = __require("buffer").kMaxLength;
  function Inflate(opts) {
    if (!(this instanceof Inflate)) {
      return new Inflate(opts);
    }
    if (opts && opts.chunkSize < zlib.Z_MIN_CHUNK) {
      opts.chunkSize = zlib.Z_MIN_CHUNK;
    }
    zlib.Inflate.call(this, opts);
    this._offset = this._offset === undefined ? this._outOffset : this._offset;
    this._buffer = this._buffer || this._outBuffer;
    if (opts && opts.maxLength != null) {
      this._maxLength = opts.maxLength;
    }
  }
  function createInflate(opts) {
    return new Inflate(opts);
  }
  function _close(engine, callback) {
    if (callback) {
      process.nextTick(callback);
    }
    if (!engine._handle) {
      return;
    }
    engine._handle.close();
    engine._handle = null;
  }
  Inflate.prototype._processChunk = function(chunk, flushFlag, asyncCb) {
    if (typeof asyncCb === "function") {
      return zlib.Inflate._processChunk.call(this, chunk, flushFlag, asyncCb);
    }
    let self = this;
    let availInBefore = chunk && chunk.length;
    let availOutBefore = this._chunkSize - this._offset;
    let leftToInflate = this._maxLength;
    let inOff = 0;
    let buffers = [];
    let nread = 0;
    let error;
    this.on("error", function(err) {
      error = err;
    });
    function handleChunk(availInAfter, availOutAfter) {
      if (self._hadError) {
        return;
      }
      let have = availOutBefore - availOutAfter;
      assert(have >= 0, "have should not go down");
      if (have > 0) {
        let out = self._buffer.slice(self._offset, self._offset + have);
        self._offset += have;
        if (out.length > leftToInflate) {
          out = out.slice(0, leftToInflate);
        }
        buffers.push(out);
        nread += out.length;
        leftToInflate -= out.length;
        if (leftToInflate === 0) {
          return false;
        }
      }
      if (availOutAfter === 0 || self._offset >= self._chunkSize) {
        availOutBefore = self._chunkSize;
        self._offset = 0;
        self._buffer = Buffer.allocUnsafe(self._chunkSize);
      }
      if (availOutAfter === 0) {
        inOff += availInBefore - availInAfter;
        availInBefore = availInAfter;
        return true;
      }
      return false;
    }
    assert(this._handle, "zlib binding closed");
    let res;
    do {
      res = this._handle.writeSync(flushFlag, chunk, inOff, availInBefore, this._buffer, this._offset, availOutBefore);
      res = res || this._writeState;
    } while (!this._hadError && handleChunk(res[0], res[1]));
    if (this._hadError) {
      throw error;
    }
    if (nread >= kMaxLength) {
      _close(this);
      throw new RangeError("Cannot create final Buffer. It would be larger than 0x" + kMaxLength.toString(16) + " bytes");
    }
    let buf = Buffer.concat(buffers, nread);
    _close(this);
    return buf;
  };
  util.inherits(Inflate, zlib.Inflate);
  function zlibBufferSync(engine, buffer) {
    if (typeof buffer === "string") {
      buffer = Buffer.from(buffer);
    }
    if (!(buffer instanceof Buffer)) {
      throw new TypeError("Not a string or buffer");
    }
    let flushFlag = engine._finishFlushFlag;
    if (flushFlag == null) {
      flushFlag = zlib.Z_FINISH;
    }
    return engine._processChunk(buffer, flushFlag);
  }
  function inflateSync(buffer, opts) {
    return zlibBufferSync(new Inflate(opts), buffer);
  }
  module.exports = exports = inflateSync;
  exports.Inflate = Inflate;
  exports.createInflate = createInflate;
  exports.inflateSync = inflateSync;
});

// node_modules/pngjs/lib/sync-reader.js
var require_sync_reader = __commonJS((exports, module) => {
  var SyncReader = module.exports = function(buffer) {
    this._buffer = buffer;
    this._reads = [];
  };
  SyncReader.prototype.read = function(length, callback) {
    this._reads.push({
      length: Math.abs(length),
      allowLess: length < 0,
      func: callback
    });
  };
  SyncReader.prototype.process = function() {
    while (this._reads.length > 0 && this._buffer.length) {
      let read = this._reads[0];
      if (this._buffer.length && (this._buffer.length >= read.length || read.allowLess)) {
        this._reads.shift();
        let buf = this._buffer;
        this._buffer = buf.slice(read.length);
        read.func.call(this, buf.slice(0, read.length));
      } else {
        break;
      }
    }
    if (this._reads.length > 0) {
      throw new Error("There are some read requests waitng on finished stream");
    }
    if (this._buffer.length > 0) {
      throw new Error("unrecognised content at end of stream");
    }
  };
});

// node_modules/pngjs/lib/filter-parse-sync.js
var require_filter_parse_sync = __commonJS((exports) => {
  var SyncReader = require_sync_reader();
  var Filter = require_filter_parse();
  exports.process = function(inBuffer, bitmapInfo) {
    let outBuffers = [];
    let reader = new SyncReader(inBuffer);
    let filter = new Filter(bitmapInfo, {
      read: reader.read.bind(reader),
      write: function(bufferPart) {
        outBuffers.push(bufferPart);
      },
      complete: function() {}
    });
    filter.start();
    reader.process();
    return Buffer.concat(outBuffers);
  };
});

// node_modules/pngjs/lib/parser-sync.js
var require_parser_sync = __commonJS((exports, module) => {
  var hasSyncZlib = true;
  var zlib = __require("zlib");
  var inflateSync = require_sync_inflate();
  if (!zlib.deflateSync) {
    hasSyncZlib = false;
  }
  var SyncReader = require_sync_reader();
  var FilterSync = require_filter_parse_sync();
  var Parser = require_parser();
  var bitmapper = require_bitmapper();
  var formatNormaliser = require_format_normaliser();
  module.exports = function(buffer, options) {
    if (!hasSyncZlib) {
      throw new Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");
    }
    let err;
    function handleError(_err_) {
      err = _err_;
    }
    let metaData;
    function handleMetaData(_metaData_) {
      metaData = _metaData_;
    }
    function handleTransColor(transColor) {
      metaData.transColor = transColor;
    }
    function handlePalette(palette) {
      metaData.palette = palette;
    }
    function handleSimpleTransparency() {
      metaData.alpha = true;
    }
    let gamma;
    function handleGamma(_gamma_) {
      gamma = _gamma_;
    }
    let inflateDataList = [];
    function handleInflateData(inflatedData2) {
      inflateDataList.push(inflatedData2);
    }
    let reader = new SyncReader(buffer);
    let parser = new Parser(options, {
      read: reader.read.bind(reader),
      error: handleError,
      metadata: handleMetaData,
      gamma: handleGamma,
      palette: handlePalette,
      transColor: handleTransColor,
      inflateData: handleInflateData,
      simpleTransparency: handleSimpleTransparency
    });
    parser.start();
    reader.process();
    if (err) {
      throw err;
    }
    let inflateData = Buffer.concat(inflateDataList);
    inflateDataList.length = 0;
    let inflatedData;
    if (metaData.interlace) {
      inflatedData = zlib.inflateSync(inflateData);
    } else {
      let rowSize = (metaData.width * metaData.bpp * metaData.depth + 7 >> 3) + 1;
      let imageSize = rowSize * metaData.height;
      inflatedData = inflateSync(inflateData, {
        chunkSize: imageSize,
        maxLength: imageSize
      });
    }
    inflateData = null;
    if (!inflatedData || !inflatedData.length) {
      throw new Error("bad png - invalid inflate data response");
    }
    let unfilteredData = FilterSync.process(inflatedData, metaData);
    inflateData = null;
    let bitmapData = bitmapper.dataToBitMap(unfilteredData, metaData);
    unfilteredData = null;
    let normalisedBitmapData = formatNormaliser(bitmapData, metaData, options.skipRescale);
    metaData.data = normalisedBitmapData;
    metaData.gamma = gamma || 0;
    return metaData;
  };
});

// node_modules/pngjs/lib/packer-sync.js
var require_packer_sync = __commonJS((exports, module) => {
  var hasSyncZlib = true;
  var zlib = __require("zlib");
  if (!zlib.deflateSync) {
    hasSyncZlib = false;
  }
  var constants = require_constants();
  var Packer = require_packer();
  module.exports = function(metaData, opt) {
    if (!hasSyncZlib) {
      throw new Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");
    }
    let options = opt || {};
    let packer = new Packer(options);
    let chunks = [];
    chunks.push(Buffer.from(constants.PNG_SIGNATURE));
    chunks.push(packer.packIHDR(metaData.width, metaData.height));
    if (metaData.gamma) {
      chunks.push(packer.packGAMA(metaData.gamma));
    }
    let filteredData = packer.filterData(metaData.data, metaData.width, metaData.height);
    let compressedData = zlib.deflateSync(filteredData, packer.getDeflateOptions());
    filteredData = null;
    if (!compressedData || !compressedData.length) {
      throw new Error("bad png - invalid compressed data response");
    }
    chunks.push(packer.packIDAT(compressedData));
    chunks.push(packer.packIEND());
    return Buffer.concat(chunks);
  };
});

// node_modules/pngjs/lib/png-sync.js
var require_png_sync = __commonJS((exports) => {
  var parse = require_parser_sync();
  var pack = require_packer_sync();
  exports.read = function(buffer, options) {
    return parse(buffer, options || {});
  };
  exports.write = function(png, options) {
    return pack(png, options);
  };
});

// node_modules/pngjs/lib/png.js
var require_png = __commonJS((exports) => {
  var util = __require("util");
  var Stream = __require("stream");
  var Parser = require_parser_async();
  var Packer = require_packer_async();
  var PNGSync = require_png_sync();
  var PNG = exports.PNG = function(options) {
    Stream.call(this);
    options = options || {};
    this.width = options.width | 0;
    this.height = options.height | 0;
    this.data = this.width > 0 && this.height > 0 ? Buffer.alloc(4 * this.width * this.height) : null;
    if (options.fill && this.data) {
      this.data.fill(0);
    }
    this.gamma = 0;
    this.readable = this.writable = true;
    this._parser = new Parser(options);
    this._parser.on("error", this.emit.bind(this, "error"));
    this._parser.on("close", this._handleClose.bind(this));
    this._parser.on("metadata", this._metadata.bind(this));
    this._parser.on("gamma", this._gamma.bind(this));
    this._parser.on("parsed", function(data) {
      this.data = data;
      this.emit("parsed", data);
    }.bind(this));
    this._packer = new Packer(options);
    this._packer.on("data", this.emit.bind(this, "data"));
    this._packer.on("end", this.emit.bind(this, "end"));
    this._parser.on("close", this._handleClose.bind(this));
    this._packer.on("error", this.emit.bind(this, "error"));
  };
  util.inherits(PNG, Stream);
  PNG.sync = PNGSync;
  PNG.prototype.pack = function() {
    if (!this.data || !this.data.length) {
      this.emit("error", "No data provided");
      return this;
    }
    process.nextTick(function() {
      this._packer.pack(this.data, this.width, this.height, this.gamma);
    }.bind(this));
    return this;
  };
  PNG.prototype.parse = function(data, callback) {
    if (callback) {
      let onParsed, onError;
      onParsed = function(parsedData) {
        this.removeListener("error", onError);
        this.data = parsedData;
        callback(null, this);
      }.bind(this);
      onError = function(err) {
        this.removeListener("parsed", onParsed);
        callback(err, null);
      }.bind(this);
      this.once("parsed", onParsed);
      this.once("error", onError);
    }
    this.end(data);
    return this;
  };
  PNG.prototype.write = function(data) {
    this._parser.write(data);
    return true;
  };
  PNG.prototype.end = function(data) {
    this._parser.end(data);
  };
  PNG.prototype._metadata = function(metadata) {
    this.width = metadata.width;
    this.height = metadata.height;
    this.emit("metadata", metadata);
  };
  PNG.prototype._gamma = function(gamma) {
    this.gamma = gamma;
  };
  PNG.prototype._handleClose = function() {
    if (!this._parser.writable && !this._packer.readable) {
      this.emit("close");
    }
  };
  PNG.bitblt = function(src, dst, srcX, srcY, width, height, deltaX, deltaY) {
    srcX |= 0;
    srcY |= 0;
    width |= 0;
    height |= 0;
    deltaX |= 0;
    deltaY |= 0;
    if (srcX > src.width || srcY > src.height || srcX + width > src.width || srcY + height > src.height) {
      throw new Error("bitblt reading outside image");
    }
    if (deltaX > dst.width || deltaY > dst.height || deltaX + width > dst.width || deltaY + height > dst.height) {
      throw new Error("bitblt writing outside image");
    }
    for (let y = 0;y < height; y++) {
      src.data.copy(dst.data, (deltaY + y) * dst.width + deltaX << 2, (srcY + y) * src.width + srcX << 2, (srcY + y) * src.width + srcX + width << 2);
    }
  };
  PNG.prototype.bitblt = function(dst, srcX, srcY, width, height, deltaX, deltaY) {
    PNG.bitblt(this, dst, srcX, srcY, width, height, deltaX, deltaY);
    return this;
  };
  PNG.adjustGamma = function(src) {
    if (src.gamma) {
      for (let y = 0;y < src.height; y++) {
        for (let x = 0;x < src.width; x++) {
          let idx = src.width * y + x << 2;
          for (let i = 0;i < 3; i++) {
            let sample = src.data[idx + i] / 255;
            sample = Math.pow(sample, 1 / 2.2 / src.gamma);
            src.data[idx + i] = Math.round(sample * 255);
          }
        }
      }
      src.gamma = 0;
    }
  };
  PNG.prototype.adjustGamma = function() {
    PNG.adjustGamma(this);
  };
});

// src/index.ts
var import_canvas = __toESM(require_canvas(), 1);
var import_pngjs = __toESM(require_png(), 1);
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
var ALPHA_THRESHOLD = 0.002;
var MAX_ALPHA = 0.99;
var LOGO_VALUE = 255;
var ASSETS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "assets");
var alphaMapCache = {};
function calculateAlphaMap(data, width, height) {
  const alphaMap = new Float32Array(width * height);
  for (let i = 0;i < alphaMap.length; i++) {
    const idx = i * 4;
    alphaMap[i] = Math.max(data[idx], data[idx + 1], data[idx + 2]) / 255;
  }
  return alphaMap;
}
function removeWatermarkPixels(data, imageWidth, alphaMap, position) {
  const { x, y, width, height } = position;
  for (let row = 0;row < height; row++) {
    for (let col = 0;col < width; col++) {
      const imgIdx = ((y + row) * imageWidth + (x + col)) * 4;
      const alphaIdx = row * width + col;
      let alpha = alphaMap[alphaIdx];
      if (alpha < ALPHA_THRESHOLD)
        continue;
      alpha = Math.min(alpha, MAX_ALPHA);
      const oneMinusAlpha = 1 - alpha;
      for (let c = 0;c < 3; c++) {
        const watermarked = data[imgIdx + c];
        const original = (watermarked - alpha * LOGO_VALUE) / oneMinusAlpha;
        data[imgIdx + c] = Math.max(0, Math.min(255, Math.round(original)));
      }
    }
  }
}
function detectConfig(width, height) {
  return width > 1024 && height > 1024 ? { logoSize: 96, marginRight: 64, marginBottom: 64 } : { logoSize: 48, marginRight: 32, marginBottom: 32 };
}
function getAlphaMap(size) {
  const cached = alphaMapCache[size];
  if (cached)
    return cached;
  const pngPath = path.join(ASSETS_DIR, `bg_${size}.png`);
  const fileData = readFileSync(pngPath);
  const png = import_pngjs.PNG.sync.read(fileData);
  const alphaMap = calculateAlphaMap(png.data, png.width, png.height);
  alphaMapCache[size] = alphaMap;
  return alphaMap;
}
async function removeGeminiWatermark(filePath) {
  try {
    const img = await import_canvas.loadImage(filePath);
    const { width, height } = img;
    const canvas = import_canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, width, height);
    const config = detectConfig(width, height);
    const position = {
      x: width - config.marginRight - config.logoSize,
      y: height - config.marginBottom - config.logoSize,
      width: config.logoSize,
      height: config.logoSize
    };
    const alphaMap = getAlphaMap(config.logoSize);
    removeWatermarkPixels(imageData.data, width, alphaMap, position);
    ctx.putImageData(imageData, 0, 0);
    const buffer = canvas.toBuffer("image/png");
    writeFileSync(filePath, buffer);
    console.log(`[watermark] Removed Gemini watermark: ${filePath} (${width}x${height}, logo=${config.logoSize}px)`);
    return true;
  } catch (error) {
    console.error("[watermark] Failed to remove Gemini watermark:", error);
    return false;
  }
}
var src_default = removeGeminiWatermark;
export {
  removeGeminiWatermark,
  detectConfig,
  src_default as default,
  calculateAlphaMap
};
