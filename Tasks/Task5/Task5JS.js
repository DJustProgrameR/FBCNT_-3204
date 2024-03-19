function DisplayPlot(){

    var inductance = document.getElementById("inductance").value;
    var resistance = document.getElementById("resistance").value;
    var electromotive_force = document.getElementById("electromotive_force").value;

    var el_current_0 = electromotive_force/resistance;
    var x_t = [];
    var y_current_up = [];
    var y_current_down = [];

    var time = 7*inductance/resistance;
    for(var t = 0; t < time; t+=time/100)
    {
        x_t.push(t);

        var exp = Math.exp(-resistance*t/inductance);
        y_current_up.push(el_current_0*(1-exp));
        y_current_down.push(el_current_0*exp);
    }

    var trace1 = {
        x: x_t,
        y: y_current_up,
        mode: 'lines',
        line: {
            color: 'rgb(219, 64, 82)',
            width: 3
        },
        name: 'Замыкание цепи'
    };

    var trace2 = {
        x: x_t,
        y: y_current_down,
        mode: 'lines',
        line: {
            color: 'rgb(55, 128, 191)',
            width: 3
        },
        name: 'Размыкание цепи'
    };

    var data = [trace1, trace2];

    var layout = {
        title: 'Ток при замыкании/размыкании цепи',
        titlefont: {
            family: 'Times New Roman',
            size: 16,
            color: 'black'
        },
        xaxis: {
            title: 'Время, с',
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
            title: 'Ток, А',
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

