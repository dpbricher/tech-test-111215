var gulp        = require("gulp");


function js(){
    gulp.src("src/**/*.js")
    .pipe(gulp.dest("dist/src/"));
}

function html(){
    gulp.src("src/index.html")
    .pipe(gulp.dest("dist/"));

    gulp.src("src/**/*.xml")
    .pipe(gulp.dest("dist/src/"));
}

function libs(){
    gulp.src("lib/**/*.js")
    .pipe(gulp.dest("dist/src/"));
}

function all(){
    js();
    html();
    libs();
}

function watch(){
    gulp.watch("src/**/*.js", wlc(js));
    gulp.watch(["src/index.html", "src/**/*.xml"], wlc(html));
    gulp.watch("libs/**/*.js", wlc(libs));
}

function buildWatch(){
    all();
    watch();
}

// adds log message for watch callbacks
function wlc(cb){
    return function(event){
        var hms = /\d\d:\d\d:\d\d/.exec(new Date);
        console.log("[%s] file:%s, type:%s", hms, event.path, event.type);
        cb();
    };
}

gulp.task("default", all);

gulp.task("watch", watch);
gulp.task("build-watch", buildWatch);

// aliases
gulp.task("w", watch);
gulp.task("bw", buildWatch);
