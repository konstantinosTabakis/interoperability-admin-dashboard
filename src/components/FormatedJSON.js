import data from '../data/example-data.json'


function FormatedJSON() {
    return (
        <div className="wrapper__json">
            <pre className="wrapper__json-inner">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    )
}

export default FormatedJSON