//create function for plotting data
function dataPlots(id) {
    d3.json("samples.json").then((sampleData) => {

        var data = sampleData;
        var sData = data.samples.filter(Object => Object.id == id)[0]

        var otuIds = sData.otu_ids
        var otuLabels = sData.otu_labels
        var sampleValues = sData.sample_values

        //reversing the array
        var xData = sampleValues.slice(0, 10).reverse()
        var yData = otuIds.slice(0, 10).map(otuId => "OTU " + otuId).reverse()
        var labels = otuLabels.slice(0,10).reverse()

        //trace1, bar chart area
        var trace1 = {
            x: xData,
            y: yData,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        var barChart = [trace1];
        //barchart layout
        var layout1 = {
            title: "Top 10 Samples",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
        //redner plot to div tag under "bar" id
        Plotly.newPlot("bar",barChart, layout1);

        //bubble chart
        var trace2 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker:{
                size:sampleValues,
                color: otuIds,
                //New color setting for better personal visual
                colorscale: "Hot"
            }
        };

        //bubble chart layout
        var layout2 = {
            xaxis: {title: "OTU ID"},
            height: 650,
            width: 950,
        };
        Plotly.newPlot("bubble",[trace2], layout2);

    });
}
// Metadata
function getmetaData(id) {
    d3.json("samples.json").then(function(importMeta) {
        var mData = importMeta;
        var result = mData.metadata.filter(object => object.id == id)[0]
        var table = d3.select('#sample-metadata')

        table.html("")
        Object.entries(result).forEach(([key, value]) => {
            table.append("h5").text(key + ": " + value)
        })
    });
}
//fuction for new event
function optionChanged(id){
    //update and recreate plots with new data
    dataPlots(id);
    getmetaData(id);
}
//fuction for initial data rendering setup ( init)
function init() {
    var menuSelect = d3.select("#selDataset");
    //read data in
    d3.json("samples.json").then((importMeta) => {
        importMeta.names.forEach(function(names) {
            menuSelect.append("option").text(names).property("value");
        });
    //call functions to display data
    dataPlots(importMeta.names[0]);
    getmetaData(importMeta.names[0]);
    });
}
//ready dashboard
init();