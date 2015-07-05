/* global suite, bench */

'use strict';

var fs = require('fs');

var xml2js = require('xml2js');
var xml2json = require('xml2json');

var files = fs.readdirSync('xmls').reduce(function (p, c) {
	p[c] = fs.readFileSync('xmls/' + c).toString();
	return p;
}, {});

for (var file in files) {
	suite(file, function () {
		var xml = files[file].toString();

		bench('xml2js', function (done) {
			setImmediate(function () {
				xml2js.parseString(xml, function (err, result) {
					done();
				});
			});
		});

		bench('xml2json', function (done) {
			setImmediate(function () {
				var result = xml2json.toJson(xml);
				done();
			});
		});
	});
}
