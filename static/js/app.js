// STRATEGY
// Intialize Dashboard page
// 1. Establish default Test Subject ID 940 <== write a function for this
// 2. Populdate dropdown with possible choices (Test Subject ID Numbers)
// {/* <option value="hamster">Hamster</option>     <== hint for list of options in dropdown */}
// Write 2 functions to carry out responsibilities: one for establishing defaults (item 1 above), one for responding to user input 

// Start to write INIT function to get dropdown menu populated
function init() {
    // get nested data -- chaining!
    d3.json("samples.json").then(function(data) {
        console.log(data.names);
        var dropdownlist = d3.select("#selDataset"); // Use D3 to select the table body from INDEX.HTML
        data.names.forEach(name => {
            dropdownlist.append("option").text(name);
        })
    });
}

// Call INIT function
init();
// https://stackoverflow.com/questions/43121679/how-to-append-option-into-select-combo-box-in-d3
