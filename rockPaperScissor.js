let score ={
            win : 0,
            Tie : 0,
            Loss : 0,
        };
        

        score  = JSON.parse(localStorage.getItem('score')) || score ;

       
       function pickComputerMove(){
        let num = Math.random();
        if(num >= 0 && num < (1/3)){
            return 'rock';
        }
        else if(num >= (1/3) && num < (2/3)){
            return 'paper';
        }
        else{
            return 'scissors';
        }
       }


       function playerMove(pMove){

        const  computerMove = pickComputerMove();
        let result = '';

        if(pMove === computerMove){
            score.Tie++;
            result = 'Tie';
        }
        else if(pMove === 'rock' && computerMove === 'paper' ||
        pMove === 'paper' && computerMove === 'scissors' ||
        pMove === 'scissors' && computerMove === 'rock' ){
             score.Loss++;
             result = 'Loss';
        }  
        else  {
            score.win++;
            result = 'Win';
        }   

        document.querySelector('.js-result').innerHTML=` You ${result}`;

        document.querySelector('.js-movesChosen').innerHTML=`
        You 
        <img src="../${pMove}.png"  class ="move-icon"
        alt="">
        <img src="../${computerMove}.png" class ="move-icon" alt="">
        Computer`;
          
        updateScore();
        saveScore();

     }
     function updateScore(){
        document.querySelector('.js-score').innerHTML=`
        Wins : ${score.win}, Losses : ${score.Loss}, Ties : ${score.Tie}`;
     }

    



    function resetScore(){
        score.win = 0;
        score.Loss = 0;
        score.Tie = 0;

        updateScore();
        saveScore();
     }
     document.querySelector('.reset-btn').
     addEventListener('click', () => {
        resetConfirmation();
     });


     function resetConfirmation(){
        const html = `
        <p>Are you sure you want to reset the score?</p>
        <button class="Yes-btn" onclick ="Yes()">Yes</button>
        <button class="No-btn" onclick ="No()">No</button>
        `;
        document.querySelector('.js-conformReset').innerHTML = html;
    } 
     
      
    function Yes(){
        resetScore();
         document.querySelector('.js-conformReset').innerHTML = '';
    }

    function No() {
        document.querySelector('.js-conformReset').innerHTML = '';
    }

 

     function saveScore(){
        localStorage.setItem('score', JSON.stringify(score));
     }


     let intervalId;
     let isAutoplaying = false;


     const autoplayELe=document.querySelector('.js-autoplay-btn');

     autoplayELe.addEventListener('click',() => {
        autoplay();
     });

     document.body.addEventListener('keydown',(event) =>{
        if(event.key === 'r'){
            playerMove('rock');
        }
        else if(event.key === 'p'){
            playerMove('paper');
        }
        else if(event.key === 's'){
            playerMove('scissors')
        }
        else if(event.key === 'a'){
            autoplay();
        }
        else if(event.key === 'Backspace'){
            resetScore();
        }
        

     });

    
     function autoplay(){
        if(!isAutoplaying){
            intervalId = setInterval(() =>{
                const pMove = pickComputerMove();
                playerMove(pMove);
            },1000);
            document.querySelector('.js-autoplay-btn').innerHTML = 'Stop play';
            isAutoplaying = true;
        }
        else{
            clearInterval(intervalId);
            document.querySelector('.js-autoplay-btn').innerHTML = 'Autoplay';
            isAutoplaying = false;
        }
     }