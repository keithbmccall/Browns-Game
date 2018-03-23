console.log("connected");

//game logic and scheduling
var $scores = $(".scores");

function game(home, away) {
    function renderCommandCenterScore() {
        var $cmdDiv = $("<div>").addClass(
            "scores-table standings scores-flex console-score"
        );
        $cmdDiv.append($("<p>").text(`${home.name}: ${homeScore}`));
        $cmdDiv.append($("<p>").text(`${away.name}: ${awayScore}`));
        $("#game-score").append($cmdDiv);
    }

    function winGreeting() {
        $(".greeting").text("YOU WON");
    }

    function loseGreeting() {
        $(".greeting").text("YOU LOST");
    }
    var homeScore = home.score() + 3; //homefield advantage
    var awayScore = away.score();
    if (home == browns) {
        home.totalPoints += homeScore;
        away.totalPoints += awayScore;
        if (homeScore == awayScore) {
            homeScore += Math.floor(Math.random() * 6);
            awayScore += Math.floor(Math.random() * 6);
            if (homeScore == awayScore) {
                home.ties++;
                away.ties++;
            } else if (homeScore > awayScore) {
                home.wins++;
                winGreeting();
                away.losses++;
            } else if (homeScore < awayScore) {
                home.losses++;
                loseGreeting();
                away.wins++;
            }
        } else if (homeScore > awayScore) {
            home.wins++;
            winGreeting();
            away.losses++;
        } else if (homeScore < awayScore) {
            home.losses++;
            loseGreeting();
            away.wins++;
        }
        renderCommandCenterScore();
    }
    if (away == browns) {
        home.totalPoints += homeScore;
        away.totalPoints += awayScore;
        if (homeScore == awayScore) {
            homeScore += Math.floor(Math.random() * 6);
            awayScore += Math.floor(Math.random() * 6);
            if (homeScore == awayScore) {
                home.ties++;
                away.ties++;
            } else if (homeScore > awayScore) {
                home.wins++;
                loseGreeting();
                away.losses++;
            } else if (homeScore < awayScore) {
                home.losses++;
                away.wins++;
                winGreeting();
            }
        } else if (homeScore > awayScore) {
            home.wins++;
            loseGreeting();
            away.losses++;
        } else if (homeScore < awayScore) {
            home.losses++;
            away.wins++;
            winGreeting();
        }
        renderCommandCenterScore();
    } else if (home != browns && away != browns) {
        home.totalPoints += homeScore;
        away.totalPoints += awayScore;
        if (homeScore == awayScore) {
            homeScore += Math.floor(Math.random() * 6);
            awayScore += Math.floor(Math.random() * 6);
            if (homeScore == awayScore) {
                home.ties++;
                away.ties++;
            } else if (homeScore > awayScore) {
                home.wins++;
                away.losses++;
            } else if (homeScore < awayScore) {
                home.losses++;
                away.wins++;
            }
        } else if (homeScore > awayScore) {
            home.wins++;
            away.losses++;
        } else if (homeScore < awayScore) {
            home.losses++;
            away.wins++;
        }
    }

    var $div = $("<div>").addClass("scores-table standings scores-flex");
    $div.append($("<p>").text(`${home.name}: ${homeScore}`));
    $div.append($("<p>").text(`${away.name}: ${awayScore}`));
    $scores.append($div);
}

