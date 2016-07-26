import React from "react";
import {renderToString} from "react-dom/server";
import BlogPost from "./components/blogPost";

export default function (params) {
    return new Promise((resolve, reject) => {
        let html = renderToString(<BlogPost title="Title" content="Content"/>);
        resolve({ html });
    });
}

