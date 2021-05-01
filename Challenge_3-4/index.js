const express = require('express');
const fs = require('fs');

const sharp = require('sharp');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('.'));

app.get('/images', async (req, res) => {
  const directoryPath = __dirname;
  const croppedImageExt = '.cropped.png';
  const cropOpts = {
    // When the images are on the left of the character
    left: {
      // When the character is next to the top card when taking the print
      top: {
        top: 496,
        left: 835,
        width: 63,
        height: 81,
      },
      // When the character is next to the bottom card when taking the print
      bottom: {
        top: 589,
        left: 835,
        width: 63,
        height: 81,
      },
    },
    // When the images are on the right of the character
    right: {
      top: {
        top: 496,
        left: 1022,
        width: 63,
        height: 81,
      },
      bottom: {
        top: 589,
        left: 1022,
        width: 63,
        height: 81,
      },
    },
  };
  const modRow = 3;
  const modCol = 10;

  fs.readdir(directoryPath, async function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    const images = files.filter(
      file => file.endsWith('.png') && !file.endsWith(croppedImageExt),
    );
    const orderedImages = [];

    if (images.length % modRow !== 0) {
      console.error(
        `THE NUMBER OF IMAGES DOESNT MATCH! (${images.length} / ${modRow})`,
      );
      return false;
    }

    let len = images.length / modRow;
    // in 1 collumn you start from above and the other you start from below
    let inverted = false;
    for (let i = 0; i < len; i += 1) {
      const j = i * modRow;
      if (!inverted) {
        orderedImages.push(images[j]);
        orderedImages.push(images[j + 1]);
        orderedImages.push(images[j + 2]);
      } else {
        orderedImages.push(images[j + 2]);
        orderedImages.push(images[j + 1]);
        orderedImages.push(images[j]);
      }
      inverted = !inverted;
    }

    const croppedImages = [];
    const promises = [];
    len = orderedImages.length;
    orderedImages.forEach((image, idx) => {
      const cropOpt = idx < len - modRow ? cropOpts.left : cropOpts.right;

      let toFile = image + '.1' + croppedImageExt;
      console.log({ image, idx, cropOpt, toFile });
      promises.push(sharp(image).extract(cropOpt.top).toFile(toFile));
      croppedImages.push(toFile);

      toFile = image + '.2' + croppedImageExt;
      promises.push(sharp(image).extract(cropOpt.bottom).toFile(toFile));
      croppedImages.push(toFile);
    });

    await Promise.all(promises);

    res.send(croppedImages);
  });
});

app.post('/get_match_percent', async (req, res) => {
  const baseImage = `./${req.body.baseImage}`;
  const toCompareImage = `./${req.body.toCompareImage}`;

  if (fs.existsSync(baseImage) && fs.existsSync(toCompareImage)) {
    const img1 = PNG.sync.read(fs.readFileSync(baseImage));
    const img2 = PNG.sync.read(fs.readFileSync(toCompareImage));
    const { width, height } = img1;

    const dif = pixelmatch(img1.data, img2.data, null, width, height, {
      threshold: 0.1,
      includeAA: true,
    });

    // https://stackoverflow.com/a/58872979
    const percent = 100 - (dif * 100) / (width * height);

    res.send({ percent });
  } else {
    res.send({ percent: -1 });
  }
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
