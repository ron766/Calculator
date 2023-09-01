const cookieName = "my-token";

export default function handler(req, res) {
  console.log("Debug log for deploymentIdentifier: DEPLOYMENT_IDENTIFIER");

  if (process.env.TEST_VARIABLE !== "TEST_VALUE") {
    throw new Error("Env variable not present");
  }

  if (!req.headers.cookie.includes(cookieName)) {
    throw new Error("Cookie not present");
  }

  setResponseHeaders(res);

  res
    .status(200)
    .setHeader(
      "set-cookie",
      "my-cookie=heres-my-cookie; Path=/; HttpOnly; Secure; SameSite=Lax"
    )
    .setHeader(
      "set-cookie",
      "my-cookie-2=heres-my-cookie-2; Path=/; HttpOnly; Secure; SameSite=Lax"
    )
    .json({
      deploymentIdentifier: "DEPLOYMENT_IDENTIFIER",
      host: req.headers["host"],
    });
}

const responseHeaders = {
  // Authentication
  "www-authenticate": "test-www-authenticate",
  "proxy-authenticate": "test-proxy-authenticate",

  // Caching
  "cache-control": "no-store",
  "clear-site-data": "test-clear-site-data",
  expires: "test-expires",

  // Client Hints
  "accept-ch": "test-accept-ch",

  // Conditionals
  "last-modified": "test-last-modified",
  etag: "test-etag",
  "delta-base": "test-delta-base",

  // Content negotiation
  im: "test-im",

  // CORS
  "access-control-allow-origin": "*",

  // Message body information
  "content-language": "test-content-language",
  "content-location": "test-content-location",

  // Proxies
  via: "test-via",

  // Redirects
  location: "test-location",

  // Response context
  allow: "test-allow",

  // Range requests
  "content-range": "test-content-range",

  // Security
  "cross-origin-embedder-policy": "test-cross-origin-embedder-policy",
  "cross-origin-opener-policy": "test-cross-origin-opener-policy",
  "cross-origin-resource-policy": "test-cross-origin-resource-policy",
  "content-security-policy": "test-content-security-policy",
  "content-security-policy-report-only":
    "test-content-security-policy-report-only",
  "expect-ct": "test-expect-ct",
  "strict-transport-security": "test-strict-transport-security",
  "x-content-type-options": "test-x-content-type-options",
  "x-frame-options": "test-x-frame-options",

  // Other
  link: "test-link",
  "retry-after": "test-retry-after",
  "server-timing": "test-server-timing",
  "x-robots-tag": "test-x-robots-tag",
  "content-md5": "test-content-md5",
};

function setResponseHeaders(res) {
  for (const header in responseHeaders) {
    res.setHeader(header, responseHeaders[header]);
  }
}
