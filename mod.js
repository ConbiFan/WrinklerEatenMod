(function(){
    'use strict';

    const wait = setInterval(() => {
        if(typeof Game !== 'undefined' && Game.ready && Game.wrinklers.length > 0){
            clearInterval(wait);

            const box = document.createElement('div');
            box.style.position = 'fixed';
            box.style.right = '10px';
            box.style.bottom = '10px';
            box.style.padding = '8px 12px';
            box.style.background = 'rgba(0,0,0,0.7)';
            box.style.color = '#fff';
            box.style.fontSize = '14px';
            box.style.borderRadius = '6px';
            box.style.zIndex = 9999;
            box.style.maxHeight = '50vh';
            box.style.overflowY = 'auto';
            box.id = 'wrinklerCounter';
            document.body.appendChild(box);

            Game.registerHook('logic', () => {
                let total = 0;
                let active = 0;
                let lines = [];

                Game.wrinklers.forEach((w,i) => {
                    // ここで undefined / Infinity / null を全部0に置換
                    let eaten = (typeof w.eaten === 'number' && isFinite(w.eaten) && w.eaten>=0) ? w.eaten : 0;
                    if(w.phase === 2) active++;
                    total += eaten;
                    lines.push(`ID:${i} ${w.phase===2?'生きてる':'死んでる'} / 食べた: ${Beautify(eaten)}`);
                });

                box.innerHTML = `シワシワ虫: ${active}匹 / 合計: ${Beautify(total)}<br>` + lines.join('<br>');
            });
        }
    }, 500);
})();
