(function(){
  function extend(a,b) {
    for ( var i in b ) {
      var g = b.__lookupGetter__(i), s = b.__lookupSetter__(i);

      if ( g || s ) {
        if ( g )
          a.__defineGetter__(i, g);
        if ( s )
          a.__defineSetter__(i, s);
      } else
        a[i] = b[i];
    }
    return a;
  }

  Event = function() {};

  extend(DOMElement.prototype, {
      get attributes() {
        var attr = {}, attrs = this._dom.getAttributes();

        for ( var i = 0; i < attrs.getLength(); i++ )
          attr[ attrs.item(i).nodeName ] = attrs.item(i);

        return attr;
      }
    });

  DOMNode.prototype.isDomNode = true;

 })();
