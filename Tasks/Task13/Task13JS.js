function DisplayPlot() {
    var N = document.getElementById("N").value;
    var splitWidth = document.getElementById("splitWidth").value;
    var period = document.getElementById("period").value;
    var waveLength = document.getElementById("waveLength").value;

    if (isNaN(N) || N <= 0 ||
        isNaN(splitWidth) || splitWidth <= 0 ||
        isNaN(period) || period <= 0  ||
        isNaN(waveLength) || waveLength < 380 || waveLength > 750) {
        Plotly.newPlot("myDiv", [{name: 'Think of input data'}], {title: 'Think of input data'});
        return false;
    }
    waveLength /= Math.pow(10, 9);
    var maxSin=waveLength*3/splitWidth;
    var x_f=[];
    var y_I=[];
    for (var sinf = -maxSin; sinf <= maxSin; sinf += maxSin / 1000) {
        if(sinf==0){
            x_f.push(0);
            y_I.push(y_I.at(y_I.length));
            continue;
        }
        x_f.push(sinf);
        y_I.push(Math.pow(Math.sin(Math.PI * splitWidth*sinf / waveLength)/(Math.PI * splitWidth*sinf / waveLength), 2)*Math.pow(Math.sin(Math.PI * period*N*sinf / waveLength)/Math.sin(Math.PI * period*sinf / waveLength), 2));
    }
    var trace = {
        x: x_f,
        y: y_I,
        mode: 'lines',
        line: {
            color: 'rgb(0, 128, 255)',
            width: 3
        },
        name: 'Интенсивность света'
    };

    var data = [trace];
    var layout = {
        title: 'Дифракция Фраунгофера',
        titlefont: {
            family: 'Times New Roman',
            size: 16,
            color: 'black'
        },
        xaxis: {
            title: 'Синус угла дифракции',
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
            },
            exponentformat: 'e',
            showexponent: 'all'
        },
        yaxis: {
            title: 'Интенсивность света',
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
