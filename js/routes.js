/*
 * routes definition and handling for paramHashRouter
 */

import Mustache from "./mustache.js";
import processOpnFrmData from "./addOpinion.js";
import articleFormsHandler from "./articleFormsHandler.js";

//an array, defining the routes
export default [

    {
        //the part after '#' in the url (so-called fragment):
        hash: "welcome",
        ///id of the target html element:
        target: "router-view",
        //the function that returns content to be rendered to the target html element:
        getTemplate: (targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-welcome").innerHTML
    },
    {
        hash: "articles",
        target: "router-view",
        getTemplate: fetchAndDisplayArticles
    }, {
        hash: "insert",
        target: "router-view",
        getTemplate: (targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-insert").innerHTML
    },
    {
        hash: "article",
        target: "router-view",
        getTemplate: fetchAndDisplayArticleDetail
    },
    {
        hash: "artEdit",
        target: "router-view",
        getTemplate: editArticle
    },
    {
        hash: "artDelete",
        target: "router-view",
        getTemplate: deleteArticle
    },
    {
        hash: "artInsert",
        target: "router-view",
        getTemplate: submitArticleInsertForm
    },
    {
        hash: "opinions",
        target: "router-view",
        getTemplate: createHtml4opinions
    },
    {
        hash: "addOpinion",
        target: "router-view",
        getTemplate: (targetElm) => {
            document.getElementById(targetElm).innerHTML = document.getElementById("template-addOpinion").innerHTML;
            document.getElementById("opnFrm").onsubmit = processOpnFrmData;
        }
    }

];
const urlBase = "https://wt.kpi.fei.tuke.sk/api";
const articlesPerPage = 20;
function createHtml4opinions(targetElm) {
    const opinionsFromStorage = localStorage.myTreesComments;
    let opinions = [];

    if (opinionsFromStorage) {
        opinions = JSON.parse(opinionsFromStorage);
        opinions.forEach(opinion => {
            opinion.createdDate = (new Date(opinion.created)).toDateString();
            // opinion.created = (new Date(opinion.created)).toDateString();
            opinion.willReturn = opinion.willReturn ? "I will return to this page." : "Sorry, one visit was enough.";
        });
    }

    document.getElementById(targetElm).innerHTML = Mustache.render(
        document.getElementById("template-opinions").innerHTML,
        opinions
    );
}
function fetchAndDisplayArticles(targetElm, my_offset = 0) {

    const maxResults = 20;
    my_offset = Math.min(520, Math.max(0, my_offset));
    const url = `https://wt.kpi.fei.tuke.sk/api/article/?max=${maxResults}&offset=${my_offset}`;

    function reqListener() {
        console.log(this.responseText)
        if (this.status == 200) {
            const responseJSON = JSON.parse(this.responseText)
            addArtDetailLink2ResponseJson(responseJSON);
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles").innerHTML,
                    responseJSON
                );
            const prevLink = document.getElementById("prevLink");
            const nextLink = document.getElementById("nextLink");

            if (my_offset > 0) {
                prevLink.style.display = "block";
                prevLink.addEventListener("click", () => {
                    fetchAndDisplayArticles(targetElm, my_offset - 20);
                });
            } else {
                prevLink.style.display = "none";
            }
            if (my_offset < 480) {
                nextLink.style.display = "block";
                nextLink.addEventListener("click", () => {
                    fetchAndDisplayArticles(targetElm, my_offset + 20);
                });
            } else {
                nextLink.style.display = "none";
            }
        } else {
            const errMsgObj = { errMessage: this.responseText };
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles-error").innerHTML,
                    errMsgObj
                );
        }

    }

    console.log(url)
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListener);
    ajax.open("GET", url, true);
    ajax.send();
}
function addArtDetailLink2ResponseJson(responseJSON) {
    responseJSON.articles = responseJSON.articles.map(
        article => (
            {
                ...article,
                detailLink: `#article/${article.id}/${responseJSON.meta.offset}/${responseJSON.meta.totalCount}`
            }
        )
    );
}

function fetchAndDisplayArticleDetail(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash) {
    fetchAndProcessArticle(...arguments, false);
}

