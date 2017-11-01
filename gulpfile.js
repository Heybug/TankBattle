var gulp = require("gulp"),
    babel = require("gulp-babel"),
    htmlmin = require('gulp-htmlmin');


gulp.task('htmlMin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/view/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/view'));
});

gulp.task("babelJS", function () {
    return gulp.src("src/js/*.js")// ES6 源码存放的路径
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest("dist/js")); //转换成 ES5 存放的路径
});

// 监视文件变化，自动执行任务
gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['babelJS']);
    gulp.watch('src/view/*.html', ['htmlMin']);
});

gulp.task('default', ['babelJS', 'htmlMin']);