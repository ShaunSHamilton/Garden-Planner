import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

import { connect } from 'react-redux';
import { setMonth } from '../actions/plantActions';
import { fetchPlants } from '../actions/plantActions';
import PropTypes from 'prop-types';


const MONTHS = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];


const Calendar = (props) => {
    return (
        <div id="container">
            <div id="input"><label htmlFor="sow">Sow</label><input id="sow" name="sow" type="checkbox" value="sow" defaultChecked></input><label htmlFor="harvest">Harvest</label><input id="harvest" name="harvest" type="checkbox" value="harvest" defaultChecked></input></div>
            <div className="card-deck flex-xs-column flex-lg-row flex-wrap" id="months">
                {MONTHS.map((month, i) => <Card key={i} action={props.setMonth} fetchData={props.fetchPlants} month={month} />)}
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
        <div className={"card shadow m-3 m-lg-1" + (isHovered ? " hovered-img" : "")} onMouseEnter={handleHover} onMouseLeave={handleUnhover}>
            <Link to="/categories" onClick={() => { props.action(MONTHS.indexOf(props.month), [document.getElementById('sow').checked, document.getElementById('harvest').checked]); props.fetchData(); }}>
                <div className="card-body">
                    <h4 className="card-title">{props.month}</h4>
                    <p className="card-text">This content is a little bit longer.</p>
                </div>
            </Link>
        </div >
    )
}

Calendar.propTypes = { setMonth: PropTypes.func.isRequired, month: PropTypes.string }

const mapStateToProps = state => ({
    month: state.month
})

export default connect(mapStateToProps, { setMonth, fetchPlants })(Calendar);