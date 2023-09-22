
let colorPicker = document.getElementById('color-picker');
let strokeSizeSlider = document.getElementById('stroke-size');
let clearButton = document.getElementById('clear');
let modeSelect = document.getElementById('mode');

// Media Editor Settings Sliders
let angleSlider = document.getElementById('angleSlider');
let sizeHSlider = document.getElementById('sizeHSlider');
let sizeVSlider = document.getElementById('sizeVSlider');
let sizeSlider = document.getElementById('sizeSlider');
let durationSlider = document.getElementById('durationSlider');
let offsetInput = document.getElementById('offsetDuration');
let volumeSlider = document.getElementById('volumeSlider');

let baseVideoDiv = document.getElementById("base_video_div_")
let mediaDisplay = document.getElementById("mediaDisplay")

// Erase tool
let eraseMode = document.getElementById('eraseMode')
let eraseMain = document.getElementById('eraseMain')
let eraseDrawing = document.getElementById('eraseDrawing')
let eraseBoth = document.getElementById('eraseBoth')
let showEraser = false;
let ctxVal = false;

// The text Editor Tools and controls
let textEditor = document.getElementById('TextEditor');
let textInput = document.getElementById('textInput');
let fontSelector = document.getElementById('fontSelector');
let fontType = document.getElementById('fontType');
let fontSizeSelector = document.getElementById('fontSize');
let textAngleSlider = document.getElementById('textAngleSlider');
let textAngleValue = document.getElementById('textAngleValue');

// the art mode( draw, erase, add text, add media)
let mode = 'view';

// mouse moving position
let mouseX = video.width / 2;
let mouseY = video.height / 2;

// mosue down position
let mouseX2 = video.width / 2;
let mouseY2 = video.height / 2;

//the coordinates of the mouse
let coordinatesDisplay = document.getElementById('coordinates');
let coordinatesDisplay2 = document.getElementById('coordinates2');

// The active User made media libraries
var audioLibrary = []
var imageLibrary = []
var videoLibrary = []

