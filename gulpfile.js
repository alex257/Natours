const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      browserSync  = require('browser-sync').create(),
      autoprefixer =require('gulp-autoprefixer');

	 
      
	 function style () {
	 
        return gulp.src('src/scss/**/*.scss',{
              sourcemaps: true
            })
        
         .pipe(sass().on('error', sass.logError))

         .pipe(autoprefixer({
            browsers: ['last 2 version', '> 5%'],
            cascade: false
          }))
       
         .pipe(gulp.dest("src/css"))
          
         .pipe(browserSync.stream())
       
       };
  
       /*function copyHtml () {
       
          return  gulp.src('src/*.html')
         
           .pipe(gulp.dest('dist'))
            
           //.pipe(browserSync.stream());
         
         };
  
      function copyImages () {
       
          return  gulp.src('src/img/*.{gif,jpg,png,svg}')
           .pipe(gulp.dest('dist/img'))
         }; 
       */
  
       function watch(){
          
        browserSync.init({
            server: "./src"
        });
    
      
          gulp.watch('src/scss/**/*.scss', style); 
          //gulp.watch('src/*.html', copyHtml);
          gulp.watch('src/*.html').on('change', browserSync.reload);
          //gulp.watch('src/img/*.{gif,jpg,png,svg}', copyImages);
          //gulp.watch('src/js/*.js').on('change', browserSync.reload);  
       }
       
       
       exports.style = style;
       //exports.copyHtml = copyHtml;
       //exports.copyImages = copyImages;
       exports.watch = watch;
      // exports.default = build;
       
       
      
      var build = gulp.parallel(style, watch);
      gulp.task(build);
      gulp.task('default', build);
      