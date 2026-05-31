// 关卡解锁系统
const LEVEL_UNLOCK_CONFIG = {
    towers: {
        1: 4,  // 第1关只能使用前4个防御塔
        2: 5,  // 第2关解锁第5个防御塔
        3: 6,  // 第3关解锁第6个防御塔
        4: 7   // 第4关解锁第7个防御塔
    },
    monsters: {
        1: 4,  // 第1关只能出现前4个怪兽
        2: 5,  // 第2关解锁第5个怪兽
        3: 6,  // 第3关解锁第6个怪兽
        4: 7   // 第4关解锁第7个怪兽
    },
    placementSlots: {
        1: 4,  // 第1关可以放置4个防御塔
        2: 5,  // 第2关可以放置5个防御塔
        3: 6,  // 第3关可以放置6个防御塔
        4: 7   // 第4关可以放置7个防御塔
    }
};

// 获取当前关卡
function getCurrentLevel() {
    let level = parseInt(localStorage.getItem('currentLevel')) || 1;
    // 确保关卡在有效范围内
    if (level < 1) level = 1;
    if (level > 10) level = 10;
    return level;
}

// 初始化页面时根据关卡锁定/解锁防御塔和怪兽
function initializeUnlockSystem() {
    const currentLevel = getCurrentLevel();
    console.log('当前关卡:', currentLevel);
    
    // 锁定/解锁防御塔
    const towerCards = document.querySelectorAll('.tower-card');
    towerCards.forEach((card, index) => {
        const unlockLevel = parseInt(card.dataset.unlockLevel) || (index + 1);
        if (unlockLevel <= currentLevel) {
            card.classList.remove('locked');
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
            card.querySelector('.lock-overlay')?.remove();
        } else {
            card.classList.add('locked');
            card.style.opacity = '0.5';
            card.style.pointerEvents = 'none';
            // 添加锁定图标
            if (!card.querySelector('.lock-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'lock-overlay';
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    z-index: 10;
                `;
                overlay.textContent = '🔒';
                card.style.position = 'relative';
                card.appendChild(overlay);
            }
        }
    });
    
    // 锁定/解锁怪兽
    const monsterCards = document.querySelectorAll('.monster-card');
    monsterCards.forEach((card, index) => {
        const unlockLevel = parseInt(card.dataset.unlockLevel) || (index + 1);
        if (unlockLevel <= currentLevel) {
            card.classList.remove('locked');
            card.style.opacity = '1';
            card.querySelector('.lock-overlay')?.remove();
        } else {
            card.classList.add('locked');
            card.style.opacity = '0.5';
            // 添加锁定图标
            if (!card.querySelector('.lock-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'lock-overlay';
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    z-index: 10;
                `;
                overlay.textContent = '🔒';
                card.style.position = 'relative';
                card.appendChild(overlay);
            }
        }
    });
    
    // 锁定/解锁放置槽
    const placementSlots = document.querySelectorAll('.bottom-slot');
    const availableSlots = LEVEL_UNLOCK_CONFIG.placementSlots[currentLevel] || 4;
    placementSlots.forEach((slot, index) => {
        if (index < availableSlots) {
            slot.classList.remove('locked');
            slot.style.opacity = '1';
            slot.style.pointerEvents = 'auto';
            slot.querySelector('.lock-overlay')?.remove();
        } else {
            slot.classList.add('locked');
            slot.style.opacity = '0.5';
            slot.style.pointerEvents = 'none';
            // 添加锁定图标
            if (!slot.querySelector('.lock-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'lock-overlay';
                overlay.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 24px;
                `;
                overlay.textContent = '🔒';
                slot.style.position = 'relative';
                slot.appendChild(overlay);
            }
        }
    });
}

// 获取当前关卡可用的怪兽类型列表
function getUnlockedMonsterTypes() {
    const currentLevel = getCurrentLevel();
    const unlockCount = LEVEL_UNLOCK_CONFIG.monsters[currentLevel] || 4;
    
    // 怪兽类型列表（按照HTML中的顺序）
    const monsterTypes = ['🗑️', '💨', '💀', '🦠', '🧴', '🔋', '🛢️', '☢️'];
    
    return monsterTypes.slice(0, unlockCount);
}

// 保存当前关卡可用的怪兽类型到localStorage
function saveUnlockedMonsters() {
    const unlockedMonsters = getUnlockedMonsterTypes();
    localStorage.setItem('unlockedMonsters', JSON.stringify(unlockedMonsters));
    console.log('已保存可用的怪兽类型:', unlockedMonsters);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeUnlockSystem();
    saveUnlockedMonsters();
});
