var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var Handlebars = require('handlebars');
var fs = require('fs');

Handlebars.registerPartial('header',fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer',fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(collections({
    pages: {
      pattern: 'content/pages/*.md'
    },
    blog: {
      pattern: 'content/blog/*/*/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(permalinks({
    pattern: ':collection/:title'
  }))
  .use(markdown())
  .use(templates('handlebars'))
  .build()
  