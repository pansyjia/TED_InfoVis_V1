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
     data.forEach(function(d,i)
              {
         
  
                //FORMATTING NEEDED HERE!!!!///
  
                if (d['tags'].split(',')[0] == category) //if there is a match, display link & tite of talk
                {
                  list += '<br>';
                  list += ("Title: " + (d['title']));
                list += '<br>';
                  list += (" Speaker: " + d['main_speaker']);
                list += '<br>';
                  list += (" Views: " + d['views']);
                list += '<br>';
                  list += (" Link: " + d['url']);
                list += '<br>';
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
  