function DisplayPlot(){

    var inductance = document.getElementById("inductance").value;
    var resistance = document.getElementById("resistance").value;
    var capacitance = document.getElementById("capacitance").value;
    var full_charge = document.getElementById("full_charge").value;

    var B = resistance/(2*inductance);
    var omega_0 = 1/(inductance*capacitance);
    var omega = Math.sqrt(omega_0^2-B^2);

    var x_t = [];
    var y_q=[];
    var y_I =[];

    var y_U_L = [];
    var y_U_C = [];
    var y_U_R = [];
    var y_U_Full = [];

    var time = 7*inductance/resistance;
    for(var t = 0; t < time; t+=time/100)
    {
        x_t.push(t);
        y_q.push(full_charge*Math.exp(-B*t)*Math.cos(omega*t));
        y_I.push(-full_charge*omega*Math.exp(-B*t)*Math.sin(omega*t));
        var Ics = -full_charge*omega*omega*Math.exp(-B*t)*Math.cos(omega*t);

        y_U_L.push(inductance*Ics);
        y_U_R.push(resistance*y_I.at(y_I.length-1));
        y_U_C.push(y_q.at(y_q.length-1)/capacitance);
        y_U_Full.push(y_U_L.at(y_U_L.length-1)+y_U_R.at(y_U_R.length-1)+y_U_C.at(y_U_C.length-1));
    }
    var trace1 = {
        x: x_t,
        y: y_q,
        mode: 'lines',
        line: {
            color: 'rgb(219, 64, 82)',
            width: 3
        },
        name: 'Величина заряда'
    };

    var trace2 = {
        x: x_t,
        y: y_I,
        mode: 'lines',
        line: {
            color: 'rgb(55, 128, 191)',
            width: 3
        },
        name: 'Сила тока'
    };


    var trace3 = {
        x: x_t,
        y: y_U_L,
        mode: 'lines',
        line: {
            color: 'rgb(0, 255, 0)',
            width: 3
        },
        name: 'Напряжение на катушке'
    };

    var trace4 = {
        x: x_t,
        y: y_U_R,
        mode: 'lines',
        line: {
            color: 'rgb(0, 128, 255)',
            width: 3
        },
        name: 'Напряжение на резисторе'
    };

    var trace5 = {
        x: x_t,
        y: y_U_C,
        mode: 'lines',
        line: {
            color: 'rgb(255, 128, 0)',
            width: 3
        },
        name: 'Напряжение на конденсаторе'
    };

    var trace6 = {
        x: x_t,
        y: y_U_Full,
        mode: 'lines',
        line: {
            color: 'rgb(0, 0, 0)',
            width: 3
        },
        name: 'Общее напряжение'
    };

    var data1 = [trace1];


    var data2 = [trace2];


    var data3 = [trace3, trace4, trace5,trace6];

    var layout1 = {
        title: 'Величина заряда в LCR цепи',
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
            title: 'Заряд, Кл',
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
    var layout2 = {
        title: 'Сила тока в LCR цепи',
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
    var layout3 = {
        title: 'Напряжение в LCR цепи',
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
            title: 'Напряжение, В',
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

    Plotly.newPlot("myDiv1", data1, layout1);

    Plotly.newPlot("myDiv2", data2, layout2);

    Plotly.newPlot("myDiv3", data3, layout3);
    return false;
}

