import { FETCH_PLANTS, MONTH } from './types';

export const fetchPlants = () => dispatch => {
    (async function fetchData() {
        let res = await fetch('https://raw.githubusercontent.com/Sky020/Garden-Planner/master/plantData.json');
        const info = await res.json();
        dispatch({ type: FETCH_PLANTS, data: info });
    })();
}