$(function() {
    console.log("connected");

    var $afcStandingsName = $('.afc-standings-name');
    var $afcStandingsWins = $('.afc-standings-wins');
    var $afcStandingsLosses = $('.afc-standings-losses');
    var $afcStandingsTies = $('.afc-standings-ties');
    var $afcStandingsPercent = $('.afc-standings-percent');

    var $nfcStandingsName = $('.nfc-standings-name');
    var $nfcStandingsWins = $('.nfc-standings-wins');
    var $nfcStandingsLosses = $('.nfc-standings-losses');
    var $nfcStandingsTies = $('.nfc-standings-ties');
    var $nfcStandingsPercent = $('.nfc-standings-percent');

    function Team(city, name, stadium, skill) {
        this.city = city;
        this.name = name;
        this.stadium = stadium;
        this.skill = skill;
        this.wins = 0;
        this.losses = 0;
        this.ties = 0;
        this.totalPoints = 0;
        this.percent = function() {
            return this.wins / (this.wins + this.losses + this.ties)
        }
        this.standing = function() {
            return `${this.wins}:${this.losses}:${this.ties}`
        }
        this.score = function() {
            var points = Math.floor(Math.random() * (skill[Math.floor(Math.random() * 3)] * 3.5) + 12 + (skill[Math.floor(Math.random() * 3)] / 4));
            if (points == 1) {
                return points = 0;
            } else if (points == 4) {
                return points = 3
            } else {
                return points
            }
        }

    };


    //AFC CONFERENCE
    var patriots = new Team('New England', 'Patriots', 'Gilette Stadium', [7, 8, 10]);
    var dolphins = new Team('Miami', 'Dolphins', 'Hard Rock Stadium', [2, 3, 5]);
    var jets = new Team('New York', 'Jets', 'MetLife Stadium', [2, 4, 5]);
    var bills = new Team('Buffalo', 'Bills', 'New Era Field', [3, 4, 5]);

    var steelers = new Team('Pittsburgh', 'Steelers', 'Heinz Field', [7, 8, 9]);
    var browns = new Team('Cleveland', 'Browns', 'FirstEnergy Stadium', [1, 1, 1]);
    var bengals = new Team('Cincinatti', 'Bengals', 'Paul Brown Stadium', [2, 3, 4]);
    var ravens = new Team('Baltimore', 'Ravens', 'M&T Bank Stadium', [1, 3, 4]);

    var jaguars = new Team('Jacksonville', 'Jaguars', 'EverBank Field', [5, 6, 7]);
    var titans = new Team('Tennessee', 'Titans', 'Nissan Stadium', [3, 4, 4]);
    var colts = new Team('Indianapolis', 'Colts', 'Lucas Oil Stadium', [1, 2, 3]);
    var texans = new Team('Houston', 'Texans', 'NRG Stadium', [1, 2, 3]);

    var chiefs = new Team('Kansas City', 'Chiefs', 'Arrowhead Stadium', [5, 6, 7]);
    var raiders = new Team('Oakland', 'Raiders', 'Oakland Alameda Coliseum', [2, 3, 4]);
    var chargers = new Team('Los Angeles', 'Chargers', 'StubHub Center', [4, 5, 7]);
    var broncos = new Team('Denver', 'Broncos', 'Sports Authority Field at Mile High', [2, 3, 5]);

    var afcEast = [patriots, dolphins, jets, bills];
    var afcNorth = [steelers, browns, bengals, ravens];
    var afcSouth = [jaguars, titans, colts, texans];
    var afcWest = [chiefs, raiders, chargers, broncos];
    var afc = [afcEast, afcNorth, afcSouth, afcWest];

    //NFC CONFERENCE
    var giants = new Team('New York', 'Giants', 'MetLife Stadium', [2, 2, 3]);
    var cowboys = new Team('Dallas', 'Cowboys', 'Cowboys Stadium', [5, 6, 8]);
    var redskins = new Team('Washington', 'Redskins', 'FedEx Field', [3, 3, 6]);
    var eagles = new Team('Philadelphia', 'Eagles', 'Lincoln Financial Field', [7, 8, 10]);

    var packers = new Team('Green Bay', 'Packers', 'Lambeau Field', [5, 6, 7]);
    var bears = new Team('Chicago', 'Bears', 'Soldier Field', [1, 2, 3]);
    var vikings = new Team('Minnesota', 'Vikings', 'U.S. Bank Stadium', [7, 8, 8]);
    var lions = new Team('Detroit', 'Lions', 'Ford Field', [3, 4, 5]);

    var niners = new Team('San Francisco', '49ers', "Levi's Stadium", [4, 4, 5]);
    var seahawks = new Team('Seatle', 'Seahawks', 'CenturyLink Field', [5, 5, 8]);
    var rams = new Team('Los Angeles', 'Rams', 'Los Angeles Memorial Coliseum', [7, 7, 10]);
    var cardinals = new Team('Arizona', 'Cardinals', 'University of Phoenix Stadium', [1, 2, 3]);

    var buccaneers = new Team('Tampa Bay', 'Buccaneers', 'Raymond James Stadium', [2, 3, 5]);
    var falcons = new Team('Atlanta', 'Falcons', 'Mercedes-Benz Stadium', [6, 6, 7]);
    var panthers = new Team('Carolina', 'Panthers', 'Bank of America Stadium', [5, 6, 7]);
    var saints = new Team('New Orleans', 'Saints', 'Mercedes-Benz Superdome', [6, 7, 8]);

    var nfcEast = [giants, cowboys, redskins, eagles];
    var nfcNorth = [packers, bears, vikings, lions];
    var nfcSouth = [buccaneers, falcons, panthers, saints];
    var nfcWest = [niners, seahawks, rams, cardinals];
    var nfc = [nfcEast, nfcNorth, nfcSouth, nfcWest];




    //game logic and scheduling



    var game = function(home, away) {
        var homeScore = home.score() + 3; //homefield advantage
        var awayScore = away.score();
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
        return `${home.name}-${homeScore}:${away.name}-${awayScore}
    ${home.name} record: ${home.standing()} ... ${home.percent()}
    ${away.name} record: ${away.standing()} ... ${away.percent()}
    `
    };
    //SCHEDULE
    // var week1 = [
    //     game(afcWest[0], afcWest[1]),
    //     game(afcWest[2], afcWest[3]),
    //     game(afcSouth[0], afcSouth[1]),
    //     game(afcSouth[2], afcSouth[3]),
    //     game(afcNorth[0], afcNorth[1]),
    //     game(afcNorth[2], afcNorth[3]),
    //     game(afcEast[0], afcEast[1]),
    //     game(afcEast[2], afcEast[3]),
    //     game(nfcWest[0], nfcWest[1]),
    //     game(nfcWest[2], nfcWest[3]),
    //     game(nfcSouth[0], nfcSouth[1]),
    //     game(nfcSouth[2], nfcSouth[3]),
    //     game(nfcNorth[0], nfcNorth[1]),
    //     game(nfcNorth[2], nfcNorth[3]),
    //     game(nfcEast[0], nfcEast[1]),
    //     game(nfcEast[2], nfcEast[3]),
    // ];
    var gameday1 = function() {
        game(afcWest[0], afcWest[1]);
        game(afcWest[2], afcWest[3]);
        game(afcSouth[0], afcSouth[1]);
        game(afcSouth[2], afcSouth[3]);
        game(afcNorth[0], afcNorth[1]);
        game(afcNorth[2], afcNorth[3]);
        game(afcEast[0], afcEast[1]);
        game(afcEast[2], afcEast[3]);
        game(nfcWest[0], nfcWest[1]);
        game(nfcWest[2], nfcWest[3]);
        game(nfcSouth[0], nfcSouth[1]);
        game(nfcSouth[2], nfcSouth[3]);
        game(nfcNorth[0], nfcNorth[1]);
        game(nfcNorth[2], nfcNorth[3]);
        game(nfcEast[0], nfcEast[1]);
        game(nfcEast[2], nfcEast[3]);
        // console.log("heyyyy " + week1.map(function(x) {
        //     return x
        // }))
        renderStandings();
    };
    var gameday2 = function() {
        console.log(game(afcWest[3], afcWest[0]));
        console.log(game(afcWest[1], afcWest[2]));
        console.log(game(afcSouth[3], afcSouth[0]));
        console.log(game(afcSouth[1], afcSouth[2]));
        console.log(game(afcNorth[3], afcNorth[0]));
        console.log(game(afcNorth[1], afcNorth[2]));
        console.log(game(afcEast[3], afcEast[0]));
        console.log(game(afcEast[1], afcEast[2]));

        console.log(game(nfcWest[3], nfcWest[0]));
        console.log(game(nfcWest[1], nfcWest[2]));
        console.log(game(nfcSouth[3], nfcSouth[0]));
        console.log(game(nfcSouth[1], nfcSouth[2]));
        console.log(game(nfcNorth[3], nfcNorth[0]));
        console.log(game(nfcNorth[1], nfcNorth[2]));
        console.log(game(nfcEast[3], nfcEast[0]));
        console.log(game(nfcEast[1], nfcEast[2]));

        renderStandings();
    };
    var gameday3 = function() {
        console.log(game(afcWest[0], afcWest[2]));
        console.log(game(afcWest[1], afcWest[3]));
        console.log(game(afcSouth[0], afcSouth[2]));
        console.log(game(afcSouth[1], afcSouth[3]));
        console.log(game(afcNorth[0], afcNorth[2]));
        console.log(game(afcNorth[1], afcNorth[3]));
        console.log(game(afcEast[0], afcEast[2]));
        console.log(game(afcEast[1], afcEast[3]));

        console.log(game(nfcWest[0], nfcWest[2]));
        console.log(game(nfcWest[1], nfcWest[3]));
        console.log(game(nfcSouth[0], nfcSouth[2]));
        console.log(game(nfcSouth[1], nfcSouth[3]));
        console.log(game(nfcNorth[0], nfcNorth[2]));
        console.log(game(nfcNorth[1], nfcNorth[3]));
        console.log(game(nfcEast[0], nfcEast[2]));
        console.log(game(nfcEast[1], nfcEast[3]));
        renderStandings();
    };
    var gameday4 = function() {
        console.log(game(afcWest[2], afcWest[0]));
        console.log(game(afcWest[3], afcWest[1]));
        console.log(game(afcSouth[2], afcSouth[0]));
        console.log(game(afcSouth[3], afcSouth[1]));
        console.log(game(afcNorth[2], afcNorth[0]));
        console.log(game(afcNorth[3], afcNorth[1]));
        console.log(game(afcEast[2], afcEast[0]));
        console.log(game(afcEast[3], afcEast[1]));

        console.log(game(nfcWest[2], nfcWest[0]));
        console.log(game(nfcWest[3], nfcWest[1]));
        console.log(game(nfcSouth[2], nfcSouth[0]));
        console.log(game(nfcSouth[3], nfcSouth[1]));
        console.log(game(nfcNorth[2], nfcNorth[0]));
        console.log(game(nfcNorth[3], nfcNorth[1]));
        console.log(game(nfcEast[2], nfcEast[0]));
        console.log(game(nfcEast[3], nfcEast[1]));
        renderStandings();
    };
    var updateAFCStandings = function() {
        var afcEastByWins = afcEast.sort(function(a, b) {
            return b.percent - a.percent
        });
        var afcNorthByWins = afcNorth.sort(function(a, b) {
            return b.percent - a.percent
        })
        var afcSouthByWins = afcSouth.sort(function(a, b) {
            return b.percent - a.percent
        })
        var afcWestByWins = afcWest.sort(function(a, b) {
            return b.percent - a.percent
        })

        var afcByWins = [afcEastByWins, afcWestByWins, afcSouthByWins, afcNorthByWins];


        var afcStandingsByWins = [];
        afcByWins.map(function(x) {
            x.map(function(y) {
                return afcStandingsByWins.push(y);
            })
        });

        var afcStandingsByWins = afcStandingsByWins.sort(function(a, b) {
            return b.percent - a.percent
        })


        afcStandingsByWins.forEach(function(x) {
            $afcStandingsName.append($('<div>').addClass('standings-content').text(x.name));
            $afcStandingsWins.append($('<div>').addClass('standings-content').text(x.wins));
            $afcStandingsLosses.append($('<div>').addClass('standings-content').text(x.losses));
            $afcStandingsTies.append($('<div>').addClass('standings-content').text(x.ties));
            // $afcStandingsPercent.append($('<div>').addClass('standings-content').text(x.percent));

        });


    };
    var updateNFCStandings = function() {
        var nfcEastByWins = nfcEast.sort(function(a, b) {
            return b.percent - a.percent
        })
        var nfcNorthByWins = nfcNorth.sort(function(a, b) {
            return b.percent - a.percent
        })
        var nfcSouthByWins = nfcSouth.sort(function(a, b) {
            return b.percent - a.percent
        })
        var nfcWestByWins = nfcWest.sort(function(a, b) {
            return b.percent - a.percent
        })

        var nfcByWins = [nfcEastByWins, nfcWestByWins, nfcSouthByWins, nfcNorthByWins];

        var nfcStandingsByWins = [];
        nfcByWins.map(function(x) {
            x.map(function(y) {
                return nfcStandingsByWins.push(y);
            })
        });

        var nfcStandingsByWins = nfcStandingsByWins.sort(function(a, b) {
            return b.percent - a.percent
        })


        nfcStandingsByWins.forEach(function(x) {
            $nfcStandingsName.append($('<div>').addClass('standings-content').text(x.name));
            $nfcStandingsWins.append($('<div>').addClass('standings-content').text(x.wins));
            $nfcStandingsLosses.append($('<div>').addClass('standings-content').text(x.losses));
            $nfcStandingsTies.append($('<div>').addClass('standings-content').text(x.ties));
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
        $afcStandingsName.append($('<div>').addClass('standings-content').text('Team'));
        $afcStandingsWins.append($('<div>').addClass('standings-content').text('W'));
        $afcStandingsLosses.append($('<div>').addClass('standings-content').text('L'));
        $afcStandingsTies.append($('<div>').addClass('standings-content').text('T'));
        // $afcStandingsPercent.append($('<div>').addClass('standings-content').text('%'));
        $nfcStandingsName.append($('<div>').addClass('standings-content').text('Team'));
        $nfcStandingsWins.append($('<div>').addClass('standings-content').text('W'));
        $nfcStandingsLosses.append($('<div>').addClass('standings-content').text('L'));
        $nfcStandingsTies.append($('<div>').addClass('standings-content').text('T'));
        // $nfcStandingsPercent.append($('<div>').addClass('standings-content').text('%'));
    };
    var renderStandings = function() {
        emptyStandings();
        fillStandings();
        updateAFCStandings();
        updateNFCStandings();

    };

    renderStandings();
    $('.sim').eq(1).on('click', gameday1);
    $('.sim').eq(0).on('click', gameday2);
    $('.sim').eq(2).on('click', gameday3);
    $('.sim').eq(3).on('click', gameday4);


    // TRIVIA QUESTIONS

    // function Question(question, correct, wrong1, wrong2, wrong3) {
    //     this.question = question;
    //     this.correct = correct;
    //     this.wrong1 = wrong1;
    //     this.wrong2 = wrong2;
    //     this.wrong3 = wrong3;

    // };
    function Question(question, responses) {
        this.question = question;
        this.responses = responses;
    };


    //source for questions = *** http://www.nfl.com/m/superbowl/48/trivia ***
    var question1 = new Question(
        "What team won Super Bowl XLIII in the 2008 season?",
        "Pittsburgh Steelers",
        "Arizona Cardinals",
        "Indianapolis Colts",
        "New York Giants",
    )
    var question2 = new Question(
        "In Super Bowl XLII, this quarterback threw a record 48 pass attempts without an interception.",
        "Tom Brady",
        "Eli Manning",
        "Kurt Warner",
        "Terry Bradshaw",
    )
    var question3 = new Question(
        "What brothers won back-to-back Super Bowls in Super Bowl XLI and Super Bowl XLII?",
        "Peyton and Eli Manning",
        "Champ and Boss Bailey",
        "Ty and Koy Detmer",
        "Ronde and Tiki Barber",
    )
    var question4 = new Question(
        "This team, owned by Jerry Jones, holds the record for most Super Bowl MVPs.",
        "Dallas Cowboys",
        "Oakland Raiders",
        "Miami Dolphins",
        "Denver Broncos",
    )
    var question5 = new Question(
        "This team, in the same city as the NBA's Heat, holds the record for fewest points scored in a Super Bowl.",
        "Miami Dolphins",
        "Atlana Falcons",
        "Houston Texans",
        "Los Angeles Rams",
    )
    var question6 = new Question(
        "Which NFL player guaranteed his team would win Super Bowl III the week before the big game?",
        "Joe Namath",
        "Johnny Unitas",
        "Joe Louis",
        "Jeff Hostetler",
    )
    var question7 = new Question(
        "Which wide receiver is the all-time receiving yards leader",
        "Jerry Rice",
        "Chris Carter",
        "Ed 'Too Tall' Jones",
        "Jim Brown",
    )
    var question8 = new Question(
        "Which quarterback led the Buffalo Bills to 4 straight Super Bowl games?", [
            "Jim Kelly",
            "Jimmy Plunkett",
            "Brad Johnson",
            "Gus Frerotte"
        ]
    )

    var quiz = [
        question1,
        question2,
        question3,
        question4,
        question5,
        question6,
        question7,
        question8
    ]


    // function Question(question, responses) {
    //         this.question = question;
    //         this.responses = responses;
    //     };

    var punch = 7;

    function check() {
        if (punch == 7) {
            if (this.textContent = quiz[punch].responses[0]) {
                console.log('YAY')
            }
        }
    }

    function renderQuestions() {
        var randomIndexNumbers = [];
        var responseLength = quiz[punch].responses.length;
        for (i = responseLength - 1; i >= 0; i--) {
            randomIndexNumbers.push(Math.floor(Math.random() * responseLength));
        }
        console.log(responseLength)
        console.log(randomIndexNumbers)

        var $quizQuestion = $('#question').text(quiz[punch].question);
        var $quizA = $('#a').text(quiz[punch].responses[randomIndexNumbers[0]]);
        var $quizB = $('#b').text(quiz[punch].responses[randomIndexNumbers[1]]);
        var $quizC = $('#c').text(quiz[punch].responses[randomIndexNumbers[2]]);
        var $quizD = $('#d').text(quiz[punch].responses[randomIndexNumbers[3]]);
        $quizA.click(check);
        $quizC.click(check);

    }
    renderQuestions();











})
//