import React, { Component, useEffect, useState,useContext, useRef } from "react";
import {MyContext} from '../index'

// useState
// useEffect
// useRef
// createContext / useContext

export default function HookTest(props) {
  const [count, setCount] = useState(props.defaultCount);
  const [checked,setChecked] = useState(false)

  const [inputValue,setInputValue] = useState('')

  const color = useContext(MyContext)
  function consoleLogger(){
      console.log('hello world')
  }
  function btnClick(){
      console.log('button click')
  }

//   useEffect(()=>{
//     document.getElementById('increment').addEventListener('click',btnClick)
//   },[])

  useEffect(()=>{
 
    return ()=>{
        document.getElementById('increment').removeEventListener('click',btnClick)
    }
  },[checked])


  const inputValueRef = useRef()
  

  function inpRef(){
      console.log(inputValueRef.current)
  }
  return (
    <div>
      <p style={color.red}>Счетчик: {count}</p>
      <button 
        onClick={() => {
          setCount(props.defaultCount);
        }}
      >
        Сброс
      </button>
      <input type="checkbox" name="" id="" onChange={()=>setChecked(true)}/>
      <button id="increment" onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>

      <br></br>
      <input type="text" ref={inputValueRef} onChange={()=>{inpRef()}}/>
      <br></br>
      <h1>{inputValue}</h1>
    </div>
  );
}


class HookClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "Test title",
      count: 0,
      value: "text",
    };
    this.updateStates = this.updateStates.bind(this);
    
  }
  updateValues = {
    title: "New title",
    value: "New text",
  };

  updateStates() {
      console.log('qwe')
    this.setState((prevState) => {
      return { ...prevState, ...this.updateValues};
    });
  }
  
  render() {
    
    return (
      <div>
        <hr />
        <p style={this.context.blue}>{this.state.title}</p> : {this.state.value} : {this.state.inputValue ? this.state.inputValue : 'No inputValue'}
        <button
          onClick={() => {
            this.updateStates();
          }}
        >
          Click
        </button>
      </div>
    );
  }
  
}
// HookClass.contextType = MyContext
export {HookClass};