import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { render } from 'react-dom';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import ControlPanel from './components/ControlPanel';
import Pin from './components/Pin.tsx';
import Pin2 from './components/Pin2';
import Pins from './components/Pins';
import CITIES from './static_data/cities.json'
import { useSelector, useDispatch } from 'react-redux';
import { getCities } from './actions/index';
// import SearchBar from './components/SearchBar';

const TOKEN = 'pk.eyJ1IjoiYW1hci15YWRhdiIsImEiOiJjbDIzeXZuYTQxZnl6M2RtanNmejJ3ZTlvIn0.IKUuDLlJE-Uq_FGIc3s6Ow'; // Set your mapbox token here

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCities(0, 0, {}));
  }, []);

  const { cities } = useSelector(state => state.cities);

  const [popupInfo, setPopupInfo] = useState(null);

  // const pins = useMemo(
  //   () =>
  //   cities.map((city, index) => (
  //       <Marker
  //         key={`marker-${index}`}
  //         longitude={city.longitude}
  //         latitude={city.latitude}
  //         anchor="bottom"
  //       >
  //         <Pin city={city} onClick={() => setPopupInfo(city)} />
  //       </Marker>
  //     )),
  //   []
  // );

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 4.2,
          bearing: 0,
          pitch: 0
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {/* {pins} */}
        <Pins cities={cities} setPopupInfo={setPopupInfo} />

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.name}, {popupInfo.state}
              {/* <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a> */}
            </div>
            {/* <img width="100%" src={popupInfo.image} /> */}
          </Popup>
        )}
      </Map>

      <ControlPanel />
      {/* <SearchBar /> */}
    </>
  );
}

export default App;


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         Neighborhood Sustainability Project
//         <SearchBar
//           top500Cities={cities}
//           placeholder="Enter a city"
//         />
//       </header>
//     </div>
//   );
// }
