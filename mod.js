(function(){
    'use strict';

    const wait = setInterval(() => {
        if (typeof Game !== 'undefined' && Game.ready) {
            clearInterval(wait);

            // 右下統計ボックス
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

            // 更新
            Game.registerHook('logic', () => {
                let total = 0;
                let active = 0;

                Game.wrinklers.forEach(w => {
                    if(w.phase === 2){ // 生きてる
                        let eaten = w.eaten;
                        // 無限大やNaNは0に置き換え
                        if(!isFinite(eaten) || eaten < 0) eaten = 0;
                        total += eaten;
                        active++;
                    }
                });

                box.textContent = `シワシワ虫: ${active}匹 / 食べた量: ${Beautify(total)}`;
            });

            // 個別確認用コンソールログ
            document.addEventListener('keydown', e => {
                if(e.key === 'w'){ // wキー押すとログ
                    console.log('=== Wrinkler Info ===');
                    Game.wrinklers.forEach((w,i)=>{
                        console.log(
                            `ID:${i} ${w.phase===2?'生きてる':'死んでる'} / 食べた: ${Beautify(isFinite(w.eaten)?w.eaten:0)}`
                        );
                    });
                }
            });
        }
    }, 500);
})();

