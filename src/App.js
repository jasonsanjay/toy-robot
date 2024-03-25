import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, facing: 'NORTH', placed: true });
  const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

  const placeRobot = (x, y, facing) => {
    if (x >= 0 && x < 5 && y >= 0 && y < 5 && directions.includes(facing)) {
      setPosition({ x, y, facing, placed: true });
    }
  };

  const moveRobot = () => {
    if (!position.placed) return;
    let { x, y, facing } = position;
    switch (facing) {
      case 'NORTH':
        if (y < 4) y += 1;
        break;
      case 'EAST':
        if (x < 4) x += 1;
        break;
      case 'SOUTH':
        if (y > 0) y -= 1;
        break;
      case 'WEST':
        if (x > 0) x -= 1;
        break;
      default:
        break;
    }
    setPosition({ ...position, x, y });
  };

  const rotateRobot = (direction) => {
    console.log("inside if<<",position.placed)
    if (!position.placed) return;
    let newIndex = directions.indexOf(position.facing) + (direction === 'LEFT' ? -1 : 1);
    console.log(newIndex,"new Index")
    if (newIndex < 0) newIndex = directions.length - 1;
    else if (newIndex >= directions.length) newIndex = 0;
    setPosition({ ...position, facing: directions[newIndex] });
  };
  
  const reportPosition = () => {
    if (!position.placed) return;
    alert(`X: ${position.x}, Y: ${position.y}, Facing: ${position.facing}`);
  };

  const handleCommand = (command) => {
    const parts = command.split(' ');
    const action = parts[0];
    const args = parts[1] ? parts[1].split(',') : [];
  
    switch (action) {
      case 'PLACE':
        if (args.length === 3) {
          const x = parseInt(args[0], 10);
          const y = parseInt(args[1], 10);
          const facing = args[2].toUpperCase();
          if (!isNaN(x) && !isNaN(y) && directions.includes(facing)) {
            placeRobot(x, y, facing);
          } else {
            console.error('Invalid PLACE arguments.');
          }
        } else {
          console.error('Invalid PLACE command.');
        }
        break;
      case 'MOVE':
        moveRobot();
        break;
      case 'LEFT':
      case 'RIGHT':
        rotateRobot(action);
        break;
      case 'REPORT':
        reportPosition();
        break;
      default:
        console.error('Invalid Command');
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleCommand(e.target.value.toUpperCase());
            e.target.value = ''; 
          }
        }}
        placeholder="Enter command"
      />
                     

      <div className="board">
        {[...Array(5)].map((_, y) => (
          <div key={y} className="row">
            {[...Array(5)].map((_, x) => (
              <div key={x} className={`cell ${position.x === x && position.y === 4 - y && position.placed ? 'robot' : ''}`}>
                {position.x === x && position.y === 4 - y && position.placed ? '*' : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;