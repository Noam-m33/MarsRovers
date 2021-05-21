import React, { useEffect } from 'react';


const Rover = ({ step, orientation, mouvement, ends, mouvR, mouvM, mouvL, x, y, id }) => {
    useEffect(() => {
        if(step < mouvement.length){
            switch(mouvement[step]) {
                case "L": 
                    mouvL(id);
                    break;
                case "R":
                    mouvR(id);
                    break;
                case "M":
                    mouvM(id);
                    break
                default:
                    console.log('aucune correspondance');
            }
        } else {
            if(id === 1){
                ends();
            }
        }
    }, [step])
    return(
        <div>
           {x + " " + y + " " + orientation}
        </div>
    )
}

export default Rover;