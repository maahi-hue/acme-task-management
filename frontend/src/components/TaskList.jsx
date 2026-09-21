import { Pencil, Trash2, Calendar } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <Card className="p-8 sm:p-12 text-center">
        <p className="text-lg font-medium text-slate-900">No tasks found</p>
        <p className="mt-1 text-sm text-slate-500">Create your first task to get started.</p>
      </Card>
    );
  }

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case "High":
        return "high";
      case "Medium":
        return "medium";
      case "Low":
        return "low";
      default:
        return "default";
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Completed":
        return "completed";
      case "In Progress":
        return "inProgress";
      case "Pending":
        return "pending";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{task.title}</h3>
                <Badge variant={getPriorityVariant(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge variant={getStatusVariant(task.status)}>
                  {task.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-600 mb-2 sm:mb-3 line-clamp-3 wrap-break-word sm:text-sm">{task.description}</p>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar size={12} />
                <span>Created {new Date(task.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => onEdit(task)}>
                <Pencil size={16} />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => onDelete(task.id)}>
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default TaskList;