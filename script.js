document.addEventListener('DOMContentLoaded', () => {
   fetch('https://love-analysis-api.vercel.app/', {
      method: 'GET'
   }).then(response => response.json()).then(data => {
      if (data && Object.keys(data).length > 0) {
         document.querySelector('.love-declarations .result').textContent = data.love_declarations || 0;

         const beautifulWordsList = document.querySelector('.beautiful-words .word-list');
         beautifulWordsList.innerHTML = '';
         if (data.beautiful_words && data.beautiful_words.length > 0) {
            data.beautiful_words.forEach(word => {
               const li = document.createElement('li');
               li.innerHTML = `${word.word} <span class="count">(${word.count})</span>`;
               beautifulWordsList.appendChild(li);
            });
         }

         const emojiTableBody = document.querySelector('.emoji-leaderboard tbody');
         emojiTableBody.innerHTML = '';
         if (data.top_emojis && data.top_emojis.length > 0) {
            data.top_emojis.forEach(emoji => {
               const tr = document.createElement('tr');
               tr.innerHTML = `
                      <td>#${emoji.position}</td>
                      <td>${emoji.emoji}</td>
                      <td>${emoji.count}</td>
                      <td>${emoji.otavio}</td>
                      <td>${emoji.sophia}</td>
                  `;
               emojiTableBody.appendChild(tr);
            });
         }

         document.querySelector('.weekday .result').textContent = data.when_we_talked_more ? data.when_we_talked_more.weekday : '---';
         document.querySelector('.month .result').textContent = data.when_we_talked_more ? data.when_we_talked_more.month : '---';
         document.querySelector('.hour .result').textContent = data.when_we_talked_more ? `${data.when_we_talked_more.hour}h` : '---';
         document.querySelector('.period').textContent = data.when_we_talked_more ? data.when_we_talked_more.period === 'manhã' ? 'a manhã' : data.when_we_talked_more.period === 'tarde' ? 'o dia' : 'a noite' : '---';

         document.querySelector('.otavio-messages .result').textContent = data.who_talked_more ? data.who_talked_more.otavio.messages : 0;
         document.querySelector('.sophia-messages .result').textContent = data.who_talked_more ? data.who_talked_more.sophia.messages : 0;
         document.querySelector('.winner').textContent = data.who_talked_more ? data.who_talked_more.winner : '---';

         document.querySelector('.total .result').textContent = data.average_messages_per_day ? data.average_messages_per_day.total : 0;
         document.querySelector('.otavio .result').textContent = data.average_messages_per_day ? data.average_messages_per_day.otavio : 0;
         document.querySelector('.sophia .result').textContent = data.average_messages_per_day ? data.average_messages_per_day.sophia : 0;
      } else {
         console.log('Dados inválidos recebidos da API');
      }
   }).catch(e => console.error(e));
});
