module.exports = function(grunt) {

  var distFolder = './dist',
    srcFolder = './src';

  var requirejs = {
    compile: {
      options: {
        mainConfigFile: srcFolder + '/main.js',
        out: distFolder + '/js-store.js',
        name: 'main',
        include: ['../build/almond', 'models'],
        exclude: ['backbone'],
        optimize: 'none',
        wrap: {
          "startFile": srcFolder + '/../build/wrap.start',
          "endFile": srcFolder + '/../build/wrap.end'
        }
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