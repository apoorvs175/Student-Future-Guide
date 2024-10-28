// ./Scholorship.csv


const csvFilePath = './Data Files/Scholorship.csv'; // Specify the path to your CSV file
const entriesPerPage = 100; // Number of entries to display per page
let currentPage = 0;
let students = [];

fetch(csvFilePath)
    .then(response => response.text())
    .then(data => parseCSV(data))
    .catch(error => console.error('Error loading CSV file:', error));

function parseCSV(data) {
    const lines = data.split('\n');
    for (let i = 1; i < lines.length; i++) { // Skip header
        const line = lines[i].trim();
        if (line) {
            const [
                name,
                educationQualification,
                gender,
                community,
                religion,
                exServiceMen,
                disability,
                sports,
                annualPercentage,
                income,
                india,
                outcome
            ] = line.split(',');

            students.push({
                name: name.trim(),
                educationQualification: educationQualification.trim(),
                gender: gender.trim(),
                community: community.trim(),
                religion: religion.trim(),
                exServiceMen: exServiceMen.trim(),
                disability: disability.trim(),
                sports: sports.trim(),
                annualPercentage: annualPercentage.trim(),
                income: income.trim(),
                india: india.trim(),
                outcome: outcome.trim()
            });
        }
    }
    displayStudents();
}

function displayStudents() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear previous entries
    const start = currentPage * entriesPerPage;
    const end = start + entriesPerPage;
    const paginatedStudents = students.slice(start, end);

    paginatedStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.educationQualification}</td>
            <td>${student.gender}</td>
            <td>${student.community}</td>
            <td>${student.religion}</td>
            <td>${student.exServiceMen}</td>
            <td>${student.disability}</td>
            <td>${student.sports}</td>
            <td>${student.annualPercentage}</td>
            <td>${student.income}</td>
            <td>${student.india}</td>
            <td>${student.outcome}</td>
        `;
        tableBody.appendChild(row);
    });

    // Update button visibility
    document.getElementById('prevBtn').style.display = currentPage === 0 ? 'none' : ' inline-block';
    document.getElementById('nextBtn').style.display = currentPage >= Math.ceil(students.length / entriesPerPage) - 1 ? 'none' : 'inline-block';
}

function nextPage() {
    currentPage++;
    displayStudents();
}

function prevPage() {
    currentPage--;
    displayStudents();
}