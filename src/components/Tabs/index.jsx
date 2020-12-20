import React, { useEffect, useRef, useState } from 'react'
import {SortableContainer} from 'react-sortable-hoc';
import TabElement from './TabElement/index'
import './index.css';


const Tabs = ({ names = [], active,  onClose, onTabClick, renderTabAddButton, containerRef, tabWidth = 80 }) => {
    const onlyTabs = useRef(null);
    const [visiblePosition, updateVisiblePosition] = useState(0);
    const [visibleTabs, updateVisibleTabs] = useState(names.length);
    const [leftChevronVisibility, updateLeftChevronVisibility] = useState(false);
    const [rightChevronVisibility, updateRightChevronVisibility] = useState(false);


    const onLeftChevronClick = () => {
        if(visiblePosition > 0) {
                onlyTabs.current.style.transform += `translate(${tabWidth}px)`;
                updateVisiblePosition(visiblePosition - 1);
                updateRightChevronVisibility(true)
        }
    }

    const onRightChevronClick = () => {
        if(visiblePosition + visibleTabs < names.length) {
                onlyTabs.current.style.transform += `translate(-${tabWidth}px)`;
                updateVisiblePosition(visiblePosition + 1);
                updateLeftChevronVisibility(true);
        }
    }



    useEffect(() => {
        const containerRefElement = containerRef?.current;
        if(containerRefElement) {
            const containerWidth = containerRefElement.offsetWidth;
            const visibleTabs = parseInt((containerWidth - 45)/tabWidth);
            updateVisibleTabs(visibleTabs);

            if(names.length > visibleTabs) {
                updateLeftChevronVisibility(true);
                updateRightChevronVisibility(true);

            } else {
                if(visiblePosition === 0) {
                    updateLeftChevronVisibility(false);
                    updateRightChevronVisibility(false);
                }
            }

        }
    }, [names, containerRef, tabWidth, visiblePosition])

    useEffect(() => {
        if(visiblePosition + visibleTabs >= names.length) {
            updateRightChevronVisibility(false);
        }
        if(visiblePosition <= 0) {
            updateLeftChevronVisibility(false);
        }

    },[visiblePosition, names.length, visibleTabs])

    const className = "tab-element"
    const activeClassName = "tab-element active"
    return(
        <div className="tabs-wrapper">
            {leftChevronVisibility && <span onClick={onLeftChevronClick} className="chevron left"></span>}
              <div className="only-tabs-wrapper">
                    <div ref={onlyTabs} className="only-tabs">
                        {names.map((item, index) => <TabElement key={index} item={item} className={active === index ? activeClassName : className} index={index} onTabClick={onTabClick} onClose={onClose} position={index} tabWidth={tabWidth} />)}
                    </div>
                </div>
            {rightChevronVisibility && <span onClick={onRightChevronClick} className="chevron right"></span>}
            {renderTabAddButton && renderTabAddButton()}
        </div>
    )

}

export default SortableContainer(Tabs);