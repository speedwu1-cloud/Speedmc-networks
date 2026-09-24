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
  {name:"InfernoTower", wins:78, bestTime:"11:43"},
  {name:"wrased", wins:5, bestTime:"34:04"},
  {name:"hahabyebyelol", wins:65, bestTime:"19:98"},
  {name:"K0mbit0", wins:15, bestTime:"30:67"},
  {name:"SilverYHQ", wins:24, bestTime:"22:42"},

  ...Array.from({length:39},()=>({name:"",wins:0,bestTime:"--:--"}))
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