// The Libraries
var imagesStr = "108-1083789_cringe-discord-emoji-clipart-png-download-transparent-png.png,156-1560918_25-asusgayqueerhoe-emoji.png,300-3006223gay_ahegao-ahegao-discord-emoji-sus-nasty-queer-weird-dumb-hoeduckface.png,350549-fartpoopbootycheeksmiddle.png,392103110_ANGRY_EMOJI_mad_hot.gif,3dcrytearseyeswatersad.gif,4-44224_shrugging-discord-emoji unsure dontknow.png,62182-middle.png,aleinanimatedspaceufo.gif,alienemojispace.png,alienspaceetemoji.png,angry.gif,angrymaskfacered.png,animated-devil-emoji-mad-enemybad.gif,apng1.png,arabindianturkturbanmanmuslimislam.png,armflexmuslcesstrongbuff.png,armswolebuffmuscle.png,arrowheart.png,asianmansoldiergreenberet.png,babyboylittlekidyoung.png,bagmoneypursechange.png,ballegaysushomodance.png,ballon.png,bamboocliff.png,bang-bang-discord-emoji-fight-violence.gif,bathshowercleandirtynastywash.png,beaming_face_with_smiling_eyes_256_2.gif,beating-red-heart-emoji-doodle.gif,bikinibraclothes.png,blankfaceunimpressed.png,blastexplodepopbang.png,blouseshirtclothes.png,blowakisssmooch.png,blowkissemoji.png,boatshipcaptainpirateemoji.png,bracesemoji.png,brideandgroomweddingring.png,briefcaseworkoffice.png,britishsoldier.png,building24.png,buildingburgerking.png,buildingoffice.png,buzzeddazedhighstoned.gif,calculatormathschool.jpg,cameradslrphotoelectronic.png,cartoonramsheep.png,caterpillarbugnastyinsect.png,checkmarkgreen.png,chefcusinetasteyummyfoodcook.png,chefs-kiss-emoji-ac11f2imaqahmhf2.gif,chinaorientaldollculturemath.png,christmastree.png,claphandspray.png,clipart.png,cloudrainsnowweatherhail.png,clowncryiconemoji.webp,coinpursebag.png,colorrobotdisco.png,computermonitorkeyboard.png,confusedemoji.png,cooknigknifecutslicestab.png,coolemoji.png,coupleloveromance.png,cringefaceemoji.png,cringegrimmacestunnedemoji.png,cringepanicworryshame.png,critical thinking pressuresweat-discord-emoji.png,crownkingqueenprincess.png,cryemojisadtears.gif,crysadlmaoemoji.png,crystreamemoji.gif,crytearscrazy.gif,cryyawnemojibaby.png,cupidangelhalobodyholyheaven.png,cuthairemoji.png,dab-emoji-lookatmedancehiphoprap.gif,dancespanishbiala.png,demonvampireblood.png,devilemoji.png,devilemojievilbad.png,devilfacemaddemon.png,disappearfastcloudzoomvoosh.png,disappointmentcringeshamepity.png,disappointsadbummedfrownconfused.png,disgustboredshamecringe.png,dogcaninek9animal.png,dressclothesfashion.png,droolnastysillycuteemojisusqueerwierd.jpg,earsbodypart.png,easrtemojicreepy.gif,eggplantveggievegtablefruitd.png,elephant.jpg,Emoji-Psck (100).png,Emoji-Psck (101).png,Emoji-Psck (109).png,Emoji-Psck (110).png,Emoji-Psck (113).png,Emoji-Psck (115).png,Emoji-Psck (123).png,Emoji-Psck (128).png,Emoji-Psck (129).png,Emoji-Psck (130).png,Emoji-Psck (136).png,Emoji-Psck (151).png,Emoji-Psck (152).png,Emoji-Psck (153).png,Emoji-Psck (157).png,Emoji-Psck (158).png,Emoji-Psck (159).png,Emoji-Psck (184).png,Emoji-Psck (185).png,Emoji-Psck (186).png,Emoji-Psck (187).png,Emoji-Psck (188).png,Emoji-Psck (190).png,Emoji-Psck (191).png,Emoji-Psck (192).png,Emoji-Psck (193).png,Emoji-Psck (194).png,Emoji-Psck (229).png,Emoji-Psck (230).png,Emoji-Psck (231).png,Emoji-Psck (232).png,Emoji-Psck (233).png,Emoji-Psck (238).png,Emoji-Psck (254).png,Emoji-Psck (260).png,Emoji-Psck (264).png,Emoji-Psck (283).png,Emoji-Psck (284).png,Emoji-Psck (285).png,Emoji-Psck (287).png,Emoji-Psck (289).png,Emoji-Psck (31).png,Emoji-Psck (32).png,Emoji-Psck (42).png,Emoji-Psck (43).png,Emoji-Psck (47).png,Emoji-Psck (49).png,Emoji-Psck (50).png,Emoji-Psck (51).png,Emoji-Psck (52).png,Emoji-Psck (53).png,Emoji-Psck (54).png,Emoji-Psck (55).png,Emoji-Psck (56).png,Emoji-Psck (58).png,Emoji-Psck (59).png,Emoji-Psck (62).png,Emoji-Psck (66).png,Emoji-Psck (67).png,Emoji-Psck (70).png,Emoji-Psck (72).png,Emoji-Psck (73).png,Emoji-Psck (74).png,Emoji-Psck (77).png,Emoji-Psck (84).png,Emoji-Psck (86).png,Emoji-Psck (87).png,Emoji-Psck (88).png,Emoji-Psck (94).png,Emoji-Psck (95).png,Emoji-Psck (96).png,Emoji-Psck (97).png,Emoji-Psck (98).png,Emoji-Psck (99).png,emoji-violet-demonevildevil.gif,emojis-music-beatstypedropsoundraprockemotraphiphopcountrygospelpop.gif,eyesfacesballs.png,familymomdadkid.png,feetprints.png,fistbump.png,foodcheeseburger.png,foodhamcheseburger.png,gaydudes.png,gemdiamond.png,giftboxpresentbirthday.png,gimmedatneckthoyoulooked.png,glasses.png,globespinearth.gif,goofiefaceslily.png,goofyemoji.png,goofypunksilly.png,graduationcapcollegeuniversityclasses.png,haertbroken.png,hairbarbershop.png,hairdress.jpg,haloangle.png,halogoodangle.png,handclap.png,handpeacesignsfingers.png,happyemoji.png,happygleepleasure.png,happygrinsmile.png,happyhandshug.png,happythumbsup.png,hatgarden1960lady1950.png,healthhospital.png,heartgift.png,heartshape.png,hellasussweatythristywierd.jpg,highheelbootshoe.png,highheelshoe.png,hijabmuslimterroristwoman.png,hoeemojihotcutethot.png,hospitalbluiding.png,hotfireburnroast.png,hotheatthristy_spicy_fuego.gif,hot_face_256_tired-thristy-wantswater.gif,househomerent.png,How-Many-Upvotes.gif,huhconfused unclear puzzled strange question emoji.png,hunteatangrycat.png,inloveemoji.png,iphonecalltextsmart.png,katanaswordmacheteharamexcutionsepukustabcutbeheaddieviolence.png,kawaiicatcuteplushie.png,kingqueencrown.png,kisslips.png,kisspng-smiley-discord-emoji-slack-emote-emoji-discord-android.jpg,kisspng-smiley-emoticon-animated-film-gif-5b2d0e1228e7e0.6245992415296793781676.jpg,kittenshocked.png,knifegunthuggangstermafiadumbhoodbangdieviolence.png,laughfunnyemojitears.png,laughmadcrazyinsanedanger.png,laughsmiletoungueout.png,laughtearsineye.png,laughwithtearsineyes.gif,lesbiancouple.png,liftedhadpraised.png,lightbulbelectricity.png,lipskissbbllipjobrhinoplastybotoxfillers.png,lockedsecuresafeprivate.png,love-cute-aww-peace-hug-trucemakeup_clear.gif,loveflowersemoji.png,lovehappyhug.gif,loveheartcircle.png,lovemailletter.png,lying-face_pinociho.png,magictricktophat.png,makeuplipstick.png,maskcovidvirusgermsbacteria.png,medichealth.png,messagecloudtxet.png,mind-blown-emoji-ng5fps7bt0pmdrmh.gif,mommasboykidsinglemotherblondiechildsupport.png,moneybag$.png,moneyflywingscash.png,moneyman.png,moneyrollingincashdollarsigneyes.gif,monkeyanimal.png,monkeyfaceanimalzoo.png,nails-makeup-vaintityfairbeautyemoji.gif,nasty-ugh-emoji.png,nerdsmartgeekemoji.gif,no-emoji-way-sike.gif,noiseclap.png,nopeconsentnaheww.png,nosefacebody.png,number0.png,number1.png,number10.png,number2.png,number5.png,number6.png,number7.png,number8.png,number9.png,numer3.png,numer4.png,okaysign.png,okaysignhand.png,okaysignpunchfaceemojifightviolence.png,oldladywomanageboomerracistgrandma.png,oldmanelderracistboomerage.png,paintfingernails.png,pants.png,party_face_emoji_fun_birthday_cake_celebrate.gif,peaceokaymeditategoatee.png,peopleusers.png,periodtbiglipbeautyshoerachettrashnailsextensionbimbohood-middle.png,personuser.png,phewreliefemoji.png,pillmedicinedrugsillegal.png,pinatapartyballons.png,piratehatemojithinking.png,playercoolfancyswaghardfresh.png,playlordjesusworshipholybiblegod.png,plussign.png,pointedhand.png,pointhandfinger.png,pointupanddown.png,pokerfaceeyeblankface.png,policelawjailcops.png,poopcrapstinkyshitdumpdookiechoclate.png,profilepic.png,profilepicother.png,puckerkissface.png,pumpkinscaryhalloween.png,queenwhiteblondgirlprincess.png,raindrops.png,realhandokaysignpowerupwhite.png,ringdiamondgem.png,robotemoji.png,robotIcon.png,romancestraight.png,runfearchasethristyfastquickpredatorprey.png,saddepressed.png,sadsunkedheaddepressed.png,santahohochristmas.png,satisfiedfinerelief.png,scarfclothescold.png,school.png,schoolbackpack.png,shamecringe-discord-emoji-embrass-emojis.png,shirttiesuitclothes.png,shockeddead.png,shockedemojistunned.png,shockedsuprised.png,shoefancyhighheelred.png,shoeleatherchurchformal.png,shoesjordannikehoopsports.png,shootingstarspaceorbit.png,sick vomit.gif,sickillvirusemoji.png,skullheaddeademoji.png,sleepboringsnoringzzz.png,smack face hit stung kiss puckeremoji-in-the-store-com-emojis.png,smartgeeknerdemoji.png,smilegun-discord-emoji-evil-violencedanger.png,smiley-emoji.gif,smiley.gif,smokethoughthughoodbuffbeastmacho.gif,smokeweeddrugpackopsdead.png,smoochkissemoji.png,soundIcon.png,spinningglobeicon.gif,stankyfartsmell.png,starcirclesconcussion.png,sticktongue.png,stonepizza.jpg,straightcouplerelatationship.png,stunnedshockfrozen.png,suicidegunviolenceemoji-cringe-die.png,sweatconcernedpuzzled.png,tanktopshirtclothes.png,tearcrysadfrown.png,teasetauntsillyemoji.png,thinking-emoji-30.webp,thonk-custom-emojis-for-discord-115629712990osoaio11m.png,thoughbuffsmokenose.png,thoughtbubblecloud.png,throwup-vomit-sick-nasty-gross-eww.gif,thumbsdown.png,thumbsupemoji.png,thumbup.png,tie.png,tongueout.png,toungesillyface.png,treeandhouse.png,tshirtbasicpoloclothes.png,tunicasianjapanchina.png,twerk-emojisusgayqueerbigbooty.gif,twirlhandsovertheheaddance.png,umbrellarainweather.png,unlockedopenunsecure.png,vacc.png,vomitemojisickill.png,vomiting-ill-sick-gross-nasty.gif,walkbumsadnerdshooterhipplainsuccess.png,waterdropsrain.png,weepmoancryemoji-nooooo.png,whiteboyblondblueeyes.png,widehappyopensmille.png,widesmileemoji.png,winkfaceemoji.png,worryconcernwatchprayshock.png,zzzzsleeptiredboring.png";
var images = imagesStr.split(",");
var audiosStr = "100115__noisecollector__raw_cat_vomiting.mp3,104920__ekokubza123__punch-remake.wav,162763__unfa__applause-4.flac,172490__geroglp__slap.mp3,216197__rsilveira_88__cartoon_punch_03.wav,216781__castironcarousel__punch-4.aiff,239594__xtrgamr__unimpressedyay_01.wav,246303__vikuserro__mad-dude.wav,246304__vikuserro__ey-shouting.wav,246305__vikuserro__excited.wav,246306__vikuserro__aroused.wav,246307__vikuserro__yes-decisive.wav,246308__vikuserro__vomiting.wav,246309__vikuserro__sadness.wav,246310__vikuserro__meh-vocal.wav,255540__xtrgamr__sarcastic-clapping.wav,257780__xtrgamr__man-oof.wav,277022__sandermotions__applause-1.wav,317382__tobiaskosmos__slap-to-the-face.wav,341011__vikuserro__ouch.wav,341012__vikuserro__yawning-just-woke-up.wav,341013__vikuserro__duck-dies.wav,341014__vikuserro__chainsaw.wav,341015__vikuserro__dog-hit.wav,341016__vikuserro__cleaning-teeth.wav,341017__vikuserro__chainsaw-ii.wav,341018__vikuserro__barking-2.wav,341019__vikuserro__go-away-bitch.wav,341020__vikuserro__dragon-sound.wav,341031__vikuserro__yahoo-jump.wav,341032__vikuserro__yeb-hitting.wav,341033__vikuserro__oh-no.wav,341034__vikuserro__mniam-mniam-hungry.wav,341035__vikuserro__hop-jump.wav,341036__vikuserro__hehehe-laughter.wav,341037__vikuserro__snooty-teen.wav,341038__vikuserro__sneezing.wav,341039__vikuserro__whiny-female.wav,341040__vikuserro__mad-father.wav,341041__vikuserro__dog-stimulation.wav,341042__vikuserro__snore.wav,347547__masgame__applause.mp3,370710__podsburgh__vomiting-on-the-ground-remixed.flac,388525__anko6__vomit.wav,399290__chestnutjam__gagging (1).wav,399290__chestnutjam__gagging.wav,419784__14gpanskamuzatko_matej__10-vomit-scream-male (1).wav,419784__14gpanskamuzatko_matej__10-vomit-scream-male.wav,442257__jonastisell__slap-with-reverb.mp3,445998__breviceps__fart-1.wav,448380__vikuserro__strong-man-lift.wav,47356__fotoshop__oof.wav,480682__craigsmith__r02-06-medium-crowd-applause.wav,51746__erkanozan__clap.wav,57813__timtube__pukeing.wav,58836__opposit__longfart1.wav,64128__ifartinurgeneraldirection__an-awesome-fart (1).mp3,64128__ifartinurgeneraldirection__an-awesome-fart.mp3,64130__ifartinurgeneraldirection__complaining-fart.mp3,64137__ifartinurgeneraldirection__splatter-fart.mp3,71037__ifartinurgeneraldirection__fart-20.mp3,71203__ifartinurgeneraldirection__morning-fart.mp3,amber-aleart-djlunatique.com.mp3,and checkmate.mp3,Andrew-Tate-DUMBASS-djlunatique.com.mp3,Andrew-Tate-I-AM-A-GIFT-TO-FEMALES-CREATED-BY-THE-ONE-ABOVE-djlunatique.com.mp3,Andrew-Tate-WHAT-COLOR-IS-YOUR-BUGATTI-djlunatique.com.mp3,Android-meme-djlunatique.com.mp3,angels-singing.mp3,angry-cat-djlunatique.com.mp3,animan-studios-theme_fEsuoxZ.mp3,anime-sneeze-djlunatique.com.mp3,anime-wow-sound-effect.mp3,Another-One-Meme-Sound-Effect-djlunatique.com.mp3,army-yelling-djlunatique.com.mp3,asian-person-laughing-djlunatique.com.mp3,ASMR-Chips-Sound-Effect-djlunatique.com.mp3,auuugh-djlunatique.com.mp3,ayy-stop.mp3,bad-to-the-bone.mp3,badMove.wav,bill-cosby-sounds-djlunatique.com.mp3,bing-chilling-meme-mp3-djlunatique.com.mp3,bing-chilling_fcdGgUc.mp3,Black-Man-Crying-Meme-djlunatique.com.mp3,boom-bam-bop-djlunatique.com.mp3,BoomBamBopBadaBopBoompPow-djlunatique.com.mp3,boondocks-easy-way-or-the-hard-way.mp3,boondocks-mans-butt.mp3,boondocks-massa-deez-nutz.mp3,boondocks-nibba-moment.mp3,boondocks-the-hard-way.mp3,Borat-if-you-dont-vote-for-him-he-will-take-power-djlunatique.com.mp3,Borat-She-must-be-tight-djlunatique.com.mp3,boring-djlunatique.com.mp3,Brahh-djlunatique.com.mp3,break-monitor-djlunatique.com.mp3,brrr-skibidi-dop-dop-djlunatique.com.mp3,calm-nature-sounds-djlunatique.com.mp3,can-I-put-my-balls-in-yo-jaws-sound-effect-djlunatique.com.mp3,cash-register-sound-fx.mp3,cash.mp3,censor-beep-1.mp3,checkmate.mp3,click.wav,Come on, let’s go outside We gonna fight.mp3,cr1tikal-is-registered.mp3,crownMoved.wav,cuteanimeroar_bybakster.mp3,daddy-chill-mcjuggernuggets-mp3cut.mp3,daequan-come-here-boy-sound-effect.mp3,damn-son-whered-you-find-this_2.mp3,danger-alarm-sound-effect-meme.mp3,dbz-teleport.mp3,death-by-deathclaws-fallout_-new-vegas.mp3,deez-nuts-got-eem-original-vine-mp3cut.mp3,Discord Leave Sound Effect - djlunatique.com.mp3,Discord-Leave-louader-djlunatique.com.mp3,dmx-bitch-please.mp3,do-me-a-favor-stfu-meme.mp3,donald-trump-fake-news-sound-effect.mp3,dragoballthememusic.mp3,drop.wav,easalert1_audacityoutput.mp3,EnemyCrowned.wav,EnemyDeposed.wav,error_windows XP.mp3,everybody-shut-the-fuck-up.mp3,excuse-me-bruh-sound-effect-djlunatique.com.mp3,explosion-roblox-djlunatique.com.mp3,fbi-open-up-sfx.mp3,free-twitch_fgjropa.mp3,fuck-it-all_C4QLyLJ.mp3,fuck-this-shit-im-out.mp3,fukthatbitch.mp3,GameStart.mp3,gandalf_shallnotpass.mp3,george-micael-wham-careless-whisper-1.mp3,german nazi mad-husband.wav,get-rickroll-djlunatique.com.mp3,get-shit-on-for-sound-audiotrimmer.mp3,gigachad-sound-affect-but-better-djlunatique.com.mp3,girl-stfu-i-dont-gotta-explain-sht-to-you-iamzoie-1-1_ztAb282.mp3,god-damn-1.mp3,gokuyelling.mp3,good-job_d15pHHg.mp3,goofy-ahh.mp3,goofy-yell.mp3,gulp-gulp-gulp.mp3,gunreload.mp3,gunshot-one.mp3,ha-gay.mp3,hallelujahshort.swf.mp3,He Need Some Milk Sound Effect.mp3,heres-what-immigrants-think-about-the-wall-original-video-audiotrimmer.mp3,hes-pulling-his-c-out.mp3,holy-final.mp3,Hot-nigga-djlunatique.com.mp3,hurryup.wav,i-like-ya-and-i-want-ya.mp3,illuminati-confirmed-hq.mp3,im-fast-as-f-boi.mp3,Im-scared-djlunatique.com.mp3,im-the-biggest-bird_4A73UnO.mp3,im-the-captain-now_8Zulh97.mp3,infant baby crying.mp3,insert-cash-or-select-payment-type.mp3,i_have_the_power_of_god_and_anime_on_my_side.mp3,Joker Why So Serious Sound Effect.mp3,kamehameha.swf.mp3,KingCrowned.wav,kingDeposed.wav,laugh-peter-griffin-nerdy-goofy.mp3,leroy-jenkins.swf.mp3,llorando-crying-baby.mp3,LoseGame.wav,man hit and hurt.wav,Man-crying-Sound-Effect-djlunatique.com.mp3,maro-jump-sound-effect_1.mp3,mc-hammer-u-cant-touch-this.mp3,merge.mp3,mlg-airhorn.mp3,more-than-water.mp3,Mr-Beast-DO-SPEAKERS-LIKE-SPRINKLES-djlunatique.com.mp3,Mr-Beast-DONALD-TRUMP-djlunatique.com.mp3,Mr-Beast-IF-YOU-LEAVE-IN-THE-NEST-5-MINUTES-ILL-GIVE-YOU-4000-DOLLARS-djlunatique.com.mp3,Mr-Beast-WHATS-UP-GUYS-djlunatique.com.mp3,mynameisjeff.mp3,naruto-the-raising-fighting-spirit-extended-audiotrimmer_7wvXRts.mp3,newTurn.wav,nfl.mp3,nioce.mp3,no homo.mp3,no-1-bullshit-guy.mp3,no-god-please-no-noooooooooo.mp3,nooo.mp3,nooo.swf.mp3,nope_01.mp3,nuclear-alarm-siren.mp3,ny-video-online-audio-converter.mp3,o-kurwa-djlunatique.com.mp3,oh-my-god-bro-oh-hell-nah-man.mp3,Oh-shit-djlunatique.com.mp3,ohhellno.mp3,ohhhhh-n.mp3,outro-song_oqu8zAg.mp3,over9000.swf.mp3,p-hub-intro.mp3,panjabi-mc-mundian-to-bach-ke-the-dictator-soundtrack-0s-7s-djztxj2gpfk.mp3,pause-that-shh.mp3,pause_KzBkT4p.mp3,pieceKilled.wav,pieceMove.wav,Plain-Jane-AsAP-Ferg-Sound-Effect-djlunatique.com.mp3,pokemon-red-blue-music-wild-pokemon-victory-theme-1.mp3,puking_and_diarrhea.mp3,record-scratch-2.mp3,rizz-sounds.mp3,run-vine-sound-effect_1.mp3,sacrfice-my-own-life-djlunatique.com.mp3,Sad Violin - Sound Effect.mp3,Seagull Beach Sound Effect.mp3,Seinfeld-Bass-Transition-djlunatique.com (1).mp3,Seinfeld-Bass-Transition-djlunatique.com.mp3,seinfeld-theme_1.mp3,sensational-future.mp3,she-belongs-to-the-streets-future-meme.mp3,shut-it-down.mp3,shut-the-fuck-up_FRj0JUo.mp3,shut-up-bitch-dwayne-the-rock-johnson.mp3,shut-up-djlunatique.com.mp3,sick-dragon.wav,sitcom-laughing-1.mp3,Slap-ahh-djlunatique.com.mp3,sleeping_HwTkaox.mp3,sound-effect-giveaway-2-he-needs-some-milk.mp3,sound-effect-gucci-gang-lil-pump_UvkSCOH.mp3,sponge-stank-noise.mp3,stewie-tuba.mp3,stfu-you-nasty-btch-1-75-speed-up.mp3,Stop-the-cap-right-now-djlunatique.com.mp3,surprise-motherfucker.mp3,swag-like-ohio.mp3,td_crying.mp3,td_cryingagain.mp3,they-ask-you-how-you-are-and-you-just-have-to-say-that-youre-fine-sound-effect_IgYM1CV.mp3,thisissparta.swf.mp3,tmp_7901-951678082.mp3,Tom-scream-djlunatique.com.mp3,tuba-knocked-out.mp3,tuba_1.mp3,tuba_hwu62g6.mp3,u-gae.mp3,uglygod.mp3,ultra-gay-seal_1.mp3,uncle-ruckus.mp3,unlce-ruckus-im-black-now.mp3,unlce-ruckus-rap-beef.mp3,unlce-ruckus-zoologist.mp3,untitled_1071.mp3,untitled_AqTw4cf.mp3,ur-mom-djlunatique.com.mp3,ussr-anthem-short2.mp3,vegeta-something-just-snapped_s9osoEc.mp3,video0-online-audio-converter_L0R7wUM.mp3,video0_k03U0Iy.mp3,vine-boom.mp3,waaaahwannn waring click sus among us soundfx.mp3,we-do-not-care_phB0mEB.mp3,wet-fart_1.mp3,What's your name sir my name is deez.mp3,what-are-you-doing-in-my-swamp-.mp3,what-did-you-say-boondocks.mp3,whiteman_3euyqUy.mp3,who-want-smoke.mp3,Why Are You Running Sound Effect - DJ Lunatique.mp3,Why You Coming Fast Sound Effect.mp3,Why-are-you-gay-Sound-Effect-djlunatique.com.mp3,Why-hello-there-old-sport-djlunatique.com.mp3,Wind Sound Effect.mp3,windows-xp-startup_1ph012N.mp3,WinGame.wav,wouldnt-let-that-shit-happen-to-me-tho_1u2eJEj.mp3,wrong-answer-sound-effect.mp3,wtf_boom.mp3,yanp.mp3,yeet-sound-effect.mp3,yeet_ivPgINo.mp3,you need to leave.mp3,you-stupid-ni_fEVypaY.mp3,you-what-spongebob.mp3,YouAreAnIdiot-djlunatique.com.mp3,Your-goofy-ahh-uncle-has-a-message-djlunatique.com.mp3,zias-stop-the-cap_RjHQpxU.mp3";
var audio = audiosStr.split(",");
var videosStr = "2004729902.mp4,arabian camels sahara desert.mp4,DASH_96 - Copy.mp4,Footage Of An Elephant - Copy.mp4,he dead gif.mp4,Human Feeding The Little Squirrel - Copy.mp4,istockphoto-1086141788-640_adpp_is.mp4,istockphoto-1093774894-mp4-480x480-is.mp4,istockphoto-1294840225-mp4-480x480-is.mp4,istockphoto-1313222815-640_adpp_is.mp4,istockphoto-1337392214-640_adpp_is.mp4,istockphoto-803611834-640_adpp_is.mp4,large-adult-brown-bear-relaxing-and-scratching-in-the-forest_hhtaknef__a5a1d685451329008fae4c4d8fcf0a2a__P360 - Copy.mp4,Pexels Videos 1508067.mp4,Pexels Videos 2122952.mp4,Pexels Videos 3616.mp4,Pexels Videos 3828.mp4,pexels-annushka-ahuja-7986157 (2160p).mp4,pexels-brixiv-8521554 (2160p).mp4,pexels-cottonbro-5274901 (2160p).mp4,pexels-cottonbro-5275085 (2160p).mp4,pexels-cottonbro-5275086 (2160p).mp4,pexels-olia-danilevich-6005323 (1080p).mp4,pexels-pnw-production-8979139 (1080p).mp4,pexels-rodnae-productions-7045332 (1080p).mp4,pexels-rodnae-productions-7187459 (1080p).mp4,pexels-rodnae-productions-8611526 (1080p).mp4,pexels-rodnae-productions-8611530 (1080p).mp4,pexels-rodnae-productions-8611631 (1080p).mp4,pexels-rodnae-productions-8611717 (1080p).mp4,pexels-taryn-elliott-5220279.mp4,pexels-yaroslav-shuraev-8478088 (2160p).mp4,production_id_4123371 (2160p).mp4,production_id_4267245 (2160p).mp4,production_id_4267252 (2160p).mp4,production_id_4267253 (2160p).mp4,production_id_4438081 (1080p).mp4,production_id_4440942 (1080p).mp4,production_id_4896508 (1080p).mp4,production_id_5192069 (1080p).mp4,production_id_5192072 (1080p).mp4,production_id_5192157 (1080p).mp4,swiggityswootybooty.mp4,testdummy.mp4,The Bear Suckled Her Cubs.mp4,video (1080p) (1).mp4,video (1080p).mp4,Video Of Goldfinches Eating.mp4,videoblocks-close-up-of-beautiful-grey-wolf-standing-in-the-forest-observing_h-p4vckgm__b4028b078dee273685f3e2c398327689__P360.mp4,videoblocks-close-up-of-large-adult-brown-bear-walking-free-in-the-forest-at-night_rnidmmbxz__a33c6960ec3b6639575f5e93dbcda765__P360.mp4,videoblocks-eurasian-wolf-canis-lupus-lupus-1_rwmtgm8ec__c6231f1487418053efa23e91f2e61b74__P360.mp4,videoblocks-lion-yawns-at-amsterdam-zoo_bqoumoog___d2c59e634f343d2c6ad630632f8bf41f__P360.mp4,videoblocks-male-lion-shakes-and-then-lays-on-grass_hrc6seyrd__124bdebf044b05ac8a08f66d08462d3e__P360.mp4"
var videos = videosStr.split(",");

