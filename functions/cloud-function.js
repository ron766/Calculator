export default async function handler(req, res) {
  console.log("2 req", JSON.stringify({
    headers: req.headers,
    method: req.method,
    url: req.url,
    body: req.body,
    event: req?.body?.event,
    path: req.path,
    protocol: req.protocol,
    query: req.query,
    hostname: req.hostname,
    originalUrl: req.originalUrl,
    params: req.params,
}));

  // const code = new URL(req.url).searchParams.get('code');
  // console.log("6 🚀 ~ handler ~ req.url:", req.url)
  // console.log("8 🚀 ~ handler ~ req.get('host'):", req.get('host'))
  // console.log("9 🚀 ~ handler ~ req.protocol:", req.protocol)
  console.log("20 🚀 ~ manual full URL:", 'https://calculator.devcontentstackapps.com'+req.url)
  const code = new URL('https://calculator.devcontentstackapps.com'+req.url).searchParams.get("code")
  console.log("22 🚀 ~ code:", code);

  if (!code) {
    return;
  }

  const body = {
    // redirect_uri: OAUTH_REDIRECT_URI,
    // redirect_uri: 'https://calculator.devcontentstackapps.com',
    redirect_uri: 'https://calculator.devcontentstackapps.com/cloud-function',
    // redirect_uri: 'https://calculator.devcontentstackapps.com/oauth/callback&scope=user:write',

    grant_type: 'authorization_code',
    // client_id: CONTENTSTACK_APP_CLIENT_ID,
    client_id: 'wZ9oZqB7CYMS8eEJ',
    code,
    // client_secret: CONTENTSTACK_APP_CLIENT_SECRET,
    client_secret: 'zeuHMhoSXAQWOzuV1DdQ3GHaNMOsUrGC',
  };

  console.log("35 🚀 ~ handler ~ body:", body)

  const response = await fetch(
    // TOKEN_URL,
    'https://dev11-app.csnonprod.com/apps-api/apps/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  
  console.log("49 🚀 ~ handler ~ response:", response)
  const responseJSON = await response.json();
  console.log("51 🚀 ~ handler ~ responseJSON:", responseJSON)
 
  if (!response.ok) {
    console.log('54 🚀 ~ Debug: Body:', JSON.stringify(body));
    console.error('59 🚀 ~ ', JSON.stringify(responseJSON));
    throw new Error(JSON.stringify(responseJSON));
  }

  // const { access_token, refresh_token, organization_uid } = responseJSON;
  // return {
  //   accessToken: access_token,
  //   refreshToken: refresh_token,
  //   organizationUid: organization_uid 
  // };

  res.redirect(`https://calculator.devcontentstackapps.com`);
}
