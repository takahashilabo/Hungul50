/*
 * ハングル学習ゲーム - 日本語五十音対応版
 * 
 * 除外された文字:
 * - パッチム付き文字: 10個（カン、サン、キムなど）
 * - 複合母音（ㅐ、ㅔ、ㅘなど）: 多数
 * - 濃音（쌍자음）: 5個
 * - 韓国語特有の子音（ㅈ、ㅊ、ㅋなど一部）: 3個
 * - 合計除外数: 約20個以上
 * 
 * 対応している五十音: あいうえお行、かきくけこ行、さしすせそ行、
 * たちつてと行、なにぬねの行、はひふへほ行、まみむめも行、
 * やゆよ行、らりるれろ行、わをん（計46文字対応）
 */

// ハングル文字のパーツデータ - 日本語五十音に対応するもののみ
const HANGUL_PARTS = {
    // 初声（子音）- 五十音対応のみ
    initial: [
        { char: 'ㄱ', code: 0x1100, name: 'ガ行/カ行', sound: 'g' },
        { char: 'ㄴ', code: 0x1102, name: 'ナ行', sound: 'n' },
        { char: 'ㄷ', code: 0x1103, name: 'タ行', sound: 'd' },
        { char: 'ㄹ', code: 0x1105, name: 'ラ行', sound: 'r' },
        { char: 'ㅁ', code: 0x1106, name: 'マ行', sound: 'm' },
        { char: 'ㅂ', code: 0x1107, name: 'バ行/パ行', sound: 'b' },
        { char: 'ㅅ', code: 0x1109, name: 'サ行', sound: 's' },
        { char: 'ㅇ', code: 0x110B, name: 'ア行/ワ行', sound: '' },
        { char: 'ㅎ', code: 0x1112, name: 'ハ行', sound: 'h' }
    ],
    // 中声（母音）- 五十音の基本5母音のみ
    medial: [
        { char: 'ㅏ', code: 0x1161, name: 'ア段', sound: 'a' },
        { char: 'ㅑ', code: 0x1163, name: 'ヤ行/イ段', sound: 'ya' },
        { char: 'ㅓ', code: 0x1165, name: 'オ段', sound: 'eo' },
        { char: 'ㅕ', code: 0x1167, name: 'ヨ行', sound: 'yeo' },
        { char: 'ㅗ', code: 0x1169, name: 'オ段', sound: 'o' },
        { char: 'ㅜ', code: 0x116E, name: 'ウ段', sound: 'u' },
        { char: 'ㅠ', code: 0x1172, name: 'ユ行', sound: 'yu' },
        { char: 'ㅣ', code: 0x1175, name: 'イ段', sound: 'i' }
    ],
    // 終声（パッチム）- パッチムは使用しない
    final: [
        { char: 'なし', code: null, name: 'なし', sound: '' }
    ]
};

// 問題データ - 日本語五十音に対応したハングルのみ
const QUESTIONS = [
    // あ行
    { char: '아', meaning: 'ア', reading: 'ア', godan: '아行' },
    { char: '이', meaning: 'イ', reading: 'イ', godan: '이행' },
    { char: '우', meaning: 'ウ', reading: 'ウ', godan: '우행' },
    { char: '어', meaning: 'エ', reading: 'エ', godan: '어행' },
    { char: '오', meaning: 'オ', reading: 'オ', godan: '오행' },
    
    // か行
    { char: '가', meaning: 'カ', reading: 'カ', godan: '가行' },
    { char: '기', meaning: 'キ', reading: 'キ', godan: '가행' },
    { char: '구', meaning: 'ク', reading: 'ク', godan: '가행' },
    { char: '고', meaning: 'コ', reading: 'コ', godan: '가행' },
    
    // が行（発音は「か」と同じので同じハングルを使用）
    { char: '가', meaning: 'ガ', reading: 'ガ', godan: '가행' },
    
    // さ行
    { char: '사', meaning: 'サ', reading: 'サ', godan: '사行' },
    { char: '시', meaning: 'シ', reading: 'シ', godan: '사行' },
    { char: '수', meaning: 'ス', reading: 'ス', godan: '사행' },
    { char: '소', meaning: 'ソ', reading: 'ソ', godan: '사행' },
    
    // た行
    { char: '다', meaning: 'タ', reading: 'タ', godan: '다행' },
    { char: '투', meaning: 'ツ', reading: 'ツ', godan: '다行' },
    { char: '토', meaning: 'ト', reading: 'ト', godan: '다행' },
    
    // な行
    { char: '나', meaning: 'ナ', reading: 'ナ', godan: '나행' },
    { char: '누', meaning: 'ヌ', reading: 'ヌ', godan: '나行' },
    { char: '노', meaning: 'ノ', reading: 'ノ', godan: '나행' },
    
    // は行
    { char: '하', meaning: 'ハ', reading: 'ハ', godan: '하행' },
    { char: '후', meaning: 'フ', reading: 'フ', godan: '하行' },
    { char: '호', meaning: 'ホ', reading: 'ホ', godan: '하행' },
    
    // ま行
    { char: '마', meaning: 'マ', reading: 'マ', godan: '마행' },
    { char: '무', meaning: 'ム', reading: 'ム', godan: '마行' },
    { char: '모', meaning: 'モ', reading: 'モ', godan: '마行' },
    
    // や行
    { char: '야', meaning: 'ヤ', reading: 'ヤ', godan: '야행' },
    { char: '유', meaning: 'ユ', reading: 'ユ', godan: '야행' },
    { char: '여', meaning: 'ヨ', reading: 'ヨ', godan: '야행' },
    
    // ら行
    { char: '라', meaning: 'ラ', reading: 'ラ', godan: '라행' },
    { char: '루', meaning: 'ル', reading: 'ル', godan: '라行' },
    { char: '로', meaning: 'ロ', reading: 'ロ', godan: '라行' },
    
    // わ行
    { char: '와', meaning: 'ワ', reading: 'ワ', godan: '와行' }
];

