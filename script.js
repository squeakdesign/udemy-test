const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

let apiQuotes=[];
//Show loading
function loading() {
    loader.hidden=false;
    quoteContainer.hidden=true;

}
//Hide loading
function complete() {
    quoteContainer.hidden=false;
    loader.hidden=true;

}


//show New Quote
function newQuote() {
loading();
// pick random quotes from apiQuotes array
const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//Check if author field is blank and replace it with 'Unknown'
if(!quote.author){
    authorText.textContent='Unknown';
}else{
    authorText.textContent=quote.author;
}
//Quote length to determine styling
if(quote.text.length>120){

    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}
//Set quote,Hide Loader
quoteText.textContent=quote.text;
complete();
}



//Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl='https://type.fit/api/quotes';

    try {
        
    const response=await fetch(apiUrl);
    apiQuotes=await response.json();
    newQuote();
    } catch (error) {
        //Catch Error Here
    }
}

//Tweet Quote
twitterBtn.addEventListener("click",tweetQuote);
function tweetQuote() {
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuotes();
