$(function() {
    console.log("connected");

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
            var points = Math.floor(Math.random() * (skill * 3.5) + 12 - (4 / skill));
            if (points == 1) {
                return points = 0;
            } else if (points == 4) {
                return points = 3
            } else {
                return points
            }
        }

    };



    var patriots = new Team('New England', 'Patriots', 'Gilette Stadium', 8);
    var dolphins = new Team('Miami', 'Dolphins', 'Hard Rock Stadium', 3);
    var jets = new Team('New York', 'Jets', 'MetLife Stadium', 3);
    var bills = new Team('Buffalo', 'Bills', 'New Era Field', 4);

    var steelers = new Team('Pittsburgh', 'Steelers', 'Heinz Field', 8);
    var browns = new Team('Cleveland', 'Browns', 'FirstEnergy Stadium', 1);
    var bengals = new Team('Cincinatti', 'Bengals', 'Paul Brown Stadium', 4);
    var ravens = new Team('Baltimore', 'Ravens', 'M&T Bank Stadium', 4);

    var jaguars = new Team('Jacksonville', 'Jaguars', 'EverBank Field', 6);
    var titans = new Team('Tennessee', 'Titans', 'Nissan Stadium', 4);
    var colts = new Team('Indianapolis', 'Colts', 'Lucas Oil Stadium', 2);
    var texans = new Team('Houston', 'Texans', 'NRG Stadium', 2);

    var chiefs = new Team('Kansas City', 'Chiefs', 'Arrowhead Stadium', 6);
    var raiders = new Team('Oakland', 'Raiders', 'Oakland Alameda Coliseum', 3);
    var chargers = new Team('Los Angeles', 'Chargers', 'StubHub Center', 5);
    var broncos = new Team('Denver', 'Broncos', 'Sports Authority Field at Mile High', 3);

    var afcEast = [patriots, dolphins, jets, bills];
    var afcNorth = [steelers, browns, bengals, ravens];
    var afcSouth = [jaguars, titans, colts, texans];
    var afcWest = [chiefs, raiders, chargers, broncos];
    var afc = [afcEast, afcNorth, afcSouth, afcWest];


    // console.log(afc);

    var game = function(home, away) {
        var homeScore = home.score() + 2; //homefield advantage
        var awayScore = away.score();
        home.totalPoints += homeScore;
        away.totalPoints += awayScore;
        if (homeScore > awayScore) {
            home.wins++;
            away.losses++;
        } else if (homeScore < awayScore) {
            home.losses++;
            away.wins++;
        } else if (homeScore == awayScore) {
            home.ties++;
            away.ties++;
        }
        return `${home.name}-${homeScore}:${away.name}-${awayScore}
    ${home.name} record: ${home.standing()}
    ${away.name} record: ${away.standing()}
    `
    }
    var gameday1 = function() {
        game(afcWest[0], afcWest[1]);
        game(afcWest[2], afcWest[3]);
        game(afcSouth[0], afcSouth[1]);
        game(afcSouth[2], afcSouth[3]);
        game(afcNorth[0], afcNorth[1]);
        game(afcNorth[2], afcNorth[3]);
        game(afcEast[0], afcEast[1]);
        game(afcEast[2], afcEast[3]);
        renderStandings();
    }
    var gameday2 = function() {
        game(afcWest[3], afcWest[0]);
        game(afcWest[1], afcWest[2]);
        game(afcSouth[3], afcSouth[0]);
        game(afcSouth[1], afcSouth[2]);
        game(afcNorth[3], afcNorth[0]);
        game(afcNorth[1], afcNorth[2]);
        game(afcEast[3], afcEast[0]);
        game(afcEast[1], afcEast[2]);
        renderStandings();
    }
    var gameday3 = function() {
        game(afcWest[0], afcWest[2]);
        game(afcWest[1], afcWest[3]);
        game(afcSouth[0], afcSouth[2]);
        game(afcSouth[1], afcSouth[3]);
        game(afcNorth[0], afcNorth[2]);
        game(afcNorth[1], afcNorth[3]);
        game(afcEast[0], afcEast[2]);
        game(afcEast[1], afcEast[3]);
        renderStandings();
    }

    var renderStandings = function() {

        var $standingsName = $('.standings-name');
        var $standingsWins = $('.standings-wins');
        var $standingsLosses = $('.standings-losses');
        var $standingsTies = $('.standings-ties');
        $standingsName.empty();
        $standingsWins.empty();
        $standingsLosses.empty();
        $standingsTies.empty();

        var afcEastByWins = afcEast.sort(function(a, b) {
            return b.wins - a.wins
        });
        afcEastByWins.forEach(function(x) {
            $standingsName.append($('<div>').addClass('standings-content').text(x.name));
            $standingsWins.append($('<div>').addClass('standings-content').text(x.wins));
            $standingsLosses.append($('<div>').addClass('standings-content').text(x.losses));
            $standingsTies.append($('<div>').addClass('standings-content').text(x.ties));
        });
        // afc.forEach(function(y) {
        //     y.forEach(function(x) {
        //         $standingsName.append($('<div>').addClass('standings-content').text(x.name));
        //         $standingsWins.append($('<div>').addClass('standings-content').text(x.wins));
        //         $standingsLosses.append($('<div>').addClass('standings-content').text(x.losses));
        //         $standingsTies.append($('<div>').addClass('standings-content').text(x.ties));
        //     })
        // })

    }
    renderStandings();
    $('.sim').eq(0).on('click', gameday1());
    $('.sim').eq(1).on('click', gameday2());
    $('.sim').eq(2).on('click', gameday3());






















})
//