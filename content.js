(function() {

  
  // ===== HELPER FUNCTIONS =====
  function setInputByKeywords(keywords, value) {
    document.querySelectorAll('input').forEach(input => {
      const key = (input.name + input.id + input.placeholder).toLowerCase();
      if (keywords.some(k => key.includes(k))) {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  function findFileInput(labelWords) {
    return [...document.querySelectorAll("label")].reduce((acc, label) => {
      const text = label.innerText.toLowerCase();
      if (!acc && labelWords.some(w => text.includes(w))) {
        return label.querySelector('input[type="file"]') || document.getElementById(label.getAttribute("for"));
      }
      return acc;
    }, null);
  }

 

  function createButton(text, bottomPx, input) {
    if (!input) return;
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.style.cssText = `
      position: fixed;
      right: 20px;
      bottom: ${bottomPx}px;
      z-index: 9999;
      padding: 10px 14px;
      background: #e8771aff;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    `;
    btn.onclick = () => input.click();
    document.body.appendChild(btn);
  }

  // ===== MAIN SCRIPT AFTER PAGE LOAD =====
  setTimeout(() => {

    // ===== BASIC TEXT FIELDS =====
    setInputByKeywords(["first", 'rname'], "name");
    setInputByKeywords(["last", 'hname'], "lastname");
    setInputByKeywords(["email"], "???????@gmail.com");

    // ===== PHONE =====
    setInputByKeywords(["handy", "phone", 'tel'], "+49123456789");

    // ===== PLZ / ZIP =====
    setInputByKeywords(["plz", "zip", "post", "PLZ"], "plz");

    // ===== STREET =====
    setInputByKeywords(["street", "address1", "p978465"], "address");

    // ===== BIRTH DATE =====
    setInputByKeywords(["birth", 'geburtsdatum'], "01.01.0101");

    // ===== CITY =====
    setInputByKeywords(["city", "location", "address1", "ort"], "ort");

    // ===== AVAILABLE FROM =====
    setInputByKeywords(["available_from", "available", "period_of_notice_text"], "Sofort Verfügbar");

    // ===== SALARY =====
    setInputByKeywords(["desiredsalary", "desired_salary", "salary"], "±$$$$");

    // ===== EARLIEST STARTING DATE =====
    const startDate = document.querySelector('input#earliestStartingDate, input[name="earliestStartingDate"]');
    if (startDate) {
      startDate.value = "01.03.2026"; 
      startDate.dispatchEvent(new Event('input', { bubbles: true }));
      startDate.dispatchEvent(new Event('change', { bubbles: true }));
    }

    setInputByKeywords(["earliest"], "01.03.2026");

  
   
    // ===== COMMENT  =====
    document.querySelectorAll(
      'textarea#comment, textarea[name="comment"], ' +
      'textarea[name*="answer_comment"], textarea[id*="answer_comment"]'
      ).forEach(ta => {
      ta.value = "Jung, ambitioniert und wissbegierig – ich möchte mich weiterentwickeln und in der Arbeitswelt etwas Positives beitragen.";
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      ta.dispatchEvent(new Event('change', { bubbles: true }));
    });


   
    // ===== SELECT (ANREDE) =====
    document.querySelectorAll('select').forEach(select => {
      [...select.options].forEach(opt => {
        if (opt.value === "male" || opt.text.toLowerCase().includes("herr")) {
          select.value = opt.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });

    // ===== RADIO (HERR / MALE) =====
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      if (radio.value === "male" || radio.value === "mr"|| radio.nextElementSibling?.innerText?.toLowerCase().includes("herr")) {
        radio.click();
      }
    });

    

    // ===== CHECKBOX TERMS =====
        
    const cb = document.querySelector('input[type="checkbox"][name="datenschutzok"]');
    if (cb && !cb.checked) cb.click();

    // Privacy Policy Checkbox
    const r = document.querySelector('input[type="radio"][name="privacyPolicyAccepted"][value="true"]');
    if (r && !r.checked) {
      r.checked = true;
      r.dispatchEvent(new Event('change', { bubbles: true }));
    }
   
    
    const h = document.querySelector('input[type="hidden"][name*="privacy_statement"]');
    if (h) {
      h.value = "1";
      h.dispatchEvent(new Event('change', { bubbles: true }));
    }     

    //*
    const m = document.querySelector('input[type="radio"][name="extendedUseAccepted"][value="true"]');
    if (m && !m.checked) {
      m.checked = true;
      m.dispatchEvent(new Event('change', { bubbles: true }));
    }


    // ===== CHECKBOX AVAILABLE FOR OTHER VACANCIES =====
    const cp = document.querySelector(
    '#job_application_base_core_available_for_other_vacancies, ' + 'input[type="checkbox"][name*="available_for_other_vacancies"]'
    );
    if (cp && !cp.checked) {
     cp.checked = true;
      cp.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // SELECT with value="1"
    document.querySelectorAll('select[name*="check_underage"]').forEach(sel => {
      sel.value = "1";
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // RADIO with value="1"
    document.querySelectorAll('input[type="radio"][name*="check_underage"][value="1"]').forEach(r => {
      r.checked = true;
      r.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // ===== sofort ====== 
    document.querySelectorAll('input[type="radio"]').forEach(r => {
      const key = (r.value + (r.nextElementSibling?.innerText || '')).toLowerCase();
       if (key.includes('ab sofort') || r.value === "0") {
        r.checked = true;
        r.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });



    // ===== FILE UPLOAD BUTTONS WITH SHORTCUTS =====
    const uploads = [
      { key: "1", label: ["lebenslauf", "cv", "attachmentFile"], name: "cv" },
      { key: "2", label: ["anschreiben", "cover"], name: "Cover Letter" },
      { key: "3", label: ["zeugnisse", "andere", "other"], name: "Other/Zeugnisse" }
    ];

    uploads.forEach((u, i) => {
    const input = findFileInput(u.label);
      if (!input) return;

      // create visible button
      createButton(`📄 ${u.name} (Press ${u.key})`, i * 50, input);

      // add keyboard shortcut
      document.addEventListener("keydown", e => {
        if (e.key === u.key) input.click();
      });
    });

     // ===== UNIVERSAL SHORTCUT 0 FOR SINGLE INPUT =====
    document.addEventListener("keydown", e => {
      if (e.key === '0') {
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.click();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === '0') {
         e.preventDefault();
         document.querySelector('#attachmentFile, input[name="attachmentFile"]')?.click();
      }
    });


    document.addEventListener('keydown', e => {
      if(e.key === '2') {
        const cvInput = document.querySelector('input[name*="cover"]');
        if(cvInput) cvInput.click();
      } 
    });


    document.addEventListener('keydown', e => {
      if(e.key === '1') {
        const cvInput = document.querySelector('input[name*="cv"]');
        if(cvInput) cvInput.click();
      } 
    });

    document.addEventListener('keydown', e => {
      if (e.key === '1') {
        e.preventDefault();
        document.querySelector('input[name="files[]"]')?.click();
      }
    });


    document.addEventListener('keydown', e => {
      if(e.key === '3') {
        const cvInput = document.querySelector('input[name*="other"]');
        if(cvInput) cvInput.click();
      } 
    });
    
    // ===== SUBMIT BUTTON SHORTCUTS =====
    document.addEventListener('keydown', e => {
      if (e.key === '.') {
        e.preventDefault();
        document.querySelector('button.send-button[type="submit"]')?.click()
        ||document.querySelector('form')?.requestSubmit();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === '*') {
        e.preventDefault();
        document.querySelectorAll('a, button').forEach(el => {
          if ((el.innerText || '').toLowerCase().includes('jetzt bewerben')) {
            el.click();
          }
        });
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === '*') {
        e.preventDefault();
        document.querySelectorAll('a, button').forEach(el => {
          if ((el.innerText || '').toLowerCase().includes('apply now')) {
            el.click();
          }
        });
      }
    });



    document.addEventListener('keydown', e => {
      if (e.key === '/') {
        e.preventDefault();
        document.querySelector('a.btn-apply-with[href*="/form"]')?.click();
      }
    });
   
    document.addEventListener('keydown', e => {
      if (e.key === '-') {
        e.preventDefault();
        document.querySelector('#applyWithCvAction')?.click();
      }
    });

    document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.querySelector('#apply-job-button')?.click();
      }
    });




    // Loop through all selects and choose B1 if available
    document.querySelectorAll('select').forEach(sel => {
      let found = false;
      [...sel.options].forEach(opt => {
        const key = (opt.value + opt.text).toLowerCase();
        if (key.includes('b1') || key.includes('agentur') || key.includes('hoch') || key.includes('entwick') || key.includes('bereit') || key.includes('drittstaat')) {
          sel.value = opt.value;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
          found = true;
        }
      });
    });




    document.querySelectorAll('select').forEach(sel => {
   [...sel.options].forEach(opt => {
    if (opt.value === "MA" || opt.text.trim() === "MA") {
      sel.value = opt.value;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
      });
    });

    let AUTO_ON = true;

    


  }, 1500); // wait for page to load

})();
