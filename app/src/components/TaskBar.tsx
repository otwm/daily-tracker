import React, { SVGProps } from 'react';
import { Task, HH_mm } from '../App';
import moment from 'moment'
import { range } from 'ramda'
import TimeLine from './TimeLine'
import TaskBlock from './TaskBlock'
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
  const groundInfo4Block = {
    start: {
      x: groundAttr.x as number,
      y: groundAttr.y as number,
    },
    height: groundAttr.y as number,
    widthPerMinutes: groundWithOffset / 60,
  }
  return (
    <div>
      <svg className={'task-bar'}>
        <rect { ...groundAttr } />
        { range(0, 25).map(timeIndex =>
            <TimeLine timeIndex={timeIndex} color={groundColor}
                      groundInfo={groundInfo(timeIndex)}
                      key={timeIndex}
            />
          )
        }
        { tasks.map((task, index) => <TaskBlock
          task={task} key={index} groundInfo={groundInfo4Block}/>)
        }
      </svg>

    </div>
  )
}

export default TaskBar;
