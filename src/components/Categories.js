import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import '../styles/Categories.css';

import { connect } from 'react-redux';
import { fetchPlants } from '../actions/plantActions';
import PropTypes from 'prop-types';

const URL = "https://www.thompson-morgan.com"

Plants.propTypes = { fetchPlants: PropTypes.func.isRequired, plants: PropTypes.array.isRequired }

const Categories = (props) => {
    const CATEGORIES = [
        { title: "All Other Vegetable Seeds", img: URL + "/images/landing/all-other-vegetable-seeds1.jpg", numProducts: 46 },
        { title: "Beetroot & Chard Seeds", img: URL + "/images/landing/beetroot-and-chard-seeds.jpg", numProducts: 30 },
        { title: "Brassica & Leafy Green Seeds", img: URL + "/images/landing/brassica-and-leafy-green-seeds.jpg", numProducts: 61 },
        { title: "Carrot & Parsnip Seeds", img: URL + "/images/landing/carrot-and-parsnip-seeds.jpg", numProducts: 37 },
        { title: "Herb Seeds", img: URL + "/images/landing/herb-seeds2.jpg", numProducts: 60 },
        { title: "Onion & Leek Seeds", img: URL + "/images/landing/onion-and-leek-seeds.jpg", numProducts: 51 },
        { title: "Pea & Bean Seeds", img: URL + "/images/landing/pea-and-bean-seeds.jpg", numProducts: 60 },
        { title: "Pepper (Sweet) & Chilli Seeds", img: URL + "/images/landing/pepper-sweet-and-chilli-seeds.jpg", numProducts: 53 },
        { title: "Pumpkin, Squash & Courgette Seeds", img: URL + "/images/landing/pumpkin-squash-and-courgette-seeds.jpg", numProducts: 56 },
        { title: "Salad Seeds", img: URL + "/images/landing/salad-seeds1.jpg", numProducts: 56 },
        { title: "Tomato Seeds", img: URL + "/images/landing/most-popular-plants-tomato-plants.jpg", numProducts: 60 },
    ];
    useEffect(() => {
        for (let plant of props.data) {
            for (let cat of CATEGORIES) {
                cat.numProducts = 0;
                if (plant.category == cat.title && plant.sowMonths.includes(props.month)) {
                    cat.numProducts += 1;
                }
            }
        }
    }, []);
    useEffect(() => {
        this.props.fetchPlants();
    })

    return (
        <div id="container">
            <div className="card-deck flex-sm-column justify-content-center flex-lg-row flex-wrap">
                {CATEGORIES.map((category, i) => <Card key={i} action={props.action} title={category.title} numPlants={category.numProducts} img={category.img} />)}
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
            <Link to="/plants" onClick={() => props.action(props.title)}>
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h4 className="card-title">{props.title} ({props.numPlants})</h4>
                    <img src={props.img} />
                </div>
            </Link>
        </div>
    )
}

const mapStateToProps = state => ({
    plants: state.plants.plants
})

export default connect(mapStateToProps, { fetchPlants })(Plants);