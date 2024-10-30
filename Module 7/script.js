const form = document.getElementById('entry-form');
const entryList = document.getElementById('entry-list');

// Fetch and display entries
function fetchEntries() {
    fetch('/entries')
        .then(response => response.json())
        .then(entries => {
            entryList.innerHTML = '';
            entries.forEach(entry => {
                const li = document.createElement('li');
                li.className = 'entry-item';
                li.innerHTML = `
                    <span class="entry-text" data-id="${entry.id}">${entry.text}</span>
                    <button class="edit-btn" data-id="${entry.id}">Edit</button>
                    <button class="delete-btn" data-id="${entry.id}">Delete</button>
                `;
                entryList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching entries:', error));
}

// Handle form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.getElementById('entry-input');
    const newEntry = { text: input.value.trim() }; // Trim whitespace

    if (!newEntry.text) {
        alert('Entry cannot be empty!'); // Simple validation
        return;
    }

    fetch('/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(entry => {
        input.value = ''; // Clear input field
        fetchEntries(); // Refresh the list
    })
    .catch(error => console.error('Error adding entry:', error));
});

// Event delegation for edit and delete buttons
entryList.addEventListener('click', function (e) {
    const id = e.target.getAttribute('data-id');
    if (e.target.matches('.edit-btn')) {
        const entryText = e.target.previousElementSibling; // Get the span with the text
        const newText = prompt('Edit your entry:', entryText.textContent); // Prompt for new text

        if (newText !== null && newText.trim()) { // Check if the user provided input
            fetch(`/entries/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newText })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update entry');
                }
                fetchEntries(); // Refresh the list
            })
            .catch(error => console.error('Error updating entry:', error));
        }
    }

    if (e.target.matches('.delete-btn')) {
        if (confirm('Are you sure you want to delete this entry?')) {
            fetch(`/entries/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchEntries(); // Refresh the list after deletion
                    } else {
                        throw new Error('Failed to delete entry');
                    }
                })
                .catch(error => console.error('Error deleting entry:', error));
        }
    }
});

// Initial fetch
fetchEntries();
