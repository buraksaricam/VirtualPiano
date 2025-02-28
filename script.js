document.addEventListener('DOMContentLoaded', () => {
  const keys = document.querySelectorAll('.key');
  const toggleNotesCheckbox = document.getElementById('toggle-notes');
  const toggleKeyInfoCheckbox = document.getElementById('toggle-key-info');
  const keyInfo = document.querySelector('.key-info');
  let isMouseDown = false;

const keyMap = {
  'a': 'C1', 's': 'D1', 'd': 'E1', 'f': 'F1', 'g': 'G1', 'h': 'A1', 'j': 'B1', 'k': 'C2', 
  'l': 'D2', 'p': 'Dsharp2', ';': 'E2',
  
  'q': 'Csharp', 'w': 'Dsharp', 'e': 'Fsharp', 'r': 'Gsharp', 't': 'Asharp', 'y': 'B1', 'u': 'Csharp2', 'i': 'Dsharp2', 
  'o': 'E2', 'l': 'Fsharp2',
  
  'z': 'F2', 'x': 'G2', 'c': 'A2', 'v': 'B2', 'b': 'C3', 'n': 'D3', 'm': 'E3', ',': 'F3', '.': 'G3', '/': 'A3',
  '\'': 'Asharp3', ']': 'B3'
};



  document.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });

  keys.forEach(key => {
    key.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isMouseDown = true;
      playKey(key);
    });
    key.addEventListener('mouseup', () => {
      isMouseDown = false;
      stopKey(key);
    });
    key.addEventListener('mouseover', () => {
      if (isMouseDown) {
        playKey(key);
      }
    });
    key.addEventListener('mouseleave', () => {
      stopKey(key);
    });
  });

  document.addEventListener('mouseup', () => {
    isMouseDown = false;
    keys.forEach(key => stopKey(key));
  });

  toggleNotesCheckbox.addEventListener('change', () => {
    const noteNames = document.querySelectorAll('.note-name');
    noteNames.forEach(noteName => {
      noteName.style.display = toggleNotesCheckbox.checked ? 'block' : 'none';
    });
  });

  toggleKeyInfoCheckbox.addEventListener('change', () => {
    keyInfo.style.display = toggleKeyInfoCheckbox.checked ? 'block' : 'none';
  });

  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (keyMap[key]) {
      const pianoKey = document.querySelector(`[data-note="${keyMap[key]}"]`);
      if (pianoKey && !pianoKey.classList.contains('pressed')) {
        playKey(pianoKey);
      }
    }
  });

  document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (keyMap[key]) {
      const pianoKey = document.querySelector(`[data-note="${keyMap[key]}"]`);
      if (pianoKey) {
        stopKey(pianoKey);
      }
    }
  });

  function playKey(key) {
    const note = key.dataset.note;
    const audio = new Audio(`sounds/${note}.mp3`);
    audio.currentTime = 0;
    audio.play();
    key.classList.add('pressed');
  }

  function stopKey(key) {
    key.classList.remove('pressed');
  }
});
