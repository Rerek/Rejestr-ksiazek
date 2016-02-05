/**
 * Created by Rafal on 2016-02-04.
 */


$(document).ready(function () {
    $('.pobieranieKsiazek').on('click', function () {


        $.ajax({
            url: '../warsztaty3/test.php',
            type: 'POST', //pobierz metodą get

            dataType: 'json',
            success: function (result) {
                console.log(result[1]);

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