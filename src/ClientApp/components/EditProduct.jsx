import React, {Component} from "react";
import {Button, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import {Preloader} from "./Preloader.jsx";
import {Common} from "./Common.jsx";



export class EditProduct extends Common {

  constructor(props) {
    super(props);
    console.log(props);
    // this.state = {};
    this.state.data = this.props.product;
  }

  updateData(pr) {
    this.setState({ data: pr });
  }

  onPropChanged(e, name) {
    this.setState({ data: this.setStateValue(this.state.data, e.target.value, name) });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.handleUpdate(this.state.data);
    var base = this;

    this.setState({ loading: true });
    fetch('/Products/AddNewProduct', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.data)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      base.setState({ loading: false });
      base.props.close();
      if (!base.state.data.id) {
        base.props.updateProducts(data);
      }

      this.setState({ data: base.initialProductData });
    }).catch(function (err) {
      console.log(err);
    });
  }

  render() {
    this.updateStyles();

    return <div>

      <Form horizontal>
        <FormGroup controlId="formHorizontalTitle">
          <Col componentClass={ControlLabel} sm={2}>
            Title
          </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Title" value={this.state.data.title}  onChange={(e) => this.onPropChanged(e, 'title') } />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Name" value={this.state.data.name}  onChange={(e) => this.onPropChanged(e, 'name') } />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Price
          </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Price" value={this.state.data.price}  onChange={(e) => this.onPropChanged(e, 'price') }/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" onClick={(e) => this.onSubmit(e) }>
              Submit
            </Button>
          </Col>
        </FormGroup>

      </Form>
      <Preloader style={this.preloaderDivStyle}/>
    </div>;
  }
}