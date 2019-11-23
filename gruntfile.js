module.exports = function(grunt) {
  require("jit-grunt")(grunt);

  grunt.initConfig({
    sass: {
      options: {
        style: "expanded"
      },
      files: {
        src: "assets/css/main.scss",
        dest: "style.css"
      }
    },
    postcss: {
      prod: {
        options: {
          processors: [
            require("pixrem")(), // add fallbacks for rem units
            require("autoprefixer")(),
            require("cssnano")() // minify the result
          ]
        },
        src: "assets/css/style.css",
        dest: "style.css"
      }
    },
    svgstore: {
      options: {
        prefix: "icon-",
        includedemo: true
      },
      dev: {
        files: {
          "assets/icons/icons.svg": ["assets/icons/input/*.svg"]
        }
      },
      prod: {
        files: {
          "dist/assets/icons/icons.svg": ["assets/icons/input/*.svg"]
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"]
      },
      dist: {
        files: {
          "dist/assets/js/scripts.js": "assets/js/scripts.js"
        }
      }
    },
    imagemin: {
      default: {
        files: [
          {
            expand: true,
            cwd: 'assets/images/',
            src: ["**/*.{png,jpg,gif}"],
            dest: "dist/assets/images/"
          }
        ]
      }
    },
    browserSync: {
      bsFiles: {
        src: ["style.css", "**/*.php", "_site/assets/js/*.js"]
      },
      options: {
        watchTask: true,
        proxy: "http://streetfood:8888"
      }
    },
    watch: {
      css: {
        files: ["assets/css/*.scss"],
        tasks: ["sass"]
      },
      svg: {
        files: ["assets/icons/input/*.svg"],
        tasks: ["svgstore:dev"]
      }
    }
  });

  grunt.registerTask("dev", ["browserSync", "watch"]);
  grunt.registerTask("build", ["imagemin", "htmlmin", "svgstore:prod", "postcss", "babel"]);
};