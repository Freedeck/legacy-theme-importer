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
	manifest.name = themeId;
	manifest.theme = themeId + ".css";
	if(!fs.existsSync(`./themes/${themeId.toLowerCase().replace(' ','_')}`)) {
		fs.mkdirSync(`./themes/${themeId.toLowerCase().replace(' ','_')}`);
	}
	fs.writeFileSync(`./themes/${themeId.toLowerCase().replace(' ','_')}/manifest.json`, JSON.stringify(manifest, null, 2));
	fs.writeFileSync(`./themes/${themeId.toLowerCase().replace(' ','_')}/${themeId}.css`, `:root {`);
	themes[themeId].forEach(prop => {
		let propId = Object.keys(prop)[0];
		let value = prop[propId];
		fs.appendFileSync(`./themes/${themeId.toLowerCase().replace(' ','_')}/${themeId}.css`, `--fd-${propId}:${value};`);
	})
	fs.appendFileSync(`./themes/${themeId.toLowerCase().replace(' ','_')}/${themeId}.css`, `\n}`);
	console.log(`Created theme ${themeId.toLowerCase().replace(' ','_')}.`)
})