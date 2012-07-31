$(window).ready(function() { 
    $('[data-vectorectus]').vectorectus("");
});

(function ($) {
    $.fn.extend({
    
        vectorectus : function (shapesFile) {
            var SelectorToData = function (selector) {
                var names = selector.split('.') || ['', ''];          
                return shapes [names[0]] [names[1]];
            } 
        
            loadVectorFile : function (file) {
                
            },
                    
            index   = 0;
            
            return this.each(function() {
                if ($(this).attr('id') === undefined) 
                    $(this).attr('id', 'vectorectus-'  + $(this).data('vectorectus') + "-" + index++;
                    
                var id      = $(this).attr('id'),
                    shape   = $(this).data('vectorectus'),
                    
                    data    = SelectorToData(shape),
                    path    = data[2],
                    box     = path.getBBox(),
                    
                    color   = $(this).css('color');
                   // options = $(this).data('shape-options');
                    
                var vector = Raphael (id, "100%", "100%");
                vector.path(path).attr ({'stroke-width': '0','stroke-opacity': '0','fill': color });
                vector.setViewBox (box.x, box.y, box.width, box.height);
            });
        }
    });
})(jQuery);