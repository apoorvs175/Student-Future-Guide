
// Function to fetch and process CSV data
function fetchAndProcessCSV(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').filter(row => row.trim() !== ''); // Filter out empty rows
            const headers = rows[0].split(',');
            const table = document.getElementById('instituteTable');
            const pagination = document.getElementById('pagination');
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');

            // Create table header
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header.trim();
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);

            // Initialize variables for pagination
            let currentPage = 0;
            const entriesPerPage = 100;
            const totalEntries = rows.length - 1; // Subtract 1 for the header row
            const totalPages = Math.ceil(totalEntries / entriesPerPage);

            // Function to display current page
            function displayPage() {
                // Clear the table body
                table.innerHTML = '';
                table.appendChild(headerRow);

                // Calculate the start and end indices for the current page
                const startIndex = currentPage * entriesPerPage + 1; // Add 1 for the header row
                const endIndex = Math.min(startIndex + entriesPerPage, totalEntries + 1);

                // Create table rows for the current page
                for (let i = startIndex; i < endIndex; i++) {
                    const cells = rows[i].split(',');
                    if (cells.length === headers.length) {
                        const row = document.createElement('tr');
                        cells.forEach(cell => {
                            const td = document.createElement('td');
                            td.textContent = cell.trim();
                            row.appendChild(td);
                        });
                        table.appendChild(row);
                    }
                }

                // Update the pagination buttons
                prevButton.disabled = currentPage === 0;
                nextButton.disabled = currentPage === totalPages - 1;
            }

            // Display the first page
            displayPage();

            // Add event listeners for the pagination buttons
            prevButton.addEventListener('click', () => {
                currentPage--;
                displayPage();
            });

            nextButton.addEventListener('click', () => {
                currentPage++;
                displayPage();
            });
        })
        .catch(error => {
            console.error('Error:', error);
            const table = document.getElementById('instituteTable');
            table.innerHTML = '<tr><td colspan="6">Error loading data: ' + error.message + '. Please check the console for details.</td></tr>';
        });
}

// Call the function when the page loads
window.onload = function() {
    // Replace 'path/to/your/file.csv' with the actual path to your CSV file
    fetchAndProcessCSV('./Data Files/colleges.csv');
};




