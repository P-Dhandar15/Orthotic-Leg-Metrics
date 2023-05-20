var readChannelID = '1663499'; // Replace with your actual channel ID
    var numPoints = 100; // Replace with the number of data points to retrieve
    var readAPIKey = 'UBW8GF2154FNB2PL'; // Replace with your actual read API key

    var apiUrl = 'https://api.thingspeak.com/channels/' + readChannelID + '/fields/';
    var field4Url = apiUrl + '4.json?api_key=' + readAPIKey + '&results=' + numPoints;
    var field5Url = apiUrl + '5.json?api_key=' + readAPIKey + '&results=' + numPoints;
    var field6Url = apiUrl + '6.json?api_key=' + readAPIKey + '&results=' + numPoints;
    var field1Url = apiUrl + '1.json?api_key=' + readAPIKey + '&results=' + numPoints;
    var field2Url = apiUrl + '2.json?api_key=' + readAPIKey + '&results=' + numPoints;

    Promise.all([
      fetch(field4Url).then(response => response.json()),
      fetch(field5Url).then(response => response.json()),
      fetch(field6Url).then(response => response.json()),
      fetch(field1Url).then(response => response.json()),
      fetch(field2Url).then(response => response.json())
    ]).then(([field4Data, field5Data, field6Data, field1Data, field2Data]) => {
      var timestamps1 = field4Data.feeds.map(feed => feed.created_at);
      var values1 = field4Data.feeds.map(feed => feed.field4);
      var values2 = field5Data.feeds.map(feed => feed.field5);
      var values3 = field6Data.feeds.map(feed => feed.field6);

      var timestamps2 = field1Data.feeds.map(feed => feed.created_at);
      var values4 = field1Data.feeds.map(feed => feed.field1);
      var values5 = field2Data.feeds.map(feed => feed.field2);

      createChart1('chart1', timestamps1, values1,values2,values3, 'Sensor 1','Sensor 2','Sensor 3', 'red', 'green', 'blue');
      createChart2('chart2', timestamps2, values4,values5, 'Knee','Ankle', 'red', 'green');

    }).catch(error => {
      console.log('Error:', error);
    });

    function createChart1(containerId, labels, values1, values2, values3, label1, label2, label3, color1, color2, color3) {

      var chartData = {
        labels: labels,
        datasets: [
          {
            label: label1,
            borderColor: color1,
            data: values1
          },
          {
            label: label2,
            borderColor: color2,
            data: values2
          },
          {
            label: label3,
            borderColor: color3,
            data: values3
          }
        ]
      };

      var chartOptions = {
        responsive: true,
        scales: {
          x: {
            display: false,
            title: {
              display: true,
              text: 'Timestamp'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Sensor Values'
            }
          }
        }
      };

      var ctx = document.getElementById(containerId).getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions
      });
    }  
//--------------------------------------------------------------------------------------------------------------------------------------
    function createChart2(containerId, labels, values1, values2,  label1, label2, color1, color2) {
      var chartData = {
        labels: labels,
        datasets: [
          {
            label: label1,
            borderColor: color1,
            data: values1
          },
          {
            label: label2,
            borderColor: color2,
            data: values2
          },
        ]
      };

      var chartOptions = {
        responsive: true,
        scales: {
          x: {
            display: false,
            title: {
              display: true,
              text: 'Timestamp'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Knee & Ankle Position'
            }
          }
        }
      };

      var ctx = document.getElementById(containerId).getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions
      });
    }