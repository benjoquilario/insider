const capitalizeName = name => {
  if (name) {
    const names = name.split(' ');
    const namesUpper = [];

    for (const n of names) {
      namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }

    return namesUpper.join(' ');
  }
};

export default capitalizeName;
