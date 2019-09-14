import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button } from 'antd'
import 'antd/dist/antd.css';

import moment, { Moment } from 'moment'
import { last, isNil, path, map } from 'ramda'

import TaskBar from './components/TaskBar';
import './App.css';

export type YYYY_MM_DD = string
export type HH_mm = string

// TODO: color의 위치가 적절한지 검토
interface TaskType {
  name: string;
  color?: string;
}

export interface Task {
  startDay: YYYY_MM_DD;
  endDay?: YYYY_MM_DD;
  start: HH_mm;
  end?: HH_mm;
  title?: string;
  type: TaskType;
}

const oneHour = 60
const oneDay = 24 * oneHour

const restType: TaskType = {
  name: 'rest',
  color: 'blue',
}

const workType: TaskType = {
  name: 'work',
  color: 'red',
}

export const current = () => Math.floor(moment.duration(moment().format('HH:mm:ss')).asMinutes())
/**
 * 새로운 task를 생성하여 tasks에 등록 한다.
 */
export const startOrStopRestFactory = (tasks: Task[], setTask: Dispatch<SetStateAction<Task[]>>) => () => {
  const lastTask = last(tasks)
  if (isNil(lastTask) || !isNil(path(['end'], lastTask))) {
    const newTask = {
      start: moment().format('HH:mm'),
      startDay: moment().format('YYYY-MM-DD'),
      type: restType,
    }
    setTask([ ...tasks, newTask ])
  } else {
    // endDay 삽입
    setTask([ ...tasks.slice(0, tasks.length -1), { ...lastTask, end: moment().format('HH:mm') } ])
  }
}
const startOrStopFactory = (tasks: Task[], setTask: Dispatch<SetStateAction<Task[]>>) => (type: TaskType) => {
  const lastTask = last(tasks)
  const newTask = () => ({
    start: moment().format('HH:mm'),
    startDay: moment().format('YYYY-MM-DD'),
    type,
  });
  const addedEndLastTask = () => ({...lastTask, end: moment().format('HH:mm')});
  if (isNil(lastTask) || !isNil(path(['end'], lastTask))) {
    setTask([...tasks, newTask()])
  } else if(isNil(path(['end'], lastTask)) && type.name !== lastTask.type.name) {
    setTask([
      ...tasks.slice(0, tasks.length - 1),
      addedEndLastTask(),
      newTask()
    ])
  } else {
    // endDay 삽입
    setTask([
      ...tasks.slice(0, tasks.length - 1),
      addedEndLastTask(),
    ])
  }
}

const App: React.FC = () => {
  const [ tasks, setTask ] = useState<Task[]>([])
  /**
   * 새로운 task를 생성하여 tasks에 등록 한다.
   */
  return (
    <div>
      <Button onClick={() => startOrStopFactory(tasks, setTask)(restType)} data-test-id="btn-rest">휴식</Button>
      <Button onClick={() => startOrStopFactory(tasks, setTask)(workType)} data-test-id="btn-work">work</Button>
      <TaskBar tasks={tasks} />
    </div>
  );
}

export default App;
