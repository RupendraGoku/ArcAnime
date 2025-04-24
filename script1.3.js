const characterData = [
  { 
    name: 'Charmeleon', 
    description: 'When it swings its burning tail, it raises the surrounding temperature to unbearably high levels.', 
    img: 'images/1.png' 
  },
  { 
    name: 'Blastoise', 
    description: 'It deliberately increases its body weight to withstand the recoil of its water jets. The jets from its cannons can blast holes through thick steel.', 
    img: 'images/2.png' 
  },
  { 
    name: 'Butterfree', 
    description: 'It loves the nectar of flowers and can be seen fluttering through meadows. Its wings are covered with toxic scales that repel enemies.', 
    img: 'images/3.png' 
  },
  { 
    name: 'Pikachu', 
    description: 'When it is angered, it can release powerful electric charges.', 
    img: 'images/4.png' 
  },
  { 
    name: 'Venonate', 
    description: 'Poison oozes from all over its fuzzy body.', 
    img: 'images/5.png' 
  },
  { 
    name: 'Meowth', 
    description: 'A feline Pokémon that loves shiny objects.', 
    img: 'images/6.png' 
  },
  { 
    name: 'Arcanine', 
    description: 'An ancient picture scroll shows that people were captivated by its beauty.', 
    img: 'images/7.png' 
  },
  { 
    name: 'Alakazam', 
    description: 'It has an incredibly high level of intelligence, with an IQ that exceeds 5,000.', 
    img: 'images/8.png' 
  },
  { 
    name: 'Machamp', 
    description: 'It punches with its four arms at blinding speed and throw 1,000 punches in just two seconds.', 
    img: 'images/9.png' 
  },
  { 
    name: 'Pidgeot', 
    description: 'This Pokémon flies at Mach 2 speed and uses its sharp talons to snatch prey from the ground.', 
    img: 'images/10.png' 
  },
  { 
    name: 'Clefairy', 
    description: 'On nights with a full moon, it is said they gather to dance joyfully in the moonlight.', 
    img: 'images/11.png' 
  },
  { 
    name: 'MewTwo', 
    description: 'Its DNA is almost the same as Mew’s, but its strength and psychic powers were artificially enhanced.', 
    img: 'images/13.png' 
  }
];


    const circle = document.getElementById('circle');
    const centerX = 200, centerY = 200, radius = 170;
    const angleStep = (2 * Math.PI) / characterData.length;
    var currentTheme = "light";

    characterData.forEach((char, index) => {
      const angle = index * angleStep;
      const x = centerX + radius * Math.cos(angle) - 25;
      const y = centerY + radius * Math.sin(angle) - 25;

      const img = document.createElement('img');
      img.src = char.img;
      img.className = 'char';
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.alt = char.name;
      img.dataset.name = char.name;
      img.dataset.description = char.description;

      img.addEventListener('click', () => showCharacter(char));
      circle.appendChild(img);
    });

    function toggleTheme() {
      const current = document.body.getAttribute('data-theme');
      document.body.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
      currentTheme = document.body.getAttribute('data-theme')
    }

    let currentRotation = 0;
    const clickSound = new Audio('sounds/pokemon.mp3');

    function rotateCircle() {
      document.querySelectorAll('.char').forEach(c => c.classList.add('glow'));
      setTimeout(() => {
        document.querySelectorAll('.char').forEach(c => c.classList.remove('glow'));
        currentRotation += 90;
        document.getElementById('circle-wrapper').style.transform = `rotate(${currentRotation}deg)`;
      }, 400);
    }

    function showCharacter(char) {
      const mainImg = document.getElementById('main-image');
      const charName = document.getElementById('char-name');
      const charDesc = document.getElementById('char-description');

      mainImg.src = char.img;
      mainImg.classList.add('silhouette');
      charName.textContent = 'Who?';
      charDesc.textContent = 'Guess…';

      setTimeout(() => {
        mainImg.classList.remove('silhouette');

        gsap.fromTo(mainImg, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" });

        gsap.to([charName, charDesc], {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => {
            charName.textContent = char.name;
            charDesc.textContent = char.description;
            gsap.to([charName, charDesc], {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out"
            });
          }
        });
      }, 2000);
    }

    // function startGuessingAnimation() {
    //   const mainImg = document.getElementById('main-image');
    //   const charName = document.getElementById('char-name');
    //   const charDesc = document.getElementById('char-description');
    //   let flickers = 10, delay = 80, count = 0;

    //   const interval = setInterval(() => {
    //     const rnd = characterData[Math.floor(Math.random() * characterData.length)];
    //     mainImg.src = rnd.img;
    //     charName.textContent = rnd.name;
    //     charDesc.textContent = rnd.description;
    //     gsap.fromTo(mainImg, { scale: 0.8, opacity: 0.2 }, { scale: 4, opacity: 0.2, duration: 0.2 });
    //     if (++count >= flickers) {
    //       clearInterval(interval);
    //       showCharacter(characterData[Math.floor(Math.random() * characterData.length)]);
    //     }
    //   }, delay);
    // }
    function startGuessingAnimation() {
      const mainImg = document.getElementById('main-image');
      const charName = document.getElementById('char-name');
      const charDesc = document.getElementById('char-description');
      let flickers = 10, delay = 80, count = 0;

      const interval = setInterval(() => {
        const rnd = characterData[Math.floor(Math.random() * characterData.length)];
        mainImg.src = rnd.img;
        charName.textContent = rnd.name;
        charDesc.textContent = rnd.description;
        if (currentTheme === 'light') {
          // gsap.fromTo(mainImg, { scale: 0.8, opacity: 1 }, { scale: 4, opacity: 1, duration: 0.2 });
          gsap.fromTo(mainImg,
            {
              scale: 0.8,
              filter: "brightness(0) grayscale(1)",
              opacity: 1
            },
            {
              scale: 4,
              opacity: 1,
              filter: "brightness(0) grayscale(1)",
              duration: 0.2
            })
        }
        if (currentTheme === 'dark') {
          gsap.fromTo(mainImg,
            {
              scale: 0.8,
              filter: "brightness(200) grayscale(10)",
              opacity: 1
            },
            {
              scale: 4,
              opacity: 1,
              filter: "brightness(200) grayscale(10)",
              duration: 0.2
            }
          );

        }

        if (++count >= flickers) {
          clearInterval(interval);
          const finalChar = characterData[Math.floor(Math.random() * characterData.length)];
          // showCharacter(characterData[Math.floor(Math.random() * characterData.length)]);
          showCharacter(finalChar);
          setTimeout(()=>{
          gsap.fromTo(mainImg,
            { scale: 0.8, opacity: 0.2 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.2,
              filter: "none",
              onComplete: () => {
                mainImg.style.filter = "none";
                mainImg.src = finalChar.img;
                charName.textContent = finalChar.name;
                charDesc.textContent = finalChar.description;
              }
            }
          );
          },2000)


        }
      }, delay);
    }

    document.getElementById('rotate-button').addEventListener('click', () => {
      clickSound.play();
      rotateCircle();
      startGuessingAnimation();
      const torch = document.getElementById('torch-overlay');
      torch.style.opacity = '0.5';
      setTimeout(() => torch.style.opacity = '0', 3000);
    });

    // ⏱ Shadow fade-in on first load
    window.addEventListener('load', () => {
      const mainImg = document.getElementById('main-image');
      const charName = document.getElementById('char-name');
      const charDesc = document.getElementById('char-description');

      setTimeout(() => {
        mainImg.classList.remove('silhouette');
        gsap.fromTo(mainImg, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" });
        gsap.fromTo([charName, charDesc], { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      }, 2000);
    });