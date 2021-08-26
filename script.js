let exponent;
let value;
let beginTime;
let endTime;

function getEquation() {
    return `2<sup>${exponent}</sup> = <span class='rhs'>${value}</span>`;
}

function nextItem() {
    if (exponent >= 0) {
        let nextItem = $("<div></div>").addClass("item").html(getEquation());
        $('#sequence').append(nextItem);
    }
    exponent += 1;
    value *= 2;
    $('#prompt sup').text(exponent);
    $('#userAnswer').val("");
    $('#userAnswer').focus();
    $(document).scrollTop($(document).height());
   }


function reset() {
    exponent = -1;
    value = 0.5;
    $("#err, #result").hide();
    $('#sequence').empty();
    $('#userAnswer').prop("disabled", false);
    nextItem();
}

function checkAnswer(n) {
    if (n == value) {
        if (n == 1) {
            beginTime = Date.now();
        } else {
            endTime = Date.now();
        }
        nextItem();
    } else {
        $('#userAnswer').prop("disabled", true);
        totalTime = ((endTime- beginTime)/ 1000).toFixed(1);
        if (exponent > 0) {
            let ies = exponent > 1 ? 'ies' : 'y';
            $('#result .msg').html(`You got ${exponent} entr${ies} correct in ${totalTime}s.`);
        }
        else
            $('#result .msg').html("You got 0 entries correct.");
        $('#result').show();
        $('#err .msg').html(getEquation());
        $('#err').show();
	$(document).scrollTop($(document).height());
    }
}

$( document ).ready(() => {
    
    reset();

    $('#userAnswer').keypress((e) => {
        let key = e.which;
        if(key == 13) {
            let entered = $('#userAnswer').val();
            if (entered) {
                let ans = parseInt(entered);
                checkAnswer(ans);
            }
        } else if (key < 48 || key > 57) {
            return false;
        }
    })

    $('#again button').click(() => {
        reset();
    })


});
