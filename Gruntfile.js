module.exports = function(grunt) {

  var distFolder = "./dist",
    srcFolder = "./src";

  var requirejs = {
    compile: {
      options: {
        mainConfigFile: srcFolder + '/main.js',
        dir: distFolder,
        optimize: 'none',
        wrap: {
          "startFile": srcFolder + "/../build/wrap.start",
          "endFile": srcFolder + "/../build/wrap.end"
        },
        modules: [
          {
            name   : "main",
            exclude: ["backbone"],
            include: ['../build/almond']
          }
        ]
      }
    }
  };

  grunt.initConfig({
    pkg       : grunt.file.readJSON('package.json'),
    requirejs : requirejs,
    clean     : [distFolder]
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['clean', 'requirejs']);
};