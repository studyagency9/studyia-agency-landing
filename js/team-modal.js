document.addEventListener('DOMContentLoaded', function() {
    const teamCards = document.querySelectorAll('.team-card');
    const modal = document.getElementById('teamModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalBody = modal.querySelector('.modal-body');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightboxBtn = document.getElementById('closeLightbox');

    if (!modal || !lightbox) return;

    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.dataset.name;
            const role = card.dataset.role;
            const bio = card.dataset.bio;
            const skills = card.dataset.skills.split(',');
            const imgSrc = card.dataset.img;

            modalBody.innerHTML = `
                <div class="modal-grid">
                    <div class="modal-image" id="modalImage">
                        <img src="${imgSrc}" alt="Photo de ${name}">
                        <div class="zoom-icon"><i class="fas fa-search-plus"></i></div>
                    </div>
                    <div class="modal-info">
                        <h2 class="modal-name">${name}</h2>
                        <p class="modal-role">${role}</p>
                        <p class="modal-bio">${bio}</p>
                        <h4 class="skills-title">Compétences Clés</h4>
                        <div class="skills-list">
                            ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Event listener for lightbox
            document.getElementById('modalImage').addEventListener('click', () => {
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
            });
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'visible';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    closeLightboxBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
});
