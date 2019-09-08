import React, { SVGProps } from 'react';
import { HH_mm } from '../App';
import { pipe } from 'ramda';

export interface Coordinate {
  x: number;
  y: number;
}

interface GroundInfo {
  start: Coordinate;
  height: number;
}

interface TimeLineProps {
  timeIndex: number;
  color: string;
  groundInfo: GroundInfo;
}

interface LineCoordinates {
  start: Coordinate;
  end: Coordinate;
}
const toTime = (timeIndex: number): HH_mm=> `${String(timeIndex).padStart(2, '0')}:00`

const textWidth = 20

const textCoordinate = (start: Coordinate, textWidth: number): Coordinate => {
  const X_OFFSET = 10
  const Y_OFFSET = 20
  const { x, y } = start;
  return {
    x: x - textWidth / 2 - X_OFFSET,
    y: y - Y_OFFSET,
  }
}

const lineCoordinate = (groundInfo: GroundInfo): LineCoordinates => {
  const OFFSET = 10
  const { x, y } = groundInfo.start
  return {
    start: {
      x,
      y: y - OFFSET
    },
    end: {
      x,
      y: y + groundInfo.height,
    }
  }
}

const lineCoordinate2SVGAttr = (lineCoordinates: LineCoordinates): SVGProps<SVGLineElement> => ({
  x1: lineCoordinates.start.x,
  y1: lineCoordinates.start.y,
  x2: lineCoordinates.end.x,
  y2: lineCoordinates.end.y,
})

const lineCoordinateSVGAttr = pipe<GroundInfo, LineCoordinates, SVGProps<SVGLineElement>>(
  lineCoordinate, lineCoordinate2SVGAttr)

const TimeLine: React.FC<TimeLineProps> = ({ timeIndex, color, groundInfo }): any => {
  return [
    <text
      { ...textCoordinate(groundInfo.start, textWidth)}
      width={textWidth} key={0}
    >{toTime(timeIndex)}</text>,
    <line { ...lineCoordinateSVGAttr(groundInfo)} strokeWidth={1} stroke={color} key={1}/>
  ]
}

export default TimeLine
