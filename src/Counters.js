import React from 'react';
// import ReactDOM from 'react-dom';
// import Decimal from 'decimal.js';
// import { CfgCounters } from './CfgCounters.js';
import { CounterFunc } from './CounterFunc';

class CounterButton extends React.Component {
    render() {
        const c = this.props.counter;
        const costObj = CounterFunc.getCost(c, this.props.purchaseAmt, this.props.score);

        // console.log("tryBuy: " +tryBuy);
        // console.log(CounterFunc.getCost(c, tryBuy, this.props.score));
        const buttonClass = "counter-name "
            + (costObj.num > 0 && this.props.score.gte(costObj.cost) ? "canAfford" : "cannotAfford");
        const rows = [];
        rows.push(<button
            className={buttonClass}
            key={c.name + "button"}
            disabled={c.disabled}
            onClick={() => this.props.handlePurchase(c)}
        >
            {c.name} x {costObj.num}
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
    const c = props.counter;
    const counterRevenue = CounterFunc.getRevenue(props.counter, props.prestige);
    const counterSum = CounterFunc.sumCounters(props.counters, CounterFunc.getRevenue, props.prestige);
    const costObj = CounterFunc.getCost(c, props.purchaseAmt, props.score);

    const rps = CounterFunc.showNumber(counterRevenue, props.numberFormat);
    const rp = CounterFunc.showNumber(CounterFunc.getRevenuePct(counterRevenue, counterSum), props.numberFormat);
    const cost = CounterFunc.showNumber(costObj.cost, props.numberFormat);

    const priceClass = "counter-stats-price "
            + (props.score.gte(CounterFunc.getCost(c, props.purchaseAmt, props.score).cost) ? "canAfford" : "cannotAfford");

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
