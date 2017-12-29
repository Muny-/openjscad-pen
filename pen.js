// brass/aluminum pen
// all units are inches

var body_dia = 0.4;
var total_len = 5;

var gnurl_len = 1;
var cone_len = 0.5;
var tip_len = gnurl_len+cone_len;


function main() {
    
    var h = union(
        hull(
            circle(1/2), 
            CAG.roundedRectangle({center: [1/2,1/2], radius: [1/2, 1/2], roundradius: 0.1, resolution: 20}).translate([-1/2,0,0])
        ),
        CAG.roundedRectangle({center: [1/2,1], radius: [1/2, 1], roundradius: 0.1, resolution: 20}).translate([-1/2,0,0]),
        hull(
            CAG.roundedRectangle({center: [2,2], radius: [2, 1/2], roundradius: 0.1, resolution: 20}).translate([-1/2,0,0]),
            circle(1/2).translate([3,1.5,0])
        )
    );

    var j_hook = linear_extrude({ height: 1 }, h).scale(0.1);
    
    return [
        union(
            union(
                tip().subtract(cube({size: [total_len+2,body_dia,body_dia]}).center().translate([-tip_len/2,0,body_dia/2]).setColor(rgb(101,161,89,255))),
                body().subtract(
                    union(
                        j_hook.translate([0.145,-0.125,0.1]),
                        cube({size: [7/16, (1/4)/2, 7/16]}).center().translate([(total_len-tip_len)/2-((7/16)/2)+0.05,0,(body_dia/2)+((7/16)/2)-(1/32)]).rotateX(90)
                    )
                ).subtract(cube({size: [total_len+2,body_dia,body_dia]}).center().translate([-tip_len/2,0,body_dia/2])),
                tailcap()
            )
        ).translate([0,0,0]),
        union(
            refill().translate([-1.68,0,0]),
            plunger().subtract(cube({size: [total_len+2,body_dia,body_dia]}).center().translate([-tip_len/2,0,body_dia/2])).setColor(rgb(45,144,201,170,255)).translate([0.1,0,0]),
            m2_screw(0.23622).translate([0.2,0,0.12])
        ).rotateX(23).translate([0,0,0]),
        
        m1_6_screw(0.23622).translate([0,0,0.085]).rotateX(90).translate([(total_len-tip_len)/2-(7/16)/2-.05,0,0]),
        
        m1_6_screw(0.23622).translate([0,0,0.085]).rotateX(90).translate([(total_len-tip_len)/2-(7/16)/2+.15,0,0])
    ];
}

function m1_6_screw(len) {
    return union(
        cylinder({r: (0.0629921/2), h: len}).center(),
        cylinder({r: (0.11811/2), h: 0.0669291}).center().translate([0,0,len/2+(0.0669291/2)])
    ).setColor(rgb(155,155,155,255))
}

function m2_screw(len) {
    return union(
        cylinder({r: (0.0787402/2), h: len}).center(),
        cylinder({r: (0.149606/2), h: 0.0787402}).center().translate([0,0,len/2+(0.0787402/2)])
    )
}

function tailcap() {
    return union(
        cylinder({r: (0.306)/2, h: 0.5}).center().rotateY(90).translate([(total_len-tip_len)/2-(0.5/2),0,0]).setColor(rgb(233,139,72,150)),
        cylinder({r: (body_dia)/2, h: 0.05}).center().rotateY(90).translate([(total_len-tip_len)/2+(0.05/2),0,0]).setColor(rgb(233,139,72,150))
    ).subtract(
        union(
            cube({size: [7/16, (1/4)/2, 7/16]}).center().translate([(total_len-tip_len)/2-((7/16)/2)+0.05*2,0,(body_dia/2)+((7/16)/2)-(1/32)]).rotateX(90),
            
            m1_6_screw(0.23622).translate([0,0,0.085]).rotateX(90).translate([(total_len-tip_len)/2-(7/16)/2-.05,0,0]),
        
            m1_6_screw(0.23622).translate([0,0,0.085]).rotateX(90).translate([(total_len-tip_len)/2-(7/16)/2+.15,0,0])
        )
    );
}

