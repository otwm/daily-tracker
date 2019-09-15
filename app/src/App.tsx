import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import { Button, Layout, Menu, Row, Col, Drawer, Table } from 'antd'
import 'antd/dist/antd.css';

import moment, { Moment } from 'moment'
import { last, isNil, path, pipe } from 'ramda'

import TaskBar from './components/TaskBar';
import './App.css';
import {ColumnProps} from 'antd/lib/table'

export type YYYY_MM_DD = string
export type HH_mm = string

// TODO: color의 위치가 적절한지 검토
interface TaskType {
  name: string;
  color?: string;
}

export interface WorkEvent {
  name: string;
  start: HH_mm;
  end?: HH_mm;
}

export interface Task {
  startDay: YYYY_MM_DD;
  endDay?: YYYY_MM_DD;
  start: HH_mm;
  end?: HH_mm;
  title?: string;
  type: TaskType;
  workEvent?: WorkEvent;
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

const { Content, Header } = Layout

const columns: ColumnProps<WorkEvent>[] = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
    render: () => <a>Delete</a>
  }
]

const data: WorkEvent[] = [
]

const App: React.FC = () => {
  const [ tasks, setTask ] = useState<Task[]>([])
  const [ myState, setMyState ] = useState<string | null>(null)
  const [ detailVisible, setDetailVisible ] = useState(false)

  const handleActionChange = (value: string | null) => {
    if (myState === value) {
      setMyState(null)
    } else {
      setMyState(value)
    }
  }

  useEffect(() => {
    if (myState === 'work') {
      setDetailVisible(true)
    }
  }, [ myState ])

  const addWorkEvent = () => 0
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
          <Drawer
            title={'Detail'}
            placement={'bottom'}
            onClose={() => setDetailVisible(false)}
            visible={detailVisible}
          >
            <Button onClick={addWorkEvent} type={'primary'}>Add</Button>
            <Table dataSource={data} columns={columns}/>
          </Drawer>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
