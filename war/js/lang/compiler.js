define(["Tonyu","ObjectMatcher", "TError"],
        function(Tonyu,ObjectMatcher, TError) {
    var cu={};
    Tonyu.Compiler=cu;
    var ScopeTypes={
            FIELD:"field", METHOD:"method", NATIVE:"native",//B
            LOCAL:"local", THVAR:"threadvar",
            PARAM:"param", GLOBAL:"global",
            CLASS:"class"
    };
    cu.ScopeTypes=ScopeTypes;
    var symSeq=1;//B
    function genSt(st, options) {//B
        var res={type:st};
        if (options) {
            for (var k in options) res[k]=options[k];
        }
        if (!res.name) res.name=genSym("_"+st+"_");
        return res;
    }
    cu.newScopeType=genSt;
    function stype(st) {//B
        return st ? st.type : null;
    }
    cu.getScopeType=stype;
    function newScope(s) {//B
        var f=function (){};
        f.prototype=s;
        return new f();
    }
    cu.newScope=newScope;
    function nc(o, mesg) {//B
        if (!o) throw mesg+" is null";
        return o;
    }
    cu.nullCheck=nc;
    function genSym(prefix) {//B
        return prefix+((symSeq++)+"").replace(/\./g,"");
    }
    cu.genSym=genSym;
    function annotation3(aobjs, node, aobj) {//B
        if (!node._id) {
            if (!aobjs._idseq) aobjs._idseq=0;
            node._id=++aobjs._idseq;
        }
        var res=aobjs[node._id];
        if (!res) res=aobjs[node._id]={node:node};
        if (aobj) {
            for (var i in aobj) res[i]=aobj[i];
        }
        return res;
    }
    cu.annotation=annotation3;
    function getSource(srcCont,node) {//B
        return srcCont.substring(node.pos,node.pos+node.len);
    }
    cu.getSource=getSource;
    function getMethod2(klass,name) {//B
        var res=null;
        getDependingClasses(klass).forEach(function (k) {
            if (res) return;
            res=k.decls.methods[name];
        });
        return res;
    }
    cu.getMethod=getMethod2;
    function getDependingClasses(klass) {//B
        var visited={};
        var res=[];
        function loop(k) {
            if (visited[k.fullName]) return;
            visited[k.fullName]=true;
            res.push(k);
            if (k.superclass) loop(k.superclass);
            if (k.includes) k.includes.forEach(loop);
        }
        loop(klass);
        return res;
    }
    cu.getDependingClasses=getDependingClasses;
    function getParams(method) {//B
        var res=[];
        if (!method.head) return res;
        if (method.head.setter) res.push(method.head.setter.value);
        var ps=method.head.params ? method.head.params.params : null;
        if (ps && !ps.forEach) throw new Error(method+" is not array ");
        if (ps) res=res.concat(ps);
        return res;
    }
    cu.getParams=getParams;
    return cu;

});