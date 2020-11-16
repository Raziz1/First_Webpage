window.addEventListener('load', () => {
  //On website load store variables
  let long; //Store lat and long to access openweatherAPI
  let lat;

  //==========Current Condition variables==========
  let locationTimezone = document.querySelector(".location-timezone");

  //==========Forecast variables==========
  //Description
  var forecastDescription = new Array(4);
  const forecastDescriptionTag = document.querySelectorAll(".description");
  //Icon
  var forestcastIcon = new Array(4);
  const forestcastIconTag = document.querySelectorAll(".location-icon");
  //Max Temp
  var forecastMax = new Array(4);
  const forecastMaxTag = document.querySelectorAll("#max");
  //Min Temp
  var forecastMin = new Array(4);
  const forecastMinTag = document.querySelectorAll("#min");
  //POP Temp
  var forecastPop = new Array(4);
  const forecastPopTag = document.querySelectorAll(".precipitation");
  //Date
  const dateTag = document.querySelectorAll(".date")
  var d = new Date;
  var year;
  var month;
  var day;

  //==========News Variables==========
  //Article-Title
  var articleTitle = new Array(2);
  const articleTitleTag = document.querySelectorAll(".article-title");
  //Article-Source
  var articleSource = new Array(2);
  const articleSourceTag = document.querySelectorAll("#source");
  //Article-Description
  var articleDescription = new Array(2);
  const articleDescriptionTag = document.querySelectorAll(".article-description");
  //Article-Icon
  var articleIcon = new Array(2);
  const articleIconTag = document.querySelectorAll(".news-icon");

  const newsApi = "https://gnews.io/api/v4/top-headlines?&max=2&lang=en&token=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

  //==========Sports Variables==========
  var iconTeam;
  const iconTag = document.querySelector(".team-logo");
  var teamName;
  var season;
  const teamNameTag = document.querySelector(".team-name");
  var gamesPlayed;
  const gamesPlayedTag = document.querySelector("#gamesPlayed");
  var gamesWon;
  const gamesWonTag= document.querySelector("#gamesWon");
  var gamesLost;
  const gamesLostTag= document.querySelector("#gamesLost");
  var goalsFor;
  const goalsForTag= document.querySelector("#goalsFor");
  var goalsAgainst;
  const goalsAgainstTag= document.querySelector("#goalsAgainst");
  const sportsApi ="https://v1.hockey.api-sports.io/teams/statistics?season=2019&team=693&league=57";

  //Access users location 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      //Store their lat and long

      //Store the API URL with the lat and long
      const api = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&units=metric&appid=XXXXXXXXXXXXXXXXXXX";

      //Fetch JSON data response and store variables
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          //==========Set the DOM Elements from the api==========
          //==========Timezone==========
          const { timezone } = data;
          locationTimezone.textContent = timezone;

          //====================Forecast Conditions====================
          const { daily } = data;
          //====================Icon====================
          for (var i = 0; i < forestcastIcon.length; i++) {
            forestcastIcon[i] = (daily[i].weather[0].icon);
          }
          for (var i = 0; i < forestcastIconTag.length; i++) {
            var currentEl = forestcastIconTag[i];
            currentEl.src = "http://openweathermap.org/img/wn/" + forestcastIcon[i] + "@2x.png";
          }

          //====================Description====================
          for (var i = 0; i < forecastDescription.length; i++) {
            forecastDescription[i] = (daily[i].weather[0].description);
          }
          for (var i = 0; i < forecastDescriptionTag.length; i++) {
            var currentEl = forecastDescriptionTag[i];
            currentEl.textContent = forecastDescription[i];
          }

          //====================Max Temp====================
          for (var i = 0; i < forecastMax.length; i++) {
            forecastMax[i] = (daily[i].temp.max);
          }
          for (var i = 0; i < forecastMaxTag.length; i++) {
            var currentEl = forecastMaxTag[i];
            currentEl.textContent = "Max: " + forecastMax[i] + "°C";
          }

          //====================Min Temp====================
          for (var i = 0; i < forecastMin.length; i++) {
            forecastMin[i] = (daily[i].temp.min);
          }
          for (var i = 0; i < forecastMinTag.length; i++) {
            var currentEl = forecastMinTag[i];
            currentEl.textContent = "Min: " + forecastMin[i] + "°C";
          }

          //====================Min Temp====================
          for (var i = 0; i < forecastPop.length; i++) {
            forecastPop[i] = (daily[i].pop);
          }
          for (var i = 0; i < forecastPopTag.length; i++) {
            var currentEl = forecastPopTag[i];
            currentEl.textContent = "Pop: " + forecastPop[i] + "%";
          }

          //====================Date====================
          for (var i = 0; i < dateTag.length; i++) {
            year = d.getFullYear();
            month = d.getMonth() + 1;
            day = d.getDate() + i;
            var currentEl = dateTag[i];
            currentEl.textContent = year + "-" + month + "-" + day;
          }





        });



    });

  }


  //====================Fetch News Articles====================
  //Fetch JSON data response and store variables
  fetch(newsApi)
    .then(response => {
      return response.json();
    })
    .then(data => {
      //==========Set the DOM Elements from the api==========
      //==========News==========
      const { articles } = data;
      //console.log(articles[0]);

      //====================Article Title====================
      for (var i = 0; i < articleTitle.length; i++) {
        articleTitle[i] = (articles[i].title);
      }
      for (var i = 0; i < articleTitleTag.length; i++) {
        var currentEl = articleTitleTag[i];
        currentEl.textContent = articleTitle[i];
      }

      //====================Article Source====================
      for (var i = 0; i < articleSource.length; i++) {
        articleSource[i] = (articles[i].source.name);
      }
      for (var i = 0; i < articleSourceTag.length; i++) {
        var currentEl = articleSourceTag[i];
        currentEl.textContent = articleSource[i];
      }

      //====================Article description====================
      for (var i = 0; i < articleDescription.length; i++) {
        articleDescription[i] = (articles[i].description);
      }
      for (var i = 0; i < articleDescriptionTag.length; i++) {
        var currentEl = articleDescriptionTag[i];
        currentEl.textContent = articleDescription[i];
      }

      //====================Article Image====================
      for (var i = 0; i < articleIcon.length; i++) {
        articleIcon[i] = (articles[i].image);
      }
      for (var i = 0; i < articleIconTag.length; i++) {
        var currentEl = articleIconTag[i];
        currentEl.src = articleIcon[i];
      }
    });

  //====================Fetch Sports Stats====================
  
  fetch(sportsApi, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "v1.hockey.api-sports.io",
      "x-rapidapi-key": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
  })
    .then(response => {
      //console.log(response.json());
      return response.json();
    })
    .then(data => {
    //console.log(data)
    const { response } = data;
    teamName = response.team.name;
    season = data.parameters.season;
    iconTeam = response.team.logo;
    gamesPlayed = response.games.played.all;
    gamesWon = response.games.wins.all.total;
    gamesLost = response.games.loses.all.total;
    goalsFor = response.goals.for.total.all;
    goalsAgainst = response.goals.against.total.all;
    
    teamNameTag.textContent = teamName + " - " + season ;
    iconTag.src = iconTeam
    gamesPlayedTag.textContent = "Games Played: "+ gamesPlayed;
    gamesWonTag.textContent = "Games Won: "+ gamesWon;
    gamesLostTag.textContent = "Games Lost: "+ gamesLost;
    goalsForTag.textContent = "Goals For: "+ goalsFor;
    goalsAgainstTag.textContent = "Goals Against: "+ goalsAgainst;

    })
    .catch(err => {
      console.log(err);
    });

  
  //Set the clock time
  initLocalClocks();
});

//====================Clock Function====================
function initLocalClocks() {
  // Get the local time using JS
  var date = new Date;
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hours = date.getHours();

  // Create an object with each hand and it's angle in degrees
  var hands = [
    {
      hand: 'hours',
      angle: (hours * 30) + (minutes / 2)
    },
    {
      hand: 'minutes',
      angle: (minutes * 6)
    },
    {
      hand: 'seconds',
      angle: (seconds * 6)
    }
  ];
  // Loop through each of these hands to set their angle
  for (var j = 0; j < hands.length; j++) {
    var elements = document.querySelectorAll('.' + hands[j].hand);
    for (var k = 0; k < elements.length; k++) {
      elements[k].style.webkitTransform = 'rotateZ(' + hands[j].angle + 'deg)';
      elements[k].style.transform = 'rotateZ(' + hands[j].angle + 'deg)';
      // If this is a minute hand, note the seconds position (to calculate minute position later)
      if (hands[j].hand === 'minutes') {
        elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
      }
    }
  }
}