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

function setFilters(filterSoort, filters) {
    let filter = filterSoort.value;
    if (filterSoort.checked) {
        filters.push(filter);
    } else {
        filters.splice(filters.indexOf(filter), 1);
    }
    return filters;
}

function useFilters(data, filters) {
    let doelgroepFilters = filters.doelgroep;
    let genreFilters = filters.genre;
    let test = 0;
    if (doelgroepFilters[0].length == 0 && genreFilters[0].length == 0) {
        console.log("geen");
        console.log(data);
        for (let dataIndex in data) {
            appendToHTML(data[dataIndex]);
        }
    } else {
        if (doelgroepFilters[0].length == 0) {
            console.log("genre");
            for (let dataIndex in data) {
                for (let genreIndex in genreFilters[0]) {
                    if (data[dataIndex]["genre-v2"] == genreFilters[0][genreIndex]) {
                        appendToHTML(data[dataIndex]);
                    }

                }
            }
        } else if (genreFilters[0].length == 0) {
            console.log("doelgroep");
            for (let dataIndex in data) {
                for (let doelGroepIndex in doelgroepFilters[0]) {
                    if (data[dataIndex].category == doelgroepFilters[0][doelGroepIndex]) {
                        appendToHTML(data[dataIndex]);
                    }
                }
            }
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

function appendToHTML(data) {
    console.log("test");
    $(".content").append(`<div class="card"><div class="imgContainer"><img src="${data.thumbnail.url}" alt="${data.slug}"></div><h2>${data.name}</h2><h3 class="genreTitle">${data["genre-v2"]}</h3><h3 class="leeftijdTitle">${data.age}</h3><p>${data.excerpt}</p><p>${data["recorded-at"]}</p><h4>${data["video-length"]}</h4></div>`)
}