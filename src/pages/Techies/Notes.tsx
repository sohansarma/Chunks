import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Pin, Edit2, Trash2, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);

  const addNote = () => {
    if (!newNote.title || !newNote.content) {
      toast.error("Please fill in both title and content");
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      isPinned: false,
    };

    setNotes((prev) => [...prev, note]);
    setNewNote({ title: "", content: "" });
    toast.success("Note created successfully");
  };

  const updateNote = (note: Note) => {
    setNotes((prev) => prev.map((n) => (n.id === note.id ? note : n)));
    setEditingNote(null);
    toast.success("Note updated successfully");
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    toast.success("Note deleted successfully");
  };

  const togglePin = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notes</h2>
        <Button onClick={() => setIsAddingNote(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Ticket
        </Button>
      </div>

      {isAddingNote && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Note</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddingNote(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Note Title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <Textarea
              placeholder="Note Content"
              value={newNote.content}
              onChange={(e) =>
                setNewNote((prev) => ({ ...prev, content: e.target.value }))
              }
            />
            <Button onClick={addNote}>Create Note</Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedNotes.map((note) => (
          <Card
            key={note.id}
            className="relative transform transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="p-4 bg-yellow-50">
              {editingNote?.id === note.id ? (
                <div className="space-y-2">
                  <Input
                    value={editingNote.title}
                    onChange={(e) =>
                      setEditingNote((prev) => ({
                        ...prev!,
                        title: e.target.value,
                      }))
                    }
                  />
                  <Textarea
                    value={editingNote.content}
                    onChange={(e) =>
                      setEditingNote((prev) => ({
                        ...prev!,
                        content: e.target.value,
                      }))
                    }
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => updateNote(editingNote)}>
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingNote(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{note.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => togglePin(note.id)}
                        className={`p-1 rounded hover:bg-yellow-100 ${
                          note.isPinned ? "text-blue-600" : "text-gray-400"
                        }`}
                      >
                        <Pin className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingNote(note)}
                        className="p-1 rounded hover:bg-yellow-100 text-gray-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-1 rounded hover:bg-yellow-100 text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 whitespace-pre-wrap">
                    {note.content}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;
