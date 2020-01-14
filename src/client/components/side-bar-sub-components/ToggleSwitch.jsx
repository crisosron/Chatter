import React, {useState} from "react";
import "./side-bar-sub-components-css-files/toggle-switch-styles.css"
export default function ToggleSwitch(props){
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

    // TODO: Need to have defaults
    const wrapperDivStyle = {
        ...props.style, // Can contain width, height and margin styling - If these are not provided, then these rules do not have a value
        backgroundColor: props.mainColor,
        color: props.secondaryColor,
        display: "flex", // Flexbox display is mandatory for this component
    };


    const customOptionDivStyles = {
        outline: "1px solid " + props.borderColor
    }
    
    return(
        <div id={props.id} style={wrapperDivStyle}>
            {props.options.map((optionName, index) => {

                // Each inner div represents an option in the toggleswitch
                return (
                    <div id={optionName.toLowerCase() + "Option"} 
                    key={index} 
                    onClick={() => setSelectedOptionIndex(index)} 
                    className={selectedOptionIndex === index ? "optionDiv selectedOptionDiv" : "optionDiv"}
                    style={customOptionDivStyles}
                    >
                        {optionName}
                    </div>

                )
            })}
        </div>
    );
}