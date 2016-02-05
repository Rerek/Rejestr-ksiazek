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

                $('#nazwa').html(result[0].nazwa);
                $('#autor').html(result[1].autor);
                $('#opis').html(result[2].opis);
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