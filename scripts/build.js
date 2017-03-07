const del = require('del');
const webpack = require('webpack');
const webpackConfig = require('./../config/webpack.config');
const cpy = require('cpy');
const mkdirp = require('mkdirp')
const fs = require('fs');


const buildWithWebpack = () => {
  return new Promise((resolve, reject) => {
    return webpack(webpackConfig, (err, stats)=>{
      if (err) { return reject(err); }
      console.log(stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true,
      }));
      return resolve();
    })
  });
}

del(['tmp', 'dist'])
.then(() => buildWithWebpack())
.then(()=>{
  return cpy(['lib/Info.plist'], 'dist/safari').then(()=>{
    console.log('copied safari plist');
  });
})
.then(()=>{
  return cpy(['dist/index.html', 'dist/main.trello-pomodoro.js'], 'dist/safari/').then(()=>{
    console.log('set safari!');
  })
})
.then(()=>{
  return cpy(['dist/index.html', 'dist/main.trello-pomodoro.js'], 'dist/firefox/')
  .then(()=>{
    console.log('set firefox!');
  })
})
.then(()=>{
  return cpy(['dist/index.html', 'dist/main.trello-pomodoro.js'], 'dist/chrome/').then(()=>{
    console.log('set chrome!');
  })
})
.then(()=>{
  return del(['dist/index.html', 'dist/main.trello-pomodoro.js']);
})
