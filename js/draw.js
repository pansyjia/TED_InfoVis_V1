document.addEventListener('DOMContentLoaded', function () {


  //var width = 900;  //declares width of container variable and assigns it a value of 960
  //var height = 600; //declares height of container variable and assigns it value of 100
  //var rectWidth = 15;       //sets rectWidth variable to be 20
  
  var data = [];
  var talk_categories = ["art"];
  var list = "";
  var selectValue = "3d printing";
  
  $(document).ready(function () {
      console.log("yo");
      loadData();
  });
  
  // Loads the CSV file 
  function loadData() {
       console.log("HEY"); 
      // load the csv file    
      // assign it to the data variable
      d3.csv("data/ted_clean.csv", function (d) {       
              data = d;  
              data.sort(function(x, y){ //sort the talks by views
                return d3.ascending(y.views);
             }) 
              data.forEach(function(d,i)  //loop through data rows
              {
                var category = d['tags'].split(',')[0].toLowerCase(); //get category
                if (talk_categories.includes(category) == false) 
                {
                  talk_categories.push(category);
                  //add category to "talk categories" array if not already there
                }
              });
              setDropdownOptions(data); //set categories to be the dropdown options in the HTML
              console.log(selectValue);
              selectValue = d3.select('select').property('value');
              d3.select('#list').html("");
              console.log(selectValue);
              d3.select('#list')
              .append('p')
              // .text(function() { return getTopTalks(selectValue, data); });
              .html(getTopTalks(selectValue, data));
              //console.log(talk_categories[0]);
             // console.log(getTopTalks('art',data));
              
          });
  
  
  }
  
  
  
  function getTopTalks(category, data)
  {
    console.log(category);

    list = "";
    var counter = 0;
    var item_array = [];
    data.forEach(function(d,i)
      {
        //FORMATTING NEEDED HERE!!!!///
        if (d['tags'].split(',')[0] == category && counter <= 2) //if there is a match, display link & tite of talk
        {
          list += '<br>';
          list += ("<b>Title:</b> " + (d['title']));
        list += '<br>';
          list += (" <b>Speaker:</b> " + d['main_speaker']);
        list += '<br>';
          list += (" <b>Views:</b> " + d['views']);
        list += '<br>';
          list += (" <a href= " + d['url'] + ">Click to Watch</a>");
        list += '<br>';

        var bar_data = [{key: "Beautiful", value:d['Beautiful']},{key: "Beautiful", value:d['Beautiful']},{key: "Beautiful", value:d['Beautiful']}]

       

      //   function groupDataByYear() {
      //     var groupedData = d3.nest()
      //         .key(function (d) { return d.year })
      //         .rollup(function (v) { return d3.sum(v, function (d) { return d.n; }) })
      //         .entries(data);
      //     return groupedData;
      // }
        ///14 ratings
    //     list += '<br>';
    //     list += ("<b>Beautiful:</b> " + (d['Beautiful']));
    //   list += '<br>';
    //     list += (" <b>Confusing:</b> " + d['Confusing']);
    //   list += '<br>';
    //     list += (" <b>Courageous:</b> " + d['Courageous']);
    //   list += '<br>';
    //     list += (" <b>Fascinating:</b> " + d['Fascinating']);
    //   list += '<br>';

    //   list += '<br>';
    //   list += ("<b>Funny:</b> " + (d['Funny']));
    // list += '<br>';
    //   list += (" <b>Informative:</b> " + d['Informative']);
    // list += '<br>';
    //   list += (" <b>Ingenious:</b> " + d['Ingenious']);
    // list += '<br>';
    //   list += (" <b>Inspiring:</b> " + d['Inspiring']);
    // list += '<br>';

    // list += '<br>';
    //     list += ("<b>Jaw-dropping:</b> " + (d['Jaw-dropping']));
    //   list += '<br>';
    //     list += (" <b>Longwinded:</b> " + d['Longwinded']);
    //   list += '<br>';
    //     list += (" <b>OK:</b> " + d['OK']);
    //   list += '<br>';
    //     list += (" <b>Obnoxious:</b> " + d['Obnoxious']);
    //   list += '<br>';
    //   list += '<br>';
    //   list += (" <b>Persuasive:</b> " + d['Persuasive']);
    // list += '<br>';
    //   list += (" <b>Unconvincing:</b> " + d['Unconvincing']);
    // list += '<br>';




    console.log("test data:" + bar_data)

        item_array.push(list);
        counter += 1;
        }

      });
      
      
              return list;
            
  }


  

  
  function setDropdownOptions(data)
  {
    //talk_categories.toLowerCase(); //make it all lower case
    talk_categories.sort(); //make alphabetical
    talk_categories.shift();
    talk_categories.shift();
    talk_categories.shift();
    talk_categories.shift();
    console.log(talk_categories);
  
  var select = d3.select('#container') 
    .append('select')
      .attr('class','select')
      .on('change',onchange)
  
  var options = select
    .selectAll('option')
    .data(talk_categories).enter()
    .append('option')
      .text(function (d, i) { return (talk_categories[i]); });
  
  d3.select('.select') //update list on change of category
    .on('change', function() {
      selectValue = d3.select('select').property('value');
      d3.select('#list').html("");
      console.log(selectValue);
      d3.select('#list')
      .append('p')
      // .text(function() { console.log(getTopTalks(selectValue, data)); return getTopTalks(selectValue, data); });
      .html(getTopTalks(selectValue, data));
  });
  
  }
  
  
  });
  


//   function visualizeBarChart(dataitems) {
//     var margin = { top: 20, right: 20, bottom: 30, left: 60 },
//         width = 940 - margin.left - margin.right,
//         height = 500 - margin.top - margin.bottom;

//     var x = d3.scaleBand()
//         .domain(dataitems.map(function (d) { return d.key; }))
//         .range([0, width])
//         .padding(0.1);

//     var y = d3.scaleLinear()
//         .domain([0, d3.max(dataitems, function (d) { return d.value; })])
//         .range([height, 0]);

//     var tooltip = d3.select("body").append("div").attr("class", "toolTip");
//     //NEW

//     var svg = d3.select("#chart1").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");

//     svg.selectAll(".bar")
//         .data(dataitems)
//         .enter().append("rect")
//         .attr("class", "bar")
//         .attr("fill", "#5b717c")
//         .attr("x", function (d) { return x(d.key); })
//         .attr("width", x.bandwidth())
//         .attr("y", function (d) { return y(d.value); })
//         .attr("height", function (d) { return height - y(d.value); })
//         .attr("opacity", "0.7")
//         .on("mousemove", function (d) {
//                 d3.select(this).attr("opacity", "1");
//                 tooltip.style("left", d3.event.pageX - 50 + "px")
//                     .style("top", d3.event.pageY - 70 + "px")
//                     .style("display", "inline-block")
//                     .html("<b>" +(d.key) + "</b> : " + (d.value));
//         })
//         .on("mouseout", function (d) {
//                 d3.select(this).attr("opacity", "0.7");
//                 tooltip.style("display", "none");
//         });

//     // add the x Axis
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));

//     // add the y Axis
//     svg.append("g")
//         .call(d3.axisLeft(y));


// }