import React from 'react'
import ReactDOM from 'react-dom'
import 'flowbite'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { store } from './reducers'
import NotesApp from './components/NotesApp'

ReactDOM.render(
  <Provider store={store} >
      <BrowserRouter>
        <NotesApp />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
