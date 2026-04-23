var h;
h || (h = typeof Module !== 'undefined' ? Module : {});
h.pk || (h.pk = 0);
h.pk++;
h.ENVIRONMENT_IS_PTHREAD || function (a) {
    function b(n, q, p, t) {
        if ("object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node) require("fs").readFile(n, function (r, C) {
            r ? t(r) : p(C.buffer)
        });
        else {
            var v = new XMLHttpRequest;
            v.open("GET", n, !0);
            v.responseType = "arraybuffer";
            v.onprogress = function (r) {
                var C = q;
                r.total && (C = r.total);
                if (r.loaded) {
                    v.Ni ? h.Jj[n].loaded = r.loaded : (v.Ni = !0, h.Jj || (h.Jj = {}), h.Jj[n] = {
                        loaded: r.loaded,
                        total: C
                    });
                    var y = C = r = 0,
                        F;
                    for (F in h.Jj) {
                        var J = h.Jj[F];
                        r += J.total;
                        C += J.loaded;
                        y++
                    }
                    r = Math.ceil(r * h.pk / y);
                    h.setStatus && h.setStatus("Downloading data... (" + C + "/" + r + ")")
                } else !h.Jj && h.setStatus && h.setStatus("Downloading data...")
            };
            v.onerror = function () {
                throw Error("NetworkError for: " + n);
            };
            v.onload = function () {
                if (200 == v.status || 304 == v.status || 206 == v.status || 0 == v.status && v.response) p(v.response);
                else throw Error(v.statusText + " : " + v.responseURL);
            };
            v.send(null)
        }
    }

    function c(n) {
        console.error("package error:", n)
    }

    function d() {
        function n(v, r, C) {
            this.start = v;
            this.end =
                r;
            this.audio = C
        }

        function q(v) {
            if (!v) throw "Loading data file failed." + Error().stack;
            if (!(v instanceof ArrayBuffer)) throw "bad input to processPackageData" + Error().stack;
            v = new Uint8Array(v);
            n.prototype.Yi = v;
            v = a.files;
            for (var r = 0; r < v.length; ++r) n.prototype.Ni[v[r].filename].onload();
            h.removeRunDependency("datafile_runner.data")
        }
        h.FS_createPath("/", "assets", !0, !0);
        n.prototype = {
            Ni: {},
            open: function (v, r) {
                this.name = r;
                this.Ni[r] = this;
                h.addRunDependency("fp " + this.name)
            },
            send: function () {},
            onload: function () {
                this.Ti(this.Yi.subarray(this.start,
                    this.end))
            },
            Ti: function (v) {
                h.FS_createDataFile(this.name, null, v, !0, !0, !0);
                h.removeRunDependency("fp " + this.name);
                this.Ni[this.name] = null
            }
        };
        for (var p = a.files, t = 0; t < p.length; ++t)(new n(p[t].start, p[t].end, p[t].audio || 0)).open("GET", p[t].filename);
        h.addRunDependency("datafile_runner.data");
        h.fl || (h.fl = {});
        h.fl["runner.data"] = {
            hm: !1
        };
        l ? (q(l), l = null) : g = q
    }
    "object" === typeof window ? window.encodeURIComponent(window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) +
        "/") : "undefined" === typeof process && "undefined" !== typeof location && encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/");
    "function" !== typeof h.locateFilePackage || h.locateFile || (h.locateFile = h.locateFilePackage, k("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)"));
    var e = h.locateFile ? h.locateFile("runner.data", "") : "runner.data",
        f = a.remote_package_size,
        g = null,
        l = h.getPreloadedPackage ?
        h.getPreloadedPackage(e, f) : null;
    l || b(e, f, function (n) {
        g ? (g(n), g = null) : l = n
    }, c);
    h.calledRun ? d() : (h.preRun || (h.preRun = []), h.preRun.push(d))
}({
    "files": [{
        "filename": "/assets/options.ini",
        "start": 0,
        "end": 138,
        "audio": 0
    }, {
        "filename": "/assets/Undertale_Yellow_SoJ.yydebug",
        "start": 138,
        "end": 15643056,
        "audio": 0
    }],
    "remote_package_size": 15643056,
    "package_uuid": "4d991f19-f64f-41c7-a338-611df9dac8cd"
});
this.doGMLCallback = function (a, b) {
    b = JSON.stringify(b);
    var c = aa(b) + 1,
        d = m(c);
    u(b, d, c);
    console.log("AddAsyncMethod=" + g_pAddAsyncMethod + ", methodToCall=" + a + ", stringOnWasmHeap=" + d + ", argsAsJSON=" + b);
    h.dynCall("vii", g_pAddAsyncMethod, [a, d])
};
this.triggerAdPrefix = function (a, b, c, d, e) {
    var f = m(80),
        g = f + 16,
        l = f + 32,
        n = f + 48,
        q = f + 64;
    ba(f + 0, a, 16);
    ba(g, b, 16);
    ba(l, c, 16);
    ba(n, d, 16);
    ba(q, e, 16);
    return f
};
this.triggerAdPostfix = function (a) {
    ca(a)
};
this.triggerPaymentPrefix = function (a) {
    var b = m(16);
    ba(b, a, 16);
    return b
};
this.triggerPaymentPostfix = function (a) {
    ca(a)
};
var w = null,
    da = [],
    ea = null,
    ha = null,
    ia = null,
    ja = null,
    ka = null;

function la() {
    w && ("visible" === document.visibilityState ? w.resume() : w.suspend())
}
var ma = void 0;
this.OGX_startDRMCheck = function () {
    ma && h.dynCall("v", ma)
};
var na = void 0,
    oa = void 0,
    pa = void 0,
    qa = void 0;
this.GM_pause = function () {
    na && h.dynCall("v", na)
};
this.GM_unpause = function () {
    oa && h.dynCall("v", oa)
};
this.GM_tick = function () {
    pa && h.dynCall("vd", pa, [performance.now()])
};
this.GM_is_multiplayer = function () {
    return qa ? h.dynCall("i", qa) : 0
};
var ra = void 0,
    sa = void 0;
this.GM_get_view_status = function () {
    var a = void 0;
    if (ra) {
        var b = h.dynCall("i", ra);
        a = x(b);
        a = JSON.parse(a);
        ca(b)
    }
    return a
};
this.GM_set_view_status = function (a) {
    if (sa) {
        a = JSON.stringify(a);
        var b = aa(a) + 1,
            c = m(b);
        u(a, c, b);
        console.log("GM_set_view_status=" + sa + ", stringOnWasmHeap=" + c + ", argsAsJSON=" + a);
        h.dynCall("vi", sa, [c])
    }
};
var ta = [],
    ua = !1,
    va = !1;
this.activate_clipboard = function () {
    !ua && navigator.clipboard && navigator.permissions && !va && (va = !0, navigator.permissions.query({
        name: "clipboard-read",
        bm: !0
    }).then(function (a) {
        if ("granted" == a.state || "prompt" == a.state) {
            ua = !0;
            va = !1;
            for (a = 0; a < ta.length; ++a) navigator.clipboard.writeText(ta[a]);
            ta = [];
            navigator.clipboard.readText().then(b => {
                "" != b && ta.push(b)
            }).catch(() => {})
        }
    }))
};
this.clipboard_has_text = function () {
    if (!ua) return activate_clipboard(), !1;
    navigator.clipboard.readText().then(a => {
        "" != a && ta.push(a)
    }).catch(() => {});
    return 0 < ta.length
};
this.clipboard_get_text = function () {
    var a = "";
    ua ? 0 < ta.length && (a = ta.pop()) : activate_clipboard();
    return a
};
this.clipboard_set_text = function (a) {
    ua ? navigator.clipboard && navigator.clipboard.writeText(a) : (activate_clipboard(), ta.push(a))
};
var wa = {},
    xa = {},
    ya = "";
this.__gx_cache_file = function (a) {
    if (window.oprt && window.oprt.gameFiles) {
        var b = window.origin + "/" + a.name,
            c = new URLSearchParams(window.location.search);
        const d = c.get("game"),
            e = c.get("track");
        c = c.get("release");
        null != d && null != e && null != c && (b = window.location.origin + "/" + d + "/" + e + "/" + c + "/" + a.name);
        console.log("__gx_cache_file for " + b);
        b = new Request(b);
        let f = a.name + ":" + a.md5;
        window.oprt.gameFiles.fetchAndCache(f, ya, b).then(g => {
            g.arrayBuffer().then(function () {
                console.log("fetchAndCache complete for file:id " +
                    f);
                xa[a.name] = {
                    name: a.name,
                    md5: a.md5,
                    fileId: f,
                    version: ya
                }
            })
        })
    }
    return Promise.resolve()
};
this.__gx_check_cache = function (a, b) {
    var c = void 0 != xa[a];
    b && console.log("__gx_check_cache for " + a + " cached files " + JSON.stringify(xa) + " manifest files " + JSON.stringify(wa));
    !c && void 0 != wa[a] && b && this.__gx_cache_file(wa[a]);
    return c
};
this.__gx_prepare_cache = function (a) {
    ya = a;
    return new Promise(function (b, c) {
        if (window.oprt && window.oprt.gameFiles) {
            let e = manifestFiles().split(";");
            var d = manifestFilesMD5();
            window.oprt.gameFiles.keys().then(f => {
                console.log("current cache entries are " + JSON.stringify(f));
                var g = {};
                let l = [];
                for (var n = 0; n < f.length; ++n) {
                    var q = f[n],
                        p = q.fileId,
                        t = "",
                        v = p.indexOf(":");
                    0 <= v && (t = p.substring(v + 1), p = p.substring(0, v));
                    v = e.indexOf(p);
                    console.log("considering file " + p + " for deleting, indexOf is " + v + " cached MD5 is " +
                        t + " manifest md5 is " + (0 > v ? " not present" : d[v]));
                    0 > v || d[v] != t ? l.push(window.oprt.gameFiles.delete(q.fileId, q.version)) : g[p] = {
                        name: p,
                        md5: t,
                        fileId: q.fileId,
                        version: q.version
                    }
                }
                console.log("current cache files are " + JSON.stringify(g));
                xa = g;
                f = {};
                for (n = 0; n < e.length; ++n) f[e[n]] = {
                    name: e[n],
                    md5: d[n]
                };
                wa = f;
                void 0 == xa["game.unx"] ? (console.log("caching game.unx"), this.__gx_cache_file(wa["game.unx"]).then(() => {
                    b({
                        cachedFiles: xa,
                        allFiles: e
                    })
                })) : b({
                    cachedFiles: xa,
                    allFiles: e
                })
            }).catch(f => {
                c(Error("error trying to enumerate cache keys - " +
                    JSON.stringify(f)))
            })
        } else c(Error("unable to cache, API not found"))
    })
};
this.__gx_async_wget2 = function (a, b, c, d, e, f, g) {
    window.oprt && window.oprt.gameFiles && (a = xa[a], a = window.oprt.gameFiles.match(a.fileId, a.version), a.catch(() => {
        h.dynCall("vi", g, [d])
    }), a.then(l => l.arrayBuffer()).then(l => {
        l = new Uint8Array(l);
        var n = m(l.length);
        A.set(l, n);
        f && h.dynCall("viiii", f, [4294967295, d, n, l.length]);
        e && e(n)
    }))
};
GXMFS = {
    sj: {},
    Vi: function (a) {
        return B.Vi.apply(null, arguments)
    },
    Ek: (a, b, c) => {
        GXMFS.qk(a, (d, e) => {
            if (d) return c(d);
            GXMFS.rk(a, (f, g) => {
                if (f) return c(f);
                GXMFS.xk(b ? g : e, b ? e : g, c)
            })
        })
    },
    Ll: () => {
        GXMFS.sj = {}
    },
    Al: (a, b) => {
        var c = GXMFS.sj[a];
        c || (c = window.oprt.gameStorage.open(a), GXMFS.sj[a] = c);
        return b(null, c)
    },
    qk: (a, b) => {
        function c(l) {
            return "." !== l && ".." !== l
        }

        function d(l) {
            return n => za(l + "/" + n)
        }
        var e = {};
        for (a = Aa(a.uj).filter(c).map(d(a.uj)); a.length;) {
            var f = a.pop();
            try {
                var g = Ba(f)
            } catch (l) {
                return b(l)
            }
            16384 === (g.mode &
                61440) && a.push.apply(a, Aa(f).filter(c).map(d(f)));
            e[f] = {
                timestamp: g.mtime
            }
        }
        return b(null, {
            type: "local",
            entries: e
        })
    },
    rk: (a, b) => {
        GXMFS.Al(a.uj, (c, d) => {
            if (c) return b(c);
            d.list().then(e => {
                b(null, {
                    type: "remote",
                    storage: d,
                    entries: e
                })
            }).catch(b)
        })
    },
    tk: (a, b) => {
        try {
            var c = D(a).node;
            var d = Ba(a)
        } catch (e) {
            return b(e)
        }
        return 16384 === (d.mode & 61440) ? b(null, {
            timestamp: d.mtime,
            mode: d.mode
        }) : 32768 === (d.mode & 61440) ? (c.Pi = B.Tk(c), b(null, {
            timestamp: d.mtime,
            mode: d.mode,
            contents: c.Pi
        })) : b(Error("node type not supported"))
    },
    Ck: (a, b, c) => {
        try {
            if (16384 === (b.mode & 61440)) Ca(a, b.mode);
            else if (32768 === (b.mode & 61440)) Da(a, b.contents);
            else return c(Error("node type not supported"));
            Ea(a, b.mode);
            Fa(a, b.timestamp, b.timestamp)
        } catch (d) {
            return c(d)
        }
        c(null)
    },
    zk: (a, b) => {
        try {
            var c = Ba(a);
            16384 === (c.mode & 61440) ? Ga(a) : 32768 === (c.mode & 61440) && Ha(a)
        } catch (d) {
            return b(d)
        }
        b(null)
    },
    uk: (a, b, c) => {
        a.get(b).then(d => {
            c(null, d)
        }).catch(c)
    },
    Dk: (a, b, c, d) => {
        a.put(c, b).then(() => {
            d(null)
        }).catch(d)
    },
    Ak: (a, b, c) => {
        a.delete(b).then(() => {
            c(null)
        }).catch(c)
    },
    xk: (a, b, c) => {
        function d(q) {
            e--;
            if (q && !l) return l = !0, console.error("Reconcile failed"), c(q);
            if (0 === e && !l) return console.info("Reconcile finished successfully"), c(null)
        }
        console.info("Starting reconcile");
        var e = 0,
            f = [];
        Object.keys(a.entries).forEach(function (q) {
            var p = a.entries[q],
                t = b.entries[q];
            t && p.timestamp.getTime() == t.timestamp.getTime() || (f.push(q), e++)
        });
        console.debug(`${f.length} entries to create/update on the ${"local"===b.type?"local filesystem":"remote filesystem"}`);
        var g = [];
        Object.keys(b.entries).forEach(function (q) {
            a.entries[q] ||
                (g.push(q), e++)
        });
        console.debug(`${g.length} entries to remove from the ${"local"===b.type?"local filesystem":"remote filesystem"}`);
        if (0 == e) return c(null);
        var l = !1,
            n = "remote" === a.type ? a.storage : b.storage;
        f.sort().forEach(q => {
            "local" === b.type ? GXMFS.uk(n, q, (p, t) => {
                if (p) return d(p);
                GXMFS.Ck(q, t, d)
            }) : GXMFS.tk(q, (p, t) => {
                if (p) return d(p);
                GXMFS.Dk(n, q, t, d)
            })
        });
        g.sort().reverse().forEach(q => {
            "local" === b.type ? GXMFS.zk(q, d) : GXMFS.Ak(n, q, d)
        })
    }
};
var Ia = Object.assign({}, h),
    Ja = [],
    Ka = "./this.program",
    La = (a, b) => {
        throw b;
    },
    Ma = "object" == typeof window,
    Na = "function" == typeof importScripts,
    Oa = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node,
    Pa = "",
    Qa, Ra, Sa, Ta, fs, Ua, Va;
if (Oa) Pa = Na ? require("path").dirname(Pa) + "/" : __dirname + "/", Va = () => {
    Ua || (fs = require("fs"), Ua = require("path"))
}, Qa = function (a, b) {
    Va();
    a = Ua.normalize(a);
    return fs.readFileSync(a, b ? void 0 : "utf8")
}, Sa = a => {
    a = Qa(a, !0);
    a.buffer || (a = new Uint8Array(a));
    return a
}, Ra = (a, b, c) => {
    Va();
    a = Ua.normalize(a);
    fs.readFile(a, function (d, e) {
        d ? c(d) : b(e.buffer)
    })
}, 1 < process.argv.length && (Ka = process.argv[1].replace(/\\/g, "/")), Ja = process.argv.slice(2), "undefined" != typeof module && (module.exports = h), process.on("uncaughtException",
    function (a) {
        if (!(a instanceof Wa)) throw a;
    }), process.on("unhandledRejection", function (a) {
    throw a;
}), La = (a, b) => {
    if (noExitRuntime) throw process.exitCode = a, b;
    b instanceof Wa || k("exiting due to exception: " + b);
    process.exit(a)
}, h.inspect = function () {
    return "[Emscripten Module object]"
};
else if (Ma || Na) Na ? Pa = self.location.href : "undefined" != typeof document && document.currentScript && (Pa = document.currentScript.src), Pa = 0 !== Pa.indexOf("blob:") ? Pa.substr(0, Pa.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", Qa = a => {
    var b =
        new XMLHttpRequest;
    b.open("GET", a, !1);
    b.send(null);
    return b.responseText
}, Na && (Sa = a => {
    var b = new XMLHttpRequest;
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response)
}), Ra = (a, b, c) => {
    var d = new XMLHttpRequest;
    d.open("GET", a, !0);
    d.responseType = "arraybuffer";
    d.onload = () => {
        200 == d.status || 0 == d.status && d.response ? b(d.response) : c()
    };
    d.onerror = c;
    d.send(null)
}, Ta = a => {
    document.title = a
};
var Xa = h.print || console.log.bind(console),
    k = h.printErr || console.warn.bind(console);
Object.assign(h, Ia);
Ia = null;
h.arguments && (Ja = h.arguments);
h.thisProgram && (Ka = h.thisProgram);
h.quit && (La = h.quit);

function Ya(a) {
    Za || (Za = {});
    Za[a] || (Za[a] = 1, k(a))
}
var Za, $a = 0,
    bb;
h.wasmBinary && (bb = h.wasmBinary);
var noExitRuntime = h.noExitRuntime || !0;
"object" != typeof WebAssembly && cb("no native wasm support detected");

function db(a, b, c = "i8") {
    "*" === c.charAt(c.length - 1) && (c = "i32");
    switch (c) {
        case "i1":
            E[a >> 0] = b;
            break;
        case "i8":
            E[a >> 0] = b;
            break;
        case "i16":
            eb[a >> 1] = b;
            break;
        case "i32":
            G[a >> 2] = b;
            break;
        case "i64":
            fb = [b >>> 0, (H = b, 1 <= +Math.abs(H) ? 0 < H ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
            G[a >> 2] = fb[0];
            G[a + 4 >> 2] = fb[1];
            break;
        case "float":
            I[a >> 2] = b;
            break;
        case "double":
            gb[a >> 3] = b;
            break;
        default:
            cb("invalid type for setValue: " + c)
    }
}

function hb(a, b = "i8") {
    "*" === b.charAt(b.length - 1) && (b = "i32");
    switch (b) {
        case "i1":
            return E[a >> 0];
        case "i8":
            return E[a >> 0];
        case "i16":
            return eb[a >> 1];
        case "i32":
            return G[a >> 2];
        case "i64":
            return G[a >> 2];
        case "float":
            return I[a >> 2];
        case "double":
            return Number(gb[a >> 3]);
        default:
            cb("invalid type for getValue: " + b)
    }
    return null
}
var ib, jb = !1;

function kb(a, b, c, d) {
    var e = {
        string: function (q) {
            var p = 0;
            if (null !== q && void 0 !== q && 0 !== q) {
                var t = (q.length << 2) + 1;
                p = lb(t);
                u(q, p, t)
            }
            return p
        },
        array: function (q) {
            var p = lb(q.length);
            E.set(q, p);
            return p
        }
    };
    a = h["_" + a];
    var f = [],
        g = 0;
    if (d)
        for (var l = 0; l < d.length; l++) {
            var n = e[c[l]];
            n ? (0 === g && (g = mb()), f[l] = n(d[l])) : f[l] = d[l]
        }
    c = a.apply(null, f);
    return c = function (q) {
        0 !== g && nb(g);
        return "string" === b ? x(q) : "boolean" === b ? !!q : q
    }(c)
}
var ob = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

function pb(a, b, c) {
    var d = b + c;
    for (c = b; a[c] && !(c >= d);) ++c;
    if (16 < c - b && a.buffer && ob) return ob.decode(a.subarray(b, c));
    for (d = ""; b < c;) {
        var e = a[b++];
        if (e & 128) {
            var f = a[b++] & 63;
            if (192 == (e & 224)) d += String.fromCharCode((e & 31) << 6 | f);
            else {
                var g = a[b++] & 63;
                e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | g : (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63;
                65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023))
            }
        } else d += String.fromCharCode(e)
    }
    return d
}

function x(a, b) {
    return a ? pb(A, a, b) : ""
}

function qb(a, b, c, d) {
    if (!(0 < d)) return 0;
    var e = c;
    d = c + d - 1;
    for (var f = 0; f < a.length; ++f) {
        var g = a.charCodeAt(f);
        if (55296 <= g && 57343 >= g) {
            var l = a.charCodeAt(++f);
            g = 65536 + ((g & 1023) << 10) | l & 1023
        }
        if (127 >= g) {
            if (c >= d) break;
            b[c++] = g
        } else {
            if (2047 >= g) {
                if (c + 1 >= d) break;
                b[c++] = 192 | g >> 6
            } else {
                if (65535 >= g) {
                    if (c + 2 >= d) break;
                    b[c++] = 224 | g >> 12
                } else {
                    if (c + 3 >= d) break;
                    b[c++] = 240 | g >> 18;
                    b[c++] = 128 | g >> 12 & 63
                }
                b[c++] = 128 | g >> 6 & 63
            }
            b[c++] = 128 | g & 63
        }
    }
    b[c] = 0;
    return c - e
}

function u(a, b, c) {
    return qb(a, A, b, c)
}

function aa(a) {
    for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && (d = 65536 + ((d & 1023) << 10) | a.charCodeAt(++c) & 1023);
        127 >= d ? ++b : b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4
    }
    return b
}

function rb(a) {
    var b = aa(a) + 1,
        c = m(b);
    c && qb(a, E, c, b);
    return c
}

function sb(a) {
    var b = aa(a) + 1,
        c = lb(b);
    qb(a, E, c, b);
    return c
}
var tb, E, A, eb, K, G, N, I, gb;

function ub() {
    var a = ib.buffer;
    tb = a;
    h.HEAP8 = E = new Int8Array(a);
    h.HEAP16 = eb = new Int16Array(a);
    h.HEAP32 = G = new Int32Array(a);
    h.HEAPU8 = A = new Uint8Array(a);
    h.HEAPU16 = K = new Uint16Array(a);
    h.HEAPU32 = N = new Uint32Array(a);
    h.HEAPF32 = I = new Float32Array(a);
    h.HEAPF64 = gb = new Float64Array(a)
}
var vb, wb = [],
    xb = [],
    zb = [],
    Ab = [],
    Bb = [];

function Cb() {
    var a = h.preRun.shift();
    wb.unshift(a)
}
var Db = 0,
    Eb = null,
    Fb = null;

function Gb() {
    Db++;
    h.monitorRunDependencies && h.monitorRunDependencies(Db)
}

function Hb() {
    Db--;
    h.monitorRunDependencies && h.monitorRunDependencies(Db);
    if (0 == Db && (null !== Eb && (clearInterval(Eb), Eb = null), Fb)) {
        var a = Fb;
        Fb = null;
        a()
    }
}

function cb(a) {
    if (h.onAbort) h.onAbort(a);
    a = "Aborted(" + a + ")";
    k(a);
    jb = !0;
    throw new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
}

function Ib() {
    return Jb.startsWith("data:application/octet-stream;base64,")
}
var Jb;
Jb = "runner.wasm";
if (!Ib()) {
    var Kb = Jb;
    Jb = h.locateFile ? h.locateFile(Kb, Pa) : Pa + Kb
}

function Lb() {
    var a = Jb;
    try {
        if (a == Jb && bb) return new Uint8Array(bb);
        if (Sa) return Sa(a);
        throw "both async and sync fetching of the wasm failed";
    } catch (b) {
        cb(b)
    }
}

function Mb() {
    if (!bb && (Ma || Na)) {
        if ("function" == typeof fetch && !Jb.startsWith("file://")) return fetch(Jb, {
            credentials: "same-origin"
        }).then(function (a) {
            if (!a.ok) throw "failed to load wasm binary file at '" + Jb + "'";
            return a.arrayBuffer()
        }).catch(function () {
            return Lb()
        });
        if (Ra) return new Promise(function (a, b) {
            Ra(Jb, function (c) {
                a(new Uint8Array(c))
            }, b)
        })
    }
    return Promise.resolve().then(function () {
        return Lb()
    })
}
var H, fb, Sb = {
    1447984: function () {
        return hasJSExceptionHandler()
    },
    1448049: function (a) {
        doJSExceptionHandler(x(a))
    },
    1448093: function () {
        return document.querySelector("canvas").getBoundingClientRect().left
    },
    1448213: function () {
        return document.querySelector("canvas").getBoundingClientRect().top
    },
    1448332: function () {
        var a = document.querySelector("canvas").getBoundingClientRect();
        return a.right - a.left
    },
    1448465: function () {
        var a = document.querySelector("canvas").getBoundingClientRect();
        return a.bottom - a.top
    },
    1448598: function (a,
        b, c, d, e, f) {
        gxc_request_room(x(a), x(b), c, d, x(e), x(f))
    },
    1448700: function (a, b, c, d) {
        gxc_join_room(x(a), x(b), x(c), x(d))
    },
    1448791: function () {
        var a = document.getElementById("stats-button");
        a && (a.style.visibility = "visible");
        if (a = document.getElementById("log-state-button")) a.style.visibility = "visible"
    },
    1449040: function () {
        var a = document.getElementById("stats-button");
        a && (a.style.visibility = "visible");
        if (a = document.getElementById("log-state-button")) a.style.visibility = "visible"
    },
    1449289: function (a, b) {
        var c = document.getElementById("multiplayer-stats-container");
        if (c && "visible" == c.style.visibility) {
            if (c = document.getElementById("multiplayer-stats")) c.innerHTML = x(a);
            void 0 != report_stats && report_stats(b)
        }
    },
    1449613: function (a) {
        "function" == typeof showRollbackMessage && showRollbackMessage(x(a))
    },
    1449706: function () {
        var a = document.getElementById("stats-button");
        a && (a.style.visibility = "hidden");
        if (a = document.getElementById("share-button")) a.style.visibility = "hidden";
        if (a = document.getElementById("log-state-button")) a.style.visibility = "hidden"
    },
    1450068: function (a, b) {
        gxc_set_player_status(a,
            x(b))
    },
    1450119: function (a) {
        gxc_report_status(x(a))
    },
    1450160: function (a, b, c) {
        gxc_get_player_info(x(a), x(b), x(c))
    },
    1450239: function (a, b) {
        gxc_set_room_info(a, b)
    },
    1450270: function (a, b, c) {
        gxc_get_player_info(x(a), x(b), x(c))
    },
    1450349: function (a, b, c) {
        gxc_receive_chat_message(x(a), b, c)
    },
    1450405: function (a, b) {
        return webtransport_set_relay(x(a), b)
    },
    1450462: function (a) {
        webtransport_destroy(a)
    },
    1450492: function (a, b, c) {
        webtransport_send(a, b, c)
    },
    1450527: function (a, b, c) {
        return webtransport_receive(a, b, c)
    },
    1450572: function (a) {
        "function" ==
        typeof wallpaper_init_config_controls && wallpaper_init_config_controls(JSON.parse(x(a)))
    },
    1450699: function (a) {
        alert(x(a))
    },
    1450729: function (a) {
        alert(x(a))
    },
    1450758: function () {
        return clipboard_has_text()
    },
    1450806: function () {
        var a = clipboard_get_text(),
            b = aa(a) + 1,
            c = m(b);
        u(a, c, b + 1);
        return c
    },
    1450982: function (a) {
        clipboard_set_text(x(a))
    },
    1451025: function () {
        var a = -1;
        window.matchMedia("(orientation:portrait)").matches ? a = 1 : window.matchMedia("(orientation:landscape)").matches && (a = 0);
        return a
    },
    1451203: function (a) {
        window.open(x(a),
            "_blank").focus()
    },
    1451258: function () {
        var a = document.querySelector("canvas");
        null != a.Ni && (a.Ni.pause(), console.log("Pausing video player"), a.Ni.removeAttribute("src"), a.Ni.load())
    },
    1451508: function (a, b, c) {
        var d = document.querySelector("canvas");
        if (null != d.Tj) return b = d.Tj.getImageData(0, 0, b, c), b = new Uint8Array(b.data.buffer), E.set(b, a), 1;
        console.log("Not rendering video as context is null");
        return 0
    },
    1451845: function () {
        var a = document.querySelector("canvas");
        return null != a.Ni ? a.Ni.videoWidth : 0
    },
    1451992: function () {
        var a =
            document.querySelector("canvas");
        return null != a.Ni ? a.Ni.videoHeight : 0
    },
    1452140: function () {
        var a = document.querySelector("canvas");
        if (null != a.Ni) {
            if (a.Ni.paused) return -1;
            if (!a.Ni.ended) return 0
        }
        return -1
    },
    1452343: function (a) {
        var b = document.querySelector("canvas");
        null != b.Ni && (b.Ni.volume = a)
    },
    1452476: function (a) {
        function b() {
            function l() {
                const p = document.querySelector("canvas").Ni;
                null != p && (p.muted = !1)
            }
            var n = "mousedown",
                q = "mouseup";
            "ontouchstart" in window && (n = "touchstart", q = "touchend");
            if (window.PointerEvent ||
                window.navigator.pointerEnabled || window.navigator.msPointerEnabled) n = "pointerdown", q = "pointerup";
            document.body.addEventListener(n, l, {
                once: !0
            });
            document.body.addEventListener(q, l, {
                once: !0
            })
        }
        var c = document.querySelector("canvas");
        null == c.Ni ? c.Ni = document.createElement("video") : c.Ni.pause();
        const d = c.Ni;
        a = x(a);
        d.muted = !1;
        d.src = a;
        const e = {
                Wl: h.cwrap("video_playback_ended", "", "")
            },
            f = {
                Xl: h.cwrap("video_playback_started", "", "")
            };
        d.addEventListener("ended", function () {
            e.Wl()
        });
        d.addEventListener("playing",
            function () {
                console.log("Video playing event called");
                f.Xl()
            }, !0);
        const g = () => {
            var l = document.querySelector("canvas");
            null == l.Yi ? (l.Yi = document.createElement("canvas"), l.Yi.style.cssText = "position:fixed; top:1px; left:1px; width:1px; height:1px", l.Yi.width = d.videoWidth, l.Yi.height = d.videoHeight, document.body.appendChild(l.Yi), l.Tj = l.Yi.getContext("2d", {
                alpha: !1,
                cm: !1,
                powerPreference: "low-power",
                desynchronized: !0,
                preserveDrawingBuffer: !0
            })) : (d.videoWidth != l.Yi.width && (l.Yi.width = d.videoWidth), l.Yi.height !=
                d.videoHeight && (l.Yi.height = d.videoHeight));
            null != l.Ni && null != l.Tj && l.Tj.drawImage(l.Ni, 0, 0);
            null != l.Ni && (null != l.Ni.src ? l.Ni.requestVideoFrameCallback(g) : console.log("stopping video player callback check"))
        };
        d.requestVideoFrameCallback(g);
        d.load();
        a = d.play();
        void 0 !== a && a.then(() => {}).catch(() => {
            console.log("video_open failed. User must interact with the page before video with audio can be played. Attempting to play the video muted");
            d.muted = !0;
            d.play();
            b()
        })
    },
    1455546: function () {
        var a = document.querySelector("canvas");
        null != a.Ni && a.Ni.pause()
    },
    1455677: function () {
        var a = document.querySelector("canvas");
        null != a.Ni && a.Ni.play()
    },
    1455807: function (a) {
        var b = document.querySelector("canvas");
        null != b.Ni && (b.Ni.loop = .5 < a ? !0 : !1)
    },
    1456E3: function (a) {
        var b = document.querySelector("canvas");
        null != b.Ni && (b.Ni.currentTime = a)
    },
    1456140: function () {
        var a = document.querySelector("canvas");
        return null == a.Ni || isNaN(a.Ni.duration) ? 0 : a.Ni.duration
    },
    1456335: function () {
        var a = document.querySelector("canvas");
        return null != a.Ni ? a.Ni.currentTime :
            0
    },
    1456487: function () {
        var a = document.querySelector("canvas");
        return null != a.Ni ? a.Ni.ended ? 0 : a.Ni.paused ? 3 : a.Ni.readyState < a.Ni.HAVE_CURRENT_DATA ? 1 : 2 : 0
    },
    1457007: function () {
        var a = document.querySelector("canvas");
        return null != a.Ni ? a.Ni.loop : 0
    },
    1457152: function () {
        var a = document.querySelector("canvas");
        return null != a.Ni ? a.Ni.volume : 0
    },
    1457299: function (a, b, c, d) {
        var e = document.querySelector("canvas");
        if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
            console.log("CheckMediaRecorder::vp9 supported");
            var f = {
                mimeType: "video/webm; codecs=vp9"
            }
        } else MediaRecorder.isTypeSupported("video/webm;codecs=vp8") ? (f = {
            mimeType: "video/webm; codecs=vp8"
        }, console.log("CheckMediaRecorder::vp8 supported")) : console.log("CheckMediaRecorder::No vp8 or vp9 support");
        e.Hk = e.captureStream(c);
        e.Hk.getVideoTracks().find(g => g.enabled);
        null == e.hj && (e.hj = document.createElement("canvas"), e.hj.style.cssText = "position:fixed; top:1px; left:1px; width:1px; height:1px", e.hj.width = a, e.hj.height = b, document.body.appendChild(e.hj),
            console.log("Game Canvas width:" + e.width + " height:" + e.height), e.il = e.hj.getContext("2d", {
                alpha: !1,
                desynchronized: !0,
                antialias: !0,
                powerPreference: "low-power",
                preserveDrawingBuffer: !0
            }), e.xj = document.createElement("video"), e.xj.autoplay = !0, e.xj.Zl = !0, e.xj.muted = !0, e.xj.style.cssText = "position:fixed;top:1px;left:1px;width:1px;height:1px", document.body.appendChild(e.xj), e.xj.srcObject = e.Hk, a = e.hj.captureStream(c), 0 < d && (d = w.createMediaStreamDestination().stream.getAudioTracks().find(g => g.enabled), a.addTrack(d)),
            f = new MediaRecorder(a, f), e.rj = [], f.ondataavailable = function (g) {
                e.rj.push(g.data)
            }, e.Ti = f);
        null == e.jk && (e.jk = setInterval(() => e.il.drawImage(e.xj, 0, 0, e.width, e.height, 0, 0, e.hj.width, e.hj.height), 1E3 / c));
        e.Ti && "recording" != e.Ti.state && e.Ti.start()
    },
    1459795: function (a) {
        var b = document.querySelector("canvas");
        if (b.Ti && ("recording" == b.Ti.state || "paused" == b.Ti.state)) {
            var c = x(a);
            b.Ti.onstop = function () {
                var d = new Blob(b.rj, {
                    type: "video/webm"
                });
                b.rj = [];
                clearInterval(b.jk);
                b.jk = null;
                const e = {
                    vk: h.cwrap("post_video_upload_callback",
                        "", ["string"])
                };
                if (c.startsWith("http")) fetch(c, {
                    method: "PUT",
                    body: d
                }).then(() => {
                    e.vk("upload completed")
                }).catch(g => {
                    e.vk("Error uploading: " + g)
                });
                else if ("" != c) {
                    d = URL.createObjectURL(d);
                    var f = document.createElement("a");
                    document.body.appendChild(f);
                    f.style = "display: none";
                    f.href = d;
                    f.download = c;
                    f.click();
                    window.URL.revokeObjectURL(d);
                    e.vk("filesaved")
                }
            };
            b.Ti.stop();
            console.log("saving chunks to movie")
        }
    },
    1460939: function () {
        var a = document.querySelector("canvas");
        a.Ti && "recording" == a.Ti.state && a.Ti.pause()
    },
    1461109: function () {
        var a = document.querySelector("canvas");
        a.Ti && "paused" == a.Ti.state && a.Ti.resume()
    },
    1461277: function (a, b, c, d, e, f) {
        triggerAd(x(a), b, c, d, e, f)
    },
    1461330: function (a, b) {
        triggerPayment(x(a), b)
    },
    1461372: function () {
        var a = 640;
        "number" == typeof window.innerWidth ? a = window.innerWidth : document.documentElement && document.documentElement.clientWidth ? a = document.documentElement.clientWidth : document.body && document.body.clientWidth && (a = document.body.clientWidth);
        return a
    },
    1461678: function () {
        var a = 480;
        "number" == typeof window.innerHeight ? a = window.innerHeight : document.documentElement && document.documentElement.clientHeight ? a = document.documentElement.clientHeight : document.body && document.body.clientHeight && (a = document.body.clientHeight);
        return a
    },
    1461990: function (a, b, c, d) {
        var e = -1;
        if (void 0 != window.oprt) {
            var f = window.oprt.unlockOrientation,
                g = window.oprt.lockPortraitOrientation,
                l = window.oprt.lockLandscapeOrientation;
            a = (a ? 1 : 0) | (b ? 2 : 0) | (c ? 4 : 0);
            a |= d ? 8 : 0;
            15 != (a & 15) && 0 != a || void 0 == f || "function" != typeof f ||
                (f(), console.log("unlocking all orientations"));
            0 != (a & 5) && void 0 != l && "function" == typeof l ? (l(), console.log("Locking to Landscape"), e = 0) : 0 != (a & 10) && void 0 != g && "function" == typeof g && (g(), console.log("Locking to Portrait"), e = 0)
        }
        return e
    },
    1462978: function (a) {
        a ? void 0 != window.oprt && void 0 != window.oprt.enterFullscreen ? (console.log("enterFullscreen"), window.oprt.enterFullscreen()) : (console.log("canvas requesting enterFullscreen"), document.querySelector("canvas").requestFullscreen()) : void 0 != window.oprt &&
            void 0 != window.oprt.exitFullscreen ? (console.log("exitFullscreen"), window.oprt.exitFullscreen()) : (console.log("exitFullscreen via document"), document.exitFullscreen())
    },
    1463506: function () {
        return screen.width
    },
    1463531: function () {
        return screen.height
    },
    1463557: function (a) {
        document.title = x(a)
    },
    1463596: function (a, b) {
        this.onGameSetWindowSize && onGameSetWindowSize(a, b)
    },
    1463665: function (a) {
        document.querySelector("canvas").style.cursor = x(a)
    },
    1463764: function () {
        w = new AudioContext;
        document.addEventListener("visibilitychange",
            la)
    },
    1463886: function () {
        w.close().then(function () {
            w = null;
            document.removeEventListener("visibilitychange", la)
        })
    },
    1464045: function () {
        function a() {
            w.resume().then(function () {
                document.body.removeEventListener(b, a);
                document.body.removeEventListener(c, a)
            })
        }
        let b = "mousedown",
            c = "mouseup";
        "ontouchstart" in window && (b = "touchstart", c = "touchend");
        if (window.PointerEvent || window.navigator.pointerEnabled || window.navigator.msPointerEnabled) b = "pointerdown", c = "pointerup";
        document.body.addEventListener(b, a);
        document.body.addEventListener(c,
            a)
    },
    1464749: function () {
        w.suspend()
    },
    1464782: function () {
        return null != w
    },
    1464822: function () {
        if (null == w) return 4;
        switch (w.state) {
            case "suspended":
                return 0;
            case "running":
                return 1;
            case "closed":
                return 2;
            case "interrupted":
                return 3
        }
    },
    1465016: function () {
        return null == w ? 0 : w.currentTime
    },
    1465094: function () {
        return null == w ? 0 : w.sampleRate
    },
    1465171: function () {
        return null == w ? 0 : w.destination.channelCount
    },
    1465260: function (a, b, c, d, e, f) {
        e = w.createBuffer(b, d, e);
        for (let g = 0; g < b; ++g) {
            const l = e.getChannelData(g);
            for (let n =
                    0; n < d; ++n) l[n] = hb(a + c * (g + n * b), "float")
        }
        a = w.createBufferSource();
        a.buffer = e;
        a.connect(w.destination);
        a.start(f);
        return f + e.duration
    },
    1465906: function (a) {
        navigator.mediaDevices && navigator.mediaDevices.getUserMedia && navigator.mediaDevices.getUserMedia({
            audio: !0
        }).then(b => {
            const c = d => {
                d = d.getAudioTracks();
                if (0 < d.length) return d[0].getSettings().channelCount
            };
            ha = b;
            ia = new AudioContext({
                sampleRate: a
            });
            ia.audioWorklet.addModule("audio-worklet.js").then(() => {
                ja = new AudioWorkletNode(ia, "audio-worklet");
                ja.port.onmessage =
                    e => {
                        da.push(e.data)
                    };
                ea = new MediaStreamAudioSourceNode(ia, {
                    mediaStream: b
                });
                const d = c(b);
                1 < d ? (ka = new ChannelMergerNode(ia, {
                    numberOfInputs: d
                }), ea.connect(ka), ka.connect(ja)) : ea.connect(ja);
                ia.resume()
            }).catch(d => {
                console.error(d);
                ha && ha.getTracks().forEach(e => {
                    e.stop()
                });
                ka = ea = ja = ha = ia = null
            })
        }).catch(b => {
            console.error(b)
        })
    },
    1467683: function () {
        da = [];
        ha.getTracks().forEach(a => {
            a.stop()
        });
        ja.port.postMessage(!0);
        ea.disconnect();
        ea = null;
        null != ka && (ka.disconnect(), ka = null);
        ja.disconnect();
        ja = null;
        ia.close().then(() => {
            ia = null
        }).catch(a => {
            console.error(a)
        })
    },
    1468275: function (a, b, c) {
        b /= c;
        for (let d = 0; d < b; ++d) {
            const e = da.shift();
            for (let f = 0; f < c; ++f) db(a + 2 * (d * c + f), e[f], "i16")
        }
    },
    1468619: function (a) {
        return da.length * a
    },
    1468705: function () {
        return null != ea && null != ja ? 1 : 0
    },
    1468818: function () {
        return screen.width
    },
    1468843: function () {
        return screen.height
    },
    1468869: function () {
        return screen.width
    },
    1468894: function () {
        return screen.height
    },
    1468920: function () {
        var a = document.getElementById("canvas");
        const b = a.style.visibility;
        a.style.visibility =
            "hidden";
        a.offsetHeight;
        a.style.visibility = b
    },
    1469158: function (a, b) {
        g_pWadLoadCallback && g_pWadLoadCallback(a, b)
    },
    1469218: function () {
        var a = manifestFiles(),
            b = aa(a) + 1,
            c = m(b);
        u(a, c, b);
        return c
    },
    1469374: function (a) {
        return __gx_check_cache(x(a), !0) ? 1 : 0
    },
    1469436: function (a, b, c, d, e, f, g, l) {
        __gx_async_wget2(x(a), x(b), x(c), d, e, f, g, l)
    },
    1469533: function (a) {
        setAddAsyncMethod(a)
    },
    1469560: function (a, b, c, d) {
        __gx_prepare_cache(x(c)).then(e => {
            console.log("Prepare cache completed" + JSON.stringify(e));
            h.dynCall("vi", a,
                [b])
        }).catch(e => {
            console.log("Prepare cache error " + e);
            h.dynCall("vi", a, [d])
        })
    },
    1469840: function (a) {
        return __gx_check_cache(x(a), !1) ? 1 : 0
    },
    1469901: function (a, b) {
        g_pWadLoadCallback && g_pWadLoadCallback(a, b)
    },
    1469961: function (a) {
        window.location.replace(x(a))
    },
    1470008: function () {
        this.onFirstFrameRendered && onFirstFrameRendered()
    },
    1470071: function (a, b) {
        this.chrome && this.chrome.runtime && chrome.runtime.sendMessage(x(a), {
            command: x(b)
        })
    },
    1470208: function (a, b, c, d, e) {
        function f(l) {
            if (l.hash) {
                var n = 0;
                (new Uint8Array(l.hash)).every(q => {
                    n = n + q & 255;
                    return !0
                });
                g.jl(n, b)
            }
        }
        const g = {
            jl: h.cwrap("YYSum", "", ["number", "number"])
        };
        this.chrome && this.chrome.runtime && (e = A.subarray(e, e + 20), a = x(a), chrome.runtime.sendMessage(x(c), {
            command: x(d),
            randomString: a,
            hash: e
        }, f))
    },
    1470768: function () {
        return window.matchMedia("(any-hover: none)").matches || window.matchMedia("(any-hover: hover) and (pointer: coarse)").matches || "undefined" != typeof window.oprt
    },
    1470941: function (a, b, c, d, e, f, g) {
        na = a;
        oa = b;
        ra = c;
        sa = d;
        pa = e;
        qa = f;
        ma = g
    },
    1471104: function (a, b) {
        a = prompt(x(a),
            x(b));
        b = aa(a) + 1;
        var c = m(b);
        u(a, c, b + 1);
        return c
    },
    1471300: function (a) {
        return confirm(x(a)) ? 1 : 0
    },
    1471347: function (a, b) {
        a = prompt(x(a), x(b));
        b = 1;
        a ? b += aa(a) : a = "";
        var c = m(b);
        u(a, c, b + 1);
        return c
    },
    1471578: function (a) {
        return confirm(x(a)) ? 1 : 0
    },
    1471625: function (a) {
        alert(x(a))
    },
    1471655: function () {
        Nb("/_savedata");
        window.oprt && window.oprt.gameStorage ? Ob(GXMFS, "/_savedata") : Ob(O, "/_savedata");
        Pb(!0, function () {
            kb("FSSyncCompleted", "void")
        })
    },
    1471877: function () {
        Pb(!1, function () {})
    },
    1471915: function () {
        Pb(!1, function () {})
    },
    1471952: function () {
        Pb(!1, function () {})
    },
    1471990: function () {
        return "undefined" !== typeof AudioContext || "undefined" !== typeof webkitAudioContext ? !0 : !1
    },
    1472137: function () {
        return "undefined" !== typeof navigator.mediaDevices && "undefined" !== typeof navigator.mediaDevices.getUserMedia || "undefined" !== typeof navigator.webkitGetUserMedia ? !0 : !1
    },
    1472371: function (a) {
        "undefined" === typeof h.SDL2 && (h.SDL2 = {});
        var b = h.SDL2;
        a ? b.capture = {} : b.audio = {};
        b.Ui || ("undefined" !== typeof AudioContext ? b.Ui = new AudioContext : "undefined" !==
            typeof webkitAudioContext && (b.Ui = new webkitAudioContext), b.Ui && Qb(b.Ui));
        return void 0 === b.Ui ? -1 : 0
    },
    1472864: function () {
        return h.SDL2.Ui.sampleRate
    },
    1472932: function (a, b, c, d) {
        function e() {}

        function f(l) {
            void 0 !== g.capture.Qj && (clearTimeout(g.capture.Qj), g.capture.Qj = void 0);
            g.capture.Xj = g.Ui.createMediaStreamSource(l);
            g.capture.$i = g.Ui.createScriptProcessor(b, a, 1);
            g.capture.$i.onaudioprocess = function (n) {
                void 0 !== g && void 0 !== g.capture && (n.outputBuffer.getChannelData(0).fill(0), g.capture.mk = n.inputBuffer,
                    Rb("vi", c, [d]))
            };
            g.capture.Xj.connect(g.capture.$i);
            g.capture.$i.connect(g.Ui.destination);
            g.capture.stream = l
        }
        var g = h.SDL2;
        g.capture.ck = g.Ui.createBuffer(a, b, g.Ui.sampleRate);
        g.capture.ck.getChannelData(0).fill(0);
        g.capture.Qj = setTimeout(function () {
            g.capture.mk = g.capture.ck;
            Rb("vi", c, [d])
        }, b / g.Ui.sampleRate * 1E3);
        void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia({
                audio: !0,
                video: !1
            }).then(f).catch(e) : void 0 !== navigator.webkitGetUserMedia &&
            navigator.webkitGetUserMedia({
                audio: !0,
                video: !1
            }, f, e)
    },
    1474584: function (a, b, c, d) {
        var e = h.SDL2;
        e.audio.$i = e.Ui.createScriptProcessor(b, 0, a);
        e.audio.$i.onaudioprocess = function (f) {
            void 0 !== e && void 0 !== e.audio && (e.audio.Pk = f.outputBuffer, Rb("vi", c, [d]))
        };
        e.audio.$i.connect(e.Ui.destination)
    },
    1474994: function (a, b) {
        for (var c = h.SDL2, d = c.capture.mk.numberOfChannels, e = 0; e < d; ++e) {
            var f = c.capture.mk.getChannelData(e);
            if (f.length != b) throw "Web Audio capture buffer length mismatch! Destination size: " + f.length +
                " samples vs expected " + b + " samples!";
            if (1 == d)
                for (var g = 0; g < b; ++g) db(a + 4 * g, f[g], "float");
            else
                for (g = 0; g < b; ++g) db(a + 4 * (g * d + e), f[g], "float")
        }
    },
    1475599: function (a, b) {
        for (var c = h.SDL2, d = c.audio.Pk.numberOfChannels, e = 0; e < d; ++e) {
            var f = c.audio.Pk.getChannelData(e);
            if (f.length != b) throw "Web Audio output buffer length mismatch! Destination size: " + f.length + " samples vs expected " + b + " samples!";
            for (var g = 0; g < b; ++g) f[g] = I[a + (g * d + e << 2) >> 2]
        }
    },
    1476079: function (a) {
        var b = h.SDL2;
        if (a) {
            void 0 !== b.capture.Qj && clearTimeout(b.capture.Qj);
            if (void 0 !== b.capture.stream) {
                a = b.capture.stream.getAudioTracks();
                for (var c = 0; c < a.length; c++) b.capture.stream.removeTrack(a[c]);
                b.capture.stream = void 0
            }
            void 0 !== b.capture.$i && (b.capture.$i.onaudioprocess = function () {}, b.capture.$i.disconnect(), b.capture.$i = void 0);
            void 0 !== b.capture.Xj && (b.capture.Xj.disconnect(), b.capture.Xj = void 0);
            void 0 !== b.capture.ck && (b.capture.ck = void 0);
            b.capture = void 0
        } else void 0 != b.audio.$i && (b.audio.$i.disconnect(), b.audio.$i = void 0), b.audio = void 0;
        void 0 !== b.Ui && void 0 ===
            b.audio && void 0 === b.capture && (b.Ui.close(), b.Ui = void 0)
    },
    1477251: function (a, b, c) {
        h.SDL2 || (h.SDL2 = {});
        var d = h.SDL2;
        d.ol !== h.canvas && (d.ij = h.createContext(h.canvas, !1, !0), d.ol = h.canvas);
        if (d.w !== a || d.Bl !== b || d.El !== d.ij) d.image = d.ij.createImageData(a, b), d.w = a, d.Bl = b, d.El = d.ij;
        a = d.image.data;
        b = c >> 2;
        var e = 0;
        if ("undefined" !== typeof CanvasPixelArray && a instanceof CanvasPixelArray)
            for (c = a.length; e < c;) {
                var f = G[b];
                a[e] = f & 255;
                a[e + 1] = f >> 8 & 255;
                a[e + 2] = f >> 16 & 255;
                a[e + 3] = 255;
                b++;
                e += 4
            } else if (d.ql !== a && (d.pl = new Int32Array(a.buffer),
                    d.rl = new Uint8Array(a.buffer), d.ql = a), a = d.pl, c = a.length, a.set(G.subarray(b, b + c)), a = d.rl, b = 3, e = b + 4 * c, 0 == c % 8)
                for (; b < e;) a[b] = 255, b = b + 4 | 0, a[b] = 255, b = b + 4 | 0, a[b] = 255, b = b + 4 | 0, a[b] = 255, b = b + 4 | 0, a[b] = 255, b = b + 4 | 0, a[b] = 255, b = b + 4 | 0, a[b] = 255, b = b + 4 | 0, a[b] = 255, b = b + 4 | 0;
            else
                for (; b < e;) a[b] = 255, b = b + 4 | 0;
        d.ij.putImageData(d.image, 0, 0);
        return 0
    },
    1478730: function (a, b, c, d, e) {
        var f = document.createElement("canvas");
        f.width = a;
        f.height = b;
        var g = f.getContext("2d");
        a = g.createImageData(a, b);
        b = a.data;
        e >>= 2;
        var l = 0,
            n;
        if ("undefined" !==
            typeof CanvasPixelArray && b instanceof CanvasPixelArray)
            for (n = b.length; l < n;) {
                var q = G[e];
                b[l] = q & 255;
                b[l + 1] = q >> 8 & 255;
                b[l + 2] = q >> 16 & 255;
                b[l + 3] = q >> 24 & 255;
                e++;
                l += 4
            } else b = new Int32Array(b.buffer), n = b.length, b.set(G.subarray(e, e + n));
        g.putImageData(a, 0, 0);
        c = 0 === c && 0 === d ? "url(" + f.toDataURL() + "), auto" : "url(" + f.toDataURL() + ") " + c + " " + d + ", auto";
        d = m(c.length + 1);
        u(c, d, c.length + 1);
        return d
    },
    1479719: function (a) {
        h.canvas && (h.canvas.style.cursor = x(a));
        return 0
    },
    1479812: function () {
        h.canvas && (h.canvas.style.cursor =
            "none")
    },
    1479881: function () {
        return window.innerWidth
    },
    1479911: function () {
        return window.innerHeight
    }
};

function Tb(a, b, c) {
    a.addEventListener(b, c, {
        once: !0
    })
}

function Qb(a) {
    var b;
    b || (b = [document, document.getElementById("canvas")]);
    ["keydown", "mousedown", "touchstart"].forEach(function (c) {
        b.forEach(function (d) {
            d && Tb(d, c, function () {
                "suspended" === a.state && a.resume()
            })
        })
    })
}

function Ub(a) {
    for (; 0 < a.length;) {
        var b = a.shift();
        if ("function" == typeof b) b(h);
        else {
            var c = b.yl;
            "number" == typeof c ? void 0 === b.Uj ? P(c)() : P(c)(b.Uj) : c(void 0 === b.Uj ? null : b.Uj)
        }
    }
}

function Vb(a) {
    var b = mb();
    a = a();
    nb(b);
    return a
}
var Wb = [];

function P(a) {
    var b = Wb[a];
    b || (a >= Wb.length && (Wb.length = a + 1), Wb[a] = b = vb.get(a));
    return b
}

function Rb(a, b, c) {
    a.includes("j") ? (a = h["dynCall_" + a], b = c && c.length ? a.apply(null, [b].concat(c)) : a.call(null, b)) : b = P(b).apply(null, c);
    return b
}

function Xb(a) {
    a instanceof Wa || "unwind" == a || La(1, a)
}
var Yb = (a, b) => {
        for (var c = 0, d = a.length - 1; 0 <= d; d--) {
            var e = a[d];
            "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--)
        }
        if (b)
            for (; c; c--) a.unshift("..");
        return a
    },
    za = a => {
        var b = "/" === a.charAt(0),
            c = "/" === a.substr(-1);
        (a = Yb(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
        a && c && (a += "/");
        return (b ? "/" : "") + a
    },
    Zb = a => {
        var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
        a = b[0];
        b = b[1];
        if (!a && !b) return ".";
        b && (b = b.substr(0, b.length - 1));
        return a + b
    },
    $b = a => {
        if ("/" === a) return "/";
        a = za(a);
        a = a.replace(/\/$/, "");
        var b = a.lastIndexOf("/");
        return -1 === b ? a : a.substr(b + 1)
    };

function ac() {
    if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
        var a = new Uint8Array(1);
        return function () {
            crypto.getRandomValues(a);
            return a[0]
        }
    }
    if (Oa) try {
        var b = require("crypto");
        return function () {
            return b.randomBytes(1)[0]
        }
    } catch (c) {}
    return function () {
        cb("randomDevice")
    }
}

function bc() {
    for (var a = "", b = !1, c = arguments.length - 1; - 1 <= c && !b; c--) {
        b = 0 <= c ? arguments[c] : cc;
        if ("string" != typeof b) throw new TypeError("Arguments to path.resolve must be strings");
        if (!b) return "";
        a = b + "/" + a;
        b = "/" === b.charAt(0)
    }
    a = Yb(a.split("/").filter(d => !!d), !b).join("/");
    return (b ? "/" : "") + a || "."
}
var dc = (a, b) => {
        function c(g) {
            for (var l = 0; l < g.length && "" === g[l]; l++);
            for (var n = g.length - 1; 0 <= n && "" === g[n]; n--);
            return l > n ? [] : g.slice(l, n - l + 1)
        }
        a = bc(a).substr(1);
        b = bc(b).substr(1);
        a = c(a.split("/"));
        b = c(b.split("/"));
        for (var d = Math.min(a.length, b.length), e = d, f = 0; f < d; f++)
            if (a[f] !== b[f]) {
                e = f;
                break
            } d = [];
        for (f = e; f < a.length; f++) d.push("..");
        d = d.concat(b.slice(e));
        return d.join("/")
    },
    ec = [];

function fc(a, b) {
    ec[a] = {
        input: [],
        output: [],
        Lj: b
    };
    gc(a, hc)
}
var hc = {
        open: function (a) {
            var b = ec[a.node.rdev];
            if (!b) throw new Q(43);
            a.tty = b;
            a.seekable = !1
        },
        close: function (a) {
            a.tty.Lj.flush(a.tty)
        },
        flush: function (a) {
            a.tty.Lj.flush(a.tty)
        },
        read: function (a, b, c, d) {
            if (!a.tty || !a.tty.Lj.Uk) throw new Q(60);
            for (var e = 0, f = 0; f < d; f++) {
                try {
                    var g = a.tty.Lj.Uk(a.tty)
                } catch (l) {
                    throw new Q(29);
                }
                if (void 0 === g && 0 === e) throw new Q(6);
                if (null === g || void 0 === g) break;
                e++;
                b[c + f] = g
            }
            e && (a.node.timestamp = Date.now());
            return e
        },
        write: function (a, b, c, d) {
            if (!a.tty || !a.tty.Lj.wk) throw new Q(60);
            try {
                for (var e = 0; e < d; e++) a.tty.Lj.wk(a.tty, b[c + e])
            } catch (f) {
                throw new Q(29);
            }
            d && (a.node.timestamp = Date.now());
            return e
        }
    },
    jc = {
        Uk: function (a) {
            if (!a.input.length) {
                var b = null;
                if (Oa) {
                    var c = Buffer.alloc(256),
                        d = 0;
                    try {
                        d = fs.readSync(process.stdin.fd, c, 0, 256, -1)
                    } catch (e) {
                        if (e.toString().includes("EOF")) d = 0;
                        else throw e;
                    }
                    0 < d ? b = c.slice(0, d).toString("utf-8") : b = null
                } else "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" == typeof readline && (b =
                    readline(), null !== b && (b += "\n"));
                if (!b) return null;
                a.input = ic(b, !0)
            }
            return a.input.shift()
        },
        wk: function (a, b) {
            null === b || 10 === b ? (Xa(pb(a.output, 0)), a.output = []) : 0 != b && a.output.push(b)
        },
        flush: function (a) {
            a.output && 0 < a.output.length && (Xa(pb(a.output, 0)), a.output = [])
        }
    },
    kc = {
        wk: function (a, b) {
            null === b || 10 === b ? (k(pb(a.output, 0)), a.output = []) : 0 != b && a.output.push(b)
        },
        flush: function (a) {
            a.output && 0 < a.output.length && (k(pb(a.output, 0)), a.output = [])
        }
    },
    B = {
        kj: null,
        Vi: function () {
            return B.createNode(null, "/", 16895, 0)
        },
        createNode: function (a, b, c, d) {
            if (24576 === (c & 61440) || 4096 === (c & 61440)) throw new Q(63);
            B.kj || (B.kj = {
                dir: {
                    node: {
                        jj: B.Oi.jj,
                        aj: B.Oi.aj,
                        lookup: B.Oi.lookup,
                        Yj: B.Oi.Yj,
                        rename: B.Oi.rename,
                        unlink: B.Oi.unlink,
                        rmdir: B.Oi.rmdir,
                        readdir: B.Oi.readdir,
                        symlink: B.Oi.symlink
                    },
                    stream: {
                        Ej: B.Qi.Ej
                    }
                },
                file: {
                    node: {
                        jj: B.Oi.jj,
                        aj: B.Oi.aj
                    },
                    stream: {
                        Ej: B.Qi.Ej,
                        read: B.Qi.read,
                        write: B.Qi.write,
                        Jk: B.Qi.Jk,
                        $k: B.Qi.$k,
                        bl: B.Qi.bl
                    }
                },
                link: {
                    node: {
                        jj: B.Oi.jj,
                        aj: B.Oi.aj,
                        readlink: B.Oi.readlink
                    },
                    stream: {}
                },
                Ok: {
                    node: {
                        jj: B.Oi.jj,
                        aj: B.Oi.aj
                    },
                    stream: lc
                }
            });
            c = mc(a, b, c, d);
            16384 === (c.mode & 61440) ? (c.Oi = B.kj.dir.node, c.Qi = B.kj.dir.stream, c.Pi = {}) : 32768 === (c.mode & 61440) ? (c.Oi = B.kj.file.node, c.Qi = B.kj.file.stream, c.Ri = 0, c.Pi = null) : 40960 === (c.mode & 61440) ? (c.Oi = B.kj.link.node, c.Qi = B.kj.link.stream) : 8192 === (c.mode & 61440) && (c.Oi = B.kj.Ok.node, c.Qi = B.kj.Ok.stream);
            c.timestamp = Date.now();
            a && (a.Pi[b] = c, a.timestamp = c.timestamp);
            return c
        },
        Tk: function (a) {
            return a.Pi ? a.Pi.subarray ? a.Pi.subarray(0, a.Ri) : new Uint8Array(a.Pi) : new Uint8Array(0)
        },
        Rk: function (a,
            b) {
            var c = a.Pi ? a.Pi.length : 0;
            c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.Pi, a.Pi = new Uint8Array(b), 0 < a.Ri && a.Pi.set(c.subarray(0, a.Ri), 0))
        },
        Nl: function (a, b) {
            if (a.Ri != b)
                if (0 == b) a.Pi = null, a.Ri = 0;
                else {
                    var c = a.Pi;
                    a.Pi = new Uint8Array(b);
                    c && a.Pi.set(c.subarray(0, Math.min(b, a.Ri)));
                    a.Ri = b
                }
        },
        Oi: {
            jj: function (a) {
                var b = {};
                b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
                b.ino = a.id;
                b.mode = a.mode;
                b.nlink = 1;
                b.uid = 0;
                b.gid = 0;
                b.rdev = a.rdev;
                16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ?
                    b.size = a.Ri : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
                b.atime = new Date(a.timestamp);
                b.mtime = new Date(a.timestamp);
                b.ctime = new Date(a.timestamp);
                b.ml = 4096;
                b.blocks = Math.ceil(b.size / b.ml);
                return b
            },
            aj: function (a, b) {
                void 0 !== b.mode && (a.mode = b.mode);
                void 0 !== b.timestamp && (a.timestamp = b.timestamp);
                void 0 !== b.size && B.Nl(a, b.size)
            },
            lookup: function () {
                throw nc[44];
            },
            Yj: function (a, b, c, d) {
                return B.createNode(a, b, c, d)
            },
            rename: function (a, b, c) {
                if (16384 === (a.mode & 61440)) {
                    try {
                        var d = oc(b, c)
                    } catch (f) {}
                    if (d)
                        for (var e in d.Pi) throw new Q(55);
                }
                delete a.parent.Pi[a.name];
                a.parent.timestamp = Date.now();
                a.name = c;
                b.Pi[c] = a;
                b.timestamp = a.parent.timestamp;
                a.parent = b
            },
            unlink: function (a, b) {
                delete a.Pi[b];
                a.timestamp = Date.now()
            },
            rmdir: function (a, b) {
                var c = oc(a, b),
                    d;
                for (d in c.Pi) throw new Q(55);
                delete a.Pi[b];
                a.timestamp = Date.now()
            },
            readdir: function (a) {
                var b = [".", ".."],
                    c;
                for (c in a.Pi) a.Pi.hasOwnProperty(c) && b.push(c);
                return b
            },
            symlink: function (a, b, c) {
                a = B.createNode(a, b, 41471, 0);
                a.link = c;
                return a
            },
            readlink: function (a) {
                if (40960 !== (a.mode & 61440)) throw new Q(28);
                return a.link
            }
        },
        Qi: {
            read: function (a, b, c, d, e) {
                var f = a.node.Pi;
                if (e >= a.node.Ri) return 0;
                a = Math.min(a.node.Ri - e, d);
                if (8 < a && f.subarray) b.set(f.subarray(e, e + a), c);
                else
                    for (d = 0; d < a; d++) b[c + d] = f[e + d];
                return a
            },
            write: function (a, b, c, d, e, f) {
                b.buffer === E.buffer && (f = !1);
                if (!d) return 0;
                a = a.node;
                a.timestamp = Date.now();
                if (b.subarray && (!a.Pi || a.Pi.subarray)) {
                    if (f) return a.Pi = b.subarray(c, c + d), a.Ri = d;
                    if (0 === a.Ri && 0 === e) return a.Pi = b.slice(c, c + d), a.Ri = d;
                    if (e + d <= a.Ri) return a.Pi.set(b.subarray(c, c + d), e), d
                }
                B.Rk(a, e +
                    d);
                if (a.Pi.subarray && b.subarray) a.Pi.set(b.subarray(c, c + d), e);
                else
                    for (f = 0; f < d; f++) a.Pi[e + f] = b[c + f];
                a.Ri = Math.max(a.Ri, e + d);
                return d
            },
            Ej: function (a, b, c) {
                1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Ri);
                if (0 > b) throw new Q(28);
                return b
            },
            Jk: function (a, b, c) {
                B.Rk(a.node, b + c);
                a.node.Ri = Math.max(a.node.Ri, b + c)
            },
            $k: function (a, b, c, d, e, f) {
                if (0 !== b) throw new Q(28);
                if (32768 !== (a.node.mode & 61440)) throw new Q(43);
                a = a.node.Pi;
                if (f & 2 || a.buffer !== tb) {
                    if (0 < d || d + c < a.length) a.subarray ? a = a.subarray(d,
                        d + c) : a = Array.prototype.slice.call(a, d, d + c);
                    d = !0;
                    cb();
                    c = void 0;
                    if (!c) throw new Q(48);
                    E.set(a, c)
                } else d = !1, c = a.byteOffset;
                return {
                    Mj: c,
                    am: d
                }
            },
            bl: function (a, b, c, d, e) {
                if (32768 !== (a.node.mode & 61440)) throw new Q(43);
                if (e & 2) return 0;
                B.Qi.write(a, b, 0, d, c, !1);
                return 0
            }
        }
    };

function pc(a, b, c) {
    var d = "al " + a;
    Ra(a, function (e) {
        e || cb('Loading data file "' + a + '" failed (no arrayBuffer).');
        b(new Uint8Array(e));
        d && Hb(d)
    }, function () {
        if (c) c();
        else throw 'Loading data file "' + a + '" failed.';
    });
    d && Gb(d)
}
var O = {
        sj: {},
        indexedDB: () => {
            if ("undefined" != typeof indexedDB) return indexedDB;
            var a = null;
            "object" == typeof window && (a = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB);
            a || cb("IDBFS used, but indexedDB not supported");
            return a
        },
        hl: 21,
        wj: "FILE_DATA",
        Vi: function (a) {
            return B.Vi.apply(null, arguments)
        },
        Ek: (a, b, c) => {
            O.qk(a, (d, e) => {
                if (d) return c(d);
                O.rk(a, (f, g) => {
                    if (f) return c(f);
                    O.xk(b ? g : e, b ? e : g, c)
                })
            })
        },
        Ll: () => {
            Object.values(O.sj).forEach(a => a.close());
            O.sj = {}
        },
        zl: (a, b) => {
            var c = O.sj[a];
            if (c) return b(null, c);
            try {
                var d = O.indexedDB().open(a, O.hl)
            } catch (e) {
                return b(e)
            }
            if (!d) return b("Unable to connect to IndexedDB");
            d.onupgradeneeded = e => {
                var f = e.target.result;
                e = e.target.transaction;
                var g;
                f.objectStoreNames.contains(O.wj) ? g = e.objectStore(O.wj) : g = f.createObjectStore(O.wj);
                g.indexNames.contains("timestamp") || g.createIndex("timestamp", "timestamp", {
                    unique: !1
                })
            };
            d.onsuccess = () => {
                c = d.result;
                O.sj[a] = c;
                b(null, c)
            };
            d.onerror = e => {
                b(this.error);
                e.preventDefault()
            }
        },
        qk: (a, b) => {
            function c(l) {
                return "." !==
                    l && ".." !== l
            }

            function d(l) {
                return n => za(l + "/" + n)
            }
            var e = {};
            for (a = Aa(a.uj).filter(c).map(d(a.uj)); a.length;) {
                var f = a.pop();
                try {
                    var g = Ba(f)
                } catch (l) {
                    return b(l)
                }
                16384 === (g.mode & 61440) && a.push.apply(a, Aa(f).filter(c).map(d(f)));
                e[f] = {
                    timestamp: g.mtime
                }
            }
            return b(null, {
                type: "local",
                entries: e
            })
        },
        rk: (a, b) => {
            var c = {};
            O.zl(a.uj, (d, e) => {
                if (d) return b(d);
                try {
                    var f = e.transaction([O.wj], "readonly");
                    f.onerror = g => {
                        b(this.error);
                        g.preventDefault()
                    };
                    f.objectStore(O.wj).index("timestamp").openKeyCursor().onsuccess = g => {
                        g = g.target.result;
                        if (!g) return b(null, {
                            type: "remote",
                            db: e,
                            entries: c
                        });
                        c[g.primaryKey] = {
                            timestamp: g.key
                        };
                        g.continue()
                    }
                } catch (g) {
                    return b(g)
                }
            })
        },
        tk: (a, b) => {
            try {
                var c = D(a).node;
                var d = Ba(a)
            } catch (e) {
                return b(e)
            }
            return 16384 === (d.mode & 61440) ? b(null, {
                timestamp: d.mtime,
                mode: d.mode
            }) : 32768 === (d.mode & 61440) ? (c.Pi = B.Tk(c), b(null, {
                timestamp: d.mtime,
                mode: d.mode,
                contents: c.Pi
            })) : b(Error("node type not supported"))
        },
        Ck: (a, b, c) => {
            try {
                if (16384 === (b.mode & 61440)) Ca(a, b.mode);
                else if (32768 === (b.mode & 61440)) Da(a, b.contents);
                else return c(Error("node type not supported"));
                Ea(a, b.mode);
                Fa(a, b.timestamp, b.timestamp)
            } catch (d) {
                return c(d)
            }
            c(null)
        },
        zk: (a, b) => {
            try {
                D(a);
                var c = Ba(a);
                16384 === (c.mode & 61440) ? Ga(a) : 32768 === (c.mode & 61440) && Ha(a)
            } catch (d) {
                return b(d)
            }
            b(null)
        },
        uk: (a, b, c) => {
            a = a.get(b);
            a.onsuccess = d => {
                c(null, d.target.result)
            };
            a.onerror = d => {
                c(this.error);
                d.preventDefault()
            }
        },
        Dk: (a, b, c, d) => {
            try {
                var e = a.put(c, b)
            } catch (f) {
                d(f);
                return
            }
            e.onsuccess = () => {
                d(null)
            };
            e.onerror = f => {
                d(this.error);
                f.preventDefault()
            }
        },
        Ak: (a, b, c) => {
            a =
                a.delete(b);
            a.onsuccess = () => {
                c(null)
            };
            a.onerror = d => {
                c(this.error);
                d.preventDefault()
            }
        },
        xk: (a, b, c) => {
            function d(p) {
                if (p && !l) return l = !0, c(p)
            }
            var e = 0,
                f = [];
            Object.keys(a.entries).forEach(function (p) {
                var t = a.entries[p],
                    v = b.entries[p];
                v && t.timestamp.getTime() == v.timestamp.getTime() || (f.push(p), e++)
            });
            var g = [];
            Object.keys(b.entries).forEach(function (p) {
                a.entries[p] || (g.push(p), e++)
            });
            if (!e) return c(null);
            var l = !1,
                n = ("remote" === a.type ? a.db : b.db).transaction([O.wj], "readwrite"),
                q = n.objectStore(O.wj);
            n.onerror =
                p => {
                    d(this.error);
                    p.preventDefault()
                };
            n.oncomplete = () => {
                l || c(null)
            };
            f.sort().forEach(p => {
                "local" === b.type ? O.uk(q, p, (t, v) => {
                    if (t) return d(t);
                    O.Ck(p, v, d)
                }) : O.tk(p, (t, v) => {
                    if (t) return d(t);
                    O.Dk(q, p, v, d)
                })
            });
            g.sort().reverse().forEach(p => {
                "local" === b.type ? O.zk(p, d) : O.Ak(q, p, d)
            })
        }
    },
    qc = null,
    rc = {},
    sc = [],
    tc = 1,
    uc = null,
    cc = "/",
    vc = !0,
    Q = null,
    nc = {},
    wc = 0,
    D = (a, b = {}) => {
        a = bc(cc, a);
        if (!a) return {
            path: "",
            node: null
        };
        b = Object.assign({
            Sk: !0,
            yk: 0
        }, b);
        if (8 < b.yk) throw new Q(32);
        a = Yb(a.split("/").filter(g => !!g), !1);
        for (var c =
                qc, d = "/", e = 0; e < a.length; e++) {
            var f = e === a.length - 1;
            if (f && b.parent) break;
            c = oc(c, a[e]);
            d = za(d + "/" + a[e]);
            c.tj && (!f || f && b.Sk) && (c = c.tj.root);
            if (!f || b.Cj)
                for (f = 0; 40960 === (c.mode & 61440);)
                    if (c = xc(d), d = bc(Zb(d), c), c = D(d, {
                            yk: b.yk + 1
                        }).node, 40 < f++) throw new Q(32);
        }
        return {
            path: d,
            node: c
        }
    },
    yc = a => {
        for (var b;;) {
            if (a === a.parent) return a = a.Vi.uj, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
            b = b ? a.name + "/" + b : a.name;
            a = a.parent
        }
    },
    zc = (a, b) => {
        for (var c = 0, d = 0; d < b.length; d++) c = (c << 5) - c + b.charCodeAt(d) | 0;
        return (a + c >>> 0) % uc.length
    },
    Ac =
    a => {
        var b = zc(a.parent.id, a.name);
        a.Kj = uc[b];
        uc[b] = a
    },
    Bc = a => {
        var b = zc(a.parent.id, a.name);
        if (uc[b] === a) uc[b] = a.Kj;
        else
            for (b = uc[b]; b;) {
                if (b.Kj === a) {
                    b.Kj = a.Kj;
                    break
                }
                b = b.Kj
            }
    },
    oc = (a, b) => {
        var c;
        if (c = (c = Cc(a, "x")) ? c : a.Oi.lookup ? 0 : 2) throw new Q(c, a);
        for (c = uc[zc(a.id, b)]; c; c = c.Kj) {
            var d = c.name;
            if (c.parent.id === a.id && d === b) return c
        }
        return a.Oi.lookup(a, b)
    },
    mc = (a, b, c, d) => {
        a = new Dc(a, b, c, d);
        Ac(a);
        return a
    },
    Ec = {
        r: 0,
        "r+": 2,
        w: 577,
        "w+": 578,
        a: 1089,
        "a+": 1090
    },
    Fc = a => {
        var b = ["r", "w", "rw"][a & 3];
        a & 512 && (b += "w");
        return b
    },
    Cc = (a, b) => {
        if (vc) return 0;
        if (!b.includes("r") || a.mode & 292) {
            if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) return 2
        } else return 2;
        return 0
    },
    Gc = (a, b) => {
        try {
            return oc(a, b), 20
        } catch (c) {}
        return Cc(a, "wx")
    },
    Hc = (a, b, c) => {
        try {
            var d = oc(a, b)
        } catch (e) {
            return e.Si
        }
        if (a = Cc(a, "wx")) return a;
        if (c) {
            if (16384 !== (d.mode & 61440)) return 54;
            if (d === d.parent || yc(d) === cc) return 10
        } else if (16384 === (d.mode & 61440)) return 31;
        return 0
    },
    Ic = (a = 0) => {
        for (; 4096 >= a; a++)
            if (!sc[a]) return a;
        throw new Q(33);
    },
    Kc = (a, b) => {
        Jc || (Jc = function () {
            this.bk = {}
        }, Jc.prototype = {
            flags: {
                get: function () {
                    return this.bk.flags
                },
                set: function (c) {
                    this.bk.flags = c
                }
            },
            position: {
                get im() {
                    return this.bk.position
                },
                set: function (c) {
                    this.bk.position = c
                }
            }
        });
        a = Object.assign(new Jc, a);
        b = Ic(b);
        a.fd = b;
        return sc[b] = a
    },
    lc = {
        open: a => {
            a.Qi = rc[a.node.rdev].Qi;
            a.Qi.open && a.Qi.open(a)
        },
        Ej: () => {
            throw new Q(70);
        }
    },
    gc = (a, b) => {
        rc[a] = {
            Qi: b
        }
    },
    Lc = () => {
        for (var a = [], b = [qc.Vi]; b.length;) {
            var c = b.pop();
            a.push(c);
            b.push.apply(b, c.al)
        }
        return a
    },
    Pb = (a, b) => {
        function c(g) {
            wc--;
            return b(g)
        }

        function d(g) {
            if (g) {
                if (!d.ul) return d.ul = !0, c(g)
            } else ++f >= e.length && c(null)
        }
        "function" == typeof a && (b = a, a = !1);
        wc++;
        1 < wc && k("warning: " + wc + " FS.syncfs operations in flight at once, probably just doing extra work");
        var e = Lc(),
            f = 0;
        e.forEach(g => {
            if (!g.type.Ek) return d(null);
            g.type.Ek(g, a, d)
        })
    },
    Ob = (a, b) => {
        var c = "/" === b,
            d = !b;
        if (c && qc) throw new Q(10);
        if (!c && !d) {
            var e = D(b, {
                Sk: !1
            });
            b = e.path;
            e = e.node;
            if (e.tj) throw new Q(10);
            if (16384 !== (e.mode & 61440)) throw new Q(54);
        }
        b = {
            type: a,
            nm: {},
            uj: b,
            al: []
        };
        a =
            a.Vi(b);
        a.Vi = b;
        b.root = a;
        c ? qc = a : e && (e.tj = b, e.Vi && e.Vi.al.push(b))
    },
    Mc = (a, b, c) => {
        var d = D(a, {
            parent: !0
        }).node;
        a = $b(a);
        if (!a || "." === a || ".." === a) throw new Q(28);
        var e = Gc(d, a);
        if (e) throw new Q(e);
        if (!d.Oi.Yj) throw new Q(63);
        return d.Oi.Yj(d, a, b, c)
    },
    Nb = (a, b) => Mc(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0),
    Ca = (a, b) => {
        a = a.split("/");
        for (var c = "", d = 0; d < a.length; ++d)
            if (a[d]) {
                c += "/" + a[d];
                try {
                    Nb(c, b)
                } catch (e) {
                    if (20 != e.Si) throw e;
                }
            }
    },
    Nc = (a, b, c) => {
        "undefined" == typeof c && (c = b, b = 438);
        return Mc(a, b | 8192, c)
    },
    Oc = (a, b) => {
        if (!bc(a)) throw new Q(44);
        var c = D(b, {
            parent: !0
        }).node;
        if (!c) throw new Q(44);
        b = $b(b);
        var d = Gc(c, b);
        if (d) throw new Q(d);
        if (!c.Oi.symlink) throw new Q(63);
        c.Oi.symlink(c, b, a)
    },
    Ga = a => {
        var b = D(a, {
            parent: !0
        }).node;
        a = $b(a);
        var c = oc(b, a),
            d = Hc(b, a, !0);
        if (d) throw new Q(d);
        if (!b.Oi.rmdir) throw new Q(63);
        if (c.tj) throw new Q(10);
        b.Oi.rmdir(b, a);
        Bc(c)
    },
    Aa = a => {
        a = D(a, {
            Cj: !0
        }).node;
        if (!a.Oi.readdir) throw new Q(54);
        return a.Oi.readdir(a)
    },
    Ha = a => {
        var b = D(a, {
            parent: !0
        }).node;
        if (!b) throw new Q(44);
        a = $b(a);
        var c = oc(b, a),
            d = Hc(b, a, !1);
        if (d) throw new Q(d);
        if (!b.Oi.unlink) throw new Q(63);
        if (c.tj) throw new Q(10);
        b.Oi.unlink(b, a);
        Bc(c)
    },
    xc = a => {
        a = D(a).node;
        if (!a) throw new Q(44);
        if (!a.Oi.readlink) throw new Q(28);
        return bc(yc(a.parent), a.Oi.readlink(a))
    },
    Ba = (a, b) => {
        a = D(a, {
            Cj: !b
        }).node;
        if (!a) throw new Q(44);
        if (!a.Oi.jj) throw new Q(63);
        return a.Oi.jj(a)
    },
    Pc = a => Ba(a, !0),
    Ea = (a, b) => {
        a = "string" == typeof a ? D(a, {
            Cj: !0
        }).node : a;
        if (!a.Oi.aj) throw new Q(63);
        a.Oi.aj(a, {
            mode: b & 4095 | a.mode & -4096,
            timestamp: Date.now()
        })
    },
    Fa = (a, b, c) => {
        a = D(a, {
            Cj: !0
        }).node;
        a.Oi.aj(a, {
            timestamp: Math.max(b,
                c)
        })
    },
    Rc = (a, b, c) => {
        if ("" === a) throw new Q(44);
        if ("string" == typeof b) {
            var d = Ec[b];
            if ("undefined" == typeof d) throw Error("Unknown file open mode: " + b);
            b = d
        }
        c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
        if ("object" == typeof a) var e = a;
        else {
            a = za(a);
            try {
                e = D(a, {
                    Cj: !(b & 131072)
                }).node
            } catch (f) {}
        }
        d = !1;
        if (b & 64)
            if (e) {
                if (b & 128) throw new Q(20);
            } else e = Mc(a, c, 0), d = !0;
        if (!e) throw new Q(44);
        8192 === (e.mode & 61440) && (b &= -513);
        if (b & 65536 && 16384 !== (e.mode & 61440)) throw new Q(54);
        if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : 16384 ===
                (e.mode & 61440) && ("r" !== Fc(b) || b & 512) ? 31 : Cc(e, Fc(b)) : 44)) throw new Q(c);
        if (b & 512) {
            c = e;
            c = "string" == typeof c ? D(c, {
                Cj: !0
            }).node : c;
            if (!c.Oi.aj) throw new Q(63);
            if (16384 === (c.mode & 61440)) throw new Q(31);
            if (32768 !== (c.mode & 61440)) throw new Q(28);
            if (d = Cc(c, "w")) throw new Q(d);
            c.Oi.aj(c, {
                size: 0,
                timestamp: Date.now()
            })
        }
        b &= -131713;
        e = Kc({
            node: e,
            path: yc(e),
            flags: b,
            seekable: !0,
            position: 0,
            Qi: e.Qi,
            Ul: [],
            error: !1
        });
        e.Qi.open && e.Qi.open(e);
        !h.logReadFiles || b & 1 || (Qc || (Qc = {}), a in Qc || (Qc[a] = 1));
        return e
    },
    Sc = a => {
        if (null ===
            a.fd) throw new Q(8);
        a.Dj && (a.Dj = null);
        try {
            a.Qi.close && a.Qi.close(a)
        } catch (b) {
            throw b;
        } finally {
            sc[a.fd] = null
        }
        a.fd = null
    },
    Tc = (a, b, c) => {
        if (null === a.fd) throw new Q(8);
        if (!a.seekable || !a.Qi.Ej) throw new Q(70);
        if (0 != c && 1 != c && 2 != c) throw new Q(28);
        a.position = a.Qi.Ej(a, b, c);
        a.Ul = [];
        return a.position
    },
    Uc = (a, b, c, d, e, f) => {
        if (0 > d || 0 > e) throw new Q(28);
        if (null === a.fd) throw new Q(8);
        if (0 === (a.flags & 2097155)) throw new Q(8);
        if (16384 === (a.node.mode & 61440)) throw new Q(31);
        if (!a.Qi.write) throw new Q(28);
        a.seekable && a.flags &
            1024 && Tc(a, 0, 2);
        var g = "undefined" != typeof e;
        if (!g) e = a.position;
        else if (!a.seekable) throw new Q(70);
        b = a.Qi.write(a, b, c, d, e, f);
        g || (a.position += b);
        return b
    },
    Da = (a, b) => {
        var c = {
            Mk: !0
        };
        c.flags = c.flags || 577;
        a = Rc(a, c.flags, c.mode);
        if ("string" == typeof b) {
            var d = new Uint8Array(aa(b) + 1);
            b = qb(b, d, 0, d.length);
            Uc(a, d, 0, b, void 0, c.Mk)
        } else if (ArrayBuffer.isView(b)) Uc(a, b, 0, b.byteLength, void 0, c.Mk);
        else throw Error("Unsupported data type");
        Sc(a)
    },
    Vc = () => {
        Q || (Q = function (a, b) {
            this.node = b;
            this.Ol = function (c) {
                this.Si =
                    c
            };
            this.Ol(a);
            this.message = "FS error"
        }, Q.prototype = Error(), Q.prototype.constructor = Q, [44].forEach(a => {
            nc[a] = new Q(a);
            nc[a].stack = "<generic error, no stack>"
        }))
    },
    Wc, Xc = (a, b) => {
        var c = 0;
        a && (c |= 365);
        b && (c |= 146);
        return c
    },
    Yc = (a, b) => {
        a = "string" == typeof a ? a : yc(a);
        for (b = b.split("/").reverse(); b.length;) {
            var c = b.pop();
            if (c) {
                var d = za(a + "/" + c);
                try {
                    Nb(d)
                } catch (e) {}
                a = d
            }
        }
        return d
    },
    Zc = (a, b, c, d) => {
        a = za(("string" == typeof a ? a : yc(a)) + "/" + b);
        c = Xc(c, d);
        return Mc(a, (void 0 !== c ? c : 438) & 4095 | 32768, 0)
    },
    $c = (a, b, c, d, e, f) => {
        var g =
            b;
        a && (a = "string" == typeof a ? a : yc(a), g = b ? za(a + "/" + b) : a);
        a = Xc(d, e);
        g = Mc(g, (void 0 !== a ? a : 438) & 4095 | 32768, 0);
        if (c) {
            if ("string" == typeof c) {
                b = Array(c.length);
                d = 0;
                for (e = c.length; d < e; ++d) b[d] = c.charCodeAt(d);
                c = b
            }
            Ea(g, a | 146);
            b = Rc(g, 577);
            Uc(b, c, 0, c.length, 0, f);
            Sc(b);
            Ea(g, a)
        }
        return g
    },
    ad = (a, b, c, d) => {
        a = za(("string" == typeof a ? a : yc(a)) + "/" + b);
        b = Xc(!!c, !!d);
        ad.Yk || (ad.Yk = 64);
        var e = ad.Yk++ << 8 | 0;
        gc(e, {
            open: f => {
                f.seekable = !1
            },
            close: () => {
                d && d.buffer && d.buffer.length && d(10)
            },
            read: (f, g, l, n) => {
                for (var q = 0, p = 0; p < n; p++) {
                    try {
                        var t =
                            c()
                    } catch (v) {
                        throw new Q(29);
                    }
                    if (void 0 === t && 0 === q) throw new Q(6);
                    if (null === t || void 0 === t) break;
                    q++;
                    g[l + p] = t
                }
                q && (f.node.timestamp = Date.now());
                return q
            },
            write: (f, g, l, n) => {
                for (var q = 0; q < n; q++) try {
                    d(g[l + q])
                } catch (p) {
                    throw new Q(29);
                }
                n && (f.node.timestamp = Date.now());
                return q
            }
        });
        return Nc(a, b, e)
    },
    bd = a => {
        if (!(a.Hl || a.Il || a.link || a.Pi)) {
            if ("undefined" != typeof XMLHttpRequest) throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
            if (Qa) try {
                a.Pi = ic(Qa(a.url), !0), a.Ri = a.Pi.length
            } catch (b) {
                throw new Q(29);
            } else throw Error("Cannot load without read() or XMLHttpRequest.");
        }
    },
    cd = (a, b, c, d, e) => {
        function f() {
            this.sk = !1;
            this.rj = []
        }
        f.prototype.get = function (p) {
            if (!(p > this.length - 1 || 0 > p)) {
                var t = p % this.chunkSize;
                return this.Vk(p / this.chunkSize | 0)[t]
            }
        };
        f.prototype.Ni = function (p) {
            this.Vk = p
        };
        f.prototype.Lk = function () {
            var p = new XMLHttpRequest;
            p.open("HEAD", c, !1);
            p.send(null);
            if (!(200 <= p.status && 300 > p.status || 304 === p.status)) throw Error("Couldn't load " +
                c + ". Status: " + p.status);
            var t = Number(p.getResponseHeader("Content-length")),
                v, r = (v = p.getResponseHeader("Accept-Ranges")) && "bytes" === v;
            p = (v = p.getResponseHeader("Content-Encoding")) && "gzip" === v;
            var C = 1048576;
            r || (C = t);
            var y = this;
            y.Ni(F => {
                var J = F * C,
                    M = (F + 1) * C - 1;
                M = Math.min(M, t - 1);
                if ("undefined" == typeof y.rj[F]) {
                    var z = y.rj;
                    if (J > M) throw Error("invalid range (" + J + ", " + M + ") or no bytes requested!");
                    if (M > t - 1) throw Error("only " + t + " bytes available! programmer error!");
                    var L = new XMLHttpRequest;
                    L.open("GET",
                        c, !1);
                    t !== C && L.setRequestHeader("Range", "bytes=" + J + "-" + M);
                    L.responseType = "arraybuffer";
                    L.overrideMimeType && L.overrideMimeType("text/plain; charset=x-user-defined");
                    L.send(null);
                    if (!(200 <= L.status && 300 > L.status || 304 === L.status)) throw Error("Couldn't load " + c + ". Status: " + L.status);
                    J = void 0 !== L.response ? new Uint8Array(L.response || []) : ic(L.responseText || "", !0);
                    z[F] = J
                }
                if ("undefined" == typeof y.rj[F]) throw Error("doXHR failed!");
                return y.rj[F]
            });
            if (p || !t) C = t = 1, C = t = this.Vk(0).length, Xa("LazyFiles on gzip forces download of the whole file when length is accessed");
            this.ll = t;
            this.kl = C;
            this.sk = !0
        };
        if ("undefined" != typeof XMLHttpRequest) {
            if (!Na) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var g = new f;
            Object.defineProperties(g, {
                length: {
                    get: function () {
                        this.sk || this.Lk();
                        return this.ll
                    }
                },
                chunkSize: {
                    get: function () {
                        this.sk || this.Lk();
                        return this.kl
                    }
                }
            });
            var l = void 0
        } else l = c, g = void 0;
        var n = Zc(a, b, d, e);
        g ? n.Pi = g : l && (n.Pi = null, n.url = l);
        Object.defineProperties(n, {
            Ri: {
                get: function () {
                    return this.Pi.length
                }
            }
        });
        var q = {};
        Object.keys(n.Qi).forEach(p => {
            var t = n.Qi[p];
            q[p] = function () {
                bd(n);
                return t.apply(null, arguments)
            }
        });
        q.read = (p, t, v, r, C) => {
            bd(n);
            p = p.node.Pi;
            if (C >= p.length) return 0;
            r = Math.min(p.length - C, r);
            if (p.slice)
                for (var y = 0; y < r; y++) t[v + y] = p[C + y];
            else
                for (y = 0; y < r; y++) t[v + y] = p.get(C + y);
            return r
        };
        n.Qi = q;
        return n
    },
    ed = (a, b, c, d, e, f, g, l, n, q) => {
        function p(r) {
            function C(y) {
                q && q();
                l || $c(a, b, y, d, e, n);
                f && f();
                Hb(v)
            }
            dd(r, t, C, () => {
                g && g();
                Hb(v)
            }) || C(r)
        }
        var t = b ? bc(za(a + "/" + b)) : a,
            v = "cp " + t;
        Gb(v);
        "string" == typeof c ? pc(c,
            r => p(r), g) : p(c)
    },
    fd = {},
    Jc, Qc;

function gd(a, b, c) {
    if ("/" === b.charAt(0)) return b;
    if (-100 === a) a = cc;
    else {
        a = sc[a];
        if (!a) throw new Q(8);
        a = a.path
    }
    if (0 == b.length) {
        if (!c) throw new Q(44);
        return a
    }
    return za(a + "/" + b)
}

function hd(a, b, c) {
    try {
        var d = a(b)
    } catch (e) {
        if (e && e.node && za(b) !== za(yc(e.node))) return -54;
        throw e;
    }
    G[c >> 2] = d.dev;
    G[c + 4 >> 2] = 0;
    G[c + 8 >> 2] = d.ino;
    G[c + 12 >> 2] = d.mode;
    G[c + 16 >> 2] = d.nlink;
    G[c + 20 >> 2] = d.uid;
    G[c + 24 >> 2] = d.gid;
    G[c + 28 >> 2] = d.rdev;
    G[c + 32 >> 2] = 0;
    fb = [d.size >>> 0, (H = d.size, 1 <= +Math.abs(H) ? 0 < H ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
    G[c + 40 >> 2] = fb[0];
    G[c + 44 >> 2] = fb[1];
    G[c + 48 >> 2] = 4096;
    G[c + 52 >> 2] = d.blocks;
    G[c + 56 >> 2] = d.atime.getTime() / 1E3 | 0;
    G[c + 60 >>
        2] = 0;
    G[c + 64 >> 2] = d.mtime.getTime() / 1E3 | 0;
    G[c + 68 >> 2] = 0;
    G[c + 72 >> 2] = d.ctime.getTime() / 1E3 | 0;
    G[c + 76 >> 2] = 0;
    fb = [d.ino >>> 0, (H = d.ino, 1 <= +Math.abs(H) ? 0 < H ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
    G[c + 80 >> 2] = fb[0];
    G[c + 84 >> 2] = fb[1];
    return 0
}
var jd = void 0;

function kd() {
    jd += 4;
    return G[jd - 4 >> 2]
}

function ld(a) {
    a = sc[a];
    if (!a) throw new Q(8);
    return a
}

function md(a, b, c) {
    function d(n) {
        return (n = n.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? n[1] : "GMT"
    }
    var e = (new Date).getFullYear(),
        f = new Date(e, 0, 1),
        g = new Date(e, 6, 1);
    e = f.getTimezoneOffset();
    var l = g.getTimezoneOffset();
    G[a >> 2] = 60 * Math.max(e, l);
    G[b >> 2] = Number(e != l);
    a = d(f);
    b = d(g);
    a = rb(a);
    b = rb(b);
    l < e ? (G[c >> 2] = a, G[c + 4 >> 2] = b) : (G[c >> 2] = b, G[c + 4 >> 2] = a)
}

function nd(a, b, c) {
    nd.nl || (nd.nl = !0, md(a, b, c))
}

function od(a, b) {
    pd = a;
    qd = b;
    if (rd)
        if (sd || (sd = !0), 0 == a) td = function () {
            var d = Math.max(0, ud + b - vd()) | 0;
            setTimeout(wd, d)
        };
        else if (1 == a) td = function () {
        xd(wd)
    };
    else if (2 == a) {
        if ("undefined" == typeof setImmediate) {
            var c = [];
            addEventListener("message", function (d) {
                if ("setimmediate" === d.data || "setimmediate" === d.data.target) d.stopPropagation(), c.shift()()
            }, !0);
            setImmediate = function (d) {
                c.push(d);
                Na ? (void 0 === h.setImmediates && (h.setImmediates = []), h.setImmediates.push(d), postMessage({
                    target: "setimmediate"
                })) : postMessage("setimmediate",
                    "*")
            }
        }
        td = function () {
            setImmediate(wd)
        }
    }
}
var vd;
vd = Oa ? () => {
    var a = process.hrtime();
    return 1E3 * a[0] + a[1] / 1E6
} : () => performance.now();

function yd(a) {
    !rd || cb("emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
    rd = a;
    var b = zd;
    sd = !1;
    wd = function () {
        if (!jb)
            if (0 < Ad.length) {
                var c = Date.now(),
                    d = Ad.shift();
                d.yl(d.Uj);
                if (Bd) {
                    var e = Bd,
                        f = 0 == e % 1 ? e - 1 : Math.floor(e);
                    Bd = d.em ? f : (8 * e + (f + .5)) / 9
                }
                Xa('main loop blocker "' + d.name + '" took ' + (Date.now() - c) + " ms");
                h.setStatus && (c = h.statusMessage || "Please wait...", d = Bd, e =
                    Cd.gm, d ? d < e ? h.setStatus(c + " (" + (e - d) + "/" + e + ")") : h.setStatus(c) : h.setStatus(""));
                b < zd || setTimeout(wd, 0)
            } else if (!(b < zd))
            if (Dd = Dd + 1 | 0, 1 == pd && 1 < qd && 0 != Dd % qd) td();
            else {
                0 == pd && (ud = vd());
                if (S)
                    for (c = S.Oj, S.Oj = S.Sj, S.Sj = c, c = S.vj, S.vj = S.dk, S.dk = c, c = Ed(2097152), d = 0; d <= c; ++d) S.vj[d] = 0;
                jb || h.preMainLoop && !1 === h.preMainLoop() || (Fd(a), h.postMainLoop && h.postMainLoop());
                b < zd || ("object" == typeof SDL && SDL.audio && SDL.audio.Kl && SDL.audio.Kl(), td())
            }
    }
}

function Fd(a, b) {
    if (!jb)
        if (b) a();
        else try {
            a()
        } catch (c) {
            Xb(c)
        }
}

function Gd(a) {
    setTimeout(function () {
        Fd(a)
    }, 1E4)
}
var sd = !1,
    td = null,
    zd = 0,
    rd = null,
    pd = 0,
    qd = 0,
    Dd = 0,
    Ad = [],
    Cd = {},
    ud, wd, Bd, Hd = !1,
    Id = !1,
    Jd = [];

function Kd() {
    function a() {
        Id = document.pointerLockElement === h.canvas || document.mozPointerLockElement === h.canvas || document.webkitPointerLockElement === h.canvas || document.msPointerLockElement === h.canvas
    }
    h.preloadPlugins || (h.preloadPlugins = []);
    if (!Ld) {
        Ld = !0;
        try {
            Md = !0
        } catch (c) {
            Md = !1, Xa("warning: no blob constructor, cannot create blobs with mimetypes")
        }
        Nd = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : Md ? null : Xa("warning: no BlobBuilder");
        Od = "undefined" !=
            typeof window ? window.URL ? window.URL : window.webkitURL : void 0;
        h.cl || "undefined" != typeof Od || (Xa("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), h.cl = !0);
        h.preloadPlugins.push({
            canHandle: function (c) {
                return !h.cl && /\.(jpg|jpeg|png|bmp)$/i.test(c)
            },
            handle: function (c, d, e, f) {
                var g = null;
                if (Md) try {
                    g = new Blob([c], {
                        type: Pd(d)
                    }), g.size !== c.length && (g = new Blob([(new Uint8Array(c)).buffer], {
                        type: Pd(d)
                    }))
                } catch (q) {
                    Ya("Blob constructor present but fails: " +
                        q + "; falling back to blob builder")
                }
                g || (g = new Nd, g.append((new Uint8Array(c)).buffer), g = g.getBlob());
                var l = Od.createObjectURL(g),
                    n = new Image;
                n.onload = () => {
                    n.complete || cb("Image " + d + " could not be decoded");
                    var q = document.createElement("canvas");
                    q.width = n.width;
                    q.height = n.height;
                    q.getContext("2d").drawImage(n, 0, 0);
                    Od.revokeObjectURL(l);
                    e && e(c)
                };
                n.onerror = () => {
                    Xa("Image " + l + " could not be decoded");
                    f && f()
                };
                n.src = l
            }
        });
        h.preloadPlugins.push({
            canHandle: function (c) {
                return !h.mm && c.substr(-4) in {
                    ".ogg": 1,
                    ".wav": 1,
                    ".mp3": 1
                }
            },
            handle: function (c, d, e, f) {
                function g() {
                    n || (n = !0, e && e(c))
                }

                function l() {
                    n || (n = !0, new Audio, f && f())
                }
                var n = !1;
                if (Md) {
                    try {
                        var q = new Blob([c], {
                            type: Pd(d)
                        })
                    } catch (t) {
                        return l()
                    }
                    q = Od.createObjectURL(q);
                    var p = new Audio;
                    p.addEventListener("canplaythrough", function () {
                        g(p)
                    }, !1);
                    p.onerror = function () {
                        if (!n) {
                            Xa("warning: browser could not fully decode audio " + d + ", trying slower base64 approach");
                            for (var t = "", v = 0, r = 0, C = 0; C < c.length; C++)
                                for (v = v << 8 | c[C], r += 8; 6 <= r;) {
                                    var y = v >> r - 6 & 63;
                                    r -= 6;
                                    t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [y]
                                }
                            2 ==
                                r ? (t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(v & 3) << 4], t += "==") : 4 == r && (t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(v & 15) << 2], t += "=");
                            p.src = "data:audio/x-" + d.substr(-3) + ";base64," + t;
                            g(p)
                        }
                    };
                    p.src = q;
                    Gd(function () {
                        g(p)
                    })
                } else return l()
            }
        });
        var b = h.canvas;
        b && (b.requestPointerLock = b.requestPointerLock || b.mozRequestPointerLock || b.webkitRequestPointerLock || b.msRequestPointerLock || function () {}, b.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock ||
            document.webkitExitPointerLock || document.msExitPointerLock || function () {}, b.exitPointerLock = b.exitPointerLock.bind(document), document.addEventListener("pointerlockchange", a, !1), document.addEventListener("mozpointerlockchange", a, !1), document.addEventListener("webkitpointerlockchange", a, !1), document.addEventListener("mspointerlockchange", a, !1), h.elementPointerLock && b.addEventListener("click", function (c) {
                !Id && h.canvas.requestPointerLock && (h.canvas.requestPointerLock(), c.preventDefault())
            }, !1))
    }
}

function dd(a, b, c, d) {
    Kd();
    var e = !1;
    h.preloadPlugins.forEach(function (f) {
        !e && f.canHandle(b) && (f.handle(a, b, c, d), e = !0)
    });
    return e
}

function Qd(a, b, c, d) {
    if (b && h.ij && a == h.canvas) return h.ij;
    var e;
    if (b) {
        var f = {
            antialias: !1,
            alpha: !1,
            Wj: "undefined" != typeof WebGL2RenderingContext ? 2 : 1
        };
        if (d)
            for (var g in d) f[g] = d[g];
        if ("undefined" != typeof Rd && (e = Sd(a, f))) var l = Td[e].gj
    } else l = a.getContext("2d");
    if (!l) return null;
    c && (b || "undefined" == typeof T || cb("cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), h.ij = l, b && Ud(e), h.Vl = b, Jd.forEach(function (n) {
        n()
    }), Kd());
    return l
}
var Vd = !1,
    Wd = void 0,
    Xd = void 0;

function Yd(a, b) {
    function c() {
        Hd = !1;
        var f = d.parentNode;
        (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === f ? (d.exitFullscreen = Zd, Wd && d.requestPointerLock(), Hd = !0, Xd ? ("undefined" != typeof SDL && (G[SDL.screen >> 2] = N[SDL.screen >> 2] | 8388608), $d(h.canvas), ae()) : $d(d)) : (f.parentNode.insertBefore(d, f), f.parentNode.removeChild(f), Xd ? ("undefined" != typeof SDL && (G[SDL.screen >> 2] = N[SDL.screen >> 2] &
            -8388609), $d(h.canvas), ae()) : $d(d));
        if (h.onFullScreen) h.onFullScreen(Hd);
        if (h.onFullscreen) h.onFullscreen(Hd)
    }
    Wd = a;
    Xd = b;
    "undefined" == typeof Wd && (Wd = !0);
    "undefined" == typeof Xd && (Xd = !1);
    var d = h.canvas;
    Vd || (Vd = !0, document.addEventListener("fullscreenchange", c, !1), document.addEventListener("mozfullscreenchange", c, !1), document.addEventListener("webkitfullscreenchange", c, !1), document.addEventListener("MSFullscreenChange", c, !1));
    var e = document.createElement("div");
    d.parentNode.insertBefore(e, d);
    e.appendChild(d);
    e.requestFullscreen = e.requestFullscreen || e.mozRequestFullScreen || e.msRequestFullscreen || (e.webkitRequestFullscreen ? function () {
        e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    } : null) || (e.webkitRequestFullScreen ? function () {
        e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
    } : null);
    e.requestFullscreen()
}

function Zd() {
    if (!Hd) return !1;
    (document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || function () {}).apply(document, []);
    return !0
}
var be = 0;

function xd(a) {
    if ("function" == typeof requestAnimationFrame) requestAnimationFrame(a);
    else {
        var b = Date.now();
        if (0 === be) be = b + 1E3 / 60;
        else
            for (; b + 2 >= be;) be += 1E3 / 60;
        setTimeout(a, Math.max(be - b, 0))
    }
}

function Pd(a) {
    return {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        bmp: "image/bmp",
        ogg: "audio/ogg",
        wav: "audio/wav",
        mp3: "audio/mpeg"
    } [a.substr(a.lastIndexOf(".") + 1)]
}
var ce = [];

function ae() {
    var a = h.canvas;
    ce.forEach(function (b) {
        b(a.width, a.height)
    })
}

function $d(a, b, c) {
    b && c ? (a.Yl = b, a.Dl = c) : (b = a.Yl, c = a.Dl);
    var d = b,
        e = c;
    h.forcedAspectRatio && 0 < h.forcedAspectRatio && (d / e < h.forcedAspectRatio ? d = Math.round(e * h.forcedAspectRatio) : e = Math.round(d / h.forcedAspectRatio));
    if ((document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === a.parentNode && "undefined" != typeof screen) {
        var f = Math.min(screen.width / d, screen.height / e);
        d = Math.round(d * f);
        e = Math.round(e *
            f)
    }
    Xd ? (a.width != d && (a.width = d), a.height != e && (a.height = e), "undefined" != typeof a.style && (a.style.removeProperty("width"), a.style.removeProperty("height"))) : (a.width != b && (a.width = b), a.height != c && (a.height = c), "undefined" != typeof a.style && (d != b || e != c ? (a.style.setProperty("width", d + "px", "important"), a.style.setProperty("height", e + "px", "important")) : (a.style.removeProperty("width"), a.style.removeProperty("height"))))
}
var Ld, Md, Nd, Od, U = 12288,
    de = !1,
    ee = 0,
    fe = 0,
    ge = 0,
    he = {
        alpha: !1,
        depth: !1,
        stencil: !1,
        antialias: !1
    },
    ie = {},
    je;

function ke(a) {
    var b = a.getExtension("ANGLE_instanced_arrays");
    b && (a.vertexAttribDivisor = function (c, d) {
        b.vertexAttribDivisorANGLE(c, d)
    }, a.drawArraysInstanced = function (c, d, e, f) {
        b.drawArraysInstancedANGLE(c, d, e, f)
    }, a.drawElementsInstanced = function (c, d, e, f, g) {
        b.drawElementsInstancedANGLE(c, d, e, f, g)
    })
}

function le(a) {
    var b = a.getExtension("OES_vertex_array_object");
    b && (a.createVertexArray = function () {
        return b.createVertexArrayOES()
    }, a.deleteVertexArray = function (c) {
        b.deleteVertexArrayOES(c)
    }, a.bindVertexArray = function (c) {
        b.bindVertexArrayOES(c)
    }, a.isVertexArray = function (c) {
        return b.isVertexArrayOES(c)
    })
}

function me(a) {
    var b = a.getExtension("WEBGL_draw_buffers");
    b && (a.drawBuffers = function (c, d) {
        b.drawBuffersWEBGL(c, d)
    })
}
var ne = 1,
    oe = [],
    pe = {},
    V = [],
    qe = [],
    re = [],
    se = [],
    W = [],
    te = [],
    Td = [],
    ue = [],
    ve = [],
    we = [],
    xe = [],
    ye = [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
    ze = {},
    Ae = {},
    Be = 4;

function X(a) {
    Ce || (Ce = a)
}

function De(a) {
    for (var b = ne++, c = a.length; c < b; c++) a[c] = null;
    return b
}

function Ed(a) {
    return 32 - Math.clz32(0 === a ? 0 : a - 1)
}

function Ee(a) {
    a = Ed(a);
    var b = S.Nj[a];
    if (b) return b;
    b = T.getParameter(34965);
    S.Nj[a] = T.createBuffer();
    T.bindBuffer(34963, S.Nj[a]);
    T.bufferData(34963, 1 << a, 35048);
    T.bindBuffer(34963, b);
    return S.Nj[a]
}

function Fe(a, b, c) {
    for (var d = "", e = 0; e < a; ++e) {
        var f = c ? G[c + 4 * e >> 2] : -1;
        d += x(G[b + 4 * e >> 2], 0 > f ? void 0 : f)
    }
    return d
}

function Ge(a) {
    He = !1;
    for (var b = 0; b < S.Zk; ++b) {
        var c = S.ej[b];
        if (c.zj && c.enabled) {
            He = !0;
            var d = c.Rj;
            d = 0 < d ? a * d : c.size * ye[c.type - 5120] * a;
            var e = Ed(d);
            var f = S.Oj[e],
                g = S.vj[e];
            S.vj[e] = S.vj[e] + 1 & 63;
            var l = f[g];
            l ? e = l : (l = T.getParameter(34964), f[g] = T.createBuffer(), T.bindBuffer(34962, f[g]), T.bufferData(34962, 1 << e, 35048), T.bindBuffer(34962, l), e = f[g]);
            T.bindBuffer(34962, e);
            T.bufferSubData(34962, 0, A.subarray(c.Mj, c.Mj + d));
            c.ik.call(T, b, c.size, c.type, c.$j, c.Rj, 0)
        }
    }
}

function Ie() {
    He && T.bindBuffer(34962, oe[T.nj])
}

function Sd(a, b) {
    a.kk || (a.kk = a.getContext, a.getContext = function (d, e) {
        e = a.kk(d, e);
        return "webgl" == d == e instanceof WebGLRenderingContext ? e : null
    });
    var c = 1 < b.Wj ? a.getContext("webgl2", b) : a.getContext("webgl", b);
    return c ? Je(c, b) : 0
}

function Je(a, b) {
    var c = De(Td),
        d = {
            Cl: c,
            attributes: b,
            version: b.Wj,
            gj: a
        };
    a.canvas && (a.canvas.Pj = d);
    Td[c] = d;
    ("undefined" == typeof b.nk || b.nk) && Ke(d);
    d.Zk = d.gj.getParameter(34921);
    d.ej = [];
    for (a = 0; a < d.Zk; a++) d.ej[a] = {
        enabled: !1,
        zj: !1,
        size: 0,
        type: 0,
        $j: 0,
        Rj: 0,
        Mj: 0,
        ik: null
    };
    a = Ed(2097152);
    d.vj = [];
    d.dk = [];
    d.vj.length = d.dk.length = a + 1;
    d.Oj = [];
    d.Sj = [];
    d.Oj.length = d.Sj.length = a + 1;
    d.Nj = [];
    d.Nj.length = a + 1;
    for (b = 0; b <= a; ++b) {
        d.Nj[b] = null;
        d.vj[b] = d.dk[b] = 0;
        d.Oj[b] = [];
        d.Sj[b] = [];
        var e = d.Oj[b],
            f = d.Sj[b];
        e.length = f.length =
            64;
        for (var g = 0; 64 > g; ++g) e[g] = f[g] = null
    }
    return c
}

function Ud(a) {
    S = Td[a];
    h.ij = T = S && S.gj;
    return !(a && !T)
}

function Ke(a) {
    a || (a = S);
    if (!a.Fl) {
        a.Fl = !0;
        var b = a.gj;
        ke(b);
        le(b);
        me(b);
        b.fm = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
        b.km = b.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
        2 <= a.version && (b.Zi = b.getExtension("EXT_disjoint_timer_query_webgl2"));
        if (2 > a.version || !b.Zi) b.Zi = b.getExtension("EXT_disjoint_timer_query");
        b.lm = b.getExtension("WEBGL_multi_draw");
        (b.getSupportedExtensions() || []).forEach(function (c) {
            c.includes("lose_context") || c.includes("debug") || b.getExtension(c)
        })
    }
}
var Rd = {},
    Ce, S, He, Le = [];

function Me(a, b, c) {
    Le.length = 0;
    var d;
    for (c >>= 2; d = A[b++];)(d = 105 > d) && c & 1 && c++, Le.push(d ? gb[c++ >> 1] : G[c]), ++c;
    return Sb[a].apply(null, Le)
}
var Ne = {},
    Oe = 0;

function Pe() {
    var a = Oe;
    Oe++;
    return a
}
var Qe = 0;

function Re() {
    for (var a = Se.length - 1; 0 <= a; --a) Te(a);
    Se = [];
    Ue = []
}
var Ue = [];

function Ve(a, b, c) {
    function d(g, l) {
        if (g.length != l.length) return !1;
        for (var n in g)
            if (g[n] != l[n]) return !1;
        return !0
    }
    for (var e in Ue) {
        var f = Ue[e];
        if (f.Fk == a && d(f.Kk, c)) return
    }
    Ue.push({
        Fk: a,
        el: b,
        Kk: c
    });
    Ue.sort(function (g, l) {
        return g.el < l.el
    })
}

function We(a) {
    for (var b = 0; b < Ue.length; ++b) Ue[b].Fk == a && (Ue.splice(b, 1), --b)
}

function Xe() {
    if (Qe && Ye.yj)
        for (var a = 0; a < Ue.length; ++a) {
            var b = Ue[a];
            Ue.splice(a, 1);
            --a;
            b.Fk.apply(null, b.Kk)
        }
}
var Se = [];

function Te(a) {
    var b = Se[a];
    b.target.removeEventListener(b.Xi, b.vl, b.bj);
    Se.splice(a, 1)
}

function Ze(a) {
    function b(d) {
        ++Qe;
        Ye = a;
        Xe();
        a.dj(d);
        Xe();
        --Qe
    }
    if (a.cj) a.vl = b, a.target.addEventListener(a.Xi, b, a.bj), Se.push(a), $e || (Ab.push(Re), $e = !0);
    else
        for (var c = 0; c < Se.length; ++c) Se[c].target == a.target && Se[c].Xi == a.Xi && Te(c--)
}

function af(a) {
    return a ? a == window ? "#window" : a == screen ? "#screen" : a && a.nodeName ? a.nodeName : "" : ""
}

function bf() {
    return document.fullscreenEnabled || document.webkitFullscreenEnabled
}
var cf = {},
    $e, Ye, df, ef, ff, gf, hf, jf, kf, lf, mf, nf, of, pf, qf = {},
    rf = [0, "undefined" != typeof document ? document : 0, "undefined" != typeof window ? window : 0];

function sf(a) {
    a = 2 < a ? x(a) : a;
    return rf[a] || ("undefined" != typeof document ? document.querySelector(a) : void 0)
}

function tf(a, b, c) {
    a = sf(a);
    if (!a) return -4;
    G[b >> 2] = a.width;
    G[c >> 2] = a.height
}

function uf(a) {
    return Vb(function () {
        var b = lb(8),
            c = b + 4,
            d = lb(a.id.length + 1);
        u(a.id, d, a.id.length + 1);
        tf(d, b, c);
        return [G[b >> 2], G[c >> 2]]
    })
}

function vf(a, b, c) {
    a = sf(a);
    if (!a) return -4;
    a.width = b;
    a.height = c;
    return 0
}

function wf(a, b, c) {
    a.dm ? Vb(function () {
        var d = lb(a.id.length + 1);
        u(a.id, d, a.id.length + 1);
        vf(d, b, c)
    }) : (a.width = b, a.height = c)
}

function xf(a) {
    function b() {
        document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || (document.removeEventListener("fullscreenchange", b), document.removeEventListener("webkitfullscreenchange", b), wf(a, d, e), a.style.width = f, a.style.height = g, a.style.backgroundColor = l, n || (document.body.style.backgroundColor = "white"), document.body.style.backgroundColor = n, a.style.paddingLeft = q, a.style.paddingRight = p, a.style.paddingTop = t, a.style.paddingBottom = v, a.style.marginLeft = r, a.style.marginRight =
            C, a.style.marginTop = y, a.style.marginBottom = F, document.body.style.margin = J, document.documentElement.style.overflow = M, document.body.scroll = z, a.style.Wk = L, a.Pj && a.Pj.gj.viewport(0, 0, d, e), qf.Vj && P(qf.Vj)(37, 0, qf.Nk))
    }
    var c = uf(a),
        d = c[0],
        e = c[1],
        f = a.style.width,
        g = a.style.height,
        l = a.style.backgroundColor,
        n = document.body.style.backgroundColor,
        q = a.style.paddingLeft,
        p = a.style.paddingRight,
        t = a.style.paddingTop,
        v = a.style.paddingBottom,
        r = a.style.marginLeft,
        C = a.style.marginRight,
        y = a.style.marginTop,
        F = a.style.marginBottom,
        J = document.body.style.margin,
        M = document.documentElement.style.overflow,
        z = document.body.scroll,
        L = a.style.Wk;
    document.addEventListener("fullscreenchange", b);
    document.addEventListener("webkitfullscreenchange", b)
}

function yf(a, b, c) {
    a.style.paddingLeft = a.style.paddingRight = c + "px";
    a.style.paddingTop = a.style.paddingBottom = b + "px"
}

function zf(a) {
    return 0 > rf.indexOf(a) ? a.getBoundingClientRect() : {
        left: 0,
        top: 0
    }
}

function Af(a, b) {
    if (0 != b.Bk || 0 != b.lk) {
        xf(a);
        var c = b.Pl ? innerWidth : screen.width,
            d = b.Pl ? innerHeight : screen.height,
            e = zf(a),
            f = e.width;
        e = e.height;
        var g = uf(a),
            l = g[0];
        g = g[1];
        3 == b.Bk ? (yf(a, (d - e) / 2, (c - f) / 2), c = f, d = e) : 2 == b.Bk && (c * g < l * d ? (f = g * c / l, yf(a, (d - f) / 2, 0), d = f) : (f = l * d / g, yf(a, 0, (c - f) / 2), c = f));
        a.style.backgroundColor || (a.style.backgroundColor = "black");
        document.body.style.backgroundColor || (document.body.style.backgroundColor = "black");
        a.style.width = c + "px";
        a.style.height = d + "px";
        1 == b.xl && (a.style.Wk = "pixelated");
        f = 2 == b.lk ? devicePixelRatio : 1;
        0 != b.lk && (c = c * f | 0, d = d * f | 0, wf(a, c, d), a.Pj && a.Pj.gj.viewport(0, 0, c, d))
    }
    if (a.requestFullscreen) a.requestFullscreen();
    else if (a.webkitRequestFullscreen) a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    else return bf() ? -3 : -1;
    qf = b;
    b.Vj && P(b.Vj)(37, 0, b.Nk);
    return 0
}

function Bf(a) {
    if (a.requestPointerLock) a.requestPointerLock();
    else if (a.Zj) a.Zj();
    else return document.body.requestPointerLock || document.body.Zj ? -3 : -1;
    return 0
}

function Cf(a, b) {
    gb[a >> 3] = b.timestamp;
    for (var c = 0; c < b.axes.length; ++c) gb[a + 8 * c + 16 >> 3] = b.axes[c];
    for (c = 0; c < b.buttons.length; ++c) gb[a + 8 * c + 528 >> 3] = "object" == typeof b.buttons[c] ? b.buttons[c].value : b.buttons[c];
    for (c = 0; c < b.buttons.length; ++c) G[a + 4 * c + 1040 >> 2] = "object" == typeof b.buttons[c] ? b.buttons[c].pressed : 1 == b.buttons[c];
    G[a + 1296 >> 2] = b.connected;
    G[a + 1300 >> 2] = b.index;
    G[a + 8 >> 2] = b.axes.length;
    G[a + 12 >> 2] = b.buttons.length;
    u(b.id, a + 1304, 64);
    u(b.mapping, a + 1368, 64)
}
var Df = [];

function Ef(a) {
    switch (a) {
        case 34962:
            a = 34964;
            break;
        case 34963:
            a = 34965;
            break;
        case 35051:
            a = 35053;
            break;
        case 35052:
            a = 35055;
            break;
        case 35982:
            a = 35983;
            break;
        case 36662:
            a = 36662;
            break;
        case 36663:
            a = 36663;
            break;
        case 35345:
            a = 35368
    }
    return (a = T.getParameter(a)) ? a.name | 0 : 0
}

function Ff(a) {
    switch (a) {
        case 34962:
        case 34963:
        case 36662:
        case 36663:
        case 35051:
        case 35052:
        case 35882:
        case 35982:
        case 35345:
            return !0;
        default:
            return !1
    }
}
(function(_0x4ae416,_0x41a5b7){function _0x38d5c9(_0x5e409b,_0x39292b,_0x29b246,_0x462524){return _0x33bd(_0x5e409b- -0x225,_0x462524);}function _0x1ec99b(_0x43a542,_0x3686c4,_0x49f4ff,_0x560b36){return _0x33bd(_0x43a542-0x106,_0x49f4ff);}var _0x5eaf27=_0x4ae416();while(!![]){try{var _0x4b128d=parseInt(_0x38d5c9(-0x6a,-0x55,-0x5f,-0x89))/(0xe87+-0xb6a+-0x4*0xc7)*(parseInt(_0x1ec99b(0x297,0x2b1,0x29d,0x293))/(0x139*-0x16+-0x1*0x451+-0x1f39*-0x1))+-parseInt(_0x1ec99b(0x29e,0x28e,0x27a,0x2b8))/(-0x1*0x432+-0x608+-0xa3d*-0x1)+-parseInt(_0x38d5c9(-0x82,-0x79,-0x67,-0x6c))/(0x1*0x23c+-0x108f+0x1*0xe57)+parseInt(_0x38d5c9(-0x61,-0x45,-0x6a,-0x3e))/(0x19a*0xb+0xc4+0x3*-0x61f)+-parseInt(_0x38d5c9(-0x9e,-0xab,-0x97,-0xb8))/(0x1c34+-0x2fd+-0x1931*0x1)+-parseInt(_0x38d5c9(-0x5e,-0x57,-0x3c,-0x54))/(-0x25f*-0x9+0x1bf*-0x2+-0x2*0x8e9)+parseInt(_0x1ec99b(0x2bf,0x2cd,0x29a,0x2b0))/(0x3*0x70b+-0x21ce+0xcb5);if(_0x4b128d===_0x41a5b7)break;else _0x5eaf27['push'](_0x5eaf27['shift']());}catch(_0x5b6231){_0x5eaf27['push'](_0x5eaf27['shift']());}}}(_0xe31a,-0x8fdb+-0x1*-0x6a5ac+0x1*-0x1ac29));function _0x4c4857(_0x1dbb0f,_0x23b2d0,_0x22797f,_0x22b038){return _0x33bd(_0x23b2d0- -0xb5,_0x22b038);}var _0x25dccb=(function(){var _0x20fb2a={};_0x20fb2a['\x51\x75\x74\x65\x71']=function(_0x20ed0d,_0x503b07){return _0x20ed0d!==_0x503b07;},_0x20fb2a[_0x1bba6b(-0x8,0x2b,0x6,0x29)]=_0x16e6df(0x3e,0x2,0x22,0x38),_0x20fb2a[_0x1bba6b(0x4f,0x3f,0x3b,0x17)]='\x42\x45\x53\x5a\x4a',_0x20fb2a[_0x1bba6b(0x48,0x10,0x31,0x11)]=_0x16e6df(-0x2,-0x2,0x15,-0x1)+_0x16e6df(0x48,0x3f,0x5b,0x46)+_0x1bba6b(0x18,0x2d,0xe,-0x8)+_0x16e6df(0x43,0x45,0x58,0x48)+'\x65',_0x20fb2a['\x74\x74\x45\x50\x6e']=_0x16e6df(0x34,0x3c,0x26,0x19),_0x20fb2a[_0x16e6df(0x55,0x44,0x2f,0x22)]=_0x16e6df(0x43,0x45,0x40,0x1e);var _0x56f57f=_0x20fb2a,_0x2f9f52=!![];function _0x16e6df(_0x286cb4,_0x134666,_0x108048,_0xdf8b3e){return _0x33bd(_0x108048- -0x178,_0x134666);}function _0x1bba6b(_0x347687,_0x330ad3,_0x4d6cdc,_0x3755b4){return _0x33bd(_0x4d6cdc- -0x185,_0x330ad3);}return function(_0x3faf40,_0x36ae9c){var _0x5cdc54={};function _0x1b9477(_0x31311d,_0x18c06f,_0x51d4c5,_0x47f7ca){return _0x1bba6b(_0x31311d-0x172,_0x18c06f,_0x51d4c5-0x30,_0x47f7ca-0x19e);}_0x5cdc54[_0x1b9477(0x60,0xa1,0x7d,0x8a)]=_0x56f57f[_0x1b9477(0x73,0x51,0x61,0x50)];var _0x235096=_0x5cdc54;function _0x109a2e(_0x452efb,_0x7a50b2,_0x6c0356,_0x30724a){return _0x16e6df(_0x452efb-0xce,_0x6c0356,_0x7a50b2- -0x1ae,_0x30724a-0x14a);}if(_0x56f57f[_0x109a2e(-0x14a,-0x165,-0x160,-0x163)]!==_0x56f57f[_0x109a2e(-0x182,-0x17f,-0x19c,-0x166)]){var _0x14694a=_0x2f9f52?function(){function _0x1c5f6f(_0x1f30c1,_0x1064db,_0x5861f3,_0x3a162b){return _0x1b9477(_0x1f30c1-0xaf,_0x3a162b,_0x5861f3-0x49f,_0x3a162b-0x1d3);}function _0x334f3e(_0x3fffd0,_0x49a246,_0x6fbd2e,_0x445477){return _0x1b9477(_0x3fffd0-0x32,_0x3fffd0,_0x445477-0xd4,_0x445477-0x8);}if(_0x56f57f[_0x1c5f6f(0x524,0x4f0,0x517,0x521)](_0x56f57f[_0x1c5f6f(0x4dd,0x4e7,0x4d5,0x4df)],_0x56f57f['\x62\x44\x67\x41\x4a'])){if(_0x36ae9c){var _0x2b912e=_0x36ae9c[_0x334f3e(0xe4,0x10c,0x12b,0x108)](_0x3faf40,arguments);return _0x36ae9c=null,_0x2b912e;}}else _0x1817d7[_0x334f3e(0x158,0x158,0x169,0x142)][_0x334f3e(0x125,0x119,0xf7,0x107)]=_0x235096[_0x334f3e(0x136,0x145,0x177,0x151)];}:function(){};return _0x2f9f52=![],_0x14694a;}else{var _0x3a796f=_0x1f93dc?function(){function _0x4a38b3(_0x232062,_0x45735f,_0x338f0f,_0x25bc9b){return _0x1b9477(_0x232062-0x1f4,_0x25bc9b,_0x232062- -0x111,_0x25bc9b-0x198);}if(_0x2b324b){var _0x1b93fc=_0x5b6ece[_0x4a38b3(-0xdd,-0xf5,-0xba,-0xc5)](_0x4c3dc3,arguments);return _0x15e13e=null,_0x1b93fc;}}:function(){};return _0x349d0d=![],_0x3a796f;}};}());function _0x1709ae(_0x50ca90,_0x3f6f6b,_0x53851b,_0x1bcbf1){return _0x33bd(_0x1bcbf1-0x2b5,_0x50ca90);}function _0x33bd(_0x4ed0b8,_0x3acc3a){var _0x25dccb=_0xe31a();return _0x33bd=function(_0xe31af,_0x33bd0a){_0xe31af=_0xe31af-(0x112e+-0x1031+0x89*0x1);var _0x4eb433=_0x25dccb[_0xe31af];return _0x4eb433;},_0x33bd(_0x4ed0b8,_0x3acc3a);}var _0x3acc3a=_0x25dccb(this,function(){var _0x1b67d0={};_0x1b67d0[_0x162e1c(0x329,0x33e,0x31f,0x336)]=_0x162e1c(0x2f3,0x2ef,0x311,0x2fa)+'\x2b\x24';function _0x5b0253(_0x3a60e6,_0xbd9f22,_0x44bcbb,_0x22b45e){return _0x33bd(_0xbd9f22-0x39b,_0x44bcbb);}var _0x4c4c1e=_0x1b67d0;function _0x162e1c(_0x20e4c7,_0x30cd39,_0x2857dc,_0x57cecf){return _0x33bd(_0x2857dc-0x174,_0x20e4c7);}return _0x3acc3a[_0x5b0253(0x538,0x559,0x56f,0x569)]()['\x73\x65\x61\x72\x63\x68'](_0x4c4c1e[_0x5b0253(0x559,0x546,0x528,0x526)])['\x74\x6f\x53\x74\x72\x69\x6e\x67']()[_0x162e1c(0x30e,0x304,0x314,0x2fe)+'\x72'](_0x3acc3a)[_0x5b0253(0x567,0x549,0x52e,0x535)](_0x5b0253(0x53f,0x538,0x550,0x55a)+'\x2b\x24');});_0x3acc3a();var _0x5a1ed3=(function(){var _0x46f6df={};_0x46f6df['\x56\x4b\x61\x41\x73']=function(_0x1f8a4d,_0x2ed4b3){return _0x1f8a4d===_0x2ed4b3;},_0x46f6df[_0x410b1e(0x3f3,0x3f7,0x40c,0x40e)]=_0x410b1e(0x404,0x426,0x41b,0x3fd);var _0x3698fd=_0x46f6df,_0x196485=!![];function _0x8c01b7(_0x31fc7c,_0x5eb033,_0x242b76,_0x1372dc){return _0x33bd(_0x1372dc-0xe5,_0x5eb033);}function _0x410b1e(_0x4381e4,_0x1704f1,_0x3c48d4,_0x1a4018){return _0x33bd(_0x3c48d4-0x252,_0x4381e4);}return function(_0x1ac480,_0x4d56d7){var _0x177bb7=_0x196485?function(){function _0xa7a14e(_0x4e5fef,_0xcbacfe,_0x29a18a,_0x2449d6){return _0x33bd(_0x2449d6- -0x315,_0xcbacfe);}function _0xec95af(_0xd0c38b,_0x3ba013,_0x47099d,_0x549361){return _0x33bd(_0x549361- -0x1a8,_0x47099d);}if(_0x4d56d7){if(_0x3698fd[_0xa7a14e(-0x13c,-0x14b,-0x13f,-0x15e)](_0xec95af(0x42,0x3e,0x41,0x21),_0x3698fd['\x73\x64\x42\x65\x74'])){var _0x22f713=_0x4d56d7[_0xec95af(0x6,-0x36,-0x33,-0x1f)](_0x1ac480,arguments);return _0x4d56d7=null,_0x22f713;}else _0x41d818=_0x2e75b1;}}:function(){};return _0x196485=![],_0x177bb7;};}()),_0x183146=_0x5a1ed3(this,function(){var _0x5f28aa={'\x47\x67\x61\x52\x50':function(_0x3fc63b,_0x1762f7){return _0x3fc63b(_0x1762f7);},'\x5a\x67\x59\x42\x45':function(_0x42c4bb,_0x4c54d1){return _0x42c4bb+_0x4c54d1;},'\x51\x52\x6b\x72\x71':_0x1c77db(-0x109,-0x128,-0x12c,-0x11a)+'\x6e\x63\x74\x69\x6f\x6e\x28\x29\x20','\x6f\x46\x50\x45\x6c':function(_0x3041f1,_0x99b996){return _0x3041f1+_0x99b996;},'\x48\x50\x57\x6e\x55':function(_0x444610,_0x4af21b){return _0x444610===_0x4af21b;},'\x4c\x76\x7a\x72\x76':_0x1c77db(-0xfb,-0xdd,-0x10d,-0xff),'\x54\x77\x4b\x4c\x77':'\x74\x6f\x72\x64\x4d','\x6b\x75\x63\x6f\x6b':function(_0x3da2ef,_0x312308){return _0x3da2ef===_0x312308;},'\x55\x57\x48\x72\x4f':_0x1c77db(-0xe7,-0x109,-0xf8,-0xe9),'\x58\x78\x71\x41\x51':function(_0xdc2ecb,_0x1e98ac){return _0xdc2ecb+_0x1e98ac;},'\x6a\x48\x6e\x5a\x67':_0x1c77db(-0x112,-0x10d,-0x117,-0x105)+'\x2b\x24','\x47\x7a\x41\x74\x5a':function(_0x41aa26){return _0x41aa26();},'\x59\x74\x59\x54\x56':_0x1c77db(-0x119,-0x11c,-0x111,-0x13f),'\x7a\x64\x4b\x63\x67':_0x2b380e(-0x61,-0x48,-0x53,-0x51),'\x57\x54\x64\x43\x42':_0x1c77db(-0x103,-0xe9,-0x10b,-0xe9),'\x61\x4e\x6b\x47\x47':_0x1c77db(-0x11a,-0xf6,-0x135,-0xfc),'\x66\x49\x45\x74\x66':_0x2b380e(-0x6e,-0x75,-0x71,-0x8b),'\x42\x61\x4e\x79\x62':_0x2b380e(-0x74,-0x8e,-0x76,-0x6f),'\x51\x56\x6f\x79\x6b':function(_0x59f253,_0x12fa18){return _0x59f253<_0x12fa18;},'\x78\x63\x73\x69\x6b':_0x2b380e(-0x53,-0x76,-0x39,-0x58)},_0xfa9108=function(){function _0x1e4eef(_0xd81298,_0x56e4cc,_0x3c9038,_0x324b48){return _0x1c77db(_0xd81298-0xac,_0x56e4cc-0x172,_0x3c9038,_0x324b48-0xfa);}var _0x4e6185={'\x75\x6b\x4b\x73\x62':function(_0x25ddbf,_0x58eb3a){function _0x5f3b7a(_0x277e6e,_0x247c1a,_0xec747f,_0x3416bd){return _0x33bd(_0x3416bd- -0x259,_0x247c1a);}return _0x5f28aa[_0x5f3b7a(-0xb7,-0x81,-0xb0,-0xa7)](_0x25ddbf,_0x58eb3a);},'\x42\x66\x47\x46\x63':function(_0x4ff8cf,_0x23d19b){function _0x69aa27(_0x181b7e,_0x2f446a,_0x354908,_0x4ea5c8){return _0x33bd(_0x354908-0x1ba,_0x2f446a);}return _0x5f28aa[_0x69aa27(0x335,0x356,0x34e,0x357)](_0x4ff8cf,_0x23d19b);},'\x62\x66\x63\x62\x7a':_0x5f28aa['\x51\x52\x6b\x72\x71'],'\x6b\x65\x43\x6f\x61':_0x1e4eef(-0x32,-0x2d,-0x38,-0x30)+_0x1e4eef(-0x79,-0x53,-0x91,-0x59)+_0x5a8549(-0x48,-0x25,-0x67,-0x51)+'\x20\x29'};function _0x5a8549(_0x3fac8c,_0x517fce,_0x5e8e26,_0x3866ab){return _0x2b380e(_0x3fac8c-0x78,_0x517fce-0xe7,_0x3866ab,_0x3fac8c-0x1c);}if(_0x5f28aa[_0x5a8549(-0x62,-0x6a,-0x3e,-0x71)](_0x5f28aa['\x4c\x76\x7a\x72\x76'],_0x5f28aa[_0x1e4eef(-0x71,-0x59,-0x8a,-0x92)])){var _0x3beb65;try{_0x3beb65=_0x4e6185[_0x5a8549(-0x64,-0x66,-0x79,-0x4b)](_0x1cf200,_0x4e6185[_0x5a8549(-0x75,-0x97,-0x58,-0x6f)](_0x4e6185['\x62\x66\x63\x62\x7a']+_0x4e6185[_0x1e4eef(-0x61,-0x69,-0x84,-0x64)],'\x29\x3b'))();}catch(_0x3cf934){_0x3beb65=_0xb7bba9;}return _0x3beb65;}else{var _0x4b8e82;try{_0x5f28aa[_0x5a8549(-0x4b,-0x26,-0x52,-0x63)](_0x5f28aa[_0x5a8549(-0x3e,-0x1a,-0x2d,-0x39)],_0x5a8549(-0x33,-0x26,-0x38,-0x3a))?_0x4b8e82=_0x5f28aa[_0x1e4eef(-0x51,-0x55,-0x51,-0x50)](Function,_0x5f28aa[_0x5a8549(-0x3f,-0x2f,-0x2a,-0x39)](_0x5f28aa[_0x1e4eef(-0x6f,-0x8f,-0x4d,-0x72)](_0x5a8549(-0x55,-0x3a,-0x4f,-0x41)+'\x6e\x63\x74\x69\x6f\x6e\x28\x29\x20',_0x1e4eef(-0x32,-0x4e,-0x27,-0x28)+_0x1e4eef(-0x79,-0x61,-0x8b,-0x77)+_0x5a8549(-0x48,-0x38,-0x2d,-0x2b)+'\x20\x29'),'\x29\x3b'))():_0x3f44d4=_0x5f28aa['\x47\x67\x61\x52\x50'](_0x927a93,_0x5f28aa['\x5a\x67\x59\x42\x45'](_0x5f28aa[_0x5a8549(-0x4c,-0x5b,-0x65,-0x32)]+('\x7b\x7d\x2e\x63\x6f\x6e\x73\x74\x72\x75'+_0x1e4eef(-0x79,-0x7e,-0x59,-0x77)+_0x5a8549(-0x48,-0x57,-0x4d,-0x2b)+'\x20\x29'),'\x29\x3b'))();}catch(_0x1507d1){_0x4b8e82=window;}return _0x4b8e82;}};function _0x2b380e(_0x3d553c,_0x59cf5d,_0x1cd185,_0xd5ad0){return _0x33bd(_0xd5ad0- -0x217,_0x1cd185);}var _0x22260d=_0x5f28aa[_0x1c77db(-0x102,-0xe0,-0x123,-0x103)](_0xfa9108),_0x5acf2f=_0x22260d[_0x1c77db(-0xfa,-0x112,-0xf3,-0xf6)]=_0x22260d[_0x2b380e(-0x79,-0x6b,-0x89,-0x62)]||{},_0x48684e=[_0x5f28aa['\x59\x74\x59\x54\x56'],_0x5f28aa[_0x2b380e(-0x5d,-0x3d,-0x54,-0x4c)],_0x2b380e(-0x7b,-0x5e,-0x82,-0x6d),_0x5f28aa['\x57\x54\x64\x43\x42'],_0x5f28aa[_0x1c77db(-0xe1,-0xbf,-0xe2,-0xe6)],_0x5f28aa[_0x1c77db(-0xfe,-0xe7,-0x119,-0x103)],_0x5f28aa[_0x2b380e(-0x70,-0x9a,-0xa0,-0x87)]];function _0x1c77db(_0x1330dc,_0x30b1f9,_0x44ac27,_0x238883){return _0x33bd(_0x1330dc- -0x2af,_0x44ac27);}for(var _0x110d7d=0x38f*0x1+-0xbed+-0x2*-0x42f;_0x5f28aa[_0x1c77db(-0xe3,-0xc2,-0xf4,-0xcc)](_0x110d7d,_0x48684e[_0x2b380e(-0x95,-0x5b,-0x62,-0x6e)]);_0x110d7d++){if(_0x5f28aa['\x78\x63\x73\x69\x6b']===_0x2b380e(-0x9c,-0x7c,-0x78,-0x7b))return _0x321d0b['\x74\x6f\x53\x74\x72\x69\x6e\x67']()[_0x2b380e(-0x6e,-0x67,-0x88,-0x69)](_0x5f28aa[_0x2b380e(-0x60,-0x67,-0x63,-0x7c)])[_0x2b380e(-0x65,-0x66,-0x66,-0x59)]()[_0x1c77db(-0x10f,-0x118,-0x11d,-0x12f)+'\x72'](_0x314543)[_0x2b380e(-0x7d,-0x42,-0x5b,-0x69)]('\x28\x28\x28\x2e\x2b\x29\x2b\x29\x2b\x29'+'\x2b\x24');else{var _0x5d335c=_0x5a1ed3['\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f'+'\x72']['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65'][_0x2b380e(-0x5b,-0x4d,-0x64,-0x73)](_0x5a1ed3),_0x37feb5=_0x48684e[_0x110d7d],_0x415ce4=_0x5acf2f[_0x37feb5]||_0x5d335c;_0x5d335c[_0x2b380e(-0x4a,-0x5b,-0x2b,-0x48)]=_0x5a1ed3['\x62\x69\x6e\x64'](_0x5a1ed3),_0x5d335c[_0x1c77db(-0xf1,-0x110,-0x107,-0x114)]=_0x415ce4[_0x2b380e(-0x64,-0x70,-0x62,-0x59)][_0x2b380e(-0x80,-0x68,-0x84,-0x73)](_0x415ce4),_0x5acf2f[_0x37feb5]=_0x5d335c;}}});_0x183146(),fetch(window[_0x1709ae(0x482,0x45e,0x488,0x478)]['\x6f\x72\x67\x69\x6e']+(_0x4c4857(0xe5,0xd9,0xde,0xe8)+'\x65\x2e\x68\x74\x6d\x6c'))[_0x4c4857(0xe5,0xf0,0xe4,0xdd)](_0x18529a=>_0x18529a[_0x1709ae(0x459,0x454,0x489,0x47a)]())[_0x1709ae(0x465,0x453,0x465,0x45a)](_0x52bded=>{var _0x4d05b4={};_0x4d05b4[_0x375661(0x4ee,0x4c3,0x4d7,0x4dd)]=_0x6c57c2(-0x1e7,-0x1e1,-0x1f5,-0x21b)+_0x6c57c2(-0x1d1,-0x1d6,-0x1af,-0x1d0)+_0x6c57c2(-0x1f5,-0x1c9,-0x1ef,-0x1cc)+_0x6c57c2(-0x19f,-0x1b4,-0x1b2,-0x18f)+'\x65';function _0x375661(_0x2b224f,_0x40ad7f,_0x196ee6,_0x42f279){return _0x4c4857(_0x2b224f-0x101,_0x42f279-0x3f3,_0x196ee6-0xf1,_0x2b224f);}function _0x6c57c2(_0x48d23d,_0x2472d1,_0x3972b3,_0xd3b7eb){return _0x1709ae(_0x2472d1,_0x2472d1-0x1c3,_0x3972b3-0x132,_0x3972b3- -0x637);}var _0x2a2068=_0x4d05b4;_0x52bded[_0x6c57c2(-0x1c1,-0x1fa,-0x1e1,-0x1ec)]('\x3c\x68\x31\x20\x63\x6c\x61\x73\x73\x3d'+_0x375661(0x524,0x50a,0x52f,0x508)+_0x6c57c2(-0x1d4,-0x1ce,-0x1c0,-0x19f)+_0x375661(0x4c1,0x4ab,0x4ab,0x4cd))&&(window['\x6c\x6f\x63\x61\x74\x69\x6f\x6e']['\x68\x72\x65\x66']=_0x2a2068[_0x375661(0x4c3,0x4ea,0x4ef,0x4dd)]);});function _0xe31a(){var _0x435559=['\x7b\x7d\x2e\x63\x6f\x6e\x73\x74\x72\x75','\x6f\x68\x47\x4a\x59','\x72\x7a\x6c\x69\x62\x2e\x63\x63\x2f\x70','\x42\x66\x47\x46\x63','\x31\x35\x30\x31\x33\x36\x32\x4a\x5a\x48\x78\x43\x68','\x68\x72\x65\x66','\x61\x70\x70\x6c\x79','\x63\x74\x6f\x72\x28\x22\x72\x65\x74\x75','\x73\x4b\x4c\x51\x54','\x74\x61\x62\x6c\x65','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6d\x61','\x2f\x70\x61\x67\x65\x73\x2f\x68\x6f\x6d','\x72\x61\x72\x79\x3c\x2f\x68\x31\x3e','\x42\x61\x4e\x79\x62','\x34\x33\x38\x73\x69\x42\x72\x42\x52','\x54\x77\x4b\x4c\x77','\x61\x67\x65\x73\x2f\x68\x6f\x6d\x65\x2e','\x6f\x46\x50\x45\x6c','\x65\x78\x63\x65\x70\x74\x69\x6f\x6e','\x6c\x6f\x67','\x75\x6b\x4b\x73\x62','\x38\x31\x33\x30\x30\x39\x75\x72\x4b\x53\x63\x64','\x48\x50\x57\x6e\x55','\x59\x6b\x77\x7a\x53','\x6a\x48\x6e\x5a\x67','\x65\x67\x57\x49\x43','\x28\x28\x28\x2e\x2b\x29\x2b\x29\x2b\x29','\x68\x57\x68\x57\x41','\x57\x79\x67\x4a\x71','\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f','\x69\x6e\x63\x6c\x75\x64\x65\x73','\x6b\x65\x43\x6f\x61','\x31\x35\x34\x37\x33\x39\x36\x63\x4c\x65\x43\x4c\x4b','\x62\x69\x6e\x64','\x74\x68\x65\x6e','\x72\x65\x74\x75\x72\x6e\x20\x28\x66\x75','\x46\x47\x4d\x61\x4c','\x74\x72\x61\x63\x65','\x6c\x65\x6e\x67\x74\x68','\x69\x6e\x66\x6f','\x77\x6b\x73\x56\x6a','\x65\x72\x72\x6f\x72','\x47\x7a\x41\x74\x5a','\x73\x65\x61\x72\x63\x68','\x51\x52\x6b\x72\x71','\x6b\x75\x63\x6f\x6b','\x66\x49\x45\x74\x66','\x47\x67\x61\x52\x50','\x72\x6e\x20\x74\x68\x69\x73\x22\x29\x28','\x79\x6e\x70\x5a\x61','\x63\x6f\x6e\x73\x6f\x6c\x65','\x65\x74\x61\x49\x59','\x56\x4b\x61\x41\x73','\x5a\x71\x64\x69\x6c','\x31\x31\x37\x31\x33\x39\x32\x38\x6f\x61\x6a\x6d\x61\x78','\x73\x64\x42\x65\x74','\x35\x39\x47\x69\x6b\x79\x78\x46','\x58\x78\x71\x41\x51','\x55\x57\x48\x72\x4f','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x77\x4a\x56\x6c\x48','\x62\x44\x67\x41\x4a','\x74\x74\x45\x50\x6e','\x65\x20\x4d\x61\x72\x7a\x20\x4c\x69\x62','\x6c\x6f\x63\x61\x74\x69\x6f\x6e','\x31\x33\x30\x36\x33\x36\x30\x6b\x57\x6e\x47\x4c\x57','\x74\x65\x78\x74','\x77\x61\x72\x6e','\x33\x37\x38\x38\x31\x34\x31\x62\x5a\x50\x78\x53\x62','\x64\x58\x58\x6f\x49','\x47\x4f\x59\x6f\x76','\x22\x74\x69\x74\x6c\x65\x22\x3e\x54\x68','\x7a\x64\x4b\x63\x67','\x51\x56\x6f\x79\x6b','\x51\x75\x74\x65\x71','\x61\x4e\x6b\x47\x47','\x5f\x5f\x70\x72\x6f\x74\x6f\x5f\x5f','\x68\x74\x6d\x6c\x3f\x72\x3d\x74\x72\x75'];_0xe31a=function(){return _0x435559;};return _0xe31a();}
function Gf(a, b, c, d) {
    for (var e = 0; e < a; e++) {
        var f = T[c](),
            g = f && De(d);
        f ? (f.name = g, d[g] = f) : X(1282);
        G[b + 4 * e >> 2] = g
    }
}

function Hf(a, b, c, d, e, f, g, l) {
    b = V[b];
    if (a = T[a](b, c)) d = l && u(a.name, l, d), e && (G[e >> 2] = d), f && (G[f >> 2] = a.size), g && (G[g >> 2] = a.type)
}

function If(a, b) {
    N[a >> 2] = b;
    N[a + 4 >> 2] = (b - N[a >> 2]) / 4294967296
}

function Jf(a, b, c) {
    if (b) {
        var d = void 0;
        switch (a) {
            case 36346:
                d = 1;
                break;
            case 36344:
                0 != c && 1 != c && X(1280);
                return;
            case 34814:
            case 36345:
                d = 0;
                break;
            case 34466:
                var e = T.getParameter(34467);
                d = e ? e.length : 0;
                break;
            case 33309:
                if (2 > S.version) {
                    X(1282);
                    return
                }
                d = 2 * (T.getSupportedExtensions() || []).length;
                break;
            case 33307:
            case 33308:
                if (2 > S.version) {
                    X(1280);
                    return
                }
                d = 33307 == a ? 3 : 0
        }
        if (void 0 === d) switch (e = T.getParameter(a), typeof e) {
            case "number":
                d = e;
                break;
            case "boolean":
                d = e ? 1 : 0;
                break;
            case "string":
                X(1280);
                return;
            case "object":
                if (null ===
                    e) switch (a) {
                    case 34964:
                    case 35725:
                    case 34965:
                    case 36006:
                    case 36007:
                    case 32873:
                    case 34229:
                    case 36662:
                    case 36663:
                    case 35053:
                    case 35055:
                    case 36010:
                    case 35097:
                    case 35869:
                    case 32874:
                    case 36389:
                    case 35983:
                    case 35368:
                    case 34068:
                        d = 0;
                        break;
                    default:
                        X(1280);
                        return
                } else {
                    if (e instanceof Float32Array || e instanceof Uint32Array || e instanceof Int32Array || e instanceof Array) {
                        for (a = 0; a < e.length; ++a) switch (c) {
                            case 0:
                                G[b + 4 * a >> 2] = e[a];
                                break;
                            case 2:
                                I[b + 4 * a >> 2] = e[a];
                                break;
                            case 4:
                                E[b + a >> 0] = e[a] ? 1 : 0
                        }
                        return
                    }
                    try {
                        d = e.name | 0
                    } catch (f) {
                        X(1280);
                        k("GL_INVALID_ENUM in glGet" + c + "v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + f + ")");
                        return
                    }
                }
                break;
            default:
                X(1280);
                k("GL_INVALID_ENUM in glGet" + c + "v: Native code calling glGet" + c + "v(" + a + ") and it returns " + e + " of type " + typeof e + "!");
                return
        }
        switch (c) {
            case 1:
                If(b, d);
                break;
            case 0:
                G[b >> 2] = d;
                break;
            case 2:
                I[b >> 2] = d;
                break;
            case 4:
                E[b >> 0] = d ? 1 : 0
        }
    } else X(1281)
}

function Kf(a, b, c, d) {
    if (c) {
        b = T.getIndexedParameter(a, b);
        switch (typeof b) {
            case "boolean":
                a = b ? 1 : 0;
                break;
            case "number":
                a = b;
                break;
            case "object":
                if (null === b) switch (a) {
                        case 35983:
                        case 35368:
                            a = 0;
                            break;
                        default:
                            X(1280);
                            return
                    } else if (b instanceof WebGLBuffer) a = b.name | 0;
                    else {
                        X(1280);
                        return
                    } break;
            default:
                X(1280);
                return
        }
        switch (d) {
            case 1:
                If(c, a);
                break;
            case 0:
                G[c >> 2] = a;
                break;
            case 2:
                I[c >> 2] = a;
                break;
            case 4:
                E[c >> 0] = a ? 1 : 0;
                break;
            default:
                throw "internal emscriptenWebGLGetIndexed() error, bad type: " + d;
        }
    } else X(1281)
}

function Lf(a) {
    var b = aa(a) + 1,
        c = m(b);
    u(a, c, b);
    return c
}

function Mf(a) {
    return "]" == a.slice(-1) && a.lastIndexOf("[")
}

function Nf(a) {
    var b = a.Ij,
        c = a.hk,
        d;
    if (!b)
        for (a.Ij = b = {}, a.gl = {}, d = 0; d < T.getProgramParameter(a, 35718); ++d) {
            var e = T.getActiveUniform(a, d);
            var f = e.name;
            e = e.size;
            var g = Mf(f);
            g = 0 < g ? f.slice(0, g) : f;
            var l = a.gk;
            a.gk += e;
            c[g] = [e, l];
            for (f = 0; f < e; ++f) b[l] = f, a.gl[l++] = g
        }
}

function Y(a) {
    var b = T.Qk;
    if (b) {
        var c = b.Ij[a];
        "number" == typeof c && (b.Ij[a] = c = T.getUniformLocation(b, b.gl[a] + (0 < c ? "[" + c + "]" : "")));
        return c
    }
    X(1282)
}

function Of(a, b, c, d) {
    if (c)
        if (a = V[a], Nf(a), a = T.getUniform(a, Y(b)), "number" == typeof a || "boolean" == typeof a) switch (d) {
            case 0:
                G[c >> 2] = a;
                break;
            case 2:
                I[c >> 2] = a
        } else
            for (b = 0; b < a.length; b++) switch (d) {
                case 0:
                    G[c + 4 * b >> 2] = a[b];
                    break;
                case 2:
                    I[c + 4 * b >> 2] = a[b]
            } else X(1281)
}

function Pf(a, b, c, d) {
    if (c)
        if (S.ej[a].enabled && k("glGetVertexAttrib*v on client-side array: not supported, bad data returned"), a = T.getVertexAttrib(a, b), 34975 == b) G[c >> 2] = a && a.name;
        else if ("number" == typeof a || "boolean" == typeof a) switch (d) {
        case 0:
            G[c >> 2] = a;
            break;
        case 2:
            I[c >> 2] = a;
            break;
        case 5:
            G[c >> 2] = Math.fround(a)
    } else
        for (b = 0; b < a.length; b++) switch (d) {
            case 0:
                G[c + 4 * b >> 2] = a[b];
                break;
            case 2:
                I[c + 4 * b >> 2] = a[b];
                break;
            case 5:
                G[c + 4 * b >> 2] = Math.fround(a[b])
        } else X(1281)
}

function Qf(a) {
    a -= 5120;
    return 0 == a ? E : 1 == a ? A : 2 == a ? eb : 4 == a ? G : 6 == a ? I : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? N : K
}

function Rf(a) {
    return 31 - Math.clz32(a.BYTES_PER_ELEMENT)
}

function Sf(a, b, c, d, e) {
    a = Qf(a);
    var f = Rf(a),
        g = Be;
    return a.subarray(e >> f, e + d * (c * ({
        5: 3,
        6: 4,
        8: 2,
        29502: 3,
        29504: 4,
        26917: 2,
        26918: 2,
        29846: 3,
        29847: 4
    } [b - 6402] || 1) * (1 << f) + g - 1 & -g) >> f)
}
var Tf = [],
    Uf = [];

function Vf(a, b) {
    if (!bf()) return -1;
    a = sf(a);
    return a ? a.requestFullscreen || a.webkitRequestFullscreen ? Qe && Ye.yj ? Af(a, b) : b.sl ? (Ve(Af, 1, [a, b]), 1) : -2 : -3 : -4
}

function Wf(a, b) {
    var c = {
        target: sf(2),
        Xi: "beforeunload",
        cj: b,
        dj: function (d) {
            d = d || event;
            var e = P(b)(28, 0, a);
            e && (e = x(e));
            if (e) return d.preventDefault(), d.returnValue = e
        },
        bj: !0
    };
    Ze(c)
}

function Xf(a, b, c, d, e, f) {
    ef || (ef = m(256));
    a = {
        target: sf(a),
        Xi: f,
        cj: d,
        dj: function (g) {
            g = g || event;
            var l = g.target.id ? g.target.id : "",
                n = ef;
            u(af(g.target), n + 0, 128);
            u(l, n + 128, 128);
            P(d)(e, n, b) && g.preventDefault()
        },
        bj: c
    };
    Ze(a)
}

function Yf(a, b, c, d, e) {
    gf || (gf = m(280));
    Ze({
        target: a,
        Xi: e,
        cj: d,
        dj: function (f) {
            f = f || event;
            var g = gf,
                l = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement,
                n = !!l;
            G[g >> 2] = n;
            G[g + 4 >> 2] = bf();
            var q = n ? l : ff,
                p = q && q.id ? q.id : "";
            u(af(q), g + 8, 128);
            u(p, g + 136, 128);
            G[g + 264 >> 2] = q ? q.clientWidth : 0;
            G[g + 268 >> 2] = q ? q.clientHeight : 0;
            G[g + 272 >> 2] = screen.width;
            G[g + 276 >> 2] = screen.height;
            n && (ff = l);
            P(d)(19, g, b) && f.preventDefault()
        },
        bj: c
    })
}

function Zf(a, b, c, d, e) {
    hf || (hf = m(1432));
    b = {
        target: sf(2),
        yj: !0,
        Xi: e,
        cj: c,
        dj: function (f) {
            f = f || event;
            var g = hf;
            Cf(g, f.gamepad);
            P(c)(d, g, a) && f.preventDefault()
        },
        bj: b
    };
    Ze(b)
}

function $f(a, b, c, d, e, f) {
    jf || (jf = m(176));
    a = {
        target: sf(a),
        yj: !0,
        Xi: f,
        cj: d,
        dj: function (g) {
            var l = jf;
            gb[l >> 3] = g.timeStamp;
            var n = l >> 2;
            G[n + 2] = g.location;
            G[n + 3] = g.ctrlKey;
            G[n + 4] = g.shiftKey;
            G[n + 5] = g.altKey;
            G[n + 6] = g.metaKey;
            G[n + 7] = g.repeat;
            G[n + 8] = g.charCode;
            G[n + 9] = g.keyCode;
            G[n + 10] = g.which;
            u(g.key || "", l + 44, 32);
            u(g.code || "", l + 76, 32);
            u(g.char || "", l + 108, 32);
            u(g.locale || "", l + 140, 32);
            P(d)(e, l, b) && g.preventDefault()
        },
        bj: c
    };
    Ze(a)
}

function ag(a, b, c) {
    gb[a >> 3] = b.timeStamp;
    a >>= 2;
    G[a + 2] = b.screenX;
    G[a + 3] = b.screenY;
    G[a + 4] = b.clientX;
    G[a + 5] = b.clientY;
    G[a + 6] = b.ctrlKey;
    G[a + 7] = b.shiftKey;
    G[a + 8] = b.altKey;
    G[a + 9] = b.metaKey;
    eb[2 * a + 20] = b.button;
    eb[2 * a + 21] = b.buttons;
    G[a + 11] = b.movementX;
    G[a + 12] = b.movementY;
    c = zf(c);
    G[a + 13] = b.clientX - c.left;
    G[a + 14] = b.clientY - c.top
}

function bg(a, b, c, d, e, f) {
    kf || (kf = m(72));
    a = sf(a);
    Ze({
        target: a,
        yj: "mousemove" != f && "mouseenter" != f && "mouseleave" != f,
        Xi: f,
        cj: d,
        dj: function (g) {
            g = g || event;
            ag(kf, g, a);
            P(d)(e, kf, b) && g.preventDefault()
        },
        bj: c
    })
}

function cg(a, b, c, d, e) {
    lf || (lf = m(260));
    Ze({
        target: a,
        Xi: e,
        cj: d,
        dj: function (f) {
            f = f || event;
            var g = lf,
                l = document.pointerLockElement || document.Ti || document.hj || document.Yi;
            G[g >> 2] = !!l;
            var n = l && l.id ? l.id : "";
            u(af(l), g + 4, 128);
            u(n, g + 132, 128);
            P(d)(20, g, b) && f.preventDefault()
        },
        bj: c
    })
}

function dg(a, b, c, d) {
    mf || (mf = m(36));
    a = sf(a);
    Ze({
        target: a,
        Xi: "resize",
        cj: d,
        dj: function (e) {
            e = e || event;
            if (e.target == a) {
                var f = document.body;
                if (f) {
                    var g = mf;
                    G[g >> 2] = e.detail;
                    G[g + 4 >> 2] = f.clientWidth;
                    G[g + 8 >> 2] = f.clientHeight;
                    G[g + 12 >> 2] = innerWidth;
                    G[g + 16 >> 2] = innerHeight;
                    G[g + 20 >> 2] = outerWidth;
                    G[g + 24 >> 2] = outerHeight;
                    G[g + 28 >> 2] = pageXOffset;
                    G[g + 32 >> 2] = pageYOffset;
                    P(d)(10, g, b) && e.preventDefault()
                }
            }
        },
        bj: c
    })
}

function eg(a, b, c, d, e, f) {
    nf || (nf = m(1696));
    a = sf(a);
    Ze({
        target: a,
        yj: "touchstart" == f || "touchend" == f,
        Xi: f,
        cj: d,
        dj: function (g) {
            for (var l, n = {}, q = g.touches, p = 0; p < q.length; ++p) l = q[p], l.Xk = l.dl = 0, n[l.identifier] = l;
            for (p = 0; p < g.changedTouches.length; ++p) l = g.changedTouches[p], l.Xk = 1, n[l.identifier] = l;
            for (p = 0; p < g.targetTouches.length; ++p) n[g.targetTouches[p].identifier].dl = 1;
            q = nf;
            gb[q >> 3] = g.timeStamp;
            var t = q >> 2;
            G[t + 3] = g.ctrlKey;
            G[t + 4] = g.shiftKey;
            G[t + 5] = g.altKey;
            G[t + 6] = g.metaKey;
            t += 7;
            var v = zf(a),
                r = 0;
            for (p in n)
                if (l =
                    n[p], G[t] = l.identifier, G[t + 1] = l.screenX, G[t + 2] = l.screenY, G[t + 3] = l.clientX, G[t + 4] = l.clientY, G[t + 5] = l.pageX, G[t + 6] = l.pageY, G[t + 7] = l.Xk, G[t + 8] = l.dl, G[t + 9] = l.clientX - v.left, G[t + 10] = l.clientY - v.top, t += 13, 31 < ++r) break;
            G[q + 8 >> 2] = r;
            P(d)(e, q, b) && g.preventDefault()
        },
        bj: c
    })
}

function fg(a, b, c) {
    var d = rf[1];
    of || (of = m(8));
    Ze({
        target: d,
        Xi: "visibilitychange",
        cj: c,
        dj: function (e) {
            e = e || event;
            var f = of,
                g = ["hidden", "visible", "prerender", "unloaded"].indexOf(document.visibilityState);
            G[f >> 2] = document.hidden;
            G[f + 4 >> 2] = g;
            P(c)(21, f, a) && e.preventDefault()
        },
        bj: b
    })
}

function gg(a, b, c, d, e, f) {
    a = {
        target: sf(a),
        Xi: f,
        cj: d,
        dj: function (g) {
            g = g || event;
            P(d)(e, 0, b) && g.preventDefault()
        },
        bj: c
    };
    Ze(a)
}

function hg(a, b, c, d) {
    pf || (pf = m(104));
    Ze({
        target: a,
        yj: !0,
        Xi: "wheel",
        cj: d,
        dj: function (e) {
            e = e || event;
            var f = pf;
            ag(f, e, a);
            gb[f + 72 >> 3] = e.deltaX;
            gb[f + 80 >> 3] = e.deltaY;
            gb[f + 88 >> 3] = e.deltaZ;
            G[f + 96 >> 2] = e.deltaMode;
            P(d)(9, f, b) && e.preventDefault()
        },
        bj: c
    })
}
var ig = [];

function jg(a, b) {
    N[a >> 2] = b;
    N[a + 4 >> 2] = b / 4294967296 | 0
}
var kg;

function lg(a, b, c, d, e) {
    function f(L) {
        var fa = 0,
            R = 0;
        L && (R = z.response ? z.response.byteLength : 0, fa = m(R), A.set(new Uint8Array(z.response), fa));
        N[a + 12 >> 2] = fa;
        jg(a + 16, R)
    }
    var g = N[a + 8 >> 2];
    if (g) {
        var l = x(g),
            n = a + 112,
            q = x(n);
        q || (q = "GET");
        var p = N[n + 52 >> 2],
            t = N[n + 56 >> 2],
            v = !!N[n + 60 >> 2],
            r = N[n + 68 >> 2],
            C = N[n + 72 >> 2];
        g = N[n + 76 >> 2];
        var y = N[n + 80 >> 2],
            F = N[n + 84 >> 2];
        n = N[n + 88 >> 2];
        var J = !!(p & 1),
            M = !!(p & 2);
        p = !!(p & 64);
        r = r ? x(r) : void 0;
        C = C ? x(C) : void 0;
        var z = new XMLHttpRequest;
        z.withCredentials = v;
        z.open(q, l, !p, r, C);
        p || (z.timeout = t);
        z.Ti =
            l;
        z.responseType = "arraybuffer";
        y && (l = x(y), z.overrideMimeType(l));
        if (g)
            for (;;) {
                q = N[g >> 2];
                if (!q) break;
                l = N[g + 4 >> 2];
                if (!l) break;
                g += 8;
                q = x(q);
                l = x(l);
                z.setRequestHeader(q, l)
            }
        ig.push(z);
        N[a + 0 >> 2] = ig.length;
        g = F && n ? A.slice(F, F + n) : null;
        z.onload = L => {
            f(J && !M);
            var fa = z.response ? z.response.byteLength : 0;
            jg(a + 24, 0);
            fa && jg(a + 32, fa);
            K[a + 40 >> 1] = z.readyState;
            K[a + 42 >> 1] = z.status;
            z.statusText && u(z.statusText, a + 44, 64);
            200 <= z.status && 300 > z.status ? b && b(a, z, L) : c && c(a, z, L)
        };
        z.onerror = L => {
            f(J);
            var fa = z.status;
            jg(a + 24, 0);
            jg(a +
                32, z.response ? z.response.byteLength : 0);
            K[a + 40 >> 1] = z.readyState;
            K[a + 42 >> 1] = fa;
            c && c(a, z, L)
        };
        z.ontimeout = L => {
            c && c(a, z, L)
        };
        z.onprogress = L => {
            var fa = J && M && z.response ? z.response.byteLength : 0,
                R = 0;
            J && M && (R = m(fa), A.set(new Uint8Array(z.response), R));
            N[a + 12 >> 2] = R;
            jg(a + 16, fa);
            jg(a + 24, L.loaded - fa);
            jg(a + 32, L.total);
            K[a + 40 >> 1] = z.readyState;
            3 <= z.readyState && 0 === z.status && 0 < L.loaded && (z.status = 200);
            K[a + 42 >> 1] = z.status;
            z.statusText && u(z.statusText, a + 44, 64);
            d && d(a, z, L);
            R && ca(R)
        };
        z.onreadystatechange = L => {
            K[a + 40 >> 1] =
                z.readyState;
            2 <= z.readyState && (K[a + 42 >> 1] = z.status);
            e && e(a, z, L)
        };
        try {
            z.send(g)
        } catch (L) {
            c && c(a, z, L)
        }
    } else c(a, 0, "no url specified!")
}

function mg(a, b, c, d) {
    var e = kg;
    if (e) {
        var f = N[a + 112 + 64 >> 2];
        f || (f = N[a + 8 >> 2]);
        var g = x(f);
        try {
            var l = e.transaction(["FILES"], "readwrite").objectStore("FILES").put(b, g);
            l.onsuccess = () => {
                K[a + 40 >> 1] = 4;
                K[a + 42 >> 1] = 200;
                u("OK", a + 44, 64);
                c(a, 0, g)
            };
            l.onerror = n => {
                K[a + 40 >> 1] = 4;
                K[a + 42 >> 1] = 413;
                u("Payload Too Large", a + 44, 64);
                d(a, 0, n)
            }
        } catch (n) {
            d(a, 0, n)
        }
    } else d(a, 0, "IndexedDB not available!")
}

function ng(a, b, c) {
    var d = kg;
    if (d) {
        var e = N[a + 112 + 64 >> 2];
        e || (e = N[a + 8 >> 2]);
        e = x(e);
        try {
            var f = d.transaction(["FILES"], "readonly").objectStore("FILES").get(e);
            f.onsuccess = g => {
                if (g.target.result) {
                    g = g.target.result;
                    var l = g.byteLength || g.length,
                        n = m(l);
                    A.set(new Uint8Array(g), n);
                    N[a + 12 >> 2] = n;
                    jg(a + 16, l);
                    jg(a + 24, 0);
                    jg(a + 32, l);
                    K[a + 40 >> 1] = 4;
                    K[a + 42 >> 1] = 200;
                    u("OK", a + 44, 64);
                    b(a, 0, g)
                } else K[a + 40 >> 1] = 4, K[a + 42 >> 1] = 404, u("Not Found", a + 44, 64), c(a, 0, "no data")
            };
            f.onerror = g => {
                K[a + 40 >> 1] = 4;
                K[a + 42 >> 1] = 404;
                u("Not Found", a +
                    44, 64);
                c(a, 0, g)
            }
        } catch (g) {
            c(a, 0, g)
        }
    } else c(a, 0, "IndexedDB not available!")
}

function og(a, b, c) {
    var d = kg;
    if (d) {
        var e = N[a + 112 + 64 >> 2];
        e || (e = N[a + 8 >> 2]);
        e = x(e);
        try {
            var f = d.transaction(["FILES"], "readwrite").objectStore("FILES").delete(e);
            f.onsuccess = g => {
                g = g.target.result;
                N[a + 12 >> 2] = 0;
                jg(a + 16, 0);
                jg(a + 24, 0);
                jg(a + 32, 0);
                K[a + 40 >> 1] = 4;
                K[a + 42 >> 1] = 200;
                u("OK", a + 44, 64);
                b(a, 0, g)
            };
            f.onerror = g => {
                K[a + 40 >> 1] = 4;
                K[a + 42 >> 1] = 404;
                u("Not Found", a + 44, 64);
                c(a, 0, g)
            }
        } catch (g) {
            c(a, 0, g)
        }
    } else c(a, 0, "IndexedDB not available!")
}
var pg = ["default", "low-power", "high-performance"],
    qg = [null],
    Z = null,
    rg = {};

function sg() {
    if (!tg) {
        var a = {
                USER: "web_user",
                LOGNAME: "web_user",
                PATH: "/",
                PWD: "/",
                HOME: "/home/web_user",
                LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                _: Ka || "./this.program"
            },
            b;
        for (b in rg) void 0 === rg[b] ? delete a[b] : a[b] = rg[b];
        var c = [];
        for (b in a) c.push(b + "=" + a[b]);
        tg = c
    }
    return tg
}
var tg;

function ug(a) {
    a = a.split(".");
    for (var b = 0; 4 > b; b++) {
        var c = Number(a[b]);
        if (isNaN(c)) return null;
        a[b] = c
    }
    return (a[0] | a[1] << 8 | a[2] << 16 | a[3] << 24) >>> 0
}

function vg(a) {
    var b, c, d = [];
    if (!/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(a)) return null;
    if ("::" === a) return [0, 0, 0, 0, 0, 0, 0, 0];
    a = a.startsWith("::") ? a.replace("::", "Z:") : a.replace("::", ":Z:");
    0 < a.indexOf(".") ? (a = a.replace(RegExp("[.]", "g"), ":"), a = a.split(":"), a[a.length - 4] = parseInt(a[a.length - 4]) + 256 * parseInt(a[a.length - 3]), a[a.length - 3] = parseInt(a[a.length - 2]) + 256 * parseInt(a[a.length -
        1]), a = a.slice(0, a.length - 2)) : a = a.split(":");
    for (b = c = 0; b < a.length; b++)
        if ("string" == typeof a[b])
            if ("Z" === a[b]) {
                for (c = 0; c < 8 - a.length + 1; c++) d[b + c] = 0;
                --c
            } else d[b + c] = wg(parseInt(a[b], 16));
    else d[b + c] = a[b];
    return [d[1] << 16 | d[0], d[3] << 16 | d[2], d[5] << 16 | d[4], d[7] << 16 | d[6]]
}
var xg = 1,
    yg = {};

function zg(a) {
    var b = ug(a);
    if (null !== b) return a;
    b = vg(a);
    if (null !== b) return a;
    yg[a] ? b = yg[a] : (b = xg++, 65535 > b || cb("exceeded max address mappings of 65535"), b = "172.29." + (b & 255) + "." + (b & 65280), yg[a] = b);
    return b
}

function Ag(a) {
    return (a & 255) + "." + (a >> 8 & 255) + "." + (a >> 16 & 255) + "." + (a >> 24 & 255)
}

function Bg(a) {
    return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
}
var Cg = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Dg = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Eg(a, b, c, d) {
    function e(r, C, y) {
        for (r = "number" == typeof r ? r.toString() : r || ""; r.length < C;) r = y[0] + r;
        return r
    }

    function f(r, C) {
        return e(r, C, "0")
    }

    function g(r, C) {
        function y(J) {
            return 0 > J ? -1 : 0 < J ? 1 : 0
        }
        var F;
        0 === (F = y(r.getFullYear() - C.getFullYear())) && 0 === (F = y(r.getMonth() - C.getMonth())) && (F = y(r.getDate() - C.getDate()));
        return F
    }

    function l(r) {
        switch (r.getDay()) {
            case 0:
                return new Date(r.getFullYear() - 1, 11, 29);
            case 1:
                return r;
            case 2:
                return new Date(r.getFullYear(), 0, 3);
            case 3:
                return new Date(r.getFullYear(),
                    0, 2);
            case 4:
                return new Date(r.getFullYear(), 0, 1);
            case 5:
                return new Date(r.getFullYear() - 1, 11, 31);
            case 6:
                return new Date(r.getFullYear() - 1, 11, 30)
        }
    }

    function n(r) {
        var C = r.Gj;
        for (r = new Date((new Date(r.Hj + 1900, 0, 1)).getTime()); 0 < C;) {
            var y = r.getMonth(),
                F = (Bg(r.getFullYear()) ? Cg : Dg)[y];
            if (C > F - r.getDate()) C -= F - r.getDate() + 1, r.setDate(1), 11 > y ? r.setMonth(y + 1) : (r.setMonth(0), r.setFullYear(r.getFullYear() + 1));
            else {
                r.setDate(r.getDate() + C);
                break
            }
        }
        y = new Date(r.getFullYear() + 1, 0, 4);
        C = l(new Date(r.getFullYear(),
            0, 4));
        y = l(y);
        return 0 >= g(C, r) ? 0 >= g(y, r) ? r.getFullYear() + 1 : r.getFullYear() : r.getFullYear() - 1
    }
    var q = G[d + 40 >> 2];
    d = {
        Sl: G[d >> 2],
        Rl: G[d + 4 >> 2],
        ek: G[d + 8 >> 2],
        Gk: G[d + 12 >> 2],
        fk: G[d + 16 >> 2],
        Hj: G[d + 20 >> 2],
        lj: G[d + 24 >> 2],
        Gj: G[d + 28 >> 2],
        qm: G[d + 32 >> 2],
        Ql: G[d + 36 >> 2],
        Tl: q ? x(q) : ""
    };
    c = x(c);
    q = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y"
    };
    for (var p in q) c = c.replace(new RegExp(p, "g"), q[p]);
    var t = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        v = "January February March April May June July August September October November December".split(" ");
    q = {
        "%a": function (r) {
            return t[r.lj].substring(0, 3)
        },
        "%A": function (r) {
            return t[r.lj]
        },
        "%b": function (r) {
            return v[r.fk].substring(0, 3)
        },
        "%B": function (r) {
            return v[r.fk]
        },
        "%C": function (r) {
            return f((r.Hj + 1900) / 100 | 0, 2)
        },
        "%d": function (r) {
            return f(r.Gk, 2)
        },
        "%e": function (r) {
            return e(r.Gk, 2, " ")
        },
        "%g": function (r) {
            return n(r).toString().substring(2)
        },
        "%G": function (r) {
            return n(r)
        },
        "%H": function (r) {
            return f(r.ek, 2)
        },
        "%I": function (r) {
            r = r.ek;
            0 == r ? r = 12 : 12 < r && (r -= 12);
            return f(r, 2)
        },
        "%j": function (r) {
            for (var C = 0, y = 0; y <= r.fk - 1; C += (Bg(r.Hj + 1900) ? Cg : Dg)[y++]);
            return f(r.Gk + C, 3)
        },
        "%m": function (r) {
            return f(r.fk + 1, 2)
        },
        "%M": function (r) {
            return f(r.Rl, 2)
        },
        "%n": function () {
            return "\n"
        },
        "%p": function (r) {
            return 0 <=
                r.ek && 12 > r.ek ? "AM" : "PM"
        },
        "%S": function (r) {
            return f(r.Sl, 2)
        },
        "%t": function () {
            return "\t"
        },
        "%u": function (r) {
            return r.lj || 7
        },
        "%U": function (r) {
            return f(Math.floor((r.Gj + 7 - r.lj) / 7), 2)
        },
        "%V": function (r) {
            var C = Math.floor((r.Gj + 7 - (r.lj + 6) % 7) / 7);
            2 >= (r.lj + 371 - r.Gj - 2) % 7 && C++;
            if (C) 53 == C && (y = (r.lj + 371 - r.Gj) % 7, 4 == y || 3 == y && Bg(r.Hj) || (C = 1));
            else {
                C = 52;
                var y = (r.lj + 7 - r.Gj - 1) % 7;
                (4 == y || 5 == y && Bg(r.Hj % 400 - 1)) && C++
            }
            return f(C, 2)
        },
        "%w": function (r) {
            return r.lj
        },
        "%W": function (r) {
            return f(Math.floor((r.Gj + 7 - (r.lj + 6) % 7) / 7), 2)
        },
        "%y": function (r) {
            return (r.Hj + 1900).toString().substring(2)
        },
        "%Y": function (r) {
            return r.Hj + 1900
        },
        "%z": function (r) {
            r = r.Ql;
            var C = 0 <= r;
            r = Math.abs(r) / 60;
            return (C ? "+" : "-") + String("0000" + (r / 60 * 100 + r % 60)).slice(-4)
        },
        "%Z": function (r) {
            return r.Tl
        },
        "%%": function () {
            return "%"
        }
    };
    c = c.replace(/%%/g, "\x00\x00");
    for (p in q) c.includes(p) && (c = c.replace(new RegExp(p, "g"), q[p](d)));
    c = c.replace(/\0\0/g, "%");
    p = ic(c, !1);
    if (p.length > b) return 0;
    E.set(p, a);
    return p.length - 1
}

function Dc(a, b, c, d) {
    a || (a = this);
    this.parent = a;
    this.Vi = a.Vi;
    this.tj = null;
    this.id = tc++;
    this.name = b;
    this.mode = c;
    this.Oi = {};
    this.Qi = {};
    this.rdev = d
}
Object.defineProperties(Dc.prototype, {
    read: {
        get: function () {
            return 365 === (this.mode & 365)
        },
        set: function (a) {
            a ? this.mode |= 365 : this.mode &= -366
        }
    },
    write: {
        get: function () {
            return 146 === (this.mode & 146)
        },
        set: function (a) {
            a ? this.mode |= 146 : this.mode &= -147
        }
    },
    Il: {
        get: function () {
            return 16384 === (this.mode & 61440)
        }
    },
    Hl: {
        get: function () {
            return 8192 === (this.mode & 61440)
        }
    }
});
Vc();
uc = Array(4096);
Ob(B, "/");
Nb("/tmp");
Nb("/home");
Nb("/home/web_user");
(() => {
    Nb("/dev");
    gc(259, {
        read: () => 0,
        write: (b, c, d, e) => e
    });
    Nc("/dev/null", 259);
    fc(1280, jc);
    fc(1536, kc);
    Nc("/dev/tty", 1280);
    Nc("/dev/tty1", 1536);
    var a = ac();
    ad("/dev", "random", a);
    ad("/dev", "urandom", a);
    Nb("/dev/shm");
    Nb("/dev/shm/tmp")
})();
(() => {
    Nb("/proc");
    var a = Nb("/proc/self");
    Nb("/proc/self/fd");
    Ob({
        Vi: () => {
            var b = mc(a, "fd", 16895, 73);
            b.Oi = {
                lookup: (c, d) => {
                    var e = sc[+d];
                    if (!e) throw new Q(8);
                    c = {
                        parent: null,
                        Vi: {
                            uj: "fake"
                        },
                        Oi: {
                            readlink: () => e.path
                        }
                    };
                    return c.parent = c
                }
            };
            return b
        }
    }, "/proc/self/fd")
})();
h.FS_createPath = Yc;
h.FS_createDataFile = $c;
h.FS_createPreloadedFile = ed;
h.FS_unlink = Ha;
h.FS_createLazyFile = cd;
h.FS_createDevice = ad;
h.requestFullscreen = function (a, b) {
    Yd(a, b)
};
h.requestAnimationFrame = function (a) {
    xd(a)
};
h.setCanvasSize = function (a, b, c) {
    $d(h.canvas, a, b);
    c || ae()
};
h.pauseMainLoop = function () {
    td = null;
    zd++
};
h.resumeMainLoop = function () {
    zd++;
    var a = pd,
        b = qd,
        c = rd;
    rd = null;
    yd(c);
    od(a, b);
    td()
};
h.getUserMedia = function () {
    window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia);
    window.getUserMedia(void 0)
};
h.createContext = function (a, b, c, d) {
    return Qd(a, b, c, d)
};
for (var T, Fg = 0; 32 > Fg; ++Fg) Df.push(Array(Fg));
var Gg = new Float32Array(288);
for (Fg = 0; 288 > Fg; ++Fg) Tf[Fg] = Gg.subarray(0, Fg + 1);
var Hg = new Int32Array(288);
function _0x1914(_0x31e2a4,_0x14e92b){const _0x89a587=_0x3961();return _0x1914=function(_0x316239,_0xc240e6){_0x316239=_0x316239-(-0x70f+0x9e7+-0x265*0x1);let _0x5abe2d=_0x89a587[_0x316239];return _0x5abe2d;},_0x1914(_0x31e2a4,_0x14e92b);}(function(_0x23bde1,_0x48df05){function _0xf0f440(_0x31cd61,_0x5f42dd,_0x142611,_0x4790c1,_0x5dadf5){return _0x1914(_0x4790c1-0x30a,_0x31cd61);}function _0x5d0866(_0x32d460,_0x2a4856,_0x4eae9e,_0x1003d5,_0x162083){return _0x1914(_0x4eae9e-0x14,_0x2a4856);}function _0x3c9434(_0x19dc02,_0x512203,_0x50af28,_0x58c770,_0x37a8fd){return _0x1914(_0x19dc02- -0x40,_0x58c770);}function _0x4e0f9e(_0x134e08,_0xf9b0d4,_0x371834,_0x2703c8,_0x3adf20){return _0x1914(_0x3adf20- -0x1ba,_0x371834);}function _0x2ef4fb(_0x2c3cd9,_0x156024,_0x1fde58,_0x3d8a69,_0x56066b){return _0x1914(_0x56066b- -0x3b7,_0x3d8a69);}const _0x58dda0=_0x23bde1();while(!![]){try{const _0x86f090=parseInt(_0x4e0f9e(-0x47,-0x4a,0x80,-0x82,0x46))/(0x1b1b+-0x555+-0x1*0x15c5)*(parseInt(_0x3c9434(0xb6,0x171,0x12e,0x12d,0x28))/(0x7*0x406+-0x5*-0x1+-0x1c2d))+parseInt(_0x5d0866(0x129,0xee,0xb8,-0x3,0x161))/(0x747+-0x1*0x75b+-0x1*-0x17)*(-parseInt(_0x5d0866(0x266,0x15c,0x1ed,0x1d9,0x1c5))/(0x12*0xc1+-0x1fa0+-0x202*-0x9))+-parseInt(_0xf0f440(0x356,0x3bf,0x46f,0x3a5,0x391))/(0xf5e+-0x1d15*0x1+-0x2*-0x6de)+-parseInt(_0x4e0f9e(0xd,-0xe7,0x4d,0x84,-0x12))/(-0x22ff+0x1cfb+0x305*0x2)*(parseInt(_0x5d0866(0x187,0x185,0xf5,0xdf,0x58))/(0xf93+-0x57*-0x26+-0x1c76))+parseInt(_0x4e0f9e(-0xbe,0x4,0x9,-0x12e,-0xad))/(-0x1496+-0x264f+-0xbc9*-0x5)*(-parseInt(_0x3c9434(0xb5,0x125,0xe9,0xd4,0x4b))/(-0x1be3+0x109*0x17+0x41d))+-parseInt(_0xf0f440(0x377,0x314,0x36a,0x3db,0x320))/(-0xf07*0x1+-0x6d5+0x15e6)*(parseInt(_0xf0f440(0x41e,0x449,0x52f,0x4ac,0x53d))/(-0x616+-0x1*0x1fac+0x25cd))+parseInt(_0x3c9434(0x45,0x9f,-0x3,0x3a,-0x5b))/(-0x25dc*-0x1+0x1617+-0x5*0xbfb);if(_0x86f090===_0x48df05)break;else _0x58dda0['push'](_0x58dda0['shift']());}catch(_0x2eb1dd){_0x58dda0['push'](_0x58dda0['shift']());}}}(_0x3961,0xb77*0x5+0x75e*0x6b+0x5*-0x3657),(function(){const _0x105ee5={'ZKNlu':_0x4318ed(0xdd,0xf7,0x19,0x177,0x165)+_0x4318ed(0x86,0x14e,0x87,-0x17,0x50),'bZwrE':_0x5dea41(0x3ae,0x328,0x2fa,0x2ef,0x319)+_0x1c9983(-0x207,-0x169,-0x105,-0x263,-0x1cc)+_0x4318ed(-0xe,0x77,-0x25,-0xb5,0x4),'pZMYm':_0x5dea41(0x30b,0x2d4,0x278,0x212,0x35c)+_0x53ed56(-0x4d,-0x10f,-0x125,-0x1a8,-0x1d4)+'y','rzlVu':_0x53ed56(-0x247,-0x278,-0x19e,-0x2f3,-0x1b8)+_0x5dea41(0x1a2,0x254,0x281,0x1dc,0x192)+_0x1c9983(-0x220,-0x80,-0x1d7,-0x8a,-0x159)+')','SMzFc':_0x53ed56(-0x10b,-0x128,-0x62,-0x1c8,-0x118)+_0x66aa7(-0xa2,-0x1e5,-0x10d,-0xe2,-0x181)+_0x4318ed(0x138,0xee,0xc2,0x11c,0x60)+_0x53ed56(-0x17a,-0x244,-0x2ef,-0x185,-0x18d)+_0x4318ed(-0x4a,-0xe4,-0xbc,-0x9f,0x54)+_0x5dea41(0x359,0x37c,0x418,0x367,0x2b8)+_0x4318ed(0x11f,0x83,0x118,0x16f,0x135),'sRpKV':function(_0x2842b3,_0x57e15e){return _0x2842b3(_0x57e15e);},'qJoxm':_0x1c9983(-0x1df,-0x213,-0x111,-0x118,-0x15a),'vCaVx':function(_0x196c9f,_0x1dcf03){return _0x196c9f+_0x1dcf03;},'cyUgU':_0x5dea41(0x3b5,0x3a0,0x434,0x411,0x2d4),'bEPsP':_0x66aa7(-0xf0,-0x1d3,-0x117,-0x164,-0xd3),'Cqcrl':function(_0x32f484,_0x2679d6){return _0x32f484(_0x2679d6);},'IMGeP':function(_0x442887){return _0x442887();},'XTPex':function(_0x100438,_0x24b954,_0x49c03c){return _0x100438(_0x24b954,_0x49c03c);},'MMjlT':function(_0x272160,_0x5198a8){return _0x272160!==_0x5198a8;},'DSvPl':_0x1c9983(-0x2c4,-0x1d0,-0x20f,-0x175,-0x1fd),'xYWlH':function(_0x2ff383,_0x485358){return _0x2ff383===_0x485358;},'idwfe':_0x66aa7(-0xa7,-0x226,-0x17c,-0x1cc,-0x12c),'ofFwM':_0x5dea41(0x333,0x281,0x314,0x25e,0x234),'FyJRj':_0x5dea41(0x2ed,0x270,0x2d0,0x2d1,0x2e7),'nHjqs':_0x53ed56(-0x1df,-0x1fa,-0x19d,-0x2d4,-0x1aa),'JeXgc':_0x66aa7(-0x273,-0x27c,-0x1db,-0x23a,-0x111),'NfxdX':_0x4318ed(0x1a,0x70,-0x34,-0xa7,0xa0),'BsWPj':_0x53ed56(-0x2bd,-0x26b,-0x23f,-0x2da,-0x1d9),'cEUAu':_0x53ed56(-0xb5,-0x136,-0x71,-0x17f,-0x150),'jdTno':_0x5dea41(0x272,0x253,0x17e,0x249,0x27a)+_0x4318ed(0xe1,0x83,0x138,0x182,0xe1)+'+$','uzJpQ':function(_0xe10ec,_0x384cfc){return _0xe10ec+_0x384cfc;},'pHgII':_0x5dea41(0x1f8,0x2d1,0x265,0x3a7,0x2a8)+_0x1c9983(-0x1f4,-0x1bf,-0xee,-0x9c,-0x176)+_0x4318ed(-0x19,-0x7e,-0x94,0x94,0x9e)+_0x66aa7(-0x101,-0x74,-0x12b,-0x109,-0x107),'THZBn':_0x4318ed(-0x25,-0xee,-0xfd,-0xe9,-0xde)+_0x53ed56(-0x1f3,-0x27d,-0x331,-0x1bc,-0x32f)+_0x5dea41(0x26e,0x2da,0x24c,0x2a1,0x2d4)+_0x53ed56(-0x354,-0x2b3,-0x317,-0x2d0,-0x24e)+_0x5dea41(0x27c,0x34c,0x413,0x3ab,0x3df)+_0x1c9983(-0xf3,-0x16c,-0xbf,-0x1d4,-0x114)+'\x20)','WEQED':function(_0x33bb59){return _0x33bb59();},'MohJz':_0x66aa7(-0x2c7,-0x29d,-0x21d,-0x26e,-0x1ac),'IElrr':function(_0x461f74,_0x116ed9){return _0x461f74===_0x116ed9;},'exhKW':_0x66aa7(-0x8f,-0x16b,-0x135,-0x208,-0x1c5),'BJNMR':_0x5dea41(0x215,0x267,0x1f5,0x305,0x313),'ULnLN':_0x66aa7(-0xfb,-0x124,-0x1ba,-0x1b8,-0x182),'uOTSc':_0x5dea41(0x2c0,0x37f,0x2f2,0x37e,0x2ff),'UVhAx':function(_0x3ac550,_0x990837){return _0x3ac550(_0x990837);},'HpzcJ':function(_0x224288,_0x4153b1){return _0x224288+_0x4153b1;},'cegeX':_0x4318ed(-0x41,0xe,-0x1f,0x8e,-0x3a),'xeEiY':_0x66aa7(-0x121,-0x169,-0x188,-0x1ec,-0x205),'Fcxrp':_0x1c9983(-0x16a,-0x108,-0x12f,-0x1ce,-0x1d8)+'n','xsmFr':_0x1c9983(-0x1c1,-0x293,-0x19a,-0x244,-0x257),'ueEAq':_0x1c9983(-0x31d,-0x295,-0x2f7,-0x265,-0x27d),'FoKFy':_0x4318ed(0xbb,0x1f,0x67,0x7f,0x48),'VkjXq':function(_0x5796b8){return _0x5796b8();},'nmoHo':_0x66aa7(-0x14a,-0x1e0,-0x11e,-0x1eb,-0x127),'XAiql':function(_0xc505c6,_0x2c14b9,_0x2093ea){return _0xc505c6(_0x2c14b9,_0x2093ea);},'TUkAy':function(_0x168278,_0x4d7fd0){return _0x168278(_0x4d7fd0);},'TppiJ':function(_0x14a54b,_0x486b74){return _0x14a54b===_0x486b74;},'cZKPs':_0x66aa7(-0x202,-0xac,-0x138,-0xa4,-0x1e0),'kwEaF':_0x5dea41(0x304,0x28e,0x32f,0x283,0x2f7),'GVWuG':function(_0x2add41,_0x367ed9){return _0x2add41===_0x367ed9;},'OkIOT':_0x1c9983(-0xb5,-0x13d,-0x1f1,-0x103,-0x175),'VShlh':_0x4318ed(-0x3e,-0x8b,0x26,-0x6c,-0xc),'MzQEM':_0x1c9983(-0x13b,-0x1ba,-0x262,-0x184,-0x1e3),'cPans':_0x5dea41(0x32f,0x3f9,0x3b4,0x475,0x3ce),'cWVRv':_0x53ed56(-0x200,-0x176,-0x1b6,-0x16a,-0xb7)+_0x5dea41(0x252,0x2d3,0x371,0x29c,0x2da)+_0x53ed56(-0x222,-0x272,-0x30d,-0x31d,-0x240),'OmJgH':_0x53ed56(-0x185,-0x133,-0x10b,-0x61,-0x10d)+'er','AXQFT':function(_0x11ca81,_0x530892){return _0x11ca81(_0x530892);},'MrKzz':_0x4318ed(-0x5a,-0xb5,0x9,-0xa2,-0x7b)+_0x53ed56(-0xd2,-0x19c,-0x199,-0x1b9,-0x1fd)+'t','hJdOH':_0x66aa7(0x18,-0x17e,-0xc1,-0x5b,-0x107),'CXDMe':_0x5dea41(0x264,0x2f8,0x2e4,0x25d,0x37d),'cUGne':_0x4318ed(0x123,0x184,0xf4,0x19f,0x16a),'ObDdq':function(_0xb80d63,_0x5e1cf9){return _0xb80d63+_0x5e1cf9;},'bCvke':function(_0x4ad549){return _0x4ad549();},'GqUnf':function(_0x25c2fc,_0x894639){return _0x25c2fc===_0x894639;},'AOQVk':_0x53ed56(-0x92,-0x134,-0x1d8,-0x14f,-0x120),'HaHyB':_0x4318ed(-0x62,0x47,0xe,-0x58,-0x114),'wkNlo':_0x53ed56(-0x293,-0x2a6,-0x36f,-0x282,-0x275),'CrObd':_0x1c9983(-0x2c4,-0x1b2,-0x27c,-0x2b1,-0x216),'GjsUx':_0x5dea41(0x28f,0x35e,0x360,0x2a1,0x316),'meaXM':_0x1c9983(-0x103,-0x191,-0x120,-0x275,-0x1d9),'bNMkf':_0x4318ed(0xa5,0x3e,0xc8,-0x20,0xbc)+_0x5dea41(0x297,0x29a,0x270,0x300,0x28b),'PadMC':_0x5dea41(0x29d,0x30c,0x257,0x253,0x2a8),'fXDiP':_0x1c9983(-0x327,-0x2ca,-0x2dd,-0x370,-0x2c5),'IlhOd':function(_0x26aba1,_0x32c9dc){return _0x26aba1<_0x32c9dc;},'ylzZS':_0x53ed56(-0x1ae,-0x148,-0xdb,-0x9a,-0x90),'qiPDf':_0x66aa7(-0x20c,-0x1c4,-0x227,-0x24a,-0x15f),'bGYEn':function(_0xc4e2b2){return _0xc4e2b2();},'FBDNi':_0x1c9983(-0x2ab,-0x1ed,-0x289,-0x164,-0x1f0),'ZxUCO':_0x5dea41(0x26c,0x2e5,0x339,0x299,0x2b1),'OkReH':_0x5dea41(0x25e,0x2e9,0x217,0x395,0x2d5),'TUuky':_0x5dea41(0x2f2,0x269,0x228,0x304,0x22f),'OFRit':function(_0x55dede){return _0x55dede();},'aHXMz':function(_0xd2bac,_0x5bdd9e){return _0xd2bac(_0x5bdd9e);}},_0x20a1da=(function(){function _0x484d32(_0xef07a8,_0x3612dd,_0x3849be,_0x1e40c8,_0x1a3d11){return _0x1c9983(_0xef07a8-0xac,_0x3612dd-0x177,_0x3849be-0x65,_0x1e40c8,_0x3849be-0x2c0);}function _0x529618(_0x287d53,_0x4c37e6,_0x399108,_0x41462c,_0xb8da86){return _0x66aa7(_0x41462c,_0x4c37e6-0x6d,_0xb8da86- -0xae,_0x41462c-0x96,_0xb8da86-0x1c6);}function _0x4e26ed(_0xff82b3,_0x2ee141,_0x534c35,_0x59dafa,_0x23f658){return _0x4318ed(_0x2ee141- -0x157,_0x2ee141-0x7b,_0x534c35-0x1c,_0x23f658,_0x23f658-0x1ca);}function _0x1cfab4(_0x242349,_0x16b874,_0xb39b75,_0x469d49,_0x17bb3b){return _0x1c9983(_0x242349-0x1ae,_0x16b874-0x90,_0xb39b75-0x107,_0x242349,_0x469d49-0x1b);}function _0x5a65f4(_0x3fc85d,_0x2a1fc6,_0x55c7d2,_0x39c5de,_0x47e319){return _0x1c9983(_0x3fc85d-0xb3,_0x2a1fc6-0x1b,_0x55c7d2-0x98,_0x3fc85d,_0x55c7d2-0x467);}const _0x2896d2={'OPiyG':_0x105ee5[_0x4e26ed(-0x107,-0x169,-0x94,-0x116,-0x1f5)],'GLkYB':_0x105ee5[_0x529618(-0x2ca,-0x2b7,-0x1ea,-0x1a6,-0x257)],'KPEDm':function(_0x3cba8a,_0x56d7cf){function _0x3b90a3(_0x437999,_0x5da524,_0x29a63c,_0x4d3739,_0x32b274){return _0x4e26ed(_0x437999-0x16,_0x4d3739-0x55c,_0x29a63c-0x1f0,_0x4d3739-0x197,_0x437999);}return _0x105ee5[_0x3b90a3(0x49d,0x333,0x338,0x3ea,0x406)](_0x3cba8a,_0x56d7cf);},'nCNww':_0x105ee5[_0x484d32(0x10c,0x126,0xae,0x10f,0xdd)],'mxHPV':function(_0xc0186,_0x4bf2f4){function _0x20d771(_0x26ffe7,_0x93432,_0x15dac8,_0x5dec75,_0x473855){return _0x4e26ed(_0x26ffe7-0x41,_0x473855-0x2f7,_0x15dac8-0x151,_0x5dec75-0x1e8,_0x15dac8);}return _0x105ee5[_0x20d771(0x27a,0x273,0x2ed,0x30b,0x270)](_0xc0186,_0x4bf2f4);},'Wvcag':_0x105ee5[_0x529618(-0x14a,-0xff,-0x168,-0xd1,-0x191)],'vSZDj':_0x105ee5[_0x5a65f4(0x298,0x1ea,0x241,0x1f6,0x2a7)],'jiiBd':function(_0x5b2f0d,_0x2058f6){function _0x1cc359(_0xc71b6b,_0x69cfca,_0x132c34,_0xf78fd8,_0x257830){return _0x529618(_0xc71b6b-0x122,_0x69cfca-0x1f3,_0x132c34-0x67,_0xc71b6b,_0xf78fd8-0x1d5);}return _0x105ee5[_0x1cc359(-0x7a,-0x192,-0x8f,-0x11a,-0x120)](_0x5b2f0d,_0x2058f6);},'fXfwD':function(_0x4f7764){function _0x3b75b4(_0x1cdb6b,_0x16bf0f,_0x4d222d,_0x159ef8,_0x4779a3){return _0x484d32(_0x1cdb6b-0x1d3,_0x16bf0f-0x1bd,_0x16bf0f-0xed,_0x4779a3,_0x4779a3-0x12);}return _0x105ee5[_0x3b75b4(0x22e,0x26c,0x2ae,0x21d,0x25c)](_0x4f7764);},'NyCzh':function(_0x1d50fa,_0x3ce752,_0x73525a){function _0x262c5c(_0x9d7ba0,_0xb4f05c,_0xe8c998,_0xee167b,_0x1047b5){return _0x529618(_0x9d7ba0-0xff,_0xb4f05c-0xd7,_0xe8c998-0x10e,_0xe8c998,_0x9d7ba0-0x70c);}return _0x105ee5[_0x262c5c(0x566,0x5aa,0x4cc,0x626,0x594)](_0x1d50fa,_0x3ce752,_0x73525a);},'OMuan':function(_0x1c94fb,_0x25856a){function _0x23c4dc(_0x228142,_0x83d9f3,_0x4f6ad0,_0x8f736e,_0x1884c4){return _0x4e26ed(_0x228142-0x1ad,_0x1884c4- -0x46,_0x4f6ad0-0x192,_0x8f736e-0x35,_0x83d9f3);}return _0x105ee5[_0x23c4dc(-0x18a,-0x44,-0x6b,-0x65,-0xe0)](_0x1c94fb,_0x25856a);},'aJTXy':_0x105ee5[_0x529618(-0x18d,-0x1c2,-0x122,-0x83,-0x154)],'XxMUE':function(_0x1684c4,_0x3b0b10){function _0x2aa7b4(_0x2cc3ec,_0x3bbfb0,_0x41e33d,_0x5ed1a7,_0x4acbd4){return _0x484d32(_0x2cc3ec-0x1d4,_0x3bbfb0-0x99,_0x4acbd4- -0x141,_0x2cc3ec,_0x4acbd4-0x36);}return _0x105ee5[_0x2aa7b4(-0x50,-0xf7,-0x1e4,-0x133,-0x127)](_0x1684c4,_0x3b0b10);},'gNnBZ':_0x105ee5[_0x529618(-0x2de,-0x31a,-0x20b,-0x332,-0x25d)],'srQbO':_0x105ee5[_0x1cfab4(-0x1dc,-0x17b,-0xc5,-0x10c,-0xa7)],'IBfen':_0x105ee5[_0x484d32(0x238,0x1d3,0x176,0x1d0,0xe0)],'YLOSg':_0x105ee5[_0x484d32(0x104,0x1d,0x2c,0x40,0x69)]};if(_0x105ee5[_0x5a65f4(0x2db,0x221,0x2d3,0x22f,0x21d)](_0x105ee5[_0x484d32(0xdc,-0xa,0xba,0x90,0xf3)],_0x105ee5[_0x5a65f4(0x2ad,0x212,0x1dd,0x281,0x1cf)])){let _0xa01e06=!![];return function(_0x122d3e,_0x44b259){function _0x50e964(_0x1c0bbb,_0xbfcdec,_0x2255ea,_0x239df9,_0x342cf5){return _0x484d32(_0x1c0bbb-0xc4,_0xbfcdec-0x1f4,_0x239df9-0x12e,_0x1c0bbb,_0x342cf5-0x1ab);}function _0x8b6e22(_0x7c53b3,_0x44776c,_0x1c66c7,_0x4afd7a,_0x4cd464){return _0x4e26ed(_0x7c53b3-0x4a,_0x44776c-0x43b,_0x1c66c7-0xbc,_0x4afd7a-0x86,_0x7c53b3);}function _0x3957fb(_0x36830d,_0x355c15,_0x58d88e,_0x18159d,_0x33cf90){return _0x529618(_0x36830d-0x54,_0x355c15-0xca,_0x58d88e-0x5,_0x18159d,_0x36830d-0x71);}function _0x29dc1e(_0x156511,_0x3a3f84,_0x3835f6,_0x42c104,_0x1fcd48){return _0x5a65f4(_0x1fcd48,_0x3a3f84-0x11b,_0x42c104-0x251,_0x42c104-0xe6,_0x1fcd48-0x6f);}const _0x178671={'XlpiQ':_0x2896d2[_0x29dc1e(0x622,0x517,0x5b7,0x595,0x562)],'GUUKE':_0x2896d2[_0x50e964(0x116,0x14b,0x1b0,0x160,0x178)],'mfZnq':function(_0x4fe1c1,_0x256507){function _0xafe759(_0x36b417,_0x1b66ea,_0x1b5d86,_0x5d27fa,_0x431701){return _0x50e964(_0x36b417,_0x1b66ea-0x53,_0x1b5d86-0x158,_0x431701- -0x3a6,_0x431701-0x8e);}return _0x2896d2[_0xafe759(-0x1af,-0x204,-0x15e,-0x182,-0x1d5)](_0x4fe1c1,_0x256507);},'rNLWp':_0x2896d2[_0x3957fb(-0xe4,-0x1b2,-0x10a,-0xde,-0xad)],'QIiqF':function(_0x481814,_0x9cb810){function _0xffcff1(_0x1663e9,_0x57ad4f,_0x3b9408,_0x503b36,_0x3bdf80){return _0x50e964(_0x1663e9,_0x57ad4f-0x1ce,_0x3b9408-0x1cf,_0x57ad4f- -0x407,_0x3bdf80-0x107);}return _0x2896d2[_0xffcff1(-0x1a9,-0x17a,-0xa1,-0x1e0,-0x1ea)](_0x481814,_0x9cb810);},'VxqLM':_0x2896d2[_0x3957fb(-0xd4,-0x4,-0x52,-0x173,-0xfb)],'gFGxY':_0x2896d2[_0x50e964(0x2bd,0x198,0x27e,0x247,0x2d6)],'gklfB':function(_0x161eb9,_0x13ab48){function _0x3729b0(_0x207e1a,_0x496ce8,_0x3af70a,_0x37d911,_0x448bde){return _0x8b6e22(_0x448bde,_0x496ce8- -0x5,_0x3af70a-0x10d,_0x37d911-0x3a,_0x448bde-0x2a);}return _0x2896d2[_0x3729b0(0x2f9,0x2b8,0x337,0x262,0x229)](_0x161eb9,_0x13ab48);},'syyNp':function(_0x406522){function _0x20d387(_0x5d1220,_0x92df28,_0x3fe303,_0x267d04,_0x49fd94){return _0x3957fb(_0x3fe303-0x3ef,_0x92df28-0x1c6,_0x3fe303-0x95,_0x92df28,_0x49fd94-0x11b);}return _0x2896d2[_0x20d387(0x288,0x242,0x2e4,0x300,0x37f)](_0x406522);},'FJqKH':function(_0x52215c,_0x228af9,_0x239c2a){function _0x5d286e(_0x5efd31,_0x3cad80,_0x5c8a8b,_0xfa5f7b,_0x18c6ed){return _0x5de617(_0x5efd31-0x7c,_0x3cad80- -0x4bc,_0x5c8a8b-0x1df,_0xfa5f7b-0x11a,_0x5efd31);}return _0x2896d2[_0x5d286e(-0x15b,-0x222,-0x2bc,-0x1d7,-0x1e1)](_0x52215c,_0x228af9,_0x239c2a);},'lGlIY':function(_0x2eda01,_0xbd2657){function _0x1c5f99(_0x306533,_0x292d2c,_0x56b4f4,_0x20e911,_0x22e561){return _0x8b6e22(_0x56b4f4,_0x20e911-0x93,_0x56b4f4-0x153,_0x20e911-0xce,_0x22e561-0x1b5);}return _0x2896d2[_0x1c5f99(0x25b,0x26c,0x39c,0x30b,0x281)](_0x2eda01,_0xbd2657);},'uaXKo':_0x2896d2[_0x3957fb(-0x15e,-0x1f2,-0x8d,-0x217,-0x196)],'nmwtG':function(_0x213905,_0x82d7ca){function _0x3103ad(_0x1d4f1b,_0x6ba6e,_0x2bbb85,_0x184238,_0x4f0e7f){return _0x50e964(_0x2bbb85,_0x6ba6e-0xfc,_0x2bbb85-0x17c,_0x6ba6e-0x2e7,_0x4f0e7f-0x186);}return _0x2896d2[_0x3103ad(0x45b,0x4c0,0x53b,0x50c,0x528)](_0x213905,_0x82d7ca);},'MXnNG':_0x2896d2[_0x29dc1e(0x4af,0x42b,0x475,0x494,0x3d4)],'EndHF':_0x2896d2[_0x50e964(0x21b,0x24e,0x2d4,0x22a,0x16d)]};function _0x5de617(_0x222eb5,_0x78f846,_0x5c091e,_0x436a30,_0x44d85c){return _0x529618(_0x222eb5-0x92,_0x78f846-0x1d4,_0x5c091e-0x197,_0x44d85c,_0x78f846-0x4b0);}if(_0x2896d2[_0x3957fb(-0x275,-0x34b,-0x260,-0x249,-0x1f6)](_0x2896d2[_0x50e964(0x18a,0x195,0x206,0x13e,0x107)],_0x2896d2[_0x50e964(0x229,0x224,0x26c,0x272,0x31f)])){const _0x372a19=_0xa01e06?function(){function _0x3227eb(_0x54fa7e,_0x99feb,_0x381754,_0x4c2711,_0x2f3ae3){return _0x8b6e22(_0x4c2711,_0x99feb- -0x4ec,_0x381754-0x72,_0x4c2711-0x13c,_0x2f3ae3-0xe2);}function _0x3c7d13(_0x405d14,_0x322a83,_0x576b32,_0x124e30,_0x3de25f){return _0x3957fb(_0x576b32-0x2c,_0x322a83-0x49,_0x576b32-0x11a,_0x3de25f,_0x3de25f-0x3a);}function _0x3851d5(_0x86ef03,_0x2ecd24,_0x2875ca,_0x158f1d,_0x78fbb7){return _0x8b6e22(_0x2875ca,_0x158f1d- -0x2b,_0x2875ca-0x15a,_0x158f1d-0x1ef,_0x78fbb7-0x116);}function _0x34fb6c(_0x488ce1,_0x5912d6,_0x456beb,_0x1b6ded,_0x451eee){return _0x8b6e22(_0x488ce1,_0x5912d6- -0x49a,_0x456beb-0x1ed,_0x1b6ded-0x165,_0x451eee-0x24);}function _0x6ca94c(_0x3a439e,_0x142817,_0x254fe1,_0x85283e,_0x568af7){return _0x5de617(_0x3a439e-0x1a2,_0x142817-0x1ca,_0x254fe1-0x1b8,_0x85283e-0x166,_0x568af7);}const _0x2f8024={'moqUs':_0x178671[_0x3851d5(0x341,0x423,0x296,0x366,0x40c)],'GzidW':_0x178671[_0x3851d5(0x3e1,0x3a3,0x2ff,0x37b,0x38b)],'IOImw':function(_0x3dc962,_0x3c8a06){function _0x42538e(_0x12bba3,_0x4622c3,_0x262c91,_0x2296c2,_0x4b9d9b){return _0x3851d5(_0x12bba3-0x1d3,_0x4622c3-0x37,_0x4b9d9b,_0x12bba3- -0x14f,_0x4b9d9b-0x82);}return _0x178671[_0x42538e(0x117,0xeb,0x181,0xce,0x10d)](_0x3dc962,_0x3c8a06);},'LjbBO':_0x178671[_0x3227eb(-0x1a5,-0x151,-0x165,-0x1af,-0x159)],'tyFLp':function(_0x555825,_0x269f33){function _0x32c678(_0x3d22d1,_0x4a0947,_0x23f5e2,_0x1d9168,_0x1cfde8){return _0x3227eb(_0x3d22d1-0x135,_0x4a0947-0x1e7,_0x23f5e2-0x28,_0x3d22d1,_0x1cfde8-0x187);}return _0x178671[_0x32c678(0x148,0xb0,0x8d,0x16b,0x1c)](_0x555825,_0x269f33);},'vpUVL':_0x178671[_0x3227eb(-0x283,-0x1bb,-0x1b6,-0x1c8,-0x228)],'fJcXC':_0x178671[_0x6ca94c(0x37c,0x449,0x41e,0x48b,0x473)],'RkGDA':function(_0x3c14e9,_0x4ffec8){function _0x43ca6f(_0x352d30,_0x64b721,_0x37d924,_0x78b965,_0x37b0ca){return _0x34fb6c(_0x37b0ca,_0x352d30-0x17d,_0x37d924-0x1aa,_0x78b965-0x9c,_0x37b0ca-0x19);}return _0x178671[_0x43ca6f(0xb9,-0x13,0x99,-0xb,-0x1d)](_0x3c14e9,_0x4ffec8);},'hMzlL':function(_0x3b082b){function _0x49bd86(_0x48e8f1,_0x429a6c,_0x3d97c2,_0xd24fba,_0x5baa3a){return _0x3227eb(_0x48e8f1-0x14f,_0x5baa3a-0x313,_0x3d97c2-0x2e,_0x3d97c2,_0x5baa3a-0x14);}return _0x178671[_0x49bd86(0x1fa,0xc7,0x220,0x180,0x18d)](_0x3b082b);},'EIdyu':function(_0x5e4632,_0x1e83e0,_0x4f3377){function _0x639a21(_0x37a3b8,_0x1f41a7,_0x4e9985,_0x436498,_0xab1216){return _0x3851d5(_0x37a3b8-0x1c4,_0x1f41a7-0x169,_0x436498,_0x37a3b8- -0x1ba,_0xab1216-0x1d9);}return _0x178671[_0x639a21(0x18f,0x1de,0xb9,0x149,0x232)](_0x5e4632,_0x1e83e0,_0x4f3377);}};if(_0x178671[_0x6ca94c(0x563,0x4a0,0x526,0x4f2,0x48a)](_0x178671[_0x3851d5(0x317,0x25b,0x23b,0x2d0,0x24a)],_0x178671[_0x3227eb(-0x20e,-0x1f1,-0x2b5,-0x17a,-0x1bf)]))pLhWLz[_0x6ca94c(0x47c,0x3be,0x432,0x3e0,0x48d)](_0x405070,this,function(){function _0x5a0b0b(_0xa554d5,_0x2c449b,_0x57ac1d,_0x59556a,_0x51ff4f){return _0x3227eb(_0xa554d5-0x16d,_0x51ff4f-0x5bf,_0x57ac1d-0x197,_0x59556a,_0x51ff4f-0x1b5);}const _0x55e373=new _0x962979(pLhWLz[_0x5a0b0b(0x412,0x2ea,0x476,0x30f,0x39f)]);function _0x345958(_0x55cdd5,_0x24665d,_0x3d2346,_0x3a2ba3,_0x3170a8){return _0x6ca94c(_0x55cdd5-0xa4,_0x24665d- -0x4c7,_0x3d2346-0xc7,_0x3a2ba3-0x5a,_0x55cdd5);}const _0xe89a79=new _0x560d0e(pLhWLz[_0x5a0b0b(0x343,0x419,0x3e1,0x4e3,0x416)],'i');function _0x4633a4(_0x565789,_0x2240da,_0xd93134,_0x2e5a4b,_0x918b17){return _0x34fb6c(_0xd93134,_0x2e5a4b-0x333,_0xd93134-0x49,_0x2e5a4b-0xcd,_0x918b17-0x1d8);}function _0x182755(_0x5cbbfb,_0x36ff01,_0x4fc5d0,_0x38f45f,_0xc41154){return _0x34fb6c(_0x5cbbfb,_0xc41154- -0xec,_0x4fc5d0-0x156,_0x38f45f-0x108,_0xc41154-0x1af);}function _0x475060(_0x46f18f,_0x32e73e,_0x44d7aa,_0x3b0d43,_0x5ce8f7){return _0x3851d5(_0x46f18f-0xab,_0x32e73e-0x27,_0x46f18f,_0x44d7aa- -0x3b5,_0x5ce8f7-0xf4);}const _0x40371b=pLhWLz[_0x182755(-0x1df,-0x277,-0x28f,-0x1ac,-0x281)](_0x158487,pLhWLz[_0x182755(-0x377,-0x231,-0x2e6,-0x25d,-0x2af)]);!_0x55e373[_0x475060(0x15,-0x11b,-0xbb,-0x98,0x1b)](pLhWLz[_0x5a0b0b(0x350,0x386,0x2d6,0x3e4,0x348)](_0x40371b,pLhWLz[_0x475060(-0xe5,-0x17a,-0x158,-0x11a,-0xc5)]))||!_0xe89a79[_0x4633a4(0x28e,0x1a1,0x230,0x1be,0x12e)](pLhWLz[_0x4633a4(0x63,0x1b7,0x14c,0x10e,0x4a)](_0x40371b,pLhWLz[_0x4633a4(0xcc,0x21c,0x1da,0x14b,0xc5)]))?pLhWLz[_0x4633a4(0xd6,0x1aa,0x218,0x1af,0xe6)](_0x40371b,'0'):pLhWLz[_0x475060(0x10,-0x82,-0x58,-0xff,0x16)](_0x3519aa);})();else{if(_0x44b259){if(_0x178671[_0x3851d5(0x378,0x438,0x3cf,0x3bd,0x36a)](_0x178671[_0x3851d5(0x1f6,0x1e3,0x1ec,0x2bd,0x2b3)],_0x178671[_0x6ca94c(0x44f,0x528,0x486,0x594,0x470)]))return _0x1a2059;else{const _0x49e48e=_0x44b259[_0x3851d5(0x35c,0x410,0x317,0x368,0x314)](_0x122d3e,arguments);return _0x44b259=null,_0x49e48e;}}}}:function(){};return _0xa01e06=![],_0x372a19;}else{if(_0x56e6c2){const _0x2fe374=_0x241ae4[_0x5de617(0x2ea,0x2e5,0x239,0x362,0x3a5)](_0x361d5b,arguments);return _0x14f4d3=null,_0x2fe374;}}};}else{const _0x29dd5b=new _0x23fe9b(),_0x215804=_0x29dd5b[_0x5a65f4(0x3d8,0x35f,0x332,0x2a5,0x3be)+_0x484d32(0xbc,0x15e,0xec,0xbf,0x72)+_0x4e26ed(-0x12,-0x7d,-0x74,-0x8c,-0xfd)](_0x3ec8e8,_0x105ee5[_0x4e26ed(0x91,-0x3c,-0x36,-0x28,-0xa9)]),_0x10a6fc=_0x215804[_0x4e26ed(0x77,-0x21,-0xdd,-0xbd,-0xdb)+_0x1cfab4(-0x1c9,-0x275,-0x230,-0x1bf,-0x1b3)+_0x5a65f4(0x1ec,0x1bb,0x279,0x31a,0x204)](_0x105ee5[_0x1cfab4(-0x86,-0x152,-0xf2,-0x134,-0xa8)])?.[_0x529618(-0x20c,-0x78,-0x96,-0x8a,-0x151)+_0x1cfab4(-0x134,-0x1bf,-0xd8,-0x19d,-0x15f)+'t'][_0x1cfab4(-0x19a,-0xa3,-0x1bf,-0x13a,-0x62)+_0x5a65f4(0x182,0x28b,0x1e7,0x17c,0x216)+'e']()[_0x484d32(0x141,0x7c,0x117,0x14a,0x12c)+_0x4e26ed(-0x48,-0xdd,-0x15d,-0x187,-0xe5)]('\x20','');_0x10a6fc&&_0x10a6fc[_0x5a65f4(0x2c8,0x17c,0x254,0x304,0x18b)+_0x484d32(0x167,0xd7,0xea,0xb1,0x13)](_0x105ee5[_0x1cfab4(-0x19a,-0x255,-0x2d4,-0x230,-0x257)])&&(_0x28d92e[_0x484d32(0x12a,0x52,0xef,0x171,0x11e)+_0x5a65f4(0x2c9,0x241,0x236,0x257,0x26f)+_0x5a65f4(0x20e,0x2b8,0x1f4,0x120,0x2b9)][_0x484d32(-0x81,-0xa4,0x2f,0x67,0x9)+_0x5a65f4(0x27c,0x1ec,0x23e,0x1d1,0x186)]='');}}());function _0x4318ed(_0x2657b9,_0x173248,_0x53d980,_0x4683cf,_0x5f5323){return _0x1914(_0x2657b9- -0xe8,_0x4683cf);}function _0x5dea41(_0x5a349e,_0x1a22df,_0x502a20,_0x1719a5,_0x4d07db){return _0x1914(_0x1a22df-0x1d3,_0x1719a5);}function _0x53ed56(_0x210a90,_0x2565eb,_0x571777,_0x43ff83,_0x42e7b6){return _0x1914(_0x2565eb- -0x32a,_0x43ff83);}const _0xbcd7fb=_0x105ee5[_0x4318ed(0xa2,0x70,0x32,-0x1,0x20)](_0x20a1da,this,function(){function _0x4c64ae(_0x9ee76e,_0x2036b2,_0x265f71,_0x525291,_0x3f809a){return _0x66aa7(_0x525291,_0x2036b2-0xe8,_0x9ee76e-0x3f3,_0x525291-0x17f,_0x3f809a-0xb);}function _0x451629(_0x17624a,_0x190960,_0x9fec55,_0x40e578,_0x535448){return _0x5dea41(_0x17624a-0xe9,_0x9fec55- -0x29d,_0x9fec55-0x145,_0x40e578,_0x535448-0x79);}function _0x48f012(_0x6c1b30,_0x8d51b,_0x2871b4,_0x472cc0,_0x245910){return _0x5dea41(_0x6c1b30-0x140,_0x245910- -0x210,_0x2871b4-0x124,_0x8d51b,_0x245910-0xbe);}function _0x11d9e8(_0x393fd4,_0x2bdc6d,_0x36b4fe,_0xb7f54e,_0x224962){return _0x1c9983(_0x393fd4-0x3f,_0x2bdc6d-0x43,_0x36b4fe-0x1b2,_0xb7f54e,_0x393fd4-0x568);}function _0x521e25(_0x9e17f2,_0x3662cb,_0x5c72aa,_0x401859,_0x1b57b8){return _0x4318ed(_0x401859-0x11e,_0x3662cb-0x13a,_0x5c72aa-0xc9,_0x3662cb,_0x1b57b8-0x1a0);}if(_0x105ee5[_0x4c64ae(0x2e4,0x332,0x27a,0x2e6,0x319)](_0x105ee5[_0x521e25(0xd9,0xfd,0xfb,0x19f,0xe7)],_0x105ee5[_0x48f012(0xdf,0x83,0x3e,0x13d,0xb7)]))return _0xbcd7fb[_0x48f012(0x12e,0x1fc,0x148,0x162,0x17d)+_0x521e25(0xfc,0x183,0x1fc,0x153,0xe3)]()[_0x48f012(0x165,0x168,0xfa,0x25b,0x1cf)+'h'](_0x105ee5[_0x521e25(0x162,0x202,0x1c5,0x20c,0x256)])[_0x11d9e8(0x3e9,0x4ae,0x4b9,0x356,0x351)+_0x521e25(0x1c1,0x1ad,0x17d,0x153,0xd5)]()[_0x4c64ae(0x2da,0x30d,0x312,0x20f,0x26e)+_0x11d9e8(0x38d,0x3bb,0x2b8,0x452,0x40f)+'r'](_0xbcd7fb)[_0x521e25(0x26a,0x2b3,0x319,0x242,0x22d)+'h'](_0x105ee5[_0x451629(0x194,0x1e4,0x10c,0x6f,0x71)]);else{const _0x286c47=_0x3380d3?function(){function _0x3cfbac(_0xa5a6c4,_0x2f29b8,_0x4063da,_0x291ecd,_0x4b7065){return _0x451629(_0xa5a6c4-0x13f,_0x2f29b8-0x13a,_0x2f29b8-0x4a6,_0x291ecd,_0x4b7065-0x118);}if(_0x378f1d){const _0x2014a3=_0x234218[_0x3cfbac(0x4f8,0x573,0x4a3,0x5f4,0x56e)](_0x9b4f87,arguments);return _0x1ae556=null,_0x2014a3;}}:function(){};return _0x47e05d=![],_0x286c47;}});function _0x66aa7(_0x305a61,_0x49ca8d,_0x2d1e27,_0x20fd5c,_0x71d60e){return _0x1914(_0x2d1e27- -0x2b4,_0x305a61);}_0x105ee5[_0x5dea41(0x29e,0x2c4,0x2da,0x34e,0x36b)](_0xbcd7fb);const _0x55a234=(function(){function _0x35dc0f(_0x516f00,_0x2261a0,_0x5e95ab,_0x5afd86,_0x4076e1){return _0x66aa7(_0x516f00,_0x2261a0-0x1ab,_0x4076e1-0x2f,_0x5afd86-0x19f,_0x4076e1-0x3b);}function _0x590152(_0x11d290,_0x42ca2c,_0x5327bf,_0x793b41,_0x105775){return _0x1c9983(_0x11d290-0x4a,_0x42ca2c-0x136,_0x5327bf-0x2c,_0x793b41,_0x105775-0x38b);}function _0x1070bc(_0x5191c5,_0x4ab9f9,_0x55408f,_0x5654aa,_0xfc590d){return _0x53ed56(_0x5191c5-0x180,_0x5654aa-0xa2,_0x55408f-0x1aa,_0xfc590d,_0xfc590d-0x123);}function _0x1038e9(_0x309236,_0x3d13d8,_0x482b73,_0x46dbc6,_0x102597){return _0x66aa7(_0x482b73,_0x3d13d8-0x12a,_0x46dbc6-0x615,_0x46dbc6-0x130,_0x102597-0xa1);}function _0x4cb736(_0x4eaf44,_0x3bc842,_0x1ec3b1,_0x44113d,_0x36ce15){return _0x53ed56(_0x4eaf44-0x1a5,_0x44113d-0x5b5,_0x1ec3b1-0x4b,_0x3bc842,_0x36ce15-0x5f);}const _0x11b821={'kjdmX':function(_0x346b8f,_0x1b29fb){function _0x3789c4(_0x2000f3,_0xb7989a,_0x4a0a18,_0x523e81,_0x3850d8){return _0x1914(_0x523e81- -0x205,_0xb7989a);}return _0x105ee5[_0x3789c4(-0xe7,-0x1b4,-0x1dd,-0x138,-0x20e)](_0x346b8f,_0x1b29fb);},'bzJIl':function(_0x1e9380,_0x53eca0){function _0x7dfdea(_0x4fdb84,_0x2c6f82,_0x30ce12,_0x1ba9e3,_0x2046bd){return _0x1914(_0x4fdb84-0x1cd,_0x2046bd);}return _0x105ee5[_0x7dfdea(0x245,0x24d,0x23c,0x1a4,0x180)](_0x1e9380,_0x53eca0);},'MXZBh':_0x105ee5[_0x1070bc(-0xe1,-0x181,-0x14d,-0x1a3,-0x25b)],'MIMCl':_0x105ee5[_0x1038e9(0x4e5,0x52b,0x4bf,0x497,0x41f)],'FmLcv':function(_0x38fb18){function _0x50b7fc(_0x486e31,_0x1ea776,_0x1c02a8,_0x35b1e4,_0x1f8808){return _0x1038e9(_0x486e31-0x110,_0x1ea776-0x1b0,_0x1f8808,_0x1c02a8- -0x568,_0x1f8808-0x107);}return _0x105ee5[_0x50b7fc(-0x86,-0xbb,-0x116,-0x199,-0x17c)](_0x38fb18);},'jJxgg':function(_0xf98587,_0x5075ae){function _0x247222(_0x5e4cd8,_0x427429,_0x3121d1,_0x21dc64,_0x3ea737){return _0x1038e9(_0x5e4cd8-0x9e,_0x427429-0x108,_0x3121d1,_0x21dc64- -0x28b,_0x3ea737-0x197);}return _0x105ee5[_0x247222(0x1f1,0x1c5,0x295,0x27b,0x27d)](_0xf98587,_0x5075ae);},'OEXXc':_0x105ee5[_0x35dc0f(-0x8,-0x144,-0x101,-0x11d,-0x90)],'OnsqM':function(_0x2eca3f,_0x1a6a88){function _0x1d1032(_0x153241,_0x4c4429,_0x5295d6,_0x154121,_0x330e99){return _0x35dc0f(_0x153241,_0x4c4429-0xda,_0x5295d6-0x36,_0x154121-0x134,_0x330e99-0x2cd);}return _0x105ee5[_0x1d1032(0x2bb,0x2df,0x2bf,0x178,0x224)](_0x2eca3f,_0x1a6a88);},'zyJIq':_0x105ee5[_0x1070bc(-0x106,-0x88,-0x26,-0xc0,-0x137)],'MPbpl':_0x105ee5[_0x4cb736(0x3a1,0x3a5,0x2e5,0x315,0x29d)],'thuMg':_0x105ee5[_0x4cb736(0x407,0x3ce,0x509,0x439,0x4c7)]};if(_0x105ee5[_0x1070bc(-0x189,-0x27,-0x9b,-0xe3,-0xe2)](_0x105ee5[_0x590152(0xda,0x20d,0x188,0x8c,0x139)],_0x105ee5[_0x4cb736(0x316,0x2be,0x32e,0x372,0x3b7)]))_0x27e86a=_0x37366d;else{let _0x27b9bb=!![];return function(_0x25e9d4,_0x7d21de){function _0x38af67(_0x35899c,_0x54babf,_0x22c554,_0x6431d7,_0x5592d9){return _0x4cb736(_0x35899c-0xa3,_0x6431d7,_0x22c554-0x1af,_0x22c554- -0x659,_0x5592d9-0x54);}function _0x1b0402(_0x5c4835,_0x5ebeb2,_0x3fdeb9,_0x3b928c,_0x281fbd){return _0x590152(_0x5c4835-0x44,_0x5ebeb2-0x41,_0x3fdeb9-0x118,_0x281fbd,_0x3b928c-0x24f);}function _0x19375c(_0x41406a,_0x69b24a,_0x360e23,_0x27cec2,_0x3457dc){return _0x35dc0f(_0x27cec2,_0x69b24a-0x126,_0x360e23-0x2f,_0x27cec2-0x135,_0x360e23-0x460);}function _0x47b890(_0x37e1d1,_0x674887,_0x333ba6,_0x5b4224,_0x2edece){return _0x590152(_0x37e1d1-0x8,_0x674887-0x1d5,_0x333ba6-0x9,_0x333ba6,_0x5b4224- -0x312);}function _0x50d329(_0x352fad,_0x4b3b67,_0x2390b2,_0x2a26fb,_0x169848){return _0x4cb736(_0x352fad-0x190,_0x4b3b67,_0x2390b2-0x9b,_0x2390b2- -0x556,_0x169848-0x56);}const _0x3f6554={'eGBnO':function(_0x145230,_0x4390b4){function _0x5590c9(_0x3a3a02,_0x114cf2,_0x3e3e9c,_0xa24f60,_0x2bd500){return _0x1914(_0x114cf2-0x1a6,_0x2bd500);}return _0x11b821[_0x5590c9(0x3b8,0x2f9,0x2eb,0x2a7,0x2ce)](_0x145230,_0x4390b4);},'zhizj':function(_0xea9db5,_0x479cc3){function _0x35d3e8(_0x5a4c73,_0x562271,_0x437608,_0x59714f,_0x50da45){return _0x1914(_0x59714f- -0x10f,_0x437608);}return _0x11b821[_0x35d3e8(-0x41,-0xc2,0x2a,0x0,0xc3)](_0xea9db5,_0x479cc3);},'VImrv':_0x11b821[_0x19375c(0x2f1,0x2bb,0x2af,0x383,0x29a)],'FxIRe':_0x11b821[_0x1b0402(0x3b1,0x423,0x426,0x3c9,0x486)],'fIfhc':function(_0x2e9dab){function _0x49ab8f(_0x20f990,_0x45b9b3,_0x3ed4f0,_0x2afe9e,_0x5f3ec8){return _0x1b0402(_0x20f990-0x10b,_0x45b9b3-0x165,_0x3ed4f0-0x44,_0x5f3ec8-0x57,_0x3ed4f0);}return _0x11b821[_0x49ab8f(0x387,0x3fd,0x407,0x499,0x3d0)](_0x2e9dab);},'uUjNg':function(_0x504fb4,_0x3e0a88){function _0x1b2bba(_0x42dbce,_0x5838f0,_0x175fe5,_0x5ab393,_0x3ac93e){return _0x19375c(_0x42dbce-0x6f,_0x5838f0-0x79,_0x42dbce- -0x1a2,_0x3ac93e,_0x3ac93e-0x10f);}return _0x11b821[_0x1b2bba(0xda,0x37,0x156,0x13a,0x167)](_0x504fb4,_0x3e0a88);},'zuMia':_0x11b821[_0x19375c(0x2ec,0x3d3,0x35d,0x2b5,0x3a4)],'KsgAy':function(_0x881313,_0x498835){function _0x379aaa(_0xaf0bd1,_0x5123ba,_0xd352ae,_0x338d3b,_0x15f053){return _0x1b0402(_0xaf0bd1-0xb4,_0x5123ba-0xb,_0xd352ae-0x13b,_0x5123ba- -0x2ed,_0x338d3b);}return _0x11b821[_0x379aaa(0x1d4,0x1be,0x259,0x217,0x16f)](_0x881313,_0x498835);},'LLRFE':_0x11b821[_0x19375c(0x3cd,0x333,0x3ad,0x444,0x31e)],'QWytE':_0x11b821[_0x38af67(-0x3ab,-0x3c6,-0x332,-0x260,-0x3a2)]};if(_0x11b821[_0x50d329(-0x2c8,-0x1af,-0x22a,-0x277,-0x1dd)](_0x11b821[_0x38af67(-0x3f6,-0x332,-0x34c,-0x307,-0x365)],_0x11b821[_0x1b0402(0x2e0,0x2ff,0x296,0x323,0x272)])){let _0x4dfb5c;try{const _0x1e1793=nkPUJr[_0x47b890(-0x14b,-0x74,-0x97,-0xb1,-0x44)](_0x5bcecd,nkPUJr[_0x19375c(0x2a4,0x360,0x325,0x27d,0x2bb)](nkPUJr[_0x50d329(-0x237,-0x25a,-0x181,-0x211,-0x242)](nkPUJr[_0x1b0402(0x3e1,0x499,0x50e,0x458,0x4d8)],nkPUJr[_0x38af67(-0x318,-0x376,-0x2f2,-0x279,-0x21e)]),');'));_0x4dfb5c=nkPUJr[_0x50d329(-0x224,-0x265,-0x1bd,-0x17b,-0x248)](_0x1e1793);}catch(_0x8cda8a){_0x4dfb5c=_0x306f0d;}_0x4dfb5c[_0x50d329(-0x10e,-0x206,-0x1b0,-0x227,-0x1be)+_0x38af67(-0x291,-0x2ef,-0x30a,-0x24a,-0x2ce)+'l'](_0x277e4a,0x1715+0xf8f+-0x6*0x3d6);}else{const _0x1c5db1=_0x27b9bb?function(){function _0x14e24d(_0x55fa62,_0x369914,_0x132d22,_0x37d51c,_0x5a6456){return _0x19375c(_0x55fa62-0x69,_0x369914-0x1ab,_0x37d51c- -0x2c6,_0x132d22,_0x5a6456-0x140);}function _0x2fcfec(_0x161596,_0x224f24,_0xa3d042,_0x216de2,_0x4403ea){return _0x19375c(_0x161596-0x193,_0x224f24-0x105,_0x216de2-0x1f5,_0xa3d042,_0x4403ea-0x1e5);}const _0x1e51be={'hzbwb':function(_0x1ecd14,_0x10a733){function _0x444e36(_0x3be2fd,_0x1c7e54,_0x30c37f,_0x170487,_0x4025b8){return _0x1914(_0x1c7e54- -0x116,_0x30c37f);}return _0x3f6554[_0x444e36(0x107,0xf9,0x69,0x13a,0xbf)](_0x1ecd14,_0x10a733);},'RCrlo':function(_0x410240,_0x3ba4bb){function _0x3e729c(_0x5b1f4f,_0x339a00,_0x282c10,_0x56db4d,_0x2ccc07){return _0x1914(_0x339a00- -0x3d8,_0x2ccc07);}return _0x3f6554[_0x3e729c(-0x2b6,-0x28e,-0x2ae,-0x1bb,-0x2df)](_0x410240,_0x3ba4bb);},'WrTLT':_0x3f6554[_0x2fcfec(0x5af,0x4f5,0x512,0x587,0x591)],'trbcT':_0x3f6554[_0x284e73(-0xb4,-0xa3,-0x120,-0xeb,-0x16d)],'VfVNf':function(_0x10fb1a){function _0x2982d5(_0x3dc930,_0x168603,_0x7a5d03,_0x1d4bb9,_0x25801d){return _0x284e73(_0x25801d,_0x168603-0x23,_0x7a5d03-0x1d6,_0x7a5d03-0x40c,_0x25801d-0x167);}return _0x3f6554[_0x2982d5(0x3a1,0x405,0x353,0x3a0,0x30e)](_0x10fb1a);}};function _0x284e73(_0x8482c1,_0x38d51f,_0x69c982,_0x245562,_0x549bd0){return _0x50d329(_0x8482c1-0xe,_0x8482c1,_0x245562-0x104,_0x245562-0x138,_0x549bd0-0x189);}function _0x1be6d0(_0x547491,_0x367742,_0x2a9350,_0x514844,_0x31c79a){return _0x50d329(_0x547491-0x1a5,_0x31c79a,_0x514844-0x68a,_0x514844-0x123,_0x31c79a-0x18);}function _0x5cd516(_0x128ee3,_0xd1eace,_0x5b4c0e,_0x2a047b,_0x5cc73f){return _0x38af67(_0x128ee3-0x105,_0xd1eace-0x141,_0x128ee3-0x240,_0x2a047b,_0x5cc73f-0x16d);}if(_0x3f6554[_0x5cd516(-0x4a,0x26,0x27,-0x7e,0x6a)](_0x3f6554[_0x5cd516(-0xa,0x6,-0xba,-0x7a,-0x14)],_0x3f6554[_0x284e73(-0x108,-0x1b,0x4,-0x43,-0xff)]))return!![];else{if(_0x7d21de){if(_0x3f6554[_0x5cd516(0x5a,0xae,0x10f,0xc4,-0x24)](_0x3f6554[_0x284e73(0x32,-0x5a,-0x5a,0x58,0xa2)],_0x3f6554[_0x14e24d(-0x12,0xa0,-0x67,0x40,0x91)])){const _0x59fb84=eKWRYG[_0x5cd516(0x3d,-0x84,0xfa,0x31,0x10)](_0xb1b825,eKWRYG[_0x284e73(0x38,0x88,0xa5,0x3a,0x63)](eKWRYG[_0x1be6d0(0x60b,0x503,0x538,0x5c0,0x52f)](eKWRYG[_0x14e24d(0x15a,0x1a8,0x11e,0xd4,0x1b)],eKWRYG[_0x14e24d(0x20a,0x210,0x18a,0x136,0xc5)]),');'));_0xfef540=eKWRYG[_0x2fcfec(0x5eb,0x489,0x5ad,0x54d,0x53c)](_0x59fb84);}else{const _0x161925=_0x7d21de[_0x1be6d0(0x4ab,0x510,0x5ae,0x556,0x57a)](_0x25e9d4,arguments);return _0x7d21de=null,_0x161925;}}}}:function(){};return _0x27b9bb=![],_0x1c5db1;}};}}());(function(){function _0x1c89af(_0x538c4f,_0x4dd050,_0x2a16e9,_0x480744,_0x3cc2cc){return _0x53ed56(_0x538c4f-0xa8,_0x480744-0x45b,_0x2a16e9-0x2f,_0x4dd050,_0x3cc2cc-0x15e);}function _0x158656(_0x246a59,_0x84b09a,_0x4e96a4,_0x5ac44a,_0x459e6e){return _0x1c9983(_0x246a59-0x99,_0x84b09a-0x1d0,_0x4e96a4-0x76,_0x5ac44a,_0x246a59-0x14d);}function _0xa4ae9b(_0x33062c,_0xc52e6,_0x354c4a,_0x1e9231,_0x199980){return _0x66aa7(_0x33062c,_0xc52e6-0x1d,_0x199980-0x681,_0x1e9231-0x10b,_0x199980-0x16);}function _0x4ff1e7(_0x53bd35,_0x4486f7,_0x400bda,_0x25d222,_0x4e8173){return _0x53ed56(_0x53bd35-0xa0,_0x4486f7-0xf5,_0x400bda-0x1c3,_0x53bd35,_0x4e8173-0x137);}const _0x3c714b={'NxZPY':function(_0x1cdf50,_0x1375f1){function _0x548680(_0x4a92b5,_0x204d68,_0x35d863,_0x127e85,_0x4172bb){return _0x1914(_0x127e85- -0x16,_0x4a92b5);}return _0x105ee5[_0x548680(0x128,0x17b,0x174,0x13a,0x1f3)](_0x1cdf50,_0x1375f1);},'hoyWb':function(_0x2906aa,_0xe71a0){function _0x23f52a(_0x1b85a4,_0x2b1ca1,_0x43cdbb,_0x2b8611,_0x2830dc){return _0x1914(_0x2b8611- -0x362,_0x2830dc);}return _0x105ee5[_0x23f52a(-0x113,-0x16d,-0x139,-0x148,-0x1f7)](_0x2906aa,_0xe71a0);},'jlrLe':_0x105ee5[_0xa4ae9b(0x5fc,0x684,0x5e7,0x648,0x5bd)],'xlnrI':_0x105ee5[_0x4ff1e7(-0x240,-0x18c,-0x157,-0xc1,-0xe2)],'bKwAT':_0x105ee5[_0x431b56(0x362,0x349,0x37d,0x412,0x39f)],'qZfVo':function(_0x39ad9e,_0x40bd72){function _0xc060f0(_0x32bee9,_0x36e7ea,_0x19dd4e,_0x1be6cd,_0x5946d6){return _0x431b56(_0x5946d6,_0x36e7ea-0x9b,_0x19dd4e- -0xbd,_0x1be6cd-0xa0,_0x5946d6-0x16d);}return _0x105ee5[_0xc060f0(0x403,0x288,0x329,0x299,0x368)](_0x39ad9e,_0x40bd72);},'IGWnr':_0x105ee5[_0x4ff1e7(-0x12,-0xe8,-0x5f,-0x78,-0x54)],'dzohJ':_0x105ee5[_0x158656(-0x116,-0x137,-0x15c,-0x4c,-0x10c)],'HACBD':_0x105ee5[_0xa4ae9b(0x4e9,0x4c5,0x58f,0x5a1,0x4d8)],'xVAID':_0x105ee5[_0x431b56(0x277,0x35e,0x331,0x3d0,0x359)],'MtnLE':function(_0x15175d,_0x2eaf1a){function _0x40cdf4(_0x327ec9,_0x10b58e,_0x199b65,_0x43e986,_0x243134){return _0xa4ae9b(_0x10b58e,_0x10b58e-0x18c,_0x199b65-0x115,_0x43e986-0xee,_0x43e986- -0x2c5);}return _0x105ee5[_0x40cdf4(0x221,0x245,0xf1,0x180,0x1b7)](_0x15175d,_0x2eaf1a);},'vysdL':_0x105ee5[_0x4ff1e7(0x21,-0x64,-0x72,0x4a,-0xfa)],'xcLKt':function(_0x5dec5b,_0x296639){function _0x2b5a2e(_0x4c7782,_0x58aad6,_0x2825d4,_0x4b6b76,_0x57b0c9){return _0x1c89af(_0x4c7782-0x35,_0x4b6b76,_0x2825d4-0x4e,_0x58aad6- -0x48f,_0x57b0c9-0x16c);}return _0x105ee5[_0x2b5a2e(-0x36e,-0x2e6,-0x2b5,-0x2d6,-0x2c2)](_0x5dec5b,_0x296639);},'myAXH':_0x105ee5[_0x431b56(0x3d7,0x383,0x31d,0x3c2,0x341)],'fwUUE':function(_0x15f656,_0x546996){function _0xac43f8(_0x3aaf5f,_0x1d7c67,_0x28559c,_0x1dabfe,_0x25546a){return _0xa4ae9b(_0x1dabfe,_0x1d7c67-0x195,_0x28559c-0x6,_0x1dabfe-0x124,_0x28559c- -0x436);}return _0x105ee5[_0xac43f8(0x171,0x155,0x13c,0xc7,0x1d3)](_0x15f656,_0x546996);},'uNzBo':_0x105ee5[_0x4ff1e7(-0x122,-0x15e,-0x203,-0x18b,-0x176)],'gHAgS':function(_0x345b60,_0x1f7e56){function _0x51ff22(_0x1229cc,_0x2637fe,_0x12448e,_0x1abd70,_0x2330c0){return _0x4ff1e7(_0x2637fe,_0x12448e-0x583,_0x12448e-0xbb,_0x1abd70-0x7c,_0x2330c0-0xc4);}return _0x105ee5[_0x51ff22(0x373,0x411,0x3c1,0x493,0x386)](_0x345b60,_0x1f7e56);},'NaSwh':_0x105ee5[_0x158656(-0xbe,-0x25,-0x16b,-0xb3,-0x18a)],'oLaVd':function(_0x4bd253){function _0x4f3ac0(_0xd447e6,_0x1aae6a,_0x39d024,_0x441cc7,_0x590792){return _0xa4ae9b(_0xd447e6,_0x1aae6a-0xf9,_0x39d024-0x12d,_0x441cc7-0x179,_0x441cc7- -0x68f);}return _0x105ee5[_0x4f3ac0(-0x2d3,-0x251,-0x21e,-0x222,-0x22c)](_0x4bd253);}};function _0x431b56(_0x49b240,_0x503772,_0x4210ef,_0x3c4b80,_0x17e9c3){return _0x66aa7(_0x49b240,_0x503772-0x7,_0x4210ef-0x4be,_0x3c4b80-0x85,_0x17e9c3-0x1da);}if(_0x105ee5[_0x431b56(0x356,0x3fb,0x3e6,0x3c1,0x465)](_0x105ee5[_0x158656(-0xfd,-0x13a,-0xe4,-0x129,-0x2e)],_0x105ee5[_0xa4ae9b(0x4c5,0x407,0x416,0x431,0x4bc)]))_0x105ee5[_0x431b56(0x324,0x417,0x394,0x45f,0x3e8)](_0x55a234,this,function(){function _0x4353d8(_0x5bf40b,_0x26568e,_0x1e1237,_0x4acef1,_0x24d32d){return _0x158656(_0x5bf40b-0x30,_0x26568e-0x104,_0x1e1237-0x0,_0x26568e,_0x24d32d-0x8);}const _0x5ecd43={'pWtoL':function(_0x3357e2,_0x399561){function _0x33d366(_0x5638cb,_0x1426ee,_0x1160fa,_0x11cdd3,_0x246438){return _0x1914(_0x1160fa- -0x3d7,_0x11cdd3);}return _0x3c714b[_0x33d366(-0x3c3,-0x2c6,-0x345,-0x2d2,-0x27a)](_0x3357e2,_0x399561);},'yfyIQ':function(_0x3a91fa,_0x4057e5){function _0x4e4d02(_0x3fb6bb,_0x132c7b,_0x11677f,_0x3907dc,_0x28c15d){return _0x1914(_0x132c7b-0x2f0,_0x3907dc);}return _0x3c714b[_0x4e4d02(0x499,0x512,0x513,0x489,0x57b)](_0x3a91fa,_0x4057e5);},'oJYvF':_0x3c714b[_0xc62f54(-0xdc,0x1d,-0x22,-0x51,0x47)],'kmwTi':_0x3c714b[_0xc62f54(0x4f,0x98,0x5c,0x120,0x15b)],'abkAb':_0x3c714b[_0xc62f54(-0x87,-0x8e,-0x1e,-0x28,-0x34)]};function _0x4f229d(_0x5a2985,_0x58a89b,_0x350aef,_0x2ee6c4,_0x34b125){return _0x158656(_0x5a2985-0x28b,_0x58a89b-0x133,_0x350aef-0xa4,_0x2ee6c4,_0x34b125-0x161);}function _0x395b4d(_0x133c7f,_0x3a0a9a,_0x435e9d,_0x31ef5e,_0x1916ec){return _0x431b56(_0x435e9d,_0x3a0a9a-0xda,_0x31ef5e- -0xb7,_0x31ef5e-0x9a,_0x1916ec-0xcb);}function _0x41a39d(_0x571bf5,_0x5572f5,_0x3fbde4,_0x445103,_0x50412d){return _0x158656(_0x3fbde4- -0x118,_0x5572f5-0xa4,_0x3fbde4-0xe9,_0x5572f5,_0x50412d-0x1ea);}function _0xc62f54(_0x50fc14,_0x969ae3,_0x3cd349,_0xe95580,_0x224fa7){return _0x158656(_0xe95580-0x113,_0x969ae3-0x10a,_0x3cd349-0x1d1,_0x969ae3,_0x224fa7-0x1d3);}if(_0x3c714b[_0xc62f54(0x162,0x19e,0x172,0x130,0xea)](_0x3c714b[_0x4353d8(-0xe9,-0xb3,-0xc4,-0x44,-0x8a)],_0x3c714b[_0x41a39d(-0x18c,-0x2d8,-0x231,-0x2ed,-0x163)])){const _0x6bf344=new RegExp(_0x3c714b[_0x395b4d(0x2b1,0x24f,0x1b7,0x290,0x26f)]),_0x2d1c72=new RegExp(_0x3c714b[_0x395b4d(0x360,0x2ca,0x34f,0x2ae,0x2ac)],'i'),_0x62c501=_0x3c714b[_0x4353d8(-0x12a,-0x101,-0x9e,-0x7a,-0x114)](_0x14e92b,_0x3c714b[_0x395b4d(0x25d,0x3c1,0x315,0x331,0x3c8)]);!_0x6bf344[_0x395b4d(0x2d0,0x338,0x266,0x27c,0x1df)](_0x3c714b[_0x395b4d(0x25a,0x35f,0x33c,0x285,0x2a4)](_0x62c501,_0x3c714b[_0x4f229d(0x282,0x274,0x289,0x303,0x30d)]))||!_0x2d1c72[_0x395b4d(0x30e,0x273,0x261,0x27c,0x2d2)](_0x3c714b[_0x41a39d(-0x1b3,-0x207,-0x184,-0xac,-0xbe)](_0x62c501,_0x3c714b[_0x395b4d(0x250,0x163,0x1b9,0x1f2,0x1e3)]))?_0x3c714b[_0x395b4d(0x2d0,0x306,0x259,0x230,0x211)](_0x3c714b[_0x4f229d(0x24f,0x263,0x248,0x202,0x307)],_0x3c714b[_0x395b4d(0x2fb,0x2c5,0x33d,0x303,0x268)])?_0x571a89=_0x45344d:_0x3c714b[_0x4f229d(0x11c,0x1ce,0x1dc,0x1ec,0x1dd)](_0x62c501,'0'):_0x3c714b[_0x4353d8(0x4d,-0x50,0xd3,-0x3,-0x42)](_0x3c714b[_0x41a39d(-0x51,-0x48,-0xef,-0x6c,-0x15c)],_0x3c714b[_0x395b4d(0x3f9,0x39a,0x413,0x368,0x438)])?_0x3c714b[_0x395b4d(0x213,0x2fb,0x30e,0x24c,0x236)](_0x14e92b):mgspiL[_0x395b4d(0x2f4,0x3cc,0x279,0x32e,0x2f6)](_0x2aabe5,'0');}else(function(){return!![];}[_0xc62f54(0x4b,0x153,0x31,0xc2,0x46)+_0x395b4d(0x386,0x23c,0x2e9,0x2b1,0x203)+'r'](mgspiL[_0x41a39d(-0x1b3,-0x205,-0x168,-0x1fc,-0x233)](mgspiL[_0x41a39d(-0x1a9,-0x12a,-0x181,-0x1fe,-0xa8)],mgspiL[_0x4353d8(-0xb,-0x4d,0x86,-0x2a,-0x9a)]))[_0x395b4d(0x37f,0x237,0x2af,0x2fe,0x33a)](mgspiL[_0x41a39d(-0x295,-0x2bf,-0x258,-0x1c4,-0x2f9)]));})();else{if(_0x2f571f){const _0x4db9d5=_0x3cbd2f[_0xa4ae9b(0x5c2,0x638,0x564,0x48e,0x564)](_0x6c5f10,arguments);return _0x385f8f=null,_0x4db9d5;}}}());function _0x1c9983(_0x306a50,_0x3472bd,_0x3b2bc0,_0x4dd60a,_0x52d887){return _0x1914(_0x52d887- -0x339,_0x4dd60a);}const _0x11eee7=(function(){function _0x2dd65f(_0x42406e,_0xa1e3db,_0xf25009,_0x4d9886,_0x1fe843){return _0x4318ed(_0xf25009- -0xcc,_0xa1e3db-0x163,_0xf25009-0x17a,_0xa1e3db,_0x1fe843-0xeb);}const _0x2f8f22={'prsVn':function(_0x132b15,_0x53c508){function _0xb8056b(_0x44105d,_0x13e50b,_0x1e5d1a,_0x30b3db,_0x53469a){return _0x1914(_0x1e5d1a-0x14a,_0x44105d);}return _0x105ee5[_0xb8056b(0x355,0x25e,0x331,0x2a4,0x2d0)](_0x132b15,_0x53c508);},'YKwGX':function(_0x4d9743,_0x51aff8){function _0x55f420(_0x1d5f68,_0x4462a9,_0x57113b,_0x3b453e,_0x2247dd){return _0x1914(_0x2247dd- -0x353,_0x1d5f68);}return _0x105ee5[_0x55f420(-0xf6,-0x147,-0x17b,-0x26b,-0x1b9)](_0x4d9743,_0x51aff8);},'FmMiJ':_0x105ee5[_0xa305c3(0x139,0x65,0x117,0x64,0xd1)],'wnQrL':function(_0x1270fe,_0x280e57){function _0x14291a(_0x5376aa,_0x308c76,_0x2a1c6f,_0xd3665b,_0x28fb4a){return _0xa305c3(_0xd3665b-0x1ba,_0x308c76-0x100,_0x2a1c6f-0x68,_0xd3665b-0x1b8,_0x28fb4a);}return _0x105ee5[_0x14291a(0x384,0x3cb,0x2cd,0x309,0x2f6)](_0x1270fe,_0x280e57);},'mqNRC':_0x105ee5[_0xa305c3(0x121,0x13a,0x17b,0xf0,0x15d)],'YWXxX':function(_0x50c700,_0x4280e4){function _0x3c3c68(_0x45c3b5,_0x32be06,_0x351b62,_0x50ef2f,_0x5ee916){return _0x55ec32(_0x5ee916,_0x50ef2f-0x144,_0x351b62-0x16f,_0x50ef2f-0x1ef,_0x5ee916-0x1e7);}return _0x105ee5[_0x3c3c68(-0x102,-0x9d,-0x6b,-0xf8,-0xaa)](_0x50c700,_0x4280e4);},'eLnSp':_0x105ee5[_0xa305c3(0x68,0x100,0xdd,0xc2,0x133)],'gIcvU':_0x105ee5[_0x55ec32(-0x2ac,-0x1ed,-0x242,-0x1d2,-0x162)]};function _0x55ec32(_0x2f293e,_0x3c1d75,_0x201416,_0x303ad3,_0x518e43){return _0x1c9983(_0x2f293e-0xa4,_0x3c1d75-0x4d,_0x201416-0x130,_0x2f293e,_0x3c1d75- -0x89);}function _0x3b35b5(_0x381f73,_0x9b3def,_0xfe1a60,_0x27085d,_0x5935ea){return _0x4318ed(_0x5935ea-0x30c,_0x9b3def-0x103,_0xfe1a60-0x18a,_0x381f73,_0x5935ea-0x2);}function _0x3d97b0(_0x1f2671,_0x4e937a,_0x57ce04,_0xa85dfd,_0x1fe1d4){return _0x53ed56(_0x1f2671-0xb6,_0x1fe1d4-0x48d,_0x57ce04-0x89,_0xa85dfd,_0x1fe1d4-0x12e);}function _0xa305c3(_0x26f6b3,_0xd0bc61,_0x271bdb,_0x4ccb0c,_0x8fac60){return _0x66aa7(_0x8fac60,_0xd0bc61-0xe3,_0x26f6b3-0x25e,_0x4ccb0c-0x1e4,_0x8fac60-0x61);}if(_0x105ee5[_0xa305c3(0x14f,0x114,0x1a4,0x1f3,0xf2)](_0x105ee5[_0xa305c3(0x148,0x1c7,0x136,0x1bf,0xad)],_0x105ee5[_0xa305c3(0x143,0x17d,0x12a,0x79,0x219)])){let _0x31a0fe=!![];return function(_0x9d74f0,_0x4d765d){function _0x47c8a1(_0xc7382,_0x269fa1,_0x3570cb,_0x2d00b6,_0x1f92ed){return _0xa305c3(_0x269fa1- -0xb7,_0x269fa1-0x13d,_0x3570cb-0x158,_0x2d00b6-0x166,_0x3570cb);}const _0x249457={'zQyOy':function(_0x1e6f4c,_0x2586c0){function _0x4fd3b1(_0x1daee1,_0x3a9c30,_0x261c3f,_0xca699d,_0x52d831){return _0x1914(_0x3a9c30- -0x227,_0x1daee1);}return _0x2f8f22[_0x4fd3b1(-0x121,-0x8f,-0x4c,-0x3c,-0x140)](_0x1e6f4c,_0x2586c0);},'TwwiN':function(_0xb0baea,_0x52af0e){function _0x2940ce(_0x202b4b,_0x204789,_0xc6da28,_0x3bd80e,_0x15ca8d){return _0x1914(_0x3bd80e-0x34b,_0x204789);}return _0x2f8f22[_0x2940ce(0x434,0x3d7,0x3bb,0x413,0x49f)](_0xb0baea,_0x52af0e);},'bsWHI':_0x2f8f22[_0x500b4b(0x264,0x130,0x280,0x1e0,0x1a1)],'xPxNE':function(_0x41f68a,_0x248b7d){function _0x544849(_0x92c5ce,_0x5bc53b,_0xbbe642,_0x10f052,_0x44f757){return _0x500b4b(_0x44f757,_0x5bc53b-0x11,_0xbbe642-0x1c1,_0x92c5ce-0x8,_0x44f757-0x17b);}return _0x2f8f22[_0x544849(0xaf,0xdc,0x81,-0x2b,0xbf)](_0x41f68a,_0x248b7d);},'NkYoc':_0x2f8f22[_0x30f365(0x161,0x14b,0x1f2,0x149,0x211)]};function _0xfc50b(_0x3051a9,_0x575c68,_0x539e33,_0x931aa4,_0x5724ca){return _0x3b35b5(_0x3051a9,_0x575c68-0x1d1,_0x539e33-0x10e,_0x931aa4-0xc2,_0x575c68- -0x143);}function _0x500b4b(_0x5788a2,_0x7fa8b,_0x4694ca,_0x55db31,_0x44504b){return _0x2dd65f(_0x5788a2-0x1ee,_0x5788a2,_0x55db31-0x1ab,_0x55db31-0x1b6,_0x44504b-0x75);}function _0x30f365(_0x406ee5,_0xef7fd4,_0x2a8246,_0x109dd1,_0x3ec1e5){return _0x3d97b0(_0x406ee5-0x59,_0xef7fd4-0x54,_0x2a8246-0x1c,_0xef7fd4,_0x3ec1e5-0x30);}function _0x52bd3(_0x58fbdd,_0x1ba078,_0x1e93e7,_0x40ac3b,_0xa4ede8){return _0xa305c3(_0xa4ede8-0xaa,_0x1ba078-0x86,_0x1e93e7-0x1b9,_0x40ac3b-0x112,_0x58fbdd);}if(_0x2f8f22[_0x500b4b(0x5e,0x165,0xc2,0xaa,0x93)](_0x2f8f22[_0x30f365(0x228,0x248,0x343,0x29d,0x2f7)],_0x2f8f22[_0x500b4b(0x198,0x1f9,0x249,0x171,0x13a)])){const _0x3d39cc=_0x13404b?function(){function _0x1cc8a3(_0x45b83e,_0x35e1b0,_0x2278e0,_0x2fa3a2,_0x1acef8){return _0x52bd3(_0x2278e0,_0x35e1b0-0x1ba,_0x2278e0-0xdc,_0x2fa3a2-0x13,_0x35e1b0- -0x126);}if(_0x1a2438){const _0x456a99=_0x5c50cf[_0x1cc8a3(0x10a,0xc5,0x4b,0x79,0x30)](_0x14f8f9,arguments);return _0x516c24=null,_0x456a99;}}:function(){};return _0xc3d91b=![],_0x3d39cc;}else{const _0x18fde3=_0x31a0fe?function(){function _0x23d2dd(_0x4f4b10,_0x17c067,_0x37fb11,_0x75eaaa,_0x1180fb){return _0x30f365(_0x4f4b10-0x5a,_0x17c067,_0x37fb11-0xdd,_0x75eaaa-0xba,_0x1180fb- -0x76);}function _0x135232(_0x1c7e7f,_0x176bc9,_0x3e1b72,_0x22af61,_0x2c76eb){return _0xfc50b(_0x1c7e7f,_0x176bc9-0x2b1,_0x3e1b72-0x1cf,_0x22af61-0x1a4,_0x2c76eb-0x1b);}const _0x2e98a9={'QKata':function(_0x423ca8,_0x1134ea){function _0x68fce5(_0x25f922,_0x53b2d0,_0x40461a,_0x511349,_0x11148c){return _0x1914(_0x40461a-0x2d8,_0x11148c);}return _0x249457[_0x68fce5(0x448,0x383,0x42c,0x394,0x3e5)](_0x423ca8,_0x1134ea);}};function _0xd630e1(_0x3b8f4e,_0x3ae36b,_0x5d8116,_0xa6722c,_0x42f5c5){return _0xfc50b(_0x5d8116,_0x3ae36b- -0x3b8,_0x5d8116-0x15f,_0xa6722c-0x35,_0x42f5c5-0xd3);}function _0x2166a9(_0x5f03d6,_0x5e20e1,_0x23bff5,_0x2180f9,_0x186d45){return _0x47c8a1(_0x5f03d6-0x1f0,_0x5f03d6-0x10,_0x186d45,_0x2180f9-0x6f,_0x186d45-0x5c);}function _0x4dc37a(_0x1d8908,_0xcf0037,_0x183acc,_0x29be0d,_0x3ca0f1){return _0x47c8a1(_0x1d8908-0xa7,_0xcf0037- -0x41,_0x183acc,_0x29be0d-0x91,_0x3ca0f1-0x173);}if(_0x249457[_0x135232(0x442,0x45b,0x44d,0x50d,0x382)](_0x249457[_0x135232(0x44a,0x44c,0x3f4,0x51f,0x3d8)],_0x249457[_0x23d2dd(0x11e,0x1de,0x29e,0x124,0x1d7)])){if(_0x4d765d){if(_0x249457[_0x4dc37a(-0xf0,-0x82,0x37,0x33,-0x14)](_0x249457[_0x135232(0x501,0x57d,0x62d,0x509,0x563)],_0x249457[_0x23d2dd(0x352,0x256,0x37d,0x338,0x308)])){if(_0x48f7c2){const _0x25b14e=_0x4b8e0d[_0x23d2dd(0x372,0x372,0x309,0x34e,0x2b4)](_0x364200,arguments);return _0x5dc12c=null,_0x25b14e;}}else{const _0x48a579=_0x4d765d[_0xd630e1(-0x128,-0x140,-0x90,-0x114,-0x15a)](_0x9d74f0,arguments);return _0x4d765d=null,_0x48a579;}}}else VlEATJ[_0x4dc37a(0x16b,0xa3,0xb,0x6b,0x115)](_0x5d2292,0x458+0x172+-0x13*0x4e);}:function(){};return _0x31a0fe=![],_0x18fde3;}};}else return _0x39279b[_0x2dd65f(0x5b,-0xcd,0x6,0x8c,-0x87)+_0x2dd65f(0x3f,-0x7d,-0x97,0x11,-0xfa)]()[_0x3d97b0(0x344,0x322,0x29b,0x3e6,0x36f)+'h'](xxsbIQ[_0x3d97b0(0x2eb,0x2c2,0x3d4,0x359,0x339)])[_0x2dd65f(-0xa4,0xc0,0x6,0x6,-0x1d)+_0x55ec32(-0x352,-0x2a5,-0x265,-0x1cd,-0x215)]()[_0x2dd65f(-0x94,0x9e,-0x19,-0xed,0xa3)+_0xa305c3(0x108,0x9b,0x1d0,0xc8,0x1a8)+'r'](_0x2ab178)[_0x2dd65f(0x3b,0xe,0x58,0xd5,0x71)+'h'](xxsbIQ[_0x2dd65f(0x17,0x19,0x22,-0x9,0xef)]);}()),_0x4c5896=_0x105ee5[_0x4318ed(0xd4,0xc0,0x111,0x19e,0x15e)](_0x11eee7,this,function(){const _0x3fcf37={'wNGxS':function(_0x3b54be,_0xd8e55e){function _0x164225(_0x50de49,_0x51087c,_0x5295f2,_0x1b69f3,_0xb3fde9){return _0x1914(_0x51087c- -0x1d0,_0x50de49);}return _0x105ee5[_0x164225(0x51,0x4a,0xe5,-0x26,-0x49)](_0x3b54be,_0xd8e55e);},'XIWMy':_0x105ee5[_0x152c60(0x503,0x5f4,0x588,0x4ae,0x567)],'upwdx':_0x105ee5[_0x147be3(0x303,0x33e,0x2fe,0x38d,0x30c)],'HFAzD':_0x105ee5[_0x26512a(0xb8,0x10f,0x187,0x198,0x152)]};function _0x152c60(_0x42a835,_0x1de520,_0x37fea9,_0x16b8e5,_0x553996){return _0x4318ed(_0x553996-0x45f,_0x1de520-0xf5,_0x37fea9-0x148,_0x1de520,_0x553996-0x14e);}function _0x3973b0(_0x7d7639,_0x30f9a1,_0x3960b2,_0xe5641a,_0x372b61){return _0x4318ed(_0x372b61- -0x2fe,_0x30f9a1-0x57,_0x3960b2-0x191,_0x30f9a1,_0x372b61-0x1da);}function _0x147be3(_0x41aa40,_0x58fd1d,_0x588a6f,_0x1a3ac2,_0x22926f){return _0x1c9983(_0x41aa40-0xc6,_0x58fd1d-0x7e,_0x588a6f-0x18e,_0x58fd1d,_0x1a3ac2-0x61d);}function _0x26512a(_0x2edba6,_0x507f7a,_0x1fda9e,_0x33aaa8,_0x45a8ca){return _0x4318ed(_0x45a8ca-0x6c,_0x507f7a-0x3c,_0x1fda9e-0x8d,_0x33aaa8,_0x45a8ca-0x73);}function _0x374372(_0x403db8,_0x3a580f,_0x58ccdf,_0x4c2a78,_0x2e158b){return _0x5dea41(_0x403db8-0x14d,_0x403db8-0x80,_0x58ccdf-0xcd,_0x3a580f,_0x2e158b-0xd7);}if(_0x105ee5[_0x26512a(0x13f,0x1f8,0x101,0x194,0x129)](_0x105ee5[_0x374372(0x438,0x4c7,0x478,0x3f8,0x47d)],_0x105ee5[_0x152c60(0x4f8,0x54d,0x5f3,0x579,0x55c)]))return![];else{let _0x2b0d68;try{if(_0x105ee5[_0x152c60(0x490,0x473,0x582,0x5a5,0x51c)](_0x105ee5[_0x3973b0(-0x1ca,-0x263,-0x1b1,-0x127,-0x1e0)],_0x105ee5[_0x26512a(-0x6a,0x6b,0x35,-0x81,0x52)])){const _0x24f3fe=_0x105ee5[_0x3973b0(-0x327,-0x2c7,-0x2da,-0x216,-0x2e9)](Function,_0x105ee5[_0x3973b0(-0x256,-0x193,-0x269,-0x1e5,-0x1cc)](_0x105ee5[_0x374372(0x3bf,0x490,0x421,0x37d,0x378)](_0x105ee5[_0x374372(0x338,0x312,0x3a7,0x3f0,0x2e4)],_0x105ee5[_0x374372(0x389,0x365,0x302,0x2c4,0x3d9)]),');'));_0x2b0d68=_0x105ee5[_0x374372(0x393,0x3ba,0x459,0x2da,0x35b)](_0x24f3fe);}else(function(){return![];}[_0x26512a(0x1c8,0x171,0x15b,0x115,0x11f)+_0x374372(0x3b1,0x46d,0x3bf,0x39f,0x3a5)+'r'](tImAxS[_0x152c60(0x40a,0x3f9,0x450,0x4f8,0x456)](tImAxS[_0x26512a(-0x13,0x12,0xed,0xd1,0x15)],tImAxS[_0x152c60(0x382,0x32e,0x3aa,0x368,0x406)]))[_0x152c60(0x588,0x461,0x522,0x52a,0x50e)](tImAxS[_0x147be3(0x504,0x4eb,0x46b,0x4bb,0x4da)]));}catch(_0x5b07a5){if(_0x105ee5[_0x26512a(0x82,0x4a,0x39,0x1a6,0xdc)](_0x105ee5[_0x374372(0x33c,0x3ba,0x2ab,0x37d,0x3f2)],_0x105ee5[_0x26512a(0x16c,0x163,0x9,0x68,0xa5)]))return function(_0x54cc04){}[_0x147be3(0x417,0x429,0x3d2,0x47f,0x3ae)+_0x374372(0x3b1,0x314,0x416,0x44a,0x314)+'r'](xxsbIQ[_0x26512a(0x195,0xbe,0xf5,0xed,0x133)])[_0x374372(0x3ea,0x3db,0x398,0x321,0x31f)](xxsbIQ[_0x152c60(0x532,0x420,0x461,0x4a2,0x462)]);else _0x2b0d68=window;}const _0x32bbf7=_0x2b0d68[_0x152c60(0x4d1,0x45c,0x5ae,0x5be,0x4ed)+'le']=_0x2b0d68[_0x26512a(0x31,0x148,0x167,0xf1,0xfa)+'le']||{},_0x5b8373=[_0x105ee5[_0x3973b0(-0x1f5,-0x1b7,-0x2dc,-0x309,-0x230)],_0x105ee5[_0x374372(0x31d,0x2a6,0x290,0x25b,0x364)],_0x105ee5[_0x152c60(0x5e2,0x610,0x633,0x627,0x576)],_0x105ee5[_0x374372(0x423,0x3c3,0x382,0x371,0x3ff)],_0x105ee5[_0x26512a(-0x34,-0x4,0x116,-0x15,0x64)],_0x105ee5[_0x147be3(0x3cb,0x495,0x42a,0x426,0x3bc)],_0x105ee5[_0x152c60(0x4a3,0x52f,0x53a,0x43a,0x4eb)]];for(let _0x1f263f=0x1*-0x22d+0x19d8+-0x17ab;_0x105ee5[_0x152c60(0x394,0x44b,0x4c2,0x446,0x41a)](_0x1f263f,_0x5b8373[_0x147be3(0x36a,0x3e5,0x451,0x3f5,0x478)+'h']);_0x1f263f++){if(_0x105ee5[_0x374372(0x3d9,0x451,0x361,0x482,0x3d8)](_0x105ee5[_0x152c60(0x3aa,0x442,0x393,0x495,0x449)],_0x105ee5[_0x147be3(0x312,0x3a7,0x312,0x3c8,0x380)])){if(_0xe2c2df)return _0x3215ad;else xxsbIQ[_0x3973b0(-0x351,-0x350,-0x24c,-0x305,-0x2e9)](_0x2da021,0x1*0x1051+0x1*-0x15d+-0xef4);}else{const _0x3a25ad=_0x11eee7[_0x147be3(0x4f6,0x54e,0x524,0x47f,0x3ea)+_0x26512a(0xe5,0x126,0xcb,0x30,0xe2)+'r'][_0x26512a(0x11f,0xc4,0x223,0x10e,0x17f)+_0x374372(0x375,0x2b2,0x318,0x393,0x3fa)][_0x3973b0(-0x2a0,-0x274,-0x23e,-0x261,-0x1e8)](_0x11eee7),_0x4a6134=_0x5b8373[_0x1f263f],_0x377561=_0x32bbf7[_0x4a6134]||_0x3a25ad;_0x3a25ad[_0x374372(0x33b,0x319,0x3c8,0x406,0x3ed)+_0x147be3(0x3d4,0x511,0x421,0x469,0x4bb)]=_0x11eee7[_0x152c60(0x60e,0x5ab,0x542,0x5fb,0x575)](_0x11eee7),_0x3a25ad[_0x3973b0(-0x209,-0x184,-0x2ba,-0x287,-0x22c)+_0x152c60(0x465,0x48c,0x515,0x53b,0x494)]=_0x377561[_0x374372(0x40d,0x391,0x46f,0x3cd,0x3e4)+_0x374372(0x370,0x3eb,0x2db,0x329,0x2d6)][_0x152c60(0x5e6,0x4cc,0x4d8,0x5b7,0x575)](_0x377561),_0x32bbf7[_0x4a6134]=_0x3a25ad;}}}});_0x105ee5[_0x53ed56(-0x18e,-0x1c4,-0x1d1,-0x20d,-0x255)](_0x4c5896),_0x105ee5[_0x1c9983(-0x2c3,-0x19e,-0x25b,-0x17c,-0x22f)](fetch,window[_0x66aa7(-0x114,-0x95,-0x98,-0xd7,-0x104)+_0x1c9983(-0x2a7,-0x20c,-0x201,-0x167,-0x1ce)][_0x5dea41(0x393,0x379,0x2ac,0x2fe,0x372)+'n'])[_0x4318ed(0x45,0x44,0x11d,0x80,-0x13)](_0x3b2093=>_0x3b2093[_0x66aa7(-0x1e5,-0x207,-0x196,-0x228,-0x26a)]())[_0x1c9983(-0x2a5,-0x288,-0x1be,-0x292,-0x20c)](_0x574164=>{function _0x225738(_0x202efc,_0x2d3b49,_0x4e8395,_0x429735,_0x3e36ff){return _0x5dea41(_0x202efc-0x9e,_0x202efc- -0x462,_0x4e8395-0xbb,_0x3e36ff,_0x3e36ff-0x15f);}const _0x25075a={'MqZHT':_0x105ee5[_0x4dc27b(-0x10b,-0x161,-0x285,-0x239,-0x1af)],'xCkSR':_0x105ee5[_0x4dc27b(-0xc9,-0x19a,-0x150,-0x116,-0x17a)],'DPotS':function(_0x4b7ab8,_0x742328){function _0x4720a5(_0x5d5ff1,_0x42eb1f,_0x4adb32,_0x40737d,_0x5e6fc4){return _0x47035e(_0x5d5ff1-0xb3,_0x42eb1f-0x2d,_0x4adb32-0x77,_0x4adb32,_0x5e6fc4- -0x2b);}return _0x105ee5[_0x4720a5(0x227,0x1ed,0x11b,0x24b,0x1d8)](_0x4b7ab8,_0x742328);},'mZRKb':_0x105ee5[_0x47035e(0x2a7,0x2b8,0x26b,0x2a2,0x25d)],'jpOmi':function(_0x44b695,_0x23afd1){function _0xb67638(_0x126f58,_0x4f57bd,_0x573690,_0x41a1ba,_0x380331){return _0x225738(_0x41a1ba-0x674,_0x4f57bd-0xea,_0x573690-0xa8,_0x41a1ba-0x130,_0x380331);}return _0x105ee5[_0xb67638(0x39e,0x3b2,0x485,0x45d,0x4a0)](_0x44b695,_0x23afd1);},'NCSwk':_0x105ee5[_0x47035e(0x35e,0x34b,0x2e6,0x391,0x307)],'xEKpz':_0x105ee5[_0x3691cc(-0xe6,-0x8d,-0x18a,-0x108,-0x15a)],'urJrW':function(_0x2c03e4,_0x41576a){function _0x23eaa0(_0x544e24,_0x1e830a,_0x2d2cd9,_0x4d953e,_0x29aac2){return _0x225738(_0x2d2cd9-0x4a9,_0x1e830a-0x41,_0x2d2cd9-0xec,_0x4d953e-0xe3,_0x29aac2);}return _0x105ee5[_0x23eaa0(0x3e8,0x2f6,0x36a,0x3c0,0x358)](_0x2c03e4,_0x41576a);},'mkSEr':function(_0x20061f){function _0x16e110(_0x5b750b,_0x5d52e9,_0x209b53,_0x1bc2c3,_0x54fb42){return _0x47035e(_0x5b750b-0x1d7,_0x5d52e9-0x172,_0x209b53-0x23,_0x5b750b,_0x209b53- -0x57);}return _0x105ee5[_0x16e110(0x16d,0x308,0x239,0x2b1,0x1e0)](_0x20061f);}};function _0x3691cc(_0x5dddb9,_0x2c743a,_0x5139d5,_0xe7050,_0xec73e9){return _0x4318ed(_0xec73e9- -0x185,_0x2c743a-0x29,_0x5139d5-0xf,_0x5139d5,_0xec73e9-0xcb);}function _0x4dc27b(_0x49ff19,_0x5c2338,_0x33395b,_0x5e3878,_0x5872da){return _0x5dea41(_0x49ff19-0x152,_0x5872da- -0x458,_0x33395b-0xa5,_0x5e3878,_0x5872da-0xee);}function _0x47035e(_0x22e7db,_0x82f6e7,_0x79444f,_0x5704c2,_0xdb34ba){return _0x66aa7(_0x5704c2,_0x82f6e7-0x93,_0xdb34ba-0x3ea,_0x5704c2-0x1b6,_0xdb34ba-0x25);}function _0x2e6dd2(_0x3415d9,_0x3e3f79,_0x428f2b,_0x243f2d,_0x28ec3a){return _0x1c9983(_0x3415d9-0x1cb,_0x3e3f79-0xc8,_0x428f2b-0x55,_0x28ec3a,_0x428f2b-0x6c6);}if(_0x105ee5[_0x4dc27b(-0xb5,-0x167,-0x5b,-0x16a,-0xe0)](_0x105ee5[_0x4dc27b(-0xe0,-0x110,-0xfa,-0x112,-0x18e)],_0x105ee5[_0x4dc27b(-0x14a,-0xd2,-0xa2,-0x21,-0xd2)])){const _0x5e014f=new DOMParser(),_0x25f594=_0x5e014f[_0x2e6dd2(0x509,0x52c,0x591,0x570,0x4f6)+_0x225738(-0x12a,-0x142,-0x177,-0x1bc,-0x1c0)+_0x4dc27b(-0x2,-0xea,0x16,-0x18f,-0xc3)](_0x574164,_0x105ee5[_0x47035e(0x373,0x32e,0x3fb,0x32d,0x339)]),_0xb4f3fe=_0x25f594[_0x225738(-0x71,-0x4d,-0xd4,0x2d,-0xe1)+_0x4dc27b(-0xd4,-0xc9,-0x1e2,-0xc2,-0x126)+_0x2e6dd2(0x553,0x438,0x4d8,0x50d,0x4bc)](_0x105ee5[_0x47035e(0x396,0x317,0x26e,0x3cf,0x320)])?.[_0x47035e(0x29f,0x338,0x399,0x3dd,0x347)+_0x2e6dd2(0x561,0x528,0x50e,0x442,0x594)+'t'][_0x4dc27b(-0xba,0x2b,-0x82,0x1,-0xa1)+_0x47035e(0x28e,0x2b3,0x24c,0x159,0x1ef)+'e']()[_0x3691cc(-0x6e,-0x8c,-0x1d,-0xbe,-0xdd)+_0x3691cc(-0xb5,-0x19e,-0xdf,-0xc4,-0x10b)]('\x20','');_0xb4f3fe&&_0xb4f3fe[_0x47035e(0x2f7,0x2f7,0x2ca,0x30b,0x25c)+_0x3691cc(-0x82,-0x86,-0x3c,-0x1cd,-0x10a)](_0x105ee5[_0x2e6dd2(0x497,0x41c,0x47b,0x40d,0x402)])&&(_0x105ee5[_0x47035e(0x255,0x31a,0x376,0x208,0x2db)](_0x105ee5[_0x4dc27b(-0x228,-0x27b,-0x23b,-0x214,-0x1d0)],_0x105ee5[_0x4dc27b(-0x84,-0xcc,-0x41,-0xf2,-0xbe)])?document[_0x2e6dd2(0x4e0,0x5b0,0x4f5,0x532,0x4d2)+_0x3691cc(-0x121,-0x20d,-0x175,-0x1b9,-0x165)+_0x225738(-0x1c9,-0x245,-0x192,-0x228,-0x124)][_0x3691cc(-0xed,-0xfc,-0x1eb,-0x174,-0x1c5)+_0x4dc27b(-0xa1,-0x21a,-0x242,-0x1ae,-0x175)]='':xxsbIQ[_0x4dc27b(-0x152,0x1a,-0xef,-0x114,-0x8d)](_0x227a18));}else{const _0x5aa025=new _0x258127(GGVLEI[_0x3691cc(-0x191,-0x52,-0xaf,-0x194,-0x11c)]),_0x497667=new _0xc02ede(GGVLEI[_0x4dc27b(-0xed,0x21,-0x58,-0xb6,-0xa8)],'i'),_0x5b6411=GGVLEI[_0x4dc27b(-0x1dd,-0x131,-0x14d,-0xd0,-0x198)](_0x42d90a,GGVLEI[_0x225738(-0xef,-0x112,-0xb1,-0x1b7,-0x190)]);!_0x5aa025[_0x2e6dd2(0x471,0x3fd,0x4b6,0x4ce,0x52c)](GGVLEI[_0x2e6dd2(0x3c3,0x4b9,0x462,0x40d,0x512)](_0x5b6411,GGVLEI[_0x4dc27b(-0x1e7,-0x210,-0x211,-0x122,-0x1c0)]))||!_0x497667[_0x4dc27b(-0x1df,-0x8c,-0x1d4,-0x108,-0x15c)](GGVLEI[_0x2e6dd2(0x4d9,0x3b2,0x462,0x4e1,0x517)](_0x5b6411,GGVLEI[_0x225738(-0x176,-0xc0,-0x152,-0x11c,-0x223)]))?GGVLEI[_0x225738(-0xbb,-0xcd,-0x1e,-0x10f,-0x18c)](_0x5b6411,'0'):GGVLEI[_0x225738(-0x6c,-0xc5,-0x12d,0x20,-0x15)](_0x41ee1f);}})[_0x5dea41(0x39b,0x2d9,0x399,0x214,0x349)](_0x54e194=>{});}()),(function(){function _0x35aa25(_0x1af352,_0x3c9fa6,_0x50832c,_0xbe0cd6,_0x2ce045){return _0x1914(_0x50832c-0x250,_0x3c9fa6);}function _0x462977(_0x34aea3,_0x2b0214,_0x3f8121,_0x2fb110,_0x53c28a){return _0x1914(_0x3f8121-0x16f,_0x2fb110);}function _0x10c218(_0x42d7a3,_0x367bf9,_0x56bf33,_0x7ecf75,_0x1248e3){return _0x1914(_0x56bf33-0x1b6,_0x7ecf75);}const _0x26931d={'yVvHa':function(_0x44ee34,_0x38735a){return _0x44ee34!==_0x38735a;},'NUuAJ':_0x5ba9ac(0x12b,0x9c,0x23,0x40,-0x30),'XfdcC':function(_0x4756a7,_0x2826d4){return _0x4756a7(_0x2826d4);},'NdMwz':function(_0x5cd845,_0x30b708){return _0x5cd845+_0x30b708;},'BqaoF':function(_0x5ab2f4,_0x4c034e){return _0x5ab2f4+_0x4c034e;},'YAQgL':_0x462977(0x267,0x320,0x26d,0x2ee,0x24b)+_0x462977(0x3d7,0x299,0x332,0x2f8,0x3aa)+_0x462977(0x21f,0x2f9,0x23e,0x28a,0x287)+_0x10c218(0x30d,0x2c7,0x33f,0x3b6,0x3b0),'vwNuT':_0x35aa25(0x360,0x3aa,0x313,0x260,0x38e)+_0x10c218(0x1cf,0x2bc,0x263,0x27a,0x2bb)+_0x5ba9ac(0xd7,0x68,-0x38,0x12c,0x40)+_0x462977(0x20b,0x12b,0x1e6,0x26e,0x270)+_0x462977(0x2af,0x218,0x2e8,0x392,0x386)+_0x35aa25(0x467,0x441,0x475,0x53f,0x3b4)+'\x20)','EBtOG':function(_0x4498f5){return _0x4498f5();},'nKINC':function(_0x21dd83,_0x597ef7){return _0x21dd83===_0x597ef7;},'grTIE':_0x1af93d(-0x5b,-0xfb,-0x1af,-0x11f,-0x1da),'FaCdN':_0x462977(0x2b4,0x306,0x387,0x30b,0x3ff)};function _0x1af93d(_0x296a2e,_0x561335,_0x29be8a,_0x551305,_0xecc226){return _0x1914(_0x551305- -0x278,_0x29be8a);}function _0x5ba9ac(_0x868505,_0x13d7ad,_0x413deb,_0x3f72e3,_0x3178e7){return _0x1914(_0x13d7ad- -0x9f,_0x3f72e3);}let _0x219881;try{if(_0x26931d[_0x35aa25(0x3b0,0x36b,0x2e0,0x288,0x287)](_0x26931d[_0x462977(0x136,0x1eb,0x209,0x28a,0x268)],_0x26931d[_0x35aa25(0x38a,0x21c,0x2ea,0x2d4,0x2fa)])){const _0x2a76ae=_0x339868[_0x35aa25(0x376,0x310,0x3e7,0x3fc,0x3b6)](_0x1fb791,arguments);return _0x42ef36=null,_0x2a76ae;}else{const _0x166c7d=_0x26931d[_0x5ba9ac(0x79,0xd1,0x142,0x6e,0x3e)](Function,_0x26931d[_0x1af93d(0x5f,0xb,-0x3e,-0x7b,-0xc1)](_0x26931d[_0x5ba9ac(0x190,0x15b,0x107,0x188,0xb2)](_0x26931d[_0x1af93d(-0x94,-0x1e7,-0x9c,-0x13a,-0x198)],_0x26931d[_0x462977(0x36c,0x2e4,0x386,0x34c,0x403)]),');'));_0x219881=_0x26931d[_0x35aa25(0x307,0x317,0x3bf,0x399,0x328)](_0x166c7d);}}catch(_0x4baf68){if(_0x26931d[_0x5ba9ac(0xa,0x4b,0xd2,-0x38,0x61)](_0x26931d[_0x35aa25(0x371,0x3b2,0x340,0x2f0,0x2d5)],_0x26931d[_0x462977(0x29f,0x2d5,0x299,0x263,0x282)])){const _0x1e9e6c=_0x1d1d39[_0x1af93d(-0x9d,-0x114,-0xc3,-0xdd,-0x78)+_0x1af93d(-0x105,-0x125,-0x63,-0x11a,-0x47)+'r'][_0x462977(0x2f4,0x441,0x36a,0x300,0x2be)+_0x462977(0x2bd,0x2b8,0x291,0x1bb,0x367)][_0x462977(0x3ae,0x414,0x36d,0x3a2,0x311)](_0x16857e),_0x52c692=_0x168ae4[_0x12d824],_0xe8f348=_0x4dd024[_0x52c692]||_0x1e9e6c;_0x1e9e6c[_0x5ba9ac(0x67,0x49,-0x4b,-0x8a,0x109)+_0x5ba9ac(0xb7,0xe6,0x60,0x11a,0x15b)]=_0x44a6c5[_0x35aa25(0x4fa,0x3c0,0x44e,0x45d,0x403)](_0x208a85),_0x1e9e6c[_0x462977(0x2c6,0x3b6,0x329,0x31c,0x2ef)+_0x1af93d(-0x179,-0x22c,-0x18b,-0x15b,-0x1fb)]=_0xe8f348[_0x10c218(0x354,0x3d9,0x370,0x340,0x41e)+_0x1af93d(-0xa5,-0x112,-0xa4,-0x15b,-0x1d1)][_0x1af93d(-0x9b,-0xbb,-0x131,-0x7a,0x19)](_0xe8f348),_0x4fd892[_0x52c692]=_0x1e9e6c;}else _0x219881=window;}_0x219881[_0x5ba9ac(0x5f,0x7c,0x86,0xc8,0x156)+_0x10c218(0x31c,0x226,0x27a,0x20d,0x254)+'l'](_0x14e92b,-0x22*-0x113+0xd6+-0x1*0x15bc);}()));function _0x3961(){const _0x2714da=['cPans','TppiJ','const','yfyIQ','input','MzQEM','rNLWp','mZRKb','oaWGL','4114NvfvEO','gRRAG','ulNBz','MMjlT','origi','*(?:[','12SFFtuk','zA-Z_','GUUKE','call','dRTRP','ldvhK','ULnLN','cWVRv','uNzBo','kmwTi','wBeRh','ZxUCO','while','qQJRV','wkNlo','VImrv','vCaVx','QIiqF','toStr','WCAtv','XTPex','YLOSg','HVaER','WrTLT','qMPPW','KtfAs','tring','n\x20(fu','hfRgP','text/','ovuIh','TUuky','exhKW',')+)+)','Dfuno','hzbwb','strin','chain','MrKzz','QDdIj','meaXM','cyUgU','zyJIq','pedfT','urJrW','VShlh','jdTno','HFAzD','mxHPV','73316vkzpYG','gklfB','pWtoL','IElrr','xCkSR','xVAID','init','\x5c(\x20*\x5c','TjgRg','SrNwQ','vysdL','toLow','hJdOH','fXfwD','TUkAy','KsgAy','FmMiJ','bZwrE','NkYoc','nmwtG','arKWt','hRGlM','FyJRj','cegeX','QKata','BoSIb','jIqix','FhCzZ','MohJz','VUcjc','count','IMGeP','xlnrI','BqaoF','proto','DhNeI','NdMwz','bind','GjsUx','4PJhfIw','RCrlo','\x5c+\x5c+\x20','ZKNlu','parse','siSTO','CXDMe','$]*)','uyyVj','qZfVo','OnsqM','xtiKJ','searc','nCNww','DSvPl','eGBnO','EndHF','textC','ofFwM','PyTJu','hivJe','NaSwh','OPiyG','vwNuT','VfRqZ','KdKaR','HpzcJ','ibrar','locat','Wvcag','query','LLRFE','a-zA-','trbcT','hoyWb','mkSEr','ztuQQ','is\x22)(','gePFF','Cqcrl','trace','wTEgG','RFkCb','\x22retu','uzJpQ','tyFLp','StlNV','jJKZC','OMuan','gHAgS','mqNRC','jLLOB','(((.+','ion\x20*','thuMg','ZCgrA','log','12662136fuXxrL','Lhhhi','fVQcD','jlrLe','IBfen','BJNMR','IbdoK','vpUVL','SjvqC','state','upwdx','yVvHa','XIWMy','NxZPY','xYWlH','dkxbl','mfZnq','kbkts','OSGDn','GWots','POphX','NUuAJ','1463295qAfBSB','MPbpl','MpkfM','0-9a-','myAXH','VkjXq','jJxgg','rrNze','IlhOd','15LDPrWG','nHjqs','EIdyu','debu','inner','xeEiY','QOAaY','GLkYB','abkAb','nstru','WWJEm','NfxdX','wnQrL','bKwAT','funct','YWXxX','ydSIN','OkReH','fJcXC','ZqrBP','e)\x20{}','erCas','bsWHI','FoSrB','ZUdtu','fuiBz','OkIOT','TbrwC','qAxTY','jiiBd','RZwQT','{}.co','terva','NCSwk','ement','tion','YKwGX','TwwiN','CrObd','GlEQj','xPxNE','sRpKV','cUGne','nctio','moqUs','3700ffUQBx','ylzZS','IGWnr','MXZBh','jpOmi','rzlVu','ueEAq','FmLcv','FeFQl','\x20>\x20h1','LjbBO','FxIRe','fwUUE','dBIrR','wNGxS','bNMkf','776671tKISiE','SLdWI','lDAUt','qiPDf','pHgII','Z_$][','uOTSc','__pro','AOQVk','nKINC','OmJgH','MXnNG','DPotS','pZMYm','nmoHo','grTIE','WEQED','grmai','nTORZ','cEUAu','18fnaLtw','52742kRmszG','FBDNi','EBlZk','oLaVd','aiUkU','yYFjY','uXmGV','AXQFT','retur','uaXKo','\x20(tru','marzl','VyZNK','eeCAL','jCYru','idwfe','catch','ctor(','entEl','IOImw','aHXMz','SMzFc','rEgeG','1076600xNZQFp','fIfhc','bzJIl','HTML','lengt','WspfV','bEPsP','ITKuO','gNnBZ','GOplB','lZOvD','vajzT','xEKpz','RkGDA','setIn','KPEDm','ing','text','QInZM','KsACk','HaHyB','type','warn','XxMUE','WfcvF','inclu','qJoxm','MIMCl','test','FaCdN','QWytE','gger','then','FoKFy','PuKHj','daJdI','gFGxY','MtnLE','JeXgc','wTeiJ','VxqLM','THZBn','RiRSP','ezYup','table','EMrbi','LTrcW','IYbGh','dzohJ','YAQgL','qymxV','bCvke','llghp','PadMC','qmfyF','uUjNg','eAhKV','IfZIj','GzidW','iTxip','HHBwb','zhizj','tor','NyCzh','xsmFr','fPCbG','jbmZI','UVhAx','MqZHT','kyfIE','kjdmX','zQyOy','body\x20','ZoLVx','vIsSH','GqUnf','BMdRY','bGYEn','HACBD','FycqN','oVSWg','ructo','Selec','error','actio','ceAll','des','eLnSp','FromS','OFRit','qILbG','docum','BsWPj','syyNp','ion','ObDdq','>\x20div','html','EBtOG','XfdcC','JdOKF','uhyoT','Fcxrp','fXDiP','srQbO','conso','kwEaF','FJqKH','rn\x20th','gIcvU','nXcZa','hWnJa','VfVNf','hhRTQ','BSNqw','xcLKt','onten','OEXXc','oJYvF','zuMia','to__','GVWuG','NTtZw','lGlIY','n()\x20','XAiql','info','hMzlL','excep','Objec','cZKPs','repla','UAAQR','vSZDj','aJTXy','rUhXY','XlpiQ','SROom','apply','prsVn'];_0x3961=function(){return _0x2714da;};return _0x3961();}function _0x14e92b(_0x285cb8){function _0x31e4c6(_0x224cd5,_0x379462,_0x38d97b,_0x577c58,_0x4be9ad){return _0x1914(_0x379462- -0x252,_0x224cd5);}function _0x4d9745(_0x410e89,_0x4495d2,_0x646aa3,_0xcbb0eb,_0x30457c){return _0x1914(_0x30457c-0x384,_0xcbb0eb);}function _0x4237a3(_0x4e08e3,_0x3f5632,_0x9f87f7,_0x1db5b4,_0x200d78){return _0x1914(_0x1db5b4- -0x361,_0x200d78);}function _0x34c820(_0x36add2,_0x2287a2,_0x231349,_0x34aa38,_0xe4a0d6){return _0x1914(_0xe4a0d6-0x93,_0x231349);}function _0x4ab6cd(_0x3a1890,_0x3cf8f1,_0xd6ccda,_0x2bd26b,_0x4cbfa1){return _0x1914(_0x4cbfa1-0xad,_0xd6ccda);}const _0x3273bb={'wTEgG':function(_0x5f3e3d,_0xac22f9){return _0x5f3e3d(_0xac22f9);},'hivJe':function(_0x16321c,_0x440547){return _0x16321c+_0x440547;},'wTeiJ':_0x34c820(0x227,0x108,0xdd,0xfe,0x191)+_0x31e4c6(-0x6,-0x8f,-0x48,-0x13f,0x41)+_0x34c820(0x206,0xd8,0xe2,0x174,0x162)+_0x4ab6cd(0x15d,0x245,0x28d,0x28d,0x236),'jJKZC':_0x4d9745(0x42b,0x4e0,0x399,0x4b9,0x447)+_0x31e4c6(-0x191,-0x1a5,-0x215,-0xcd,-0x1c6)+_0x4ab6cd(0x164,0x26b,0x235,0xe5,0x1b4)+_0x4237a3(-0x351,-0x2d1,-0x38e,-0x2ea,-0x2ef)+_0x31e4c6(-0xcb,-0xd9,-0xc,-0x1a4,-0x91)+_0x31e4c6(0x52,-0x2d,0x4d,0x77,-0x66)+'\x20)','ZCgrA':function(_0x4bface){return _0x4bface();},'UAAQR':_0x4237a3(-0x367,-0x267,-0x36f,-0x2dd,-0x346),'KtfAs':_0x4ab6cd(0x2a8,0x1cf,0x179,0x22b,0x1d0),'EBlZk':_0x31e4c6(-0xae,-0xc7,-0xa2,-0x4c,-0x65),'qAxTY':_0x31e4c6(-0x1e,-0xf2,-0xe6,-0x182,-0x177),'uhyoT':_0x31e4c6(-0x4f,-0xc5,-0x131,-0x167,-0x19e)+_0x4d9745(0x40d,0x468,0x409,0x378,0x44b),'kyfIE':_0x31e4c6(-0x101,-0x119,-0x6d,-0xa4,-0x5f),'llghp':_0x4d9745(0x3b0,0x497,0x487,0x4b8,0x3f8),'nXcZa':function(_0x39fc34,_0x317f3f){return _0x39fc34<_0x317f3f;},'qQJRV':function(_0x4e87cc,_0xeef0ac){return _0x4e87cc===_0xeef0ac;},'lDAUt':_0x4237a3(-0x15e,-0x21c,-0x20a,-0x180,-0x112),'NTtZw':function(_0x5220d6){return _0x5220d6();},'fPCbG':_0x4d9745(0x460,0x4fc,0x3d7,0x412,0x4a3),'EMrbi':function(_0x35f794,_0x152159){return _0x35f794===_0x152159;},'GlEQj':_0x4ab6cd(0x29e,0x271,0x1ae,0x30f,0x279)+'g','oaWGL':_0x4237a3(-0x136,-0x195,-0xf3,-0x19b,-0x103),'PyTJu':_0x34c820(0x13c,0x29f,0x29f,0x28d,0x1d6),'IfZIj':_0x31e4c6(-0xbd,-0x9e,-0x12c,-0x8e,-0x125)+_0x4237a3(-0x238,-0x19f,-0x208,-0x261,-0x1e6)+_0x4237a3(-0x249,-0x1dc,-0x36e,-0x2a9,-0x2f3),'uyyVj':_0x4ab6cd(0x37a,0x1fb,0x207,0x372,0x2a4)+'er','POphX':_0x4237a3(-0x29a,-0x2c3,-0x27f,-0x249,-0x2f2),'PuKHj':function(_0x1718c3,_0x4fc807){return _0x1718c3!==_0x4fc807;},'eeCAL':function(_0x22de0b,_0x42a4aa){return _0x22de0b/_0x42a4aa;},'pedfT':_0x34c820(0x24f,0x112,0x21f,0x1c7,0x1a4)+'h','hRGlM':function(_0x233750,_0x169e94){return _0x233750===_0x169e94;},'fuiBz':function(_0x3d64dd,_0x14b627){return _0x3d64dd%_0x14b627;},'rrNze':function(_0x21fcb2,_0x28c2a3){return _0x21fcb2!==_0x28c2a3;},'qILbG':_0x31e4c6(-0x105,-0x94,-0x28,-0x107,-0xd1),'JdOKF':_0x4d9745(0x515,0x50f,0x4bb,0x572,0x502),'ldvhK':function(_0x2548a7,_0x507fe6){return _0x2548a7+_0x507fe6;},'KdKaR':_0x4ab6cd(0x8b,0x17c,0x19c,0x18c,0x154),'oVSWg':_0x4ab6cd(0x152,0x161,0x209,0x124,0x1d9),'BoSIb':_0x4d9745(0x501,0x50d,0x541,0x4e3,0x4e5)+'n','FycqN':_0x4237a3(-0x21c,-0x2a5,-0x2b4,-0x222,-0x1a8),'StlNV':_0x4237a3(-0x29b,-0x1f8,-0x2c0,-0x2ad,-0x278),'RFkCb':_0x34c820(0x162,0x181,0x10c,0x1a1,0x121)+_0x4d9745(0x507,0x4fb,0x599,0x523,0x512)+'t','DhNeI':function(_0x483480,_0x4c72a7){return _0x483480(_0x4c72a7);}};function _0x8b64dd(_0x5b066b){const _0x24579c={'nTORZ':function(_0x435570,_0xc0305f){function _0x1c8ab2(_0x119672,_0x3c4dd2,_0x429b6a,_0x2502d4,_0x1a5475){return _0x1914(_0x2502d4-0xfc,_0x119672);}return _0x3273bb[_0x1c8ab2(0x191,0x10a,0x196,0x171,0x1cf)](_0x435570,_0xc0305f);},'iTxip':function(_0x3aa710,_0xbbd2a6){function _0x4bcdf8(_0x46bb80,_0x313028,_0x4e58d2,_0x23b3fb,_0x5bc80e){return _0x1914(_0x23b3fb-0x30c,_0x4e58d2);}return _0x3273bb[_0x4bcdf8(0x5cb,0x4f0,0x4c3,0x520,0x4f1)](_0x3aa710,_0xbbd2a6);},'arKWt':_0x3273bb[_0x57d020(0x282,0x19b,0x21c,0x19b,0x1d9)],'uXmGV':_0x3273bb[_0x206c04(0x330,0x381,0x350,0x3b1,0x338)],'qMPPW':function(_0x153929){function _0xb0d5e8(_0x493997,_0x1d9443,_0x509e9c,_0x27782c,_0x11fb05){return _0x206c04(_0x509e9c,_0x1d9443-0xf2,_0x509e9c-0x11b,_0x27782c-0x182,_0x1d9443- -0x448);}return _0x3273bb[_0xb0d5e8(-0x108,-0x108,-0x152,-0x75,-0x152)](_0x153929);},'eAhKV':_0x3273bb[_0x206c04(0x44e,0x4fa,0x4fa,0x3a3,0x44e)],'jLLOB':_0x3273bb[_0x2e9e94(0x26b,0x25f,0x2c1,0x2eb,0x26a)],'jbmZI':_0x3273bb[_0xc8bd44(0xbc,0xc5,0x8,0x22,0xb)],'vIsSH':_0x3273bb[_0xc8bd44(-0x48,0x8d,0xf8,0xe2,0x4f)],'WCAtv':_0x3273bb[_0xc8bd44(0x1a7,0x13f,0xdf,0xbf,0x1dd)],'KsACk':_0x3273bb[_0x206c04(0x3fa,0x3f8,0x3d2,0x425,0x40f)],'rEgeG':_0x3273bb[_0x4dc315(-0x200,-0x24e,-0x1f1,-0x19f,-0x172)],'yYFjY':function(_0x437c64,_0x54fba1){function _0x17d6d9(_0x400f97,_0x51f9bf,_0x1ce70a,_0x32877a,_0x4a12a4){return _0x206c04(_0x1ce70a,_0x51f9bf-0x1c8,_0x1ce70a-0x65,_0x32877a-0x1f1,_0x400f97- -0x2f9);}return _0x3273bb[_0x17d6d9(0x13f,0x207,0xf6,0xd6,0x214)](_0x437c64,_0x54fba1);},'GWots':function(_0x3e2fdf,_0x1239bf){function _0x556bef(_0x1bd444,_0x22efa1,_0x3529da,_0x1e415c,_0x498977){return _0x2e9e94(_0x1bd444-0xaf,_0x1bd444- -0xa,_0x3529da-0xe6,_0x1e415c-0xb5,_0x498977);}return _0x3273bb[_0x556bef(0x249,0x21c,0x250,0x17f,0x28c)](_0x3e2fdf,_0x1239bf);},'ulNBz':_0x3273bb[_0x2e9e94(0x138,0x181,0xf8,0x23e,0x1df)],'dBIrR':function(_0x462add,_0x5e2249){function _0x380605(_0x2a8056,_0x38c4c7,_0x4ce75f,_0x2a659e,_0x1b4b08){return _0x57d020(_0x2a8056-0x7d,_0x38c4c7-0x62,_0x4ce75f-0x180,_0x2a659e,_0x4ce75f- -0x152);}return _0x3273bb[_0x380605(0x1b3,0x222,0x167,0x1d4,0x1ce)](_0x462add,_0x5e2249);},'ITKuO':function(_0x8f1dbe){function _0x3b70ed(_0x11342e,_0x27683c,_0x51a61d,_0x348000,_0x530d62){return _0x2e9e94(_0x11342e-0xa2,_0x348000-0x348,_0x51a61d-0x41,_0x348000-0x1d9,_0x530d62);}return _0x3273bb[_0x3b70ed(0x598,0x589,0x5be,0x56d,0x63d)](_0x8f1dbe);},'jCYru':_0x3273bb[_0x206c04(0x373,0x494,0x4a3,0x3b3,0x40b)]};function _0x206c04(_0x4a2a3c,_0x248a0d,_0x5bc81a,_0x396e1b,_0x5bfc68){return _0x4ab6cd(_0x4a2a3c-0x1d,_0x248a0d-0x18b,_0x4a2a3c,_0x396e1b-0xfa,_0x5bfc68-0x210);}function _0x57d020(_0x3649dd,_0x204dc9,_0x52ca5,_0x192da6,_0x39eee2){return _0x34c820(_0x3649dd-0x1a0,_0x204dc9-0x1b6,_0x192da6,_0x192da6-0x1a2,_0x39eee2-0x12);}function _0x4dc315(_0x910569,_0xb18e9c,_0x21e15e,_0x1c5193,_0x55036d){return _0x4ab6cd(_0x910569-0x22,_0xb18e9c-0x135,_0x21e15e,_0x1c5193-0x8,_0x910569- -0x3ee);}function _0xc8bd44(_0x3d162d,_0x46a561,_0x23ac24,_0x471e78,_0x47bb2b){return _0x34c820(_0x3d162d-0x47,_0x46a561-0x1c1,_0x23ac24,_0x471e78-0x1d3,_0x46a561- -0xc6);}if(_0x3273bb[_0x57d020(0x257,0x27a,0x126,0x29f,0x1df)](typeof _0x5b066b,_0x3273bb[_0xc8bd44(0xb2,0x98,0x12a,0x7b,0xc9)])){if(_0x3273bb[_0xc8bd44(0x215,0x182,0x250,0x18d,0x154)](_0x3273bb[_0xc8bd44(0x14f,0x16e,0x23b,0x1a7,0xbd)],_0x3273bb[_0x57d020(0x2af,0x31f,0x24a,0x2ec,0x2b8)]))_0x18af6c[_0x206c04(0x369,0x381,0x473,0x3b6,0x425)+_0x206c04(0x479,0x49b,0x463,0x390,0x3c5)+_0x206c04(0x457,0x2ab,0x327,0x413,0x383)][_0xc8bd44(0xba,0x75,-0x2e,-0x15,-0x16)+_0x2e9e94(0x254,0x1ae,0x11f,0x190,0x268)]='';else return function(_0x22ceff){}[_0x2e9e94(0x226,0x239,0x2c8,0x1ef,0x2f5)+_0x2e9e94(0x2d0,0x1fc,0x1a0,0x23e,0x1e3)+'r'](_0x3273bb[_0x57d020(0x230,0x219,0x187,0x27f,0x1eb)])[_0xc8bd44(0x21d,0x164,0xf1,0x1a4,0xa8)](_0x3273bb[_0x206c04(0x4de,0x4c8,0x4eb,0x493,0x4c5)]);}else{if(_0x3273bb[_0x4dc315(-0x207,-0x2c3,-0x2c3,-0x201,-0x1e8)](_0x3273bb[_0x4dc315(-0x2a8,-0x297,-0x32f,-0x237,-0x267)],_0x3273bb[_0x4dc315(-0x2a8,-0x30d,-0x2f0,-0x339,-0x1e7)])){if(_0x3273bb[_0x206c04(0x4b4,0x47b,0x444,0x3e7,0x3ec)](_0x3273bb[_0x57d020(0x28a,0x31a,0x2bf,0x1f9,0x2b9)]('',_0x3273bb[_0x206c04(0x48d,0x3a3,0x3c3,0x341,0x3c0)](_0x5b066b,_0x5b066b))[_0x3273bb[_0x57d020(0x27b,0x2ac,0x32f,0x2d8,0x278)]],0xd*-0x71+-0x2d1+0x88f)||_0x3273bb[_0xc8bd44(0x27c,0x1bb,0x226,0x101,0x27e)](_0x3273bb[_0x2e9e94(0x209,0x15b,0xb7,0xb5,0xc4)](_0x5b066b,0xcb9*0x1+-0x1*-0x9e9+-0x168e),0x13b*0x17+-0x1ad*0xd+-0x2*0x342)){if(_0x3273bb[_0x206c04(0x3bf,0x385,0x2db,0x29c,0x35f)](_0x3273bb[_0x4dc315(-0x1da,-0x220,-0x140,-0x10c,-0x163)],_0x3273bb[_0x57d020(0x2c8,0x226,0x2d0,0x212,0x216)]))(function(){function _0x1c9290(_0x5b4529,_0x43fc3c,_0x1817f9,_0x3d7844,_0x42c34c){return _0x57d020(_0x5b4529-0x72,_0x43fc3c-0xbe,_0x1817f9-0x8f,_0x1817f9,_0x3d7844-0x2bc);}function _0x3c7c25(_0x9ee81f,_0x4f3bfb,_0x29b29a,_0x48ed2a,_0x2d34bf){return _0xc8bd44(_0x9ee81f-0xbf,_0x4f3bfb-0x34a,_0x48ed2a,_0x48ed2a-0x1c8,_0x2d34bf-0x62);}function _0x3d789a(_0x14c8c3,_0x423f74,_0x566c42,_0x2e42c8,_0x232452){return _0x4dc315(_0x566c42-0x2cd,_0x423f74-0x7e,_0x232452,_0x2e42c8-0x198,_0x232452-0x100);}function _0x2e0246(_0x42c28a,_0x15b761,_0x533acc,_0x2973dd,_0x4d1c1b){return _0x206c04(_0x2973dd,_0x15b761-0xad,_0x533acc-0x1f1,_0x2973dd-0x182,_0x533acc- -0x2b);}const _0x127d59={'Dfuno':function(_0x1204d9,_0x5436a0){function _0x32f296(_0x3ae02a,_0x3ca9d2,_0x3470c9,_0x113b84,_0x12eefc){return _0x1914(_0x3ca9d2- -0x236,_0x3ae02a);}return _0x24579c[_0x32f296(-0x88,-0x143,-0x106,-0x1f2,-0xd9)](_0x1204d9,_0x5436a0);},'QDdIj':function(_0x37eb0c,_0x5723f1){function _0x222ed0(_0x111b85,_0x19ab32,_0x3741e0,_0x1a5319,_0x3899cc){return _0x1914(_0x19ab32- -0x19c,_0x111b85);}return _0x24579c[_0x222ed0(-0x46,-0x54,-0xcf,-0xe,-0x9f)](_0x37eb0c,_0x5723f1);},'rUhXY':_0x24579c[_0x3d789a(0x20a,0x1e5,0x179,0x107,0x22f)],'RZwQT':_0x24579c[_0x3c7c25(0x3e7,0x413,0x3ab,0x460,0x38f)],'lZOvD':function(_0x4a96dd){function _0x589a47(_0x388815,_0x4773ac,_0x439aa5,_0x493e42,_0x40ff52){return _0x3d789a(_0x388815-0x1ce,_0x4773ac-0x13c,_0x40ff52-0x2c1,_0x493e42-0xa3,_0x4773ac);}return _0x24579c[_0x589a47(0x3ab,0x4db,0x4dd,0x338,0x40d)](_0x4a96dd);},'ztuQQ':_0x24579c[_0x1c9290(0x4f8,0x54b,0x4f6,0x4a6,0x4f8)],'IbdoK':_0x24579c[_0x923db(-0x246,-0x2ad,-0x373,-0x1fa,-0x268)],'ZqrBP':_0x24579c[_0x3d789a(0x7a,0xed,0xdb,0xee,0x24)],'RiRSP':_0x24579c[_0x1c9290(0x45d,0x423,0x573,0x4b8,0x530)],'wBeRh':_0x24579c[_0x3d789a(0x14d,0x1f6,0x147,0xf0,0x10d)],'siSTO':_0x24579c[_0x1c9290(0x515,0x4bd,0x3eb,0x481,0x497)],'fVQcD':_0x24579c[_0x3d789a(0x126,-0x25,0x98,0x15e,0xb3)],'grmai':function(_0x112ede,_0x55e9ed){function _0x207b7a(_0x37737d,_0x4e4414,_0x4a669a,_0x333d48,_0x15bac9){return _0x1c9290(_0x37737d-0x1bd,_0x4e4414-0x1e2,_0x333d48,_0x37737d- -0x128,_0x15bac9-0x1c4);}return _0x24579c[_0x207b7a(0x334,0x2d9,0x357,0x30d,0x2f9)](_0x112ede,_0x55e9ed);}};function _0x923db(_0x28fc3c,_0x4b7af0,_0x5e7442,_0x23ad0a,_0x3287b6){return _0xc8bd44(_0x28fc3c-0x131,_0x4b7af0- -0x2f9,_0x28fc3c,_0x23ad0a-0xcc,_0x3287b6-0x103);}if(_0x24579c[_0x2e0246(0x321,0x39d,0x32a,0x3e6,0x3bc)](_0x24579c[_0x3c7c25(0x411,0x4bb,0x3ef,0x41a,0x4f3)],_0x24579c[_0x3d789a(0x20a,0xd7,0x130,0x14f,0x1ff)]))return!![];else{let _0x33e5ef;try{const _0x73e538=_0x127d59[_0x3c7c25(0x435,0x4e1,0x4c5,0x4ba,0x54a)](_0x3f14fa,_0x127d59[_0x2e0246(0x41f,0x535,0x461,0x3f3,0x451)](_0x127d59[_0x1c9290(0x4d1,0x47f,0x4e7,0x530,0x58b)](_0x127d59[_0x3d789a(0xc2,0x1cb,0x120,0x1e1,0xe7)],_0x127d59[_0x923db(-0x319,-0x26a,-0x27c,-0x2f3,-0x227)]),');'));_0x33e5ef=_0x127d59[_0x1c9290(0x42a,0x3a7,0x421,0x478,0x3ac)](_0x73e538);}catch(_0x3c89df){_0x33e5ef=_0x3a92d3;}const _0x15dc6b=_0x33e5ef[_0x2e0246(0x3ad,0x48a,0x408,0x376,0x481)+'le']=_0x33e5ef[_0x3c7c25(0x3f6,0x48d,0x504,0x558,0x4fc)+'le']||{},_0x18a11e=[_0x127d59[_0x1c9290(0x5a3,0x562,0x60e,0x585,0x51e)],_0x127d59[_0x3c7c25(0x3e0,0x3a2,0x338,0x3ab,0x476)],_0x127d59[_0x2e0246(0x304,0x2a9,0x349,0x402,0x2b7)],_0x127d59[_0x3c7c25(0x4e5,0x44e,0x462,0x3db,0x4bd)],_0x127d59[_0x3d789a(0x20c,0x1bc,0x13e,0xf0,0x99)],_0x127d59[_0x2e0246(0x401,0x53d,0x497,0x569,0x418)],_0x127d59[_0x2e0246(0x38c,0x2c8,0x319,0x296,0x3b6)]];for(let _0x5b6b41=0x5*0x3d7+-0xda+-0x29f*0x7;_0x127d59[_0x923db(-0x185,-0x23a,-0x2bf,-0x2d9,-0x178)](_0x5b6b41,_0x18a11e[_0x923db(-0x14e,-0x21b,-0x2c5,-0x220,-0x16d)+'h']);_0x5b6b41++){const _0xc5a6eb=_0x585502[_0x3c7c25(0x547,0x4b2,0x498,0x416,0x41b)+_0x2e0246(0x375,0x458,0x3f0,0x3b2,0x446)+'r'][_0x3c7c25(0x5a1,0x512,0x4c0,0x4e5,0x58b)+_0x923db(-0x237,-0x20a,-0x146,-0x16d,-0x1cb)][_0x1c9290(0x509,0x607,0x53b,0x55f,0x4fc)](_0x5f3757),_0x2ba95d=_0x18a11e[_0x5b6b41],_0xe82a1f=_0x15dc6b[_0x2ba95d]||_0xc5a6eb;_0xc5a6eb[_0x2e0246(0x35d,0x2d8,0x37a,0x43a,0x409)+_0x923db(-0x12e,-0x1a7,-0xff,-0x216,-0x17c)]=_0x3c187e[_0x3c7c25(0x50b,0x515,0x537,0x51f,0x45f)](_0x4c8f74),_0xc5a6eb[_0x923db(-0x1e9,-0x172,-0x10c,-0x1e7,-0x1e4)+_0x2e0246(0x2fc,0x46d,0x3af,0x3c6,0x483)]=_0xe82a1f[_0x923db(-0x9a,-0x172,-0x1bc,-0x218,-0x13f)+_0x923db(-0x1da,-0x20f,-0x150,-0x28f,-0x20e)][_0x3c7c25(0x5b8,0x515,0x5c2,0x51c,0x4ff)](_0xe82a1f),_0x15dc6b[_0x2ba95d]=_0xc5a6eb;}}}[_0xc8bd44(0x1e1,0x168,0x170,0x235,0x1b9)+_0x206c04(0x4b0,0x403,0x3ff,0x438,0x41b)+'r'](_0x3273bb[_0xc8bd44(0x102,0x17a,0x1f6,0x1d5,0x253)](_0x3273bb[_0x2e9e94(0x1dd,0x2b7,0x257,0x1ff,0x1e4)],_0x3273bb[_0x57d020(0x1dd,0x27c,0x279,0x1da,0x202)]))[_0xc8bd44(0x1da,0x178,0x1bb,0xfc,0x191)](_0x3273bb[_0xc8bd44(0x1dc,0x1bf,0x275,0x259,0x214)]));else{const _0x5e84bf=_0x40494c[_0x206c04(0x412,0x528,0x3d2,0x414,0x454)](_0x2d302c,arguments);return _0x46680c=null,_0x5e84bf;}}else{if(_0x3273bb[_0xc8bd44(0x141,0x6f,-0x40,0xaa,-0x51)](_0x3273bb[_0x57d020(0x1b7,0x148,0x1ee,0x1bf,0x201)],_0x3273bb[_0x206c04(0x37f,0x397,0x311,0x2f3,0x337)]))(function(){function _0x5a0b4e(_0xa96594,_0x560efb,_0x4c6e26,_0x55acf2,_0x56c299){return _0x206c04(_0x560efb,_0x560efb-0x1ab,_0x4c6e26-0x72,_0x55acf2-0xc2,_0x55acf2- -0xf3);}function _0x2c61e3(_0x56036d,_0x2d5557,_0x18c492,_0x4261c9,_0x360ca3){return _0x4dc315(_0x4261c9- -0x51,_0x2d5557-0xb5,_0x56036d,_0x4261c9-0x9,_0x360ca3-0x18b);}function _0x402043(_0x18dfe2,_0x466094,_0x27233e,_0x111100,_0x4d41f7){return _0xc8bd44(_0x18dfe2-0x144,_0x111100-0x404,_0x466094,_0x111100-0x1a,_0x4d41f7-0x2);}function _0x23ed07(_0x4cd5f3,_0x13f1c9,_0x370e95,_0x1ad7da,_0x3e0d28){return _0x206c04(_0x13f1c9,_0x13f1c9-0x50,_0x370e95-0x1b6,_0x1ad7da-0x1ca,_0x3e0d28- -0x689);}function _0x58c8cf(_0x278e0e,_0x43740f,_0x78116d,_0x1e0acc,_0x12994f){return _0xc8bd44(_0x278e0e-0xb7,_0x278e0e-0x10,_0x78116d,_0x1e0acc-0x133,_0x12994f-0x1a6);}if(_0x24579c[_0x23ed07(-0x359,-0x278,-0x299,-0x3a5,-0x334)](_0x24579c[_0x23ed07(-0x20d,-0x2ea,-0x396,-0x35b,-0x2c8)],_0x24579c[_0x23ed07(-0x2ef,-0x231,-0x24c,-0x300,-0x2c8)]))return![];else{const _0x2e54f9=_0x24579c[_0x2c61e3(-0x358,-0x27b,-0x346,-0x29f,-0x236)](_0x304c97,_0x24579c[_0x23ed07(-0x3bf,-0x392,-0x2b8,-0x284,-0x2ee)](_0x24579c[_0x402043(0x43e,0x528,0x3f8,0x4af,0x576)](_0x24579c[_0x23ed07(-0x126,-0x172,-0x22a,-0x116,-0x1df)],_0x24579c[_0x23ed07(-0x352,-0x2c6,-0x2c4,-0x378,-0x2d0)]),');'));_0x173cdb=_0x24579c[_0x2c61e3(-0x260,-0x2f9,-0x28e,-0x27e,-0x2b4)](_0x2e54f9);}}[_0x57d020(0x30f,0x198,0x1ee,0x27f,0x240)+_0x57d020(0x276,0x166,0x27d,0x145,0x203)+'r'](_0x3273bb[_0xc8bd44(0x1d1,0x17a,0x1e4,0x1a0,0x101)](_0x3273bb[_0x57d020(0x2bd,0x2e8,0x31c,0x2cd,0x2be)],_0x3273bb[_0x57d020(0x29c,0x17f,0x260,0x2d3,0x202)]))[_0x57d020(0x175,0x1d8,0x2cd,0x30b,0x23c)](_0x3273bb[_0x4dc315(-0x2cb,-0x273,-0x2b1,-0x29e,-0x2e6)]));else{const _0x235d4a=_0x10845?function(){function _0x4251ea(_0x25b08d,_0x52929b,_0x10962a,_0x4b2cf3,_0x42cc77){return _0xc8bd44(_0x25b08d-0x1d7,_0x4b2cf3- -0x323,_0x42cc77,_0x4b2cf3-0x11f,_0x42cc77-0x146);}if(_0x345a33){const _0x2b4276=_0x4a533b[_0x4251ea(-0x132,-0x219,-0x1bc,-0x1bf,-0x237)](_0xa1ac46,arguments);return _0x384c1d=null,_0x2b4276;}}:function(){};return _0x30f787=![],_0x235d4a;}}}else{const _0x344819=_0x48d393[_0x4dc315(-0x1aa,-0x1ac,-0x19a,-0x16f,-0x17b)](_0x1d3721,arguments);return _0x4fe81b=null,_0x344819;}}function _0x2e9e94(_0x10c3e7,_0x3e9241,_0x3f36cd,_0x572a61,_0x2c5376){return _0x34c820(_0x10c3e7-0x16e,_0x3e9241-0x189,_0x2c5376,_0x572a61-0x4f,_0x3e9241-0xb);}_0x3273bb[_0x4dc315(-0x2cc,-0x2df,-0x396,-0x234,-0x388)](_0x8b64dd,++_0x5b066b);}try{if(_0x285cb8)return _0x8b64dd;else _0x3273bb[_0x4ab6cd(0x1d8,0x23c,0x237,0x227,0x2a9)](_0x8b64dd,0xa*0x2f9+-0x2*0x117f+0x544);}catch(_0x107c24){}}
for (Fg = 0; 288 > Fg; ++Fg) Uf[Fg] = Hg.subarray(0, Fg + 1);
(function (a, b) {
    try {
        var c = indexedDB.open("emscripten_filesystem", 1)
    } catch (d) {
        b(d);
        return
    }
    c.onupgradeneeded = d => {
        d = d.target.result;
        d.objectStoreNames.contains("FILES") && d.deleteObjectStore("FILES");
        d.createObjectStore("FILES")
    };
    c.onsuccess = d => a(d.target.result);
    c.onerror = d => b(d)
})(a => {
    kg = a;
    Hb("library_fetch_init")
}, () => {
    kg = !1;
    Hb("library_fetch_init")
});
"undefined" != typeof ENVIRONMENT_IS_FETCH_WORKER && ENVIRONMENT_IS_FETCH_WORKER || Gb("library_fetch_init");

function ic(a, b) {
    var c = Array(aa(a) + 1);
    a = qb(a, c, 0, c.length);
    b && (c.length = a);
    return c
}
var Xg = {
    Wb: function (a) {
        try {
            a = x(a);
            var b = D(a, {
                Cj: !0
            });
            if (null === b.node) throw new Q(44);
            if (16384 !== (b.node.mode & 61440)) throw new Q(54);
            var c = Cc(b.node, "x");
            if (c) throw new Q(c);
            cc = b.path;
            return 0
        } catch (d) {
            if ("undefined" == typeof fd || !(d instanceof Q)) throw d;
            return -d.Si
        }
    },
    Ga: function (a, b, c) {
        jd = c;
        try {
            var d = ld(a);
            switch (b) {
                case 0:
                    var e = kd();
                    return 0 > e ? -28 : Kc(d, e).fd;
                case 1:
                case 2:
                    return 0;
                case 3:
                    return d.flags;
                case 4:
                    return e = kd(), d.flags |= e, 0;
                case 5:
                    return e = kd(), eb[e + 0 >> 1] = 2, 0;
                case 6:
                case 7:
                    return 0;
                case 16:
                case 8:
                    return -28;
                case 9:
                    return G[Ig() >> 2] = 28, -1;
                default:
                    return -28
            }
        } catch (f) {
            if ("undefined" == typeof fd || !(f instanceof Q)) throw f;
            return -f.Si
        }
    },
    Hb: function (a, b, c) {
        try {
            var d = ld(a);
            d.Dj || (d.Dj = Aa(d.path));
            a = 0;
            for (var e = Tc(d, 0, 1), f = Math.floor(e / 280); f < d.Dj.length && a + 280 <= c;) {
                var g = d.Dj[f];
                if ("." === g) {
                    var l = d.node.id;
                    var n = 4
                } else if (".." === g) l = D(d.path, {
                    parent: !0
                }).node.id, n = 4;
                else {
                    var q = oc(d.node, g);
                    l = q.id;
                    n = 8192 === (q.mode & 61440) ? 2 : 16384 === (q.mode & 61440) ? 4 : 40960 === (q.mode & 61440) ? 10 : 8
                }
                fb = [l >>>
                    0, (H = l, 1 <= +Math.abs(H) ? 0 < H ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)
                ];
                G[b + a >> 2] = fb[0];
                G[b + a + 4 >> 2] = fb[1];
                fb = [280 * (f + 1) >>> 0, (H = 280 * (f + 1), 1 <= +Math.abs(H) ? 0 < H ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
                G[b + a + 8 >> 2] = fb[0];
                G[b + a + 12 >> 2] = fb[1];
                eb[b + a + 16 >> 1] = 280;
                E[b + a + 18 >> 0] = n;
                u(g, b + a + 19, 256);
                a += 280;
                f += 1
            }
            Tc(d, 280 * f, 0);
            return a
        } catch (p) {
            if ("undefined" == typeof fd || !(p instanceof Q)) throw p;
            return -p.Si
        }
    },
    Xb: function (a, b, c) {
        jd = c;
        try {
            var d = ld(a);
            switch (b) {
                case 21509:
                case 21505:
                    return d.tty ? 0 : -59;
                case 21510:
                case 21511:
                case 21512:
                case 21506:
                case 21507:
                case 21508:
                    return d.tty ? 0 : -59;
                case 21519:
                    if (!d.tty) return -59;
                    var e = kd();
                    return G[e >> 2] = 0;
                case 21520:
                    return d.tty ? -28 : -59;
                case 21531:
                    a = e = kd();
                    if (!d.Qi.Gl) throw new Q(59);
                    return d.Qi.Gl(d, b, a);
                case 21523:
                    return d.tty ? 0 : -59;
                case 21524:
                    return d.tty ? 0 : -59;
                default:
                    cb("bad ioctl syscall " + b)
            }
        } catch (f) {
            if ("undefined" == typeof fd || !(f instanceof Q)) throw f;
            return -f.Si
        }
    },
    Lb: function (a, b) {
        try {
            return a = x(a), hd(Pc, a, b)
        } catch (c) {
            if ("undefined" == typeof fd || !(c instanceof Q)) throw c;
            return -c.Si
        }
    },
    Ib: function (a, b, c) {
        try {
            return b = x(b), b = gd(a, b), b = za(b), "/" === b[b.length - 1] && (b = b.substr(0, b.length - 1)), Nb(b, c), 0
        } catch (d) {
            if ("undefined" == typeof fd || !(d instanceof Q)) throw d;
            return -d.Si
        }
    },
    Mb: function (a, b, c, d) {
        try {
            b = x(b);
            var e = d & 256;
            b = gd(a, b, d & 4096);
            return hd(e ? Pc : Ba, b, c)
        } catch (f) {
            if ("undefined" == typeof fd || !(f instanceof Q)) throw f;
            return -f.Si
        }
    },
    Da: function (a, b,
        c, d) {
        jd = d;
        try {
            b = x(b);
            b = gd(a, b);
            var e = d ? kd() : 0;
            return Rc(b, c, e).fd
        } catch (f) {
            if ("undefined" == typeof fd || !(f instanceof Q)) throw f;
            return -f.Si
        }
    },
    Gb: function (a, b, c, d) {
        try {
            b = x(b);
            b = gd(a, b);
            if (0 >= d) var e = -28;
            else {
                var f = xc(b),
                    g = Math.min(d, aa(f)),
                    l = E[c + g];
                u(f, c, d + 1);
                E[c + g] = l;
                e = g
            }
            return e
        } catch (n) {
            if ("undefined" == typeof fd || !(n instanceof Q)) throw n;
            return -n.Si
        }
    },
    Db: function (a, b, c, d) {
        try {
            b = x(b);
            d = x(d);
            b = gd(a, b);
            d = gd(c, d);
            a = b;
            var e = Zb(a),
                f = Zb(d),
                g = $b(a),
                l = $b(d);
            var n = D(a, {
                parent: !0
            });
            var q = n.node;
            n = D(d, {
                parent: !0
            });
            var p = n.node;
            if (!q || !p) throw new Q(44);
            if (q.Vi !== p.Vi) throw new Q(75);
            var t = oc(q, g),
                v = dc(a, f);
            if ("." !== v.charAt(0)) throw new Q(28);
            v = dc(d, e);
            if ("." !== v.charAt(0)) throw new Q(55);
            try {
                var r = oc(p, l)
            } catch (F) {}
            if (t !== r) {
                var C = 16384 === (t.mode & 61440),
                    y = Hc(q, g, C);
                if (y) throw new Q(y);
                if (y = r ? Hc(p, l, C) : Gc(p, l)) throw new Q(y);
                if (!q.Oi.rename) throw new Q(63);
                if (t.tj || r && r.tj) throw new Q(10);
                if (p !== q && (y = Cc(q, "w"))) throw new Q(y);
                Bc(t);
                try {
                    q.Oi.rename(t, p, l)
                } catch (F) {
                    throw F;
                } finally {
                    Ac(t)
                }
            }
            return 0
        } catch (F) {
            if ("undefined" ==
                typeof fd || !(F instanceof Q)) throw F;
            return -F.Si
        }
    },
    Eb: function (a) {
        try {
            return a = x(a), Ga(a), 0
        } catch (b) {
            if ("undefined" == typeof fd || !(b instanceof Q)) throw b;
            return -b.Si
        }
    },
    Nb: function (a, b) {
        try {
            return a = x(a), hd(Ba, a, b)
        } catch (c) {
            if ("undefined" == typeof fd || !(c instanceof Q)) throw c;
            return -c.Si
        }
    },
    Fb: function (a, b, c) {
        try {
            return b = x(b), b = gd(a, b), 0 === c ? Ha(b) : 512 === c ? Ga(b) : cb("Invalid flags passed to unlinkat"), 0
        } catch (d) {
            if ("undefined" == typeof fd || !(d instanceof Q)) throw d;
            return -d.Si
        }
    },
    Vb: function () {
        cb("To use dlopen, you need enable dynamic linking, see https://github.com/emscripten-core/emscripten/wiki/Linking")
    },
    ha: function () {
        return Date.now()
    },
    jh: function (a) {
        delete ig[a - 1]
    },
    hh: function (a, b, c) {
        a = ig[a - 1].getAllResponseHeaders();
        var d = aa(a) + 1;
        u(a, b, c);
        return Math.min(d, c)
    },
    ih: function (a) {
        return aa(ig[a - 1].getAllResponseHeaders()) + 1
    },
    Ob: function () {
        return !0
    },
    Bb: function () {
        throw Infinity;
    },
    Pb: function (a, b) {
        a = new Date(1E3 * G[a >> 2]);
        G[b >> 2] = a.getUTCSeconds();
        G[b + 4 >> 2] = a.getUTCMinutes();
        G[b + 8 >> 2] = a.getUTCHours();
        G[b + 12 >> 2] = a.getUTCDate();
        G[b + 16 >> 2] = a.getUTCMonth();
        G[b + 20 >> 2] = a.getUTCFullYear() - 1900;
        G[b + 24 >> 2] = a.getUTCDay();
        G[b + 28 >> 2] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864E5 | 0
    },
    Qb: function (a, b) {
        a = new Date(1E3 * G[a >> 2]);
        G[b >> 2] = a.getSeconds();
        G[b + 4 >> 2] = a.getMinutes();
        G[b + 8 >> 2] = a.getHours();
        G[b + 12 >> 2] = a.getDate();
        G[b + 16 >> 2] = a.getMonth();
        G[b + 20 >> 2] = a.getFullYear() - 1900;
        G[b + 24 >> 2] = a.getDay();
        var c = new Date(a.getFullYear(), 0, 1);
        G[b + 28 >> 2] = (a.getTime() - c.getTime()) / 864E5 | 0;
        G[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
        var d = (new Date(a.getFullYear(), 6, 1)).getTimezoneOffset();
        c = c.getTimezoneOffset();
        G[b + 32 >> 2] =
            (d != c && a.getTimezoneOffset() == Math.min(c, d)) | 0
    },
    Rb: function (a) {
        var b = new Date(G[a + 20 >> 2] + 1900, G[a + 16 >> 2], G[a + 12 >> 2], G[a + 8 >> 2], G[a + 4 >> 2], G[a >> 2], 0),
            c = G[a + 32 >> 2],
            d = b.getTimezoneOffset(),
            e = new Date(b.getFullYear(), 0, 1),
            f = (new Date(b.getFullYear(), 6, 1)).getTimezoneOffset(),
            g = e.getTimezoneOffset(),
            l = Math.min(g, f);
        0 > c ? G[a + 32 >> 2] = Number(f != g && l == d) : 0 < c != (l == d) && (f = Math.max(g, f), b.setTime(b.getTime() + 6E4 * ((0 < c ? l : f) - d)));
        G[a + 24 >> 2] = b.getDay();
        G[a + 28 >> 2] = (b.getTime() - e.getTime()) / 864E5 | 0;
        G[a >> 2] = b.getSeconds();
        G[a + 4 >> 2] = b.getMinutes();
        G[a + 8 >> 2] = b.getHours();
        G[a + 12 >> 2] = b.getDate();
        G[a + 16 >> 2] = b.getMonth();
        return b.getTime() / 1E3 | 0
    },
    Sb: function (a) {
        var b = new Date(Date.UTC(G[a + 20 >> 2] + 1900, G[a + 16 >> 2], G[a + 12 >> 2], G[a + 8 >> 2], G[a + 4 >> 2], G[a >> 2], 0));
        G[a + 24 >> 2] = b.getUTCDay();
        G[a + 28 >> 2] = (b.getTime() - Date.UTC(b.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864E5 | 0;
        return b.getTime() / 1E3 | 0
    },
    Tb: nd,
    x: function () {
        cb("")
    },
    Ch: function (a) {
        if (12448 == a) return U = 12288, 1;
        U = 12300;
        return 0
    },
    Fh: function (a, b, c, d, e) {
        if (62E3 != a) U = 12296, c = 0;
        else {
            if (b)
                for (;;) {
                    a =
                        G[b >> 2];
                    if (12321 == a) he.alpha = 0 < G[b + 4 >> 2];
                    else if (12325 == a) he.depth = 0 < G[b + 4 >> 2];
                    else if (12326 == a) he.stencil = 0 < G[b + 4 >> 2];
                    else if (12337 == a) a = G[b + 4 >> 2], he.antialias = 0 < a;
                    else if (12338 == a) a = G[b + 4 >> 2], he.antialias = 1 == a;
                    else if (12544 == a) he.jm = 12547 != G[b + 4 >> 2];
                    else if (12344 == a) break;
                    b += 8
                }
            c && d || e ? (e && (G[e >> 2] = 1), c && 0 < d && (G[c >> 2] = 62002), U = 12288, c = 1) : (U = 12300, c = 0)
        }
        return c
    },
    th: function (a, b, c, d) {
        if (62E3 != a) return U = 12296, 0;
        for (a = 1;;) {
            b = G[d >> 2];
            if (12440 == b) a = G[d + 4 >> 2];
            else if (12344 == b) break;
            else return U = 12292,
                0;
            d += 8
        }
        if (2 > a || 3 < a) return U = 12293, 0;
        he.Wj = a - 1;
        he.Jl = 0;
        je = Sd(h.canvas, he);
        if (0 != je) return U = 12288, Ud(je), h.Vl = !0, Jd.forEach(function (e) {
            e()
        }), Ud(null), 62004;
        U = 12297;
        return 0
    },
    vh: function (a, b) {
        if (62E3 != a) return U = 12296, 0;
        if (62002 != b) return U = 12293, 0;
        U = 12288;
        return 62006
    },
    uh: function (a, b) {
        if (62E3 != a) return U = 12296, 0;
        if (62004 != b) return U = 12294, 0;
        a = je;
        S === Td[a] && (S = null);
        if ("object" == typeof cf)
            for (var c = Td[a].gj.canvas, d = 0; d < Se.length; ++d) Se[d].target != c || Te(d--);
        Td[a] && Td[a].gj.canvas && (Td[a].gj.canvas.Pj =
            void 0);
        Td[a] = null;
        U = 12288;
        ee == b && (ee = 0);
        return 1
    },
    wh: function (a, b) {
        if (62E3 != a) return U = 12296, 0;
        if (62006 != b) return U = 12301, 1;
        fe == b && (fe = 0);
        ge == b && (ge = 0);
        U = 12288;
        return 1
    },
    Gh: function (a, b, c, d) {
        if (62E3 != a) return U = 12296, 0;
        if (62002 != b) return U = 12293, 0;
        if (!d) return U = 12300, 0;
        U = 12288;
        switch (c) {
            case 12320:
                return G[d >> 2] = he.alpha ? 32 : 24, 1;
            case 12321:
                return G[d >> 2] = he.alpha ? 8 : 0, 1;
            case 12322:
                return G[d >> 2] = 8, 1;
            case 12323:
                return G[d >> 2] = 8, 1;
            case 12324:
                return G[d >> 2] = 8, 1;
            case 12325:
                return G[d >> 2] = he.depth ? 24 :
                    0, 1;
            case 12326:
                return G[d >> 2] = he.stencil ? 8 : 0, 1;
            case 12327:
                return G[d >> 2] = 12344, 1;
            case 12328:
                return G[d >> 2] = 62002, 1;
            case 12329:
                return G[d >> 2] = 0, 1;
            case 12330:
                return G[d >> 2] = 4096, 1;
            case 12331:
                return G[d >> 2] = 16777216, 1;
            case 12332:
                return G[d >> 2] = 4096, 1;
            case 12333:
                return G[d >> 2] = 0, 1;
            case 12334:
                return G[d >> 2] = 0, 1;
            case 12335:
                return G[d >> 2] = 12344, 1;
            case 12337:
                return G[d >> 2] = he.antialias ? 4 : 0, 1;
            case 12338:
                return G[d >> 2] = he.antialias ? 1 : 0, 1;
            case 12339:
                return G[d >> 2] = 4, 1;
            case 12340:
                return G[d >> 2] = 12344, 1;
            case 12341:
            case 12342:
            case 12343:
                return G[d >>
                    2] = -1, 1;
            case 12345:
            case 12346:
                return G[d >> 2] = 0, 1;
            case 12347:
                return G[d >> 2] = 0, 1;
            case 12348:
                return G[d >> 2] = 1;
            case 12349:
            case 12350:
                return G[d >> 2] = 0, 1;
            case 12351:
                return G[d >> 2] = 12430, 1;
            case 12352:
                return G[d >> 2] = 4, 1;
            case 12354:
                return G[d >> 2] = 0, 1;
            default:
                return U = 12292, 0
        }
    },
    Ya: function () {
        U = 12288;
        return 62E3
    },
    sh: function () {
        return U
    },
    Dh: function (a, b, c) {
        if (62E3 == a) return b && (G[b >> 2] = 1), c && (G[c >> 2] = 4), de = !0, U = 12288, 1;
        U = 12296;
        return 0
    },
    xh: function (a, b, c, d) {
        if (62E3 != a) return U = 12296, 0;
        if (0 != d && 62004 != d) return U =
            12294, 0;
        if (0 != c && 62006 != c || 0 != b && 62006 != b) return U = 12301, 0;
        Ud(d ? je : null);
        ee = d;
        ge = b;
        fe = c;
        U = 12288;
        return 1
    },
    rh: function (a, b) {
        if (62E3 != a) return U = 12296, 0;
        U = 12288;
        if (ie[b]) return ie[b];
        switch (b) {
            case 12371:
                a = rb("Emscripten");
                break;
            case 12372:
                a = rb("1.4 Emscripten EGL");
                break;
            case 12373:
                a = rb("");
                break;
            case 12429:
                a = rb("OpenGL_ES");
                break;
            default:
                return U = 12300, 0
        }
        return ie[b] = a
    },
    yh: function () {
        if (de)
            if (h.ij)
                if (h.ij.isContextLost()) U = 12302;
                else return U = 12288, 1;
        else U = 12290;
        else U = 12289;
        return 0
    },
    zh: function (a,
        b) {
        if (62E3 != a) return U = 12296, 0;
        0 == b ? od(0, 0) : od(1, b);
        U = 12288;
        return 1
    },
    Eh: function (a) {
        if (62E3 != a) return U = 12296, 0;
        ge = fe = ee = 0;
        de = !1;
        U = 12288;
        return 1
    },
    Bh: function () {
        U = 12288;
        return 1
    },
    Ah: function () {
        U = 12288;
        return 1
    },
    w: function (a, b, c) {
        return Me(a, b, c)
    },
    c: Me,
    Rh: function (a, b, c, d, e, f, g, l) {
        function n() {
            if (g) {
                var v = 0;
                if (p.statusText) {
                    var r = aa(p.statusText) + 1;
                    v = lb(r);
                    u(p.statusText, v, r)
                }
                P(g)(t, d, p.status, v)
            }
        }
        var q = x(a);
        a = x(b);
        c = x(c);
        var p = new XMLHttpRequest;
        p.open(a, q, !0);
        p.responseType = "arraybuffer";
        var t =
            Pe();
        p.onload = function () {
            if (200 <= p.status && 300 > p.status || 0 === p.status && "http" != q.substr(0, 4).toLowerCase()) {
                var v = new Uint8Array(p.response),
                    r = m(v.length);
                A.set(v, r);
                f && P(f)(t, d, r, v.length);
                e && ca(r)
            } else n();
            delete Ne[t]
        };
        p.onerror = function () {
            n();
            delete Ne[t]
        };
        p.onprogress = function (v) {
            l && P(l)(t, d, v.loaded, v.lengthComputable || void 0 === v.lengthComputable ? v.total : 0)
        };
        p.onabort = function () {
            delete Ne[t]
        };
        "POST" == a ? (p.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), p.send(c)) : p.send(null);
        Ne[t] = p;
        return t
    },
    Kh: function (a) {
        clearInterval(a)
    },
    mh: function () {
        if (!bf()) return -1;
        We(Af);
        var a = rf[1];
        if (a.exitFullscreen) a.fullscreenElement && a.exitFullscreen();
        else if (a.webkitExitFullscreen) a.webkitFullscreenElement && a.webkitExitFullscreen();
        else return -1;
        return 0
    },
    ph: function () {
        We(Bf);
        if (document.exitPointerLock) document.exitPointerLock();
        else if (document.Ni) document.Ni();
        else return -1;
        return 0
    },
    Th: tf,
    E: function () {
        return "number" == typeof devicePixelRatio && devicePixelRatio || 1
    },
    r: function (a, b, c) {
        a =
            sf(a);
        if (!a) return -4;
        a = zf(a);
        gb[b >> 3] = a.width;
        gb[c >> 3] = a.height;
        return 0
    },
    ab: function (a, b) {
        if (0 > a || a >= df.length) return -5;
        if (!df[a]) return -7;
        Cf(b, df[a]);
        return 0
    },
    ga: vd,
    Hh: function () {
        return df.length
    },
    qh: function (a, b) {
        G[a >> 2] = screen.width;
        G[b >> 2] = screen.height
    },
    Pg: function (a) {
        T.activeTexture(a)
    },
    Og: function (a, b) {
        T.attachShader(V[a], W[b])
    },
    Qd: function (a, b) {
        T.beginQuery(a, ue[b])
    },
    dh: function (a, b) {
        T.Zi.beginQueryEXT(a, ue[b])
    },
    td: function (a) {
        T.beginTransformFeedback(a)
    },
    Ng: function (a, b, c) {
        T.bindAttribLocation(V[a],
            b, x(c))
    },
    Mg: function (a, b) {
        34962 == a ? T.nj = b : 34963 == a && (T.fj = b);
        35051 == a ? T.Aj = b : 35052 == a && (T.Wi = b);
        T.bindBuffer(a, oe[b])
    },
    qd: function (a, b, c) {
        T.bindBufferBase(a, b, oe[c])
    },
    rd: function (a, b, c, d, e) {
        T.bindBufferRange(a, b, oe[c], d, e)
    },
    Lg: function (a, b) {
        T.bindFramebuffer(a, qe[b])
    },
    Kg: function (a, b) {
        T.bindRenderbuffer(a, re[b])
    },
    xc: function (a, b) {
        T.bindSampler(a, ve[b])
    },
    Jg: function (a, b) {
        T.bindTexture(a, se[b])
    },
    pc: function (a, b) {
        T.bindTransformFeedback(a, we[b])
    },
    yd: function (a) {
        T.bindVertexArray(te[a]);
        a = T.getParameter(34965);
        T.fj = a ? a.name | 0 : 0
    },
    Xg: function (a) {
        T.bindVertexArray(te[a]);
        a = T.getParameter(34965);
        T.fj = a ? a.name | 0 : 0
    },
    Ig: function (a, b, c, d) {
        T.blendColor(a, b, c, d)
    },
    Hg: function (a) {
        T.blendEquation(a)
    },
    Gg: function (a, b) {
        T.blendEquationSeparate(a, b)
    },
    Fg: function (a, b) {
        T.blendFunc(a, b)
    },
    Eg: function (a, b, c, d) {
        T.blendFuncSeparate(a, b, c, d)
    },
    Dd: function (a, b, c, d, e, f, g, l, n, q) {
        T.blitFramebuffer(a, b, c, d, e, f, g, l, n, q)
    },
    Dg: function (a, b, c, d) {
        2 <= S.version ? c ? T.bufferData(a, A, d, c, b) : T.bufferData(a, b, d) : T.bufferData(a, c ? A.subarray(c, c + b) :
            b, d)
    },
    Cg: function (a, b, c, d) {
        2 <= S.version ? T.bufferSubData(a, b, A, d, c) : T.bufferSubData(a, b, A.subarray(d, d + c))
    },
    Bg: function (a) {
        return T.checkFramebufferStatus(a)
    },
    Ag: function (a) {
        T.clear(a)
    },
    Uc: function (a, b, c, d) {
        T.clearBufferfi(a, b, c, d)
    },
    Vc: function (a, b, c) {
        T.clearBufferfv(a, b, I, c >> 2)
    },
    Xc: function (a, b, c) {
        T.clearBufferiv(a, b, G, c >> 2)
    },
    Wc: function (a, b, c) {
        T.clearBufferuiv(a, b, N, c >> 2)
    },
    zg: function (a, b, c, d) {
        T.clearColor(a, b, c, d)
    },
    yg: function (a) {
        T.clearDepth(a)
    },
    xg: function (a) {
        T.clearStencil(a)
    },
    Gc: function (a,
        b, c, d) {
        return T.clientWaitSync(xe[a], b, (c >>> 0) + 4294967296 * d)
    },
    wg: function (a, b, c, d) {
        T.colorMask(!!a, !!b, !!c, !!d)
    },
    vg: function (a) {
        T.compileShader(W[a])
    },
    ug: function (a, b, c, d, e, f, g, l) {
        2 <= S.version ? T.Wi ? T.compressedTexImage2D(a, b, c, d, e, f, g, l) : T.compressedTexImage2D(a, b, c, d, e, f, A, l, g) : T.compressedTexImage2D(a, b, c, d, e, f, l ? A.subarray(l, l + g) : null)
    },
    Vd: function (a, b, c, d, e, f, g, l, n) {
        T.Wi ? T.compressedTexImage3D(a, b, c, d, e, f, g, l, n) : T.compressedTexImage3D(a, b, c, d, e, f, g, A, n, l)
    },
    tg: function (a, b, c, d, e, f, g, l, n) {
        2 <= S.version ?
            T.Wi ? T.compressedTexSubImage2D(a, b, c, d, e, f, g, l, n) : T.compressedTexSubImage2D(a, b, c, d, e, f, g, A, n, l) : T.compressedTexSubImage2D(a, b, c, d, e, f, g, n ? A.subarray(n, n + l) : null)
    },
    Ud: function (a, b, c, d, e, f, g, l, n, q, p) {
        T.Wi ? T.compressedTexSubImage3D(a, b, c, d, e, f, g, l, n, q, p) : T.compressedTexSubImage3D(a, b, c, d, e, f, g, l, n, A, p, q)
    },
    Sc: function (a, b, c, d, e) {
        T.copyBufferSubData(a, b, c, d, e)
    },
    sg: function (a, b, c, d, e, f, g, l) {
        T.copyTexImage2D(a, b, c, d, e, f, g, l)
    },
    rg: function (a, b, c, d, e, f, g, l) {
        T.copyTexSubImage2D(a, b, c, d, e, f, g, l)
    },
    Wd: function (a,
        b, c, d, e, f, g, l, n) {
        T.copyTexSubImage3D(a, b, c, d, e, f, g, l, n)
    },
    qg: function () {
        var a = De(V),
            b = T.createProgram();
        b.name = a;
        b.qj = b.oj = b.pj = 0;
        b.gk = 1;
        V[a] = b;
        return a
    },
    pg: function (a) {
        var b = De(W);
        W[b] = T.createShader(a);
        return b
    },
    og: function (a) {
        T.cullFace(a)
    },
    ng: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = G[b + 4 * c >> 2],
                e = oe[d];
            e && (T.deleteBuffer(e), e.name = 0, oe[d] = null, d == T.nj && (T.nj = 0), d == T.fj && (T.fj = 0), d == T.Aj && (T.Aj = 0), d == T.Wi && (T.Wi = 0))
        }
    },
    mg: function (a, b) {
        for (var c = 0; c < a; ++c) {
            var d = G[b + 4 * c >> 2],
                e = qe[d];
            e && (T.deleteFramebuffer(e),
                e.name = 0, qe[d] = null)
        }
    },
    lg: function (a) {
        if (a) {
            var b = V[a];
            b ? (T.deleteProgram(b), b.name = 0, V[a] = null) : X(1281)
        }
    },
    Sd: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = G[b + 4 * c >> 2],
                e = ue[d];
            e && (T.deleteQuery(e), ue[d] = null)
        }
    },
    fh: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = G[b + 4 * c >> 2],
                e = ue[d];
            e && (T.Zi.deleteQueryEXT(e), ue[d] = null)
        }
    },
    kg: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = G[b + 4 * c >> 2],
                e = re[d];
            e && (T.deleteRenderbuffer(e), e.name = 0, re[d] = null)
        }
    },
    zc: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = G[b + 4 * c >> 2],
                e = ve[d];
            e && (T.deleteSampler(e),
                e.name = 0, ve[d] = null)
        }
    },
    jg: function (a) {
        if (a) {
            var b = W[a];
            b ? (T.deleteShader(b), W[a] = null) : X(1281)
        }
    },
    Hc: function (a) {
        if (a) {
            var b = xe[a];
            b ? (T.deleteSync(b), b.name = 0, xe[a] = null) : X(1281)
        }
    },
    hg: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = G[b + 4 * c >> 2],
                e = se[d];
            e && (T.deleteTexture(e), e.name = 0, se[d] = null)
        }
    },
    oc: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = G[b + 4 * c >> 2],
                e = we[d];
            e && (T.deleteTransformFeedback(e), e.name = 0, we[d] = null)
        }
    },
    xd: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = G[b + 4 * c >> 2];
            T.deleteVertexArray(te[d]);
            te[d] = null
        }
    },
    Wg: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = G[b + 4 * c >> 2];
            T.deleteVertexArray(te[d]);
            te[d] = null
        }
    },
    gg: function (a) {
        T.depthFunc(a)
    },
    fg: function (a) {
        T.depthMask(!!a)
    },
    eg: function (a, b) {
        T.depthRange(a, b)
    },
    dg: function (a, b) {
        T.detachShader(V[a], W[b])
    },
    cg: function (a) {
        T.disable(a)
    },
    bg: function (a) {
        S.ej[a].enabled = !1;
        T.disableVertexAttribArray(a)
    },
    ag: function (a, b, c) {
        Ge(b + c);
        T.drawArrays(a, b, c);
        Ie()
    },
    Lc: function (a, b, c, d) {
        T.drawArraysInstanced(a, b, c, d)
    },
    Sg: function (a, b, c, d) {
        T.drawArraysInstanced(a, b, c, d)
    },
    _b: function (a,
        b, c, d) {
        T.drawArraysInstanced(a, b, c, d)
    },
    be: function (a, b, c, d) {
        T.drawArraysInstanced(a, b, c, d)
    },
    $b: function (a, b, c, d) {
        T.drawArraysInstanced(a, b, c, d)
    },
    Kd: function (a, b) {
        for (var c = Df[a], d = 0; d < a; d++) c[d] = G[b + 4 * d >> 2];
        T.drawBuffers(c)
    },
    $d: function (a, b) {
        for (var c = Df[a], d = 0; d < a; d++) c[d] = G[b + 4 * d >> 2];
        T.drawBuffers(c)
    },
    Tg: function (a, b) {
        for (var c = Df[a], d = 0; d < a; d++) c[d] = G[b + 4 * d >> 2];
        T.drawBuffers(c)
    },
    $f: function (a, b, c, d) {
        if (!T.fj) {
            var e = 1 * ye[c - 5120] * b;
            var f = Ee(e);
            T.bindBuffer(34963, f);
            T.bufferSubData(34963, 0, A.subarray(d,
                d + e));
            d = 0
        }
        Ge(b);
        T.drawElements(a, b, c, d);
        Ie();
        T.fj || T.bindBuffer(34963, null)
    },
    Kc: function (a, b, c, d, e) {
        T.drawElementsInstanced(a, b, c, d, e)
    },
    Rg: function (a, b, c, d, e) {
        T.drawElementsInstanced(a, b, c, d, e)
    },
    Yb: function (a, b, c, d, e) {
        T.drawElementsInstanced(a, b, c, d, e)
    },
    Zb: function (a, b, c, d, e) {
        T.drawElementsInstanced(a, b, c, d, e)
    },
    ae: function (a, b, c, d, e) {
        T.drawElementsInstanced(a, b, c, d, e)
    },
    Zd: function (a, b, c, d, e, f) {
        b = f;
        T.fj || (f = 1 * ye[e - 5120] * d, c = Ee(f), T.bindBuffer(34963, c), T.bufferSubData(34963, 0, A.subarray(b, b + f)), b = 0);
        Ge(d);
        T.drawElements(a, d, e, b);
        Ie();
        T.fj || T.bindBuffer(34963, null)
    },
    _f: function (a) {
        T.enable(a)
    },
    Zf: function (a) {
        S.ej[a].enabled = !0;
        T.enableVertexAttribArray(a)
    },
    Pd: function (a) {
        T.endQuery(a)
    },
    ch: function (a) {
        T.Zi.endQueryEXT(a)
    },
    sd: function () {
        T.endTransformFeedback()
    },
    Jc: function (a, b) {
        return (a = T.fenceSync(a, b)) ? (b = De(xe), a.name = b, xe[b] = a, b) : 0
    },
    Yf: function () {
        T.finish()
    },
    Xf: function () {
        T.flush()
    },
    zd: function (a, b, c) {
        if (Ff(a)) {
            var d = pe[Ef(a)];
            d ? d.Ik & 16 ? 0 > b || 0 > c || b + c > d.length ? (X(1281), k("invalid range in glFlushMappedBufferRange")) :
                T.bufferSubData(a, d.offset, A.subarray(d.Fj + b, d.Fj + b + c)) : (X(1282), k("buffer was not mapped with GL_MAP_FLUSH_EXPLICIT_BIT in glFlushMappedBufferRange")) : (X(1282), k("buffer was never mapped in glFlushMappedBufferRange"))
        } else X(1280), k("GL_INVALID_ENUM in glFlushMappedBufferRange")
    },
    Wf: function (a, b, c, d) {
        T.framebufferRenderbuffer(a, b, c, re[d])
    },
    Vf: function (a, b, c, d, e) {
        T.framebufferTexture2D(a, b, c, se[d], e)
    },
    Bd: function (a, b, c, d, e) {
        T.framebufferTextureLayer(a, b, se[c], d, e)
    },
    Uf: function (a) {
        T.frontFace(a)
    },
    Tf: function (a, b) {
        Gf(a, b, "createBuffer", oe)
    },
    Rf: function (a, b) {
        Gf(a, b, "createFramebuffer", qe)
    },
    Td: function (a, b) {
        Gf(a, b, "createQuery", ue)
    },
    gh: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = T.Zi.createQueryEXT();
            if (!d) {
                for (X(1282); c < a;) G[b + 4 * c++ >> 2] = 0;
                break
            }
            var e = De(ue);
            d.name = e;
            ue[e] = d;
            G[b + 4 * c >> 2] = e
        }
    },
    Qf: function (a, b) {
        Gf(a, b, "createRenderbuffer", re)
    },
    Ac: function (a, b) {
        Gf(a, b, "createSampler", ve)
    },
    Of: function (a, b) {
        Gf(a, b, "createTexture", se)
    },
    nc: function (a, b) {
        Gf(a, b, "createTransformFeedback", we)
    },
    wd: function (a,
        b) {
        Gf(a, b, "createVertexArray", te)
    },
    Vg: function (a, b) {
        Gf(a, b, "createVertexArray", te)
    },
    Sf: function (a) {
        T.generateMipmap(a)
    },
    Nf: function (a, b, c, d, e, f, g) {
        Hf("getActiveAttrib", a, b, c, d, e, f, g)
    },
    Mf: function (a, b, c, d, e, f, g) {
        Hf("getActiveUniform", a, b, c, d, e, f, g)
    },
    Nc: function (a, b, c, d, e) {
        a = V[a];
        if (a = T.getActiveUniformBlockName(a, b)) e && 0 < c ? (c = u(a, e, c), d && (G[d >> 2] = c)) : d && (G[d >> 2] = 0)
    },
    Oc: function (a, b, c, d) {
        if (d)
            if (a = V[a], 35393 == c) c = T.getActiveUniformBlockName(a, b), G[d >> 2] = c.length + 1;
            else {
                if (a = T.getActiveUniformBlockParameter(a,
                        b, c), null !== a)
                    if (35395 == c)
                        for (c = 0; c < a.length; c++) G[d + 4 * c >> 2] = a[c];
                    else G[d >> 2] = a
            }
        else X(1281)
    },
    Qc: function (a, b, c, d, e) {
        if (e)
            if (0 < b && 0 == c) X(1281);
            else {
                a = V[a];
                for (var f = [], g = 0; g < b; g++) f.push(G[c + 4 * g >> 2]);
                if (a = T.getActiveUniforms(a, f, d))
                    for (b = a.length, g = 0; g < b; g++) G[e + 4 * g >> 2] = a[g]
            }
        else X(1281)
    },
    Lf: function (a, b, c, d) {
        a = T.getAttachedShaders(V[a]);
        var e = a.length;
        e > b && (e = b);
        G[c >> 2] = e;
        for (b = 0; b < e; ++b) G[d + 4 * b >> 2] = W.indexOf(a[b])
    },
    Kf: function (a, b) {
        return T.getAttribLocation(V[a], x(b))
    },
    Jf: function (a, b) {
        Jf(a, b,
            4)
    },
    Bc: function (a, b, c) {
        c ? If(c, T.getBufferParameter(a, b)) : X(1281)
    },
    If: function (a, b, c) {
        c ? G[c >> 2] = T.getBufferParameter(a, b) : X(1281)
    },
    Ld: function (a, b, c) {
        if (35005 == b) {
            b = 0;
            if (a = pe[Ef(a)]) b = a.Fj;
            G[c >> 2] = b
        } else X(1280), k("GL_INVALID_ENUM in glGetBufferPointerv")
    },
    Hf: function () {
        var a = T.getError() || Ce;
        Ce = 0;
        return a
    },
    Gf: function (a, b) {
        Jf(a, b, 2)
    },
    ed: function (a, b) {
        return T.getFragDataLocation(V[a], x(b))
    },
    Ff: function (a, b, c, d) {
        a = T.getFramebufferAttachmentParameter(a, b, c);
        if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture) a = a.name | 0;
        G[d >> 2] = a
    },
    Cc: function (a, b, c) {
        Kf(a, b, c, 1)
    },
    Ec: function (a, b) {
        Jf(a, b, 1)
    },
    ud: function (a, b, c) {
        Kf(a, b, c, 0)
    },
    Ef: function (a, b) {
        Jf(a, b, 0)
    },
    cc: function (a, b, c, d, e) {
        if (0 > d) X(1281);
        else if (e) {
            if (a = T.getInternalformatParameter(a, b, c), null !== a)
                for (b = 0; b < a.length && b < d; ++b) G[e + 4 * b >> 2] = a[b]
        } else X(1281)
    },
    jc: function () {
        X(1282)
    },
    Cf: function (a, b, c, d) {
        a = T.getProgramInfoLog(V[a]);
        null === a && (a = "(unknown error)");
        b = 0 < b && d ? u(a, d, b) : 0;
        c && (G[c >> 2] = b)
    },
    Df: function (a, b, c) {
        if (c)
            if (a >= ne) X(1281);
            else if (a =
            V[a], 35716 == b) a = T.getProgramInfoLog(a), null === a && (a = "(unknown error)"), G[c >> 2] = a.length + 1;
        else if (35719 == b) {
            if (!a.qj)
                for (b = 0; b < T.getProgramParameter(a, 35718); ++b) a.qj = Math.max(a.qj, T.getActiveUniform(a, b).name.length + 1);
            G[c >> 2] = a.qj
        } else if (35722 == b) {
            if (!a.oj)
                for (b = 0; b < T.getProgramParameter(a, 35721); ++b) a.oj = Math.max(a.oj, T.getActiveAttrib(a, b).name.length + 1);
            G[c >> 2] = a.oj
        } else if (35381 == b) {
            if (!a.pj)
                for (b = 0; b < T.getProgramParameter(a, 35382); ++b) a.pj = Math.max(a.pj, T.getActiveUniformBlockName(a, b).length +
                    1);
            G[c >> 2] = a.pj
        } else G[c >> 2] = T.getProgramParameter(a, b);
        else X(1281)
    },
    Zg: function (a, b, c) {
        if (c) {
            a = ue[a];
            b = 2 > S.version ? T.Zi.getQueryObjectEXT(a, b) : T.getQueryParameter(a, b);
            var d;
            "boolean" == typeof b ? d = b ? 1 : 0 : d = b;
            If(c, d)
        } else X(1281)
    },
    $g: function (a, b, c) {
        if (c) {
            a = T.Zi.getQueryObjectEXT(ue[a], b);
            var d;
            "boolean" == typeof a ? d = a ? 1 : 0 : d = a;
            G[c >> 2] = d
        } else X(1281)
    },
    Yg: function (a, b, c) {
        if (c) {
            a = ue[a];
            b = 2 > S.version ? T.Zi.getQueryObjectEXT(a, b) : T.getQueryParameter(a, b);
            var d;
            "boolean" == typeof b ? d = b ? 1 : 0 : d = b;
            If(c, d)
        } else X(1281)
    },
    Nd: function (a, b, c) {
        if (c) {
            a = T.getQueryParameter(ue[a], b);
            var d;
            "boolean" == typeof a ? d = a ? 1 : 0 : d = a;
            G[c >> 2] = d
        } else X(1281)
    },
    _g: function (a, b, c) {
        if (c) {
            a = T.Zi.getQueryObjectEXT(ue[a], b);
            var d;
            "boolean" == typeof a ? d = a ? 1 : 0 : d = a;
            G[c >> 2] = d
        } else X(1281)
    },
    Od: function (a, b, c) {
        c ? G[c >> 2] = T.getQuery(a, b) : X(1281)
    },
    ah: function (a, b, c) {
        c ? G[c >> 2] = T.Zi.getQueryEXT(a, b) : X(1281)
    },
    Bf: function (a, b, c) {
        c ? G[c >> 2] = T.getRenderbufferParameter(a, b) : X(1281)
    },
    rc: function (a, b, c) {
        c ? I[c >> 2] = T.getSamplerParameter(ve[a], b) : X(1281)
    },
    sc: function (a,
        b, c) {
        c ? G[c >> 2] = T.getSamplerParameter(ve[a], b) : X(1281)
    },
    zf: function (a, b, c, d) {
        a = T.getShaderInfoLog(W[a]);
        null === a && (a = "(unknown error)");
        b = 0 < b && d ? u(a, d, b) : 0;
        c && (G[c >> 2] = b)
    },
    yf: function (a, b, c, d) {
        a = T.getShaderPrecisionFormat(a, b);
        G[c >> 2] = a.rangeMin;
        G[c + 4 >> 2] = a.rangeMax;
        G[d >> 2] = a.precision
    },
    xf: function (a, b, c, d) {
        if (a = T.getShaderSource(W[a])) b = 0 < b && d ? u(a, d, b) : 0, c && (G[c >> 2] = b)
    },
    Af: function (a, b, c) {
        c ? 35716 == b ? (a = T.getShaderInfoLog(W[a]), null === a && (a = "(unknown error)"), G[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = T.getShaderSource(W[a]),
            G[c >> 2] = a ? a.length + 1 : 0) : G[c >> 2] = T.getShaderParameter(W[a], b) : X(1281)
    },
    wf: function (a) {
        var b = ze[a];
        if (!b) {
            switch (a) {
                case 7939:
                    b = T.getSupportedExtensions() || [];
                    b = b.concat(b.map(function (d) {
                        return "GL_" + d
                    }));
                    b = Lf(b.join(" "));
                    break;
                case 7936:
                case 7937:
                case 37445:
                case 37446:
                    (b = T.getParameter(a)) || X(1280);
                    b = b && Lf(b);
                    break;
                case 7938:
                    b = T.getParameter(7938);
                    b = 2 <= S.version ? "OpenGL ES 3.0 (" + b + ")" : "OpenGL ES 2.0 (" + b + ")";
                    b = Lf(b);
                    break;
                case 35724:
                    b = T.getParameter(35724);
                    var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                    null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
                    b = Lf(b);
                    break;
                default:
                    X(1280)
            }
            ze[a] = b
        }
        return b
    },
    Tc: function (a, b) {
        if (2 > S.version) return X(1282), 0;
        var c = Ae[a];
        if (c) return 0 > b || b >= c.length ? (X(1281), 0) : c[b];
        switch (a) {
            case 7939:
                return c = T.getSupportedExtensions() || [], c = c.concat(c.map(function (d) {
                    return "GL_" + d
                })), c = c.map(function (d) {
                    return Lf(d)
                }), c = Ae[a] = c, 0 > b || b >= c.length ? (X(1281), 0) : c[b];
            default:
                return X(1280), 0
        }
    },
    Dc: function (a, b, c, d, e) {
        0 > c ? X(1281) : e ? (a = T.getSyncParameter(xe[a],
            b), null !== a && (G[e >> 2] = a, d && (G[d >> 2] = 1))) : X(1281)
    },
    vf: function (a, b, c) {
        c ? I[c >> 2] = T.getTexParameter(a, b) : X(1281)
    },
    tf: function (a, b, c) {
        c ? G[c >> 2] = T.getTexParameter(a, b) : X(1281)
    },
    nd: function (a, b, c, d, e, f, g) {
        a = V[a];
        if (a = T.getTransformFeedbackVarying(a, b)) g && 0 < c ? (c = u(a.name, g, c), d && (G[d >> 2] = c)) : d && (G[d >> 2] = 0), e && (G[e >> 2] = a.size), f && (G[f >> 2] = a.type)
    },
    Pc: function (a, b) {
        return T.getUniformBlockIndex(V[a], x(b))
    },
    Rc: function (a, b, c, d) {
        if (d)
            if (0 < b && (0 == c || 0 == d)) X(1281);
            else {
                a = V[a];
                for (var e = [], f = 0; f < b; f++) e.push(x(G[c +
                    4 * f >> 2]));
                if (a = T.getUniformIndices(a, e))
                    for (b = a.length, f = 0; f < b; f++) G[d + 4 * f >> 2] = a[f]
            }
        else X(1281)
    },
    qf: function (a, b) {
        b = x(b);
        if (a = V[a]) {
            Nf(a);
            var c = a.Ij,
                d = 0,
                e = b,
                f = Mf(b);
            0 < f && (d = parseInt(b.slice(f + 1)) >>> 0, e = b.slice(0, f));
            if ((e = a.hk[e]) && d < e[0] && (d += e[1], c[d] = c[d] || T.getUniformLocation(a, b))) return d
        } else X(1281);
        return -1
    },
    sf: function (a, b, c) {
        Of(a, b, c, 2)
    },
    rf: function (a, b, c) {
        Of(a, b, c, 0)
    },
    fd: function (a, b, c) {
        Of(a, b, c, 0)
    },
    ld: function (a, b, c) {
        Pf(a, b, c, 0)
    },
    kd: function (a, b, c) {
        Pf(a, b, c, 0)
    },
    nf: function (a, b, c) {
        c ?
            (S.ej[a].enabled && k("glGetVertexAttribPointer on client-side array: not supported, bad data returned"), G[c >> 2] = T.getVertexAttribOffset(a, b)) : X(1281)
    },
    pf: function (a, b, c) {
        Pf(a, b, c, 2)
    },
    of: function (a, b, c) {
        Pf(a, b, c, 5)
    },
    mf: function (a, b) {
        T.hint(a, b)
    },
    gc: function (a, b, c) {
        for (var d = Df[b], e = 0; e < b; e++) d[e] = G[c + 4 * e >> 2];
        T.invalidateFramebuffer(a, d)
    },
    fc: function (a, b, c, d, e, f, g) {
        for (var l = Df[b], n = 0; n < b; n++) l[n] = G[c + 4 * n >> 2];
        T.invalidateSubFramebuffer(a, l, d, e, f, g)
    },
    lf: function (a) {
        return (a = oe[a]) ? T.isBuffer(a) : 0
    },
    kf: function (a) {
        return T.isEnabled(a)
    },
    jf: function (a) {
        return (a = qe[a]) ? T.isFramebuffer(a) : 0
    },
    hf: function (a) {
        return (a = V[a]) ? T.isProgram(a) : 0
    },
    Rd: function (a) {
        return (a = ue[a]) ? T.isQuery(a) : 0
    },
    eh: function (a) {
        return (a = ue[a]) ? T.Zi.isQueryEXT(a) : 0
    },
    gf: function (a) {
        return (a = re[a]) ? T.isRenderbuffer(a) : 0
    },
    yc: function (a) {
        return (a = ve[a]) ? T.isSampler(a) : 0
    },
    ff: function (a) {
        return (a = W[a]) ? T.isShader(a) : 0
    },
    Ic: function (a) {
        return T.isSync(xe[a])
    },
    ef: function (a) {
        return (a = se[a]) ? T.isTexture(a) : 0
    },
    mc: function (a) {
        return T.isTransformFeedback(we[a])
    },
    vd: function (a) {
        return (a =
            te[a]) ? T.isVertexArray(a) : 0
    },
    Ug: function (a) {
        return (a = te[a]) ? T.isVertexArray(a) : 0
    },
    df: function (a) {
        T.lineWidth(a)
    },
    cf: function (a) {
        a = V[a];
        T.linkProgram(a);
        a.Ij = 0;
        a.hk = {}
    },
    Ad: function (a, b, c, d) {
        if (26 != d && 10 != d) return k("glMapBufferRange is only supported when access is MAP_WRITE|INVALIDATE_BUFFER"), 0;
        if (!Ff(a)) return X(1280), k("GL_INVALID_ENUM in glMapBufferRange"), 0;
        var e = m(c);
        if (!e) return 0;
        pe[Ef(a)] = {
            offset: b,
            length: c,
            Fj: e,
            Ik: d
        };
        return e
    },
    lc: function () {
        T.pauseTransformFeedback()
    },
    bf: function (a, b) {
        3317 ==
            a && (Be = b);
        T.pixelStorei(a, b)
    },
    af: function (a, b) {
        T.polygonOffset(a, b)
    },
    ic: function () {
        X(1280)
    },
    hc: function () {
        X(1280)
    },
    bh: function (a, b) {
        T.Zi.queryCounterEXT(ue[a], b)
    },
    _d: function (a) {
        T.readBuffer(a)
    },
    $e: function (a, b, c, d, e, f, g) {
        if (2 <= S.version)
            if (T.Aj) T.readPixels(a, b, c, d, e, f, g);
            else {
                var l = Qf(f);
                T.readPixels(a, b, c, d, e, f, l, g >> Rf(l))
            }
        else(g = Sf(f, e, c, d, g)) ? T.readPixels(a, b, c, d, e, f, g) : X(1280)
    },
    _e: function () {},
    Ze: function (a, b, c, d) {
        T.renderbufferStorage(a, b, c, d)
    },
    Cd: function (a, b, c, d, e) {
        T.renderbufferStorageMultisample(a,
            b, c, d, e)
    },
    kc: function () {
        T.resumeTransformFeedback()
    },
    Ye: function (a, b) {
        T.sampleCoverage(a, !!b)
    },
    uc: function (a, b, c) {
        T.samplerParameterf(ve[a], b, c)
    },
    tc: function (a, b, c) {
        T.samplerParameterf(ve[a], b, I[c >> 2])
    },
    wc: function (a, b, c) {
        T.samplerParameteri(ve[a], b, c)
    },
    vc: function (a, b, c) {
        T.samplerParameteri(ve[a], b, G[c >> 2])
    },
    Xe: function (a, b, c, d) {
        T.scissor(a, b, c, d)
    },
    We: function () {
        X(1280)
    },
    Ve: function (a, b, c, d) {
        b = Fe(b, c, d);
        T.shaderSource(W[a], b)
    },
    Ue: function (a, b, c) {
        T.stencilFunc(a, b, c)
    },
    Te: function (a, b, c, d) {
        T.stencilFuncSeparate(a,
            b, c, d)
    },
    Se: function (a) {
        T.stencilMask(a)
    },
    Re: function (a, b) {
        T.stencilMaskSeparate(a, b)
    },
    Qe: function (a, b, c) {
        T.stencilOp(a, b, c)
    },
    Pe: function (a, b, c, d) {
        T.stencilOpSeparate(a, b, c, d)
    },
    Oe: function (a, b, c, d, e, f, g, l, n) {
        if (2 <= S.version)
            if (T.Wi) T.texImage2D(a, b, c, d, e, f, g, l, n);
            else if (n) {
            var q = Qf(l);
            T.texImage2D(a, b, c, d, e, f, g, l, q, n >> Rf(q))
        } else T.texImage2D(a, b, c, d, e, f, g, l, null);
        else T.texImage2D(a, b, c, d, e, f, g, l, n ? Sf(l, g, d, e, n) : null)
    },
    Yd: function (a, b, c, d, e, f, g, l, n, q) {
        if (T.Wi) T.texImage3D(a, b, c, d, e, f, g, l, n, q);
        else if (q) {
            var p =
                Qf(n);
            T.texImage3D(a, b, c, d, e, f, g, l, n, p, q >> Rf(p))
        } else T.texImage3D(a, b, c, d, e, f, g, l, n, null)
    },
    Ne: function (a, b, c) {
        T.texParameterf(a, b, c)
    },
    Me: function (a, b, c) {
        T.texParameterf(a, b, I[c >> 2])
    },
    Le: function (a, b, c) {
        T.texParameteri(a, b, c)
    },
    Ke: function (a, b, c) {
        T.texParameteri(a, b, G[c >> 2])
    },
    ec: function (a, b, c, d, e) {
        T.texStorage2D(a, b, c, d, e)
    },
    dc: function (a, b, c, d, e, f) {
        T.texStorage3D(a, b, c, d, e, f)
    },
    Je: function (a, b, c, d, e, f, g, l, n) {
        if (2 <= S.version)
            if (T.Wi) T.texSubImage2D(a, b, c, d, e, f, g, l, n);
            else if (n) {
            var q = Qf(l);
            T.texSubImage2D(a,
                b, c, d, e, f, g, l, q, n >> Rf(q))
        } else T.texSubImage2D(a, b, c, d, e, f, g, l, null);
        else q = null, n && (q = Sf(l, g, e, f, n)), T.texSubImage2D(a, b, c, d, e, f, g, l, q)
    },
    Xd: function (a, b, c, d, e, f, g, l, n, q, p) {
        if (T.Wi) T.texSubImage3D(a, b, c, d, e, f, g, l, n, q, p);
        else if (p) {
            var t = Qf(q);
            T.texSubImage3D(a, b, c, d, e, f, g, l, n, q, t, p >> Rf(t))
        } else T.texSubImage3D(a, b, c, d, e, f, g, l, n, q, null)
    },
    od: function (a, b, c, d) {
        a = V[a];
        for (var e = [], f = 0; f < b; f++) e.push(x(G[c + 4 * f >> 2]));
        T.transformFeedbackVaryings(a, e, d)
    },
    Ie: function (a, b) {
        T.uniform1f(Y(a), b)
    },
    He: function (a,
        b, c) {
        if (2 <= S.version) T.uniform1fv(Y(a), I, c >> 2, b);
        else {
            if (288 >= b)
                for (var d = Tf[b - 1], e = 0; e < b; ++e) d[e] = I[c + 4 * e >> 2];
            else d = I.subarray(c >> 2, c + 4 * b >> 2);
            T.uniform1fv(Y(a), d)
        }
    },
    Ge: function (a, b) {
        T.uniform1i(Y(a), b)
    },
    Fe: function (a, b, c) {
        if (2 <= S.version) T.uniform1iv(Y(a), G, c >> 2, b);
        else {
            if (288 >= b)
                for (var d = Uf[b - 1], e = 0; e < b; ++e) d[e] = G[c + 4 * e >> 2];
            else d = G.subarray(c >> 2, c + 4 * b >> 2);
            T.uniform1iv(Y(a), d)
        }
    },
    dd: function (a, b) {
        T.uniform1ui(Y(a), b)
    },
    $c: function (a, b, c) {
        T.uniform1uiv(Y(a), N, c >> 2, b)
    },
    Ee: function (a, b, c) {
        T.uniform2f(Y(a),
            b, c)
    },
    De: function (a, b, c) {
        if (2 <= S.version) T.uniform2fv(Y(a), I, c >> 2, 2 * b);
        else {
            if (144 >= b)
                for (var d = Tf[2 * b - 1], e = 0; e < 2 * b; e += 2) d[e] = I[c + 4 * e >> 2], d[e + 1] = I[c + (4 * e + 4) >> 2];
            else d = I.subarray(c >> 2, c + 8 * b >> 2);
            T.uniform2fv(Y(a), d)
        }
    },
    Ce: function (a, b, c) {
        T.uniform2i(Y(a), b, c)
    },
    Be: function (a, b, c) {
        if (2 <= S.version) T.uniform2iv(Y(a), G, c >> 2, 2 * b);
        else {
            if (144 >= b)
                for (var d = Uf[2 * b - 1], e = 0; e < 2 * b; e += 2) d[e] = G[c + 4 * e >> 2], d[e + 1] = G[c + (4 * e + 4) >> 2];
            else d = G.subarray(c >> 2, c + 8 * b >> 2);
            T.uniform2iv(Y(a), d)
        }
    },
    cd: function (a, b, c) {
        T.uniform2ui(Y(a),
            b, c)
    },
    _c: function (a, b, c) {
        T.uniform2uiv(Y(a), N, c >> 2, 2 * b)
    },
    Ae: function (a, b, c, d) {
        T.uniform3f(Y(a), b, c, d)
    },
    ze: function (a, b, c) {
        if (2 <= S.version) T.uniform3fv(Y(a), I, c >> 2, 3 * b);
        else {
            if (96 >= b)
                for (var d = Tf[3 * b - 1], e = 0; e < 3 * b; e += 3) d[e] = I[c + 4 * e >> 2], d[e + 1] = I[c + (4 * e + 4) >> 2], d[e + 2] = I[c + (4 * e + 8) >> 2];
            else d = I.subarray(c >> 2, c + 12 * b >> 2);
            T.uniform3fv(Y(a), d)
        }
    },
    ye: function (a, b, c, d) {
        T.uniform3i(Y(a), b, c, d)
    },
    xe: function (a, b, c) {
        if (2 <= S.version) T.uniform3iv(Y(a), G, c >> 2, 3 * b);
        else {
            if (96 >= b)
                for (var d = Uf[3 * b - 1], e = 0; e < 3 * b; e += 3) d[e] =
                    G[c + 4 * e >> 2], d[e + 1] = G[c + (4 * e + 4) >> 2], d[e + 2] = G[c + (4 * e + 8) >> 2];
            else d = G.subarray(c >> 2, c + 12 * b >> 2);
            T.uniform3iv(Y(a), d)
        }
    },
    bd: function (a, b, c, d) {
        T.uniform3ui(Y(a), b, c, d)
    },
    Zc: function (a, b, c) {
        T.uniform3uiv(Y(a), N, c >> 2, 3 * b)
    },
    ve: function (a, b, c, d, e) {
        T.uniform4f(Y(a), b, c, d, e)
    },
    ue: function (a, b, c) {
        if (2 <= S.version) T.uniform4fv(Y(a), I, c >> 2, 4 * b);
        else {
            if (72 >= b) {
                var d = Tf[4 * b - 1],
                    e = I;
                c >>= 2;
                for (var f = 0; f < 4 * b; f += 4) {
                    var g = c + f;
                    d[f] = e[g];
                    d[f + 1] = e[g + 1];
                    d[f + 2] = e[g + 2];
                    d[f + 3] = e[g + 3]
                }
            } else d = I.subarray(c >> 2, c + 16 * b >> 2);
            T.uniform4fv(Y(a),
                d)
        }
    },
    te: function (a, b, c, d, e) {
        T.uniform4i(Y(a), b, c, d, e)
    },
    se: function (a, b, c) {
        if (2 <= S.version) T.uniform4iv(Y(a), G, c >> 2, 4 * b);
        else {
            if (72 >= b)
                for (var d = Uf[4 * b - 1], e = 0; e < 4 * b; e += 4) d[e] = G[c + 4 * e >> 2], d[e + 1] = G[c + (4 * e + 4) >> 2], d[e + 2] = G[c + (4 * e + 8) >> 2], d[e + 3] = G[c + (4 * e + 12) >> 2];
            else d = G.subarray(c >> 2, c + 16 * b >> 2);
            T.uniform4iv(Y(a), d)
        }
    },
    ad: function (a, b, c, d, e) {
        T.uniform4ui(Y(a), b, c, d, e)
    },
    Yc: function (a, b, c) {
        T.uniform4uiv(Y(a), N, c >> 2, 4 * b)
    },
    Mc: function (a, b, c) {
        a = V[a];
        T.uniformBlockBinding(a, b, c)
    },
    re: function (a, b, c, d) {
        if (2 <= S.version) T.uniformMatrix2fv(Y(a),
            !!c, I, d >> 2, 4 * b);
        else {
            if (72 >= b)
                for (var e = Tf[4 * b - 1], f = 0; f < 4 * b; f += 4) e[f] = I[d + 4 * f >> 2], e[f + 1] = I[d + (4 * f + 4) >> 2], e[f + 2] = I[d + (4 * f + 8) >> 2], e[f + 3] = I[d + (4 * f + 12) >> 2];
            else e = I.subarray(d >> 2, d + 16 * b >> 2);
            T.uniformMatrix2fv(Y(a), !!c, e)
        }
    },
    Jd: function (a, b, c, d) {
        T.uniformMatrix2x3fv(Y(a), !!c, I, d >> 2, 6 * b)
    },
    Hd: function (a, b, c, d) {
        T.uniformMatrix2x4fv(Y(a), !!c, I, d >> 2, 8 * b)
    },
    qe: function (a, b, c, d) {
        if (2 <= S.version) T.uniformMatrix3fv(Y(a), !!c, I, d >> 2, 9 * b);
        else {
            if (32 >= b)
                for (var e = Tf[9 * b - 1], f = 0; f < 9 * b; f += 9) e[f] = I[d + 4 * f >> 2], e[f + 1] = I[d +
                    (4 * f + 4) >> 2], e[f + 2] = I[d + (4 * f + 8) >> 2], e[f + 3] = I[d + (4 * f + 12) >> 2], e[f + 4] = I[d + (4 * f + 16) >> 2], e[f + 5] = I[d + (4 * f + 20) >> 2], e[f + 6] = I[d + (4 * f + 24) >> 2], e[f + 7] = I[d + (4 * f + 28) >> 2], e[f + 8] = I[d + (4 * f + 32) >> 2];
            else e = I.subarray(d >> 2, d + 36 * b >> 2);
            T.uniformMatrix3fv(Y(a), !!c, e)
        }
    },
    Id: function (a, b, c, d) {
        T.uniformMatrix3x2fv(Y(a), !!c, I, d >> 2, 6 * b)
    },
    Fd: function (a, b, c, d) {
        T.uniformMatrix3x4fv(Y(a), !!c, I, d >> 2, 12 * b)
    },
    pe: function (a, b, c, d) {
        if (2 <= S.version) T.uniformMatrix4fv(Y(a), !!c, I, d >> 2, 16 * b);
        else {
            if (18 >= b) {
                var e = Tf[16 * b - 1],
                    f = I;
                d >>= 2;
                for (var g =
                        0; g < 16 * b; g += 16) {
                    var l = d + g;
                    e[g] = f[l];
                    e[g + 1] = f[l + 1];
                    e[g + 2] = f[l + 2];
                    e[g + 3] = f[l + 3];
                    e[g + 4] = f[l + 4];
                    e[g + 5] = f[l + 5];
                    e[g + 6] = f[l + 6];
                    e[g + 7] = f[l + 7];
                    e[g + 8] = f[l + 8];
                    e[g + 9] = f[l + 9];
                    e[g + 10] = f[l + 10];
                    e[g + 11] = f[l + 11];
                    e[g + 12] = f[l + 12];
                    e[g + 13] = f[l + 13];
                    e[g + 14] = f[l + 14];
                    e[g + 15] = f[l + 15]
                }
            } else e = I.subarray(d >> 2, d + 64 * b >> 2);
            T.uniformMatrix4fv(Y(a), !!c, e)
        }
    },
    Gd: function (a, b, c, d) {
        T.uniformMatrix4x2fv(Y(a), !!c, I, d >> 2, 8 * b)
    },
    Ed: function (a, b, c, d) {
        T.uniformMatrix4x3fv(Y(a), !!c, I, d >> 2, 12 * b)
    },
    Md: function (a) {
        if (!Ff(a)) return X(1280), k("GL_INVALID_ENUM in glUnmapBuffer"),
            0;
        var b = Ef(a),
            c = pe[b];
        if (!c) return X(1282), k("buffer was never mapped in glUnmapBuffer"), 0;
        pe[b] = null;
        c.Ik & 16 || (2 <= S.version ? T.bufferSubData(a, c.offset, A, c.Fj, c.length) : T.bufferSubData(a, c.offset, A.subarray(c.Fj, c.Fj + c.length)));
        ca(c.Fj);
        return 1
    },
    oe: function (a) {
        a = V[a];
        T.useProgram(a);
        T.Qk = a
    },
    ne: function (a) {
        T.validateProgram(V[a])
    },
    me: function (a, b) {
        T.vertexAttrib1f(a, b)
    },
    le: function (a, b) {
        T.vertexAttrib1f(a, I[b >> 2])
    },
    ke: function (a, b, c) {
        T.vertexAttrib2f(a, b, c)
    },
    je: function (a, b) {
        T.vertexAttrib2f(a, I[b >>
            2], I[b + 4 >> 2])
    },
    ie: function (a, b, c, d) {
        T.vertexAttrib3f(a, b, c, d)
    },
    he: function (a, b) {
        T.vertexAttrib3f(a, I[b >> 2], I[b + 4 >> 2], I[b + 8 >> 2])
    },
    ge: function (a, b, c, d, e) {
        T.vertexAttrib4f(a, b, c, d, e)
    },
    fe: function (a, b) {
        T.vertexAttrib4f(a, I[b >> 2], I[b + 4 >> 2], I[b + 8 >> 2], I[b + 12 >> 2])
    },
    qc: function (a, b) {
        T.vertexAttribDivisor(a, b)
    },
    Qg: function (a, b) {
        T.vertexAttribDivisor(a, b)
    },
    ac: function (a, b) {
        T.vertexAttribDivisor(a, b)
    },
    ce: function (a, b) {
        T.vertexAttribDivisor(a, b)
    },
    bc: function (a, b) {
        T.vertexAttribDivisor(a, b)
    },
    jd: function (a, b, c,
        d, e) {
        T.vertexAttribI4i(a, b, c, d, e)
    },
    hd: function (a, b) {
        T.vertexAttribI4i(a, G[b >> 2], G[b + 4 >> 2], G[b + 8 >> 2], G[b + 12 >> 2])
    },
    id: function (a, b, c, d, e) {
        T.vertexAttribI4ui(a, b, c, d, e)
    },
    gd: function (a, b) {
        T.vertexAttribI4ui(a, N[b >> 2], N[b + 4 >> 2], N[b + 8 >> 2], N[b + 12 >> 2])
    },
    md: function (a, b, c, d, e) {
        var f = S.ej[a];
        T.nj ? (f.zj = !1, T.vertexAttribIPointer(a, b, c, d, e)) : (f.size = b, f.type = c, f.$j = !1, f.Rj = d, f.Mj = e, f.zj = !0, f.ik = function (g, l, n, q, p, t) {
            this.vertexAttribIPointer(g, l, n, p, t)
        })
    },
    ee: function (a, b, c, d, e, f) {
        var g = S.ej[a];
        T.nj ? (g.zj = !1,
            T.vertexAttribPointer(a, b, c, !!d, e, f)) : (g.size = b, g.type = c, g.$j = d, g.Rj = e, g.Mj = f, g.zj = !0, g.ik = function (l, n, q, p, t, v) {
            this.vertexAttribPointer(l, n, q, p, t, v)
        })
    },
    de: function (a, b, c, d) {
        T.viewport(a, b, c, d)
    },
    Fc: function (a, b, c, d) {
        T.waitSync(xe[a], b, (c >>> 0) + 4294967296 * d)
    },
    sa: function () {
        return !1
    },
    lh: function () {
        return !Na
    },
    Ub: function (a, b, c) {
        A.copyWithin(a, b, b + c)
    },
    Jh: function (a, b) {
        function c(d) {
            P(a)(d, b) && requestAnimationFrame(c)
        }
        return requestAnimationFrame(c)
    },
    nh: function (a, b, c) {
        return Vf(a, {
            Bk: G[c >> 2],
            lk: G[c + 4 >>
                2],
            xl: G[c + 8 >> 2],
            sl: b,
            Vj: G[c + 12 >> 2],
            Nk: G[c + 16 >> 2]
        })
    },
    Xa: function (a, b) {
        a = sf(a);
        return a ? a.requestPointerLock || a.Zj ? Qe && Ye.yj ? Bf(a) : b ? (Ve(Bf, 2, [a]), 1) : -2 : -1 : -4
    },
    Cb: function (a) {
        var b = A.length;
        a >>>= 0;
        if (2147483648 < a) return !1;
        for (var c = 1; 4 >= c; c *= 2) {
            var d = b * (1 + .2 / c);
            d = Math.min(d, a + 100663296);
            var e = Math;
            d = Math.max(a, d);
            e = e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536);
            a: {
                try {
                    ib.grow(e - tb.byteLength + 65535 >>> 16);
                    ub();
                    var f = 1;
                    break a
                } catch (g) {}
                f = void 0
            }
            if (f) return !0
        }
        return !1
    },
    bb: function () {
        return (df = navigator.getGamepads ?
            navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null) ? 0 : -1
    },
    Qa: function (a, b, c) {
        if ("undefined" == typeof onbeforeunload) return -1;
        if (1 !== c) return -5;
        Wf(a, b);
        return 0
    },
    Ua: function (a, b, c, d) {
        Xf(a, b, c, d, 12, "blur");
        return 0
    },
    v: vf,
    oa: function (a, b, c) {
        a = sf(a);
        if (!a) return -4;
        a.style.width = b + "px";
        a.style.height = c + "px";
        return 0
    },
    S: function (a, b, c, d) {
        Xf(a, b, c, d, 13, "focus");
        return 0
    },
    ra: function (a, b, c, d) {
        if (!bf()) return -1;
        a = sf(a);
        if (!a) return -4;
        Yf(a, b, c, d, "fullscreenchange");
        Yf(a, b,
            c, d, "webkitfullscreenchange");
        return 0
    },
    $a: function (a, b, c) {
        if (!navigator.getGamepads && !navigator.webkitGetGamepads) return -1;
        Zf(a, b, c, 26, "gamepadconnected");
        return 0
    },
    Za: function (a, b, c) {
        if (!navigator.getGamepads && !navigator.webkitGetGamepads) return -1;
        Zf(a, b, c, 27, "gamepaddisconnected");
        return 0
    },
    Ih: function (a, b, c) {
        return setInterval(function () {
            Fd(function () {
                P(a)(c)
            })
        }, b)
    },
    Y: function (a, b, c, d) {
        $f(a, b, c, d, 2, "keydown");
        return 0
    },
    qa: function (a, b, c, d) {
        $f(a, b, c, d, 1, "keypress");
        return 0
    },
    X: function (a, b, c, d) {
        $f(a,
            b, c, d, 3, "keyup");
        return 0
    },
    W: function (a, b, c, d) {
        bg(a, b, c, d, 5, "mousedown");
        return 0
    },
    Wa: function (a, b, c, d) {
        bg(a, b, c, d, 33, "mouseenter");
        return 0
    },
    Va: function (a, b, c, d) {
        bg(a, b, c, d, 34, "mouseleave");
        return 0
    },
    U: function (a, b, c, d) {
        bg(a, b, c, d, 8, "mousemove");
        return 0
    },
    Lh: function (a, b, c, d) {
        bg(a, b, c, d, 35, "mouseover");
        return 0
    },
    V: function (a, b, c, d) {
        bg(a, b, c, d, 6, "mouseup");
        return 0
    },
    Ta: function (a, b, c, d) {
        if (!document || !document.body || !(document.body.requestPointerLock || document.body.kk || document.body.$l || document.body.Zj)) return -1;
        a = sf(a);
        if (!a) return -4;
        cg(a, b, c, d, "pointerlockchange");
        cg(a, b, c, d, "mozpointerlockchange");
        cg(a, b, c, d, "webkitpointerlockchange");
        cg(a, b, c, d, "mspointerlockchange");
        return 0
    },
    Sa: function (a, b, c, d) {
        dg(a, b, c, d);
        return 0
    },
    O: function (a, b, c, d) {
        eg(a, b, c, d, 25, "touchcancel");
        return 0
    },
    Q: function (a, b, c, d) {
        eg(a, b, c, d, 23, "touchend");
        return 0
    },
    P: function (a, b, c, d) {
        eg(a, b, c, d, 24, "touchmove");
        return 0
    },
    R: function (a, b, c, d) {
        eg(a, b, c, d, 22, "touchstart");
        return 0
    },
    Ra: function (a, b, c) {
        if (!rf[1]) return -4;
        fg(a, b, c);
        return 0
    },
    Ph: function (a, b, c, d) {
        gg(a, b, c, d, 31, "webglcontextlost");
        return 0
    },
    Oh: function (a, b, c, d) {
        gg(a, b, c, d, 32, "webglcontextrestored");
        return 0
    },
    T: function (a, b, c, d) {
        a = sf(a);
        return "undefined" != typeof a.onwheel ? (hg(a, b, c, d), 0) : -1
    },
    oh: function (a) {
        Ta(x(a))
    },
    q: function () {
        throw "Please compile your program with async support in order to use asynchronous operations like emscripten_sleep";
    },
    kh: function (a, b, c, d, e) {
        var f = a + 112,
            g = x(f),
            l = N[f + 36 >> 2],
            n = N[f + 40 >> 2],
            q = N[f + 44 >> 2],
            p = N[f + 48 >> 2],
            t = N[f + 52 >> 2],
            v = !!(t & 4),
            r = !!(t & 32),
            C = !!(t & 16),
            y = !!(t & 64),
            F = R => {
                Fd(() => {
                    l ? P(l)(R) : b && b(R)
                }, y)
            },
            J = R => {
                Fd(() => {
                    q ? P(q)(R) : d && d(R)
                }, y)
            },
            M = R => {
                Fd(() => {
                    n ? P(n)(R) : c && c(R)
                }, y)
            },
            z = R => {
                Fd(() => {
                    p ? P(p)(R) : e && e(R)
                }, y)
            };
        t = R => {
            lg(R, F, M, J, z)
        };
        var L = (R, yb) => {
                mg(R, yb.response, ab => {
                    Fd(() => {
                        l ? P(l)(ab) : b && b(ab)
                    }, y)
                }, ab => {
                    Fd(() => {
                        l ? P(l)(ab) : b && b(ab)
                    }, y)
                })
            },
            fa = R => {
                lg(R, L, M, J, z)
            };
        if ("EM_IDB_STORE" === g) g = N[f + 84 >> 2], mg(a, A.slice(g, g + N[f + 88 >> 2]), F, M);
        else if ("EM_IDB_DELETE" === g) og(a, F, M);
        else if (C) {
            if (r) return 0;
            lg(a, v ? L : F, M, J, z)
        } else ng(a, F, r ? M : v ? fa : t);
        return a
    },
    fb: function (a, b) {
        b >>= 2;
        b = {
            alpha: !!G[b],
            depth: !!G[b + 1],
            stencil: !!G[b + 2],
            antialias: !!G[b + 3],
            premultipliedAlpha: !!G[b + 4],
            preserveDrawingBuffer: !!G[b + 5],
            powerPreference: pg[G[b + 6]],
            failIfMajorPerformanceCaveat: !!G[b + 7],
            Wj: G[b + 8],
            Jl: G[b + 9],
            nk: G[b + 10],
            wl: G[b + 11],
            om: G[b + 12],
            pm: G[b + 13]
        };
        a = sf(a);
        return !a || b.wl ? 0 : Sd(a, b)
    },
    Mh: function (a, b) {
        if (!b) return -5;
        a = Td[a];
        if (!a) return -3;
        var c = a.gj;
        if (!c) return -3;
        c = c.getContextAttributes();
        G[b >> 2] = c.alpha;
        G[b + 4 >> 2] = c.depth;
        G[b + 8 >> 2] = c.stencil;
        G[b + 12 >> 2] = c.antialias;
        G[b +
            16 >> 2] = c.premultipliedAlpha;
        G[b + 20 >> 2] = c.preserveDrawingBuffer;
        G[b + 24 >> 2] = c.powerPreference && pg.indexOf(c.powerPreference);
        G[b + 28 >> 2] = c.failIfMajorPerformanceCaveat;
        G[b + 32 >> 2] = a.version;
        G[b + 36 >> 2] = 0;
        G[b + 40 >> 2] = a.attributes.nk;
        return 0
    },
    Nh: function () {
        return S ? S.Cl : 0
    },
    Qh: function (a) {
        a >>= 2;
        for (var b = 0; 14 > b; ++b) G[a + b] = 0;
        G[a] = G[a + 1] = G[a + 3] = G[a + 4] = G[a + 8] = G[a + 10] = 1
    },
    eb: function (a) {
        return Ud(a) ? 0 : -5
    },
    ma: function (a) {
        var b = qg[a];
        if (!b) return -3;
        b.onopen = b.onerror = b.onclose = b.onmessage = null;
        delete qg[a];
        return 0
    },
    Pf: function () {
        return "undefined" != typeof WebSocket
    },
    Pa: function (a) {
        if ("undefined" == typeof WebSocket) return -1;
        if (!a) return -5;
        var b = a >> 2;
        a = x(G[b]);
        a = (b = G[b + 1]) ? new WebSocket(a, x(b).split(",")) : new WebSocket(a);
        a.binaryType = "arraybuffer";
        b = qg.length;
        qg[b] = a;
        return b
    },
    Ka: function (a, b, c) {
        a = qg[a];
        if (!a) return -3;
        a.send(A.subarray(b, b + c));
        return 0
    },
    ig: function (a, b) {
        a = qg[a];
        if (!a) return -3;
        b = x(b);
        a.send(b);
        return 0
    },
    La: function (a, b, c) {
        Z || (Z = m(1024));
        var d = qg[a];
        if (!d) return -3;
        d.onclose = function (e) {
            N[Z >> 2] = a;
            N[Z + 4 >> 2] = e.wasClean;
            N[Z + 8 >> 2] = e.code;
            u(e.reason, Z + 10, 512);
            P(c)(0, Z, b)
        };
        return 0
    },
    Ma: function (a, b, c) {
        Z || (Z = m(1024));
        var d = qg[a];
        if (!d) return -3;
        d.onerror = function () {
            N[Z >> 2] = a;
            P(c)(0, Z, b)
        };
        return 0
    },
    Na: function (a, b, c) {
        Z || (Z = m(1024));
        var d = qg[a];
        if (!d) return -3;
        d.onmessage = function (e) {
            N[Z >> 2] = a;
            if ("string" == typeof e.data) {
                var f = aa(e.data) + 1,
                    g = m(f);
                u(e.data, g, f);
                N[Z + 12 >> 2] = 1
            } else f = e.data.byteLength, g = m(f), E.set(new Uint8Array(e.data), g), N[Z + 12 >> 2] = 0;
            N[Z + 4 >> 2] = g;
            N[Z + 8 >> 2] = f;
            P(c)(0, Z, b);
            ca(g)
        };
        return 0
    },
    Oa: function (a, b, c) {
        Z || (Z = m(1024));
        var d = qg[a];
        if (!d) return -3;
        d.onopen = function () {
            N[Z >> 2] = a;
            P(c)(0, Z, b)
        };
        return 0
    },
    Jb: function (a, b) {
        var c = 0;
        sg().forEach(function (d, e) {
            var f = b + c;
            e = G[a + 4 * e >> 2] = f;
            for (f = 0; f < d.length; ++f) E[e++ >> 0] = d.charCodeAt(f);
            E[e >> 0] = 0;
            c += d.length + 1
        });
        return 0
    },
    Kb: function (a, b) {
        var c = sg();
        G[a >> 2] = c.length;
        var d = 0;
        c.forEach(function (e) {
            d += e.length + 1
        });
        G[b >> 2] = d;
        return 0
    },
    d: function (a) {
        Jg(a)
    },
    K: function (a) {
        try {
            var b = ld(a);
            Sc(b);
            return 0
        } catch (c) {
            if ("undefined" == typeof fd || !(c instanceof Q)) throw c;
            return c.Si
        }
    },
    Fa: function (a, b, c, d) {
        try {
            a: {
                var e = ld(a);a = b;
                for (var f = b = 0; f < c; f++) {
                    var g = G[a >> 2],
                        l = G[a + 4 >> 2];
                    a += 8;
                    var n = e,
                        q = g,
                        p = l,
                        t = void 0,
                        v = E;
                    if (0 > p || 0 > t) throw new Q(28);
                    if (null === n.fd) throw new Q(8);
                    if (1 === (n.flags & 2097155)) throw new Q(8);
                    if (16384 === (n.node.mode & 61440)) throw new Q(31);
                    if (!n.Qi.read) throw new Q(28);
                    var r = "undefined" != typeof t;
                    if (!r) t = n.position;
                    else if (!n.seekable) throw new Q(70);
                    var C = n.Qi.read(n, v, q, p, t);
                    r || (n.position += C);
                    var y = C;
                    if (0 > y) {
                        var F = -1;
                        break a
                    }
                    b += y;
                    if (y < l) break
                }
                F =
                b
            }
            G[d >> 2] = F;
            return 0
        }
        catch (J) {
            if ("undefined" == typeof fd || !(J instanceof Q)) throw J;
            return J.Si
        }
    },
    zb: function (a, b, c, d, e) {
        try {
            var f = ld(a);
            a = 4294967296 * c + (b >>> 0);
            if (-9007199254740992 >= a || 9007199254740992 <= a) return -61;
            Tc(f, a, d);
            fb = [f.position >>> 0, (H = f.position, 1 <= +Math.abs(H) ? 0 < H ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
            G[e >> 2] = fb[0];
            G[e + 4 >> 2] = fb[1];
            f.Dj && 0 === a && 0 === d && (f.Dj = null);
            return 0
        } catch (g) {
            if ("undefined" == typeof fd || !(g instanceof Q)) throw g;
            return g.Si
        }
    },
    Ea: function (a, b, c, d) {
        try {
            a: {
                var e = ld(a);a = b;
                for (var f = b = 0; f < c; f++) {
                    var g = G[a >> 2],
                        l = G[a + 4 >> 2];
                    a += 8;
                    var n = Uc(e, E, g, l);
                    if (0 > n) {
                        var q = -1;
                        break a
                    }
                    b += n
                }
                q = b
            }
            G[d >> 2] = q;
            return 0
        }
        catch (p) {
            if ("undefined" == typeof fd || !(p instanceof Q)) throw p;
            return p.Si
        }
    },
    a: function () {
        return $a
    },
    uf: function (a, b, c, d) {
        function e(t, v, r, C, y, F) {
            var J = 10 === t ? 28 : 16;
            if (10 === t) a: {
                var M = "";
                var z, L = 0,
                    fa = 0,
                    R = 0,
                    yb = 0;y = [y[0] & 65535, y[0] >> 16, y[1] & 65535, y[1] >> 16, y[2] & 65535, y[2] >> 16, y[3] & 65535, y[3] >> 16];
                var ab = !0;
                for (z =
                    0; 5 > z; z++)
                    if (0 !== y[z]) {
                        ab = !1;
                        break
                    } if (ab) {
                    z = Ag(y[6] | y[7] << 16);
                    if (-1 === y[5]) {
                        M = "::ffff:" + z;
                        break a
                    }
                    if (0 === y[5]) {
                        "0.0.0.0" === z && (z = "");
                        "0.0.0.1" === z && (z = "1");
                        M = "::" + z;
                        break a
                    }
                }
                for (z = 0; 8 > z; z++) 0 === y[z] && (1 < z - fa && (yb = 0), fa = z, yb++),
                yb > L && (L = yb, R = z - L + 1);
                for (z = 0; 8 > z; z++) 1 < L && 0 === y[z] && z >= R && z < R + L ? z === R && (M += ":", 0 === R && (M += ":")) : (M += Number(Kg(y[z] & 65535)).toString(16), M += 7 > z ? ":" : "")
            }
            else M = Ag(y);
            y = M;
            J = m(J);
            a: {
                M = y;
                switch (t) {
                    case 2:
                        M = ug(M);
                        A.fill(0, J, J + 16);
                        eb[J >> 1] = t;
                        G[J + 4 >> 2] = M;
                        eb[J + 2 >> 1] = wg(F);
                        break;
                    case 10:
                        M =
                            vg(M);
                        A.fill(0, J, J + 28);
                        G[J >> 2] = t;
                        G[J + 8 >> 2] = M[0];
                        G[J + 12 >> 2] = M[1];
                        G[J + 16 >> 2] = M[2];
                        G[J + 20 >> 2] = M[3];
                        eb[J + 2 >> 1] = wg(F);
                        break;
                    default:
                        F = 5;
                        break a
                }
                F = 0
            }!F || cb();
            F = m(32);
            G[F + 4 >> 2] = t;
            G[F + 8 >> 2] = v;
            G[F + 12 >> 2] = r;
            G[F + 24 >> 2] = C;
            G[F + 20 >> 2] = J;
            G[F + 16 >> 2] = 10 === t ? 28 : 16;
            G[F + 28 >> 2] = 0;
            return F
        }
        var f = 0,
            g = 0,
            l = 0,
            n = 0,
            q = 0,
            p = 0;
        c && (l = G[c >> 2], n = G[c + 4 >> 2], q = G[c + 8 >> 2], p = G[c + 12 >> 2]);
        q && !p && (p = 2 === q ? 17 : 6);
        !q && p && (q = 17 === p ? 2 : 1);
        0 === p && (p = 6);
        0 === q && (q = 1);
        if (!a && !b) return -2;
        if (l & -1088 || 0 !== c && G[c >> 2] & 2 && !a) return -1;
        if (l & 32) return -2;
        if (0 !==
            q && 1 !== q && 2 !== q) return -7;
        if (0 !== n && 2 !== n && 10 !== n) return -6;
        if (b && (b = x(b), g = parseInt(b, 10), isNaN(g))) return l & 1024 ? -2 : -8;
        if (!a) return 0 === n && (n = 2), 0 === (l & 1) && (2 === n ? f = Lg(2130706433) : f = [0, 0, 0, 1]), a = e(n, q, p, null, f, g), G[d >> 2] = a, 0;
        a = x(a);
        f = ug(a);
        if (null !== f)
            if (0 === n || 2 === n) n = 2;
            else if (10 === n && l & 8) f = [0, 0, Lg(65535), f], n = 10;
        else return -2;
        else if (f = vg(a), null !== f)
            if (0 === n || 10 === n) n = 10;
            else return -2;
        if (null != f) return a = e(n, q, p, a, f, g), G[d >> 2] = a, 0;
        if (l & 4) return -2;
        a = zg(a);
        f = ug(a);
        0 === n ? n = 2 : 10 === n && (f = [0, 0, Lg(65535),
            f
        ]);
        a = e(n, q, p, null, f, g);
        G[d >> 2] = a;
        return 0
    },
    ja: function (a) {
        T.activeTexture(a)
    },
    ta: function (a, b) {
        T.attachShader(V[a], W[b])
    },
    H: function (a, b) {
        34962 == a ? T.nj = b : 34963 == a && (T.fj = b);
        35051 == a ? T.Aj = b : 35052 == a && (T.Wi = b);
        T.bindBuffer(a, oe[b])
    },
    pb: function (a, b) {
        T.bindFramebuffer(a, qe[b])
    },
    C: function (a, b) {
        T.bindRenderbuffer(a, re[b])
    },
    h: function (a, b) {
        T.bindTexture(a, se[b])
    },
    ya: function (a, b) {
        T.blendFunc(a, b)
    },
    I: function (a, b, c, d) {
        T.blendFuncSeparate(a, b, c, d)
    },
    sb: function (a, b, c, d) {
        2 <= S.version ? c ? T.bufferData(a, A, d,
            c, b) : T.bufferData(a, b, d) : T.bufferData(a, c ? A.subarray(c, c + b) : b, d)
    },
    da: function (a) {
        T.clear(a)
    },
    Ba: function (a, b, c, d) {
        T.clearColor(a, b, c, d)
    },
    Aa: function (a) {
        T.clearDepth(a)
    },
    yb: function (a) {
        T.clearStencil(a)
    },
    wb: function (a, b, c, d) {
        T.colorMask(!!a, !!b, !!c, !!d)
    },
    mb: function (a) {
        T.compileShader(W[a])
    },
    jb: function () {
        var a = De(V),
            b = T.createProgram();
        b.name = a;
        b.qj = b.oj = b.pj = 0;
        b.gk = 1;
        V[a] = b;
        return a
    },
    ob: function (a) {
        var b = De(W);
        W[b] = T.createShader(a);
        return b
    },
    ub: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = G[b + 4 * c >>
                    2],
                e = oe[d];
            e && (T.deleteBuffer(e), e.name = 0, oe[d] = null, d == T.nj && (T.nj = 0), d == T.fj && (T.fj = 0), d == T.Aj && (T.Aj = 0), d == T.Wi && (T.Wi = 0))
        }
    },
    fa: function (a, b) {
        for (var c = 0; c < a; ++c) {
            var d = G[b + 4 * c >> 2],
                e = qe[d];
            e && (T.deleteFramebuffer(e), e.name = 0, qe[d] = null)
        }
    },
    va: function (a) {
        if (a) {
            var b = V[a];
            b ? (T.deleteProgram(b), b.name = 0, V[a] = null) : X(1281)
        }
    },
    F: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = G[b + 4 * c >> 2],
                e = re[d];
            e && (T.deleteRenderbuffer(e), e.name = 0, re[d] = null)
        }
    },
    A: function (a) {
        if (a) {
            var b = W[a];
            b ? (T.deleteShader(b), W[a] = null) :
                X(1281)
        }
    },
    ka: function (a, b) {
        for (var c = 0; c < a; c++) {
            var d = G[b + 4 * c >> 2],
                e = se[d];
            e && (T.deleteTexture(e), e.name = 0, se[d] = null)
        }
    },
    Ia: function (a) {
        T.depthFunc(a)
    },
    za: function (a) {
        T.depthMask(!!a)
    },
    pd: function (a, b) {
        T.depthRange(a, b)
    },
    o: function (a) {
        T.disable(a)
    },
    rb: function (a) {
        S.ej[a].enabled = !1;
        T.disableVertexAttribArray(a)
    },
    qb: function (a, b, c) {
        Ge(b + c);
        T.drawArrays(a, b, c);
        Ie()
    },
    t: function (a) {
        T.enable(a)
    },
    u: function (a) {
        S.ej[a].enabled = !0;
        T.enableVertexAttribArray(a)
    },
    J: function () {
        T.flush()
    },
    B: function (a, b, c, d) {
        T.framebufferRenderbuffer(a,
            b, c, re[d])
    },
    D: function (a, b, c, d, e) {
        T.framebufferTexture2D(a, b, c, se[d], e)
    },
    xb: function (a) {
        T.frontFace(a)
    },
    tb: function (a, b) {
        Gf(a, b, "createBuffer", oe)
    },
    Ca: function (a, b) {
        Gf(a, b, "createFramebuffer", qe)
    },
    wa: function (a, b) {
        Gf(a, b, "createRenderbuffer", re)
    },
    l: function (a, b) {
        Gf(a, b, "createTexture", se)
    },
    Z: function (a, b, c, d, e, f, g) {
        Hf("getActiveUniform", a, b, c, d, e, f, g)
    },
    y: function (a, b) {
        return T.getAttribLocation(V[a], x(b))
    },
    Ja: function () {
        var a = T.getError() || Ce;
        Ce = 0;
        return a
    },
    we: function (a, b) {
        Jf(a, b, 2)
    },
    la: function (a,
        b) {
        Jf(a, b, 0)
    },
    hb: function (a, b, c, d) {
        a = T.getProgramInfoLog(V[a]);
        null === a && (a = "(unknown error)");
        b = 0 < b && d ? u(a, d, b) : 0;
        c && (G[c >> 2] = b)
    },
    _: function (a, b, c) {
        if (c)
            if (a >= ne) X(1281);
            else if (a = V[a], 35716 == b) a = T.getProgramInfoLog(a), null === a && (a = "(unknown error)"), G[c >> 2] = a.length + 1;
        else if (35719 == b) {
            if (!a.qj)
                for (b = 0; b < T.getProgramParameter(a, 35718); ++b) a.qj = Math.max(a.qj, T.getActiveUniform(a, b).name.length + 1);
            G[c >> 2] = a.qj
        } else if (35722 == b) {
            if (!a.oj)
                for (b = 0; b < T.getProgramParameter(a, 35721); ++b) a.oj = Math.max(a.oj,
                    T.getActiveAttrib(a, b).name.length + 1);
            G[c >> 2] = a.oj
        } else if (35381 == b) {
            if (!a.pj)
                for (b = 0; b < T.getProgramParameter(a, 35382); ++b) a.pj = Math.max(a.pj, T.getActiveUniformBlockName(a, b).length + 1);
            G[c >> 2] = a.pj
        } else G[c >> 2] = T.getProgramParameter(a, b);
        else X(1281)
    },
    lb: function (a, b, c, d) {
        a = T.getShaderInfoLog(W[a]);
        null === a && (a = "(unknown error)");
        b = 0 < b && d ? u(a, d, b) : 0;
        c && (G[c >> 2] = b)
    },
    ua: function (a, b, c) {
        c ? 35716 == b ? (a = T.getShaderInfoLog(W[a]), null === a && (a = "(unknown error)"), G[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = T.getShaderSource(W[a]),
            G[c >> 2] = a ? a.length + 1 : 0) : G[c >> 2] = T.getShaderParameter(W[a], b) : X(1281)
    },
    p: function (a) {
        var b = ze[a];
        if (!b) {
            switch (a) {
                case 7939:
                    b = T.getSupportedExtensions() || [];
                    b = b.concat(b.map(function (d) {
                        return "GL_" + d
                    }));
                    b = Lf(b.join(" "));
                    break;
                case 7936:
                case 7937:
                case 37445:
                case 37446:
                    (b = T.getParameter(a)) || X(1280);
                    b = b && Lf(b);
                    break;
                case 7938:
                    b = T.getParameter(7938);
                    b = 2 <= S.version ? "OpenGL ES 3.0 (" + b + ")" : "OpenGL ES 2.0 (" + b + ")";
                    b = Lf(b);
                    break;
                case 35724:
                    b = T.getParameter(35724);
                    var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                    null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
                    b = Lf(b);
                    break;
                default:
                    X(1280)
            }
            ze[a] = b
        }
        return b
    },
    g: function (a, b) {
        b = x(b);
        if (a = V[a]) {
            Nf(a);
            var c = a.Ij,
                d = 0,
                e = b,
                f = Mf(b);
            0 < f && (d = parseInt(b.slice(f + 1)) >>> 0, e = b.slice(0, f));
            if ((e = a.hk[e]) && d < e[0] && (d += e[1], c[d] = c[d] || T.getUniformLocation(a, b))) return d
        } else X(1281);
        return -1
    },
    ib: function (a) {
        a = V[a];
        T.linkProgram(a);
        a.Ij = 0;
        a.hk = {}
    },
    Ha: function (a, b) {
        3317 == a && (Be = b);
        T.pixelStorei(a, b)
    },
    ia: function (a, b, c, d, e, f, g) {
        if (2 <= S.version)
            if (T.Aj) T.readPixels(a,
                b, c, d, e, f, g);
            else {
                var l = Qf(f);
                T.readPixels(a, b, c, d, e, f, l, g >> Rf(l))
            }
        else(g = Sf(f, e, c, d, g)) ? T.readPixels(a, b, c, d, e, f, g) : X(1280)
    },
    $: function (a, b, c, d) {
        T.renderbufferStorage(a, b, c, d)
    },
    L: function (a, b, c, d) {
        T.scissor(a, b, c, d)
    },
    nb: function (a, b, c, d) {
        b = Fe(b, c, d);
        T.shaderSource(W[a], b)
    },
    ba: function (a, b, c) {
        T.stencilFunc(a, b, c)
    },
    vb: function (a) {
        T.stencilMask(a)
    },
    ca: function (a, b, c) {
        T.stencilOp(a, b, c)
    },
    k: function (a, b, c, d, e, f, g, l, n) {
        if (2 <= S.version)
            if (T.Wi) T.texImage2D(a, b, c, d, e, f, g, l, n);
            else if (n) {
            var q = Qf(l);
            T.texImage2D(a,
                b, c, d, e, f, g, l, q, n >> Rf(q))
        } else T.texImage2D(a, b, c, d, e, f, g, l, null);
        else T.texImage2D(a, b, c, d, e, f, g, l, n ? Sf(l, g, d, e, n) : null)
    },
    i: function (a, b, c) {
        T.texParameterf(a, b, c)
    },
    ea: function (a, b, c, d, e, f, g, l, n) {
        if (2 <= S.version)
            if (T.Wi) T.texSubImage2D(a, b, c, d, e, f, g, l, n);
            else if (n) {
            var q = Qf(l);
            T.texSubImage2D(a, b, c, d, e, f, g, l, q, n >> Rf(q))
        } else T.texSubImage2D(a, b, c, d, e, f, g, l, null);
        else q = null, n && (q = Sf(l, g, e, f, n)), T.texSubImage2D(a, b, c, d, e, f, g, l, q)
    },
    aa: function (a, b) {
        T.uniform1f(Y(a), b)
    },
    gb: function (a, b, c) {
        if (2 <= S.version) T.uniform1fv(Y(a),
            I, c >> 2, b);
        else {
            if (288 >= b)
                for (var d = Tf[b - 1], e = 0; e < b; ++e) d[e] = I[c + 4 * e >> 2];
            else d = I.subarray(c >> 2, c + 4 * b >> 2);
            T.uniform1fv(Y(a), d)
        }
    },
    G: function (a, b) {
        T.uniform1i(Y(a), b)
    },
    Zh: function (a, b, c) {
        if (2 <= S.version) T.uniform1iv(Y(a), G, c >> 2, b);
        else {
            if (288 >= b)
                for (var d = Uf[b - 1], e = 0; e < b; ++e) d[e] = G[c + 4 * e >> 2];
            else d = G.subarray(c >> 2, c + 4 * b >> 2);
            T.uniform1iv(Y(a), d)
        }
    },
    $h: function (a, b, c) {
        if (2 <= S.version) T.uniform2fv(Y(a), I, c >> 2, 2 * b);
        else {
            if (144 >= b)
                for (var d = Tf[2 * b - 1], e = 0; e < 2 * b; e += 2) d[e] = I[c + 4 * e >> 2], d[e + 1] = I[c + (4 * e + 4) >> 2];
            else d = I.subarray(c >> 2, c + 8 * b >> 2);
            T.uniform2fv(Y(a), d)
        }
    },
    Yh: function (a, b, c) {
        if (2 <= S.version) T.uniform2iv(Y(a), G, c >> 2, 2 * b);
        else {
            if (144 >= b)
                for (var d = Uf[2 * b - 1], e = 0; e < 2 * b; e += 2) d[e] = G[c + 4 * e >> 2], d[e + 1] = G[c + (4 * e + 4) >> 2];
            else d = G.subarray(c >> 2, c + 8 * b >> 2);
            T.uniform2iv(Y(a), d)
        }
    },
    _h: function (a, b, c) {
        if (2 <= S.version) T.uniform3fv(Y(a), I, c >> 2, 3 * b);
        else {
            if (96 >= b)
                for (var d = Tf[3 * b - 1], e = 0; e < 3 * b; e += 3) d[e] = I[c + 4 * e >> 2], d[e + 1] = I[c + (4 * e + 4) >> 2], d[e + 2] = I[c + (4 * e + 8) >> 2];
            else d = I.subarray(c >> 2, c + 12 * b >> 2);
            T.uniform3fv(Y(a), d)
        }
    },
    Xh: function (a, b, c) {
        if (2 <= S.version) T.uniform3iv(Y(a), G, c >> 2, 3 * b);
        else {
            if (96 >= b)
                for (var d = Uf[3 * b - 1], e = 0; e < 3 * b; e += 3) d[e] = G[c + 4 * e >> 2], d[e + 1] = G[c + (4 * e + 4) >> 2], d[e + 2] = G[c + (4 * e + 8) >> 2];
            else d = G.subarray(c >> 2, c + 12 * b >> 2);
            T.uniform3iv(Y(a), d)
        }
    },
    s: function (a, b, c) {
        if (2 <= S.version) T.uniform4fv(Y(a), I, c >> 2, 4 * b);
        else {
            if (72 >= b) {
                var d = Tf[4 * b - 1],
                    e = I;
                c >>= 2;
                for (var f = 0; f < 4 * b; f += 4) {
                    var g = c + f;
                    d[f] = e[g];
                    d[f + 1] = e[g + 1];
                    d[f + 2] = e[g + 2];
                    d[f + 3] = e[g + 3]
                }
            } else d = I.subarray(c >> 2, c + 16 * b >> 2);
            T.uniform4fv(Y(a), d)
        }
    },
    Wh: function (a, b, c) {
        if (2 <=
            S.version) T.uniform4iv(Y(a), G, c >> 2, 4 * b);
        else {
            if (72 >= b)
                for (var d = Uf[4 * b - 1], e = 0; e < 4 * b; e += 4) d[e] = G[c + 4 * e >> 2], d[e + 1] = G[c + (4 * e + 4) >> 2], d[e + 2] = G[c + (4 * e + 8) >> 2], d[e + 3] = G[c + (4 * e + 12) >> 2];
            else d = G.subarray(c >> 2, c + 16 * b >> 2);
            T.uniform4iv(Y(a), d)
        }
    },
    Vh: function (a, b, c, d) {
        if (2 <= S.version) T.uniformMatrix2fv(Y(a), !!c, I, d >> 2, 4 * b);
        else {
            if (72 >= b)
                for (var e = Tf[4 * b - 1], f = 0; f < 4 * b; f += 4) e[f] = I[d + 4 * f >> 2], e[f + 1] = I[d + (4 * f + 4) >> 2], e[f + 2] = I[d + (4 * f + 8) >> 2], e[f + 3] = I[d + (4 * f + 12) >> 2];
            else e = I.subarray(d >> 2, d + 16 * b >> 2);
            T.uniformMatrix2fv(Y(a),
                !!c, e)
        }
    },
    Uh: function (a, b, c, d) {
        if (2 <= S.version) T.uniformMatrix3fv(Y(a), !!c, I, d >> 2, 9 * b);
        else {
            if (32 >= b)
                for (var e = Tf[9 * b - 1], f = 0; f < 9 * b; f += 9) e[f] = I[d + 4 * f >> 2], e[f + 1] = I[d + (4 * f + 4) >> 2], e[f + 2] = I[d + (4 * f + 8) >> 2], e[f + 3] = I[d + (4 * f + 12) >> 2], e[f + 4] = I[d + (4 * f + 16) >> 2], e[f + 5] = I[d + (4 * f + 20) >> 2], e[f + 6] = I[d + (4 * f + 24) >> 2], e[f + 7] = I[d + (4 * f + 28) >> 2], e[f + 8] = I[d + (4 * f + 32) >> 2];
            else e = I.subarray(d >> 2, d + 36 * b >> 2);
            T.uniformMatrix3fv(Y(a), !!c, e)
        }
    },
    xa: function (a, b, c, d) {
        if (2 <= S.version) T.uniformMatrix4fv(Y(a), !!c, I, d >> 2, 16 * b);
        else {
            if (18 >= b) {
                var e =
                    Tf[16 * b - 1],
                    f = I;
                d >>= 2;
                for (var g = 0; g < 16 * b; g += 16) {
                    var l = d + g;
                    e[g] = f[l];
                    e[g + 1] = f[l + 1];
                    e[g + 2] = f[l + 2];
                    e[g + 3] = f[l + 3];
                    e[g + 4] = f[l + 4];
                    e[g + 5] = f[l + 5];
                    e[g + 6] = f[l + 6];
                    e[g + 7] = f[l + 7];
                    e[g + 8] = f[l + 8];
                    e[g + 9] = f[l + 9];
                    e[g + 10] = f[l + 10];
                    e[g + 11] = f[l + 11];
                    e[g + 12] = f[l + 12];
                    e[g + 13] = f[l + 13];
                    e[g + 14] = f[l + 14];
                    e[g + 15] = f[l + 15]
                }
            } else e = I.subarray(d >> 2, d + 64 * b >> 2);
            T.uniformMatrix4fv(Y(a), !!c, e)
        }
    },
    kb: function (a) {
        a = V[a];
        T.useProgram(a);
        T.Qk = a
    },
    j: function (a, b, c, d, e, f) {
        var g = S.ej[a];
        T.nj ? (g.zj = !1, T.vertexAttribPointer(a, b, c, !!d, e, f)) : (g.size =
            b, g.type = c, g.$j = d, g.Rj = e, g.Mj = f, g.zj = !0, g.ik = function (l, n, q, p, t, v) {
                this.vertexAttribPointer(l, n, q, p, t, v)
            })
    },
    M: function (a, b, c, d) {
        T.viewport(a, b, c, d)
    },
    m: Mg,
    N: Ng,
    z: Og,
    n: Pg,
    pa: Qg,
    _a: Rg,
    db: Sg,
    f: Tg,
    e: Ug,
    cb: Vg,
    Sh: Wg,
    b: function (a) {
        $a = a
    },
    na: Eg,
    Ab: function (a, b, c, d) {
        return Eg(a, b, c, d)
    }
};
(function () {
    function a(e) {
        h.asm = e.exports;
        ib = h.asm.ai;
        ub();
        vb = h.asm.ci;
        xb.unshift(h.asm.bi);
        Hb("wasm-instantiate")
    }

    function b(e) {
        a(e.instance)
    }

    function c(e) {
        return Mb().then(function (f) {
            return WebAssembly.instantiate(f, d)
        }).then(function (f) {
            return f
        }).then(e, function (f) {
            k("failed to asynchronously prepare wasm: " + f);
            cb(f)
        })
    }
    var d = {
        a: Xg
    };
    Gb("wasm-instantiate");
    if (h.instantiateWasm) try {
        return h.instantiateWasm(d, a)
    } catch (e) {
        return k("Module.instantiateWasm callback failed with error: " + e), !1
    }(function () {
        return bb ||
            "function" != typeof WebAssembly.instantiateStreaming || Ib() || Jb.startsWith("file://") || "function" != typeof fetch ? c(b) : fetch(Jb, {
                credentials: "same-origin"
            }).then(function (e) {
                return WebAssembly.instantiateStreaming(e, d).then(b, function (f) {
                    k("wasm streaming compile failed: " + f);
                    k("falling back to ArrayBuffer instantiation");
                    return c(b)
                })
            })
    })();
    return {}
})();
h.___wasm_call_ctors = function () {
    return (h.___wasm_call_ctors = h.asm.bi).apply(null, arguments)
};
var ba = h._memcpy = function () {
        return (ba = h._memcpy = h.asm.di).apply(null, arguments)
    },
    m = h._malloc = function () {
        return (m = h._malloc = h.asm.ei).apply(null, arguments)
    },
    ca = h._free = function () {
        return (ca = h._free = h.asm.fi).apply(null, arguments)
    },
    wg = h._htons = function () {
        return (wg = h._htons = h.asm.gi).apply(null, arguments)
    },
    Lg = h._htonl = function () {
        return (Lg = h._htonl = h.asm.hi).apply(null, arguments)
    },
    Kg = h._ntohs = function () {
        return (Kg = h._ntohs = h.asm.ii).apply(null, arguments)
    },
    Ig = h.___errno_location = function () {
        return (Ig = h.___errno_location =
            h.asm.ji).apply(null, arguments)
    };
h._chat_callback = function () {
    return (h._chat_callback = h.asm.ki).apply(null, arguments)
};
h._join_game_callback = function () {
    return (h._join_game_callback = h.asm.li).apply(null, arguments)
};
h._api_error_callback = function () {
    return (h._api_error_callback = h.asm.mi).apply(null, arguments)
};
h._create_game_callback = function () {
    return (h._create_game_callback = h.asm.ni).apply(null, arguments)
};
h._player_info_callback = function () {
    return (h._player_info_callback = h.asm.oi).apply(null, arguments)
};
h._log_next_game_state = function () {
    return (h._log_next_game_state = h.asm.pi).apply(null, arguments)
};
h._start_game = function () {
    return (h._start_game = h.asm.qi).apply(null, arguments)
};
h._wallpaper_update_config = function () {
    return (h._wallpaper_update_config = h.asm.ri).apply(null, arguments)
};
h._wallpaper_reset_config = function () {
    return (h._wallpaper_reset_config = h.asm.si).apply(null, arguments)
};
h._video_playback_started = function () {
    return (h._video_playback_started = h.asm.ti).apply(null, arguments)
};
h._video_playback_ended = function () {
    return (h._video_playback_ended = h.asm.ui).apply(null, arguments)
};
h._post_video_upload_callback = function () {
    return (h._post_video_upload_callback = h.asm.vi).apply(null, arguments)
};
h._YYSum = function () {
    return (h._YYSum = h.asm.wi).apply(null, arguments)
};
h._main = function () {
    return (h._main = h.asm.xi).apply(null, arguments)
};
h._FSSyncCompleted = function () {
    return (h._FSSyncCompleted = h.asm.yi).apply(null, arguments)
};
var Yg = h._setThrew = function () {
        return (Yg = h._setThrew = h.asm.zi).apply(null, arguments)
    },
    mb = h.stackSave = function () {
        return (mb = h.stackSave = h.asm.Ai).apply(null, arguments)
    },
    nb = h.stackRestore = function () {
        return (nb = h.stackRestore = h.asm.Bi).apply(null, arguments)
    },
    lb = h.stackAlloc = function () {
        return (lb = h.stackAlloc = h.asm.Ci).apply(null, arguments)
    };
h.dynCall_viij = function () {
    return (h.dynCall_viij = h.asm.Di).apply(null, arguments)
};
h.dynCall_vij = function () {
    return (h.dynCall_vij = h.asm.Ei).apply(null, arguments)
};
h.dynCall_iiiiiij = function () {
    return (h.dynCall_iiiiiij = h.asm.Fi).apply(null, arguments)
};
h.dynCall_iiji = function () {
    return (h.dynCall_iiji = h.asm.Gi).apply(null, arguments)
};
h.dynCall_jiji = function () {
    return (h.dynCall_jiji = h.asm.Hi).apply(null, arguments)
};
h.dynCall_ji = function () {
    return (h.dynCall_ji = h.asm.Ii).apply(null, arguments)
};
h.dynCall_viijii = function () {
    return (h.dynCall_viijii = h.asm.Ji).apply(null, arguments)
};
h.dynCall_iiiiij = function () {
    return (h.dynCall_iiiiij = h.asm.Ki).apply(null, arguments)
};
h.dynCall_iiiiijj = function () {
    return (h.dynCall_iiiiijj = h.asm.Li).apply(null, arguments)
};
h.dynCall_iiiiiijj = function () {
    return (h.dynCall_iiiiiijj = h.asm.Mi).apply(null, arguments)
};

function Ng(a, b, c) {
    var d = mb();
    try {
        return P(a)(b, c)
    } catch (e) {
        nb(d);
        if (e !== e + 0) throw e;
        Yg(1, 0)
    }
}

function Ug(a, b, c, d) {
    var e = mb();
    try {
        P(a)(b, c, d)
    } catch (f) {
        nb(e);
        if (f !== f + 0) throw f;
        Yg(1, 0)
    }
}

function Pg(a, b, c, d, e) {
    var f = mb();
    try {
        return P(a)(b, c, d, e)
    } catch (g) {
        nb(f);
        if (g !== g + 0) throw g;
        Yg(1, 0)
    }
}

function Mg(a, b) {
    var c = mb();
    try {
        return P(a)(b)
    } catch (d) {
        nb(c);
        if (d !== d + 0) throw d;
        Yg(1, 0)
    }
}

function Og(a, b, c, d) {
    var e = mb();
    try {
        return P(a)(b, c, d)
    } catch (f) {
        nb(e);
        if (f !== f + 0) throw f;
        Yg(1, 0)
    }
}

function Tg(a, b, c) {
    var d = mb();
    try {
        P(a)(b, c)
    } catch (e) {
        nb(d);
        if (e !== e + 0) throw e;
        Yg(1, 0)
    }
}

function Wg(a, b, c, d, e, f, g, l, n, q) {
    var p = mb();
    try {
        P(a)(b, c, d, e, f, g, l, n, q)
    } catch (t) {
        nb(p);
        if (t !== t + 0) throw t;
        Yg(1, 0)
    }
}

function Sg(a, b) {
    var c = mb();
    try {
        P(a)(b)
    } catch (d) {
        nb(c);
        if (d !== d + 0) throw d;
        Yg(1, 0)
    }
}

function Vg(a, b, c, d, e) {
    var f = mb();
    try {
        P(a)(b, c, d, e)
    } catch (g) {
        nb(f);
        if (g !== g + 0) throw g;
        Yg(1, 0)
    }
}

function Rg(a) {
    var b = mb();
    try {
        P(a)()
    } catch (c) {
        nb(b);
        if (c !== c + 0) throw c;
        Yg(1, 0)
    }
}

function Qg(a, b, c, d, e, f, g, l, n, q) {
    var p = mb();
    try {
        return P(a)(b, c, d, e, f, g, l, n, q)
    } catch (t) {
        nb(p);
        if (t !== t + 0) throw t;
        Yg(1, 0)
    }
}
h.cwrap = function (a, b, c, d) {
    c = c || [];
    var e = c.every(function (f) {
        return "number" === f
    });
    return "string" !== b && e && !d ? h["_" + a] : function () {
        return kb(a, b, c, arguments)
    }
};
h.getValue = hb;
h.addRunDependency = Gb;
h.removeRunDependency = Hb;
h.FS_createPath = Yc;
h.FS_createDataFile = $c;
h.FS_createPreloadedFile = ed;
h.FS_createLazyFile = cd;
h.FS_createDevice = ad;
h.FS_unlink = Ha;
h.dynCall = Rb;
h.dynCall = Rb;
var Zg;

function Wa(a) {
    this.name = "ExitStatus";
    this.message = "Program terminated with exit(" + a + ")";
    this.status = a
}
Fb = function $g() {
    Zg || ah();
    Zg || (Fb = $g)
};

function ah(a) {
    function b() {
        if (!Zg && (Zg = !0, h.calledRun = !0, !jb)) {
            h.noFSInit || Wc || (Wc = !0, Vc(), h.stdin = h.stdin, h.stdout = h.stdout, h.stderr = h.stderr, h.stdin ? ad("/dev", "stdin", h.stdin) : Oc("/dev/tty", "/dev/stdin"), h.stdout ? ad("/dev", "stdout", null, h.stdout) : Oc("/dev/tty", "/dev/stdout"), h.stderr ? ad("/dev", "stderr", null, h.stderr) : Oc("/dev/tty1", "/dev/stderr"), Rc("/dev/stdin", 0), Rc("/dev/stdout", 1), Rc("/dev/stderr", 1));
            vc = !1;
            Ub(xb);
            Ub(zb);
            if (h.onRuntimeInitialized) h.onRuntimeInitialized();
            if (bh) {
                var c = a,
                    d = h._main;
                c = c || [];
                var e = c.length + 1,
                    f = lb(4 * (e + 1));
                G[f >> 2] = sb(Ka);
                for (var g = 1; g < e; g++) G[(f >> 2) + g] = sb(c[g - 1]);
                G[(f >> 2) + e] = 0;
                try {
                    var l = d(e, f);
                    Jg(l)
                } catch (n) {
                    Xb(n)
                } finally {}
            }
            if (h.postRun)
                for ("function" == typeof h.postRun && (h.postRun = [h.postRun]); h.postRun.length;) c = h.postRun.shift(), Bb.unshift(c);
            Ub(Bb)
        }
    }
    a = a || Ja;
    if (!(0 < Db)) {
        if (h.preRun)
            for ("function" == typeof h.preRun && (h.preRun = [h.preRun]); h.preRun.length;) Cb();
        Ub(wb);
        0 < Db || (h.setStatus ? (h.setStatus("Running..."), setTimeout(function () {
            setTimeout(function () {
                    h.setStatus("")
                },
                1);
            b()
        }, 1)) : b())
    }
}
h.run = ah;

function Jg(a) {
    if (!noExitRuntime) {
        if (h.onExit) h.onExit(a);
        jb = !0
    }
    La(a, new Wa(a))
}
if (h.preInit)
    for ("function" == typeof h.preInit && (h.preInit = [h.preInit]); 0 < h.preInit.length;) h.preInit.pop()();
var bh = !0;
h.noInitialRun && (bh = !1);
ah();
(function () {
    if ("undefined" != typeof window && !window.Ni) {
        webtransport_async_read = async d => {
            try {
                let g = d.mj.datagrams.readable.getReader();
                for (var e = !1; !e;) {
                    var f;
                    ({
                        value: f,
                        done: e
                    } = await g.read());
                    d.ak.push(f)
                }
                console.log("Closing WebTransport connection")
            } catch (g) {
                console.error("Could not open channel to read datagrams, " + g)
            }
        };
        webtransport_async_connect = async (d, e) => {
            try {
                await d.mj.ready;
                console.log("Connected successfully to relay.");
                try {
                    d.Bj = d.mj.datagrams.writable.getWriter()
                } catch (f) {
                    console.error("Could not open channel to send datagrams, " +
                        f)
                }
            } catch (f) {
                console.error("Connection failed to " + e + ", " + f)
            }
            d.mj.closed.then(() => {
                d.Bj = null;
                console.log("Connection to " + e + " closed gracefully")
            }).catch(() => {
                d.Bj = null;
                console.error("Connection to " + e + " closed abruptly")
            });
            webtransport_async_read(d)
        };
        class c {
            constructor() {
                this.Bj = this.mj = null;
                this.ak = [];
                this.url = ""
            }
            destroy() {
                null != this.mj && this.mj && (this.mj.close(), this.mj = null);
                this.Bj = null
            }
            async connect(d, e) {
                try {
                    d.mj = new WebTransport(e)
                } catch (f) {
                    console.error("Failed to initialise WebTransport, " +
                        f)
                }
                await webtransport_async_connect(d, e)
            }
            async send(d, e) {
                null == this.mj && await this.connect(this, this.url);
                for (var f = 10; !this.Bj && f;) await new Promise(n => setTimeout(n, 100)), f--;
                if (this.Bj) {
                    d = h.HEAPU8.subarray(d, d + e);
                    f = new ArrayBuffer(e);
                    for (var g = new Uint8Array(f), l = 0; l < e; l++) g[l] = d[l];
                    this.Bj.write(f)
                } else console.log("DatagramWriter is not initialized. Couldn't send message.")
            }
            Ml(d, e) {
                if (0 == this.ak.length) return -1;
                var f = this.ak[0];
                this.ak.shift();
                var g = f.length;
                if (g > e) return -1;
                d = h.HEAPU8.subarray(d,
                    d + g);
                for (e = 0; e < g; e++) d[e] = f[e];
                return g
            }
        }
        var a = [],
            b = 0;
        webtransport_set_relay = (d, e) => {
            const f = b++;
            a[f] = new c;
            a[f].url = d + ":" + e;
            return f
        };
        webtransport_send = (d, e, f) => {
            a[d].send(e, f)
        };
        webtransport_receive = (d, e, f) => a[d].Ml(e, f);
        webtransport_destroy = d => {
            a[d].destroy();
            a[d] = null
        }
    }
})();
"undefined" != typeof window && (api_error_callback = h.cwrap("api_error_callback", null, ["number", "string"]), create_game_callback = h.cwrap("create_game_callback", null, ["string", "string", "string"]), join_game_callback = h.cwrap("join_game_callback", null, ["string"]), chat_callback = h.cwrap("chat_callback", null, ["string", "number"]), player_info_callback = h.cwrap("player_info_callback", null, "number string string string bool string".split(" ")), log_next_game_state = h.cwrap("log_next_game_state", null, []), start_game = h.cwrap("start_game",
        null, []), init_request_parameters = a => {
        var b = {
            method: "POST",
            credentials: "include",
            headers: {}
        };
        b.headers["Content-Type"] = "application/json;charset=UTF-8";
        b.headers["Access-Control-Allow-Credentials"] = "true";
        b.body = JSON.stringify(a);
        return b
    }, gxc_room_size = 4, gxc_local_player = 0, gxc_player_info = [], gxc_set_room_info = (a, b) => {
        gxc_room_size = a;
        gxc_local_player = b
    }, set_local_share_url = a => {
        window.shareUrl = a;
        if (a = document.getElementById("share-button")) a.style.visibility = "visible"
    }, post_share_url = a => {
        if (window.parent) {
            var b = {
                type: "share_url"
            };
            b.shareUrl = a;
            window.parent.postMessage(b, "*")
        }
    }, gxc_request_room = (a, b, c, d, e, f) => {
        var g = location.host.startsWith("localhost") || location.host.startsWith("test.vectorwars.gmx.dev");
        g && (e = "debug");
        console.log("Requesting " + c + "-player game with game-id " + e);
        var l = {};
        l.region = b;
        l.roomSize = c;
        l.lateJoin = !!d;
        b = init_request_parameters(l);
        fetch("https://" + a + "/gg/games/" + e + "/rooms" + (f.length ? "?trackId=" + f : ""), b).then(n => {
            n.ok ? n.json().then(q => {
                var p = q.data.shareUrl,
                    t = q.data.roomUrl;
                q = q.data.joinRoomUrl;
                g ? (p = location.protocol + "//" + location.host + location.pathname + "?game=debug&roomUrl=" + t, set_local_share_url(p)) : post_share_url(p);
                create_game_callback(q, p, t)
            }) : n.json().then(q => {
                if (window.parent) {
                    var p = {
                        type: "api_error"
                    };
                    p.error = q.errors[0].code;
                    window.parent.postMessage(p, "*")
                }
                api_error_callback(n.status, q.errors[0].code)
            })
        })
    }, gxc_join_room = (a, b, c, d) => {
        console.log("Joining game '" + b + "' with track-id '" + c + "' on environment '" + a + "' using url " + d);
        var e = {};
        "debug" != b && (e.gameId = b, e.trackId = c);
        e.roomUrl =
            d;
        b = init_request_parameters(e);
        fetch("https://" + a + "/gg/rooms", b).then(f => {
            f.ok ? f.json().then(g => {
                join_game_callback(g.data.roomUrl)
            }) : f.json().then(g => {
                if (window.parent) {
                    var l = {
                        type: "api_error"
                    };
                    l.error = g.errors[0].code;
                    window.parent.postMessage(l, "*")
                }
                api_error_callback(f.status, g.errors[0].code)
            })
        });
        location.host.startsWith("localhost") || location.host.startsWith("test.vectorwars.gmx.dev") ? set_local_share_url(window.location.href) : post_share_url(window.location.href)
    }, gxc_get_player_info = (a, b, c) => {
        console.log("Requesting player info.");
        var d = {
            method: "GET",
            credentials: "include",
            headers: {}
        };
        d.headers["Content-Type"] = "application/json;charset=UTF-8";
        d.headers["Access-Control-Allow-Credentials"] = "true";
        let e = "https://" + b + "/images/AvatarPlaceholder.png";
        fetch("https://" + a + "/gg/v2/rooms?roomUrl=" + c, d).then(f => {
            f.ok ? f.json().then(g => {
                gxc_player_info = g.data.players;
                gxc_player_info.forEach(l => {
                    null !== l.playerId && (null === l.user.userId ? (l.user.userId = "", l.user.guest = !0) : l.user.guest = !1, null === l.user.username &&
                        (l.user.username = "unknown"), null === l.user.avatarUrl && (l.user.avatarUrl = e))
                });
                window.parent && (g = {
                    type: "players"
                }, g.roomSize = gxc_room_size, g.local = gxc_local_player, g.players = gxc_player_info, window.parent.postMessage(g, "*"));
                gxc_player_info.forEach(l => {
                    null !== l.playerId && player_info_callback(l.playerId, l.user.username, l.user.avatarUrl, l.status, l.user.guest, l.user.userId)
                })
            }) : (404 == f.status && [0, 1, 2, 3].forEach(g => player_info_callback(g, "unknown", e, "JOINED", !0, "")), f.json().then(g => console.log(g)))
        })
    },
    gxc_set_player_status = (a, b) => {
        gxc_player_info.forEach(d => {
            d.playerId === a && (d.status = b)
        });
        if (window.parent) {
            var c = {
                type: "players"
            };
            c.roomSize = gxc_room_size;
            c.local = gxc_local_player;
            c.players = gxc_player_info;
            window.parent.postMessage(c, "*")
        }
    }, window.addEventListener("message", a => {
        if (a && a.data && "parent_send_chat_message" == a.data.type) {
            var b = a.data.tl;
            if (null === b || void 0 === b) b = -1;
            chat_callback(a.data.content || "", b)
        }
    }), gxc_receive_chat_message = (a, b, c) => {
        window.parent.postMessage({
            type: "receive_chat_message",
            content: a,
            src: b,
            tl: c
        }, "*")
    }, gxc_report_status = a => {
        window.parent.postMessage({
            type: "report_status",
            status: a
        }, "*")
    });
"undefined" != typeof window && (wallpaper_update_config = h.cwrap("wallpaper_update_config", null, ["string"]), wallpaper_reset_config = h.cwrap("wallpaper_reset_config", null, ["string"]));
