import { FETCH_PLANTS, MONTH, FILTER, PLANT } from './types';

export const fetchPlants = () => dispatch => {
    (async function fetchData() {
        let res = await fetch('https://raw.githubusercontent.com/Sky020/Garden-Planner/master/plantData.json');
        const info = await res.json();
        dispatch({ type: FETCH_PLANTS, data: info });
    })();
}

export const setMonth = (month, isSowOrHarv) => dispatch => {
    dispatch({ type: MONTH, data: [month, isSowOrHarv] })
}

export const filterPlants = (state) => async dispatch => {
    let tempCats = [...state.categories];
    for await (let plant of state.plants) {
        for await (let cat of tempCats) {
            if (plant.category === cat.title && plant.sowMonths.includes(state.month)) {
                cat.numProducts += 1;
            }
        }
    }
    await dispatch({ type: FILTER, data: [tempCats, false] })
}

export const getPlantsFromCat = (plants, title, month) => async dispatch => {
    let tempPlants = [];
    for await (let plant of plants) {
        if (plant.category === title && (plant.sowMonths.includes(month) || plant.harvestMonths.includes(month))) {
            tempPlants.push(plant)
        }
    }
    await dispatch({ type: PLANT, data: [tempPlants, false] })
}