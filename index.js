const themes = require('./themes.json');
const fs = require('fs');

Object.keys(themes).forEach(themeId => {
	let manifest = {
		"name": "",
		"author": "LegacyThemeImporter",
		"version": "1.0",
		"description": "Theme imported with Legacy Theme Importer.",
		"theme": "black.css"
	}
	let oldThemeId = themeId;
	manifest.name = themeId;
	manifest.theme = themeId + ".css";
	themeId = themeId.toLowerCase().replace(' ','_');
	if(!fs.existsSync(`./themes/${themeId}`)) {
		fs.mkdirSync(`./themes/${themeId}`);
	}
	fs.writeFileSync(`./themes/${themeId}/manifest.json`, JSON.stringify(manifest, null, 2));
	fs.writeFileSync(`./themes/${themeId}/${themeId}.css`, `:root {`);
	themes[oldThemeId].forEach(prop => {
		let propId = Object.keys(prop)[0];
		let value = prop[propId];
		if(propId == 'background') value = `linear-gradient(${value})`
		fs.appendFileSync(`./themes/${themeId}/${themeId}.css`, `\n\t--fd-${propId}:${value};`);
	})
	fs.appendFileSync(`./themes/${themeId}/${themeId}.css`, `\n}`);
	console.log(`Created theme ${themeId}.`)
})