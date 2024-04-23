function DisplayPlot() {
    var carrierFrequency = document.getElementById("carrierFrequency").value;
    var infoFrequency = document.getElementById("infoFrequency").value;
    var modulationCoef = document.getElementById("modulationCoef").value;

    if (isNaN(carrierFrequency) || carrierFrequency <= 0 ||
        isNaN(infoFrequency) || infoFrequency <= 0 ||
        isNaN(modulationCoef) || modulationCoef < 0) {
        Plotly.newPlot("myDiv1", [{name: 'Think of input'}], {title: 'Think of input'});
        return false;
    }

    var time = 1; // Продолжительность сигнала в секундах
    var samplingRate = 1000; // Частота дискретизации
    var x_t = [];
    var carrierSignal =[];
    var infoSignal = [];
    var modulatedSignal=[];
    for (var i = 0; i < time * samplingRate; i++) {
        x_t.push(i / samplingRate);
        carrierSignal.push(Math.sin(2 * Math.PI * carrierFrequency * x_t[i]));
        infoSignal.push(Math.sin(2 * Math.PI * infoFrequency * x_t[i]));
        modulatedSignal.push((1 + modulationCoef * infoSignal[i]) * carrierSignal[i]);
    }

    var carrierSpectrum = [];
    var infoSpectrum = [];
    var modulatedSpectrum = [];
    var N = time * samplingRate;
    for (var i = 0; i < N; i++) {
        var re1 = 0;
        var im1 = 0;
        var re2 = 0;
        var im2 = 0;
        var re3 = 0;
        var im3 = 0;
        for (var j = 0; j < N; j++) {
            var phi = -2 * Math.PI * i * j / N;
            re1 += carrierSignal[j] * Math.cos(phi);
            im1+= carrierSignal[j] * Math.sin(phi);
            re2 += infoSignal[j] * Math.cos(phi);
            im2 += infoSignal[j] * Math.sin(phi);
            re3 += modulatedSignal[j] * Math.cos(phi);
            im3 += modulatedSignal[j] * Math.sin(phi);
        }
        carrierSpectrum.push(Math.sqrt(re1 * re1 + im1 * im1));

        infoSpectrum.push(Math.sqrt(re2 * re2 + im2 * im2));

        modulatedSpectrum.push(Math.sqrt(re3 * re3 + im3 * im3));
    }

    var trace1 = {
        x: x_t,
        y: carrierSignal,
        mode: 'lines',
        line: {
            color: 'rgb(219, 64, 82)',
            width: 3
        },
        name: 'Несущий сигнал'
    };

    var trace2 = {
        x: x_t,
        y: infoSignal,
        mode: 'lines',
        line: {
            color: 'rgb(55, 128, 191)',
            width: 3
        },
        name: 'Информационный сигнал'
    };

    var trace3 = {
        x: x_t,
        y: modulatedSignal,
        mode: 'lines',
        line: {
            color: 'rgb(0, 255, 0)',
            width: 3
        },
        name: 'Результат модуляции'
    };
    var trace4 = {
        x: x_t,
        y: carrierSpectrum,
        mode: 'lines',
        line: {
            color: 'rgb(0, 128, 255)',
            width: 3
        },
        name: 'Спектр несущего сигнала'
    };

    var trace5 = {
        x: x_t,
        y: infoSpectrum,
        mode: 'lines',
        line: {
            color: 'rgb(255, 128, 0)',
            width: 3
        },
        name: 'Спектр информационного сигнала'
    };

    var trace6 = {
        x: x_t,
        y: modulatedSpectrum,
        mode: 'lines',
        line: {
            color: 'rgb(0, 0, 0)',
            width: 3
        },
        name: 'Спектр модулированного сигнала'
    };

    var data1 = [trace1];

    var data2 = [trace2];

    var data3 = [trace3];

    var data4=[trace4, trace5,trace6]
    var layout1 = {
        title: 'Несущий сигнал',
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
            title: 'Амплитуда',
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
        title: 'Информационный сигнал',
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
            title: 'Амплитуда',
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
        title: 'Результат модуляции',
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
            title: 'Амплитуда',
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
    var layout4 = {
        title: 'Спектры всех сигналов',
        titlefont: {
            family: 'Times New Roman',
            size: 16,
            color: 'black'
        },
        xaxis: {
            title: 'Частота, Гц',
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
            title: 'Амплитуда',
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

    Plotly.newPlot("myDiv4", data4, layout4);
    return false;
}
