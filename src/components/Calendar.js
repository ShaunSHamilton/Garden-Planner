import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';


const MONTHS = [{ month: "January" },
{ month: "February" },
{ month: "March" },
{ month: "April" },
{ month: "May" },
{ month: "June" },
{ month: "July" },
{ month: "August" },
{ month: "September" },
{ month: "October" },
{ month: "November" },
{ month: "December" }];


const Calendar = () => {
    return (
        <div id="container">
            <div id="input"><label htmlFor="sow">Sow</label><input id="sow" name="sow" type="checkbox" value="sow" defaultChecked></input><label htmlFor="harvest">Harvest</label><input id="harvest" name="harvest" type="checkbox" value="harvest" defaultChecked></input></div>
            <div className="card-deck flex-sm-column flex-lg-row flex-wrap" id="months">
                {MONTHS.map((month, i) => <Card key={i} month={month.month} />)}
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
            <Link to="/categories">
                <div className="card-body">
                    <h4 className="card-title">{props.month}</h4>
                    <p className="card-text">This content is a little bit longer.</p>
                </div>
            </Link>
        </div>
    )
}

export default Calendar;