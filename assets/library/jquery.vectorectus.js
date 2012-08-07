(function ($) {
    $.fn.extend({
        vectorectus : function (url, options) {
            if (typeof Raphael == 'undefined') {
                console.error("Vectorectus is dependent Raphael.js to run, maybe it won't be required in the future...");
                return this;
            }
            
            var index  = 0,
                that = this,
                shapes = {},
                defaults = {
                    data     : 'vectorectus',
                    prefix   : 'vectorectus-',
                                       
                    missingvector : "M204.401,164.153c-3.991-6.981-84.524-146.438-91.412-158.342 c-4.525-7.815-15.313-7.682-19.844,0C88.093,14.38,7.15,154.373,1.527,164.509c-4.125,7.424,0.43,17.159,9.815,17.159h183.186 C203.045,181.668,209.382,172.86,204.401,164.153z M102.793,153.326c-6.82,0-12.349-5.526-12.349-12.348 c0-6.817,5.529-12.348,12.349-12.348c6.821,0,12.348,5.531,12.348,12.348C115.141,147.8,109.614,153.326,102.793,153.326z M116.325,79.225l-2.911,40.96H93.68l-4.129-40.96V58.472h26.774V79.225z"
                },
                options =  $.extend(defaults, options);
            
            DrawVectors = function(element) {
                if ($(element).attr('id') === undefined)
                    $(element).attr('id', options.prefix + $(element).data(options.data) + "-" + (index++));
            
                var id      = $(element).attr('id'),
                    shape   = $(element).data(options.data),
                    path    = SelectorToPath(shape),
                    
                    vector = Raphael (id, "100%", "100%"),
                    path   = vector.path(path);
                
                // VML fallback, if UserAgent is IE8 or lower
                if (Raphael.vml) 
                    path.attr({ 'stroke-width': '0','stroke-opacity': '0', 'fill': $(element).css('fill') });
                
                
                var box = path.getBBox();
                vector.setViewBox (box.x, box.y, box.width, box.height, true);
            },
                        
            SelectorToPath = function (selector) {
                var names = (selector !== undefined) ? selector.split('.') : ['', ''];                 
                
                if (shapes[names[0]] == undefined || shapes[names[0]][names[1]] == undefined) 
                    return options.missingvector;
                else
                    return shapes [names[0]] [names[1]];
            },
        
            loadVectorFile = function (url) {      
                $.getJSON(url, function(data) {
                    shapes = data;
                    
                    that.each(function() {
                        DrawVectors(this);
                    });
                }).error(function(e) { 
                    console.error('Vectorectus error: ' + e); 
                });
            };
    
            loadVectorFile(url);  
            return this;
        }       
    })
})(jQuery);