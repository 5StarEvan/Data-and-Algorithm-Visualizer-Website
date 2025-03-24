function ReturnHome() {
    document.location.href = "home.html";
}

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const dataStructureLinks = document.querySelectorAll('.Data-Structure-Link');
    const algorithmLinks = document.querySelectorAll('.Algorithm-Link');
    const noResultsMessage = document.getElementById('noResults');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let resultsFound = false;

        if (searchTerm === '') {
            dataStructureLinks.forEach(link => {
                link.classList.remove('hidden');
            });
            algorithmLinks.forEach(link => {
                link.classList.remove('hidden');
            });
            noResultsMessage.classList.add('hidden');
            toggleClearButton(false);
            return;
        }

        toggleClearButton(true);

        dataStructureLinks.forEach(link => {
            const linkText = link.textContent.toLowerCase();
            const linkId = link.id.toLowerCase();

            if (linkText.includes(searchTerm) || linkId.includes(searchTerm)) {
                link.classList.remove('hidden');
                resultsFound = true;
                highlightMatches(link, searchTerm);
            } else {
                link.classList.add('hidden');
            }
        });

        algorithmLinks.forEach(link => {
            const linkText = link.textContent.toLowerCase();
            const linkId = link.id.toLowerCase();

            if (linkText.includes(searchTerm) || linkId.includes(searchTerm)) {
                link.classList.remove('hidden');
                resultsFound = true;
                highlightMatches(link, searchTerm);
            } else {
                link.classList.add('hidden');
            }
        });

        if (resultsFound) {
            noResultsMessage.classList.add('hidden');
        } else {
            noResultsMessage.classList.remove('hidden');
        }
    }

    function highlightMatches(element, searchTerm) {
    }

    function toggleClearButton(show) {
        if (show) {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
        }
    }

    function clearSearch() {
        searchInput.value = '';

        dataStructureLinks.forEach(link => {
            link.classList.remove('hidden');
        });

        algorithmLinks.forEach(link => {
            link.classList.remove('hidden');
        });

        noResultsMessage.classList.add('hidden');
        toggleClearButton(false);
        searchInput.focus();
    }

    toggleClearButton(searchInput.value.trim() !== '');

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
        toggleClearButton(this.value.trim() !== '');
    });

    clearButton.addEventListener('click', clearSearch);

    searchInput.addEventListener('input', function () {
        toggleClearButton(this.value.trim() !== '');
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            clearSearch();
        }

        if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
            event.preventDefault();
            searchInput.focus();
        }
    });
});
