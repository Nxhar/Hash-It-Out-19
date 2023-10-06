import React, { useEffect, useState, useRef } from 'react'
import ScrollReveal from 'scrollreveal';
import axios from 'axios'
import Speech from 'react-speech'


const Button = (props) => {
    return (
            <a className="fancy" href="/">
                <span className="top-key"></span>
                <span className="text">{props.BtnName}</span>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
            </a>
    )
}


const WordByWordAnimation = ({ text }) => {
  useEffect(() => {
    // Split the text into words
    const words = text.split(' ');

    // Apply animation to each word
    words.forEach((word, index) => {
      setTimeout(() => {
        const wordSpan = document.getElementById(`word-${index}`);
        if (wordSpan) {
          wordSpan.classList.add('animate-word');
        }
      }, index * 100); // Adjust the delay as needed
    });
  }, [text]);

  return (
    <div className="word-container">
      {text.split(' ').map((word, index) => (
        <span key={index} id={`word-${index}`} className="word">
          {word}
        </span>
      ))}
    </div>
  );
};




const Chatbot = ({input, setInput, stringData, setStringData}) => {

    const scrollRef = useRef();

    const [bool,setBool] = useState(false)
    const synth = window.speechSynthesis;
    const speakText = (tell) => {
        const utterance = new SpeechSynthesisUtterance(tell);
        synth.speak(utterance);
      };

  useEffect(() => {
    const scrollReveal = ScrollReveal({
      reset: true,
      distance: '30px',
      duration: 2500,
      delay: 400
    });

    scrollReveal.reveal('.MainHeader,.Skill,.fancy', { delay: 800, origin: 'top' });
    scrollReveal.reveal(' .LearnPara', { delay: 800, origin: 'left' });

    if(bool) {
        
    }
  }, [bool]);
  const[intrest,setIntrest] = useState('');
  const[mentor,setMentor]= useState('')

  

  const handleClick = async (e) => {
    e.preventDefault()
    if(intrest==='' || mentor===''){
    alert('Please fill up both the blanks before submitting!')
    }
    else{
        setInput({'topic':intrest, 'teacher': mentor, 'quiz':false, 'understood':true})
    }
 

    try {
        console.log('Sending POST REQUEST')
        const response = await axios.post('http://127.0.0.1:5000', { info: input })
        console.log('POST request response:', response.data)
        setStringData(response.data)
        setBool(true)
        
        
        
      } catch (error) {
        console.error('Error:', error);
      }
      
  }

  return (
    <>
    <section
      className='MainContainer'
    >
      <div
        className='MainHeader'
      >
        <h1><span>AI</span>ducation</h1>
      </div>
      <div className="ParaCon">
        <div
          className='LearnPara'
        >
          <h3>Welcome</h3>
          <p>What specific knowledge or skill are you interested in acquiring today??</p>
          <form
            className="ValidData" onSubmit={(e) => e.preventDefault()}>
            <input type="text" name="Intrest" className="Skill" placeholder="Type Your Interest..." value={intrest} onChange={(e)=>(setIntrest(e.target.value))}/><span onClick={handleClick}><Button BtnName="Submit" /></span>
          </form>
        </div>
        <div
          className='LearnPara'
        >
          <p>What kind of mentor would you like to teach you today?</p>
          <form
            className="ValidData" onSubmit={(e) => e.preventDefault()}>
            <input type="text" name="Intrest" className="Skill" placeholder="Type Here..." value={mentor} onChange={(e)=>(setMentor(e.target.value))} /><span onClick={handleClick}><Button BtnName="Submit" /></span>
          </form>
        </div>
      </div>

        

    </section>
    <div id='contentgen'>

    {
    bool? <div ref={scrollRef}><h3>Gather Around!</h3>
    <button style={{padding:'10px 20px', border:'1px solid black', backgroundColor:'black'}} onClick={speakText(stringData)}>Speak</button>
    <WordByWordAnimation text={stringData} /> <br></br>

         </div>
        : <div></div>
    }
</div>
</>
  )
}

export default Chatbot