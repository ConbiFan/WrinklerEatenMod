(function(){
    'use strict';

    const wait = setInterval(() => {
        if (typeof Game !== 'undefined' && Game.ready) {
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
            box.id = 'wrinklerCounter';
            document.body.appendChild(box);

            Game.registerHook('logic', () => {
                let total = 0;
                let active = 0;

                Game.wrinklers.forEach(w => {
                    if (w.phase === 2) { // 生きてるシワシワ虫
                        total += w.eaten;
                        active++;
                    }
                });

                box.textContent =
                    `シワシワ虫: ${active}匹 / 食べた量: ${Beautify(total)}`;
            });
        }
    }, 500);

})();
