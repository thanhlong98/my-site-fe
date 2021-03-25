import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  index: number
  task: any
}

const TaskItem: React.FC<Props> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-item`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="handle"></div>
          {task.content}
        </div>
      )}
    </Draggable>
  )
}

export default React.memo(TaskItem)
