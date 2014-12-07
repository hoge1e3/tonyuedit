requirejs(["FS","Util","NewProjectDialog","ScriptTagFS","UI","forkBlobs"],
        function (FS,Util,NPD,STF,UI,fb) {
	$("button.selDir").click(selDir);
	$("#diag").append($("<h1>").text("インポート先のフォルダを入力してください"));
	$("#diag").append( NPD.embed(FS.get("/Tonyu/Projects/"), confirm) );
	var user=Util.getQueryString("user");
    var project=Util.getQueryString("project");
    var forkFromExe=(user && project);
	if (forkFromExe) {
	    var url="http://tonyuexe.appspot.com";
	    if (location.href.match(/localhost/)) {
	        url="http://localhost:8887";
	    }
	    window.projectInfoIs=function (s){
	        $("#prog").val(s);
	    };
	    $("<script>").attr("src",url+"/exe/fork?user="+user+"&"+"project="+project).appendTo("head");
	}
    function mode(n) {
		$("#src").hide();
		$("#diag").hide();
		$("#confirm").hide();
		$("#complete").hide();
		$("#"+n).show();
	}
	function selDir() {
		mode("diag");
	}
	var dst;
	function confirm(dir) {
		dst=dir;
		var s=$("#prog").val();
		$("#files").html(s);
		mode("confirm");
		$("#confirm").empty();
		$("#confirm").append(UI("div",["button",{on:{click:run}},"インポート開始"]));
		var o=STF.toObj();
		for (var fn in o) {
			var f=dir.rel(fn);
			var ex=f.exists()?"上書":"新規";
			$("#confirm").append(UI("div","[", ex,"]", f.path()));
		}
	}
	function run() {
		var dir=dst;
		mode("complete");
		var o=STF.toObj();
		for (var fn in o) {
			var f=dir.rel(fn);
			f.text(o[fn]);
		}
		var warn=false;
		if (forkFromExe) {
		    warn=true;
		    fb(user,project,dir,{
		        placeHolder:$("#complete"),
		        success:complete
		    });
		} else {
		    complete();
		}
		function complete() {
	        $("#complete").empty();
	        $("#complete").append(UI("h1","インポート完了"));
	        $("#complete").append(UI("div",
	        		["a",{href:"project.html?dir="+dst.path()},dst.path()+"を開く"]
	        ));
	        if (warn) {
	            $("#complete").append(UI("div",
	                    "※画像などのデータが準備できるまで数分間かかる場合があります．",
	                    "実行できない場合は少し待ってからプロジェクトのページを再読み込みしてみてください．"
	           ));
	        }
		}
	}
});