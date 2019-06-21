import React from 'react';
// import ReactDOM from 'react-dom';
// import Decimal from 'decimal.js';
// import { CfgCounters } from './CfgCounters.js';

class CounterButton extends React.Component {
    render() {
        const counterFunc = require('./CounterUtils');
        const c = this.props.counter;
        const buttonClass = "counter-name "
            + (this.props.score.gte(counterFunc.getCost(c, this.props.purchaseAmt)) ? "canAfford" : "cannotAfford");
        const rows = [];
        rows.push(<button
            className={buttonClass}
            key={c.name + "button"}
            disabled={c.disabled}
            onClick={() => this.props.handlePurchase(c)}
        >
            {c.name} x {this.props.purchaseAmt}
        </button>
        );
        rows.push(<div className="newCounterAnimOverlay" key={c.name + "anim"} />);
        rows.push(<div className="counter-val" key={c.name + "owned"}>{c.owned}</div>);
        return (
            <React.Fragment>
                {rows}
            </React.Fragment>
        );
    }
}

function CounterStats(props) {
    const counterFunc = require('./CounterUtils');
    const c = props.counter;
    const counterRevenue = counterFunc.getRevenue(props.counter, props.prestige);
    const counterSum = counterFunc.sumCounters(props.counters, counterFunc.getRevenue, props.prestige);

    const rps = counterFunc.showNumber(counterRevenue, props.numberFormat);
    const rp = counterFunc.showNumber(counterFunc.getRevenuePct(counterRevenue, counterSum), props.numberFormat);
    const cost = counterFunc.showNumber(counterFunc.getCost(c, props.purchaseAmt), props.numberFormat);

    const priceClass = "counter-stats-price "
            + (props.score.gte(counterFunc.getCost(c, props.purchaseAmt)) ? "canAfford" : "cannotAfford");

    const rows = [];
    rows.push(<div className={priceClass} key={c.name + "stats-price"}>${cost}</div>);
    rows.push(<div className="counter-stats-rate" key={c.name + "stats-rate"}>{rps} /s</div>);
    rows.push(<div className="counter-stats-percent" key={c.name + "stats-percent"}>{rp}%</div>);

    return (
        <div className="counter-stats-wrapper">
            {rows}
        </div>
    )


}


export class Counters extends React.Component {

    renderCounters() {
        // console.log(this.state.counters);
        // const counterList = Object.entries(this.state.counters).map((counter) =>
        const counterList = this.props.counters.map((counter) => {
            if (counter.isVisible) {
                return (
                    <div className="counter-wrapper" key={counter.name}>
                        <CounterButton
                            counter={counter}
                            score={this.props.score}
                            purchaseAmt={this.props.purchaseAmt}
                            handlePurchase={this.props.handlePurchase}
                        />
                        <CounterStats
                            counter={counter}
                            score={this.props.score}
                            counters={this.props.counters}
                            prestige={this.props.prestige}
                            timeInterval={this.props.timeInterval}
                            numberFormat={this.props.numberformat}
                            purchaseAmt={this.props.purchaseAmt}
                        />
                    </div>
                )
            } else {
                return (
                    <div className="counter-wrapper" key={counter.name}></div>
                )
            }
        }
        );
        return (
            <div> {counterList}</div >
        );
    }

    render() {

        return (
            this.renderCounters()
        );
    }
}

export default Counters;
