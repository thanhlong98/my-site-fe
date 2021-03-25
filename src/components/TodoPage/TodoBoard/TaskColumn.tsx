import { TodoColumn } from '@interfaces'
import { Col } from 'antd'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TaskItem from './TaskItem'

type Props = {
  index: number
  column: TodoColumn
}

const TaskColumn: React.FC<Props> = ({ column, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="task-column">
            <h3 className="task-column__title" {...provided.dragHandleProps}>
              {column.title}
            </h3>
            <Droppable droppableId={column.id} type="task">
              {(provided, snapshot) => (
                <div
                  className={`task-list`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {column.tasks.map((task, index) => (
                    <TaskItem key={task.id} index={index} task={task} />
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default React.memo(TaskColumn)
