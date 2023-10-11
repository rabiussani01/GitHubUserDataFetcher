// Function to fetch user data and display it
const fetchUserData = () => {
    const usernameInput = document.getElementById('github-username');
    const username = usernameInput.value;
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            // Display user data
            document.getElementById('name').textContent = data.name || 'N/A';
            document.getElementById('username').textContent = data.login || 'N/A';
            document.getElementById('followers').textContent = data.followers || 'N/A';
            document.getElementById('following').textContent = data.following || 'N/A';
            document.getElementById('public-repos').textContent = data.public_repos || 'N/A';
            document.getElementById('biography').textContent = data.bio || 'N/A';

            // Show the user data section
            document.getElementById('github-data').classList.remove('hidden');

            // Hide the "Get Repositories" button
            document.getElementById('fetch-repositories').classList.add('hidden');

            // Show the "Reset Data" button
            document.getElementById('reset-data').classList.remove('hidden');
        })
        .catch(error => {
            alert('Error fetching user data.');
        });
};

// Function to reset user data and repositories
const resetUserData = () => {
    // Clear user data
    document.getElementById('name').textContent = 'N/A';
    document.getElementById('username').textContent = 'N/A';
    document.getElementById('followers').textContent = 'N/A';
    document.getElementById('following').textContent = 'N/A';
    document.getElementById('public-repos').textContent = 'N/A';
    document.getElementById('biography').textContent = 'N/A';

    // Clear the repository list
    document.getElementById('repo-list').innerHTML = '';

    // Hide the user repositories section
    document.getElementById('repositories').classList.add('hidden');

    // Hide the "Reset Data" button
    document.getElementById('reset-data').classList.add('hidden');
    
    // Reset the input field
    document.getElementById('github-username').value = '';
};

// Function to fetch and display user repositories
const fetchUserRepositories = () => {
    const username = document.getElementById('github-username').value;
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repositories => {
            // Display user repositories as a list
            const repoList = document.getElementById('repo-list');
            repoList.innerHTML = ''; // Clear previous repositories data

            repositories.forEach((repo, index) => {
                const repoItem = document.createElement('li');
                const repoTitle = document.createElement('strong');
                const repoDescription = document.createElement('em');
                const repoLink = document.createElement('a');

                // Set the repository title with a link and target to open in a new tab
                repoTitle.textContent = `${index + 1}. ${repo.name}`;
                repoLink.href = repo.html_url;
                repoLink.target = '_blank';
                repoLink.appendChild(repoTitle);

                // Set the repository description (italic)
                repoDescription.textContent = repo.description || 'No description';

                // Append the title, link, and description to the list item
                repoItem.appendChild(repoLink);
                repoItem.appendChild(document.createElement('br')); // Add space after the title
                repoItem.appendChild(repoDescription);

                // Append the list item to the repository list
                repoList.appendChild(repoItem);
            });

            // Show the user repositories section
            document.getElementById('repositories').classList.remove('hidden');
        })
        .catch(error => {
            alert('Error fetching user repositories.');
        });
};

// Add event listener to the "Fetch Data" button
document.getElementById('fetch-data').addEventListener('click', () => {
    // Add the "clicked" class to indicate that the button has been clicked
    document.getElementById('fetch-data').classList.add('clicked');
    fetchUserData();
});

// Add event listener to the "Reset Data" button
document.getElementById('reset-data').addEventListener('click', resetUserData);

// Add event listener to the "Get Repositories" button
document.getElementById('fetch-repositories').addEventListener('click', fetchUserRepositories);

// Initially hide the "Get Repositories" button and "Reset Data" button
document.getElementById('fetch-repositories').classList.add('hidden');
document.getElementById('reset-data').classList.add('hidden');
