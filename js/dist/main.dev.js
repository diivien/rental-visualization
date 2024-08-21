"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var pinPath = "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.75c-1.51 0-2.75-1.24-2.75-2.75S10.49 6.25 12 6.25 14.75 7.49 14.75 9 13.51 11.75 12 11.75z";
var svgPath = "M 100,20 \
           A 80,80 0 0,1 180,100 \
           A 80,80 0 0,1 100,180 \
           A 80,80 0 0,1 20,100 \
           A 80,80 0 0,1 100,20 \
           Z";
var currentLevel = "state";
var currentState = null;
var currentCity = null;
var currentListing = null; // let priceColor1 = "#005F73"
// let priceColor2 = "#0A9396"
// let priceColor3 = "#94D2BD"

var priceColor1 = "#BB3E03";
var priceColor2 = "#CA6702";
var priceColor3 = "#EE9B00";
var socialColor1 = "#BB3E03";
var socialColor2 = "#CA6702";
var socialColor3 = "#EE9B00"; // let currentCity = null;

var stateCodeToName = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  DC: "Washington D.C",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  WA: "Washington"
}; // Load data

Promise.all([d3.csv("rentcrime.csv", d3.autoType), d3.json("states-10m.json")]).then(function (files) {
  data = files[0];
  data.forEach(function (listing, index) {
    // Add an 'id' property to each listing object
    listing.id = index + 1; // Adding 1 to start id from 1
  });
  us = files[1];
  var data2019 = data.filter(function (d) {
    return d.year == 2019;
  });
  console.log(data); // Processing the grouped data

  var map;
  var groupedData = Array.from(d3.group(data2019, function (d) {
    return d.state;
  }, function (d) {
    return d.cityname;
  }), function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        state = _ref2[0],
        cities = _ref2[1];

    var cityData = Array.from(cities, function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          cityname = _ref4[0],
          values = _ref4[1];

      var cityValues = values.map(function (d, i) {
        d.median = d.price / d.square_feet; // Add price per square foot

        d.name = "Rental ".concat(i + 1); // Add name to each listing

        return d.median;
      });
      var median = d3.median(cityValues);
      var totalPets = d3.sum(values.map(function (d) {
        return d.pets_allowed;
      })) / values.length;
      return {
        city: cityname,
        listings: values,
        median: median,
        avg_crime: values[0].avg_crime,
        totalPets: totalPets,
        black: values[0].racepctblack,
        white: values[0].racePctWhite,
        asian: values[0].racePctAsian,
        hisp: values[0].racePctHisp,
        violent_crime: values[0].ViolentCrimesPerPop,
        arson_crime: values[0].arsonsPerPop,
        assault_crime: values[0].assaultPerPop,
        gta_crime: values[0].autoTheftPerPop,
        burg_crime: values[0].burglPerPop,
        larc_crime: values[0].larcPerPop,
        murder_crime: values[0].murdPerPop,
        nonviolent_crime: values[0].nonViolPerPop,
        rape_crime: values[0].rapesPerPop,
        robbery_crime: values[0].robbbPerPop,
        population: values[0].population,
        medFamInc: values[0].medFamInc
      };
    }); // Calculating the median value for the state

    var stateMedian = d3.median(cityData.map(function (city) {
      return city.median;
    }));
    var medFamInc = d3.median(cityData.map(function (city) {
      return city.medFamInc;
    }));
    var totalPets = d3.mean(cityData.map(function (city) {
      return city.totalPets;
    }));
    var avg_crime = d3.mean(cityData.map(function (city) {
      return city.avg_crime;
    }));
    var black = d3.mean(cityData.map(function (city) {
      return city.black;
    }));
    var white = d3.mean(cityData.map(function (city) {
      return city.white;
    }));
    var asian = d3.mean(cityData.map(function (city) {
      return city.asian;
    }));
    var hisp = d3.mean(cityData.map(function (city) {
      return city.hisp;
    }));
    var violent_crime = d3.mean(cityData.map(function (city) {
      return city.violent_crime;
    }));
    var arson_crime = d3.mean(cityData.map(function (city) {
      return city.arson_crime;
    }));
    var assault_crime = d3.mean(cityData.map(function (city) {
      return city.assault_crime;
    }));
    var gta_crime = d3.mean(cityData.map(function (city) {
      return city.gta_crime;
    }));
    var burg_crime = d3.mean(cityData.map(function (city) {
      return city.burg_crime;
    }));
    var larc_crime = d3.mean(cityData.map(function (city) {
      return city.larc_crime;
    }));
    var murder_crime = d3.mean(cityData.map(function (city) {
      return city.murder_crime;
    }));
    var nonviolent_crime = d3.mean(cityData.map(function (city) {
      return city.nonviolent_crime;
    }));
    var rape_crime = d3.mean(cityData.map(function (city) {
      return city.rape_crime;
    }));
    var robbery_crime = d3.mean(cityData.map(function (city) {
      return city.robbery_crime;
    }));
    var population = d3.median(cityData.map(function (city) {
      return city.population;
    }));
    var maxCrimeInState = d3.max(cityData.map(function (city) {
      return Math.max(city.violent_crime, city.assault_crime, city.gta_crime, city.burg_crime, city.rape_crime, city.robbery_crime);
    })); // Add max_crime_in_state property to each city object

    var citiesWithMaxCrimeInState = cityData.map(function (city) {
      return _objectSpread({}, city, {
        max_crime: maxCrimeInState
      });
    });
    return {
      statename: stateCodeToName[state],
      cities: citiesWithMaxCrimeInState,
      median: stateMedian,
      totalPets: totalPets,
      avg_crime: avg_crime,
      black: black,
      white: white,
      asian: asian,
      hisp: hisp,
      violent_crime: violent_crime,
      arson_crime: arson_crime,
      assault_crime: assault_crime,
      gta_crime: gta_crime,
      burg_crime: burg_crime,
      larc_crime: larc_crime,
      murder_crime: murder_crime,
      nonviolent_crime: nonviolent_crime,
      rape_crime: rape_crime,
      robbery_crime: robbery_crime,
      population: population,
      medFamInc: medFamInc
    };
  });
  console.log(groupedData);
  var maxCrimeAcrossAllStates = d3.max(groupedData.map(function (state) {
    return Math.max(state.violent_crime, state.assault_crime, state.gta_crime, state.burg_crime, state.rape_crime, state.robbery_crime);
  })); // Adding the overall maximum crime value to the groupedData

  groupedData.forEach(function (state) {
    state.max_crime = maxCrimeAcrossAllStates;
  });

  function dependency(price_chart, map, racial_breakdown, avg_crime, sum_pet) {
    var sortedData = null;

    function updateWhenListing() {
      var stateData = price_chart.groupedData.find(function (c) {
        return c.statename === currentState;
      });
      var cityData = stateData.cities.find(function (b) {
        return b.city === currentCity;
      });
      var listing = cityData.listings.find(function (l) {
        return l.id === currentListing;
      });
      price_chart.updateScales(cityData.listings);
      price_chart.update(cityData.listings);
      racial_breakdown.updateFillLevels(cityData);
      stateData = avg_crime.groupedData.find(function (c) {
        return c.statename === currentState;
      });
      cityData = stateData.cities.find(function (b) {
        return b.city === currentCity;
      });
      avg_crime.updateScales(stateData.cities);
      avg_crime.update(stateData.cities);
      avg_crime.highlightSelected(cityData);
      map.zoomToCoordinates(listing, 1000);
      stateData = sum_pet.groupedData.find(function (c) {
        return c.statename === currentState;
      });
      cityData = stateData.cities.find(function (b) {
        return b.city === currentCity;
      });
      sum_pet.updateScales(stateData.cities);
      sum_pet.update(stateData.cities);
      sum_pet.highlightSelected(cityData);
      price_chart.highlightSelected(listing);
    }

    function updateWhenState() {
      var stateData = sortedData || price_chart.groupedData;
      stateData = stateData.find(function (c) {
        return c.statename === currentState;
      });
      price_chart.updateScales(stateData.cities);
      price_chart.update(stateData.cities);
      racial_breakdown.updateFillLevels(stateData);
      stateData = sortedData || avg_crime.groupedData;
      stateData = stateData.find(function (c) {
        return c.statename === currentState;
      });
      avg_crime.updateScales(stateData.cities);
      avg_crime.update(stateData.cities);
      map.handleStateClick(currentState);
      stateData = sortedData || sum_pet.groupedData;
      stateData = stateData.find(function (c) {
        return c.statename === currentState;
      });
      sum_pet.updateScales(stateData.cities);
      sum_pet.update(stateData.cities);
      d3.selectAll(".mainGroup .bar").style("fill", priceColor1);
      d3.selectAll(".mainGroup .bar").attr("selected-on", "false");
      d3.selectAll(".crimeMainGroup .bar").style("fill", socialColor1);
      d3.selectAll(".crimeMainGroup .bar").attr("selected-on", "false");
      d3.selectAll(".petMainGroup .bar").style("fill", socialColor1);
      d3.selectAll(".petMainGroup .bar").attr("selected-on", "false");
    }

    function updateWhenCity() {
      var stateData = sortedData || price_chart.groupedData;
      stateData = stateData.find(function (c) {
        return c.statename === currentState;
      });
      var cityData = stateData.cities.find(function (b) {
        return b.city === currentCity;
      });
      price_chart.updateScales(cityData.listings);
      price_chart.update(cityData.listings);
      racial_breakdown.updateFillLevels(cityData);
      map.zoomToAverageLocation(cityData.listings, 100);
    }

    function cityToState() {
      price_chart.updateScales(sortedData || price_chart.groupedData);
      price_chart.update(sortedData || price_chart.groupedData);
      avg_crime.updateScales(sortedData || avg_crime.groupedData);
      avg_crime.update(sortedData || avg_crime.groupedData);
      sum_pet.updateScales(sortedData || sum_pet.groupedData);
      sum_pet.update(sortedData || sum_pet.groupedData);
      map.initiateZoom();
      d3.selectAll(".mainGroup .bar").style("fill", priceColor1);
      d3.selectAll(".mainGroup .bar").attr("selected-on", "false");
      d3.selectAll(".crimeMainGroup .bar").style("fill", socialColor1);
      d3.selectAll(".crimeMainGroup .bar").attr("selected-on", "false");
      d3.selectAll(".petMainGroup .bar").style("fill", socialColor1);
      d3.selectAll(".petMainGroup .bar").attr("selected-on", "false");
    }

    function sortByRace(race) {
      sortedData = groupedData.map(function (stateData) {
        return _objectSpread({}, stateData, {
          cities: stateData.cities.map(function (cityData) {
            return _objectSpread({}, cityData, {
              listings: _toConsumableArray(cityData.listings).sort(function (a, b) {
                return b[race] - a[race];
              })
            });
          }).sort(function (a, b) {
            return b[race] - a[race];
          })
        });
      }).sort(function (a, b) {
        return b[race] - a[race];
      });
    }

    function undoSortByRace(race) {
      sortedData = null;
    }

    return {
      // zoomToCoordinates: map.zoomToCoordinates,
      // zoomToAverageLocation: map.zoomToAverageLocation,
      // handleStateClick: map.handleStateClick,
      // updateScales: price_chart.updateScales,
      // update: price_chart.update,
      // highlightSelected: price_chart.highlightSelected,
      // price_data: price_chart.groupedData,
      // updateFillLevels: racial_breakdown.updateFillLevels,
      updateWhenListing: updateWhenListing,
      updateWhenState: updateWhenState,
      updateWhenCity: updateWhenCity,
      cityToState: cityToState,
      sortByRace: sortByRace,
      undoSortByRace: undoSortByRace
    };
  } // Initialize visualizations


  var price_chart = initializePricePerSqftChart(groupedData);
  var map = initializeMap(data2019, groupedData, us);
  var racial_breakdown = initializeRacialBreakdown();
  var avg_crime = initializeAvgCrime(groupedData);
  var sum_pet = initializeSumPet(groupedData); // Update dependencies

  var dependencies = dependency(price_chart, map, racial_breakdown, avg_crime, sum_pet);
  price_chart.updateDependencies(dependencies);
  map.updateDependencies(dependencies);
  racial_breakdown.updateDependencies(dependencies);
  avg_crime.updateDependencies(dependencies);
  sum_pet.updateDependencies(dependencies);
  d3.select("#dashboard-subtitle").transition().duration(500).style("opacity", 0).on("end", function () {
    d3.select(this).text("Unveiling Apartment Trends and Socio-Economic Realities").style("visibility", "visible").transition().duration(500).style("opacity", 1);
  });
});

