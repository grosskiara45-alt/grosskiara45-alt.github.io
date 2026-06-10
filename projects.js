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
            projectsContainer.innerHTML = `<p class="no-projects">No matching projects found.</p>`;
            return;
        }

        const projectNodes =  myOwnRepos.map(repo => {
            const section = document.createElement('div');
            section.classList = 'section';

            const h2 = document.createElement('h2');
            h2.textContent = repo.name;
        
            const p = document.createElement('p');
            p.classList = 'description';
            p.textContent = repo.description;

            const span = document.createElement('span');
            span.classList = 'language';
            span.textContent = repo.language;

            const link = document.createElement('a');
            link.href = repo.html_url;
            link.target = '_blank';
            link.classList = 'project-link';
            link.textContent = 'View on GitHub';

            section.append(h2, p, span, link);
            return section;
            });
        projectsContainer.replaceChildren(...projectNodes);
        } 
    catch (error){
            console.error(`Error fetching GitHub Data!`, error);
            projectsContainer.innerHTML = `<p>Couldn't load projects!</p>`;
        }  
    } 
fetchGitHubProjects();