// ゲーム状態
let gameState = {
    currentQuestion: null,
    selectedParts: {
        initial: null,
        medial: null,
        final: null
    },
    score: 0,
    level: 1,
    questionsAnswered: 0,
    showAnswer: true
};

// DOM要素
const elements = {
    questionWord: document.getElementById('questionWord'),
    questionMeaning: document.getElementById('questionMeaning'),
    questionReading: document.getElementById('questionReading'),
    initialSlot: document.getElementById('initialSlot'),
    medialSlot: document.getElementById('medialSlot'),
    finalSlot: document.getElementById('finalSlot'),
    previewChar: document.getElementById('previewChar'),
    checkBtn: document.getElementById('checkBtn'),
    resetBtn: document.getElementById('resetBtn'),
    nextBtn: document.getElementById('nextBtn'),
    resultModal: document.getElementById('resultModal'),
    resultIcon: document.getElementById('resultIcon'),
    resultTitle: document.getElementById('resultTitle'),
    resultMessage: document.getElementById('resultMessage'),
    toggleAnswerBtn: document.getElementById('toggleAnswerBtn'),
    initialParts: document.getElementById('initialParts'),
    medialParts: document.getElementById('medialParts'),
    finalParts: document.getElementById('finalParts')
};

// 初期化
function init() {
    renderParts();
    loadNewQuestion();
    attachEventListeners();
}

// 正解の表示/非表示を切り替え
function toggleAnswerVisibility() {
    gameState.showAnswer = !gameState.showAnswer;
    updateAnswerDisplay();
}

// 正解表示を更新
function updateAnswerDisplay() {
    if (gameState.showAnswer) {
        elements.questionWord.textContent = gameState.currentQuestion.char;
        elements.toggleAnswerBtn.textContent = '正解を隠す';
    } else {
        elements.questionWord.textContent = '？';
        elements.toggleAnswerBtn.textContent = '正解を見る';
    }
}

// パーツボタンの描画
function renderParts() {
    // 初声（子音）
    elements.initialParts.innerHTML = '';
    HANGUL_PARTS.initial.forEach(part => {
        const button = createPartButton(part, 'initial');
        elements.initialParts.appendChild(button);
    });

    // 中声（母音）
    elements.medialParts.innerHTML = '';
    HANGUL_PARTS.medial.forEach(part => {
        const button = createPartButton(part, 'medial');
        elements.medialParts.appendChild(button);
    });

    // 終声（パッチム）
    elements.finalParts.innerHTML = '';
    HANGUL_PARTS.final.forEach(part => {
        const button = createPartButton(part, 'final');
        elements.finalParts.appendChild(button);
    });
}

// パーツボタンの作成
function createPartButton(part, type) {
    const button = document.createElement('button');
    button.className = 'part-button';
    button.textContent = part.char;
    button.dataset.type = type;
    button.dataset.code = part.code;
    button.dataset.char = part.char;
    button.title = `${part.name} (${part.sound})`;
    
    button.addEventListener('click', () => selectPart(part, type, button));
    
    return button;
}

// パーツ選択
function selectPart(part, type, button) {
    // 前の選択を解除
    const previousSelected = document.querySelector(
        `.part-button[data-type="${type}"].selected`
    );
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }

    // 新しい選択
    button.classList.add('selected');
    gameState.selectedParts[type] = part;

    // プレビュー更新
    updatePreview();
}

// スロット更新（表示欄は非表示のため処理削除）
function updateSlot(type, char) {
    // スロット表示は不要になったため処理削除
}

// プレビュー更新
function updatePreview() {
    const { initial, medial, final } = gameState.selectedParts;
    
    if (!initial || !medial) {
        elements.previewChar.textContent = '?';
        return;
    }

    try {
        const hangul = composeHangul(initial, medial, final);
        elements.previewChar.textContent = hangul;
    } catch (e) {
        elements.previewChar.textContent = '?';
    }
}

