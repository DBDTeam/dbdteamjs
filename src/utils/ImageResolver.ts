import * as fs from "fs";
import * as https from "https";
import * as path from "path";

/**
 * Reads a local file and returns its content as a Buffer.
 * @param {string | Buffer} resource - File path or buffer.
 * @returns {Promise<Buffer>} - File content as a Buffer.
 */
async function resolveFile(resource: any) {
  if (Buffer.isBuffer(resource)) return resource;

  if (typeof resource !== "string") {
    throw new TypeError("Resource must be a string or a Buffer.");
  }

  if (/^https?:\/\//.test(resource)) {
    throw new Error("URL resources are not supported. Use fetch to get the resource.");
  }

  const file = path.resolve(resource);

  try {
    const stats = await fs.promises.stat(file);
    if (!stats.isFile()) {
      throw new Error("File not found or not a regular file: " + file);
    }
    return await fs.promises.readFile(file);
  } catch (err: any) {
    throw new Error("Error reading file: " + err.message);
  }
}

/**
 * Converts a Buffer to a Base64 Data URI.
 * @param {Buffer} data - The buffer to convert.
 * @returns {string} - Base64 Data URI.
 */
function resolveBase64(data: any) {
  if (!Buffer.isBuffer(data)) {
    throw new TypeError("Data must be a Buffer.");
  }
  return `data:image/jpg;base64,${data.toString("base64")}`;
}

/**
 * Resolves an image resource to a Base64 Data URI or a Buffer.
 * @param {string | Buffer} image - The image resource (URL, local path, or Buffer).
 * @returns {Promise<{ uri: string, buffer: Buffer, type: string }>} - Resolved image information.
 */
async function resolveImage(image: any) {
  if (!image) return null;

  if (typeof image !== "string" && !Buffer.isBuffer(image)) {
    throw new TypeError("Image must be a string or a Buffer.");
  }

  if (typeof image === "string" && image.startsWith("data:")) {
    return { uri: image, buffer: null, type: "data-uri" };
  }

  try {
    if (typeof image === "string" && /^(https?|data):\/\//.test(image)) {
      const { uri, buffer, type } = await getImageDataUri(image);
      return { uri, buffer, type };
    }

    if (typeof image === "string" && fs.existsSync(image)) {
      const fileBuffer = await resolveFile(image);
      const base64 = resolveBase64(fileBuffer);
      return { uri: base64, buffer: fileBuffer, type: "local-file" };
    }

    if (Buffer.isBuffer(image)) {
      return { uri: null, buffer: image, type: "buffer" };
    }

    throw new Error("Unsupported image resource: " + image);
  } catch (err: any) {
    throw new Error("Error resolving image: " + err.message);
  }
}

/**
 * Fetches an image from a URL and converts it to a Base64 Data URI.
 * @param {string} imageUrl - The URL of the image.
 * @returns {Promise<{ uri: string, buffer: Buffer, type: string }>} - Resolved image information.
 */
async function getImageDataUri(imageUrl: string): Promise<{ uri: any, buffer: any, type: any }> {
  const options = { headers: { Accept: "image/*" } };

  return new Promise((resolve, reject) => {
    https
      .get(imageUrl, options, (response) => {
        const chunks: any[] = [];
        const mimeType = response.headers["content-type"];

        if (!mimeType || !mimeType.startsWith("image/")) {
          reject(new Error("The resource is not a valid image."));
          return;
        }

        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          const imageData = Buffer.concat(chunks);
          const base64ImageData = imageData.toString("base64");
          const dataUri = `data:${mimeType};base64,${base64ImageData}`;
          resolve({ uri: dataUri, buffer: imageData, type: mimeType });
        });
      })
      .on("error", reject);
  });
}

export { resolveImage };
