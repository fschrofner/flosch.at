var Handlebars = require('handlebars');
var Metalsmith = require('metalsmith');
var branch = require('metalsmith-branch');
var collections = require('metalsmith-collections');
//var convert = require('metalsmith-convert');
var date = require('metalsmith-build-date');
var excerpts = require('metalsmith-excerpts');
var fs = require('fs');
var markdown = require('metalsmith-markdown');
var moment = require('moment');
var permalinks = require('metalsmith-permalinks');
var tags = require('metalsmith-tags');
var layouts = require('metalsmith-layouts');

Handlebars.registerPartial('header',fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer',fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());
Handlebars.registerPartial('blog_posts',fs.readFileSync(__dirname + '/templates/partials/blog_posts.hbt').toString());
Handlebars.registerPartial('tags',fs.readFileSync(__dirname + '/templates/partials/tags.hbt').toString());
Handlebars.registerPartial('post_header',fs.readFileSync(__dirname + '/templates/partials/post_header.hbt').toString());
Handlebars.registerHelper('formatDate', formatDate);
Handlebars.registerHelper('toLowerCase', toLowerCase);

var metal = Metalsmith(__dirname);
metal.source('./src');
metal.destination('./build');

metal.use(date());

//splits the sections
metal.use(collections({
    pages: {
	pattern: 'content/pages/*.md'
    },
    projects: {
	pattern: 'content/projects/*.md'
    },
    blog: {
	pattern: 'content/blog/*/*/*.md',
	sortBy: 'date',
	reverse: true
    }
}));

metal.use(markdown());

metal.use(excerpts());

//create the correct permalinks for every section
metal.use(branch(isPage)
	  .use(permalinks({
	      pattern: ':title'
	  }))
	 );

metal.use(branch(isProject)
	  .use(permalinks({
	      pattern: ':collection/:title'
	  }))
	 );

metal.use(branch(isPost)
	  .use(permalinks({
	      pattern: ':collection/:date/:title'
	  }))
	 );

//create tag pages for blogposts, must be called before the handlebars will be applied
metal.use(tags({
    handle: 'tags',                   // yaml key for tag list in you pages
    path:'tag',                       // path for result pages
    layout:'../templates/tag.hbt',  // template to use for tag listing
    sortBy: 'date',                   // provide posts sorted by 'date' (optional)
    reverse: true                     // sort direction (optional)
})
	 ).use(permalinks({
	     pattern:'tag/:tag'
	 }));

//converts the header pictures of projects for multiple resolutions
//requires metalsmith-convert to be added as dependency
// metal.use(convert(
//     [
// 	{
// 	    src: 'images/projects/screens/*/header/*.png',
// 	    target: 'png',
// 	    resize: {
// 		width: 270,
// 		height: 480,
// 	    },
// 	    nameFormat: '%b_large%e'
// 	},{
// 	    src: 'images/projects/screens/*/header/*.png',
// 	    target: 'png',
// 	    resize: {
// 		width: 160,
// 		height: 284,
// 	    },
// 	    nameFormat: '%b_small%e'
// 	}
//     ]
// ));

//converts the gallery thumbnails for every project
// metal.use(convert({
//     src: 'images/projects/screens/*/gallery/*.png',
//     target: 'png',
//     resize:{
// 	width: 113,
// 	height: 200,
//     },
//     nameFormat: '%b_thumb%e'
// }));

//finally applies handlebars
metal.use(layouts({
    engine: 'handlebars'
}));

metal.build(function(err){
    if (err) throw err;
});

function isPage(_filename, _properties, _index) {
    if(_properties.collection == 'pages'){
	return true;
    } else {
	return false;
    }
}

function isProject(_filename, _properties, _index) {
    if(_properties.collection == 'projects'){
	return true;
    } else {
	return false;
    }
}

function isPost(_filename, _properties, _index) {
    if(_properties.collection == 'blog'){
	return true;
    } else {
	return false;
    }
}

//these are handlebar helpers that will be used somewhere inside the handlebar files
function formatDate(_datetime, _format) {
    return moment(new Date(_datetime)).format(_format);
}

function toLowerCase(_input){
    return _input.toLowerCase();
}
