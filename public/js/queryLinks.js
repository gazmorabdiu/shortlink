       // Function to fetch URL data from the server
       async function fetchUrls() {
        try {
            // Fetch data from the server
            const response = await fetch('http://localhost:3000/links');
            if (!response.ok) {
                throw new Error('Failed to fetch URLs');
            }
            const {data} = await response.json();

            // Render the table
            renderTable(data);
        } catch (error) {
            console.error('Error fetching URLs:', error);
            document.getElementById('urlTableContainer').innerHTML = '<p>Error fetching URLs. Please try again later.</p>';
        }
    }

    // Function to render the table
    function renderTable(urls) {
        if (!urls || urls.length === 0) {
            document.getElementById('urlTableContainer').innerHTML = '<p>No URLs found.</p>';
            return;
        }

        // Create the table structure
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Create table headers
        thead.innerHTML = `
            <tr>
                <th>Short Link</th>
                <th>Click Count</th>
                <th>Action</th>
            </tr>
        `;

        // Populate table rows
        urls.forEach(urlObj => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>
                    <a href="/short.co/${urlObj.shortLink}" target="_blank" rel="noopener noreferrer">short.co/${urlObj.shortLink}</a>
                </td>
                <td>${urlObj.clickCount}</td>
                <td>
                    <img 
                        src="./images/delete.png" 
                        alt="Delete" 
                        class="delete-icon" 
                        data-url-id="${urlObj._id}" 
                        onclick="handleDelete('${urlObj._id}')"
                    >
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Append thead and tbody to the table
        table.appendChild(thead);
        table.appendChild(tbody);

        // Add the table to the container
        const container = document.getElementById('urlTableContainer');
        container.innerHTML = ''; // Clear previous content
        container.appendChild(table);
    }

    // Delete handler
    async function handleDelete(id) {
        if (!confirm(`Are you sure you want to delete this URL?`)) {
            return;
        }

        try {
            // Send delete request
            const response = await fetch(`http://localhost:3000/links/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('URL deleted successfully');
                fetchUrls(); // Refresh the table
            } else {
                alert('Failed to delete the URL');
            }
        } catch (error) {
            console.error('Error deleting URL:', error);
            alert('An error occurred while deleting the URL.');
        }
    }

    // Fetch URLs when the page loads
    fetchUrls();