import React, {Component} from "react";
import {Button} from 'react-bootstrap';


export class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.displayBut = "none";
    }
    render() {
        var divStyle = {
            display: "inline-block",
            margin: 5
        };


        var imgStyle = {
            width: 200,
            height: 200,
            cursor: "pointer"
        };


        this.deleteButStyle = {
            position: "absolute",
            marginLeft: 180,
            display: this.state.displayBut

        };

        var imgDivStyle = {
            width: 200,
            height: 200,
        };

        return <div style={divStyle} >
            <h4>{this.props.title}</h4>
            <div style={imgDivStyle} onMouseOver={(e) => this.handleMouseOver(e) } onMouseOut={(e) => this.handleMouseOut(e) }>
                <Button ref="deleteButton" bsStyle="danger" bsSize="xsmall" style={this.deleteButStyle} onClick={(e) =>this.props.handleDeleteClick(this.props.id)}>X</Button>
                <img alt="Product Image" src="/Images/icecream.jpg" style={imgStyle} onClick={(e) => this.props.handleClick(this.props.id) }/>

            </div>
            <h5 className="toCenter">Price: ${this.props.price}</h5>
        </div>;
    }

    handleMouseOver(e) {
        this.setState({ displayBut: "block" });
    }

    handleMouseOut(e) {
        this.setState({ displayBut: "none" });
    }

}