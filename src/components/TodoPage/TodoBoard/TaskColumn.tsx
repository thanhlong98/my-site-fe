import { TodoColumn } from '@interfaces'
import { Button, Col, Input } from 'antd'
import React, { useRef, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TaskItem from './TaskItem'
import { FaEllipsisH } from 'react-icons/fa'

type Props = {
  index: number
  column: TodoColumn
}

const TaskColumn: React.FC<Props> = ({ column, index }) => {
  const inputTitleRef = useRef<Input>()
  const [isClickTitle, setIsClickTitle] = useState(true)

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="task-column">
            <div
              className={`task-column__header ${isClickTitle ? 'title' : ''}`}
              {...provided.dragHandleProps}
            >
              {/* <h3
                className="task-column__header-title"
                onClick={() => {
                  setIsClickTitle(true)
                  setTimeout(() => {
                    inputTitleRef.current.focus()
                  }, 10)
                }}
              >
                {column.title}
              </h3> */}
              <Input
                className="task-column__header-title-input"
                value={column.title}
                ref={inputTitleRef}
                autoFocus
                size="small"
                onClick={() => setIsClickTitle(false)}
                onBlur={() => setIsClickTitle(true)}
              />

              <Button icon={<FaEllipsisH />}></Button>
            </div>

            <Droppable droppableId={column.id} type="task">
              {(provided, snapshot) => (
                <div
                  className={`task-column__content`}
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
