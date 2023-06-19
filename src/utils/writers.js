import { saveAs } from 'file-saver';

export const jsonWriter = (data, name) => {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
}

export const csvWriter = (data, name) => {
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => headers.map(header => obj[header]));

    let csv = headers.join(",") + "\n";
    csv += rows.map(row => row.join(",")).join("\n");

    var BOM = "\uFEFF";
    csv = BOM + csv;
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, name);
}