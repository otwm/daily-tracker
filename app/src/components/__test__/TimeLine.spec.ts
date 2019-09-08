import { time2Coordinate } from '../TaskBlock'

describe('TaskBlock', () => {
  test('time2Coordinate', () => {
    expect(time2Coordinate('01:01', 10)).toBe(610)
    expect(time2Coordinate('10:01', 10)).toBe(6010)
    expect(time2Coordinate('20:01', 10)).toBe(12010)
    expect(time2Coordinate('24:00', 10)).toBe(14400)
    expect(time2Coordinate('24:00', 60)).toBe(14400 * 6)
  })
})
