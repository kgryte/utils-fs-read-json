'use strict';

var path = require( 'path' ),
	readJSON = require( './../lib' );


var file = path.join( __dirname, 'data.json' );

// Sync:
var data = readJSON.sync( file, 'utf8' );
// returns <object>

console.log( data instanceof Error );
// returns false

data = readJSON.sync( 'beepboop', {
	'encoding': 'utf8'
});
// returns <error>

console.log( data instanceof Error );
// returns true


// Async:
readJSON( file, onJSON );
readJSON( 'beepboop', onJSON );

function onJSON( error, data ) {
	if ( error ) {
		if ( error.code === 'ENOENT' ) {
			console.error( 'JSON file does not exist.' );
		} else {
			throw error;
		}
	} else {
		console.log( 'Beep: %s.', data.beep );
	}
}



