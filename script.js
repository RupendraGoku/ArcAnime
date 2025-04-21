const characterData = [
  { name: 'Charmeleon', description: 'When it swings its burning tail, the temperature around it rises higher and higher, tormenting its opponents.', img: 'images/1.png' },
  { name: 'Blastoise', description: 'It deliberately increases its body weight so it can withstand the recoil of the water jets it fires.', img: 'images/2.png' },
  { name: 'Butterfree', description: 'It loves the nectar of flowers and can locate flower patches that have even tiny amounts of pollen.', img: 'images/3.png' },
  { name: 'Pikachu', description: 'When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.', img: 'images/4.png' },
  { name: 'Venonate', description: 'Poison oozes from all over its body. It catches small bug Pokémon at night that are attracted by light', img: 'images/5.png' },
  { name: 'Meowth', description: 'A feline Pokémon that loves shiny objects.', img: 'images/6.png' },
  { name: 'Arcanine', description: 'An ancient picture scroll shows that people were captivated by its movement as it ran through prairies.', img: 'images/7.png' },
  { name: 'Alakazam', description: 'It has an incredibly high level of intelligence. Some say that Alakazam remembers everything that ever happens to it, from birth till death.', img: 'images/8.png' },
  { name: 'Machamp', description: 'It punches with its four arms at blinding speed. It can launch 1,000 punches in two seconds', img: 'images/9.png' },
  { name: 'Clefairy', description: 'On nights with a full moon, Clefairy gather from all over and dance. Bathing in moonlight makes them float.', img: 'images/11.png' },
  { name: 'Pidgeot', description: 'This Pokémon flies at Mach 2 speed, seeking prey. Its large talons are feared as wicked weapons.', img: 'images/10.png' },
  { name: 'MewTwo', description: 'Its DNA is almost the same as Mew’s. However, its size and disposition are vastly different.', img: 'images/13.png' }
];

const circle = document.getElementById('circle');
const centerX = 200;
const centerY = 200;
const radius = 170;
const angleStep = (2 * Math.PI) / characterData.length;

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
  img.dataset.fullimg = char.img.replace('50', '100');

  img.addEventListener('click', () => {
  const mainImg = document.getElementById('main-image');
  const charName = document.getElementById('char-name');
  const charDesc = document.getElementById('char-description');

  // Remove 'selected' class from all characters
  document.querySelectorAll('.char').forEach(el => el.classList.remove('selected'));
  
  // Add 'selected' class to the clicked one
  img.classList.add('selected');


  gsap.to([mainImg, charName, charDesc], {
    opacity: 0,
    y: -20,
    duration: 0.3,
    onComplete: () => {
      mainImg.src = char.img.replace('50', '100');
      charName.textContent = char.name;
      charDesc.textContent = char.description;

      gsap.to([mainImg, charName, charDesc], {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  });
});

  circle.appendChild(img);
});

// Ensure everything starts visible and in place
gsap.set(["#main-image", "#char-name", "#char-description"], { opacity: 1, y: 0 });

function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  document.body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
}