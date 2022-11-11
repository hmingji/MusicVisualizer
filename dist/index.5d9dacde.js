// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gzp3I":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "ee62429a5d9dacde";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"1Z4Rq":[function(require,module,exports) {
var _audio = require("./audio");
var _backgroundImage = require("./backgroundImage");
var _canvas = require("./canvas");
var _font = require("./font");
var _export = require("./export");
var _lyrics = require("./lyrics");
var _setting = require("./setting");
var _reset = require("./reset");
document.addEventListener("dragover", (e)=>e.preventDefault());
document.addEventListener("drop", (e)=>e.preventDefault());
function initApp() {
    (0, _font.initResponsiveFont)();
    (0, _audio.initAudio)();
    (0, _canvas.initCanvas)();
    (0, _backgroundImage.initBackgroundImage)();
    (0, _export.initExport)();
    (0, _lyrics.initLyrics)();
    (0, _reset.initReset)();
    (0, _setting.initSetting)();
}
initApp();

},{"./audio":"daaY0","./backgroundImage":"8P78Q","./canvas":"13tVG","./font":"7LH5h","./export":"lGrd7","./lyrics":"hG7RE","./setting":"beIpt","./reset":"50Kuz"}],"daaY0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initAudio", ()=>initAudio);
parcelHelpers.export(exports, "getAudioPlayState", ()=>getAudioPlayState);
parcelHelpers.export(exports, "setAudioPlayState", ()=>setAudioPlayState);
parcelHelpers.export(exports, "resetAudio", ()=>resetAudio);
parcelHelpers.export(exports, "getAudioCtx", ()=>getAudioCtx);
parcelHelpers.export(exports, "initAudioAnalyser", ()=>initAudioAnalyser);
var _fileUpload = require("./fileUpload");
var _domLoader = require("./domLoader");
var _isMultipleFiles = require("./util/isMultipleFiles");
var _isCorrectFileType = require("./util/isCorrectFileType");
var _setElementActiveState = require("./util/setElementActiveState");
const audioCtx = new AudioContext();
let isRunning = false;
let audioSource;
let audioAnalyser;
function initAudio() {
    (0, _fileUpload.setFileDropEventHandler)((0, _domLoader.audioFileDropzone), handleFileDrop);
    (0, _fileUpload.setFileInputHandler)((0, _domLoader.audioFileInput), handleFileInput);
    setAudioHandler();
}
function getAudioPlayState() {
    return isRunning;
}
function setAudioPlayState(state) {
    isRunning = state;
}
function resetAudio() {
    if ((0, _domLoader.audio).src) URL.revokeObjectURL((0, _domLoader.audio).src);
    (0, _domLoader.audio).src = "";
}
function getAudioCtx() {
    return audioCtx;
}
function initAudioAnalyser() {
    if (!audioSource) audioSource = audioCtx.createMediaElementSource((0, _domLoader.audio));
    audioAnalyser = audioCtx.createAnalyser();
    audioSource.connect(audioAnalyser);
    audioAnalyser.connect(audioCtx.destination);
    audioAnalyser.fftSize = 256;
    audioAnalyser.smoothingTimeConstant = 0.8;
    audioAnalyser.minDecibels = -80;
    audioAnalyser.maxDecibels = -10;
    return audioAnalyser;
}
function handleFileDrop(e) {
    e.preventDefault();
    (0, _setElementActiveState.setElementActiveState)(e.currentTarget, false);
    const { files  } = e.dataTransfer;
    if ((0, _isMultipleFiles.isMultipleFiles)(files)) return alert("Only one audio file to be uploaded.");
    if (!(0, _isCorrectFileType.isCorrectFileType)(files, [
        "audio/mpeg",
        "audio/wav"
    ])) return alert("File type uploaded is not correct.");
    (0, _domLoader.audio).src = URL.createObjectURL(files[0]);
    (0, _domLoader.audio).load();
    (0, _domLoader.audioPlayButton).disabled = false;
    (0, _domLoader.exportButton).disabled = false;
    (0, _domLoader.resetButton).disabled = false;
    (0, _domLoader.audioFileDropzone).style.display = "none";
    (0, _fileUpload.displayFileChip)(files[0], (0, _domLoader.audioFileDropzone).nextElementSibling, "audio");
}
function handleFileInput(e) {
    const { files  } = e.target;
    if ((0, _isMultipleFiles.isMultipleFiles)(files)) return alert("Only one audio file to be uploaded.");
    if (!(0, _isCorrectFileType.isCorrectFileType)(files, [
        "audio/mpeg",
        "audio/wav"
    ])) return alert("File type uploaded is not correct.");
    (0, _domLoader.audio).src = URL.createObjectURL(files[0]);
    (0, _domLoader.audio).load();
    (0, _domLoader.audioPlayButton).disabled = false;
    (0, _domLoader.exportButton).disabled = false;
    (0, _domLoader.resetButton).disabled = false;
    (0, _domLoader.audioFileInput).parentElement.style.display = "none";
    (0, _fileUpload.displayFileChip)(files[0], (0, _domLoader.audioFileInput).parentElement.nextElementSibling, "audio");
    (0, _domLoader.audioFileInput).value = "";
}
function setAudioHandler() {
    (0, _domLoader.audio).addEventListener("play", (e)=>{
        isRunning = true;
        (0, _domLoader.audioPlayButton).textContent = "Pause";
        (0, _domLoader.settingPanelBackdrop).style.display = "block";
        (0, _domLoader.resetButton).disabled = true;
        (0, _domLoader.exportButton).disabled = true;
    });
    (0, _domLoader.audio).addEventListener("pause", (e)=>{
        isRunning = false;
        (0, _domLoader.audioPlayButton).textContent = "Play";
        (0, _domLoader.settingPanelBackdrop).style.display = "none";
        (0, _domLoader.resetButton).disabled = false;
        (0, _domLoader.exportButton).disabled = false;
    });
    (0, _domLoader.audio).addEventListener("ended", (e)=>{
        isRunning = false;
        (0, _domLoader.audioPlayButton).textContent = "Play";
        (0, _domLoader.settingPanelBackdrop).style.display = "none";
        (0, _domLoader.resetButton).disabled = false;
        (0, _domLoader.exportButton).disabled = false;
    });
}

},{"./fileUpload":"6St3o","./domLoader":"hbKVM","./util/isMultipleFiles":"hUaZm","./util/isCorrectFileType":"7sF3r","./util/setElementActiveState":"gtRTI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6St3o":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setFileDropEventHandler", ()=>setFileDropEventHandler);
parcelHelpers.export(exports, "setFileInputHandler", ()=>setFileInputHandler);
parcelHelpers.export(exports, "displayFileChip", ()=>displayFileChip);
var _setElementActiveState = require("./util/setElementActiveState");
var _removeFile = require("./util/removeFile");
var _truncate = require("./util/truncate");
function setFileDropEventHandler(element, fileDropHandler) {
    element.addEventListener("dragenter", (e)=>{
        e.preventDefault();
        (0, _setElementActiveState.setElementActiveState)(e.currentTarget);
    });
    element.addEventListener("dragover", (e)=>{
        e.preventDefault();
        (0, _setElementActiveState.setElementActiveState)(e.currentTarget);
    });
    element.addEventListener("dragleave", (e)=>{
        e.preventDefault();
        (0, _setElementActiveState.setElementActiveState)(e.currentTarget, false);
    });
    element.addEventListener("drop", fileDropHandler);
}
function setFileInputHandler(element, handler) {
    element.addEventListener("change", handler);
}
function displayFileChip(file, displayElement, fileType) {
    const div = document.createElement("div");
    div.classList.add("chip");
    div.innerHTML = `
        <div style="display: flex; align-items: center;">
            <i class="fa-solid fa-file"></i>
            <p style="padding-left: 4px">${(0, _truncate.truncate)(file.name, 15)}</p>
        </div>
        <span class="closebtn ${fileType}">&times;</span>
    `;
    displayElement.appendChild(div);
    const spanElement = document.querySelector(`.closebtn.${fileType}`);
    spanElement.addEventListener("click", function() {
        this.parentElement.parentElement.previousElementSibling.style.display = "flex";
        const elementToRemove = this.parentElement;
        elementToRemove.parentElement.removeChild(elementToRemove);
        (0, _removeFile.removeFile)(fileType);
    });
}

},{"./util/setElementActiveState":"gtRTI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./util/truncate":"3B9sk","./util/removeFile":"1Pvxw"}],"gtRTI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setElementActiveState", ()=>setElementActiveState);
function setElementActiveState(element, active = true) {
    const hasActiveClass = element.classList.contains("active");
    if (active && !hasActiveClass) return element.classList.add("active");
    if (!active && hasActiveClass) return element.classList.remove("active");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3B9sk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "truncate", ()=>truncate);
