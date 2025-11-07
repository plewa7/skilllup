import fetch from "node-fetch";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080/index.php";

type Note = {
  id: number;
  content: string;
};

type DeleteResponse = { message: string };

describe("API Notes", () => {
  it("add, fetch and delete note", async () => {

    const addRes = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "test" }),
    });

    const added: Note = await addRes.json();
    console.log("Added note:", added);

    const getRes = await fetch(BACKEND_URL);
    const allNotes: Note[] = await getRes.json();
    console.log("All notes:", allNotes);

    const delRes = await fetch(`${BACKEND_URL}?id=${added.id}`, { method: "DELETE" });
    const deleted: DeleteResponse = await delRes.json();
    console.log("Deleted note:", deleted, added.id);

    expect(deleted.message).toBe("Note deleted");

    const finalNotesRes: Note[] = await (await fetch(BACKEND_URL)).json();
    console.log("Final notes:", finalNotesRes);
  });
});
