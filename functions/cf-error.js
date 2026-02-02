// ❌ Reference undefined env var during init
const requiredPort = process.env.REQUIRED_PORT;
if (!requiredPort) {
  throw new Error("REQUIRED_PORT is missing");
}

export default function handler(req, res) {
  res.status(200).send("Never reached");
}
