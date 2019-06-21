import React from 'react';
// import ReactDOM from 'react-dom';
import Decimal from 'decimal.js';
// import { CfgCounters } from './CfgCounters.js';

class CounterButton extends React.Component {
    render() {
        const c = this.props.counter;
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
    // constructor(props) {
    //     super(props);

    //     // this.getRevenuePerSec = this.getRevenuePerSec.bind(this);
    //     // this.getRevenuePct = this.getRevenuePct.bind(this);
    //     // this.sumCounters = this.sumCounters.bind(this);
    // }

    showNumber(num) {
        return this.props.numberformat.format(num);
    }

    sumCounters() {
        let sum = new Decimal(0.00);
        this.props.counters.forEach((o) => {
            sum = sum.plus(this.getRevenue(o));
        })
        return sum;
    }

    getRevenue(counter) {
        let multiplier = Math.floor(counter.owned / 25);
        return new Decimal((counter.revenue.times(Math.pow(2, multiplier)).times(counter.owned)));
    }

    getRevenuePerSec(counter) {
        return this.getRevenue(counter).times(1000 / this.props.timeInterval);
    }

    getRevenuePct(counter) {
        return this.getRevenue(counter).div(this.sumCounters()).times(100).toFixed(2);
    }

    getCost(counter) {
        // return counter.initialCost.times(Math.pow(counter.costGrowth, counter.owned));
        return counter.initialCost.times(
            Math.pow(counter.costGrowth, counter.owned)
            * (Math.pow(counter.costGrowth, this.props.purchaseAmt) - 1)).div(counter.costGrowth - 1);
    }

    render() {
        const c = this.props.counter;
        const rps = this.showNumber(this.getRevenuePerSec(c));
        const rp = this.showNumber(this.getRevenuePct(c));
        const cost = this.showNumber(this.getCost(c));
        const income = this.sumCounters();
        this.props.callbackIncome(income);
        const rows = [];
        rows.push(<div className="counter-stats-price" key={c.name + "stats-price"}>${cost}</div>);
        rows.push(<div className="counter-stats-rate" key={c.name + "stats-rate"}>{rps} /s</div>);
        rows.push(<div className="counter-stats-percent" key={c.name + "stats-percent"}>{rp}%</div>);
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
            // counters: this.loadCounters(),
            counters: this.props.counters,
        }

        // this.loadCounters = this.loadCounters.bind(this);
        this.getCounters = this.getCounters.bind(this);
        this.setIncome = this.setIncome.bind(this);

        // this.tickIntervalId = setInterval(this.updateAll, this.props.timeInterval);
        this.income = new Decimal(0);

    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    setIncome(income) {
        // console.log("Counter got callback:"+ income);
        this.income = income;
        this.props.callbackIncome(this.income);
    }


    getCost(counter) {
        // return counter.initialCost.times(Math.pow(counter.costGrowth, counter.owned));
        return counter.initialCost.times(
            Math.pow(counter.costGrowth, counter.owned)
            * (Math.pow(counter.costGrowth, this.state.purchaseAmt) - 1)).div(counter.costGrowth - 1);
    }

    getCounters() {
        // console.log(this.state.counters);
        // const counterList = Object.entries(this.state.counters).map((counter) =>
        const counterList = this.state.counters.map((counter) =>
            <div className="counter-wrapper" key={counter.name}>
                <CounterButton counter={counter} />
                <CounterStats
                    counter={counter}
                    counters={this.state.counters}
                    timeInterval={this.props.timeInterval}
                    numberformat={this.props.numberformat}
                    purchaseAmt={this.props.purchaseAmt}
                    callbackIncome={this.setIncome.bind(this)}
                />
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
