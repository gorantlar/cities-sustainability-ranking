import * as React from 'react';

const ControlPanel = () => {
    return (
        <div className="control-panel">
            <h3>Phoenix </h3>
            <p>
                Sustainability Score : 80
            </p>
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