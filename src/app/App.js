import './App.css';
import { useEffect, useState } from 'react';
import { Field, Player } from './ui';

export default function App() {
  const [count, setCount] = useState([0, 0]);
  useEffect(() => {
    console.log(count);
  }, [count]);


  useEffect(() => {
    const field = new Field(setCount);
    const player = new Player(60, 60, 50, 'red', field);
    const player2 = new Player(1540, 60, 50, 'blue', field);

    field.start(player, player2);

    return () => {
      field.stop();
    }
  }, []);

  return (
    <>
      <div>{count[0]} : {count[1]}</div>
      <canvas id="canvas" width="1600" height="900"></canvas>
    </>
  );
}
