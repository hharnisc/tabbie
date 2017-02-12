const fs = require('fs');
const NodeZip = require('node-zip');
const glob = require('glob');

const zip = new NodeZip();
const version = JSON.parse(fs.readFileSync('manifest.json')).version;

const options = {
  ignore: [
    'node_modules/**',
    'docs/**',
    'store/**',
    'src/**',
    'zip.js',
    'package.json',
  ],
};

glob('**/*', options, (err, files) => {
  files.forEach((file) => {
    zip.file(file, fs.readFileSync(file), { binary: true });
  });
  const data = zip.generate({ base64: false, compression: 'DEFLATE' });
  fs.writeFileSync(`tabbie-${version}.zip`, data, 'binary');
});
