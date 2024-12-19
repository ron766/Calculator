export default async function handler(req, res) {
  console.log("2 ~ req.body.event", req?.body?.event);
  console.log("3 ~ req.body", req?.body);
  console.log("4 req", req);

  // const code = new URL(req.url).searchParams.get('code');
  console.log("6 🚀 ~ handler ~ req.url:", req.url)
  console.log("8 🚀 ~ handler ~ req.get('host'):", req.get('host'))
  console.log("9 🚀 ~ handler ~ req.protocol:", req.protocol)
  const code = new URL(req.protocol+req.get('host')+req.url).searchParams.get("code")
  console.log("11 🚀 ~ code:", code);

  const body = {
    // redirect_uri: OAUTH_REDIRECT_URI,
    redirect_uri: 'https://calculator.devcontentstackapps.com',
    grant_type: 'authorization_code',
    // client_id: CONTENTSTACK_APP_CLIENT_ID,
    client_id: 'wZ9oZqB7CYMS8eEJ',
    code,
    // client_secret: CONTENTSTACK_APP_CLIENT_SECRET,
    client_secret: 'zeuHMhoSXAQWOzuV1DdQ3GHaNMOsUrGC',
  };

  console.log("21 🚀 ~ handler ~ body:", body)

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
  
  console.log("38 🚀 ~ handler ~ response:", response)
  const responseJSON = await response.json();
  console.log("40 🚀 ~ handler ~ responseJSON:", responseJSON)
 
  if (!response.ok) {
    console.log('43 Debug: Body:', JSON.stringify(body));
    console.error(JSON.stringify(responseJSON));
    throw new Error(JSON.stringify(responseJSON));
  }

  const { access_token, refresh_token, organization_uid } = responseJSON;
  return {
    accessToken: access_token,
    refreshToken: refresh_token,
    organizationUid: organization_uid 
  };
}
