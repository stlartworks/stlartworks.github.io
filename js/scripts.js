jQuery(function($){
     $('.chart').easyPieChart({
         barColor:"#fec057",
         trackColor: "#fff",
         scaleColor: false,
         lineWidth: 15,
         lineCap: "round",
         size: 125,
         animate: 2000,
         //easing: "easein",
         onStep: function(value) {
             this.$el.find('span').text(Math.round(value));
         },
         onStop: function(value, to) {
             this.$el.find('span').text(Math.round(to));
         }
     });
 });
