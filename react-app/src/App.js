import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


import Map, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import SearchBar from './components/SearchBar';
import Pins from './components/Pins';
import { useSelector, useDispatch } from 'react-redux';
import { getCities } from './actions/index';
import Sidebar from './components/Sidebar';
import ControlPanel from './components/ControlPanel';

const TOKEN = 'pk.eyJ1IjoiYW1hci15YWRhdiIsImEiOiJjbDIzeXZuYTQxZnl6M2RtanNmejJ3ZTlvIn0.IKUuDLlJE-Uq_FGIc3s6Ow'; // Set your mapbox token here

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCities(0, 0, {}));
  }, []);


  const { cities } = useSelector(state => state.cityData);

  const [popupInfo, setPopupInfo] = useState(null);

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
              <div style={{ fontSize: '1.1em' }}>
                {popupInfo.name}, {popupInfo.state}
                <br />
                {popupInfo.score}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ opacity: 0.3 }}>#{popupInfo.rank}</span>
              </div>
              <div>
                <a
                  target="_new"
                  href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.name}, ${popupInfo.state}`}
                >
                  Wikipedia
                </a>
              </div>
            </div>
            {/* <img width="100%" src="/Our_Cities_Logo.png" /> */}
          </Popup>
        )}
        <SearchBar setPopupInfo={setPopupInfo} cities={cities} placeholder="Enter a city" />
        <Sidebar />
      </Map>

      {/* <div style={{ position: 'absolute', bottom: '70px', left: '10px' }}>
        <img width="7%" src="/Our_Cities_Logo.png" />
      </div> */}

      {/* <ControlPanel /> */}
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
