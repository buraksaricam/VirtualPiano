document.addEventListener('DOMContentLoaded', () => {
  const keys = document.querySelectorAll('.key');
  const toggleNotesCheckbox = document.getElementById('toggle-notes');
  const toggleKeyInfoCheckbox = document.getElementById('toggle-key-info');
  const keyInfo = document.querySelector('.key-info');
  let isMouseDown = false;

const keyMap = {
  'z': 'C1', 's': 'D1', 'x': 'E1', 'd': 'F1', 'c': 'G1', 'v': 'A1', 'b': 'B1', 'h': 'C2', 
  'n': 'D2', 'j': 'E2', 'm': 'F2',
  
  'q': 'Csharp', 'w': 'Dsharp', 'e': 'Fsharp', 'r': 'Gsharp', 't': 'Asharp', 'y': 'B2', 
  'u': 'Csharp2', 'i': 'Dsharp2', 'o': 'Fsharp2', 'p': 'Gsharp2',
  
  '1': 'A2', '2': 'B2', '3': 'C3', '4': 'D3', '5': 'E3', '6': 'F3', '7': 'G3', '8': 'A3', 
  '9': 'B3', '0': 'C4'
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
