import '@styles/styles';

const game = {
    gameWindow: document.querySelector('.game__window'),
    bird: document.querySelector('.bird'),
    modal: document.querySelector('.modal'),
    isGameOver: false,
    score: 0,
    bestScore: localStorage.getItem('best score') || 0,

    start() {
        this.closeModal();

        this.bird.style.top = '50%';
        this.physics();

        document.addEventListener('keydown', e => {
            if (e.code !== 'Space' || this.isGameOver) return false;
            this.jump();
        }) 
        document.addEventListener('click', () => {
            if (this.isGameOver) return false;
            this.jump();
        });

    },

    physics() {
        setInterval(() => {
            if (this.checkForGameOver()) return false;

            this.bird.style.top = `${this.bird.getBoundingClientRect().top - 75}px`;

            if (this.gameWindow.getBoundingClientRect().bottom === this.bird.getBoundingClientRect().bottom) {
                this.isGameOver = true;
            }
        }, 5);
        setInterval(() => {
            if (this.checkForGameOver()) return false;

            this.createPipes();
        }, 5000)
    },

    createPipes() {
        const pipes = document.createElement('div');
        const pipe = document.createElement('div');
        const reversePipe = document.createElement('div');
        const randTop = this.getRandomTop();

        pipes.classList.add('pipes');

        pipe.classList.add('pipe');
        reversePipe.classList.add('pipe', 'reverse');

        pipe.style.top = randTop + 'px';
        reversePipe.style.top = randTop - (600 + Math.round(Math.random() * (150 - 100) + 100)) + 'px';

        pipes.append(pipe, reversePipe);
        pipes.style.right = '-100%';
        this.gameWindow.append(pipes);
        setInterval(() => {

            if (this.checkForGameOver()) return false;

            if (this.bird.getBoundingClientRect().right === pipe.getBoundingClientRect().left && this.bird.getBoundingClientRect().bottom > pipe.getBoundingClientRect().top) {
                this.isGameOver = true;
            }

            if (this.bird.getBoundingClientRect().right === reversePipe.getBoundingClientRect().left && this.bird.getBoundingClientRect().top < reversePipe.getBoundingClientRect().bottom) {
                this.isGameOver = true;
            }

            if ((this.bird.getBoundingClientRect().bottom >= pipe.getBoundingClientRect().top) && ((this.bird.getBoundingClientRect().right >= pipe.getBoundingClientRect().left && this.bird.getBoundingClientRect().right < pipe.getBoundingClientRect().right) || (this.bird.getBoundingClientRect().left >= pipe.getBoundingClientRect().left && this.bird.getBoundingClientRect().left < pipe.getBoundingClientRect().right))) {
                this.isGameOver = true;
            }

            if ((this.bird.getBoundingClientRect().top <= reversePipe.getBoundingClientRect().bottom) && ((this.bird.getBoundingClientRect().right >= reversePipe.getBoundingClientRect().left && this.bird.getBoundingClientRect().right < reversePipe.getBoundingClientRect().right) || (this.bird.getBoundingClientRect().left >= reversePipe.getBoundingClientRect().left && this.bird.getBoundingClientRect().left < reversePipe.getBoundingClientRect().right))) {
                this.isGameOver = true;
            }

            if (this.bird.getBoundingClientRect().left === pipe.getBoundingClientRect().right) {
                this.score++;
                if (this.bestScore < this.score) {
                    this.bestScore = this.score;
                    localStorage.setItem('best score', this.bestScore);
                }
            }

            if (pipes.getBoundingClientRect().right < 0) {
                this.gameWindow.removeChild(pipes);
            }

            pipes.style.right = parseInt(pipes.style.right) + 1 + 'px';

        }, 20)
    },

    getRandomTop() {
        const min = this.gameWindow.getBoundingClientRect().top + 150;
        const max = this.gameWindow.getBoundingClientRect().bottom - 150;
        return Math.round(Math.random() * (max - min) + min);
    },

    jump() {
        this.bird.style.top = `${this.bird.getBoundingClientRect().top - 120}px`;
    },

    checkForGameOver() {
        if (this.isGameOver) {
            document.removeEventListener('click', this.jump);
            this.showModal();
            return true;
        }
    },

    showModal() {
        this.modal.style.display = 'flex';

        this.modal.querySelector('.score .score__current div').innerHTML = this.score;
        this.modal.querySelector('.score .score__best div').innerHTML = this.bestScore;
    },

    closeModal() {
        this.modal.style.display = 'none';
    }

}

game.start()
const restart = document.querySelector('button.restart');
restart.addEventListener('click', e => {
    e.preventDefault();
    game.start()
})