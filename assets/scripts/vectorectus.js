$(window).ready(function() { 
    $('[data-vectorectus]').vectorectus("assets/data/vectorectus.json");
});

(function ($) {
    $.fn.extend({
        vectorectus : function (url) {
            var index  = 0,
                that = this,
                shapes = {},
            
            DrawVectors = function(element) {
                if ($(element).attr('id') === undefined)
                    $(element).attr('id', 'vectorectus-' + $(element).data('vectorectus') + "-" + (index++));
                
                
                var id      = $(element).attr('id'),
                    shape   = $(element).data('vectorectus'),
                    
                    data    = SelectorToData(shape),
                    path    = data,
                    
                    color   = $(element).css('color');
                    
                   // options = $(element).data('shape-options');
                    
                var vector = Raphael (id, "100%", "100%");
                var path   = vector.path(path).attr ({'stroke-width': '0','stroke-opacity': '0','fill': color });
                
                box     = path.getBBox();
                vector.setViewBox (box.x, box.y, box.width, box.height);
            },

            
            SelectorToData = function (selector) {
                var names = selector.split('.') || ['', ''];          
                return shapes [names[0]] [names[1]];
            },
        
            loadVectorFile = function (url) {      
                $.getJSON(url, function(data) {
                    shapes = data;
                    
                    that.each(function() {
                        DrawVectors(this);
                    });
                }).error(function(e) { 
                    console.log('vectorectus error: ' + e); 
                });
            };
            
            loadVectorFile(url);  
            return this;
        }
    })
})(jQuery);