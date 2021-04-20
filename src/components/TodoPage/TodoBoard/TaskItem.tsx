import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  index: number
  task: any
}

function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style
  }

  return {
    ...style,
    // slowing down the drop because we can
    transitionDuration: `0.05s`,
  }
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
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          <div className="handle"></div>
          {task.content}
        </div>
      )}
    </Draggable>
  )
}

export default React.memo(TaskItem)
