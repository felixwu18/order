var gulp = require('gulp'); //等价于import
var uglify = require('gulp-uglify'); //导入js压缩模块
var less = require('gulp-less'); //导入转义less的gulp-less模块
var concat = require('gulp-concat'); //导入代码合并的模块gulp-concat
var rename = require('gulp-rename'); //导入重命名的模块gulp-rename
var htmlMin = require('gulp-htmlmin'); //导入压缩html的文件
var babel = require('gulp-babel'); //js转义
var cleanCss = require('gulp-clean-css'); //导入压缩css
var imageMin = require('gulp-imagemin'); //导入压缩图片的模块
var livereload = require('gulp-livereload'); //实时刷新,官网有加,与官网一致
var connect = require('gulp-connect'); //填充页面
var open = require('open'); //open可以自动打开指定的链接

//注册合并压缩js的任务
gulp.task('js', function() {
 return gulp.src('src/js/*.js') //获取要操作的文件流
            // .pipe(babel())
            // .pipe(concat('build.js'))//合并文件,并命名
            // .pipe(gulp.dest('dist/js'))// 临时输出文件到本地
            .pipe(uglify()) //压缩文件
            // .pipe(rename({suffix:'.min'}))//重命名
            .pipe(gulp.dest('dist/js')) //输出最终压缩的文件
            // .pipe(livereload()) //实时刷新
            // .pipe(connect.reload()) //

});

//注册转换less的任务
gulp.task('less', function() {
   return gulp.src('src/less/*.less') //找到目标文件,将数据读取到gulp内存中
              .pipe(less()) //编译less为css
              .pipe(gulp.dest('src/css'))
              .pipe(livereload()) //实时刷新
              .pipe(connect.reload()) //
});

//注册合并压缩css文件
gulp.task('css', ['less'], function() { //依赖less的执行,less执行后生成文件,才会被css执行操作,
  return gulp.src('src/css/*.css') //获取要操作的文件流
    // .pipe(concat('build.css'))//合并文件并重命名
    // .pipe(rename({suffix:'.min'}))//加后缀名语义化,重命名
      .pipe(cleanCss({
        compatibility: 'ie7'
      })) //压缩css并兼容ie7
      .pipe(gulp.dest('dist/css'))
      .pipe(livereload()) //实时刷新
      .pipe(connect.reload()) //
});

//注册压缩html的任务
gulp.task('html', function() {
      var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true //压缩HTML
      };
  //根目录的首页
  gulp.src('src/*.html') //找到目标文件,将数据读取到gulp内存中
      .pipe(htmlMin(options)) //压缩html文件
      .pipe(gulp.dest('dist'))
      .pipe(livereload()) //实时刷新
      .pipe(connect.reload()) //
  //page里的页面
  gulp.src('src/page/*.html') //找到目标文件,将数据读取到gulp内存中
      .pipe(htmlMin(options)) //压缩html文件
      .pipe(gulp.dest('dist/page'))
      .pipe(livereload()) //实时刷新
      .pipe(connect.reload()) //
});

//注册压缩图片的任务
gulp.task('img', function() {
  var options = {
    optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
    progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
    interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
    multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
  }
  return gulp.src('src/img/*.{png,jpg,gif,ico}')
             .pipe(imageMin({options}))
             .pipe(gulp.dest('dist/img'))
             .pipe(livereload()) //实时刷新
});

//注册公共文件夹
gulp.task('public',function(){
       // 公共js文件
      gulp.src('src/public/*.js')
          .pipe(gulp.dest('dist/public'))
          .pipe(livereload()) //实时刷新
      //公共css文件
      gulp.src('src/public/*.css')
          .pipe(gulp.dest('dist/public'))
          .pipe(livereload()) //实时刷新
})

//注册默认任务
gulp.task('default', ['js', 'less', 'css', 'html','public']);


//注册监听任务(半自动)
gulp.task('watch', ['default'], function() {
  console.log('gulp监听成功运行...')
  //开启监听
  livereload.listen();
  //确认监听的目标以及绑定相应的任务
  gulp.watch(['src/less/*.less', 'src/css/*.css'], ['css']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/**/*.html', ['html']);
  // gulp.watch('src/img/*.{png,jpg,gif,ico}',['img']);
});

//注册监听任务(全自动)
gulp.task('server', ['default'], function() {
  console.log('gulp监听成功运行...')
  //配置服务器的选项
  connect.server({
    root: 'dist/page/', //输出文件根目录
    livereload: true, //实时刷新
    port: 5000
  });
  //open可以自动打开指定的链接
  open('http://localhost:5000');
  //确认监听的目录以及绑定相应的任务
  gulp.watch(['src/less/*.less', 'src/css/*.css'], ['css']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/*.html', ['html']);
});