// the unedited video displayed in the toolbox when a user click on a video preview
let base_video = document.getElementById('base_video');
let base_video_div = document.getElementById('base_video_div_');

//Handles the dragging of the toolbar around the DOM
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Handle the hiding and showing of the toolbox element
let toolbox = document.getElementById("toolbox");
let closeToolboxBtn = document.getElementById("closeToolboxBtn");
let openToolboxBtn = document.getElementById("openToolboxButton");

dragElement(toolbox);

// Click the white on red X button to close toolbox
closeToolboxBtn.addEventListener("click", () => {
    toolbox.style.display = "none";
    // openToolboxBtn.style.display = "block";
    console.log("toolbox closed");
})

// Click the Blue tool button to open the toolbox
openToolboxBtn.addEventListener("click", () => {
    // if (toolbox.style.display == "none"){
    toolbox.style.display = "block";
    // openToolboxBtn.style.display = "none";
    console.log("toolbox opened");
    // }     
})

//clicking on this button will clear the selected canvases
clearButton.addEventListener('click', () => {
    mainCTX.clearRect(0, 0, drawCanvas.width, drawCanvas.height); 
    tempMediaCTX.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
});

// Save the canvas image
let saveCanvasButton = document.getElementById('saveCanvas');
let saveScreenshotButton = document.getElementById('saveScreenshot');

