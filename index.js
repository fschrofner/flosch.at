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
  blog: {
    pattern: 'content/blog/*/*/*.md',
    sortBy: 'date',
    reverse: true
  }
}));
  
metal.use(permalinks({
  pattern: ':collection/:title'
}));

metal.use(markdown({
}));

metal.use(branch(filterStaticContent)
  .use(templates('handlebars'))
);

metal.build();


//this code part is needed since metalsmith-templates currently destroys binary files
function filterStaticContent(filename, properties, index) {
  var extension = filename.split('.').pop().toLowerCase();
  var staticExtensions = [ "jpg", "jpeg", "png", "otf"];
  var notStatic = staticExtensions.indexOf(extension) == -1;
  return notStatic;
}
  