var updateAFCStandings = function() {
    var afcEastByWins = afcEast.sort(function(a, b) {
        return b.wins - a.wins;
    });
    var afcNorthByWins = afcNorth.sort(function(a, b) {
        return b.wins - a.wins;
    });
    var afcSouthByWins = afcSouth.sort(function(a, b) {
        return b.wins - a.wins;
    });
    var afcWestByWins = afcWest.sort(function(a, b) {
        return b.wins - a.wins;
    });

    var afcByWins = [
        afcEastByWins,
        afcWestByWins,
        afcSouthByWins,
        afcNorthByWins
    ];

    var afcStandingsByWins = [];
    afcByWins.map(function(x) {
        x.map(function(y) {
            return afcStandingsByWins.push(y);
        });
    });

    var afcStandingsByWins = afcStandingsByWins.sort(function(a, b) {
        return b.wins - a.wins;
    });

    afcStandingsByWins.forEach(function(x) {
        $afcStandingsName.append(
            $("<div>")
                .addClass("standings-content")
                .text(x.name)
        );
        $afcStandingsWins.append(
            $("<div>")
                .addClass("standings-content")
                .text(x.wins)
        );
        $afcStandingsLosses.append(
            $("<div>")
                .addClass("standings-content")
                .text(x.losses)
        );
        $afcStandingsTies.append(
            $("<div>")
                .addClass("standings-content")
                .text(x.ties)
        );
        // $afcStandingsPercent.append($('<div>').addClass('standings-content').text(x.percent));
    });
};
var updateNFCStandings = function() {
    var nfcEastByWins = nfcEast.sort(function(a, b) {
        return b.wins - a.wins;
    });
    var nfcNorthByWins = nfcNorth.sort(function(a, b) {
        return b.wins - a.wins;
    });
    var nfcSouthByWins = nfcSouth.sort(function(a, b) {
        return b.wins - a.wins;
    });
    var nfcWestByWins = nfcWest.sort(function(a, b) {
        return b.wins - a.wins;
    });

    var nfcByWins = [
        nfcEastByWins,
        nfcWestByWins,
        nfcSouthByWins,
        nfcNorthByWins
    ];

    var nfcStandingsByWins = [];
    nfcByWins.map(function(x) {
        x.map(function(y) {
            return nfcStandingsByWins.push(y);
        });
    });

    var nfcStandingsByWins = nfcStandingsByWins.sort(function(a, b) {
        return b.wins - a.wins;
    });

    nfcStandingsByWins.forEach(function(x) {
        $nfcStandingsName.append(
            $("<div>")
                .addClass("standings-content")
                .text(x.name)
        );
        $nfcStandingsWins.append(
            $("<div>")
                .addClass("standings-content")
                .text(x.wins)
        );
        $nfcStandingsLosses.append(
            $("<div>")
                .addClass("standings-content")
                .text(x.losses)
        );
        $nfcStandingsTies.append(
            $("<div>")
                .addClass("standings-content")
                .text(x.ties)
        );
        // $nfcStandingsPercent.append($('<div>').addClass('standings-content').text(x.percent));
    });
};
var emptyStandings = function() {
    $afcStandingsName.empty();
    $afcStandingsWins.empty();
    $afcStandingsLosses.empty();
    $afcStandingsTies.empty();
    $afcStandingsPercent.empty();
    $nfcStandingsName.empty();
    $nfcStandingsWins.empty();
    $nfcStandingsLosses.empty();
    $nfcStandingsTies.empty();
    $nfcStandingsPercent.empty();
};
var fillStandings = function() {
    $afcStandingsName.append(
        $("<div>")
            .addClass("standings-content underline")
            .text("Team")
    );
    $afcStandingsWins.append(
        $("<div>")
            .addClass("standings-content underline")
            .text("W")
    );
    $afcStandingsLosses.append(
        $("<div>")
            .addClass("standings-content underline")
            .text("L")
    );
    $afcStandingsTies.append(
        $("<div>")
            .addClass("standings-content underline")
            .text("T")
    );
    $nfcStandingsName.append(
        $("<div>")
            .addClass("standings-content underline")
            .text("Team")
    );
    $nfcStandingsWins.append(
        $("<div>")
            .addClass("standings-content underline")
            .text("W")
    );
    $nfcStandingsLosses.append(
        $("<div>")
            .addClass("standings-content underline")
            .text("L")
    );
    $nfcStandingsTies.append(
        $("<div>")
            .addClass("standings-content underline")
            .text("T")
    );
};
var renderStandings = function() {
    emptyStandings();
    fillStandings();
    updateAFCStandings();
    updateNFCStandings();
};

renderStandings();

//TRIVIA SETUP
var questionIndex = 0;
var $quizD = $("#d");
var $quizC = $("#c");
var $quizB = $("#b");
var $quizA = $("#a");
var $quizQuestion = $("#question");
var $week = $("#week-declaration");

var correctAnswerTally = 0;
var setSkillUp = function() {
    browns.score = function() {
        return 45;
    };

    $(".greeting").text("CORRECT ANSWER");
};
var setSkillDown = function() {
    browns.score = function() {
        return 12;
    };
    $(".greeting").text("WRONG ANSWER");
};

