import logo from './logo.svg';
import './App.css';
import {Button, Card, CardGroup, Dropdown, FormControl, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useRef, useState, Component, createRef} from "react";
import {Chart} from "chart.js";

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = createRef();
    }

    componentDidUpdate() {
        this.myChart.data.labels = this.props.data.map(d => d.label);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
        this.myChart.update();
    }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'bar',
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: 100
                            }
                        }
                    ]
                }
            },
            data: {
                labels: this.props.data.map(d => d.label),
                datasets: [{
                    label: this.props.title,
                    data: this.props.data.map(d => d.value),
                    backgroundColor: this.props.color
                }]
            }
        });
    }

    render() {
        return (
            <canvas ref={this.canvasRef} />
        );
    }
}

function App() {
    const [output, setOutput] = useState({
        "price": "",
        "break-even-point": "",
        "savings": "",
    });

    const [direction, setDirection] = useState("Kierunek Dachu")

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Wprowadź dane</Card.Title>
                                <div>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Twój Adres</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="Puławska 7"
                                            aria-label="Twój Adres"
                                            aria-describedby="basic-addon2"
                                            id="addressInput"
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Nachylenie Dachu</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="35"
                                            aria-label="Nachylenie Dachu (w stopniach)"
                                            aria-describedby="basic-addon2"
                                            id="addressInput"
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text>stopni</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Powierzchnia dachu</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="32"
                                            aria-label="Powierzchnia dachu"
                                            aria-describedby="basic-addon2"
                                            id="addressInput"
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text>m^2</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Dropdown>
                                            <Dropdown.Toggle id="dropdown-basic">
                                                {direction}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item as="button" onClick={() => setDirection("Północ")}>Północ</Dropdown.Item>
                                                <Dropdown.Item as="button" onClick={() => setDirection("Południe")}>Południe</Dropdown.Item>
                                                <Dropdown.Item as="button" onClick={() => setDirection("Zachód")}>Zachód</Dropdown.Item>
                                                <Dropdown.Item as="button" onClick={() => setDirection("Wschód")}>Wschód</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Zużycie prądu latem</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="8"
                                            aria-label="Zużycie prądu latem"
                                            aria-describedby="basic-addon2"
                                            id="addressInput"
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text>kWh/dzień</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Zużycie prądu zimą</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="14"
                                            aria-label="Zużycie prądu zimą"
                                            aria-describedby="basic-addon2"
                                            id="addressInput"
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text>kWh/dzień</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Koszt prądu</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="0.35"
                                            aria-label="0.35"
                                            aria-describedby="basic-addon2"
                                            id="addressInput"
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text>zł/kWh</InputGroup.Text>
                                        </InputGroup.Append>
                                        <InputGroup.Append>
                                            <Button variant="outline-primary" onClick={
                                                (click) => {
                                                    setOutput({
                                                        "price": "60000",
                                                        "break-even-point": "15",
                                                        "savings": "30000",
                                                    })
                                                }
                                            }>Oblicz</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            {/*<Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/3/37/Solar_Panels.jpg" />*/}
                            <Card.Body>
                                <Card.Title>Foto Map</Card.Title>
                                <div>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Orientacyjny koszt</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            value={output["price"] == null ? "" : output["price"]}
                                            placeholder=""
                                            aria-label="Orientacyjny koszt"
                                            aria-describedby="basic-addon2"
                                            id="addressInput"
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text>zł</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Break-Even Point</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            value={output["break-even-point"] == null ? "" : output["break-even-point"]}
                                            placeholder=""
                                            aria-label="Break-Even Point"
                                            aria-describedby="basic-addon2"
                                            id="addressInput"
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text>lat</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Oszczędność po 20 latach</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            value={output["savings"] == null ? "" : output["savings"]}
                                            placeholder=""
                                            aria-label="Oszczędność po 20 latach"
                                            aria-describedby="basic-addon2"
                                            id="addressInput"
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text>zł</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Średnia ilość dostępnej energii</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder=""
                                            aria-label="Ilość średnio dostępnej energii"
                                            aria-describedby="basic-addon2"
                                            id="addressInput"
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text>m^2</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <BarChart/>
                                </div>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </div>
            </header>
        </div>
    );
}

export default App;
