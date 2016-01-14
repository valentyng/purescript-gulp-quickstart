import gulp from 'gulp'
import purescript from 'gulp-purescript'
import run from 'gulp-run'

const config = {
  'test': {
    'src': [
      'test/**/*.purs',
      'src/**/*.purs',
      'bower_components/purescript-*/src/**/*.purs'
    ],
    'ffi': [
      'test/**/*.js',
      'src/**/*.js',
      'bower_components/purescript-*/src/**/*.js'
    ]
  },
  'src': {
    'src': [
      'src/**/*.purs',
      'bower_components/purescript-*/src/**/*.purs'
    ],
    'ffi': [
      'src/**/*.js',
      'bower_components/purescript-*/src/**/*.js'
    ]
  }
}

gulp.task('psc', () => {
  return purescript.psc({ src: config.src.src, ffi: config.src.ffi })
})

gulp.task('bundle', ['psc'], () => {
  return purescript.pscBundle({
    src: 'output/**/*.js',
    output: 'dist/bundle.js' })
})

gulp.task('test-build', ['psc'], () => {
  return purescript.psc({ src: config.test.src, ffi: config.test.ffi })
})

gulp.task('test', ['test-build'], () => {
  return purescript
    .pscBundle({ src: 'output/**/*.js', main: 'Test.Main'})
    .pipe(run('node'))
});
