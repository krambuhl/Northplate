$(window).ready(function() { Vectorectus.Vectorectus() });

var vectorectusVectors = {

};



var Vectorectus = {    
    Vectorectus : function () {
        var SelectorToData = function (selector) {
            names = selector.split('.');
                        
            return vectorectusVectors [names[0]] [names[1]];
        };
    
        $(".vectorectus").each(function() {
            if ($(this).attr('id') === undefined) 
                $(this).attr('id', 'vector-'  + $(this).data('shape') + "-" + (Math.floor(Math.random()*90000) + 10000));
                
            var id      = $(this).attr('id'),
                shape   = $(this).data('shape');
                
            var data    = SelectorToData(shape),
                width   = data[0],
                height  = data[1],
                path    = data[2];
                
            var color   = $(this).css('color');
               // options = $(this).data('shape-options');
                
            var vector = Raphael(id, "100%", "100%");
            vector.path(path).attr({'stroke-width': '0','stroke-opacity': '0','fill': color });
            vector.setViewBox(0, 0, width, height);
        });
    }
};