/**
 * Created by Rafal on 2016-02-04.
 */


$(document).ready(function () {
    $('.pobieranieKsiazek').on('click', function () {


        $.ajax({
            url: './api/js/test.php',
            type: 'GET', //pobierz metodą get
            dataType: 'json',
            success: function (result) {
                console.log(result);
                for(var i=0; i<result.length; i++) {
                    var newLi = $("<li> Tytuł: " + result[i].nazwa + " Autor: " + result[i].autor + " opis: " + result[i].opis + "</li>");
                    $('ul').prepend(newLi);
                }
            },
            error: function () {
                console.log('Wystąpił błąd.'); //to wyświetli się jak jest błąd
            },
            complete: function () {
                console.log('zakończono request'); //to jest wykonywane zawsze
            }
        });
    });

});


//Zadanie Rozgrzewkowe 1.
//
//Za pomocą AJAX pobierz aktualną datę z endpointu http://date.jsontest.com/.