// ハングル文字の合成
function composeHangul(initial, medial, final) {
    // ハングル文字の計算式
    // 完成形ハングル = 0xAC00 + (初声インデックス × 588) + (中声インデックス × 28) + 終声インデックス
    
    // 初声のUnicodeコードポイント: 0x1100-0x1112
    const initialCode = initial.code;
    const initialIndex = initialCode - 0x1100;
    
    // 中声のUnicodeコードポイント: 0x1161-0x1175
    const medialCode = medial.code;
    const medialIndex = medialCode - 0x1161;
    
    // 終声のUnicodeコードポイント: 0x11A8-0x11C2
    const finalCode = (final && final.code) ? final.code : null;
    const finalIndex = finalCode ? (finalCode - 0x11A8 + 1) : 0;
    
    const code = 0xAC00 + (initialIndex * 588) + (medialIndex * 28) + finalIndex;
    return String.fromCharCode(code);
}

// ハングル文字の分解
function decomposeHangul(char) {
    const code = char.charCodeAt(0);
    
    if (code < 0xAC00 || code > 0xD7A3) {
        throw new Error('Invalid Hangul character');
    }
    
    const base = code - 0xAC00;
    const initialIndex = Math.floor(base / 588);
    const medialIndex = Math.floor((base % 588) / 28);
    const finalIndex = base % 28;
    
    // インデックスをコードポイントに変換
    const initialCode = 0x1100 + initialIndex;
    const medialCode = 0x1161 + medialIndex;
    const finalCode = finalIndex > 0 ? (0x11A8 - 1 + finalIndex) : null;
    
    return {
        initial: HANGUL_PARTS.initial.find(p => p.code === initialCode),
        medial: HANGUL_PARTS.medial.find(p => p.code === medialCode),
        final: finalCode ? HANGUL_PARTS.final.find(p => p.code === finalCode) : HANGUL_PARTS.final[0]
    };
}

// 新しい問題を読み込む
function loadNewQuestion() {
    // ランダムに問題を選択
    const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
    gameState.currentQuestion = QUESTIONS[randomIndex];

    // 問題表示（showAnswerに応じて表示/非表示を切り替え）
    updateAnswerDisplay();
    elements.questionMeaning.textContent = gameState.currentQuestion.meaning;
    elements.questionReading.textContent = `読み: ${gameState.currentQuestion.reading}`;

    // リセット
    resetBuilder();
}

// ビルダーをリセット
function resetBuilder() {
    gameState.selectedParts = {
        initial: null,
        medial: null,
        final: null
    };

    elements.previewChar.textContent = '?';

    // 選択状態をクリア
    document.querySelectorAll('.part-button.selected').forEach(btn => {
        btn.classList.remove('selected');
    });
}

// 答え合わせ
function checkAnswer() {
    const { initial, medial, final } = gameState.selectedParts;
    
    if (!initial || !medial) {
        alert('初声と中声を選択してください！');
        return;
    }

    const userAnswer = composeHangul(initial, medial, final);
    const correctAnswer = gameState.currentQuestion.char;
    
    const isCorrect = userAnswer === correctAnswer;
    
    if (isCorrect) {
        showResult(true);
        gameState.questionsAnswered++;
        
        // レベルアップ（5問ごと）
        if (gameState.questionsAnswered % 5 === 0) {
            gameState.level++;
        }
    } else {
        showResult(false);
        
        // 不正解の場合、正解を表示
        const correctParts = decomposeHangul(correctAnswer);
        console.log('正解:', correctParts);
    }
}

// 結果モーダルを表示
function showResult(isCorrect) {
    elements.resultModal.classList.add('show');
    
    if (isCorrect) {
        elements.resultIcon.textContent = '🎉';
        elements.resultIcon.className = 'result-icon correct';
        elements.resultTitle.textContent = '正解！';
        elements.resultMessage.textContent = '素晴らしい！次の問題にチャレンジしよう！';
    } else {
        elements.resultIcon.textContent = '😅';
        elements.resultIcon.className = 'result-icon incorrect';
        elements.resultTitle.textContent = '残念...';
        elements.resultMessage.textContent = `正解は「${gameState.currentQuestion.char}」でした。もう一度チャレンジ！`;
    }
}

// 結果モーダルを閉じる
function hideResult() {
    elements.resultModal.classList.remove('show');
}

// イベントリスナーの登録
function attachEventListeners() {
    elements.checkBtn.addEventListener('click', checkAnswer);
    elements.resetBtn.addEventListener('click', resetBuilder);
    elements.toggleAnswerBtn.addEventListener('click', toggleAnswerVisibility);
    elements.nextBtn.addEventListener('click', () => {
        hideResult();
        loadNewQuestion();
    });
    
    // モーダルの背景クリックで閉じる
    elements.resultModal.addEventListener('click', (e) => {
        if (e.target === elements.resultModal) {
            hideResult();
            loadNewQuestion();
        }
    });
}

// ゲーム開始
document.addEventListener('DOMContentLoaded', init);
