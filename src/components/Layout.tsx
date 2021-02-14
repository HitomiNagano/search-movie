import { AppBar, Button, Toolbar, Typography } from "@material-ui/core"
import FavoriteIcon from "@material-ui/icons/Favorite"
import React from "react"
import { Link, useHistory } from "react-router-dom"

type Props = {
  children: React.ReactChild | React.ReactChild[]
}

export const Layout: React.FC<Props> = ({ children }) => {
  const history = useHistory()

  return (
    <div style={{ margin: "100px auto" }}>
      <AppBar position="absolute">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            onClick={() => {
              history.push("/")
            }}
          >
            映画検索
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<FavoriteIcon />}
            component={Link}
            to={"/favorites"}
          >
            お気に入り
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  )
}
