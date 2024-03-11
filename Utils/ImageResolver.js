const fs = require('node:fs');
const path = require('path');
const https = require("https")

async function resolveFile(resource) {
  if (Buffer.isBuffer(resource)) return resource;

  if (typeof resource !== 'string') {
    throw new TypeError('Invalid resource type. Resource must be a string or a Buffer.');
  }

  if (/^https?:\/\//.test(resource)) {
    throw new Error('URL resources are not supported directly. Use fetch to get the resource.');
  }

  const file = path.resolve(resource);

  try {
    const stats = await fs.stat(file);
    if (!stats.isFile()) {
      throw new Error('File not found or not a regular file: ' + file);
    }
    return await fs.readFile(file);
  } catch (err) {
    throw new Error('Error reading file: ' + err.message);
  }
}

function resolveBase64(data) {
  if (!Buffer.isBuffer(data)) {
    throw new TypeError('Invalid data type. Data must be a Buffer.');
  }
  return `data:image/jpg;base64,${data.toString('base64')}`;
}

async function resolveImage(image) {
  if (!image) return null;

  if (typeof image !== 'string' && !Buffer.isBuffer(image)) {
    throw new TypeError('Invalid image type. Image must be a string or a Buffer.');
  }

  if (typeof image === 'string' && image.startsWith('data:')) {
    return image;
  }

  try {
    if (typeof image === 'string' && /^(https?|data):\/\//.test(image)) {
      var r = await getImageDataUri(image)
      return { uri: r.uri, buffer: r.buffer };
    }
    
    const isLocalFile = fs.existsSync(image);
    if (isLocalFile) {
      const file = await resolveFile(image);
      return resolveBase64(file);
    } else if (Buffer.isBuffer(image)) {
      return image;
    } else {
      throw new Error('Unsupported image resource: ' + image);
    }
  } catch (err) {
    throw new Error('Error resolving image: ' + err.message);
  }
}

module.exports = { resolveImage };

async function getImageDataUri(imageUrl) {
    return new Promise((resolve, reject) => {
        https.get(imageUrl, { responseType: 'arraybuffer' }, (response) => {
            const chunks = [];

            response.on('data', (chunk) => {
                chunks.push(chunk);
            });

            response.on('end', () => {
                const imageData = Buffer.concat(chunks);
                const mimeType = response.headers['content-type'];
                const base64ImageData = imageData.toString('base64');
                const dataUri = `data:${mimeType};base64,${base64ImageData}`;
                resolve({uri: dataUri, buffer: imageData});
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}