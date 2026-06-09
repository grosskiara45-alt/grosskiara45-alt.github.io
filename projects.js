//Fetch GitHub Projects//
const githubUsername = 'grosskiara45-alt';
const projectsContainer = document.getElementById('github-projects');

async function fetchGitHubProjects(){
    const url = `https://api.github.com/users/${githubUsername}/repos`;

    try{
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`GitHub API Error! Status: ${response.status}`);
        }

        const repos = await response.json();

        const featuredProjects = ['knitting_blog', 'summer-chores', 'the-quote-card-express'];

        const myOwnRepos = repos.filter(repo => {
            return !repo.fork && featuredProjects.includes(repo.name);
        });

        if (myOwnRepos.length === 0) {
            projectsContainer.innerHTML = `<p class="no-projects">No public, non-forked repositories found for this user.</p>`;
            return;
        }

        let htmlContent = '';
        myOwnRepos.forEach(repo => {
            const description = repo.description || 'No description provided.';
            const language = repo.language || 'Mixed languages';
            htmlContent += `
            <div class="section">
                <h2>${repo.name}</h2>
                <p class="description">${description}</p>
                <div class="project-meta">
                    <span class="language">${language}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="project-link">
                View on GitHub
                </a>
            </div>
            `;
        });
        projectsContainer.innerHTML = htmlContent;
    } catch (error) {
        console.error(`Error fetching GitHub data!`, error);
        projectsContainer.innerHTML = `
        <p> Couldn't load project! </p>
        `;
    }
}

fetchGitHubProjects();
