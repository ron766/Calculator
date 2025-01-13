

export default async function handler(req, res) {
  try {
    console.log(" ~ 3 req !444!", JSON.stringify({
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
    // console.log("20 🚀 ~ manual full URL:", 'https://calculator.devcontentstackapps.com'+req.url)
    const fullURL = new URL(
      req.headers['x-forwarded-proto']+"://"+req.headers.host+req.url
    )
    console.log("🚀 25 ~ handler ~ fullURL:", fullURL)
    const code = fullURL.searchParams.get("code");
    console.log("🚀 27 ~ handler ~ code:", code)
    const installation_uid = fullURL.searchParams.get("installation_uid");
    console.log("🚀 29 ~ handler ~ installation_uid:", installation_uid)
  
    if (!code) {
      return;
    }
  
    const body = {
      // redirect_uri: OAUTH_REDIRECT_URI,
      // redirect_uri: 'https://calculator.devcontentstackapps.com',
      redirect_uri: req.headers['x-forwarded-proto']+"://"+req.headers.host+'/cloud-function',
      // redirect_uri: 'https://calculator.devcontentstackapps.com/oauth/callback&scope=user:write',
  
      grant_type: 'authorization_code',
      // client_id: CONTENTSTACK_APP_CLIENT_ID,
      client_id: process.env.CS_AUTH_CLIENT_ID,
      code,
      // client_secret: CONTENTSTACK_APP_CLIENT_SECRET,
      client_secret: process.env.CS_AUTH_CLIENT_SECRET,
    };
  
    console.log("49 🚀 ~ handler ~ body:", body)
  
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
    
    console.log("63 🚀 ~ handler ~ response:", response)
    const responseJSON = await response.json();
    console.log("65 🚀 ~ handler ~ responseJSON:", responseJSON)
   
    if (!response.ok) {
      console.log('68 🚀 ~ Debug: Body:', JSON.stringify(body));
      console.error('69 🚀 ~ ', JSON.stringify(responseJSON));
      throw new Error(JSON.stringify(responseJSON));
    }
  
    const { access_token, refresh_token, organization_uid } = responseJSON;
    // return {
    //   accessToken: access_token,
    //   refreshToken: refresh_token,
    //   organizationUid: organization_uid 
    // };
  
    // res.redirect(
    //   `https://dev11-app.csnonprod.com/#!/marketplace/installed-apps/${installation_uid}/configuration?tab=configuration`
    // );
  
  
    const res = await getLaunchProjects(access_token, organization_uid)
    console.log("🚀 ~ 86  handler ~ res:", res)
    return res;
  } catch (error) {
    console.log("🚀 89 ~ handler ~ error:", error)
  }
}

async function getLaunchProjects (access_token, organization_uid) {
  try {
    console.log("🚀 ~ 93 in getLaunchProjects:", access_token, organization_uid)
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'content-type': 'application/json',
      'organization_uid': organization_uid,
    };

    const body = JSON.stringify({
      operationName: "DeleteExternalGitProvider",
      variables: {},
      query: `mutation DeleteExternalGitProvider {
                deleteExternalGitProvider(query: {externalGitProvider: {uid: "656471b6beef0bc09004f69a"}}) {
                  uid
                  name
                }
              }`
    });

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: body
    };
    console.log("🚀 115 ~ getLaunchProjects ~ requestOptions:", requestOptions)

    const response = await fetch(
      // https://eu-launch-api.contentstack.com
      // `https://dev11-app.csnonprod.com/launch-api/manage/graphql`,
      'https://dev-launch-api.csnonprod.com/manage/graphql',
      requestOptions
    );

    const responseText = await response.text(); // Use .text() instead of .json() to debug malformed JSON
    console.log("🚀 129 Parsed Response Body:", responseText);

    if (!response.ok) {
      console.log("🚀 132 ~ getLaunchProjects ~ response:", response)
      throw new Error(`Failed to create project: ${response.statusText}`);
    }
  
    const responseBody = await response.json();
    console.log("🚀 137 ~ getLaunchProjects ~ responseBody:", responseBody)
  
    return responseBody;
  } catch (error) {
    console.log("🚀 141 ~ getLaunchProjects ~ error:", error)
  }
}
