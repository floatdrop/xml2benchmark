/* global suite, bench */

'use strict';

var fs = require('fs');

var xml2js = require('xml2js');
var xml2json = require('xml2json');
var xmllite = require('node-xml-lite');

var files = {
	small: fs.readFileSync('xmls/small.xml'),
	large: fs.readFileSync('xmls/large.xml')
}

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

		bench('node-xml-lite', function (done) {
			setImmediate(function () {
				var result = xmllite.parseString(xml);
				done();
			});
		});
	});
}
