import { writeFileSync } from "node:fs";

const baseUrl = process.env.WMRN_WORDPRESS_URL || "https://wmrnhistory.com";
const perPage = Number(process.env.WMRN_IMPORT_PER_PAGE || 100);

async function fetchJson(path) {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${path}`);
  return response.json();
}

const types = await fetchJson("/wp-json/wp/v2/types");
const supported = ["accession", "exhibit", "page", "media"].filter((type) => types[type]);
const inventory = {
  baseUrl,
  generatedAt: new Date().toISOString(),
  supportedTypes: supported,
  records: []
};

for (const type of supported) {
  const restBase = types[type].rest_base;
  const items = await fetchJson(`/wp-json/wp/v2/${restBase}?per_page=${perPage}&_fields=id,slug,title,link,date,modified,status,meta,excerpt`);
  inventory.records.push(
    ...items.map((item) => ({
      type,
      id: item.id,
      slug: item.slug,
      title: item.title?.rendered?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
      link: item.link,
      modified: item.modified,
      status: item.status,
      metaKeys: Object.keys(item.meta || {})
    }))
  );
}

writeFileSync("wordpress-import-inventory.json", JSON.stringify(inventory, null, 2));
console.log(`Inventoried ${inventory.records.length} WordPress records`);
