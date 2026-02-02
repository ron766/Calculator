// ❌ Crash during initialization (before handler is even registered)
throw new Error("Intentional startup crash to reproduce CF001");

export default function handler(req, res) {
  res.status(200).send("This will never run");
}
