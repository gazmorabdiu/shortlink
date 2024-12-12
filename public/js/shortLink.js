document.getElementById('shortenUrlBtn').addEventListener('click', async function () {
    // Get the input and select values
    const linkName = document.querySelector('input[name="linkName"]').value;
    const expiresIn = document.querySelector('select[name="expiresIn"]').value;

    // Ensure both values are filled out
    if (!linkName || expiresIn === "none") {
        alert("Please fill in all fields.");
        return;
    }

    // Generate random string for short link
    const generateRandomString = (length) => Math.random().toString(36).substring(2, 2 + length);

    // Calculate expiration date
    const getExpiredDate = (expire) => {
        const now = new Date();
        return new Date(now.setSeconds(now.getSeconds() + expire));
    };

    // Create the data object
    const data = {
        linkName: linkName,
        expiresIn: getExpiredDate(+expiresIn),
        shortLink: `${generateRandomString(10)}`
    };

    // Send a POST request
    try {
        const response = await fetch('http://localhost:3000/links/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            alert(responseData.message);
        } else {
            alert('This link has an active short link');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
    } finally {
        // Force a reload from the server
        location.reload(true);
    }
});