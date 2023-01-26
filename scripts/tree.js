const _ = require('underscore')

hierarchy = function( array, parent, tree ){
  tree = typeof tree !== 'undefined' ? tree : [];
  parent = typeof parent !== 'undefined' ? parent : { task_id: 0 };
      
  var children = _.filter( array, function(child){ return child.parent_id == parent.task_id; });
  
  if( !_.isEmpty( children )  ){
      if( parent.task_id == 0 ){
         tree = children;   
      }else{
         parent['children'] = children
      }
      _.each( children, function( child ){ hierarchy( array, child ) } );                    
  }
  
  return tree;
}
  //var result = unflatten(items);
//hierarchy(list, { idKey: 'task_id', parentKey: 'parent_id' });

//console.log(JSON.stringify(buildHierarchy(items), null, "\t"));

module.exports = hierarchy