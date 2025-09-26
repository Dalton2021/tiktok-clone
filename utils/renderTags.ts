const handleRenderTags = (tags?: string[]): string | void => {
  if (!tags) return;

  let tagString: string = '';

  for (let i = 0; i < tags.length; i++) {
    let c = '';
    if (i >= 1) {
      c += `, `;
    }

    c += '#'

    tagString += `${c}${tags[i]}`;
  }

  return tagString;
};

export default handleRenderTags;
