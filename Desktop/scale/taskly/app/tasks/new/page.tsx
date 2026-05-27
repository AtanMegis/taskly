import Header from "@/components/layout/Header"
import CreateTaskForm from "@/components/tasks/CreateTaskForm"

export default function CreateTaskPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Create Task" />
      <div className="flex-1 px-8 py-6">
        <CreateTaskForm />
      </div>
    </div>
  )
}
