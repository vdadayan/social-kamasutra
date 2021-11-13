import React from 'react';
import { NavLink } from 'react-router-dom';

const DialogItem = ({name, id}) => {
    return(
        <div className="dialog active">
            <NavLink to={`/Dialogs/${id}`}>{name}</NavLink> 
        </div>
    );
}

export default DialogItem;