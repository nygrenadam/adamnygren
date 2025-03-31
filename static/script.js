document.addEventListener('DOMContentLoaded', () => {
    fetch('content.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            populateContent(data);
        })
        .catch(error => {
            console.error('Error fetching or parsing content.json:', error);
            // Optionally display an error message to the user on the page
            document.body.innerHTML = '<p style="color: red; text-align: center; padding: 2rem;">Error loading portfolio content. Please try again later.</p>';
        });
});

function populateContent(content) {
    // Set Name in Header
    const nameElement = document.querySelector('[data-content="name"]');
    if (nameElement) nameElement.textContent = content.name;

    // Set Document Title
    document.title = `${content.name} - Portfolio`;

    // Set Tagline
    const taglineElement = document.querySelector('[data-content="tagline"]');
    if (taglineElement) taglineElement.textContent = content.tagline;

    // Populate Experience List
    const expList = document.getElementById('experience-list');
    if (expList && content.experience) {
        expList.innerHTML = ''; // Clear loading indicator
        content.experience.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${item.title || ''}</strong>
                <span>${item.company || ''} - ${item.duration || ''}</span>
                ${item.description ? `<p>${item.description}</p>` : ''}
            `;
            expList.appendChild(li);
        });
    } else if (expList) {
        expList.innerHTML = '<li>No experience data found.</li>'; // Handle empty/missing data
    }

    // Populate Education List
    const eduList = document.getElementById('education-list');
    if (eduList && content.education) {
        eduList.innerHTML = ''; // Clear loading indicator
        content.education.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${item.degree || ''}</strong>
                <span>${item.institution || ''} - ${item.duration || ''}</span>
                 ${item.description ? `<p>${item.description}</p>` : ''}
            `; // Assuming similar structure, adjust if needed
            eduList.appendChild(li);
        });
    } else if (eduList) {
        eduList.innerHTML = '<li>No education data found.</li>'; // Handle empty/missing data
    }


    // Populate Contact Link
    const contactLink = document.getElementById('contact-link');
    if (contactLink && content.contact) {
        if (content.contact.email) {
            contactLink.href = `mailto:${content.contact.email}`;
        }
        if (content.contact.email_display_text) {
            contactLink.textContent = content.contact.email_display_text;
        }
    }
}