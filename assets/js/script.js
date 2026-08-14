'use strict';

document.addEventListener('DOMContentLoaded', () => {
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }

    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const charCountEl = document.getElementById('charCount');
    const wordCountEl = document.getElementById('wordCount');
    const resultsSection = document.getElementById('resultsSection');
    const iaValueEl = document.getElementById('iaValue');
    const iaStatusEl = document.getElementById('iaStatus');
    const plagioValueEl = document.getElementById('plagioValue');
    const plagioStatusEl = document.getElementById('plagioStatus');
    const sentenceListEl = document.getElementById('sentenceList');

    const AI_CLICHES = Object.freeze([
        "em resumo", "portanto", "é fundamental", "vale ressaltar", "por fim",
        "em suma", "notavelmente", "além disso", "com efeito", "torna-se evidente",
        "com o objetivo de", "neste cenário", "desempenha um papel", "relevante",
        "perspectiva", "importantíssimo", "crucial"
    ]);

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    textInput.addEventListener('input', updateCounters);
    analyzeBtn.addEventListener('click', performAnalysis);
    clearBtn.addEventListener('click', resetAnalysis);

    function updateCounters() {
        const text = textInput.value;
        const chars = text.length;
        const trimmedText = text.trim();
        const words = trimmedText === "" ? 0 : trimmedText.split(/\s+/).length;

        charCountEl.textContent = `Caracteres: ${chars} / 10000`;
        wordCountEl.textContent = `Palavras: ${words}`;
    }

    function performAnalysis() {
        const text = textInput.value.trim();

        if (text.length < 150) {
            alert("Por favor, insira um texto mais longo (mínimo de 150 caracteres) para uma análise consistente.");
            return;
        }

        // --- 1. MÓDULO DETECTOR DE IA ---
        const words = text.toLowerCase().split(/\s+/);
        const totalWords = words.length;

        let aiPatternCount = 0;
        AI_CLICHES.forEach(cliche => {
            const safeCliche = escapeRegExp(cliche);
            const regex = new RegExp(`\\b${safeCliche}\\b`, 'gi');
            const matches = text.match(regex);
            if (matches) aiPatternCount += matches.length;
        });

        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
        
        let totalSentenceLength = 0;
        sentences.forEach(s => {
            totalSentenceLength += s.trim().split(/\s+/).length;
        });

        const averageSentenceLength = sentences.length > 0 ? totalSentenceLength / sentences.length : 0;

        let varianceSum = 0;
        sentences.forEach(s => {
            const len = s.trim().split(/\s+/).length;
            varianceSum += Math.pow(len - averageSentenceLength, 2);
        });

        const standardDeviation = sentences.length > 0 ? Math.sqrt(varianceSum / sentences.length) : 0;

        let iaScore = 0;
        const clicheDensity = (aiPatternCount / totalWords) * 100;

        if (clicheDensity > 1) iaScore += 35;
        else if (clicheDensity > 0.4) iaScore += 15;

        if (standardDeviation < 4) iaScore += 45;
        else if (standardDeviation < 7) iaScore += 25;
        else if (standardDeviation > 12) iaScore -= 15;

        iaScore = Math.max(5, Math.min(iaScore, 95));

        iaValueEl.textContent = `${iaScore}%`;
        iaValueEl.className = 'metric-value';
        iaStatusEl.className = 'metric-status';

        if (iaScore > 70) {
            iaValueEl.classList.add('metric-value-danger');
            iaStatusEl.classList.add('status-danger');
            iaStatusEl.textContent = "Altamente Suspeito";
        } else if (iaScore > 40) {
            iaValueEl.classList.add('metric-value-warning');
            iaStatusEl.classList.add('status-warning');
            iaStatusEl.textContent = "Padrão Misto / Revisar";
        } else {
            iaValueEl.classList.add('metric-value-success');
            iaStatusEl.classList.add('status-success');
            iaStatusEl.textContent = "Provavelmente Humano";
        }

        // --- 2. MÓDULO DE PLÁGIO (CONSTRUÇÃO SEGURA DE URL) ---
        sentenceListEl.textContent = '';

        plagioValueEl.textContent = sentences.length;
        plagioStatusEl.textContent = "Pronto para Verificação";
        plagioStatusEl.className = 'metric-status status-primary';

        sentences.slice(0, 10).forEach(sentence => {
            const cleanSentence = sentence.trim().replace(/["']/g, '');

            const li = document.createElement('li');
            li.className = 'sentence-item';

            const textSpan = document.createElement('span');
            textSpan.textContent = cleanSentence.length > 80 ? `${cleanSentence.substring(0, 80)}...` : cleanSentence;

            const auditLink = document.createElement('a');
            auditLink.className = 'audit-link';
            
            // Construção segura de parâmetros de busca sem risco de URL malformada
            const searchParams = new URLSearchParams();
            searchParams.set('q', `"${cleanSentence}"`);
            
            auditLink.href = `https://www.google.com/search?${searchParams.toString()}`;
            auditLink.target = '_blank';
            auditLink.rel = 'noopener noreferrer'; // Previne Reverse Tabnabbing
            auditLink.textContent = 'Auditar na Web ↗';

            li.appendChild(textSpan);
            li.appendChild(auditLink);
            sentenceListEl.appendChild(li);
        });

        resultsSection.classList.remove('hidden');
        clearBtn.classList.remove('hidden');
    }

    function resetAnalysis() {
        textInput.value = '';
        updateCounters();
        sentenceListEl.textContent = '';
        resultsSection.classList.add('hidden');
        clearBtn.classList.add('hidden');
        textInput.focus();
    }
});