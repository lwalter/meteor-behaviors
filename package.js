Package.describe({
  name: 'lwalter:meteor-behaviors',
  version: '0.0.1',
  summary: 'Provides behaviors for Meteor MongoDB collections',
  documentation: 'README.md',
  git: 'https://github.com/lwalter/meteor-behaviors'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');
  var CLIENT_SERVER = ['client', 'server'];

  var packages = [
    'meteor-platform@1.2.2',
    'mongo@1.1.0',
    'minimongo@1.0.8',
    'matb33:collection-hooks@0.8.0'
  ];

  api.use(packages);

  api.addFiles([
    'lib/behaviors.js'
  ], CLIENT_SERVER);

  api.export('Behaviors', CLIENT_SERVER);
});

Package.onTest(function (api) {
  var CLIENT_SERVER = ['client', 'server'];

  var packages = [
    'lwalter:meteor-behaviors@0.0.1',
    'mongo@1.1.0',
    'sanjo:jasmine@0.15.5',
    'velocity:html-reporter@0.8.2'
  ];

  api.use(packages);
  api.addFiles('test/behaviors.js', CLIENT_SERVER);
});
