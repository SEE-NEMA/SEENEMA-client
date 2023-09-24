import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Header from '../../Header';
import '../styles/MapMain.css';
import '../../components/SearchBar.js';
import SearchBar from '../../components/SearchBar.js';
import TabBar from '../../components/TabBar';

const Step = {
  SEARCH: 'SEARCH',
  THEATER_LIST: 'THEATER_LIST',
  THEATER_DETAILS: 'THEATER_DETAILS',
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

const TheaterDetails = ({ theater }) => {
  return (
    <div>
      <p>
        <h2>{theater.theaterName}</h2>
      </p>
      {/* Add more details here as needed */}
    </div>
  );
};

const MapMain = () => {
  const [theaters, setTheaters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTheaters, setFilteredTheaters] = useState([]);
  const [selectedTheaterLocation, setSelectedTheaterLocation] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [date, setDate] = useState();
  const [cast, setCast] = useState();
  const [musicals, setMusicals] = useState();
  const [concert, setConcerts] = useState();
  const [selectedTheaterConcerts, setSelectedTheaterConcerts] = useState([]);
  const [selectedTheaterMusicals, setSelectedTheaterMusicals] = useState([]);
  const [currentStep, setCurrentStep] = useState(Step.SEARCH);
  const [activeTab, setActiveTab] = useState('direction');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const handleTheaterClick = (theater) => {
    setSelectedTheater(theater);
    setSelectedTheaterLocation({ lat: theater.lat, lon: theater.lon });

    // Use axios to fetch the concerts for the selected theater
    axios
      .get(`http://43.200.58.174:8080/api/v1/concerts`)
      .then((concertResponse) => {
        const allConcerts = concertResponse.data;

        // Filter the concerts based on the selected theater's ID
        const selectedTheaterConcerts = allConcerts.filter(
          (concert) => {
            if (concert.theaterId && concert.theaterId.theaterId === theater.theaterId) {
              return true;
            }
            return false;
          }
        );

        setConcerts(selectedTheaterConcerts);
        setSelectedTheaterConcerts(selectedTheaterConcerts);
        console.log(selectedTheaterConcerts);

        // Fetch musicals for the selected theater
        axios
          .get(`http://43.200.58.174:8080/api/v1/musicals`)
          .then((musicalResponse) => {
            const allMusicals = musicalResponse.data;

            // Filter the musicals based on the selected theater's ID
            const selectedTheaterMusicals = allMusicals.filter(
              (musical) => {
                if (musical.theaterId && musical.theaterId.theaterId === theater.theaterId) {
                  return true;
                }
                return false;
              }
            );

            setMusicals(selectedTheaterMusicals);
            setSelectedTheaterMusicals(selectedTheaterMusicals);
            console.log(selectedTheaterMusicals);
          })
          .catch((musicalError) => {
            console.error('Error fetching musicals:', musicalError);
            setMusicals([]);
            setSelectedTheaterMusicals([]);
          });
      })
      .catch((concertError) => {
        console.error('Error fetching concerts:', concertError);
        setConcerts([]);
        setSelectedTheaterMusicals([]);
      });

    // Move to the next step (THEATER_DETAILS)
    setCurrentStep(Step.THEATER_DETAILS);
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

    // Move to the next step (THEATER_LIST)
    setCurrentStep(Step.THEATER_LIST);
  };

  // Render based on the current step
  let renderContent;
  switch (currentStep) {
    case Step.SEARCH:
      renderContent = (
        <SearchBar
          placeholder="공연장 이름을 입력하세요"
          className="mapSearchbar"
          onSearch={handleSearch}
        />
      );
      break;
    case Step.THEATER_LIST:
      renderContent = (
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
      );
      break;
    case Step.THEATER_DETAILS:
      renderContent = (
        <>
        <h2>{selectedTheater.theaterName}</h2>
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} className="TabBar"/>
          {currentStep === Step.THEATER_DETAILS && (
            <div style={{maxHeight:'500px', overflowY: 'auto'}}>
              {activeTab === 'direction' && (
                <div>
                  <pre style={{width:'380px', whiteSpace:'pre-wrap'}}>{selectedTheater.direction}</pre>
                  <br/>
                  {selectedTheater.imgUrl && (
                  <img
                      className="map-img"
                      style={{ width: '350px', height: '200px' }}
                      src={selectedTheater.imgUrl}
                      alt={selectedTheater.title}
                  />
                  )}

                </div>
              )}
              {activeTab === 'parking' && (
            <div >
    <pre style={{ width: '350px', whiteSpace: 'pre-wrap' }}>{selectedTheater.parking}</pre>
    
            </div>
)}

              <br/><br/>
              {activeTab === 'musicals' && (
                <div>
                  <ul>
                    {selectedTheaterMusicals.map((musical) => (
                    <li key={musical.no}>
                    <div className="map-content" style={{ display: 'flex', alignItems: 'center' }} >
                    <br/>
                    <span style={{ marginLeft: '10px' }}>
                      <h3>{musical.title}</h3>
                      {musical.date && (
                      <>
                      <br />
                      {musical.date}
                      </>
                      )}
                      {musical.cast && (
                      <>
                      <br />
                      {musical.cast}
                      </>
                      )}
                    </span>

                    </div>
                    <hr />
                    </li>
                    ))} 
                  </ul>
                  <ul>
                  {selectedTheaterConcerts.map((concert) => (
                    <li key={concert.no}>
                    <div className="map-content" style={{ display: 'flex', alignItems: 'center' }} >
                    <img className="map-img" src={concert.imgUrl} alt={concert.title} />
                    <br/>
                    <span style={{ marginLeft: '10px' }}>
                      <h3>{concert.title}</h3>
                      {concert.date && (
                      <>
                      <br />
                      {concert.date}
                      </>
                      )}
                      {concert.cast && (
                      <>
                      <br />
                      {concert.cast}
                      </>
                      )}
                    </span>

                    </div>
                    <hr />
                    </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </>
      );
      break;
    default:
      renderContent = null;
      break;
  }

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
          {renderContent}
        </div>
      </div>
    </>
  );
};

export default MapMain;