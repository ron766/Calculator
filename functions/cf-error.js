// ❌ Require a module that does not exist
import nonExistentModule from "./this-file-does-not-exist";

export default function handler(req, res) {
  res.status(200).send("Never reached");
}
