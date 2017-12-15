function init() {
    //var myMovie=getMovie();
    //getMovie();
    getMoviesListAndDrawList();

    db = window.sqlitePlugin.openDatabase({ name: 'films.db', location: 'default' },
        function (db) {
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS favourtie (id INTEGER PRIMARY KEY , original_title TEXT)');
            },

            function (error) {
                //alert('transaction error: ' + error.message);
            },

            function () {
                alert('transaction ok');
            });
        },

    function (error) {
        alert('Open database ERROR: ' + JSON.stringify(error));
    });
}

/*function getMovie(){

    var request=$.ajax({
        url:"https://api.themoviedb.org/3/movie/550?api_key=9e41b1b475eb7599926d10da7b5c626d",
        method:"GET"
    });

    request.done(function(result){
        //alert(result.original_title);

    });

    request.fail(function(jqXHR, textStatus){
        alert("Request failed: "+textStatus);
    });
}

function getMovie(){

    var theList=document.getElementByID('mylist');

    var request=$.ajax({
        url:"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9e41b1b475eb7599926d10da7b5c626d",
        method:"GET"
    });

    request.done(function(moviesList){
        //alert(moviesList.results[4].original._title);

        for (i=0;i<moviesList.results.length;i++) {
            theList.append("<li>"+moviesList.results[i].original_title+"</li>";
        }

        theList.listview("refresh");

    });

    request.fail(function(jqXHR, textStatus){
        alert("Request failed: "+textStatus);
    });
}*/

function getMoviesListAndDrawList(){
    var theList = $("#mylist");
    
    var request = $.ajax({
        url: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9e41b1b475eb7599926d10da7b5c626d",
        method: "GET"
    });

    request.done(function( moviesList ) {
        for (i=0;i<moviesList.results.length;i++){
            theList.append( "<li><a onclick='details("+moviesList.results[i].id+")'>" + moviesList.results[i].original_title + "</a></li>");
        }
            
    	theList.listview("refresh");
    });

    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });
}

function details(id){
    alert("OK!");
    $.mobile.navigate("#pageDetails", {info:"info goes here"});

    var list=$("#myListDetails");

    db.sqlBatch(['SELECT * FROM favourite WHERE id='+id],
    
    function(){
        console.log('Insert ok');
    },

    function(error){
        console.log('insert ERROR: '+ error.message);
    });

	var request = $.ajax({
        url: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9e41b1b475eb7599926d10da7b5c626d",
        method: "GET"
    });

    request.done(function( moviesList ) {
    	for (i=0;i<moviesList.results.length;i++){
	        if(moviesList.results[i].id=id){
	        	list.append("<li><h2>"+moviesList.results[i].original_title+"</h2></li>");
	        	list.append("<li><img src="+moviesList.results[i].poster_path+" width=\"50%\"></img></li>");
	        	list.append("<li><p>"+moviesList.results[i].overview+"</p></li>");
                /*if(favourtie){
                    list.append("<input class=\"fa fa-star checked\" onclick=\"removeFavourite("moviesList.results[i].id")\"></input");
                } else{
	        	  list.append("<input class=\"fa fa-star\" onclick=\"favourite("moviesList.results[i].id")\"></input");
                }*/
	        }
            
    	list.listview("refresh");
        }
    });
}

/*function favourite(id, title){
    db.sqlBatch([['INSERT INTO favourite VALUES (?, ?)', [ id, title]]],
    
    function(){
        console.log('Insert ok');
    },

    function(error){
        console.log('insert ERROR: '+ error.message);
    });
}

function removeFavourite(id){
    db.sqlBatch(['DELETE FROM favourtite WHERE id='+id],

    function(){
        console.log('delete OK');
    },

    function(error) {
        consolo.log('delete ERROR '+ error.message);
    });     
}*/
