import { Container, Grid } from "@material-ui/core"
import React from "react"
import { MovieItem } from "src/components/MovieItem"
import { Movie } from "src/types/Movie"

import { Layout } from "./Layout"

export const Favorites: React.FC = () => {
  const movies: Movie[] = JSON.parse(
    localStorage.getItem("favorites") as string
  )

  return (
    <Layout>
      <Container maxWidth="lg">
        <h1>お気に入り</h1>
        {movies == null || movies.length === 0 ? (
          <p>あなたはお気に入りの映画を追加していません。</p>
        ) : (
          <Grid container spacing={4}>
            {movies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  )
}
