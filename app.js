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
	return fetch("./mysettings").then(response => {
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
	const settings = {
		name,
		value
	};

	const itemElement = document.createElement("div");
	itemElement.classList.add("setting-item");

	const itemLabel = document.createElement("label");
	itemLabel.innerText = name;
	itemElement.appendChild(itemLabel);

	const inputElement = document.createElement("input");
	inputElement.type = "text";
	inputElement.placeholder = "Enter text";
	inputElement.value = value;
	itemElement.appendChild(inputElement);

	return {
		settings,
		element: itemElement
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
