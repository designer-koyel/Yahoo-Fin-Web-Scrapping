const axios = require('axios');
const rp = require('request-promise');
const cheerio = require('cheerio');
const math = require('mathjs');

const url = 'https://finance.yahoo.com/world-indices'
//const url = 'https://www.nasdaq.com/market-activity/indexes/';
rp(url)
	.then(html => {
		let $ = cheerio.load(html);
		//console.log(html);
		var index_sym = [];
		var index_name = [];
		var index_last_price = [];
		var index_change_abs = [];
		var index_change_percent = [];

		$('td.data-col0').each(function(i, element)
		{
			var a = $(this);
			//var text = a.text();
			index_sym.push(a.text());
			//console.log(sym.text());
		});

		$('td.data-col1').each(function(i, element)
		{
			var a = $(this);
			//var text = a.text();
			index_name.push(a.text());
			//console.log(sym.text());
		});

		$('td.data-col2').each(function(i, element)
		{
			var a = $(this);
			//var text = a.text();
			index_last_price.push(a.text());
			//console.log(sym.text());
		});

		$('td.data-col3').each(function(i, element)
		{
			var a = $(this);
			//var text = a.text();
			index_change_abs.push(parseFloat(a.text()));
			//console.log(sym.text());
		});

		$('td.data-col4').each(function(i, element)
		{
			var a = $(this);
			//var text = a.text();
			index_change_percent.push(parseFloat(a.text()));
			//console.log(sym.text());
		});

		for(i = 0; i < index_sym.length; i++)
		{
			console.log(index_sym[i] + "  " + index_name[i] + "  " + index_last_price[i] + "  " + index_change_abs[i] + "  " + index_change_percent[i]);
		}

		//console.log(index_change_percent);

		var sd = math.std(index_change_percent);
		console.log('std : ' + sd);
	})
	.catch(error => {
		console.log(error);
	})