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
        genreFilters = setFilters(this, genreFilters);
        filters.genre.splice(0, 1);
        filters.genre.push(genreFilters);
        //console.log(filters);
        useFilters(data, filters);
    })
    let doelgroepFilters = []
    $(".doelgroep").click(function () {
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
    if (doelgroepFilters[0].length == 0 && genreFilters[0].length == 0) {
        console.log(data);
    } else {
        for (let dataIndex in data) {
            for (let doelGroepIndex in data) {
                if (data[dataIndex].category == doelgroepFilters[0][doelGroepIndex]) {
                    console.log(data[dataIndex]);
                }
            }
        }
    }
}