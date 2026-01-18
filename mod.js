(function(){
    'use strict';

    const wait = setInterval(() => {
        if(typeof Game !== 'undefined' && Game.ready && Game.wrinklers.length > 0){
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
            document.body.appendChild(box);

            // 毎フレーム更新
            Game.registerHook('logic', () => {
                let active = 0;
                let total = 0;

                Game.wrinklers.forEach(w => {
                    if(!w) return;

                    // ブラウザ版で正しく取得できる値
                    let eaten = (typeof w.amount === 'number' && w.amount > 0) ? w.amount : 0;
                    total += eaten;

                    if(w.phase === 2) active++; // 生きている Wrinkler

                    // hoverで個別表示
                    if(w.div) {
                        w.div.title = `食べた: ${Beautify(eaten)} クッキー`;
                    }
                });

                box.textContent = `シワシワ虫: ${active}匹 / 合計: ${Beautify(total)}`;
            });
        }
    }, 1000);
})();
