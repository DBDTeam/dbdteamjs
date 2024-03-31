import * as fs from "fs";
import * as https from "https";
import * as path from "path";

async function resolveFile(resource: any): Promise<Buffer> {
  if (Buffer.isBuffer(resource)) return resource;

  if (typeof resource !== "string") {
    throw new TypeError(
      "Invalid resource type. Resource must be a string or a Buffer."
    );
  }

  if (/^https?:\/\//.test(resource)) {
    throw new Error(
      "URL resources are not supported directly. Use fetch to get the resource."
    );
  }

  const file = path.resolve(resource);

  try {
    const stats = await fs.promises.stat(file);
    if (!stats.isFile()) {
      throw new Error("File not found or not a regular file: " + file);
    }
    return await fs.promises.readFile(file);
  } catch (err) {
    throw new Error("Error reading file: " + (err as Error).message);
  }
}

function resolveBase64(data: any) {
  if (!Buffer.isBuffer(data)) {
    throw new TypeError("Invalid data type. Data must be a Buffer.");
  }
  return `data:image/jpg;base64,${data.toString("base64")}`;
}

/**
 * @param {string | Buffer} image
 * @returns {Promise<Buffer | string>}
 */
async function resolveImage(
  image: string | Buffer
): Promise<Record<string, any> | any> {
  if (!image) return null;

  if (typeof image !== "string" && !Buffer.isBuffer(image)) {
    throw new TypeError(
      "Invalid image type. Image must be a string or a Buffer."
    );
  }

  if (typeof image === "string" && image.startsWith("data:")) {
    return image;
  }

  try {
    if (typeof image === "string" && /^(https?|data):\/\//.test(image)) {
      var r = await getImageDataUri(image);
      return { uri: r.uri, buffer: r.buffer };
    }

    const isLocalFile = fs.existsSync(image);
    if (isLocalFile) {
      const file = await resolveFile(image);
      return resolveBase64(file);
    } else if (Buffer.isBuffer(image)) {
      return image;
    } else {
      throw new Error("Unsupported image resource: " + image);
    }
  } catch (err: any) {
    throw new Error("Error resolving image: " + err.message);
  }
}

async function getImageDataUri(
  imageUrl: string
): Promise<{ uri: string; buffer: Buffer }> {
  const options: https.RequestOptions = {
    headers: {
      Accept: "image/*",
    },
  };
  return new Promise((resolve, reject) => {
    https
      .get(imageUrl, options, (response) => {
        const chunks: Array<any> = [];

        response.on("data", (chunk: any) => {
          chunks.push(chunk);
        });

        response.on("end", () => {
          const imageData = Buffer.concat(chunks);
          const mimeType = response.headers["content-type"];
          const base64ImageData = imageData.toString("base64");
          const dataUri = `data:${mimeType};base64,${base64ImageData}`;
          resolve({ uri: dataUri, buffer: imageData });
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// La función resolveFile y resolveBase64 deben estar definidas aquí...

export { resolveImage };
