//document.addEventListener('DOMContentLoaded', function () {


  //var width = 900;  //declares width of container variable and assigns it a value of 960
  //var height = 600; //declares height of container variable and assigns it value of 100
  //var rectWidth = 15;       //sets rectWidth variable to be 20

  var data = [];
  var val
  var talk_categories = ["art"];

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
              val = data;
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

             d3.select('.select') //update list on change of category
               .on('change', function() {

                 selectValue = d3.select('select').property('value');
                 d3.select('#list').html("");
                 console.log(selectValue);
                 getTopTalks(selectValue, data);

             });

          });




  }



  function getTopTalks(category, data)
  {
    console.log(category);
    //set up margin and scale
    var margin = { top: 20, right: 20, bottom: 30, left: 60 },
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scaleBand().range([0, width]).padding(0.1);

    var y = d3.scaleLinear().range([height, 0]);

    var counter = 0;
    var item_array;
    var rating_names = ["Beautiful","Confusing","Courageous","Fascinating","Funny","Informative","Ingenious","Inspiring","Jaw.dropping","Longwinded","OK","Obnoxious","Persuasive","Unconvincing"]

    data.forEach(function(d,i)
              {
                var dict = [];

                if (d['tags'].split(',')[0] == category && counter <= 4) //if there is a match, display link & tite of talk
                { item_array=[];
                  var list = "";

                  for (i=0;i<rating_names.length;i++){
                    dict.push({
                        key:   rating_names[i],
                        value: parseInt(d[rating_names[i]])
                    });
                  }
                  console.log(dict)



                //create text list
                list += '<br>';
                list += ("Title: " + (d['title']));
                list += '<br>';
                list += (" Speaker: " + d['main_speaker']);
                list += '<br>';
                list += (" Views: " + d['views']);
                list += '<br>';
                list += (" <a href= " + d['url'] + ">Click to Watch</a>");
                list += '<br>';

                ///draw bar chart
                talk_info = d3.select('#list').append("p").attr("class","talk_info")
                talk_chart = d3.select('#list').append("div").attr("class","talk_chart")
                item_array.push(list);
                talk_info.html(list);
                var svg = talk_chart.append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

              x.domain(dict.map(function (d) { return d.key; }));
              y.domain([0, d3.max(dict, function (d) { return d.value; })]);


                svg.selectAll(".bar")
                .data(dict)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("fill", "#5b717c")
                .attr("x", function (d) { return x(d.key); })
                .attr("width", 10)
                .attr("y", function (d) { return y(d.value); })
                .attr("height", function (d) { return height - y(d.value); })


                counter += 1;
                }

              });


            //  console.log(counter)

              //return list;


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


  }


  //});
