import { saveAs } from 'file-saver';

function EvaluationReport({ evaluations }) {

    const calcDate = (date = new Date(), today = true) => {
        if (!today) date = new Date(date.seconds * 1000);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (!today) {
            return `${day}/${month}/${year}`
        } else {
            return `${day}${month}${year}`
        }
    }

    const handleData = () => {
        const printData = evaluations.map((el) => {
            return {
                id: el.id,
                survey: el.survey,
                label: el.surveyLabel,
                percentage: el.percentage,
                created_at: calcDate(el.created_at, false)
            }
        })
        return printData
    }

    const handlePrintJson = () => {
        const json = JSON.stringify(handleData());
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `interoperability_report${calcDate()}`;
        a.click();
        URL.revokeObjectURL(url);
    }

    const handlePrintCsv = () => {
        const data = handleData();
        const headers = Object.keys(data[0]);
        const rows = data.map(obj => headers.map(header => obj[header]));

        let csv = headers.join(",") + "\n";
        csv += rows.map(row => row.join(",")).join("\n");

        var BOM = "\uFEFF";
        csv = BOM + csv;
        var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        saveAs(blob, `interoperability_report${calcDate()}.csv`);
    }

    return (
        <div className="double-btns">
            <button className="btn btn-secondary" onClick={handlePrintJson}>
                Export as Json
            </button>
            <button className="btn btn-primary" onClick={handlePrintCsv}>
                Export as CSV
            </button>
        </div>
    )
}

export default EvaluationReport