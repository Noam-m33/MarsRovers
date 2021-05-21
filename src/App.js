import { useState } from 'react';
import './App.css';
import Grid from './Components/Grid';
import Input from './Components/Input';
import Rover from './Components/Rover';

function App() {
  const [roverInitialPosition, setRoverInitalPosition] = useState("00")
  const [maxX, setMaxX] = useState('0')
  const [maxY, setMaxY] = useState('0')
  const [roverFinalX, setRoverFinalX] = useState()
  const [roverFinalY, setRoverFinalY] = useState()
  const [roverInitialX, setRoverInitialX] = useState()
  const [roverInitialY, setRoverInitialY] = useState()
  const [step, setStep] = useState();
  const [rover1Mouvement, setRover1Mouvement] = useState(false);
  const [rover2Mouvement, setRover2Mouvement] = useState(false);
  const [orientation, setOrientaion] = useState();
  
  function handleInputSubmit(inputValue){
    // get and seperate all textArea value
    const lineBreakValue = inputValue?.split("\n");

    // set gridArea with max coordinate
    const gridValue = lineBreakValue[0]?.split(' ');
    if(gridValue[0]) setMaxX(gridValue[0]);
    if(gridValue[1]) setMaxY(gridValue[1]);

    // set rover1 inital value and movement
    const rover1InitialPosition = lineBreakValue[1]?.split(' ');
    setStep({ 1:0 })
    setRover1Mouvement(lineBreakValue[2]?.split(''));
    
    // set rover2 inital value and movement
    const rover2InitialPosition = lineBreakValue[3]?.split(' ');
    setRoverFinalX({ 1: rover1InitialPosition[0], 2: rover2InitialPosition[0]});
    setRoverFinalY({ 1: rover1InitialPosition[1], 2: rover2InitialPosition[1]});
    setRoverInitialX({ 1: rover1InitialPosition[0], 2: rover2InitialPosition[0]});
    setRoverInitialY({ 1: rover1InitialPosition[1], 2: rover2InitialPosition[1]});
    setOrientaion({1: rover1InitialPosition[2], 2: rover2InitialPosition[2]});
    setRover2Mouvement(lineBreakValue[4]?.split(''));
  };

  //Change Rover Orientation State Functions
  function goToN(id){
    console.log('turnToN');
    setOrientaion({...orientation, [id]:"N"});
    setStep({...step, [id]: step[id]+1 })
  }
  function goToE(id){
    setOrientaion({...orientation, [id]:"E"});
    console.log('turnToE');
    setStep({...step, [id]: step[id]+1 })
  }
  function goToS(id){
    setOrientaion({...orientation, [id]:"S"});
    console.log('turnToS');
    setStep({...step, [id]: step[id]+1 })
  }
  function goToW(id){
    console.log('turnToW');
    setOrientaion({...orientation, [id]:"W"});
    setStep({...step, [id]: step[id]+1 })
  }

  //Change Rover Coordinate Point State Functions
  function goToXMore1(id){
    console.log('x+1');
    if(roverFinalX[id] >= 0 && roverFinalX[id] < maxX){
      setRoverFinalX({...roverFinalX, [id]: parseInt(roverFinalX[id])+1});
    }
    setStep({...step, [id]: step[id]+1 })
  }
  function goToXLess1(id){
    console.log('x-1', roverFinalX[id] < maxX);
    if(roverFinalX[id] >= 0 && roverFinalX[id] < maxX){
      setRoverFinalX({...roverFinalX, [id]: parseInt(roverFinalX[id])-1});
    }
    setStep({...step, [id]: step[id]+1 })
  }
  function goToYMore1(id){
    console.log('y+1');
    if(roverFinalY[id] >= 0 && roverFinalY[id] < maxY){
      setRoverFinalY({...roverFinalY, [id]: parseInt(roverFinalY[id])+1});
    }
    setStep({...step, [id]: step[id]+1 })
  }
  function goToYLess1(id){
    console.log('y-1');
    if(roverFinalY[id] >= 0 && roverFinalY[id] < maxY){
      setRoverFinalY({...roverFinalY, [id]: parseInt(roverFinalY[id])-1});
    }
    setStep({...step, [id]: step[id]+1 })
  }
  

  // Call the corresponding function depending on the orientation of the rovers
  function mouvL(id){
    switch(orientation?.[id]){
      case "N":
        goToW(id)
        break;
      case "W":
        goToS(id)
        break;
      case "S":
        goToE(id)
        break;
      case "E":
        goToN(id)
        break;
      default: console.log('errorr');
    }
  }
  function mouvR(id){
    switch(orientation?.[id]){
      case "N":
        goToE(id)
        break;
      case "W":
        goToN(id)
        break;
      case "S":
        goToW(id)
        break;
      case "E":
        goToS(id)
        break;
        default: console.log('errorrr');
    }
  }
  function mouvM(id){
    switch(orientation?.[id]){
      case "N":
        goToYMore1(id)
        break;
      case "W":
        goToXLess1(id)
        break;
      case "S":
        goToYLess1(id)
        break;
      case "E":
        goToXMore1(id)
        break;
        default: console.log('errorrrrr');
    }
  }

  // Function call by the first rover when it's end to move, and wich triggers the second
  function ends(){
    setStep({...step, 2:0})
    console.log('ends');
  }
  
  return (
    <div className="App">
      <div className="main">
        <Input handleInputSubmit={handleInputSubmit} />
        <div className="output">
          {
            rover1Mouvement && 
            <>  
              <h2>Output</h2>
              <Rover id={1} step={step[1]} orientation={orientation?.[1]} mouvement={rover1Mouvement} ends={ends} mouvR={mouvR} mouvM={mouvM} mouvL={mouvL} x={roverFinalX?.[1]} y={roverFinalY?.[1]} />
            </>
          }
          {
            (step?.[2] >= 0) &&
            <Rover id={2}  step={step[2]} orientation={orientation?.[2]} mouvement={rover2Mouvement} ends={ends} mouvR={mouvR} mouvM={mouvM} mouvL={mouvL} x={roverFinalX?.[2]} y={roverFinalY?.[2]} />
          }    
        </div>
      </div>
      {
        (step?.[2] === 10) &&
        <div className="gridsContainer">
          <Grid initialValue={true} roverXPosition={roverInitialX} roverYPosition={roverInitialY} maxX={maxX} maxY={maxY} orientation={orientation}></Grid>
          <Grid initialValue={false} roverXPosition={roverFinalX} roverYPosition={roverFinalY} maxX={maxX} maxY={maxY} orientation={orientation}></Grid>  
        </div>
      }
    </div>
  );
}

export default App;