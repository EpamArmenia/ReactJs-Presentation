import React, {Component} from "react";
import Products from "./Products.jsx";

class BlogPost extends Component {
    render() {
        
        return (
            <div>
                <h1>{this.props.title}</h1>
                <Products  />
            </div>
        );
    }
}



export default BlogPost;