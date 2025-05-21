document.addEventListener('DOMContentLoaded', () => {
  // Sol tərəfdə toggle buttonlar
  const toggles = document.querySelectorAll('.toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      content.classList.toggle('show');
      toggle.style.backgroundColor = content.classList.contains('show') ? '#666' : '#444';
    });
  });

  const editBtn = document.getElementById('editBtn');
  const saveBtn = document.getElementById('saveBtn');
  const rightSection = document.querySelector('.right');
  const leftSection = document.querySelector('.left');

  let isEditing = false;

  editBtn.addEventListener('click', () => {
    if (!isEditing) {
      // Sağ tərəfdəki p və li elementləri redaktəyə aç
      const rightTexts = rightSection.querySelectorAll('p, li');
      rightTexts.forEach(el => {
        const input = document.createElement(el.tagName === 'LI' ? 'input' : 'textarea');
        input.value = el.textContent;
        input.className = 'edit-input';
        input.style.width = '100%';
        input.style.boxSizing = 'border-box';
        if (el.tagName !== 'LI') input.rows = 3;
        el.replaceWith(input);
      });

      // Sol tərəfdəki p və li elementləri redaktəyə aç
      const leftTexts = leftSection.querySelectorAll('.content p, .content li');
      leftTexts.forEach(el => {
        const input = document.createElement('input');
        input.value = el.textContent;
        input.className = 'edit-input';
        input.style.width = '100%';
        input.style.boxSizing = 'border-box';
        el.replaceWith(input);
      });

      isEditing = true;
      editBtn.disabled = true;
      saveBtn.disabled = false;
    }
  });

  saveBtn.addEventListener('click', () => {
    if (isEditing) {
      const inputs = document.querySelectorAll('.edit-input');
      inputs.forEach(input => {
        const parent = input.closest('.content') || rightSection;
        const newEl = document.createElement(parent.classList.contains('content') ? 'p' : (input.rows ? 'p' : 'li'));
        newEl.textContent = input.value;
        input.replaceWith(newEl);
      });

      isEditing = false;
      editBtn.disabled = false;
      saveBtn.disabled = true;
    }
  });
});