import React, {Component} from "react";
import {Product} from "./Product.jsx";
import {EditProduct} from "./EditProduct.jsx";
import {Preloader} from "./Preloader.jsx";
import {Common} from "./Common.jsx";

import {Button, Modal, Form} from 'react-bootstrap';


export default class Products extends Common{
  constructor(props) {
    super(props);
    // this.state = {};
    this.state.showModal = false;
    this.state.products = [];
    this.state.selectedProduct = {};
    
  }

  componentDidMount() {
    this.setState({loading: true});
    this.updateStyles();
    var prs = this;
    fetch('/Products/GetProducts', {
      method: 'GET'
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      prs.setState({ products: data });
      prs.setState({ loading: false });
    }).catch(function (err) {
      prs.setState({ loading: false });
      console.log(err);
    });
  }

  updateProduct(pr) {
    var index = this.state.products.findIndex((item) => item.id == pr.id);
    var prCopy = this.state.products;
    
    prCopy[index] = pr;

    this.setState({ products: prCopy });
  }

  deleteProduct(index) {
    var index = this.state.products.findIndex((item) => item.id == index);
    var prCopy = this.state.products;
    prCopy.splice(index, 1);
    this.setState({ products: prCopy });
  }

  handleDeleteClick(item) {
    var base = this;
    this.setState({ loading: true });
    fetch('/Products/DeleteProduct/' + item, {
      method: 'POST'
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      base.deleteProduct(item);
      base.setState({ loading: false });
    });
  }

  render() {
    this.editProductModal = <EditProduct ref="editProductModal" handleUpdate={(pr) => this.updateProduct(pr) } product={this.state.selectedProduct}
      close={() => this.close() } updateProducts={(pr) => this.updateProducts(pr) } />;
    return <div>
      <div>
        <Button bsStyle="primary" onClick={() => this.addNewProduct() } >Add New Product</Button>
      </div>
      <Preloader style={this.preloaderDivStyle}/>
      {this.state.products.map(item => {
        return (<Product key={item.id} id={item.id} title={item.title} price={item.price} name={item.name}
          handleClick={(item) => this.editProduct(item) } handleDeleteClick={(item) => this.handleDeleteClick(item) } />);
      }) }

      <Modal show={this.state.showModal} onHide={() => this.close() }>
      
        <Modal.Header>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.editProductModal}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => this.close() }>Close</Button>
        </Modal.Footer>

      </Modal>

    </div>;
  }

  editProduct(id) {
    var pr = this.state.products.find((item) => item.id == id);

    this.setState({ selectedProduct: pr });
    this.open(pr);

  }

  addNewProduct() {
    this.open();
  }

  updateProducts(pr) {
    this.setState({ products: this.state.products.concat(pr) });
  }

  close() {
    this.setState({ showModal: false });
  }

  open(pr) {
    if (pr) {

    } else {
      this.setState({ selectedProduct: this.initialProductData});
    }

    this.setState({ showModal: true });
  }
}