import config from './config.json';

export const addQuickButtons = () => {
  const qbEl = document.querySelector('#quick-buttons');

  config.quickButtons.forEach(section => {
    const sectionEl = document.createElement('section');

    const getSvg = name => {
      const TYPES = {
        b: 'brands',
        r: 'regular',
        s: 'solid',
      };

      const type = TYPES[name[2]];
      const fileName = name.slice(7);

      return require(`!raw-loader!@fortawesome/fontawesome-free/svgs/${type}/${fileName}.svg`)
        .default;
    };

    const buttonsHtml = section.buttons
      .map(
        button =>
          `<li><a title="${button.title}" href=${button.link}><span>${getSvg(
            button.class
          )}</span></a></li>`
      )
      .join('');

    sectionEl.innerHTML += buttonsHtml;
    qbEl.appendChild(sectionEl);
  });
};
