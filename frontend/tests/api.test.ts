import fetch from "node-fetch";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080/index.php";

type Note = {
  id: number;
  content: string;
};

type DeleteResponse = { message: string };

describe("API Notes", () => {
  it("add, fetch and delete note", async () => {
    console.log(`🔗 Testing backend at: ${BACKEND_URL}`);

    // 1️⃣ ADD NOTE
    const addRes = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "test" }),
    });

    const addText = await addRes.text();
    console.log("Raw add response:", addText);

    // Spróbuj sparsować JSON, jeśli możliwe
    let added: Note;
    try {
      added = JSON.parse(addText);
    } catch {
      throw new Error("❌ Backend nie zwrócił JSON przy dodawaniu notatki");
    }

    expect(added).toHaveProperty("id");
    expect(added).toHaveProperty("content");

    // 2️⃣ FETCH NOTES
    const getRes = await fetch(BACKEND_URL);
    const getText = await getRes.text();
    console.log("Raw get response:", getText);

    let allNotes: Note[];
    try {
      allNotes = JSON.parse(getText);
    } catch {
      throw new Error("❌ Backend nie zwrócił JSON przy pobieraniu notatek");
    }

    expect(Array.isArray(allNotes)).toBe(true);

    // 3️⃣ DELETE NOTE
    const delRes = await fetch(`${BACKEND_URL}?id=${added.id}`, { method: "DELETE" });
    const delText = await delRes.text();
    console.log("Raw delete response:", delText);

    let deleted: DeleteResponse;
    try {
      deleted = JSON.parse(delText);
    } catch {
      throw new Error("❌ Backend nie zwrócił JSON przy usuwaniu notatki");
    }

    expect(deleted.message).toBe("Note deleted");

    // 4️⃣ FINAL CHECK
    const finalRes = await fetch(BACKEND_URL);
    const finalText = await finalRes.text();
    console.log("Raw final response:", finalText);

    let finalNotes: Note[];
    try {
      finalNotes = JSON.parse(finalText);
    } catch {
      throw new Error("❌ Backend nie zwrócił JSON przy końcowym sprawdzeniu notatek");
    }

    const stillThere = finalNotes.find((n) => n.id === added.id);
    expect(stillThere).toBeUndefined();

    console.log("✅ Test zakończony sukcesem");
  });
});
