import { join } from 'path';

const ghpages = require('gh-pages');
const distPath = join(__dirname, '../dist');
ghpages.publish(distPath, function(err: any) {
	if (err) {
		console.log('ERROR: ', err.message);
	}
	else {
		console.log('published');
	}
});
