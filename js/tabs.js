/**
 * Created by qw4wer on 2016/6/9.
 */

function heredoc(fn) {

    return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
}
var tmpl = heredoc(function () {
    /*
     <div class="ms-tab">
     <div class="tabs-scroller-left"  ms-visible="@toggle" ms-click="@scrol('left')" ></div>
     <div class="tabs-scroller-right" ms-visible="@toggle" ms-click="@scrol('right')"></div>
     <div class="tabs-warp">
     <ul  ms-class="['tabs',@toggle?'tabs-margin':'' ]" >
     <li ms-for="($index, tab) in @tabs" ms-class="['tab', $index==@currentTab?'current':'' ]"  ms-css="{width:@calcWidth(tab.name)}" >
     <p ms-text="tab.name" ms-click="@onChangeTab($index)"></p>
     </li>
     </ul>
     </div>
     <div class="panel" ms-html="@tpl">
     {{@toggle}}
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
            debugger;
            this.currentTab = index;
            this.tpl = '<p>' + this.tabs[index].component + '</p>';
        },
        onInit: function () {
            var index = this.currentTab;
            for(var i = 0 ;i< this.tabs.length ; i++){
                this.tabWidth += (calc(this.tabs[i].name) *14 + 8);
            }

            this.onChangeTab(index);
        },
        calcWidth: function (str) {
            return calc(str) * 14 + "px";
        },
        scrol:function(direction){
            debugger;
            tabs = $(this.$element).find(".tabs-warp");
            switch (direction){
                case 'left': tabs.scrollLeft(tabs.scrollLeft()-200); break;
                case 'right' :{
                 n =    tabs.scrollLeft();
                    if((vm.config.tabWidth- n - this.$element.offsetWidth)<200){
                        tabs.scrollLeft(n+(vm.config.tabWidth-n - this.$element.offsetWidth));
                    }else{
                        tabs.scrollLeft(n+200);
                    }

                };break;


            }


        }
    }

})
var vm = avalon.define({
    $id: 'widget',

    config: {
        tabs: [{
            name: '标签中文测试a01',
            component: '标签一'
        },{
            name: '标签中文测试a02',
            component: '标签二'
        }],
        tabWidth: 0,
        toggle: false,
        currentTab:1
    },
    add: function (obj) {
        this.config.tabs.push(obj);
        this.config.tabWidth += calc(obj.name) * 14 +6 ;

        if (this.config.tabWidth > this.$element.offsetWidth)
            this.config.toggle = true;
    },
});


function add() {

    vm.add({
        name: '标签中文测试a' + ((vm.config.tabs.length + 1) <10 ? ('0'+(vm.config.tabs.length + 1)) :(vm.config.tabs.length + 1)),
        component: vm.config.tabs.length + 1
    });

    /*vm.add1();*/
}

function calc(str) {
    var reg = /[\u4e00-\u9fa5]/;

    var realLength = new Number(0.0);
    for (var i = 0; i < str.length; i++) {
        var char = str.substring(i, i + 1);
        realLength = reg.test(char) ? realLength + 1 : realLength + 0.5

    }

    return realLength + 1;
}


