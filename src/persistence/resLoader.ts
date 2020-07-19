function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
    document.head.appendChild(script);
  });
}

function loadStyle(src: string) {
  return new Promise((resolve, reject) => {
    const style = document.createElement('link');
    style.href = src;
    style.rel = 'stylesheet';
    style.onload = () => {
      resolve();
    };
    style.onerror = () => {
      reject();
    };
    document.head.appendChild(style);
  });
}

export default {
  loadScript, loadStyle,
};
