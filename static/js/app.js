//create function for plotting data
function dataPlots(id) {
    d3.json("samples.json").then((sampleData) => {

        var data = sampleData;
        var sData = data.samples.filter(object => object.id == id)[0]

        var otuIds = sData.otu_ids
        var otuLabels = sData.otu_labels
        var sampleValues = sData.sample_values

        //reversing the array
        var xData = sampleValues.slice(0, 10).reverse()
        var yData = otuIds.slice(0,10).map(otuIds => "OTU" = otuId).reverse()
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
        var layout1 = {
            title: "Top 10 Bacteria",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };










    }
}

