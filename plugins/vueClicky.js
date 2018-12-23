import clicky from 'vue-clicky';

clicky(); // call the exported function to initialize clicky

// you can also pass some options to clicky:
clicky({
  shift: true, //default: false - clicky won't trigger unless shift is pressed
  ctrl: true, //default: false - clicky won't trigger unless ctrl is pressed
  stop: true, //default: false - stops regular context menu from appearing when clicky is triggered (should only be used together with shift:true or ctrl:true)
  left: true, //default: false - trigger on left click instead of right click
});
