
export function showNumber(num, numformat) {
    return numformat.format(num);
}

export function prestigeMultiplier(prestige) {
    return prestige.num.times(prestige.mult);
}

export function getRevenue(counter, prestige) {
    const Decimal = require('decimal.js');
    const multiplier = Math.floor(counter.owned / 25);
    const prestigeMultiplier = prestige.num.times(prestige.val).div(100).plus(1);
    return new Decimal(
        counter.revenue
            .times(Math.pow(2, multiplier))
            .times(counter.owned)
            .times(prestigeMultiplier)
    );
}

export function sumCounters(counters, revenueFunc, prestige) {
    const Decimal = require('decimal.js');
    let sum = new Decimal(0.00);
    counters.forEach((o) => {
        sum = sum.plus(revenueFunc(o, prestige));
    })
    return sum;
}

export function getRevenuePerTick(revenue, timeInterval) {
    return revenue.times(timeInterval / 1000);
}

export function getRevenuePct(revenue, counterSum) {
    return revenue.div(counterSum).times(100).toFixed(2);
}


export function getCost(counter, purchaseAmt, score) {
    // const counterFunc = require('./CounterFunc.js');
    // const cF = new counterFunc();
    // const maxbuys = counterFunc.maxBuy(counter, score);
    // switch (purchaseAmt) {
    //     case "Max":
    //         break;
    //     case "Max OCD":

    //         break;
    //     default:
    //         const tryAmt = purchaseAmt;
    // }

    return counter.initialCost.times(
        Math.pow(counter.costGrowth, counter.owned)
        * (Math.pow(counter.costGrowth, purchaseAmt) - 1)).div(counter.costGrowth - 1);
}

export function maxBuy(counter, score) {
    const Decimal = require('decimal.js');
    const max = new Decimal(
        score
            .times(counter.costGrowth - 1)
            .div(
                counter.initialCost.times(
                    Math.pow(counter.costGrowth, counter.owned))
            )
    ).plus(1).log(counter.costGrowth).floor();
    const max100 = max.div(100).floor().times(100);
    const max50 = max.div(50).floor().times(50);
    const max25 = max.div(25).floor().times(25);
    const max10 = max.div(10).floor().times(10);
    return ({ max10: max10, max25: max25, max50: max50, max100: max100 });
}



