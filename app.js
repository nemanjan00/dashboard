document.addEventListener('DOMContentLoaded', () => {
	const hamburgerBtn = document.getElementById('hamburger-btn');
	const sidebar = document.getElementById('sidebar');

	// Toggle sidebar visibility
	hamburgerBtn.addEventListener('click', () => {
		sidebar.classList.toggle('active');
	});
});

const inputTypes = {
	number: (parent, settings, field) => {
		const inputElement = document.createElement("input");

		inputElement.type = "number";
		inputElement.placeholder = "Enter number";
		inputElement.value = settings.value;

		inputElement.addEventListener("change", event => {
			settings.value = inputElement.value;
		});

		parent.appendChild(inputElement);
	},

	text: (parent, settings, field) => {
		const inputElement = document.createElement("input");

		inputElement.type = "text";
		inputElement.placeholder = "Enter text";
		inputElement.value = settings.value;

		inputElement.addEventListener("change", event => {
			settings.value = inputElement.value;
		});

		parent.appendChild(inputElement);
	},

	multichoice: (options) => (parent, settings, field) => {
		const inputElement = document.createElement("select");

		Object.keys(options).forEach(option => {
			const optionElement = document.createElement("option");
			optionElement.value = option;
			optionElement.innerText = options[option];

			inputElement.appendChild(optionElement);
		});

		inputElement.value = settings.value;

		inputElement.addEventListener("change", event => {
			settings.value = inputElement.value;
		});

		parent.appendChild(inputElement);
	}
};

