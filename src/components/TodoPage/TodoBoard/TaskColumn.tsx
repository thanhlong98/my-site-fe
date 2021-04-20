import { TodoColumn } from '@interfaces'
import { Button, Col, Input } from 'antd'
import React, { useRef, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TaskItem from './TaskItem'
import { FaEllipsisH, FaPlus } from 'react-icons/fa'

type Props = {
  index: number
  column: TodoColumn
}

const { TextArea } = Input

const TaskColumn: React.FC<Props> = ({ column, index }) => {
  const inputTitleRef = useRef<Input>()
  const addTaskRef = useRef<Input>()
  const [isEditTitle, setIsEditTitle] = useState(false)
  const [isAddTask, setIsAddTask] = useState(false)

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className="task-column">
            <div
              className={`task-column__header ${
                isEditTitle ? 'edit-title' : ''
              }`}
              {...provided.dragHandleProps}
            >
              <h3
                className="task-column__header-title"
                onClick={() => {
                  setIsEditTitle(true)
                  setTimeout(() => {
                    inputTitleRef.current.focus()
                  }, 10)
                }}
              >
                {column.title}
              </h3>

              <Input
                className="task-column__header-title-input"
                value={column.title}
                ref={inputTitleRef}
                autoFocus
                size="small"
                onBlur={() => setIsEditTitle(false)}
              />

              <Button
                className="task-column__header-title-btn"
                icon={<FaEllipsisH />}
              ></Button>
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
            <div className={`task-add ${isAddTask ? 'add-task' : ''}`}>
              <p
                className="task-add__title"
                onClick={() => {
                  setIsAddTask(true)

                  setTimeout(() => {
                    addTaskRef.current.focus()
                  }, 10)
                }}
              >
                <FaPlus /> Thêm thẻ mới
              </p>

              <div className="task-add__form">
                <TextArea
                  ref={addTaskRef}
                  className="task-add__input"
                  minLength={3}
                />
                <Button icon={<FaPlus />}>Thêm</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default React.memo(TaskColumn)
