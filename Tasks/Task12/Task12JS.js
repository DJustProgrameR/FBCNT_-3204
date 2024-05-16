function DisplayPlot() {
    var lensRatio = document.getElementById("lensRatio").value;
    var lensRefInd = document.getElementById("lensRefInd").value;
    var envRefInd = document.getElementById("envRefInd").value;
    var plateRefInd = document.getElementById("plateRefInd").value;
    var waveLength = document.getElementById("waveLength").value;

    if (isNaN(waveLength) || waveLength <= 0 ||
        isNaN(lensRefInd) || lensRefInd < 1 ||
        isNaN(plateRefInd) || plateRefInd < 1 ||
        isNaN(envRefInd) || envRefInd < 1 ||
        isNaN(lensRatio) || lensRatio <= 0) {
        Plotly.newPlot("myDiv", [{name: 'Think of input data'}], {title: 'Think of input data'});
        return false;
    }
    waveLength /= Math.pow(10, 9);
    var flag=0;
    if(lensRefInd<envRefInd){flag++;}
    if(envRefInd<plateRefInd){flag++;}
    var maxRatio = Math.sqrt(4.5*waveLength*lensRatio);
    var x_r = [];
    var y_I = [];
    for (var x = -maxRatio; x <= maxRatio; x += maxRatio / 1000) {
        x_r.push(x);
        if(flag%2==1){
            y_I.push(Math.pow(Math.sin(Math.PI * x*x / (waveLength * lensRatio)), 2));
        }
        else{
            y_I.push(Math.pow(Math.cos(Math.PI * x*x / (waveLength * lensRatio)), 2));
        }
    }
    var trace = {
        x: x_r,
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
        title: 'Кольца Ньютона',
        titlefont: {
            family: 'Times New Roman',
            size: 16,
            color: 'black'
        },
        xaxis: {
            title: 'Расстояние от центра, м',
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
