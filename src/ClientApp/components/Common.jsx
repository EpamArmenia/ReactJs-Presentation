import React, {Component} from "react";

export class Common extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.loading = false;
        this.initialProductData = {title: "", name: "", price: 0};

    }

    updateStyles() {
        this.preloaderDivStyle = {
            display: this.state.loading ? "block" : "none"
        };
    }

    setStateValue(data, newValue, propname) {
        var obj = data;
        obj[propname] = newValue;
        return obj;
    }
}