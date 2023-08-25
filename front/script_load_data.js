let currentPage = 1;
const itemsPerPage = 15;
let totalPages;
let rowsData = [];
let currentDisplayedRows = [];  // To keep track of currently displayed rows after filtering

// Load data from JSON file and populate the table
fetch('sample_data.json')
    .then(response => response.json())
    .then(data => {
        rowsData = data.rows;
        currentDisplayedRows = rowsData;
        totalPages = Math.ceil(currentDisplayedRows.length / itemsPerPage);
        populateTable(currentDisplayedRows);
        displayPage(1);
        updatePageDisplay();
        loadClusterOptions();
        addSortingFunctionality();
    })
    .catch(error => console.error('Error loading data:', error));

function populateTable(rows) {
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = '';  // Clear existing rows

    rows.forEach(row => {
        const tr = document.createElement('tr');
        tr.onclick = () => updateSelectedItem(tr);
        
        const tdRadio = document.createElement('td');
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'selectedRow';
        tdRadio.appendChild(radioInput);
        tr.appendChild(tdRadio);
        
        for (const key in row) {
            const td = document.createElement('td');
            td.innerText = row[key];
            tr.appendChild(td);
        }
        
        tableBody.appendChild(tr);
    });
}

function loadClusterOptions() {
    const distinctClusters = [...new Set(rowsData.map(row => row["所属集群"]))];
    const selectElement = document.querySelector("#clusterFilter");
    
    distinctClusters.forEach(cluster => {
        const option = document.createElement('option');
        option.value = cluster;
        option.innerText = cluster;
        selectElement.appendChild(option);
    });
}

function filterByCluster() {
    const cluster = document.querySelector("#clusterFilter").value;
    currentDisplayedRows = rowsData.filter(row => row["所属集群"] === cluster || cluster === "所有集群");
    totalPages = Math.ceil(currentDisplayedRows.length / itemsPerPage);
    populateTable(currentDisplayedRows);
    displayPage(1);  // Reset to first page after filtering
    updatePageDisplay();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
    }
}

function displayPage(pageNumber) {
    const table = document.querySelector("table tbody");
    const rows = Array.from(table.getElementsByTagName("tr"));
    rows.forEach((row, index) => {
        if (index < (pageNumber - 1) * itemsPerPage || index >= pageNumber * itemsPerPage) {
            row.style.display = "none";
        } else {
            row.style.display = "";
        }
    });
    updatePageDisplay();
}

function updateSelectedItem(row) {
    const cells = Array.from(row.getElementsByTagName("td"));
    const cluster = cells[8].innerText;
    const vCPU = cells[2].innerText;
    const memory = cells[3].innerText;
    const price = cells[9].innerText;
    const selectedContent = `所属集群: ${cluster}, vCPU: ${vCPU}, 内存: ${memory}, 价格: ${price}`;
    document.querySelector("#selected-content").innerText = selectedContent;

    // Mark the radio button as checked
    const radioButton = row.querySelector("input[type='radio']");
    radioButton.checked = true;
}

function updatePageDisplay() {
    document.querySelector('.pagination span').textContent = `${currentPage} / ${totalPages}`;
}

// Added jQuery sorting functionality
function addSortingFunctionality() {
    $(".sortable").click(function() {
        const column = $(this).data('column');
        const order = $(this).data('order') || "asc";
        const isNumber = !isNaN(currentDisplayedRows[0][column]);
        
        currentDisplayedRows = currentDisplayedRows.sort((a, b) => {
            if (isNumber) {
                return (order === "asc" ? 1 : -1) * (parseFloat(a[column]) - parseFloat(b[column]));
            } else {
                return (order === "asc" ? 1 : -1) * a[column].localeCompare(b[column]);
            }
        });
        
        $(this).data('order', order === "asc" ? "desc" : "asc");
        populateTable(currentDisplayedRows);
        displayPage(currentPage);
    });
}