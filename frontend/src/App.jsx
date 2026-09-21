import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { Plus, X } from "lucide-react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "./components/ui/dialog";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "./components/ui/alert-dialog";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.error(error);

      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (taskData) => {
    try {
      setError("");

      if (editingTask) {
        await updateTask(editingTask.id, taskData);
        toast.success("Task updated successfully");
        setEditingTask(null);
        setIsDialogOpen(false);
      } else {
        await createTask(taskData);
        toast.success("Task created successfully");
        setIsDialogOpen(false);
      }

      await loadTasks();

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong."
      );
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setError("");
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setTaskToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setError("");

      await deleteTask(taskToDelete);
      toast.success("Task deleted successfully");
      setDeleteDialogOpen(false);
      setTaskToDelete(null);

      await loadTasks();

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Failed to delete task."
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setEditingTask(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" />
      
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Tasks</h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">Manage your tasks efficiently</p>
        </header>

        <div className="mb-4 sm:mb-6">
          <Button onClick={handleOpenDialog}>
            <Plus size={18} className="mr-2" />
            New Task
          </Button>
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </Card>
        )}

        <section>
          {loading ? (
            <Card className="p-12 text-center">
              <p className="text-sm text-slate-500">Loading tasks...</p>
            </Card>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>
            {editingTask ? "Edit Task" : "Create Task"}
          </DialogTitle>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsDialogOpen(false)}
          >
            <X size={18} />
          </Button>
        </DialogHeader>
        <DialogContent>
          <TaskForm
            onSubmit={handleSubmit}
            editingTask={editingTask}
            onCancel={handleCancelEdit}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this task? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialog>
    </div>
  );
}

export default App;