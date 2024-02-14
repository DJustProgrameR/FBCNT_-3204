var mu_zero = 1.25663706212*10**(-6);
function CoilMagneticField(distance, radius, loop_number, electric_current){
    return (mu_zero*electric_current*(radius**2))/(2*((radius**2) + (distance**2))**(3/2));
}
function DisplayPlot(){

    var radius = document.getElementById("radius").value;
    var loop_number = document.getElementById("loop_number").value;
    var electric_current = document.getElementById("electric_current").value;

    var first_X_axis_coord = -1;
    var last_X_axis_coord = radius + 1;

    var x = [];
    var y = [];

    for(var i = first_X_axis_coord; i < last_X_axis_coord; i+=0.001)
    {
        x.push(i);
        y.push(CoilMagneticField(Math.abs(radius - i), radius, loop_number, electric_current)
            +CoilMagneticField(Math.abs(i), radius, loop_number, electric_current));
    }

    var data = [{
        x: x,
        y: y,
        mode: 'lines',
        line: {
            color: 'rgb(55, 128, 191)',
            width: 3
        }
    }];

    var layout = {
        title: 'Helmholtz coil',
        titlefont: {
            family: 'Times New Roman',
            size: 16,
            color: 'black'
        },
        xaxis: {
            title: 'x, м',
            titlefont: {
                family: 'Times New Roman',
                size: 14,
                color: 'black'
            },
            showticklabels: true,
            tickangle: 'auto',
            tickfont: {
                family: 'Old Standard TT, serif',
                size: 14,
                color: 'black'
            }
        },
        yaxis: {
            title: 'B, Тл',
            titlefont: {
                family: 'Times New Roman',
                size: 14,
                color: 'black'
            },
            showticklabels: true,
            tickangle: 0,
            tickfont: {
                family: 'Old Standard TT, serif',
                size: 14,
                color: 'black'
            },
            exponentformat: 'e',
            showexponent: 'all'
        }
    };

    Plotly.newPlot("myDiv", data, layout);
    return false;
}

