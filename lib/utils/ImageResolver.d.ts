/// <reference types="node" />
/**
 * @param {string | Buffer} image
 * @returns {Promise<Buffer | string>}
 */
declare function resolveImage(image: string | Buffer): Promise<Record<string, any> | any>;
export { resolveImage };
