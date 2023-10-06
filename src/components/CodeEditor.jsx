import React, { useState, useEffect, useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import CodeMirror from 'codemirror';
import axios from 'axios'

// import Button from './components/Button';
// npm install codemirror@5.59.2
function CodeEditor() {
  const editorRef = useRef(null);
  const [codeMirrorInstance, setCodeMirrorInstance] = useState(null);
  const [finalCode, setFinalCode] = useState('');
  const [ccomp, setCComp] = useState(false);
  const [pycomp, setPycomp] = useState(false);
  const [value, setValue] = useState('');
  const [stringData, setStringData] = useState('')
  const [bool, setBool] = useState(false)

  const synth = window.speechSynthesis;
    const speakText = (tell) => {
        const utterance = new SpeechSynthesisUtterance(tell);
        synth.speak(utterance);
      };

  const changeC = () => {
    setCComp(!ccomp);
    if (pycomp === true) {
      setPycomp(!pycomp);
    }
    setValue('c');
  }
  const changePy = () => {
    setPycomp(!pycomp);
    if (ccomp === true) {
      setCComp(!ccomp);
    }
    setValue('py')
  }
  useEffect(() => {
    if (!codeMirrorInstance && editorRef.current) {
      // Initialize CodeMirror with options
      const editor = CodeMirror(editorRef.current, {
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
      });

      setCodeMirrorInstance(editor);

      // Handle code changes
      editor.on('change', (instance) => {
        // Access the code from the editor instance
        const code = instance.getValue();
        setFinalCode(code);
        // You can use 'code' for further processing or state management
      });
    }

    return () => {
      // Cleanup: Remove the CodeMirror editor's associated DOM element
      if (codeMirrorInstance) {
        const editorContainer = editorRef.current;
        editorContainer.parentNode.removeChild(editorContainer);
      }
    };
  }, [codeMirrorInstance]);

  const handleLogCode = async (e) => {
    e.preventDefault()
    try {
      console.log('Sending POST REQUEST')
      const response = await axios.post('http://127.0.0.1:5000/run', { info: finalCode })
      console.log('POST request response:', response.data)
      setStringData(response.data)
      setBool(true)
      
      
      
    } catch (error) {
      console.error('Error:', error);
    }

  };

  const handleHint = async (e) => {
    e.preventDefault()  
    try {
      console.log('Sending POST REQUEST')
      const response = await axios.post('http://127.0.0.1:5000/hint', { info: finalCode })
      console.log('POST request response:', response.data)
      setStringData(response.data)
      setBool(true)
      
      
      
    } catch (error) {
      console.error('Error:', error);
    }

  }

  return (
    <section className="MainSec">
      <div
        className='CompileHeader'
      >
        <h5>Which compiler would you prefer to select ?</h5>
        <div
          className='SeBtn'
        >
          {/* <Button BtnName="C" onClick={changeC}/> <Button BtnName="Python" onClick={changePy}/> */}
          <button className="button type1" onClick={changeC} style={{ backgroundColor: ccomp ? "green" : "transparent" }}>
            <span className="btn-txt" >C</span>
          </button>
          <button className="button type1" onClick={changePy} style={{ backgroundColor: pycomp ? "green" : "transparent" }}>
            <span className="btn-txt">Python</span>
          </button>
        </div>

      </div>
      <div className="code-editor" >
        <div ref={editorRef} className="code-mirror-container" />
        <div className="OutputBox">
          {bool?<div>
            <button style={{padding:'10px 20px', border:'1px solid black', backgroundColor:'black'}} onClick={speakText(stringData)}>Speak</button>
           <div> {stringData}</div> </div>:<div></div>}
        </div>
        <div className="BtnBox">
        <button>
            <a href="/" className="btn2" onClick={handleLogCode} ><span class="spn2">Run</span></a>
        </button>
        <button onClick={handleHint} >
            <a href="/" className="btn2"><span class="spn2">Hint</span></a>
        </button>
        </div>

      </div>
    </section>
  );
}

export default React.memo(CodeEditor);