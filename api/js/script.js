/**
 * Created by Rafal on 2016-02-04.
 */


$(document).ready(function MTest() {


    $('h2').on('click', function () {
        var idBook = 8;

        $.ajax({
            url: './api/js/test.php?id=' + idBook,
            type: 'GET', //pobierz metodą get

            dataType: 'json',
            success: function (result) {
                console.log("Wynik zapytania o jedną książkę, to:");
                console.log(result);

            },
            error: function () {
                console.log('Wystąpił błąd.'); //to wyświetli się jak jest błąd
            },
            complete: function () {
                console.log('zakończono request'); //to jest wykonywane zawsze
            }
        });
    });


    $.ajax({
        url: './api/js/test.php',
        type: 'GET', //pobierz metodą get
        dataType: 'json',
        success: function (result) {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var newBook = $("<div class='title' id=" + result[i].id + ">" + result[i].nazwa + "<div class='desc'> Autor: " + result[i].autor + "<br> opis: " + result[i].opis + "</div></div>");
                $('#listOfBooks').prepend(newBook);
            }

            $('div.title').on('click', function () {
                if ($(this).find("div").hasClass('desc')) {
                    $(this).find("div").removeClass('desc');
                } else {
                    $(this).find("div").addClass('desc');
                }
            });

        },
        error: function () {
            console.log('Wystąpił błąd.'); //to wyświetli się jak jest błąd
        },
        complete: function () {
            console.log('zakończono request'); //to jest wykonywane zawsze
        }
    });


    $('button.add').on('click', function (e) {
        e.preventDefault();
        var tytulForm = $('input[name=tytul]').val();
        var autorForm = $('input[name=autor]').val();
        var opisForm = $('textarea[name=opis]').val();

        console.log("Wprowadzone dane do dodania:");
        console.log(tytulForm);
        console.log(autorForm);
        console.log(opisForm);

        dataToSend = {};
        dataToSend.tytul = tytulForm;
        dataToSend.autor = autorForm;
        dataToSend.opis = opisForm;

        $.ajax({
            url: './api/js/test.php',
            type: 'POST',
            data: dataToSend,
            dataType: 'json',
            success: function (result) {
                console.log(result); //wyświetla komunikat od ./api/js/test.php
                MTest();
            },
            error: function () {
                console.log('Wystąpił błąd.'); //to wyświetli się jak jest błąd
            },
            complete: function () {
                console.log('zakończono request'); //to jest wykonywane zawsze
            }
        });
        $('input[name=tytul]').val('');     //czyszczenie pola formularza
        $('input[name=autor]').val('')      //czyszczenie pola formularza
        $('textarea[name=opis]').val('');   //czyszczenie pola formularza


    });
});