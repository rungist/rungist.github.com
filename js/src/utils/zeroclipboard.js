module.exports = function(element){
  var clip = new window.ZeroClipboard(element);
  clip.on("ready", function() {
    console.log("Flash movie loaded and ready.");
    this.on("aftercopy", function(event) {
      element.popup({on:"click"}).popup("show");
    });
  });   
};