function initializeRacialBreakdown() {
  var races = ["White", "Asian", "Hispanic", "Black"];
  var race_index = ["white", "asian", "hisp", "black"];
  var colors = ["#ffdbac", "#e0ac69", "#8d5524", "#3c2e28"]; // Add colors for each race

  var dependencies;
  var currentSortedRace = null; // Keep track of the currently sorted race

  function updateDependencies(depends) {
    dependencies = depends;
  }

  var width = $("#racial-breakdown").width();
  var height = $("#racial-breakdown").height();
  var container = d3.select("#racial-breakdown").style("display", "flex").style("justify-content", "space-between").style("text-align", "center");
  var containerWidth = width / races.length; // Get the width of each bar

  var containerHeight = height;
  var clipPaths = [];
  var race_tooltip = d3.select("#racial-breakdown").append("div").style("opacity", 0).attr("class", "tooltip").attr("id", "race-tooltip").style("background-color", "white").style("border", "solid").style("border-width", "2px").style("border-radius", "5px").style("padding", "5px");
  var race_values = null;

  function updateTooltip(event, d) {
    var percentage = 0;
    var race = races[d]; // Get the race name from the races array

    if (race_values == null) {
      percentage = 0;
    } else {
      percentage = race_values[d];
    } // Assuming the data has a "value" property for the percentage


    race_tooltip.style("opacity", 1).html("<strong>".concat(race, "</strong><br/>Percentage: ").concat(percentage.toFixed(2), "%")).style("left", "".concat(event.pageX - 1630, "px")) // offset from mouse
    .style("top", "".concat(event.pageY - 40, "px")); // offset from mouse
  }

  races.forEach(function (race, index) {
    var containerDiv = container.append("div").style("width", "".concat(containerWidth, "px")).style("height", "".concat(containerHeight + 4, "px")).style("padding-top", "4px").style("transition", "transform 0.3s, box-shadow 0.3s").style("border-radius", "8px").on("click", function (event, d) {
      if (currentLevel === "state") {
        if (currentSortedRace === race_index[index]) {
          dependencies.undoSortByRace();
          dependencies.cityToState();
          currentSortedRace = null;
          d3.selectAll(".race-bar").style("box-shadow", "none");
        } else {
          dependencies.sortByRace(race_index[index]);
          dependencies.cityToState();
          currentSortedRace = race_index[index];
          d3.selectAll(".race-bar").style("box-shadow", "none");
          d3.select(this).style("box-shadow", "0 0 8px rgba(0, 0, 0, 0.5)");
        }
      } else if (currentLevel === "city") {
        if (currentSortedRace === race_index[index]) {
          dependencies.undoSortByRace();
          dependencies.updateWhenState();
          currentSortedRace = null;
          d3.selectAll(".race-bar").style("box-shadow", "none");
        } else {
          dependencies.sortByRace(race_index[index]);
          dependencies.updateWhenState();
          currentSortedRace = race_index[index];
          d3.selectAll(".race-bar").style("box-shadow", "none");
          d3.select(this).style("box-shadow", "0 0 8px rgba(0, 0, 0, 0.5)");
        }
      }
    }).on("mouseover", function () {
      d3.select(this).style("cursor", "pointer"); // race_tooltip.style("opacity", 1);
    }).on("mouseout", function () {
      d3.select(this).style("cursor", "default");
    }).on("mousemove", function (event, d) {
      updateTooltip(event, index);
    }).on("mouseleave", function (d) {
      race_tooltip.style("opacity", 0); // d3.select("#race-tooltip").remove();
    }).classed("race-bar", true);
    var svg = containerDiv.append("svg").attr("width", containerWidth).attr("height", containerHeight).attr("viewBox", "0 0 ".concat(containerWidth, " ").concat(containerHeight));
    var bar = svg.append("rect").attr("width", containerWidth - 16) // Adjust bar width
    .attr("height", containerHeight - 16) // Full height minus space for text
    .attr("x", 8) // Center the bar
    .attr("y", 0) // Start at the top of the container
    .attr("fill", "none") // No fill
    .attr("stroke", "black"); // Black outline

    var barFill = svg.append("rect").attr("width", containerWidth - 18).attr("height", 0) // Initial height is 0
    .attr("x", 9) // Center the bar
    .attr("y", containerHeight + 16) // Start at the bottom of the container
    .style("transform", "rotate(180deg)").style("transform-origin", "center bottom").style("fill", colors[index]); // Use different color for each race

    clipPaths.push(barFill.node());
    svg.append("text").attr("x", containerWidth / 2).attr("y", containerHeight - 3.2).style("fill", "white").attr("font-family", "Roboto").attr("text-anchor", "middle").attr("font-size", "12px").text(race);
  });

  function updateFillLevels(selectedData) {
    race_values = [selectedData.white, selectedData.asian, selectedData.hisp, selectedData.black];
    var fillLevels = race_values.map(function (value) {
      return (containerHeight - 16) * (value / 100);
    });
    clipPaths.forEach(function (rect, index) {
      gsap.to(rect, {
        duration: 1,
        height: fillLevels[index],
        ease: "power2.inOut"
      });
    });
  }

  return {
    updateFillLevels: updateFillLevels,
    updateDependencies: updateDependencies
  };
}

