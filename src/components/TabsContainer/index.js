import React, { useEffect, useMemo, useRef, useState } from 'react'
import { arrayMove } from 'react-sortable-hoc';
import withToastHoc from '../Toast'

import Tabs from '../Tabs'

import './index.css'

const TabContainer = ({ data, showToast }) => {
  const containerRef = useRef(null);
  const [active, updateActiveTab] = useState(0);
  const [initialTabs, updateInitialTabs] = useState(data)

  const onSortEnd = ({oldIndex, newIndex}) => updateInitialTabs(arrayMove(initialTabs, oldIndex, newIndex))


  const onTabsDelete = (removedIndex) => {
    if(initialTabs.length > 1) {
      updateInitialTabs(initialTabs.filter((item, index) => index  !== removedIndex));
      showToast && showToast('Tab Removed');
    }
  }

  useEffect(() => {
    if(active >= initialTabs.length) {
      updateActiveTab(0);
    }
  },[initialTabs, active])

  const onTabAdd = () => {
      updateInitialTabs(initialTabs.concat({ name: `tab ${initialTabs.length + 1}`, data: `new tab data ${initialTabs.length + 1}`}))
  }

  const names = useMemo(() => {
    return initialTabs.map(item => item.name)
  }, [initialTabs])

  const className = "content"
  const hiddenClassName = "content hidden";
  return (
    <div className="tab-container" ref={containerRef}>
      <Tabs active={active} names={names} onClose={onTabsDelete} onTabClick={updateActiveTab}
        renderTabAddButton={() => (
          initialTabs.length < 9 ? <span className="add-button pointer" onClick={onTabAdd}>+</span> : null
        )}
        containerRef={containerRef}
        onSortEnd={onSortEnd}
        axis="x"
        pressDelay={200}
        tabWidth={120}
      />
      {initialTabs.map((item, index) => (
        <div key={index} className={index === active ? className : hiddenClassName}>
            {item.data}
        </div>
      ))}
    </div>
  );
}

export default withToastHoc(TabContainer);
