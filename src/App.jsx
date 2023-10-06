
import './css/index.css'
import Editor from './components/CodeEditor';
import Navbar from './components/Nav';
import {Routes, Route} from 'react-router-dom'
import AIedu from './components/AIedu'
import { useState } from 'react';
import Next from './components/Next';


function App() {

  const [input, setInput] = useState({'topic':'', 'teacher': '', 'understood':true})
  const [stringData, setStringData] = useState('')

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element= {<AIedu input={input} setInput={setInput} stringData={stringData} setStringData={setStringData} />} />
      <Route path='/next' element= {<Next stringData={stringData} />} />
      <Route path='/editor' element= {<Editor />} />
    </Routes>
    
      
    </>
  )
}

export default App