function initializeMap(apartmentData, groupedData, us) {
  var width = $("#map").width();
  var height = $("#map").height();
  var margin = 0;
  var minZoom;
  var maxZoom;
  var dependencies;
  var customInterpolator = d3.scaleSequential().domain([0, 1]).interpolator(function (t) {
    return d3.interpolateOrRd(0.2 + 0.8 * t);
  }); // Create a color scale based on the population

  var populationExtent = d3.extent(groupedData, function (d) {
    return d.population;
  });
  var colorScale = d3.scaleSequential().domain([populationExtent[0], populationExtent[1]]).interpolator(customInterpolator.interpolator());

  function updateDependencies(depends) {
    dependencies = depends;
  }

  var projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale(800);
  var path = d3.geoPath().projection(projection); // Create the SVG container

  var svg = d3.select("#map").append("svg").attr("id", "map-svg").attr("viewBox", [-margin, 0, width + margin, height + margin]).style("background-color", "rgba(255, 255, 255, 0.0)").on("click", function (event) {
    var clickedElement = event.target;
    var isPath = clickedElement.tagName.toLowerCase() === "path";

    if (!isPath) {
      // User clicked on the white area
      if (currentLevel === "city" || "listing") {
        currentLevel = "state";
        dependencies.cityToState();
      }
    }
  }).call(d3.zoom().on("zoom", zoomed));
  var pointsRaw = apartmentData.map(function (d, i) {
    var point = projection([d.longitude, d.latitude]);
    point.push(i); // Add the index of the data point

    return point;
  }); // Create or update the quadtree

  quadtree = d3.quadtree().addAll(pointsRaw);

  function inRange(x, min, max) {
    return (x - min) * (x - max) <= 0;
  }

  var g = svg.append("g");

  function calculateClusterRange(zoomLevel) {
    if (zoomLevel < 1) {
      return 64; // Return 88 for zoom levels less than 1
    } else if (zoomLevel > 200) {
      return -1;
    } else {
      if (inRange(zoomLevel, 1, 3)) {
        return 64;
      }

      if (inRange(zoomLevel, 3, 5)) {
        return 32;
      }

      if (inRange(zoomLevel, 5, 9)) {
        return 16;
      }

      if (inRange(zoomLevel, 9, 12)) {
        return 8;
      }

      if (inRange(zoomLevel, 12, 18)) {
        return 4;
      }

      if (inRange(zoomLevel, 18, 45)) {
        return 2;
      }

      if (inRange(zoomLevel, 45, 200)) {
        return 1;
      }
    }
  }

  function zoomed(event) {
    var t = event.transform;
    g.attr("transform", "translate(" + [t.x, t.y] + ")scale(" + t.k + ")");
    var clusterRange = calculateClusterRange(t.k); // Calculate clusterRange based on zoom level

    if (clusterRange < 0) {
      displayPointsInView(t);
    } else {
      clusterPoints = calculatePoints(clusterRange);
      displayNodesInView(t, clusterPoints);
    }
  } // Define map zoom behaviour


  var zoom = d3.zoom().on("zoom", zoomed);

  function initiateZoom() {
    minZoom = Math.max($("#map-svg").width() / width, $("#map-svg").height() / height) * 1;
    maxZoom = 20 * minZoom;
    zoom.scaleExtent([minZoom, maxZoom]).translateExtent([[0, 0], [width, height]]);
    midX = ($("#map-svg").width() - minZoom * width) / 2;
    midY = ($("#map-svg").height() - minZoom * height) / 2;
    svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity.translate(midX, midY).scale(minZoom));
  }

  var map_tooltip = d3.select("#map").append("div").style("opacity", 0).attr("class", "tooltip").style("background-color", "white").style("border", "solid").style("border-width", "2px").style("border-radius", "5px").style("padding", "5px");

  function updateTooltip(event, d) {
    var xPos = event.pageX - 150; // offset from mouse

    var yPos = event.pageY; // offset from mouse

    map_tooltip.html("<strong>".concat(d.statename || d.city || d.name, "</strong><br/>\n          Price: ").concat(d.price.toFixed(2), "<br/>\n          Bedrooms: ").concat(d.bedrooms || "N/A", "<br/>\n          Bathrooms: ").concat(d.bathrooms || "N/A", " <br/>\n          Pets Allowed: ").concat(d.pets_allowed || "N/A", "\n")).style("left", xPos + "px").style("top", yPos + "px");
  }

  function displayPoints(filteredData, transform) {
    svg.selectAll(".apartment-point").remove();
    svg.selectAll(".centerPoint").remove();
    svg.selectAll(".centerPointText").remove();
    g.selectAll(".apartment-point").data(filteredData).enter().append("path").attr("class", "apartment-point").attr("d", pinPath).attr("transform", function (d) {
      var coords = projection([d.longitude, d.latitude]);
      var scale = 0.8 / (transform.k / 2); // change this value as needed

      var translateXOffset = scale * 11.67; // adjust this value as needed

      var translateYOffset = scale * 21.67; // adjust this value as needed

      return "translate(".concat(coords[0] - translateXOffset, ", ").concat(coords[1] - translateYOffset, ") scale(").concat(scale, ")");
    }).attr("fill", "rgba(255,0,0,1.0)").attr("stroke", "rgba(0,0,0,1.0)").attr("stroke-width", 0.5).on("mouseover", function (event, d) {
      d3.select(this).attr("fill", "rgba(0,0,255,1.0)");
      map_tooltip.style("opacity", 1);
    }).on("mouseout", function (event, d) {
      d3.select(this).attr("fill", "rgba(255,0,0,1.0)"); // Clear apartment info on mouseout

      d3.select("#info").html("");
    }).on("mousemove", function (event, d) {
      updateTooltip(event, d);
    }).on("mouseleave", function (d) {
      map_tooltip.style("opacity", 0);
      map_tooltip.html("");
    }).on("click", function (event, d) {
      d3.selectAll(".apartment-point").attr("fill", "gray");
      d3.select(this).attr("fill", "rgba(255,0,0,1.0)");
      currentLevel = "listing";
      currentListing = d.id;
      currentState = stateCodeToName[d.state];
      currentCity = d.cityname;
      dependencies.updateWhenListing(); // Handle click to select apartment (if needed)
    });
  }

  function calculatePoints(clusterRange) {
    var clusterPoints = [];

    function search(quadtree, x0, y0, x3, y3) {
      var validData = [];
      quadtree.visit(function (node, x1, y1, x2, y2) {
        var p = node.data;

        if (p) {
          p.selected = p[0] >= x0 && p[0] < x3 && p[1] >= y0 && p[1] < y3;

          if (p.selected) {
            validData.push(p);
          }
        }

        return x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0;
      });
      return validData;
    }

    for (var x = 0; x <= width; x += clusterRange) {
      for (var y = 0; y <= height; y += clusterRange) {
        var searched = search(quadtree, x, y, x + clusterRange, y + clusterRange);
        var centerPoint = searched.reduce(function (prev, current) {
          return [prev[0] + current[0], prev[1] + current[1]];
        }, [0, 0]);
        centerPoint[0] = centerPoint[0] / searched.length;
        centerPoint[1] = centerPoint[1] / searched.length;
        centerPoint.push(searched);

        if (centerPoint[0] && centerPoint[1]) {
          clusterPoints.push(centerPoint);
        }
      }
    }

    return clusterPoints;
  }

  function displayPointsInView(transform) {
    var _transform$invert = transform.invert([0, 0]),
        _transform$invert2 = _slicedToArray(_transform$invert, 2),
        x0 = _transform$invert2[0],
        y0 = _transform$invert2[1];

    var _transform$invert3 = transform.invert([width, height]),
        _transform$invert4 = _slicedToArray(_transform$invert3, 2),
        x1 = _transform$invert4[0],
        y1 = _transform$invert4[1];

    var filteredData = apartmentData.filter(function (d) {
      var _projection = projection([d.longitude, d.latitude]),
          _projection2 = _slicedToArray(_projection, 2),
          x = _projection2[0],
          y = _projection2[1];

      return x >= x0 && x <= x1 && y >= y0 && y <= y1;
    });
    g.selectAll(".apartment-point").remove();
    displayPoints(filteredData, transform);
  }

  function displayNodesInView(transform, clusterPoints) {
    svg.selectAll(".centerPoint").remove();
    svg.selectAll(".centerPointText").remove();
    svg.selectAll(".apartment-point").remove();

    var _transform$invert5 = transform.invert([0, 0]),
        _transform$invert6 = _slicedToArray(_transform$invert5, 2),
        x0 = _transform$invert6[0],
        y0 = _transform$invert6[1];

    var _transform$invert7 = transform.invert([width, height]),
        _transform$invert8 = _slicedToArray(_transform$invert7, 2),
        x1 = _transform$invert8[0],
        y1 = _transform$invert8[1];

    var filteredData = clusterPoints.filter(function (d) {
      var _ref5 = [d[0], d[1], d[2].length],
          x = _ref5[0],
          y = _ref5[1],
          length = _ref5[2];
      return x >= x0 && x <= x1 && y >= y0 && y <= y1 && length > 1;
    });
    var pinPointData = clusterPoints.filter(function (d) {
      var _ref6 = [d[0], d[1], d[2].length],
          x = _ref6[0],
          y = _ref6[1],
          length = _ref6[2];
      return x >= x0 && x <= x1 && y >= y0 && y <= y1 && length == 1;
    }).map(function (d) {
      return apartmentData[d[2][0][2]];
    });
    displayPoints(pinPointData, transform);
    var pointSizeScale = d3.scaleLinear().domain([d3.min(clusterPoints, function (d) {
      return d[2].length;
    }), d3.max(clusterPoints, function (d) {
      return d[2].length;
    })]).range([12, 24]);
    g.selectAll(".centerPoint").data(filteredData).enter().append("circle").attr("class", function (d) {
      return "centerPoint";
    }).attr("cx", function (d) {
      return d[0];
    }).attr("cy", function (d) {
      return d[1];
    }).attr("fill", "#ee9b00").attr("r", function (d, i) {
      return pointSizeScale(d[2].length) / transform.k;
    }).style("opacity", 0.6).style("stroke", "white").style("stroke-width", function (d, i) {
      return 1 / transform.k;
    });
    g.selectAll(".centerPointText").data(filteredData).enter().append("text").attr("class", "centerPointText").attr("x", function (d) {
      return d[0];
    }).attr("y", function (d) {
      return d[1];
    }).text(function (d) {
      return d[2].length;
    }).attr("font-family", "Roboto").attr("font-size", function (d, i) {
      var size = 12 / transform.k;
      return size;
    }).attr("fill", "black").attr("text-anchor", "middle").attr("dominant-baseline", "central"); // Convert filtered data to quadtree format
  }

  function boxZoom(box, centroid, paddingPerc) {
    minXY = box[0];
    maxXY = box[1];
    zoomWidth = Math.abs(minXY[0] - maxXY[0]);
    zoomHeight = Math.abs(minXY[1] - maxXY[1]);
    zoomMidX = centroid[0];
    zoomMidY = centroid[1];
    zoomWidth = zoomWidth * (1 + paddingPerc / 100);
    zoomHeight = zoomHeight * (1 + paddingPerc / 100);
    maxXscale = $("#map-svg").width() / zoomWidth;
    maxYscale = $("#map-svg").height() / zoomHeight;
    zoomScale = Math.min(maxXscale, maxYscale);
    zoomScale = Math.min(zoomScale, maxZoom);
    zoomScale = Math.max(zoomScale, minZoom);
    offsetX = zoomScale * zoomMidX;
    offsetY = zoomScale * zoomMidY;
    dleft = Math.min(0, $("#map-svg").width() / 2 - offsetX);
    dtop = Math.min(0, $("#map-svg").height() / 2 - offsetY);
    dleft = Math.max($("#map-svg").width() - width * zoomScale, dleft);
    dtop = Math.max($("#map-svg").height() - height * zoomScale, dtop);
    svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity.translate(dleft, dtop).scale(zoomScale));
  }

  function handleStateClick(d) {
    if (d === "Washington D.C") {
      d = "Maryland";
    }

    data = states.find(function (c) {
      return c.properties.name == d;
    });
    boxZoom(path.bounds(data), path.centroid(data), 20);
  }

  function zoomToCoordinates(current, scale) {
    var target = projection([current.longitude, current.latitude]);
    var translate = [width / 2 - target[0] * scale, height / 2 - target[1] * scale];
    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)).on("end", function () {
      d3.selectAll(".apartment-point").attr("fill", "gray");
      var pinpoint = d3.selectAll(".apartment-point").filter(function (d, i) {
        return d.id === current.id; // Adjust the condition based on your data structure
      });
      pinpoint.attr("fill", "rgba(255,0,0,1.0)").raise();
    });
  }

  function zoomToAverageLocation(listings, scale) {
    // Calculate the average latitude and longitude
    var avgLatitude = 0;
    var avgLongitude = 0;
    listings.forEach(function (listing) {
      avgLatitude += listing.latitude;
      avgLongitude += listing.longitude;
    });
    avgLatitude /= listings.length;
    avgLongitude /= listings.length;
    var target = projection([avgLongitude, avgLatitude]);
    var translate = [width / 2 - target[0] * scale, height / 2 - target[1] * scale];
    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)).on("end", function () {
      d3.selectAll(".apartment-point").attr("fill", "gray");
      var pinpoint = d3.selectAll(".apartment-point").filter(function (d, i) {
        return d.city === listings[0].city; // Adjust the condition based on your data structure
      });
      pinpoint.attr("fill", "rgba(255,0,0,1.0)").raise();
    });
  }

  $(window).resize(function () {
    svg.attr("width", $("#map").width()).attr("height", $("#map").height());
    initiateZoom();
  });
  var states = topojson.feature(us, us.objects.states).features; // Create color legend
  // Create color legend

  var legendWidth = 168;
  var legendHeight = 64; // Increased to accommodate title

  var legendMargin = {
    right: 16,
    bottom: 16
  };
  var legendPadding = 4; // Padding inside the legend background

  var titlePadding = 12; // Space between title and color scale

  var legendG = svg.append("g").attr("class", "legendG").attr("transform", "translate(".concat(width - legendWidth - legendMargin.right, ", ").concat(height - legendHeight - legendMargin.bottom, ")")); // Add white background with border

  legendG.append("rect").attr("width", legendWidth + 2 * legendPadding).attr("height", legendHeight + 2 * legendPadding).attr("transform", "translate(".concat(-legendPadding, ", ").concat(-legendPadding, ")")).attr("fill", "white").attr("stroke", "#ccc").attr("stroke-width", 1); // Add legend title

  legendG.append("text").attr("class", "legend-title").attr("text-anchor", "middle").attr("transform", "translate(".concat(legendWidth / 2, ", ").concat(titlePadding + 5, ")")).style("font-weight", "bold").style("font-size", "12.8px").text("Median Population");
  var legend = d3.legendColor().shapeWidth(32).cells(5).orient("horizontal").scale(colorScale).labelFormat(d3.format(".0s"));
  legendG.append("g").attr("transform", "translate(0, ".concat(titlePadding + 15, ")")).call(legend);
  d3.selectAll(".label").style("font-size", "13px");
  var state_tooltip = d3.select("#map").append("div").style("opacity", 0).attr("class", "tooltip").style("background-color", "white").style("border", "solid").style("border-width", "2px").style("border-radius", "5px").style("padding", "5px");

  function updateTooltip2(event, d) {
    var xPos = event.pageX - 150; // offset from mouse

    var yPos = event.pageY; // offset from mouse

    var stateData = groupedData.find(function (state) {
      return state.statename === d.properties.name;
    });
    state_tooltip.html("<strong>".concat(d.properties.name, "</strong><br/>\n            Median Population: ").concat(stateData ? stateData.population.toLocaleString() : "N/A", "\n          ")).style("left", xPos + "px").style("top", yPos + "px");
  } // Draw the states


  g.append("g").selectAll("path").data(states).enter().append("path").attr("d", path) // .attr("fill", "#e9d8a6")
  .attr("fill", function (d) {
    var stateData = groupedData.find(function (state) {
      return state.statename === d.properties.name;
    });
    return stateData ? colorScale(stateData.population) : "#e9d8a6"; // Default color if no data is found
  }).attr("stroke", "white").attr("stroke-width", 0.5).attr("class", "state").on("click", function (event, d) {
    svg.selectAll(".state").classed("state-on", false);
    d3.select(this).classed("state-on", true); // boxZoom(path.bounds(d), path.centroid(d), 20);

    currentLevel = "city";
    currentState = d.properties.name;
    dependencies.updateWhenState();
  }).on("mouseover", function (event, d) {
    d3.select(this).attr("fill", "#94d2bd");
    state_tooltip.style("opacity", 1);
  }).on("mouseout", function (event, d) {
    var stateData = groupedData.find(function (state) {
      return state.statename === d.properties.name;
    });
    d3.select(this).attr("fill", stateData ? colorScale(stateData.population) : "#e9d8a6");
  }).on("mousemove", function (event, d) {
    updateTooltip2(event, d);
  }).on("mouseleave", function (d) {
    state_tooltip.style("opacity", 0);
    state_tooltip.html("");
  }).append("title").text(function (d) {
    return d.properties.name;
  }); // displayNode();

  initiateZoom();
  return {
    updateDependencies: updateDependencies,
    handleStateClick: handleStateClick,
    zoomToCoordinates: zoomToCoordinates,
    zoomToAverageLocation: zoomToAverageLocation,
    initiateZoom: initiateZoom
  };
} // Function to initialize the price per square feet chart


