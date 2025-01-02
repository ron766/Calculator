export default async function handler(req, res) {
  const { body } = req;
  try {
    console.log(" ~ 4 req !eee!", JSON.stringify({
      headers: req.headers,
      method: req.method,
      url: req.url,
      body: body,
      event: req?.body?.event,
      path: req.path,
      protocol: req.protocol,
      query: req.query,
      hostname: req.hostname,
      originalUrl: req.originalUrl,
      params: req.params,
    }));

    const triggerOAuthFlowURL = `https://dev11-app.csnonprod.com/apps/${body.data.app_installation.app_uid}/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`

    console.log("🚀 ~ handler ~ triggerOAuthFlowURL:", triggerOAuthFlowURL)

    if (body.event === "install") {
      res.redirect(triggerOAuthFlowURL);
    }
  } catch (error) {
    console.log("🚀 26 ~ getLaunchProjects ~ error:", error)
  }
}