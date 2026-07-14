import { state, el, when, effect, untracked, mount, reactive } from "@nemanjan00/qrp";
import { form, textual, parseKV, serializeKV, multichoice } from "@nemanjan00/qrp/forms";
import { html } from "@nemanjan00/qrp/html";

const fields = {
	"NICK": {
		name: "Nick",
		description: "Name, nickname, etc.",
		type: "text",
		default: "Ime i prezime"
	},
	"CS": {
		name: "Callsign",
		description: "Your hamradio callsign",
		type: "text",
		default: "pozivni znak"
	},
	"ID": {
		name: "DMR ID",
		description: "Your DMR ID",
		type: "number"
	},
	"DMRPASS": {
		name: "BrandMeister DMR password",
		description: "Password for your repeater",
		type: "text"
	},
	"DIS": {
		name: "Screen timeout",
		description: "Number of seconds before screen turns of (1 for never)",
		type: "number"
	},
	"SCREENS": {
		name: "Screensaver",
		description: "Screensaver style",
		input: multichoice({
			"0": "Off",
			"1": "1",
			"2": "2",
			"3": "3",
		})
	},
	"CHMODE": {
		name: "Tone channel switcher",
		description: "Should Tone be used to switch channel?",
		input: multichoice({
			"1": "Off",
			"2": "On"
		})
	},
	"HISTORY": {
		name: "Last call duration",
		description: "How long should last conversation be displayed for",
		type: "number"
	},
	"FREEZESCANTX": {
		name: "Pause scan after TX",
		description: "How long should scan be paused after TX",
		type: "number"
	},
	"FREEZESCANRX": {
		name: "Pause scan after RX",
		description: "How long should scan be paused after RX",
		type: "number"
	},
	"TSQBEEP": {
		name: "DTMF on channel change",
		description: "Play DTMF after channel change using PL"
	},
	"SCANBEEP": {
		name: "DTMF on channel change in scan",
		description: "Play DTMF after channel change using scan"
	},
	"SLEEP": {
		name: "Power saving time",
		description: "After how much time should it enter power save mode"
	},
	"IFT": {
		name: "TX frequency",
	},
	"IFR": {
		name: "RX frequency",
	},
	"DYTR": {
		name: "Digital RX/TX frequency",
		description: "RX/TX frequency for digital channels"
	},
	"SQL(dBm)": {
		name: "Squelch level in dBm"
	},
	"SQH(dBm)": {
		name: "Squelch upper level in dBm"
	},
	"BANDWIDTH": {
		name: "Channel bandwith",
		description: "Frequency deviation, 12.5kHz or 25kHz"
	},
	"PTF": {
		name: "Tone",
		description: "Tone frequency in Hz"
	},
	"TSQF": {
		name: "RX Tone squelch"
	},
	"TOTWD": {
		name: "Maximum TX time"
	},
	"ATXLevel": {
		name: "TX level for analog"
	},
	"DTXLevel": {
		name: "TX level for digital"
	},
	"DMRIP": {
		name: "Brandmaister server IP"
	},
	"DMRP": {
		name: "Brandmaister server Port"
	},
	"CONNECT": {
		name: "Multiple IMN servers"
	},
	"IMNIP": {
		name: "IMN server IP"
	},
	"IMNP": {
		name: "IMN server Port"
	},
	"IMNIPSEC": {
		name: "Secondary IMN server IP"
	},
	"IMNPSEC": {
		name: "Secondary IMN server Port"
	},
	"TAENABLE": {
		name: "Talker alias"
	},
	"DMRlatitude": {
		name: "DMR hotspot latitude"
	},
	"DMRlongitude": {
		name: "DMR hotspot latitude"
	},
	"DMRheight": {
		name: "DMR hotspot altitude"
	},
	"DMRlocation": {
		name: "DMR hotspot location"
	},
	"DMRdescription": {
		name: "DMR hotspot name"
	},
	"DMRurl": {
		name: "DMR hotspot url"
	}
};

const sections = [
	{
		name: "WiFi",
		filter: name => name.indexOf("S.") === 0
	},
	{
		name: "User",
		filter: name => [
			"NICK",
			"CS",
			"ID",
			"DMRPASS"
		].includes(name)
	},
	{
		name: "Display",
		filter: name => [
			"DIS",
			"SCREENS"
		].includes(name)
	},
	{
		name: "Hotspot config",
		filter: name => [
			"CHMODE",
			"HISTORY",
			"FREEZESCANTX",
			"FREEZESCANRX",
			"TSQBEEP",
			"SCANBEEP",
			"SLEEP"
		].includes(name)
	},
	{
		name: "Radio config",
		filter: name => [
			"IFT",
			"IFR",
			"DYTR",
			"SQL(dBm)",
			"SQH(dBm)",
			"BANDWIDTH",
			"PTF",
			"TSQF",
			"TOTWD",
			"ATXLevel",
			"DTXLevel"
		].includes(name)
	},
	{
		name: "Server config",
		filter: name => [
			"DMRIP",
			"DMRP",
			"CONNECT",
			"IMNIP",
			"IMNP",
			"IMNIPSEC",
			"IMNPSEC"
		].includes(name)
	},
	{
		name: "Network config",
		filter: name => [
			"BUFFERPACK",
			"RPTPACK",
			"NETJITTER",
			"DMRDELAY"
		].includes(name)
	},
	{
		name: "DMR config",
		filter: name => [
			"TAENABLE",
			"DMRlatitude",
			"DMRlongitude",
			"DMRheight",
			"DMRlocation",
			"DMRdescription",
			"DMRurl"
		].includes(name)
	},
	{
		name: "Other",
		filter: () => true
	}
];

