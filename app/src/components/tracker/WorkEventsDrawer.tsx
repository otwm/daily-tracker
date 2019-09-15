import React, {useState} from "react";
import {Button, Drawer, Table} from "antd";
import {ColumnProps} from "antd/lib/table";
import {WorkEvent} from "~/interface/task";

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

const WorkEventsDrawer: React.FC = () => {
  const [ detailVisible, setDetailVisible ] = useState(false)
  const addWorkEvent = () => 0
  return (
    <Drawer
      title={'Detail'}
      placement={'bottom'}
      onClose={() => setDetailVisible(false)}
      visible={detailVisible}
    >
      <Button onClick={addWorkEvent} type={'primary'}>Add</Button>
      <Table dataSource={data} columns={columns}/>
    </Drawer>
  )
}

export default WorkEventsDrawer