function initializePricePerSqftChart(input) {
  var data = input.map(function (stateData) {
    return _objectSpread({}, stateData, {
      cities: stateData.cities.map(function (cityData) {
        return _objectSpread({}, cityData, {
          listings: _toConsumableArray(cityData.listings).sort(function (a, b) {
            return b.median - a.median;
          })
        });
      }).sort(function (a, b) {
        return b.median - a.median;
      })
    });
  }).sort(function (a, b) {
    return b.median - a.median;
  }); // sortedData now contains the sorted copy of the input data
  // sortedData now contains the sorted copy of the input data with only median values

  var currentBrushSelection;
  var zoomer = d3.zoom().on("zoom", null);
  var dependencies;

  function updateDependencies(depends) {
    dependencies = depends;
  }

  var width = $("#price-per-sqft").width() - 100;
  var height = $("#price-per-sqft").height();
  var main_margin = {
    top: 60,
    right: 10,
    bottom: 30,
    left: 100
  },
      main_width = width - main_margin.left - main_margin.right,
      main_height = height - main_margin.top - main_margin.bottom;
  var mini_margin = {
    top: 60,
    right: 10,
    bottom: 30,
    left: 10
  },
      mini_height = height - mini_margin.top - mini_margin.bottom,
      mini_width = 100 - mini_margin.left - mini_margin.right;

  function chartTitle() {
    if (currentLevel === "listing") {
      return "Living in <strong>".concat(currentCity, "</strong>, <strong>").concat(currentState, "</strong>");
    } else if (currentLevel === "city") {
      return "Living in Cities of <strong>".concat(currentState, "</strong>");
    } else if (currentLevel === "state") {
      return "Living in the <strong>USA</strong>";
    }
  }

  svg = d3.select("#price-per-sqft").append("svg").attr("class", "svgWrapper").attr("width", main_width + main_margin.left + main_margin.right + mini_width + mini_margin.left + mini_margin.right).attr("height", main_height + main_margin.top + main_margin.bottom).call(zoomer).on("wheel.zoom", scroll).on("mousedown.zoom", null).on("touchstart.zoom", null).on("touchmove.zoom", null).on("touchend.zoom", null);
  svg.append("text").attr("x", (main_width + mini_width) / 2 + main_margin.left).attr("y", main_margin.top / 2).attr("id", "price-title") // Corrected to use .attr for setting the class
  .attr("text-anchor", "middle").attr("font-size", "24px").text("Price Per Square Foot Chart");
  var mainGroup = svg.append("g").attr("class", "mainGroupWrapper").attr("transform", "translate(".concat(main_margin.left, ",").concat(main_margin.top, ")")).append("g").attr("clip-path", "url(#clip)").style("clip-path", "url(#clip)").attr("class", "mainGroup");
  mainGroup.append("rect").attr("class", "background-rect").attr("width", main_width).attr("height", main_height).style("fill", "white").style("pointer-events", "all").style("opacity", 0).on("click", function (event) {
    // Your click event logic here
    if (currentLevel === "city") {
      // currentState = d;
      currentLevel = "state";
      dependencies.cityToState();
    } else if (currentLevel === "listing") {
      currentLevel = "city";
      dependencies.updateWhenState();
    }
  }).on("mouseover", function () {
    d3.select(this).style("cursor", "pointer");
  }).on("mouseout", function () {
    d3.select(this).style("cursor", "default");
  });
  var miniGroup = svg.append("g").attr("class", "miniGroup").attr("transform", "translate(".concat(main_margin.left + main_width + main_margin.right + mini_margin.left, ",").concat(mini_margin.top, ")"));
  var brushGroup = svg.append("g").attr("class", "brushGroup").attr("transform", "translate(".concat(main_margin.left + main_width + main_margin.right + mini_margin.left, ",").concat(mini_margin.top, ")")); /////////////////////////////////////////////////////////////
  ////////////////////// Initiate scales //////////////////////
  /////////////////////////////////////////////////////////////

  var main_xScale = d3.scaleLinear().range([0, main_width]);
  var mini_xScale = d3.scaleLinear().range([0, mini_width]);
  var main_yScale = d3.scaleBand().range([0, main_height]).padding(0.4);
  var mini_yScale = d3.scaleBand().range([0, mini_height]).padding(0.4);
  var main_yZoom = d3.scaleLinear().range([0, main_height]).domain([0, main_height]); //Create x axis object

  var main_xAxis = d3.axisBottom(main_xScale).ticks(4).tickSize(0); //Add group for the x axis

  d3.select(".mainGroupWrapper").append("g").attr("class", "price-x-axis").attr("transform", "translate(0,".concat(main_height + 5, ")")); //Create y axis object

  var main_yAxis = d3.axisLeft(main_yScale).tickSize(0); //Add group for the y axis

  mainGroup.append("g").attr("class", "price-y-axis").attr("transform", "translate(-5,0)"); /////////////////////////////////////////////////////////////
  /////////////////////// Update scales ///////////////////////
  /////////////////////////////////////////////////////////////

  defs = svg.append("defs");
  createGradient("gradient-rainbow-main", "60%");
  createGradient("gradient-rainbow-mini", "13%");
  var brush = d3.brushY().on("brush", function (event) {
    //Create two separate gradients for the main and mini bar - just because it looks fun
    brushmove(event, data);
  });
  var gBrush = d3.select(".brushGroup").append("g").attr("class", "brush").call(brush);
  gBrush.selectAll(".resize").append("line").attr("x2", mini_width);
  gBrush.selectAll(".resize").append("path").attr("d", d3.symbol().type(d3.symbolTriangle).size(20)).attr("transform", function (d, i) {
    return i ? "translate(".concat(mini_width / 2, ",4) rotate(180)") : "translate(".concat(mini_width / 2, ",-4) rotate(0)");
  });
  gBrush.selectAll("rect").attr("width", mini_width); //On a click recenter the brush window

  gBrush.select(".overlay").on("mousedown.brush touchstart.brush", brushcenter).on("touchmove", function (event) {
    return event.preventDefault();
  }).on("touchend.brush", brushcenter); //Add the clip path for the main bar chart

  defs.append("clipPath").attr("id", "clip").append("rect").attr("x", -main_margin.left).attr("width", main_width + main_margin.left).attr("height", main_height);
  textScale = d3.scaleLinear().domain([15, 50]).range([12, 6]).clamp(true);
  var brushExtent;
  var calcExtent;

  function updateScales(data) {
    main_xScale.domain([0, d3.max(data, function (d) {
      return d.median;
    })]);
    mini_xScale.domain([0, d3.max(data, function (d) {
      return d.median;
    })]); //   main_yScale.domain(data.map((d) => d.state));
    //   mini_yScale.domain(data.map((d) => d.state));

    main_yScale.domain(data.map(function (d) {
      return d.statename || d.city || d.name;
    }));
    mini_yScale.domain(data.map(function (d) {
      return d.statename || d.city || d.name;
    }));
    d3.select(".mainGroup").select(".price-y-axis").call(main_yAxis);
    d3.select("#dashboard-main-title").transition().duration(500).style("opacity", 0).on("end", function () {
      d3.select(this).html(chartTitle()).style("visibility", "visible").transition().duration(500).style("opacity", 1);
    });
    brush = d3.brushY().on("brush", function (event) {
      brushmove(event, data);
    }); //Set up the visual part of the brush

    if (data.length > 11) {
      brushExtent = Math.max(1, Math.min(20, Math.round(data.length * 0.2)));
      calcExtent = [mini_yScale(data[0].statename || data[0].city || data[0].name), mini_yScale(data[brushExtent].statename || data[brushExtent].city || data[brushExtent].name)];
    } else {
      calcExtent = [mini_yScale(data[0].statename || data[0].city || data[0].name), mini_height];
    } ///////////////////////////////////////////////////////////////////////////
    /////////////////// Create a rainbow gradient - for fun ///////////////////
    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////// Set-up the mini bar chart ///////////////////
    /////////////////////////////////////////////////////////////


    d3.select(".brushGroup").selectAll(".brush").remove();
    gBrush = d3.select(".brushGroup").append("g").attr("class", "brush").call(brush); //The mini brushable bar
    //DATA JOIN

    var mini_bar = d3.select(".miniGroup").selectAll(".bar").data(data, function (d, i) {
      return i;
    }); //UDPATE

    mini_bar.attr("width", function (d) {
      return mini_xScale(d.median);
    }).attr("y", function (d) {
      return mini_yScale(d.statename || d.city || d.name);
    }).attr("height", mini_yScale.bandwidth()); //ENTER

    mini_bar.enter().append("rect").attr("class", "bar").attr("x", 0).attr("width", function (d) {
      return mini_xScale(d.median);
    }).attr("y", function (d) {
      return mini_yScale(d.statename || d.city || d.name);
    }).attr("height", mini_yScale.bandwidth()).style("fill", priceColor1); //EXIT

    mini_bar.exit().remove(); //Start the brush

    gBrush.call(brush.move, calcExtent, data);
  } //Update the scales


  updateScales(data); //Create the visual part of the y axis
  /////////////////////////////////////////////////////////////
  ///////////////////// Label axis scales /////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  ///////////////////////// Create brush //////////////////////
  /////////////////////////////////////////////////////////////
  //What should the first extent of the brush become - a bit arbitrary this

  function highlightSelected(current) {
    d3.selectAll(".mainGroup .bar").style("fill", priceColor1);
    d3.selectAll(".mainGroup .bar").attr("selected-on", "false");
    var selectedBar = d3.selectAll(".mainGroup .bar").filter(function (d, i) {
      return d.id === current.id; // Adjust the condition based on your data structure
    });
    var startindex = mini_yScale(current.name);
    gBrush.call(brush.move, [startindex, startindex + calcExtent[1]]);
    selectedBar.style("fill", priceColor3);
    selectedBar.attr("selected-on", "true");
  }

  var price_tooltip = d3.select("#price-per-sqft").append("div").style("opacity", 0).attr("class", "tooltip").style("background-color", "white").style("border", "solid").style("border-width", "2px").style("border-radius", "5px").style("padding", "5px");

  function updateTooltip(event, d) {
    // d3.select("#radarChart").style("display", "block");
    var xPos = event.pageX - 150; // offset from mouse

    var yPos = event.pageY - 70; // offset from mouse

    price_tooltip.html("<strong>".concat(d.statename || d.city || d.name, "</strong><br/>\n        Price/Sqft Index: ").concat(d.median.toFixed(2))).style("left", xPos + "px").style("top", yPos + "px");
  }

  function update(data) {
    /////////////////////////////////////////////////////////////
    ////////// Update the bars of the main bar chart ////////////
    /////////////////////////////////////////////////////////////
    //DATA JOIN
    var bar = d3.select(".mainGroup").selectAll(".bar").data(data, function (d, i) {
      return i;
    }); //UPDATE

    bar.transition().duration(100).attr("y", function (d) {
      return main_yScale(d.statename || d.city || d.name);
    }).attr("height", main_yScale.bandwidth()).attr("x", 0).duration(50).attr("width", function (d) {
      return main_xScale(d.median);
    }); //ENTER

    bar.enter().append("rect").attr("class", "bar").style("fill", priceColor1).attr("y", function (d) {
      return main_yScale(d.statename || d.city || d.name);
    }).attr("height", main_yScale.bandwidth()).attr("x", 0).attr("selected-on", "false").on("click", function (event, d) {
      if (currentLevel === "state") {
        currentState = d.statename;
        currentLevel = "city";
        dependencies.updateWhenState();
      } else if (currentLevel === "city") {
        currentLevel = "listing";
        currentCity = d.city;
        dependencies.updateWhenCity();
      } else if (currentLevel === "listing") {
        currentListing = d.id;
        dependencies.updateWhenListing();
      }
    }).on("mouseover", function (d) {
      d3.select(this).style("cursor", "pointer");
      d3.select(this).style("fill", priceColor2);
      price_tooltip.style("opacity", 1);
    }).on("mouseout", function (d) {
      d3.select(this).style("cursor", "default");
      d3.select(this).style("fill", function (d) {
        return this.getAttribute("selected-on") === "true" ? priceColor3 : priceColor1;
      }); // d3.select(this).style("fill", "#5886a5");
    }).on("mousemove", function (event, d) {
      updateTooltip(event, d);
    }).on("mouseleave", function (d) {
      price_tooltip.style("opacity", 0);
      price_tooltip.html("");
    }).transition().duration(100).attr("width", function (d) {
      return main_xScale(d.median);
    }); //EXIT

    bar.exit().remove();
  } //update


  function brushmove(event, data) {
    var extent = event.selection;
    currentBrushSelection = event.selection; //Which bars are still "selected"

    var selected = mini_yScale.domain().filter(function (d) {
      return extent[0] - mini_yScale.bandwidth() + 1e-2 <= mini_yScale(d) && mini_yScale(d) <= extent[1] - 1e-2;
    }); //Update the colors of the mini chart - Make everything outside the brush grey

    d3.select(".miniGroup").selectAll(".bar").style("fill", function (d) {
      return selected.includes(d.statename || d.city || d.name) ? priceColor1 : "#e0e0e0";
    }); //Update the label size

    d3.selectAll(".price-y-axis text").style("font-size", textScale(selected.length)); /////////////////////////////////////////////////////////////
    ///////////////////// Update the axes ///////////////////////
    /////////////////////////////////////////////////////////////
    //Reset the part that is visible on the big chart

    var originalRange = main_yZoom.range();
    main_yZoom.domain(extent); //Update the domain of the x & y scale of the big bar chart

    main_yScale.domain(data.map(function (d) {
      return d.statename || d.city || d.name;
    }));
    main_yScale.range([main_yZoom(originalRange[0]), main_yZoom(originalRange[1])], 0.4, 0); //Update the y axis of the big chart

    d3.select(".mainGroup").select(".price-y-axis").call(main_yAxis); //Find the new max of the bars to update the x scale

    var newMaxXScale = d3.max(data, function (d) {
      return selected.includes(d.statename || d.city || d.name) ? d.median : 0;
    });
    main_xScale.domain([0, newMaxXScale]); //Update the x axis of the big chart

    d3.select(".mainGroupWrapper").select(".price-x-axis").transition().duration(50).call(main_xAxis); //Update the big bar chart

    update(data);
  } //brushmove


  function brushcenter(event) {
    var extent = brush.selection;
    var size = extent[1] - extent[0];
    var range = mini_yScale.range();
    var y0 = d3.min(range) + size / 2;
    var y1 = d3.max(range) + mini_yScale.bandwidth() - size / 2;
    var center = Math.max(y0, Math.min(y1, d3.pointers(event, gBrush.node())[0][1]));
    event.stopPropagation();
    gBrush.call(brush.move, [center - size / 2, center + size / 2]);
  } //brushcenter


  function scroll(event) {
    // Mouse scroll on the mini chart
    var extent = currentBrushSelection;
    var size = extent[1] - extent[0];
    var range = mini_yScale.range();
    var y0 = d3.min(range);
    var y1 = d3.max(range) + mini_yScale.bandwidth();
    var dy = event.deltaY;
    var topSection;

    if (extent[0] + dy < y0) {
      topSection = y0;
    } else if (extent[1] + dy > y1) {
      topSection = y1 - size;
    } else {
      topSection = extent[0] + dy;
    } // Make sure the page doesn't scroll as well


    event.stopPropagation();
    event.preventDefault();
    gBrush.call(brush.move, [topSection, topSection + size]).call(brush);
  }

  function createGradient(idName, endPerc) {
    var coloursRainbow = ["#EFB605", "#E9A501", "#E48405", "#E34914", "#DE0D2B", "#CF003E", "#B90050", "#A30F65", "#8E297E", "#724097", "#4F54A8", "#296DA4", "#0C8B8C", "#0DA471", "#39B15E", "#7EB852"];
    defs.append("linearGradient").attr("id", idName).attr("gradientUnits", "userSpaceOnUse").attr("x1", "0%").attr("y1", "0%").attr("x2", endPerc).attr("y2", "0%").selectAll("stop").data(coloursRainbow).enter().append("stop").attr("offset", function (d, i) {
      return i / (coloursRainbow.length - 1);
    }).attr("stop-color", function (d) {
      return d;
    });
  } //createGradient


  return {
    updateScales: updateScales,
    update: update,
    updateDependencies: updateDependencies,
    highlightSelected: highlightSelected,
    groupedData: data
  };
} //init


