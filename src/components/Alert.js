import React from "react";

export const Alert = (props) => {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "Error"
        }
        word = word.toLowerCase()
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    return (
        <div style={{ height: '45px' }}>
            {props.alert && <div className={`alert alert-${props.alert.ty} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.ty)}! </strong> {props.alert.msg}
            </div>}
        </div>
    );
};
