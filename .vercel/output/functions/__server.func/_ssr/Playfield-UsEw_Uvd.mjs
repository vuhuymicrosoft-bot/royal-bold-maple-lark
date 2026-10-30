import { o as __toESM } from "../_runtime.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as toolInfo, _ as itemMark, a as writeSave, b as maxStack, c as I, d as blockDef, f as clamp, g as itemColor, h as isTool, i as loadSfx, l as REACH, m as hungerFill, n as hashSeed, o as writeSfx, p as foodHeal, r as loadSave, s as B, u as RECIPES, v as itemName, x as stationLabel, y as lerp } from "./routes-CgR0w0Ib.mjs";
import { a as Pickaxe, c as Backpack, n as VolumeX, o as Pause, r as Volume2, s as Heart, t as X } from "../_libs/lucide-react.mjs";
import { C as Vector3, S as SphereGeometry, _ as PerspectiveCamera, a as DirectionalLight, b as PointsMaterial, c as Group, d as LineBasicMaterial, f as LineSegments, g as Object3D, h as MeshLambertMaterial, i as Color, l as HemisphereLight, m as MeshBasicMaterial, n as BufferAttribute, o as EdgesGeometry, p as Mesh, r as BufferGeometry, s as Fog, t as BoxGeometry, u as InstancedMesh, v as PointLight, w as WebGLRenderer, x as Scene, y as Points } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Playfield-UsEw_Uvd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AudioBus = class {
	on;
	ctx = null;
	lastMine = 0;
	constructor(on) {
		this.on = on;
	}
	unlock() {
		if (!this.ctx) {
			const AC = window.AudioContext || window.webkitAudioContext;
			this.ctx = new AC();
		}
		if (this.ctx.state === "suspended") this.ctx.resume();
	}
	play(name) {
		if (!this.on) return;
		this.unlock();
		const ctx = this.ctx;
		if (!ctx) return;
		const now = ctx.currentTime;
		if (name === "mine") {
			if (now - this.lastMine < .07) return;
			this.lastMine = now;
			this.blip(now, 180 + Math.random() * 80, .04, "square", .045);
			return;
		}
		if (name === "break") {
			this.noise(now, .08, .08);
			this.blip(now, 140, .09, "triangle", .06);
			return;
		}
		if (name === "place") {
			this.blip(now, 220, .06, "square", .05);
			this.blip(now + .03, 160, .07, "triangle", .04);
			return;
		}
		if (name === "jump") {
			this.blip(now, 320, .07, "sine", .04, 480);
			return;
		}
		if (name === "hurt") {
			this.blip(now, 180, .12, "sawtooth", .05, 80);
			return;
		}
		if (name === "hit") {
			this.blip(now, 240, .06, "square", .05, 90);
			return;
		}
		if (name === "pickup") {
			this.blip(now, 620, .05, "sine", .04);
			this.blip(now + .05, 880, .07, "sine", .03);
			return;
		}
		if (name === "craft") {
			this.blip(now, 523, .06, "triangle", .04);
			this.blip(now + .07, 784, .09, "triangle", .04);
			return;
		}
		if (name === "eat") {
			this.blip(now, 400, .08, "sine", .04, 600);
			return;
		}
		if (name === "dawn") {
			this.blip(now, 523, .16, "sine", .035);
			this.blip(now + .16, 659, .16, "sine", .03);
			this.blip(now + .32, 784, .28, "sine", .03);
			return;
		}
		if (name === "die") {
			this.blip(now, 220, .25, "triangle", .06, 70);
			return;
		}
		this.blip(now, 500, .04, "sine", .03);
	}
	blip(t, freq, dur, type, gain, slideTo) {
		const ctx = this.ctx;
		if (!ctx) return;
		const o = ctx.createOscillator();
		const g = ctx.createGain();
		o.type = type;
		o.frequency.setValueAtTime(freq, t);
		if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(40, slideTo), t + dur);
		g.gain.setValueAtTime(gain, t);
		g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
		o.connect(g);
		g.connect(ctx.destination);
		o.start(t);
		o.stop(t + dur + .02);
	}
	noise(t, dur, gain) {
		const ctx = this.ctx;
		if (!ctx) return;
		const n = Math.floor(ctx.sampleRate * dur);
		const buf = ctx.createBuffer(1, n, ctx.sampleRate);
		const data = buf.getChannelData(0);
		for (let i = 0; i < n; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / n);
		const src = ctx.createBufferSource();
		src.buffer = buf;
		const g = ctx.createGain();
		const f = ctx.createBiquadFilter();
		f.type = "highpass";
		f.frequency.value = 400;
		g.gain.setValueAtTime(gain, t);
		src.connect(f);
		f.connect(g);
		g.connect(ctx.destination);
		src.start(t);
	}
};
function hash3(x, y, z, s) {
	let n = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 1274126177) ^ Math.imul(s | 0, 2146121005);
	n = Math.imul(n ^ n >>> 13, 1274126177);
	return ((n ^ n >>> 16) >>> 0) / 4294967296;
}
function vnoise2(x, z, seed) {
	const x0 = Math.floor(x);
	const z0 = Math.floor(z);
	const tx = x - x0;
	const tz = z - z0;
	const sx = tx * tx * (3 - 2 * tx);
	const sz = tz * tz * (3 - 2 * tz);
	const v00 = hash3(x0, 0, z0, seed);
	const v10 = hash3(x0 + 1, 0, z0, seed);
	const v01 = hash3(x0, 0, z0 + 1, seed);
	const v11 = hash3(x0 + 1, 0, z0 + 1, seed);
	const a = v00 * (1 - sx) + v10 * sx;
	const b = v01 * (1 - sx) + v11 * sx;
	return a * (1 - sz) + b * sz;
}
function fbm2(x, z, seed) {
	return vnoise2(x, z, seed) * .55 + vnoise2(x * 2.03, z * 2.03, seed + 101) * .3 + vnoise2(x * 4.01, z * 4.01, seed + 251) * .15;
}
function noise3(x, y, z, seed) {
	const x0 = Math.floor(x);
	const y0 = Math.floor(y);
	const z0 = Math.floor(z);
	const tx = x - x0;
	const ty = y - y0;
	const tz = z - z0;
	const sx = tx * tx * (3 - 2 * tx);
	const sy = ty * ty * (3 - 2 * ty);
	const sz = tz * tz * (3 - 2 * tz);
	const lerp = (a, b, t) => a * (1 - t) + b * t;
	const v = (ix, iy, iz) => hash3(x0 + ix, y0 + iy, z0 + iz, seed);
	const x00 = lerp(v(0, 0, 0), v(1, 0, 0), sx);
	const x10 = lerp(v(0, 1, 0), v(1, 1, 0), sx);
	const x01 = lerp(v(0, 0, 1), v(1, 0, 1), sx);
	const x11 = lerp(v(0, 1, 1), v(1, 1, 1), sx);
	return lerp(lerp(x00, x10, sy), lerp(x01, x11, sy), sz);
}
function surfaceY(x, z, seed) {
	const n = fbm2(x * .028, z * .028, seed);
	const broad = fbm2(x * .007, z * .007, seed + 9);
	let h = 24 + Math.floor((n - .5) * 12 + (broad - .5) * 8);
	if (h < 16) h = 16;
	if (h > 34) h = 34;
	return h;
}
function biomeAt(x, z, seed) {
	const t = fbm2(x * .0045, z * .0045, seed + 77);
	if (t > .62) return "desert";
	if (t < .36) return "snow";
	return "meadow";
}
function makeTree(x, z, seed) {
	const surf = surfaceY(x, z, seed);
	const biome = biomeAt(x, z, seed);
	const none = {
		kind: "none",
		h: 0,
		surf
	};
	if (surf <= 19) return none;
	const r = hash3(x, 11, z, seed);
	let local = true;
	for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) {
		if (dx === 0 && dz === 0) continue;
		if (hash3(x + dx, 11, z + dz, seed) < r) local = false;
	}
	if (!local) return none;
	if (biome === "desert") {
		if (r < .22) return {
			kind: "cactus",
			h: 2 + (hash3(x, 12, z, seed) * 2 | 0),
			surf
		};
		return none;
	}
	if (biome === "snow") {
		if (r < .28) return {
			kind: "spruce",
			h: 5 + (hash3(x, 12, z, seed) * 3 | 0),
			surf
		};
		return none;
	}
	if (r < .32) return {
		kind: "oak",
		h: 4 + (hash3(x, 12, z, seed) * 2 | 0),
		surf
	};
	return none;
}
function oreAt(x, y, z, seed) {
	const r = hash3(x >> 1, y >> 1, z >> 1, seed + 400);
	if (hash3(x, y, z, seed + 401) > .7) return 0;
	if (y > 4 && y < 12 && r < .05) return B.crystal;
	if (y < 18 && r < .065) return B.iron;
	if (y < 26 && r < .08) return B.copper;
	if (y < 36 && r < .1) return B.coalOre;
	return 0;
}
function chunkOf(v) {
	return Math.floor(v / 16);
}
function chunkKey(cx, cz) {
	return cx + "," + cz;
}
function cellIndex(lx, y, lz) {
	return (lx + lz * 16) * 48 + y;
}
function vegetation(x, y, z, surf, biome, seed, trees) {
	for (const t of trees) {
		const dx = x - t.tx;
		const dz = z - t.tz;
		const adx = Math.abs(dx);
		const adz = Math.abs(dz);
		if (adx > 3 || adz > 3) continue;
		if (t.kind === "cactus") {
			if (dx === 0 && dz === 0 && y > t.surf && y <= t.surf + t.h) return B.cactus;
			continue;
		}
		const top = t.surf + t.h;
		if (dx === 0 && dz === 0 && y > t.surf && y <= top) return t.kind === "spruce" ? B.slog : B.log;
		if (t.kind === "oak") {
			if (adx <= 2 && adz <= 2 && y >= top - 2 && y <= top + 1) {
				if (adx === 2 && adz === 2 && (y === top + 1 || y === top - 2)) continue;
				if ((adx === 2 || adz === 2) && hash3(x, y, z, seed + 3) < .28) continue;
				return B.leaves;
			}
		} else if (y > t.surf + 1 && y <= top + 1) {
			const rad = Math.min(2, Math.floor((top + 1 - y) / 2));
			if (dx === 0 && dz === 0 && y === top + 1) return B.sleaves;
			if ((dx !== 0 || dz !== 0) && adx <= rad && adz <= rad) return B.sleaves;
		}
	}
	if (y === surf + 1 && surf > 18) {
		let trunk = false;
		for (const t of trees) if (t.tx === x && t.tz === z && t.kind !== "none") trunk = true;
		if (!trunk) {
			const r = hash3(x, 50, z, seed);
			if (biome === "meadow" && r < .16) return B.tallgrass;
			if (biome === "meadow" && r < .21) return B.flower;
			if (biome === "desert" && r < .07) return B.bush;
			if (biome === "snow" && r < .09) return B.bush;
		}
	}
	if (y <= 18 && surf < 18) return B.water;
	return B.air;
}
function ground(x, y, z, surf, biome, seed) {
	const depth = surf - y;
	if (depth > 4 && y > 3) {
		if (noise3(x * .09, y * .11, z * .09, seed + 7) > .74) return B.air;
	}
	if (depth > 5) {
		const ore = oreAt(x, y, z, seed);
		if (ore) return ore;
		if (biome === "desert" && depth < 8) return hash3(x, y, z, seed) < .45 ? B.sandstone : B.stone;
		if (depth > 7 && depth < 12 && hash3(x, y, z, seed + 4) < .05) return B.gravel;
		if (y < 14 && hash3(x, y, z, seed + 5) < .045) return B.clay;
		return B.stone;
	}
	if (y === surf) {
		if (surf <= 19) return B.sand;
		if (biome === "desert") return B.sand;
		if (biome === "snow") return B.snow;
		return B.grass;
	}
	if (biome === "desert") return depth < 3 ? B.sand : B.sandstone;
	if (biome === "snow" && depth === 1 && hash3(x, y, z, seed) < .16) return B.ice;
	return B.dirt;
}
function ruinSpot(gx, gz, seed) {
	if (hash3(gx, 91, gz, seed) > .62) return null;
	return {
		tx: gx * 32 + 6 + Math.floor(hash3(gx, 92, gz, seed) * 18),
		tz: gz * 32 + 6 + Math.floor(hash3(gx, 93, gz, seed) * 18)
	};
}
function ruinBlock(x, y, z, surf, seed) {
	const gx = Math.floor(x / 32);
	const gz = Math.floor(z / 32);
	for (let ox = -1; ox <= 1; ox++) for (let oz = -1; oz <= 1; oz++) {
		const spot = ruinSpot(gx + ox, gz + oz, seed);
		if (!spot) continue;
		const dx = x - spot.tx;
		const dz = z - spot.tz;
		if (Math.abs(dx) > 3 || Math.abs(dz) > 3) continue;
		const rs = surfaceY(spot.tx, spot.tz, seed);
		if (rs <= 19 || Math.abs(surf - rs) > 2) continue;
		const adx = Math.abs(dx);
		const adz = Math.abs(dz);
		if (adx <= 2 && adz <= 2 && y === rs) return B.brick;
		if (adx === 2 && adz === 2 && y > rs && y <= rs + 2) return B.brick;
		if (dx === 0 && dz === 0 && y === rs + 1) return B.lamp;
		if (adx === 1 && adz === 1 && y === rs + 1) return B.orchid;
	}
	return 0;
}
function naturalAt(x, y, z, seed) {
	if (y < 0 || y >= 48) return y < 0 ? B.bedrock : B.air;
	if (y <= 1) return B.bedrock;
	const surf = surfaceY(x, z, seed);
	const biome = biomeAt(x, z, seed);
	if (y >= surf && y <= surf + 3) {
		const ruin = ruinBlock(x, y, z, surf, seed);
		if (ruin) return ruin;
	}
	if (y > surf) {
		const trees = [];
		for (let tx = x - 3; tx <= x + 3; tx++) for (let tz = z - 3; tz <= z + 3; tz++) {
			const t = makeTree(tx, tz, seed);
			if (t.kind !== "none") trees.push({
				tx,
				tz,
				kind: t.kind,
				h: t.h,
				surf: t.surf
			});
		}
		return vegetation(x, y, z, surf, biome, seed, trees);
	}
	return ground(x, y, z, surf, biome, seed);
}
var World = class {
	seed;
	mods = /* @__PURE__ */ new Map();
	columns = /* @__PURE__ */ new Map();
	dirty = /* @__PURE__ */ new Set();
	constructor(seed, mods) {
		this.seed = seed >>> 0 || 1;
		if (mods) for (const [x, y, z, id] of mods) this.mods.set(x + "," + y + "," + z, id);
	}
	get(x, y, z) {
		if (y < 0 || y >= 48) return y < 0 ? B.bedrock : B.air;
		const cx = chunkOf(x);
		const cz = chunkOf(z);
		const key = chunkKey(cx, cz);
		let col = this.columns.get(key);
		if (!col) col = this.generate(cx, cz);
		const lx = x - cx * 16;
		const lz = z - cz * 16;
		return col[cellIndex(lx, y, lz)] ?? B.air;
	}
	solid(x, y, z) {
		return !!blockDef(this.get(x, y, z))?.solid;
	}
	set(x, y, z, id) {
		if (y < 0 || y >= 48) return;
		const base = naturalAt(x, y, z, this.seed);
		const key = x + "," + y + "," + z;
		if (id === base) this.mods.delete(key);
		else this.mods.set(key, id);
		const cx = chunkOf(x);
		const cz = chunkOf(z);
		const col = this.columns.get(chunkKey(cx, cz));
		if (col) {
			const lx = x - cx * 16;
			const lz = z - cz * 16;
			col[cellIndex(lx, y, lz)] = id;
		}
		this.mark(cx, cz);
		const lx = x - cx * 16;
		const lz = z - cz * 16;
		if (lx === 0) this.mark(cx - 1, cz);
		if (lx === 15) this.mark(cx + 1, cz);
		if (lz === 0) this.mark(cx, cz - 1);
		if (lz === 15) this.mark(cx, cz + 1);
	}
	mark(cx, cz) {
		this.dirty.add(chunkKey(cx, cz));
	}
	generate(cx, cz) {
		const data = /* @__PURE__ */ new Uint8Array(12288);
		const x0 = cx * 16;
		const z0 = cz * 16;
		const trees = [];
		for (let tx = x0 - 3; tx < x0 + 16 + 3; tx++) for (let tz = z0 - 3; tz < z0 + 16 + 3; tz++) {
			const t = makeTree(tx, tz, this.seed);
			if (t.kind !== "none") trees.push({
				tx,
				tz,
				kind: t.kind,
				h: t.h,
				surf: t.surf
			});
		}
		for (let lx = 0; lx < 16; lx++) for (let lz = 0; lz < 16; lz++) {
			const x = x0 + lx;
			const z = z0 + lz;
			const surf = surfaceY(x, z, this.seed);
			const biome = biomeAt(x, z, this.seed);
			for (let y = 0; y < 48; y++) {
				const mod = this.mods.get(x + "," + y + "," + z);
				const ruin = y >= surf && y <= surf + 3 ? ruinBlock(x, y, z, surf, this.seed) : 0;
				let id;
				if (mod !== void 0) id = mod;
				else if (y <= 1) id = B.bedrock;
				else if (ruin) id = ruin;
				else if (y > surf) id = vegetation(x, y, z, surf, biome, this.seed, trees);
				else id = ground(x, y, z, surf, biome, this.seed);
				data[cellIndex(lx, y, lz)] = id;
			}
		}
		const key = chunkKey(cx, cz);
		this.columns.set(key, data);
		this.dirty.add(key);
		return data;
	}
	evict(px, pz) {
		if (this.columns.size < 70) return;
		const pcx = chunkOf(Math.floor(px));
		const pcz = chunkOf(Math.floor(pz));
		for (const k of this.columns.keys()) {
			const [cx, cz] = k.split(",").map(Number);
			if (Math.abs(cx - pcx) > 5 || Math.abs(cz - pcz) > 5) this.columns.delete(k);
		}
	}
	exportMods() {
		const out = [];
		for (const [k, id] of this.mods) {
			const [xs, ys, zs] = k.split(",");
			out.push([
				Number(xs),
				Number(ys),
				Number(zs),
				id
			]);
		}
		return out;
	}
};
var HW = .28;
var PH = 1.68;
var EYE$1 = 1.52;
function emptySlots(n) {
	return Array.from({ length: n }, () => null);
}
var Game = class {
	world;
	input;
	sfx;
	x = 0;
	y = 8;
	z = 0;
	vx = 0;
	vy = 0;
	vz = 0;
	yaw = 0;
	pitch = 0;
	onGround = false;
	hp = 10;
	maxHp = 10;
	hunger = 10;
	maxHunger = 10;
	sprinting = false;
	invuln = 0;
	time = 40;
	mode = "play";
	slots;
	selected = 0;
	chests = /* @__PURE__ */ new Map();
	chestKey = null;
	mobs = [];
	drops = [];
	particles = [];
	spawnX = 0;
	spawnY = 8;
	spawnZ = 0;
	rev = 1;
	mine = {
		x: 0,
		y: 0,
		z: 0,
		t: 0,
		on: false
	};
	aim = null;
	placeHold = 0;
	swing = 0;
	coyote = 0;
	jumpBuf = 0;
	regen = 0;
	dayLabel = "Ban ngày";
	toast = "";
	toastT = 0;
	won = false;
	heartX = 0;
	heartY = 0;
	heartZ = 0;
	heartNear = false;
	sens = .0022;
	persist = true;
	onEdit = null;
	onTime = null;
	onWin = null;
	onChest = null;
	remotes = /* @__PURE__ */ new Map();
	saveAcc = 0;
	mobSpawn = 2;
	nextMob = 1;
	fallVy = 0;
	hungerAcc = 0;
	starve = 0;
	growAcc = 0;
	hungerWarned = false;
	playerName = "Bạn";
	constructor(sfx, input, save, seed, sharedMods) {
		this.sfx = sfx;
		this.input = input;
		if (save) {
			this.world = new World(save.seed, save.mods);
			this.slots = save.slots.map((s) => s ? { ...s } : null);
			while (this.slots.length < 36) this.slots.push(null);
			this.slots.length = 36;
			this.selected = clamp(save.selected | 0, 0, 8);
			this.hp = clamp(save.hp, 1, 10);
			this.hunger = clamp(save.hunger ?? 10, 0, 10);
			this.time = save.time;
			this.spawnX = save.spawnX;
			this.spawnY = save.spawnY;
			this.spawnZ = save.spawnZ;
			this.x = save.x;
			this.y = save.y;
			this.z = save.z;
			this.yaw = save.yaw || 0;
			this.pitch = save.pitch || 0;
			this.won = !!save.won;
			for (const [k, arr] of Object.entries(save.chests)) {
				const slots = emptySlots(18);
				arr.forEach((s, i) => {
					if (s && i < 18) slots[i] = { ...s };
				});
				this.chests.set(k, slots);
			}
		} else {
			this.world = new World(seed ?? 1, sharedMods);
			this.slots = emptySlots(36);
			const spawn = this.findSpawn();
			this.spawnX = spawn.x;
			this.spawnY = spawn.y;
			this.spawnZ = spawn.z;
			this.x = spawn.x;
			this.y = spawn.y;
			this.z = spawn.z;
		}
		if (!this.findHeart()) this.carveHeart();
		this.syncLabel(true);
		if (!save) this.say("La bàn chỉ về Tim khe. Đói sẽ làm bạn yếu — hái lan hoặc gieo hạt lên đất.");
		this.installProbe();
	}
	installProbe() {
		window.__controlsTest = {
			getYaw: () => this.yaw,
			getSpeed: () => Math.hypot(this.vx, this.vz),
			getX: () => this.x,
			getZ: () => this.z,
			setKeys: (codes) => this.input.setOverride(codes)
		};
	}
	detachProbe() {
		if (window.__controlsTest?.getX() === this.x || window.__controlsTest) delete window.__controlsTest;
	}
	bump() {
		this.rev++;
	}
	findSpawn() {
		const seed = this.world.seed;
		for (let ring = 0; ring < 48; ring++) for (let a = 0; a < 10; a++) {
			const x = Math.round(Math.cos(a / 10 * Math.PI * 2) * ring * 3);
			const z = Math.round(Math.sin(a / 10 * Math.PI * 2) * ring * 3);
			if (!this.columnClear(x, z)) continue;
			return {
				x: x + .5,
				y: surfaceY(x, z, seed) + 1,
				z: z + .5
			};
		}
		return {
			x: .5,
			y: surfaceY(0, 0, seed) + 1,
			z: .5
		};
	}
	columnClear(x, z) {
		const seed = this.world.seed;
		const base = surfaceY(x, z, seed);
		for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) {
			const xx = x + dx;
			const zz = z + dz;
			const s = surfaceY(xx, zz, seed);
			if (Math.abs(s - base) > 1) return false;
			if (biomeAt(xx, zz, seed) !== "meadow") return false;
			if (makeTree(xx, zz, seed).kind !== "none") return false;
			if (s <= 18) return false;
		}
		return true;
	}
	dayFactor() {
		const u = this.phase();
		if (u < .05) return lerp(.22, 1, u / .05);
		if (u < .5) return 1;
		if (u < .62) return lerp(1, .18, (u - .5) / .12);
		if (u < .92) return .18;
		return lerp(.18, .22, (u - .92) / .08);
	}
	phase() {
		return (this.time % 240 + 240) % 240 / 240;
	}
	syncLabel(force = false) {
		const u = this.phase();
		const label = u < .05 || u >= .92 ? "Bình minh" : u < .48 ? "Ban ngày" : u < .62 ? "Hoàng hôn" : "Ban đêm";
		const text = `Ngày ${Math.floor(this.time / 240) + 1} · ${label}`;
		if (force || text !== this.dayLabel) {
			this.dayLabel = text;
			this.bump();
		}
	}
	step(dt) {
		const a = this.input.pull();
		this.handleMenus(a.edge);
		this.swing = Math.max(0, this.swing - dt);
		this.toastTick(dt);
		this.lerpRemotes(dt);
		if (this.mode !== "play") return;
		const prevU = this.phase();
		this.time += dt;
		const u = this.phase();
		const night = (p) => p >= .62 && p < .92;
		if (night(prevU) && !night(u)) this.sfx.play("dawn");
		this.syncLabel();
		this.invuln = Math.max(0, this.invuln - dt);
		if (a.edge("Digit1")) this.sel(0);
		if (a.edge("Digit2")) this.sel(1);
		if (a.edge("Digit3")) this.sel(2);
		if (a.edge("Digit4")) this.sel(3);
		if (a.edge("Digit5")) this.sel(4);
		if (a.edge("Digit6")) this.sel(5);
		if (a.edge("Digit7")) this.sel(6);
		if (a.edge("Digit8")) this.sel(7);
		if (a.edge("Digit9")) this.sel(8);
		if (a.scroll) {
			this.selected = (this.selected + a.scroll + 9) % 9;
			this.bump();
		}
		if (a.edge("KeyQ")) this.dropSelected();
		this.look(a.lookDx, a.lookDy);
		this.move(dt);
		this.resolveAim();
		this.minePlace(a, dt);
		this.updateMobs(dt);
		this.updateDrops(dt);
		this.updateParticles(dt);
		this.spawnMobs(dt);
		this.hungerTick(dt);
		this.growPlants(dt);
		this.regenTick(dt);
		this.watchHeart();
		this.world.evict(this.x, this.z);
		this.saveAcc += dt;
		if (this.saveAcc > 8) {
			this.saveAcc = 0;
			this.save();
		}
	}
	sel(i) {
		this.selected = i;
		this.bump();
	}
	look(dx, dy) {
		if (this.input.override) return;
		this.yaw -= dx * this.sens;
		this.pitch = clamp(this.pitch - dy * this.sens, -1.35, 1.35);
	}
	handleMenus(edge) {
		if (edge("KeyE")) {
			if (this.mode === "play") this.mode = "inv";
			else if (this.mode === "inv" || this.mode === "chest") this.closeMenus();
			this.bump();
			return;
		}
		if (edge("Escape")) {
			if (this.mode === "play") this.mode = "pause";
			else if (this.mode === "pause" || this.mode === "help" || this.mode === "won") this.mode = "play";
			else this.closeMenus();
			this.bump();
			return;
		}
		if (edge("KeyF") && this.mode === "play") this.tryInteract();
		if (edge("KeyH") && this.mode === "play") {
			this.mode = "help";
			this.bump();
		}
	}
	closeMenus() {
		this.mode = "play";
		this.chestKey = null;
		this.bump();
	}
	basis() {
		return {
			fx: -Math.sin(this.yaw),
			fz: -Math.cos(this.yaw),
			rx: Math.cos(this.yaw),
			rz: -Math.sin(this.yaw)
		};
	}
	lookDir() {
		const { fx, fz } = this.basis();
		const cp = Math.cos(this.pitch);
		return {
			x: fx * cp,
			y: Math.sin(this.pitch),
			z: fz * cp
		};
	}
	move(dt) {
		const { fx, fz, rx, rz } = this.basis();
		let strafe = (this.input.down("KeyD") || this.input.down("ArrowRight") ? 1 : 0) - (this.input.down("KeyA") || this.input.down("ArrowLeft") ? 1 : 0);
		let forward = (this.input.down("KeyW") || this.input.down("ArrowUp") ? 1 : 0) - (this.input.down("KeyS") || this.input.down("ArrowDown") ? 1 : 0);
		if (Math.abs(this.input.joyX) + Math.abs(this.input.joyY) > .12) {
			strafe = this.input.joyX;
			forward = this.input.joyY;
		}
		const len = Math.hypot(strafe, forward);
		if (len > 1) {
			strafe /= len;
			forward /= len;
		}
		const inWater = this.submerged();
		const sprint = (this.input.down("ShiftLeft") || this.input.down("ShiftRight")) && forward > .2 && !inWater;
		this.sprinting = sprint;
		const onLadder = this.onClimb();
		const speed = inWater ? 2.8 : sprint ? 7.1 : 4.8;
		const wishX = (fx * forward + rx * strafe) * speed;
		const wishZ = (fz * forward + rz * strafe) * speed;
		const rate = this.onGround ? 28 : inWater ? 8 : 10;
		const k = 1 - Math.exp(-rate * dt);
		this.vx += (wishX - this.vx) * k;
		this.vz += (wishZ - this.vz) * k;
		const jump = this.input.down("Space") || this.input.jumpHeld;
		if (jump) this.jumpBuf = .12;
		else this.jumpBuf = Math.max(0, this.jumpBuf - dt);
		if (this.onGround) this.coyote = .1;
		else this.coyote = Math.max(0, this.coyote - dt);
		if (onLadder) {
			if (this.input.down("KeyW") || this.input.down("ArrowUp") || jump || this.input.joyY > .4) this.vy = 4.3;
			else if (this.input.down("KeyS") || this.input.down("ArrowDown") || this.input.joyY < -.4) this.vy = -4.6;
			else this.vy = 0;
			this.jumpBuf = 0;
		} else if (inWater) {
			this.vy -= 8 * dt;
			if (jump) this.vy += 16 * dt;
			this.vy = clamp(this.vy, -3, 4);
		} else if (this.jumpBuf > 0 && this.coyote > 0) {
			this.vy = 8.5;
			this.jumpBuf = 0;
			this.coyote = 0;
			this.onGround = false;
			this.sfx.play("jump");
		} else {
			this.vy -= 28 * dt;
			if (!jump && this.vy > 3) this.vy = 3;
			if (this.vy < -22) this.vy = -22;
		}
		this.fallVy = this.vy;
		this.integrate(dt);
		if (this.onGround && this.fallVy < -13) {
			const dmg = Math.floor((-this.fallVy - 13) * .45);
			if (dmg > 0) this.damage(dmg);
		}
		if (this.touchCactus() && this.invuln <= 0) this.damage(1);
		if (this.y < 1) {
			this.y = this.spawnY;
			this.x = this.spawnX;
			this.z = this.spawnZ;
			this.vy = 0;
		}
	}
	integrate(dt) {
		this.x += this.vx * dt;
		if (this.overlaps(this.x, this.y, this.z)) {
			if (this.onGround && Math.abs(this.vx) > .2) {
				if (!this.overlaps(this.x, this.y + 1.05, this.z)) this.y += 1.05;
			}
			if (this.overlaps(this.x, this.y, this.z)) {
				if (this.vx > 0) this.x = Math.floor(this.x + HW) - HW - .001;
				else if (this.vx < 0) this.x = Math.floor(this.x - HW) + 1 + HW + .001;
				this.vx = 0;
			}
		}
		this.z += this.vz * dt;
		if (this.overlaps(this.x, this.y, this.z)) {
			if (this.onGround && Math.abs(this.vz) > .2) {
				if (!this.overlaps(this.x, this.y + 1.05, this.z)) this.y += 1.05;
			}
			if (this.overlaps(this.x, this.y, this.z)) {
				if (this.vz > 0) this.z = Math.floor(this.z + HW) - HW - .001;
				else if (this.vz < 0) this.z = Math.floor(this.z - HW) + 1 + HW + .001;
				this.vz = 0;
			}
		}
		this.y += this.vy * dt;
		if (this.overlaps(this.x, this.y, this.z)) {
			if (this.vy <= 0) {
				this.y = Math.floor(this.y) + 1;
				this.onGround = true;
			} else {
				this.y = Math.floor(this.y + PH) - PH - .001;
				this.onGround = false;
			}
			this.vy = 0;
		} else if (this.vy < -.2) this.onGround = false;
	}
	overlaps(x, y, z) {
		const x0 = Math.floor(x - HW);
		const x1 = Math.floor(x + HW);
		const y0 = Math.floor(y + .001);
		const y1 = Math.floor(y + PH - .001);
		const z0 = Math.floor(z - HW);
		const z1 = Math.floor(z + HW);
		for (let ix = x0; ix <= x1; ix++) for (let iy = y0; iy <= y1; iy++) for (let iz = z0; iz <= z1; iz++) if (this.world.solid(ix, iy, iz)) return true;
		return false;
	}
	hitsPlayer(bx, by, bz) {
		return this.x + HW > bx + .02 && this.x - HW < bx + .98 && this.y < by + .98 && this.y + PH > by + .02 && this.z + HW > bz + .02 && this.z - HW < bz + .98;
	}
	submerged() {
		return this.world.get(Math.floor(this.x), Math.floor(this.y + .4), Math.floor(this.z)) === B.water || this.world.get(Math.floor(this.x), Math.floor(this.y + 1.1), Math.floor(this.z)) === B.water;
	}
	eyeInWater() {
		return this.world.get(Math.floor(this.x), Math.floor(this.y + EYE$1), Math.floor(this.z)) === B.water;
	}
	onClimb() {
		const a = blockDef(this.world.get(Math.floor(this.x), Math.floor(this.y + .4), Math.floor(this.z)));
		const b = blockDef(this.world.get(Math.floor(this.x), Math.floor(this.y + 1.05), Math.floor(this.z)));
		return !!(a?.climb || b?.climb);
	}
	touchCactus() {
		const x0 = Math.floor(this.x - HW - .02);
		const x1 = Math.floor(this.x + HW + .02);
		const y0 = Math.floor(this.y);
		const y1 = Math.floor(this.y + PH);
		const z0 = Math.floor(this.z - HW - .02);
		const z1 = Math.floor(this.z + HW + .02);
		for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) if (this.world.get(x, y, z) === B.cactus) return true;
		return false;
	}
	resolveAim() {
		const eye = {
			x: this.x,
			y: this.y + EYE$1,
			z: this.z
		};
		const d = this.lookDir();
		this.aim = raycast(this.world, eye.x, eye.y, eye.z, d.x, d.y, d.z, REACH);
	}
	minePlace(a, dt) {
		const attack = this.input.mine;
		if (a.mineEdge) {
			const mob = this.mobInCone(2.6);
			if (mob) this.hitMob(mob);
		}
		if (attack && this.aim && this.swing <= .05) {
			const { x, y, z } = this.aim;
			if (!this.mine.on || this.mine.x !== x || this.mine.y !== y || this.mine.z !== z) this.mine = {
				x,
				y,
				z,
				t: 0,
				on: true
			};
			const id = this.world.get(x, y, z);
			const def = blockDef(id);
			if (def && def.hardness < Infinity && id !== B.water) {
				if (id === B.heart && !this.crystalPick()) {
					this.mine.t = 0;
					if (a.mineEdge) this.say("Tim khe chỉ vỡ dưới cuốc tinh thể.");
				} else {
					const tool = toolInfo(this.slots[this.selected]?.id ?? 0);
					let speed = .55;
					if (def.tool === "any" || def.tool === "none") speed = Math.max(1.2, tool.speed);
					else if (tool.kind === def.tool) speed = tool.speed;
					else if (tool.kind === "hand" && (def.tool === "shovel" || def.tool === "axe")) speed = 1.15;
					this.mine.t += dt * speed / def.hardness;
					this.swing = .12;
					if (Math.random() < .28) this.sfx.play("mine");
					if (this.mine.t >= 1) this.breakBlock(x, y, z, id);
				}
			}
		} else if (!attack) {
			this.mine.on = false;
			this.mine.t = 0;
		}
		if (this.input.place) {
			if (a.placeEdge || this.placeHold <= 0) {
				this.tryUse();
				this.placeHold = .18;
			}
			this.placeHold -= dt;
		} else this.placeHold = 0;
	}
	crystalPick() {
		const tool = toolInfo(this.slots[this.selected]?.id ?? 0);
		return tool.kind === "pick" && tool.tier >= 4;
	}
	tryUse() {
		const slot = this.slots[this.selected];
		if (!slot) return;
		const heal = foodHeal(slot.id);
		const feed = hungerFill(slot.id);
		if (heal > 0 || feed > 0) {
			if (this.hp >= this.maxHp && this.hunger >= this.maxHunger) return;
			this.hp = Math.min(this.maxHp, this.hp + heal);
			this.hunger = Math.min(this.maxHunger, this.hunger + feed);
			this.hungerWarned = this.hunger <= 0;
			this.consumeSlot(this.selected, 1);
			this.sfx.play("eat");
			this.bump();
			return;
		}
		if (slot.id === I.seed) {
			this.plantSeed();
			return;
		}
		const def = blockDef(slot.id);
		if (!def?.place || !this.aim) return;
		const x = this.aim.x + this.aim.nx;
		const y = this.aim.y + this.aim.ny;
		const z = this.aim.z + this.aim.nz;
		if (y < 1 || y >= 48) return;
		const cur = this.world.get(x, y, z);
		const cd = blockDef(cur);
		if (cur !== B.air && !cd?.replace && cur !== B.water) return;
		if (def.solid && this.hitsPlayer(x, y, z)) return;
		if ((slot.id === B.torch || slot.id === B.lamp || slot.id === B.ladder) && !this.supported(x, y, z, slot.id)) {
			this.say("Cần tựa vào khối đặc.");
			return;
		}
		if (slot.id === B.door) {
			if (y + 1 >= 48) return;
			const above = this.world.get(x, y + 1, z);
			const ad = blockDef(above);
			if (above !== B.air && !ad?.replace) return;
			if (this.hitsPlayer(x, y + 1, z)) return;
			this.commitBlock(x, y, z, B.door);
			this.commitBlock(x, y + 1, z, B.door);
		} else {
			if (slot.id === B.chest && !this.chests.has(keyOf(x, y, z))) this.chests.set(keyOf(x, y, z), emptySlots(18));
			this.commitBlock(x, y, z, slot.id);
		}
		this.consumeSlot(this.selected, 1);
		this.sfx.play("place");
		this.burst(x + .5, y + .5, z + .5, def.color, 6);
		this.bump();
	}
	supported(x, y, z, id) {
		const solid = (xx, yy, zz) => this.world.solid(xx, yy, zz);
		if (id === B.tallgrass || id === B.flower || id === B.bush || id === B.sprout || id === B.orchid) return solid(x, y - 1, z);
		return solid(x, y - 1, z) || solid(x + 1, y, z) || solid(x - 1, y, z) || solid(x, y, z + 1) || solid(x, y, z - 1) || solid(x, y + 1, z);
	}
	commitBlock(x, y, z, id) {
		const prev = this.world.get(x, y, z);
		if (prev === id) return;
		this.world.set(x, y, z, id);
		this.onEdit?.({
			x,
			y,
			z,
			id
		});
		if (id === B.air && prev === B.heart) {}
	}
	applyRemote(x, y, z, id) {
		const prev = this.world.get(x, y, z);
		if (prev === id) return;
		this.world.set(x, y, z, id);
		if (prev === B.heart && id === B.air) this.say("Tim khe đã vỡ. Ánh sáng tràn ra khỏi đá.");
		if (prev === B.chest && id === B.air) this.chests.delete(keyOf(x, y, z));
		this.bump();
	}
	applyTime(t, force) {
		if (force || t > this.time + .35 || Math.abs(t - this.time) > 3) {
			this.time = t;
			this.syncLabel(true);
		}
	}
	breakBlock(x, y, z, id) {
		if (id === B.heart && !this.crystalPick()) return;
		if (id === B.chest) {
			const key = keyOf(x, y, z);
			const slots = this.chests.get(key);
			if (slots) {
				for (const s of slots) if (s) this.giveOrDrop(x + .5, y + .5, z + .5, s.id, s.n, s.dura);
				this.chests.delete(key);
				this.onChest?.(key, emptySlots(18));
			}
		}
		this.commitBlock(x, y, z, B.air);
		const drop = rollDrop(id);
		if (drop) this.giveOrDrop(x + .5, y + .5, z + .5, drop.id, drop.n, -1);
		this.wearTool();
		this.sfx.play("break");
		this.burst(x + .5, y + .5, z + .5, blockDef(id)?.color ?? "#ccc", 10);
		this.mine.on = false;
		this.mine.t = 0;
		this.popSupport(x, y, z);
		if (id === B.log || id === B.slog) this.decayLeaves(x, y, z, id);
		if (id === B.heart) this.win();
		this.bump();
	}
	popSupport(x, y, z) {
		const around = [
			[
				x,
				y + 1,
				z
			],
			[
				x,
				y - 1,
				z
			],
			[
				x + 1,
				y,
				z
			],
			[
				x - 1,
				y,
				z
			],
			[
				x,
				y,
				z + 1
			],
			[
				x,
				y,
				z - 1
			]
		];
		for (const [xx, yy, zz] of around) {
			const id = this.world.get(xx, yy, zz);
			if ((id === B.torch || id === B.lamp || id === B.ladder || id === B.tallgrass || id === B.flower || id === B.bush || id === B.sprout || id === B.orchid) && !this.supported(xx, yy, zz, id)) {
				this.commitBlock(xx, yy, zz, B.air);
				if (id === B.torch || id === B.lamp || id === B.ladder) this.giveOrDrop(xx + .5, yy + .4, zz + .5, id, 1, -1);
				else if (id === B.sprout) this.giveOrDrop(xx + .5, yy + .4, zz + .5, I.seed, 1, -1);
				else if (id === B.orchid) this.giveOrDrop(xx + .5, yy + .4, zz + .5, I.petal, 1, -1);
			}
		}
	}
	decayLeaves(x, y, z, logId) {
		const leaf = logId === B.slog ? B.sleaves : B.leaves;
		const origin = [];
		for (let dy = -5; dy <= 5; dy++) for (let dx = -4; dx <= 4; dx++) for (let dz = -4; dz <= 4; dz++) if (this.world.get(x + dx, y + dy, z + dz) === leaf) origin.push([
			x + dx,
			y + dy,
			z + dz
		]);
		const anchored = (lx, ly, lz) => {
			const q = [[
				lx,
				ly,
				lz
			]];
			const seen = /* @__PURE__ */ new Set([keyOf(lx, ly, lz)]);
			for (let i = 0; i < q.length && i < 70; i++) {
				const [cx, cy, cz] = q[i];
				for (let oy = -1; oy <= 1; oy++) for (let ox = -1; ox <= 1; ox++) for (let oz = -1; oz <= 1; oz++) {
					if (!ox && !oy && !oz) continue;
					const nx = cx + ox;
					const ny = cy + oy;
					const nz = cz + oz;
					if (Math.abs(nx - lx) > 4 || Math.abs(ny - ly) > 5 || Math.abs(nz - lz) > 4) continue;
					const key = keyOf(nx, ny, nz);
					if (seen.has(key)) continue;
					const id = this.world.get(nx, ny, nz);
					if (id === logId) return true;
					if (id === leaf) {
						seen.add(key);
						q.push([
							nx,
							ny,
							nz
						]);
					}
				}
			}
			return false;
		};
		for (const [lx, ly, lz] of origin) {
			if (anchored(lx, ly, lz)) continue;
			this.commitBlock(lx, ly, lz, B.air);
			if (Math.random() < .07) this.giveOrDrop(lx + .5, ly + .5, lz + .5, I.apple, 1, -1);
			else if (Math.random() < .18) this.giveOrDrop(lx + .5, ly + .5, lz + .5, I.stick, 1, -1);
		}
	}
	win() {
		this.won = true;
		this.mode = "won";
		this.sfx.play("dawn");
		this.say("Tim khe đã vỡ. Ánh sáng tràn ra khỏi đá.");
		this.onWin?.(this.playerName);
		this.save();
		this.bump();
	}
	tryInteract() {
		const t = this.aim;
		if (!t) {
			this.say("Nhìn vào rương, cửa, giường hoặc lò.");
			return;
		}
		const id = this.world.get(t.x, t.y, t.z);
		if (id === B.chest) {
			const key = keyOf(t.x, t.y, t.z);
			if (!this.chests.has(key)) this.chests.set(key, emptySlots(18));
			this.chestKey = key;
			this.mode = "chest";
			this.bump();
			return;
		}
		if (id === B.bed) {
			this.trySleep(t.x, t.y, t.z);
			return;
		}
		if (id === B.door || id === B.doorOpen) {
			const next = id === B.door ? B.doorOpen : B.door;
			this.commitBlock(t.x, t.y, t.z, next);
			for (const dy of [-1, 1]) {
				const other = this.world.get(t.x, t.y + dy, t.z);
				if (other === B.door || other === B.doorOpen) this.commitBlock(t.x, t.y + dy, t.z, next);
			}
			this.sfx.play("place");
			return;
		}
		if (id === B.heart) this.say("Tim khe chỉ vỡ dưới cuốc tinh thể. Giữ đào.");
		if (id === B.bench || id === B.furnace) this.say("Mở túi (E) để chế tại đây.");
	}
	trySleep(x, y, z) {
		if (this.mobs.some((m) => Math.hypot(m.x - this.x, m.y - this.y, m.z - this.z) < 8)) {
			this.say("Không ngủ được — có rêu đang nhảy gần đây.");
			return;
		}
		if (!this.world.solid(x, y + 1, z)) {
			this.spawnX = x + .5;
			this.spawnY = y + 1;
			this.spawnZ = z + .5;
		}
		const u = this.phase();
		if (!(u >= .5 && u < .94)) {
			this.say("Đã nhớ chỗ này. Ngủ khi trời tối để tới bình minh.");
			this.save();
			return;
		}
		const dayIndex = Math.floor(this.time / 240);
		this.time = (dayIndex + 1) * 240 + 1.5;
		this.hp = Math.min(this.maxHp, this.hp + 3);
		this.hunger = Math.min(this.maxHunger, this.hunger + 4);
		this.mobs = [];
		this.syncLabel(true);
		this.sfx.play("dawn");
		this.say("Bạn ngủ đến bình minh.");
		this.onTime?.(this.time, true);
		this.save();
		this.bump();
	}
	objectiveText() {
		if (this.won) return "Tim khe đã vỡ. Khe vẫn còn nếu bạn muốn xây tiếp.";
		if (![
			I.woodPick,
			I.stonePick,
			I.copperPick,
			I.ironPick,
			I.crystalPick
		].some((id) => this.countOf(id) > 0)) return "Chặt gỗ, chế ván và một cái cuốc.";
		if (this.countOf(I.coal) === 0 && this.countOf(B.furnace) === 0 && this.countOf(I.copperIngot) === 0 && this.countOf(I.ironIngot) === 0) return "Đào than trong đá, đặt bàn chế rồi lò nung.";
		if (this.countOf(I.crystalPick) === 0 && this.countOf(B.crystal) < 3) return "Tìm tinh thể sâu dưới đất, hoặc hạ bọ hang màu lam.";
		if (this.countOf(I.crystalPick) === 0) return "Chế cuốc tinh thể tại bàn chế.";
		return `La bàn chỉ Tim khe — còn khoảng ${Math.round(Math.hypot(this.x - (this.heartX + .5), this.z - (this.heartZ + .5)))} mét.`;
	}
	hungerTick(dt) {
		const moving = Math.hypot(this.vx, this.vz) > .45;
		const rate = this.sprinting ? .085 : moving ? .042 : .016;
		this.hungerAcc += rate * dt;
		if (this.hungerAcc >= 1) {
			this.hungerAcc -= 1;
			if (this.hunger > 0) {
				this.hunger -= 1;
				if (this.hunger === 0 && !this.hungerWarned) {
					this.hungerWarned = true;
					this.say("Bạn đói. Ăn gel, táo hoặc cánh lan.");
				}
				this.bump();
			}
		}
		if (this.hunger <= 0) {
			this.starve += dt;
			if (this.starve > 5) {
				this.starve = 0;
				this.damage(1);
			}
		} else {
			this.starve = 0;
			this.hungerWarned = false;
		}
	}
	growPlants(dt) {
		this.growAcc += dt;
		if (this.growAcc < 2.4) return;
		this.growAcc = 0;
		const px = Math.floor(this.x);
		const py = Math.floor(this.y);
		const pz = Math.floor(this.z);
		for (let x = px - 7; x <= px + 7; x++) for (let z = pz - 7; z <= pz + 7; z++) for (let y = py - 2; y <= py + 3; y++) {
			if (this.world.get(x, y, z) !== B.sprout) continue;
			if (Math.random() > .28) continue;
			this.commitBlock(x, y, z, B.orchid);
		}
	}
	plantSeed() {
		if (!this.aim) {
			this.say("Nhìn vào mặt đất để gieo hạt.");
			return;
		}
		const x = this.aim.x + this.aim.nx;
		const y = this.aim.y + this.aim.ny;
		const z = this.aim.z + this.aim.nz;
		if (y < 1 || y >= 48) return;
		const cur = this.world.get(x, y, z);
		const cd = blockDef(cur);
		if (cur !== B.air && !cd?.replace) return;
		const below = this.world.get(x, y - 1, z);
		if (below !== B.dirt && below !== B.grass && below !== B.brick) {
			this.say("Hạt lan chỉ nở trên đất, cỏ hoặc gạch.");
			return;
		}
		this.commitBlock(x, y, z, B.sprout);
		this.consumeSlot(this.selected, 1);
		this.sfx.play("place");
		this.say("Mầm sẽ nở thành lan nếu bạn ở gần.");
		this.bump();
	}
	say(text) {
		this.toast = text;
		this.toastT = 4.2;
		this.bump();
	}
	toastTick(dt) {
		if (this.toastT <= 0) return;
		this.toastT -= dt;
		if (this.toastT <= 0) {
			this.toast = "";
			this.bump();
		}
	}
	findHeart() {
		for (const [k, id] of this.world.mods) {
			if (id !== B.heart) continue;
			const [xs, ys, zs] = k.split(",");
			this.heartX = Number(xs);
			this.heartY = Number(ys);
			this.heartZ = Number(zs);
			return true;
		}
		return false;
	}
	carveHeart() {
		const seed = this.world.seed;
		const sx = Math.floor(this.spawnX);
		const sz = Math.floor(this.spawnZ);
		const ang = seed % 628 / 100;
		const dist = 40 + seed % 13;
		const hx = sx + Math.round(Math.cos(ang) * dist);
		const hz = sz + Math.round(Math.sin(ang) * dist);
		const hy = 6;
		for (let x = hx - 2; x <= hx + 2; x++) for (let z = hz - 2; z <= hz + 2; z++) {
			for (let y = 5; y <= 9; y++) this.world.set(x, y, z, B.air);
			this.world.set(x, 5, z, B.cobble);
			this.world.set(x, 9, z, B.cobble);
		}
		for (let y = hy; y <= 8; y++) {
			for (let x = hx - 2; x <= hx + 2; x++) {
				this.world.set(x, y, hz - 2, B.cobble);
				this.world.set(x, y, hz + 2, B.cobble);
			}
			for (let z = hz - 2; z <= hz + 2; z++) {
				this.world.set(hx - 2, y, z, B.cobble);
				this.world.set(hx + 2, y, z, B.cobble);
			}
		}
		this.world.set(hx, 7, hz - 2, B.crystal);
		this.world.set(hx, 7, hz + 2, B.crystal);
		this.world.set(hx - 2, 7, hz, B.crystal);
		this.world.set(hx, hy, hz, B.heart);
		this.world.set(hx - 1, hy, hz, B.torch);
		this.world.set(hx + 1, hy, hz, B.torch);
		const useX = Math.abs(sx - hx) >= Math.abs(sz - hz);
		const stepX = useX ? Math.sign(sx - hx) || 1 : 0;
		const stepZ = useX ? 0 : Math.sign(sz - hz) || 1;
		let x = hx + stepX * 3;
		let z = hz + stepZ * 3;
		let y = hy;
		let topX = x;
		let topZ = z;
		for (let i = 0; i < 48; i++) {
			const surf = surfaceY(x, z, seed);
			for (let t = -1; t <= 1; t++) {
				const tx = x + (useX ? 0 : t);
				const tz = z + (useX ? t : 0);
				for (let yy = y; yy <= Math.min(46, y + 2); yy++) this.world.set(tx, yy, tz, B.air);
				if (y > 2) this.world.set(tx, y - 1, tz, B.cobble);
			}
			if (i % 4 === 0) {
				const wx = x + (useX ? 0 : 2);
				const wz = z + (useX ? 2 : 0);
				this.world.set(wx, y, wz, B.torch);
			}
			topX = x;
			topZ = z;
			if (y >= surf - 1) break;
			y += 1;
			x += stepX;
			z += stepZ;
		}
		const markX = topX - (useX ? 0 : 2);
		const markZ = topZ - (useX ? 2 : 0);
		const markBase = surfaceY(markX, markZ, seed);
		this.world.set(markX, markBase, markZ, B.cobble);
		this.world.set(markX, markBase + 1, markZ, B.cobble);
		if (markBase + 2 < 48) this.world.set(markX, markBase + 2, markZ, B.lamp);
		const chestX = topX + (useX ? 0 : 2);
		const chestZ = topZ + (useX ? 2 : 0);
		const chestY = Math.min(46, surfaceY(chestX, chestZ, seed) + 1);
		this.world.set(chestX, chestY - 1, chestZ, B.brick);
		this.world.set(chestX, chestY, chestZ, B.chest);
		const loot = emptySlots(18);
		loot[0] = {
			id: B.torch,
			n: 8,
			dura: -1
		};
		loot[1] = {
			id: I.apple,
			n: 3,
			dura: -1
		};
		loot[2] = {
			id: I.seed,
			n: 2,
			dura: -1
		};
		this.chests.set(keyOf(chestX, chestY, chestZ), loot);
		this.heartX = hx;
		this.heartY = hy;
		this.heartZ = hz;
	}
	watchHeart() {
		if (this.won || this.heartNear) return;
		if (Math.hypot(this.x - (this.heartX + .5), this.y - this.heartY, this.z - (this.heartZ + .5)) < 7) {
			this.heartNear = true;
			this.say("Tim khe đang sáng dưới này. Chỉ cuốc tinh thể phá được nó.");
		}
	}
	giveOrDrop(x, y, z, id, n, dura) {
		const left = this.addItem(id, n, dura);
		if (left > 0) this.spawnDrop(x, y, z, id, left, dura);
	}
	addItem(id, n, dura = -1) {
		const max = maxStack(id);
		const toolDura = dura >= 0 ? dura : isTool(id) ? toolInfo(id).dura : -1;
		if (max > 1) {
			for (const s of this.slots) if (s && s.id === id && s.n < max) {
				const add = Math.min(max - s.n, n);
				s.n += add;
				n -= add;
				if (n <= 0) {
					this.bump();
					return 0;
				}
			}
		}
		for (let i = 0; i < this.slots.length; i++) if (!this.slots[i]) {
			const add = Math.min(max, n);
			this.slots[i] = {
				id,
				n: add,
				dura: max > 1 ? -1 : toolDura
			};
			n -= add;
			if (n <= 0) {
				this.bump();
				return 0;
			}
		}
		this.bump();
		return n;
	}
	consumeSlot(i, n) {
		const s = this.slots[i];
		if (!s) return;
		s.n -= n;
		if (s.n <= 0) this.slots[i] = null;
	}
	countOf(id) {
		let n = 0;
		for (const s of this.slots) if (s && s.id === id) n += s.n;
		return n;
	}
	consume(id, n) {
		let left = n;
		for (let i = 0; i < this.slots.length; i++) {
			const s = this.slots[i];
			if (!s || s.id !== id) continue;
			const take = Math.min(s.n, left);
			s.n -= take;
			left -= take;
			if (s.n <= 0) this.slots[i] = null;
			if (left <= 0) break;
		}
	}
	wearTool() {
		const s = this.slots[this.selected];
		if (!s || !isTool(s.id)) return;
		s.dura -= 1;
		if (s.dura <= 0) {
			this.slots[this.selected] = null;
			this.sfx.play("break");
		}
		this.bump();
	}
	canCraft(r) {
		if (r.station === "bench" && !this.near(B.bench)) return false;
		if (r.station === "furnace" && !this.near(B.furnace)) return false;
		for (const [id, n] of r.need) if (this.countOf(id) < n) return false;
		return true;
	}
	craft(id) {
		const r = RECIPES.find((x) => x.id === id);
		if (!r || !this.canCraft(r)) return;
		for (const [nid, n] of r.need) this.consume(nid, n);
		const dura = isTool(r.out) ? toolInfo(r.out).dura : -1;
		const left = this.addItem(r.out, r.n, dura);
		if (left > 0) this.spawnDrop(this.x, this.y + .8, this.z, r.out, left, dura);
		this.sfx.play("craft");
		this.bump();
	}
	near(id) {
		const px = Math.floor(this.x);
		const py = Math.floor(this.y);
		const pz = Math.floor(this.z);
		for (let y = py - 2; y <= py + 2; y++) for (let x = px - 4; x <= px + 4; x++) for (let z = pz - 4; z <= pz + 4; z++) if (this.world.get(x, y, z) === id) return true;
		return false;
	}
	swapWithSelected(index) {
		if (index === this.selected) return;
		const tmp = this.slots[index] ?? null;
		this.slots[index] = this.slots[this.selected] ?? null;
		this.slots[this.selected] = tmp;
		this.bump();
	}
	swapChest(index) {
		if (!this.chestKey) return;
		const slots = this.chests.get(this.chestKey);
		if (!slots || index < 0 || index >= slots.length) return;
		const tmp = slots[index] ?? null;
		slots[index] = this.slots[this.selected] ?? null;
		this.slots[this.selected] = tmp;
		this.onChest?.(this.chestKey, slots.map((s) => s ? { ...s } : null));
		this.bump();
	}
	applyChest(key, slots) {
		const next = emptySlots(18);
		slots.forEach((s, i) => {
			if (s && i < 18) next[i] = { ...s };
		});
		this.chests.set(key, next);
		this.bump();
	}
	dropSelected() {
		const s = this.slots[this.selected];
		if (!s) return;
		const { fx, fz } = this.basis();
		this.spawnDrop(this.x + fx * .6, this.y + 1.1, this.z + fz * .6, s.id, 1, s.dura);
		this.consumeSlot(this.selected, 1);
		this.bump();
	}
	spawnDrop(x, y, z, id, n, dura) {
		if (this.drops.length > 48) this.drops.shift();
		this.drops.push({
			x,
			y,
			z,
			vx: (Math.random() - .5) * 2,
			vy: 2.4,
			vz: (Math.random() - .5) * 2,
			id,
			n,
			dura,
			age: 0
		});
	}
	updateDrops(dt) {
		for (let i = this.drops.length - 1; i >= 0; i--) {
			const d = this.drops[i];
			d.age += dt;
			d.vy -= 26 * dt;
			d.x += d.vx * dt;
			d.y += d.vy * dt;
			d.z += d.vz * dt;
			if (this.world.solid(Math.floor(d.x), Math.floor(d.y), Math.floor(d.z))) {
				d.y = Math.floor(d.y) + 1;
				d.vy *= -.2;
				d.vx *= .6;
				d.vz *= .6;
			}
			const dx = this.x - d.x;
			const dy = this.y + .7 - d.y;
			const dz = this.z - d.z;
			const dist = Math.hypot(dx, dy, dz);
			if (d.age > .35 && dist < 2.2 && dist > .01) {
				d.x += dx / dist * 6 * dt;
				d.y += dy / dist * 6 * dt;
				d.z += dz / dist * 6 * dt;
			}
			if (d.age > .3 && dist < .9) {
				const left = this.addItem(d.id, d.n, d.dura);
				if (left <= 0) {
					this.drops.splice(i, 1);
					this.sfx.play("pickup");
				} else d.n = left;
			} else if (d.age > 90) this.drops.splice(i, 1);
		}
	}
	mobInCone(range) {
		const dir = this.lookDir();
		let best = null;
		let bestD = range;
		for (const m of this.mobs) {
			const dx = m.x - this.x;
			const dy = m.y + .4 - (this.y + EYE$1);
			const dz = m.z - this.z;
			const dist = Math.hypot(dx, dy, dz);
			if (dist > range || dist < .001) continue;
			if (dx / dist * dir.x + dy / dist * dir.y + dz / dist * dir.z < .45) continue;
			if (dist < bestD) {
				best = m;
				bestD = dist;
			}
		}
		return best;
	}
	hitMob(m) {
		const tool = toolInfo(this.slots[this.selected]?.id ?? 0);
		const dmg = tool.kind === "sword" || tool.kind === "hand" ? tool.dmg : Math.max(1, tool.dmg - 1);
		m.hp -= dmg;
		const { fx, fz } = this.basis();
		m.vx = fx * 5;
		m.vz = fz * 5;
		m.vy = 4.2;
		this.swing = .28;
		this.sfx.play("hit");
		this.burst(m.x, m.y + .4, m.z, "#7dce55", 6);
		if (isTool(this.slots[this.selected]?.id ?? 0)) this.wearTool();
		if (m.hp <= 0) {
			this.dropMob(m);
			this.mobs = this.mobs.filter((x) => x !== m);
		}
		this.bump();
	}
	updateMobs(dt) {
		const day = this.dayFactor();
		for (let i = this.mobs.length - 1; i >= 0; i--) {
			const m = this.mobs[i];
			m.hop -= dt;
			const surf = surfaceY(Math.floor(m.x), Math.floor(m.z), this.world.seed);
			const buried = m.y < surf - 1;
			if (day > .72 && !buried) m.hp -= (m.kind === "beetle" ? 4.4 : 3.2) * dt;
			if (m.hp <= 0) {
				this.dropMob(m);
				this.mobs.splice(i, 1);
				continue;
			}
			const dx = this.x - m.x;
			const dz = this.z - m.z;
			const dist = Math.hypot(dx, dz) || 1;
			const speed = m.kind === "beetle" ? 1.65 : 2.3;
			const hop = m.kind === "beetle" ? 5.1 : 7.1;
			if (m.onGround && m.hop <= 0) {
				m.vx = dx / dist * speed;
				m.vz = dz / dist * speed;
				m.vy = hop;
				m.hop = (m.kind === "beetle" ? .85 : .7) + Math.random() * .4;
			}
			m.vy -= 28 * dt;
			this.integrateBody(m, dt, .28, .78);
			if (Math.hypot(m.x - this.x, m.y + .3 - (this.y + .7), m.z - this.z) < .95 && this.invuln <= 0) {
				this.damage(2);
				this.vx = Math.sign(this.x - m.x) * 5 || 2;
				this.vz = Math.sign(this.z - m.z) * 5 || 2;
				this.vy = 5;
			}
			if (dist > 40) this.mobs.splice(i, 1);
		}
	}
	integrateBody(m, dt, hw, h) {
		const old = {
			x: this.x,
			y: this.y,
			z: this.z,
			vx: this.vx,
			vy: this.vy,
			vz: this.vz,
			onGround: this.onGround
		};
		this.x = m.x;
		this.y = m.y;
		this.z = m.z;
		this.vx = m.vx;
		this.vy = m.vy;
		this.vz = m.vz;
		this.onGround = m.onGround;
		this.x += this.vx * dt;
		if (this.overlapBox(this.x, this.y, this.z, hw, h)) {
			this.x = m.x;
			this.vx = 0;
		}
		this.z += this.vz * dt;
		if (this.overlapBox(this.x, this.y, this.z, hw, h)) {
			this.z = m.z;
			this.vz = 0;
		}
		this.y += this.vy * dt;
		if (this.overlapBox(this.x, this.y, this.z, hw, h)) {
			if (this.vy <= 0) {
				this.y = Math.floor(this.y) + 1;
				this.onGround = true;
			} else {
				this.y = Math.floor(this.y + h) - h - .001;
				this.onGround = false;
			}
			this.vy = 0;
		} else if (this.vy < -.2) this.onGround = false;
		m.x = this.x;
		m.y = this.y;
		m.z = this.z;
		m.vx = this.vx;
		m.vy = this.vy;
		m.vz = this.vz;
		m.onGround = this.onGround;
		this.x = old.x;
		this.y = old.y;
		this.z = old.z;
		this.vx = old.vx;
		this.vy = old.vy;
		this.vz = old.vz;
		this.onGround = old.onGround;
	}
	overlapBox(x, y, z, hw, h) {
		const x0 = Math.floor(x - hw);
		const x1 = Math.floor(x + hw);
		const y0 = Math.floor(y + .001);
		const y1 = Math.floor(y + h - .001);
		const z0 = Math.floor(z - hw);
		const z1 = Math.floor(z + hw);
		for (let ix = x0; ix <= x1; ix++) for (let iy = y0; iy <= y1; iy++) for (let iz = z0; iz <= z1; iz++) if (this.world.solid(ix, iy, iz)) return true;
		return false;
	}
	spawnMobs(dt) {
		this.mobSpawn -= dt;
		if (this.mobSpawn > 0) return;
		this.mobSpawn = 2.6;
		if (this.mobs.length >= 7) return;
		const here = surfaceY(Math.floor(this.x), Math.floor(this.z), this.world.seed);
		if (this.y < here - 4 && this.mobs.filter((m) => m.kind === "beetle").length < 3 && this.trySpawnBeetle()) return;
		if (!(this.phase() >= .6 && this.phase() < .92) && this.dayFactor() > .55) return;
		for (let tries = 0; tries < 8; tries++) {
			const ang = Math.random() * Math.PI * 2;
			const dist = 12 + Math.random() * 10;
			const x = Math.floor(this.x + Math.cos(ang) * dist);
			const z = Math.floor(this.z + Math.sin(ang) * dist);
			const surf = surfaceY(x, z, this.world.seed);
			if (this.world.get(x, surf, z) === B.water) continue;
			if (this.world.get(x, surf + 1, z) !== B.air) continue;
			if (Math.hypot(x - this.x, z - this.z) < 8) continue;
			this.mobs.push({
				id: this.nextMob++,
				x: x + .5,
				y: surf + 1,
				z: z + .5,
				vx: 0,
				vy: 0,
				vz: 0,
				hp: 8,
				hop: .2,
				onGround: true,
				kind: "moss"
			});
			return;
		}
	}
	dropMob(m) {
		if (m.kind === "beetle" && Math.random() < .28) this.spawnDrop(m.x, m.y + .3, m.z, B.crystal, 1, -1);
		else this.spawnDrop(m.x, m.y + .3, m.z, I.gel, 1, -1);
	}
	trySpawnBeetle() {
		for (let tries = 0; tries < 8; tries++) {
			const ang = Math.random() * Math.PI * 2;
			const dist = 7 + Math.random() * 8;
			const x = Math.floor(this.x + Math.cos(ang) * dist);
			const z = Math.floor(this.z + Math.sin(ang) * dist);
			const y = Math.floor(this.y);
			if (this.world.get(x, y, z) !== B.air) continue;
			if (!this.world.solid(x, y - 1, z)) continue;
			if (Math.hypot(x + .5 - this.x, z + .5 - this.z) < 5) continue;
			this.mobs.push({
				id: this.nextMob++,
				kind: "beetle",
				x: x + .5,
				y,
				z: z + .5,
				vx: 0,
				vy: 0,
				vz: 0,
				hp: 6,
				hop: .3,
				onGround: true
			});
			return true;
		}
		return false;
	}
	damage(n) {
		if (this.invuln > 0 || this.mode === "dead" || this.mode === "won") return;
		this.hp = Math.max(0, this.hp - n);
		this.invuln = .75;
		this.sfx.play("hurt");
		this.bump();
		if (this.hp <= 0) {
			this.mode = "dead";
			this.sfx.play("die");
			this.save();
			this.bump();
		}
	}
	respawn() {
		this.hp = this.maxHp;
		this.hunger = Math.max(this.hunger, 7);
		this.x = this.spawnX;
		this.y = this.spawnY;
		this.z = this.spawnZ;
		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
		this.invuln = 1.6;
		this.mode = "play";
		this.bump();
		this.save();
	}
	regenTick(dt) {
		if (this.hp <= 0 || this.hp >= this.maxHp || this.hunger < 6) return;
		if (this.dayFactor() < .6) return;
		this.regen += dt;
		if (this.regen > 7) {
			this.hp = Math.min(this.maxHp, this.hp + 1);
			this.regen = 3;
			this.bump();
		}
	}
	burst(x, y, z, color, n) {
		for (let i = 0; i < n; i++) {
			if (this.particles.length > 140) this.particles.shift();
			this.particles.push({
				x,
				y,
				z,
				vx: (Math.random() - .5) * 3.2,
				vy: Math.random() * 3,
				vz: (Math.random() - .5) * 3.2,
				life: .35 + Math.random() * .25,
				color
			});
		}
	}
	updateParticles(dt) {
		for (let i = this.particles.length - 1; i >= 0; i--) {
			const p = this.particles[i];
			p.life -= dt;
			if (p.life <= 0) {
				this.particles.splice(i, 1);
				continue;
			}
			p.vy -= 8 * dt;
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			p.z += p.vz * dt;
		}
	}
	lerpRemotes(dt) {
		const k = 1 - Math.exp(-12 * dt);
		for (const r of this.remotes.values()) {
			r.x += (r.tx - r.x) * k;
			r.y += (r.ty - r.y) * k;
			r.z += (r.tz - r.z) * k;
			let dyaw = r.tyaw - r.yaw;
			while (dyaw > Math.PI) dyaw -= Math.PI * 2;
			while (dyaw < -Math.PI) dyaw += Math.PI * 2;
			r.yaw += dyaw * k;
		}
	}
	setRemote(id, name, x, y, z, yaw, hp) {
		let r = this.remotes.get(id);
		if (!r) {
			r = {
				id,
				name,
				x,
				y,
				z,
				yaw,
				tx: x,
				ty: y,
				tz: z,
				tyaw: yaw,
				hp
			};
			this.remotes.set(id, r);
			this.bump();
			return;
		}
		r.name = name || r.name;
		r.tx = x;
		r.ty = y;
		r.tz = z;
		r.tyaw = yaw;
		r.hp = hp;
	}
	dropRemote(id) {
		if (this.remotes.delete(id)) this.bump();
	}
	aimName() {
		if (!this.aim) return "";
		const id = this.world.get(this.aim.x, this.aim.y, this.aim.z);
		if (id === B.air || id === B.water) return "";
		return blockDef(id)?.name ?? "";
	}
	save() {
		if (!this.persist) return;
		writeSave({
			v: 2,
			seed: this.world.seed,
			x: this.x,
			y: this.y,
			z: this.z,
			yaw: this.yaw,
			pitch: this.pitch,
			hp: this.hp,
			time: this.time,
			selected: this.selected,
			spawnX: this.spawnX,
			spawnY: this.spawnY,
			spawnZ: this.spawnZ,
			hunger: this.hunger,
			slots: this.slots.map((s) => s ? { ...s } : null),
			mods: this.world.exportMods(),
			chests: Object.fromEntries([...this.chests.entries()].map(([k, slots]) => [k, slots.map((s) => s ? { ...s } : null)])),
			won: this.won
		});
	}
};
function keyOf(x, y, z) {
	return x + "," + y + "," + z;
}
function rollDrop(id) {
	if (id === B.stone) return {
		id: B.cobble,
		n: 1
	};
	if (id === B.coalOre) return {
		id: I.coal,
		n: 1
	};
	if (id === B.leaves || id === B.sleaves) {
		const r = Math.random();
		if (r < .06) return {
			id: I.apple,
			n: 1
		};
		if (r < .16) return {
			id: I.stick,
			n: 1
		};
		return null;
	}
	if (id === B.tallgrass && Math.random() < .4) return {
		id: I.seed,
		n: 1
	};
	if (id === B.flower && Math.random() < .65) return {
		id: I.seed,
		n: 1
	};
	if (id === B.bush) return null;
	if (id === B.orchid) return {
		id: I.petal,
		n: 1 + (Math.random() < .35 ? 1 : 0)
	};
	if (id === B.sprout) return {
		id: I.seed,
		n: 1
	};
	if (id === B.heart || id === B.bedrock || id === B.water || id === B.air) return null;
	if (id === B.doorOpen) return {
		id: B.door,
		n: 1
	};
	return {
		id,
		n: 1
	};
}
function raycast(world, ox, oy, oz, dx, dy, dz, reach) {
	const len = Math.hypot(dx, dy, dz) || 1;
	dx /= len;
	dy /= len;
	dz /= len;
	let x = Math.floor(ox);
	let y = Math.floor(oy);
	let z = Math.floor(oz);
	const stepX = dx >= 0 ? 1 : -1;
	const stepY = dy >= 0 ? 1 : -1;
	const stepZ = dz >= 0 ? 1 : -1;
	const tDeltaX = dx === 0 ? Infinity : Math.abs(1 / dx);
	const tDeltaY = dy === 0 ? Infinity : Math.abs(1 / dy);
	const tDeltaZ = dz === 0 ? Infinity : Math.abs(1 / dz);
	let tMaxX = dx === 0 ? Infinity : (dx > 0 ? x + 1 - ox : ox - x) * tDeltaX;
	let tMaxY = dy === 0 ? Infinity : (dy > 0 ? y + 1 - oy : oy - y) * tDeltaY;
	let tMaxZ = dz === 0 ? Infinity : (dz > 0 ? z + 1 - oz : oz - z) * tDeltaZ;
	let nx = 0;
	let ny = 0;
	let nz = 0;
	let dist = 0;
	for (let i = 0; i < 48; i++) {
		const id = world.get(x, y, z);
		if (id !== B.air && id !== B.water) return {
			x,
			y,
			z,
			nx,
			ny,
			nz
		};
		if (tMaxX < tMaxY && tMaxX < tMaxZ) {
			if (tMaxX > reach) return null;
			x += stepX;
			dist = tMaxX;
			tMaxX += tDeltaX;
			nx = -stepX;
			ny = 0;
			nz = 0;
		} else if (tMaxY < tMaxZ) {
			if (tMaxY > reach) return null;
			y += stepY;
			dist = tMaxY;
			tMaxY += tDeltaY;
			nx = 0;
			ny = -stepY;
			nz = 0;
		} else {
			if (tMaxZ > reach) return null;
			z += stepZ;
			dist = tMaxZ;
			tMaxZ += tDeltaZ;
			nx = 0;
			ny = 0;
			nz = -stepZ;
		}
		if (dist > reach) return null;
	}
	return null;
}
function syncParts(game, size = 700) {
	const mods = game.world.exportMods();
	const parts = Math.max(1, Math.ceil(mods.length / size));
	const out = [];
	for (let i = 0; i < parts; i++) out.push({
		t: "sync",
		seed: game.world.seed,
		time: game.time,
		part: i,
		parts,
		mods: mods.slice(i * size, (i + 1) * size)
	});
	return out;
}
var Input = class {
	held = /* @__PURE__ */ new Set();
	edges = /* @__PURE__ */ new Set();
	override = null;
	lookDx = 0;
	lookDy = 0;
	scroll = 0;
	mine = false;
	place = false;
	mineEdge = false;
	placeEdge = false;
	/** Strafe -1..1, from the touch stick. */
	joyX = 0;
	/** Forward -1..1, stick up is positive. */
	joyY = 0;
	jumpHeld = false;
	canvas = null;
	cleanups = [];
	attach(canvas) {
		this.destroy();
		this.canvas = canvas;
		const down = (e) => {
			if (e.repeat) return;
			this.held.add(e.code);
			this.edges.add(e.code);
			if ([
				"Space",
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight"
			].includes(e.code)) e.preventDefault();
		};
		const up = (e) => {
			this.held.delete(e.code);
		};
		const blur = () => {
			this.held.clear();
			this.mine = false;
			this.place = false;
		};
		const md = (e) => {
			if (e.button === 0) {
				this.mine = true;
				this.mineEdge = true;
			} else if (e.button === 2) {
				this.place = true;
				this.placeEdge = true;
				e.preventDefault();
			}
		};
		const mu = (e) => {
			if (e.button === 0) this.mine = false;
			if (e.button === 2) this.place = false;
		};
		const mm = (e) => {
			if (document.pointerLockElement === canvas) {
				this.lookDx += e.movementX;
				this.lookDy += e.movementY;
			}
		};
		const wheel = (e) => {
			this.scroll += Math.sign(e.deltaY);
			e.preventDefault();
		};
		const menu = (e) => e.preventDefault();
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		window.addEventListener("blur", blur);
		window.addEventListener("mousemove", mm);
		canvas.addEventListener("mousedown", md);
		window.addEventListener("mouseup", mu);
		canvas.addEventListener("wheel", wheel, { passive: false });
		canvas.addEventListener("contextmenu", menu);
		this.cleanups.push(() => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
			window.removeEventListener("blur", blur);
			window.removeEventListener("mousemove", mm);
			canvas.removeEventListener("mousedown", md);
			window.removeEventListener("mouseup", mu);
			canvas.removeEventListener("wheel", wheel);
			canvas.removeEventListener("contextmenu", menu);
		});
	}
	addLook(dx, dy) {
		this.lookDx += dx;
		this.lookDy += dy;
	}
	setMine(on) {
		if (on && !this.mine) this.mineEdge = true;
		this.mine = on;
	}
	setPlace(on) {
		if (on && !this.place) this.placeEdge = true;
		this.place = on;
	}
	down(code) {
		if (this.override) return this.override.includes(code);
		return this.held.has(code);
	}
	setOverride(codes) {
		this.override = codes;
	}
	pull() {
		const edges = this.edges;
		this.edges = /* @__PURE__ */ new Set();
		const mineEdge = this.mineEdge;
		const placeEdge = this.placeEdge;
		this.mineEdge = false;
		this.placeEdge = false;
		const lookDx = this.lookDx;
		const lookDy = this.lookDy;
		const scroll = this.scroll;
		this.lookDx = 0;
		this.lookDy = 0;
		this.scroll = 0;
		const edge = (code) => {
			if (this.override) return false;
			return edges.has(code);
		};
		return {
			edge,
			mineEdge,
			placeEdge,
			lookDx,
			lookDy,
			scroll
		};
	}
	destroy() {
		for (const fn of this.cleanups) fn();
		this.cleanups = [];
		this.canvas = null;
		this.held.clear();
	}
};
var FACES = [
	{
		n: [
			1,
			0,
			0
		],
		v: [
			[
				1,
				0,
				1
			],
			[
				1,
				0,
				0
			],
			[
				1,
				1,
				0
			],
			[
				1,
				1,
				1
			]
		]
	},
	{
		n: [
			-1,
			0,
			0
		],
		v: [
			[
				0,
				0,
				0
			],
			[
				0,
				0,
				1
			],
			[
				0,
				1,
				1
			],
			[
				0,
				1,
				0
			]
		]
	},
	{
		n: [
			0,
			1,
			0
		],
		v: [
			[
				0,
				1,
				1
			],
			[
				1,
				1,
				1
			],
			[
				1,
				1,
				0
			],
			[
				0,
				1,
				0
			]
		]
	},
	{
		n: [
			0,
			-1,
			0
		],
		v: [
			[
				0,
				0,
				0
			],
			[
				1,
				0,
				0
			],
			[
				1,
				0,
				1
			],
			[
				0,
				0,
				1
			]
		]
	},
	{
		n: [
			0,
			0,
			1
		],
		v: [
			[
				0,
				0,
				1
			],
			[
				1,
				0,
				1
			],
			[
				1,
				1,
				1
			],
			[
				0,
				1,
				1
			]
		]
	},
	{
		n: [
			0,
			0,
			-1
		],
		v: [
			[
				1,
				0,
				0
			],
			[
				0,
				0,
				0
			],
			[
				0,
				1,
				0
			],
			[
				1,
				1,
				0
			]
		]
	}
];
var SHADE = [
	.62,
	.62,
	1,
	.42,
	.78,
	.68
];
function occludes(nid, self) {
	if (nid === self && (self === B.leaves || self === B.sleaves || self === B.water || self === B.glass || self === B.ice)) return true;
	return !!blockDef(nid)?.opaque;
}
function pushFace(pos, nor, col, x, y, z, face, sx0, sy0, sz0, sx1, sy1, sz1, r, g, b) {
	const [a, c, d, e] = face.v.map(([vx, vy, vz]) => {
		return [
			x + sx0 + (sx1 - sx0) * vx,
			y + sy0 + (sy1 - sy0) * vy,
			z + sz0 + (sz1 - sz0) * vz
		];
	});
	const tri = [
		a,
		c,
		d,
		a,
		d,
		e
	];
	const nx = face.n[0];
	const ny = face.n[1];
	const nz = face.n[2];
	for (const p of tri) {
		if (!p) continue;
		pos.push(p[0], p[1], p[2]);
		nor.push(nx, ny, nz);
		col.push(r, g, b);
	}
}
function hexToRgb(hex) {
	const n = Number.parseInt(hex.slice(1), 16);
	return [
		(n >> 16) / 255,
		(n >> 8 & 255) / 255,
		(n & 255) / 255
	];
}
function tint(hex, shade, jitter) {
	const [r, g, b] = hexToRgb(hex);
	const k = shade * jitter;
	return [
		Math.min(1, r * k),
		Math.min(1, g * k),
		Math.min(1, b * k)
	];
}
function emitBox(pos, nor, col, x, y, z, x0, y0, z0, x1, y1, z1, hex, jitter) {
	FACES.forEach((face, i) => {
		const [r, g, b] = tint(hex, SHADE[i] ?? 1, jitter);
		pushFace(pos, nor, col, x, y, z, face, x0, y0, z0, x1, y1, z1, r, g, b);
	});
}
function pack(pos, nor, col) {
	if (pos.length === 0) return null;
	return {
		pos: new Float32Array(pos),
		nor: new Float32Array(nor),
		col: new Float32Array(col)
	};
}
function buildChunk(world, cx, cz) {
	const pos = [];
	const nor = [];
	const col = [];
	const wpos = [];
	const wnor = [];
	const wcol = [];
	const x0 = cx * 16;
	const z0 = cz * 16;
	for (let lx = 0; lx < 16; lx++) for (let lz = 0; lz < 16; lz++) {
		const x = x0 + lx;
		const z = z0 + lz;
		for (let y = 0; y < 48; y++) {
			const id = world.get(x, y, z);
			if (id === B.air) continue;
			const def = blockDef(id);
			if (!def) continue;
			const jitter = .93 + (x * 13 + y * 7 + z * 17 & 7) * .01;
			if (id === B.water) {
				for (let i = 0; i < FACES.length; i++) {
					const face = FACES[i];
					if (occludes(world.get(x + face.n[0], y + face.n[1], z + face.n[2]), id)) continue;
					const [r, g, b] = tint(def.color, SHADE[i] ?? 1, jitter);
					pushFace(wpos, wnor, wcol, x, y, z, face, 0, 0, 0, 1, 1, 1, r, g, b);
				}
				continue;
			}
			if (id === B.tallgrass || id === B.flower || id === B.bush || id === B.sprout || id === B.orchid) {
				const h = id === B.orchid ? .72 : id === B.sprout ? .28 : id === B.flower ? .42 : .62;
				emitBox(pos, nor, col, x, y, z, .38, 0, .38, .62, h, .62, def.color, jitter);
				if (id === B.orchid) {
					emitBox(pos, nor, col, x, y, z, .22, .55, .42, .48, .78, .7, "#f3a0b4", jitter);
					emitBox(pos, nor, col, x, y, z, .52, .58, .28, .78, .8, .55, "#f3a0b4", jitter);
				}
				continue;
			}
			if (id === B.torch) {
				emitBox(pos, nor, col, x, y, z, .42, 0, .42, .58, .62, .58, "#e7a05a", 1);
				emitBox(pos, nor, col, x, y, z, .38, .62, .38, .62, .78, .62, "#ffe1a8", 1);
				continue;
			}
			if (id === B.lamp) {
				emitBox(pos, nor, col, x, y, z, .28, 0, .28, .72, .55, .72, "#e0a050", 1);
				emitBox(pos, nor, col, x, y, z, .34, .55, .34, .66, .72, .66, "#fff1c4", 1);
				continue;
			}
			if (id === B.ladder) {
				emitBox(pos, nor, col, x, y, z, .36, 0, .36, .64, 1, .64, def.color, jitter);
				continue;
			}
			if (id === B.doorOpen) {
				emitBox(pos, nor, col, x, y, z, .4, 0, .08, .55, 1, .92, def.color, jitter);
				continue;
			}
			for (let i = 0; i < FACES.length; i++) {
				const face = FACES[i];
				if (occludes(world.get(x + face.n[0], y + face.n[1], z + face.n[2]), id)) continue;
				const [r, g, b] = tint(def.color, (SHADE[i] ?? 1) * (id === B.heart ? 1.25 : 1), jitter);
				pushFace(pos, nor, col, x, y, z, face, 0, 0, 0, 1, 1, 1, r, g, b);
			}
		}
	}
	return {
		solid: pack(pos, nor, col),
		water: pack(wpos, wnor, wcol)
	};
}
var RADIUS = 3;
var EYE = 1.52;
var WorldView = class {
	renderer;
	scene = new Scene();
	camera;
	labelRoot = null;
	chunks = /* @__PURE__ */ new Map();
	solidMat = new MeshLambertMaterial({ vertexColors: true });
	waterMat = new MeshLambertMaterial({
		vertexColors: true,
		transparent: true,
		opacity: .62,
		depthWrite: false
	});
	highlight;
	hand;
	handMat;
	mobMesh;
	dropMesh;
	dropColor = new Color();
	points;
	pointPos;
	pointCol;
	lights = [];
	hemi;
	sun;
	sunBall;
	stars;
	avatars = [];
	dummy = new Object3D();
	mobColor = new Color();
	clouds;
	cloudMat;
	sky = new Color("#8ec8ea");
	night = new Color("#0c1424");
	day = new Color("#8ec8ea");
	dawn = new Color("#f0b07a");
	dusk = new Color("#e08a55");
	lightScan = 0;
	torchPos = [];
	constructor(canvas) {
		this.renderer = new WebGLRenderer({
			canvas,
			antialias: true,
			alpha: false,
			powerPreference: "high-performance"
		});
		this.renderer.setClearColor(this.day, 1);
		this.camera = new PerspectiveCamera(72, 1, .08, 160);
		this.camera.rotation.order = "YXZ";
		this.scene.fog = new Fog(this.day, 22, 62);
		this.hemi = new HemisphereLight("#d7ecff", "#3d4a34", .85);
		this.sun = new DirectionalLight("#fff4e0", 1.15);
		this.sun.position.set(30, 48, 16);
		this.scene.add(this.hemi, this.sun);
		for (let i = 0; i < 6; i++) {
			const l = new PointLight("#ffb15e", 0, 16, 2);
			this.scene.add(l);
			this.lights.push(l);
		}
		this.sunBall = new Mesh(new SphereGeometry(4, 12, 8), new MeshBasicMaterial({ color: "#ffe1a8" }));
		this.scene.add(this.sunBall);
		const starGeo = new BufferGeometry();
		const starPos = /* @__PURE__ */ new Float32Array(540);
		for (let i = 0; i < 180; i++) {
			const u = Math.random();
			const v = Math.random();
			const th = Math.PI * 2 * u;
			const ph = Math.acos(2 * v - 1);
			const r = 90;
			starPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
			starPos[i * 3 + 1] = Math.abs(r * Math.cos(ph)) * .65 + 10;
			starPos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
		}
		starGeo.setAttribute("position", new BufferAttribute(starPos, 3));
		this.stars = new Points(starGeo, new PointsMaterial({
			color: "#fff",
			size: 1.4,
			sizeAttenuation: false,
			transparent: true,
			opacity: 0
		}));
		this.scene.add(this.stars);
		this.cloudMat = new MeshBasicMaterial({
			color: "#f4f7fb",
			transparent: true,
			opacity: .7,
			depthWrite: false
		});
		this.clouds = new Group();
		for (let i = 0; i < 7; i++) {
			const puff = new Mesh(new BoxGeometry(7 + i % 3 * 3, .7, 2.8 + i % 2), this.cloudMat);
			puff.position.set((i - 3) * 16, 0, i * 5 % 7 * 6 - 18);
			this.clouds.add(puff);
		}
		this.scene.add(this.clouds);
		const edges = new EdgesGeometry(new BoxGeometry(1.01, 1.01, 1.01));
		this.highlight = new LineSegments(edges, new LineBasicMaterial({ color: "#fffaf2" }));
		this.highlight.visible = false;
		this.scene.add(this.highlight);
		this.handMat = new MeshLambertMaterial({ color: "#c49658" });
		this.hand = new Mesh(new BoxGeometry(.16, .16, .42), this.handMat);
		this.hand.position.set(.34, -.32, -.58);
		this.camera.add(this.hand);
		this.scene.add(this.camera);
		this.mobMesh = new InstancedMesh(new SphereGeometry(.38, 10, 8), new MeshLambertMaterial({ color: "#ffffff" }), 12);
		this.mobMesh.count = 0;
		this.scene.add(this.mobMesh);
		this.dropMesh = new InstancedMesh(new BoxGeometry(.22, .22, .22), new MeshLambertMaterial({ color: "#fff" }), 48);
		this.dropMesh.count = 0;
		this.scene.add(this.dropMesh);
		this.pointPos = /* @__PURE__ */ new Float32Array(480);
		this.pointCol = /* @__PURE__ */ new Float32Array(480);
		const pg = new BufferGeometry();
		pg.setAttribute("position", new BufferAttribute(this.pointPos, 3));
		pg.setAttribute("color", new BufferAttribute(this.pointCol, 3));
		this.points = new Points(pg, new PointsMaterial({
			size: .12,
			vertexColors: true,
			transparent: true,
			opacity: .9
		}));
		this.scene.add(this.points);
		const palette = [
			14711365,
			4102754,
			6217936,
			13939843,
			9352406,
			12868462,
			15259552,
			8227482
		];
		for (let i = 0; i < 8; i++) {
			const g = new Group();
			const color = palette[i] ?? 14711365;
			const body = new Mesh(new BoxGeometry(.48, .7, .3), new MeshLambertMaterial({ color }));
			body.position.y = .86;
			const head = new Mesh(new BoxGeometry(.34, .34, .34), new MeshLambertMaterial({ color: 15986660 }));
			head.position.y = 1.48;
			g.add(body, head);
			g.visible = false;
			this.scene.add(g);
			this.avatars.push(g);
		}
	}
	resize() {
		const c = this.renderer.domElement;
		const w = Math.max(1, c.clientWidth);
		const h = Math.max(1, c.clientHeight);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
		this.renderer.setSize(w, h, false);
		this.camera.aspect = w / h;
		this.camera.updateProjectionMatrix();
	}
	rebuild(key, cx, cz, world) {
		const prev = this.chunks.get(key);
		prev?.solid?.geometry.dispose();
		prev?.water?.geometry.dispose();
		if (prev?.solid) this.scene.remove(prev.solid);
		if (prev?.water) this.scene.remove(prev.water);
		const built = buildChunk(world, cx, cz);
		const entry = {
			solid: null,
			water: null
		};
		if (built.solid) {
			const geo = new BufferGeometry();
			geo.setAttribute("position", new BufferAttribute(built.solid.pos, 3));
			geo.setAttribute("normal", new BufferAttribute(built.solid.nor, 3));
			geo.setAttribute("color", new BufferAttribute(built.solid.col, 3));
			entry.solid = new Mesh(geo, this.solidMat);
			this.scene.add(entry.solid);
		}
		if (built.water) {
			const geo = new BufferGeometry();
			geo.setAttribute("position", new BufferAttribute(built.water.pos, 3));
			geo.setAttribute("normal", new BufferAttribute(built.water.nor, 3));
			geo.setAttribute("color", new BufferAttribute(built.water.col, 3));
			entry.water = new Mesh(geo, this.waterMat);
			this.scene.add(entry.water);
		}
		this.chunks.set(key, entry);
	}
	stream(game) {
		const pcx = chunkOf(Math.floor(game.x));
		const pcz = chunkOf(Math.floor(game.z));
		let best = null;
		for (let cx = pcx - RADIUS; cx <= pcx + RADIUS; cx++) for (let cz = pcz - RADIUS; cz <= pcz + RADIUS; cz++) {
			const key = chunkKey(cx, cz);
			const has = this.chunks.has(key);
			const dirty = game.world.dirty.has(key);
			if (has && !dirty) continue;
			const d = (cx - pcx) ** 2 + (cz - pcz) ** 2;
			if (!best || d < best.d) best = {
				key,
				cx,
				cz,
				d
			};
		}
		if (best) {
			this.rebuild(best.key, best.cx, best.cz, game.world);
			game.world.dirty.delete(best.key);
		}
		for (const key of this.chunks.keys()) {
			const [cx, cz] = key.split(",").map(Number);
			if (Math.abs(cx - pcx) > 4 || Math.abs(cz - pcz) > 4) {
				const entry = this.chunks.get(key);
				entry?.solid?.geometry.dispose();
				entry?.water?.geometry.dispose();
				if (entry?.solid) this.scene.remove(entry.solid);
				if (entry?.water) this.scene.remove(entry.water);
				this.chunks.delete(key);
			}
		}
	}
	get meshed() {
		return this.chunks.size > 0;
	}
	sync(game, dt) {
		this.stream(game);
		const bob = game.onGround && Math.hypot(game.vx, game.vz) > 1.2 ? Math.sin(performance.now() / 140) * .035 : 0;
		this.camera.position.set(game.x, game.y + EYE + bob, game.z);
		if (game.invuln > .45) {
			this.camera.position.x += (Math.random() - .5) * .05;
			this.camera.position.y += (Math.random() - .5) * .04;
		}
		const targetFov = game.sprinting ? 78 : 72;
		if (Math.abs(this.camera.fov - targetFov) > .15) {
			this.camera.fov += (targetFov - this.camera.fov) * Math.min(1, dt * 5);
			this.camera.updateProjectionMatrix();
		}
		this.camera.rotation.y = game.yaw;
		this.camera.rotation.x = game.pitch;
		const swing = game.swing > 0 ? Math.sin((.4 - game.swing) * 16) * .45 : 0;
		this.hand.rotation.x = -.55 + swing;
		this.hand.position.z = -.58 - Math.max(0, swing) * .08;
		const held = game.slots[game.selected];
		this.handMat.color.set(held ? itemColor(held.id) : "#e7c2a4");
		this.hand.visible = game.mode === "play";
		if (game.aim && game.mode === "play") {
			this.highlight.visible = true;
			this.highlight.position.set(game.aim.x + .5, game.aim.y + .5, game.aim.z + .5);
			this.highlight.material.color.set(game.mine.on ? "#e8943a" : "#fffaf2");
		} else this.highlight.visible = false;
		this.paintSky(game);
		this.paintMobs(game);
		this.paintDrops(game);
		this.paintParticles(game);
		this.paintAvatars(game);
		this.paintLights(game, dt);
		this.renderer.render(this.scene, this.camera);
	}
	paintSky(game) {
		const u = game.phase();
		const underwater = game.eyeInWater();
		if (underwater) this.sky.set("#1c6ea3");
		else if (u < .08) this.sky.copy(this.night).lerp(this.dawn, u / .08);
		else if (u < .18) this.sky.copy(this.dawn).lerp(this.day, (u - .08) / .1);
		else if (u < .48) this.sky.copy(this.day);
		else if (u < .62) this.sky.copy(this.day).lerp(this.dusk, (u - .48) / .14);
		else if (u < .75) this.sky.copy(this.dusk).lerp(this.night, (u - .62) / .13);
		else if (u < .92) this.sky.copy(this.night);
		else this.sky.copy(this.night).lerp(this.dawn, (u - .92) / .08);
		this.renderer.setClearColor(this.sky, 1);
		const fog = this.scene.fog;
		fog.color.copy(this.sky);
		fog.near = underwater ? .4 : 18;
		fog.far = underwater ? 16 : 58;
		const dayF = underwater ? .45 : game.dayFactor();
		this.hemi.intensity = .25 + dayF * .6;
		this.hemi.color.copy(this.sky);
		this.sun.intensity = .08 + dayF * 1.15;
		this.sun.color.set(dayF > .5 ? "#fff2d4" : "#9bb4d6");
		const ang = u * Math.PI * 2;
		this.sun.position.set(Math.cos(ang) * 40, Math.sin(ang) * 36 + 8, 18);
		this.sunBall.position.copy(this.camera.position).addScaledVector(this.sun.position.clone().normalize(), 80);
		this.stars.material.opacity = underwater ? 0 : Math.max(0, 1 - dayF * 1.3);
		this.stars.position.copy(this.camera.position);
		this.clouds.position.set(this.camera.position.x + Math.sin(u * 8) * 6, 48, this.camera.position.z);
		this.clouds.visible = !underwater && dayF > .28;
	}
	paintMobs(game) {
		const n = Math.min(12, game.mobs.length);
		this.mobMesh.count = n;
		for (let i = 0; i < n; i++) {
			const m = game.mobs[i];
			const beetle = m.kind === "beetle";
			const squash = 1 + Math.sin(performance.now() / 160 + m.id) * .06;
			this.dummy.position.set(m.x, m.y + (beetle ? .22 : .38) * squash, m.z);
			this.dummy.scale.set(beetle ? .7 : 1, (beetle ? .48 : 1) * squash, beetle ? .95 : 1);
			this.dummy.rotation.set(0, 0, 0);
			this.dummy.updateMatrix();
			this.mobMesh.setMatrixAt(i, this.dummy.matrix);
			this.mobColor.set(beetle ? "#3ec2c8" : "#6fbf48");
			this.mobMesh.setColorAt(i, this.mobColor);
		}
		this.dummy.scale.set(1, 1, 1);
		this.mobMesh.instanceMatrix.needsUpdate = true;
		if (this.mobMesh.instanceColor) this.mobMesh.instanceColor.needsUpdate = true;
	}
	paintDrops(game) {
		const n = Math.min(48, game.drops.length);
		this.dropMesh.count = n;
		for (let i = 0; i < n; i++) {
			const d = game.drops[i];
			this.dummy.position.set(d.x, d.y + .12, d.z);
			this.dummy.rotation.set(0, d.age, 0);
			this.dummy.scale.set(1, 1, 1);
			this.dummy.updateMatrix();
			this.dropMesh.setMatrixAt(i, this.dummy.matrix);
			this.dropColor.set(itemColor(d.id));
			this.dropMesh.setColorAt(i, this.dropColor);
		}
		this.dropMesh.instanceMatrix.needsUpdate = true;
		if (this.dropMesh.instanceColor) this.dropMesh.instanceColor.needsUpdate = true;
	}
	paintParticles(game) {
		const n = Math.min(160, game.particles.length);
		const c = new Color();
		for (let i = 0; i < n; i++) {
			const p = game.particles[i];
			this.pointPos[i * 3] = p.x;
			this.pointPos[i * 3 + 1] = p.y;
			this.pointPos[i * 3 + 2] = p.z;
			c.set(p.color);
			this.pointCol[i * 3] = c.r;
			this.pointCol[i * 3 + 1] = c.g;
			this.pointCol[i * 3 + 2] = c.b;
		}
		const pos = this.points.geometry.getAttribute("position");
		const col = this.points.geometry.getAttribute("color");
		pos.needsUpdate = true;
		col.needsUpdate = true;
		this.points.geometry.setDrawRange(0, n);
	}
	paintAvatars(game) {
		const list = [...game.remotes.values()];
		for (let i = 0; i < this.avatars.length; i++) {
			const g = this.avatars[i];
			const r = list[i];
			if (!r) {
				g.visible = false;
				continue;
			}
			g.visible = true;
			g.position.set(r.x, r.y, r.z);
			g.rotation.y = r.yaw + Math.PI;
		}
		this.paintLabels(game, list);
	}
	paintLabels(game, list) {
		const root = this.labelRoot;
		if (!root) return;
		const w = this.renderer.domElement.clientWidth;
		const h = this.renderer.domElement.clientHeight;
		while (root.children.length < list.length) {
			const el = document.createElement("div");
			el.className = "name-tag";
			root.appendChild(el);
		}
		for (let i = 0; i < root.children.length; i++) {
			const el = root.children[i];
			const r = list[i];
			if (!r) {
				el.style.display = "none";
				continue;
			}
			const v = new Vector3(r.x, r.y + 2.05, r.z).project(this.camera);
			if (v.z > 1) {
				el.style.display = "none";
				continue;
			}
			el.style.display = "block";
			el.style.transform = `translate(${(v.x * .5 + .5) * w}px, ${(-v.y * .5 + .5) * h}px) translate(-50%, -100%)`;
			el.textContent = r.name || "Bạn";
		}
	}
	paintLights(game, dt) {
		this.lightScan -= dt;
		if (this.lightScan <= 0) {
			this.lightScan = .35;
			this.torchPos.length = 0;
			const px = game.x;
			const py = game.y;
			const pz = game.z;
			const found = [];
			const consider = (x, y, z, id) => {
				if (id !== B.torch && id !== B.lamp && id !== B.heart) return;
				const d = (x + .5 - px) ** 2 + (y + .5 - py) ** 2 + (z + .5 - pz) ** 2;
				if (d < 676) found.push({
					d,
					x,
					y,
					z
				});
			};
			for (const [k, id] of game.world.mods) {
				const [xs, ys, zs] = k.split(",");
				consider(Number(xs), Number(ys), Number(zs), id);
			}
			const ix = Math.floor(px);
			const iy = Math.floor(py);
			const iz = Math.floor(pz);
			for (let x = ix - 10; x <= ix + 10; x++) for (let z = iz - 10; z <= iz + 10; z++) {
				if (!game.world.columns.has(chunkKey(chunkOf(x), chunkOf(z)))) continue;
				for (let y = iy - 6; y <= iy + 6; y++) consider(x, y, z, game.world.get(x, y, z));
			}
			found.sort((a, b) => a.d - b.d);
			for (const f of found.slice(0, this.lights.length)) this.torchPos.push(new Vector3(f.x + .5, f.y + .6, f.z + .5));
		}
		for (let i = 0; i < this.lights.length; i++) {
			const l = this.lights[i];
			const p = this.torchPos[i];
			if (!p) {
				l.intensity = 0;
				continue;
			}
			l.position.copy(p);
			l.intensity = 2.1;
		}
	}
	dispose() {
		for (const entry of this.chunks.values()) {
			entry.solid?.geometry.dispose();
			entry.water?.geometry.dispose();
		}
		this.chunks.clear();
		this.cloudMat.dispose();
		this.solidMat.dispose();
		this.waterMat.dispose();
		this.handMat.dispose();
		this.renderer.dispose();
	}
};
var FAST_POLL_MS = 400;
var IDLE_POLL_MS = 2e3;
var PING_INTERVAL_MS = 2e3;
var STALL_MS = 1e4;
var MAX_RECOVERY_ATTEMPTS = 3;
var SIGNAL_RETRY_DELAYS_MS = [250, 750];
function defaultIceServers() {
	return [{ urls: ["stun:stun.l.google.com:19302", "stun:stun.cloudflare.com:3478"] }];
}
var P2PRoom = class {
	opts;
	peers = /* @__PURE__ */ new Map();
	/** Per-remote-peer signal delivery chains (order-preserving). */
	signalQueues = /* @__PURE__ */ new Map();
	cursor = 0;
	pollTimer = null;
	pingTimer = null;
	closed = false;
	everPolled = false;
	lastPeersFingerprint = "";
	constructor(opts) {
		this.opts = opts;
	}
	/**
	* The first poll IS the join: it registers this peer and returns the
	* roster. A failed first poll (cold DB, offline tab) must not strand the
	* room: the loop and timers start regardless and the next poll retries.
	*/
	async join() {
		try {
			await this.pollOnce();
		} catch {}
		if (this.closed) return;
		this.schedulePoll(this.anyPairConnecting() ? FAST_POLL_MS : IDLE_POLL_MS);
		this.pingTimer = setInterval(() => {
			this.pingAll();
			this.watchdog();
		}, PING_INTERVAL_MS);
	}
	close() {
		this.closed = true;
		if (this.pollTimer) clearTimeout(this.pollTimer);
		if (this.pingTimer) clearInterval(this.pingTimer);
		for (const slot of this.peers.values()) slot.pc.close();
		this.peers.clear();
		fetch("/api/rtc", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				op: "leave",
				room: this.opts.room,
				peer: this.opts.selfId
			}),
			keepalive: true
		}).catch(() => {});
	}
	/** Send on the unreliable game-state channel (drops stale packets). */
	broadcast(data) {
		const wire = JSON.stringify({
			t: "d",
			d: data
		});
		for (const slot of this.peers.values()) if (slot.state?.readyState === "open") slot.state.send(wire);
	}
	/** Send reliably (ordered) to one peer, or to all when peerId is omitted. */
	send(data, peerId) {
		const wire = JSON.stringify({
			t: "d",
			d: data
		});
		const targets = peerId ? [this.peers.get(peerId)] : [...this.peers.values()];
		for (const slot of targets) if (slot?.reliable?.readyState === "open") slot.reliable.send(wire);
	}
	peerList() {
		return [...this.peers.values()].map((s) => ({ ...s.info }));
	}
	schedulePoll(delay) {
		if (this.closed) return;
		if (this.pollTimer) clearTimeout(this.pollTimer);
		this.pollTimer = setTimeout(() => void this.poll(), delay);
	}
	anyPairConnecting() {
		for (const s of this.peers.values()) {
			if (s.terminal) continue;
			if (s.info.connectionState !== "connected") return true;
		}
		return false;
	}
	async pollOnce() {
		const params = new URLSearchParams({
			room: this.opts.room,
			peer: this.opts.selfId,
			name: this.opts.name ?? "",
			since: String(this.cursor)
		});
		const res = await fetch(`/api/rtc?${params}`);
		if (this.closed) return;
		if (!res.ok) throw new Error(`signaling poll failed: ${res.status}`);
		const body = await res.json();
		if (this.closed) return;
		if (!this.everPolled) {
			this.everPolled = true;
			this.opts.onConnected?.();
		}
		this.reconcileRoster(body.peers);
		const roster = new Set(body.peers.map((p) => p.id));
		for (const sig of body.signals) {
			this.cursor = Math.max(this.cursor, sig.id);
			await this.onSignal(sig.from, sig.kind, sig.payload, roster);
			if (this.closed) return;
		}
	}
	async poll() {
		if (this.closed) return;
		try {
			await this.pollOnce();
		} catch {}
		this.schedulePoll(this.anyPairConnecting() ? FAST_POLL_MS : IDLE_POLL_MS);
	}
	reconcileRoster(peers) {
		const alive = new Set(peers.map((p) => p.id));
		for (const p of peers) {
			if (p.id === this.opts.selfId) continue;
			const existing = this.peers.get(p.id);
			if (existing) existing.info.name = p.name;
			else this.connectTo(p.id, p.name, this.opts.selfId > p.id);
		}
		for (const [id, slot] of this.peers) if (!alive.has(id)) {
			slot.pc.close();
			this.peers.delete(id);
		}
		this.emitPeers();
	}
	connectTo(peerId, name, initiator) {
		if (this.closed) return null;
		const pc = new RTCPeerConnection({ iceServers: this.opts.iceServers ?? defaultIceServers() });
		const slot = {
			pc,
			makingOffer: false,
			ignoreOffer: false,
			pendingCandidates: [],
			lastProgressAt: Date.now(),
			recoveryAttempts: 0,
			info: {
				id: peerId,
				name,
				connectionState: pc.connectionState,
				candidateType: null,
				rttMs: null
			}
		};
		this.peers.set(peerId, slot);
		pc.onicecandidate = (e) => {
			if (e.candidate) this.sendSignal(peerId, "ice", e.candidate.toJSON());
		};
		pc.onconnectionstatechange = () => {
			slot.info.connectionState = pc.connectionState;
			if (pc.connectionState === "connecting" || pc.connectionState === "connected") slot.lastProgressAt = Date.now();
			if (pc.connectionState === "connected") {
				slot.recoveryAttempts = 0;
				slot.terminal = false;
				this.readCandidateType(slot);
			}
			this.emitPeers();
			if (pc.connectionState === "failed") pc.restartIce();
			if (pc.connectionState === "failed" || pc.connectionState === "disconnected") this.schedulePoll(FAST_POLL_MS);
		};
		pc.onnegotiationneeded = async () => {
			try {
				slot.makingOffer = true;
				await pc.setLocalDescription();
				await this.sendSignal(peerId, "offer", pc.localDescription.toJSON());
			} catch {} finally {
				slot.makingOffer = false;
			}
		};
		pc.ondatachannel = (e) => this.attachChannel(slot, e.channel);
		if (initiator) {
			this.attachChannel(slot, pc.createDataChannel("state", {
				ordered: false,
				maxRetransmits: 0
			}));
			this.attachChannel(slot, pc.createDataChannel("reliable", { ordered: true }));
		}
		return slot;
	}
	attachChannel(slot, channel) {
		if (channel.label === "state") slot.state = channel;
		else slot.reliable = channel;
		channel.onopen = () => {
			slot.lastProgressAt = Date.now();
		};
		channel.onmessage = (e) => {
			let msg;
			try {
				msg = JSON.parse(e.data);
			} catch {
				return;
			}
			if (msg.t === "ping") {
				if (slot.state?.readyState === "open") slot.state.send(JSON.stringify({ t: "pong" }));
			} else if (msg.t === "pong") {
				if (slot.pingSentAt) {
					slot.info.rttMs = Math.round(performance.now() - slot.pingSentAt);
					slot.pingSentAt = void 0;
					this.emitPeers();
				}
			} else this.opts.onMessage?.(slot.info.id, msg.d, channel.label === "state" ? "state" : "reliable");
		};
	}
	/** Apply buffered ICE candidates once a remote description is in place. */
	async flushPendingCandidates(slot) {
		while (slot.pendingCandidates.length > 0) {
			const candidate = slot.pendingCandidates.shift();
			try {
				await slot.pc.addIceCandidate(candidate);
			} catch (err) {
				if (!slot.ignoreOffer) console.warn("[p2p] addIceCandidate failed:", err);
			}
			if (this.closed) return;
		}
	}
	async onSignal(from, kind, payload, roster) {
		if (this.closed) return;
		let slot = this.peers.get(from);
		if (!slot) {
			if (!roster.has(from)) return;
			const created = this.connectTo(from, "", false);
			if (!created) return;
			slot = created;
		}
		const polite = this.opts.selfId < from;
		try {
			if (kind === "offer" || kind === "answer") {
				const description = payload;
				const collision = kind === "offer" && (slot.makingOffer || slot.pc.signalingState !== "stable");
				slot.ignoreOffer = !polite && collision;
				if (slot.ignoreOffer) return;
				try {
					await slot.pc.setRemoteDescription(description);
				} catch (err) {
					if (kind !== "offer" || slot.recreatedForOffer) throw err;
					const attempts = slot.recoveryAttempts;
					const name = slot.info.name;
					slot.pc.close();
					this.peers.delete(from);
					const fresh = this.connectTo(from, name, false);
					if (!fresh) return;
					fresh.recoveryAttempts = attempts;
					fresh.recreatedForOffer = true;
					slot = fresh;
					await slot.pc.setRemoteDescription(description);
				}
				if (this.closed) return;
				await this.flushPendingCandidates(slot);
				if (this.closed) return;
				if (kind === "offer") {
					await slot.pc.setLocalDescription();
					if (this.closed) return;
					await this.sendSignal(from, "answer", slot.pc.localDescription.toJSON());
				}
			} else if (kind === "ice") {
				const candidate = payload;
				if (!slot.pc.remoteDescription) {
					slot.pendingCandidates.push(candidate);
					return;
				}
				try {
					await slot.pc.addIceCandidate(candidate);
				} catch (err) {
					if (!slot.ignoreOffer) console.warn("[p2p] addIceCandidate failed:", err);
				}
			}
		} catch {}
	}
	/**
	* Signals are serialized per remote peer (a candidate must never overtake
	* its SDP into the DB) and retried on failure with short backoff.
	*/
	sendSignal(to, kind, payload) {
		const next = (this.signalQueues.get(to) ?? Promise.resolve()).then(() => this.postSignal(to, kind, payload));
		this.signalQueues.set(to, next.catch(() => {}));
		return next;
	}
	async postSignal(to, kind, payload) {
		for (let attempt = 0;; attempt++) {
			if (this.closed) return;
			try {
				const res = await fetch("/api/rtc", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						op: "signal",
						room: this.opts.room,
						from: this.opts.selfId,
						to,
						kind,
						payload
					})
				});
				if (res.ok) return;
				throw new Error(`signal POST failed: ${res.status}`);
			} catch (err) {
				if (attempt >= SIGNAL_RETRY_DELAYS_MS.length) {
					console.warn(`[p2p] signal ${kind} to ${to} failed after retries`, err);
					return;
				}
				await new Promise((r) => setTimeout(r, SIGNAL_RETRY_DELAYS_MS[attempt]));
			}
		}
	}
	pingAll() {
		const wire = JSON.stringify({ t: "ping" });
		for (const slot of this.peers.values()) {
			if (slot.state?.readyState !== "open") continue;
			const stale = slot.pingSentAt !== void 0 && performance.now() - slot.pingSentAt > 2 * PING_INTERVAL_MS;
			if (slot.pingSentAt === void 0 || stale) {
				slot.pingSentAt = performance.now();
				slot.state.send(wire);
			}
		}
	}
	/**
	* Stuck-pair recovery, piggybacked on the ping interval. A pair that has
	* made no progress for STALL_MS gets rebuilt by the dialer with a FRESH
	* RTCPeerConnection (new DTLS identity — fixes the suspend/resume
	* fingerprint wedge). After MAX_RECOVERY_ATTEMPTS the pair is terminal:
	* visible to the app as its last connectionState, ignored by fast-poll.
	*/
	watchdog() {
		if (this.closed) return;
		const now = Date.now();
		for (const [peerId, slot] of this.peers) {
			const live = slot.pc.connectionState;
			if (live !== slot.info.connectionState) {
				slot.info.connectionState = live;
				if (live === "connecting" || live === "connected") slot.lastProgressAt = now;
				this.emitPeers();
			}
			if (slot.terminal || live === "connected") continue;
			if (now - slot.lastProgressAt <= STALL_MS) continue;
			if (slot.recoveryAttempts >= MAX_RECOVERY_ATTEMPTS) {
				slot.terminal = true;
				this.emitPeers();
				continue;
			}
			slot.recoveryAttempts += 1;
			slot.lastProgressAt = now;
			if (this.opts.selfId > peerId) {
				const { name } = slot.info;
				const attempts = slot.recoveryAttempts;
				slot.pc.close();
				this.peers.delete(peerId);
				const fresh = this.connectTo(peerId, name, true);
				if (fresh) fresh.recoveryAttempts = attempts;
				this.schedulePoll(FAST_POLL_MS);
			}
		}
	}
	async readCandidateType(slot) {
		try {
			const stats = await slot.pc.getStats();
			let selected;
			stats.forEach((s) => {
				if (s.type === "candidate-pair" && s.nominated) selected = s;
			});
			const localId = selected?.localCandidateId;
			if (localId) {
				const local = stats.get(localId);
				slot.info.candidateType = local?.candidateType ?? null;
				this.emitPeers();
			}
		} catch {}
	}
	emitPeers() {
		const list = this.peerList();
		const fingerprint = JSON.stringify(list.map((p) => [
			p.id,
			p.name,
			p.connectionState,
			p.candidateType,
			p.rttMs
		]));
		if (fingerprint === this.lastPeersFingerprint) return;
		this.lastPeersFingerprint = fingerprint;
		this.opts.onPeersChanged?.(list);
	}
};
/**
* React binding for P2PRoom. Identity and room id are captured once on mount
* so re-renders never tear down the mesh. Changing room/name needs a remount.
*/
function defaultRoom() {
	if (typeof window === "undefined") return "room-ssr";
	return `room-${window.location.hostname.split(".")[0]}`.slice(0, 64);
}
function useP2PRoom(options = {}) {
	const [selfId] = (0, import_react.useState)(() => `p-${Math.random().toString(36).slice(2, 10)}`);
	const [room] = (0, import_react.useState)(() => options.room ?? defaultRoom());
	const [name] = (0, import_react.useState)(() => options.name ?? selfId);
	const [peers, setPeers] = (0, import_react.useState)([]);
	const [joined, setJoined] = (0, import_react.useState)(false);
	const roomRef = (0, import_react.useRef)(null);
	const listeners = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		const p2p = new P2PRoom({
			room,
			selfId,
			name,
			onPeersChanged: setPeers,
			onMessage: (from, data, channel) => {
				for (const fn of listeners.current) fn(from, data, channel);
			},
			onConnected: () => setJoined(true)
		});
		roomRef.current = p2p;
		p2p.join();
		return () => {
			roomRef.current = null;
			p2p.close();
		};
	}, [
		room,
		selfId,
		name
	]);
	return {
		selfId,
		room,
		peers,
		joined,
		broadcast: (0, import_react.useCallback)((data) => roomRef.current?.broadcast(data), []),
		send: (0, import_react.useCallback)((data, peerId) => roomRef.current?.send(data, peerId), []),
		onMessage: (0, import_react.useCallback)((fn) => {
			listeners.current.add(fn);
			return () => {
				listeners.current.delete(fn);
			};
		}, [])
	};
}
function Playfield({ launch, onQuit }) {
	if (launch.role === "solo") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arena, {
		launch,
		net: null,
		onQuit
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Online, {
		launch,
		onQuit
	});
}
function Online({ launch, onQuit }) {
	const net = useP2PRoom({
		room: launch.room,
		name: launch.name
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arena, {
		launch,
		net,
		onQuit
	});
}
function isRecord(v) {
	return !!v && typeof v === "object";
}
function round(n) {
	return Math.round(n * 100) / 100;
}
function Arena({ launch, net, onQuit }) {
	const canvasRef = (0, import_react.useRef)(null);
	const labelsRef = (0, import_react.useRef)(null);
	const gameRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const netRef = (0, import_react.useRef)(net);
	netRef.current = net;
	const publishRef = (0, import_react.useRef)(() => {});
	const stopRef = (0, import_react.useRef)(null);
	const greeted = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const syncBuf = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const pending = (0, import_react.useRef)([]);
	const timeSent = (0, import_react.useRef)(0);
	const [tick, setTick] = (0, import_react.useState)(0);
	const [touch, setTouch] = (0, import_react.useState)(false);
	const [locked, setLocked] = (0, import_react.useState)(false);
	const [sfxOn, setSfxOn] = (0, import_react.useState)(true);
	const [booting, setBooting] = (0, import_react.useState)(launch.role === "guest");
	const [waited, setWaited] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [meshed, setMeshed] = (0, import_react.useState)(false);
	const coordRef = (0, import_react.useRef)(null);
	const aimRef = (0, import_react.useRef)(null);
	const mineRef = (0, import_react.useRef)(null);
	const hungerRef = (0, import_react.useRef)(null);
	const needleRef = (0, import_react.useRef)(null);
	const distRef = (0, import_react.useRef)(null);
	const goalRef = (0, import_react.useRef)(null);
	const stickRef = (0, import_react.useRef)(null);
	const lookLast = (0, import_react.useRef)({
		id: -1,
		x: 0,
		y: 0
	});
	publishRef.current = () => {
		const g = gameRef.current;
		const n = netRef.current;
		if (!g || !n) return;
		n.broadcast({
			t: "p",
			x: round(g.x),
			y: round(g.y),
			z: round(g.z),
			yaw: round(g.yaw),
			hp: g.hp,
			name: g.playerName
		});
		if (launch.role === "host" && performance.now() - timeSent.current > 2e3) {
			timeSent.current = performance.now();
			n.broadcast({
				t: "time",
				time: g.time
			});
		}
	};
	function start(save, seed, mods, time) {
		const canvas = canvasRef.current;
		if (!canvas || gameRef.current) return;
		const audio = new AudioBus(loadSfx());
		audio.unlock();
		const input = new Input();
		input.attach(canvas);
		inputRef.current = input;
		let view;
		try {
			view = new WorldView(canvas);
			view.labelRoot = labelsRef.current;
		} catch {
			input.destroy();
			setError("Máy này không mở được đồ họa 3D.");
			return;
		}
		const game = new Game(audio, input, save, seed, mods);
		if (typeof time === "number") game.applyTime(time, true);
		game.playerName = launch.name;
		game.persist = launch.role !== "guest";
		if (netRef.current) {
			game.onEdit = (e) => netRef.current?.send({
				t: "b",
				...e
			});
			game.onTime = (t, force) => netRef.current?.send({
				t: "time",
				time: t,
				force
			});
			game.onWin = (who) => netRef.current?.send({
				t: "win",
				name: who
			});
			game.onChest = (key, slots) => netRef.current?.send({
				t: "chest",
				key,
				slots
			});
		}
		for (const item of pending.current) applyNet(game, item.from, item.data);
		pending.current = [];
		gameRef.current = game;
		setBooting(false);
		setTick((n) => n + 1);
		let alive = true;
		const stopLoop = runLoop(canvas, game, view, () => {
			if (alive) setTick((n) => n + 1);
		}, (ready) => {
			if (alive) setMeshed(ready);
		}, coordRef, aimRef, mineRef, hungerRef, needleRef, distRef, goalRef, () => publishRef.current());
		stopRef.current = () => {
			alive = false;
			stopLoop();
			game.save();
			game.detachProbe();
			input.destroy();
			view.dispose();
			gameRef.current = null;
			inputRef.current = null;
		};
	}
	(0, import_react.useEffect)(() => {
		setSfxOn(loadSfx());
		const coarse = window.matchMedia("(pointer: coarse)");
		const update = () => setTouch(coarse.matches || window.innerWidth < 860);
		update();
		coarse.addEventListener("change", update);
		window.addEventListener("resize", update);
		const lock = () => setLocked(document.pointerLockElement === canvasRef.current);
		document.addEventListener("pointerlockchange", lock);
		return () => {
			coarse.removeEventListener("change", update);
			window.removeEventListener("resize", update);
			document.removeEventListener("pointerlockchange", lock);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (launch.role === "guest") return;
		const save = launch.fresh ? null : loadSave();
		if (!launch.fresh && !save) {
			setError("Không thấy bản lưu.");
			return;
		}
		start(save, hashSeed(launch.seedText || String(Date.now() % 1e5)));
		const hide = () => {
			if (document.hidden) gameRef.current?.save();
		};
		document.addEventListener("visibilitychange", hide);
		return () => {
			document.removeEventListener("visibilitychange", hide);
			stopRef.current?.();
			stopRef.current = null;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (launch.role !== "guest") return;
		const t = window.setTimeout(() => setWaited(true), 12e3);
		return () => window.clearTimeout(t);
	}, [launch.role]);
	(0, import_react.useEffect)(() => {
		if (!net) return;
		return net.onMessage((from, data) => {
			if (!isRecord(data) || typeof data.t !== "string") return;
			if (data.t === "sync") {
				const seed = data.seed;
				const part = data.part;
				const parts = data.parts;
				const mods = data.mods;
				const time = data.time;
				if (typeof seed !== "number" || typeof part !== "number" || typeof parts !== "number" || !Array.isArray(mods)) return;
				if (gameRef.current) return;
				syncBuf.current.set(part, mods);
				if (syncBuf.current.size < parts) return;
				const all = [];
				for (let i = 0; i < parts; i++) all.push(...syncBuf.current.get(i) ?? []);
				start(null, seed, all, typeof time === "number" ? time : 40);
				return;
			}
			const game = gameRef.current;
			if (!game) {
				pending.current.push({
					from,
					data
				});
				return;
			}
			applyNet(game, from, data);
		});
	}, [net?.onMessage]);
	(0, import_react.useEffect)(() => {
		return () => {
			stopRef.current?.();
			stopRef.current = null;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const game = gameRef.current;
		const link = netRef.current;
		if (!link || !game) return;
		for (const peer of link.peers) {
			if (greeted.current.has(peer.id)) continue;
			greeted.current.add(peer.id);
			const ids = [link.selfId, ...link.peers.map((p) => p.id).filter((id) => id !== peer.id)];
			ids.sort();
			if (ids[0] !== link.selfId) continue;
			for (const part of syncParts(game)) link.send(part, peer.id);
			for (const [key, slots] of game.chests) link.send({
				t: "chest",
				key,
				slots
			}, peer.id);
		}
		for (const id of [...game.remotes.keys()]) if (!link.peers.some((p) => p.id === id)) game.dropRemote(id);
	}, [net?.peers, tick]);
	const game = gameRef.current;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "game-root",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "game-canvas",
				onClick: () => {
					const g = gameRef.current;
					if (!g || touch || g.mode !== "play") return;
					canvasRef.current?.requestPointerLock();
				},
				onPointerDown: (e) => {
					gameRef.current?.sfx.unlock();
					if (e.pointerType === "mouse") return;
					lookLast.current = {
						id: e.pointerId,
						x: e.clientX,
						y: e.clientY
					};
				},
				onPointerMove: (e) => {
					if (e.pointerType === "mouse") return;
					const last = lookLast.current;
					if (last.id !== e.pointerId) return;
					inputRef.current?.addLook((e.clientX - last.x) * 1.7, (e.clientY - last.y) * 1.7);
					lookLast.current = {
						id: e.pointerId,
						x: e.clientX,
						y: e.clientY
					};
				},
				onPointerUp: () => {
					lookLast.current = {
						id: -1,
						x: 0,
						y: 0
					};
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "name-tags",
				ref: labelsRef
			}),
			game && game.mode === "play" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cross" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hud-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hearts",
						"aria-label": "Máu",
						children: Array.from({ length: 10 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: game && game.hp > i ? "pip on" : "pip" }, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hunger",
						"aria-label": "Đói",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { ref: hungerRef })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "day-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "day-chip",
								children: game?.dayLabel ?? "Đang vào khe"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "compass",
								"aria-label": "Hướng tới Tim khe",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { ref: needleRef })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "dist",
								ref: distRef
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "objective",
						ref: goalRef
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { textAlign: "right" },
					children: [launch.role !== "solo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "room-chip",
						children: ["Phòng ", launch.room.replace("khe-", "")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "coord-chip",
						style: { marginTop: "0.35rem" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							ref: coordRef,
							children: "0 0 0"
						}), net && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" · ", net.joined ? `${net.peers.length + 1} người` : "đang nối"] })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "icon-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-icon",
						"aria-label": "Túi đồ",
						onClick: () => openInv(game),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backpack, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-icon",
						"aria-label": sfxOn ? "Tắt tiếng" : "Bật tiếng",
						onClick: () => {
							const next = !sfxOn;
							setSfxOn(next);
							writeSfx(next);
							if (game) game.sfx.on = next;
						},
						children: sfxOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-icon",
						"aria-label": "Tạm dừng",
						onClick: () => openPause(game),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { size: 18 })
					})
				]
			}),
			game && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hud-bottom",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aim-name",
						ref: aimRef
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mine-track",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { ref: mineRef })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "held-name",
						children: game.slots[game.selected] ? itemName(game.slots[game.selected].id) : "Tay không"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hotbar",
						children: game.slots.slice(0, 9).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: i === game.selected ? "slot on" : "slot",
							onClick: () => {
								game.selected = i;
								game.bump();
								setTick((n) => n + 1);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotFace, { stack: s })
						}, i))
					})
				]
			}),
			game?.toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "toast",
				children: game.toast
			}),
			game && game.mode === "play" && !touch && !locked && meshed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lock-hint",
				children: "Bấm để nhìn quanh"
			}),
			(booting || game && !meshed) && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "boot-note",
				children: waited && booting ? "Chưa thấy chủ phòng. Giữ đúng mã và bảo họ đứng trong khe." : "Đang dựng đất đá..."
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sheet",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Chưa vào được" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn-primary",
							onClick: onQuit,
							children: "Về tiêu đề"
						})
					]
				})
			}),
			game && game.mode !== "play" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
				game,
				onQuit,
				onChange: () => setTick((n) => n + 1)
			}),
			touch && game && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "touch-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stick, {
					knobRef: stickRef,
					onChange: (x, y) => {
						const input = inputRef.current;
						if (!input) return;
						input.joyX = x;
						input.joyY = y;
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "touch-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "touch-btn",
							onPointerDown: () => inputRef.current && (inputRef.current.jumpHeld = true),
							onPointerUp: () => inputRef.current && (inputRef.current.jumpHeld = false),
							onPointerLeave: () => inputRef.current && (inputRef.current.jumpHeld = false),
							children: "Nhảy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "touch-btn primary",
							onPointerDown: () => inputRef.current?.setMine(true),
							onPointerUp: () => inputRef.current?.setMine(false),
							onPointerLeave: () => inputRef.current?.setMine(false),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pickaxe, { size: 18 }), " Đào"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "touch-btn",
							onPointerDown: () => inputRef.current?.setPlace(true),
							onPointerUp: () => inputRef.current?.setPlace(false),
							onPointerLeave: () => inputRef.current?.setPlace(false),
							children: "Đặt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "touch-btn",
							onClick: () => openInv(game),
							children: "Túi"
						})
					]
				})]
			})
		]
	});
}
function Stick({ knobRef, onChange }) {
	function set(e) {
		const r = e.currentTarget.getBoundingClientRect();
		let x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
		let y = (r.top + r.height / 2 - e.clientY) / (r.height / 2);
		const l = Math.hypot(x, y) || 1;
		if (l > 1) {
			x /= l;
			y /= l;
		}
		onChange(x, y);
		if (knobRef.current) knobRef.current.style.transform = `translate(calc(-50% + ${x * 28}px), calc(-50% + ${-y * 28}px))`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "stick",
		onPointerDown: (e) => {
			e.currentTarget.setPointerCapture(e.pointerId);
			set(e);
		},
		onPointerMove: (e) => {
			if (e.currentTarget.hasPointerCapture(e.pointerId)) set(e);
		},
		onPointerUp: () => {
			onChange(0, 0);
			if (knobRef.current) knobRef.current.style.transform = "translate(-50%, -50%)";
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { ref: knobRef })
	});
}
function SlotFace({ stack }) {
	if (!stack) return null;
	const max = isTool(stack.id) ? toolInfo(stack.id).dura : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
			className: "swatch",
			style: { background: itemColor(stack.id) }
		}),
		itemMark(stack.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mark",
			children: itemMark(stack.id)
		}),
		stack.n > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "count",
			children: stack.n
		}),
		max > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
			className: "dura",
			style: { transform: `scaleX(${Math.max(0, stack.dura) / max})` }
		})
	] });
}
function Menu({ game, onQuit, onChange }) {
	if (game.mode === "dead") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Bạn đã gục" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Giường nhớ chỗ tỉnh lại. Không có giường thì về bãi cỏ đầu tiên." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-primary",
					onClick: () => {
						game.respawn();
						onChange();
					},
					children: "Tỉnh lại"
				})
			]
		})
	});
	if (game.mode === "won") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Tim khe đã vỡ" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ánh sáng tràn ra khỏi đá. Khe vẫn còn đó nếu bạn muốn xây tiếp." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary",
						onClick: () => {
							game.mode = "play";
							game.bump();
							onChange();
						},
						children: "Ở lại"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-ghost",
						onClick: onQuit,
						children: "Về tiêu đề"
					})]
				})
			]
		})
	});
	if (game.mode === "pause" || game.mode === "help") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: game.mode === "help" ? "Cách chơi" : "Tạm dừng" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "W A S D đi, Space nhảy, Shift chạy. Chuột trái đào, chuột phải đặt hoặc ăn. E túi đồ, F dùng, Q vứt, H trợ giúp. Trên điện thoại: cần trái để đi, kéo màn hình để nhìn." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Thanh cam là độ đói. Hái lan trên phế tích gạch, hoặc chặt cỏ lấy hạt rồi gieo lên đất. Gel rêu, táo và cánh lan đều ăn được." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "La bàn sapphire chỉ về Tim khe. Cột đèn và rương ở miệng hầm. Chỉ cuốc tinh thể phá được tim. Bọ hang dưới sâu đôi khi nhả tinh thể." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary",
						onClick: () => {
							game.closeMenus();
							onChange();
						},
						children: "Chơi tiếp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-ghost",
						onClick: onQuit,
						children: "Về tiêu đề"
					})]
				})
			]
		})
	});
	const chest = game.mode === "chest" && game.chestKey ? game.chests.get(game.chestKey) : null;
	const recipes = [...RECIPES].sort((a, b) => Number(game.canCraft(b)) - Number(game.canCraft(a)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: game.mode === "chest" ? "Rương" : "Túi và chế tạo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-icon",
						"aria-label": "Đóng",
						onClick: () => {
							game.closeMenus();
							onChange();
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [game.near(B.bench) ? "Có bàn chế cạnh bạn. " : "Đặt bàn chế để làm đồ đá và đồng. ", game.near(B.furnace) ? "Lò đang gần." : "Đặt lò và có than để nung thỏi."] }),
				chest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bag",
					style: { marginBottom: "0.7rem" },
					children: chest.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "slot",
						onClick: () => {
							game.swapChest(i);
							onChange();
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotFace, { stack: s })
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bag",
					children: game.slots.slice(0, 36).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: i === game.selected ? "slot on" : "slot",
						onClick: () => {
							if (i < 9) game.selected = i;
							else game.swapWithSelected(i);
							game.bump();
							onChange();
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotFace, { stack: s })
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "recipe-list",
					children: recipes.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "recipe",
						disabled: !game.canCraft(r),
						onClick: () => {
							game.craft(r.id);
							onChange();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							itemName(r.out),
							" ×",
							r.n,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								r.need.map(([id, n]) => `${itemName(id)} ×${n}`).join(", "),
								" · ",
								stationLabel(r.station)
							] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "swatch",
							style: {
								position: "relative",
								width: "1.4rem",
								height: "1.4rem",
								background: itemColor(r.out)
							}
						})]
					}, r.id))
				})
			]
		})
	});
}
function openInv(game) {
	if (!game) return;
	if (game.mode === "play") game.mode = "inv";
	else if (game.mode === "inv" || game.mode === "chest") game.closeMenus();
	game.bump();
}
function openPause(game) {
	if (!game) return;
	game.mode = game.mode === "play" ? "pause" : "play";
	game.bump();
}
function applyNet(game, from, data) {
	if (data.t === "b" && typeof data.x === "number" && typeof data.y === "number" && typeof data.z === "number" && typeof data.id === "number") game.applyRemote(data.x, data.y, data.z, data.id);
	else if (data.t === "time" && typeof data.time === "number") game.applyTime(data.time, !!data.force);
	else if (data.t === "win" && typeof data.name === "string") game.say(`${data.name} đã phá Tim khe.`);
	else if (data.t === "chest" && typeof data.key === "string" && Array.isArray(data.slots)) game.applyChest(data.key, data.slots);
	else if (data.t === "p" && from && typeof data.x === "number" && typeof data.y === "number" && typeof data.z === "number") game.setRemote(from, String(data.name ?? "Bạn"), data.x, data.y, data.z, Number(data.yaw) || 0, Number(data.hp) || 10);
}
function runLoop(canvas, game, view, onRev, onMesh, coordRef, aimRef, mineRef, hungerRef, needleRef, distRef, goalRef, publish) {
	let raf = 0;
	let last = performance.now();
	let acc = 0;
	let seen = game.rev;
	let sendAt = 0;
	let meshNoted = false;
	const loop = (now) => {
		const dt = Math.min(.05, (now - last) / 1e3);
		last = now;
		acc += dt;
		let steps = 0;
		while (acc >= 1 / 60 && steps < 4) {
			game.step(1 / 60);
			acc -= 1 / 60;
			steps++;
		}
		if (game.mode !== "play" && document.pointerLockElement === canvas) document.exitPointerLock();
		view.resize();
		view.sync(game, dt);
		if (!meshNoted && view.meshed) {
			meshNoted = true;
			onMesh(true);
		}
		if (coordRef.current) coordRef.current.textContent = `${Math.floor(game.x)} ${Math.floor(game.y)} ${Math.floor(game.z)}`;
		if (aimRef.current) aimRef.current.textContent = game.aimName();
		if (mineRef.current) mineRef.current.style.transform = `scaleX(${game.mine.on ? Math.min(1, game.mine.t) : 0})`;
		if (hungerRef.current) hungerRef.current.style.transform = `scaleX(${game.hunger / game.maxHunger})`;
		if (goalRef.current) goalRef.current.textContent = game.objectiveText();
		if (needleRef.current || distRef.current) {
			const dx = game.heartX + .5 - game.x;
			const dz = game.heartZ + .5 - game.z;
			const fx = -Math.sin(game.yaw);
			const fz = -Math.cos(game.yaw);
			const rx = Math.cos(game.yaw);
			const rz = -Math.sin(game.yaw);
			const localX = dx * rx + dz * rz;
			const localF = dx * fx + dz * fz;
			if (needleRef.current) needleRef.current.style.transform = `rotate(${Math.atan2(localX, localF)}rad)`;
			if (distRef.current) distRef.current.textContent = `${Math.round(Math.hypot(dx, dz))} m`;
		}
		if (now - sendAt > 90) {
			sendAt = now;
			publish();
		}
		if (game.rev !== seen) {
			seen = game.rev;
			onRev();
		}
		raf = requestAnimationFrame(loop);
	};
	raf = requestAnimationFrame(loop);
	return () => cancelAnimationFrame(raf);
}
//#endregion
export { Playfield as default };
