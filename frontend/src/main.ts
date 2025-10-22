import './style.css'

interface Note {
  id: number;
  content: string;
}

const API_URL = 'http://localhost:8080';

const notesList = document.querySelector<HTMLDivElement>('#notes-list')!;
const noteContent = document.querySelector<HTMLTextAreaElement>('#note-content')!;
const addNoteButton = document.querySelector<HTMLButtonElement>('#add-note')!;

async function fetchNotes(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}`);
    const notes: Note[] = await response.json();
    displayNotes(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
}

function displayNotes(notes: Note[]): void {
  notesList.innerHTML = notes
    .map(
      (note) => `
        <div class="note">
          <p class="note-content">${note.content}</p>
          <button class="delete" onclick="window.deleteNote(${note.id})">Delete</button>
        </div>
      `
    )
    .join('');
}

async function addNote(): Promise<void> {
  const content = noteContent.value.trim();
  if (!content) return;

  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (response.ok) {
      noteContent.value = '';
      fetchNotes();
    }
  } catch (error) {
    console.error('Error adding note:', error);
  }
}

async function deleteNote(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchNotes();
    }
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}

addNoteButton.addEventListener('click', addNote);
noteContent.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    addNote();
  }
});

(window as any).deleteNote = deleteNote;

fetchNotes();
