import React, { Component } from 'react';
import {Grid, Row, Col, PageHeader, Panel} from 'react-bootstrap';
import axios from 'axios';
import PickerPressure from './components/PickerPressure';
import PickerTemperature from './components/PickerTemperature';
import ChartChanceRain from './components/ChartChanceRain';
import AmountOfRainfall from './components/AmountOfRainfall';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);


        this.state = {
            pressure: 970,
            temperature: 10,
            amount: [],
            chanceOfRain: []};
        this.onAfterChangePressure = this.onAfterChangePressure.bind(this);


        this.onAfterChangeTemperature = this.onAfterChangeTemperature.bind(this);
    }

    getChanceOfRain = (pressure, temperature, amount) => {
        const amountRain = amount.amount;
        const amountDay = amount.day.toString();
        const score = Math.log(amountRain + 1) * Math.log(pressure - 929) * Math.log(temperature - -9);
        const mean = Math.min(Math.max(score, 0), 100);
        const upperBound = Math.min(1.5 * mean, 100);
        const lowerBound = Math.max(0.5 * mean, 0);
        return {name: amountDay, lowerBound: lowerBound, mean: mean, upperBound: upperBound};
    };

    onAfterChangePressure =(value) => {
        this.setState({pressure: value});
        let data = this.state.amount.map((item) => {
            return this.getChanceOfRain(value, this.state.temperature, item);
        });
        this.setState({chanceOfRain: data});
    };

    onAfterChangeTemperature(value) {
        this.setState({temperature: value});
        let data = this.state.amount.map((item) => {
            return this.getChanceOfRain(this.state.pressure, value, item);
        });
        this.setState({chanceOfRain: data});
    };
    componentDidMount = async () => {
        const res = await axios.get('data/rainfall.json');
        this.setState({amount:res.data.days});
        let data = res.data.days.map((item) => {
            return this.getChanceOfRain(this.state.pressure, this.state.temperature, item);
        });
        this.setState({chanceOfRain: data});
    };
  render = () => {
    return (
        <Grid>
            <Row>
                <Col xs={12}>
                    <PageHeader>
                        Dashboard
                    </PageHeader>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Pressure [hPa]</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <PickerPressure onAfterChange={this.onAfterChangePressure}/>
                        </Panel.Body>
                    </Panel>
                </Col>
                <Col xs={6}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Temperature [°C]</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <PickerTemperature onAfterChange={this.onAfterChangeTemperature}/>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Chance of rain</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="chartContainer">
                            <ChartChanceRain data={this.state.chanceOfRain}/>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Amount of Rainfall</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="chartContainer">
                            <AmountOfRainfall data={this.state.amount}/>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        </Grid>
    );
  }
}
export default App;
