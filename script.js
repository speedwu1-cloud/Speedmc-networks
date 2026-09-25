/*
  MODIFIE TES JOUEURS ICI.
  - name : pseudo Minecraft
  - wins : nombre de victoires
  - bestTime : meilleur temps au format "MM:SS"
  Laisse name vide pour une place encore libre.
*/

const players = [
  {name:"Blackhole55", wins:19, bestTime:"23:89"},
  {name:"1joo", wins:42, bestTime:"18:32"},
  {name:"javekv", wins:25, bestTime:"20:41"},
  {name:"kwaxx_", wins:18, bestTime:"22:15"},
  {name:"Playmo", wins:12, bestTime:"24:30"},
  {name:"Bob", wins:7, bestTime:"28:12"},
  {name:"teacup_11", wins:78, bestTime:"11:43"},
  {name:"wrased", wins:21, bestTime:"34:04"},
  {name:"hahabyebyelol", wins:65, bestTime:"19:98"},
  {name:"K0mbit0", wins:25, bestTime:"30:67"},
  {name:"SilverYHQ", wins:19, bestTime:"21:32"},
  {name:"MeowLord", wins:25, bestTime:"20:05"},
  {name:"Diabo_X_Deus", wins:26, bestTime:"21:41"},
  {name:"Miscomputation", wins:22, bestTime:"20:89"},
  {name:"Pozz1tifon", wins:20, bestTime:"20:96"},
  {name:"Xewg", wins:20, bestTime:"21:41"},
  {name:"ateguts", wins:18, bestTime:"20:88"},
  {name:"Mouhns", wins:19, bestTime:"21:18"},
  {name:"ngga7", wins:32, bestTime:"19:23"},
  {name:"sqpphic", wins:29, bestTime:"21:23"},
  {name:"ventash", wins:15, bestTime:"31:56"},
  {name:"vampcpvp", wins:42, bestTime:"19:43"},
  {name:"Jemslord29", wins:39, bestTime:"19:87"},
  {name:"modrnith", wins:20, bestTime:"21:43"},
  {name:"1AlphaMiniYT", wins:20, bestTime:"22:06"},
  {name:"Zephite", wins:42, bestTime:"18:25"},
  {name:"wwwaax15", wins:42, bestTime:"18:30"},
  {name:"LARPurpled", wins:41, bestTime:"20:58"},
  {name:"RevLolLynx3jh", wins:39, bestTime:"19:85"},
  {name:"whent", wins:34, bestTime:"21:01"},
  {name:"ZeroSkill_Gaming", wins:20, bestTime:"20:03"},
  {name:"amogusplayer69", wins:23, bestTime:"20:77"},
  {name:"21vex", wins:21, bestTime:"20:77"},
  {name:"latterite", wins:21, bestTime:"24:31"},
  {name:"OkkotsuMC", wins:20, bestTime:"24:48"},
  {name:"antoheart", wins:21, bestTime:"24:96"},
  {name:"Tatsumi_omg", wins:19, bestTime:"21:33"},
  {name:"Gatt0uz_", wins:21, bestTime:"20:33"},
  {name:"m4ng0_x", wins:22, bestTime:"20:99"},
  {name:"BegeelCH", wins:20, bestTime:"21:11"},
  {name:"FatalSteve", wins:23, bestTime:"21:03"},
  {name:"Lewiatan67", wins:20, bestTime:"20:55"},
  {name:"Ashtonig", wins:23, bestTime:"21:88"},
  {name:"Rushedly", wins:20, bestTime:"21:37"},
  {name:"ShinyYahir", wins:22, bestTime:"20:99"},
  {name:"strateqy", wins:21, bestTime:"20:66"},
  {name:"randomw0rld", wins:25, bestTime:"28:07"},
  {name:"noiresxz", wins:20, bestTime:"21:40"},
  {name:"KVN29", wins:21, bestTime:"20:86"},
  {name:"TheWo1f", wins:20, bestTime:"21:38"}
];

const $ = s => document.querySelector(s);
const timeToSeconds = t => {
  if(!t || t === "--:--") return Infinity;
  const p=t.split(":").map(Number);
  return p.length===2 ? p[0]*60+p[1] : Infinity;
};

let sortMode = "wins";

function sortedPlayers(){
  const list = players.filter(p => p.name.trim());
  if(sortMode==="time") return [...list].sort((a,b)=>timeToSeconds(a.bestTime)-timeToSeconds(b.bestTime));
  if(sortMode==="name") return [...list].sort((a,b)=>a.name.localeCompare(b.name,"fr",{sensitivity:"base"}));
  return [...list].sort((a,b)=>b.wins-a.wins || timeToSeconds(a.bestTime)-timeToSeconds(b.bestTime));
}

function render(){
  const q=$("#search").value.trim().toLowerCase();
  const all=sortedPlayers();
  const filtered=all.filter(p=>p.name.toLowerCase().includes(q));
  const top=all.slice(0,3);

  $("#podium").innerHTML = top.length ? top.map((p,i)=>`
    <article class="podium-card">
      <div class="podium-rank">#${i+1}</div>
      <div class="podium-name">${escapeHtml(p.name)}</div>
      <div class="podium-stats">${p.wins} win${p.wins>1?"s":""} · ${escapeHtml(p.bestTime)}</div>
    </article>`).join("") : `<article class="podium-card" style="grid-column:1/-1"><div class="empty">Aucun joueur ajouté.</div></article>`;

  $("#rankingBody").innerHTML = filtered.length ? filtered.map((p)=>{
    const rank=all.indexOf(p)+1;
    return `<tr><td class="rank">#${rank}</td><td class="player">${escapeHtml(p.name)}</td><td class="wins">${p.wins}</td><td class="time">${escapeHtml(p.bestTime)}</td></tr>`;
  }).join("") : `<tr><td colspan="4" class="empty">Aucun joueur trouvé.</td></tr>`;

  const best=all.filter(p=>p.bestTime!=="--:--").sort((a,b)=>timeToSeconds(a.bestTime)-timeToSeconds(b.bestTime))[0];
  $("#bestTime").textContent=best?.bestTime || "--:--";
  $("#bestPlayer").textContent=best?.name || "À définir";
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
$("#search").addEventListener("input",render);
$("#sort").addEventListener("change",e=>{sortMode=e.target.value;render();});
render();
