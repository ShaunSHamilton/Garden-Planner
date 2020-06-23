import { FETCH_PLANTS, MONTH, FILTER, PLANT } from '../actions/types';

const URL = "https://www.thompson-morgan.com"
const initialState = {
    plants: [], month: '', sow: true, harvest: true, isLoading: true, categories: [{ title: "All Other Vegetable Seeds", img: URL + "/images/landing/all-other-vegetable-seeds1.jpg", numProducts: 0 },
    { title: "Beetroot & Chard Seeds", img: URL + "/images/landing/beetroot-and-chard-seeds.jpg", numProducts: 0 },
    { title: "Brassica & Leafy Green Seeds", img: URL + "/images/landing/brassica-and-leafy-green-seeds.jpg", numProducts: 0 },
    { title: "Carrot & Parsnip Seeds", img: URL + "/images/landing/carrot-and-parsnip-seeds.jpg", numProducts: 0 },
    { title: "Herb Seeds", img: URL + "/images/landing/herb-seeds2.jpg", numProducts: 0 },
    { title: "Onion & Leek Seeds", img: URL + "/images/landing/onion-and-leek-seeds.jpg", numProducts: 0 },
    { title: "Pea & Bean Seeds", img: URL + "/images/landing/pea-and-bean-seeds.jpg", numProducts: 0 },
    { title: "Pepper (Sweet) & Chilli Seeds", img: URL + "/images/landing/pepper-sweet-and-chilli-seeds.jpg", numProducts: 0 },
    { title: "Pumpkin, Squash & Courgette Seeds", img: URL + "/images/landing/pumpkin-squash-and-courgette-seeds.jpg", numProducts: 0 },
    { title: "Salad Seeds", img: URL + "/images/landing/salad-seeds1.jpg", numProducts: 0 },
    { title: "Tomato Seeds", img: URL + "/images/landing/most-popular-plants-tomato-plants.jpg", numProducts: 0 }]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PLANTS:
            return {
                ...state,
                plants: action.data, isLoading: true
            }
        case MONTH:
            return { ...state, month: action.data[0], sow: action.data[1][0], harvest: action.data[1][1] }
        case FILTER:
            return { ...state, categories: action.data[0], isLoading: action.data[1] }
        case PLANT:
            return { ...state, plants: action.data[0], isLoading: action.data[1] }
        default:
            return state;
    }
}