const fields = {
	"NICK": {
		name: "Nick",
		description: "Name, nickname, etc.",
		input: inputTypes.text,
		default: "Ime i prezime"
	},
	"CS": {
		name: "Callsign",
		description: "Your hamradio callsign",
		input: inputTypes.text,
		default: "pozivni znak"
	},
	"ID": {
		name: "DMR ID",
		description: "Your DMR ID",
		input: inputTypes.number
	},
	"DMRPASS": {
		name: "BrandMeister DMR password",
		description: "Password for your repeater",
		input: inputTypes.text
	},
	"DIS": {
		name: "Screen timeout",
		description: "Number of seconds before screen turns of (1 for never)",
		input: inputTypes.number
	},
	"SCREENS": {
		name: "Screensaver",
		description: "Screensaver style",
		input: inputTypes.multichoice({
			"0": "Off",
			"1": "1",
			"2": "2",
			"3": "3",
		})
	},
	"CHMODE": {
		name: "Tone channel switcher",
		description: "Should Tone be used to switch channel?",
		input: inputTypes.multichoice({
			"1": "Off",
			"2": "On"
		})
	},
	"HISTORY": {
		name: "Last call duration",
		description: "How long should last conversation be displayed for",
		input: inputTypes.number
	},
	"FREEZESCANTX": {
		name: "Pause scan after TX",
		description: "How long should scan be paused after TX",
		input: inputTypes.number
	},
	"FREEZESCANRX": {
		name: "Pause scan after RX",
		description: "How long should scan be paused after RX",
		input: inputTypes.number
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

const parseSettings = body => {
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
};

const getYSFHosts = () => {
	return fetch("https://www.pistar.uk/downloads/YSF_Hosts.txt").then(response => {
		return response.text();
	});
};

const getSettings = () => {
	return fetch("./mysettings.html").then(response => {
		return response.text();
	}).then(parseSettings);
};

const serializeChannelsSettings = settings => {
	return settings
		.map(setting => {
			return `${setting.value}=${setting.name},${setting.scan},${setting.type}`;
		}).join("\n");
};

const parseChannelsSettings = body => {
	const cleanBody = body
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

	return cleanBody;
};

const getChannelsSettings = () => {
	return fetch("./channelsettings.html").then(response => {
		return response.text();
	}).then(parseChannelsSettings);
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

	(field.input || inputTypes.text)(itemElement, settings, field)

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

const generateForm = settings => {
	const settingsContainer = document.querySelectorAll("#settings-sections")[0];

	settingsContainer.innerHTML = "";

	const sections = {};

	const addSection = (name) => {
		const section = createSettingsSection(name);

		const nameElement = document.createElement("h3");
		nameElement.innerText = name;

		settingsContainer.appendChild(nameElement);
		settingsContainer.appendChild(section.element);

		return section;
	};

	Object.keys(fields).forEach(fieldName => {
		const field = {
			name: fieldName,
			default: fields[fieldName].default,
			field: fields[fieldName]
		};

		if(settings[field.name] === undefined && field.default) {
			console.log("Filling in " + field.name);
			settings[field.name] = field.default;
		}
	});

	const keys = [];

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

		const element = createSettingsItem(name, value);

		section.element.appendChild(element.element);

		keys.push(element);
	});

	return {
		render: () => keys.map(el => `${el.settings.name}=${el.settings.value}`).join("\n")
	};
};

const generateTextual = settings => {
	const settingsContainer = document.querySelectorAll("#settings-sections")[0];

	settingsContainer.innerHTML = "";

	const section = createSettingsSection("Textual");

	settingsContainer.appendChild(section.element);

	const textareaElement = document.createElement("textarea");

	textareaElement.classList.add("textarea-input");
	textareaElement.value = settings;

	const itemElement = document.createElement("div");
	itemElement.classList.add("setting-item");

	const itemLabel = document.createElement("label");
	itemLabel.innerText = "Textual";
	itemElement.appendChild(itemLabel);

	itemElement.appendChild(textareaElement);

	section.element.append(itemElement);

	return {
		render: () => textareaElement.value
	};
};

const settingsPage = (type) => {
	return (view) => {
		const titleElement = document.createElement("h2");

		const map = {
			home_settings: "Home settings",
			portable_settings: "Portable settings"
		};

		titleElement.innerText = map[type];

		view.appendChild(titleElement);

		const renderTextSwitch = view => {
			const modeElement = document.createElement("span");
			modeElement.classList.add("mode");

			const modeSpanElement = document.createElement("span");
			modeSpanElement.innerText = "Textual mode";

			modeElement.appendChild(modeSpanElement);

			const modeLabelElement = document.createElement("label");
			modeLabelElement.classList.add("switch");

			const modeInputElement = document.createElement("input");
			modeInputElement.id = "textual";
			modeInputElement.type = "checkbox";

			const modeInputSpanElement = document.createElement("span");
			modeInputSpanElement.classList.add("slider");
			modeInputSpanElement.classList.add("round");


			modeLabelElement.appendChild(modeInputElement);
			modeLabelElement.appendChild(modeInputSpanElement);

			modeElement.append(modeLabelElement);

			view.appendChild(modeElement);
		};

		renderTextSwitch(view);

		const settingsContainerElement = document.createElement("div");
		settingsContainerElement.classList.add("settings-container");

		const settingsSectionsElement = document.createElement("div");
		settingsSectionsElement.id = "settings-sections";

		settingsContainerElement.appendChild(settingsSectionsElement);
		view.appendChild(settingsContainerElement);

		const submitButton = document.createElement("button");
		submitButton.classList.add("submit");
		submitButton.id = "submit";

		submitButton.innerText = "Submit";

		view.appendChild(submitButton);

		getSettings(type).then(settings => {
			let source = generateForm(settings);

			const textualCheckbox = document.getElementById("textual");

			textualCheckbox.checked = false;

			textualCheckbox.addEventListener("change", () => {
				const newSettings = source.render();
				const newSettingsParsed = parseSettings(newSettings);

				if(textualCheckbox.checked) {
					source = generateTextual(newSettings);
				} else {
					source = generateForm(newSettingsParsed);
				}
			});

			document.getElementById("submit").addEventListener("click", () => {
				const modal = document.getElementById('modal');

				console.log(source.render());

				modal.style.display = 'flex';
			});
		});
	}
};

const channelsSettingsPage = (view) => {
	const titleElement = document.createElement("h2");

	titleElement.innerText = "Channels settings";

	view.appendChild(titleElement);

	const settingsContainerElement = document.createElement("div");
	settingsContainerElement.classList.add("settings-container");

	const settingsSectionsElement = document.createElement("div");
	settingsSectionsElement.id = "settings-sections";

	settingsContainerElement.appendChild(settingsSectionsElement);
	view.appendChild(settingsContainerElement);

	const submitButton = document.createElement("button");
	submitButton.classList.add("submit");
	submitButton.id = "submit";

	submitButton.innerText = "Submit";

	view.appendChild(submitButton);

	getChannelsSettings().then(settings => {
		generateTextual(serializeChannelsSettings(settings));
	});
};

const routes = {
	home_settings: settingsPage("home_settings"),
	portable_settings: settingsPage("portable_settings"),
	channels_settings: channelsSettingsPage,
	update: () => {}
};

const goToRoute = (route) => {
	const view = document.getElementById("view");

	const menuElements = document.querySelectorAll(".menu a");

	menuElements.forEach(element => {
		if(element.getAttribute("view") === route) {
			element.classList.add("active");
			return;
		}

		element.classList.remove("active");
	});

	view.innerHTML = "";

	routes[route](view);
};

const setupRouter = () => {
	const menuElements = document.querySelectorAll(".menu a");

	menuElements.forEach(element => {
		const route = element.getAttribute("view");

		element.addEventListener("click", () => {
			goToRoute(route);
		});
	});
};

setupRouter();
goToRoute("channels_settings");
