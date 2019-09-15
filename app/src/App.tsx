import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import { Button, Layout, Menu, Row, Col, Drawer, Table } from 'antd'
import 'antd/dist/antd.css';

import moment from 'moment'
import { last, isNil, path, pipe } from 'ramda'

import TaskBar from './components/TaskBar';
import {TaskType, Task, WorkEvent} from "./interface/task";
import WorkEventsDrawer from "./components/tracker/WorkEventsDrawer";
import './App.css';

const restType: TaskType = {
  name: 'rest',
  color: 'blue',
}

const workType: TaskType = {
  name: 'work',
  color: 'red',
}

export const currentMinutes = () => Math.floor(moment.duration(moment().format('HH:mm:ss')).asMinutes())

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
    setTask([
      ...tasks.slice(0, tasks.length - 1),
      addedEndLastTask(),
    ])
  }
}

const { Content, Header } = Layout

const App: React.FC = () => {
  const [ tasks, setTask ] = useState<Task[]>([])
  const [ myState, setMyState ] = useState<string | null>(null)

  const handleActionChange = (value: string | null) => {
    if (myState === value) {
      setMyState(null)
    } else {
      setMyState(value)
    }
  }

  useEffect(() => {
    if (myState === 'work') {
      // setDetailVisible(true)
    }
  }, [ myState ])

  /**
   * 새로운 task를 생성하여 tasks에 등록 한다.
   */
  return (
    <div>
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
          >
            <Menu.Item key={1}>Daily</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: 10 }}>
          <Row justify={'center'} align={'middle'} type={'flex'}>
            <Button.Group>
              <Button type={ myState ==='rest' ? 'primary': 'default' }
                onClick={() => {
                  handleActionChange('rest');
                  startOrStopFactory(tasks, setTask)(restType);
                }}>
                휴식
              </Button>
              <Button
                type={ myState ==='work' ? 'primary': 'default' }
                onClick={() => {
                  handleActionChange('work');
                  startOrStopFactory(tasks, setTask)(workType)
                }}>
                work
              </Button>
            </Button.Group>
          </Row>
          <Row>
            <Col span={22}>
              <TaskBar tasks={tasks} />
            </Col>
          </Row>
          <WorkEventsDrawer />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