function initializeAvgCrime(input) {
  var data = input.map(function (stateData) {
    return _objectSpread({}, stateData, {
      cities: stateData.cities.map(function (cityData) {
        return _objectSpread({}, cityData, {
          listings: _toConsumableArray(cityData.listings).sort(function (a, b) {
            return b.avg_crime - a.avg_crime;
          })
        });
      }).sort(function (a, b) {
        return b.avg_crime - a.avg_crime;
      })
    });
  }).sort(function (a, b) {
    return b.avg_crime - a.avg_crime;
  }); // sortedData now contains the sorted copy of the input data

  var zoomer = d3.zoom().on("zoom", null);
  var dependencies;
  var crimeBrushSelection;

  function updateDependencies(depends) {
    dependencies = depends;
  }

  var width = $("#average-crimes").width() - 200;
  var height = $("#average-crimes").height();
  var main_margin = {
    top: 60,
    right: 10,
    bottom: 20,
    left: 200
  },
      main_width = width - main_margin.left - main_margin.right,
      main_height = height - main_margin.top - main_margin.bottom;
  var mini_margin = {
    top: 60,
    right: 0,
    bottom: 20,
    left: 10
  },
      mini_height = height - mini_margin.top - mini_margin.bottom,
      mini_width = 100 - mini_margin.left - mini_margin.right;
  svg = d3.select("#average-crimes").append("svg").attr("class", "crimeSvgWrapper").attr("width", main_width + main_margin.left + main_margin.right + mini_width + mini_margin.left + mini_margin.right).attr("height", main_height + main_margin.top + main_margin.bottom).call(zoomer).on("wheel.zoom", scroll).on("mousedown.zoom", null).on("touchstart.zoom", null).on("touchmove.zoom", null).on("touchend.zoom", null);
  svg.append("text").attr("x", (main_width + mini_width) / 2 + main_margin.left).attr("y", main_margin.top / 2).attr("id", "crime-title") // Corrected to use .attr for setting the class
  .attr("text-anchor", "middle").attr("font-size", "24px").text("Average Crime Chart");
  var mainGroup = svg.append("g").attr("class", "crimeMainGroupWrapper").attr("transform", "translate(".concat(main_margin.left, ",").concat(main_margin.top, ")")).append("g").attr("clip-path", "url(#clip)").style("clip-path", "url(#clip)").attr("class", "crimeMainGroup");
  mainGroup.append("rect").attr("class", "crime-background-rect").attr("width", main_width).attr("height", main_height).style("fill", "white").style("pointer-events", "all").style("opacity", 0).on("click", function (event) {
    // Your click event logic here
    if (currentLevel === "city" || "listing") {
      // currentState = d;
      currentLevel = "state";
      dependencies.cityToState();
    }
  }).on("mouseover", function () {
    d3.select(this).style("cursor", "pointer");
  }).on("mouseout", function () {
    d3.select(this).style("cursor", "default");
  });
  var miniGroup = svg.append("g").attr("class", "crimeMiniGroup").attr("transform", "translate(".concat(main_margin.left + main_width + main_margin.right + mini_margin.left, ",").concat(mini_margin.top, ")"));
  var brushGroup = svg.append("g").attr("class", "crimeBrushGroup").attr("transform", "translate(".concat(main_margin.left + main_width + main_margin.right + mini_margin.left, ",").concat(mini_margin.top, ")")); /////////////////////////////////////////////////////////////
  ////////////////////// Initiate scales //////////////////////
  /////////////////////////////////////////////////////////////

  var main_xScale = d3.scaleLinear().range([0, main_width]);
  var mini_xScale = d3.scaleLinear().range([0, mini_width]);
  var main_yScale = d3.scaleBand().range([0, main_height]).padding(0.4);
  var mini_yScale = d3.scaleBand().range([0, mini_height]).padding(0.4);
  var main_yZoom = d3.scaleLinear().range([0, main_height]).domain([0, main_height]); //Create x axis object

  var main_xAxis = d3.axisBottom(main_xScale).ticks(4).tickSize(0); //Add group for the x axis

  d3.select(".crimeMainGroupWrapper").append("g").attr("class", "crime-x-axis").attr("transform", "translate(0,".concat(main_height + 5, ")")); //Create y axis object

  var main_yAxis = d3.axisLeft(main_yScale).tickSize(0); //Add group for the y axis

  mainGroup.append("g").attr("class", "crime-y-axis").attr("transform", "translate(-5,0)"); /////////////////////////////////////////////////////////////
  /////////////////////// Update scales ///////////////////////
  /////////////////////////////////////////////////////////////

  defs = svg.append("defs");
  createGradient("gradient-rainbow-main", "60%");
  createGradient("gradient-rainbow-mini", "13%");
  var crimeBrush = d3.brushY().on("brush", function (event) {
    //Create two separate gradients for the main and mini bar - just because it looks fun
    crimeBrushmove(event, data);
  });
  var gCrimeBrush = d3.select(".crimeBrushGroup").append("g").attr("class", "crimeBrush").call(crimeBrush);
  gCrimeBrush.selectAll(".resize").append("line").attr("x2", mini_width);
  gCrimeBrush.selectAll(".resize").append("path").attr("d", d3.symbol().type(d3.symbolTriangle).size(20)).attr("transform", function (d, i) {
    return i ? "translate(".concat(mini_width / 2, ",4) rotate(180)") : "translate(".concat(mini_width / 2, ",-4) rotate(0)");
  });
  gCrimeBrush.selectAll("rect").attr("width", mini_width); //On a click recenter the brush window

  gCrimeBrush.select(".overlay").on("mousedown.brush touchstart.brush", crimeBrushcenter).on("touchmove", function (event) {
    return event.preventDefault();
  }).on("touchend.brush", crimeBrushcenter); //Add the clip path for the main bar chart

  defs.append("clipPath").attr("id", "clip").append("rect").attr("x", -main_margin.left).attr("width", main_width + main_margin.left).attr("height", main_height);
  textScale = d3.scaleLinear().domain([15, 50]).range([12, 6]).clamp(true);
  var brushExtent;
  var calcExtent;

  function updateScales(data) {
    main_xScale.domain([0, d3.max(data, function (d) {
      return d.avg_crime;
    })]);
    mini_xScale.domain([0, d3.max(data, function (d) {
      return d.avg_crime;
    })]); //   main_yScale.domain(data.map((d) => d.state));
    //   mini_yScale.domain(data.map((d) => d.state));

    main_yScale.domain(data.map(function (d) {
      return d.statename || d.city || d.name;
    }));
    mini_yScale.domain(data.map(function (d) {
      return d.statename || d.city || d.name;
    }));
    d3.select(".crimeMainGroup").select(".crime-y-axis").call(main_yAxis);
    crimeBrush = d3.brushY().on("brush", function (event) {
      crimeBrushmove(event, data);
    }); //Set up the visual part of the brush

    if (data.length > 11) {
      brushExtent = Math.max(1, Math.min(20, Math.round(data.length * 0.2)));
      calcExtent = [mini_yScale(data[0].statename || data[0].city || data[0].name), mini_yScale(data[brushExtent].statename || data[brushExtent].city || data[brushExtent].name)];
    } else {
      calcExtent = [mini_yScale(data[0].statename || data[0].city || data[0].name), mini_height];
    } ///////////////////////////////////////////////////////////////////////////
    /////////////////// Create a rainbow gradient - for fun ///////////////////
    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////// Set-up the mini bar chart ///////////////////
    /////////////////////////////////////////////////////////////


    d3.select(".crimeBrushGroup").selectAll(".crimeBrush").remove();
    gCrimeBrush = d3.select(".crimeBrushGroup").append("g").attr("class", "crimeBrush").call(crimeBrush); //The mini brushable bar
    //DATA JOIN

    var mini_bar = d3.select(".crimeMiniGroup").selectAll(".bar").data(data, function (d, i) {
      return i;
    }); //UDPATE

    mini_bar.attr("width", function (d) {
      return mini_xScale(d.avg_crime);
    }).attr("y", function (d) {
      return mini_yScale(d.statename || d.city || d.name);
    }).attr("height", mini_yScale.bandwidth()); //ENTER

    mini_bar.enter().append("rect").attr("class", "bar").attr("x", 0).attr("width", function (d) {
      return mini_xScale(d.avg_crime);
    }).attr("y", function (d) {
      return mini_yScale(d.statename || d.city || d.name);
    }).attr("height", mini_yScale.bandwidth()).style("fill", socialColor1); //EXIT

    mini_bar.exit().remove(); //Start the brush

    gCrimeBrush.call(crimeBrush.move, calcExtent, data);
  } //Update the scales


  updateScales(data); //Create the visual part of the y axis
  /////////////////////////////////////////////////////////////
  ///////////////////// Label axis scales /////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  ///////////////////////// Create brush //////////////////////
  /////////////////////////////////////////////////////////////
  //What should the first extent of the brush become - a bit arbitrary this

  function highlightSelected(current) {
    d3.selectAll(".crimeMainGroup .bar").style("fill", socialColor1);
    d3.selectAll(".crimeMainGroup .bar").attr("selected-on", "false");
    var selectedBar = d3.selectAll(".crimeMainGroup .bar").filter(function (d, i) {
      return d.city === current.city; // Adjust the condition based on your data structure
    });
    var startindex = mini_yScale(current.city);
    gCrimeBrush.call(crimeBrush.move, [startindex, startindex + calcExtent[1]]);
    selectedBar.style("fill", socialColor3);
    selectedBar.attr("selected-on", "true");
  }

  var crime_tooltip = d3.select("#average-crimes").append("div").style("opacity", 0).attr("class", "tooltip").attr("id", "crime-tooltip").style("background-color", "white").style("border", "solid").style("border-width", "2px").style("border-radius", "5px").style("padding", "5px");

  function updateTooltip(event, d) {
    // d3.select("#radarChart").style("display", "block");
    crime_tooltip.append("div").attr("class", "radar-chart").style("width", "100%").style("height", "100%");
    var xPos = event.pageX - 140; // offset from mouse

    var yPos = event.pageY - 70; // offset from mouse

    var _prepareRadarData = prepareRadarData(d),
        radarData = _prepareRadarData.radarData,
        maxCrimeValue = _prepareRadarData.maxCrimeValue;

    var radarChartOptions = {
      w: 200,
      h: 180,
      margin: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
      },
      levels: 5,
      roundStrokes: true,
      color: d3.scaleOrdinal().range(["#EDC951"]),
      labelFactor: 1.25,
      wrapWidth: 60,
      opacityArea: 0.35,
      dotRadius: 4,
      opacityCircles: 0.1,
      strokeWidth: 2,
      maxValue: maxCrimeValue //What is the value that the biggest circle will represent

    };
    crime_tooltip.select(".radar-chart").html(""); // Append the text information to the radar-chart div

    crime_tooltip.select(".radar-chart").append("div").html("<strong>".concat(d.statename || d.city || d.name, "</strong><br/>\n        Crime Index: ").concat(d.avg_crime.toFixed(2))).style("text-align", "center").style("margin-bottom", "10px");
    RadarChart(".radar-chart", radarData, radarChartOptions); // crime_tooltip.style("left", xPos + "px").style("top", yPos + "px");

    var tooltipNode = crime_tooltip.node();
    var tooltipWidth = tooltipNode.offsetWidth;
    var tooltipHeight = tooltipNode.offsetHeight + 40; // Get the viewport dimensions

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight; // Adjust the tooltip position if it exceeds the viewport boundaries

    if (xPos + tooltipWidth > windowWidth) {
      xPos = windowWidth - tooltipWidth - 200;
    }

    if (yPos + tooltipHeight > windowHeight) {
      yPos = windowHeight - tooltipHeight - 10;
    }

    if (xPos < 0) {
      xPos = 10;
    }

    if (yPos < 0) {
      yPos = 10;
    }

    crime_tooltip.style("left", xPos + "px").style("top", yPos + "px");
  }

  function prepareRadarData(d) {
    var radarData = [[{
      axis: "Violent Crime",
      value: d.violent_crime
    }, // { axis: "Arson", value: d.arson_crime },
    {
      axis: "Assault",
      value: d.assault_crime
    }, {
      axis: "Auto Theft",
      value: d.gta_crime
    }, {
      axis: "Burglary",
      value: d.burg_crime
    }, // { axis: "Larceny", value: d.larc_crime },
    // { axis: "Murder", value: d.murder_crime },
    // { axis: "Non-violent", value: d.nonviolent_crime },
    {
      axis: "Rape",
      value: d.rape_crime
    }, {
      axis: "Robbery",
      value: d.robbery_crime
    }]];
    var maxCrimeValue = d.max_crime;
    return {
      radarData: radarData,
      maxCrimeValue: maxCrimeValue
    };
  }

  function update(data) {
    /////////////////////////////////////////////////////////////
    ////////// Update the bars of the main bar chart ////////////
    /////////////////////////////////////////////////////////////
    //DATA JOIN
    var bar = d3.select(".crimeMainGroup").selectAll(".bar").data(data, function (d, i) {
      return i;
    }); //UPDATE

    bar.attr("y", function (d) {
      return main_yScale(d.statename || d.city || d.name);
    }).attr("height", main_yScale.bandwidth()).attr("x", 0).transition().duration(50).attr("width", function (d) {
      return main_xScale(d.avg_crime);
    }); //ENTER

    bar.enter().append("rect").attr("class", "bar").style("fill", socialColor1).attr("y", function (d) {
      return main_yScale(d.statename || d.city || d.name);
    }).attr("height", main_yScale.bandwidth()).attr("x", 0).attr("selected-on", "false").on("click", function (event, d) {
      if (currentLevel === "state") {
        currentState = d.statename;
        currentLevel = "city";
        dependencies.updateWhenState();
      } else if (currentLevel === "city" || "listing") {
        currentLevel = "listing";
        currentCity = d.city;
        dependencies.updateWhenCity();
      }
    }).on("mouseover", function (d) {
      d3.select(this).style("cursor", "pointer");
      d3.select(this).style("fill", socialColor2);
      crime_tooltip.style("opacity", 1);
      d3.selectAll(".radar-chart").style("opacity", 1); // d3.selectAll("#crime-tooltip")
      // .style("width", "320px")
      // .style("height", "360px");
    }).on("mouseout", function (d) {
      d3.select(this).style("cursor", "default");
      d3.select(this).style("fill", function (d) {
        return this.getAttribute("selected-on") === "true" ? socialColor3 : socialColor1;
      }); // d3.select(this).style("fill", "#5886a5");
    }).on("mousemove", function (event, d) {
      updateTooltip(event, d);
    }).on("mouseleave", function (d) {
      crime_tooltip.style("opacity", 0);
      d3.selectAll(".radar-chart").remove(); // d3.selectAll("#crime-tooltip")
      //   .style("width", "0px")
      //   .style("height", "0px");
    }).transition().duration(50).attr("width", function (d) {
      return main_xScale(d.avg_crime);
    }); //EXIT

    bar.exit().remove();
  } //update


  function crimeBrushmove(event, data) {
    var extent = event.selection;
    crimeBrushSelection = event.selection; //Which bars are still "selected"

    var selected = mini_yScale.domain().filter(function (d) {
      return extent[0] - mini_yScale.bandwidth() + 1e-2 <= mini_yScale(d) && mini_yScale(d) <= extent[1] - 1e-2;
    }); //Update the colors of the mini chart - Make everything outside the brush grey

    d3.select(".crimeMiniGroup").selectAll(".bar").style("fill", function (d) {
      return selected.includes(d.statename || d.city || d.name) ? socialColor1 : "#e0e0e0";
    }); //Update the label size

    d3.selectAll(".crime-y-axis text").style("font-size", textScale(selected.length)); /////////////////////////////////////////////////////////////
    ///////////////////// Update the axes ///////////////////////
    /////////////////////////////////////////////////////////////
    //Reset the part that is visible on the big chart

    var originalRange = main_yZoom.range();
    main_yZoom.domain(extent); //Update the domain of the x & y scale of the big bar chart

    main_yScale.domain(data.map(function (d) {
      return d.statename || d.city || d.name;
    }));
    main_yScale.range([main_yZoom(originalRange[0]), main_yZoom(originalRange[1])], 0.4, 0); //Update the y axis of the big chart

    d3.select(".crimeMainGroup").select(".crime-y-axis").call(main_yAxis); //Find the new max of the bars to update the x scale

    var newMaxXScale = d3.max(data, function (d) {
      return selected.includes(d.statename || d.city || d.name) ? d.avg_crime : 0;
    });
    main_xScale.domain([0, newMaxXScale]); //Update the x axis of the big chart

    d3.select(".crimeMainGroupWrapper").select(".crime-x-axis").transition().duration(50).call(main_xAxis); //Update the big bar chart

    update(data);
  } //brushmove


  function crimeBrushcenter(event) {
    var extent = crimeBrush.selection;
    var size = extent[1] - extent[0];
    var range = mini_yScale.range();
    var y0 = d3.min(range) + size / 2;
    var y1 = d3.max(range) + mini_yScale.bandwidth() - size / 2;
    var center = Math.max(y0, Math.min(y1, d3.pointers(event, gBrush.node())[0][1]));
    event.stopPropagation();
    gCrimeBrush.call(crimeBrush.move, [center - size / 2, center + size / 2]);
  } //brushcenter


  function scroll(event) {
    // Mouse scroll on the mini chart
    var extent = crimeBrushSelection;
    var size = extent[1] - extent[0];
    var range = mini_yScale.range();
    var y0 = d3.min(range);
    var y1 = d3.max(range) + mini_yScale.bandwidth();
    var dy = event.deltaY;
    var topSection;

    if (extent[0] + dy < y0) {
      topSection = y0;
    } else if (extent[1] + dy > y1) {
      topSection = y1 - size;
    } else {
      topSection = extent[0] + dy;
    } // Make sure the page doesn't scroll as well


    event.stopPropagation();
    event.preventDefault();
    gCrimeBrush.call(crimeBrush.move, [topSection, topSection + size]).call(crimeBrush);
  }

  function createGradient(idName, endPerc) {
    var coloursRainbow = ["#EFB605", "#E9A501", "#E48405", "#E34914", "#DE0D2B", "#CF003E", "#B90050", "#A30F65", "#8E297E", "#724097", "#4F54A8", "#296DA4", "#0C8B8C", "#0DA471", "#39B15E", "#7EB852"];
    defs.append("linearGradient").attr("id", idName).attr("gradientUnits", "userSpaceOnUse").attr("x1", "0%").attr("y1", "0%").attr("x2", endPerc).attr("y2", "0%").selectAll("stop").data(coloursRainbow).enter().append("stop").attr("offset", function (d, i) {
      return i / (coloursRainbow.length - 1);
    }).attr("stop-color", function (d) {
      return d;
    });
  } //createGradient


  return {
    updateScales: updateScales,
    update: update,
    updateDependencies: updateDependencies,
    highlightSelected: highlightSelected,
    groupedData: data
  };
} //init


