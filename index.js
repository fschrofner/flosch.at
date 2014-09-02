var Metalsmith = require('metalsmith');
var moment = require('moment');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var branch = require('metalsmith-branch');
var excerpts = require('metalsmith-excerpts');
var tags = require('metalsmith-tags');
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
  }
}));

metal.use(markdown());

metal.use(excerpts());

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

metal
    .use(tags({
        handle: 'tags',                 // yaml key for tag list in you pages
        path:'tag',                     // path for result pages
        template:'/templates/tag.hbt',  // template to use for tag listing
      sortBy: 'date',                   // provide posts sorted by 'date' (optional)
      reverse: true                     // sort direction (optional)
    }));
    

metal.build();

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