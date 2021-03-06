requirejs(["Auth","Util","exportAsScriptTags","requestFragment","Blob","Tonyu.Project","FS","WebSite"],
        function (Auth,Util,east,rf,Blob,TPR,FS,WebSite){
$(function () {
    var home=FS.get(WebSite.tonyuHome);
   var dir=Util.getQueryString("dir", "/Tonyu/Projects/1_Animation/");
   dir=FS.get(dir);
   var prj=TPR(dir,home.rel("Kernel/"));
   //var dirs=dir.split("/");
   //dirs.pop();
   var name=prj.getName(); //dirs.pop();
   var error=function () {
       var a=[];
       for (var i=0;i<arguments.length;i++) a[i]=arguments[i];
       alert("Error "+JSON.stringify(a));
   };
   $("#prjNameSpan").text(name);
   $("#prjName").val(name);
   function forked(title) {
       var pat=/^forked([0-9]*)_(.*)$/;
       var r=pat.exec(title);
       if (r) {
           var num=1+parseInt(r[1]);
           if (num!==num) num=2;
           return "forked"+num+"_"+r[2];
       } else {
           return "forked_"+title;
       }
   }
   Auth.assertLogin({success:function(res, ct) {
       $(".on-logged-out").hide();
       $(".on-logged-in").show();
       $("#prog").val(east(dir));
       $.ajax({ type:"get", //redirectTo:"tonyuexe",
           //TODO: urlchange!
           url: WebSite.serverTop+"/get-project-info",
           data:{pathInfo:"/get-project-info", project:name},
           success:function (res) {
               console.log("get-prj",res);
               var data=JSON.parse(res);
               var forkedFrom={};
               try {
                   forkedFrom=dir.rel("forkedFrom.json").obj();
               }catch(e){}
               if (!forkedFrom) forkedFrom={};

               if (data.license!="null") $("#license").val(data.license);
               else if (forkedFrom.license) $("#license").val(forkedFrom.license);

               if (data.title!="null") $("#prjTitle").val(data.title);
               else if (forkedFrom.title) $("#prjTitle").val(forked(forkedFrom.title));
               else $("#prjTitle").val(data.name);

               if (data.description!="null") $("#desc").val(data.description);
               else if (forkedFrom.description) $("#desc").val(
                       "Forked from: "+forkedFrom.user+"'s "+forkedFrom.title+"\n"+
                       "---- Fork元より ----\n"+
                       forkedFrom.description
               );

               $("#allowFork").attr("checked",data.allowFork!="false");
               $("#publishToList").attr("checked",data.publishToList!="false");
               var th=prj.getThumbnail();
               if (th) {
                   $("#thumbSize").text("("+th.length+"bytes)");
                   $("#thumbnail").val(th);
                   $("#thumbImg").attr("src",th);
               }
               $(".submit-wait").hide();
               var button=$("<button>").text("公開する").click(bClk);
               function bClk(e) {
                   //alert("bckl");
                   $(".submit-wait").show();
                   Blob.uploadToExe(prj, {success:afterUpBlob,error:error,progress:progress,
                       csrfToken:ct});
                   e.preventDefault();
                   return false;
               }
               function progress(cnt) {
                   console.log("progress",cnt);
                   $(".submit-wait").append("...");
               }
               function afterUpBlob() {
                   progress();
                   console.log("Comp");//alert("aft");
                   button.hide();
                   var data={pathInfo:"/upload-project",csrfToken:ct};
                   function setData() {
                       var t=$(this);
                       if (t.attr("type")=="checkbox") {
                           data[t.attr("name")]=t[0].checked;
                       } else {
                           data[t.attr("name")]=t.val();
                       }
                   }
                   $("#theForm input").each(setData);
                   $("#theForm select").each(setData);
                   $("#theForm textarea").each(setData);
                   console.log("upload-project data",data);
                   //TODO: urlchange!
                   $.ajax({type:"post", redirectTo:"tonyuexe",
                       url:WebSite.serverTop+"/upload-project",
                       data:data,
                       success:function (res) {
                           console.log("upload-prj",res);
                           res=JSON.parse(res);
                           $("#complete").show();
                           $("#url").attr("href",res.url);
                           $(".submit-wait").hide();
                       },error: error
                   });
               }
               $("#theForm").append(button);
           },
           error: error
       });
       $(".wait-loggin").hide();

   },showLoginLink: function () {
       $(".wait-loggin").hide();
       $(".on-logged-out").show();
   }});
});
});