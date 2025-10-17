(() => {
  const pages = {
    1: document.getElementById('page1'),
    2: document.getElementById('page2'),
    3: document.getElementById('page3'),
    4: document.getElementById('page4'),
    5: document.getElementById('page5')
  }
  function showPage(n){
    Object.values(pages).forEach(p => p.classList.remove('active'))
    pages[n].classList.add('active')
  }

  const btnNew = document.getElementById('btnNew'), btnJoin = document.getElementById('btnJoin')
  const createForm = document.getElementById('createForm'), joinForm = document.getElementById('joinForm')
  const createPlayerName = document.getElementById('createPlayerName'), createLobbySeed = document.getElementById('createLobbySeed'), createLobbyPassword = document.getElementById('createLobbyPassword'), createLobbyLimit = document.getElementById('createLobbyLimit'), createLobbyBtn = document.getElementById('createLobbyBtn'), backToMenuFromCreate = document.getElementById('backToMenuFromCreate')
  const joinPlayerName = document.getElementById('joinPlayerName'), joinLobbySeed = document.getElementById('joinLobbySeed'), joinLobbyPassword = document.getElementById('joinLobbyPassword'), joinExistingBtn = document.getElementById('joinExistingBtn'), backToMenuFromJoin = document.getElementById('backToMenuFromJoin')
  const lobbyView = document.getElementById('lobbyView'), lobbySeedLabel = document.getElementById('lobbySeedLabel'), lobbyPassLabel = document.getElementById('lobbyPassLabel'), lobbyLimitLabel = document.getElementById('lobbyLimitLabel'), playersList = document.getElementById('playersList'), playersCount = document.getElementById('playersCount')
  const fakePlayerName = document.getElementById('fakePlayerName'), addLocalPlayer = document.getElementById('addLocalPlayer'), startGameBtn = document.getElementById('startGameBtn'), leaveLobby = document.getElementById('leaveLobby')

  const activeVoter = document.getElementById('activeVoter'), votePlayers = document.getElementById('votePlayers'), castVote = document.getElementById('castVote'), votesStatus = document.getElementById('votesStatus'), revoteBtn = document.getElementById('revoteBtn')
  const activePlayerSelect = document.getElementById('activePlayerSelect'), promptCard = document.getElementById('promptCard'), hand = document.getElementById('hand'), handArea = document.getElementById('handArea'), sendIt = document.getElementById('sendIt'), czarPile = document.getElementById('czarPile'), revealNext = document.getElementById('revealNext'), czarChoose = document.getElementById('czarChoose'), scoreboard = document.getElementById('scoreboard'), nextRound = document.getElementById('nextRound'), autoReveal = document.getElementById('autoReveal'), promptRemain = document.getElementById('promptRemain'), playRemain = document.getElementById('playRemain'), currentCzar = document.getElementById('currentCzar')

  const endGameTop = document.getElementById('endGameTop'), endModal = document.getElementById('endModal'), confirmEnd = document.getElementById('confirmEnd'), cancelEnd = document.getElementById('cancelEnd'), leaderboard = document.getElementById('leaderboard'), backToMenu2 = document.getElementById('backToMenu2'), page2title = document.getElementById('page2title')

  let lobbies = {}
  let currentLobby = null

  let promptCards = ["Now I don't support any type of violence, but with that being said I hope something unfortunate happens to ______.","While I may have no use for it ever, you gotta admit ______ is pretty cool.","Now, here me out...","______? That CANNOT be ideal for your gains.","Sugar, spice, and everything nice. These were the ingredients chosen to create the perfect little girls. But Professor Utonium accidentally added an extra ingredient to the concoction. Chemical ______.","Bro, I'm telling you invest in ______ right now. It's gonna work this time I swear.","______ is so underrated to be honest.","I just got back from Loserville and I did not know that ______ is there.","______ has got to be in the Epstein Files for sure.","It is generally a good rule of thumb to not mess with ______.","I know it's an opinion, but ______ generally just fucking sucks.","What was it that made Batman glad his parents are dead?","What gets you off? (Don't lie)","Imagine how much better the world would be if ______ wasn't a thing.","What is objectively a banger?","God, I hate ______.","Examples of stuff that are totally awesome sauce:","No prompt. Just play a card at random. Who fucking cares anymore? Prompts are a social construct anyway.","Who would be the 13th disciple?","Forget Michael Jordan, Wayne Gretzky, Simone Biles, Katie Ledecky, etc. The real greatest athlete of all-time is ______.","Shit like ______ is exactly why I still pay my taxes.","Public executions are bad but I do think you could make the argument that it is acceptable in the case of ______.","This and ______.","If you think that's bad, wait until you see ______.","Probably the only force in the entire universe that can stop a black hole. Behold, ______!","It wouldn't be a whimsical night if there wasn't ______.","According to the Catholic Church, the 8 deadly sins are pride, greed, wrath, envy, lust, gluttony, sloth, and ______.","We as a society need to collectively appreciate ______ more.","What is your 13th reason why?","What didn't you understand at first, but eventually it grew on you?","Breaking News: President Donald Trump has just signed Executive Order ______.","What is an example of something that is very cash money?","What is an example of something that is NOT very cash money?","Why even drink alcohol when you could ______?","No matter how bad you want it to be good, it just won't ever be good. It's just not gonna happen. Ever.","It wasn't a meteor that killed the dinosaurs, it was actually ______.","I may not want to admit it, but ______ had a good run.","The radical left is now proposing ______.","Welcome back to AMERICAN NINJA WARRIOR! I'm Matt Iseman here with Akbar Gbajabiamila and we've brought back a classic obstacle from the past back to our qualifying course, ______.","It isn't the gangsters in O-Block that you have to worry about, but  ______.","INTRODUCING THE STARTING LINEUP FOR ______.","Finally, it's about time that we've had more ______ in this world.","I don't understand why no music venues ever want to host ______.","______ really isn't so bad if you just think critically for two minutes.","The NYPD is currently investigating a case in which the main suspect is ______.","Our honor, I know my client is ______ and I know how suspicious that is but I promise they're innocent.","It truly is sad what happened to ______.","9 out of 10 dentists recommend this new unconventional but proven effective method to clean your teeth:","Ref, do something! ______ must be stopped!","Least unhinged Kanye West tweet:","Martin Luther King Jr. absolutely DID die for ______.","______ is how we evolved from being Neanderthals to modern humans.","Oh my god, is there really ______ in our civilization? Is nobody thinking of the children?","The first rule of Fight Club is that you do not talk about Fight Club. The second rule of Fight Club is that you do not talk about ______.","______! 'MURRRICCCCAAAAAA!","Alright, team. We're down by a touchdown and we need a score here. The odds don't look good but what the other team doesn't know is that we have a secret weapon. ______.","When I feel lost and confused I just think to myself, what would ______ do?","Forget the man vs bear debate. I would actually choose ______.","Do NOT let ______ drive under ANY circumstance.","It's just a cross country course. But instead of some rolling hills, the obstacle is ______."]
  let playingCards = ["Charlie Kirk","Strangers that choose to sit next to you despite there being amble other seats to choose from","People that claim to be centrists but definitely are hardcore conservatives that are just too embarrassed to admit it","Dudes that pretend to be liberals because they think it'll get them laid","Donald Trump","Kristi Noem","ICE agents","Cruella de Vil","People that leave their cart in the middle of the parking lot","Kansas City Chiefs fans","Las Vegas Raiders fans","Los Angeles sports fans","Dallas Stars fans","Denver","Castlewood, South Dakota","That creepy ass guy I keep seeing on the bus that is completely butt-ass naked. But in his defense, he at least is wearing a propeller hat with a comedically oversized lollipop in his hand","Mark Robinson","An octopus that I have specifically trained to finger your asshole with all 8 of its arms at the same time","That recently divorced alcoholic dad that just sits in the garage all day playing How You Remind Me by Nickelback on loop all day","Cross country runners","Elon Musk","Laura Loomer","Palestine","Israel","People that go to another country and now they think they speak that country's language fluently for some reason","Your mom, hehe lol","Mein Kampf","Throwing snowballs with glass shards in them at children","Watching children trip and fall face first into concrete cement","Drunk driving","Vehicular homicide","Sadomasochism","An anatomically correct cardboard cutout of Judy Hopps from Zootopia","A parrot that repeats the same 5 racial slurs all day","Toaster baths","Spider-Man but he shoots cum out of his wrists instead","Cereal but with horse semen instead of milk","A stick","Full-body tickles","Getting curb stomped by an elephant","Drinking melted down plutonium","Belly button lint","Lots and lots of fentanyl","Samuel Adams Utopias","Moonshine","10 pounds of Godfather OG","Cyanide","Earl from Cloudy With a Chance of Meatballs","Lola Bunny from the original Space Jam","Shego","Aunt Fanny from Robots, trust me","Hova from the Ant Bully","Racial discrimination","Actually taking care of our mental health and trying to understand our emotions instead of taking a milligram of fentanyl every day","Doin your mom, lol","Emmett Till","The Holocaust","Adolf Hitler","A guy wanted for numerous human trafficking scandals in 46 US states, and in his words is wanted for the other 4 as well","Anal acupuncture therapy","Stealing food from a poor immigrant single-mother of 6","Dylan","Dillon","Belk","Candace Owens","Andrew Tate","Gay butt sex","Investing in Yo Gabba Gabba pornography","Me. You. Sex. Right here in the pastry aisle","The girl that has just gotten her heart broken for like the 6th time at this point but then gets into another relationship not even a week later and he's exactly like the last 6 guys she's dated. You don't want to victim blame but girl at some point...","Seltzers","IPA's","Getting my cooch pounded on Friday night","That girl in college that shows up to one class a month and when she does she's completely hungover, but she somehow has a 92","Extremely aggressive, vicious, and soul-taking backshots","Mongolian throat singing","Dropping my trousers and plopping my asshole directly on Trump's face","Shitting in the urinal","Slavery","Watergate","Rape","Ronald Reagan","Bill Clinton","Jeffrey Epstein","Making a lot of extremely bad decisions and then justifying it by saying that it's okay because you're in Las Vegas, even though you really are in New Jersey","Kansas","A gorilla that aggressively beats his chest when he sees you, then comes over and gently strokes you","That high dude at Walmart that you've seen peeing inside of the store multiple times","Grinding completely nude on a street light of the busiest intersection in the city (but at night though so it isn't as bad)","Drinking acid and then listening to Tame Impala until you die","Evicting the single-mother on food stamps because her rent payment was one nanosecond late","Riding the electric carts around Walmart","Getting white girl wasted","Injecting nitromethane directly up my asshole and then sliding like a snail around a Formula 1 track completely nacked (for aerodynamic reasons of course)","Giving homeless people cardboard food","Mass shootings","Columbine","Missionary (why make it complicated?)","Bouncing cowgirl style on it","Talking about our feelings","Not taking our medications and then blaming our psychiatrist for not mentally improving","Bulimia","Balls. Sucks for anyone who got this card I couldn't think of anything else to put on it","Waffle House employees","People posting about how it's disrespectful to not care about Charlie Kirk's death like they weren't salivating at the idea of going to war with Chicago like 2 days before that","Alligator Alcatraz","Bill Nye the Science Guy","Racism","Fuckass MAGA idiots that post clips of them lip syncing the lyrics to American Idiot by Green Day trying to shit on the left not knowing that the song is talking about people like them","People that make fun of male sexual assault victims","Hootie & the Blowfish","Kid Rock","Incest","Getting a reacharound from an extremely hunky, absolute specimen of a man","If IT happened. Do I even have to say what IT is? As in, the THING. Just IT. You know?","Joe Biden","Kamala Harris","Lego Batman","Getting fucked by Chris Hemsworth and whimpering softly in his ear during it","Having sex with a guy that has a completely unmoanable name, like Bartholomew or something","Your password not working and you changing it just for it to say you can't use an old password","People that intentionally speed up just to block you from changing lanes when you've had your turn signal on for like 10 fucking seconds","Watching the entire One Piece series on ecstasy","Larry","Bob","That one weirdo in the stall over that needs to sing a song or else they can't tinkle","Educating Make-A-Wish kids about retirement plans","That guy around the corner that has a fake eyeball that on occasion he pulls out of his eye socket and throws at people","DEI hires","A dude that's normal in every single way except he crawls like a baby on the ground instead of walking, but like literally normal besides that though","Tyler Robinson","Luigi Mangione","Kyle Rittenhouse","Thomas Matthew Crooks","Asserting dominance by staring at someone directly in their eyes without breaking eye contact even once as you piss directly on their shoes","Homophobic people","Transphobic people","That drunk girl that almost throws up mid-sentence and continues talking as if she didn't almost throw up and pass out just a second ago","Shoving the nozzle of a leaf blower up your asshole as far as you can and turning it on","Eating Play-Doh","Ultimate penetration","Anne Frank's diary","That racist white dude that thinks he isn't racist because he watched Black Panther once","Your racist grandpa's house that's littered with Confederate flags everywhere","Having a water gun fight at 8:17pm on a Tuesday","Exercising my 1st amendment rights in extremely inappropriate scenarios","Accidentally making everybody in the room painfully uncomfortable with a joke you make and trying to play it off as intentional but then going home later that day and intensely regretting it","Planned Parenthood","The fuck everybody except for the top 1% bill","Capitalism","Air pollution","Defunding cancer research","Defunding mental health services","Climate change","Income inequality","Fox News","Abortions","Going to a nudist beach but plot twist: We'll actually wear clothes","The Colorado Rockies","Leaving the stove and oven on","Putting silverware in the microwave","A bull that doesn't charge at the color red but will only charge at anybody that it can sense is incredibly horny, then it will start dry-humping them","Just straight rawdogging it","A college professor with an extremely strong Irish accent talking about very dark topics like serial killers (but he on occasion will day damn straight in a sentence)","A super muscular buff rooster that instead of doing a faint cock-a-doodle doo it goes COCK-A-DOODLE DOO in a powerful deep manly voice","A nonchalant fire alarm. Instead of loudly alerting you that there is a fire in the building and that you need to get the fuck out immediately it goes...yo like there's a fire in the building and shit, y'all better get up outta here before you burn alive type shit","Streaking","A guy that follows you around asking where the sun is on a sunny day. And after the 5th time he asks and you answer again he finally acknowledges that the sun is in fact there shining in the sky and leaves you alone","Two people sword fighting each other with crowbars instead because obviously that is a way safer alternative than actually using swords","Your friend's extremely sketchy uncle that gets you involved in a shootout somehow and now your life is completely in this strangers hands","Jeffrey Dahmer","John Wayne Gacy","Ted Bundy","Firing a rifle into the air while balls deep in a squealing hog","A stranger coming up and talking to you and you can't understand a single word they're saying so you're just smiling and nodding until they stop talking","Rappers that incriminate themselves in their own song lyrics while their defense attorney is fighting for their life trying to defend it in court","Committing crimes with both direction and magnitude. OH YEAAAAAHHHHH!","Diddy freak-offs","California","Selling my left nut on the dark web","Giving up your dreams to work at Burger King","Hiccups","Women's suffrage","A fart lol","That girl that knows her boyfriend is a piece of shit but is still convinced she can change him","Girls that write serial killers fan mail","The Taliban Pilot Academy","9-11","1 hour of silence randomly interrupted by the occasional sound of a metal pipe falling","That slutty ass 'going down' voice in the elevator","Throwing overheated toast at liberals","Al-Qaeda","The Taliban","Fidel Castro","Kim Jong Un","Vladimir Putin","DaBaby","Scaling the Rockies while high listening to The Lumineers on repeat","Flipping the bird to an innocent old lady just walking down the street for no reason","Pondering if infinity is real because that renders life as a random meaningless consequence of chance","Reorganizing your entire book shelf based on the order of the authors' astrological signs","Framing an innocent black man for murder","Police brutality","George Floyd","Thinking extremely in-depth about what you want for lunch today","The song Black Sabbath in the album Black Sabbath that was created by the band Black Sabbath and performed by the band Black Sabbath","Helping your alcoholic grandpa travel through time and space","Taking so much LSD that you mentally connect with a higher power except instead of a traditional god it's a fucked up combination of an elephant, hippo, squirrel, cat, and reptile like creature that doesn't have the power to actually do anything except produce cheese","Yo momma avenue","Hiking with the hoes","Border hoppers","Whoop WHOOOOPPPPPPPPP!!!!!","Getting jumped in a random New York alleyway by the Teenage Mutant Ninja Turtles","Getting fucked up worse than Mojo Jojo after fighting The Powerpuff Girls","Smoking cat piss","Daniel Larson","Ivan","White people when the pumpkin spice latte is back","Gerrymandering","Redlining","The DSM-5","Violence","AI","Communism","Frat guys","Sorority girls","The KKK","Going around asking people if they know the Muffin Man, and when they say then proceeding to scream 'THE MUFFIN MAN!!!'","Telling the Mexican cartel bad muchacho, no Chipotle for you","Every male getting castrated","Doxxing bullies online","Nazis","People that brag about their hometown having a high crime rate because they think it makes them look tougher","Gender affirming health care","Drag queens","The pussy magnet","Gynecology","Necrophilia","NFTs","Swifties","Alvin and The Chipmunks","Lightning McQueen","Getting dunked on","Bulldozing every national park and replacing it with Walmart supercenters","Tesla Cybertrucks","OCD","Schizophrenia","Depression","PTSD","Breakdancing very poorly","An innocent black man","Rodney King","Parkinson's disease","Extortion","Dickshooter, Idaho","When someone tries to relate to you when you're talking about a problem you have and their situation is not at all as serious as yours so you feel like they're taking your situation way less seriously then it actually is","Mormonism","Jehovah's Witnesses","Christians","Muslims","Atheists","Ibuprofen","Taking Tylenol while pregnant","Absolutely destroying bros asshole with swift efficiency","Everyone feeling bad for you when you tell them your uncle sexually assaulted you when you were young but you lowkey liked it","Banging the freshman baddies","Cock and ball torture","QAnon","Netflix finishing your search just for it to not have the movie or show you're looking for","Naked grandma","Leftist baddies","Sailing to Valhalla with only two slices of bread and a half-empty bottle of rum","Death via firing squad","Having a dream that feels extremely realistic in the moment, then waking up and realizing that the dream made absolutely no sense","Intentionally hiring women employees so you can severely underpay them, capitalism baby fuck yeah","King Von","Voting against people's basic human rights and claiming to be morally superior to everybody else","Health insurance","Big booty Latinas","Texting while driving","Being that extremely obnoxious upstairs neighbor","Laying on the bed staring at the ceiling realizing that nobody really loves you","Oddly specific dad jokes","Actually reading the terms and conditions","Burger King Foot Lettuce. The last thing you want in your Burger King burger is someone else's foot fungus. But as it turns out, that might be what you get","Reeeeeeed Robin. Yum","People that laugh at immigrants getting deported by ICE","Hot demon bitches near you","Extremely self-righteous leftists that just purity test other people on the left instead of actually doing anything that fucking matters","OJ Simpson","Radios that play shitty ass remixes of really good songs instead of just playing the original good songs","Trayvon Martin","Taking an LSD tab and listening to Come a Little Closer by Cage The Elephant","Blowing up an orphanage to smithereens","My fatass raccoon ankles","Radioactive cow nut","Furry child porn","Eastern European gay porn","Watching everybody improving their lives and making progress while you get left behind"]

  function mulberry32(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
  function seededShuffle(arr, rand){ let a = arr.slice(); for(let i=a.length-1;i>0;i--){ let j=Math.floor(rand()*(i+1)); [a[i],a[j]]=[a[j],a[i]] } return a }
  function formatSeed(s){ return s ? String(s) : String(Math.floor(Math.random()*9e9)) }
  function idGen(){ return 'p'+Math.random().toString(36).slice(2,9) }

  btnNew.addEventListener('click', ()=>{
    page2title.textContent = 'Create Lobby'
    createForm.style.display = 'flex'
    joinForm.style.display = 'none'
    lobbyView.style.display = 'none'
    showPage(2)
  })
  btnJoin.addEventListener('click', ()=>{
    page2title.textContent = 'Join Lobby'
    createForm.style.display = 'none'
    joinForm.style.display = 'flex'
    lobbyView.style.display = 'none'
    showPage(2)
  })
  backToMenuFromCreate.addEventListener('click', ()=> showPage(1))
  backToMenuFromJoin.addEventListener('click', ()=> showPage(1))

  createLobbyBtn.addEventListener('click', ()=>{
    const name = (createPlayerName.value || 'Host').trim()
    const seed = formatSeed(createLobbySeed.value.trim())
    const pass = createLobbyPassword.value.trim()
    const limit = parseInt(createLobbyLimit.value) || 0
    const rand = mulberry32(parseInt(seed.slice(0,9)))
    const pDeck = seededShuffle(playingCards, rand)
    const prDeck = seededShuffle(promptCards, rand)
    lobbies[seed] = {
      seed, pass, limit: limit>0?limit:0,
      players: [{name, id: idGen()}],
      playingDeck: pDeck.slice(),
      promptDeck: prDeck.slice(),
      discardPlaying: [],
      discardPrompt: [],
      votes: {},
      scores: {},
      submissions: [],
      currentCzar: null
    }
    currentLobby = lobbies[seed]
    currentLobby.players.forEach(p=>currentLobby.scores[p.id]=0)
    showLobby()
    lobbySeedLabel.textContent = seed
    lobbyPassLabel.textContent = pass? 'Yes' : 'No'
    lobbyLimitLabel.textContent = limit>0?String(limit):'unlimited'
    lobbyView.style.display = 'block'
  })

  joinExistingBtn.addEventListener('click', ()=>{
    const name = (joinPlayerName.value || 'Player').trim()
    const seed = (joinLobbySeed.value || '').trim()
    const passAttempt = (joinLobbyPassword.value || '').trim()
    if(!seed){ alert('Enter the lobby seed to join.'); return }
    const lobby = lobbies[seed]
    if(!lobby){ alert('No lobby found with that seed.'); return }
    if(lobby.pass && lobby.pass !== passAttempt){ alert('Wrong password for that lobby.'); return }
    if(lobby.limit>0 && lobby.players.length >= lobby.limit){ alert('Lobby is full.'); return }
    const p = { name, id: idGen() }
    lobby.players.push(p)
    lobby.scores[p.id] = 0
    currentLobby = lobby
    showLobby()
    lobbySeedLabel.textContent = seed
    lobbyPassLabel.textContent = lobby.pass? 'Yes' : 'No'
    lobbyLimitLabel.textContent = lobby.limit>0?String(lobby.limit):'unlimited'
    lobbyView.style.display = 'block'
  })

  function showLobby(){
    playersList.innerHTML = ''
    currentLobby.players.forEach(p=>{
      const d = document.createElement('div'); d.className='player-pill'; d.textContent = p.name; playersList.appendChild(d)
    })
    playersCount.textContent = currentLobby.players.length
    const activeVoterEl = document.getElementById('activeVoter')
    const activePlayerSelectEl = document.getElementById('activePlayerSelect')
    activeVoterEl.innerHTML = ''
    activePlayerSelectEl.innerHTML = ''
    currentLobby.players.forEach(p=>{
      const o = document.createElement('option'); o.value = p.id; o.textContent = p.name
      activeVoterEl.appendChild(o.cloneNode(true))
      activePlayerSelectEl.appendChild(o.cloneNode(true))
    })
  }

  addLocalPlayer.addEventListener('click', ()=>{
    const name = (fakePlayerName.value||'').trim(); if(!name) return
    if(currentLobby && currentLobby.limit>0 && currentLobby.players.length >= currentLobby.limit){ alert('Lobby full'); return }
    const p = { name, id: idGen() }
    currentLobby.players.push(p)
    currentLobby.scores[p.id] = 0
    showLobby()
    fakePlayerName.value = ''
  })

  leaveLobby.addEventListener('click', ()=>{
    currentLobby = null
    lobbyView.style.display = 'none'
    showPage(1)
  })

  startGameBtn.addEventListener('click', ()=>{
    if(!currentLobby) return
    if(currentLobby.players.length < 2 && !confirm('Less than 2 players. Start anyway?')) return
    currentLobby.votes = {}
    currentLobby.revoteCandidates = null
    populateVotePlayers()
    updateVotesStatus()
    showPage(3)
  })

  function populateVotePlayers(){
    votePlayers.innerHTML = ''
    currentLobby.players.forEach(p=>{
      const btn = document.createElement('div'); btn.className='player-pill'; btn.textContent=p.name; btn.dataset.pid=p.id
      btn.addEventListener('click', ()=>btn.classList.toggle('selected'))
      votePlayers.appendChild(btn)
    })
    activeVoter.value = currentLobby.players[0].id
  }

  castVote.addEventListener('click', ()=>{
    const voterId = activeVoter.value
    const highlighted = Array.from(votePlayers.querySelectorAll('.player-pill.selected')).map(n=>n.dataset.pid)
    if(highlighted.length !== 1){ alert('Please highlight exactly one player to vote for.'); return }
    currentLobby.votes[voterId] = highlighted[0]
    updateVotesStatus()
    checkAllVotes()
  })

  function updateVotesStatus(){ votesStatus.textContent = `${Object.keys(currentLobby.votes).length} / ${currentLobby.players.length}` }

  function checkAllVotes(){
    if(Object.keys(currentLobby.votes).length === currentLobby.players.length){
      const tally = {}
      Object.values(currentLobby.votes).forEach(v=>tally[v]=(tally[v]||0)+1)
      let max = 0
      for(const k in tally) if(tally[k]>max) max=tally[k]
      const winners = Object.keys(tally).filter(k=>tally[k]===max)
      if(winners.length===1){
        currentLobby.currentCzar = winners[0]
        prepareGameStart()
        showPage(4)
      } else {
        currentLobby.revoteCandidates = winners
        startRevote(winners)
      }
    }
  }

  function startRevote(cands){
    revoteBtn.style.display = 'inline-block'
    Array.from(votePlayers.children).forEach(el=>{
      el.style.display = cands.includes(el.dataset.pid) ? 'inline-flex' : 'none'
      el.classList.remove('selected')
    })
    currentLobby.votes = {}
    updateVotesStatus()
    revoteBtn.onclick = ()=>{ revoteBtn.style.display='none'; Array.from(votePlayers.children).forEach(el=>el.style.display='inline-flex') }
  }

  function prepareGameStart(){
    if(!currentLobby.playingDeck) currentLobby.playingDeck = seededShuffle(playingCards, mulberry32(parseInt(currentLobby.seed.slice(0,9))))
    if(!currentLobby.promptDeck) currentLobby.promptDeck = seededShuffle(promptCards, mulberry32(parseInt(currentLobby.seed.slice(0,9))))
    const czarId = currentLobby.currentCzar
    currentLobby.players.forEach(p=>{
      p.hand = p.id===czarId ? [] : drawMany(currentLobby.playingDeck,5,currentLobby)
      p.submitted = null
    })
    currentLobby.currentPrompt = drawOne(currentLobby.promptDeck,currentLobby)
    renderRound()
  }

  function drawOne(deck, lobby){
    if(!deck) return null
    if(deck.length===0){
      if(lobby===currentLobby){
        lobby.playingDeck = lobby.discardPlaying.splice(0).concat(lobby.playingDeck)
        lobby.promptDeck = lobby.discardPrompt.splice(0).concat(lobby.promptDeck)
      }
    }
    if(deck.length===0) return null
    return deck.shift()
  }
  function drawMany(deck,n,lobby){ const a=[]; for(let i=0;i<n;i++){ const x=drawOne(deck,lobby); if(x==null) break; a.push(x)} return a }

  function renderRound(){
    promptRemain.textContent = currentLobby.promptDeck.length
    playRemain.textContent = currentLobby.playingDeck.length
    currentCzar.textContent = playerNameById(currentLobby.currentCzar)
    promptCard.textContent = currentLobby.currentPrompt || 'No prompt left'
    czarPile.innerHTML = ''
    currentLobby.submissions = []
    updateScoreboard()
    activePlayerSelect.innerHTML = ''
    currentLobby.players.forEach(p=>{ const o = document.createElement('option'); o.value = p.id; o.textContent = p.name; activePlayerSelect.appendChild(o) })
    updateHandView()
    revealNext.onclick = revealNextCard
    czarChoose.onclick = czarConfirmChoice
    sendIt.onclick = playerSendIt
    autoReveal.onclick = ()=>{ while(revealNextCard()){} }
    nextRound.onclick = ()=> setupNextRound()
    revealNext.style.display = 'inline-block'
    czarChoose.style.display = 'none'
    nextRound.style.display = 'none'
  }

  function updateHandView(){
    const activeId = activePlayerSelect.value
    const me = currentLobby.players.find(p=>p.id===activeId)
    if(!me) return
    hand.innerHTML = ''
    if(activeId === currentLobby.currentCzar){
      handArea.style.display = 'none'
    } else {
      handArea.style.display = 'block'
      me.hand.forEach((c,idx)=>{
        const d = document.createElement('div'); d.className='play-card'; d.textContent=c; d.dataset.idx=idx
        d.addEventListener('click', ()=> d.classList.toggle('highlight'))
        hand.appendChild(d)
      })
    }
    renderCzarPile()
  }

  activePlayerSelect.addEventListener('change', updateHandView)

  function playerSendIt(){
    const activeId = activePlayerSelect.value
    if(activeId === currentLobby.currentCzar){ alert('Card czar does not send cards'); return }
    const me = currentLobby.players.find(p=>p.id===activeId)
    const highlighted = Array.from(hand.querySelectorAll('.play-card.highlight'))
    if(highlighted.length!==1){ alert('Highlight exactly one card to send'); return }
    const idx = Number(highlighted[0].dataset.idx)
    const card = me.hand.splice(idx,1)[0]
    currentLobby.submissions.push({card, playerId: me.id, revealed:false})
    const placeholder = document.createElement('div'); placeholder.className='play-card'; placeholder.textContent='Face-down card'; placeholder.dataset.subIndex = currentLobby.submissions.length-1
    czarPile.appendChild(placeholder)
    updateHandView()
    const needed = currentLobby.players.filter(p=>p.id !== currentLobby.currentCzar).length
    if(currentLobby.submissions.length === needed){ revealNext.style.display='inline-block' }
  }

  function renderCzarPile(){
    czarPile.innerHTML = ''
    currentLobby.submissions.forEach((s,idx)=>{
      const el = document.createElement('div'); el.className='play-card'; el.textContent = s.revealed ? s.card : 'Face-down card'; el.dataset.idx = idx
      if(s.revealed) el.classList.add('highlight')
      el.addEventListener('click', ()=>{
        if(currentLobby.currentCzar === activePlayerSelect.value){
          if(s.revealed){
            czarPile.querySelectorAll('.play-card').forEach(n=>n.classList.remove('selected'))
            el.classList.toggle('selected')
            czarChoose.style.display = el.classList.contains('selected') ? 'inline-block' : 'none'
          }
        }
      })
      czarPile.appendChild(el)
    })
  }

  function revealNextCard(){ const next = currentLobby.submissions.find(s=>!s.revealed); if(!next) return false; next.revealed = true; renderCzarPile(); return true }

  function czarConfirmChoice(){
    const selected = czarPile.querySelector('.play-card.selected'); if(!selected){ alert('Select a revealed card'); return }
    const idx = Number(selected.dataset.idx); const winnerId = currentLobby.submissions[idx].playerId
    currentLobby.scores[winnerId] = (currentLobby.scores[winnerId]||0) + 1
    currentLobby.discardPrompt.push(currentLobby.currentPrompt)
    currentLobby.submissions.forEach(s=>currentLobby.discardPlaying.push(s.card))
    currentLobby.currentCzar = winnerId
    nextRound.style.display='inline-block'
    revealNext.style.display='none'
    czarChoose.style.display='none'
    updateScoreboard()
  }

  function setupNextRound(){
    currentLobby.players.forEach(p=>{
      if(p.id !== currentLobby.currentCzar){
        while((p.hand.length||0) < 5){
          const card = drawOne(currentLobby.playingDeck,currentLobby)
          if(!card) break
          p.hand.push(card)
        }
      } else {
        if(!p.hand || p.hand.length===0){
          p.hand = drawMany(currentLobby.playingDeck,5,currentLobby)
        }
      }
      p.submitted = null
    })
    currentLobby.currentPrompt = drawOne(currentLobby.promptDeck,currentLobby)
    currentLobby.submissions = []
    renderRound()
  }

  function updateScoreboard(){ scoreboard.innerHTML = ''; currentLobby.players.forEach(p=>{ const d = document.createElement('div'); d.className='small muted'; d.innerHTML = `<strong style="color:#fff">${p.name}</strong> — ${currentLobby.scores[p.id]||0}`; scoreboard.appendChild(d) }) }

  endGameTop.addEventListener('click', ()=> endModal.style.display='flex')
  cancelEnd.addEventListener('click', ()=> endModal.style.display='none')
  confirmEnd.addEventListener('click', ()=>{ endModal.style.display='none'; prepareLeaderboard(); showPage(5) })

  function prepareLeaderboard(){
    const arr = currentLobby.players.map(p=>({name:p.name, score: currentLobby.scores[p.id]||0}))
    arr.sort((a,b)=>b.score - a.score)
    leaderboard.innerHTML = ''
    arr.forEach((r, idx)=>{
      const d=document.createElement('div'); d.className='card'; d.style.display='flex'; d.style.justifyContent='space-between'; d.style.alignItems='center'; d.style.marginTop='8px'
      d.innerHTML = `<div><strong>${idx+1}. ${r.name}</strong><div class="small muted">Prompt cards won: ${r.score}</div></div>`
      leaderboard.appendChild(d)
    })
  }

  backToMenu2.addEventListener('click', ()=>{ currentLobby = null; showPage(1) })

  function playerNameById(id){ const p = currentLobby.players.find(x=>x.id===id); return p? p.name : 'Unknown' }

  activePlayerSelect.addEventListener('change', updateHandView)
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ if(endModal.style.display==='flex') endModal.style.display='none' } })

})();
