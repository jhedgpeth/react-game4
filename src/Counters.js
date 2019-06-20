import React from 'react';
import ReactDOM from 'react-dom';
import Decimal from 'decimal.js';

import { CfgCounters } from './CfgCounters.js';

class CounterButton extends React.Component {
    constructor(props) {
        super(props);
        this.counter = this.props.counter;
    }

    render() {
        const c = this.counter[1];
        const rows = [];
        rows.push(<button className="counter-name canAfford" key={c.name}>{c.name}</button>);
        rows.push(<div className="counter-val" key={c.name + "owned"}>{c.owned}</div>);
        return (
            <React.Fragment>
                {rows}
            </React.Fragment>
        );
    }
}

class CounterStats extends React.Component {
    constructor(props) {
        super(props);
        this.counter = this.props.counter;
    }

    render() {
        const c = this.counter[1];
        const rows = [];
        rows.push(<div className="counter-stats-price" key={c.name + "stats-price"}></div>);
        rows.push(<div className="counter-stats-rate" key={c.name + "stats-rate"}> /s</div>);
        rows.push(<div className="counter-stats-percent" key={c.name + "stats-percent"}>%</div>);
        return (
            <div className="counter-stats-wrapper">
                {rows}
            </div>
        )
    }
}

class Counters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counters: this.loadCounters(),
        }

        // this.loadCounters = this.loadCounters.bind(this);
        this.getCounters = this.getCounters.bind(this);

        this.tickIntervalId = setInterval(this.updateCounters, 1000);

    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    updateCounters() {

    }

    loadCounters() {
        const newCounters = {};
        CfgCounters.forEach((entry) => {
            const busName = entry.name;
            newCounters[busName] = entry;
        })
        return newCounters;
    }

    getCounters() {
        // console.log(this.state.counters);
        const counterList = Object.entries(this.state.counters).map((counter) =>
            // console.log(counter[1].name);
            <div className="counter-wrapper" key={counter[0]}>
                <CounterButton counter={counter} />
                <CounterStats counter={counter} />
            </div>
        );
        return (
            <div>{counterList}</div>
        );
    }

    render() {
        return (
            this.getCounters()
        )
            ;
    }
}

export default Counters;
