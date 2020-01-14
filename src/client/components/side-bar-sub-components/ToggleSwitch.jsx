import React, {useState} from "react";
function ToggleSwitch(props){
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

    const wrapperDivStyle = {
        backgroundColor: props.style.mainColor,
        display: "flex",
        width: props.style.width !== undefined ? props.style.width : "50%",
        height: props.style.height !== undefined ? props.style.height : "50%",
        border: "1px solid green" //TODO: Temporary
    }

    const optionDivStyle = {
        flex: "1",
        border: "1px solid red", // TODO: Temporary

        // Centers the content (horizontally and vertically) that is held inside elements with the rule set
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const selectedOptionDivStyle = {
        filter: "brightness(110%)"
    }

    return(

        <div id={props.id} style={wrapperDivStyle}>
            {props.options.map((optionName, index) => {

                // Each inner div represents an option in the toggleswitch
                return (
                    <div id={optionName + "Option"} 
                    key={index} 
                    onClick={() => setSelectedOptionIndex(index)} 
                    style={selectedOptionIndex === index ? {...optionDivStyle, ...selectedOptionDivStyle} : optionDivStyle}
                    > {optionName} </div> 
                )
            })}
        </div>
    );
}