"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveImage = resolveImage;
const fs = __importStar(require("fs"));
const https = __importStar(require("https"));
const path = __importStar(require("path"));
async function resolveFile(resource) {
    if (Buffer.isBuffer(resource))
        return resource;
    if (typeof resource !== "string") {
        throw new TypeError("Invalid resource type. Resource must be a string or a Buffer.");
    }
    if (/^https?:\/\//.test(resource)) {
        throw new Error("URL resources are not supported directly. Use fetch to get the resource.");
    }
    const file = path.resolve(resource);
    try {
        const stats = await fs.promises.stat(file);
        if (!stats.isFile()) {
            throw new Error("File not found or not a regular file: " + file);
        }
        return await fs.promises.readFile(file);
    }
    catch (err) {
        throw new Error("Error reading file: " + err.message);
    }
}
function resolveBase64(data) {
    if (!Buffer.isBuffer(data)) {
        throw new TypeError("Invalid data type. Data must be a Buffer.");
    }
    return `data:image/jpg;base64,${data.toString("base64")}`;
}
/**
 * @param {string | Buffer} image
 * @returns {Promise<Buffer | string>}
 */
async function resolveImage(image) {
    if (!image)
        return null;
    if (typeof image !== "string" && !Buffer.isBuffer(image)) {
        throw new TypeError("Invalid image type. Image must be a string or a Buffer.");
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
        }
        else if (Buffer.isBuffer(image)) {
            return image;
        }
        else {
            throw new Error("Unsupported image resource: " + image);
        }
    }
    catch (err) {
        throw new Error("Error resolving image: " + err.message);
    }
}
async function getImageDataUri(imageUrl) {
    const options = {
        headers: {
            Accept: "image/*",
        },
    };
    return new Promise((resolve, reject) => {
        https
            .get(imageUrl, options, (response) => {
            const chunks = [];
            response.on("data", (chunk) => {
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
