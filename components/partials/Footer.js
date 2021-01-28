const Footer = user => {
  const blog = !user.blog ? `` : `<p><a href="${user.blog}">${user.blog.split('://')[1]}</a></p>`;
  const company = !user.company ? `` : `<p>${user.company}</p>`;
  const location = !user.location ? `` : `<p>${user.location}</p>`;
  const fullName = !user.name ? `` : `<p><b>${user.name}</b></p>`;

  return `<footer><img src="${user.avatar_url}" alt="${user.name}"/><section>${fullName}${blog}${location}${company}</section></footer>`
}

module.exports = {
  Footer
}