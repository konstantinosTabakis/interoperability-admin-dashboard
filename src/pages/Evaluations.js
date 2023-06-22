import { useEffect, useContext, useState } from "react";
import LineChart from "../components/charts/LineChart"
import SurveyContext from "../context/SurveyContext";
import { getEvaluationsNumber, getAllSurveys } from "../db/db-services";
import EvaluationStats from "../components/EvaluationStats";
import EvaluationReport from "../components/EvaluationReport";

function Evaluations() {

    const [chartData, setChartData] = useState(
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
        year: 2023,
        sector: null,
        target: null,
        admin_level: null,
        name: null,
        email: null,
        role: null
    })

    const { survey, type, year, sector, target, admin_level, name, email , role} = filters

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
            if (sector && item.identification?.sector !== sector) {
                return false;
            }
            if (target && item.identification?.target !== target) {
                return false;
            }
            if (admin_level && item.identification?.admin_level !== admin_level) {
                return false;
            }
            if (name && item.identification?.name !== name) {
                return false;
            }
            if (email && item.identification?.email !== email) {
                return false;
            }
            if (role && item.identification?.role !== role) {
                return false;
            }

            return true
        });
        return filteredEvaluations
    }
    const getValues = (property) => {
        const uniqueValues = new Set();

        evaluations.forEach((item) => {
            if (item.identification && item.identification[property]) {
                uniqueValues.add(item.identification[property]);
            }
        });

        return Array.from(uniqueValues);
    };


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
        } else {
            setFilteredData(evaluations)
            updateChartData(evaluations)
        }

    }, [])

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
        } else {
            const filtered = handleFilter(evaluations)
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
                <div className="evaluations__filters-wrapper mg-b-big" >
                    <h4 className="heading-secondary mg-b-medium centered">Survey Filters</h4>
                    <div className="evaluations__filters mg-b-small">
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
                    <h4 className="heading-secondary mg-b-medium centered">Service Filters</h4>
                    
                    <div className="evaluations__filters last mg-b-small">
                        <div className="item">
                            <label htmlFor="name">Name</label>
                            <select id="name" className="input-basic" onChange={handleChange}>
                                <option value="">All</option>
                                {getValues('name').map((el) => (
                                    <option key={el} value={el}>{el}</option>
                                ))}
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="email">Email</label>
                            <select id="email" className="input-basic" onChange={handleChange}>
                                <option value="">All</option>
                                {getValues('email').map((el) => (
                                    <option key={el} value={el}>{el}</option>
                                ))}
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="role">User Role</label>
                            <select id="role" className="input-basic" onChange={handleChange}>
                                <option value="">All</option>
                                {getValues('role').map((el) => (
                                    <option key={el} value={el}>{el}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="evaluations__filters mg-b-small">
                        <div className="item">
                            <label htmlFor="sector">Sector</label>
                            <select id="sector" className="input-basic" onChange={handleChange}>
                                <option value="">All</option>
                                <option value="Education">Education</option>
                                <option value="Public Health">Public Health</option>
                                <option value="Public Safety">Public Safety</option>
                                <option value="Justice">Justice</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Infrastructure">Infrastructure</option>
                                <option value="Social Services">Social Services</option>
                                <option value="Economy/Financial">Economy/Financial</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="target">Target</label>
                            <select id="target" className="input-basic" onChange={handleChange}>
                                <option value="">All</option>
                                <option value="A2A">Public Administrations (A2A)</option>
                                <option value="A2C">Citizens (A2C)</option>
                                <option value="A2B">Businesses (A2B)</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="admin_level">Admin Level</label>
                            <select id="admin_level" className="input-basic" onChange={handleChange}>
                                <option value="">All</option>
                                <option value="local">Local (e.g. city, municipality)</option>
                                <option value="regional">Regional</option>
                                <option value="national">National</option>
                                <option value="european">European</option>
                                <option value="international">International</option>

                            </select>
                        </div>
                    </div>
                    
                </div>

                <EvaluationStats numberOfEvaluations={filteredData.length} evaluations={filteredData} />
                <div className="chart mg-b-big" style={{ minHeight: '300px' }}>
                    <LineChart data={chartData} />
                </div>
                <EvaluationReport evaluations={filteredData} />


            </div>
        </div >
    )
}

export default Evaluations