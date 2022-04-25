import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ControlPanel = () => {

  const { citySelected } = useSelector(state => state.cityData);
  // const loading = useSelector(state => state.loading);
  console.log(citySelected);
  // console.log('citySelected', citySelected);
  // console.log('loading', loading);

  return (
    <div className="control-panel">
      <h3>{citySelected.name}</h3>
      {/* <p>
        Sustainability Score : {citySelected.score}
      </p> */}
      {/* <p>
        Data source:{' '}
        <a href="https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population">
          Wikipedia
        </a>
      </p>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/7.0-release/examples/controls"
          target="_new"
        >
          View Code ↗
        </a>
      </div> */}
    </div>
  )
};

export default React.memo(ControlPanel);