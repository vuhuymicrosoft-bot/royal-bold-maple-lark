import { o as __toESM } from "../_runtime.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CgR0w0Ib.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var REACH = 5.15;
var B = {
	air: 0,
	grass: 1,
	dirt: 2,
	stone: 3,
	sand: 4,
	sandstone: 5,
	snow: 6,
	ice: 7,
	log: 8,
	leaves: 9,
	planks: 10,
	cobble: 11,
	coalOre: 12,
	copper: 13,
	iron: 14,
	crystal: 15,
	bedrock: 16,
	water: 17,
	torch: 18,
	bench: 19,
	furnace: 20,
	chest: 21,
	glass: 22,
	brick: 23,
	ladder: 24,
	cactus: 25,
	slog: 26,
	sleaves: 27,
	gravel: 28,
	clay: 29,
	tallgrass: 30,
	flower: 31,
	bush: 32,
	lamp: 33,
	bed: 34,
	door: 35,
	doorOpen: 36,
	heart: 37,
	sprout: 38,
	orchid: 39
};
var I = {
	stick: 40,
	woodPick: 41,
	stonePick: 42,
	ironPick: 43,
	crystalPick: 44,
	woodAxe: 45,
	stoneAxe: 46,
	ironAxe: 47,
	woodShovel: 48,
	stoneShovel: 49,
	ironShovel: 50,
	woodSword: 51,
	stoneSword: 52,
	ironSword: 53,
	crystalSword: 54,
	gel: 55,
	coal: 56,
	apple: 57,
	copperIngot: 58,
	ironIngot: 59,
	copperPick: 60,
	copperAxe: 61,
	copperShovel: 62,
	copperSword: 63,
	seed: 64,
	petal: 65
};
var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
var lerp = (a, b, t) => a + (b - a) * t;
var HAND = {
	kind: "hand",
	tier: 0,
	speed: 1,
	dmg: 1,
	dura: 0
};
var TOOLS = {
	[I.woodPick]: {
		kind: "pick",
		tier: 1,
		speed: 2.5,
		dmg: 2,
		dura: 90
	},
	[I.stonePick]: {
		kind: "pick",
		tier: 2,
		speed: 4.2,
		dmg: 3,
		dura: 180
	},
	[I.copperPick]: {
		kind: "pick",
		tier: 3,
		speed: 5.3,
		dmg: 3,
		dura: 250
	},
	[I.ironPick]: {
		kind: "pick",
		tier: 3,
		speed: 6.4,
		dmg: 4,
		dura: 360
	},
	[I.crystalPick]: {
		kind: "pick",
		tier: 4,
		speed: 9,
		dmg: 5,
		dura: 760
	},
	[I.woodAxe]: {
		kind: "axe",
		tier: 1,
		speed: 2.5,
		dmg: 3,
		dura: 90
	},
	[I.stoneAxe]: {
		kind: "axe",
		tier: 2,
		speed: 4.2,
		dmg: 4,
		dura: 180
	},
	[I.copperAxe]: {
		kind: "axe",
		tier: 3,
		speed: 5.3,
		dmg: 4,
		dura: 250
	},
	[I.ironAxe]: {
		kind: "axe",
		tier: 3,
		speed: 6.4,
		dmg: 5,
		dura: 360
	},
	[I.woodShovel]: {
		kind: "shovel",
		tier: 1,
		speed: 2.6,
		dmg: 2,
		dura: 90
	},
	[I.stoneShovel]: {
		kind: "shovel",
		tier: 2,
		speed: 4.4,
		dmg: 2,
		dura: 180
	},
	[I.copperShovel]: {
		kind: "shovel",
		tier: 3,
		speed: 5.5,
		dmg: 2,
		dura: 250
	},
	[I.ironShovel]: {
		kind: "shovel",
		tier: 3,
		speed: 6.6,
		dmg: 3,
		dura: 360
	},
	[I.woodSword]: {
		kind: "sword",
		tier: 1,
		speed: 1.5,
		dmg: 4,
		dura: 90
	},
	[I.stoneSword]: {
		kind: "sword",
		tier: 2,
		speed: 1.6,
		dmg: 5,
		dura: 180
	},
	[I.copperSword]: {
		kind: "sword",
		tier: 3,
		speed: 1.65,
		dmg: 6,
		dura: 250
	},
	[I.ironSword]: {
		kind: "sword",
		tier: 3,
		speed: 1.7,
		dmg: 7,
		dura: 360
	},
	[I.crystalSword]: {
		kind: "sword",
		tier: 4,
		speed: 1.8,
		dmg: 9,
		dura: 760
	}
};
function toolInfo(id) {
	return TOOLS[id] ?? HAND;
}
function isTool(id) {
	return id in TOOLS;
}
function maxStack(id) {
	return isTool(id) ? 1 : 64;
}
function foodHeal(id) {
	if (id === I.gel) return 2;
	if (id === I.apple) return 2;
	if (id === I.petal) return 1;
	return 0;
}
function hungerFill(id) {
	if (id === I.gel) return 4;
	if (id === I.apple) return 3;
	if (id === I.petal) return 5;
	return 0;
}
function def(name, color, extra = {}) {
	return {
		name,
		solid: true,
		opaque: true,
		liquid: false,
		place: true,
		hardness: 1,
		tool: "any",
		emit: 0,
		climb: false,
		hurt: 0,
		replace: false,
		color,
		...extra
	};
}
var BLOCKS = {
	[B.grass]: def("Cỏ", "#63b34a", {
		hardness: .5,
		tool: "shovel"
	}),
	[B.dirt]: def("Đất", "#8a5a32", {
		hardness: .48,
		tool: "shovel"
	}),
	[B.stone]: def("Đá", "#8b8e96", {
		hardness: 2.15,
		tool: "pick"
	}),
	[B.sand]: def("Cát", "#e4d0a0", {
		hardness: .45,
		tool: "shovel"
	}),
	[B.sandstone]: def("Đá cát", "#c9b488", {
		hardness: 2,
		tool: "pick"
	}),
	[B.snow]: def("Tuyết", "#f2f6fb", {
		hardness: .35,
		tool: "shovel"
	}),
	[B.ice]: def("Băng", "#b7def0", {
		hardness: .55,
		tool: "pick"
	}),
	[B.log]: def("Gỗ sồi", "#6d4528", {
		hardness: .8,
		tool: "axe"
	}),
	[B.leaves]: def("Lá sồi", "#2f8a3c", {
		solid: false,
		opaque: false,
		hardness: .22,
		tool: "any"
	}),
	[B.planks]: def("Ván gỗ", "#c49658", {
		hardness: .7,
		tool: "axe"
	}),
	[B.cobble]: def("Đá cuội", "#7c7f88", {
		hardness: 1.9,
		tool: "pick"
	}),
	[B.coalOre]: def("Quặng than", "#5c5f68", {
		hardness: 2.3,
		tool: "pick"
	}),
	[B.copper]: def("Quặng đồng", "#b8743e", {
		hardness: 2.4,
		tool: "pick"
	}),
	[B.iron]: def("Quặng sắt", "#c9b7a4", {
		hardness: 2.9,
		tool: "pick"
	}),
	[B.crystal]: def("Tinh thể", "#6ed8cf", {
		hardness: 3.4,
		tool: "pick"
	}),
	[B.bedrock]: def("Đáy khe", "#2c2e34", {
		place: false,
		hardness: Infinity,
		tool: "none"
	}),
	[B.water]: def("Nước", "#3a8ec8", {
		solid: false,
		opaque: false,
		liquid: true,
		place: false,
		hardness: Infinity,
		tool: "none"
	}),
	[B.torch]: def("Đuốc", "#e8943a", {
		solid: false,
		opaque: false,
		hardness: .05,
		emit: 14,
		tool: "any"
	}),
	[B.bench]: def("Bàn chế", "#b8884e", {
		hardness: .75,
		tool: "axe"
	}),
	[B.furnace]: def("Lò nung", "#6a6d74", {
		hardness: 2.6,
		tool: "pick"
	}),
	[B.chest]: def("Rương", "#a8743e", {
		hardness: .8,
		tool: "axe"
	}),
	[B.glass]: def("Kính", "#d5f1fb", {
		opaque: false,
		hardness: .28,
		tool: "any"
	}),
	[B.brick]: def("Gạch", "#a44b3a", {
		hardness: 2.2,
		tool: "pick"
	}),
	[B.ladder]: def("Thang", "#b88858", {
		solid: false,
		opaque: false,
		climb: true,
		hardness: .35,
		tool: "axe"
	}),
	[B.cactus]: def("Xương rồng", "#2f7a3a", {
		hardness: .35,
		tool: "any",
		hurt: 1
	}),
	[B.slog]: def("Gỗ thông", "#4e6248", {
		hardness: .8,
		tool: "axe"
	}),
	[B.sleaves]: def("Lá thông", "#1f6b48", {
		solid: false,
		opaque: false,
		hardness: .22
	}),
	[B.gravel]: def("Sỏi", "#9a9388", {
		hardness: .5,
		tool: "shovel"
	}),
	[B.clay]: def("Đất sét", "#9a7d78", {
		hardness: .5,
		tool: "shovel"
	}),
	[B.tallgrass]: def("Cỏ cao", "#3e9a4a", {
		solid: false,
		opaque: false,
		place: false,
		replace: true,
		hardness: .02
	}),
	[B.flower]: def("Hoa khe", "#e25b78", {
		solid: false,
		opaque: false,
		place: false,
		replace: true,
		hardness: .02
	}),
	[B.bush]: def("Bụi khô", "#a48448", {
		solid: false,
		opaque: false,
		place: false,
		replace: true,
		hardness: .02
	}),
	[B.lamp]: def("Đèn đồng", "#e0a050", {
		solid: false,
		opaque: false,
		emit: 15,
		hardness: .3,
		tool: "pick"
	}),
	[B.bed]: def("Giường rêu", "#c45b6e", {
		hardness: .45,
		tool: "axe"
	}),
	[B.door]: def("Cửa gỗ", "#a87848", {
		hardness: .7,
		tool: "axe"
	}),
	[B.doorOpen]: def("Cửa mở", "#a87848", {
		solid: false,
		opaque: false,
		place: false,
		hardness: .7,
		tool: "axe"
	}),
	[B.heart]: def("Tim khe", "#5ee0d0", {
		place: false,
		hardness: 7.2,
		tool: "pick",
		emit: 12
	}),
	[B.sprout]: def("Mầm lan", "#7dce6a", {
		solid: false,
		opaque: false,
		place: false,
		replace: true,
		hardness: .02
	}),
	[B.orchid]: def("Lan khe", "#e25b78", {
		solid: false,
		opaque: false,
		place: false,
		replace: true,
		hardness: .02
	})
};
function blockDef(id) {
	return BLOCKS[id] ?? null;
}
function itemName(id) {
	if (BLOCKS[id]) return BLOCKS[id].name;
	return {
		[I.stick]: "Que gỗ",
		[I.woodPick]: "Cuốc gỗ",
		[I.stonePick]: "Cuốc đá",
		[I.ironPick]: "Cuốc sắt",
		[I.crystalPick]: "Cuốc tinh thể",
		[I.woodAxe]: "Rìu gỗ",
		[I.stoneAxe]: "Rìu đá",
		[I.ironAxe]: "Rìu sắt",
		[I.woodShovel]: "Xẻng gỗ",
		[I.stoneShovel]: "Xẻng đá",
		[I.ironShovel]: "Xẻng sắt",
		[I.woodSword]: "Kiếm gỗ",
		[I.stoneSword]: "Kiếm đá",
		[I.ironSword]: "Kiếm sắt",
		[I.crystalSword]: "Kiếm tinh thể",
		[I.gel]: "Gel rêu",
		[I.coal]: "Than",
		[I.apple]: "Táo rừng",
		[I.copperIngot]: "Thỏi đồng",
		[I.ironIngot]: "Thỏi sắt",
		[I.copperPick]: "Cuốc đồng",
		[I.copperAxe]: "Rìu đồng",
		[I.copperShovel]: "Xẻng đồng",
		[I.copperSword]: "Kiếm đồng",
		[I.seed]: "Hạt lan",
		[I.petal]: "Cánh lan"
	}[id] ?? "Vật phẩm";
}
var RECIPES = [
	{
		id: "planks",
		out: B.planks,
		n: 4,
		need: [[B.log, 1]],
		station: "hand"
	},
	{
		id: "planks-s",
		out: B.planks,
		n: 4,
		need: [[B.slog, 1]],
		station: "hand"
	},
	{
		id: "sticks",
		out: I.stick,
		n: 4,
		need: [[B.planks, 2]],
		station: "hand"
	},
	{
		id: "wpick",
		out: I.woodPick,
		n: 1,
		need: [[B.planks, 3], [I.stick, 2]],
		station: "hand"
	},
	{
		id: "waxe",
		out: I.woodAxe,
		n: 1,
		need: [[B.planks, 3], [I.stick, 2]],
		station: "hand"
	},
	{
		id: "wshovel",
		out: I.woodShovel,
		n: 1,
		need: [[B.planks, 1], [I.stick, 2]],
		station: "hand"
	},
	{
		id: "wsword",
		out: I.woodSword,
		n: 1,
		need: [[B.planks, 2], [I.stick, 1]],
		station: "hand"
	},
	{
		id: "bench",
		out: B.bench,
		n: 1,
		need: [[B.planks, 4]],
		station: "hand"
	},
	{
		id: "torch",
		out: B.torch,
		n: 4,
		need: [[I.coal, 1], [I.stick, 1]],
		station: "hand"
	},
	{
		id: "ladder",
		out: B.ladder,
		n: 3,
		need: [[I.stick, 2]],
		station: "hand"
	},
	{
		id: "seeds",
		out: I.seed,
		n: 2,
		need: [[I.petal, 1]],
		station: "hand"
	},
	{
		id: "spick",
		out: I.stonePick,
		n: 1,
		need: [[B.cobble, 3], [I.stick, 2]],
		station: "bench"
	},
	{
		id: "saxe",
		out: I.stoneAxe,
		n: 1,
		need: [[B.cobble, 3], [I.stick, 2]],
		station: "bench"
	},
	{
		id: "sshovel",
		out: I.stoneShovel,
		n: 1,
		need: [[B.cobble, 1], [I.stick, 2]],
		station: "bench"
	},
	{
		id: "ssword",
		out: I.stoneSword,
		n: 1,
		need: [[B.cobble, 2], [I.stick, 1]],
		station: "bench"
	},
	{
		id: "cupick",
		out: I.copperPick,
		n: 1,
		need: [[I.copperIngot, 3], [I.stick, 2]],
		station: "bench"
	},
	{
		id: "cuaxe",
		out: I.copperAxe,
		n: 1,
		need: [[I.copperIngot, 3], [I.stick, 2]],
		station: "bench"
	},
	{
		id: "cushovel",
		out: I.copperShovel,
		n: 1,
		need: [[I.copperIngot, 1], [I.stick, 2]],
		station: "bench"
	},
	{
		id: "cusword",
		out: I.copperSword,
		n: 1,
		need: [[I.copperIngot, 2], [I.stick, 1]],
		station: "bench"
	},
	{
		id: "ipick",
		out: I.ironPick,
		n: 1,
		need: [[I.ironIngot, 3], [I.stick, 2]],
		station: "bench"
	},
	{
		id: "iaxe",
		out: I.ironAxe,
		n: 1,
		need: [[I.ironIngot, 3], [I.stick, 2]],
		station: "bench"
	},
	{
		id: "ishovel",
		out: I.ironShovel,
		n: 1,
		need: [[I.ironIngot, 1], [I.stick, 2]],
		station: "bench"
	},
	{
		id: "isword",
		out: I.ironSword,
		n: 1,
		need: [[I.ironIngot, 2], [I.stick, 1]],
		station: "bench"
	},
	{
		id: "cpick",
		out: I.crystalPick,
		n: 1,
		need: [[B.crystal, 3], [I.stick, 2]],
		station: "bench"
	},
	{
		id: "csword",
		out: I.crystalSword,
		n: 1,
		need: [[B.crystal, 2], [I.stick, 1]],
		station: "bench"
	},
	{
		id: "furnace",
		out: B.furnace,
		n: 1,
		need: [[B.cobble, 8]],
		station: "bench"
	},
	{
		id: "chest",
		out: B.chest,
		n: 1,
		need: [[B.planks, 8]],
		station: "bench"
	},
	{
		id: "bed",
		out: B.bed,
		n: 1,
		need: [[B.planks, 3], [B.leaves, 2]],
		station: "bench"
	},
	{
		id: "door",
		out: B.door,
		n: 1,
		need: [[B.planks, 6]],
		station: "bench"
	},
	{
		id: "lamp",
		out: B.lamp,
		n: 1,
		need: [[I.copperIngot, 3], [I.stick, 1]],
		station: "bench"
	},
	{
		id: "cu-ingot",
		out: I.copperIngot,
		n: 1,
		need: [[B.copper, 1], [I.coal, 1]],
		station: "furnace"
	},
	{
		id: "fe-ingot",
		out: I.ironIngot,
		n: 1,
		need: [[B.iron, 1], [I.coal, 1]],
		station: "furnace"
	},
	{
		id: "glass",
		out: B.glass,
		n: 1,
		need: [[B.sand, 1], [I.coal, 1]],
		station: "furnace"
	},
	{
		id: "brick",
		out: B.brick,
		n: 1,
		need: [[B.clay, 1], [I.coal, 1]],
		station: "furnace"
	},
	{
		id: "smooth",
		out: B.stone,
		n: 1,
		need: [[B.cobble, 1], [I.coal, 1]],
		station: "furnace"
	}
];
function stationLabel(s) {
	if (s === "hand") return "Tay không";
	if (s === "bench") return "Cần bàn chế gần bạn";
	return "Cần lò nung gần bạn";
}
function itemColor(id) {
	const b = BLOCKS[id];
	if (b) return b.color;
	if (id === I.gel) return "#8dce62";
	if (id === I.coal) return "#2a2e36";
	if (id === I.apple) return "#e25b4a";
	if (id === I.petal) return "#e25b78";
	if (id === I.seed) return "#7dce6a";
	if (id === I.stick) return "#c4a06a";
	if (id === I.copperIngot) return "#e08a45";
	if (id === I.ironIngot) return "#d5d8df";
	if (id === I.crystalPick || id === I.crystalSword) return "#6ed8cf";
	if (id === I.ironPick || id === I.ironAxe || id === I.ironShovel || id === I.ironSword) return "#e4e0d8";
	if (id === I.copperPick || id === I.copperAxe || id === I.copperShovel || id === I.copperSword) return "#d98448";
	if (id === I.stonePick || id === I.stoneAxe || id === I.stoneShovel || id === I.stoneSword) return "#9aa0aa";
	return "#c49658";
}
function itemMark(id) {
	const k = toolInfo(id).kind;
	if (k === "pick") return "C";
	if (k === "axe") return "R";
	if (k === "shovel") return "X";
	if (k === "sword") return "K";
	if (id === I.gel) return "G";
	if (id === I.coal) return "T";
	if (id === I.apple) return "A";
	if (id === I.seed) return "H";
	if (id === I.petal) return "L";
	if (id === I.stick) return "Q";
	if (id === I.copperIngot || id === I.ironIngot) return "Th";
	return "";
}
var KEY = "kheda3d-v1";
var SFX_KEY = "kheda-sfx";
function validStack(s) {
	if (!s || typeof s !== "object") return false;
	const o = s;
	return typeof o.id === "number" && typeof o.n === "number" && o.n > 0 && typeof o.dura === "number";
}
function loadSave() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const data = JSON.parse(raw);
		if (!data || data.v !== 2 || typeof data.seed !== "number") return null;
		if (!Array.isArray(data.slots)) return null;
		data.slots = data.slots.map((s) => validStack(s) ? s : null);
		while (data.slots.length < 36) data.slots.push(null);
		data.slots.length = 36;
		if (!data.chests || typeof data.chests !== "object") data.chests = {};
		if (!Array.isArray(data.mods)) data.mods = [];
		return data;
	} catch {
		return null;
	}
}
function writeSave(data) {
	try {
		localStorage.setItem(KEY, JSON.stringify(data));
	} catch {}
}
function clearSave() {
	localStorage.removeItem(KEY);
}
function hasSave() {
	return !!localStorage.getItem(KEY);
}
function loadSfx() {
	return localStorage.getItem(SFX_KEY) !== "0";
}
function writeSfx(on) {
	localStorage.setItem(SFX_KEY, on ? "1" : "0");
}
function hashSeed(text) {
	const t = text.trim();
	if (/^\d+$/.test(t)) return Number(t) >>> 0 || 1;
	let h = 2166136261;
	const s = t || String(Math.floor(Math.random() * 1e9));
	for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
	return h >>> 0 || 1;
}
var Playfield = (0, import_react.lazy)(() => import("./Playfield-UsEw_Uvd.mjs"));
function roomCode() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let s = "";
	for (let i = 0; i < 4; i++) s += alphabet[Math.floor(Math.random() * 32)];
	return `khe-${s}`;
}
function normRoom(raw) {
	const t = raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
	if (!t) return "";
	return `khe-${(t.startsWith("KHE") ? t.slice(3) : t).slice(0, 6)}`;
}
function GameScreen() {
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [seed, setSeed] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("Bạn");
	const [room, setRoom] = (0, import_react.useState)("");
	const [launch, setLaunch] = (0, import_react.useState)(null);
	const [confirmNew, setConfirmNew] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSaved(hasSave());
	}, [launch]);
	function go(next) {
		setConfirmNew(false);
		setLaunch(next);
	}
	function quit() {
		setLaunch(null);
		setSaved(hasSave());
	}
	if (launch) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "game-root boot-note",
			children: "Đang mở khe..."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Playfield, {
			launch,
			onQuit: quit
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "game-root",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "title-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "voxel-mark",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "v-grass" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "v-dirt" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "v-stone" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "v-log" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "v-sand" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "v-crystal" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "brand-kicker",
					children: "Thế giới khối"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Khe Đá" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lede",
					children: "Đào, xây và sống sót qua đêm. Đói dần — hái lan trên phế tích hoặc gieo hạt lên đất. La bàn chỉ xuống Tim khe, chỉ cuốc tinh thể phá được nó. Chơi một mình hoặc mở phòng cho bạn."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "actions",
					children: [
						saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn-primary",
							onClick: () => go({
								role: "solo",
								room: "",
								name: name.trim() || "Bạn",
								seedText: "",
								fresh: false
							}),
							children: "Tiếp tục"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn-primary",
							onClick: () => {
								if (saved) setConfirmNew(true);
								else go({
									role: "solo",
									room: "",
									name: name.trim() || "Bạn",
									seedText: seed,
									fresh: true
								});
							},
							children: "Chơi một mình"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn-ghost",
							onClick: () => go({
								role: "host",
								room: roomCode(),
								name: name.trim() || "Bạn",
								seedText: seed,
								fresh: true
							}),
							children: "Tạo phòng"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn-ghost",
							disabled: !normRoom(room),
							onClick: () => go({
								role: "guest",
								room: normRoom(room),
								name: name.trim() || "Bạn",
								seedText: "",
								fresh: true
							}),
							children: "Vào phòng"
						})
					]
				}),
				confirmNew && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary",
						onClick: () => {
							clearSave();
							go({
								role: "solo",
								room: "",
								name: name.trim() || "Bạn",
								seedText: seed,
								fresh: true
							});
						},
						children: "Xóa thế giới cũ và chơi mới"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-ghost",
						onClick: () => setConfirmNew(false),
						children: "Để sau"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					children: ["Tên trong phòng", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "seed-input",
						value: name,
						maxLength: 16,
						onChange: (e) => setName(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					children: ["Hạt giống thế giới mới", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "seed-input",
						value: seed,
						placeholder: "Để trống là ngẫu nhiên",
						onChange: (e) => setSeed(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					children: ["Mã phòng", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "seed-input",
						value: room,
						placeholder: "AB12",
						onChange: (e) => setRoom(e.target.value)
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "side-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Cách chơi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "W A S D để đi, Shift để chạy, chuột để nhìn, giữ chuột trái để đào." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Chuột phải để đặt khối hoặc ăn. E mở túi và chế tạo. F dùng giường, cửa, rương." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Cỏ rơi hạt lan. Gieo lên đất, đứng gần cho đến khi nở, rồi hái cánh để ăn." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Đêm hãy thắp đuốc. Rêu cháy dưới nắng. Bọ hang dưới sâu đôi khi nhả tinh thể." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "La bàn chỉ Tim khe. Cột đèn đánh dấu miệng hầm. Tạo phòng rồi đưa mã cho bạn." })
				] })]
			})]
		})
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameScreen, {});
}
//#endregion
export { toolInfo as S, itemMark as _, writeSave as a, maxStack as b, I as c, blockDef as d, clamp as f, itemColor as g, isTool as h, loadSfx as i, REACH as l, hungerFill as m, hashSeed as n, writeSfx as o, foodHeal as p, loadSave as r, B as s, routes_exports as t, RECIPES as u, itemName as v, stationLabel as x, lerp as y };
