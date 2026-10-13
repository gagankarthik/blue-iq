/* Tell IndexNow engines (Bing, Yandex, Seznam, Naver…) that pages changed.
   Run after a deploy:  npm run indexnow            (every route in the sitemap)
                        npm run indexnow -- /products /solutions
   The key file lives at public/<key>.txt so engines can verify ownership.
   Google does not use IndexNow: submit the sitemap in Search Console. */
const KEY = "0b552b11246343e618100bb26947a480";
const HOST = "blue-iq.ai";
/* every route comes from the live sitemap, so this list can never drift */
async function allPaths() {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>https:\/\/[^/<]+([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
}

const paths = process.argv.slice(2).length ? process.argv.slice(2) : await allPaths();
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: paths.map((p) => `https://${HOST}${p}`) }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${paths.length} URL(s)`);
