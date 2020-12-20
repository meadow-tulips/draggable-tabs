import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import './index.css';



const TabElement = ({ item, position, className, onTabClick, onClose, tabWidth }) => {
    return (
    <div style={{ width: tabWidth}} className={className} onClick={() => onTabClick(position)}>
                            {item}
    <span className="close" onClick={(e) => {e.stopPropagation(); onClose(position)}}>&times;</span>
    </div>)
    };


export default SortableElement(TabElement);