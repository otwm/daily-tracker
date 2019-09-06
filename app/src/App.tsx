import React from 'react';
import { Button } from 'antd'

import moment from 'moment'
import './App.css';

const ok = () => alert(moment().format('YYYY-MM-DD HH:mm:ss'))
const App: React.FC = () => {
  return (
    <div>
      <Button onClick={ok} data-test-id="btn-rest">휴식</Button>
      <Button onClick={ok} data-test-id="btn-work">work</Button>
    </div>
  );
}

export default App;
