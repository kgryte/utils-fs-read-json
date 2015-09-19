/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	data = require( './fixtures/data.json' ),
	readJSON = require( './../lib/sync.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'sync', function tests() {

	var file = path.join( __dirname, 'fixtures', 'data.json' ),
		bad = path.join( __dirname, 'fixtures', 'bad.json' );

	it( 'should export a function', function test() {
		expect( readJSON ).to.be.a( 'function' );
	});

	it( 'should read a JSON file', function test() {
		var actual = readJSON( file );
		assert.deepEqual( actual, data );
	});

	it( 'should read a JSON file using provided options', function test() {
		var actual;

		// String options:
		actual = readJSON( file, 'utf8' );

		assert.deepEqual( actual, data );

		// Object options:
		actual = readJSON( file, {
			'encoding': 'utf8'
		});

		assert.deepEqual( actual, data );
	});

	it( 'should return an error', function test() {
		var out = readJSON( 'beepboopbapbop' );

		assert.isTrue( out instanceof Error );
		assert.strictEqual( out.code, 'ENOENT' );
	});

	it( 'should return an error (options)', function test() {
		var out;

		out = readJSON( 'beepboopbapbop', 'utf8' );
		assert.isTrue( out instanceof Error );


		out = readJSON( 'beepboopbapbop', {
			'encoding': 'utf8'
		});
		assert.isTrue( out instanceof Error );
	});

	it( 'should return an error if unable to parse file data as JSON', function test() {
		var out = readJSON( bad );
		assert.isTrue( out instanceof Error );
	});

	it( 'should support providing a JSON reviver', function test() {
		var expected,
			actual;

		actual = readJSON( file, {
			'reviver': reviver
		});
		expected = {
			'beep': 'boop',
			'bop': [1,2,3],
			'bool': true,
			'bap': 'woot'
		};

		assert.deepEqual( actual, expected );

		function reviver( key, value ) {
			if ( key === 'bap' ) {
				return 'woot';
			}
			return value;
		}
	});

});
