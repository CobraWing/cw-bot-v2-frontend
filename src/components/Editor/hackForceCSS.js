const forceColor = () => {
  const frames = document.getElementsByClassName('k-iframe');
  if (frames) {
    var styleElement = document.createElement('style');
    var styleElementText = document.createTextNode(
      'p { margin-bottom: 3px !important; };',
    );
    styleElement.appendChild(styleElementText);
    for (let i = 0; i < frames.length; i++) {
      frames[i].contentWindow.document.head.appendChild(styleElement);
      const style = frames[i].contentWindow.document.body.style;
      style.color = '#dcddde';
      style.fontSize = 16;
      style.fontFamily = 'Roboto';
      style.paddingTop = 10;
    }
  }
};
export default forceColor;
