// script.js - Full app (animals separated from birds; added Birds + Months; removed Water Birds)
// MP3-first, TTS fallback


document.addEventListener('DOMContentLoaded', function () {
  console.log('script.js loaded (animals-updated-months)');
  function qs(id){ return document.getElementById(id); }
  function speak(text){
    if(!text) return;
    if('speechSynthesis' in window){
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      try { speechSynthesis.cancel(); speechSynthesis.speak(u); } catch(e){ alert(text); }
    } else alert(text);
  }
  function playAudio(path, fallback){
    if(!path){ speak(fallback); return; }
    try {
      var a = new Audio(path);
      var played = false;
      a.addEventListener('canplaythrough', function(){ if(!played){ played = true; a.play().catch(function(){ speak(fallback); }); } }, { once:true });
      a.addEventListener('error', function(){ if(!played) speak(fallback); });
      a.load();
      setTimeout(function(){ if(!played) a.play().catch(function(){ if(!played) speak(fallback); }); }, 300);
    } catch(e){ speak(fallback); }
  }

  // ---------------- DATA ----------------
  var ALPHABETS = [
    {letter:'A', key:'alpha_a', text:'A for Apple'},{letter:'B', key:'alpha_b', text:'B for Ball'},
    {letter:'C', key:'alpha_c', text:'C for Cat'},{letter:'D', key:'alpha_d', text:'D for Dog'},
    {letter:'E', key:'alpha_e', text:'E for Elephant'},{letter:'F', key:'alpha_f', text:'F for Fish'},
    {letter:'G', key:'alpha_g', text:'G for Goat'},{letter:'H', key:'alpha_h', text:'H for Hat'},
    {letter:'I', key:'alpha_i', text:'I for Ice'},{letter:'J', key:'alpha_j', text:'J for Juice'},
    {letter:'K', key:'alpha_k', text:'K for Kite'},{letter:'L', key:'alpha_l', text:'L for Lion'},
    {letter:'M', key:'alpha_m', text:'M for Monkey'},{letter:'N', key:'alpha_n', text:'N for Net'},
    {letter:'O', key:'alpha_o', text:'O for Orange'},{letter:'P', key:'alpha_p', text:'P for Parrot'},
    {letter:'Q', key:'alpha_q', text:'Q for Queen'},{letter:'R', key:'alpha_r', text:'R for Rabbit'},
    {letter:'S', key:'alpha_s', text:'S for Sun'},{letter:'T', key:'alpha_t', text:'T for Tree'},
    {letter:'U', key:'alpha_u', text:'U for Umbrella'},{letter:'V', key:'alpha_v', text:'V for Van'},
    {letter:'W', key:'alpha_w', text:'W for Water'},{letter:'X', key:'alpha_x', text:'X for Xylophone'},
    {letter:'Y', key:'alpha_y', text:'Y for Yak'},{letter:'Z', key:'alpha_z', text:'Z for Zebra'}
  ];

  var COLOURS = [
    {name:'Red', key:'color_red', code:'#e74c3c'},{name:'Orange', key:'color_orange', code:'#f39c12'},
    {name:'Yellow', key:'color_yellow', code:'#f1c232'},{name:'Green', key:'color_green', code:'#27ae60'},
    {name:'Blue', key:'color_blue', code:'#2980b9'},{name:'Purple', key:'color_purple', code:'#8e44ad'},
    {name:'Pink', key:'color_pink', code:'#ff8da1'},{name:'Brown', key:'color_brown', code:'#a0522d'},
    {name:'Black', key:'color_black', code:'#000000'},{name:'White', key:'color_white', code:'#ffffff'},
    {name:'Teal', key:'color_teal', code:'#1abc9c'},{name:'Cyan', key:'color_cyan', code:'#00bcd4'},
    {name:'Magenta', key:'color_magenta', code:'#d81b60'},{name:'Lime', key:'color_lime', code:'#cddc39'},
    {name:'Indigo', key:'color_indigo', code:'#3f51b5'},{name:'Maroon', key:'color_maroon', code:'#800000'},
    {name:'Olive', key:'color_olive', code:'#808000'},{name:'Navy', key:'color_navy', code:'#001f3f'},
    {name:'Coral', key:'color_coral', code:'#ff7f50'},{name:'Turquoise', key:'color_turquoise', code:'#40e0d0'},
    {name:'Silver', key:'color_silver', code:'#c0c0c0'},{name:'Gold', key:'color_gold', code:'#ffd700'}
  ];

  var FRUITS = [
    {name:'Apple(सफरचंद)', key:'fruit_apple'},{name:'Banana(केळ)', key:'fruit_banana'},{name:'Orange(संत्र)', key:'fruit_orange'},
    {name:'Mango(आंबा)', key:'fruit_mango'},{name:'Grapes(द्राक्षे)', key:'fruit_grapes'},{name:'Papaya(पपई)', key:'fruit_papaya'},
    {name:'Pineapple(अननस)', key:'fruit_pineapple'},{name:'Watermelon(कलिंगड)', key:'fruit_watermelon'},{name:'Pear(नाशपती)', key:'fruit_pear'},
    {name:'Guava(पेरु)', key:'fruit_guava'},{name:'Cherry(चेरी)', key:'fruit_cherry'},{name:'Strawberry(स्ट्रॉबेरी)', key:'fruit_strawberry'}
  ];

  var VEGETABLES = [
    {name:'Carrot(गाजर)', key:'veg_carrot'},{name:'Potato(बटाटा)', key:'veg_potato'},{name:'Tomato(टोमॅटो)', key:'veg_tomato'},
    {name:'Onion(कांदा )', key:'veg_onion'},{name:'Cabbage(कोबी)', key:'veg_cabbage'},{name:'Cauliflower(फुलकोबी)', key:'veg_cauliflower'},
    {name:'Broccoli(ब्रोकोली)', key:'veg_broccoli'},{name:'Spinach(पालक)', key:'veg_spinach'},{name:'Capsicum(शिमला मिरची)', key:'veg_capsicum'},
    {name:'Green Peas(हिरवे वाटाणे)', key:'veg_peas'},{name:'Brinjal(वांगी)', key:'veg_brinjal'},{name:'Beetroot(बीट)', key:'veg_beetroot'},
    {name:'Radish(मुळा)', key:'veg_radish'},{name:'Coriander(कोथिंबीर)', key:'veg_coriander'},{name:'Fenugreek Leaves(मेथी)', key:'veg_fenugreek'},
    {name:'Bottle Gourd(दुधी भोपळा)', key:'veg_bottle_gourd'},{name:'Bitter Gourd(कारले)', key:'veg_bitter_gourd'},{name:'Okra(भेंडी)', key:'veg_okra'},
    {name:'Drumstick(शेवगा )', key:'veg_drumstick'},{name:'Sweet Corn(कणीस )', key:'veg_corn'},{name:'Cucumber(काकडी)', key:'veg_cucumber'},
    {name:'Pumpkin(भोपळा)', key:'veg_pumpkin'},{name:'Green Chilli(हिरवी मिरची )', key:'veg_green_chilli'},{name:'Red Chilli(लाल  मिरची )', key:'veg_red_chilli'},
    {name:'Mushroom(आळंबी)', key:'veg_mushroom'},
    {name:'Cluster Beans(बीन्स)', key:'veg_cluster_beans'},
  ];

  // ---------- EXPANDED ANIMALS ARRAY (birds REMOVED) ----------
  var ANIMALS = [
    {name:'Dog(कुत्रा)', key:'animal_dog'},{name:'Cat(मांजर)', key:'animal_cat'},{name:'Cow(गाय)', key:'animal_cow'},
    {name:'Ox(बैल)', key:'animal_ox'},{name:'Buffelo(म्हैस)', key:'animal_buffelo'},
    {name:'Lion(सिंह)', key:'animal_lion'},{name:'Tiger(वाघ)', key:'animal_tiger'},{name:'Elephant(हत्ती)', key:'animal_elephant'},
    {name:'Monkey(माकड)', key:'animal_monkey'},{name:'Goat(शेळी)', key:'animal_goat'},{name:'Sheep(मेंढी)', key:'animal_sheep'},
    {name:'Horse(घोडा)', key:'animal_horse'},{name:'Pig(डुक्कर)', key:'animal_pig'},{name:'Rabbit(ससा)', key:'animal_rabbit'},
    {name:'Bear(अस्वल)', key:'animal_bear'},{name:'Fox(कोल्हा)', key:'animal_fox'},{name:'Wolf(लांडगा)', key:'animal_wolf'},
    {name:'Deer(हरीण)', key:'animal_deer'},{name:'Kangaroo(कांगारू)', key:'animal_kangaroo'},{name:'Panda(तिबेटी अस्वल)', key:'animal_panda'},
    {name:'Squirrel(खार)', key:'animal_squirrel'},{name:'Hedgehog(साळिंदर)', key:'animal_hedgehog'},{name:'Zebra(झेब्रा)', key:'animal_zebra'},
    {name:'Giraffe(जिराफ)', key:'animal_giraffe'},{name:'Hippo(पाणघोडा)', key:'animal_hippo'},{name:'Rhinoceros(गेंडा)', key:'animal_rhino'},
    {name:'Camel(उंट)', key:'animal_camel'},{name:'Donkey(गाढव)', key:'animal_donkey'},
  ];

  // ---------- NEW: BIRDS (separate) ----------
  var BIRDS = [
    {name:'Parrot(पोपट)', key:'bird_parrot'},{name:'Peacock(मोर)', key:'bird_peacock'},{name:'Crow(कावळा)', key:'bird_crow'},
    {name:'Sparrow(चिमणी)', key:'bird_sparrow'},{name:'Woodpecker(सुतारपक्षी)', key:'bird_woodpecker'},{name:'Sunbird(सूर्य पक्षी)', key:'bird_sunbird'},
    {name:'Eagle(गरुड)', key:'bird_eagle'},{name:'Kingfisher(खंड्या)', key:'bird_kingfisher'},{name:'Pigeon(कबुतर)', key:'bird_pigeon'},
    {name:'Vulture(गिधाड)', key:'bird_vulture'},{name:'Cuckoo(कोकिळा)', key:'bird_cuckoo'},{name:'Owl(घुबड)', key:'bird_owl'},
    {name:'Dove(कबुतर)', key:'bird_dove'},{name:'Kite(घार)', key:'bird_kite'},{name:'Hornbill(धनेश)', key:'bird_hornbill'},{name:'Bee-Eater(वेडा राघू)', key:'be-eater_eagle'},
    {name:'Black Drongo(कोतवाल)', key:'bird_drongo'},{name:'Wagtail(धोबी)', key:'bird_wagtail'},{name:'Heron(बगळा)', key:'bird_heron'},{name:'Red Vented bulbul(लालबुड्या बुलबुल)', key:'bird_red_vented_bulbul'},
  ];

  // ---------- NEW: MONTHS ----------
  var MONTHS = [
    {name:'January(जानेवारी)', key:'month_january'},
    {name:'February(फेब्रुवारी)', key:'month_february'},
    {name:'March(मार्च)', key:'month_march'},
    {name:'April(एप्रिल)', key:'month_april'},
    {name:'May(मे)', key:'month_may'},
    {name:'June(जून)', key:'month_june'},
    {name:'July(जुलै)', key:'month_july'},
    {name:'August(ऑगस्ट)', key:'month_august'},
    {name:'September(सप्टेंबर)', key:'month_september'},
    {name:'October(ऑक्टोबर)', key:'month_october'},
    {name:'November(नोव्हेंबर)', key:'month_november'},
    {name:'December(डिसेंबर)', key:'month_december'}
  ];

  var VEHICLES = [
    {name:'Car(मोटार)', key:'vehicle_car'},{name:'Bus(बस)', key:'vehicle_bus'},{name:'Truck(ट्रक)', key:'vehicle_truck'},
    {name:'Bike(दुचाकी)', key:'vehicle_bike'},{name:'Train(आगगाडी)', key:'vehicle_train'},{name:'Auto(रिक्शा)', key:'vehicle_auto'},
    {name:'Plane(विमान)', key:'vehicle_plane'},{name:'Boat(होडी)', key:'vehicle_boat'},{name:'Tractor(ट्रॅक्टर)', key:'vehicle_tractor'},
    {name:'Helicopter(हेलिकॉप्टर)', key:'vehicle_helicopter'}
  ];

  var SHAPES = [
    {name:'Circle(गोल)', key:'shape_circle'},{name:'Square(चौकोन)', key:'shape_square'},{name:'Triangle(त्रिकोण)', key:'shape_triangle'},
    {name:'Rectangle(आयत)', key:'shape_rectangle'},{name:'Oval(लंबगोल)', key:'shape_oval'},{name:'Star(चांदणी)', key:'shape_star'},
    {name:'Pentagon(पंचकोन)', key:'shape_pentagon'},
    {name:'Hexagon(षटकोन)', key:'shape_hexagon'}
  ];

  // ---- helpers ----
  var screen = qs('screen-content');
  if(!screen){ console.error('Missing #screen-content'); return; }

  function clearScreen(){
    while(screen.firstChild) screen.removeChild(screen.firstChild);
  }

  function numberToWords(n){
    var ones=["zero","one","two","three","four","five","six","seven","eight","nine","ten",
      "eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
    var tens=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
    if(n<20) return ones[n];
    if(n<100){ var t=Math.floor(n/10), o=n%10; return tens[t] + (o?('-'+ones[o]):''); }
    if(n===100) return 'one hundred';
    return String(n);
  }

  // ---------- RENDERERS ----------
  function renderHome(){
    clearScreen();
    var p = document.createElement('div');
    p.style.textAlign = 'center';
    p.style.fontSize = '18px';
    p.innerText = 'Tap a button to start learning';
    screen.appendChild(p);
  }

  // Alphabets (same as earlier)
  var aIndex = 0;
  function renderAlphabetLarge(){
    clearScreen();
    var it = ALPHABETS[aIndex];
    var letterDiv = document.createElement('div'); letterDiv.style.fontSize='64px'; letterDiv.style.fontWeight='700'; letterDiv.style.textAlign='center'; letterDiv.innerText = it.letter;
    var textDiv = document.createElement('div'); textDiv.style.textAlign='center'; textDiv.style.marginTop='8px'; textDiv.style.fontSize='18px'; textDiv.innerText = it.text;
    var controls = document.createElement('div'); controls.style.textAlign='center'; controls.style.marginTop='12px';
    var bPrev = document.createElement('button'); bPrev.innerText='◀';
    var bPlay = document.createElement('button'); bPlay.innerText='🔊 Play';
    var bNext = document.createElement('button'); bNext.innerText='▶';
    var bGrid = document.createElement('button'); bGrid.innerText='All';
    bPrev.addEventListener('click', function(){ aIndex=(aIndex-1+ALPHABETS.length)%ALPHABETS.length; renderAlphabetLarge(); });
    bNext.addEventListener('click', function(){ aIndex=(aIndex+1)%ALPHABETS.length; renderAlphabetLarge(); });
    bPlay.addEventListener('click', function(){ playAudio('assets/' + it.key + '.mp3', it.text); });
    bGrid.addEventListener('click', renderAlphabetGrid);
    controls.appendChild(bPrev); controls.appendChild(bPlay); controls.appendChild(bNext); controls.appendChild(bGrid);
    screen.appendChild(letterDiv); screen.appendChild(textDiv); screen.appendChild(controls);
  }
  function renderAlphabetGrid(){
    clearScreen();
    var title = document.createElement('div'); title.style.fontSize='16px'; title.style.marginBottom='8px'; title.innerText='Alphabets — Tap any letter';
    var grid = document.createElement('div'); grid.style.display='grid'; grid.style.gridTemplateColumns='repeat(6,1fr)'; grid.style.gap='8px';
    ALPHABETS.forEach(function(a){ var btn=document.createElement('button'); btn.style.padding='10px'; btn.style.borderRadius='8px'; btn.style.cursor='pointer'; btn.innerText=a.letter; btn.addEventListener('click', function(){ playAudio('assets/' + a.key + '.mp3', a.text); }); grid.appendChild(btn); });
    screen.appendChild(title); screen.appendChild(grid);
  }

  // Numbers (same)
  var nIndex = 1;
  function renderNumberLarge(){
    clearScreen();
    var numDiv = document.createElement('div'); numDiv.style.fontSize='64px'; numDiv.style.fontWeight='700'; numDiv.style.textAlign='center'; numDiv.innerText = nIndex;
    var wordDiv = document.createElement('div'); wordDiv.style.textAlign='center'; wordDiv.style.marginTop='8px'; wordDiv.style.fontSize='18px'; wordDiv.innerText = numberToWords(nIndex);
    var controls = document.createElement('div'); controls.style.textAlign='center'; controls.style.marginTop='12px';
    var bPrev = document.createElement('button'); bPrev.innerText='◀'; var bPlay = document.createElement('button'); bPlay.innerText='🔊 Play'; var bNext = document.createElement('button'); bNext.innerText='▶'; var bList = document.createElement('button'); bList.innerText='List';
    bPrev.addEventListener('click', function(){ nIndex=(nIndex-1<1?100:nIndex-1); renderNumberLarge(); });
    bNext.addEventListener('click', function(){ nIndex=(nIndex+1>100?1:nIndex+1); renderNumberLarge(); });
    bPlay.addEventListener('click', function(){ playAudio('assets/num' + nIndex + '.mp3', numberToWords(nIndex)); });
    bList.addEventListener('click', renderNumberList);
    controls.appendChild(bPrev); controls.appendChild(bPlay); controls.appendChild(bNext); controls.appendChild(bList);
    screen.appendChild(numDiv); screen.appendChild(wordDiv); screen.appendChild(controls);
  }
  function renderNumberList(){
    clearScreen();
    var title = document.createElement('div'); title.style.fontSize='16px'; title.style.marginBottom='8px'; title.innerText='Numbers 1–100 — Tap';
    var grid = document.createElement('div'); grid.style.display='grid'; grid.style.gridTemplateColumns='repeat(6,1fr)'; grid.style.gap='6px'; grid.style.maxHeight='320px'; grid.style.overflow='auto'; grid.style.padding='4px';
    for(var i=1;i<=100;i++){ (function(n){ var btn=document.createElement('button'); btn.style.padding='8px'; btn.style.borderRadius='6px'; btn.style.border='1px solid #eee'; btn.style.background='#fff'; btn.style.cursor='pointer'; btn.innerText=n; btn.addEventListener('click', function(){ playAudio('assets/num' + n + '.mp3', numberToWords(n)); }); grid.appendChild(btn); })(i); }
    screen.appendChild(title); screen.appendChild(grid);
  }

  // Colours (same)
  function renderColours(){
    clearScreen();
    var title = document.createElement('div'); title.style.fontSize='16px'; title.style.marginBottom='8px'; title.innerText='Colours — Tap to hear';
    screen.appendChild(title);
    var grid = document.createElement('div'); grid.style.display='grid'; grid.style.gridTemplateColumns='repeat(5,1fr)'; grid.style.gap='10px';
    screen.appendChild(grid);
    var placeholder = document.createElement('div'); placeholder.id = 'color-preview-placeholder'; screen.appendChild(placeholder);

    COLOURS.forEach(function(c){
      var card = document.createElement('div'); card.className='color-card'; card.style.height='80px'; card.style.borderRadius='10px'; card.style.display='flex'; card.style.alignItems='center'; card.style.justifyContent='center'; card.style.fontWeight='700'; card.style.cursor='pointer'; card.style.transition='transform .15s ease, box-shadow .15s ease'; card.style.background = c.code;
      var lightList = ['#f1c232','#ffffff','#ff8da1','#f39c12','#ffd700','#cddc39'];
      if(lightList.indexOf(c.code)!==-1){ card.style.color='#000'; card.style.border='1px solid rgba(0,0,0,0.06)'; } else { card.style.color='#fff'; card.style.border='2px solid rgba(0,0,0,0.04)'; }
      card.innerText = c.name;
      card.addEventListener('click', function(){
        card.classList.remove('pulse'); void card.offsetWidth; card.classList.add('pulse');
        playAudio('assets/' + c.key + '.mp3', c.name);
        var prev = document.getElementById('color-preview-box');
        if(!prev){ prev = document.createElement('div'); prev.id='color-preview-box'; prev.style.width='100%'; prev.style.height='100px'; prev.style.marginTop='12px'; prev.style.borderRadius='10px'; prev.style.display='flex'; prev.style.alignItems='center'; prev.style.justifyContent='center'; prev.style.fontWeight='800'; prev.style.fontSize='20px'; prev.style.boxShadow='0 8px 18px rgba(0,0,0,0.06)'; placeholder.appendChild(prev); }
        prev.style.background = c.code; prev.style.color = (card.style.color === '#000' ? '#000' : '#fff'); prev.innerText = c.name;
      });
      grid.appendChild(card);
    });
  }

  // Fruits renderer
  function renderFruits(){
    clearScreen();
    var title = document.createElement('div'); title.style.fontSize='16px'; title.style.marginBottom='8px'; title.innerText='Fruits — Tap to hear and see';
    screen.appendChild(title);
    var grid = document.createElement('div'); grid.className='fruit-grid';
    screen.appendChild(grid);

    FRUITS.forEach(function(f){
      var card = document.createElement('div'); card.className='fruit-card';
      var img = document.createElement('img'); img.className='fruit-img'; img.src='assets/fruits/' + f.key + '.jpg'; img.alt=f.name;
      img.onerror = function(){ if(img.src && img.src.endsWith('.jpg')) img.src = 'assets/fruits/' + f.key + '.png'; else img.src = 'assets/fruits/fruit_gauva.jpg'; };
      var name = document.createElement('div'); name.className='fruit-name'; name.innerText = f.name;
      var btn = document.createElement('button'); btn.className='fruit-play-btn'; btn.innerText='🔊 Play';
      function doPlayFruit(){ card.style.transform='scale(1.03)'; setTimeout(function(){ card.style.transform=''; },220); playAudio('assets/' + f.key + '.mp3', f.name); }
      img.addEventListener('click', doPlayFruit); btn.addEventListener('click', doPlayFruit);
      card.appendChild(img); card.appendChild(name); card.appendChild(btn); grid.appendChild(card);
    });
  }

  // Vegetables renderer (uses same grid/card styles)
  function renderVegetables(){
    clearScreen();
    var title = document.createElement('div'); title.style.fontSize='16px'; title.style.marginBottom='8px'; title.innerText='Vegetables — Tap to hear and see';
    screen.appendChild(title);
    var grid = document.createElement('div'); grid.className='fruit-grid';
    screen.appendChild(grid);

    VEGETABLES.forEach(function(v){
      var card = document.createElement('div'); card.className='fruit-card';
      var img = document.createElement('img'); img.className='fruit-img'; img.src='assets/vegetables/' + v.key + '.jpg'; img.alt=v.name;
      img.onerror = function(){ if(img.src && img.src.endsWith('.jpg')) img.src = 'assets/vegetables/' + v.key + '.png'; else img.src = 'assets/vegetables/vegetable_placeholder.png'; };
      var name = document.createElement('div'); name.className='fruit-name'; name.innerText = v.name;
      var btn = document.createElement('button'); btn.className='fruit-play-btn'; btn.innerText='🔊 Play';
      function doPlayVeg(){ card.style.transform='scale(1.03)'; setTimeout(function(){ card.style.transform=''; },220); playAudio('assets/' + v.key + '.mp3', v.name); }
      img.addEventListener('click', doPlayVeg); btn.addEventListener('click', doPlayVeg);
      card.appendChild(img); card.appendChild(name); card.appendChild(btn); grid.appendChild(card);
    });
  }

  // Animals renderer (expanded)
  function renderAnimals(){
    clearScreen();
    var title = document.createElement('div'); title.style.fontSize='16px'; title.style.marginBottom='8px'; title.innerText='Animals — Tap to hear and see';
    screen.appendChild(title);
    var grid = document.createElement('div'); grid.className='fruit-grid';
    screen.appendChild(grid);

    ANIMALS.forEach(function(a){
      var card = document.createElement('div'); card.className='fruit-card';
      var img = document.createElement('img'); img.className='fruit-img'; img.src='assets/animals/' + a.key + '.jpg'; img.alt = a.name;
      img.onerror = function(){ if(img.src && img.src.endsWith('.jpg')) img.src = 'assets/animals/' + a.key + '.png'; else img.src = 'assets/animals/placeholder.png'; };
      var name = document.createElement('div'); name.className='fruit-name'; name.innerText = a.name;
      var btn = document.createElement('button'); btn.className='fruit-play-btn'; btn.innerText='🔊 Play';
      function doPlayAnimal(){ card.style.transform='scale(1.03)'; setTimeout(function(){ card.style.transform=''; },220); playAudio('assets/' + a.key + '.mp3', a.name); }
      img.addEventListener('click', doPlayAnimal); btn.addEventListener('click', doPlayAnimal);
      card.appendChild(img); card.appendChild(name); card.appendChild(btn); grid.appendChild(card);
    });
  }

  // Birds renderer (new: आधी नाव, नंतर real sound)
function renderBirds(){
  clearScreen();

  var title = document.createElement('div');
  title.style.fontSize = '16px';
  title.style.marginBottom = '8px';
  title.innerText = 'Birds — Tap to hear and see';
  screen.appendChild(title);

  var grid = document.createElement('div');
  grid.className = 'fruit-grid';
  screen.appendChild(grid);

  BIRDS.forEach(function(b){
    var card = document.createElement('div');
    card.className = 'fruit-card';

    var img = document.createElement('img');
    img.className = 'fruit-img';
    img.src = 'assets/birds/' + b.key + '.jpg';
    img.alt = b.name;
    img.onerror = function(){
      if(img.src && img.src.endsWith('.jpg')){
        img.src = 'assets/birds/' + b.key + '.png';
      } else {
        img.src = 'assets/birds/placeholder.png';
      }
    };

    var name = document.createElement('div');
    name.className = 'fruit-name';
    name.innerText = b.name;

    var btn = document.createElement('button');
    btn.className = 'fruit-play-btn';
    btn.innerText = '🔊 Play';

    // ✅ इथे मुख्य भाग – आधी उच्चार, मग bird चा आवाज
    function doPlayBird(){
      // 1) आधी नावाचा उच्चार
      speak(b.name);

      // 2) 800ms नंतर real sound प्ले
      setTimeout(function(){
        playAudio('assets/birds/' + b.key + '.mp3', b.name);
      }, 800);
    }

    img.addEventListener('click', doPlayBird);
    btn.addEventListener('click', doPlayBird);

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(btn);
    grid.appendChild(card);
  });
}
  // --------- MONTHS: data + renderer + safe attach ----------
var MONTHS = [
  {name:'January', key:'month_jan'},
  {name:'February', key:'month_feb'},
  {name:'March', key:'month_mar'},
  {name:'April', key:'month_apr'},
  {name:'May', key:'month_may'},
  {name:'June', key:'month_jun'},
  {name:'July', key:'month_jul'},
  {name:'August', key:'month_aug'},
  {name:'September', key:'month_sep'},
  {name:'October', key:'month_oct'},
  {name:'November', key:'month_nov'},
  {name:'December', key:'month_dec'}
];

function renderMonths(){
  clearScreen();
  var title = document.createElement('div');
  title.style.fontSize='16px';
  title.style.marginBottom='8px';
  title.innerText = 'Months — Tap to hear';
  screen.appendChild(title);

  var grid = document.createElement('div');
  grid.className = 'fruit-grid';
  screen.appendChild(grid);

  MONTHS.forEach(function(m){
    var card = document.createElement('div'); card.className='fruit-card';
    var img = document.createElement('img'); img.className='fruit-img';
    img.src = 'assets/months/' + m.key + '.jpg';
    img.alt = m.name;
    img.onerror = function(){ 
      if(img.src && img.src.endsWith('.jpg')) img.src = 'assets/months/' + m.key + '.jpg';
      else img.src = 'assets/months/placeholder.png';
    };
    var name = document.createElement('div'); name.className='fruit-name'; name.innerText = m.name;
    var btn = document.createElement('button'); btn.className='fruit-play-btn'; btn.innerText='🔊 Play';

    function doPlayMonth(){
      card.style.transform='scale(1.03)';
      setTimeout(function(){ card.style.transform=''; },220);
      // try mp3 in assets/months/<key>.mp3, fallback to TTS
      playAudio('assets/months/' + m.key + '.mp3', m.name);
    }

    img.addEventListener('click', doPlayMonth);
    btn.addEventListener('click', doPlayMonth);

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(btn);
    grid.appendChild(card);
  });
}

// safeAttach helper (only if you want to ensure listener exists)
function safeAttach(id, fn){
  var el = document.getElementById(id);
  if(!el){ console.warn('safeAttach: missing', id); return; }
  try {
    el.addEventListener('click', fn);
    console.log('attached', id);
  } catch(e){
    console.error('attach failed', id, e);
  }
}

// If you want to auto-attach here (optional) — it won't break if you already attach later
safeAttach('btn-months', renderMonths);
  // Months renderer (new)
  function renderAnimals(){
  clearScreen();
  var title = document.createElement('div');
  title.style.fontSize='16px';
  title.style.marginBottom='8px';
  title.innerText='Animals — Tap to hear and see';
  screen.appendChild(title);

  var grid = document.createElement('div');
  grid.className='fruit-grid';
  screen.appendChild(grid);

  ANIMALS.forEach(function(a){
    var card = document.createElement('div');
    card.className='fruit-card';

    var img = document.createElement('img');
    img.className='fruit-img';
    img.src='assets/animals/' + a.key + '.jpg';
    img.alt = a.name;

    var name = document.createElement('div');
    name.className='fruit-name';
    name.innerText = a.name;

    var btn = document.createElement('button');
    btn.className='fruit-play-btn';
    btn.innerText='🔊 Play';

   function doPlayAnimal(){
  // animation
  card.style.transform = 'scale(1.03)';
  setTimeout(() => card.style.transform = '', 200);

  // spoken name (English only)
  let spokenName = (a.name || '').split('(')[0].trim();

  let soundPath = 'assets/animals/' + a.key + '.mp3';

  // First speak the name → then play real sound
  function playRealSound(){
    let snd = new Audio(soundPath);
    snd.play().catch(() => {});
  }

  // Speak name first
  if ('speechSynthesis' in window) {
    let u = new SpeechSynthesisUtterance(spokenName);
    u.lang = "en-US";
    u.rate = 1;

    u.onend = function(){
      playRealSound();   // after pronunciation → play tiger roar
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } 
  else {
    playRealSound(); // fallback
  }
}

    img.addEventListener('click', doPlayAnimal);
    btn.addEventListener('click', doPlayAnimal);

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(btn);
    grid.appendChild(card);
  });
}

  // Vehicles renderer
  function renderVehicles(){
    clearScreen();
    var title = document.createElement('div'); title.style.fontSize='16px'; title.style.marginBottom='8px'; title.innerText='Vehicles — Tap to hear and see';
    screen.appendChild(title);
    var grid = document.createElement('div'); grid.className='fruit-grid';
    screen.appendChild(grid);

    VEHICLES.forEach(function(v){
      var card = document.createElement('div'); card.className='fruit-card';
      var img = document.createElement('img'); img.className='fruit-img'; img.src='assets/vehicles/' + v.key + '.jpg'; img.alt = v.name;
      img.onerror = function(){ if(img.src && img.src.endsWith('.jpg')) img.src = 'assets/vehicles/' + v.key + '.png'; else img.src = 'assets/vehicles/placeholder.png'; };
      var name = document.createElement('div'); name.className='fruit-name'; name.innerText = v.name;
      var btn = document.createElement('button'); btn.className='fruit-play-btn'; btn.innerText='🔊 Play';
      function doPlayVehicle(){ card.style.transform='scale(1.03)'; setTimeout(function(){ card.style.transform=''; },220); playAudio('assets/' + v.key + '.mp3', v.name); }
      img.addEventListener('click', doPlayVehicle); btn.addEventListener('click', doPlayVehicle);
      card.appendChild(img); card.appendChild(name); card.appendChild(btn); grid.appendChild(card);
    });
  }

  // Shapes renderer
  function renderShapes(){
    clearScreen();
    var title = document.createElement('div'); title.style.fontSize='16px'; title.style.marginBottom='8px'; title.innerText='Shapes — Tap to hear and see';
    screen.appendChild(title);
    var grid = document.createElement('div'); grid.className='fruit-grid';
    screen.appendChild(grid);

    SHAPES.forEach(function(s){
      var card = document.createElement('div'); card.className='fruit-card';
      var img = document.createElement('img'); img.className='fruit-img'; img.src='assets/shapes/' + s.key + '.jpg'; img.alt = s.name;
      img.onerror = function(){ img.src = 'assets/shapes/placeholder.png'; };
      var name = document.createElement('div'); name.className='fruit-name'; name.innerText = s.name;
      var btn = document.createElement('button'); btn.className='fruit-play-btn'; btn.innerText='🔊 Play';
      function doPlayShape(){ card.style.transform='scale(1.03)'; setTimeout(function(){ card.style.transform=''; },220); playAudio('assets/' + s.key + '.mp3', s.name); }
      img.addEventListener('click', doPlayShape); btn.addEventListener('click', doPlayShape);
      card.appendChild(img); card.appendChild(name); card.appendChild(btn); grid.appendChild(card);
    });
  }

  // ---------- attach menu buttons ----------
  var bLetters = qs('btn-letters');
  var bNumbers = qs('btn-numbers');
  var bColors = qs('btn-colors');
  var bFruits = qs('btn-fruits');
  var bVegetables = qs('btn-vegetables');
  var bAnimals = qs('btn-animals');
  var bBirds = qs('btn-birds');
  var bMonths = qs('btn-months'); // new button id - add this in HTML
  var bVehicles = qs('btn-vehicles');
  var bShapes = qs('btn-shapes');

  if(bLetters) bLetters.addEventListener('click', renderAlphabetLarge);
  if(bNumbers) bNumbers.addEventListener('click', renderNumberLarge);
  if(bColors) bColors.addEventListener('click', renderColours);
  if(bFruits) bFruits.addEventListener('click', renderFruits);
  if(bVegetables) bVegetables.addEventListener('click', renderVegetables);
  if(bAnimals) bAnimals.addEventListener('click', renderAnimals);
  if(bBirds) bBirds.addEventListener('click', renderBirds);
  if(bMonths) bMonths.addEventListener('click', renderMonths); // bind months
  if(bVehicles) bVehicles.addEventListener('click', renderVehicles);
  if(bShapes) bShapes.addEventListener('click', renderShapes);

  // initial
  renderHome();
});