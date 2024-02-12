function DisplayPlot(){
    var particle_charge_amount = document.getElementById("particle_charge_amount").value;
    var particle_charge_sign= document.getElementById("particle_charge_sign").value;
    var particle_mass= document.getElementById("particle_mass").value;
    var particle_speed= document.getElementById("particle_speed").value;
    var angle= document.getElementById("angle").value;
    var magnetic_induction= document.getElementById("magnetic_induction").value;

    var particle_Z_axis_direction;
    if(angle < 90){
        particle_Z_axis_direction = 1;
    } else if (angle == 90){
        particle_Z_axis_direction = 0;
    }else {
        particle_Z_axis_direction = -1;
    }

    var particle_turn_coef = -1;
    if(particle_charge_sign == '-'){
        particle_turn_coef *= -1;
    }

    var radius = (particle_mass*particle_speed)/(particle_charge_amount * Math.cos(angle * Math.PI / 180) * magnetic_induction);
    var Z_axis_dist_delta = particle_speed * Math.cos(angle * Math.PI / 180) * ((1/30)/(particle_speed * Math.sin(angle * Math.PI / 180) / radius));

    var pointCount = 600;

    var x = [];
    var y = [];
    var z = [];
    var c = [];

    for(var i = 0; i < pointCount; i++)
    {
        x.push(radius * Math.cos(particle_turn_coef * i / 30));
        y.push(radius * Math.sin(particle_turn_coef * i / 30));
        z.push(particle_Z_axis_direction * i * Z_axis_dist_delta);
        c.push(i)
    }

    Plotly.newPlot("myDiv", [{
        type: 'scatter3d',
        mode: 'lines',
        x: x,
        y: y,
        z: z,
        opacity: 0.7,
        line: {
            width: 10,
            color: c,
            colorscale: 'Viridis'}
    }]);
    return false;
}

