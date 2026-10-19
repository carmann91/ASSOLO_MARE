# Assolo Mare

Demo statica responsive del sito del ristorante, con home, pagina menù e modulo di prenotazione WhatsApp. Nessuna dipendenza di build.

## Avvio locale

```sh
cd /workspace/ASSOLO_MARE
python3 -m http.server 8000 --bind 0.0.0.0
```

## Configurazione prima della pubblicazione

- Impostare `WHATSAPP_NUMBER` in `app.js` con il numero ufficiale, prefisso internazionale incluso, senza `+`, spazi o simboli.
- Sostituire piatti, prezzi e testi dimostrativi con quelli approvati dal ristorante. Aggiungere informazioni ufficiali su allergeni, sede, orari e contatti.
- Il layout editoriale usa font di sistema e non richiede risorse esterne. Le fotografie ufficiali sono da integrare quando disponibili.

Il modulo compone una richiesta e apre WhatsApp, dove l'utente deve inviarla. Non memorizza i dati e non conferma automaticamente il tavolo. Senza numero configurato mostra solo l'anteprima del messaggio.

Le attività cloud sono già isolate: usare questo checkout senza creare worktree aggiuntivi salvo richiesta esplicita.
