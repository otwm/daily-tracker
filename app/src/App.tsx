import React, { useState } from 'react';
import { Button, Slider } from 'antd'
import 'antd/dist/antd.css';

import moment, { Moment } from 'moment'
import './App.css';

interface TaskType {
  type: string;
  color?: string;
}

interface Task {
  start: Moment;
  end?: Moment;
  title?: string;
  type?: TaskType;
}

const oneHour = 60
const oneDay = 24 * oneHour

const dayMarks = {
  '00:00': {
    label: '00:00'
  }
}

const restType: TaskType = {
  type: 'rest',
  color: 'blue',
}

const current = () => Math.floor(moment.duration(moment().format('HH:mm:ss')).asMinutes())

const App: React.FC = () => {
  const [ tasks, setTask ] = useState<Task[]>([])

  /**
   * 새로운 task를 생성하여 tasks에 등록 한다.
   */
  const startRest = () => {
    const newTask = {
      start: moment(),
      type: restType,
    }
    setTask([ ...tasks, newTask ])
  }
  return (
    <div>
      <Button onClick={startRest} data-test-id="btn-rest">휴식</Button>
      <Button onClick={startRest} data-test-id="btn-work">work</Button>
      <div>
        <Slider marks={dayMarks} defaultValue={0} min={0} max={oneDay}
                step={ 1 }
        />
      </div>
    </div>
  );
}

export default App;
