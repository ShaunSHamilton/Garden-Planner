import React from 'react';
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

const EXAMPLE = [
  { title: "Stupid Potatos", img: "https://search.thompson-morgan.com/thumb.php?f=https%3a%2f%2fwww.thompson-morgan.com%2fproduct_images%2f100%2f8975340994590.jpg&s=254", desc: "Later maturing, Sweetcorn Conquerer is well adapted to our indifferent summer weather. Strong growing plants 210cm (7ft) tall, with very few tillers (sideshoots), averaging three, 20cm (8in) long cobs per plant, each with 14-18 rows of kernels full to the tip. Sweetcorn Conquerer has superb eating quality!", sowDesc: "Sow seeds in mid spring 4 weeks before last expected frost in your area, singly 1cm (0.5in) deep in 7.5cm (3in) pots of compost. Germination usually takes 6-10 days at 21-24C (70-75F). Plant out 45cm (18in) apart when all danger of frost has passed, in blocks of short rows rather than one long row to ensure adequate cross pollination. A warm, sunny sheltered position in fertile, moist yet free draining soil is best.", sowMonths: [3, 4], harvestMonths: [8, 9], floweringMonths: [6, 7] },
  { title: "Ugly Vegetables", img: "" }
]

function App() {
  return (
    <Router>
      <div>
        <Link to="/"><h1 id="heading">My Garden Planner</h1></Link>
        <Switch>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/plants">
            <Plants sow={true} harvest={false} plants={EXAMPLE} />
          </Route>
          <Route path="/">
            <Calendar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