// Save the screenshot of the canvas overlay
saveCanvasButton.addEventListener('click', () => {
    let link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = drawCanvas.toDataURL('image/png');
    link.click();
});

// save the screenshot of the video and canvas overlay
saveScreenshotButton.addEventListener('click', () => {
    let temporaryCanvas = document.createElement('canvas');
    let temporaryCtx = temporaryCanvas.getContext('2d');

    temporaryCanvas.width = video.videoWidth;
    temporaryCanvas.height = video.videoHeight;

    // Draw the video frame to the temporary drawCanvas.
    temporaryCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // Then draw the main canvas (drawing) on top of that.
    temporaryCtx.drawImage(drawCanvas, 0, 0);

    // Now save this composite image.
    let link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = temporaryCanvas.toDataURL('image/png');
    link.click();
});

var userVideoPreviewDiv = document.getElementById('userVideoPreviewDiv');
var userVideoPreview = document.getElementById('userVideoPreview');
// Accessing the user camera and video.
navigator.mediaDevices
    .getUserMedia({
        video: true,
        audio: true,
    })
    .then((stream) => {

        // Changing the source of video to current stream.
        userVideoPreview.srcObject = stream;
        userVideoPreview.addEventListener("loadedmetadata", () => {
            userVideoPreview.play();
        });
    })
    .catch(alert);

