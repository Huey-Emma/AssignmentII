const { get } = require('http');
const { writeFile } = require('fs/promises');
const { join } = require('path');
const { StringDecoder } = require('string_decoder');

const url = 'http://jsonplaceholder.typicode.com/posts';

const request = get(url, res => {
  let data = '';
  const decoder = new StringDecoder();

  res.on('data', chunk => {
    data += decoder.write(chunk);
  });

  res.on('end', () => {
    data += decoder.end();
    const filePath = join(__dirname, '/result', 'posts.json');

    writeFile(filePath, data)
      .then(() => {
        console.log('Data written to file successfully');
      })
      .catch(console.error);
  });
});

request.on('error', err => {
  console.error(err);
});
