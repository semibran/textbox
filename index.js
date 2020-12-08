(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };
  var __exportStar = (target, module, desc) => {
    __markAsModule(target);
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", {value: module, enumerable: true}), module);
  };

  // node_modules/.pnpm/css-string@1.0.1/node_modules/css-string/lib/css-string.js
  var require_css_string = __commonJS((exports, module) => {
    module.exports = function stringify(style) {
      let result = "";
      let prefix = "";
      for (const prop in style) {
        const value = style[prop];
        if (typeof value === "object") {
          result += prop + "{" + stringify(value) + "}";
        } else {
          result += prefix + prop + ":" + value;
          prefix = ";";
        }
      }
      return result;
    };
  });

  // node_modules/.pnpm/img-extract@1.0.0/node_modules/img-extract/lib/img-extract.js
  var require_img_extract = __commonJS((exports, module) => {
    module.exports = function extract4(image, x, y, width, height) {
      var canvas9 = document.createElement("canvas");
      var context = canvas9.getContext("2d");
      canvas9.width = width;
      canvas9.height = height;
      context.drawImage(image, -x, -y);
      return canvas9;
    };
  });

  // src/fonts/seven.js
  var require_seven = __commonJS((exports, module) => {
    module.exports = {
      id: "seven",
      cellwidth: 7,
      cellheight: 9,
      charwidth: 5,
      charheight: 7,
      charspace: 1,
      wordspace: 3,
      linespace: 5,
      exceptions: {
        1: {width: 3},
        I: {width: 3},
        f: {width: 4},
        g: {height: 9},
        i: {width: 1},
        j: {width: 2, height: 8},
        k: {width: 4},
        l: {width: 1, x: 0},
        m: {width: 7},
        p: {height: 9},
        q: {height: 9},
        r: {width: 4},
        t: {width: 4},
        w: {width: 7},
        y: {height: 9},
        ",": {width: 2, height: 9},
        ".": {width: 1},
        "!": {width: 1},
        "'": {width: 1},
        "(": {width: 3},
        ")": {width: 3}
      },
      layout: [
        "0123456789",
        "ABCDEFGHIJ",
        "KLMNOPQRST",
        "UVWXYZ,.!?",
        "abcdefghij",
        "klmnopqrst",
        "uvwxyz'()"
      ]
    };
  });

  // src/lib/store.js
  function Store({state, actions}) {
    const listeners = {"*": []};
    for (const cmdname in actions) {
      listeners[cmdname] = [];
    }
    const patches = [];
    if (patches.length) {
      state = revert(state, patches);
    } else {
      state = {...state};
    }
    const init3 = (fn) => {
      fn(state, dispatch);
    };
    const listen2 = (cmdname, fn) => {
      if (!listeners[cmdname]) {
        throw new Error("Failed to listen for action " + cmdname + ":Action has not been defined");
      }
      listeners[cmdname].push(fn);
    };
    const dispatch = (cmdname, ...cmdargs) => {
      const action = actions[cmdname];
      if (!action) {
        throw new Error("Failed to dispatch command: No corresponding action found for command " + cmdname);
      }
      const patch = action(state, dispatch, cmdargs);
      Object.assign(state, patch);
      patches.push(patch);
      for (const fn of listeners["*"].concat(listeners[cmdname])) {
        fn(state, dispatch);
      }
      return patch;
    };
    return {init: init3, listen: listen2, dispatch};
  }
  function revert(state, patches) {
    state = {...state};
    const keys = [];
    for (const key in state) {
      keys.push(key);
    }
    for (let i = patches.length - 1; keys.length && i--; ) {
      const patch = patches[i];
      for (const key in patch) {
        const idx = keys.indexOf(key);
        if (idx === -1)
          continue;
        keys.splice(idx, 1);
        state[key] = patch[key];
        if (!keys.length)
          break;
      }
    }
    return state;
  }

  // src/view.js
  var css_string = __toModule(require_css_string());

  // src/lib/canvas.js
  function create(width, height) {
    const canvas9 = document.createElement("canvas");
    canvas9.width = width;
    canvas9.height = height;
    return canvas9.getContext("2d");
  }
  function copy(canvas9) {
    const result = create(canvas9.width, canvas9.height);
    result.drawImage(canvas9, 0, 0);
    return result;
  }

  // src/lib/canvas-recolor.js
  function recolor(canvas9, color) {
    const context = canvas9.getContext("2d");
    const image = context.getImageData(0, 0, canvas9.width, canvas9.height);
    if (!color[3]) {
      color = [color[0], color[1], color[2], 255];
    }
    for (let i = 0; i < image.data.length; i += 4) {
      if (image.data[i + 3] === 0)
        continue;
      for (let c = 0; c < 4; c++) {
        image.data[i + c] = color[c];
      }
    }
    context.putImageData(image, 0, 0);
    return canvas9;
  }

  // src/lib/style-vshadow.js
  function drawVShadow(image, color) {
    const result = create(image.width + 1, image.height + 1);
    const shadow = recolor(copy(image).canvas, color);
    result.drawImage(shadow, 0, 1);
    result.drawImage(image, 0, 0);
    return result.canvas;
  }

  // src/disasm/charmap.js
  var img_extract = __toModule(require_img_extract());
  function get(font, color) {
    if (font.cache[color])
      return font.cache[color];
    font.cache[color] = make(font.image, font.data, color);
    return font.cache[color];
  }
  function make(image, font, color, stroke) {
    if (!image) {
      throw new Error("No image found for font " + font.id + ". Try rebuilding your spritesheet.");
    }
    const charmap4 = {};
    const cols = image.width / font.cellwidth;
    const rows = image.height / font.cellheight;
    if (color) {
      image = recolor(image, color);
    }
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const char = font.layout[row][col];
        if (!char)
          continue;
        const size = {
          width: font.charwidth,
          height: font.charheight
        };
        const offsets = font.exceptions[char];
        for (const axis in offsets) {
          size[axis] = offsets[axis];
        }
        const x = col * font.cellwidth;
        const y = row * font.cellheight;
        const base = img_extract.default(image, x, y, size.width, size.height);
        charmap4[char] = base;
      }
    }
    return charmap4;
  }

  // src/lib/text-split.js
  function split(text2, font, width) {
    const lines = [];
    let space = 0;
    let split2 = 0;
    let x = 0;
    let i = 0;
    for (; i < text2.length; i++) {
      const char = text2[i];
      if (char === " ") {
        x += font.wordspace;
        space = i;
      } else {
        const except = font.exceptions[char];
        if (except && except.width) {
          x += except.width + font.charspace;
        } else {
          x += font.charwidth + font.charspace;
        }
      }
      if (x > width) {
        x = 0;
        if (space) {
          lines.push(text2.slice(split2, space));
          split2 = space + 1;
          space = 0;
        } else if (i > split2) {
          lines.push(text2.slice(split2, i));
          split2 = i;
        } else {
          lines.push(text2.slice(split2, split2 + 1));
          split2 = i + 1;
        }
      }
    }
    const line = text2.slice(split2, i);
    if (line)
      lines.push(line);
    return lines;
  }

  // src/lib/rgb.js
  function rgb(r, g, b) {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  // dist/tmp/sprites.json
  var palette = [16, 63, 6, 6];
  var font_seven = [0, 0, 70, 63];
  var grass = [0, 63, 16, 16];
  var icons = [70, 12, 5, 3];
  var tags = [70, 0, 5, 12];
  var sprites_default = {palette, "font-seven": font_seven, grass, icons, tags};

  // node_modules/.pnpm/img-load@2.0.0/node_modules/img-load/lib/img-load.js
  function loadImage(path) {
    return new Promise(function(resolve, reject) {
      var image = new Image();
      image.src = path;
      image.onload = function() {
        resolve(image);
      };
      image.onerror = function() {
        reject(new Error("Failed to load image `" + path + "`"));
      };
    });
  }

  // src/lib/disasm.js
  var img_extract2 = __toModule(require_img_extract());
  function disasm(sheet, srcmap) {
    const sprites8 = {};
    for (const id in srcmap) {
      if (Array.isArray(srcmap[id])) {
        const [x, y, w, h] = srcmap[id];
        sprites8[id] = img_extract2.default(sheet, x, y, w, h);
      } else {
        sprites8[id] = disasm(sheet, srcmap[id]);
      }
    }
    return sprites8;
  }

  // src/lib/pixels.js
  function fromCanvas(canvas9) {
    return canvas9.getContext("2d").getImageData(0, 0, canvas9.width, canvas9.height);
  }
  function get2(image, x, y) {
    const i = (y * image.width + x) * 4;
    const r = image.data[i];
    const g = image.data[i + 1];
    const b = image.data[i + 2];
    const a = image.data[i + 3];
    return [r, g, b, a];
  }

  // src/disasm/palette.js
  var matrix = [
    ["white", "opal", "pink", "lime", "opalhp", "redhp"],
    ["black", "blue", "red", "green", null, "orangehp"],
    ["silver", "navy", "purple", "teal", "beige", "yellowhp"],
    ["gray", null, "maroon", "moss", "taupe", "greenhp"],
    ["coal", null, "yellow", "gold", "brass", "bluehp"],
    ["jet", null, "cream", "sage", "brown", "indigohp"]
  ];
  var mappings = {
    hp: {
      opal: "opal",
      red: "red",
      orange: "orangehp",
      yellow: "yellowhp",
      green: "greenhp",
      blue: "bluehp",
      indigo: "indigohp"
    },
    factions: {
      player: {
        light: "opal",
        normal: "blue",
        dark: "navy"
      },
      enemy: {
        light: "pink",
        normal: "red",
        dark: "purple"
      },
      ally: {
        light: "lime",
        normal: "green",
        dark: "teal"
      }
    }
  };
  function match(image) {
    const palette4 = {};
    const data = fromCanvas(image);
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        const colorname = matrix[y][x];
        if (!colorname)
          continue;
        palette4[colorname] = get2(data, x, y);
      }
    }
    assign(palette4, mappings);
    return palette4;
    function assign(obj, mappings2) {
      for (const n in mappings2) {
        if (typeof mappings2[n] === "object") {
          obj[n] = {};
          assign(obj[n], mappings2[n]);
        } else {
          obj[n] = palette4[mappings2[n]];
        }
      }
    }
  }

  // src/disasm/fonts.js
  function disasmFonts(images, fonts3) {
    const result = {};
    for (const fontid in fonts3) {
      const font = fonts3[fontid];
      const image = images["font-" + font.id];
      result[font.id] = {
        image,
        data: font,
        cache: {"255,255,255,255": make(image, font)}
      };
    }
    return result;
  }

  // src/disasm/icons.js
  function disasmIcons(images) {
    return {arrow: images.icons};
  }

  // src/disasm/tags.js
  var img_extract3 = __toModule(require_img_extract());

  // src/lib/canvas-replace.js
  function replaceColor(canvas9, oldColors, newColors) {
    const context = canvas9.getContext("2d");
    const image = context.getImageData(0, 0, canvas9.width, canvas9.height);
    for (let i = 0; i < image.data.length; i += 4) {
      let o = 0;
      for (; o < oldColors.length; o++) {
        let c = 0;
        for (; c < 4; c++) {
          if (image.data[i + c] !== oldColors[o][c]) {
            break;
          }
        }
        if (c === 4) {
          break;
        }
      }
      if (o < oldColors.length) {
        for (let c = 0; c < 4; c++) {
          image.data[i + c] = newColors[o][c];
        }
      }
    }
    context.putImageData(image, 0, 0);
    return canvas9;
  }

  // src/disasm/tags.js
  function disasmTags(image, palette4) {
    const tags4 = {};
    const oldColors = [
      [255, 255, 255, 255],
      [204, 204, 204, 255],
      [153, 153, 153, 255],
      [102, 102, 102, 255],
      [51, 51, 51, 255],
      [0, 0, 0, 255]
    ];
    const yellows = [palette4.yellow, palette4.gold, palette4.brass];
    const colors = {
      default: [palette4.brass, palette4.brown, palette4.jet],
      player: [palette4.opal, palette4.coal, palette4.jet],
      enemy: [palette4.pink, palette4.maroon, palette4.jet],
      ally: [palette4.lime, palette4.moss, palette4.jet]
    };
    for (const scheme in colors) {
      const subpal = colors[scheme];
      const newColors = yellows.concat(subpal);
      const canvas9 = copy(image).canvas;
      replaceColor(canvas9, oldColors, newColors);
      tags4[scheme] = {
        start: img_extract3.default(canvas9, 0, 0, 2, 12),
        end: img_extract3.default(canvas9, 2, 0, 3, 12),
        palette: subpal
      };
    }
    return tags4;
  }

  // src/fonts/index.js
  var fonts_exports = {};
  __export(fonts_exports, {
    seven: () => seven.default
  });
  var seven = __toModule(require_seven());

  // src/sprites.js
  var palette3 = null;
  var fonts2 = null;
  var icons3 = null;
  var tags3 = null;
  async function load(path) {
    const sheet = await loadImage(path);
    const images = disasm(sheet, sprites_default);
    palette3 = match(images.palette);
    fonts2 = disasmFonts(images, fonts_exports);
    icons3 = disasmIcons(images);
    tags3 = disasmTags(images.tags, palette3);
  }

  // src/render/box.js
  function Box(width, height) {
    const box2 = create(width + 2, height + 2);
    box2.fillStyle = rgb(...palette3.brown);
    box2.fillRect(0, 1, width + 2, height);
    box2.fillRect(1, 0, width, height + 2);
    box2.fillStyle = rgb(...palette3.taupe);
    box2.fillRect(0, 1, width + 1, height - 1);
    box2.fillRect(1, 0, width - 1, height + 1);
    box2.fillStyle = rgb(...palette3.beige);
    box2.fillRect(0, 1, width, height - 2);
    box2.fillRect(1, 0, width - 2, height);
    box2.fillStyle = rgb(...palette3.taupe);
    box2.fillRect(2, 1, width - 4, height - 2);
    box2.fillRect(1, 2, width - 2, height - 4);
    box2.fillStyle = rgb(...palette3.beige);
    box2.fillRect(2, 2, width - 4, height - 4);
    return box2.canvas;
  }

  // src/lib/text-width.js
  function findTextWidth(content, font) {
    let width = 0;
    for (const char of content) {
      if (char === " ") {
        width += font.data.wordspace;
        continue;
      }
      const cache = font.cache["255,255,255,255"];
      let image = cache[char];
      if (!image)
        image = cache[char.toUpperCase()];
      if (!image)
        continue;
      width += image.width + font.data.charspace;
    }
    if (width) {
      width -= font.data.charspace;
    }
    return width;
  }

  // src/lib/style-shadow.js
  function drawShadow(image, color) {
    const result = create(image.width + 1, image.height + 1);
    const shadow = recolor(copy(image).canvas, color);
    result.drawImage(shadow, 0, 1);
    result.drawImage(shadow, 1, 0);
    result.drawImage(shadow, 1, 1);
    result.drawImage(image, 0, 0);
    return result.canvas;
  }

  // src/render/text.js
  function Text(content, style, width) {
    style = Object.assign({
      font: fonts2.seven,
      color: palette3.white,
      shadow: null
    }, style);
    const font = style.font;
    if (!font) {
      throw new Error("Attempting to render an unregistered font. Is your font exported by fonts/index.js?");
    }
    let charmap4 = font.cache[style.color];
    if (!charmap4) {
      charmap4 = make(font.image, font.data, style.color);
      font.cache[style.color] = charmap4;
    }
    content = content.toString();
    if (!width) {
      width = findTextWidth(content, font, style.stroke);
    }
    let height = font.data.cellheight;
    if (style.stroke) {
      height += 2;
    }
    const text2 = create(width, height);
    let x = 0;
    let kerning = font.data.charspace;
    if (style.stroke) {
      kerning -= 2;
    }
    for (const char of content) {
      if (char === " ") {
        x += font.data.wordspace;
        continue;
      }
      let image = charmap4[char];
      if (!image)
        image = charmap4[char.toUpperCase()];
      if (!image)
        continue;
      text2.drawImage(image, x, 0);
      x += image.width + kerning;
    }
    if (style.shadow) {
      return drawShadow(text2.canvas, style.shadow);
    } else {
      return text2.canvas;
    }
  }

  // src/render/tag.js
  function renderNameTag(name, faction) {
    const pady = 2;
    const text2 = Text(name, {shadow: palette3.jet});
    const width = 52;
    const height = pady + text2.height - 2 + pady;
    const tag2 = renderTag(width, height, faction).getContext("2d");
    const x = Math.ceil(width / 2 - (text2.width - 1) / 2);
    tag2.drawImage(text2, x, pady);
    return tag2.canvas;
  }
  function renderTag(width, height, faction) {
    if (!faction)
      faction = "default";
    const palette4 = tags3[faction].palette;
    const tag2 = create(width + 1, height);
    tag2.fillStyle = rgb(...palette4[0]);
    tag2.fillRect(2, 0, width - 3, 1);
    tag2.fillStyle = rgb(...palette4[1]);
    tag2.fillRect(2, 1, width - 3, height - 2);
    tag2.fillStyle = rgb(...palette4[2]);
    tag2.fillRect(2, height - 1, width - 3, 1);
    tag2.drawImage(tags3[faction].start, 0, 0);
    tag2.drawImage(tags3[faction].end, width - 2, 0);
    return tag2.canvas;
  }

  // src/render/textbox.js
  function TextBox(name, content, width) {
    const padx = 9;
    const pady = 8;
    const tagx = 6;
    const tagy = 8;
    const font = fonts2.seven;
    const innerwidth = width - padx * 2;
    const height = (font.data.cellheight + font.data.linespace) * 2 + pady * 2;
    const box2 = Box(width - 2, height - 2);
    let tag2 = null;
    const textbox3 = create(width, height + tagy);
    rename(name);
    const charmap4 = get(font, palette3.jet);
    const shadowmap = get(font, palette3.taupe);
    let i, x, y, col, row, lines;
    load2(content);
    return {canvas: textbox3.canvas, write, load: load2, rename};
    function write() {
      const char = content[i++];
      if (!char)
        return false;
      if (char === " ") {
        x += font.data.wordspace;
      } else {
        const image = charmap4[char] || charmap4[char.toUpperCase()];
        if (!image) {
          console.warn('No char found for "' + char + '", skipping...');
        } else {
          const shadow = shadowmap[char] || shadowmap[char.toUpperCase()];
          textbox3.drawImage(shadow, x + 1, y + 1);
          textbox3.drawImage(shadow, x, y + 1);
          textbox3.drawImage(shadow, x + 1, y);
          textbox3.drawImage(image, x, y);
          x += image.width + font.data.charspace;
        }
      }
      if (++col > lines[row].length) {
        x = padx;
        y += font.data.cellheight + font.data.linespace;
        col = 0;
        row++;
      }
      return true;
    }
    function load2(text2) {
      clear();
      i = 0;
      x = padx;
      y = pady + tagy + 2;
      col = 0;
      row = 0;
      content = text2;
      lines = split(content, font.data, innerwidth);
    }
    function clear() {
      textbox3.fillStyle = rgb(...palette3.beige);
      textbox3.fillRect(padx, pady + tagy + 1, width - padx * 2, height - pady * 2 + 1);
    }
    function rename(name2, side = "left") {
      tag2 = drawVShadow(renderNameTag(name2), palette3.taupe);
      let x2 = tagx;
      if (side === "right") {
        x2 = textbox3.canvas.width - tag2.width - tagx;
      }
      textbox3.clearRect(0, 0, textbox3.canvas.width, textbox3.canvas.height);
      textbox3.drawImage(box2, 0, tagy);
      textbox3.drawImage(tag2, x2, 0);
    }
  }

  // src/view.js
  var $main = document.querySelector("main");
  var $style = document.createElement("style");
  document.head.appendChild($style);
  var textbox2 = null;
  var writing = true;
  var animating = false;
  var speakerid = null;
  var index = 0;
  var offset = 0;
  var arrow = null;
  var mask = null;
  function render(state) {
    if (animating)
      return false;
    if (writing) {
      writing = textbox2.write();
    } else {
      const ctx = textbox2.canvas.getContext("2d");
      const x = textbox2.canvas.width - 16;
      const y = textbox2.canvas.height - 16;
      const a = 1;
      const d = 45;
      const t = state.time % d / d;
      ctx.drawImage(mask, x, y + offset);
      offset = Math.round(Math.sin(t * 2 * Math.PI) * a);
      ctx.drawImage(arrow, x, y + offset);
    }
  }
  function init(state, dispatch, listen2) {
    const viewport = state.viewport;
    const {width, height, scale} = viewport;
    $style.innerHTML = css_string.default({
      main: {
        width: width + "px",
        height: height + "px",
        transform: `scale(${scale})`
      }
    });
    const scene = state.scene;
    const [id, content] = scene.script[scene.index];
    const speaker = scene.actors[id];
    const boxwidth = Math.min(200, viewport.width - 8);
    textbox2 = TextBox(speaker.name, content, boxwidth);
    textbox2.canvas.className = "textbox";
    speakerid = id;
    arrow = drawVShadow(recolor(copy(icons3.arrow).canvas, palette3.jet), palette3.taupe);
    mask = recolor(copy(arrow).canvas, palette3.beige);
    setTimeout((_) => {
      listen2("update", render);
      listen2("advance", onadvance);
      function update() {
        dispatch("update");
        window.requestAnimationFrame(update);
      }
      const $textbox = textbox2.canvas;
      $main.appendChild($textbox);
      animating = true;
      $textbox.classList.add("-enter");
      $textbox.addEventListener("animationend", function onend() {
        $textbox.removeEventListener("animationend", onend);
        $textbox.classList.remove("-enter");
        animating = false;
        update();
      });
      window.addEventListener("resize", (_2) => dispatch("resize"));
      window.addEventListener("click", (_2) => dispatch("advance"));
    }, 500);
  }
  function onadvance({scene}) {
    if (scene.index === index)
      return;
    index = scene.index;
    const [id, content] = scene.script[scene.index];
    if (speakerid !== id) {
      speakerid = id;
      const $textbox = textbox2.canvas;
      animating = true;
      $textbox.classList.add("-exit");
      $textbox.addEventListener("animationend", function onend() {
        $textbox.removeEventListener("animationend", onend);
        $textbox.classList.remove("-exit");
        const speaker = scene.actors[id];
        textbox2.rename(speaker.name, speaker.side);
        textbox2.load(content);
        $textbox.classList.add("-enter");
        $textbox.addEventListener("animationend", function onend2() {
          $textbox.removeEventListener("animationend", onend2);
          $textbox.classList.remove("-enter");
          animating = false;
          writing = true;
        });
      });
    } else {
      textbox2.load(content);
      writing = true;
    }
  }

  // src/index.js
  var units = [
    {name: "Chorizo", cell: [2, 7], faction: "player"},
    {name: "Orc", cell: [7, 2], faction: "enemy"}
  ];
  var {init: init2, listen} = Store({
    state: {
      time: 0,
      screen: "game",
      scene: {
        index: 0,
        writing: true,
        done: false,
        actors: [
          {name: "Dodo", side: "left"},
          {name: "???", side: "right"},
          {name: "???", side: "left"}
        ],
        script: [
          [0, "Hi! Let's draw some text."],
          [0, "Here's some long text that displays on two lines."],
          [1, "When someone else talks, the text box reanimates."],
          [1, "An actor's name can be drawn on either side."],
          [2, "Each actor also has its own ID."],
          [2, "This way, different actors can have the same name."]
        ]
      },
      game: {
        select: null,
        width: 9,
        height: 9,
        units,
        pending: units.filter((unit) => unit.faction === "player"),
        phase: "player"
      },
      viewport: {
        native: {
          width: 160,
          height: 160
        },
        width: window.innerWidth,
        height: window.innerHeight,
        scale: 2
      }
    },
    actions: {
      update: (state) => ({time: state.time + 1}),
      switchscr: (state, _, [newscr]) => ({screen: newscr}),
      resize: ({viewport}) => {
        const minhscale = Math.floor(window.innerWidth / viewport.native.width);
        const minvscale = Math.floor(window.innerHeight / viewport.native.height);
        const hscale = Math.max(1, minhscale);
        const vscale = Math.max(1, minvscale);
        const scale = Math.min(hscale, vscale);
        const width = Math.ceil(window.innerWidth / scale);
        const height = Math.ceil(window.innerHeight / scale);
        return {viewport: {...viewport, width, height, scale}};
      },
      advance: ({scene}) => {
        if (!scene.script[scene.index + 1])
          return {scene};
        return {scene: {...scene, writing: true, index: scene.index + 1}};
      }
    }
  });
  init2(async (state, dispatch) => {
    await load("./sprites.png");
    dispatch("resize");
    init(state, dispatch, listen);
  });
})();
//# sourceMappingURL=index.js.map
