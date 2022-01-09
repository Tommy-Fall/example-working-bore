import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import sanity from "../lib/sanity";
import listStyles from "../styles/list";
import imageUrlFor from "../utils/imageUrlFor";
import { useEffect, useState } from "react";
import ModalRoute from '../components/ModalRoute'

const query = `*[_type == "movie"] {
  _id,
  title,
  releaseDate,
  poster,
  "posterAspect": poster.asset->.metadata.dimensions.aspectRatio,
  "director": crewMembers[job == "Director"][0].person->name
}[0...50]
`;

const Movies = (props) => {
  const [mines, setMines] = useState(props.mines)
  const [modal, setModal] = useState(false)
  useEffect(()=>{
    window.onpopstate = function () {
      setModal(false)
    }
    // console.log('sefes')
    // async function fetchData() {
    //   const res = await fetch(`http://localhost:80/mine`);
    //   let miness = await res.json()
    //   console.log(miness)
    //   setMines(miness)
    // }
    // fetchData()
    
  },[])

  
  return (
    <Layout>
      <div className="movies">
        <ul className="list">
          {mines.map(movie => (
            <div>
              <div>{movie.title}</div>
              <Link href="/movie/[id]" as={`/movie/movie_926`}>Pepe</Link>  
            </div>
            // <li key={movie._id} className="list__item">
            //   <Link href="/movie/[id]" as={`/movie/${movie._id}`}>
            //     <a>
            //       {movie.poster && (
            //         <img
            //           src={imageUrlFor(movie.poster)
            //             .ignoreImageParams()
            //             .width(300)}
            //           width="100"
            //           height={100 / movie.posterAspect}
            //         />
            //       )}
            //       <div style={{ paddingTop: "0.2em" }}>
            //         {movie.releaseDate.substr(0, 4)}
            //       </div>
            //       <h3>{movie.title}</h3>
            //       {movie.director && (
            //         <span className="movies-list__directed-by">
            //           Directed by {movie.director}
            //         </span>
            //       )}
            //     </a>
            //   </Link>
            // </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .movies {
          padding: 1rem;
        }
        .movies-list__directed-by {
          display: block;
          font-size: 1rem;
        }
      `}</style>
      <style jsx>{listStyles}</style>
      <button onClick={() => { setModal(true);  window.history.pushState('', '', '/test') }} style={{ position: 'fixed', bottom: '0' }}>Clicks</button>
      <ModalRoute state={modal} closeModal={() => { setModal(false); window.history.back() }}>
          <div>Hello</div>
      </ModalRoute>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  let mines = []
  console.log(ctx.req.url)
  const res = await fetch(`http://localhost:80/mine`, {
    method: 'GET',
  })
  mines = await res.json()
  return {
    props: { mines } // will be passed to the page component as props
  };

  // const mines = await sanity.fetch(query);
  // return {
  //   props: { mines } // will be passed to the page component as props
  // };
};

export default Movies;
