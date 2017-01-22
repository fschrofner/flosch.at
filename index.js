var Handlebars = require('handlebars');
var Metalsmith = require('metalsmith');
var branch = require('metalsmith-branch');
var collections = require('metalsmith-collections');
var date = require('metalsmith-build-date');
var excerpts = require('metalsmith-excerpts');
var fs = require('fs');
var sharp = require('metalsmith-sharp')
var markdown = require('metalsmith-markdown');
var moment = require('moment');
var permalinks = require('metalsmith-permalinks');
var tags = require('metalsmith-tags');
var layouts = require('metalsmith-layouts');

Handlebars.registerHelper('formatDate', formatDate);
Handlebars.registerHelper('toLowerCase', toLowerCase);

var metal = Metalsmith(__dirname);
metal.source('./src');
metal.destination('./build');
metal.clean(true);


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
    path:'tag/:tag/index.html',       // path for result pages
    layout:'../layouts/tag.hbt',      // template to use for tag listing
    sortBy: 'date',                   // provide posts sorted by 'date' (optional)
    reverse: true                     // sort direction (optional)
}));

//converts the header pictures of projects for multiple resolutions
metal.use(sharp([
    {
        src: 'images/projects/screens/*/header/*.png',
        namingPattern: '{dir}/{name}_large{ext}',
        methods: [
            {
                name: 'resize',
                args: [ 270, 480 ]
            }
        ]
    },
    {
        src: 'images/projects/screens/*/header/*.png',
        namingPattern: '{dir}/{name}_small{ext}',
        methods: [
            {
                name: 'resize',
                args: [ 160, 284 ]
            }
        ]
    }
]));

//converts the gallery thumbnails for every project
metal.use(sharp({
    src: 'images/projects/screens/*/gallery/*.png',
    namingPattern: '{dir}/{name}_thumb{ext}',
    methods: [
        {
            name: 'resize',
            args: [ 113, 200 ]
        }
    ]
}));

//finally applies handlebars
metal.use(layouts({
    engine: 'handlebars',
    partials: './layouts/partials'
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
    return _input.toString().toLowerCase();
}
