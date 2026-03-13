export interface ContactRow {
  id: string;
  name: string;
  title: string;
  organization: string;
  detail: string;
}

export function parseContacts(data: any): { rows: ContactRow[]; total: number } {
  const hits = data.hits?.hits;

  if (!hits || hits.length === 0) {
    return { rows: [], total: 0 };
  }

  const total = data.hits?.total ?? hits.length;

  const rows: ContactRow[] = hits.map((hit: any) => {
    const s = hit._source;
    const name = s.fullName?.trim() || "(no name)";
    const title = s.title || "";
    const org = s.organization || "";
    const role = [title, org].filter(Boolean).join(" @ ");
    const detail = role || s.headline || "";

    return { id: hit._id, name, title, organization: org, detail };
  });

  return { rows, total };
}

export function displayContacts(data: any) {
  const { rows, total } = parseContacts(data);

  if (rows.length === 0) {
    console.log("No results found.");
    return;
  }

  for (const row of rows) {
    let line = `  ${row.name}`;
    if (row.detail) line += `  —  ${row.detail}`;
    console.log(line);
  }

  console.log(`\n${rows.length} of ${total} results`);
}
