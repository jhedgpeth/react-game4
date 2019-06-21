
export function showNumber(num, numformat) {
    return numformat.format(num);
}

export function getRevenue(counter) {
    const multiplier = Math.floor(counter.owned / 25);
    return new Decimal((counter.revenue.times(Math.pow(2, multiplier)).times(counter.owned)));
}

export function sumCounters(counters, revenueFunc) {
    const sum = new Decimal(0.00);
    counters.forEach((o) => {
        sum = sum.plus(revenueFunc(o));
    })
    return sum;
}

export function getRevenuePerSec(counter, revenueFunc) {
    return revenueFunc(counter).times(1000 / this.props.timeInterval);
}

export function getRevenuePct(counter, revenuFunc) {
    return revenueFunc(counter).div(this.sumCounters()).times(100).toFixed(2);
}

export function getCost(counter) {
    return counter.initialCost.times(
        Math.pow(counter.costGrowth, counter.owned)
        * (Math.pow(counter.costGrowth, this.props.purchaseAmt) - 1)).div(counter.costGrowth - 1);
}



