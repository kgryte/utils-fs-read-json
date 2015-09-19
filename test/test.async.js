/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	data = require( './fixtures/data.json' ),
	readJSON = require( './../lib/async.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'async', function tests() {

	var file = path.join( __dirname, 'fixtures', 'data.json' ),
		bad = path.join( __dirname, 'fixtures', 'bad.json' );

	it( 'should export a function', function test() {
		expect( readJSON ).to.be.a( 'function' );
	});

	it( 'should read a JSON file', function test( done ) {
		readJSON( file, onRead );
		function onRead( error, actual ) {
			if ( error ) {
				assert.ok( false );
			} else {
				assert.deepEqual( actual, data );
			}
			done();
		}
	});

	it( 'should read a JSON file if provided an encoding option', function test( done ) {
		readJSON( file, 'utf8', onRead );
		function onRead( error, actual ) {
			if ( error ) {
				assert.ok( false );
			} else {
				assert.deepEqual( actual, data );
			}
			done();
		}
	});

	it( 'should read a JSON file if provided an options object', function test( done ) {
		readJSON( file, {'encoding':'utf8'}, onRead );
		function onRead( error, actual ) {
			if ( error ) {
				assert.ok( false );
			} else {
				assert.deepEqual( actual, data );
			}
			done();
		}
	});

	it( 'should return an error', function test( done ) {
		readJSON( 'beepboopbapbop', onRead );
		function onRead( error ) {
			if ( error ) {
				assert.ok( error );
				assert.strictEqual( error.code, 'ENOENT' );
			} else {
				assert.ok( false );
			}
			done();
		}
	});

	it( 'should return an error (encoding option)', function test( done ) {
		readJSON( 'beepboopbapbop', 'utf8', onRead );
		function onRead( error ) {
			if ( error ) {
				assert.ok( error );
			} else {
				assert.ok( false );
			}
			done();
		}
	});

	it( 'should return an error (options object)', function test( done ) {
		readJSON( 'beepboopbapbop', {'encoding':'utf8'}, onRead );
		function onRead( error ) {
			if ( error ) {
				assert.ok( error );
			} else {
				assert.ok( false );
			}
			done();
		}
	});

	it( 'should return an error if unable to parse file data as JSON', function test( done ) {
		readJSON( bad, onRead );
		function onRead( error ) {
			if ( error ) {
				assert.ok( error );
			} else {
				assert.ok( false );
			}
			done();
		}
	});

	it( 'should support providing a JSON reviver', function test( done ) {
		var expected = {
			'beep': 'boop',
			'bop': [1,2,3],
			'bool': true,
			'bap': 'woot'
		};
		readJSON( file, {
			'reviver': reviver
		}, onRead );

		function onRead( error, actual ) {
			if ( error ) {
				assert.ok( false );
			} else {
				assert.deepEqual( actual, expected );
			}
			done();
		}

		function reviver( key, value ) {
			if ( key === 'bap' ) {
				return 'woot';
			}
			return value;
		}
	});

});
