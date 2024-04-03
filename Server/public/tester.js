document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pokemonForm');
    const notifier = document.getElementById('notifier');

    // Function to display notifications
    const displayNotification = (message, isError = false) => {
        notifier.textContent = message;
        notifier.className = `notification ${isError ? 'is-danger' : 'is-success'}`;
        setTimeout(() => {
            notifier.textContent = '';
        }, 3000);
    };

    // Function to handle form submission
    const handleFormSubmit = async (method, url, body) => {
        try {
            const response = await fetch(`http://localhost:8080${url}`, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data); // Log the response from the server
            displayNotification('Operation successful', false);
        } catch (error) {
            console.error('Error:', error);
            displayNotification('Operation failed', true);
        }
    };

    // Insert button click event
    document.getElementById('btnInsert').addEventListener('click', async () => {
        const body = {
            id: form.elements.id.value,
            name: {
                english: form.elements.nameEnglish.value,
                french: form.elements.nameFrench.value
            },
            type: form.elements.type.value.split(','),
            base: {
                HP: parseInt(form.elements.baseHP.value),
                Attack: parseInt(form.elements.baseAttack.value),
                Defense: parseInt(form.elements.baseDefense.value),
                'Sp. Attack': parseInt(form.elements.baseSpAttack.value),
                'Sp. Defense': parseInt(form.elements.baseSpDefense.value),
                Speed: parseInt(form.elements.baseSpeed.value)
            }
        };
        await handleFormSubmit('POST', '/api/pokemon', body);
    });

    // Update button click event
    document.getElementById('btnUpdate').addEventListener('click', async () => {
        const id = form.elements.id.value;
        const body = {
            name: {
                english: form.elements.nameEnglish.value,
                french: form.elements.nameFrench.value
            },
            type: form.elements.type.value.split(','),
            base: {
                HP: parseInt(form.elements.baseHP.value),
                Attack: parseInt(form.elements.baseAttack.value),
                Defense: parseInt(form.elements.baseDefense.value),
                'Sp. Attack': parseInt(form.elements.baseSpAttack.value),
                'Sp. Defense': parseInt(form.elements.baseSpDefense.value),
                Speed: parseInt(form.elements.baseSpeed.value)
            }
        };
        await handleFormSubmit('PUT', `/api/pokemon/${id}`, body);
    });

    // Delete button click event
    document.getElementById('btnDelete').addEventListener('click', async () => {
        const id = form.elements.id.value;
        await handleFormSubmit('DELETE', `/api/pokemon/${id}`);
    });
});