// MODE SELECTOR
// This drop down menu is used to select the draw mode: draw, erase, add media, etc.
modeSelect.addEventListener('change', (e) => {

    mode = e.target.value;
    eraseCTX.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    var StrokeSizeEditor = document.getElementById('StrokeSizeEditor');
    var ColorEditor = document.getElementById('ColorEditor');
    var submitButtons = document.getElementById('submitDrawing');
    var mousePositions = document.getElementById('mousePositions');

    if (mode === 'view') {
        submitButtons.style.display = 'none';
        drawCanvas.style.display = 'none';
        mainCanvas.style.cursor = 'default';
        eraseCanvas.style.display = 'none';
        textCanvas.style.display = 'none';
        ColorEditor.style.display = 'none';
        StrokeSizeEditor.style.display = 'none';
        mousePositions.style.display = 'none';
        StrokeSizeEditor.style.display = 'none';
    } else {
        submitButtons.style.display = 'block';
        mousePositions.style.display = 'block';
    }

    if (mode === 'draw') {
        drawCanvas.style.display = 'block';
        drawCanvas.style.cursor = 'crosshair';
        drawCanvas.style.backgroundColor = '#ffffff40';
        eraseCanvas.style.display = 'none';
        textCanvas.style.display = 'none';
        ColorEditor.style.display = 'block';
        StrokeSizeEditor.style.display = 'flex';
    }

    if (mode === 'erase') {
        drawCanvas.style.display = 'block';
        eraseCanvas.style.cursor = 'none';
        eraseCanvas.style.display = 'block';
        textCanvas.style.display = 'none';
        ColorEditor.style.display = 'none';
        StrokeSizeEditor.style.display = 'flex';
        eraseMode.style.display = 'block';
    } else {
        eraseCanvas.style.display = 'none';
        eraseMode.style.display = 'none';
    }

    if (mode === 'text') {
        textCanvas.style.cursor = 'move';
        eraseCanvas.style.display = 'none';
        textCanvas.style.display = 'block';
        ColorEditor.style.display = 'block';
        StrokeSizeEditor.style.display = 'none';
        textEditor.style.display = 'block';
        document.getElementById("textAngleSlider").style.display = 'block';
    } else {
        textEditor.style.display = 'none';
        textCanvas.style.display = 'none';
        textCTX.clearRect(0, 0, textCanvas.width, textCanvas.height);
        document.getElementById("textAngleSlider").style.display = 'none';
    }

    if (mode === 'addMedia') {
        mediaContainer.style.display = 'block';
        mediaCanvas.style.display = 'block';
        drawCanvas.style.display = 'none';
        mediaCanvas.style.cursor = 'move';
        ColorEditor.style.display = 'none';
        StrokeSizeEditor.style.display = 'none';
    } else {
        mediaContainer.style.display = 'none';
        mediaCanvas.style.display = 'none';
        mediaCanvas.style.cursor = 'regular';
    }

    if (mode === 'editLiveVideo') {
        submitButtons.style.display = 'none';
        drawCanvas.style.display = 'none';
        mainCanvas.style.cursor = 'default';
        eraseCanvas.style.display = 'none';
        textCanvas.style.display = 'none';
        ColorEditor.style.display = 'none';
        StrokeSizeEditor.style.display = 'none';
        mousePositions.style.display = 'none';
        StrokeSizeEditor.style.display = 'none';
        userVideoPreviewDiv.style.display = 'block';
        userVideoPreview.muted = false;
        userVideoPreview.srcObject = videoPreview.srcObject;
    } else {
        submitButtons.style.display = 'block';
        mousePositions.style.display = 'block';
        userVideoPreviewDiv.style.display = 'none';
        userVideoPreview.muted = true;
    }

});

