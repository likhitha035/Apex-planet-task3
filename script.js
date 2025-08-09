
        const grid = document.getElementById('card-grid');
        const addCardBtn = document.getElementById('add-card');
        const darkModeBtn = document.getElementById('dark-mode');
        const fetchJokeBtn = document.getElementById('fetch-joke');
        const colors = ['#6C5CE7', '#00B894', '#FD79A8', '#0984E3', '#FDCB6E'];
        const icons = ['🌟', '🎨', '🧩', '🎯', '🌈', '✨'];
  
        addCardBtn.addEventListener('click', () => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            
            const card = document.createElement('div');
            card.className = 'card';
            card.style.borderColor = randomColor;
            card.innerHTML = `
                <h2>${randomIcon} New Card ${grid.children.length}</h2>
                <p>This card was randomly generated!</p>
                <small>Color: ${randomColor}</small>
            `;
            
            grid.appendChild(card);
        });
        darkModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
        fetchJokeBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode');
                const data = await response.json();
                
                const card = document.createElement('div');
                card.className = 'card';
                card.style.borderColor = '#FDCB6E';
                
                if (data.type === 'twopart') {
                    card.innerHTML = `
                        <h2>😂 Joke Card</h2>
                        <p><strong>Setup:</strong> ${data.setup}</p>
                        <p><strong>Delivery:</strong> ${data.delivery}</p>
                    `;
                } else {
                    card.innerHTML = `
                        <h2>😂 Joke Card</h2>
                        <p>${data.joke}</p>
                    `;
                }
                
                grid.appendChild(card);
            } catch (error) {
                alert("Couldn't fetch a joke. Please try again!");
            }
        });
        grid.addEventListener('click', (e) => {
            if (e.target.classList.contains('card')) {
                if (confirm('Delete this card?')) {
                    e.target.remove();
                }
            }
        });