function plunger() {
    return union(
        cylinder({r: (0.3)/2, h: 0.5}).center().rotateY(90).setColor(rgb(45,144,201,170))
    ).subtract(
        union(
            cylinder({r: (0.0787402/2), h: 0.23622}).center().translate([0.2,0,0.12]).setColor(rgb(150,150,150,255)),
            cylinder({r: (0.194/2), h: 0.223}).center().rotateY(90).translate([-(0.5/2)+(0.223/2),0,0])
        )
    );
}

function body() {
    return union(
        cylinder({r: body_dia/2, h: total_len-tip_len}),
        cylinder({r: (0.3)/2, h: 0.2}).translate([0,0,-0.2])
    ).subtract(
        union(
            cylinder({r: ((0.194)/2), h: total_len}).translate([0,0,-0.2]),
            cylinder({r: (5/16)/2, h: 2.25}).translate([0,0,total_len-tip_len-2.25])
        )
    ).center().rotateY(90).setColor(rgb(255,0,0,255)).translate([-0.2/2,0,0]).subtract(
        union(
            m1_6_screw(0.23622).translate([0,0,0.085]).rotateX(90).translate([(total_len-tip_len)/2-(7/16)/2-.05,0,0]),
        
            m1_6_screw(0.23622).translate([0,0,0.085]).rotateX(90).translate([(total_len-tip_len)/2-(7/16)/2+.15,0,0])
        )
    );
}

function tip() {
    return union(
        cylinder({r: body_dia/2, h: gnurl_len}).center().rotateY(90).translate([-(total_len-tip_len)/2-(gnurl_len/2),0,0]),
        cylinder({r1: (0.145669/2), r2: body_dia/2, h: cone_len}).center().rotateY(90).translate([-(total_len-tip_len)/2-gnurl_len-(cone_len)/2,0,0])
    ).subtract(
        union(
            cylinder({r: (0.3/2), h: 0.2}).center().rotateY(90).translate([-total_len/2+tip_len/2-0.2/2,0,0]),
            
            cylinder({r: ((15/64)/2), h: 1-0.05}).center().rotateY(90).translate([-total_len/2+0.357,0,0]),
            cylinder({r1: (5/32)/2, r2: ((15/64)/2), h: 0.05}).center().rotateY(90).translate([(-total_len/2)-0.143,0,0]),
            cylinder({r: ((5/32)/2), h: tip_len-0.15-0.05}).center().rotateY(90).translate([-total_len/2,0,0]),
            cylinder({r1: (7/64)/2, r2: ((5/32)/2), h: 0.05}).center().rotateY(90).translate([(-total_len/2)-(tip_len/2)+0.075,0,0]),
            cylinder({r: ((7/64)/2), h: tip_len}).center().rotateY(90).translate([-total_len/2,0,0])
        )
    ).setColor(rgb(150,0,0,255)).translate([0,0,0]);
}

function refill() {
    return union(
        cylinder({r: 4.78/2, h: 64.14}),
        cylinder({r2: 4.78/2, r1: 2.76/2, h: 1.4}).translate([0,0,-1.4]),
        cylinder({r: 2.76/2, h: 8.31}).translate([0,0,-8.31-1.4]),
        cylinder({r2: 2.76/2, r1: 2.54/2, h: 0.1}).translate([0,0,-8.31-1.4-0.1]),
        cylinder({r: 2.54/2, h: 11.09}).translate([0,0,-8.31-1.4-0.1-11.09]),
        cylinder({r2: 2.54/2, r1: 2.24/2, h: 0.1}).translate([0,0,-8.31-1.4-0.1-11.09-0.1]),
        cylinder({r: 2.24/2, h: 2}).translate([0,0,-8.31-1.4-0.1-11.09-0.1-2]),
        cylinder({r2: 2.24/2, r1: 1.3/2, h: 1.47}).translate([0,0,-8.31-1.4-0.1-11.09-0.1-2-1.47]),
        sphere({r: 1.1/2}).translate([0,0,-8.32-1.4-0.1-11.09-0.1-2-1.47+0.2])
    ).center().rotateY(90).setColor(rgb(202,202,54,125)).scale(0.0393701);
}

function rgb(r,g,b,a) {
    return [r/255,g/255,b/255,a/255];
}
