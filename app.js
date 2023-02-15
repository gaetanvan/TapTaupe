$(document).ready(function(){
    $("img[class^='taupe']").hide()
    let points = 0
    let timer = 30
    let scoreArray = []
    let name
    let score
    let inter
    let timerCount
    let number
    let difficultyChoice = 'Easy'

    let difficulty = {
        Easy: {
            timer: 30,
            interval : 1500
        },
        Normal: {
            timer: 20,
            interval : 1100
        },
        Hard: {
            timer: 10,
            interval : 700
        }
    }

    $(".points").text(points)
    $(".timer").text(timer)
    console.log($(".taupe"))
    console.log(difficulty[difficultyChoice].timer)

    $('.difficultyChoice > label').click(function (e) {
        difficultyChoice = e.target.textContent
        console.log(difficulty[difficultyChoice].timer)
        timer = difficulty[difficultyChoice].timer
        $(".timer").text(timer)
    })


    function getScore(){
        for (i = 0; i < localStorage.length; i++){
            name = localStorage.key(i)
            score = localStorage.getItem(name)

            scoreArray.push({name: name, score: score})
            scoreArray.sort(function (a, b) {
                return a.score - b.score;
            }).reverse()
        }
        for (e= 0; e < scoreArray.length; e++){
            console.log(scoreArray[e])

            $( ".playerScore" ).append( '<tr class="removeScore">' +
                                                '<td>'+ scoreArray[e].name +'</td>' +
                                                ' <td>'+ scoreArray[e].score +'</td>' +
                                                '</tr>' );
        }
    }

    function stop(){
        timer--;
        $(".timer").text(timer)
        clearInterval(inter)
        clearInterval(timerCount)
        $("img[class^='taupe']").hide()
        timer = difficulty[difficultyChoice].timer


        localStorage.setItem(name, $('.points').text())
        $(".playerScore").data(name, $('.points').text())

        $(".removeScore").remove()
        scoreArray = []
        getScore()
        return;
    }
    getScore()

    $('.btnStart').click(function () {
        name = $('.name').val()
        console.log(name)
        timer = difficulty[difficultyChoice].timer
        points = 0
        $(".timer").text(timer)
        $(".points").text(points)
        number = 1 + Math.floor(Math.random() * 9)
        $("img[class^='taupe']").eq(number).show()

        inter = setInterval(function() {
                $("img[class^='taupe']").eq(number).hide('slow')
                number = 1 + Math.floor(Math.random() * 9);
                $("img[class^='taupe']").eq(number).show('slow')
            },
            difficulty[difficultyChoice].interval);

        timerCount = setInterval(function () {
            timer --
          $(".timer").text(timer)
        },1000)

        setTimeout(stop, (difficulty[difficultyChoice].timer * 1000))
    })

    $("img[style!='display:none']").click(function (e) {
        e.preventDefault()
        console.log(points)
        points ++
        $(".points").text(points)
        $("img[class^='taupe']").eq(number).hide()
    })
});