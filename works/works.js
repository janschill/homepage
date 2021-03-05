(() => {
  window.onload = () => {
    const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/')
    const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#')
    const SCHEM = $rdf.Namespace('https://schema.org/')
    const store = $rdf.graph()
    const fetch = $rdf.fetcher(store);
    const artistsUrl = store.sym('https://janschill.net/music/artists.ttl');

    function artistDom(artist) {
      const $li = document.createElement('li')
      $li.classList.add('artist-list-item')
      $li.style.display = 'inline-block'
      const $artistImg = `<img class="artist-cover" src="${artist.photo}"/><span class="artist-cover-after"></span>`
      const $artistName = `<h4 class="artist-name">${artist.name}</h4>`
      $li.innerHTML = $artistImg + $artistName
      document.querySelector('.artist-list').append($li)
    }

    function findValue(statements, predicate) {
      return statements.filter(st => st.predicate.value == predicate.value)
    }

    fetch.nowOrWhenFetched(artistsUrl, undefined, (ok, body, xhr) => {
      const artists = store.each(null, null, SCHEM('MusicGroup'))

      artists.forEach(artist => {
        const sts = store.statementsMatching($rdf.sym(artist.value), null, null, artistsUrl)
        const photo = findValue(sts, VCARD('hasPhoto'))[0].object.value
        const name = findValue(sts, FOAF('name'))[0].object.value
        artistDom({ name: name, photo: photo })
      })
    });
  }
})()
