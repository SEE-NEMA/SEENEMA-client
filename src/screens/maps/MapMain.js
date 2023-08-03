import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Header from '../../Header';
import '../styles/MapMain.css';
import '../../components/SearchBar.js';
import SearchBar from '../../components/SearchBar.js';
import PageHr from '../../components/PageHr';

// Separate Map component
const Map = ({ theaters, selectedTheaterLocation, setSelectedTheater }) => {
  const mapElement = useRef(null);
  const { naver } = window;
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const mapOptions = {
      center: new naver.maps.LatLng(37.5656, 126.9769),
      zoom: 15,
      zoomControl: true,
    };

    const newMap = new naver.maps.Map(mapElement.current, mapOptions);
    mapRef.current = newMap;

    theaters.forEach(theater => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(theater.lat, theater.lon),
        map: newMap,
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        setSelectedTheater(theater);
        console.log('Marker clicked:', theater.theaterName);
      });

      // Show the marker for the selected theater, if its location matches
      if (
        selectedTheaterLocation &&
        selectedTheaterLocation.lat === theater.lat &&
        selectedTheaterLocation.lon === theater.lon
      ) {
        setSelectedTheater(theater);
        newMap.setCenter(new naver.maps.LatLng(theater.lat, theater.lon));
      }
    });
  }, [theaters, naver, selectedTheaterLocation, setSelectedTheater]);

  useEffect(() => {
    if (mapRef && selectedTheaterLocation) {
      const { lat, lon } = selectedTheaterLocation;
      mapRef.current.setCenter(new naver.maps.LatLng(lat, lon));
    }
  }, [selectedTheaterLocation, naver]);

  return <div className="mapElement" ref={mapElement} />;
};

const TheaterDetails = ({theater}) => {
  return (
    <div>
      <p>{theater.theaterName}</p>
    </div>
  )
}

const MapMain = () => {
  const [theaters, setTheaters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTheaters, setFilteredTheaters] = useState([]);
  const [selectedTheaterLocation, setSelectedTheaterLocation] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);

  const handleTheaterClick = (theater) => {
    setSelectedTheater(theater);
    setSelectedTheaterLocation({lat:theater.lat, lon:theater.lon});
  }

  useEffect(() => {
    fetch('http://43.200.58.174:8080/api/v1/theaters')
      .then(response => response.json())
      .then(data => setTheaters(data))
      .catch(error => console.error('Error fetching theaters:', error));
  }, []);

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    const filteredTheaters = theaters.filter(theater =>
      theater.theaterName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTheaters(filteredTheaters);
    setSelectedTheaterLocation(null); // Reset selected theater location when a new search is performed
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="mapContainer">
          <Map theaters={filteredTheaters} selectedTheaterLocation={selectedTheaterLocation} setSelectedTheater={setSelectedTheater}/>
        </div>
        <div className="mapBox">
          <SearchBar
            placeholder="공연장 이름을 입력하세요"
            className="mapSearchbar"
            onSearch={handleSearch}
          />
          <div>
            <br/><br/>
            {filteredTheaters.length > 0 && (
              <div>
                <ul>
                  {filteredTheaters.map(theater => (
                    <li
                      key={theater.theaterId}
                      className="map-list"
                      onClick={() => handleTheaterClick(theater)}
                    >
                      {theater.theaterName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedTheater && <TheaterDetails theater={selectedTheater} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MapMain;
