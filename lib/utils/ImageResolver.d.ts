/**
 * Resolves an image resource to a Base64 Data URI or a Buffer.
 * @param {string | Buffer} image - The image resource (URL, local path, or Buffer).
 * @returns {Promise<{ uri: string, buffer: Buffer, type: string }>} - Resolved image information.
 */
declare function resolveImage(image: any): Promise<{
    uri: any;
    buffer: any;
    type: any;
} | null>;
export { resolveImage };
