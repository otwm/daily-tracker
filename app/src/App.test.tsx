import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import App, { current, startOrStopRestFactory, Task } from './App';

describe('App', () => {
  let container: any = null
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  test('basic', () => {
    act(() => {
      render(<App />, container)
    })
    expect(
      container.querySelector('[data-test-id=btn-rest]').textContent
    ).toBe('휴식')
  })

  test('current', () => {
    const minutes = current()
    console.log(`current minutes: ${minutes}`)
    expect(minutes).toBeLessThanOrEqual( 24 * 60 )
  })

  test('startOrStopRestFactory', () => {
    let currentTask: Task[] = []
    const mockSetTask = jest.fn((tasks) => {
      currentTask = tasks
    });
    const startOrStopRest = startOrStopRestFactory(currentTask, mockSetTask)
    startOrStopRest()
    startOrStopRest()
    startOrStopRest()
    expect(mockSetTask.mock.calls.length).toBe(3)
    expect(mockSetTask.mock.calls[0][0].length).toBe(1)
    console.log(currentTask)
    // expect(currentTask.length).toBe(2)
    expect(mockSetTask.mock.calls[0][0][0].type).toEqual({
      color: 'blue',
      type: 'rest',
    })
  })

  test('휴식을 기록한다.', () => {
    act(() => {
      render(<App />, container)
    })
    const btnReset = container.querySelector('[data-test-id=btn-rest]')
    act(() => {
      btnReset.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })
  })

  test('휴식을 다시 누르면 기록을 마친다.', () => {

  })

  test('일을 기록한다.', () => {

  })

  test('일을 다시 누르면 기록을 마친다.', () => {

  })

  test('일을 눌럿다가 휴식을 누르면 일은 마치고, 휴식을 시작한다.', () => {

  })

  test('휴식을 눌럿다가 일을 누르면 휴식은 마치고, 일을 시작한다.', () => {

  })

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })
})
