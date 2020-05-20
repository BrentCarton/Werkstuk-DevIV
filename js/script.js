"use strict"
$(function () {
    $.ajax({
        url: "entries.json",
        method: "GET",
        dataType: "json"
    }).done(function (data) {
        getDoelgroep(data);
        getGenre(data);
    }).fail(function (a, b) {
        console.log(a, b);
    });
})

function getDoelgroep(data) {
    let doelgroepFilters = []
    $(".doelgroep").click(function () {
        getFilters(this, doelgroepFilters);
    })
}

function getGenre(data) {
    let genreFilters = []
    $(".genre").click(function () {
        getFilters(this, genreFilters);
    })
}

function getFilters(filterSoort, filters) {
    let filter = filterSoort.value;
    if (filterSoort.checked) {
        filters.push(filter);
    } else {
        filters.splice(filters.indexOf(filter), 1);
    }
    console.log(filters);
}