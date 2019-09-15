import React, { SVGProps, useState } from 'react';
import moment from 'moment'
import { range, last, isNil, isEmpty } from 'ramda'
import TimeLine from './TimeLine'
import TaskBlock from './TaskBlock'
import consola from 'consola'
import { Task } from '../interface/task'
import './TaskBar.css'

interface TaskBarProps {
  tasks: Task[];
}

const getTile = (task: Task) => {
  const { title, type } = task
  return title || type.name
}

const day = 24
const groundColor = 'gray'
const groundWithOffset = 60
const groundAttr: SVGProps<SVGRectElement> = {
  x: 30,
  y: 50,
  width: day * groundWithOffset,
  height: 70,
  stroke: groundColor,
  fill: 'transparent',
  strokeWidth: 1,
}

const groundInfo = (timeIndex:number) => ({
  start: {
    x: 30 + groundWithOffset * timeIndex,
    y: 50,
  },
  height: 70,
})

const TaskBar: React.FC<TaskBarProps> = ({ tasks }) => {
  const [ dummy, setDummy ] = useState(0)
  const forceUpdate = () => setDummy(dummy + 1)
  const groundInfo4Block = {
    start: {
      x: groundAttr.x as number,
      y: groundAttr.y as number,
    },
    height: groundAttr.y as number,
    widthPerMinutes: groundWithOffset / 60,
  }
  if (!isEmpty(tasks) && isNil(last(tasks).end)) {
    const left = 60 - parseInt(moment().format('ss'))
    setTimeout(() => {
      consola.log('retrieve task bar.')
      if (isNil(last(tasks).end)) forceUpdate()
    }, left * 1000)
  }
  const newTasks = (): Task[] => {
    if (isEmpty(tasks)) return []
    const lastTask = last(tasks)
    if (last(tasks).end) return tasks
    return [ ...tasks.slice(0, tasks.length -1), { ...lastTask, end: moment().format('HH:mm') } ]
  }
  return (
    <div className={'task-bar-container'}>
      <svg className={'task-bar'}>
        <g>
          <rect { ...groundAttr } />
          { range(0, 25).map(timeIndex =>
              <TimeLine timeIndex={timeIndex} color={groundColor}
                        groundInfo={groundInfo(timeIndex)}
                        key={timeIndex}
              />
            )
          }
          { newTasks().map((task, index) => <TaskBlock
            task={task} key={index} groundInfo={groundInfo4Block}/>)
          }
        </g>
      </svg>
    </div>
  )
}

export default TaskBar;
