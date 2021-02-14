import {
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@material-ui/core"
import axios from "axios"
import React, { useState } from "react"
import { Layout } from "src/components/Layout"
import { MovieItem } from "src/components/MovieItem"
import { Movie } from "src/types/Movie"

const apiUrl =
  process.env.REACT_APP_TBDB_API_ENDPOINT +
  "/search/movie?api_key=" +
  process.env.REACT_APP_TBDB_API_KEY

export const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const searchMovies = async (): Promise<void> => {
    if (searchValue.trim() === "") {
      return undefined
    }
    try {
      const response = await axios.get(`${apiUrl}&query=${searchValue}`)
      if (response.data.results.length === 0) {
        return setMessage("検索した映画が見つかりませんでした")
      }
      setMovies(response.data.results)
      setMessage("")
    } catch (error) {
      console.error(error)
      setMessage("取得できませんでした。時間を置いて再度実行してください")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Container maxWidth="sm" style={{ marginBottom: 64 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="映画名、テレビ番組名、人物名で検索..."
          autoFocus
          style={{ marginBottom: 24 }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          helperText={message !== "" && message}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            searchMovies()
          }}
        >
          検索する
        </Button>
      </Container>
      <Container maxWidth="lg">
        {loading ? (
          <Grid container justify="center" alignItems="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container spacing={4}>
            {movies.length > 0 &&
              movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)}
          </Grid>
        )}
      </Container>
    </Layout>
  )
}
