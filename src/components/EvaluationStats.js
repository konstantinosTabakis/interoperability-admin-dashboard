
function EvaluationStats({evaluations, numberOfEvaluations}) {

    const calcAvg = (data) => {
        if (data.length === 0) return 0
        const sum = data.reduce((acc, obj) => acc + obj.percentage, 0)
        const average = Math.floor(sum / data.length)
        return average
    }
    const calcMax = (data) => {
        if (data.length === 0) return null;
        const maxPercentage = Math.max(...data.map(obj => obj.percentage));
        return maxPercentage? maxPercentage: 0;
    }
    const calcMin = (data) => {
        if (data.length === 0) return null;
        const minPercentage = Math.min(...data.map(obj => obj.percentage));
        return minPercentage? minPercentage: 0;
    }


    return (
        <div className="evaluations__stats mg-b-big">
            <div className="card card-small centered">
                <p>Total</p>
                <p className="value">{numberOfEvaluations} </p>
            </div>
            <div className="card card-small centered">
                <p>Average</p>
                <p className="value">{calcAvg(evaluations)}% </p>
            </div>
            <div className="card card-small centered">
                <p>Maximum</p>
                <p className="value">{calcMax(evaluations)}% </p>
            </div>
            <div className="card card-small centered">
                <p>Minimum</p>
                <p className="value">{calcMin(evaluations)}% </p>
            </div>
        </div>
    )
}

export default EvaluationStats