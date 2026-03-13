#!/usr/bin/env bun

import { program } from "commander";
import { saveConfig } from "./src/config";
import { search } from "./src/search";
import { parseContacts } from "./src/display";
import { interactiveSelect } from "./src/interactive";
import { createNote } from "./src/api";

program
  .name("clay")
  .description("Search your Clay.earth contacts");

program
  .argument("<query>", 'search query (e.g. all, title:"founder", "last week")')
  .option("--limit <n>", "results per page", "25")
  .option("--page <n>", "page number", "1")
  .option("--sort <field>", "sort by: firstName, lastName")
  .option("--desc", "sort descending", false)
  .option("--json", "output raw JSON", false)
  .option("--non-interactive", "disable interactive prompts, output JSON", false)
  .action(async (query, opts) => {
    const data = await search({
      term: query,
      limit: parseInt(opts.limit, 10),
      page: parseInt(opts.page, 10),
      sortBy: opts.sort,
      sortDirection: opts.desc ? "desc" : "asc",
    });

    if (opts.json) {
      console.log(JSON.stringify(data, null, 2));
    } else if (opts.nonInteractive) {
      const { rows, total } = parseContacts(data);
      console.log(JSON.stringify({ total, contacts: rows }, null, 2));
    } else {
      const { rows, total } = parseContacts(data);
      await interactiveSelect(rows, total);
    }
  });

program
  .command("note <contactId> <text>")
  .description("add a note to a contact")
  .action(async (contactId, text) => {
    await createNote(contactId, text);
    console.log("Note saved.");
  });

program
  .command("auth <token>")
  .description("save your Clay refresh token")
  .action(async (token) => {
    await saveConfig({ refresh_token: token });
    console.log("Refresh token saved to ~/.clay-cli/config.json");
  });

program.parse();
