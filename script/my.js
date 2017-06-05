
var select = {
	circle: document.getElementById("circle"),
	qContainer: document.getElementById("quoteContainer"),
	newQuoteBt: document.getElementById("links").getElementsByClassName("nextQuote")[0].children[0],
	twContainer: document.getElementById("links").getElementsByClassName("tweetContainer")[0].children[0]
};

/* rIndex => that will store the random number in the callback method,
   data => that will store the quotes which will get from API in the callback*/
var rIndex = 0,
    data = {};

/* Making the XMLHttpRequest object and setting its requests */
var xHttp = getXHttp();

getContent(xHttp);

/* Event Listeners =================== */
select.newQuoteBt.addEventListener("click", function () {
	return getMoreContent(xHttp);
});
/* Event Listeners Ends ============== */

function getContent(xHttp) {
	xHttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			rIndex = Math.floor(Math.random() * 5);
			data = JSON.parse(this.responseText)[rIndex];

			select.qContainer.getElementsByClassName("quoteContent")[0].innerHTML = data.content;
			select.qContainer.getElementsByClassName("quoteBy")[0].children[1].innerHTML = "AL-QURAN (" + data.ref + ")";

			setTimeout(function () {
				select.circle.style.top = "-40px";
				select.circle.style.left = "-40px";
				select.qContainer.children[0].style.color = "rgb(255,255,255)";
				setTimeout(function () {
					select.qContainer.children[1].style.color = "rgb(255,255,255)";
					select.qContainer.children[1].children[0].style.borderBottomColor = "rgba(255,255,255,.5)";
				}, 1500);
			}, 1000);
			makeTweetLink();
		}
	};
	xHttp.open("GET", "https://gist.githubusercontent.com/forwebtech/e2dae559345a90cbdd8b4754eb88725d/raw/f64362a802fca85338cc2ef00c18102325154097/quotes.json", "async");
	xHttp.send();
}

function getXHttp() {
	// code for modern browsers	// code for old IE browsers
	return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
}

function getMoreContent(xHttp) {

	select.qContainer.children[0].style.color = "rgba(255,255,255,0)";
	select.qContainer.children[1].style.color = "rgba(255,255,255,0)";
	setTimeout(function () {
		select.qContainer.children[1].children[0].style.borderBottomColor = "rgba(255,255,255,0)";
		select.circle.style.top = "1200px";
		select.circle.style.left = "800px";
	}, 700);

	setTimeout(function () {
		return getContent(xHttp);
	}, 3000);
}

function makeTweetLink() {
	var url = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=";
	url += '"' + select.qContainer.getElementsByClassName("quoteContent")[0].innerHTML + '" ';
	url += select.qContainer.getElementsByClassName("quoteBy")[0].children[1].innerHTML;
	select.twContainer.setAttribute("href", encodeURL(url));
}

function encodeURL(str) {

	var encodes = {
		'[': '%5b',
		']': '%5d',
		',': '%2c',
		'"': '%22',
		' ': '%20'
	};

	return str.replace(/[\[\],"\s]/g, function (match) {
		return encodes[match];
	});
}
