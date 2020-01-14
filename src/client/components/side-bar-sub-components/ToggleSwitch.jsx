import React, {useState} from "react";
import "./side-bar-sub-components-css-files/toggle-switch-styles.css"
export default function ToggleSwitch(props){
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

    // TODO: Need to have defaults
    const wrapperDivStyle = {
        ...props.style,
        display: "flex", // Flexbox display is mandatory for this component
    };

    const optionBorder = {
        borderRight: "1px solid black"
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
                    style={index !== props.options.length - 1 ? optionBorder : {borderRight: "none"}} // Last optionDiv should not have borderRight
                    >
                        {optionName}
                    </div>

                )
            })}
        </div>
    );
}