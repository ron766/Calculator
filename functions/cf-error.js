export default async function handler(req, res) {
  console.log("4 ~ here");

  throw new Error("Intentional Lambda failure");
}
