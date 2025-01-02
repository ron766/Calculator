export default async function handler(req, res) {
    try {
      console.log(" ~ 3 req !555!", JSON.stringify({
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
    
      const fullURL = new URL(
        req.headers['x-forwarded-proto']+"://"+req.headers.host+req.url
      )
      console.log("🚀 20 ~ handler ~ fullURL:", fullURL)
      const code = fullURL.searchParams.get("code");
      console.log("🚀 22 ~ handler ~ code:", code)
      const installation_uid = fullURL.searchParams.get("installation_uid");
      console.log("🚀 24 ~ handler ~ installation_uid:", installation_uid)
    
      if (!code) {
        return;
      }
    
      const body = {
        redirect_uri: req.headers['x-forwarded-proto']+"://"+req.headers.host+'/cloud-function',
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        code,
        client_secret: process.env.CLIENT_SECRET,
      };
    
      console.log("38 🚀 ~ handler ~ body:", body)
    
      const tokenURL = `${req.headers['x-forwarded-proto']}://${req.headers.host}/apps-api/apps/token`
      const response = await fetch(
        // 'https://dev11-app.csnonprod.com/apps-api/apps/token',
        tokenURL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      
      console.log("53 🚀 ~ handler ~ response:", response)
      const responseJSON = await response.json();
      console.log("55 🚀 ~ handler ~ responseJSON:", responseJSON)
     
      if (!response.ok) {
        console.log('58 🚀 ~ Debug: Body:', JSON.stringify(body));
        console.error('59 🚀 ~ ', JSON.stringify(responseJSON));
        throw new Error(JSON.stringify(responseJSON));
      }
    
      const { access_token, refresh_token, organization_uid } = responseJSON;  
    
      const res = await performLaunchOperation(access_token, organization_uid)
      console.log("🚀 ~ 66  handler ~ res:", res)
      return res;
    } catch (error) {
      console.log("🚀 69 ~ handler ~ error:", error)
    }
  }
  
  async function performLaunchOperation (access_token, organization_uid) {
    try {
      console.log("🚀 ~ 75 in performLaunchOperation:", access_token, organization_uid)
      const headers = {
        'Authorization': `Bearer ${access_token}`,
        'content-type': 'application/json',
        'organization_uid': organization_uid,
      };
  
      const body = JSON.stringify({
        operationName: "FetchProjects",
        variables: {},
        query: `query GetExternalGitProviders {
                  getExternalGitProviders(query: {}) {
                    name
                  }
                }`
      });
  
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: body
      };
      console.log("🚀 97 ~ performLaunchOperation ~ requestOptions:", requestOptions)
  
      const response = await fetch(
        // https://eu-launch-api.contentstack.com
        // `https://dev11-app.csnonprod.com/launch-api/manage/graphql`,
        'https://dev-launch-api.csnonprod.com/manage/graphql',
        requestOptions
      );
  
      const responseText = await response.text(); // Use .text() instead of .json() to debug malformed JSON
      console.log("🚀 107 Parsed Response Body:", responseText);
  
      if (!response.ok) {
        console.log("🚀 110 ~ performLaunchOperation ~ response:", response)
        throw new Error(`Failed to create project: ${response.statusText}`);
      }
    
      const responseBody = await response.json();
      console.log("🚀 115 ~ performLaunchOperation ~ responseBody:", responseBody)
    
      return responseBody;
    } catch (error) {
      console.log("🚀 119 ~ performLaunchOperation ~ error:", error)
    }
  }