function DisplayPlot() {
    var waveLength = document.getElementById("waveLength").value;
    var refractiveIndex = document.getElementById("refractiveIndex").value;
    var slitsDistance = document.getElementById("slitsDistance").value;
    var displayDistance = document.getElementById("displayDistance").value;

    if (isNaN(waveLength) || waveLength <= 0 ||
        isNaN(refractiveIndex) || refractiveIndex < 1 ||
        isNaN(slitsDistance) || slitsDistance <= 0 ||
        isNaN(displayDistance) || displayDistance <= 0) {
        Plotly.newPlot("myDiv", [{name: 'Think of input data'}], {title: 'Think of input data'});
        return false;
    }
    waveLength/=Math.pow(10,9);
    var picWidth=waveLength*displayDistance*5.5/(refractiveIndex*slitsDistance);
    var x_m = [];
    var y_=[];
    var colors=[];
    for (var x = -picWidth; x <= picWidth; x+=picWidth/1000) {
        x_m.push(x);
        y_.push(picWidth/5.5);
        var col=Math.ceil(255*Math.pow(Math.cos(Math.PI*refractiveIndex*slitsDistance*x/(waveLength*displayDistance)),2));
        var colo = `rgb(${col},${col},${col})`;
        colors.push(colo);
    }
    var trace = {
        x: x_m,
        y: y_,
        mode: 'markers',
        marker: {
            size: 5,
            color: colors
        }
    };

    var data = [trace];
    var layout = {
        title: 'Интерфереционная картина',
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
            title: 'Просто для ширины :)',
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
