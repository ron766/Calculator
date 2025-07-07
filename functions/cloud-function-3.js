export default function handler(req, res) {
  console.log("4 ~ here");

  res
    .status(200)
    .send('CF working');
}
