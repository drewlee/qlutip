var QluTip = function(){
    var $doc;
    
    function build(){
        var shell = '<div id="qlutip_overlay" class="qlutip-outer ' + this.st.className + '" style="display:none;">'
            + '<div class="qlutip-inner">'
            + '<a class="qlutip-close" href="#"></a>'
            + '<div class="qlutip-content">' + this.st.html + '</div>'
            + '</div>'
            + '<div class="qlutip-arrow"></div>';
            
        this.st.html = shell;
    }
    
    function append(){
        this.$ct = $(this.st.html);
        
        this.$ct.appendTo(document.body)
            [this.st.effect[0]](this.st.speed)
            .css({
                top: getPositions.call(this, 'top'),
                left: getPositions.call(this, 'left')
            })
            .bind('click', function(e){e.stopPropagation();})
            .find('a.qlutip-close').bind('click', function(){
                this.destroy();
            });

        this.st.callback(this.$ct);
    }
    
    function getPositions(c){
        var st = this.st, coord, o;
        
        if(c == 'top'){
            o = this.$el.offset().top;
            coord = st.yAlign == 'bottom' ? o - (this.$ct.outerHeight() - this.$el.outerHeight()) + st.yOffset : o + st.yOffset;
        }else{
            o = this.$el.offset().left;
            coord = st.xAlign == 'right' ? o - this.$ct.outerWidth() + st.xOffset : o + st.xOffset;
        }

        return coord;
    }
    
    function bindClickToDoc(){
        if(!$doc){$doc = $(document);}
        $doc.bind('click', this.destroy);
    }
    
    return {
        launch: function($el, opts){
            this.st = {
                html: '',
                callback: function(){},
                className: 'qlutip-default',
                xAlign: 'left',
                yAlign: 'top',
                xOffset: 0,
                yOffset: 0,
		effect: ['fadeIn', 'fadeOut'],
                speed: 250
            };
            this.$el = $el;
            
            $.extend(this.st, opts || {});
            
            if($('#qlutip_overlay').length){
                this.destroy();
                if(this.instance == $el[0]){return;}
            }
            
            this.instance = $el[0];
            build.call(this);
            append.call(this);
            bindClickToDoc.call(this);
        },
        
        destroy: function(){
            var _this = QluTip;
            _this.$ct[_this.st.effect[1]](_this.st.speed, function(){$(this).remove();});
            $doc.unbind('click', _this.destroy);
        }
    };
}();