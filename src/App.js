import logo from './logo.svg';
import './App.css';
import {Button, FormControl, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useRef, useState} from "react";

function App() {
    const [location, setLocation] = useState(null);
    const addressInput = useRef(null);

    var addressContent;
    if (location != null) {
        addressContent = <div>
            Address:
            <ul>
                <li>Lat: {location[0]}</li>
                <li>Lon: {location[1]}</li>
            </ul>
        </div>

    } else {
        addressContent = <div>
            Proszę podaj swój adres...
        </div>
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Solar_Panels.jpg" className="App-logo" alt="logo"/>
                <div>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Twój Adres"
                            aria-label="Twój Adres"
                            aria-describedby="basic-addon2"
                            id="addressInput"
                            ref={addressInput}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary" onClick={
                                (click) => {
                                    if (addressInput.current.value.length > 0) {
                                        fetch(`https://eu1.locationiq.com/v1/search.php?key=pk.7b5ef7afb5ebab795d1d41722b9c4f08&q=${encodeURIComponent(addressInput.current.value)}&format=json`)
                                            .then(res => res.json())
                                            .then(
                                                (result) => {
                                                    setLocation([result[0].lat, result[0].lon])
                                                },
                                                (error) => {
                                                    console.log(error);
                                                }
                                            )
                                    }
                                }
                            }>Oblicz</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                {addressContent}
            </header>
        </div>
    );
}

export default App;
