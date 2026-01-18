(function(){
    'use strict';

    const wait = setInterval(() => {
        if(typeof Game !== 'undefined' && Game.ready && Game.wrinklers.length>0){
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
            document.body.appendChild(box);

            const hoverBox = document.createElement('div');
            hoverBox.style.position = 'fixed';
            hoverBox.style.pointerEvents = 'none';
            hoverBox.style.background = 'rgba(0,0,0,0.7)';
            hoverBox.style.color = '#fff';
            hoverBox.style.padding = '4px 8px';
            hoverBox.style.borderRadius = '4px';
            hoverBox.style.fontSize = '12px';
            hoverBox.style.display = 'none';
            hoverBox.style.zIndex = 10000;
            document.body.appendChild(hoverBox);

            document.addEventListener('mousemove', e => {
                hoverBox.style.left = e.pageX + 15 + 'px';
                hoverBox.style.top = e.pageY + 15 + 'px';
            });

            Game.registerHook('logic', () => {
                let active = 0;
                let total = 0;

                let hoverDetected = false;

                Game.wrinklers.forEach(w => {
                    let eaten = isFinite(w.stored) && w.stored>=0 ? w.stored : 0;
                    total += eaten;
                    if(w.phase===2) active++;

                    // マウス座標とWrinkler座標で簡易hover判定
                    if(Game.mouseX && Game.mouseY && w.x && w.y){
                        const dx = Game.mouseX - w.x;
                        const dy = Game.mouseY - w.y;
                        const dist = Math.sqrt(dx*dx + dy*dy);
                        if(dist < 48){ // 近ければhover
                            hoverBox.textContent = `食べた: ${Beautify(eaten)} クッキー`;
                            hoverBox.style.display = 'block';
                            hoverDetected = true;
                        }
                    }
                });

                if(!hoverDetected) hoverBox.style.display = 'none';
                box.textContent = `シワシワ虫: ${active}匹 / 合計: ${Beautify(total)}`;
            });
        }
    }, 500);
})();
