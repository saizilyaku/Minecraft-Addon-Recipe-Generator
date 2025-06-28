
// 現在のページをアクティブにするスクリプト
document.addEventListener('DOMContentLoaded', function() {
    // ファイル名から現在のページを判定
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    
    // ページ名のマッピング
    const pageMapping = {
        'index': 'recipe',
        'item': 'item', 
        'block': 'block',
        'furnace': 'furnace'
    };
    
    // 現在のページに対応するリンクをアクティブにする
    const activePageType = pageMapping[currentPage];
    if (activePageType) {
        const activeLink = document.querySelector(`[data-page="${activePageType}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // ナビゲーションリンクのクリックイベント
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // 現在のページと同じリンクの場合はページ遷移をキャンセル
            if (this.classList.contains('active')) {
                e.preventDefault();
                return;
            }
            
            // クリック時のフィードバック効果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // ホバー時のサウンドエフェクト（オプション）
        link.addEventListener('mouseenter', function() {
            // Web Audio APIを使用したホバーサウンド（オプション）
            // playHoverSound(); // 必要に応じてサウンド関数を実装
        });
    });
});

// オプション: ホバーサウンド機能
function playHoverSound() {
    // 簡単なビープ音を生成
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}
