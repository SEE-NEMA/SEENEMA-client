import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Header from '../../Header';
import '../styles/MapMain.css';
import '../../components/SearchBar.js';
import SearchBar from '../../components/SearchBar.js';
import PageHr from '../../components/PageHr';

// Separate Map component
const Map = () => {
  const mapElement = useRef(null);
  const { naver } = window;

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions = {
      center: location,
      zoom: 15,
      zoomControl: true,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);

  return <div className="mapElement" ref={mapElement} />;
};

const MapMain = () => {
  const [theaters, setTheaters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTheaters, setFilteredTheaters] = useState([]);

  useEffect(() => {
    fetch('http://43.200.58.174:8080/api/v1/theaters')
      .then(response => response.json())
      .then(data => setTheaters(data))
      .catch(error => console.error('Error fetching theaters:', error));
  }, []);

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    // Perform filtering here based on the searchQuery
    const filteredTheaters = theaters.filter(theater =>
      theater.theaterName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTheaters(filteredTheaters);
    console.log(filteredTheaters);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="mapContainer">
          {/* Render the Map component here */}
          <Map />
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
                  <li key={theater.theaterId} className="map-list">{theater.theaterName}</li>
                ))}
              </ul>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MapMain;