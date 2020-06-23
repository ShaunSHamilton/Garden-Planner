import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import '../styles/Categories.css';

import { connect } from 'react-redux';
import { filterPlants, getPlantsFromCat } from '../actions/plantActions';
import PropTypes from 'prop-types';

// const URL = "https://www.thompson-morgan.com"

const Categories = (props) => {

    useEffect(() => {
        console.log("CATEGORIES: ", props.innerState)
        props.filterPlants(props.innerState)
    }, [props.plants])
    if (props.isLoading) {
        // props.filterPlants(props.innerState)
        return (
            <div id="container">
                <h1>LOADING DATA...</h1>
            </div>
        )
    } else {
        return (
            <div id="container">
                <div className="card-deck justify-content-center flex-lg-row flex-wrap">
                    {props.categories.map((category, i) => <Card key={i} plants={props.plants} action={props.getPlantsFromCat} title={category.title} numPlants={category.numProducts} img={category.img} />)}
                </div>
            </div>
        )
    }
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
            <Link to="/plants" onClick={() => props.action(props.plants, props.title)}>
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h4 className="card-title">{props.title} ({props.numPlants})</h4>
                    <img alt="Some category" src={props.img} />
                </div>
            </Link>
        </div>
    )
}

Categories.propTypes = { filterPlants: PropTypes.func.isRequired, plants: PropTypes.array, month: PropTypes.number, categories: PropTypes.array, isLoading: PropTypes.bool, innerState: PropTypes.object }

const mapStateToProps = state => ({
    plants: state.plants.plants,
    month: state.plants.month,
    categories: state.plants.categories,
    isLoading: state.plants.isLoading,
    innerState: state.plants
})

export default connect(mapStateToProps, { filterPlants, getPlantsFromCat })(Categories);