var check = function() {
    $("#results-button").off("click", revealResults);
    if (this.textContent == quiz[questionIndex].correct) {
        console.log("GOOD");
        console.log(correctAnswerTally++);
        setSkillUp();
    } else {
        console.log("NOPE");
        setSkillDown();
    }

    setTimeout(revealCommandCenter, 500);
};
var renderQuestion = function() {
    $week.text(gameTextArray[questionIndex]);
    $quizQuestion.text(quiz[questionIndex].question);
    $quizA.text(quiz[questionIndex].responses[0]).click(check);
    $quizB.text(quiz[questionIndex].responses[1]).click(check);
    $quizC.text(quiz[questionIndex].responses[2]).click(check);
    $quizD.text(quiz[questionIndex].responses[3]).click(check);
};
renderQuestion();

///////////////////////////////
//////////////////////////////
//PAGE FUNCTIONALITY
var congratulations = function() {
    $("#winning-audio").trigger("play");
    var $congratsStats = $("#congrats-stats");
    var $div = $("<div>").addClass(
        "scores-table standings scores-flex console-score centered"
    );
    $div.append(
        $("<p>").text(
            `FINAL RECORD: ${browns.wins}:${browns.losses}:${browns.ties}`
        )
    );
    $div.append($("<p>").text(`TOTAL POINTS: ${browns.totalPoints}`));
    $congratsStats.append($div);
    $("#congratulations").removeClass("hide");
};
var youLost = function() {
    $("#losing-audio").trigger("play");
    var $loserStats = $("#loser-stats");
    var $div = $("<div>").addClass(
        "scores-table standings scores-flex console-score centered"
    );
    $div.append(
        $("<p>").text(
            `FINAL RECORD: ${browns.wins}:${browns.losses}:${browns.ties}`
        )
    );
    $div.append($("<p>").text(`TOTAL POINTS: ${browns.totalPoints}`));
    $loserStats.append($div);
    $("#loser").removeClass("hide");
};
var renderPlayoffs = function() {
    var afcEastByWins = afcEast.sort(function(a, b) {
        return b.wins - a.wins;
    });
    var afcNorthByWins = afcNorth.sort(function(a, b) {
        return b.wins - a.wins;
    });
    var afcSouthByWins = afcSouth.sort(function(a, b) {
        return b.wins - a.wins;
    });
    var afcWestByWins = afcWest.sort(function(a, b) {
        return b.wins - a.wins;
    });

    var afcByWins = [
        afcEastByWins,
        afcWestByWins,
        afcSouthByWins,
        afcNorthByWins
    ];

    var afcStandingsByWins = [];
    afcByWins.map(function(x) {
        x.map(function(y) {
            return afcStandingsByWins.push(y);
        });
    });

    var afcStandingsByWins = afcStandingsByWins.sort(function(a, b) {
        return b.wins - a.wins;
    });

    // WINCONDITION
    var afcPlayoffs = [];
    for (i = 0; i < 6; i++) {
        afcPlayoffs.push(afcStandingsByWins.shift());
    }

    if (afcPlayoffs.indexOf(browns) >= 0) {
        congratulations();
    } else {
        youLost();
    }
};
var nextweek = function() {
    $("#sim-week").off("click", schedule[questionIndex]);
    $("#results-button").click(revealResults);
};

function revealResults() {
    $("#console-container").addClass("hide");
    $("#main-container").removeClass("hide");
}

function revealQuiz() {
    questionIndex++;
    $("#sim-week").click(schedule[questionIndex]);
    if (questionIndex == 16) {
        $("#sim-week").off("click", schedule[questionIndex]);
        renderPlayoffs();
        $("#main-container").addClass("hide");
    } else {
        renderQuestion();
        $("#game-score").empty();
        $("#main-container").addClass("hide");
        $("#quiz-modal").removeClass("hide");
    }
}

function revealCommandCenter() {
    $("#console-container").removeClass("hide");
    $("#quiz-modal").addClass("hide");
}

function openQuiz() {
    $("#quiz-modal").removeClass("hide");
    $("#landing").addClass("hide");
}

function init() {
    $("#sim-week").click(schedule[questionIndex]);
    $("#sim-week").click(nextweek);
    $("#quiz-button").click(revealQuiz);
    $("#home-button").click(openQuiz);
    $(".try-again").click(function() {
        location.reload();
    });
}
init();

//
