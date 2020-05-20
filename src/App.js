import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './styles/App.css';
import Calendar from './components/Calendar';
import Categories from './components/Categories';
import Plants from './components/Plants';

function App() {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState();
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let res = await fetch('https://raw.githubusercontent.com/Sky020/Garden-Planner/master/plantData.json');
      const info = await res.json();
      setData(info)
    }
    fetchData()
    setPlants(data)
  }, []);
  function getMonth(mon) {
    setMonth(mon);
  }
  function getData(cat) {
    let myPlants = [];
    for (let plant of data) {
      if (plant.category == cat) {
        myPlants.push(plant);
      }
    }
    setPlants(myPlants)
  }
  return (
    <Router>
      <div>
        <Link to="/"><h1 id="heading">My Garden Planner</h1></Link>
        <Switch>
          <Route path="/categories">
            <Categories month={month} action={getData} data={data} />
          </Route>
          <Route path="/plants">
            <Plants sow={true} harvest={false} plants={plants} />
          </Route>
          <Route path="/">
            <Calendar action={getMonth} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