// clicking on this button will finalize the image and render it arcoss the stream on the selected stream
let doneBtn = document.getElementById('doneBtn');
doneBtn.addEventListener('click', () => {
    if (mode == "text")
        finalizeText();
    if (mode == "addMedia")
        finalizeMedia();
    if (mode == "draw")
        finalizeDrawing();
});

// Clicking on this button will do nothing for now, but should render an drawing 
// on another users stream visible to all others on the call
let sendBtn = document.getElementById('sendBtn');
sendBtn.addEventListener('click', () => {
    ctxVal = !ctxVal
    if (ctxVal)
        sendBtn.style.background = "lightblue";
    else
        sendBtn.style.background = "lightgrey";
});


// ----------Angle Slider control
textAngleSlider.addEventListener('input', () => {
    textAngleValue.value = textAngleSlider.value;
    renderTextPreview();
});
textAngleValue.addEventListener('input', () => {
    textAngleSlider.value = textAngleValue.value;
    renderTextPreview();
});

// Eqaul Ratio Size Slider
let sizeValue = document.getElementById('sizeValue');
sizeSlider.addEventListener('input', () => {
    sizeValue.value = sizeSlider.value;
    renderImagePreview();
});
sizeValue.addEventListener('input', () => {
    sizeSlider.value = sizeValue.value;
    renderImagePreview();
});

// Horizontal Size Slider
let sizeHValue = document.getElementById('sizeHValue');
sizeHSlider.addEventListener('input', () => {
    sizeHValue.value = sizeHSlider.value;
    renderImagePreview();
});
sizeHValue.addEventListener('input', () => {
    sizeHSlider.value = sizeHValue.value;
    renderImagePreview();
});

// Vertical Size Slider
let sizeVValue = document.getElementById('sizeVValue');
sizeVSlider.addEventListener('input', () => {
    sizeVValue.value = sizeVSlider.value;
    renderImagePreview();
});
sizeVValue.addEventListener('input', () => {
    sizeVSlider.value = sizeVValue.value;
    renderImagePreview();
});

//Media Image Angle Slider
let angleValue = document.getElementById('angleValue');
angleSlider.addEventListener('input', () => {
    angleValue.value = angleSlider.value;
    angle =  angleSlider.value;
    renderImagePreview();
});
angleValue.addEventListener('input', () => {
    angleSlider.value = angleValue.value;
    renderImagePreview();
});

// Video and Sound Volume Slider
let volumeValue = document.getElementById('volumeValue');
volumeSlider.addEventListener('input', () => {
    volumeValue.value = volumeSlider.value;
});
volumeValue.addEventListener('input', () => {
    volumeSlider.value = volumeValue.value;
});



// ---------- Video Preview Playback--------------- //

// this will go back to the video search results and close the video preview
let videoBackBtn = document.getElementById('videoBackBtn');
videoBackBtn.addEventListener('click', () => {
    mediaDisplay.style.display = "block";
    baseVideoDiv.style.display = "none";
});

// Play and pause the base video
const playPauseBtn = document.getElementById('playPauseBtn');
playPauseBtn.addEventListener('click', () => {
    if (base_video.paused) {
        base_video.play();
        playPauseBtn.textContent = "Pause";
    } else {
        base_video.pause();
        playPauseBtn.textContent = "Play";
    }
});

//  the event for when the video is loadin its data.
//  update the video slider data with the correct durations
base_video.addEventListener('loadedmetadata', () => {
    // Set the max values of sliders to the video duration
    mediaStartSlider.max = base_video.duration;
    mediaStopSlider.max = base_video.duration;
    mediaStopSlider.value = base_video.duration;

    // Update labels
    mediaStartValue.textContent = mediaStartSlider.value;
    mediaStopValue.textContent = mediaStopSlider.value;

});

// Update the play times for the range of the video playback
base_video.addEventListener('timeupdate', () => {
    if (base_video.currentTime >= mediaStopSlider.value) {
        base_video.currentTime = mediaStartSlider.value;
    }
});

