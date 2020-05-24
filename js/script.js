"use strict"
$(function () {
    let filters = {
        genre: [""],
        doelgroep: [""]
    };
    $.ajax({
        url: "entries.json",
        method: "GET",
        dataType: "json"
    }).done(function (data) {
        useFilters(data.items, filters);
        getFilters(data.items, filters);
    }).fail(function (a, b) {
        console.log(a, b);
    });
})

//Wanneer er op een filter wordt geklikt wordt de vorige filterarray verwijdert, alsook alle items die op dat moment
//worden weergegeven en wordt de nieuwe filterarray toegevoegd aan het object. Die wordt dan doorgegeven aan een andere
//functie waar deze verwerkt zullen worden. 

function getFilters(data, filters) {
    let genreFilters = []
    $(".genre").click(function () {
        $(".content").text("");
        genreFilters = setFilters(this, genreFilters);
        filters.genre.splice(0, 1);
        filters.genre.push(genreFilters);
        //console.log(filters);
        useFilters(data, filters);
    })
    let doelgroepFilters = []
    $(".doelgroep").click(function () {
        $(".content").text("");
        doelgroepFilters = setFilters(this, doelgroepFilters);
        filters.doelgroep.splice(0, 1);
        filters.doelgroep.push(doelgroepFilters);
        //console.log(filters);
        useFilters(data, filters);
    })
}

//Deze functie checked welke filters zijn aangeduid en pushed ze in de filterarray. Indien men de filter nog eens aanclicked
//zal deze gedeselecteerd worden en verwijdert worden uit de filterarray.

function setFilters(filterSoort, filters) {
    let filter = filterSoort.value;
    if (filterSoort.checked) {
        filters.push(filter);
    } else {
        filters.splice(filters.indexOf(filter), 1);
    }
    return filters;
}

// In deze functie worden de items gefilterd volgens de verschillende criteria/situaties (zie readme file). Elk item die
//de aangeduide filters matched zal worden doorgegeven aan een nieuwe functie die deze verder verwerkt.

function useFilters(data, filters) {
    let doelgroepFilters = filters.doelgroep;
    let genreFilters = filters.genre;

    //Indien er geen filters zijn aangeduid worden alle items weergegeven.
    if (doelgroepFilters[0].length == 0 && genreFilters[0].length == 0) {
        console.log("geen");
        console.log(data);
        for (let dataIndex in data) {
            appendToHTML(data[dataIndex]);
        }
    } else {
        //Indien enkel genrefilters zijn aangeduid filter ik enkel op genre.
        if (doelgroepFilters[0].length == 0) {
            console.log("genre");
            for (let dataIndex in data) {
                for (let genreIndex in genreFilters[0]) {
                    if (data[dataIndex]["genre-v2"] == genreFilters[0][genreIndex]) {
                        appendToHTML(data[dataIndex]);
                    }

                }
            }
            //Indien enkel doelgroepfilters zijn aangeduid filter ik enkel op doelgroep
        } else if (genreFilters[0].length == 0) {
            console.log("doelgroep");
            for (let dataIndex in data) {
                for (let doelGroepIndex in doelgroepFilters[0]) {
                    if (data[dataIndex].category == doelgroepFilters[0][doelGroepIndex]) {
                        appendToHTML(data[dataIndex]);
                    }
                }
            }
            //Indien beide filters zijn aangeduid zal ik eerst alle items filteren op doelgroep en vervolgens op genre
        } else {
            console.log("beide");
            for (let dataIndex in data) {
                for (let doelGroepIndex in doelgroepFilters[0]) {
                    for (let genreIndex in genreFilters[0]) {
                        if (data[dataIndex].category == doelgroepFilters[0][doelGroepIndex] && data[dataIndex]["genre-v2"] == genreFilters[0][genreIndex]) {
                            appendToHTML(data[dataIndex]);
                        }
                    }
                }
            }
        }
    }
}

//Deze functie zal alle items die voldoen aan de filters toevoegen aan de html file

function appendToHTML(data) {
    $(".content").append(`<div class="card"><div class="imgContainer"><img src="${data.thumbnail.url}" alt="${data.slug}"></div><h2>${data.name}</h2><h3 class="genreTitle">${data["genre-v2"]}</h3><h3 class="leeftijdTitle">${data.age}</h3><p>${data.excerpt}</p><p>${data["recorded-at"]}</p><h4>${data["video-length"]}</h4></div>`)
}