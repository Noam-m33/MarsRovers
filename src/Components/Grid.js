import React from 'react';
import RoverImage from '../assets/roverMars.png';


const Grid = ({ roverPosition, maxX, maxY }) => {
  const coordinate = [
    '05','15','25','35','45','55',
    '04','14','24','34','44','54',
    '03','13','23','33','43','53',
    '02','12','22','32','42','52',
    '01','11','21','31','41','51',
    '00','10','20','30','40','50',
  ]
  let coordinates = []

  for(let y = maxY; y > -1; y--) {
    for(let x = 0; x <= maxX; x++) {
      let point = x.toString() + y.toString()
      coordinates.push(point)
    }
  }

  return( 
  <div className='Grid'>
    {
      coordinates.map((coordinatePoint) => {
        return(
          <div className='square' id={coordinatePoint}>
            {
              (roverPosition == coordinatePoint) && <img className="roverImg" src={RoverImage} alt="rover" />  
            }
          </div>
        )
      })
    }
  </div>
);

}
   

export default Grid;