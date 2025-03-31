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
        expList.innerHTML = '<li>No experience data found.</li>';
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
            `;
            eduList.appendChild(li);
        });
    } else if (eduList) {
        eduList.innerHTML = '<li>No education data found.</li>';
    }


    // --- Populate Contact Links ---
    if (content.contact) {
        const contactData = content.contact;

        // Email Link
        const emailLink = document.getElementById('contact-email');
        if (emailLink) {
            if (contactData.email) {
                emailLink.href = `mailto:${contactData.email}`;
            }
            if (contactData.email_display_text) {
                emailLink.textContent = contactData.email_display_text;
            } else {
                emailLink.style.display = 'none'; // Hide if no text
            }
        }

        // LinkedIn Link
        const linkedinLink = document.getElementById('contact-linkedin');
        if (linkedinLink) {
            if (contactData.linkedin_url) {
                linkedinLink.href = contactData.linkedin_url;
            } else {
                linkedinLink.style.display = 'none'; // Hide if no URL
            }
            if (contactData.linkedin_text) {
                linkedinLink.textContent = contactData.linkedin_text;
            } else {
                linkedinLink.style.display = 'none'; // Hide if no text
            }
            // Hide completely if either URL or text is missing
            if (!contactData.linkedin_url || !contactData.linkedin_text) {
                linkedinLink.style.display = 'none';
            }
        }


        // ArtStation Link
        const artstationLink = document.getElementById('contact-artstation');
        if (artstationLink) {
            if (contactData.artstation_url) {
                artstationLink.href = contactData.artstation_url;
            } else {
                artstationLink.style.display = 'none'; // Hide if no URL
            }
            if (contactData.artstation_text) {
                artstationLink.textContent = contactData.artstation_text;
            } else {
                artstationLink.style.display = 'none'; // Hide if no text
            }
            // Hide completely if either URL or text is missing
            if (!contactData.artstation_url || !contactData.artstation_text) {
                artstationLink.style.display = 'none';
            }
        }

        const musicLink = document.getElementById('contact-music');
        if (musicLink) {
            if (contactData.music_url) {
                musicLink.href = contactData.music_url;
            } else {
                musicLink.style.display = 'none'; // Hide if no URL
            }
            if (contactData.music_text) {
                musicLink.textContent = contactData.music_text;
            } else {
                musicLink.style.display = 'none'; // Hide if no text
            }
            // Hide completely if either URL or text is missing
            if (!contactData.music_url || !contactData.music_text) {
                musicLink.style.display = 'none';
            }
        }
    }
    // --- End Populate Contact Links ---
}