let csvToJson=require("convert-csv-to-json");
const matchesData=csvToJson.fieldDelimiter(',').getJsonFromCsv('iplDataSet/matches.csv');

matchesPlayedPerEachYear(matchesData);
numberOfMatchesWonByEachTeam(matchesData);

function matchesPlayedPerEachYear(inputData){
    let matchesPlayedInEachYear={};

    for (let obj of inputData){
        let season=obj.season;
            if(season in matchesPlayedInEachYear){
                matchesPlayedInEachYear[season]+=1;
            }
            else{
                matchesPlayedInEachYear[season]=1;
            }
        }
    console.log('Matches played per each year over all years : ')
    console.log(matchesPlayedInEachYear);
}

function numberOfMatchesWonByEachTeam(inputData){
    let numberOfMatchesWonByEachTeamOverAllYears = {};

    for(let obj of inputData){
        let team=obj.winner;
        if(team in numberOfMatchesWonByEachTeamOverAllYears){
            numberOfMatchesWonByEachTeamOverAllYears[team]+=1
        }
        else{
            numberOfMatchesWonByEachTeamOverAllYears[team]=1
        }
    }
    delete numberOfMatchesWonByEachTeamOverAllYears[''];
    console.log("Number of matches won by each team over all years :")
    console.log(numberOfMatchesWonByEachTeamOverAllYears);
}
matchesPlayedPerEachYear(matchesData);
numberOfMatchesWonByEachTeam(matchesData);


