var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var branch = require('metalsmith-branch');
var Handlebars = require('handlebars');
var fs = require('fs');

Handlebars.registerPartial('header',fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer',fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

var metal = Metalsmith(__dirname);
metal.source('./src');
metal.destination('./build');

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

metal.use(templates('handlebars'));

//metal.use(branch(filterStaticContent)
//  .use(templates('handlebars'))
//);

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

//metal.use(permalinks({
//  pattern: ':collection/:title'
//}));


metal.build();


//this code part is needed since metalsmith-templates currently destroys binary files
//function filterStaticContent(filename, properties, index) {
//  var extension = filename.split('.').pop().toLowerCase();
//  var staticExtensions = [ "jpg", "jpeg", "png", "otf"];
//  var notStatic = staticExtensions.indexOf(extension) == -1;
//  return notStatic;
//}

function isPage(_filename, _properties, _index) {
  if(_properties.collection === 'pages'){
    return true;
  } else {
    return false;
  }
}

function isProject(_filename, _properties, _index) {
  if(_properties.collection === 'projects'){
    return true;
  } else {
    return false;
  }
}

function isPost(_filename, _properties, _index) {
  if(_properties.collection === 'blog'){
    return true;
  } else {
    return false;
  }
}