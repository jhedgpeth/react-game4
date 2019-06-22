import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { cfgCounters } from './CfgCounters.js';
import Counters from './Counters.js';
// import Decimal from 'decimal.js';
// import * as numberformat from 'swarm-numberformat';


// =====================================================

class Game extends React.Component {

    constructor(props) {
        super(props);

        const Decimal = require('decimal.js');
        const numberformat = require('swarm-numberformat');
        this.numberformat = new numberformat.Formatter({ backend: 'decimal.js', sigfigs: 4, format: 'engineering', Decimal: Decimal });
        // this.numberformat = new numberformat.Formatter({ backend: 'decimal.js', format: 'engineering', Decimal: Decimal });

        this.counterFunc = require('./CounterUtils');
        this.timeIntervalDefault = 100;

        this.state = {
            counters: cfgCounters(),
            score: new Decimal(0),
            prestige: { num: new Decimal(1000), val: 5 },
            prestigeNext: new Decimal(0),
            lifetimeEarnings: new Decimal(0),
            purchaseOpts: ["1", "10", "25", "100", "Max", "Max OCD"],
            purchaseAmt: "1",
            incomePerSec: new Decimal(0),
            incomePerTick: new Decimal(0),
            pause: false,
            pauseText: "Pause",
            timeInterval: this.timeIntervalDefault,
        }

        this.timeInterval = this.timeIntervalDefault;

        this.cleanState = { ...this.state };
        delete this.cleanState.pauseText;
        delete this.cleanState.purchaseAmt;


        this.updateGame = this.updateGame.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
        this.isTimerRunning = this.isTimerRunning.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.startTime = this.startTimer.bind(this);
        this.pause = this.pause.bind(this);
        this.restart = this.restart.bind(this);
        this.updateInterval = this.updateInterval.bind(this);
        this.freqUp = this.freqUp.bind(this);
        this.freqDown = this.freqDown.bind(this);
        this.calcPrestigeEarned = this.calcPrestigeEarned.bind(this);
        this.prestige = this.prestige.bind(this);


        this.tickIntervalId = setInterval(this.updateGame, this.timeInterval);
        this.prestigeIntervalId = setInterval(this.calcPrestigeEarned, 1000);
    }

    restart() {
        this.setState(this.cleanState);
        this.timeInterval = this.timeIntervalDefault;
        this.setState({
            counters: cfgCounters(),
        })
        this.stopTimer();
        this.startTimer();
    }

    isTimerRunning() {
        return this.tickIntervalId ? true : false;
    }

    stopTimer() {
        if (this.isTimerRunning()) {
            console.log("stopping timer");
            clearInterval(this.tickIntervalId)
            this.tickIntervalId = undefined;
        }
    }

    startTimer() {
        if (!this.isTimerRunning()) {
            console.log("starting timer");
            const newIntervalId = setInterval(this.updateGame, this.timeInterval);
            this.tickIntervalId = newIntervalId;
        }
    }

    pause() {
        if (this.isTimerRunning()) {
            console.log("pausing...");
            this.stopTimer();
            this.setState({
                pauseText: "Resume"
            })
        } else {
            console.log("trying to unpause...")
            this.startTimer();
            this.setState({
                pauseText: "Pause",
            })
        }
    }

    updateInterval(interval) {
        this.timeInterval = interval;
        this.setState({
            timeInterval: interval,
        })

        if (this.isTimerRunning()) {
            this.stopTimer();
            this.startTimer();
        }
    }

    freqUp() {
        const testVal = this.timeInterval + 50;
        const newFreq = testVal <= 5000 ? testVal : 5000;
        this.updateInterval(newFreq);
    }

    freqDown() {
        const testVal = this.timeInterval - 50;
        const newFreq = testVal >= 10 ? testVal : 10;
        this.updateInterval(newFreq);
    }

    updatePurchaseAmt(amt) {
        if (this.state.purchaseOpts.indexOf(amt) !== -1 && this.state.purchaseAmt !== amt) {
            this.setState({
                purchaseAmt: amt,
            })
        }
    }

    calcPrestigeEarned() {
        const Decimal = require('decimal.js');
        const newPrestigeNext = Decimal.sqrt(this.state.lifetimeEarnings.div(Math.pow(10, 9))).times(150).floor();
        if (newPrestigeNext !== this.state.prestigeNext) {
            this.setState({
                prestigeNext: newPrestigeNext,
            })
        }
        // console.log(Decimal.sqrt(this.state.lifetimeEarnings.div(Math.pow(10, 6))).times(150));
    }

    prestige() {
        this.calcPrestigeEarned();
        const newPrestige = this.state.prestige.num.plus(this.state.prestigeNext);
        this.restart();
        this.setState({
            prestige: { num: newPrestige, val: this.state.prestige.val },
        })
    }

