/**
 * Created by qw4wer on 2016/6/9.
 */

function heredoc(fn) {

    return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
}
var tmpl = heredoc(function () {
    /*
     <div class="ms-tab">
     <div class="tabs-scroller-left"  ms-visible="@toggle" ms-click="@scrolTab('left')" ></div>
     <div class="tabs-scroller-right" ms-visible="@toggle" ms-click="@scrolTab('right')"></div>
     <div ms-class="['tabs-warp',@toggle?'tabs-margin':'' ]">
     <ul  ms-class="['tabs']" >
     <li ms-for="($index, tab) in @tabs" ms-class="['tab', $index==@currentTab?'current':'' ]"   >
     <p ms-text="tab.name" ms-click="@onChangeTab($index)"></p>
     <a class="tabs-close" ms-click="@onClose($index)" ms-visible="$index!=0"></a>
     </li>
     </ul>
     </div>
     <div class="tabs-panels">
     <div ms-for="($index, tab) in @tabs" class="panel" ms-visible="$index==@currentTab">
        <div ms-css="{height:@calcPanelHeight()}" >
            <iframe ms-attr="{class:'frame'+$index}">

            </iframe>
        </div>
     </div>
     </div>
     </div>
     */
})
avalon.component('ms-tabs', {
    template: tmpl,
    defaults: {
        tabs: [],
        tpl: '',
        currentTab: 0,
        component: '',
        tabWidth: 0,
        toggle: false,
        onChangeTab: function (index) {
            this.currentTab = index;
            /*this.tpl = '<p>' + this.tabs[index].component + '</p>';*/
        },
        onInit: function () {
            var index = this.currentTab;
            setTimeout(function () {
                $("li").each(function () {
                    this.tabWidth += $(this).outerWidth(true);
                });
            }, 0);

            this.onChangeTab(index);
        },
        onClose:function(index){
            this.tabs.splice(index,1);
            this.onChangeTab(index-1);
        },
        calcWidth: function (str) {
            return calc(str) * 14 +5 + "px";
        },
        calcPanelHeight:function(){
            //$(this.$element.parentNode).height() - ;



            return 100;
        },
        scrolTab: function (direction) {
            debugger;
            tabs = $(this.$element).find(".tabs-warp");
            switch (direction) {
                case 'left':
                    tabs.scrollLeft(tabs.scrollLeft() - 200);
                break;
                case 'right' :
                {
                    n = tabs.scrollLeft();
                    if ((vm.config.tabWidth - n - this.$element.offsetWidth) < 200) {
                        tabs.scrollLeft((vm.config.tabWidth - this.$element.offsetWidth) + parseInt($(this.$element).find('.tabs-warp').css('margin-left')) * 2);
                    } else {
                        tabs.scrollLeft(n + 200);
                    }

                }
                break;
            }


        }
    }

})


function calc(str) {
    var reg = /[\u4e00-\u9fa5]/;

    var realLength = new Number(0.0);
    for (var i = 0; i < str.length; i++) {
        var char = str.substring(i, i + 1);
        realLength = reg.test(char) ? realLength + 1 : realLength + 0.5

    }

    return realLength + 1;
}


