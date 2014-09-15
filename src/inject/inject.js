function getAllPosts() {	
	return [].slice.call(document.getElementsByClassName('userContentWrapper'));
}

function getPosterName(post) {
	try {
		return post.getElementsByTagName('h5')[0].getElementsByTagName('a')[0].text
	} catch(e) {		
		return "Not found";
	}
}

function getLikeBtn(post) {
	var allLinks = [].slice.call(post.getElementsByTagName('a'));
	var likes = allLinks.filter(function(l) { return l.text == 'Like' });
	var firstLike = likes[0]; //sometimes there's more than one, and we wouldn't want to reclick...	
	return firstLike;
}

friendsToLike = [	
		"Anya Sonrisa",		
		"Alon Mannor",
		"Agam Rafaeli",
		"Ofek Rafaeli",
		"Anat Rafaeli",
		"Sheizaf Rafaeli",		
		"Anat Prossner",
		"Noam Xomerfeldt",
		"Bubba Raskin"
];

function shouldLike(post) {
	var posterName = getPosterName(post);	
	var postByFriendToLike = (friendsToLike.indexOf(posterName) > -1 );
	if (postByFriendToLike) {
		console.log("Should like post by "+posterName);
	}	
	return postByFriendToLike;
}

function likeConditionally(post) { 
	//console.log("checking post by"+getPosterName(post));	
	var likeBtn = getLikeBtn(post); 
	if (shouldLike(post) && likeBtn) {		
		console.log("Liking post by "+getPosterName(post));
		
		//wait about two seconds to simulate a human
		var timeToWait = Math.floor(Math.random() * 1000)+2000;			
		setTimeout(function() { likeBtn.click() }, timeToWait);
	}	
}

function likeAllFriendsPosts() {	
	console.log("checking all friends posts");
	var allPosts = getAllPosts();
	allPosts.forEach(likeConditionally);
}

// function getAllLikeBtns() {
// 	links = document.getElementsByTagName('a'); 
// 	likeBtns = []; 
// 	for (var i=0; i<links.length; i++) {  var text = links[i].text; if (text=='Like') { likeBtns.push(links[i])} };
// 	return likeBtns;
// }

// function getLikeBtnPosterName(likeBtn) {
// 	var posterName = "";
// 	try {
// 		var fullPost = likeBtn.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
// 		posterName = fullPost.getElementsByTagName('h5')[0].getElementsByTagName('a')[0].text
// 	}
// 	catch(e){
// 		console.error(e);
// 		//some 'like' buttons don't have a poster name so just skipe those!
// 	}
// 	return (posterName || "");
// }

// friendsToLike = [
// 	"Amir Krause",
// 	"Uria Lin"
// ]

// function doConditionalClick(likeBtn) {
// 	var posterName = getLikeBtnPosterName(likeBtn);
// 	if (friendsToLike.indexOf(posterName) > -1) {
// 		likeBtn.click();
// 	}
// }

// function doAll(){
// 	var allLikeBtns = getAllLikeBtns();
// 	var firstLike = allLikeBtns[0];

// }

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading		
		console.log("inject.js - version 1");
		//likeAllFriendsPosts();
		setInterval(function() {console.log("In interval"); likeAllFriendsPosts()}, 3000);
		// ----------------------------------------------------------

	}
	}, 10);
});