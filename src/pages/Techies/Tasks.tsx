import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done";
}

const Tasks = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState({ title: "", description: "" });
  const [isAddingTicket, setIsAddingTicket] = useState(false);

  const addTicket = () => {
    if (!newTicket.title) {
      toast.error("Please enter a ticket title");
      return;
    }

    const ticket: Ticket = {
      id: Date.now().toString(),
      title: newTicket.title,
      description: newTicket.description,
      status: "todo",
    };

    setTickets((prev) => [...prev, ticket]);
    setNewTicket({ title: "", description: "" });
    setIsAddingTicket(false);
    toast.success("Ticket created successfully");
  };

  const moveTicket = (ticketId: string, newStatus: Ticket["status"]) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const ticket = tickets.find((t) => t.id === result.draggableId);

    if (ticket && source.droppableId !== destination.droppableId) {
      moveTicket(ticket.id, destination.droppableId as Ticket["status"]);
      toast.success(`Ticket moved to ${destination.droppableId}`);
    }
  };

  const columns: { title: string; status: Ticket["status"] }[] = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "inProgress" },
    { title: "Done", status: "done" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Task Board</h2>
        <Button onClick={() => setIsAddingTicket(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Ticket
        </Button>
      </div>

      {isAddingTicket && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Ticket</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddingTicket(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Ticket Title"
              value={newTicket.title}
              onChange={(e) =>
                setNewTicket((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <Textarea
              placeholder="Description"
              value={newTicket.description}
              onChange={(e) =>
                setNewTicket((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <Button onClick={addTicket}>Create Ticket</Button>
          </CardContent>
        </Card>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <Droppable key={column.status} droppableId={column.status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-4"
                >
                  <h3 className="font-semibold text-lg">{column.title}</h3>
                  <div className="space-y-4 min-h-[200px]">
                    {tickets
                      .filter((ticket) => ticket.status === column.status)
                      .map((ticket, index) => (
                        <Draggable
                          key={ticket.id}
                          draggableId={ticket.id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white cursor-grab active:cursor-grabbing"
                            >
                              <CardContent className="p-4">
                                <h4 className="font-medium">{ticket.title}</h4>
                                {ticket.description && (
                                  <p className="text-sm text-gray-600 mt-2">
                                    {ticket.description}
                                  </p>
                                )}
                                <div className="flex gap-2 mt-4">
                                  {column.status !== "todo" && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        moveTicket(ticket.id, "todo")
                                      }
                                    >
                                      Move to Todo
                                    </Button>
                                  )}
                                  {column.status !== "inProgress" && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        moveTicket(ticket.id, "inProgress")
                                      }
                                    >
                                      Move to Progress
                                    </Button>
                                  )}
                                  {column.status !== "done" && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        moveTicket(ticket.id, "done")
                                      }
                                    >
                                      Move to Done
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
