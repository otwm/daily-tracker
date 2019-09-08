import React, { SVGProps } from 'react'
import { HH_mm, Task } from '../App'
import moment from 'moment'
import { Coordinate } from './TimeLine'

interface TaskBlockProps {
  task: Task;
  groundInfo: {
    start: Coordinate;
    height: number;
    widthPerMinutes: number;
  }
}

export const time2Coordinate = (time: HH_mm, widthPerMinutes: number): number =>
  moment.duration(time).asMinutes() * widthPerMinutes

const taskCoordinate = (
  task: Pick<Task, 'start' | 'end'>,
  groundInfo: TaskBlockProps['groundInfo']
): SVGProps<SVGRectElement> => {
  const start = time2Coordinate(task.start, groundInfo.widthPerMinutes)
  const end = time2Coordinate(task.end || moment().format('HH:mm'), groundInfo.widthPerMinutes)
  const width = end - start === 0? 1: end - start
  return {
    x: time2Coordinate(task.start, groundInfo.widthPerMinutes) + groundInfo.start.x,
    y: groundInfo.start.y,
    width,
    height: 70,
    stroke: 'red',
    fill: 'red',
    strokeWidth: 1,
  }
}

const TaskBlock: React.FC<TaskBlockProps> = ({ task, groundInfo }) => {
  return (
    <rect { ...taskCoordinate(task, groundInfo) }/>
  );
};

export default TaskBlock