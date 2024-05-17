export default async function handler(req, context) {
  console.log('context::::', context)
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;

  if (route === '/test') {
    const res = await fetch(`https://random-data-api.com/api/v2/appliances`);
    let response = await res.json();
    response = {
      ...response,
      time: new Date(),
      envVariableValue: envVariable,
      changes: 'remove context.waitUntil promise'
    }
    return new Response(JSON.stringify(response), {
      headers: {
        'X-Message': 'Change response headers'
      }
    })
  }

  return fetch(req)
}
