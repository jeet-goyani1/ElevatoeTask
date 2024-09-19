import React, { useState } from 'react';
import './table.css';
import im from './elevetor.svg';

let data = [
    {
        'button': false,
        'arrived': false,
        'Name': '9th',
        'floor': 9,
    },
    {
        'button': false,
        'arrived': false,
        'Name': '8th',
        'floor': 8,
    },
    {
        'button': false,
        'arrived': false,
        'Name': '7th',
        'floor': 7,
    },
    {
        'button': false,
        'arrived': false,
        'Name': '6th',
        'floor': 6,
    },
    {
        'button': false,
        'arrived': false,
        'Name': '5th',
        'floor': 5,
    },
    {
        'button': false,
        'arrived': false,
        'Name': '4th',
        'floor': 4,
    },
    {
        'button': false,
        'arrived': false,
        'Name': '3rd',
        'floor': 3,
    },
    {
        'button': false,
        'arrived': false,
        'Name': '2nd',
        'floor': 2,
    },
    {
        'button': false,
        'arrived': false,
        'Name': '1st',
        'floor': 1,
    },
    {
        'button': false,
        'arrived': false,
        'Name': 'Ground Floor',
        'floor': 0,
    },
];


let E_data = [
    {
        'floor': 0,
        'id': 0,
        'move':false,
    },
    {
        'floor': 0,
        'id': 1,
        'move':false,
    },
    {
        'floor': 0,
        'id': 2,
        'move':false,
    },
    {
        'floor': 0,
        'id': 3,
        'move':false,
    },
    {
        'floor': 0,
        'id': 4,
        'move':false,
    },
]

export const Table = () => {
    const [flor, setFloor] = useState(data);
    const [elevetor, setElevetor] = useState(E_data);
    let floors = [];
    let eData;


    const check = (ind, val) => {
        let element = [];
        element = [];


        if (elevetor !== undefined && floors !== undefined) {
            for (let index = 0; index < elevetor.length; index++) {
                if (val.button === false && val.arrived === false && elevetor[index].move === false) {
                    floors.push(elevetor[index].floor);
                } else {
                    floors.push(0);
                }
            }
            var closest = floors.reduce(function (prev, curr) {
                return (Math.abs(curr - val.floor) < Math.abs(prev - val.floor) ? curr : prev);
            });
        }

        if(val.floor !== closest){
            
        let newData = flor.map((value, index) => {
            if (ind === index) {
                value.button = true;
                return value;
            }
            return value;
        })
        setFloor(newData);

        if (closest === undefined || closest === 0) {
            eData = elevetor.map((value, index) => {
                if (value.floor === 0) {
                    for (let n = 0; n < E_data.length; n++) {
                        if (element.length === 0) {
                            for (let i = 0; i <= data.length; i++) {
                                if (i <= val.floor) {
                                    value.move = true;
                                    moveElevator(index, value.floor, val.floor);
                                }
                            }
                        }
                        element.push(value)
                        break;
                    }
                }
                return value;
            });
        } else {
            eData = elevetor.map((value, index) => {
                if (closest !== val.floor) {
                    if (value.floor === closest && value.floor !== 0) {
                        value.move = true;
                        moveElevator(index, value.floor, val.floor);
                    }
                }
                return value;
            });
        }
        setElevetor(eData);
        }

    };



    const moveElevator = (elevatorIndex, currentFloor, targetFloor) => {

        const eData = elevetor.map((v, index) => {
            if (index === elevatorIndex) {
                v.floor = currentFloor;
            }
            return v;
        });
        setElevetor(eData);

        setTimeout(() => {
            if (currentFloor < targetFloor) {
                moveElevator(elevatorIndex, currentFloor + 1, targetFloor);
            } else if (currentFloor > targetFloor) {
                moveElevator(elevatorIndex, currentFloor - 1, targetFloor);
            }
            else {
                but(elevatorIndex,targetFloor);
            }
        }, 500);
    };

    const but = (elevatorIndex , targetFloor) => {
        const newData = flor.map((value) => {
            if (value.floor === targetFloor) {
                value.arrived = true;
                value.button = false;
                elevetor[elevatorIndex].move = false; 
            }
            return value;
        });
        setFloor(newData);
        setTimeout(() => {
            setFloor(currentFloors =>
                currentFloors.map((value) => {
                    if (value.arrived) {
                        value.arrived = false;
                        elevetor[elevatorIndex].move = false; 
                    }
                    return value;
                })
            );
        }, 2000);
    };




    return (
        <div>
            {
                flor.map((value, index) => (
                    <div className='table'>
                        <h1 className='name'>{value.Name}</h1>
                        {
                            elevetor.map((val, ind) =>
                                <div key={ind} className='E_box'>
                                    {
                                        val.floor === value.floor ? <img className='images roll-out' src={im} alt="elevetor" /> : ''
                                    }
                                </div>
                            )
                        }
                        {
                            value.button ? <button className='wai' disabled={value.button}>
                                Waiting...
                            </button> : value.arrived ? <button className='arri' disabled={value.button}>
                                Arrived...
                            </button> : <button className='but' onClick={() => check(index, value)} disabled={value.button}>
                                call
                            </button>
                        }
                    </div>
                ))
            }
        </div>
    );
}