// the starting of the sound and video duration
let mediaStartSlider = document.getElementById('mediaStart');
let mediaStartValue = document.getElementById('mediaStartValue');
mediaStartSlider.addEventListener('input', () => {
    mediaStartValue.innerText = mediaStartSlider.value;
});
mediaStartValue.addEventListener('input', () => {
    mediaStartSlider.value = mediaStartValue.value;
});

// the ending of the sound and the video duration
let mediaStopSlider = document.getElementById('mediaStop');
let mediaStopValue = document.getElementById('mediaStopValue');
mediaStopSlider.addEventListener('input', () => {
    mediaStopValue.innerText = mediaStopSlider.value;
});
mediaStopValue.addEventListener('input', () => {
    mediaStopSlider.value = mediaStopValue.value;
});

//    ----------  Search and Library Mode -----------    ///

// Media search Buttons

const mediaContainer = document.getElementById('mediaContainer');
const mediaTabs = document.querySelectorAll('.mediaTab');
const imageSettings = document.getElementById('imageSettings');
const audioVideoSettings = document.getElementById('audioVideoSettings');

// Media search Buttons

const imageBtn = document.getElementById('imageBtn');
const audioBtn = document.getElementById('audioBtn');
const videoBtn = document.getElementById('videoBtn');
let mediaSearchText = document.getElementById('mediaSearchType');

// Click on the Image tab button
imageBtn.addEventListener('click', () => {
    mediaType = 'image';
    mediaSearchText.innerText = 'Image';
    imageSettings.style.display = 'block';
    audioVideoSettings.style.display = 'none';
    document.getElementById('timeDiv').style.display = 'block'
    base_video_div.style.display = 'none';
    mediaDisplay.style.display = 'block';
    search4Media();
});

// Click on the video tab button
videoBtn.addEventListener('click', () => {
    mediaType = 'video';
    mediaSearchText.innerText = 'Video';
    imageSettings.style.display = 'block';
    document.getElementById('base_audio').style.display = 'none'
    audioVideoSettings.style.display = 'block';
    mediaDisplay.style.display = 'block';
    document.getElementById('timeDiv').style.display = 'none'
    search4Media();
});

// Click on the Audio tab button
audioBtn.addEventListener('click', () => {
    mediaType = 'audio';
    mediaSearchText.innerText = 'Audio';
    audioVideoSettings.style.display = 'block';
    document.getElementById('base_audio').style.display = 'block'
    document.getElementById('timeDiv').style.display = 'none'
    base_video_div.style.display = 'none';
    mediaDisplay.style.display = 'block';
    search4Media();
});

// Change the color of the selected tab and reset the rest.
mediaTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        mediaTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        tab.addEventListener('click', () => {
            mediaType = tab.dataset.tab;
            console.log("searching for: " + mediaType + 's');
        });
    });
});

// clicking preforms the search
const goButton = document.getElementById('goButton');
// type the search into the searchbar
const searchBar = document.getElementById('searchBar');
// display the results
const resultList = document.getElementById('mediaList');

let mediaType = 'image';

// this function which search for the media type in the search bar
function search4Media() {
    if (searchBar.value.length > 2 || searchBar.value == "") {
        let files;
        // Set the active library to the media type
        if (mediaType == 'image') {
            if (libraryMode.checked) {
                files = imageLibrary;
            } else {
                files = images;
            }
        }
        if (mediaType == 'audio') {
            if (libraryMode.checked) {
                files = audioLibrary;
            } else {
                files = audio;
            }
        }
        if (mediaType == 'video') {
            if (libraryMode.checked) {
                files = videoLibrary;
            } else {
                files = videos;
            }
        }

        search = searchBar.value;
        search = search.toLowerCase();

        let x = files;
        var matches = [];
        // console.log("searching for: ", search, " in ", fullImgList);
        for (i = 0; i < x.length; i++) {
            if (x[i].toLowerCase().includes(search)) {
                // x[i].style.display = "none";
                matches.push(x[i]);
                // x[i].style.display = "";
            }
        }

        // console.log("Matching Search Results: ", matches)

        // Clear existing list
        resultList.innerHTML = '';
        // for each of the matches to this:
        matches.forEach(file => {
            if (mediaType == 'video') {
                let videoPreview = document.createElement('video');
                videoPreview.id = "list";
                videoPreview.clicked = false;

                videoPreview.style.borderRadius = '3px';
                videoPreview.style.padding = '3px';
                videoPreview.style.margin = '3px';
                mediaLink = file;

                videoPreview.src = "./media/video/" + mediaLink;
                videoPreview.height = 64;
                videoPreview.width = 96;

                //mute the video preview in the media result list
                videoPreview.volume = 0;

                videoPreview.addEventListener('mouseenter', () => {
                    videoPreview.play();
                })

                videoPreview.addEventListener('mouseleave', () => {
                    videoPreview.pause();
                })

                videoPreview.addEventListener('click', () => {

                    document.querySelectorAll('#list').forEach(item => {
                        item.style.background = 'white';
                    });

                    if (libraryMode.checked) {
                        if (removeFromLibrary) {
                            // Search for the item to remove
                            const index = videoPreview.indexOf(file);
                            // Remove the item
                            videoPreview.splice(index, 1);
                            // delete the item from the screen/DOM
                            videoPreview.remove();
                        }
                    }

                    if (videoPreview.clicked == true) { // if deselecting the video preview
                        videoPreview.style.background = 'white';
                        mediaLink = "";
                        videoPreview.clicked = false;
                        base_video.src = "./media/video/Loading.mp4";
                        baseVideoDiv.style.display = "none";
                        mediaDisplay.style.display = "block";
                    }
                    else { //selecting the video preview
                        videoPreview.style.background = 'lightblue';
                        mediaLink = file;
                        videoPreview.clicked = true;
                        base_video.src = `./media/video/${mediaLink}`;
                        base_video.src = videoPreview.src
                        base_video.play();
                        let width = parseInt(sizeSlider.value) / 100 * 320;
                        let height = parseInt(sizeSlider.value) / 100 * 240;
                        console.log("Dimensions: (" + width + "," + height + ")");

                        baseVideoDiv.style.display = "block";
                        mediaDisplay.style.display = "none";
                        // let mediaCTX = mediaCanvas.getContext('2d');
                        drawVideo();
                    }
                });

                //
                videoPreview.addEventListener('dblclick', () => {
                    var searchMode = document.getElementById('search')
                    if (searchMode.checked) {
                        videoPreview.style.background = 'lightgreen';
                        mediaLink = file;
                        videoPreview.clicked = true;
                        videoLibrary.push(file)
                        var result = removeDuplicates(videoLibrary);
                        console.log("Library: " + result)
                    }
                });
                resultList.appendChild(videoPreview);
            }

            if (mediaType == 'audio') {

                let listItem = document.createElement('div');
                if (file.length > 30) {
                    listItem = document.createElement('marquee');
                }
                listItem.id = "list";
                listItem.clicked = false;
                listItem.textContent = file;
                listItem.style.border = '2px solid black';
                listItem.style.padding = '5px';
                listItem.style.margin = '3px';
                listItem.style.background = 'white';
                listItem.addEventListener('click', () => {

                    if (libraryMode.checked) {
                        if (removeFromLibrary) {
                            // Search for the item to remove
                            const index = audioLibrary.indexOf(file);
                            // Remove the item
                            audioLibrary.splice(index, 1);
                            // delete the item from the screen/DOM
                            listItem.remove();
                        }
                    }

                    var base_audio = document.getElementById('base_audio');

                    document.querySelectorAll('#list').forEach(item => {
                        item.style.background = 'white';
                    });

                    if (listItem.clicked == true) {
                        listItem.style.background = 'white';
                        mediaLink = "";
                        listItem.clicked = false;
                        // base_audio.src = `./media/audio/${mediaLink}`;

                    }
                    else {
                        listItem.style.background = 'lightblue';
                        mediaLink = file;
                        listItem.clicked = true;
                        base_audio.src = `./media/audio/${mediaLink}`;
                        base_audio.play();
                    }
                });

                listItem.addEventListener('dblclick', () => {
                    var searchMode = document.getElementById('search')
                    if (searchMode.checked) {
                        listItem.style.background = 'lightgreen';
                        mediaLink = file;
                        listItem.clicked = true;
                        audioLibrary.push(file)
                        var result = removeDuplicates(audioLibrary);
                        console.log("Library: " + result)
                    }
                });

                resultList.appendChild(listItem);
            }

            if (mediaType == 'image') {

                mediaLink = file;

                let thumbnail = new Image()
                thumbnail.src = "./media/image/" + mediaLink;
                thumbnail.height = 64;
                thumbnail.width = 64;
                thumbnail.id = "list";
                thumbnail.style.padding = '5px';
                thumbnail.style.margin = '3px';
                thumbnail.style.borderRadius = '3px';
                thumbnail.clicked = false;

                thumbnail.addEventListener('click', () => {
                    if (libraryMode.checked) {
                        if (removeFromLibrary) {
                            // Search for the item to remove
                            const index = imageLibrary.indexOf(file);
                            // Remove the item
                            imageLibrary.splice(index, 1);
                            // delete the item from the screen/DOM
                            thumbnail.remove();
                        }
                    }
                    if (thumbnail.clicked == true) {
                        thumbnail.style.background = '';
                        mediaLink = "";
                        thumbnail.clicked = false;
                    }
                    else {
                        document.querySelectorAll('#list').forEach(item => {
                            item.style.background = '';
                        });
                        thumbnail.style.background = 'lightblue';
                        mediaLink = file;
                        thumbnail.clicked = true;
                    }
                });

                thumbnail.addEventListener('dblclick', () => {
                    var searchMode = document.getElementById('search')
                    if (searchMode.checked) {
                        thumbnail.style.background = 'lightgreen';
                        mediaLink = file;
                        thumbnail.clicked = true;
                        imageLibrary.push(file)
                        var result = removeDuplicates(imageLibrary);
                        console.log("Library: " + result)
                    }
                });
                // add the item to the list in the media display div
                resultList.appendChild(thumbnail);
            }

            // if the media link is not empty, render the linked media to the canvas
            if (!(mediaLink == "")) {
                renderImagePreview()
            }
        });
    }
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);;
}

