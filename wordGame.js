// please read Readme.md file for rule's and suggestion's


console.log("Hello JS world")

let guessWord = '';
let puzzleNumber = '';
let correctWord = '';
let correctPuzzleNumber = '';
let isLoading = false;
let countOfTimes = 0;


let checkBtn = document.getElementById('checkButton')
let inputEleAll = document.querySelectorAll('.input')   // these 3 lines for --> accessing html elements on JS to manipulate content.
let spinnerEl = document.getElementById('spinner')    
let wishTag = document.getElementById('wishTag')

spinnerEl.textContent=''


Array.from(inputEleAll).forEach((eachEle => {               // iterating over the input element to store each word like a string to compare guessword
    // console.log(eachEle.id)
    eachEle.addEventListener('keyup',function(e) {          // by using keyup event litsener it will apply when user press key and move finger up
        eachEle.value=e.target.value
        eachEle.setAttribute('class','input-style')
        console.log(eachEle.value)
        guessWord += eachEle.value                          // storing user each word by word
    })
}))

// for fetching data from web-server using async/await asynchronous function 

const fetchingData = async async => {
    isLoading = true
    if(isLoading) {
        spinnerEl.textContent='🌀'
    }
    let response = await fetch('https://words.dev-apis.com/word-of-the-day')        // network call to server for fetching data
    console.log(response)
    if (response.status === 200) {                                                  // checking status code of network call if it's success this part will excute.
        let data = await response.json()                                            // resolving json format data - basically servers maintain data on JSON format
        console.log(data)
        correctWord = data.word;                                                    // assigning data to our variable's to compare guessing word
        correctPuzzleNumber = data.puzzleNumber
        console.log(`correctword:- ${correctWord} & correctPuzzleNumber:- ${correctPuzzleNumber}`)
    }else {}
    spinnerEl.textContent = ''
}
fetchingData()                                                  // calling function to fetch data

checkBtn.addEventListener('click',function(e) {    
    countOfTimes += 1
    spinnerEl.textContent = '🌀'                                 // we are adding extra button to check user-entered word matches with guessword
    
    if (guessWord == correctWord) {
        console.log('Congratulations, Your win')
        window.alert('your won !')
        guessWord = ''
        wishTag.textContent = '***** Congratulation you won this game *****'        // wish-message to user 
        wishTag.setAttribute('class','wish-tag')                                    // adding class name to wish empty element 
    }else{
        window.alert(`You have more ${6-countOfTimes} attempts`)                    // counting user attempt's -
        console.log('Try again')
        guessWord = '';
    }
})
spinnerEl.textContent = ''
