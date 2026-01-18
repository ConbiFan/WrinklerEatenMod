(function(){
    'use strict';

    const wait = setInterval(() => {
        if(typeof Game !== 'undefined' && Game.ready && Game.wrinklers.length>0){
            clearInterval(wait);

            // 右下ボックス
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
            box.id = 'wrinklerCounter';
            document.body.appendChild(box);

            Game.registerHook('logic', () => {
                let active = 0;
                let total = 0;

                Game.wrinklers.forEach(w => {
                    if(w.phase===2) active++;

                    // Wrinkler が食べたクッキー量
                    let eaten = 0;
                    if(typeof w.eaten==='number') eaten = w.eaten;
                    else if(typeof w.total==='number') eaten = w.total;
                    else if(typeof w.sucked==='number') eaten = w.sucked;

                    if(!isFinite(eaten) || eaten<0) eaten = 0;
                    total += eaten;

                    // 個別Wrinklerにマウスを乗せたら食べた量を表示
                    if(w.div){
                        w.div.title = `食べた: ${Beautify(eaten)} クッキー`;
                    }
                });

                box.textContent = `シワシワ虫: ${active}匹 / 合計: ${Beautify(total)}`;
            });
        }
    }, 500);
})();
