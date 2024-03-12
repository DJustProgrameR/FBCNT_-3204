function DisplayPlot(){

    var area = document.getElementById("area").value;
    var mag_field = document.getElementById("mag_field").value;
    var frequency = document.getElementById("frequency").value;
    var resistance = document.getElementById("resistance").value;
    var time = document.getElementById("time").value;

    var angular_velocity = 2*Math.PI*frequency;
    var x_electromotive_force = [];
    var y_electromotive_force = [];

    var x_induction_current = [];
    var y_induction_current = [];

    for(var t = 0; t < time; t+=time/1000)
    {
        x_electromotive_force.push(t);
        x_induction_current.push(t);

        var electromotive_force = mag_field*area*angular_velocity*Math.sin(angular_velocity*t);
        y_electromotive_force.push(electromotive_force);
        y_induction_current.push(electromotive_force/resistance);
    }

    var trace1 = {
        x: x_electromotive_force,
        y: y_electromotive_force,
        mode: 'lines',
        line: {
            color: 'rgb(219, 64, 82)',
            width: 3
        },
        name: 'ЭДС'
    };

    var trace2 = {
        x: x_induction_current,
        y: y_induction_current,
        mode: 'lines',
        line: {
            color: 'rgb(55, 128, 191)',
            width: 3
        },
        name: 'Индукционный ток'
    };

    var data = [trace1, trace2];

    var layout = {
        title: 'Вращение контура',
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
            title: 'ЭДС, В / Инд. ток А',
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

