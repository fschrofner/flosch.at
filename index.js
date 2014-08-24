var Metalsmith = require('metalsmith');
var moment = require('moment');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var branch = require('metalsmith-branch');
var excerpts = require('metalsmith-excerpts');
var Handlebars = require('handlebars');
var fs = require('fs');

Handlebars.registerPartial('header',fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer',fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());
Handlebars.registerPartial('blog_posts',fs.readFileSync(__dirname + '/templates/partials/blog_posts.hbt').toString());
Handlebars.registerPartial('post_header',fs.readFileSync(__dirname + '/templates/partials/post_header.hbt').toString());
Handlebars.registerHelper('formatDate', formatDate);

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
  },
  pictures: {
    pattern: 'content/blog/*/*/*.png'
  }
}));

metal.use(markdown());

metal.use(excerpts());

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

metal.use(templates('handlebars'));

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

function formatDate(_datetime, _format) {
  return moment(new Date(_datetime)).format(_format);
}