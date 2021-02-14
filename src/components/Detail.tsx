import { Container, Grid } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "src/components/Layout"
import { MovieDetail } from "src/types/MovieDetail"

type ParamTypes = {
  movieID: string
}

export const Detail: React.FC = () => {
  const [movie, setMovie] = useState<undefined | MovieDetail>(undefined)
  const { movieID } = useParams<ParamTypes>()
  const [loading, setLoading] = useState(false)

  const getMovieDetail = async (movieID: string) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_TBDB_API_ENDPOINT}/movie/${movieID}?api_key=${process.env.REACT_APP_TBDB_API_KEY}`
      )
      setMovie(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMovieDetail(movieID)
  }, [])

  if (loading) {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    )
  }
  if (movie == null) {
    return <Container maxWidth="md">映画が見つかりませんでした</Container>
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        <main>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <img
                src={process.env.REACT_APP_TBDB_IMAGE_URL + movie.poster_path}
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
            <Grid item xs={8}>
              <h1>{movie.title}</h1>
              <h2>ジャンル</h2>
              <ul>
                {movie.genres.map((g) => (
                  <li key={g.id}>{g.name}</li>
                ))}
              </ul>
              <h2>公開日</h2>
              <p>{movie.release_date}</p>
              <h2>ユーザースコア</h2>
              <p>{movie.vote_average}</p>
              <h2>概要</h2>
              <p>{movie.overview}</p>
            </Grid>
          </Grid>
        </main>
      </Container>
    </Layout>
  )
}
