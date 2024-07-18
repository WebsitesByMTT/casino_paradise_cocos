window.__require = function e(t, r, i) {
function n(o, a) {
if (!r[o]) {
if (!t[o]) {
var f = o.split("/");
f = f[f.length - 1];
if (!t[f]) {
var c = "function" == typeof __require && __require;
if (!a && c) return c(f, !0);
if (s) return s(f, !0);
throw new Error("Cannot find module '" + o + "'");
}
o = f;
}
var u = r[o] = {
exports: {}
};
t[o][0].call(u.exports, function(e) {
return n(t[o][1][e] || e);
}, u, u.exports, e, t, r, i);
}
return r[o].exports;
}
for (var s = "function" == typeof __require && __require, o = 0; o < i.length; o++) n(i[o]);
return n;
}({
1: [ function(e, t, r) {
"use strict";
const i = r;
i.bignum = e("bn.js");
i.define = e("./asn1/api").define;
i.base = e("./asn1/base");
i.constants = e("./asn1/constants");
i.decoders = e("./asn1/decoders");
i.encoders = e("./asn1/encoders");
}, {
"./asn1/api": 2,
"./asn1/base": 4,
"./asn1/constants": 8,
"./asn1/decoders": 10,
"./asn1/encoders": 13,
"bn.js": 15
} ],
2: [ function(e, t, r) {
"use strict";
const i = e("./encoders"), n = e("./decoders"), s = e("inherits");
r.define = function(e, t) {
return new o(e, t);
};
function o(e, t) {
this.name = e;
this.body = t;
this.decoders = {};
this.encoders = {};
}
o.prototype._createNamed = function(e) {
const t = this.name;
function r(e) {
this._initNamed(e, t);
}
s(r, e);
r.prototype._initNamed = function(t, r) {
e.call(this, t, r);
};
return new r(this);
};
o.prototype._getDecoder = function(e) {
e = e || "der";
this.decoders.hasOwnProperty(e) || (this.decoders[e] = this._createNamed(n[e]));
return this.decoders[e];
};
o.prototype.decode = function(e, t, r) {
return this._getDecoder(t).decode(e, r);
};
o.prototype._getEncoder = function(e) {
e = e || "der";
this.encoders.hasOwnProperty(e) || (this.encoders[e] = this._createNamed(i[e]));
return this.encoders[e];
};
o.prototype.encode = function(e, t, r) {
return this._getEncoder(t).encode(e, r);
};
}, {
"./decoders": 10,
"./encoders": 13,
inherits: 138
} ],
3: [ function(e, t, r) {
"use strict";
const i = e("inherits"), n = e("../base/reporter").Reporter, s = e("safer-buffer").Buffer;
function o(e, t) {
n.call(this, t);
if (s.isBuffer(e)) {
this.base = e;
this.offset = 0;
this.length = e.length;
} else this.error("Input not Buffer");
}
i(o, n);
r.DecoderBuffer = o;
o.isDecoderBuffer = function(e) {
return e instanceof o || "object" == typeof e && s.isBuffer(e.base) && "DecoderBuffer" === e.constructor.name && "number" == typeof e.offset && "number" == typeof e.length && "function" == typeof e.save && "function" == typeof e.restore && "function" == typeof e.isEmpty && "function" == typeof e.readUInt8 && "function" == typeof e.skip && "function" == typeof e.raw;
};
o.prototype.save = function() {
return {
offset: this.offset,
reporter: n.prototype.save.call(this)
};
};
o.prototype.restore = function(e) {
const t = new o(this.base);
t.offset = e.offset;
t.length = this.offset;
this.offset = e.offset;
n.prototype.restore.call(this, e.reporter);
return t;
};
o.prototype.isEmpty = function() {
return this.offset === this.length;
};
o.prototype.readUInt8 = function(e) {
return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(e || "DecoderBuffer overrun");
};
o.prototype.skip = function(e, t) {
if (!(this.offset + e <= this.length)) return this.error(t || "DecoderBuffer overrun");
const r = new o(this.base);
r._reporterState = this._reporterState;
r.offset = this.offset;
r.length = this.offset + e;
this.offset += e;
return r;
};
o.prototype.raw = function(e) {
return this.base.slice(e ? e.offset : this.offset, this.length);
};
function a(e, t) {
if (Array.isArray(e)) {
this.length = 0;
this.value = e.map(function(e) {
a.isEncoderBuffer(e) || (e = new a(e, t));
this.length += e.length;
return e;
}, this);
} else if ("number" == typeof e) {
if (!(0 <= e && e <= 255)) return t.error("non-byte EncoderBuffer value");
this.value = e;
this.length = 1;
} else if ("string" == typeof e) {
this.value = e;
this.length = s.byteLength(e);
} else {
if (!s.isBuffer(e)) return t.error("Unsupported type: " + typeof e);
this.value = e;
this.length = e.length;
}
}
r.EncoderBuffer = a;
a.isEncoderBuffer = function(e) {
return e instanceof a || "object" == typeof e && "EncoderBuffer" === e.constructor.name && "number" == typeof e.length && "function" == typeof e.join;
};
a.prototype.join = function(e, t) {
e || (e = s.alloc(this.length));
t || (t = 0);
if (0 === this.length) return e;
if (Array.isArray(this.value)) this.value.forEach(function(r) {
r.join(e, t);
t += r.length;
}); else {
"number" == typeof this.value ? e[t] = this.value : "string" == typeof this.value ? e.write(this.value, t) : s.isBuffer(this.value) && this.value.copy(e, t);
t += this.length;
}
return e;
};
}, {
"../base/reporter": 6,
inherits: 138,
"safer-buffer": 183
} ],
4: [ function(e, t, r) {
"use strict";
const i = r;
i.Reporter = e("./reporter").Reporter;
i.DecoderBuffer = e("./buffer").DecoderBuffer;
i.EncoderBuffer = e("./buffer").EncoderBuffer;
i.Node = e("./node");
}, {
"./buffer": 3,
"./node": 5,
"./reporter": 6
} ],
5: [ function(e, t) {
"use strict";
const r = e("../base/reporter").Reporter, i = e("../base/buffer").EncoderBuffer, n = e("../base/buffer").DecoderBuffer, s = e("minimalistic-assert"), o = [ "seq", "seqof", "set", "setof", "objid", "bool", "gentime", "utctime", "null_", "enum", "int", "objDesc", "bitstr", "bmpstr", "charstr", "genstr", "graphstr", "ia5str", "iso646str", "numstr", "octstr", "printstr", "t61str", "unistr", "utf8str", "videostr" ], a = [ "key", "obj", "use", "optional", "explicit", "implicit", "def", "choice", "any", "contains" ].concat(o);
function f(e, t, r) {
const i = {};
this._baseState = i;
i.name = r;
i.enc = e;
i.parent = t || null;
i.children = null;
i.tag = null;
i.args = null;
i.reverseArgs = null;
i.choice = null;
i.optional = !1;
i.any = !1;
i.obj = !1;
i.use = null;
i.useDecoder = null;
i.key = null;
i.default = null;
i.explicit = null;
i.implicit = null;
i.contains = null;
if (!i.parent) {
i.children = [];
this._wrap();
}
}
t.exports = f;
const c = [ "enc", "parent", "children", "tag", "args", "reverseArgs", "choice", "optional", "any", "obj", "use", "alteredUse", "key", "default", "explicit", "implicit", "contains" ];
f.prototype.clone = function() {
const e = this._baseState, t = {};
c.forEach(function(r) {
t[r] = e[r];
});
const r = new this.constructor(t.parent);
r._baseState = t;
return r;
};
f.prototype._wrap = function() {
const e = this._baseState;
a.forEach(function(t) {
this[t] = function() {
const r = new this.constructor(this);
e.children.push(r);
return r[t].apply(r, arguments);
};
}, this);
};
f.prototype._init = function(e) {
const t = this._baseState;
s(null === t.parent);
e.call(this);
t.children = t.children.filter(function(e) {
return e._baseState.parent === this;
}, this);
s.equal(t.children.length, 1, "Root node can have only one child");
};
f.prototype._useArgs = function(e) {
const t = this._baseState, r = e.filter(function(e) {
return e instanceof this.constructor;
}, this);
e = e.filter(function(e) {
return !(e instanceof this.constructor);
}, this);
if (0 !== r.length) {
s(null === t.children);
t.children = r;
r.forEach(function(e) {
e._baseState.parent = this;
}, this);
}
if (0 !== e.length) {
s(null === t.args);
t.args = e;
t.reverseArgs = e.map(function(e) {
if ("object" != typeof e || e.constructor !== Object) return e;
const t = {};
Object.keys(e).forEach(function(r) {
r == (0 | r) && (r |= 0);
const i = e[r];
t[i] = r;
});
return t;
});
}
};
[ "_peekTag", "_decodeTag", "_use", "_decodeStr", "_decodeObjid", "_decodeTime", "_decodeNull", "_decodeInt", "_decodeBool", "_decodeList", "_encodeComposite", "_encodeStr", "_encodeObjid", "_encodeTime", "_encodeNull", "_encodeInt", "_encodeBool" ].forEach(function(e) {
f.prototype[e] = function() {
const t = this._baseState;
throw new Error(e + " not implemented for encoding: " + t.enc);
};
});
o.forEach(function(e) {
f.prototype[e] = function() {
const t = this._baseState, r = Array.prototype.slice.call(arguments);
s(null === t.tag);
t.tag = e;
this._useArgs(r);
return this;
};
});
f.prototype.use = function(e) {
s(e);
const t = this._baseState;
s(null === t.use);
t.use = e;
return this;
};
f.prototype.optional = function() {
this._baseState.optional = !0;
return this;
};
f.prototype.def = function(e) {
const t = this._baseState;
s(null === t.default);
t.default = e;
t.optional = !0;
return this;
};
f.prototype.explicit = function(e) {
const t = this._baseState;
s(null === t.explicit && null === t.implicit);
t.explicit = e;
return this;
};
f.prototype.implicit = function(e) {
const t = this._baseState;
s(null === t.explicit && null === t.implicit);
t.implicit = e;
return this;
};
f.prototype.obj = function() {
const e = this._baseState, t = Array.prototype.slice.call(arguments);
e.obj = !0;
0 !== t.length && this._useArgs(t);
return this;
};
f.prototype.key = function(e) {
const t = this._baseState;
s(null === t.key);
t.key = e;
return this;
};
f.prototype.any = function() {
this._baseState.any = !0;
return this;
};
f.prototype.choice = function(e) {
const t = this._baseState;
s(null === t.choice);
t.choice = e;
this._useArgs(Object.keys(e).map(function(t) {
return e[t];
}));
return this;
};
f.prototype.contains = function(e) {
const t = this._baseState;
s(null === t.use);
t.contains = e;
return this;
};
f.prototype._decode = function(e, t) {
const r = this._baseState;
if (null === r.parent) return e.wrapResult(r.children[0]._decode(e, t));
let i, s = r.default, o = !0, a = null;
null !== r.key && (a = e.enterKey(r.key));
if (r.optional) {
let i = null;
null !== r.explicit ? i = r.explicit : null !== r.implicit ? i = r.implicit : null !== r.tag && (i = r.tag);
if (null !== i || r.any) {
o = this._peekTag(e, i, r.any);
if (e.isError(o)) return o;
} else {
const i = e.save();
try {
null === r.choice ? this._decodeGeneric(r.tag, e, t) : this._decodeChoice(e, t);
o = !0;
} catch (e) {
o = !1;
}
e.restore(i);
}
}
r.obj && o && (i = e.enterObject());
if (o) {
if (null !== r.explicit) {
const t = this._decodeTag(e, r.explicit);
if (e.isError(t)) return t;
e = t;
}
const i = e.offset;
if (null === r.use && null === r.choice) {
let t;
r.any && (t = e.save());
const i = this._decodeTag(e, null !== r.implicit ? r.implicit : r.tag, r.any);
if (e.isError(i)) return i;
r.any ? s = e.raw(t) : e = i;
}
t && t.track && null !== r.tag && t.track(e.path(), i, e.length, "tagged");
t && t.track && null !== r.tag && t.track(e.path(), e.offset, e.length, "content");
r.any || (s = null === r.choice ? this._decodeGeneric(r.tag, e, t) : this._decodeChoice(e, t));
if (e.isError(s)) return s;
r.any || null !== r.choice || null === r.children || r.children.forEach(function(r) {
r._decode(e, t);
});
if (r.contains && ("octstr" === r.tag || "bitstr" === r.tag)) {
const i = new n(s);
s = this._getUse(r.contains, e._reporterState.obj)._decode(i, t);
}
}
r.obj && o && (s = e.leaveObject(i));
null === r.key || null === s && !0 !== o ? null !== a && e.exitKey(a) : e.leaveKey(a, r.key, s);
return s;
};
f.prototype._decodeGeneric = function(e, t, r) {
const i = this._baseState;
return "seq" === e || "set" === e ? null : "seqof" === e || "setof" === e ? this._decodeList(t, e, i.args[0], r) : /str$/.test(e) ? this._decodeStr(t, e, r) : "objid" === e && i.args ? this._decodeObjid(t, i.args[0], i.args[1], r) : "objid" === e ? this._decodeObjid(t, null, null, r) : "gentime" === e || "utctime" === e ? this._decodeTime(t, e, r) : "null_" === e ? this._decodeNull(t, r) : "bool" === e ? this._decodeBool(t, r) : "objDesc" === e ? this._decodeStr(t, e, r) : "int" === e || "enum" === e ? this._decodeInt(t, i.args && i.args[0], r) : null !== i.use ? this._getUse(i.use, t._reporterState.obj)._decode(t, r) : t.error("unknown tag: " + e);
};
f.prototype._getUse = function(e, t) {
const r = this._baseState;
r.useDecoder = this._use(e, t);
s(null === r.useDecoder._baseState.parent);
r.useDecoder = r.useDecoder._baseState.children[0];
if (r.implicit !== r.useDecoder._baseState.implicit) {
r.useDecoder = r.useDecoder.clone();
r.useDecoder._baseState.implicit = r.implicit;
}
return r.useDecoder;
};
f.prototype._decodeChoice = function(e, t) {
const r = this._baseState;
let i = null, n = !1;
Object.keys(r.choice).some(function(s) {
const o = e.save(), a = r.choice[s];
try {
const r = a._decode(e, t);
if (e.isError(r)) return !1;
i = {
type: s,
value: r
};
n = !0;
} catch (t) {
e.restore(o);
return !1;
}
return !0;
}, this);
return n ? i : e.error("Choice not matched");
};
f.prototype._createEncoderBuffer = function(e) {
return new i(e, this.reporter);
};
f.prototype._encode = function(e, t, r) {
const i = this._baseState;
if (null !== i.default && i.default === e) return;
const n = this._encodeValue(e, t, r);
return void 0 === n || this._skipDefault(n, t, r) ? void 0 : n;
};
f.prototype._encodeValue = function(e, t, i) {
const n = this._baseState;
if (null === n.parent) return n.children[0]._encode(e, t || new r());
let s = null;
this.reporter = t;
if (n.optional && void 0 === e) {
if (null === n.default) return;
e = n.default;
}
let o = null, a = !1;
if (n.any) s = this._createEncoderBuffer(e); else if (n.choice) s = this._encodeChoice(e, t); else if (n.contains) {
o = this._getUse(n.contains, i)._encode(e, t);
a = !0;
} else if (n.children) {
o = n.children.map(function(r) {
if ("null_" === r._baseState.tag) return r._encode(null, t, e);
if (null === r._baseState.key) return t.error("Child should have a key");
const i = t.enterKey(r._baseState.key);
if ("object" != typeof e) return t.error("Child expected, but input is not object");
const n = r._encode(e[r._baseState.key], t, e);
t.leaveKey(i);
return n;
}, this).filter(function(e) {
return e;
});
o = this._createEncoderBuffer(o);
} else if ("seqof" === n.tag || "setof" === n.tag) {
if (!n.args || 1 !== n.args.length) return t.error("Too many args for : " + n.tag);
if (!Array.isArray(e)) return t.error("seqof/setof, but data is not Array");
const r = this.clone();
r._baseState.implicit = null;
o = this._createEncoderBuffer(e.map(function(r) {
const i = this._baseState;
return this._getUse(i.args[0], e)._encode(r, t);
}, r));
} else if (null !== n.use) s = this._getUse(n.use, i)._encode(e, t); else {
o = this._encodePrimitive(n.tag, e);
a = !0;
}
if (!n.any && null === n.choice) {
const e = null !== n.implicit ? n.implicit : n.tag, r = null === n.implicit ? "universal" : "context";
null === e ? null === n.use && t.error("Tag could be omitted only for .use()") : null === n.use && (s = this._encodeComposite(e, a, r, o));
}
null !== n.explicit && (s = this._encodeComposite(n.explicit, !1, "context", s));
return s;
};
f.prototype._encodeChoice = function(e, t) {
const r = this._baseState, i = r.choice[e.type];
i || s(!1, e.type + " not found in " + JSON.stringify(Object.keys(r.choice)));
return i._encode(e.value, t);
};
f.prototype._encodePrimitive = function(e, t) {
const r = this._baseState;
if (/str$/.test(e)) return this._encodeStr(t, e);
if ("objid" === e && r.args) return this._encodeObjid(t, r.reverseArgs[0], r.args[1]);
if ("objid" === e) return this._encodeObjid(t, null, null);
if ("gentime" === e || "utctime" === e) return this._encodeTime(t, e);
if ("null_" === e) return this._encodeNull();
if ("int" === e || "enum" === e) return this._encodeInt(t, r.args && r.reverseArgs[0]);
if ("bool" === e) return this._encodeBool(t);
if ("objDesc" === e) return this._encodeStr(t, e);
throw new Error("Unsupported tag: " + e);
};
f.prototype._isNumstr = function(e) {
return /^[0-9 ]*$/.test(e);
};
f.prototype._isPrintstr = function(e) {
return /^[A-Za-z0-9 '()+,-./:=?]*$/.test(e);
};
}, {
"../base/buffer": 3,
"../base/reporter": 6,
"minimalistic-assert": 142
} ],
6: [ function(e, t, r) {
"use strict";
const i = e("inherits");
function n(e) {
this._reporterState = {
obj: null,
path: [],
options: e || {},
errors: []
};
}
r.Reporter = n;
n.prototype.isError = function(e) {
return e instanceof s;
};
n.prototype.save = function() {
const e = this._reporterState;
return {
obj: e.obj,
pathLen: e.path.length
};
};
n.prototype.restore = function(e) {
const t = this._reporterState;
t.obj = e.obj;
t.path = t.path.slice(0, e.pathLen);
};
n.prototype.enterKey = function(e) {
return this._reporterState.path.push(e);
};
n.prototype.exitKey = function(e) {
const t = this._reporterState;
t.path = t.path.slice(0, e - 1);
};
n.prototype.leaveKey = function(e, t, r) {
const i = this._reporterState;
this.exitKey(e);
null !== i.obj && (i.obj[t] = r);
};
n.prototype.path = function() {
return this._reporterState.path.join("/");
};
n.prototype.enterObject = function() {
const e = this._reporterState, t = e.obj;
e.obj = {};
return t;
};
n.prototype.leaveObject = function(e) {
const t = this._reporterState, r = t.obj;
t.obj = e;
return r;
};
n.prototype.error = function(e) {
let t;
const r = this._reporterState, i = e instanceof s;
t = i ? e : new s(r.path.map(function(e) {
return "[" + JSON.stringify(e) + "]";
}).join(""), e.message || e, e.stack);
if (!r.options.partial) throw t;
i || r.errors.push(t);
return t;
};
n.prototype.wrapResult = function(e) {
const t = this._reporterState;
return t.options.partial ? {
result: this.isError(e) ? null : e,
errors: t.errors
} : e;
};
function s(e, t) {
this.path = e;
this.rethrow(t);
}
i(s, Error);
s.prototype.rethrow = function(e) {
this.message = e + " at: " + (this.path || "(shallow)");
Error.captureStackTrace && Error.captureStackTrace(this, s);
if (!this.stack) try {
throw new Error(this.message);
} catch (e) {
this.stack = e.stack;
}
return this;
};
}, {
inherits: 138
} ],
7: [ function(e, t, r) {
"use strict";
function i(e) {
const t = {};
Object.keys(e).forEach(function(r) {
(0 | r) == r && (r |= 0);
const i = e[r];
t[i] = r;
});
return t;
}
r.tagClass = {
0: "universal",
1: "application",
2: "context",
3: "private"
};
r.tagClassByName = i(r.tagClass);
r.tag = {
0: "end",
1: "bool",
2: "int",
3: "bitstr",
4: "octstr",
5: "null_",
6: "objid",
7: "objDesc",
8: "external",
9: "real",
10: "enum",
11: "embed",
12: "utf8str",
13: "relativeOid",
16: "seq",
17: "set",
18: "numstr",
19: "printstr",
20: "t61str",
21: "videostr",
22: "ia5str",
23: "utctime",
24: "gentime",
25: "graphstr",
26: "iso646str",
27: "genstr",
28: "unistr",
29: "charstr",
30: "bmpstr"
};
r.tagByName = i(r.tag);
}, {} ],
8: [ function(e, t, r) {
"use strict";
const i = r;
i._reverse = function(e) {
const t = {};
Object.keys(e).forEach(function(r) {
(0 | r) == r && (r |= 0);
const i = e[r];
t[i] = r;
});
return t;
};
i.der = e("./der");
}, {
"./der": 7
} ],
9: [ function(e, t) {
"use strict";
const r = e("inherits"), i = e("bn.js"), n = e("../base/buffer").DecoderBuffer, s = e("../base/node"), o = e("../constants/der");
function a(e) {
this.enc = "der";
this.name = e.name;
this.entity = e;
this.tree = new f();
this.tree._init(e.body);
}
t.exports = a;
a.prototype.decode = function(e, t) {
n.isDecoderBuffer(e) || (e = new n(e, t));
return this.tree._decode(e, t);
};
function f(e) {
s.call(this, "der", e);
}
r(f, s);
f.prototype._peekTag = function(e, t, r) {
if (e.isEmpty()) return !1;
const i = e.save(), n = c(e, 'Failed to peek tag: "' + t + '"');
if (e.isError(n)) return n;
e.restore(i);
return n.tag === t || n.tagStr === t || n.tagStr + "of" === t || r;
};
f.prototype._decodeTag = function(e, t, r) {
const i = c(e, 'Failed to decode tag of "' + t + '"');
if (e.isError(i)) return i;
let n = u(e, i.primitive, 'Failed to get length of "' + t + '"');
if (e.isError(n)) return n;
if (!r && i.tag !== t && i.tagStr !== t && i.tagStr + "of" !== t) return e.error('Failed to match tag: "' + t + '"');
if (i.primitive || null !== n) return e.skip(n, 'Failed to match body of: "' + t + '"');
const s = e.save(), o = this._skipUntilEnd(e, 'Failed to skip indefinite length body: "' + this.tag + '"');
if (e.isError(o)) return o;
n = e.offset - s.offset;
e.restore(s);
return e.skip(n, 'Failed to match body of: "' + t + '"');
};
f.prototype._skipUntilEnd = function(e, t) {
for (;;) {
const r = c(e, t);
if (e.isError(r)) return r;
const i = u(e, r.primitive, t);
if (e.isError(i)) return i;
let n;
n = r.primitive || null !== i ? e.skip(i) : this._skipUntilEnd(e, t);
if (e.isError(n)) return n;
if ("end" === r.tagStr) break;
}
};
f.prototype._decodeList = function(e, t, r, i) {
const n = [];
for (;!e.isEmpty(); ) {
const t = this._peekTag(e, "end");
if (e.isError(t)) return t;
const s = r.decode(e, "der", i);
if (e.isError(s) && t) break;
n.push(s);
}
return n;
};
f.prototype._decodeStr = function(e, t) {
if ("bitstr" === t) {
const t = e.readUInt8();
return e.isError(t) ? t : {
unused: t,
data: e.raw()
};
}
if ("bmpstr" === t) {
const t = e.raw();
if (t.length % 2 == 1) return e.error("Decoding of string type: bmpstr length mismatch");
let r = "";
for (let e = 0; e < t.length / 2; e++) r += String.fromCharCode(t.readUInt16BE(2 * e));
return r;
}
if ("numstr" === t) {
const t = e.raw().toString("ascii");
return this._isNumstr(t) ? t : e.error("Decoding of string type: numstr unsupported characters");
}
if ("octstr" === t) return e.raw();
if ("objDesc" === t) return e.raw();
if ("printstr" === t) {
const t = e.raw().toString("ascii");
return this._isPrintstr(t) ? t : e.error("Decoding of string type: printstr unsupported characters");
}
return /str$/.test(t) ? e.raw().toString() : e.error("Decoding of string type: " + t + " unsupported");
};
f.prototype._decodeObjid = function(e, t, r) {
let i;
const n = [];
let s = 0, o = 0;
for (;!e.isEmpty(); ) {
s <<= 7;
s |= 127 & (o = e.readUInt8());
if (0 == (128 & o)) {
n.push(s);
s = 0;
}
}
128 & o && n.push(s);
const a = n[0] / 40 | 0, f = n[0] % 40;
i = r ? n : [ a, f ].concat(n.slice(1));
if (t) {
let e = t[i.join(" ")];
void 0 === e && (e = t[i.join(".")]);
void 0 !== e && (i = e);
}
return i;
};
f.prototype._decodeTime = function(e, t) {
const r = e.raw().toString();
let i, n, s, o, a, f;
if ("gentime" === t) {
i = 0 | r.slice(0, 4);
n = 0 | r.slice(4, 6);
s = 0 | r.slice(6, 8);
o = 0 | r.slice(8, 10);
a = 0 | r.slice(10, 12);
f = 0 | r.slice(12, 14);
} else {
if ("utctime" !== t) return e.error("Decoding " + t + " time is not supported yet");
i = 0 | r.slice(0, 2);
n = 0 | r.slice(2, 4);
s = 0 | r.slice(4, 6);
o = 0 | r.slice(6, 8);
a = 0 | r.slice(8, 10);
f = 0 | r.slice(10, 12);
i = i < 70 ? 2e3 + i : 1900 + i;
}
return Date.UTC(i, n - 1, s, o, a, f, 0);
};
f.prototype._decodeNull = function() {
return null;
};
f.prototype._decodeBool = function(e) {
const t = e.readUInt8();
return e.isError(t) ? t : 0 !== t;
};
f.prototype._decodeInt = function(e, t) {
const r = e.raw();
let n = new i(r);
t && (n = t[n.toString(10)] || n);
return n;
};
f.prototype._use = function(e, t) {
"function" == typeof e && (e = e(t));
return e._getDecoder("der").tree;
};
function c(e, t) {
let r = e.readUInt8(t);
if (e.isError(r)) return r;
const i = o.tagClass[r >> 6], n = 0 == (32 & r);
if (31 == (31 & r)) {
let i = r;
r = 0;
for (;128 == (128 & i); ) {
i = e.readUInt8(t);
if (e.isError(i)) return i;
r <<= 7;
r |= 127 & i;
}
} else r &= 31;
return {
cls: i,
primitive: n,
tag: r,
tagStr: o.tag[r]
};
}
function u(e, t, r) {
let i = e.readUInt8(r);
if (e.isError(i)) return i;
if (!t && 128 === i) return null;
if (0 == (128 & i)) return i;
const n = 127 & i;
if (n > 4) return e.error("length octect is too long");
i = 0;
for (let t = 0; t < n; t++) {
i <<= 8;
const t = e.readUInt8(r);
if (e.isError(t)) return t;
i |= t;
}
return i;
}
}, {
"../base/buffer": 3,
"../base/node": 5,
"../constants/der": 7,
"bn.js": 15,
inherits: 138
} ],
10: [ function(e, t, r) {
"use strict";
const i = r;
i.der = e("./der");
i.pem = e("./pem");
}, {
"./der": 9,
"./pem": 11
} ],
11: [ function(e, t) {
"use strict";
const r = e("inherits"), i = e("safer-buffer").Buffer, n = e("./der");
function s(e) {
n.call(this, e);
this.enc = "pem";
}
r(s, n);
t.exports = s;
s.prototype.decode = function(e, t) {
const r = e.toString().split(/[\r\n]+/g), s = t.label.toUpperCase(), o = /^-----(BEGIN|END) ([^-]+)-----$/;
let a = -1, f = -1;
for (let e = 0; e < r.length; e++) {
const t = r[e].match(o);
if (null !== t && t[2] === s) {
if (-1 !== a) {
if ("END" !== t[1]) break;
f = e;
break;
}
if ("BEGIN" !== t[1]) break;
a = e;
}
}
if (-1 === a || -1 === f) throw new Error("PEM section not found for: " + s);
const c = r.slice(a + 1, f).join("");
c.replace(/[^a-z0-9+/=]+/gi, "");
const u = i.from(c, "base64");
return n.prototype.decode.call(this, u, t);
};
}, {
"./der": 9,
inherits: 138,
"safer-buffer": 183
} ],
12: [ function(e, t) {
"use strict";
const r = e("inherits"), i = e("safer-buffer").Buffer, n = e("../base/node"), s = e("../constants/der");
function o(e) {
this.enc = "der";
this.name = e.name;
this.entity = e;
this.tree = new a();
this.tree._init(e.body);
}
t.exports = o;
o.prototype.encode = function(e, t) {
return this.tree._encode(e, t).join();
};
function a(e) {
n.call(this, "der", e);
}
r(a, n);
a.prototype._encodeComposite = function(e, t, r, n) {
const s = c(e, t, r, this.reporter);
if (n.length < 128) {
const e = i.alloc(2);
e[0] = s;
e[1] = n.length;
return this._createEncoderBuffer([ e, n ]);
}
let o = 1;
for (let e = n.length; e >= 256; e >>= 8) o++;
const a = i.alloc(2 + o);
a[0] = s;
a[1] = 128 | o;
for (let e = 1 + o, t = n.length; t > 0; e--, t >>= 8) a[e] = 255 & t;
return this._createEncoderBuffer([ a, n ]);
};
a.prototype._encodeStr = function(e, t) {
if ("bitstr" === t) return this._createEncoderBuffer([ 0 | e.unused, e.data ]);
if ("bmpstr" === t) {
const t = i.alloc(2 * e.length);
for (let r = 0; r < e.length; r++) t.writeUInt16BE(e.charCodeAt(r), 2 * r);
return this._createEncoderBuffer(t);
}
return "numstr" === t ? this._isNumstr(e) ? this._createEncoderBuffer(e) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : "printstr" === t ? this._isPrintstr(e) ? this._createEncoderBuffer(e) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(t) ? this._createEncoderBuffer(e) : "objDesc" === t ? this._createEncoderBuffer(e) : this.reporter.error("Encoding of string type: " + t + " unsupported");
};
a.prototype._encodeObjid = function(e, t, r) {
if ("string" == typeof e) {
if (!t) return this.reporter.error("string objid given, but no values map found");
if (!t.hasOwnProperty(e)) return this.reporter.error("objid not found in values map");
e = t[e].split(/[\s.]+/g);
for (let t = 0; t < e.length; t++) e[t] |= 0;
} else if (Array.isArray(e)) {
e = e.slice();
for (let t = 0; t < e.length; t++) e[t] |= 0;
}
if (!Array.isArray(e)) return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(e));
if (!r) {
if (e[1] >= 40) return this.reporter.error("Second objid identifier OOB");
e.splice(0, 2, 40 * e[0] + e[1]);
}
let n = 0;
for (let t = 0; t < e.length; t++) {
let r = e[t];
for (n++; r >= 128; r >>= 7) n++;
}
const s = i.alloc(n);
let o = s.length - 1;
for (let t = e.length - 1; t >= 0; t--) {
let r = e[t];
s[o--] = 127 & r;
for (;(r >>= 7) > 0; ) s[o--] = 128 | 127 & r;
}
return this._createEncoderBuffer(s);
};
function f(e) {
return e < 10 ? "0" + e : e;
}
a.prototype._encodeTime = function(e, t) {
let r;
const i = new Date(e);
"gentime" === t ? r = [ f(i.getUTCFullYear()), f(i.getUTCMonth() + 1), f(i.getUTCDate()), f(i.getUTCHours()), f(i.getUTCMinutes()), f(i.getUTCSeconds()), "Z" ].join("") : "utctime" === t ? r = [ f(i.getUTCFullYear() % 100), f(i.getUTCMonth() + 1), f(i.getUTCDate()), f(i.getUTCHours()), f(i.getUTCMinutes()), f(i.getUTCSeconds()), "Z" ].join("") : this.reporter.error("Encoding " + t + " time is not supported yet");
return this._encodeStr(r, "octstr");
};
a.prototype._encodeNull = function() {
return this._createEncoderBuffer("");
};
a.prototype._encodeInt = function(e, t) {
if ("string" == typeof e) {
if (!t) return this.reporter.error("String int or enum given, but no values map");
if (!t.hasOwnProperty(e)) return this.reporter.error("Values map doesn't contain: " + JSON.stringify(e));
e = t[e];
}
if ("number" != typeof e && !i.isBuffer(e)) {
const t = e.toArray();
!e.sign && 128 & t[0] && t.unshift(0);
e = i.from(t);
}
if (i.isBuffer(e)) {
let t = e.length;
0 === e.length && t++;
const r = i.alloc(t);
e.copy(r);
0 === e.length && (r[0] = 0);
return this._createEncoderBuffer(r);
}
if (e < 128) return this._createEncoderBuffer(e);
if (e < 256) return this._createEncoderBuffer([ 0, e ]);
let r = 1;
for (let t = e; t >= 256; t >>= 8) r++;
const n = new Array(r);
for (let t = n.length - 1; t >= 0; t--) {
n[t] = 255 & e;
e >>= 8;
}
128 & n[0] && n.unshift(0);
return this._createEncoderBuffer(i.from(n));
};
a.prototype._encodeBool = function(e) {
return this._createEncoderBuffer(e ? 255 : 0);
};
a.prototype._use = function(e, t) {
"function" == typeof e && (e = e(t));
return e._getEncoder("der").tree;
};
a.prototype._skipDefault = function(e, t, r) {
const i = this._baseState;
let n;
if (null === i.default) return !1;
const s = e.join();
void 0 === i.defaultBuffer && (i.defaultBuffer = this._encodeValue(i.default, t, r).join());
if (s.length !== i.defaultBuffer.length) return !1;
for (n = 0; n < s.length; n++) if (s[n] !== i.defaultBuffer[n]) return !1;
return !0;
};
function c(e, t, r, i) {
let n;
"seqof" === e ? e = "seq" : "setof" === e && (e = "set");
if (s.tagByName.hasOwnProperty(e)) n = s.tagByName[e]; else {
if ("number" != typeof e || (0 | e) !== e) return i.error("Unknown tag: " + e);
n = e;
}
if (n >= 31) return i.error("Multi-octet tag encoding unsupported");
t || (n |= 32);
return n | s.tagClassByName[r || "universal"] << 6;
}
}, {
"../base/node": 5,
"../constants/der": 7,
inherits: 138,
"safer-buffer": 183
} ],
13: [ function(e, t, r) {
"use strict";
const i = r;
i.der = e("./der");
i.pem = e("./pem");
}, {
"./der": 12,
"./pem": 14
} ],
14: [ function(e, t) {
"use strict";
const r = e("inherits"), i = e("./der");
function n(e) {
i.call(this, e);
this.enc = "pem";
}
r(n, i);
t.exports = n;
n.prototype.encode = function(e, t) {
const r = i.prototype.encode.call(this, e).toString("base64"), n = [ "-----BEGIN " + t.label + "-----" ];
for (let e = 0; e < r.length; e += 64) n.push(r.slice(e, e + 64));
n.push("-----END " + t.label + "-----");
return n.join("\n");
};
}, {
"./der": 12,
inherits: 138
} ],
15: [ function(e, t) {
(function(t, r) {
"use strict";
function i(e, t) {
if (!e) throw new Error(t || "Assertion failed");
}
function n(e, t) {
e.super_ = t;
var r = function() {};
r.prototype = t.prototype;
e.prototype = new r();
e.prototype.constructor = e;
}
function s(e, t, r) {
if (s.isBN(e)) return e;
this.negative = 0;
this.words = null;
this.length = 0;
this.red = null;
if (null !== e) {
if ("le" === t || "be" === t) {
r = t;
t = 10;
}
this._init(e || 0, t || 10, r || "be");
}
}
"object" == typeof t ? t.exports = s : r.BN = s;
s.BN = s;
s.wordSize = 26;
var o;
try {
o = "undefined" != typeof window && "undefined" != typeof window.Buffer ? window.Buffer : e("buffer").Buffer;
} catch (e) {}
s.isBN = function(e) {
return e instanceof s || null !== e && "object" == typeof e && e.constructor.wordSize === s.wordSize && Array.isArray(e.words);
};
s.max = function(e, t) {
return e.cmp(t) > 0 ? e : t;
};
s.min = function(e, t) {
return e.cmp(t) < 0 ? e : t;
};
s.prototype._init = function(e, t, r) {
if ("number" == typeof e) return this._initNumber(e, t, r);
if ("object" == typeof e) return this._initArray(e, t, r);
"hex" === t && (t = 16);
i(t === (0 | t) && t >= 2 && t <= 36);
var n = 0;
if ("-" === (e = e.toString().replace(/\s+/g, ""))[0]) {
n++;
this.negative = 1;
}
if (n < e.length) if (16 === t) this._parseHex(e, n, r); else {
this._parseBase(e, t, n);
"le" === r && this._initArray(this.toArray(), t, r);
}
};
s.prototype._initNumber = function(e, t, r) {
if (e < 0) {
this.negative = 1;
e = -e;
}
if (e < 67108864) {
this.words = [ 67108863 & e ];
this.length = 1;
} else if (e < 4503599627370496) {
this.words = [ 67108863 & e, e / 67108864 & 67108863 ];
this.length = 2;
} else {
i(e < 9007199254740992);
this.words = [ 67108863 & e, e / 67108864 & 67108863, 1 ];
this.length = 3;
}
"le" === r && this._initArray(this.toArray(), t, r);
};
s.prototype._initArray = function(e, t, r) {
i("number" == typeof e.length);
if (e.length <= 0) {
this.words = [ 0 ];
this.length = 1;
return this;
}
this.length = Math.ceil(e.length / 3);
this.words = new Array(this.length);
for (var n = 0; n < this.length; n++) this.words[n] = 0;
var s, o, a = 0;
if ("be" === r) for (n = e.length - 1, s = 0; n >= 0; n -= 3) {
o = e[n] | e[n - 1] << 8 | e[n - 2] << 16;
this.words[s] |= o << a & 67108863;
this.words[s + 1] = o >>> 26 - a & 67108863;
if ((a += 24) >= 26) {
a -= 26;
s++;
}
} else if ("le" === r) for (n = 0, s = 0; n < e.length; n += 3) {
o = e[n] | e[n + 1] << 8 | e[n + 2] << 16;
this.words[s] |= o << a & 67108863;
this.words[s + 1] = o >>> 26 - a & 67108863;
if ((a += 24) >= 26) {
a -= 26;
s++;
}
}
return this.strip();
};
function a(e, t) {
var r = e.charCodeAt(t);
return r >= 65 && r <= 70 ? r - 55 : r >= 97 && r <= 102 ? r - 87 : r - 48 & 15;
}
function f(e, t, r) {
var i = a(e, r);
r - 1 >= t && (i |= a(e, r - 1) << 4);
return i;
}
s.prototype._parseHex = function(e, t, r) {
this.length = Math.ceil((e.length - t) / 6);
this.words = new Array(this.length);
for (var i = 0; i < this.length; i++) this.words[i] = 0;
var n, s = 0, o = 0;
if ("be" === r) for (i = e.length - 1; i >= t; i -= 2) {
n = f(e, t, i) << s;
this.words[o] |= 67108863 & n;
if (s >= 18) {
s -= 18;
o += 1;
this.words[o] |= n >>> 26;
} else s += 8;
} else for (i = (e.length - t) % 2 == 0 ? t + 1 : t; i < e.length; i += 2) {
n = f(e, t, i) << s;
this.words[o] |= 67108863 & n;
if (s >= 18) {
s -= 18;
o += 1;
this.words[o] |= n >>> 26;
} else s += 8;
}
this.strip();
};
function c(e, t, r, i) {
for (var n = 0, s = Math.min(e.length, r), o = t; o < s; o++) {
var a = e.charCodeAt(o) - 48;
n *= i;
n += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a;
}
return n;
}
s.prototype._parseBase = function(e, t, r) {
this.words = [ 0 ];
this.length = 1;
for (var i = 0, n = 1; n <= 67108863; n *= t) i++;
i--;
n = n / t | 0;
for (var s = e.length - r, o = s % i, a = Math.min(s, s - o) + r, f = 0, u = r; u < a; u += i) {
f = c(e, u, u + i, t);
this.imuln(n);
this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
}
if (0 !== o) {
var h = 1;
f = c(e, u, e.length, t);
for (u = 0; u < o; u++) h *= t;
this.imuln(h);
this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
}
this.strip();
};
s.prototype.copy = function(e) {
e.words = new Array(this.length);
for (var t = 0; t < this.length; t++) e.words[t] = this.words[t];
e.length = this.length;
e.negative = this.negative;
e.red = this.red;
};
s.prototype.clone = function() {
var e = new s(null);
this.copy(e);
return e;
};
s.prototype._expand = function(e) {
for (;this.length < e; ) this.words[this.length++] = 0;
return this;
};
s.prototype.strip = function() {
for (;this.length > 1 && 0 === this.words[this.length - 1]; ) this.length--;
return this._normSign();
};
s.prototype._normSign = function() {
1 === this.length && 0 === this.words[0] && (this.negative = 0);
return this;
};
s.prototype.inspect = function() {
return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
};
var u = [ "", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000" ], h = [ 0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ], d = [ 0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176 ];
s.prototype.toString = function(e, t) {
t = 0 | t || 1;
var r;
if (16 === (e = e || 10) || "hex" === e) {
r = "";
for (var n = 0, s = 0, o = 0; o < this.length; o++) {
var a = this.words[o], f = (16777215 & (a << n | s)).toString(16);
r = 0 != (s = a >>> 24 - n & 16777215) || o !== this.length - 1 ? u[6 - f.length] + f + r : f + r;
if ((n += 2) >= 26) {
n -= 26;
o--;
}
}
0 !== s && (r = s.toString(16) + r);
for (;r.length % t != 0; ) r = "0" + r;
0 !== this.negative && (r = "-" + r);
return r;
}
if (e === (0 | e) && e >= 2 && e <= 36) {
var c = h[e], l = d[e];
r = "";
var p = this.clone();
p.negative = 0;
for (;!p.isZero(); ) {
var b = p.modn(l).toString(e);
r = (p = p.idivn(l)).isZero() ? b + r : u[c - b.length] + b + r;
}
this.isZero() && (r = "0" + r);
for (;r.length % t != 0; ) r = "0" + r;
0 !== this.negative && (r = "-" + r);
return r;
}
i(!1, "Base should be between 2 and 36");
};
s.prototype.toNumber = function() {
var e = this.words[0];
2 === this.length ? e += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? e += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && i(!1, "Number can only safely store up to 53 bits");
return 0 !== this.negative ? -e : e;
};
s.prototype.toJSON = function() {
return this.toString(16);
};
s.prototype.toBuffer = function(e, t) {
i("undefined" != typeof o);
return this.toArrayLike(o, e, t);
};
s.prototype.toArray = function(e, t) {
return this.toArrayLike(Array, e, t);
};
s.prototype.toArrayLike = function(e, t, r) {
var n = this.byteLength(), s = r || Math.max(1, n);
i(n <= s, "byte array longer than desired length");
i(s > 0, "Requested array length <= 0");
this.strip();
var o, a, f = "le" === t, c = new e(s), u = this.clone();
if (f) {
for (a = 0; !u.isZero(); a++) {
o = u.andln(255);
u.iushrn(8);
c[a] = o;
}
for (;a < s; a++) c[a] = 0;
} else {
for (a = 0; a < s - n; a++) c[a] = 0;
for (a = 0; !u.isZero(); a++) {
o = u.andln(255);
u.iushrn(8);
c[s - a - 1] = o;
}
}
return c;
};
Math.clz32 ? s.prototype._countBits = function(e) {
return 32 - Math.clz32(e);
} : s.prototype._countBits = function(e) {
var t = e, r = 0;
if (t >= 4096) {
r += 13;
t >>>= 13;
}
if (t >= 64) {
r += 7;
t >>>= 7;
}
if (t >= 8) {
r += 4;
t >>>= 4;
}
if (t >= 2) {
r += 2;
t >>>= 2;
}
return r + t;
};
s.prototype._zeroBits = function(e) {
if (0 === e) return 26;
var t = e, r = 0;
if (0 == (8191 & t)) {
r += 13;
t >>>= 13;
}
if (0 == (127 & t)) {
r += 7;
t >>>= 7;
}
if (0 == (15 & t)) {
r += 4;
t >>>= 4;
}
if (0 == (3 & t)) {
r += 2;
t >>>= 2;
}
0 == (1 & t) && r++;
return r;
};
s.prototype.bitLength = function() {
var e = this.words[this.length - 1], t = this._countBits(e);
return 26 * (this.length - 1) + t;
};
function l(e) {
for (var t = new Array(e.bitLength()), r = 0; r < t.length; r++) {
var i = r / 26 | 0, n = r % 26;
t[r] = (e.words[i] & 1 << n) >>> n;
}
return t;
}
s.prototype.zeroBits = function() {
if (this.isZero()) return 0;
for (var e = 0, t = 0; t < this.length; t++) {
var r = this._zeroBits(this.words[t]);
e += r;
if (26 !== r) break;
}
return e;
};
s.prototype.byteLength = function() {
return Math.ceil(this.bitLength() / 8);
};
s.prototype.toTwos = function(e) {
return 0 !== this.negative ? this.abs().inotn(e).iaddn(1) : this.clone();
};
s.prototype.fromTwos = function(e) {
return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
};
s.prototype.isNeg = function() {
return 0 !== this.negative;
};
s.prototype.neg = function() {
return this.clone().ineg();
};
s.prototype.ineg = function() {
this.isZero() || (this.negative ^= 1);
return this;
};
s.prototype.iuor = function(e) {
for (;this.length < e.length; ) this.words[this.length++] = 0;
for (var t = 0; t < e.length; t++) this.words[t] = this.words[t] | e.words[t];
return this.strip();
};
s.prototype.ior = function(e) {
i(0 == (this.negative | e.negative));
return this.iuor(e);
};
s.prototype.or = function(e) {
return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this);
};
s.prototype.uor = function(e) {
return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this);
};
s.prototype.iuand = function(e) {
var t;
t = this.length > e.length ? e : this;
for (var r = 0; r < t.length; r++) this.words[r] = this.words[r] & e.words[r];
this.length = t.length;
return this.strip();
};
s.prototype.iand = function(e) {
i(0 == (this.negative | e.negative));
return this.iuand(e);
};
s.prototype.and = function(e) {
return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this);
};
s.prototype.uand = function(e) {
return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this);
};
s.prototype.iuxor = function(e) {
var t, r;
if (this.length > e.length) {
t = this;
r = e;
} else {
t = e;
r = this;
}
for (var i = 0; i < r.length; i++) this.words[i] = t.words[i] ^ r.words[i];
if (this !== t) for (;i < t.length; i++) this.words[i] = t.words[i];
this.length = t.length;
return this.strip();
};
s.prototype.ixor = function(e) {
i(0 == (this.negative | e.negative));
return this.iuxor(e);
};
s.prototype.xor = function(e) {
return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this);
};
s.prototype.uxor = function(e) {
return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this);
};
s.prototype.inotn = function(e) {
i("number" == typeof e && e >= 0);
var t = 0 | Math.ceil(e / 26), r = e % 26;
this._expand(t);
r > 0 && t--;
for (var n = 0; n < t; n++) this.words[n] = 67108863 & ~this.words[n];
r > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - r);
return this.strip();
};
s.prototype.notn = function(e) {
return this.clone().inotn(e);
};
s.prototype.setn = function(e, t) {
i("number" == typeof e && e >= 0);
var r = e / 26 | 0, n = e % 26;
this._expand(r + 1);
this.words[r] = t ? this.words[r] | 1 << n : this.words[r] & ~(1 << n);
return this.strip();
};
s.prototype.iadd = function(e) {
var t, r, i;
if (0 !== this.negative && 0 === e.negative) {
this.negative = 0;
t = this.isub(e);
this.negative ^= 1;
return this._normSign();
}
if (0 === this.negative && 0 !== e.negative) {
e.negative = 0;
t = this.isub(e);
e.negative = 1;
return t._normSign();
}
if (this.length > e.length) {
r = this;
i = e;
} else {
r = e;
i = this;
}
for (var n = 0, s = 0; s < i.length; s++) {
t = (0 | r.words[s]) + (0 | i.words[s]) + n;
this.words[s] = 67108863 & t;
n = t >>> 26;
}
for (;0 !== n && s < r.length; s++) {
t = (0 | r.words[s]) + n;
this.words[s] = 67108863 & t;
n = t >>> 26;
}
this.length = r.length;
if (0 !== n) {
this.words[this.length] = n;
this.length++;
} else if (r !== this) for (;s < r.length; s++) this.words[s] = r.words[s];
return this;
};
s.prototype.add = function(e) {
var t;
if (0 !== e.negative && 0 === this.negative) {
e.negative = 0;
t = this.sub(e);
e.negative ^= 1;
return t;
}
if (0 === e.negative && 0 !== this.negative) {
this.negative = 0;
t = e.sub(this);
this.negative = 1;
return t;
}
return this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this);
};
s.prototype.isub = function(e) {
if (0 !== e.negative) {
e.negative = 0;
var t = this.iadd(e);
e.negative = 1;
return t._normSign();
}
if (0 !== this.negative) {
this.negative = 0;
this.iadd(e);
this.negative = 1;
return this._normSign();
}
var r, i, n = this.cmp(e);
if (0 === n) {
this.negative = 0;
this.length = 1;
this.words[0] = 0;
return this;
}
if (n > 0) {
r = this;
i = e;
} else {
r = e;
i = this;
}
for (var s = 0, o = 0; o < i.length; o++) {
s = (t = (0 | r.words[o]) - (0 | i.words[o]) + s) >> 26;
this.words[o] = 67108863 & t;
}
for (;0 !== s && o < r.length; o++) {
s = (t = (0 | r.words[o]) + s) >> 26;
this.words[o] = 67108863 & t;
}
if (0 === s && o < r.length && r !== this) for (;o < r.length; o++) this.words[o] = r.words[o];
this.length = Math.max(this.length, o);
r !== this && (this.negative = 1);
return this.strip();
};
s.prototype.sub = function(e) {
return this.clone().isub(e);
};
function p(e, t, r) {
r.negative = t.negative ^ e.negative;
var i = e.length + t.length | 0;
r.length = i;
i = i - 1 | 0;
var n = 0 | e.words[0], s = 0 | t.words[0], o = n * s, a = 67108863 & o, f = o / 67108864 | 0;
r.words[0] = a;
for (var c = 1; c < i; c++) {
for (var u = f >>> 26, h = 67108863 & f, d = Math.min(c, t.length - 1), l = Math.max(0, c - e.length + 1); l <= d; l++) {
var p = c - l | 0;
u += (o = (n = 0 | e.words[p]) * (s = 0 | t.words[l]) + h) / 67108864 | 0;
h = 67108863 & o;
}
r.words[c] = 0 | h;
f = 0 | u;
}
0 !== f ? r.words[c] = 0 | f : r.length--;
return r.strip();
}
var b = function(e, t, r) {
var i, n, s, o = e.words, a = t.words, f = r.words, c = 0, u = 0 | o[0], h = 8191 & u, d = u >>> 13, l = 0 | o[1], p = 8191 & l, b = l >>> 13, m = 0 | o[2], g = 8191 & m, y = m >>> 13, v = 0 | o[3], w = 8191 & v, _ = v >>> 13, S = 0 | o[4], E = 8191 & S, M = S >>> 13, A = 0 | o[5], k = 8191 & A, R = A >>> 13, x = 0 | o[6], I = 8191 & x, T = x >>> 13, B = 0 | o[7], j = 8191 & B, N = B >>> 13, P = 0 | o[8], C = 8191 & P, L = P >>> 13, O = 0 | o[9], D = 8191 & O, U = O >>> 13, q = 0 | a[0], F = 8191 & q, z = q >>> 13, $ = 0 | a[1], K = 8191 & $, H = $ >>> 13, W = 0 | a[2], V = 8191 & W, G = W >>> 13, X = 0 | a[3], Y = 8191 & X, J = X >>> 13, Z = 0 | a[4], Q = 8191 & Z, ee = Z >>> 13, te = 0 | a[5], re = 8191 & te, ie = te >>> 13, ne = 0 | a[6], se = 8191 & ne, oe = ne >>> 13, ae = 0 | a[7], fe = 8191 & ae, ce = ae >>> 13, ue = 0 | a[8], he = 8191 & ue, de = ue >>> 13, le = 0 | a[9], pe = 8191 & le, be = le >>> 13;
r.negative = e.negative ^ t.negative;
r.length = 19;
var me = (c + (i = Math.imul(h, F)) | 0) + ((8191 & (n = (n = Math.imul(h, z)) + Math.imul(d, F) | 0)) << 13) | 0;
c = ((s = Math.imul(d, z)) + (n >>> 13) | 0) + (me >>> 26) | 0;
me &= 67108863;
i = Math.imul(p, F);
n = (n = Math.imul(p, z)) + Math.imul(b, F) | 0;
s = Math.imul(b, z);
var ge = (c + (i = i + Math.imul(h, K) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, H) | 0) + Math.imul(d, K) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, H) | 0) + (n >>> 13) | 0) + (ge >>> 26) | 0;
ge &= 67108863;
i = Math.imul(g, F);
n = (n = Math.imul(g, z)) + Math.imul(y, F) | 0;
s = Math.imul(y, z);
i = i + Math.imul(p, K) | 0;
n = (n = n + Math.imul(p, H) | 0) + Math.imul(b, K) | 0;
s = s + Math.imul(b, H) | 0;
var ye = (c + (i = i + Math.imul(h, V) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, G) | 0) + Math.imul(d, V) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, G) | 0) + (n >>> 13) | 0) + (ye >>> 26) | 0;
ye &= 67108863;
i = Math.imul(w, F);
n = (n = Math.imul(w, z)) + Math.imul(_, F) | 0;
s = Math.imul(_, z);
i = i + Math.imul(g, K) | 0;
n = (n = n + Math.imul(g, H) | 0) + Math.imul(y, K) | 0;
s = s + Math.imul(y, H) | 0;
i = i + Math.imul(p, V) | 0;
n = (n = n + Math.imul(p, G) | 0) + Math.imul(b, V) | 0;
s = s + Math.imul(b, G) | 0;
var ve = (c + (i = i + Math.imul(h, Y) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, J) | 0) + Math.imul(d, Y) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, J) | 0) + (n >>> 13) | 0) + (ve >>> 26) | 0;
ve &= 67108863;
i = Math.imul(E, F);
n = (n = Math.imul(E, z)) + Math.imul(M, F) | 0;
s = Math.imul(M, z);
i = i + Math.imul(w, K) | 0;
n = (n = n + Math.imul(w, H) | 0) + Math.imul(_, K) | 0;
s = s + Math.imul(_, H) | 0;
i = i + Math.imul(g, V) | 0;
n = (n = n + Math.imul(g, G) | 0) + Math.imul(y, V) | 0;
s = s + Math.imul(y, G) | 0;
i = i + Math.imul(p, Y) | 0;
n = (n = n + Math.imul(p, J) | 0) + Math.imul(b, Y) | 0;
s = s + Math.imul(b, J) | 0;
var we = (c + (i = i + Math.imul(h, Q) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ee) | 0) + Math.imul(d, Q) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, ee) | 0) + (n >>> 13) | 0) + (we >>> 26) | 0;
we &= 67108863;
i = Math.imul(k, F);
n = (n = Math.imul(k, z)) + Math.imul(R, F) | 0;
s = Math.imul(R, z);
i = i + Math.imul(E, K) | 0;
n = (n = n + Math.imul(E, H) | 0) + Math.imul(M, K) | 0;
s = s + Math.imul(M, H) | 0;
i = i + Math.imul(w, V) | 0;
n = (n = n + Math.imul(w, G) | 0) + Math.imul(_, V) | 0;
s = s + Math.imul(_, G) | 0;
i = i + Math.imul(g, Y) | 0;
n = (n = n + Math.imul(g, J) | 0) + Math.imul(y, Y) | 0;
s = s + Math.imul(y, J) | 0;
i = i + Math.imul(p, Q) | 0;
n = (n = n + Math.imul(p, ee) | 0) + Math.imul(b, Q) | 0;
s = s + Math.imul(b, ee) | 0;
var _e = (c + (i = i + Math.imul(h, re) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ie) | 0) + Math.imul(d, re) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, ie) | 0) + (n >>> 13) | 0) + (_e >>> 26) | 0;
_e &= 67108863;
i = Math.imul(I, F);
n = (n = Math.imul(I, z)) + Math.imul(T, F) | 0;
s = Math.imul(T, z);
i = i + Math.imul(k, K) | 0;
n = (n = n + Math.imul(k, H) | 0) + Math.imul(R, K) | 0;
s = s + Math.imul(R, H) | 0;
i = i + Math.imul(E, V) | 0;
n = (n = n + Math.imul(E, G) | 0) + Math.imul(M, V) | 0;
s = s + Math.imul(M, G) | 0;
i = i + Math.imul(w, Y) | 0;
n = (n = n + Math.imul(w, J) | 0) + Math.imul(_, Y) | 0;
s = s + Math.imul(_, J) | 0;
i = i + Math.imul(g, Q) | 0;
n = (n = n + Math.imul(g, ee) | 0) + Math.imul(y, Q) | 0;
s = s + Math.imul(y, ee) | 0;
i = i + Math.imul(p, re) | 0;
n = (n = n + Math.imul(p, ie) | 0) + Math.imul(b, re) | 0;
s = s + Math.imul(b, ie) | 0;
var Se = (c + (i = i + Math.imul(h, se) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, oe) | 0) + Math.imul(d, se) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, oe) | 0) + (n >>> 13) | 0) + (Se >>> 26) | 0;
Se &= 67108863;
i = Math.imul(j, F);
n = (n = Math.imul(j, z)) + Math.imul(N, F) | 0;
s = Math.imul(N, z);
i = i + Math.imul(I, K) | 0;
n = (n = n + Math.imul(I, H) | 0) + Math.imul(T, K) | 0;
s = s + Math.imul(T, H) | 0;
i = i + Math.imul(k, V) | 0;
n = (n = n + Math.imul(k, G) | 0) + Math.imul(R, V) | 0;
s = s + Math.imul(R, G) | 0;
i = i + Math.imul(E, Y) | 0;
n = (n = n + Math.imul(E, J) | 0) + Math.imul(M, Y) | 0;
s = s + Math.imul(M, J) | 0;
i = i + Math.imul(w, Q) | 0;
n = (n = n + Math.imul(w, ee) | 0) + Math.imul(_, Q) | 0;
s = s + Math.imul(_, ee) | 0;
i = i + Math.imul(g, re) | 0;
n = (n = n + Math.imul(g, ie) | 0) + Math.imul(y, re) | 0;
s = s + Math.imul(y, ie) | 0;
i = i + Math.imul(p, se) | 0;
n = (n = n + Math.imul(p, oe) | 0) + Math.imul(b, se) | 0;
s = s + Math.imul(b, oe) | 0;
var Ee = (c + (i = i + Math.imul(h, fe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ce) | 0) + Math.imul(d, fe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, ce) | 0) + (n >>> 13) | 0) + (Ee >>> 26) | 0;
Ee &= 67108863;
i = Math.imul(C, F);
n = (n = Math.imul(C, z)) + Math.imul(L, F) | 0;
s = Math.imul(L, z);
i = i + Math.imul(j, K) | 0;
n = (n = n + Math.imul(j, H) | 0) + Math.imul(N, K) | 0;
s = s + Math.imul(N, H) | 0;
i = i + Math.imul(I, V) | 0;
n = (n = n + Math.imul(I, G) | 0) + Math.imul(T, V) | 0;
s = s + Math.imul(T, G) | 0;
i = i + Math.imul(k, Y) | 0;
n = (n = n + Math.imul(k, J) | 0) + Math.imul(R, Y) | 0;
s = s + Math.imul(R, J) | 0;
i = i + Math.imul(E, Q) | 0;
n = (n = n + Math.imul(E, ee) | 0) + Math.imul(M, Q) | 0;
s = s + Math.imul(M, ee) | 0;
i = i + Math.imul(w, re) | 0;
n = (n = n + Math.imul(w, ie) | 0) + Math.imul(_, re) | 0;
s = s + Math.imul(_, ie) | 0;
i = i + Math.imul(g, se) | 0;
n = (n = n + Math.imul(g, oe) | 0) + Math.imul(y, se) | 0;
s = s + Math.imul(y, oe) | 0;
i = i + Math.imul(p, fe) | 0;
n = (n = n + Math.imul(p, ce) | 0) + Math.imul(b, fe) | 0;
s = s + Math.imul(b, ce) | 0;
var Me = (c + (i = i + Math.imul(h, he) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, de) | 0) + Math.imul(d, he) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, de) | 0) + (n >>> 13) | 0) + (Me >>> 26) | 0;
Me &= 67108863;
i = Math.imul(D, F);
n = (n = Math.imul(D, z)) + Math.imul(U, F) | 0;
s = Math.imul(U, z);
i = i + Math.imul(C, K) | 0;
n = (n = n + Math.imul(C, H) | 0) + Math.imul(L, K) | 0;
s = s + Math.imul(L, H) | 0;
i = i + Math.imul(j, V) | 0;
n = (n = n + Math.imul(j, G) | 0) + Math.imul(N, V) | 0;
s = s + Math.imul(N, G) | 0;
i = i + Math.imul(I, Y) | 0;
n = (n = n + Math.imul(I, J) | 0) + Math.imul(T, Y) | 0;
s = s + Math.imul(T, J) | 0;
i = i + Math.imul(k, Q) | 0;
n = (n = n + Math.imul(k, ee) | 0) + Math.imul(R, Q) | 0;
s = s + Math.imul(R, ee) | 0;
i = i + Math.imul(E, re) | 0;
n = (n = n + Math.imul(E, ie) | 0) + Math.imul(M, re) | 0;
s = s + Math.imul(M, ie) | 0;
i = i + Math.imul(w, se) | 0;
n = (n = n + Math.imul(w, oe) | 0) + Math.imul(_, se) | 0;
s = s + Math.imul(_, oe) | 0;
i = i + Math.imul(g, fe) | 0;
n = (n = n + Math.imul(g, ce) | 0) + Math.imul(y, fe) | 0;
s = s + Math.imul(y, ce) | 0;
i = i + Math.imul(p, he) | 0;
n = (n = n + Math.imul(p, de) | 0) + Math.imul(b, he) | 0;
s = s + Math.imul(b, de) | 0;
var Ae = (c + (i = i + Math.imul(h, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, be) | 0) + Math.imul(d, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, be) | 0) + (n >>> 13) | 0) + (Ae >>> 26) | 0;
Ae &= 67108863;
i = Math.imul(D, K);
n = (n = Math.imul(D, H)) + Math.imul(U, K) | 0;
s = Math.imul(U, H);
i = i + Math.imul(C, V) | 0;
n = (n = n + Math.imul(C, G) | 0) + Math.imul(L, V) | 0;
s = s + Math.imul(L, G) | 0;
i = i + Math.imul(j, Y) | 0;
n = (n = n + Math.imul(j, J) | 0) + Math.imul(N, Y) | 0;
s = s + Math.imul(N, J) | 0;
i = i + Math.imul(I, Q) | 0;
n = (n = n + Math.imul(I, ee) | 0) + Math.imul(T, Q) | 0;
s = s + Math.imul(T, ee) | 0;
i = i + Math.imul(k, re) | 0;
n = (n = n + Math.imul(k, ie) | 0) + Math.imul(R, re) | 0;
s = s + Math.imul(R, ie) | 0;
i = i + Math.imul(E, se) | 0;
n = (n = n + Math.imul(E, oe) | 0) + Math.imul(M, se) | 0;
s = s + Math.imul(M, oe) | 0;
i = i + Math.imul(w, fe) | 0;
n = (n = n + Math.imul(w, ce) | 0) + Math.imul(_, fe) | 0;
s = s + Math.imul(_, ce) | 0;
i = i + Math.imul(g, he) | 0;
n = (n = n + Math.imul(g, de) | 0) + Math.imul(y, he) | 0;
s = s + Math.imul(y, de) | 0;
var ke = (c + (i = i + Math.imul(p, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, be) | 0) + Math.imul(b, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(b, be) | 0) + (n >>> 13) | 0) + (ke >>> 26) | 0;
ke &= 67108863;
i = Math.imul(D, V);
n = (n = Math.imul(D, G)) + Math.imul(U, V) | 0;
s = Math.imul(U, G);
i = i + Math.imul(C, Y) | 0;
n = (n = n + Math.imul(C, J) | 0) + Math.imul(L, Y) | 0;
s = s + Math.imul(L, J) | 0;
i = i + Math.imul(j, Q) | 0;
n = (n = n + Math.imul(j, ee) | 0) + Math.imul(N, Q) | 0;
s = s + Math.imul(N, ee) | 0;
i = i + Math.imul(I, re) | 0;
n = (n = n + Math.imul(I, ie) | 0) + Math.imul(T, re) | 0;
s = s + Math.imul(T, ie) | 0;
i = i + Math.imul(k, se) | 0;
n = (n = n + Math.imul(k, oe) | 0) + Math.imul(R, se) | 0;
s = s + Math.imul(R, oe) | 0;
i = i + Math.imul(E, fe) | 0;
n = (n = n + Math.imul(E, ce) | 0) + Math.imul(M, fe) | 0;
s = s + Math.imul(M, ce) | 0;
i = i + Math.imul(w, he) | 0;
n = (n = n + Math.imul(w, de) | 0) + Math.imul(_, he) | 0;
s = s + Math.imul(_, de) | 0;
var Re = (c + (i = i + Math.imul(g, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(g, be) | 0) + Math.imul(y, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(y, be) | 0) + (n >>> 13) | 0) + (Re >>> 26) | 0;
Re &= 67108863;
i = Math.imul(D, Y);
n = (n = Math.imul(D, J)) + Math.imul(U, Y) | 0;
s = Math.imul(U, J);
i = i + Math.imul(C, Q) | 0;
n = (n = n + Math.imul(C, ee) | 0) + Math.imul(L, Q) | 0;
s = s + Math.imul(L, ee) | 0;
i = i + Math.imul(j, re) | 0;
n = (n = n + Math.imul(j, ie) | 0) + Math.imul(N, re) | 0;
s = s + Math.imul(N, ie) | 0;
i = i + Math.imul(I, se) | 0;
n = (n = n + Math.imul(I, oe) | 0) + Math.imul(T, se) | 0;
s = s + Math.imul(T, oe) | 0;
i = i + Math.imul(k, fe) | 0;
n = (n = n + Math.imul(k, ce) | 0) + Math.imul(R, fe) | 0;
s = s + Math.imul(R, ce) | 0;
i = i + Math.imul(E, he) | 0;
n = (n = n + Math.imul(E, de) | 0) + Math.imul(M, he) | 0;
s = s + Math.imul(M, de) | 0;
var xe = (c + (i = i + Math.imul(w, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(w, be) | 0) + Math.imul(_, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(_, be) | 0) + (n >>> 13) | 0) + (xe >>> 26) | 0;
xe &= 67108863;
i = Math.imul(D, Q);
n = (n = Math.imul(D, ee)) + Math.imul(U, Q) | 0;
s = Math.imul(U, ee);
i = i + Math.imul(C, re) | 0;
n = (n = n + Math.imul(C, ie) | 0) + Math.imul(L, re) | 0;
s = s + Math.imul(L, ie) | 0;
i = i + Math.imul(j, se) | 0;
n = (n = n + Math.imul(j, oe) | 0) + Math.imul(N, se) | 0;
s = s + Math.imul(N, oe) | 0;
i = i + Math.imul(I, fe) | 0;
n = (n = n + Math.imul(I, ce) | 0) + Math.imul(T, fe) | 0;
s = s + Math.imul(T, ce) | 0;
i = i + Math.imul(k, he) | 0;
n = (n = n + Math.imul(k, de) | 0) + Math.imul(R, he) | 0;
s = s + Math.imul(R, de) | 0;
var Ie = (c + (i = i + Math.imul(E, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(E, be) | 0) + Math.imul(M, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(M, be) | 0) + (n >>> 13) | 0) + (Ie >>> 26) | 0;
Ie &= 67108863;
i = Math.imul(D, re);
n = (n = Math.imul(D, ie)) + Math.imul(U, re) | 0;
s = Math.imul(U, ie);
i = i + Math.imul(C, se) | 0;
n = (n = n + Math.imul(C, oe) | 0) + Math.imul(L, se) | 0;
s = s + Math.imul(L, oe) | 0;
i = i + Math.imul(j, fe) | 0;
n = (n = n + Math.imul(j, ce) | 0) + Math.imul(N, fe) | 0;
s = s + Math.imul(N, ce) | 0;
i = i + Math.imul(I, he) | 0;
n = (n = n + Math.imul(I, de) | 0) + Math.imul(T, he) | 0;
s = s + Math.imul(T, de) | 0;
var Te = (c + (i = i + Math.imul(k, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(k, be) | 0) + Math.imul(R, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(R, be) | 0) + (n >>> 13) | 0) + (Te >>> 26) | 0;
Te &= 67108863;
i = Math.imul(D, se);
n = (n = Math.imul(D, oe)) + Math.imul(U, se) | 0;
s = Math.imul(U, oe);
i = i + Math.imul(C, fe) | 0;
n = (n = n + Math.imul(C, ce) | 0) + Math.imul(L, fe) | 0;
s = s + Math.imul(L, ce) | 0;
i = i + Math.imul(j, he) | 0;
n = (n = n + Math.imul(j, de) | 0) + Math.imul(N, he) | 0;
s = s + Math.imul(N, de) | 0;
var Be = (c + (i = i + Math.imul(I, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(I, be) | 0) + Math.imul(T, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(T, be) | 0) + (n >>> 13) | 0) + (Be >>> 26) | 0;
Be &= 67108863;
i = Math.imul(D, fe);
n = (n = Math.imul(D, ce)) + Math.imul(U, fe) | 0;
s = Math.imul(U, ce);
i = i + Math.imul(C, he) | 0;
n = (n = n + Math.imul(C, de) | 0) + Math.imul(L, he) | 0;
s = s + Math.imul(L, de) | 0;
var je = (c + (i = i + Math.imul(j, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(j, be) | 0) + Math.imul(N, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(N, be) | 0) + (n >>> 13) | 0) + (je >>> 26) | 0;
je &= 67108863;
i = Math.imul(D, he);
n = (n = Math.imul(D, de)) + Math.imul(U, he) | 0;
s = Math.imul(U, de);
var Ne = (c + (i = i + Math.imul(C, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(C, be) | 0) + Math.imul(L, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(L, be) | 0) + (n >>> 13) | 0) + (Ne >>> 26) | 0;
Ne &= 67108863;
var Pe = (c + (i = Math.imul(D, pe)) | 0) + ((8191 & (n = (n = Math.imul(D, be)) + Math.imul(U, pe) | 0)) << 13) | 0;
c = ((s = Math.imul(U, be)) + (n >>> 13) | 0) + (Pe >>> 26) | 0;
Pe &= 67108863;
f[0] = me;
f[1] = ge;
f[2] = ye;
f[3] = ve;
f[4] = we;
f[5] = _e;
f[6] = Se;
f[7] = Ee;
f[8] = Me;
f[9] = Ae;
f[10] = ke;
f[11] = Re;
f[12] = xe;
f[13] = Ie;
f[14] = Te;
f[15] = Be;
f[16] = je;
f[17] = Ne;
f[18] = Pe;
if (0 !== c) {
f[19] = c;
r.length++;
}
return r;
};
Math.imul || (b = p);
function m(e, t, r) {
r.negative = t.negative ^ e.negative;
r.length = e.length + t.length;
for (var i = 0, n = 0, s = 0; s < r.length - 1; s++) {
var o = n;
n = 0;
for (var a = 67108863 & i, f = Math.min(s, t.length - 1), c = Math.max(0, s - e.length + 1); c <= f; c++) {
var u = s - c, h = (0 | e.words[u]) * (0 | t.words[c]), d = 67108863 & h;
a = 67108863 & (d = d + a | 0);
n += (o = (o = o + (h / 67108864 | 0) | 0) + (d >>> 26) | 0) >>> 26;
o &= 67108863;
}
r.words[s] = a;
i = o;
o = n;
}
0 !== i ? r.words[s] = i : r.length--;
return r.strip();
}
function g(e, t, r) {
return new y().mulp(e, t, r);
}
s.prototype.mulTo = function(e, t) {
var r = this.length + e.length;
return 10 === this.length && 10 === e.length ? b(this, e, t) : r < 63 ? p(this, e, t) : r < 1024 ? m(this, e, t) : g(this, e, t);
};
function y(e, t) {
this.x = e;
this.y = t;
}
y.prototype.makeRBT = function(e) {
for (var t = new Array(e), r = s.prototype._countBits(e) - 1, i = 0; i < e; i++) t[i] = this.revBin(i, r, e);
return t;
};
y.prototype.revBin = function(e, t, r) {
if (0 === e || e === r - 1) return e;
for (var i = 0, n = 0; n < t; n++) {
i |= (1 & e) << t - n - 1;
e >>= 1;
}
return i;
};
y.prototype.permute = function(e, t, r, i, n, s) {
for (var o = 0; o < s; o++) {
i[o] = t[e[o]];
n[o] = r[e[o]];
}
};
y.prototype.transform = function(e, t, r, i, n, s) {
this.permute(s, e, t, r, i, n);
for (var o = 1; o < n; o <<= 1) for (var a = o << 1, f = Math.cos(2 * Math.PI / a), c = Math.sin(2 * Math.PI / a), u = 0; u < n; u += a) for (var h = f, d = c, l = 0; l < o; l++) {
var p = r[u + l], b = i[u + l], m = r[u + l + o], g = i[u + l + o], y = h * m - d * g;
g = h * g + d * m;
m = y;
r[u + l] = p + m;
i[u + l] = b + g;
r[u + l + o] = p - m;
i[u + l + o] = b - g;
if (l !== a) {
y = f * h - c * d;
d = f * d + c * h;
h = y;
}
}
};
y.prototype.guessLen13b = function(e, t) {
var r = 1 | Math.max(t, e), i = 1 & r, n = 0;
for (r = r / 2 | 0; r; r >>>= 1) n++;
return 1 << n + 1 + i;
};
y.prototype.conjugate = function(e, t, r) {
if (!(r <= 1)) for (var i = 0; i < r / 2; i++) {
var n = e[i];
e[i] = e[r - i - 1];
e[r - i - 1] = n;
n = t[i];
t[i] = -t[r - i - 1];
t[r - i - 1] = -n;
}
};
y.prototype.normalize13b = function(e, t) {
for (var r = 0, i = 0; i < t / 2; i++) {
var n = 8192 * Math.round(e[2 * i + 1] / t) + Math.round(e[2 * i] / t) + r;
e[i] = 67108863 & n;
r = n < 67108864 ? 0 : n / 67108864 | 0;
}
return e;
};
y.prototype.convert13b = function(e, t, r, n) {
for (var s = 0, o = 0; o < t; o++) {
s += 0 | e[o];
r[2 * o] = 8191 & s;
s >>>= 13;
r[2 * o + 1] = 8191 & s;
s >>>= 13;
}
for (o = 2 * t; o < n; ++o) r[o] = 0;
i(0 === s);
i(0 == (-8192 & s));
};
y.prototype.stub = function(e) {
for (var t = new Array(e), r = 0; r < e; r++) t[r] = 0;
return t;
};
y.prototype.mulp = function(e, t, r) {
var i = 2 * this.guessLen13b(e.length, t.length), n = this.makeRBT(i), s = this.stub(i), o = new Array(i), a = new Array(i), f = new Array(i), c = new Array(i), u = new Array(i), h = new Array(i), d = r.words;
d.length = i;
this.convert13b(e.words, e.length, o, i);
this.convert13b(t.words, t.length, c, i);
this.transform(o, s, a, f, i, n);
this.transform(c, s, u, h, i, n);
for (var l = 0; l < i; l++) {
var p = a[l] * u[l] - f[l] * h[l];
f[l] = a[l] * h[l] + f[l] * u[l];
a[l] = p;
}
this.conjugate(a, f, i);
this.transform(a, f, d, s, i, n);
this.conjugate(d, s, i);
this.normalize13b(d, i);
r.negative = e.negative ^ t.negative;
r.length = e.length + t.length;
return r.strip();
};
s.prototype.mul = function(e) {
var t = new s(null);
t.words = new Array(this.length + e.length);
return this.mulTo(e, t);
};
s.prototype.mulf = function(e) {
var t = new s(null);
t.words = new Array(this.length + e.length);
return g(this, e, t);
};
s.prototype.imul = function(e) {
return this.clone().mulTo(e, this);
};
s.prototype.imuln = function(e) {
i("number" == typeof e);
i(e < 67108864);
for (var t = 0, r = 0; r < this.length; r++) {
var n = (0 | this.words[r]) * e, s = (67108863 & n) + (67108863 & t);
t >>= 26;
t += n / 67108864 | 0;
t += s >>> 26;
this.words[r] = 67108863 & s;
}
if (0 !== t) {
this.words[r] = t;
this.length++;
}
return this;
};
s.prototype.muln = function(e) {
return this.clone().imuln(e);
};
s.prototype.sqr = function() {
return this.mul(this);
};
s.prototype.isqr = function() {
return this.imul(this.clone());
};
s.prototype.pow = function(e) {
var t = l(e);
if (0 === t.length) return new s(1);
for (var r = this, i = 0; i < t.length && 0 === t[i]; i++, r = r.sqr()) ;
if (++i < t.length) for (var n = r.sqr(); i < t.length; i++, n = n.sqr()) 0 !== t[i] && (r = r.mul(n));
return r;
};
s.prototype.iushln = function(e) {
i("number" == typeof e && e >= 0);
var t, r = e % 26, n = (e - r) / 26, s = 67108863 >>> 26 - r << 26 - r;
if (0 !== r) {
var o = 0;
for (t = 0; t < this.length; t++) {
var a = this.words[t] & s, f = (0 | this.words[t]) - a << r;
this.words[t] = f | o;
o = a >>> 26 - r;
}
if (o) {
this.words[t] = o;
this.length++;
}
}
if (0 !== n) {
for (t = this.length - 1; t >= 0; t--) this.words[t + n] = this.words[t];
for (t = 0; t < n; t++) this.words[t] = 0;
this.length += n;
}
return this.strip();
};
s.prototype.ishln = function(e) {
i(0 === this.negative);
return this.iushln(e);
};
s.prototype.iushrn = function(e, t, r) {
i("number" == typeof e && e >= 0);
var n;
n = t ? (t - t % 26) / 26 : 0;
var s = e % 26, o = Math.min((e - s) / 26, this.length), a = 67108863 ^ 67108863 >>> s << s, f = r;
n -= o;
n = Math.max(0, n);
if (f) {
for (var c = 0; c < o; c++) f.words[c] = this.words[c];
f.length = o;
}
if (0 === o) ; else if (this.length > o) {
this.length -= o;
for (c = 0; c < this.length; c++) this.words[c] = this.words[c + o];
} else {
this.words[0] = 0;
this.length = 1;
}
var u = 0;
for (c = this.length - 1; c >= 0 && (0 !== u || c >= n); c--) {
var h = 0 | this.words[c];
this.words[c] = u << 26 - s | h >>> s;
u = h & a;
}
f && 0 !== u && (f.words[f.length++] = u);
if (0 === this.length) {
this.words[0] = 0;
this.length = 1;
}
return this.strip();
};
s.prototype.ishrn = function(e, t, r) {
i(0 === this.negative);
return this.iushrn(e, t, r);
};
s.prototype.shln = function(e) {
return this.clone().ishln(e);
};
s.prototype.ushln = function(e) {
return this.clone().iushln(e);
};
s.prototype.shrn = function(e) {
return this.clone().ishrn(e);
};
s.prototype.ushrn = function(e) {
return this.clone().iushrn(e);
};
s.prototype.testn = function(e) {
i("number" == typeof e && e >= 0);
var t = e % 26, r = (e - t) / 26, n = 1 << t;
return !(this.length <= r || !(this.words[r] & n));
};
s.prototype.imaskn = function(e) {
i("number" == typeof e && e >= 0);
var t = e % 26, r = (e - t) / 26;
i(0 === this.negative, "imaskn works only with positive numbers");
if (this.length <= r) return this;
0 !== t && r++;
this.length = Math.min(r, this.length);
if (0 !== t) {
var n = 67108863 ^ 67108863 >>> t << t;
this.words[this.length - 1] &= n;
}
return this.strip();
};
s.prototype.maskn = function(e) {
return this.clone().imaskn(e);
};
s.prototype.iaddn = function(e) {
i("number" == typeof e);
i(e < 67108864);
if (e < 0) return this.isubn(-e);
if (0 !== this.negative) {
if (1 === this.length && (0 | this.words[0]) < e) {
this.words[0] = e - (0 | this.words[0]);
this.negative = 0;
return this;
}
this.negative = 0;
this.isubn(e);
this.negative = 1;
return this;
}
return this._iaddn(e);
};
s.prototype._iaddn = function(e) {
this.words[0] += e;
for (var t = 0; t < this.length && this.words[t] >= 67108864; t++) {
this.words[t] -= 67108864;
t === this.length - 1 ? this.words[t + 1] = 1 : this.words[t + 1]++;
}
this.length = Math.max(this.length, t + 1);
return this;
};
s.prototype.isubn = function(e) {
i("number" == typeof e);
i(e < 67108864);
if (e < 0) return this.iaddn(-e);
if (0 !== this.negative) {
this.negative = 0;
this.iaddn(e);
this.negative = 1;
return this;
}
this.words[0] -= e;
if (1 === this.length && this.words[0] < 0) {
this.words[0] = -this.words[0];
this.negative = 1;
} else for (var t = 0; t < this.length && this.words[t] < 0; t++) {
this.words[t] += 67108864;
this.words[t + 1] -= 1;
}
return this.strip();
};
s.prototype.addn = function(e) {
return this.clone().iaddn(e);
};
s.prototype.subn = function(e) {
return this.clone().isubn(e);
};
s.prototype.iabs = function() {
this.negative = 0;
return this;
};
s.prototype.abs = function() {
return this.clone().iabs();
};
s.prototype._ishlnsubmul = function(e, t, r) {
var n, s, o = e.length + r;
this._expand(o);
var a = 0;
for (n = 0; n < e.length; n++) {
s = (0 | this.words[n + r]) + a;
var f = (0 | e.words[n]) * t;
a = ((s -= 67108863 & f) >> 26) - (f / 67108864 | 0);
this.words[n + r] = 67108863 & s;
}
for (;n < this.length - r; n++) {
a = (s = (0 | this.words[n + r]) + a) >> 26;
this.words[n + r] = 67108863 & s;
}
if (0 === a) return this.strip();
i(-1 === a);
a = 0;
for (n = 0; n < this.length; n++) {
a = (s = -(0 | this.words[n]) + a) >> 26;
this.words[n] = 67108863 & s;
}
this.negative = 1;
return this.strip();
};
s.prototype._wordDiv = function(e, t) {
var r = (this.length, e.length), i = this.clone(), n = e, o = 0 | n.words[n.length - 1];
if (0 != (r = 26 - this._countBits(o))) {
n = n.ushln(r);
i.iushln(r);
o = 0 | n.words[n.length - 1];
}
var a, f = i.length - n.length;
if ("mod" !== t) {
(a = new s(null)).length = f + 1;
a.words = new Array(a.length);
for (var c = 0; c < a.length; c++) a.words[c] = 0;
}
var u = i.clone()._ishlnsubmul(n, 1, f);
if (0 === u.negative) {
i = u;
a && (a.words[f] = 1);
}
for (var h = f - 1; h >= 0; h--) {
var d = 67108864 * (0 | i.words[n.length + h]) + (0 | i.words[n.length + h - 1]);
d = Math.min(d / o | 0, 67108863);
i._ishlnsubmul(n, d, h);
for (;0 !== i.negative; ) {
d--;
i.negative = 0;
i._ishlnsubmul(n, 1, h);
i.isZero() || (i.negative ^= 1);
}
a && (a.words[h] = d);
}
a && a.strip();
i.strip();
"div" !== t && 0 !== r && i.iushrn(r);
return {
div: a || null,
mod: i
};
};
s.prototype.divmod = function(e, t, r) {
i(!e.isZero());
if (this.isZero()) return {
div: new s(0),
mod: new s(0)
};
var n, o, a;
if (0 !== this.negative && 0 === e.negative) {
a = this.neg().divmod(e, t);
"mod" !== t && (n = a.div.neg());
if ("div" !== t) {
o = a.mod.neg();
r && 0 !== o.negative && o.iadd(e);
}
return {
div: n,
mod: o
};
}
if (0 === this.negative && 0 !== e.negative) {
a = this.divmod(e.neg(), t);
"mod" !== t && (n = a.div.neg());
return {
div: n,
mod: a.mod
};
}
if (0 != (this.negative & e.negative)) {
a = this.neg().divmod(e.neg(), t);
if ("div" !== t) {
o = a.mod.neg();
r && 0 !== o.negative && o.isub(e);
}
return {
div: a.div,
mod: o
};
}
return e.length > this.length || this.cmp(e) < 0 ? {
div: new s(0),
mod: this
} : 1 === e.length ? "div" === t ? {
div: this.divn(e.words[0]),
mod: null
} : "mod" === t ? {
div: null,
mod: new s(this.modn(e.words[0]))
} : {
div: this.divn(e.words[0]),
mod: new s(this.modn(e.words[0]))
} : this._wordDiv(e, t);
};
s.prototype.div = function(e) {
return this.divmod(e, "div", !1).div;
};
s.prototype.mod = function(e) {
return this.divmod(e, "mod", !1).mod;
};
s.prototype.umod = function(e) {
return this.divmod(e, "mod", !0).mod;
};
s.prototype.divRound = function(e) {
var t = this.divmod(e);
if (t.mod.isZero()) return t.div;
var r = 0 !== t.div.negative ? t.mod.isub(e) : t.mod, i = e.ushrn(1), n = e.andln(1), s = r.cmp(i);
return s < 0 || 1 === n && 0 === s ? t.div : 0 !== t.div.negative ? t.div.isubn(1) : t.div.iaddn(1);
};
s.prototype.modn = function(e) {
i(e <= 67108863);
for (var t = (1 << 26) % e, r = 0, n = this.length - 1; n >= 0; n--) r = (t * r + (0 | this.words[n])) % e;
return r;
};
s.prototype.idivn = function(e) {
i(e <= 67108863);
for (var t = 0, r = this.length - 1; r >= 0; r--) {
var n = (0 | this.words[r]) + 67108864 * t;
this.words[r] = n / e | 0;
t = n % e;
}
return this.strip();
};
s.prototype.divn = function(e) {
return this.clone().idivn(e);
};
s.prototype.egcd = function(e) {
i(0 === e.negative);
i(!e.isZero());
var t = this, r = e.clone();
t = 0 !== t.negative ? t.umod(e) : t.clone();
for (var n = new s(1), o = new s(0), a = new s(0), f = new s(1), c = 0; t.isEven() && r.isEven(); ) {
t.iushrn(1);
r.iushrn(1);
++c;
}
for (var u = r.clone(), h = t.clone(); !t.isZero(); ) {
for (var d = 0, l = 1; 0 == (t.words[0] & l) && d < 26; ++d, l <<= 1) ;
if (d > 0) {
t.iushrn(d);
for (;d-- > 0; ) {
if (n.isOdd() || o.isOdd()) {
n.iadd(u);
o.isub(h);
}
n.iushrn(1);
o.iushrn(1);
}
}
for (var p = 0, b = 1; 0 == (r.words[0] & b) && p < 26; ++p, b <<= 1) ;
if (p > 0) {
r.iushrn(p);
for (;p-- > 0; ) {
if (a.isOdd() || f.isOdd()) {
a.iadd(u);
f.isub(h);
}
a.iushrn(1);
f.iushrn(1);
}
}
if (t.cmp(r) >= 0) {
t.isub(r);
n.isub(a);
o.isub(f);
} else {
r.isub(t);
a.isub(n);
f.isub(o);
}
}
return {
a: a,
b: f,
gcd: r.iushln(c)
};
};
s.prototype._invmp = function(e) {
i(0 === e.negative);
i(!e.isZero());
var t = this, r = e.clone();
t = 0 !== t.negative ? t.umod(e) : t.clone();
for (var n, o = new s(1), a = new s(0), f = r.clone(); t.cmpn(1) > 0 && r.cmpn(1) > 0; ) {
for (var c = 0, u = 1; 0 == (t.words[0] & u) && c < 26; ++c, u <<= 1) ;
if (c > 0) {
t.iushrn(c);
for (;c-- > 0; ) {
o.isOdd() && o.iadd(f);
o.iushrn(1);
}
}
for (var h = 0, d = 1; 0 == (r.words[0] & d) && h < 26; ++h, d <<= 1) ;
if (h > 0) {
r.iushrn(h);
for (;h-- > 0; ) {
a.isOdd() && a.iadd(f);
a.iushrn(1);
}
}
if (t.cmp(r) >= 0) {
t.isub(r);
o.isub(a);
} else {
r.isub(t);
a.isub(o);
}
}
(n = 0 === t.cmpn(1) ? o : a).cmpn(0) < 0 && n.iadd(e);
return n;
};
s.prototype.gcd = function(e) {
if (this.isZero()) return e.abs();
if (e.isZero()) return this.abs();
var t = this.clone(), r = e.clone();
t.negative = 0;
r.negative = 0;
for (var i = 0; t.isEven() && r.isEven(); i++) {
t.iushrn(1);
r.iushrn(1);
}
for (;;) {
for (;t.isEven(); ) t.iushrn(1);
for (;r.isEven(); ) r.iushrn(1);
var n = t.cmp(r);
if (n < 0) {
var s = t;
t = r;
r = s;
} else if (0 === n || 0 === r.cmpn(1)) break;
t.isub(r);
}
return r.iushln(i);
};
s.prototype.invm = function(e) {
return this.egcd(e).a.umod(e);
};
s.prototype.isEven = function() {
return 0 == (1 & this.words[0]);
};
s.prototype.isOdd = function() {
return 1 == (1 & this.words[0]);
};
s.prototype.andln = function(e) {
return this.words[0] & e;
};
s.prototype.bincn = function(e) {
i("number" == typeof e);
var t = e % 26, r = (e - t) / 26, n = 1 << t;
if (this.length <= r) {
this._expand(r + 1);
this.words[r] |= n;
return this;
}
for (var s = n, o = r; 0 !== s && o < this.length; o++) {
var a = 0 | this.words[o];
s = (a += s) >>> 26;
a &= 67108863;
this.words[o] = a;
}
if (0 !== s) {
this.words[o] = s;
this.length++;
}
return this;
};
s.prototype.isZero = function() {
return 1 === this.length && 0 === this.words[0];
};
s.prototype.cmpn = function(e) {
var t, r = e < 0;
if (0 !== this.negative && !r) return -1;
if (0 === this.negative && r) return 1;
this.strip();
if (this.length > 1) t = 1; else {
r && (e = -e);
i(e <= 67108863, "Number is too big");
var n = 0 | this.words[0];
t = n === e ? 0 : n < e ? -1 : 1;
}
return 0 !== this.negative ? 0 | -t : t;
};
s.prototype.cmp = function(e) {
if (0 !== this.negative && 0 === e.negative) return -1;
if (0 === this.negative && 0 !== e.negative) return 1;
var t = this.ucmp(e);
return 0 !== this.negative ? 0 | -t : t;
};
s.prototype.ucmp = function(e) {
if (this.length > e.length) return 1;
if (this.length < e.length) return -1;
for (var t = 0, r = this.length - 1; r >= 0; r--) {
var i = 0 | this.words[r], n = 0 | e.words[r];
if (i !== n) {
i < n ? t = -1 : i > n && (t = 1);
break;
}
}
return t;
};
s.prototype.gtn = function(e) {
return 1 === this.cmpn(e);
};
s.prototype.gt = function(e) {
return 1 === this.cmp(e);
};
s.prototype.gten = function(e) {
return this.cmpn(e) >= 0;
};
s.prototype.gte = function(e) {
return this.cmp(e) >= 0;
};
s.prototype.ltn = function(e) {
return -1 === this.cmpn(e);
};
s.prototype.lt = function(e) {
return -1 === this.cmp(e);
};
s.prototype.lten = function(e) {
return this.cmpn(e) <= 0;
};
s.prototype.lte = function(e) {
return this.cmp(e) <= 0;
};
s.prototype.eqn = function(e) {
return 0 === this.cmpn(e);
};
s.prototype.eq = function(e) {
return 0 === this.cmp(e);
};
s.red = function(e) {
return new A(e);
};
s.prototype.toRed = function(e) {
i(!this.red, "Already a number in reduction context");
i(0 === this.negative, "red works only with positives");
return e.convertTo(this)._forceRed(e);
};
s.prototype.fromRed = function() {
i(this.red, "fromRed works only with numbers in reduction context");
return this.red.convertFrom(this);
};
s.prototype._forceRed = function(e) {
this.red = e;
return this;
};
s.prototype.forceRed = function(e) {
i(!this.red, "Already a number in reduction context");
return this._forceRed(e);
};
s.prototype.redAdd = function(e) {
i(this.red, "redAdd works only with red numbers");
return this.red.add(this, e);
};
s.prototype.redIAdd = function(e) {
i(this.red, "redIAdd works only with red numbers");
return this.red.iadd(this, e);
};
s.prototype.redSub = function(e) {
i(this.red, "redSub works only with red numbers");
return this.red.sub(this, e);
};
s.prototype.redISub = function(e) {
i(this.red, "redISub works only with red numbers");
return this.red.isub(this, e);
};
s.prototype.redShl = function(e) {
i(this.red, "redShl works only with red numbers");
return this.red.shl(this, e);
};
s.prototype.redMul = function(e) {
i(this.red, "redMul works only with red numbers");
this.red._verify2(this, e);
return this.red.mul(this, e);
};
s.prototype.redIMul = function(e) {
i(this.red, "redMul works only with red numbers");
this.red._verify2(this, e);
return this.red.imul(this, e);
};
s.prototype.redSqr = function() {
i(this.red, "redSqr works only with red numbers");
this.red._verify1(this);
return this.red.sqr(this);
};
s.prototype.redISqr = function() {
i(this.red, "redISqr works only with red numbers");
this.red._verify1(this);
return this.red.isqr(this);
};
s.prototype.redSqrt = function() {
i(this.red, "redSqrt works only with red numbers");
this.red._verify1(this);
return this.red.sqrt(this);
};
s.prototype.redInvm = function() {
i(this.red, "redInvm works only with red numbers");
this.red._verify1(this);
return this.red.invm(this);
};
s.prototype.redNeg = function() {
i(this.red, "redNeg works only with red numbers");
this.red._verify1(this);
return this.red.neg(this);
};
s.prototype.redPow = function(e) {
i(this.red && !e.red, "redPow(normalNum)");
this.red._verify1(this);
return this.red.pow(this, e);
};
var v = {
k256: null,
p224: null,
p192: null,
p25519: null
};
function w(e, t) {
this.name = e;
this.p = new s(t, 16);
this.n = this.p.bitLength();
this.k = new s(1).iushln(this.n).isub(this.p);
this.tmp = this._tmp();
}
w.prototype._tmp = function() {
var e = new s(null);
e.words = new Array(Math.ceil(this.n / 13));
return e;
};
w.prototype.ireduce = function(e) {
var t, r = e;
do {
this.split(r, this.tmp);
t = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength();
} while (t > this.n);
var i = t < this.n ? -1 : r.ucmp(this.p);
if (0 === i) {
r.words[0] = 0;
r.length = 1;
} else i > 0 ? r.isub(this.p) : void 0 !== r.strip ? r.strip() : r._strip();
return r;
};
w.prototype.split = function(e, t) {
e.iushrn(this.n, 0, t);
};
w.prototype.imulK = function(e) {
return e.imul(this.k);
};
function _() {
w.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
}
n(_, w);
_.prototype.split = function(e, t) {
for (var r = Math.min(e.length, 9), i = 0; i < r; i++) t.words[i] = e.words[i];
t.length = r;
if (e.length <= 9) {
e.words[0] = 0;
e.length = 1;
} else {
var n = e.words[9];
t.words[t.length++] = 4194303 & n;
for (i = 10; i < e.length; i++) {
var s = 0 | e.words[i];
e.words[i - 10] = (4194303 & s) << 4 | n >>> 22;
n = s;
}
n >>>= 22;
e.words[i - 10] = n;
0 === n && e.length > 10 ? e.length -= 10 : e.length -= 9;
}
};
_.prototype.imulK = function(e) {
e.words[e.length] = 0;
e.words[e.length + 1] = 0;
e.length += 2;
for (var t = 0, r = 0; r < e.length; r++) {
var i = 0 | e.words[r];
t += 977 * i;
e.words[r] = 67108863 & t;
t = 64 * i + (t / 67108864 | 0);
}
if (0 === e.words[e.length - 1]) {
e.length--;
0 === e.words[e.length - 1] && e.length--;
}
return e;
};
function S() {
w.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
}
n(S, w);
function E() {
w.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
}
n(E, w);
function M() {
w.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
}
n(M, w);
M.prototype.imulK = function(e) {
for (var t = 0, r = 0; r < e.length; r++) {
var i = 19 * (0 | e.words[r]) + t, n = 67108863 & i;
i >>>= 26;
e.words[r] = n;
t = i;
}
0 !== t && (e.words[e.length++] = t);
return e;
};
s._prime = function(e) {
if (v[e]) return v[e];
var t;
if ("k256" === e) t = new _(); else if ("p224" === e) t = new S(); else if ("p192" === e) t = new E(); else {
if ("p25519" !== e) throw new Error("Unknown prime " + e);
t = new M();
}
v[e] = t;
return t;
};
function A(e) {
if ("string" == typeof e) {
var t = s._prime(e);
this.m = t.p;
this.prime = t;
} else {
i(e.gtn(1), "modulus must be greater than 1");
this.m = e;
this.prime = null;
}
}
A.prototype._verify1 = function(e) {
i(0 === e.negative, "red works only with positives");
i(e.red, "red works only with red numbers");
};
A.prototype._verify2 = function(e, t) {
i(0 == (e.negative | t.negative), "red works only with positives");
i(e.red && e.red === t.red, "red works only with red numbers");
};
A.prototype.imod = function(e) {
return this.prime ? this.prime.ireduce(e)._forceRed(this) : e.umod(this.m)._forceRed(this);
};
A.prototype.neg = function(e) {
return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
};
A.prototype.add = function(e, t) {
this._verify2(e, t);
var r = e.add(t);
r.cmp(this.m) >= 0 && r.isub(this.m);
return r._forceRed(this);
};
A.prototype.iadd = function(e, t) {
this._verify2(e, t);
var r = e.iadd(t);
r.cmp(this.m) >= 0 && r.isub(this.m);
return r;
};
A.prototype.sub = function(e, t) {
this._verify2(e, t);
var r = e.sub(t);
r.cmpn(0) < 0 && r.iadd(this.m);
return r._forceRed(this);
};
A.prototype.isub = function(e, t) {
this._verify2(e, t);
var r = e.isub(t);
r.cmpn(0) < 0 && r.iadd(this.m);
return r;
};
A.prototype.shl = function(e, t) {
this._verify1(e);
return this.imod(e.ushln(t));
};
A.prototype.imul = function(e, t) {
this._verify2(e, t);
return this.imod(e.imul(t));
};
A.prototype.mul = function(e, t) {
this._verify2(e, t);
return this.imod(e.mul(t));
};
A.prototype.isqr = function(e) {
return this.imul(e, e.clone());
};
A.prototype.sqr = function(e) {
return this.mul(e, e);
};
A.prototype.sqrt = function(e) {
if (e.isZero()) return e.clone();
var t = this.m.andln(3);
i(t % 2 == 1);
if (3 === t) {
var r = this.m.add(new s(1)).iushrn(2);
return this.pow(e, r);
}
for (var n = this.m.subn(1), o = 0; !n.isZero() && 0 === n.andln(1); ) {
o++;
n.iushrn(1);
}
i(!n.isZero());
var a = new s(1).toRed(this), f = a.redNeg(), c = this.m.subn(1).iushrn(1), u = this.m.bitLength();
u = new s(2 * u * u).toRed(this);
for (;0 !== this.pow(u, c).cmp(f); ) u.redIAdd(f);
for (var h = this.pow(u, n), d = this.pow(e, n.addn(1).iushrn(1)), l = this.pow(e, n), p = o; 0 !== l.cmp(a); ) {
for (var b = l, m = 0; 0 !== b.cmp(a); m++) b = b.redSqr();
i(m < p);
var g = this.pow(h, new s(1).iushln(p - m - 1));
d = d.redMul(g);
h = g.redSqr();
l = l.redMul(h);
p = m;
}
return d;
};
A.prototype.invm = function(e) {
var t = e._invmp(this.m);
if (0 !== t.negative) {
t.negative = 0;
return this.imod(t).redNeg();
}
return this.imod(t);
};
A.prototype.pow = function(e, t) {
if (t.isZero()) return new s(1).toRed(this);
if (0 === t.cmpn(1)) return e.clone();
var r = new Array(16);
r[0] = new s(1).toRed(this);
r[1] = e;
for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], e);
var n = r[0], o = 0, a = 0, f = t.bitLength() % 26;
0 === f && (f = 26);
for (i = t.length - 1; i >= 0; i--) {
for (var c = t.words[i], u = f - 1; u >= 0; u--) {
var h = c >> u & 1;
n !== r[0] && (n = this.sqr(n));
if (0 !== h || 0 !== o) {
o <<= 1;
o |= h;
if (4 == ++a || 0 === i && 0 === u) {
n = this.mul(n, r[o]);
a = 0;
o = 0;
}
} else a = 0;
}
f = 26;
}
return n;
};
A.prototype.convertTo = function(e) {
var t = e.umod(this.m);
return t === e ? t.clone() : t;
};
A.prototype.convertFrom = function(e) {
var t = e.clone();
t.red = null;
return t;
};
s.mont = function(e) {
return new k(e);
};
function k(e) {
A.call(this, e);
this.shift = this.m.bitLength();
this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26);
this.r = new s(1).iushln(this.shift);
this.r2 = this.imod(this.r.sqr());
this.rinv = this.r._invmp(this.m);
this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
this.minv = this.minv.umod(this.r);
this.minv = this.r.sub(this.minv);
}
n(k, A);
k.prototype.convertTo = function(e) {
return this.imod(e.ushln(this.shift));
};
k.prototype.convertFrom = function(e) {
var t = this.imod(e.mul(this.rinv));
t.red = null;
return t;
};
k.prototype.imul = function(e, t) {
if (e.isZero() || t.isZero()) {
e.words[0] = 0;
e.length = 1;
return e;
}
var r = e.imul(t), i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = r.isub(i).iushrn(this.shift), s = n;
n.cmp(this.m) >= 0 ? s = n.isub(this.m) : n.cmpn(0) < 0 && (s = n.iadd(this.m));
return s._forceRed(this);
};
k.prototype.mul = function(e, t) {
if (e.isZero() || t.isZero()) return new s(0)._forceRed(this);
var r = e.mul(t), i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = r.isub(i).iushrn(this.shift), o = n;
n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m));
return o._forceRed(this);
};
k.prototype.invm = function(e) {
return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this);
};
})("undefined" == typeof t || t, this);
}, {
buffer: 19
} ],
16: [ function(e, t, r) {
"use strict";
r.byteLength = function(e) {
var t = c(e), r = t[0], i = t[1];
return 3 * (r + i) / 4 - i;
};
r.toByteArray = function(e) {
var t, r, i = c(e), o = i[0], a = i[1], f = new s(u(0, o, a)), h = 0, d = a > 0 ? o - 4 : o;
for (r = 0; r < d; r += 4) {
t = n[e.charCodeAt(r)] << 18 | n[e.charCodeAt(r + 1)] << 12 | n[e.charCodeAt(r + 2)] << 6 | n[e.charCodeAt(r + 3)];
f[h++] = t >> 16 & 255;
f[h++] = t >> 8 & 255;
f[h++] = 255 & t;
}
if (2 === a) {
t = n[e.charCodeAt(r)] << 2 | n[e.charCodeAt(r + 1)] >> 4;
f[h++] = 255 & t;
}
if (1 === a) {
t = n[e.charCodeAt(r)] << 10 | n[e.charCodeAt(r + 1)] << 4 | n[e.charCodeAt(r + 2)] >> 2;
f[h++] = t >> 8 & 255;
f[h++] = 255 & t;
}
return f;
};
r.fromByteArray = function(e) {
for (var t, r = e.length, n = r % 3, s = [], o = 0, a = r - n; o < a; o += 16383) s.push(h(e, o, o + 16383 > a ? a : o + 16383));
if (1 === n) {
t = e[r - 1];
s.push(i[t >> 2] + i[t << 4 & 63] + "==");
} else if (2 === n) {
t = (e[r - 2] << 8) + e[r - 1];
s.push(i[t >> 10] + i[t >> 4 & 63] + i[t << 2 & 63] + "=");
}
return s.join("");
};
for (var i = [], n = [], s = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, f = o.length; a < f; ++a) {
i[a] = o[a];
n[o.charCodeAt(a)] = a;
}
n["-".charCodeAt(0)] = 62;
n["_".charCodeAt(0)] = 63;
function c(e) {
var t = e.length;
if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
var r = e.indexOf("=");
-1 === r && (r = t);
return [ r, r === t ? 0 : 4 - r % 4 ];
}
function u(e, t, r) {
return 3 * (t + r) / 4 - r;
}
function h(e, t, r) {
for (var n, s, o = [], a = t; a < r; a += 3) {
n = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]);
o.push(i[(s = n) >> 18 & 63] + i[s >> 12 & 63] + i[s >> 6 & 63] + i[63 & s]);
}
return o.join("");
}
}, {} ],
17: [ function(e, t) {
(function(t, r) {
"use strict";
function i(e, t) {
if (!e) throw new Error(t || "Assertion failed");
}
function n(e, t) {
e.super_ = t;
var r = function() {};
r.prototype = t.prototype;
e.prototype = new r();
e.prototype.constructor = e;
}
function s(e, t, r) {
if (s.isBN(e)) return e;
this.negative = 0;
this.words = null;
this.length = 0;
this.red = null;
if (null !== e) {
if ("le" === t || "be" === t) {
r = t;
t = 10;
}
this._init(e || 0, t || 10, r || "be");
}
}
"object" == typeof t ? t.exports = s : r.BN = s;
s.BN = s;
s.wordSize = 26;
var o;
try {
o = "undefined" != typeof window && "undefined" != typeof window.Buffer ? window.Buffer : e("buffer").Buffer;
} catch (e) {}
s.isBN = function(e) {
return e instanceof s || null !== e && "object" == typeof e && e.constructor.wordSize === s.wordSize && Array.isArray(e.words);
};
s.max = function(e, t) {
return e.cmp(t) > 0 ? e : t;
};
s.min = function(e, t) {
return e.cmp(t) < 0 ? e : t;
};
s.prototype._init = function(e, t, r) {
if ("number" == typeof e) return this._initNumber(e, t, r);
if ("object" == typeof e) return this._initArray(e, t, r);
"hex" === t && (t = 16);
i(t === (0 | t) && t >= 2 && t <= 36);
var n = 0;
if ("-" === (e = e.toString().replace(/\s+/g, ""))[0]) {
n++;
this.negative = 1;
}
if (n < e.length) if (16 === t) this._parseHex(e, n, r); else {
this._parseBase(e, t, n);
"le" === r && this._initArray(this.toArray(), t, r);
}
};
s.prototype._initNumber = function(e, t, r) {
if (e < 0) {
this.negative = 1;
e = -e;
}
if (e < 67108864) {
this.words = [ 67108863 & e ];
this.length = 1;
} else if (e < 4503599627370496) {
this.words = [ 67108863 & e, e / 67108864 & 67108863 ];
this.length = 2;
} else {
i(e < 9007199254740992);
this.words = [ 67108863 & e, e / 67108864 & 67108863, 1 ];
this.length = 3;
}
"le" === r && this._initArray(this.toArray(), t, r);
};
s.prototype._initArray = function(e, t, r) {
i("number" == typeof e.length);
if (e.length <= 0) {
this.words = [ 0 ];
this.length = 1;
return this;
}
this.length = Math.ceil(e.length / 3);
this.words = new Array(this.length);
for (var n = 0; n < this.length; n++) this.words[n] = 0;
var s, o, a = 0;
if ("be" === r) for (n = e.length - 1, s = 0; n >= 0; n -= 3) {
o = e[n] | e[n - 1] << 8 | e[n - 2] << 16;
this.words[s] |= o << a & 67108863;
this.words[s + 1] = o >>> 26 - a & 67108863;
if ((a += 24) >= 26) {
a -= 26;
s++;
}
} else if ("le" === r) for (n = 0, s = 0; n < e.length; n += 3) {
o = e[n] | e[n + 1] << 8 | e[n + 2] << 16;
this.words[s] |= o << a & 67108863;
this.words[s + 1] = o >>> 26 - a & 67108863;
if ((a += 24) >= 26) {
a -= 26;
s++;
}
}
return this._strip();
};
function a(e, t) {
var r = e.charCodeAt(t);
if (r >= 48 && r <= 57) return r - 48;
if (r >= 65 && r <= 70) return r - 55;
if (r >= 97 && r <= 102) return r - 87;
i(!1, "Invalid character in " + e);
}
function f(e, t, r) {
var i = a(e, r);
r - 1 >= t && (i |= a(e, r - 1) << 4);
return i;
}
s.prototype._parseHex = function(e, t, r) {
this.length = Math.ceil((e.length - t) / 6);
this.words = new Array(this.length);
for (var i = 0; i < this.length; i++) this.words[i] = 0;
var n, s = 0, o = 0;
if ("be" === r) for (i = e.length - 1; i >= t; i -= 2) {
n = f(e, t, i) << s;
this.words[o] |= 67108863 & n;
if (s >= 18) {
s -= 18;
o += 1;
this.words[o] |= n >>> 26;
} else s += 8;
} else for (i = (e.length - t) % 2 == 0 ? t + 1 : t; i < e.length; i += 2) {
n = f(e, t, i) << s;
this.words[o] |= 67108863 & n;
if (s >= 18) {
s -= 18;
o += 1;
this.words[o] |= n >>> 26;
} else s += 8;
}
this._strip();
};
function c(e, t, r, n) {
for (var s = 0, o = 0, a = Math.min(e.length, r), f = t; f < a; f++) {
var c = e.charCodeAt(f) - 48;
s *= n;
o = c >= 49 ? c - 49 + 10 : c >= 17 ? c - 17 + 10 : c;
i(c >= 0 && o < n, "Invalid character");
s += o;
}
return s;
}
s.prototype._parseBase = function(e, t, r) {
this.words = [ 0 ];
this.length = 1;
for (var i = 0, n = 1; n <= 67108863; n *= t) i++;
i--;
n = n / t | 0;
for (var s = e.length - r, o = s % i, a = Math.min(s, s - o) + r, f = 0, u = r; u < a; u += i) {
f = c(e, u, u + i, t);
this.imuln(n);
this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
}
if (0 !== o) {
var h = 1;
f = c(e, u, e.length, t);
for (u = 0; u < o; u++) h *= t;
this.imuln(h);
this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
}
this._strip();
};
s.prototype.copy = function(e) {
e.words = new Array(this.length);
for (var t = 0; t < this.length; t++) e.words[t] = this.words[t];
e.length = this.length;
e.negative = this.negative;
e.red = this.red;
};
function u(e, t) {
e.words = t.words;
e.length = t.length;
e.negative = t.negative;
e.red = t.red;
}
s.prototype._move = function(e) {
u(e, this);
};
s.prototype.clone = function() {
var e = new s(null);
this.copy(e);
return e;
};
s.prototype._expand = function(e) {
for (;this.length < e; ) this.words[this.length++] = 0;
return this;
};
s.prototype._strip = function() {
for (;this.length > 1 && 0 === this.words[this.length - 1]; ) this.length--;
return this._normSign();
};
s.prototype._normSign = function() {
1 === this.length && 0 === this.words[0] && (this.negative = 0);
return this;
};
if ("undefined" != typeof Symbol && "function" == typeof Symbol.for) try {
s.prototype[Symbol.for("nodejs.util.inspect.custom")] = h;
} catch (e) {
s.prototype.inspect = h;
} else s.prototype.inspect = h;
function h() {
return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
}
var d = [ "", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000" ], l = [ 0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ], p = [ 0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176 ];
s.prototype.toString = function(e, t) {
t = 0 | t || 1;
var r;
if (16 === (e = e || 10) || "hex" === e) {
r = "";
for (var n = 0, s = 0, o = 0; o < this.length; o++) {
var a = this.words[o], f = (16777215 & (a << n | s)).toString(16);
r = 0 != (s = a >>> 24 - n & 16777215) || o !== this.length - 1 ? d[6 - f.length] + f + r : f + r;
if ((n += 2) >= 26) {
n -= 26;
o--;
}
}
0 !== s && (r = s.toString(16) + r);
for (;r.length % t != 0; ) r = "0" + r;
0 !== this.negative && (r = "-" + r);
return r;
}
if (e === (0 | e) && e >= 2 && e <= 36) {
var c = l[e], u = p[e];
r = "";
var h = this.clone();
h.negative = 0;
for (;!h.isZero(); ) {
var b = h.modrn(u).toString(e);
r = (h = h.idivn(u)).isZero() ? b + r : d[c - b.length] + b + r;
}
this.isZero() && (r = "0" + r);
for (;r.length % t != 0; ) r = "0" + r;
0 !== this.negative && (r = "-" + r);
return r;
}
i(!1, "Base should be between 2 and 36");
};
s.prototype.toNumber = function() {
var e = this.words[0];
2 === this.length ? e += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? e += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && i(!1, "Number can only safely store up to 53 bits");
return 0 !== this.negative ? -e : e;
};
s.prototype.toJSON = function() {
return this.toString(16, 2);
};
o && (s.prototype.toBuffer = function(e, t) {
return this.toArrayLike(o, e, t);
});
s.prototype.toArray = function(e, t) {
return this.toArrayLike(Array, e, t);
};
var b = function(e, t) {
return e.allocUnsafe ? e.allocUnsafe(t) : new e(t);
};
s.prototype.toArrayLike = function(e, t, r) {
this._strip();
var n = this.byteLength(), s = r || Math.max(1, n);
i(n <= s, "byte array longer than desired length");
i(s > 0, "Requested array length <= 0");
var o = b(e, s);
this["_toArrayLike" + ("le" === t ? "LE" : "BE")](o, n);
return o;
};
s.prototype._toArrayLikeLE = function(e) {
for (var t = 0, r = 0, i = 0, n = 0; i < this.length; i++) {
var s = this.words[i] << n | r;
e[t++] = 255 & s;
t < e.length && (e[t++] = s >> 8 & 255);
t < e.length && (e[t++] = s >> 16 & 255);
if (6 === n) {
t < e.length && (e[t++] = s >> 24 & 255);
r = 0;
n = 0;
} else {
r = s >>> 24;
n += 2;
}
}
if (t < e.length) {
e[t++] = r;
for (;t < e.length; ) e[t++] = 0;
}
};
s.prototype._toArrayLikeBE = function(e) {
for (var t = e.length - 1, r = 0, i = 0, n = 0; i < this.length; i++) {
var s = this.words[i] << n | r;
e[t--] = 255 & s;
t >= 0 && (e[t--] = s >> 8 & 255);
t >= 0 && (e[t--] = s >> 16 & 255);
if (6 === n) {
t >= 0 && (e[t--] = s >> 24 & 255);
r = 0;
n = 0;
} else {
r = s >>> 24;
n += 2;
}
}
if (t >= 0) {
e[t--] = r;
for (;t >= 0; ) e[t--] = 0;
}
};
Math.clz32 ? s.prototype._countBits = function(e) {
return 32 - Math.clz32(e);
} : s.prototype._countBits = function(e) {
var t = e, r = 0;
if (t >= 4096) {
r += 13;
t >>>= 13;
}
if (t >= 64) {
r += 7;
t >>>= 7;
}
if (t >= 8) {
r += 4;
t >>>= 4;
}
if (t >= 2) {
r += 2;
t >>>= 2;
}
return r + t;
};
s.prototype._zeroBits = function(e) {
if (0 === e) return 26;
var t = e, r = 0;
if (0 == (8191 & t)) {
r += 13;
t >>>= 13;
}
if (0 == (127 & t)) {
r += 7;
t >>>= 7;
}
if (0 == (15 & t)) {
r += 4;
t >>>= 4;
}
if (0 == (3 & t)) {
r += 2;
t >>>= 2;
}
0 == (1 & t) && r++;
return r;
};
s.prototype.bitLength = function() {
var e = this.words[this.length - 1], t = this._countBits(e);
return 26 * (this.length - 1) + t;
};
function m(e) {
for (var t = new Array(e.bitLength()), r = 0; r < t.length; r++) {
var i = r / 26 | 0, n = r % 26;
t[r] = e.words[i] >>> n & 1;
}
return t;
}
s.prototype.zeroBits = function() {
if (this.isZero()) return 0;
for (var e = 0, t = 0; t < this.length; t++) {
var r = this._zeroBits(this.words[t]);
e += r;
if (26 !== r) break;
}
return e;
};
s.prototype.byteLength = function() {
return Math.ceil(this.bitLength() / 8);
};
s.prototype.toTwos = function(e) {
return 0 !== this.negative ? this.abs().inotn(e).iaddn(1) : this.clone();
};
s.prototype.fromTwos = function(e) {
return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
};
s.prototype.isNeg = function() {
return 0 !== this.negative;
};
s.prototype.neg = function() {
return this.clone().ineg();
};
s.prototype.ineg = function() {
this.isZero() || (this.negative ^= 1);
return this;
};
s.prototype.iuor = function(e) {
for (;this.length < e.length; ) this.words[this.length++] = 0;
for (var t = 0; t < e.length; t++) this.words[t] = this.words[t] | e.words[t];
return this._strip();
};
s.prototype.ior = function(e) {
i(0 == (this.negative | e.negative));
return this.iuor(e);
};
s.prototype.or = function(e) {
return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this);
};
s.prototype.uor = function(e) {
return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this);
};
s.prototype.iuand = function(e) {
var t;
t = this.length > e.length ? e : this;
for (var r = 0; r < t.length; r++) this.words[r] = this.words[r] & e.words[r];
this.length = t.length;
return this._strip();
};
s.prototype.iand = function(e) {
i(0 == (this.negative | e.negative));
return this.iuand(e);
};
s.prototype.and = function(e) {
return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this);
};
s.prototype.uand = function(e) {
return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this);
};
s.prototype.iuxor = function(e) {
var t, r;
if (this.length > e.length) {
t = this;
r = e;
} else {
t = e;
r = this;
}
for (var i = 0; i < r.length; i++) this.words[i] = t.words[i] ^ r.words[i];
if (this !== t) for (;i < t.length; i++) this.words[i] = t.words[i];
this.length = t.length;
return this._strip();
};
s.prototype.ixor = function(e) {
i(0 == (this.negative | e.negative));
return this.iuxor(e);
};
s.prototype.xor = function(e) {
return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this);
};
s.prototype.uxor = function(e) {
return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this);
};
s.prototype.inotn = function(e) {
i("number" == typeof e && e >= 0);
var t = 0 | Math.ceil(e / 26), r = e % 26;
this._expand(t);
r > 0 && t--;
for (var n = 0; n < t; n++) this.words[n] = 67108863 & ~this.words[n];
r > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - r);
return this._strip();
};
s.prototype.notn = function(e) {
return this.clone().inotn(e);
};
s.prototype.setn = function(e, t) {
i("number" == typeof e && e >= 0);
var r = e / 26 | 0, n = e % 26;
this._expand(r + 1);
this.words[r] = t ? this.words[r] | 1 << n : this.words[r] & ~(1 << n);
return this._strip();
};
s.prototype.iadd = function(e) {
var t, r, i;
if (0 !== this.negative && 0 === e.negative) {
this.negative = 0;
t = this.isub(e);
this.negative ^= 1;
return this._normSign();
}
if (0 === this.negative && 0 !== e.negative) {
e.negative = 0;
t = this.isub(e);
e.negative = 1;
return t._normSign();
}
if (this.length > e.length) {
r = this;
i = e;
} else {
r = e;
i = this;
}
for (var n = 0, s = 0; s < i.length; s++) {
t = (0 | r.words[s]) + (0 | i.words[s]) + n;
this.words[s] = 67108863 & t;
n = t >>> 26;
}
for (;0 !== n && s < r.length; s++) {
t = (0 | r.words[s]) + n;
this.words[s] = 67108863 & t;
n = t >>> 26;
}
this.length = r.length;
if (0 !== n) {
this.words[this.length] = n;
this.length++;
} else if (r !== this) for (;s < r.length; s++) this.words[s] = r.words[s];
return this;
};
s.prototype.add = function(e) {
var t;
if (0 !== e.negative && 0 === this.negative) {
e.negative = 0;
t = this.sub(e);
e.negative ^= 1;
return t;
}
if (0 === e.negative && 0 !== this.negative) {
this.negative = 0;
t = e.sub(this);
this.negative = 1;
return t;
}
return this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this);
};
s.prototype.isub = function(e) {
if (0 !== e.negative) {
e.negative = 0;
var t = this.iadd(e);
e.negative = 1;
return t._normSign();
}
if (0 !== this.negative) {
this.negative = 0;
this.iadd(e);
this.negative = 1;
return this._normSign();
}
var r, i, n = this.cmp(e);
if (0 === n) {
this.negative = 0;
this.length = 1;
this.words[0] = 0;
return this;
}
if (n > 0) {
r = this;
i = e;
} else {
r = e;
i = this;
}
for (var s = 0, o = 0; o < i.length; o++) {
s = (t = (0 | r.words[o]) - (0 | i.words[o]) + s) >> 26;
this.words[o] = 67108863 & t;
}
for (;0 !== s && o < r.length; o++) {
s = (t = (0 | r.words[o]) + s) >> 26;
this.words[o] = 67108863 & t;
}
if (0 === s && o < r.length && r !== this) for (;o < r.length; o++) this.words[o] = r.words[o];
this.length = Math.max(this.length, o);
r !== this && (this.negative = 1);
return this._strip();
};
s.prototype.sub = function(e) {
return this.clone().isub(e);
};
function g(e, t, r) {
r.negative = t.negative ^ e.negative;
var i = e.length + t.length | 0;
r.length = i;
i = i - 1 | 0;
var n = 0 | e.words[0], s = 0 | t.words[0], o = n * s, a = 67108863 & o, f = o / 67108864 | 0;
r.words[0] = a;
for (var c = 1; c < i; c++) {
for (var u = f >>> 26, h = 67108863 & f, d = Math.min(c, t.length - 1), l = Math.max(0, c - e.length + 1); l <= d; l++) {
var p = c - l | 0;
u += (o = (n = 0 | e.words[p]) * (s = 0 | t.words[l]) + h) / 67108864 | 0;
h = 67108863 & o;
}
r.words[c] = 0 | h;
f = 0 | u;
}
0 !== f ? r.words[c] = 0 | f : r.length--;
return r._strip();
}
var y = function(e, t, r) {
var i, n, s, o = e.words, a = t.words, f = r.words, c = 0, u = 0 | o[0], h = 8191 & u, d = u >>> 13, l = 0 | o[1], p = 8191 & l, b = l >>> 13, m = 0 | o[2], g = 8191 & m, y = m >>> 13, v = 0 | o[3], w = 8191 & v, _ = v >>> 13, S = 0 | o[4], E = 8191 & S, M = S >>> 13, A = 0 | o[5], k = 8191 & A, R = A >>> 13, x = 0 | o[6], I = 8191 & x, T = x >>> 13, B = 0 | o[7], j = 8191 & B, N = B >>> 13, P = 0 | o[8], C = 8191 & P, L = P >>> 13, O = 0 | o[9], D = 8191 & O, U = O >>> 13, q = 0 | a[0], F = 8191 & q, z = q >>> 13, $ = 0 | a[1], K = 8191 & $, H = $ >>> 13, W = 0 | a[2], V = 8191 & W, G = W >>> 13, X = 0 | a[3], Y = 8191 & X, J = X >>> 13, Z = 0 | a[4], Q = 8191 & Z, ee = Z >>> 13, te = 0 | a[5], re = 8191 & te, ie = te >>> 13, ne = 0 | a[6], se = 8191 & ne, oe = ne >>> 13, ae = 0 | a[7], fe = 8191 & ae, ce = ae >>> 13, ue = 0 | a[8], he = 8191 & ue, de = ue >>> 13, le = 0 | a[9], pe = 8191 & le, be = le >>> 13;
r.negative = e.negative ^ t.negative;
r.length = 19;
var me = (c + (i = Math.imul(h, F)) | 0) + ((8191 & (n = (n = Math.imul(h, z)) + Math.imul(d, F) | 0)) << 13) | 0;
c = ((s = Math.imul(d, z)) + (n >>> 13) | 0) + (me >>> 26) | 0;
me &= 67108863;
i = Math.imul(p, F);
n = (n = Math.imul(p, z)) + Math.imul(b, F) | 0;
s = Math.imul(b, z);
var ge = (c + (i = i + Math.imul(h, K) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, H) | 0) + Math.imul(d, K) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, H) | 0) + (n >>> 13) | 0) + (ge >>> 26) | 0;
ge &= 67108863;
i = Math.imul(g, F);
n = (n = Math.imul(g, z)) + Math.imul(y, F) | 0;
s = Math.imul(y, z);
i = i + Math.imul(p, K) | 0;
n = (n = n + Math.imul(p, H) | 0) + Math.imul(b, K) | 0;
s = s + Math.imul(b, H) | 0;
var ye = (c + (i = i + Math.imul(h, V) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, G) | 0) + Math.imul(d, V) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, G) | 0) + (n >>> 13) | 0) + (ye >>> 26) | 0;
ye &= 67108863;
i = Math.imul(w, F);
n = (n = Math.imul(w, z)) + Math.imul(_, F) | 0;
s = Math.imul(_, z);
i = i + Math.imul(g, K) | 0;
n = (n = n + Math.imul(g, H) | 0) + Math.imul(y, K) | 0;
s = s + Math.imul(y, H) | 0;
i = i + Math.imul(p, V) | 0;
n = (n = n + Math.imul(p, G) | 0) + Math.imul(b, V) | 0;
s = s + Math.imul(b, G) | 0;
var ve = (c + (i = i + Math.imul(h, Y) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, J) | 0) + Math.imul(d, Y) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, J) | 0) + (n >>> 13) | 0) + (ve >>> 26) | 0;
ve &= 67108863;
i = Math.imul(E, F);
n = (n = Math.imul(E, z)) + Math.imul(M, F) | 0;
s = Math.imul(M, z);
i = i + Math.imul(w, K) | 0;
n = (n = n + Math.imul(w, H) | 0) + Math.imul(_, K) | 0;
s = s + Math.imul(_, H) | 0;
i = i + Math.imul(g, V) | 0;
n = (n = n + Math.imul(g, G) | 0) + Math.imul(y, V) | 0;
s = s + Math.imul(y, G) | 0;
i = i + Math.imul(p, Y) | 0;
n = (n = n + Math.imul(p, J) | 0) + Math.imul(b, Y) | 0;
s = s + Math.imul(b, J) | 0;
var we = (c + (i = i + Math.imul(h, Q) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ee) | 0) + Math.imul(d, Q) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, ee) | 0) + (n >>> 13) | 0) + (we >>> 26) | 0;
we &= 67108863;
i = Math.imul(k, F);
n = (n = Math.imul(k, z)) + Math.imul(R, F) | 0;
s = Math.imul(R, z);
i = i + Math.imul(E, K) | 0;
n = (n = n + Math.imul(E, H) | 0) + Math.imul(M, K) | 0;
s = s + Math.imul(M, H) | 0;
i = i + Math.imul(w, V) | 0;
n = (n = n + Math.imul(w, G) | 0) + Math.imul(_, V) | 0;
s = s + Math.imul(_, G) | 0;
i = i + Math.imul(g, Y) | 0;
n = (n = n + Math.imul(g, J) | 0) + Math.imul(y, Y) | 0;
s = s + Math.imul(y, J) | 0;
i = i + Math.imul(p, Q) | 0;
n = (n = n + Math.imul(p, ee) | 0) + Math.imul(b, Q) | 0;
s = s + Math.imul(b, ee) | 0;
var _e = (c + (i = i + Math.imul(h, re) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ie) | 0) + Math.imul(d, re) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, ie) | 0) + (n >>> 13) | 0) + (_e >>> 26) | 0;
_e &= 67108863;
i = Math.imul(I, F);
n = (n = Math.imul(I, z)) + Math.imul(T, F) | 0;
s = Math.imul(T, z);
i = i + Math.imul(k, K) | 0;
n = (n = n + Math.imul(k, H) | 0) + Math.imul(R, K) | 0;
s = s + Math.imul(R, H) | 0;
i = i + Math.imul(E, V) | 0;
n = (n = n + Math.imul(E, G) | 0) + Math.imul(M, V) | 0;
s = s + Math.imul(M, G) | 0;
i = i + Math.imul(w, Y) | 0;
n = (n = n + Math.imul(w, J) | 0) + Math.imul(_, Y) | 0;
s = s + Math.imul(_, J) | 0;
i = i + Math.imul(g, Q) | 0;
n = (n = n + Math.imul(g, ee) | 0) + Math.imul(y, Q) | 0;
s = s + Math.imul(y, ee) | 0;
i = i + Math.imul(p, re) | 0;
n = (n = n + Math.imul(p, ie) | 0) + Math.imul(b, re) | 0;
s = s + Math.imul(b, ie) | 0;
var Se = (c + (i = i + Math.imul(h, se) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, oe) | 0) + Math.imul(d, se) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, oe) | 0) + (n >>> 13) | 0) + (Se >>> 26) | 0;
Se &= 67108863;
i = Math.imul(j, F);
n = (n = Math.imul(j, z)) + Math.imul(N, F) | 0;
s = Math.imul(N, z);
i = i + Math.imul(I, K) | 0;
n = (n = n + Math.imul(I, H) | 0) + Math.imul(T, K) | 0;
s = s + Math.imul(T, H) | 0;
i = i + Math.imul(k, V) | 0;
n = (n = n + Math.imul(k, G) | 0) + Math.imul(R, V) | 0;
s = s + Math.imul(R, G) | 0;
i = i + Math.imul(E, Y) | 0;
n = (n = n + Math.imul(E, J) | 0) + Math.imul(M, Y) | 0;
s = s + Math.imul(M, J) | 0;
i = i + Math.imul(w, Q) | 0;
n = (n = n + Math.imul(w, ee) | 0) + Math.imul(_, Q) | 0;
s = s + Math.imul(_, ee) | 0;
i = i + Math.imul(g, re) | 0;
n = (n = n + Math.imul(g, ie) | 0) + Math.imul(y, re) | 0;
s = s + Math.imul(y, ie) | 0;
i = i + Math.imul(p, se) | 0;
n = (n = n + Math.imul(p, oe) | 0) + Math.imul(b, se) | 0;
s = s + Math.imul(b, oe) | 0;
var Ee = (c + (i = i + Math.imul(h, fe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ce) | 0) + Math.imul(d, fe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, ce) | 0) + (n >>> 13) | 0) + (Ee >>> 26) | 0;
Ee &= 67108863;
i = Math.imul(C, F);
n = (n = Math.imul(C, z)) + Math.imul(L, F) | 0;
s = Math.imul(L, z);
i = i + Math.imul(j, K) | 0;
n = (n = n + Math.imul(j, H) | 0) + Math.imul(N, K) | 0;
s = s + Math.imul(N, H) | 0;
i = i + Math.imul(I, V) | 0;
n = (n = n + Math.imul(I, G) | 0) + Math.imul(T, V) | 0;
s = s + Math.imul(T, G) | 0;
i = i + Math.imul(k, Y) | 0;
n = (n = n + Math.imul(k, J) | 0) + Math.imul(R, Y) | 0;
s = s + Math.imul(R, J) | 0;
i = i + Math.imul(E, Q) | 0;
n = (n = n + Math.imul(E, ee) | 0) + Math.imul(M, Q) | 0;
s = s + Math.imul(M, ee) | 0;
i = i + Math.imul(w, re) | 0;
n = (n = n + Math.imul(w, ie) | 0) + Math.imul(_, re) | 0;
s = s + Math.imul(_, ie) | 0;
i = i + Math.imul(g, se) | 0;
n = (n = n + Math.imul(g, oe) | 0) + Math.imul(y, se) | 0;
s = s + Math.imul(y, oe) | 0;
i = i + Math.imul(p, fe) | 0;
n = (n = n + Math.imul(p, ce) | 0) + Math.imul(b, fe) | 0;
s = s + Math.imul(b, ce) | 0;
var Me = (c + (i = i + Math.imul(h, he) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, de) | 0) + Math.imul(d, he) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, de) | 0) + (n >>> 13) | 0) + (Me >>> 26) | 0;
Me &= 67108863;
i = Math.imul(D, F);
n = (n = Math.imul(D, z)) + Math.imul(U, F) | 0;
s = Math.imul(U, z);
i = i + Math.imul(C, K) | 0;
n = (n = n + Math.imul(C, H) | 0) + Math.imul(L, K) | 0;
s = s + Math.imul(L, H) | 0;
i = i + Math.imul(j, V) | 0;
n = (n = n + Math.imul(j, G) | 0) + Math.imul(N, V) | 0;
s = s + Math.imul(N, G) | 0;
i = i + Math.imul(I, Y) | 0;
n = (n = n + Math.imul(I, J) | 0) + Math.imul(T, Y) | 0;
s = s + Math.imul(T, J) | 0;
i = i + Math.imul(k, Q) | 0;
n = (n = n + Math.imul(k, ee) | 0) + Math.imul(R, Q) | 0;
s = s + Math.imul(R, ee) | 0;
i = i + Math.imul(E, re) | 0;
n = (n = n + Math.imul(E, ie) | 0) + Math.imul(M, re) | 0;
s = s + Math.imul(M, ie) | 0;
i = i + Math.imul(w, se) | 0;
n = (n = n + Math.imul(w, oe) | 0) + Math.imul(_, se) | 0;
s = s + Math.imul(_, oe) | 0;
i = i + Math.imul(g, fe) | 0;
n = (n = n + Math.imul(g, ce) | 0) + Math.imul(y, fe) | 0;
s = s + Math.imul(y, ce) | 0;
i = i + Math.imul(p, he) | 0;
n = (n = n + Math.imul(p, de) | 0) + Math.imul(b, he) | 0;
s = s + Math.imul(b, de) | 0;
var Ae = (c + (i = i + Math.imul(h, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, be) | 0) + Math.imul(d, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(d, be) | 0) + (n >>> 13) | 0) + (Ae >>> 26) | 0;
Ae &= 67108863;
i = Math.imul(D, K);
n = (n = Math.imul(D, H)) + Math.imul(U, K) | 0;
s = Math.imul(U, H);
i = i + Math.imul(C, V) | 0;
n = (n = n + Math.imul(C, G) | 0) + Math.imul(L, V) | 0;
s = s + Math.imul(L, G) | 0;
i = i + Math.imul(j, Y) | 0;
n = (n = n + Math.imul(j, J) | 0) + Math.imul(N, Y) | 0;
s = s + Math.imul(N, J) | 0;
i = i + Math.imul(I, Q) | 0;
n = (n = n + Math.imul(I, ee) | 0) + Math.imul(T, Q) | 0;
s = s + Math.imul(T, ee) | 0;
i = i + Math.imul(k, re) | 0;
n = (n = n + Math.imul(k, ie) | 0) + Math.imul(R, re) | 0;
s = s + Math.imul(R, ie) | 0;
i = i + Math.imul(E, se) | 0;
n = (n = n + Math.imul(E, oe) | 0) + Math.imul(M, se) | 0;
s = s + Math.imul(M, oe) | 0;
i = i + Math.imul(w, fe) | 0;
n = (n = n + Math.imul(w, ce) | 0) + Math.imul(_, fe) | 0;
s = s + Math.imul(_, ce) | 0;
i = i + Math.imul(g, he) | 0;
n = (n = n + Math.imul(g, de) | 0) + Math.imul(y, he) | 0;
s = s + Math.imul(y, de) | 0;
var ke = (c + (i = i + Math.imul(p, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, be) | 0) + Math.imul(b, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(b, be) | 0) + (n >>> 13) | 0) + (ke >>> 26) | 0;
ke &= 67108863;
i = Math.imul(D, V);
n = (n = Math.imul(D, G)) + Math.imul(U, V) | 0;
s = Math.imul(U, G);
i = i + Math.imul(C, Y) | 0;
n = (n = n + Math.imul(C, J) | 0) + Math.imul(L, Y) | 0;
s = s + Math.imul(L, J) | 0;
i = i + Math.imul(j, Q) | 0;
n = (n = n + Math.imul(j, ee) | 0) + Math.imul(N, Q) | 0;
s = s + Math.imul(N, ee) | 0;
i = i + Math.imul(I, re) | 0;
n = (n = n + Math.imul(I, ie) | 0) + Math.imul(T, re) | 0;
s = s + Math.imul(T, ie) | 0;
i = i + Math.imul(k, se) | 0;
n = (n = n + Math.imul(k, oe) | 0) + Math.imul(R, se) | 0;
s = s + Math.imul(R, oe) | 0;
i = i + Math.imul(E, fe) | 0;
n = (n = n + Math.imul(E, ce) | 0) + Math.imul(M, fe) | 0;
s = s + Math.imul(M, ce) | 0;
i = i + Math.imul(w, he) | 0;
n = (n = n + Math.imul(w, de) | 0) + Math.imul(_, he) | 0;
s = s + Math.imul(_, de) | 0;
var Re = (c + (i = i + Math.imul(g, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(g, be) | 0) + Math.imul(y, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(y, be) | 0) + (n >>> 13) | 0) + (Re >>> 26) | 0;
Re &= 67108863;
i = Math.imul(D, Y);
n = (n = Math.imul(D, J)) + Math.imul(U, Y) | 0;
s = Math.imul(U, J);
i = i + Math.imul(C, Q) | 0;
n = (n = n + Math.imul(C, ee) | 0) + Math.imul(L, Q) | 0;
s = s + Math.imul(L, ee) | 0;
i = i + Math.imul(j, re) | 0;
n = (n = n + Math.imul(j, ie) | 0) + Math.imul(N, re) | 0;
s = s + Math.imul(N, ie) | 0;
i = i + Math.imul(I, se) | 0;
n = (n = n + Math.imul(I, oe) | 0) + Math.imul(T, se) | 0;
s = s + Math.imul(T, oe) | 0;
i = i + Math.imul(k, fe) | 0;
n = (n = n + Math.imul(k, ce) | 0) + Math.imul(R, fe) | 0;
s = s + Math.imul(R, ce) | 0;
i = i + Math.imul(E, he) | 0;
n = (n = n + Math.imul(E, de) | 0) + Math.imul(M, he) | 0;
s = s + Math.imul(M, de) | 0;
var xe = (c + (i = i + Math.imul(w, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(w, be) | 0) + Math.imul(_, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(_, be) | 0) + (n >>> 13) | 0) + (xe >>> 26) | 0;
xe &= 67108863;
i = Math.imul(D, Q);
n = (n = Math.imul(D, ee)) + Math.imul(U, Q) | 0;
s = Math.imul(U, ee);
i = i + Math.imul(C, re) | 0;
n = (n = n + Math.imul(C, ie) | 0) + Math.imul(L, re) | 0;
s = s + Math.imul(L, ie) | 0;
i = i + Math.imul(j, se) | 0;
n = (n = n + Math.imul(j, oe) | 0) + Math.imul(N, se) | 0;
s = s + Math.imul(N, oe) | 0;
i = i + Math.imul(I, fe) | 0;
n = (n = n + Math.imul(I, ce) | 0) + Math.imul(T, fe) | 0;
s = s + Math.imul(T, ce) | 0;
i = i + Math.imul(k, he) | 0;
n = (n = n + Math.imul(k, de) | 0) + Math.imul(R, he) | 0;
s = s + Math.imul(R, de) | 0;
var Ie = (c + (i = i + Math.imul(E, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(E, be) | 0) + Math.imul(M, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(M, be) | 0) + (n >>> 13) | 0) + (Ie >>> 26) | 0;
Ie &= 67108863;
i = Math.imul(D, re);
n = (n = Math.imul(D, ie)) + Math.imul(U, re) | 0;
s = Math.imul(U, ie);
i = i + Math.imul(C, se) | 0;
n = (n = n + Math.imul(C, oe) | 0) + Math.imul(L, se) | 0;
s = s + Math.imul(L, oe) | 0;
i = i + Math.imul(j, fe) | 0;
n = (n = n + Math.imul(j, ce) | 0) + Math.imul(N, fe) | 0;
s = s + Math.imul(N, ce) | 0;
i = i + Math.imul(I, he) | 0;
n = (n = n + Math.imul(I, de) | 0) + Math.imul(T, he) | 0;
s = s + Math.imul(T, de) | 0;
var Te = (c + (i = i + Math.imul(k, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(k, be) | 0) + Math.imul(R, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(R, be) | 0) + (n >>> 13) | 0) + (Te >>> 26) | 0;
Te &= 67108863;
i = Math.imul(D, se);
n = (n = Math.imul(D, oe)) + Math.imul(U, se) | 0;
s = Math.imul(U, oe);
i = i + Math.imul(C, fe) | 0;
n = (n = n + Math.imul(C, ce) | 0) + Math.imul(L, fe) | 0;
s = s + Math.imul(L, ce) | 0;
i = i + Math.imul(j, he) | 0;
n = (n = n + Math.imul(j, de) | 0) + Math.imul(N, he) | 0;
s = s + Math.imul(N, de) | 0;
var Be = (c + (i = i + Math.imul(I, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(I, be) | 0) + Math.imul(T, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(T, be) | 0) + (n >>> 13) | 0) + (Be >>> 26) | 0;
Be &= 67108863;
i = Math.imul(D, fe);
n = (n = Math.imul(D, ce)) + Math.imul(U, fe) | 0;
s = Math.imul(U, ce);
i = i + Math.imul(C, he) | 0;
n = (n = n + Math.imul(C, de) | 0) + Math.imul(L, he) | 0;
s = s + Math.imul(L, de) | 0;
var je = (c + (i = i + Math.imul(j, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(j, be) | 0) + Math.imul(N, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(N, be) | 0) + (n >>> 13) | 0) + (je >>> 26) | 0;
je &= 67108863;
i = Math.imul(D, he);
n = (n = Math.imul(D, de)) + Math.imul(U, he) | 0;
s = Math.imul(U, de);
var Ne = (c + (i = i + Math.imul(C, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(C, be) | 0) + Math.imul(L, pe) | 0)) << 13) | 0;
c = ((s = s + Math.imul(L, be) | 0) + (n >>> 13) | 0) + (Ne >>> 26) | 0;
Ne &= 67108863;
var Pe = (c + (i = Math.imul(D, pe)) | 0) + ((8191 & (n = (n = Math.imul(D, be)) + Math.imul(U, pe) | 0)) << 13) | 0;
c = ((s = Math.imul(U, be)) + (n >>> 13) | 0) + (Pe >>> 26) | 0;
Pe &= 67108863;
f[0] = me;
f[1] = ge;
f[2] = ye;
f[3] = ve;
f[4] = we;
f[5] = _e;
f[6] = Se;
f[7] = Ee;
f[8] = Me;
f[9] = Ae;
f[10] = ke;
f[11] = Re;
f[12] = xe;
f[13] = Ie;
f[14] = Te;
f[15] = Be;
f[16] = je;
f[17] = Ne;
f[18] = Pe;
if (0 !== c) {
f[19] = c;
r.length++;
}
return r;
};
Math.imul || (y = g);
function v(e, t, r) {
r.negative = t.negative ^ e.negative;
r.length = e.length + t.length;
for (var i = 0, n = 0, s = 0; s < r.length - 1; s++) {
var o = n;
n = 0;
for (var a = 67108863 & i, f = Math.min(s, t.length - 1), c = Math.max(0, s - e.length + 1); c <= f; c++) {
var u = s - c, h = (0 | e.words[u]) * (0 | t.words[c]), d = 67108863 & h;
a = 67108863 & (d = d + a | 0);
n += (o = (o = o + (h / 67108864 | 0) | 0) + (d >>> 26) | 0) >>> 26;
o &= 67108863;
}
r.words[s] = a;
i = o;
o = n;
}
0 !== i ? r.words[s] = i : r.length--;
return r._strip();
}
function w(e, t, r) {
return v(e, t, r);
}
s.prototype.mulTo = function(e, t) {
var r = this.length + e.length;
return 10 === this.length && 10 === e.length ? y(this, e, t) : r < 63 ? g(this, e, t) : r < 1024 ? v(this, e, t) : w(this, e, t);
};
function _(e, t) {
this.x = e;
this.y = t;
}
_.prototype.makeRBT = function(e) {
for (var t = new Array(e), r = s.prototype._countBits(e) - 1, i = 0; i < e; i++) t[i] = this.revBin(i, r, e);
return t;
};
_.prototype.revBin = function(e, t, r) {
if (0 === e || e === r - 1) return e;
for (var i = 0, n = 0; n < t; n++) {
i |= (1 & e) << t - n - 1;
e >>= 1;
}
return i;
};
_.prototype.permute = function(e, t, r, i, n, s) {
for (var o = 0; o < s; o++) {
i[o] = t[e[o]];
n[o] = r[e[o]];
}
};
_.prototype.transform = function(e, t, r, i, n, s) {
this.permute(s, e, t, r, i, n);
for (var o = 1; o < n; o <<= 1) for (var a = o << 1, f = Math.cos(2 * Math.PI / a), c = Math.sin(2 * Math.PI / a), u = 0; u < n; u += a) for (var h = f, d = c, l = 0; l < o; l++) {
var p = r[u + l], b = i[u + l], m = r[u + l + o], g = i[u + l + o], y = h * m - d * g;
g = h * g + d * m;
m = y;
r[u + l] = p + m;
i[u + l] = b + g;
r[u + l + o] = p - m;
i[u + l + o] = b - g;
if (l !== a) {
y = f * h - c * d;
d = f * d + c * h;
h = y;
}
}
};
_.prototype.guessLen13b = function(e, t) {
var r = 1 | Math.max(t, e), i = 1 & r, n = 0;
for (r = r / 2 | 0; r; r >>>= 1) n++;
return 1 << n + 1 + i;
};
_.prototype.conjugate = function(e, t, r) {
if (!(r <= 1)) for (var i = 0; i < r / 2; i++) {
var n = e[i];
e[i] = e[r - i - 1];
e[r - i - 1] = n;
n = t[i];
t[i] = -t[r - i - 1];
t[r - i - 1] = -n;
}
};
_.prototype.normalize13b = function(e, t) {
for (var r = 0, i = 0; i < t / 2; i++) {
var n = 8192 * Math.round(e[2 * i + 1] / t) + Math.round(e[2 * i] / t) + r;
e[i] = 67108863 & n;
r = n < 67108864 ? 0 : n / 67108864 | 0;
}
return e;
};
_.prototype.convert13b = function(e, t, r, n) {
for (var s = 0, o = 0; o < t; o++) {
s += 0 | e[o];
r[2 * o] = 8191 & s;
s >>>= 13;
r[2 * o + 1] = 8191 & s;
s >>>= 13;
}
for (o = 2 * t; o < n; ++o) r[o] = 0;
i(0 === s);
i(0 == (-8192 & s));
};
_.prototype.stub = function(e) {
for (var t = new Array(e), r = 0; r < e; r++) t[r] = 0;
return t;
};
_.prototype.mulp = function(e, t, r) {
var i = 2 * this.guessLen13b(e.length, t.length), n = this.makeRBT(i), s = this.stub(i), o = new Array(i), a = new Array(i), f = new Array(i), c = new Array(i), u = new Array(i), h = new Array(i), d = r.words;
d.length = i;
this.convert13b(e.words, e.length, o, i);
this.convert13b(t.words, t.length, c, i);
this.transform(o, s, a, f, i, n);
this.transform(c, s, u, h, i, n);
for (var l = 0; l < i; l++) {
var p = a[l] * u[l] - f[l] * h[l];
f[l] = a[l] * h[l] + f[l] * u[l];
a[l] = p;
}
this.conjugate(a, f, i);
this.transform(a, f, d, s, i, n);
this.conjugate(d, s, i);
this.normalize13b(d, i);
r.negative = e.negative ^ t.negative;
r.length = e.length + t.length;
return r._strip();
};
s.prototype.mul = function(e) {
var t = new s(null);
t.words = new Array(this.length + e.length);
return this.mulTo(e, t);
};
s.prototype.mulf = function(e) {
var t = new s(null);
t.words = new Array(this.length + e.length);
return w(this, e, t);
};
s.prototype.imul = function(e) {
return this.clone().mulTo(e, this);
};
s.prototype.imuln = function(e) {
var t = e < 0;
t && (e = -e);
i("number" == typeof e);
i(e < 67108864);
for (var r = 0, n = 0; n < this.length; n++) {
var s = (0 | this.words[n]) * e, o = (67108863 & s) + (67108863 & r);
r >>= 26;
r += s / 67108864 | 0;
r += o >>> 26;
this.words[n] = 67108863 & o;
}
if (0 !== r) {
this.words[n] = r;
this.length++;
}
return t ? this.ineg() : this;
};
s.prototype.muln = function(e) {
return this.clone().imuln(e);
};
s.prototype.sqr = function() {
return this.mul(this);
};
s.prototype.isqr = function() {
return this.imul(this.clone());
};
s.prototype.pow = function(e) {
var t = m(e);
if (0 === t.length) return new s(1);
for (var r = this, i = 0; i < t.length && 0 === t[i]; i++, r = r.sqr()) ;
if (++i < t.length) for (var n = r.sqr(); i < t.length; i++, n = n.sqr()) 0 !== t[i] && (r = r.mul(n));
return r;
};
s.prototype.iushln = function(e) {
i("number" == typeof e && e >= 0);
var t, r = e % 26, n = (e - r) / 26, s = 67108863 >>> 26 - r << 26 - r;
if (0 !== r) {
var o = 0;
for (t = 0; t < this.length; t++) {
var a = this.words[t] & s, f = (0 | this.words[t]) - a << r;
this.words[t] = f | o;
o = a >>> 26 - r;
}
if (o) {
this.words[t] = o;
this.length++;
}
}
if (0 !== n) {
for (t = this.length - 1; t >= 0; t--) this.words[t + n] = this.words[t];
for (t = 0; t < n; t++) this.words[t] = 0;
this.length += n;
}
return this._strip();
};
s.prototype.ishln = function(e) {
i(0 === this.negative);
return this.iushln(e);
};
s.prototype.iushrn = function(e, t, r) {
i("number" == typeof e && e >= 0);
var n;
n = t ? (t - t % 26) / 26 : 0;
var s = e % 26, o = Math.min((e - s) / 26, this.length), a = 67108863 ^ 67108863 >>> s << s, f = r;
n -= o;
n = Math.max(0, n);
if (f) {
for (var c = 0; c < o; c++) f.words[c] = this.words[c];
f.length = o;
}
if (0 === o) ; else if (this.length > o) {
this.length -= o;
for (c = 0; c < this.length; c++) this.words[c] = this.words[c + o];
} else {
this.words[0] = 0;
this.length = 1;
}
var u = 0;
for (c = this.length - 1; c >= 0 && (0 !== u || c >= n); c--) {
var h = 0 | this.words[c];
this.words[c] = u << 26 - s | h >>> s;
u = h & a;
}
f && 0 !== u && (f.words[f.length++] = u);
if (0 === this.length) {
this.words[0] = 0;
this.length = 1;
}
return this._strip();
};
s.prototype.ishrn = function(e, t, r) {
i(0 === this.negative);
return this.iushrn(e, t, r);
};
s.prototype.shln = function(e) {
return this.clone().ishln(e);
};
s.prototype.ushln = function(e) {
return this.clone().iushln(e);
};
s.prototype.shrn = function(e) {
return this.clone().ishrn(e);
};
s.prototype.ushrn = function(e) {
return this.clone().iushrn(e);
};
s.prototype.testn = function(e) {
i("number" == typeof e && e >= 0);
var t = e % 26, r = (e - t) / 26, n = 1 << t;
return !(this.length <= r || !(this.words[r] & n));
};
s.prototype.imaskn = function(e) {
i("number" == typeof e && e >= 0);
var t = e % 26, r = (e - t) / 26;
i(0 === this.negative, "imaskn works only with positive numbers");
if (this.length <= r) return this;
0 !== t && r++;
this.length = Math.min(r, this.length);
if (0 !== t) {
var n = 67108863 ^ 67108863 >>> t << t;
this.words[this.length - 1] &= n;
}
return this._strip();
};
s.prototype.maskn = function(e) {
return this.clone().imaskn(e);
};
s.prototype.iaddn = function(e) {
i("number" == typeof e);
i(e < 67108864);
if (e < 0) return this.isubn(-e);
if (0 !== this.negative) {
if (1 === this.length && (0 | this.words[0]) <= e) {
this.words[0] = e - (0 | this.words[0]);
this.negative = 0;
return this;
}
this.negative = 0;
this.isubn(e);
this.negative = 1;
return this;
}
return this._iaddn(e);
};
s.prototype._iaddn = function(e) {
this.words[0] += e;
for (var t = 0; t < this.length && this.words[t] >= 67108864; t++) {
this.words[t] -= 67108864;
t === this.length - 1 ? this.words[t + 1] = 1 : this.words[t + 1]++;
}
this.length = Math.max(this.length, t + 1);
return this;
};
s.prototype.isubn = function(e) {
i("number" == typeof e);
i(e < 67108864);
if (e < 0) return this.iaddn(-e);
if (0 !== this.negative) {
this.negative = 0;
this.iaddn(e);
this.negative = 1;
return this;
}
this.words[0] -= e;
if (1 === this.length && this.words[0] < 0) {
this.words[0] = -this.words[0];
this.negative = 1;
} else for (var t = 0; t < this.length && this.words[t] < 0; t++) {
this.words[t] += 67108864;
this.words[t + 1] -= 1;
}
return this._strip();
};
s.prototype.addn = function(e) {
return this.clone().iaddn(e);
};
s.prototype.subn = function(e) {
return this.clone().isubn(e);
};
s.prototype.iabs = function() {
this.negative = 0;
return this;
};
s.prototype.abs = function() {
return this.clone().iabs();
};
s.prototype._ishlnsubmul = function(e, t, r) {
var n, s, o = e.length + r;
this._expand(o);
var a = 0;
for (n = 0; n < e.length; n++) {
s = (0 | this.words[n + r]) + a;
var f = (0 | e.words[n]) * t;
a = ((s -= 67108863 & f) >> 26) - (f / 67108864 | 0);
this.words[n + r] = 67108863 & s;
}
for (;n < this.length - r; n++) {
a = (s = (0 | this.words[n + r]) + a) >> 26;
this.words[n + r] = 67108863 & s;
}
if (0 === a) return this._strip();
i(-1 === a);
a = 0;
for (n = 0; n < this.length; n++) {
a = (s = -(0 | this.words[n]) + a) >> 26;
this.words[n] = 67108863 & s;
}
this.negative = 1;
return this._strip();
};
s.prototype._wordDiv = function(e, t) {
var r = (this.length, e.length), i = this.clone(), n = e, o = 0 | n.words[n.length - 1];
if (0 != (r = 26 - this._countBits(o))) {
n = n.ushln(r);
i.iushln(r);
o = 0 | n.words[n.length - 1];
}
var a, f = i.length - n.length;
if ("mod" !== t) {
(a = new s(null)).length = f + 1;
a.words = new Array(a.length);
for (var c = 0; c < a.length; c++) a.words[c] = 0;
}
var u = i.clone()._ishlnsubmul(n, 1, f);
if (0 === u.negative) {
i = u;
a && (a.words[f] = 1);
}
for (var h = f - 1; h >= 0; h--) {
var d = 67108864 * (0 | i.words[n.length + h]) + (0 | i.words[n.length + h - 1]);
d = Math.min(d / o | 0, 67108863);
i._ishlnsubmul(n, d, h);
for (;0 !== i.negative; ) {
d--;
i.negative = 0;
i._ishlnsubmul(n, 1, h);
i.isZero() || (i.negative ^= 1);
}
a && (a.words[h] = d);
}
a && a._strip();
i._strip();
"div" !== t && 0 !== r && i.iushrn(r);
return {
div: a || null,
mod: i
};
};
s.prototype.divmod = function(e, t, r) {
i(!e.isZero());
if (this.isZero()) return {
div: new s(0),
mod: new s(0)
};
var n, o, a;
if (0 !== this.negative && 0 === e.negative) {
a = this.neg().divmod(e, t);
"mod" !== t && (n = a.div.neg());
if ("div" !== t) {
o = a.mod.neg();
r && 0 !== o.negative && o.iadd(e);
}
return {
div: n,
mod: o
};
}
if (0 === this.negative && 0 !== e.negative) {
a = this.divmod(e.neg(), t);
"mod" !== t && (n = a.div.neg());
return {
div: n,
mod: a.mod
};
}
if (0 != (this.negative & e.negative)) {
a = this.neg().divmod(e.neg(), t);
if ("div" !== t) {
o = a.mod.neg();
r && 0 !== o.negative && o.isub(e);
}
return {
div: a.div,
mod: o
};
}
return e.length > this.length || this.cmp(e) < 0 ? {
div: new s(0),
mod: this
} : 1 === e.length ? "div" === t ? {
div: this.divn(e.words[0]),
mod: null
} : "mod" === t ? {
div: null,
mod: new s(this.modrn(e.words[0]))
} : {
div: this.divn(e.words[0]),
mod: new s(this.modrn(e.words[0]))
} : this._wordDiv(e, t);
};
s.prototype.div = function(e) {
return this.divmod(e, "div", !1).div;
};
s.prototype.mod = function(e) {
return this.divmod(e, "mod", !1).mod;
};
s.prototype.umod = function(e) {
return this.divmod(e, "mod", !0).mod;
};
s.prototype.divRound = function(e) {
var t = this.divmod(e);
if (t.mod.isZero()) return t.div;
var r = 0 !== t.div.negative ? t.mod.isub(e) : t.mod, i = e.ushrn(1), n = e.andln(1), s = r.cmp(i);
return s < 0 || 1 === n && 0 === s ? t.div : 0 !== t.div.negative ? t.div.isubn(1) : t.div.iaddn(1);
};
s.prototype.modrn = function(e) {
var t = e < 0;
t && (e = -e);
i(e <= 67108863);
for (var r = (1 << 26) % e, n = 0, s = this.length - 1; s >= 0; s--) n = (r * n + (0 | this.words[s])) % e;
return t ? -n : n;
};
s.prototype.modn = function(e) {
return this.modrn(e);
};
s.prototype.idivn = function(e) {
var t = e < 0;
t && (e = -e);
i(e <= 67108863);
for (var r = 0, n = this.length - 1; n >= 0; n--) {
var s = (0 | this.words[n]) + 67108864 * r;
this.words[n] = s / e | 0;
r = s % e;
}
this._strip();
return t ? this.ineg() : this;
};
s.prototype.divn = function(e) {
return this.clone().idivn(e);
};
s.prototype.egcd = function(e) {
i(0 === e.negative);
i(!e.isZero());
var t = this, r = e.clone();
t = 0 !== t.negative ? t.umod(e) : t.clone();
for (var n = new s(1), o = new s(0), a = new s(0), f = new s(1), c = 0; t.isEven() && r.isEven(); ) {
t.iushrn(1);
r.iushrn(1);
++c;
}
for (var u = r.clone(), h = t.clone(); !t.isZero(); ) {
for (var d = 0, l = 1; 0 == (t.words[0] & l) && d < 26; ++d, l <<= 1) ;
if (d > 0) {
t.iushrn(d);
for (;d-- > 0; ) {
if (n.isOdd() || o.isOdd()) {
n.iadd(u);
o.isub(h);
}
n.iushrn(1);
o.iushrn(1);
}
}
for (var p = 0, b = 1; 0 == (r.words[0] & b) && p < 26; ++p, b <<= 1) ;
if (p > 0) {
r.iushrn(p);
for (;p-- > 0; ) {
if (a.isOdd() || f.isOdd()) {
a.iadd(u);
f.isub(h);
}
a.iushrn(1);
f.iushrn(1);
}
}
if (t.cmp(r) >= 0) {
t.isub(r);
n.isub(a);
o.isub(f);
} else {
r.isub(t);
a.isub(n);
f.isub(o);
}
}
return {
a: a,
b: f,
gcd: r.iushln(c)
};
};
s.prototype._invmp = function(e) {
i(0 === e.negative);
i(!e.isZero());
var t = this, r = e.clone();
t = 0 !== t.negative ? t.umod(e) : t.clone();
for (var n, o = new s(1), a = new s(0), f = r.clone(); t.cmpn(1) > 0 && r.cmpn(1) > 0; ) {
for (var c = 0, u = 1; 0 == (t.words[0] & u) && c < 26; ++c, u <<= 1) ;
if (c > 0) {
t.iushrn(c);
for (;c-- > 0; ) {
o.isOdd() && o.iadd(f);
o.iushrn(1);
}
}
for (var h = 0, d = 1; 0 == (r.words[0] & d) && h < 26; ++h, d <<= 1) ;
if (h > 0) {
r.iushrn(h);
for (;h-- > 0; ) {
a.isOdd() && a.iadd(f);
a.iushrn(1);
}
}
if (t.cmp(r) >= 0) {
t.isub(r);
o.isub(a);
} else {
r.isub(t);
a.isub(o);
}
}
(n = 0 === t.cmpn(1) ? o : a).cmpn(0) < 0 && n.iadd(e);
return n;
};
s.prototype.gcd = function(e) {
if (this.isZero()) return e.abs();
if (e.isZero()) return this.abs();
var t = this.clone(), r = e.clone();
t.negative = 0;
r.negative = 0;
for (var i = 0; t.isEven() && r.isEven(); i++) {
t.iushrn(1);
r.iushrn(1);
}
for (;;) {
for (;t.isEven(); ) t.iushrn(1);
for (;r.isEven(); ) r.iushrn(1);
var n = t.cmp(r);
if (n < 0) {
var s = t;
t = r;
r = s;
} else if (0 === n || 0 === r.cmpn(1)) break;
t.isub(r);
}
return r.iushln(i);
};
s.prototype.invm = function(e) {
return this.egcd(e).a.umod(e);
};
s.prototype.isEven = function() {
return 0 == (1 & this.words[0]);
};
s.prototype.isOdd = function() {
return 1 == (1 & this.words[0]);
};
s.prototype.andln = function(e) {
return this.words[0] & e;
};
s.prototype.bincn = function(e) {
i("number" == typeof e);
var t = e % 26, r = (e - t) / 26, n = 1 << t;
if (this.length <= r) {
this._expand(r + 1);
this.words[r] |= n;
return this;
}
for (var s = n, o = r; 0 !== s && o < this.length; o++) {
var a = 0 | this.words[o];
s = (a += s) >>> 26;
a &= 67108863;
this.words[o] = a;
}
if (0 !== s) {
this.words[o] = s;
this.length++;
}
return this;
};
s.prototype.isZero = function() {
return 1 === this.length && 0 === this.words[0];
};
s.prototype.cmpn = function(e) {
var t, r = e < 0;
if (0 !== this.negative && !r) return -1;
if (0 === this.negative && r) return 1;
this._strip();
if (this.length > 1) t = 1; else {
r && (e = -e);
i(e <= 67108863, "Number is too big");
var n = 0 | this.words[0];
t = n === e ? 0 : n < e ? -1 : 1;
}
return 0 !== this.negative ? 0 | -t : t;
};
s.prototype.cmp = function(e) {
if (0 !== this.negative && 0 === e.negative) return -1;
if (0 === this.negative && 0 !== e.negative) return 1;
var t = this.ucmp(e);
return 0 !== this.negative ? 0 | -t : t;
};
s.prototype.ucmp = function(e) {
if (this.length > e.length) return 1;
if (this.length < e.length) return -1;
for (var t = 0, r = this.length - 1; r >= 0; r--) {
var i = 0 | this.words[r], n = 0 | e.words[r];
if (i !== n) {
i < n ? t = -1 : i > n && (t = 1);
break;
}
}
return t;
};
s.prototype.gtn = function(e) {
return 1 === this.cmpn(e);
};
s.prototype.gt = function(e) {
return 1 === this.cmp(e);
};
s.prototype.gten = function(e) {
return this.cmpn(e) >= 0;
};
s.prototype.gte = function(e) {
return this.cmp(e) >= 0;
};
s.prototype.ltn = function(e) {
return -1 === this.cmpn(e);
};
s.prototype.lt = function(e) {
return -1 === this.cmp(e);
};
s.prototype.lten = function(e) {
return this.cmpn(e) <= 0;
};
s.prototype.lte = function(e) {
return this.cmp(e) <= 0;
};
s.prototype.eqn = function(e) {
return 0 === this.cmpn(e);
};
s.prototype.eq = function(e) {
return 0 === this.cmp(e);
};
s.red = function(e) {
return new x(e);
};
s.prototype.toRed = function(e) {
i(!this.red, "Already a number in reduction context");
i(0 === this.negative, "red works only with positives");
return e.convertTo(this)._forceRed(e);
};
s.prototype.fromRed = function() {
i(this.red, "fromRed works only with numbers in reduction context");
return this.red.convertFrom(this);
};
s.prototype._forceRed = function(e) {
this.red = e;
return this;
};
s.prototype.forceRed = function(e) {
i(!this.red, "Already a number in reduction context");
return this._forceRed(e);
};
s.prototype.redAdd = function(e) {
i(this.red, "redAdd works only with red numbers");
return this.red.add(this, e);
};
s.prototype.redIAdd = function(e) {
i(this.red, "redIAdd works only with red numbers");
return this.red.iadd(this, e);
};
s.prototype.redSub = function(e) {
i(this.red, "redSub works only with red numbers");
return this.red.sub(this, e);
};
s.prototype.redISub = function(e) {
i(this.red, "redISub works only with red numbers");
return this.red.isub(this, e);
};
s.prototype.redShl = function(e) {
i(this.red, "redShl works only with red numbers");
return this.red.shl(this, e);
};
s.prototype.redMul = function(e) {
i(this.red, "redMul works only with red numbers");
this.red._verify2(this, e);
return this.red.mul(this, e);
};
s.prototype.redIMul = function(e) {
i(this.red, "redMul works only with red numbers");
this.red._verify2(this, e);
return this.red.imul(this, e);
};
s.prototype.redSqr = function() {
i(this.red, "redSqr works only with red numbers");
this.red._verify1(this);
return this.red.sqr(this);
};
s.prototype.redISqr = function() {
i(this.red, "redISqr works only with red numbers");
this.red._verify1(this);
return this.red.isqr(this);
};
s.prototype.redSqrt = function() {
i(this.red, "redSqrt works only with red numbers");
this.red._verify1(this);
return this.red.sqrt(this);
};
s.prototype.redInvm = function() {
i(this.red, "redInvm works only with red numbers");
this.red._verify1(this);
return this.red.invm(this);
};
s.prototype.redNeg = function() {
i(this.red, "redNeg works only with red numbers");
this.red._verify1(this);
return this.red.neg(this);
};
s.prototype.redPow = function(e) {
i(this.red && !e.red, "redPow(normalNum)");
this.red._verify1(this);
return this.red.pow(this, e);
};
var S = {
k256: null,
p224: null,
p192: null,
p25519: null
};
function E(e, t) {
this.name = e;
this.p = new s(t, 16);
this.n = this.p.bitLength();
this.k = new s(1).iushln(this.n).isub(this.p);
this.tmp = this._tmp();
}
E.prototype._tmp = function() {
var e = new s(null);
e.words = new Array(Math.ceil(this.n / 13));
return e;
};
E.prototype.ireduce = function(e) {
var t, r = e;
do {
this.split(r, this.tmp);
t = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength();
} while (t > this.n);
var i = t < this.n ? -1 : r.ucmp(this.p);
if (0 === i) {
r.words[0] = 0;
r.length = 1;
} else i > 0 ? r.isub(this.p) : void 0 !== r.strip ? r.strip() : r._strip();
return r;
};
E.prototype.split = function(e, t) {
e.iushrn(this.n, 0, t);
};
E.prototype.imulK = function(e) {
return e.imul(this.k);
};
function M() {
E.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
}
n(M, E);
M.prototype.split = function(e, t) {
for (var r = Math.min(e.length, 9), i = 0; i < r; i++) t.words[i] = e.words[i];
t.length = r;
if (e.length <= 9) {
e.words[0] = 0;
e.length = 1;
} else {
var n = e.words[9];
t.words[t.length++] = 4194303 & n;
for (i = 10; i < e.length; i++) {
var s = 0 | e.words[i];
e.words[i - 10] = (4194303 & s) << 4 | n >>> 22;
n = s;
}
n >>>= 22;
e.words[i - 10] = n;
0 === n && e.length > 10 ? e.length -= 10 : e.length -= 9;
}
};
M.prototype.imulK = function(e) {
e.words[e.length] = 0;
e.words[e.length + 1] = 0;
e.length += 2;
for (var t = 0, r = 0; r < e.length; r++) {
var i = 0 | e.words[r];
t += 977 * i;
e.words[r] = 67108863 & t;
t = 64 * i + (t / 67108864 | 0);
}
if (0 === e.words[e.length - 1]) {
e.length--;
0 === e.words[e.length - 1] && e.length--;
}
return e;
};
function A() {
E.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
}
n(A, E);
function k() {
E.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
}
n(k, E);
function R() {
E.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
}
n(R, E);
R.prototype.imulK = function(e) {
for (var t = 0, r = 0; r < e.length; r++) {
var i = 19 * (0 | e.words[r]) + t, n = 67108863 & i;
i >>>= 26;
e.words[r] = n;
t = i;
}
0 !== t && (e.words[e.length++] = t);
return e;
};
s._prime = function(e) {
if (S[e]) return S[e];
var t;
if ("k256" === e) t = new M(); else if ("p224" === e) t = new A(); else if ("p192" === e) t = new k(); else {
if ("p25519" !== e) throw new Error("Unknown prime " + e);
t = new R();
}
S[e] = t;
return t;
};
function x(e) {
if ("string" == typeof e) {
var t = s._prime(e);
this.m = t.p;
this.prime = t;
} else {
i(e.gtn(1), "modulus must be greater than 1");
this.m = e;
this.prime = null;
}
}
x.prototype._verify1 = function(e) {
i(0 === e.negative, "red works only with positives");
i(e.red, "red works only with red numbers");
};
x.prototype._verify2 = function(e, t) {
i(0 == (e.negative | t.negative), "red works only with positives");
i(e.red && e.red === t.red, "red works only with red numbers");
};
x.prototype.imod = function(e) {
if (this.prime) return this.prime.ireduce(e)._forceRed(this);
u(e, e.umod(this.m)._forceRed(this));
return e;
};
x.prototype.neg = function(e) {
return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
};
x.prototype.add = function(e, t) {
this._verify2(e, t);
var r = e.add(t);
r.cmp(this.m) >= 0 && r.isub(this.m);
return r._forceRed(this);
};
x.prototype.iadd = function(e, t) {
this._verify2(e, t);
var r = e.iadd(t);
r.cmp(this.m) >= 0 && r.isub(this.m);
return r;
};
x.prototype.sub = function(e, t) {
this._verify2(e, t);
var r = e.sub(t);
r.cmpn(0) < 0 && r.iadd(this.m);
return r._forceRed(this);
};
x.prototype.isub = function(e, t) {
this._verify2(e, t);
var r = e.isub(t);
r.cmpn(0) < 0 && r.iadd(this.m);
return r;
};
x.prototype.shl = function(e, t) {
this._verify1(e);
return this.imod(e.ushln(t));
};
x.prototype.imul = function(e, t) {
this._verify2(e, t);
return this.imod(e.imul(t));
};
x.prototype.mul = function(e, t) {
this._verify2(e, t);
return this.imod(e.mul(t));
};
x.prototype.isqr = function(e) {
return this.imul(e, e.clone());
};
x.prototype.sqr = function(e) {
return this.mul(e, e);
};
x.prototype.sqrt = function(e) {
if (e.isZero()) return e.clone();
var t = this.m.andln(3);
i(t % 2 == 1);
if (3 === t) {
var r = this.m.add(new s(1)).iushrn(2);
return this.pow(e, r);
}
for (var n = this.m.subn(1), o = 0; !n.isZero() && 0 === n.andln(1); ) {
o++;
n.iushrn(1);
}
i(!n.isZero());
var a = new s(1).toRed(this), f = a.redNeg(), c = this.m.subn(1).iushrn(1), u = this.m.bitLength();
u = new s(2 * u * u).toRed(this);
for (;0 !== this.pow(u, c).cmp(f); ) u.redIAdd(f);
for (var h = this.pow(u, n), d = this.pow(e, n.addn(1).iushrn(1)), l = this.pow(e, n), p = o; 0 !== l.cmp(a); ) {
for (var b = l, m = 0; 0 !== b.cmp(a); m++) b = b.redSqr();
i(m < p);
var g = this.pow(h, new s(1).iushln(p - m - 1));
d = d.redMul(g);
h = g.redSqr();
l = l.redMul(h);
p = m;
}
return d;
};
x.prototype.invm = function(e) {
var t = e._invmp(this.m);
if (0 !== t.negative) {
t.negative = 0;
return this.imod(t).redNeg();
}
return this.imod(t);
};
x.prototype.pow = function(e, t) {
if (t.isZero()) return new s(1).toRed(this);
if (0 === t.cmpn(1)) return e.clone();
var r = new Array(16);
r[0] = new s(1).toRed(this);
r[1] = e;
for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], e);
var n = r[0], o = 0, a = 0, f = t.bitLength() % 26;
0 === f && (f = 26);
for (i = t.length - 1; i >= 0; i--) {
for (var c = t.words[i], u = f - 1; u >= 0; u--) {
var h = c >> u & 1;
n !== r[0] && (n = this.sqr(n));
if (0 !== h || 0 !== o) {
o <<= 1;
o |= h;
if (4 == ++a || 0 === i && 0 === u) {
n = this.mul(n, r[o]);
a = 0;
o = 0;
}
} else a = 0;
}
f = 26;
}
return n;
};
x.prototype.convertTo = function(e) {
var t = e.umod(this.m);
return t === e ? t.clone() : t;
};
x.prototype.convertFrom = function(e) {
var t = e.clone();
t.red = null;
return t;
};
s.mont = function(e) {
return new I(e);
};
function I(e) {
x.call(this, e);
this.shift = this.m.bitLength();
this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26);
this.r = new s(1).iushln(this.shift);
this.r2 = this.imod(this.r.sqr());
this.rinv = this.r._invmp(this.m);
this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
this.minv = this.minv.umod(this.r);
this.minv = this.r.sub(this.minv);
}
n(I, x);
I.prototype.convertTo = function(e) {
return this.imod(e.ushln(this.shift));
};
I.prototype.convertFrom = function(e) {
var t = this.imod(e.mul(this.rinv));
t.red = null;
return t;
};
I.prototype.imul = function(e, t) {
if (e.isZero() || t.isZero()) {
e.words[0] = 0;
e.length = 1;
return e;
}
var r = e.imul(t), i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = r.isub(i).iushrn(this.shift), s = n;
n.cmp(this.m) >= 0 ? s = n.isub(this.m) : n.cmpn(0) < 0 && (s = n.iadd(this.m));
return s._forceRed(this);
};
I.prototype.mul = function(e, t) {
if (e.isZero() || t.isZero()) return new s(0)._forceRed(this);
var r = e.mul(t), i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), n = r.isub(i).iushrn(this.shift), o = n;
n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m));
return o._forceRed(this);
};
I.prototype.invm = function(e) {
return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this);
};
})("undefined" == typeof t || t, this);
}, {
buffer: 19
} ],
18: [ function(e, t) {
var r;
t.exports = function(e) {
r || (r = new i(null));
return r.generate(e);
};
function i(e) {
this.rand = e;
}
t.exports.Rand = i;
i.prototype.generate = function(e) {
return this._rand(e);
};
i.prototype._rand = function(e) {
if (this.rand.getBytes) return this.rand.getBytes(e);
for (var t = new Uint8Array(e), r = 0; r < t.length; r++) t[r] = this.rand.getByte();
return t;
};
if ("object" == typeof self) self.crypto && self.crypto.getRandomValues ? i.prototype._rand = function(e) {
var t = new Uint8Array(e);
self.crypto.getRandomValues(t);
return t;
} : self.msCrypto && self.msCrypto.getRandomValues ? i.prototype._rand = function(e) {
var t = new Uint8Array(e);
self.msCrypto.getRandomValues(t);
return t;
} : "object" == typeof window && (i.prototype._rand = function() {
throw new Error("Not implemented yet");
}); else try {
var n = e("crypto");
if ("function" != typeof n.randomBytes) throw new Error("Not supported");
i.prototype._rand = function(e) {
return n.randomBytes(e);
};
} catch (e) {}
}, {
crypto: 19
} ],
19: [ function() {}, {} ],
20: [ function(e, t) {
var r = e("safe-buffer").Buffer;
function i(e) {
r.isBuffer(e) || (e = r.from(e));
for (var t = e.length / 4 | 0, i = new Array(t), n = 0; n < t; n++) i[n] = e.readUInt32BE(4 * n);
return i;
}
function n(e) {
for (;0 < e.length; e++) e[0] = 0;
}
function s(e, t, r, i, n) {
for (var s, o, a, f, c = r[0], u = r[1], h = r[2], d = r[3], l = e[0] ^ t[0], p = e[1] ^ t[1], b = e[2] ^ t[2], m = e[3] ^ t[3], g = 4, y = 1; y < n; y++) {
s = c[l >>> 24] ^ u[p >>> 16 & 255] ^ h[b >>> 8 & 255] ^ d[255 & m] ^ t[g++];
o = c[p >>> 24] ^ u[b >>> 16 & 255] ^ h[m >>> 8 & 255] ^ d[255 & l] ^ t[g++];
a = c[b >>> 24] ^ u[m >>> 16 & 255] ^ h[l >>> 8 & 255] ^ d[255 & p] ^ t[g++];
f = c[m >>> 24] ^ u[l >>> 16 & 255] ^ h[p >>> 8 & 255] ^ d[255 & b] ^ t[g++];
l = s;
p = o;
b = a;
m = f;
}
s = (i[l >>> 24] << 24 | i[p >>> 16 & 255] << 16 | i[b >>> 8 & 255] << 8 | i[255 & m]) ^ t[g++];
o = (i[p >>> 24] << 24 | i[b >>> 16 & 255] << 16 | i[m >>> 8 & 255] << 8 | i[255 & l]) ^ t[g++];
a = (i[b >>> 24] << 24 | i[m >>> 16 & 255] << 16 | i[l >>> 8 & 255] << 8 | i[255 & p]) ^ t[g++];
f = (i[m >>> 24] << 24 | i[l >>> 16 & 255] << 16 | i[p >>> 8 & 255] << 8 | i[255 & b]) ^ t[g++];
return [ s >>>= 0, o >>>= 0, a >>>= 0, f >>>= 0 ];
}
var o = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ], a = function() {
for (var e = new Array(256), t = 0; t < 256; t++) e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
for (var r = [], i = [], n = [ [], [], [], [] ], s = [ [], [], [], [] ], o = 0, a = 0, f = 0; f < 256; ++f) {
var c = a ^ a << 1 ^ a << 2 ^ a << 3 ^ a << 4;
c = c >>> 8 ^ 255 & c ^ 99;
r[o] = c;
i[c] = o;
var u = e[o], h = e[u], d = e[h], l = 257 * e[c] ^ 16843008 * c;
n[0][o] = l << 24 | l >>> 8;
n[1][o] = l << 16 | l >>> 16;
n[2][o] = l << 8 | l >>> 24;
n[3][o] = l;
l = 16843009 * d ^ 65537 * h ^ 257 * u ^ 16843008 * o;
s[0][c] = l << 24 | l >>> 8;
s[1][c] = l << 16 | l >>> 16;
s[2][c] = l << 8 | l >>> 24;
s[3][c] = l;
if (0 === o) o = a = 1; else {
o = u ^ e[e[e[d ^ u]]];
a ^= e[e[a]];
}
}
return {
SBOX: r,
INV_SBOX: i,
SUB_MIX: n,
INV_SUB_MIX: s
};
}();
function f(e) {
this._key = i(e);
this._reset();
}
f.blockSize = 16;
f.keySize = 32;
f.prototype.blockSize = f.blockSize;
f.prototype.keySize = f.keySize;
f.prototype._reset = function() {
for (var e = this._key, t = e.length, r = t + 6, i = 4 * (r + 1), n = [], s = 0; s < t; s++) n[s] = e[s];
for (s = t; s < i; s++) {
var f = n[s - 1];
if (s % t == 0) {
f = f << 8 | f >>> 24;
f = a.SBOX[f >>> 24] << 24 | a.SBOX[f >>> 16 & 255] << 16 | a.SBOX[f >>> 8 & 255] << 8 | a.SBOX[255 & f];
f ^= o[s / t | 0] << 24;
} else t > 6 && s % t == 4 && (f = a.SBOX[f >>> 24] << 24 | a.SBOX[f >>> 16 & 255] << 16 | a.SBOX[f >>> 8 & 255] << 8 | a.SBOX[255 & f]);
n[s] = n[s - t] ^ f;
}
for (var c = [], u = 0; u < i; u++) {
var h = i - u, d = n[h - (u % 4 ? 0 : 4)];
c[u] = u < 4 || h <= 4 ? d : a.INV_SUB_MIX[0][a.SBOX[d >>> 24]] ^ a.INV_SUB_MIX[1][a.SBOX[d >>> 16 & 255]] ^ a.INV_SUB_MIX[2][a.SBOX[d >>> 8 & 255]] ^ a.INV_SUB_MIX[3][a.SBOX[255 & d]];
}
this._nRounds = r;
this._keySchedule = n;
this._invKeySchedule = c;
};
f.prototype.encryptBlockRaw = function(e) {
return s(e = i(e), this._keySchedule, a.SUB_MIX, a.SBOX, this._nRounds);
};
f.prototype.encryptBlock = function(e) {
var t = this.encryptBlockRaw(e), i = r.allocUnsafe(16);
i.writeUInt32BE(t[0], 0);
i.writeUInt32BE(t[1], 4);
i.writeUInt32BE(t[2], 8);
i.writeUInt32BE(t[3], 12);
return i;
};
f.prototype.decryptBlock = function(e) {
var t = (e = i(e))[1];
e[1] = e[3];
e[3] = t;
var n = s(e, this._invKeySchedule, a.INV_SUB_MIX, a.INV_SBOX, this._nRounds), o = r.allocUnsafe(16);
o.writeUInt32BE(n[0], 0);
o.writeUInt32BE(n[3], 4);
o.writeUInt32BE(n[2], 8);
o.writeUInt32BE(n[1], 12);
return o;
};
f.prototype.scrub = function() {
n(this._keySchedule);
n(this._invKeySchedule);
n(this._key);
};
t.exports.AES = f;
}, {
"safe-buffer": 182
} ],
21: [ function(e, t) {
var r = e("./aes"), i = e("safe-buffer").Buffer, n = e("cipher-base"), s = e("inherits"), o = e("./ghash"), a = e("buffer-xor"), f = e("./incr32");
function c(e, t) {
var r = 0;
e.length !== t.length && r++;
for (var i = Math.min(e.length, t.length), n = 0; n < i; ++n) r += e[n] ^ t[n];
return r;
}
function u(e, t, r) {
if (12 === t.length) {
e._finID = i.concat([ t, i.from([ 0, 0, 0, 1 ]) ]);
return i.concat([ t, i.from([ 0, 0, 0, 2 ]) ]);
}
var n = new o(r), s = t.length, a = s % 16;
n.update(t);
if (a) {
a = 16 - a;
n.update(i.alloc(a, 0));
}
n.update(i.alloc(8, 0));
var c = 8 * s, u = i.alloc(8);
u.writeUIntBE(c, 0, 8);
n.update(u);
e._finID = n.state;
var h = i.from(e._finID);
f(h);
return h;
}
function h(e, t, s, a) {
n.call(this);
var f = i.alloc(4, 0);
this._cipher = new r.AES(t);
var c = this._cipher.encryptBlock(f);
this._ghash = new o(c);
s = u(this, s, c);
this._prev = i.from(s);
this._cache = i.allocUnsafe(0);
this._secCache = i.allocUnsafe(0);
this._decrypt = a;
this._alen = 0;
this._len = 0;
this._mode = e;
this._authTag = null;
this._called = !1;
}
s(h, n);
h.prototype._update = function(e) {
if (!this._called && this._alen) {
var t = 16 - this._alen % 16;
if (t < 16) {
t = i.alloc(t, 0);
this._ghash.update(t);
}
}
this._called = !0;
var r = this._mode.encrypt(this, e);
this._decrypt ? this._ghash.update(e) : this._ghash.update(r);
this._len += e.length;
return r;
};
h.prototype._final = function() {
if (this._decrypt && !this._authTag) throw new Error("Unsupported state or unable to authenticate data");
var e = a(this._ghash.final(8 * this._alen, 8 * this._len), this._cipher.encryptBlock(this._finID));
if (this._decrypt && c(e, this._authTag)) throw new Error("Unsupported state or unable to authenticate data");
this._authTag = e;
this._cipher.scrub();
};
h.prototype.getAuthTag = function() {
if (this._decrypt || !i.isBuffer(this._authTag)) throw new Error("Attempting to get auth tag in unsupported state");
return this._authTag;
};
h.prototype.setAuthTag = function(e) {
if (!this._decrypt) throw new Error("Attempting to set auth tag in unsupported state");
this._authTag = e;
};
h.prototype.setAAD = function(e) {
if (this._called) throw new Error("Attempting to set AAD in unsupported state");
this._ghash.update(e);
this._alen += e.length;
};
t.exports = h;
}, {
"./aes": 20,
"./ghash": 25,
"./incr32": 26,
"buffer-xor": 64,
"cipher-base": 67,
inherits: 138,
"safe-buffer": 182
} ],
22: [ function(e, t, r) {
var i = e("./encrypter"), n = e("./decrypter"), s = e("./modes/list.json");
r.createCipher = r.Cipher = i.createCipher;
r.createCipheriv = r.Cipheriv = i.createCipheriv;
r.createDecipher = r.Decipher = n.createDecipher;
r.createDecipheriv = r.Decipheriv = n.createDecipheriv;
r.listCiphers = r.getCiphers = function() {
return Object.keys(s);
};
}, {
"./decrypter": 23,
"./encrypter": 24,
"./modes/list.json": 34
} ],
23: [ function(e, t, r) {
var i = e("./authCipher"), n = e("safe-buffer").Buffer, s = e("./modes"), o = e("./streamCipher"), a = e("cipher-base"), f = e("./aes"), c = e("evp_bytestokey");
function u(e, t, r) {
a.call(this);
this._cache = new h();
this._last = void 0;
this._cipher = new f.AES(t);
this._prev = n.from(r);
this._mode = e;
this._autopadding = !0;
}
e("inherits")(u, a);
u.prototype._update = function(e) {
this._cache.add(e);
for (var t, r, i = []; t = this._cache.get(this._autopadding); ) {
r = this._mode.decrypt(this, t);
i.push(r);
}
return n.concat(i);
};
u.prototype._final = function() {
var e = this._cache.flush();
if (this._autopadding) return d(this._mode.decrypt(this, e));
if (e) throw new Error("data not multiple of block length");
};
u.prototype.setAutoPadding = function(e) {
this._autopadding = !!e;
return this;
};
function h() {
this.cache = n.allocUnsafe(0);
}
h.prototype.add = function(e) {
this.cache = n.concat([ this.cache, e ]);
};
h.prototype.get = function(e) {
var t;
if (e) {
if (this.cache.length > 16) {
t = this.cache.slice(0, 16);
this.cache = this.cache.slice(16);
return t;
}
} else if (this.cache.length >= 16) {
t = this.cache.slice(0, 16);
this.cache = this.cache.slice(16);
return t;
}
return null;
};
h.prototype.flush = function() {
if (this.cache.length) return this.cache;
};
function d(e) {
var t = e[15];
if (t < 1 || t > 16) throw new Error("unable to decrypt data");
for (var r = -1; ++r < t; ) if (e[r + (16 - t)] !== t) throw new Error("unable to decrypt data");
if (16 !== t) return e.slice(0, 16 - t);
}
function l(e, t, r) {
var a = s[e.toLowerCase()];
if (!a) throw new TypeError("invalid suite type");
"string" == typeof r && (r = n.from(r));
if ("GCM" !== a.mode && r.length !== a.iv) throw new TypeError("invalid iv length " + r.length);
"string" == typeof t && (t = n.from(t));
if (t.length !== a.key / 8) throw new TypeError("invalid key length " + t.length);
return "stream" === a.type ? new o(a.module, t, r, !0) : "auth" === a.type ? new i(a.module, t, r, !0) : new u(a.module, t, r);
}
r.createDecipher = function(e, t) {
var r = s[e.toLowerCase()];
if (!r) throw new TypeError("invalid suite type");
var i = c(t, !1, r.key, r.iv);
return l(e, i.key, i.iv);
};
r.createDecipheriv = l;
}, {
"./aes": 20,
"./authCipher": 21,
"./modes": 33,
"./streamCipher": 36,
"cipher-base": 67,
evp_bytestokey: 105,
inherits: 138,
"safe-buffer": 182
} ],
24: [ function(e, t, r) {
var i = e("./modes"), n = e("./authCipher"), s = e("safe-buffer").Buffer, o = e("./streamCipher"), a = e("cipher-base"), f = e("./aes"), c = e("evp_bytestokey");
function u(e, t, r) {
a.call(this);
this._cache = new d();
this._cipher = new f.AES(t);
this._prev = s.from(r);
this._mode = e;
this._autopadding = !0;
}
e("inherits")(u, a);
u.prototype._update = function(e) {
this._cache.add(e);
for (var t, r, i = []; t = this._cache.get(); ) {
r = this._mode.encrypt(this, t);
i.push(r);
}
return s.concat(i);
};
var h = s.alloc(16, 16);
u.prototype._final = function() {
var e = this._cache.flush();
if (this._autopadding) {
e = this._mode.encrypt(this, e);
this._cipher.scrub();
return e;
}
if (!e.equals(h)) {
this._cipher.scrub();
throw new Error("data not multiple of block length");
}
};
u.prototype.setAutoPadding = function(e) {
this._autopadding = !!e;
return this;
};
function d() {
this.cache = s.allocUnsafe(0);
}
d.prototype.add = function(e) {
this.cache = s.concat([ this.cache, e ]);
};
d.prototype.get = function() {
if (this.cache.length > 15) {
var e = this.cache.slice(0, 16);
this.cache = this.cache.slice(16);
return e;
}
return null;
};
d.prototype.flush = function() {
for (var e = 16 - this.cache.length, t = s.allocUnsafe(e), r = -1; ++r < e; ) t.writeUInt8(e, r);
return s.concat([ this.cache, t ]);
};
function l(e, t, r) {
var a = i[e.toLowerCase()];
if (!a) throw new TypeError("invalid suite type");
"string" == typeof t && (t = s.from(t));
if (t.length !== a.key / 8) throw new TypeError("invalid key length " + t.length);
"string" == typeof r && (r = s.from(r));
if ("GCM" !== a.mode && r.length !== a.iv) throw new TypeError("invalid iv length " + r.length);
return "stream" === a.type ? new o(a.module, t, r) : "auth" === a.type ? new n(a.module, t, r) : new u(a.module, t, r);
}
r.createCipheriv = l;
r.createCipher = function(e, t) {
var r = i[e.toLowerCase()];
if (!r) throw new TypeError("invalid suite type");
var n = c(t, !1, r.key, r.iv);
return l(e, n.key, n.iv);
};
}, {
"./aes": 20,
"./authCipher": 21,
"./modes": 33,
"./streamCipher": 36,
"cipher-base": 67,
evp_bytestokey: 105,
inherits: 138,
"safe-buffer": 182
} ],
25: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = r.alloc(16, 0);
function n(e) {
var t = r.allocUnsafe(16);
t.writeUInt32BE(e[0] >>> 0, 0);
t.writeUInt32BE(e[1] >>> 0, 4);
t.writeUInt32BE(e[2] >>> 0, 8);
t.writeUInt32BE(e[3] >>> 0, 12);
return t;
}
function s(e) {
this.h = e;
this.state = r.alloc(16, 0);
this.cache = r.allocUnsafe(0);
}
s.prototype.ghash = function(e) {
for (var t = -1; ++t < e.length; ) this.state[t] ^= e[t];
this._multiply();
};
s.prototype._multiply = function() {
for (var e, t, r, i = [ (e = this.h).readUInt32BE(0), e.readUInt32BE(4), e.readUInt32BE(8), e.readUInt32BE(12) ], s = [ 0, 0, 0, 0 ], o = -1; ++o < 128; ) {
if (0 != (this.state[~~(o / 8)] & 1 << 7 - o % 8)) {
s[0] ^= i[0];
s[1] ^= i[1];
s[2] ^= i[2];
s[3] ^= i[3];
}
r = 0 != (1 & i[3]);
for (t = 3; t > 0; t--) i[t] = i[t] >>> 1 | (1 & i[t - 1]) << 31;
i[0] = i[0] >>> 1;
r && (i[0] = i[0] ^ 225 << 24);
}
this.state = n(s);
};
s.prototype.update = function(e) {
this.cache = r.concat([ this.cache, e ]);
for (var t; this.cache.length >= 16; ) {
t = this.cache.slice(0, 16);
this.cache = this.cache.slice(16);
this.ghash(t);
}
};
s.prototype.final = function(e, t) {
this.cache.length && this.ghash(r.concat([ this.cache, i ], 16));
this.ghash(n([ 0, e, 0, t ]));
return this.state;
};
t.exports = s;
}, {
"safe-buffer": 182
} ],
26: [ function(e, t) {
t.exports = function(e) {
for (var t, r = e.length; r--; ) {
if (255 !== (t = e.readUInt8(r))) {
t++;
e.writeUInt8(t, r);
break;
}
e.writeUInt8(0, r);
}
};
}, {} ],
27: [ function(e, t, r) {
var i = e("buffer-xor");
r.encrypt = function(e, t) {
var r = i(t, e._prev);
e._prev = e._cipher.encryptBlock(r);
return e._prev;
};
r.decrypt = function(e, t) {
var r = e._prev;
e._prev = t;
var n = e._cipher.decryptBlock(t);
return i(n, r);
};
}, {
"buffer-xor": 64
} ],
28: [ function(e, t, r) {
var i = e("safe-buffer").Buffer, n = e("buffer-xor");
function s(e, t, r) {
var s = t.length, o = n(t, e._cache);
e._cache = e._cache.slice(s);
e._prev = i.concat([ e._prev, r ? t : o ]);
return o;
}
r.encrypt = function(e, t, r) {
for (var n, o = i.allocUnsafe(0); t.length; ) {
if (0 === e._cache.length) {
e._cache = e._cipher.encryptBlock(e._prev);
e._prev = i.allocUnsafe(0);
}
if (!(e._cache.length <= t.length)) {
o = i.concat([ o, s(e, t, r) ]);
break;
}
n = e._cache.length;
o = i.concat([ o, s(e, t.slice(0, n), r) ]);
t = t.slice(n);
}
return o;
};
}, {
"buffer-xor": 64,
"safe-buffer": 182
} ],
29: [ function(e, t, r) {
var i = e("safe-buffer").Buffer;
function n(e, t, r) {
for (var i, n, o = -1, a = 0; ++o < 8; ) {
i = t & 1 << 7 - o ? 128 : 0;
a += (128 & (n = e._cipher.encryptBlock(e._prev)[0] ^ i)) >> o % 8;
e._prev = s(e._prev, r ? i : n);
}
return a;
}
function s(e, t) {
var r = e.length, n = -1, s = i.allocUnsafe(e.length);
e = i.concat([ e, i.from([ t ]) ]);
for (;++n < r; ) s[n] = e[n] << 1 | e[n + 1] >> 7;
return s;
}
r.encrypt = function(e, t, r) {
for (var s = t.length, o = i.allocUnsafe(s), a = -1; ++a < s; ) o[a] = n(e, t[a], r);
return o;
};
}, {
"safe-buffer": 182
} ],
30: [ function(e, t, r) {
var i = e("safe-buffer").Buffer;
function n(e, t, r) {
var n = e._cipher.encryptBlock(e._prev)[0] ^ t;
e._prev = i.concat([ e._prev.slice(1), i.from([ r ? t : n ]) ]);
return n;
}
r.encrypt = function(e, t, r) {
for (var s = t.length, o = i.allocUnsafe(s), a = -1; ++a < s; ) o[a] = n(e, t[a], r);
return o;
};
}, {
"safe-buffer": 182
} ],
31: [ function(e, t, r) {
var i = e("buffer-xor"), n = e("safe-buffer").Buffer, s = e("../incr32");
function o(e) {
var t = e._cipher.encryptBlockRaw(e._prev);
s(e._prev);
return t;
}
r.encrypt = function(e, t) {
var r = Math.ceil(t.length / 16), s = e._cache.length;
e._cache = n.concat([ e._cache, n.allocUnsafe(16 * r) ]);
for (var a = 0; a < r; a++) {
var f = o(e), c = s + 16 * a;
e._cache.writeUInt32BE(f[0], c + 0);
e._cache.writeUInt32BE(f[1], c + 4);
e._cache.writeUInt32BE(f[2], c + 8);
e._cache.writeUInt32BE(f[3], c + 12);
}
var u = e._cache.slice(0, t.length);
e._cache = e._cache.slice(t.length);
return i(t, u);
};
}, {
"../incr32": 26,
"buffer-xor": 64,
"safe-buffer": 182
} ],
32: [ function(e, t, r) {
r.encrypt = function(e, t) {
return e._cipher.encryptBlock(t);
};
r.decrypt = function(e, t) {
return e._cipher.decryptBlock(t);
};
}, {} ],
33: [ function(e, t) {
var r = {
ECB: e("./ecb"),
CBC: e("./cbc"),
CFB: e("./cfb"),
CFB8: e("./cfb8"),
CFB1: e("./cfb1"),
OFB: e("./ofb"),
CTR: e("./ctr"),
GCM: e("./ctr")
}, i = e("./list.json");
for (var n in i) i[n].module = r[i[n].mode];
t.exports = i;
}, {
"./cbc": 27,
"./cfb": 28,
"./cfb1": 29,
"./cfb8": 30,
"./ctr": 31,
"./ecb": 32,
"./list.json": 34,
"./ofb": 35
} ],
34: [ function(e, t) {
t.exports = {
"aes-128-ecb": {
cipher: "AES",
key: 128,
iv: 0,
mode: "ECB",
type: "block"
},
"aes-192-ecb": {
cipher: "AES",
key: 192,
iv: 0,
mode: "ECB",
type: "block"
},
"aes-256-ecb": {
cipher: "AES",
key: 256,
iv: 0,
mode: "ECB",
type: "block"
},
"aes-128-cbc": {
cipher: "AES",
key: 128,
iv: 16,
mode: "CBC",
type: "block"
},
"aes-192-cbc": {
cipher: "AES",
key: 192,
iv: 16,
mode: "CBC",
type: "block"
},
"aes-256-cbc": {
cipher: "AES",
key: 256,
iv: 16,
mode: "CBC",
type: "block"
},
aes128: {
cipher: "AES",
key: 128,
iv: 16,
mode: "CBC",
type: "block"
},
aes192: {
cipher: "AES",
key: 192,
iv: 16,
mode: "CBC",
type: "block"
},
aes256: {
cipher: "AES",
key: 256,
iv: 16,
mode: "CBC",
type: "block"
},
"aes-128-cfb": {
cipher: "AES",
key: 128,
iv: 16,
mode: "CFB",
type: "stream"
},
"aes-192-cfb": {
cipher: "AES",
key: 192,
iv: 16,
mode: "CFB",
type: "stream"
},
"aes-256-cfb": {
cipher: "AES",
key: 256,
iv: 16,
mode: "CFB",
type: "stream"
},
"aes-128-cfb8": {
cipher: "AES",
key: 128,
iv: 16,
mode: "CFB8",
type: "stream"
},
"aes-192-cfb8": {
cipher: "AES",
key: 192,
iv: 16,
mode: "CFB8",
type: "stream"
},
"aes-256-cfb8": {
cipher: "AES",
key: 256,
iv: 16,
mode: "CFB8",
type: "stream"
},
"aes-128-cfb1": {
cipher: "AES",
key: 128,
iv: 16,
mode: "CFB1",
type: "stream"
},
"aes-192-cfb1": {
cipher: "AES",
key: 192,
iv: 16,
mode: "CFB1",
type: "stream"
},
"aes-256-cfb1": {
cipher: "AES",
key: 256,
iv: 16,
mode: "CFB1",
type: "stream"
},
"aes-128-ofb": {
cipher: "AES",
key: 128,
iv: 16,
mode: "OFB",
type: "stream"
},
"aes-192-ofb": {
cipher: "AES",
key: 192,
iv: 16,
mode: "OFB",
type: "stream"
},
"aes-256-ofb": {
cipher: "AES",
key: 256,
iv: 16,
mode: "OFB",
type: "stream"
},
"aes-128-ctr": {
cipher: "AES",
key: 128,
iv: 16,
mode: "CTR",
type: "stream"
},
"aes-192-ctr": {
cipher: "AES",
key: 192,
iv: 16,
mode: "CTR",
type: "stream"
},
"aes-256-ctr": {
cipher: "AES",
key: 256,
iv: 16,
mode: "CTR",
type: "stream"
},
"aes-128-gcm": {
cipher: "AES",
key: 128,
iv: 12,
mode: "GCM",
type: "auth"
},
"aes-192-gcm": {
cipher: "AES",
key: 192,
iv: 12,
mode: "GCM",
type: "auth"
},
"aes-256-gcm": {
cipher: "AES",
key: 256,
iv: 12,
mode: "GCM",
type: "auth"
}
};
}, {} ],
35: [ function(e, t, r) {
(function(t) {
var i = e("buffer-xor");
function n(e) {
e._prev = e._cipher.encryptBlock(e._prev);
return e._prev;
}
r.encrypt = function(e, r) {
for (;e._cache.length < r.length; ) e._cache = t.concat([ e._cache, n(e) ]);
var s = e._cache.slice(0, r.length);
e._cache = e._cache.slice(r.length);
return i(r, s);
};
}).call(this, e("buffer").Buffer);
}, {
buffer: 65,
"buffer-xor": 64
} ],
36: [ function(e, t) {
var r = e("./aes"), i = e("safe-buffer").Buffer, n = e("cipher-base");
function s(e, t, s, o) {
n.call(this);
this._cipher = new r.AES(t);
this._prev = i.from(s);
this._cache = i.allocUnsafe(0);
this._secCache = i.allocUnsafe(0);
this._decrypt = o;
this._mode = e;
}
e("inherits")(s, n);
s.prototype._update = function(e) {
return this._mode.encrypt(this, e, this._decrypt);
};
s.prototype._final = function() {
this._cipher.scrub();
};
t.exports = s;
}, {
"./aes": 20,
"cipher-base": 67,
inherits: 138,
"safe-buffer": 182
} ],
37: [ function(e, t, r) {
var i = e("browserify-des"), n = e("browserify-aes/browser"), s = e("browserify-aes/modes"), o = e("browserify-des/modes"), a = e("evp_bytestokey");
function f(e, t, r) {
e = e.toLowerCase();
if (s[e]) return n.createCipheriv(e, t, r);
if (o[e]) return new i({
key: t,
iv: r,
mode: e
});
throw new TypeError("invalid suite type");
}
function c(e, t, r) {
e = e.toLowerCase();
if (s[e]) return n.createDecipheriv(e, t, r);
if (o[e]) return new i({
key: t,
iv: r,
mode: e,
decrypt: !0
});
throw new TypeError("invalid suite type");
}
r.createCipher = r.Cipher = function(e, t) {
e = e.toLowerCase();
var r, i;
if (s[e]) {
r = s[e].key;
i = s[e].iv;
} else {
if (!o[e]) throw new TypeError("invalid suite type");
r = 8 * o[e].key;
i = o[e].iv;
}
var n = a(t, !1, r, i);
return f(e, n.key, n.iv);
};
r.createCipheriv = r.Cipheriv = f;
r.createDecipher = r.Decipher = function(e, t) {
e = e.toLowerCase();
var r, i;
if (s[e]) {
r = s[e].key;
i = s[e].iv;
} else {
if (!o[e]) throw new TypeError("invalid suite type");
r = 8 * o[e].key;
i = o[e].iv;
}
var n = a(t, !1, r, i);
return c(e, n.key, n.iv);
};
r.createDecipheriv = r.Decipheriv = c;
r.listCiphers = r.getCiphers = function() {
return Object.keys(o).concat(n.getCiphers());
};
}, {
"browserify-aes/browser": 22,
"browserify-aes/modes": 33,
"browserify-des": 38,
"browserify-des/modes": 39,
evp_bytestokey: 105
} ],
38: [ function(e, t) {
var r = e("cipher-base"), i = e("des.js"), n = e("inherits"), s = e("safe-buffer").Buffer, o = {
"des-ede3-cbc": i.CBC.instantiate(i.EDE),
"des-ede3": i.EDE,
"des-ede-cbc": i.CBC.instantiate(i.EDE),
"des-ede": i.EDE,
"des-cbc": i.CBC.instantiate(i.DES),
"des-ecb": i.DES
};
o.des = o["des-cbc"];
o.des3 = o["des-ede3-cbc"];
t.exports = a;
n(a, r);
function a(e) {
r.call(this);
var t, i = e.mode.toLowerCase(), n = o[i];
t = e.decrypt ? "decrypt" : "encrypt";
var a = e.key;
s.isBuffer(a) || (a = s.from(a));
"des-ede" !== i && "des-ede-cbc" !== i || (a = s.concat([ a, a.slice(0, 8) ]));
var f = e.iv;
s.isBuffer(f) || (f = s.from(f));
this._des = n.create({
key: a,
iv: f,
type: t
});
}
a.prototype._update = function(e) {
return s.from(this._des.update(e));
};
a.prototype._final = function() {
return s.from(this._des.final());
};
}, {
"cipher-base": 67,
"des.js": 76,
inherits: 138,
"safe-buffer": 182
} ],
39: [ function(e, t, r) {
r["des-ecb"] = {
key: 8,
iv: 0
};
r["des-cbc"] = r.des = {
key: 8,
iv: 8
};
r["des-ede3-cbc"] = r.des3 = {
key: 24,
iv: 8
};
r["des-ede3"] = {
key: 24,
iv: 0
};
r["des-ede-cbc"] = {
key: 16,
iv: 8
};
r["des-ede"] = {
key: 16,
iv: 0
};
}, {} ],
40: [ function(e, t) {
(function(r) {
var i = e("bn.js"), n = e("randombytes");
function s(e) {
var t = o(e);
return {
blinder: t.toRed(i.mont(e.modulus)).redPow(new i(e.publicExponent)).fromRed(),
unblinder: t.invm(e.modulus)
};
}
function o(e) {
var t, r = e.modulus.byteLength();
do {
t = new i(n(r));
} while (t.cmp(e.modulus) >= 0 || !t.umod(e.prime1) || !t.umod(e.prime2));
return t;
}
function a(e, t) {
var n = s(t), o = t.modulus.byteLength(), a = new i(e).mul(n.blinder).umod(t.modulus), f = a.toRed(i.mont(t.prime1)), c = a.toRed(i.mont(t.prime2)), u = t.coefficient, h = t.prime1, d = t.prime2, l = f.redPow(t.exponent1).fromRed(), p = c.redPow(t.exponent2).fromRed(), b = l.isub(p).imul(u).umod(h).imul(d);
return p.iadd(b).imul(n.unblinder).umod(t.modulus).toArrayLike(r, "be", o);
}
a.getr = o;
t.exports = a;
}).call(this, e("buffer").Buffer);
}, {
"bn.js": 17,
buffer: 65,
randombytes: 164
} ],
41: [ function(e, t) {
t.exports = e("./browser/algorithms.json");
}, {
"./browser/algorithms.json": 42
} ],
42: [ function(e, t) {
t.exports = {
sha224WithRSAEncryption: {
sign: "rsa",
hash: "sha224",
id: "302d300d06096086480165030402040500041c"
},
"RSA-SHA224": {
sign: "ecdsa/rsa",
hash: "sha224",
id: "302d300d06096086480165030402040500041c"
},
sha256WithRSAEncryption: {
sign: "rsa",
hash: "sha256",
id: "3031300d060960864801650304020105000420"
},
"RSA-SHA256": {
sign: "ecdsa/rsa",
hash: "sha256",
id: "3031300d060960864801650304020105000420"
},
sha384WithRSAEncryption: {
sign: "rsa",
hash: "sha384",
id: "3041300d060960864801650304020205000430"
},
"RSA-SHA384": {
sign: "ecdsa/rsa",
hash: "sha384",
id: "3041300d060960864801650304020205000430"
},
sha512WithRSAEncryption: {
sign: "rsa",
hash: "sha512",
id: "3051300d060960864801650304020305000440"
},
"RSA-SHA512": {
sign: "ecdsa/rsa",
hash: "sha512",
id: "3051300d060960864801650304020305000440"
},
"RSA-SHA1": {
sign: "rsa",
hash: "sha1",
id: "3021300906052b0e03021a05000414"
},
"ecdsa-with-SHA1": {
sign: "ecdsa",
hash: "sha1",
id: ""
},
sha256: {
sign: "ecdsa",
hash: "sha256",
id: ""
},
sha224: {
sign: "ecdsa",
hash: "sha224",
id: ""
},
sha384: {
sign: "ecdsa",
hash: "sha384",
id: ""
},
sha512: {
sign: "ecdsa",
hash: "sha512",
id: ""
},
"DSA-SHA": {
sign: "dsa",
hash: "sha1",
id: ""
},
"DSA-SHA1": {
sign: "dsa",
hash: "sha1",
id: ""
},
DSA: {
sign: "dsa",
hash: "sha1",
id: ""
},
"DSA-WITH-SHA224": {
sign: "dsa",
hash: "sha224",
id: ""
},
"DSA-SHA224": {
sign: "dsa",
hash: "sha224",
id: ""
},
"DSA-WITH-SHA256": {
sign: "dsa",
hash: "sha256",
id: ""
},
"DSA-SHA256": {
sign: "dsa",
hash: "sha256",
id: ""
},
"DSA-WITH-SHA384": {
sign: "dsa",
hash: "sha384",
id: ""
},
"DSA-SHA384": {
sign: "dsa",
hash: "sha384",
id: ""
},
"DSA-WITH-SHA512": {
sign: "dsa",
hash: "sha512",
id: ""
},
"DSA-SHA512": {
sign: "dsa",
hash: "sha512",
id: ""
},
"DSA-RIPEMD160": {
sign: "dsa",
hash: "rmd160",
id: ""
},
ripemd160WithRSA: {
sign: "rsa",
hash: "rmd160",
id: "3021300906052b2403020105000414"
},
"RSA-RIPEMD160": {
sign: "rsa",
hash: "rmd160",
id: "3021300906052b2403020105000414"
},
md5WithRSAEncryption: {
sign: "rsa",
hash: "md5",
id: "3020300c06082a864886f70d020505000410"
},
"RSA-MD5": {
sign: "rsa",
hash: "md5",
id: "3020300c06082a864886f70d020505000410"
}
};
}, {} ],
43: [ function(e, t) {
t.exports = {
"1.3.132.0.10": "secp256k1",
"1.3.132.0.33": "p224",
"1.2.840.10045.3.1.1": "p192",
"1.2.840.10045.3.1.7": "p256",
"1.3.132.0.34": "p384",
"1.3.132.0.35": "p521"
};
}, {} ],
44: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = e("create-hash"), n = e("readable-stream"), s = e("inherits"), o = e("./sign"), a = e("./verify"), f = e("./algorithms.json");
Object.keys(f).forEach(function(e) {
f[e].id = r.from(f[e].id, "hex");
f[e.toLowerCase()] = f[e];
});
function c(e) {
n.Writable.call(this);
var t = f[e];
if (!t) throw new Error("Unknown message digest");
this._hashType = t.hash;
this._hash = i(t.hash);
this._tag = t.id;
this._signType = t.sign;
}
s(c, n.Writable);
c.prototype._write = function(e, t, r) {
this._hash.update(e);
r();
};
c.prototype.update = function(e, t) {
"string" == typeof e && (e = r.from(e, t));
this._hash.update(e);
return this;
};
c.prototype.sign = function(e, t) {
this.end();
var r = this._hash.digest(), i = o(r, e, this._hashType, this._signType, this._tag);
return t ? i.toString(t) : i;
};
function u(e) {
n.Writable.call(this);
var t = f[e];
if (!t) throw new Error("Unknown message digest");
this._hash = i(t.hash);
this._tag = t.id;
this._signType = t.sign;
}
s(u, n.Writable);
u.prototype._write = function(e, t, r) {
this._hash.update(e);
r();
};
u.prototype.update = function(e, t) {
"string" == typeof e && (e = r.from(e, t));
this._hash.update(e);
return this;
};
u.prototype.verify = function(e, t, i) {
"string" == typeof t && (t = r.from(t, i));
this.end();
var n = this._hash.digest();
return a(t, n, e, this._signType, this._tag);
};
function h(e) {
return new c(e);
}
function d(e) {
return new u(e);
}
t.exports = {
Sign: h,
Verify: d,
createSign: h,
createVerify: d
};
}, {
"./algorithms.json": 42,
"./sign": 45,
"./verify": 46,
"create-hash": 71,
inherits: 138,
"readable-stream": 61,
"safe-buffer": 62
} ],
45: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = e("create-hmac"), n = e("browserify-rsa"), s = e("elliptic").ec, o = e("bn.js"), a = e("parse-asn1"), f = e("./curves.json");
function c(e, t) {
var i = f[t.curve.join(".")];
if (!i) throw new Error("unknown curve " + t.curve.join("."));
var n = new s(i).keyFromPrivate(t.privateKey).sign(e);
return r.from(n.toDER());
}
function u(e, t, r) {
for (var i, n = t.params.priv_key, s = t.params.p, a = t.params.q, f = t.params.g, c = new o(0), u = l(e, a).mod(a), p = !1, g = d(n, a, e, r); !1 === p; ) {
c = m(f, i = b(a, g, r), s, a);
if (0 === (p = i.invm(a).imul(u.add(n.mul(c))).mod(a)).cmpn(0)) {
p = !1;
c = new o(0);
}
}
return h(c, p);
}
function h(e, t) {
e = e.toArray();
t = t.toArray();
128 & e[0] && (e = [ 0 ].concat(e));
128 & t[0] && (t = [ 0 ].concat(t));
var i = [ 48, e.length + t.length + 4, 2, e.length ];
i = i.concat(e, [ 2, t.length ], t);
return r.from(i);
}
function d(e, t, n, s) {
if ((e = r.from(e.toArray())).length < t.byteLength()) {
var o = r.alloc(t.byteLength() - e.length);
e = r.concat([ o, e ]);
}
var a = n.length, f = p(n, t), c = r.alloc(a);
c.fill(1);
var u = r.alloc(a);
u = i(s, u).update(c).update(r.from([ 0 ])).update(e).update(f).digest();
c = i(s, u).update(c).digest();
return {
k: u = i(s, u).update(c).update(r.from([ 1 ])).update(e).update(f).digest(),
v: c = i(s, u).update(c).digest()
};
}
function l(e, t) {
var r = new o(e), i = (e.length << 3) - t.bitLength();
i > 0 && r.ishrn(i);
return r;
}
function p(e, t) {
e = (e = l(e, t)).mod(t);
var i = r.from(e.toArray());
if (i.length < t.byteLength()) {
var n = r.alloc(t.byteLength() - i.length);
i = r.concat([ n, i ]);
}
return i;
}
function b(e, t, n) {
var s, o;
do {
s = r.alloc(0);
for (;8 * s.length < e.bitLength(); ) {
t.v = i(n, t.k).update(t.v).digest();
s = r.concat([ s, t.v ]);
}
o = l(s, e);
t.k = i(n, t.k).update(t.v).update(r.from([ 0 ])).digest();
t.v = i(n, t.k).update(t.v).digest();
} while (-1 !== o.cmp(e));
return o;
}
function m(e, t, r, i) {
return e.toRed(o.mont(r)).redPow(t).fromRed().mod(i);
}
t.exports = function(e, t, i, s, o) {
var f = a(t);
if (f.curve) {
if ("ecdsa" !== s && "ecdsa/rsa" !== s) throw new Error("wrong private key type");
return c(e, f);
}
if ("dsa" === f.type) {
if ("dsa" !== s) throw new Error("wrong private key type");
return u(e, f, i);
}
if ("rsa" !== s && "ecdsa/rsa" !== s) throw new Error("wrong private key type");
e = r.concat([ o, e ]);
for (var h = f.modulus.byteLength(), d = [ 0, 1 ]; e.length + d.length + 1 < h; ) d.push(255);
d.push(0);
for (var l = -1; ++l < e.length; ) d.push(e[l]);
return n(d, f);
};
t.exports.getKey = d;
t.exports.makeKey = b;
}, {
"./curves.json": 43,
"bn.js": 17,
"browserify-rsa": 40,
"create-hmac": 73,
elliptic: 87,
"parse-asn1": 148,
"safe-buffer": 62
} ],
46: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = e("bn.js"), n = e("elliptic").ec, s = e("parse-asn1"), o = e("./curves.json");
function a(e, t, r) {
var i = o[r.data.algorithm.curve.join(".")];
if (!i) throw new Error("unknown curve " + r.data.algorithm.curve.join("."));
var s = new n(i), a = r.data.subjectPrivateKey.data;
return s.verify(t, e, a);
}
function f(e, t, r) {
var n = r.data.p, o = r.data.q, a = r.data.g, f = r.data.pub_key, u = s.signature.decode(e, "der"), h = u.s, d = u.r;
c(h, o);
c(d, o);
var l = i.mont(n), p = h.invm(o);
return 0 === a.toRed(l).redPow(new i(t).mul(p).mod(o)).fromRed().mul(f.toRed(l).redPow(d.mul(p).mod(o)).fromRed()).mod(n).mod(o).cmp(d);
}
function c(e, t) {
if (e.cmpn(0) <= 0) throw new Error("invalid sig");
if (e.cmp(t) >= t) throw new Error("invalid sig");
}
t.exports = function(e, t, n, o, c) {
var u = s(n);
if ("ec" === u.type) {
if ("ecdsa" !== o && "ecdsa/rsa" !== o) throw new Error("wrong public key type");
return a(e, t, u);
}
if ("dsa" === u.type) {
if ("dsa" !== o) throw new Error("wrong public key type");
return f(e, t, u);
}
if ("rsa" !== o && "ecdsa/rsa" !== o) throw new Error("wrong public key type");
t = r.concat([ c, t ]);
for (var h = u.modulus.byteLength(), d = [ 1 ], l = 0; t.length + d.length + 2 < h; ) {
d.push(255);
l++;
}
d.push(0);
for (var p = -1; ++p < t.length; ) d.push(t[p]);
d = r.from(d);
var b = i.mont(u.modulus);
e = (e = new i(e).toRed(b)).redPow(new i(u.publicExponent));
e = r.from(e.fromRed().toArray());
var m = l < 8 ? 1 : 0;
h = Math.min(e.length, d.length);
e.length !== d.length && (m = 1);
p = -1;
for (;++p < h; ) m |= e[p] ^ d[p];
return 0 === m;
};
}, {
"./curves.json": 43,
"bn.js": 17,
elliptic: 87,
"parse-asn1": 148,
"safe-buffer": 62
} ],
47: [ function(e, t) {
"use strict";
function r(e, t) {
e.prototype = Object.create(t.prototype);
e.prototype.constructor = e;
e.__proto__ = t;
}
var i = {};
function n(e, t, n) {
n || (n = Error);
function s(e, r, i) {
return "string" == typeof t ? t : t(e, r, i);
}
var o = function(e) {
r(t, e);
function t(t, r, i) {
return e.call(this, s(t, r, i)) || this;
}
return t;
}(n);
o.prototype.name = n.name;
o.prototype.code = e;
i[e] = o;
}
function s(e, t) {
if (Array.isArray(e)) {
var r = e.length;
e = e.map(function(e) {
return String(e);
});
return r > 2 ? "one of ".concat(t, " ").concat(e.slice(0, r - 1).join(", "), ", or ") + e[r - 1] : 2 === r ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1]) : "of ".concat(t, " ").concat(e[0]);
}
return "of ".concat(t, " ").concat(String(e));
}
function o(e, t, r) {
(void 0 === r || r > e.length) && (r = e.length);
return e.substring(r - t.length, r) === t;
}
function a(e, t, r) {
"number" != typeof r && (r = 0);
return !(r + t.length > e.length) && -1 !== e.indexOf(t, r);
}
n("ERR_INVALID_OPT_VALUE", function(e, t) {
return 'The value "' + t + '" is invalid for option "' + e + '"';
}, TypeError);
n("ERR_INVALID_ARG_TYPE", function(e, t, r) {
var i, n;
if ("string" == typeof t && ("not ", "not " === t.substr(0, "not ".length))) {
i = "must not be";
t = t.replace(/^not /, "");
} else i = "must be";
if (o(e, " argument")) n = "The ".concat(e, " ").concat(i, " ").concat(s(t, "type")); else {
var f = a(e, ".") ? "property" : "argument";
n = 'The "'.concat(e, '" ').concat(f, " ").concat(i, " ").concat(s(t, "type"));
}
return n + ". Received type ".concat(typeof r);
}, TypeError);
n("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
n("ERR_METHOD_NOT_IMPLEMENTED", function(e) {
return "The " + e + " method is not implemented";
});
n("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
n("ERR_STREAM_DESTROYED", function(e) {
return "Cannot call " + e + " after a stream was destroyed";
});
n("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
n("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
n("ERR_STREAM_WRITE_AFTER_END", "write after end");
n("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
n("ERR_UNKNOWN_ENCODING", function(e) {
return "Unknown encoding: " + e;
}, TypeError);
n("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
t.exports.codes = i;
}, {} ],
48: [ function(e, t) {
(function(r) {
"use strict";
var i = Object.keys || function(e) {
var t = [];
for (var r in e) t.push(r);
return t;
};
t.exports = c;
var n = e("./_stream_readable"), s = e("./_stream_writable");
e("inherits")(c, n);
for (var o = i(s.prototype), a = 0; a < o.length; a++) {
var f = o[a];
c.prototype[f] || (c.prototype[f] = s.prototype[f]);
}
function c(e) {
if (!(this instanceof c)) return new c(e);
n.call(this, e);
s.call(this, e);
this.allowHalfOpen = !0;
if (e) {
!1 === e.readable && (this.readable = !1);
!1 === e.writable && (this.writable = !1);
if (!1 === e.allowHalfOpen) {
this.allowHalfOpen = !1;
this.once("end", u);
}
}
}
Object.defineProperty(c.prototype, "writableHighWaterMark", {
enumerable: !1,
get: function() {
return this._writableState.highWaterMark;
}
});
Object.defineProperty(c.prototype, "writableBuffer", {
enumerable: !1,
get: function() {
return this._writableState && this._writableState.getBuffer();
}
});
Object.defineProperty(c.prototype, "writableLength", {
enumerable: !1,
get: function() {
return this._writableState.length;
}
});
function u() {
this._writableState.ended || r.nextTick(h, this);
}
function h(e) {
e.end();
}
Object.defineProperty(c.prototype, "destroyed", {
enumerable: !1,
get: function() {
return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed;
},
set: function(e) {
if (void 0 !== this._readableState && void 0 !== this._writableState) {
this._readableState.destroyed = e;
this._writableState.destroyed = e;
}
}
});
}).call(this, e("_process"));
}, {
"./_stream_readable": 50,
"./_stream_writable": 52,
_process: 156,
inherits: 138
} ],
49: [ function(e, t) {
"use strict";
t.exports = i;
var r = e("./_stream_transform");
e("inherits")(i, r);
function i(e) {
if (!(this instanceof i)) return new i(e);
r.call(this, e);
}
i.prototype._transform = function(e, t, r) {
r(null, e);
};
}, {
"./_stream_transform": 51,
inherits: 138
} ],
50: [ function(e, t) {
(function(r, i) {
"use strict";
t.exports = R;
var n;
R.ReadableState = k;
e("events").EventEmitter;
var s = function(e, t) {
return e.listeners(t).length;
}, o = e("./internal/streams/stream"), a = e("buffer").Buffer, f = i.Uint8Array || function() {};
function c(e) {
return a.from(e);
}
var u, h = e("util");
u = h && h.debuglog ? h.debuglog("stream") : function() {};
var d, l, p, b = e("./internal/streams/buffer_list"), m = e("./internal/streams/destroy"), g = e("./internal/streams/state").getHighWaterMark, y = e("../errors").codes, v = y.ERR_INVALID_ARG_TYPE, w = y.ERR_STREAM_PUSH_AFTER_EOF, _ = y.ERR_METHOD_NOT_IMPLEMENTED, S = y.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
e("inherits")(R, o);
var E = m.errorOrDestroy, M = [ "error", "close", "destroy", "pause", "resume" ];
function A(e, t, r) {
if ("function" == typeof e.prependListener) return e.prependListener(t, r);
e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [ r, e._events[t] ] : e.on(t, r);
}
function k(t, r, i) {
n = n || e("./_stream_duplex");
t = t || {};
"boolean" != typeof i && (i = r instanceof n);
this.objectMode = !!t.objectMode;
i && (this.objectMode = this.objectMode || !!t.readableObjectMode);
this.highWaterMark = g(this, t, "readableHighWaterMark", i);
this.buffer = new b();
this.length = 0;
this.pipes = null;
this.pipesCount = 0;
this.flowing = null;
this.ended = !1;
this.endEmitted = !1;
this.reading = !1;
this.sync = !0;
this.needReadable = !1;
this.emittedReadable = !1;
this.readableListening = !1;
this.resumeScheduled = !1;
this.paused = !0;
this.emitClose = !1 !== t.emitClose;
this.autoDestroy = !!t.autoDestroy;
this.destroyed = !1;
this.defaultEncoding = t.defaultEncoding || "utf8";
this.awaitDrain = 0;
this.readingMore = !1;
this.decoder = null;
this.encoding = null;
if (t.encoding) {
d || (d = e("string_decoder/").StringDecoder);
this.decoder = new d(t.encoding);
this.encoding = t.encoding;
}
}
function R(t) {
n = n || e("./_stream_duplex");
if (!(this instanceof R)) return new R(t);
var r = this instanceof n;
this._readableState = new k(t, this, r);
this.readable = !0;
if (t) {
"function" == typeof t.read && (this._read = t.read);
"function" == typeof t.destroy && (this._destroy = t.destroy);
}
o.call(this);
}
Object.defineProperty(R.prototype, "destroyed", {
enumerable: !1,
get: function() {
return void 0 !== this._readableState && this._readableState.destroyed;
},
set: function(e) {
this._readableState && (this._readableState.destroyed = e);
}
});
R.prototype.destroy = m.destroy;
R.prototype._undestroy = m.undestroy;
R.prototype._destroy = function(e, t) {
t(e);
};
R.prototype.push = function(e, t) {
var r, i = this._readableState;
if (i.objectMode) r = !0; else if ("string" == typeof e) {
if ((t = t || i.defaultEncoding) !== i.encoding) {
e = a.from(e, t);
t = "";
}
r = !0;
}
return x(this, e, t, !1, r);
};
R.prototype.unshift = function(e) {
return x(this, e, null, !0, !1);
};
function x(e, t, r, i, n) {
u("readableAddChunk", t);
var s = e._readableState;
if (null === t) {
s.reading = !1;
P(e, s);
} else {
var o;
n || (o = T(s, t));
if (o) E(e, o); else if (s.objectMode || t && t.length > 0) {
"string" == typeof t || s.objectMode || Object.getPrototypeOf(t) === a.prototype || (t = c(t));
if (i) s.endEmitted ? E(e, new S()) : I(e, s, t, !0); else if (s.ended) E(e, new w()); else {
if (s.destroyed) return !1;
s.reading = !1;
if (s.decoder && !r) {
t = s.decoder.write(t);
s.objectMode || 0 !== t.length ? I(e, s, t, !1) : O(e, s);
} else I(e, s, t, !1);
}
} else if (!i) {
s.reading = !1;
O(e, s);
}
}
return !s.ended && (s.length < s.highWaterMark || 0 === s.length);
}
function I(e, t, r, i) {
if (t.flowing && 0 === t.length && !t.sync) {
t.awaitDrain = 0;
e.emit("data", r);
} else {
t.length += t.objectMode ? 1 : r.length;
i ? t.buffer.unshift(r) : t.buffer.push(r);
t.needReadable && C(e);
}
O(e, t);
}
function T(e, t) {
var r, i;
(i = t, a.isBuffer(i) || i instanceof f) || "string" == typeof t || void 0 === t || e.objectMode || (r = new v("chunk", [ "string", "Buffer", "Uint8Array" ], t));
return r;
}
R.prototype.isPaused = function() {
return !1 === this._readableState.flowing;
};
R.prototype.setEncoding = function(t) {
d || (d = e("string_decoder/").StringDecoder);
var r = new d(t);
this._readableState.decoder = r;
this._readableState.encoding = this._readableState.decoder.encoding;
for (var i = this._readableState.buffer.head, n = ""; null !== i; ) {
n += r.write(i.data);
i = i.next;
}
this._readableState.buffer.clear();
"" !== n && this._readableState.buffer.push(n);
this._readableState.length = n.length;
return this;
};
var B = 1073741824;
function j(e) {
if (e >= B) e = B; else {
e--;
e |= e >>> 1;
e |= e >>> 2;
e |= e >>> 4;
e |= e >>> 8;
e |= e >>> 16;
e++;
}
return e;
}
function N(e, t) {
if (e <= 0 || 0 === t.length && t.ended) return 0;
if (t.objectMode) return 1;
if (e != e) return t.flowing && t.length ? t.buffer.head.data.length : t.length;
e > t.highWaterMark && (t.highWaterMark = j(e));
if (e <= t.length) return e;
if (!t.ended) {
t.needReadable = !0;
return 0;
}
return t.length;
}
R.prototype.read = function(e) {
u("read", e);
e = parseInt(e, 10);
var t = this._readableState, r = e;
0 !== e && (t.emittedReadable = !1);
if (0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended)) {
u("read: emitReadable", t.length, t.ended);
0 === t.length && t.ended ? W(this) : C(this);
return null;
}
if (0 === (e = N(e, t)) && t.ended) {
0 === t.length && W(this);
return null;
}
var i, n = t.needReadable;
u("need readable", n);
(0 === t.length || t.length - e < t.highWaterMark) && u("length less than watermark", n = !0);
if (t.ended || t.reading) u("reading or ended", n = !1); else if (n) {
u("do read");
t.reading = !0;
t.sync = !0;
0 === t.length && (t.needReadable = !0);
this._read(t.highWaterMark);
t.sync = !1;
t.reading || (e = N(r, t));
}
if (null === (i = e > 0 ? H(e, t) : null)) {
t.needReadable = t.length <= t.highWaterMark;
e = 0;
} else {
t.length -= e;
t.awaitDrain = 0;
}
if (0 === t.length) {
t.ended || (t.needReadable = !0);
r !== e && t.ended && W(this);
}
null !== i && this.emit("data", i);
return i;
};
function P(e, t) {
u("onEofChunk");
if (!t.ended) {
if (t.decoder) {
var r = t.decoder.end();
if (r && r.length) {
t.buffer.push(r);
t.length += t.objectMode ? 1 : r.length;
}
}
t.ended = !0;
if (t.sync) C(e); else {
t.needReadable = !1;
if (!t.emittedReadable) {
t.emittedReadable = !0;
L(e);
}
}
}
}
function C(e) {
var t = e._readableState;
u("emitReadable", t.needReadable, t.emittedReadable);
t.needReadable = !1;
if (!t.emittedReadable) {
u("emitReadable", t.flowing);
t.emittedReadable = !0;
r.nextTick(L, e);
}
}
function L(e) {
var t = e._readableState;
u("emitReadable_", t.destroyed, t.length, t.ended);
if (!t.destroyed && (t.length || t.ended)) {
e.emit("readable");
t.emittedReadable = !1;
}
t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark;
K(e);
}
function O(e, t) {
if (!t.readingMore) {
t.readingMore = !0;
r.nextTick(D, e, t);
}
}
function D(e, t) {
for (;!t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length); ) {
var r = t.length;
u("maybeReadMore read 0");
e.read(0);
if (r === t.length) break;
}
t.readingMore = !1;
}
R.prototype._read = function() {
E(this, new _("_read()"));
};
R.prototype.pipe = function(e, t) {
var i = this, n = this._readableState;
switch (n.pipesCount) {
case 0:
n.pipes = e;
break;

case 1:
n.pipes = [ n.pipes, e ];
break;

default:
n.pipes.push(e);
}
n.pipesCount += 1;
u("pipe count=%d opts=%j", n.pipesCount, t);
var o = t && !1 === t.end || e === r.stdout || e === r.stderr ? g : f;
n.endEmitted ? r.nextTick(o) : i.once("end", o);
e.on("unpipe", a);
function a(e, t) {
u("onunpipe");
if (e === i && t && !1 === t.hasUnpiped) {
t.hasUnpiped = !0;
d();
}
}
function f() {
u("onend");
e.end();
}
var c = U(i);
e.on("drain", c);
var h = !1;
function d() {
u("cleanup");
e.removeListener("close", b);
e.removeListener("finish", m);
e.removeListener("drain", c);
e.removeListener("error", p);
e.removeListener("unpipe", a);
i.removeListener("end", f);
i.removeListener("end", g);
i.removeListener("data", l);
h = !0;
!n.awaitDrain || e._writableState && !e._writableState.needDrain || c();
}
i.on("data", l);
function l(t) {
u("ondata");
var r = e.write(t);
u("dest.write", r);
if (!1 === r) {
if ((1 === n.pipesCount && n.pipes === e || n.pipesCount > 1 && -1 !== G(n.pipes, e)) && !h) {
u("false write response, pause", n.awaitDrain);
n.awaitDrain++;
}
i.pause();
}
}
function p(t) {
u("onerror", t);
g();
e.removeListener("error", p);
0 === s(e, "error") && E(e, t);
}
A(e, "error", p);
function b() {
e.removeListener("finish", m);
g();
}
e.once("close", b);
function m() {
u("onfinish");
e.removeListener("close", b);
g();
}
e.once("finish", m);
function g() {
u("unpipe");
i.unpipe(e);
}
e.emit("pipe", i);
if (!n.flowing) {
u("pipe resume");
i.resume();
}
return e;
};
function U(e) {
return function() {
var t = e._readableState;
u("pipeOnDrain", t.awaitDrain);
t.awaitDrain && t.awaitDrain--;
if (0 === t.awaitDrain && s(e, "data")) {
t.flowing = !0;
K(e);
}
};
}
R.prototype.unpipe = function(e) {
var t = this._readableState, r = {
hasUnpiped: !1
};
if (0 === t.pipesCount) return this;
if (1 === t.pipesCount) {
if (e && e !== t.pipes) return this;
e || (e = t.pipes);
t.pipes = null;
t.pipesCount = 0;
t.flowing = !1;
e && e.emit("unpipe", this, r);
return this;
}
if (!e) {
var i = t.pipes, n = t.pipesCount;
t.pipes = null;
t.pipesCount = 0;
t.flowing = !1;
for (var s = 0; s < n; s++) i[s].emit("unpipe", this, {
hasUnpiped: !1
});
return this;
}
var o = G(t.pipes, e);
if (-1 === o) return this;
t.pipes.splice(o, 1);
t.pipesCount -= 1;
1 === t.pipesCount && (t.pipes = t.pipes[0]);
e.emit("unpipe", this, r);
return this;
};
R.prototype.on = function(e, t) {
var i = o.prototype.on.call(this, e, t), n = this._readableState;
if ("data" === e) {
n.readableListening = this.listenerCount("readable") > 0;
!1 !== n.flowing && this.resume();
} else if ("readable" === e && !n.endEmitted && !n.readableListening) {
n.readableListening = n.needReadable = !0;
n.flowing = !1;
n.emittedReadable = !1;
u("on readable", n.length, n.reading);
n.length ? C(this) : n.reading || r.nextTick(F, this);
}
return i;
};
R.prototype.addListener = R.prototype.on;
R.prototype.removeListener = function(e, t) {
var i = o.prototype.removeListener.call(this, e, t);
"readable" === e && r.nextTick(q, this);
return i;
};
R.prototype.removeAllListeners = function(e) {
var t = o.prototype.removeAllListeners.apply(this, arguments);
"readable" !== e && void 0 !== e || r.nextTick(q, this);
return t;
};
function q(e) {
var t = e._readableState;
t.readableListening = e.listenerCount("readable") > 0;
t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume();
}
function F(e) {
u("readable nexttick read 0");
e.read(0);
}
R.prototype.resume = function() {
var e = this._readableState;
if (!e.flowing) {
u("resume");
e.flowing = !e.readableListening;
z(this, e);
}
e.paused = !1;
return this;
};
function z(e, t) {
if (!t.resumeScheduled) {
t.resumeScheduled = !0;
r.nextTick($, e, t);
}
}
function $(e, t) {
u("resume", t.reading);
t.reading || e.read(0);
t.resumeScheduled = !1;
e.emit("resume");
K(e);
t.flowing && !t.reading && e.read(0);
}
R.prototype.pause = function() {
u("call pause flowing=%j", this._readableState.flowing);
if (!1 !== this._readableState.flowing) {
u("pause");
this._readableState.flowing = !1;
this.emit("pause");
}
this._readableState.paused = !0;
return this;
};
function K(e) {
var t = e._readableState;
u("flow", t.flowing);
for (;t.flowing && null !== e.read(); ) ;
}
R.prototype.wrap = function(e) {
var t = this, r = this._readableState, i = !1;
e.on("end", function() {
u("wrapped end");
if (r.decoder && !r.ended) {
var e = r.decoder.end();
e && e.length && t.push(e);
}
t.push(null);
});
e.on("data", function(n) {
u("wrapped data");
r.decoder && (n = r.decoder.write(n));
if ((!r.objectMode || null != n) && (r.objectMode || n && n.length) && !t.push(n)) {
i = !0;
e.pause();
}
});
for (var n in e) void 0 === this[n] && "function" == typeof e[n] && (this[n] = function(t) {
return function() {
return e[t].apply(e, arguments);
};
}(n));
for (var s = 0; s < M.length; s++) e.on(M[s], this.emit.bind(this, M[s]));
this._read = function(t) {
u("wrapped _read", t);
if (i) {
i = !1;
e.resume();
}
};
return this;
};
"function" == typeof Symbol && (R.prototype[Symbol.asyncIterator] = function() {
void 0 === l && (l = e("./internal/streams/async_iterator"));
return l(this);
});
Object.defineProperty(R.prototype, "readableHighWaterMark", {
enumerable: !1,
get: function() {
return this._readableState.highWaterMark;
}
});
Object.defineProperty(R.prototype, "readableBuffer", {
enumerable: !1,
get: function() {
return this._readableState && this._readableState.buffer;
}
});
Object.defineProperty(R.prototype, "readableFlowing", {
enumerable: !1,
get: function() {
return this._readableState.flowing;
},
set: function(e) {
this._readableState && (this._readableState.flowing = e);
}
});
R._fromList = H;
Object.defineProperty(R.prototype, "readableLength", {
enumerable: !1,
get: function() {
return this._readableState.length;
}
});
function H(e, t) {
if (0 === t.length) return null;
var r;
if (t.objectMode) r = t.buffer.shift(); else if (!e || e >= t.length) {
r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length);
t.buffer.clear();
} else r = t.buffer.consume(e, t.decoder);
return r;
}
function W(e) {
var t = e._readableState;
u("endReadable", t.endEmitted);
if (!t.endEmitted) {
t.ended = !0;
r.nextTick(V, t, e);
}
}
function V(e, t) {
u("endReadableNT", e.endEmitted, e.length);
if (!e.endEmitted && 0 === e.length) {
e.endEmitted = !0;
t.readable = !1;
t.emit("end");
if (e.autoDestroy) {
var r = t._writableState;
(!r || r.autoDestroy && r.finished) && t.destroy();
}
}
}
"function" == typeof Symbol && (R.from = function(t, r) {
void 0 === p && (p = e("./internal/streams/from"));
return p(R, t, r);
});
function G(e, t) {
for (var r = 0, i = e.length; r < i; r++) if (e[r] === t) return r;
return -1;
}
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"../errors": 47,
"./_stream_duplex": 48,
"./internal/streams/async_iterator": 53,
"./internal/streams/buffer_list": 54,
"./internal/streams/destroy": 55,
"./internal/streams/from": 57,
"./internal/streams/state": 59,
"./internal/streams/stream": 60,
_process: 156,
buffer: 65,
events: 104,
inherits: 138,
"string_decoder/": 63,
util: 19
} ],
51: [ function(e, t) {
"use strict";
t.exports = c;
var r = e("../errors").codes, i = r.ERR_METHOD_NOT_IMPLEMENTED, n = r.ERR_MULTIPLE_CALLBACK, s = r.ERR_TRANSFORM_ALREADY_TRANSFORMING, o = r.ERR_TRANSFORM_WITH_LENGTH_0, a = e("./_stream_duplex");
e("inherits")(c, a);
function f(e, t) {
var r = this._transformState;
r.transforming = !1;
var i = r.writecb;
if (null === i) return this.emit("error", new n());
r.writechunk = null;
r.writecb = null;
null != t && this.push(t);
i(e);
var s = this._readableState;
s.reading = !1;
(s.needReadable || s.length < s.highWaterMark) && this._read(s.highWaterMark);
}
function c(e) {
if (!(this instanceof c)) return new c(e);
a.call(this, e);
this._transformState = {
afterTransform: f.bind(this),
needTransform: !1,
transforming: !1,
writecb: null,
writechunk: null,
writeencoding: null
};
this._readableState.needReadable = !0;
this._readableState.sync = !1;
if (e) {
"function" == typeof e.transform && (this._transform = e.transform);
"function" == typeof e.flush && (this._flush = e.flush);
}
this.on("prefinish", u);
}
function u() {
var e = this;
"function" != typeof this._flush || this._readableState.destroyed ? h(this, null, null) : this._flush(function(t, r) {
h(e, t, r);
});
}
c.prototype.push = function(e, t) {
this._transformState.needTransform = !1;
return a.prototype.push.call(this, e, t);
};
c.prototype._transform = function(e, t, r) {
r(new i("_transform()"));
};
c.prototype._write = function(e, t, r) {
var i = this._transformState;
i.writecb = r;
i.writechunk = e;
i.writeencoding = t;
if (!i.transforming) {
var n = this._readableState;
(i.needTransform || n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark);
}
};
c.prototype._read = function() {
var e = this._transformState;
if (null === e.writechunk || e.transforming) e.needTransform = !0; else {
e.transforming = !0;
this._transform(e.writechunk, e.writeencoding, e.afterTransform);
}
};
c.prototype._destroy = function(e, t) {
a.prototype._destroy.call(this, e, function(e) {
t(e);
});
};
function h(e, t, r) {
if (t) return e.emit("error", t);
null != r && e.push(r);
if (e._writableState.length) throw new o();
if (e._transformState.transforming) throw new s();
return e.push(null);
}
}, {
"../errors": 47,
"./_stream_duplex": 48,
inherits: 138
} ],
52: [ function(e, t) {
(function(r, i) {
"use strict";
t.exports = k;
function n(e) {
var t = this;
this.next = null;
this.entry = null;
this.finish = function() {
$(t, e);
};
}
var s;
k.WritableState = A;
var o = {
deprecate: e("util-deprecate")
}, a = e("./internal/streams/stream"), f = e("buffer").Buffer, c = i.Uint8Array || function() {};
function u(e) {
return f.from(e);
}
var h, d = e("./internal/streams/destroy"), l = e("./internal/streams/state").getHighWaterMark, p = e("../errors").codes, b = p.ERR_INVALID_ARG_TYPE, m = p.ERR_METHOD_NOT_IMPLEMENTED, g = p.ERR_MULTIPLE_CALLBACK, y = p.ERR_STREAM_CANNOT_PIPE, v = p.ERR_STREAM_DESTROYED, w = p.ERR_STREAM_NULL_VALUES, _ = p.ERR_STREAM_WRITE_AFTER_END, S = p.ERR_UNKNOWN_ENCODING, E = d.errorOrDestroy;
e("inherits")(k, a);
function M() {}
function A(t, r, i) {
s = s || e("./_stream_duplex");
t = t || {};
"boolean" != typeof i && (i = r instanceof s);
this.objectMode = !!t.objectMode;
i && (this.objectMode = this.objectMode || !!t.writableObjectMode);
this.highWaterMark = l(this, t, "writableHighWaterMark", i);
this.finalCalled = !1;
this.needDrain = !1;
this.ending = !1;
this.ended = !1;
this.finished = !1;
this.destroyed = !1;
var o = !1 === t.decodeStrings;
this.decodeStrings = !o;
this.defaultEncoding = t.defaultEncoding || "utf8";
this.length = 0;
this.writing = !1;
this.corked = 0;
this.sync = !0;
this.bufferProcessing = !1;
this.onwrite = function(e) {
P(r, e);
};
this.writecb = null;
this.writelen = 0;
this.bufferedRequest = null;
this.lastBufferedRequest = null;
this.pendingcb = 0;
this.prefinished = !1;
this.errorEmitted = !1;
this.emitClose = !1 !== t.emitClose;
this.autoDestroy = !!t.autoDestroy;
this.bufferedRequestCount = 0;
this.corkedRequestsFree = new n(this);
}
A.prototype.getBuffer = function() {
for (var e = this.bufferedRequest, t = []; e; ) {
t.push(e);
e = e.next;
}
return t;
};
(function() {
try {
Object.defineProperty(A.prototype, "buffer", {
get: o.deprecate(function() {
return this.getBuffer();
}, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
});
} catch (e) {}
})();
if ("function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance]) {
h = Function.prototype[Symbol.hasInstance];
Object.defineProperty(k, Symbol.hasInstance, {
value: function(e) {
return !!h.call(this, e) || this === k && e && e._writableState instanceof A;
}
});
} else h = function(e) {
return e instanceof this;
};
function k(t) {
var r = this instanceof (s = s || e("./_stream_duplex"));
if (!r && !h.call(k, this)) return new k(t);
this._writableState = new A(t, this, r);
this.writable = !0;
if (t) {
"function" == typeof t.write && (this._write = t.write);
"function" == typeof t.writev && (this._writev = t.writev);
"function" == typeof t.destroy && (this._destroy = t.destroy);
"function" == typeof t.final && (this._final = t.final);
}
a.call(this);
}
k.prototype.pipe = function() {
E(this, new y());
};
function R(e, t) {
var i = new _();
E(e, i);
r.nextTick(t, i);
}
function x(e, t, i, n) {
var s;
null === i ? s = new w() : "string" == typeof i || t.objectMode || (s = new b("chunk", [ "string", "Buffer" ], i));
if (s) {
E(e, s);
r.nextTick(n, s);
return !1;
}
return !0;
}
k.prototype.write = function(e, t, r) {
var i, n = this._writableState, s = !1, o = !n.objectMode && (i = e, f.isBuffer(i) || i instanceof c);
o && !f.isBuffer(e) && (e = u(e));
if ("function" == typeof t) {
r = t;
t = null;
}
o ? t = "buffer" : t || (t = n.defaultEncoding);
"function" != typeof r && (r = M);
if (n.ending) R(this, r); else if (o || x(this, n, e, r)) {
n.pendingcb++;
s = T(this, n, o, e, t, r);
}
return s;
};
k.prototype.cork = function() {
this._writableState.corked++;
};
k.prototype.uncork = function() {
var e = this._writableState;
if (e.corked) {
e.corked--;
e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || O(this, e);
}
};
k.prototype.setDefaultEncoding = function(e) {
"string" == typeof e && (e = e.toLowerCase());
if (!([ "hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw" ].indexOf((e + "").toLowerCase()) > -1)) throw new S(e);
this._writableState.defaultEncoding = e;
return this;
};
Object.defineProperty(k.prototype, "writableBuffer", {
enumerable: !1,
get: function() {
return this._writableState && this._writableState.getBuffer();
}
});
function I(e, t, r) {
e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = f.from(t, r));
return t;
}
Object.defineProperty(k.prototype, "writableHighWaterMark", {
enumerable: !1,
get: function() {
return this._writableState.highWaterMark;
}
});
function T(e, t, r, i, n, s) {
if (!r) {
var o = I(t, i, n);
if (i !== o) {
r = !0;
n = "buffer";
i = o;
}
}
var a = t.objectMode ? 1 : i.length;
t.length += a;
var f = t.length < t.highWaterMark;
f || (t.needDrain = !0);
if (t.writing || t.corked) {
var c = t.lastBufferedRequest;
t.lastBufferedRequest = {
chunk: i,
encoding: n,
isBuf: r,
callback: s,
next: null
};
c ? c.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest;
t.bufferedRequestCount += 1;
} else B(e, t, !1, a, i, n, s);
return f;
}
function B(e, t, r, i, n, s, o) {
t.writelen = i;
t.writecb = o;
t.writing = !0;
t.sync = !0;
t.destroyed ? t.onwrite(new v("write")) : r ? e._writev(n, t.onwrite) : e._write(n, s, t.onwrite);
t.sync = !1;
}
function j(e, t, i, n, s) {
--t.pendingcb;
if (i) {
r.nextTick(s, n);
r.nextTick(F, e, t);
e._writableState.errorEmitted = !0;
E(e, n);
} else {
s(n);
e._writableState.errorEmitted = !0;
E(e, n);
F(e, t);
}
}
function N(e) {
e.writing = !1;
e.writecb = null;
e.length -= e.writelen;
e.writelen = 0;
}
function P(e, t) {
var i = e._writableState, n = i.sync, s = i.writecb;
if ("function" != typeof s) throw new g();
N(i);
if (t) j(e, i, n, t, s); else {
var o = D(i) || e.destroyed;
o || i.corked || i.bufferProcessing || !i.bufferedRequest || O(e, i);
n ? r.nextTick(C, e, i, o, s) : C(e, i, o, s);
}
}
function C(e, t, r, i) {
r || L(e, t);
t.pendingcb--;
i();
F(e, t);
}
function L(e, t) {
if (0 === t.length && t.needDrain) {
t.needDrain = !1;
e.emit("drain");
}
}
function O(e, t) {
t.bufferProcessing = !0;
var r = t.bufferedRequest;
if (e._writev && r && r.next) {
var i = t.bufferedRequestCount, s = new Array(i), o = t.corkedRequestsFree;
o.entry = r;
for (var a = 0, f = !0; r; ) {
s[a] = r;
r.isBuf || (f = !1);
r = r.next;
a += 1;
}
s.allBuffers = f;
B(e, t, !0, t.length, s, "", o.finish);
t.pendingcb++;
t.lastBufferedRequest = null;
if (o.next) {
t.corkedRequestsFree = o.next;
o.next = null;
} else t.corkedRequestsFree = new n(t);
t.bufferedRequestCount = 0;
} else {
for (;r; ) {
var c = r.chunk, u = r.encoding, h = r.callback;
B(e, t, !1, t.objectMode ? 1 : c.length, c, u, h);
r = r.next;
t.bufferedRequestCount--;
if (t.writing) break;
}
null === r && (t.lastBufferedRequest = null);
}
t.bufferedRequest = r;
t.bufferProcessing = !1;
}
k.prototype._write = function(e, t, r) {
r(new m("_write()"));
};
k.prototype._writev = null;
k.prototype.end = function(e, t, r) {
var i = this._writableState;
if ("function" == typeof e) {
r = e;
e = null;
t = null;
} else if ("function" == typeof t) {
r = t;
t = null;
}
null != e && this.write(e, t);
if (i.corked) {
i.corked = 1;
this.uncork();
}
i.ending || z(this, i, r);
return this;
};
Object.defineProperty(k.prototype, "writableLength", {
enumerable: !1,
get: function() {
return this._writableState.length;
}
});
function D(e) {
return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing;
}
function U(e, t) {
e._final(function(r) {
t.pendingcb--;
r && E(e, r);
t.prefinished = !0;
e.emit("prefinish");
F(e, t);
});
}
function q(e, t) {
if (!t.prefinished && !t.finalCalled) if ("function" != typeof e._final || t.destroyed) {
t.prefinished = !0;
e.emit("prefinish");
} else {
t.pendingcb++;
t.finalCalled = !0;
r.nextTick(U, e, t);
}
}
function F(e, t) {
var r = D(t);
if (r) {
q(e, t);
if (0 === t.pendingcb) {
t.finished = !0;
e.emit("finish");
if (t.autoDestroy) {
var i = e._readableState;
(!i || i.autoDestroy && i.endEmitted) && e.destroy();
}
}
}
return r;
}
function z(e, t, i) {
t.ending = !0;
F(e, t);
i && (t.finished ? r.nextTick(i) : e.once("finish", i));
t.ended = !0;
e.writable = !1;
}
function $(e, t, r) {
var i = e.entry;
e.entry = null;
for (;i; ) {
var n = i.callback;
t.pendingcb--;
n(r);
i = i.next;
}
t.corkedRequestsFree.next = e;
}
Object.defineProperty(k.prototype, "destroyed", {
enumerable: !1,
get: function() {
return void 0 !== this._writableState && this._writableState.destroyed;
},
set: function(e) {
this._writableState && (this._writableState.destroyed = e);
}
});
k.prototype.destroy = d.destroy;
k.prototype._undestroy = d.undestroy;
k.prototype._destroy = function(e, t) {
t(e);
};
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"../errors": 47,
"./_stream_duplex": 48,
"./internal/streams/destroy": 55,
"./internal/streams/state": 59,
"./internal/streams/stream": 60,
_process: 156,
buffer: 65,
inherits: 138,
"util-deprecate": 194
} ],
53: [ function(e, t) {
(function(r) {
"use strict";
var i;
function n(e, t, r) {
t in e ? Object.defineProperty(e, t, {
value: r,
enumerable: !0,
configurable: !0,
writable: !0
}) : e[t] = r;
return e;
}
var s = e("./end-of-stream"), o = Symbol("lastResolve"), a = Symbol("lastReject"), f = Symbol("error"), c = Symbol("ended"), u = Symbol("lastPromise"), h = Symbol("handlePromise"), d = Symbol("stream");
function l(e, t) {
return {
value: e,
done: t
};
}
function p(e) {
var t = e[o];
if (null !== t) {
var r = e[d].read();
if (null !== r) {
e[u] = null;
e[o] = null;
e[a] = null;
t(l(r, !1));
}
}
}
function b(e) {
r.nextTick(p, e);
}
function m(e, t) {
return function(r, i) {
e.then(function() {
t[c] ? r(l(void 0, !0)) : t[h](r, i);
}, i);
};
}
var g = Object.getPrototypeOf(function() {}), y = Object.setPrototypeOf((n(i = {
get stream() {
return this[d];
},
next: function() {
var e = this, t = this[f];
if (null !== t) return Promise.reject(t);
if (this[c]) return Promise.resolve(l(void 0, !0));
if (this[d].destroyed) return new Promise(function(t, i) {
r.nextTick(function() {
e[f] ? i(e[f]) : t(l(void 0, !0));
});
});
var i, n = this[u];
if (n) i = new Promise(m(n, this)); else {
var s = this[d].read();
if (null !== s) return Promise.resolve(l(s, !1));
i = new Promise(this[h]);
}
this[u] = i;
return i;
}
}, Symbol.asyncIterator, function() {
return this;
}), n(i, "return", function() {
var e = this;
return new Promise(function(t, r) {
e[d].destroy(null, function(e) {
e ? r(e) : t(l(void 0, !0));
});
});
}), i), g);
t.exports = function(e) {
var t, r = Object.create(y, (n(t = {}, d, {
value: e,
writable: !0
}), n(t, o, {
value: null,
writable: !0
}), n(t, a, {
value: null,
writable: !0
}), n(t, f, {
value: null,
writable: !0
}), n(t, c, {
value: e._readableState.endEmitted,
writable: !0
}), n(t, h, {
value: function(e, t) {
var i = r[d].read();
if (i) {
r[u] = null;
r[o] = null;
r[a] = null;
e(l(i, !1));
} else {
r[o] = e;
r[a] = t;
}
},
writable: !0
}), t));
r[u] = null;
s(e, function(e) {
if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
var t = r[a];
if (null !== t) {
r[u] = null;
r[o] = null;
r[a] = null;
t(e);
}
r[f] = e;
} else {
var i = r[o];
if (null !== i) {
r[u] = null;
r[o] = null;
r[a] = null;
i(l(void 0, !0));
}
r[c] = !0;
}
});
e.on("readable", b.bind(null, r));
return r;
};
}).call(this, e("_process"));
}, {
"./end-of-stream": 56,
_process: 156
} ],
54: [ function(e, t) {
"use strict";
function r(e, t) {
var r = Object.keys(e);
if (Object.getOwnPropertySymbols) {
var i = Object.getOwnPropertySymbols(e);
t && (i = i.filter(function(t) {
return Object.getOwnPropertyDescriptor(e, t).enumerable;
}));
r.push.apply(r, i);
}
return r;
}
function i(e) {
for (var t = 1; t < arguments.length; t++) {
var i = null != arguments[t] ? arguments[t] : {};
t % 2 ? r(Object(i), !0).forEach(function(t) {
n(e, t, i[t]);
}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : r(Object(i)).forEach(function(t) {
Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
});
}
return e;
}
function n(e, t, r) {
t in e ? Object.defineProperty(e, t, {
value: r,
enumerable: !0,
configurable: !0,
writable: !0
}) : e[t] = r;
return e;
}
function s(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function o(e, t) {
for (var r = 0; r < t.length; r++) {
var i = t[r];
i.enumerable = i.enumerable || !1;
i.configurable = !0;
"value" in i && (i.writable = !0);
Object.defineProperty(e, i.key, i);
}
}
function a(e, t, r) {
t && o(e.prototype, t);
r && o(e, r);
return e;
}
var f = e("buffer").Buffer, c = e("util").inspect, u = c && c.custom || "inspect";
t.exports = function() {
function e() {
s(this, e);
this.head = null;
this.tail = null;
this.length = 0;
}
a(e, [ {
key: "push",
value: function(e) {
var t = {
data: e,
next: null
};
this.length > 0 ? this.tail.next = t : this.head = t;
this.tail = t;
++this.length;
}
}, {
key: "unshift",
value: function(e) {
var t = {
data: e,
next: this.head
};
0 === this.length && (this.tail = t);
this.head = t;
++this.length;
}
}, {
key: "shift",
value: function() {
if (0 !== this.length) {
var e = this.head.data;
1 === this.length ? this.head = this.tail = null : this.head = this.head.next;
--this.length;
return e;
}
}
}, {
key: "clear",
value: function() {
this.head = this.tail = null;
this.length = 0;
}
}, {
key: "join",
value: function(e) {
if (0 === this.length) return "";
for (var t = this.head, r = "" + t.data; t = t.next; ) r += e + t.data;
return r;
}
}, {
key: "concat",
value: function(e) {
if (0 === this.length) return f.alloc(0);
for (var t, r, i, n = f.allocUnsafe(e >>> 0), s = this.head, o = 0; s; ) {
t = s.data, r = n, i = o, f.prototype.copy.call(t, r, i);
o += s.data.length;
s = s.next;
}
return n;
}
}, {
key: "consume",
value: function(e, t) {
var r;
if (e < this.head.data.length) {
r = this.head.data.slice(0, e);
this.head.data = this.head.data.slice(e);
} else r = e === this.head.data.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e);
return r;
}
}, {
key: "first",
value: function() {
return this.head.data;
}
}, {
key: "_getString",
value: function(e) {
var t = this.head, r = 1, i = t.data;
e -= i.length;
for (;t = t.next; ) {
var n = t.data, s = e > n.length ? n.length : e;
s === n.length ? i += n : i += n.slice(0, e);
if (0 == (e -= s)) {
if (s === n.length) {
++r;
t.next ? this.head = t.next : this.head = this.tail = null;
} else {
this.head = t;
t.data = n.slice(s);
}
break;
}
++r;
}
this.length -= r;
return i;
}
}, {
key: "_getBuffer",
value: function(e) {
var t = f.allocUnsafe(e), r = this.head, i = 1;
r.data.copy(t);
e -= r.data.length;
for (;r = r.next; ) {
var n = r.data, s = e > n.length ? n.length : e;
n.copy(t, t.length - e, 0, s);
if (0 == (e -= s)) {
if (s === n.length) {
++i;
r.next ? this.head = r.next : this.head = this.tail = null;
} else {
this.head = r;
r.data = n.slice(s);
}
break;
}
++i;
}
this.length -= i;
return t;
}
}, {
key: u,
value: function(e, t) {
return c(this, i({}, t, {
depth: 0,
customInspect: !1
}));
}
} ]);
return e;
}();
}, {
buffer: 65,
util: 19
} ],
55: [ function(e, t) {
(function(e) {
"use strict";
function r(e, t) {
n(e, t);
i(e);
}
function i(e) {
e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close");
}
function n(e, t) {
e.emit("error", t);
}
t.exports = {
destroy: function(t, s) {
var o = this, a = this._readableState && this._readableState.destroyed, f = this._writableState && this._writableState.destroyed;
if (a || f) {
if (s) s(t); else if (t) if (this._writableState) {
if (!this._writableState.errorEmitted) {
this._writableState.errorEmitted = !0;
e.nextTick(n, this, t);
}
} else e.nextTick(n, this, t);
return this;
}
this._readableState && (this._readableState.destroyed = !0);
this._writableState && (this._writableState.destroyed = !0);
this._destroy(t || null, function(t) {
if (!s && t) if (o._writableState) if (o._writableState.errorEmitted) e.nextTick(i, o); else {
o._writableState.errorEmitted = !0;
e.nextTick(r, o, t);
} else e.nextTick(r, o, t); else if (s) {
e.nextTick(i, o);
s(t);
} else e.nextTick(i, o);
});
return this;
},
undestroy: function() {
if (this._readableState) {
this._readableState.destroyed = !1;
this._readableState.reading = !1;
this._readableState.ended = !1;
this._readableState.endEmitted = !1;
}
if (this._writableState) {
this._writableState.destroyed = !1;
this._writableState.ended = !1;
this._writableState.ending = !1;
this._writableState.finalCalled = !1;
this._writableState.prefinished = !1;
this._writableState.finished = !1;
this._writableState.errorEmitted = !1;
}
},
errorOrDestroy: function(e, t) {
var r = e._readableState, i = e._writableState;
r && r.autoDestroy || i && i.autoDestroy ? e.destroy(t) : e.emit("error", t);
}
};
}).call(this, e("_process"));
}, {
_process: 156
} ],
56: [ function(e, t) {
"use strict";
var r = e("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;
function i(e) {
var t = !1;
return function() {
if (!t) {
t = !0;
for (var r = arguments.length, i = new Array(r), n = 0; n < r; n++) i[n] = arguments[n];
e.apply(this, i);
}
};
}
function n() {}
function s(e) {
return e.setHeader && "function" == typeof e.abort;
}
t.exports = function e(t, o, a) {
if ("function" == typeof o) return e(t, null, o);
o || (o = {});
a = i(a || n);
var f = o.readable || !1 !== o.readable && t.readable, c = o.writable || !1 !== o.writable && t.writable, u = function() {
t.writable || d();
}, h = t._writableState && t._writableState.finished, d = function() {
c = !1;
h = !0;
f || a.call(t);
}, l = t._readableState && t._readableState.endEmitted, p = function() {
f = !1;
l = !0;
c || a.call(t);
}, b = function(e) {
a.call(t, e);
}, m = function() {
var e;
if (f && !l) {
t._readableState && t._readableState.ended || (e = new r());
return a.call(t, e);
}
if (c && !h) {
t._writableState && t._writableState.ended || (e = new r());
return a.call(t, e);
}
}, g = function() {
t.req.on("finish", d);
};
if (s(t)) {
t.on("complete", d);
t.on("abort", m);
t.req ? g() : t.on("request", g);
} else if (c && !t._writableState) {
t.on("end", u);
t.on("close", u);
}
t.on("end", p);
t.on("finish", d);
!1 !== o.error && t.on("error", b);
t.on("close", m);
return function() {
t.removeListener("complete", d);
t.removeListener("abort", m);
t.removeListener("request", g);
t.req && t.req.removeListener("finish", d);
t.removeListener("end", u);
t.removeListener("close", u);
t.removeListener("finish", d);
t.removeListener("end", p);
t.removeListener("error", b);
t.removeListener("close", m);
};
};
}, {
"../../../errors": 47
} ],
57: [ function(e, t) {
t.exports = function() {
throw new Error("Readable.from is not available in the browser");
};
}, {} ],
58: [ function(e, t) {
"use strict";
var r;
function i(e) {
var t = !1;
return function() {
if (!t) {
t = !0;
e.apply(void 0, arguments);
}
};
}
var n = e("../../../errors").codes, s = n.ERR_MISSING_ARGS, o = n.ERR_STREAM_DESTROYED;
function a(e) {
if (e) throw e;
}
function f(e) {
return e.setHeader && "function" == typeof e.abort;
}
function c(t, n, s, a) {
a = i(a);
var c = !1;
t.on("close", function() {
c = !0;
});
void 0 === r && (r = e("./end-of-stream"));
r(t, {
readable: n,
writable: s
}, function(e) {
if (e) return a(e);
c = !0;
a();
});
var u = !1;
return function(e) {
if (!c && !u) {
u = !0;
if (f(t)) return t.abort();
if ("function" == typeof t.destroy) return t.destroy();
a(e || new o("pipe"));
}
};
}
function u(e) {
e();
}
function h(e, t) {
return e.pipe(t);
}
function d(e) {
return e.length ? "function" != typeof e[e.length - 1] ? a : e.pop() : a;
}
t.exports = function() {
for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
var i, n = d(t);
Array.isArray(t[0]) && (t = t[0]);
if (t.length < 2) throw new s("streams");
var o = t.map(function(e, r) {
var s = r < t.length - 1;
return c(e, s, r > 0, function(e) {
i || (i = e);
e && o.forEach(u);
if (!s) {
o.forEach(u);
n(i);
}
});
});
return t.reduce(h);
};
}, {
"../../../errors": 47,
"./end-of-stream": 56
} ],
59: [ function(e, t) {
"use strict";
var r = e("../../../errors").codes.ERR_INVALID_OPT_VALUE;
function i(e, t, r) {
return null != e.highWaterMark ? e.highWaterMark : t ? e[r] : null;
}
t.exports = {
getHighWaterMark: function(e, t, n, s) {
var o = i(t, s, n);
if (null != o) {
if (!isFinite(o) || Math.floor(o) !== o || o < 0) throw new r(s ? n : "highWaterMark", o);
return Math.floor(o);
}
return e.objectMode ? 16 : 16384;
}
};
}, {
"../../../errors": 47
} ],
60: [ function(e, t) {
t.exports = e("events").EventEmitter;
}, {
events: 104
} ],
61: [ function(e, t, r) {
(r = t.exports = e("./lib/_stream_readable.js")).Stream = r;
r.Readable = r;
r.Writable = e("./lib/_stream_writable.js");
r.Duplex = e("./lib/_stream_duplex.js");
r.Transform = e("./lib/_stream_transform.js");
r.PassThrough = e("./lib/_stream_passthrough.js");
r.finished = e("./lib/internal/streams/end-of-stream.js");
r.pipeline = e("./lib/internal/streams/pipeline.js");
}, {
"./lib/_stream_duplex.js": 48,
"./lib/_stream_passthrough.js": 49,
"./lib/_stream_readable.js": 50,
"./lib/_stream_transform.js": 51,
"./lib/_stream_writable.js": 52,
"./lib/internal/streams/end-of-stream.js": 56,
"./lib/internal/streams/pipeline.js": 58
} ],
62: [ function(e, t, r) {
var i = e("buffer"), n = i.Buffer;
function s(e, t) {
for (var r in e) t[r] = e[r];
}
if (n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow) t.exports = i; else {
s(i, r);
r.Buffer = o;
}
function o(e, t, r) {
return n(e, t, r);
}
o.prototype = Object.create(n.prototype);
s(n, o);
o.from = function(e, t, r) {
if ("number" == typeof e) throw new TypeError("Argument must not be a number");
return n(e, t, r);
};
o.alloc = function(e, t, r) {
if ("number" != typeof e) throw new TypeError("Argument must be a number");
var i = n(e);
void 0 !== t ? "string" == typeof r ? i.fill(t, r) : i.fill(t) : i.fill(0);
return i;
};
o.allocUnsafe = function(e) {
if ("number" != typeof e) throw new TypeError("Argument must be a number");
return n(e);
};
o.allocUnsafeSlow = function(e) {
if ("number" != typeof e) throw new TypeError("Argument must be a number");
return i.SlowBuffer(e);
};
}, {
buffer: 65
} ],
63: [ function(e, t, r) {
"use strict";
var i = e("safe-buffer").Buffer, n = i.isEncoding || function(e) {
switch ((e = "" + e) && e.toLowerCase()) {
case "hex":
case "utf8":
case "utf-8":
case "ascii":
case "binary":
case "base64":
case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
case "raw":
return !0;

default:
return !1;
}
};
function s(e) {
if (!e) return "utf8";
for (var t; ;) switch (e) {
case "utf8":
case "utf-8":
return "utf8";

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return "utf16le";

case "latin1":
case "binary":
return "latin1";

case "base64":
case "ascii":
case "hex":
return e;

default:
if (t) return;
e = ("" + e).toLowerCase();
t = !0;
}
}
function o(e) {
var t = s(e);
if ("string" != typeof t && (i.isEncoding === n || !n(e))) throw new Error("Unknown encoding: " + e);
return t || e;
}
r.StringDecoder = a;
function a(e) {
this.encoding = o(e);
var t;
switch (this.encoding) {
case "utf16le":
this.text = d;
this.end = l;
t = 4;
break;

case "utf8":
this.fillLast = h;
t = 4;
break;

case "base64":
this.text = p;
this.end = b;
t = 3;
break;

default:
this.write = m;
this.end = g;
return;
}
this.lastNeed = 0;
this.lastTotal = 0;
this.lastChar = i.allocUnsafe(t);
}
a.prototype.write = function(e) {
if (0 === e.length) return "";
var t, r;
if (this.lastNeed) {
if (void 0 === (t = this.fillLast(e))) return "";
r = this.lastNeed;
this.lastNeed = 0;
} else r = 0;
return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || "";
};
a.prototype.end = function(e) {
var t = e && e.length ? this.write(e) : "";
return this.lastNeed ? t + "�" : t;
};
a.prototype.text = function(e, t) {
var r = c(this, e, t);
if (!this.lastNeed) return e.toString("utf8", t);
this.lastTotal = r;
var i = e.length - (r - this.lastNeed);
e.copy(this.lastChar, 0, i);
return e.toString("utf8", t, i);
};
a.prototype.fillLast = function(e) {
if (this.lastNeed <= e.length) {
e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
return this.lastChar.toString(this.encoding, 0, this.lastTotal);
}
e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length);
this.lastNeed -= e.length;
};
function f(e) {
return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2;
}
function c(e, t, r) {
var i = t.length - 1;
if (i < r) return 0;
var n = f(t[i]);
if (n >= 0) {
n > 0 && (e.lastNeed = n - 1);
return n;
}
if (--i < r || -2 === n) return 0;
if ((n = f(t[i])) >= 0) {
n > 0 && (e.lastNeed = n - 2);
return n;
}
if (--i < r || -2 === n) return 0;
if ((n = f(t[i])) >= 0) {
n > 0 && (2 === n ? n = 0 : e.lastNeed = n - 3);
return n;
}
return 0;
}
function u(e, t) {
if (128 != (192 & t[0])) {
e.lastNeed = 0;
return "�";
}
if (e.lastNeed > 1 && t.length > 1) {
if (128 != (192 & t[1])) {
e.lastNeed = 1;
return "�";
}
if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2])) {
e.lastNeed = 2;
return "�";
}
}
}
function h(e) {
var t = this.lastTotal - this.lastNeed, r = u(this, e);
if (void 0 !== r) return r;
if (this.lastNeed <= e.length) {
e.copy(this.lastChar, t, 0, this.lastNeed);
return this.lastChar.toString(this.encoding, 0, this.lastTotal);
}
e.copy(this.lastChar, t, 0, e.length);
this.lastNeed -= e.length;
}
function d(e, t) {
if ((e.length - t) % 2 == 0) {
var r = e.toString("utf16le", t);
if (r) {
var i = r.charCodeAt(r.length - 1);
if (i >= 55296 && i <= 56319) {
this.lastNeed = 2;
this.lastTotal = 4;
this.lastChar[0] = e[e.length - 2];
this.lastChar[1] = e[e.length - 1];
return r.slice(0, -1);
}
}
return r;
}
this.lastNeed = 1;
this.lastTotal = 2;
this.lastChar[0] = e[e.length - 1];
return e.toString("utf16le", t, e.length - 1);
}
function l(e) {
var t = e && e.length ? this.write(e) : "";
if (this.lastNeed) {
var r = this.lastTotal - this.lastNeed;
return t + this.lastChar.toString("utf16le", 0, r);
}
return t;
}
function p(e, t) {
var r = (e.length - t) % 3;
if (0 === r) return e.toString("base64", t);
this.lastNeed = 3 - r;
this.lastTotal = 3;
if (1 === r) this.lastChar[0] = e[e.length - 1]; else {
this.lastChar[0] = e[e.length - 2];
this.lastChar[1] = e[e.length - 1];
}
return e.toString("base64", t, e.length - r);
}
function b(e) {
var t = e && e.length ? this.write(e) : "";
return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t;
}
function m(e) {
return e.toString(this.encoding);
}
function g(e) {
return e && e.length ? this.write(e) : "";
}
}, {
"safe-buffer": 62
} ],
64: [ function(e, t) {
(function(e) {
t.exports = function(t, r) {
for (var i = Math.min(t.length, r.length), n = new e(i), s = 0; s < i; ++s) n[s] = t[s] ^ r[s];
return n;
};
}).call(this, e("buffer").Buffer);
}, {
buffer: 65
} ],
65: [ function(e, t, r) {
(function(t) {
"use strict";
var i = e("base64-js"), n = e("ieee754"), s = e("isarray");
r.Buffer = f;
r.SlowBuffer = function(e) {
+e != e && (e = 0);
return f.alloc(+e);
};
r.INSPECT_MAX_BYTES = 50;
f.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
try {
var e = new Uint8Array(1);
e.__proto__ = {
__proto__: Uint8Array.prototype,
foo: function() {
return 42;
}
};
return 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
} catch (e) {
return !1;
}
}();
r.kMaxLength = o();
function o() {
return f.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function a(e, t) {
if (o() < t) throw new RangeError("Invalid typed array length");
if (f.TYPED_ARRAY_SUPPORT) (e = new Uint8Array(t)).__proto__ = f.prototype; else {
null === e && (e = new f(t));
e.length = t;
}
return e;
}
function f(e, t, r) {
if (!(f.TYPED_ARRAY_SUPPORT || this instanceof f)) return new f(e, t, r);
if ("number" == typeof e) {
if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
return d(this, e);
}
return c(this, e, t, r);
}
f.poolSize = 8192;
f._augment = function(e) {
e.__proto__ = f.prototype;
return e;
};
function c(e, t, r, i) {
if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? b(e, t, r, i) : "string" == typeof t ? l(e, t, r) : m(e, t);
}
f.from = function(e, t, r) {
return c(null, e, t, r);
};
if (f.TYPED_ARRAY_SUPPORT) {
f.prototype.__proto__ = Uint8Array.prototype;
f.__proto__ = Uint8Array;
"undefined" != typeof Symbol && Symbol.species && f[Symbol.species] === f && Object.defineProperty(f, Symbol.species, {
value: null,
configurable: !0
});
}
function u(e) {
if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
if (e < 0) throw new RangeError('"size" argument must not be negative');
}
function h(e, t, r, i) {
u(t);
return t <= 0 ? a(e, t) : void 0 !== r ? "string" == typeof i ? a(e, t).fill(r, i) : a(e, t).fill(r) : a(e, t);
}
f.alloc = function(e, t, r) {
return h(null, e, t, r);
};
function d(e, t) {
u(t);
e = a(e, t < 0 ? 0 : 0 | g(t));
if (!f.TYPED_ARRAY_SUPPORT) for (var r = 0; r < t; ++r) e[r] = 0;
return e;
}
f.allocUnsafe = function(e) {
return d(null, e);
};
f.allocUnsafeSlow = function(e) {
return d(null, e);
};
function l(e, t, r) {
"string" == typeof r && "" !== r || (r = "utf8");
if (!f.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
var i = 0 | y(t, r), n = (e = a(e, i)).write(t, r);
n !== i && (e = e.slice(0, n));
return e;
}
function p(e, t) {
var r = t.length < 0 ? 0 : 0 | g(t.length);
e = a(e, r);
for (var i = 0; i < r; i += 1) e[i] = 255 & t[i];
return e;
}
function b(e, t, r, i) {
t.byteLength;
if (r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds");
if (t.byteLength < r + (i || 0)) throw new RangeError("'length' is out of bounds");
t = void 0 === r && void 0 === i ? new Uint8Array(t) : void 0 === i ? new Uint8Array(t, r) : new Uint8Array(t, r, i);
f.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = f.prototype : e = p(e, t);
return e;
}
function m(e, t) {
if (f.isBuffer(t)) {
var r = 0 | g(t.length);
if (0 === (e = a(e, r)).length) return e;
t.copy(e, 0, 0, r);
return e;
}
if (t) {
if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (i = t.length) != i ? a(e, 0) : p(e, t);
if ("Buffer" === t.type && s(t.data)) return p(e, t.data);
}
var i;
throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function g(e) {
if (e >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
return 0 | e;
}
f.isBuffer = function(e) {
return !(null == e || !e._isBuffer);
};
f.compare = function(e, t) {
if (!f.isBuffer(e) || !f.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
if (e === t) return 0;
for (var r = e.length, i = t.length, n = 0, s = Math.min(r, i); n < s; ++n) if (e[n] !== t[n]) {
r = e[n];
i = t[n];
break;
}
return r < i ? -1 : i < r ? 1 : 0;
};
f.isEncoding = function(e) {
switch (String(e).toLowerCase()) {
case "hex":
case "utf8":
case "utf-8":
case "ascii":
case "latin1":
case "binary":
case "base64":
case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return !0;

default:
return !1;
}
};
f.concat = function(e, t) {
if (!s(e)) throw new TypeError('"list" argument must be an Array of Buffers');
if (0 === e.length) return f.alloc(0);
var r;
if (void 0 === t) {
t = 0;
for (r = 0; r < e.length; ++r) t += e[r].length;
}
var i = f.allocUnsafe(t), n = 0;
for (r = 0; r < e.length; ++r) {
var o = e[r];
if (!f.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
o.copy(i, n);
n += o.length;
}
return i;
};
function y(e, t) {
if (f.isBuffer(e)) return e.length;
if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
"string" != typeof e && (e = "" + e);
var r = e.length;
if (0 === r) return 0;
for (var i = !1; ;) switch (t) {
case "ascii":
case "latin1":
case "binary":
return r;

case "utf8":
case "utf-8":
case void 0:
return V(e).length;

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return 2 * r;

case "hex":
return r >>> 1;

case "base64":
return Y(e).length;

default:
if (i) return V(e).length;
t = ("" + t).toLowerCase();
i = !0;
}
}
f.byteLength = y;
function v(e, t, r) {
var i = !1;
(void 0 === t || t < 0) && (t = 0);
if (t > this.length) return "";
(void 0 === r || r > this.length) && (r = this.length);
if (r <= 0) return "";
if ((r >>>= 0) <= (t >>>= 0)) return "";
e || (e = "utf8");
for (;;) switch (e) {
case "hex":
return C(this, t, r);

case "utf8":
case "utf-8":
return T(this, t, r);

case "ascii":
return N(this, t, r);

case "latin1":
case "binary":
return P(this, t, r);

case "base64":
return I(this, t, r);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return L(this, t, r);

default:
if (i) throw new TypeError("Unknown encoding: " + e);
e = (e + "").toLowerCase();
i = !0;
}
}
f.prototype._isBuffer = !0;
function w(e, t, r) {
var i = e[t];
e[t] = e[r];
e[r] = i;
}
f.prototype.swap16 = function() {
var e = this.length;
if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
for (var t = 0; t < e; t += 2) w(this, t, t + 1);
return this;
};
f.prototype.swap32 = function() {
var e = this.length;
if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
for (var t = 0; t < e; t += 4) {
w(this, t, t + 3);
w(this, t + 1, t + 2);
}
return this;
};
f.prototype.swap64 = function() {
var e = this.length;
if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
for (var t = 0; t < e; t += 8) {
w(this, t, t + 7);
w(this, t + 1, t + 6);
w(this, t + 2, t + 5);
w(this, t + 3, t + 4);
}
return this;
};
f.prototype.toString = function() {
var e = 0 | this.length;
return 0 === e ? "" : 0 === arguments.length ? T(this, 0, e) : v.apply(this, arguments);
};
f.prototype.equals = function(e) {
if (!f.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
return this === e || 0 === f.compare(this, e);
};
f.prototype.inspect = function() {
var e = "", t = r.INSPECT_MAX_BYTES;
if (this.length > 0) {
e = this.toString("hex", 0, t).match(/.{2}/g).join(" ");
this.length > t && (e += " ... ");
}
return "<Buffer " + e + ">";
};
f.prototype.compare = function(e, t, r, i, n) {
if (!f.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
void 0 === t && (t = 0);
void 0 === r && (r = e ? e.length : 0);
void 0 === i && (i = 0);
void 0 === n && (n = this.length);
if (t < 0 || r > e.length || i < 0 || n > this.length) throw new RangeError("out of range index");
if (i >= n && t >= r) return 0;
if (i >= n) return -1;
if (t >= r) return 1;
if (this === e) return 0;
for (var s = (n >>>= 0) - (i >>>= 0), o = (r >>>= 0) - (t >>>= 0), a = Math.min(s, o), c = this.slice(i, n), u = e.slice(t, r), h = 0; h < a; ++h) if (c[h] !== u[h]) {
s = c[h];
o = u[h];
break;
}
return s < o ? -1 : o < s ? 1 : 0;
};
function _(e, t, r, i, n) {
if (0 === e.length) return -1;
if ("string" == typeof r) {
i = r;
r = 0;
} else r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648);
r = +r;
isNaN(r) && (r = n ? 0 : e.length - 1);
r < 0 && (r = e.length + r);
if (r >= e.length) {
if (n) return -1;
r = e.length - 1;
} else if (r < 0) {
if (!n) return -1;
r = 0;
}
"string" == typeof t && (t = f.from(t, i));
if (f.isBuffer(t)) return 0 === t.length ? -1 : S(e, t, r, i, n);
if ("number" == typeof t) {
t &= 255;
return f.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : S(e, [ t ], r, i, n);
}
throw new TypeError("val must be string, number or Buffer");
}
function S(e, t, r, i, n) {
var s, o = 1, a = e.length, f = t.length;
if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
if (e.length < 2 || t.length < 2) return -1;
o = 2;
a /= 2;
f /= 2;
r /= 2;
}
function c(e, t) {
return 1 === o ? e[t] : e.readUInt16BE(t * o);
}
if (n) {
var u = -1;
for (s = r; s < a; s++) if (c(e, s) === c(t, -1 === u ? 0 : s - u)) {
-1 === u && (u = s);
if (s - u + 1 === f) return u * o;
} else {
-1 !== u && (s -= s - u);
u = -1;
}
} else {
r + f > a && (r = a - f);
for (s = r; s >= 0; s--) {
for (var h = !0, d = 0; d < f; d++) if (c(e, s + d) !== c(t, d)) {
h = !1;
break;
}
if (h) return s;
}
}
return -1;
}
f.prototype.includes = function(e, t, r) {
return -1 !== this.indexOf(e, t, r);
};
f.prototype.indexOf = function(e, t, r) {
return _(this, e, t, r, !0);
};
f.prototype.lastIndexOf = function(e, t, r) {
return _(this, e, t, r, !1);
};
function E(e, t, r, i) {
r = Number(r) || 0;
var n = e.length - r;
i ? (i = Number(i)) > n && (i = n) : i = n;
var s = t.length;
if (s % 2 != 0) throw new TypeError("Invalid hex string");
i > s / 2 && (i = s / 2);
for (var o = 0; o < i; ++o) {
var a = parseInt(t.substr(2 * o, 2), 16);
if (isNaN(a)) return o;
e[r + o] = a;
}
return o;
}
function M(e, t, r, i) {
return J(V(t, e.length - r), e, r, i);
}
function A(e, t, r, i) {
return J(G(t), e, r, i);
}
function k(e, t, r, i) {
return A(e, t, r, i);
}
function R(e, t, r, i) {
return J(Y(t), e, r, i);
}
function x(e, t, r, i) {
return J(X(t, e.length - r), e, r, i);
}
f.prototype.write = function(e, t, r, i) {
if (void 0 === t) {
i = "utf8";
r = this.length;
t = 0;
} else if (void 0 === r && "string" == typeof t) {
i = t;
r = this.length;
t = 0;
} else {
if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
t |= 0;
if (isFinite(r)) {
r |= 0;
void 0 === i && (i = "utf8");
} else {
i = r;
r = void 0;
}
}
var n = this.length - t;
(void 0 === r || r > n) && (r = n);
if (e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
i || (i = "utf8");
for (var s = !1; ;) switch (i) {
case "hex":
return E(this, e, t, r);

case "utf8":
case "utf-8":
return M(this, e, t, r);

case "ascii":
return A(this, e, t, r);

case "latin1":
case "binary":
return k(this, e, t, r);

case "base64":
return R(this, e, t, r);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return x(this, e, t, r);

default:
if (s) throw new TypeError("Unknown encoding: " + i);
i = ("" + i).toLowerCase();
s = !0;
}
};
f.prototype.toJSON = function() {
return {
type: "Buffer",
data: Array.prototype.slice.call(this._arr || this, 0)
};
};
function I(e, t, r) {
return 0 === t && r === e.length ? i.fromByteArray(e) : i.fromByteArray(e.slice(t, r));
}
function T(e, t, r) {
r = Math.min(e.length, r);
for (var i = [], n = t; n < r; ) {
var s = e[n], o = null, a = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
if (n + a <= r) {
var f, c, u, h;
switch (a) {
case 1:
s < 128 && (o = s);
break;

case 2:
128 == (192 & (f = e[n + 1])) && (h = (31 & s) << 6 | 63 & f) > 127 && (o = h);
break;

case 3:
f = e[n + 1];
c = e[n + 2];
128 == (192 & f) && 128 == (192 & c) && (h = (15 & s) << 12 | (63 & f) << 6 | 63 & c) > 2047 && (h < 55296 || h > 57343) && (o = h);
break;

case 4:
f = e[n + 1];
c = e[n + 2];
u = e[n + 3];
128 == (192 & f) && 128 == (192 & c) && 128 == (192 & u) && (h = (15 & s) << 18 | (63 & f) << 12 | (63 & c) << 6 | 63 & u) > 65535 && h < 1114112 && (o = h);
}
}
if (null === o) {
o = 65533;
a = 1;
} else if (o > 65535) {
o -= 65536;
i.push(o >>> 10 & 1023 | 55296);
o = 56320 | 1023 & o;
}
i.push(o);
n += a;
}
return j(i);
}
var B = 4096;
function j(e) {
var t = e.length;
if (t <= B) return String.fromCharCode.apply(String, e);
for (var r = "", i = 0; i < t; ) r += String.fromCharCode.apply(String, e.slice(i, i += B));
return r;
}
function N(e, t, r) {
var i = "";
r = Math.min(e.length, r);
for (var n = t; n < r; ++n) i += String.fromCharCode(127 & e[n]);
return i;
}
function P(e, t, r) {
var i = "";
r = Math.min(e.length, r);
for (var n = t; n < r; ++n) i += String.fromCharCode(e[n]);
return i;
}
function C(e, t, r) {
var i, n = e.length;
(!t || t < 0) && (t = 0);
(!r || r < 0 || r > n) && (r = n);
for (var s = "", o = t; o < r; ++o) s += (i = e[o]) < 16 ? "0" + i.toString(16) : i.toString(16);
return s;
}
function L(e, t, r) {
for (var i = e.slice(t, r), n = "", s = 0; s < i.length; s += 2) n += String.fromCharCode(i[s] + 256 * i[s + 1]);
return n;
}
f.prototype.slice = function(e, t) {
var r, i = this.length;
(e = ~~e) < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i);
(t = void 0 === t ? i : ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i);
t < e && (t = e);
if (f.TYPED_ARRAY_SUPPORT) (r = this.subarray(e, t)).__proto__ = f.prototype; else {
var n = t - e;
r = new f(n, void 0);
for (var s = 0; s < n; ++s) r[s] = this[s + e];
}
return r;
};
function O(e, t, r) {
if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
if (e + t > r) throw new RangeError("Trying to access beyond buffer length");
}
f.prototype.readUIntLE = function(e, t, r) {
e |= 0;
t |= 0;
r || O(e, t, this.length);
for (var i = this[e], n = 1, s = 0; ++s < t && (n *= 256); ) i += this[e + s] * n;
return i;
};
f.prototype.readUIntBE = function(e, t, r) {
e |= 0;
t |= 0;
r || O(e, t, this.length);
for (var i = this[e + --t], n = 1; t > 0 && (n *= 256); ) i += this[e + --t] * n;
return i;
};
f.prototype.readUInt8 = function(e, t) {
t || O(e, 1, this.length);
return this[e];
};
f.prototype.readUInt16LE = function(e, t) {
t || O(e, 2, this.length);
return this[e] | this[e + 1] << 8;
};
f.prototype.readUInt16BE = function(e, t) {
t || O(e, 2, this.length);
return this[e] << 8 | this[e + 1];
};
f.prototype.readUInt32LE = function(e, t) {
t || O(e, 4, this.length);
return (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
};
f.prototype.readUInt32BE = function(e, t) {
t || O(e, 4, this.length);
return 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
};
f.prototype.readIntLE = function(e, t, r) {
e |= 0;
t |= 0;
r || O(e, t, this.length);
for (var i = this[e], n = 1, s = 0; ++s < t && (n *= 256); ) i += this[e + s] * n;
i >= (n *= 128) && (i -= Math.pow(2, 8 * t));
return i;
};
f.prototype.readIntBE = function(e, t, r) {
e |= 0;
t |= 0;
r || O(e, t, this.length);
for (var i = t, n = 1, s = this[e + --i]; i > 0 && (n *= 256); ) s += this[e + --i] * n;
s >= (n *= 128) && (s -= Math.pow(2, 8 * t));
return s;
};
f.prototype.readInt8 = function(e, t) {
t || O(e, 1, this.length);
return 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
};
f.prototype.readInt16LE = function(e, t) {
t || O(e, 2, this.length);
var r = this[e] | this[e + 1] << 8;
return 32768 & r ? 4294901760 | r : r;
};
f.prototype.readInt16BE = function(e, t) {
t || O(e, 2, this.length);
var r = this[e + 1] | this[e] << 8;
return 32768 & r ? 4294901760 | r : r;
};
f.prototype.readInt32LE = function(e, t) {
t || O(e, 4, this.length);
return this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
};
f.prototype.readInt32BE = function(e, t) {
t || O(e, 4, this.length);
return this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
};
f.prototype.readFloatLE = function(e, t) {
t || O(e, 4, this.length);
return n.read(this, e, !0, 23, 4);
};
f.prototype.readFloatBE = function(e, t) {
t || O(e, 4, this.length);
return n.read(this, e, !1, 23, 4);
};
f.prototype.readDoubleLE = function(e, t) {
t || O(e, 8, this.length);
return n.read(this, e, !0, 52, 8);
};
f.prototype.readDoubleBE = function(e, t) {
t || O(e, 8, this.length);
return n.read(this, e, !1, 52, 8);
};
function D(e, t, r, i, n, s) {
if (!f.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
if (t > n || t < s) throw new RangeError('"value" argument is out of bounds');
if (r + i > e.length) throw new RangeError("Index out of range");
}
f.prototype.writeUIntLE = function(e, t, r, i) {
e = +e;
t |= 0;
r |= 0;
i || D(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
var n = 1, s = 0;
this[t] = 255 & e;
for (;++s < r && (n *= 256); ) this[t + s] = e / n & 255;
return t + r;
};
f.prototype.writeUIntBE = function(e, t, r, i) {
e = +e;
t |= 0;
r |= 0;
i || D(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
var n = r - 1, s = 1;
this[t + n] = 255 & e;
for (;--n >= 0 && (s *= 256); ) this[t + n] = e / s & 255;
return t + r;
};
f.prototype.writeUInt8 = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 1, 255, 0);
f.TYPED_ARRAY_SUPPORT || (e = Math.floor(e));
this[t] = 255 & e;
return t + 1;
};
function U(e, t, r, i) {
t < 0 && (t = 65535 + t + 1);
for (var n = 0, s = Math.min(e.length - r, 2); n < s; ++n) e[r + n] = (t & 255 << 8 * (i ? n : 1 - n)) >>> 8 * (i ? n : 1 - n);
}
f.prototype.writeUInt16LE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 2, 65535, 0);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
} else U(this, e, t, !0);
return t + 2;
};
f.prototype.writeUInt16BE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 2, 65535, 0);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 8;
this[t + 1] = 255 & e;
} else U(this, e, t, !1);
return t + 2;
};
function q(e, t, r, i) {
t < 0 && (t = 4294967295 + t + 1);
for (var n = 0, s = Math.min(e.length - r, 4); n < s; ++n) e[r + n] = t >>> 8 * (i ? n : 3 - n) & 255;
}
f.prototype.writeUInt32LE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 4, 4294967295, 0);
if (f.TYPED_ARRAY_SUPPORT) {
this[t + 3] = e >>> 24;
this[t + 2] = e >>> 16;
this[t + 1] = e >>> 8;
this[t] = 255 & e;
} else q(this, e, t, !0);
return t + 4;
};
f.prototype.writeUInt32BE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 4, 4294967295, 0);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 24;
this[t + 1] = e >>> 16;
this[t + 2] = e >>> 8;
this[t + 3] = 255 & e;
} else q(this, e, t, !1);
return t + 4;
};
f.prototype.writeIntLE = function(e, t, r, i) {
e = +e;
t |= 0;
if (!i) {
var n = Math.pow(2, 8 * r - 1);
D(this, e, t, r, n - 1, -n);
}
var s = 0, o = 1, a = 0;
this[t] = 255 & e;
for (;++s < r && (o *= 256); ) {
e < 0 && 0 === a && 0 !== this[t + s - 1] && (a = 1);
this[t + s] = (e / o >> 0) - a & 255;
}
return t + r;
};
f.prototype.writeIntBE = function(e, t, r, i) {
e = +e;
t |= 0;
if (!i) {
var n = Math.pow(2, 8 * r - 1);
D(this, e, t, r, n - 1, -n);
}
var s = r - 1, o = 1, a = 0;
this[t + s] = 255 & e;
for (;--s >= 0 && (o *= 256); ) {
e < 0 && 0 === a && 0 !== this[t + s + 1] && (a = 1);
this[t + s] = (e / o >> 0) - a & 255;
}
return t + r;
};
f.prototype.writeInt8 = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 1, 127, -128);
f.TYPED_ARRAY_SUPPORT || (e = Math.floor(e));
e < 0 && (e = 255 + e + 1);
this[t] = 255 & e;
return t + 1;
};
f.prototype.writeInt16LE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 2, 32767, -32768);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
} else U(this, e, t, !0);
return t + 2;
};
f.prototype.writeInt16BE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 2, 32767, -32768);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 8;
this[t + 1] = 255 & e;
} else U(this, e, t, !1);
return t + 2;
};
f.prototype.writeInt32LE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 4, 2147483647, -2147483648);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = 255 & e;
this[t + 1] = e >>> 8;
this[t + 2] = e >>> 16;
this[t + 3] = e >>> 24;
} else q(this, e, t, !0);
return t + 4;
};
f.prototype.writeInt32BE = function(e, t, r) {
e = +e;
t |= 0;
r || D(this, e, t, 4, 2147483647, -2147483648);
e < 0 && (e = 4294967295 + e + 1);
if (f.TYPED_ARRAY_SUPPORT) {
this[t] = e >>> 24;
this[t + 1] = e >>> 16;
this[t + 2] = e >>> 8;
this[t + 3] = 255 & e;
} else q(this, e, t, !1);
return t + 4;
};
function F(e, t, r, i) {
if (r + i > e.length) throw new RangeError("Index out of range");
if (r < 0) throw new RangeError("Index out of range");
}
function z(e, t, r, i, s) {
s || F(e, 0, r, 4);
n.write(e, t, r, i, 23, 4);
return r + 4;
}
f.prototype.writeFloatLE = function(e, t, r) {
return z(this, e, t, !0, r);
};
f.prototype.writeFloatBE = function(e, t, r) {
return z(this, e, t, !1, r);
};
function $(e, t, r, i, s) {
s || F(e, 0, r, 8);
n.write(e, t, r, i, 52, 8);
return r + 8;
}
f.prototype.writeDoubleLE = function(e, t, r) {
return $(this, e, t, !0, r);
};
f.prototype.writeDoubleBE = function(e, t, r) {
return $(this, e, t, !1, r);
};
f.prototype.copy = function(e, t, r, i) {
r || (r = 0);
i || 0 === i || (i = this.length);
t >= e.length && (t = e.length);
t || (t = 0);
i > 0 && i < r && (i = r);
if (i === r) return 0;
if (0 === e.length || 0 === this.length) return 0;
if (t < 0) throw new RangeError("targetStart out of bounds");
if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
if (i < 0) throw new RangeError("sourceEnd out of bounds");
i > this.length && (i = this.length);
e.length - t < i - r && (i = e.length - t + r);
var n, s = i - r;
if (this === e && r < t && t < i) for (n = s - 1; n >= 0; --n) e[n + t] = this[n + r]; else if (s < 1e3 || !f.TYPED_ARRAY_SUPPORT) for (n = 0; n < s; ++n) e[n + t] = this[n + r]; else Uint8Array.prototype.set.call(e, this.subarray(r, r + s), t);
return s;
};
f.prototype.fill = function(e, t, r, i) {
if ("string" == typeof e) {
if ("string" == typeof t) {
i = t;
t = 0;
r = this.length;
} else if ("string" == typeof r) {
i = r;
r = this.length;
}
if (1 === e.length) {
var n = e.charCodeAt(0);
n < 256 && (e = n);
}
if (void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
if ("string" == typeof i && !f.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
} else "number" == typeof e && (e &= 255);
if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
if (r <= t) return this;
t >>>= 0;
r = void 0 === r ? this.length : r >>> 0;
e || (e = 0);
var s;
if ("number" == typeof e) for (s = t; s < r; ++s) this[s] = e; else {
var o = f.isBuffer(e) ? e : V(new f(e, i).toString()), a = o.length;
for (s = 0; s < r - t; ++s) this[s + t] = o[s % a];
}
return this;
};
var K = /[^+\/0-9A-Za-z-_]/g;
function H(e) {
if ((e = W(e).replace(K, "")).length < 2) return "";
for (;e.length % 4 != 0; ) e += "=";
return e;
}
function W(e) {
return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function V(e, t) {
t = t || Infinity;
for (var r, i = e.length, n = null, s = [], o = 0; o < i; ++o) {
if ((r = e.charCodeAt(o)) > 55295 && r < 57344) {
if (!n) {
if (r > 56319) {
(t -= 3) > -1 && s.push(239, 191, 189);
continue;
}
if (o + 1 === i) {
(t -= 3) > -1 && s.push(239, 191, 189);
continue;
}
n = r;
continue;
}
if (r < 56320) {
(t -= 3) > -1 && s.push(239, 191, 189);
n = r;
continue;
}
r = 65536 + (n - 55296 << 10 | r - 56320);
} else n && (t -= 3) > -1 && s.push(239, 191, 189);
n = null;
if (r < 128) {
if ((t -= 1) < 0) break;
s.push(r);
} else if (r < 2048) {
if ((t -= 2) < 0) break;
s.push(r >> 6 | 192, 63 & r | 128);
} else if (r < 65536) {
if ((t -= 3) < 0) break;
s.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
} else {
if (!(r < 1114112)) throw new Error("Invalid code point");
if ((t -= 4) < 0) break;
s.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
}
}
return s;
}
function G(e) {
for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
return t;
}
function X(e, t) {
for (var r, i, n, s = [], o = 0; o < e.length && !((t -= 2) < 0); ++o) {
i = (r = e.charCodeAt(o)) >> 8;
n = r % 256;
s.push(n);
s.push(i);
}
return s;
}
function Y(e) {
return i.toByteArray(H(e));
}
function J(e, t, r, i) {
for (var n = 0; n < i && !(n + r >= t.length || n >= e.length); ++n) t[n + r] = e[n];
return n;
}
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"base64-js": 16,
ieee754: 137,
isarray: 66
} ],
66: [ function(e, t) {
var r = {}.toString;
t.exports = Array.isArray || function(e) {
return "[object Array]" == r.call(e);
};
}, {} ],
67: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = e("stream").Transform, n = e("string_decoder").StringDecoder;
function s(e) {
i.call(this);
this.hashMode = "string" == typeof e;
this.hashMode ? this[e] = this._finalOrDigest : this.final = this._finalOrDigest;
if (this._final) {
this.__final = this._final;
this._final = null;
}
this._decoder = null;
this._encoding = null;
}
e("inherits")(s, i);
s.prototype.update = function(e, t, i) {
"string" == typeof e && (e = r.from(e, t));
var n = this._update(e);
if (this.hashMode) return this;
i && (n = this._toString(n, i));
return n;
};
s.prototype.setAutoPadding = function() {};
s.prototype.getAuthTag = function() {
throw new Error("trying to get auth tag in unsupported state");
};
s.prototype.setAuthTag = function() {
throw new Error("trying to set auth tag in unsupported state");
};
s.prototype.setAAD = function() {
throw new Error("trying to set aad in unsupported state");
};
s.prototype._transform = function(e, t, r) {
var i;
try {
this.hashMode ? this._update(e) : this.push(this._update(e));
} catch (e) {
i = e;
} finally {
r(i);
}
};
s.prototype._flush = function(e) {
var t;
try {
this.push(this.__final());
} catch (e) {
t = e;
}
e(t);
};
s.prototype._finalOrDigest = function(e) {
var t = this.__final() || r.alloc(0);
e && (t = this._toString(t, e, !0));
return t;
};
s.prototype._toString = function(e, t, r) {
if (!this._decoder) {
this._decoder = new n(t);
this._encoding = t;
}
if (this._encoding !== t) throw new Error("can't switch encodings");
var i = this._decoder.write(e);
r && (i += this._decoder.end());
return i;
};
t.exports = s;
}, {
inherits: 138,
"safe-buffer": 182,
stream: 192,
string_decoder: 193
} ],
68: [ function(e, t, r) {
r.isArray = function(e) {
return Array.isArray ? Array.isArray(e) : "[object Array]" === i(e);
};
r.isBoolean = function(e) {
return "boolean" == typeof e;
};
r.isNull = function(e) {
return null === e;
};
r.isNullOrUndefined = function(e) {
return null == e;
};
r.isNumber = function(e) {
return "number" == typeof e;
};
r.isString = function(e) {
return "string" == typeof e;
};
r.isSymbol = function(e) {
return "symbol" == typeof e;
};
r.isUndefined = function(e) {
return void 0 === e;
};
r.isRegExp = function(e) {
return "[object RegExp]" === i(e);
};
r.isObject = function(e) {
return "object" == typeof e && null !== e;
};
r.isDate = function(e) {
return "[object Date]" === i(e);
};
r.isError = function(e) {
return "[object Error]" === i(e) || e instanceof Error;
};
r.isFunction = function(e) {
return "function" == typeof e;
};
r.isPrimitive = function(e) {
return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e;
};
r.isBuffer = e("buffer").Buffer.isBuffer;
function i(e) {
return Object.prototype.toString.call(e);
}
}, {
buffer: 65
} ],
69: [ function(e, t) {
(function(r) {
var i = e("elliptic"), n = e("bn.js");
t.exports = function(e) {
return new o(e);
};
var s = {
secp256k1: {
name: "secp256k1",
byteLength: 32
},
secp224r1: {
name: "p224",
byteLength: 28
},
prime256v1: {
name: "p256",
byteLength: 32
},
prime192v1: {
name: "p192",
byteLength: 24
},
ed25519: {
name: "ed25519",
byteLength: 32
},
secp384r1: {
name: "p384",
byteLength: 48
},
secp521r1: {
name: "p521",
byteLength: 66
}
};
s.p224 = s.secp224r1;
s.p256 = s.secp256r1 = s.prime256v1;
s.p192 = s.secp192r1 = s.prime192v1;
s.p384 = s.secp384r1;
s.p521 = s.secp521r1;
function o(e) {
this.curveType = s[e];
this.curveType || (this.curveType = {
name: e
});
this.curve = new i.ec(this.curveType.name);
this.keys = void 0;
}
o.prototype.generateKeys = function(e, t) {
this.keys = this.curve.genKeyPair();
return this.getPublicKey(e, t);
};
o.prototype.computeSecret = function(e, t, i) {
t = t || "utf8";
r.isBuffer(e) || (e = new r(e, t));
return a(this.curve.keyFromPublic(e).getPublic().mul(this.keys.getPrivate()).getX(), i, this.curveType.byteLength);
};
o.prototype.getPublicKey = function(e, t) {
var r = this.keys.getPublic("compressed" === t, !0);
"hybrid" === t && (r[r.length - 1] % 2 ? r[0] = 7 : r[0] = 6);
return a(r, e);
};
o.prototype.getPrivateKey = function(e) {
return a(this.keys.getPrivate(), e);
};
o.prototype.setPublicKey = function(e, t) {
t = t || "utf8";
r.isBuffer(e) || (e = new r(e, t));
this.keys._importPublic(e);
return this;
};
o.prototype.setPrivateKey = function(e, t) {
t = t || "utf8";
r.isBuffer(e) || (e = new r(e, t));
var i = new n(e);
i = i.toString(16);
this.keys = this.curve.genKeyPair();
this.keys._importPrivate(i);
return this;
};
function a(e, t, i) {
Array.isArray(e) || (e = e.toArray());
var n = new r(e);
if (i && n.length < i) {
var s = new r(i - n.length);
s.fill(0);
n = r.concat([ s, n ]);
}
return t ? n.toString(t) : n;
}
}).call(this, e("buffer").Buffer);
}, {
"bn.js": 70,
buffer: 65,
elliptic: 87
} ],
70: [ function(e, t, r) {
arguments[4][15][0].apply(r, arguments);
}, {
buffer: 19,
dup: 15
} ],
71: [ function(e, t) {
"use strict";
var r = e("inherits"), i = e("md5.js"), n = e("ripemd160"), s = e("sha.js"), o = e("cipher-base");
function a(e) {
o.call(this, "digest");
this._hash = e;
}
r(a, o);
a.prototype._update = function(e) {
this._hash.update(e);
};
a.prototype._final = function() {
return this._hash.digest();
};
t.exports = function(e) {
return "md5" === (e = e.toLowerCase()) ? new i() : "rmd160" === e || "ripemd160" === e ? new n() : new a(s(e));
};
}, {
"cipher-base": 67,
inherits: 138,
"md5.js": 139,
ripemd160: 181,
"sha.js": 185
} ],
72: [ function(e, t) {
var r = e("md5.js");
t.exports = function(e) {
return new r().update(e).digest();
};
}, {
"md5.js": 139
} ],
73: [ function(e, t) {
"use strict";
var r = e("inherits"), i = e("./legacy"), n = e("cipher-base"), s = e("safe-buffer").Buffer, o = e("create-hash/md5"), a = e("ripemd160"), f = e("sha.js"), c = s.alloc(128);
function u(e, t) {
n.call(this, "digest");
"string" == typeof t && (t = s.from(t));
var r = "sha512" === e || "sha384" === e ? 128 : 64;
this._alg = e;
this._key = t;
t.length > r ? t = ("rmd160" === e ? new a() : f(e)).update(t).digest() : t.length < r && (t = s.concat([ t, c ], r));
for (var i = this._ipad = s.allocUnsafe(r), o = this._opad = s.allocUnsafe(r), u = 0; u < r; u++) {
i[u] = 54 ^ t[u];
o[u] = 92 ^ t[u];
}
this._hash = "rmd160" === e ? new a() : f(e);
this._hash.update(i);
}
r(u, n);
u.prototype._update = function(e) {
this._hash.update(e);
};
u.prototype._final = function() {
var e = this._hash.digest();
return ("rmd160" === this._alg ? new a() : f(this._alg)).update(this._opad).update(e).digest();
};
t.exports = function(e, t) {
return "rmd160" === (e = e.toLowerCase()) || "ripemd160" === e ? new u("rmd160", t) : "md5" === e ? new i(o, t) : new u(e, t);
};
}, {
"./legacy": 74,
"cipher-base": 67,
"create-hash/md5": 72,
inherits: 138,
ripemd160: 181,
"safe-buffer": 182,
"sha.js": 185
} ],
74: [ function(e, t) {
"use strict";
var r = e("inherits"), i = e("safe-buffer").Buffer, n = e("cipher-base"), s = i.alloc(128), o = 64;
function a(e, t) {
n.call(this, "digest");
"string" == typeof t && (t = i.from(t));
this._alg = e;
this._key = t;
t.length > o ? t = e(t) : t.length < o && (t = i.concat([ t, s ], o));
for (var r = this._ipad = i.allocUnsafe(o), a = this._opad = i.allocUnsafe(o), f = 0; f < o; f++) {
r[f] = 54 ^ t[f];
a[f] = 92 ^ t[f];
}
this._hash = [ r ];
}
r(a, n);
a.prototype._update = function(e) {
this._hash.push(e);
};
a.prototype._final = function() {
var e = this._alg(i.concat(this._hash));
return this._alg(i.concat([ this._opad, e ]));
};
t.exports = a;
}, {
"cipher-base": 67,
inherits: 138,
"safe-buffer": 182
} ],
75: [ function(e, t, r) {
"use strict";
r.randomBytes = r.rng = r.pseudoRandomBytes = r.prng = e("randombytes");
r.createHash = r.Hash = e("create-hash");
r.createHmac = r.Hmac = e("create-hmac");
var i = e("browserify-sign/algos"), n = Object.keys(i), s = [ "sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160" ].concat(n);
r.getHashes = function() {
return s;
};
var o = e("pbkdf2");
r.pbkdf2 = o.pbkdf2;
r.pbkdf2Sync = o.pbkdf2Sync;
var a = e("browserify-cipher");
r.Cipher = a.Cipher;
r.createCipher = a.createCipher;
r.Cipheriv = a.Cipheriv;
r.createCipheriv = a.createCipheriv;
r.Decipher = a.Decipher;
r.createDecipher = a.createDecipher;
r.Decipheriv = a.Decipheriv;
r.createDecipheriv = a.createDecipheriv;
r.getCiphers = a.getCiphers;
r.listCiphers = a.listCiphers;
var f = e("diffie-hellman");
r.DiffieHellmanGroup = f.DiffieHellmanGroup;
r.createDiffieHellmanGroup = f.createDiffieHellmanGroup;
r.getDiffieHellman = f.getDiffieHellman;
r.createDiffieHellman = f.createDiffieHellman;
r.DiffieHellman = f.DiffieHellman;
var c = e("browserify-sign");
r.createSign = c.createSign;
r.Sign = c.Sign;
r.createVerify = c.createVerify;
r.Verify = c.Verify;
r.createECDH = e("create-ecdh");
var u = e("public-encrypt");
r.publicEncrypt = u.publicEncrypt;
r.privateEncrypt = u.privateEncrypt;
r.publicDecrypt = u.publicDecrypt;
r.privateDecrypt = u.privateDecrypt;
var h = e("randomfill");
r.randomFill = h.randomFill;
r.randomFillSync = h.randomFillSync;
r.createCredentials = function() {
throw new Error([ "sorry, createCredentials is not implemented yet", "we accept pull requests", "https://github.com/crypto-browserify/crypto-browserify" ].join("\n"));
};
r.constants = {
DH_CHECK_P_NOT_SAFE_PRIME: 2,
DH_CHECK_P_NOT_PRIME: 1,
DH_UNABLE_TO_CHECK_GENERATOR: 4,
DH_NOT_SUITABLE_GENERATOR: 8,
NPN_ENABLED: 1,
ALPN_ENABLED: 1,
RSA_PKCS1_PADDING: 1,
RSA_SSLV23_PADDING: 2,
RSA_NO_PADDING: 3,
RSA_PKCS1_OAEP_PADDING: 4,
RSA_X931_PADDING: 5,
RSA_PKCS1_PSS_PADDING: 6,
POINT_CONVERSION_COMPRESSED: 2,
POINT_CONVERSION_UNCOMPRESSED: 4,
POINT_CONVERSION_HYBRID: 6
};
}, {
"browserify-cipher": 37,
"browserify-sign": 44,
"browserify-sign/algos": 41,
"create-ecdh": 69,
"create-hash": 71,
"create-hmac": 73,
"diffie-hellman": 82,
pbkdf2: 149,
"public-encrypt": 157,
randombytes: 164,
randomfill: 165
} ],
76: [ function(e, t, r) {
"use strict";
r.utils = e("./des/utils");
r.Cipher = e("./des/cipher");
r.DES = e("./des/des");
r.CBC = e("./des/cbc");
r.EDE = e("./des/ede");
}, {
"./des/cbc": 77,
"./des/cipher": 78,
"./des/des": 79,
"./des/ede": 80,
"./des/utils": 81
} ],
77: [ function(e, t, r) {
"use strict";
var i = e("minimalistic-assert"), n = e("inherits"), s = {};
function o(e) {
i.equal(e.length, 8, "Invalid IV length");
this.iv = new Array(8);
for (var t = 0; t < this.iv.length; t++) this.iv[t] = e[t];
}
r.instantiate = function(e) {
function t(t) {
e.call(this, t);
this._cbcInit();
}
n(t, e);
for (var r = Object.keys(s), i = 0; i < r.length; i++) {
var o = r[i];
t.prototype[o] = s[o];
}
t.create = function(e) {
return new t(e);
};
return t;
};
s._cbcInit = function() {
var e = new o(this.options.iv);
this._cbcState = e;
};
s._update = function(e, t, r, i) {
var n = this._cbcState, s = this.constructor.super_.prototype, o = n.iv;
if ("encrypt" === this.type) {
for (var a = 0; a < this.blockSize; a++) o[a] ^= e[t + a];
s._update.call(this, o, 0, r, i);
for (a = 0; a < this.blockSize; a++) o[a] = r[i + a];
} else {
s._update.call(this, e, t, r, i);
for (a = 0; a < this.blockSize; a++) r[i + a] ^= o[a];
for (a = 0; a < this.blockSize; a++) o[a] = e[t + a];
}
};
}, {
inherits: 138,
"minimalistic-assert": 142
} ],
78: [ function(e, t) {
"use strict";
var r = e("minimalistic-assert");
function i(e) {
this.options = e;
this.type = this.options.type;
this.blockSize = 8;
this._init();
this.buffer = new Array(this.blockSize);
this.bufferOff = 0;
}
t.exports = i;
i.prototype._init = function() {};
i.prototype.update = function(e) {
return 0 === e.length ? [] : "decrypt" === this.type ? this._updateDecrypt(e) : this._updateEncrypt(e);
};
i.prototype._buffer = function(e, t) {
for (var r = Math.min(this.buffer.length - this.bufferOff, e.length - t), i = 0; i < r; i++) this.buffer[this.bufferOff + i] = e[t + i];
this.bufferOff += r;
return r;
};
i.prototype._flushBuffer = function(e, t) {
this._update(this.buffer, 0, e, t);
this.bufferOff = 0;
return this.blockSize;
};
i.prototype._updateEncrypt = function(e) {
var t = 0, r = 0, i = (this.bufferOff + e.length) / this.blockSize | 0, n = new Array(i * this.blockSize);
if (0 !== this.bufferOff) {
t += this._buffer(e, t);
this.bufferOff === this.buffer.length && (r += this._flushBuffer(n, r));
}
for (var s = e.length - (e.length - t) % this.blockSize; t < s; t += this.blockSize) {
this._update(e, t, n, r);
r += this.blockSize;
}
for (;t < e.length; t++, this.bufferOff++) this.buffer[this.bufferOff] = e[t];
return n;
};
i.prototype._updateDecrypt = function(e) {
for (var t = 0, r = 0, i = Math.ceil((this.bufferOff + e.length) / this.blockSize) - 1, n = new Array(i * this.blockSize); i > 0; i--) {
t += this._buffer(e, t);
r += this._flushBuffer(n, r);
}
t += this._buffer(e, t);
return n;
};
i.prototype.final = function(e) {
var t, r;
e && (t = this.update(e));
r = "encrypt" === this.type ? this._finalEncrypt() : this._finalDecrypt();
return t ? t.concat(r) : r;
};
i.prototype._pad = function(e, t) {
if (0 === t) return !1;
for (;t < e.length; ) e[t++] = 0;
return !0;
};
i.prototype._finalEncrypt = function() {
if (!this._pad(this.buffer, this.bufferOff)) return [];
var e = new Array(this.blockSize);
this._update(this.buffer, 0, e, 0);
return e;
};
i.prototype._unpad = function(e) {
return e;
};
i.prototype._finalDecrypt = function() {
r.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
var e = new Array(this.blockSize);
this._flushBuffer(e, 0);
return this._unpad(e);
};
}, {
"minimalistic-assert": 142
} ],
79: [ function(e, t) {
"use strict";
var r = e("minimalistic-assert"), i = e("inherits"), n = e("./utils"), s = e("./cipher");
function o() {
this.tmp = new Array(2);
this.keys = null;
}
function a(e) {
s.call(this, e);
var t = new o();
this._desState = t;
this.deriveKeys(t, e.key);
}
i(a, s);
t.exports = a;
a.create = function(e) {
return new a(e);
};
var f = [ 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1 ];
a.prototype.deriveKeys = function(e, t) {
e.keys = new Array(32);
r.equal(t.length, this.blockSize, "Invalid key length");
var i = n.readUInt32BE(t, 0), s = n.readUInt32BE(t, 4);
n.pc1(i, s, e.tmp, 0);
i = e.tmp[0];
s = e.tmp[1];
for (var o = 0; o < e.keys.length; o += 2) {
var a = f[o >>> 1];
i = n.r28shl(i, a);
s = n.r28shl(s, a);
n.pc2(i, s, e.keys, o);
}
};
a.prototype._update = function(e, t, r, i) {
var s = this._desState, o = n.readUInt32BE(e, t), a = n.readUInt32BE(e, t + 4);
n.ip(o, a, s.tmp, 0);
o = s.tmp[0];
a = s.tmp[1];
"encrypt" === this.type ? this._encrypt(s, o, a, s.tmp, 0) : this._decrypt(s, o, a, s.tmp, 0);
o = s.tmp[0];
a = s.tmp[1];
n.writeUInt32BE(r, o, i);
n.writeUInt32BE(r, a, i + 4);
};
a.prototype._pad = function(e, t) {
for (var r = e.length - t, i = t; i < e.length; i++) e[i] = r;
return !0;
};
a.prototype._unpad = function(e) {
for (var t = e[e.length - 1], i = e.length - t; i < e.length; i++) r.equal(e[i], t);
return e.slice(0, e.length - t);
};
a.prototype._encrypt = function(e, t, r, i, s) {
for (var o = t, a = r, f = 0; f < e.keys.length; f += 2) {
var c = e.keys[f], u = e.keys[f + 1];
n.expand(a, e.tmp, 0);
c ^= e.tmp[0];
u ^= e.tmp[1];
var h = n.substitute(c, u), d = a;
a = (o ^ n.permute(h)) >>> 0;
o = d;
}
n.rip(a, o, i, s);
};
a.prototype._decrypt = function(e, t, r, i, s) {
for (var o = r, a = t, f = e.keys.length - 2; f >= 0; f -= 2) {
var c = e.keys[f], u = e.keys[f + 1];
n.expand(o, e.tmp, 0);
c ^= e.tmp[0];
u ^= e.tmp[1];
var h = n.substitute(c, u), d = o;
o = (a ^ n.permute(h)) >>> 0;
a = d;
}
n.rip(o, a, i, s);
};
}, {
"./cipher": 78,
"./utils": 81,
inherits: 138,
"minimalistic-assert": 142
} ],
80: [ function(e, t) {
"use strict";
var r = e("minimalistic-assert"), i = e("inherits"), n = e("./cipher"), s = e("./des");
function o(e, t) {
r.equal(t.length, 24, "Invalid key length");
var i = t.slice(0, 8), n = t.slice(8, 16), o = t.slice(16, 24);
this.ciphers = "encrypt" === e ? [ s.create({
type: "encrypt",
key: i
}), s.create({
type: "decrypt",
key: n
}), s.create({
type: "encrypt",
key: o
}) ] : [ s.create({
type: "decrypt",
key: o
}), s.create({
type: "encrypt",
key: n
}), s.create({
type: "decrypt",
key: i
}) ];
}
function a(e) {
n.call(this, e);
var t = new o(this.type, this.options.key);
this._edeState = t;
}
i(a, n);
t.exports = a;
a.create = function(e) {
return new a(e);
};
a.prototype._update = function(e, t, r, i) {
var n = this._edeState;
n.ciphers[0]._update(e, t, r, i);
n.ciphers[1]._update(r, i, r, i);
n.ciphers[2]._update(r, i, r, i);
};
a.prototype._pad = s.prototype._pad;
a.prototype._unpad = s.prototype._unpad;
}, {
"./cipher": 78,
"./des": 79,
inherits: 138,
"minimalistic-assert": 142
} ],
81: [ function(e, t, r) {
"use strict";
r.readUInt32BE = function(e, t) {
return (e[0 + t] << 24 | e[1 + t] << 16 | e[2 + t] << 8 | e[3 + t]) >>> 0;
};
r.writeUInt32BE = function(e, t, r) {
e[0 + r] = t >>> 24;
e[1 + r] = t >>> 16 & 255;
e[2 + r] = t >>> 8 & 255;
e[3 + r] = 255 & t;
};
r.ip = function(e, t, r, i) {
for (var n = 0, s = 0, o = 6; o >= 0; o -= 2) {
for (var a = 0; a <= 24; a += 8) {
n <<= 1;
n |= t >>> a + o & 1;
}
for (a = 0; a <= 24; a += 8) {
n <<= 1;
n |= e >>> a + o & 1;
}
}
for (o = 6; o >= 0; o -= 2) {
for (a = 1; a <= 25; a += 8) {
s <<= 1;
s |= t >>> a + o & 1;
}
for (a = 1; a <= 25; a += 8) {
s <<= 1;
s |= e >>> a + o & 1;
}
}
r[i + 0] = n >>> 0;
r[i + 1] = s >>> 0;
};
r.rip = function(e, t, r, i) {
for (var n = 0, s = 0, o = 0; o < 4; o++) for (var a = 24; a >= 0; a -= 8) {
n <<= 1;
n |= t >>> a + o & 1;
n <<= 1;
n |= e >>> a + o & 1;
}
for (o = 4; o < 8; o++) for (a = 24; a >= 0; a -= 8) {
s <<= 1;
s |= t >>> a + o & 1;
s <<= 1;
s |= e >>> a + o & 1;
}
r[i + 0] = n >>> 0;
r[i + 1] = s >>> 0;
};
r.pc1 = function(e, t, r, i) {
for (var n = 0, s = 0, o = 7; o >= 5; o--) {
for (var a = 0; a <= 24; a += 8) {
n <<= 1;
n |= t >> a + o & 1;
}
for (a = 0; a <= 24; a += 8) {
n <<= 1;
n |= e >> a + o & 1;
}
}
for (a = 0; a <= 24; a += 8) {
n <<= 1;
n |= t >> a + o & 1;
}
for (o = 1; o <= 3; o++) {
for (a = 0; a <= 24; a += 8) {
s <<= 1;
s |= t >> a + o & 1;
}
for (a = 0; a <= 24; a += 8) {
s <<= 1;
s |= e >> a + o & 1;
}
}
for (a = 0; a <= 24; a += 8) {
s <<= 1;
s |= e >> a + o & 1;
}
r[i + 0] = n >>> 0;
r[i + 1] = s >>> 0;
};
r.r28shl = function(e, t) {
return e << t & 268435455 | e >>> 28 - t;
};
var i = [ 14, 11, 17, 4, 27, 23, 25, 0, 13, 22, 7, 18, 5, 9, 16, 24, 2, 20, 12, 21, 1, 8, 15, 26, 15, 4, 25, 19, 9, 1, 26, 16, 5, 11, 23, 8, 12, 7, 17, 0, 22, 3, 10, 14, 6, 20, 27, 24 ];
r.pc2 = function(e, t, r, n) {
for (var s = 0, o = 0, a = i.length >>> 1, f = 0; f < a; f++) {
s <<= 1;
s |= e >>> i[f] & 1;
}
for (f = a; f < i.length; f++) {
o <<= 1;
o |= t >>> i[f] & 1;
}
r[n + 0] = s >>> 0;
r[n + 1] = o >>> 0;
};
r.expand = function(e, t, r) {
var i = 0, n = 0;
i = (1 & e) << 5 | e >>> 27;
for (var s = 23; s >= 15; s -= 4) {
i <<= 6;
i |= e >>> s & 63;
}
for (s = 11; s >= 3; s -= 4) {
n |= e >>> s & 63;
n <<= 6;
}
n |= (31 & e) << 1 | e >>> 31;
t[r + 0] = i >>> 0;
t[r + 1] = n >>> 0;
};
var n = [ 14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1, 3, 10, 10, 6, 6, 12, 12, 11, 5, 9, 9, 5, 0, 3, 7, 8, 4, 15, 1, 12, 14, 8, 8, 2, 13, 4, 6, 9, 2, 1, 11, 7, 15, 5, 12, 11, 9, 3, 7, 14, 3, 10, 10, 0, 5, 6, 0, 13, 15, 3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14, 9, 12, 7, 0, 2, 1, 13, 10, 12, 6, 0, 9, 5, 11, 10, 5, 0, 13, 14, 8, 7, 10, 11, 1, 10, 3, 4, 15, 13, 4, 1, 2, 5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5, 2, 14, 15, 9, 10, 13, 0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6, 5, 10, 1, 2, 13, 8, 12, 5, 7, 14, 11, 12, 4, 11, 2, 15, 8, 1, 13, 1, 6, 10, 4, 13, 9, 0, 8, 6, 15, 9, 3, 8, 0, 7, 11, 4, 1, 15, 2, 14, 12, 3, 5, 11, 10, 5, 14, 2, 7, 12, 7, 13, 13, 8, 14, 11, 3, 5, 0, 6, 6, 15, 9, 0, 10, 3, 1, 4, 2, 7, 8, 2, 5, 12, 11, 1, 12, 10, 4, 14, 15, 9, 10, 3, 6, 15, 9, 0, 0, 6, 12, 10, 11, 1, 7, 13, 13, 8, 15, 9, 1, 4, 3, 5, 14, 11, 5, 12, 2, 7, 8, 2, 4, 14, 2, 14, 12, 11, 4, 2, 1, 12, 7, 4, 10, 7, 11, 13, 6, 1, 8, 5, 5, 0, 3, 15, 15, 10, 13, 3, 0, 9, 14, 8, 9, 6, 4, 11, 2, 8, 1, 12, 11, 7, 10, 1, 13, 14, 7, 2, 8, 13, 15, 6, 9, 15, 12, 0, 5, 9, 6, 10, 3, 4, 0, 5, 14, 3, 12, 10, 1, 15, 10, 4, 15, 2, 9, 7, 2, 12, 6, 9, 8, 5, 0, 6, 13, 1, 3, 13, 4, 14, 14, 0, 7, 11, 5, 3, 11, 8, 9, 4, 14, 3, 15, 2, 5, 12, 2, 9, 8, 5, 12, 15, 3, 10, 7, 11, 0, 14, 4, 1, 10, 7, 1, 6, 13, 0, 11, 8, 6, 13, 4, 13, 11, 0, 2, 11, 14, 7, 15, 4, 0, 9, 8, 1, 13, 10, 3, 14, 12, 3, 9, 5, 7, 12, 5, 2, 10, 15, 6, 8, 1, 6, 1, 6, 4, 11, 11, 13, 13, 8, 12, 1, 3, 4, 7, 10, 14, 7, 10, 9, 15, 5, 6, 0, 8, 15, 0, 14, 5, 2, 9, 3, 2, 12, 13, 1, 2, 15, 8, 13, 4, 8, 6, 10, 15, 3, 11, 7, 1, 4, 10, 12, 9, 5, 3, 6, 14, 11, 5, 0, 0, 14, 12, 9, 7, 2, 7, 2, 11, 1, 4, 14, 1, 7, 9, 4, 12, 10, 14, 8, 2, 13, 0, 15, 6, 12, 10, 9, 13, 0, 15, 3, 3, 5, 5, 6, 8, 11 ];
r.substitute = function(e, t) {
for (var r = 0, i = 0; i < 4; i++) {
r <<= 4;
r |= n[64 * i + (e >>> 18 - 6 * i & 63)];
}
for (i = 0; i < 4; i++) {
r <<= 4;
r |= n[256 + 64 * i + (t >>> 18 - 6 * i & 63)];
}
return r >>> 0;
};
var s = [ 16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22, 30, 24, 8, 18, 0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7 ];
r.permute = function(e) {
for (var t = 0, r = 0; r < s.length; r++) {
t <<= 1;
t |= e >>> s[r] & 1;
}
return t >>> 0;
};
r.padSplit = function(e, t, r) {
for (var i = e.toString(2); i.length < t; ) i = "0" + i;
for (var n = [], s = 0; s < t; s += r) n.push(i.slice(s, s + r));
return n.join(" ");
};
}, {} ],
82: [ function(e, t, r) {
(function(t) {
var i = e("./lib/generatePrime"), n = e("./lib/primes.json"), s = e("./lib/dh"), o = {
binary: !0,
hex: !0,
base64: !0
};
r.DiffieHellmanGroup = r.createDiffieHellmanGroup = r.getDiffieHellman = function(e) {
var r = new t(n[e].prime, "hex"), i = new t(n[e].gen, "hex");
return new s(r, i);
};
r.createDiffieHellman = r.DiffieHellman = function e(r, n, a, f) {
if (t.isBuffer(n) || void 0 === o[n]) return e(r, "binary", n, a);
n = n || "binary";
f = f || "binary";
a = a || new t([ 2 ]);
t.isBuffer(a) || (a = new t(a, f));
if ("number" == typeof r) return new s(i(r, a), a, !0);
t.isBuffer(r) || (r = new t(r, n));
return new s(r, a, !0);
};
}).call(this, e("buffer").Buffer);
}, {
"./lib/dh": 83,
"./lib/generatePrime": 84,
"./lib/primes.json": 85,
buffer: 65
} ],
83: [ function(e, t) {
(function(r) {
var i = e("bn.js"), n = new (e("miller-rabin"))(), s = new i(24), o = new i(11), a = new i(10), f = new i(3), c = new i(7), u = e("./generatePrime"), h = e("randombytes");
t.exports = m;
function d(e, t) {
t = t || "utf8";
r.isBuffer(e) || (e = new r(e, t));
this._pub = new i(e);
return this;
}
function l(e, t) {
t = t || "utf8";
r.isBuffer(e) || (e = new r(e, t));
this._priv = new i(e);
return this;
}
var p = {};
function b(e, t) {
var r = t.toString("hex"), i = [ r, e.toString(16) ].join("_");
if (i in p) return p[i];
var h, d = 0;
if (e.isEven() || !u.simpleSieve || !u.fermatTest(e) || !n.test(e)) {
d += 1;
d += "02" === r || "05" === r ? 8 : 4;
p[i] = d;
return d;
}
n.test(e.shrn(1)) || (d += 2);
switch (r) {
case "02":
e.mod(s).cmp(o) && (d += 8);
break;

case "05":
(h = e.mod(a)).cmp(f) && h.cmp(c) && (d += 8);
break;

default:
d += 4;
}
p[i] = d;
return d;
}
function m(e, t, r) {
this.setGenerator(t);
this.__prime = new i(e);
this._prime = i.mont(this.__prime);
this._primeLen = e.length;
this._pub = void 0;
this._priv = void 0;
this._primeCode = void 0;
if (r) {
this.setPublicKey = d;
this.setPrivateKey = l;
} else this._primeCode = 8;
}
Object.defineProperty(m.prototype, "verifyError", {
enumerable: !0,
get: function() {
"number" != typeof this._primeCode && (this._primeCode = b(this.__prime, this.__gen));
return this._primeCode;
}
});
m.prototype.generateKeys = function() {
this._priv || (this._priv = new i(h(this._primeLen)));
this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed();
return this.getPublicKey();
};
m.prototype.computeSecret = function(e) {
var t = (e = (e = new i(e)).toRed(this._prime)).redPow(this._priv).fromRed(), n = new r(t.toArray()), s = this.getPrime();
if (n.length < s.length) {
var o = new r(s.length - n.length);
o.fill(0);
n = r.concat([ o, n ]);
}
return n;
};
m.prototype.getPublicKey = function(e) {
return g(this._pub, e);
};
m.prototype.getPrivateKey = function(e) {
return g(this._priv, e);
};
m.prototype.getPrime = function(e) {
return g(this.__prime, e);
};
m.prototype.getGenerator = function(e) {
return g(this._gen, e);
};
m.prototype.setGenerator = function(e, t) {
t = t || "utf8";
r.isBuffer(e) || (e = new r(e, t));
this.__gen = e;
this._gen = new i(e);
return this;
};
function g(e, t) {
var i = new r(e.toArray());
return t ? i.toString(t) : i;
}
}).call(this, e("buffer").Buffer);
}, {
"./generatePrime": 84,
"bn.js": 86,
buffer: 65,
"miller-rabin": 140,
randombytes: 164
} ],
84: [ function(e, t) {
var r = e("randombytes");
t.exports = g;
g.simpleSieve = b;
g.fermatTest = m;
var i = e("bn.js"), n = new i(24), s = new (e("miller-rabin"))(), o = new i(1), a = new i(2), f = new i(5), c = (new i(16), 
new i(8), new i(10)), u = new i(3), h = (new i(7), new i(11)), d = new i(4), l = (new i(12), 
null);
function p() {
if (null !== l) return l;
var e = [];
e[0] = 2;
for (var t = 1, r = 3; r < 1048576; r += 2) {
for (var i = Math.ceil(Math.sqrt(r)), n = 0; n < t && e[n] <= i && r % e[n] != 0; n++) ;
t !== n && e[n] <= i || (e[t++] = r);
}
l = e;
return e;
}
function b(e) {
for (var t = p(), r = 0; r < t.length; r++) if (0 === e.modn(t[r])) return 0 === e.cmpn(t[r]);
return !0;
}
function m(e) {
var t = i.mont(e);
return 0 === a.toRed(t).redPow(e.subn(1)).fromRed().cmpn(1);
}
function g(e, t) {
if (e < 16) return new i(2 === t || 5 === t ? [ 140, 123 ] : [ 140, 39 ]);
t = new i(t);
for (var l, p; ;) {
l = new i(r(Math.ceil(e / 8)));
for (;l.bitLength() > e; ) l.ishrn(1);
l.isEven() && l.iadd(o);
l.testn(1) || l.iadd(a);
if (t.cmp(a)) {
if (!t.cmp(f)) for (;l.mod(c).cmp(u); ) l.iadd(d);
} else for (;l.mod(n).cmp(h); ) l.iadd(d);
if (b(p = l.shrn(1)) && b(l) && m(p) && m(l) && s.test(p) && s.test(l)) return l;
}
}
}, {
"bn.js": 86,
"miller-rabin": 140,
randombytes: 164
} ],
85: [ function(e, t) {
t.exports = {
modp1: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"
},
modp2: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"
},
modp5: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"
},
modp14: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"
},
modp15: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"
},
modp16: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"
},
modp17: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"
},
modp18: {
gen: "02",
prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"
}
};
}, {} ],
86: [ function(e, t, r) {
arguments[4][15][0].apply(r, arguments);
}, {
buffer: 19,
dup: 15
} ],
87: [ function(e, t, r) {
"use strict";
var i = r;
i.version = e("../package.json").version;
i.utils = e("./elliptic/utils");
i.rand = e("brorand");
i.curve = e("./elliptic/curve");
i.curves = e("./elliptic/curves");
i.ec = e("./elliptic/ec");
i.eddsa = e("./elliptic/eddsa");
}, {
"../package.json": 103,
"./elliptic/curve": 90,
"./elliptic/curves": 93,
"./elliptic/ec": 94,
"./elliptic/eddsa": 97,
"./elliptic/utils": 101,
brorand: 18
} ],
88: [ function(e, t) {
"use strict";
var r = e("bn.js"), i = e("../utils"), n = i.getNAF, s = i.getJSF, o = i.assert;
function a(e, t) {
this.type = e;
this.p = new r(t.p, 16);
this.red = t.prime ? r.red(t.prime) : r.mont(this.p);
this.zero = new r(0).toRed(this.red);
this.one = new r(1).toRed(this.red);
this.two = new r(2).toRed(this.red);
this.n = t.n && new r(t.n, 16);
this.g = t.g && this.pointFromJSON(t.g, t.gRed);
this._wnafT1 = new Array(4);
this._wnafT2 = new Array(4);
this._wnafT3 = new Array(4);
this._wnafT4 = new Array(4);
this._bitLength = this.n ? this.n.bitLength() : 0;
var i = this.n && this.p.div(this.n);
if (!i || i.cmpn(100) > 0) this.redN = null; else {
this._maxwellTrick = !0;
this.redN = this.n.toRed(this.red);
}
}
t.exports = a;
a.prototype.point = function() {
throw new Error("Not implemented");
};
a.prototype.validate = function() {
throw new Error("Not implemented");
};
a.prototype._fixedNafMul = function(e, t) {
o(e.precomputed);
var r = e._getDoubles(), i = n(t, 1, this._bitLength), s = (1 << r.step + 1) - (r.step % 2 == 0 ? 2 : 1);
s /= 3;
var a, f, c = [];
for (a = 0; a < i.length; a += r.step) {
f = 0;
for (var u = a + r.step - 1; u >= a; u--) f = (f << 1) + i[u];
c.push(f);
}
for (var h = this.jpoint(null, null, null), d = this.jpoint(null, null, null), l = s; l > 0; l--) {
for (a = 0; a < c.length; a++) (f = c[a]) === l ? d = d.mixedAdd(r.points[a]) : f === -l && (d = d.mixedAdd(r.points[a].neg()));
h = h.add(d);
}
return h.toP();
};
a.prototype._wnafMul = function(e, t) {
var r = 4, i = e._getNAFPoints(r);
r = i.wnd;
for (var s = i.points, a = n(t, r, this._bitLength), f = this.jpoint(null, null, null), c = a.length - 1; c >= 0; c--) {
for (var u = 0; c >= 0 && 0 === a[c]; c--) u++;
c >= 0 && u++;
f = f.dblp(u);
if (c < 0) break;
var h = a[c];
o(0 !== h);
f = "affine" === e.type ? h > 0 ? f.mixedAdd(s[h - 1 >> 1]) : f.mixedAdd(s[-h - 1 >> 1].neg()) : h > 0 ? f.add(s[h - 1 >> 1]) : f.add(s[-h - 1 >> 1].neg());
}
return "affine" === e.type ? f.toP() : f;
};
a.prototype._wnafMulAdd = function(e, t, r, i, o) {
var a, f, c, u = this._wnafT1, h = this._wnafT2, d = this._wnafT3, l = 0;
for (a = 0; a < i; a++) {
var p = (c = t[a])._getNAFPoints(e);
u[a] = p.wnd;
h[a] = p.points;
}
for (a = i - 1; a >= 1; a -= 2) {
var b = a - 1, m = a;
if (1 === u[b] && 1 === u[m]) {
var g = [ t[b], null, null, t[m] ];
if (0 === t[b].y.cmp(t[m].y)) {
g[1] = t[b].add(t[m]);
g[2] = t[b].toJ().mixedAdd(t[m].neg());
} else if (0 === t[b].y.cmp(t[m].y.redNeg())) {
g[1] = t[b].toJ().mixedAdd(t[m]);
g[2] = t[b].add(t[m].neg());
} else {
g[1] = t[b].toJ().mixedAdd(t[m]);
g[2] = t[b].toJ().mixedAdd(t[m].neg());
}
var y = [ -3, -1, -5, -7, 0, 7, 5, 1, 3 ], v = s(r[b], r[m]);
l = Math.max(v[0].length, l);
d[b] = new Array(l);
d[m] = new Array(l);
for (f = 0; f < l; f++) {
var w = 0 | v[0][f], _ = 0 | v[1][f];
d[b][f] = y[3 * (w + 1) + (_ + 1)];
d[m][f] = 0;
h[b] = g;
}
} else {
d[b] = n(r[b], u[b], this._bitLength);
d[m] = n(r[m], u[m], this._bitLength);
l = Math.max(d[b].length, l);
l = Math.max(d[m].length, l);
}
}
var S = this.jpoint(null, null, null), E = this._wnafT4;
for (a = l; a >= 0; a--) {
for (var M = 0; a >= 0; ) {
var A = !0;
for (f = 0; f < i; f++) {
E[f] = 0 | d[f][a];
0 !== E[f] && (A = !1);
}
if (!A) break;
M++;
a--;
}
a >= 0 && M++;
S = S.dblp(M);
if (a < 0) break;
for (f = 0; f < i; f++) {
var k = E[f];
if (0 !== k) {
k > 0 ? c = h[f][k - 1 >> 1] : k < 0 && (c = h[f][-k - 1 >> 1].neg());
S = "affine" === c.type ? S.mixedAdd(c) : S.add(c);
}
}
}
for (a = 0; a < i; a++) h[a] = null;
return o ? S : S.toP();
};
function f(e, t) {
this.curve = e;
this.type = t;
this.precomputed = null;
}
a.BasePoint = f;
f.prototype.eq = function() {
throw new Error("Not implemented");
};
f.prototype.validate = function() {
return this.curve.validate(this);
};
a.prototype.decodePoint = function(e, t) {
e = i.toArray(e, t);
var r = this.p.byteLength();
if ((4 === e[0] || 6 === e[0] || 7 === e[0]) && e.length - 1 == 2 * r) {
6 === e[0] ? o(e[e.length - 1] % 2 == 0) : 7 === e[0] && o(e[e.length - 1] % 2 == 1);
return this.point(e.slice(1, 1 + r), e.slice(1 + r, 1 + 2 * r));
}
if ((2 === e[0] || 3 === e[0]) && e.length - 1 === r) return this.pointFromX(e.slice(1, 1 + r), 3 === e[0]);
throw new Error("Unknown point format");
};
f.prototype.encodeCompressed = function(e) {
return this.encode(e, !0);
};
f.prototype._encode = function(e) {
var t = this.curve.p.byteLength(), r = this.getX().toArray("be", t);
return e ? [ this.getY().isEven() ? 2 : 3 ].concat(r) : [ 4 ].concat(r, this.getY().toArray("be", t));
};
f.prototype.encode = function(e, t) {
return i.encode(this._encode(t), e);
};
f.prototype.precompute = function(e) {
if (this.precomputed) return this;
var t = {
doubles: null,
naf: null,
beta: null
};
t.naf = this._getNAFPoints(8);
t.doubles = this._getDoubles(4, e);
t.beta = this._getBeta();
this.precomputed = t;
return this;
};
f.prototype._hasDoubles = function(e) {
if (!this.precomputed) return !1;
var t = this.precomputed.doubles;
return !!t && t.points.length >= Math.ceil((e.bitLength() + 1) / t.step);
};
f.prototype._getDoubles = function(e, t) {
if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
for (var r = [ this ], i = this, n = 0; n < t; n += e) {
for (var s = 0; s < e; s++) i = i.dbl();
r.push(i);
}
return {
step: e,
points: r
};
};
f.prototype._getNAFPoints = function(e) {
if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
for (var t = [ this ], r = (1 << e) - 1, i = 1 === r ? null : this.dbl(), n = 1; n < r; n++) t[n] = t[n - 1].add(i);
return {
wnd: e,
points: t
};
};
f.prototype._getBeta = function() {
return null;
};
f.prototype.dblp = function(e) {
for (var t = this, r = 0; r < e; r++) t = t.dbl();
return t;
};
}, {
"../utils": 101,
"bn.js": 102
} ],
89: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("bn.js"), n = e("inherits"), s = e("./base"), o = r.assert;
function a(e) {
this.twisted = 1 != (0 | e.a);
this.mOneA = this.twisted && -1 == (0 | e.a);
this.extended = this.mOneA;
s.call(this, "edwards", e);
this.a = new i(e.a, 16).umod(this.red.m);
this.a = this.a.toRed(this.red);
this.c = new i(e.c, 16).toRed(this.red);
this.c2 = this.c.redSqr();
this.d = new i(e.d, 16).toRed(this.red);
this.dd = this.d.redAdd(this.d);
o(!this.twisted || 0 === this.c.fromRed().cmpn(1));
this.oneC = 1 == (0 | e.c);
}
n(a, s);
t.exports = a;
a.prototype._mulA = function(e) {
return this.mOneA ? e.redNeg() : this.a.redMul(e);
};
a.prototype._mulC = function(e) {
return this.oneC ? e : this.c.redMul(e);
};
a.prototype.jpoint = function(e, t, r, i) {
return this.point(e, t, r, i);
};
a.prototype.pointFromX = function(e, t) {
(e = new i(e, 16)).red || (e = e.toRed(this.red));
var r = e.redSqr(), n = this.c2.redSub(this.a.redMul(r)), s = this.one.redSub(this.c2.redMul(this.d).redMul(r)), o = n.redMul(s.redInvm()), a = o.redSqrt();
if (0 !== a.redSqr().redSub(o).cmp(this.zero)) throw new Error("invalid point");
var f = a.fromRed().isOdd();
(t && !f || !t && f) && (a = a.redNeg());
return this.point(e, a);
};
a.prototype.pointFromY = function(e, t) {
(e = new i(e, 16)).red || (e = e.toRed(this.red));
var r = e.redSqr(), n = r.redSub(this.c2), s = r.redMul(this.d).redMul(this.c2).redSub(this.a), o = n.redMul(s.redInvm());
if (0 === o.cmp(this.zero)) {
if (t) throw new Error("invalid point");
return this.point(this.zero, e);
}
var a = o.redSqrt();
if (0 !== a.redSqr().redSub(o).cmp(this.zero)) throw new Error("invalid point");
a.fromRed().isOdd() !== t && (a = a.redNeg());
return this.point(a, e);
};
a.prototype.validate = function(e) {
if (e.isInfinity()) return !0;
e.normalize();
var t = e.x.redSqr(), r = e.y.redSqr(), i = t.redMul(this.a).redAdd(r), n = this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(r)));
return 0 === i.cmp(n);
};
function f(e, t, r, n, o) {
s.BasePoint.call(this, e, "projective");
if (null === t && null === r && null === n) {
this.x = this.curve.zero;
this.y = this.curve.one;
this.z = this.curve.one;
this.t = this.curve.zero;
this.zOne = !0;
} else {
this.x = new i(t, 16);
this.y = new i(r, 16);
this.z = n ? new i(n, 16) : this.curve.one;
this.t = o && new i(o, 16);
this.x.red || (this.x = this.x.toRed(this.curve.red));
this.y.red || (this.y = this.y.toRed(this.curve.red));
this.z.red || (this.z = this.z.toRed(this.curve.red));
this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red));
this.zOne = this.z === this.curve.one;
if (this.curve.extended && !this.t) {
this.t = this.x.redMul(this.y);
this.zOne || (this.t = this.t.redMul(this.z.redInvm()));
}
}
}
n(f, s.BasePoint);
a.prototype.pointFromJSON = function(e) {
return f.fromJSON(this, e);
};
a.prototype.point = function(e, t, r, i) {
return new f(this, e, t, r, i);
};
f.fromJSON = function(e, t) {
return new f(e, t[0], t[1], t[2]);
};
f.prototype.inspect = function() {
return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
};
f.prototype.isInfinity = function() {
return 0 === this.x.cmpn(0) && (0 === this.y.cmp(this.z) || this.zOne && 0 === this.y.cmp(this.curve.c));
};
f.prototype._extDbl = function() {
var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr();
r = r.redIAdd(r);
var i = this.curve._mulA(e), n = this.x.redAdd(this.y).redSqr().redISub(e).redISub(t), s = i.redAdd(t), o = s.redSub(r), a = i.redSub(t), f = n.redMul(o), c = s.redMul(a), u = n.redMul(a), h = o.redMul(s);
return this.curve.point(f, c, h, u);
};
f.prototype._projDbl = function() {
var e, t, r, i, n, s, o = this.x.redAdd(this.y).redSqr(), a = this.x.redSqr(), f = this.y.redSqr();
if (this.curve.twisted) {
var c = (i = this.curve._mulA(a)).redAdd(f);
if (this.zOne) {
e = o.redSub(a).redSub(f).redMul(c.redSub(this.curve.two));
t = c.redMul(i.redSub(f));
r = c.redSqr().redSub(c).redSub(c);
} else {
n = this.z.redSqr();
s = c.redSub(n).redISub(n);
e = o.redSub(a).redISub(f).redMul(s);
t = c.redMul(i.redSub(f));
r = c.redMul(s);
}
} else {
i = a.redAdd(f);
n = this.curve._mulC(this.z).redSqr();
s = i.redSub(n).redSub(n);
e = this.curve._mulC(o.redISub(i)).redMul(s);
t = this.curve._mulC(i).redMul(a.redISub(f));
r = i.redMul(s);
}
return this.curve.point(e, t, r);
};
f.prototype.dbl = function() {
return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl();
};
f.prototype._extAdd = function(e) {
var t = this.y.redSub(this.x).redMul(e.y.redSub(e.x)), r = this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)), i = this.t.redMul(this.curve.dd).redMul(e.t), n = this.z.redMul(e.z.redAdd(e.z)), s = r.redSub(t), o = n.redSub(i), a = n.redAdd(i), f = r.redAdd(t), c = s.redMul(o), u = a.redMul(f), h = s.redMul(f), d = o.redMul(a);
return this.curve.point(c, u, d, h);
};
f.prototype._projAdd = function(e) {
var t, r, i = this.z.redMul(e.z), n = i.redSqr(), s = this.x.redMul(e.x), o = this.y.redMul(e.y), a = this.curve.d.redMul(s).redMul(o), f = n.redSub(a), c = n.redAdd(a), u = this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(s).redISub(o), h = i.redMul(f).redMul(u);
if (this.curve.twisted) {
t = i.redMul(c).redMul(o.redSub(this.curve._mulA(s)));
r = f.redMul(c);
} else {
t = i.redMul(c).redMul(o.redSub(s));
r = this.curve._mulC(f).redMul(c);
}
return this.curve.point(h, t, r);
};
f.prototype.add = function(e) {
return this.isInfinity() ? e : e.isInfinity() ? this : this.curve.extended ? this._extAdd(e) : this._projAdd(e);
};
f.prototype.mul = function(e) {
return this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve._wnafMul(this, e);
};
f.prototype.mulAdd = function(e, t, r) {
return this.curve._wnafMulAdd(1, [ this, t ], [ e, r ], 2, !1);
};
f.prototype.jmulAdd = function(e, t, r) {
return this.curve._wnafMulAdd(1, [ this, t ], [ e, r ], 2, !0);
};
f.prototype.normalize = function() {
if (this.zOne) return this;
var e = this.z.redInvm();
this.x = this.x.redMul(e);
this.y = this.y.redMul(e);
this.t && (this.t = this.t.redMul(e));
this.z = this.curve.one;
this.zOne = !0;
return this;
};
f.prototype.neg = function() {
return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg());
};
f.prototype.getX = function() {
this.normalize();
return this.x.fromRed();
};
f.prototype.getY = function() {
this.normalize();
return this.y.fromRed();
};
f.prototype.eq = function(e) {
return this === e || 0 === this.getX().cmp(e.getX()) && 0 === this.getY().cmp(e.getY());
};
f.prototype.eqXToP = function(e) {
var t = e.toRed(this.curve.red).redMul(this.z);
if (0 === this.x.cmp(t)) return !0;
for (var r = e.clone(), i = this.curve.redN.redMul(this.z); ;) {
r.iadd(this.curve.n);
if (r.cmp(this.curve.p) >= 0) return !1;
t.redIAdd(i);
if (0 === this.x.cmp(t)) return !0;
}
};
f.prototype.toP = f.prototype.normalize;
f.prototype.mixedAdd = f.prototype.add;
}, {
"../utils": 101,
"./base": 88,
"bn.js": 102,
inherits: 138
} ],
90: [ function(e, t, r) {
"use strict";
var i = r;
i.base = e("./base");
i.short = e("./short");
i.mont = e("./mont");
i.edwards = e("./edwards");
}, {
"./base": 88,
"./edwards": 89,
"./mont": 91,
"./short": 92
} ],
91: [ function(e, t) {
"use strict";
var r = e("bn.js"), i = e("inherits"), n = e("./base"), s = e("../utils");
function o(e) {
n.call(this, "mont", e);
this.a = new r(e.a, 16).toRed(this.red);
this.b = new r(e.b, 16).toRed(this.red);
this.i4 = new r(4).toRed(this.red).redInvm();
this.two = new r(2).toRed(this.red);
this.a24 = this.i4.redMul(this.a.redAdd(this.two));
}
i(o, n);
t.exports = o;
o.prototype.validate = function(e) {
var t = e.normalize().x, r = t.redSqr(), i = r.redMul(t).redAdd(r.redMul(this.a)).redAdd(t);
return 0 === i.redSqrt().redSqr().cmp(i);
};
function a(e, t, i) {
n.BasePoint.call(this, e, "projective");
if (null === t && null === i) {
this.x = this.curve.one;
this.z = this.curve.zero;
} else {
this.x = new r(t, 16);
this.z = new r(i, 16);
this.x.red || (this.x = this.x.toRed(this.curve.red));
this.z.red || (this.z = this.z.toRed(this.curve.red));
}
}
i(a, n.BasePoint);
o.prototype.decodePoint = function(e, t) {
return this.point(s.toArray(e, t), 1);
};
o.prototype.point = function(e, t) {
return new a(this, e, t);
};
o.prototype.pointFromJSON = function(e) {
return a.fromJSON(this, e);
};
a.prototype.precompute = function() {};
a.prototype._encode = function() {
return this.getX().toArray("be", this.curve.p.byteLength());
};
a.fromJSON = function(e, t) {
return new a(e, t[0], t[1] || e.one);
};
a.prototype.inspect = function() {
return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
};
a.prototype.isInfinity = function() {
return 0 === this.z.cmpn(0);
};
a.prototype.dbl = function() {
var e = this.x.redAdd(this.z).redSqr(), t = this.x.redSub(this.z).redSqr(), r = e.redSub(t), i = e.redMul(t), n = r.redMul(t.redAdd(this.curve.a24.redMul(r)));
return this.curve.point(i, n);
};
a.prototype.add = function() {
throw new Error("Not supported on Montgomery curve");
};
a.prototype.diffAdd = function(e, t) {
var r = this.x.redAdd(this.z), i = this.x.redSub(this.z), n = e.x.redAdd(e.z), s = e.x.redSub(e.z).redMul(r), o = n.redMul(i), a = t.z.redMul(s.redAdd(o).redSqr()), f = t.x.redMul(s.redISub(o).redSqr());
return this.curve.point(a, f);
};
a.prototype.mul = function(e) {
for (var t = e.clone(), r = this, i = this.curve.point(null, null), n = []; 0 !== t.cmpn(0); t.iushrn(1)) n.push(t.andln(1));
for (var s = n.length - 1; s >= 0; s--) if (0 === n[s]) {
r = r.diffAdd(i, this);
i = i.dbl();
} else {
i = r.diffAdd(i, this);
r = r.dbl();
}
return i;
};
a.prototype.mulAdd = function() {
throw new Error("Not supported on Montgomery curve");
};
a.prototype.jumlAdd = function() {
throw new Error("Not supported on Montgomery curve");
};
a.prototype.eq = function(e) {
return 0 === this.getX().cmp(e.getX());
};
a.prototype.normalize = function() {
this.x = this.x.redMul(this.z.redInvm());
this.z = this.curve.one;
return this;
};
a.prototype.getX = function() {
this.normalize();
return this.x.fromRed();
};
}, {
"../utils": 101,
"./base": 88,
"bn.js": 102,
inherits: 138
} ],
92: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("bn.js"), n = e("inherits"), s = e("./base"), o = r.assert;
function a(e) {
s.call(this, "short", e);
this.a = new i(e.a, 16).toRed(this.red);
this.b = new i(e.b, 16).toRed(this.red);
this.tinv = this.two.redInvm();
this.zeroA = 0 === this.a.fromRed().cmpn(0);
this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3);
this.endo = this._getEndomorphism(e);
this._endoWnafT1 = new Array(4);
this._endoWnafT2 = new Array(4);
}
n(a, s);
t.exports = a;
a.prototype._getEndomorphism = function(e) {
if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
var t, r;
if (e.beta) t = new i(e.beta, 16).toRed(this.red); else {
var n = this._getEndoRoots(this.p);
t = (t = n[0].cmp(n[1]) < 0 ? n[0] : n[1]).toRed(this.red);
}
if (e.lambda) r = new i(e.lambda, 16); else {
var s = this._getEndoRoots(this.n);
if (0 === this.g.mul(s[0]).x.cmp(this.g.x.redMul(t))) r = s[0]; else {
r = s[1];
o(0 === this.g.mul(r).x.cmp(this.g.x.redMul(t)));
}
}
return {
beta: t,
lambda: r,
basis: e.basis ? e.basis.map(function(e) {
return {
a: new i(e.a, 16),
b: new i(e.b, 16)
};
}) : this._getEndoBasis(r)
};
}
};
a.prototype._getEndoRoots = function(e) {
var t = e === this.p ? this.red : i.mont(e), r = new i(2).toRed(t).redInvm(), n = r.redNeg(), s = new i(3).toRed(t).redNeg().redSqrt().redMul(r);
return [ n.redAdd(s).fromRed(), n.redSub(s).fromRed() ];
};
a.prototype._getEndoBasis = function(e) {
for (var t, r, n, s, o, a, f, c, u, h = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), d = e, l = this.n.clone(), p = new i(1), b = new i(0), m = new i(0), g = new i(1), y = 0; 0 !== d.cmpn(0); ) {
var v = l.div(d);
c = l.sub(v.mul(d));
u = m.sub(v.mul(p));
var w = g.sub(v.mul(b));
if (!n && c.cmp(h) < 0) {
t = f.neg();
r = p;
n = c.neg();
s = u;
} else if (n && 2 == ++y) break;
f = c;
l = d;
d = c;
m = p;
p = u;
g = b;
b = w;
}
o = c.neg();
a = u;
var _ = n.sqr().add(s.sqr());
if (o.sqr().add(a.sqr()).cmp(_) >= 0) {
o = t;
a = r;
}
if (n.negative) {
n = n.neg();
s = s.neg();
}
if (o.negative) {
o = o.neg();
a = a.neg();
}
return [ {
a: n,
b: s
}, {
a: o,
b: a
} ];
};
a.prototype._endoSplit = function(e) {
var t = this.endo.basis, r = t[0], i = t[1], n = i.b.mul(e).divRound(this.n), s = r.b.neg().mul(e).divRound(this.n), o = n.mul(r.a), a = s.mul(i.a), f = n.mul(r.b), c = s.mul(i.b);
return {
k1: e.sub(o).sub(a),
k2: f.add(c).neg()
};
};
a.prototype.pointFromX = function(e, t) {
(e = new i(e, 16)).red || (e = e.toRed(this.red));
var r = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), n = r.redSqrt();
if (0 !== n.redSqr().redSub(r).cmp(this.zero)) throw new Error("invalid point");
var s = n.fromRed().isOdd();
(t && !s || !t && s) && (n = n.redNeg());
return this.point(e, n);
};
a.prototype.validate = function(e) {
if (e.inf) return !0;
var t = e.x, r = e.y, i = this.a.redMul(t), n = t.redSqr().redMul(t).redIAdd(i).redIAdd(this.b);
return 0 === r.redSqr().redISub(n).cmpn(0);
};
a.prototype._endoWnafMulAdd = function(e, t, r) {
for (var i = this._endoWnafT1, n = this._endoWnafT2, s = 0; s < e.length; s++) {
var o = this._endoSplit(t[s]), a = e[s], f = a._getBeta();
if (o.k1.negative) {
o.k1.ineg();
a = a.neg(!0);
}
if (o.k2.negative) {
o.k2.ineg();
f = f.neg(!0);
}
i[2 * s] = a;
i[2 * s + 1] = f;
n[2 * s] = o.k1;
n[2 * s + 1] = o.k2;
}
for (var c = this._wnafMulAdd(1, i, n, 2 * s, r), u = 0; u < 2 * s; u++) {
i[u] = null;
n[u] = null;
}
return c;
};
function f(e, t, r, n) {
s.BasePoint.call(this, e, "affine");
if (null === t && null === r) {
this.x = null;
this.y = null;
this.inf = !0;
} else {
this.x = new i(t, 16);
this.y = new i(r, 16);
if (n) {
this.x.forceRed(this.curve.red);
this.y.forceRed(this.curve.red);
}
this.x.red || (this.x = this.x.toRed(this.curve.red));
this.y.red || (this.y = this.y.toRed(this.curve.red));
this.inf = !1;
}
}
n(f, s.BasePoint);
a.prototype.point = function(e, t, r) {
return new f(this, e, t, r);
};
a.prototype.pointFromJSON = function(e, t) {
return f.fromJSON(this, e, t);
};
f.prototype._getBeta = function() {
if (this.curve.endo) {
var e = this.precomputed;
if (e && e.beta) return e.beta;
var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
if (e) {
var r = this.curve, i = function(e) {
return r.point(e.x.redMul(r.endo.beta), e.y);
};
e.beta = t;
t.precomputed = {
beta: null,
naf: e.naf && {
wnd: e.naf.wnd,
points: e.naf.points.map(i)
},
doubles: e.doubles && {
step: e.doubles.step,
points: e.doubles.points.map(i)
}
};
}
return t;
}
};
f.prototype.toJSON = function() {
return this.precomputed ? [ this.x, this.y, this.precomputed && {
doubles: this.precomputed.doubles && {
step: this.precomputed.doubles.step,
points: this.precomputed.doubles.points.slice(1)
},
naf: this.precomputed.naf && {
wnd: this.precomputed.naf.wnd,
points: this.precomputed.naf.points.slice(1)
}
} ] : [ this.x, this.y ];
};
f.fromJSON = function(e, t, r) {
"string" == typeof t && (t = JSON.parse(t));
var i = e.point(t[0], t[1], r);
if (!t[2]) return i;
function n(t) {
return e.point(t[0], t[1], r);
}
var s = t[2];
i.precomputed = {
beta: null,
doubles: s.doubles && {
step: s.doubles.step,
points: [ i ].concat(s.doubles.points.map(n))
},
naf: s.naf && {
wnd: s.naf.wnd,
points: [ i ].concat(s.naf.points.map(n))
}
};
return i;
};
f.prototype.inspect = function() {
return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
};
f.prototype.isInfinity = function() {
return this.inf;
};
f.prototype.add = function(e) {
if (this.inf) return e;
if (e.inf) return this;
if (this.eq(e)) return this.dbl();
if (this.neg().eq(e)) return this.curve.point(null, null);
if (0 === this.x.cmp(e.x)) return this.curve.point(null, null);
var t = this.y.redSub(e.y);
0 !== t.cmpn(0) && (t = t.redMul(this.x.redSub(e.x).redInvm()));
var r = t.redSqr().redISub(this.x).redISub(e.x), i = t.redMul(this.x.redSub(r)).redISub(this.y);
return this.curve.point(r, i);
};
f.prototype.dbl = function() {
if (this.inf) return this;
var e = this.y.redAdd(this.y);
if (0 === e.cmpn(0)) return this.curve.point(null, null);
var t = this.curve.a, r = this.x.redSqr(), i = e.redInvm(), n = r.redAdd(r).redIAdd(r).redIAdd(t).redMul(i), s = n.redSqr().redISub(this.x.redAdd(this.x)), o = n.redMul(this.x.redSub(s)).redISub(this.y);
return this.curve.point(s, o);
};
f.prototype.getX = function() {
return this.x.fromRed();
};
f.prototype.getY = function() {
return this.y.fromRed();
};
f.prototype.mul = function(e) {
e = new i(e, 16);
return this.isInfinity() ? this : this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([ this ], [ e ]) : this.curve._wnafMul(this, e);
};
f.prototype.mulAdd = function(e, t, r) {
var i = [ this, t ], n = [ e, r ];
return this.curve.endo ? this.curve._endoWnafMulAdd(i, n) : this.curve._wnafMulAdd(1, i, n, 2);
};
f.prototype.jmulAdd = function(e, t, r) {
var i = [ this, t ], n = [ e, r ];
return this.curve.endo ? this.curve._endoWnafMulAdd(i, n, !0) : this.curve._wnafMulAdd(1, i, n, 2, !0);
};
f.prototype.eq = function(e) {
return this === e || this.inf === e.inf && (this.inf || 0 === this.x.cmp(e.x) && 0 === this.y.cmp(e.y));
};
f.prototype.neg = function(e) {
if (this.inf) return this;
var t = this.curve.point(this.x, this.y.redNeg());
if (e && this.precomputed) {
var r = this.precomputed, i = function(e) {
return e.neg();
};
t.precomputed = {
naf: r.naf && {
wnd: r.naf.wnd,
points: r.naf.points.map(i)
},
doubles: r.doubles && {
step: r.doubles.step,
points: r.doubles.points.map(i)
}
};
}
return t;
};
f.prototype.toJ = function() {
return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one);
};
function c(e, t, r, n) {
s.BasePoint.call(this, e, "jacobian");
if (null === t && null === r && null === n) {
this.x = this.curve.one;
this.y = this.curve.one;
this.z = new i(0);
} else {
this.x = new i(t, 16);
this.y = new i(r, 16);
this.z = new i(n, 16);
}
this.x.red || (this.x = this.x.toRed(this.curve.red));
this.y.red || (this.y = this.y.toRed(this.curve.red));
this.z.red || (this.z = this.z.toRed(this.curve.red));
this.zOne = this.z === this.curve.one;
}
n(c, s.BasePoint);
a.prototype.jpoint = function(e, t, r) {
return new c(this, e, t, r);
};
c.prototype.toP = function() {
if (this.isInfinity()) return this.curve.point(null, null);
var e = this.z.redInvm(), t = e.redSqr(), r = this.x.redMul(t), i = this.y.redMul(t).redMul(e);
return this.curve.point(r, i);
};
c.prototype.neg = function() {
return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
c.prototype.add = function(e) {
if (this.isInfinity()) return e;
if (e.isInfinity()) return this;
var t = e.z.redSqr(), r = this.z.redSqr(), i = this.x.redMul(t), n = e.x.redMul(r), s = this.y.redMul(t.redMul(e.z)), o = e.y.redMul(r.redMul(this.z)), a = i.redSub(n), f = s.redSub(o);
if (0 === a.cmpn(0)) return 0 !== f.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
var c = a.redSqr(), u = c.redMul(a), h = i.redMul(c), d = f.redSqr().redIAdd(u).redISub(h).redISub(h), l = f.redMul(h.redISub(d)).redISub(s.redMul(u)), p = this.z.redMul(e.z).redMul(a);
return this.curve.jpoint(d, l, p);
};
c.prototype.mixedAdd = function(e) {
if (this.isInfinity()) return e.toJ();
if (e.isInfinity()) return this;
var t = this.z.redSqr(), r = this.x, i = e.x.redMul(t), n = this.y, s = e.y.redMul(t).redMul(this.z), o = r.redSub(i), a = n.redSub(s);
if (0 === o.cmpn(0)) return 0 !== a.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
var f = o.redSqr(), c = f.redMul(o), u = r.redMul(f), h = a.redSqr().redIAdd(c).redISub(u).redISub(u), d = a.redMul(u.redISub(h)).redISub(n.redMul(c)), l = this.z.redMul(o);
return this.curve.jpoint(h, d, l);
};
c.prototype.dblp = function(e) {
if (0 === e) return this;
if (this.isInfinity()) return this;
if (!e) return this.dbl();
var t;
if (this.curve.zeroA || this.curve.threeA) {
var r = this;
for (t = 0; t < e; t++) r = r.dbl();
return r;
}
var i = this.curve.a, n = this.curve.tinv, s = this.x, o = this.y, a = this.z, f = a.redSqr().redSqr(), c = o.redAdd(o);
for (t = 0; t < e; t++) {
var u = s.redSqr(), h = c.redSqr(), d = h.redSqr(), l = u.redAdd(u).redIAdd(u).redIAdd(i.redMul(f)), p = s.redMul(h), b = l.redSqr().redISub(p.redAdd(p)), m = p.redISub(b), g = l.redMul(m);
g = g.redIAdd(g).redISub(d);
var y = c.redMul(a);
t + 1 < e && (f = f.redMul(d));
s = b;
a = y;
c = g;
}
return this.curve.jpoint(s, c.redMul(n), a);
};
c.prototype.dbl = function() {
return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
};
c.prototype._zeroDbl = function() {
var e, t, r;
if (this.zOne) {
var i = this.x.redSqr(), n = this.y.redSqr(), s = n.redSqr(), o = this.x.redAdd(n).redSqr().redISub(i).redISub(s);
o = o.redIAdd(o);
var a = i.redAdd(i).redIAdd(i), f = a.redSqr().redISub(o).redISub(o), c = s.redIAdd(s);
c = (c = c.redIAdd(c)).redIAdd(c);
e = f;
t = a.redMul(o.redISub(f)).redISub(c);
r = this.y.redAdd(this.y);
} else {
var u = this.x.redSqr(), h = this.y.redSqr(), d = h.redSqr(), l = this.x.redAdd(h).redSqr().redISub(u).redISub(d);
l = l.redIAdd(l);
var p = u.redAdd(u).redIAdd(u), b = p.redSqr(), m = d.redIAdd(d);
m = (m = m.redIAdd(m)).redIAdd(m);
e = b.redISub(l).redISub(l);
t = p.redMul(l.redISub(e)).redISub(m);
r = (r = this.y.redMul(this.z)).redIAdd(r);
}
return this.curve.jpoint(e, t, r);
};
c.prototype._threeDbl = function() {
var e, t, r;
if (this.zOne) {
var i = this.x.redSqr(), n = this.y.redSqr(), s = n.redSqr(), o = this.x.redAdd(n).redSqr().redISub(i).redISub(s);
o = o.redIAdd(o);
var a = i.redAdd(i).redIAdd(i).redIAdd(this.curve.a), f = a.redSqr().redISub(o).redISub(o);
e = f;
var c = s.redIAdd(s);
c = (c = c.redIAdd(c)).redIAdd(c);
t = a.redMul(o.redISub(f)).redISub(c);
r = this.y.redAdd(this.y);
} else {
var u = this.z.redSqr(), h = this.y.redSqr(), d = this.x.redMul(h), l = this.x.redSub(u).redMul(this.x.redAdd(u));
l = l.redAdd(l).redIAdd(l);
var p = d.redIAdd(d), b = (p = p.redIAdd(p)).redAdd(p);
e = l.redSqr().redISub(b);
r = this.y.redAdd(this.z).redSqr().redISub(h).redISub(u);
var m = h.redSqr();
m = (m = (m = m.redIAdd(m)).redIAdd(m)).redIAdd(m);
t = l.redMul(p.redISub(e)).redISub(m);
}
return this.curve.jpoint(e, t, r);
};
c.prototype._dbl = function() {
var e = this.curve.a, t = this.x, r = this.y, i = this.z, n = i.redSqr().redSqr(), s = t.redSqr(), o = r.redSqr(), a = s.redAdd(s).redIAdd(s).redIAdd(e.redMul(n)), f = t.redAdd(t), c = (f = f.redIAdd(f)).redMul(o), u = a.redSqr().redISub(c.redAdd(c)), h = c.redISub(u), d = o.redSqr();
d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
var l = a.redMul(h).redISub(d), p = r.redAdd(r).redMul(i);
return this.curve.jpoint(u, l, p);
};
c.prototype.trpl = function() {
if (!this.curve.zeroA) return this.dbl().add(this);
var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr(), i = t.redSqr(), n = e.redAdd(e).redIAdd(e), s = n.redSqr(), o = this.x.redAdd(t).redSqr().redISub(e).redISub(i), a = (o = (o = (o = o.redIAdd(o)).redAdd(o).redIAdd(o)).redISub(s)).redSqr(), f = i.redIAdd(i);
f = (f = (f = f.redIAdd(f)).redIAdd(f)).redIAdd(f);
var c = n.redIAdd(o).redSqr().redISub(s).redISub(a).redISub(f), u = t.redMul(c);
u = (u = u.redIAdd(u)).redIAdd(u);
var h = this.x.redMul(a).redISub(u);
h = (h = h.redIAdd(h)).redIAdd(h);
var d = this.y.redMul(c.redMul(f.redISub(c)).redISub(o.redMul(a)));
d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
var l = this.z.redAdd(o).redSqr().redISub(r).redISub(a);
return this.curve.jpoint(h, d, l);
};
c.prototype.mul = function(e, t) {
e = new i(e, t);
return this.curve._wnafMul(this, e);
};
c.prototype.eq = function(e) {
if ("affine" === e.type) return this.eq(e.toJ());
if (this === e) return !0;
var t = this.z.redSqr(), r = e.z.redSqr();
if (0 !== this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0)) return !1;
var i = t.redMul(this.z), n = r.redMul(e.z);
return 0 === this.y.redMul(n).redISub(e.y.redMul(i)).cmpn(0);
};
c.prototype.eqXToP = function(e) {
var t = this.z.redSqr(), r = e.toRed(this.curve.red).redMul(t);
if (0 === this.x.cmp(r)) return !0;
for (var i = e.clone(), n = this.curve.redN.redMul(t); ;) {
i.iadd(this.curve.n);
if (i.cmp(this.curve.p) >= 0) return !1;
r.redIAdd(n);
if (0 === this.x.cmp(r)) return !0;
}
};
c.prototype.inspect = function() {
return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
};
c.prototype.isInfinity = function() {
return 0 === this.z.cmpn(0);
};
}, {
"../utils": 101,
"./base": 88,
"bn.js": 102,
inherits: 138
} ],
93: [ function(e, t, r) {
"use strict";
var i, n = r, s = e("hash.js"), o = e("./curve"), a = e("./utils").assert;
function f(e) {
"short" === e.type ? this.curve = new o.short(e) : "edwards" === e.type ? this.curve = new o.edwards(e) : this.curve = new o.mont(e);
this.g = this.curve.g;
this.n = this.curve.n;
this.hash = e.hash;
a(this.g.validate(), "Invalid curve");
a(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
}
n.PresetCurve = f;
function c(e, t) {
Object.defineProperty(n, e, {
configurable: !0,
enumerable: !0,
get: function() {
var r = new f(t);
Object.defineProperty(n, e, {
configurable: !0,
enumerable: !0,
value: r
});
return r;
}
});
}
c("p192", {
type: "short",
prime: "p192",
p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
hash: s.sha256,
gRed: !1,
g: [ "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811" ]
});
c("p224", {
type: "short",
prime: "p224",
p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
hash: s.sha256,
gRed: !1,
g: [ "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34" ]
});
c("p256", {
type: "short",
prime: null,
p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
hash: s.sha256,
gRed: !1,
g: [ "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5" ]
});
c("p384", {
type: "short",
prime: null,
p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
hash: s.sha384,
gRed: !1,
g: [ "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f" ]
});
c("p521", {
type: "short",
prime: null,
p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
hash: s.sha512,
gRed: !1,
g: [ "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650" ]
});
c("curve25519", {
type: "mont",
prime: "p25519",
p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
a: "76d06",
b: "1",
n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
hash: s.sha256,
gRed: !1,
g: [ "9" ]
});
c("ed25519", {
type: "edwards",
prime: "p25519",
p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
a: "-1",
c: "1",
d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
hash: s.sha256,
gRed: !1,
g: [ "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658" ]
});
try {
i = e("./precomputed/secp256k1");
} catch (e) {
i = void 0;
}
c("secp256k1", {
type: "short",
prime: "k256",
p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
a: "0",
b: "7",
n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
h: "1",
hash: s.sha256,
beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
basis: [ {
a: "3086d221a7d46bcde86c90e49284eb15",
b: "-e4437ed6010e88286f547fa90abfe4c3"
}, {
a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
b: "3086d221a7d46bcde86c90e49284eb15"
} ],
gRed: !1,
g: [ "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", i ]
});
}, {
"./curve": 90,
"./precomputed/secp256k1": 100,
"./utils": 101,
"hash.js": 124
} ],
94: [ function(e, t) {
"use strict";
var r = e("bn.js"), i = e("hmac-drbg"), n = e("../utils"), s = e("../curves"), o = e("brorand"), a = n.assert, f = e("./key"), c = e("./signature");
function u(e) {
if (!(this instanceof u)) return new u(e);
if ("string" == typeof e) {
a(Object.prototype.hasOwnProperty.call(s, e), "Unknown curve " + e);
e = s[e];
}
e instanceof s.PresetCurve && (e = {
curve: e
});
this.curve = e.curve.curve;
this.n = this.curve.n;
this.nh = this.n.ushrn(1);
this.g = this.curve.g;
this.g = e.curve.g;
this.g.precompute(e.curve.n.bitLength() + 1);
this.hash = e.hash || e.curve.hash;
}
t.exports = u;
u.prototype.keyPair = function(e) {
return new f(this, e);
};
u.prototype.keyFromPrivate = function(e, t) {
return f.fromPrivate(this, e, t);
};
u.prototype.keyFromPublic = function(e, t) {
return f.fromPublic(this, e, t);
};
u.prototype.genKeyPair = function(e) {
e || (e = {});
for (var t = new i({
hash: this.hash,
pers: e.pers,
persEnc: e.persEnc || "utf8",
entropy: e.entropy || o(this.hash.hmacStrength),
entropyEnc: e.entropy && e.entropyEnc || "utf8",
nonce: this.n.toArray()
}), n = this.n.byteLength(), s = this.n.sub(new r(2)); ;) {
var a = new r(t.generate(n));
if (!(a.cmp(s) > 0)) {
a.iaddn(1);
return this.keyFromPrivate(a);
}
}
};
u.prototype._truncateToN = function(e, t) {
var r = 8 * e.byteLength() - this.n.bitLength();
r > 0 && (e = e.ushrn(r));
return !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e;
};
u.prototype.sign = function(e, t, n, s) {
if ("object" == typeof n) {
s = n;
n = null;
}
s || (s = {});
t = this.keyFromPrivate(t, n);
e = this._truncateToN(new r(e, 16));
for (var o = this.n.byteLength(), a = t.getPrivate().toArray("be", o), f = e.toArray("be", o), u = new i({
hash: this.hash,
entropy: a,
nonce: f,
pers: s.pers,
persEnc: s.persEnc || "utf8"
}), h = this.n.sub(new r(1)), d = 0; ;d++) {
var l = s.k ? s.k(d) : new r(u.generate(this.n.byteLength()));
if (!((l = this._truncateToN(l, !0)).cmpn(1) <= 0 || l.cmp(h) >= 0)) {
var p = this.g.mul(l);
if (!p.isInfinity()) {
var b = p.getX(), m = b.umod(this.n);
if (0 !== m.cmpn(0)) {
var g = l.invm(this.n).mul(m.mul(t.getPrivate()).iadd(e));
if (0 !== (g = g.umod(this.n)).cmpn(0)) {
var y = (p.getY().isOdd() ? 1 : 0) | (0 !== b.cmp(m) ? 2 : 0);
if (s.canonical && g.cmp(this.nh) > 0) {
g = this.n.sub(g);
y ^= 1;
}
return new c({
r: m,
s: g,
recoveryParam: y
});
}
}
}
}
}
};
u.prototype.verify = function(e, t, i, n) {
e = this._truncateToN(new r(e, 16));
i = this.keyFromPublic(i, n);
var s = (t = new c(t, "hex")).r, o = t.s;
if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0) return !1;
if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
var a, f = o.invm(this.n), u = f.mul(e).umod(this.n), h = f.mul(s).umod(this.n);
return this.curve._maxwellTrick ? !(a = this.g.jmulAdd(u, i.getPublic(), h)).isInfinity() && a.eqXToP(s) : !(a = this.g.mulAdd(u, i.getPublic(), h)).isInfinity() && 0 === a.getX().umod(this.n).cmp(s);
};
u.prototype.recoverPubKey = function(e, t, i, n) {
a((3 & i) === i, "The recovery param is more than two bits");
t = new c(t, n);
var s = this.n, o = new r(e), f = t.r, u = t.s, h = 1 & i, d = i >> 1;
if (f.cmp(this.curve.p.umod(this.curve.n)) >= 0 && d) throw new Error("Unable to find sencond key candinate");
f = d ? this.curve.pointFromX(f.add(this.curve.n), h) : this.curve.pointFromX(f, h);
var l = t.r.invm(s), p = s.sub(o).mul(l).umod(s), b = u.mul(l).umod(s);
return this.g.mulAdd(p, f, b);
};
u.prototype.getKeyRecoveryParam = function(e, t, r, i) {
if (null !== (t = new c(t, i)).recoveryParam) return t.recoveryParam;
for (var n = 0; n < 4; n++) {
var s;
try {
s = this.recoverPubKey(e, t, n);
} catch (e) {
continue;
}
if (s.eq(r)) return n;
}
throw new Error("Unable to find valid recovery factor");
};
}, {
"../curves": 93,
"../utils": 101,
"./key": 95,
"./signature": 96,
"bn.js": 102,
brorand: 18,
"hmac-drbg": 136
} ],
95: [ function(e, t) {
"use strict";
var r = e("bn.js"), i = e("../utils").assert;
function n(e, t) {
this.ec = e;
this.priv = null;
this.pub = null;
t.priv && this._importPrivate(t.priv, t.privEnc);
t.pub && this._importPublic(t.pub, t.pubEnc);
}
t.exports = n;
n.fromPublic = function(e, t, r) {
return t instanceof n ? t : new n(e, {
pub: t,
pubEnc: r
});
};
n.fromPrivate = function(e, t, r) {
return t instanceof n ? t : new n(e, {
priv: t,
privEnc: r
});
};
n.prototype.validate = function() {
var e = this.getPublic();
return e.isInfinity() ? {
result: !1,
reason: "Invalid public key"
} : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? {
result: !0,
reason: null
} : {
result: !1,
reason: "Public key * N != O"
} : {
result: !1,
reason: "Public key is not a point"
};
};
n.prototype.getPublic = function(e, t) {
if ("string" == typeof e) {
t = e;
e = null;
}
this.pub || (this.pub = this.ec.g.mul(this.priv));
return t ? this.pub.encode(t, e) : this.pub;
};
n.prototype.getPrivate = function(e) {
return "hex" === e ? this.priv.toString(16, 2) : this.priv;
};
n.prototype._importPrivate = function(e, t) {
this.priv = new r(e, t || 16);
this.priv = this.priv.umod(this.ec.curve.n);
};
n.prototype._importPublic = function(e, t) {
if (e.x || e.y) {
"mont" === this.ec.curve.type ? i(e.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || i(e.x && e.y, "Need both x and y coordinate");
this.pub = this.ec.curve.point(e.x, e.y);
} else this.pub = this.ec.curve.decodePoint(e, t);
};
n.prototype.derive = function(e) {
e.validate() || i(e.validate(), "public point not validated");
return e.mul(this.priv).getX();
};
n.prototype.sign = function(e, t, r) {
return this.ec.sign(e, this, t, r);
};
n.prototype.verify = function(e, t) {
return this.ec.verify(e, t, this);
};
n.prototype.inspect = function() {
return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
}, {
"../utils": 101,
"bn.js": 102
} ],
96: [ function(e, t) {
"use strict";
var r = e("bn.js"), i = e("../utils"), n = i.assert;
function s(e, t) {
if (e instanceof s) return e;
if (!this._importDER(e, t)) {
n(e.r && e.s, "Signature without r or s");
this.r = new r(e.r, 16);
this.s = new r(e.s, 16);
void 0 === e.recoveryParam ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam;
}
}
t.exports = s;
function o() {
this.place = 0;
}
function a(e, t) {
var r = e[t.place++];
if (!(128 & r)) return r;
var i = 15 & r;
if (0 === i || i > 4) return !1;
for (var n = 0, s = 0, o = t.place; s < i; s++, o++) {
n <<= 8;
n |= e[o];
n >>>= 0;
}
if (n <= 127) return !1;
t.place = o;
return n;
}
function f(e) {
for (var t = 0, r = e.length - 1; !e[t] && !(128 & e[t + 1]) && t < r; ) t++;
return 0 === t ? e : e.slice(t);
}
s.prototype._importDER = function(e, t) {
e = i.toArray(e, t);
var n = new o();
if (48 !== e[n.place++]) return !1;
var s = a(e, n);
if (!1 === s) return !1;
if (s + n.place !== e.length) return !1;
if (2 !== e[n.place++]) return !1;
var f = a(e, n);
if (!1 === f) return !1;
var c = e.slice(n.place, f + n.place);
n.place += f;
if (2 !== e[n.place++]) return !1;
var u = a(e, n);
if (!1 === u) return !1;
if (e.length !== u + n.place) return !1;
var h = e.slice(n.place, u + n.place);
if (0 === c[0]) {
if (!(128 & c[1])) return !1;
c = c.slice(1);
}
if (0 === h[0]) {
if (!(128 & h[1])) return !1;
h = h.slice(1);
}
this.r = new r(c);
this.s = new r(h);
this.recoveryParam = null;
return !0;
};
function c(e, t) {
if (t < 128) e.push(t); else {
var r = 1 + (Math.log(t) / Math.LN2 >>> 3);
e.push(128 | r);
for (;--r; ) e.push(t >>> (r << 3) & 255);
e.push(t);
}
}
s.prototype.toDER = function(e) {
var t = this.r.toArray(), r = this.s.toArray();
128 & t[0] && (t = [ 0 ].concat(t));
128 & r[0] && (r = [ 0 ].concat(r));
t = f(t);
r = f(r);
for (;!(r[0] || 128 & r[1]); ) r = r.slice(1);
var n = [ 2 ];
c(n, t.length);
(n = n.concat(t)).push(2);
c(n, r.length);
var s = n.concat(r), o = [ 48 ];
c(o, s.length);
o = o.concat(s);
return i.encode(o, e);
};
}, {
"../utils": 101,
"bn.js": 102
} ],
97: [ function(e, t) {
"use strict";
var r = e("hash.js"), i = e("../curves"), n = e("../utils"), s = n.assert, o = n.parseBytes, a = e("./key"), f = e("./signature");
function c(e) {
s("ed25519" === e, "only tested with ed25519 so far");
if (!(this instanceof c)) return new c(e);
e = i[e].curve;
this.curve = e;
this.g = e.g;
this.g.precompute(e.n.bitLength() + 1);
this.pointClass = e.point().constructor;
this.encodingLength = Math.ceil(e.n.bitLength() / 8);
this.hash = r.sha512;
}
t.exports = c;
c.prototype.sign = function(e, t) {
e = o(e);
var r = this.keyFromSecret(t), i = this.hashInt(r.messagePrefix(), e), n = this.g.mul(i), s = this.encodePoint(n), a = this.hashInt(s, r.pubBytes(), e).mul(r.priv()), f = i.add(a).umod(this.curve.n);
return this.makeSignature({
R: n,
S: f,
Rencoded: s
});
};
c.prototype.verify = function(e, t, r) {
e = o(e);
t = this.makeSignature(t);
var i = this.keyFromPublic(r), n = this.hashInt(t.Rencoded(), i.pubBytes(), e), s = this.g.mul(t.S());
return t.R().add(i.pub().mul(n)).eq(s);
};
c.prototype.hashInt = function() {
for (var e = this.hash(), t = 0; t < arguments.length; t++) e.update(arguments[t]);
return n.intFromLE(e.digest()).umod(this.curve.n);
};
c.prototype.keyFromPublic = function(e) {
return a.fromPublic(this, e);
};
c.prototype.keyFromSecret = function(e) {
return a.fromSecret(this, e);
};
c.prototype.makeSignature = function(e) {
return e instanceof f ? e : new f(this, e);
};
c.prototype.encodePoint = function(e) {
var t = e.getY().toArray("le", this.encodingLength);
t[this.encodingLength - 1] |= e.getX().isOdd() ? 128 : 0;
return t;
};
c.prototype.decodePoint = function(e) {
var t = (e = n.parseBytes(e)).length - 1, r = e.slice(0, t).concat(-129 & e[t]), i = 0 != (128 & e[t]), s = n.intFromLE(r);
return this.curve.pointFromY(s, i);
};
c.prototype.encodeInt = function(e) {
return e.toArray("le", this.encodingLength);
};
c.prototype.decodeInt = function(e) {
return n.intFromLE(e);
};
c.prototype.isPoint = function(e) {
return e instanceof this.pointClass;
};
}, {
"../curves": 93,
"../utils": 101,
"./key": 98,
"./signature": 99,
"hash.js": 124
} ],
98: [ function(e, t) {
"use strict";
var r = e("../utils"), i = r.assert, n = r.parseBytes, s = r.cachedProperty;
function o(e, t) {
this.eddsa = e;
this._secret = n(t.secret);
e.isPoint(t.pub) ? this._pub = t.pub : this._pubBytes = n(t.pub);
}
o.fromPublic = function(e, t) {
return t instanceof o ? t : new o(e, {
pub: t
});
};
o.fromSecret = function(e, t) {
return t instanceof o ? t : new o(e, {
secret: t
});
};
o.prototype.secret = function() {
return this._secret;
};
s(o, "pubBytes", function() {
return this.eddsa.encodePoint(this.pub());
});
s(o, "pub", function() {
return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv());
});
s(o, "privBytes", function() {
var e = this.eddsa, t = this.hash(), r = e.encodingLength - 1, i = t.slice(0, e.encodingLength);
i[0] &= 248;
i[r] &= 127;
i[r] |= 64;
return i;
});
s(o, "priv", function() {
return this.eddsa.decodeInt(this.privBytes());
});
s(o, "hash", function() {
return this.eddsa.hash().update(this.secret()).digest();
});
s(o, "messagePrefix", function() {
return this.hash().slice(this.eddsa.encodingLength);
});
o.prototype.sign = function(e) {
i(this._secret, "KeyPair can only verify");
return this.eddsa.sign(e, this);
};
o.prototype.verify = function(e, t) {
return this.eddsa.verify(e, t, this);
};
o.prototype.getSecret = function(e) {
i(this._secret, "KeyPair is public only");
return r.encode(this.secret(), e);
};
o.prototype.getPublic = function(e) {
return r.encode(this.pubBytes(), e);
};
t.exports = o;
}, {
"../utils": 101
} ],
99: [ function(e, t) {
"use strict";
var r = e("bn.js"), i = e("../utils"), n = i.assert, s = i.cachedProperty, o = i.parseBytes;
function a(e, t) {
this.eddsa = e;
"object" != typeof t && (t = o(t));
Array.isArray(t) && (t = {
R: t.slice(0, e.encodingLength),
S: t.slice(e.encodingLength)
});
n(t.R && t.S, "Signature without R or S");
e.isPoint(t.R) && (this._R = t.R);
t.S instanceof r && (this._S = t.S);
this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded;
this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded;
}
s(a, "S", function() {
return this.eddsa.decodeInt(this.Sencoded());
});
s(a, "R", function() {
return this.eddsa.decodePoint(this.Rencoded());
});
s(a, "Rencoded", function() {
return this.eddsa.encodePoint(this.R());
});
s(a, "Sencoded", function() {
return this.eddsa.encodeInt(this.S());
});
a.prototype.toBytes = function() {
return this.Rencoded().concat(this.Sencoded());
};
a.prototype.toHex = function() {
return i.encode(this.toBytes(), "hex").toUpperCase();
};
t.exports = a;
}, {
"../utils": 101,
"bn.js": 102
} ],
100: [ function(e, t) {
t.exports = {
doubles: {
step: 4,
points: [ [ "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821" ], [ "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf" ], [ "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695" ], [ "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9" ], [ "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36" ], [ "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f" ], [ "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999" ], [ "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09" ], [ "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d" ], [ "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088" ], [ "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d" ], [ "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8" ], [ "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a" ], [ "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453" ], [ "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160" ], [ "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0" ], [ "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6" ], [ "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589" ], [ "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17" ], [ "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda" ], [ "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd" ], [ "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2" ], [ "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6" ], [ "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f" ], [ "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01" ], [ "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3" ], [ "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f" ], [ "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7" ], [ "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78" ], [ "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1" ], [ "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150" ], [ "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82" ], [ "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc" ], [ "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b" ], [ "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51" ], [ "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45" ], [ "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120" ], [ "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84" ], [ "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d" ], [ "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d" ], [ "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8" ], [ "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8" ], [ "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac" ], [ "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f" ], [ "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962" ], [ "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907" ], [ "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec" ], [ "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d" ], [ "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414" ], [ "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd" ], [ "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0" ], [ "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811" ], [ "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1" ], [ "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c" ], [ "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73" ], [ "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd" ], [ "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405" ], [ "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589" ], [ "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e" ], [ "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27" ], [ "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1" ], [ "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482" ], [ "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945" ], [ "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573" ], [ "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82" ] ]
},
naf: {
wnd: 7,
points: [ [ "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672" ], [ "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6" ], [ "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da" ], [ "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37" ], [ "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b" ], [ "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81" ], [ "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58" ], [ "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77" ], [ "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a" ], [ "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c" ], [ "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67" ], [ "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402" ], [ "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55" ], [ "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482" ], [ "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82" ], [ "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396" ], [ "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49" ], [ "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf" ], [ "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a" ], [ "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7" ], [ "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933" ], [ "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a" ], [ "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6" ], [ "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37" ], [ "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e" ], [ "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6" ], [ "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476" ], [ "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40" ], [ "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61" ], [ "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683" ], [ "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5" ], [ "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b" ], [ "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417" ], [ "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868" ], [ "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a" ], [ "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6" ], [ "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996" ], [ "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e" ], [ "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d" ], [ "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2" ], [ "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e" ], [ "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437" ], [ "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311" ], [ "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4" ], [ "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575" ], [ "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d" ], [ "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d" ], [ "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629" ], [ "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06" ], [ "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374" ], [ "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee" ], [ "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1" ], [ "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b" ], [ "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661" ], [ "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6" ], [ "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e" ], [ "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d" ], [ "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc" ], [ "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4" ], [ "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c" ], [ "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b" ], [ "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913" ], [ "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154" ], [ "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865" ], [ "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc" ], [ "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224" ], [ "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e" ], [ "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6" ], [ "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511" ], [ "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b" ], [ "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2" ], [ "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c" ], [ "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3" ], [ "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d" ], [ "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700" ], [ "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4" ], [ "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196" ], [ "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4" ], [ "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257" ], [ "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13" ], [ "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096" ], [ "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38" ], [ "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f" ], [ "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448" ], [ "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a" ], [ "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4" ], [ "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437" ], [ "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7" ], [ "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d" ], [ "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a" ], [ "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54" ], [ "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77" ], [ "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517" ], [ "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10" ], [ "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125" ], [ "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e" ], [ "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1" ], [ "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2" ], [ "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423" ], [ "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8" ], [ "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758" ], [ "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375" ], [ "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d" ], [ "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec" ], [ "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0" ], [ "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c" ], [ "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4" ], [ "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f" ], [ "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649" ], [ "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826" ], [ "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5" ], [ "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87" ], [ "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b" ], [ "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc" ], [ "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c" ], [ "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f" ], [ "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a" ], [ "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46" ], [ "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f" ], [ "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03" ], [ "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08" ], [ "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8" ], [ "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373" ], [ "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3" ], [ "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8" ], [ "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1" ], [ "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9" ] ]
}
};
}, {} ],
101: [ function(e, t, r) {
"use strict";
var i = r, n = e("bn.js"), s = e("minimalistic-assert"), o = e("minimalistic-crypto-utils");
i.assert = s;
i.toArray = o.toArray;
i.zero2 = o.zero2;
i.toHex = o.toHex;
i.encode = o.encode;
i.getNAF = function(e, t, r) {
var i = new Array(Math.max(e.bitLength(), r) + 1);
i.fill(0);
for (var n = 1 << t + 1, s = e.clone(), o = 0; o < i.length; o++) {
var a, f = s.andln(n - 1);
if (s.isOdd()) {
a = f > (n >> 1) - 1 ? (n >> 1) - f : f;
s.isubn(a);
} else a = 0;
i[o] = a;
s.iushrn(1);
}
return i;
};
i.getJSF = function(e, t) {
var r = [ [], [] ];
e = e.clone();
t = t.clone();
for (var i, n = 0, s = 0; e.cmpn(-n) > 0 || t.cmpn(-s) > 0; ) {
var o, a, f = e.andln(3) + n & 3, c = t.andln(3) + s & 3;
3 === f && (f = -1);
3 === c && (c = -1);
o = 0 == (1 & f) ? 0 : 3 != (i = e.andln(7) + n & 7) && 5 !== i || 2 !== c ? f : -f;
r[0].push(o);
a = 0 == (1 & c) ? 0 : 3 != (i = t.andln(7) + s & 7) && 5 !== i || 2 !== f ? c : -c;
r[1].push(a);
2 * n === o + 1 && (n = 1 - n);
2 * s === a + 1 && (s = 1 - s);
e.iushrn(1);
t.iushrn(1);
}
return r;
};
i.cachedProperty = function(e, t, r) {
var i = "_" + t;
e.prototype[t] = function() {
return void 0 !== this[i] ? this[i] : this[i] = r.call(this);
};
};
i.parseBytes = function(e) {
return "string" == typeof e ? i.toArray(e, "hex") : e;
};
i.intFromLE = function(e) {
return new n(e, "hex", "le");
};
}, {
"bn.js": 102,
"minimalistic-assert": 142,
"minimalistic-crypto-utils": 143
} ],
102: [ function(e, t, r) {
arguments[4][15][0].apply(r, arguments);
}, {
buffer: 19,
dup: 15
} ],
103: [ function(e, t) {
t.exports = {
_from: "elliptic@^6.5.3",
_id: "elliptic@6.5.4",
_inBundle: !1,
_integrity: "sha512-iLhC6ULemrljPZb+QutR5TQGB+pdW6KGD5RSegS+8sorOZT+rdQFbsQFJgvN3eRqNALqJer4oQ16YvJHlU8hzQ==",
_location: "/elliptic",
_phantomChildren: {},
_requested: {
type: "range",
registry: !0,
raw: "elliptic@^6.5.3",
name: "elliptic",
escapedName: "elliptic",
rawSpec: "^6.5.3",
saveSpec: null,
fetchSpec: "^6.5.3"
},
_requiredBy: [ "/browserify-sign", "/create-ecdh" ],
_resolved: "https://registry.npmjs.org/elliptic/-/elliptic-6.5.4.tgz",
_shasum: "da37cebd31e79a1367e941b592ed1fbebd58abbb",
_spec: "elliptic@^6.5.3",
_where: "/Users/nantas/jenkins/workspace/Creator_2D/fireball/mac/fireball/dist/CocosCreator.app/Contents/Resources/app/node_modules/browserify-sign",
author: {
name: "Fedor Indutny",
email: "fedor@indutny.com"
},
bugs: {
url: "https://github.com/indutny/elliptic/issues"
},
bundleDependencies: !1,
dependencies: {
"bn.js": "^4.11.9",
brorand: "^1.1.0",
"hash.js": "^1.0.0",
"hmac-drbg": "^1.0.1",
inherits: "^2.0.4",
"minimalistic-assert": "^1.0.1",
"minimalistic-crypto-utils": "^1.0.1"
},
deprecated: !1,
description: "EC cryptography",
devDependencies: {
brfs: "^2.0.2",
coveralls: "^3.1.0",
eslint: "^7.6.0",
grunt: "^1.2.1",
"grunt-browserify": "^5.3.0",
"grunt-cli": "^1.3.2",
"grunt-contrib-connect": "^3.0.0",
"grunt-contrib-copy": "^1.0.0",
"grunt-contrib-uglify": "^5.0.0",
"grunt-mocha-istanbul": "^5.0.2",
"grunt-saucelabs": "^9.0.1",
istanbul: "^0.4.5",
mocha: "^8.0.1"
},
files: [ "lib" ],
homepage: "https://github.com/indutny/elliptic",
keywords: [ "EC", "Elliptic", "curve", "Cryptography" ],
license: "MIT",
main: "lib/elliptic.js",
name: "elliptic",
repository: {
type: "git",
url: "git+ssh://git@github.com/indutny/elliptic.git"
},
scripts: {
lint: "eslint lib test",
"lint:fix": "npm run lint -- --fix",
test: "npm run lint && npm run unit",
unit: "istanbul test _mocha --reporter=spec test/index.js",
version: "grunt dist && git add dist/"
},
version: "6.5.4"
};
}, {} ],
104: [ function(e, t) {
function r() {
this._events = this._events || {};
this._maxListeners = this._maxListeners || void 0;
}
t.exports = r;
r.EventEmitter = r;
r.prototype._events = void 0;
r.prototype._maxListeners = void 0;
r.defaultMaxListeners = 10;
r.prototype.setMaxListeners = function(e) {
if (!(t = e, "number" == typeof t) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
var t;
this._maxListeners = e;
return this;
};
r.prototype.emit = function(e) {
var t, r, o, a, f, c;
this._events || (this._events = {});
if ("error" === e && (!this._events.error || n(this._events.error) && !this._events.error.length)) {
if ((t = arguments[1]) instanceof Error) throw t;
var u = new Error('Uncaught, unspecified "error" event. (' + t + ")");
u.context = t;
throw u;
}
if (s(r = this._events[e])) return !1;
if (i(r)) switch (arguments.length) {
case 1:
r.call(this);
break;

case 2:
r.call(this, arguments[1]);
break;

case 3:
r.call(this, arguments[1], arguments[2]);
break;

default:
a = Array.prototype.slice.call(arguments, 1);
r.apply(this, a);
} else if (n(r)) {
a = Array.prototype.slice.call(arguments, 1);
o = (c = r.slice()).length;
for (f = 0; f < o; f++) c[f].apply(this, a);
}
return !0;
};
r.prototype.addListener = function(e, t) {
var o;
if (!i(t)) throw TypeError("listener must be a function");
this._events || (this._events = {});
this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t);
this._events[e] ? n(this._events[e]) ? this._events[e].push(t) : this._events[e] = [ this._events[e], t ] : this._events[e] = t;
if (n(this._events[e]) && !this._events[e].warned && (o = s(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && o > 0 && this._events[e].length > o) {
this._events[e].warned = !0;
console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length);
"function" == typeof console.trace && console.trace();
}
return this;
};
r.prototype.on = r.prototype.addListener;
r.prototype.once = function(e, t) {
if (!i(t)) throw TypeError("listener must be a function");
var r = !1;
function n() {
this.removeListener(e, n);
if (!r) {
r = !0;
t.apply(this, arguments);
}
}
n.listener = t;
this.on(e, n);
return this;
};
r.prototype.removeListener = function(e, t) {
var r, s, o, a;
if (!i(t)) throw TypeError("listener must be a function");
if (!this._events || !this._events[e]) return this;
o = (r = this._events[e]).length;
s = -1;
if (r === t || i(r.listener) && r.listener === t) {
delete this._events[e];
this._events.removeListener && this.emit("removeListener", e, t);
} else if (n(r)) {
for (a = o; a-- > 0; ) if (r[a] === t || r[a].listener && r[a].listener === t) {
s = a;
break;
}
if (s < 0) return this;
if (1 === r.length) {
r.length = 0;
delete this._events[e];
} else r.splice(s, 1);
this._events.removeListener && this.emit("removeListener", e, t);
}
return this;
};
r.prototype.removeAllListeners = function(e) {
var t, r;
if (!this._events) return this;
if (!this._events.removeListener) {
0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e];
return this;
}
if (0 === arguments.length) {
for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
this.removeAllListeners("removeListener");
this._events = {};
return this;
}
if (i(r = this._events[e])) this.removeListener(e, r); else if (r) for (;r.length; ) this.removeListener(e, r[r.length - 1]);
delete this._events[e];
return this;
};
r.prototype.listeners = function(e) {
return this._events && this._events[e] ? i(this._events[e]) ? [ this._events[e] ] : this._events[e].slice() : [];
};
r.prototype.listenerCount = function(e) {
if (this._events) {
var t = this._events[e];
if (i(t)) return 1;
if (t) return t.length;
}
return 0;
};
r.listenerCount = function(e, t) {
return e.listenerCount(t);
};
function i(e) {
return "function" == typeof e;
}
function n(e) {
return "object" == typeof e && null !== e;
}
function s(e) {
return void 0 === e;
}
}, {} ],
105: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = e("md5.js");
t.exports = function(e, t, n, s) {
r.isBuffer(e) || (e = r.from(e, "binary"));
if (t) {
r.isBuffer(t) || (t = r.from(t, "binary"));
if (8 !== t.length) throw new RangeError("salt should be Buffer with 8 byte length");
}
for (var o = n / 8, a = r.alloc(o), f = r.alloc(s || 0), c = r.alloc(0); o > 0 || s > 0; ) {
var u = new i();
u.update(c);
u.update(e);
t && u.update(t);
c = u.digest();
var h = 0;
if (o > 0) {
var d = a.length - o;
h = Math.min(o, c.length);
c.copy(a, d, 0, h);
o -= h;
}
if (h < c.length && s > 0) {
var l = f.length - s, p = Math.min(s, c.length - h);
c.copy(f, l, h, h + p);
s -= p;
}
}
c.fill(0);
return {
key: a,
iv: f
};
};
}, {
"md5.js": 139,
"safe-buffer": 182
} ],
106: [ function(e, t) {
"use strict";
var r = e("safe-buffer").Buffer, i = e("readable-stream").Transform;
function n(e, t) {
if (!r.isBuffer(e) && "string" != typeof e) throw new TypeError(t + " must be a string or a buffer");
}
function s(e) {
i.call(this);
this._block = r.allocUnsafe(e);
this._blockSize = e;
this._blockOffset = 0;
this._length = [ 0, 0, 0, 0 ];
this._finalized = !1;
}
e("inherits")(s, i);
s.prototype._transform = function(e, t, r) {
var i = null;
try {
this.update(e, t);
} catch (e) {
i = e;
}
r(i);
};
s.prototype._flush = function(e) {
var t = null;
try {
this.push(this.digest());
} catch (e) {
t = e;
}
e(t);
};
s.prototype.update = function(e, t) {
n(e, "Data");
if (this._finalized) throw new Error("Digest already called");
r.isBuffer(e) || (e = r.from(e, t));
for (var i = this._block, s = 0; this._blockOffset + e.length - s >= this._blockSize; ) {
for (var o = this._blockOffset; o < this._blockSize; ) i[o++] = e[s++];
this._update();
this._blockOffset = 0;
}
for (;s < e.length; ) i[this._blockOffset++] = e[s++];
for (var a = 0, f = 8 * e.length; f > 0; ++a) {
this._length[a] += f;
(f = this._length[a] / 4294967296 | 0) > 0 && (this._length[a] -= 4294967296 * f);
}
return this;
};
s.prototype._update = function() {
throw new Error("_update is not implemented");
};
s.prototype.digest = function(e) {
if (this._finalized) throw new Error("Digest already called");
this._finalized = !0;
var t = this._digest();
void 0 !== e && (t = t.toString(e));
this._block.fill(0);
this._blockOffset = 0;
for (var r = 0; r < 4; ++r) this._length[r] = 0;
return t;
};
s.prototype._digest = function() {
throw new Error("_digest is not implemented");
};
t.exports = s;
}, {
inherits: 138,
"readable-stream": 121,
"safe-buffer": 122
} ],
107: [ function(e, t, r) {
arguments[4][47][0].apply(r, arguments);
}, {
dup: 47
} ],
108: [ function(e, t, r) {
arguments[4][48][0].apply(r, arguments);
}, {
"./_stream_readable": 110,
"./_stream_writable": 112,
_process: 156,
dup: 48,
inherits: 138
} ],
109: [ function(e, t, r) {
arguments[4][49][0].apply(r, arguments);
}, {
"./_stream_transform": 111,
dup: 49,
inherits: 138
} ],
110: [ function(e, t, r) {
arguments[4][50][0].apply(r, arguments);
}, {
"../errors": 107,
"./_stream_duplex": 108,
"./internal/streams/async_iterator": 113,
"./internal/streams/buffer_list": 114,
"./internal/streams/destroy": 115,
"./internal/streams/from": 117,
"./internal/streams/state": 119,
"./internal/streams/stream": 120,
_process: 156,
buffer: 65,
dup: 50,
events: 104,
inherits: 138,
"string_decoder/": 123,
util: 19
} ],
111: [ function(e, t, r) {
arguments[4][51][0].apply(r, arguments);
}, {
"../errors": 107,
"./_stream_duplex": 108,
dup: 51,
inherits: 138
} ],
112: [ function(e, t, r) {
arguments[4][52][0].apply(r, arguments);
}, {
"../errors": 107,
"./_stream_duplex": 108,
"./internal/streams/destroy": 115,
"./internal/streams/state": 119,
"./internal/streams/stream": 120,
_process: 156,
buffer: 65,
dup: 52,
inherits: 138,
"util-deprecate": 194
} ],
113: [ function(e, t, r) {
arguments[4][53][0].apply(r, arguments);
}, {
"./end-of-stream": 116,
_process: 156,
dup: 53
} ],
114: [ function(e, t, r) {
arguments[4][54][0].apply(r, arguments);
}, {
buffer: 65,
dup: 54,
util: 19
} ],
115: [ function(e, t, r) {
arguments[4][55][0].apply(r, arguments);
}, {
_process: 156,
dup: 55
} ],
116: [ function(e, t, r) {
arguments[4][56][0].apply(r, arguments);
}, {
"../../../errors": 107,
dup: 56
} ],
117: [ function(e, t, r) {
arguments[4][57][0].apply(r, arguments);
}, {
dup: 57
} ],
118: [ function(e, t, r) {
arguments[4][58][0].apply(r, arguments);
}, {
"../../../errors": 107,
"./end-of-stream": 116,
dup: 58
} ],
119: [ function(e, t, r) {
arguments[4][59][0].apply(r, arguments);
}, {
"../../../errors": 107,
dup: 59
} ],
120: [ function(e, t, r) {
arguments[4][60][0].apply(r, arguments);
}, {
dup: 60,
events: 104
} ],
121: [ function(e, t, r) {
arguments[4][61][0].apply(r, arguments);
}, {
"./lib/_stream_duplex.js": 108,
"./lib/_stream_passthrough.js": 109,
"./lib/_stream_readable.js": 110,
"./lib/_stream_transform.js": 111,
"./lib/_stream_writable.js": 112,
"./lib/internal/streams/end-of-stream.js": 116,
"./lib/internal/streams/pipeline.js": 118,
dup: 61
} ],
122: [ function(e, t, r) {
arguments[4][62][0].apply(r, arguments);
}, {
buffer: 65,
dup: 62
} ],
123: [ function(e, t, r) {
arguments[4][63][0].apply(r, arguments);
}, {
dup: 63,
"safe-buffer": 122
} ],
124: [ function(e, t, r) {
var i = r;
i.utils = e("./hash/utils");
i.common = e("./hash/common");
i.sha = e("./hash/sha");
i.ripemd = e("./hash/ripemd");
i.hmac = e("./hash/hmac");
i.sha1 = i.sha.sha1;
i.sha256 = i.sha.sha256;
i.sha224 = i.sha.sha224;
i.sha384 = i.sha.sha384;
i.sha512 = i.sha.sha512;
i.ripemd160 = i.ripemd.ripemd160;
}, {
"./hash/common": 125,
"./hash/hmac": 126,
"./hash/ripemd": 127,
"./hash/sha": 128,
"./hash/utils": 135
} ],
125: [ function(e, t, r) {
"use strict";
var i = e("./utils"), n = e("minimalistic-assert");
function s() {
this.pending = null;
this.pendingTotal = 0;
this.blockSize = this.constructor.blockSize;
this.outSize = this.constructor.outSize;
this.hmacStrength = this.constructor.hmacStrength;
this.padLength = this.constructor.padLength / 8;
this.endian = "big";
this._delta8 = this.blockSize / 8;
this._delta32 = this.blockSize / 32;
}
r.BlockHash = s;
s.prototype.update = function(e, t) {
e = i.toArray(e, t);
this.pending ? this.pending = this.pending.concat(e) : this.pending = e;
this.pendingTotal += e.length;
if (this.pending.length >= this._delta8) {
var r = (e = this.pending).length % this._delta8;
this.pending = e.slice(e.length - r, e.length);
0 === this.pending.length && (this.pending = null);
e = i.join32(e, 0, e.length - r, this.endian);
for (var n = 0; n < e.length; n += this._delta32) this._update(e, n, n + this._delta32);
}
return this;
};
s.prototype.digest = function(e) {
this.update(this._pad());
n(null === this.pending);
return this._digest(e);
};
s.prototype._pad = function() {
var e = this.pendingTotal, t = this._delta8, r = t - (e + this.padLength) % t, i = new Array(r + this.padLength);
i[0] = 128;
for (var n = 1; n < r; n++) i[n] = 0;
e <<= 3;
if ("big" === this.endian) {
for (var s = 8; s < this.padLength; s++) i[n++] = 0;
i[n++] = 0;
i[n++] = 0;
i[n++] = 0;
i[n++] = 0;
i[n++] = e >>> 24 & 255;
i[n++] = e >>> 16 & 255;
i[n++] = e >>> 8 & 255;
i[n++] = 255 & e;
} else {
i[n++] = 255 & e;
i[n++] = e >>> 8 & 255;
i[n++] = e >>> 16 & 255;
i[n++] = e >>> 24 & 255;
i[n++] = 0;
i[n++] = 0;
i[n++] = 0;
i[n++] = 0;
for (s = 8; s < this.padLength; s++) i[n++] = 0;
}
return i;
};
}, {
"./utils": 135,
"minimalistic-assert": 142
} ],
126: [ function(e, t) {
"use strict";
var r = e("./utils"), i = e("minimalistic-assert");
function n(e, t, i) {
if (!(this instanceof n)) return new n(e, t, i);
this.Hash = e;
this.blockSize = e.blockSize / 8;
this.outSize = e.outSize / 8;
this.inner = null;
this.outer = null;
this._init(r.toArray(t, i));
}
t.exports = n;
n.prototype._init = function(e) {
e.length > this.blockSize && (e = new this.Hash().update(e).digest());
i(e.length <= this.blockSize);
for (var t = e.length; t < this.blockSize; t++) e.push(0);
for (t = 0; t < e.length; t++) e[t] ^= 54;
this.inner = new this.Hash().update(e);
for (t = 0; t < e.length; t++) e[t] ^= 106;
this.outer = new this.Hash().update(e);
};
n.prototype.update = function(e, t) {
this.inner.update(e, t);
return this;
};
n.prototype.digest = function(e) {
this.outer.update(this.inner.digest());
return this.outer.digest(e);
};
}, {
"./utils": 135,
"minimalistic-assert": 142
} ],
127: [ function(e, t, r) {
"use strict";
var i = e("./utils"), n = e("./common"), s = i.rotl32, o = i.sum32, a = i.sum32_3, f = i.sum32_4, c = n.BlockHash;
function u() {
if (!(this instanceof u)) return new u();
c.call(this);
this.h = [ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ];
this.endian = "little";
}
i.inherits(u, c);
r.ripemd160 = u;
u.blockSize = 512;
u.outSize = 160;
u.hmacStrength = 192;
u.padLength = 64;
u.prototype._update = function(e, t) {
for (var r = this.h[0], i = this.h[1], n = this.h[2], c = this.h[3], u = this.h[4], y = r, v = i, w = n, _ = c, S = u, E = 0; E < 80; E++) {
var M = o(s(f(r, h(E, i, n, c), e[p[E] + t], d(E)), m[E]), u);
r = u;
u = c;
c = s(n, 10);
n = i;
i = M;
M = o(s(f(y, h(79 - E, v, w, _), e[b[E] + t], l(E)), g[E]), S);
y = S;
S = _;
_ = s(w, 10);
w = v;
v = M;
}
M = a(this.h[1], n, _);
this.h[1] = a(this.h[2], c, S);
this.h[2] = a(this.h[3], u, y);
this.h[3] = a(this.h[4], r, v);
this.h[4] = a(this.h[0], i, w);
this.h[0] = M;
};
u.prototype._digest = function(e) {
return "hex" === e ? i.toHex32(this.h, "little") : i.split32(this.h, "little");
};
function h(e, t, r, i) {
return e <= 15 ? t ^ r ^ i : e <= 31 ? t & r | ~t & i : e <= 47 ? (t | ~r) ^ i : e <= 63 ? t & i | r & ~i : t ^ (r | ~i);
}
function d(e) {
return e <= 15 ? 0 : e <= 31 ? 1518500249 : e <= 47 ? 1859775393 : e <= 63 ? 2400959708 : 2840853838;
}
function l(e) {
return e <= 15 ? 1352829926 : e <= 31 ? 1548603684 : e <= 47 ? 1836072691 : e <= 63 ? 2053994217 : 0;
}
var p = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ], b = [ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ], m = [ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ], g = [ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ];
}, {
"./common": 125,
"./utils": 135
} ],
128: [ function(e, t, r) {
"use strict";
r.sha1 = e("./sha/1");
r.sha224 = e("./sha/224");
r.sha256 = e("./sha/256");
r.sha384 = e("./sha/384");
r.sha512 = e("./sha/512");
}, {
"./sha/1": 129,
"./sha/224": 130,
"./sha/256": 131,
"./sha/384": 132,
"./sha/512": 133
} ],
129: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("../common"), n = e("./common"), s = r.rotl32, o = r.sum32, a = r.sum32_5, f = n.ft_1, c = i.BlockHash, u = [ 1518500249, 1859775393, 2400959708, 3395469782 ];
function h() {
if (!(this instanceof h)) return new h();
c.call(this);
this.h = [ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ];
this.W = new Array(80);
}
r.inherits(h, c);
t.exports = h;
h.blockSize = 512;
h.outSize = 160;
h.hmacStrength = 80;
h.padLength = 64;
h.prototype._update = function(e, t) {
for (var r = this.W, i = 0; i < 16; i++) r[i] = e[t + i];
for (;i < r.length; i++) r[i] = s(r[i - 3] ^ r[i - 8] ^ r[i - 14] ^ r[i - 16], 1);
var n = this.h[0], c = this.h[1], h = this.h[2], d = this.h[3], l = this.h[4];
for (i = 0; i < r.length; i++) {
var p = ~~(i / 20), b = a(s(n, 5), f(p, c, h, d), l, r[i], u[p]);
l = d;
d = h;
h = s(c, 30);
c = n;
n = b;
}
this.h[0] = o(this.h[0], n);
this.h[1] = o(this.h[1], c);
this.h[2] = o(this.h[2], h);
this.h[3] = o(this.h[3], d);
this.h[4] = o(this.h[4], l);
};
h.prototype._digest = function(e) {
return "hex" === e ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
};
}, {
"../common": 125,
"../utils": 135,
"./common": 134
} ],
130: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("./256");
function n() {
if (!(this instanceof n)) return new n();
i.call(this);
this.h = [ 3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428 ];
}
r.inherits(n, i);
t.exports = n;
n.blockSize = 512;
n.outSize = 224;
n.hmacStrength = 192;
n.padLength = 64;
n.prototype._digest = function(e) {
return "hex" === e ? r.toHex32(this.h.slice(0, 7), "big") : r.split32(this.h.slice(0, 7), "big");
};
}, {
"../utils": 135,
"./256": 131
} ],
131: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("../common"), n = e("./common"), s = e("minimalistic-assert"), o = r.sum32, a = r.sum32_4, f = r.sum32_5, c = n.ch32, u = n.maj32, h = n.s0_256, d = n.s1_256, l = n.g0_256, p = n.g1_256, b = i.BlockHash, m = [ 1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298 ];
function g() {
if (!(this instanceof g)) return new g();
b.call(this);
this.h = [ 1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225 ];
this.k = m;
this.W = new Array(64);
}
r.inherits(g, b);
t.exports = g;
g.blockSize = 512;
g.outSize = 256;
g.hmacStrength = 192;
g.padLength = 64;
g.prototype._update = function(e, t) {
for (var r = this.W, i = 0; i < 16; i++) r[i] = e[t + i];
for (;i < r.length; i++) r[i] = a(p(r[i - 2]), r[i - 7], l(r[i - 15]), r[i - 16]);
var n = this.h[0], b = this.h[1], m = this.h[2], g = this.h[3], y = this.h[4], v = this.h[5], w = this.h[6], _ = this.h[7];
s(this.k.length === r.length);
for (i = 0; i < r.length; i++) {
var S = f(_, d(y), c(y, v, w), this.k[i], r[i]), E = o(h(n), u(n, b, m));
_ = w;
w = v;
v = y;
y = o(g, S);
g = m;
m = b;
b = n;
n = o(S, E);
}
this.h[0] = o(this.h[0], n);
this.h[1] = o(this.h[1], b);
this.h[2] = o(this.h[2], m);
this.h[3] = o(this.h[3], g);
this.h[4] = o(this.h[4], y);
this.h[5] = o(this.h[5], v);
this.h[6] = o(this.h[6], w);
this.h[7] = o(this.h[7], _);
};
g.prototype._digest = function(e) {
return "hex" === e ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
};
}, {
"../common": 125,
"../utils": 135,
"./common": 134,
"minimalistic-assert": 142
} ],
132: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("./512");
function n() {
if (!(this instanceof n)) return new n();
i.call(this);
this.h = [ 3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428 ];
}
r.inherits(n, i);
t.exports = n;
n.blockSize = 1024;
n.outSize = 384;
n.hmacStrength = 192;
n.padLength = 128;
n.prototype._digest = function(e) {
return "hex" === e ? r.toHex32(this.h.slice(0, 12), "big") : r.split32(this.h.slice(0, 12), "big");
};
}, {
"../utils": 135,
"./512": 133
} ],
133: [ function(e, t) {
"use strict";
var r = e("../utils"), i = e("../common"), n = e("minimalistic-assert"), s = r.rotr64_hi, o = r.rotr64_lo, a = r.shr64_hi, f = r.shr64_lo, c = r.sum64, u = r.sum64_hi, h = r.sum64_lo, d = r.sum64_4_hi, l = r.sum64_4_lo, p = r.sum64_5_hi, b = r.sum64_5_lo, m = i.BlockHash, g = [ 1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591 ];
function y() {
if (!(this instanceof y)) return new y();
m.call(this);
this.h = [ 1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209 ];
this.k = g;
this.W = new Array(160);
}
r.inherits(y, m);
t.exports = y;
y.blockSize = 1024;
y.outSize = 512;
y.hmacStrength = 192;
y.padLength = 128;
y.prototype._prepareBlock = function(e, t) {
for (var r = this.W, i = 0; i < 32; i++) r[i] = e[t + i];
for (;i < r.length; i += 2) {
var n = I(r[i - 4], r[i - 3]), s = T(r[i - 4], r[i - 3]), o = r[i - 14], a = r[i - 13], f = R(r[i - 30], r[i - 29]), c = x(r[i - 30], r[i - 29]), u = r[i - 32], h = r[i - 31];
r[i] = d(n, s, o, a, f, c, u, h);
r[i + 1] = l(n, s, o, a, f, c, u, h);
}
};
y.prototype._update = function(e, t) {
this._prepareBlock(e, t);
var r = this.W, i = this.h[0], s = this.h[1], o = this.h[2], a = this.h[3], f = this.h[4], d = this.h[5], l = this.h[6], m = this.h[7], g = this.h[8], y = this.h[9], R = this.h[10], x = this.h[11], I = this.h[12], T = this.h[13], B = this.h[14], j = this.h[15];
n(this.k.length === r.length);
for (var N = 0; N < r.length; N += 2) {
var P = B, C = j, L = A(g, y), O = k(g, y), D = v(g, 0, R, 0, I), U = w(0, y, 0, x, 0, T), q = this.k[N], F = this.k[N + 1], z = r[N], $ = r[N + 1], K = p(P, C, L, O, D, U, q, F, z, $), H = b(P, C, L, O, D, U, q, F, z, $);
P = E(i, s);
C = M(i, s);
L = _(i, 0, o, 0, f);
O = S(0, s, 0, a, 0, d);
var W = u(P, C, L, O), V = h(P, C, L, O);
B = I;
j = T;
I = R;
T = x;
R = g;
x = y;
g = u(l, m, K, H);
y = h(m, m, K, H);
l = f;
m = d;
f = o;
d = a;
o = i;
a = s;
i = u(K, H, W, V);
s = h(K, H, W, V);
}
c(this.h, 0, i, s);
c(this.h, 2, o, a);
c(this.h, 4, f, d);
c(this.h, 6, l, m);
c(this.h, 8, g, y);
c(this.h, 10, R, x);
c(this.h, 12, I, T);
c(this.h, 14, B, j);
};
y.prototype._digest = function(e) {
return "hex" === e ? r.toHex32(this.h, "big") : r.split32(this.h, "big");
};
function v(e, t, r, i, n) {
var s = e & r ^ ~e & n;
s < 0 && (s += 4294967296);
return s;
}
function w(e, t, r, i, n, s) {
var o = t & i ^ ~t & s;
o < 0 && (o += 4294967296);
return o;
}
function _(e, t, r, i, n) {
var s = e & r ^ e & n ^ r & n;
s < 0 && (s += 4294967296);
return s;
}
function S(e, t, r, i, n, s) {
var o = t & i ^ t & s ^ i & s;
o < 0 && (o += 4294967296);
return o;
}
function E(e, t) {
var r = s(e, t, 28) ^ s(t, e, 2) ^ s(t, e, 7);
r < 0 && (r += 4294967296);
return r;
}
function M(e, t) {
var r = o(e, t, 28) ^ o(t, e, 2) ^ o(t, e, 7);
r < 0 && (r += 4294967296);
return r;
}
function A(e, t) {
var r = s(e, t, 14) ^ s(e, t, 18) ^ s(t, e, 9);
r < 0 && (r += 4294967296);
return r;
}
function k(e, t) {
var r = o(e, t, 14) ^ o(e, t, 18) ^ o(t, e, 9);
r < 0 && (r += 4294967296);
return r;
}
function R(e, t) {
var r = s(e, t, 1) ^ s(e, t, 8) ^ a(e, t, 7);
r < 0 && (r += 4294967296);
return r;
}
function x(e, t) {
var r = o(e, t, 1) ^ o(e, t, 8) ^ f(e, t, 7);
r < 0 && (r += 4294967296);
return r;
}
function I(e, t) {
var r = s(e, t, 19) ^ s(t, e, 29) ^ a(e, t, 6);
r < 0 && (r += 4294967296);
return r;
}
function T(e, t) {
var r = o(e, t, 19) ^ o(t, e, 29) ^ f(e, t, 6);
r < 0 && (r += 4294967296);
return r;
}
}, {
"../common": 125,
"../utils": 135,
"minimalistic-assert": 142
} ],
134: [ function(e, t, r) {
"use strict";
var i = e("../utils").rotr32;
r.ft_1 = function(e, t, r, i) {
return 0 === e ? n(t, r, i) : 1 === e || 3 === e ? o(t, r, i) : 2 === e ? s(t, r, i) : void 0;
};
function n(e, t, r) {
return e & t ^ ~e & r;
}
r.ch32 = n;
function s(e, t, r) {
return e & t ^ e & r ^ t & r;
}
r.maj32 = s;
function o(e, t, r) {
return e ^ t ^ r;
}
r.p32 = o;
r.s0_256 = function(e) {
return i(e, 2) ^ i(e, 13) ^ i(e, 22);
};
r.s1_256 = function(e) {
return i(e, 6) ^ i(e, 11) ^ i(e, 25);
};
r.g0_256 = function(e) {
return i(e, 7) ^ i(e, 18) ^ e >>> 3;
};
r.g1_256 = function(e) {
return i(e, 17) ^ i(e, 19) ^ e >>> 10;
};
}, {
"../utils": 135
} ],
135: [ function(e, t, r) {
"use strict";
var i = e("minimalistic-assert"), n = e("inherits");
r.inherits = n;
function s(e, t) {
return 55296 == (64512 & e.charCodeAt(t)) && !(t < 0 || t + 1 >= e.length) && 56320 == (64512 & e.charCodeAt(t + 1));
}
r.toArray = function(e, t) {
if (Array.isArray(e)) return e.slice();
if (!e) return [];
var r = [];
if ("string" == typeof e) if (t) {
if ("hex" === t) {
(e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = "0" + e);
for (n = 0; n < e.length; n += 2) r.push(parseInt(e[n] + e[n + 1], 16));
}
} else for (var i = 0, n = 0; n < e.length; n++) {
var o = e.charCodeAt(n);
if (o < 128) r[i++] = o; else if (o < 2048) {
r[i++] = o >> 6 | 192;
r[i++] = 63 & o | 128;
} else if (s(e, n)) {
o = 65536 + ((1023 & o) << 10) + (1023 & e.charCodeAt(++n));
r[i++] = o >> 18 | 240;
r[i++] = o >> 12 & 63 | 128;
r[i++] = o >> 6 & 63 | 128;
r[i++] = 63 & o | 128;
} else {
r[i++] = o >> 12 | 224;
r[i++] = o >> 6 & 63 | 128;
r[i++] = 63 & o | 128;
}
} else for (n = 0; n < e.length; n++) r[n] = 0 | e[n];
return r;
};
r.toHex = function(e) {
for (var t = "", r = 0; r < e.length; r++) t += a(e[r].toString(16));
return t;
};
function o(e) {
return (e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (255 & e) << 24) >>> 0;
}
r.htonl = o;
r.toHex32 = function(e, t) {
for (var r = "", i = 0; i < e.length; i++) {
var n = e[i];
"little" === t && (n = o(n));
r += f(n.toString(16));
}
return r;
};
function a(e) {
return 1 === e.length ? "0" + e : e;
}
r.zero2 = a;
function f(e) {
return 7 === e.length ? "0" + e : 6 === e.length ? "00" + e : 5 === e.length ? "000" + e : 4 === e.length ? "0000" + e : 3 === e.length ? "00000" + e : 2 === e.length ? "000000" + e : 1 === e.length ? "0000000" + e : e;
}
r.zero8 = f;
r.join32 = function(e, t, r, n) {
var s = r - t;
i(s % 4 == 0);
for (var o = new Array(s / 4), a = 0, f = t; a < o.length; a++, f += 4) {
var c;
c = "big" === n ? e[f] << 24 | e[f + 1] << 16 | e[f + 2] << 8 | e[f + 3] : e[f + 3] << 24 | e[f + 2] << 16 | e[f + 1] << 8 | e[f];
o[a] = c >>> 0;
}
return o;
};
r.split32 = function(e, t) {
for (var r = new Array(4 * e.length), i = 0, n = 0; i < e.length; i++, n += 4) {
var s = e[i];
if ("big" === t) {
r[n] = s >>> 24;
r[n + 1] = s >>> 16 & 255;
r[n + 2] = s >>> 8 & 255;
r[n + 3] = 255 & s;
} else {
r[n + 3] = s >>> 24;
r[n + 2] = s >>> 16 & 255;
r[n + 1] = s >>> 8 & 255;
r[n] = 255 & s;
}
}
return r;
};
r.rotr32 = function(e, t) {
return e >>> t | e << 32 - t;
};
r.rotl32 = function(e, t) {
return e << t | e >>> 32 - t;
};
r.sum32 = function(e, t) {
return e + t >>> 0;
};
r.sum32_3 = function(e, t, r) {
return e + t + r >>> 0;
};
r.sum32_4 = function(e, t, r, i) {
return e + t + r + i >>> 0;
};
r.sum32_5 = function(e, t, r, i, n) {
return e + t + r + i + n >>> 0;
};
r.sum64 = function(e, t, r, i) {
var n = e[t], s = i + e[t + 1] >>> 0, o = (s < i ? 1 : 0) + r + n;
e[t] = o >>> 0;
e[t + 1] = s;
};
r.sum64_hi = function(e, t, r, i) {
return (t + i >>> 0 < t ? 1 : 0) + e + r >>> 0;
};
r.sum64_lo = function(e, t, r, i) {
return t + i >>> 0;
};
r.sum64_4_hi = function(e, t, r, i, n, s, o, a) {
var f = 0, c = t;
f += (c = c + i >>> 0) < t ? 1 : 0;
f += (c = c + s >>> 0) < s ? 1 : 0;
return e + r + n + o + (f += (c = c + a >>> 0) < a ? 1 : 0) >>> 0;
};
r.sum64_4_lo = function(e, t, r, i, n, s, o, a) {
return t + i + s + a >>> 0;
};
r.sum64_5_hi = function(e, t, r, i, n, s, o, a, f, c) {
var u = 0, h = t;
u += (h = h + i >>> 0) < t ? 1 : 0;
u += (h = h + s >>> 0) < s ? 1 : 0;
u += (h = h + a >>> 0) < a ? 1 : 0;
return e + r + n + o + f + (u += (h = h + c >>> 0) < c ? 1 : 0) >>> 0;
};
r.sum64_5_lo = function(e, t, r, i, n, s, o, a, f, c) {
return t + i + s + a + c >>> 0;
};
r.rotr64_hi = function(e, t, r) {
return (t << 32 - r | e >>> r) >>> 0;
};
r.rotr64_lo = function(e, t, r) {
return (e << 32 - r | t >>> r) >>> 0;
};
r.shr64_hi = function(e, t, r) {
return e >>> r;
};
r.shr64_lo = function(e, t, r) {
return (e << 32 - r | t >>> r) >>> 0;
};
}, {
inherits: 138,
"minimalistic-assert": 142
} ],
136: [ function(e, t) {
"use strict";
var r = e("hash.js"), i = e("minimalistic-crypto-utils"), n = e("minimalistic-assert");
function s(e) {
if (!(this instanceof s)) return new s(e);
this.hash = e.hash;
this.predResist = !!e.predResist;
this.outLen = this.hash.outSize;
this.minEntropy = e.minEntropy || this.hash.hmacStrength;
this._reseed = null;
this.reseedInterval = null;
this.K = null;
this.V = null;
var t = i.toArray(e.entropy, e.entropyEnc || "hex"), r = i.toArray(e.nonce, e.nonceEnc || "hex"), o = i.toArray(e.pers, e.persEnc || "hex");
n(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
this._init(t, r, o);
}
t.exports = s;
s.prototype._init = function(e, t, r) {
var i = e.concat(t).concat(r);
this.K = new Array(this.outLen / 8);
this.V = new Array(this.outLen / 8);
for (var n = 0; n < this.V.length; n++) {
this.K[n] = 0;
this.V[n] = 1;
}
this._update(i);
this._reseed = 1;
this.reseedInterval = 281474976710656;
};
s.prototype._hmac = function() {
return new r.hmac(this.hash, this.K);
};
s.prototype._update = function(e) {
var t = this._hmac().update(this.V).update([ 0 ]);
e && (t = t.update(e));
this.K = t.digest();
this.V = this._hmac().update(this.V).digest();
if (e) {
this.K = this._hmac().update(this.V).update([ 1 ]).update(e).digest();
this.V = this._hmac().update(this.V).digest();
}
};
s.prototype.reseed = function(e, t, r, s) {
if ("string" != typeof t) {
s = r;
r = t;
t = null;
}
e = i.toArray(e, t);
r = i.toArray(r, s);
n(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
this._update(e.concat(r || []));
this._reseed = 1;
};
s.prototype.generate = function(e, t, r, n) {
if (this._reseed > this.reseedInterval) throw new Error("Reseed is required");
if ("string" != typeof t) {
n = r;
r = t;
t = null;
}
if (r) {
r = i.toArray(r, n || "hex");
this._update(r);
}
for (var s = []; s.length < e; ) {
this.V = this._hmac().update(this.V).digest();
s = s.concat(this.V);
}
var o = s.slice(0, e);
this._update(r);
this._reseed++;
return i.encode(o, t);
};
}, {
"hash.js": 124,
"minimalistic-assert": 142,
"minimalistic-crypto-utils": 143
} ],
137: [ function(e, t, r) {
r.read = function(e, t, r, i, n) {
var s, o, a = 8 * n - i - 1, f = (1 << a) - 1, c = f >> 1, u = -7, h = r ? n - 1 : 0, d = r ? -1 : 1, l = e[t + h];
h += d;
s = l & (1 << -u) - 1;
l >>= -u;
u += a;
for (;u > 0; s = 256 * s + e[t + h], h += d, u -= 8) ;
o = s & (1 << -u) - 1;
s >>= -u;
u += i;
for (;u > 0; o = 256 * o + e[t + h], h += d, u -= 8) ;
if (0 === s) s = 1 - c; else {
if (s === f) return o ? NaN : Infinity * (l ? -1 : 1);
o += Math.pow(2, i);
s -= c;
}
return (l ? -1 : 1) * o * Math.pow(2, s - i);
};
r.write = function(e, t, r, i, n, s) {
var o, a, f, c = 8 * s - n - 1, u = (1 << c) - 1, h = u >> 1, d = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = i ? 0 : s - 1, p = i ? 1 : -1, b = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
t = Math.abs(t);
if (isNaN(t) || Infinity === t) {
a = isNaN(t) ? 1 : 0;
o = u;
} else {
o = Math.floor(Math.log(t) / Math.LN2);
if (t * (f = Math.pow(2, -o)) < 1) {
o--;
f *= 2;
}
if ((t += o + h >= 1 ? d / f : d * Math.pow(2, 1 - h)) * f >= 2) {
o++;
f /= 2;
}
if (o + h >= u) {
a = 0;
o = u;
} else if (o + h >= 1) {
a = (t * f - 1) * Math.pow(2, n);
o += h;
} else {
a = t * Math.pow(2, h - 1) * Math.pow(2, n);
o = 0;
}
}
for (;n >= 8; e[r + l] = 255 & a, l += p, a /= 256, n -= 8) ;
o = o << n | a;
c += n;
for (;c > 0; e[r + l] = 255 & o, l += p, o /= 256, c -= 8) ;
e[r + l - p] |= 128 * b;
};
}, {} ],
138: [ function(e, t) {
"function" == typeof Object.create ? t.exports = function(e, t) {
if (t) {
e.super_ = t;
e.prototype = Object.create(t.prototype, {
constructor: {
value: e,
enumerable: !1,
writable: !0,
configurable: !0
}
});
}
} : t.exports = function(e, t) {
if (t) {
e.super_ = t;
var r = function() {};
r.prototype = t.prototype;
e.prototype = new r();
e.prototype.constructor = e;
}
};
}, {} ],
139: [ function(e, t) {
"use strict";
var r = e("inherits"), i = e("hash-base"), n = e("safe-buffer").Buffer, s = new Array(16);
function o() {
i.call(this, 64);
this._a = 1732584193;
this._b = 4023233417;
this._c = 2562383102;
this._d = 271733878;
}
r(o, i);
o.prototype._update = function() {
for (var e = s, t = 0; t < 16; ++t) e[t] = this._block.readInt32LE(4 * t);
var r = this._a, i = this._b, n = this._c, o = this._d;
r = f(r, i, n, o, e[0], 3614090360, 7);
o = f(o, r, i, n, e[1], 3905402710, 12);
n = f(n, o, r, i, e[2], 606105819, 17);
i = f(i, n, o, r, e[3], 3250441966, 22);
r = f(r, i, n, o, e[4], 4118548399, 7);
o = f(o, r, i, n, e[5], 1200080426, 12);
n = f(n, o, r, i, e[6], 2821735955, 17);
i = f(i, n, o, r, e[7], 4249261313, 22);
r = f(r, i, n, o, e[8], 1770035416, 7);
o = f(o, r, i, n, e[9], 2336552879, 12);
n = f(n, o, r, i, e[10], 4294925233, 17);
i = f(i, n, o, r, e[11], 2304563134, 22);
r = f(r, i, n, o, e[12], 1804603682, 7);
o = f(o, r, i, n, e[13], 4254626195, 12);
n = f(n, o, r, i, e[14], 2792965006, 17);
r = c(r, i = f(i, n, o, r, e[15], 1236535329, 22), n, o, e[1], 4129170786, 5);
o = c(o, r, i, n, e[6], 3225465664, 9);
n = c(n, o, r, i, e[11], 643717713, 14);
i = c(i, n, o, r, e[0], 3921069994, 20);
r = c(r, i, n, o, e[5], 3593408605, 5);
o = c(o, r, i, n, e[10], 38016083, 9);
n = c(n, o, r, i, e[15], 3634488961, 14);
i = c(i, n, o, r, e[4], 3889429448, 20);
r = c(r, i, n, o, e[9], 568446438, 5);
o = c(o, r, i, n, e[14], 3275163606, 9);
n = c(n, o, r, i, e[3], 4107603335, 14);
i = c(i, n, o, r, e[8], 1163531501, 20);
r = c(r, i, n, o, e[13], 2850285829, 5);
o = c(o, r, i, n, e[2], 4243563512, 9);
n = c(n, o, r, i, e[7], 1735328473, 14);
r = u(r, i = c(i, n, o, r, e[12], 2368359562, 20), n, o, e[5], 4294588738, 4);
o = u(o, r, i, n, e[8], 2272392833, 11);
n = u(n, o, r, i, e[11], 1839030562, 16);
i = u(i, n, o, r, e[14], 4259657740, 23);
r = u(r, i, n, o, e[1], 2763975236, 4);
o = u(o, r, i, n, e[4], 1272893353, 11);
n = u(n, o, r, i, e[7], 4139469664, 16);
i = u(i, n, o, r, e[10], 3200236656, 23);
r = u(r, i, n, o, e[13], 681279174, 4);
o = u(o, r, i, n, e[0], 3936430074, 11);
n = u(n, o, r, i, e[3], 3572445317, 16);
i = u(i, n, o, r, e[6], 76029189, 23);
r = u(r, i, n, o, e[9], 3654602809, 4);
o = u(o, r, i, n, e[12], 3873151461, 11);
n = u(n, o, r, i, e[15], 530742520, 16);
r = h(r, i = u(i, n, o, r, e[2], 3299628645, 23), n, o, e[0], 4096336452, 6);
o = h(o, r, i, n, e[7], 1126891415, 10);
n = h(n, o, r, i, e[14], 2878612391, 15);
i = h(i, n, o, r, e[5], 4237533241, 21);
r = h(r, i, n, o, e[12], 1700485571, 6);
o = h(o, r, i, n, e[3], 2399980690, 10);
n = h(n, o, r, i, e[10], 4293915773, 15);
i = h(i, n, o, r, e[1], 2240044497, 21);
r = h(r, i, n, o, e[8], 1873313359, 6);
o = h(o, r, i, n, e[15], 4264355552, 10);
n = h(n, o, r, i, e[6], 2734768916, 15);
i = h(i, n, o, r, e[13], 1309151649, 21);
r = h(r, i, n, o, e[4], 4149444226, 6);
o = h(o, r, i, n, e[11], 3174756917, 10);
n = h(n, o, r, i, e[2], 718787259, 15);
i = h(i, n, o, r, e[9], 3951481745, 21);
this._a = this._a + r | 0;
this._b = this._b + i | 0;
this._c = this._c + n | 0;
this._d = this._d + o | 0;
};
o.prototype._digest = function() {
this._block[this._blockOffset++] = 128;
if (this._blockOffset > 56) {
this._block.fill(0, this._blockOffset, 64);
this._update();
this._blockOffset = 0;
}
this._block.fill(0, this._blockOffset, 56);
this._block.writeUInt32LE(this._length[0], 56);
this._block.writeUInt32LE(this._length[1], 60);
this._update();
var e = n.allocUnsafe(16);
e.writeInt32LE(this._a, 0);
e.writeInt32LE(this._b, 4);
e.writeInt32LE(this._c, 8);
e.writeInt32LE(this._d, 12);
return e;
};
function a(e, t) {
return e << t | e >>> 32 - t;
}
function f(e, t, r, i, n, s, o) {
return a(e + (t & r | ~t & i) + n + s | 0, o) + t | 0;
}
function c(e, t, r, i, n, s, o) {
return a(e + (t & i | r & ~i) + n + s | 0, o) + t | 0;
}
function u(e, t, r, i, n, s, o) {
return a(e + (t ^ r ^ i) + n + s | 0, o) + t | 0;
}
function h(e, t, r, i, n, s, o) {
return a(e + (r ^ (t | ~i)) + n + s | 0, o) + t | 0;
}
t.exports = o;
}, {
"hash-base": 106,
inherits: 138,
"safe-buffer": 182
} ],
140: [ function(e, t) {
var r = e("bn.js"), i = e("brorand");
function n(e) {
this.rand = e || new i.Rand();
}
t.exports = n;
n.create = function(e) {
return new n(e);
};
n.prototype._randbelow = function(e) {
var t = e.bitLength(), i = Math.ceil(t / 8);
do {
var n = new r(this.rand.generate(i));
} while (n.cmp(e) >= 0);
return n;
};
n.prototype._randrange = function(e, t) {
var r = t.sub(e);
return e.add(this._randbelow(r));
};
n.prototype.test = function(e, t, i) {
var n = e.bitLength(), s = r.mont(e), o = new r(1).toRed(s);
t || (t = Math.max(1, n / 48 | 0));
for (var a = e.subn(1), f = 0; !a.testn(f); f++) ;
for (var c = e.shrn(f), u = a.toRed(s); t > 0; t--) {
var h = this._randrange(new r(2), a);
i && i(h);
var d = h.toRed(s).redPow(c);
if (0 !== d.cmp(o) && 0 !== d.cmp(u)) {
for (var l = 1; l < f; l++) {
if (0 === (d = d.redSqr()).cmp(o)) return !1;
if (0 === d.cmp(u)) break;
}
if (l === f) return !1;
}
}
return !0;
};
n.prototype.getDivisor = function(e, t) {
var i = e.bitLength(), n = r.mont(e), s = new r(1).toRed(n);
t || (t = Math.max(1, i / 48 | 0));
for (var o = e.subn(1), a = 0; !o.testn(a); a++) ;
for (var f = e.shrn(a), c = o.toRed(n); t > 0; t--) {
var u = this._randrange(new r(2), o), h = e.gcd(u);
if (0 !== h.cmpn(1)) return h;
var d = u.toRed(n).redPow(f);
if (0 !== d.cmp(s) && 0 !== d.cmp(c)) {
for (var l = 1; l < a; l++) {
if (0 === (d = d.redSqr()).cmp(s)) return d.fromRed().subn(1).gcd(e);
if (0 === d.cmp(c)) break;
}
if (l === a) return (d = d.redSqr()).fromRed().subn(1).gcd(e);
}
}
return !1;
};
}, {
"bn.js": 141,
brorand: 18
} ],
141: [ function(e, t, r) {
arguments[4][15][0].apply(r, arguments);
}, {
buffer: 19,
dup: 15
} ],
142: [ function(e, t) {
t.exports = r;
function r(e, t) {
if (!e) throw new Error(t || "Assertion failed");
}
r.equal = function(e, t, r) {
if (e != t) throw new Error(r || "Assertion failed: " + e + " != " + t);
};
}, {} ],
143: [ function(e, t, r) {
"use strict";
var i = r;
i.toArray = function(e, t) {
if (Array.isArray(e)) return e.slice();
if (!e) return [];
var r = [];
if ("string" != typeof e) {
for (var i = 0; i < e.length; i++) r[i] = 0 | e[i];
return r;
}
if ("hex" === t) {
(e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = "0" + e);
for (i = 0; i < e.length; i += 2) r.push(parseInt(e[i] + e[i + 1], 16));
} else for (i = 0; i < e.length; i++) {
var n = e.charCodeAt(i), s = n >> 8, o = 255 & n;
s ? r.push(s, o) : r.push(o);
}
return r;
};
function n(e) {
return 1 === e.length ? "0" + e : e;
}
i.zero2 = n;
function s(e) {
for (var t = "", r = 0; r < e.length; r++) t += n(e[r].toString(16));
return t;
}
i.toHex = s;
i.encode = function(e, t) {
return "hex" === t ? s(e) : e;
};
}, {} ],
144: [ function(e, t) {
t.exports = {
"2.16.840.1.101.3.4.1.1": "aes-128-ecb",
"2.16.840.1.101.3.4.1.2": "aes-128-cbc",
"2.16.840.1.101.3.4.1.3": "aes-128-ofb",
"2.16.840.1.101.3.4.1.4": "aes-128-cfb",
"2.16.840.1.101.3.4.1.21": "aes-192-ecb",
"2.16.840.1.101.3.4.1.22": "aes-192-cbc",
"2.16.840.1.101.3.4.1.23": "aes-192-ofb",
"2.16.840.1.101.3.4.1.24": "aes-192-cfb",
"2.16.840.1.101.3.4.1.41": "aes-256-ecb",
"2.16.840.1.101.3.4.1.42": "aes-256-cbc",
"2.16.840.1.101.3.4.1.43": "aes-256-ofb",
"2.16.840.1.101.3.4.1.44": "aes-256-cfb"
};
}, {} ],
145: [ function(e, t, r) {
"use strict";
var i = e("asn1.js");
r.certificate = e("./certificate");
var n = i.define("RSAPrivateKey", function() {
this.seq().obj(this.key("version").int(), this.key("modulus").int(), this.key("publicExponent").int(), this.key("privateExponent").int(), this.key("prime1").int(), this.key("prime2").int(), this.key("exponent1").int(), this.key("exponent2").int(), this.key("coefficient").int());
});
r.RSAPrivateKey = n;
var s = i.define("RSAPublicKey", function() {
this.seq().obj(this.key("modulus").int(), this.key("publicExponent").int());
});
r.RSAPublicKey = s;
var o = i.define("SubjectPublicKeyInfo", function() {
this.seq().obj(this.key("algorithm").use(a), this.key("subjectPublicKey").bitstr());
});
r.PublicKey = o;
var a = i.define("AlgorithmIdentifier", function() {
this.seq().obj(this.key("algorithm").objid(), this.key("none").null_().optional(), this.key("curve").objid().optional(), this.key("params").seq().obj(this.key("p").int(), this.key("q").int(), this.key("g").int()).optional());
}), f = i.define("PrivateKeyInfo", function() {
this.seq().obj(this.key("version").int(), this.key("algorithm").use(a), this.key("subjectPrivateKey").octstr());
});
r.PrivateKey = f;
var c = i.define("EncryptedPrivateKeyInfo", function() {
this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(), this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(), this.key("kdeparams").seq().obj(this.key("salt").octstr(), this.key("iters").int())), this.key("cipher").seq().obj(this.key("algo").objid(), this.key("iv").octstr()))), this.key("subjectPrivateKey").octstr());
});
r.EncryptedPrivateKey = c;
var u = i.define("DSAPrivateKey", function() {
this.seq().obj(this.key("version").int(), this.key("p").int(), this.key("q").int(), this.key("g").int(), this.key("pub_key").int(), this.key("priv_key").int());
});
r.DSAPrivateKey = u;
r.DSAparam = i.define("DSAparam", function() {
this.int();
});
var h = i.define("ECPrivateKey", function() {
this.seq().obj(this.key("version").int(), this.key("privateKey").octstr(), this.key("parameters").optional().explicit(0).use(d), this.key("publicKey").optional().explicit(1).bitstr());
});
r.ECPrivateKey = h;
var d = i.define("ECParameters", function() {
this.choice({
namedCurve: this.objid()
});
});
r.signature = i.define("signature", function() {
this.seq().obj(this.key("r").int(), this.key("s").int());
});
}, {
"./certificate": 146,
"asn1.js": 1
} ],
146: [ function(e, t) {
"use strict";
var r = e("asn1.js"), i = r.define("Time", function() {
this.choice({
utcTime: this.utctime(),
generalTime: this.gentime()
});
}), n = r.define("AttributeTypeValue", function() {
this.seq().obj(this.key("type").objid(), this.key("value").any());
}), s = r.define("AlgorithmIdentifier", function() {
this.seq().obj(this.key("algorithm").objid(), this.key("parameters").optional(), this.key("curve").objid().optional());
}), o = r.define("SubjectPublicKeyInfo", function() {
this.seq().obj(this.key("algorithm").use(s), this.key("subjectPublicKey").bitstr());
}), a = r.define("RelativeDistinguishedName", function() {
this.setof(n);
}), f = r.define("RDNSequence", function() {
this.seqof(a);
}), c = r.define("Name", function() {
this.choice({
rdnSequence: this.use(f)
});
}), u = r.define("Validity", function() {
this.seq().obj(this.key("notBefore").use(i), this.key("notAfter").use(i));
}), h = r.define("Extension", function() {
this.seq().obj(this.key("extnID").objid(), this.key("critical").bool().def(!1), this.key("extnValue").octstr());
}), d = r.define("TBSCertificate", function() {
this.seq().obj(this.key("version").explicit(0).int().optional(), this.key("serialNumber").int(), this.key("signature").use(s), this.key("issuer").use(c), this.key("validity").use(u), this.key("subject").use(c), this.key("subjectPublicKeyInfo").use(o), this.key("issuerUniqueID").implicit(1).bitstr().optional(), this.key("subjectUniqueID").implicit(2).bitstr().optional(), this.key("extensions").explicit(3).seqof(h).optional());
}), l = r.define("X509Certificate", function() {
this.seq().obj(this.key("tbsCertificate").use(d), this.key("signatureAlgorithm").use(s), this.key("signatureValue").bitstr());
});
t.exports = l;
}, {
"asn1.js": 1
} ],
147: [ function(e, t) {
var r = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r+/=]+)[\n\r]+/m, i = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m, n = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r+/=]+)-----END \1-----$/m, s = e("evp_bytestokey"), o = e("browserify-aes"), a = e("safe-buffer").Buffer;
t.exports = function(e, t) {
var f, c = e.toString(), u = c.match(r);
if (u) {
var h = "aes" + u[1], d = a.from(u[2], "hex"), l = a.from(u[3].replace(/[\r\n]/g, ""), "base64"), p = s(t, d.slice(0, 8), parseInt(u[1], 10)).key, b = [], m = o.createDecipheriv(h, p, d);
b.push(m.update(l));
b.push(m.final());
f = a.concat(b);
} else {
var g = c.match(n);
f = a.from(g[2].replace(/[\r\n]/g, ""), "base64");
}
return {
tag: c.match(i)[1],
data: f
};
};
}, {
"browserify-aes": 22,
evp_bytestokey: 105,
"safe-buffer": 182
} ],
148: [ function(e, t) {
var r = e("./asn1"), i = e("./aesid.json"), n = e("./fixProc"), s = e("browserify-aes"), o = e("pbkdf2"), a = e("safe-buffer").Buffer;
t.exports = f;
function f(e) {
var t;
if ("object" == typeof e && !a.isBuffer(e)) {
t = e.passphrase;
e = e.key;
}
"string" == typeof e && (e = a.from(e));
var i, s, o = n(e, t), f = o.tag, u = o.data;
switch (f) {
case "CERTIFICATE":
s = r.certificate.decode(u, "der").tbsCertificate.subjectPublicKeyInfo;

case "PUBLIC KEY":
s || (s = r.PublicKey.decode(u, "der"));
switch (i = s.algorithm.algorithm.join(".")) {
case "1.2.840.113549.1.1.1":
return r.RSAPublicKey.decode(s.subjectPublicKey.data, "der");

case "1.2.840.10045.2.1":
s.subjectPrivateKey = s.subjectPublicKey;
return {
type: "ec",
data: s
};

case "1.2.840.10040.4.1":
s.algorithm.params.pub_key = r.DSAparam.decode(s.subjectPublicKey.data, "der");
return {
type: "dsa",
data: s.algorithm.params
};

default:
throw new Error("unknown key id " + i);
}

case "ENCRYPTED PRIVATE KEY":
u = c(u = r.EncryptedPrivateKey.decode(u, "der"), t);

case "PRIVATE KEY":
switch (i = (s = r.PrivateKey.decode(u, "der")).algorithm.algorithm.join(".")) {
case "1.2.840.113549.1.1.1":
return r.RSAPrivateKey.decode(s.subjectPrivateKey, "der");

case "1.2.840.10045.2.1":
return {
curve: s.algorithm.curve,
privateKey: r.ECPrivateKey.decode(s.subjectPrivateKey, "der").privateKey
};

case "1.2.840.10040.4.1":
s.algorithm.params.priv_key = r.DSAparam.decode(s.subjectPrivateKey, "der");
return {
type: "dsa",
params: s.algorithm.params
};

default:
throw new Error("unknown key id " + i);
}

case "RSA PUBLIC KEY":
return r.RSAPublicKey.decode(u, "der");

case "RSA PRIVATE KEY":
return r.RSAPrivateKey.decode(u, "der");

case "DSA PRIVATE KEY":
return {
type: "dsa",
params: r.DSAPrivateKey.decode(u, "der")
};

case "EC PRIVATE KEY":
return {
curve: (u = r.ECPrivateKey.decode(u, "der")).parameters.value,
privateKey: u.privateKey
};

default:
throw new Error("unknown key type " + f);
}
}
f.signature = r.signature;
function c(e, t) {
var r = e.algorithm.decrypt.kde.kdeparams.salt, n = parseInt(e.algorithm.decrypt.kde.kdeparams.iters.toString(), 10), f = i[e.algorithm.decrypt.cipher.algo.join(".")], c = e.algorithm.decrypt.cipher.iv, u = e.subjectPrivateKey, h = parseInt(f.split("-")[1], 10) / 8, d = o.pbkdf2Sync(t, r, n, h, "sha1"), l = s.createDecipheriv(f, d, c), p = [];
p.push(l.update(u));
p.push(l.final());
return a.concat(p);
}
}, {
"./aesid.json": 144,
"./asn1": 145,
"./fixProc": 147,
"browserify-aes": 22,
pbkdf2: 149,
"safe-buffer": 182
} ],
149: [ function(e, t, r) {
r.pbkdf2 = e("./lib/async");
r.pbkdf2Sync = e("./lib/sync");
}, {
"./lib/async": 150,
"./lib/sync": 153
} ],
150: [ function(e, t) {
(function(r) {
var i, n, s = e("safe-buffer").Buffer, o = e("./precondition"), a = e("./default-encoding"), f = e("./sync"), c = e("./to-buffer"), u = r.crypto && r.crypto.subtle, h = {
sha: "SHA-1",
"sha-1": "SHA-1",
sha1: "SHA-1",
sha256: "SHA-256",
"sha-256": "SHA-256",
sha384: "SHA-384",
"sha-384": "SHA-384",
"sha-512": "SHA-512",
sha512: "SHA-512"
}, d = [];
function l(e) {
if (r.process && !r.process.browser) return Promise.resolve(!1);
if (!u || !u.importKey || !u.deriveBits) return Promise.resolve(!1);
if (void 0 !== d[e]) return d[e];
var t = b(i = i || s.alloc(8), i, 10, 128, e).then(function() {
return !0;
}).catch(function() {
return !1;
});
d[e] = t;
return t;
}
function p() {
return n || (n = r.process && r.process.nextTick ? r.process.nextTick : r.queueMicrotask ? r.queueMicrotask : r.setImmediate ? r.setImmediate : r.setTimeout);
}
function b(e, t, r, i, n) {
return u.importKey("raw", e, {
name: "PBKDF2"
}, !1, [ "deriveBits" ]).then(function(e) {
return u.deriveBits({
name: "PBKDF2",
salt: t,
iterations: r,
hash: {
name: n
}
}, e, i << 3);
}).then(function(e) {
return s.from(e);
});
}
function m(e, t) {
e.then(function(e) {
p()(function() {
t(null, e);
});
}, function(e) {
p()(function() {
t(e);
});
});
}
t.exports = function(e, t, i, n, s, u) {
if ("function" == typeof s) {
u = s;
s = void 0;
}
var d = h[(s = s || "sha1").toLowerCase()];
if (d && "function" == typeof r.Promise) {
o(i, n);
e = c(e, a, "Password");
t = c(t, a, "Salt");
if ("function" != typeof u) throw new Error("No callback provided to pbkdf2");
m(l(d).then(function(r) {
return r ? b(e, t, i, n, d) : f(e, t, i, n, s);
}), u);
} else p()(function() {
var r;
try {
r = f(e, t, i, n, s);
} catch (e) {
return u(e);
}
u(null, r);
});
};
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"./default-encoding": 151,
"./precondition": 152,
"./sync": 153,
"./to-buffer": 154,
"safe-buffer": 182
} ],
151: [ function(e, t) {
(function(e, r) {
var i;
i = r.process && r.process.browser ? "utf-8" : r.process && r.process.version ? parseInt(e.version.split(".")[0].slice(1), 10) >= 6 ? "utf-8" : "binary" : "utf-8";
t.exports = i;
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
_process: 156
} ],
152: [ function(e, t) {
var r = Math.pow(2, 30) - 1;
t.exports = function(e, t) {
if ("number" != typeof e) throw new TypeError("Iterations not a number");
if (e < 0) throw new TypeError("Bad iterations");
if ("number" != typeof t) throw new TypeError("Key length not a number");
if (t < 0 || t > r || t != t) throw new TypeError("Bad key length");
};
}, {} ],
153: [ function(e, t) {
var r = e("create-hash/md5"), i = e("ripemd160"), n = e("sha.js"), s = e("safe-buffer").Buffer, o = e("./precondition"), a = e("./default-encoding"), f = e("./to-buffer"), c = s.alloc(128), u = {
md5: 16,
sha1: 20,
sha224: 28,
sha256: 32,
sha384: 48,
sha512: 64,
rmd160: 20,
ripemd160: 20
};
function h(e, t, r) {
var i = d(e), n = "sha512" === e || "sha384" === e ? 128 : 64;
t.length > n ? t = i(t) : t.length < n && (t = s.concat([ t, c ], n));
for (var o = s.allocUnsafe(n + u[e]), a = s.allocUnsafe(n + u[e]), f = 0; f < n; f++) {
o[f] = 54 ^ t[f];
a[f] = 92 ^ t[f];
}
var h = s.allocUnsafe(n + r + 4);
o.copy(h, 0, 0, n);
this.ipad1 = h;
this.ipad2 = o;
this.opad = a;
this.alg = e;
this.blocksize = n;
this.hash = i;
this.size = u[e];
}
h.prototype.run = function(e, t) {
e.copy(t, this.blocksize);
this.hash(t).copy(this.opad, this.blocksize);
return this.hash(this.opad);
};
function d(e) {
return "rmd160" === e || "ripemd160" === e ? function(e) {
return new i().update(e).digest();
} : "md5" === e ? r : function(t) {
return n(e).update(t).digest();
};
}
t.exports = function(e, t, r, i, n) {
o(r, i);
var c = new h(n = n || "sha1", e = f(e, a, "Password"), (t = f(t, a, "Salt")).length), d = s.allocUnsafe(i), l = s.allocUnsafe(t.length + 4);
t.copy(l, 0, 0, t.length);
for (var p = 0, b = u[n], m = Math.ceil(i / b), g = 1; g <= m; g++) {
l.writeUInt32BE(g, t.length);
for (var y = c.run(l, c.ipad1), v = y, w = 1; w < r; w++) {
v = c.run(v, c.ipad2);
for (var _ = 0; _ < b; _++) y[_] ^= v[_];
}
y.copy(d, p);
p += b;
}
return d;
};
}, {
"./default-encoding": 151,
"./precondition": 152,
"./to-buffer": 154,
"create-hash/md5": 72,
ripemd160: 181,
"safe-buffer": 182,
"sha.js": 185
} ],
154: [ function(e, t) {
var r = e("safe-buffer").Buffer;
t.exports = function(e, t, i) {
if (r.isBuffer(e)) return e;
if ("string" == typeof e) return r.from(e, t);
if (ArrayBuffer.isView(e)) return r.from(e.buffer);
throw new TypeError(i + " must be a string, a Buffer, a typed array or a DataView");
};
}, {
"safe-buffer": 182
} ],
155: [ function(e, t) {
(function(e) {
"use strict";
"undefined" == typeof e || !e.version || 0 === e.version.indexOf("v0.") || 0 === e.version.indexOf("v1.") && 0 !== e.version.indexOf("v1.8.") ? t.exports = {
nextTick: function(t, r, i, n) {
if ("function" != typeof t) throw new TypeError('"callback" argument must be a function');
var s, o, a = arguments.length;
switch (a) {
case 0:
case 1:
return e.nextTick(t);

case 2:
return e.nextTick(function() {
t.call(null, r);
});

case 3:
return e.nextTick(function() {
t.call(null, r, i);
});

case 4:
return e.nextTick(function() {
t.call(null, r, i, n);
});

default:
s = new Array(a - 1);
o = 0;
for (;o < s.length; ) s[o++] = arguments[o];
return e.nextTick(function() {
t.apply(null, s);
});
}
}
} : t.exports = e;
}).call(this, e("_process"));
}, {
_process: 156
} ],
156: [ function(e, t) {
var r, i, n = t.exports = {};
function s() {
throw new Error("setTimeout has not been defined");
}
function o() {
throw new Error("clearTimeout has not been defined");
}
(function() {
try {
r = "function" == typeof setTimeout ? setTimeout : s;
} catch (e) {
r = s;
}
try {
i = "function" == typeof clearTimeout ? clearTimeout : o;
} catch (e) {
i = o;
}
})();
function a(e) {
if (r === setTimeout) return setTimeout(e, 0);
if ((r === s || !r) && setTimeout) {
r = setTimeout;
return setTimeout(e, 0);
}
try {
return r(e, 0);
} catch (t) {
try {
return r.call(null, e, 0);
} catch (t) {
return r.call(this, e, 0);
}
}
}
function f(e) {
if (i === clearTimeout) return clearTimeout(e);
if ((i === o || !i) && clearTimeout) {
i = clearTimeout;
return clearTimeout(e);
}
try {
return i(e);
} catch (t) {
try {
return i.call(null, e);
} catch (t) {
return i.call(this, e);
}
}
}
var c, u = [], h = !1, d = -1;
function l() {
if (h && c) {
h = !1;
c.length ? u = c.concat(u) : d = -1;
u.length && p();
}
}
function p() {
if (!h) {
var e = a(l);
h = !0;
for (var t = u.length; t; ) {
c = u;
u = [];
for (;++d < t; ) c && c[d].run();
d = -1;
t = u.length;
}
c = null;
h = !1;
f(e);
}
}
n.nextTick = function(e) {
var t = new Array(arguments.length - 1);
if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
u.push(new b(e, t));
1 !== u.length || h || a(p);
};
function b(e, t) {
this.fun = e;
this.array = t;
}
b.prototype.run = function() {
this.fun.apply(null, this.array);
};
n.title = "browser";
n.browser = !0;
n.env = {};
n.argv = [];
n.version = "";
n.versions = {};
function m() {}
n.on = m;
n.addListener = m;
n.once = m;
n.off = m;
n.removeListener = m;
n.removeAllListeners = m;
n.emit = m;
n.prependListener = m;
n.prependOnceListener = m;
n.listeners = function() {
return [];
};
n.binding = function() {
throw new Error("process.binding is not supported");
};
n.cwd = function() {
return "/";
};
n.chdir = function() {
throw new Error("process.chdir is not supported");
};
n.umask = function() {
return 0;
};
}, {} ],
157: [ function(e, t, r) {
r.publicEncrypt = e("./publicEncrypt");
r.privateDecrypt = e("./privateDecrypt");
r.privateEncrypt = function(e, t) {
return r.publicEncrypt(e, t, !0);
};
r.publicDecrypt = function(e, t) {
return r.privateDecrypt(e, t, !0);
};
}, {
"./privateDecrypt": 160,
"./publicEncrypt": 161
} ],
158: [ function(e, t) {
var r = e("create-hash"), i = e("safe-buffer").Buffer;
t.exports = function(e, t) {
for (var s, o = i.alloc(0), a = 0; o.length < t; ) {
s = n(a++);
o = i.concat([ o, r("sha1").update(e).update(s).digest() ]);
}
return o.slice(0, t);
};
function n(e) {
var t = i.allocUnsafe(4);
t.writeUInt32BE(e, 0);
return t;
}
}, {
"create-hash": 71,
"safe-buffer": 182
} ],
159: [ function(e, t, r) {
arguments[4][15][0].apply(r, arguments);
}, {
buffer: 19,
dup: 15
} ],
160: [ function(e, t) {
var r = e("parse-asn1"), i = e("./mgf"), n = e("./xor"), s = e("bn.js"), o = e("browserify-rsa"), a = e("create-hash"), f = e("./withPublic"), c = e("safe-buffer").Buffer;
t.exports = function(e, t, i) {
var n;
n = e.padding ? e.padding : i ? 1 : 4;
var a, d = r(e), l = d.modulus.byteLength();
if (t.length > l || new s(t).cmp(d.modulus) >= 0) throw new Error("decryption error");
a = i ? f(new s(t), d) : o(t, d);
var p = c.alloc(l - a.length);
a = c.concat([ p, a ], l);
if (4 === n) return u(d, a);
if (1 === n) return h(0, a, i);
if (3 === n) return a;
throw new Error("unknown padding");
};
function u(e, t) {
var r = e.modulus.byteLength(), s = a("sha1").update(c.alloc(0)).digest(), o = s.length;
if (0 !== t[0]) throw new Error("decryption error");
var f = t.slice(1, o + 1), u = t.slice(o + 1), h = n(f, i(u, o)), l = n(u, i(h, r - o - 1));
if (d(s, l.slice(0, o))) throw new Error("decryption error");
for (var p = o; 0 === l[p]; ) p++;
if (1 !== l[p++]) throw new Error("decryption error");
return l.slice(p);
}
function h(e, t, r) {
for (var i = t.slice(0, 2), n = 2, s = 0; 0 !== t[n++]; ) if (n >= t.length) {
s++;
break;
}
var o = t.slice(2, n - 1);
("0002" !== i.toString("hex") && !r || "0001" !== i.toString("hex") && r) && s++;
o.length < 8 && s++;
if (s) throw new Error("decryption error");
return t.slice(n);
}
function d(e, t) {
e = c.from(e);
t = c.from(t);
var r = 0, i = e.length;
if (e.length !== t.length) {
r++;
i = Math.min(e.length, t.length);
}
for (var n = -1; ++n < i; ) r += e[n] ^ t[n];
return r;
}
}, {
"./mgf": 158,
"./withPublic": 162,
"./xor": 163,
"bn.js": 159,
"browserify-rsa": 40,
"create-hash": 71,
"parse-asn1": 148,
"safe-buffer": 182
} ],
161: [ function(e, t) {
var r = e("parse-asn1"), i = e("randombytes"), n = e("create-hash"), s = e("./mgf"), o = e("./xor"), a = e("bn.js"), f = e("./withPublic"), c = e("browserify-rsa"), u = e("safe-buffer").Buffer;
t.exports = function(e, t, i) {
var n;
n = e.padding ? e.padding : i ? 1 : 4;
var s, o = r(e);
if (4 === n) s = h(o, t); else if (1 === n) s = d(o, t, i); else {
if (3 !== n) throw new Error("unknown padding");
if ((s = new a(t)).cmp(o.modulus) >= 0) throw new Error("data too long for modulus");
}
return i ? c(s, o) : f(s, o);
};
function h(e, t) {
var r = e.modulus.byteLength(), f = t.length, c = n("sha1").update(u.alloc(0)).digest(), h = c.length, d = 2 * h;
if (f > r - d - 2) throw new Error("message too long");
var l = u.alloc(r - f - d - 2), p = r - h - 1, b = i(h), m = o(u.concat([ c, l, u.alloc(1, 1), t ], p), s(b, p)), g = o(b, s(m, h));
return new a(u.concat([ u.alloc(1), g, m ], r));
}
function d(e, t, r) {
var i, n = t.length, s = e.modulus.byteLength();
if (n > s - 11) throw new Error("message too long");
i = r ? u.alloc(s - n - 3, 255) : l(s - n - 3);
return new a(u.concat([ u.from([ 0, r ? 1 : 2 ]), i, u.alloc(1), t ], s));
}
function l(e) {
for (var t, r = u.allocUnsafe(e), n = 0, s = i(2 * e), o = 0; n < e; ) {
if (o === s.length) {
s = i(2 * e);
o = 0;
}
(t = s[o++]) && (r[n++] = t);
}
return r;
}
}, {
"./mgf": 158,
"./withPublic": 162,
"./xor": 163,
"bn.js": 159,
"browserify-rsa": 40,
"create-hash": 71,
"parse-asn1": 148,
randombytes: 164,
"safe-buffer": 182
} ],
162: [ function(e, t) {
var r = e("bn.js"), i = e("safe-buffer").Buffer;
t.exports = function(e, t) {
return i.from(e.toRed(r.mont(t.modulus)).redPow(new r(t.publicExponent)).fromRed().toArray());
};
}, {
"bn.js": 159,
"safe-buffer": 182
} ],
163: [ function(e, t) {
t.exports = function(e, t) {
for (var r = e.length, i = -1; ++i < r; ) e[i] ^= t[i];
return e;
};
}, {} ],
164: [ function(e, t) {
(function(r, i) {
"use strict";
var n = e("safe-buffer").Buffer, s = i.crypto || i.msCrypto;
s && s.getRandomValues ? t.exports = function(e, t) {
if (e > 4294967295) throw new RangeError("requested too many random bytes");
var i = n.allocUnsafe(e);
if (e > 0) if (e > 65536) for (var o = 0; o < e; o += 65536) s.getRandomValues(i.slice(o, o + 65536)); else s.getRandomValues(i);
return "function" == typeof t ? r.nextTick(function() {
t(null, i);
}) : i;
} : t.exports = function() {
throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11");
};
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
_process: 156,
"safe-buffer": 182
} ],
165: [ function(e, t, r) {
(function(t, i) {
"use strict";
function n() {
throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11");
}
var s = e("safe-buffer"), o = e("randombytes"), a = s.Buffer, f = s.kMaxLength, c = i.crypto || i.msCrypto, u = Math.pow(2, 32) - 1;
function h(e, t) {
if ("number" != typeof e || e != e) throw new TypeError("offset must be a number");
if (e > u || e < 0) throw new TypeError("offset must be a uint32");
if (e > f || e > t) throw new RangeError("offset out of range");
}
function d(e, t, r) {
if ("number" != typeof e || e != e) throw new TypeError("size must be a number");
if (e > u || e < 0) throw new TypeError("size must be a uint32");
if (e + t > r || e > f) throw new RangeError("buffer too small");
}
if (c && c.getRandomValues || !t.browser) {
r.randomFill = function(e, t, r, n) {
if (!(a.isBuffer(e) || e instanceof i.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
if ("function" == typeof t) {
n = t;
t = 0;
r = e.length;
} else if ("function" == typeof r) {
n = r;
r = e.length - t;
} else if ("function" != typeof n) throw new TypeError('"cb" argument must be a function');
h(t, e.length);
d(r, t, e.length);
return l(e, t, r, n);
};
r.randomFillSync = function(e, t, r) {
"undefined" == typeof t && (t = 0);
if (!(a.isBuffer(e) || e instanceof i.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
h(t, e.length);
void 0 === r && (r = e.length - t);
d(r, t, e.length);
return l(e, t, r);
};
} else {
r.randomFill = n;
r.randomFillSync = n;
}
function l(e, r, i, n) {
if (t.browser) {
var s = e.buffer, a = new Uint8Array(s, r, i);
c.getRandomValues(a);
if (n) {
t.nextTick(function() {
n(null, e);
});
return;
}
return e;
}
if (!n) {
o(i).copy(e, r);
return e;
}
o(i, function(t, i) {
if (t) return n(t);
i.copy(e, r);
n(null, e);
});
}
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
_process: 156,
randombytes: 164,
"safe-buffer": 182
} ],
166: [ function(e, t) {
t.exports = e("./lib/_stream_duplex.js");
}, {
"./lib/_stream_duplex.js": 167
} ],
167: [ function(e, t) {
"use strict";
var r = e("process-nextick-args"), i = Object.keys || function(e) {
var t = [];
for (var r in e) t.push(r);
return t;
};
t.exports = u;
var n = Object.create(e("core-util-is"));
n.inherits = e("inherits");
var s = e("./_stream_readable"), o = e("./_stream_writable");
n.inherits(u, s);
for (var a = i(o.prototype), f = 0; f < a.length; f++) {
var c = a[f];
u.prototype[c] || (u.prototype[c] = o.prototype[c]);
}
function u(e) {
if (!(this instanceof u)) return new u(e);
s.call(this, e);
o.call(this, e);
e && !1 === e.readable && (this.readable = !1);
e && !1 === e.writable && (this.writable = !1);
this.allowHalfOpen = !0;
e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1);
this.once("end", h);
}
Object.defineProperty(u.prototype, "writableHighWaterMark", {
enumerable: !1,
get: function() {
return this._writableState.highWaterMark;
}
});
function h() {
this.allowHalfOpen || this._writableState.ended || r.nextTick(d, this);
}
function d(e) {
e.end();
}
Object.defineProperty(u.prototype, "destroyed", {
get: function() {
return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed;
},
set: function(e) {
if (void 0 !== this._readableState && void 0 !== this._writableState) {
this._readableState.destroyed = e;
this._writableState.destroyed = e;
}
}
});
u.prototype._destroy = function(e, t) {
this.push(null);
this.end();
r.nextTick(t, e);
};
}, {
"./_stream_readable": 169,
"./_stream_writable": 171,
"core-util-is": 68,
inherits: 138,
"process-nextick-args": 155
} ],
168: [ function(e, t) {
"use strict";
t.exports = n;
var r = e("./_stream_transform"), i = Object.create(e("core-util-is"));
i.inherits = e("inherits");
i.inherits(n, r);
function n(e) {
if (!(this instanceof n)) return new n(e);
r.call(this, e);
}
n.prototype._transform = function(e, t, r) {
r(null, e);
};
}, {
"./_stream_transform": 170,
"core-util-is": 68,
inherits: 138
} ],
169: [ function(e, t) {
(function(r, i) {
"use strict";
var n = e("process-nextick-args");
t.exports = _;
var s, o = e("isarray");
_.ReadableState = w;
e("events").EventEmitter;
var a = function(e, t) {
return e.listeners(t).length;
}, f = e("./internal/streams/stream"), c = e("safe-buffer").Buffer, u = i.Uint8Array || function() {};
function h(e) {
return c.from(e);
}
var d = Object.create(e("core-util-is"));
d.inherits = e("inherits");
var l = e("util"), p = void 0;
p = l && l.debuglog ? l.debuglog("stream") : function() {};
var b, m = e("./internal/streams/BufferList"), g = e("./internal/streams/destroy");
d.inherits(_, f);
var y = [ "error", "close", "destroy", "pause", "resume" ];
function v(e, t, r) {
if ("function" == typeof e.prependListener) return e.prependListener(t, r);
e._events && e._events[t] ? o(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [ r, e._events[t] ] : e.on(t, r);
}
function w(t, r) {
t = t || {};
var i = r instanceof (s = s || e("./_stream_duplex"));
this.objectMode = !!t.objectMode;
i && (this.objectMode = this.objectMode || !!t.readableObjectMode);
var n = t.highWaterMark, o = t.readableHighWaterMark, a = this.objectMode ? 16 : 16384;
this.highWaterMark = n || 0 === n ? n : i && (o || 0 === o) ? o : a;
this.highWaterMark = Math.floor(this.highWaterMark);
this.buffer = new m();
this.length = 0;
this.pipes = null;
this.pipesCount = 0;
this.flowing = null;
this.ended = !1;
this.endEmitted = !1;
this.reading = !1;
this.sync = !0;
this.needReadable = !1;
this.emittedReadable = !1;
this.readableListening = !1;
this.resumeScheduled = !1;
this.destroyed = !1;
this.defaultEncoding = t.defaultEncoding || "utf8";
this.awaitDrain = 0;
this.readingMore = !1;
this.decoder = null;
this.encoding = null;
if (t.encoding) {
b || (b = e("string_decoder/").StringDecoder);
this.decoder = new b(t.encoding);
this.encoding = t.encoding;
}
}
function _(t) {
s = s || e("./_stream_duplex");
if (!(this instanceof _)) return new _(t);
this._readableState = new w(t, this);
this.readable = !0;
if (t) {
"function" == typeof t.read && (this._read = t.read);
"function" == typeof t.destroy && (this._destroy = t.destroy);
}
f.call(this);
}
Object.defineProperty(_.prototype, "destroyed", {
get: function() {
return void 0 !== this._readableState && this._readableState.destroyed;
},
set: function(e) {
this._readableState && (this._readableState.destroyed = e);
}
});
_.prototype.destroy = g.destroy;
_.prototype._undestroy = g.undestroy;
_.prototype._destroy = function(e, t) {
this.push(null);
t(e);
};
_.prototype.push = function(e, t) {
var r, i = this._readableState;
if (i.objectMode) r = !0; else if ("string" == typeof e) {
if ((t = t || i.defaultEncoding) !== i.encoding) {
e = c.from(e, t);
t = "";
}
r = !0;
}
return S(this, e, t, !1, r);
};
_.prototype.unshift = function(e) {
return S(this, e, null, !0, !1);
};
function S(e, t, r, i, n) {
var s = e._readableState;
if (null === t) {
s.reading = !1;
I(e, s);
} else {
var o;
n || (o = M(s, t));
if (o) e.emit("error", o); else if (s.objectMode || t && t.length > 0) {
"string" == typeof t || s.objectMode || Object.getPrototypeOf(t) === c.prototype || (t = h(t));
if (i) s.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : E(e, s, t, !0); else if (s.ended) e.emit("error", new Error("stream.push() after EOF")); else {
s.reading = !1;
if (s.decoder && !r) {
t = s.decoder.write(t);
s.objectMode || 0 !== t.length ? E(e, s, t, !1) : j(e, s);
} else E(e, s, t, !1);
}
} else i || (s.reading = !1);
}
return A(s);
}
function E(e, t, r, i) {
if (t.flowing && 0 === t.length && !t.sync) {
e.emit("data", r);
e.read(0);
} else {
t.length += t.objectMode ? 1 : r.length;
i ? t.buffer.unshift(r) : t.buffer.push(r);
t.needReadable && T(e);
}
j(e, t);
}
function M(e, t) {
var r, i;
(i = t, c.isBuffer(i) || i instanceof u) || "string" == typeof t || void 0 === t || e.objectMode || (r = new TypeError("Invalid non-string/buffer chunk"));
return r;
}
function A(e) {
return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length);
}
_.prototype.isPaused = function() {
return !1 === this._readableState.flowing;
};
_.prototype.setEncoding = function(t) {
b || (b = e("string_decoder/").StringDecoder);
this._readableState.decoder = new b(t);
this._readableState.encoding = t;
return this;
};
var k = 8388608;
function R(e) {
if (e >= k) e = k; else {
e--;
e |= e >>> 1;
e |= e >>> 2;
e |= e >>> 4;
e |= e >>> 8;
e |= e >>> 16;
e++;
}
return e;
}
function x(e, t) {
if (e <= 0 || 0 === t.length && t.ended) return 0;
if (t.objectMode) return 1;
if (e != e) return t.flowing && t.length ? t.buffer.head.data.length : t.length;
e > t.highWaterMark && (t.highWaterMark = R(e));
if (e <= t.length) return e;
if (!t.ended) {
t.needReadable = !0;
return 0;
}
return t.length;
}
_.prototype.read = function(e) {
p("read", e);
e = parseInt(e, 10);
var t = this._readableState, r = e;
0 !== e && (t.emittedReadable = !1);
if (0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) {
p("read: emitReadable", t.length, t.ended);
0 === t.length && t.ended ? $(this) : T(this);
return null;
}
if (0 === (e = x(e, t)) && t.ended) {
0 === t.length && $(this);
return null;
}
var i, n = t.needReadable;
p("need readable", n);
(0 === t.length || t.length - e < t.highWaterMark) && p("length less than watermark", n = !0);
if (t.ended || t.reading) p("reading or ended", n = !1); else if (n) {
p("do read");
t.reading = !0;
t.sync = !0;
0 === t.length && (t.needReadable = !0);
this._read(t.highWaterMark);
t.sync = !1;
t.reading || (e = x(r, t));
}
if (null === (i = e > 0 ? U(e, t) : null)) {
t.needReadable = !0;
e = 0;
} else t.length -= e;
if (0 === t.length) {
t.ended || (t.needReadable = !0);
r !== e && t.ended && $(this);
}
null !== i && this.emit("data", i);
return i;
};
function I(e, t) {
if (!t.ended) {
if (t.decoder) {
var r = t.decoder.end();
if (r && r.length) {
t.buffer.push(r);
t.length += t.objectMode ? 1 : r.length;
}
}
t.ended = !0;
T(e);
}
}
function T(e) {
var t = e._readableState;
t.needReadable = !1;
if (!t.emittedReadable) {
p("emitReadable", t.flowing);
t.emittedReadable = !0;
t.sync ? n.nextTick(B, e) : B(e);
}
}
function B(e) {
p("emit readable");
e.emit("readable");
D(e);
}
function j(e, t) {
if (!t.readingMore) {
t.readingMore = !0;
n.nextTick(N, e, t);
}
}
function N(e, t) {
for (var r = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark; ) {
p("maybeReadMore read 0");
e.read(0);
if (r === t.length) break;
r = t.length;
}
t.readingMore = !1;
}
_.prototype._read = function() {
this.emit("error", new Error("_read() is not implemented"));
};
_.prototype.pipe = function(e, t) {
var i = this, s = this._readableState;
switch (s.pipesCount) {
case 0:
s.pipes = e;
break;

case 1:
s.pipes = [ s.pipes, e ];
break;

default:
s.pipes.push(e);
}
s.pipesCount += 1;
p("pipe count=%d opts=%j", s.pipesCount, t);
var o = t && !1 === t.end || e === r.stdout || e === r.stderr ? w : c;
s.endEmitted ? n.nextTick(o) : i.once("end", o);
e.on("unpipe", f);
function f(e, t) {
p("onunpipe");
if (e === i && t && !1 === t.hasUnpiped) {
t.hasUnpiped = !0;
d();
}
}
function c() {
p("onend");
e.end();
}
var u = P(i);
e.on("drain", u);
var h = !1;
function d() {
p("cleanup");
e.removeListener("close", g);
e.removeListener("finish", y);
e.removeListener("drain", u);
e.removeListener("error", m);
e.removeListener("unpipe", f);
i.removeListener("end", c);
i.removeListener("end", w);
i.removeListener("data", b);
h = !0;
!s.awaitDrain || e._writableState && !e._writableState.needDrain || u();
}
var l = !1;
i.on("data", b);
function b(t) {
p("ondata");
l = !1;
if (!1 === e.write(t) && !l) {
if ((1 === s.pipesCount && s.pipes === e || s.pipesCount > 1 && -1 !== H(s.pipes, e)) && !h) {
p("false write response, pause", i._readableState.awaitDrain);
i._readableState.awaitDrain++;
l = !0;
}
i.pause();
}
}
function m(t) {
p("onerror", t);
w();
e.removeListener("error", m);
0 === a(e, "error") && e.emit("error", t);
}
v(e, "error", m);
function g() {
e.removeListener("finish", y);
w();
}
e.once("close", g);
function y() {
p("onfinish");
e.removeListener("close", g);
w();
}
e.once("finish", y);
function w() {
p("unpipe");
i.unpipe(e);
}
e.emit("pipe", i);
if (!s.flowing) {
p("pipe resume");
i.resume();
}
return e;
};
function P(e) {
return function() {
var t = e._readableState;
p("pipeOnDrain", t.awaitDrain);
t.awaitDrain && t.awaitDrain--;
if (0 === t.awaitDrain && a(e, "data")) {
t.flowing = !0;
D(e);
}
};
}
_.prototype.unpipe = function(e) {
var t = this._readableState, r = {
hasUnpiped: !1
};
if (0 === t.pipesCount) return this;
if (1 === t.pipesCount) {
if (e && e !== t.pipes) return this;
e || (e = t.pipes);
t.pipes = null;
t.pipesCount = 0;
t.flowing = !1;
e && e.emit("unpipe", this, r);
return this;
}
if (!e) {
var i = t.pipes, n = t.pipesCount;
t.pipes = null;
t.pipesCount = 0;
t.flowing = !1;
for (var s = 0; s < n; s++) i[s].emit("unpipe", this, r);
return this;
}
var o = H(t.pipes, e);
if (-1 === o) return this;
t.pipes.splice(o, 1);
t.pipesCount -= 1;
1 === t.pipesCount && (t.pipes = t.pipes[0]);
e.emit("unpipe", this, r);
return this;
};
_.prototype.on = function(e, t) {
var r = f.prototype.on.call(this, e, t);
if ("data" === e) !1 !== this._readableState.flowing && this.resume(); else if ("readable" === e) {
var i = this._readableState;
if (!i.endEmitted && !i.readableListening) {
i.readableListening = i.needReadable = !0;
i.emittedReadable = !1;
i.reading ? i.length && T(this) : n.nextTick(C, this);
}
}
return r;
};
_.prototype.addListener = _.prototype.on;
function C(e) {
p("readable nexttick read 0");
e.read(0);
}
_.prototype.resume = function() {
var e = this._readableState;
if (!e.flowing) {
p("resume");
e.flowing = !0;
L(this, e);
}
return this;
};
function L(e, t) {
if (!t.resumeScheduled) {
t.resumeScheduled = !0;
n.nextTick(O, e, t);
}
}
function O(e, t) {
if (!t.reading) {
p("resume read 0");
e.read(0);
}
t.resumeScheduled = !1;
t.awaitDrain = 0;
e.emit("resume");
D(e);
t.flowing && !t.reading && e.read(0);
}
_.prototype.pause = function() {
p("call pause flowing=%j", this._readableState.flowing);
if (!1 !== this._readableState.flowing) {
p("pause");
this._readableState.flowing = !1;
this.emit("pause");
}
return this;
};
function D(e) {
var t = e._readableState;
p("flow", t.flowing);
for (;t.flowing && null !== e.read(); ) ;
}
_.prototype.wrap = function(e) {
var t = this, r = this._readableState, i = !1;
e.on("end", function() {
p("wrapped end");
if (r.decoder && !r.ended) {
var e = r.decoder.end();
e && e.length && t.push(e);
}
t.push(null);
});
e.on("data", function(n) {
p("wrapped data");
r.decoder && (n = r.decoder.write(n));
if ((!r.objectMode || null != n) && (r.objectMode || n && n.length) && !t.push(n)) {
i = !0;
e.pause();
}
});
for (var n in e) void 0 === this[n] && "function" == typeof e[n] && (this[n] = function(t) {
return function() {
return e[t].apply(e, arguments);
};
}(n));
for (var s = 0; s < y.length; s++) e.on(y[s], this.emit.bind(this, y[s]));
this._read = function(t) {
p("wrapped _read", t);
if (i) {
i = !1;
e.resume();
}
};
return this;
};
Object.defineProperty(_.prototype, "readableHighWaterMark", {
enumerable: !1,
get: function() {
return this._readableState.highWaterMark;
}
});
_._fromList = U;
function U(e, t) {
if (0 === t.length) return null;
var r;
if (t.objectMode) r = t.buffer.shift(); else if (!e || e >= t.length) {
r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length);
t.buffer.clear();
} else r = q(e, t.buffer, t.decoder);
return r;
}
function q(e, t, r) {
var i;
if (e < t.head.data.length) {
i = t.head.data.slice(0, e);
t.head.data = t.head.data.slice(e);
} else i = e === t.head.data.length ? t.shift() : r ? F(e, t) : z(e, t);
return i;
}
function F(e, t) {
var r = t.head, i = 1, n = r.data;
e -= n.length;
for (;r = r.next; ) {
var s = r.data, o = e > s.length ? s.length : e;
o === s.length ? n += s : n += s.slice(0, e);
if (0 == (e -= o)) {
if (o === s.length) {
++i;
r.next ? t.head = r.next : t.head = t.tail = null;
} else {
t.head = r;
r.data = s.slice(o);
}
break;
}
++i;
}
t.length -= i;
return n;
}
function z(e, t) {
var r = c.allocUnsafe(e), i = t.head, n = 1;
i.data.copy(r);
e -= i.data.length;
for (;i = i.next; ) {
var s = i.data, o = e > s.length ? s.length : e;
s.copy(r, r.length - e, 0, o);
if (0 == (e -= o)) {
if (o === s.length) {
++n;
i.next ? t.head = i.next : t.head = t.tail = null;
} else {
t.head = i;
i.data = s.slice(o);
}
break;
}
++n;
}
t.length -= n;
return r;
}
function $(e) {
var t = e._readableState;
if (t.length > 0) throw new Error('"endReadable()" called on non-empty stream');
if (!t.endEmitted) {
t.ended = !0;
n.nextTick(K, t, e);
}
}
function K(e, t) {
if (!e.endEmitted && 0 === e.length) {
e.endEmitted = !0;
t.readable = !1;
t.emit("end");
}
}
function H(e, t) {
for (var r = 0, i = e.length; r < i; r++) if (e[r] === t) return r;
return -1;
}
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"./_stream_duplex": 167,
"./internal/streams/BufferList": 172,
"./internal/streams/destroy": 173,
"./internal/streams/stream": 174,
_process: 156,
"core-util-is": 68,
events: 104,
inherits: 138,
isarray: 175,
"process-nextick-args": 155,
"safe-buffer": 182,
"string_decoder/": 176,
util: 19
} ],
170: [ function(e, t) {
"use strict";
t.exports = s;
var r = e("./_stream_duplex"), i = Object.create(e("core-util-is"));
i.inherits = e("inherits");
i.inherits(s, r);
function n(e, t) {
var r = this._transformState;
r.transforming = !1;
var i = r.writecb;
if (!i) return this.emit("error", new Error("write callback called multiple times"));
r.writechunk = null;
r.writecb = null;
null != t && this.push(t);
i(e);
var n = this._readableState;
n.reading = !1;
(n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark);
}
function s(e) {
if (!(this instanceof s)) return new s(e);
r.call(this, e);
this._transformState = {
afterTransform: n.bind(this),
needTransform: !1,
transforming: !1,
writecb: null,
writechunk: null,
writeencoding: null
};
this._readableState.needReadable = !0;
this._readableState.sync = !1;
if (e) {
"function" == typeof e.transform && (this._transform = e.transform);
"function" == typeof e.flush && (this._flush = e.flush);
}
this.on("prefinish", o);
}
function o() {
var e = this;
"function" == typeof this._flush ? this._flush(function(t, r) {
a(e, t, r);
}) : a(this, null, null);
}
s.prototype.push = function(e, t) {
this._transformState.needTransform = !1;
return r.prototype.push.call(this, e, t);
};
s.prototype._transform = function() {
throw new Error("_transform() is not implemented");
};
s.prototype._write = function(e, t, r) {
var i = this._transformState;
i.writecb = r;
i.writechunk = e;
i.writeencoding = t;
if (!i.transforming) {
var n = this._readableState;
(i.needTransform || n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark);
}
};
s.prototype._read = function() {
var e = this._transformState;
if (null !== e.writechunk && e.writecb && !e.transforming) {
e.transforming = !0;
this._transform(e.writechunk, e.writeencoding, e.afterTransform);
} else e.needTransform = !0;
};
s.prototype._destroy = function(e, t) {
var i = this;
r.prototype._destroy.call(this, e, function(e) {
t(e);
i.emit("close");
});
};
function a(e, t, r) {
if (t) return e.emit("error", t);
null != r && e.push(r);
if (e._writableState.length) throw new Error("Calling transform done when ws.length != 0");
if (e._transformState.transforming) throw new Error("Calling transform done when still transforming");
return e.push(null);
}
}, {
"./_stream_duplex": 167,
"core-util-is": 68,
inherits: 138
} ],
171: [ function(e, t) {
(function(r, i) {
"use strict";
var n = e("process-nextick-args");
t.exports = y;
function s(e) {
var t = this;
this.next = null;
this.entry = null;
this.finish = function() {
C(t, e);
};
}
var o, a = !r.browser && [ "v0.10", "v0.9." ].indexOf(r.version.slice(0, 5)) > -1 ? setImmediate : n.nextTick;
y.WritableState = g;
var f = Object.create(e("core-util-is"));
f.inherits = e("inherits");
var c = {
deprecate: e("util-deprecate")
}, u = e("./internal/streams/stream"), h = e("safe-buffer").Buffer, d = i.Uint8Array || function() {};
function l(e) {
return h.from(e);
}
var p, b = e("./internal/streams/destroy");
f.inherits(y, u);
function m() {}
function g(t, r) {
o = o || e("./_stream_duplex");
t = t || {};
var i = r instanceof o;
this.objectMode = !!t.objectMode;
i && (this.objectMode = this.objectMode || !!t.writableObjectMode);
var n = t.highWaterMark, a = t.writableHighWaterMark, f = this.objectMode ? 16 : 16384;
this.highWaterMark = n || 0 === n ? n : i && (a || 0 === a) ? a : f;
this.highWaterMark = Math.floor(this.highWaterMark);
this.finalCalled = !1;
this.needDrain = !1;
this.ending = !1;
this.ended = !1;
this.finished = !1;
this.destroyed = !1;
var c = !1 === t.decodeStrings;
this.decodeStrings = !c;
this.defaultEncoding = t.defaultEncoding || "utf8";
this.length = 0;
this.writing = !1;
this.corked = 0;
this.sync = !0;
this.bufferProcessing = !1;
this.onwrite = function(e) {
k(r, e);
};
this.writecb = null;
this.writelen = 0;
this.bufferedRequest = null;
this.lastBufferedRequest = null;
this.pendingcb = 0;
this.prefinished = !1;
this.errorEmitted = !1;
this.bufferedRequestCount = 0;
this.corkedRequestsFree = new s(this);
}
g.prototype.getBuffer = function() {
for (var e = this.bufferedRequest, t = []; e; ) {
t.push(e);
e = e.next;
}
return t;
};
(function() {
try {
Object.defineProperty(g.prototype, "buffer", {
get: c.deprecate(function() {
return this.getBuffer();
}, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
});
} catch (e) {}
})();
if ("function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance]) {
p = Function.prototype[Symbol.hasInstance];
Object.defineProperty(y, Symbol.hasInstance, {
value: function(e) {
return !!p.call(this, e) || this === y && e && e._writableState instanceof g;
}
});
} else p = function(e) {
return e instanceof this;
};
function y(t) {
o = o || e("./_stream_duplex");
if (!(p.call(y, this) || this instanceof o)) return new y(t);
this._writableState = new g(t, this);
this.writable = !0;
if (t) {
"function" == typeof t.write && (this._write = t.write);
"function" == typeof t.writev && (this._writev = t.writev);
"function" == typeof t.destroy && (this._destroy = t.destroy);
"function" == typeof t.final && (this._final = t.final);
}
u.call(this);
}
y.prototype.pipe = function() {
this.emit("error", new Error("Cannot pipe, not readable"));
};
function v(e, t) {
var r = new Error("write after end");
e.emit("error", r);
n.nextTick(t, r);
}
function w(e, t, r, i) {
var s = !0, o = !1;
null === r ? o = new TypeError("May not write null values to stream") : "string" == typeof r || void 0 === r || t.objectMode || (o = new TypeError("Invalid non-string/buffer chunk"));
if (o) {
e.emit("error", o);
n.nextTick(i, o);
s = !1;
}
return s;
}
y.prototype.write = function(e, t, r) {
var i, n = this._writableState, s = !1, o = !n.objectMode && (i = e, h.isBuffer(i) || i instanceof d);
o && !h.isBuffer(e) && (e = l(e));
if ("function" == typeof t) {
r = t;
t = null;
}
o ? t = "buffer" : t || (t = n.defaultEncoding);
"function" != typeof r && (r = m);
if (n.ended) v(this, r); else if (o || w(this, n, e, r)) {
n.pendingcb++;
s = S(this, n, o, e, t, r);
}
return s;
};
y.prototype.cork = function() {
this._writableState.corked++;
};
y.prototype.uncork = function() {
var e = this._writableState;
if (e.corked) {
e.corked--;
e.writing || e.corked || e.finished || e.bufferProcessing || !e.bufferedRequest || I(this, e);
}
};
y.prototype.setDefaultEncoding = function(e) {
"string" == typeof e && (e = e.toLowerCase());
if (!([ "hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw" ].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);
this._writableState.defaultEncoding = e;
return this;
};
function _(e, t, r) {
e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = h.from(t, r));
return t;
}
Object.defineProperty(y.prototype, "writableHighWaterMark", {
enumerable: !1,
get: function() {
return this._writableState.highWaterMark;
}
});
function S(e, t, r, i, n, s) {
if (!r) {
var o = _(t, i, n);
if (i !== o) {
r = !0;
n = "buffer";
i = o;
}
}
var a = t.objectMode ? 1 : i.length;
t.length += a;
var f = t.length < t.highWaterMark;
f || (t.needDrain = !0);
if (t.writing || t.corked) {
var c = t.lastBufferedRequest;
t.lastBufferedRequest = {
chunk: i,
encoding: n,
isBuf: r,
callback: s,
next: null
};
c ? c.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest;
t.bufferedRequestCount += 1;
} else E(e, t, !1, a, i, n, s);
return f;
}
function E(e, t, r, i, n, s, o) {
t.writelen = i;
t.writecb = o;
t.writing = !0;
t.sync = !0;
r ? e._writev(n, t.onwrite) : e._write(n, s, t.onwrite);
t.sync = !1;
}
function M(e, t, r, i, s) {
--t.pendingcb;
if (r) {
n.nextTick(s, i);
n.nextTick(N, e, t);
e._writableState.errorEmitted = !0;
e.emit("error", i);
} else {
s(i);
e._writableState.errorEmitted = !0;
e.emit("error", i);
N(e, t);
}
}
function A(e) {
e.writing = !1;
e.writecb = null;
e.length -= e.writelen;
e.writelen = 0;
}
function k(e, t) {
var r = e._writableState, i = r.sync, n = r.writecb;
A(r);
if (t) M(e, r, i, t, n); else {
var s = T(r);
s || r.corked || r.bufferProcessing || !r.bufferedRequest || I(e, r);
i ? a(R, e, r, s, n) : R(e, r, s, n);
}
}
function R(e, t, r, i) {
r || x(e, t);
t.pendingcb--;
i();
N(e, t);
}
function x(e, t) {
if (0 === t.length && t.needDrain) {
t.needDrain = !1;
e.emit("drain");
}
}
function I(e, t) {
t.bufferProcessing = !0;
var r = t.bufferedRequest;
if (e._writev && r && r.next) {
var i = t.bufferedRequestCount, n = new Array(i), o = t.corkedRequestsFree;
o.entry = r;
for (var a = 0, f = !0; r; ) {
n[a] = r;
r.isBuf || (f = !1);
r = r.next;
a += 1;
}
n.allBuffers = f;
E(e, t, !0, t.length, n, "", o.finish);
t.pendingcb++;
t.lastBufferedRequest = null;
if (o.next) {
t.corkedRequestsFree = o.next;
o.next = null;
} else t.corkedRequestsFree = new s(t);
t.bufferedRequestCount = 0;
} else {
for (;r; ) {
var c = r.chunk, u = r.encoding, h = r.callback;
E(e, t, !1, t.objectMode ? 1 : c.length, c, u, h);
r = r.next;
t.bufferedRequestCount--;
if (t.writing) break;
}
null === r && (t.lastBufferedRequest = null);
}
t.bufferedRequest = r;
t.bufferProcessing = !1;
}
y.prototype._write = function(e, t, r) {
r(new Error("_write() is not implemented"));
};
y.prototype._writev = null;
y.prototype.end = function(e, t, r) {
var i = this._writableState;
if ("function" == typeof e) {
r = e;
e = null;
t = null;
} else if ("function" == typeof t) {
r = t;
t = null;
}
null != e && this.write(e, t);
if (i.corked) {
i.corked = 1;
this.uncork();
}
i.ending || i.finished || P(this, i, r);
};
function T(e) {
return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing;
}
function B(e, t) {
e._final(function(r) {
t.pendingcb--;
r && e.emit("error", r);
t.prefinished = !0;
e.emit("prefinish");
N(e, t);
});
}
function j(e, t) {
if (!t.prefinished && !t.finalCalled) if ("function" == typeof e._final) {
t.pendingcb++;
t.finalCalled = !0;
n.nextTick(B, e, t);
} else {
t.prefinished = !0;
e.emit("prefinish");
}
}
function N(e, t) {
var r = T(t);
if (r) {
j(e, t);
if (0 === t.pendingcb) {
t.finished = !0;
e.emit("finish");
}
}
return r;
}
function P(e, t, r) {
t.ending = !0;
N(e, t);
r && (t.finished ? n.nextTick(r) : e.once("finish", r));
t.ended = !0;
e.writable = !1;
}
function C(e, t, r) {
var i = e.entry;
e.entry = null;
for (;i; ) {
var n = i.callback;
t.pendingcb--;
n(r);
i = i.next;
}
t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e;
}
Object.defineProperty(y.prototype, "destroyed", {
get: function() {
return void 0 !== this._writableState && this._writableState.destroyed;
},
set: function(e) {
this._writableState && (this._writableState.destroyed = e);
}
});
y.prototype.destroy = b.destroy;
y.prototype._undestroy = b.undestroy;
y.prototype._destroy = function(e, t) {
this.end();
t(e);
};
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"./_stream_duplex": 167,
"./internal/streams/destroy": 173,
"./internal/streams/stream": 174,
_process: 156,
"core-util-is": 68,
inherits: 138,
"process-nextick-args": 155,
"safe-buffer": 182,
"util-deprecate": 194
} ],
172: [ function(e, t) {
"use strict";
function r(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var i = e("safe-buffer").Buffer, n = e("util");
t.exports = function() {
function e() {
r(this, e);
this.head = null;
this.tail = null;
this.length = 0;
}
e.prototype.push = function(e) {
var t = {
data: e,
next: null
};
this.length > 0 ? this.tail.next = t : this.head = t;
this.tail = t;
++this.length;
};
e.prototype.unshift = function(e) {
var t = {
data: e,
next: this.head
};
0 === this.length && (this.tail = t);
this.head = t;
++this.length;
};
e.prototype.shift = function() {
if (0 !== this.length) {
var e = this.head.data;
1 === this.length ? this.head = this.tail = null : this.head = this.head.next;
--this.length;
return e;
}
};
e.prototype.clear = function() {
this.head = this.tail = null;
this.length = 0;
};
e.prototype.join = function(e) {
if (0 === this.length) return "";
for (var t = this.head, r = "" + t.data; t = t.next; ) r += e + t.data;
return r;
};
e.prototype.concat = function(e) {
if (0 === this.length) return i.alloc(0);
if (1 === this.length) return this.head.data;
for (var t, r, n = i.allocUnsafe(e >>> 0), s = this.head, o = 0; s; ) {
t = n, r = o, s.data.copy(t, r);
o += s.data.length;
s = s.next;
}
return n;
};
return e;
}();
n && n.inspect && n.inspect.custom && (t.exports.prototype[n.inspect.custom] = function() {
var e = n.inspect({
length: this.length
});
return this.constructor.name + " " + e;
});
}, {
"safe-buffer": 182,
util: 19
} ],
173: [ function(e, t) {
"use strict";
var r = e("process-nextick-args");
function i(e, t) {
e.emit("error", t);
}
t.exports = {
destroy: function(e, t) {
var n = this, s = this._readableState && this._readableState.destroyed, o = this._writableState && this._writableState.destroyed;
if (s || o) {
t ? t(e) : !e || this._writableState && this._writableState.errorEmitted || r.nextTick(i, this, e);
return this;
}
this._readableState && (this._readableState.destroyed = !0);
this._writableState && (this._writableState.destroyed = !0);
this._destroy(e || null, function(e) {
if (!t && e) {
r.nextTick(i, n, e);
n._writableState && (n._writableState.errorEmitted = !0);
} else t && t(e);
});
return this;
},
undestroy: function() {
if (this._readableState) {
this._readableState.destroyed = !1;
this._readableState.reading = !1;
this._readableState.ended = !1;
this._readableState.endEmitted = !1;
}
if (this._writableState) {
this._writableState.destroyed = !1;
this._writableState.ended = !1;
this._writableState.ending = !1;
this._writableState.finished = !1;
this._writableState.errorEmitted = !1;
}
}
};
}, {
"process-nextick-args": 155
} ],
174: [ function(e, t, r) {
arguments[4][60][0].apply(r, arguments);
}, {
dup: 60,
events: 104
} ],
175: [ function(e, t, r) {
arguments[4][66][0].apply(r, arguments);
}, {
dup: 66
} ],
176: [ function(e, t, r) {
arguments[4][63][0].apply(r, arguments);
}, {
dup: 63,
"safe-buffer": 182
} ],
177: [ function(e, t) {
t.exports = e("./readable").PassThrough;
}, {
"./readable": 178
} ],
178: [ function(e, t, r) {
(r = t.exports = e("./lib/_stream_readable.js")).Stream = r;
r.Readable = r;
r.Writable = e("./lib/_stream_writable.js");
r.Duplex = e("./lib/_stream_duplex.js");
r.Transform = e("./lib/_stream_transform.js");
r.PassThrough = e("./lib/_stream_passthrough.js");
}, {
"./lib/_stream_duplex.js": 167,
"./lib/_stream_passthrough.js": 168,
"./lib/_stream_readable.js": 169,
"./lib/_stream_transform.js": 170,
"./lib/_stream_writable.js": 171
} ],
179: [ function(e, t) {
t.exports = e("./readable").Transform;
}, {
"./readable": 178
} ],
180: [ function(e, t) {
t.exports = e("./lib/_stream_writable.js");
}, {
"./lib/_stream_writable.js": 171
} ],
181: [ function(e, t) {
"use strict";
var r = e("buffer").Buffer, i = e("inherits"), n = e("hash-base"), s = new Array(16), o = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ], a = [ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ], f = [ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ], c = [ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ], u = [ 0, 1518500249, 1859775393, 2400959708, 2840853838 ], h = [ 1352829926, 1548603684, 1836072691, 2053994217, 0 ];
function d() {
n.call(this, 64);
this._a = 1732584193;
this._b = 4023233417;
this._c = 2562383102;
this._d = 271733878;
this._e = 3285377520;
}
i(d, n);
d.prototype._update = function() {
for (var e = s, t = 0; t < 16; ++t) e[t] = this._block.readInt32LE(4 * t);
for (var r = 0 | this._a, i = 0 | this._b, n = 0 | this._c, d = 0 | this._d, v = 0 | this._e, w = 0 | this._a, _ = 0 | this._b, S = 0 | this._c, E = 0 | this._d, M = 0 | this._e, A = 0; A < 80; A += 1) {
var k, R;
if (A < 16) {
k = p(r, i, n, d, v, e[o[A]], u[0], f[A]);
R = y(w, _, S, E, M, e[a[A]], h[0], c[A]);
} else if (A < 32) {
k = b(r, i, n, d, v, e[o[A]], u[1], f[A]);
R = g(w, _, S, E, M, e[a[A]], h[1], c[A]);
} else if (A < 48) {
k = m(r, i, n, d, v, e[o[A]], u[2], f[A]);
R = m(w, _, S, E, M, e[a[A]], h[2], c[A]);
} else if (A < 64) {
k = g(r, i, n, d, v, e[o[A]], u[3], f[A]);
R = b(w, _, S, E, M, e[a[A]], h[3], c[A]);
} else {
k = y(r, i, n, d, v, e[o[A]], u[4], f[A]);
R = p(w, _, S, E, M, e[a[A]], h[4], c[A]);
}
r = v;
v = d;
d = l(n, 10);
n = i;
i = k;
w = M;
M = E;
E = l(S, 10);
S = _;
_ = R;
}
var x = this._b + n + E | 0;
this._b = this._c + d + M | 0;
this._c = this._d + v + w | 0;
this._d = this._e + r + _ | 0;
this._e = this._a + i + S | 0;
this._a = x;
};
d.prototype._digest = function() {
this._block[this._blockOffset++] = 128;
if (this._blockOffset > 56) {
this._block.fill(0, this._blockOffset, 64);
this._update();
this._blockOffset = 0;
}
this._block.fill(0, this._blockOffset, 56);
this._block.writeUInt32LE(this._length[0], 56);
this._block.writeUInt32LE(this._length[1], 60);
this._update();
var e = r.alloc ? r.alloc(20) : new r(20);
e.writeInt32LE(this._a, 0);
e.writeInt32LE(this._b, 4);
e.writeInt32LE(this._c, 8);
e.writeInt32LE(this._d, 12);
e.writeInt32LE(this._e, 16);
return e;
};
function l(e, t) {
return e << t | e >>> 32 - t;
}
function p(e, t, r, i, n, s, o, a) {
return l(e + (t ^ r ^ i) + s + o | 0, a) + n | 0;
}
function b(e, t, r, i, n, s, o, a) {
return l(e + (t & r | ~t & i) + s + o | 0, a) + n | 0;
}
function m(e, t, r, i, n, s, o, a) {
return l(e + ((t | ~r) ^ i) + s + o | 0, a) + n | 0;
}
function g(e, t, r, i, n, s, o, a) {
return l(e + (t & i | r & ~i) + s + o | 0, a) + n | 0;
}
function y(e, t, r, i, n, s, o, a) {
return l(e + (t ^ (r | ~i)) + s + o | 0, a) + n | 0;
}
t.exports = d;
}, {
buffer: 65,
"hash-base": 106,
inherits: 138
} ],
182: [ function(e, t, r) {
var i = e("buffer"), n = i.Buffer;
function s(e, t) {
for (var r in e) t[r] = e[r];
}
if (n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow) t.exports = i; else {
s(i, r);
r.Buffer = o;
}
function o(e, t, r) {
return n(e, t, r);
}
s(n, o);
o.from = function(e, t, r) {
if ("number" == typeof e) throw new TypeError("Argument must not be a number");
return n(e, t, r);
};
o.alloc = function(e, t, r) {
if ("number" != typeof e) throw new TypeError("Argument must be a number");
var i = n(e);
void 0 !== t ? "string" == typeof r ? i.fill(t, r) : i.fill(t) : i.fill(0);
return i;
};
o.allocUnsafe = function(e) {
if ("number" != typeof e) throw new TypeError("Argument must be a number");
return n(e);
};
o.allocUnsafeSlow = function(e) {
if ("number" != typeof e) throw new TypeError("Argument must be a number");
return i.SlowBuffer(e);
};
}, {
buffer: 65
} ],
183: [ function(e, t) {
(function(r) {
"use strict";
var i, n = e("buffer"), s = n.Buffer, o = {};
for (i in n) n.hasOwnProperty(i) && "SlowBuffer" !== i && "Buffer" !== i && (o[i] = n[i]);
var a = o.Buffer = {};
for (i in s) s.hasOwnProperty(i) && "allocUnsafe" !== i && "allocUnsafeSlow" !== i && (a[i] = s[i]);
o.Buffer.prototype = s.prototype;
a.from && a.from !== Uint8Array.from || (a.from = function(e, t, r) {
if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof e);
if (e && "undefined" == typeof e.length) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
return s(e, t, r);
});
a.alloc || (a.alloc = function(e, t, r) {
if ("number" != typeof e) throw new TypeError('The "size" argument must be of type number. Received type ' + typeof e);
if (e < 0 || e >= 2 * (1 << 30)) throw new RangeError('The value "' + e + '" is invalid for option "size"');
var i = s(e);
t && 0 !== t.length ? "string" == typeof r ? i.fill(t, r) : i.fill(t) : i.fill(0);
return i;
});
if (!o.kStringMaxLength) try {
o.kStringMaxLength = r.binding("buffer").kStringMaxLength;
} catch (e) {}
if (!o.constants) {
o.constants = {
MAX_LENGTH: o.kMaxLength
};
o.kStringMaxLength && (o.constants.MAX_STRING_LENGTH = o.kStringMaxLength);
}
t.exports = o;
}).call(this, e("_process"));
}, {
_process: 156,
buffer: 65
} ],
184: [ function(e, t) {
var r = e("safe-buffer").Buffer;
function i(e, t) {
this._block = r.alloc(e);
this._finalSize = t;
this._blockSize = e;
this._len = 0;
}
i.prototype.update = function(e, t) {
if ("string" == typeof e) {
t = t || "utf8";
e = r.from(e, t);
}
for (var i = this._block, n = this._blockSize, s = e.length, o = this._len, a = 0; a < s; ) {
for (var f = o % n, c = Math.min(s - a, n - f), u = 0; u < c; u++) i[f + u] = e[a + u];
a += c;
(o += c) % n == 0 && this._update(i);
}
this._len += s;
return this;
};
i.prototype.digest = function(e) {
var t = this._len % this._blockSize;
this._block[t] = 128;
this._block.fill(0, t + 1);
if (t >= this._finalSize) {
this._update(this._block);
this._block.fill(0);
}
var r = 8 * this._len;
if (r <= 4294967295) this._block.writeUInt32BE(r, this._blockSize - 4); else {
var i = (4294967295 & r) >>> 0, n = (r - i) / 4294967296;
this._block.writeUInt32BE(n, this._blockSize - 8);
this._block.writeUInt32BE(i, this._blockSize - 4);
}
this._update(this._block);
var s = this._hash();
return e ? s.toString(e) : s;
};
i.prototype._update = function() {
throw new Error("_update must be implemented by subclass");
};
t.exports = i;
}, {
"safe-buffer": 182
} ],
185: [ function(e, t, r) {
(r = t.exports = function(e) {
e = e.toLowerCase();
var t = r[e];
if (!t) throw new Error(e + " is not supported (we accept pull requests)");
return new t();
}).sha = e("./sha");
r.sha1 = e("./sha1");
r.sha224 = e("./sha224");
r.sha256 = e("./sha256");
r.sha384 = e("./sha384");
r.sha512 = e("./sha512");
}, {
"./sha": 186,
"./sha1": 187,
"./sha224": 188,
"./sha256": 189,
"./sha384": 190,
"./sha512": 191
} ],
186: [ function(e, t) {
var r = e("inherits"), i = e("./hash"), n = e("safe-buffer").Buffer, s = [ 1518500249, 1859775393, -1894007588, -899497514 ], o = new Array(80);
function a() {
this.init();
this._w = o;
i.call(this, 64, 56);
}
r(a, i);
a.prototype.init = function() {
this._a = 1732584193;
this._b = 4023233417;
this._c = 2562383102;
this._d = 271733878;
this._e = 3285377520;
return this;
};
function f(e) {
return e << 30 | e >>> 2;
}
function c(e, t, r, i) {
return 0 === e ? t & r | ~t & i : 2 === e ? t & r | t & i | r & i : t ^ r ^ i;
}
a.prototype._update = function(e) {
for (var t, r = this._w, i = 0 | this._a, n = 0 | this._b, o = 0 | this._c, a = 0 | this._d, u = 0 | this._e, h = 0; h < 16; ++h) r[h] = e.readInt32BE(4 * h);
for (;h < 80; ++h) r[h] = r[h - 3] ^ r[h - 8] ^ r[h - 14] ^ r[h - 16];
for (var d = 0; d < 80; ++d) {
var l = ~~(d / 20), p = ((t = i) << 5 | t >>> 27) + c(l, n, o, a) + u + r[d] + s[l] | 0;
u = a;
a = o;
o = f(n);
n = i;
i = p;
}
this._a = i + this._a | 0;
this._b = n + this._b | 0;
this._c = o + this._c | 0;
this._d = a + this._d | 0;
this._e = u + this._e | 0;
};
a.prototype._hash = function() {
var e = n.allocUnsafe(20);
e.writeInt32BE(0 | this._a, 0);
e.writeInt32BE(0 | this._b, 4);
e.writeInt32BE(0 | this._c, 8);
e.writeInt32BE(0 | this._d, 12);
e.writeInt32BE(0 | this._e, 16);
return e;
};
t.exports = a;
}, {
"./hash": 184,
inherits: 138,
"safe-buffer": 182
} ],
187: [ function(e, t) {
var r = e("inherits"), i = e("./hash"), n = e("safe-buffer").Buffer, s = [ 1518500249, 1859775393, -1894007588, -899497514 ], o = new Array(80);
function a() {
this.init();
this._w = o;
i.call(this, 64, 56);
}
r(a, i);
a.prototype.init = function() {
this._a = 1732584193;
this._b = 4023233417;
this._c = 2562383102;
this._d = 271733878;
this._e = 3285377520;
return this;
};
function f(e) {
return e << 5 | e >>> 27;
}
function c(e) {
return e << 30 | e >>> 2;
}
function u(e, t, r, i) {
return 0 === e ? t & r | ~t & i : 2 === e ? t & r | t & i | r & i : t ^ r ^ i;
}
a.prototype._update = function(e) {
for (var t, r = this._w, i = 0 | this._a, n = 0 | this._b, o = 0 | this._c, a = 0 | this._d, h = 0 | this._e, d = 0; d < 16; ++d) r[d] = e.readInt32BE(4 * d);
for (;d < 80; ++d) r[d] = (t = r[d - 3] ^ r[d - 8] ^ r[d - 14] ^ r[d - 16]) << 1 | t >>> 31;
for (var l = 0; l < 80; ++l) {
var p = ~~(l / 20), b = f(i) + u(p, n, o, a) + h + r[l] + s[p] | 0;
h = a;
a = o;
o = c(n);
n = i;
i = b;
}
this._a = i + this._a | 0;
this._b = n + this._b | 0;
this._c = o + this._c | 0;
this._d = a + this._d | 0;
this._e = h + this._e | 0;
};
a.prototype._hash = function() {
var e = n.allocUnsafe(20);
e.writeInt32BE(0 | this._a, 0);
e.writeInt32BE(0 | this._b, 4);
e.writeInt32BE(0 | this._c, 8);
e.writeInt32BE(0 | this._d, 12);
e.writeInt32BE(0 | this._e, 16);
return e;
};
t.exports = a;
}, {
"./hash": 184,
inherits: 138,
"safe-buffer": 182
} ],
188: [ function(e, t) {
var r = e("inherits"), i = e("./sha256"), n = e("./hash"), s = e("safe-buffer").Buffer, o = new Array(64);
function a() {
this.init();
this._w = o;
n.call(this, 64, 56);
}
r(a, i);
a.prototype.init = function() {
this._a = 3238371032;
this._b = 914150663;
this._c = 812702999;
this._d = 4144912697;
this._e = 4290775857;
this._f = 1750603025;
this._g = 1694076839;
this._h = 3204075428;
return this;
};
a.prototype._hash = function() {
var e = s.allocUnsafe(28);
e.writeInt32BE(this._a, 0);
e.writeInt32BE(this._b, 4);
e.writeInt32BE(this._c, 8);
e.writeInt32BE(this._d, 12);
e.writeInt32BE(this._e, 16);
e.writeInt32BE(this._f, 20);
e.writeInt32BE(this._g, 24);
return e;
};
t.exports = a;
}, {
"./hash": 184,
"./sha256": 189,
inherits: 138,
"safe-buffer": 182
} ],
189: [ function(e, t) {
var r = e("inherits"), i = e("./hash"), n = e("safe-buffer").Buffer, s = [ 1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298 ], o = new Array(64);
function a() {
this.init();
this._w = o;
i.call(this, 64, 56);
}
r(a, i);
a.prototype.init = function() {
this._a = 1779033703;
this._b = 3144134277;
this._c = 1013904242;
this._d = 2773480762;
this._e = 1359893119;
this._f = 2600822924;
this._g = 528734635;
this._h = 1541459225;
return this;
};
function f(e, t, r) {
return r ^ e & (t ^ r);
}
function c(e, t, r) {
return e & t | r & (e | t);
}
function u(e) {
return (e >>> 2 | e << 30) ^ (e >>> 13 | e << 19) ^ (e >>> 22 | e << 10);
}
function h(e) {
return (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
}
function d(e) {
return (e >>> 7 | e << 25) ^ (e >>> 18 | e << 14) ^ e >>> 3;
}
a.prototype._update = function(e) {
for (var t, r = this._w, i = 0 | this._a, n = 0 | this._b, o = 0 | this._c, a = 0 | this._d, l = 0 | this._e, p = 0 | this._f, b = 0 | this._g, m = 0 | this._h, g = 0; g < 16; ++g) r[g] = e.readInt32BE(4 * g);
for (;g < 64; ++g) r[g] = (((t = r[g - 2]) >>> 17 | t << 15) ^ (t >>> 19 | t << 13) ^ t >>> 10) + r[g - 7] + d(r[g - 15]) + r[g - 16] | 0;
for (var y = 0; y < 64; ++y) {
var v = m + h(l) + f(l, p, b) + s[y] + r[y] | 0, w = u(i) + c(i, n, o) | 0;
m = b;
b = p;
p = l;
l = a + v | 0;
a = o;
o = n;
n = i;
i = v + w | 0;
}
this._a = i + this._a | 0;
this._b = n + this._b | 0;
this._c = o + this._c | 0;
this._d = a + this._d | 0;
this._e = l + this._e | 0;
this._f = p + this._f | 0;
this._g = b + this._g | 0;
this._h = m + this._h | 0;
};
a.prototype._hash = function() {
var e = n.allocUnsafe(32);
e.writeInt32BE(this._a, 0);
e.writeInt32BE(this._b, 4);
e.writeInt32BE(this._c, 8);
e.writeInt32BE(this._d, 12);
e.writeInt32BE(this._e, 16);
e.writeInt32BE(this._f, 20);
e.writeInt32BE(this._g, 24);
e.writeInt32BE(this._h, 28);
return e;
};
t.exports = a;
}, {
"./hash": 184,
inherits: 138,
"safe-buffer": 182
} ],
190: [ function(e, t) {
var r = e("inherits"), i = e("./sha512"), n = e("./hash"), s = e("safe-buffer").Buffer, o = new Array(160);
function a() {
this.init();
this._w = o;
n.call(this, 128, 112);
}
r(a, i);
a.prototype.init = function() {
this._ah = 3418070365;
this._bh = 1654270250;
this._ch = 2438529370;
this._dh = 355462360;
this._eh = 1731405415;
this._fh = 2394180231;
this._gh = 3675008525;
this._hh = 1203062813;
this._al = 3238371032;
this._bl = 914150663;
this._cl = 812702999;
this._dl = 4144912697;
this._el = 4290775857;
this._fl = 1750603025;
this._gl = 1694076839;
this._hl = 3204075428;
return this;
};
a.prototype._hash = function() {
var e = s.allocUnsafe(48);
function t(t, r, i) {
e.writeInt32BE(t, i);
e.writeInt32BE(r, i + 4);
}
t(this._ah, this._al, 0);
t(this._bh, this._bl, 8);
t(this._ch, this._cl, 16);
t(this._dh, this._dl, 24);
t(this._eh, this._el, 32);
t(this._fh, this._fl, 40);
return e;
};
t.exports = a;
}, {
"./hash": 184,
"./sha512": 191,
inherits: 138,
"safe-buffer": 182
} ],
191: [ function(e, t) {
var r = e("inherits"), i = e("./hash"), n = e("safe-buffer").Buffer, s = [ 1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591 ], o = new Array(160);
function a() {
this.init();
this._w = o;
i.call(this, 128, 112);
}
r(a, i);
a.prototype.init = function() {
this._ah = 1779033703;
this._bh = 3144134277;
this._ch = 1013904242;
this._dh = 2773480762;
this._eh = 1359893119;
this._fh = 2600822924;
this._gh = 528734635;
this._hh = 1541459225;
this._al = 4089235720;
this._bl = 2227873595;
this._cl = 4271175723;
this._dl = 1595750129;
this._el = 2917565137;
this._fl = 725511199;
this._gl = 4215389547;
this._hl = 327033209;
return this;
};
function f(e, t, r) {
return r ^ e & (t ^ r);
}
function c(e, t, r) {
return e & t | r & (e | t);
}
function u(e, t) {
return (e >>> 28 | t << 4) ^ (t >>> 2 | e << 30) ^ (t >>> 7 | e << 25);
}
function h(e, t) {
return (e >>> 14 | t << 18) ^ (e >>> 18 | t << 14) ^ (t >>> 9 | e << 23);
}
function d(e, t) {
return (e >>> 1 | t << 31) ^ (e >>> 8 | t << 24) ^ e >>> 7;
}
function l(e, t) {
return (e >>> 1 | t << 31) ^ (e >>> 8 | t << 24) ^ (e >>> 7 | t << 25);
}
function p(e, t) {
return (e >>> 19 | t << 13) ^ (t >>> 29 | e << 3) ^ e >>> 6;
}
function b(e, t) {
return (e >>> 19 | t << 13) ^ (t >>> 29 | e << 3) ^ (e >>> 6 | t << 26);
}
function m(e, t) {
return e >>> 0 < t >>> 0 ? 1 : 0;
}
a.prototype._update = function(e) {
for (var t = this._w, r = 0 | this._ah, i = 0 | this._bh, n = 0 | this._ch, o = 0 | this._dh, a = 0 | this._eh, g = 0 | this._fh, y = 0 | this._gh, v = 0 | this._hh, w = 0 | this._al, _ = 0 | this._bl, S = 0 | this._cl, E = 0 | this._dl, M = 0 | this._el, A = 0 | this._fl, k = 0 | this._gl, R = 0 | this._hl, x = 0; x < 32; x += 2) {
t[x] = e.readInt32BE(4 * x);
t[x + 1] = e.readInt32BE(4 * x + 4);
}
for (;x < 160; x += 2) {
var I = t[x - 30], T = t[x - 30 + 1], B = d(I, T), j = l(T, I), N = p(I = t[x - 4], T = t[x - 4 + 1]), P = b(T, I), C = t[x - 14], L = t[x - 14 + 1], O = t[x - 32], D = t[x - 32 + 1], U = j + L | 0, q = B + C + m(U, j) | 0;
q = (q = q + N + m(U = U + P | 0, P) | 0) + O + m(U = U + D | 0, D) | 0;
t[x] = q;
t[x + 1] = U;
}
for (var F = 0; F < 160; F += 2) {
q = t[F];
U = t[F + 1];
var z = c(r, i, n), $ = c(w, _, S), K = u(r, w), H = u(w, r), W = h(a, M), V = h(M, a), G = s[F], X = s[F + 1], Y = f(a, g, y), J = f(M, A, k), Z = R + V | 0, Q = v + W + m(Z, R) | 0;
Q = (Q = (Q = Q + Y + m(Z = Z + J | 0, J) | 0) + G + m(Z = Z + X | 0, X) | 0) + q + m(Z = Z + U | 0, U) | 0;
var ee = H + $ | 0, te = K + z + m(ee, H) | 0;
v = y;
R = k;
y = g;
k = A;
g = a;
A = M;
a = o + Q + m(M = E + Z | 0, E) | 0;
o = n;
E = S;
n = i;
S = _;
i = r;
_ = w;
r = Q + te + m(w = Z + ee | 0, Z) | 0;
}
this._al = this._al + w | 0;
this._bl = this._bl + _ | 0;
this._cl = this._cl + S | 0;
this._dl = this._dl + E | 0;
this._el = this._el + M | 0;
this._fl = this._fl + A | 0;
this._gl = this._gl + k | 0;
this._hl = this._hl + R | 0;
this._ah = this._ah + r + m(this._al, w) | 0;
this._bh = this._bh + i + m(this._bl, _) | 0;
this._ch = this._ch + n + m(this._cl, S) | 0;
this._dh = this._dh + o + m(this._dl, E) | 0;
this._eh = this._eh + a + m(this._el, M) | 0;
this._fh = this._fh + g + m(this._fl, A) | 0;
this._gh = this._gh + y + m(this._gl, k) | 0;
this._hh = this._hh + v + m(this._hl, R) | 0;
};
a.prototype._hash = function() {
var e = n.allocUnsafe(64);
function t(t, r, i) {
e.writeInt32BE(t, i);
e.writeInt32BE(r, i + 4);
}
t(this._ah, this._al, 0);
t(this._bh, this._bl, 8);
t(this._ch, this._cl, 16);
t(this._dh, this._dl, 24);
t(this._eh, this._el, 32);
t(this._fh, this._fl, 40);
t(this._gh, this._gl, 48);
t(this._hh, this._hl, 56);
return e;
};
t.exports = a;
}, {
"./hash": 184,
inherits: 138,
"safe-buffer": 182
} ],
192: [ function(e, t) {
t.exports = i;
var r = e("events").EventEmitter;
e("inherits")(i, r);
i.Readable = e("readable-stream/readable.js");
i.Writable = e("readable-stream/writable.js");
i.Duplex = e("readable-stream/duplex.js");
i.Transform = e("readable-stream/transform.js");
i.PassThrough = e("readable-stream/passthrough.js");
i.Stream = i;
function i() {
r.call(this);
}
i.prototype.pipe = function(e, t) {
var i = this;
function n(t) {
e.writable && !1 === e.write(t) && i.pause && i.pause();
}
i.on("data", n);
function s() {
i.readable && i.resume && i.resume();
}
e.on("drain", s);
if (!(e._isStdio || t && !1 === t.end)) {
i.on("end", a);
i.on("close", f);
}
var o = !1;
function a() {
if (!o) {
o = !0;
e.end();
}
}
function f() {
if (!o) {
o = !0;
"function" == typeof e.destroy && e.destroy();
}
}
function c(e) {
u();
if (0 === r.listenerCount(this, "error")) throw e;
}
i.on("error", c);
e.on("error", c);
function u() {
i.removeListener("data", n);
e.removeListener("drain", s);
i.removeListener("end", a);
i.removeListener("close", f);
i.removeListener("error", c);
e.removeListener("error", c);
i.removeListener("end", u);
i.removeListener("close", u);
e.removeListener("close", u);
}
i.on("end", u);
i.on("close", u);
e.on("close", u);
e.emit("pipe", i);
return e;
};
}, {
events: 104,
inherits: 138,
"readable-stream/duplex.js": 166,
"readable-stream/passthrough.js": 177,
"readable-stream/readable.js": 178,
"readable-stream/transform.js": 179,
"readable-stream/writable.js": 180
} ],
193: [ function(e, t, r) {
var i = e("buffer").Buffer, n = i.isEncoding || function(e) {
switch (e && e.toLowerCase()) {
case "hex":
case "utf8":
case "utf-8":
case "ascii":
case "binary":
case "base64":
case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
case "raw":
return !0;

default:
return !1;
}
};
function s(e) {
if (e && !n(e)) throw new Error("Unknown encoding: " + e);
}
var o = r.StringDecoder = function(e) {
this.encoding = (e || "utf8").toLowerCase().replace(/[-_]/, "");
s(e);
switch (this.encoding) {
case "utf8":
this.surrogateSize = 3;
break;

case "ucs2":
case "utf16le":
this.surrogateSize = 2;
this.detectIncompleteChar = f;
break;

case "base64":
this.surrogateSize = 3;
this.detectIncompleteChar = c;
break;

default:
this.write = a;
return;
}
this.charBuffer = new i(6);
this.charReceived = 0;
this.charLength = 0;
};
o.prototype.write = function(e) {
for (var t = ""; this.charLength; ) {
var r = e.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : e.length;
e.copy(this.charBuffer, this.charReceived, 0, r);
this.charReceived += r;
if (this.charReceived < this.charLength) return "";
e = e.slice(r, e.length);
if (!((i = (t = this.charBuffer.slice(0, this.charLength).toString(this.encoding)).charCodeAt(t.length - 1)) >= 55296 && i <= 56319)) {
this.charReceived = this.charLength = 0;
if (0 === e.length) return t;
break;
}
this.charLength += this.surrogateSize;
t = "";
}
this.detectIncompleteChar(e);
var i, n = e.length;
if (this.charLength) {
e.copy(this.charBuffer, 0, e.length - this.charReceived, n);
n -= this.charReceived;
}
n = (t += e.toString(this.encoding, 0, n)).length - 1;
if ((i = t.charCodeAt(n)) >= 55296 && i <= 56319) {
var s = this.surrogateSize;
this.charLength += s;
this.charReceived += s;
this.charBuffer.copy(this.charBuffer, s, 0, s);
e.copy(this.charBuffer, 0, 0, s);
return t.substring(0, n);
}
return t;
};
o.prototype.detectIncompleteChar = function(e) {
for (var t = e.length >= 3 ? 3 : e.length; t > 0; t--) {
var r = e[e.length - t];
if (1 == t && r >> 5 == 6) {
this.charLength = 2;
break;
}
if (t <= 2 && r >> 4 == 14) {
this.charLength = 3;
break;
}
if (t <= 3 && r >> 3 == 30) {
this.charLength = 4;
break;
}
}
this.charReceived = t;
};
o.prototype.end = function(e) {
var t = "";
e && e.length && (t = this.write(e));
if (this.charReceived) {
var r = this.charReceived, i = this.charBuffer, n = this.encoding;
t += i.slice(0, r).toString(n);
}
return t;
};
function a(e) {
return e.toString(this.encoding);
}
function f(e) {
this.charReceived = e.length % 2;
this.charLength = this.charReceived ? 2 : 0;
}
function c(e) {
this.charReceived = e.length % 3;
this.charLength = this.charReceived ? 3 : 0;
}
}, {
buffer: 65
} ],
194: [ function(e, t) {
(function(e) {
t.exports = function(e, t) {
if (r("noDeprecation")) return e;
var i = !1;
return function() {
if (!i) {
if (r("throwDeprecation")) throw new Error(t);
r("traceDeprecation") ? console.trace(t) : console.warn(t);
i = !0;
}
return e.apply(this, arguments);
};
};
function r(t) {
try {
if (!e.localStorage) return !1;
} catch (e) {
return !1;
}
var r = e.localStorage[t];
return null != r && "true" === String(r).toLowerCase();
}
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {} ],
195: [ function(e, t) {
"function" == typeof Object.create ? t.exports = function(e, t) {
e.super_ = t;
e.prototype = Object.create(t.prototype, {
constructor: {
value: e,
enumerable: !1,
writable: !0,
configurable: !0
}
});
} : t.exports = function(e, t) {
e.super_ = t;
var r = function() {};
r.prototype = t.prototype;
e.prototype = new r();
e.prototype.constructor = e;
};
}, {} ],
196: [ function(e, t) {
t.exports = function(e) {
return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8;
};
}, {} ],
197: [ function(e, t, r) {
(function(t, i) {
var n = /%[sdj%]/g;
r.format = function(e) {
if (!_(e)) {
for (var t = [], r = 0; r < arguments.length; r++) t.push(a(arguments[r]));
return t.join(" ");
}
r = 1;
for (var i = arguments, s = i.length, o = String(e).replace(n, function(e) {
if ("%%" === e) return "%";
if (r >= s) return e;
switch (e) {
case "%s":
return String(i[r++]);

case "%d":
return Number(i[r++]);

case "%j":
try {
return JSON.stringify(i[r++]);
} catch (e) {
return "[Circular]";
}

default:
return e;
}
}), f = i[r]; r < s; f = i[++r]) v(f) || !M(f) ? o += " " + f : o += " " + a(f);
return o;
};
r.deprecate = function(e, n) {
if (S(i.process)) return function() {
return r.deprecate(e, n).apply(this, arguments);
};
if (!0 === t.noDeprecation) return e;
var s = !1;
return function() {
if (!s) {
if (t.throwDeprecation) throw new Error(n);
t.traceDeprecation ? console.trace(n) : console.error(n);
s = !0;
}
return e.apply(this, arguments);
};
};
var s, o = {};
r.debuglog = function(e) {
S(s) && (s = t.env.NODE_DEBUG || "");
e = e.toUpperCase();
if (!o[e]) if (new RegExp("\\b" + e + "\\b", "i").test(s)) {
var i = t.pid;
o[e] = function() {
var t = r.format.apply(r, arguments);
console.error("%s %d: %s", e, i, t);
};
} else o[e] = function() {};
return o[e];
};
function a(e, t) {
var i = {
seen: [],
stylize: c
};
arguments.length >= 3 && (i.depth = arguments[2]);
arguments.length >= 4 && (i.colors = arguments[3]);
y(t) ? i.showHidden = t : t && r._extend(i, t);
S(i.showHidden) && (i.showHidden = !1);
S(i.depth) && (i.depth = 2);
S(i.colors) && (i.colors = !1);
S(i.customInspect) && (i.customInspect = !0);
i.colors && (i.stylize = f);
return h(i, e, i.depth);
}
r.inspect = a;
a.colors = {
bold: [ 1, 22 ],
italic: [ 3, 23 ],
underline: [ 4, 24 ],
inverse: [ 7, 27 ],
white: [ 37, 39 ],
grey: [ 90, 39 ],
black: [ 30, 39 ],
blue: [ 34, 39 ],
cyan: [ 36, 39 ],
green: [ 32, 39 ],
magenta: [ 35, 39 ],
red: [ 31, 39 ],
yellow: [ 33, 39 ]
};
a.styles = {
special: "cyan",
number: "yellow",
boolean: "yellow",
undefined: "grey",
null: "bold",
string: "green",
date: "magenta",
regexp: "red"
};
function f(e, t) {
var r = a.styles[t];
return r ? "[" + a.colors[r][0] + "m" + e + "[" + a.colors[r][1] + "m" : e;
}
function c(e) {
return e;
}
function u(e) {
var t = {};
e.forEach(function(e) {
t[e] = !0;
});
return t;
}
function h(e, t, i) {
if (e.customInspect && t && R(t.inspect) && t.inspect !== r.inspect && (!t.constructor || t.constructor.prototype !== t)) {
var n = t.inspect(i, e);
_(n) || (n = h(e, n, i));
return n;
}
var s = d(e, t);
if (s) return s;
var o = Object.keys(t), a = u(o);
e.showHidden && (o = Object.getOwnPropertyNames(t));
if (k(t) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0)) return l(t);
if (0 === o.length) {
if (R(t)) {
var f = t.name ? ": " + t.name : "";
return e.stylize("[Function" + f + "]", "special");
}
if (E(t)) return e.stylize(RegExp.prototype.toString.call(t), "regexp");
if (A(t)) return e.stylize(Date.prototype.toString.call(t), "date");
if (k(t)) return l(t);
}
var c, y = "", v = !1, w = [ "{", "}" ];
if (g(t)) {
v = !0;
w = [ "[", "]" ];
}
R(t) && (y = " [Function" + (t.name ? ": " + t.name : "") + "]");
E(t) && (y = " " + RegExp.prototype.toString.call(t));
A(t) && (y = " " + Date.prototype.toUTCString.call(t));
k(t) && (y = " " + l(t));
if (0 === o.length && (!v || 0 == t.length)) return w[0] + y + w[1];
if (i < 0) return E(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special");
e.seen.push(t);
c = v ? p(e, t, i, a, o) : o.map(function(r) {
return b(e, t, i, a, r, v);
});
e.seen.pop();
return m(c, y, w);
}
function d(e, t) {
if (S(t)) return e.stylize("undefined", "undefined");
if (_(t)) {
var r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
return e.stylize(r, "string");
}
return w(t) ? e.stylize("" + t, "number") : y(t) ? e.stylize("" + t, "boolean") : v(t) ? e.stylize("null", "null") : void 0;
}
function l(e) {
return "[" + Error.prototype.toString.call(e) + "]";
}
function p(e, t, r, i, n) {
for (var s = [], o = 0, a = t.length; o < a; ++o) j(t, String(o)) ? s.push(b(e, t, r, i, String(o), !0)) : s.push("");
n.forEach(function(n) {
n.match(/^\d+$/) || s.push(b(e, t, r, i, n, !0));
});
return s;
}
function b(e, t, r, i, n, s) {
var o, a, f;
(f = Object.getOwnPropertyDescriptor(t, n) || {
value: t[n]
}).get ? a = f.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : f.set && (a = e.stylize("[Setter]", "special"));
j(i, n) || (o = "[" + n + "]");
a || (e.seen.indexOf(f.value) < 0 ? (a = v(r) ? h(e, f.value, null) : h(e, f.value, r - 1)).indexOf("\n") > -1 && (a = s ? a.split("\n").map(function(e) {
return "  " + e;
}).join("\n").substr(2) : "\n" + a.split("\n").map(function(e) {
return "   " + e;
}).join("\n")) : a = e.stylize("[Circular]", "special"));
if (S(o)) {
if (s && n.match(/^\d+$/)) return a;
if ((o = JSON.stringify("" + n)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
o = o.substr(1, o.length - 2);
o = e.stylize(o, "name");
} else {
o = o.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
o = e.stylize(o, "string");
}
}
return o + ": " + a;
}
function m(e, t, r) {
return e.reduce(function(e, t) {
t.indexOf("\n");
return e + t.replace(/\u001b\[\d\d?m/g, "").length + 1;
}, 0) > 60 ? r[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + r[1] : r[0] + t + " " + e.join(", ") + " " + r[1];
}
function g(e) {
return Array.isArray(e);
}
r.isArray = g;
function y(e) {
return "boolean" == typeof e;
}
r.isBoolean = y;
function v(e) {
return null === e;
}
r.isNull = v;
r.isNullOrUndefined = function(e) {
return null == e;
};
function w(e) {
return "number" == typeof e;
}
r.isNumber = w;
function _(e) {
return "string" == typeof e;
}
r.isString = _;
r.isSymbol = function(e) {
return "symbol" == typeof e;
};
function S(e) {
return void 0 === e;
}
r.isUndefined = S;
function E(e) {
return M(e) && "[object RegExp]" === x(e);
}
r.isRegExp = E;
function M(e) {
return "object" == typeof e && null !== e;
}
r.isObject = M;
function A(e) {
return M(e) && "[object Date]" === x(e);
}
r.isDate = A;
function k(e) {
return M(e) && ("[object Error]" === x(e) || e instanceof Error);
}
r.isError = k;
function R(e) {
return "function" == typeof e;
}
r.isFunction = R;
r.isPrimitive = function(e) {
return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e;
};
r.isBuffer = e("./support/isBuffer");
function x(e) {
return Object.prototype.toString.call(e);
}
function I(e) {
return e < 10 ? "0" + e.toString(10) : e.toString(10);
}
var T = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
function B() {
var e = new Date(), t = [ I(e.getHours()), I(e.getMinutes()), I(e.getSeconds()) ].join(":");
return [ e.getDate(), T[e.getMonth()], t ].join(" ");
}
r.log = function() {
console.log("%s - %s", B(), r.format.apply(r, arguments));
};
r.inherits = e("inherits");
r._extend = function(e, t) {
if (!t || !M(t)) return e;
for (var r = Object.keys(t), i = r.length; i--; ) e[r[i]] = t[r[i]];
return e;
};
function j(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}
}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"./support/isBuffer": 196,
_process: 156,
inherits: 195
} ],
198: [ function(e, t) {
"use strict";
var r = e("buffer").Buffer, i = e("buffer").SlowBuffer;
t.exports = n;
function n(e, t) {
if (!r.isBuffer(e) || !r.isBuffer(t)) return !1;
if (e.length !== t.length) return !1;
for (var i = 0, n = 0; n < e.length; n++) i |= e[n] ^ t[n];
return 0 === i;
}
n.install = function() {
r.prototype.equal = i.prototype.equal = function(e) {
return n(this, e);
};
};
var s = r.prototype.equal, o = i.prototype.equal;
n.restore = function() {
r.prototype.equal = s;
i.prototype.equal = o;
};
}, {
buffer: 65
} ],
199: [ function(e, t) {
"use strict";
var r = e("safe-buffer").Buffer, i = e("./param-bytes-for-alg"), n = 128;
function s(e) {
if (r.isBuffer(e)) return e;
if ("string" == typeof e) return r.from(e, "base64");
throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
}
function o(e, t, r) {
for (var i = 0; t + i < r && 0 === e[t + i]; ) ++i;
e[t + i] >= n && --i;
return i;
}
t.exports = {
derToJose: function(e, t) {
e = s(e);
var o = i(t), a = o + 1, f = e.length, c = 0;
if (48 !== e[c++]) throw new Error('Could not find expected "seq"');
var u = e[c++];
u === (1 | n) && (u = e[c++]);
if (f - c < u) throw new Error('"seq" specified length of "' + u + '", only "' + (f - c) + '" remaining');
if (2 !== e[c++]) throw new Error('Could not find expected "int" for "r"');
var h = e[c++];
if (f - c - 2 < h) throw new Error('"r" specified length of "' + h + '", only "' + (f - c - 2) + '" available');
if (a < h) throw new Error('"r" specified length of "' + h + '", max of "' + a + '" is acceptable');
var d = c;
c += h;
if (2 !== e[c++]) throw new Error('Could not find expected "int" for "s"');
var l = e[c++];
if (f - c !== l) throw new Error('"s" specified length of "' + l + '", expected "' + (f - c) + '"');
if (a < l) throw new Error('"s" specified length of "' + l + '", max of "' + a + '" is acceptable');
var p = c;
if ((c += l) !== f) throw new Error('Expected to consume entire buffer, but "' + (f - c) + '" bytes remain');
var b = o - h, m = o - l, g = r.allocUnsafe(b + h + m + l);
for (c = 0; c < b; ++c) g[c] = 0;
e.copy(g, c, d + Math.max(-b, 0), d + h);
for (var y = c = o; c < y + m; ++c) g[c] = 0;
e.copy(g, c, p + Math.max(-m, 0), p + l);
return (g = g.toString("base64")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
},
joseToDer: function(e, t) {
e = s(e);
var a = i(t), f = e.length;
if (f !== 2 * a) throw new TypeError('"' + t + '" signatures must be "' + 2 * a + '" bytes, saw "' + f + '"');
var c = o(e, 0, a), u = o(e, a, e.length), h = a - c, d = a - u, l = 2 + h + 1 + 1 + d, p = l < n, b = r.allocUnsafe((p ? 2 : 3) + l), m = 0;
b[m++] = 48;
if (p) b[m++] = l; else {
b[m++] = 1 | n;
b[m++] = 255 & l;
}
b[m++] = 2;
b[m++] = h;
if (c < 0) {
b[m++] = 0;
m += e.copy(b, m, 0, a);
} else m += e.copy(b, m, c, a);
b[m++] = 2;
b[m++] = d;
if (u < 0) {
b[m++] = 0;
e.copy(b, m, a);
} else e.copy(b, m, a + u);
return b;
}
};
}, {
"./param-bytes-for-alg": 200,
"safe-buffer": 227
} ],
200: [ function(e, t) {
"use strict";
function r(e) {
return (e / 8 | 0) + (e % 8 == 0 ? 0 : 1);
}
var i = {
ES256: r(256),
ES384: r(384),
ES512: r(521)
};
t.exports = function(e) {
var t = i[e];
if (t) return t;
throw new Error('Unknown algorithm "' + e + '"');
};
}, {} ],
201: [ function(e, t) {
var r = e("jws");
t.exports = function(e, t) {
t = t || {};
var i = r.decode(e, t);
if (!i) return null;
var n = i.payload;
if ("string" == typeof n) try {
var s = JSON.parse(n);
null !== s && "object" == typeof s && (n = s);
} catch (e) {}
return !0 === t.complete ? {
header: i.header,
payload: n,
signature: i.signature
} : n;
};
}, {
jws: 214
} ],
202: [ function(e, t) {
t.exports = {
decode: e("./decode"),
verify: e("./verify"),
sign: e("./sign"),
JsonWebTokenError: e("./lib/JsonWebTokenError"),
NotBeforeError: e("./lib/NotBeforeError"),
TokenExpiredError: e("./lib/TokenExpiredError")
};
}, {
"./decode": 201,
"./lib/JsonWebTokenError": 203,
"./lib/NotBeforeError": 204,
"./lib/TokenExpiredError": 205,
"./sign": 211,
"./verify": 212
} ],
203: [ function(e, t) {
var r = function(e, t) {
Error.call(this, e);
Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
this.name = "JsonWebTokenError";
this.message = e;
t && (this.inner = t);
};
(r.prototype = Object.create(Error.prototype)).constructor = r;
t.exports = r;
}, {} ],
204: [ function(e, t) {
var r = e("./JsonWebTokenError"), i = function(e, t) {
r.call(this, e);
this.name = "NotBeforeError";
this.date = t;
};
(i.prototype = Object.create(r.prototype)).constructor = i;
t.exports = i;
}, {
"./JsonWebTokenError": 203
} ],
205: [ function(e, t) {
var r = e("./JsonWebTokenError"), i = function(e, t) {
r.call(this, e);
this.name = "TokenExpiredError";
this.expiredAt = t;
};
(i.prototype = Object.create(r.prototype)).constructor = i;
t.exports = i;
}, {
"./JsonWebTokenError": 203
} ],
206: [ function(e, t) {
(function(r) {
const i = e("semver");
t.exports = i.satisfies(r.version, ">=15.7.0");
}).call(this, e("_process"));
}, {
_process: 156,
semver: 255
} ],
207: [ function(e, t) {
(function(r) {
var i = e("semver");
t.exports = i.satisfies(r.version, "^6.12.0 || >=8.0.0");
}).call(this, e("_process"));
}, {
_process: 156,
semver: 255
} ],
208: [ function(e, t) {
(function(r) {
const i = e("semver");
t.exports = i.satisfies(r.version, ">=16.9.0");
}).call(this, e("_process"));
}, {
_process: 156,
semver: 255
} ],
209: [ function(e, t) {
var r = e("ms");
t.exports = function(e, t) {
var i = t || Math.floor(Date.now() / 1e3);
if ("string" == typeof e) {
var n = r(e);
if ("undefined" == typeof n) return;
return Math.floor(i + n / 1e3);
}
return "number" == typeof e ? i + e : void 0;
};
}, {
ms: 226
} ],
210: [ function(e, t) {
const r = e("./asymmetricKeyDetailsSupported"), i = e("./rsaPssKeyDetailsSupported"), n = {
ec: [ "ES256", "ES384", "ES512" ],
rsa: [ "RS256", "PS256", "RS384", "PS384", "RS512", "PS512" ],
"rsa-pss": [ "PS256", "PS384", "PS512" ]
}, s = {
ES256: "prime256v1",
ES384: "secp384r1",
ES512: "secp521r1"
};
t.exports = function(e, t) {
if (!e || !t) return;
const o = t.asymmetricKeyType;
if (!o) return;
const a = n[o];
if (!a) throw new Error(`Unknown key type "${o}".`);
if (!a.includes(e)) throw new Error(`"alg" parameter for "${o}" key type must be one of: ${a.join(", ")}.`);
if (r) switch (o) {
case "ec":
const r = t.asymmetricKeyDetails.namedCurve, n = s[e];
if (r !== n) throw new Error(`"alg" parameter "${e}" requires curve "${n}".`);
break;

case "rsa-pss":
if (i) {
const r = parseInt(e.slice(-3), 10), {hashAlgorithm: i, mgf1HashAlgorithm: n, saltLength: s} = t.asymmetricKeyDetails;
if (i !== `sha${r}` || n !== i) throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${e}.`);
if (void 0 !== s && s > r >> 3) throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${e}.`);
}
}
};
}, {
"./asymmetricKeyDetailsSupported": 206,
"./rsaPssKeyDetailsSupported": 208
} ],
211: [ function(e, t) {
(function(r) {
const i = e("./lib/timespan"), n = e("./lib/psSupported"), s = e("./lib/validateAsymmetricKey"), o = e("jws"), a = e("lodash.includes"), f = e("lodash.isboolean"), c = e("lodash.isinteger"), u = e("lodash.isnumber"), h = e("lodash.isplainobject"), d = e("lodash.isstring"), l = e("lodash.once"), {KeyObject: p, createSecretKey: b, createPrivateKey: m} = e("crypto"), g = [ "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none" ];
n && g.splice(3, 0, "PS256", "PS384", "PS512");
const y = {
expiresIn: {
isValid: function(e) {
return c(e) || d(e) && e;
},
message: '"expiresIn" should be a number of seconds or string representing a timespan'
},
notBefore: {
isValid: function(e) {
return c(e) || d(e) && e;
},
message: '"notBefore" should be a number of seconds or string representing a timespan'
},
audience: {
isValid: function(e) {
return d(e) || Array.isArray(e);
},
message: '"audience" must be a string or array'
},
algorithm: {
isValid: a.bind(null, g),
message: '"algorithm" must be a valid string enum value'
},
header: {
isValid: h,
message: '"header" must be an object'
},
encoding: {
isValid: d,
message: '"encoding" must be a string'
},
issuer: {
isValid: d,
message: '"issuer" must be a string'
},
subject: {
isValid: d,
message: '"subject" must be a string'
},
jwtid: {
isValid: d,
message: '"jwtid" must be a string'
},
noTimestamp: {
isValid: f,
message: '"noTimestamp" must be a boolean'
},
keyid: {
isValid: d,
message: '"keyid" must be a string'
},
mutatePayload: {
isValid: f,
message: '"mutatePayload" must be a boolean'
},
allowInsecureKeySizes: {
isValid: f,
message: '"allowInsecureKeySizes" must be a boolean'
},
allowInvalidAsymmetricKeyTypes: {
isValid: f,
message: '"allowInvalidAsymmetricKeyTypes" must be a boolean'
}
}, v = {
iat: {
isValid: u,
message: '"iat" should be a number of seconds'
},
exp: {
isValid: u,
message: '"exp" should be a number of seconds'
},
nbf: {
isValid: u,
message: '"nbf" should be a number of seconds'
}
};
function w(e, t, r, i) {
if (!h(r)) throw new Error('Expected "' + i + '" to be a plain object.');
Object.keys(r).forEach(function(n) {
const s = e[n];
if (s) {
if (!s.isValid(r[n])) throw new Error(s.message);
} else if (!t) throw new Error('"' + n + '" is not allowed in "' + i + '"');
});
}
function _(e) {
return w(y, !1, e, "options");
}
function S(e) {
return w(v, !0, e, "payload");
}
const E = {
audience: "aud",
issuer: "iss",
subject: "sub",
jwtid: "jti"
}, M = [ "expiresIn", "notBefore", "noTimestamp", "audience", "issuer", "subject", "jwtid" ];
t.exports = function(e, t, n, a) {
if ("function" == typeof n) {
a = n;
n = {};
} else n = n || {};
const f = "object" == typeof e && !r.isBuffer(e), c = Object.assign({
alg: n.algorithm || "HS256",
typ: f ? "JWT" : void 0,
kid: n.keyid
}, n.header);
function u(e) {
if (a) return a(e);
throw e;
}
if (!t && "none" !== n.algorithm) return u(new Error("secretOrPrivateKey must have a value"));
if (null != t && !(t instanceof p)) try {
t = m(t);
} catch (e) {
try {
t = b("string" == typeof t ? r.from(t) : t);
} catch (e) {
return u(new Error("secretOrPrivateKey is not valid key material"));
}
}
if (c.alg.startsWith("HS") && "secret" !== t.type) return u(new Error(`secretOrPrivateKey must be a symmetric key when using ${c.alg}`));
if (/^(?:RS|PS|ES)/.test(c.alg)) {
if ("private" !== t.type) return u(new Error(`secretOrPrivateKey must be an asymmetric key when using ${c.alg}`));
if (!n.allowInsecureKeySizes && !c.alg.startsWith("ES") && void 0 !== t.asymmetricKeyDetails && t.asymmetricKeyDetails.modulusLength < 2048) return u(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${c.alg}`));
}
if ("undefined" == typeof e) return u(new Error("payload is required"));
if (f) {
try {
S(e);
} catch (e) {
return u(e);
}
n.mutatePayload || (e = Object.assign({}, e));
} else {
const t = M.filter(function(e) {
return "undefined" != typeof n[e];
});
if (t.length > 0) return u(new Error("invalid " + t.join(",") + " option for " + typeof e + " payload"));
}
if ("undefined" != typeof e.exp && "undefined" != typeof n.expiresIn) return u(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
if ("undefined" != typeof e.nbf && "undefined" != typeof n.notBefore) return u(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
try {
_(n);
} catch (e) {
return u(e);
}
if (!n.allowInvalidAsymmetricKeyTypes) try {
s(c.alg, t);
} catch (e) {
return u(e);
}
const h = e.iat || Math.floor(Date.now() / 1e3);
n.noTimestamp ? delete e.iat : f && (e.iat = h);
if ("undefined" != typeof n.notBefore) {
try {
e.nbf = i(n.notBefore, h);
} catch (e) {
return u(e);
}
if ("undefined" == typeof e.nbf) return u(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
}
if ("undefined" != typeof n.expiresIn && "object" == typeof e) {
try {
e.exp = i(n.expiresIn, h);
} catch (e) {
return u(e);
}
if ("undefined" == typeof e.exp) return u(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
}
Object.keys(E).forEach(function(t) {
const r = E[t];
if ("undefined" != typeof n[t]) {
if ("undefined" != typeof e[r]) return u(new Error('Bad "options.' + t + '" option. The payload already has an "' + r + '" property.'));
e[r] = n[t];
}
});
const d = n.encoding || "utf8";
if ("function" != typeof a) {
let r = o.sign({
header: c,
payload: e,
secret: t,
encoding: d
});
if (!n.allowInsecureKeySizes && /^(?:RS|PS)/.test(c.alg) && r.length < 256) throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${c.alg}`);
return r;
}
a = a && l(a);
o.createSign({
header: c,
privateKey: t,
payload: e,
encoding: d
}).once("error", a).once("done", function(e) {
if (!n.allowInsecureKeySizes && /^(?:RS|PS)/.test(c.alg) && e.length < 256) return a(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${c.alg}`));
a(null, e);
});
};
}).call(this, e("buffer").Buffer);
}, {
"./lib/psSupported": 207,
"./lib/timespan": 209,
"./lib/validateAsymmetricKey": 210,
buffer: 65,
crypto: 75,
jws: 214,
"lodash.includes": 219,
"lodash.isboolean": 220,
"lodash.isinteger": 221,
"lodash.isnumber": 222,
"lodash.isplainobject": 223,
"lodash.isstring": 224,
"lodash.once": 225
} ],
212: [ function(e, t) {
(function(r) {
const i = e("./lib/JsonWebTokenError"), n = e("./lib/NotBeforeError"), s = e("./lib/TokenExpiredError"), o = e("./decode"), a = e("./lib/timespan"), f = e("./lib/validateAsymmetricKey"), c = e("./lib/psSupported"), u = e("jws"), {KeyObject: h, createSecretKey: d, createPublicKey: l} = e("crypto"), p = [ "RS256", "RS384", "RS512" ], b = [ "ES256", "ES384", "ES512" ], m = [ "RS256", "RS384", "RS512" ], g = [ "HS256", "HS384", "HS512" ];
if (c) {
p.splice(p.length, 0, "PS256", "PS384", "PS512");
m.splice(m.length, 0, "PS256", "PS384", "PS512");
}
t.exports = function(e, t, c, y) {
if ("function" == typeof c && !y) {
y = c;
c = {};
}
c || (c = {});
c = Object.assign({}, c);
let v;
v = y || function(e, t) {
if (e) throw e;
return t;
};
if (c.clockTimestamp && "number" != typeof c.clockTimestamp) return v(new i("clockTimestamp must be a number"));
if (void 0 !== c.nonce && ("string" != typeof c.nonce || "" === c.nonce.trim())) return v(new i("nonce must be a non-empty string"));
if (void 0 !== c.allowInvalidAsymmetricKeyTypes && "boolean" != typeof c.allowInvalidAsymmetricKeyTypes) return v(new i("allowInvalidAsymmetricKeyTypes must be a boolean"));
const w = c.clockTimestamp || Math.floor(Date.now() / 1e3);
if (!e) return v(new i("jwt must be provided"));
if ("string" != typeof e) return v(new i("jwt must be a string"));
const _ = e.split(".");
if (3 !== _.length) return v(new i("jwt malformed"));
let S;
try {
S = o(e, {
complete: !0
});
} catch (e) {
return v(e);
}
if (!S) return v(new i("invalid token"));
const E = S.header;
let M;
if ("function" == typeof t) {
if (!y) return v(new i("verify must be called asynchronous if secret or public key is provided as a callback"));
M = t;
} else M = function(e, r) {
return r(null, t);
};
return M(E, function(t, o) {
if (t) return v(new i("error in secret or public key callback: " + t.message));
const y = "" !== _[2].trim();
if (!y && o) return v(new i("jwt signature is required"));
if (y && !o) return v(new i("secret or public key must be provided"));
if (!y && !c.algorithms) return v(new i('please specify "none" in "algorithms" to verify unsigned tokens'));
if (null != o && !(o instanceof h)) try {
o = l(o);
} catch (e) {
try {
o = d("string" == typeof o ? r.from(o) : o);
} catch (e) {
return v(new i("secretOrPublicKey is not valid key material"));
}
}
c.algorithms || ("secret" === o.type ? c.algorithms = g : [ "rsa", "rsa-pss" ].includes(o.asymmetricKeyType) ? c.algorithms = m : "ec" === o.asymmetricKeyType ? c.algorithms = b : c.algorithms = p);
if (-1 === c.algorithms.indexOf(S.header.alg)) return v(new i("invalid algorithm"));
if (E.alg.startsWith("HS") && "secret" !== o.type) return v(new i(`secretOrPublicKey must be a symmetric key when using ${E.alg}`));
if (/^(?:RS|PS|ES)/.test(E.alg) && "public" !== o.type) return v(new i(`secretOrPublicKey must be an asymmetric key when using ${E.alg}`));
if (!c.allowInvalidAsymmetricKeyTypes) try {
f(E.alg, o);
} catch (e) {
return v(e);
}
let M;
try {
M = u.verify(e, S.header.alg, o);
} catch (e) {
return v(e);
}
if (!M) return v(new i("invalid signature"));
const A = S.payload;
if ("undefined" != typeof A.nbf && !c.ignoreNotBefore) {
if ("number" != typeof A.nbf) return v(new i("invalid nbf value"));
if (A.nbf > w + (c.clockTolerance || 0)) return v(new n("jwt not active", new Date(1e3 * A.nbf)));
}
if ("undefined" != typeof A.exp && !c.ignoreExpiration) {
if ("number" != typeof A.exp) return v(new i("invalid exp value"));
if (w >= A.exp + (c.clockTolerance || 0)) return v(new s("jwt expired", new Date(1e3 * A.exp)));
}
if (c.audience) {
const e = Array.isArray(c.audience) ? c.audience : [ c.audience ];
if (!(Array.isArray(A.aud) ? A.aud : [ A.aud ]).some(function(t) {
return e.some(function(e) {
return e instanceof RegExp ? e.test(t) : e === t;
});
})) return v(new i("jwt audience invalid. expected: " + e.join(" or ")));
}
if (c.issuer && ("string" == typeof c.issuer && A.iss !== c.issuer || Array.isArray(c.issuer) && -1 === c.issuer.indexOf(A.iss))) return v(new i("jwt issuer invalid. expected: " + c.issuer));
if (c.subject && A.sub !== c.subject) return v(new i("jwt subject invalid. expected: " + c.subject));
if (c.jwtid && A.jti !== c.jwtid) return v(new i("jwt jwtid invalid. expected: " + c.jwtid));
if (c.nonce && A.nonce !== c.nonce) return v(new i("jwt nonce invalid. expected: " + c.nonce));
if (c.maxAge) {
if ("number" != typeof A.iat) return v(new i("iat required when maxAge is specified"));
const e = a(c.maxAge, A.iat);
if ("undefined" == typeof e) return v(new i('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
if (w >= e + (c.clockTolerance || 0)) return v(new s("maxAge exceeded", new Date(1e3 * e)));
}
if (!0 === c.complete) {
const e = S.signature;
return v(null, {
header: E,
payload: A,
signature: e
});
}
return v(null, A);
});
};
}).call(this, e("buffer").Buffer);
}, {
"./decode": 201,
"./lib/JsonWebTokenError": 203,
"./lib/NotBeforeError": 204,
"./lib/TokenExpiredError": 205,
"./lib/psSupported": 207,
"./lib/timespan": 209,
"./lib/validateAsymmetricKey": 210,
buffer: 65,
crypto: 75,
jws: 214
} ],
213: [ function(e, t) {
var r = e("buffer-equal-constant-time"), i = e("safe-buffer").Buffer, n = e("crypto"), s = e("ecdsa-sig-formatter"), o = e("util"), a = "secret must be a string or buffer", f = "key must be a string or a buffer", c = "key must be a string, a buffer or an object", u = "function" == typeof n.createPublicKey;
if (u) {
f += " or a KeyObject";
a += "or a KeyObject";
}
function h(e) {
if (!i.isBuffer(e) && "string" != typeof e) {
if (!u) throw m(f);
if ("object" != typeof e) throw m(f);
if ("string" != typeof e.type) throw m(f);
if ("string" != typeof e.asymmetricKeyType) throw m(f);
if ("function" != typeof e.export) throw m(f);
}
}
function d(e) {
if (!i.isBuffer(e) && "string" != typeof e && "object" != typeof e) throw m(c);
}
function l(e) {
if (!i.isBuffer(e)) {
if ("string" == typeof e) return e;
if (!u) throw m(a);
if ("object" != typeof e) throw m(a);
if ("secret" !== e.type) throw m(a);
if ("function" != typeof e.export) throw m(a);
}
}
function p(e) {
return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function b(e) {
var t = 4 - (e = e.toString()).length % 4;
if (4 !== t) for (var r = 0; r < t; ++r) e += "=";
return e.replace(/\-/g, "+").replace(/_/g, "/");
}
function m(e) {
var t = [].slice.call(arguments, 1), r = o.format.bind(o, e).apply(null, t);
return new TypeError(r);
}
function g(e) {
(t = e, i.isBuffer(t) || "string" == typeof t) || (e = JSON.stringify(e));
var t;
return e;
}
function y(e) {
return function(t, r) {
l(r);
t = g(t);
var i = n.createHmac("sha" + e, r);
return p((i.update(t), i.digest("base64")));
};
}
function v(e) {
return function(t, n, s) {
var o = y(e)(t, s);
return r(i.from(n), i.from(o));
};
}
function w(e) {
return function(t, r) {
d(r);
t = g(t);
var i = n.createSign("RSA-SHA" + e);
return p((i.update(t), i.sign(r, "base64")));
};
}
function _(e) {
return function(t, r, i) {
h(i);
t = g(t);
r = b(r);
var s = n.createVerify("RSA-SHA" + e);
s.update(t);
return s.verify(i, r, "base64");
};
}
function S(e) {
return function(t, r) {
d(r);
t = g(t);
var i = n.createSign("RSA-SHA" + e);
return p((i.update(t), i.sign({
key: r,
padding: n.constants.RSA_PKCS1_PSS_PADDING,
saltLength: n.constants.RSA_PSS_SALTLEN_DIGEST
}, "base64")));
};
}
function E(e) {
return function(t, r, i) {
h(i);
t = g(t);
r = b(r);
var s = n.createVerify("RSA-SHA" + e);
s.update(t);
return s.verify({
key: i,
padding: n.constants.RSA_PKCS1_PSS_PADDING,
saltLength: n.constants.RSA_PSS_SALTLEN_DIGEST
}, r, "base64");
};
}
function M(e) {
var t = w(e);
return function() {
var r = t.apply(null, arguments);
return s.derToJose(r, "ES" + e);
};
}
function A(e) {
var t = _(e);
return function(r, i, n) {
i = s.joseToDer(i, "ES" + e).toString("base64");
return t(r, i, n);
};
}
function k() {
return function() {
return "";
};
}
function R() {
return function(e, t) {
return "" === t;
};
}
t.exports = function(e) {
var t = {
hs: y,
rs: w,
ps: S,
es: M,
none: k
}, r = {
hs: v,
rs: _,
ps: E,
es: A,
none: R
}, i = e.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
if (!i) throw m('"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".', e);
var n = (i[1] || i[3]).toLowerCase(), s = i[2];
return {
sign: t[n](s),
verify: r[n](s)
};
};
}, {
"buffer-equal-constant-time": 198,
crypto: 75,
"ecdsa-sig-formatter": 199,
"safe-buffer": 227,
util: 197
} ],
214: [ function(e, t, r) {
var i = e("./lib/sign-stream"), n = e("./lib/verify-stream");
r.ALGORITHMS = [ "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" ];
r.sign = i.sign;
r.verify = n.verify;
r.decode = n.decode;
r.isValid = n.isValid;
r.createSign = function(e) {
return new i(e);
};
r.createVerify = function(e) {
return new n(e);
};
}, {
"./lib/sign-stream": 216,
"./lib/verify-stream": 218
} ],
215: [ function(e, t) {
(function(r) {
var i = e("safe-buffer").Buffer, n = e("stream");
function s(e) {
this.buffer = null;
this.writable = !0;
this.readable = !0;
if (!e) {
this.buffer = i.alloc(0);
return this;
}
if ("function" == typeof e.pipe) {
this.buffer = i.alloc(0);
e.pipe(this);
return this;
}
if (e.length || "object" == typeof e) {
this.buffer = e;
this.writable = !1;
r.nextTick(function() {
this.emit("end", e);
this.readable = !1;
this.emit("close");
}.bind(this));
return this;
}
throw new TypeError("Unexpected data type (" + typeof e + ")");
}
e("util").inherits(s, n);
s.prototype.write = function(e) {
this.buffer = i.concat([ this.buffer, i.from(e) ]);
this.emit("data", e);
};
s.prototype.end = function(e) {
e && this.write(e);
this.emit("end", e);
this.emit("close");
this.writable = !1;
this.readable = !1;
};
t.exports = s;
}).call(this, e("_process"));
}, {
_process: 156,
"safe-buffer": 227,
stream: 192,
util: 197
} ],
216: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = e("./data-stream"), n = e("jwa"), s = e("stream"), o = e("./tostring"), a = e("util");
function f(e, t) {
return r.from(e, t).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function c(e, t, r) {
r = r || "utf8";
var i = f(o(e), "binary"), n = f(o(t), r);
return a.format("%s.%s", i, n);
}
function u(e) {
var t = e.header, r = e.payload, i = e.secret || e.privateKey, s = e.encoding, o = n(t.alg), f = c(t, r, s), u = o.sign(f, i);
return a.format("%s.%s", f, u);
}
function h(e) {
var t = e.secret || e.privateKey || e.key, r = new i(t);
this.readable = !0;
this.header = e.header;
this.encoding = e.encoding;
this.secret = this.privateKey = this.key = r;
this.payload = new i(e.payload);
this.secret.once("close", function() {
!this.payload.writable && this.readable && this.sign();
}.bind(this));
this.payload.once("close", function() {
!this.secret.writable && this.readable && this.sign();
}.bind(this));
}
a.inherits(h, s);
h.prototype.sign = function() {
try {
var e = u({
header: this.header,
payload: this.payload.buffer,
secret: this.secret.buffer,
encoding: this.encoding
});
this.emit("done", e);
this.emit("data", e);
this.emit("end");
this.readable = !1;
return e;
} catch (e) {
this.readable = !1;
this.emit("error", e);
this.emit("close");
}
};
h.sign = u;
t.exports = h;
}, {
"./data-stream": 215,
"./tostring": 217,
jwa: 213,
"safe-buffer": 227,
stream: 192,
util: 197
} ],
217: [ function(e, t) {
var r = e("buffer").Buffer;
t.exports = function(e) {
return "string" == typeof e ? e : "number" == typeof e || r.isBuffer(e) ? e.toString() : JSON.stringify(e);
};
}, {
buffer: 65
} ],
218: [ function(e, t) {
var r = e("safe-buffer").Buffer, i = e("./data-stream"), n = e("jwa"), s = e("stream"), o = e("./tostring"), a = e("util"), f = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
function c(e) {
return "[object Object]" === Object.prototype.toString.call(e);
}
function u(e) {
if (c(e)) return e;
try {
return JSON.parse(e);
} catch (e) {
return;
}
}
function h(e) {
var t = e.split(".", 1)[0];
return u(r.from(t, "base64").toString("binary"));
}
function d(e) {
return e.split(".", 2).join(".");
}
function l(e) {
return e.split(".")[2];
}
function p(e, t) {
t = t || "utf8";
var i = e.split(".")[1];
return r.from(i, "base64").toString(t);
}
function b(e) {
return f.test(e) && !!h(e);
}
function m(e, t, r) {
if (!t) {
var i = new Error("Missing algorithm parameter for jws.verify");
i.code = "MISSING_ALGORITHM";
throw i;
}
var s = l(e = o(e)), a = d(e);
return n(t).verify(a, s, r);
}
function g(e, t) {
t = t || {};
if (!b(e = o(e))) return null;
var r = h(e);
if (!r) return null;
var i = p(e);
("JWT" === r.typ || t.json) && (i = JSON.parse(i, t.encoding));
return {
header: r,
payload: i,
signature: l(e)
};
}
function y(e) {
var t = (e = e || {}).secret || e.publicKey || e.key, r = new i(t);
this.readable = !0;
this.algorithm = e.algorithm;
this.encoding = e.encoding;
this.secret = this.publicKey = this.key = r;
this.signature = new i(e.signature);
this.secret.once("close", function() {
!this.signature.writable && this.readable && this.verify();
}.bind(this));
this.signature.once("close", function() {
!this.secret.writable && this.readable && this.verify();
}.bind(this));
}
a.inherits(y, s);
y.prototype.verify = function() {
try {
var e = m(this.signature.buffer, this.algorithm, this.key.buffer), t = g(this.signature.buffer, this.encoding);
this.emit("done", e, t);
this.emit("data", e);
this.emit("end");
this.readable = !1;
return e;
} catch (e) {
this.readable = !1;
this.emit("error", e);
this.emit("close");
}
};
y.decode = g;
y.isValid = b;
y.verify = m;
t.exports = y;
}, {
"./data-stream": 215,
"./tostring": 217,
jwa: 213,
"safe-buffer": 227,
stream: 192,
util: 197
} ],
219: [ function(e, t) {
var r = 1 / 0, i = 9007199254740991, n = 17976931348623157e292, s = NaN, o = "[object Arguments]", a = "[object Function]", f = "[object GeneratorFunction]", c = "[object String]", u = "[object Symbol]", h = /^\s+|\s+$/g, d = /^[-+]0x[0-9a-f]+$/i, l = /^0b[01]+$/i, p = /^0o[0-7]+$/i, b = /^(?:0|[1-9]\d*)$/, m = parseInt;
function g(e, t) {
for (var r = -1, i = e ? e.length : 0, n = Array(i); ++r < i; ) n[r] = t(e[r], r, e);
return n;
}
function y(e, t, r, i) {
for (var n = e.length, s = r + (i ? 1 : -1); i ? s-- : ++s < n; ) if (t(e[s], s, e)) return s;
return -1;
}
function v(e, t, r) {
if (t != t) return y(e, w, r);
for (var i = r - 1, n = e.length; ++i < n; ) if (e[i] === t) return i;
return -1;
}
function w(e) {
return e != e;
}
function _(e, t) {
for (var r = -1, i = Array(e); ++r < e; ) i[r] = t(r);
return i;
}
function S(e, t) {
return g(t, function(t) {
return e[t];
});
}
var E, M, A = Object.prototype, k = A.hasOwnProperty, R = A.toString, x = A.propertyIsEnumerable, I = (E = Object.keys, 
M = Object, function(e) {
return E(M(e));
}), T = Math.max;
function B(e, t) {
var r = C(e) || P(e) ? _(e.length, String) : [], i = r.length, n = !!i;
for (var s in e) !t && !k.call(e, s) || n && ("length" == s || N(s, i)) || r.push(s);
return r;
}
function j(e) {
if (!(t = e, r = t && t.constructor, i = "function" == typeof r && r.prototype || A, 
t === i)) return I(e);
var t, r, i, n = [];
for (var s in Object(e)) k.call(e, s) && "constructor" != s && n.push(s);
return n;
}
function N(e, t) {
return !!(t = null == t ? i : t) && ("number" == typeof e || b.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function P(e) {
return O(e) && k.call(e, "callee") && (!x.call(e, "callee") || R.call(e) == o);
}
var C = Array.isArray;
function L(e) {
return null != e && U(e.length) && !D(e);
}
function O(e) {
return F(e) && L(e);
}
function D(e) {
var t = q(e) ? R.call(e) : "";
return t == a || t == f;
}
function U(e) {
return "number" == typeof e && e > -1 && e % 1 == 0 && e <= i;
}
function q(e) {
var t = typeof e;
return !!e && ("object" == t || "function" == t);
}
function F(e) {
return !!e && "object" == typeof e;
}
function z(e) {
return "string" == typeof e || !C(e) && F(e) && R.call(e) == c;
}
function $(e) {
return "symbol" == typeof e || F(e) && R.call(e) == u;
}
function K(e) {
return e ? (e = W(e)) === r || e === -r ? (e < 0 ? -1 : 1) * n : e == e ? e : 0 : 0 === e ? e : 0;
}
function H(e) {
var t = K(e), r = t % 1;
return t == t ? r ? t - r : t : 0;
}
function W(e) {
if ("number" == typeof e) return e;
if ($(e)) return s;
if (q(e)) {
var t = "function" == typeof e.valueOf ? e.valueOf() : e;
e = q(t) ? t + "" : t;
}
if ("string" != typeof e) return 0 === e ? e : +e;
e = e.replace(h, "");
var r = l.test(e);
return r || p.test(e) ? m(e.slice(2), r ? 2 : 8) : d.test(e) ? s : +e;
}
function V(e) {
return L(e) ? B(e) : j(e);
}
t.exports = function(e, t, r, i) {
e = L(e) ? e : (n = e) ? S(n, V(n)) : [];
var n;
r = r && !i ? H(r) : 0;
var s = e.length;
r < 0 && (r = T(s + r, 0));
return z(e) ? r <= s && e.indexOf(t, r) > -1 : !!s && v(e, t, r) > -1;
};
}, {} ],
220: [ function(e, t) {
var r = Object.prototype.toString;
function i(e) {
return !!e && "object" == typeof e;
}
t.exports = function(e) {
return !0 === e || !1 === e || i(e) && "[object Boolean]" == r.call(e);
};
}, {} ],
221: [ function(e, t) {
var r = 1 / 0, i = 17976931348623157e292, n = NaN, s = "[object Symbol]", o = /^\s+|\s+$/g, a = /^[-+]0x[0-9a-f]+$/i, f = /^0b[01]+$/i, c = /^0o[0-7]+$/i, u = parseInt, h = Object.prototype.toString;
function d(e) {
var t = typeof e;
return !!e && ("object" == t || "function" == t);
}
function l(e) {
return !!e && "object" == typeof e;
}
function p(e) {
return "symbol" == typeof e || l(e) && h.call(e) == s;
}
function b(e) {
return e ? (e = g(e)) === r || e === -r ? (e < 0 ? -1 : 1) * i : e == e ? e : 0 : 0 === e ? e : 0;
}
function m(e) {
var t = b(e), r = t % 1;
return t == t ? r ? t - r : t : 0;
}
function g(e) {
if ("number" == typeof e) return e;
if (p(e)) return n;
if (d(e)) {
var t = "function" == typeof e.valueOf ? e.valueOf() : e;
e = d(t) ? t + "" : t;
}
if ("string" != typeof e) return 0 === e ? e : +e;
e = e.replace(o, "");
var r = f.test(e);
return r || c.test(e) ? u(e.slice(2), r ? 2 : 8) : a.test(e) ? n : +e;
}
t.exports = function(e) {
return "number" == typeof e && e == m(e);
};
}, {} ],
222: [ function(e, t) {
var r = Object.prototype.toString;
function i(e) {
return !!e && "object" == typeof e;
}
t.exports = function(e) {
return "number" == typeof e || i(e) && "[object Number]" == r.call(e);
};
}, {} ],
223: [ function(e, t) {
function r(e) {
var t = !1;
if (null != e && "function" != typeof e.toString) try {
t = !!(e + "");
} catch (e) {}
return t;
}
var i, n, s = Function.prototype, o = Object.prototype, a = s.toString, f = o.hasOwnProperty, c = a.call(Object), u = o.toString, h = (i = Object.getPrototypeOf, 
n = Object, function(e) {
return i(n(e));
});
function d(e) {
return !!e && "object" == typeof e;
}
t.exports = function(e) {
if (!d(e) || "[object Object]" != u.call(e) || r(e)) return !1;
var t = h(e);
if (null === t) return !0;
var i = f.call(t, "constructor") && t.constructor;
return "function" == typeof i && i instanceof i && a.call(i) == c;
};
}, {} ],
224: [ function(e, t) {
var r = Object.prototype.toString, i = Array.isArray;
function n(e) {
return !!e && "object" == typeof e;
}
t.exports = function(e) {
return "string" == typeof e || !i(e) && n(e) && "[object String]" == r.call(e);
};
}, {} ],
225: [ function(e, t) {
var r = "Expected a function", i = 1 / 0, n = 17976931348623157e292, s = NaN, o = "[object Symbol]", a = /^\s+|\s+$/g, f = /^[-+]0x[0-9a-f]+$/i, c = /^0b[01]+$/i, u = /^0o[0-7]+$/i, h = parseInt, d = Object.prototype.toString;
function l(e, t) {
var i;
if ("function" != typeof t) throw new TypeError(r);
e = y(e);
return function() {
--e > 0 && (i = t.apply(this, arguments));
e <= 1 && (t = void 0);
return i;
};
}
function p(e) {
var t = typeof e;
return !!e && ("object" == t || "function" == t);
}
function b(e) {
return !!e && "object" == typeof e;
}
function m(e) {
return "symbol" == typeof e || b(e) && d.call(e) == o;
}
function g(e) {
return e ? (e = v(e)) === i || e === -i ? (e < 0 ? -1 : 1) * n : e == e ? e : 0 : 0 === e ? e : 0;
}
function y(e) {
var t = g(e), r = t % 1;
return t == t ? r ? t - r : t : 0;
}
function v(e) {
if ("number" == typeof e) return e;
if (m(e)) return s;
if (p(e)) {
var t = "function" == typeof e.valueOf ? e.valueOf() : e;
e = p(t) ? t + "" : t;
}
if ("string" != typeof e) return 0 === e ? e : +e;
e = e.replace(a, "");
var r = c.test(e);
return r || u.test(e) ? h(e.slice(2), r ? 2 : 8) : f.test(e) ? s : +e;
}
t.exports = function(e) {
return l(2, e);
};
}, {} ],
226: [ function(e, t) {
var r = 1e3, i = 60 * r, n = 60 * i, s = 24 * n, o = 7 * s, a = 365.25 * s;
t.exports = function(e, t) {
t = t || {};
var o, a, h = typeof e;
if ("string" === h && e.length > 0) return f(e);
if ("number" === h && isFinite(e)) return t.long ? (o = e, (a = Math.abs(o)) >= s ? u(o, a, s, "day") : a >= n ? u(o, a, n, "hour") : a >= i ? u(o, a, i, "minute") : a >= r ? u(o, a, r, "second") : o + " ms") : c(e);
throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
};
function f(e) {
if (!((e = String(e)).length > 100)) {
var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
if (t) {
var f = parseFloat(t[1]);
switch ((t[2] || "ms").toLowerCase()) {
case "years":
case "year":
case "yrs":
case "yr":
case "y":
return f * a;

case "weeks":
case "week":
case "w":
return f * o;

case "days":
case "day":
case "d":
return f * s;

case "hours":
case "hour":
case "hrs":
case "hr":
case "h":
return f * n;

case "minutes":
case "minute":
case "mins":
case "min":
case "m":
return f * i;

case "seconds":
case "second":
case "secs":
case "sec":
case "s":
return f * r;

case "milliseconds":
case "millisecond":
case "msecs":
case "msec":
case "ms":
return f;

default:
return;
}
}
}
}
function c(e) {
var t = Math.abs(e);
return t >= s ? Math.round(e / s) + "d" : t >= n ? Math.round(e / n) + "h" : t >= i ? Math.round(e / i) + "m" : t >= r ? Math.round(e / r) + "s" : e + "ms";
}
function u(e, t, r, i) {
var n = t >= 1.5 * r;
return Math.round(e / r) + " " + i + (n ? "s" : "");
}
}, {} ],
227: [ function(e, t, r) {
arguments[4][62][0].apply(r, arguments);
}, {
buffer: 65,
dup: 62
} ],
228: [ function(e, t) {
const r = Symbol("SemVer ANY");
class i {
static get ANY() {
return r;
}
constructor(e, t) {
t = n(t);
if (e instanceof i) {
if (e.loose === !!t.loose) return e;
e = e.value;
}
e = e.trim().split(/\s+/).join(" ");
f("comparator", e, t);
this.options = t;
this.loose = !!t.loose;
this.parse(e);
this.semver === r ? this.value = "" : this.value = this.operator + this.semver.version;
f("comp", this);
}
parse(e) {
const t = this.options.loose ? s[o.COMPARATORLOOSE] : s[o.COMPARATOR], i = e.match(t);
if (!i) throw new TypeError(`Invalid comparator: ${e}`);
this.operator = void 0 !== i[1] ? i[1] : "";
"=" === this.operator && (this.operator = "");
i[2] ? this.semver = new c(i[2], this.options.loose) : this.semver = r;
}
toString() {
return this.value;
}
test(e) {
f("Comparator.test", e, this.options.loose);
if (this.semver === r || e === r) return !0;
if ("string" == typeof e) try {
e = new c(e, this.options);
} catch (e) {
return !1;
}
return a(e, this.operator, this.semver, this.options);
}
intersects(e, t) {
if (!(e instanceof i)) throw new TypeError("a Comparator is required");
return "" === this.operator ? "" === this.value || new u(e.value, t).test(this.value) : "" === e.operator ? "" === e.value || new u(this.value, t).test(e.semver) : !((t = n(t)).includePrerelease && ("<0.0.0-0" === this.value || "<0.0.0-0" === e.value) || !t.includePrerelease && (this.value.startsWith("<0.0.0") || e.value.startsWith("<0.0.0")) || (!this.operator.startsWith(">") || !e.operator.startsWith(">")) && (!this.operator.startsWith("<") || !e.operator.startsWith("<")) && (this.semver.version !== e.semver.version || !this.operator.includes("=") || !e.operator.includes("=")) && !(a(this.semver, "<", e.semver, t) && this.operator.startsWith(">") && e.operator.startsWith("<")) && !(a(this.semver, ">", e.semver, t) && this.operator.startsWith("<") && e.operator.startsWith(">")));
}
}
t.exports = i;
const n = e("../internal/parse-options"), {safeRe: s, t: o} = e("../internal/re"), a = e("../functions/cmp"), f = e("../internal/debug"), c = e("./semver"), u = e("./range");
}, {
"../functions/cmp": 232,
"../internal/debug": 257,
"../internal/parse-options": 260,
"../internal/re": 261,
"./range": 229,
"./semver": 230
} ],
229: [ function(e, t) {
class r {
constructor(e, t) {
t = n(t);
if (e instanceof r) return e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease ? e : new r(e.raw, t);
if (e instanceof s) {
this.raw = e.value;
this.set = [ [ e ] ];
this.format();
return this;
}
this.options = t;
this.loose = !!t.loose;
this.includePrerelease = !!t.includePrerelease;
this.raw = e.trim().split(/\s+/).join(" ");
this.set = this.raw.split("||").map(e => this.parseRange(e.trim())).filter(e => e.length);
if (!this.set.length) throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
if (this.set.length > 1) {
const e = this.set[0];
this.set = this.set.filter(e => !b(e[0]));
if (0 === this.set.length) this.set = [ e ]; else if (this.set.length > 1) for (const e of this.set) if (1 === e.length && m(e[0])) {
this.set = [ e ];
break;
}
}
this.format();
}
format() {
this.range = this.set.map(e => e.join(" ").trim()).join("||").trim();
return this.range;
}
toString() {
return this.range;
}
parseRange(e) {
const t = ((this.options.includePrerelease && l) | (this.options.loose && p)) + ":" + e, r = i.get(t);
if (r) return r;
const n = this.options.loose, a = n ? f[c.HYPHENRANGELOOSE] : f[c.HYPHENRANGE];
e = e.replace(a, x(this.options.includePrerelease));
o("hyphen replace", e);
e = e.replace(f[c.COMPARATORTRIM], u);
o("comparator trim", e);
e = e.replace(f[c.TILDETRIM], h);
o("tilde trim", e);
e = e.replace(f[c.CARETTRIM], d);
o("caret trim", e);
let m = e.split(" ").map(e => y(e, this.options)).join(" ").split(/\s+/).map(e => R(e, this.options));
n && (m = m.filter(e => {
o("loose invalid filter", e, this.options);
return !!e.match(f[c.COMPARATORLOOSE]);
}));
o("range list", m);
const g = new Map(), v = m.map(e => new s(e, this.options));
for (const e of v) {
if (b(e)) return [ e ];
g.set(e.value, e);
}
g.size > 1 && g.has("") && g.delete("");
const w = [ ...g.values() ];
i.set(t, w);
return w;
}
intersects(e, t) {
if (!(e instanceof r)) throw new TypeError("a Range is required");
return this.set.some(r => g(r, t) && e.set.some(e => g(e, t) && r.every(r => e.every(e => r.intersects(e, t)))));
}
test(e) {
if (!e) return !1;
if ("string" == typeof e) try {
e = new a(e, this.options);
} catch (e) {
return !1;
}
for (let t = 0; t < this.set.length; t++) if (I(this.set[t], e, this.options)) return !0;
return !1;
}
}
t.exports = r;
const i = new (e("../internal/lrucache"))(), n = e("../internal/parse-options"), s = e("./comparator"), o = e("../internal/debug"), a = e("./semver"), {safeRe: f, t: c, comparatorTrimReplace: u, tildeTrimReplace: h, caretTrimReplace: d} = e("../internal/re"), {FLAG_INCLUDE_PRERELEASE: l, FLAG_LOOSE: p} = e("../internal/constants"), b = e => "<0.0.0-0" === e.value, m = e => "" === e.value, g = (e, t) => {
let r = !0;
const i = e.slice();
let n = i.pop();
for (;r && i.length; ) {
r = i.every(e => n.intersects(e, t));
n = i.pop();
}
return r;
}, y = (e, t) => {
o("comp", e, t);
e = S(e, t);
o("caret", e);
e = w(e, t);
o("tildes", e);
e = M(e, t);
o("xrange", e);
e = k(e, t);
o("stars", e);
return e;
}, v = e => !e || "x" === e.toLowerCase() || "*" === e, w = (e, t) => e.trim().split(/\s+/).map(e => _(e, t)).join(" "), _ = (e, t) => {
const r = t.loose ? f[c.TILDELOOSE] : f[c.TILDE];
return e.replace(r, (t, r, i, n, s) => {
o("tilde", e, t, r, i, n, s);
let a;
if (v(r)) a = ""; else if (v(i)) a = `>=${r}.0.0 <${+r + 1}.0.0-0`; else if (v(n)) a = `>=${r}.${i}.0 <${r}.${+i + 1}.0-0`; else if (s) {
o("replaceTilde pr", s);
a = `>=${r}.${i}.${n}-${s} <${r}.${+i + 1}.0-0`;
} else a = `>=${r}.${i}.${n} <${r}.${+i + 1}.0-0`;
o("tilde return", a);
return a;
});
}, S = (e, t) => e.trim().split(/\s+/).map(e => E(e, t)).join(" "), E = (e, t) => {
o("caret", e, t);
const r = t.loose ? f[c.CARETLOOSE] : f[c.CARET], i = t.includePrerelease ? "-0" : "";
return e.replace(r, (t, r, n, s, a) => {
o("caret", e, t, r, n, s, a);
let f;
if (v(r)) f = ""; else if (v(n)) f = `>=${r}.0.0${i} <${+r + 1}.0.0-0`; else if (v(s)) f = "0" === r ? `>=${r}.${n}.0${i} <${r}.${+n + 1}.0-0` : `>=${r}.${n}.0${i} <${+r + 1}.0.0-0`; else if (a) {
o("replaceCaret pr", a);
f = "0" === r ? "0" === n ? `>=${r}.${n}.${s}-${a} <${r}.${n}.${+s + 1}-0` : `>=${r}.${n}.${s}-${a} <${r}.${+n + 1}.0-0` : `>=${r}.${n}.${s}-${a} <${+r + 1}.0.0-0`;
} else {
o("no pr");
f = "0" === r ? "0" === n ? `>=${r}.${n}.${s}${i} <${r}.${n}.${+s + 1}-0` : `>=${r}.${n}.${s}${i} <${r}.${+n + 1}.0-0` : `>=${r}.${n}.${s} <${+r + 1}.0.0-0`;
}
o("caret return", f);
return f;
});
}, M = (e, t) => {
o("replaceXRanges", e, t);
return e.split(/\s+/).map(e => A(e, t)).join(" ");
}, A = (e, t) => {
e = e.trim();
const r = t.loose ? f[c.XRANGELOOSE] : f[c.XRANGE];
return e.replace(r, (r, i, n, s, a, f) => {
o("xRange", e, r, i, n, s, a, f);
const c = v(n), u = c || v(s), h = u || v(a), d = h;
"=" === i && d && (i = "");
f = t.includePrerelease ? "-0" : "";
if (c) r = ">" === i || "<" === i ? "<0.0.0-0" : "*"; else if (i && d) {
u && (s = 0);
a = 0;
if (">" === i) {
i = ">=";
if (u) {
n = +n + 1;
s = 0;
a = 0;
} else {
s = +s + 1;
a = 0;
}
} else if ("<=" === i) {
i = "<";
u ? n = +n + 1 : s = +s + 1;
}
"<" === i && (f = "-0");
r = `${i + n}.${s}.${a}${f}`;
} else u ? r = `>=${n}.0.0${f} <${+n + 1}.0.0-0` : h && (r = `>=${n}.${s}.0${f} <${n}.${+s + 1}.0-0`);
o("xRange return", r);
return r;
});
}, k = (e, t) => {
o("replaceStars", e, t);
return e.trim().replace(f[c.STAR], "");
}, R = (e, t) => {
o("replaceGTE0", e, t);
return e.trim().replace(f[t.includePrerelease ? c.GTE0PRE : c.GTE0], "");
}, x = e => (t, r, i, n, s, o, a, f, c, u, h, d) => `${r = v(i) ? "" : v(n) ? `>=${i}.0.0${e ? "-0" : ""}` : v(s) ? `>=${i}.${n}.0${e ? "-0" : ""}` : o ? `>=${r}` : `>=${r}${e ? "-0" : ""}`} ${f = v(c) ? "" : v(u) ? `<${+c + 1}.0.0-0` : v(h) ? `<${c}.${+u + 1}.0-0` : d ? `<=${c}.${u}.${h}-${d}` : e ? `<${c}.${u}.${+h + 1}-0` : `<=${f}`}`.trim(), I = (e, t, r) => {
for (let r = 0; r < e.length; r++) if (!e[r].test(t)) return !1;
if (t.prerelease.length && !r.includePrerelease) {
for (let r = 0; r < e.length; r++) {
o(e[r].semver);
if (e[r].semver !== s.ANY && e[r].semver.prerelease.length > 0) {
const i = e[r].semver;
if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
}
}
return !1;
}
return !0;
};
}, {
"../internal/constants": 256,
"../internal/debug": 257,
"../internal/lrucache": 259,
"../internal/parse-options": 260,
"../internal/re": 261,
"./comparator": 228,
"./semver": 230
} ],
230: [ function(e, t) {
const r = e("../internal/debug"), {MAX_LENGTH: i, MAX_SAFE_INTEGER: n} = e("../internal/constants"), {safeRe: s, t: o} = e("../internal/re"), a = e("../internal/parse-options"), {compareIdentifiers: f} = e("../internal/identifiers");
class c {
constructor(e, t) {
t = a(t);
if (e instanceof c) {
if (e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease) return e;
e = e.version;
} else if ("string" != typeof e) throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);
if (e.length > i) throw new TypeError(`version is longer than ${i} characters`);
r("SemVer", e, t);
this.options = t;
this.loose = !!t.loose;
this.includePrerelease = !!t.includePrerelease;
const f = e.trim().match(t.loose ? s[o.LOOSE] : s[o.FULL]);
if (!f) throw new TypeError(`Invalid Version: ${e}`);
this.raw = e;
this.major = +f[1];
this.minor = +f[2];
this.patch = +f[3];
if (this.major > n || this.major < 0) throw new TypeError("Invalid major version");
if (this.minor > n || this.minor < 0) throw new TypeError("Invalid minor version");
if (this.patch > n || this.patch < 0) throw new TypeError("Invalid patch version");
f[4] ? this.prerelease = f[4].split(".").map(e => {
if (/^[0-9]+$/.test(e)) {
const t = +e;
if (t >= 0 && t < n) return t;
}
return e;
}) : this.prerelease = [];
this.build = f[5] ? f[5].split(".") : [];
this.format();
}
format() {
this.version = `${this.major}.${this.minor}.${this.patch}`;
this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`);
return this.version;
}
toString() {
return this.version;
}
compare(e) {
r("SemVer.compare", this.version, this.options, e);
if (!(e instanceof c)) {
if ("string" == typeof e && e === this.version) return 0;
e = new c(e, this.options);
}
return e.version === this.version ? 0 : this.compareMain(e) || this.comparePre(e);
}
compareMain(e) {
e instanceof c || (e = new c(e, this.options));
return f(this.major, e.major) || f(this.minor, e.minor) || f(this.patch, e.patch);
}
comparePre(e) {
e instanceof c || (e = new c(e, this.options));
if (this.prerelease.length && !e.prerelease.length) return -1;
if (!this.prerelease.length && e.prerelease.length) return 1;
if (!this.prerelease.length && !e.prerelease.length) return 0;
let t = 0;
do {
const i = this.prerelease[t], n = e.prerelease[t];
r("prerelease compare", t, i, n);
if (void 0 === i && void 0 === n) return 0;
if (void 0 === n) return 1;
if (void 0 === i) return -1;
if (i !== n) return f(i, n);
} while (++t);
}
compareBuild(e) {
e instanceof c || (e = new c(e, this.options));
let t = 0;
do {
const i = this.build[t], n = e.build[t];
r("build compare", t, i, n);
if (void 0 === i && void 0 === n) return 0;
if (void 0 === n) return 1;
if (void 0 === i) return -1;
if (i !== n) return f(i, n);
} while (++t);
}
inc(e, t, r) {
switch (e) {
case "premajor":
this.prerelease.length = 0;
this.patch = 0;
this.minor = 0;
this.major++;
this.inc("pre", t, r);
break;

case "preminor":
this.prerelease.length = 0;
this.patch = 0;
this.minor++;
this.inc("pre", t, r);
break;

case "prepatch":
this.prerelease.length = 0;
this.inc("patch", t, r);
this.inc("pre", t, r);
break;

case "prerelease":
0 === this.prerelease.length && this.inc("patch", t, r);
this.inc("pre", t, r);
break;

case "major":
0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++;
this.minor = 0;
this.patch = 0;
this.prerelease = [];
break;

case "minor":
0 === this.patch && 0 !== this.prerelease.length || this.minor++;
this.patch = 0;
this.prerelease = [];
break;

case "patch":
0 === this.prerelease.length && this.patch++;
this.prerelease = [];
break;

case "pre":
{
const e = Number(r) ? 1 : 0;
if (!t && !1 === r) throw new Error("invalid increment argument: identifier is empty");
if (0 === this.prerelease.length) this.prerelease = [ e ]; else {
let i = this.prerelease.length;
for (;--i >= 0; ) if ("number" == typeof this.prerelease[i]) {
this.prerelease[i]++;
i = -2;
}
if (-1 === i) {
if (t === this.prerelease.join(".") && !1 === r) throw new Error("invalid increment argument: identifier already exists");
this.prerelease.push(e);
}
}
if (t) {
let i = [ t, e ];
!1 === r && (i = [ t ]);
0 === f(this.prerelease[0], t) ? isNaN(this.prerelease[1]) && (this.prerelease = i) : this.prerelease = i;
}
break;
}

default:
throw new Error(`invalid increment argument: ${e}`);
}
this.raw = this.format();
this.build.length && (this.raw += `+${this.build.join(".")}`);
return this;
}
}
t.exports = c;
}, {
"../internal/constants": 256,
"../internal/debug": 257,
"../internal/identifiers": 258,
"../internal/parse-options": 260,
"../internal/re": 261
} ],
231: [ function(e, t) {
const r = e("./parse");
t.exports = (e, t) => {
const i = r(e.trim().replace(/^[=v]+/, ""), t);
return i ? i.version : null;
};
}, {
"./parse": 247
} ],
232: [ function(e, t) {
const r = e("./eq"), i = e("./neq"), n = e("./gt"), s = e("./gte"), o = e("./lt"), a = e("./lte");
t.exports = (e, t, f, c) => {
switch (t) {
case "===":
"object" == typeof e && (e = e.version);
"object" == typeof f && (f = f.version);
return e === f;

case "!==":
"object" == typeof e && (e = e.version);
"object" == typeof f && (f = f.version);
return e !== f;

case "":
case "=":
case "==":
return r(e, f, c);

case "!=":
return i(e, f, c);

case ">":
return n(e, f, c);

case ">=":
return s(e, f, c);

case "<":
return o(e, f, c);

case "<=":
return a(e, f, c);

default:
throw new TypeError(`Invalid operator: ${t}`);
}
};
}, {
"./eq": 238,
"./gt": 239,
"./gte": 240,
"./lt": 242,
"./lte": 243,
"./neq": 246
} ],
233: [ function(e, t) {
const r = e("../classes/semver"), i = e("./parse"), {safeRe: n, t: s} = e("../internal/re");
t.exports = (e, t) => {
if (e instanceof r) return e;
"number" == typeof e && (e = String(e));
if ("string" != typeof e) return null;
let o = null;
if ((t = t || {}).rtl) {
const r = t.includePrerelease ? n[s.COERCERTLFULL] : n[s.COERCERTL];
let i;
for (;(i = r.exec(e)) && (!o || o.index + o[0].length !== e.length); ) {
o && i.index + i[0].length === o.index + o[0].length || (o = i);
r.lastIndex = i.index + i[1].length + i[2].length;
}
r.lastIndex = -1;
} else o = e.match(t.includePrerelease ? n[s.COERCEFULL] : n[s.COERCE]);
if (null === o) return null;
const a = o[2], f = o[3] || "0", c = o[4] || "0", u = t.includePrerelease && o[5] ? `-${o[5]}` : "", h = t.includePrerelease && o[6] ? `+${o[6]}` : "";
return i(`${a}.${f}.${c}${u}${h}`, t);
};
}, {
"../classes/semver": 230,
"../internal/re": 261,
"./parse": 247
} ],
234: [ function(e, t) {
const r = e("../classes/semver");
t.exports = (e, t, i) => {
const n = new r(e, i), s = new r(t, i);
return n.compare(s) || n.compareBuild(s);
};
}, {
"../classes/semver": 230
} ],
235: [ function(e, t) {
const r = e("./compare");
t.exports = (e, t) => r(e, t, !0);
}, {
"./compare": 236
} ],
236: [ function(e, t) {
const r = e("../classes/semver");
t.exports = (e, t, i) => new r(e, i).compare(new r(t, i));
}, {
"../classes/semver": 230
} ],
237: [ function(e, t) {
const r = e("./parse.js");
t.exports = (e, t) => {
const i = r(e, null, !0), n = r(t, null, !0), s = i.compare(n);
if (0 === s) return null;
const o = s > 0, a = o ? i : n, f = o ? n : i, c = !!a.prerelease.length;
if (f.prerelease.length && !c) return f.patch || f.minor ? a.patch ? "patch" : a.minor ? "minor" : "major" : "major";
const u = c ? "pre" : "";
return i.major !== n.major ? u + "major" : i.minor !== n.minor ? u + "minor" : i.patch !== n.patch ? u + "patch" : "prerelease";
};
}, {
"./parse.js": 247
} ],
238: [ function(e, t) {
const r = e("./compare");
t.exports = (e, t, i) => 0 === r(e, t, i);
}, {
"./compare": 236
} ],
239: [ function(e, t) {
const r = e("./compare");
t.exports = (e, t, i) => r(e, t, i) > 0;
}, {
"./compare": 236
} ],
240: [ function(e, t) {
const r = e("./compare");
t.exports = (e, t, i) => r(e, t, i) >= 0;
}, {
"./compare": 236
} ],
241: [ function(e, t) {
const r = e("../classes/semver");
t.exports = (e, t, i, n, s) => {
if ("string" == typeof i) {
s = n;
n = i;
i = void 0;
}
try {
return new r(e instanceof r ? e.version : e, i).inc(t, n, s).version;
} catch (e) {
return null;
}
};
}, {
"../classes/semver": 230
} ],
242: [ function(e, t) {
const r = e("./compare");
t.exports = (e, t, i) => r(e, t, i) < 0;
}, {
"./compare": 236
} ],
243: [ function(e, t) {
const r = e("./compare");
t.exports = (e, t, i) => r(e, t, i) <= 0;
}, {
"./compare": 236
} ],
244: [ function(e, t) {
const r = e("../classes/semver");
t.exports = (e, t) => new r(e, t).major;
}, {
"../classes/semver": 230
} ],
245: [ function(e, t) {
const r = e("../classes/semver");
t.exports = (e, t) => new r(e, t).minor;
}, {
"../classes/semver": 230
} ],
246: [ function(e, t) {
const r = e("./compare");
t.exports = (e, t, i) => 0 !== r(e, t, i);
}, {
"./compare": 236
} ],
247: [ function(e, t) {
const r = e("../classes/semver");
t.exports = (e, t, i = !1) => {
if (e instanceof r) return e;
try {
return new r(e, t);
} catch (e) {
if (!i) return null;
throw e;
}
};
}, {
"../classes/semver": 230
} ],
248: [ function(e, t) {
const r = e("../classes/semver");
t.exports = (e, t) => new r(e, t).patch;
}, {
"../classes/semver": 230
} ],
249: [ function(e, t) {
const r = e("./parse");
t.exports = (e, t) => {
const i = r(e, t);
return i && i.prerelease.length ? i.prerelease : null;
};
}, {
"./parse": 247
} ],
250: [ function(e, t) {
const r = e("./compare");
t.exports = (e, t, i) => r(t, e, i);
}, {
"./compare": 236
} ],
251: [ function(e, t) {
const r = e("./compare-build");
t.exports = (e, t) => e.sort((e, i) => r(i, e, t));
}, {
"./compare-build": 234
} ],
252: [ function(e, t) {
const r = e("../classes/range");
t.exports = (e, t, i) => {
try {
t = new r(t, i);
} catch (e) {
return !1;
}
return t.test(e);
};
}, {
"../classes/range": 229
} ],
253: [ function(e, t) {
const r = e("./compare-build");
t.exports = (e, t) => e.sort((e, i) => r(e, i, t));
}, {
"./compare-build": 234
} ],
254: [ function(e, t) {
const r = e("./parse");
t.exports = (e, t) => {
const i = r(e, t);
return i ? i.version : null;
};
}, {
"./parse": 247
} ],
255: [ function(e, t) {
const r = e("./internal/re"), i = e("./internal/constants"), n = e("./classes/semver"), s = e("./internal/identifiers"), o = e("./functions/parse"), a = e("./functions/valid"), f = e("./functions/clean"), c = e("./functions/inc"), u = e("./functions/diff"), h = e("./functions/major"), d = e("./functions/minor"), l = e("./functions/patch"), p = e("./functions/prerelease"), b = e("./functions/compare"), m = e("./functions/rcompare"), g = e("./functions/compare-loose"), y = e("./functions/compare-build"), v = e("./functions/sort"), w = e("./functions/rsort"), _ = e("./functions/gt"), S = e("./functions/lt"), E = e("./functions/eq"), M = e("./functions/neq"), A = e("./functions/gte"), k = e("./functions/lte"), R = e("./functions/cmp"), x = e("./functions/coerce"), I = e("./classes/comparator"), T = e("./classes/range"), B = e("./functions/satisfies"), j = e("./ranges/to-comparators"), N = e("./ranges/max-satisfying"), P = e("./ranges/min-satisfying"), C = e("./ranges/min-version"), L = e("./ranges/valid"), O = e("./ranges/outside"), D = e("./ranges/gtr"), U = e("./ranges/ltr"), q = e("./ranges/intersects"), F = e("./ranges/simplify"), z = e("./ranges/subset");
t.exports = {
parse: o,
valid: a,
clean: f,
inc: c,
diff: u,
major: h,
minor: d,
patch: l,
prerelease: p,
compare: b,
rcompare: m,
compareLoose: g,
compareBuild: y,
sort: v,
rsort: w,
gt: _,
lt: S,
eq: E,
neq: M,
gte: A,
lte: k,
cmp: R,
coerce: x,
Comparator: I,
Range: T,
satisfies: B,
toComparators: j,
maxSatisfying: N,
minSatisfying: P,
minVersion: C,
validRange: L,
outside: O,
gtr: D,
ltr: U,
intersects: q,
simplifyRange: F,
subset: z,
SemVer: n,
re: r.re,
src: r.src,
tokens: r.t,
SEMVER_SPEC_VERSION: i.SEMVER_SPEC_VERSION,
RELEASE_TYPES: i.RELEASE_TYPES,
compareIdentifiers: s.compareIdentifiers,
rcompareIdentifiers: s.rcompareIdentifiers
};
}, {
"./classes/comparator": 228,
"./classes/range": 229,
"./classes/semver": 230,
"./functions/clean": 231,
"./functions/cmp": 232,
"./functions/coerce": 233,
"./functions/compare": 236,
"./functions/compare-build": 234,
"./functions/compare-loose": 235,
"./functions/diff": 237,
"./functions/eq": 238,
"./functions/gt": 239,
"./functions/gte": 240,
"./functions/inc": 241,
"./functions/lt": 242,
"./functions/lte": 243,
"./functions/major": 244,
"./functions/minor": 245,
"./functions/neq": 246,
"./functions/parse": 247,
"./functions/patch": 248,
"./functions/prerelease": 249,
"./functions/rcompare": 250,
"./functions/rsort": 251,
"./functions/satisfies": 252,
"./functions/sort": 253,
"./functions/valid": 254,
"./internal/constants": 256,
"./internal/identifiers": 258,
"./internal/re": 261,
"./ranges/gtr": 262,
"./ranges/intersects": 263,
"./ranges/ltr": 264,
"./ranges/max-satisfying": 265,
"./ranges/min-satisfying": 266,
"./ranges/min-version": 267,
"./ranges/outside": 268,
"./ranges/simplify": 269,
"./ranges/subset": 270,
"./ranges/to-comparators": 271,
"./ranges/valid": 272
} ],
256: [ function(e, t) {
const r = Number.MAX_SAFE_INTEGER || 9007199254740991;
t.exports = {
MAX_LENGTH: 256,
MAX_SAFE_COMPONENT_LENGTH: 16,
MAX_SAFE_BUILD_LENGTH: 250,
MAX_SAFE_INTEGER: r,
RELEASE_TYPES: [ "major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease" ],
SEMVER_SPEC_VERSION: "2.0.0",
FLAG_INCLUDE_PRERELEASE: 1,
FLAG_LOOSE: 2
};
}, {} ],
257: [ function(e, t) {
(function(e) {
const r = "object" == typeof e && e.env && e.env.NODE_DEBUG && /\bsemver\b/i.test(e.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {};
t.exports = r;
}).call(this, e("_process"));
}, {
_process: 156
} ],
258: [ function(e, t) {
const r = /^[0-9]+$/, i = (e, t) => {
const i = r.test(e), n = r.test(t);
if (i && n) {
e = +e;
t = +t;
}
return e === t ? 0 : i && !n ? -1 : n && !i ? 1 : e < t ? -1 : 1;
};
t.exports = {
compareIdentifiers: i,
rcompareIdentifiers: (e, t) => i(t, e)
};
}, {} ],
259: [ function(e, t) {
t.exports = class {
constructor() {
this.max = 1e3;
this.map = new Map();
}
get(e) {
const t = this.map.get(e);
if (void 0 !== t) {
this.map.delete(e);
this.map.set(e, t);
return t;
}
}
delete(e) {
return this.map.delete(e);
}
set(e, t) {
if (!this.delete(e) && void 0 !== t) {
if (this.map.size >= this.max) {
const e = this.map.keys().next().value;
this.delete(e);
}
this.map.set(e, t);
}
return this;
}
};
}, {} ],
260: [ function(e, t) {
const r = Object.freeze({
loose: !0
}), i = Object.freeze({});
t.exports = e => e ? "object" != typeof e ? r : e : i;
}, {} ],
261: [ function(e, t, r) {
const {MAX_SAFE_COMPONENT_LENGTH: i, MAX_SAFE_BUILD_LENGTH: n, MAX_LENGTH: s} = e("./constants"), o = e("./debug"), a = (r = t.exports = {}).re = [], f = r.safeRe = [], c = r.src = [], u = r.t = {};
let h = 0;
const d = [ [ "\\s", 1 ], [ "\\d", s ], [ "[a-zA-Z0-9-]", n ] ], l = e => {
for (const [t, r] of d) e = e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);
return e;
}, p = (e, t, r) => {
const i = l(t), n = h++;
o(e, n, t);
u[e] = n;
c[n] = t;
a[n] = new RegExp(t, r ? "g" : void 0);
f[n] = new RegExp(i, r ? "g" : void 0);
};
p("NUMERICIDENTIFIER", "0|[1-9]\\d*");
p("NUMERICIDENTIFIERLOOSE", "\\d+");
p("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
p("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.` + `(${c[u.NUMERICIDENTIFIER]})\\.` + `(${c[u.NUMERICIDENTIFIER]})`);
p("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.` + `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.` + `(${c[u.NUMERICIDENTIFIERLOOSE]})`);
p("PRERELEASEIDENTIFIER", `(?:${c[u.NUMERICIDENTIFIER]}|${c[u.NONNUMERICIDENTIFIER]})`);
p("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NUMERICIDENTIFIERLOOSE]}|${c[u.NONNUMERICIDENTIFIER]})`);
p("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`);
p("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`);
p("BUILDIDENTIFIER", "[a-zA-Z0-9-]+");
p("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`);
p("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`);
p("FULL", `^${c[u.FULLPLAIN]}$`);
p("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`);
p("LOOSE", `^${c[u.LOOSEPLAIN]}$`);
p("GTLT", "((?:<|>)?=?)");
p("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
p("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`);
p("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})` + `(?:\\.(${c[u.XRANGEIDENTIFIER]})` + `(?:\\.(${c[u.XRANGEIDENTIFIER]})` + `(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?` + ")?)?");
p("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})` + `(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?` + ")?)?");
p("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`);
p("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`);
p("COERCEPLAIN", `(^|[^\\d])(\\d{1,${i}})` + `(?:\\.(\\d{1,${i}}))?` + `(?:\\.(\\d{1,${i}}))?`);
p("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`);
p("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?` + `(?:${c[u.BUILD]})?` + "(?:$|[^\\d])");
p("COERCERTL", c[u.COERCE], !0);
p("COERCERTLFULL", c[u.COERCEFULL], !0);
p("LONETILDE", "(?:~>?)");
p("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0);
r.tildeTrimReplace = "$1~";
p("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`);
p("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`);
p("LONECARET", "(?:\\^)");
p("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0);
r.caretTrimReplace = "$1^";
p("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`);
p("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`);
p("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`);
p("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`);
p("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0);
r.comparatorTrimReplace = "$1$2$3";
p("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})` + "\\s+-\\s+" + `(${c[u.XRANGEPLAIN]})` + "\\s*$");
p("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})` + "\\s+-\\s+" + `(${c[u.XRANGEPLAINLOOSE]})` + "\\s*$");
p("STAR", "(<|>)?=?\\s*\\*");
p("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
p("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
}, {
"./constants": 256,
"./debug": 257
} ],
262: [ function(e, t) {
const r = e("./outside");
t.exports = (e, t, i) => r(e, t, ">", i);
}, {
"./outside": 268
} ],
263: [ function(e, t) {
const r = e("../classes/range");
t.exports = (e, t, i) => {
e = new r(e, i);
t = new r(t, i);
return e.intersects(t, i);
};
}, {
"../classes/range": 229
} ],
264: [ function(e, t) {
const r = e("./outside");
t.exports = (e, t, i) => r(e, t, "<", i);
}, {
"./outside": 268
} ],
265: [ function(e, t) {
const r = e("../classes/semver"), i = e("../classes/range");
t.exports = (e, t, n) => {
let s = null, o = null, a = null;
try {
a = new i(t, n);
} catch (e) {
return null;
}
e.forEach(e => {
a.test(e) && (s && -1 !== o.compare(e) || (o = new r(s = e, n)));
});
return s;
};
}, {
"../classes/range": 229,
"../classes/semver": 230
} ],
266: [ function(e, t) {
const r = e("../classes/semver"), i = e("../classes/range");
t.exports = (e, t, n) => {
let s = null, o = null, a = null;
try {
a = new i(t, n);
} catch (e) {
return null;
}
e.forEach(e => {
a.test(e) && (s && 1 !== o.compare(e) || (o = new r(s = e, n)));
});
return s;
};
}, {
"../classes/range": 229,
"../classes/semver": 230
} ],
267: [ function(e, t) {
const r = e("../classes/semver"), i = e("../classes/range"), n = e("../functions/gt");
t.exports = (e, t) => {
e = new i(e, t);
let s = new r("0.0.0");
if (e.test(s)) return s;
s = new r("0.0.0-0");
if (e.test(s)) return s;
s = null;
for (let t = 0; t < e.set.length; ++t) {
const i = e.set[t];
let o = null;
i.forEach(e => {
const t = new r(e.semver.version);
switch (e.operator) {
case ">":
0 === t.prerelease.length ? t.patch++ : t.prerelease.push(0);
t.raw = t.format();

case "":
case ">=":
o && !n(t, o) || (o = t);
break;

case "<":
case "<=":
break;

default:
throw new Error(`Unexpected operation: ${e.operator}`);
}
});
!o || s && !n(s, o) || (s = o);
}
return s && e.test(s) ? s : null;
};
}, {
"../classes/range": 229,
"../classes/semver": 230,
"../functions/gt": 239
} ],
268: [ function(e, t) {
const r = e("../classes/semver"), i = e("../classes/comparator"), {ANY: n} = i, s = e("../classes/range"), o = e("../functions/satisfies"), a = e("../functions/gt"), f = e("../functions/lt"), c = e("../functions/lte"), u = e("../functions/gte");
t.exports = (e, t, h, d) => {
e = new r(e, d);
t = new s(t, d);
let l, p, b, m, g;
switch (h) {
case ">":
l = a;
p = c;
b = f;
m = ">";
g = ">=";
break;

case "<":
l = f;
p = u;
b = a;
m = "<";
g = "<=";
break;

default:
throw new TypeError('Must provide a hilo val of "<" or ">"');
}
if (o(e, t, d)) return !1;
for (let r = 0; r < t.set.length; ++r) {
const s = t.set[r];
let o = null, a = null;
s.forEach(e => {
e.semver === n && (e = new i(">=0.0.0"));
o = o || e;
a = a || e;
l(e.semver, o.semver, d) ? o = e : b(e.semver, a.semver, d) && (a = e);
});
if (o.operator === m || o.operator === g) return !1;
if ((!a.operator || a.operator === m) && p(e, a.semver)) return !1;
if (a.operator === g && b(e, a.semver)) return !1;
}
return !0;
};
}, {
"../classes/comparator": 228,
"../classes/range": 229,
"../classes/semver": 230,
"../functions/gt": 239,
"../functions/gte": 240,
"../functions/lt": 242,
"../functions/lte": 243,
"../functions/satisfies": 252
} ],
269: [ function(e, t) {
const r = e("../functions/satisfies.js"), i = e("../functions/compare.js");
t.exports = (e, t, n) => {
const s = [];
let o = null, a = null;
const f = e.sort((e, t) => i(e, t, n));
for (const e of f) if (r(e, t, n)) {
a = e;
o || (o = e);
} else {
a && s.push([ o, a ]);
a = null;
o = null;
}
o && s.push([ o, null ]);
const c = [];
for (const [e, t] of s) e === t ? c.push(e) : t || e !== f[0] ? t ? e === f[0] ? c.push(`<=${t}`) : c.push(`${e} - ${t}`) : c.push(`>=${e}`) : c.push("*");
const u = c.join(" || "), h = "string" == typeof t.raw ? t.raw : String(t);
return u.length < h.length ? u : t;
};
}, {
"../functions/compare.js": 236,
"../functions/satisfies.js": 252
} ],
270: [ function(e, t) {
const r = e("../classes/range.js"), i = e("../classes/comparator.js"), {ANY: n} = i, s = e("../functions/satisfies.js"), o = e("../functions/compare.js"), a = [ new i(">=0.0.0-0") ], f = [ new i(">=0.0.0") ], c = (e, t, r) => {
if (e === t) return !0;
if (1 === e.length && e[0].semver === n) {
if (1 === t.length && t[0].semver === n) return !0;
e = r.includePrerelease ? a : f;
}
if (1 === t.length && t[0].semver === n) {
if (r.includePrerelease) return !0;
t = f;
}
const i = new Set();
let c, d, l, p, b, m, g;
for (const t of e) ">" === t.operator || ">=" === t.operator ? c = u(c, t, r) : "<" === t.operator || "<=" === t.operator ? d = h(d, t, r) : i.add(t.semver);
if (i.size > 1) return null;
if (c && d) {
if ((l = o(c.semver, d.semver, r)) > 0) return null;
if (0 === l && (">=" !== c.operator || "<=" !== d.operator)) return null;
}
for (const e of i) {
if (c && !s(e, String(c), r)) return null;
if (d && !s(e, String(d), r)) return null;
for (const i of t) if (!s(e, String(i), r)) return !1;
return !0;
}
let y = !(!d || r.includePrerelease || !d.semver.prerelease.length) && d.semver, v = !(!c || r.includePrerelease || !c.semver.prerelease.length) && c.semver;
y && 1 === y.prerelease.length && "<" === d.operator && 0 === y.prerelease[0] && (y = !1);
for (const e of t) {
g = g || ">" === e.operator || ">=" === e.operator;
m = m || "<" === e.operator || "<=" === e.operator;
if (c) {
v && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === v.major && e.semver.minor === v.minor && e.semver.patch === v.patch && (v = !1);
if (">" === e.operator || ">=" === e.operator) {
if ((p = u(c, e, r)) === e && p !== c) return !1;
} else if (">=" === c.operator && !s(c.semver, String(e), r)) return !1;
}
if (d) {
y && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === y.major && e.semver.minor === y.minor && e.semver.patch === y.patch && (y = !1);
if ("<" === e.operator || "<=" === e.operator) {
if ((b = h(d, e, r)) === e && b !== d) return !1;
} else if ("<=" === d.operator && !s(d.semver, String(e), r)) return !1;
}
if (!e.operator && (d || c) && 0 !== l) return !1;
}
return !(c && m && !d && 0 !== l || d && g && !c && 0 !== l || v || y);
}, u = (e, t, r) => {
if (!e) return t;
const i = o(e.semver, t.semver, r);
return i > 0 ? e : i < 0 ? t : ">" === t.operator && ">=" === e.operator ? t : e;
}, h = (e, t, r) => {
if (!e) return t;
const i = o(e.semver, t.semver, r);
return i < 0 ? e : i > 0 ? t : "<" === t.operator && "<=" === e.operator ? t : e;
};
t.exports = (e, t, i = {}) => {
if (e === t) return !0;
e = new r(e, i);
t = new r(t, i);
let n = !1;
e: for (const r of e.set) {
for (const e of t.set) {
const t = c(r, e, i);
n = n || null !== t;
if (t) continue e;
}
if (n) return !1;
}
return !0;
};
}, {
"../classes/comparator.js": 228,
"../classes/range.js": 229,
"../functions/compare.js": 236,
"../functions/satisfies.js": 252
} ],
271: [ function(e, t) {
const r = e("../classes/range");
t.exports = (e, t) => new r(e, t).set.map(e => e.map(e => e.value).join(" ").trim().split(" "));
}, {
"../classes/range": 229
} ],
272: [ function(e, t) {
const r = e("../classes/range");
t.exports = (e, t) => {
try {
return new r(e, t).range || "*";
} catch (e) {
return null;
}
};
}, {
"../classes/range": 229
} ],
EditBox: [ function(e, t) {
"use strict";
cc._RF.push(t, "53322cCKMhM5q2Q5w/kuQHj", "EditBox");
cc.Class({
extends: cc.Component,
properties: {
editBox: cc.EditBox
},
onLoad: function() {
if (this.isMobile()) {
this.editBox.node.on("editing-did-began", this.onEditBoxFocus, this);
this.editBox.node.on("touchstart", this.onEditBoxFocus, this);
}
},
isMobile: function() {
return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
},
onEditBoxFocus: function(e) {
e.preventDefault();
this.editBox.blur();
}
});
cc._RF.pop();
}, {} ],
GameConfig: [ function(e, t) {
"use strict";
cc._RF.push(t, "8da19Kpt7FCnoycSPF3SsWw", "GameConfig");
var r = window;
r.K = {};
r.K.internetAvailable = !0;
r.K.Error = cc.Enum({
CredentialsError: 401,
SuccessFalseError: 404
});
r.K.WS = !1;
r.K.DeveloperMode = !0;
r.K.ServerAddress = {
ipAddress: "https://dev.casinoparadize.com"
};
r.K.ServerAPI = {
login: "/api/users/login",
game: "/api/games?platform=casinoParadise&category",
addtoFav: "/api/games/favourite",
password: "/api/users",
userDetails: "/api/users",
getGameById: "/api/games"
};
r.K.Sounds = {};
t.exports = {
K: K
};
cc._RF.pop();
}, {} ],
GamesPrefab: [ function(e, t) {
"use strict";
cc._RF.push(t, "e1ddc3b1cdF+o0AR8kLrxow", "GamesPrefab");
cc.Class({
extends: cc.Component,
properties: {
imageView: cc.Sprite,
imageClick: cc.Button,
addToFavouirteButton: cc.Button,
mywebView: cc.WebView,
webviewUrl: null,
lobbyNode: null,
redHeart: {
default: null,
type: cc.Node
},
blueHeart: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.setupEventListeners();
var e = cc.find("Canvas/LobbyNode");
if (e) {
this.lobbyNode = e.getComponent("Lobby");
this.lobbyNode;
}
},
setupEventListeners: function() {
this.imageClick.node.off("touchstart", this.onTouchStart, this);
this.imageClick.node.off("touchend", this.onTouchEnd, this);
this.imageClick.node.off("touchcancel", this.onTouchCancel, this);
this.imageClick.node.on("touchstart", this.onTouchStart, this);
this.imageClick.node.on("touchend", this.onTouchEnd, this);
this.imageClick.node.on("touchcancel", this.onTouchCancel, this);
},
updateItem: function(e, t) {
var r = this, i = e;
cc.assetManager.loadRemote(e.thumbnail, function(e, t) {
e ? console.error(e) : r.imageView.spriteFrame = new cc.SpriteFrame(t);
});
if ("fav" == t) {
this.blueHeart.active = !1;
this.redHeart.active = !0;
}
this.imageClick.node.off("click");
this.addToFavouirteButton.node.off("click");
this.imageClick.node.on("touchend", function(t) {
var i = t.getLocation().sub(r.touchStartPos).mag();
console.log(i, "on inside update End Prefab");
i < 10 && r.onClickItem(e);
r.imageClick.node.interactable = !1;
});
this.addToFavouirteButton.node.on("click", function() {
if (null != i.slug) {
r.addToFavouirte(i);
r.addToFavouirteButton.node.interactable = !1;
}
});
},
onTouchStart: function(e) {
this.touchStartPos = e.getLocation();
},
onTouchEnd: function(e) {
e.getLocation().sub(this.touchStartPos).mag();
},
onTouchCancel: function() {
this.touchStartPos = null;
},
onClickItem: function(e) {
var t = this;
if (null != e.slug) {
var r = K.ServerAddress.ipAddress + K.ServerAPI.getGameById + "/" + e.slug;
ServerCom.httpRequest("GET", r, "", function(e) {
if (null != e.url) {
var r = e.url;
t.lobbyNode && t.lobbyNode.openWebView(r);
}
}.bind(this));
}
},
addToFavouirte: function(e) {
var t = this;
if (null != e.slug) {
var r = {
gameId: e._id,
type: t.blueHeart.active ? "add" : "remove"
}, i = K.ServerAddress.ipAddress + K.ServerAPI.addtoFav + "/" + this.lobbyNode.id;
console.log(this.lobbyNode.id, "check user Id");
ServerCom.httpRequest("PUT", i, r, function(e) {
ServerCom.errorHeading.string = "Success";
ServerCom.errorLable.string = e.message;
if ("Game added to favourites" == e.message) {
t.redHeart.active = !0;
t.blueHeart.active = !1;
} else {
t.blueHeart.active = !0;
t.redHeart.active = !1;
}
ServerCom.loginErrorNode.active = !0;
setTimeout(function() {
ServerCom.loginErrorNode.active = !1;
}, 2e3);
t.lobbyNode && "fav" == t.lobbyNode.category && t.lobbyNode.fetchGames("fav");
}.bind(this));
}
}
});
cc._RF.pop();
}, {} ],
IframeScript: [ function(e, t) {
"use strict";
cc._RF.push(t, "45dadaxrkFEtqCXIL45wNwz", "IframeScript");
cc.Class({
extends: cc.Component,
properties: {
webView: cc.WebView
},
onload: function() {},
updateView: function(e) {
this.webView.url = e.url;
this.webView.active = !0;
}
});
cc._RF.pop();
}, {} ],
Lobby: [ function(e, t) {
"use strict";
cc._RF.push(t, "44269NOlMVGd7tbn16fpN+w", "Lobby");
var r = e("Login"), i = e("jsonwebtoken");
cc.Class({
extends: cc.Component,
properties: {
userId: {
default: null,
type: cc.Label
},
coinsLabel: {
default: null,
type: cc.Label
},
cloudAnimNode: {
default: null,
type: cc.Node
},
sprite: {
default: null,
type: cc.SpriteFrame
},
smallItemNode: {
default: null,
type: cc.Node
},
rightTiltNode: {
default: null,
type: cc.Node
},
leftTiltNode: {
default: null,
type: cc.Node
},
spinWheelNode: {
default: null,
type: cc.Node
},
OuterAnimation: {
default: null,
type: cc.Node
},
passwordNode: {
default: null,
type: cc.Node
},
passwordChangeButton: {
default: null,
type: cc.Node
},
popupNode: {
default: null,
type: cc.Node
},
oldPassword: {
default: null,
type: cc.EditBox
},
newPassword: {
default: null,
type: cc.EditBox
},
confirmPassword: {
default: null,
type: cc.EditBox
},
profileNode: {
default: null,
type: cc.Node
},
saveProfileBtn: {
default: null,
type: cc.Node
},
allTab: {
default: null,
type: cc.Node
},
fishTab: {
default: null,
type: cc.Node
},
favTab: {
default: null,
type: cc.Node
},
slotTab: {
default: null,
type: cc.Node
},
kenoTab: {
default: null,
type: cc.Node
},
otherTab: {
default: null,
type: cc.Node
},
loginNode: {
default: null,
type: r
},
id: null,
scrollView: cc.ScrollView,
itemPrefab: cc.Prefab,
smallItemPrefab: cc.Prefab,
category: null,
lefttiltAngle: -7,
tiltDuration: .2,
originalRotation: 0,
righttiltAngle: 7,
targetX: 0,
moveDuration: 2,
scaleUp: .9,
scaleNormal: .9,
itemsPerLoad: 10,
myWebViewParent: {
default: null,
type: cc.Node
},
myWebView: cc.WebView,
customKeyboard: {
default: null,
type: cc.Node
},
smallAlphabet: {
default: null,
type: cc.Node
},
capitalAlphabet: {
default: null,
type: cc.Node
},
symbolsAlphabet: {
default: null,
type: cc.Node
},
capsButton: {
default: null,
type: cc.Node
},
smallButton: {
default: null,
type: cc.Node
},
deleteButton: {
default: null,
type: cc.Node
},
spaceButton: {
default: null,
type: cc.Node
},
commaButton: {
default: null,
type: cc.Node
},
dotButton: {
default: null,
type: cc.Node
}
},
onLoad: function() {
var e = this;
this.category || (this.category = "all");
this.activeInputField = null;
this.setupLobbyInputFocusListeners();
this.setupLobbyKeyboardButtonListeners();
this.disableDefaultKeyboard();
this.itemsToLoad = [];
this.currentIndex = 0;
this.setFullScreenWidth();
cc.view.setResizeCallback(this.setFullScreenWidth.bind(this));
this.scrollView.node.on("scroll-to-right", this.loadMoreItems, this);
var t = cc.v2(415, 0), r = cc.v2(-415, 0), i = cc.v2(415, 0);
this.cloudAnimNode.setPosition(t);
var n = cc.tween().to(4, {
position: r
}).call(function() {
e.cloudAnimNode.setPosition(i);
});
cc.tween(this.cloudAnimNode).repeatForever(n).start();
this.getUserDetails();
this.fetchGames(this.category);
},
fetchGames: function(e) {
this.scrollView.content.removeAllChildren();
var t = K.ServerAddress.ipAddress + K.ServerAPI.game + "=" + e;
ServerCom.httpRequest("GET", t, " ", function(t) {
if (0 !== t.featured.length || 0 !== t.others.length) {
var r = t.others || [], i = t.featured || [];
this.itemsToLoad = [];
for (var n = 0, s = 0; s < r.length; s++) {
if (s > 0 && s % 2 == 0 && n < i.length) {
this.itemsToLoad.push({
data: i[n],
prefab: this.smallItemPrefab
});
n++;
}
this.itemsToLoad.push({
data: r[s],
prefab: this.itemPrefab
});
}
for (;n < i.length; ) {
this.itemsToLoad.push({
data: i[n],
prefab: this.smallItemPrefab
});
n++;
}
if (0 === r.length && i.length > 0) for (var o = 0; o < i.length; o++) this.itemsToLoad.push({
data: i[o],
prefab: this.smallItemPrefab
});
this.currentIndex = 0;
this.loadMoreItems(e);
} else {
ServerCom.errorLable.string = "No Games Found For This Category";
ServerCom.loginErrorNode.active = !0;
setTimeout(function() {
ServerCom.loginErrorNode.active = !1;
}, 2e3);
}
}.bind(this));
},
loadMoreItems: function(e) {
if (!(this.currentIndex >= this.itemsToLoad.length)) {
for (var t = Math.min(this.currentIndex + this.itemsPerLoad, this.itemsToLoad.length), r = this.currentIndex; r < t; r++) {
var i = this.itemsToLoad[r];
this.populateItems(i.data, i.prefab, e);
}
this.currentIndex = t;
}
},
populateItems: function(e, t, r) {
var i = cc.instantiate(t);
i.getComponent("GamesPrefab").updateItem(e, r);
this.scrollView.content.addChild(i);
},
getGamesByCategoryAll: function() {
this.category = "all";
[ this.fishTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.kenoTab.getChildByName("bg"), this.otherTab.getChildByName("bg") ].forEach(function(e) {
return e.active = !1;
});
this.allTab.getChildByName("bg").active = !0;
this.fetchGames(this.category);
},
getGamesByCategoryfish: function() {
this.category = "fish";
[ this.allTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.kenoTab.getChildByName("bg"), this.otherTab.getChildByName("bg") ].forEach(function(e) {
return e.active = !1;
});
this.fishTab.getChildByName("bg").active = !0;
this.fetchGames(this.category);
},
getGamesByCategoryfav: function() {
this.category = "fav";
[ this.fishTab.getChildByName("bg"), this.allTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.kenoTab.getChildByName("bg"), this.otherTab.getChildByName("bg") ].forEach(function(e) {
return e.active = !1;
});
this.favTab.getChildByName("bg").active = !0;
this.fetchGames(this.category);
},
getGamesByCategorySlot: function() {
this.category = "slot";
[ this.fishTab.getChildByName("bg"), this.allTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.kenoTab.getChildByName("bg"), this.otherTab.getChildByName("bg") ].forEach(function(e) {
return e.active = !1;
});
this.slotTab.getChildByName("bg").active = !0;
this.fetchGames(this.category);
},
getGamesByCategoryKeno: function() {
this.category = "keno";
[ this.fishTab.getChildByName("bg"), this.allTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.otherTab.getChildByName("bg") ].forEach(function(e) {
return e.active = !1;
});
this.kenoTab.getChildByName("bg").active = !0;
this.fetchGames(this.category);
},
getGamesByCategoryOther: function() {
this.category = "others";
[ this.fishTab.getChildByName("bg"), this.allTab.getChildByName("bg"), this.favTab.getChildByName("bg"), this.slotTab.getChildByName("bg"), this.kenoTab.getChildByName("bg") ].forEach(function(e) {
return e.active = !1;
});
this.otherTab.getChildByName("bg").active = !0;
this.fetchGames(this.category);
},
zoomFullScreenClick: function() {
document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ? document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
this.setFullScreenWidth();
},
closeSpinNode: function() {
this.spinWheelNode.active && (this.spinWheelNode.active = !1);
},
openSpinWheelNode: function() {
var e = cc.rotateBy(5, 360), t = cc.repeatForever(e);
this.OuterAnimation.runAction(t);
this.spinWheelNode.active || (this.spinWheelNode.active = !0);
},
openWebView: function(e) {
var t = this, r = this, i = null;
if (cc.sys.isBrowser) for (var n = document.cookie.split(";"), s = 0; s < n.length; s++) {
var o = n[s].trim();
if (o.startsWith("userToken=")) {
i = o.substring("userToken=".length, o.length);
break;
}
} else i = cc.sys.localStorage.getItem("userToken");
this.myWebView.url = e;
document.fullscreenElement ? cc.sys.isMobile && cc.sys.isBrowser && (this.myWebView.node.width = 2250) : cc.sys.isMobile && cc.sys.isBrowser ? this.myWebView.node.width = 2200 : this.myWebView.node.width = 2250;
this.myWebViewParent.active = !0;
this.myWebView.node.on("loaded", function() {
i && t.myWebView.evaluateJS("\n               inst.myWebView.node._components[0]._impl._iframe.contentWindow.postMessage({ type: 'authToken', token: '" + i + "' }, '" + e + "');\n            ");
});
window.addEventListener("message", function(t) {
var n = t.data;
"authToken" === n && r.myWebView.node._components[0]._impl._iframe.contentWindow.postMessage({
type: "authToken",
cookie: i
}, "" + e);
if ("onExit" === n) {
r.myWebView.url = "";
r.myWebViewParent.active = !1;
}
});
},
getUserDetails: function() {
var e = this, t = K.ServerAddress.ipAddress + K.ServerAPI.userDetails;
ServerCom.httpRequest("GET", t, "", function(t) {
e.id = t._id;
e.userId.string = t.username;
e.coinsLabel.string = t.credits;
});
},
capitalizeFirstLetter: function(e) {
return e.charAt(0).toUpperCase() + e.slice(1);
},
openProflePopup: function() {
this.popupNode.active = !0;
this.profileNode.active = !0;
},
logOutClick: function() {
this.node.active = !1;
this.loginNode.logutClick();
},
passwordChangeBtn: function() {
if ("" == this.oldPassword.string || "" == this.newPassword.string || "" == this.confirmPassword.string) {
ServerCom.errorLable.string = "All fields are mandatory";
ServerCom.loginErrorNode.active = !0;
setTimeout(function() {
ServerCom.loginErrorNode.active = !1;
}, 2e3);
} else {
if (this.newPassword.string != this.confirmPassword.string) {
ServerCom.errorLable.string = "New Password and confirm password did not match";
ServerCom.loginErrorNode.active = !0;
setTimeout(function() {
ServerCom.loginErrorNode.active = !1;
}, 2e3);
return;
}
var e = null;
if (!e && cc.sys.isBrowser) for (var t = document.cookie.split(";"), r = 0; r < t.length; r++) {
var n = t[r].trim();
if (n.startsWith("token=")) {
e = n.substring("token=".length, n.length);
break;
}
}
i.decode(e);
var s = K.ServerAddress.ipAddress + K.ServerAPI.password + "/" + this.id, o = {
existingPassword: this.oldPassword.string,
password: this.newPassword.string
};
ServerCom.httpRequest("PUT", s, o, function(e) {
if (e.message) {
ServerCom.errorHeading.string = "Password Changed Successfully";
ServerCom.errorLable.string = e.message;
ServerCom.loginErrorNode.active = !0;
setTimeout(function() {
ServerCom.loginErrorNode.active = !1;
}, 2e3);
}
}.bind(this));
this.passwordNode.active = !1;
this.popupNode.active = !1;
}
},
changePassword: function() {
this.passwordNode.active = !0;
this.popupNode.active = !0;
},
closePopupBtn: function() {
if (this.passwordNode.active || this.profileNode.active) {
this.passwordNode.active = !1;
this.profileNode.active = !1;
}
this.popupNode.active = !1;
},
saveProfile: function() {
this.profileNode.active = !1;
this.popupNode.active = !1;
},
setFullScreenWidth: function() {
if (document.fullscreenElement) if (cc.sys.isMobile && cc.sys.isBrowser) {
this.scrollView.node.width = 2400;
this.scrollView.node.getChildByName("view").width = 2400;
} else {
var e = cc.winSize.width;
this.scrollView.node.width = e;
this.scrollView.node.getChildByName("view").width = e;
} else {
this.scrollView.node.width = 2250;
this.scrollView.node.getChildByName("view").width = 2250;
}
},
setupLobbyInputFocusListeners: function() {
if (cc.sys.isMobile && cc.sys.isBrowser) {
this.oldPassword && this.oldPassword.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
this.newPassword && this.newPassword.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
if (this.confirmPassword) {
this.confirmPassword.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
this.confirmPassword.node.on("editing-did-began", this.onInputFieldFocused, this);
this.confirmPassword.node.on("editing-did-ended", this.onInputFieldBlurred, this);
}
}
},
onInputFieldClicked: function(e) {
var t = e.currentTarget.getComponent(cc.EditBox);
if (t) {
this.activeInputField = t;
this.customKeyboard && (this.customKeyboard.active = !0);
}
},
onInputFieldFocused: function(e) {
var t = e.node.getComponent(cc.EditBox);
t && (t.placeholder = "");
},
onInputFieldBlurred: function(e) {
e.node.getComponent(cc.EditBox);
},
setupLobbyKeyboardButtonListeners: function() {
var e = this;
this.getAllKeyboardButtons().forEach(function(t) {
t.on(cc.Node.EventType.TOUCH_END, e.onKeyboardButtonClicked, e);
});
this.deleteButton && this.deleteButton.on(cc.Node.EventType.TOUCH_END, this.onDeleteButtonClicked, this);
},
getAllKeyboardButtons: function() {
var e = [];
return (e = (e = (e = (e = (e = e.concat(this.smallAlphabet.children)).concat(this.capitalAlphabet.children)).concat(this.symbolsAlphabet.children)).concat(this.spaceButton)).concat(this.commaButton)).concat(this.dotButton);
},
onKeyboardButtonClicked: function(e) {
var t = e.target._components[1].clickEvents[0].customEventData;
this.appendToActiveInput(t);
},
appendToActiveInput: function(e) {
this.activeInputField && (this.activeInputField.string += e);
},
onDeleteButtonClicked: function() {
this.removeFromActiveInput();
},
removeFromActiveInput: function() {
this.activeInputField && this.activeInputField.string.length > 0 && (this.activeInputField.string = this.activeInputField.string.slice(0, -1));
},
disableDefaultKeyboard: function() {
cc.sys.isMobile && cc.sys.isBrowser && document.querySelectorAll("input, textarea").forEach(function(e) {
e.style.pointerEvents = "none";
});
}
});
cc._RF.pop();
}, {
Login: "Login",
jsonwebtoken: 202
} ],
Login: [ function(e, t) {
"use strict";
cc._RF.push(t, "ac1ac5oJ6VEUL3rD+Zja0yl", "Login");
cc.Class({
extends: cc.Component,
properties: {
userName: {
default: null,
type: cc.EditBox
},
password: {
default: null,
type: cc.EditBox
},
rememberMe: {
default: null,
type: cc.Toggle
},
lobbyNode: {
default: null,
type: cc.Node
},
errorLable: {
default: null,
type: cc.Label
},
loginErrorNode: {
default: null,
type: cc.Node
},
customKeyboard: {
default: null,
type: cc.Node
},
smallAlphabet: {
default: null,
type: cc.Node
},
capitalAlphabet: {
default: null,
type: cc.Node
},
symbolsAlphabet: {
default: null,
type: cc.Node
},
capsButton: {
default: null,
type: cc.Node
},
smallButton: {
default: null,
type: cc.Node
},
deleteButton: {
default: null,
type: cc.Node
},
spaceButton: {
default: null,
type: cc.Node
},
commaButton: {
default: null,
type: cc.Node
},
dotButton: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.rememberMe && (this.rememberMe.isChecked = !1);
this.activeInputField = null;
this.setupInputFocusListeners();
this.setupKeyboardButtonListeners();
this.disableDefaultKeyboard();
},
disableDefaultKeyboard: function() {
cc.sys.isMobile && cc.sys.isBrowser && document.querySelectorAll("input, textarea").forEach(function(e) {
e.style.pointerEvents = "none";
});
},
setupInputFocusListeners: function() {
if (cc.sys.isMobile && cc.sys.isBrowser) {
this.userName && this.userName.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
this.password && this.password.node.on(cc.Node.EventType.TOUCH_END, this.onInputFieldClicked, this);
}
},
onInputFieldClicked: function(e) {
var t = this, r = e.currentTarget.getComponent(cc.EditBox);
if (r) {
this.activeInputField = r;
if (this.customKeyboard) {
this.customKeyboard.active = !0;
e.preventDefault();
this.scheduleOnce(function() {
t.activeInputField.blur();
}, .1);
}
}
},
setupKeyboardButtonListeners: function() {
var e = this;
this.getAllKeyboardButtons().forEach(function(t) {
t.on(cc.Node.EventType.TOUCH_END, e.onKeyboardButtonClicked, e);
});
this.deleteButton && this.deleteButton.on(cc.Node.EventType.TOUCH_END, this.onDeleteButtonClicked, this);
},
getAllKeyboardButtons: function() {
var e = [];
return (e = (e = (e = (e = (e = e.concat(this.smallAlphabet.children)).concat(this.capitalAlphabet.children)).concat(this.symbolsAlphabet.children)).concat(this.spaceButton)).concat(this.commaButton)).concat(this.dotButton);
},
onKeyboardButtonClicked: function(e) {
var t = e.target._components[1].clickEvents[0].customEventData;
this.appendToActiveInput(t);
},
appendToActiveInput: function(e) {
this.activeInputField && (this.activeInputField.string += e);
},
onDeleteButtonClicked: function() {
this.removeFromActiveInput();
},
logutClick: function() {
this.lobbyNode.active && (this.lobbyNode.active = !1);
},
removeFromActiveInput: function() {
this.activeInputField && this.activeInputField.string.length > 0 && (this.activeInputField.string = this.activeInputField.string.slice(0, -1));
},
onLoginClick: function() {
var e = this, t = K.ServerAddress.ipAddress + K.ServerAPI.login, r = {
username: this.userName.string,
password: this.password.string
};
if ("" != this.userName.string && "" != this.password.string) ServerCom.httpRequest("POST", t, r, function(e) {
if (e.token) {
var t = Math.floor(10 * Math.random()) + 1;
if (cc.sys.isBrowser) {
document.cookie = "userToken=" + e.token + "; path=/;";
document.cookie = "index = " + t;
} else {
cc.sys.localStorage.setItem("userToken", e.token);
cc.sys.localStorage.setItem("index", t);
}
setTimeout(function() {
this.lobbyNode.active = !0;
}.bind(this), 1e3);
}
}.bind(this)); else {
this.errorLable.string = "Username or Password fields are empty";
this.loginErrorNode.active = !0;
setTimeout(function() {
e.loginErrorNode.active = !1;
}, 2e3);
}
},
smallAlphabetBUttonClicked: function() {
if (this.capitalAlphabet.active) {
this.capitalAlphabet.active = !1;
this.smallAlphabet.active = !0;
this.symbolsAlphabet.active && (this.symbolsAlphabet.active = !1);
this.smallButton.active = !1;
this.capsButton.active = !0;
} else {
this.symbolsAlphabet.active && (this.symbolsAlphabet.active = !1);
this.capitalAlphabet.active = !0;
this.smallAlphabet.active = !1;
this.smallButton.active = !0;
this.capsButton.active = !1;
}
},
specialSymbolClicked: function() {
if (this.capitalAlphabet.active || this.smallAlphabet.active) {
this.smallAlphabet.active = !1;
this.capitalAlphabet.active = !1;
this.symbolsAlphabet.active = !0;
} else {
this.symbolsAlphabet.active = !1;
if (!this.smallAlphabet.active) {
this.smallAlphabet.active = !0;
this.capitalAlphabet.active = !1;
}
}
},
closeKeyBoard: function() {
this.customKeyboard.active = !1;
}
});
cc._RF.pop();
}, {} ],
ResponseType: [ function(e, t) {
"use strict";
cc._RF.push(t, "908efYoU2tBd4aoL1r8p0Jt", "ResponseType");
cc._RF.pop();
}, {} ],
ServerCom: [ function(e, t) {
"use strict";
cc._RF.push(t, "bd275iqnndLToBuUOYxMq3n", "ServerCom");
var r = window;
cc.Class({
extends: cc.Component,
properties: {
loading: {
default: null,
type: cc.Node
},
reconnecting: {
default: null,
type: cc.Node
},
tracker: {
default: {}
},
errorLable: {
default: null,
type: cc.Label
},
loginErrorNode: {
default: null,
type: cc.Node
},
errorHeading: {
default: null,
type: cc.Label
},
loaderAnimNode: {
default: null,
type: cc.Node
},
trackerCount: 0,
timer: 0
},
onLoad: function() {
r.ServerCom = this;
this.checkOrientation();
cc.view.on("canvas-resize", this.checkOrientation, this);
},
checkOrientation: function() {
try {
var e = cc.winSize;
e.width > e.height ? cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE) : cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
} catch (e) {}
},
clearTracker: function() {
this.trackerCount = 0;
this.tracker = {};
},
httpRequest: function(e, t, r, i, n, s) {
var o = this, a = new XMLHttpRequest();
a.timeout = s || 4e3;
if (!ServerCom.loading.active) {
ServerCom.loading.active = !0;
o.startLoaderAnimation();
}
a.onreadystatechange = function() {
K.internetAvailable = !0;
if (4 == a.readyState) {
ServerCom.loading.active = !1;
o.stopLoaderAnimation();
var e = a.responseText;
if (a.status >= 200 && a.status < 400) {
if (null != i) {
var t = JSON.parse(e);
i(t);
}
} else try {
var r = JSON.parse(e);
r.error && r.error;
o.errorLable.string = r.error ? r.error : r.message;
o.loginErrorNode.active = !0;
setTimeout(function() {
o.loginErrorNode.active = !1;
}, 2e3);
} catch (e) {}
}
};
a.onerror = function() {
ServerCom.loading.active = !1;
o.stopLoaderAnimation();
K.internetAvailable = !1;
try {
var e = JSON.parse(a.responseText);
e.error && e.error;
} catch (e) {}
};
a.ontimeout = function() {
ServerCom.loading.active = !1;
o.stopLoaderAnimation();
K.disconnectRequestedByPlayer = !1;
K.internetAvailable = !1;
o.errorLable.string = "Something went wrong", o.loginErrorNode.active = !0;
setTimeout(function() {
o.loginErrorNode.active = !1;
}, 2e3);
};
a.open(e, t, !0);
a.setRequestHeader("Content-Type", "application/json");
var f = null;
if (!f && cc.sys.isBrowser) for (var c = document.cookie.split(";"), u = 0; u < c.length; u++) {
var h = c[u].trim();
if (h.startsWith("userToken=")) {
f = h.substring("userToken=".length, h.length);
break;
}
}
f && a.setRequestHeader("Authorization", "Bearer " + f);
"POST" === e || "PUT" === e ? a.send(JSON.stringify(r)) : "GET" === e && a.send();
},
startLoaderAnimation: function() {
this.loaderAnimNode._tween && this.loaderAnimNode._tween.stop();
this.loaderAnimNode._tween = cc.tween(this.loaderAnimNode).repeatForever(cc.tween().to(1, {
angle: -360
})).start();
},
stopLoaderAnimation: function() {
if (this.loaderAnimNode._tween) {
this.loaderAnimNode._tween.stop();
this.loaderAnimNode.angle = 0;
}
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "GameConfig", "ResponseType", "EditBox", "GamesPrefab", "Lobby", "IframeScript", "ServerCom", "Login" ]);