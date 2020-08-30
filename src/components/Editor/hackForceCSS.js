const forceColor = () => {
  const frames = document.getElementsByClassName('k-iframe');
  if (frames) {
    var styleElement = document.createElement('style');
    var styleElementText = document.createTextNode(
      'p { margin-bottom: 3px !important; };',
    );
    styleElement.appendChild(styleElementText);

    var linkElement = document.createElement('link');
    linkElement.href =
      'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
    linkElement.rel = 'stylesheet';

    for (let i = 0; i < frames.length; i++) {
      frames[i].contentWindow.document.head.appendChild(linkElement);
      frames[i].contentWindow.document.head.appendChild(styleElement);
      const style = frames[i].contentWindow.document.body.style;
      style.color = '#dcddde';
      style.fontSize = 14;
      style.fontFamily = 'Roboto';
      style.paddingTop = 10;
    }
  }
};
export default forceColor;
