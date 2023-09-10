import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Header from '../../Header';
import '../styles/MapMain.css';
import '../../components/SearchBar.js';
import SearchBar from '../../components/SearchBar.js';
import PageHr from '../../components/PageHr';

const ConcertList = ({ concerts, selectedTheaterId }) => {
  const [filteredConcerts, setFilteredConcerts] = useState([]);

  useEffect(() => {
    // Filter the concerts based on the selectedTheaterId
    const filteredConcerts = concerts.filter(
      (concert) => concert.theaterId === selectedTheaterId
    );
    setFilteredConcerts(filteredConcerts);
  }, [concerts, selectedTheaterId]);

  if (filteredConcerts.length === 0) {
    return <p>No concerts available for this theater.</p>;
  }

  return (
    <div>
      <h2>Concerts for this theater:</h2>
      <ul>
        {filteredConcerts.map((concert) => (
          <li key={concert.no}>
            {concert.title} - Date: {concert.date} - Place: {concert.place}
          </li>
        ))}
      </ul>
    </div>
  );
};

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

    theaters.forEach((theater) => {
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
    if (mapRef.current && selectedTheaterLocation) {
      const { lat, lon } = selectedTheaterLocation;
      mapRef.current.setCenter(new naver.maps.LatLng(lat, lon));
    }
  }, [selectedTheaterLocation, naver]);

  return <div className="mapElement" ref={mapElement} />;
};

const TheaterDetails = ({ theater, concerts }) => {
  return (
    <div>
      <p>{theater.theaterName}</p>
      <h2>공연 정보</h2>
      <ul>
        {concerts.map((concert) => (
          <li key={concert.no}>{concert.title}</li>
        ))}
      </ul>
    </div>
  );
};

const MapMain = () => {
  const [theaters, setTheaters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTheaters, setFilteredTheaters] = useState([]);
  const [selectedTheaterLocation, setSelectedTheaterLocation] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [concerts, setConcerts] = useState([]);

  const handleTheaterClick = (theater) => {
    setSelectedTheater(theater);
    setSelectedTheaterLocation({ lat: theater.lat, lon: theater.lon });
    console.log('선택한 극장', selectedTheater.theaterId);
  
    // 사용자가 클릭한 극장의 theaterId를 사용하여 해당 극장의 공연 정보를 가져오는 API 요청
    axios
      .get(`http://43.200.58.174:8080/api/v1/concerts` && `http://43.200.58.174:8080/api/v1/musicals`)
      .then((response) => {
        const allConcerts = response.data;

      // Filter the concerts based on the selected theater's ID
      const selectedTheaterConcerts = allConcerts.filter(
        (concert) => {
          if(concert.theaterId && concert.theaterId.theaterId === theater.theaterId) {
            return true;
          }
          return false;
        }
      );
      setConcerts(selectedTheaterConcerts);
      console.log(selectedTheaterConcerts);
      })
      .catch((error) => {
        console.error('Error fetching concerts:', error);
        setConcerts([]);
      });
  };
  

  useEffect(() => {
    fetch('http://43.200.58.174:8080/api/v1/theaters')
      .then((response) => response.json())
      .then((data) => setTheaters(data))
      .catch((error) => console.error('Error fetching theaters:', error));
  }, []);

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    const filteredTheaters = theaters.filter((theater) =>
      theater.theaterName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTheaters(filteredTheaters);
    setSelectedTheater(null);
    if (filteredTheaters.length > 0) {
      setSelectedTheater(filteredTheaters[0]);
      setSelectedTheaterLocation({
        lat: filteredTheaters[0].lat,
        lon: filteredTheaters[0].lon,
      });
    } else {
      setSelectedTheaterLocation(null);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="mapContainer">
          <Map
            theaters={filteredTheaters}
            selectedTheaterLocation={selectedTheaterLocation}
            setSelectedTheater={setSelectedTheater}
          />
        </div>
        <div className="mapBox">
          <SearchBar
            placeholder="공연장 이름을 입력하세요"
            className="mapSearchbar"
            onSearch={handleSearch}
          />
          <div>
            <br />
            <br />
            <div>
              {filteredTheaters.length > 0 && (
                <ul>
                  {filteredTheaters.map((theater) => (
                    <li
                      key={theater.theaterId}
                      className="map-list"
                      onClick={() => handleTheaterClick(theater)}
                    >
                      {theater.theaterName} &gt;<br />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* TheaterDetails 컴포넌트를 여기서 렌더링 */}
      {selectedTheater && (
        <ConcertList concerts={concerts} selectedTheaterId={selectedTheater.theaterId} />
      )}

      <div className="tag-button-wrap">
        <button>현재 예매 중</button>
        <button>현재 공연 중</button>
        <button>예매 예정</button>
        <button>부대 시설</button>
      </div>
    </>
  );
};

export default MapMain;