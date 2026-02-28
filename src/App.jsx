import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const PROGRAM_WEEKS = 3;
  const DAYS_PER_WEEK = 4;
  const PERCENT_WEIGHT_EACH_DAY = [0.70, 0.75, 0.80, 0.85];
  const REPS_EACH_DAY = [6, 5, 4, 3];
  const SETS_EACH_DAY = [6, 7, 8, 10];

  const [repMax, setRepMax] = useState(63);
  const [increment, setIncrement] = useState(5);
  const [weeks, setWeeks] = useState([]);

  function updatePlan() {
    if (!increment || !repMax) {
      return;
    }
    const newWeeks = [];

    for (let week = 0; week < PROGRAM_WEEKS; week++) {
      const newWeek = [];
      for (let day = 0; day < DAYS_PER_WEEK; day++) {
        newWeek.push({
          day: day + 1,
          reps: REPS_EACH_DAY[day],
          sets: SETS_EACH_DAY[day],
          // weight: PERCENT_WEIGHT_EACH_DAY[day] * repMax + (increment * week)
          weight: Math.round((PERCENT_WEIGHT_EACH_DAY[day] * repMax + (increment * week)) / 2.5) * 2.5
        });
      }
      newWeeks.push(newWeek);
    }

    setWeeks(newWeeks);
  }

  function handleRepMaxChange(e) {
    setRepMax(e.target.value);
  }

  function handleIncrementChange(e) {
    setIncrement(e.target.value);
  }


  useEffect(() => {
    updatePlan();
  }, [increment, repMax]);

  return (
    <>
      <h1>React Overload</h1>
      <div className="inputs">
        <div className="input_row">
          <label for="rep_max">1 Rep Max</label>
          <input
            type="text"
            id="rep_max"
            value={repMax}
            onChange={handleRepMaxChange} />
        </div>
        <div className="input_row">
          <label for="increment">Increment</label>
          <select id="increment"
            onChange={handleIncrementChange} >
            <option value="2.5">2.5</option>
            <option value="5" selected>5</option>
            <option value="7.5">7.5</option>
          </select>
        </div>
      </div >
      <div className="outputs">
        {weeks.map((week, w) => <div className="week" key={w}>
          <h2>Week {w + 1}</h2>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {week.map((day, d) =>
                <tr key={d}>
                  <td>{day.day}</td>
                  <td>{day.sets}</td>
                  <td>{day.reps}</td>
                  <td>{day.weight}</td>
                </tr>)}
            </tbody>
          </table>
        </div>)}

      </div>
    </>
  )
}

export default App
