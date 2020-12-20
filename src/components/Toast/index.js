import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Toast = ({ message, shouldShowToast}) => {
    if(message && shouldShowToast) {
        return(<div className="Toast">
                {message}
        </div>)
    } else {
        return null;
    }
}
const ToastPortal = (props) => ReactDOM.createPortal(<Toast {...props}/>, document.getElementById('portal'));

const withToastHoc = (Component) => {
    return function(props) { 
    const [shouldShowToast, updateShouldShowToast] = useState(false);
    const [message, updateMessage] = useState('');
    const showToast = (message) => {
        updateMessage(message);
        updateShouldShowToast(true);
        window.setTimeout(hideToast, 1000);
    }

    const hideToast = () => {
        updateMessage('');
        updateShouldShowToast(false);
    }
        
    return (
    <>
        <ToastPortal message={message} shouldShowToast={shouldShowToast} />
        <Component hideToast={hideToast} showToast={showToast} {...props} />
    </>
    );
  }
}
export default withToastHoc;