import './style.css'

type Note = {
    id: number;      
    content: string;  
}

const BACKEND_URL = 'http://localhost:8080';

const notesList = document.querySelector('#notes-list') as HTMLDivElement;
const noteContent = document.querySelector('#note-content') as HTMLTextAreaElement;
const addBtn = document.querySelector('#add-note') as HTMLButtonElement;

const styleNotatki = {
    note: 'background: white; padding: 15px; margin: 10px 0; border-radius: 4px; ' + 
             'display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);',
    deleteButton: 'background: #ff0404ff; color: white; border: none; padding: 5px 10px; ' + 
                  'border-radius: 4px; cursor: pointer; transition: background 0.3s;'
}

async function pobierzNotes() {
    try {
        const res = await fetch(BACKEND_URL);
        const notes: Note[] = await res.json();
        
        const html = notes.map(note => `
            <div style="${styleNotatki.note}">
                <div>${note.content}</div>
                <button 
                    onclick="window.usunNote(${note.id})" 
                    style="${styleNotatki.deleteButton}"
                >Usuń</button>
            </div>
        `).join('');
        
        notesList.innerHTML = html;
    } catch (err) {
        console.error('Nie udało się pobrać notatek:', err);
    }
}

async function addNote() {
    const content = noteContent.value.trim();
    if (!content) return;

    try {
        const res = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: content })
        });

        if (res.ok) {
            noteContent.value = ''; 
            pobierzNotes();
        }
    } catch (err) {
        console.error('Nie udało się dodać notatki:', err);
    }
}

async function usunNote(id: number) {
    try {
        const res = await fetch(`${BACKEND_URL}?id=${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            pobierzNotes();
        }
    } catch (err) {
        console.error('Nie udało się usunąć notatki:', err);
    }
}

addBtn.addEventListener('click', addNote);

noteContent.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addNote();
    }
});

(window as any).usunNote = usunNote;

pobierzNotes();

