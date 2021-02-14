import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import React from "react"
import { Link } from "react-router-dom"
import { Movie } from "src/types/Movie"

type Props = {
  movie: Movie
}

export const MovieItem: React.FC<Props> = ({ movie }) => {
  const toggleFavorites = (movie: Movie): void => {
    const favorites: Movie[] =
      JSON.parse(localStorage.getItem("favorites") as string) || []
    const index = favorites.findIndex((f) => f.id === movie.id)
    if (index >= 0) {
      favorites.splice(index, 1)
    } else {
      favorites.push(movie)
    }
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }

  return (
    <Grid item md={4} sm={6} xs={12}>
      <Card>
        <CardMedia
          image={process.env.REACT_APP_TBDB_IMAGE_URL + movie.backdrop_path}
          title={movie.title}
          style={{ height: 300 }}
        />
        <CardContent>
          <Typography component="h2" gutterBottom variant="h5">
            {movie.title}
          </Typography>
          <Typography>{movie.overview.substr(0, 130) + "..."}</Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={"/movie/" + movie.id}
            color="primary"
            size="small"
          >
            詳細を見る
          </Button>
          <IconButton onClick={() => toggleFavorites(movie)}>
            <FavoriteBorderIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}
