var Index={
	init:function(){
		var that=this;
		$("#clickMe").on("click",function(){
			that.loadData();
		});

		$("#clickMe2").on("click",function(){
			that.addUser();
		});

		$("#clickMe3").on("click",function(){
			that.deleteUser();
		});

		$("#clickM4").on("click",function(){
			that.updateUser();
		});

		$("#userList").on("click",".item",function(){
			$(this).addClass("selected").siblings().removeClass("selected");
		});
		

	},

	//显示列表
	showList(data){
		var li='<li class="item" data-id="'+data._id+'" >';
			li+=data.name;
			li+='</li>';
		return li
	},

	//加载数据
	loadData:function(){
		$.ajax({
				url:"/users"
		}).done(function(data){
			
			if (data.length>0) {
				var lis='';
				for(var i=0;i<data.length;i++){
					lis+=Index.showList(data[i]);
				}				
				$("#userList").html(lis);
			}	

		});
	},

	//新增用户
	addUser(){
		var userName=$("#txtName").val().trim();
		if (!userName) {
			alert("请输入用户名");
			return;
		}
		

		$.ajax({
			url:"/users/add",
			type:"post",
			data:{userName:userName} }).done(function(data){
				if (data.result.ok) {
					var lis="";
					for(var i=0;i<data.ops.length;i++){
						lis+=Index.showList(data.ops[i]);
					}	
					$("#userList").append(lis); 
				}
				$("#txtName").val("");
			})

	},

	deleteUser(){

		var $delitem=$("#userList .item.selected");

		if ($delitem.length<=0) {
			alert("请选择要删除的数据");
			return;
		}

		var userId=$delitem.data("id");

		 $.ajax({
		 	url:"/users/"+userId,
		 	type:"delete"
		 }).done(function(data){
		 	 if (data.ok) {
		 	 	$delitem.remove();
		 	 } 
		 }); 
	},

	//更新用户
	updateUser(){

		var newName=$("#txtName").val().trim();
		if (!newName) {
			alert("请输入新用户名");
			return;
		}

		var $delitem=$("#userList .item.selected");

		if ($delitem.length<=0) {
			alert("请选择要修改的用户");
			return;
		}

		var userId=$delitem.data("id");

		 $.ajax({
		 	url:"/users/update",
		 	type:"put",
		 	data:{
		 		id:userId,
		 		name:newName,
		 		oldName:$delitem.text()
		 	}
		 }).done(function(data){
		 	 if (data.nModified) {
		 	 	 $delitem.text(newName);
		 	 }
		 }); 



	}

}