    updateGame() {
        let changed = false;
        let counterList = this.state.counters.map((counter) => {
            const counterCost = this.counterFunc.getCost(counter, this.state.purchaseAmt);
            if (counter.isVisible === false && this.state.score.gte(counter.initialVisible)) {
                counter.isVisible = true;
                changed = true;
            }
            if (counter.disabled === false && this.state.score.lt(counterCost)) {
                counter.disabled = true;
                changed = true;
            }
            if (counter.disabled === true && this.state.score.gte(counterCost)) {
                counter.disabled = false;
                changed = true;
            }
            return counter;
        })
        if (changed) {
            this.setState({
                counters: counterList,
            })
        }

        const incomePerSec = this.counterFunc.sumCounters(this.state.counters, this.counterFunc.getRevenue, this.state.prestige);
        const incomePerTick = this.counterFunc.getRevenuePerTick(incomePerSec, this.timeInterval);
        const newLifetimeEarnings = this.state.lifetimeEarnings.plus(incomePerTick);
        this.setState({
            incomePerSec: incomePerSec,
            incomePerTick: incomePerTick,
            score: this.state.score.plus(incomePerTick),
            lifetimeEarnings: newLifetimeEarnings,
        })
        // this.calcPrestigeEarned(newLifetimeEarnings);
    }

    handlePurchase(counter) {
        const counterCost = this.counterFunc.getCost(counter, this.state.purchaseAmt);
        if (this.state.score.gte(counterCost)) {
            console.log("purchasing " + this.state.purchaseAmt + " x " + counter.name + " at $" + counterCost.toFixed(2));
            let updatedCounter = { ...counter };
            updatedCounter.owned = counter.owned + this.state.purchaseAmt;
            const newScore = this.state.score.minus(counterCost);
            let counterList = this.state.counters.map((c) => {
                return (c.name === counter.name) ? updatedCounter : c;
            })
            this.setState({
                counters: counterList,
                score: newScore,
            })
        } else {
            console.log("not enough money to purchase " + counter.name + " at $" + counterCost.toFixed(2) + " < " + counterCost.toFixed(2));
        }
    }

    render() {
        // const Decimal = require('decimal.js');
        const prestigeMultiplier = this.state.prestige.num.times(this.state.prestige.val);
        const prestigeClass = this.state.prestigeNext.gt(0) ? "prestige prestige-Avail" : "prestige prestige-notAvail";

        return (
            <div className="main-window">
                <div className="counters">
                    <Counters
                        counters={this.state.counters}
                        prestige={this.state.prestige}
                        score={this.state.score}
                        timeInterval={this.timeInterval}
                        numberformat={this.numberformat}
                        purchaseAmt={this.state.purchaseAmt}
                        handlePurchase={this.handlePurchase}
                    />
                </div>
                <div className="score-panel">
                    <h1>${this.counterFunc.showNumber(this.state.score, this.numberformat)}</h1>
                    <h3>{this.counterFunc.showNumber(this.state.incomePerSec, this.numberformat)} /s</h3>
                    <h3>{this.counterFunc.showNumber(this.state.incomePerTick, this.numberformat)} /tick</h3>
                    <h3>tick = {this.state.timeInterval} ms</h3>
                    <h3>{this.counterFunc.showNumber(this.state.lifetimeEarnings, this.numberformat)} lifetime earnings</h3>
                    <h3>
                        {this.counterFunc.showNumber(this.state.prestige.num, this.numberformat)}
                        &nbsp;prestige gives&nbsp;
                        {this.counterFunc.showNumber(prestigeMultiplier, this.numberformat)}%
                    </h3>
                    <h3>{this.counterFunc.showNumber(this.state.prestigeNext, this.numberformat)} next prestige</h3>
                </div>
                <div className="control-panel">
                    <button className="pause-button" onClick={this.pause}>{this.state.pauseText}</button>
                    <button className="pause-button" onClick={this.restart}>Restart</button>
                    <button className="freqUp" onClick={this.freqUp}>Slower</button>
                    <button className="freqDown" onClick={this.freqDown}>Faster</button>
                    <div className="timerRunning">timerRunning: {this.isTimerRunning().toString()}</div>
                    <div className="purchaseAmts">
                        {this.state.purchaseOpts.map((amt) => {
                            return (
                                <button key={amt} className="purchase-amount" onClick={() => { this.updatePurchaseAmt(amt) }}>{amt}</button>
                            )
                        })}
                    </div>
                    <button className={prestigeClass} disabled={this.state.prestigeNext.gt(0) ? false : true} onClick={this.prestige}>Prestige</button>
                    {/* <div>
                        { Object.entries( this.counterFunc.maxBuy(this.state.counters[0], this.state.score) ).map( (key) => {
                            return (
                                <div key={key[0]}>{key[0]}:{this.counterFunc.showNumber(key[1], this.numberformat)}</div>
                            )
                        })}
                    </div> */}
                </div>
            </div>
        )
    }


}


// =====================================================

ReactDOM.render(<Game />, document.getElementById("root"));

