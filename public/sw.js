async function handleRequest(e) {
  const client = await clients.get(e.clientId);

  //so if your on https://proxysite.com/go/https://example.com
  //and there is a script tag for "/test.js"

  const result = {
    url: e.request.url, //https://proxysite.com/test.js
    location: location.href, //https://proxysite.com/sw.js (this)
    clientURL: client?.url || "", //https://proxysite.com/go/https://example.com
  };

  //so basically the sw can get a request for https://proxysite.com/test.js and know it was made from https://proxysite.com/go/https://example.com
  //so you dont need to rewrite css or html
  //and html links are intercepted with a mutation observer or something

  return new Response(JSON.stringify(result, null, 4), {
    headers: {
      "content-type": "text/json",
    },
    status: 200,
  });
}

self.addEventListener("fetch", (e) => {
  e.respondWith(handleRequest(e));
});
