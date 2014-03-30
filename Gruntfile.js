module.exports = function(grunt) {

  var distFolder = "./dist",
    srcFolder = "./src";

  var requirejs = {
    compile: {
      options: {
        mainConfigFile: srcFolder + '/main.js',
                    name            : "main",
                    out             : distFolder + "/main.js"
      }
    }
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    requirejs: requirejs,
    clean    : [distFolder]
  });

  // Uncomment to prevent code minification
  // grunt.config("requirejs.compile.options.optimize", "none");

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build:noDeps', 'Build js-store non minified and without Backbone dependencies', function() {

    // Adapt the requirejs config to output
    // a module without the backbone dependencies
    delete requirejs.compile.options.name;
    delete requirejs.compile.options.out;
    requirejs.compile.options.dir = distFolder;
    requirejs.compile.options.optimize = 'none';
    requirejs.compile.options.modules = [
      {
        name   : "main",
        exclude: ["backbone"]
      }
    ];

    grunt.config("requirejs", requirejs);
    grunt.task.run('default');
  });

  grunt.registerTask('default', ['clean', 'requirejs']);
};