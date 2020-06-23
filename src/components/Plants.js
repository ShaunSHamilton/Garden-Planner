import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import '../styles/Plants.css';

import { connect } from 'react-redux';

const Plants = (props) => {
    const [modalContent, setModalContent] = useState('');
    const [isToggled, setIsToggled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const showModal = (plant) => {
        setIsToggled(!isToggled);
        setModalContent(plant)
    }
    useEffect(() => {
        setIsLoading(false);
    }, [props.isLoading])

    if (isLoading) {
        return (
            <div>
                <h1>LOADING DATA...</h1>
            </div>
        )
    } else {
        console.log("RUN2")
        return (
            <div>
                <div className={"modal fade justify-content-center align-items-center" + (isToggled ? " d-flex show" : "")} id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden={String(isToggled)}>
                    <div className="modal-dialog mw-100" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModal3Label">{modalContent.title}</h5>
                                <button type="button" className="close" onClick={showModal} data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {isToggled && <Grid sow={modalContent.sowMonths} harv={modalContent.harvestMonths} flow={modalContent.floweringMonths} />}<hr></hr>
                                {modalContent.desc}<hr></hr>
                                {modalContent.sowDesc}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={showModal} data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="accordion" role="tablist">
                    {props.sow && <Sow sow={props.plants} showModal={showModal} />}
                    {props.harvest && <Harvest harvest={props.plants} showModal={showModal} />}
                </div>
            </div >
        )
    }
}

const Grid = (props) => {
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // console.log(props.sow, props.harv, props.flow)
    return (
        <div className="grid-container">
            {MONTHS.map((month, i) => <div key={i} className="grid-item" ><div>{month}</div><div className={props.sow.includes(i) ? "blue" : ""}>{props.sow.includes(i) ? 's' : ''}</div><div className={props.harv.includes(i) ? "orange" : ""}>{props.harv.includes(i) ? 'h' : ''}</div><div className={props.flow.includes(i) ? "green" : ""}>{props.flow.includes(i) ? "f" : ''}</div></div>)}
        </div>
    )
}

const Sow = (props) => {
    const [isToggled, setIsToggled] = useState(false);
    return (
        <>
            <div className="card">
                <div className="card-header" role="tab" id="headingOne">
                    <h5 className="mb-0">
                        <a data-toggle="collapse" href="#collapseOne" onClick={() => setIsToggled(!isToggled)} aria-expanded="true" aria-controls="collapseOne">
                            Sow
                        </a>
                    </h5>
                </div>
            </div>
            <div id="collapseOne" className={"collapse" + (isToggled ? " show" : "")} role="tabpanel" aria-labelledby="headingOne">
                <div className="card-body">
                    <Plant plants={props.sow} showModal={props.showModal} />
                </div>
            </div>
        </>
    )
}

const Harvest = (props) => {
    const [isToggled, setIsToggled] = useState(false);
    return (
        <>
            <div className="card">
                <div className="card-header" role="tab" id="headingTwo">
                    <h5 className="mb-0">
                        <a className="collapsed" data-toggle="collapse" href="#collapseTwo" onClick={() => setIsToggled(!isToggled)} aria-expanded="false" aria-controls="collapseTwo">
                            Harvest
                    </a>
                    </h5>
                </div>
            </div>
            <div id="collapseTwo" className={"collapse" + (isToggled ? " show" : "")} role="tabpanel" aria-labelledby="headingTwo">
                <div className="card-body">
                    <Plant plants={props.harvest} showModal={props.showModal} />
                </div>
            </div>
        </>
    )
}

const Plant = (props) => {
    return (
        <div id="container">
            <div className="card-deck flex-sm-column justify-content-center flex-lg-row flex-wrap">
                {props.plants.map((plant, i) => <Card key={i} showModal={props.showModal} plant={plant} />)}
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
        <div id="plants-container" className={"card shadow m-2 m-lg-1" + (isHovered ? " hovered-img" : "")} onMouseEnter={handleHover} onMouseLeave={handleUnhover}>
            <a href="#" onClick={() => props.showModal(props.plant)}>
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h4 className="card-title">{props.plant.title}</h4>
                    <img alt="Some plant" src={props.plant.img} />
                </div>
            </a>
        </div>
    )
}

const mapStateToProps = state => ({
    plants: state.plants.plants,
    isLoading: state.plants.isLoading,
    sow: state.plants.sow,
    harvest: state.plants.harvest
});

export default connect(mapStateToProps)(Plants);