let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;
    // 1.result-container - result-item
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item");
    searchResultsEl.appendChild(resultContainer);
    //2.titleAnchor - result-title
    let titleAnchorEl = document.createElement("a");
    titleAnchorEl.classList.add("result-title");
    titleAnchorEl.textContent = title;
    titleAnchorEl.setAttribute("href", link);
    titleAnchorEl.target = "_blank";
    resultContainer.appendChild(titleAnchorEl);

    //3.titlelineBreak
    let titlelineBreak = document.createElement("br");
    resultContainer.appendChild(titlelineBreak);
    //4.linkAnchor - result-url
    let linkAnchorEl = document.createElement("a");
    linkAnchorEl.classList.add("result-url");
    linkAnchorEl.textContent = link;
    linkAnchorEl.setAttribute("href", link);
    linkAnchorEl.target = "_blank";
    resultContainer.appendChild(linkAnchorEl);
    //5.link line Break
    let linkLineBraek = document.createElement("br");
    resultContainer.appendChild(linkLineBraek);
    //6.description - link-description
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    resultContainer.appendChild(descriptionEl);
}


function displayResult(search_results) {
    spinnerEl.classList.toggle("d-none")
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}


function searchWikipedia(event) {
    if (event.key === "Enter") {

        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }
}


searchInputEl.addEventListener("keydown", searchWikipedia);