/**
 * Gets an article record from a server and processes it to html according to
 * the value of the forEdit parameter. Assumes existence of the urlBase global variable
 * with the base of the server url (e.g. "https://wt.kpi.fei.tuke.sk/api"),
 * availability of the Mustache.render() function and Mustache templates )
 * with id="template-article" (if forEdit=false) and id="template-article-form" (if forEdit=true).
 * @param targetElm - id of the element to which the acquired article record
 *                    will be rendered using the corresponding template
 * @param artIdFromHash - id of the article to be acquired
 * @param offsetFromHash - current offset of the article list display to which the user should return
 * @param totalCountFromHash - total number of articles on the server
 * @param forEdit - if false, the function renders the article to HTML using
 *                            the template-article for display.
 *                  If true, it renders using template-article-form for editing.
 */
function fetchAndProcessArticle(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash, forEdit) {
    const url = `${urlBase}/article/${artIdFromHash}`;

    function reqListener() {
        console.log(this.responseText)
        if (this.status == 200) {
            const responseJSON = JSON.parse(this.responseText)
            if (forEdit) {
                responseJSON.formTitle = "Article Edit";
                responseJSON.submitBtTitle = "Save article";
                responseJSON.backLink = `#article/${artIdFromHash}/${offsetFromHash}/${totalCountFromHash}`;

                document.getElementById(targetElm).innerHTML =
                    Mustache.render(
                        document.getElementById("template-article-form").innerHTML,
                        responseJSON
                    );
                if (!window.artFrmHandler) {
                    window.artFrmHandler = new articleFormsHandler("https://wt.kpi.fei.tuke.sk/api");
                }
                window.artFrmHandler.assignFormAndArticle("articleForm", "hiddenElm", artIdFromHash, offsetFromHash, totalCountFromHash);
            } else {
                responseJSON.backLink = `#articles/${offsetFromHash}/${totalCountFromHash}`;
                responseJSON.editLink =
                    `#artEdit/${responseJSON.id}/${offsetFromHash}/${totalCountFromHash}`;
                responseJSON.deleteLink =
                    `#artDelete/${responseJSON.id}/${offsetFromHash}/${totalCountFromHash}`;

                document.getElementById(targetElm).innerHTML =
                    Mustache.render(
                        document.getElementById("template-article").innerHTML,
                        responseJSON
                    );
            }
        } else {
            const errMsgObj = { errMessage: this.responseText };
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles-error").innerHTML,
                    errMsgObj
                );
        }
    }
    console.log(url)
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListener);
    ajax.open("GET", url, true);
    ajax.send();
}

function editArticle(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash) {
    fetchAndProcessArticle(...arguments, true);
}

function deleteArticle(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash) {
    const url = `${urlBase}/article/${artIdFromHash}`;

    function reqListener() {
        if (this.status === 204) {
            // Article deleted successfully
            window.location.hash = `#articles/${offsetFromHash}/${totalCountFromHash}`;
        } else {
            // Handle deletion failure
            const errMsgObj = { errMessage: "Article deletion failed." };
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles-error").innerHTML,
                    errMsgObj
                );
        }
    }

    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", reqListener);
    ajax.open("DELETE", url, true);
    ajax.send();
}
function submitArticleInsertForm() {
    const title = document.getElementById("new_title").value;
    const author = document.getElementById("new_author").value;
    const content = document.getElementById("new_content").value;
    const tags = document.getElementById("new_tags").value.split(",");

    const formData = {
        title: title,
        author: author,
        content: content,
        tags: tags
    };

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://wt.kpi.fei.tuke.sk/api/articles", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Define the callback function for successful response
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Insertion successful
            console.log("Article inserted successfully:", xhr.responseText);

            // After successful insertion, navigate back to the articles list
            // window.location.hash = "#articles";
        } else {
            console.error("Error during article insertion:", xhr.statusText);
            // Handle error if needed
        }
    };
    xhr.onerror = function () {
        console.error("Network error during article insertion");
        // Handle error if needed
    };

    xhr.send(JSON.stringify(formData));
}