// Click this button will remove all images that are clicked from the library
var removeFromLibrary = false;
var removeButton = document.getElementById('removeButton');
removeButton.addEventListener('click', () => {
    removeFromLibrary = !removeFromLibrary;
    if (removeFromLibrary)
        removeButton.style.background = "red"
    else
        removeButton.style.background = ""
    console.log(removeFromLibrary)
});

// Search for new media to use
var searchMode = document.getElementById('search')
searchMode.addEventListener('click', () => {
    removeButton.style.display = 'none';
    search4Media();
});

// Switch to using media stored in the Library, Library mode
var libraryMode = document.getElementById('library')
libraryMode.addEventListener('click', () => {
    removeButton.style.display = 'block';
    mediaList.innerHTML = '';
    search4Media();
});

// Execute a function when the user presses a key on the keyboard
searchBar.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        goButton.click();
    }
});

// When the button is clicked do the search
goButton.addEventListener('click', () => {
    search4Media();
});

var editMode = "simple";
var HsizeSliderDiv = document.getElementById("HsizeSliderDiv");
var VsizeSliderDiv = document.getElementById("VsizeSliderDiv");
var SsizeSliderDiv = document.getElementById("SsizeSliderDiv");
var messageDiv = document.getElementById("messageDiv");
var timeDiv = document.getElementById("timeDiv");
var timeValue = document.getElementById("timeValue");
timeValue.value = 5;

// When the button is clicked do the switch to advanced edit mode
var advanceMode = document.getElementById("advancedEdits");
advanceMode.addEventListener('click', () => {
    editMode = "advanced";
    HsizeSliderDiv.style.display = "flex";
    VsizeSliderDiv.style.display = "flex";
    SsizeSliderDiv.style.display = "none";
    messageDiv.style.display = "flex";
    timeDiv.style.display = "flex";
    timeValue.value = 5;
});

// When the button is clicked do the switch to simple edit mode
var simpleMode = document.getElementById("simpleEdits");
simpleMode.addEventListener('click', () => {
    editMode = "simple";
    HsizeSliderDiv.style.display = "none";
    VsizeSliderDiv.style.display = "none";
    SsizeSliderDiv.style.display = "flex";
    messageDiv.style.display = "none";
    timeDiv.style.display = "none";
    timeValue.value = 5;
});

mediaMessage = document.getElementById("mediaMessage");
mediaMessage.addEventListener('click', ()=>{
    
})

// let eraseMode;
/// erasing mode
eraseBoth.addEventListener("click", () => {
    drawCanvas.style.backgroundColor = '#ffffff40';
    drawCanvas.style.display = 'block';
    eraseDrawing.checked = false;
    eraseMain.checked = false;
})

eraseMain.addEventListener("click", () => {
    drawCanvas.style.backgroundColor = '#ffffff00';
    drawCanvas.style.display = 'none';
    eraseBoth.checked = false;
    eraseDrawing.checked = false;
})

eraseDrawing.addEventListener("click", () => {
    drawCanvas.style.backgroundColor = '#ffffff80';
    drawCanvas.style.display = 'block';
    eraseBoth.checked = false;
    eraseMain.checked = false;
})

// let pencilMode = document.getElementById("pencilMode");
// pencilMode.addEventListener("click", () => {
//     pencilMode.checked = true;
//     eraserMode.checked = false;
// })

// let eraserMode = document.getElementById("eraserMode");
// let drawMode = document.getElementById("drawMode");
// eraserMode.addEventListener("click", () => {
//     pencilMode.checked = false;
//     eraserMode.checked = true;

//     drawCanvas.style.display = 'block';
//     eraseCanvas.style.cursor = 'none';
//     eraseCanvas.style.display = 'block';
//     textCanvas.style.display = 'none';
//     ColorEditor.style.display = 'none';
//     StrokeSizeEditor.style.display = 'flex';
//     eraseMode.style.display = 'block';
//     mode == "erase";
// })