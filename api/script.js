/**
 * Created by Rafal on 2016-02-04.
 */

$(document).ready(function MTest() {
    $.ajax({
        url: './api/test.php',
        type: 'GET', //pobierz metodą get
        dataType: 'json',
        success: function (result) {     //wczytuje wszystkie tytuły z bazy danych
            console.log(result);
            $('#listOfBooks').html('');
            for (var i = 0; i < result.length; i++) {
                var newBook = $("<div class='title' id=" + result[i].id + "><h2>" + result[i].nazwa + "</h2><button type=submit class=del>Usuń</button><button type=submit class=moreDesc>Szczegóły</button><div class='desc'></div></div>");
                $('#listOfBooks').prepend(newBook);
            }
            $('.del').one('click', function (e) {      //usuwanie ,!!!!
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                var idToDelete = ($(this).closest('.title').attr('id'));

                if (idToDelete == 666){
                    alert("NIE MOŻNA USUNĄĆ, TA KSIĄŻKA JEST ZAKAZANA!");
                }else{
                $.ajax({                            //usuwanie!!!!!!
                    url: './api/test.php/',
                    type: 'DELETE',
                    data: 'id=' + idToDelete,
                    success: function () {
                        console.log('usunięto' + idToDelete);
                        MTest();
                    },
                    error: function () {
                        console.log('Wystąpił błądtuuuutaj.'); //to wyświetli się jak jest błąd
                    },
                    complete: function () {
                        console.log('zakończono request'); //to jest wykonywane zawsze
                    }
                });
                }
            });

            //wysuwa diva ze szczegółami o książce
            $('button.moreDesc').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var idtytulu = $(this).closest('div').attr('id');
                var opis = $(this).closest('div').find("div");

                if (idtytulu == 666){
                    alert("NIE WOLNO ODCZYTAĆ INFORMACJI, TA KSIĄŻKA JEST ZAKAZANA!");
                }else if (opis.hasClass('desc')) {
                    $(this).html('Mniej szczegółów');  //zmiana napisu na przycisku
                    $.ajax({
                        url: './api/test.php?id=' + idtytulu,
                        type: 'GET', //pobierz metodą get
                        dataType: 'json',
                        success: function (result) {
                            opis.removeClass('desc');
                            var formChange = ('<form class=desc><p>Nowy tytuł:<input type="text" name="newTitleForm" size="40" value="' + result.nazwa + '"></p> <p>Nowy autor:<input type="text" name="newAuthorForm" size="40" value="' + result.autor + '"></p> <p>Opis:<textarea type="text" name="newDescribeForm" cols="50" rows="8" >' + result.opis + '</textarea></p> <button type="submit" class="update">Wyślij Zmiany</button></form>');
                            opis.html('<h3>Autor:</h3> ' + result.autor + "<h3>Opis:</h3>" + result.opis + "<br><button type=submit class=edit>Edytuj</button>" + formChange); //dodanie opisu do tytułu

                            //obsługa przycisku 'edytuj'
                            var barEdit = $('button.edit');
                            barEdit.on('click', function () {
                                console.log('zyje');
                                var editForm = $(this).closest('div').find('form');
                                console.log(editForm);
                                if (editForm.hasClass('desc')) {
                                    editForm.removeClass('desc');
                                    $(this).html('Anuluj');
                                } else {
                                    $(this).html('Edytuj');
                                    editForm.addClass('desc');
                                }
                            })

                            //Wysyłanie zmian do bazy danych
                            var update = $('button.update');
                            update.on('click', function (e) {
                                e.preventDefault();
                                e.stopPropagation();

                                var newTitle = ($('input[name=newTitleForm]').val()).trim();
                                var newAuthor = ($('input[name=newAuthorForm]').val()).trim();
                                var newDescribe = ($('textarea[name=newDescribeForm]').val()).trim();
                                var idOfChange = ($(this).closest('div.title').attr('id')).trim();
                                if(!(newTitle.length<2)) {
                                    $.ajax({                            //UPDATE!!!!!!
                                        url: './api/test.php/',
                                        type: 'PUT',
                                        data: 'newId=' + idOfChange + '&newTitle=' + newTitle + '&newAuthor=' + newAuthor + '&newDescribe=' + newDescribe,
                                        success: function () {
                                            MTest();
                                        },
                                        error: function () {
                                            console.log('Wystąpił błądtuuuutaj.'); //to wyświetli się jak jest błąd
                                        },
                                        complete: function () {
                                            console.log('zakończono request'); //to jest wykonywane zawsze
                                        }
                                    });
                                }else{
                                    alert("Za krótki tytuł książki!!!");
                                }
                            })
                        },
                        error: function () {
                            console.log('Wystąpił błąd.'); //to wyświetli się jak jest błąd
                        },
                        complete: function () {
                            console.log('zakończono request'); //to jest wykonywane zawsze
                        }
                    });
                } else {
                    $(this).html('Szczegółów');    //zmiana napisu na przycisku
                    $(this).closest('div').find("div").addClass('desc');
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

    $('.add').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();

        //pobieranie danych z formularza
        var tytulForm = ($('input[name=tytulZform]').val()).trim();
        var autorForm = ($('input[name=autorZform]').val()).trim();
        var opisForm = ($('textarea[name=opisZform]').val()).trim();

        //wyświetlanie info w konsoli o dodanym obiekcie
        console.log("Wprowadzone dane do dodania:");
        console.log(tytulForm);
        console.log(autorForm);
        console.log(opisForm);

        if(!(tytulForm.length<2)) {
            //tworzenie obiektu i "ładowanie" do niego zmiennych
            dataToSend = {};
            dataToSend.tytul = tytulForm;
            dataToSend.autor = autorForm;
            dataToSend.opis = opisForm;

            $.ajax({
                url: './api/test.php',
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

            //czyszczenie pól formularza
            $('input[name=tytulZform]').val('');
            $('input[name=autorZform]').val('');
            $('textarea[name=opisZform]').val('');
        }else{
            alert("Za krótki tytuł książki!!!");
        }
    });
});