function truncate(str, n) {
    const strArr = str.split(".");
    return str.length > n ? str.slice(0, n - 1) + "&hellip;" + strArr[strArr.length - 1] : str;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Pvxw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "removeFile", ()=>removeFile);
var _audio = require("../audio");
var _backgroundImage = require("../backgroundImage");
var _domLoader = require("../domLoader");
var _lyrics = require("../lyrics");
function removeFile(fileType) {
    switch(fileType){
        case "audio":
            (0, _audio.resetAudio)();
            (0, _domLoader.audioPlayButton).disabled = true;
            (0, _domLoader.exportButton).disabled = true;
            (0, _domLoader.resetButton).disabled = true;
            break;
        case "image":
            (0, _backgroundImage.resetBackgroundImage)();
            break;
        case "lyrics":
            (0, _lyrics.resetLyrics)();
            break;
        default:
            break;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../domLoader":"hbKVM","../audio":"daaY0","../backgroundImage":"8P78Q","../lyrics":"hG7RE"}],"hbKVM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "lyricsFileDropzone", ()=>lyricsFileDropzone);
parcelHelpers.export(exports, "imageFileDropzone", ()=>imageFileDropzone);
parcelHelpers.export(exports, "canvasContainer", ()=>canvasContainer);
parcelHelpers.export(exports, "audioFileDropzone", ()=>audioFileDropzone);
parcelHelpers.export(exports, "audio", ()=>audio);
parcelHelpers.export(exports, "audioFileInput", ()=>audioFileInput);
parcelHelpers.export(exports, "lyricsFileInput", ()=>lyricsFileInput);
parcelHelpers.export(exports, "imageFileInput", ()=>imageFileInput);
parcelHelpers.export(exports, "titleInput", ()=>titleInput);
parcelHelpers.export(exports, "audioPlayButton", ()=>audioPlayButton);
parcelHelpers.export(exports, "exportButton", ()=>exportButton);
parcelHelpers.export(exports, "resetButton", ()=>resetButton);
parcelHelpers.export(exports, "previewSession", ()=>previewSession);
parcelHelpers.export(exports, "backdrops", ()=>backdrops);
parcelHelpers.export(exports, "wavePathButtons", ()=>wavePathButtons);
parcelHelpers.export(exports, "wordLengthSpan", ()=>wordLengthSpan);
parcelHelpers.export(exports, "settingPanelBackdrop", ()=>settingPanelBackdrop);
parcelHelpers.export(exports, "timerButtons", ()=>timerButtons);
parcelHelpers.export(exports, "baseCanvas", ()=>baseCanvas);
parcelHelpers.export(exports, "timerCanvas", ()=>timerCanvas);
parcelHelpers.export(exports, "audioCanvas", ()=>audioCanvas);
const lyricsFileDropzone = document.querySelector(".file-dropzone.lyricsfile");
const imageFileDropzone = document.querySelector(".file-dropzone.imagefile");
const canvasContainer = document.querySelector(".canvas-container");
const audioFileDropzone = document.querySelector(".file-dropzone.audiofile");
const audio = document.querySelector("#audio");
const audioFileInput = document.querySelector("#audio-file");
const lyricsFileInput = document.querySelector("#lyrics-file");
const imageFileInput = document.querySelector("#image-file");
const titleInput = document.querySelector(".title-input");
const audioPlayButton = document.querySelector("#audioplay-button");
const exportButton = document.querySelector("#export-button");
const resetButton = document.querySelector("#reset-button");
const previewSession = document.querySelector(".preview-container");
const backdrops = document.querySelectorAll(".backdrop");
const wavePathButtons = document.querySelectorAll('input[name="wavepath"]');
const wordLengthSpan = document.getElementById("wordlength-span");
const settingPanelBackdrop = document.getElementById("settingPanelBackdrop");
const timerButtons = document.querySelectorAll("input[name=timer]");
const baseCanvas = document.getElementById("base-canvas");
const timerCanvas = document.getElementById("timer-canvas");
const audioCanvas = document.getElementById("audio-visualizer-canvas");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8P78Q":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initBackgroundImage", ()=>initBackgroundImage);
parcelHelpers.export(exports, "getBackgroundImage", ()=>getBackgroundImage);
parcelHelpers.export(exports, "resetBackgroundImage", ()=>resetBackgroundImage);
var _fileUpload = require("./fileUpload");
var _domLoader = require("./domLoader");
var _isMultipleFiles = require("./util/isMultipleFiles");
var _isCorrectFileType = require("./util/isCorrectFileType");
var _setElementActiveState = require("./util/setElementActiveState");
let image = new Image();
function initBackgroundImage() {
    (0, _fileUpload.setFileDropEventHandler)((0, _domLoader.imageFileDropzone), handleFileDrop);
    (0, _fileUpload.setFileInputHandler)((0, _domLoader.imageFileInput), handleFileInput);
}
function getBackgroundImage() {
    return image;
}
function resetBackgroundImage() {
    if (image.src) URL.revokeObjectURL(image.src);
    image.src = "";
}
function handleFileDrop(e) {
    e.preventDefault();
    (0, _setElementActiveState.setElementActiveState)(e.currentTarget, false);
    const { files  } = e.dataTransfer;
    if ((0, _isMultipleFiles.isMultipleFiles)(files)) return alert("Only one image file to be uploaded.");
    if (!(0, _isCorrectFileType.isCorrectFileType)(files, [
        "image/jpeg",
        "image/png"
    ])) return alert("File type uploaded is not correct.");
    image.src = URL.createObjectURL(files[0]);
    (0, _domLoader.imageFileDropzone).style.display = "none";
    (0, _fileUpload.displayFileChip)(files[0], (0, _domLoader.imageFileDropzone).nextElementSibling, "image");
}
function handleFileInput(e) {
    const { files  } = e.target;
    if ((0, _isMultipleFiles.isMultipleFiles)(files)) return alert("Only one image file to be uploaded.");
    if (!(0, _isCorrectFileType.isCorrectFileType)(files, [
        "image/jpeg",
        "image/png"
    ])) return alert("File type uploaded is not correct.");
    image.src = URL.createObjectURL(files[0]);
    (0, _domLoader.imageFileInput).parentElement.style.display = "none";
    (0, _fileUpload.displayFileChip)(files[0], (0, _domLoader.imageFileInput).parentElement.nextElementSibling, "image");
    (0, _domLoader.imageFileInput).value = "";
}

},{"./fileUpload":"6St3o","./domLoader":"hbKVM","./util/isMultipleFiles":"hUaZm","./util/isCorrectFileType":"7sF3r","./util/setElementActiveState":"gtRTI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hUaZm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isMultipleFiles", ()=>isMultipleFiles);
function isMultipleFiles(files) {
    if (files.length > 1) return true;
    return false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7sF3r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isCorrectFileType", ()=>isCorrectFileType);
function isCorrectFileType(files, filetypes) {
    return [
        ...files
    ].every((file)=>{
        for (const filetype of filetypes){
            if (file.type === filetype) return true;
        }
        return false;
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hG7RE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initLyrics", ()=>initLyrics);
parcelHelpers.export(exports, "getLyricsObjs", ()=>getLyricsObjs);
parcelHelpers.export(exports, "resetLyrics", ()=>resetLyrics);
var _fileUpload = require("./fileUpload");
var _domLoader = require("./domLoader");
var _isMultipleFiles = require("./util/isMultipleFiles");
var _setElementActiveState = require("./util/setElementActiveState");
var _srtParser = require("./util/srtParser");
let lyricsObjs = [];
function initLyrics() {
    (0, _fileUpload.setFileDropEventHandler)((0, _domLoader.lyricsFileDropzone), handleFileDrop);
    (0, _fileUpload.setFileInputHandler)((0, _domLoader.lyricsFileInput), handleFileInput);
}
function getLyricsObjs() {
    return lyricsObjs;
}
function resetLyrics() {
    lyricsObjs = [];
}
async function handleFileDrop(e) {
    e.preventDefault();
    (0, _setElementActiveState.setElementActiveState)(e.currentTarget, false);
    const { files  } = e.dataTransfer;
    if ((0, _isMultipleFiles.isMultipleFiles)(files)) return alert("Only one audio file to be uploaded.");
    await files[0].text().then((result)=>{
        lyricsObjs = (0, _srtParser.srtParser)(result);
    }).catch((error)=>{
        console.log(error);
    });
    if (lyricsObjs.length == 0) return alert("Unable to read the file.");
    (0, _domLoader.lyricsFileDropzone).style.display = "none";
    (0, _fileUpload.displayFileChip)(files[0], (0, _domLoader.lyricsFileDropzone).nextElementSibling, "lyrics");
}
async function handleFileInput(e) {
    const { files  } = e.target;
    if ((0, _isMultipleFiles.isMultipleFiles)(files)) return alert("Only one file to be uploaded.");
    await files[0].text().then((result)=>{
        lyricsObjs = (0, _srtParser.srtParser)(result);
    }).catch((error)=>{
        console.log(error);
    });
    if (lyricsObjs.length == 0) return alert("Unable to read the file.");
    (0, _domLoader.lyricsFileInput).parentElement.style.display = "none";
    (0, _fileUpload.displayFileChip)(files[0], (0, _domLoader.lyricsFileInput).parentElement.nextElementSibling, "lyrics");
    (0, _domLoader.lyricsFileInput).value = "";
}

},{"./fileUpload":"6St3o","./domLoader":"hbKVM","./util/isMultipleFiles":"hUaZm","./util/setElementActiveState":"gtRTI","./util/srtParser":"bZHTW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bZHTW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "srtParser", ()=>srtParser);
function convertIntoLineObj(group) {
    return {
        line: group[1],
        startTime: group[2],
        endTime: group[3],
        text: group[4]
    };
}
function srtParser(strContent) {
    const pattern = /(\d+)\n([\d:,]+)\s+-{2}\>\s+([\d:,]+)\n([\s\S]*?(?=\n\d+$|EndOfString))/gm;
    let result = [];
    if (typeof strContent != "string") throw new Error("Sorry, Parser accept string only.");
    if (strContent == null) return result;
    strContent = strContent.replace(/\r\n|\r|\n/g, "\n");
    strContent = strContent.concat("EndOfString");
    while((matches = pattern.exec(strContent)) != null)result.push(convertIntoLineObj(matches));
    return result;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"13tVG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "animateTimerForHorizontalWave", ()=>animateTimerForHorizontalWave);
parcelHelpers.export(exports, "animateTimerForCircularWave", ()=>animateTimerForCircularWave);
parcelHelpers.export(exports, "initCanvas", ()=>initCanvas);
var _audio = require("./audio");
var _backgroundImage = require("./backgroundImage");
var _domLoader = require("./domLoader");
var _draw = require("./draw");
var _font = require("./font");
var _lyrics = require("./lyrics");
var _setting = require("./setting");
var _formatTime = require("./util/formatTime");
(0, _domLoader.audioCanvas).height = window.innerHeight;
(0, _domLoader.audioCanvas).width = window.innerWidth;
const audioCanvasCtx = (0, _domLoader.audioCanvas).getContext("2d");
(0, _domLoader.baseCanvas).height = window.innerHeight;
(0, _domLoader.baseCanvas).width = window.innerWidth;
const baseCanvasCtx = (0, _domLoader.baseCanvas).getContext("2d");
(0, _domLoader.timerCanvas).height = window.innerHeight;
(0, _domLoader.timerCanvas).width = window.innerWidth;
const timerCanvasCtx = (0, _domLoader.timerCanvas).getContext("2d");
const drawTimerArgs = (mode)=>{
    const { primary  } = (0, _font.getFontSize)();
    const lyrics = (0, _lyrics.getLyricsObjs)();
    const { title  } = (0, _setting.getSetting)();
    posXForCircularMode = title || lyrics ? (0, _domLoader.timerCanvas).width * 0.69 : (0, _domLoader.timerCanvas).width * 0.44;
    return {
        canvasCtx: timerCanvasCtx,
        text: (0, _formatTime.formatTime)((0, _domLoader.audio).currentTime),
        fontSize: primary,
        pos: {
            x: mode === "horizontal" ? (0, _domLoader.timerCanvas).width * 0.75 : posXForCircularMode,
            y: mode === "horizontal" ? (0, _domLoader.timerCanvas).height * 0.75 : (0, _domLoader.timerCanvas).height * 0.53
        }
    };
};
const drawLyricsArgs = (mode)=>{
    const { secondary  } = (0, _font.getFontSize)();
    return {
        canvasCtx: timerCanvasCtx,
        lyrics: (0, _lyrics.getLyricsObjs)(),
        fontSize: secondary,
        pos: {
            x: mode === "horizontal" ? (0, _domLoader.timerCanvas).width * 0.25 / 2 : (0, _domLoader.timerCanvas).width * 0.01,
            y: mode === "horizontal" ? (0, _domLoader.timerCanvas).height * 0.5 : (0, _domLoader.timerCanvas).height * 0.5
        },
        audio: (0, _domLoader.audio)
    };
};
const heightOffset = 50;
function animateTimerForHorizontalWave() {
    timerCanvasCtx.clearRect(0, 0, (0, _domLoader.timerCanvas).width, (0, _domLoader.timerCanvas).height);
    if (!(0, _audio.getAudioPlayState)()) return;
    const { timer  } = (0, _setting.getSetting)();
    if (timer === "enable") {
        const drawWaveBaseArgs = {
            canvasCtx: timerCanvasCtx,
            style: {
                lineWidth: 10,
                strokeStyle: "#000000"
            },
            startPos: {
                x: (0, _domLoader.timerCanvas).width * 0.25 / 2,
                y: (0, _domLoader.timerCanvas).height - heightOffset - 15
            },
            endPos: {
                x: (0, _domLoader.timerCanvas).width * (0.125 + 0.75 * (0, _domLoader.audio).currentTime / (0, _domLoader.audio).duration),
                y: (0, _domLoader.timerCanvas).height - heightOffset - 15
            }
        };
        (0, _draw.drawHorizontalWaveBase)(...Object.values(drawWaveBaseArgs));
        (0, _draw.drawText)(...Object.values(drawTimerArgs("horizontal")));
    }
    (0, _draw.drawLyricsLine)(...Object.values(drawLyricsArgs("horizontal")));
    requestAnimationFrame(animateTimerForHorizontalWave);
}
function animateTimerForCircularWave() {
    timerCanvasCtx.clearRect(0, 0, (0, _domLoader.timerCanvas).width, (0, _domLoader.timerCanvas).height);
    if (!(0, _audio.getAudioPlayState)()) return;
    const lyrics = (0, _lyrics.getLyricsObjs)();
    const { title , timer  } = (0, _setting.getSetting)();
    if (timer === "enable") {
        const drawWaveBaseArgs = {
            canvasCtx: timerCanvasCtx,
            style: {
                lineWidth: 10,
                strokeStyle: "#000000"
            },
            centrePos: {
                x: title || lyrics ? (0, _domLoader.timerCanvas).width / 4 * 3 : (0, _domLoader.timerCanvas).width / 2,
                y: (0, _domLoader.timerCanvas).height / 2
            },
            radius: (0, _domLoader.timerCanvas).width / 8,
            endAngle: 2 * Math.PI * (0, _domLoader.audio).currentTime / (0, _domLoader.audio).duration
        };
        (0, _draw.drawCircularWaveBase)(...Object.values(drawWaveBaseArgs));
        (0, _draw.drawText)(...Object.values(drawTimerArgs("circular")));
    }
    (0, _draw.drawLyricsLine)(...Object.values(drawLyricsArgs("circular")));
    requestAnimationFrame(animateTimerForCircularWave);
}
function drawBaseForHorizontalWave() {
    baseCanvasCtx.clearRect(0, 0, (0, _domLoader.baseCanvas).width, (0, _domLoader.baseCanvas).height);
    (0, _draw.drawBackground)(baseCanvasCtx, (0, _backgroundImage.getBackgroundImage)(), (0, _domLoader.baseCanvas));
    const { primary  } = (0, _font.getFontSize)();
    const { title  } = (0, _setting.getSetting)();
    const drawWaveBaseArgs = {
        canvasCtx: baseCanvasCtx,
        style: {
            lineWidth: 20,
            strokeStyle: "#40e0d0"
        },
        startPos: {
            x: (0, _domLoader.baseCanvas).width * 0.25 / 2,
            y: (0, _domLoader.baseCanvas).height - heightOffset - 20
        },
        endPos: {
            x: (0, _domLoader.baseCanvas).width * 0.875,
            y: (0, _domLoader.baseCanvas).height - heightOffset - 20
        }
    };
    (0, _draw.drawHorizontalWaveBase)(...Object.values(drawWaveBaseArgs));
    (0, _draw.drawText)(baseCanvasCtx, title, primary, {
        x: (0, _domLoader.baseCanvas).width * 0.25 / 2,
        y: (0, _domLoader.baseCanvas).height * 0.3
    });
}
function drawBaseForCircularWave() {
    baseCanvasCtx.clearRect(0, 0, (0, _domLoader.baseCanvas).width, (0, _domLoader.baseCanvas).height);
    (0, _draw.drawBackground)(baseCanvasCtx, (0, _backgroundImage.getBackgroundImage)(), (0, _domLoader.baseCanvas));
    const { primary  } = (0, _font.getFontSize)();
    const lyrics = (0, _lyrics.getLyricsObjs)();
    const { title  } = (0, _setting.getSetting)();
    const drawWaveBaseArgs = {
        canvasCtx: baseCanvasCtx,
        style: {
            lineWidth: 20,
            strokeStyle: "#40e0d0"
        },
        centrePos: {
            x: title || lyrics ? (0, _domLoader.timerCanvas).width / 4 * 3 : (0, _domLoader.timerCanvas).width / 2,
            y: (0, _domLoader.baseCanvas).height / 2
        },
        radius: (0, _domLoader.baseCanvas).width / 8,
        endAngle: 2 * Math.PI
    };
    (0, _draw.drawCircularWaveBase)(...Object.values(drawWaveBaseArgs));
    (0, _draw.drawText)(baseCanvasCtx, title, primary, {
        x: (0, _domLoader.baseCanvas).width * 0.01,
        y: (0, _domLoader.baseCanvas).height * 0.3
    });
}
function initCanvas() {
    (0, _domLoader.audioPlayButton).addEventListener("click", (e)=>{
        const audioCtx = (0, _audio.getAudioCtx)();
        if ((0, _audio.getAudioPlayState)()) {
            if (audioCtx) audioCtx.suspend();
            (0, _domLoader.audio).pause();
            return;
        }
        if (audioCtx) audioCtx.resume();
        (0, _domLoader.audio).play();
        (0, _audio.setAudioPlayState)(true);
        (0, _domLoader.previewSession).scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
        const audioAnalyser = (0, _audio.initAudioAnalyser)();
        const bufferLength = audioAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const widthOffset = (0, _domLoader.audioCanvas).width * 0.25 / 2;
        const heightOffset = 50;
        const baseHeight = 12;
        const dataArrayOffset = 10;
        const barWidth = (0, _domLoader.audioCanvas).width / (bufferLength + 10) * 0.75;
        let barHeight;
        let x;
        const { wavePath , timer  } = (0, _setting.getSetting)();
        function horizontalWaveAnimate() {
            x = 0;
            audioCanvasCtx.clearRect(0, 0, (0, _domLoader.audioCanvas).width, (0, _domLoader.audioCanvas).height);
            if (!(0, _audio.getAudioPlayState)()) return;
            audioAnalyser.getByteFrequencyData(dataArray);
            for(let i = 0; i < bufferLength + dataArrayOffset; i++){
                i < dataArrayOffset ? barHeight = 0 : barHeight = dataArray[i - dataArrayOffset];
                audioCanvasCtx.fillStyle = "#40e0d0";
                audioCanvasCtx.fillRect(x + widthOffset, (0, _domLoader.audioCanvas).height - barHeight - baseHeight - heightOffset, barWidth, barHeight);
                x += barWidth;
            }
            requestAnimationFrame(horizontalWaveAnimate);
        }
        function circularWaveAnimate() {
            x = 0;
            audioCanvasCtx.clearRect(0, 0, (0, _domLoader.audioCanvas).width, (0, _domLoader.audioCanvas).height);
            if (!(0, _audio.getAudioPlayState)()) return;
            audioAnalyser.getByteFrequencyData(dataArray);
            for(let i = 0; i < bufferLength + dataArrayOffset; i++){
                i < dataArrayOffset ? barHeight = 0 : barHeight = dataArray[i - dataArrayOffset] * 0.75;
                audioCanvasCtx.save();
                let centerX = (0, _setting.getSetting)().title || (0, _lyrics.getLyricsObjs)() ? (0, _domLoader.baseCanvas).width / 4 * 3 : (0, _domLoader.baseCanvas).width / 2;
                audioCanvasCtx.translate(centerX, (0, _domLoader.audioCanvas).height / 2);
                audioCanvasCtx.rotate(i * Math.PI * 2 / (bufferLength + dataArrayOffset));
                audioCanvasCtx.fillStyle = "#40e0d0";
                audioCanvasCtx.fillRect(0, (0, _domLoader.audioCanvas).width / 8, barWidth, barHeight);
                x += barWidth;
                audioCanvasCtx.restore();
            }
            requestAnimationFrame(circularWaveAnimate);
        }
        if (wavePath === "horizontal") {
            drawBaseForHorizontalWave();
            horizontalWaveAnimate();
            animateTimerForHorizontalWave();
        }
        if (wavePath === "circular") {
            drawBaseForCircularWave();
            circularWaveAnimate();
            animateTimerForCircularWave();
        }
    });
}

},{"./audio":"daaY0","./backgroundImage":"8P78Q","./domLoader":"hbKVM","./draw":"j4Xsn","./font":"7LH5h","./lyrics":"hG7RE","./setting":"beIpt","./util/formatTime":"9opgZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j4Xsn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "drawText", ()=>drawText);
parcelHelpers.export(exports, "drawBackground", ()=>drawBackground);
parcelHelpers.export(exports, "drawHorizontalWaveBase", ()=>drawHorizontalWaveBase);
parcelHelpers.export(exports, "drawCircularWaveBase", ()=>drawCircularWaveBase);
parcelHelpers.export(exports, "drawLyricsLine", ()=>drawLyricsLine);
var _convertTimecodeIntoSeconds = require("./util/convertTimecodeIntoSeconds");
function drawText(canvasCtx, text, fontSize, pos) {
    canvasCtx.font = `${fontSize}rem Inter`;
    canvasCtx.fillStyle = "#40e0d0";
    canvasCtx.fillText(text, pos.x, pos.y);
}
function drawBackground(canvasCtx, image, canvas) {
    if (image.src) canvasCtx.drawImage(image, 0, 0, canvas.width, canvas.height);
}
function drawHorizontalWaveBase(canvasCtx, style, startPos, endPos) {
    canvasCtx.beginPath();
    canvasCtx.lineWidth = style.lineWidth;
    canvasCtx.strokeStyle = style.strokeStyle;
    canvasCtx.moveTo(startPos.x, startPos.y);
    canvasCtx.lineTo(endPos.x, endPos.y);
    canvasCtx.stroke();
}
function drawCircularWaveBase(canvasCtx, style, centrePos, radius, endAngle) {
    canvasCtx.beginPath();
    canvasCtx.lineWidth = style.lineWidth;
    canvasCtx.strokeStyle = style.strokeStyle;
    canvasCtx.arc(centrePos.x, centrePos.y, radius, 0, endAngle);
    canvasCtx.stroke();
}
function drawLyricsLine(canvasCtx, lyrics, fontSize, pos, audio) {
    canvasCtx.fillStyle = "#40e0d0";
    canvasCtx.font = `${fontSize}rem Inter`;
    if (lyrics) lyrics.forEach((line)=>{
        const startInSeconds = (0, _convertTimecodeIntoSeconds.convertTimecodeIntoSeconds)(line.startTime);
        const endInSeconds = (0, _convertTimecodeIntoSeconds.convertTimecodeIntoSeconds)(line.endTime);
        if (audio.currentTime > startInSeconds && audio.currentTime < endInSeconds) canvasCtx.fillText(line.text, pos.x, pos.y);
    });
}

},{"./util/convertTimecodeIntoSeconds":"hm7m5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hm7m5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "convertTimecodeIntoSeconds", ()=>convertTimecodeIntoSeconds);
function convertTimecodeIntoSeconds(timecode) {
    const split = timecode.split(":");
    let seconds = 0;
    seconds += parseInt(split[0]) * 3600;
    seconds += parseInt(split[1]) * 60;
    seconds += parseInt(split[2]);
    return seconds;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7LH5h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initResponsiveFont", ()=>initResponsiveFont);
parcelHelpers.export(exports, "getFontSize", ()=>getFontSize);
let fontSize = {
    primary: 1,
    secondary: 2
};
function assignFontSize(mediaQuery) {
    if (mediaQuery.matches) {
        fontSize.primary = 4;
        fontSize.secondary = 2;
    } else {
        fontSize.primary = 2;
        fontSize.secondary = 1;
    }
}
const mediaQuery = window.matchMedia("(min-width: 965px)");
function initResponsiveFont() {
    assignFontSize(mediaQuery);
    mediaQuery.addEventListener("change", assignFontSize);
}
function getFontSize() {
    return fontSize;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"beIpt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initSetting", ()=>initSetting);
parcelHelpers.export(exports, "getSetting", ()=>getSetting);
var _domLoader = require("./domLoader");
let wavePathOption = "horizontal";
let timerOption = "enable";
function initSetting() {
    for (const wavePathButton of (0, _domLoader.wavePathButtons))wavePathButton.addEventListener("change", function(event) {
        if (this.checked) wavePathOption = this.value;
        return;
    });
    for (const timerButton of (0, _domLoader.timerButtons))timerButton.addEventListener("change", function(event) {
        if (this.checked) timerOption = this.value;
        return;
    });
    (0, _domLoader.titleInput).addEventListener("input", function(event) {
        (0, _domLoader.wordLengthSpan).textContent = `${event.currentTarget.value.length} / 50`;
        return;
    });
}
function getSetting() {
    return {
        wavePath: wavePathOption,
        timer: timerOption,
        title: (0, _domLoader.titleInput).value
    };
}

},{"./domLoader":"hbKVM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9opgZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "formatTime", ()=>formatTime);
function formatTime(seconds) {
    minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lGrd7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initExport", ()=>initExport);
var _domLoader = require("./domLoader");
var _audio = require("./audio");
var _record = require("./util/record");
function initExport() {
    (0, _domLoader.exportButton).addEventListener("click", async (e)=>{
        if (!("CropTarget" in self && "fromElement" in CropTarget)) return alert("Export is not supported by current browser used. Please use chrome 104 or above.");
        const cropTarget = await CropTarget.fromElement((0, _domLoader.canvasContainer));
        if ((0, _audio.getAudioPlayState)()) (0, _domLoader.audioPlayButton).click();
        const stream = await navigator.mediaDevices.getDisplayMedia({
            preferCurrentTab: true,
            audio: true,
            video: true
        });
        (0, _domLoader.backdrops).forEach((backdrop)=>backdrop.style.display = "block");
        const [videoTrack] = stream.getVideoTracks();
        await videoTrack.cropTo(cropTarget);
        (0, _domLoader.audio).currentTime = 0;
        (0, _domLoader.audioPlayButton).click();
        const mediaStreamAudioDestinationNode = new MediaStreamAudioDestinationNode(audioCtx);
        stream.addTrack(mediaStreamAudioDestinationNode.stream.getAudioTracks()[0]);
        const recording = (0, _record.record)(stream, 10000);
        let link$ = document.createElement("a");
        link$.setAttribute("download", "music_visual");
        recording.then((url)=>{
            link$.setAttribute("href", url);
            link$.click();
            (0, _domLoader.backdrops).forEach((backdrop)=>backdrop.style.display = "none");
        });
    });
}

},{"./domLoader":"hbKVM","./audio":"daaY0","./util/record":"l8jKe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l8jKe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "record", ()=>record);
function record(stream, time) {
    let recordedChunks = [];
    return new Promise(function(res, rej) {
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: "video/webm; codecs=vp9"
        });
        mediaRecorder.start(time || 4000);
        mediaRecorder.ondataavailable = function(event) {
            recordedChunks.push(event.data);
            if (!isRunning) mediaRecorder.stop();
        };
        mediaRecorder.onstop = function(event) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            res(url);
        };
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"50Kuz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initReset", ()=>initReset);
var _domLoader = require("./domLoader");
var _removeFile = require("./util/removeFile");
function initReset() {
    (0, _domLoader.resetButton).addEventListener("click", function(e) {
        const chipElements = document.querySelectorAll(".chip");
        const fileDropElements = document.querySelectorAll(".file-dropzone");
        [
            "audio",
            "image",
            "lyrics"
        ].forEach((item)=>(0, _removeFile.removeFile)(item));
        chipElements.forEach((item)=>item.parentElement.removeChild(item));
        fileDropElements.forEach((item)=>item.style.display = "flex");
        (0, _domLoader.titleInput).value = "";
        (0, _domLoader.wordLengthSpan).textContent = "0 / 50";
    });
}

},{"./domLoader":"hbKVM","./util/removeFile":"1Pvxw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["gzp3I","1Z4Rq"], "1Z4Rq", "parcelRequire6558")

//# sourceMappingURL=index.5d9dacde.js.map
