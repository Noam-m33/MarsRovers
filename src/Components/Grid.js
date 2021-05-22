import React from 'react';
import RoverImage from '../assets/roverMars.png';


const Grid = ({ initialValue, roverXPosition, roverYPosition, maxX, maxY, orientation }) => {

  let coordinates = []

  for(let y = maxY; y > -1; y--) {
    for(let x = 0; x <= maxX; x++) {
      let point = x.toString() + y.toString()
      coordinates.push(point)
    }
  }

  const rover1Point = `${roverXPosition?.[1]}${roverYPosition?.[1]}`
  const rover2Point = `${roverXPosition?.[2]}${roverYPosition?.[2]}`
  const orientation1 = orientation?.[1];
  const orientation2 = orientation?.[2];
  
  return( 
  <div>
   <h3>{initialValue ? "Initial Position" : "End Position"}</h3>
    <div className='Grid'>
    
      {
        coordinates.map((coordinatePoint) => {
          return(
            <div className='square' id={coordinatePoint}>
              {
                (rover1Point === coordinatePoint) &&
                <div>
                  <img className={`roverImg ${orientation1}`} src={RoverImage} alt="rover" /> 
                  <p>Rover 1</p>
                </div>
              }
              {
                (rover2Point === coordinatePoint) && 
                <div>
                  <img className={`roverImg ${orientation2}`} src={RoverImage} alt="rover" /> 
                  <p>Rover 2</p>
              </div> 
              }
            </div>
          )
        })
      }
    </div>
</div>
);

}
   

export default Grid;