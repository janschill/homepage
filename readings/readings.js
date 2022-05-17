(() => {
  window.onload = () => {
    const SCHEM = $rdf.Namespace('https://schema.org/')
    const store = $rdf.graph()
    const fetch = $rdf.fetcher(store);
    const readingsUrl = store.sym('https://janschill.net/public/readings.ttl');

    function quoteDom(quote) {
      const $section = document.createElement('section')
      $section.classList.add('section')
      $section.classList.add('section--readings')
      const $article = document.createElement('article')
      $section.append($article)
      const $blockquote = document.createElement('blockquote')
      $article.append($blockquote)
      $blockquote.classList.add('quotation')
      const $authorDiv = document.createElement('div')
      $article.append($authorDiv)
      $authorDiv.classList.add('author')

      $quotationText.innerText = `“${quote.text}”`
      $authorDiv.innerText = quote.spokenByCharacter

      document.querySelector('.main').appendChild($section)
    }

    function findValue(statements, predicate) {
      return statements.filter(st => st.predicate.value == predicate.value)
    }

    fetch.nowOrWhenFetched(readingsUrl, undefined, (ok, body, xhr) => {
      const quotations = store.each(null, null, SCHEM('Quotation'))

      quotations.forEach(quotation => {
        const sts = store.statementsMatching($rdf.sym(quotation.value), null, null, readingsUrl)
        const text = findValue(sts, SCHEM('text'))[0].object.value
        const author = findValue(sts, SCHEM('spokenByCharacter'))[0].object.value
        quoteDom({ text: text, author: author })
      })
    });
  }
})()
