import { select, text, isCancel } from "@clack/prompts";
import type { ContactRow } from "./display";
import { createNote } from "./api";

const CLAY_URL = "https://web.clay.earth/contact";

export async function interactiveSelect(rows: ContactRow[], total: number): Promise<void> {
  if (rows.length === 0) {
    console.log("No results found.");
    return;
  }

  const reversed = [...rows].reverse();
  const selected = await select({
    message: `${total} contacts found`,
    initialValue: reversed[0],
    options: reversed.map((row) => ({
      value: row,
      label: row.name,
      hint: row.detail || undefined,
    })),
  });

  if (isCancel(selected)) return;

  const action = await select({
    message: selected.name,
    options: [
      { value: "open", label: "Open in browser" },
      { value: "note", label: "Add a note" },
    ],
  });

  if (isCancel(action)) return;

  if (action === "open") {
    Bun.spawn(["open", `${CLAY_URL}/${selected.id}`]);
  } else if (action === "note") {
    const noteText = await text({
      message: `Note for ${selected.name}`,
      placeholder: "Type your note...",
    });

    if (isCancel(noteText) || !noteText) return;

    await createNote(selected.id, noteText as string);
    console.log("Note saved.");
  }
}
