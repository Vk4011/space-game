let move_speed = 3, gravity = 0.5;
let rocket = document.querySelector('.r');
let img = document.getElementById('rocket');
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3');




// Getting rocket element properties
let rocket_props = rocket.getBoundingClientRect();

// This method returns DOMRect -> top, right, bottom, left, x, y, width, and height
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.asteroid').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        rocket.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
    
        const audio = new Audio('./sounds effect/bgm.mp3');
        audio.play();
    
    function move(){
        if(game_state != 'Play') return;

        let asteroids = document.querySelectorAll('.asteroid');
        asteroids.forEach((element) => {
            let asteroid_props = element.getBoundingClientRect();
            rocket_props = rocket.getBoundingClientRect();

            if(asteroid_props.right <= 0){
                element.remove();
            }else{
                if(rocket_props.left < asteroid_props.left + asteroid_props.width && rocket_props.left + rocket_props.width > asteroid_props.left && rocket_props.top < asteroid_props.top + asteroid_props.height && rocket_props.top + rocket_props.height > asteroid_props.top){
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    audio.pause();
                    return;
                }else{
                    if(asteroid_props.right < rocket_props.left && asteroid_props.right + move_speed >= rocket_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        sound_point.play();
                    }
                    element.style.left = asteroid_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let rocket_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        rocket_dy = rocket_dy + gravity;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/rocket-1.png';
                rocket_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/rocket.png';
            }
        });

        if(rocket_props.top <= 0 || rocket_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        rocket.style.top = rocket_props.top + rocket_dy + 'px';
        rocket_props = rocket.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let asteroid_separation = 0;

    let asteroid_gap = 35;

    function create_asteroid(){
        if(game_state != 'Play') return;

        if(asteroid_separation > 115){
            asteroid_separation = 0;

            let asteroid_position = Math.floor(Math.random() * 43) + 8;
            let asteroid_inv = document.createElement('div');
            asteroid_inv.className = 'asteroid';
            asteroid_inv.style.top = asteroid_position - 70 + 'vh';
            asteroid_inv.style.left = '100vw';

            document.body.appendChild(asteroid_inv);
            let asteroid = document.createElement('div');
            asteroid.className = 'asteroid';
            asteroid.style.top = asteroid_position + asteroid_gap + 'vh';
            asteroid.style.left = '100vw';
            asteroid.increase_score = '1';

            document.body.appendChild(asteroid);
        }
        asteroid_separation++;
        requestAnimationFrame(create_asteroid);
    }
    requestAnimationFrame(create_asteroid);
}
