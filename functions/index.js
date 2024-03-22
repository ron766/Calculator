import fs from "fs";

function allowCors(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
}

export default function handler(req, res) {
  allowCors(req, res);
  const filePath = "../dist/plugin.system.js";

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JavaScript file:", err);
      res.status(500).send("Error reading JavaScript file");
    }
    res.header("Content-Type", "application/javascript");
    res.status(200).send(data);
  }); 
}
