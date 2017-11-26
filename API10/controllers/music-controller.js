const fs = require('fs');

exports.streamMusic = (req, res, next) => {
  const key = req.params.key;
  const music = 'music/' + key + '.mp3';
  const stat = fs.statSync(music);
  const range = req.headers.range;
  let readStream;

  if (range !== undefined) {
    const parts = range.replace(/bytes=/, "").split('-');
    const partial_start = parts[0];
    const partial_end = parts[1];

    if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
      return res.sendStatus(500);
    }

    const start = parseInt(partial_start, 10);
    const end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
    const content_length = (end - start) + 1;

    res.status(206).header({
      'Content-Type': 'audio/mpeg',
      'Content-Length': content_length,
      'Content-Range': "bytes " + start + "-" + end + "/" + stat.size;
    });

    readStream = fs.createReadStream(music, { start: start, end: end });
  } else {
    res.header({
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size
    });
    readStream = fs.createReadStream(music);
  }
  readStream.pipe(res);
};
