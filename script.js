document.addEventListener('DOMContentLoaded', () => {
  const keys = document.querySelectorAll('.key');
  const toggleNotesCheckbox = document.getElementById('toggle-notes');
  const toggleKeyInfoCheckbox = document.getElementById('toggle-key-info');
  const keyInfo = document.querySelector('.key-info');
  let isMouseDown = false;

const keyMap = {
    'z': 'C1', 's': 'Csharp', 'x': 'D1', 'd': 'Dsharp', 'c': 'E1', 'v': 'F1',
    'g': 'Fsharp', 'b': 'G1', 'h': 'Gsharp', 'n': 'A1', 'j': 'Asharp', 'm': 'B1',
    ',': 'C2', 'l': 'Csharp2', '.': 'D2', 'ş': 'Dsharp2', '/': 'E2',
    'q': 'F2', '2': 'Fsharp2', 'w': 'G2', '3': 'Gsharp2', 'e': 'A2',
    '4': 'Asharp2', 'r': 'B2', 't': 'C3', '6': 'Csharp3', 'y': 'D3',
    '7': 'Dsharp3', 'u': 'E3', 'ı': 'F3', '9': 'Fsharp3', 'o': 'G3',
    '0': 'Gsharp3', 'p': 'A3', 'l': 'Asharp3', 'k': 'B3'
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
