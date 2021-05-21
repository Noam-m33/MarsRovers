import { useState } from 'react';
import './App.css';
import Grid from './Components/Grid';
import Input from './Components/Input';
import Result from './Components/Result';
import Rover from './Components/Rover';


async function startRover(x, y, o, mouvement, callback){
  console.log(x, y, o);
  let newX = parseInt(x);
  let newY = parseInt(y);
  let newO = o;
  let i=0
  let array = [o]
  let degres = [0]
}

function App() {
  const [roverInitialPosition, setRoverInitalPosition] = useState("00")
  const [maxX, setMaxX] = useState('0')
  const [maxY, setMaxY] = useState('0')
  const [roverFinalX, setRoverFinalX] = useState({})
  const [roverFinalY, setRoverFinalY] = useState({})
  const [showOutput, setShowOutput ] = useState(false)
  const [step, setStep] = useState({});
  const [rover1Mouvement, setRover1Mouvement] = useState(false);
  const [rover2Mouvement, setRover2Mouvement] = useState(false);
  const [orientation, setOrientaion] = useState({});
  
  function handleInputSubmit(inputValue){
    // get and seperate all textArea value
    const lineBreakValue = inputValue?.split("\n");

    // set gridArea with max coordinate
    const gridValue = lineBreakValue[0]?.split(' ');
    if(gridValue[0]) setMaxX(gridValue[0]);
    if(gridValue[1]) setMaxY(gridValue[1]);

    // set rover1 inital value and movement
    const rover1InitialPosition = lineBreakValue[1]?.split(' ');
    setRoverFinalX({...roverFinalX, 1: rover1InitialPosition[0]});
    setRoverFinalY({...roverFinalY, 1: rover1InitialPosition[1]});
    setStep({...step, 1:0})
    setOrientaion({...orientation, 1: rover1InitialPosition[2]});
    setRover1Mouvement(lineBreakValue[2]?.split(''));

    // set rover2 inital value and movement
    const rover2InitialPosition = lineBreakValue[3]?.split(' ');
    setRoverFinalX({...roverFinalX, 2: rover2InitialPosition[0]});
    setRoverFinalY({...roverFinalY, 2: rover2InitialPosition[1]});
    setOrientaion({...orientation, 1: rover2InitialPosition[2]});
    setRover2Mouvement(lineBreakValue[4]?.split(''));
  };

  function goToN(id){
    console.log('turnToN');
    setOrientaion({...orientation, id:"N"});
    setStep({...step, id: step[id]+1 })
  }
  function goToE(id){
    setOrientaion({...orientation, id:"E"});
    console.log('turnToE');
    setStep({...step, id: step[id]+1 })
  }
  function goToS(id){
    setOrientaion({...orientation, id:"S"});
    console.log('turnToS');
    setStep({...step, id: step[id]+1 })
  }
  function goToW(id){
    console.log('turnToW');
    setOrientaion({...orientation, id:"W"});
    setStep({...step, id: step[id]+1 })
  }
  function goToXMore1(id){
    console.log('x+1');
    if(roverFinalX[id] >= 0 && roverFinalX[id] < maxX){
      setRoverFinalX({...roverFinalX, id: parseInt(roverFinalX[id]+1)});
    }
    setStep({...step, id: step[id]+1 })
  }
  function goToXLess1(id){
    console.log('x-1');
    if(roverFinalX[id] >= 0 && roverFinalX[id] < maxX){
      setRoverFinalX({...roverFinalX, id: parseInt(roverFinalX[id]-1)});
    }
    setStep({...step, id: step[id]+1 })
  }
  function goToYMore1(id){
    console.log('y+1');
    if(roverFinalY[id] >= 0 && roverFinalY[id] < maxY){
      setRoverFinalY({...roverFinalY, id: parseInt(roverFinalY[id]+1)});
    }
    setStep({...step, id: step[id]+1 })
  }
  function goToYLess1(id){
    console.log('y-1');
    if(roverFinalY[id] >= 0 && roverFinalY[id] < maxY){
      setRoverFinalY({...roverFinalY, [id]: parseInt(roverFinalY[id]-1)});
    }
    setStep({...step, id: step[id]+1 })
  }
  

  function mouvL(id){
    switch(orientation){
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
      default: console.log('error');
    }
  }
  function mouvR(id){
    switch(orientation){
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
        default: console.log('error');
    }
  }
  function mouvM(id){
    switch(orientation){
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
        default: console.log('error');
    }
  }
  function ends(){
    console.log('ends');
  }
  
  return (
    <div className="App">
      <Input handleInputSubmit={handleInputSubmit} />
      <Grid roverPosition={roverInitialPosition} maxX={maxX} maxY={maxY}>
      </Grid>
      {
        rover1Mouvement &&
        <Rover id={1} step={step[1]} orientation={orientation} mouvement={rover1Mouvement} ends={ends} mouvR={mouvR} mouvM={mouvM} mouvL={mouvL} x={roverFinalX?.[1]} y={roverFinalY?.[1]} />
      }
      {
        (step[2] >= 0) &&
        <Rover id={2}  step={step[2]} orientation={orientation?.[2]} mouvement={rover2Mouvement} ends={ends} mouvR={mouvR} mouvM={mouvM} mouvL={mouvL} x={roverFinalX?.[2]} y={roverFinalY?.[2]} />
      }
      {
        showOutput &&
        <Result r1X={roverFinalX?.[1]} r1Y={roverFinalY?.[1]} r1o={orientation?.[1]} r2X={roverFinalX?.[2]} r2Y={roverFinalX?.[2]} r2o={orientation?.[2]}/>
      }
    </div>
  );
}