function initializeSumPet(input) {
  var data = input.map(function (stateData) {
    return _objectSpread({}, stateData, {
      cities: stateData.cities.map(function (cityData) {
        return _objectSpread({}, cityData, {
          listings: _toConsumableArray(cityData.listings).sort(function (a, b) {
            return b.medFamInc - a.medFamInc;
          })
        });
      }).sort(function (a, b) {
        return b.medFamInc - a.medFamInc;
      })
    });
  }).sort(function (a, b) {
    return b.medFamInc - a.medFamInc;
  }); // sortedData now contains the sorted copy of the input data

  var zoomer = d3.zoom().on("zoom", null);
  var dependencies;

  function updateDependencies(depends) {
    dependencies = depends;
  }

  var width = $("#average-crimes").width() - 200;
  var height = $("#average-crimes").height();
  var main_margin = {
    top: 60,
    right: 10,
    bottom: 20,
    left: 200
  },
      main_width = width - main_margin.left - main_margin.right,
      main_height = height - main_margin.top - main_margin.bottom;
  var mini_margin = {
    top: 60,
    right: 0,
    bottom: 20,
    left: 10
  },
      mini_height = height - mini_margin.top - mini_margin.bottom,
      mini_width = 100 - mini_margin.left - mini_margin.right;
  svg = d3.select("#pet-friendly").append("svg").attr("class", "petSvgWrapper").attr("width", main_width + main_margin.left + main_margin.right + mini_width + mini_margin.left + mini_margin.right).attr("height", main_height + main_margin.top + main_margin.bottom).call(zoomer).on("wheel.zoom", scroll).on("mousedown.zoom", null).on("touchstart.zoom", null).on("touchmove.zoom", null).on("touchend.zoom", null);
  svg.append("text").attr("x", (main_width + mini_width) / 2 + main_margin.left).attr("y", main_margin.top / 2).attr("id", "pet-title") // Corrected to use .attr for setting the class
  .attr("text-anchor", "middle").attr("font-size", "24px").text("Median Family Income Chart");
  var mainGroup = svg.append("g").attr("class", "petMainGroupWrapper").attr("transform", "translate(".concat(main_margin.left, ",").concat(main_margin.top, ")")).append("g").attr("clip-path", "url(#clip)").style("clip-path", "url(#clip)").attr("class", "petMainGroup");
  mainGroup.append("rect").attr("class", "pet-background-rect").attr("width", main_width).attr("height", main_height).style("fill", "white").style("pointer-events", "all").style("opacity", 0).on("click", function (event) {
    // Your click event logic here
    if (currentLevel === "city" || "listing") {
      // currentState = d;
      currentLevel = "state";
      dependencies.cityToState();
    }
  }).on("mouseover", function () {
    d3.select(this).style("cursor", "pointer");
  }).on("mouseout", function () {
    d3.select(this).style("cursor", "default");
  });
  var miniGroup = svg.append("g").attr("class", "petMiniGroup").attr("transform", "translate(".concat(main_margin.left + main_width + main_margin.right + mini_margin.left, ",").concat(mini_margin.top, ")"));
  var brushGroup = svg.append("g").attr("class", "petBrushGroup").attr("transform", "translate(".concat(main_margin.left + main_width + main_margin.right + mini_margin.left, ",").concat(mini_margin.top, ")")); /////////////////////////////////////////////////////////////
  ////////////////////// Initiate scales //////////////////////
  /////////////////////////////////////////////////////////////

  var main_xScale = d3.scaleLinear().range([0, main_width]);
  var mini_xScale = d3.scaleLinear().range([0, mini_width]);
  var main_yScale = d3.scaleBand().range([0, main_height]).padding(0.4);
  var mini_yScale = d3.scaleBand().range([0, mini_height]).padding(0.4);
  main_yZoom = d3.scaleLinear().range([0, main_height]).domain([0, main_height]); //Create x axis object

  main_xAxis = d3.axisBottom(main_xScale).ticks(4).tickSize(0); //Add group for the x axis

  d3.select(".petMainGroupWrapper").append("g").attr("class", "pet-x-axis").attr("transform", "translate(0,".concat(main_height + 5, ")")); //Create y axis object

  main_yAxis = d3.axisLeft(main_yScale).tickSize(0); //Add group for the y axis

  mainGroup.append("g").attr("class", "pet-y-axis").attr("transform", "translate(-5,0)"); /////////////////////////////////////////////////////////////
  /////////////////////// Update scales ///////////////////////
  /////////////////////////////////////////////////////////////

  defs = svg.append("defs");
  createGradient("gradient-rainbow-main", "60%");
  createGradient("gradient-rainbow-mini", "13%");
  var brush = d3.brushY().on("brush", function (event) {
    //Create two separate gradients for the main and mini bar - just because it looks fun
    brushmove(event, data);
  });
  var gBrush = d3.select(".petBrushGroup").append("g").attr("class", "petBrush").call(brush);
  gBrush.selectAll(".resize").append("line").attr("x2", mini_width);
  gBrush.selectAll(".resize").append("path").attr("d", d3.symbol().type(d3.symbolTriangle).size(20)).attr("transform", function (d, i) {
    return i ? "translate(".concat(mini_width / 2, ",4) rotate(180)") : "translate(".concat(mini_width / 2, ",-4) rotate(0)");
  });
  gBrush.selectAll("rect").attr("width", mini_width); //On a click recenter the brush window

  gBrush.select(".overlay").on("mousedown.brush touchstart.brush", brushcenter).on("touchmove", function (event) {
    return event.preventDefault();
  }).on("touchend.brush", brushcenter); //Add the clip path for the main bar chart

  defs.append("clipPath").attr("id", "clip").append("rect").attr("x", -main_margin.left).attr("width", main_width + main_margin.left).attr("height", main_height);
  textScale = d3.scaleLinear().domain([15, 50]).range([12, 6]).clamp(true);
  var brushExtent;
  var calcExtent;

  function updateScales(data) {
    main_xScale.domain([0, d3.max(data, function (d) {
      return d.medFamInc;
    })]);
    mini_xScale.domain([0, d3.max(data, function (d) {
      return d.medFamInc;
    })]); //   main_yScale.domain(data.map((d) => d.state));
    //   mini_yScale.domain(data.map((d) => d.state));

    main_yScale.domain(data.map(function (d) {
      return d.statename || d.city || d.name;
    }));
    mini_yScale.domain(data.map(function (d) {
      return d.statename || d.city || d.name;
    }));
    d3.select(".petMainGroup").select(".pet-y-axis").call(main_yAxis);
    brush = d3.brushY().on("brush", function (event) {
      brushmove(event, data);
    }); //Set up the visual part of the brush

    if (data.length > 11) {
      brushExtent = Math.max(1, Math.min(20, Math.round(data.length * 0.2)));
      calcExtent = [mini_yScale(data[0].statename || data[0].city || data[0].name), mini_yScale(data[brushExtent].statename || data[brushExtent].city || data[brushExtent].name)];
    } else {
      calcExtent = [mini_yScale(data[0].statename || data[0].city || data[0].name), mini_height];
    } ///////////////////////////////////////////////////////////////////////////
    /////////////////// Create a rainbow gradient - for fun ///////////////////
    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////// Set-up the mini bar chart ///////////////////
    /////////////////////////////////////////////////////////////


    d3.select(".petBrushGroup").selectAll(".petBrush").remove();
    gBrush = d3.select(".petBrushGroup").append("g").attr("class", "petBrush").call(brush); //The mini brushable bar
    //DATA JOIN

    var mini_bar = d3.select(".petMiniGroup").selectAll(".bar").data(data, function (d, i) {
      return i;
    }); //UDPATE

    mini_bar.attr("width", function (d) {
      return mini_xScale(d.medFamInc);
    }).attr("y", function (d) {
      return mini_yScale(d.statename || d.city || d.name);
    }).attr("height", mini_yScale.bandwidth()); //ENTER

    mini_bar.enter().append("rect").attr("class", "bar").attr("x", 0).attr("width", function (d) {
      return mini_xScale(d.medFamInc);
    }).attr("y", function (d) {
      return mini_yScale(d.statename || d.city || d.name);
    }).attr("height", mini_yScale.bandwidth()).style("fill", socialColor1); //EXIT

    mini_bar.exit().remove(); //Start the brush

    gBrush.call(brush.move, calcExtent, data);
  } //Update the scales


  updateScales(data); //Create the visual part of the y axis
  /////////////////////////////////////////////////////////////
  ///////////////////// Label axis scales /////////////////////
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  ///////////////////////// Create brush //////////////////////
  /////////////////////////////////////////////////////////////
  //What should the first extent of the brush become - a bit arbitrary this

  function highlightSelected(current) {
    d3.selectAll(".petMainGroup .bar").style("fill", socialColor1);
    d3.selectAll(".petMainGroup .bar").attr("selected-on", "false");
    var selectedBar = d3.selectAll(".petMainGroup .bar").filter(function (d, i) {
      return d.city === current.city; // Adjust the condition based on your data structure
    });
    var startindex = mini_yScale(current.city);
    gBrush.call(brush.move, [startindex, startindex + calcExtent[1]]);
    selectedBar.style("fill", socialColor3);
    selectedBar.attr("selected-on", "true");
  }

  var pet_tooltip = d3.select("#price-per-sqft").append("div").style("opacity", 0).attr("class", "tooltip").style("background-color", "white").style("border", "solid").style("border-width", "2px").style("border-radius", "5px").style("padding", "5px");

  function updateTooltip(event, d) {
    // d3.select("#radarChart").style("display", "block");
    var xPos = event.pageX - 150; // offset from mouse

    var yPos = event.pageY - 70; // offset from mouse

    pet_tooltip.html("<strong>".concat(d.statename || d.city || d.name, "</strong><br/>\n\n        Median Family Income Index: ").concat(d.medFamInc.toFixed(2))).style("left", xPos + "px").style("top", yPos + "px");
  }

  function update(data) {
    /////////////////////////////////////////////////////////////
    ////////// Update the bars of the main bar chart ////////////
    /////////////////////////////////////////////////////////////
    //DATA JOIN
    var bar = d3.select(".petMainGroup").selectAll(".bar").data(data, function (d, i) {
      return i;
    }); //UPDATE

    bar.attr("y", function (d) {
      return main_yScale(d.statename || d.city || d.name);
    }).attr("height", main_yScale.bandwidth()).attr("x", 0).transition().duration(50).attr("width", function (d) {
      return main_xScale(d.medFamInc);
    }); //ENTER

    bar.enter().append("rect").attr("class", "bar").style("fill", socialColor1).attr("y", function (d) {
      return main_yScale(d.statename || d.city || d.name);
    }).attr("height", main_yScale.bandwidth()).attr("x", 0).attr("selected-on", "false").on("click", function (event, d) {
      if (currentLevel === "state") {
        currentState = d.statename;
        currentLevel = "city";
        dependencies.updateWhenState();
      } else if (currentLevel === "city" || "listing") {
        currentLevel = "listing";
        currentCity = d.city;
        dependencies.updateWhenCity();
      }
    }).on("mouseover", function (d) {
      d3.select(this).style("cursor", "pointer");
      d3.select(this).style("fill", socialColor2);
      pet_tooltip.style("opacity", 1); // pet_tooltip.style("width", "");
      // pet_tooltip.style("height", "100%");
    }).on("mouseout", function (d) {
      d3.select(this).style("cursor", "default");
      d3.select(this).style("fill", function (d) {
        return this.getAttribute("selected-on") === "true" ? socialColor3 : socialColor1;
      }); // d3.select(this).style("fill", "#5886a5");
    }).on("mousemove", function (event, d) {
      updateTooltip(event, d);
    }).on("mouseleave", function (d) {
      pet_tooltip.style("opacity", 0);
      pet_tooltip.html(""); // pet_tooltip.style("width", 0);
      // pet_tooltip.style("height", 0);
    }).transition().duration(50).attr("width", function (d) {
      return main_xScale(d.medFamInc);
    }); //EXIT

    bar.exit().remove();
  } //update


  function brushmove(event, data) {
    var extent = event.selection;
    currentBrushSelection = event.selection; //Which bars are still "selected"

    var selected = mini_yScale.domain().filter(function (d) {
      return extent[0] - mini_yScale.bandwidth() + 1e-2 <= mini_yScale(d) && mini_yScale(d) <= extent[1] - 1e-2;
    }); //Update the colors of the mini chart - Make everything outside the brush grey

    d3.select(".petMiniGroup").selectAll(".bar").style("fill", function (d) {
      return selected.includes(d.statename || d.city || d.name) ? socialColor1 : "#e0e0e0";
    }); //Update the label size

    d3.selectAll(".pet-y-axis text").style("font-size", textScale(selected.length)); /////////////////////////////////////////////////////////////
    ///////////////////// Update the axes ///////////////////////
    /////////////////////////////////////////////////////////////
    //Reset the part that is visible on the big chart

    var originalRange = main_yZoom.range();
    main_yZoom.domain(extent); //Update the domain of the x & y scale of the big bar chart

    main_yScale.domain(data.map(function (d) {
      return d.statename || d.city || d.name;
    }));
    main_yScale.range([main_yZoom(originalRange[0]), main_yZoom(originalRange[1])], 0.4, 0); //Update the y axis of the big chart

    d3.select(".petMainGroup").select(".pet-y-axis").call(main_yAxis); //Find the new max of the bars to update the x scale

    var newMaxXScale = d3.max(data, function (d) {
      return selected.includes(d.statename || d.city || d.name) ? d.medFamInc : 0;
    });
    main_xScale.domain([0, newMaxXScale]); //Update the x axis of the big chart

    d3.select(".petMainGroupWrapper").select(".pet-x-axis").transition().duration(50).call(main_xAxis); //Update the big bar chart

    update(data);
  } //brushmove


  function brushcenter(event) {
    var extent = brush.selection;
    var size = extent[1] - extent[0];
    var range = mini_yScale.range();
    var y0 = d3.min(range) + size / 2;
    var y1 = d3.max(range) + mini_yScale.bandwidth() - size / 2;
    var center = Math.max(y0, Math.min(y1, d3.pointers(event, gBrush.node())[0][1]));
    event.stopPropagation();
    gBrush.call(brush.move, [center - size / 2, center + size / 2]);
  } //brushcenter


  function scroll(event) {
    // Mouse scroll on the mini chart
    var extent = currentBrushSelection;
    var size = extent[1] - extent[0];
    var range = mini_yScale.range();
    var y0 = d3.min(range);
    var y1 = d3.max(range) + mini_yScale.bandwidth();
    var dy = event.deltaY;
    var topSection;

    if (extent[0] + dy < y0) {
      topSection = y0;
    } else if (extent[1] + dy > y1) {
      topSection = y1 - size;
    } else {
      topSection = extent[0] + dy;
    } // Make sure the page doesn't scroll as well


    event.stopPropagation();
    event.preventDefault();
    gBrush.call(brush.move, [topSection, topSection + size]).call(brush);
  }

  function createGradient(idName, endPerc) {
    var coloursRainbow = ["#EFB605", "#E9A501", "#E48405", "#E34914", "#DE0D2B", "#CF003E", "#B90050", "#A30F65", "#8E297E", "#724097", "#4F54A8", "#296DA4", "#0C8B8C", "#0DA471", "#39B15E", "#7EB852"];
    defs.append("linearGradient").attr("id", idName).attr("gradientUnits", "userSpaceOnUse").attr("x1", "0%").attr("y1", "0%").attr("x2", endPerc).attr("y2", "0%").selectAll("stop").data(coloursRainbow).enter().append("stop").attr("offset", function (d, i) {
      return i / (coloursRainbow.length - 1);
    }).attr("stop-color", function (d) {
      return d;
    });
  } //createGradient


  return {
    updateScales: updateScales,
    update: update,
    updateDependencies: updateDependencies,
    highlightSelected: highlightSelected,
    groupedData: data
  };
} //init