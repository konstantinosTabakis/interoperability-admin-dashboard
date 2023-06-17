import { useEffect, useContext, useState } from "react";
import LineChart from "../components/charts/LineChart"
import SurveyContext from "../context/SurveyContext";
import { getEvaluationsNumber } from "../db/db-services";

const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
        {
            label: 'Data',
            data: [10, 15, 7, 12, 90, 11],
            borderColor: 'rgb(75, 192, 192)',
            // backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.5
        }
    ]
};


function Evaluations() {

    const [evaluationsLocal, setEvaluationsLocal] = useState([])
    const { evaluations, numberOfEvaluations, dispatch } = useContext(SurveyContext)

    useEffect(() => {
        const fetchEvaluations = async () => {
            const evaluations = await getEvaluationsNumber()
            console.log('evaluations: ', evaluations);
            dispatch({ type: 'SET_EVALUATIONS', evaluations: evaluations })
            setEvaluationsLocal(convertDate(evaluations))
            
        };

        if (!numberOfEvaluations){
            fetchEvaluations()
            setEvaluationsLocal(convertDate(evaluations))
        }

    }, [])

    const convertDate = (data) =>{
        const filteredData = data.map((item) => {
            const date = new Date(item.created_at.seconds * 1000);  
            const month = date.getMonth() +1;
            return { month };
        });

        return filteredData

    }

    return (
        <div className='evaluations'>
            <h2 className="heading-primary mg-b-medium">
                Evaluations
            </h2>
            <div className="chart">
                <LineChart data={lineChartData} />
            </div>
        </div>
    )
}

export default Evaluations