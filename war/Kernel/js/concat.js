Tonyu.klass.define({
  fullName: 'kernel.EventHandlerCaller',
  shortName: 'EventHandlerCaller',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_EventHandlerCaller_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_EventHandlerCaller_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    callEventHandler :function _trc_EventHandlerCaller_callEventHandler(h,args) {
      "use strict";
      var _this=this;
      var t;
      
      
      //$LASTPOS=1000076;//kernel.EventHandlerCaller:76
      if (h["fiber"]) {
        //$LASTPOS=1000103;//kernel.EventHandlerCaller:103
        t=Tonyu.thread();
        //$LASTPOS=1000130;//kernel.EventHandlerCaller:130
        h["fiber"].apply(_this.target,[t].concat(args));
        //$LASTPOS=1000184;//kernel.EventHandlerCaller:184
        t.steps();
        
      } else {
        //$LASTPOS=1000218;//kernel.EventHandlerCaller:218
        h.apply(_this.target,args);
        
      }
    },
    fiber$callEventHandler :function _trc_EventHandlerCaller_f_callEventHandler(_thread,h,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      
      //$LASTPOS=1000076;//kernel.EventHandlerCaller:76
      if (h["fiber"]) {
        //$LASTPOS=1000103;//kernel.EventHandlerCaller:103
        t=Tonyu.thread();
        //$LASTPOS=1000130;//kernel.EventHandlerCaller:130
        h["fiber"].apply(_this.target,[t].concat(args));
        //$LASTPOS=1000184;//kernel.EventHandlerCaller:184
        t.steps();
        
      } else {
        //$LASTPOS=1000218;//kernel.EventHandlerCaller:218
        h.apply(_this.target,args);
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"callEventHandler":{"nowait":false}},"fields":{"target":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.EventMod',
  shortName: 'EventMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_EventMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_EventMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initEventMod :function _trc_EventMod_initEventMod() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000063;//kernel.EventMod:63
      if (_this._eventHandlers) {
        return _this;
      }
      //$LASTPOS=2000156;//kernel.EventMod:156
      _this._eventHandlers={};
      //$LASTPOS=2000179;//kernel.EventMod:179
      _this.on("die",Tonyu.bindFunc(_this,_this.releaseEventMod));
    },
    releaseEventMod :function _trc_EventMod_releaseEventMod() {
      "use strict";
      var _this=this;
      var k;
      var v;
      var _it_2;
      
      //$LASTPOS=2000243;//kernel.EventMod:243
      _it_2=Tonyu.iterator(_this._eventHandlers,2);
      while(_it_2.next()) {
        k=_it_2[0];
        v=_it_2[1];
        
        //$LASTPOS=2000285;//kernel.EventMod:285
        v.release();
        
      }
    },
    parseArgs :function _trc_EventMod_parseArgs(a) {
      "use strict";
      var _this=this;
      var res;
      var i;
      
      //$LASTPOS=2000335;//kernel.EventMod:335
      res = {type: a[0],args: []};
      
      //$LASTPOS=2000369;//kernel.EventMod:369
      //$LASTPOS=2000374;//kernel.EventMod:374
      i = 1;
      for (; i<a.length ; i++) {
        {
          //$LASTPOS=2000412;//kernel.EventMod:412
          res.args.push(a[i]);
        }
      }
      return res;
    },
    registerEventHandler :function _trc_EventMod_registerEventHandler(type,obj) {
      "use strict";
      var _this=this;
      var cl;
      
      //$LASTPOS=2000535;//kernel.EventMod:535
      _this.initEventMod();
      //$LASTPOS=2000555;//kernel.EventMod:555
      if (typeof  type=="function") {
        //$LASTPOS=2000594;//kernel.EventMod:594
        obj=obj||new type({target: _this});
        //$LASTPOS=2000634;//kernel.EventMod:634
        type=obj.getClassInfo().fullName;
        
      } else {
        //$LASTPOS=2000689;//kernel.EventMod:689
        if (! obj) {
          //$LASTPOS=2000713;//kernel.EventMod:713
          cl = Tonyu.globals.$Boot.eventTypes[type]||Tonyu.classes.kernel.EventHandler;
          
          //$LASTPOS=2000772;//kernel.EventMod:772
          obj=new cl({target: _this});
          
        }
        
      }
      return _this._eventHandlers[type]=obj;
    },
    getEventHandler :function _trc_EventMod_getEventHandler(type) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=2000985;//kernel.EventMod:985
      _this.initEventMod();
      //$LASTPOS=2001005;//kernel.EventMod:1005
      if (typeof  type=="function") {
        //$LASTPOS=2001044;//kernel.EventMod:1044
        type=type.meta.fullName;
        
      }
      //$LASTPOS=2001079;//kernel.EventMod:1079
      res = _this._eventHandlers[type];
      
      return res;
    },
    getOrRegisterEventHandler :function _trc_EventMod_getOrRegisterEventHandler(type) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=2001175;//kernel.EventMod:1175
      res = _this.getEventHandler(type)||_this.registerEventHandler(type);
      
      return res;
    },
    on :function _trc_EventMod_on() {
      "use strict";
      var _this=this;
      var a;
      var h;
      
      //$LASTPOS=2001278;//kernel.EventMod:1278
      a = _this.parseArgs(arguments);
      
      //$LASTPOS=2001311;//kernel.EventMod:1311
      h = _this.getOrRegisterEventHandler(a.type);
      
      return h.addListener.apply(h,a.args);
    },
    fireEvent :function _trc_EventMod_fireEvent(type,arg) {
      "use strict";
      var _this=this;
      var h;
      
      //$LASTPOS=2001496;//kernel.EventMod:1496
      h = _this.getEventHandler(type);
      
      //$LASTPOS=2001530;//kernel.EventMod:1530
      if (h) {
        //$LASTPOS=2001537;//kernel.EventMod:1537
        h.fire([arg]);
      }
    },
    sendEvent :function _trc_EventMod_sendEvent(type,arg) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2001592;//kernel.EventMod:1592
      _this.fireEvent(type,arg);
    },
    waitEvent :function _trc_EventMod_waitEvent() {
      "use strict";
      var _this=this;
      var args;
      var act;
      
      //$LASTPOS=2001639;//kernel.EventMod:1639
      if (null) {
        //$LASTPOS=2001663;//kernel.EventMod:1663
        args = new Tonyu.classes.kernel.ArgParser(arguments);
        
        //$LASTPOS=2001707;//kernel.EventMod:1707
        act = args.shift(Tonyu.classes.kernel.BaseActor)||_this;
        
        //$LASTPOS=2001755;//kernel.EventMod:1755
        args.trimUndefs();
        //$LASTPOS=2001934;//kernel.EventMod:1934
        null.waitEvent(act,args.toArray());
        
      }
    },
    fiber$waitEvent :function _trc_EventMod_f_waitEvent(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var args;
      var act;
      
      //$LASTPOS=2001639;//kernel.EventMod:1639
      if (_thread) {
        //$LASTPOS=2001663;//kernel.EventMod:1663
        args = new Tonyu.classes.kernel.ArgParser(_arguments);
        
        //$LASTPOS=2001707;//kernel.EventMod:1707
        act = args.shift(Tonyu.classes.kernel.BaseActor)||_this;
        
        //$LASTPOS=2001755;//kernel.EventMod:1755
        args.trimUndefs();
        //$LASTPOS=2001934;//kernel.EventMod:1934
        _thread.waitEvent(act,args.toArray());
        
      }
      
      _thread.retVal=_this;return;
    },
    waitFor :function _trc_EventMod_waitFor(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2002006;//kernel.EventMod:2006
      if (null) {
        //$LASTPOS=2002030;//kernel.EventMod:2030
        null.waitFor(f);
        
      }
    },
    fiber$waitFor :function _trc_EventMod_f_waitFor(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2002006;//kernel.EventMod:2006
      if (_thread) {
        //$LASTPOS=2002030;//kernel.EventMod:2030
        _thread.waitFor(f);
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initEventMod":{"nowait":true},"releaseEventMod":{"nowait":true},"parseArgs":{"nowait":true},"registerEventHandler":{"nowait":true},"getEventHandler":{"nowait":true},"getOrRegisterEventHandler":{"nowait":true},"on":{"nowait":true},"fireEvent":{"nowait":true},"sendEvent":{"nowait":true},"waitEvent":{"nowait":false},"waitFor":{"nowait":false}},"fields":{"_eventHandlers":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.OneframeSpriteMod',
  shortName: 'OneframeSpriteMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_OneframeSpriteMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_OneframeSpriteMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    drawText :function _trc_OneframeSpriteMod_drawText(x,y,text,col,size,zOrder) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000067;//kernel.OneframeSpriteMod:67
      if (! size) {
        //$LASTPOS=3000078;//kernel.OneframeSpriteMod:78
        size=15;
      }
      //$LASTPOS=3000092;//kernel.OneframeSpriteMod:92
      if (! col) {
        //$LASTPOS=3000102;//kernel.OneframeSpriteMod:102
        col="white";
      }
      //$LASTPOS=3000120;//kernel.OneframeSpriteMod:120
      _this.appear(Tonyu.classes.kernel.T1Text,{x: x,y: y,text: text,col: col,size: size,zOrder: zOrder,owner: _this});
    },
    drawLine :function _trc_OneframeSpriteMod_drawLine(x,y,tx,ty,col,zOrder) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000225;//kernel.OneframeSpriteMod:225
      if (! col) {
        //$LASTPOS=3000235;//kernel.OneframeSpriteMod:235
        col="white";
      }
      //$LASTPOS=3000253;//kernel.OneframeSpriteMod:253
      _this.appear(Tonyu.classes.kernel.T1Line,{x: x,y: y,tx: tx,ty: ty,col: col,zOrder: zOrder,owner: _this});
    },
    fillRect :function _trc_OneframeSpriteMod_fillRect(x,y,w,h,col,zOrder) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000353;//kernel.OneframeSpriteMod:353
      _this.appear(Tonyu.classes.kernel.T1Rect,{x: x,y: y,w: w,h: h,col: col,zOrder: zOrder,owner: _this});
    },
    drawSprite :function _trc_OneframeSpriteMod_drawSprite(x,y,p,f,zOrder) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000450;//kernel.OneframeSpriteMod:450
      _this.drawDxSprite(x,y,p,f,zOrder,0,255,1,1);
    },
    drawDxSprite :function _trc_OneframeSpriteMod_drawDxSprite(x,y,p,f,zOrder,angle,alpha,scaleX,scaleY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000564;//kernel.OneframeSpriteMod:564
      _this.appear(Tonyu.classes.kernel.T1Sprite,{x: x,y: y,p: p,f: f,zOrder: zOrder,angle: angle,alpha: alpha,scaleX: scaleX,scaleY: scaleY,owner: _this});
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"drawText":{"nowait":true},"drawLine":{"nowait":true},"fillRect":{"nowait":true},"drawSprite":{"nowait":true},"drawDxSprite":{"nowait":true}},"fields":{"appear":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.TextRectMod',
  shortName: 'TextRectMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_TextRectMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_TextRectMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    drawTextRect :function _trc_TextRectMod_drawTextRect(ctx,text,x,topY,h,align,type) {
      "use strict";
      var _this=this;
      var met;
      var res;
      var t;
      
      //$LASTPOS=4000092;//kernel.TextRectMod:92
      if (! align) {
        //$LASTPOS=4000104;//kernel.TextRectMod:104
        align="center";
      }
      //$LASTPOS=4000125;//kernel.TextRectMod:125
      ctx.textBaseline="top";
      //$LASTPOS=4000154;//kernel.TextRectMod:154
      _this.setFontSize(ctx,h);
      //$LASTPOS=4000180;//kernel.TextRectMod:180
      met = ctx.measureText(text);
      
      //$LASTPOS=4000216;//kernel.TextRectMod:216
      res = {y: topY,w: met.width,h: h};
      
      //$LASTPOS=4000258;//kernel.TextRectMod:258
      t = align.substring(0,1).toLowerCase();
      
      //$LASTPOS=4000305;//kernel.TextRectMod:305
      if (t=="l") {
        //$LASTPOS=4000317;//kernel.TextRectMod:317
        res.x=x;
      } else {
        //$LASTPOS=4000336;//kernel.TextRectMod:336
        if (t=="r") {
          //$LASTPOS=4000348;//kernel.TextRectMod:348
          res.x=x-met.width;
        } else {
          //$LASTPOS=4000377;//kernel.TextRectMod:377
          if (t=="c") {
            //$LASTPOS=4000389;//kernel.TextRectMod:389
            res.x=x-met.width/2;
          }
        }
      }
      //$LASTPOS=4000415;//kernel.TextRectMod:415
      if (type=="fill") {
        //$LASTPOS=4000433;//kernel.TextRectMod:433
        ctx.fillText(text,res.x,topY);
      }
      //$LASTPOS=4000470;//kernel.TextRectMod:470
      if (type=="stroke") {
        //$LASTPOS=4000490;//kernel.TextRectMod:490
        ctx.strokeText(text,res.x,topY);
      }
      return res;
    },
    setFontSize :function _trc_TextRectMod_setFontSize(ctx,sz) {
      "use strict";
      var _this=this;
      var post;
      
      //$LASTPOS=4000588;//kernel.TextRectMod:588
      post = ctx.font.replace(/^[0-9\.]+/,"");
      
      //$LASTPOS=4000636;//kernel.TextRectMod:636
      ctx.font=sz+post;
    },
    fukidashi :function _trc_TextRectMod_fukidashi(ctx,text,x,y,sz) {
      "use strict";
      var _this=this;
      var align;
      var theight;
      var margin;
      var r;
      var fs;
      
      //$LASTPOS=4000714;//kernel.TextRectMod:714
      align = "c";
      
      //$LASTPOS=4000734;//kernel.TextRectMod:734
      theight = 20;
      
      //$LASTPOS=4000755;//kernel.TextRectMod:755
      margin = 5;
      
      //$LASTPOS=4000774;//kernel.TextRectMod:774
      r = _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align);
      
      //$LASTPOS=4000844;//kernel.TextRectMod:844
      ctx.beginPath();
      //$LASTPOS=4000866;//kernel.TextRectMod:866
      ctx.moveTo(x,y);
      //$LASTPOS=4000890;//kernel.TextRectMod:890
      ctx.lineTo(x+margin,y-theight);
      //$LASTPOS=4000929;//kernel.TextRectMod:929
      ctx.lineTo(x+r.w/2+margin,y-theight);
      //$LASTPOS=4000974;//kernel.TextRectMod:974
      ctx.lineTo(x+r.w/2+margin,y-theight-r.h-margin*2);
      //$LASTPOS=4001032;//kernel.TextRectMod:1032
      ctx.lineTo(x-r.w/2-margin,y-theight-r.h-margin*2);
      //$LASTPOS=4001090;//kernel.TextRectMod:1090
      ctx.lineTo(x-r.w/2-margin,y-theight);
      //$LASTPOS=4001135;//kernel.TextRectMod:1135
      ctx.lineTo(x-margin,y-theight);
      //$LASTPOS=4001174;//kernel.TextRectMod:1174
      ctx.closePath();
      //$LASTPOS=4001196;//kernel.TextRectMod:1196
      ctx.fill();
      //$LASTPOS=4001213;//kernel.TextRectMod:1213
      ctx.stroke();
      //$LASTPOS=4001238;//kernel.TextRectMod:1238
      fs = ctx.fillStyle;
      
      //$LASTPOS=4001265;//kernel.TextRectMod:1265
      ctx.fillStyle=ctx.strokeStyle;
      //$LASTPOS=4001301;//kernel.TextRectMod:1301
      _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align,"fill");
      //$LASTPOS=4001374;//kernel.TextRectMod:1374
      ctx.fillStyle=fs;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"drawTextRect":{"nowait":true},"setFontSize":{"nowait":true},"fukidashi":{"nowait":true}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.T2Mod',
  shortName: 'T2Mod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_T2Mod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T2Mod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    bvec :function _trc_T2Mod_bvec(tx,ty) {
      "use strict";
      var _this=this;
      var b2Vec2;
      
      //$LASTPOS=5000037;//kernel.T2Mod:37
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      return new b2Vec2(tx/_this.scale,ty/_this.scale);
    },
    fiber$bvec :function _trc_T2Mod_f_bvec(_thread,tx,ty) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      
      //$LASTPOS=5000037;//kernel.T2Mod:37
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      _thread.retVal=new b2Vec2(tx/_this.scale,ty/_this.scale);return;
      
      
      _thread.retVal=_this;return;
    },
    defv :function _trc_T2Mod_defv(t,d) {
      "use strict";
      var _this=this;
      
      return (t===t&&(typeof  t)==="number")?t:d;
    },
    fiber$defv :function _trc_T2Mod_f_defv(_thread,t,d) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(t===t&&(typeof  t)==="number")?t:d;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"bvec":{"nowait":false},"defv":{"nowait":false}},"fields":{"scale":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.MediaPlayer',
  shortName: 'MediaPlayer',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_MediaPlayer_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_MediaPlayer_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MediaPlayer_play() {
      "use strict";
      var _this=this;
      
    },
    fiber$play :function _trc_MediaPlayer_f_play(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MediaPlayer_stop() {
      "use strict";
      var _this=this;
      
    },
    fiber$stop :function _trc_MediaPlayer_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    playSE :function _trc_MediaPlayer_playSE() {
      "use strict";
      var _this=this;
      
    },
    fiber$playSE :function _trc_MediaPlayer_f_playSE(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setDelay :function _trc_MediaPlayer_setDelay() {
      "use strict";
      var _this=this;
      
    },
    fiber$setDelay :function _trc_MediaPlayer_f_setDelay(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setVolume :function _trc_MediaPlayer_setVolume() {
      "use strict";
      var _this=this;
      
    },
    fiber$setVolume :function _trc_MediaPlayer_f_setVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":false},"setDelay":{"nowait":false},"setVolume":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.ThreadGroupMod',
  shortName: 'ThreadGroupMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_ThreadGroupMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_ThreadGroupMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    isDeadThreadGroup :function _trc_ThreadGroupMod_isDeadThreadGroup() {
      "use strict";
      var _this=this;
      
      return _this._isDeadThreadGroup=_this._isDeadThreadGroup||(_this._threadGroup&&(_this._threadGroup.objectPoolAge!=_this.tGrpObjectPoolAge||_this._threadGroup.isDeadThreadGroup()));
    },
    fiber$isDeadThreadGroup :function _trc_ThreadGroupMod_f_isDeadThreadGroup(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this._isDeadThreadGroup=_this._isDeadThreadGroup||(_this._threadGroup&&(_this._threadGroup.objectPoolAge!=_this.tGrpObjectPoolAge||_this._threadGroup.isDeadThreadGroup()));return;
      
      
      _thread.retVal=_this;return;
    },
    setThreadGroup :function _trc_ThreadGroupMod_setThreadGroup(g) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=6000252;//kernel.ThreadGroupMod:252
      _this._threadGroup=g;
      //$LASTPOS=6000273;//kernel.ThreadGroupMod:273
      _this.tGrpObjectPoolAge=g.objectPoolAge;
    },
    fiber$setThreadGroup :function _trc_ThreadGroupMod_f_setThreadGroup(_thread,g) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000252;//kernel.ThreadGroupMod:252
      _this._threadGroup=g;
      //$LASTPOS=6000273;//kernel.ThreadGroupMod:273
      _this.tGrpObjectPoolAge=g.objectPoolAge;
      
      _thread.retVal=_this;return;
    },
    killThreadGroup :function _trc_ThreadGroupMod_killThreadGroup() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=6000338;//kernel.ThreadGroupMod:338
      _this._isDeadThreadGroup=true;
    },
    fiber$killThreadGroup :function _trc_ThreadGroupMod_f_killThreadGroup(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000338;//kernel.ThreadGroupMod:338
      _this._isDeadThreadGroup=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"isDeadThreadGroup":{"nowait":false},"setThreadGroup":{"nowait":false},"killThreadGroup":{"nowait":false}},"fields":{"_isDeadThreadGroup":{},"_threadGroup":{},"tGrpObjectPoolAge":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.InputDevice',
  shortName: 'InputDevice',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_InputDevice_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_InputDevice_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_InputDevice_initialize() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=7000091;//kernel.InputDevice:91
      _this.listeners=[];
      //$LASTPOS=7000110;//kernel.InputDevice:110
      _this.touchEmu=true;
      //$LASTPOS=7000130;//kernel.InputDevice:130
      _this.defaultLayer=Tonyu.globals.$Screen;
    },
    handleListeners :function _trc_InputDevice_handleListeners() {
      "use strict";
      var _this=this;
      var l;
      
      //$LASTPOS=7000182;//kernel.InputDevice:182
      l = _this.listeners;
      
      //$LASTPOS=7000204;//kernel.InputDevice:204
      _this.listeners=[];
      //$LASTPOS=7000223;//kernel.InputDevice:223
      while (l.length>0) {
        //$LASTPOS=7000244;//kernel.InputDevice:244
        (l.shift())();
        
      }
    },
    fiber$handleListeners :function _trc_InputDevice_f_handleListeners(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var l;
      
      //$LASTPOS=7000182;//kernel.InputDevice:182
      l = _this.listeners;
      
      //$LASTPOS=7000204;//kernel.InputDevice:204
      _this.listeners=[];
      
      _thread.enter(function _trc_InputDevice_ent_handleListeners(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=7000223;//kernel.InputDevice:223
          case 1:
            if (!(l.length>0)) { __pc=2     ; break; }
            {
              //$LASTPOS=7000244;//kernel.InputDevice:244
              (l.shift())();
            }
            __pc=1;break;
          case 2     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    addOnetimeListener :function _trc_InputDevice_addOnetimeListener(l) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=7000294;//kernel.InputDevice:294
      _this.listeners.push(l);
    },
    fiber$addOnetimeListener :function _trc_InputDevice_f_addOnetimeListener(_thread,l) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=7000294;//kernel.InputDevice:294
      _this.listeners.push(l);
      
      _thread.retVal=_this;return;
    },
    newTouch :function _trc_InputDevice_newTouch(i) {
      "use strict";
      var _this=this;
      
      return {index: i,x: 0,y: 0,vx: 0,vy: 0,touched: 0,identifier: - 1,ended: false};
    },
    fiber$newTouch :function _trc_InputDevice_f_newTouch(_thread,i) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal={index: i,x: 0,y: 0,vx: 0,vy: 0,touched: 0,identifier: - 1,ended: false};return;
      
      
      _thread.retVal=_this;return;
    },
    initCanvasEvents :function _trc_InputDevice_initCanvasEvents(cvj) {
      "use strict";
      var _this=this;
      var cv;
      var ID_MOUSE;
      var i;
      var handleMouseDown;
      var handleMouseMove;
      var handleMouseUp;
      var handleTouchStart;
      var handleTouchMove;
      var handleTouchEnd;
      var d;
      
      //$LASTPOS=7000443;//kernel.InputDevice:443
      cv = cvj[0];
      
      //$LASTPOS=7000463;//kernel.InputDevice:463
      ID_MOUSE = 31238612;
      
      //$LASTPOS=7000491;//kernel.InputDevice:491
      Tonyu.globals.$handleMouseDown=(function anonymous_508(e) {
        var p;
        var mp;
        
        //$LASTPOS=7000524;//kernel.InputDevice:524
        Tonyu.resetLoopCheck();
        //$LASTPOS=7000557;//kernel.InputDevice:557
        p = cvj.offset();
        
        //$LASTPOS=7000586;//kernel.InputDevice:586
        mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
        
        //$LASTPOS=7000663;//kernel.InputDevice:663
        mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
        //$LASTPOS=7000735;//kernel.InputDevice:735
        Tonyu.globals.$mouseX=mp.x;
        //$LASTPOS=7000758;//kernel.InputDevice:758
        Tonyu.globals.$mouseY=mp.y;
        //$LASTPOS=7000781;//kernel.InputDevice:781
        _this.isMouseDown=true;
        //$LASTPOS=7000808;//kernel.InputDevice:808
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7000850;//kernel.InputDevice:850
          Tonyu.globals.$handleTouchStart({preventDefault: (function anonymous_902() {
            
          }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
          
        }
        //$LASTPOS=7001217;//kernel.InputDevice:1217
        _this.handleListeners();
      });
      //$LASTPOS=7001249;//kernel.InputDevice:1249
      Tonyu.globals.$handleMouseMove=(function anonymous_1266(e) {
        var p;
        var mp;
        
        //$LASTPOS=7001282;//kernel.InputDevice:1282
        Tonyu.resetLoopCheck();
        //$LASTPOS=7001315;//kernel.InputDevice:1315
        p = cvj.offset();
        
        //$LASTPOS=7001344;//kernel.InputDevice:1344
        mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
        
        //$LASTPOS=7001421;//kernel.InputDevice:1421
        mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
        //$LASTPOS=7001493;//kernel.InputDevice:1493
        Tonyu.globals.$mouseX=mp.x;
        //$LASTPOS=7001516;//kernel.InputDevice:1516
        Tonyu.globals.$mouseY=mp.y;
        //$LASTPOS=7001539;//kernel.InputDevice:1539
        if (_this.isMouseDown&&Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7001596;//kernel.InputDevice:1596
          Tonyu.globals.$handleTouchMove({preventDefault: (function anonymous_1647() {
            
          }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
          
        }
        //$LASTPOS=7001962;//kernel.InputDevice:1962
        _this.handleListeners();
      });
      //$LASTPOS=7002049;//kernel.InputDevice:2049
      Tonyu.globals.$handleMouseUp=(function anonymous_2064(e) {
        
        //$LASTPOS=7002080;//kernel.InputDevice:2080
        Tonyu.resetLoopCheck();
        //$LASTPOS=7002113;//kernel.InputDevice:2113
        _this.isMouseDown=false;
        //$LASTPOS=7002141;//kernel.InputDevice:2141
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=7002183;//kernel.InputDevice:2183
          Tonyu.globals.$handleTouchEnd({preventDefault: (function anonymous_2233() {
            
          }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
          
        }
      });
      //$LASTPOS=7002552;//kernel.InputDevice:2552
      Tonyu.globals.$touches=[];
      //$LASTPOS=7002570;//kernel.InputDevice:2570
      //$LASTPOS=7002575;//kernel.InputDevice:2575
      i = 0;
      for (; i<5 ; i++) {
        //$LASTPOS=7002591;//kernel.InputDevice:2591
        Tonyu.globals.$touches.push(_this.newTouch(i));
      }
      //$LASTPOS=7002624;//kernel.InputDevice:2624
      Tonyu.globals.$touches.findById=(function anonymous_2642(id) {
        var j;
        
        //$LASTPOS=7002659;//kernel.InputDevice:2659
        //$LASTPOS=7002664;//kernel.InputDevice:2664
        j = 0;
        for (; j<Tonyu.globals.$touches.length ; j++) {
          {
            //$LASTPOS=7002714;//kernel.InputDevice:2714
            if (Tonyu.globals.$touches[j].identifier==id) {
              return Tonyu.globals.$touches[j];
              
            }
          }
        }
      });
      //$LASTPOS=7002824;//kernel.InputDevice:2824
      Tonyu.globals.$touches.findWithin=(function anonymous_2844(o,d) {
        var j;
        
        //$LASTPOS=7002870;//kernel.InputDevice:2870
        //$LASTPOS=7002875;//kernel.InputDevice:2875
        j = 0;
        for (; j<Tonyu.globals.$touches.length ; j++) {
          {
            //$LASTPOS=7002925;//kernel.InputDevice:2925
            if (o.within(Tonyu.globals.$touches[j],d)) {
              return Tonyu.globals.$touches[j];
              
            }
          }
        }
      });
      //$LASTPOS=7003032;//kernel.InputDevice:3032
      Tonyu.globals.$handleTouchStart=(function anonymous_3050(e) {
        var p;
        var ts;
        var dst;
        var i;
        var src;
        var j;
        
        //$LASTPOS=7003066;//kernel.InputDevice:3066
        Tonyu.resetLoopCheck();
        //$LASTPOS=7003099;//kernel.InputDevice:3099
        Tonyu.globals.$t2MediaLib.activate();
        //$LASTPOS=7003132;//kernel.InputDevice:3132
        p = cvj.offset();
        
        //$LASTPOS=7003161;//kernel.InputDevice:3161
        e.preventDefault();
        //$LASTPOS=7003190;//kernel.InputDevice:3190
        ts = e.originalEvent.changedTouches;
        
        
        //$LASTPOS=7003256;//kernel.InputDevice:3256
        //$LASTPOS=7003261;//kernel.InputDevice:3261
        i = 0;
        for (; i<ts.length ; i++) {
          {
            //$LASTPOS=7003306;//kernel.InputDevice:3306
            src = ts[i];
            
            //$LASTPOS=7003334;//kernel.InputDevice:3334
            //$LASTPOS=7003339;//kernel.InputDevice:3339
            j = 0;
            for (; j<Tonyu.globals.$touches.length ; j++) {
              {
                //$LASTPOS=7003393;//kernel.InputDevice:3393
                if (! Tonyu.globals.$touches[j].touched) {
                  //$LASTPOS=7003442;//kernel.InputDevice:3442
                  dst=Tonyu.globals.$touches[j];
                  //$LASTPOS=7003480;//kernel.InputDevice:3480
                  dst.identifier=src.identifier;
                  break;
                  
                  
                }
              }
            }
            //$LASTPOS=7003586;//kernel.InputDevice:3586
            if (dst) {
              //$LASTPOS=7003614;//kernel.InputDevice:3614
              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
              //$LASTPOS=7003695;//kernel.InputDevice:3695
              _this.mp=Tonyu.globals.$Screen.convert(_this.mp,_this.defaultLayer);
              //$LASTPOS=7003774;//kernel.InputDevice:3774
              dst.px=dst.x=_this.mp.x;
              //$LASTPOS=7003810;//kernel.InputDevice:3810
              dst.py=dst.y=_this.mp.y;
              //$LASTPOS=7003846;//kernel.InputDevice:3846
              dst.touched=1;
              
            }
          }
        }
        //$LASTPOS=7003896;//kernel.InputDevice:3896
        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
        //$LASTPOS=7003928;//kernel.InputDevice:3928
        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
        //$LASTPOS=7003960;//kernel.InputDevice:3960
        _this.handleListeners();
      });
      //$LASTPOS=7003992;//kernel.InputDevice:3992
      Tonyu.globals.$handleTouchMove=(function anonymous_4009(e) {
        var p;
        var ts;
        var dst;
        var i;
        var src;
        
        //$LASTPOS=7004025;//kernel.InputDevice:4025
        Tonyu.resetLoopCheck();
        //$LASTPOS=7004058;//kernel.InputDevice:4058
        Tonyu.globals.$t2MediaLib.activate();
        //$LASTPOS=7004091;//kernel.InputDevice:4091
        p = cvj.offset();
        
        //$LASTPOS=7004120;//kernel.InputDevice:4120
        e.preventDefault();
        //$LASTPOS=7004149;//kernel.InputDevice:4149
        ts = e.originalEvent.changedTouches;
        
        
        //$LASTPOS=7004215;//kernel.InputDevice:4215
        //$LASTPOS=7004220;//kernel.InputDevice:4220
        i = 0;
        for (; i<ts.length ; i++) {
          {
            //$LASTPOS=7004265;//kernel.InputDevice:4265
            src = ts[i];
            
            //$LASTPOS=7004293;//kernel.InputDevice:4293
            dst = Tonyu.globals.$touches.findById(src.identifier);
            
            //$LASTPOS=7004349;//kernel.InputDevice:4349
            if (dst) {
              //$LASTPOS=7004377;//kernel.InputDevice:4377
              _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
              //$LASTPOS=7004458;//kernel.InputDevice:4458
              _this.mp=Tonyu.globals.$Screen.convert(_this.mp,_this.defaultLayer);
              //$LASTPOS=7004537;//kernel.InputDevice:4537
              dst.x=_this.mp.x;
              //$LASTPOS=7004566;//kernel.InputDevice:4566
              dst.y=_this.mp.y;
              
            }
          }
        }
        //$LASTPOS=7004613;//kernel.InputDevice:4613
        Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
        //$LASTPOS=7004645;//kernel.InputDevice:4645
        Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
        //$LASTPOS=7004677;//kernel.InputDevice:4677
        _this.handleListeners();
      });
      //$LASTPOS=7004709;//kernel.InputDevice:4709
      Tonyu.globals.$handleTouchEnd=(function anonymous_4725(e) {
        var ts;
        var i;
        var src;
        var dst;
        
        //$LASTPOS=7004741;//kernel.InputDevice:4741
        Tonyu.resetLoopCheck();
        //$LASTPOS=7004774;//kernel.InputDevice:4774
        Tonyu.globals.$t2MediaLib.activate();
        //$LASTPOS=7004807;//kernel.InputDevice:4807
        ts = e.originalEvent.changedTouches;
        
        //$LASTPOS=7004855;//kernel.InputDevice:4855
        //$LASTPOS=7004860;//kernel.InputDevice:4860
        i = 0;
        for (; i<ts.length ; i++) {
          {
            //$LASTPOS=7004905;//kernel.InputDevice:4905
            src = ts[i];
            
            //$LASTPOS=7004933;//kernel.InputDevice:4933
            dst = Tonyu.globals.$touches.findById(src.identifier);
            
            //$LASTPOS=7004989;//kernel.InputDevice:4989
            if (dst) {
              //$LASTPOS=7005017;//kernel.InputDevice:5017
              Tonyu.globals.$touches[dst.index]=Tonyu.globals.$InputDevice.newTouch(dst.index);
              //$LASTPOS=7005088;//kernel.InputDevice:5088
              Tonyu.globals.$touches[dst.index].x=dst.x;
              //$LASTPOS=7005134;//kernel.InputDevice:5134
              Tonyu.globals.$touches[dst.index].y=dst.y;
              //$LASTPOS=7005180;//kernel.InputDevice:5180
              dst.ended=true;
              
            }
          }
        }
        //$LASTPOS=7005337;//kernel.InputDevice:5337
        _this.handleListeners();
      });
      //$LASTPOS=7005369;//kernel.InputDevice:5369
      Tonyu.globals.$unsetTouchEmu=(function anonymous_5384() {
        var i;
        var t;
        var _it_67;
        
        //$LASTPOS=7005399;//kernel.InputDevice:5399
        Tonyu.resetLoopCheck();
        //$LASTPOS=7005432;//kernel.InputDevice:5432
        Tonyu.globals.$InputDevice.touchEmu=false;
        //$LASTPOS=7005470;//kernel.InputDevice:5470
        _it_67=Tonyu.iterator(Tonyu.globals.$touches,2);
        while(_it_67.next()) {
          i=_it_67[0];
          t=_it_67[1];
          
          //$LASTPOS=7005511;//kernel.InputDevice:5511
          if (t.identifier==ID_MOUSE) {
            //$LASTPOS=7005558;//kernel.InputDevice:5558
            t[i]=Tonyu.globals.$InputDevice.newTouch(i);
            
          }
          
        }
      });
      //$LASTPOS=7005628;//kernel.InputDevice:5628
      handleMouseDown = (function anonymous_5648(e) {
        
        //$LASTPOS=7005653;//kernel.InputDevice:5653
        Tonyu.globals.$handleMouseDown(e);
      });
      
      //$LASTPOS=7005681;//kernel.InputDevice:5681
      handleMouseMove = (function anonymous_5701(e) {
        
        //$LASTPOS=7005706;//kernel.InputDevice:5706
        Tonyu.globals.$handleMouseMove(e);
      });
      
      //$LASTPOS=7005734;//kernel.InputDevice:5734
      handleMouseUp = (function anonymous_5752(e) {
        
        //$LASTPOS=7005757;//kernel.InputDevice:5757
        Tonyu.globals.$handleMouseUp(e);
      });
      
      //$LASTPOS=7005783;//kernel.InputDevice:5783
      handleTouchStart = (function anonymous_5804(e) {
        
        //$LASTPOS=7005809;//kernel.InputDevice:5809
        Tonyu.globals.$unsetTouchEmu();
        //$LASTPOS=7005826;//kernel.InputDevice:5826
        Tonyu.globals.$handleTouchStart(e);
      });
      
      //$LASTPOS=7005855;//kernel.InputDevice:5855
      handleTouchMove = (function anonymous_5875(e) {
        
        //$LASTPOS=7005880;//kernel.InputDevice:5880
        Tonyu.globals.$unsetTouchEmu();
        //$LASTPOS=7005897;//kernel.InputDevice:5897
        Tonyu.globals.$handleTouchMove(e);
      });
      
      //$LASTPOS=7005925;//kernel.InputDevice:5925
      handleTouchEnd = (function anonymous_5944(e) {
        
        //$LASTPOS=7005949;//kernel.InputDevice:5949
        Tonyu.globals.$unsetTouchEmu();
        //$LASTPOS=7005966;//kernel.InputDevice:5966
        Tonyu.globals.$handleTouchEnd(e);
      });
      
      //$LASTPOS=7005993;//kernel.InputDevice:5993
      d = $.data(cv,"events");
      
      //$LASTPOS=7006025;//kernel.InputDevice:6025
      if (! d) {
        //$LASTPOS=7006044;//kernel.InputDevice:6044
        $.data(cv,"events","true");
        //$LASTPOS=7006081;//kernel.InputDevice:6081
        cvj.mousedown(handleMouseDown);
        //$LASTPOS=7006122;//kernel.InputDevice:6122
        cvj.mousemove(handleMouseMove);
        //$LASTPOS=7006163;//kernel.InputDevice:6163
        cvj.mouseup(handleMouseUp);
        //$LASTPOS=7006200;//kernel.InputDevice:6200
        cvj.on("touchstart",handleTouchStart);
        //$LASTPOS=7006248;//kernel.InputDevice:6248
        cvj.on("touchmove",handleTouchMove);
        //$LASTPOS=7006294;//kernel.InputDevice:6294
        cvj.on("touchend",handleTouchEnd);
        //$LASTPOS=7006338;//kernel.InputDevice:6338
        cvj.on("touchcancel",handleTouchEnd);
        
      }
    },
    fiber$initCanvasEvents :function _trc_InputDevice_f_initCanvasEvents(_thread,cvj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cv;
      var ID_MOUSE;
      var i;
      var handleMouseDown;
      var handleMouseMove;
      var handleMouseUp;
      var handleTouchStart;
      var handleTouchMove;
      var handleTouchEnd;
      var d;
      
      //$LASTPOS=7000443;//kernel.InputDevice:443
      cv = cvj[0];
      
      //$LASTPOS=7000463;//kernel.InputDevice:463
      ID_MOUSE = 31238612;
      
      
      _thread.enter(function _trc_InputDevice_ent_initCanvasEvents(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=7000491;//kernel.InputDevice:491
            Tonyu.globals.$handleMouseDown=(function anonymous_508(e) {
              var p;
              var mp;
              
              //$LASTPOS=7000524;//kernel.InputDevice:524
              Tonyu.resetLoopCheck();
              //$LASTPOS=7000557;//kernel.InputDevice:557
              p = cvj.offset();
              
              //$LASTPOS=7000586;//kernel.InputDevice:586
              mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
              
              //$LASTPOS=7000663;//kernel.InputDevice:663
              mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
              //$LASTPOS=7000735;//kernel.InputDevice:735
              Tonyu.globals.$mouseX=mp.x;
              //$LASTPOS=7000758;//kernel.InputDevice:758
              Tonyu.globals.$mouseY=mp.y;
              //$LASTPOS=7000781;//kernel.InputDevice:781
              _this.isMouseDown=true;
              //$LASTPOS=7000808;//kernel.InputDevice:808
              if (Tonyu.globals.$InputDevice.touchEmu) {
                //$LASTPOS=7000850;//kernel.InputDevice:850
                Tonyu.globals.$handleTouchStart({preventDefault: (function anonymous_902() {
                  
                }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
                
              }
              //$LASTPOS=7001217;//kernel.InputDevice:1217
              _this.handleListeners();
            });
            //$LASTPOS=7001249;//kernel.InputDevice:1249
            Tonyu.globals.$handleMouseMove=(function anonymous_1266(e) {
              var p;
              var mp;
              
              //$LASTPOS=7001282;//kernel.InputDevice:1282
              Tonyu.resetLoopCheck();
              //$LASTPOS=7001315;//kernel.InputDevice:1315
              p = cvj.offset();
              
              //$LASTPOS=7001344;//kernel.InputDevice:1344
              mp = {x: e.clientX-p.left,y: e.clientY-p.top,layer: Tonyu.globals.$Screen.layer};
              
              //$LASTPOS=7001421;//kernel.InputDevice:1421
              mp=Tonyu.globals.$Screen.convert(mp,_this.defaultLayer);
              //$LASTPOS=7001493;//kernel.InputDevice:1493
              Tonyu.globals.$mouseX=mp.x;
              //$LASTPOS=7001516;//kernel.InputDevice:1516
              Tonyu.globals.$mouseY=mp.y;
              //$LASTPOS=7001539;//kernel.InputDevice:1539
              if (_this.isMouseDown&&Tonyu.globals.$InputDevice.touchEmu) {
                //$LASTPOS=7001596;//kernel.InputDevice:1596
                Tonyu.globals.$handleTouchMove({preventDefault: (function anonymous_1647() {
                  
                }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
                
              }
              //$LASTPOS=7001962;//kernel.InputDevice:1962
              _this.handleListeners();
            });
            //$LASTPOS=7002049;//kernel.InputDevice:2049
            Tonyu.globals.$handleMouseUp=(function anonymous_2064(e) {
              
              //$LASTPOS=7002080;//kernel.InputDevice:2080
              Tonyu.resetLoopCheck();
              //$LASTPOS=7002113;//kernel.InputDevice:2113
              _this.isMouseDown=false;
              //$LASTPOS=7002141;//kernel.InputDevice:2141
              if (Tonyu.globals.$InputDevice.touchEmu) {
                //$LASTPOS=7002183;//kernel.InputDevice:2183
                Tonyu.globals.$handleTouchEnd({preventDefault: (function anonymous_2233() {
                  
                }),originalEvent: {changedTouches: [{identifier: ID_MOUSE,pageX: e.clientX,pageY: e.clientY}]}});
                
              }
            });
            //$LASTPOS=7002552;//kernel.InputDevice:2552
            Tonyu.globals.$touches=[];
            //$LASTPOS=7002570;//kernel.InputDevice:2570
            //$LASTPOS=7002575;//kernel.InputDevice:2575
            i = 0;
            for (; i<5 ; i++) {
              //$LASTPOS=7002591;//kernel.InputDevice:2591
              Tonyu.globals.$touches.push(_this.newTouch(i));
            }
            //$LASTPOS=7002624;//kernel.InputDevice:2624
            Tonyu.globals.$touches.findById=(function anonymous_2642(id) {
              var j;
              
              //$LASTPOS=7002659;//kernel.InputDevice:2659
              //$LASTPOS=7002664;//kernel.InputDevice:2664
              j = 0;
              for (; j<Tonyu.globals.$touches.length ; j++) {
                {
                  //$LASTPOS=7002714;//kernel.InputDevice:2714
                  if (Tonyu.globals.$touches[j].identifier==id) {
                    return Tonyu.globals.$touches[j];
                    
                  }
                }
              }
            });
            //$LASTPOS=7002824;//kernel.InputDevice:2824
            Tonyu.globals.$touches.findWithin=(function anonymous_2844(o,d) {
              var j;
              
              //$LASTPOS=7002870;//kernel.InputDevice:2870
              //$LASTPOS=7002875;//kernel.InputDevice:2875
              j = 0;
              for (; j<Tonyu.globals.$touches.length ; j++) {
                {
                  //$LASTPOS=7002925;//kernel.InputDevice:2925
                  if (o.within(Tonyu.globals.$touches[j],d)) {
                    return Tonyu.globals.$touches[j];
                    
                  }
                }
              }
            });
            //$LASTPOS=7003032;//kernel.InputDevice:3032
            Tonyu.globals.$handleTouchStart=(function anonymous_3050(e) {
              var p;
              var ts;
              var dst;
              var i;
              var src;
              var j;
              
              //$LASTPOS=7003066;//kernel.InputDevice:3066
              Tonyu.resetLoopCheck();
              //$LASTPOS=7003099;//kernel.InputDevice:3099
              Tonyu.globals.$t2MediaLib.activate();
              //$LASTPOS=7003132;//kernel.InputDevice:3132
              p = cvj.offset();
              
              //$LASTPOS=7003161;//kernel.InputDevice:3161
              e.preventDefault();
              //$LASTPOS=7003190;//kernel.InputDevice:3190
              ts = e.originalEvent.changedTouches;
              
              
              //$LASTPOS=7003256;//kernel.InputDevice:3256
              //$LASTPOS=7003261;//kernel.InputDevice:3261
              i = 0;
              for (; i<ts.length ; i++) {
                {
                  //$LASTPOS=7003306;//kernel.InputDevice:3306
                  src = ts[i];
                  
                  //$LASTPOS=7003334;//kernel.InputDevice:3334
                  //$LASTPOS=7003339;//kernel.InputDevice:3339
                  j = 0;
                  for (; j<Tonyu.globals.$touches.length ; j++) {
                    {
                      //$LASTPOS=7003393;//kernel.InputDevice:3393
                      if (! Tonyu.globals.$touches[j].touched) {
                        //$LASTPOS=7003442;//kernel.InputDevice:3442
                        dst=Tonyu.globals.$touches[j];
                        //$LASTPOS=7003480;//kernel.InputDevice:3480
                        dst.identifier=src.identifier;
                        break;
                        
                        
                      }
                    }
                  }
                  //$LASTPOS=7003586;//kernel.InputDevice:3586
                  if (dst) {
                    //$LASTPOS=7003614;//kernel.InputDevice:3614
                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
                    //$LASTPOS=7003695;//kernel.InputDevice:3695
                    _this.mp=Tonyu.globals.$Screen.convert(_this.mp,_this.defaultLayer);
                    //$LASTPOS=7003774;//kernel.InputDevice:3774
                    dst.px=dst.x=_this.mp.x;
                    //$LASTPOS=7003810;//kernel.InputDevice:3810
                    dst.py=dst.y=_this.mp.y;
                    //$LASTPOS=7003846;//kernel.InputDevice:3846
                    dst.touched=1;
                    
                  }
                }
              }
              //$LASTPOS=7003896;//kernel.InputDevice:3896
              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
              //$LASTPOS=7003928;//kernel.InputDevice:3928
              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
              //$LASTPOS=7003960;//kernel.InputDevice:3960
              _this.handleListeners();
            });
            //$LASTPOS=7003992;//kernel.InputDevice:3992
            Tonyu.globals.$handleTouchMove=(function anonymous_4009(e) {
              var p;
              var ts;
              var dst;
              var i;
              var src;
              
              //$LASTPOS=7004025;//kernel.InputDevice:4025
              Tonyu.resetLoopCheck();
              //$LASTPOS=7004058;//kernel.InputDevice:4058
              Tonyu.globals.$t2MediaLib.activate();
              //$LASTPOS=7004091;//kernel.InputDevice:4091
              p = cvj.offset();
              
              //$LASTPOS=7004120;//kernel.InputDevice:4120
              e.preventDefault();
              //$LASTPOS=7004149;//kernel.InputDevice:4149
              ts = e.originalEvent.changedTouches;
              
              
              //$LASTPOS=7004215;//kernel.InputDevice:4215
              //$LASTPOS=7004220;//kernel.InputDevice:4220
              i = 0;
              for (; i<ts.length ; i++) {
                {
                  //$LASTPOS=7004265;//kernel.InputDevice:4265
                  src = ts[i];
                  
                  //$LASTPOS=7004293;//kernel.InputDevice:4293
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  
                  //$LASTPOS=7004349;//kernel.InputDevice:4349
                  if (dst) {
                    //$LASTPOS=7004377;//kernel.InputDevice:4377
                    _this.mp={x: src.pageX-p.left,y: src.pageY-p.top,layer: Tonyu.globals.$Screen.layer};
                    //$LASTPOS=7004458;//kernel.InputDevice:4458
                    _this.mp=Tonyu.globals.$Screen.convert(_this.mp,_this.defaultLayer);
                    //$LASTPOS=7004537;//kernel.InputDevice:4537
                    dst.x=_this.mp.x;
                    //$LASTPOS=7004566;//kernel.InputDevice:4566
                    dst.y=_this.mp.y;
                    
                  }
                }
              }
              //$LASTPOS=7004613;//kernel.InputDevice:4613
              Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
              //$LASTPOS=7004645;//kernel.InputDevice:4645
              Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
              //$LASTPOS=7004677;//kernel.InputDevice:4677
              _this.handleListeners();
            });
            //$LASTPOS=7004709;//kernel.InputDevice:4709
            Tonyu.globals.$handleTouchEnd=(function anonymous_4725(e) {
              var ts;
              var i;
              var src;
              var dst;
              
              //$LASTPOS=7004741;//kernel.InputDevice:4741
              Tonyu.resetLoopCheck();
              //$LASTPOS=7004774;//kernel.InputDevice:4774
              Tonyu.globals.$t2MediaLib.activate();
              //$LASTPOS=7004807;//kernel.InputDevice:4807
              ts = e.originalEvent.changedTouches;
              
              //$LASTPOS=7004855;//kernel.InputDevice:4855
              //$LASTPOS=7004860;//kernel.InputDevice:4860
              i = 0;
              for (; i<ts.length ; i++) {
                {
                  //$LASTPOS=7004905;//kernel.InputDevice:4905
                  src = ts[i];
                  
                  //$LASTPOS=7004933;//kernel.InputDevice:4933
                  dst = Tonyu.globals.$touches.findById(src.identifier);
                  
                  //$LASTPOS=7004989;//kernel.InputDevice:4989
                  if (dst) {
                    //$LASTPOS=7005017;//kernel.InputDevice:5017
                    Tonyu.globals.$touches[dst.index]=Tonyu.globals.$InputDevice.newTouch(dst.index);
                    //$LASTPOS=7005088;//kernel.InputDevice:5088
                    Tonyu.globals.$touches[dst.index].x=dst.x;
                    //$LASTPOS=7005134;//kernel.InputDevice:5134
                    Tonyu.globals.$touches[dst.index].y=dst.y;
                    //$LASTPOS=7005180;//kernel.InputDevice:5180
                    dst.ended=true;
                    
                  }
                }
              }
              //$LASTPOS=7005337;//kernel.InputDevice:5337
              _this.handleListeners();
            });
            //$LASTPOS=7005369;//kernel.InputDevice:5369
            Tonyu.globals.$unsetTouchEmu=(function anonymous_5384() {
              var i;
              var t;
              var _it_67;
              
              //$LASTPOS=7005399;//kernel.InputDevice:5399
              Tonyu.resetLoopCheck();
              //$LASTPOS=7005432;//kernel.InputDevice:5432
              Tonyu.globals.$InputDevice.touchEmu=false;
              //$LASTPOS=7005470;//kernel.InputDevice:5470
              _it_67=Tonyu.iterator(Tonyu.globals.$touches,2);
              while(_it_67.next()) {
                i=_it_67[0];
                t=_it_67[1];
                
                //$LASTPOS=7005511;//kernel.InputDevice:5511
                if (t.identifier==ID_MOUSE) {
                  //$LASTPOS=7005558;//kernel.InputDevice:5558
                  t[i]=Tonyu.globals.$InputDevice.newTouch(i);
                  
                }
                
              }
            });
            //$LASTPOS=7005628;//kernel.InputDevice:5628
            handleMouseDown = (function anonymous_5648(e) {
              
              //$LASTPOS=7005653;//kernel.InputDevice:5653
              Tonyu.globals.$handleMouseDown(e);
            });
            
            //$LASTPOS=7005681;//kernel.InputDevice:5681
            handleMouseMove = (function anonymous_5701(e) {
              
              //$LASTPOS=7005706;//kernel.InputDevice:5706
              Tonyu.globals.$handleMouseMove(e);
            });
            
            //$LASTPOS=7005734;//kernel.InputDevice:5734
            handleMouseUp = (function anonymous_5752(e) {
              
              //$LASTPOS=7005757;//kernel.InputDevice:5757
              Tonyu.globals.$handleMouseUp(e);
            });
            
            //$LASTPOS=7005783;//kernel.InputDevice:5783
            handleTouchStart = (function anonymous_5804(e) {
              
              //$LASTPOS=7005809;//kernel.InputDevice:5809
              Tonyu.globals.$unsetTouchEmu();
              //$LASTPOS=7005826;//kernel.InputDevice:5826
              Tonyu.globals.$handleTouchStart(e);
            });
            
            //$LASTPOS=7005855;//kernel.InputDevice:5855
            handleTouchMove = (function anonymous_5875(e) {
              
              //$LASTPOS=7005880;//kernel.InputDevice:5880
              Tonyu.globals.$unsetTouchEmu();
              //$LASTPOS=7005897;//kernel.InputDevice:5897
              Tonyu.globals.$handleTouchMove(e);
            });
            
            //$LASTPOS=7005925;//kernel.InputDevice:5925
            handleTouchEnd = (function anonymous_5944(e) {
              
              //$LASTPOS=7005949;//kernel.InputDevice:5949
              Tonyu.globals.$unsetTouchEmu();
              //$LASTPOS=7005966;//kernel.InputDevice:5966
              Tonyu.globals.$handleTouchEnd(e);
            });
            
            //$LASTPOS=7005993;//kernel.InputDevice:5993
            d = $.data(cv,"events");
            
            //$LASTPOS=7006025;//kernel.InputDevice:6025
            if (! d) {
              //$LASTPOS=7006044;//kernel.InputDevice:6044
              $.data(cv,"events","true");
              //$LASTPOS=7006081;//kernel.InputDevice:6081
              cvj.mousedown(handleMouseDown);
              //$LASTPOS=7006122;//kernel.InputDevice:6122
              cvj.mousemove(handleMouseMove);
              //$LASTPOS=7006163;//kernel.InputDevice:6163
              cvj.mouseup(handleMouseUp);
              //$LASTPOS=7006200;//kernel.InputDevice:6200
              cvj.on("touchstart",handleTouchStart);
              //$LASTPOS=7006248;//kernel.InputDevice:6248
              cvj.on("touchmove",handleTouchMove);
              //$LASTPOS=7006294;//kernel.InputDevice:6294
              cvj.on("touchend",handleTouchEnd);
              //$LASTPOS=7006338;//kernel.InputDevice:6338
              cvj.on("touchcancel",handleTouchEnd);
              
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    update :function _trc_InputDevice_update() {
      "use strict";
      var _this=this;
      var i;
      var _it_77;
      
      //$LASTPOS=7006406;//kernel.InputDevice:6406
      _it_77=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_77.next()) {
        i=_it_77[0];
        
        //$LASTPOS=7006441;//kernel.InputDevice:6441
        if (i.touched>0) {
          //$LASTPOS=7006459;//kernel.InputDevice:6459
          i.touched++;
          
        } else {
          //$LASTPOS=7006487;//kernel.InputDevice:6487
          if (i.touched==- 1) {
            //$LASTPOS=7006506;//kernel.InputDevice:6506
            i.touched=1;
          } else {
            //$LASTPOS=7006548;//kernel.InputDevice:6548
            i.vx=i.vy=0;
            //$LASTPOS=7006574;//kernel.InputDevice:6574
            i.px=null;
            
          }
        }
        //$LASTPOS=7006605;//kernel.InputDevice:6605
        if (i.touched>0) {
          //$LASTPOS=7006637;//kernel.InputDevice:6637
          if (typeof  i.px=="number") {
            //$LASTPOS=7006683;//kernel.InputDevice:6683
            i.vx=i.x-i.px||0;
            //$LASTPOS=7006720;//kernel.InputDevice:6720
            i.vy=i.y-i.py||0;
            
          }
          //$LASTPOS=7006768;//kernel.InputDevice:6768
          i.px=i.x;
          //$LASTPOS=7006791;//kernel.InputDevice:6791
          i.py=i.y;
          
        }
        
      }
    },
    fiber$update :function _trc_InputDevice_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var _it_77;
      
      //$LASTPOS=7006406;//kernel.InputDevice:6406
      _it_77=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_77.next()) {
        i=_it_77[0];
        
        //$LASTPOS=7006441;//kernel.InputDevice:6441
        if (i.touched>0) {
          //$LASTPOS=7006459;//kernel.InputDevice:6459
          i.touched++;
          
        } else {
          //$LASTPOS=7006487;//kernel.InputDevice:6487
          if (i.touched==- 1) {
            //$LASTPOS=7006506;//kernel.InputDevice:6506
            i.touched=1;
          } else {
            //$LASTPOS=7006548;//kernel.InputDevice:6548
            i.vx=i.vy=0;
            //$LASTPOS=7006574;//kernel.InputDevice:6574
            i.px=null;
            
          }
        }
        //$LASTPOS=7006605;//kernel.InputDevice:6605
        if (i.touched>0) {
          //$LASTPOS=7006637;//kernel.InputDevice:6637
          if (typeof  i.px=="number") {
            //$LASTPOS=7006683;//kernel.InputDevice:6683
            i.vx=i.x-i.px||0;
            //$LASTPOS=7006720;//kernel.InputDevice:6720
            i.vy=i.y-i.py||0;
            
          }
          //$LASTPOS=7006768;//kernel.InputDevice:6768
          i.px=i.x;
          //$LASTPOS=7006791;//kernel.InputDevice:6791
          i.py=i.y;
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"handleListeners":{"nowait":false},"addOnetimeListener":{"nowait":false},"newTouch":{"nowait":false},"initCanvasEvents":{"nowait":false},"update":{"nowait":false}},"fields":{"listeners":{},"touchEmu":{},"defaultLayer":{},"isMouseDown":{},"mp":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.ArgParser',
  shortName: 'ArgParser',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_ArgParser_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_ArgParser_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_ArgParser_initialize(asrc) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=8000018;//kernel.ArgParser:18
      _this.length=0;
      //$LASTPOS=8000033;//kernel.ArgParser:33
      _this.a=_this;
      //$LASTPOS=8000046;//kernel.ArgParser:46
      //$LASTPOS=8000051;//kernel.ArgParser:51
      i = 0;
      for (; i<asrc.length ; i++) {
        //$LASTPOS=8000079;//kernel.ArgParser:79
        _this.push(asrc[i]);
      }
    },
    push :function _trc_ArgParser_push(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000114;//kernel.ArgParser:114
      _this.a[_this.length++]=v;
    },
    fiber$push :function _trc_ArgParser_f_push(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=8000114;//kernel.ArgParser:114
      _this.a[_this.length++]=v;
      
      _thread.retVal=_this;return;
    },
    trimUndefs :function _trc_ArgParser_trimUndefs() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000154;//kernel.ArgParser:154
      while (_this.length>0) {
        //$LASTPOS=8000181;//kernel.ArgParser:181
        if (_this.a[_this.length-1]!==_this._undef) {
          break;
          
        }
        //$LASTPOS=8000223;//kernel.ArgParser:223
        _this.length--;
        //$LASTPOS=8000242;//kernel.ArgParser:242
        delete _this.a[_this.length];
        
      }
    },
    fiber$trimUndefs :function _trc_ArgParser_f_trimUndefs(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_ArgParser_ent_trimUndefs(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=8000154;//kernel.ArgParser:154
          case 1:
            if (!(_this.length>0)) { __pc=3     ; break; }
            //$LASTPOS=8000181;//kernel.ArgParser:181
            if (!(_this.a[_this.length-1]!==_this._undef)) { __pc=2     ; break; }
            __pc=3     ; break;
            
          case 2     :
            
            //$LASTPOS=8000223;//kernel.ArgParser:223
            _this.length--;
            //$LASTPOS=8000242;//kernel.ArgParser:242
            delete _this.a[_this.length];
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    shift :function _trc_ArgParser_shift(type) {
      "use strict";
      var _this=this;
      var res;
      var i;
      
      //$LASTPOS=8000291;//kernel.ArgParser:291
      if (typeof  type=="number") {
        //$LASTPOS=8000329;//kernel.ArgParser:329
        res = [];
        
        //$LASTPOS=8000350;//kernel.ArgParser:350
        //$LASTPOS=8000355;//kernel.ArgParser:355
        i = 0;
        for (; i<type ; i++) {
          //$LASTPOS=8000376;//kernel.ArgParser:376
          res.push(_this.shift());
        }
        return res;
        
      } else {
        //$LASTPOS=8000428;//kernel.ArgParser:428
        if (typeof  type=="string") {
          //$LASTPOS=8000466;//kernel.ArgParser:466
          if (_this.a[0]==null) {
            return _this._undef;
          }
          //$LASTPOS=8000552;//kernel.ArgParser:552
          if (typeof  _this.a[0]===type) {
            return _this.shift();
          }
          return _this._undef;
          
        } else {
          //$LASTPOS=8000628;//kernel.ArgParser:628
          if (type) {
            //$LASTPOS=8000649;//kernel.ArgParser:649
            if (_this.a[0] instanceof type) {
              return _this.shift();
            }
            return _this._undef;
            
          }
        }
      }
      //$LASTPOS=8000719;//kernel.ArgParser:719
      res = _this.a[0];
      
      //$LASTPOS=8000738;//kernel.ArgParser:738
      //$LASTPOS=8000743;//kernel.ArgParser:743
      i = 1;
      for (; i<_this.length ; i++) {
        {
          //$LASTPOS=8000780;//kernel.ArgParser:780
          _this.a[i-1]=_this.a[i];
        }
      }
      //$LASTPOS=8000805;//kernel.ArgParser:805
      _this.length--;
      //$LASTPOS=8000836;//kernel.ArgParser:836
      delete _this.a[_this.length];
      return res;
    },
    fiber$shift :function _trc_ArgParser_f_shift(_thread,type) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var i;
      
      //$LASTPOS=8000291;//kernel.ArgParser:291
      if (typeof  type=="number") {
        //$LASTPOS=8000329;//kernel.ArgParser:329
        res = [];
        
        //$LASTPOS=8000350;//kernel.ArgParser:350
        //$LASTPOS=8000355;//kernel.ArgParser:355
        i = 0;
        for (; i<type ; i++) {
          //$LASTPOS=8000376;//kernel.ArgParser:376
          res.push(_this.shift());
        }
        _thread.retVal=res;return;
        
        
      } else {
        //$LASTPOS=8000428;//kernel.ArgParser:428
        if (typeof  type=="string") {
          //$LASTPOS=8000466;//kernel.ArgParser:466
          if (_this.a[0]==null) {
            _thread.retVal=_this._undef;return;
            
          }
          //$LASTPOS=8000552;//kernel.ArgParser:552
          if (typeof  _this.a[0]===type) {
            _thread.retVal=_this.shift();return;
            
          }
          _thread.retVal=_this._undef;return;
          
          
        } else {
          //$LASTPOS=8000628;//kernel.ArgParser:628
          if (type) {
            //$LASTPOS=8000649;//kernel.ArgParser:649
            if (_this.a[0] instanceof type) {
              _thread.retVal=_this.shift();return;
              
            }
            _thread.retVal=_this._undef;return;
            
            
          }
        }
      }
      //$LASTPOS=8000719;//kernel.ArgParser:719
      res = _this.a[0];
      
      //$LASTPOS=8000738;//kernel.ArgParser:738
      //$LASTPOS=8000743;//kernel.ArgParser:743
      i = 1;
      for (; i<_this.length ; i++) {
        {
          //$LASTPOS=8000780;//kernel.ArgParser:780
          _this.a[i-1]=_this.a[i];
        }
      }
      //$LASTPOS=8000805;//kernel.ArgParser:805
      _this.length--;
      //$LASTPOS=8000836;//kernel.ArgParser:836
      delete _this.a[_this.length];
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    toArray :function _trc_ArgParser_toArray() {
      "use strict";
      var _this=this;
      var res;
      var i;
      
      //$LASTPOS=8000898;//kernel.ArgParser:898
      res = [];
      
      //$LASTPOS=8000915;//kernel.ArgParser:915
      //$LASTPOS=8000920;//kernel.ArgParser:920
      i = 0;
      for (; i<_this.a.length ; i++) {
        //$LASTPOS=8000946;//kernel.ArgParser:946
        res.push(_this.a[i]);
      }
      return res;
    },
    fiber$toArray :function _trc_ArgParser_f_toArray(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var i;
      
      //$LASTPOS=8000898;//kernel.ArgParser:898
      res = [];
      
      //$LASTPOS=8000915;//kernel.ArgParser:915
      //$LASTPOS=8000920;//kernel.ArgParser:920
      i = 0;
      for (; i<_this.a.length ; i++) {
        //$LASTPOS=8000946;//kernel.ArgParser:946
        res.push(_this.a[i]);
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"push":{"nowait":false},"trimUndefs":{"nowait":false},"shift":{"nowait":false},"toArray":{"nowait":false}},"fields":{"length":{},"a":{},"_undef":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.GeneratorMod',
  shortName: 'GeneratorMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_GeneratorMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_GeneratorMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    generator :function _trc_GeneratorMod_generator() {
      "use strict";
      var _this=this;
      var a;
      var methodName;
      var th;
      var res;
      
      //$LASTPOS=9000035;//kernel.GeneratorMod:35
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      //$LASTPOS=9000072;//kernel.GeneratorMod:72
      methodName = a.shift();
      
      //$LASTPOS=9000103;//kernel.GeneratorMod:103
      th = Tonyu.thread();
      
      //$LASTPOS=9000131;//kernel.GeneratorMod:131
      a = a.toArray();
      
      //$LASTPOS=9000155;//kernel.GeneratorMod:155
      a.unshift(_this.yielder);
      //$LASTPOS=9000180;//kernel.GeneratorMod:180
      res = {tonyuIterator: (function anonymous_214() {
        
      })};
      
      //$LASTPOS=9000243;//kernel.GeneratorMod:243
      th.apply(_this,methodName,a);
    },
    fiber$generator :function _trc_GeneratorMod_f_generator(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var methodName;
      var th;
      var res;
      
      //$LASTPOS=9000035;//kernel.GeneratorMod:35
      a = new Tonyu.classes.kernel.ArgParser(_arguments);
      
      //$LASTPOS=9000072;//kernel.GeneratorMod:72
      methodName = a.shift();
      
      //$LASTPOS=9000103;//kernel.GeneratorMod:103
      th = Tonyu.thread();
      
      //$LASTPOS=9000131;//kernel.GeneratorMod:131
      a = a.toArray();
      
      //$LASTPOS=9000155;//kernel.GeneratorMod:155
      a.unshift(_this.yielder);
      //$LASTPOS=9000180;//kernel.GeneratorMod:180
      res = {tonyuIterator: (function anonymous_214() {
        
      })};
      
      //$LASTPOS=9000243;//kernel.GeneratorMod:243
      th.apply(_this,methodName,a);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"generator":{"nowait":false}},"fields":{"yielder":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.MathMod',
  shortName: 'MathMod',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_MathMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_MathMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    sin :function _trc_MathMod_sin(d) {
      "use strict";
      var _this=this;
      
      return Math.sin(_this.rad(d));
    },
    cos :function _trc_MathMod_cos(d) {
      "use strict";
      var _this=this;
      
      return Math.cos(_this.rad(d));
    },
    rad :function _trc_MathMod_rad(d) {
      "use strict";
      var _this=this;
      
      return d/180*Math.PI;
    },
    deg :function _trc_MathMod_deg(d) {
      "use strict";
      var _this=this;
      
      return d/Math.PI*180;
    },
    abs :function _trc_MathMod_abs(v) {
      "use strict";
      var _this=this;
      
      return Math.abs(v);
    },
    sgn :function _trc_MathMod_sgn(v,base) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=10000324;//kernel.MathMod:324
      base=base||0;
      return (v>base?1:v<- base?- 1:0);
    },
    atan2 :function _trc_MathMod_atan2(y,x) {
      "use strict";
      var _this=this;
      
      return _this.deg(Math.atan2(y,x));
    },
    atanxy :function _trc_MathMod_atanxy(x,y) {
      "use strict";
      var _this=this;
      
      return _this.atan2(y,x);
    },
    floor :function _trc_MathMod_floor(x) {
      "use strict";
      var _this=this;
      
      return Math.floor(x);
    },
    angleDiff :function _trc_MathMod_angleDiff(a,b) {
      "use strict";
      var _this=this;
      var c;
      
      
      //$LASTPOS=10000582;//kernel.MathMod:582
      a=_this.floor(a);
      //$LASTPOS=10000599;//kernel.MathMod:599
      b=_this.floor(b);
      //$LASTPOS=10000616;//kernel.MathMod:616
      if (a>=b) {
        //$LASTPOS=10000637;//kernel.MathMod:637
        c=(a-b)%360;
        //$LASTPOS=10000661;//kernel.MathMod:661
        if (c>=180) {
          //$LASTPOS=10000673;//kernel.MathMod:673
          c-=360;
        }
        
      } else {
        //$LASTPOS=10000704;//kernel.MathMod:704
        c=- ((b-a)%360);
        //$LASTPOS=10000731;//kernel.MathMod:731
        if (c<- 180) {
          //$LASTPOS=10000743;//kernel.MathMod:743
          c+=360;
        }
        
      }
      return c;
    },
    sqrt :function _trc_MathMod_sqrt(t) {
      "use strict";
      var _this=this;
      
      return Math.sqrt(t);
    },
    dist :function _trc_MathMod_dist(dx,dy) {
      "use strict";
      var _this=this;
      var t;
      
      //$LASTPOS=10000852;//kernel.MathMod:852
      if (typeof  dx=="object") {
        //$LASTPOS=10000888;//kernel.MathMod:888
        t = dx;
        
        //$LASTPOS=10000907;//kernel.MathMod:907
        dx=t.x-_this.x;
        //$LASTPOS=10000916;//kernel.MathMod:916
        dy=t.y-_this.y;
        
      }
      return _this.sqrt(dx*dx+dy*dy);
    },
    trunc :function _trc_MathMod_trunc(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=10000992;//kernel.MathMod:992
      if (f>=0) {
        return Math.floor(f);
      } else {
        return Math.ceil(f);
      }
    },
    ceil :function _trc_MathMod_ceil(f) {
      "use strict";
      var _this=this;
      
      return Math.ceil(f);
    },
    rndFloat :function _trc_MathMod_rndFloat(r,m) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=10001134;//kernel.MathMod:1134
      if (typeof  r!=="number") {
        //$LASTPOS=10001159;//kernel.MathMod:1159
        r=0;
      }
      //$LASTPOS=10001169;//kernel.MathMod:1169
      if (typeof  m!=="number") {
        //$LASTPOS=10001194;//kernel.MathMod:1194
        m=1;
      }
      //$LASTPOS=10001204;//kernel.MathMod:1204
      if (r<m) {
        return Math.random()*(m-r)+r;
        
      } else {
        return Math.random()*(r-m)+m;
        
      }
    },
    rnd :function _trc_MathMod_rnd(r,m) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=10001344;//kernel.MathMod:1344
      if (typeof  r=="number") {
        //$LASTPOS=10001379;//kernel.MathMod:1379
        if (typeof  m=="number") {
          //$LASTPOS=10001418;//kernel.MathMod:1418
          if (r<m) {
            return Math.floor(Math.random()*(m-r)+r);
            
          } else {
            return Math.floor(Math.random()*(r-m)+m);
            
          }
          
        } else {
          return Math.floor(Math.random()*(r>0?r:0));
          
        }
        
      }
      return Math.random();
    },
    parseFloat :function _trc_MathMod_parseFloat(s) {
      "use strict";
      var _this=this;
      
      return parseFloat(s);
    },
    clamp :function _trc_MathMod_clamp(v,min,max) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=10001795;//kernel.MathMod:1795
      if (min>max) {
        return _this.clamp(v,max,min);
      }
      return v<min?min:v>max?max:v;
    },
    clamped :function _trc_MathMod_clamped(v,min,max) {
      "use strict";
      var _this=this;
      
      return _this.clamp(v,min,max)-v;
    },
    min :function _trc_MathMod_min() {
      "use strict";
      var _this=this;
      
      return Math.min.apply(Math,arguments);
    },
    max :function _trc_MathMod_max() {
      "use strict";
      var _this=this;
      
      return Math.max.apply(Math,arguments);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"sin":{"nowait":true},"cos":{"nowait":true},"rad":{"nowait":true},"deg":{"nowait":true},"abs":{"nowait":true},"sgn":{"nowait":true},"atan2":{"nowait":true},"atanxy":{"nowait":true},"floor":{"nowait":true},"angleDiff":{"nowait":true},"sqrt":{"nowait":true},"dist":{"nowait":true},"trunc":{"nowait":true},"ceil":{"nowait":true},"rndFloat":{"nowait":true},"rnd":{"nowait":true},"parseFloat":{"nowait":true},"clamp":{"nowait":true},"clamped":{"nowait":true},"min":{"nowait":true},"max":{"nowait":true}},"fields":{"x":{},"y":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Navigator',
  shortName: 'Navigator',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_Navigator_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Navigator_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    getUserAgent :function _trc_Navigator_getUserAgent() {
      "use strict";
      var _this=this;
      
      return navigator.userAgent;
    },
    fiber$getUserAgent :function _trc_Navigator_f_getUserAgent(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=navigator.userAgent;return;
      
      
      _thread.retVal=_this;return;
    },
    isTablet :function _trc_Navigator_isTablet() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=11000263;//kernel.Navigator:263
      u = _this.getUserAgent().toLowerCase();
      
      return ((u.indexOf("windows")!=- 1&&u.indexOf("touch")!=- 1&&u.indexOf("tablet pc")==- 1)||u.indexOf("ipad")!=- 1||(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1&&u.indexOf("mobile")==- 1)||(u.indexOf("firefox")!=- 1&&u.indexOf("tablet")!=- 1)||u.indexOf("kindle")!=- 1||u.indexOf("silk")!=- 1||u.indexOf("playbook")!=- 1||u.indexOf('a1_07')!=- 1||u.indexOf('sc-01c')!=- 1);
    },
    fiber$isTablet :function _trc_Navigator_f_isTablet(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=11000263;//kernel.Navigator:263
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=((u.indexOf("windows")!=- 1&&u.indexOf("touch")!=- 1&&u.indexOf("tablet pc")==- 1)||u.indexOf("ipad")!=- 1||(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1&&u.indexOf("mobile")==- 1)||(u.indexOf("firefox")!=- 1&&u.indexOf("tablet")!=- 1)||u.indexOf("kindle")!=- 1||u.indexOf("silk")!=- 1||u.indexOf("playbook")!=- 1||u.indexOf('a1_07')!=- 1||u.indexOf('sc-01c')!=- 1);return;
      
      
      _thread.retVal=_this;return;
    },
    isMobile :function _trc_Navigator_isMobile() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=11000800;//kernel.Navigator:800
      u = _this.getUserAgent().toLowerCase();
      
      return ((u.indexOf("windows")!=- 1&&u.indexOf("phone")!=- 1)||u.indexOf("iphone")!=- 1||u.indexOf("ipod")!=- 1||(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1&&u.indexOf("mobile")!=- 1)||(u.indexOf("firefox")!=- 1&&u.indexOf("mobile")!=- 1)||(u.indexOf("blackberry")!=- 1||(u.indexOf("bb10")!=- 1&&u.indexOf("mobile")!=- 1)));
    },
    fiber$isMobile :function _trc_Navigator_f_isMobile(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=11000800;//kernel.Navigator:800
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=((u.indexOf("windows")!=- 1&&u.indexOf("phone")!=- 1)||u.indexOf("iphone")!=- 1||u.indexOf("ipod")!=- 1||(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1&&u.indexOf("mobile")!=- 1)||(u.indexOf("firefox")!=- 1&&u.indexOf("mobile")!=- 1)||(u.indexOf("blackberry")!=- 1||(u.indexOf("bb10")!=- 1&&u.indexOf("mobile")!=- 1)));return;
      
      
      _thread.retVal=_this;return;
    },
    isWindows :function _trc_Navigator_isWindows() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=11001274;//kernel.Navigator:1274
      u = _this.getUserAgent().toLowerCase();
      
      return u.indexOf("windows")!=- 1;
    },
    fiber$isWindows :function _trc_Navigator_f_isWindows(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=11001274;//kernel.Navigator:1274
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=u.indexOf("windows")!=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    isAndroid :function _trc_Navigator_isAndroid() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=11001378;//kernel.Navigator:1378
      u = _this.getUserAgent().toLowerCase();
      
      return (u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1);
    },
    fiber$isAndroid :function _trc_Navigator_f_isAndroid(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=11001378;//kernel.Navigator:1378
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=(u.indexOf("android")!=- 1&&u.indexOf("windows")==- 1);return;
      
      
      _thread.retVal=_this;return;
    },
    isIOS :function _trc_Navigator_isIOS() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=11001522;//kernel.Navigator:1522
      u = _this.getUserAgent().toLowerCase();
      
      return (u.indexOf("iphone")!=- 1||u.indexOf("ipad")!=- 1||u.indexOf("ipod")!=- 1);
    },
    fiber$isIOS :function _trc_Navigator_f_isIOS(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=11001522;//kernel.Navigator:1522
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=(u.indexOf("iphone")!=- 1||u.indexOf("ipad")!=- 1||u.indexOf("ipod")!=- 1);return;
      
      
      _thread.retVal=_this;return;
    },
    isFirefoxOS :function _trc_Navigator_isFirefoxOS() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=11001705;//kernel.Navigator:1705
      u = _this.getUserAgent().toLowerCase();
      
      return u.indexOf("firefox")!=1;
    },
    fiber$isFirefoxOS :function _trc_Navigator_f_isFirefoxOS(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=11001705;//kernel.Navigator:1705
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=u.indexOf("firefox")!=1;return;
      
      
      _thread.retVal=_this;return;
    },
    isKindle :function _trc_Navigator_isKindle() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=11001807;//kernel.Navigator:1807
      u = _this.getUserAgent().toLowerCase();
      
      return (u.indexOf("kindle")!=- 1||u.indexOf("silk")!=- 1);
    },
    fiber$isKindle :function _trc_Navigator_f_isKindle(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=11001807;//kernel.Navigator:1807
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=(u.indexOf("kindle")!=- 1||u.indexOf("silk")!=- 1);return;
      
      
      _thread.retVal=_this;return;
    },
    isBlackBerry :function _trc_Navigator_isBlackBerry() {
      "use strict";
      var _this=this;
      var u;
      
      //$LASTPOS=11001959;//kernel.Navigator:1959
      u = _this.getUserAgent().toLowerCase();
      
      return (u.indexOf("blackberry")!=- 1||u.indexOf("playbook")!=- 1||(u.indexOf("bb10")!=- 1&&u.indexOf("mobile")!=- 1));
    },
    fiber$isBlackBerry :function _trc_Navigator_f_isBlackBerry(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var u;
      
      //$LASTPOS=11001959;//kernel.Navigator:1959
      u = _this.getUserAgent().toLowerCase();
      
      _thread.retVal=(u.indexOf("blackberry")!=- 1||u.indexOf("playbook")!=- 1||(u.indexOf("bb10")!=- 1&&u.indexOf("mobile")!=- 1));return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getUserAgent":{"nowait":false},"isTablet":{"nowait":false},"isMobile":{"nowait":false},"isWindows":{"nowait":false},"isAndroid":{"nowait":false},"isIOS":{"nowait":false},"isFirefoxOS":{"nowait":false},"isKindle":{"nowait":false},"isBlackBerry":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.ObjectPool',
  shortName: 'ObjectPool',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_ObjectPool_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_ObjectPool_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    pool :function _trc_ObjectPool_pool(key,o) {
      "use strict";
      var _this=this;
      var list;
      
      //$LASTPOS=12000091;//kernel.ObjectPool:91
      list = _this.poolList(key);
      
      //$LASTPOS=12000117;//kernel.ObjectPool:117
      o.objectPoolAge=(o.objectPoolAge||0)+1;
      //$LASTPOS=12000159;//kernel.ObjectPool:159
      list.push(o);
    },
    fiber$pool :function _trc_ObjectPool_f_pool(_thread,key,o) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var list;
      
      
      _thread.enter(function _trc_ObjectPool_ent_pool(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12000091;//kernel.ObjectPool:91
            _this.fiber$poolList(_thread, key);
            __pc=1;return;
          case 1:
            list=_thread.retVal;
            
            //$LASTPOS=12000117;//kernel.ObjectPool:117
            o.objectPoolAge=(o.objectPoolAge||0)+1;
            //$LASTPOS=12000159;//kernel.ObjectPool:159
            list.push(o);
            _thread.exit(_this);return;
          }
        }
      });
    },
    withdraw :function _trc_ObjectPool_withdraw(key) {
      "use strict";
      var _this=this;
      var list;
      
      //$LASTPOS=12000196;//kernel.ObjectPool:196
      list = _this.poolList(key);
      
      return list.shift();
    },
    fiber$withdraw :function _trc_ObjectPool_f_withdraw(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var list;
      
      
      _thread.enter(function _trc_ObjectPool_ent_withdraw(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12000196;//kernel.ObjectPool:196
            _this.fiber$poolList(_thread, key);
            __pc=1;return;
          case 1:
            list=_thread.retVal;
            
            _thread.exit(list.shift());return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    poolList :function _trc_ObjectPool_poolList(key) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=12000266;//kernel.ObjectPool:266
      _this.lists=_this.lists||{};
      return _this.lists[key]=_this.lists[key]||[];
    },
    fiber$poolList :function _trc_ObjectPool_f_poolList(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000266;//kernel.ObjectPool:266
      _this.lists=_this.lists||{};
      _thread.retVal=_this.lists[key]=_this.lists[key]||[];return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"pool":{"nowait":false},"withdraw":{"nowait":false},"poolList":{"nowait":false}},"fields":{"lists":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.TObject',
  shortName: 'TObject',
  namespace: 'kernel',
  includes: [],
  methods: {
    main :function _trc_TObject_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_TObject_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_TObject_initialize(options) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=13000052;//kernel.TObject:52
      if (typeof  options=="object") {
        //$LASTPOS=13000082;//kernel.TObject:82
        _this.extend(options);
      }
      //$LASTPOS=13000104;//kernel.TObject:104
      if (Tonyu.runMode) {
        //$LASTPOS=13000123;//kernel.TObject:123
        _this.main();
      }
    },
    extend :function _trc_TObject_extend(obj) {
      "use strict";
      var _this=this;
      
      return Tonyu.extend(_this,obj);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.TQuery',
  shortName: 'TQuery',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [Tonyu.classes.kernel.MathMod],
  methods: {
    main :function _trc_TQuery_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_TQuery_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_TQuery_initialize(parent) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14000058;//kernel.TQuery:58
      _this.length=0;
      //$LASTPOS=14000073;//kernel.TQuery:73
      _this.parent=parent;
    },
    create :function _trc_TQuery_create() {
      "use strict";
      var _this=this;
      
      return new Tonyu.classes.kernel.TQuery(_this.parent);
    },
    fiber$create :function _trc_TQuery_f_create(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=new Tonyu.classes.kernel.TQuery(_this.parent);return;
      
      
      _thread.retVal=_this;return;
    },
    contains :function _trc_TQuery_contains(t) {
      "use strict";
      var _this=this;
      var o;
      var _it_101;
      
      //$LASTPOS=14000165;//kernel.TQuery:165
      _it_101=Tonyu.iterator(_this,1);
      while(_it_101.next()) {
        o=_it_101[0];
        
        //$LASTPOS=14000196;//kernel.TQuery:196
        if (o===t) {
          return true;
        }
        
      }
      return false;
    },
    fiber$contains :function _trc_TQuery_f_contains(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var _it_101;
      
      //$LASTPOS=14000165;//kernel.TQuery:165
      _it_101=Tonyu.iterator(_this,1);
      while(_it_101.next()) {
        o=_it_101[0];
        
        //$LASTPOS=14000196;//kernel.TQuery:196
        if (o===t) {
          _thread.retVal=true;return;
          
        }
        
      }
      _thread.retVal=false;return;
      
      
      _thread.retVal=_this;return;
    },
    tonyuIterator :function _trc_TQuery_tonyuIterator(arity) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=14000279;//kernel.TQuery:279
      res = {};
      
      //$LASTPOS=14000296;//kernel.TQuery:296
      res.i=0;
      //$LASTPOS=14000310;//kernel.TQuery:310
      if (arity==1) {
        //$LASTPOS=14000335;//kernel.TQuery:335
        res.next=(function anonymous_344() {
          
          //$LASTPOS=14000371;//kernel.TQuery:371
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=14000422;//kernel.TQuery:422
          res[0]=_this[res.i];
          //$LASTPOS=14000455;//kernel.TQuery:455
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=14000525;//kernel.TQuery:525
        res.next=(function anonymous_534() {
          
          //$LASTPOS=14000561;//kernel.TQuery:561
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=14000612;//kernel.TQuery:612
          res[0]=res.i;
          //$LASTPOS=14000639;//kernel.TQuery:639
          res[1]=_this[res.i];
          //$LASTPOS=14000672;//kernel.TQuery:672
          res.i++;
          return true;
        });
        
      }
      return res;
    },
    fiber$tonyuIterator :function _trc_TQuery_f_tonyuIterator(_thread,arity) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      
      //$LASTPOS=14000279;//kernel.TQuery:279
      res = {};
      
      //$LASTPOS=14000296;//kernel.TQuery:296
      res.i=0;
      //$LASTPOS=14000310;//kernel.TQuery:310
      if (arity==1) {
        //$LASTPOS=14000335;//kernel.TQuery:335
        res.next=(function anonymous_344() {
          
          //$LASTPOS=14000371;//kernel.TQuery:371
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=14000422;//kernel.TQuery:422
          res[0]=_this[res.i];
          //$LASTPOS=14000455;//kernel.TQuery:455
          res.i++;
          return true;
        });
        
      } else {
        //$LASTPOS=14000525;//kernel.TQuery:525
        res.next=(function anonymous_534() {
          
          //$LASTPOS=14000561;//kernel.TQuery:561
          if (res.i>=_this.length) {
            return false;
          }
          //$LASTPOS=14000612;//kernel.TQuery:612
          res[0]=res.i;
          //$LASTPOS=14000639;//kernel.TQuery:639
          res[1]=_this[res.i];
          //$LASTPOS=14000672;//kernel.TQuery:672
          res.i++;
          return true;
        });
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    attr :function _trc_TQuery_attr() {
      "use strict";
      var _this=this;
      var values;
      var i;
      var e;
      var _it_105;
      
      
      //$LASTPOS=14000779;//kernel.TQuery:779
      if (_this.length==0) {
        return _this;
      }
      //$LASTPOS=14000807;//kernel.TQuery:807
      if (arguments.length==1&&typeof  arguments[0]=="string") {
        return _this[0][arguments[0]];
        
      }
      //$LASTPOS=14000918;//kernel.TQuery:918
      if (arguments.length>=2) {
        //$LASTPOS=14000954;//kernel.TQuery:954
        values={};
        //$LASTPOS=14000974;//kernel.TQuery:974
        //$LASTPOS=14000979;//kernel.TQuery:979
        i = 0;
        for (; i<arguments.length-1 ; i+=2) {
          {
            //$LASTPOS=14001032;//kernel.TQuery:1032
            values[arguments[i]]=arguments[i+1];
          }
        }
        
      } else {
        //$LASTPOS=14001103;//kernel.TQuery:1103
        values=arguments[0];
        
      }
      //$LASTPOS=14001136;//kernel.TQuery:1136
      if (values) {
        //$LASTPOS=14001159;//kernel.TQuery:1159
        _it_105=Tonyu.iterator(_this,1);
        while(_it_105.next()) {
          e=_it_105[0];
          
          //$LASTPOS=14001194;//kernel.TQuery:1194
          e.extend(values);
          
        }
        
      }
    },
    fiber$attr :function _trc_TQuery_f_attr(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var values;
      var i;
      var e;
      var _it_105;
      
      
      //$LASTPOS=14000779;//kernel.TQuery:779
      if (_this.length==0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=14000807;//kernel.TQuery:807
      if (_arguments.length==1&&typeof  _arguments[0]=="string") {
        _thread.retVal=_this[0][_arguments[0]];return;
        
        
      }
      //$LASTPOS=14000918;//kernel.TQuery:918
      if (_arguments.length>=2) {
        //$LASTPOS=14000954;//kernel.TQuery:954
        values={};
        //$LASTPOS=14000974;//kernel.TQuery:974
        //$LASTPOS=14000979;//kernel.TQuery:979
        i = 0;
        for (; i<_arguments.length-1 ; i+=2) {
          {
            //$LASTPOS=14001032;//kernel.TQuery:1032
            values[_arguments[i]]=_arguments[i+1];
          }
        }
        
      } else {
        //$LASTPOS=14001103;//kernel.TQuery:1103
        values=_arguments[0];
        
      }
      //$LASTPOS=14001136;//kernel.TQuery:1136
      if (values) {
        //$LASTPOS=14001159;//kernel.TQuery:1159
        _it_105=Tonyu.iterator(_this,1);
        while(_it_105.next()) {
          e=_it_105[0];
          
          //$LASTPOS=14001194;//kernel.TQuery:1194
          e.extend(values);
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    genKeyfunc :function _trc_TQuery_genKeyfunc(key) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14001259;//kernel.TQuery:1259
      if (typeof  key!="function") {
        return (function anonymous_1305(o) {
          
          return o[key];
        });
        
      } else {
        return key;
        
      }
    },
    fiber$genKeyfunc :function _trc_TQuery_f_genKeyfunc(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14001259;//kernel.TQuery:1259
      if (typeof  key!="function") {
        _thread.retVal=(function anonymous_1305(o) {
          
          return o[key];
        });return;
        
        
      } else {
        _thread.retVal=key;return;
        
        
      }
      
      _thread.retVal=_this;return;
    },
    applyArrayMethod :function _trc_TQuery_applyArrayMethod(name,args) {
      "use strict";
      var _this=this;
      var res;
      var a;
      var r;
      
      //$LASTPOS=14001410;//kernel.TQuery:1410
      res = _this.create();
      
      //$LASTPOS=14001433;//kernel.TQuery:1433
      a = _this.toArray();
      
      //$LASTPOS=14001455;//kernel.TQuery:1455
      r = a[name].apply(a,args);
      
      //$LASTPOS=14001489;//kernel.TQuery:1489
      res.push(r);
      return res;
    },
    fiber$applyArrayMethod :function _trc_TQuery_f_applyArrayMethod(_thread,name,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var a;
      var r;
      
      
      _thread.enter(function _trc_TQuery_ent_applyArrayMethod(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14001410;//kernel.TQuery:1410
            _this.fiber$create(_thread);
            __pc=1;return;
          case 1:
            res=_thread.retVal;
            
            //$LASTPOS=14001433;//kernel.TQuery:1433
            _this.fiber$toArray(_thread);
            __pc=2;return;
          case 2:
            a=_thread.retVal;
            
            //$LASTPOS=14001455;//kernel.TQuery:1455
            r = a[name].apply(a,args);
            
            //$LASTPOS=14001489;//kernel.TQuery:1489
            res.push(r);
            _thread.exit(res);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    toArray :function _trc_TQuery_toArray() {
      "use strict";
      var _this=this;
      var res;
      var i;
      
      //$LASTPOS=14001541;//kernel.TQuery:1541
      res = [];
      
      //$LASTPOS=14001558;//kernel.TQuery:1558
      //$LASTPOS=14001562;//kernel.TQuery:1562
      i = 0;
      for (; i<_this.length ; i++) {
        //$LASTPOS=14001584;//kernel.TQuery:1584
        res.push(_this[i]);
      }
      return res;
    },
    fiber$toArray :function _trc_TQuery_f_toArray(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var i;
      
      //$LASTPOS=14001541;//kernel.TQuery:1541
      res = [];
      
      //$LASTPOS=14001558;//kernel.TQuery:1558
      //$LASTPOS=14001562;//kernel.TQuery:1562
      i = 0;
      for (; i<_this.length ; i++) {
        //$LASTPOS=14001584;//kernel.TQuery:1584
        res.push(_this[i]);
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    sort :function _trc_TQuery_sort() {
      "use strict";
      var _this=this;
      
      return _this.applyArrayMethod("sort",arguments);
    },
    fiber$sort :function _trc_TQuery_f_sort(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.applyArrayMethod("sort",_arguments);return;
      
      
      _thread.retVal=_this;return;
    },
    slice :function _trc_TQuery_slice() {
      "use strict";
      var _this=this;
      
      return _this.applyArrayMethod("slice",arguments);
    },
    fiber$slice :function _trc_TQuery_f_slice(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.applyArrayMethod("slice",_arguments);return;
      
      
      _thread.retVal=_this;return;
    },
    maxs :function _trc_TQuery_maxs(key) {
      "use strict";
      var _this=this;
      var f;
      var res;
      var reso;
      var o;
      var _it_116;
      var v;
      
      //$LASTPOS=14001768;//kernel.TQuery:1768
      f = _this.genKeyfunc(key);
      
      //$LASTPOS=14001796;//kernel.TQuery:1796
      reso = _this.create();
      
      //$LASTPOS=14001824;//kernel.TQuery:1824
      _it_116=Tonyu.iterator(_this,1);
      while(_it_116.next()) {
        o=_it_116[0];
        
        //$LASTPOS=14001855;//kernel.TQuery:1855
        v = f(o);
        
        //$LASTPOS=14001876;//kernel.TQuery:1876
        if (res==null||v>=res) {
          //$LASTPOS=14001916;//kernel.TQuery:1916
          if (v>res) {
            //$LASTPOS=14001927;//kernel.TQuery:1927
            reso=_this.create();
          }
          //$LASTPOS=14001955;//kernel.TQuery:1955
          reso.push(o);
          //$LASTPOS=14001982;//kernel.TQuery:1982
          res=v;
          
        }
        
      }
      return reso;
    },
    fiber$maxs :function _trc_TQuery_f_maxs(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var res;
      var reso;
      var o;
      var _it_116;
      var v;
      
      
      _thread.enter(function _trc_TQuery_ent_maxs(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14001768;//kernel.TQuery:1768
            _this.fiber$genKeyfunc(_thread, key);
            __pc=1;return;
          case 1:
            f=_thread.retVal;
            
            //$LASTPOS=14001796;//kernel.TQuery:1796
            _this.fiber$create(_thread);
            __pc=2;return;
          case 2:
            reso=_thread.retVal;
            
            //$LASTPOS=14001824;//kernel.TQuery:1824
            _it_116=Tonyu.iterator(_this,1);
          case 3:
            if (!(_it_116.next())) { __pc=7     ; break; }
            o=_it_116[0];
            
            //$LASTPOS=14001855;//kernel.TQuery:1855
            v = f(o);
            
            //$LASTPOS=14001876;//kernel.TQuery:1876
            if (!(res==null||v>=res)) { __pc=6     ; break; }
            //$LASTPOS=14001916;//kernel.TQuery:1916
            if (!(v>res)) { __pc=5     ; break; }
            //$LASTPOS=14001927;//kernel.TQuery:1927
            _this.fiber$create(_thread);
            __pc=4;return;
          case 4:
            reso=_thread.retVal;
            
          case 5     :
            
            //$LASTPOS=14001955;//kernel.TQuery:1955
            reso.push(o);
            //$LASTPOS=14001982;//kernel.TQuery:1982
            res=v;
          case 6     :
            
            __pc=3;break;
          case 7     :
            
            _thread.exit(reso);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    mins :function _trc_TQuery_mins(key) {
      "use strict";
      var _this=this;
      var f;
      var res;
      var reso;
      var o;
      var _it_123;
      var v;
      
      //$LASTPOS=14002047;//kernel.TQuery:2047
      f = _this.genKeyfunc(key);
      
      //$LASTPOS=14002075;//kernel.TQuery:2075
      reso = _this.create();
      
      //$LASTPOS=14002103;//kernel.TQuery:2103
      _it_123=Tonyu.iterator(_this,1);
      while(_it_123.next()) {
        o=_it_123[0];
        
        //$LASTPOS=14002134;//kernel.TQuery:2134
        v = f(o);
        
        //$LASTPOS=14002155;//kernel.TQuery:2155
        if (res==null||v<=res) {
          //$LASTPOS=14002195;//kernel.TQuery:2195
          if (v<res) {
            //$LASTPOS=14002206;//kernel.TQuery:2206
            reso=_this.create();
          }
          //$LASTPOS=14002234;//kernel.TQuery:2234
          reso.push(o);
          //$LASTPOS=14002261;//kernel.TQuery:2261
          res=v;
          
        }
        
      }
      return reso;
    },
    fiber$mins :function _trc_TQuery_f_mins(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var res;
      var reso;
      var o;
      var _it_123;
      var v;
      
      
      _thread.enter(function _trc_TQuery_ent_mins(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14002047;//kernel.TQuery:2047
            _this.fiber$genKeyfunc(_thread, key);
            __pc=1;return;
          case 1:
            f=_thread.retVal;
            
            //$LASTPOS=14002075;//kernel.TQuery:2075
            _this.fiber$create(_thread);
            __pc=2;return;
          case 2:
            reso=_thread.retVal;
            
            //$LASTPOS=14002103;//kernel.TQuery:2103
            _it_123=Tonyu.iterator(_this,1);
          case 3:
            if (!(_it_123.next())) { __pc=7     ; break; }
            o=_it_123[0];
            
            //$LASTPOS=14002134;//kernel.TQuery:2134
            v = f(o);
            
            //$LASTPOS=14002155;//kernel.TQuery:2155
            if (!(res==null||v<=res)) { __pc=6     ; break; }
            //$LASTPOS=14002195;//kernel.TQuery:2195
            if (!(v<res)) { __pc=5     ; break; }
            //$LASTPOS=14002206;//kernel.TQuery:2206
            _this.fiber$create(_thread);
            __pc=4;return;
          case 4:
            reso=_thread.retVal;
            
          case 5     :
            
            //$LASTPOS=14002234;//kernel.TQuery:2234
            reso.push(o);
            //$LASTPOS=14002261;//kernel.TQuery:2261
            res=v;
          case 6     :
            
            __pc=3;break;
          case 7     :
            
            _thread.exit(reso);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    minObj :function _trc_TQuery_minObj(key) {
      "use strict";
      var _this=this;
      
      return _this.mins(key)[0];
    },
    fiber$minObj :function _trc_TQuery_f_minObj(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.mins(key)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    maxObj :function _trc_TQuery_maxObj(key) {
      "use strict";
      var _this=this;
      
      return _this.maxs(key)[0];
    },
    fiber$maxObj :function _trc_TQuery_f_maxObj(_thread,key) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.maxs(key)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    nearests :function _trc_TQuery_nearests(x,y) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14002420;//kernel.TQuery:2420
      if (x==null) {
        //$LASTPOS=14002434;//kernel.TQuery:2434
        x=_this.parent.x;
        //$LASTPOS=14002445;//kernel.TQuery:2445
        y=_this.parent.y;
        
      }
      //$LASTPOS=14002463;//kernel.TQuery:2463
      if (typeof  x=="object") {
        //$LASTPOS=14002488;//kernel.TQuery:2488
        y=x.y;
        //$LASTPOS=14002494;//kernel.TQuery:2494
        x=x.x;
        
      }
      return _this.mins((function anonymous_2519(o) {
        
        return _this.dist(o.x-x,o.y-y);
      }));
    },
    fiber$nearests :function _trc_TQuery_f_nearests(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14002420;//kernel.TQuery:2420
      if (x==null) {
        //$LASTPOS=14002434;//kernel.TQuery:2434
        x=_this.parent.x;
        //$LASTPOS=14002445;//kernel.TQuery:2445
        y=_this.parent.y;
        
      }
      //$LASTPOS=14002463;//kernel.TQuery:2463
      if (typeof  x=="object") {
        //$LASTPOS=14002488;//kernel.TQuery:2488
        y=x.y;
        //$LASTPOS=14002494;//kernel.TQuery:2494
        x=x.x;
        
      }
      _thread.retVal=_this.mins((function anonymous_2519(o) {
        
        return _this.dist(o.x-x,o.y-y);
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    nearest :function _trc_TQuery_nearest(x,y) {
      "use strict";
      var _this=this;
      
      return _this.nearests(x,y)[0];
    },
    fiber$nearest :function _trc_TQuery_f_nearest(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.nearests(x,y)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    withins :function _trc_TQuery_withins(xo,yd,d) {
      "use strict";
      var _this=this;
      var x;
      var y;
      
      
      //$LASTPOS=14002662;//kernel.TQuery:2662
      if (arguments.length==1) {
        //$LASTPOS=14002698;//kernel.TQuery:2698
        x=_this.parent.x;
        //$LASTPOS=14002719;//kernel.TQuery:2719
        y=_this.parent.y;
        //$LASTPOS=14002740;//kernel.TQuery:2740
        d=xo;
        
      } else {
        //$LASTPOS=14002758;//kernel.TQuery:2758
        if (typeof  xo=="object") {
          //$LASTPOS=14002794;//kernel.TQuery:2794
          x=xo.x;
          //$LASTPOS=14002801;//kernel.TQuery:2801
          y=xo.y;
          //$LASTPOS=14002808;//kernel.TQuery:2808
          d=yd;
          
        } else {
          //$LASTPOS=14002837;//kernel.TQuery:2837
          x=xo;
          //$LASTPOS=14002842;//kernel.TQuery:2842
          y=yd;
          
        }
      }
      return _this.find((function anonymous_2872(o) {
        
        return _this.dist(o.x-x,o.y-y)<=d;
      }));
    },
    fiber$withins :function _trc_TQuery_f_withins(_thread,xo,yd,d) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var x;
      var y;
      
      
      //$LASTPOS=14002662;//kernel.TQuery:2662
      if (_arguments.length==1) {
        //$LASTPOS=14002698;//kernel.TQuery:2698
        x=_this.parent.x;
        //$LASTPOS=14002719;//kernel.TQuery:2719
        y=_this.parent.y;
        //$LASTPOS=14002740;//kernel.TQuery:2740
        d=xo;
        
      } else {
        //$LASTPOS=14002758;//kernel.TQuery:2758
        if (typeof  xo=="object") {
          //$LASTPOS=14002794;//kernel.TQuery:2794
          x=xo.x;
          //$LASTPOS=14002801;//kernel.TQuery:2801
          y=xo.y;
          //$LASTPOS=14002808;//kernel.TQuery:2808
          d=yd;
          
        } else {
          //$LASTPOS=14002837;//kernel.TQuery:2837
          x=xo;
          //$LASTPOS=14002842;//kernel.TQuery:2842
          y=yd;
          
        }
      }
      _thread.retVal=_this.find((function anonymous_2872(o) {
        
        return _this.dist(o.x-x,o.y-y)<=d;
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    within :function _trc_TQuery_within(xo,yd,d) {
      "use strict";
      var _this=this;
      
      return _this.withins(xo,yd,d).nearest();
    },
    fiber$within :function _trc_TQuery_f_within(_thread,xo,yd,d) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.withins(xo,yd,d).nearest();return;
      
      
      _thread.retVal=_this;return;
    },
    max :function _trc_TQuery_max(key) {
      "use strict";
      var _this=this;
      var f;
      var res;
      var o;
      var _it_134;
      var v;
      
      //$LASTPOS=14003011;//kernel.TQuery:3011
      f = _this.genKeyfunc(key);
      
      
      //$LASTPOS=14003053;//kernel.TQuery:3053
      _it_134=Tonyu.iterator(_this,1);
      while(_it_134.next()) {
        o=_it_134[0];
        
        //$LASTPOS=14003084;//kernel.TQuery:3084
        v = f(o);
        
        //$LASTPOS=14003105;//kernel.TQuery:3105
        if (res==null||v>res) {
          //$LASTPOS=14003129;//kernel.TQuery:3129
          res=v;
        }
        
      }
      return res;
    },
    min :function _trc_TQuery_min(key) {
      "use strict";
      var _this=this;
      var f;
      var res;
      var o;
      var _it_140;
      var v;
      
      //$LASTPOS=14003181;//kernel.TQuery:3181
      f = _this.genKeyfunc(key);
      
      
      //$LASTPOS=14003223;//kernel.TQuery:3223
      _it_140=Tonyu.iterator(_this,1);
      while(_it_140.next()) {
        o=_it_140[0];
        
        //$LASTPOS=14003254;//kernel.TQuery:3254
        v = f(o);
        
        //$LASTPOS=14003275;//kernel.TQuery:3275
        if (res==null||v<res) {
          //$LASTPOS=14003299;//kernel.TQuery:3299
          res=v;
        }
        
      }
      return res;
    },
    push :function _trc_TQuery_push(e) {
      "use strict";
      var _this=this;
      var ee;
      var _it_146;
      
      //$LASTPOS=14003350;//kernel.TQuery:3350
      if (e instanceof Tonyu.classes.kernel.TQuery||e instanceof Array) {
        //$LASTPOS=14003392;//kernel.TQuery:3392
        _it_146=Tonyu.iterator(e,1);
        while(_it_146.next()) {
          ee=_it_146[0];
          
          //$LASTPOS=14003410;//kernel.TQuery:3410
          _this.push(ee);
        }
        
      } else {
        //$LASTPOS=14003443;//kernel.TQuery:3443
        _this[_this.length]=e;
        //$LASTPOS=14003468;//kernel.TQuery:3468
        _this.length++;
        
      }
    },
    fiber$push :function _trc_TQuery_f_push(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ee;
      var _it_146;
      
      
      _thread.enter(function _trc_TQuery_ent_push(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14003350;//kernel.TQuery:3350
            if (!(e instanceof Tonyu.classes.kernel.TQuery||e instanceof Array)) { __pc=4     ; break; }
            //$LASTPOS=14003392;//kernel.TQuery:3392
            _it_146=Tonyu.iterator(e,1);
          case 1:
            if (!(_it_146.next())) { __pc=3     ; break; }
            ee=_it_146[0];
            
            //$LASTPOS=14003410;//kernel.TQuery:3410
            _this.fiber$push(_thread, ee);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            __pc=5     ;break;
          case 4     :
            {
              //$LASTPOS=14003443;//kernel.TQuery:3443
              _this[_this.length]=e;
              //$LASTPOS=14003468;//kernel.TQuery:3468
              _this.length++;
            }
          case 5     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    size :function _trc_TQuery_size() {
      "use strict";
      var _this=this;
      
      return _this.length;
    },
    fiber$size :function _trc_TQuery_f_size(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.length;return;
      
      
      _thread.retVal=_this;return;
    },
    find :function _trc_TQuery_find(f) {
      "use strict";
      var _this=this;
      var no;
      var o;
      var _it_149;
      
      //$LASTPOS=14003531;//kernel.TQuery:3531
      no = _this.create();
      
      //$LASTPOS=14003553;//kernel.TQuery:3553
      _it_149=Tonyu.iterator(_this,1);
      while(_it_149.next()) {
        o=_it_149[0];
        
        //$LASTPOS=14003584;//kernel.TQuery:3584
        if (f(o)) {
          //$LASTPOS=14003594;//kernel.TQuery:3594
          no.push(o);
        }
        
      }
      return no;
    },
    fiber$find :function _trc_TQuery_f_find(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var no;
      var o;
      var _it_149;
      
      
      _thread.enter(function _trc_TQuery_ent_find(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14003531;//kernel.TQuery:3531
            _this.fiber$create(_thread);
            __pc=1;return;
          case 1:
            no=_thread.retVal;
            
            //$LASTPOS=14003553;//kernel.TQuery:3553
            _it_149=Tonyu.iterator(_this,1);
            while(_it_149.next()) {
              o=_it_149[0];
              
              //$LASTPOS=14003584;//kernel.TQuery:3584
              if (f(o)) {
                //$LASTPOS=14003594;//kernel.TQuery:3594
                no.push(o);
              }
              
            }
            _thread.exit(no);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    find1 :function _trc_TQuery_find1(f) {
      "use strict";
      var _this=this;
      
      return _this.find(f)[0];
    },
    fiber$find1 :function _trc_TQuery_f_find1(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find(f)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    random :function _trc_TQuery_random() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=14003690;//kernel.TQuery:3690
      if (_this.length===0) {
        return null;
      }
      return _this[_this.rnd(_this.length)];
    },
    fiber$random :function _trc_TQuery_f_random(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=14003690;//kernel.TQuery:3690
      if (_this.length===0) {
        _thread.retVal=null;return;
        
      }
      _thread.retVal=_this[_this.rnd(_this.length)];return;
      
      
      _thread.retVal=_this;return;
    },
    apply :function _trc_TQuery_apply(name,args) {
      "use strict";
      var _this=this;
      var res;
      var o;
      var _it_153;
      var f;
      
      
      //$LASTPOS=14003794;//kernel.TQuery:3794
      if (! args) {
        //$LASTPOS=14003805;//kernel.TQuery:3805
        args=[];
      }
      //$LASTPOS=14003819;//kernel.TQuery:3819
      _it_153=Tonyu.iterator(_this,1);
      while(_it_153.next()) {
        o=_it_153[0];
        
        //$LASTPOS=14003850;//kernel.TQuery:3850
        f = o[name];
        
        //$LASTPOS=14003874;//kernel.TQuery:3874
        if (typeof  f=="function") {
          //$LASTPOS=14003915;//kernel.TQuery:3915
          res=f.apply(o,args);
          
        }
        
      }
      return res;
    },
    fiber$apply :function _trc_TQuery_f_apply(_thread,name,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var o;
      var _it_153;
      var f;
      
      
      //$LASTPOS=14003794;//kernel.TQuery:3794
      if (! args) {
        //$LASTPOS=14003805;//kernel.TQuery:3805
        args=[];
      }
      //$LASTPOS=14003819;//kernel.TQuery:3819
      _it_153=Tonyu.iterator(_this,1);
      while(_it_153.next()) {
        o=_it_153[0];
        
        //$LASTPOS=14003850;//kernel.TQuery:3850
        f = o[name];
        
        //$LASTPOS=14003874;//kernel.TQuery:3874
        if (typeof  f=="function") {
          //$LASTPOS=14003915;//kernel.TQuery:3915
          res=f.apply(o,args);
          
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    alive :function _trc_TQuery_alive() {
      "use strict";
      var _this=this;
      
      return _this.find((function anonymous_4060(o) {
        
        return ! o.isDead();
      }));
    },
    fiber$alive :function _trc_TQuery_f_alive(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find((function anonymous_4060(o) {
        
        return ! o.isDead();
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    die :function _trc_TQuery_die() {
      "use strict";
      var _this=this;
      var a;
      
      //$LASTPOS=14004122;//kernel.TQuery:4122
      a = _this.alive();
      
      //$LASTPOS=14004142;//kernel.TQuery:4142
      if (a.length==0) {
        return false;
      }
      //$LASTPOS=14004178;//kernel.TQuery:4178
      a.apply("die");
      return true;
    },
    fiber$die :function _trc_TQuery_f_die(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      
      _thread.enter(function _trc_TQuery_ent_die(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=14004122;//kernel.TQuery:4122
            _this.fiber$alive(_thread);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            //$LASTPOS=14004142;//kernel.TQuery:4142
            if (!(a.length==0)) { __pc=2     ; break; }
            _thread.exit(false);return;
          case 2     :
            
            //$LASTPOS=14004178;//kernel.TQuery:4178
            a.apply("die");
            _thread.exit(true);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    klass :function _trc_TQuery_klass(k) {
      "use strict";
      var _this=this;
      
      return _this.find((function anonymous_4247(o) {
        
        return o instanceof k;
      }));
    },
    fiber$klass :function _trc_TQuery_f_klass(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.find((function anonymous_4247(o) {
        
        return o instanceof k;
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"create":{"nowait":false},"contains":{"nowait":false},"tonyuIterator":{"nowait":false},"attr":{"nowait":false},"genKeyfunc":{"nowait":false},"applyArrayMethod":{"nowait":false},"toArray":{"nowait":false},"sort":{"nowait":false},"slice":{"nowait":false},"maxs":{"nowait":false},"mins":{"nowait":false},"minObj":{"nowait":false},"maxObj":{"nowait":false},"nearests":{"nowait":false},"nearest":{"nowait":false},"withins":{"nowait":false},"within":{"nowait":false},"max":{"nowait":true},"min":{"nowait":true},"push":{"nowait":false},"size":{"nowait":false},"find":{"nowait":false},"find1":{"nowait":false},"random":{"nowait":false},"apply":{"nowait":false},"alive":{"nowait":false},"die":{"nowait":false},"klass":{"nowait":false}},"fields":{"length":{},"parent":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.EventHandler',
  shortName: 'EventHandler',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [Tonyu.classes.kernel.EventHandlerCaller],
  methods: {
    main :function _trc_EventHandler_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=15000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
    },
    fiber$main :function _trc_EventHandler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000067;//kernel.EventHandler:67
      if (Tonyu.runMode) {
        //$LASTPOS=15000086;//kernel.EventHandler:86
        _this.listeners=[];
      }
      
      _thread.retVal=_this;return;
    },
    toListener :function _trc_EventHandler_toListener(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000132;//kernel.EventHandler:132
      if (_this.target&&(typeof  f)=="string") {
        //$LASTPOS=15000179;//kernel.EventHandler:179
        f=_this.target[f];
        
      }
      //$LASTPOS=15000204;//kernel.EventHandler:204
      if (typeof  f!="function") {
        throw new Error("Not a event listener: "+_this.target+" / "+f);
        
      }
      return f;
    },
    addListener :function _trc_EventHandler_addListener(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000341;//kernel.EventHandler:341
      _this.listeners.push(_this.toListener(f));
      return {remove: (function anonymous_403() {
        
        //$LASTPOS=15000418;//kernel.EventHandler:418
        _this.removeListener(f);
      })};
    },
    removeListener :function _trc_EventHandler_removeListener(f) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=15000493;//kernel.EventHandler:493
      i = _this.listeners.indexOf(f);
      
      //$LASTPOS=15000526;//kernel.EventHandler:526
      _this.listeners.splice(i,1);
    },
    fire :function _trc_EventHandler_fire(args) {
      "use strict";
      var _this=this;
      var t;
      var h;
      var _it_162;
      
      //$LASTPOS=15000572;//kernel.EventHandler:572
      if (_this.released) {
        return _this;
      }
      
      //$LASTPOS=15000611;//kernel.EventHandler:611
      _it_162=Tonyu.iterator(_this.listeners,1);
      while(_it_162.next()) {
        h=_it_162[0];
        
        //$LASTPOS=15000855;//kernel.EventHandler:855
        _this.callEventHandler(h,args);
        
      }
    },
    fiber$fire :function _trc_EventHandler_f_fire(_thread,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var h;
      var _it_162;
      
      //$LASTPOS=15000572;//kernel.EventHandler:572
      if (_this.released) {
        _thread.retVal=_this;return;
        
      }
      
      
      _thread.enter(function _trc_EventHandler_ent_fire(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000611;//kernel.EventHandler:611
            _it_162=Tonyu.iterator(_this.listeners,1);
          case 1:
            if (!(_it_162.next())) { __pc=3     ; break; }
            h=_it_162[0];
            
            //$LASTPOS=15000855;//kernel.EventHandler:855
            _this.fiber$callEventHandler(_thread, h, args);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    release :function _trc_EventHandler_release() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=15000918;//kernel.EventHandler:918
      _this.released=true;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"toListener":{"nowait":true},"addListener":{"nowait":true},"removeListener":{"nowait":true},"fire":{"nowait":false},"release":{"nowait":true}},"fields":{"listeners":{},"released":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.ScreenOutHandler',
  shortName: 'ScreenOutHandler',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.EventHandler,
  includes: [],
  methods: {
    main :function _trc_ScreenOutHandler_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_ScreenOutHandler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_ScreenOutHandler_addListener(d,f) {
      "use strict";
      var _this=this;
      var retThread;
      
      //$LASTPOS=16000049;//kernel.ScreenOutHandler:49
      retThread = _this.target.parallel("screenOutChecker",d,_this.toListener(f));
      
      return {remove: (function anonymous_147() {
        
        //$LASTPOS=16000163;//kernel.ScreenOutHandler:163
        retThread.kill();
      })};
    },
    initialize :function _trc_ScreenOutHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=16000222;//kernel.ScreenOutHandler:222
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=16000240;//kernel.ScreenOutHandler:240
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":true},"new":{"nowait":false}},"fields":{"id":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.WithinHandler',
  shortName: 'WithinHandler',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.EventHandler,
  includes: [],
  methods: {
    main :function _trc_WithinHandler_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_WithinHandler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_WithinHandler_addListener(d,r,f) {
      "use strict";
      var _this=this;
      var retThread;
      
      //$LASTPOS=17000052;//kernel.WithinHandler:52
      retThread = _this.target.parallel("withinChecker",d,r,_this.toListener(f));
      
      return {remove: (function anonymous_149() {
        
        //$LASTPOS=17000165;//kernel.WithinHandler:165
        retThread.kill();
      })};
    },
    initialize :function _trc_WithinHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=17000225;//kernel.WithinHandler:225
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=17000244;//kernel.WithinHandler:244
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":true},"new":{"nowait":false}},"fields":{"id":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Color',
  shortName: 'Color',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [Tonyu.classes.kernel.MathMod],
  methods: {
    main :function _trc_Color_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Color_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Color_initialize() {
      "use strict";
      var _this=this;
      var a;
      var s;
      var rgba;
      
      //$LASTPOS=18000061;//kernel.Color:61
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      
      
      //$LASTPOS=18000116;//kernel.Color:116
      _this.maxs={r: 255,g: 255,b: 255,a: 255,h: 360,s: 1,l: 1};
      //$LASTPOS=18000164;//kernel.Color:164
      if (s=a.shift("string")) {
        //$LASTPOS=18000194;//kernel.Color:194
        _this.type="name";
        //$LASTPOS=18000210;//kernel.Color:210
        _this.value={name: s};
        
      } else {
        //$LASTPOS=18000235;//kernel.Color:235
        if (s=a.shift("object")) {
          //$LASTPOS=18000265;//kernel.Color:265
          if (typeof  s.r=="number") {
            //$LASTPOS=18000297;//kernel.Color:297
            _this.type="rgba";
            //$LASTPOS=18000314;//kernel.Color:314
            _this.value=s;
            //$LASTPOS=18000327;//kernel.Color:327
            _this.fillNum("g","b","a");
            
          } else {
            //$LASTPOS=18000359;//kernel.Color:359
            if (typeof  s.h=="number") {
              //$LASTPOS=18000391;//kernel.Color:391
              _this.type="hsl";
              //$LASTPOS=18000407;//kernel.Color:407
              _this.value=s;
              //$LASTPOS=18000420;//kernel.Color:420
              _this.fillNum("s","l","a");
              
            } else {
              throw new Error("Invalid color spec");
              
              
            }
          }
          
        } else {
          //$LASTPOS=18000511;//kernel.Color:511
          if ((s=a.shift("number"))!=null) {
            //$LASTPOS=18000551;//kernel.Color:551
            _this.type="rgba";
            //$LASTPOS=18000567;//kernel.Color:567
            _this.value={r: s};
            //$LASTPOS=18000583;//kernel.Color:583
            _this.value.g=a.shift();
            //$LASTPOS=18000605;//kernel.Color:605
            _this.value.b=a.shift();
            //$LASTPOS=18000627;//kernel.Color:627
            _this.fillNum("g","b","a");
            
          } else {
            throw new Error("Invalid color spec");
            
            
          }
        }
      }
    },
    fillNum :function _trc_Color_fillNum() {
      "use strict";
      var _this=this;
      var a;
      var k;
      var _it_171;
      
      //$LASTPOS=18000725;//kernel.Color:725
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      //$LASTPOS=18000759;//kernel.Color:759
      _it_171=Tonyu.iterator(a.toArray(),1);
      while(_it_171.next()) {
        k=_it_171[0];
        
        //$LASTPOS=18000791;//kernel.Color:791
        _this[k]=_this[k]||(k=="a"?255:0);
        
      }
    },
    fiber$fillNum :function _trc_Color_f_fillNum(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var k;
      var _it_171;
      
      //$LASTPOS=18000725;//kernel.Color:725
      a = new Tonyu.classes.kernel.ArgParser(_arguments);
      
      //$LASTPOS=18000759;//kernel.Color:759
      _it_171=Tonyu.iterator(a.toArray(),1);
      while(_it_171.next()) {
        k=_it_171[0];
        
        //$LASTPOS=18000791;//kernel.Color:791
        _this[k]=_this[k]||(k=="a"?255:0);
        
      }
      
      _thread.retVal=_this;return;
    },
    hasRGBA :function _trc_Color_hasRGBA() {
      "use strict";
      var _this=this;
      
      return typeof  (_this.value.r)==="number";
    },
    fiber$hasRGBA :function _trc_Color_f_hasRGBA(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=typeof  (_this.value.r)==="number";return;
      
      
      _thread.retVal=_this;return;
    },
    hasHSLA :function _trc_Color_hasHSLA() {
      "use strict";
      var _this=this;
      
      return typeof  (_this.value.h)==="number";
    },
    fiber$hasHSLA :function _trc_Color_f_hasHSLA(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=typeof  (_this.value.h)==="number";return;
      
      
      _thread.retVal=_this;return;
    },
    hasName :function _trc_Color_hasName() {
      "use strict";
      var _this=this;
      
      return typeof  (_this.value.name)==="string";
    },
    fiber$hasName :function _trc_Color_f_hasName(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=typeof  (_this.value.name)==="string";return;
      
      
      _thread.retVal=_this;return;
    },
    makeRGBA :function _trc_Color_makeRGBA() {
      "use strict";
      var _this=this;
      var rgb;
      
      //$LASTPOS=18001018;//kernel.Color:1018
      if (_this.hasRGBA()) {
        return _this;
      }
      //$LASTPOS=18001043;//kernel.Color:1043
      if (_this.hasHSLA()) {
        //$LASTPOS=18001063;//kernel.Color:1063
        rgb = _this.HSLToRGB(_this.value.h,_this.value.s,_this.value.l);
        
        //$LASTPOS=18001109;//kernel.Color:1109
        _this.value.r=rgb.r;
        //$LASTPOS=18001127;//kernel.Color:1127
        _this.value.g=rgb.g;
        //$LASTPOS=18001145;//kernel.Color:1145
        _this.value.b=rgb.b;
        return _this;
        
      }
      //$LASTPOS=18001177;//kernel.Color:1177
      _this.nameToRGB();
    },
    fiber$makeRGBA :function _trc_Color_f_makeRGBA(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var rgb;
      
      //$LASTPOS=18001018;//kernel.Color:1018
      if (_this.hasRGBA()) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Color_ent_makeRGBA(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18001043;//kernel.Color:1043
            if (!(_this.hasHSLA())) { __pc=2     ; break; }
            //$LASTPOS=18001063;//kernel.Color:1063
            _this.fiber$HSLToRGB(_thread, _this.value.h, _this.value.s, _this.value.l);
            __pc=1;return;
          case 1:
            rgb=_thread.retVal;
            
            //$LASTPOS=18001109;//kernel.Color:1109
            _this.value.r=rgb.r;
            //$LASTPOS=18001127;//kernel.Color:1127
            _this.value.g=rgb.g;
            //$LASTPOS=18001145;//kernel.Color:1145
            _this.value.b=rgb.b;
            _thread.exit(_this);return;
          case 2     :
            
            //$LASTPOS=18001177;//kernel.Color:1177
            _this.fiber$nameToRGB(_thread);
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    nameToRGB :function _trc_Color_nameToRGB() {
      "use strict";
      var _this=this;
      var ctx;
      var d;
      
      //$LASTPOS=18001211;//kernel.Color:1211
      ctx = _this.tmpCanvas();
      
      //$LASTPOS=18001234;//kernel.Color:1234
      ctx.fillStyle=_this.value.name;
      //$LASTPOS=18001262;//kernel.Color:1262
      ctx.fillRect(0,0,1,1);
      //$LASTPOS=18001287;//kernel.Color:1287
      d = ctx.getImageData();
      
      //$LASTPOS=18001315;//kernel.Color:1315
      d=d.data;
      //$LASTPOS=18001327;//kernel.Color:1327
      _this.value.r=d[0];
      //$LASTPOS=18001343;//kernel.Color:1343
      _this.value.g=d[1];
      //$LASTPOS=18001359;//kernel.Color:1359
      _this.value.b=d[2];
      //$LASTPOS=18001375;//kernel.Color:1375
      _this.value.a=d[3];
    },
    fiber$nameToRGB :function _trc_Color_f_nameToRGB(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var d;
      
      
      _thread.enter(function _trc_Color_ent_nameToRGB(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18001211;//kernel.Color:1211
            _this.fiber$tmpCanvas(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=18001234;//kernel.Color:1234
            ctx.fillStyle=_this.value.name;
            //$LASTPOS=18001262;//kernel.Color:1262
            ctx.fillRect(0,0,1,1);
            //$LASTPOS=18001287;//kernel.Color:1287
            d = ctx.getImageData();
            
            //$LASTPOS=18001315;//kernel.Color:1315
            d=d.data;
            //$LASTPOS=18001327;//kernel.Color:1327
            _this.value.r=d[0];
            //$LASTPOS=18001343;//kernel.Color:1343
            _this.value.g=d[1];
            //$LASTPOS=18001359;//kernel.Color:1359
            _this.value.b=d[2];
            //$LASTPOS=18001375;//kernel.Color:1375
            _this.value.a=d[3];
            _thread.exit(_this);return;
          }
        }
      });
    },
    makeHSLA :function _trc_Color_makeHSLA() {
      "use strict";
      var _this=this;
      var hsl;
      
      //$LASTPOS=18001409;//kernel.Color:1409
      if (_this.hasHSLA()) {
        return _this;
      }
      //$LASTPOS=18001434;//kernel.Color:1434
      if (_this.hasRGBA()) {
        //$LASTPOS=18001454;//kernel.Color:1454
        hsl = _this.RGBToHSL(_this.value.r,_this.value.g,_this.value.b);
        
        //$LASTPOS=18001500;//kernel.Color:1500
        _this.value.h=hsl.h;
        //$LASTPOS=18001518;//kernel.Color:1518
        _this.value.s=hsl.s;
        //$LASTPOS=18001536;//kernel.Color:1536
        _this.value.l=hsl.l;
        return _this;
        
      }
      //$LASTPOS=18001568;//kernel.Color:1568
      _this.nameToRGB();
    },
    fiber$makeHSLA :function _trc_Color_f_makeHSLA(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var hsl;
      
      //$LASTPOS=18001409;//kernel.Color:1409
      if (_this.hasHSLA()) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Color_ent_makeHSLA(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18001434;//kernel.Color:1434
            if (!(_this.hasRGBA())) { __pc=2     ; break; }
            //$LASTPOS=18001454;//kernel.Color:1454
            _this.fiber$RGBToHSL(_thread, _this.value.r, _this.value.g, _this.value.b);
            __pc=1;return;
          case 1:
            hsl=_thread.retVal;
            
            //$LASTPOS=18001500;//kernel.Color:1500
            _this.value.h=hsl.h;
            //$LASTPOS=18001518;//kernel.Color:1518
            _this.value.s=hsl.s;
            //$LASTPOS=18001536;//kernel.Color:1536
            _this.value.l=hsl.l;
            _thread.exit(_this);return;
          case 2     :
            
            //$LASTPOS=18001568;//kernel.Color:1568
            _this.fiber$nameToRGB(_thread);
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    makeName :function _trc_Color_makeName(type) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=18001605;//kernel.Color:1605
      if (_this.hasName()) {
        return _this;
      }
      //$LASTPOS=18001630;//kernel.Color:1630
      type=type||"rgb";
      //$LASTPOS=18001650;//kernel.Color:1650
      if (type=="rgb") {
        //$LASTPOS=18001672;//kernel.Color:1672
        _this.makeRGBA();
        //$LASTPOS=18001687;//kernel.Color:1687
        _this.value.name="rgba("+[_this.value.r,_this.value.g,_this.value.b,_this.value.a].join(",")+")";
        
      }
      //$LASTPOS=18001761;//kernel.Color:1761
      if (type=="hsl") {
        //$LASTPOS=18001783;//kernel.Color:1783
        _this.makeHSLA();
        //$LASTPOS=18001798;//kernel.Color:1798
        _this.value.name="hsla("+[_this.value.h,_this.value.s,_this.value.l,_this.value.a].join(",")+")";
        
      }
    },
    fiber$makeName :function _trc_Color_f_makeName(_thread,type) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18001605;//kernel.Color:1605
      if (_this.hasName()) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=18001630;//kernel.Color:1630
      type=type||"rgb";
      
      _thread.enter(function _trc_Color_ent_makeName(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18001650;//kernel.Color:1650
            if (!(type=="rgb")) { __pc=2     ; break; }
            //$LASTPOS=18001672;//kernel.Color:1672
            _this.fiber$makeRGBA(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=18001687;//kernel.Color:1687
            _this.value.name="rgba("+[_this.value.r,_this.value.g,_this.value.b,_this.value.a].join(",")+")";
          case 2     :
            
            //$LASTPOS=18001761;//kernel.Color:1761
            if (!(type=="hsl")) { __pc=4     ; break; }
            //$LASTPOS=18001783;//kernel.Color:1783
            _this.fiber$makeHSLA(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=18001798;//kernel.Color:1798
            _this.value.name="hsla("+[_this.value.h,_this.value.s,_this.value.l,_this.value.a].join(",")+")";
          case 4     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    tmpCanvas :function _trc_Color_tmpCanvas() {
      "use strict";
      var _this=this;
      var cv;
      
      //$LASTPOS=18001891;//kernel.Color:1891
      if (Tonyu.classes.kernel.Color.ctx) {
        return Tonyu.classes.kernel.Color.ctx;
      }
      //$LASTPOS=18001926;//kernel.Color:1926
      cv = $("<canvas>").attr({width: 1,height: 1}).css({display: "none"}).appendTo("body");
      
      //$LASTPOS=18002010;//kernel.Color:2010
      Tonyu.classes.kernel.Color.ctx=cv[0].getContext("2d");
      return Tonyu.classes.kernel.Color.ctx;
    },
    fiber$tmpCanvas :function _trc_Color_f_tmpCanvas(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cv;
      
      //$LASTPOS=18001891;//kernel.Color:1891
      if (Tonyu.classes.kernel.Color.ctx) {
        _thread.retVal=Tonyu.classes.kernel.Color.ctx;return;
        
      }
      //$LASTPOS=18001926;//kernel.Color:1926
      cv = $("<canvas>").attr({width: 1,height: 1}).css({display: "none"}).appendTo("body");
      
      //$LASTPOS=18002010;//kernel.Color:2010
      Tonyu.classes.kernel.Color.ctx=cv[0].getContext("2d");
      _thread.retVal=Tonyu.classes.kernel.Color.ctx;return;
      
      
      _thread.retVal=_this;return;
    },
    RGBToHSL :function _trc_Color_RGBToHSL(r,g,b) {
      "use strict";
      var _this=this;
      var min;
      var max;
      var diff;
      var h;
      var s;
      var l;
      
      //$LASTPOS=18002150;//kernel.Color:2150
      min = Tonyu.globals.$Math.min(r,g,b);
      max = Tonyu.globals.$Math.max(r,g,b);
      diff = max-min;
      h = 0;
      s = 0;
      l = (min+max)/2;
      
      //$LASTPOS=18002271;//kernel.Color:2271
      if (diff!=0) {
        //$LASTPOS=18002291;//kernel.Color:2291
        s=l<0.5?diff/(max+min):diff/(2-max-min);
        //$LASTPOS=18002355;//kernel.Color:2355
        h=(r==max?(g-b)/diff:g==max?2+(b-r)/diff:4+(r-g)/diff)*60;
        
      }
      return [h,s,l];
    },
    fiber$RGBToHSL :function _trc_Color_f_RGBToHSL(_thread,r,g,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var min;
      var max;
      var diff;
      var h;
      var s;
      var l;
      
      //$LASTPOS=18002150;//kernel.Color:2150
      min = Tonyu.globals.$Math.min(r,g,b);
      max = Tonyu.globals.$Math.max(r,g,b);
      diff = max-min;
      h = 0;
      s = 0;
      l = (min+max)/2;
      
      //$LASTPOS=18002271;//kernel.Color:2271
      if (diff!=0) {
        //$LASTPOS=18002291;//kernel.Color:2291
        s=l<0.5?diff/(max+min):diff/(2-max-min);
        //$LASTPOS=18002355;//kernel.Color:2355
        h=(r==max?(g-b)/diff:g==max?2+(b-r)/diff:4+(r-g)/diff)*60;
        
      }
      _thread.retVal=[h,s,l];return;
      
      
      _thread.retVal=_this;return;
    },
    HSLToRGB :function _trc_Color_HSLToRGB(h,s,l) {
      "use strict";
      var _this=this;
      var temp2;
      var temp1;
      var rtemp;
      var gtemp;
      var btemp;
      var rgb;
      var i;
      
      //$LASTPOS=18002509;//kernel.Color:2509
      if (s==0) {
        return [l,l,l];
        
      }
      //$LASTPOS=18002552;//kernel.Color:2552
      temp2 = l<0.5?l*(1+s):l+s-l*s;
      
      //$LASTPOS=18002605;//kernel.Color:2605
      temp1 = 2*l-temp2;
      
      //$LASTPOS=18002636;//kernel.Color:2636
      h/=360;
      //$LASTPOS=18002650;//kernel.Color:2650
      rtemp = (h+1/3)%1;
      gtemp = h;
      btemp = (h+2/3)%1;
      rgb = [rtemp,gtemp,btemp];
      i = 0;
      
      //$LASTPOS=18002765;//kernel.Color:2765
      ;
      
      while(i<3) {
        {
          //$LASTPOS=18002789;//kernel.Color:2789
          rgb[i]=rgb[i]<1/6?temp1+(temp2-temp1)*6*rgb[i]:rgb[i]<1/2?temp2:rgb[i]<2/3?temp1+(temp2-temp1)*6*(2/3-rgb[i]):temp1;
        }
        ++ i;
      }
      return rgb;
    },
    fiber$HSLToRGB :function _trc_Color_f_HSLToRGB(_thread,h,s,l) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var temp2;
      var temp1;
      var rtemp;
      var gtemp;
      var btemp;
      var rgb;
      var i;
      
      //$LASTPOS=18002509;//kernel.Color:2509
      if (s==0) {
        _thread.retVal=[l,l,l];return;
        
        
      }
      //$LASTPOS=18002552;//kernel.Color:2552
      temp2 = l<0.5?l*(1+s):l+s-l*s;
      
      //$LASTPOS=18002605;//kernel.Color:2605
      temp1 = 2*l-temp2;
      
      //$LASTPOS=18002636;//kernel.Color:2636
      h/=360;
      //$LASTPOS=18002650;//kernel.Color:2650
      rtemp = (h+1/3)%1;
      gtemp = h;
      btemp = (h+2/3)%1;
      rgb = [rtemp,gtemp,btemp];
      i = 0;
      
      //$LASTPOS=18002765;//kernel.Color:2765
      ;
      
      while(i<3) {
        {
          //$LASTPOS=18002789;//kernel.Color:2789
          rgb[i]=rgb[i]<1/6?temp1+(temp2-temp1)*6*rgb[i]:rgb[i]<1/2?temp2:rgb[i]<2/3?temp1+(temp2-temp1)*6*(2/3-rgb[i]):temp1;
        }
        ++ i;
      }
      _thread.retVal=rgb;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"fillNum":{"nowait":false},"hasRGBA":{"nowait":false},"hasHSLA":{"nowait":false},"hasName":{"nowait":false},"makeRGBA":{"nowait":false},"nameToRGB":{"nowait":false},"makeHSLA":{"nowait":false},"makeName":{"nowait":false},"tmpCanvas":{"nowait":false},"RGBToHSL":{"nowait":false},"HSLToRGB":{"nowait":false}},"fields":{"maxs":{},"type":{},"value":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.OneframeSprite',
  shortName: 'OneframeSprite',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [],
  methods: {
    main :function _trc_OneframeSprite_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_OneframeSprite_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_OneframeSprite_initialize(params) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=19000054;//kernel.OneframeSprite:54
      _this.extend(params);
      //$LASTPOS=19000075;//kernel.OneframeSprite:75
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=19000127;//kernel.OneframeSprite:127
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=19000165;//kernel.OneframeSprite:165
        Tonyu.globals.$Sprites.add(_this);
        
      }
    },
    die :function _trc_OneframeSprite_die() {
      "use strict";
      var _this=this;
      
    },
    fiber$die :function _trc_OneframeSprite_f_die(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    isDead :function _trc_OneframeSprite_isDead() {
      "use strict";
      var _this=this;
      
    },
    fiber$isDead :function _trc_OneframeSprite_f_isDead(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"die":{"nowait":false},"isDead":{"nowait":false}},"fields":{"layer":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.MML',
  shortName: 'MML',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [Tonyu.classes.kernel.MathMod],
  methods: {
    main :function _trc_MML_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=20000050;//kernel.MML:50
      _this.mmlBuf=[];
    },
    fiber$main :function _trc_MML_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000050;//kernel.MML:50
      _this.mmlBuf=[];
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MML_play(mmls) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=20000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      //$LASTPOS=20000105;//kernel.MML:105
      if (! _this.isPlaying()) {
        //$LASTPOS=20000134;//kernel.MML:134
        _this.playNext();
        
      }
    },
    fiber$play :function _trc_MML_f_play(_thread,mmls) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000081;//kernel.MML:81
      _this.mmlBuf.push(mmls);
      
      _thread.enter(function _trc_MML_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=20000105;//kernel.MML:105
            if (!(! _this.isPlaying())) { __pc=2     ; break; }
            //$LASTPOS=20000134;//kernel.MML:134
            _this.fiber$playNext(_thread);
            __pc=1;return;
          case 1:
            
          case 2     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    playNext :function _trc_MML_playNext() {
      "use strict";
      var _this=this;
      var mml;
      
      //$LASTPOS=20000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=20000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=20000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=20000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=20000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      
      //$LASTPOS=20000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=20000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=20000415;//kernel.MML:415
        _this.cTimeBase=0;
        return _this;
        
      }
      //$LASTPOS=20000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=20000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=20000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=20000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=20000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
    },
    fiber$playNext :function _trc_MML_f_playNext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var mml;
      
      //$LASTPOS=20000220;//kernel.MML:220
      if (_this.cTimeBase==null) {
        //$LASTPOS=20000241;//kernel.MML:241
        _this.cTimeBase=0;
      }
      //$LASTPOS=20000259;//kernel.MML:259
      if (_this.m) {
        //$LASTPOS=20000277;//kernel.MML:277
        _this.cTimeBase+=_this.m.currentTime;
        
      }
      //$LASTPOS=20000348;//kernel.MML:348
      mml = _this.mmlBuf.shift();
      
      //$LASTPOS=20000377;//kernel.MML:377
      if (! mml) {
        //$LASTPOS=20000398;//kernel.MML:398
        _this.m=null;
        //$LASTPOS=20000415;//kernel.MML:415
        _this.cTimeBase=0;
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=20000457;//kernel.MML:457
      _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
      //$LASTPOS=20000495;//kernel.MML:495
      _this.m=T("mml",{mml: mml},_this.mwav);
      //$LASTPOS=20000525;//kernel.MML:525
      _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
      //$LASTPOS=20000555;//kernel.MML:555
      _this.m.start();
      //$LASTPOS=20000571;//kernel.MML:571
      Tonyu.globals.$MMLS[_this.id()]=_this;
      
      _thread.retVal=_this;return;
    },
    id :function _trc_MML_id() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=20000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=20000616;//kernel.MML:616
        _this._id=_this.rnd()+"";
      }
      return _this._id;
    },
    fiber$id :function _trc_MML_f_id(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000606;//kernel.MML:606
      if (! _this._id) {
        //$LASTPOS=20000616;//kernel.MML:616
        _this._id=_this.rnd()+"";
      }
      _thread.retVal=_this._id;return;
      
      
      _thread.retVal=_this;return;
    },
    bufferCount :function _trc_MML_bufferCount() {
      "use strict";
      var _this=this;
      
      return _this.mmlBuf.length;
    },
    fiber$bufferCount :function _trc_MML_f_bufferCount(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.mmlBuf.length;return;
      
      
      _thread.retVal=_this;return;
    },
    isPlaying :function _trc_MML_isPlaying() {
      "use strict";
      var _this=this;
      
      return _this.m;
    },
    fiber$isPlaying :function _trc_MML_f_isPlaying(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.m;return;
      
      
      _thread.retVal=_this;return;
    },
    currentTime :function _trc_MML_currentTime() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=20000755;//kernel.MML:755
      if (_this.m) {
        return _this.m.currentTime+_this.cTimeBase;
      }
      return - 1;
    },
    fiber$currentTime :function _trc_MML_f_currentTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000755;//kernel.MML:755
      if (_this.m) {
        _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MML_stop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=20000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=20000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=20000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=20000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=20000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=20000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=20000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=20000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=20001056;//kernel.MML:1056
        delete Tonyu.globals.$MMLS[_this.id()];
        
      }
    },
    fiber$stop :function _trc_MML_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=20000829;//kernel.MML:829
      if (_this.m) {
        //$LASTPOS=20000847;//kernel.MML:847
        if (_this.mwav) {
          //$LASTPOS=20000872;//kernel.MML:872
          _this.mwav.pause();
          //$LASTPOS=20000899;//kernel.MML:899
          _this.mwav.stop();
          
        }
        //$LASTPOS=20000932;//kernel.MML:932
        _this.m.pause();
        //$LASTPOS=20000952;//kernel.MML:952
        _this.m.stop();
        //$LASTPOS=20000971;//kernel.MML:971
        _this.m=null;
        //$LASTPOS=20000988;//kernel.MML:988
        _this.mmlBuf=[];
        //$LASTPOS=20001056;//kernel.MML:1056
        delete Tonyu.globals.$MMLS[_this.id()];
        
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"play":{"nowait":false},"playNext":{"nowait":false},"id":{"nowait":false},"bufferCount":{"nowait":false},"isPlaying":{"nowait":false},"currentTime":{"nowait":false},"stop":{"nowait":false}},"fields":{"mmlBuf":{},"cTimeBase":{},"m":{},"mwav":{},"_id":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.WaveTable',
  shortName: 'WaveTable',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [],
  methods: {
    main :function _trc_WaveTable_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=21000031;//kernel.WaveTable:31
      _this.wav={};
      //$LASTPOS=21000040;//kernel.WaveTable:40
      _this.env={};
      //$LASTPOS=21000335;//kernel.WaveTable:335
      if (typeof  T!=="undefined") {
        //$LASTPOS=21000416;//kernel.WaveTable:416
        _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
        //$LASTPOS=21000485;//kernel.WaveTable:485
        _this.setEnv(0,_this.env);
        //$LASTPOS=21000506;//kernel.WaveTable:506
        _this.setWav(0,T("pulse"));
        
      }
    },
    fiber$main :function _trc_WaveTable_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000031;//kernel.WaveTable:31
      _this.wav={};
      //$LASTPOS=21000040;//kernel.WaveTable:40
      _this.env={};
      
      _thread.enter(function _trc_WaveTable_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=21000335;//kernel.WaveTable:335
            if (!(typeof  T!=="undefined")) { __pc=3     ; break; }
            //$LASTPOS=21000416;//kernel.WaveTable:416
            _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
            //$LASTPOS=21000485;//kernel.WaveTable:485
            _this.fiber$setEnv(_thread, 0, _this.env);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=21000506;//kernel.WaveTable:506
            _this.fiber$setWav(_thread, 0, T("pulse"));
            __pc=2;return;
          case 2:
            
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setWav :function _trc_WaveTable_setWav(num,synth) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=21000076;//kernel.WaveTable:76
      _this.wav[num]=synth;
    },
    fiber$setWav :function _trc_WaveTable_f_setWav(_thread,num,synth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000076;//kernel.WaveTable:76
      _this.wav[num]=synth;
      
      _thread.retVal=_this;return;
    },
    setEnv :function _trc_WaveTable_setEnv(num,synth) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=21000123;//kernel.WaveTable:123
      _this.env[num]=synth;
    },
    fiber$setEnv :function _trc_WaveTable_f_setEnv(_thread,num,synth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=21000123;//kernel.WaveTable:123
      _this.env[num]=synth;
      
      _thread.retVal=_this;return;
    },
    get :function _trc_WaveTable_get(w,e) {
      "use strict";
      var _this=this;
      var synth;
      
      //$LASTPOS=21000160;//kernel.WaveTable:160
      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
      
      return synth;
    },
    fiber$get :function _trc_WaveTable_f_get(_thread,w,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var synth;
      
      //$LASTPOS=21000160;//kernel.WaveTable:160
      synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
      
      _thread.retVal=synth;return;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_WaveTable_stop() {
      "use strict";
      var _this=this;
      
    },
    fiber$stop :function _trc_WaveTable_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"setWav":{"nowait":false},"setEnv":{"nowait":false},"get":{"nowait":false},"stop":{"nowait":false}},"fields":{"wav":{},"env":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Line',
  shortName: 'T1Line',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.OneframeSprite,
  includes: [],
  methods: {
    main :function _trc_T1Line_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Line_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_T1Line_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=22000043;//kernel.T1Line:43
      ctx.strokeStyle=_this.col;
      //$LASTPOS=22000069;//kernel.T1Line:69
      ctx.beginPath();
      //$LASTPOS=22000091;//kernel.T1Line:91
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=22000113;//kernel.T1Line:113
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=22000137;//kernel.T1Line:137
      ctx.stroke();
      //$LASTPOS=22000156;//kernel.T1Line:156
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Line_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=22000043;//kernel.T1Line:43
      ctx.strokeStyle=_this.col;
      //$LASTPOS=22000069;//kernel.T1Line:69
      ctx.beginPath();
      //$LASTPOS=22000091;//kernel.T1Line:91
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=22000113;//kernel.T1Line:113
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=22000137;//kernel.T1Line:137
      ctx.stroke();
      //$LASTPOS=22000156;//kernel.T1Line:156
      _this.drawn=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":false}},"fields":{"col":{},"x":{},"y":{},"tx":{},"ty":{},"drawn":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Rect',
  shortName: 'T1Rect',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.OneframeSprite,
  includes: [],
  methods: {
    main :function _trc_T1Rect_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Rect_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_T1Rect_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=23000041;//kernel.T1Rect:41
      ctx.fillStyle=_this.col;
      //$LASTPOS=23000064;//kernel.T1Rect:64
      ctx.fillRect(_this.x,_this.y,_this.w,_this.h);
      //$LASTPOS=23000094;//kernel.T1Rect:94
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Rect_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=23000041;//kernel.T1Rect:41
      ctx.fillStyle=_this.col;
      //$LASTPOS=23000064;//kernel.T1Rect:64
      ctx.fillRect(_this.x,_this.y,_this.w,_this.h);
      //$LASTPOS=23000094;//kernel.T1Rect:94
      _this.drawn=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":false}},"fields":{"col":{},"x":{},"y":{},"w":{},"h":{},"drawn":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Sprite',
  shortName: 'T1Sprite',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.OneframeSprite,
  includes: [],
  methods: {
    main :function _trc_T1Sprite_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Sprite_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_T1Sprite_draw(ctx) {
      "use strict";
      var _this=this;
      var sgn;
      
      //$LASTPOS=24000057;//kernel.T1Sprite:57
      _this.pImg=Tonyu.globals.$imageList[Math.floor(_this.p||0)];
      //$LASTPOS=24000097;//kernel.T1Sprite:97
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=24000121;//kernel.T1Sprite:121
      ctx.save();
      //$LASTPOS=24000138;//kernel.T1Sprite:138
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=24000163;//kernel.T1Sprite:163
      ctx.rotate(_this.angle/180*Math.PI);
      //$LASTPOS=24000204;//kernel.T1Sprite:204
      sgn = (_this.f?- 1:1);
      
      //$LASTPOS=24000227;//kernel.T1Sprite:227
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=24000275;//kernel.T1Sprite:275
        ctx.scale(_this.scaleX*sgn,_this.scaleX);
        
      } else {
        //$LASTPOS=24000336;//kernel.T1Sprite:336
        ctx.scale(_this.scaleX*sgn,_this.scaleY);
        
      }
      //$LASTPOS=24000388;//kernel.T1Sprite:388
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=24000425;//kernel.T1Sprite:425
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.pImg.width/2,- _this.pImg.height/2,_this.pImg.width,_this.pImg.height);
      //$LASTPOS=24000565;//kernel.T1Sprite:565
      ctx.restore();
      //$LASTPOS=24000585;//kernel.T1Sprite:585
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Sprite_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var sgn;
      
      //$LASTPOS=24000057;//kernel.T1Sprite:57
      _this.pImg=Tonyu.globals.$imageList[Math.floor(_this.p||0)];
      //$LASTPOS=24000097;//kernel.T1Sprite:97
      if (! _this.pImg) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=24000121;//kernel.T1Sprite:121
      ctx.save();
      //$LASTPOS=24000138;//kernel.T1Sprite:138
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=24000163;//kernel.T1Sprite:163
      ctx.rotate(_this.angle/180*Math.PI);
      //$LASTPOS=24000204;//kernel.T1Sprite:204
      sgn = (_this.f?- 1:1);
      
      //$LASTPOS=24000227;//kernel.T1Sprite:227
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=24000275;//kernel.T1Sprite:275
        ctx.scale(_this.scaleX*sgn,_this.scaleX);
        
      } else {
        //$LASTPOS=24000336;//kernel.T1Sprite:336
        ctx.scale(_this.scaleX*sgn,_this.scaleY);
        
      }
      //$LASTPOS=24000388;//kernel.T1Sprite:388
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=24000425;//kernel.T1Sprite:425
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.pImg.width/2,- _this.pImg.height/2,_this.pImg.width,_this.pImg.height);
      //$LASTPOS=24000565;//kernel.T1Sprite:565
      ctx.restore();
      //$LASTPOS=24000585;//kernel.T1Sprite:585
      _this.drawn=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":false}},"fields":{"pImg":{},"p":{},"x":{},"y":{},"f":{},"drawn":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Text',
  shortName: 'T1Text',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.OneframeSprite,
  includes: [Tonyu.classes.kernel.TextRectMod],
  methods: {
    main :function _trc_T1Text_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Text_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_T1Text_draw(ctx) {
      "use strict";
      var _this=this;
      var splitsText;
      var drawY;
      var textCount;
      var rect;
      
      //$LASTPOS=25000066;//kernel.T1Text:66
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=25000102;//kernel.T1Text:102
      splitsText = (_this.text+"").split("\n");
      
      //$LASTPOS=25000145;//kernel.T1Text:145
      drawY = _this.y;
      
      //$LASTPOS=25000163;//kernel.T1Text:163
      if (! _this.size) {
        //$LASTPOS=25000174;//kernel.T1Text:174
        _this.size=15;
      }
      //$LASTPOS=25000188;//kernel.T1Text:188
      if (! _this.align) {
        //$LASTPOS=25000200;//kernel.T1Text:200
        _this.align="left";
      }
      //$LASTPOS=25000219;//kernel.T1Text:219
      if (! _this.fillStyle) {
        //$LASTPOS=25000235;//kernel.T1Text:235
        _this.fillStyle="white";
      }
      //$LASTPOS=25000259;//kernel.T1Text:259
      ctx.fillStyle=_this.col;
      //$LASTPOS=25000283;//kernel.T1Text:283
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=25000320;//kernel.T1Text:320
      _this.height=0;
      //$LASTPOS=25000329;//kernel.T1Text:329
      _this.width=0;
      //$LASTPOS=25000343;//kernel.T1Text:343
      //$LASTPOS=25000347;//kernel.T1Text:347
      textCount = 0;
      for (; textCount<splitsText.length ; textCount++) {
        {
          //$LASTPOS=25000414;//kernel.T1Text:414
          rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,drawY,_this.size,_this.align,"fill");
          
          //$LASTPOS=25000506;//kernel.T1Text:506
          if (_this.width<rect.w) {
            //$LASTPOS=25000523;//kernel.T1Text:523
            _this.width=rect.w;
          }
          //$LASTPOS=25000546;//kernel.T1Text:546
          _this.height+=rect.h;
          //$LASTPOS=25000571;//kernel.T1Text:571
          drawY+=_this.size;
        }
      }
      //$LASTPOS=25000596;//kernel.T1Text:596
      _this.owner.width=_this.width;
      //$LASTPOS=25000620;//kernel.T1Text:620
      _this.owner.height=_this.height;
      //$LASTPOS=25000646;//kernel.T1Text:646
      _this.drawn=true;
    },
    fiber$draw :function _trc_T1Text_f_draw(_thread,ctx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var splitsText;
      var drawY;
      var textCount;
      var rect;
      
      //$LASTPOS=25000066;//kernel.T1Text:66
      ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
      //$LASTPOS=25000102;//kernel.T1Text:102
      splitsText = (_this.text+"").split("\n");
      
      //$LASTPOS=25000145;//kernel.T1Text:145
      drawY = _this.y;
      
      //$LASTPOS=25000163;//kernel.T1Text:163
      if (! _this.size) {
        //$LASTPOS=25000174;//kernel.T1Text:174
        _this.size=15;
      }
      //$LASTPOS=25000188;//kernel.T1Text:188
      if (! _this.align) {
        //$LASTPOS=25000200;//kernel.T1Text:200
        _this.align="left";
      }
      //$LASTPOS=25000219;//kernel.T1Text:219
      if (! _this.fillStyle) {
        //$LASTPOS=25000235;//kernel.T1Text:235
        _this.fillStyle="white";
      }
      //$LASTPOS=25000259;//kernel.T1Text:259
      ctx.fillStyle=_this.col;
      //$LASTPOS=25000283;//kernel.T1Text:283
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=25000320;//kernel.T1Text:320
      _this.height=0;
      //$LASTPOS=25000329;//kernel.T1Text:329
      _this.width=0;
      //$LASTPOS=25000343;//kernel.T1Text:343
      //$LASTPOS=25000347;//kernel.T1Text:347
      textCount = 0;
      for (; textCount<splitsText.length ; textCount++) {
        {
          //$LASTPOS=25000414;//kernel.T1Text:414
          rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,drawY,_this.size,_this.align,"fill");
          
          //$LASTPOS=25000506;//kernel.T1Text:506
          if (_this.width<rect.w) {
            //$LASTPOS=25000523;//kernel.T1Text:523
            _this.width=rect.w;
          }
          //$LASTPOS=25000546;//kernel.T1Text:546
          _this.height+=rect.h;
          //$LASTPOS=25000571;//kernel.T1Text:571
          drawY+=_this.size;
        }
      }
      //$LASTPOS=25000596;//kernel.T1Text:596
      _this.owner.width=_this.width;
      //$LASTPOS=25000620;//kernel.T1Text:620
      _this.owner.height=_this.height;
      //$LASTPOS=25000646;//kernel.T1Text:646
      _this.drawn=true;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":false}},"fields":{"size":{},"text":{},"y":{},"align":{},"fillStyle":{},"col":{},"height":{},"width":{},"x":{},"owner":{},"drawn":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Scheduler',
  shortName: 'Scheduler',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [],
  methods: {
    main :function _trc_Scheduler_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=26000064;//kernel.Scheduler:64
      _this.cur=[];
      //$LASTPOS=26000073;//kernel.Scheduler:73
      _this.next=[];
    },
    fiber$main :function _trc_Scheduler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26000064;//kernel.Scheduler:64
      _this.cur=[];
      //$LASTPOS=26000073;//kernel.Scheduler:73
      _this.next=[];
      
      _thread.retVal=_this;return;
    },
    addObj :function _trc_Scheduler_addObj(obj,name,args) {
      "use strict";
      var _this=this;
      
      return _this.newThread(obj,name,args);
    },
    fiber$addObj :function _trc_Scheduler_f_addObj(_thread,obj,name,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.newThread(obj,name,args);return;
      
      
      _thread.retVal=_this;return;
    },
    newThread :function _trc_Scheduler_newThread(obj,name,args,options) {
      "use strict";
      var _this=this;
      var th;
      
      //$LASTPOS=26000228;//kernel.Scheduler:228
      name=name||"main";
      //$LASTPOS=26000252;//kernel.Scheduler:252
      args=args||[];
      //$LASTPOS=26000272;//kernel.Scheduler:272
      th = Tonyu.thread();
      
      //$LASTPOS=26000300;//kernel.Scheduler:300
      th.apply(obj,name,args);
      //$LASTPOS=26000330;//kernel.Scheduler:330
      th.name=(obj.getClassInfo?obj.getClassInfo().shortName:"Unknown")+"::"+name;
      //$LASTPOS=26000413;//kernel.Scheduler:413
      _this.addToCur(th);
      return th;
    },
    fiber$newThread :function _trc_Scheduler_f_newThread(_thread,obj,name,args,options) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var th;
      
      //$LASTPOS=26000228;//kernel.Scheduler:228
      name=name||"main";
      //$LASTPOS=26000252;//kernel.Scheduler:252
      args=args||[];
      //$LASTPOS=26000272;//kernel.Scheduler:272
      th = Tonyu.thread();
      
      //$LASTPOS=26000300;//kernel.Scheduler:300
      th.apply(obj,name,args);
      //$LASTPOS=26000330;//kernel.Scheduler:330
      th.name=(obj.getClassInfo?obj.getClassInfo().shortName:"Unknown")+"::"+name;
      
      _thread.enter(function _trc_Scheduler_ent_newThread(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=26000413;//kernel.Scheduler:413
            _this.fiber$addToCur(_thread, th);
            __pc=1;return;
          case 1:
            
            _thread.exit(th);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    addToCur :function _trc_Scheduler_addToCur(th) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=26000468;//kernel.Scheduler:468
      if (th.scheduled) {
        return _this;
      }
      //$LASTPOS=26000499;//kernel.Scheduler:499
      _this.cur.push(th);
      //$LASTPOS=26000518;//kernel.Scheduler:518
      th.scheduled=_this;
      //$LASTPOS=26000542;//kernel.Scheduler:542
      if (Tonyu.globals.$Boot.newLimit) {
        //$LASTPOS=26000573;//kernel.Scheduler:573
        Tonyu.globals.$Boot.newLimitCount--;
        //$LASTPOS=26000605;//kernel.Scheduler:605
        if (Tonyu.globals.$Boot.newLimitCount<=0) {
          throw new Error("一度にたくさんのスレッドを作りすぎています");
          
        }
        
      }
    },
    fiber$addToCur :function _trc_Scheduler_f_addToCur(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26000468;//kernel.Scheduler:468
      if (th.scheduled) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=26000499;//kernel.Scheduler:499
      _this.cur.push(th);
      //$LASTPOS=26000518;//kernel.Scheduler:518
      th.scheduled=_this;
      //$LASTPOS=26000542;//kernel.Scheduler:542
      if (Tonyu.globals.$Boot.newLimit) {
        //$LASTPOS=26000573;//kernel.Scheduler:573
        Tonyu.globals.$Boot.newLimitCount--;
        //$LASTPOS=26000605;//kernel.Scheduler:605
        if (Tonyu.globals.$Boot.newLimitCount<=0) {
          throw new Error("一度にたくさんのスレッドを作りすぎています");
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    addToNext :function _trc_Scheduler_addToNext(th) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=26000708;//kernel.Scheduler:708
      if (th.scheduled) {
        return _this;
      }
      //$LASTPOS=26000739;//kernel.Scheduler:739
      _this.next.push(th);
      //$LASTPOS=26000759;//kernel.Scheduler:759
      th.scheduled=_this;
    },
    fiber$addToNext :function _trc_Scheduler_f_addToNext(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=26000708;//kernel.Scheduler:708
      if (th.scheduled) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=26000739;//kernel.Scheduler:739
      _this.next.push(th);
      //$LASTPOS=26000759;//kernel.Scheduler:759
      th.scheduled=_this;
      
      _thread.retVal=_this;return;
    },
    unschedule :function _trc_Scheduler_unschedule(th) {
      "use strict";
      var _this=this;
      var i;
      
      //$LASTPOS=26000805;//kernel.Scheduler:805
      i = _this.cur.indexOf(th);
      
      //$LASTPOS=26000833;//kernel.Scheduler:833
      if (i>=0) {
        //$LASTPOS=26000854;//kernel.Scheduler:854
        _this.cur.splice(i,1);
        //$LASTPOS=26000880;//kernel.Scheduler:880
        delete th.scheduled;
        
      } else {
        //$LASTPOS=26000921;//kernel.Scheduler:921
        i=_this.next.indexOf(th);
        //$LASTPOS=26000947;//kernel.Scheduler:947
        if (i>=0) {
          //$LASTPOS=26000968;//kernel.Scheduler:968
          _this.next.splice(i,1);
          //$LASTPOS=26000998;//kernel.Scheduler:998
          delete th.scheduled;
          
        }
        
      }
    },
    fiber$unschedule :function _trc_Scheduler_f_unschedule(_thread,th) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=26000805;//kernel.Scheduler:805
      i = _this.cur.indexOf(th);
      
      //$LASTPOS=26000833;//kernel.Scheduler:833
      if (i>=0) {
        //$LASTPOS=26000854;//kernel.Scheduler:854
        _this.cur.splice(i,1);
        //$LASTPOS=26000880;//kernel.Scheduler:880
        delete th.scheduled;
        
      } else {
        //$LASTPOS=26000921;//kernel.Scheduler:921
        i=_this.next.indexOf(th);
        //$LASTPOS=26000947;//kernel.Scheduler:947
        if (i>=0) {
          //$LASTPOS=26000968;//kernel.Scheduler:968
          _this.next.splice(i,1);
          //$LASTPOS=26000998;//kernel.Scheduler:998
          delete th.scheduled;
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    checkTimeout :function _trc_Scheduler_checkTimeout() {
      "use strict";
      var _this=this;
      var now;
      
      //$LASTPOS=26001061;//kernel.Scheduler:1061
      now = new Date().getTime();
      
      //$LASTPOS=26001096;//kernel.Scheduler:1096
      if (now-_this.lastSteps>1000) {
        throw new Error("待機不能モードでupdateが呼ばれています．ブラウザが固まるのを防ぐために停止します．");
        
        
      }
    },
    fiber$checkTimeout :function _trc_Scheduler_f_checkTimeout(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var now;
      
      //$LASTPOS=26001061;//kernel.Scheduler:1061
      now = new Date().getTime();
      
      //$LASTPOS=26001096;//kernel.Scheduler:1096
      if (now-_this.lastSteps>1000) {
        throw new Error("待機不能モードでupdateが呼ばれています．ブラウザが固まるのを防ぐために停止します．");
        
        
      }
      
      _thread.retVal=_this;return;
    },
    stepsAll :function _trc_Scheduler_stepsAll() {
      "use strict";
      var _this=this;
      var t;
      var _it_203;
      
      //$LASTPOS=26001226;//kernel.Scheduler:1226
      _this.lastSteps=new Date().getTime();
      //$LASTPOS=26001263;//kernel.Scheduler:1263
      _it_203=Tonyu.iterator(_this.cur,1);
      while(_it_203.next()) {
        t=_it_203[0];
        
        //$LASTPOS=26001290;//kernel.Scheduler:1290
        delete t.scheduled;
        //$LASTPOS=26001316;//kernel.Scheduler:1316
        if (t.waitCount) {
          //$LASTPOS=26001345;//kernel.Scheduler:1345
          t.waitCount--;
          //$LASTPOS=26001373;//kernel.Scheduler:1373
          _this.addToNext(t);
          
        } else {
          //$LASTPOS=26001462;//kernel.Scheduler:1462
          t.steps();
          //$LASTPOS=26001536;//kernel.Scheduler:1536
          if (t.preempted) {
            //$LASTPOS=26001621;//kernel.Scheduler:1621
            _this.addToNext(t);
            
          }
          
        }
        
      }
      //$LASTPOS=26001673;//kernel.Scheduler:1673
      _this.cur=_this.next;
      //$LASTPOS=26001688;//kernel.Scheduler:1688
      _this.next=[];
    },
    fiber$stepsAll :function _trc_Scheduler_f_stepsAll(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      var _it_203;
      
      //$LASTPOS=26001226;//kernel.Scheduler:1226
      _this.lastSteps=new Date().getTime();
      
      _thread.enter(function _trc_Scheduler_ent_stepsAll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=26001263;//kernel.Scheduler:1263
            _it_203=Tonyu.iterator(_this.cur,1);
          case 1:
            if (!(_it_203.next())) { __pc=7     ; break; }
            t=_it_203[0];
            
            //$LASTPOS=26001290;//kernel.Scheduler:1290
            delete t.scheduled;
            //$LASTPOS=26001316;//kernel.Scheduler:1316
            if (!(t.waitCount)) { __pc=3     ; break; }
            //$LASTPOS=26001345;//kernel.Scheduler:1345
            t.waitCount--;
            //$LASTPOS=26001373;//kernel.Scheduler:1373
            _this.fiber$addToNext(_thread, t);
            __pc=2;return;
          case 2:
            
            __pc=6     ;break;
          case 3     :
            //$LASTPOS=26001462;//kernel.Scheduler:1462
            t.steps();
            //$LASTPOS=26001536;//kernel.Scheduler:1536
            if (!(t.preempted)) { __pc=5     ; break; }
            //$LASTPOS=26001621;//kernel.Scheduler:1621
            _this.fiber$addToNext(_thread, t);
            __pc=4;return;
          case 4:
            
          case 5     :
            
          case 6     :
            
            __pc=1;break;
          case 7     :
            
            //$LASTPOS=26001673;//kernel.Scheduler:1673
            _this.cur=_this.next;
            //$LASTPOS=26001688;//kernel.Scheduler:1688
            _this.next=[];
            _thread.exit(_this);return;
          }
        }
      });
    },
    __getter__allThreads :function _trc_Scheduler___getter__allThreads() {
      "use strict";
      var _this=this;
      
      return _this.cur.concat(_this.next);
    },
    findByThreadGroup :function _trc_Scheduler_findByThreadGroup(o) {
      "use strict";
      var _this=this;
      
      return _this.allThreads.filter((function anonymous_1803(t) {
        
        return t._threadGroup===o;
      }));
    },
    fiber$findByThreadGroup :function _trc_Scheduler_f_findByThreadGroup(_thread,o) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.allThreads.filter((function anonymous_1803(t) {
        
        return t._threadGroup===o;
      }));return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addObj":{"nowait":false},"newThread":{"nowait":false},"addToCur":{"nowait":false},"addToNext":{"nowait":false},"unschedule":{"nowait":false},"checkTimeout":{"nowait":false},"stepsAll":{"nowait":false},"__getter__allThreads":{"nowait":true},"findByThreadGroup":{"nowait":false}},"fields":{"cur":{},"next":{},"lastSteps":{},"allThreads":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.DialogMod',
  shortName: 'DialogMod',
  namespace: 'kernel',
  includes: [Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.MathMod],
  methods: {
    main :function _trc_DialogMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_DialogMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    prompt :function _trc_DialogMod_prompt(mesg,val) {
      "use strict";
      var _this=this;
      var r;
      
      
      //$LASTPOS=27000078;//kernel.DialogMod:78
      r=_this.waitFor(UIDiag.prompt(mesg,val));
      return r;
    },
    fiber$prompt :function _trc_DialogMod_f_prompt(_thread,mesg,val) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      
      
      _thread.enter(function _trc_DialogMod_ent_prompt(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000078;//kernel.DialogMod:78
            _this.fiber$waitFor(_thread, UIDiag.prompt(mesg,val));
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(r);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    promptNumber :function _trc_DialogMod_promptNumber(mesg,val) {
      "use strict";
      var _this=this;
      var r;
      
      
      //$LASTPOS=27000173;//kernel.DialogMod:173
      r=_this.prompt(mesg,val);
      return _this.parseFloat(r);
    },
    fiber$promptNumber :function _trc_DialogMod_f_promptNumber(_thread,mesg,val) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      
      
      _thread.enter(function _trc_DialogMod_ent_promptNumber(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000173;//kernel.DialogMod:173
            _this.fiber$prompt(_thread, mesg, val);
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(_this.parseFloat(r));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    confirm :function _trc_DialogMod_confirm(mesg) {
      "use strict";
      var _this=this;
      var r;
      
      
      //$LASTPOS=27000255;//kernel.DialogMod:255
      r=_this.waitFor(UIDiag.confirm(mesg));
      return r;
    },
    fiber$confirm :function _trc_DialogMod_f_confirm(_thread,mesg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      
      
      _thread.enter(function _trc_DialogMod_ent_confirm(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000255;//kernel.DialogMod:255
            _this.fiber$waitFor(_thread, UIDiag.confirm(mesg));
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(r);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    alert :function _trc_DialogMod_alert(mesg) {
      "use strict";
      var _this=this;
      var r;
      
      
      //$LASTPOS=27000333;//kernel.DialogMod:333
      r=_this.waitFor(UIDiag.alert(mesg));
      return r;
    },
    fiber$alert :function _trc_DialogMod_f_alert(_thread,mesg) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      
      
      _thread.enter(function _trc_DialogMod_ent_alert(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=27000333;//kernel.DialogMod:333
            _this.fiber$waitFor(_thread, UIDiag.alert(mesg));
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            _thread.exit(r);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"prompt":{"nowait":false},"promptNumber":{"nowait":false},"confirm":{"nowait":false},"alert":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.Keys',
  shortName: 'Keys',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [],
  methods: {
    main :function _trc_Keys_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=28000106;//kernel.Keys:106
      _this.stats={};
      //$LASTPOS=28000117;//kernel.Keys:117
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=28000239;//kernel.Keys:239
      //$LASTPOS=28000244;//kernel.Keys:244
      _this.i = 65;
      for (; _this.i<65+26 ; _this.i++) {
        {
          //$LASTPOS=28000276;//kernel.Keys:276
          _this.codes[String.fromCharCode(_this.i).toLowerCase()]=_this.i;
        }
      }
      //$LASTPOS=28000327;//kernel.Keys:327
      //$LASTPOS=28000332;//kernel.Keys:332
      _this.i = 48;
      for (; _this.i<58 ; _this.i++) {
        {
          //$LASTPOS=28000361;//kernel.Keys:361
          _this.codes[String.fromCharCode(_this.i)]=_this.i;
        }
      }
      //$LASTPOS=28000398;//kernel.Keys:398
      if (! $.data(document,"key_event")) {
        //$LASTPOS=28000440;//kernel.Keys:440
        $.data(document,"key_event",true);
        //$LASTPOS=28000480;//kernel.Keys:480
        $(document).keydown((function anonymous_500(e) {
          
          //$LASTPOS=28000506;//kernel.Keys:506
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=28000531;//kernel.Keys:531
        $(document).keyup((function anonymous_549(e) {
          
          //$LASTPOS=28000555;//kernel.Keys:555
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=28000578;//kernel.Keys:578
        $(document).mousedown((function anonymous_600(e) {
          
          //$LASTPOS=28000616;//kernel.Keys:616
          _this.lastMouseDown=Tonyu.globals.$frameCount;
          //$LASTPOS=28000787;//kernel.Keys:787
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=28000826;//kernel.Keys:826
        $(document).mouseup((function anonymous_846(e) {
          var a;
          
          //$LASTPOS=28000862;//kernel.Keys:862
          a = (function anonymous_868() {
            
            //$LASTPOS=28001035;//kernel.Keys:1035
            Tonyu.globals.$Keys.keyup({keyCode: 1});
          });
          
          //$LASTPOS=28001080;//kernel.Keys:1080
          if (_this.lastMouseDown==Tonyu.globals.$frameCount&&! _this.reservedAction) {
            //$LASTPOS=28001146;//kernel.Keys:1146
            _this.reservedAction={at: Tonyu.globals.$frameCount+2,action: a};
            
          } else {
            //$LASTPOS=28001221;//kernel.Keys:1221
            a();
            
          }
        }));
        
      }
    },
    fiber$main :function _trc_Keys_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28000106;//kernel.Keys:106
      _this.stats={};
      //$LASTPOS=28000117;//kernel.Keys:117
      _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
      //$LASTPOS=28000239;//kernel.Keys:239
      //$LASTPOS=28000244;//kernel.Keys:244
      _this.i = 65;
      for (; _this.i<65+26 ; _this.i++) {
        {
          //$LASTPOS=28000276;//kernel.Keys:276
          _this.codes[String.fromCharCode(_this.i).toLowerCase()]=_this.i;
        }
      }
      //$LASTPOS=28000327;//kernel.Keys:327
      //$LASTPOS=28000332;//kernel.Keys:332
      _this.i = 48;
      for (; _this.i<58 ; _this.i++) {
        {
          //$LASTPOS=28000361;//kernel.Keys:361
          _this.codes[String.fromCharCode(_this.i)]=_this.i;
        }
      }
      //$LASTPOS=28000398;//kernel.Keys:398
      if (! $.data(document,"key_event")) {
        //$LASTPOS=28000440;//kernel.Keys:440
        $.data(document,"key_event",true);
        //$LASTPOS=28000480;//kernel.Keys:480
        $(document).keydown((function anonymous_500(e) {
          
          //$LASTPOS=28000506;//kernel.Keys:506
          Tonyu.globals.$Keys.keydown(e);
        }));
        //$LASTPOS=28000531;//kernel.Keys:531
        $(document).keyup((function anonymous_549(e) {
          
          //$LASTPOS=28000555;//kernel.Keys:555
          Tonyu.globals.$Keys.keyup(e);
        }));
        //$LASTPOS=28000578;//kernel.Keys:578
        $(document).mousedown((function anonymous_600(e) {
          
          //$LASTPOS=28000616;//kernel.Keys:616
          _this.lastMouseDown=Tonyu.globals.$frameCount;
          //$LASTPOS=28000787;//kernel.Keys:787
          Tonyu.globals.$Keys.keydown({keyCode: 1});
        }));
        //$LASTPOS=28000826;//kernel.Keys:826
        $(document).mouseup((function anonymous_846(e) {
          var a;
          
          //$LASTPOS=28000862;//kernel.Keys:862
          a = (function anonymous_868() {
            
            //$LASTPOS=28001035;//kernel.Keys:1035
            Tonyu.globals.$Keys.keyup({keyCode: 1});
          });
          
          //$LASTPOS=28001080;//kernel.Keys:1080
          if (_this.lastMouseDown==Tonyu.globals.$frameCount&&! _this.reservedAction) {
            //$LASTPOS=28001146;//kernel.Keys:1146
            _this.reservedAction={at: Tonyu.globals.$frameCount+2,action: a};
            
          } else {
            //$LASTPOS=28001221;//kernel.Keys:1221
            a();
            
          }
        }));
        
      }
      
      _thread.retVal=_this;return;
    },
    getkey :function _trc_Keys_getkey(code) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=28001278;//kernel.Keys:1278
      if (typeof  code=="string") {
        //$LASTPOS=28001316;//kernel.Keys:1316
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=28001360;//kernel.Keys:1360
      if (! code) {
        return 0;
      }
      //$LASTPOS=28001386;//kernel.Keys:1386
      if (_this.stats[code]==- 1) {
        return 0;
      }
      //$LASTPOS=28001422;//kernel.Keys:1422
      if (! _this.stats[code]) {
        //$LASTPOS=28001440;//kernel.Keys:1440
        _this.stats[code]=0;
      }
      return _this.stats[code];
    },
    fiber$getkey :function _trc_Keys_f_getkey(_thread,code) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28001278;//kernel.Keys:1278
      if (typeof  code=="string") {
        //$LASTPOS=28001316;//kernel.Keys:1316
        code=_this.codes[code.toLowerCase()];
        
      }
      //$LASTPOS=28001360;//kernel.Keys:1360
      if (! code) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=28001386;//kernel.Keys:1386
      if (_this.stats[code]==- 1) {
        _thread.retVal=0;return;
        
      }
      //$LASTPOS=28001422;//kernel.Keys:1422
      if (! _this.stats[code]) {
        //$LASTPOS=28001440;//kernel.Keys:1440
        _this.stats[code]=0;
      }
      _thread.retVal=_this.stats[code];return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_Keys_update() {
      "use strict";
      var _this=this;
      var i;
      var _it_216;
      
      //$LASTPOS=28001509;//kernel.Keys:1509
      _it_216=Tonyu.iterator(_this.stats,1);
      while(_it_216.next()) {
        i=_it_216[0];
        
        //$LASTPOS=28001541;//kernel.Keys:1541
        if (_this.stats[i]>0) {
          //$LASTPOS=28001558;//kernel.Keys:1558
          _this.stats[i]++;
          
        }
        //$LASTPOS=28001580;//kernel.Keys:1580
        if (_this.stats[i]==- 1) {
          //$LASTPOS=28001598;//kernel.Keys:1598
          _this.stats[i]=1;
        }
        
      }
      //$LASTPOS=28001622;//kernel.Keys:1622
      if (_this.reservedAction&&_this.reservedAction.at==Tonyu.globals.$frameCount) {
        //$LASTPOS=28001687;//kernel.Keys:1687
        _this.reservedAction.action();
        //$LASTPOS=28001721;//kernel.Keys:1721
        _this.reservedAction=null;
        
      }
    },
    fiber$update :function _trc_Keys_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var _it_216;
      
      //$LASTPOS=28001509;//kernel.Keys:1509
      _it_216=Tonyu.iterator(_this.stats,1);
      while(_it_216.next()) {
        i=_it_216[0];
        
        //$LASTPOS=28001541;//kernel.Keys:1541
        if (_this.stats[i]>0) {
          //$LASTPOS=28001558;//kernel.Keys:1558
          _this.stats[i]++;
          
        }
        //$LASTPOS=28001580;//kernel.Keys:1580
        if (_this.stats[i]==- 1) {
          //$LASTPOS=28001598;//kernel.Keys:1598
          _this.stats[i]=1;
        }
        
      }
      //$LASTPOS=28001622;//kernel.Keys:1622
      if (_this.reservedAction&&_this.reservedAction.at==Tonyu.globals.$frameCount) {
        //$LASTPOS=28001687;//kernel.Keys:1687
        _this.reservedAction.action();
        //$LASTPOS=28001721;//kernel.Keys:1721
        _this.reservedAction=null;
        
      }
      
      _thread.retVal=_this;return;
    },
    keydown :function _trc_Keys_keydown(e) {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=28001772;//kernel.Keys:1772
      s = _this.stats[e.keyCode];
      
      //$LASTPOS=28001801;//kernel.Keys:1801
      if (! s) {
        //$LASTPOS=28001820;//kernel.Keys:1820
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=28001852;//kernel.Keys:1852
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keydown :function _trc_Keys_f_keydown(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      
      //$LASTPOS=28001772;//kernel.Keys:1772
      s = _this.stats[e.keyCode];
      
      //$LASTPOS=28001801;//kernel.Keys:1801
      if (! s) {
        //$LASTPOS=28001820;//kernel.Keys:1820
        _this.stats[e.keyCode]=1;
        
      }
      //$LASTPOS=28001852;//kernel.Keys:1852
      Tonyu.globals.$InputDevice.handleListeners();
      
      _thread.retVal=_this;return;
    },
    keyup :function _trc_Keys_keyup(e) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=28001905;//kernel.Keys:1905
      _this.stats[e.keyCode]=0;
      //$LASTPOS=28001930;//kernel.Keys:1930
      Tonyu.globals.$InputDevice.handleListeners();
    },
    fiber$keyup :function _trc_Keys_f_keyup(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=28001905;//kernel.Keys:1905
      _this.stats[e.keyCode]=0;
      //$LASTPOS=28001930;//kernel.Keys:1930
      Tonyu.globals.$InputDevice.handleListeners();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getkey":{"nowait":false},"update":{"nowait":false},"keydown":{"nowait":false},"keyup":{"nowait":false}},"fields":{"stats":{},"codes":{},"i":{},"lastMouseDown":{},"reservedAction":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Vec3',
  shortName: 'Vec3',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.TObject,
  includes: [Tonyu.classes.kernel.MathMod],
  methods: {
    main :function _trc_Vec3_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Vec3_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Vec3_initialize(x,y,z) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29000080;//kernel.Vec3:80
      _this.x=x||0;
      //$LASTPOS=29000098;//kernel.Vec3:98
      _this.y=y||0;
      //$LASTPOS=29000116;//kernel.Vec3:116
      _this.z=z||0;
    },
    checkNum :function _trc_Vec3_checkNum(o) {
      "use strict";
      var _this=this;
      var name;
      var val;
      var _it_220;
      
      //$LASTPOS=29000153;//kernel.Vec3:153
      _it_220=Tonyu.iterator(o,2);
      while(_it_220.next()) {
        name=_it_220[0];
        val=_it_220[1];
        
        //$LASTPOS=29000188;//kernel.Vec3:188
        if (typeof  val!=="number") {
          throw new Error(name+"("+val+")は数値ではありません．");
          
          
        }
        
      }
    },
    fiber$checkNum :function _trc_Vec3_f_checkNum(_thread,o) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var name;
      var val;
      var _it_220;
      
      //$LASTPOS=29000153;//kernel.Vec3:153
      _it_220=Tonyu.iterator(o,2);
      while(_it_220.next()) {
        name=_it_220[0];
        val=_it_220[1];
        
        //$LASTPOS=29000188;//kernel.Vec3:188
        if (typeof  val!=="number") {
          throw new Error(name+"("+val+")は数値ではありません．");
          
          
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    parsePointArgs :function _trc_Vec3_parsePointArgs(args) {
      "use strict";
      var _this=this;
      var a;
      var p;
      
      //$LASTPOS=29000327;//kernel.Vec3:327
      a = new Tonyu.classes.kernel.ArgParser(args);
      
      //$LASTPOS=29000359;//kernel.Vec3:359
      p = a.shift(Object);
      
      //$LASTPOS=29000387;//kernel.Vec3:387
      if (! p) {
        //$LASTPOS=29000406;//kernel.Vec3:406
        p={};
        //$LASTPOS=29000421;//kernel.Vec3:421
        p.x=a.shift();
        //$LASTPOS=29000445;//kernel.Vec3:445
        p.y=a.shift();
        //$LASTPOS=29000469;//kernel.Vec3:469
        p.z=a.shift();
        
      }
      return p;
    },
    fiber$parsePointArgs :function _trc_Vec3_f_parsePointArgs(_thread,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var p;
      
      //$LASTPOS=29000327;//kernel.Vec3:327
      a = new Tonyu.classes.kernel.ArgParser(args);
      
      //$LASTPOS=29000359;//kernel.Vec3:359
      p = a.shift(Object);
      
      //$LASTPOS=29000387;//kernel.Vec3:387
      if (! p) {
        //$LASTPOS=29000406;//kernel.Vec3:406
        p={};
        //$LASTPOS=29000421;//kernel.Vec3:421
        p.x=a.shift();
        //$LASTPOS=29000445;//kernel.Vec3:445
        p.y=a.shift();
        //$LASTPOS=29000469;//kernel.Vec3:469
        p.z=a.shift();
        
      }
      _thread.retVal=p;return;
      
      
      _thread.retVal=_this;return;
    },
    addX :function _trc_Vec3_addX() {
      "use strict";
      var _this=this;
      var p;
      
      //$LASTPOS=29000533;//kernel.Vec3:533
      p = _this.parsePointArgs(arguments);
      
      //$LASTPOS=29000571;//kernel.Vec3:571
      _this.x+=p.x;
      //$LASTPOS=29000584;//kernel.Vec3:584
      _this.y+=p.y;
      //$LASTPOS=29000597;//kernel.Vec3:597
      _this.z+=p.z;
      return _this;
    },
    fiber$addX :function _trc_Vec3_f_addX(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var p;
      
      
      _thread.enter(function _trc_Vec3_ent_addX(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=29000533;//kernel.Vec3:533
            _this.fiber$parsePointArgs(_thread, _arguments);
            __pc=1;return;
          case 1:
            p=_thread.retVal;
            
            //$LASTPOS=29000571;//kernel.Vec3:571
            _this.x+=p.x;
            //$LASTPOS=29000584;//kernel.Vec3:584
            _this.y+=p.y;
            //$LASTPOS=29000597;//kernel.Vec3:597
            _this.z+=p.z;
            _thread.exit(_this);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    subX :function _trc_Vec3_subX() {
      "use strict";
      var _this=this;
      var p;
      
      //$LASTPOS=29000650;//kernel.Vec3:650
      p = _this.parsePointArgs(arguments);
      
      //$LASTPOS=29000688;//kernel.Vec3:688
      _this.x-=p.x;
      //$LASTPOS=29000701;//kernel.Vec3:701
      _this.y-=p.y;
      //$LASTPOS=29000714;//kernel.Vec3:714
      _this.z-=p.z;
      return _this;
    },
    fiber$subX :function _trc_Vec3_f_subX(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var p;
      
      
      _thread.enter(function _trc_Vec3_ent_subX(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=29000650;//kernel.Vec3:650
            _this.fiber$parsePointArgs(_thread, _arguments);
            __pc=1;return;
          case 1:
            p=_thread.retVal;
            
            //$LASTPOS=29000688;//kernel.Vec3:688
            _this.x-=p.x;
            //$LASTPOS=29000701;//kernel.Vec3:701
            _this.y-=p.y;
            //$LASTPOS=29000714;//kernel.Vec3:714
            _this.z-=p.z;
            _thread.exit(_this);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    mulX :function _trc_Vec3_mulX(k) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29000770;//kernel.Vec3:770
      _this.x=_this.x*k;
      //$LASTPOS=29000782;//kernel.Vec3:782
      _this.y=_this.y*k;
      //$LASTPOS=29000794;//kernel.Vec3:794
      _this.z=_this.z*k;
      return _this;
    },
    fiber$mulX :function _trc_Vec3_f_mulX(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000770;//kernel.Vec3:770
      _this.x=_this.x*k;
      //$LASTPOS=29000782;//kernel.Vec3:782
      _this.y=_this.y*k;
      //$LASTPOS=29000794;//kernel.Vec3:794
      _this.z=_this.z*k;
      _thread.retVal=_this;return;
      
      
      _thread.retVal=_this;return;
    },
    divX :function _trc_Vec3_divX(k) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29000847;//kernel.Vec3:847
      _this.x=_this.x/k;
      //$LASTPOS=29000859;//kernel.Vec3:859
      _this.y=_this.y/k;
      //$LASTPOS=29000871;//kernel.Vec3:871
      _this.z=_this.z/k;
      return _this;
    },
    fiber$divX :function _trc_Vec3_f_divX(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29000847;//kernel.Vec3:847
      _this.x=_this.x/k;
      //$LASTPOS=29000859;//kernel.Vec3:859
      _this.y=_this.y/k;
      //$LASTPOS=29000871;//kernel.Vec3:871
      _this.z=_this.z/k;
      _thread.retVal=_this;return;
      
      
      _thread.retVal=_this;return;
    },
    add :function _trc_Vec3_add(x,y,z) {
      "use strict";
      var _this=this;
      
      return _this.clone().addX(x,y,z);
    },
    fiber$add :function _trc_Vec3_f_add(_thread,x,y,z) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.clone().addX(x,y,z);return;
      
      
      _thread.retVal=_this;return;
    },
    sub :function _trc_Vec3_sub(x,y,z) {
      "use strict";
      var _this=this;
      
      return _this.clone().subX(x,y,z);
    },
    fiber$sub :function _trc_Vec3_f_sub(_thread,x,y,z) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.clone().subX(x,y,z);return;
      
      
      _thread.retVal=_this;return;
    },
    mul :function _trc_Vec3_mul(k) {
      "use strict";
      var _this=this;
      
      return _this.clone().mulX(k);
    },
    fiber$mul :function _trc_Vec3_f_mul(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.clone().mulX(k);return;
      
      
      _thread.retVal=_this;return;
    },
    div :function _trc_Vec3_div(k) {
      "use strict";
      var _this=this;
      
      return _this.clone().divX(k);
    },
    fiber$div :function _trc_Vec3_f_div(_thread,k) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.clone().divX(k);return;
      
      
      _thread.retVal=_this;return;
    },
    clone :function _trc_Vec3_clone() {
      "use strict";
      var _this=this;
      
      return new Tonyu.classes.kernel.Vec3(_this.x,_this.y,_this.z);
    },
    fiber$clone :function _trc_Vec3_f_clone(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=new Tonyu.classes.kernel.Vec3(_this.x,_this.y,_this.z);return;
      
      
      _thread.retVal=_this;return;
    },
    set :function _trc_Vec3_set(x,y,z) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29002248;//kernel.Vec3:2248
      if (typeof  x==="object") {
        //$LASTPOS=29002284;//kernel.Vec3:2284
        y=x.y;
        //$LASTPOS=29002300;//kernel.Vec3:2300
        z=x.z;
        //$LASTPOS=29002316;//kernel.Vec3:2316
        x=x.x;
        
      }
      //$LASTPOS=29002335;//kernel.Vec3:2335
      if (typeof  x==="number") {
        //$LASTPOS=29002360;//kernel.Vec3:2360
        _this.x=x;
      }
      //$LASTPOS=29002375;//kernel.Vec3:2375
      if (typeof  y==="number") {
        //$LASTPOS=29002400;//kernel.Vec3:2400
        _this.y=y;
      }
      //$LASTPOS=29002415;//kernel.Vec3:2415
      if (typeof  z==="number") {
        //$LASTPOS=29002440;//kernel.Vec3:2440
        _this.z=z;
      }
      return _this;
    },
    fiber$set :function _trc_Vec3_f_set(_thread,x,y,z) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29002248;//kernel.Vec3:2248
      if (typeof  x==="object") {
        //$LASTPOS=29002284;//kernel.Vec3:2284
        y=x.y;
        //$LASTPOS=29002300;//kernel.Vec3:2300
        z=x.z;
        //$LASTPOS=29002316;//kernel.Vec3:2316
        x=x.x;
        
      }
      //$LASTPOS=29002335;//kernel.Vec3:2335
      if (typeof  x==="number") {
        //$LASTPOS=29002360;//kernel.Vec3:2360
        _this.x=x;
      }
      //$LASTPOS=29002375;//kernel.Vec3:2375
      if (typeof  y==="number") {
        //$LASTPOS=29002400;//kernel.Vec3:2400
        _this.y=y;
      }
      //$LASTPOS=29002415;//kernel.Vec3:2415
      if (typeof  z==="number") {
        //$LASTPOS=29002440;//kernel.Vec3:2440
        _this.z=z;
      }
      _thread.retVal=_this;return;
      
      
      _thread.retVal=_this;return;
    },
    setTo :function _trc_Vec3_setTo(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29001274;//kernel.Vec3:1274
      t.x=_this.x;
      //$LASTPOS=29001286;//kernel.Vec3:1286
      t.y=_this.y;
      //$LASTPOS=29001298;//kernel.Vec3:1298
      t.z=_this.z;
    },
    fiber$setTo :function _trc_Vec3_f_setTo(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29001274;//kernel.Vec3:1274
      t.x=_this.x;
      //$LASTPOS=29001286;//kernel.Vec3:1286
      t.y=_this.y;
      //$LASTPOS=29001298;//kernel.Vec3:1298
      t.z=_this.z;
      
      _thread.retVal=_this;return;
    },
    addTo :function _trc_Vec3_addTo(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=29001326;//kernel.Vec3:1326
      t.x+=_this.x;
      //$LASTPOS=29001339;//kernel.Vec3:1339
      t.y+=_this.y;
      //$LASTPOS=29001352;//kernel.Vec3:1352
      t.z+=_this.z;
    },
    fiber$addTo :function _trc_Vec3_f_addTo(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=29001326;//kernel.Vec3:1326
      t.x+=_this.x;
      //$LASTPOS=29001339;//kernel.Vec3:1339
      t.y+=_this.y;
      //$LASTPOS=29001352;//kernel.Vec3:1352
      t.z+=_this.z;
      
      _thread.retVal=_this;return;
    },
    dist :function _trc_Vec3_dist() {
      "use strict";
      var _this=this;
      
      return _this.sqrt(_this.x*_this.x+_this.y*_this.y+_this.z*_this.z);
    },
    __getter__length :function _trc_Vec3___getter__length() {
      "use strict";
      var _this=this;
      
      return _this.sqrt(_this.x*_this.x+_this.y*_this.y+_this.z*_this.z);
    },
    __setter__length :function _trc_Vec3___setter__length(l) {
      "use strict";
      var _this=this;
      
      return _this.normalizeX().mulX(l);
    },
    normalizeX :function _trc_Vec3_normalizeX(len) {
      "use strict";
      var _this=this;
      var l;
      
      //$LASTPOS=29001528;//kernel.Vec3:1528
      l = _this.length;
      
      //$LASTPOS=29001544;//kernel.Vec3:1544
      if (l==0) {
        return _this;
      }
      //$LASTPOS=29001569;//kernel.Vec3:1569
      len=(typeof  len==="number")?len:1;
      //$LASTPOS=29001609;//kernel.Vec3:1609
      _this.x*=len/l;
      //$LASTPOS=29001624;//kernel.Vec3:1624
      _this.y*=len/l;
      //$LASTPOS=29001639;//kernel.Vec3:1639
      _this.z*=len/l;
      return _this;
    },
    fiber$normalizeX :function _trc_Vec3_f_normalizeX(_thread,len) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var l;
      
      //$LASTPOS=29001528;//kernel.Vec3:1528
      l = _this.length;
      
      //$LASTPOS=29001544;//kernel.Vec3:1544
      if (l==0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=29001569;//kernel.Vec3:1569
      len=(typeof  len==="number")?len:1;
      //$LASTPOS=29001609;//kernel.Vec3:1609
      _this.x*=len/l;
      //$LASTPOS=29001624;//kernel.Vec3:1624
      _this.y*=len/l;
      //$LASTPOS=29001639;//kernel.Vec3:1639
      _this.z*=len/l;
      _thread.retVal=_this;return;
      
      
      _thread.retVal=_this;return;
    },
    normalize :function _trc_Vec3_normalize(len) {
      "use strict";
      var _this=this;
      
      return _this.clone().normalizeX(len);
    },
    fiber$normalize :function _trc_Vec3_f_normalize(_thread,len) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.clone().normalizeX(len);return;
      
      
      _thread.retVal=_this;return;
    },
    productX :function _trc_Vec3_productX() {
      "use strict";
      var _this=this;
      var a;
      var b;
      var i;
      var j;
      var k;
      
      //$LASTPOS=29001746;//kernel.Vec3:1746
      a = _this.parsePointArgs(arguments);
      
      //$LASTPOS=29001784;//kernel.Vec3:1784
      b = _this;
      
      //$LASTPOS=29001801;//kernel.Vec3:1801
      i = a.y*b.z-a.z*b.y;
      
      //$LASTPOS=29001829;//kernel.Vec3:1829
      j = a.z*b.x-a.x*b.z;
      
      //$LASTPOS=29001857;//kernel.Vec3:1857
      k = a.x*b.y-a.y*b.x;
      
      //$LASTPOS=29001885;//kernel.Vec3:1885
      b.x=i;
      //$LASTPOS=29001897;//kernel.Vec3:1897
      b.y=j;
      //$LASTPOS=29001909;//kernel.Vec3:1909
      b.z=k;
      return b;
    },
    fiber$productX :function _trc_Vec3_f_productX(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var b;
      var i;
      var j;
      var k;
      
      
      _thread.enter(function _trc_Vec3_ent_productX(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=29001746;//kernel.Vec3:1746
            _this.fiber$parsePointArgs(_thread, _arguments);
            __pc=1;return;
          case 1:
            a=_thread.retVal;
            
            //$LASTPOS=29001784;//kernel.Vec3:1784
            b = _this;
            
            //$LASTPOS=29001801;//kernel.Vec3:1801
            i = a.y*b.z-a.z*b.y;
            
            //$LASTPOS=29001829;//kernel.Vec3:1829
            j = a.z*b.x-a.x*b.z;
            
            //$LASTPOS=29001857;//kernel.Vec3:1857
            k = a.x*b.y-a.y*b.x;
            
            //$LASTPOS=29001885;//kernel.Vec3:1885
            b.x=i;
            //$LASTPOS=29001897;//kernel.Vec3:1897
            b.y=j;
            //$LASTPOS=29001909;//kernel.Vec3:1909
            b.z=k;
            _thread.exit(b);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    product :function _trc_Vec3_product(x,y,z) {
      "use strict";
      var _this=this;
      
      return _this.clone().productX(x,y,z);
    },
    fiber$product :function _trc_Vec3_f_product(_thread,x,y,z) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.clone().productX(x,y,z);return;
      
      
      _thread.retVal=_this;return;
    },
    rotate :function _trc_Vec3_rotate(angle,axis) {
      "use strict";
      var _this=this;
      var v90;
      
      //$LASTPOS=29002022;//kernel.Vec3:2022
      if (! axis) {
        //$LASTPOS=29002033;//kernel.Vec3:2033
        axis=new Tonyu.classes.kernel.Vec3(0,0,1);
      }
      //$LASTPOS=29002060;//kernel.Vec3:2060
      v90 = _this.product(axis);
      
      //$LASTPOS=29002088;//kernel.Vec3:2088
      v90.length=_this.length;
      return _this.mul(_this.cos(angle)).add(v90.mul(_this.sin(angle)));
    },
    fiber$rotate :function _trc_Vec3_f_rotate(_thread,angle,axis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var v90;
      
      //$LASTPOS=29002022;//kernel.Vec3:2022
      if (! axis) {
        //$LASTPOS=29002033;//kernel.Vec3:2033
        axis=new Tonyu.classes.kernel.Vec3(0,0,1);
      }
      
      _thread.enter(function _trc_Vec3_ent_rotate(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=29002060;//kernel.Vec3:2060
            _this.fiber$product(_thread, axis);
            __pc=1;return;
          case 1:
            v90=_thread.retVal;
            
            //$LASTPOS=29002088;//kernel.Vec3:2088
            v90.length=_this.length;
            _thread.exit(_this.mul(_this.cos(angle)).add(v90.mul(_this.sin(angle))));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    rotateX :function _trc_Vec3_rotateX(angle,axis) {
      "use strict";
      var _this=this;
      
      return _this.set(_this.rotate(angle,axis));
    },
    fiber$rotateX :function _trc_Vec3_f_rotateX(_thread,angle,axis) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.set(_this.rotate(angle,axis));return;
      
      
      _thread.retVal=_this;return;
    },
    toString :function _trc_Vec3_toString() {
      "use strict";
      var _this=this;
      
      return "("+[_this.x,_this.y,_this.z].join(",")+")";
    },
    fiber$toString :function _trc_Vec3_f_toString(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal="("+[_this.x,_this.y,_this.z].join(",")+")";return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"checkNum":{"nowait":false},"parsePointArgs":{"nowait":false},"addX":{"nowait":false},"subX":{"nowait":false},"mulX":{"nowait":false},"divX":{"nowait":false},"add":{"nowait":false},"sub":{"nowait":false},"mul":{"nowait":false},"div":{"nowait":false},"clone":{"nowait":false},"set":{"nowait":false},"setTo":{"nowait":false},"addTo":{"nowait":false},"dist":{"nowait":true},"__getter__length":{"nowait":true},"__setter__length":{"nowait":true},"normalizeX":{"nowait":false},"normalize":{"nowait":false},"productX":{"nowait":false},"product":{"nowait":false},"rotate":{"nowait":false},"rotateX":{"nowait":false},"toString":{"nowait":false}},"fields":{"z":{},"length":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Vec3View',
  shortName: 'Vec3View',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Vec3,
  includes: [Tonyu.classes.kernel.MathMod],
  methods: {
    main :function _trc_Vec3View_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Vec3View_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Vec3View_initialize(target,attrs) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=30000060;//kernel.Vec3View:60
      _this.target=target;
      //$LASTPOS=30000085;//kernel.Vec3View:85
      _this.attrs=attrs||{x: "x",y: "y",z: "z"};
    },
    __getter__x :function _trc_Vec3View___getter__x() {
      "use strict";
      var _this=this;
      
      return _this.target[_this.attrs.x]||0;
    },
    __getter__y :function _trc_Vec3View___getter__y() {
      "use strict";
      var _this=this;
      
      return _this.target[_this.attrs.y]||0;
    },
    __getter__z :function _trc_Vec3View___getter__z() {
      "use strict";
      var _this=this;
      
      return _this.target[_this.attrs.z]||0;
    },
    __setter__x :function _trc_Vec3View___setter__x(v) {
      "use strict";
      var _this=this;
      
      return _this.target[_this.attrs.x]=v;
    },
    __setter__y :function _trc_Vec3View___setter__y(v) {
      "use strict";
      var _this=this;
      
      return _this.target[_this.attrs.y]=v;
    },
    __setter__z :function _trc_Vec3View___setter__z(v) {
      "use strict";
      var _this=this;
      
      return _this.target[_this.attrs.z]=v;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"__getter__x":{"nowait":true},"__getter__y":{"nowait":true},"__getter__z":{"nowait":true},"__setter__x":{"nowait":true},"__setter__y":{"nowait":true},"__setter__z":{"nowait":true}},"fields":{"target":{},"attrs":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.BaseActor',
  shortName: 'BaseActor',
  namespace: 'kernel',
  includes: [Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod,Tonyu.classes.kernel.OneframeSpriteMod,Tonyu.classes.kernel.ThreadGroupMod,Tonyu.classes.kernel.EventHandlerCaller,Tonyu.classes.kernel.DialogMod],
  methods: {
    main :function _trc_BaseActor_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_BaseActor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __getter__defaultLayer :function _trc_BaseActor___getter__defaultLayer() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$mainLayer;
    },
    initialize :function _trc_BaseActor_initialize(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31000270;//kernel.BaseActor:270
      if (typeof  x=="object") {
        //$LASTPOS=31000294;//kernel.BaseActor:294
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=31000326;//kernel.BaseActor:326
        if (typeof  x=="number") {
          //$LASTPOS=31000361;//kernel.BaseActor:361
          _this.x=x;
          //$LASTPOS=31000380;//kernel.BaseActor:380
          _this.y=y;
          //$LASTPOS=31000399;//kernel.BaseActor:399
          _this.p=p;
          
        }
      }
      //$LASTPOS=31000421;//kernel.BaseActor:421
      _this._scheduler=_this._scheduler||Tonyu.globals.$Scheduler;
      //$LASTPOS=31000461;//kernel.BaseActor:461
      if (Tonyu.runMode) {
        //$LASTPOS=31000480;//kernel.BaseActor:480
        _this._th=Tonyu.globals.$Boot.schedule(_this,"main",[]);
      }
      //$LASTPOS=31000521;//kernel.BaseActor:521
      _this.layer=_this.layer||_this.defaultLayer;
      //$LASTPOS=31000553;//kernel.BaseActor:553
      _this.crashScale=1;
      //$LASTPOS=31000572;//kernel.BaseActor:572
      _this.position=new Tonyu.classes.kernel.Vec3View(_this);
      //$LASTPOS=31000606;//kernel.BaseActor:606
      if (_this.scaleX==null) {
        //$LASTPOS=31000624;//kernel.BaseActor:624
        _this.scaleX=1;
      }
      //$LASTPOS=31000639;//kernel.BaseActor:639
      if (_this.rotation==null) {
        //$LASTPOS=31000659;//kernel.BaseActor:659
        _this.rotation=0;
      }
      //$LASTPOS=31000721;//kernel.BaseActor:721
      if (_this.alpha==null) {
        //$LASTPOS=31000738;//kernel.BaseActor:738
        _this.alpha=255;
      }
      //$LASTPOS=31000754;//kernel.BaseActor:754
      if (_this.zOrder==null) {
        //$LASTPOS=31000772;//kernel.BaseActor:772
        _this.zOrder=0;
      }
      //$LASTPOS=31000787;//kernel.BaseActor:787
      if (_this.age==null) {
        //$LASTPOS=31000802;//kernel.BaseActor:802
        _this.age=0;
      }
      //$LASTPOS=31000814;//kernel.BaseActor:814
      if (_this.anim!=null&&typeof  _this.anim=="object") {
        //$LASTPOS=31000865;//kernel.BaseActor:865
        _this.animMode=true;
        //$LASTPOS=31000889;//kernel.BaseActor:889
        _this.animFrame=0;
        
      } else {
        //$LASTPOS=31000923;//kernel.BaseActor:923
        _this.animMode=false;
        
      }
      //$LASTPOS=31000951;//kernel.BaseActor:951
      if (_this.animFps==null) {
        //$LASTPOS=31000970;//kernel.BaseActor:970
        _this.animFps=1;
      }
    },
    extend :function _trc_BaseActor_extend(obj) {
      "use strict";
      var _this=this;
      
      return Tonyu.extend(_this,obj);
    },
    print :function _trc_BaseActor_print(pt) {
      "use strict";
      var _this=this;
      var mergedArg;
      var argCount;
      var printCount;
      
      //$LASTPOS=31001074;//kernel.BaseActor:1074
      Tonyu.globals.$_printCount++;
      //$LASTPOS=31001090;//kernel.BaseActor:1090
      if (Tonyu.globals.$_printCount>100) {
        throw new Error("printをしすぎています.");
        
      }
      //$LASTPOS=31001152;//kernel.BaseActor:1152
      console.log.apply(console,arguments);
      //$LASTPOS=31001195;//kernel.BaseActor:1195
      mergedArg = "";
      
      //$LASTPOS=31001218;//kernel.BaseActor:1218
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=31001246;//kernel.BaseActor:1246
        //$LASTPOS=31001250;//kernel.BaseActor:1250
        argCount = 0;
        for (; argCount<arguments.length ; argCount++) {
          {
            //$LASTPOS=31001317;//kernel.BaseActor:1317
            mergedArg=mergedArg+arguments[argCount]+" ";
          }
        }
        //$LASTPOS=31001382;//kernel.BaseActor:1382
        _this.splits=mergedArg.split("\n");
        //$LASTPOS=31001421;//kernel.BaseActor:1421
        //$LASTPOS=31001425;//kernel.BaseActor:1425
        printCount = 0;
        for (; printCount<_this.splits.length ; printCount++) {
          {
            //$LASTPOS=31001495;//kernel.BaseActor:1495
            Tonyu.globals.$consolePanel.scroll(0,20);
            //$LASTPOS=31001536;//kernel.BaseActor:1536
            Tonyu.globals.$consolePanel.setFillStyle("white");
            //$LASTPOS=31001586;//kernel.BaseActor:1586
            Tonyu.globals.$consolePanel.fillText(_this.splits[printCount],0,Tonyu.globals.$consolePrintY,20,"left");
          }
        }
        
      }
    },
    setAnimFps :function _trc_BaseActor_setAnimFps(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31001709;//kernel.BaseActor:1709
      _this.animFps=f;
      //$LASTPOS=31001730;//kernel.BaseActor:1730
      _this.animFrame=0;
      //$LASTPOS=31001753;//kernel.BaseActor:1753
      _this.animMode=true;
    },
    startAnim :function _trc_BaseActor_startAnim() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31001803;//kernel.BaseActor:1803
      _this.animMode=true;
    },
    stopAnim :function _trc_BaseActor_stopAnim() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31001852;//kernel.BaseActor:1852
      _this.animMode=false;
    },
    update :function _trc_BaseActor_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31001894;//kernel.BaseActor:1894
      _this.onUpdate();
      //$LASTPOS=31001911;//kernel.BaseActor:1911
      if (null) {
        //$LASTPOS=31001934;//kernel.BaseActor:1934
        null.suspend();
        //$LASTPOS=31001962;//kernel.BaseActor:1962
        if (_this._scheduler) {
          //$LASTPOS=31001978;//kernel.BaseActor:1978
          _this._scheduler.addToNext(null);
        }
        
      } else {
        //$LASTPOS=31002032;//kernel.BaseActor:2032
        _this._scheduler.checkTimeout();
        
      }
    },
    fiber$update :function _trc_BaseActor_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31001894;//kernel.BaseActor:1894
      _this.onUpdate();
      //$LASTPOS=31001911;//kernel.BaseActor:1911
      if (_thread) {
        //$LASTPOS=31001934;//kernel.BaseActor:1934
        _thread.suspend();
        //$LASTPOS=31001962;//kernel.BaseActor:1962
        if (_this._scheduler) {
          //$LASTPOS=31001978;//kernel.BaseActor:1978
          _this._scheduler.addToNext(_thread);
        }
        
      } else {
        //$LASTPOS=31002032;//kernel.BaseActor:2032
        _this._scheduler.checkTimeout();
        
      }
      
      _thread.retVal=_this;return;
    },
    onUpdate :function _trc_BaseActor_onUpdate() {
      "use strict";
      var _this=this;
      
    },
    updateEx :function _trc_BaseActor_updateEx(updateT) {
      "use strict";
      var _this=this;
      var updateCount;
      
      //$LASTPOS=31002122;//kernel.BaseActor:2122
      //$LASTPOS=31002126;//kernel.BaseActor:2126
      updateCount = 0;
      for (; updateCount<updateT ; updateCount++) {
        {
          //$LASTPOS=31002189;//kernel.BaseActor:2189
          _this.update();
        }
      }
    },
    fiber$updateEx :function _trc_BaseActor_f_updateEx(_thread,updateT) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var updateCount;
      
      
      _thread.enter(function _trc_BaseActor_ent_updateEx(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=31002122;//kernel.BaseActor:2122
            //$LASTPOS=31002126;//kernel.BaseActor:2126
            updateCount = 0;
            
          case 1:
            if (!(updateCount<updateT)) { __pc=4     ; break; }
            //$LASTPOS=31002189;//kernel.BaseActor:2189
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
          case 3     :
            updateCount++;
            __pc=1;break;
          case 4     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getkey :function _trc_BaseActor_getkey(k) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$Keys.getkey(k);
    },
    hitTo :function _trc_BaseActor_hitTo(t) {
      "use strict";
      var _this=this;
      
      return _this.crashTo(t);
    },
    all :function _trc_BaseActor_all(c) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=31002400;//kernel.BaseActor:2400
      res = new Tonyu.classes.kernel.TQuery(_this);
      
      //$LASTPOS=31002431;//kernel.BaseActor:2431
      if (arguments.length>0&&typeof  c!="function") {
        return res;
        
      }
      //$LASTPOS=31002514;//kernel.BaseActor:2514
      _this.layer.sprites.forEach((function anonymous_2536(s) {
        
        //$LASTPOS=31002552;//kernel.BaseActor:2552
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=31002583;//kernel.BaseActor:2583
        if (! c||s instanceof c) {
          //$LASTPOS=31002624;//kernel.BaseActor:2624
          res.push(s);
          
        }
      }));
      return res;
    },
    allCrash :function _trc_BaseActor_allCrash(t) {
      "use strict";
      var _this=this;
      var res;
      var sp;
      var t1;
      
      //$LASTPOS=31002704;//kernel.BaseActor:2704
      res = new Tonyu.classes.kernel.TQuery(_this);
      
      //$LASTPOS=31002735;//kernel.BaseActor:2735
      sp = _this;
      
      //$LASTPOS=31002772;//kernel.BaseActor:2772
      t1 = _this.getCrashRect();
      
      //$LASTPOS=31002800;//kernel.BaseActor:2800
      if (! t1) {
        return res;
      }
      //$LASTPOS=31002826;//kernel.BaseActor:2826
      _this.layer.sprites.forEach((function anonymous_2848(s) {
        var t2;
        
        
        //$LASTPOS=31002881;//kernel.BaseActor:2881
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
          //$LASTPOS=31003107;//kernel.BaseActor:3107
          res.push(s);
          
        }
      }));
      return res;
    },
    crashTo :function _trc_BaseActor_crashTo(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31003187;//kernel.BaseActor:3187
      if (! t) {
        return false;
      }
      //$LASTPOS=31003214;//kernel.BaseActor:3214
      if (typeof  t=="function") {
        return _this.allCrash(t)[0];
        
      }
      return _this.crashTo1(t);
    },
    crashTo1 :function _trc_BaseActor_crashTo1(t) {
      "use strict";
      var _this=this;
      var t1;
      var t2;
      
      //$LASTPOS=31003337;//kernel.BaseActor:3337
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=31003377;//kernel.BaseActor:3377
      t1 = _this.getCrashRect();
      
      //$LASTPOS=31003405;//kernel.BaseActor:3405
      t2 = t.getCrashRect();
      
      return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
    },
    crashToChecker :function _trc_BaseActor_crashToChecker(d,f) {
      "use strict";
      var _this=this;
      var obj;
      var _it_248;
      
      //$LASTPOS=31003714;//kernel.BaseActor:3714
      while (true) {
        //$LASTPOS=31003736;//kernel.BaseActor:3736
        if (typeof  d=="function") {
          //$LASTPOS=31003775;//kernel.BaseActor:3775
          _it_248=Tonyu.iterator(_this.allCrash(d),1);
          while(_it_248.next()) {
            obj=_it_248[0];
            
            //$LASTPOS=31003817;//kernel.BaseActor:3817
            _this.callEventHandler(f,[obj]);
            
          }
          
        } else {
          //$LASTPOS=31003874;//kernel.BaseActor:3874
          if (_this.crashTo(d)) {
            //$LASTPOS=31003903;//kernel.BaseActor:3903
            _this.callEventHandler(f,[d]);
            
          }
        }
        //$LASTPOS=31003948;//kernel.BaseActor:3948
        _this.update();
        
      }
    },
    fiber$crashToChecker :function _trc_BaseActor_f_crashToChecker(_thread,d,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_248;
      
      
      _thread.enter(function _trc_BaseActor_ent_crashToChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=31003714;//kernel.BaseActor:3714
          case 1:
            //$LASTPOS=31003736;//kernel.BaseActor:3736
            if (!(typeof  d=="function")) { __pc=5     ; break; }
            //$LASTPOS=31003775;//kernel.BaseActor:3775
            _it_248=Tonyu.iterator(_this.allCrash(d),1);
          case 2:
            if (!(_it_248.next())) { __pc=4     ; break; }
            obj=_it_248[0];
            
            //$LASTPOS=31003817;//kernel.BaseActor:3817
            _this.fiber$callEventHandler(_thread, f, [obj]);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4     :
            
            __pc=8     ;break;
          case 5     :
            //$LASTPOS=31003874;//kernel.BaseActor:3874
            if (!(_this.crashTo(d))) { __pc=7     ; break; }
            //$LASTPOS=31003903;//kernel.BaseActor:3903
            _this.fiber$callEventHandler(_thread, f, [d]);
            __pc=6;return;
          case 6:
            
          case 7     :
            
          case 8     :
            
            //$LASTPOS=31003948;//kernel.BaseActor:3948
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            __pc=1;break;
          case 10    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getCrashRect :function _trc_BaseActor_getCrashRect() {
      "use strict";
      var _this=this;
      var actWidth;
      var actHeight;
      
      //$LASTPOS=31003999;//kernel.BaseActor:3999
      actWidth = (_this.width||_this.radius*2)*_this.scaleX*_this.crashScale;
      
      //$LASTPOS=31004065;//kernel.BaseActor:4065
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=31004107;//kernel.BaseActor:4107
        actHeight=(_this.height||_this.radius*2)*_this.scaleX*_this.crashScale;
        
      } else {
        //$LASTPOS=31004176;//kernel.BaseActor:4176
        actHeight=(_this.height||_this.radius*2)*_this.scaleY*_this.crashScale;
        
      }
      return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  actWidth=="number"&&typeof  actHeight=="number"&&{x: _this.x,y: _this.y,width: Math.abs(actWidth),height: Math.abs(actHeight)};
    },
    allWithin :function _trc_BaseActor_allWithin(t,distance) {
      "use strict";
      var _this=this;
      var res;
      var sp;
      var t1;
      
      //$LASTPOS=31004466;//kernel.BaseActor:4466
      res = new Tonyu.classes.kernel.TQuery(_this);
      
      //$LASTPOS=31004497;//kernel.BaseActor:4497
      sp = _this;
      
      //$LASTPOS=31004534;//kernel.BaseActor:4534
      t1 = _this.getCrashRect();
      
      //$LASTPOS=31004562;//kernel.BaseActor:4562
      if (! t1) {
        return res;
      }
      //$LASTPOS=31004588;//kernel.BaseActor:4588
      _this.layer.sprites.forEach((function anonymous_4610(s) {
        var t2;
        
        
        //$LASTPOS=31004643;//kernel.BaseActor:4643
        if (s!==_this&&! s.excludeFromAll&&s instanceof t&&Math.sqrt(Math.abs(_this.x-s.x)*Math.abs(_this.x-s.x)+Math.abs(_this.y-s.y)*Math.abs(_this.y-s.y))<distance) {
          //$LASTPOS=31004826;//kernel.BaseActor:4826
          res.push(s);
          
        }
      }));
      return res;
    },
    within :function _trc_BaseActor_within(t,distance) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31004913;//kernel.BaseActor:4913
      if (! t) {
        return false;
      }
      //$LASTPOS=31004939;//kernel.BaseActor:4939
      if (typeof  t=="function") {
        return _this.allWithin(t,distance)[0];
        
      }
      return _this.within1(t,distance);
    },
    within1 :function _trc_BaseActor_within1(t,distance) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31005085;//kernel.BaseActor:5085
      if (! t||t._isDead) {
        return false;
      }
      //$LASTPOS=31005124;//kernel.BaseActor:5124
      if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
        return true;
        
      }
      return false;
    },
    withinChecker :function _trc_BaseActor_withinChecker(d,r,f) {
      "use strict";
      var _this=this;
      var obj;
      var _it_258;
      
      //$LASTPOS=31005294;//kernel.BaseActor:5294
      while (true) {
        //$LASTPOS=31005316;//kernel.BaseActor:5316
        if (typeof  d=="function") {
          //$LASTPOS=31005355;//kernel.BaseActor:5355
          _it_258=Tonyu.iterator(_this.allWithin(d,r),1);
          while(_it_258.next()) {
            obj=_it_258[0];
            
            //$LASTPOS=31005429;//kernel.BaseActor:5429
            f(obj);
            
          }
          
        } else {
          //$LASTPOS=31005467;//kernel.BaseActor:5467
          if (_this.within(d,r)) {
            //$LASTPOS=31005497;//kernel.BaseActor:5497
            f(d);
            
          }
        }
        //$LASTPOS=31005523;//kernel.BaseActor:5523
        _this.update();
        
      }
    },
    fiber$withinChecker :function _trc_BaseActor_f_withinChecker(_thread,d,r,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var obj;
      var _it_258;
      
      
      _thread.enter(function _trc_BaseActor_ent_withinChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=31005294;//kernel.BaseActor:5294
          case 1:
            //$LASTPOS=31005316;//kernel.BaseActor:5316
            if (typeof  d=="function") {
              //$LASTPOS=31005355;//kernel.BaseActor:5355
              _it_258=Tonyu.iterator(_this.allWithin(d,r),1);
              while(_it_258.next()) {
                obj=_it_258[0];
                
                //$LASTPOS=31005429;//kernel.BaseActor:5429
                f(obj);
                
              }
              
            } else {
              //$LASTPOS=31005467;//kernel.BaseActor:5467
              if (_this.within(d,r)) {
                //$LASTPOS=31005497;//kernel.BaseActor:5497
                f(d);
                
              }
            }
            //$LASTPOS=31005523;//kernel.BaseActor:5523
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    watchHit :function _trc_BaseActor_watchHit(typeA,typeB,onHit) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31005587;//kernel.BaseActor:5587
      _this.layer.watchHit(typeA,typeB,(function anonymous_5617(a,b) {
        
        //$LASTPOS=31005635;//kernel.BaseActor:5635
        onHit.apply(_this,[a,b]);
      }));
    },
    currentThreadGroup :function _trc_BaseActor_currentThreadGroup() {
      "use strict";
      var _this=this;
      
      return _this._scheduler;
    },
    die :function _trc_BaseActor_die() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31005789;//kernel.BaseActor:5789
      _this.killThreadGroup();
      //$LASTPOS=31005813;//kernel.BaseActor:5813
      _this.hide();
      //$LASTPOS=31005826;//kernel.BaseActor:5826
      if (! _this._isDead) {
        //$LASTPOS=31005851;//kernel.BaseActor:5851
        _this.fireEvent("die");
        //$LASTPOS=31005878;//kernel.BaseActor:5878
        _this._isDead=true;
        //$LASTPOS=31005901;//kernel.BaseActor:5901
        if (_this._poolArray) {
          //$LASTPOS=31005932;//kernel.BaseActor:5932
          _this._poolArray.push(_this);
          //$LASTPOS=31005968;//kernel.BaseActor:5968
          _this.objectPoolAge=(_this.objectPoolAge||0)+1;
          
        }
        
      }
    },
    __setter__lifeKeeper :function _trc_BaseActor___setter__lifeKeeper(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31006047;//kernel.BaseActor:6047
      _this._lifeKeeper=v;
      //$LASTPOS=31006067;//kernel.BaseActor:6067
      if (v&&typeof  v.on==="function") {
        //$LASTPOS=31006113;//kernel.BaseActor:6113
        v.on("die",Tonyu.bindFunc(_this,_this.die));
        
      }
    },
    __getter__lifeKeeper :function _trc_BaseActor___getter__lifeKeeper() {
      "use strict";
      var _this=this;
      
      return _this._lifeKeeper;
    },
    hide :function _trc_BaseActor_hide() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31006206;//kernel.BaseActor:6206
      _this.layer.remove(_this);
    },
    show :function _trc_BaseActor_show(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31006257;//kernel.BaseActor:6257
      _this.layer.add(_this);
      //$LASTPOS=31006279;//kernel.BaseActor:6279
      if (x!=null) {
        //$LASTPOS=31006292;//kernel.BaseActor:6292
        _this.x=x;
      }
      //$LASTPOS=31006307;//kernel.BaseActor:6307
      if (y!=null) {
        //$LASTPOS=31006320;//kernel.BaseActor:6320
        _this.y=y;
      }
      //$LASTPOS=31006335;//kernel.BaseActor:6335
      if (p!=null) {
        //$LASTPOS=31006348;//kernel.BaseActor:6348
        _this.p=p;
      }
    },
    detectShape :function _trc_BaseActor_detectShape() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31006393;//kernel.BaseActor:6393
      if (typeof  _this.p!="number") {
        //$LASTPOS=31006428;//kernel.BaseActor:6428
        _this.p=0;
        
      }
      //$LASTPOS=31006445;//kernel.BaseActor:6445
      _this.p=Math.floor(_this.p);
      //$LASTPOS=31006467;//kernel.BaseActor:6467
      _this.pImg=Tonyu.globals.$imageList[_this.p];
      //$LASTPOS=31006492;//kernel.BaseActor:6492
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=31006516;//kernel.BaseActor:6516
      _this.width=_this.pImg.width;
      //$LASTPOS=31006539;//kernel.BaseActor:6539
      _this.height=_this.pImg.height;
    },
    isDead :function _trc_BaseActor_isDead() {
      "use strict";
      var _this=this;
      
      return _this._isDead;
    },
    _animation :function _trc_BaseActor__animation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31006636;//kernel.BaseActor:6636
      _this.age++;
      //$LASTPOS=31006648;//kernel.BaseActor:6648
      if (_this.animMode&&_this.age%_this.animFps==0) {
        //$LASTPOS=31006689;//kernel.BaseActor:6689
        _this.p=_this.anim[_this.animFrame%_this.anim.length];
        //$LASTPOS=31006729;//kernel.BaseActor:6729
        _this.animFrame++;
        
      }
    },
    performTransform :function _trc_BaseActor_performTransform(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31006790;//kernel.BaseActor:6790
      if (_this.x!==_this.x||_this.y!==_this.y||_this.x==null||_this.y==null) {
        
        
      }
      //$LASTPOS=31006919;//kernel.BaseActor:6919
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=31006944;//kernel.BaseActor:6944
      if (_this.rotation!=0) {
        //$LASTPOS=31006975;//kernel.BaseActor:6975
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=31007035;//kernel.BaseActor:7035
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=31007084;//kernel.BaseActor:7084
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=31007132;//kernel.BaseActor:7132
        ctx.scale(_this.scaleX,_this.scaleX);
        
      } else {
        //$LASTPOS=31007189;//kernel.BaseActor:7189
        ctx.scale(_this.scaleX,_this.scaleY);
        
      }
      //$LASTPOS=31007237;//kernel.BaseActor:7237
      ctx.globalAlpha=(_this.alpha<0?0:_this.alpha>255?255:_this.alpha)/255;
    },
    draw :function _trc_BaseActor_draw(ctx) {
      "use strict";
      var _this=this;
      var splitsText;
      var textCount;
      var rect;
      
      //$LASTPOS=31007319;//kernel.BaseActor:7319
      if (_this.x==null||_this.y==null||_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=31007372;//kernel.BaseActor:7372
      if (_this.text!=null) {
        //$LASTPOS=31007399;//kernel.BaseActor:7399
        splitsText = (_this.text+"").split("\n");
        
        //$LASTPOS=31007446;//kernel.BaseActor:7446
        _this.drawY=_this.y;
        //$LASTPOS=31007464;//kernel.BaseActor:7464
        if (! _this.size) {
          //$LASTPOS=31007475;//kernel.BaseActor:7475
          _this.size=15;
        }
        //$LASTPOS=31007493;//kernel.BaseActor:7493
        if (! _this.align) {
          //$LASTPOS=31007505;//kernel.BaseActor:7505
          _this.align="center";
        }
        //$LASTPOS=31007530;//kernel.BaseActor:7530
        if (! _this.fillStyle) {
          //$LASTPOS=31007546;//kernel.BaseActor:7546
          _this.fillStyle="white";
        }
        //$LASTPOS=31007574;//kernel.BaseActor:7574
        if (_this.font) {
          //$LASTPOS=31007584;//kernel.BaseActor:7584
          ctx.font=_this.size+"px "+_this.font;
        }
        //$LASTPOS=31007619;//kernel.BaseActor:7619
        ctx.fillStyle=_this.fillStyle;
        //$LASTPOS=31007653;//kernel.BaseActor:7653
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=31007694;//kernel.BaseActor:7694
        _this.height=0;
        //$LASTPOS=31007703;//kernel.BaseActor:7703
        _this.width=0;
        //$LASTPOS=31007721;//kernel.BaseActor:7721
        //$LASTPOS=31007725;//kernel.BaseActor:7725
        textCount = 0;
        for (; textCount<splitsText.length ; textCount++) {
          {
            //$LASTPOS=31007796;//kernel.BaseActor:7796
            rect = _this.drawTextRect(ctx,splitsText[textCount],_this.x,_this.drawY,_this.size,_this.align,"fill");
            
            //$LASTPOS=31007892;//kernel.BaseActor:7892
            if (_this.width<rect.w) {
              //$LASTPOS=31007909;//kernel.BaseActor:7909
              _this.width=rect.w;
            }
            //$LASTPOS=31007936;//kernel.BaseActor:7936
            _this.height+=rect.h;
            //$LASTPOS=31007965;//kernel.BaseActor:7965
            _this.drawY+=_this.size;
          }
        }
        
      } else {
        //$LASTPOS=31008001;//kernel.BaseActor:8001
        if (_this.fillStyle!=null) {
          //$LASTPOS=31008033;//kernel.BaseActor:8033
          ctx.save();
          //$LASTPOS=31008054;//kernel.BaseActor:8054
          _this.performTransform(ctx);
          //$LASTPOS=31008086;//kernel.BaseActor:8086
          ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=31008120;//kernel.BaseActor:8120
          if (_this.radius) {
            //$LASTPOS=31008147;//kernel.BaseActor:8147
            ctx.beginPath();
            //$LASTPOS=31008177;//kernel.BaseActor:8177
            ctx.arc(0,0,_this.radius,0,2*Math.PI);
            //$LASTPOS=31008223;//kernel.BaseActor:8223
            ctx.fill();
            
          } else {
            //$LASTPOS=31008266;//kernel.BaseActor:8266
            ctx.fillRect(- _this.width/2,- _this.height/2,_this.width,_this.height);
            
          }
          //$LASTPOS=31008333;//kernel.BaseActor:8333
          ctx.restore();
          
        } else {
          //$LASTPOS=31008371;//kernel.BaseActor:8371
          _this.detectShape();
          //$LASTPOS=31008395;//kernel.BaseActor:8395
          if (_this.pImg) {
            //$LASTPOS=31008420;//kernel.BaseActor:8420
            _this._animation();
            //$LASTPOS=31008447;//kernel.BaseActor:8447
            ctx.save();
            //$LASTPOS=31008472;//kernel.BaseActor:8472
            _this.performTransform(ctx);
            //$LASTPOS=31008508;//kernel.BaseActor:8508
            ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
            //$LASTPOS=31008652;//kernel.BaseActor:8652
            ctx.restore();
            
          }
          
        }
      }
      //$LASTPOS=31008690;//kernel.BaseActor:8690
      if (_this._fukidashi) {
        //$LASTPOS=31008717;//kernel.BaseActor:8717
        if (_this._fukidashi.c>0) {
          //$LASTPOS=31008752;//kernel.BaseActor:8752
          _this._fukidashi.c--;
          //$LASTPOS=31008781;//kernel.BaseActor:8781
          ctx.fillStyle="white";
          //$LASTPOS=31008817;//kernel.BaseActor:8817
          ctx.strokeStyle="black";
          //$LASTPOS=31008855;//kernel.BaseActor:8855
          _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);
          
        }
        
      }
    },
    runAsync :function _trc_BaseActor_runAsync(f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31008983;//kernel.BaseActor:8983
      if (! null) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=31009055;//kernel.BaseActor:9055
      null.runAsync(f);
    },
    fiber$runAsync :function _trc_BaseActor_f_runAsync(_thread,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31008983;//kernel.BaseActor:8983
      if (! _thread) {
        throw new Error("runAsync should run in wait mode");
        
      }
      //$LASTPOS=31009055;//kernel.BaseActor:9055
      _thread.runAsync(f);
      
      _thread.retVal=_this;return;
    },
    screenOut :function _trc_BaseActor_screenOut(a) {
      "use strict";
      var _this=this;
      var cp;
      
      //$LASTPOS=31009137;//kernel.BaseActor:9137
      if (! a) {
        //$LASTPOS=31009145;//kernel.BaseActor:9145
        a=0;
      }
      //$LASTPOS=31009171;//kernel.BaseActor:9171
      cp = Tonyu.globals.$Screen.convert(_this,Tonyu.globals.$Screen);
      
      return _this.abs(_this.clamped(cp.x,- a,Tonyu.globals.$screenWidth+a))+_this.abs(_this.clamped(cp.y,- a,Tonyu.globals.$screenHeight+a));
    },
    fiber$screenOut :function _trc_BaseActor_f_screenOut(_thread,a) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cp;
      
      //$LASTPOS=31009137;//kernel.BaseActor:9137
      if (! a) {
        //$LASTPOS=31009145;//kernel.BaseActor:9145
        a=0;
      }
      //$LASTPOS=31009171;//kernel.BaseActor:9171
      cp = Tonyu.globals.$Screen.convert(_this,Tonyu.globals.$Screen);
      
      _thread.retVal=_this.abs(_this.clamped(cp.x,- a,Tonyu.globals.$screenWidth+a))+_this.abs(_this.clamped(cp.y,- a,Tonyu.globals.$screenHeight+a));return;
      
      
      _thread.retVal=_this;return;
    },
    screenOutChecker :function _trc_BaseActor_screenOutChecker(d,f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31009629;//kernel.BaseActor:9629
      while (true) {
        //$LASTPOS=31009651;//kernel.BaseActor:9651
        while (true) {
          //$LASTPOS=31009677;//kernel.BaseActor:9677
          if (_this.screenOut()>d) {
            //$LASTPOS=31009713;//kernel.BaseActor:9713
            f();
            break;
            
            
          }
          //$LASTPOS=31009770;//kernel.BaseActor:9770
          _this.update();
          
        }
        //$LASTPOS=31009800;//kernel.BaseActor:9800
        while (true) {
          //$LASTPOS=31009826;//kernel.BaseActor:9826
          if (_this.screenOut()<=d) {
            break;
            
            
          }
          //$LASTPOS=31009898;//kernel.BaseActor:9898
          _this.update();
          
        }
        //$LASTPOS=31009928;//kernel.BaseActor:9928
        _this.update();
        
      }
    },
    fiber$screenOutChecker :function _trc_BaseActor_f_screenOutChecker(_thread,d,f) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_BaseActor_ent_screenOutChecker(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=31009629;//kernel.BaseActor:9629
          case 1:
            //$LASTPOS=31009651;//kernel.BaseActor:9651
          case 2:
            //$LASTPOS=31009677;//kernel.BaseActor:9677
            if (!(_this.screenOut()>d)) { __pc=3     ; break; }
            //$LASTPOS=31009713;//kernel.BaseActor:9713
            f();
            __pc=5     ; break;
            
          case 3     :
            
            //$LASTPOS=31009770;//kernel.BaseActor:9770
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=2;break;
          case 5     :
            
            //$LASTPOS=31009800;//kernel.BaseActor:9800
          case 6:
            //$LASTPOS=31009826;//kernel.BaseActor:9826
            if (!(_this.screenOut()<=d)) { __pc=7     ; break; }
            __pc=9     ; break;
            
          case 7     :
            
            //$LASTPOS=31009898;//kernel.BaseActor:9898
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=6;break;
          case 9     :
            
            //$LASTPOS=31009928;//kernel.BaseActor:9928
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            __pc=1;break;
          case 11    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    file :function _trc_BaseActor_file(path) {
      "use strict";
      var _this=this;
      var d;
      var files;
      
      //$LASTPOS=31009968;//kernel.BaseActor:9968
      d = Tonyu.currentProject.getDir();
      
      //$LASTPOS=31010010;//kernel.BaseActor:10010
      files = d.rel("files/");
      
      return files.rel(path).setPolicy({topDir: d});
    },
    fiber$file :function _trc_BaseActor_f_file(_thread,path) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var d;
      var files;
      
      //$LASTPOS=31009968;//kernel.BaseActor:9968
      d = Tonyu.currentProject.getDir();
      
      //$LASTPOS=31010010;//kernel.BaseActor:10010
      files = d.rel("files/");
      
      _thread.retVal=files.rel(path).setPolicy({topDir: d});return;
      
      
      _thread.retVal=_this;return;
    },
    waitInputDevice :function _trc_BaseActor_waitInputDevice(fl) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31010119;//kernel.BaseActor:10119
      _this.runAsync((function anonymous_10128(f) {
        
        //$LASTPOS=31010143;//kernel.BaseActor:10143
        Tonyu.globals.$InputDevice.addOnetimeListener(f);
      }));
    },
    fiber$waitInputDevice :function _trc_BaseActor_f_waitInputDevice(_thread,fl) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_BaseActor_ent_waitInputDevice(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=31010119;//kernel.BaseActor:10119
            _this.fiber$runAsync(_thread, (function anonymous_10128(f) {
              
              //$LASTPOS=31010143;//kernel.BaseActor:10143
              Tonyu.globals.$InputDevice.addOnetimeListener(f);
            }));
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    color :function _trc_BaseActor_color(r,g,b) {
      "use strict";
      var _this=this;
      
      return "rgb("+[r,g,b].join(",")+")";
    },
    loadPage :function _trc_BaseActor_loadPage() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31010389;//kernel.BaseActor:10389
      Tonyu.globals.$Boot.loadPage.apply(Tonyu.globals.$Boot,arguments);
    },
    setVisible :function _trc_BaseActor_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31010514;//kernel.BaseActor:10514
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_BaseActor_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31010514;//kernel.BaseActor:10514
      _this._isInvisible=! v;
      
      _thread.retVal=_this;return;
    },
    __setter__useObjectPool :function _trc_BaseActor___setter__useObjectPool(value) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31010563;//kernel.BaseActor:10563
      if (value) {
        //$LASTPOS=31010585;//kernel.BaseActor:10585
        _this._poolArray=Tonyu.globals.$ObjectPool.poolList(_this.getClassInfo().fullName);
        
      }
    },
    appear :function _trc_BaseActor_appear(o,param) {
      "use strict";
      var _this=this;
      var p;
      var k;
      var _it_270;
      
      //$LASTPOS=31010678;//kernel.BaseActor:10678
      if (typeof  o=="function") {
        //$LASTPOS=31010715;//kernel.BaseActor:10715
        if (param) {
          //$LASTPOS=31010728;//kernel.BaseActor:10728
          param.layer=param.layer||_this.layer;
          
        }
        //$LASTPOS=31010771;//kernel.BaseActor:10771
        p = Tonyu.globals.$ObjectPool.withdraw(o.meta.fullName);
        
        //$LASTPOS=31010825;//kernel.BaseActor:10825
        if (p) {
          //$LASTPOS=31010844;//kernel.BaseActor:10844
          _it_270=Tonyu.iterator(Object.keys(p),1);
          while(_it_270.next()) {
            k=_it_270[0];
            
            //$LASTPOS=31010889;//kernel.BaseActor:10889
            if (k!="objectPoolAge") {
              //$LASTPOS=31010913;//kernel.BaseActor:10913
              delete p[k];
            }
            
          }
          //$LASTPOS=31010942;//kernel.BaseActor:10942
          o.call(p,param);
          return p;
          
        } else {
          return new o(param);
          
        }
        
      } else {
        return o;
        
      }
    },
    fiber$appear :function _trc_BaseActor_f_appear(_thread,o,param) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var p;
      var k;
      var _it_270;
      
      //$LASTPOS=31010678;//kernel.BaseActor:10678
      if (typeof  o=="function") {
        //$LASTPOS=31010715;//kernel.BaseActor:10715
        if (param) {
          //$LASTPOS=31010728;//kernel.BaseActor:10728
          param.layer=param.layer||_this.layer;
          
        }
        //$LASTPOS=31010771;//kernel.BaseActor:10771
        p = Tonyu.globals.$ObjectPool.withdraw(o.meta.fullName);
        
        //$LASTPOS=31010825;//kernel.BaseActor:10825
        if (p) {
          //$LASTPOS=31010844;//kernel.BaseActor:10844
          _it_270=Tonyu.iterator(Object.keys(p),1);
          while(_it_270.next()) {
            k=_it_270[0];
            
            //$LASTPOS=31010889;//kernel.BaseActor:10889
            if (k!="objectPoolAge") {
              //$LASTPOS=31010913;//kernel.BaseActor:10913
              delete p[k];
            }
            
          }
          //$LASTPOS=31010942;//kernel.BaseActor:10942
          o.call(p,param);
          _thread.retVal=p;return;
          
          
        } else {
          _thread.retVal=new o(param);return;
          
          
        }
        
      } else {
        _thread.retVal=o;return;
        
        
      }
      
      _thread.retVal=_this;return;
    },
    wait :function _trc_BaseActor_wait(t) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31011093;//kernel.BaseActor:11093
      if (null) {
        //$LASTPOS=31011116;//kernel.BaseActor:11116
        null.suspend();
        //$LASTPOS=31011144;//kernel.BaseActor:11144
        if (t) {
          //$LASTPOS=31011166;//kernel.BaseActor:11166
          null.waitCount=t;
          //$LASTPOS=31011200;//kernel.BaseActor:11200
          if (_this._scheduler) {
            //$LASTPOS=31011216;//kernel.BaseActor:11216
            _this._scheduler.addToNext(null);
          }
          
        }
        
      } else {
        //$LASTPOS=31011270;//kernel.BaseActor:11270
        if (_this._th) {
          //$LASTPOS=31011290;//kernel.BaseActor:11290
          if (t) {
            //$LASTPOS=31011312;//kernel.BaseActor:11312
            _this._th.waitCount=t;
            
          } else {
            //$LASTPOS=31011360;//kernel.BaseActor:11360
            if (_this._th.scheduled) {
              //$LASTPOS=31011379;//kernel.BaseActor:11379
              _this._th.scheduled.unschedule(_this._th);
            }
            
          }
          
        }
      }
    },
    fiber$wait :function _trc_BaseActor_f_wait(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=31011093;//kernel.BaseActor:11093
      if (_thread) {
        //$LASTPOS=31011116;//kernel.BaseActor:11116
        _thread.suspend();
        //$LASTPOS=31011144;//kernel.BaseActor:11144
        if (t) {
          //$LASTPOS=31011166;//kernel.BaseActor:11166
          _thread.waitCount=t;
          //$LASTPOS=31011200;//kernel.BaseActor:11200
          if (_this._scheduler) {
            //$LASTPOS=31011216;//kernel.BaseActor:11216
            _this._scheduler.addToNext(_thread);
          }
          
        }
        
      } else {
        //$LASTPOS=31011270;//kernel.BaseActor:11270
        if (_this._th) {
          //$LASTPOS=31011290;//kernel.BaseActor:11290
          if (t) {
            //$LASTPOS=31011312;//kernel.BaseActor:11312
            _this._th.waitCount=t;
            
          } else {
            //$LASTPOS=31011360;//kernel.BaseActor:11360
            if (_this._th.scheduled) {
              //$LASTPOS=31011379;//kernel.BaseActor:11379
              _this._th.scheduled.unschedule(_this._th);
            }
            
          }
          
        }
      }
      
      _thread.retVal=_this;return;
    },
    notify :function _trc_BaseActor_notify() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=31011456;//kernel.BaseActor:11456
      if (_this._th) {
        //$LASTPOS=31011476;//kernel.BaseActor:11476
        if (_this._th.scheduled) {
          //$LASTPOS=31011511;//kernel.BaseActor:11511
          _this._th.waitCount=0;
          
        } else {
          //$LASTPOS=31011559;//kernel.BaseActor:11559
          if (_this._scheduler) {
            //$LASTPOS=31011575;//kernel.BaseActor:11575
            _this._scheduler.addToCur(_this._th);
          }
          
        }
        
      }
    },
    findTouch :function _trc_BaseActor_findTouch(params) {
      "use strict";
      var _this=this;
      var r;
      var t;
      var _it_274;
      
      //$LASTPOS=31011656;//kernel.BaseActor:11656
      if (typeof  params==="number") {
        //$LASTPOS=31011686;//kernel.BaseActor:11686
        params={scale: params};
      }
      //$LASTPOS=31011714;//kernel.BaseActor:11714
      params=params||{};
      
      //$LASTPOS=31011750;//kernel.BaseActor:11750
      if (params.width&&params.height) {
        //$LASTPOS=31011796;//kernel.BaseActor:11796
        r={x: _this.x,y: _this.y,width: params.width,height: params.height};
        
      } else {
        //$LASTPOS=31011869;//kernel.BaseActor:11869
        params.scale=params.scale||2;
        //$LASTPOS=31011908;//kernel.BaseActor:11908
        r=_this.getCrashRect();
        //$LASTPOS=31011935;//kernel.BaseActor:11935
        if (! r) {
          return null;
        }
        //$LASTPOS=31011965;//kernel.BaseActor:11965
        r={x: _this.x,y: _this.y,width: r.width*params.scale,height: r.height*params.scale};
        
      }
      //$LASTPOS=31012094;//kernel.BaseActor:12094
      _it_274=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_274.next()) {
        t=_it_274[0];
        
        //$LASTPOS=31012129;//kernel.BaseActor:12129
        if (params.pickup||t.touched==1) {
          //$LASTPOS=31012179;//kernel.BaseActor:12179
          if (Math.abs(r.x-t.x)<r.width/2&&Math.abs(r.y-t.y)<r.height/2) {
            return t;
            
          }
          
        }
        
      }
    },
    timeStop :function _trc_BaseActor_timeStop() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$Boot.timeStop(_this);
    },
    fiber$timeStop :function _trc_BaseActor_f_timeStop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$Boot.timeStop(_this);return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__defaultLayer":{"nowait":true},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"crashToChecker":{"nowait":false},"getCrashRect":{"nowait":true},"allWithin":{"nowait":true},"within":{"nowait":true},"within1":{"nowait":true},"withinChecker":{"nowait":false},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"__setter__lifeKeeper":{"nowait":true},"__getter__lifeKeeper":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"isDead":{"nowait":true},"_animation":{"nowait":true},"performTransform":{"nowait":true},"draw":{"nowait":true},"runAsync":{"nowait":false},"screenOut":{"nowait":false},"screenOutChecker":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"color":{"nowait":true},"loadPage":{"nowait":true},"setVisible":{"nowait":false},"__setter__useObjectPool":{"nowait":true},"appear":{"nowait":false},"wait":{"nowait":false},"notify":{"nowait":true},"findTouch":{"nowait":true},"timeStop":{"nowait":false}},"fields":{"_scheduler":{},"_th":{},"layer":{},"defaultLayer":{},"crashScale":{},"position":{},"scaleX":{},"rotation":{},"alpha":{},"zOrder":{},"age":{},"anim":{},"animMode":{},"animFrame":{},"animFps":{},"splits":{},"width":{},"radius":{},"scaleY":{},"height":{},"_isDead":{},"_poolArray":{},"objectPoolAge":{},"_lifeKeeper":{},"p":{},"pImg":{},"_isInvisible":{},"text":{},"drawY":{},"size":{},"align":{},"fillStyle":{},"font":{},"_fukidashi":{},"getClassInfo":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.CrashToHandler',
  shortName: 'CrashToHandler',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.EventHandler,
  includes: [],
  methods: {
    main :function _trc_CrashToHandler_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_CrashToHandler_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    addListener :function _trc_CrashToHandler_addListener(d,f) {
      "use strict";
      var _this=this;
      var retThread;
      
      //$LASTPOS=32000049;//kernel.CrashToHandler:49
      retThread = _this.target.parallel("crashToChecker",d,_this.toListener(f));
      
      return {remove: (function anonymous_145() {
        
        //$LASTPOS=32000161;//kernel.CrashToHandler:161
        retThread.kill();
      })};
    },
    initialize :function _trc_CrashToHandler_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=32000221;//kernel.CrashToHandler:221
      Tonyu.classes.kernel.EventHandler.apply( _this, [param]);
      //$LASTPOS=32000240;//kernel.CrashToHandler:240
      _this.id=(Tonyu.globals.$idseq=(Tonyu.globals.$idseq||0)+1);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"addListener":{"nowait":true},"new":{"nowait":false}},"fields":{"id":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.NoviceActor',
  shortName: 'NoviceActor',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.BaseActor,
  includes: [],
  methods: {
    main :function _trc_NoviceActor_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_NoviceActor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    sleep :function _trc_NoviceActor_sleep(n) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000054;//kernel.NoviceActor:54
      if (! n) {
        //$LASTPOS=33000061;//kernel.NoviceActor:61
        n=1;
      }
      //$LASTPOS=33000071;//kernel.NoviceActor:71
      //$LASTPOS=33000075;//kernel.NoviceActor:75
      n;for (; n>0 ; n--) {
        //$LASTPOS=33000086;//kernel.NoviceActor:86
        _this.update();
      }
    },
    fiber$sleep :function _trc_NoviceActor_f_sleep(_thread,n) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33000054;//kernel.NoviceActor:54
      if (! n) {
        //$LASTPOS=33000061;//kernel.NoviceActor:61
        n=1;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_sleep(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33000071;//kernel.NoviceActor:71
            //$LASTPOS=33000075;//kernel.NoviceActor:75
            n;
          case 1:
            if (!(n>0)) { __pc=4     ; break; }
            //$LASTPOS=33000086;//kernel.NoviceActor:86
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
          case 3     :
            n--;
            __pc=1;break;
          case 4     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initSprite :function _trc_NoviceActor_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000121;//kernel.NoviceActor:121
      if (! _this._sprite) {
        //$LASTPOS=33000146;//kernel.NoviceActor:146
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=33000217;//kernel.NoviceActor:217
        Tonyu.globals.$Sprites.add(_this);
        
      }
    },
    fiber$initSprite :function _trc_NoviceActor_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33000121;//kernel.NoviceActor:121
      if (! _this._sprite) {
        //$LASTPOS=33000146;//kernel.NoviceActor:146
        _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
        //$LASTPOS=33000217;//kernel.NoviceActor:217
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.retVal=_this;return;
    },
    say :function _trc_NoviceActor_say(text,size) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000271;//kernel.NoviceActor:271
      if (! size) {
        //$LASTPOS=33000282;//kernel.NoviceActor:282
        size=15;
      }
      //$LASTPOS=33000296;//kernel.NoviceActor:296
      _this.initSprite();
      //$LASTPOS=33000315;//kernel.NoviceActor:315
      _this._sprite._fukidashi={text: text,size: size,c: 30};
    },
    fiber$say :function _trc_NoviceActor_f_say(_thread,text,size) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=33000271;//kernel.NoviceActor:271
      if (! size) {
        //$LASTPOS=33000282;//kernel.NoviceActor:282
        size=15;
      }
      
      _thread.enter(function _trc_NoviceActor_ent_say(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33000296;//kernel.NoviceActor:296
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=33000315;//kernel.NoviceActor:315
            _this._sprite._fukidashi={text: text,size: size,c: 30};
            _thread.exit(_this);return;
          }
        }
      });
    },
    sprite :function _trc_NoviceActor_sprite(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000390;//kernel.NoviceActor:390
      _this.go(x,y,p);
    },
    fiber$sprite :function _trc_NoviceActor_f_sprite(_thread,x,y,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_NoviceActor_ent_sprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33000390;//kernel.NoviceActor:390
            _this.fiber$go(_thread, x, y, p);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    show :function _trc_NoviceActor_show(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000425;//kernel.NoviceActor:425
      _this.go(x,y,p);
    },
    draw :function _trc_NoviceActor_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000465;//kernel.NoviceActor:465
      _this._sprite.draw(ctx);
    },
    getCrashRect :function _trc_NoviceActor_getCrashRect() {
      "use strict";
      var _this=this;
      
      return _this._sprite.getCrashRect();
    },
    go :function _trc_NoviceActor_go(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000564;//kernel.NoviceActor:564
      _this.initSprite();
      //$LASTPOS=33000583;//kernel.NoviceActor:583
      _this._sprite.x=x;
      //$LASTPOS=33000601;//kernel.NoviceActor:601
      _this._sprite.y=y;
      //$LASTPOS=33000619;//kernel.NoviceActor:619
      if (p!=null) {
        //$LASTPOS=33000632;//kernel.NoviceActor:632
        _this._sprite.p=p;
      }
    },
    fiber$go :function _trc_NoviceActor_f_go(_thread,x,y,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_NoviceActor_ent_go(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33000564;//kernel.NoviceActor:564
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=33000583;//kernel.NoviceActor:583
            _this._sprite.x=x;
            //$LASTPOS=33000601;//kernel.NoviceActor:601
            _this._sprite.y=y;
            //$LASTPOS=33000619;//kernel.NoviceActor:619
            if (p!=null) {
              //$LASTPOS=33000632;//kernel.NoviceActor:632
              _this._sprite.p=p;
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    change :function _trc_NoviceActor_change(p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=33000684;//kernel.NoviceActor:684
      _this.initSprite();
      //$LASTPOS=33000703;//kernel.NoviceActor:703
      _this._sprite.p=p;
    },
    fiber$change :function _trc_NoviceActor_f_change(_thread,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_NoviceActor_ent_change(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=33000684;//kernel.NoviceActor:684
            _this.fiber$initSprite(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=33000703;//kernel.NoviceActor:703
            _this._sprite.p=p;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"sleep":{"nowait":false},"initSprite":{"nowait":false},"say":{"nowait":false},"sprite":{"nowait":false},"show":{"nowait":true},"draw":{"nowait":true},"getCrashRect":{"nowait":true},"go":{"nowait":false},"change":{"nowait":false}},"fields":{"_sprite":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.PlayMod',
  shortName: 'PlayMod',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.BaseActor,
  includes: [],
  methods: {
    main :function _trc_PlayMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_PlayMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initMML :function _trc_PlayMod_initMML() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=34000045;//kernel.PlayMod:45
      if (_this.mmlInited) {
        return _this;
      }
      //$LASTPOS=34000073;//kernel.PlayMod:73
      _this.mmlInited=true;
      //$LASTPOS=34000094;//kernel.PlayMod:94
      Tonyu.globals.$currentProject.requestPlugin("timbre");
      //$LASTPOS=34000140;//kernel.PlayMod:140
      if (! Tonyu.globals.$MMLS) {
        //$LASTPOS=34000162;//kernel.PlayMod:162
        Tonyu.globals.$MMLS={};
        //$LASTPOS=34000180;//kernel.PlayMod:180
        Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
        //$LASTPOS=34000214;//kernel.PlayMod:214
        Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
        
      }
      //$LASTPOS=34000256;//kernel.PlayMod:256
      _this.on("die",(function anonymous_266() {
        
        //$LASTPOS=34000272;//kernel.PlayMod:272
        _this.play().stop();
      }));
    },
    releaseMML :function _trc_PlayMod_releaseMML() {
      "use strict";
      var _this=this;
      var k;
      var v;
      var _it_279;
      
      //$LASTPOS=34000322;//kernel.PlayMod:322
      if (Tonyu.globals.$MMLS) {
        //$LASTPOS=34000343;//kernel.PlayMod:343
        _it_279=Tonyu.iterator(Tonyu.globals.$MMLS,2);
        while(_it_279.next()) {
          k=_it_279[0];
          v=_it_279[1];
          
          //$LASTPOS=34000379;//kernel.PlayMod:379
          v.stop();
          
        }
        //$LASTPOS=34000407;//kernel.PlayMod:407
        Tonyu.globals.$MMLS=null;
        
      }
      //$LASTPOS=34000432;//kernel.PlayMod:432
      if (Tonyu.globals.$WaveTable) {
        //$LASTPOS=34000458;//kernel.PlayMod:458
        Tonyu.globals.$WaveTable.stop();
        //$LASTPOS=34000485;//kernel.PlayMod:485
        Tonyu.globals.$WaveTable=null;
        
      }
    },
    play :function _trc_PlayMod_play() {
      "use strict";
      var _this=this;
      var mmls;
      var i;
      
      //$LASTPOS=34000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=34000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=34000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=34000574;//kernel.PlayMod:574
      if (_this.isDead()||arguments.length==0) {
        return _this._mml;
      }
      //$LASTPOS=34000629;//kernel.PlayMod:629
      mmls = [];
      
      //$LASTPOS=34000647;//kernel.PlayMod:647
      //$LASTPOS=34000652;//kernel.PlayMod:652
      i = 0;
      for (; i<arguments.length ; i++) {
        {
          //$LASTPOS=34000697;//kernel.PlayMod:697
          mmls.push(arguments[i]);
        }
      }
      //$LASTPOS=34000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      //$LASTPOS=34000756;//kernel.PlayMod:756
      while (_this._mml.bufferCount()>2) {
        //$LASTPOS=34000796;//kernel.PlayMod:796
        _this.update();
        
      }
      return _this._mml;
    },
    fiber$play :function _trc_PlayMod_f_play(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var mmls;
      var i;
      
      //$LASTPOS=34000528;//kernel.PlayMod:528
      _this.initMML();
      //$LASTPOS=34000544;//kernel.PlayMod:544
      if (! _this._mml) {
        //$LASTPOS=34000555;//kernel.PlayMod:555
        _this._mml=new Tonyu.classes.kernel.MML;
      }
      //$LASTPOS=34000574;//kernel.PlayMod:574
      if (_this.isDead()||_arguments.length==0) {
        _thread.retVal=_this._mml;return;
        
      }
      //$LASTPOS=34000629;//kernel.PlayMod:629
      mmls = [];
      
      //$LASTPOS=34000647;//kernel.PlayMod:647
      //$LASTPOS=34000652;//kernel.PlayMod:652
      i = 0;
      for (; i<_arguments.length ; i++) {
        {
          //$LASTPOS=34000697;//kernel.PlayMod:697
          mmls.push(_arguments[i]);
        }
      }
      //$LASTPOS=34000734;//kernel.PlayMod:734
      _this._mml.play(mmls);
      
      _thread.enter(function _trc_PlayMod_ent_play(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=34000756;//kernel.PlayMod:756
          case 1:
            if (!(_this._mml.bufferCount()>2)) { __pc=3     ; break; }
            //$LASTPOS=34000796;//kernel.PlayMod:796
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this._mml);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    playSE :function _trc_PlayMod_playSE() {
      "use strict";
      var _this=this;
      var mml;
      var mmls;
      var i;
      
      //$LASTPOS=34000859;//kernel.PlayMod:859
      _this.initMML();
      //$LASTPOS=34000875;//kernel.PlayMod:875
      mml = new Tonyu.classes.kernel.MML;
      
      //$LASTPOS=34000897;//kernel.PlayMod:897
      mmls = [];
      
      //$LASTPOS=34000915;//kernel.PlayMod:915
      //$LASTPOS=34000920;//kernel.PlayMod:920
      i = 0;
      for (; i<arguments.length ; i++) {
        {
          //$LASTPOS=34000965;//kernel.PlayMod:965
          mmls.push(arguments[i]);
        }
      }
      //$LASTPOS=34001002;//kernel.PlayMod:1002
      mml.play(mmls);
      return mml;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initMML":{"nowait":true},"releaseMML":{"nowait":true},"play":{"nowait":false},"playSE":{"nowait":true}},"fields":{"mmlInited":{},"_mml":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.ParallelMod',
  shortName: 'ParallelMod',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.BaseActor,
  includes: [],
  methods: {
    main :function _trc_ParallelMod_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_ParallelMod_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    parallel :function _trc_ParallelMod_parallel() {
      "use strict";
      var _this=this;
      var args;
      var i;
      var name;
      var th;
      
      //$LASTPOS=35000049;//kernel.ParallelMod:49
      args = [];
      
      //$LASTPOS=35000068;//kernel.ParallelMod:68
      //$LASTPOS=35000073;//kernel.ParallelMod:73
      i = 1;
      for (; i<arguments.length ; i++) {
        {
          //$LASTPOS=35000119;//kernel.ParallelMod:119
          args.push(arguments[i]);
        }
      }
      //$LASTPOS=35000158;//kernel.ParallelMod:158
      name = arguments[0];
      
      
      //$LASTPOS=35000201;//kernel.ParallelMod:201
      th=Tonyu.globals.$Boot.schedule(_this,name,args);
      return th;
    },
    call :function _trc_ParallelMod_call() {
      "use strict";
      var _this=this;
      var a;
      var t;
      var n;
      var f;
      var ag2;
      
      //$LASTPOS=35000272;//kernel.ParallelMod:272
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      //$LASTPOS=35000309;//kernel.ParallelMod:309
      t = a.shift();
      
      //$LASTPOS=35000331;//kernel.ParallelMod:331
      n = a.shift();
      
      //$LASTPOS=35000353;//kernel.ParallelMod:353
      f = t["fiber$"+n];
      
      //$LASTPOS=35000379;//kernel.ParallelMod:379
      if (! f) {
        throw new Error("メソッド"+n+"が見つかりません");
        
        
      }
      //$LASTPOS=35000448;//kernel.ParallelMod:448
      ag2 = a.toArray();
      
      //$LASTPOS=35000474;//kernel.ParallelMod:474
      ag2.unshift(null);
      return f.apply(t,ag2);
    },
    fiber$call :function _trc_ParallelMod_f_call(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var t;
      var n;
      var f;
      var ag2;
      
      //$LASTPOS=35000272;//kernel.ParallelMod:272
      a = new Tonyu.classes.kernel.ArgParser(_arguments);
      
      //$LASTPOS=35000309;//kernel.ParallelMod:309
      t = a.shift();
      
      //$LASTPOS=35000331;//kernel.ParallelMod:331
      n = a.shift();
      
      //$LASTPOS=35000353;//kernel.ParallelMod:353
      f = t["fiber$"+n];
      
      //$LASTPOS=35000379;//kernel.ParallelMod:379
      if (! f) {
        throw new Error("メソッド"+n+"が見つかりません");
        
        
      }
      //$LASTPOS=35000448;//kernel.ParallelMod:448
      ag2 = a.toArray();
      
      //$LASTPOS=35000474;//kernel.ParallelMod:474
      ag2.unshift(_thread);
      _thread.retVal=f.apply(t,ag2);return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"parallel":{"nowait":true},"call":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.Actor',
  shortName: 'Actor',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.BaseActor,
  includes: [Tonyu.classes.kernel.PlayMod,Tonyu.classes.kernel.ParallelMod],
  methods: {
    main :function _trc_Actor_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Actor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Actor_initialize(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36000088;//kernel.Actor:88
      Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
      //$LASTPOS=36000107;//kernel.Actor:107
      if (Tonyu.runMode) {
        //$LASTPOS=36000126;//kernel.Actor:126
        _this.initSprite();
      }
    },
    initSprite :function _trc_Actor_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36000165;//kernel.Actor:165
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=36000217;//kernel.Actor:217
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=36000255;//kernel.Actor:255
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=36000287;//kernel.Actor:287
      _this.onAppear();
    },
    fiber$initSprite :function _trc_Actor_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36000165;//kernel.Actor:165
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=36000217;//kernel.Actor:217
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=36000255;//kernel.Actor:255
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_Actor_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=36000287;//kernel.Actor:287
            _this.fiber$onAppear(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    changeLayer :function _trc_Actor_changeLayer(l) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=36000326;//kernel.Actor:326
      if (typeof  l.add!=="function") {
        return _this;
      }
      //$LASTPOS=36000370;//kernel.Actor:370
      if (_this.layer) {
        //$LASTPOS=36000381;//kernel.Actor:381
        _this.layer.remove(_this);
      }
      //$LASTPOS=36000406;//kernel.Actor:406
      l.add(_this);
      //$LASTPOS=36000424;//kernel.Actor:424
      _this.layer=l;
    },
    fiber$changeLayer :function _trc_Actor_f_changeLayer(_thread,l) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=36000326;//kernel.Actor:326
      if (typeof  l.add!=="function") {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=36000370;//kernel.Actor:370
      if (_this.layer) {
        //$LASTPOS=36000381;//kernel.Actor:381
        _this.layer.remove(_this);
      }
      //$LASTPOS=36000406;//kernel.Actor:406
      l.add(_this);
      //$LASTPOS=36000424;//kernel.Actor:424
      _this.layer=l;
      
      _thread.retVal=_this;return;
    },
    onAppear :function _trc_Actor_onAppear() {
      "use strict";
      var _this=this;
      
    },
    fiber$onAppear :function _trc_Actor_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initSprite":{"nowait":false},"changeLayer":{"nowait":false},"onAppear":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.GameScreen',
  shortName: 'GameScreen',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_GameScreen_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_GameScreen_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_GameScreen_initialize(opt) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37000113;//kernel.GameScreen:113
      _this.extend(opt);
      //$LASTPOS=37000131;//kernel.GameScreen:131
      _this.resize(_this.width,_this.height);
      //$LASTPOS=37000159;//kernel.GameScreen:159
      _this.bgColor="rgb(20,80,180)";
      //$LASTPOS=37000195;//kernel.GameScreen:195
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_GameScreen_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=37000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=37000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=37000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=37000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
    },
    fiber$resize :function _trc_GameScreen_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37000260;//kernel.GameScreen:260
      _this.width=width;
      //$LASTPOS=37000283;//kernel.GameScreen:283
      _this.height=height;
      //$LASTPOS=37000308;//kernel.GameScreen:308
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=37000351;//kernel.GameScreen:351
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=37000387;//kernel.GameScreen:387
      _this.fireEvent("resize",width,height);
      
      _thread.retVal=_this;return;
    },
    setBounds :function _trc_GameScreen_setBounds(b) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37000622;//kernel.GameScreen:622
      _this.bounds=b;
    },
    fiber$setBounds :function _trc_GameScreen_f_setBounds(_thread,b) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37000622;//kernel.GameScreen:622
      _this.bounds=b;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameScreen_draw(cctx) {
      "use strict";
      var _this=this;
      var b;
      
      //$LASTPOS=37000655;//kernel.GameScreen:655
      b = _this.bounds;
      
      //$LASTPOS=37000674;//kernel.GameScreen:674
      _this.fillCanvas();
      //$LASTPOS=37000693;//kernel.GameScreen:693
      _this.sprites.draw(_this.buf[0]);
      //$LASTPOS=37000720;//kernel.GameScreen:720
      cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,b.left,b.top,b.width,b.height);
    },
    canvas2buf :function _trc_GameScreen_canvas2buf(point) {
      "use strict";
      var _this=this;
      var b;
      
      //$LASTPOS=37000859;//kernel.GameScreen:859
      b = _this.bounds;
      
      //$LASTPOS=37000878;//kernel.GameScreen:878
      if (! b) {
        return point;
      }
      return {x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};
    },
    fiber$canvas2buf :function _trc_GameScreen_f_canvas2buf(_thread,point) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b;
      
      //$LASTPOS=37000859;//kernel.GameScreen:859
      b = _this.bounds;
      
      //$LASTPOS=37000878;//kernel.GameScreen:878
      if (! b) {
        _thread.retVal=point;return;
        
      }
      _thread.retVal={x: (point.x-b.left)/b.width*_this.width,y: (point.y-b.top)/b.height*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_GameScreen_setBGColor(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37001016;//kernel.GameScreen:1016
      _this.bgColor=c;
    },
    fiber$setBGColor :function _trc_GameScreen_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37001016;//kernel.GameScreen:1016
      _this.bgColor=c;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_GameScreen_fillCanvas() {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=37001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      
      //$LASTPOS=37001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=37001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=37001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=37001213;//kernel.GameScreen:1213
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_GameScreen_f_fillCanvas(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=37001056;//kernel.GameScreen:1056
      ctx = _this.buf[0].getContext("2d");
      
      //$LASTPOS=37001094;//kernel.GameScreen:1094
      ctx.save();
      //$LASTPOS=37001111;//kernel.GameScreen:1111
      ctx.fillStyle=_this.bgColor;
      //$LASTPOS=37001139;//kernel.GameScreen:1139
      ctx.fillRect(0,0,_this.width,_this.height);
      //$LASTPOS=37001213;//kernel.GameScreen:1213
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_GameScreen_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=37001265;//kernel.GameScreen:1265
      _this.sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_GameScreen_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=37001265;//kernel.GameScreen:1265
      _this.sprites.scrollTo(scrollX,scrollY);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"setBounds":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}},"fields":{"isDrawGrid":{},"buf":{},"ctx":{},"bounds":{},"sprites":{},"bgColor":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Map',
  shortName: 'Map',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Map_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Map_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Map_initialize(param) {
      "use strict";
      var _this=this;
      var j;
      var i;
      
      //$LASTPOS=38000060;//kernel.Map:60
      _this.sx=0;
      //$LASTPOS=38000071;//kernel.Map:71
      _this.sy=0;
      //$LASTPOS=38000082;//kernel.Map:82
      _this.alpha=255;
      //$LASTPOS=38000098;//kernel.Map:98
      Tonyu.classes.kernel.Actor.apply( _this, [param]);
      //$LASTPOS=38000117;//kernel.Map:117
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=38000189;//kernel.Map:189
      _this.mapObj=true;
      //$LASTPOS=38000207;//kernel.Map:207
      _this.mapTable=[];
      //$LASTPOS=38000227;//kernel.Map:227
      _this.mapOnTable=[];
      //$LASTPOS=38000249;//kernel.Map:249
      //$LASTPOS=38000253;//kernel.Map:253
      j = 0;
      for (; j<_this.row ; j++) {
        {
          //$LASTPOS=38000282;//kernel.Map:282
          _this.rows=[];
          //$LASTPOS=38000302;//kernel.Map:302
          //$LASTPOS=38000306;//kernel.Map:306
          i = 0;
          for (; i<_this.col ; i++) {
            {
              //$LASTPOS=38000339;//kernel.Map:339
              _this.rows.push(- 1);
            }
          }
          //$LASTPOS=38000374;//kernel.Map:374
          _this.mapTable.push(_this.rows);
        }
      }
      //$LASTPOS=38000407;//kernel.Map:407
      //$LASTPOS=38000411;//kernel.Map:411
      j = 0;
      for (; j<_this.row ; j++) {
        {
          //$LASTPOS=38000440;//kernel.Map:440
          _this.rows=[];
          //$LASTPOS=38000460;//kernel.Map:460
          //$LASTPOS=38000464;//kernel.Map:464
          i = 0;
          for (; i<_this.col ; i++) {
            {
              //$LASTPOS=38000497;//kernel.Map:497
              _this.rows.push(- 1);
            }
          }
          //$LASTPOS=38000532;//kernel.Map:532
          _this.mapOnTable.push(_this.rows);
        }
      }
      //$LASTPOS=38000632;//kernel.Map:632
      _this.initMap();
    },
    initMap :function _trc_Map_initMap() {
      "use strict";
      var _this=this;
      var i;
      var j;
      
      //$LASTPOS=38000664;//kernel.Map:664
      if (! _this.mapData) {
        return _this;
      }
      //$LASTPOS=38000690;//kernel.Map:690
      //$LASTPOS=38000694;//kernel.Map:694
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=38000723;//kernel.Map:723
          //$LASTPOS=38000727;//kernel.Map:727
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=38000760;//kernel.Map:760
              _this.set(j,i,_this.mapData[i][j]);
            }
          }
        }
      }
      //$LASTPOS=38000807;//kernel.Map:807
      if (! _this.mapOnData) {
        return _this;
      }
      //$LASTPOS=38000835;//kernel.Map:835
      //$LASTPOS=38000839;//kernel.Map:839
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=38000868;//kernel.Map:868
          //$LASTPOS=38000872;//kernel.Map:872
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=38000905;//kernel.Map:905
              _this.setOn(j,i,_this.mapOnData[i][j]);
            }
          }
        }
      }
    },
    fiber$initMap :function _trc_Map_f_initMap(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=38000664;//kernel.Map:664
      if (! _this.mapData) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_initMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38000690;//kernel.Map:690
            //$LASTPOS=38000694;//kernel.Map:694
            i = 0;
            
          case 1:
            if (!(i<_this.row)) { __pc=7     ; break; }
            //$LASTPOS=38000723;//kernel.Map:723
            //$LASTPOS=38000727;//kernel.Map:727
            j = 0;
            
          case 2:
            if (!(j<_this.col)) { __pc=5     ; break; }
            //$LASTPOS=38000760;//kernel.Map:760
            _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
            __pc=3;return;
          case 3:
            
          case 4     :
            j++;
            __pc=2;break;
          case 5     :
            
          case 6     :
            i++;
            __pc=1;break;
          case 7     :
            
            //$LASTPOS=38000807;//kernel.Map:807
            if (!(! _this.mapOnData)) { __pc=8     ; break; }
            _thread.exit(_this);return;
          case 8     :
            
            //$LASTPOS=38000835;//kernel.Map:835
            //$LASTPOS=38000839;//kernel.Map:839
            i = 0;
            
          case 9:
            if (!(i<_this.row)) { __pc=15    ; break; }
            //$LASTPOS=38000868;//kernel.Map:868
            //$LASTPOS=38000872;//kernel.Map:872
            j = 0;
            
          case 10:
            if (!(j<_this.col)) { __pc=13    ; break; }
            //$LASTPOS=38000905;//kernel.Map:905
            _this.fiber$setOn(_thread, j, i, _this.mapOnData[i][j]);
            __pc=11;return;
          case 11:
            
          case 12    :
            j++;
            __pc=10;break;
          case 13    :
            
          case 14    :
            i++;
            __pc=9;break;
          case 15    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    redrawMap :function _trc_Map_redrawMap() {
      "use strict";
      var _this=this;
      var i;
      var j;
      
      //$LASTPOS=38000974;//kernel.Map:974
      if (! _this.mapTable) {
        return _this;
      }
      //$LASTPOS=38001001;//kernel.Map:1001
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=38001073;//kernel.Map:1073
      //$LASTPOS=38001077;//kernel.Map:1077
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=38001106;//kernel.Map:1106
          //$LASTPOS=38001110;//kernel.Map:1110
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=38001143;//kernel.Map:1143
              _this.set(j,i,_this.mapTable[i][j]);
            }
          }
        }
      }
      //$LASTPOS=38001191;//kernel.Map:1191
      if (! _this.mapOnTable) {
        return _this;
      }
      //$LASTPOS=38001220;//kernel.Map:1220
      //$LASTPOS=38001224;//kernel.Map:1224
      i = 0;
      for (; i<_this.row ; i++) {
        {
          //$LASTPOS=38001253;//kernel.Map:1253
          //$LASTPOS=38001257;//kernel.Map:1257
          j = 0;
          for (; j<_this.col ; j++) {
            {
              //$LASTPOS=38001290;//kernel.Map:1290
              _this.setOn(j,i,_this.mapOnTable[i][j]);
            }
          }
        }
      }
    },
    fiber$redrawMap :function _trc_Map_f_redrawMap(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var j;
      
      //$LASTPOS=38000974;//kernel.Map:974
      if (! _this.mapTable) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=38001001;//kernel.Map:1001
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_redrawMap(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38001073;//kernel.Map:1073
            //$LASTPOS=38001077;//kernel.Map:1077
            i = 0;
            
          case 1:
            if (!(i<_this.row)) { __pc=7     ; break; }
            //$LASTPOS=38001106;//kernel.Map:1106
            //$LASTPOS=38001110;//kernel.Map:1110
            j = 0;
            
          case 2:
            if (!(j<_this.col)) { __pc=5     ; break; }
            //$LASTPOS=38001143;//kernel.Map:1143
            _this.fiber$set(_thread, j, i, _this.mapTable[i][j]);
            __pc=3;return;
          case 3:
            
          case 4     :
            j++;
            __pc=2;break;
          case 5     :
            
          case 6     :
            i++;
            __pc=1;break;
          case 7     :
            
            //$LASTPOS=38001191;//kernel.Map:1191
            if (!(! _this.mapOnTable)) { __pc=8     ; break; }
            _thread.exit(_this);return;
          case 8     :
            
            //$LASTPOS=38001220;//kernel.Map:1220
            //$LASTPOS=38001224;//kernel.Map:1224
            i = 0;
            
          case 9:
            if (!(i<_this.row)) { __pc=15    ; break; }
            //$LASTPOS=38001253;//kernel.Map:1253
            //$LASTPOS=38001257;//kernel.Map:1257
            j = 0;
            
          case 10:
            if (!(j<_this.col)) { __pc=13    ; break; }
            //$LASTPOS=38001290;//kernel.Map:1290
            _this.fiber$setOn(_thread, j, i, _this.mapOnTable[i][j]);
            __pc=11;return;
          case 11:
            
          case 12    :
            j++;
            __pc=10;break;
          case 13    :
            
          case 14    :
            i++;
            __pc=9;break;
          case 15    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    load :function _trc_Map_load(dataFile) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38001365;//kernel.Map:1365
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=38001417;//kernel.Map:1417
      if (! _this.baseData) {
        //$LASTPOS=38001431;//kernel.Map:1431
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=38001467;//kernel.Map:1467
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=38001494;//kernel.Map:1494
      _this.mapData=_this.mapTable;
      //$LASTPOS=38001517;//kernel.Map:1517
      _this.row=_this.mapTable.length;
      //$LASTPOS=38001543;//kernel.Map:1543
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=38001572;//kernel.Map:1572
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=38001601;//kernel.Map:1601
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=38001628;//kernel.Map:1628
      if (! _this.chipWidth&&typeof  _this.baseData[2]=="number") {
        //$LASTPOS=38001676;//kernel.Map:1676
        _this.chipWidth=_this.baseData[2];
      }
      //$LASTPOS=38001704;//kernel.Map:1704
      if (! _this.chipHeight&&typeof  _this.baseData[3]=="number") {
        //$LASTPOS=38001753;//kernel.Map:1753
        _this.chipHeight=_this.baseData[3];
      }
      //$LASTPOS=38001782;//kernel.Map:1782
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=38001854;//kernel.Map:1854
      _this.initMap();
    },
    fiber$load :function _trc_Map_f_load(_thread,dataFile) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38001365;//kernel.Map:1365
      _this.baseData=_this.file("../maps/").rel(dataFile).obj();
      //$LASTPOS=38001417;//kernel.Map:1417
      if (! _this.baseData) {
        //$LASTPOS=38001431;//kernel.Map:1431
        _this.baseData=_this.file(dataFile).obj();
      }
      //$LASTPOS=38001467;//kernel.Map:1467
      _this.mapTable=_this.baseData[0];
      //$LASTPOS=38001494;//kernel.Map:1494
      _this.mapData=_this.mapTable;
      //$LASTPOS=38001517;//kernel.Map:1517
      _this.row=_this.mapTable.length;
      //$LASTPOS=38001543;//kernel.Map:1543
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=38001572;//kernel.Map:1572
      _this.mapOnTable=_this.baseData[1];
      //$LASTPOS=38001601;//kernel.Map:1601
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=38001628;//kernel.Map:1628
      if (! _this.chipWidth&&typeof  _this.baseData[2]=="number") {
        //$LASTPOS=38001676;//kernel.Map:1676
        _this.chipWidth=_this.baseData[2];
      }
      //$LASTPOS=38001704;//kernel.Map:1704
      if (! _this.chipHeight&&typeof  _this.baseData[3]=="number") {
        //$LASTPOS=38001753;//kernel.Map:1753
        _this.chipHeight=_this.baseData[3];
      }
      //$LASTPOS=38001782;//kernel.Map:1782
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      
      _thread.enter(function _trc_Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38001854;//kernel.Map:1854
            _this.fiber$initMap(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    save :function _trc_Map_save(saveFileName) {
      "use strict";
      var _this=this;
      var saveDataFile;
      var data;
      
      //$LASTPOS=38001896;//kernel.Map:1896
      saveDataFile = _this.file("../maps/").rel(saveFileName);
      
      //$LASTPOS=38001954;//kernel.Map:1954
      data = [_this.mapTable,_this.mapOnTable,_this.chipWidth,_this.chipHeight];
      
      //$LASTPOS=38002012;//kernel.Map:2012
      saveDataFile.obj(data);
    },
    fiber$save :function _trc_Map_f_save(_thread,saveFileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var saveDataFile;
      var data;
      
      //$LASTPOS=38001896;//kernel.Map:1896
      saveDataFile = _this.file("../maps/").rel(saveFileName);
      
      //$LASTPOS=38001954;//kernel.Map:1954
      data = [_this.mapTable,_this.mapOnTable,_this.chipWidth,_this.chipHeight];
      
      //$LASTPOS=38002012;//kernel.Map:2012
      saveDataFile.obj(data);
      
      _thread.retVal=_this;return;
    },
    set :function _trc_Map_set(setCol,setRow,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38002068;//kernel.Map:2068
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=38002136;//kernel.Map:2136
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=38002207;//kernel.Map:2207
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=38002241;//kernel.Map:2241
      p=Math.floor(p);
      //$LASTPOS=38002263;//kernel.Map:2263
      _this.pImg=Tonyu.globals.$imageList[p];
      //$LASTPOS=38002288;//kernel.Map:2288
      if (! _this.pImg) {
        //$LASTPOS=38002310;//kernel.Map:2310
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        return _this;
        
      }
      //$LASTPOS=38002411;//kernel.Map:2411
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=38002488;//kernel.Map:2488
      _this.ctx.save();
      //$LASTPOS=38002505;//kernel.Map:2505
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=38002649;//kernel.Map:2649
      _this.ctx.restore();
    },
    fiber$set :function _trc_Map_f_set(_thread,setCol,setRow,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38002068;//kernel.Map:2068
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=38002136;//kernel.Map:2136
      _this.mapTable[setRow][setCol]=p;
      //$LASTPOS=38002207;//kernel.Map:2207
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=38002241;//kernel.Map:2241
      p=Math.floor(p);
      //$LASTPOS=38002263;//kernel.Map:2263
      _this.pImg=Tonyu.globals.$imageList[p];
      //$LASTPOS=38002288;//kernel.Map:2288
      if (! _this.pImg) {
        //$LASTPOS=38002310;//kernel.Map:2310
        _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=38002411;//kernel.Map:2411
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=38002488;//kernel.Map:2488
      _this.ctx.save();
      //$LASTPOS=38002505;//kernel.Map:2505
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=38002649;//kernel.Map:2649
      _this.ctx.restore();
      
      _thread.retVal=_this;return;
    },
    setOn :function _trc_Map_setOn(setCol,setRow,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38002698;//kernel.Map:2698
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        return _this;
      }
      //$LASTPOS=38002766;//kernel.Map:2766
      _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
      //$LASTPOS=38002816;//kernel.Map:2816
      _this.mapOnTable[setRow][setCol]=p;
      //$LASTPOS=38002851;//kernel.Map:2851
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=38002885;//kernel.Map:2885
      p=Math.floor(p);
      //$LASTPOS=38002907;//kernel.Map:2907
      _this.pImg=Tonyu.globals.$imageList[p];
      //$LASTPOS=38002932;//kernel.Map:2932
      if (! _this.pImg) {
        return _this;
      }
      //$LASTPOS=38002956;//kernel.Map:2956
      _this.ctx.save();
      //$LASTPOS=38002973;//kernel.Map:2973
      _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      //$LASTPOS=38003117;//kernel.Map:3117
      _this.ctx.restore();
    },
    fiber$setOn :function _trc_Map_f_setOn(_thread,setCol,setRow,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38002698;//kernel.Map:2698
      if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Map_ent_setOn(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38002766;//kernel.Map:2766
            _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=38002816;//kernel.Map:2816
            _this.mapOnTable[setRow][setCol]=p;
            //$LASTPOS=38002851;//kernel.Map:2851
            _this.ctx=_this.buf[0].getContext("2d");
            //$LASTPOS=38002885;//kernel.Map:2885
            p=Math.floor(p);
            //$LASTPOS=38002907;//kernel.Map:2907
            _this.pImg=Tonyu.globals.$imageList[p];
            //$LASTPOS=38002932;//kernel.Map:2932
            if (!(! _this.pImg)) { __pc=2     ; break; }
            _thread.exit(_this);return;
          case 2     :
            
            //$LASTPOS=38002956;//kernel.Map:2956
            _this.ctx.save();
            //$LASTPOS=38002973;//kernel.Map:2973
            _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
            //$LASTPOS=38003117;//kernel.Map:3117
            _this.ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    setOnAt :function _trc_Map_setOnAt(setX,setY,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38003164;//kernel.Map:3164
      _this.setOn(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
    },
    fiber$setOnAt :function _trc_Map_f_setOnAt(_thread,setX,setY,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Map_ent_setOnAt(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38003164;//kernel.Map:3164
            _this.fiber$setOn(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setAt :function _trc_Map_setAt(setX,setY,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38003259;//kernel.Map:3259
      _this.set(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
    },
    fiber$setAt :function _trc_Map_f_setAt(_thread,setX,setY,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Map_ent_setAt(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=38003259;//kernel.Map:3259
            _this.fiber$set(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    get :function _trc_Map_get(getCol,getRow) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38003352;//kernel.Map:3352
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        return _this.mapTable[getRow][getCol];
      }
      return - 1;
    },
    fiber$get :function _trc_Map_f_get(_thread,getCol,getRow) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38003352;//kernel.Map:3352
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        _thread.retVal=_this.mapTable[getRow][getCol];return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    getAt :function _trc_Map_getAt(getX,getY) {
      "use strict";
      var _this=this;
      
      return _this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
    },
    fiber$getAt :function _trc_Map_f_getAt(_thread,getX,getY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
      
      
      _thread.retVal=_this;return;
    },
    getOn :function _trc_Map_getOn(getCol,getRow) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38003584;//kernel.Map:3584
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        return _this.mapOnTable[getRow][getCol];
      }
      return - 1;
    },
    fiber$getOn :function _trc_Map_f_getOn(_thread,getCol,getRow) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38003584;//kernel.Map:3584
      if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
        _thread.retVal=_this.mapOnTable[getRow][getCol];return;
        
      }
      _thread.retVal=- 1;return;
      
      
      _thread.retVal=_this;return;
    },
    getOnAt :function _trc_Map_getOnAt(getX,getY) {
      "use strict";
      var _this=this;
      
      return _this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
    },
    fiber$getOnAt :function _trc_Map_f_getOnAt(_thread,getX,getY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
      
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Map_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38003827;//kernel.Map:3827
      _this.sx=- scrollX;
      //$LASTPOS=38003845;//kernel.Map:3845
      _this.sy=- scrollY;
    },
    fiber$scrollTo :function _trc_Map_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=38003827;//kernel.Map:3827
      _this.sx=- scrollX;
      //$LASTPOS=38003845;//kernel.Map:3845
      _this.sy=- scrollY;
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Map_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=38003880;//kernel.Map:3880
      _this.pImg=_this.buf[0];
      //$LASTPOS=38003898;//kernel.Map:3898
      ctx.save();
      //$LASTPOS=38003915;//kernel.Map:3915
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=38003947;//kernel.Map:3947
      ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
      //$LASTPOS=38004059;//kernel.Map:4059
      ctx.restore();
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initMap":{"nowait":false},"redrawMap":{"nowait":false},"load":{"nowait":false},"save":{"nowait":false},"set":{"nowait":false},"setOn":{"nowait":false},"setOnAt":{"nowait":false},"setAt":{"nowait":false},"get":{"nowait":false},"getAt":{"nowait":false},"getOn":{"nowait":false},"getOnAt":{"nowait":false},"scrollTo":{"nowait":false},"draw":{"nowait":true}},"fields":{"sx":{},"sy":{},"buf":{},"col":{},"chipWidth":{},"row":{},"chipHeight":{},"mapObj":{},"mapTable":{},"mapOnTable":{},"rows":{},"mapData":{},"mapOnData":{},"baseData":{},"ctx":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Panel',
  shortName: 'Panel',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Panel_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Panel_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Panel_initialize(opt) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39000102;//kernel.Panel:102
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=39000171;//kernel.Panel:171
      if (_this.canvas) {
        //$LASTPOS=39000194;//kernel.Panel:194
        _this.width=_this.canvas.width;
        //$LASTPOS=39000223;//kernel.Panel:223
        _this.height=_this.canvas.height;
        //$LASTPOS=39000254;//kernel.Panel:254
        _this.parallel("watchResize");
        
      } else {
        //$LASTPOS=39000302;//kernel.Panel:302
        _this.setPanel(_this.width||Tonyu.globals.$screenWidth||465,_this.height||Tonyu.globals.$screenHeight||465);
        
      }
      //$LASTPOS=39000426;//kernel.Panel:426
      if (_this._fillStyle&&_this.canvas) {
        //$LASTPOS=39000452;//kernel.Panel:452
        _this.canvas.getContext("2d").fillStyle=_this._fillStyle;
      }
      //$LASTPOS=39000503;//kernel.Panel:503
      _this.x=_this.x||_this.width/2;
      //$LASTPOS=39000522;//kernel.Panel:522
      _this.y=_this.y||_this.height/2;
      //$LASTPOS=39000542;//kernel.Panel:542
      if (_this.align==null) {
        //$LASTPOS=39000558;//kernel.Panel:558
        _this.align="center";
      }
      //$LASTPOS=39000579;//kernel.Panel:579
      if (_this.alpha==null) {
        //$LASTPOS=39000595;//kernel.Panel:595
        _this.alpha=255;
      }
      //$LASTPOS=39000611;//kernel.Panel:611
      if (_this._drawn==null) {
        //$LASTPOS=39000628;//kernel.Panel:628
        _this._drawn=false;
      }
    },
    watchResize :function _trc_Panel_watchResize() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39000668;//kernel.Panel:668
      while (true) {
        //$LASTPOS=39000691;//kernel.Panel:691
        if (_this.width!=_this.canvas.width||_this.height!=_this.canvas.height) {
          //$LASTPOS=39000756;//kernel.Panel:756
          _this.width=_this.canvas.width;
          //$LASTPOS=39000775;//kernel.Panel:775
          _this.height=_this.canvas.height;
          //$LASTPOS=39000810;//kernel.Panel:810
          _this.fireEvent("resize",{width: _this.width,height: _this.height});
          
        }
        //$LASTPOS=39000866;//kernel.Panel:866
        _this.update();
        
      }
    },
    fiber$watchResize :function _trc_Panel_f_watchResize(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Panel_ent_watchResize(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39000668;//kernel.Panel:668
          case 1:
            //$LASTPOS=39000691;//kernel.Panel:691
            if (_this.width!=_this.canvas.width||_this.height!=_this.canvas.height) {
              //$LASTPOS=39000756;//kernel.Panel:756
              _this.width=_this.canvas.width;
              //$LASTPOS=39000775;//kernel.Panel:775
              _this.height=_this.canvas.height;
              //$LASTPOS=39000810;//kernel.Panel:810
              _this.fireEvent("resize",{width: _this.width,height: _this.height});
              
            }
            //$LASTPOS=39000866;//kernel.Panel:866
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setPanel :function _trc_Panel_setPanel(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39000946;//kernel.Panel:946
      _this.width=_this.trunc(width);
      //$LASTPOS=39000976;//kernel.Panel:976
      _this.height=_this.trunc(height);
      //$LASTPOS=39001008;//kernel.Panel:1008
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=39001051;//kernel.Panel:1051
      _this.canvas=_this.buf[0];
      //$LASTPOS=39001071;//kernel.Panel:1071
      _this.fireEvent("resize",{width: width,height: height,force: true});
    },
    fiber$setPanel :function _trc_Panel_f_setPanel(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39000946;//kernel.Panel:946
      _this.width=_this.trunc(width);
      //$LASTPOS=39000976;//kernel.Panel:976
      _this.height=_this.trunc(height);
      //$LASTPOS=39001008;//kernel.Panel:1008
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=39001051;//kernel.Panel:1051
      _this.canvas=_this.buf[0];
      //$LASTPOS=39001071;//kernel.Panel:1071
      _this.fireEvent("resize",{width: width,height: height,force: true});
      
      _thread.retVal=_this;return;
    },
    resize :function _trc_Panel_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39001150;//kernel.Panel:1150
      if (_this.width==width&&_this.height==height) {
        return _this;
      }
      //$LASTPOS=39001209;//kernel.Panel:1209
      _this.setPanel(width,height);
    },
    fiber$resize :function _trc_Panel_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39001150;//kernel.Panel:1150
      if (_this.width==width&&_this.height==height) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_Panel_ent_resize(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39001209;//kernel.Panel:1209
            _this.fiber$setPanel(_thread, width, height);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getContext :function _trc_Panel_getContext() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39001257;//kernel.Panel:1257
      _this._drawn=true;
      return _this.canvas.getContext("2d");
    },
    fiber$getContext :function _trc_Panel_f_getContext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39001257;//kernel.Panel:1257
      _this._drawn=true;
      _thread.retVal=_this.canvas.getContext("2d");return;
      
      
      _thread.retVal=_this;return;
    },
    __getter__context :function _trc_Panel___getter__context() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39001327;//kernel.Panel:1327
      _this._drawn=true;
      return _this.canvas.getContext("2d");
    },
    __getter__image :function _trc_Panel___getter__image() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39001395;//kernel.Panel:1395
      _this._drawn=true;
      return _this.canvas;
    },
    setFillStyle :function _trc_Panel_setFillStyle(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39001459;//kernel.Panel:1459
      _this.fillStyle=color;
    },
    fiber$setFillStyle :function _trc_Panel_f_setFillStyle(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39001459;//kernel.Panel:1459
      _this.fillStyle=color;
      
      _thread.retVal=_this;return;
    },
    __getter__fillStyle :function _trc_Panel___getter__fillStyle() {
      "use strict";
      var _this=this;
      
      return _this._fillStyle;
    },
    __setter__fillStyle :function _trc_Panel___setter__fillStyle(val) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39001543;//kernel.Panel:1543
      _this._fillStyle=val;
      //$LASTPOS=39001564;//kernel.Panel:1564
      if (! _this.canvas) {
        return _this;
      }
      //$LASTPOS=39001590;//kernel.Panel:1590
      _this.context.fillStyle=val;
    },
    __setter__strokeStyle :function _trc_Panel___setter__strokeStyle(val) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39001641;//kernel.Panel:1641
      _this.context.strokeStyle=val;
    },
    __setter__lineWidth :function _trc_Panel___setter__lineWidth(val) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39001692;//kernel.Panel:1692
      _this.context.lineWidth=val;
    },
    fillCircle :function _trc_Panel_fillCircle(x,y,r) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=39001745;//kernel.Panel:1745
      ctx = _this.context;
      
      //$LASTPOS=39001767;//kernel.Panel:1767
      ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=39001797;//kernel.Panel:1797
      ctx.beginPath();
      //$LASTPOS=39001819;//kernel.Panel:1819
      ctx.arc(x,y,r,0,2*Tonyu.globals.$Math.PI);
      //$LASTPOS=39001853;//kernel.Panel:1853
      ctx.closePath();
      //$LASTPOS=39001875;//kernel.Panel:1875
      ctx.fill();
    },
    fiber$fillCircle :function _trc_Panel_f_fillCircle(_thread,x,y,r) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=39001745;//kernel.Panel:1745
      ctx = _this.context;
      
      //$LASTPOS=39001767;//kernel.Panel:1767
      ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=39001797;//kernel.Panel:1797
      ctx.beginPath();
      //$LASTPOS=39001819;//kernel.Panel:1819
      ctx.arc(x,y,r,0,2*Tonyu.globals.$Math.PI);
      //$LASTPOS=39001853;//kernel.Panel:1853
      ctx.closePath();
      //$LASTPOS=39001875;//kernel.Panel:1875
      ctx.fill();
      
      _thread.retVal=_this;return;
    },
    fillRect :function _trc_Panel_fillRect(x,y,rectWidth,rectHeight) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=39001933;//kernel.Panel:1933
      ctx = _this.getContext();
      
      //$LASTPOS=39001960;//kernel.Panel:1960
      ctx.save();
      //$LASTPOS=39002027;//kernel.Panel:2027
      ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=39002057;//kernel.Panel:2057
      ctx.fillRect(x,y,rectWidth,rectHeight);
      //$LASTPOS=39002102;//kernel.Panel:2102
      ctx.restore();
    },
    fillText :function _trc_Panel_fillText(text,x,y,size,align) {
      "use strict";
      var _this=this;
      var ctx;
      var splits;
      var f;
      var colCount;
      
      //$LASTPOS=39002158;//kernel.Panel:2158
      ctx = _this.getContext();
      
      //$LASTPOS=39002185;//kernel.Panel:2185
      ctx.save();
      //$LASTPOS=39002202;//kernel.Panel:2202
      text=text+"";
      //$LASTPOS=39002221;//kernel.Panel:2221
      splits = text.split("\n");
      
      //$LASTPOS=39002307;//kernel.Panel:2307
      ctx.textAlign=align||"center";
      //$LASTPOS=39002346;//kernel.Panel:2346
      size=size||15;
      //$LASTPOS=39002366;//kernel.Panel:2366
      ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=39002396;//kernel.Panel:2396
      f = ctx.font.replace(/^[0-9\.]+/,"");
      
      //$LASTPOS=39002441;//kernel.Panel:2441
      ctx.font=size+f;
      //$LASTPOS=39002463;//kernel.Panel:2463
      //$LASTPOS=39002467;//kernel.Panel:2467
      colCount = 0;
      for (; colCount<splits.length ; colCount++) {
        {
          //$LASTPOS=39002527;//kernel.Panel:2527
          ctx.fillText(splits[colCount],x,y);
          //$LASTPOS=39002572;//kernel.Panel:2572
          y+=size;
        }
      }
      //$LASTPOS=39002593;//kernel.Panel:2593
      ctx.restore();
    },
    fiber$fillText :function _trc_Panel_f_fillText(_thread,text,x,y,size,align) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var splits;
      var f;
      var colCount;
      
      
      _thread.enter(function _trc_Panel_ent_fillText(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39002158;//kernel.Panel:2158
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=39002185;//kernel.Panel:2185
            ctx.save();
            //$LASTPOS=39002202;//kernel.Panel:2202
            text=text+"";
            //$LASTPOS=39002221;//kernel.Panel:2221
            splits = text.split("\n");
            
            //$LASTPOS=39002307;//kernel.Panel:2307
            ctx.textAlign=align||"center";
            //$LASTPOS=39002346;//kernel.Panel:2346
            size=size||15;
            //$LASTPOS=39002366;//kernel.Panel:2366
            ctx.fillStyle=_this.fillStyle;
            //$LASTPOS=39002396;//kernel.Panel:2396
            f = ctx.font.replace(/^[0-9\.]+/,"");
            
            //$LASTPOS=39002441;//kernel.Panel:2441
            ctx.font=size+f;
            //$LASTPOS=39002463;//kernel.Panel:2463
            //$LASTPOS=39002467;//kernel.Panel:2467
            colCount = 0;
            for (; colCount<splits.length ; colCount++) {
              {
                //$LASTPOS=39002527;//kernel.Panel:2527
                ctx.fillText(splits[colCount],x,y);
                //$LASTPOS=39002572;//kernel.Panel:2572
                y+=size;
              }
            }
            //$LASTPOS=39002593;//kernel.Panel:2593
            ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    clearRect :function _trc_Panel_clearRect(clearX,clearY,clearW,clearH) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=39002658;//kernel.Panel:2658
      ctx = _this.getContext();
      
      //$LASTPOS=39002685;//kernel.Panel:2685
      ctx.save();
      //$LASTPOS=39002702;//kernel.Panel:2702
      ctx.clearRect(clearX,clearY,clearW,clearH);
      //$LASTPOS=39002751;//kernel.Panel:2751
      ctx.restore();
    },
    fiber$clearRect :function _trc_Panel_f_clearRect(_thread,clearX,clearY,clearW,clearH) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      
      _thread.enter(function _trc_Panel_ent_clearRect(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39002658;//kernel.Panel:2658
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=39002685;//kernel.Panel:2685
            ctx.save();
            //$LASTPOS=39002702;//kernel.Panel:2702
            ctx.clearRect(clearX,clearY,clearW,clearH);
            //$LASTPOS=39002751;//kernel.Panel:2751
            ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    getPixel :function _trc_Panel_getPixel(getX,getY) {
      "use strict";
      var _this=this;
      var ctx;
      
      
      //$LASTPOS=39002811;//kernel.Panel:2811
      if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
        //$LASTPOS=39002909;//kernel.Panel:2909
        ctx=_this.getContext();
        //$LASTPOS=39002936;//kernel.Panel:2936
        _this.imagedata=ctx.getImageData(getX,getY,1,1);
        //$LASTPOS=39002988;//kernel.Panel:2988
        _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
        
      } else {
        //$LASTPOS=39003128;//kernel.Panel:3128
        _this.colordata=[0,0,0,0];
        
      }
      return (_this.colordata);
    },
    fiber$getPixel :function _trc_Panel_f_getPixel(_thread,getX,getY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      
      
      _thread.enter(function _trc_Panel_ent_getPixel(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39002811;//kernel.Panel:2811
            if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2     ; break; }
            //$LASTPOS=39002909;//kernel.Panel:2909
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=39002936;//kernel.Panel:2936
            _this.imagedata=ctx.getImageData(getX,getY,1,1);
            //$LASTPOS=39002988;//kernel.Panel:2988
            _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
            __pc=3     ;break;
          case 2     :
            {
              //$LASTPOS=39003128;//kernel.Panel:3128
              _this.colordata=[0,0,0,0];
            }
          case 3     :
            
            _thread.exit((_this.colordata));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    scroll :function _trc_Panel_scroll(scrollX,scrollY) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=39003215;//kernel.Panel:3215
      ctx = _this.getContext();
      
      //$LASTPOS=39003242;//kernel.Panel:3242
      ctx.save();
      //$LASTPOS=39003259;//kernel.Panel:3259
      _this.imagedata=ctx.getImageData(0,0,_this.width,_this.height);
      //$LASTPOS=39003320;//kernel.Panel:3320
      _this.clearRect(0,0,_this.width,_this.height);
      //$LASTPOS=39003354;//kernel.Panel:3354
      ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
      //$LASTPOS=39003406;//kernel.Panel:3406
      ctx.restore();
    },
    fiber$scroll :function _trc_Panel_f_scroll(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      
      _thread.enter(function _trc_Panel_ent_scroll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39003215;//kernel.Panel:3215
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            ctx=_thread.retVal;
            
            //$LASTPOS=39003242;//kernel.Panel:3242
            ctx.save();
            //$LASTPOS=39003259;//kernel.Panel:3259
            _this.imagedata=ctx.getImageData(0,0,_this.width,_this.height);
            //$LASTPOS=39003320;//kernel.Panel:3320
            _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=39003354;//kernel.Panel:3354
            ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
            //$LASTPOS=39003406;//kernel.Panel:3406
            ctx.restore();
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Panel_draw(ctx) {
      "use strict";
      var _this=this;
      var pImg;
      
      //$LASTPOS=39003442;//kernel.Panel:3442
      if (_this._drawn) {
        //$LASTPOS=39003463;//kernel.Panel:3463
        pImg = _this.canvas;
        
        //$LASTPOS=39003489;//kernel.Panel:3489
        ctx.save();
        //$LASTPOS=39003510;//kernel.Panel:3510
        if (_this.align=="left") {
          //$LASTPOS=39003542;//kernel.Panel:3542
          ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
          
        } else {
          //$LASTPOS=39003594;//kernel.Panel:3594
          if (_this.align=="center") {
            //$LASTPOS=39003628;//kernel.Panel:3628
            ctx.translate(_this.x,_this.y);
            
          } else {
            //$LASTPOS=39003663;//kernel.Panel:3663
            if (_this.align=="right") {
              //$LASTPOS=39003696;//kernel.Panel:3696
              ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
              
            }
          }
        }
        //$LASTPOS=39003753;//kernel.Panel:3753
        if (_this.rotation!=0) {
          //$LASTPOS=39003788;//kernel.Panel:3788
          ctx.rotate(_this.rotation/180*Math.PI);
          
        } else {
          //$LASTPOS=39003856;//kernel.Panel:3856
          ctx.rotate(_this.rotate/180*Math.PI);
          
        }
        //$LASTPOS=39003913;//kernel.Panel:3913
        if (typeof  _this.scaleY==="undefined") {
          //$LASTPOS=39003965;//kernel.Panel:3965
          ctx.scale(_this.scaleX,_this.scaleX);
          
        } else {
          //$LASTPOS=39004030;//kernel.Panel:4030
          ctx.scale(_this.scaleX,_this.scaleY);
          
        }
        //$LASTPOS=39004086;//kernel.Panel:4086
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=39004127;//kernel.Panel:4127
        ctx.drawImage(pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
        //$LASTPOS=39004231;//kernel.Panel:4231
        ctx.restore();
        
      }
    },
    drawSprite :function _trc_Panel_drawSprite(x,y,p,options) {
      "use strict";
      var _this=this;
      var pImg;
      var scaleX;
      var scaleY;
      var rotation;
      var ctx;
      
      //$LASTPOS=39004298;//kernel.Panel:4298
      pImg = Tonyu.globals.$imageList[p];
      
      //$LASTPOS=39004327;//kernel.Panel:4327
      if (options===true) {
        //$LASTPOS=39004347;//kernel.Panel:4347
        options={f: true};
      }
      //$LASTPOS=39004370;//kernel.Panel:4370
      options=options||{};
      //$LASTPOS=39004396;//kernel.Panel:4396
      scaleX = typeof  (options.scaleX)==="number"?options.scaleX:1;
      
      //$LASTPOS=39004465;//kernel.Panel:4465
      scaleY = typeof  (options.scaleY)==="number"?options.scaleY:scaleX;
      
      //$LASTPOS=39004539;//kernel.Panel:4539
      rotation = options.rotation||options.angle||0;
      
      //$LASTPOS=39004593;//kernel.Panel:4593
      ctx = _this.context;
      
      //$LASTPOS=39004615;//kernel.Panel:4615
      if (options.f) {
        //$LASTPOS=39004630;//kernel.Panel:4630
        scaleX*=- 1;
      }
      //$LASTPOS=39004649;//kernel.Panel:4649
      ctx.save();
      //$LASTPOS=39004666;//kernel.Panel:4666
      ctx.translate(x,y);
      //$LASTPOS=39004691;//kernel.Panel:4691
      ctx.rotate(rotation/180*Math.PI);
      //$LASTPOS=39004730;//kernel.Panel:4730
      ctx.scale(scaleX,scaleY);
      //$LASTPOS=39004761;//kernel.Panel:4761
      ctx.drawImage(pImg.image,pImg.x,pImg.y,pImg.width,pImg.height,- pImg.width/2,- pImg.height/2,pImg.width,pImg.height);
      //$LASTPOS=39004901;//kernel.Panel:4901
      ctx.restore();
    },
    copy :function _trc_Panel_copy() {
      "use strict";
      var _this=this;
      var sx;
      var sy;
      var sw;
      var sh;
      var dx;
      var dy;
      var dw;
      var dh;
      var a;
      var srcPanel;
      
      
      //$LASTPOS=39005139;//kernel.Panel:5139
      a = new Tonyu.classes.kernel.ArgParser(arguments);
      
      //$LASTPOS=39005176;//kernel.Panel:5176
      srcPanel = a.shift(Tonyu.classes.kernel.Panel)||_this;
      
      //$LASTPOS=39005218;//kernel.Panel:5218
      if (a.length<=4) {
        //$LASTPOS=39005246;//kernel.Panel:5246
        dx=a.shift();
        //$LASTPOS=39005269;//kernel.Panel:5269
        dy=a.shift();
        //$LASTPOS=39005292;//kernel.Panel:5292
        if (a.length==0) {
          //$LASTPOS=39005324;//kernel.Panel:5324
          _this.context.drawImage(srcPanel.image,dx,dy);
          
        } else {
          //$LASTPOS=39005397;//kernel.Panel:5397
          dw=a.shift();
          //$LASTPOS=39005424;//kernel.Panel:5424
          dh=a.shift();
          //$LASTPOS=39005451;//kernel.Panel:5451
          if (dw*dh!=0) {
            //$LASTPOS=39005484;//kernel.Panel:5484
            _this.context.drawImage(srcPanel.image,dx,dy,dw,dh);
            
          }
          
        }
        
      } else {
        //$LASTPOS=39005580;//kernel.Panel:5580
        sx=a.shift();
        //$LASTPOS=39005603;//kernel.Panel:5603
        sy=a.shift();
        //$LASTPOS=39005626;//kernel.Panel:5626
        sw=a.shift();
        //$LASTPOS=39005649;//kernel.Panel:5649
        sh=a.shift();
        //$LASTPOS=39005672;//kernel.Panel:5672
        dx=a.shift();
        //$LASTPOS=39005695;//kernel.Panel:5695
        dy=a.shift();
        //$LASTPOS=39005718;//kernel.Panel:5718
        dw=a.shift()||sw;
        //$LASTPOS=39005747;//kernel.Panel:5747
        dh=a.shift()||sh;
        //$LASTPOS=39005826;//kernel.Panel:5826
        if (sw*sh*dw*dh!=0) {
          //$LASTPOS=39005861;//kernel.Panel:5861
          _this.context.drawImage(srcPanel.image,sx,sy,sw,sh,dx,dy,dw,dh);
          
        }
        
      }
    },
    convert :function _trc_Panel_convert(obj,toLayer) {
      "use strict";
      var _this=this;
      var scaleY;
      var dx;
      var dy;
      var rt;
      var x;
      var y;
      
      //$LASTPOS=39005979;//kernel.Panel:5979
      if (toLayer==null) {
        //$LASTPOS=39005998;//kernel.Panel:5998
        toLayer=_this;
      }
      //$LASTPOS=39006017;//kernel.Panel:6017
      scaleY = _this.scaleY||_this.scaleX;
      
      //$LASTPOS=39006054;//kernel.Panel:6054
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      //$LASTPOS=39006109;//kernel.Panel:6109
      if (obj.layer===_this&&toLayer===_this.layer) {
        //$LASTPOS=39006161;//kernel.Panel:6161
        dx = obj.x-_this.width/2;
        
        //$LASTPOS=39006192;//kernel.Panel:6192
        dy = obj.y-_this.height/2;
        
        //$LASTPOS=39006224;//kernel.Panel:6224
        rt = _this.rotation;
        
        //$LASTPOS=39006422;//kernel.Panel:6422
        x = _this.x+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*_this.scaleX;
        
        //$LASTPOS=39006479;//kernel.Panel:6479
        y = _this.y+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*scaleY;
        
        return {x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: toLayer};
        
      } else {
        //$LASTPOS=39006666;//kernel.Panel:6666
        if (obj.layer===_this.layer&&toLayer===_this) {
          //$LASTPOS=39006718;//kernel.Panel:6718
          rt = - _this.rotation;
          
          //$LASTPOS=39006745;//kernel.Panel:6745
          dx = obj.x-(_this.x);
          
          //$LASTPOS=39006777;//kernel.Panel:6777
          dy = obj.y-(_this.y);
          
          //$LASTPOS=39007033;//kernel.Panel:7033
          x = _this.width/2+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/_this.scaleX;
          
          //$LASTPOS=39007093;//kernel.Panel:7093
          y = _this.height/2+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/scaleY;
          
          return {x: x,y: y,rotation: rt,scale: 1/_this.scaleX,layer: toLayer};
          
        } else {
          //$LASTPOS=39007284;//kernel.Panel:7284
          _this.print("no support",obj.layer,toLayer);
          throw new Error("not support");
          
          
        }
      }
    },
    fiber$convert :function _trc_Panel_f_convert(_thread,obj,toLayer) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var scaleY;
      var dx;
      var dy;
      var rt;
      var x;
      var y;
      
      //$LASTPOS=39005979;//kernel.Panel:5979
      if (toLayer==null) {
        //$LASTPOS=39005998;//kernel.Panel:5998
        toLayer=_this;
      }
      //$LASTPOS=39006017;//kernel.Panel:6017
      scaleY = _this.scaleY||_this.scaleX;
      
      //$LASTPOS=39006054;//kernel.Panel:6054
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      //$LASTPOS=39006109;//kernel.Panel:6109
      if (obj.layer===_this&&toLayer===_this.layer) {
        //$LASTPOS=39006161;//kernel.Panel:6161
        dx = obj.x-_this.width/2;
        
        //$LASTPOS=39006192;//kernel.Panel:6192
        dy = obj.y-_this.height/2;
        
        //$LASTPOS=39006224;//kernel.Panel:6224
        rt = _this.rotation;
        
        //$LASTPOS=39006422;//kernel.Panel:6422
        x = _this.x+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*_this.scaleX;
        
        //$LASTPOS=39006479;//kernel.Panel:6479
        y = _this.y+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*scaleY;
        
        _thread.retVal={x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: toLayer};return;
        
        
      } else {
        //$LASTPOS=39006666;//kernel.Panel:6666
        if (obj.layer===_this.layer&&toLayer===_this) {
          //$LASTPOS=39006718;//kernel.Panel:6718
          rt = - _this.rotation;
          
          //$LASTPOS=39006745;//kernel.Panel:6745
          dx = obj.x-(_this.x);
          
          //$LASTPOS=39006777;//kernel.Panel:6777
          dy = obj.y-(_this.y);
          
          //$LASTPOS=39007033;//kernel.Panel:7033
          x = _this.width/2+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/_this.scaleX;
          
          //$LASTPOS=39007093;//kernel.Panel:7093
          y = _this.height/2+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/scaleY;
          
          _thread.retVal={x: x,y: y,rotation: rt,scale: 1/_this.scaleX,layer: toLayer};return;
          
          
        } else {
          //$LASTPOS=39007284;//kernel.Panel:7284
          _this.print("no support",obj.layer,toLayer);
          throw new Error("not support");
          
          
        }
      }
      
      _thread.retVal=_this;return;
    },
    drawLine :function _trc_Panel_drawLine(x,y,dx,dy) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39007404;//kernel.Panel:7404
      if (dx==null&&dy==null) {
        //$LASTPOS=39007441;//kernel.Panel:7441
        if (x==null&&y==null) {
          //$LASTPOS=39007480;//kernel.Panel:7480
          _this.px=null;
          //$LASTPOS=39007488;//kernel.Panel:7488
          _this.py=null;
          return _this;
          
        }
        //$LASTPOS=39007524;//kernel.Panel:7524
        if (_this.px==null&&_this.py==null) {
          //$LASTPOS=39007565;//kernel.Panel:7565
          _this.px=x;
          //$LASTPOS=39007570;//kernel.Panel:7570
          _this.py=y;
          return _this;
          
        }
        //$LASTPOS=39007603;//kernel.Panel:7603
        dx=x;
        //$LASTPOS=39007608;//kernel.Panel:7608
        dy=y;
        //$LASTPOS=39007613;//kernel.Panel:7613
        x=_this.px;
        //$LASTPOS=39007618;//kernel.Panel:7618
        y=_this.py;
        //$LASTPOS=39007623;//kernel.Panel:7623
        _this.px=dx;
        //$LASTPOS=39007629;//kernel.Panel:7629
        _this.py=dy;
        
      }
      //$LASTPOS=39007648;//kernel.Panel:7648
      _this.context.beginPath();
      //$LASTPOS=39007674;//kernel.Panel:7674
      _this.context.moveTo(x,y);
      //$LASTPOS=39007700;//kernel.Panel:7700
      _this.context.lineTo(dx,dy);
      //$LASTPOS=39007728;//kernel.Panel:7728
      _this.context.stroke();
    },
    slicePattern :function _trc_Panel_slicePattern(x,y,width,height) {
      "use strict";
      var _this=this;
      
      return {image: _this.canvas,x: x,y: y,width: width,height: height};
    },
    fiber$slicePattern :function _trc_Panel_f_slicePattern(_thread,x,y,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal={image: _this.canvas,x: x,y: y,width: width,height: height};return;
      
      
      _thread.retVal=_this;return;
    },
    addPattern :function _trc_Panel_addPattern(x,y,width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=39007870;//kernel.Panel:7870
      Tonyu.globals.$imageList.push(_this.slicePattern(x,y,width,height));
      return Tonyu.globals.$imageList.length-1;
    },
    fiber$addPattern :function _trc_Panel_f_addPattern(_thread,x,y,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=39007870;//kernel.Panel:7870
      Tonyu.globals.$imageList.push(_this.slicePattern(x,y,width,height));
      _thread.retVal=Tonyu.globals.$imageList.length-1;return;
      
      
      _thread.retVal=_this;return;
    },
    getImageData :function _trc_Panel_getImageData(x,y,width,height) {
      "use strict";
      var _this=this;
      
      return _this.context.getImageData(x,y,width,height);
    },
    fiber$getImageData :function _trc_Panel_f_getImageData(_thread,x,y,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.context.getImageData(x,y,width,height);return;
      
      
      _thread.retVal=_this;return;
    },
    putImageData :function _trc_Panel_putImageData(data,x,y) {
      "use strict";
      var _this=this;
      
      return _this.context.putImageData(data,x,y);
    },
    fiber$putImageData :function _trc_Panel_f_putImageData(_thread,data,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.context.putImageData(data,x,y);return;
      
      
      _thread.retVal=_this;return;
    },
    replace :function _trc_Panel_replace(x,y,width,height,replacement) {
      "use strict";
      var _this=this;
      
    },
    fiber$replace :function _trc_Panel_f_replace(_thread,x,y,width,height,replacement) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    save :function _trc_Panel_save(fn) {
      "use strict";
      var _this=this;
      var url;
      
      //$LASTPOS=39008186;//kernel.Panel:8186
      url = _this.buf[0].toDataURL();
      
      //$LASTPOS=39008219;//kernel.Panel:8219
      if (typeof  fn==="string") {
        //$LASTPOS=39008245;//kernel.Panel:8245
        fn=_this.file(fn);
      }
      //$LASTPOS=39008263;//kernel.Panel:8263
      fn.text(url);
    },
    fiber$save :function _trc_Panel_f_save(_thread,fn) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var url;
      
      //$LASTPOS=39008186;//kernel.Panel:8186
      url = _this.buf[0].toDataURL();
      
      
      _thread.enter(function _trc_Panel_ent_save(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39008219;//kernel.Panel:8219
            if (!(typeof  fn==="string")) { __pc=2     ; break; }
            //$LASTPOS=39008245;//kernel.Panel:8245
            _this.fiber$file(_thread, fn);
            __pc=1;return;
          case 1:
            fn=_thread.retVal;
            
          case 2     :
            
            //$LASTPOS=39008263;//kernel.Panel:8263
            fn.text(url);
            _thread.exit(_this);return;
          }
        }
      });
    },
    load :function _trc_Panel_load(fn) {
      "use strict";
      var _this=this;
      var d;
      var url;
      var element;
      
      //$LASTPOS=39008300;//kernel.Panel:8300
      if (typeof  fn==="string") {
        //$LASTPOS=39008326;//kernel.Panel:8326
        fn=_this.file(fn);
      }
      //$LASTPOS=39008344;//kernel.Panel:8344
      d = new $.Deferred();
      
      //$LASTPOS=39008373;//kernel.Panel:8373
      url = fn.text();
      
      //$LASTPOS=39008397;//kernel.Panel:8397
      element = $("<img>").css({display: "none"}).appendTo("body");
      
      //$LASTPOS=39008463;//kernel.Panel:8463
      element.on("load",(function anonymous_8482() {
        var img;
        var width;
        var height;
        
        //$LASTPOS=39008494;//kernel.Panel:8494
        img = new Image();
        
        //$LASTPOS=39008526;//kernel.Panel:8526
        img.src=element.attr('src');
        //$LASTPOS=39008566;//kernel.Panel:8566
        width = img.width;
        
        //$LASTPOS=39008598;//kernel.Panel:8598
        height = img.height;
        
        //$LASTPOS=39008664;//kernel.Panel:8664
        _this.resize(width,height);
        //$LASTPOS=39008695;//kernel.Panel:8695
        _this.context.drawImage(img,0,0);
        //$LASTPOS=39008733;//kernel.Panel:8733
        d.resolve(_this);
      }));
      //$LASTPOS=39008763;//kernel.Panel:8763
      element.attr({src: url});
      return d.promise();
    },
    fiber$load :function _trc_Panel_f_load(_thread,fn) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var d;
      var url;
      var element;
      
      
      _thread.enter(function _trc_Panel_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=39008300;//kernel.Panel:8300
            if (!(typeof  fn==="string")) { __pc=2     ; break; }
            //$LASTPOS=39008326;//kernel.Panel:8326
            _this.fiber$file(_thread, fn);
            __pc=1;return;
          case 1:
            fn=_thread.retVal;
            
          case 2     :
            
            //$LASTPOS=39008344;//kernel.Panel:8344
            d = new $.Deferred();
            
            //$LASTPOS=39008373;//kernel.Panel:8373
            url = fn.text();
            
            //$LASTPOS=39008397;//kernel.Panel:8397
            element = $("<img>").css({display: "none"}).appendTo("body");
            
            //$LASTPOS=39008463;//kernel.Panel:8463
            element.on("load",(function anonymous_8482() {
              var img;
              var width;
              var height;
              
              //$LASTPOS=39008494;//kernel.Panel:8494
              img = new Image();
              
              //$LASTPOS=39008526;//kernel.Panel:8526
              img.src=element.attr('src');
              //$LASTPOS=39008566;//kernel.Panel:8566
              width = img.width;
              
              //$LASTPOS=39008598;//kernel.Panel:8598
              height = img.height;
              
              //$LASTPOS=39008664;//kernel.Panel:8664
              _this.resize(width,height);
              //$LASTPOS=39008695;//kernel.Panel:8695
              _this.context.drawImage(img,0,0);
              //$LASTPOS=39008733;//kernel.Panel:8733
              d.resolve(_this);
            }));
            //$LASTPOS=39008763;//kernel.Panel:8763
            element.attr({src: url});
            _thread.exit(d.promise());return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"watchResize":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"__getter__context":{"nowait":true},"__getter__image":{"nowait":true},"setFillStyle":{"nowait":false},"__getter__fillStyle":{"nowait":true},"__setter__fillStyle":{"nowait":true},"__setter__strokeStyle":{"nowait":true},"__setter__lineWidth":{"nowait":true},"fillCircle":{"nowait":false},"fillRect":{"nowait":true},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true},"drawSprite":{"nowait":true},"copy":{"nowait":true},"convert":{"nowait":false},"drawLine":{"nowait":true},"slicePattern":{"nowait":false},"addPattern":{"nowait":false},"getImageData":{"nowait":false},"putImageData":{"nowait":false},"replace":{"nowait":false},"save":{"nowait":false},"load":{"nowait":false}},"fields":{"canvas":{},"_fillStyle":{},"_drawn":{},"buf":{},"context":{},"imagedata":{},"colordata":{},"px":{},"py":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.ScaledCanvas',
  shortName: 'ScaledCanvas',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_ScaledCanvas_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_ScaledCanvas_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_ScaledCanvas_initialize(opt) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40000095;//kernel.ScaledCanvas:95
      _this.extend(opt);
      //$LASTPOS=40000142;//kernel.ScaledCanvas:142
      _this.resize(_this.width,_this.height);
      //$LASTPOS=40000170;//kernel.ScaledCanvas:170
      _this.cw=_this.canvas.width();
      //$LASTPOS=40000194;//kernel.ScaledCanvas:194
      _this.ch=_this.canvas.height();
      //$LASTPOS=40000219;//kernel.ScaledCanvas:219
      _this.cctx=_this.canvas[0].getContext("2d");
      //$LASTPOS=40000257;//kernel.ScaledCanvas:257
      _this._color="rgb(20,80,180)";
      //$LASTPOS=40000292;//kernel.ScaledCanvas:292
      _this.sx=0;
      //$LASTPOS=40000303;//kernel.ScaledCanvas:303
      _this.sy=0;
      //$LASTPOS=40000314;//kernel.ScaledCanvas:314
      _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
    },
    resize :function _trc_ScaledCanvas_resize(width,height) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40000379;//kernel.ScaledCanvas:379
      _this.width=width;
      //$LASTPOS=40000402;//kernel.ScaledCanvas:402
      _this.height=height;
      //$LASTPOS=40000427;//kernel.ScaledCanvas:427
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=40000470;//kernel.ScaledCanvas:470
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=40000506;//kernel.ScaledCanvas:506
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=40000531;//kernel.ScaledCanvas:531
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=40000558;//kernel.ScaledCanvas:558
      if (Tonyu.globals.$panel) {
        //$LASTPOS=40000579;//kernel.ScaledCanvas:579
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=40000633;//kernel.ScaledCanvas:633
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=40000667;//kernel.ScaledCanvas:667
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=40000705;//kernel.ScaledCanvas:705
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=40000733;//kernel.ScaledCanvas:733
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=40000794;//kernel.ScaledCanvas:794
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=40000835;//kernel.ScaledCanvas:835
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=40000877;//kernel.ScaledCanvas:877
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
    },
    fiber$resize :function _trc_ScaledCanvas_f_resize(_thread,width,height) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000379;//kernel.ScaledCanvas:379
      _this.width=width;
      //$LASTPOS=40000402;//kernel.ScaledCanvas:402
      _this.height=height;
      //$LASTPOS=40000427;//kernel.ScaledCanvas:427
      _this.buf=$("<canvas>").attr({width: width,height: height});
      //$LASTPOS=40000470;//kernel.ScaledCanvas:470
      _this.ctx=_this.buf[0].getContext("2d");
      //$LASTPOS=40000506;//kernel.ScaledCanvas:506
      Tonyu.globals.$screenWidth=width;
      //$LASTPOS=40000531;//kernel.ScaledCanvas:531
      Tonyu.globals.$screenHeight=height;
      //$LASTPOS=40000558;//kernel.ScaledCanvas:558
      if (Tonyu.globals.$panel) {
        //$LASTPOS=40000579;//kernel.ScaledCanvas:579
        Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=40000633;//kernel.ScaledCanvas:633
        Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=40000667;//kernel.ScaledCanvas:667
        Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
        
      }
      //$LASTPOS=40000705;//kernel.ScaledCanvas:705
      if (Tonyu.globals.$consolePanel) {
        //$LASTPOS=40000733;//kernel.ScaledCanvas:733
        Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
        //$LASTPOS=40000794;//kernel.ScaledCanvas:794
        Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=40000835;//kernel.ScaledCanvas:835
        Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=40000877;//kernel.ScaledCanvas:877
        Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
        
      }
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_ScaledCanvas_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=40000999;//kernel.ScaledCanvas:999
      larger = 200;
      
      //$LASTPOS=40001020;//kernel.ScaledCanvas:1020
      smaller = 5;
      
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_ScaledCanvas_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=40000999;//kernel.ScaledCanvas:999
      larger = 200;
      
      //$LASTPOS=40001020;//kernel.ScaledCanvas:1020
      smaller = 5;
      
      _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_ScaledCanvas_draw() {
      "use strict";
      var _this=this;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=40001155;//kernel.ScaledCanvas:1155
      _this.cw=_this.canvas.width();
      //$LASTPOS=40001179;//kernel.ScaledCanvas:1179
      _this.ch=_this.canvas.height();
      //$LASTPOS=40001204;//kernel.ScaledCanvas:1204
      calcw = _this.ch/_this.height*_this.width;
      
      //$LASTPOS=40001248;//kernel.ScaledCanvas:1248
      calch = _this.cw/_this.width*_this.height;
      
      //$LASTPOS=40001292;//kernel.ScaledCanvas:1292
      if (calch>_this.ch) {
        //$LASTPOS=40001306;//kernel.ScaledCanvas:1306
        calch=_this.ch;
      }
      //$LASTPOS=40001321;//kernel.ScaledCanvas:1321
      if (calcw>_this.cw) {
        //$LASTPOS=40001335;//kernel.ScaledCanvas:1335
        calcw=_this.cw;
      }
      //$LASTPOS=40001350;//kernel.ScaledCanvas:1350
      _this.cctx.clearRect(0,0,_this.cw,_this.ch);
      //$LASTPOS=40001382;//kernel.ScaledCanvas:1382
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=40001438;//kernel.ScaledCanvas:1438
        calcw=_this.width;
        //$LASTPOS=40001450;//kernel.ScaledCanvas:1450
        calch=_this.height;
        
      }
      //$LASTPOS=40001476;//kernel.ScaledCanvas:1476
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=40001519;//kernel.ScaledCanvas:1519
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=40001562;//kernel.ScaledCanvas:1562
      _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
    },
    canvas2buf :function _trc_ScaledCanvas_canvas2buf(point) {
      "use strict";
      var _this=this;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=40001677;//kernel.ScaledCanvas:1677
      calcw = _this.ch/_this.height*_this.width;
      
      //$LASTPOS=40001721;//kernel.ScaledCanvas:1721
      calch = _this.cw/_this.width*_this.height;
      
      //$LASTPOS=40001765;//kernel.ScaledCanvas:1765
      if (calch>_this.ch) {
        //$LASTPOS=40001779;//kernel.ScaledCanvas:1779
        calch=_this.ch;
      }
      //$LASTPOS=40001794;//kernel.ScaledCanvas:1794
      if (calcw>_this.cw) {
        //$LASTPOS=40001808;//kernel.ScaledCanvas:1808
        calcw=_this.cw;
      }
      //$LASTPOS=40001823;//kernel.ScaledCanvas:1823
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=40001879;//kernel.ScaledCanvas:1879
        calcw=_this.width;
        //$LASTPOS=40001891;//kernel.ScaledCanvas:1891
        calch=_this.height;
        
      }
      //$LASTPOS=40001917;//kernel.ScaledCanvas:1917
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=40001960;//kernel.ScaledCanvas:1960
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=40002056;//kernel.ScaledCanvas:2056
      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";
      return {x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};
    },
    fiber$canvas2buf :function _trc_ScaledCanvas_f_canvas2buf(_thread,point) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=40001677;//kernel.ScaledCanvas:1677
      calcw = _this.ch/_this.height*_this.width;
      
      //$LASTPOS=40001721;//kernel.ScaledCanvas:1721
      calch = _this.cw/_this.width*_this.height;
      
      //$LASTPOS=40001765;//kernel.ScaledCanvas:1765
      if (calch>_this.ch) {
        //$LASTPOS=40001779;//kernel.ScaledCanvas:1779
        calch=_this.ch;
      }
      //$LASTPOS=40001794;//kernel.ScaledCanvas:1794
      if (calcw>_this.cw) {
        //$LASTPOS=40001808;//kernel.ScaledCanvas:1808
        calcw=_this.cw;
      }
      //$LASTPOS=40001823;//kernel.ScaledCanvas:1823
      if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
        //$LASTPOS=40001879;//kernel.ScaledCanvas:1879
        calcw=_this.width;
        //$LASTPOS=40001891;//kernel.ScaledCanvas:1891
        calch=_this.height;
        
      }
      //$LASTPOS=40001917;//kernel.ScaledCanvas:1917
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=40001960;//kernel.ScaledCanvas:1960
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=40002056;//kernel.ScaledCanvas:2056
      _this._ret="("+point.x+"-"+marginw+")/"+calcw+"*"+_this.width+",";
      _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_ScaledCanvas_setBGColor(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40002229;//kernel.ScaledCanvas:2229
      _this._color=color;
    },
    fiber$setBGColor :function _trc_ScaledCanvas_f_setBGColor(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40002229;//kernel.ScaledCanvas:2229
      _this._color=color;
      
      _thread.retVal=_this;return;
    },
    fillCanvas :function _trc_ScaledCanvas_fillCanvas(cv) {
      "use strict";
      var _this=this;
      var ctx;
      
      //$LASTPOS=40002274;//kernel.ScaledCanvas:2274
      ctx = cv.getContext("2d");
      
      //$LASTPOS=40002308;//kernel.ScaledCanvas:2308
      ctx.save();
      //$LASTPOS=40002325;//kernel.ScaledCanvas:2325
      ctx.fillStyle=_this._color;
      //$LASTPOS=40002352;//kernel.ScaledCanvas:2352
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=40002395;//kernel.ScaledCanvas:2395
      if (_this.isDrawGrid) {
        //$LASTPOS=40002411;//kernel.ScaledCanvas:2411
        _this.drawGrid(cv);
      }
      //$LASTPOS=40002430;//kernel.ScaledCanvas:2430
      ctx.restore();
    },
    fiber$fillCanvas :function _trc_ScaledCanvas_f_fillCanvas(_thread,cv) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      
      //$LASTPOS=40002274;//kernel.ScaledCanvas:2274
      ctx = cv.getContext("2d");
      
      //$LASTPOS=40002308;//kernel.ScaledCanvas:2308
      ctx.save();
      //$LASTPOS=40002325;//kernel.ScaledCanvas:2325
      ctx.fillStyle=_this._color;
      //$LASTPOS=40002352;//kernel.ScaledCanvas:2352
      ctx.fillRect(0,0,cv.width,cv.height);
      //$LASTPOS=40002395;//kernel.ScaledCanvas:2395
      if (_this.isDrawGrid) {
        //$LASTPOS=40002411;//kernel.ScaledCanvas:2411
        _this.drawGrid(cv);
      }
      //$LASTPOS=40002430;//kernel.ScaledCanvas:2430
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_ScaledCanvas_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=40002774;//kernel.ScaledCanvas:2774
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    },
    fiber$scrollTo :function _trc_ScaledCanvas_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40002774;//kernel.ScaledCanvas:2774
      Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"shouldDraw1x1":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}},"fields":{"cw":{},"canvas":{},"ch":{},"cctx":{},"sx":{},"sy":{},"isDrawGrid":{},"buf":{},"ctx":{},"_ret":{},"_color":{},"drawGrid":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Screen',
  shortName: 'Screen',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Panel,
  includes: [],
  methods: {
    main :function _trc_Screen_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Screen_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    onAppear :function _trc_Screen_onAppear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41000034;//kernel.Screen:34
      _this.layers=[];
      //$LASTPOS=41000049;//kernel.Screen:49
      _this._color="black";
    },
    fiber$onAppear :function _trc_Screen_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000034;//kernel.Screen:34
      _this.layers=[];
      //$LASTPOS=41000049;//kernel.Screen:49
      _this._color="black";
      
      _thread.retVal=_this;return;
    },
    drawLayers :function _trc_Screen_drawLayers() {
      "use strict";
      var _this=this;
      var c;
      var i;
      var l;
      var group;
      var wpx;
      var wpy;
      var spx;
      var spy;
      var rt;
      var sc;
      var wpOnSX;
      var wpOnSY;
      
      //$LASTPOS=41000088;//kernel.Screen:88
      if (! _this._drawing) {
        //$LASTPOS=41000113;//kernel.Screen:113
        if (! _this.canvas) {
          throw new Error("canvas is null");
          
          
        }
        //$LASTPOS=41000193;//kernel.Screen:193
        _this._drawing=true;
        //$LASTPOS=41000216;//kernel.Screen:216
        _this.fillStyle=_this._color;
        //$LASTPOS=41000242;//kernel.Screen:242
        _this.fillRect(0,0,_this.width,_this.height);
        //$LASTPOS=41000278;//kernel.Screen:278
        c = _this.getContext();
        
        //$LASTPOS=41000306;//kernel.Screen:306
        //$LASTPOS=41000311;//kernel.Screen:311
        i = _this.layers.length-1;
        for (; i>=0 ; i--) {
          {
            //$LASTPOS=41000357;//kernel.Screen:357
            l = _this.layers[i];
            
            //$LASTPOS=41000386;//kernel.Screen:386
            group = l.group;
            
            //$LASTPOS=41000417;//kernel.Screen:417
            c.save();
            //$LASTPOS=41000439;//kernel.Screen:439
            wpx = l.wpx;
            wpy = l.wpy;
            
            //$LASTPOS=41000476;//kernel.Screen:476
            spx = l.spx;
            spy = l.spy;
            
            //$LASTPOS=41000513;//kernel.Screen:513
            rt = l.rotation;
            sc = l.scale;
            
            //$LASTPOS=41000639;//kernel.Screen:639
            wpOnSX = (_this.cos(rt)*wpx+_this.cos(rt+90)*wpy)*sc;
            
            //$LASTPOS=41000695;//kernel.Screen:695
            wpOnSY = (_this.sin(rt)*wpx+_this.sin(rt+90)*wpy)*sc;
            
            //$LASTPOS=41000793;//kernel.Screen:793
            c.translate(- wpOnSX+spx,- wpOnSY+spy);
            //$LASTPOS=41000843;//kernel.Screen:843
            c.rotate(_this.rad(rt));
            //$LASTPOS=41000874;//kernel.Screen:874
            c.scale(sc,sc);
            //$LASTPOS=41000902;//kernel.Screen:902
            group.draw(c);
            //$LASTPOS=41000929;//kernel.Screen:929
            c.restore();
          }
        }
        //$LASTPOS=41000960;//kernel.Screen:960
        _this._drawing=false;
        
      }
    },
    fiber$drawLayers :function _trc_Screen_f_drawLayers(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var c;
      var i;
      var l;
      var group;
      var wpx;
      var wpy;
      var spx;
      var spy;
      var rt;
      var sc;
      var wpOnSX;
      var wpOnSY;
      
      
      _thread.enter(function _trc_Screen_ent_drawLayers(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000088;//kernel.Screen:88
            if (!(! _this._drawing)) { __pc=2     ; break; }
            //$LASTPOS=41000113;//kernel.Screen:113
            if (! _this.canvas) {
              throw new Error("canvas is null");
              
              
            }
            //$LASTPOS=41000193;//kernel.Screen:193
            _this._drawing=true;
            //$LASTPOS=41000216;//kernel.Screen:216
            _this.fillStyle=_this._color;
            //$LASTPOS=41000242;//kernel.Screen:242
            _this.fillRect(0,0,_this.width,_this.height);
            //$LASTPOS=41000278;//kernel.Screen:278
            _this.fiber$getContext(_thread);
            __pc=1;return;
          case 1:
            c=_thread.retVal;
            
            //$LASTPOS=41000306;//kernel.Screen:306
            //$LASTPOS=41000311;//kernel.Screen:311
            i = _this.layers.length-1;
            for (; i>=0 ; i--) {
              {
                //$LASTPOS=41000357;//kernel.Screen:357
                l = _this.layers[i];
                
                //$LASTPOS=41000386;//kernel.Screen:386
                group = l.group;
                
                //$LASTPOS=41000417;//kernel.Screen:417
                c.save();
                //$LASTPOS=41000439;//kernel.Screen:439
                wpx = l.wpx;
                wpy = l.wpy;
                
                //$LASTPOS=41000476;//kernel.Screen:476
                spx = l.spx;
                spy = l.spy;
                
                //$LASTPOS=41000513;//kernel.Screen:513
                rt = l.rotation;
                sc = l.scale;
                
                //$LASTPOS=41000639;//kernel.Screen:639
                wpOnSX = (_this.cos(rt)*wpx+_this.cos(rt+90)*wpy)*sc;
                
                //$LASTPOS=41000695;//kernel.Screen:695
                wpOnSY = (_this.sin(rt)*wpx+_this.sin(rt+90)*wpy)*sc;
                
                //$LASTPOS=41000793;//kernel.Screen:793
                c.translate(- wpOnSX+spx,- wpOnSY+spy);
                //$LASTPOS=41000843;//kernel.Screen:843
                c.rotate(_this.rad(rt));
                //$LASTPOS=41000874;//kernel.Screen:874
                c.scale(sc,sc);
                //$LASTPOS=41000902;//kernel.Screen:902
                group.draw(c);
                //$LASTPOS=41000929;//kernel.Screen:929
                c.restore();
              }
            }
            //$LASTPOS=41000960;//kernel.Screen:960
            _this._drawing=false;
          case 2     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Screen_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41001001;//kernel.Screen:1001
      _this.drawLayers();
      //$LASTPOS=41001019;//kernel.Screen:1019
      Tonyu.classes.kernel.Panel.prototype.draw.apply( _this, [ctx]);
    },
    addLayer :function _trc_Screen_addLayer(group) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41001061;//kernel.Screen:1061
      group=group||new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=41001091;//kernel.Screen:1091
      _this.layers.push({spx: 0,spy: 0,wpx: 0,wpy: 0,rotation: 0,scale: 1,group: group,layer: _this});
      return _this.layers.length-1;
    },
    fiber$addLayer :function _trc_Screen_f_addLayer(_thread,group) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41001061;//kernel.Screen:1061
      group=group||new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=41001091;//kernel.Screen:1091
      _this.layers.push({spx: 0,spy: 0,wpx: 0,wpy: 0,rotation: 0,scale: 1,group: group,layer: _this});
      _thread.retVal=_this.layers.length-1;return;
      
      
      _thread.retVal=_this;return;
    },
    selectLayer :function _trc_Screen_selectLayer(i) {
      "use strict";
      var _this=this;
      var r;
      
      //$LASTPOS=41001252;//kernel.Screen:1252
      r = _this.findLayer(i);
      
      //$LASTPOS=41001276;//kernel.Screen:1276
      if (r!=null) {
        //$LASTPOS=41001289;//kernel.Screen:1289
        _this.index=r;
      }
    },
    fiber$selectLayer :function _trc_Screen_f_selectLayer(_thread,i) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      
      
      _thread.enter(function _trc_Screen_ent_selectLayer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41001252;//kernel.Screen:1252
            _this.fiber$findLayer(_thread, i);
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            //$LASTPOS=41001276;//kernel.Screen:1276
            if (r!=null) {
              //$LASTPOS=41001289;//kernel.Screen:1289
              _this.index=r;
            }
            _thread.exit(_this);return;
          }
        }
      });
    },
    findLayer :function _trc_Screen_findLayer(i) {
      "use strict";
      var _this=this;
      var j;
      
      //$LASTPOS=41001320;//kernel.Screen:1320
      if (typeof  i=="number") {
        //$LASTPOS=41001354;//kernel.Screen:1354
        if (_this.layers[i]) {
          return i;
        }
        
      } else {
        //$LASTPOS=41001400;//kernel.Screen:1400
        //$LASTPOS=41001405;//kernel.Screen:1405
        j = 0;
        for (; j<_this.layers.length ; j++) {
          {
            //$LASTPOS=41001449;//kernel.Screen:1449
            if (_this.layers[j]==i||_this.layers[j].group==i) {
              return j;
              
            }
          }
        }
        
      }
    },
    fiber$findLayer :function _trc_Screen_f_findLayer(_thread,i) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var j;
      
      //$LASTPOS=41001320;//kernel.Screen:1320
      if (typeof  i=="number") {
        //$LASTPOS=41001354;//kernel.Screen:1354
        if (_this.layers[i]) {
          _thread.retVal=i;return;
          
        }
        
      } else {
        //$LASTPOS=41001400;//kernel.Screen:1400
        //$LASTPOS=41001405;//kernel.Screen:1405
        j = 0;
        for (; j<_this.layers.length ; j++) {
          {
            //$LASTPOS=41001449;//kernel.Screen:1449
            if (_this.layers[j]==i||_this.layers[j].group==i) {
              _thread.retVal=j;return;
              
              
            }
          }
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    setPivot :function _trc_Screen_setPivot(x,y) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41001570;//kernel.Screen:1570
      _this.layers[_this.index].spx=x;
      //$LASTPOS=41001599;//kernel.Screen:1599
      _this.layers[_this.index].spy=y;
    },
    fiber$setPivot :function _trc_Screen_f_setPivot(_thread,x,y) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41001570;//kernel.Screen:1570
      _this.layers[_this.index].spx=x;
      //$LASTPOS=41001599;//kernel.Screen:1599
      _this.layers[_this.index].spy=y;
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Screen_scrollTo(x,y,scl,rot) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41001655;//kernel.Screen:1655
      _this.layers[_this.index].wpx=x;
      //$LASTPOS=41001684;//kernel.Screen:1684
      _this.layers[_this.index].wpy=y;
      //$LASTPOS=41001713;//kernel.Screen:1713
      if (typeof  scl=="number") {
        //$LASTPOS=41001739;//kernel.Screen:1739
        _this.layers[_this.index].scale=scl;
      }
      //$LASTPOS=41001772;//kernel.Screen:1772
      if (typeof  rot=="number") {
        //$LASTPOS=41001798;//kernel.Screen:1798
        _this.layers[_this.index].rotation=rot;
      }
    },
    fiber$scrollTo :function _trc_Screen_f_scrollTo(_thread,x,y,scl,rot) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41001655;//kernel.Screen:1655
      _this.layers[_this.index].wpx=x;
      //$LASTPOS=41001684;//kernel.Screen:1684
      _this.layers[_this.index].wpy=y;
      //$LASTPOS=41001713;//kernel.Screen:1713
      if (typeof  scl=="number") {
        //$LASTPOS=41001739;//kernel.Screen:1739
        _this.layers[_this.index].scale=scl;
      }
      //$LASTPOS=41001772;//kernel.Screen:1772
      if (typeof  rot=="number") {
        //$LASTPOS=41001798;//kernel.Screen:1798
        _this.layers[_this.index].rotation=rot;
      }
      
      _thread.retVal=_this;return;
    },
    canvas2buf :function _trc_Screen_canvas2buf(p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41001853;//kernel.Screen:1853
      p.layer=_this.layer;
      return _this.convert(p,_this);
    },
    fiber$canvas2buf :function _trc_Screen_f_canvas2buf(_thread,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41001853;//kernel.Screen:1853
      p.layer=_this.layer;
      _thread.retVal=_this.convert(p,_this);return;
      
      
      _thread.retVal=_this;return;
    },
    convert :function _trc_Screen_convert(obj,toLayer) {
      "use strict";
      var _this=this;
      var p;
      var l;
      var dx;
      var dy;
      var rt;
      var x;
      var y;
      
      //$LASTPOS=41002065;//kernel.Screen:2065
      if (toLayer==null) {
        //$LASTPOS=41002084;//kernel.Screen:2084
        toLayer=_this;
      }
      //$LASTPOS=41002102;//kernel.Screen:2102
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      //$LASTPOS=41002156;//kernel.Screen:2156
      if (obj.layer!==_this&&toLayer!==_this) {
        //$LASTPOS=41002206;//kernel.Screen:2206
        p = _this.convert(obj,_this);
        
        return _this.convert(p,toLayer);
        
      } else {
        //$LASTPOS=41002277;//kernel.Screen:2277
        if (obj.layer!==_this&&toLayer===_this) {
          //$LASTPOS=41002327;//kernel.Screen:2327
          l = _this.findLayer(obj.layer);
          
          //$LASTPOS=41002363;//kernel.Screen:2363
          if (l!=null) {
            //$LASTPOS=41002421;//kernel.Screen:2421
            l=_this.layers[l];
            //$LASTPOS=41002446;//kernel.Screen:2446
            dx = obj.x-l.wpx;
            
            //$LASTPOS=41002478;//kernel.Screen:2478
            dy = obj.y-l.wpy;
            
            //$LASTPOS=41002510;//kernel.Screen:2510
            rt = l.rotation;
            
            //$LASTPOS=41002725;//kernel.Screen:2725
            x = l.spx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*l.scale;
            
            //$LASTPOS=41002787;//kernel.Screen:2787
            y = l.spy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*l.scale;
            
            return {x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: _this};
            
          } else {
            return Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,_this]);
            
          }
          
        } else {
          //$LASTPOS=41003058;//kernel.Screen:3058
          if (obj.layer===_this&&toLayer!==_this) {
            //$LASTPOS=41003108;//kernel.Screen:3108
            l = _this.findLayer(toLayer);
            
            //$LASTPOS=41003142;//kernel.Screen:3142
            if (l!=null) {
              //$LASTPOS=41003200;//kernel.Screen:3200
              l=_this.layers[l];
              //$LASTPOS=41003238;//kernel.Screen:3238
              rt = - l.rotation;
              
              //$LASTPOS=41003270;//kernel.Screen:3270
              dx = obj.x-l.spx;
              
              //$LASTPOS=41003302;//kernel.Screen:3302
              dy = obj.y-l.spy;
              
              //$LASTPOS=41003518;//kernel.Screen:3518
              x = l.wpx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/l.scale;
              
              //$LASTPOS=41003580;//kernel.Screen:3580
              y = l.wpy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/l.scale;
              
              return {x: x,y: y,rotation: rt,scale: 1/l.scale,layer: toLayer};
              
            } else {
              return Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,toLayer]);
              
            }
            
          } else {
            return obj;
          }
        }
      }
    },
    fiber$convert :function _trc_Screen_f_convert(_thread,obj,toLayer) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var p;
      var l;
      var dx;
      var dy;
      var rt;
      var x;
      var y;
      
      //$LASTPOS=41002065;//kernel.Screen:2065
      if (toLayer==null) {
        //$LASTPOS=41002084;//kernel.Screen:2084
        toLayer=_this;
      }
      //$LASTPOS=41002102;//kernel.Screen:2102
      if (! obj.layer) {
        throw new Error("layer not set");
        
      }
      
      _thread.enter(function _trc_Screen_ent_convert(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41002156;//kernel.Screen:2156
            if (!(obj.layer!==_this&&toLayer!==_this)) { __pc=2     ; break; }
            //$LASTPOS=41002206;//kernel.Screen:2206
            _this.fiber$convert(_thread, obj, _this);
            __pc=1;return;
          case 1:
            p=_thread.retVal;
            
            _thread.exit(_this.convert(p,toLayer));return;
            __pc=13    ;break;
          case 2     :
            //$LASTPOS=41002277;//kernel.Screen:2277
            if (!(obj.layer!==_this&&toLayer===_this)) { __pc=6     ; break; }
            //$LASTPOS=41002327;//kernel.Screen:2327
            _this.fiber$findLayer(_thread, obj.layer);
            __pc=3;return;
          case 3:
            l=_thread.retVal;
            
            //$LASTPOS=41002363;//kernel.Screen:2363
            if (!(l!=null)) { __pc=4     ; break; }
            //$LASTPOS=41002421;//kernel.Screen:2421
            l=_this.layers[l];
            //$LASTPOS=41002446;//kernel.Screen:2446
            dx = obj.x-l.wpx;
            
            //$LASTPOS=41002478;//kernel.Screen:2478
            dy = obj.y-l.wpy;
            
            //$LASTPOS=41002510;//kernel.Screen:2510
            rt = l.rotation;
            
            //$LASTPOS=41002725;//kernel.Screen:2725
            x = l.spx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)*l.scale;
            
            //$LASTPOS=41002787;//kernel.Screen:2787
            y = l.spy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)*l.scale;
            
            _thread.exit({x: x,y: y,rotation: obj.rotation,scale: obj.scale,layer: _this});return;
            __pc=5     ;break;
          case 4     :
            _thread.exit(Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,_this]));return;
          case 5     :
            
            __pc=12    ;break;
          case 6     :
            //$LASTPOS=41003058;//kernel.Screen:3058
            if (!(obj.layer===_this&&toLayer!==_this)) { __pc=10    ; break; }
            //$LASTPOS=41003108;//kernel.Screen:3108
            _this.fiber$findLayer(_thread, toLayer);
            __pc=7;return;
          case 7:
            l=_thread.retVal;
            
            //$LASTPOS=41003142;//kernel.Screen:3142
            if (!(l!=null)) { __pc=8     ; break; }
            //$LASTPOS=41003200;//kernel.Screen:3200
            l=_this.layers[l];
            //$LASTPOS=41003238;//kernel.Screen:3238
            rt = - l.rotation;
            
            //$LASTPOS=41003270;//kernel.Screen:3270
            dx = obj.x-l.spx;
            
            //$LASTPOS=41003302;//kernel.Screen:3302
            dy = obj.y-l.spy;
            
            //$LASTPOS=41003518;//kernel.Screen:3518
            x = l.wpx+(_this.cos(rt)*dx+_this.cos(rt+90)*dy)/l.scale;
            
            //$LASTPOS=41003580;//kernel.Screen:3580
            y = l.wpy+(_this.sin(rt)*dx+_this.sin(rt+90)*dy)/l.scale;
            
            _thread.exit({x: x,y: y,rotation: rt,scale: 1/l.scale,layer: toLayer});return;
            __pc=9     ;break;
          case 8     :
            _thread.exit(Tonyu.classes.kernel.Panel.prototype.convert.apply( _this, [obj,toLayer]));return;
          case 9     :
            
            __pc=11    ;break;
          case 10    :
            _thread.exit(obj);return;
          case 11    :
            
          case 12    :
            
          case 13    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    setBGColor :function _trc_Screen_setBGColor(color) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=41003885;//kernel.Screen:3885
      _this._color=color;
    },
    fiber$setBGColor :function _trc_Screen_f_setBGColor(_thread,color) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41003885;//kernel.Screen:3885
      _this._color=color;
      
      _thread.retVal=_this;return;
    },
    all :function _trc_Screen_all() {
      "use strict";
      var _this=this;
      var res;
      var l;
      var _it_378;
      var q;
      
      //$LASTPOS=41003919;//kernel.Screen:3919
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=41003943;//kernel.Screen:3943
      _it_378=Tonyu.iterator(_this.layers,1);
      while(_it_378.next()) {
        l=_it_378[0];
        
        //$LASTPOS=41003975;//kernel.Screen:3975
        q = l.group.all.apply(l.group,arguments);
        
        //$LASTPOS=41004027;//kernel.Screen:4027
        res.push(q);
        
      }
      return res;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"drawLayers":{"nowait":false},"draw":{"nowait":true},"addLayer":{"nowait":false},"selectLayer":{"nowait":false},"findLayer":{"nowait":false},"setPivot":{"nowait":false},"scrollTo":{"nowait":false},"canvas2buf":{"nowait":false},"convert":{"nowait":false},"setBGColor":{"nowait":false},"all":{"nowait":true}},"fields":{"layers":{},"_color":{},"_drawing":{},"index":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Sprites',
  shortName: 'Sprites',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Sprites_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Sprites_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Sprites_initialize() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=42000045;//kernel.Sprites:45
      _this.sprites=[];
      //$LASTPOS=42000062;//kernel.Sprites:62
      _this.imageList=[];
      //$LASTPOS=42000081;//kernel.Sprites:81
      _this.hitWatchers=[];
      //$LASTPOS=42000102;//kernel.Sprites:102
      _this.isDrawGrid=Tonyu.noviceMode;
      //$LASTPOS=42000136;//kernel.Sprites:136
      _this.sx=0;
      //$LASTPOS=42000147;//kernel.Sprites:147
      _this.sy=0;
      //$LASTPOS=42000158;//kernel.Sprites:158
      _this.objId=0;
    },
    add :function _trc_Sprites_add(s) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=42000194;//kernel.Sprites:194
      if (Tonyu.globals.$Boot.newLimit) {
        //$LASTPOS=42000225;//kernel.Sprites:225
        Tonyu.globals.$Boot.newLimitCount--;
        //$LASTPOS=42000257;//kernel.Sprites:257
        if (Tonyu.globals.$Boot.newLimitCount<=0) {
          throw new Error("一度にたくさんのオブジェクトを作りすぎています");
          
        }
        
      }
      //$LASTPOS=42000341;//kernel.Sprites:341
      if (s.__addedToSprites) {
        return _this;
      }
      //$LASTPOS=42000378;//kernel.Sprites:378
      if (s instanceof Tonyu.classes.kernel.PlainChar) {
        //$LASTPOS=42000417;//kernel.Sprites:417
        _this.t1Sprites=_this.t1Sprites||[];
        
      }
      //$LASTPOS=42000454;//kernel.Sprites:454
      if (_this.drawing) {
        //$LASTPOS=42000478;//kernel.Sprites:478
        s.draw(_this.drawing);
        return _this;
        
      }
      //$LASTPOS=42000524;//kernel.Sprites:524
      _this.sprites.push(s);
      //$LASTPOS=42000546;//kernel.Sprites:546
      if (s.__genId==null) {
        //$LASTPOS=42000576;//kernel.Sprites:576
        s.__genId=_this.objId;
        //$LASTPOS=42000602;//kernel.Sprites:602
        _this.objId++;
        
      }
      //$LASTPOS=42000623;//kernel.Sprites:623
      s.__addedToSprites=_this;
      return s;
    },
    fiber$add :function _trc_Sprites_f_add(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000194;//kernel.Sprites:194
      if (Tonyu.globals.$Boot.newLimit) {
        //$LASTPOS=42000225;//kernel.Sprites:225
        Tonyu.globals.$Boot.newLimitCount--;
        //$LASTPOS=42000257;//kernel.Sprites:257
        if (Tonyu.globals.$Boot.newLimitCount<=0) {
          throw new Error("一度にたくさんのオブジェクトを作りすぎています");
          
        }
        
      }
      //$LASTPOS=42000341;//kernel.Sprites:341
      if (s.__addedToSprites) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=42000378;//kernel.Sprites:378
      if (s instanceof Tonyu.classes.kernel.PlainChar) {
        //$LASTPOS=42000417;//kernel.Sprites:417
        _this.t1Sprites=_this.t1Sprites||[];
        
      }
      //$LASTPOS=42000454;//kernel.Sprites:454
      if (_this.drawing) {
        //$LASTPOS=42000478;//kernel.Sprites:478
        s.draw(_this.drawing);
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=42000524;//kernel.Sprites:524
      _this.sprites.push(s);
      //$LASTPOS=42000546;//kernel.Sprites:546
      if (s.__genId==null) {
        //$LASTPOS=42000576;//kernel.Sprites:576
        s.__genId=_this.objId;
        //$LASTPOS=42000602;//kernel.Sprites:602
        _this.objId++;
        
      }
      //$LASTPOS=42000623;//kernel.Sprites:623
      s.__addedToSprites=_this;
      _thread.retVal=s;return;
      
      
      _thread.retVal=_this;return;
    },
    remove :function _trc_Sprites_remove(s) {
      "use strict";
      var _this=this;
      var idx;
      
      //$LASTPOS=42000693;//kernel.Sprites:693
      idx = _this.sprites.indexOf(s);
      
      //$LASTPOS=42000726;//kernel.Sprites:726
      if (idx<0) {
        return _this;
      }
      //$LASTPOS=42000750;//kernel.Sprites:750
      _this.sprites.splice(idx,1);
      //$LASTPOS=42000778;//kernel.Sprites:778
      delete s.__addedToSprites;
    },
    fiber$remove :function _trc_Sprites_f_remove(_thread,s) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var idx;
      
      //$LASTPOS=42000693;//kernel.Sprites:693
      idx = _this.sprites.indexOf(s);
      
      //$LASTPOS=42000726;//kernel.Sprites:726
      if (idx<0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=42000750;//kernel.Sprites:750
      _this.sprites.splice(idx,1);
      //$LASTPOS=42000778;//kernel.Sprites:778
      delete s.__addedToSprites;
      
      _thread.retVal=_this;return;
    },
    removeOneframes :function _trc_Sprites_removeOneframes(drawn) {
      "use strict";
      var _this=this;
      var s;
      var i;
      
      
      //$LASTPOS=42000912;//kernel.Sprites:912
      //$LASTPOS=42000917;//kernel.Sprites:917
      i = _this.sprites.length-1;
      for (; i>=0 ; i--) {
        {
          //$LASTPOS=42000965;//kernel.Sprites:965
          s=_this.sprites[i];
          //$LASTPOS=42000988;//kernel.Sprites:988
          if (s instanceof Tonyu.classes.kernel.OneframeSprite&&(! drawn||s.drawn)) {
            //$LASTPOS=42001161;//kernel.Sprites:1161
            Tonyu.globals.$ObjectPool.poolList(s.getClassInfo().fullName).push(s);
            //$LASTPOS=42001233;//kernel.Sprites:1233
            _this.sprites.splice(i,1);
            
          }
        }
      }
    },
    fiber$removeOneframes :function _trc_Sprites_f_removeOneframes(_thread,drawn) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      var i;
      
      
      //$LASTPOS=42000912;//kernel.Sprites:912
      //$LASTPOS=42000917;//kernel.Sprites:917
      i = _this.sprites.length-1;
      for (; i>=0 ; i--) {
        {
          //$LASTPOS=42000965;//kernel.Sprites:965
          s=_this.sprites[i];
          //$LASTPOS=42000988;//kernel.Sprites:988
          if (s instanceof Tonyu.classes.kernel.OneframeSprite&&(! drawn||s.drawn)) {
            //$LASTPOS=42001161;//kernel.Sprites:1161
            Tonyu.globals.$ObjectPool.poolList(s.getClassInfo().fullName).push(s);
            //$LASTPOS=42001233;//kernel.Sprites:1233
            _this.sprites.splice(i,1);
            
          }
        }
      }
      
      _thread.retVal=_this;return;
    },
    clear :function _trc_Sprites_clear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=42001294;//kernel.Sprites:1294
      _this.sprites.splice(0,_this.sprites.length);
    },
    fiber$clear :function _trc_Sprites_f_clear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42001294;//kernel.Sprites:1294
      _this.sprites.splice(0,_this.sprites.length);
      
      _thread.retVal=_this;return;
    },
    compOrder :function _trc_Sprites_compOrder(obj1,obj2) {
      "use strict";
      var _this=this;
      var val1;
      var val2;
      
      //$LASTPOS=42001367;//kernel.Sprites:1367
      val1 = obj1.zOrder||0;
      
      //$LASTPOS=42001397;//kernel.Sprites:1397
      val2 = obj2.zOrder||0;
      
      //$LASTPOS=42001427;//kernel.Sprites:1427
      if (val1>val2) {
        return - 1;
        
      } else {
        //$LASTPOS=42001473;//kernel.Sprites:1473
        if (val1<val2) {
          return 1;
          
        } else {
          //$LASTPOS=42001518;//kernel.Sprites:1518
          if (val1==val2) {
            //$LASTPOS=42001543;//kernel.Sprites:1543
            if (obj1.__genId>obj2.__genId) {
              return 1;
              
            } else {
              return - 1;
              
            }
            return 0;
            
          }
        }
      }
    },
    fiber$compOrder :function _trc_Sprites_f_compOrder(_thread,obj1,obj2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var val1;
      var val2;
      
      //$LASTPOS=42001367;//kernel.Sprites:1367
      val1 = obj1.zOrder||0;
      
      //$LASTPOS=42001397;//kernel.Sprites:1397
      val2 = obj2.zOrder||0;
      
      //$LASTPOS=42001427;//kernel.Sprites:1427
      if (val1>val2) {
        _thread.retVal=- 1;return;
        
        
      } else {
        //$LASTPOS=42001473;//kernel.Sprites:1473
        if (val1<val2) {
          _thread.retVal=1;return;
          
          
        } else {
          //$LASTPOS=42001518;//kernel.Sprites:1518
          if (val1==val2) {
            //$LASTPOS=42001543;//kernel.Sprites:1543
            if (obj1.__genId>obj2.__genId) {
              _thread.retVal=1;return;
              
              
            } else {
              _thread.retVal=- 1;return;
              
              
            }
            _thread.retVal=0;return;
            
            
          }
        }
      }
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Sprites_draw(ctx) {
      "use strict";
      var _this=this;
      var orderArray;
      
      //$LASTPOS=42001740;//kernel.Sprites:1740
      ctx.save();
      //$LASTPOS=42001757;//kernel.Sprites:1757
      orderArray = [];
      
      //$LASTPOS=42001781;//kernel.Sprites:1781
      if (_this.t1Sprites) {
        //$LASTPOS=42001807;//kernel.Sprites:1807
        _this.sprites.forEach((function anonymous_1823(s) {
          
          //$LASTPOS=42001843;//kernel.Sprites:1843
          if (s instanceof Tonyu.classes.kernel.PlainChar) {
            //$LASTPOS=42001890;//kernel.Sprites:1890
            s.draw();
            
          } else {
            //$LASTPOS=42001920;//kernel.Sprites:1920
            orderArray.push(s);
          }
        }));
        
      } else {
        //$LASTPOS=42001975;//kernel.Sprites:1975
        orderArray=orderArray.concat(_this.sprites);
        
      }
      //$LASTPOS=42002026;//kernel.Sprites:2026
      orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
      //$LASTPOS=42002059;//kernel.Sprites:2059
      ctx.translate(- _this.sx,- _this.sy);
      //$LASTPOS=42002088;//kernel.Sprites:2088
      _this.drawing=ctx;
      //$LASTPOS=42002106;//kernel.Sprites:2106
      orderArray.forEach((function anonymous_2125(s) {
        
        //$LASTPOS=42002140;//kernel.Sprites:2140
        s.draw(ctx);
      }));
      //$LASTPOS=42002167;//kernel.Sprites:2167
      _this.drawing=null;
      //$LASTPOS=42002186;//kernel.Sprites:2186
      ctx.restore();
    },
    checkHit :function _trc_Sprites_checkHit() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=42002232;//kernel.Sprites:2232
      _this.hitWatchers.forEach((function anonymous_2252(w) {
        
        //$LASTPOS=42002276;//kernel.Sprites:2276
        _this.sprites.forEach((function anonymous_2292(a) {
          var a_owner;
          
          //$LASTPOS=42002364;//kernel.Sprites:2364
          a_owner = a;
          
          //$LASTPOS=42002406;//kernel.Sprites:2406
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=42002459;//kernel.Sprites:2459
          _this.sprites.forEach((function anonymous_2475(b) {
            var b_owner;
            
            //$LASTPOS=42002507;//kernel.Sprites:2507
            b_owner = b;
            
            //$LASTPOS=42002553;//kernel.Sprites:2553
            if (a===b) {
              return _this;
            }
            //$LASTPOS=42002589;//kernel.Sprites:2589
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=42002694;//kernel.Sprites:2694
            if (a.crashTo1(b)) {
              //$LASTPOS=42002797;//kernel.Sprites:2797
              w.h(a_owner,b_owner);
              
            }
          }));
        }));
      }));
    },
    fiber$checkHit :function _trc_Sprites_f_checkHit(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42002232;//kernel.Sprites:2232
      _this.hitWatchers.forEach((function anonymous_2252(w) {
        
        //$LASTPOS=42002276;//kernel.Sprites:2276
        _this.sprites.forEach((function anonymous_2292(a) {
          var a_owner;
          
          //$LASTPOS=42002364;//kernel.Sprites:2364
          a_owner = a;
          
          //$LASTPOS=42002406;//kernel.Sprites:2406
          if (! (a_owner instanceof w.A)) {
            return _this;
          }
          //$LASTPOS=42002459;//kernel.Sprites:2459
          _this.sprites.forEach((function anonymous_2475(b) {
            var b_owner;
            
            //$LASTPOS=42002507;//kernel.Sprites:2507
            b_owner = b;
            
            //$LASTPOS=42002553;//kernel.Sprites:2553
            if (a===b) {
              return _this;
            }
            //$LASTPOS=42002589;//kernel.Sprites:2589
            if (! (b_owner instanceof w.B)) {
              return _this;
            }
            //$LASTPOS=42002694;//kernel.Sprites:2694
            if (a.crashTo1(b)) {
              //$LASTPOS=42002797;//kernel.Sprites:2797
              w.h(a_owner,b_owner);
              
            }
          }));
        }));
      }));
      
      _thread.retVal=_this;return;
    },
    watchHit :function _trc_Sprites_watchHit(typeA,typeB,onHit) {
      "use strict";
      var _this=this;
      var p;
      
      //$LASTPOS=42002927;//kernel.Sprites:2927
      p = {A: typeA,B: typeB,h: onHit};
      
      //$LASTPOS=42002991;//kernel.Sprites:2991
      _this.hitWatchers.push(p);
    },
    drawGrid :function _trc_Sprites_drawGrid(c) {
      "use strict";
      var _this=this;
      var ctx;
      var i;
      
      //$LASTPOS=42003044;//kernel.Sprites:3044
      ctx = c.getContext("2d");
      
      //$LASTPOS=42003077;//kernel.Sprites:3077
      ctx.textBaseline="top";
      //$LASTPOS=42003106;//kernel.Sprites:3106
      ctx.save();
      //$LASTPOS=42003123;//kernel.Sprites:3123
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=42003163;//kernel.Sprites:3163
      //$LASTPOS=42003168;//kernel.Sprites:3168
      i = 0;
      for (; i<c.width ; i+=10) {
        {
          //$LASTPOS=42003208;//kernel.Sprites:3208
          ctx.beginPath();
          //$LASTPOS=42003234;//kernel.Sprites:3234
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=42003280;//kernel.Sprites:3280
          ctx.moveTo(i,0);
          //$LASTPOS=42003306;//kernel.Sprites:3306
          ctx.lineTo(i,c.height);
          //$LASTPOS=42003339;//kernel.Sprites:3339
          ctx.closePath();
          //$LASTPOS=42003365;//kernel.Sprites:3365
          ctx.stroke();
        }
      }
      //$LASTPOS=42003393;//kernel.Sprites:3393
      //$LASTPOS=42003398;//kernel.Sprites:3398
      i = 0;
      for (; i<c.height ; i+=10) {
        {
          //$LASTPOS=42003439;//kernel.Sprites:3439
          ctx.beginPath();
          //$LASTPOS=42003465;//kernel.Sprites:3465
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=42003511;//kernel.Sprites:3511
          ctx.moveTo(0,i);
          //$LASTPOS=42003537;//kernel.Sprites:3537
          ctx.lineTo(c.width,i);
          //$LASTPOS=42003569;//kernel.Sprites:3569
          ctx.closePath();
          //$LASTPOS=42003595;//kernel.Sprites:3595
          ctx.stroke();
        }
      }
      //$LASTPOS=42003621;//kernel.Sprites:3621
      ctx.fillStyle="white";
      //$LASTPOS=42003649;//kernel.Sprites:3649
      ctx.font="15px monospaced";
      //$LASTPOS=42003682;//kernel.Sprites:3682
      //$LASTPOS=42003687;//kernel.Sprites:3687
      i = 100;
      for (; i<c.width ; i+=100) {
        {
          //$LASTPOS=42003730;//kernel.Sprites:3730
          ctx.fillText(i,i,0);
        }
      }
      //$LASTPOS=42003764;//kernel.Sprites:3764
      //$LASTPOS=42003769;//kernel.Sprites:3769
      i = 100;
      for (; i<c.height ; i+=100) {
        {
          //$LASTPOS=42003813;//kernel.Sprites:3813
          ctx.fillText(i,0,i);
        }
      }
      //$LASTPOS=42003847;//kernel.Sprites:3847
      ctx.restore();
    },
    fiber$drawGrid :function _trc_Sprites_f_drawGrid(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var ctx;
      var i;
      
      //$LASTPOS=42003044;//kernel.Sprites:3044
      ctx = c.getContext("2d");
      
      //$LASTPOS=42003077;//kernel.Sprites:3077
      ctx.textBaseline="top";
      //$LASTPOS=42003106;//kernel.Sprites:3106
      ctx.save();
      //$LASTPOS=42003123;//kernel.Sprites:3123
      ctx.strokeStyle="rgb(40,100,200)";
      //$LASTPOS=42003163;//kernel.Sprites:3163
      //$LASTPOS=42003168;//kernel.Sprites:3168
      i = 0;
      for (; i<c.width ; i+=10) {
        {
          //$LASTPOS=42003208;//kernel.Sprites:3208
          ctx.beginPath();
          //$LASTPOS=42003234;//kernel.Sprites:3234
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=42003280;//kernel.Sprites:3280
          ctx.moveTo(i,0);
          //$LASTPOS=42003306;//kernel.Sprites:3306
          ctx.lineTo(i,c.height);
          //$LASTPOS=42003339;//kernel.Sprites:3339
          ctx.closePath();
          //$LASTPOS=42003365;//kernel.Sprites:3365
          ctx.stroke();
        }
      }
      //$LASTPOS=42003393;//kernel.Sprites:3393
      //$LASTPOS=42003398;//kernel.Sprites:3398
      i = 0;
      for (; i<c.height ; i+=10) {
        {
          //$LASTPOS=42003439;//kernel.Sprites:3439
          ctx.beginPath();
          //$LASTPOS=42003465;//kernel.Sprites:3465
          ctx.lineWidth=(i%100==0?4:1);
          //$LASTPOS=42003511;//kernel.Sprites:3511
          ctx.moveTo(0,i);
          //$LASTPOS=42003537;//kernel.Sprites:3537
          ctx.lineTo(c.width,i);
          //$LASTPOS=42003569;//kernel.Sprites:3569
          ctx.closePath();
          //$LASTPOS=42003595;//kernel.Sprites:3595
          ctx.stroke();
        }
      }
      //$LASTPOS=42003621;//kernel.Sprites:3621
      ctx.fillStyle="white";
      //$LASTPOS=42003649;//kernel.Sprites:3649
      ctx.font="15px monospaced";
      //$LASTPOS=42003682;//kernel.Sprites:3682
      //$LASTPOS=42003687;//kernel.Sprites:3687
      i = 100;
      for (; i<c.width ; i+=100) {
        {
          //$LASTPOS=42003730;//kernel.Sprites:3730
          ctx.fillText(i,i,0);
        }
      }
      //$LASTPOS=42003764;//kernel.Sprites:3764
      //$LASTPOS=42003769;//kernel.Sprites:3769
      i = 100;
      for (; i<c.height ; i+=100) {
        {
          //$LASTPOS=42003813;//kernel.Sprites:3813
          ctx.fillText(i,0,i);
        }
      }
      //$LASTPOS=42003847;//kernel.Sprites:3847
      ctx.restore();
      
      _thread.retVal=_this;return;
    },
    scrollTo :function _trc_Sprites_scrollTo(scrollX,scrollY) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=42004015;//kernel.Sprites:4015
      _this.sx=scrollX;
      //$LASTPOS=42004032;//kernel.Sprites:4032
      _this.sy=scrollY;
    },
    fiber$scrollTo :function _trc_Sprites_f_scrollTo(_thread,scrollX,scrollY) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42004015;//kernel.Sprites:4015
      _this.sx=scrollX;
      //$LASTPOS=42004032;//kernel.Sprites:4032
      _this.sy=scrollY;
      
      _thread.retVal=_this;return;
    },
    all :function _trc_Sprites_all(c) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=42004072;//kernel.Sprites:4072
      res = new Tonyu.classes.kernel.TQuery;
      
      //$LASTPOS=42004097;//kernel.Sprites:4097
      if (arguments.length>0&&typeof  c!="function") {
        return res;
        
      }
      //$LASTPOS=42004180;//kernel.Sprites:4180
      _this.sprites.forEach((function anonymous_4196(s) {
        
        //$LASTPOS=42004212;//kernel.Sprites:4212
        if (s===_this) {
          return _this;
        }
        //$LASTPOS=42004243;//kernel.Sprites:4243
        if (! c||s instanceof c) {
          //$LASTPOS=42004284;//kernel.Sprites:4284
          res.push(s);
          
        }
      }));
      return res;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"removeOneframes":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"scrollTo":{"nowait":false},"all":{"nowait":true}},"fields":{"sprites":{},"imageList":{},"hitWatchers":{},"isDrawGrid":{},"sx":{},"sy":{},"objId":{},"t1Sprites":{},"drawing":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.BodyActor',
  shortName: 'BodyActor',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.kernel.T2Mod],
  methods: {
    main :function _trc_BodyActor_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_BodyActor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_BodyActor_initialize(p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43000065;//kernel.BodyActor:65
      Tonyu.classes.kernel.Actor.apply( _this, [p]);
      //$LASTPOS=43000080;//kernel.BodyActor:80
      _this._th.on("end",Tonyu.bindFunc(_this,_this.initBody));
    },
    getWorld :function _trc_BodyActor_getWorld() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43000128;//kernel.BodyActor:128
      if (Tonyu.globals.$t2World) {
        return Tonyu.globals.$t2World;
      }
      //$LASTPOS=43000164;//kernel.BodyActor:164
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      return Tonyu.globals.$t2World;
    },
    fiber$getWorld :function _trc_BodyActor_f_getWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=43000128;//kernel.BodyActor:128
      if (Tonyu.globals.$t2World) {
        _thread.retVal=Tonyu.globals.$t2World;return;
        
      }
      //$LASTPOS=43000164;//kernel.BodyActor:164
      Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
      _thread.retVal=Tonyu.globals.$t2World;return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_BodyActor_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43000229;//kernel.BodyActor:229
      _this.initBody();
      //$LASTPOS=43000246;//kernel.BodyActor:246
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_BodyActor_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_BodyActor_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43000229;//kernel.BodyActor:229
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=43000246;//kernel.BodyActor:246
            Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initBody :function _trc_BodyActor_initBody() {
      "use strict";
      var _this=this;
      var wworld;
      var b2Vec2;
      var b2BodyDef;
      var b2Body;
      var b2FixtureDef;
      var b2Fixture;
      var b2PolygonShape;
      var b2CircleShape;
      var fixDef;
      var bodyDef;
      var w;
      var h;
      var fps;
      var r;
      var ve;
      var vr;
      
      //$LASTPOS=43000285;//kernel.BodyActor:285
      if (_this.body) {
        return _this;
      }
      //$LASTPOS=43000308;//kernel.BodyActor:308
      wworld = _this.getWorld();
      
      //$LASTPOS=43000336;//kernel.BodyActor:336
      _this.world=wworld.world;
      //$LASTPOS=43000361;//kernel.BodyActor:361
      _this.scale=wworld.scale;
      //$LASTPOS=43000386;//kernel.BodyActor:386
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=43000430;//kernel.BodyActor:430
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      
      //$LASTPOS=43000477;//kernel.BodyActor:477
      b2Body = Box2D.Dynamics.b2Body;
      
      //$LASTPOS=43000518;//kernel.BodyActor:518
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      
      //$LASTPOS=43000571;//kernel.BodyActor:571
      b2Fixture = Box2D.Dynamics.b2Fixture;
      
      //$LASTPOS=43000618;//kernel.BodyActor:618
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      
      //$LASTPOS=43000683;//kernel.BodyActor:683
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      
      //$LASTPOS=43000752;//kernel.BodyActor:752
      fixDef = new b2FixtureDef;
      
      //$LASTPOS=43000788;//kernel.BodyActor:788
      fixDef.density=_this.defv(_this.density,1);
      //$LASTPOS=43000830;//kernel.BodyActor:830
      fixDef.friction=_this.defv(_this.friction,0.5);
      //$LASTPOS=43000874;//kernel.BodyActor:874
      fixDef.restitution=_this.defv(_this.restitution,0.2);
      //$LASTPOS=43000930;//kernel.BodyActor:930
      bodyDef = new b2BodyDef;
      
      //$LASTPOS=43000964;//kernel.BodyActor:964
      bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
      //$LASTPOS=43001052;//kernel.BodyActor:1052
      bodyDef.position.x=_this.x/_this.scale;
      //$LASTPOS=43001088;//kernel.BodyActor:1088
      bodyDef.position.y=_this.y/_this.scale;
      //$LASTPOS=43001124;//kernel.BodyActor:1124
      _this.shape=_this.shape||(_this.radius?"circle":"box");
      //$LASTPOS=43001173;//kernel.BodyActor:1173
      w = _this.width;
      h = _this.height;
      
      //$LASTPOS=43001200;//kernel.BodyActor:1200
      if (! w) {
        //$LASTPOS=43001219;//kernel.BodyActor:1219
        _this.detectShape();
        //$LASTPOS=43001243;//kernel.BodyActor:1243
        w=_this.width*(_this.scaleX||1);
        //$LASTPOS=43001273;//kernel.BodyActor:1273
        h=_this.height*(_this.scaleY||_this.scaleX||1);
        
      }
      //$LASTPOS=43001315;//kernel.BodyActor:1315
      if (_this.shape=="box") {
        //$LASTPOS=43001344;//kernel.BodyActor:1344
        if (! h) {
          //$LASTPOS=43001352;//kernel.BodyActor:1352
          h=w;
        }
        //$LASTPOS=43001366;//kernel.BodyActor:1366
        fixDef.shape=new b2PolygonShape;
        //$LASTPOS=43001410;//kernel.BodyActor:1410
        fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
        
      } else {
        //$LASTPOS=43001514;//kernel.BodyActor:1514
        _this.radius=_this.radius||w/2||16;
        //$LASTPOS=43001551;//kernel.BodyActor:1551
        fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
        //$LASTPOS=43001628;//kernel.BodyActor:1628
        _this.width=_this.height=_this.radius*2;
        
      }
      //$LASTPOS=43001664;//kernel.BodyActor:1664
      fps = wworld.fps;
      
      //$LASTPOS=43001689;//kernel.BodyActor:1689
      r = _this.rotation;
      ve = _this.bvec(_this.defv(_this.vx*fps,0),_this.defv(_this.vy*fps,0));
      vr = _this.defv(_this.vrotation,0);
      
      //$LASTPOS=43001771;//kernel.BodyActor:1771
      _this.body=_this.world.CreateBody(bodyDef);
      //$LASTPOS=43001808;//kernel.BodyActor:1808
      _this.body.CreateFixture(fixDef);
      //$LASTPOS=43001841;//kernel.BodyActor:1841
      _this.body.SetUserData(_this);
      //$LASTPOS=43001870;//kernel.BodyActor:1870
      _this.body.SetLinearVelocity(ve);
      //$LASTPOS=43001903;//kernel.BodyActor:1903
      _this.rotation=r;
      //$LASTPOS=43001920;//kernel.BodyActor:1920
      _this.vrotation=vr;
      //$LASTPOS=43001939;//kernel.BodyActor:1939
      _this.fireEvent("createBody");
    },
    fiber$initBody :function _trc_BodyActor_f_initBody(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wworld;
      var b2Vec2;
      var b2BodyDef;
      var b2Body;
      var b2FixtureDef;
      var b2Fixture;
      var b2PolygonShape;
      var b2CircleShape;
      var fixDef;
      var bodyDef;
      var w;
      var h;
      var fps;
      var r;
      var ve;
      var vr;
      
      //$LASTPOS=43000285;//kernel.BodyActor:285
      if (_this.body) {
        _thread.retVal=_this;return;
        
      }
      
      _thread.enter(function _trc_BodyActor_ent_initBody(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43000308;//kernel.BodyActor:308
            _this.fiber$getWorld(_thread);
            __pc=1;return;
          case 1:
            wworld=_thread.retVal;
            
            //$LASTPOS=43000336;//kernel.BodyActor:336
            _this.world=wworld.world;
            //$LASTPOS=43000361;//kernel.BodyActor:361
            _this.scale=wworld.scale;
            //$LASTPOS=43000386;//kernel.BodyActor:386
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=43000430;//kernel.BodyActor:430
            b2BodyDef = Box2D.Dynamics.b2BodyDef;
            
            //$LASTPOS=43000477;//kernel.BodyActor:477
            b2Body = Box2D.Dynamics.b2Body;
            
            //$LASTPOS=43000518;//kernel.BodyActor:518
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
            
            //$LASTPOS=43000571;//kernel.BodyActor:571
            b2Fixture = Box2D.Dynamics.b2Fixture;
            
            //$LASTPOS=43000618;//kernel.BodyActor:618
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
            
            //$LASTPOS=43000683;//kernel.BodyActor:683
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
            
            //$LASTPOS=43000752;//kernel.BodyActor:752
            fixDef = new b2FixtureDef;
            
            //$LASTPOS=43000788;//kernel.BodyActor:788
            _this.fiber$defv(_thread, _this.density, 1);
            __pc=2;return;
          case 2:
            fixDef.density=_thread.retVal;
            
            //$LASTPOS=43000830;//kernel.BodyActor:830
            _this.fiber$defv(_thread, _this.friction, 0.5);
            __pc=3;return;
          case 3:
            fixDef.friction=_thread.retVal;
            
            //$LASTPOS=43000874;//kernel.BodyActor:874
            _this.fiber$defv(_thread, _this.restitution, 0.2);
            __pc=4;return;
          case 4:
            fixDef.restitution=_thread.retVal;
            
            //$LASTPOS=43000930;//kernel.BodyActor:930
            bodyDef = new b2BodyDef;
            
            //$LASTPOS=43000964;//kernel.BodyActor:964
            bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
            //$LASTPOS=43001052;//kernel.BodyActor:1052
            bodyDef.position.x=_this.x/_this.scale;
            //$LASTPOS=43001088;//kernel.BodyActor:1088
            bodyDef.position.y=_this.y/_this.scale;
            //$LASTPOS=43001124;//kernel.BodyActor:1124
            _this.shape=_this.shape||(_this.radius?"circle":"box");
            //$LASTPOS=43001173;//kernel.BodyActor:1173
            w = _this.width;
            h = _this.height;
            
            //$LASTPOS=43001200;//kernel.BodyActor:1200
            if (! w) {
              //$LASTPOS=43001219;//kernel.BodyActor:1219
              _this.detectShape();
              //$LASTPOS=43001243;//kernel.BodyActor:1243
              w=_this.width*(_this.scaleX||1);
              //$LASTPOS=43001273;//kernel.BodyActor:1273
              h=_this.height*(_this.scaleY||_this.scaleX||1);
              
            }
            //$LASTPOS=43001315;//kernel.BodyActor:1315
            if (_this.shape=="box") {
              //$LASTPOS=43001344;//kernel.BodyActor:1344
              if (! h) {
                //$LASTPOS=43001352;//kernel.BodyActor:1352
                h=w;
              }
              //$LASTPOS=43001366;//kernel.BodyActor:1366
              fixDef.shape=new b2PolygonShape;
              //$LASTPOS=43001410;//kernel.BodyActor:1410
              fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
              
            } else {
              //$LASTPOS=43001514;//kernel.BodyActor:1514
              _this.radius=_this.radius||w/2||16;
              //$LASTPOS=43001551;//kernel.BodyActor:1551
              fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
              //$LASTPOS=43001628;//kernel.BodyActor:1628
              _this.width=_this.height=_this.radius*2;
              
            }
            //$LASTPOS=43001664;//kernel.BodyActor:1664
            fps = wworld.fps;
            
            //$LASTPOS=43001689;//kernel.BodyActor:1689
            r = _this.rotation;
            _this.fiber$bvec(_thread, _this.defv(_this.vx*fps,0), _this.defv(_this.vy*fps,0));
            __pc=5;return;
          case 5:
            ve=_thread.retVal;
            _this.fiber$defv(_thread, _this.vrotation, 0);
            __pc=6;return;
          case 6:
            vr=_thread.retVal;
            
            //$LASTPOS=43001771;//kernel.BodyActor:1771
            _this.body=_this.world.CreateBody(bodyDef);
            //$LASTPOS=43001808;//kernel.BodyActor:1808
            _this.body.CreateFixture(fixDef);
            //$LASTPOS=43001841;//kernel.BodyActor:1841
            _this.body.SetUserData(_this);
            //$LASTPOS=43001870;//kernel.BodyActor:1870
            _this.body.SetLinearVelocity(ve);
            //$LASTPOS=43001903;//kernel.BodyActor:1903
            _this.rotation=r;
            //$LASTPOS=43001920;//kernel.BodyActor:1920
            _this.vrotation=vr;
            //$LASTPOS=43001939;//kernel.BodyActor:1939
            _this.fireEvent("createBody");
            _thread.exit(_this);return;
          }
        }
      });
    },
    allContactPoints :function _trc_BodyActor_allContactPoints(klass) {
      "use strict";
      var _this=this;
      var res;
      var m;
      var point;
      var w;
      var c;
      var a;
      var b;
      
      //$LASTPOS=43002000;//kernel.BodyActor:2000
      _this.initBody();
      //$LASTPOS=43002017;//kernel.BodyActor:2017
      res = [];
      
      //$LASTPOS=43002042;//kernel.BodyActor:2042
      w = _this.getWorld();
      
      //$LASTPOS=43002065;//kernel.BodyActor:2065
      //$LASTPOS=43002070;//kernel.BodyActor:2070
      c = _this.world.GetContactList();
      for (; c ; c=c.GetNext()) {
        {
          //$LASTPOS=43002127;//kernel.BodyActor:2127
          if (c.IsTouching()) {
            //$LASTPOS=43002159;//kernel.BodyActor:2159
            c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
            //$LASTPOS=43002231;//kernel.BodyActor:2231
            if (m.m_points[0]) {
              //$LASTPOS=43002269;//kernel.BodyActor:2269
              if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                //$LASTPOS=43002343;//kernel.BodyActor:2343
                point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                
              } else {
                //$LASTPOS=43002518;//kernel.BodyActor:2518
                point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                
              }
              
            } else {
              //$LASTPOS=43002620;//kernel.BodyActor:2620
              point={x: _this.x,y: _this.y};
            }
            //$LASTPOS=43002646;//kernel.BodyActor:2646
            a = c.GetFixtureA().GetBody().GetUserData();
            
            //$LASTPOS=43002706;//kernel.BodyActor:2706
            b = c.GetFixtureB().GetBody().GetUserData();
            
            //$LASTPOS=43002766;//kernel.BodyActor:2766
            if (a===_this) {
              //$LASTPOS=43002799;//kernel.BodyActor:2799
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=43002869;//kernel.BodyActor:2869
                res.push({target: b,manifold: m,x: point.x,y: point.y});
                
              }
              
            } else {
              //$LASTPOS=43002962;//kernel.BodyActor:2962
              if (b===_this) {
                //$LASTPOS=43002995;//kernel.BodyActor:2995
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=43003065;//kernel.BodyActor:3065
                  res.push({target: a,manifold: m,x: point.x,y: point.y});
                  
                }
                
              }
            }
            
          }
        }
      }
      return res;
    },
    fiber$allContactPoints :function _trc_BodyActor_f_allContactPoints(_thread,klass) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var m;
      var point;
      var w;
      var c;
      var a;
      var b;
      
      
      _thread.enter(function _trc_BodyActor_ent_allContactPoints(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43002000;//kernel.BodyActor:2000
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=43002017;//kernel.BodyActor:2017
            res = [];
            
            //$LASTPOS=43002042;//kernel.BodyActor:2042
            _this.fiber$getWorld(_thread);
            __pc=2;return;
          case 2:
            w=_thread.retVal;
            
            //$LASTPOS=43002065;//kernel.BodyActor:2065
            //$LASTPOS=43002070;//kernel.BodyActor:2070
            c = _this.world.GetContactList();
            for (; c ; c=c.GetNext()) {
              {
                //$LASTPOS=43002127;//kernel.BodyActor:2127
                if (c.IsTouching()) {
                  //$LASTPOS=43002159;//kernel.BodyActor:2159
                  c.GetWorldManifold(m=new Box2D.Collision.b2WorldManifold);
                  //$LASTPOS=43002231;//kernel.BodyActor:2231
                  if (m.m_points[0]) {
                    //$LASTPOS=43002269;//kernel.BodyActor:2269
                    if (m.m_points[1]&&m.m_points[1].x&&m.m_points[1].y) {
                      //$LASTPOS=43002343;//kernel.BodyActor:2343
                      point={x: (m.m_points[0].x+m.m_points[1].x)/2*w.scale,y: (m.m_points[0].y+m.m_points[1].y)/2*w.scale};
                      
                    } else {
                      //$LASTPOS=43002518;//kernel.BodyActor:2518
                      point={x: m.m_points[0].x*w.scale,y: m.m_points[0].y*w.scale};
                      
                    }
                    
                  } else {
                    //$LASTPOS=43002620;//kernel.BodyActor:2620
                    point={x: _this.x,y: _this.y};
                  }
                  //$LASTPOS=43002646;//kernel.BodyActor:2646
                  a = c.GetFixtureA().GetBody().GetUserData();
                  
                  //$LASTPOS=43002706;//kernel.BodyActor:2706
                  b = c.GetFixtureB().GetBody().GetUserData();
                  
                  //$LASTPOS=43002766;//kernel.BodyActor:2766
                  if (a===_this) {
                    //$LASTPOS=43002799;//kernel.BodyActor:2799
                    if (! klass||b===klass||b instanceof klass) {
                      //$LASTPOS=43002869;//kernel.BodyActor:2869
                      res.push({target: b,manifold: m,x: point.x,y: point.y});
                      
                    }
                    
                  } else {
                    //$LASTPOS=43002962;//kernel.BodyActor:2962
                    if (b===_this) {
                      //$LASTPOS=43002995;//kernel.BodyActor:2995
                      if (! klass||a===klass||a instanceof klass) {
                        //$LASTPOS=43003065;//kernel.BodyActor:3065
                        res.push({target: a,manifold: m,x: point.x,y: point.y});
                        
                      }
                      
                    }
                  }
                  
                }
              }
            }
            _thread.exit(res);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    contactPoint :function _trc_BodyActor_contactPoint(klass) {
      "use strict";
      var _this=this;
      
      return _this.allContactPoints(klass)[0];
    },
    fiber$contactPoint :function _trc_BodyActor_f_contactPoint(_thread,klass) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.allContactPoints(klass)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    allContact :function _trc_BodyActor_allContact(klass) {
      "use strict";
      var _this=this;
      
      return _this.allContacts(klass);
    },
    fiber$allContact :function _trc_BodyActor_f_allContact(_thread,klass) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.allContacts(klass);return;
      
      
      _thread.retVal=_this;return;
    },
    allContacts :function _trc_BodyActor_allContacts(klass) {
      "use strict";
      var _this=this;
      var res;
      var c;
      var a;
      var b;
      
      //$LASTPOS=43003341;//kernel.BodyActor:3341
      _this.initBody();
      //$LASTPOS=43003358;//kernel.BodyActor:3358
      res = [];
      
      //$LASTPOS=43003375;//kernel.BodyActor:3375
      //$LASTPOS=43003380;//kernel.BodyActor:3380
      c = _this.world.GetContactList();
      for (; c ; c=c.GetNext()) {
        {
          //$LASTPOS=43003437;//kernel.BodyActor:3437
          if (c.IsTouching()) {
            //$LASTPOS=43003472;//kernel.BodyActor:3472
            a = c.GetFixtureA().GetBody().GetUserData();
            
            //$LASTPOS=43003532;//kernel.BodyActor:3532
            b = c.GetFixtureB().GetBody().GetUserData();
            
            //$LASTPOS=43003592;//kernel.BodyActor:3592
            if (a===_this) {
              //$LASTPOS=43003625;//kernel.BodyActor:3625
              if (! klass||b===klass||b instanceof klass) {
                //$LASTPOS=43003695;//kernel.BodyActor:3695
                res.push(b);
                
              }
              
            } else {
              //$LASTPOS=43003747;//kernel.BodyActor:3747
              if (b===_this) {
                //$LASTPOS=43003780;//kernel.BodyActor:3780
                if (! klass||a===klass||a instanceof klass) {
                  //$LASTPOS=43003850;//kernel.BodyActor:3850
                  res.push(a);
                  
                }
                
              }
            }
            
          }
        }
      }
      return res;
    },
    fiber$allContacts :function _trc_BodyActor_f_allContacts(_thread,klass) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var c;
      var a;
      var b;
      
      
      _thread.enter(function _trc_BodyActor_ent_allContacts(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43003341;//kernel.BodyActor:3341
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=43003358;//kernel.BodyActor:3358
            res = [];
            
            //$LASTPOS=43003375;//kernel.BodyActor:3375
            //$LASTPOS=43003380;//kernel.BodyActor:3380
            c = _this.world.GetContactList();
            for (; c ; c=c.GetNext()) {
              {
                //$LASTPOS=43003437;//kernel.BodyActor:3437
                if (c.IsTouching()) {
                  //$LASTPOS=43003472;//kernel.BodyActor:3472
                  a = c.GetFixtureA().GetBody().GetUserData();
                  
                  //$LASTPOS=43003532;//kernel.BodyActor:3532
                  b = c.GetFixtureB().GetBody().GetUserData();
                  
                  //$LASTPOS=43003592;//kernel.BodyActor:3592
                  if (a===_this) {
                    //$LASTPOS=43003625;//kernel.BodyActor:3625
                    if (! klass||b===klass||b instanceof klass) {
                      //$LASTPOS=43003695;//kernel.BodyActor:3695
                      res.push(b);
                      
                    }
                    
                  } else {
                    //$LASTPOS=43003747;//kernel.BodyActor:3747
                    if (b===_this) {
                      //$LASTPOS=43003780;//kernel.BodyActor:3780
                      if (! klass||a===klass||a instanceof klass) {
                        //$LASTPOS=43003850;//kernel.BodyActor:3850
                        res.push(a);
                        
                      }
                      
                    }
                  }
                  
                }
              }
            }
            _thread.exit(res);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    applyForce :function _trc_BodyActor_applyForce(fx,fy,px,py) {
      "use strict";
      var _this=this;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=43003968;//kernel.BodyActor:3968
      _this.initBody();
      //$LASTPOS=43003985;//kernel.BodyActor:3985
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=43004029;//kernel.BodyActor:4029
      scale = _this.getWorld().scale;
      
      //$LASTPOS=43004062;//kernel.BodyActor:4062
      fps = 60;
      
      //$LASTPOS=43004079;//kernel.BodyActor:4079
      _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
    },
    fiber$applyForce :function _trc_BodyActor_f_applyForce(_thread,fx,fy,px,py) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      var scale;
      var fps;
      
      
      _thread.enter(function _trc_BodyActor_ent_applyForce(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43003968;//kernel.BodyActor:3968
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=43003985;//kernel.BodyActor:3985
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=43004029;//kernel.BodyActor:4029
            scale = _this.getWorld().scale;
            
            //$LASTPOS=43004062;//kernel.BodyActor:4062
            fps = 60;
            
            //$LASTPOS=43004079;//kernel.BodyActor:4079
            _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
            _thread.exit(_this);return;
          }
        }
      });
    },
    applyImpulse :function _trc_BodyActor_applyImpulse(fx,fy,px,py) {
      "use strict";
      var _this=this;
      var b2Vec2;
      var scale;
      var fps;
      
      //$LASTPOS=43004173;//kernel.BodyActor:4173
      _this.initBody();
      //$LASTPOS=43004190;//kernel.BodyActor:4190
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=43004234;//kernel.BodyActor:4234
      scale = _this.getWorld().scale;
      
      //$LASTPOS=43004267;//kernel.BodyActor:4267
      fps = 60;
      
      //$LASTPOS=43004284;//kernel.BodyActor:4284
      _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
    },
    fiber$applyImpulse :function _trc_BodyActor_f_applyImpulse(_thread,fx,fy,px,py) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2Vec2;
      var scale;
      var fps;
      
      
      _thread.enter(function _trc_BodyActor_ent_applyImpulse(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43004173;//kernel.BodyActor:4173
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=43004190;//kernel.BodyActor:4190
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=43004234;//kernel.BodyActor:4234
            scale = _this.getWorld().scale;
            
            //$LASTPOS=43004267;//kernel.BodyActor:4267
            fps = 60;
            
            //$LASTPOS=43004284;//kernel.BodyActor:4284
            _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
            _thread.exit(_this);return;
          }
        }
      });
    },
    applyTorque :function _trc_BodyActor_applyTorque(a) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43004371;//kernel.BodyActor:4371
      _this.initBody();
      //$LASTPOS=43004388;//kernel.BodyActor:4388
      _this.body.ApplyTorque(a);
    },
    fiber$applyTorque :function _trc_BodyActor_f_applyTorque(_thread,a) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_BodyActor_ent_applyTorque(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43004371;//kernel.BodyActor:4371
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=43004388;//kernel.BodyActor:4388
            _this.body.ApplyTorque(a);
            _thread.exit(_this);return;
          }
        }
      });
    },
    moveBy :function _trc_BodyActor_moveBy(dx,dy) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=43004435;//kernel.BodyActor:4435
      _this.initBody();
      //$LASTPOS=43004452;//kernel.BodyActor:4452
      pos = _this.body.GetPosition();
      
      //$LASTPOS=43004485;//kernel.BodyActor:4485
      pos.x+=dx/_this.scale;
      //$LASTPOS=43004507;//kernel.BodyActor:4507
      pos.y+=dy/_this.scale;
      //$LASTPOS=43004529;//kernel.BodyActor:4529
      _this.body.SetPosition(pos);
    },
    fiber$moveBy :function _trc_BodyActor_f_moveBy(_thread,dx,dy) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var pos;
      
      
      _thread.enter(function _trc_BodyActor_ent_moveBy(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43004435;//kernel.BodyActor:4435
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=43004452;//kernel.BodyActor:4452
            pos = _this.body.GetPosition();
            
            //$LASTPOS=43004485;//kernel.BodyActor:4485
            pos.x+=dx/_this.scale;
            //$LASTPOS=43004507;//kernel.BodyActor:4507
            pos.y+=dy/_this.scale;
            //$LASTPOS=43004529;//kernel.BodyActor:4529
            _this.body.SetPosition(pos);
            _thread.exit(_this);return;
          }
        }
      });
    },
    contactTo :function _trc_BodyActor_contactTo(t) {
      "use strict";
      var _this=this;
      
      return _this.allContact(t)[0];
    },
    fiber$contactTo :function _trc_BodyActor_f_contactTo(_thread,t) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.allContact(t)[0];return;
      
      
      _thread.retVal=_this;return;
    },
    die :function _trc_BodyActor_die() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43004620;//kernel.BodyActor:4620
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
      //$LASTPOS=43004638;//kernel.BodyActor:4638
      if (_this.world) {
        //$LASTPOS=43004649;//kernel.BodyActor:4649
        _this.world.DestroyBody(_this.body);
      }
    },
    addRevoluteJoint :function _trc_BodyActor_addRevoluteJoint(params) {
      "use strict";
      var _this=this;
      var px;
      var py;
      var wworld;
      var scale;
      var world;
      var b2BodyDef;
      var b2Body;
      var JDC;
      var jd;
      var bodyDef;
      var bodyB;
      var b2Vec2;
      
      //$LASTPOS=43004711;//kernel.BodyActor:4711
      _this.initBody();
      //$LASTPOS=43004758;//kernel.BodyActor:4758
      params=params||{};
      //$LASTPOS=43004782;//kernel.BodyActor:4782
      px = params.x||_this.x;
      
      //$LASTPOS=43004807;//kernel.BodyActor:4807
      py = params.y||_this.y;
      
      //$LASTPOS=43004832;//kernel.BodyActor:4832
      wworld = _this.getWorld();
      
      //$LASTPOS=43004874;//kernel.BodyActor:4874
      scale = wworld.scale;
      
      //$LASTPOS=43004903;//kernel.BodyActor:4903
      world = wworld.world;
      
      //$LASTPOS=43004932;//kernel.BodyActor:4932
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      
      //$LASTPOS=43004979;//kernel.BodyActor:4979
      b2Body = Box2D.Dynamics.b2Body;
      
      //$LASTPOS=43005020;//kernel.BodyActor:5020
      JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
      
      //$LASTPOS=43005075;//kernel.BodyActor:5075
      jd = new JDC;
      
      //$LASTPOS=43005096;//kernel.BodyActor:5096
      bodyDef = new b2BodyDef;
      
      //$LASTPOS=43005130;//kernel.BodyActor:5130
      bodyDef.type=b2Body.b2_staticBody;
      //$LASTPOS=43005172;//kernel.BodyActor:5172
      bodyDef.position.x=px/scale;
      //$LASTPOS=43005209;//kernel.BodyActor:5209
      bodyDef.position.y=py/scale;
      //$LASTPOS=43005246;//kernel.BodyActor:5246
      bodyB = world.CreateBody(bodyDef);
      
      //$LASTPOS=43005288;//kernel.BodyActor:5288
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=43005332;//kernel.BodyActor:5332
      jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
      //$LASTPOS=43005395;//kernel.BodyActor:5395
      if (params.lowerAngle&&params.upperAngle) {
        //$LASTPOS=43005449;//kernel.BodyActor:5449
        jd.lowerAngle=_this.rad(params.lowerAngle);
        //$LASTPOS=43005497;//kernel.BodyActor:5497
        jd.upperAngle=_this.rad(params.upperAngle);
        //$LASTPOS=43005545;//kernel.BodyActor:5545
        jd.enableLimit=true;
        
      }
      //$LASTPOS=43005580;//kernel.BodyActor:5580
      world.CreateJoint(jd);
    },
    fiber$addRevoluteJoint :function _trc_BodyActor_f_addRevoluteJoint(_thread,params) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var px;
      var py;
      var wworld;
      var scale;
      var world;
      var b2BodyDef;
      var b2Body;
      var JDC;
      var jd;
      var bodyDef;
      var bodyB;
      var b2Vec2;
      
      
      _thread.enter(function _trc_BodyActor_ent_addRevoluteJoint(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43004711;//kernel.BodyActor:4711
            _this.fiber$initBody(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=43004758;//kernel.BodyActor:4758
            params=params||{};
            //$LASTPOS=43004782;//kernel.BodyActor:4782
            px = params.x||_this.x;
            
            //$LASTPOS=43004807;//kernel.BodyActor:4807
            py = params.y||_this.y;
            
            //$LASTPOS=43004832;//kernel.BodyActor:4832
            _this.fiber$getWorld(_thread);
            __pc=2;return;
          case 2:
            wworld=_thread.retVal;
            
            //$LASTPOS=43004874;//kernel.BodyActor:4874
            scale = wworld.scale;
            
            //$LASTPOS=43004903;//kernel.BodyActor:4903
            world = wworld.world;
            
            //$LASTPOS=43004932;//kernel.BodyActor:4932
            b2BodyDef = Box2D.Dynamics.b2BodyDef;
            
            //$LASTPOS=43004979;//kernel.BodyActor:4979
            b2Body = Box2D.Dynamics.b2Body;
            
            //$LASTPOS=43005020;//kernel.BodyActor:5020
            JDC = Box2D.Dynamics.Joints.b2RevoluteJointDef;
            
            //$LASTPOS=43005075;//kernel.BodyActor:5075
            jd = new JDC;
            
            //$LASTPOS=43005096;//kernel.BodyActor:5096
            bodyDef = new b2BodyDef;
            
            //$LASTPOS=43005130;//kernel.BodyActor:5130
            bodyDef.type=b2Body.b2_staticBody;
            //$LASTPOS=43005172;//kernel.BodyActor:5172
            bodyDef.position.x=px/scale;
            //$LASTPOS=43005209;//kernel.BodyActor:5209
            bodyDef.position.y=py/scale;
            //$LASTPOS=43005246;//kernel.BodyActor:5246
            bodyB = world.CreateBody(bodyDef);
            
            //$LASTPOS=43005288;//kernel.BodyActor:5288
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=43005332;//kernel.BodyActor:5332
            jd.Initialize(_this.body,bodyB,new b2Vec2(px/scale,py/scale));
            //$LASTPOS=43005395;//kernel.BodyActor:5395
            if (params.lowerAngle&&params.upperAngle) {
              //$LASTPOS=43005449;//kernel.BodyActor:5449
              jd.lowerAngle=_this.rad(params.lowerAngle);
              //$LASTPOS=43005497;//kernel.BodyActor:5497
              jd.upperAngle=_this.rad(params.upperAngle);
              //$LASTPOS=43005545;//kernel.BodyActor:5545
              jd.enableLimit=true;
              
            }
            //$LASTPOS=43005580;//kernel.BodyActor:5580
            world.CreateJoint(jd);
            _thread.exit(_this);return;
          }
        }
      });
    },
    __getter__rotation :function _trc_BodyActor___getter__rotation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43005628;//kernel.BodyActor:5628
      if (! _this.body||_this.manualRotation) {
        return _this._rotation;
      }
      return _this.deg(_this.body.GetAngle());
    },
    __setter__rotation :function _trc_BodyActor___setter__rotation(r) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43005732;//kernel.BodyActor:5732
      r=r||0;
      //$LASTPOS=43005745;//kernel.BodyActor:5745
      if (! _this.body||_this.manualRotation) {
        return _this._rotation=r;
      }
      //$LASTPOS=43005799;//kernel.BodyActor:5799
      _this.body.SetAngle(_this.rad(r));
    },
    __getter__x :function _trc_BodyActor___getter__x() {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=43005839;//kernel.BodyActor:5839
      if (! _this.body) {
        return _this._x;
      }
      //$LASTPOS=43005866;//kernel.BodyActor:5866
      pos = _this.body.GetPosition();
      
      return pos.x*_this.scale;
    },
    __setter__x :function _trc_BodyActor___setter__x(v) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=43005935;//kernel.BodyActor:5935
      if (! _this.body) {
        return _this._x=v;
      }
      //$LASTPOS=43005964;//kernel.BodyActor:5964
      v=v||0;
      //$LASTPOS=43005977;//kernel.BodyActor:5977
      pos = _this.body.GetPosition();
      
      //$LASTPOS=43006010;//kernel.BodyActor:6010
      pos.x=v/_this.scale;
      //$LASTPOS=43006030;//kernel.BodyActor:6030
      _this.body.SetPosition(pos);
    },
    __getter__y :function _trc_BodyActor___getter__y() {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=43006067;//kernel.BodyActor:6067
      if (! _this.body) {
        return _this._y;
      }
      //$LASTPOS=43006094;//kernel.BodyActor:6094
      pos = _this.body.GetPosition();
      
      return pos.y*_this.scale;
    },
    __setter__y :function _trc_BodyActor___setter__y(v) {
      "use strict";
      var _this=this;
      var pos;
      
      //$LASTPOS=43006163;//kernel.BodyActor:6163
      if (! _this.body) {
        return _this._y=v;
      }
      //$LASTPOS=43006192;//kernel.BodyActor:6192
      v=v||0;
      //$LASTPOS=43006205;//kernel.BodyActor:6205
      pos = _this.body.GetPosition();
      
      //$LASTPOS=43006238;//kernel.BodyActor:6238
      pos.y=v/_this.scale;
      //$LASTPOS=43006258;//kernel.BodyActor:6258
      _this.body.SetPosition(pos);
    },
    __getter__vx :function _trc_BodyActor___getter__vx() {
      "use strict";
      var _this=this;
      var v;
      
      //$LASTPOS=43006298;//kernel.BodyActor:6298
      if (! _this.body) {
        return _this._vx;
      }
      //$LASTPOS=43006326;//kernel.BodyActor:6326
      v = _this.body.GetLinearVelocity();
      
      return v.x*_this.scale/_this.getWorld().fps;
    },
    __setter__vx :function _trc_BodyActor___setter__vx(v) {
      "use strict";
      var _this=this;
      var ve;
      
      //$LASTPOS=43006413;//kernel.BodyActor:6413
      if (! _this.body) {
        return _this._vx=v;
      }
      //$LASTPOS=43006443;//kernel.BodyActor:6443
      v=v||0;
      //$LASTPOS=43006456;//kernel.BodyActor:6456
      ve = _this.body.GetLinearVelocity();
      
      //$LASTPOS=43006494;//kernel.BodyActor:6494
      ve.x=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=43006528;//kernel.BodyActor:6528
      if (v) {
        //$LASTPOS=43006535;//kernel.BodyActor:6535
        _this.body.SetAwake(true);
      }
      //$LASTPOS=43006561;//kernel.BodyActor:6561
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vy :function _trc_BodyActor___getter__vy() {
      "use strict";
      var _this=this;
      var v;
      
      //$LASTPOS=43006606;//kernel.BodyActor:6606
      if (! _this.body) {
        return _this._vy;
      }
      //$LASTPOS=43006634;//kernel.BodyActor:6634
      v = _this.body.GetLinearVelocity();
      
      return v.y*_this.scale/_this.getWorld().fps;
    },
    __setter__vy :function _trc_BodyActor___setter__vy(v) {
      "use strict";
      var _this=this;
      var ve;
      
      //$LASTPOS=43006721;//kernel.BodyActor:6721
      if (! _this.body) {
        return _this._vy=v;
      }
      //$LASTPOS=43006751;//kernel.BodyActor:6751
      ve = _this.body.GetLinearVelocity();
      
      //$LASTPOS=43006789;//kernel.BodyActor:6789
      ve.y=v/_this.scale*_this.getWorld().fps;
      //$LASTPOS=43006823;//kernel.BodyActor:6823
      if (v) {
        //$LASTPOS=43006830;//kernel.BodyActor:6830
        _this.body.SetAwake(true);
      }
      //$LASTPOS=43006856;//kernel.BodyActor:6856
      _this.body.SetLinearVelocity(ve);
    },
    __getter__vrotation :function _trc_BodyActor___getter__vrotation() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43006906;//kernel.BodyActor:6906
      if (! _this.body) {
        return _this._vr;
      }
      return _this.deg(_this.body.GetAngularVelocity()/_this.getWorld().fps);
    },
    __setter__vrotation :function _trc_BodyActor___setter__vrotation(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=43007012;//kernel.BodyActor:7012
      if (! _this.body) {
        return _this._vr=v;
      }
      //$LASTPOS=43007042;//kernel.BodyActor:7042
      v=v||0;
      //$LASTPOS=43007055;//kernel.BodyActor:7055
      if (v) {
        //$LASTPOS=43007062;//kernel.BodyActor:7062
        _this.body.SetAwake(true);
      }
      //$LASTPOS=43007088;//kernel.BodyActor:7088
      _this.body.SetAngularVelocity(_this.rad(v*_this.getWorld().fps));
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"getWorld":{"nowait":false},"update":{"nowait":false},"initBody":{"nowait":false},"allContactPoints":{"nowait":false},"contactPoint":{"nowait":false},"allContact":{"nowait":false},"allContacts":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"addRevoluteJoint":{"nowait":false},"__getter__rotation":{"nowait":true},"__setter__rotation":{"nowait":true},"__getter__x":{"nowait":true},"__setter__x":{"nowait":true},"__getter__y":{"nowait":true},"__setter__y":{"nowait":true},"__getter__vx":{"nowait":true},"__setter__vx":{"nowait":true},"__getter__vy":{"nowait":true},"__setter__vy":{"nowait":true},"__getter__vrotation":{"nowait":true},"__setter__vrotation":{"nowait":true}},"fields":{"body":{},"world":{},"density":{},"friction":{},"restitution":{},"isStatic":{},"shape":{},"vx":{},"vy":{},"vrotation":{},"manualRotation":{},"_rotation":{},"_x":{},"_y":{},"_vx":{},"_vy":{},"_vr":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T2Body',
  shortName: 'T2Body',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_T2Body_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T2Body_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.T2World',
  shortName: 'T2World',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.kernel.T2Mod],
  methods: {
    main :function _trc_T2World_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44000150;//kernel.T2World:150
      _this.loop();
    },
    fiber$main :function _trc_T2World_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_T2World_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44000150;//kernel.T2World:150
            _this.fiber$loop(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onAppear :function _trc_T2World_onAppear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      //$LASTPOS=44000133;//kernel.T2World:133
      _this.initWorld();
    },
    fiber$onAppear :function _trc_T2World_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000086;//kernel.T2World:86
      Tonyu.globals.$currentProject.requestPlugin("box2d");
      
      _thread.enter(function _trc_T2World_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44000133;//kernel.T2World:133
            _this.fiber$initWorld(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initWorld :function _trc_T2World_initWorld() {
      "use strict";
      var _this=this;
      var b2World;
      var b2Vec2;
      
      //$LASTPOS=44000183;//kernel.T2World:183
      _this.gravity=_this.defv(_this.gravity,9.8);
      //$LASTPOS=44000216;//kernel.T2World:216
      _this.gravityX=_this.defv(_this.gravityX,0);
      //$LASTPOS=44000249;//kernel.T2World:249
      _this.fps=Tonyu.globals.$Boot.getFrameRate();
      //$LASTPOS=44000280;//kernel.T2World:280
      b2World = Box2D.Dynamics.b2World;
      
      //$LASTPOS=44000323;//kernel.T2World:323
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      
      //$LASTPOS=44000367;//kernel.T2World:367
      _this.scale=_this.scale||32;
      //$LASTPOS=44000391;//kernel.T2World:391
      _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
      //$LASTPOS=44000516;//kernel.T2World:516
      Tonyu.globals.$t2World=_this;
      //$LASTPOS=44000536;//kernel.T2World:536
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
      //$LASTPOS=44000572;//kernel.T2World:572
      _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
    },
    fiber$initWorld :function _trc_T2World_f_initWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b2World;
      var b2Vec2;
      
      
      _thread.enter(function _trc_T2World_ent_initWorld(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44000183;//kernel.T2World:183
            _this.fiber$defv(_thread, _this.gravity, 9.8);
            __pc=1;return;
          case 1:
            _this.gravity=_thread.retVal;
            
            //$LASTPOS=44000216;//kernel.T2World:216
            _this.fiber$defv(_thread, _this.gravityX, 0);
            __pc=2;return;
          case 2:
            _this.gravityX=_thread.retVal;
            
            //$LASTPOS=44000249;//kernel.T2World:249
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=44000280;//kernel.T2World:280
            b2World = Box2D.Dynamics.b2World;
            
            //$LASTPOS=44000323;//kernel.T2World:323
            b2Vec2 = Box2D.Common.Math.b2Vec2;
            
            //$LASTPOS=44000367;//kernel.T2World:367
            _this.scale=_this.scale||32;
            //$LASTPOS=44000391;//kernel.T2World:391
            _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
            //$LASTPOS=44000516;//kernel.T2World:516
            Tonyu.globals.$t2World=_this;
            //$LASTPOS=44000536;//kernel.T2World:536
            Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
            //$LASTPOS=44000572;//kernel.T2World:572
            _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
            _thread.exit(_this);return;
          }
        }
      });
    },
    releaseWorld :function _trc_T2World_releaseWorld() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=44000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
    },
    fiber$releaseWorld :function _trc_T2World_f_releaseWorld(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000623;//kernel.T2World:623
      if (Tonyu.globals.$t2World===_this) {
        //$LASTPOS=44000644;//kernel.T2World:644
        Tonyu.globals.$t2World=null;
      }
      
      _thread.retVal=_this;return;
    },
    loop :function _trc_T2World_loop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=44000680;//kernel.T2World:680
      while (true) {
        //$LASTPOS=44000703;//kernel.T2World:703
        _this.fps=Tonyu.globals.$Boot.getFrameRate();
        //$LASTPOS=44000738;//kernel.T2World:738
        _this.world.Step(1/_this.fps,10,10);
        //$LASTPOS=44000922;//kernel.T2World:922
        _this.world.ClearForces();
        //$LASTPOS=44000976;//kernel.T2World:976
        _this.update();
        
      }
    },
    fiber$loop :function _trc_T2World_f_loop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_T2World_ent_loop(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44000680;//kernel.T2World:680
          case 1:
            //$LASTPOS=44000703;//kernel.T2World:703
            _this.fps=Tonyu.globals.$Boot.getFrameRate();
            //$LASTPOS=44000738;//kernel.T2World:738
            _this.world.Step(1/_this.fps,10,10);
            //$LASTPOS=44000922;//kernel.T2World:922
            _this.world.ClearForces();
            //$LASTPOS=44000976;//kernel.T2World:976
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    updatePos :function _trc_T2World_updatePos() {
      "use strict";
      var _this=this;
      var b;
      var d;
      
      //$LASTPOS=44001017;//kernel.T2World:1017
      //$LASTPOS=44001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      for (; b ; b=b.GetNext()) {
        {
          //$LASTPOS=44001076;//kernel.T2World:1076
          d = b.GetUserData();
          
          //$LASTPOS=44001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=44001114;//kernel.T2World:1114
            d.updatePos();
          }
        }
      }
    },
    fiber$updatePos :function _trc_T2World_f_updatePos(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b;
      var d;
      
      //$LASTPOS=44001017;//kernel.T2World:1017
      //$LASTPOS=44001022;//kernel.T2World:1022
      b = _this.world.GetBodyList();
      for (; b ; b=b.GetNext()) {
        {
          //$LASTPOS=44001076;//kernel.T2World:1076
          d = b.GetUserData();
          
          //$LASTPOS=44001108;//kernel.T2World:1108
          if (d) {
            //$LASTPOS=44001114;//kernel.T2World:1114
            d.updatePos();
          }
        }
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"initWorld":{"nowait":false},"releaseWorld":{"nowait":false},"loop":{"nowait":false},"updatePos":{"nowait":false}},"fields":{"gravity":{},"gravityX":{},"fps":{},"world":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T2MediaPlayer',
  shortName: 'T2MediaPlayer',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_T2MediaPlayer_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T2MediaPlayer_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_T2MediaPlayer_initialize() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000069;//kernel.T2MediaPlayer:69
      _this.initT2MediaPlayer();
    },
    initT2MediaPlayer :function _trc_T2MediaPlayer_initT2MediaPlayer() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000124;//kernel.T2MediaPlayer:124
      if (! Tonyu.globals.$t2MediaLib) {
        //$LASTPOS=45000153;//kernel.T2MediaPlayer:153
        Tonyu.globals.$t2MediaLib=new T2MediaLib();
        
      }
      //$LASTPOS=45000197;//kernel.T2MediaPlayer:197
      _this.bgmPlayerMax=Tonyu.globals.$t2MediaLib.bgmPlayerMax;
    },
    fiber$initT2MediaPlayer :function _trc_T2MediaPlayer_f_initT2MediaPlayer(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000124;//kernel.T2MediaPlayer:124
      if (! Tonyu.globals.$t2MediaLib) {
        //$LASTPOS=45000153;//kernel.T2MediaPlayer:153
        Tonyu.globals.$t2MediaLib=new T2MediaLib();
        
      }
      //$LASTPOS=45000197;//kernel.T2MediaPlayer:197
      _this.bgmPlayerMax=Tonyu.globals.$t2MediaLib.bgmPlayerMax;
      
      _thread.retVal=_this;return;
    },
    allClearSoundData :function _trc_T2MediaPlayer_allClearSoundData() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000272;//kernel.T2MediaPlayer:272
      Tonyu.globals.$t2MediaLib.allResetBGM();
      //$LASTPOS=45000304;//kernel.T2MediaPlayer:304
      Tonyu.globals.$t2MediaLib.allClearSoundData();
    },
    fiber$allClearSoundData :function _trc_T2MediaPlayer_f_allClearSoundData(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000272;//kernel.T2MediaPlayer:272
      Tonyu.globals.$t2MediaLib.allResetBGM();
      //$LASTPOS=45000304;//kernel.T2MediaPlayer:304
      Tonyu.globals.$t2MediaLib.allClearSoundData();
      
      _thread.retVal=_this;return;
    },
    clearSoundData :function _trc_T2MediaPlayer_clearSoundData(idx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000371;//kernel.T2MediaPlayer:371
      Tonyu.globals.$t2MediaLib.clearSoundData(idx);
    },
    fiber$clearSoundData :function _trc_T2MediaPlayer_f_clearSoundData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000371;//kernel.T2MediaPlayer:371
      Tonyu.globals.$t2MediaLib.clearSoundData(idx);
      
      _thread.retVal=_this;return;
    },
    allRemoveDecodedSoundData :function _trc_T2MediaPlayer_allRemoveDecodedSoundData() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000446;//kernel.T2MediaPlayer:446
      Tonyu.globals.$t2MediaLib.allRemoveDecodedSoundData();
    },
    fiber$allRemoveDecodedSoundData :function _trc_T2MediaPlayer_f_allRemoveDecodedSoundData(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000446;//kernel.T2MediaPlayer:446
      Tonyu.globals.$t2MediaLib.allRemoveDecodedSoundData();
      
      _thread.retVal=_this;return;
    },
    removeDecodedSoundData :function _trc_T2MediaPlayer_removeDecodedSoundData(idx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000529;//kernel.T2MediaPlayer:529
      Tonyu.globals.$t2MediaLib.removeDecodedSoundData(idx);
    },
    fiber$removeDecodedSoundData :function _trc_T2MediaPlayer_f_removeDecodedSoundData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000529;//kernel.T2MediaPlayer:529
      Tonyu.globals.$t2MediaLib.removeDecodedSoundData(idx);
      
      _thread.retVal=_this;return;
    },
    getMasterVolume :function _trc_T2MediaPlayer_getMasterVolume() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getMasterVolume()*128;
    },
    fiber$getMasterVolume :function _trc_T2MediaPlayer_f_getMasterVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getMasterVolume()*128;return;
      
      
      _thread.retVal=_this;return;
    },
    setMasterVolume :function _trc_T2MediaPlayer_setMasterVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000681;//kernel.T2MediaPlayer:681
      if (typeof  vol==="number") {
        //$LASTPOS=45000721;//kernel.T2MediaPlayer:721
        vol/=128;
        //$LASTPOS=45000742;//kernel.T2MediaPlayer:742
        if (vol<0) {
          //$LASTPOS=45000757;//kernel.T2MediaPlayer:757
          vol=0;
        }
        
      } else {
        return Tonyu.globals.$t2MediaLib.setMasterVolume(Tonyu.globals.$t2MediaLib.getMasterVolume());
        
      }
      return Tonyu.globals.$t2MediaLib.setMasterVolume(vol);
    },
    fiber$setMasterVolume :function _trc_T2MediaPlayer_f_setMasterVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000681;//kernel.T2MediaPlayer:681
      if (typeof  vol==="number") {
        //$LASTPOS=45000721;//kernel.T2MediaPlayer:721
        vol/=128;
        //$LASTPOS=45000742;//kernel.T2MediaPlayer:742
        if (vol<0) {
          //$LASTPOS=45000757;//kernel.T2MediaPlayer:757
          vol=0;
        }
        
      } else {
        _thread.retVal=Tonyu.globals.$t2MediaLib.setMasterVolume(Tonyu.globals.$t2MediaLib.getMasterVolume());return;
        
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setMasterVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    loadSound :function _trc_T2MediaPlayer_loadSound(idx,src,callbacks) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45000966;//kernel.T2MediaPlayer:966
      Tonyu.globals.$t2MediaLib.loadSound(idx,src,callbacks);
    },
    fiber$loadSound :function _trc_T2MediaPlayer_f_loadSound(_thread,idx,src,callbacks) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000966;//kernel.T2MediaPlayer:966
      Tonyu.globals.$t2MediaLib.loadSound(idx,src,callbacks);
      
      _thread.retVal=_this;return;
    },
    __getter__available :function _trc_T2MediaPlayer___getter__available() {
      "use strict";
      var _this=this;
      
      return ! ! Tonyu.globals.$t2MediaLib.context;
    },
    loadFromProject :function _trc_T2MediaPlayer_loadFromProject(prj) {
      "use strict";
      var _this=this;
      var r;
      var jobs;
      var cnt;
      var callbacks;
      var s;
      var name;
      var url;
      var func;
      var i;
      
      //$LASTPOS=45001109;//kernel.T2MediaPlayer:1109
      if (! _this.available) {
        return _this;
      }
      //$LASTPOS=45001138;//kernel.T2MediaPlayer:1138
      r = prj.getResource();
      
      //$LASTPOS=45001168;//kernel.T2MediaPlayer:1168
      if (! r||! r.sounds) {
        return _this;
      }
      //$LASTPOS=45001202;//kernel.T2MediaPlayer:1202
      if (r.sounds<=0) {
        return _this;
      }
      //$LASTPOS=45001240;//kernel.T2MediaPlayer:1240
      _this.progressNoLog("Loading sounds...[0/"+r.sounds.length+"]");
      //$LASTPOS=45001321;//kernel.T2MediaPlayer:1321
      jobs = 6;
      
      //$LASTPOS=45001338;//kernel.T2MediaPlayer:1338
      cnt = 0;
      
      //$LASTPOS=45001354;//kernel.T2MediaPlayer:1354
      callbacks = {};
      
      
      //$LASTPOS=45001400;//kernel.T2MediaPlayer:1400
      func = (function anonymous_1411(idx,errorID) {
        var s;
        var name;
        var url;
        
        //$LASTPOS=45001444;//kernel.T2MediaPlayer:1444
        if (errorID) {
          //$LASTPOS=45001472;//kernel.T2MediaPlayer:1472
          _this.console.log(errorID);
          //$LASTPOS=45001551;//kernel.T2MediaPlayer:1551
          Tonyu.setGlobal(idx,"ERROR");
          
        } else {
          //$LASTPOS=45001659;//kernel.T2MediaPlayer:1659
          Tonyu.setGlobal(idx,idx);
          
        }
        //$LASTPOS=45001716;//kernel.T2MediaPlayer:1716
        cnt++;
        //$LASTPOS=45001733;//kernel.T2MediaPlayer:1733
        if (cnt>=r.sounds.length) {
          return _this;
        }
        //$LASTPOS=45001778;//kernel.T2MediaPlayer:1778
        _this.progressNoLog("Loading sounds...["+(cnt+1)+"/"+r.sounds.length+"]");
        //$LASTPOS=45001856;//kernel.T2MediaPlayer:1856
        s = r.sounds[cnt];
        
        //$LASTPOS=45001888;//kernel.T2MediaPlayer:1888
        name = s.name;
        
        //$LASTPOS=45001914;//kernel.T2MediaPlayer:1914
        url = Tonyu.Assets.resolve(s.url,prj);
        
        //$LASTPOS=45001965;//kernel.T2MediaPlayer:1965
        _this.loadSound(name,url,callbacks);
      });
      
      //$LASTPOS=45002011;//kernel.T2MediaPlayer:2011
      callbacks.succ=func;
      //$LASTPOS=45002037;//kernel.T2MediaPlayer:2037
      callbacks.err=func;
      //$LASTPOS=45002062;//kernel.T2MediaPlayer:2062
      //$LASTPOS=45002067;//kernel.T2MediaPlayer:2067
      i = 0;
      for (; i<jobs ; i++) {
        {
          //$LASTPOS=45002100;//kernel.T2MediaPlayer:2100
          if (i>=r.sounds.length) {
            break;
            
          }
          //$LASTPOS=45002142;//kernel.T2MediaPlayer:2142
          s=r.sounds[i];
          //$LASTPOS=45002168;//kernel.T2MediaPlayer:2168
          name=s.name;
          //$LASTPOS=45002190;//kernel.T2MediaPlayer:2190
          url=Tonyu.Assets.resolve(s.url,prj);
          //$LASTPOS=45002237;//kernel.T2MediaPlayer:2237
          _this.loadSound(name,url,callbacks);
        }
      }
      //$LASTPOS=45002282;//kernel.T2MediaPlayer:2282
      while (cnt<r.sounds.length) {
        //$LASTPOS=45002323;//kernel.T2MediaPlayer:2323
        _this.update();
        
      }
    },
    fiber$loadFromProject :function _trc_T2MediaPlayer_f_loadFromProject(_thread,prj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var r;
      var jobs;
      var cnt;
      var callbacks;
      var s;
      var name;
      var url;
      var func;
      var i;
      
      //$LASTPOS=45001109;//kernel.T2MediaPlayer:1109
      if (! _this.available) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=45001138;//kernel.T2MediaPlayer:1138
      r = prj.getResource();
      
      //$LASTPOS=45001168;//kernel.T2MediaPlayer:1168
      if (! r||! r.sounds) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=45001202;//kernel.T2MediaPlayer:1202
      if (r.sounds<=0) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=45001240;//kernel.T2MediaPlayer:1240
      _this.progressNoLog("Loading sounds...[0/"+r.sounds.length+"]");
      //$LASTPOS=45001321;//kernel.T2MediaPlayer:1321
      jobs = 6;
      
      //$LASTPOS=45001338;//kernel.T2MediaPlayer:1338
      cnt = 0;
      
      //$LASTPOS=45001354;//kernel.T2MediaPlayer:1354
      callbacks = {};
      
      
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadFromProject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45001400;//kernel.T2MediaPlayer:1400
            func = (function anonymous_1411(idx,errorID) {
              var s;
              var name;
              var url;
              
              //$LASTPOS=45001444;//kernel.T2MediaPlayer:1444
              if (errorID) {
                //$LASTPOS=45001472;//kernel.T2MediaPlayer:1472
                _this.console.log(errorID);
                //$LASTPOS=45001551;//kernel.T2MediaPlayer:1551
                Tonyu.setGlobal(idx,"ERROR");
                
              } else {
                //$LASTPOS=45001659;//kernel.T2MediaPlayer:1659
                Tonyu.setGlobal(idx,idx);
                
              }
              //$LASTPOS=45001716;//kernel.T2MediaPlayer:1716
              cnt++;
              //$LASTPOS=45001733;//kernel.T2MediaPlayer:1733
              if (cnt>=r.sounds.length) {
                return _this;
              }
              //$LASTPOS=45001778;//kernel.T2MediaPlayer:1778
              _this.progressNoLog("Loading sounds...["+(cnt+1)+"/"+r.sounds.length+"]");
              //$LASTPOS=45001856;//kernel.T2MediaPlayer:1856
              s = r.sounds[cnt];
              
              //$LASTPOS=45001888;//kernel.T2MediaPlayer:1888
              name = s.name;
              
              //$LASTPOS=45001914;//kernel.T2MediaPlayer:1914
              url = Tonyu.Assets.resolve(s.url,prj);
              
              //$LASTPOS=45001965;//kernel.T2MediaPlayer:1965
              _this.loadSound(name,url,callbacks);
            });
            
            //$LASTPOS=45002011;//kernel.T2MediaPlayer:2011
            callbacks.succ=func;
            //$LASTPOS=45002037;//kernel.T2MediaPlayer:2037
            callbacks.err=func;
            //$LASTPOS=45002062;//kernel.T2MediaPlayer:2062
            //$LASTPOS=45002067;//kernel.T2MediaPlayer:2067
            i = 0;
            
          case 1:
            if (!(i<jobs)) { __pc=5     ; break; }
            //$LASTPOS=45002100;//kernel.T2MediaPlayer:2100
            if (!(i>=r.sounds.length)) { __pc=2     ; break; }
            __pc=5     ; break;
            
          case 2     :
            
            //$LASTPOS=45002142;//kernel.T2MediaPlayer:2142
            s=r.sounds[i];
            //$LASTPOS=45002168;//kernel.T2MediaPlayer:2168
            name=s.name;
            //$LASTPOS=45002190;//kernel.T2MediaPlayer:2190
            url=Tonyu.Assets.resolve(s.url,prj);
            //$LASTPOS=45002237;//kernel.T2MediaPlayer:2237
            _this.fiber$loadSound(_thread, name, url, callbacks);
            __pc=3;return;
          case 3:
            
          case 4     :
            i++;
            __pc=1;break;
          case 5     :
            
            //$LASTPOS=45002282;//kernel.T2MediaPlayer:2282
          case 6:
            if (!(cnt<r.sounds.length)) { __pc=8     ; break; }
            //$LASTPOS=45002323;//kernel.T2MediaPlayer:2323
            _this.fiber$update(_thread);
            __pc=7;return;
          case 7:
            
            __pc=6;break;
          case 8     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    decodeSound :function _trc_T2MediaPlayer_decodeSound(idx,callbacks) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45002407;//kernel.T2MediaPlayer:2407
      Tonyu.globals.$t2MediaLib.decodeSound(idx,callbacks);
    },
    fiber$decodeSound :function _trc_T2MediaPlayer_f_decodeSound(_thread,idx,callbacks) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45002407;//kernel.T2MediaPlayer:2407
      Tonyu.globals.$t2MediaLib.decodeSound(idx,callbacks);
      
      _thread.retVal=_this;return;
    },
    getSoundFileData :function _trc_T2MediaPlayer_getSoundFileData(idx) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSoundFileData(idx);
    },
    fiber$getSoundFileData :function _trc_T2MediaPlayer_f_getSoundFileData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSoundFileData(idx);return;
      
      
      _thread.retVal=_this;return;
    },
    getSoundDecodedData :function _trc_T2MediaPlayer_getSoundDecodedData(idx) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSoundDecodedData(idx);
    },
    fiber$getSoundDecodedData :function _trc_T2MediaPlayer_f_getSoundDecodedData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSoundDecodedData(idx);return;
      
      
      _thread.retVal=_this;return;
    },
    getCurrentTime :function _trc_T2MediaPlayer_getCurrentTime() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getCurrentTime();
    },
    fiber$getCurrentTime :function _trc_T2MediaPlayer_f_getCurrentTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getCurrentTime();return;
      
      
      _thread.retVal=_this;return;
    },
    getContext :function _trc_T2MediaPlayer_getContext() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.context;
    },
    fiber$getContext :function _trc_T2MediaPlayer_f_getContext(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.context;return;
      
      
      _thread.retVal=_this;return;
    },
    playSE :function _trc_T2MediaPlayer_playSE(idx,vol,pan,rate,offset,loop,loopStart,loopEnd,start,duration) {
      "use strict";
      var _this=this;
      var o;
      
      //$LASTPOS=45002903;//kernel.T2MediaPlayer:2903
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=45002926;//kernel.T2MediaPlayer:2926
      if (vol&&typeof  vol==="object") {
        //$LASTPOS=45002981;//kernel.T2MediaPlayer:2981
        o = vol;
        
        //$LASTPOS=45003001;//kernel.T2MediaPlayer:3001
        vol=o.vol;
        //$LASTPOS=45003021;//kernel.T2MediaPlayer:3021
        pan=o.pan;
        //$LASTPOS=45003041;//kernel.T2MediaPlayer:3041
        rate=o.rate;
        //$LASTPOS=45003063;//kernel.T2MediaPlayer:3063
        offset=o.offset;
        //$LASTPOS=45003089;//kernel.T2MediaPlayer:3089
        loop=o.loop;
        //$LASTPOS=45003111;//kernel.T2MediaPlayer:3111
        loopStart=o.loopStart;
        //$LASTPOS=45003143;//kernel.T2MediaPlayer:3143
        loopEnd=o.loopEnd;
        //$LASTPOS=45003171;//kernel.T2MediaPlayer:3171
        start=o.start;
        //$LASTPOS=45003195;//kernel.T2MediaPlayer:3195
        duration=o.duration;
        
      }
      //$LASTPOS=45003363;//kernel.T2MediaPlayer:3363
      if (vol==null) {
        //$LASTPOS=45003380;//kernel.T2MediaPlayer:3380
        vol=128;
      }
      //$LASTPOS=45003396;//kernel.T2MediaPlayer:3396
      if (typeof  vol==="number") {
        //$LASTPOS=45003436;//kernel.T2MediaPlayer:3436
        vol/=128;
        //$LASTPOS=45003457;//kernel.T2MediaPlayer:3457
        if (vol<0) {
          //$LASTPOS=45003472;//kernel.T2MediaPlayer:3472
          vol=0;
        }
        
      } else {
        //$LASTPOS=45003506;//kernel.T2MediaPlayer:3506
        vol=1;
        
      }
      return Tonyu.globals.$t2MediaLib.playSE(idx,vol,pan,rate,offset,loop,loopStart,loopEnd,start,duration);
    },
    stopSE :function _trc_T2MediaPlayer_stopSE(sourceObj) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.stopSE(sourceObj);
    },
    fiber$stopSE :function _trc_T2MediaPlayer_f_stopSE(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.stopSE(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    getSEMasterVolume :function _trc_T2MediaPlayer_getSEMasterVolume() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSEMasterVolume()*128;
    },
    fiber$getSEMasterVolume :function _trc_T2MediaPlayer_f_getSEMasterVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSEMasterVolume()*128;return;
      
      
      _thread.retVal=_this;return;
    },
    setSEMasterVolume :function _trc_T2MediaPlayer_setSEMasterVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45003823;//kernel.T2MediaPlayer:3823
      if (typeof  vol==="number") {
        //$LASTPOS=45003863;//kernel.T2MediaPlayer:3863
        vol/=128;
        //$LASTPOS=45003884;//kernel.T2MediaPlayer:3884
        if (vol<0) {
          //$LASTPOS=45003899;//kernel.T2MediaPlayer:3899
          vol=0;
        }
        
      } else {
        return Tonyu.globals.$t2MediaLib.setSEMasterVolume(Tonyu.globals.$t2MediaLib.getSEMasterVolume());
        
      }
      return Tonyu.globals.$t2MediaLib.setSEMasterVolume(vol);
    },
    fiber$setSEMasterVolume :function _trc_T2MediaPlayer_f_setSEMasterVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45003823;//kernel.T2MediaPlayer:3823
      if (typeof  vol==="number") {
        //$LASTPOS=45003863;//kernel.T2MediaPlayer:3863
        vol/=128;
        //$LASTPOS=45003884;//kernel.T2MediaPlayer:3884
        if (vol<0) {
          //$LASTPOS=45003899;//kernel.T2MediaPlayer:3899
          vol=0;
        }
        
      } else {
        _thread.retVal=Tonyu.globals.$t2MediaLib.setSEMasterVolume(Tonyu.globals.$t2MediaLib.getSEMasterVolume());return;
        
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSEMasterVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getSEVolume :function _trc_T2MediaPlayer_getSEVolume(sourceObj) {
      "use strict";
      var _this=this;
      var vol;
      
      //$LASTPOS=45004133;//kernel.T2MediaPlayer:4133
      vol = Tonyu.globals.$t2MediaLib.getSEVolume(sourceObj);
      
      return typeof  vol==="number"?vol*128:vol;
    },
    fiber$getSEVolume :function _trc_T2MediaPlayer_f_getSEVolume(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var vol;
      
      //$LASTPOS=45004133;//kernel.T2MediaPlayer:4133
      vol = Tonyu.globals.$t2MediaLib.getSEVolume(sourceObj);
      
      _thread.retVal=typeof  vol==="number"?vol*128:vol;return;
      
      
      _thread.retVal=_this;return;
    },
    setSEVolume :function _trc_T2MediaPlayer_setSEVolume(sourceObj,vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45004276;//kernel.T2MediaPlayer:4276
      if (typeof  vol==="number") {
        //$LASTPOS=45004316;//kernel.T2MediaPlayer:4316
        vol/=128;
        //$LASTPOS=45004337;//kernel.T2MediaPlayer:4337
        if (vol<0) {
          //$LASTPOS=45004352;//kernel.T2MediaPlayer:4352
          vol=0;
        }
        
      } else {
        return Tonyu.globals.$t2MediaLib.setSEVolume(sourceObj,Tonyu.globals.$t2MediaLib.getSEVolume(sourceObj));
        
      }
      return Tonyu.globals.$t2MediaLib.setSEVolume(sourceObj,vol);
    },
    fiber$setSEVolume :function _trc_T2MediaPlayer_f_setSEVolume(_thread,sourceObj,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45004276;//kernel.T2MediaPlayer:4276
      if (typeof  vol==="number") {
        //$LASTPOS=45004316;//kernel.T2MediaPlayer:4316
        vol/=128;
        //$LASTPOS=45004337;//kernel.T2MediaPlayer:4337
        if (vol<0) {
          //$LASTPOS=45004352;//kernel.T2MediaPlayer:4352
          vol=0;
        }
        
      } else {
        _thread.retVal=Tonyu.globals.$t2MediaLib.setSEVolume(sourceObj,Tonyu.globals.$t2MediaLib.getSEVolume(sourceObj));return;
        
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSEVolume(sourceObj,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getSERate :function _trc_T2MediaPlayer_getSERate(sourceObj) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSERate(sourceObj);
    },
    fiber$getSERate :function _trc_T2MediaPlayer_f_getSERate(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSERate(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSERate :function _trc_T2MediaPlayer_setSERate(sourceObj,rate) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setSERate(sourceObj,rate);
    },
    fiber$setSERate :function _trc_T2MediaPlayer_f_setSERate(_thread,sourceObj,rate) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSERate(sourceObj,rate);return;
      
      
      _thread.retVal=_this;return;
    },
    getSEPan :function _trc_T2MediaPlayer_getSEPan(sourceObj) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSEPan(sourceObj);
    },
    fiber$getSEPan :function _trc_T2MediaPlayer_f_getSEPan(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSEPan(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSEPan :function _trc_T2MediaPlayer_setSEPan(sourceObj,pan) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setSEPan(sourceObj,pan);
    },
    fiber$setSEPan :function _trc_T2MediaPlayer_f_setSEPan(_thread,sourceObj,pan) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSEPan(sourceObj,pan);return;
      
      
      _thread.retVal=_this;return;
    },
    isSELoop :function _trc_T2MediaPlayer_isSELoop(sourceObj) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.isSELoop(sourceObj);
    },
    fiber$isSELoop :function _trc_T2MediaPlayer_f_isSELoop(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.isSELoop(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSELoop :function _trc_T2MediaPlayer_setSELoop(sourceObj,loop) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setSELoop(sourceObj,loop);
    },
    fiber$setSELoop :function _trc_T2MediaPlayer_f_setSELoop(_thread,sourceObj,loop) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSELoop(sourceObj,loop);return;
      
      
      _thread.retVal=_this;return;
    },
    getSELoopStartTime :function _trc_T2MediaPlayer_getSELoopStartTime(sourceObj) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSELoopStartTime(sourceObj);
    },
    fiber$getSELoopStartTime :function _trc_T2MediaPlayer_f_getSELoopStartTime(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSELoopStartTime(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSELoopStartTime :function _trc_T2MediaPlayer_setSELoopStartTime(sourceObj,loopStart) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setSELoopStartTime(Tonyu.bindFunc(_this,_this.setSELoopStartTime),loopStart);
    },
    fiber$setSELoopStartTime :function _trc_T2MediaPlayer_f_setSELoopStartTime(_thread,sourceObj,loopStart) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSELoopStartTime(Tonyu.bindFunc(_this,_this.setSELoopStartTime),loopStart);return;
      
      
      _thread.retVal=_this;return;
    },
    getSELoopEndTime :function _trc_T2MediaPlayer_getSELoopEndTime(sourceObj) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getSELoopEndTime(sourceObj);
    },
    fiber$getSELoopEndTime :function _trc_T2MediaPlayer_f_getSELoopEndTime(_thread,sourceObj) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getSELoopEndTime(sourceObj);return;
      
      
      _thread.retVal=_this;return;
    },
    setSELoopEndTime :function _trc_T2MediaPlayer_setSELoopEndTime(sourceObj,loopEnd) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setSELoopEndTime(Tonyu.bindFunc(_this,_this.setSELoopStartTime),loopEnd);
    },
    fiber$setSELoopEndTime :function _trc_T2MediaPlayer_f_setSELoopEndTime(_thread,sourceObj,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setSELoopEndTime(Tonyu.bindFunc(_this,_this.setSELoopStartTime),loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    playBGM :function _trc_T2MediaPlayer_playBGM(idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45005548;//kernel.T2MediaPlayer:5548
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=45005571;//kernel.T2MediaPlayer:5571
      if (loop==null) {
        //$LASTPOS=45005589;//kernel.T2MediaPlayer:5589
        loop=false;
      }
      //$LASTPOS=45005608;//kernel.T2MediaPlayer:5608
      if (offset==null) {
        //$LASTPOS=45005628;//kernel.T2MediaPlayer:5628
        offset=0;
      }
      return Tonyu.globals.$t2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGM :function _trc_T2MediaPlayer_f_playBGM(_thread,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45005548;//kernel.T2MediaPlayer:5548
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=45005571;//kernel.T2MediaPlayer:5571
      if (loop==null) {
        //$LASTPOS=45005589;//kernel.T2MediaPlayer:5589
        loop=false;
      }
      //$LASTPOS=45005608;//kernel.T2MediaPlayer:5608
      if (offset==null) {
        //$LASTPOS=45005628;//kernel.T2MediaPlayer:5628
        offset=0;
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    stopBGM :function _trc_T2MediaPlayer_stopBGM() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.stopBGM(0);
    },
    fiber$stopBGM :function _trc_T2MediaPlayer_f_stopBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.stopBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    pauseBGM :function _trc_T2MediaPlayer_pauseBGM() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.pauseBGM(0);
    },
    fiber$pauseBGM :function _trc_T2MediaPlayer_f_pauseBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.pauseBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    resumeBGM :function _trc_T2MediaPlayer_resumeBGM() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45005853;//kernel.T2MediaPlayer:5853
      if (_this.mute) {
        return _this;
      }
      return Tonyu.globals.$t2MediaLib.resumeBGM(0);
    },
    fiber$resumeBGM :function _trc_T2MediaPlayer_f_resumeBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45005853;//kernel.T2MediaPlayer:5853
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.resumeBGM(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMMasterVolume :function _trc_T2MediaPlayer_getBGMMasterVolume() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMMasterVolume()*128;
    },
    fiber$getBGMMasterVolume :function _trc_T2MediaPlayer_f_getBGMMasterVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMMasterVolume()*128;return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMMasterVolume :function _trc_T2MediaPlayer_setBGMMasterVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45006029;//kernel.T2MediaPlayer:6029
      if (typeof  vol==="number") {
        //$LASTPOS=45006069;//kernel.T2MediaPlayer:6069
        vol/=128;
        //$LASTPOS=45006090;//kernel.T2MediaPlayer:6090
        if (vol<0) {
          //$LASTPOS=45006105;//kernel.T2MediaPlayer:6105
          vol=0;
        }
        
      } else {
        return Tonyu.globals.$t2MediaLib.setBGMMasterVolume(Tonyu.globals.$t2MediaLib.getBGMMasterVolume());
        
      }
      return Tonyu.globals.$t2MediaLib.setBGMMasterVolume(vol);
    },
    fiber$setBGMMasterVolume :function _trc_T2MediaPlayer_f_setBGMMasterVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45006029;//kernel.T2MediaPlayer:6029
      if (typeof  vol==="number") {
        //$LASTPOS=45006069;//kernel.T2MediaPlayer:6069
        vol/=128;
        //$LASTPOS=45006090;//kernel.T2MediaPlayer:6090
        if (vol<0) {
          //$LASTPOS=45006105;//kernel.T2MediaPlayer:6105
          vol=0;
        }
        
      } else {
        _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMMasterVolume(Tonyu.globals.$t2MediaLib.getBGMMasterVolume());return;
        
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMMasterVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMVolume :function _trc_T2MediaPlayer_getBGMVolume() {
      "use strict";
      var _this=this;
      var vol;
      
      //$LASTPOS=45006334;//kernel.T2MediaPlayer:6334
      vol = Tonyu.globals.$t2MediaLib.getBGMVolume(0);
      
      return typeof  vol==="number"?vol*128:vol;
    },
    fiber$getBGMVolume :function _trc_T2MediaPlayer_f_getBGMVolume(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var vol;
      
      //$LASTPOS=45006334;//kernel.T2MediaPlayer:6334
      vol = Tonyu.globals.$t2MediaLib.getBGMVolume(0);
      
      _thread.retVal=typeof  vol==="number"?vol*128:vol;return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMVolume :function _trc_T2MediaPlayer_setBGMVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45006556;//kernel.T2MediaPlayer:6556
      if (typeof  vol==="number") {
        //$LASTPOS=45006596;//kernel.T2MediaPlayer:6596
        vol/=128;
        //$LASTPOS=45006617;//kernel.T2MediaPlayer:6617
        if (vol<0) {
          //$LASTPOS=45006632;//kernel.T2MediaPlayer:6632
          vol=0;
        }
        
      } else {
        return Tonyu.globals.$t2MediaLib.setBGMVolume(0,Tonyu.globals.$t2MediaLib.getBGMVolume(0));
        
      }
      return Tonyu.globals.$t2MediaLib.setBGMVolume(0,vol);
    },
    fiber$setBGMVolume :function _trc_T2MediaPlayer_f_setBGMVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45006556;//kernel.T2MediaPlayer:6556
      if (typeof  vol==="number") {
        //$LASTPOS=45006596;//kernel.T2MediaPlayer:6596
        vol/=128;
        //$LASTPOS=45006617;//kernel.T2MediaPlayer:6617
        if (vol<0) {
          //$LASTPOS=45006632;//kernel.T2MediaPlayer:6632
          vol=0;
        }
        
      } else {
        _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMVolume(0,Tonyu.globals.$t2MediaLib.getBGMVolume(0));return;
        
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMVolume(0,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMTempo :function _trc_T2MediaPlayer_getBGMTempo() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMTempo(0);
    },
    fiber$getBGMTempo :function _trc_T2MediaPlayer_f_getBGMTempo(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMTempo(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMTempo :function _trc_T2MediaPlayer_setBGMTempo(tempo) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMTempo(0,tempo);
    },
    fiber$setBGMTempo :function _trc_T2MediaPlayer_f_setBGMTempo(_thread,tempo) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMTempo(0,tempo);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMPan :function _trc_T2MediaPlayer_getBGMPan() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMPan(0);
    },
    fiber$getBGMPan :function _trc_T2MediaPlayer_f_getBGMPan(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMPan(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMPan :function _trc_T2MediaPlayer_setBGMPan(pan) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMPan(0,pan);
    },
    fiber$setBGMPan :function _trc_T2MediaPlayer_f_setBGMPan(_thread,pan) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMPan(0,pan);return;
      
      
      _thread.retVal=_this;return;
    },
    isBGMLoop :function _trc_T2MediaPlayer_isBGMLoop() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.isBGMLoop(0);
    },
    fiber$isBGMLoop :function _trc_T2MediaPlayer_f_isBGMLoop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.isBGMLoop(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoop :function _trc_T2MediaPlayer_setBGMLoop(loop) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMLoop(0,loop);
    },
    fiber$setBGMLoop :function _trc_T2MediaPlayer_f_setBGMLoop(_thread,loop) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMLoop(0,loop);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLoopStartTime :function _trc_T2MediaPlayer_getBGMLoopStartTime() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMLoopStartTime(0);
    },
    fiber$getBGMLoopStartTime :function _trc_T2MediaPlayer_f_getBGMLoopStartTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMLoopStartTime(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopStartTime :function _trc_T2MediaPlayer_setBGMLoopStartTime(loopStart) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMLoopStartTime(0,loopStart);
    },
    fiber$setBGMLoopStartTime :function _trc_T2MediaPlayer_f_setBGMLoopStartTime(_thread,loopStart) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMLoopStartTime(0,loopStart);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLoopEndTime :function _trc_T2MediaPlayer_getBGMLoopEndTime() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMLoopEndTime(0);
    },
    fiber$getBGMLoopEndTime :function _trc_T2MediaPlayer_f_getBGMLoopEndTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMLoopEndTime(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopEndTime :function _trc_T2MediaPlayer_setBGMLoopEndTime(loopEnd) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMLoopEndTime(0,loopEnd);
    },
    fiber$setBGMLoopEndTime :function _trc_T2MediaPlayer_f_setBGMLoopEndTime(_thread,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMLoopEndTime(0,loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMCurrentTime :function _trc_T2MediaPlayer_getBGMCurrentTime() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMCurrentTime(0);
    },
    fiber$getBGMCurrentTime :function _trc_T2MediaPlayer_f_getBGMCurrentTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMCurrentTime(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLength :function _trc_T2MediaPlayer_getBGMLength() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMLength(0);
    },
    fiber$getBGMLength :function _trc_T2MediaPlayer_f_getBGMLength(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMLength(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getPlayingBGMName :function _trc_T2MediaPlayer_getPlayingBGMName() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getPlayingBGMName(0);
    },
    fiber$getPlayingBGMName :function _trc_T2MediaPlayer_f_getPlayingBGMName(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getPlayingBGMName(0);return;
      
      
      _thread.retVal=_this;return;
    },
    setOnBGMEndListener :function _trc_T2MediaPlayer_setOnBGMEndListener() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setOnBGMEndListener(0);
    },
    fiber$setOnBGMEndListener :function _trc_T2MediaPlayer_f_setOnBGMEndListener(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setOnBGMEndListener(0);return;
      
      
      _thread.retVal=_this;return;
    },
    getPlayingBGMState :function _trc_T2MediaPlayer_getPlayingBGMState(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getPlayingBGMState(id);
    },
    fiber$getPlayingBGMState :function _trc_T2MediaPlayer_f_getPlayingBGMState(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getPlayingBGMState(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMPicoAudio :function _trc_T2MediaPlayer_getBGMPicoAudio(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMPicoAudio(id);
    },
    fiber$getBGMPicoAudio :function _trc_T2MediaPlayer_f_getBGMPicoAudio(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMPicoAudio(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMPlayerMax :function _trc_T2MediaPlayer_getBGMPlayerMax() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMPlayerMax();
    },
    fiber$getBGMPlayerMax :function _trc_T2MediaPlayer_f_getBGMPlayerMax(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMPlayerMax();return;
      
      
      _thread.retVal=_this;return;
    },
    allStopBGM :function _trc_T2MediaPlayer_allStopBGM() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45008098;//kernel.T2MediaPlayer:8098
      Tonyu.globals.$t2MediaLib.allStopBGM();
    },
    fiber$allStopBGM :function _trc_T2MediaPlayer_f_allStopBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45008098;//kernel.T2MediaPlayer:8098
      Tonyu.globals.$t2MediaLib.allStopBGM();
      
      _thread.retVal=_this;return;
    },
    allResetBGM :function _trc_T2MediaPlayer_allResetBGM() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45008152;//kernel.T2MediaPlayer:8152
      Tonyu.globals.$t2MediaLib.allResetBGM();
    },
    fiber$allResetBGM :function _trc_T2MediaPlayer_f_allResetBGM(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45008152;//kernel.T2MediaPlayer:8152
      Tonyu.globals.$t2MediaLib.allResetBGM();
      
      _thread.retVal=_this;return;
    },
    playBGMID :function _trc_T2MediaPlayer_playBGMID(id,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45008262;//kernel.T2MediaPlayer:8262
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=45008285;//kernel.T2MediaPlayer:8285
      if (loop==null) {
        //$LASTPOS=45008303;//kernel.T2MediaPlayer:8303
        loop=false;
      }
      //$LASTPOS=45008322;//kernel.T2MediaPlayer:8322
      if (offset==null) {
        //$LASTPOS=45008342;//kernel.T2MediaPlayer:8342
        offset=0;
      }
      return Tonyu.globals.$t2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
    },
    fiber$playBGMID :function _trc_T2MediaPlayer_f_playBGMID(_thread,id,idx,loop,offset,loopStart,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45008262;//kernel.T2MediaPlayer:8262
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=45008285;//kernel.T2MediaPlayer:8285
      if (loop==null) {
        //$LASTPOS=45008303;//kernel.T2MediaPlayer:8303
        loop=false;
      }
      //$LASTPOS=45008322;//kernel.T2MediaPlayer:8322
      if (offset==null) {
        //$LASTPOS=45008342;//kernel.T2MediaPlayer:8342
        offset=0;
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    stopBGMID :function _trc_T2MediaPlayer_stopBGMID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.stopBGM(id);
    },
    fiber$stopBGMID :function _trc_T2MediaPlayer_f_stopBGMID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.stopBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    pauseBGMID :function _trc_T2MediaPlayer_pauseBGMID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.pauseBGM(id);
    },
    fiber$pauseBGMID :function _trc_T2MediaPlayer_f_pauseBGMID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.pauseBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    resumeBGMID :function _trc_T2MediaPlayer_resumeBGMID(id) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45008582;//kernel.T2MediaPlayer:8582
      if (_this.mute) {
        return _this;
      }
      return Tonyu.globals.$t2MediaLib.resumeBGM(id);
    },
    fiber$resumeBGMID :function _trc_T2MediaPlayer_f_resumeBGMID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45008582;//kernel.T2MediaPlayer:8582
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.resumeBGM(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMVolumeID :function _trc_T2MediaPlayer_getBGMVolumeID(id) {
      "use strict";
      var _this=this;
      var vol;
      
      //$LASTPOS=45008672;//kernel.T2MediaPlayer:8672
      vol = Tonyu.globals.$t2MediaLib.getBGMVolume(id);
      
      return typeof  vol==="number"?vol*128:vol;
    },
    fiber$getBGMVolumeID :function _trc_T2MediaPlayer_f_getBGMVolumeID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var vol;
      
      //$LASTPOS=45008672;//kernel.T2MediaPlayer:8672
      vol = Tonyu.globals.$t2MediaLib.getBGMVolume(id);
      
      _thread.retVal=typeof  vol==="number"?vol*128:vol;return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMVolumeID :function _trc_T2MediaPlayer_setBGMVolumeID(id,vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45008901;//kernel.T2MediaPlayer:8901
      if (typeof  vol==="number") {
        //$LASTPOS=45008941;//kernel.T2MediaPlayer:8941
        vol/=128;
        //$LASTPOS=45008962;//kernel.T2MediaPlayer:8962
        if (vol<0) {
          //$LASTPOS=45008977;//kernel.T2MediaPlayer:8977
          vol=0;
        }
        
      } else {
        return Tonyu.globals.$t2MediaLib.setBGMVolume(id,Tonyu.globals.$t2MediaLib.getBGMVolume(id));
        
      }
      return Tonyu.globals.$t2MediaLib.setBGMVolume(id,vol);
    },
    fiber$setBGMVolumeID :function _trc_T2MediaPlayer_f_setBGMVolumeID(_thread,id,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45008901;//kernel.T2MediaPlayer:8901
      if (typeof  vol==="number") {
        //$LASTPOS=45008941;//kernel.T2MediaPlayer:8941
        vol/=128;
        //$LASTPOS=45008962;//kernel.T2MediaPlayer:8962
        if (vol<0) {
          //$LASTPOS=45008977;//kernel.T2MediaPlayer:8977
          vol=0;
        }
        
      } else {
        _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMVolume(id,Tonyu.globals.$t2MediaLib.getBGMVolume(id));return;
        
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMVolume(id,vol);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMTempoID :function _trc_T2MediaPlayer_getBGMTempoID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMTempo(id);
    },
    fiber$getBGMTempoID :function _trc_T2MediaPlayer_f_getBGMTempoID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMTempo(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMTempoID :function _trc_T2MediaPlayer_setBGMTempoID(id,tempo) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMTempo(id,tempo);
    },
    fiber$setBGMTempoID :function _trc_T2MediaPlayer_f_setBGMTempoID(_thread,id,tempo) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMTempo(id,tempo);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMPanID :function _trc_T2MediaPlayer_getBGMPanID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMPan(id);
    },
    fiber$getBGMPanID :function _trc_T2MediaPlayer_f_getBGMPanID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMPan(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMPanID :function _trc_T2MediaPlayer_setBGMPanID(id,pan) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMPan(id,pan);
    },
    fiber$setBGMPanID :function _trc_T2MediaPlayer_f_setBGMPanID(_thread,id,pan) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMPan(id,pan);return;
      
      
      _thread.retVal=_this;return;
    },
    isBGMLoopID :function _trc_T2MediaPlayer_isBGMLoopID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.isBGMLoop(id);
    },
    fiber$isBGMLoopID :function _trc_T2MediaPlayer_f_isBGMLoopID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.isBGMLoop(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopID :function _trc_T2MediaPlayer_setBGMLoopID(id,loop) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMLoop(id,loop);
    },
    fiber$setBGMLoopID :function _trc_T2MediaPlayer_f_setBGMLoopID(_thread,id,loop) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMLoop(id,loop);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLoopStartTimeID :function _trc_T2MediaPlayer_getBGMLoopStartTimeID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMLoopStartTime(id);
    },
    fiber$getBGMLoopStartTimeID :function _trc_T2MediaPlayer_f_getBGMLoopStartTimeID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMLoopStartTime(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopStartTimeID :function _trc_T2MediaPlayer_setBGMLoopStartTimeID(id,loopStart) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMLoopStartTime(id,loopStart);
    },
    fiber$setBGMLoopStartTimeID :function _trc_T2MediaPlayer_f_setBGMLoopStartTimeID(_thread,id,loopStart) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMLoopStartTime(id,loopStart);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLoopEndTimeID :function _trc_T2MediaPlayer_getBGMLoopEndTimeID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMLoopEndTime(id);
    },
    fiber$getBGMLoopEndTimeID :function _trc_T2MediaPlayer_f_getBGMLoopEndTimeID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMLoopEndTime(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMLoopEndTimeID :function _trc_T2MediaPlayer_setBGMLoopEndTimeID(id,loopEnd) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setBGMLoopEndTime(id,loopEnd);
    },
    fiber$setBGMLoopEndTimeID :function _trc_T2MediaPlayer_f_setBGMLoopEndTimeID(_thread,id,loopEnd) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setBGMLoopEndTime(id,loopEnd);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMCurrentTimeID :function _trc_T2MediaPlayer_getBGMCurrentTimeID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMCurrentTime(id);
    },
    fiber$getBGMCurrentTimeID :function _trc_T2MediaPlayer_f_getBGMCurrentTimeID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMCurrentTime(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getBGMLengthID :function _trc_T2MediaPlayer_getBGMLengthID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getBGMLength(id);
    },
    fiber$getBGMLengthID :function _trc_T2MediaPlayer_f_getBGMLengthID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getBGMLength(id);return;
      
      
      _thread.retVal=_this;return;
    },
    getPlayingBGMNameID :function _trc_T2MediaPlayer_getPlayingBGMNameID(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getPlayingBGMName(id);
    },
    fiber$getPlayingBGMNameID :function _trc_T2MediaPlayer_f_getPlayingBGMNameID(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getPlayingBGMName(id);return;
      
      
      _thread.retVal=_this;return;
    },
    setBGMOnSongEndListener :function _trc_T2MediaPlayer_setBGMOnSongEndListener(id) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setOnBGMEndListener(id);
    },
    fiber$setBGMOnSongEndListener :function _trc_T2MediaPlayer_f_setBGMOnSongEndListener(_thread,id) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setOnBGMEndListener(id);return;
      
      
      _thread.retVal=_this;return;
    },
    loadAudio :function _trc_T2MediaPlayer_loadAudio(idx,src) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45010504;//kernel.T2MediaPlayer:10504
      Tonyu.globals.$t2MediaLib.loadAudio(idx,src);
      //$LASTPOS=45010567;//kernel.T2MediaPlayer:10567
      while (Tonyu.globals.$t2MediaLib.getAudioData(idx)==null) {
        //$LASTPOS=45010613;//kernel.T2MediaPlayer:10613
        _this.update();
      }
    },
    fiber$loadAudio :function _trc_T2MediaPlayer_f_loadAudio(_thread,idx,src) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45010504;//kernel.T2MediaPlayer:10504
      Tonyu.globals.$t2MediaLib.loadAudio(idx,src);
      
      _thread.enter(function _trc_T2MediaPlayer_ent_loadAudio(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45010567;//kernel.T2MediaPlayer:10567
          case 1:
            if (!(Tonyu.globals.$t2MediaLib.getAudioData(idx)==null)) { __pc=3     ; break; }
            //$LASTPOS=45010613;//kernel.T2MediaPlayer:10613
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    playAudio :function _trc_T2MediaPlayer_playAudio(idx,loop,startTime) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45010669;//kernel.T2MediaPlayer:10669
      if (_this.mute) {
        return _this;
      }
      //$LASTPOS=45010692;//kernel.T2MediaPlayer:10692
      if (loop==null) {
        //$LASTPOS=45010710;//kernel.T2MediaPlayer:10710
        loop=false;
      }
      //$LASTPOS=45010729;//kernel.T2MediaPlayer:10729
      if (startTime==null) {
        //$LASTPOS=45010752;//kernel.T2MediaPlayer:10752
        startTime=0;
      }
      return Tonyu.globals.$t2MediaLib.playAudio(idx,loop,startTime);
    },
    fiber$playAudio :function _trc_T2MediaPlayer_f_playAudio(_thread,idx,loop,startTime) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45010669;//kernel.T2MediaPlayer:10669
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=45010692;//kernel.T2MediaPlayer:10692
      if (loop==null) {
        //$LASTPOS=45010710;//kernel.T2MediaPlayer:10710
        loop=false;
      }
      //$LASTPOS=45010729;//kernel.T2MediaPlayer:10729
      if (startTime==null) {
        //$LASTPOS=45010752;//kernel.T2MediaPlayer:10752
        startTime=0;
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.playAudio(idx,loop,startTime);return;
      
      
      _thread.retVal=_this;return;
    },
    stopAudio :function _trc_T2MediaPlayer_stopAudio() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.stopAudio();
    },
    fiber$stopAudio :function _trc_T2MediaPlayer_f_stopAudio(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.stopAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    pauseAudio :function _trc_T2MediaPlayer_pauseAudio() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.pauseAudio();
    },
    fiber$pauseAudio :function _trc_T2MediaPlayer_f_pauseAudio(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.pauseAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    resumeAudio :function _trc_T2MediaPlayer_resumeAudio() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45010970;//kernel.T2MediaPlayer:10970
      if (_this.mute) {
        return _this;
      }
      return Tonyu.globals.$t2MediaLib.resumeAudio();
    },
    fiber$resumeAudio :function _trc_T2MediaPlayer_f_resumeAudio(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45010970;//kernel.T2MediaPlayer:10970
      if (_this.mute) {
        _thread.retVal=_this;return;
        
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.resumeAudio();return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioVolume :function _trc_T2MediaPlayer_setAudioVolume(vol) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45011061;//kernel.T2MediaPlayer:11061
      vol=vol/128;
      //$LASTPOS=45011083;//kernel.T2MediaPlayer:11083
      if (vol>1) {
        //$LASTPOS=45011103;//kernel.T2MediaPlayer:11103
        vol=1;
      } else {
        //$LASTPOS=45011124;//kernel.T2MediaPlayer:11124
        if (vol<0) {
          //$LASTPOS=45011139;//kernel.T2MediaPlayer:11139
          vol=0;
        }
      }
      return Tonyu.globals.$t2MediaLib.setAudioVolume(vol);
    },
    fiber$setAudioVolume :function _trc_T2MediaPlayer_f_setAudioVolume(_thread,vol) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45011061;//kernel.T2MediaPlayer:11061
      vol=vol/128;
      //$LASTPOS=45011083;//kernel.T2MediaPlayer:11083
      if (vol>1) {
        //$LASTPOS=45011103;//kernel.T2MediaPlayer:11103
        vol=1;
      } else {
        //$LASTPOS=45011124;//kernel.T2MediaPlayer:11124
        if (vol<0) {
          //$LASTPOS=45011139;//kernel.T2MediaPlayer:11139
          vol=0;
        }
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setAudioVolume(vol);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioTempo :function _trc_T2MediaPlayer_setAudioTempo(tempo) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=45011230;//kernel.T2MediaPlayer:11230
      if (tempo>4) {
        //$LASTPOS=45011252;//kernel.T2MediaPlayer:11252
        tempo=4;
      } else {
        //$LASTPOS=45011275;//kernel.T2MediaPlayer:11275
        if (tempo<0.5) {
          //$LASTPOS=45011292;//kernel.T2MediaPlayer:11292
          tempo=0.5;
        }
      }
      return Tonyu.globals.$t2MediaLib.setAudioTempo(tempo);
    },
    fiber$setAudioTempo :function _trc_T2MediaPlayer_f_setAudioTempo(_thread,tempo) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45011230;//kernel.T2MediaPlayer:11230
      if (tempo>4) {
        //$LASTPOS=45011252;//kernel.T2MediaPlayer:11252
        tempo=4;
      } else {
        //$LASTPOS=45011275;//kernel.T2MediaPlayer:11275
        if (tempo<0.5) {
          //$LASTPOS=45011292;//kernel.T2MediaPlayer:11292
          tempo=0.5;
        }
      }
      _thread.retVal=Tonyu.globals.$t2MediaLib.setAudioTempo(tempo);return;
      
      
      _thread.retVal=_this;return;
    },
    setAudioPosition :function _trc_T2MediaPlayer_setAudioPosition(time) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.setAudioPosition(time);
    },
    fiber$setAudioPosition :function _trc_T2MediaPlayer_f_setAudioPosition(_thread,time) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.setAudioPosition(time);return;
      
      
      _thread.retVal=_this;return;
    },
    getAudioCurrentTime :function _trc_T2MediaPlayer_getAudioCurrentTime() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getAudioCurrentTime();
    },
    fiber$getAudioCurrentTime :function _trc_T2MediaPlayer_f_getAudioCurrentTime(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getAudioCurrentTime();return;
      
      
      _thread.retVal=_this;return;
    },
    getAudioLength :function _trc_T2MediaPlayer_getAudioLength() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getAudioLength();
    },
    fiber$getAudioLength :function _trc_T2MediaPlayer_f_getAudioLength(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getAudioLength();return;
      
      
      _thread.retVal=_this;return;
    },
    getAudioData :function _trc_T2MediaPlayer_getAudioData(idx) {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$t2MediaLib.getAudioData(idx);
    },
    fiber$getAudioData :function _trc_T2MediaPlayer_f_getAudioData(_thread,idx) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$t2MediaLib.getAudioData(idx);return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"initT2MediaPlayer":{"nowait":false},"allClearSoundData":{"nowait":false},"clearSoundData":{"nowait":false},"allRemoveDecodedSoundData":{"nowait":false},"removeDecodedSoundData":{"nowait":false},"getMasterVolume":{"nowait":false},"setMasterVolume":{"nowait":false},"loadSound":{"nowait":false},"__getter__available":{"nowait":true},"loadFromProject":{"nowait":false},"decodeSound":{"nowait":false},"getSoundFileData":{"nowait":false},"getSoundDecodedData":{"nowait":false},"getCurrentTime":{"nowait":false},"getContext":{"nowait":false},"playSE":{"nowait":true},"stopSE":{"nowait":false},"getSEMasterVolume":{"nowait":false},"setSEMasterVolume":{"nowait":false},"getSEVolume":{"nowait":false},"setSEVolume":{"nowait":false},"getSERate":{"nowait":false},"setSERate":{"nowait":false},"getSEPan":{"nowait":false},"setSEPan":{"nowait":false},"isSELoop":{"nowait":false},"setSELoop":{"nowait":false},"getSELoopStartTime":{"nowait":false},"setSELoopStartTime":{"nowait":false},"getSELoopEndTime":{"nowait":false},"setSELoopEndTime":{"nowait":false},"playBGM":{"nowait":false},"stopBGM":{"nowait":false},"pauseBGM":{"nowait":false},"resumeBGM":{"nowait":false},"getBGMMasterVolume":{"nowait":false},"setBGMMasterVolume":{"nowait":false},"getBGMVolume":{"nowait":false},"setBGMVolume":{"nowait":false},"getBGMTempo":{"nowait":false},"setBGMTempo":{"nowait":false},"getBGMPan":{"nowait":false},"setBGMPan":{"nowait":false},"isBGMLoop":{"nowait":false},"setBGMLoop":{"nowait":false},"getBGMLoopStartTime":{"nowait":false},"setBGMLoopStartTime":{"nowait":false},"getBGMLoopEndTime":{"nowait":false},"setBGMLoopEndTime":{"nowait":false},"getBGMCurrentTime":{"nowait":false},"getBGMLength":{"nowait":false},"getPlayingBGMName":{"nowait":false},"setOnBGMEndListener":{"nowait":false},"getPlayingBGMState":{"nowait":false},"getBGMPicoAudio":{"nowait":false},"getBGMPlayerMax":{"nowait":false},"allStopBGM":{"nowait":false},"allResetBGM":{"nowait":false},"playBGMID":{"nowait":false},"stopBGMID":{"nowait":false},"pauseBGMID":{"nowait":false},"resumeBGMID":{"nowait":false},"getBGMVolumeID":{"nowait":false},"setBGMVolumeID":{"nowait":false},"getBGMTempoID":{"nowait":false},"setBGMTempoID":{"nowait":false},"getBGMPanID":{"nowait":false},"setBGMPanID":{"nowait":false},"isBGMLoopID":{"nowait":false},"setBGMLoopID":{"nowait":false},"getBGMLoopStartTimeID":{"nowait":false},"setBGMLoopStartTimeID":{"nowait":false},"getBGMLoopEndTimeID":{"nowait":false},"setBGMLoopEndTimeID":{"nowait":false},"getBGMCurrentTimeID":{"nowait":false},"getBGMLengthID":{"nowait":false},"getPlayingBGMNameID":{"nowait":false},"setBGMOnSongEndListener":{"nowait":false},"loadAudio":{"nowait":false},"playAudio":{"nowait":false},"stopAudio":{"nowait":false},"pauseAudio":{"nowait":false},"resumeAudio":{"nowait":false},"setAudioVolume":{"nowait":false},"setAudioTempo":{"nowait":false},"setAudioPosition":{"nowait":false},"getAudioCurrentTime":{"nowait":false},"getAudioLength":{"nowait":false},"getAudioData":{"nowait":false}},"fields":{"bgmPlayerMax":{},"available":{},"progressNoLog":{},"console":{},"mute":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.PlainChar',
  shortName: 'PlainChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_PlainChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_PlainChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_PlainChar_initialize(x,y,p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000066;//kernel.PlainChar:66
      if (Tonyu.runMode) {
        //$LASTPOS=46000096;//kernel.PlainChar:96
        _this._th=Tonyu.globals.$Boot.schedule(_this,"tMain",[]);
        //$LASTPOS=46000142;//kernel.PlainChar:142
        _this.initSprite();
        
      }
      //$LASTPOS=46000168;//kernel.PlainChar:168
      _this.layer=_this.layer||Tonyu.globals.$mainLayer;
      //$LASTPOS=46000198;//kernel.PlainChar:198
      if (typeof  x=="object") {
        //$LASTPOS=46000222;//kernel.PlainChar:222
        Tonyu.extend(_this,x);
      } else {
        //$LASTPOS=46000254;//kernel.PlainChar:254
        if (typeof  x=="number") {
          //$LASTPOS=46000289;//kernel.PlainChar:289
          _this.x=x;
          //$LASTPOS=46000308;//kernel.PlainChar:308
          _this.y=y;
          //$LASTPOS=46000327;//kernel.PlainChar:327
          _this.p=p;
          
        }
      }
    },
    draw :function _trc_PlainChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000364;//kernel.PlainChar:364
      _this.onDraw();
      //$LASTPOS=46000379;//kernel.PlainChar:379
      if (_this._isInvisible) {
        return _this;
      }
    },
    setVisible :function _trc_PlainChar_setVisible(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000453;//kernel.PlainChar:453
      _this._isInvisible=! v;
    },
    fiber$setVisible :function _trc_PlainChar_f_setVisible(_thread,v) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000453;//kernel.PlainChar:453
      _this._isInvisible=! v;
      
      _thread.retVal=_this;return;
    },
    onDraw :function _trc_PlainChar_onDraw() {
      "use strict";
      var _this=this;
      
    },
    fiber$onDraw :function _trc_PlainChar_f_onDraw(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_PlainChar_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000509;//kernel.PlainChar:509
      _this.onUpdate();
      //$LASTPOS=46000526;//kernel.PlainChar:526
      Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
    },
    fiber$update :function _trc_PlainChar_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000509;//kernel.PlainChar:509
      _this.onUpdate();
      
      _thread.enter(function _trc_PlainChar_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46000526;//kernel.PlainChar:526
            Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onUpdate :function _trc_PlainChar_onUpdate() {
      "use strict";
      var _this=this;
      
    },
    initSprite :function _trc_PlainChar_initSprite() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000587;//kernel.PlainChar:587
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=46000639;//kernel.PlainChar:639
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=46000677;//kernel.PlainChar:677
        Tonyu.globals.$Sprites.add(_this);
        
      }
      //$LASTPOS=46000709;//kernel.PlainChar:709
      _this.onAppear();
    },
    fiber$initSprite :function _trc_PlainChar_f_initSprite(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000587;//kernel.PlainChar:587
      if (_this.layer&&typeof  _this.layer.add=="function") {
        //$LASTPOS=46000639;//kernel.PlainChar:639
        _this.layer.add(_this);
        
      } else {
        //$LASTPOS=46000677;//kernel.PlainChar:677
        Tonyu.globals.$Sprites.add(_this);
        
      }
      
      _thread.enter(function _trc_PlainChar_ent_initSprite(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46000709;//kernel.PlainChar:709
            _this.fiber$onAppear(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    tMain :function _trc_PlainChar_tMain() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=46000741;//kernel.PlainChar:741
      _this.main();
      //$LASTPOS=46000754;//kernel.PlainChar:754
      _this.die();
    },
    fiber$tMain :function _trc_PlainChar_f_tMain(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_PlainChar_ent_tMain(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46000741;//kernel.PlainChar:741
            _this.fiber$main(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=46000754;//kernel.PlainChar:754
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.SecretChar',
  shortName: 'SecretChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.PlainChar,
  includes: [],
  methods: {
    main :function _trc_SecretChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_SecretChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_SecretChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=47000038;//kernel.SecretChar:38
      _this.onDraw();
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.SpriteChar',
  shortName: 'SpriteChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.PlainChar,
  includes: [],
  methods: {
    main :function _trc_SpriteChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_SpriteChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_SpriteChar_initialize(x,y,p,f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=48000043;//kernel.SpriteChar:43
      Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
      //$LASTPOS=48000062;//kernel.SpriteChar:62
      _this.f=f;
      //$LASTPOS=48000077;//kernel.SpriteChar:77
      if (! _this.x) {
        //$LASTPOS=48000090;//kernel.SpriteChar:90
        _this.x=0;
      }
      //$LASTPOS=48000105;//kernel.SpriteChar:105
      if (! _this.y) {
        //$LASTPOS=48000118;//kernel.SpriteChar:118
        _this.y=0;
      }
      //$LASTPOS=48000133;//kernel.SpriteChar:133
      if (! _this.p) {
        //$LASTPOS=48000146;//kernel.SpriteChar:146
        _this.p=0;
      }
      //$LASTPOS=48000161;//kernel.SpriteChar:161
      if (typeof  _this.scaleX!="number") {
        //$LASTPOS=48000190;//kernel.SpriteChar:190
        _this.scaleX=1;
      }
    },
    draw :function _trc_SpriteChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=48000220;//kernel.SpriteChar:220
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=48000251;//kernel.SpriteChar:251
      _this.onDraw();
      //$LASTPOS=48000266;//kernel.SpriteChar:266
      _this.detectShape();
      //$LASTPOS=48000286;//kernel.SpriteChar:286
      _this.drawSprite(_this.x,_this.y,_this.p,_this.f,_this.zOrder);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}},"fields":{"f":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Map',
  shortName: 'T1Map',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Map,
  includes: [],
  methods: {
    main :function _trc_T1Map_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Map_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setBGColor :function _trc_T1Map_setBGColor(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=49000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
    },
    fiber$setBGColor :function _trc_T1Map_f_setBGColor(_thread,c) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=49000064;//kernel.T1Map:64
      Tonyu.globals.$Screen.setBGColor(c);
      
      _thread.retVal=_this;return;
    },
    load :function _trc_T1Map_load(fileName) {
      "use strict";
      var _this=this;
      var f;
      var o;
      
      //$LASTPOS=49000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      
      //$LASTPOS=49000512;//kernel.T1Map:512
      o = f.obj();
      
      //$LASTPOS=49000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=49000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=49000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      //$LASTPOS=49000616;//kernel.T1Map:616
      _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
      //$LASTPOS=49000658;//kernel.T1Map:658
      _this.mapData=_this.mapTable;
      //$LASTPOS=49000681;//kernel.T1Map:681
      _this.row=_this.mapTable.length;
      //$LASTPOS=49000707;//kernel.T1Map:707
      _this.col=_this.mapTable[0].length;
      //$LASTPOS=49000736;//kernel.T1Map:736
      _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
      //$LASTPOS=49000780;//kernel.T1Map:780
      _this.mapOnData=_this.mapOnTable;
      //$LASTPOS=49000813;//kernel.T1Map:813
      _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
      //$LASTPOS=49000885;//kernel.T1Map:885
      _this.initMap();
    },
    fiber$load :function _trc_T1Map_f_load(_thread,fileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var f;
      var o;
      
      //$LASTPOS=49000469;//kernel.T1Map:469
      f = _this.file("../maps/").rel(fileName);
      
      //$LASTPOS=49000512;//kernel.T1Map:512
      o = f.obj();
      
      //$LASTPOS=49000532;//kernel.T1Map:532
      _this.chipWidth=o.chipWidth;
      //$LASTPOS=49000560;//kernel.T1Map:560
      _this.chipHeight=o.chipHeight;
      //$LASTPOS=49000590;//kernel.T1Map:590
      _this.baseData=o.baseData;
      
      _thread.enter(function _trc_T1Map_ent_load(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49000616;//kernel.T1Map:616
            _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
            __pc=1;return;
          case 1:
            _this.mapTable=_thread.retVal;
            
            //$LASTPOS=49000658;//kernel.T1Map:658
            _this.mapData=_this.mapTable;
            //$LASTPOS=49000681;//kernel.T1Map:681
            _this.row=_this.mapTable.length;
            //$LASTPOS=49000707;//kernel.T1Map:707
            _this.col=_this.mapTable[0].length;
            //$LASTPOS=49000736;//kernel.T1Map:736
            _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
            __pc=2;return;
          case 2:
            _this.mapOnTable=_thread.retVal;
            
            //$LASTPOS=49000780;//kernel.T1Map:780
            _this.mapOnData=_this.mapOnTable;
            //$LASTPOS=49000813;//kernel.T1Map:813
            _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=49000885;//kernel.T1Map:885
            _this.fiber$initMap(_thread);
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    conv :function _trc_T1Map_conv(mat,tbl) {
      "use strict";
      var _this=this;
      var res;
      
      //$LASTPOS=49000926;//kernel.T1Map:926
      res = [];
      
      //$LASTPOS=49000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=49000973;//kernel.T1Map:973
        rrow = [];
        
        //$LASTPOS=49000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=49001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=49001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          
          //$LASTPOS=49001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=49001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=49001165;//kernel.T1Map:1165
            rrow.push(dat[1]);
          }
        }));
      }));
      return res;
    },
    fiber$conv :function _trc_T1Map_f_conv(_thread,mat,tbl) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      
      //$LASTPOS=49000926;//kernel.T1Map:926
      res = [];
      
      //$LASTPOS=49000943;//kernel.T1Map:943
      mat.forEach((function anonymous_955(row) {
        var rrow;
        
        //$LASTPOS=49000973;//kernel.T1Map:973
        rrow = [];
        
        //$LASTPOS=49000995;//kernel.T1Map:995
        res.push(rrow);
        //$LASTPOS=49001020;//kernel.T1Map:1020
        row.forEach((function anonymous_1032(dat) {
          var t;
          
          //$LASTPOS=49001067;//kernel.T1Map:1067
          t = tbl[dat[0]];
          
          //$LASTPOS=49001099;//kernel.T1Map:1099
          if (t) {
            //$LASTPOS=49001106;//kernel.T1Map:1106
            rrow.push(Tonyu.globals[t.name]+dat[1]);
          } else {
            //$LASTPOS=49001165;//kernel.T1Map:1165
            rrow.push(dat[1]);
          }
        }));
      }));
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"setBGColor":{"nowait":false},"load":{"nowait":false},"conv":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.T1Page',
  shortName: 'T1Page',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.PlainChar,
  includes: [],
  methods: {
    main :function _trc_T1Page_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_T1Page_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initGlobals :function _trc_T1Page_initGlobals() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=50000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=50000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=50000103;//kernel.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=50000131;//kernel.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=50000159;//kernel.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=50000189;//kernel.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=50000222;//kernel.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=50000251;//kernel.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=50000282;//kernel.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=50000313;//kernel.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=50000347;//kernel.T1Page:347
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
    },
    fiber$initGlobals :function _trc_T1Page_f_initGlobals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=50000044;//kernel.T1Page:44
      Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
      //$LASTPOS=50000074;//kernel.T1Page:74
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=50000103;//kernel.T1Page:103
      Tonyu.globals.$clBlack=_this.color(0,0,0);
      //$LASTPOS=50000131;//kernel.T1Page:131
      Tonyu.globals.$clRed=_this.color(255,0,0);
      //$LASTPOS=50000159;//kernel.T1Page:159
      Tonyu.globals.$clGreen=_this.color(0,255,0);
      //$LASTPOS=50000189;//kernel.T1Page:189
      Tonyu.globals.$clYellow=_this.color(255,255,0);
      //$LASTPOS=50000222;//kernel.T1Page:222
      Tonyu.globals.$clBlue=_this.color(0,0,255);
      //$LASTPOS=50000251;//kernel.T1Page:251
      Tonyu.globals.$clPink=_this.color(255,0,255);
      //$LASTPOS=50000282;//kernel.T1Page:282
      Tonyu.globals.$clAqua=_this.color(0,255,255);
      //$LASTPOS=50000313;//kernel.T1Page:313
      Tonyu.globals.$clWhite=_this.color(255,255,255);
      //$LASTPOS=50000347;//kernel.T1Page:347
      Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"initGlobals":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.TextChar',
  shortName: 'TextChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.PlainChar,
  includes: [],
  methods: {
    main :function _trc_TextChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_TextChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_TextChar_initialize(xx,yy,t,c,s) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=51000072;//kernel.TextChar:72
      Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
      //$LASTPOS=51000091;//kernel.TextChar:91
      _this.text=_this.text||"";
      //$LASTPOS=51000111;//kernel.TextChar:111
      _this.col=Tonyu.globals.$clWhite;
      //$LASTPOS=51000130;//kernel.TextChar:130
      _this.size=20;
      //$LASTPOS=51000144;//kernel.TextChar:144
      if (! _this.x) {
        //$LASTPOS=51000157;//kernel.TextChar:157
        _this.x=0;
      }
      //$LASTPOS=51000172;//kernel.TextChar:172
      if (! _this.y) {
        //$LASTPOS=51000185;//kernel.TextChar:185
        _this.y=0;
      }
      //$LASTPOS=51000200;//kernel.TextChar:200
      if (t) {
        //$LASTPOS=51000207;//kernel.TextChar:207
        _this.text=t;
      }
      //$LASTPOS=51000220;//kernel.TextChar:220
      if (c) {
        //$LASTPOS=51000227;//kernel.TextChar:227
        _this.fillStyle=c;
      }
      //$LASTPOS=51000245;//kernel.TextChar:245
      if (s) {
        //$LASTPOS=51000252;//kernel.TextChar:252
        _this.size=s;
      }
    },
    draw :function _trc_TextChar_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=51000282;//kernel.TextChar:282
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=51000313;//kernel.TextChar:313
      _this.onDraw();
      //$LASTPOS=51000328;//kernel.TextChar:328
      _this.drawText(_this.x,_this.y,_this.text,_this.col,_this.size);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}},"fields":{"col":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.APad',
  shortName: 'APad',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_APad_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52000710;//kernel.APad:710
      _this.loop();
    },
    fiber$main :function _trc_APad_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_APad_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52000710;//kernel.APad:710
            _this.fiber$loop(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_APad_initialize(p) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52000033;//kernel.APad:33
      p=p||{};
      //$LASTPOS=52000047;//kernel.APad:47
      if (! p.alpha) {
        //$LASTPOS=52000061;//kernel.APad:61
        p.alpha=128;
      }
      //$LASTPOS=52000079;//kernel.APad:79
      Tonyu.classes.kernel.Actor.apply( _this, [p]);
      //$LASTPOS=52000094;//kernel.APad:94
      _this.vx=0;
      //$LASTPOS=52000099;//kernel.APad:99
      _this.vy=0;
      //$LASTPOS=52000110;//kernel.APad:110
      _this.outerRadius=_this.outerRadius||50;
      //$LASTPOS=52000144;//kernel.APad:144
      _this.fillStyle=_this.fillStyle||"white";
      //$LASTPOS=52000179;//kernel.APad:179
      _this.strokeStyle=_this.strokeStyle||"white";
      //$LASTPOS=52000218;//kernel.APad:218
      _this.innerRadius=_this.innerRadius||10;
      //$LASTPOS=52000252;//kernel.APad:252
      _this.keySpeed=_this.keySpeed||15/50;
      //$LASTPOS=52000283;//kernel.APad:283
      _this.leftKey=_this.leftKey||"left";
      //$LASTPOS=52000313;//kernel.APad:313
      _this.rightKey=_this.rightKey||"right";
      //$LASTPOS=52000346;//kernel.APad:346
      _this.upKey=_this.upKey||"up";
      //$LASTPOS=52000370;//kernel.APad:370
      _this.downKey=_this.downKey||"down";
      //$LASTPOS=52000400;//kernel.APad:400
      _this.decay=_this.decay||0.8;
      //$LASTPOS=52000423;//kernel.APad:423
      _this.velocity=new Tonyu.classes.kernel.Vec3View(_this,{x: "vx",y: "vy",z: "vz"});
      //$LASTPOS=52000480;//kernel.APad:480
      if ((typeof  _this.x!=="number")||_this.x!==_this.x) {
        //$LASTPOS=52000527;//kernel.APad:527
        _this.x=Tonyu.globals.$screenWidth/2;
        
      }
      //$LASTPOS=52000557;//kernel.APad:557
      if ((typeof  _this.y!=="number")||_this.y!==_this.y) {
        //$LASTPOS=52000604;//kernel.APad:604
        _this.y=Tonyu.globals.$screenHeight-_this.outerRadius-_this.innerRadius;
        
      }
      //$LASTPOS=52000695;//kernel.APad:695
      _this.ix=_this.x;
      //$LASTPOS=52000700;//kernel.APad:700
      _this.iy=_this.y;
    },
    __getter__defaultLayer :function _trc_APad___getter__defaultLayer() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$frontLayer;
    },
    draw :function _trc_APad_draw(ctx) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=52000805;//kernel.APad:805
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=52000837;//kernel.APad:837
      ctx.fillStyle=_this.fillStyle;
      //$LASTPOS=52000867;//kernel.APad:867
      ctx.beginPath();
      //$LASTPOS=52000889;//kernel.APad:889
      ctx.arc(_this.ix,_this.iy,_this.innerRadius,0,Tonyu.globals.$Math.PI*2);
      //$LASTPOS=52000935;//kernel.APad:935
      ctx.closePath();
      //$LASTPOS=52000957;//kernel.APad:957
      ctx.fill();
      //$LASTPOS=52000974;//kernel.APad:974
      ctx.strokeStyle=_this.strokeStyle;
      //$LASTPOS=52001008;//kernel.APad:1008
      ctx.beginPath();
      //$LASTPOS=52001030;//kernel.APad:1030
      ctx.arc(_this.x,_this.y,_this.outerRadius,0,Tonyu.globals.$Math.PI*2);
      //$LASTPOS=52001074;//kernel.APad:1074
      ctx.closePath();
      //$LASTPOS=52001096;//kernel.APad:1096
      ctx.stroke();
    },
    findTouch :function _trc_APad_findTouch() {
      "use strict";
      var _this=this;
      var t;
      var _it_484;
      
      //$LASTPOS=52001131;//kernel.APad:1131
      _it_484=Tonyu.iterator(Tonyu.globals.$touches,1);
      while(_it_484.next()) {
        t=_it_484[0];
        
        //$LASTPOS=52001160;//kernel.APad:1160
        if ((! _this.touchRadius||_this.dist(t)<_this.touchRadius)&&t.touched==1) {
          return t;
          
        }
        
      }
    },
    loop :function _trc_APad_loop() {
      "use strict";
      var _this=this;
      var vx;
      var vy;
      
      //$LASTPOS=52001267;//kernel.APad:1267
      vx = 0;
      vy = 0;
      
      //$LASTPOS=52001287;//kernel.APad:1287
      while (true) {
        //$LASTPOS=52001304;//kernel.APad:1304
        if (! _this.t||_this.t.ended) {
          //$LASTPOS=52001323;//kernel.APad:1323
          _this.t=_this.findTouch();
        }
        //$LASTPOS=52001347;//kernel.APad:1347
        if (_this.t) {
          //$LASTPOS=52001369;//kernel.APad:1369
          vx+=_this.t.vx;
          //$LASTPOS=52001392;//kernel.APad:1392
          vy+=_this.t.vy;
          
        } else {
          //$LASTPOS=52001424;//kernel.APad:1424
          vx*=_this.decay;
          //$LASTPOS=52001448;//kernel.APad:1448
          vy*=_this.decay;
          
        }
        //$LASTPOS=52001543;//kernel.APad:1543
        if (_this.getkey(_this.leftKey)) {
          //$LASTPOS=52001564;//kernel.APad:1564
          vx-=_this.keySpeed*_this.outerRadius;
        }
        //$LASTPOS=52001599;//kernel.APad:1599
        if (_this.getkey(_this.rightKey)) {
          //$LASTPOS=52001621;//kernel.APad:1621
          vx+=_this.keySpeed*_this.outerRadius;
        }
        //$LASTPOS=52001656;//kernel.APad:1656
        if (_this.getkey(_this.upKey)) {
          //$LASTPOS=52001675;//kernel.APad:1675
          vy-=_this.keySpeed*_this.outerRadius;
        }
        //$LASTPOS=52001710;//kernel.APad:1710
        if (_this.getkey(_this.downKey)) {
          //$LASTPOS=52001731;//kernel.APad:1731
          vy+=_this.keySpeed*_this.outerRadius;
        }
        //$LASTPOS=52001766;//kernel.APad:1766
        _this.d=_this.dist(vx,vy);
        //$LASTPOS=52001790;//kernel.APad:1790
        if (_this.d>_this.outerRadius) {
          //$LASTPOS=52001824;//kernel.APad:1824
          vx=vx/_this.d*_this.outerRadius;
          //$LASTPOS=52001858;//kernel.APad:1858
          vy=vy/_this.d*_this.outerRadius;
          
        }
        //$LASTPOS=52001899;//kernel.APad:1899
        _this.ix=_this.x+vx;
        //$LASTPOS=52001917;//kernel.APad:1917
        _this.iy=_this.y+vy;
        //$LASTPOS=52001935;//kernel.APad:1935
        _this.vx=_this.clamp(vx/_this.outerRadius,- 1,1);
        //$LASTPOS=52001980;//kernel.APad:1980
        _this.vy=_this.clamp(vy/_this.outerRadius,- 1,1);
        //$LASTPOS=52002025;//kernel.APad:2025
        _this.update();
        
      }
    },
    fiber$loop :function _trc_APad_f_loop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var vx;
      var vy;
      
      //$LASTPOS=52001267;//kernel.APad:1267
      vx = 0;
      vy = 0;
      
      
      _thread.enter(function _trc_APad_ent_loop(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52001287;//kernel.APad:1287
          case 1:
            //$LASTPOS=52001304;//kernel.APad:1304
            if (! _this.t||_this.t.ended) {
              //$LASTPOS=52001323;//kernel.APad:1323
              _this.t=_this.findTouch();
            }
            //$LASTPOS=52001347;//kernel.APad:1347
            if (_this.t) {
              //$LASTPOS=52001369;//kernel.APad:1369
              vx+=_this.t.vx;
              //$LASTPOS=52001392;//kernel.APad:1392
              vy+=_this.t.vy;
              
            } else {
              //$LASTPOS=52001424;//kernel.APad:1424
              vx*=_this.decay;
              //$LASTPOS=52001448;//kernel.APad:1448
              vy*=_this.decay;
              
            }
            //$LASTPOS=52001543;//kernel.APad:1543
            if (_this.getkey(_this.leftKey)) {
              //$LASTPOS=52001564;//kernel.APad:1564
              vx-=_this.keySpeed*_this.outerRadius;
            }
            //$LASTPOS=52001599;//kernel.APad:1599
            if (_this.getkey(_this.rightKey)) {
              //$LASTPOS=52001621;//kernel.APad:1621
              vx+=_this.keySpeed*_this.outerRadius;
            }
            //$LASTPOS=52001656;//kernel.APad:1656
            if (_this.getkey(_this.upKey)) {
              //$LASTPOS=52001675;//kernel.APad:1675
              vy-=_this.keySpeed*_this.outerRadius;
            }
            //$LASTPOS=52001710;//kernel.APad:1710
            if (_this.getkey(_this.downKey)) {
              //$LASTPOS=52001731;//kernel.APad:1731
              vy+=_this.keySpeed*_this.outerRadius;
            }
            //$LASTPOS=52001766;//kernel.APad:1766
            _this.d=_this.dist(vx,vy);
            //$LASTPOS=52001790;//kernel.APad:1790
            if (_this.d>_this.outerRadius) {
              //$LASTPOS=52001824;//kernel.APad:1824
              vx=vx/_this.d*_this.outerRadius;
              //$LASTPOS=52001858;//kernel.APad:1858
              vy=vy/_this.d*_this.outerRadius;
              
            }
            //$LASTPOS=52001899;//kernel.APad:1899
            _this.ix=_this.x+vx;
            //$LASTPOS=52001917;//kernel.APad:1917
            _this.iy=_this.y+vy;
            //$LASTPOS=52001935;//kernel.APad:1935
            _this.vx=_this.clamp(vx/_this.outerRadius,- 1,1);
            //$LASTPOS=52001980;//kernel.APad:1980
            _this.vy=_this.clamp(vy/_this.outerRadius,- 1,1);
            //$LASTPOS=52002025;//kernel.APad:2025
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __getter__speed :function _trc_APad___getter__speed() {
      "use strict";
      var _this=this;
      
      return _this.sqrt(_this.vx*_this.vx+_this.vy*_this.vy);
    },
    __getter__direction :function _trc_APad___getter__direction() {
      "use strict";
      var _this=this;
      
      return _this.atanxy(_this.vx,_this.vy);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"__getter__defaultLayer":{"nowait":true},"draw":{"nowait":true},"findTouch":{"nowait":true},"loop":{"nowait":false},"__getter__speed":{"nowait":true},"__getter__direction":{"nowait":true}},"fields":{"vx":{},"vy":{},"outerRadius":{},"strokeStyle":{},"innerRadius":{},"keySpeed":{},"leftKey":{},"rightKey":{},"upKey":{},"downKey":{},"decay":{},"velocity":{},"ix":{},"iy":{},"touchRadius":{},"t":{},"d":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Button',
  shortName: 'Button',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Button_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=53000529;//kernel.Button:529
      while (true) {
        //$LASTPOS=53000548;//kernel.Button:548
        if (! _this.disabled) {
          //$LASTPOS=53000574;//kernel.Button:574
          _this.clicked=_this.checkTouch();
          //$LASTPOS=53000605;//kernel.Button:605
          if (_this.clicked==1) {
            //$LASTPOS=53000636;//kernel.Button:636
            Tonyu.classes.kernel.Button.last=_this;
            //$LASTPOS=53000667;//kernel.Button:667
            if (_this.onClick) {
              //$LASTPOS=53000680;//kernel.Button:680
              _this.onClick();
            }
            
          }
          
        } else {
          //$LASTPOS=53000725;//kernel.Button:725
          _this.clicked=0;
          
        }
        //$LASTPOS=53001070;//kernel.Button:1070
        _this.update();
        
      }
    },
    fiber$main :function _trc_Button_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Button_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=53000529;//kernel.Button:529
          case 1:
            //$LASTPOS=53000548;//kernel.Button:548
            if (!(! _this.disabled)) { __pc=3     ; break; }
            //$LASTPOS=53000574;//kernel.Button:574
            _this.fiber$checkTouch(_thread);
            __pc=2;return;
          case 2:
            _this.clicked=_thread.retVal;
            
            //$LASTPOS=53000605;//kernel.Button:605
            if (_this.clicked==1) {
              //$LASTPOS=53000636;//kernel.Button:636
              Tonyu.classes.kernel.Button.last=_this;
              //$LASTPOS=53000667;//kernel.Button:667
              if (_this.onClick) {
                //$LASTPOS=53000680;//kernel.Button:680
                _this.onClick();
              }
              
            }
            __pc=4     ;break;
          case 3     :
            {
              //$LASTPOS=53000725;//kernel.Button:725
              _this.clicked=0;
            }
          case 4     :
            
            //$LASTPOS=53001070;//kernel.Button:1070
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=1;break;
          case 6     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_Button_initialize(options) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=53000121;//kernel.Button:121
      options.layer=options.layer||Tonyu.globals.$frontLayer;
      //$LASTPOS=53000168;//kernel.Button:168
      Tonyu.classes.kernel.Actor.apply( _this, [options]);
      //$LASTPOS=53000189;//kernel.Button:189
      _this.fillStyle=_this.fillStyle||"rgb(179,255,142)";
      //$LASTPOS=53000235;//kernel.Button:235
      _this.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=53000274;//kernel.Button:274
      _this.clickedStyle=_this.clickedStyle||"white";
      //$LASTPOS=53000315;//kernel.Button:315
      _this.disabledStrokeStyle=_this.disabledStrokeStyle||"#ddd";
      //$LASTPOS=53000369;//kernel.Button:369
      _this.padding=typeof  (_this.padding)=="number"?_this.padding:5;
      //$LASTPOS=53000420;//kernel.Button:420
      _this.width=_this.width||Tonyu.globals.$screenWidth-100;
      //$LASTPOS=53000460;//kernel.Button:460
      _this.height=_this.height||50;
      //$LASTPOS=53000488;//kernel.Button:488
      _this.left=typeof  (_this.left)=="number"?_this.left:50;
    },
    checkTouch :function _trc_Button_checkTouch() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=53001105;//kernel.Button:1105
      //$LASTPOS=53001110;//kernel.Button:1110
      _this.i=0;for (; _this.i<2 ; _this.i++) {
        {
          //$LASTPOS=53001137;//kernel.Button:1137
          if (Tonyu.globals.$touches[_this.i].touched>0&&_this.inRect(Tonyu.globals.$touches[_this.i])) {
            return Tonyu.globals.$touches[_this.i].touched;
            
          }
        }
      }
      //$LASTPOS=53001253;//kernel.Button:1253
      if (_this.key) {
        return _this.getkey(_this.key);
      }
      return 0;
    },
    fiber$checkTouch :function _trc_Button_f_checkTouch(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=53001105;//kernel.Button:1105
      //$LASTPOS=53001110;//kernel.Button:1110
      _this.i=0;for (; _this.i<2 ; _this.i++) {
        {
          //$LASTPOS=53001137;//kernel.Button:1137
          if (Tonyu.globals.$touches[_this.i].touched>0&&_this.inRect(Tonyu.globals.$touches[_this.i])) {
            _thread.retVal=Tonyu.globals.$touches[_this.i].touched;return;
            
            
          }
        }
      }
      //$LASTPOS=53001253;//kernel.Button:1253
      if (_this.key) {
        _thread.retVal=_this.getkey(_this.key);return;
        
      }
      _thread.retVal=0;return;
      
      
      _thread.retVal=_this;return;
    },
    inRect :function _trc_Button_inRect(p) {
      "use strict";
      var _this=this;
      
      return p.x>=_this.left&&p.x<=_this.left+_this.width&&p.y>=_this.top&&p.y<=_this.top+_this.height;
    },
    fiber$inRect :function _trc_Button_f_inRect(_thread,p) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=p.x>=_this.left&&p.x<=_this.left+_this.width&&p.y>=_this.top&&p.y<=_this.top+_this.height;return;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Button_draw(c) {
      "use strict";
      var _this=this;
      var size;
      var f;
      var r;
      
      //$LASTPOS=53001407;//kernel.Button:1407
      c.fillStyle=_this.fillStyle||"gray";
      //$LASTPOS=53001445;//kernel.Button:1445
      c.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=53001488;//kernel.Button:1488
      if (_this.disabled) {
        //$LASTPOS=53001502;//kernel.Button:1502
        c.strokeStyle=_this.disabledStrokeStyle;
      }
      //$LASTPOS=53001542;//kernel.Button:1542
      c.fillRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=53001585;//kernel.Button:1585
      c.strokeRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=53001630;//kernel.Button:1630
      size = _this.height-_this.padding*2;
      
      //$LASTPOS=53001662;//kernel.Button:1662
      f = c.font.replace(/^[0-9]+px /,"");
      
      //$LASTPOS=53001706;//kernel.Button:1706
      c.font=size+"px "+f;
      //$LASTPOS=53001745;//kernel.Button:1745
      c.textBaseline="top";
      //$LASTPOS=53001772;//kernel.Button:1772
      c.fillStyle=_this.clicked?_this.clickedStyle:_this.disabled?_this.disabledStrokeStyle:_this.strokeStyle;
      //$LASTPOS=53001858;//kernel.Button:1858
      r = c.measureText(_this.text);
      
      //$LASTPOS=53001890;//kernel.Button:1890
      c.fillText(_this.text,_this.left+_this.width/2-r.width/2,_this.top+_this.padding);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"checkTouch":{"nowait":false},"inRect":{"nowait":false},"draw":{"nowait":true}},"fields":{"disabled":{},"clicked":{},"onClick":{},"strokeStyle":{},"clickedStyle":{},"disabledStrokeStyle":{},"padding":{},"left":{},"i":{},"key":{},"top":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.GameConsole',
  shortName: 'GameConsole',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_GameConsole_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_GameConsole_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_GameConsole_initialize(opt) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=54000084;//kernel.GameConsole:84
      _this.extend(opt);
      //$LASTPOS=54000102;//kernel.GameConsole:102
      _this.cw=_this.canvas.width();
      //$LASTPOS=54000126;//kernel.GameConsole:126
      _this.ch=_this.canvas.height();
      //$LASTPOS=54000151;//kernel.GameConsole:151
      Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=54000178;//kernel.GameConsole:178
      Tonyu.globals.$Screen=_this.gameScreen=new Tonyu.classes.kernel.GameScreen({width: 465,height: 465,sprites: Tonyu.globals.$Sprites});
      //$LASTPOS=54000259;//kernel.GameConsole:259
      Tonyu.globals.$FrontSprites=_this.sprites=new Tonyu.classes.kernel.Sprites;
      //$LASTPOS=54000299;//kernel.GameConsole:299
      _this.sprites.add(_this.gameScreen);
      //$LASTPOS=54000329;//kernel.GameConsole:329
      _this.cctx=_this.canvas[0].getContext("2d");
    },
    shouldDraw1x1 :function _trc_GameConsole_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=54000448;//kernel.GameConsole:448
      larger = 200;
      
      //$LASTPOS=54000469;//kernel.GameConsole:469
      smaller = 5;
      
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_GameConsole_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=54000448;//kernel.GameConsole:448
      larger = 200;
      
      //$LASTPOS=54000469;//kernel.GameConsole:469
      smaller = 5;
      
      _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
      
      
      _thread.retVal=_this;return;
    },
    layout :function _trc_GameConsole_layout() {
      "use strict";
      var _this=this;
      var width;
      var height;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=54000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=54000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=54000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      
      //$LASTPOS=54000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      
      //$LASTPOS=54000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      
      //$LASTPOS=54000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      
      //$LASTPOS=54000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=54000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=54000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=54000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=54000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=54000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=54000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=54000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=54001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=54001049;//kernel.GameConsole:1049
      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});
    },
    fiber$layout :function _trc_GameConsole_f_layout(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var width;
      var height;
      var calcw;
      var calch;
      var marginw;
      var marginh;
      
      //$LASTPOS=54000606;//kernel.GameConsole:606
      _this.cw=_this.canvas.width();
      //$LASTPOS=54000630;//kernel.GameConsole:630
      _this.ch=_this.canvas.height();
      //$LASTPOS=54000655;//kernel.GameConsole:655
      width = _this.gameScreen.width;
      
      //$LASTPOS=54000688;//kernel.GameConsole:688
      height = _this.gameScreen.height;
      
      //$LASTPOS=54000723;//kernel.GameConsole:723
      calcw = _this.ch/height*width;
      
      //$LASTPOS=54000767;//kernel.GameConsole:767
      calch = _this.cw/width*height;
      
      //$LASTPOS=54000811;//kernel.GameConsole:811
      if (calch>_this.ch) {
        //$LASTPOS=54000825;//kernel.GameConsole:825
        calch=_this.ch;
      }
      //$LASTPOS=54000840;//kernel.GameConsole:840
      if (calcw>_this.cw) {
        //$LASTPOS=54000854;//kernel.GameConsole:854
        calcw=_this.cw;
      }
      //$LASTPOS=54000869;//kernel.GameConsole:869
      if (_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=54000925;//kernel.GameConsole:925
        calcw=width;
        //$LASTPOS=54000937;//kernel.GameConsole:937
        calch=height;
        
      }
      //$LASTPOS=54000963;//kernel.GameConsole:963
      marginw = Math.floor((_this.cw-calcw)/2);
      
      //$LASTPOS=54001006;//kernel.GameConsole:1006
      marginh = Math.floor((_this.ch-calch)/2);
      
      //$LASTPOS=54001049;//kernel.GameConsole:1049
      _this.gameScreen.setBounds({left: marginw,top: marginh,width: calcw,height: calch});
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_GameConsole_draw() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=54001144;//kernel.GameConsole:1144
      _this.layout();
      //$LASTPOS=54001159;//kernel.GameConsole:1159
      _this.sprites.draw(_this.canvas[0]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"shouldDraw1x1":{"nowait":false},"layout":{"nowait":false},"draw":{"nowait":true}},"fields":{"cw":{},"canvas":{},"ch":{},"gameScreen":{},"sprites":{},"cctx":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Label',
  shortName: 'Label',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Label_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Label_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_Label_initialize(x,y,f) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=55000049;//kernel.Label:49
      if (typeof  x=="object") {
        //$LASTPOS=55000084;//kernel.Label:84
        x.layer=x.layer||Tonyu.globals.$frontLayer;
        
      }
      //$LASTPOS=55000126;//kernel.Label:126
      Tonyu.classes.kernel.Actor.apply( _this, [x,y,- 1]);
      //$LASTPOS=55000146;//kernel.Label:146
      if (x==null) {
        //$LASTPOS=55000159;//kernel.Label:159
        x=50;
      }
      //$LASTPOS=55000170;//kernel.Label:170
      if (y==null) {
        //$LASTPOS=55000183;//kernel.Label:183
        y=50;
      }
      //$LASTPOS=55000194;//kernel.Label:194
      if (! _this.template&&! _this._text) {
        //$LASTPOS=55000230;//kernel.Label:230
        _this.text="text";
        
      }
    },
    __getter__text :function _trc_Label___getter__text() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=55000268;//kernel.Label:268
      if (! _this.template) {
        return _this._text;
      }
      return _this.template.replace(/[\$\@][A-Za-z0-9\.]* ?/g,(function anonymous_353(v) {
        
        //$LASTPOS=55000369;//kernel.Label:369
        v=v.replace(/ $/,"");
        //$LASTPOS=55000400;//kernel.Label:400
        if (v=="") {
          return "$";
        }
        //$LASTPOS=55000432;//kernel.Label:432
        if (v.match(/^@/)) {
          return _this.exapndVal(_this.target,v.substring(1).split("."));
          
        } else {
          return _this.expandVal(Tonyu.globals,v.split("."));
          
        }
      }));
    },
    expandVal :function _trc_Label_expandVal(obj,flds) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=55000654;//kernel.Label:654
      while (flds.length>0) {
        //$LASTPOS=55000687;//kernel.Label:687
        if (! obj) {
          return "";
        }
        //$LASTPOS=55000717;//kernel.Label:717
        obj=obj[flds.shift()];
        
      }
      return obj;
    },
    fiber$expandVal :function _trc_Label_f_expandVal(_thread,obj,flds) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Label_ent_expandVal(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=55000654;//kernel.Label:654
          case 1:
            if (!(flds.length>0)) { __pc=3     ; break; }
            //$LASTPOS=55000687;//kernel.Label:687
            if (!(! obj)) { __pc=2     ; break; }
            _thread.exit("");return;
          case 2     :
            
            //$LASTPOS=55000717;//kernel.Label:717
            obj=obj[flds.shift()];
            __pc=1;break;
          case 3     :
            
            _thread.exit(obj);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __setter__text :function _trc_Label___setter__text(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=55000783;//kernel.Label:783
      delete _this.template;
      //$LASTPOS=55000805;//kernel.Label:805
      _this._text=v;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"__getter__text":{"nowait":true},"expandVal":{"nowait":false},"__setter__text":{"nowait":true}},"fields":{"template":{},"_text":{},"exapndVal":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.MapEditor',
  shortName: 'MapEditor',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MapEditor_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=56000049;//kernel.MapEditor:49
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=56000075;//kernel.MapEditor:75
      _this.loadMode=false;
      //$LASTPOS=56000092;//kernel.MapEditor:92
      _this.fileExist=false;
      //$LASTPOS=56000110;//kernel.MapEditor:110
      Tonyu.globals.$Boot.on("stop",(function anonymous_127(e) {
        
        //$LASTPOS=56000179;//kernel.MapEditor:179
        if (_this.modified) {
          //$LASTPOS=56000204;//kernel.MapEditor:204
          e.preventDefault();
          //$LASTPOS=56000233;//kernel.MapEditor:233
          _this.parallel(Tonyu.bindFunc(_this,_this.st),e);
          
        }
      }));
      //$LASTPOS=56000646;//kernel.MapEditor:646
      _this.print("map file(s)");
      //$LASTPOS=56000694;//kernel.MapEditor:694
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=56000722;//kernel.MapEditor:722
      if (_this.fileList.exists()) {
        //$LASTPOS=56000750;//kernel.MapEditor:750
        _this.fileList.recursive((function a(f) {
          
          //$LASTPOS=56000844;//kernel.MapEditor:844
          _this.print(f.name());
          //$LASTPOS=56000900;//kernel.MapEditor:900
          _this.fileExist=true;
        }));
        
      }
      //$LASTPOS=56000943;//kernel.MapEditor:943
      if (_this.fileExist) {
        //$LASTPOS=56000963;//kernel.MapEditor:963
        _this.print("Load Data?: Y or N");
        //$LASTPOS=56000997;//kernel.MapEditor:997
        while (true) {
          //$LASTPOS=56001019;//kernel.MapEditor:1019
          if (_this.getkey("y")>0) {
            //$LASTPOS=56001051;//kernel.MapEditor:1051
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=56001106;//kernel.MapEditor:1106
          if (_this.getkey("n")>0) {
            //$LASTPOS=56001138;//kernel.MapEditor:1138
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=56001194;//kernel.MapEditor:1194
          _this.update();
          
        }
        //$LASTPOS=56001216;//kernel.MapEditor:1216
        if (_this.loadMode) {
          //$LASTPOS=56001239;//kernel.MapEditor:1239
          _this.fileName=_this.prompt("Input json file (*.json)","map.json");
          //$LASTPOS=56001304;//kernel.MapEditor:1304
          if (_this.fileName) {
            //$LASTPOS=56001331;//kernel.MapEditor:1331
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=56001395;//kernel.MapEditor:1395
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=56001431;//kernel.MapEditor:1431
            _this.baseData=_this.mapDataFile.obj();
            //$LASTPOS=56001472;//kernel.MapEditor:1472
            _this.loadedFile=_this.fileName;
            
          } else {
            //$LASTPOS=56001522;//kernel.MapEditor:1522
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=56001563;//kernel.MapEditor:1563
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=56001603;//kernel.MapEditor:1603
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=56001648;//kernel.MapEditor:1648
              _this.loadedFile=_this.fileName;
              
            }
            
          }
          //$LASTPOS=56001704;//kernel.MapEditor:1704
          if (_this.baseData==undefined) {
            //$LASTPOS=56001742;//kernel.MapEditor:1742
            _this.print("Load failed");
            //$LASTPOS=56001777;//kernel.MapEditor:1777
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=56001808;//kernel.MapEditor:1808
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=56001853;//kernel.MapEditor:1853
              _this.modified=false;
              //$LASTPOS=56001882;//kernel.MapEditor:1882
              _this.mapData=_this.baseData[0];
              //$LASTPOS=56001916;//kernel.MapEditor:1916
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=56001952;//kernel.MapEditor:1952
              if (_this.baseData.length>2) {
                //$LASTPOS=56001992;//kernel.MapEditor:1992
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=56002048;//kernel.MapEditor:2048
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=56002125;//kernel.MapEditor:2125
      _this.update();
      //$LASTPOS=56002170;//kernel.MapEditor:2170
      if (! _this.loadMode) {
        //$LASTPOS=56002190;//kernel.MapEditor:2190
        _this.row=_this.prompt("input row");
        //$LASTPOS=56002220;//kernel.MapEditor:2220
        _this.col=_this.prompt("input col");
        //$LASTPOS=56002250;//kernel.MapEditor:2250
        _this.chipWidth=_this.prompt("input chipWidth");
        //$LASTPOS=56002292;//kernel.MapEditor:2292
        _this.chipHeight=_this.prompt("input chipHeight");
        //$LASTPOS=56002336;//kernel.MapEditor:2336
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=56002401;//kernel.MapEditor:2401
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=56002432;//kernel.MapEditor:2432
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=56002464;//kernel.MapEditor:2464
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=56002497;//kernel.MapEditor:2497
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=56002548;//kernel.MapEditor:2548
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=56002859;//kernel.MapEditor:2859
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=56002906;//kernel.MapEditor:2906
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=56002932;//kernel.MapEditor:2932
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=56003028;//kernel.MapEditor:3028
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=56003059;//kernel.MapEditor:3059
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=56003091;//kernel.MapEditor:3091
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=56003124;//kernel.MapEditor:3124
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=56003191;//kernel.MapEditor:3191
      _this.mIW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.width;
      //$LASTPOS=56003234;//kernel.MapEditor:3234
      _this.mIH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.height;
      //$LASTPOS=56003278;//kernel.MapEditor:3278
      _this.mCW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].width;
      //$LASTPOS=56003317;//kernel.MapEditor:3317
      _this.mCH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].height;
      //$LASTPOS=56003357;//kernel.MapEditor:3357
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
      //$LASTPOS=56003439;//kernel.MapEditor:3439
      _this.counter=0;
      //$LASTPOS=56003451;//kernel.MapEditor:3451
      //$LASTPOS=56003455;//kernel.MapEditor:3455
      _this.i = 0;
      for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
        {
          //$LASTPOS=56003484;//kernel.MapEditor:3484
          //$LASTPOS=56003488;//kernel.MapEditor:3488
          _this.j = 0;
          for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
            {
              //$LASTPOS=56003521;//kernel.MapEditor:3521
              Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=56003565;//kernel.MapEditor:3565
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=56003589;//kernel.MapEditor:3589
      Tonyu.globals.$consolePanel.clearRect(0,0,Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=56003669;//kernel.MapEditor:3669
      _this.mode="get";
      //$LASTPOS=56003682;//kernel.MapEditor:3682
      _this.prevMode="set";
      //$LASTPOS=56003699;//kernel.MapEditor:3699
      _this.mapp=0;
      //$LASTPOS=56003708;//kernel.MapEditor:3708
      _this.maponp=- 1;
      //$LASTPOS=56003720;//kernel.MapEditor:3720
      _this.mx=- 40;
      //$LASTPOS=56003729;//kernel.MapEditor:3729
      _this.my=- 40;
      //$LASTPOS=56003738;//kernel.MapEditor:3738
      _this.chipX=- 40;
      //$LASTPOS=56003750;//kernel.MapEditor:3750
      _this.chipY=- 40;
      //$LASTPOS=56003762;//kernel.MapEditor:3762
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=56003791;//kernel.MapEditor:3791
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=56003822;//kernel.MapEditor:3822
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=56003847;//kernel.MapEditor:3847
      _this.initialWidth=Tonyu.globals.$map.chipWidth;
      //$LASTPOS=56003877;//kernel.MapEditor:3877
      _this.initialHeight=Tonyu.globals.$map.chipHeight;
      //$LASTPOS=56003909;//kernel.MapEditor:3909
      _this.layers=["base","on","all"];
      //$LASTPOS=56003938;//kernel.MapEditor:3938
      _this.lc=0;
      //$LASTPOS=56003945;//kernel.MapEditor:3945
      _this.selectedLayer=_this.layers[_this.lc];
      //$LASTPOS=56003972;//kernel.MapEditor:3972
      _this.drawPanel();
      //$LASTPOS=56003986;//kernel.MapEditor:3986
      _this.drawLetter(_this.mode);
      //$LASTPOS=56004007;//kernel.MapEditor:4007
      while (true) {
        //$LASTPOS=56004025;//kernel.MapEditor:4025
        _this.p=_this.mapp;
        //$LASTPOS=56004038;//kernel.MapEditor:4038
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
          //$LASTPOS=56004157;//kernel.MapEditor:4157
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=56004191;//kernel.MapEditor:4191
          _this.mode="erase";
          //$LASTPOS=56004246;//kernel.MapEditor:4246
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=56004276;//kernel.MapEditor:4276
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=56004395;//kernel.MapEditor:4395
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=56004429;//kernel.MapEditor:4429
          _this.mode="set";
          //$LASTPOS=56004450;//kernel.MapEditor:4450
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=56004480;//kernel.MapEditor:4480
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=56004601;//kernel.MapEditor:4601
          _this.lc++;
          //$LASTPOS=56004616;//kernel.MapEditor:4616
          _this.selectedLayer=_this.layers[_this.lc%3];
          //$LASTPOS=56004653;//kernel.MapEditor:4653
          _this.drawPanel();
          //$LASTPOS=56004707;//kernel.MapEditor:4707
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=56004830;//kernel.MapEditor:4830
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=56004951;//kernel.MapEditor:4951
          if (_this.mode!="get") {
            //$LASTPOS=56004981;//kernel.MapEditor:4981
            _this.prevMode=_this.mode;
            //$LASTPOS=56005009;//kernel.MapEditor:5009
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=56005045;//kernel.MapEditor:5045
            _this.mode="get";
            //$LASTPOS=56005070;//kernel.MapEditor:5070
            _this.chipX=- 40;
            //$LASTPOS=56005094;//kernel.MapEditor:5094
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=56005134;//kernel.MapEditor:5134
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=56005172;//kernel.MapEditor:5172
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=56005239;//kernel.MapEditor:5239
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=56005269;//kernel.MapEditor:5269
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=56005405;//kernel.MapEditor:5405
          if (_this.loadedFile) {
            //$LASTPOS=56005434;//kernel.MapEditor:5434
            _this.saveFileName=_this.prompt("input json file(*.json)",_this.loadedFile);
            
          } else {
            //$LASTPOS=56005522;//kernel.MapEditor:5522
            _this.saveFileName=_this.prompt("input json file(*.json)","map.json");
            
          }
          //$LASTPOS=56005616;//kernel.MapEditor:5616
          if (_this.saveFileName) {
            //$LASTPOS=56005647;//kernel.MapEditor:5647
            _this.save(_this.saveFileName);
            
          }
          
        }
        //$LASTPOS=56005947;//kernel.MapEditor:5947
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640) {
          //$LASTPOS=56006068;//kernel.MapEditor:6068
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=56006102;//kernel.MapEditor:6102
          _this.mode="copy";
          //$LASTPOS=56006156;//kernel.MapEditor:6156
          _this.drawLetter(_this.mode);
          
        }
        //$LASTPOS=56006186;//kernel.MapEditor:6186
        if (_this.mode!="get") {
          //$LASTPOS=56006212;//kernel.MapEditor:6212
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=56006318;//kernel.MapEditor:6318
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=56006336;//kernel.MapEditor:6336
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=56006467;//kernel.MapEditor:6467
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=56006485;//kernel.MapEditor:6485
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=56006598;//kernel.MapEditor:6598
            _this.my=_this.my-8;
          }
          //$LASTPOS=56006616;//kernel.MapEditor:6616
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=56006751;//kernel.MapEditor:6751
            _this.my=_this.my+8;
          }
          //$LASTPOS=56006769;//kernel.MapEditor:6769
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=56006812;//kernel.MapEditor:6812
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=56006918;//kernel.MapEditor:6918
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=56006942;//kernel.MapEditor:6942
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=56007073;//kernel.MapEditor:7073
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=56007097;//kernel.MapEditor:7097
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=56007210;//kernel.MapEditor:7210
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=56007234;//kernel.MapEditor:7234
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=56007369;//kernel.MapEditor:7369
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=56007393;//kernel.MapEditor:7393
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=56007462;//kernel.MapEditor:7462
        if (_this.getkey("i")==1) {
          //$LASTPOS=56007491;//kernel.MapEditor:7491
          if (Tonyu.globals.$map.chipWidth<_this.initialWidth) {
            //$LASTPOS=56007523;//kernel.MapEditor:7523
            Tonyu.globals.$map.chipWidth+=4;
          }
          //$LASTPOS=56007551;//kernel.MapEditor:7551
          if (Tonyu.globals.$map.chipHeight<_this.initialHeight) {
            //$LASTPOS=56007585;//kernel.MapEditor:7585
            Tonyu.globals.$map.chipHeight+=4;
          }
          //$LASTPOS=56007614;//kernel.MapEditor:7614
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=56007641;//kernel.MapEditor:7641
          _this.panel.die();
          //$LASTPOS=56007663;//kernel.MapEditor:7663
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=56007763;//kernel.MapEditor:7763
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=56007798;//kernel.MapEditor:7798
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=56007834;//kernel.MapEditor:7834
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=56007871;//kernel.MapEditor:7871
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=56007929;//kernel.MapEditor:7929
        if (_this.getkey("o")==1) {
          //$LASTPOS=56007958;//kernel.MapEditor:7958
          if (Tonyu.globals.$map.chipWidth>4) {
            //$LASTPOS=56007979;//kernel.MapEditor:7979
            Tonyu.globals.$map.chipWidth-=4;
          }
          //$LASTPOS=56008007;//kernel.MapEditor:8007
          if (Tonyu.globals.$map.chipHeight>4) {
            //$LASTPOS=56008029;//kernel.MapEditor:8029
            Tonyu.globals.$map.chipHeight-=4;
          }
          //$LASTPOS=56008058;//kernel.MapEditor:8058
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=56008085;//kernel.MapEditor:8085
          _this.panel.die();
          //$LASTPOS=56008107;//kernel.MapEditor:8107
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=56008207;//kernel.MapEditor:8207
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=56008242;//kernel.MapEditor:8242
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=56008278;//kernel.MapEditor:8278
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=56008315;//kernel.MapEditor:8315
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=56008399;//kernel.MapEditor:8399
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=56008430;//kernel.MapEditor:8430
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=56008462;//kernel.MapEditor:8462
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=56008515;//kernel.MapEditor:8515
          if (_this.selectedLayer=="base") {
            //$LASTPOS=56008555;//kernel.MapEditor:8555
            _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=56008611;//kernel.MapEditor:8611
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            //$LASTPOS=56008664;//kernel.MapEditor:8664
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
            
          } else {
            //$LASTPOS=56008722;//kernel.MapEditor:8722
            if (_this.selectedLayer=="on") {
              //$LASTPOS=56008760;//kernel.MapEditor:8760
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              
            } else {
              //$LASTPOS=56008831;//kernel.MapEditor:8831
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=56008884;//kernel.MapEditor:8884
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.maponp);
              
            }
          }
          //$LASTPOS=56008948;//kernel.MapEditor:8948
          _this.modified=true;
          
        } else {
          //$LASTPOS=56008974;//kernel.MapEditor:8974
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=56009029;//kernel.MapEditor:9029
            if (_this.selectedLayer=="base") {
              //$LASTPOS=56009069;//kernel.MapEditor:9069
              _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
              //$LASTPOS=56009125;//kernel.MapEditor:9125
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
              //$LASTPOS=56009176;//kernel.MapEditor:9176
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
              
            } else {
              //$LASTPOS=56009234;//kernel.MapEditor:9234
              if (_this.selectedLayer=="on") {
                //$LASTPOS=56009272;//kernel.MapEditor:9272
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                
              } else {
                //$LASTPOS=56009341;//kernel.MapEditor:9341
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                //$LASTPOS=56009392;//kernel.MapEditor:9392
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                
              }
            }
            //$LASTPOS=56009452;//kernel.MapEditor:9452
            _this.modified=true;
            
          } else {
            //$LASTPOS=56009478;//kernel.MapEditor:9478
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=56009531;//kernel.MapEditor:9531
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=56009611;//kernel.MapEditor:9611
              _this.mode="set";
              //$LASTPOS=56009632;//kernel.MapEditor:9632
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=56009698;//kernel.MapEditor:9698
              _this.drawLetter(_this.mode);
              //$LASTPOS=56009725;//kernel.MapEditor:9725
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=56009750;//kernel.MapEditor:9750
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=56009805;//kernel.MapEditor:9805
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                //$LASTPOS=56009856;//kernel.MapEditor:9856
                _this.modified=true;
                
              } else {
                //$LASTPOS=56009882;//kernel.MapEditor:9882
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=56009936;//kernel.MapEditor:9936
                  if (_this.selectedLayer=="base") {
                    //$LASTPOS=56009976;//kernel.MapEditor:9976
                    _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                    //$LASTPOS=56010029;//kernel.MapEditor:10029
                    _this.maponp=- 1;
                    
                  } else {
                    //$LASTPOS=56010055;//kernel.MapEditor:10055
                    if (_this.selectedLayer=="on") {
                      //$LASTPOS=56010093;//kernel.MapEditor:10093
                      _this.mapp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      
                    } else {
                      //$LASTPOS=56010164;//kernel.MapEditor:10164
                      _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      //$LASTPOS=56010217;//kernel.MapEditor:10217
                      _this.maponp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                      
                    }
                  }
                  //$LASTPOS=56010334;//kernel.MapEditor:10334
                  _this.mode="set";
                  //$LASTPOS=56010387;//kernel.MapEditor:10387
                  _this.drawLetter(_this.mode);
                  //$LASTPOS=56010414;//kernel.MapEditor:10414
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=56010440;//kernel.MapEditor:10440
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=56000049;//kernel.MapEditor:49
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=56000075;//kernel.MapEditor:75
      _this.loadMode=false;
      //$LASTPOS=56000092;//kernel.MapEditor:92
      _this.fileExist=false;
      //$LASTPOS=56000110;//kernel.MapEditor:110
      Tonyu.globals.$Boot.on("stop",(function anonymous_127(e) {
        
        //$LASTPOS=56000179;//kernel.MapEditor:179
        if (_this.modified) {
          //$LASTPOS=56000204;//kernel.MapEditor:204
          e.preventDefault();
          //$LASTPOS=56000233;//kernel.MapEditor:233
          _this.parallel(Tonyu.bindFunc(_this,_this.st),e);
          
        }
      }));
      //$LASTPOS=56000646;//kernel.MapEditor:646
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditor_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=56000694;//kernel.MapEditor:694
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=56000722;//kernel.MapEditor:722
            if (_this.fileList.exists()) {
              //$LASTPOS=56000750;//kernel.MapEditor:750
              _this.fileList.recursive((function a(f) {
                
                //$LASTPOS=56000844;//kernel.MapEditor:844
                _this.print(f.name());
                //$LASTPOS=56000900;//kernel.MapEditor:900
                _this.fileExist=true;
              }));
              
            }
            //$LASTPOS=56000943;//kernel.MapEditor:943
            if (!(_this.fileExist)) { __pc=12    ; break; }
            //$LASTPOS=56000963;//kernel.MapEditor:963
            _this.print("Load Data?: Y or N");
            //$LASTPOS=56000997;//kernel.MapEditor:997
          case 2:
            //$LASTPOS=56001019;//kernel.MapEditor:1019
            if (!(_this.getkey("y")>0)) { __pc=3     ; break; }
            //$LASTPOS=56001051;//kernel.MapEditor:1051
            _this.loadMode=true;
            __pc=6     ; break;
            
          case 3     :
            
            //$LASTPOS=56001106;//kernel.MapEditor:1106
            if (!(_this.getkey("n")>0)) { __pc=4     ; break; }
            //$LASTPOS=56001138;//kernel.MapEditor:1138
            _this.loadMode=false;
            __pc=6     ; break;
            
          case 4     :
            
            //$LASTPOS=56001194;//kernel.MapEditor:1194
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6     :
            
            //$LASTPOS=56001216;//kernel.MapEditor:1216
            if (!(_this.loadMode)) { __pc=11    ; break; }
            //$LASTPOS=56001239;//kernel.MapEditor:1239
            _this.fiber$prompt(_thread, "Input json file (*.json)", "map.json");
            __pc=7;return;
          case 7:
            _this.fileName=_thread.retVal;
            
            //$LASTPOS=56001304;//kernel.MapEditor:1304
            if (_this.fileName) {
              //$LASTPOS=56001331;//kernel.MapEditor:1331
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=56001395;//kernel.MapEditor:1395
            if (!(_this.mapDataFile.obj())) { __pc=8     ; break; }
            {
              //$LASTPOS=56001431;//kernel.MapEditor:1431
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=56001472;//kernel.MapEditor:1472
              _this.loadedFile=_this.fileName;
            }
            __pc=10    ;break;
          case 8     :
            //$LASTPOS=56001522;//kernel.MapEditor:1522
            _this.fiber$file(_thread, _this.fileName);
            __pc=9;return;
          case 9:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=56001563;//kernel.MapEditor:1563
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=56001603;//kernel.MapEditor:1603
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=56001648;//kernel.MapEditor:1648
              _this.loadedFile=_this.fileName;
              
            }
          case 10    :
            
            //$LASTPOS=56001704;//kernel.MapEditor:1704
            if (_this.baseData==undefined) {
              //$LASTPOS=56001742;//kernel.MapEditor:1742
              _this.print("Load failed");
              //$LASTPOS=56001777;//kernel.MapEditor:1777
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=56001808;//kernel.MapEditor:1808
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=56001853;//kernel.MapEditor:1853
                _this.modified=false;
                //$LASTPOS=56001882;//kernel.MapEditor:1882
                _this.mapData=_this.baseData[0];
                //$LASTPOS=56001916;//kernel.MapEditor:1916
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=56001952;//kernel.MapEditor:1952
                if (_this.baseData.length>2) {
                  //$LASTPOS=56001992;//kernel.MapEditor:1992
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=56002048;//kernel.MapEditor:2048
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 11    :
            
          case 12    :
            
            //$LASTPOS=56002125;//kernel.MapEditor:2125
            _this.fiber$update(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=56002170;//kernel.MapEditor:2170
            if (!(! _this.loadMode)) { __pc=18    ; break; }
            //$LASTPOS=56002190;//kernel.MapEditor:2190
            _this.fiber$prompt(_thread, "input row");
            __pc=14;return;
          case 14:
            _this.row=_thread.retVal;
            
            //$LASTPOS=56002220;//kernel.MapEditor:2220
            _this.fiber$prompt(_thread, "input col");
            __pc=15;return;
          case 15:
            _this.col=_thread.retVal;
            
            //$LASTPOS=56002250;//kernel.MapEditor:2250
            _this.fiber$prompt(_thread, "input chipWidth");
            __pc=16;return;
          case 16:
            _this.chipWidth=_thread.retVal;
            
            //$LASTPOS=56002292;//kernel.MapEditor:2292
            _this.fiber$prompt(_thread, "input chipHeight");
            __pc=17;return;
          case 17:
            _this.chipHeight=_thread.retVal;
            
            //$LASTPOS=56002336;//kernel.MapEditor:2336
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
            //$LASTPOS=56002401;//kernel.MapEditor:2401
            _this.panel.x=_this.panel.width/2+40;
            //$LASTPOS=56002432;//kernel.MapEditor:2432
            _this.panel.y=_this.panel.height/2+40;
            //$LASTPOS=56002464;//kernel.MapEditor:2464
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=56002497;//kernel.MapEditor:2497
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=56002548;//kernel.MapEditor:2548
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
            __pc=19    ;break;
          case 18    :
            {
              //$LASTPOS=56002859;//kernel.MapEditor:2859
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=56002906;//kernel.MapEditor:2906
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=56002932;//kernel.MapEditor:2932
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=56003028;//kernel.MapEditor:3028
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=56003059;//kernel.MapEditor:3059
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=56003091;//kernel.MapEditor:3091
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=56003124;//kernel.MapEditor:3124
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 19    :
            
            //$LASTPOS=56003191;//kernel.MapEditor:3191
            _this.mIW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.width;
            //$LASTPOS=56003234;//kernel.MapEditor:3234
            _this.mIH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip].image.height;
            //$LASTPOS=56003278;//kernel.MapEditor:3278
            _this.mCW=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].width;
            //$LASTPOS=56003317;//kernel.MapEditor:3317
            _this.mCH=Tonyu.globals.$imageList[Tonyu.globals.$pat_mapchip+0].height;
            //$LASTPOS=56003357;//kernel.MapEditor:3357
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
            //$LASTPOS=56003439;//kernel.MapEditor:3439
            _this.counter=0;
            //$LASTPOS=56003451;//kernel.MapEditor:3451
            //$LASTPOS=56003455;//kernel.MapEditor:3455
            _this.i = 0;
            for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
              {
                //$LASTPOS=56003484;//kernel.MapEditor:3484
                //$LASTPOS=56003488;//kernel.MapEditor:3488
                _this.j = 0;
                for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
                  {
                    //$LASTPOS=56003521;//kernel.MapEditor:3521
                    Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=56003565;//kernel.MapEditor:3565
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=56003589;//kernel.MapEditor:3589
            Tonyu.globals.$consolePanel.clearRect(0,0,Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
            //$LASTPOS=56003669;//kernel.MapEditor:3669
            _this.mode="get";
            //$LASTPOS=56003682;//kernel.MapEditor:3682
            _this.prevMode="set";
            //$LASTPOS=56003699;//kernel.MapEditor:3699
            _this.mapp=0;
            //$LASTPOS=56003708;//kernel.MapEditor:3708
            _this.maponp=- 1;
            //$LASTPOS=56003720;//kernel.MapEditor:3720
            _this.mx=- 40;
            //$LASTPOS=56003729;//kernel.MapEditor:3729
            _this.my=- 40;
            //$LASTPOS=56003738;//kernel.MapEditor:3738
            _this.chipX=- 40;
            //$LASTPOS=56003750;//kernel.MapEditor:3750
            _this.chipY=- 40;
            //$LASTPOS=56003762;//kernel.MapEditor:3762
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=56003791;//kernel.MapEditor:3791
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=56003822;//kernel.MapEditor:3822
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=56003847;//kernel.MapEditor:3847
            _this.initialWidth=Tonyu.globals.$map.chipWidth;
            //$LASTPOS=56003877;//kernel.MapEditor:3877
            _this.initialHeight=Tonyu.globals.$map.chipHeight;
            //$LASTPOS=56003909;//kernel.MapEditor:3909
            _this.layers=["base","on","all"];
            //$LASTPOS=56003938;//kernel.MapEditor:3938
            _this.lc=0;
            //$LASTPOS=56003945;//kernel.MapEditor:3945
            _this.selectedLayer=_this.layers[_this.lc];
            //$LASTPOS=56003972;//kernel.MapEditor:3972
            _this.fiber$drawPanel(_thread);
            __pc=20;return;
          case 20:
            
            //$LASTPOS=56003986;//kernel.MapEditor:3986
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=21;return;
          case 21:
            
            //$LASTPOS=56004007;//kernel.MapEditor:4007
          case 22:
            //$LASTPOS=56004025;//kernel.MapEditor:4025
            _this.p=_this.mapp;
            //$LASTPOS=56004038;//kernel.MapEditor:4038
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) { __pc=24    ; break; }
            //$LASTPOS=56004157;//kernel.MapEditor:4157
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=56004191;//kernel.MapEditor:4191
            _this.mode="erase";
            //$LASTPOS=56004246;//kernel.MapEditor:4246
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=23;return;
          case 23:
            
          case 24    :
            
            //$LASTPOS=56004276;//kernel.MapEditor:4276
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=26    ; break; }
            //$LASTPOS=56004395;//kernel.MapEditor:4395
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=56004429;//kernel.MapEditor:4429
            _this.mode="set";
            //$LASTPOS=56004450;//kernel.MapEditor:4450
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=25;return;
          case 25:
            
          case 26    :
            
            //$LASTPOS=56004480;//kernel.MapEditor:4480
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=29    ; break; }
            //$LASTPOS=56004601;//kernel.MapEditor:4601
            _this.lc++;
            //$LASTPOS=56004616;//kernel.MapEditor:4616
            _this.selectedLayer=_this.layers[_this.lc%3];
            //$LASTPOS=56004653;//kernel.MapEditor:4653
            _this.fiber$drawPanel(_thread);
            __pc=27;return;
          case 27:
            
            //$LASTPOS=56004707;//kernel.MapEditor:4707
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=28;return;
          case 28:
            
          case 29    :
            
            //$LASTPOS=56004830;//kernel.MapEditor:4830
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=31    ; break; }
            //$LASTPOS=56004951;//kernel.MapEditor:4951
            if (_this.mode!="get") {
              //$LASTPOS=56004981;//kernel.MapEditor:4981
              _this.prevMode=_this.mode;
              //$LASTPOS=56005009;//kernel.MapEditor:5009
              Tonyu.globals.$mp.scrollTo(- 40,- 40);
              //$LASTPOS=56005045;//kernel.MapEditor:5045
              _this.mode="get";
              //$LASTPOS=56005070;//kernel.MapEditor:5070
              _this.chipX=- 40;
              //$LASTPOS=56005094;//kernel.MapEditor:5094
              _this.chipY=- 40;
              
            } else {
              //$LASTPOS=56005134;//kernel.MapEditor:5134
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=56005172;//kernel.MapEditor:5172
              _this.mode=_this.prevMode;
              
            }
            //$LASTPOS=56005239;//kernel.MapEditor:5239
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=30;return;
          case 30:
            
          case 31    :
            
            //$LASTPOS=56005269;//kernel.MapEditor:5269
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) { __pc=38    ; break; }
            //$LASTPOS=56005405;//kernel.MapEditor:5405
            if (!(_this.loadedFile)) { __pc=33    ; break; }
            //$LASTPOS=56005434;//kernel.MapEditor:5434
            _this.fiber$prompt(_thread, "input json file(*.json)", _this.loadedFile);
            __pc=32;return;
          case 32:
            _this.saveFileName=_thread.retVal;
            
            __pc=35    ;break;
          case 33    :
            //$LASTPOS=56005522;//kernel.MapEditor:5522
            _this.fiber$prompt(_thread, "input json file(*.json)", "map.json");
            __pc=34;return;
          case 34:
            _this.saveFileName=_thread.retVal;
            
          case 35    :
            
            //$LASTPOS=56005616;//kernel.MapEditor:5616
            if (!(_this.saveFileName)) { __pc=37    ; break; }
            //$LASTPOS=56005647;//kernel.MapEditor:5647
            _this.fiber$save(_thread, _this.saveFileName);
            __pc=36;return;
          case 36:
            
          case 37    :
            
          case 38    :
            
            //$LASTPOS=56005947;//kernel.MapEditor:5947
            if (!(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) { __pc=40    ; break; }
            //$LASTPOS=56006068;//kernel.MapEditor:6068
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=56006102;//kernel.MapEditor:6102
            _this.mode="copy";
            //$LASTPOS=56006156;//kernel.MapEditor:6156
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=39;return;
          case 39:
            
          case 40    :
            
            //$LASTPOS=56006186;//kernel.MapEditor:6186
            if (_this.mode!="get") {
              //$LASTPOS=56006212;//kernel.MapEditor:6212
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=56006318;//kernel.MapEditor:6318
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=56006336;//kernel.MapEditor:6336
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=56006467;//kernel.MapEditor:6467
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=56006485;//kernel.MapEditor:6485
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=56006598;//kernel.MapEditor:6598
                _this.my=_this.my-8;
              }
              //$LASTPOS=56006616;//kernel.MapEditor:6616
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=56006751;//kernel.MapEditor:6751
                _this.my=_this.my+8;
              }
              //$LASTPOS=56006769;//kernel.MapEditor:6769
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=56006812;//kernel.MapEditor:6812
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=56006918;//kernel.MapEditor:6918
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=56006942;//kernel.MapEditor:6942
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=56007073;//kernel.MapEditor:7073
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=56007097;//kernel.MapEditor:7097
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=56007210;//kernel.MapEditor:7210
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=56007234;//kernel.MapEditor:7234
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=56007369;//kernel.MapEditor:7369
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=56007393;//kernel.MapEditor:7393
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=56007462;//kernel.MapEditor:7462
            if (_this.getkey("i")==1) {
              //$LASTPOS=56007491;//kernel.MapEditor:7491
              if (Tonyu.globals.$map.chipWidth<_this.initialWidth) {
                //$LASTPOS=56007523;//kernel.MapEditor:7523
                Tonyu.globals.$map.chipWidth+=4;
              }
              //$LASTPOS=56007551;//kernel.MapEditor:7551
              if (Tonyu.globals.$map.chipHeight<_this.initialHeight) {
                //$LASTPOS=56007585;//kernel.MapEditor:7585
                Tonyu.globals.$map.chipHeight+=4;
              }
              //$LASTPOS=56007614;//kernel.MapEditor:7614
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=56007641;//kernel.MapEditor:7641
              _this.panel.die();
              //$LASTPOS=56007663;//kernel.MapEditor:7663
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=56007763;//kernel.MapEditor:7763
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=56007798;//kernel.MapEditor:7798
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=56007834;//kernel.MapEditor:7834
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=56007871;//kernel.MapEditor:7871
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=56007929;//kernel.MapEditor:7929
            if (_this.getkey("o")==1) {
              //$LASTPOS=56007958;//kernel.MapEditor:7958
              if (Tonyu.globals.$map.chipWidth>4) {
                //$LASTPOS=56007979;//kernel.MapEditor:7979
                Tonyu.globals.$map.chipWidth-=4;
              }
              //$LASTPOS=56008007;//kernel.MapEditor:8007
              if (Tonyu.globals.$map.chipHeight>4) {
                //$LASTPOS=56008029;//kernel.MapEditor:8029
                Tonyu.globals.$map.chipHeight-=4;
              }
              //$LASTPOS=56008058;//kernel.MapEditor:8058
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=56008085;//kernel.MapEditor:8085
              _this.panel.die();
              //$LASTPOS=56008107;//kernel.MapEditor:8107
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=56008207;//kernel.MapEditor:8207
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=56008242;//kernel.MapEditor:8242
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=56008278;//kernel.MapEditor:8278
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=56008315;//kernel.MapEditor:8315
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=56008399;//kernel.MapEditor:8399
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=56008430;//kernel.MapEditor:8430
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=56008462;//kernel.MapEditor:8462
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=41    ; break; }
            {
              //$LASTPOS=56008515;//kernel.MapEditor:8515
              if (_this.selectedLayer=="base") {
                //$LASTPOS=56008555;//kernel.MapEditor:8555
                _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=56008611;//kernel.MapEditor:8611
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                //$LASTPOS=56008664;//kernel.MapEditor:8664
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
                
              } else {
                //$LASTPOS=56008722;//kernel.MapEditor:8722
                if (_this.selectedLayer=="on") {
                  //$LASTPOS=56008760;//kernel.MapEditor:8760
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                  
                } else {
                  //$LASTPOS=56008831;//kernel.MapEditor:8831
                  Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                  //$LASTPOS=56008884;//kernel.MapEditor:8884
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.maponp);
                  
                }
              }
              //$LASTPOS=56008948;//kernel.MapEditor:8948
              _this.modified=true;
            }
            __pc=53    ;break;
          case 41    :
            //$LASTPOS=56008974;//kernel.MapEditor:8974
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=42    ; break; }
            {
              //$LASTPOS=56009029;//kernel.MapEditor:9029
              if (_this.selectedLayer=="base") {
                //$LASTPOS=56009069;//kernel.MapEditor:9069
                _this.tmpon=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=56009125;//kernel.MapEditor:9125
                Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                //$LASTPOS=56009176;//kernel.MapEditor:9176
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.tmpon);
                
              } else {
                //$LASTPOS=56009234;//kernel.MapEditor:9234
                if (_this.selectedLayer=="on") {
                  //$LASTPOS=56009272;//kernel.MapEditor:9272
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  
                } else {
                  //$LASTPOS=56009341;//kernel.MapEditor:9341
                  Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  //$LASTPOS=56009392;//kernel.MapEditor:9392
                  Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
                  
                }
              }
              //$LASTPOS=56009452;//kernel.MapEditor:9452
              _this.modified=true;
            }
            __pc=52    ;break;
          case 42    :
            //$LASTPOS=56009478;//kernel.MapEditor:9478
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=45    ; break; }
            //$LASTPOS=56009531;//kernel.MapEditor:9531
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=56009611;//kernel.MapEditor:9611
            _this.mode="set";
            //$LASTPOS=56009632;//kernel.MapEditor:9632
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=56009698;//kernel.MapEditor:9698
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=43;return;
          case 43:
            
            //$LASTPOS=56009725;//kernel.MapEditor:9725
            _this.fiber$updateEx(_thread, 10);
            __pc=44;return;
          case 44:
            
            __pc=51    ;break;
          case 45    :
            //$LASTPOS=56009750;//kernel.MapEditor:9750
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=46    ; break; }
            {
              //$LASTPOS=56009805;//kernel.MapEditor:9805
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=56009856;//kernel.MapEditor:9856
              _this.modified=true;
            }
            __pc=50    ;break;
          case 46    :
            //$LASTPOS=56009882;//kernel.MapEditor:9882
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=49    ; break; }
            //$LASTPOS=56009936;//kernel.MapEditor:9936
            if (_this.selectedLayer=="base") {
              //$LASTPOS=56009976;//kernel.MapEditor:9976
              _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
              //$LASTPOS=56010029;//kernel.MapEditor:10029
              _this.maponp=- 1;
              
            } else {
              //$LASTPOS=56010055;//kernel.MapEditor:10055
              if (_this.selectedLayer=="on") {
                //$LASTPOS=56010093;//kernel.MapEditor:10093
                _this.mapp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                
              } else {
                //$LASTPOS=56010164;//kernel.MapEditor:10164
                _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=56010217;//kernel.MapEditor:10217
                _this.maponp=Tonyu.globals.$map.getOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                
              }
            }
            //$LASTPOS=56010334;//kernel.MapEditor:10334
            _this.mode="set";
            //$LASTPOS=56010387;//kernel.MapEditor:10387
            _this.fiber$drawLetter(_thread, _this.mode);
            __pc=47;return;
          case 47:
            
            //$LASTPOS=56010414;//kernel.MapEditor:10414
            _this.fiber$updateEx(_thread, 10);
            __pc=48;return;
          case 48:
            
          case 49    :
            
          case 50    :
            
          case 51    :
            
          case 52    :
            
          case 53    :
            
            //$LASTPOS=56010440;//kernel.MapEditor:10440
            _this.fiber$update(_thread);
            __pc=54;return;
          case 54:
            
            __pc=22;break;
          case 55    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getCurFileName :function _trc_MapEditor_getCurFileName() {
      "use strict";
      var _this=this;
      
      return _this.saveFileName||_this.loadedFile;
    },
    fiber$getCurFileName :function _trc_MapEditor_f_getCurFileName(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.saveFileName||_this.loadedFile;return;
      
      
      _thread.retVal=_this;return;
    },
    st :function _trc_MapEditor_st(e) {
      "use strict";
      var _this=this;
      var curFileName;
      var r;
      
      //$LASTPOS=56000337;//kernel.MapEditor:337
      curFileName = _this.getCurFileName()||"map.json";
      
      //$LASTPOS=56000388;//kernel.MapEditor:388
      r = _this.confirm("Save "+curFileName+"?");
      
      //$LASTPOS=56000433;//kernel.MapEditor:433
      if (r) {
        //$LASTPOS=56000451;//kernel.MapEditor:451
        _this.save(curFileName);
        //$LASTPOS=56000479;//kernel.MapEditor:479
        _this.update();
        //$LASTPOS=56000498;//kernel.MapEditor:498
        e.die();
        
      } else {
        //$LASTPOS=56000530;//kernel.MapEditor:530
        r=_this.confirm("Discard changes?");
        //$LASTPOS=56000570;//kernel.MapEditor:570
        if (r) {
          //$LASTPOS=56000592;//kernel.MapEditor:592
          _this.update();
          //$LASTPOS=56000615;//kernel.MapEditor:615
          e.die();
          
        }
        
      }
    },
    fiber$st :function _trc_MapEditor_f_st(_thread,e) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var curFileName;
      var r;
      
      //$LASTPOS=56000337;//kernel.MapEditor:337
      curFileName = _this.getCurFileName()||"map.json";
      
      
      _thread.enter(function _trc_MapEditor_ent_st(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=56000388;//kernel.MapEditor:388
            _this.fiber$confirm(_thread, "Save "+curFileName+"?");
            __pc=1;return;
          case 1:
            r=_thread.retVal;
            
            //$LASTPOS=56000433;//kernel.MapEditor:433
            if (!(r)) { __pc=4     ; break; }
            //$LASTPOS=56000451;//kernel.MapEditor:451
            _this.fiber$save(_thread, curFileName);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=56000479;//kernel.MapEditor:479
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=56000498;//kernel.MapEditor:498
            e.die();
            __pc=8     ;break;
          case 4     :
            //$LASTPOS=56000530;//kernel.MapEditor:530
            _this.fiber$confirm(_thread, "Discard changes?");
            __pc=5;return;
          case 5:
            r=_thread.retVal;
            
            //$LASTPOS=56000570;//kernel.MapEditor:570
            if (!(r)) { __pc=7     ; break; }
            //$LASTPOS=56000592;//kernel.MapEditor:592
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=56000615;//kernel.MapEditor:615
            e.die();
          case 7     :
            
          case 8     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    save :function _trc_MapEditor_save(fileName) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=56010477;//kernel.MapEditor:10477
      _this.saveDataFile=_this.file("../maps/").rel(fileName);
      //$LASTPOS=56010527;//kernel.MapEditor:10527
      _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
      //$LASTPOS=56010601;//kernel.MapEditor:10601
      _this.saveDataFile.obj(_this.data);
      //$LASTPOS=56010630;//kernel.MapEditor:10630
      _this.modified=false;
      //$LASTPOS=56010651;//kernel.MapEditor:10651
      _this.print(fileName+" Saved");
    },
    fiber$save :function _trc_MapEditor_f_save(_thread,fileName) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=56010477;//kernel.MapEditor:10477
      _this.saveDataFile=_this.file("../maps/").rel(fileName);
      //$LASTPOS=56010527;//kernel.MapEditor:10527
      _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
      //$LASTPOS=56010601;//kernel.MapEditor:10601
      _this.saveDataFile.obj(_this.data);
      //$LASTPOS=56010630;//kernel.MapEditor:10630
      _this.modified=false;
      //$LASTPOS=56010651;//kernel.MapEditor:10651
      _this.print(fileName+" Saved");
      
      _thread.retVal=_this;return;
    },
    inRect :function _trc_MapEditor_inRect() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$mouseX>40&&Tonyu.globals.$mouseX<Tonyu.globals.$screenWidth-40&&Tonyu.globals.$mouseY>40&&Tonyu.globals.$mouseY<Tonyu.globals.$screenHeight-200;
    },
    fiber$inRect :function _trc_MapEditor_f_inRect(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$mouseX>40&&Tonyu.globals.$mouseX<Tonyu.globals.$screenWidth-40&&Tonyu.globals.$mouseY>40&&Tonyu.globals.$mouseY<Tonyu.globals.$screenHeight-200;return;
      
      
      _thread.retVal=_this;return;
    },
    drawPanel :function _trc_MapEditor_drawPanel() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=56010838;//kernel.MapEditor:10838
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=56010872;//kernel.MapEditor:10872
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=56010895;//kernel.MapEditor:10895
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=56010938;//kernel.MapEditor:10938
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=56010986;//kernel.MapEditor:10986
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=56011048;//kernel.MapEditor:11048
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=56011107;//kernel.MapEditor:11107
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=56011130;//kernel.MapEditor:11130
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=56011184;//kernel.MapEditor:11184
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=56011234;//kernel.MapEditor:11234
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=56011286;//kernel.MapEditor:11286
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=56011338;//kernel.MapEditor:11338
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=56011390;//kernel.MapEditor:11390
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=56011439;//kernel.MapEditor:11439
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=56011490;//kernel.MapEditor:11490
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=56011525;//kernel.MapEditor:11525
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=56011576;//kernel.MapEditor:11576
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=56011628;//kernel.MapEditor:11628
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=56011680;//kernel.MapEditor:11680
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=56011732;//kernel.MapEditor:11732
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=56011782;//kernel.MapEditor:11782
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=56011833;//kernel.MapEditor:11833
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=56011879;//kernel.MapEditor:11879
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=56011936;//kernel.MapEditor:11936
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=56012000;//kernel.MapEditor:12000
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=56012075;//kernel.MapEditor:12075
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=56012180;//kernel.MapEditor:12180
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=56012257;//kernel.MapEditor:12257
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=56012342;//kernel.MapEditor:12342
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=56012419;//kernel.MapEditor:12419
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=56012495;//kernel.MapEditor:12495
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=56012573;//kernel.MapEditor:12573
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditor_f_drawPanel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=56010838;//kernel.MapEditor:10838
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=56010872;//kernel.MapEditor:10872
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=56010895;//kernel.MapEditor:10895
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=56010938;//kernel.MapEditor:10938
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=56010986;//kernel.MapEditor:10986
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=56011048;//kernel.MapEditor:11048
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=56011107;//kernel.MapEditor:11107
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=56011130;//kernel.MapEditor:11130
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=56011184;//kernel.MapEditor:11184
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=56011234;//kernel.MapEditor:11234
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=56011286;//kernel.MapEditor:11286
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=56011338;//kernel.MapEditor:11338
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=56011390;//kernel.MapEditor:11390
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=56011439;//kernel.MapEditor:11439
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=56011490;//kernel.MapEditor:11490
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=56011525;//kernel.MapEditor:11525
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=56011576;//kernel.MapEditor:11576
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=56011628;//kernel.MapEditor:11628
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=56011680;//kernel.MapEditor:11680
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=56011732;//kernel.MapEditor:11732
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=56011782;//kernel.MapEditor:11782
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=56011833;//kernel.MapEditor:11833
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=56011879;//kernel.MapEditor:11879
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=56011936;//kernel.MapEditor:11936
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=56012000;//kernel.MapEditor:12000
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=56012075;//kernel.MapEditor:12075
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=56012180;//kernel.MapEditor:12180
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=56012257;//kernel.MapEditor:12257
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=56012342;//kernel.MapEditor:12342
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=56012419;//kernel.MapEditor:12419
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=56012495;//kernel.MapEditor:12495
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=56012573;//kernel.MapEditor:12573
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      
      _thread.retVal=_this;return;
    },
    drawLetter :function _trc_MapEditor_drawLetter(mode) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=56012681;//kernel.MapEditor:12681
      if (mode=="set") {
        //$LASTPOS=56012697;//kernel.MapEditor:12697
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=56012735;//kernel.MapEditor:12735
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=56012770;//kernel.MapEditor:12770
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=56012847;//kernel.MapEditor:12847
      if (mode=="get") {
        //$LASTPOS=56012863;//kernel.MapEditor:12863
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=56012901;//kernel.MapEditor:12901
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=56012936;//kernel.MapEditor:12936
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=56013013;//kernel.MapEditor:13013
      if (mode=="erase") {
        //$LASTPOS=56013031;//kernel.MapEditor:13031
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=56013069;//kernel.MapEditor:13069
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=56013104;//kernel.MapEditor:13104
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=56013182;//kernel.MapEditor:13182
      if (mode=="copy") {
        //$LASTPOS=56013199;//kernel.MapEditor:13199
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=56013237;//kernel.MapEditor:13237
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=56013272;//kernel.MapEditor:13272
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=56013349;//kernel.MapEditor:13349
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=56013384;//kernel.MapEditor:13384
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=56013469;//kernel.MapEditor:13469
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
    },
    fiber$drawLetter :function _trc_MapEditor_f_drawLetter(_thread,mode) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=56012681;//kernel.MapEditor:12681
      if (mode=="set") {
        //$LASTPOS=56012697;//kernel.MapEditor:12697
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=56012735;//kernel.MapEditor:12735
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=56012770;//kernel.MapEditor:12770
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=56012847;//kernel.MapEditor:12847
      if (mode=="get") {
        //$LASTPOS=56012863;//kernel.MapEditor:12863
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=56012901;//kernel.MapEditor:12901
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=56012936;//kernel.MapEditor:12936
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=56013013;//kernel.MapEditor:13013
      if (mode=="erase") {
        //$LASTPOS=56013031;//kernel.MapEditor:13031
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=56013069;//kernel.MapEditor:13069
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=56013104;//kernel.MapEditor:13104
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=56013182;//kernel.MapEditor:13182
      if (mode=="copy") {
        //$LASTPOS=56013199;//kernel.MapEditor:13199
        Tonyu.globals.$panel.setFillStyle("red");
      } else {
        //$LASTPOS=56013237;//kernel.MapEditor:13237
        Tonyu.globals.$panel.setFillStyle("black");
      }
      //$LASTPOS=56013272;//kernel.MapEditor:13272
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=56013349;//kernel.MapEditor:13349
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=56013384;//kernel.MapEditor:13384
      Tonyu.globals.$panel.fillText(_this.selectedLayer,Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=56013469;//kernel.MapEditor:13469
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getCurFileName":{"nowait":false},"st":{"nowait":false},"save":{"nowait":false},"inRect":{"nowait":false},"drawPanel":{"nowait":false},"drawLetter":{"nowait":false}},"fields":{"loadMode":{},"fileExist":{},"modified":{},"fileList":{},"fileName":{},"mapDataFile":{},"baseData":{},"loadedFile":{},"mapData":{},"mapOnData":{},"chipWidth":{},"chipHeight":{},"row":{},"col":{},"panel":{},"mIW":{},"mIH":{},"mCW":{},"mCH":{},"counter":{},"i":{},"j":{},"mode":{},"prevMode":{},"mapp":{},"maponp":{},"mx":{},"my":{},"chipX":{},"chipY":{},"initialWidth":{},"initialHeight":{},"layers":{},"lc":{},"selectedLayer":{},"saveFileName":{},"tmpon":{},"saveDataFile":{},"data":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.MapEditorOLD',
  shortName: 'MapEditorOLD',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MapEditorOLD_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=57000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      //$LASTPOS=57000079;//kernel.MapEditorOLD:79
      while (true) {
        //$LASTPOS=57000097;//kernel.MapEditorOLD:97
        if (_this.getkey("y")>0) {
          //$LASTPOS=57000125;//kernel.MapEditorOLD:125
          _this.loadMode=true;
          break;
          
          
        }
        //$LASTPOS=57000168;//kernel.MapEditorOLD:168
        if (_this.getkey("n")>0) {
          //$LASTPOS=57000196;//kernel.MapEditorOLD:196
          _this.loadMode=false;
          break;
          
          
        }
        //$LASTPOS=57000240;//kernel.MapEditorOLD:240
        _this.update();
        
      }
      //$LASTPOS=57000254;//kernel.MapEditorOLD:254
      if (_this.loadMode) {
        //$LASTPOS=57000273;//kernel.MapEditorOLD:273
        _this.fileName=prompt("Input json file (*.json)","map.json");
        //$LASTPOS=57000334;//kernel.MapEditorOLD:334
        if (_this.fileName) {
          //$LASTPOS=57000357;//kernel.MapEditorOLD:357
          _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
          
        }
        //$LASTPOS=57000413;//kernel.MapEditorOLD:413
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=57000445;//kernel.MapEditorOLD:445
          _this.baseData=_this.mapDataFile.obj();
          
        } else {
          //$LASTPOS=57000494;//kernel.MapEditorOLD:494
          _this.mapDataFile=_this.file(_this.fileName);
          //$LASTPOS=57000531;//kernel.MapEditorOLD:531
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=57000567;//kernel.MapEditorOLD:567
            _this.baseData=_this.mapDataFile.obj();
            
          }
          
        }
        //$LASTPOS=57000618;//kernel.MapEditorOLD:618
        if (_this.baseData==undefined) {
          //$LASTPOS=57000652;//kernel.MapEditorOLD:652
          _this.print("Load failed");
          //$LASTPOS=57000683;//kernel.MapEditorOLD:683
          _this.loadMode=false;
          
        } else {
          //$LASTPOS=57000710;//kernel.MapEditorOLD:710
          if (_this.baseData[0]&&_this.baseData[1]) {
            //$LASTPOS=57000751;//kernel.MapEditorOLD:751
            _this.mapData=_this.baseData[0];
            //$LASTPOS=57000781;//kernel.MapEditorOLD:781
            _this.mapOnData=_this.baseData[1];
            
          }
        }
        
      }
      //$LASTPOS=57000815;//kernel.MapEditorOLD:815
      _this.update();
      //$LASTPOS=57001093;//kernel.MapEditorOLD:1093
      if (! _this.loadMode) {
        //$LASTPOS=57001113;//kernel.MapEditorOLD:1113
        _this.row=prompt("input row");
        //$LASTPOS=57001143;//kernel.MapEditorOLD:1143
        _this.update();
        //$LASTPOS=57001158;//kernel.MapEditorOLD:1158
        _this.col=prompt("input col");
        //$LASTPOS=57001188;//kernel.MapEditorOLD:1188
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
        //$LASTPOS=57001238;//kernel.MapEditorOLD:1238
        _this.panel.x=_this.panel.width/2+10;
        //$LASTPOS=57001269;//kernel.MapEditorOLD:1269
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=57001298;//kernel.MapEditorOLD:1298
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=57001331;//kernel.MapEditorOLD:1331
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=57001382;//kernel.MapEditorOLD:1382
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
        
      } else {
        //$LASTPOS=57001445;//kernel.MapEditorOLD:1445
        if (! _this.mapOnData) {
          //$LASTPOS=57001470;//kernel.MapEditorOLD:1470
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
          
        } else {
          //$LASTPOS=57001582;//kernel.MapEditorOLD:1582
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
          
        }
        //$LASTPOS=57001695;//kernel.MapEditorOLD:1695
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
        //$LASTPOS=57001766;//kernel.MapEditorOLD:1766
        _this.panel.x=_this.panel.width/2;
        //$LASTPOS=57001794;//kernel.MapEditorOLD:1794
        _this.panel.y=_this.panel.height/2;
        //$LASTPOS=57001823;//kernel.MapEditorOLD:1823
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=57001856;//kernel.MapEditorOLD:1856
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=57001906;//kernel.MapEditorOLD:1906
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
      //$LASTPOS=57001961;//kernel.MapEditorOLD:1961
      _this.counter=0;
      //$LASTPOS=57001973;//kernel.MapEditorOLD:1973
      //$LASTPOS=57001977;//kernel.MapEditorOLD:1977
      _this.i = 0;
      for (; _this.i<16 ; _this.i++) {
        {
          //$LASTPOS=57002001;//kernel.MapEditorOLD:2001
          //$LASTPOS=57002005;//kernel.MapEditorOLD:2005
          _this.j = 0;
          for (; _this.j<8 ; _this.j++) {
            {
              //$LASTPOS=57002032;//kernel.MapEditorOLD:2032
              Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=57002076;//kernel.MapEditorOLD:2076
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=57002098;//kernel.MapEditorOLD:2098
      _this.mode="get";
      //$LASTPOS=57002111;//kernel.MapEditorOLD:2111
      _this.prevMode="set";
      //$LASTPOS=57002128;//kernel.MapEditorOLD:2128
      _this.mapp=0;
      //$LASTPOS=57002137;//kernel.MapEditorOLD:2137
      _this.mx=0;
      //$LASTPOS=57002144;//kernel.MapEditorOLD:2144
      _this.my=0;
      //$LASTPOS=57002151;//kernel.MapEditorOLD:2151
      _this.chipX=0;
      //$LASTPOS=57002161;//kernel.MapEditorOLD:2161
      _this.chipY=0;
      //$LASTPOS=57002171;//kernel.MapEditorOLD:2171
      _this.x=Tonyu.globals.$screenWidth-16;
      //$LASTPOS=57002191;//kernel.MapEditorOLD:2191
      _this.y=Tonyu.globals.$screenHeight-16;
      //$LASTPOS=57002212;//kernel.MapEditorOLD:2212
      while (true) {
        //$LASTPOS=57002230;//kernel.MapEditorOLD:2230
        _this.p=_this.mapp;
        //$LASTPOS=57002243;//kernel.MapEditorOLD:2243
        if (_this.getkey("e")==1) {
          //$LASTPOS=57002272;//kernel.MapEditorOLD:2272
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=57002306;//kernel.MapEditorOLD:2306
          _this.mode="erase";
          //$LASTPOS=57002329;//kernel.MapEditorOLD:2329
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=57002362;//kernel.MapEditorOLD:2362
        if (_this.getkey("s")==1) {
          //$LASTPOS=57002391;//kernel.MapEditorOLD:2391
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=57002425;//kernel.MapEditorOLD:2425
          if (_this.mode=="set") {
            //$LASTPOS=57002455;//kernel.MapEditorOLD:2455
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=57002498;//kernel.MapEditorOLD:2498
            _this.mode="set";
            
          }
          //$LASTPOS=57002530;//kernel.MapEditorOLD:2530
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=57002563;//kernel.MapEditorOLD:2563
        if (_this.getkey("o")==1) {
          //$LASTPOS=57002592;//kernel.MapEditorOLD:2592
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=57002626;//kernel.MapEditorOLD:2626
          _this.mode="setOn";
          
        }
        //$LASTPOS=57002652;//kernel.MapEditorOLD:2652
        if (_this.getkey("g")==1) {
          //$LASTPOS=57002681;//kernel.MapEditorOLD:2681
          if (_this.mode!="get") {
            //$LASTPOS=57002711;//kernel.MapEditorOLD:2711
            _this.prevMode=_this.mode;
            //$LASTPOS=57002739;//kernel.MapEditorOLD:2739
            Tonyu.globals.$mp.scrollTo(0,0);
            //$LASTPOS=57002771;//kernel.MapEditorOLD:2771
            _this.mode="get";
            //$LASTPOS=57002796;//kernel.MapEditorOLD:2796
            _this.chipX=0;
            //$LASTPOS=57002818;//kernel.MapEditorOLD:2818
            _this.chipY=0;
            
          } else {
            //$LASTPOS=57002856;//kernel.MapEditorOLD:2856
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=57002894;//kernel.MapEditorOLD:2894
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=57002929;//kernel.MapEditorOLD:2929
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=57002962;//kernel.MapEditorOLD:2962
        if (_this.getkey("p")==1) {
          //$LASTPOS=57003006;//kernel.MapEditorOLD:3006
          _this.saveFileName=prompt("input json file(*.json)","map.json");
          //$LASTPOS=57003495;//kernel.MapEditorOLD:3495
          _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
          //$LASTPOS=57003553;//kernel.MapEditorOLD:3553
          _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
          //$LASTPOS=57003668;//kernel.MapEditorOLD:3668
          _this.saveDataFile.obj(_this.data);
          //$LASTPOS=57003701;//kernel.MapEditorOLD:3701
          _this.print(_this.saveFileName+" Saved");
          
        }
        //$LASTPOS=57003793;//kernel.MapEditorOLD:3793
        if (_this.getkey("c")==1) {
          //$LASTPOS=57003822;//kernel.MapEditorOLD:3822
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=57003856;//kernel.MapEditorOLD:3856
          _this.mode="spuit";
          //$LASTPOS=57003879;//kernel.MapEditorOLD:3879
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=57003912;//kernel.MapEditorOLD:3912
        if (_this.mode!="get") {
          //$LASTPOS=57003938;//kernel.MapEditorOLD:3938
          if (_this.getkey("left")>0) {
            //$LASTPOS=57003959;//kernel.MapEditorOLD:3959
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=57003977;//kernel.MapEditorOLD:3977
          if (_this.getkey("right")>0) {
            //$LASTPOS=57003999;//kernel.MapEditorOLD:3999
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=57004017;//kernel.MapEditorOLD:4017
          if (_this.getkey("up")>0) {
            //$LASTPOS=57004036;//kernel.MapEditorOLD:4036
            _this.my=_this.my+8;
          }
          //$LASTPOS=57004054;//kernel.MapEditorOLD:4054
          if (_this.getkey("down")>0) {
            //$LASTPOS=57004075;//kernel.MapEditorOLD:4075
            _this.my=_this.my-8;
          }
          //$LASTPOS=57004093;//kernel.MapEditorOLD:4093
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=57004136;//kernel.MapEditorOLD:4136
          if (_this.getkey("left")>0) {
            //$LASTPOS=57004157;//kernel.MapEditorOLD:4157
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=57004181;//kernel.MapEditorOLD:4181
          if (_this.getkey("right")>0) {
            //$LASTPOS=57004203;//kernel.MapEditorOLD:4203
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=57004227;//kernel.MapEditorOLD:4227
          if (_this.getkey("up")>0) {
            //$LASTPOS=57004246;//kernel.MapEditorOLD:4246
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=57004270;//kernel.MapEditorOLD:4270
          if (_this.getkey("down")>0) {
            //$LASTPOS=57004291;//kernel.MapEditorOLD:4291
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=57004315;//kernel.MapEditorOLD:4315
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=57004354;//kernel.MapEditorOLD:4354
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=57004385;//kernel.MapEditorOLD:4385
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=57004417;//kernel.MapEditorOLD:4417
        if (_this.mode=="set"&&_this.getkey(1)>0) {
          //$LASTPOS=57004458;//kernel.MapEditorOLD:4458
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=57004507;//kernel.MapEditorOLD:4507
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=57004558;//kernel.MapEditorOLD:4558
          if (_this.mode=="erase"&&_this.getkey(1)>0) {
            //$LASTPOS=57004601;//kernel.MapEditorOLD:4601
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=57004650;//kernel.MapEditorOLD:4650
            if (_this.mode=="get"&&_this.getkey(1)>0) {
              //$LASTPOS=57004691;//kernel.MapEditorOLD:4691
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=57004745;//kernel.MapEditorOLD:4745
              _this.mode=_this.prevMode;
              //$LASTPOS=57004769;//kernel.MapEditorOLD:4769
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=57004803;//kernel.MapEditorOLD:4803
              _this.print(_this.mode+" mode");
              //$LASTPOS=57004833;//kernel.MapEditorOLD:4833
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=57004858;//kernel.MapEditorOLD:4858
              if (_this.mode=="setOn"&&_this.getkey(1)>0) {
                //$LASTPOS=57004901;//kernel.MapEditorOLD:4901
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=57004954;//kernel.MapEditorOLD:4954
                if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                  //$LASTPOS=57004997;//kernel.MapEditorOLD:4997
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=57005046;//kernel.MapEditorOLD:5046
                  _this.mode="set";
                  //$LASTPOS=57005067;//kernel.MapEditorOLD:5067
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=57005097;//kernel.MapEditorOLD:5097
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=57005123;//kernel.MapEditorOLD:5123
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditorOLD_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57000032;//kernel.MapEditorOLD:32
      _this.loadMode=false;
      //$LASTPOS=57000049;//kernel.MapEditorOLD:49
      _this.print("Load Data?: Y or N");
      
      _thread.enter(function _trc_MapEditorOLD_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57000079;//kernel.MapEditorOLD:79
          case 1:
            //$LASTPOS=57000097;//kernel.MapEditorOLD:97
            if (!(_this.getkey("y")>0)) { __pc=2     ; break; }
            //$LASTPOS=57000125;//kernel.MapEditorOLD:125
            _this.loadMode=true;
            __pc=5     ; break;
            
          case 2     :
            
            //$LASTPOS=57000168;//kernel.MapEditorOLD:168
            if (!(_this.getkey("n")>0)) { __pc=3     ; break; }
            //$LASTPOS=57000196;//kernel.MapEditorOLD:196
            _this.loadMode=false;
            __pc=5     ; break;
            
          case 3     :
            
            //$LASTPOS=57000240;//kernel.MapEditorOLD:240
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5     :
            
            //$LASTPOS=57000254;//kernel.MapEditorOLD:254
            if (!(_this.loadMode)) { __pc=9     ; break; }
            //$LASTPOS=57000273;//kernel.MapEditorOLD:273
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=57000334;//kernel.MapEditorOLD:334
            if (_this.fileName) {
              //$LASTPOS=57000357;//kernel.MapEditorOLD:357
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=57000413;//kernel.MapEditorOLD:413
            if (!(_this.mapDataFile.obj())) { __pc=6     ; break; }
            {
              //$LASTPOS=57000445;//kernel.MapEditorOLD:445
              _this.baseData=_this.mapDataFile.obj();
            }
            __pc=8     ;break;
          case 6     :
            //$LASTPOS=57000494;//kernel.MapEditorOLD:494
            _this.fiber$file(_thread, _this.fileName);
            __pc=7;return;
          case 7:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=57000531;//kernel.MapEditorOLD:531
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=57000567;//kernel.MapEditorOLD:567
              _this.baseData=_this.mapDataFile.obj();
              
            }
          case 8     :
            
            //$LASTPOS=57000618;//kernel.MapEditorOLD:618
            if (_this.baseData==undefined) {
              //$LASTPOS=57000652;//kernel.MapEditorOLD:652
              _this.print("Load failed");
              //$LASTPOS=57000683;//kernel.MapEditorOLD:683
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=57000710;//kernel.MapEditorOLD:710
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=57000751;//kernel.MapEditorOLD:751
                _this.mapData=_this.baseData[0];
                //$LASTPOS=57000781;//kernel.MapEditorOLD:781
                _this.mapOnData=_this.baseData[1];
                
              }
            }
          case 9     :
            
            //$LASTPOS=57000815;//kernel.MapEditorOLD:815
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            //$LASTPOS=57001093;//kernel.MapEditorOLD:1093
            if (!(! _this.loadMode)) { __pc=12    ; break; }
            //$LASTPOS=57001113;//kernel.MapEditorOLD:1113
            _this.row=prompt("input row");
            //$LASTPOS=57001143;//kernel.MapEditorOLD:1143
            _this.fiber$update(_thread);
            __pc=11;return;
          case 11:
            
            //$LASTPOS=57001158;//kernel.MapEditorOLD:1158
            _this.col=prompt("input col");
            //$LASTPOS=57001188;//kernel.MapEditorOLD:1188
            _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
            //$LASTPOS=57001238;//kernel.MapEditorOLD:1238
            _this.panel.x=_this.panel.width/2+10;
            //$LASTPOS=57001269;//kernel.MapEditorOLD:1269
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=57001298;//kernel.MapEditorOLD:1298
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=57001331;//kernel.MapEditorOLD:1331
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            //$LASTPOS=57001382;//kernel.MapEditorOLD:1382
            Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
            __pc=13    ;break;
          case 12    :
            {
              //$LASTPOS=57001445;//kernel.MapEditorOLD:1445
              if (! _this.mapOnData) {
                //$LASTPOS=57001470;//kernel.MapEditorOLD:1470
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
                
              } else {
                //$LASTPOS=57001582;//kernel.MapEditorOLD:1582
                Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
                
              }
              //$LASTPOS=57001695;//kernel.MapEditorOLD:1695
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
              //$LASTPOS=57001766;//kernel.MapEditorOLD:1766
              _this.panel.x=_this.panel.width/2;
              //$LASTPOS=57001794;//kernel.MapEditorOLD:1794
              _this.panel.y=_this.panel.height/2;
              //$LASTPOS=57001823;//kernel.MapEditorOLD:1823
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=57001856;//kernel.MapEditorOLD:1856
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
            }
          case 13    :
            
            //$LASTPOS=57001906;//kernel.MapEditorOLD:1906
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
            //$LASTPOS=57001961;//kernel.MapEditorOLD:1961
            _this.counter=0;
            //$LASTPOS=57001973;//kernel.MapEditorOLD:1973
            //$LASTPOS=57001977;//kernel.MapEditorOLD:1977
            _this.i = 0;
            for (; _this.i<16 ; _this.i++) {
              {
                //$LASTPOS=57002001;//kernel.MapEditorOLD:2001
                //$LASTPOS=57002005;//kernel.MapEditorOLD:2005
                _this.j = 0;
                for (; _this.j<8 ; _this.j++) {
                  {
                    //$LASTPOS=57002032;//kernel.MapEditorOLD:2032
                    Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=57002076;//kernel.MapEditorOLD:2076
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=57002098;//kernel.MapEditorOLD:2098
            _this.mode="get";
            //$LASTPOS=57002111;//kernel.MapEditorOLD:2111
            _this.prevMode="set";
            //$LASTPOS=57002128;//kernel.MapEditorOLD:2128
            _this.mapp=0;
            //$LASTPOS=57002137;//kernel.MapEditorOLD:2137
            _this.mx=0;
            //$LASTPOS=57002144;//kernel.MapEditorOLD:2144
            _this.my=0;
            //$LASTPOS=57002151;//kernel.MapEditorOLD:2151
            _this.chipX=0;
            //$LASTPOS=57002161;//kernel.MapEditorOLD:2161
            _this.chipY=0;
            //$LASTPOS=57002171;//kernel.MapEditorOLD:2171
            _this.x=Tonyu.globals.$screenWidth-16;
            //$LASTPOS=57002191;//kernel.MapEditorOLD:2191
            _this.y=Tonyu.globals.$screenHeight-16;
            //$LASTPOS=57002212;//kernel.MapEditorOLD:2212
          case 14:
            //$LASTPOS=57002230;//kernel.MapEditorOLD:2230
            _this.p=_this.mapp;
            //$LASTPOS=57002243;//kernel.MapEditorOLD:2243
            if (_this.getkey("e")==1) {
              //$LASTPOS=57002272;//kernel.MapEditorOLD:2272
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=57002306;//kernel.MapEditorOLD:2306
              _this.mode="erase";
              //$LASTPOS=57002329;//kernel.MapEditorOLD:2329
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=57002362;//kernel.MapEditorOLD:2362
            if (_this.getkey("s")==1) {
              //$LASTPOS=57002391;//kernel.MapEditorOLD:2391
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=57002425;//kernel.MapEditorOLD:2425
              if (_this.mode=="set") {
                //$LASTPOS=57002455;//kernel.MapEditorOLD:2455
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=57002498;//kernel.MapEditorOLD:2498
                _this.mode="set";
                
              }
              //$LASTPOS=57002530;//kernel.MapEditorOLD:2530
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=57002563;//kernel.MapEditorOLD:2563
            if (_this.getkey("o")==1) {
              //$LASTPOS=57002592;//kernel.MapEditorOLD:2592
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=57002626;//kernel.MapEditorOLD:2626
              _this.mode="setOn";
              
            }
            //$LASTPOS=57002652;//kernel.MapEditorOLD:2652
            if (_this.getkey("g")==1) {
              //$LASTPOS=57002681;//kernel.MapEditorOLD:2681
              if (_this.mode!="get") {
                //$LASTPOS=57002711;//kernel.MapEditorOLD:2711
                _this.prevMode=_this.mode;
                //$LASTPOS=57002739;//kernel.MapEditorOLD:2739
                Tonyu.globals.$mp.scrollTo(0,0);
                //$LASTPOS=57002771;//kernel.MapEditorOLD:2771
                _this.mode="get";
                //$LASTPOS=57002796;//kernel.MapEditorOLD:2796
                _this.chipX=0;
                //$LASTPOS=57002818;//kernel.MapEditorOLD:2818
                _this.chipY=0;
                
              } else {
                //$LASTPOS=57002856;//kernel.MapEditorOLD:2856
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=57002894;//kernel.MapEditorOLD:2894
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=57002929;//kernel.MapEditorOLD:2929
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=57002962;//kernel.MapEditorOLD:2962
            if (_this.getkey("p")==1) {
              //$LASTPOS=57003006;//kernel.MapEditorOLD:3006
              _this.saveFileName=prompt("input json file(*.json)","map.json");
              //$LASTPOS=57003495;//kernel.MapEditorOLD:3495
              _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
              //$LASTPOS=57003553;//kernel.MapEditorOLD:3553
              _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
              //$LASTPOS=57003668;//kernel.MapEditorOLD:3668
              _this.saveDataFile.obj(_this.data);
              //$LASTPOS=57003701;//kernel.MapEditorOLD:3701
              _this.print(_this.saveFileName+" Saved");
              
            }
            //$LASTPOS=57003793;//kernel.MapEditorOLD:3793
            if (_this.getkey("c")==1) {
              //$LASTPOS=57003822;//kernel.MapEditorOLD:3822
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=57003856;//kernel.MapEditorOLD:3856
              _this.mode="spuit";
              //$LASTPOS=57003879;//kernel.MapEditorOLD:3879
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=57003912;//kernel.MapEditorOLD:3912
            if (_this.mode!="get") {
              //$LASTPOS=57003938;//kernel.MapEditorOLD:3938
              if (_this.getkey("left")>0) {
                //$LASTPOS=57003959;//kernel.MapEditorOLD:3959
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=57003977;//kernel.MapEditorOLD:3977
              if (_this.getkey("right")>0) {
                //$LASTPOS=57003999;//kernel.MapEditorOLD:3999
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=57004017;//kernel.MapEditorOLD:4017
              if (_this.getkey("up")>0) {
                //$LASTPOS=57004036;//kernel.MapEditorOLD:4036
                _this.my=_this.my+8;
              }
              //$LASTPOS=57004054;//kernel.MapEditorOLD:4054
              if (_this.getkey("down")>0) {
                //$LASTPOS=57004075;//kernel.MapEditorOLD:4075
                _this.my=_this.my-8;
              }
              //$LASTPOS=57004093;//kernel.MapEditorOLD:4093
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=57004136;//kernel.MapEditorOLD:4136
              if (_this.getkey("left")>0) {
                //$LASTPOS=57004157;//kernel.MapEditorOLD:4157
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=57004181;//kernel.MapEditorOLD:4181
              if (_this.getkey("right")>0) {
                //$LASTPOS=57004203;//kernel.MapEditorOLD:4203
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=57004227;//kernel.MapEditorOLD:4227
              if (_this.getkey("up")>0) {
                //$LASTPOS=57004246;//kernel.MapEditorOLD:4246
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=57004270;//kernel.MapEditorOLD:4270
              if (_this.getkey("down")>0) {
                //$LASTPOS=57004291;//kernel.MapEditorOLD:4291
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=57004315;//kernel.MapEditorOLD:4315
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=57004354;//kernel.MapEditorOLD:4354
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=57004385;//kernel.MapEditorOLD:4385
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=57004417;//kernel.MapEditorOLD:4417
            if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15    ; break; }
            {
              //$LASTPOS=57004458;//kernel.MapEditorOLD:4458
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=57004507;//kernel.MapEditorOLD:4507
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25    ;break;
          case 15    :
            //$LASTPOS=57004558;//kernel.MapEditorOLD:4558
            if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16    ; break; }
            {
              //$LASTPOS=57004601;//kernel.MapEditorOLD:4601
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24    ;break;
          case 16    :
            //$LASTPOS=57004650;//kernel.MapEditorOLD:4650
            if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18    ; break; }
            //$LASTPOS=57004691;//kernel.MapEditorOLD:4691
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=57004745;//kernel.MapEditorOLD:4745
            _this.mode=_this.prevMode;
            //$LASTPOS=57004769;//kernel.MapEditorOLD:4769
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=57004803;//kernel.MapEditorOLD:4803
            _this.print(_this.mode+" mode");
            //$LASTPOS=57004833;//kernel.MapEditorOLD:4833
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23    ;break;
          case 18    :
            //$LASTPOS=57004858;//kernel.MapEditorOLD:4858
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19    ; break; }
            {
              //$LASTPOS=57004901;//kernel.MapEditorOLD:4901
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22    ;break;
          case 19    :
            //$LASTPOS=57004954;//kernel.MapEditorOLD:4954
            if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21    ; break; }
            //$LASTPOS=57004997;//kernel.MapEditorOLD:4997
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=57005046;//kernel.MapEditorOLD:5046
            _this.mode="set";
            //$LASTPOS=57005067;//kernel.MapEditorOLD:5067
            _this.print(_this.mode+" mode");
            //$LASTPOS=57005097;//kernel.MapEditorOLD:5097
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21    :
            
          case 22    :
            
          case 23    :
            
          case 24    :
            
          case 25    :
            
            //$LASTPOS=57005123;//kernel.MapEditorOLD:5123
            _this.fiber$update(_thread);
            __pc=26;return;
          case 26:
            
            __pc=14;break;
          case 27    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"loadMode":{},"fileName":{},"mapDataFile":{},"baseData":{},"mapData":{},"mapOnData":{},"row":{},"col":{},"panel":{},"counter":{},"i":{},"j":{},"mode":{},"prevMode":{},"mapp":{},"mx":{},"my":{},"chipX":{},"chipY":{},"saveFileName":{},"saveDataFile":{},"data":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.MapEditorOLD2',
  shortName: 'MapEditorOLD2',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MapEditorOLD2_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=58000032;//kernel.MapEditorOLD2:32
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=58000058;//kernel.MapEditorOLD2:58
      _this.loadMode=false;
      //$LASTPOS=58000075;//kernel.MapEditorOLD2:75
      _this.fileExist=false;
      //$LASTPOS=58000093;//kernel.MapEditorOLD2:93
      _this.print("map file(s)");
      //$LASTPOS=58000116;//kernel.MapEditorOLD2:116
      _this.fileList=_this.file("../maps/");
      //$LASTPOS=58000144;//kernel.MapEditorOLD2:144
      if (_this.fileList.exists()) {
        //$LASTPOS=58000168;//kernel.MapEditorOLD2:168
        _this.fileList.recursive((function a(f) {
          
          //$LASTPOS=58000207;//kernel.MapEditorOLD2:207
          f=f+"";
          //$LASTPOS=58000220;//kernel.MapEditorOLD2:220
          _this.fNames=f.split("/");
          //$LASTPOS=58000246;//kernel.MapEditorOLD2:246
          _this.print(_this.fNames[_this.fNames.length-1]);
          //$LASTPOS=58000283;//kernel.MapEditorOLD2:283
          _this.fileExist=true;
        }));
        
      }
      //$LASTPOS=58000308;//kernel.MapEditorOLD2:308
      if (_this.fileExist) {
        //$LASTPOS=58000328;//kernel.MapEditorOLD2:328
        _this.print("Load Data?: Y or N");
        //$LASTPOS=58000362;//kernel.MapEditorOLD2:362
        while (true) {
          //$LASTPOS=58000384;//kernel.MapEditorOLD2:384
          if (_this.getkey("y")>0) {
            //$LASTPOS=58000416;//kernel.MapEditorOLD2:416
            _this.loadMode=true;
            break;
            
            
          }
          //$LASTPOS=58000471;//kernel.MapEditorOLD2:471
          if (_this.getkey("n")>0) {
            //$LASTPOS=58000503;//kernel.MapEditorOLD2:503
            _this.loadMode=false;
            break;
            
            
          }
          //$LASTPOS=58000559;//kernel.MapEditorOLD2:559
          _this.update();
          
        }
        //$LASTPOS=58000581;//kernel.MapEditorOLD2:581
        if (_this.loadMode) {
          //$LASTPOS=58000604;//kernel.MapEditorOLD2:604
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=58000669;//kernel.MapEditorOLD2:669
          if (_this.fileName) {
            //$LASTPOS=58000696;//kernel.MapEditorOLD2:696
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=58000760;//kernel.MapEditorOLD2:760
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=58000796;//kernel.MapEditorOLD2:796
            _this.baseData=_this.mapDataFile.obj();
            //$LASTPOS=58000837;//kernel.MapEditorOLD2:837
            _this.loadedFile=_this.fileName;
            
          } else {
            //$LASTPOS=58000887;//kernel.MapEditorOLD2:887
            _this.mapDataFile=_this.file(_this.fileName);
            //$LASTPOS=58000928;//kernel.MapEditorOLD2:928
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=58000968;//kernel.MapEditorOLD2:968
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=58001013;//kernel.MapEditorOLD2:1013
              _this.loadedFile=_this.fileName;
              
            }
            
          }
          //$LASTPOS=58001069;//kernel.MapEditorOLD2:1069
          if (_this.baseData==undefined) {
            //$LASTPOS=58001107;//kernel.MapEditorOLD2:1107
            _this.print("Load failed");
            //$LASTPOS=58001142;//kernel.MapEditorOLD2:1142
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=58001173;//kernel.MapEditorOLD2:1173
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=58001218;//kernel.MapEditorOLD2:1218
              _this.mapData=_this.baseData[0];
              //$LASTPOS=58001252;//kernel.MapEditorOLD2:1252
              _this.mapOnData=_this.baseData[1];
              //$LASTPOS=58001288;//kernel.MapEditorOLD2:1288
              if (_this.baseData.length>2) {
                //$LASTPOS=58001328;//kernel.MapEditorOLD2:1328
                _this.chipWidth=_this.baseData[_this.baseData.length-2];
                //$LASTPOS=58001384;//kernel.MapEditorOLD2:1384
                _this.chipHeight=_this.baseData[_this.baseData.length-1];
                
              }
              
            }
          }
          
        }
        
      }
      //$LASTPOS=58001461;//kernel.MapEditorOLD2:1461
      _this.update();
      //$LASTPOS=58001739;//kernel.MapEditorOLD2:1739
      if (! _this.loadMode) {
        //$LASTPOS=58001759;//kernel.MapEditorOLD2:1759
        _this.row=prompt("input row");
        //$LASTPOS=58001789;//kernel.MapEditorOLD2:1789
        _this.col=prompt("input col");
        //$LASTPOS=58001819;//kernel.MapEditorOLD2:1819
        _this.chipWidth=prompt("input chipWidth");
        //$LASTPOS=58001861;//kernel.MapEditorOLD2:1861
        _this.chipHeight=prompt("input chipHeight");
        //$LASTPOS=58001905;//kernel.MapEditorOLD2:1905
        _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
        //$LASTPOS=58001970;//kernel.MapEditorOLD2:1970
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=58002001;//kernel.MapEditorOLD2:2001
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=58002033;//kernel.MapEditorOLD2:2033
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=58002066;//kernel.MapEditorOLD2:2066
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        //$LASTPOS=58002117;//kernel.MapEditorOLD2:2117
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
        
      } else {
        //$LASTPOS=58002428;//kernel.MapEditorOLD2:2428
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
        //$LASTPOS=58002475;//kernel.MapEditorOLD2:2475
        Tonyu.globals.$map.load(_this.fileName);
        //$LASTPOS=58002501;//kernel.MapEditorOLD2:2501
        _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
        //$LASTPOS=58002597;//kernel.MapEditorOLD2:2597
        _this.panel.x=_this.panel.width/2+40;
        //$LASTPOS=58002628;//kernel.MapEditorOLD2:2628
        _this.panel.y=_this.panel.height/2+40;
        //$LASTPOS=58002660;//kernel.MapEditorOLD2:2660
        _this.panel.setFillStyle("cyan");
        //$LASTPOS=58002693;//kernel.MapEditorOLD2:2693
        _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
        
      }
      //$LASTPOS=58002743;//kernel.MapEditorOLD2:2743
      _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
      //$LASTPOS=58002799;//kernel.MapEditorOLD2:2799
      _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
      //$LASTPOS=58002856;//kernel.MapEditorOLD2:2856
      _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
      //$LASTPOS=58002908;//kernel.MapEditorOLD2:2908
      _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
      //$LASTPOS=58002961;//kernel.MapEditorOLD2:2961
      Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
      //$LASTPOS=58003043;//kernel.MapEditorOLD2:3043
      _this.counter=0;
      //$LASTPOS=58003055;//kernel.MapEditorOLD2:3055
      //$LASTPOS=58003059;//kernel.MapEditorOLD2:3059
      _this.i = 0;
      for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
        {
          //$LASTPOS=58003088;//kernel.MapEditorOLD2:3088
          //$LASTPOS=58003092;//kernel.MapEditorOLD2:3092
          _this.j = 0;
          for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
            {
              //$LASTPOS=58003125;//kernel.MapEditorOLD2:3125
              Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
              //$LASTPOS=58003169;//kernel.MapEditorOLD2:3169
              _this.counter++;
            }
          }
        }
      }
      //$LASTPOS=58003191;//kernel.MapEditorOLD2:3191
      _this.drawPanel();
      //$LASTPOS=58003205;//kernel.MapEditorOLD2:3205
      _this.mode="get";
      //$LASTPOS=58003218;//kernel.MapEditorOLD2:3218
      _this.prevMode="set";
      //$LASTPOS=58003235;//kernel.MapEditorOLD2:3235
      _this.mapp=0;
      //$LASTPOS=58003244;//kernel.MapEditorOLD2:3244
      _this.mx=- 40;
      //$LASTPOS=58003253;//kernel.MapEditorOLD2:3253
      _this.my=- 40;
      //$LASTPOS=58003262;//kernel.MapEditorOLD2:3262
      _this.chipX=- 40;
      //$LASTPOS=58003274;//kernel.MapEditorOLD2:3274
      _this.chipY=- 40;
      //$LASTPOS=58003286;//kernel.MapEditorOLD2:3286
      _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
      //$LASTPOS=58003315;//kernel.MapEditorOLD2:3315
      _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
      //$LASTPOS=58003346;//kernel.MapEditorOLD2:3346
      Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
      //$LASTPOS=58003369;//kernel.MapEditorOLD2:3369
      while (true) {
        //$LASTPOS=58003387;//kernel.MapEditorOLD2:3387
        _this.p=_this.mapp;
        //$LASTPOS=58003400;//kernel.MapEditorOLD2:3400
        if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=58003539;//kernel.MapEditorOLD2:3539
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=58003573;//kernel.MapEditorOLD2:3573
          _this.mode="erase";
          //$LASTPOS=58003596;//kernel.MapEditorOLD2:3596
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=58003629;//kernel.MapEditorOLD2:3629
        if (_this.getkey("s")==1) {
          //$LASTPOS=58003658;//kernel.MapEditorOLD2:3658
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=58003692;//kernel.MapEditorOLD2:3692
          if (_this.mode=="set") {
            //$LASTPOS=58003722;//kernel.MapEditorOLD2:3722
            _this.mode="setOn";
            
          } else {
            //$LASTPOS=58003765;//kernel.MapEditorOLD2:3765
            _this.mode="set";
            
          }
          //$LASTPOS=58003797;//kernel.MapEditorOLD2:3797
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=58003830;//kernel.MapEditorOLD2:3830
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=58003949;//kernel.MapEditorOLD2:3949
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=58003983;//kernel.MapEditorOLD2:3983
          _this.mode="set";
          //$LASTPOS=58004004;//kernel.MapEditorOLD2:4004
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=58004037;//kernel.MapEditorOLD2:4037
        if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
          //$LASTPOS=58004158;//kernel.MapEditorOLD2:4158
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=58004192;//kernel.MapEditorOLD2:4192
          _this.mode="setOn";
          //$LASTPOS=58004215;//kernel.MapEditorOLD2:4215
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=58004341;//kernel.MapEditorOLD2:4341
        if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=58004482;//kernel.MapEditorOLD2:4482
          if (_this.mode!="get") {
            //$LASTPOS=58004512;//kernel.MapEditorOLD2:4512
            _this.prevMode=_this.mode;
            //$LASTPOS=58004540;//kernel.MapEditorOLD2:4540
            Tonyu.globals.$mp.scrollTo(- 40,- 40);
            //$LASTPOS=58004576;//kernel.MapEditorOLD2:4576
            _this.mode="get";
            //$LASTPOS=58004601;//kernel.MapEditorOLD2:4601
            _this.chipX=- 40;
            //$LASTPOS=58004625;//kernel.MapEditorOLD2:4625
            _this.chipY=- 40;
            
          } else {
            //$LASTPOS=58004665;//kernel.MapEditorOLD2:4665
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=58004703;//kernel.MapEditorOLD2:4703
            _this.mode=_this.prevMode;
            
          }
          //$LASTPOS=58004738;//kernel.MapEditorOLD2:4738
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=58004771;//kernel.MapEditorOLD2:4771
        if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
          //$LASTPOS=58004927;//kernel.MapEditorOLD2:4927
          if (_this.loadedFile) {
            //$LASTPOS=58004956;//kernel.MapEditorOLD2:4956
            _this.saveFileName=prompt("input json file(*.json)",_this.loadedFile);
            
          } else {
            //$LASTPOS=58005044;//kernel.MapEditorOLD2:5044
            _this.saveFileName=prompt("input json file(*.json)","map.json");
            
          }
          //$LASTPOS=58005544;//kernel.MapEditorOLD2:5544
          if (_this.saveFileName) {
            //$LASTPOS=58005575;//kernel.MapEditorOLD2:5575
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=58005637;//kernel.MapEditorOLD2:5637
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
            //$LASTPOS=58005799;//kernel.MapEditorOLD2:5799
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=58005836;//kernel.MapEditorOLD2:5836
            _this.print(_this.saveFileName+" Saved");
            
          }
          
        }
        //$LASTPOS=58005943;//kernel.MapEditorOLD2:5943
        if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
          //$LASTPOS=58006084;//kernel.MapEditorOLD2:6084
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=58006118;//kernel.MapEditorOLD2:6118
          _this.mode="copy";
          //$LASTPOS=58006140;//kernel.MapEditorOLD2:6140
          _this.print(_this.mode+" mode");
          
        }
        //$LASTPOS=58006173;//kernel.MapEditorOLD2:6173
        if (_this.mode!="get") {
          //$LASTPOS=58006199;//kernel.MapEditorOLD2:6199
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=58006305;//kernel.MapEditorOLD2:6305
            _this.mx=_this.mx+8;
          }
          //$LASTPOS=58006323;//kernel.MapEditorOLD2:6323
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=58006454;//kernel.MapEditorOLD2:6454
            _this.mx=_this.mx-8;
          }
          //$LASTPOS=58006472;//kernel.MapEditorOLD2:6472
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=58006585;//kernel.MapEditorOLD2:6585
            _this.my=_this.my+8;
          }
          //$LASTPOS=58006603;//kernel.MapEditorOLD2:6603
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=58006738;//kernel.MapEditorOLD2:6738
            _this.my=_this.my-8;
          }
          //$LASTPOS=58006756;//kernel.MapEditorOLD2:6756
          Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
          
        } else {
          //$LASTPOS=58006799;//kernel.MapEditorOLD2:6799
          if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=58006905;//kernel.MapEditorOLD2:6905
            _this.chipX=_this.chipX+8;
          }
          //$LASTPOS=58006929;//kernel.MapEditorOLD2:6929
          if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
            //$LASTPOS=58007060;//kernel.MapEditorOLD2:7060
            _this.chipX=_this.chipX-8;
          }
          //$LASTPOS=58007084;//kernel.MapEditorOLD2:7084
          if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
            //$LASTPOS=58007197;//kernel.MapEditorOLD2:7197
            _this.chipY=_this.chipY+8;
          }
          //$LASTPOS=58007221;//kernel.MapEditorOLD2:7221
          if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
            //$LASTPOS=58007356;//kernel.MapEditorOLD2:7356
            _this.chipY=_this.chipY-8;
          }
          //$LASTPOS=58007380;//kernel.MapEditorOLD2:7380
          Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
          
        }
        //$LASTPOS=58007453;//kernel.MapEditorOLD2:7453
        if (_this.getkey("i")==1) {
          //$LASTPOS=58007482;//kernel.MapEditorOLD2:7482
          Tonyu.globals.$map.chipWidth+=4;
          //$LASTPOS=58007510;//kernel.MapEditorOLD2:7510
          Tonyu.globals.$map.chipHeight+=4;
          //$LASTPOS=58007539;//kernel.MapEditorOLD2:7539
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=58007566;//kernel.MapEditorOLD2:7566
          _this.panel.die();
          //$LASTPOS=58007588;//kernel.MapEditorOLD2:7588
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=58007688;//kernel.MapEditorOLD2:7688
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=58007723;//kernel.MapEditorOLD2:7723
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=58007759;//kernel.MapEditorOLD2:7759
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=58007796;//kernel.MapEditorOLD2:7796
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=58007854;//kernel.MapEditorOLD2:7854
        if (_this.getkey("o")==1) {
          //$LASTPOS=58007883;//kernel.MapEditorOLD2:7883
          Tonyu.globals.$map.chipWidth-=4;
          //$LASTPOS=58007911;//kernel.MapEditorOLD2:7911
          Tonyu.globals.$map.chipHeight-=4;
          //$LASTPOS=58007940;//kernel.MapEditorOLD2:7940
          Tonyu.globals.$map.redrawMap();
          //$LASTPOS=58007967;//kernel.MapEditorOLD2:7967
          _this.panel.die();
          //$LASTPOS=58007989;//kernel.MapEditorOLD2:7989
          _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
          //$LASTPOS=58008089;//kernel.MapEditorOLD2:8089
          _this.panel.x=_this.panel.width/2+40;
          //$LASTPOS=58008124;//kernel.MapEditorOLD2:8124
          _this.panel.y=_this.panel.height/2+40;
          //$LASTPOS=58008160;//kernel.MapEditorOLD2:8160
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=58008197;//kernel.MapEditorOLD2:8197
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          
        }
        //$LASTPOS=58008289;//kernel.MapEditorOLD2:8289
        _this.panel.x=_this.panel.width/2-_this.mx;
        //$LASTPOS=58008320;//kernel.MapEditorOLD2:8320
        _this.panel.y=_this.panel.height/2-_this.my;
        //$LASTPOS=58008352;//kernel.MapEditorOLD2:8352
        if (_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect()) {
          //$LASTPOS=58008405;//kernel.MapEditorOLD2:8405
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          //$LASTPOS=58008454;//kernel.MapEditorOLD2:8454
          Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=58008505;//kernel.MapEditorOLD2:8505
          if (_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect()) {
            //$LASTPOS=58008560;//kernel.MapEditorOLD2:8560
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            
          } else {
            //$LASTPOS=58008609;//kernel.MapEditorOLD2:8609
            if (_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect()) {
              //$LASTPOS=58008662;//kernel.MapEditorOLD2:8662
              _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
              //$LASTPOS=58008716;//kernel.MapEditorOLD2:8716
              _this.mode=_this.prevMode;
              //$LASTPOS=58008740;//kernel.MapEditorOLD2:8740
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=58008774;//kernel.MapEditorOLD2:8774
              _this.print(_this.mode+" mode");
              //$LASTPOS=58008804;//kernel.MapEditorOLD2:8804
              _this.updateEx(10);
              
            } else {
              //$LASTPOS=58008829;//kernel.MapEditorOLD2:8829
              if (_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect()) {
                //$LASTPOS=58008884;//kernel.MapEditorOLD2:8884
                Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
                
              } else {
                //$LASTPOS=58008937;//kernel.MapEditorOLD2:8937
                if (_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect()) {
                  //$LASTPOS=58008991;//kernel.MapEditorOLD2:8991
                  _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                  //$LASTPOS=58009040;//kernel.MapEditorOLD2:9040
                  _this.mode="set";
                  //$LASTPOS=58009061;//kernel.MapEditorOLD2:9061
                  _this.print(_this.mode+" mode");
                  //$LASTPOS=58009091;//kernel.MapEditorOLD2:9091
                  _this.updateEx(10);
                  
                }
              }
            }
          }
        }
        //$LASTPOS=58009117;//kernel.MapEditorOLD2:9117
        _this.update();
        
      }
    },
    fiber$main :function _trc_MapEditorOLD2_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=58000032;//kernel.MapEditorOLD2:32
      Tonyu.globals.$Screen.resize(480,640);
      //$LASTPOS=58000058;//kernel.MapEditorOLD2:58
      _this.loadMode=false;
      //$LASTPOS=58000075;//kernel.MapEditorOLD2:75
      _this.fileExist=false;
      //$LASTPOS=58000093;//kernel.MapEditorOLD2:93
      _this.print("map file(s)");
      
      _thread.enter(function _trc_MapEditorOLD2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=58000116;//kernel.MapEditorOLD2:116
            _this.fiber$file(_thread, "../maps/");
            __pc=1;return;
          case 1:
            _this.fileList=_thread.retVal;
            
            //$LASTPOS=58000144;//kernel.MapEditorOLD2:144
            if (_this.fileList.exists()) {
              //$LASTPOS=58000168;//kernel.MapEditorOLD2:168
              _this.fileList.recursive((function a(f) {
                
                //$LASTPOS=58000207;//kernel.MapEditorOLD2:207
                f=f+"";
                //$LASTPOS=58000220;//kernel.MapEditorOLD2:220
                _this.fNames=f.split("/");
                //$LASTPOS=58000246;//kernel.MapEditorOLD2:246
                _this.print(_this.fNames[_this.fNames.length-1]);
                //$LASTPOS=58000283;//kernel.MapEditorOLD2:283
                _this.fileExist=true;
              }));
              
            }
            //$LASTPOS=58000308;//kernel.MapEditorOLD2:308
            if (!(_this.fileExist)) { __pc=11    ; break; }
            //$LASTPOS=58000328;//kernel.MapEditorOLD2:328
            _this.print("Load Data?: Y or N");
            //$LASTPOS=58000362;//kernel.MapEditorOLD2:362
          case 2:
            //$LASTPOS=58000384;//kernel.MapEditorOLD2:384
            if (!(_this.getkey("y")>0)) { __pc=3     ; break; }
            //$LASTPOS=58000416;//kernel.MapEditorOLD2:416
            _this.loadMode=true;
            __pc=6     ; break;
            
          case 3     :
            
            //$LASTPOS=58000471;//kernel.MapEditorOLD2:471
            if (!(_this.getkey("n")>0)) { __pc=4     ; break; }
            //$LASTPOS=58000503;//kernel.MapEditorOLD2:503
            _this.loadMode=false;
            __pc=6     ; break;
            
          case 4     :
            
            //$LASTPOS=58000559;//kernel.MapEditorOLD2:559
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6     :
            
            //$LASTPOS=58000581;//kernel.MapEditorOLD2:581
            if (!(_this.loadMode)) { __pc=10    ; break; }
            //$LASTPOS=58000604;//kernel.MapEditorOLD2:604
            _this.fileName=prompt("Input json file (*.json)","map.json");
            //$LASTPOS=58000669;//kernel.MapEditorOLD2:669
            if (_this.fileName) {
              //$LASTPOS=58000696;//kernel.MapEditorOLD2:696
              _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
              
            }
            //$LASTPOS=58000760;//kernel.MapEditorOLD2:760
            if (!(_this.mapDataFile.obj())) { __pc=7     ; break; }
            {
              //$LASTPOS=58000796;//kernel.MapEditorOLD2:796
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=58000837;//kernel.MapEditorOLD2:837
              _this.loadedFile=_this.fileName;
            }
            __pc=9     ;break;
          case 7     :
            //$LASTPOS=58000887;//kernel.MapEditorOLD2:887
            _this.fiber$file(_thread, _this.fileName);
            __pc=8;return;
          case 8:
            _this.mapDataFile=_thread.retVal;
            
            //$LASTPOS=58000928;//kernel.MapEditorOLD2:928
            if (_this.mapDataFile.obj()) {
              //$LASTPOS=58000968;//kernel.MapEditorOLD2:968
              _this.baseData=_this.mapDataFile.obj();
              //$LASTPOS=58001013;//kernel.MapEditorOLD2:1013
              _this.loadedFile=_this.fileName;
              
            }
          case 9     :
            
            //$LASTPOS=58001069;//kernel.MapEditorOLD2:1069
            if (_this.baseData==undefined) {
              //$LASTPOS=58001107;//kernel.MapEditorOLD2:1107
              _this.print("Load failed");
              //$LASTPOS=58001142;//kernel.MapEditorOLD2:1142
              _this.loadMode=false;
              
            } else {
              //$LASTPOS=58001173;//kernel.MapEditorOLD2:1173
              if (_this.baseData[0]&&_this.baseData[1]) {
                //$LASTPOS=58001218;//kernel.MapEditorOLD2:1218
                _this.mapData=_this.baseData[0];
                //$LASTPOS=58001252;//kernel.MapEditorOLD2:1252
                _this.mapOnData=_this.baseData[1];
                //$LASTPOS=58001288;//kernel.MapEditorOLD2:1288
                if (_this.baseData.length>2) {
                  //$LASTPOS=58001328;//kernel.MapEditorOLD2:1328
                  _this.chipWidth=_this.baseData[_this.baseData.length-2];
                  //$LASTPOS=58001384;//kernel.MapEditorOLD2:1384
                  _this.chipHeight=_this.baseData[_this.baseData.length-1];
                  
                }
                
              }
            }
          case 10    :
            
          case 11    :
            
            //$LASTPOS=58001461;//kernel.MapEditorOLD2:1461
            _this.fiber$update(_thread);
            __pc=12;return;
          case 12:
            
            //$LASTPOS=58001739;//kernel.MapEditorOLD2:1739
            if (! _this.loadMode) {
              //$LASTPOS=58001759;//kernel.MapEditorOLD2:1759
              _this.row=prompt("input row");
              //$LASTPOS=58001789;//kernel.MapEditorOLD2:1789
              _this.col=prompt("input col");
              //$LASTPOS=58001819;//kernel.MapEditorOLD2:1819
              _this.chipWidth=prompt("input chipWidth");
              //$LASTPOS=58001861;//kernel.MapEditorOLD2:1861
              _this.chipHeight=prompt("input chipHeight");
              //$LASTPOS=58001905;//kernel.MapEditorOLD2:1905
              _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
              //$LASTPOS=58001970;//kernel.MapEditorOLD2:1970
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=58002001;//kernel.MapEditorOLD2:2001
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=58002033;//kernel.MapEditorOLD2:2033
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=58002066;//kernel.MapEditorOLD2:2066
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              //$LASTPOS=58002117;//kernel.MapEditorOLD2:2117
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: _this.chipWidth,chipHeight: _this.chipHeight});
              
            } else {
              //$LASTPOS=58002428;//kernel.MapEditorOLD2:2428
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
              //$LASTPOS=58002475;//kernel.MapEditorOLD2:2475
              Tonyu.globals.$map.load(_this.fileName);
              //$LASTPOS=58002501;//kernel.MapEditorOLD2:2501
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=58002597;//kernel.MapEditorOLD2:2597
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=58002628;//kernel.MapEditorOLD2:2628
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=58002660;//kernel.MapEditorOLD2:2660
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=58002693;//kernel.MapEditorOLD2:2693
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=58002743;//kernel.MapEditorOLD2:2743
            _this.mIW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.width;
            //$LASTPOS=58002799;//kernel.MapEditorOLD2:2799
            _this.mIH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip].image.height;
            //$LASTPOS=58002856;//kernel.MapEditorOLD2:2856
            _this.mCW=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].width;
            //$LASTPOS=58002908;//kernel.MapEditorOLD2:2908
            _this.mCH=Tonyu.globals.$Sprites.getImageList()[Tonyu.globals.$pat_mapchip+0].height;
            //$LASTPOS=58002961;//kernel.MapEditorOLD2:2961
            Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: _this.floor(_this.mIH/_this.mCH),col: _this.floor(_this.mIW/_this.mCW),chipWidth: _this.mCW,chipHeight: _this.mCH});
            //$LASTPOS=58003043;//kernel.MapEditorOLD2:3043
            _this.counter=0;
            //$LASTPOS=58003055;//kernel.MapEditorOLD2:3055
            //$LASTPOS=58003059;//kernel.MapEditorOLD2:3059
            _this.i = 0;
            for (; _this.i<Tonyu.globals.$mp.row ; _this.i++) {
              {
                //$LASTPOS=58003088;//kernel.MapEditorOLD2:3088
                //$LASTPOS=58003092;//kernel.MapEditorOLD2:3092
                _this.j = 0;
                for (; _this.j<Tonyu.globals.$mp.col ; _this.j++) {
                  {
                    //$LASTPOS=58003125;//kernel.MapEditorOLD2:3125
                    Tonyu.globals.$mp.set(_this.j,_this.i,Tonyu.globals.$pat_mapchip+_this.counter);
                    //$LASTPOS=58003169;//kernel.MapEditorOLD2:3169
                    _this.counter++;
                  }
                }
              }
            }
            //$LASTPOS=58003191;//kernel.MapEditorOLD2:3191
            _this.fiber$drawPanel(_thread);
            __pc=13;return;
          case 13:
            
            //$LASTPOS=58003205;//kernel.MapEditorOLD2:3205
            _this.mode="get";
            //$LASTPOS=58003218;//kernel.MapEditorOLD2:3218
            _this.prevMode="set";
            //$LASTPOS=58003235;//kernel.MapEditorOLD2:3235
            _this.mapp=0;
            //$LASTPOS=58003244;//kernel.MapEditorOLD2:3244
            _this.mx=- 40;
            //$LASTPOS=58003253;//kernel.MapEditorOLD2:3253
            _this.my=- 40;
            //$LASTPOS=58003262;//kernel.MapEditorOLD2:3262
            _this.chipX=- 40;
            //$LASTPOS=58003274;//kernel.MapEditorOLD2:3274
            _this.chipY=- 40;
            //$LASTPOS=58003286;//kernel.MapEditorOLD2:3286
            _this.x=Tonyu.globals.$screenWidth-_this.chipWidth/2;
            //$LASTPOS=58003315;//kernel.MapEditorOLD2:3315
            _this.y=Tonyu.globals.$screenHeight-_this.chipHeight/2;
            //$LASTPOS=58003346;//kernel.MapEditorOLD2:3346
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            //$LASTPOS=58003369;//kernel.MapEditorOLD2:3369
          case 14:
            //$LASTPOS=58003387;//kernel.MapEditorOLD2:3387
            _this.p=_this.mapp;
            //$LASTPOS=58003400;//kernel.MapEditorOLD2:3400
            if (_this.getkey("e")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=58003539;//kernel.MapEditorOLD2:3539
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=58003573;//kernel.MapEditorOLD2:3573
              _this.mode="erase";
              //$LASTPOS=58003596;//kernel.MapEditorOLD2:3596
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=58003629;//kernel.MapEditorOLD2:3629
            if (_this.getkey("s")==1) {
              //$LASTPOS=58003658;//kernel.MapEditorOLD2:3658
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=58003692;//kernel.MapEditorOLD2:3692
              if (_this.mode=="set") {
                //$LASTPOS=58003722;//kernel.MapEditorOLD2:3722
                _this.mode="setOn";
                
              } else {
                //$LASTPOS=58003765;//kernel.MapEditorOLD2:3765
                _this.mode="set";
                
              }
              //$LASTPOS=58003797;//kernel.MapEditorOLD2:3797
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=58003830;//kernel.MapEditorOLD2:3830
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<120&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=58003949;//kernel.MapEditorOLD2:3949
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=58003983;//kernel.MapEditorOLD2:3983
              _this.mode="set";
              //$LASTPOS=58004004;//kernel.MapEditorOLD2:4004
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=58004037;//kernel.MapEditorOLD2:4037
            if (Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560) {
              //$LASTPOS=58004158;//kernel.MapEditorOLD2:4158
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=58004192;//kernel.MapEditorOLD2:4192
              _this.mode="setOn";
              //$LASTPOS=58004215;//kernel.MapEditorOLD2:4215
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=58004341;//kernel.MapEditorOLD2:4341
            if (_this.getkey("g")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>240&&Tonyu.globals.$touches[0].x<360&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=58004482;//kernel.MapEditorOLD2:4482
              if (_this.mode!="get") {
                //$LASTPOS=58004512;//kernel.MapEditorOLD2:4512
                _this.prevMode=_this.mode;
                //$LASTPOS=58004540;//kernel.MapEditorOLD2:4540
                Tonyu.globals.$mp.scrollTo(- 40,- 40);
                //$LASTPOS=58004576;//kernel.MapEditorOLD2:4576
                _this.mode="get";
                //$LASTPOS=58004601;//kernel.MapEditorOLD2:4601
                _this.chipX=- 40;
                //$LASTPOS=58004625;//kernel.MapEditorOLD2:4625
                _this.chipY=- 40;
                
              } else {
                //$LASTPOS=58004665;//kernel.MapEditorOLD2:4665
                Tonyu.globals.$mp.scrollTo(1000,1000);
                //$LASTPOS=58004703;//kernel.MapEditorOLD2:4703
                _this.mode=_this.prevMode;
                
              }
              //$LASTPOS=58004738;//kernel.MapEditorOLD2:4738
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=58004771;//kernel.MapEditorOLD2:4771
            if (_this.getkey("p")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>360&&Tonyu.globals.$touches[0].x<480&&Tonyu.globals.$touches[0].y>480&&Tonyu.globals.$touches[0].y<560)) {
              //$LASTPOS=58004927;//kernel.MapEditorOLD2:4927
              if (_this.loadedFile) {
                //$LASTPOS=58004956;//kernel.MapEditorOLD2:4956
                _this.saveFileName=prompt("input json file(*.json)",_this.loadedFile);
                
              } else {
                //$LASTPOS=58005044;//kernel.MapEditorOLD2:5044
                _this.saveFileName=prompt("input json file(*.json)","map.json");
                
              }
              //$LASTPOS=58005544;//kernel.MapEditorOLD2:5544
              if (_this.saveFileName) {
                //$LASTPOS=58005575;//kernel.MapEditorOLD2:5575
                _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
                //$LASTPOS=58005637;//kernel.MapEditorOLD2:5637
                _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable,Tonyu.globals.$map.chipWidth,Tonyu.globals.$map.chipHeight];
                //$LASTPOS=58005799;//kernel.MapEditorOLD2:5799
                _this.saveDataFile.obj(_this.data);
                //$LASTPOS=58005836;//kernel.MapEditorOLD2:5836
                _this.print(_this.saveFileName+" Saved");
                
              }
              
            }
            //$LASTPOS=58005943;//kernel.MapEditorOLD2:5943
            if (_this.getkey("c")==1||(Tonyu.globals.$touches[0].touched==1&&Tonyu.globals.$touches[0].x>120&&Tonyu.globals.$touches[0].x<240&&Tonyu.globals.$touches[0].y>560&&Tonyu.globals.$touches[0].y<640)) {
              //$LASTPOS=58006084;//kernel.MapEditorOLD2:6084
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=58006118;//kernel.MapEditorOLD2:6118
              _this.mode="copy";
              //$LASTPOS=58006140;//kernel.MapEditorOLD2:6140
              _this.print(_this.mode+" mode");
              
            }
            //$LASTPOS=58006173;//kernel.MapEditorOLD2:6173
            if (_this.mode!="get") {
              //$LASTPOS=58006199;//kernel.MapEditorOLD2:6199
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=58006305;//kernel.MapEditorOLD2:6305
                _this.mx=_this.mx+8;
              }
              //$LASTPOS=58006323;//kernel.MapEditorOLD2:6323
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=58006454;//kernel.MapEditorOLD2:6454
                _this.mx=_this.mx-8;
              }
              //$LASTPOS=58006472;//kernel.MapEditorOLD2:6472
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=58006585;//kernel.MapEditorOLD2:6585
                _this.my=_this.my+8;
              }
              //$LASTPOS=58006603;//kernel.MapEditorOLD2:6603
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=58006738;//kernel.MapEditorOLD2:6738
                _this.my=_this.my-8;
              }
              //$LASTPOS=58006756;//kernel.MapEditorOLD2:6756
              Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
              
            } else {
              //$LASTPOS=58006799;//kernel.MapEditorOLD2:6799
              if (_this.getkey("left")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<40&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=58006905;//kernel.MapEditorOLD2:6905
                _this.chipX=_this.chipX+8;
              }
              //$LASTPOS=58006929;//kernel.MapEditorOLD2:6929
              if (_this.getkey("right")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>Tonyu.globals.$screenWidth-40&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480)) {
                //$LASTPOS=58007060;//kernel.MapEditorOLD2:7060
                _this.chipX=_this.chipX-8;
              }
              //$LASTPOS=58007084;//kernel.MapEditorOLD2:7084
              if (_this.getkey("up")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<40)) {
                //$LASTPOS=58007197;//kernel.MapEditorOLD2:7197
                _this.chipY=_this.chipY+8;
              }
              //$LASTPOS=58007221;//kernel.MapEditorOLD2:7221
              if (_this.getkey("down")>0||(Tonyu.globals.$touches[0].touched&&Tonyu.globals.$touches[0].x>0&&Tonyu.globals.$touches[0].x<Tonyu.globals.$screenWidth&&Tonyu.globals.$touches[0].y<480&&Tonyu.globals.$touches[0].y>440)) {
                //$LASTPOS=58007356;//kernel.MapEditorOLD2:7356
                _this.chipY=_this.chipY-8;
              }
              //$LASTPOS=58007380;//kernel.MapEditorOLD2:7380
              Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
              
            }
            //$LASTPOS=58007453;//kernel.MapEditorOLD2:7453
            if (_this.getkey("i")==1) {
              //$LASTPOS=58007482;//kernel.MapEditorOLD2:7482
              Tonyu.globals.$map.chipWidth+=4;
              //$LASTPOS=58007510;//kernel.MapEditorOLD2:7510
              Tonyu.globals.$map.chipHeight+=4;
              //$LASTPOS=58007539;//kernel.MapEditorOLD2:7539
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=58007566;//kernel.MapEditorOLD2:7566
              _this.panel.die();
              //$LASTPOS=58007588;//kernel.MapEditorOLD2:7588
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=58007688;//kernel.MapEditorOLD2:7688
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=58007723;//kernel.MapEditorOLD2:7723
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=58007759;//kernel.MapEditorOLD2:7759
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=58007796;//kernel.MapEditorOLD2:7796
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=58007854;//kernel.MapEditorOLD2:7854
            if (_this.getkey("o")==1) {
              //$LASTPOS=58007883;//kernel.MapEditorOLD2:7883
              Tonyu.globals.$map.chipWidth-=4;
              //$LASTPOS=58007911;//kernel.MapEditorOLD2:7911
              Tonyu.globals.$map.chipHeight-=4;
              //$LASTPOS=58007940;//kernel.MapEditorOLD2:7940
              Tonyu.globals.$map.redrawMap();
              //$LASTPOS=58007967;//kernel.MapEditorOLD2:7967
              _this.panel.die();
              //$LASTPOS=58007989;//kernel.MapEditorOLD2:7989
              _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*Tonyu.globals.$map.chipWidth,height: Tonyu.globals.$map.row*Tonyu.globals.$map.chipHeight,zOrder: 100});
              //$LASTPOS=58008089;//kernel.MapEditorOLD2:8089
              _this.panel.x=_this.panel.width/2+40;
              //$LASTPOS=58008124;//kernel.MapEditorOLD2:8124
              _this.panel.y=_this.panel.height/2+40;
              //$LASTPOS=58008160;//kernel.MapEditorOLD2:8160
              _this.panel.setFillStyle("cyan");
              //$LASTPOS=58008197;//kernel.MapEditorOLD2:8197
              _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
              
            }
            //$LASTPOS=58008289;//kernel.MapEditorOLD2:8289
            _this.panel.x=_this.panel.width/2-_this.mx;
            //$LASTPOS=58008320;//kernel.MapEditorOLD2:8320
            _this.panel.y=_this.panel.height/2-_this.my;
            //$LASTPOS=58008352;//kernel.MapEditorOLD2:8352
            if (!(_this.mode=="set"&&_this.getkey(1)>0&&_this.inRect())) { __pc=15    ; break; }
            {
              //$LASTPOS=58008405;//kernel.MapEditorOLD2:8405
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              //$LASTPOS=58008454;//kernel.MapEditorOLD2:8454
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=25    ;break;
          case 15    :
            //$LASTPOS=58008505;//kernel.MapEditorOLD2:8505
            if (!(_this.mode=="erase"&&_this.getkey(1)>0&&_this.inRect())) { __pc=16    ; break; }
            {
              //$LASTPOS=58008560;//kernel.MapEditorOLD2:8560
              Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
            }
            __pc=24    ;break;
          case 16    :
            //$LASTPOS=58008609;//kernel.MapEditorOLD2:8609
            if (!(_this.mode=="get"&&_this.getkey(1)>0&&_this.inRect())) { __pc=18    ; break; }
            //$LASTPOS=58008662;//kernel.MapEditorOLD2:8662
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=58008716;//kernel.MapEditorOLD2:8716
            _this.mode=_this.prevMode;
            //$LASTPOS=58008740;//kernel.MapEditorOLD2:8740
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=58008774;//kernel.MapEditorOLD2:8774
            _this.print(_this.mode+" mode");
            //$LASTPOS=58008804;//kernel.MapEditorOLD2:8804
            _this.fiber$updateEx(_thread, 10);
            __pc=17;return;
          case 17:
            
            __pc=23    ;break;
          case 18    :
            //$LASTPOS=58008829;//kernel.MapEditorOLD2:8829
            if (!(_this.mode=="setOn"&&_this.getkey(1)>0&&_this.inRect())) { __pc=19    ; break; }
            {
              //$LASTPOS=58008884;//kernel.MapEditorOLD2:8884
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            }
            __pc=22    ;break;
          case 19    :
            //$LASTPOS=58008937;//kernel.MapEditorOLD2:8937
            if (!(_this.mode=="copy"&&_this.getkey(1)>0&&_this.inRect())) { __pc=21    ; break; }
            //$LASTPOS=58008991;//kernel.MapEditorOLD2:8991
            _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
            //$LASTPOS=58009040;//kernel.MapEditorOLD2:9040
            _this.mode="set";
            //$LASTPOS=58009061;//kernel.MapEditorOLD2:9061
            _this.print(_this.mode+" mode");
            //$LASTPOS=58009091;//kernel.MapEditorOLD2:9091
            _this.fiber$updateEx(_thread, 10);
            __pc=20;return;
          case 20:
            
          case 21    :
            
          case 22    :
            
          case 23    :
            
          case 24    :
            
          case 25    :
            
            //$LASTPOS=58009117;//kernel.MapEditorOLD2:9117
            _this.fiber$update(_thread);
            __pc=26;return;
          case 26:
            
            __pc=14;break;
          case 27    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    inRect :function _trc_MapEditorOLD2_inRect() {
      "use strict";
      var _this=this;
      
      return Tonyu.globals.$mouseX>40&&Tonyu.globals.$mouseX<Tonyu.globals.$screenWidth-40&&Tonyu.globals.$mouseY>40&&Tonyu.globals.$mouseY<Tonyu.globals.$screenHeight-200;
    },
    fiber$inRect :function _trc_MapEditorOLD2_f_inRect(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=Tonyu.globals.$mouseX>40&&Tonyu.globals.$mouseX<Tonyu.globals.$screenWidth-40&&Tonyu.globals.$mouseY>40&&Tonyu.globals.$mouseY<Tonyu.globals.$screenHeight-200;return;
      
      
      _thread.retVal=_this;return;
    },
    drawPanel :function _trc_MapEditorOLD2_drawPanel() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=58009289;//kernel.MapEditorOLD2:9289
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=58009323;//kernel.MapEditorOLD2:9323
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=58009346;//kernel.MapEditorOLD2:9346
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=58009389;//kernel.MapEditorOLD2:9389
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=58009437;//kernel.MapEditorOLD2:9437
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=58009499;//kernel.MapEditorOLD2:9499
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=58009558;//kernel.MapEditorOLD2:9558
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=58009581;//kernel.MapEditorOLD2:9581
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=58009635;//kernel.MapEditorOLD2:9635
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=58009685;//kernel.MapEditorOLD2:9685
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=58009737;//kernel.MapEditorOLD2:9737
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=58009789;//kernel.MapEditorOLD2:9789
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=58009841;//kernel.MapEditorOLD2:9841
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=58009890;//kernel.MapEditorOLD2:9890
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=58009941;//kernel.MapEditorOLD2:9941
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=58009976;//kernel.MapEditorOLD2:9976
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=58010027;//kernel.MapEditorOLD2:10027
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=58010079;//kernel.MapEditorOLD2:10079
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=58010131;//kernel.MapEditorOLD2:10131
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=58010183;//kernel.MapEditorOLD2:10183
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=58010233;//kernel.MapEditorOLD2:10233
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=58010284;//kernel.MapEditorOLD2:10284
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=58010330;//kernel.MapEditorOLD2:10330
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=58010387;//kernel.MapEditorOLD2:10387
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=58010451;//kernel.MapEditorOLD2:10451
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=58010526;//kernel.MapEditorOLD2:10526
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=58010631;//kernel.MapEditorOLD2:10631
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=58010708;//kernel.MapEditorOLD2:10708
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=58010787;//kernel.MapEditorOLD2:10787
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=58010864;//kernel.MapEditorOLD2:10864
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=58010940;//kernel.MapEditorOLD2:10940
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=58011018;//kernel.MapEditorOLD2:11018
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
    },
    fiber$drawPanel :function _trc_MapEditorOLD2_f_drawPanel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=58009289;//kernel.MapEditorOLD2:9289
      Tonyu.globals.$panel.setFillStyle("gray");
      //$LASTPOS=58009323;//kernel.MapEditorOLD2:9323
      Tonyu.globals.$panel.alpha=128;
      //$LASTPOS=58009346;//kernel.MapEditorOLD2:9346
      Tonyu.globals.$panel.fillRect(0,0,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=58009389;//kernel.MapEditorOLD2:9389
      Tonyu.globals.$panel.fillRect(0,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=58009437;//kernel.MapEditorOLD2:9437
      Tonyu.globals.$panel.fillRect(Tonyu.globals.$screenWidth-40,0,40,Tonyu.globals.$screenHeight-160);
      //$LASTPOS=58009499;//kernel.MapEditorOLD2:9499
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-200,Tonyu.globals.$screenWidth,40);
      //$LASTPOS=58009558;//kernel.MapEditorOLD2:9558
      Tonyu.globals.$panel.alpha=255;
      //$LASTPOS=58009581;//kernel.MapEditorOLD2:9581
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=58009635;//kernel.MapEditorOLD2:9635
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=58009685;//kernel.MapEditorOLD2:9685
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=58009737;//kernel.MapEditorOLD2:9737
      Tonyu.globals.$panel.fillRect(240,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=58009789;//kernel.MapEditorOLD2:9789
      Tonyu.globals.$panel.fillRect(360,Tonyu.globals.$screenHeight-160,120,80);
      //$LASTPOS=58009841;//kernel.MapEditorOLD2:9841
      Tonyu.globals.$panel.fillRect(0,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=58009890;//kernel.MapEditorOLD2:9890
      Tonyu.globals.$panel.fillRect(120,Tonyu.globals.$screenHeight-80,120,80);
      //$LASTPOS=58009941;//kernel.MapEditorOLD2:9941
      Tonyu.globals.$panel.setFillStyle("white");
      //$LASTPOS=58009976;//kernel.MapEditorOLD2:9976
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=58010027;//kernel.MapEditorOLD2:10027
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=58010079;//kernel.MapEditorOLD2:10079
      Tonyu.globals.$panel.fillRect(250,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=58010131;//kernel.MapEditorOLD2:10131
      Tonyu.globals.$panel.fillRect(370,Tonyu.globals.$screenHeight-150,100,60);
      //$LASTPOS=58010183;//kernel.MapEditorOLD2:10183
      Tonyu.globals.$panel.fillRect(10,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=58010233;//kernel.MapEditorOLD2:10233
      Tonyu.globals.$panel.fillRect(130,Tonyu.globals.$screenHeight-70,100,60);
      //$LASTPOS=58010284;//kernel.MapEditorOLD2:10284
      Tonyu.globals.$panel.setFillStyle("black");
      //$LASTPOS=58010330;//kernel.MapEditorOLD2:10330
      Tonyu.globals.$panel.fillText("↑",Tonyu.globals.$screenWidth/2,30,40,"center");
      //$LASTPOS=58010387;//kernel.MapEditorOLD2:10387
      Tonyu.globals.$panel.fillText("←",20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=58010451;//kernel.MapEditorOLD2:10451
      Tonyu.globals.$panel.fillText("↓",Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-160-10,40,"center");
      //$LASTPOS=58010526;//kernel.MapEditorOLD2:10526
      Tonyu.globals.$panel.fillText("→",Tonyu.globals.$screenWidth-20,(Tonyu.globals.$screenHeight-200)/2,40,"center");
      //$LASTPOS=58010631;//kernel.MapEditorOLD2:10631
      Tonyu.globals.$panel.fillText("set",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=58010708;//kernel.MapEditorOLD2:10708
      Tonyu.globals.$panel.fillText("setOn",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-110,35,"center");
      //$LASTPOS=58010787;//kernel.MapEditorOLD2:10787
      Tonyu.globals.$panel.fillText("get",Tonyu.globals.$screenWidth/2+60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=58010864;//kernel.MapEditorOLD2:10864
      Tonyu.globals.$panel.fillText("save",Tonyu.globals.$screenWidth-60,Tonyu.globals.$screenHeight-110,40,"center");
      //$LASTPOS=58010940;//kernel.MapEditorOLD2:10940
      Tonyu.globals.$panel.fillText("erase",Tonyu.globals.$screenWidth/4-60,Tonyu.globals.$screenHeight-30,35,"center");
      //$LASTPOS=58011018;//kernel.MapEditorOLD2:11018
      Tonyu.globals.$panel.fillText("copy",Tonyu.globals.$screenWidth/4+60,Tonyu.globals.$screenHeight-30,35,"center");
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"inRect":{"nowait":false},"drawPanel":{"nowait":false}},"fields":{"loadMode":{},"fileExist":{},"fileList":{},"fNames":{},"fileName":{},"mapDataFile":{},"baseData":{},"loadedFile":{},"mapData":{},"mapOnData":{},"chipWidth":{},"chipHeight":{},"row":{},"col":{},"panel":{},"mIW":{},"mIH":{},"mCW":{},"mCH":{},"counter":{},"i":{},"j":{},"mode":{},"prevMode":{},"mapp":{},"mx":{},"my":{},"chipX":{},"chipY":{},"saveFileName":{},"saveDataFile":{},"data":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Pad',
  shortName: 'Pad',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Pad_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=59001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      //$LASTPOS=59003465;//kernel.Pad:3465
      while (true) {
        //$LASTPOS=59003484;//kernel.Pad:3484
        _this.padUpdate();
        //$LASTPOS=59003502;//kernel.Pad:3502
        _this.update();
        
      }
    },
    fiber$main :function _trc_Pad_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=59001202;//kernel.Pad:1202
      _this.APAD_DIAG_SIZE=96;
      
      _thread.enter(function _trc_Pad_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=59003465;//kernel.Pad:3465
          case 1:
            //$LASTPOS=59003484;//kernel.Pad:3484
            _this.fiber$padUpdate(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=59003502;//kernel.Pad:3502
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=1;break;
          case 4     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_Pad_initialize(opt) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=59000033;//kernel.Pad:33
      Tonyu.classes.kernel.Actor.apply( _this, [opt]);
      //$LASTPOS=59000050;//kernel.Pad:50
      _this.padImageP=Tonyu.globals.$pat_inputPad;
      //$LASTPOS=59000082;//kernel.Pad:82
      _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=59000183;//kernel.Pad:183
      _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=59000292;//kernel.Pad:292
      _this.jujiKey.show();
      //$LASTPOS=59000313;//kernel.Pad:313
      _this.no1Key.show();
      //$LASTPOS=59000339;//kernel.Pad:339
      _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=59000446;//kernel.Pad:446
      _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=59000553;//kernel.Pad:553
      _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=59000660;//kernel.Pad:660
      _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=59000767;//kernel.Pad:767
      _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=59000879;//kernel.Pad:879
      _this.jujiKeyPushU.hide();
      //$LASTPOS=59000905;//kernel.Pad:905
      _this.jujiKeyPushL.hide();
      //$LASTPOS=59000931;//kernel.Pad:931
      _this.jujiKeyPushR.hide();
      //$LASTPOS=59000957;//kernel.Pad:957
      _this.jujiKeyPushD.hide();
      //$LASTPOS=59000983;//kernel.Pad:983
      _this.jujiKeyPush1.hide();
    },
    die :function _trc_Pad_die() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=59001021;//kernel.Pad:1021
      _this.jujiKey.die();
      //$LASTPOS=59001041;//kernel.Pad:1041
      _this.no1Key.die();
      //$LASTPOS=59001060;//kernel.Pad:1060
      _this.jujiKeyPushU.die();
      //$LASTPOS=59001085;//kernel.Pad:1085
      _this.jujiKeyPushL.die();
      //$LASTPOS=59001110;//kernel.Pad:1110
      _this.jujiKeyPushR.die();
      //$LASTPOS=59001135;//kernel.Pad:1135
      _this.jujiKeyPushD.die();
      //$LASTPOS=59001160;//kernel.Pad:1160
      _this.jujiKeyPush1.die();
      //$LASTPOS=59001185;//kernel.Pad:1185
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    },
    padUpdate :function _trc_Pad_padUpdate() {
      "use strict";
      var _this=this;
      var i;
      var t;
      
      //$LASTPOS=59001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=59001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=59001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=59001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=59001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=59001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=59001383;//kernel.Pad:1383
      //$LASTPOS=59001388;//kernel.Pad:1388
      i = 0;
      for (; i<5 ; i++) {
        {
          //$LASTPOS=59001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          
          //$LASTPOS=59001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=59001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=59001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=59001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=59001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=59001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=59001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=59001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=59001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=59001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=59002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=59002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=59002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
      }
      //$LASTPOS=59002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=59002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=59002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=59002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=59002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=59002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=59002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=59002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=59002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=59002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=59002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=59002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=59002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=59002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=59002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=59002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=59002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=59002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=59002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=59002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=59002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=59002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=59002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=59002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=59002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=59002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=59002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=59002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=59002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=59002739;//kernel.Pad:2739
        _this.jujiKeyPush1.hide();
      }
    },
    fiber$padUpdate :function _trc_Pad_f_padUpdate(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var t;
      
      //$LASTPOS=59001258;//kernel.Pad:1258
      _this.keyPushL=0;
      //$LASTPOS=59001277;//kernel.Pad:1277
      _this.keyPushR=0;
      //$LASTPOS=59001296;//kernel.Pad:1296
      _this.keyPushU=0;
      //$LASTPOS=59001315;//kernel.Pad:1315
      _this.keyPushD=0;
      //$LASTPOS=59001334;//kernel.Pad:1334
      _this.keyPush1=0;
      //$LASTPOS=59001359;//kernel.Pad:1359
      _this.padKeyNotapCnt++;
      //$LASTPOS=59001383;//kernel.Pad:1383
      //$LASTPOS=59001388;//kernel.Pad:1388
      i = 0;
      for (; i<5 ; i++) {
        {
          //$LASTPOS=59001436;//kernel.Pad:1436
          t = Tonyu.globals.$touches[i];
          
          //$LASTPOS=59001466;//kernel.Pad:1466
          if (t.touched) {
            //$LASTPOS=59001496;//kernel.Pad:1496
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=59001593;//kernel.Pad:1593
              _this.keyPushU=1;
            }
            //$LASTPOS=59001620;//kernel.Pad:1620
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
              //$LASTPOS=59001717;//kernel.Pad:1717
              _this.keyPushD=1;
            }
            //$LASTPOS=59001744;//kernel.Pad:1744
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=59001841;//kernel.Pad:1841
              _this.keyPushL=1;
            }
            //$LASTPOS=59001868;//kernel.Pad:1868
            if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
              //$LASTPOS=59001965;//kernel.Pad:1965
              _this.keyPushR=1;
            }
            //$LASTPOS=59001992;//kernel.Pad:1992
            if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
              //$LASTPOS=59002054;//kernel.Pad:2054
              _this.keyPush1=1;
            }
            //$LASTPOS=59002081;//kernel.Pad:2081
            _this.padKeySW=1;
            //$LASTPOS=59002108;//kernel.Pad:2108
            _this.padKeyNotapCnt=0;
            
          }
        }
      }
      //$LASTPOS=59002173;//kernel.Pad:2173
      if (_this.keyPushL) {
        //$LASTPOS=59002187;//kernel.Pad:2187
        _this.keyCntL++;
      } else {
        //$LASTPOS=59002204;//kernel.Pad:2204
        _this.keyCntL=0;
      }
      //$LASTPOS=59002222;//kernel.Pad:2222
      if (_this.keyPushR) {
        //$LASTPOS=59002236;//kernel.Pad:2236
        _this.keyCntR++;
      } else {
        //$LASTPOS=59002253;//kernel.Pad:2253
        _this.keyCntR=0;
      }
      //$LASTPOS=59002271;//kernel.Pad:2271
      if (_this.keyPushU) {
        //$LASTPOS=59002285;//kernel.Pad:2285
        _this.keyCntU++;
      } else {
        //$LASTPOS=59002302;//kernel.Pad:2302
        _this.keyCntU=0;
      }
      //$LASTPOS=59002320;//kernel.Pad:2320
      if (_this.keyPushD) {
        //$LASTPOS=59002334;//kernel.Pad:2334
        _this.keyCntD++;
      } else {
        //$LASTPOS=59002351;//kernel.Pad:2351
        _this.keyCntD=0;
      }
      //$LASTPOS=59002369;//kernel.Pad:2369
      if (_this.keyPush1) {
        //$LASTPOS=59002383;//kernel.Pad:2383
        _this.keyCnt1++;
      } else {
        //$LASTPOS=59002400;//kernel.Pad:2400
        _this.keyCnt1=0;
      }
      //$LASTPOS=59002435;//kernel.Pad:2435
      if (_this.keyPushL) {
        //$LASTPOS=59002449;//kernel.Pad:2449
        _this.jujiKeyPushL.show();
      } else {
        //$LASTPOS=59002475;//kernel.Pad:2475
        _this.jujiKeyPushL.hide();
      }
      //$LASTPOS=59002501;//kernel.Pad:2501
      if (_this.keyPushR) {
        //$LASTPOS=59002515;//kernel.Pad:2515
        _this.jujiKeyPushR.show();
      } else {
        //$LASTPOS=59002541;//kernel.Pad:2541
        _this.jujiKeyPushR.hide();
      }
      //$LASTPOS=59002567;//kernel.Pad:2567
      if (_this.keyPushU) {
        //$LASTPOS=59002581;//kernel.Pad:2581
        _this.jujiKeyPushU.show();
      } else {
        //$LASTPOS=59002607;//kernel.Pad:2607
        _this.jujiKeyPushU.hide();
      }
      //$LASTPOS=59002633;//kernel.Pad:2633
      if (_this.keyPushD) {
        //$LASTPOS=59002647;//kernel.Pad:2647
        _this.jujiKeyPushD.show();
      } else {
        //$LASTPOS=59002673;//kernel.Pad:2673
        _this.jujiKeyPushD.hide();
      }
      //$LASTPOS=59002699;//kernel.Pad:2699
      if (_this.keyPush1) {
        //$LASTPOS=59002713;//kernel.Pad:2713
        _this.jujiKeyPush1.show();
      } else {
        //$LASTPOS=59002739;//kernel.Pad:2739
        _this.jujiKeyPush1.hide();
      }
      
      _thread.retVal=_this;return;
    },
    getPadUp :function _trc_Pad_getPadUp() {
      "use strict";
      var _this=this;
      
      return _this.keyCntU;
    },
    fiber$getPadUp :function _trc_Pad_f_getPadUp(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntU;return;
      
      
      _thread.retVal=_this;return;
    },
    getPadDown :function _trc_Pad_getPadDown() {
      "use strict";
      var _this=this;
      
      return _this.keyCntD;
    },
    fiber$getPadDown :function _trc_Pad_f_getPadDown(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntD;return;
      
      
      _thread.retVal=_this;return;
    },
    getPadLeft :function _trc_Pad_getPadLeft() {
      "use strict";
      var _this=this;
      
      return _this.keyCntL;
    },
    fiber$getPadLeft :function _trc_Pad_f_getPadLeft(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntL;return;
      
      
      _thread.retVal=_this;return;
    },
    getPadRight :function _trc_Pad_getPadRight() {
      "use strict";
      var _this=this;
      
      return _this.keyCntR;
    },
    fiber$getPadRight :function _trc_Pad_f_getPadRight(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntR;return;
      
      
      _thread.retVal=_this;return;
    },
    getPadButton :function _trc_Pad_getPadButton(i) {
      "use strict";
      var _this=this;
      var value;
      
      
      //$LASTPOS=59002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=59002968;//kernel.Pad:2968
        value=_this.keyCnt1;
      }
      return value;
    },
    fiber$getPadButton :function _trc_Pad_f_getPadButton(_thread,i) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var value;
      
      
      //$LASTPOS=59002956;//kernel.Pad:2956
      if (i==0) {
        //$LASTPOS=59002968;//kernel.Pad:2968
        value=_this.keyCnt1;
      }
      _thread.retVal=value;return;
      
      
      _thread.retVal=_this;return;
    },
    getUp :function _trc_Pad_getUp() {
      "use strict";
      var _this=this;
      
      return _this.keyCntU;
    },
    fiber$getUp :function _trc_Pad_f_getUp(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntU;return;
      
      
      _thread.retVal=_this;return;
    },
    getDown :function _trc_Pad_getDown() {
      "use strict";
      var _this=this;
      
      return _this.keyCntD;
    },
    fiber$getDown :function _trc_Pad_f_getDown(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntD;return;
      
      
      _thread.retVal=_this;return;
    },
    getLeft :function _trc_Pad_getLeft() {
      "use strict";
      var _this=this;
      
      return _this.keyCntL;
    },
    fiber$getLeft :function _trc_Pad_f_getLeft(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntL;return;
      
      
      _thread.retVal=_this;return;
    },
    getRight :function _trc_Pad_getRight() {
      "use strict";
      var _this=this;
      
      return _this.keyCntR;
    },
    fiber$getRight :function _trc_Pad_f_getRight(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.keyCntR;return;
      
      
      _thread.retVal=_this;return;
    },
    getButton :function _trc_Pad_getButton(i) {
      "use strict";
      var _this=this;
      var value;
      
      
      //$LASTPOS=59003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=59003191;//kernel.Pad:3191
        value=_this.keyCnt1;
      }
      return value;
    },
    fiber$getButton :function _trc_Pad_f_getButton(_thread,i) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var value;
      
      
      //$LASTPOS=59003179;//kernel.Pad:3179
      if (i==0) {
        //$LASTPOS=59003191;//kernel.Pad:3191
        value=_this.keyCnt1;
      }
      _thread.retVal=value;return;
      
      
      _thread.retVal=_this;return;
    },
    isOnRect :function _trc_Pad_isOnRect(mx,my,rx,ry,rx2,ry2) {
      "use strict";
      var _this=this;
      
      return (rx<=mx&&mx<rx2&&ry<=my&&my<ry2);
    },
    fiber$isOnRect :function _trc_Pad_f_isOnRect(_thread,mx,my,rx,ry,rx2,ry2) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(rx<=mx&&mx<rx2&&ry<=my&&my<ry2);return;
      
      
      _thread.retVal=_this;return;
    },
    isOnRectWH :function _trc_Pad_isOnRectWH(mx,my,rx,ry,rw,rh) {
      "use strict";
      var _this=this;
      
      return (rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);
    },
    fiber$isOnRectWH :function _trc_Pad_f_isOnRectWH(_thread,mx,my,rx,ry,rw,rh) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"die":{"nowait":true},"padUpdate":{"nowait":false},"getPadUp":{"nowait":false},"getPadDown":{"nowait":false},"getPadLeft":{"nowait":false},"getPadRight":{"nowait":false},"getPadButton":{"nowait":false},"getUp":{"nowait":false},"getDown":{"nowait":false},"getLeft":{"nowait":false},"getRight":{"nowait":false},"getButton":{"nowait":false},"isOnRect":{"nowait":false},"isOnRectWH":{"nowait":false}},"fields":{"APAD_DIAG_SIZE":{},"padImageP":{},"jujiKey":{},"no1Key":{},"jujiKeyPushU":{},"jujiKeyPushL":{},"jujiKeyPushR":{},"jujiKeyPushD":{},"jujiKeyPush1":{},"keyPushL":{},"keyPushR":{},"keyPushU":{},"keyPushD":{},"keyPush1":{},"padKeyNotapCnt":{},"padKeySW":{},"keyCntL":{},"keyCntR":{},"keyCntU":{},"keyCntD":{},"keyCnt1":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.UILayout',
  shortName: 'UILayout',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_UILayout_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=60000018;//kernel.UILayout:18
      _this.doLayout();
      //$LASTPOS=60000031;//kernel.UILayout:31
      Tonyu.globals.$Screen.on("resize",Tonyu.bindFunc(_this,_this.doLayout));
      //$LASTPOS=60000063;//kernel.UILayout:63
      Tonyu.globals.$uiScreen.on("resize",Tonyu.bindFunc(_this,_this.doLayout));
    },
    fiber$main :function _trc_UILayout_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_UILayout_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=60000018;//kernel.UILayout:18
            _this.fiber$doLayout(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=60000031;//kernel.UILayout:31
            Tonyu.globals.$Screen.on("resize",Tonyu.bindFunc(_this,_this.doLayout));
            //$LASTPOS=60000063;//kernel.UILayout:63
            Tonyu.globals.$uiScreen.on("resize",Tonyu.bindFunc(_this,_this.doLayout));
            _thread.exit(_this);return;
          }
        }
      });
    },
    doLayout :function _trc_UILayout_doLayout() {
      "use strict";
      var _this=this;
      var cw;
      var ch;
      var width;
      var height;
      var calcw;
      var calch;
      var scl;
      var isPC;
      
      //$LASTPOS=60000116;//kernel.UILayout:116
      cw = Tonyu.globals.$uiScreen.width;
      
      //$LASTPOS=60000145;//kernel.UILayout:145
      ch = Tonyu.globals.$uiScreen.height;
      
      //$LASTPOS=60000175;//kernel.UILayout:175
      width = Tonyu.globals.$Screen.width;
      
      //$LASTPOS=60000205;//kernel.UILayout:205
      height = Tonyu.globals.$Screen.height;
      
      //$LASTPOS=60000243;//kernel.UILayout:243
      calcw = ch/height*width;
      
      //$LASTPOS=60000295;//kernel.UILayout:295
      calch = cw/width*height;
      
      //$LASTPOS=60000347;//kernel.UILayout:347
      if (calch>ch) {
        //$LASTPOS=60000361;//kernel.UILayout:361
        calch=ch;
      }
      //$LASTPOS=60000376;//kernel.UILayout:376
      if (calcw>cw) {
        //$LASTPOS=60000390;//kernel.UILayout:390
        calcw=cw;
      }
      //$LASTPOS=60000405;//kernel.UILayout:405
      scl = 1;
      
      //$LASTPOS=60000421;//kernel.UILayout:421
      isPC = ! (Tonyu.globals.$Navigator.isTablet()||Tonyu.globals.$Navigator.isMobile());
      
      //$LASTPOS=60000486;//kernel.UILayout:486
      if (isPC&&_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=60000548;//kernel.UILayout:548
        calcw=width;
        //$LASTPOS=60000560;//kernel.UILayout:560
        calch=height;
        //$LASTPOS=60000583;//kernel.UILayout:583
        Tonyu.globals.$Screen.scaleX=1;
        
      } else {
        //$LASTPOS=60000624;//kernel.UILayout:624
        Tonyu.globals.$Screen.scaleX=calcw/width;
        
      }
      //$LASTPOS=60000668;//kernel.UILayout:668
      Tonyu.globals.$Screen.x=_this.trunc(cw/2)+width/2%1;
      //$LASTPOS=60000706;//kernel.UILayout:706
      Tonyu.globals.$Screen.y=_this.trunc(ch/2)+height/2%1;
    },
    fiber$doLayout :function _trc_UILayout_f_doLayout(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var cw;
      var ch;
      var width;
      var height;
      var calcw;
      var calch;
      var scl;
      var isPC;
      
      //$LASTPOS=60000116;//kernel.UILayout:116
      cw = Tonyu.globals.$uiScreen.width;
      
      //$LASTPOS=60000145;//kernel.UILayout:145
      ch = Tonyu.globals.$uiScreen.height;
      
      //$LASTPOS=60000175;//kernel.UILayout:175
      width = Tonyu.globals.$Screen.width;
      
      //$LASTPOS=60000205;//kernel.UILayout:205
      height = Tonyu.globals.$Screen.height;
      
      //$LASTPOS=60000243;//kernel.UILayout:243
      calcw = ch/height*width;
      
      //$LASTPOS=60000295;//kernel.UILayout:295
      calch = cw/width*height;
      
      //$LASTPOS=60000347;//kernel.UILayout:347
      if (calch>ch) {
        //$LASTPOS=60000361;//kernel.UILayout:361
        calch=ch;
      }
      //$LASTPOS=60000376;//kernel.UILayout:376
      if (calcw>cw) {
        //$LASTPOS=60000390;//kernel.UILayout:390
        calcw=cw;
      }
      //$LASTPOS=60000405;//kernel.UILayout:405
      scl = 1;
      
      //$LASTPOS=60000421;//kernel.UILayout:421
      isPC = ! (Tonyu.globals.$Navigator.isTablet()||Tonyu.globals.$Navigator.isMobile());
      
      //$LASTPOS=60000486;//kernel.UILayout:486
      if (isPC&&_this.shouldDraw1x1(width,height,calcw,calch)) {
        //$LASTPOS=60000548;//kernel.UILayout:548
        calcw=width;
        //$LASTPOS=60000560;//kernel.UILayout:560
        calch=height;
        //$LASTPOS=60000583;//kernel.UILayout:583
        Tonyu.globals.$Screen.scaleX=1;
        
      } else {
        //$LASTPOS=60000624;//kernel.UILayout:624
        Tonyu.globals.$Screen.scaleX=calcw/width;
        
      }
      //$LASTPOS=60000668;//kernel.UILayout:668
      Tonyu.globals.$Screen.x=_this.trunc(cw/2)+width/2%1;
      //$LASTPOS=60000706;//kernel.UILayout:706
      Tonyu.globals.$Screen.y=_this.trunc(ch/2)+height/2%1;
      
      _thread.retVal=_this;return;
    },
    shouldDraw1x1 :function _trc_UILayout_shouldDraw1x1(srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      var larger;
      var smaller;
      
      //$LASTPOS=60000832;//kernel.UILayout:832
      larger = 100;
      
      //$LASTPOS=60000853;//kernel.UILayout:853
      smaller = 0;
      
      return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
    },
    fiber$shouldDraw1x1 :function _trc_UILayout_f_shouldDraw1x1(_thread,srcw,srch,dstw,dsth) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var larger;
      var smaller;
      
      //$LASTPOS=60000832;//kernel.UILayout:832
      larger = 100;
      
      //$LASTPOS=60000853;//kernel.UILayout:853
      smaller = 0;
      
      _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"doLayout":{"nowait":false},"shouldDraw1x1":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'kernel.WebPage',
  shortName: 'WebPage',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_WebPage_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=61000080;//kernel.WebPage:80
      _this.eventWindowOpen=(function anonymous_98(e) {
        
        //$LASTPOS=61000165;//kernel.WebPage:165
        window.open(_this.postUrl);
        //$LASTPOS=61000192;//kernel.WebPage:192
        if (_this.canvas.removeEventListener) {
          //$LASTPOS=61000235;//kernel.WebPage:235
          _this.canvas.removeEventListener("click",_this.eventWindowOpen,false);
          //$LASTPOS=61000305;//kernel.WebPage:305
          _this.canvas.removeEventListener("touchend",_this.eventWindowOpen,false);
          //$LASTPOS=61000378;//kernel.WebPage:378
          _this.listenerExists=false;
          
        } else {
          //$LASTPOS=61000414;//kernel.WebPage:414
          if (_this.canvas.detachEvent) {
            //$LASTPOS=61000448;//kernel.WebPage:448
            _this.canvas.detachEvent("onclick",_this.eventWindowOpen);
            //$LASTPOS=61000505;//kernel.WebPage:505
            _this.canvas.detachEvent("touchend",_this.eventWindowOpen);
            //$LASTPOS=61000563;//kernel.WebPage:563
            _this.listenerExists=false;
            
          }
        }
      });
    },
    fiber$main :function _trc_WebPage_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=61000080;//kernel.WebPage:80
      _this.eventWindowOpen=(function anonymous_98(e) {
        
        //$LASTPOS=61000165;//kernel.WebPage:165
        window.open(_this.postUrl);
        //$LASTPOS=61000192;//kernel.WebPage:192
        if (_this.canvas.removeEventListener) {
          //$LASTPOS=61000235;//kernel.WebPage:235
          _this.canvas.removeEventListener("click",_this.eventWindowOpen,false);
          //$LASTPOS=61000305;//kernel.WebPage:305
          _this.canvas.removeEventListener("touchend",_this.eventWindowOpen,false);
          //$LASTPOS=61000378;//kernel.WebPage:378
          _this.listenerExists=false;
          
        } else {
          //$LASTPOS=61000414;//kernel.WebPage:414
          if (_this.canvas.detachEvent) {
            //$LASTPOS=61000448;//kernel.WebPage:448
            _this.canvas.detachEvent("onclick",_this.eventWindowOpen);
            //$LASTPOS=61000505;//kernel.WebPage:505
            _this.canvas.detachEvent("touchend",_this.eventWindowOpen);
            //$LASTPOS=61000563;//kernel.WebPage:563
            _this.listenerExists=false;
            
          }
        }
      });
      
      _thread.retVal=_this;return;
    },
    openNewWindow :function _trc_WebPage_openNewWindow(url) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=61000628;//kernel.WebPage:628
      _this.postUrl=url;
      //$LASTPOS=61000708;//kernel.WebPage:708
      _this.canvas=document.getElementsByTagName("canvas")[0];
      //$LASTPOS=61000764;//kernel.WebPage:764
      if (! _this.listenerExists) {
        //$LASTPOS=61000796;//kernel.WebPage:796
        if (_this.canvas.addEventListener) {
          //$LASTPOS=61000840;//kernel.WebPage:840
          _this.canvas.addEventListener("click",_this.eventWindowOpen,false);
          //$LASTPOS=61000911;//kernel.WebPage:911
          _this.canvas.addEventListener("touchend",_this.eventWindowOpen,false);
          //$LASTPOS=61001054;//kernel.WebPage:1054
          _this.listenerExists=true;
          
        } else {
          //$LASTPOS=61001093;//kernel.WebPage:1093
          if (_this.canvas.attachEvent) {
            //$LASTPOS=61001131;//kernel.WebPage:1131
            _this.canvas.attachEvent("onclick",_this.eventWindowOpen);
            //$LASTPOS=61001192;//kernel.WebPage:1192
            _this.canvas.attachEvent("touchend",_this.eventWindowOpen);
            //$LASTPOS=61001254;//kernel.WebPage:1254
            _this.listenerExists=true;
            
          }
        }
        
      }
    },
    fiber$openNewWindow :function _trc_WebPage_f_openNewWindow(_thread,url) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=61000628;//kernel.WebPage:628
      _this.postUrl=url;
      //$LASTPOS=61000708;//kernel.WebPage:708
      _this.canvas=document.getElementsByTagName("canvas")[0];
      //$LASTPOS=61000764;//kernel.WebPage:764
      if (! _this.listenerExists) {
        //$LASTPOS=61000796;//kernel.WebPage:796
        if (_this.canvas.addEventListener) {
          //$LASTPOS=61000840;//kernel.WebPage:840
          _this.canvas.addEventListener("click",_this.eventWindowOpen,false);
          //$LASTPOS=61000911;//kernel.WebPage:911
          _this.canvas.addEventListener("touchend",_this.eventWindowOpen,false);
          //$LASTPOS=61001054;//kernel.WebPage:1054
          _this.listenerExists=true;
          
        } else {
          //$LASTPOS=61001093;//kernel.WebPage:1093
          if (_this.canvas.attachEvent) {
            //$LASTPOS=61001131;//kernel.WebPage:1131
            _this.canvas.attachEvent("onclick",_this.eventWindowOpen);
            //$LASTPOS=61001192;//kernel.WebPage:1192
            _this.canvas.attachEvent("touchend",_this.eventWindowOpen);
            //$LASTPOS=61001254;//kernel.WebPage:1254
            _this.listenerExists=true;
            
          }
        }
        
      }
      
      _thread.retVal=_this;return;
    },
    openPage :function _trc_WebPage_openPage(url) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=61001323;//kernel.WebPage:1323
      window.location.href=url;
    },
    fiber$openPage :function _trc_WebPage_f_openPage(_thread,url) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=61001323;//kernel.WebPage:1323
      window.location.href=url;
      
      _thread.retVal=_this;return;
    },
    openTweet :function _trc_WebPage_openTweet(text,url,hashtags,via,related,tl) {
      "use strict";
      var _this=this;
      var sendUrl;
      
      //$LASTPOS=61001906;//kernel.WebPage:1906
      sendUrl = "https://twitter.com/intent/tweet?";
      
      //$LASTPOS=61001962;//kernel.WebPage:1962
      sendUrl+="text="+encodeURIComponent(text);
      //$LASTPOS=61002014;//kernel.WebPage:2014
      if (url!=null) {
        //$LASTPOS=61002042;//kernel.WebPage:2042
        sendUrl+="&";
        //$LASTPOS=61002067;//kernel.WebPage:2067
        sendUrl+="url="+encodeURIComponent(url);
        
      }
      //$LASTPOS=61002124;//kernel.WebPage:2124
      if (hashtags!=null) {
        //$LASTPOS=61002157;//kernel.WebPage:2157
        sendUrl+="&";
        //$LASTPOS=61002182;//kernel.WebPage:2182
        sendUrl+="hashtags="+encodeURIComponent(hashtags);
        
      }
      //$LASTPOS=61002249;//kernel.WebPage:2249
      if (via!=null) {
        //$LASTPOS=61002277;//kernel.WebPage:2277
        sendUrl+="&";
        //$LASTPOS=61002302;//kernel.WebPage:2302
        sendUrl+="via="+encodeURIComponent(via);
        
      }
      //$LASTPOS=61002359;//kernel.WebPage:2359
      if (related!=null) {
        //$LASTPOS=61002391;//kernel.WebPage:2391
        sendUrl+="&";
        //$LASTPOS=61002416;//kernel.WebPage:2416
        sendUrl+="related="+encodeURIComponent(related);
        
      }
      //$LASTPOS=61002481;//kernel.WebPage:2481
      if (tl) {
        //$LASTPOS=61002500;//kernel.WebPage:2500
        sendUrl+="&";
        //$LASTPOS=61002525;//kernel.WebPage:2525
        sendUrl+="source=webclient";
        
      }
      //$LASTPOS=61002568;//kernel.WebPage:2568
      _this.openNewWindow(sendUrl);
    },
    fiber$openTweet :function _trc_WebPage_f_openTweet(_thread,text,url,hashtags,via,related,tl) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var sendUrl;
      
      //$LASTPOS=61001906;//kernel.WebPage:1906
      sendUrl = "https://twitter.com/intent/tweet?";
      
      //$LASTPOS=61001962;//kernel.WebPage:1962
      sendUrl+="text="+encodeURIComponent(text);
      //$LASTPOS=61002014;//kernel.WebPage:2014
      if (url!=null) {
        //$LASTPOS=61002042;//kernel.WebPage:2042
        sendUrl+="&";
        //$LASTPOS=61002067;//kernel.WebPage:2067
        sendUrl+="url="+encodeURIComponent(url);
        
      }
      //$LASTPOS=61002124;//kernel.WebPage:2124
      if (hashtags!=null) {
        //$LASTPOS=61002157;//kernel.WebPage:2157
        sendUrl+="&";
        //$LASTPOS=61002182;//kernel.WebPage:2182
        sendUrl+="hashtags="+encodeURIComponent(hashtags);
        
      }
      //$LASTPOS=61002249;//kernel.WebPage:2249
      if (via!=null) {
        //$LASTPOS=61002277;//kernel.WebPage:2277
        sendUrl+="&";
        //$LASTPOS=61002302;//kernel.WebPage:2302
        sendUrl+="via="+encodeURIComponent(via);
        
      }
      //$LASTPOS=61002359;//kernel.WebPage:2359
      if (related!=null) {
        //$LASTPOS=61002391;//kernel.WebPage:2391
        sendUrl+="&";
        //$LASTPOS=61002416;//kernel.WebPage:2416
        sendUrl+="related="+encodeURIComponent(related);
        
      }
      //$LASTPOS=61002481;//kernel.WebPage:2481
      if (tl) {
        //$LASTPOS=61002500;//kernel.WebPage:2500
        sendUrl+="&";
        //$LASTPOS=61002525;//kernel.WebPage:2525
        sendUrl+="source=webclient";
        
      }
      
      _thread.enter(function _trc_WebPage_ent_openTweet(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=61002568;//kernel.WebPage:2568
            _this.fiber$openNewWindow(_thread, sendUrl);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    openShareTweet :function _trc_WebPage_openShareTweet(text,url,hashtags,via,related,tl) {
      "use strict";
      var _this=this;
      var sendUrl;
      var tempText;
      
      //$LASTPOS=61003509;//kernel.WebPage:3509
      sendUrl = "https://twitter.com/intent/tweet?";
      
      //$LASTPOS=61003628;//kernel.WebPage:3628
      if (arguments.length==2) {
        //$LASTPOS=61003664;//kernel.WebPage:3664
        if (text.match(/^http/)) {
          //$LASTPOS=61003704;//kernel.WebPage:3704
          tempText = text;
          
          //$LASTPOS=61003736;//kernel.WebPage:3736
          text=url;
          //$LASTPOS=61003745;//kernel.WebPage:3745
          url=tempText;
          
        }
        
      }
      //$LASTPOS=61003782;//kernel.WebPage:3782
      sendUrl+="text="+encodeURIComponent(text);
      //$LASTPOS=61003834;//kernel.WebPage:3834
      sendUrl+="&";
      //$LASTPOS=61003855;//kernel.WebPage:3855
      if (url==null) {
        //$LASTPOS=61003883;//kernel.WebPage:3883
        sendUrl+="url="+window.location.href;
        
      } else {
        //$LASTPOS=61003948;//kernel.WebPage:3948
        sendUrl+="url="+encodeURIComponent(url);
        
      }
      //$LASTPOS=61004005;//kernel.WebPage:4005
      if (hashtags!=null) {
        //$LASTPOS=61004038;//kernel.WebPage:4038
        sendUrl+="&";
        //$LASTPOS=61004063;//kernel.WebPage:4063
        sendUrl+="hashtags="+encodeURIComponent(hashtags);
        
      }
      //$LASTPOS=61004130;//kernel.WebPage:4130
      if (via!=null) {
        //$LASTPOS=61004158;//kernel.WebPage:4158
        sendUrl+="&";
        //$LASTPOS=61004183;//kernel.WebPage:4183
        sendUrl+="via="+encodeURIComponent(via);
        
      }
      //$LASTPOS=61004240;//kernel.WebPage:4240
      if (related!=null) {
        //$LASTPOS=61004272;//kernel.WebPage:4272
        sendUrl+="&";
        //$LASTPOS=61004297;//kernel.WebPage:4297
        sendUrl+="related="+encodeURIComponent(related);
        
      }
      //$LASTPOS=61004362;//kernel.WebPage:4362
      if (tl) {
        //$LASTPOS=61004381;//kernel.WebPage:4381
        sendUrl+="&";
        //$LASTPOS=61004406;//kernel.WebPage:4406
        sendUrl+="source=webclient";
        
      }
      //$LASTPOS=61004449;//kernel.WebPage:4449
      _this.openNewWindow(sendUrl);
    },
    fiber$openShareTweet :function _trc_WebPage_f_openShareTweet(_thread,text,url,hashtags,via,related,tl) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var sendUrl;
      var tempText;
      
      //$LASTPOS=61003509;//kernel.WebPage:3509
      sendUrl = "https://twitter.com/intent/tweet?";
      
      //$LASTPOS=61003628;//kernel.WebPage:3628
      if (_arguments.length==2) {
        //$LASTPOS=61003664;//kernel.WebPage:3664
        if (text.match(/^http/)) {
          //$LASTPOS=61003704;//kernel.WebPage:3704
          tempText = text;
          
          //$LASTPOS=61003736;//kernel.WebPage:3736
          text=url;
          //$LASTPOS=61003745;//kernel.WebPage:3745
          url=tempText;
          
        }
        
      }
      //$LASTPOS=61003782;//kernel.WebPage:3782
      sendUrl+="text="+encodeURIComponent(text);
      //$LASTPOS=61003834;//kernel.WebPage:3834
      sendUrl+="&";
      //$LASTPOS=61003855;//kernel.WebPage:3855
      if (url==null) {
        //$LASTPOS=61003883;//kernel.WebPage:3883
        sendUrl+="url="+window.location.href;
        
      } else {
        //$LASTPOS=61003948;//kernel.WebPage:3948
        sendUrl+="url="+encodeURIComponent(url);
        
      }
      //$LASTPOS=61004005;//kernel.WebPage:4005
      if (hashtags!=null) {
        //$LASTPOS=61004038;//kernel.WebPage:4038
        sendUrl+="&";
        //$LASTPOS=61004063;//kernel.WebPage:4063
        sendUrl+="hashtags="+encodeURIComponent(hashtags);
        
      }
      //$LASTPOS=61004130;//kernel.WebPage:4130
      if (via!=null) {
        //$LASTPOS=61004158;//kernel.WebPage:4158
        sendUrl+="&";
        //$LASTPOS=61004183;//kernel.WebPage:4183
        sendUrl+="via="+encodeURIComponent(via);
        
      }
      //$LASTPOS=61004240;//kernel.WebPage:4240
      if (related!=null) {
        //$LASTPOS=61004272;//kernel.WebPage:4272
        sendUrl+="&";
        //$LASTPOS=61004297;//kernel.WebPage:4297
        sendUrl+="related="+encodeURIComponent(related);
        
      }
      //$LASTPOS=61004362;//kernel.WebPage:4362
      if (tl) {
        //$LASTPOS=61004381;//kernel.WebPage:4381
        sendUrl+="&";
        //$LASTPOS=61004406;//kernel.WebPage:4406
        sendUrl+="source=webclient";
        
      }
      
      _thread.enter(function _trc_WebPage_ent_openShareTweet(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=61004449;//kernel.WebPage:4449
            _this.fiber$openNewWindow(_thread, sendUrl);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"openNewWindow":{"nowait":false},"openPage":{"nowait":false},"openTweet":{"nowait":false},"openShareTweet":{"nowait":false}},"fields":{"eventWindowOpen":{},"postUrl":{},"canvas":{},"listenerExists":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.Boot',
  shortName: 'Boot',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.kernel.T2MediaPlayer],
  methods: {
    main :function _trc_Boot_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62000234;//kernel.Boot:234
      Tonyu.resetLoopCheck(10000);
      //$LASTPOS=62000264;//kernel.Boot:264
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=62000277;//kernel.Boot:277
      _this._scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=62000315;//kernel.Boot:315
      _this.initEvents();
      //$LASTPOS=62000330;//kernel.Boot:330
      _this.initLayers();
      //$LASTPOS=62000345;//kernel.Boot:345
      _this.initPeripherals();
      //$LASTPOS=62000365;//kernel.Boot:365
      _this.loadPlugins();
      //$LASTPOS=62000381;//kernel.Boot:381
      _this.loadImages();
      //$LASTPOS=62000396;//kernel.Boot:396
      _this.loadSounds();
      //$LASTPOS=62000411;//kernel.Boot:411
      _this.createMainObject();
      //$LASTPOS=62000432;//kernel.Boot:432
      _this.progress();
      //$LASTPOS=62000445;//kernel.Boot:445
      _this.mainLoop();
    },
    fiber$main :function _trc_Boot_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=62000234;//kernel.Boot:234
      Tonyu.resetLoopCheck(10000);
      //$LASTPOS=62000264;//kernel.Boot:264
      Tonyu.globals.$Boot=_this;
      //$LASTPOS=62000277;//kernel.Boot:277
      _this._scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      
      _thread.enter(function _trc_Boot_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62000315;//kernel.Boot:315
            _this.fiber$initEvents(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=62000330;//kernel.Boot:330
            _this.fiber$initLayers(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=62000345;//kernel.Boot:345
            _this.fiber$initPeripherals(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=62000365;//kernel.Boot:365
            _this.fiber$loadPlugins(_thread);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=62000381;//kernel.Boot:381
            _this.fiber$loadImages(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=62000396;//kernel.Boot:396
            _this.fiber$loadSounds(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=62000411;//kernel.Boot:411
            _this.fiber$createMainObject(_thread);
            __pc=7;return;
          case 7:
            
            //$LASTPOS=62000432;//kernel.Boot:432
            _this.fiber$progress(_thread);
            __pc=8;return;
          case 8:
            
            //$LASTPOS=62000445;//kernel.Boot:445
            _this.fiber$mainLoop(_thread);
            __pc=9;return;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_Boot_initialize(param) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62000479;//kernel.Boot:479
      _this.extend(param);
      //$LASTPOS=62000499;//kernel.Boot:499
      _this._th=Tonyu.thread();
      //$LASTPOS=62000524;//kernel.Boot:524
      _this._th.apply(_this,"main");
      //$LASTPOS=62000553;//kernel.Boot:553
      _this._th.stepsLoop();
      //$LASTPOS=62000575;//kernel.Boot:575
      _this.on("die",(function anonymous_586() {
        
        //$LASTPOS=62000598;//kernel.Boot:598
        if (_this._th) {
          //$LASTPOS=62000607;//kernel.Boot:607
          _this._th.kill();
        }
      }));
    },
    timeStop :function _trc_Boot_timeStop(except) {
      "use strict";
      var _this=this;
      var oldS;
      var newS;
      var res;
      
      //$LASTPOS=62000656;//kernel.Boot:656
      oldS = _this._scheduler;
      
      //$LASTPOS=62000682;//kernel.Boot:682
      _this._scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=62000724;//kernel.Boot:724
      newS = _this._scheduler;
      
      //$LASTPOS=62000750;//kernel.Boot:750
      res = {release: (function anonymous_778(a) {
        
        //$LASTPOS=62000798;//kernel.Boot:798
        a._scheduler=newS;
        //$LASTPOS=62000830;//kernel.Boot:830
        oldS.findByThreadGroup(a).forEach((function anonymous_864(th) {
          
          //$LASTPOS=62000889;//kernel.Boot:889
          if (th.scheduled===newS) {
            return _this;
          }
          //$LASTPOS=62000939;//kernel.Boot:939
          th.scheduled=null;
          //$LASTPOS=62000975;//kernel.Boot:975
          newS.addToNext(th);
        }));
      }),releaseAll: (function anonymous_1044() {
        var a;
        var e;
        var _it_529;
        
        //$LASTPOS=62001060;//kernel.Boot:1060
        a = Tonyu.globals.$Screen.all();
        
        //$LASTPOS=62001094;//kernel.Boot:1094
        _it_529=Tonyu.iterator(a,1);
        while(_it_529.next()) {
          e=_it_529[0];
          
          //$LASTPOS=62001130;//kernel.Boot:1130
          res.release(e);
          
        }
      })};
      
      //$LASTPOS=62001185;//kernel.Boot:1185
      res.release(except);
      return res;
    },
    fiber$timeStop :function _trc_Boot_f_timeStop(_thread,except) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var oldS;
      var newS;
      var res;
      
      //$LASTPOS=62000656;//kernel.Boot:656
      oldS = _this._scheduler;
      
      //$LASTPOS=62000682;//kernel.Boot:682
      _this._scheduler=Tonyu.globals.$Scheduler=new Tonyu.classes.kernel.Scheduler;
      //$LASTPOS=62000724;//kernel.Boot:724
      newS = _this._scheduler;
      
      //$LASTPOS=62000750;//kernel.Boot:750
      res = {release: (function anonymous_778(a) {
        
        //$LASTPOS=62000798;//kernel.Boot:798
        a._scheduler=newS;
        //$LASTPOS=62000830;//kernel.Boot:830
        oldS.findByThreadGroup(a).forEach((function anonymous_864(th) {
          
          //$LASTPOS=62000889;//kernel.Boot:889
          if (th.scheduled===newS) {
            return _this;
          }
          //$LASTPOS=62000939;//kernel.Boot:939
          th.scheduled=null;
          //$LASTPOS=62000975;//kernel.Boot:975
          newS.addToNext(th);
        }));
      }),releaseAll: (function anonymous_1044() {
        var a;
        var e;
        var _it_529;
        
        //$LASTPOS=62001060;//kernel.Boot:1060
        a = Tonyu.globals.$Screen.all();
        
        //$LASTPOS=62001094;//kernel.Boot:1094
        _it_529=Tonyu.iterator(a,1);
        while(_it_529.next()) {
          e=_it_529[0];
          
          //$LASTPOS=62001130;//kernel.Boot:1130
          res.release(e);
          
        }
      })};
      
      //$LASTPOS=62001185;//kernel.Boot:1185
      res.release(except);
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    update :function _trc_Boot_update() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62001244;//kernel.Boot:1244
      _this.waitFor(Tonyu.timeout(50));
    },
    fiber$update :function _trc_Boot_f_update(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot_ent_update(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62001244;//kernel.Boot:1244
            _this.fiber$waitFor(_thread, Tonyu.timeout(50));
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initEvents :function _trc_Boot_initEvents() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62001349;//kernel.Boot:1349
      _this.eventTypes={"screenOut": Tonyu.classes.kernel.ScreenOutHandler,"crashTo": Tonyu.classes.kernel.CrashToHandler,"within": Tonyu.classes.kernel.WithinHandler};
    },
    fiber$initEvents :function _trc_Boot_f_initEvents(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=62001349;//kernel.Boot:1349
      _this.eventTypes={"screenOut": Tonyu.classes.kernel.ScreenOutHandler,"crashTo": Tonyu.classes.kernel.CrashToHandler,"within": Tonyu.classes.kernel.WithinHandler};
      
      _thread.retVal=_this;return;
    },
    initPeripherals :function _trc_Boot_initPeripherals() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62001506;//kernel.Boot:1506
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=62001541;//kernel.Boot:1541
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=62001582;//kernel.Boot:1582
      Tonyu.globals.$ObjectPool=new Tonyu.classes.kernel.ObjectPool;
      //$LASTPOS=62001615;//kernel.Boot:1615
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=62001636;//kernel.Boot:1636
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=62001657;//kernel.Boot:1657
      Tonyu.globals.$Math=Math;
      //$LASTPOS=62001674;//kernel.Boot:1674
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=62001788;//kernel.Boot:1788
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=62001816;//kernel.Boot:1816
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=62001960;//kernel.Boot:1960
      _this.initFPSParams();
      //$LASTPOS=62001982;//kernel.Boot:1982
      Tonyu.globals.$WebPage=new Tonyu.classes.kernel.WebPage;
      //$LASTPOS=62002009;//kernel.Boot:2009
      Tonyu.globals.$Navigator=new Tonyu.classes.kernel.Navigator;
      //$LASTPOS=62002040;//kernel.Boot:2040
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=62002065;//kernel.Boot:2065
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
      //$LASTPOS=62002090;//kernel.Boot:2090
      _this.debugCnt=50;
      //$LASTPOS=62002108;//kernel.Boot:2108
      _this.newLimit=1000;
    },
    fiber$initPeripherals :function _trc_Boot_f_initPeripherals(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=62001506;//kernel.Boot:1506
      Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
      //$LASTPOS=62001541;//kernel.Boot:1541
      Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
      //$LASTPOS=62001582;//kernel.Boot:1582
      Tonyu.globals.$ObjectPool=new Tonyu.classes.kernel.ObjectPool;
      //$LASTPOS=62001615;//kernel.Boot:1615
      Tonyu.globals.$pat_fruits=30;
      //$LASTPOS=62001636;//kernel.Boot:1636
      Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
      //$LASTPOS=62001657;//kernel.Boot:1657
      Tonyu.globals.$Math=Math;
      //$LASTPOS=62001674;//kernel.Boot:1674
      Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=62001788;//kernel.Boot:1788
      Tonyu.globals.$consolePrintY=465-15;
      //$LASTPOS=62001816;//kernel.Boot:1816
      Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=62001960;//kernel.Boot:1960
      _this.initFPSParams();
      //$LASTPOS=62001982;//kernel.Boot:1982
      Tonyu.globals.$WebPage=new Tonyu.classes.kernel.WebPage;
      //$LASTPOS=62002009;//kernel.Boot:2009
      Tonyu.globals.$Navigator=new Tonyu.classes.kernel.Navigator;
      //$LASTPOS=62002040;//kernel.Boot:2040
      Tonyu.globals.$mouseX=Tonyu.globals.$mouseX||0;
      //$LASTPOS=62002065;//kernel.Boot:2065
      Tonyu.globals.$mouseY=Tonyu.globals.$mouseY||0;
      //$LASTPOS=62002090;//kernel.Boot:2090
      _this.debugCnt=50;
      //$LASTPOS=62002108;//kernel.Boot:2108
      _this.newLimit=1000;
      
      _thread.retVal=_this;return;
    },
    initLayers :function _trc_Boot_initLayers() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62002148;//kernel.Boot:2148
      Tonyu.globals.$mainLayer=Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=62002188;//kernel.Boot:2188
      Tonyu.globals.$frontLayer=Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=62002234;//kernel.Boot:2234
      Tonyu.globals.$backLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=62002265;//kernel.Boot:2265
      Tonyu.globals.$uiLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=62002294;//kernel.Boot:2294
      _this.cvj=$("canvas");
      //$LASTPOS=62002316;//kernel.Boot:2316
      Tonyu.globals.$screenWidth=465;
      //$LASTPOS=62002339;//kernel.Boot:2339
      Tonyu.globals.$screenHeight=465;
      //$LASTPOS=62002363;//kernel.Boot:2363
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.Screen({width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,layer: Tonyu.globals.$uiLayer});
      //$LASTPOS=62002446;//kernel.Boot:2446
      Tonyu.globals.$Screen.on("resize",(function anonymous_2467() {
        
        //$LASTPOS=62002479;//kernel.Boot:2479
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=62002516;//kernel.Boot:2516
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=62002555;//kernel.Boot:2555
        if (Tonyu.globals.$panel) {
          //$LASTPOS=62002580;//kernel.Boot:2580
          Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=62002638;//kernel.Boot:2638
          Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=62002676;//kernel.Boot:2676
          Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
          
        }
        //$LASTPOS=62002722;//kernel.Boot:2722
        if (Tonyu.globals.$consolePanel) {
          //$LASTPOS=62002754;//kernel.Boot:2754
          Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=62002819;//kernel.Boot:2819
          Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=62002864;//kernel.Boot:2864
          Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
          //$LASTPOS=62002910;//kernel.Boot:2910
          Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
          
        }
      }));
      //$LASTPOS=62002967;//kernel.Boot:2967
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$frontLayer);
      //$LASTPOS=62003003;//kernel.Boot:3003
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=62003038;//kernel.Boot:3038
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$backLayer);
      //$LASTPOS=62003073;//kernel.Boot:3073
      Tonyu.globals.$Screen.setBGColor("rgb(20,80,180)");
      //$LASTPOS=62003116;//kernel.Boot:3116
      Tonyu.globals.$Screen.selectLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=62003154;//kernel.Boot:3154
      Tonyu.globals.$rootLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=62003185;//kernel.Boot:3185
      Tonyu.globals.$uiScreen=new Tonyu.classes.kernel.Screen({canvas: $("canvas")[0],layer: Tonyu.globals.$rootLayer});
      //$LASTPOS=62003252;//kernel.Boot:3252
      Tonyu.globals.$uiScreen.setBGColor("#888");
      //$LASTPOS=62003287;//kernel.Boot:3287
      Tonyu.globals.$uiScreen.addLayer(Tonyu.globals.$uiLayer);
      //$LASTPOS=62003322;//kernel.Boot:3322
      Tonyu.globals.$layoutManager=new Tonyu.classes.kernel.UILayout({layer: Tonyu.globals.$uiLayer});
    },
    fiber$initLayers :function _trc_Boot_f_initLayers(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=62002148;//kernel.Boot:2148
      Tonyu.globals.$mainLayer=Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=62002188;//kernel.Boot:2188
      Tonyu.globals.$frontLayer=Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=62002234;//kernel.Boot:2234
      Tonyu.globals.$backLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=62002265;//kernel.Boot:2265
      Tonyu.globals.$uiLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=62002294;//kernel.Boot:2294
      _this.cvj=$("canvas");
      //$LASTPOS=62002316;//kernel.Boot:2316
      Tonyu.globals.$screenWidth=465;
      //$LASTPOS=62002339;//kernel.Boot:2339
      Tonyu.globals.$screenHeight=465;
      //$LASTPOS=62002363;//kernel.Boot:2363
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.Screen({width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,layer: Tonyu.globals.$uiLayer});
      //$LASTPOS=62002446;//kernel.Boot:2446
      Tonyu.globals.$Screen.on("resize",(function anonymous_2467() {
        
        //$LASTPOS=62002479;//kernel.Boot:2479
        Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
        //$LASTPOS=62002516;//kernel.Boot:2516
        Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
        //$LASTPOS=62002555;//kernel.Boot:2555
        if (Tonyu.globals.$panel) {
          //$LASTPOS=62002580;//kernel.Boot:2580
          Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=62002638;//kernel.Boot:2638
          Tonyu.globals.$panel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=62002676;//kernel.Boot:2676
          Tonyu.globals.$panel.y=Tonyu.globals.$screenHeight/2;
          
        }
        //$LASTPOS=62002722;//kernel.Boot:2722
        if (Tonyu.globals.$consolePanel) {
          //$LASTPOS=62002754;//kernel.Boot:2754
          Tonyu.globals.$consolePanel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=62002819;//kernel.Boot:2819
          Tonyu.globals.$consolePanel.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=62002864;//kernel.Boot:2864
          Tonyu.globals.$consolePanel.y=Tonyu.globals.$screenHeight/2;
          //$LASTPOS=62002910;//kernel.Boot:2910
          Tonyu.globals.$consolePrintY=Tonyu.globals.$screenHeight-15;
          
        }
      }));
      //$LASTPOS=62002967;//kernel.Boot:2967
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$frontLayer);
      //$LASTPOS=62003003;//kernel.Boot:3003
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=62003038;//kernel.Boot:3038
      Tonyu.globals.$Screen.addLayer(Tonyu.globals.$backLayer);
      //$LASTPOS=62003073;//kernel.Boot:3073
      Tonyu.globals.$Screen.setBGColor("rgb(20,80,180)");
      //$LASTPOS=62003116;//kernel.Boot:3116
      Tonyu.globals.$Screen.selectLayer(Tonyu.globals.$mainLayer);
      //$LASTPOS=62003154;//kernel.Boot:3154
      Tonyu.globals.$rootLayer=new Tonyu.classes.kernel.Sprites();
      //$LASTPOS=62003185;//kernel.Boot:3185
      Tonyu.globals.$uiScreen=new Tonyu.classes.kernel.Screen({canvas: $("canvas")[0],layer: Tonyu.globals.$rootLayer});
      //$LASTPOS=62003252;//kernel.Boot:3252
      Tonyu.globals.$uiScreen.setBGColor("#888");
      //$LASTPOS=62003287;//kernel.Boot:3287
      Tonyu.globals.$uiScreen.addLayer(Tonyu.globals.$uiLayer);
      //$LASTPOS=62003322;//kernel.Boot:3322
      Tonyu.globals.$layoutManager=new Tonyu.classes.kernel.UILayout({layer: Tonyu.globals.$uiLayer});
      
      _thread.retVal=_this;return;
    },
    debug :function _trc_Boot_debug() {
      "use strict";
      var _this=this;
      var a;
      
      //$LASTPOS=62003407;//kernel.Boot:3407
      if (! _this.debugCnt) {
        return _this;
      }
      //$LASTPOS=62003435;//kernel.Boot:3435
      _this.debugCnt--;
      //$LASTPOS=62003452;//kernel.Boot:3452
      a = Array.prototype.slice.call(arguments);
      
      //$LASTPOS=62003502;//kernel.Boot:3502
      a.unshift(_this.debugCnt);
      //$LASTPOS=62003528;//kernel.Boot:3528
      a.unshift("DEBUG");
      //$LASTPOS=62003553;//kernel.Boot:3553
      console.log.apply(console,a);
    },
    fiber$debug :function _trc_Boot_f_debug(_thread) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      
      //$LASTPOS=62003407;//kernel.Boot:3407
      if (! _this.debugCnt) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=62003435;//kernel.Boot:3435
      _this.debugCnt--;
      //$LASTPOS=62003452;//kernel.Boot:3452
      a = Array.prototype.slice.call(_arguments);
      
      //$LASTPOS=62003502;//kernel.Boot:3502
      a.unshift(_this.debugCnt);
      //$LASTPOS=62003528;//kernel.Boot:3528
      a.unshift("DEBUG");
      //$LASTPOS=62003553;//kernel.Boot:3553
      console.log.apply(console,a);
      
      _thread.retVal=_this;return;
    },
    loadPlugins :function _trc_Boot_loadPlugins() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62003894;//kernel.Boot:3894
      _this.progress("Loading plugins..");
      //$LASTPOS=62003930;//kernel.Boot:3930
      _this.runAsync((function anonymous_3939(r) {
        
        //$LASTPOS=62003955;//kernel.Boot:3955
        Tonyu.globals.$currentProject.loadPlugins(r);
      }));
      //$LASTPOS=62004000;//kernel.Boot:4000
      _this.progress("Loading plugins done");
    },
    fiber$loadPlugins :function _trc_Boot_f_loadPlugins(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot_ent_loadPlugins(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62003894;//kernel.Boot:3894
            _this.fiber$progress(_thread, "Loading plugins..");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=62003930;//kernel.Boot:3930
            _this.fiber$runAsync(_thread, (function anonymous_3939(r) {
              
              //$LASTPOS=62003955;//kernel.Boot:3955
              Tonyu.globals.$currentProject.loadPlugins(r);
            }));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=62004000;//kernel.Boot:4000
            _this.fiber$progress(_thread, "Loading plugins done");
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    loadImages :function _trc_Boot_loadImages() {
      "use strict";
      var _this=this;
      var rs;
      var r;
      var name;
      var val;
      var _it_535;
      
      //$LASTPOS=62004059;//kernel.Boot:4059
      _this.progress("Loading pats..");
      //$LASTPOS=62004092;//kernel.Boot:4092
      rs = Tonyu.globals.$currentProject.getResource();
      
      
      //$LASTPOS=62004147;//kernel.Boot:4147
      r=_this.runAsync((function anonymous_4158(succ) {
        
        //$LASTPOS=62004177;//kernel.Boot:4177
        ImageList.load(rs.images,succ,{baseDir: Tonyu.globals.$currentProject.getDir(),prj: Tonyu.globals.$currentProject});
      }));
      //$LASTPOS=62004336;//kernel.Boot:4336
      Tonyu.globals.$imageList=r[0];
      //$LASTPOS=62004394;//kernel.Boot:4394
      _it_535=Tonyu.iterator(r[0].names,2);
      while(_it_535.next()) {
        name=_it_535[0];
        val=_it_535[1];
        
        //$LASTPOS=62004438;//kernel.Boot:4438
        Tonyu.setGlobal(name,val);
        
      }
      //$LASTPOS=62004478;//kernel.Boot:4478
      _this.progress("Loading pats done.");
    },
    fiber$loadImages :function _trc_Boot_f_loadImages(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var rs;
      var r;
      var name;
      var val;
      var _it_535;
      
      
      _thread.enter(function _trc_Boot_ent_loadImages(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62004059;//kernel.Boot:4059
            _this.fiber$progress(_thread, "Loading pats..");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=62004092;//kernel.Boot:4092
            rs = Tonyu.globals.$currentProject.getResource();
            
            
            //$LASTPOS=62004147;//kernel.Boot:4147
            _this.fiber$runAsync(_thread, (function anonymous_4158(succ) {
              
              //$LASTPOS=62004177;//kernel.Boot:4177
              ImageList.load(rs.images,succ,{baseDir: Tonyu.globals.$currentProject.getDir(),prj: Tonyu.globals.$currentProject});
            }));
            __pc=2;return;
          case 2:
            r=_thread.retVal;
            
            //$LASTPOS=62004336;//kernel.Boot:4336
            Tonyu.globals.$imageList=r[0];
            //$LASTPOS=62004394;//kernel.Boot:4394
            _it_535=Tonyu.iterator(r[0].names,2);
            while(_it_535.next()) {
              name=_it_535[0];
              val=_it_535[1];
              
              //$LASTPOS=62004438;//kernel.Boot:4438
              Tonyu.setGlobal(name,val);
              
            }
            //$LASTPOS=62004478;//kernel.Boot:4478
            _this.fiber$progress(_thread, "Loading pats done.");
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    loadSounds :function _trc_Boot_loadSounds() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62004535;//kernel.Boot:4535
      _this.progress("Loading sounds...");
      //$LASTPOS=62004571;//kernel.Boot:4571
      _this.initT2MediaPlayer();
      //$LASTPOS=62004597;//kernel.Boot:4597
      _this.loadFromProject(Tonyu.globals.$currentProject);
      //$LASTPOS=62004636;//kernel.Boot:4636
      _this.progress("Loading sounds done.");
      //$LASTPOS=62004675;//kernel.Boot:4675
      _this.on("stop",(function anonymous_4685() {
        
        //$LASTPOS=62004697;//kernel.Boot:4697
        _this.allClearSoundData();
      }));
      //$LASTPOS=62004731;//kernel.Boot:4731
      Tonyu.globals.$sound=_this;
    },
    fiber$loadSounds :function _trc_Boot_f_loadSounds(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot_ent_loadSounds(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62004535;//kernel.Boot:4535
            _this.fiber$progress(_thread, "Loading sounds...");
            __pc=1;return;
          case 1:
            
            //$LASTPOS=62004571;//kernel.Boot:4571
            _this.fiber$initT2MediaPlayer(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=62004597;//kernel.Boot:4597
            _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=62004636;//kernel.Boot:4636
            _this.fiber$progress(_thread, "Loading sounds done.");
            __pc=4;return;
          case 4:
            
            //$LASTPOS=62004675;//kernel.Boot:4675
            _this.on("stop",(function anonymous_4685() {
              
              //$LASTPOS=62004697;//kernel.Boot:4697
              _this.allClearSoundData();
            }));
            //$LASTPOS=62004731;//kernel.Boot:4731
            Tonyu.globals.$sound=_this;
            _thread.exit(_this);return;
          }
        }
      });
    },
    createMainObject :function _trc_Boot_createMainObject() {
      "use strict";
      var _this=this;
      var o;
      var mainClassName;
      
      //$LASTPOS=62004777;//kernel.Boot:4777
      o = Tonyu.currentProject.getOptions();
      
      //$LASTPOS=62004823;//kernel.Boot:4823
      mainClassName = o.run.mainClass;
      
      //$LASTPOS=62004863;//kernel.Boot:4863
      _this.progress("MainClass= "+mainClassName);
      //$LASTPOS=62004907;//kernel.Boot:4907
      _this.mainClass=Tonyu.getClass(mainClassName);
      //$LASTPOS=62004953;//kernel.Boot:4953
      if (! _this.mainClass) {
        throw new Error(mainClassName+" というクラスはありません");
        
        
      }
      //$LASTPOS=62005041;//kernel.Boot:5041
      Tonyu.globals.$excludeFromAll=Tonyu.globals.$Screen.all();
      //$LASTPOS=62005077;//kernel.Boot:5077
      new _this.mainClass();
    },
    fiber$createMainObject :function _trc_Boot_f_createMainObject(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var o;
      var mainClassName;
      
      //$LASTPOS=62004777;//kernel.Boot:4777
      o = Tonyu.currentProject.getOptions();
      
      //$LASTPOS=62004823;//kernel.Boot:4823
      mainClassName = o.run.mainClass;
      
      
      _thread.enter(function _trc_Boot_ent_createMainObject(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62004863;//kernel.Boot:4863
            _this.fiber$progress(_thread, "MainClass= "+mainClassName);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=62004907;//kernel.Boot:4907
            _this.mainClass=Tonyu.getClass(mainClassName);
            //$LASTPOS=62004953;//kernel.Boot:4953
            if (! _this.mainClass) {
              throw new Error(mainClassName+" というクラスはありません");
              
              
            }
            //$LASTPOS=62005041;//kernel.Boot:5041
            Tonyu.globals.$excludeFromAll=Tonyu.globals.$Screen.all();
            //$LASTPOS=62005077;//kernel.Boot:5077
            new _this.mainClass();
            _thread.exit(_this);return;
          }
        }
      });
    },
    loadPage :function _trc_Boot_loadPage(page,arg) {
      "use strict";
      var _this=this;
      var a;
      
      //$LASTPOS=62005125;//kernel.Boot:5125
      a = Tonyu.globals.$Screen.all();
      
      //$LASTPOS=62005151;//kernel.Boot:5151
      a=a.find((function anonymous_5160(e) {
        
        return ! Tonyu.globals.$excludeFromAll.contains(e);
      }));
      //$LASTPOS=62005212;//kernel.Boot:5212
      a.die();
      //$LASTPOS=62005226;//kernel.Boot:5226
      new page(arg);
    },
    stop :function _trc_Boot_stop() {
      "use strict";
      var _this=this;
      var res;
      var evt;
      var r;
      
      //$LASTPOS=62005260;//kernel.Boot:5260
      res = new $.Deferred();
      
      //$LASTPOS=62005291;//kernel.Boot:5291
      evt = {die: (function anonymous_5315() {
        
        //$LASTPOS=62005331;//kernel.Boot:5331
        _this.die();
        //$LASTPOS=62005351;//kernel.Boot:5351
        res.resolve();
      }),preventDefault: (function anonymous_5403() {
        
        //$LASTPOS=62005405;//kernel.Boot:5405
        evt.defaultPrevented=true;
      })};
      
      //$LASTPOS=62005446;//kernel.Boot:5446
      r = _this.fireEvent("stop",evt);
      
      //$LASTPOS=62005480;//kernel.Boot:5480
      if (! evt.defaultPrevented) {
        //$LASTPOS=62005517;//kernel.Boot:5517
        evt.die();
        //$LASTPOS=62005537;//kernel.Boot:5537
        res.resolve();
        
      }
      return res;
    },
    fiber$stop :function _trc_Boot_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var evt;
      var r;
      
      //$LASTPOS=62005260;//kernel.Boot:5260
      res = new $.Deferred();
      
      //$LASTPOS=62005291;//kernel.Boot:5291
      evt = {die: (function anonymous_5315() {
        
        //$LASTPOS=62005331;//kernel.Boot:5331
        _this.die();
        //$LASTPOS=62005351;//kernel.Boot:5351
        res.resolve();
      }),preventDefault: (function anonymous_5403() {
        
        //$LASTPOS=62005405;//kernel.Boot:5405
        evt.defaultPrevented=true;
      })};
      
      //$LASTPOS=62005446;//kernel.Boot:5446
      r = _this.fireEvent("stop",evt);
      
      //$LASTPOS=62005480;//kernel.Boot:5480
      if (! evt.defaultPrevented) {
        //$LASTPOS=62005517;//kernel.Boot:5517
        evt.die();
        //$LASTPOS=62005537;//kernel.Boot:5537
        res.resolve();
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    hide :function _trc_Boot_hide() {
      "use strict";
      var _this=this;
      
    },
    schedule :function _trc_Boot_schedule(obj,method,args) {
      "use strict";
      var _this=this;
      var s;
      var th;
      
      //$LASTPOS=62005628;//kernel.Boot:5628
      if (! method) {
        throw new Error("指定されたメソッドは定義されていません:"+method);
        
      }
      //$LASTPOS=62005694;//kernel.Boot:5694
      args=args||[];
      //$LASTPOS=62005714;//kernel.Boot:5714
      s = obj._scheduler||_this._scheduler;
      
      //$LASTPOS=62005753;//kernel.Boot:5753
      th = s.newThread(obj,method,args);
      
      //$LASTPOS=62005797;//kernel.Boot:5797
      obj.setThreadGroup(_this);
      //$LASTPOS=62005828;//kernel.Boot:5828
      th.setThreadGroup(obj);
      return th;
    },
    fiber$schedule :function _trc_Boot_f_schedule(_thread,obj,method,args) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      var th;
      
      //$LASTPOS=62005628;//kernel.Boot:5628
      if (! method) {
        throw new Error("指定されたメソッドは定義されていません:"+method);
        
      }
      //$LASTPOS=62005694;//kernel.Boot:5694
      args=args||[];
      //$LASTPOS=62005714;//kernel.Boot:5714
      s = obj._scheduler||_this._scheduler;
      
      //$LASTPOS=62005753;//kernel.Boot:5753
      th = s.newThread(obj,method,args);
      
      //$LASTPOS=62005797;//kernel.Boot:5797
      obj.setThreadGroup(_this);
      //$LASTPOS=62005828;//kernel.Boot:5828
      th.setThreadGroup(obj);
      _thread.retVal=th;return;
      
      
      _thread.retVal=_this;return;
    },
    progress :function _trc_Boot_progress(m) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62005892;//kernel.Boot:5892
      if (typeof  SplashScreen=="undefined") {
        return _this;
      }
      //$LASTPOS=62005943;//kernel.Boot:5943
      if (m) {
        //$LASTPOS=62005961;//kernel.Boot:5961
        console.log.apply(console,arguments);
        //$LASTPOS=62006008;//kernel.Boot:6008
        SplashScreen.progress(m);
        
      } else {
        //$LASTPOS=62006046;//kernel.Boot:6046
        SplashScreen.hide();
      }
    },
    fiber$progress :function _trc_Boot_f_progress(_thread,m) {
      "use strict";
      var _this=this;
      var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=62005892;//kernel.Boot:5892
      if (typeof  SplashScreen=="undefined") {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=62005943;//kernel.Boot:5943
      if (m) {
        //$LASTPOS=62005961;//kernel.Boot:5961
        console.log.apply(console,_arguments);
        //$LASTPOS=62006008;//kernel.Boot:6008
        SplashScreen.progress(m);
        
      } else {
        //$LASTPOS=62006046;//kernel.Boot:6046
        SplashScreen.hide();
      }
      
      _thread.retVal=_this;return;
    },
    progressNoLog :function _trc_Boot_progressNoLog(m) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62006096;//kernel.Boot:6096
      if (typeof  SplashScreen=="undefined") {
        return _this;
      }
      //$LASTPOS=62006147;//kernel.Boot:6147
      if (m) {
        //$LASTPOS=62006165;//kernel.Boot:6165
        SplashScreen.progress(m);
        
      } else {
        //$LASTPOS=62006203;//kernel.Boot:6203
        SplashScreen.hide();
      }
    },
    fiber$progressNoLog :function _trc_Boot_f_progressNoLog(_thread,m) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=62006096;//kernel.Boot:6096
      if (typeof  SplashScreen=="undefined") {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=62006147;//kernel.Boot:6147
      if (m) {
        //$LASTPOS=62006165;//kernel.Boot:6165
        SplashScreen.progress(m);
        
      } else {
        //$LASTPOS=62006203;//kernel.Boot:6203
        SplashScreen.hide();
      }
      
      _thread.retVal=_this;return;
    },
    mainLoop :function _trc_Boot_mainLoop() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62006249;//kernel.Boot:6249
      Tonyu.globals.$frameCount=0;
      //$LASTPOS=62006269;//kernel.Boot:6269
      Tonyu.globals.$drawnFrameCount=0;
      //$LASTPOS=62006294;//kernel.Boot:6294
      while (true) {
        //$LASTPOS=62006315;//kernel.Boot:6315
        if (_this._useRAF) {
          //$LASTPOS=62006328;//kernel.Boot:6328
          _this.loopRAF();
        } else {
          //$LASTPOS=62006350;//kernel.Boot:6350
          _this.loopTimer();
        }
        //$LASTPOS=62006372;//kernel.Boot:6372
        _this.measureFps();
        //$LASTPOS=62006392;//kernel.Boot:6392
        _this.handlePause();
        //$LASTPOS=62006416;//kernel.Boot:6416
        Tonyu.globals.$drawnFrameCount++;
        
      }
    },
    fiber$mainLoop :function _trc_Boot_f_mainLoop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=62006249;//kernel.Boot:6249
      Tonyu.globals.$frameCount=0;
      //$LASTPOS=62006269;//kernel.Boot:6269
      Tonyu.globals.$drawnFrameCount=0;
      
      _thread.enter(function _trc_Boot_ent_mainLoop(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62006294;//kernel.Boot:6294
          case 1:
            //$LASTPOS=62006315;//kernel.Boot:6315
            if (!(_this._useRAF)) { __pc=3     ; break; }
            //$LASTPOS=62006328;//kernel.Boot:6328
            _this.fiber$loopRAF(_thread);
            __pc=2;return;
          case 2:
            
            __pc=5     ;break;
          case 3     :
            //$LASTPOS=62006350;//kernel.Boot:6350
            _this.fiber$loopTimer(_thread);
            __pc=4;return;
          case 4:
            
          case 5     :
            
            //$LASTPOS=62006372;//kernel.Boot:6372
            _this.measureFps();
            //$LASTPOS=62006392;//kernel.Boot:6392
            _this.fiber$handlePause(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=62006416;//kernel.Boot:6416
            Tonyu.globals.$drawnFrameCount++;
            __pc=1;break;
          case 7     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    loopRAF :function _trc_Boot_loopRAF() {
      "use strict";
      var _this=this;
      var nowTime;
      var frameTime;
      var moves;
      var bufferTime;
      
      //$LASTPOS=62006465;//kernel.Boot:6465
      nowTime = _this.now();
      
      //$LASTPOS=62006506;//kernel.Boot:6506
      frameTime = 1000/_this._fps;
      
      //$LASTPOS=62006550;//kernel.Boot:6550
      moves = 0;
      
      
      //$LASTPOS=62006629;//kernel.Boot:6629
      _this.subTime=_this.trunc(nowTime-_this.rafProcNowTime);
      //$LASTPOS=62006677;//kernel.Boot:6677
      _this.procCnt=_this.subTime/frameTime;
      //$LASTPOS=62006729;//kernel.Boot:6729
      bufferTime=(0.5*_this._fps/60);
      //$LASTPOS=62006822;//kernel.Boot:6822
      if (_this.procCnt>=1-bufferTime&&_this.procCnt<=1+bufferTime) {
        //$LASTPOS=62006882;//kernel.Boot:6882
        _this.procCnt=1;
      }
      //$LASTPOS=62006902;//kernel.Boot:6902
      _this.procCnt=_this.floor(_this.procCnt);
      //$LASTPOS=62006933;//kernel.Boot:6933
      if (_this.procCnt>_this.maxFrameSkip) {
        //$LASTPOS=62006972;//kernel.Boot:6972
        _this.procCnt=_this.maxFrameSkip;
        //$LASTPOS=62007005;//kernel.Boot:7005
        _this.rafProcNowTime=nowTime;
        
      } else {
        //$LASTPOS=62007054;//kernel.Boot:7054
        _this.rafProcNowTime+=_this.procCnt*frameTime;
        
      }
      //$LASTPOS=62007151;//kernel.Boot:7151
      while (moves<_this.procCnt) {
        //$LASTPOS=62007177;//kernel.Boot:7177
        _this.moveFrame();
        //$LASTPOS=62007193;//kernel.Boot:7193
        moves++;
        //$LASTPOS=62007208;//kernel.Boot:7208
        if (moves<_this.procCnt) {
          //$LASTPOS=62007227;//kernel.Boot:7227
          _this.afterDraw(false);
        }
        
      }
      //$LASTPOS=62007280;//kernel.Boot:7280
      if (moves>0) {
        //$LASTPOS=62007306;//kernel.Boot:7306
        _this.drawFrame();
        //$LASTPOS=62007328;//kernel.Boot:7328
        _this.afterDraw(true);
        
      }
      //$LASTPOS=62007385;//kernel.Boot:7385
      _this.waitRAF();
    },
    fiber$loopRAF :function _trc_Boot_f_loopRAF(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var nowTime;
      var frameTime;
      var moves;
      var bufferTime;
      
      //$LASTPOS=62006465;//kernel.Boot:6465
      nowTime = _this.now();
      
      //$LASTPOS=62006506;//kernel.Boot:6506
      frameTime = 1000/_this._fps;
      
      //$LASTPOS=62006550;//kernel.Boot:6550
      moves = 0;
      
      
      //$LASTPOS=62006629;//kernel.Boot:6629
      _this.subTime=_this.trunc(nowTime-_this.rafProcNowTime);
      //$LASTPOS=62006677;//kernel.Boot:6677
      _this.procCnt=_this.subTime/frameTime;
      //$LASTPOS=62006729;//kernel.Boot:6729
      bufferTime=(0.5*_this._fps/60);
      //$LASTPOS=62006822;//kernel.Boot:6822
      if (_this.procCnt>=1-bufferTime&&_this.procCnt<=1+bufferTime) {
        //$LASTPOS=62006882;//kernel.Boot:6882
        _this.procCnt=1;
      }
      //$LASTPOS=62006902;//kernel.Boot:6902
      _this.procCnt=_this.floor(_this.procCnt);
      //$LASTPOS=62006933;//kernel.Boot:6933
      if (_this.procCnt>_this.maxFrameSkip) {
        //$LASTPOS=62006972;//kernel.Boot:6972
        _this.procCnt=_this.maxFrameSkip;
        //$LASTPOS=62007005;//kernel.Boot:7005
        _this.rafProcNowTime=nowTime;
        
      } else {
        //$LASTPOS=62007054;//kernel.Boot:7054
        _this.rafProcNowTime+=_this.procCnt*frameTime;
        
      }
      
      _thread.enter(function _trc_Boot_ent_loopRAF(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62007151;//kernel.Boot:7151
          case 1:
            if (!(moves<_this.procCnt)) { __pc=2     ; break; }
            {
              //$LASTPOS=62007177;//kernel.Boot:7177
              _this.moveFrame();
              //$LASTPOS=62007193;//kernel.Boot:7193
              moves++;
              //$LASTPOS=62007208;//kernel.Boot:7208
              if (moves<_this.procCnt) {
                //$LASTPOS=62007227;//kernel.Boot:7227
                _this.afterDraw(false);
              }
            }
            __pc=1;break;
          case 2     :
            
            //$LASTPOS=62007280;//kernel.Boot:7280
            if (moves>0) {
              //$LASTPOS=62007306;//kernel.Boot:7306
              _this.drawFrame();
              //$LASTPOS=62007328;//kernel.Boot:7328
              _this.afterDraw(true);
              
            }
            //$LASTPOS=62007385;//kernel.Boot:7385
            _this.fiber$waitRAF(_thread);
            __pc=3;return;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    waitRAF :function _trc_Boot_waitRAF() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62007824;//kernel.Boot:7824
      _this.waitFor(Tonyu.animationFrame());
    },
    fiber$waitRAF :function _trc_Boot_f_waitRAF(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot_ent_waitRAF(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62007824;//kernel.Boot:7824
            _this.fiber$waitFor(_thread, Tonyu.animationFrame());
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    loopTimer :function _trc_Boot_loopTimer() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62008770;//kernel.Boot:8770
      _this.moveFrame();
      //$LASTPOS=62008788;//kernel.Boot:8788
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=62008816;//kernel.Boot:8816
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=62008870;//kernel.Boot:8870
        _this.doDraw=true;
        //$LASTPOS=62008892;//kernel.Boot:8892
        _this.resetDeadLine();
        
      }
      //$LASTPOS=62008921;//kernel.Boot:8921
      if (_this.doDraw) {
        //$LASTPOS=62008958;//kernel.Boot:8958
        _this.drawFrame();
        //$LASTPOS=62008980;//kernel.Boot:8980
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=62009019;//kernel.Boot:9019
        _this.frameSkipped++;
        
      }
      //$LASTPOS=62009047;//kernel.Boot:9047
      _this.afterDraw(_this.doDraw);
      //$LASTPOS=62009071;//kernel.Boot:9071
      _this.waitFrame();
    },
    fiber$loopTimer :function _trc_Boot_f_loopTimer(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=62008770;//kernel.Boot:8770
      _this.moveFrame();
      //$LASTPOS=62008788;//kernel.Boot:8788
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=62008816;//kernel.Boot:8816
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=62008870;//kernel.Boot:8870
        _this.doDraw=true;
        //$LASTPOS=62008892;//kernel.Boot:8892
        _this.resetDeadLine();
        
      }
      //$LASTPOS=62008921;//kernel.Boot:8921
      if (_this.doDraw) {
        //$LASTPOS=62008958;//kernel.Boot:8958
        _this.drawFrame();
        //$LASTPOS=62008980;//kernel.Boot:8980
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=62009019;//kernel.Boot:9019
        _this.frameSkipped++;
        
      }
      //$LASTPOS=62009047;//kernel.Boot:9047
      _this.afterDraw(_this.doDraw);
      
      _thread.enter(function _trc_Boot_ent_loopTimer(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62009071;//kernel.Boot:9071
            _this.fiber$waitFrame(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    handlePause :function _trc_Boot_handlePause() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62009119;//kernel.Boot:9119
      while (_this.paused) {
        //$LASTPOS=62009144;//kernel.Boot:9144
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=62009180;//kernel.Boot:9180
        if (! _this.paused) {
          //$LASTPOS=62009193;//kernel.Boot:9193
          _this.resetDeadLine();
        }
        
      }
    },
    fiber$handlePause :function _trc_Boot_f_handlePause(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Boot_ent_handlePause(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62009119;//kernel.Boot:9119
          case 1:
            if (!(_this.paused)) { __pc=3     ; break; }
            //$LASTPOS=62009144;//kernel.Boot:9144
            _this.fiber$waitFor(_thread, Tonyu.timeout(1));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=62009180;//kernel.Boot:9180
            if (! _this.paused) {
              //$LASTPOS=62009193;//kernel.Boot:9193
              _this.resetDeadLine();
            }
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    drawFrame :function _trc_Boot_drawFrame() {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=62009248;//kernel.Boot:9248
      s = _this.now();
      
      //$LASTPOS=62009266;//kernel.Boot:9266
      Tonyu.globals.$uiScreen.drawLayers();
      //$LASTPOS=62009295;//kernel.Boot:9295
      _this.drawTime=_this.now()-s;
      //$LASTPOS=62009318;//kernel.Boot:9318
      _this.fps_fpsCnt++;
    },
    moveFrame :function _trc_Boot_moveFrame() {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=62009647;//kernel.Boot:9647
      s = _this.now();
      
      //$LASTPOS=62009665;//kernel.Boot:9665
      Tonyu.globals.$_printCount=0;
      //$LASTPOS=62009686;//kernel.Boot:9686
      Tonyu.resetLoopCheck();
      //$LASTPOS=62009715;//kernel.Boot:9715
      if (_this.newLimit) {
        //$LASTPOS=62009729;//kernel.Boot:9729
        _this.newLimitCount=_this.newLimit;
      }
      //$LASTPOS=62009787;//kernel.Boot:9787
      _this._scheduler.stepsAll();
      //$LASTPOS=62009844;//kernel.Boot:9844
      Tonyu.globals.$Keys.update();
      //$LASTPOS=62009894;//kernel.Boot:9894
      Tonyu.globals.$InputDevice.update();
      //$LASTPOS=62009951;//kernel.Boot:9951
      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
      //$LASTPOS=62009984;//kernel.Boot:9984
      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
      //$LASTPOS=62010019;//kernel.Boot:10019
      _this.moveTime=_this.now()-s;
      //$LASTPOS=62010042;//kernel.Boot:10042
      _this.fps_rpsCnt++;
      //$LASTPOS=62010062;//kernel.Boot:10062
      Tonyu.globals.$frameCount=_this.fps_rpsCnt;
    },
    afterDraw :function _trc_Boot_afterDraw(drawn) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62010203;//kernel.Boot:10203
      Tonyu.globals.$Sprites.checkHit();
      //$LASTPOS=62010258;//kernel.Boot:10258
      Tonyu.globals.$Sprites.removeOneframes(drawn);
    },
    initFPSParams :function _trc_Boot_initFPSParams() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62010374;//kernel.Boot:10374
      _this._fps=30;
      //$LASTPOS=62010390;//kernel.Boot:10390
      _this.maxFrameSkip=5;
      //$LASTPOS=62010413;//kernel.Boot:10413
      _this.minFrameSkip=1;
      //$LASTPOS=62010463;//kernel.Boot:10463
      _this.frameCnt=0;
      //$LASTPOS=62010482;//kernel.Boot:10482
      _this.resetDeadLine();
      //$LASTPOS=62010504;//kernel.Boot:10504
      _this.lastMeasured=_this.now();
      //$LASTPOS=62010529;//kernel.Boot:10529
      _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
      //$LASTPOS=62010575;//kernel.Boot:10575
      _this.drawTime=5;
      //$LASTPOS=62010586;//kernel.Boot:10586
      _this.moveTime=5;
      //$LASTPOS=62010644;//kernel.Boot:10644
      _this._useRAF=true;
      //$LASTPOS=62010698;//kernel.Boot:10698
      _this.rafProcNowTime=_this.now();
    },
    now :function _trc_Boot_now() {
      "use strict";
      var _this=this;
      
      return new Date().getTime();
    },
    resetDeadLine :function _trc_Boot_resetDeadLine() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62010809;//kernel.Boot:10809
      _this.deadLine=_this.now()+1000/_this._fps;
      //$LASTPOS=62010840;//kernel.Boot:10840
      _this.frameSkipped=0;
    },
    waitFrame :function _trc_Boot_waitFrame() {
      "use strict";
      var _this=this;
      var wt;
      
      //$LASTPOS=62010884;//kernel.Boot:10884
      wt = _this.deadLine-_this.now();
      
      //$LASTPOS=62010912;//kernel.Boot:10912
      if (wt<1) {
        //$LASTPOS=62010933;//kernel.Boot:10933
        if (wt<- 1000) {
          //$LASTPOS=62010947;//kernel.Boot:10947
          _this.resetDeadLine();
        }
        //$LASTPOS=62010973;//kernel.Boot:10973
        wt=1;
        
      }
      //$LASTPOS=62010991;//kernel.Boot:10991
      wt=_this.floor(wt);
      //$LASTPOS=62011010;//kernel.Boot:11010
      _this.waitFor(Tonyu.timeout(wt));
      //$LASTPOS=62011043;//kernel.Boot:11043
      _this.deadLine+=1000/_this._fps;
    },
    fiber$waitFrame :function _trc_Boot_f_waitFrame(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var wt;
      
      //$LASTPOS=62010884;//kernel.Boot:10884
      wt = _this.deadLine-_this.now();
      
      //$LASTPOS=62010912;//kernel.Boot:10912
      if (wt<1) {
        //$LASTPOS=62010933;//kernel.Boot:10933
        if (wt<- 1000) {
          //$LASTPOS=62010947;//kernel.Boot:10947
          _this.resetDeadLine();
        }
        //$LASTPOS=62010973;//kernel.Boot:10973
        wt=1;
        
      }
      //$LASTPOS=62010991;//kernel.Boot:10991
      wt=_this.floor(wt);
      
      _thread.enter(function _trc_Boot_ent_waitFrame(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=62011010;//kernel.Boot:11010
            _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=62011043;//kernel.Boot:11043
            _this.deadLine+=1000/_this._fps;
            _thread.exit(_this);return;
          }
        }
      });
    },
    getFrameRate :function _trc_Boot_getFrameRate() {
      "use strict";
      var _this=this;
      
      return _this._fps;
    },
    setFrameRate :function _trc_Boot_setFrameRate(fps,maxFrameSkip) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62011327;//kernel.Boot:11327
      _this._fps=fps;
      //$LASTPOS=62011344;//kernel.Boot:11344
      if (typeof  maxFrameSkip!="number") {
        //$LASTPOS=62011379;//kernel.Boot:11379
        maxFrameSkip=5;
      }
      //$LASTPOS=62011400;//kernel.Boot:11400
      if (maxFrameSkip<=0) {
        //$LASTPOS=62011421;//kernel.Boot:11421
        maxFrameSkip=1;
      }
      //$LASTPOS=62011442;//kernel.Boot:11442
      _this.maxFrameSkip=maxFrameSkip;
      //$LASTPOS=62011481;//kernel.Boot:11481
      _this.resetDeadLine();
    },
    __getter__useRAF :function _trc_Boot___getter__useRAF() {
      "use strict";
      var _this=this;
      
      return _this._useRAF;
    },
    __setter__useRAF :function _trc_Boot___setter__useRAF(v) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=62011585;//kernel.Boot:11585
      if (v) {
        //$LASTPOS=62011603;//kernel.Boot:11603
        _this.rafProcNowTime=_this.now();
        
      } else {
        //$LASTPOS=62011648;//kernel.Boot:11648
        _this.resetDeadLine();
        
      }
      return _this._useRAF=v;
    },
    getMeasuredFps :function _trc_Boot_getMeasuredFps() {
      "use strict";
      var _this=this;
      
      return _this.fps_fps;
    },
    getMeasuredRps :function _trc_Boot_getMeasuredRps() {
      "use strict";
      var _this=this;
      
      return _this.fps_rps;
    },
    measureFps :function _trc_Boot_measureFps() {
      "use strict";
      var _this=this;
      var nowTime;
      
      //$LASTPOS=62011886;//kernel.Boot:11886
      nowTime = _this.now();
      
      //$LASTPOS=62011912;//kernel.Boot:11912
      if (nowTime>=_this.lastMeasured+1000) {
        //$LASTPOS=62011955;//kernel.Boot:11955
        _this.fps_fps=_this.fps_fpsCnt;
        //$LASTPOS=62011984;//kernel.Boot:11984
        _this.fps_rps=_this.fps_rpsCnt;
        //$LASTPOS=62012013;//kernel.Boot:12013
        _this.fps_fpsCnt=0;
        //$LASTPOS=62012036;//kernel.Boot:12036
        _this.fps_rpsCnt=0;
        //$LASTPOS=62012059;//kernel.Boot:12059
        _this.lastMeasured=nowTime;
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"timeStop":{"nowait":false},"update":{"nowait":false},"initEvents":{"nowait":false},"initPeripherals":{"nowait":false},"initLayers":{"nowait":false},"debug":{"nowait":false},"loadPlugins":{"nowait":false},"loadImages":{"nowait":false},"loadSounds":{"nowait":false},"createMainObject":{"nowait":false},"loadPage":{"nowait":true},"stop":{"nowait":false},"hide":{"nowait":true},"schedule":{"nowait":false},"progress":{"nowait":false},"progressNoLog":{"nowait":false},"mainLoop":{"nowait":false},"loopRAF":{"nowait":false},"waitRAF":{"nowait":false},"loopTimer":{"nowait":false},"handlePause":{"nowait":false},"drawFrame":{"nowait":true},"moveFrame":{"nowait":true},"afterDraw":{"nowait":true},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"__getter__useRAF":{"nowait":true},"__setter__useRAF":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}},"fields":{"eventTypes":{},"cvj":{},"debugCnt":{},"newLimit":{},"mainClass":{},"_useRAF":{},"_fps":{},"subTime":{},"rafProcNowTime":{},"procCnt":{},"maxFrameSkip":{},"doDraw":{},"deadLine":{},"frameSkipped":{},"paused":{},"drawTime":{},"fps_fpsCnt":{},"newLimitCount":{},"moveTime":{},"fps_rpsCnt":{},"minFrameSkip":{},"frameCnt":{},"lastMeasured":{},"fps_fps":{},"fps_rps":{}}}
});
Tonyu.klass.define({
  fullName: 'kernel.DxChar',
  shortName: 'DxChar',
  namespace: 'kernel',
  superclass: Tonyu.classes.kernel.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_DxChar_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_DxChar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    initialize :function _trc_DxChar_initialize(xx,yy,pp,ff,sz,rt,al) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=63000057;//kernel.DxChar:57
      Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
      //$LASTPOS=63000082;//kernel.DxChar:82
      _this.scaleX=1;
      //$LASTPOS=63000097;//kernel.DxChar:97
      if (sz) {
        //$LASTPOS=63000105;//kernel.DxChar:105
        _this.scaleX=sz;
      }
      //$LASTPOS=63000121;//kernel.DxChar:121
      _this.angle=0;
      //$LASTPOS=63000135;//kernel.DxChar:135
      if (rt) {
        //$LASTPOS=63000143;//kernel.DxChar:143
        _this.angle=rt;
      }
      //$LASTPOS=63000158;//kernel.DxChar:158
      _this.alpha=255;
      //$LASTPOS=63000174;//kernel.DxChar:174
      if (al) {
        //$LASTPOS=63000182;//kernel.DxChar:182
        _this.alpha=al;
      }
    },
    draw :function _trc_DxChar_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=63000212;//kernel.DxChar:212
      if (_this._isInvisible) {
        return _this;
      }
      //$LASTPOS=63000243;//kernel.DxChar:243
      _this.onDraw();
      //$LASTPOS=63000258;//kernel.DxChar:258
      _this.detectShape();
      //$LASTPOS=63000278;//kernel.DxChar:278
      _this.drawDxSprite(_this.x,_this.y,_this.p,_this.f,_this.zOrder,_this.angle,_this.alpha,_this.scaleX,_this.scaleY);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}},"fields":{"angle":{}}}
});

//# sourceMappingURL=concat.js.map