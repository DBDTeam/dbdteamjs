const { resolveImage } = require("../utils/ImageResolver.js");
const Endpoints = require("./Endpoints.js");
const https = require("https");

class RequestHandler {
  #lastRequestTime;
  #requestInterval;
  #requestCount;
  /**
   *
   * @param {import("../client/Client").Client} client
   */
  constructor(client) {
    this.client = client;
    this.options = {
      agent: client?.rest?.agent || null,
      baseURL: Endpoints.BASE_URL,
    };
    this.ping = 0;
    this.#requestCount = 0;
    this.#lastRequestTime = Date.now();
    this.#requestInterval = 300;
  }

  async request(method, url, auth, body, reason, files) {
    const finalURL = `https://discord.com${this.options.baseURL}${url}`;

    try {
      await this.waitIfNeeded();

      var headers = {
        "User-Agent": "DiscordBot (https://discord.com)",
      };
      if (method !== "DELETE") {
        headers["Content-Type"] = "application/json";
      }
      if (body?.headers) {
        for (const [key, value] of Object.entries(body?.headers)) {
          headers[key] = value;
        }
      }
      if (auth) {
        headers.Authorization = "Bot " + this.client.token;
      }
      if (reason && typeof reason === "string") {
        headers["X-Audit-Log-Reason"] = reason;
      }
      if (files) {
        headers["Content-Type"] = "multipart/form-data; boundary=boundary";
      }
      const options = {
        method: method,
        headers: headers,
      };

      const response = await this.makeResponse(
        finalURL,
        options,
        body,
        files,
        method,
        headers
      );

      return response;
    } catch (error) {
      this.client.emit("error", error);
      return null;
    }
  }

  makeResponse(finalURL, options, body, files, method, headers) {
    const a = Date.now();
    return new Promise(async (resolve, reject) => {
      const req = https.request(finalURL, options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        headers.Authorization = `Bot <censored>`;
        res.on("end", () => {
          this.client.emit("debug", "An API Request was responsed correctly.");
          data?.includes("{") ? (data = JSON.parse(data)) : "";
          if (!(res.statusCode >= 200 && res.statusCode < 300)) {
            const errMsg = {
              type: "Request Handler Errror",
              d: {
                status: res.statusCode,
                error: data,
                data: { method, url: finalURL, headers },
                statusMessage: res.statusMessage,
              },
              time: new Date(),
              shard: "Unknown",
              error: true,
            };
            this.client.emit("error", errMsg);
            resolve(errMsg);
          }
          this.ping = Date.now() - a;
          resolve({ status: res.statusCode, data: data, error: false });
        });
      });

      req.on("error", (error) => {
        this.client.emit("error", error);
        return reject(null);
      });

      if (["PATCH", "POST", "PUT"].includes(options.method)) {
        if (body?.data && !files) {
          req.write(JSON.stringify(body?.data));
        } else if (files) {
          if (body?.data) {
            req.write(`--boundary\r\n`);
            req.write(
              `Content-Disposition: form-data; name="payload_json"\r\n`
            );
            req.write(`Content-Type: application/json\r\n\r\n`);
            req.write(JSON.stringify(body.data || {}));
            req.write("\r\n");
          }
          for (var f in files) {
            var file = files[f];
            var x = await resolveImage(file.url);
            var b = typeof x === "string" ? x : x?.buffer;
            var i = b instanceof ArrayBuffer ? x : b;
            req.write(`--boundary\r\n`);
            req.write(
              `Content-Disposition: form-data; name="files[${f}]"; filename="${file.name}"\r\n\r\n`
            );
            req.write(i);
            req.write("\r\n");
          }

          req.write(`--boundary--\r\n`);
        }
      }

      req.end();
    });
  }

  async waitIfNeeded() {
    const currentTime = Date.now();
    const timeSinceLastRequest = currentTime - this.#lastRequestTime;
    if (timeSinceLastRequest >= this.#requestInterval) {
      this.#requestCount = 0;
    }

    this.#requestCount++;
    this.#lastRequestTime = currentTime;

    if (this.#requestCount % 3 === 0) {
      await this._sleep(1500);
    }
  }

  _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = RequestHandler;