const getSettings = () => {
	return fetch("./mysettings.html")
		.then(response => response.text())
		.then(parseKV);
};

const serializeChannelsSettings = settings => {
	return settings
		.map(setting => {
			return `${setting.value}=${setting.name},${setting.scan},${setting.type}`;
		}).join("\n");
};

const parseChannelsSettings = body => {
	return body
		.trim()
		.split("\r")
		.join("")
		.split("\n")
		.map(el => el.trim())
		.filter(el => el != "")
		.map(el => {
			const segments = el.split(",");

			const name = segments[0].split("=")[1];
			const value = segments[0].split("=")[0];

			const scan = segments[1];

			const type = segments[2];

			return {name, value, scan, type};
		});
};

const getChannelsSettings = () => {
	return fetch("./channelsettings.html")
		.then(response => response.text())
		.then(parseChannelsSettings);
};

const ui = state({
	route: "home_settings",
	menuOpen: false,
	rebooting: false
});

const submit = render => {
	console.log(render());
	ui.rebooting = true;
};

const submitButton = render =>
	el("button", { class: "submit", id: "submit", onclick: () => submit(render) }, "Submit");

const textualSection = textareaElement =>
	el("div", { class: "settings-container" },
		el("div", { class: "settings-section" },
			el("div", { class: "setting-item" },
				el("label", {}, "Textual"),
				textareaElement)));

const modeSwitch = page =>
	el("span", { class: "mode" },
		el("span", {}, "Textual mode"),
		el("label", { class: "switch" },
			el("input", { type: "checkbox", bind: [page, "textual"] }),
			el("span", { class: "slider round" })));

const settingsPage = title => view => {
	const page = state({ textual: false, settings: null });

	getSettings().then(settings => { page.settings = settings; });

	view.append(el("div", {},
		el("h2", {}, title),
		modeSwitch(page),
		when(() => page.settings, settings =>
			el("div", {}, when(() => page.textual,
				() => textualSection(textual(settings)),
				() => form({ settings, fields, sections })))),
		submitButton(() => serializeKV(page.settings || {}))));
};

const channelsSettingsPage = view => {
	const page = state({ text: "" });

	getChannelsSettings().then(settings => {
		page.text = serializeChannelsSettings(settings);
	});

	view.append(el("div", {},
		el("h2", {}, "Channels settings"),
		textualSection(el("textarea", { class: "textarea-input", bind: [page, "text"] })),
		submitButton(() => page.text)));
};

const updatePage = view => {
	view.append(html`
	<div class="upload-container">
		<h2>Update</h2>
		<form id="upload-form" enctype="multipart/form-data">
			<div class="form-group">
				<label for="file-upload" class="file-label">Choose a binary file:</label>
				<input type="file" id="file-upload" name="binaryBlob" class="file-input" accept="*/*" required>
			</div>

			<div class="form-group">
				<button type="submit" class="submit">Upload</button>
			</div>
		</form>
	</div>`);
};

const routes = {
	home_settings: { title: "Home settings", page: settingsPage("Home settings") },
	portable_settings: { title: "Portable settings", page: settingsPage("Portable settings") },
	channels_settings: { title: "Channel settings", page: channelsSettingsPage },
	update: { title: "Manual update", page: updatePage }
};

const sidebar = reactive(document.getElementById("sidebar"));
sidebar.className = () => ui.menuOpen ? "sidebar active" : "sidebar";

document.getElementById("hamburger-btn").addEventListener("click", () => {
	ui.menuOpen = !ui.menuOpen;
});

const modal = document.getElementById("modal");

effect(() => {
	modal.style.display = ui.rebooting ? "flex" : "none";
});

mount(document.querySelector(".menu"), menu => {
	menu.append(...Object.entries(routes).map(([route, { title }]) =>
		el("a", {
			href: "#",
			class: () => ui.route === route ? "active" : "",
			onclick: event => {
				event.preventDefault();
				ui.route = route;
				ui.menuOpen = false;
			}
		}, title)));
});

const outlet = document.getElementById("view");

let currentView = null;

effect(() => {
	const { page } = routes[ui.route];

	if(currentView) currentView.dispose();

	currentView = untracked(() => mount(outlet, page));
});
