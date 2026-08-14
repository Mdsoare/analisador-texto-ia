# 🛡️ Analisador de Texto Neutro — IA & Plágio

![License](https://img.shields.io/github/license/Mdsoare/analisador-texto-ia?style=for-the-badge&color=4f46e5)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-success?style=for-the-badge&logo=github)
![Security](https://img.shields.io/badge/Security-DevSecOps%20Hardened-blue?style=for-the-badge&logo=dependabot)
![Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS%20(Vanilla)-orange?style=for-the-badge&logo=javascript)

Uma solução **100% client-side**, leve, rápida e centrada em privacidade para análise de densidade estocástica de termos de IA e auditoria imediata de plágio no ecossistema web.

Projetada com foco em **Privacy by Design** e **DevSecOps**, a ferramenta opera inteiramente no navegador do usuário — **nenhum dado ou texto digitado é enviado para servidores externos ou armazenado**.

---

## 🚀 Demonstração & Live Access

Acesse a versão estável diretamente via GitHub Pages:  
👉 **[https://mdsoare.github.io/analisador-texto-ia](https://mdsoare.github.io/analisador-texto-ia)**

---

## ✨ Principais Funcionalidades

- 🧠 **Detecção Estocástica de IA:** Avaliação de padrão sintático, desvio padrão do comprimento de sentenças e densidade de clichês/conectivos característicos de LLMs (como GPT-4, Claude, Gemini).
- 🔍 **Segmentação & Auditoria de Plágio:** Quebra inteligente de frases com geração de links seguros para checagem em tempo real em motores de busca abertos.
- 🔒 **Zero Data Leakage:** Sem chamadas `fetch`/`XHR` externas para APIs de terceiros. Processamento puramente em memória no browser.
- ⚡ **UI/UX Moderna e Responsiva:** Interface intuitiva com suporte mobile, contadores dinâmicos de palavras/caracteres e estados de feedback acessíveis (`aria-live`).
- 🛡️ **DevSecOps Hardened:** Proteção integrada contra DOM-XSS, Reverse Tabnabbing, Clickjacking e Content Security Policy (CSP) estrita.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semantic:** Estrutura focada em acessibilidade (WCAG) e SEO.
- **CSS3 Moderno:** Design System com CSS Variables, CSS Grid, Flexbox e animações de estado.
- **Vanilla JavaScript (ES6+):** Execução otimizada, uso estrito de `DOMContentLoaded`, sanitização com `URLSearchParams` e isolamento de escopo (`'use strict'`).

---

## 🔒 Postura de Segurança (DevSecOps)

O projeto foi submetido a uma auditoria estática de segurança e aplicação de *hardening* específico para o ambiente do **GitHub Pages**:

| Vetor de Risco | Status | Ação / Mitigação Aplicada |
| :--- | :---: | :--- |
| **DOM-XSS** | 🛡️ Protegido | Manipulação via `textContent` e APIs DOM seguras. |
| **Reverse Tabnabbing** | 🛡️ Protegido | Links de auditoria utilizam `rel="noopener noreferrer"`. |
| **CSP Bypass** | 🛡️ Protegido | Meta CSP restritiva (`script-src 'self'`, `connect-src 'none'`). |
| **Clickjacking** | 🛡️ Protegido | Script client-side de Frame-Busting ativo no carregamento. |
| **URL Injection** | 🛡️ Protegido | Codificação de query strings realizada via `URLSearchParams`. |

---

## ⚙️ Como Executar Localmente

Como a aplicação é 100% estática, não há necessidade de instalação de dependências de runtime (como Node.js ou Python).

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Mdsoare/analisador-texto-ia.git
   cd analisador-texto-ia
   ```

2. Abra o projeto:

- Basta abrir o arquivo index.html em qualquer navegador moderno.
- Ou utilize extensões como o Live Server no VS Code.

---

## 🧪 Testando a Aplicação

Para validar as métricas do detector de IA e a segmentação de plágio, utilize o texto de teste abaixo no campo de inserção:

```text
    "Atualmente, torna-se evidente que a inteligência artificial desempenha um papel crucial na transformação do mercado de trabalho global. Com o objetivo de otimizar processos complexos e aumentar a produtividade em escala, diversas organizações adotam soluções automatizadas em seus fluxos diários de operação. Além disso, é fundamental reconhecer que a integração de novos algoritmos exige cuidados constantes em governança e segurança da informação."
```

---

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
*Desenvolvido por **Marcelo Soares** | Especialista em Segurança da Informação e Computação Forense.*
