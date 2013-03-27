/*
 Shivs $fh functions we used in the past to their modern phonegap / html5 equivalents
 */

$fh = $fh || {}; // intentional implied global

$fh.data = function(params, succ, err){
  var act = params.act || 'load',
  key = params.key || false,
  val = params.val || {},
  res;
  
  if (key){
    switch(act){
      case "remove":
        res = {key: key, val: localStorage.removeItem(key)};
        break;
      case "save":
        res = {key : key, val : localStorage.getItem(key)};
        break;
      default:
        res = {key : key, val : localStorage.setItem(key, JSON.stringify(val))};
        break;
    }
    if (succ){
      return succ(res);
    }
  }

};

$fh.log = $fh.log || function(msg){
  console.log(msg);
};