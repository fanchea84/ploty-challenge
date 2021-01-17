
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
        // Call the DEMOGRAPHICDATA and CREATEPLOTS functions to display the data and plots on the webpage.
        DemographicData(data.names[0]);
    });
}
// Call INIT function to initialize data on the page.
init(); 

// -----------------------------------------------------------------------------------------------------
// NOTES AND HINTS FROM CLASS, TUTORING, & SELF-GUIDED STUDY TIME.
// -----------------------------------------------------------------------------------------------------
// https://stackoverflow.com/questions/43121679/how-to-append-option-into-select-combo-box-in-d3
// STRATEGY
// Intialize Dashboard page
// 1. Establish default Test Subject ID 940 <== write a function for this
// 2. Populdate dropdown with possible choices (Test Subject ID Numbers)
// {/* <option value="hamster">Hamster</option>     <== hint for list of options in dropdown */}
// Write 2 functions to carry out responsibilities: one for establishing defaults (item 1 above), one for responding to user input 
