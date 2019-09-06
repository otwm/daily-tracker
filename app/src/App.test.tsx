import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';

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
