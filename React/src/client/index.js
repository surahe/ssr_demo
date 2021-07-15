import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config';
import Routes from '../Routes'
import { Provider } from 'react-redux';
import { getClientStore } from '../store'
import StyleContext from 'isomorphic-style-loader/StyleContext'

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

const App = () => {
  return (
    <Provider store={getClientStore()}>
      <StyleContext.Provider  value={{ insertCss }}>
        <BrowserRouter>
          <div>
            {renderRoutes(Routes)}
          </div>
        </BrowserRouter>
      </StyleContext.Provider>
    </Provider>
  )
}

ReactDom.hydrate(<App />, document.getElementById('root'))
