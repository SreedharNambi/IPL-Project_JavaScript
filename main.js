let csvToJson=require("convert-csv-to-json");
const matchesData=csvToJson.fieldDelimiter(',').getJsonFromCsv('iplDataSet/matches.csv');
const deliveriesData=csvToJson.fieldDelimiter(',').getJsonFromCsv('iplDataSet/deliveries.csv');

matchesPlayedPerEachYear(matchesData);
numberOfMatchesWonByEachTeam(matchesData);
numberOfRunsConcededByEachTeamIn2016(matchesData,deliveriesData);
mostEconomicalBowlerOf2015(matchesData,deliveriesData);
numberMatchesWonByTeamInTheirHomeGround(matchesData);

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
    
    for(let record of inputData2){
        // let deliveryMatchId=record.match_id;
        // let bowlingTeam=record.bowling_team;
        // let runsConceded=record.extra_runs;
        if(record.match_id in reqYearMatchIds){
            let counter=record.bowling_team in numberOfRunsConcededByEachTeamIn2016?numberOfRunsConcededByEachTeamIn2016[record.bowling_team]:0;
            numberOfRunsConcededByEachTeamIn2016[record.bowling_team]=counter+Number(record.extra_runs);

        }
    }
    console.log("Number of extra runs conceded by team in 2016 :");
    console.log(numberOfRunsConcededByEachTeamIn2016);

}

function mostEconomicalBowlerOf2015(inputData1,inputData2){
    let reqBowler='';
    let reqYear='2015';
    let reqYearMatchIds=[];
    let bowlerRecord={};
    let mostEconomicalBowlerOf2015={};
    for (let obj of inputData1){
        let year=obj.season;
        let matchId=obj.id;
        if(reqYear==year){
            reqYearMatchIds.push(matchId);
        }
    }

    for(let record of inputData2){
        let matchId=record.match_id;
        let bowler=record.bowler;
        let totalRuns=record.total_runs;
        if(matchId in reqYearMatchIds){
            if(bowler in bowlerRecord){
                prevRecord=bowlerRecord[bowler];
                prevRecord[0]+=1;
                prevRecord[1]+=Number(totalRuns);
                bowlerRecord[bowler]=prevRecord;
            }
            else{
                let bowlerStats=[];
                bowlerStats[0]=1;
                bowlerStats[1]=Number(totalRuns);
                bowlerRecord[bowler]=bowlerStats;
            }

        }
    }
    // console.log(bowlerRecord);
    let min=100.0;
    for (let obj in bowlerRecord){
        let values=bowlerRecord[obj];
        let economy=values[1]*6.0/values[0];
        if(economy<min){
            min=economy;
            reqBowler=obj;
        }
    }
    console.log(`Most Economical bolwer of 2015 is ${reqBowler}`);
    }

    function numberMatchesWonByTeamInTheirHomeGround(inputData1){
        let reqTeam='Sunrisers Hyderabad';
        let homeGround='Hyderabad';
        let count=0;
        for (let obj of inputData1){
            let team=obj.winner;
            let venue=obj.city;
            if(reqTeam===team && homeGround===venue){
                count+=1;
            }
        }
        console.log(`Number matches won by ${reqTeam} in ${homeGround} is ${count}`);
    }
    


