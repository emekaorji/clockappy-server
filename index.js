const express = require('express');
const jsDom = require('jsdom');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();

const updateResultsArray = ($, results) => {
	$('.col-md-8 div.quote').each(function (i, _elem) {
		results[i].id = i + 1;
	});
	$('.col-md-8 div.quote .text').each(function (i, elem) {
		results[i].text = $(elem).text().trim();
	});
	$('.col-md-8 div.quote span .author').each(function (i, elem) {
		results[i].author = $(elem).text().trim();
	});
	$('.col-md-8 div.quote .tags').each(function (i, elem) {
		results[i].tags = [];
		$(elem)
			.children()
			.each(function (_i2, elem2) {
				const elemText = $(elem2).text().trim();
				if (!elemText) return;
				results[i].tags.push(elemText);
			});
	});
};

async function getResults() {
	const { data } = await axios.get('https://quotes.toscrape.com/');
	const $ = cheerio.load(data);

	let results = [];
	const jobsLength = $('.col-md-8 div.quote').length;
	for (let i = 0; i < jobsLength; i++) {
		results.push({});
	}

	updateResultsArray($, results);

	console.log(results);
}

getResults();
