document.addEventListener('DOMContentLoaded', () => {
	const hamburgerBtn = document.getElementById('hamburger-btn');
	const sidebar = document.getElementById('sidebar');

	// Toggle sidebar visibility
	hamburgerBtn.addEventListener('click', () => {
		sidebar.classList.toggle('active');
	});
});

const fields = {
	"NICK": {
		name: "Nick",
		description: "Name, nickname, etc."
	},
	"CS": {
		name: "Callsign",
		description: "Your hamradio callsign"
	},
	"ID": {
		name: "DMR ID",
		description: "Your DMR ID"
	},
	"DMRPASS": {
		name: "BrandMeister DMR password",
		description: "Password for your repeater"
	},
	"DIS": {
		name: "Screen timeout",
		description: "Number of seconds before screen turns of (1 for never)"
	},
	"SCREENS": {
		name: "Screensaver",
		description: "Screensaver style"
	},
	"CHMODE": {
		name: "Tone channel switcher",
		description: "Should Tone be used to switch channel?"
	},
	"HISTORY": {
		name: "Last call duration",
		description: "How long should last conversation be displayed for"
	},
	"FREEZESCANTX": {
		name: "Pause scan after TX",
		description: "How long should scan be paused after TX"
	},
	"FREEZESCANRX": {
		name: "Pause scan after RX",
		description: "How long should scan be paused after RX"
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

const sectionFilters = [
	{
		name: "WiFi",
		filter: name => name.indexOf("S.") === 0
	},
	{
		name: "User",
		filter: name => {
			const elements = [
				"NICK",
				"CS",
				"ID",
				"DMRPASS"
			];

			return elements.indexOf(name) !== -1;
		}
	},
	{
		name: "Display",
		filter: name => {
			const elements = [
				"DIS",
				"SCREENS"
			];

			return elements.indexOf(name) !== -1;
		}
	},
	{
		name: "Hotspot config",
		filter: name => {
			const elements = [
				"CHMODE",
				"HISTORY",
				"FREEZESCANTX",
				"FREEZESCANRX",
				"TSQBEEP",
				"SCANBEEP",
				"SLEEP"
			];

			return elements.indexOf(name) !== -1;
		}
	},
	{
		name: "Radio config",
		filter: name => {
			const elements = [
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
			];

			return elements.indexOf(name) !== -1;
		}
	},
	{
		name: "Server config",
		filter: name => {
			const elements = [
				"DMRIP",
				"DMRP",
				"CONNECT",
				"IMNIP",
				"IMNP",
				"IMNIPSEC",
				"IMNPSEC"
			];

			return elements.indexOf(name) !== -1;
		}
	},
	{
		name: "Network config",
		filter: name => {
			const elements = [
				"BUFFERPACK",
				"RPTPACK",
				"NETJITTER",
				"DMRDELAY"
			];

			return elements.indexOf(name) !== -1;
		}
	},
	{
		name: "DMR config",
		filter: name => {
			const elements = [
				"TAENABLE",
				"DMRlatitude",
				"DMRlongitude",
				"DMRheight",
				"DMRlocation",
				"DMRdescription",
				"DMRurl"
			];

			return elements.indexOf(name) !== -1;
		}
	},
	{
		name: "Other",
		filter: () => true
	}
];

const getSettingSection = (name, value) => {
	const results = sectionFilters.filter(el => el.filter(name, value));

	return results[0].name;
};

const getSettings = () => {
	return fetch("./mysettings.html").then(response => {
		return response.text();
	}).then(body => {
		const cleanBody = body
			.trim()
			.split("\r")
			.join("")
			.split("\n")
			.map(el => el.trim())
			.filter(el => el != "")
			.map(el => {
				const segments = el.split("=");

				const name = segments.shift();
				const value = segments.join("=");

				return {name, value};
			});

		const settings = {};

		cleanBody.forEach(el => settings[el.name] = el.value);

		return settings;
	});
};

const createSettingsItem = (name, value) => {
	const field = fields[name] || {};

	const settings = {
		name,
		value
	};

	const itemElement = document.createElement("div");
	itemElement.classList.add("setting-item");

	const itemLabel = document.createElement("label");
	itemLabel.innerText = field.name || name;
	itemElement.appendChild(itemLabel);

	const inputElement = document.createElement("input");
	inputElement.type = "text";
	inputElement.placeholder = "Enter text";
	inputElement.value = value;
	itemElement.appendChild(inputElement);

	if(field.description) {
		const descriptionElement = document.createElement("div");
		descriptionElement.classList.add("description");
		descriptionElement.innerText = field.description;

		itemElement.appendChild(descriptionElement);
	}

	return {
		settings,
		element: itemElement,
		field
	};
};

const createSettingsSection = (name) => {
	const sectionElement = document.createElement("div");
	sectionElement.classList.add("settings-section");

	return {
		element: sectionElement
	};
};

getSettings().then(settings => {
	const settingsContainer = document.querySelectorAll("#settings-sections")[0];

	console.log(settingsContainer);

	const sections = {};

	const addSection = (name) => {
		const section = createSettingsSection(name);

		const nameElement = document.createElement("h3");
		nameElement.innerText = name;

		settingsContainer.appendChild(nameElement);
		settingsContainer.appendChild(section.element);

		return section;
	};

	Object.keys(settings).forEach(setting => {
		const name = setting;
		const value = settings[name];

		const sectionName = getSettingSection(name, value);

		let section;

		if(sections[sectionName]) {
			section = sections[sectionName];
		} else {
			section = sections[sectionName] = addSection(sectionName);
		}

		const element = createSettingsItem(name, value).element;
		section.element.appendChild(element);
	});
});
