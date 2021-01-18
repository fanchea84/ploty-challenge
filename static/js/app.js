// -----------------------------------------------------------------------------------------------------
// Create DEMOGRAPHICDATA function to collect and display the metadata for a given Patient ID.
// -----------------------------------------------------------------------------------------------------
function DemographicData(id) {
        // Read the SAMPLES.JSON file into D3 so you can work with its data to build tables & visualizations.
        d3.json("samples.json").then((data)=> {
            // Get metadata from SAMPLES.JSON. We'll use this info for the Demographic Panel visualization.
            var metadata = data.metadata;
            console.log(metadata);
            // Filter the Demographic Metadata for a specific Patient ID (starting with the first Patient ID).
            var result = metadata.filter(meta => meta.id.toString() === id)[0];
            console.log(result);
            // Select the Demographic Panel from INDEX.HTML so you can put the selected Patient's demographic data in there.
            var demographicInfo = d3.select("#sample-metadata");
            // Clear the Demographic Panel, to enable input of the specified Patient ID.
            demographicInfo.html("");
            // Collect the Demographic Metadata for the selected Patient ID, and display it in the Demographic Panel.
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }

// -----------------------------------------------------------------------------------------------------
// Create CREATEDASHBOARD function to collect and display the metadata for a given Patient ID.
// -----------------------------------------------------------------------------------------------------
function CreateDashboard(id) {
    // Read the SAMPLES.JSON file into D3 so you can work with its data to build tables & visualizations.
    d3.json("samples.json").then (BellyButtonData =>{
        console.log(BellyButtonData);
        // Create variable ID's and store in it the OTU_ID numbers from SAMPLES.JSON
        var ids = BellyButtonData.samples[0].otu_ids;
        console.log(ids);
        // Create variabe BELLYBUTTONVALUES and store in it the first 10 SAMPLE_VALUES from SAMPLE.JSON.
        var BellyButtonValues = BellyButtonData.samples[0].sample_values.slice(0,10).reverse();
        console.log(BellyButtonValues);
        // Create a variable BELLYBUTTONLABELS for holding the labels of the top 10 values from SAMPLES.JSON.
        var BellyButtonLabels = BellyButtonData.samples[0].otu_ids.slice(0,10);
        console.log(BellyButtonLabels);
        // Create variable OTU_TOP_TEN and store in it the top ten OTU ID's from SAMPLE.JSON.
        var OTU_top_ten = (BellyButtonData.samples[0].otu_ids.slice(0, 10)).reverse();
        console.log(OTU_top_ten);
        // Create variable OTU_TOP_ID and store in it string with the OTU IDs for top ten OTU's from SAMPLE.JSON.
        var OTU_top_id = OTU_top_ten.map(d => "OTU " + d);
            // DELETE???
            // console.log('OTU IDs: ${OTU_top_id}');
        // Create variable TOPTENLABLES and store in it labels for our plot.
        var TopTenLabels = BellyButtonData.samples[0].otu_labels.slice(0,10);
        console.log(TopTenLabels);
        // Create a TRACE for the horizontal bar chart.
        var trace = {
            x: BellyButtonValues,
            y: OTU_top_id,
            text: BellyButtonLabels,
            marker: {
                color: 'light blue'},
                type:"bar",
                orientation: "h",
            };
        // Create DATA variable for holding the trace.
        var data = [trace];
        console.log(trace);
        // Create LAYOUT variable to specify layout of the chart.
        var layout = {
            title: "Top Ten OTU's",
            yaxis:{
                tickmode:"linear",
            },
            margin:{
                l: 105,
                r: 105,
                t: 105,
                b: 25
            }
        };
        // Create horizontal bar chart containing Top Ten OTU's
        Plotly.newPlot("bar", data, layout);
        // Create a TRACE for the bubble chart.
        var trace1 = {
            x: BellyButtonData.samples[0].otu_ids,
            y: BellyButtonData.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: BellyButtonData.samples[0].sample_values,
                color: BellyButtonData.samples[0].otu_ids
            },
            text: BellyButtonData.samples[0].otu_labels
        };

    });
}


// -----------------------------------------------------------------------------------------------------
// Create INIT function to populate dropdown menu with patient IDs (Patient IDs taken from "names" column in samples.json)
// -----------------------------------------------------------------------------------------------------
function init() {
    // Read the SAMPLES.JSON file into D3 so you can work with its data to build tables & visualizations.
    d3.json("samples.json").then(function(data) {
        console.log(data.names);
        // Use D3 to select the table body from INDEX.HTML
        var dropdownlist = d3.select("#selDataset"); 
        data.names.forEach(name => {
            dropdownlist.append("option").text(name);
        });
        // Call the DEMOGRAPHICDATA and CREATEDASHBOARD functions to display the data and plots on the webpage.
        DemographicData(data.names[0]);
        CreateDashboard(data.names[0]);
    });
}
// Call INIT function to initialize data on the page.
init(); 

// -----------------------------------------------------------------------------------------------------
// NOTES AND HINTS FROM CLASS, TUTORING, & SELF-GUIDED STUDY TIME.
// -----------------------------------------------------------------------------------------------------
// RESOURCE FOR APPENDING TO DROP-DOWN MENU: https://stackoverflow.com/questions/43121679/how-to-append-option-into-select-combo-box-in-d3
// RESOURCE FOR SLICE & REVERSE METHODS: https://stackoverflow.com/questions/30610523/reverse-array-in-javascript-without-mutating-original-array
// RESOURCE FOR HORIZONTAL BAR CHARTS IN PLOTLY: https://plotly.com/javascript/horizontal-bar-charts/
// STRATEGY
// Intialize Dashboard page
// 1. Establish default Test Subject ID 940 <== write a function for this
// 2. Populdate dropdown with possible choices (Test Subject ID Numbers)
// {/* <option value="hamster">Hamster</option>     <== hint for list of options in dropdown */}
// Write 2 functions to carry out responsibilities: one for establishing defaults (item 1 above), one for responding to user input 
