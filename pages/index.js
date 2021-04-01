import Head from 'next/head'

export default function Home() {

  return (
    <div>
      <Head>
        <title>Vyber mi jídlo</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="static/jquery.min.js"></script>
        <script defer src="static/slots.js" ></script>
      </Head>

      <main>

        <div id="stage" className="perspective-on">
          <div id="rotate">
            <div id="ring" className="ring"></div>
          </div>
          <div>
            <button className="go">Vyber jídlo</button>
          </div>
          <div>
            <a href="?t=hk" className="type">HK</a>
            <a href="?t=emoji" className="type">Emoji</a>
            <a href="?t=level5vegan" className="type">Ultravegan</a>
          </div>

          <div className="hidden">
            <label>
              <input type="checkbox" id="xray" />
                Show inner workings
			    </label>
            <label>
              <input type="checkbox" id="perspective" />
                  Toggle perspective
			    </label>
          </div>

        </div>
      </main>

    </div>
  )
}
