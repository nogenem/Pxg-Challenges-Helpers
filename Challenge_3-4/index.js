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

  const BASE_SCREEN_RESOLUTION = {
    width: 1920,
    height: 1080,
  };
  // PS: IF THE CARDS AREN'T SHOWING CORRECTLY ON THE WEB PAGE,
  //     TRY TO PASS YOUR SCREEN RESOLUTION WITH QUERY PARAMS:
  //      http://localhost:3000?width_resolution=2560&height_resolution=1080
  const userResolution = {
    width: +req.query.width_resolution || BASE_SCREEN_RESOLUTION.width,
    height: +req.query.height_resolution || BASE_SCREEN_RESOLUTION.height,
  };

  const cropIncrement = {
    width: (userResolution.width - BASE_SCREEN_RESOLUTION.width) / 2,
    height: (userResolution.height - BASE_SCREEN_RESOLUTION.height) / 2,
  };

  // PS: IF THE CARDS AREN'T SHOWING CORRECTLY ON THE WEB PAGE,
  //     TRY TO PLAY AROUND WITH THESE NUMBERS TILL THEY DO... ;x
  const BASE_CROP_VALUES = {
    // These numbers were gotten in resolution 1920x1080
    top: 498 + cropIncrement.height,
    left: 835 + cropIncrement.width,
    width: 64,
    height: 80,
    gap: 13,
  };

  const cropOpts = {
    left: {
      top: {
        top: BASE_CROP_VALUES.top,
        left: BASE_CROP_VALUES.left,
        width: BASE_CROP_VALUES.width,
        height: BASE_CROP_VALUES.height,
      },
      bottom: {
        top:
          BASE_CROP_VALUES.top + BASE_CROP_VALUES.height + BASE_CROP_VALUES.gap,
        left: BASE_CROP_VALUES.left,
        width: BASE_CROP_VALUES.width,
        height: BASE_CROP_VALUES.height,
      },
    },
    right: {
      top: {
        top: BASE_CROP_VALUES.top,
        left:
          userResolution.width -
          (BASE_CROP_VALUES.left + BASE_CROP_VALUES.width),
        width: BASE_CROP_VALUES.width,
        height: BASE_CROP_VALUES.height,
      },
      bottom: {
        top:
          BASE_CROP_VALUES.top + BASE_CROP_VALUES.height + BASE_CROP_VALUES.gap,
        left:
          userResolution.width -
          (BASE_CROP_VALUES.left + BASE_CROP_VALUES.width),
        width: BASE_CROP_VALUES.width,
        height: BASE_CROP_VALUES.height,
      },
    },
  };

  console.log({
    userResolution,
    cropIncrement,
    cropOptsLeft: cropOpts.left,
    cropOptsRight: cropOpts.right,
  });

  const modRow = 3;

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
    console.log('<===================================>');

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

    res.send({ percent, toCompareImage });
  } else {
    res.send({ percent: -1, toCompareImage });
  }
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
