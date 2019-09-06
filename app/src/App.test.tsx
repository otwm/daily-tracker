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
  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })
})
