/// <reference path="./core.ts" />

export interface WorkEvent {
  name: string;
  start: HH_mm;
  end?: HH_mm;
}

// TODO: color의 위치가 적절한지 검토
export interface TaskType {
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
  workEvent?: WorkEvent;
}
