"use strict";

const CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
$.ajaxSetup({headers: {'X-CSRF-Token': CSRF_TOKEN}});

$(document).ready(function() {
    runInputmask();
    if ($('.select').length > 0) {
        $('.select').select2({
            minimumResultsForSearch: -1,
            width: '100%'
        });
    }
});

function runInputmask() {

    $('.inputmask-date').inputmask("date");
    $('.inputmask-time').inputmask("hh:mm");
    $('.inputmask-username').inputmask({regex:"[a-z0-9_-]+"});
    $('.inputmask-datetime').inputmask("datetime");
    $('.inputmask-whatsapp').inputmask("+2/09999999999",{ "escapeChar": "/"});
    $('.inputmask-phone').inputmask("9999999999999");
    $('.inputmask-identity').inputmask("99999999999999");
    $('.inputmask-taxpayer-id').inputmask("999999999");
    $('.inputmask-number').inputmask("9{0,}");
    $('.inputmask-postalcode').inputmask("99999");
    $('.inputmask-zipcode').inputmask("999999");
    $('.inputmask-email').inputmask("email");
    $('.inputmask-decimal').inputmask("decimal");
    $('.inputmask-currency').inputmask({alias : "currency", prefix: 'e£ '});
    $('.inputmask-ip').inputmask("999.999.999.999");
    $('.inputmask-card-number').inputmask("9999 9999 9999 9999");
    $('.inputmask-card-cvv').inputmask("999");
    $('.inputmask-card-date').inputmask("99/99");
    $('.inputmask-postive').inputmask('9{0,}', { min: 0});

}

Livewire.on('showAttendTypeModal', x => {
    $('#attendTypeModal').modal('show');
});
Livewire.on('hideAttendTypeModal', x => {
    $('#attendTypeModal').modal('hide');
});

Livewire.on('reloadPage', x => {
    location.reload();
});

$('body').on('hidden.bs.modal', '#attendTypeModal', function () {
    Livewire.emit('attendTypeModalHasBeenHidden');
});

function flosyFen(that){
    $(that).attr('disabled', true);
    let oldContent = $(that).html();
    $(that).html('<i class="fa fa-spinner fa-spin"></i>');
    let baseUrl = window.location.origin;
    $.ajax({
        url: baseUrl + '/my/recall-fawry',
        method: 'post',
        success: function (response) {
            console.log(response);
            Swal.fire({
                title: 'الفلوس في حسابك !',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'شكراً'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        },
        error: function (response) {
            console.log(response);
            Swal.fire({
                title: 'ملقناش فلوس ليك ! شوية كدا وجرب تاني',
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'تمام'
            });
        }
    }).always(function () {
        $(that).attr('disabled', false);
        $(that).html(oldContent);
    });
}
