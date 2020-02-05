'use strict';

const puppeteer = require('puppeteer');
const async = require('async');

async function screenshot({ height, path, type, url, width }) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const override = Object.assign(page.viewport(), { width, height });
  await page.setViewport(override);
  await page.goto(url);
  await page.screenshot({ path, type });

  await browser.close();
};

async function screenshotBulk(pages) {
  async.eachSeries(pages, screenshot);
}


module.exports = {
  screenshot,
  screenshotBulk
};
