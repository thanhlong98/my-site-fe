export type TodoTask = {
  id: string
  content: string
}

export type TodoColumn = {
  id: string
  title: string
  tasks: TodoTask[]
}
