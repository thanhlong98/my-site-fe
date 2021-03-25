import './styles.less'
import { TodoColumn } from '@interfaces'
import { RootState, setColumnOrder, setTasksInColumn } from '@store'
import { Row } from 'antd'
import React from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import TaskColumn from './TaskColumn'

export const TodoBoard: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo)
  const dispatch = useDispatch()

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    if (type === 'column') {
      const newColumnOrder = [...todos.columnOrder]
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)
      dispatch(setColumnOrder({ columnOrder: newColumnOrder }))
      return
    }

    const start = todos.columns[source.droppableId]
    const finish = todos.columns[destination.droppableId]

    if (start === finish) {
      const newTasks = [...start.tasks]
      const data = newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, ...data)
      const newColumn: TodoColumn = {
        ...start,
        tasks: newTasks,
      }

      dispatch(setTasksInColumn({ column: newColumn }))
      return
    }

    const newTasksStarts = [...start.tasks]
    const removed = newTasksStarts.splice(source.index, 1)

    const newTaskFinishs = [...finish.tasks]
    newTaskFinishs.splice(destination.index, 0, removed[0])

    const newColumnStart = {
      ...start,
      tasks: newTasksStarts,
    }
    const newColumnFinish = {
      ...finish,
      tasks: newTaskFinishs,
    }
    dispatch(setTasksInColumn({ column: newColumnStart }))
    dispatch(setTasksInColumn({ column: newColumnFinish }))
  }

  return (
    <section className="section-one todo-board-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="task-columns"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {todos.columnOrder.map((columnId, index) => {
                const column = todos.columns[columnId]

                return (
                  <TaskColumn key={column.id} column={column} index={index} />
                )
              })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  )
}
