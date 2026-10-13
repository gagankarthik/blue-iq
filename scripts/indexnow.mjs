/* Tell IndexNow engines (Bing, Yandex, Seznam, Naver…) that pages changed.
   Run after a deploy:  npm run indexnow            (every route)
                        npm run indexnow -- /products /solutions
   The key file lives at public/<key>.txt so engines can verify ownership.
   Google does not use IndexNow: submit the sitemap in Search Console. */
const KEY = "0b552b11246343e618100bb26947a480";
const HOST = "blue-iq.ai";
const ALL = [
  "/", "/platform", "/products",
  "/solutions", "/solutions/it", "/solutions/education", "/solutions/workforce", "/solutions/healthcare", "/solutions/legal", "/solutions/procurement",
  "/resources", "/trust", "/about", "/contact", "/privacy", "/terms",
];

const paths = process.argv.slice(2).length ? process.argv.slice(2) : ALL;
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: paths.map((p) => `https://${HOST}${p}`) }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${paths.length} URL(s)`);
