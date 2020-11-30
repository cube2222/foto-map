import logo from './logo.svg';
import './App.css';
import {Button, Card, CardGroup, Dropdown, FormControl, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useRef, useState, Component, createRef} from "react";
import {Chart} from "chart.js";

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = createRef();
    }

    componentDidUpdate() {
        this.myChart.data.datasets[0].data = this.props.data;
        this.myChart.update();
    }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'line',
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Miesiąc'
                        },
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'kWh/dzień'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                }
            },
            data: {
                labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
                datasets: [{
                    cubicInterpolationMode: 'default',
                    lineTension: 0.3,
                    label: this.props.title,
                    data: this.props.data,
                    borderColor: "#ffd300",
                    backgroundColor: "transparent",
                }],
            },
        });
    }

    render() {
        return (
            <canvas ref={this.canvasRef}/>
        );
    }
}

function tiltCoeff(x) {
    if (x > 90 || x < 0) {
        return 0
    }
    return (-1 * (Math.pow(x-45, 2)/2025)) + 1
}

function areaCoeff(x) {
    if (x < 0) {
        return 0
    }
    return x/32
}

function priceCoeff(x) {
    return x/0.35
}

function directionCoeff(x) {
    if (x === "Północ") {
        return 0.3
    } else if (x === "Południe") {
        return 1.0
    } else if (x === "Zachód") {
        return 0.8
    } else {
        return 0.7
    }
}

function App() {
    const [output, setOutput] = useState({
        "price": "",
        "break-even-point": "",
        "savings": "",
        "available": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });

    const [direction, setDirection] = useState("Kierunek Dachu")

    var tilt = useRef(35);
    var area = useRef(32);
    var usageSummer = useRef(8);
    var usageWinter = useRef(14);
    var price = useRef(0.35);

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
                                            id="tilt-input"
                                            ref={tilt}
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
                                            id="area-input"
                                            ref={area}
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
                                                <Dropdown.Item as="button"
                                                               onClick={() => setDirection("Północ")}>Północ</Dropdown.Item>
                                                <Dropdown.Item as="button"
                                                               onClick={() => setDirection("Południe")}>Południe</Dropdown.Item>
                                                <Dropdown.Item as="button"
                                                               onClick={() => setDirection("Zachód")}>Zachód</Dropdown.Item>
                                                <Dropdown.Item as="button"
                                                               onClick={() => setDirection("Wschód")}>Wschód</Dropdown.Item>
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
                                            id="usageSummer-input"
                                            ref={usageSummer}
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
                                            id="usageWinter-input"
                                            ref={usageWinter}
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
                                            id="cost-input"
                                            ref={price}
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text>zł/kWh</InputGroup.Text>
                                        </InputGroup.Append>
                                        <InputGroup.Append>
                                            <Button variant="outline-primary" onClick={
                                                (click) => {
                                                    setOutput({
                                                        "price": Math.round(60000*areaCoeff(area.current.value)),
                                                        "break-even-point": Math.round(15/priceCoeff(price.current.value)),
                                                        "savings": Math.round(30000*tiltCoeff(tilt.current.value)/areaCoeff(area.current.value)*directionCoeff(direction)*priceCoeff(price.current.value)),
                                                        "available": [15, 15, 18, 20, 22, 24, 27, 27, 23, 19, 18, 17].map((x) => Math.round(x*tiltCoeff(tilt.current.value)*areaCoeff(area.current.value)*directionCoeff(direction))),
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
                                            value={output["price"]}
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
                                            value={output["break-even-point"]}
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
                                            value={output["savings"]}
                                            placeholder=""
                                            aria-label="Oszczędność po 20 latach"
                                            aria-describedby="basic-addon2"
                                            id="addressInput"
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text>zł</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <div>
                                        <LineChart
                                            data={output["available"]}
                                            title="Średnia ilość dostępnej energii"
                                            color="red"/>
                                    </div>
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
