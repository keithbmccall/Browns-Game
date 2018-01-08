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
var $scores = $('.scores');




function game(home, away) {
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


    var $div = $('<div>').addClass('scores-table standings scores-flex');
    $div.append($('<p>').text(`${home.name}: ${homeScore}`));
    $div.append($('<p>').text(`${away.name}: ${awayScore}`));
    $scores.append($div)


};

//SCHEDULE

var gameday1 = function() {
    $scores.empty();
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

    renderStandings();
    console.log('week1')
};
var gameday2 = function() {
    $scores.empty();
    game(afcWest[3], afcWest[0]);
    game(afcWest[1], afcWest[2]);
    game(afcSouth[3], afcSouth[0]);
    game(afcSouth[1], afcSouth[2]);
    game(afcNorth[3], afcNorth[0]);
    game(afcNorth[1], afcNorth[2]);
    game(afcEast[3], afcEast[0]);
    game(afcEast[1], afcEast[2]);

    game(nfcWest[3], nfcWest[0]);
    game(nfcWest[1], nfcWest[2]);
    game(nfcSouth[3], nfcSouth[0]);
    game(nfcSouth[1], nfcSouth[2]);
    game(nfcNorth[3], nfcNorth[0]);
    game(nfcNorth[1], nfcNorth[2]);
    game(nfcEast[3], nfcEast[0]);
    game(nfcEast[1], nfcEast[2]);

    renderStandings();
    console.log('week2')
};
var gameday3 = function() {
    $scores.empty();
    game(afcWest[0], afcWest[2]);
    game(afcWest[1], afcWest[3]);
    game(afcSouth[0], afcSouth[2]);
    game(afcSouth[1], afcSouth[3]);
    game(afcNorth[0], afcNorth[2]);
    game(afcNorth[1], afcNorth[3]);
    game(afcEast[0], afcEast[2]);
    game(afcEast[1], afcEast[3]);

    game(nfcWest[0], nfcWest[2]);
    game(nfcWest[1], nfcWest[3]);
    game(nfcSouth[0], nfcSouth[2]);
    game(nfcSouth[1], nfcSouth[3]);
    game(nfcNorth[0], nfcNorth[2]);
    game(nfcNorth[1], nfcNorth[3]);
    game(nfcEast[0], nfcEast[2]);
    game(nfcEast[1], nfcEast[3]);
    renderStandings();
    console.log('week3')
};
var gameday4 = function() {
    $scores.empty();
    game(afcWest[2], afcWest[0]);
    game(afcWest[3], afcWest[1]);
    game(afcSouth[2], afcSouth[0]);
    game(afcSouth[3], afcSouth[1]);
    game(afcNorth[2], afcNorth[0]);
    game(afcNorth[3], afcNorth[1]);
    game(afcEast[2], afcEast[0]);
    game(afcEast[3], afcEast[1]);

    game(nfcWest[2], nfcWest[0]);
    game(nfcWest[3], nfcWest[1]);
    game(nfcSouth[2], nfcSouth[0]);
    game(nfcSouth[3], nfcSouth[1]);
    game(nfcNorth[2], nfcNorth[0]);
    game(nfcNorth[3], nfcNorth[1]);
    game(nfcEast[2], nfcEast[0]);
    game(nfcEast[3], nfcEast[1]);
    renderStandings();
    console.log('week4')
};
var gameday5 = function() {
    $scores.empty();
    game(afcWest[0], afcEast[0]);
    game(afcWest[1], afcEast[1]);
    game(afcWest[2], afcEast[2]);
    game(afcWest[3], afcEast[3]);
    game(afcNorth[0], afcSouth[0]);
    game(afcNorth[1], afcSouth[1]);
    game(afcNorth[2], afcSouth[2]);
    game(afcNorth[3], afcSouth[3]);

    game(nfcWest[0], nfcEast[0]);
    game(nfcWest[1], nfcEast[1]);
    game(nfcWest[2], nfcEast[2]);
    game(nfcWest[3], nfcEast[3]);
    game(nfcNorth[0], nfcSouth[0]);
    game(nfcNorth[1], nfcSouth[1]);
    game(nfcNorth[2], nfcSouth[2]);
    game(nfcNorth[3], nfcSouth[3]);
    renderStandings();
    console.log('week5')
}
var gameday6 = function() {
    $scores.empty();
    game(afcSouth[0], afcEast[0]);
    game(afcSouth[1], afcEast[1]);
    game(afcSouth[2], afcEast[2]);
    game(afcSouth[3], afcEast[3]);
    game(afcNorth[0], afcWest[0]);
    game(afcNorth[1], afcWest[1]);
    game(afcNorth[2], afcWest[2]);
    game(afcNorth[3], afcWest[3]);

    game(nfcSouth[0], nfcEast[0]);
    game(nfcSouth[1], nfcEast[1]);
    game(nfcSouth[2], nfcEast[2]);
    game(nfcSouth[3], nfcEast[3]);
    game(nfcNorth[0], nfcWest[0]);
    game(nfcNorth[1], nfcWest[1]);
    game(nfcNorth[2], nfcWest[2]);
    game(nfcNorth[3], nfcWest[3]);
    renderStandings();
    console.log('week6')
}
var gameday7 = function() {
    $scores.empty();
    game(afcWest[0], afcSouth[0]);
    game(afcWest[1], afcSouth[1]);
    game(afcWest[2], afcSouth[2]);
    game(afcWest[3], afcSouth[3]);
    game(afcEast[0], afcNorth[0]);
    game(afcEast[1], afcNorth[1]);
    game(afcEast[2], afcNorth[2]);
    game(afcEast[3], afcNorth[3]);

    game(nfcWest[0], nfcSouth[0]);
    game(nfcWest[1], nfcSouth[1]);
    game(nfcWest[2], nfcSouth[2]);
    game(nfcWest[3], nfcSouth[3]);
    game(nfcEast[0], nfcNorth[0]);
    game(nfcEast[1], nfcNorth[1]);
    game(nfcEast[2], nfcNorth[2]);
    game(nfcEast[3], nfcNorth[3]);

    renderStandings();
    console.log('week7')
}
var gameday8 = function() {
    $scores.empty();
    game(afcWest[0], nfcWest[0]);
    game(afcWest[1], nfcWest[1]);
    game(afcWest[2], nfcWest[2]);
    game(afcWest[3], nfcWest[3]);
    game(afcNorth[0], nfcNorth[0]);
    game(afcNorth[1], nfcNorth[1]);
    game(afcNorth[2], nfcNorth[2]);
    game(afcNorth[3], nfcNorth[3]);

    game(afcEast[0], nfcEast[0]);
    game(afcEast[1], nfcEast[1]);
    game(afcEast[2], nfcEast[2]);
    game(afcEast[3], nfcEast[3]);
    game(afcSouth[0], nfcSouth[0]);
    game(afcSouth[1], nfcSouth[1]);
    game(afcSouth[2], nfcSouth[2]);
    game(afcSouth[3], nfcSouth[3]);
    renderStandings();
    console.log('week8')
}
var gameday9 = function() {
    $scores.empty();
    game(afcWest[0], nfcWest[1]);
    game(afcWest[1], nfcWest[2]);
    game(afcWest[2], nfcWest[3]);
    game(afcWest[3], nfcWest[0]);
    game(afcNorth[0], nfcNorth[1]);
    game(afcNorth[1], nfcNorth[2]);
    game(afcNorth[2], nfcNorth[3]);
    game(afcNorth[3], nfcNorth[0]);

    game(afcEast[0], nfcEast[1]);
    game(afcEast[1], nfcEast[2]);
    game(afcEast[2], nfcEast[3]);
    game(afcEast[3], nfcEast[0]);
    game(afcSouth[0], nfcSouth[1]);
    game(afcSouth[1], nfcSouth[2]);
    game(afcSouth[2], nfcSouth[3]);
    game(afcSouth[3], nfcSouth[0]);
    renderStandings();
    console.log('week9')
}
var gameday10 = function() {
    $scores.empty();
    game(nfcWest[2], afcWest[0]);
    game(nfcWest[3], afcWest[1]);
    game(nfcWest[0], afcWest[2]);
    game(nfcWest[1], afcWest[3]);
    game(nfcNorth[2], afcNorth[0]);
    game(nfcNorth[3], afcNorth[1]);
    game(nfcNorth[0], afcNorth[2]);
    game(nfcNorth[1], afcNorth[3]);

    game(nfcEast[2], afcEast[0]);
    game(nfcEast[3], afcEast[1]);
    game(nfcEast[0], afcEast[2]);
    game(nfcEast[1], afcEast[3]);
    game(nfcSouth[2], afcSouth[0]);
    game(nfcSouth[3], afcSouth[1]);
    game(nfcSouth[0], afcSouth[2]);
    game(nfcSouth[1], afcSouth[3]);
    renderStandings();
    console.log('week10')
}
var gameday11 = function() {
    $scores.empty();
    game(nfcWest[3], afcWest[0]);
    game(nfcWest[0], afcWest[1]);
    game(nfcWest[1], afcWest[2]);
    game(nfcWest[2], afcWest[3]);
    game(nfcNorth[3], afcNorth[0]);
    game(nfcNorth[0], afcNorth[1]);
    game(nfcNorth[1], afcNorth[2]);
    game(nfcNorth[2], afcNorth[3]);

    game(nfcEast[3], afcEast[0]);
    game(nfcEast[0], afcEast[1]);
    game(nfcEast[1], afcEast[2]);
    game(nfcEast[2], afcEast[3]);
    game(nfcSouth[3], afcSouth[0]);
    game(nfcSouth[0], afcSouth[1]);
    game(nfcSouth[1], afcSouth[2]);
    game(nfcSouth[2], afcSouth[3]);
    renderStandings();
    console.log('week11')
}
var gameday12 = function() {
    $scores.empty();
    game(afcWest[0], afcEast[1]);
    game(afcWest[1], afcEast[2]);
    game(afcWest[2], afcEast[3]);
    game(afcWest[3], afcEast[0]);
    game(afcNorth[0], afcSouth[1]);
    game(afcNorth[1], afcSouth[2]);
    game(afcNorth[2], afcSouth[3]);
    game(afcNorth[3], afcSouth[0]);

    game(nfcWest[0], nfcEast[1]);
    game(nfcWest[1], nfcEast[2]);
    game(nfcWest[2], nfcEast[3]);
    game(nfcWest[3], nfcEast[0]);
    game(nfcNorth[0], nfcSouth[1]);
    game(nfcNorth[1], nfcSouth[2]);
    game(nfcNorth[2], nfcSouth[3]);
    game(nfcNorth[3], nfcSouth[0]);

    renderStandings();
    console.log('week12')
}
var gameday13 = function() {
    $scores.empty();
    game(afcEast[2], afcWest[0]);
    game(afcEast[3], afcWest[1]);
    game(afcEast[0], afcWest[2]);
    game(afcEast[1], afcWest[3]);
    game(afcSouth[2], afcNorth[0]);
    game(afcSouth[3], afcNorth[1]);
    game(afcSouth[0], afcNorth[2]);
    game(afcSouth[1], afcNorth[3]);

    game(nfcEast[2], nfcWest[0]);
    game(nfcEast[3], nfcWest[1]);
    game(nfcEast[0], nfcWest[2]);
    game(nfcEast[1], nfcWest[3]);
    game(nfcSouth[2], nfcNorth[0]);
    game(nfcSouth[3], nfcNorth[1]);
    game(nfcSouth[0], nfcNorth[2]);
    game(nfcSouth[1], nfcNorth[3]);

    renderStandings();
    console.log('week13')
}
var gameday14 = function() {
    $scores.empty();
    game(afcEast[3], afcWest[0]);
    game(afcEast[0], afcWest[1]);
    game(afcEast[1], afcWest[2]);
    game(afcEast[2], afcWest[3]);
    game(afcSouth[3], afcNorth[0]);
    game(afcSouth[0], afcNorth[1]);
    game(afcSouth[1], afcNorth[2]);
    game(afcSouth[2], afcNorth[3]);

    game(nfcEast[3], nfcWest[0]);
    game(nfcEast[0], nfcWest[1]);
    game(nfcEast[1], nfcWest[2]);
    game(nfcEast[2], nfcWest[3]);
    game(nfcSouth[3], nfcNorth[0]);
    game(nfcSouth[0], nfcNorth[1]);
    game(nfcSouth[1], nfcNorth[2]);
    game(nfcSouth[2], nfcNorth[3]);

    renderStandings();
    console.log('week14')
}
var gameday15 = function() {
    $scores.empty();
    game(afcWest[1], afcWest[0]);
    game(afcWest[3], afcWest[2]);
    game(afcSouth[1], afcSouth[0]);
    game(afcSouth[3], afcSouth[2]);
    game(afcNorth[1], afcNorth[0]);
    game(afcNorth[3], afcNorth[2]);
    game(afcEast[1], afcEast[0]);
    game(afcEast[3], afcEast[2]);
    game(nfcWest[1], nfcWest[0]);
    game(nfcWest[3], nfcWest[2]);
    game(nfcSouth[1], nfcSouth[0]);
    game(nfcSouth[3], nfcSouth[2]);
    game(nfcNorth[1], nfcNorth[0]);
    game(nfcNorth[3], nfcNorth[2]);
    game(nfcEast[1], nfcEast[0]);
    game(nfcEast[3], nfcEast[2]);

    renderStandings();
    console.log('week15')
}
var gameday16 = function() {
    $scores.empty();
    game(afcWest[0], afcWest[3]);
    game(afcWest[2], afcWest[1]);
    game(afcSouth[0], afcSouth[3]);
    game(afcSouth[2], afcSouth[1]);
    game(afcNorth[0], afcNorth[3]);
    game(afcNorth[2], afcNorth[1]);
    game(afcEast[0], afcEast[3]);
    game(afcEast[2], afcEast[1]);

    game(nfcWest[0], nfcWest[3]);
    game(nfcWest[2], nfcWest[1]);
    game(nfcSouth[0], nfcSouth[3]);
    game(nfcSouth[2], nfcSouth[1]);
    game(nfcNorth[0], nfcNorth[3]);
    game(nfcNorth[2], nfcNorth[1]);
    game(nfcEast[0], nfcEast[3]);
    game(nfcEast[2], nfcEast[1]);

    renderStandings();
    console.log('week16')
}
var schedule = [
    gameday1,
    gameday2,
    gameday3,
    gameday4,
    gameday5,
    gameday6,
    gameday7,
    gameday8,
    gameday9,
    gameday10,
    gameday11,
    gameday12,
    gameday13,
    gameday14,
    gameday15,
    gameday16
]
var updateAFCStandings = function() {
    var afcEastByWins = afcEast.sort(function(a, b) {
        return b.wins - a.wins
    });
    var afcNorthByWins = afcNorth.sort(function(a, b) {
        return b.wins - a.wins
    })
    var afcSouthByWins = afcSouth.sort(function(a, b) {
        return b.wins - a.wins
    })
    var afcWestByWins = afcWest.sort(function(a, b) {
        return b.wins - a.wins
    })

    var afcByWins = [afcEastByWins, afcWestByWins, afcSouthByWins, afcNorthByWins];


    var afcStandingsByWins = [];
    afcByWins.map(function(x) {
        x.map(function(y) {
            return afcStandingsByWins.push(y);
        })
    });

    var afcStandingsByWins = afcStandingsByWins.sort(function(a, b) {
        return b.wins - a.wins
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
        return b.wins - a.wins
    })
    var nfcNorthByWins = nfcNorth.sort(function(a, b) {
        return b.wins - a.wins
    })
    var nfcSouthByWins = nfcSouth.sort(function(a, b) {
        return b.wins - a.wins
    })
    var nfcWestByWins = nfcWest.sort(function(a, b) {
        return b.wins - a.wins
    })

    var nfcByWins = [nfcEastByWins, nfcWestByWins, nfcSouthByWins, nfcNorthByWins];

    var nfcStandingsByWins = [];
    nfcByWins.map(function(x) {
        x.map(function(y) {
            return nfcStandingsByWins.push(y);
        })
    });

    var nfcStandingsByWins = nfcStandingsByWins.sort(function(a, b) {
        return b.wins - a.wins
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
    $afcStandingsName.append($('<div>').addClass('standings-content underline').text('Team'));
    $afcStandingsWins.append($('<div>').addClass('standings-content underline').text('W'));
    $afcStandingsLosses.append($('<div>').addClass('standings-content underline').text('L'));
    $afcStandingsTies.append($('<div>').addClass('standings-content underline').text('T'));
    $nfcStandingsName.append($('<div>').addClass('standings-content underline').text('Team'));
    $nfcStandingsWins.append($('<div>').addClass('standings-content underline').text('W'));
    $nfcStandingsLosses.append($('<div>').addClass('standings-content underline').text('L'));
    $nfcStandingsTies.append($('<div>').addClass('standings-content underline').text('T'));
};
var renderStandings = function() {
    emptyStandings();
    fillStandings();
    updateAFCStandings();
    updateNFCStandings();

};

renderStandings();


// TRIVIA QUESTIONS

function Question(question, responses, correct) {
    this.question = question;
    this.responses = responses;
    this.correct = correct;
};

//source for questions = *** http://www.nfl.com/m/superbowl/48/trivia ***
var question1 = new Question(
    "What team won Super Bowl XLIII in the 2008 season?", [
        "Arizona Cardinals",
        "Indianapolis Colts",
        "New York Giants",
        "Pittsburgh Steelers", //correct
    ],
    "Pittsburgh Steelers"
)
var question2 = new Question(
    "In Super Bowl XLII, this quarterback threw a record 48 pass attempts without an interception.", [
        "Tom Brady", //correct
        "Eli Manning",
        "Kurt Warner",
        "Terry Bradshaw"
    ], "Tom Brady"
)
var question3 = new Question(
    "What brothers won back-to-back Super Bowls in Super Bowl XLI and Super Bowl XLII?", [
        "Champ and Boss Bailey",
        "Ty and Koy Detmer",
        "Ronde and Tiki Barber",
        "Peyton and Eli Manning", //correct
    ], "Peyton and Eli Manning"
)
var question4 = new Question(
    "This team, owned by Jerry Jones, holds the record for most Super Bowl MVPs.", [
        "Oakland Raiders",
        "Miami Dolphins",
        "Dallas Cowboys", //correct
        "Denver Broncos"
    ], "Dallas Cowboys"
)
var question5 = new Question(
    "This team, in the same city as the NBA's Heat, holds the record for fewest points scored in a Super Bowl.", [
        "Atlana Falcons",
        "Houston Texans",
        "Los Angeles Rams",
        "Miami Dolphins", //correct
    ], "Miami Dolphins"
)
var question6 = new Question(
    "Which NFL player guaranteed his team would win Super Bowl III the week before the big game?", [
        "Joe Namath", //correct
        "Johnny Unitas",
        "Joe Louis",
        "Jeff Hostetler"
    ], "Joe Namath"
)
var question7 = new Question(
    "Which wide receiver is the all-time receiving yards leader?", [
        "Jerry Rice", //correct
        "Chris Carter",
        "Ed 'Too Tall' Jones",
        "Jim Brown"
    ], "Jerry Rice"
)
var question8 = new Question(
    "Which quarterback led the Buffalo Bills to 4 straight Super Bowl games?", [
        "Jimmy Plunkett",
        "Jim Kelly", //correct
        "Brad Johnson",
        "Gus Frerotte"
    ], "Jim Kelly"
)
var question9 = new Question(
    "Which team has never called Los Angeles home?", [
        "Rams",
        "Raiders",
        "Chargers",
        "Chiefs" //correct
    ], "Chiefs"
)
var question10 = new Question(
    "Which team won the first Super Bowl?", [
        "Green Bay Packers", //correct
        "Kansas City Chiefs",
        "New York Giants",
        "Dallas Cowboys"
    ], "Green Bay Packers"
)
var question11 = new Question(
    "In 2005, Tom Brady led the New England Patriots to their second straight Super Bowl title. What was the last team to win back-to-back Super Bowls?", [
        "Pittsburgh Steelers",
        "Denver Broncos", //correct
        "San Francisco 49ers",
        "Seattle Seahawks"
    ], "Denver Broncos"
)
var question12 = new Question(
    "How many NFL teams are named after cats?", [
        "Five",
        "Six",
        "Four", //correct
        "Three"
    ], "Four"
)
var question13 = new Question(
    "Who was the only player to rush for 2,000 yards when the NFL played a 14 game season?", [
        "Tony Dorsett",
        "O.J. Simpson", //correct
        "Barry Sanders",
        "Jim Brown"
    ], "O.J. Simpson"
)
var question14 = new Question(
    "In 1999, I retired with 47 game-tying or game-winning fourth quarter drives in my career. Who am I?", [
        "Dan Marino",
        "Brett Favre",
        "John Elway", //correct
        "Joe Montana"
    ], "John Elway"
)
var question15 = new Question(
    "Emmitt Smith is the NFL's all-time leading rusher with 18,355 career yards. Who is second?", [
        "Walter Peyton", //correct
        "Barry Sanders",
        "Marshall Faulk",
        "Eric Dickerson"
    ], "Walter Peyton"
)
var question16 = new Question(
    "Who holds the record for the longest field goal in NFL history?", [
        "Jason Elam",
        "Sebastian Janikowski",
        "Tony Dempsey",
        "Matt Prater" //correct
    ],
    "Matt Prater"
)

var quiz = [
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
    question11,
    question12,
    question13,
    question14,
    question15,
    question16
]
var gameTextArray = [
    "GAME 1",
    "GAME 2",
    "GAME 3",
    "GAME 4",
    "GAME 5",
    "GAME 6",
    "GAME 7",
    "GAME 8",
    "GAME 9",
    "GAME 10",
    "GAME 11",
    "GAME 12",
    "GAME 13",
    "GAME 14",
    "GAME 15",
    "GAME 16"
]

//TRIVIA SETUP
var questionIndex = 0;
var $quizD = $('#d');
var $quizC = $('#c');
var $quizB = $('#b');
var $quizA = $('#a');
var $quizQuestion = $('#question');
var $week = $('#week-declaration');

var setSkillUp = function() {
    browns.score = function() {
        return 45;
    }
}
var setSkillDown = function() {
    browns.score = function() {
        return 12;
    }
}

var check = function() {
    console.log("browns: pre-" + browns.skill)
    if (this.textContent == quiz[questionIndex].correct) {
        console.log("GOOD");
        setSkillUp();
    } else {
        console.log("NOPE")
        setSkillDown();

    }
    console.log("browns: " + browns.skill)
}
var renderQuestion = function() {
    $week.text(gameTextArray[questionIndex]);
    $quizQuestion.text(quiz[questionIndex].question);
    $quizA.text(quiz[questionIndex].responses[0]).click(check);
    $quizB.text(quiz[questionIndex].responses[1]).click(check);
    $quizC.text(quiz[questionIndex].responses[2]).click(check);
    $quizD.text(quiz[questionIndex].responses[3]).click(check);
    console.log('renderQuestion')
}
console.log(browns.skill);
renderQuestion();

///////////////////////////////
//////////////////////////////
//PAGE FUNCTIONALITY
var nextweek = function() {

    $('.sim').off('click', schedule[questionIndex]);
    questionIndex++;
    $('.sim').click(schedule[questionIndex]);
    if (questionIndex == 16) {
        console.log('season complete');
        $('.sim').off('click', schedule[questionIndex]);
    } else {
        renderQuestion();
    }
}

$('.sim').click(schedule[questionIndex]);
$('.sim').click(nextweek);








//