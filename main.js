let csvToJson=require("convert-csv-to-json");
const matchesData=csvToJson.fieldDelimiter(',').getJsonFromCsv('iplDataSet/matches.csv');
const deliveriesData=csvToJson.fieldDelimiter(',').getJsonFromCsv('iplDataSet/deliveries.csv');

matchesPlayedPerEachYear(matchesData);
numberOfMatchesWonByEachTeam(matchesData);
numberOfRunsConcededByEachTeamIn2016(matchesData,deliveriesData);

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

function numberOfRunsConcededByEachTeamIn2016(inputData1,inputData2){
    let reqYear='2016';
    let reqYearMatchIds=[];
    let numberOfRunsConcededByEachTeamIn2016={};
    for (let obj of inputData1){
        let year=obj.season;
        let matchId=obj.id;
        if(reqYear==year){
            reqYearMatchIds.push(matchId);
        }
    }
     console.log(reqYearMatchIds.length);
     let count=0;
    for(let record of inputData2){
        count+=1;
        // let deliveryMatchId=record.match_id;
        // let bowlingTeam=record.bowling_team;
        // let runsConceded=record.extra_runs;
        if(record.match_id in reqYearMatchIds){
            let counter=record.bowling_team in numberOfRunsConcededByEachTeamIn2016?numberOfRunsConcededByEachTeamIn2016[record.bowling_team]:0;
            numberOfRunsConcededByEachTeamIn2016[record.bowling_team]=counter+Number(record.extra_runs);

        }
    }
    console.log(numberOfRunsConcededByEachTeamIn2016);
    console.log(count);
}

