import React from 'react'
import TabsContainer from './components/TabsContainer'
import './general.css'
import './App.css'

const data = [
  {
    name: 'tab1',
    data: 'tab1 data'
  },
  {
    name: 'tab2',
    data: 'tab2 data'
  },{
    name: 'tab3',
    data: 'tab3 data'
  }
]

function App() {
return (
  <div className="App">
    <p className="heading">Demo Container</p>
    <TabsContainer data={data} />
  </div>);
}

export default App;
