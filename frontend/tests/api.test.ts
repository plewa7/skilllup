import fetch from "node-fetch";

const BACKEND_URL = "http://localhost:8080";

describe("API Notes", () => {
  it("add, fetch and delete note", async () => {

    const addRes = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "test" }),
    });

    const added = await addRes.json();
    console.log("Added note:", added);

    const getRes = await fetch(BACKEND_URL);
    console.log("All notes:", await getRes.json());

    const delRes = await fetch(`${BACKEND_URL}?id=${added.id}`, { method: "DELETE" });
    const deleted = await delRes.json();
    console.log("Deleted note:", deleted, added.id);
    expect(deleted.message).toBe("Note deleted");

    console.log("All notes:", await (await fetch(BACKEND_URL)).json());
  });
});
