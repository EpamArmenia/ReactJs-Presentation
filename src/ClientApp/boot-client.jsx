import React from "react";
import {render} from "react-dom";
import BlogPost from "./components/blogPost";

render(<BlogPost title="Title" content="Content"/>, document.getElementById("app"));