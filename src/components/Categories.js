import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import '../styles/Categories.css';

const URL = "https://www.thompson-morgan.com"
const CATEGORIES = [
    { title: "All Other Vegetables", img: URL + "/images/landing/all-other-vegetable-seeds1.jpg", numProducts: 1 },
    { title: "Beetroots & Chards", img: URL + "/images/landing/beetroot-and-chard-seeds.jpg", numProducts: 1 },
    { title: "Brassicas & Leafy Greens", img: URL + "/images/landing/brassica-and-leafy-green-seeds.jpg", numProducts: 1 },
    { title: "Carrots & Parsnips", img: URL + "/images/landing/carrot-and-parsnip-seeds.jpg", numProducts: 1 },
    { title: "Herbs", img: URL + "/images/landing/herb-seeds2.jpg", numProducts: 1 },
    { title: "Onions & Leeks", img: URL + "/images/landing/onion-and-leek-seeds.jpg", numProducts: 1 },
    { title: "Peas & Beans", img: URL + "/images/landing/pea-and-bean-seeds.jpg", numProducts: 1 },
    { title: "Peppers & Chillis", img: URL + "/images/landing/pepper-sweet-and-chilli-seeds.jpg", numProducts: 1 },
    { title: "Pumpkins, Squash, & Courgettes", img: URL + "/images/landing/pumpkin-squash-and-courgette-seeds.jpg", numProducts: 1 },
    { title: "Salads", img: URL + "/images/landing/salad-seeds1.jpg", numProducts: 1 },
    { title: "Tomato", img: URL + "/images/landing/most-popular-plants-tomato-plants.jpg", numProducts: 1 },
];

const Categories = (props) => {
    return (
        <div id="container">
            <div className="card-deck flex-sm-column justify-content-center flex-lg-row flex-wrap">
                {CATEGORIES.map((category, i) => <Card key={i} title={category.title} numPlants={category.numProducts} img={category.img} />)}
            </div>
        </div>
    )
}

const Card = (props) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const handleHover = () => {
        setIsHovered(true);
    }
    const handleUnhover = () => {
        setIsHovered(false);
    }
    return (
        <div id="cats-container" className={"card shadow m-2 m-lg-1" + (isHovered ? " hovered-img" : "")} onMouseEnter={handleHover} onMouseLeave={handleUnhover}>
            <Link to="/plants">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h4 className="card-title">{props.title} ({props.numPlants})</h4>
                    <img src={props.img} />
                </div>
            </Link>
        </div>
    )
}

export default Categories;