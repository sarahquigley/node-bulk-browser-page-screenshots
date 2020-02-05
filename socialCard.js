'use strict';

const args = require('yargs').argv;
const screenshot = require('./screenshot');
const fs = require('fs');
const async = require('async');

async function socialCard(file) {
  const basename = file.split('.')[0];
  if (basename && basename !== '') {
    console.log(`PROCESSING ${basename}`);
    await screenshot(
      `http://localhost:8000/poems/${basename}/social-card/`,
      `./static/images/${basename}-social_card.png`
    );
  }
}

if (args.single && args.file) {
  console.log('SINGLE');
  if (args.file) {
    socialCard(args.file);
  } else {
    console.log ('provide file arg --file=file-name');
  }
} else {
  console.log('BULK');
  const files = [];
  fs.readdirSync('./src/poems/').forEach(file => {
    files.push(file);
  });
  async.eachSeries(files, socialCard);
}
