import { useEffect, useContext, useState } from "react";
import LineChart from "../components/charts/LineChart"
import SurveyContext from "../context/SurveyContext";
import { getEvaluationsNumber, getAllSurveys } from "../db/db-services";
import EvaluationStats from "../components/EvaluationStats";

// const lineChartData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     datasets: [
//         {
//             label: 'Data',
//             data: [10, 15, 7, 12, 90, 11],
//             borderColor: '#DBA39A',
//             tension: 0.5
//         }
//     ]
// }


function Evaluations() {

    const [chartData,setChartData]= useState(
        {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Data',
                    data: [10, 15, 7, 12, 90, 11],
                    borderColor: '#DBA39A',
                    tension: 0.5
                }
            ]
        }
    )

    const [initialLoad, setInitialLoad] = useState(true);
    const { evaluations, numberOfEvaluations, surveys, dispatch } = useContext(SurveyContext)
    const [filteredData, setFilteredData] = useState([])

    const [filters, setFilters] = useState({
        survey: null,
        type: null,
        year: 2023
    })

    const { survey, type, year } = filters

    const handleChange = (e) => {
        setFilters((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value.length > 0 ? e.target.value : null
        }))
    }

    const handleFilter = (evaluations) => {
        const filteredEvaluations = evaluations.filter(item => {
            if (survey && item.survey !== survey) {
                return false  
            }
            if (type && item.surveyLabel !== type) {
                return false  
            }
            if (year && item.year != filters.year) {
                return false 
            }
            return true  
        });
        console.log(filteredEvaluations);
        return filteredEvaluations
    }


    const updateChartData = (data) => {
        const aggregatedData = new Array(12).fill(0);  
      
         
        data.forEach(item => {
          const month = item.month;
          if (month >= 1 && month <= 12) {
            aggregatedData[month - 1] += 1;  
          }
        });
      
         
        setChartData(prevState => ({
          ...prevState,
          datasets: prevState.datasets.map(dataset => ({
            ...dataset,
            data: aggregatedData
          }))
        }));
      };

    useEffect(() => {
        const fetchEvaluations = async () => {
            const evaluations = await getEvaluationsNumber()
            dispatch({ type: 'SET_EVALUATIONS', evaluations: evaluations })
            setFilteredData(evaluations)
            updateChartData(evaluations)

        };
        const fetchSurveys = async () => {
            const surveys = await getAllSurveys()
            dispatch({ type: 'SET_SURVEYS', surveys })
        };


        if (surveys.length === 0) fetchSurveys()
        if (!numberOfEvaluations) {
            fetchEvaluations()
        }else{
            setFilteredData(evaluations)
            updateChartData(evaluations)
        }

    }, [])

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
        } else {
            const filtered= handleFilter(evaluations)
            setFilteredData(filtered);
            updateChartData(filtered)
        }
    }, [filters]);

    return (
        <div className='evaluations'>
            <h2 className="heading-primary mg-b-medium">
                Evaluations
            </h2>
            <div className="card">
                <div className="evaluations__filters mg-b-big">
                    <div className="item">
                        <label htmlFor="survey">Survey</label>
                        <select id="survey" className="input-basic" onChange={handleChange}>
                            <option value="">All</option>
                            {surveys.map((el) => (
                                <option key={el.id} value={el.name}>{el.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="type">Type</label>
                        <select id="type" className="input-basic" onChange={handleChange}>
                            <option value='' >All</option>
                            <option value="general">General</option>
                            <option value="legal">Legal</option>
                            <option value="organisational">Organisational</option>
                            <option value="semantic">Semantic</option>
                            <option value="technical">Technical</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="year">Year</label>
                        <select id="year" className="input-basic" onChange={handleChange}>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                        </select>
                    </div>

                </div>
                <EvaluationStats numberOfEvaluations={filteredData.length} evaluations={filteredData} />
                <div className="chart" style={{ minHeight: '300px' }}>
                    <LineChart data={chartData} />
                </div>

            </div>
        </div>
    )
}

export default Evaluations