export default App;

// mouvement.map((value) => {
//  console.log(mouvement[i]);
//       let value = mouvement[i]
//       if(value == "L"){
//         if(newO == "N") newO = "W";
//         if(newO == "W") newO = "S";
//         if(newO == "S") newO = "E";
//         if(newO == "E") newO = "N";
//       }
//       if(value == "R"){
//         if(newO == "N") newO = "E";
//         if(newO == "W") newO = "N";
//         if(newO == "S") newO = "W";
//         if(newO == "E") newO = "S";
//       }
//       if(value == "M"){
//         if(newO == "N") newY = newY++;
//         if(newO == "W") newX = newX--;
//         if(newO == "S") newY = newY--;
//         if(newO == "E") newX = newX++;
// })
// for(let i = 0; i < mouvement.length; i++) {
//   function getNextMove(value){
//     if(value == "L"){
//       if(newO == "N") newO = "W";
//       if(newO == "W") newO = "S";
//       if(newO == "S") newO = "E";
//       if(newO == "E") newO = "N";
//     }
//     if(value == "R"){
//       if(newO == "N") newO = "E";
//       if(newO == "W") newO = "N";
//       if(newO == "S") newO = "W";
//       if(newO == "E") newO = "S";
//     }
//     if(value == "M"){
//       if(newO == "N") { newY = (parseInt(newY)+1);};
//       if(newO == "W") newX = (parseInt(newX)-1);
//       if(newO == "S") newY = (parseInt(newY)-1);
//       if(newO == "E") newX = (parseInt(newX)+1);
//     }
//   let value = mouvement[i];
//   getNextMove(value);
//   }
//   console.log(newO, newX, newY, o);
// }
// for(let i = 0; i < mouvement.length; i++) {
//   let value = mouvement[i];
//   if(value == "L"){
//     if(newO[i] == "N") newO.push("W");
//     if(newO[i] == "W") newO.push("S");
//     if(newO[i] == "S") newO.push("E");
//     if(newO[i] == "E") newO.push("N");
//   }
//   if(value == "R"){
//     if(newO[i] == "N") newO.push("E");;
//     if(newO[i] == "W") newO.push("N");
//     if(newO[i] == "S") newO.push("W");
//     if(newO[i] == "E") newO.push("S");
//   }
//   if(value == "M"){
//     if(newO[i] == "N") newY.push((parseInt(newY)+1));
//     if(newO[i] == "W") newX.push((parseInt(newX)-1));
//     if(newO[i] == "S") newY.push((parseInt(newY)-1));
//     if(newO[i] == "E") newX.push((parseInt(newX)+1));
//   }
//   console.log(newO, newX, newY, o);
// }