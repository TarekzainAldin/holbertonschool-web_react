import React from "react";
import './BodySectionWithMarginBottom.css';
import BodySection  from "./BodySection";;
import PropTypes from "prop-types";
import { Component } from "react";

class BodySectionWithMarginBottom extends Component{
    render ( ){
        return (
            <div className="bodysectionWithMargin">
                <BodySection {...this.Props}/>
            </div>
        );
    }
}
BodySectionWithMarginBottom.prototype = BodySection.prototype;
export default BodySectionWithMarginBottom;
