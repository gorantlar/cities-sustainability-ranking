import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ControlPanel = () => {

  return (
    <div className="control-panel">
      <img width="100%" src="/Our_Cities_Logo.png" />
    </div>
  )
};

export default React.memo(ControlPanel);