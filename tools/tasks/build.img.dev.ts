import {join} from 'path';
import {RESOURCE_SRC, RESOURCE_DEST} from '../config';

export = function buildImagesDev(gulp, plugins) {
  return function () {
    return gulp.src([
        join(RESOURCE_SRC, '**/*')
      ])
      .pipe(gulp.dest(RESOURCE_DEST));
  }
}
