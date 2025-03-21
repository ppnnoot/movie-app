import React from "react";
import Grid from "@mui/material/Grid2"; 
import { Button, Typography, Box, Rating } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const MovieList = ({ movies, loading, error, addToCart }) => {
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <div>
      <h1>Movie List</h1>
      <div>
        <Grid container spacing={2}>
          {movies.length % 3 === 0}
          {movies.map((movie) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={movie.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                  height: "100%",
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                <Box sx={{ flex: "1 1 40%", minWidth: "40%", height: "100%" }}>
                  {movie.poster_path && (
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                      }
                      alt={movie.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 8,
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ flex: "1 1 60%", height: "100%", paddingRight: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      lineHeight: 1.1,
                      paddingTop: 2,
                      color: "#333",
                    }}
                  >
                    {movie.title.length > 30
                      ? movie.title.slice(0, 30) + "..."
                      : movie.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#555", paddingTop: 1 }}
                  >
                    {movie.overview.length > 100
                      ? movie.overview.slice(0, 100) + "..."
                      : movie.overview}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      position: "absolute",
                      bottom: 8,
                      gap: 1,
                    }}
                  >
                    <Rating
                      value={movie.vote_average / 2}
                      precision={0.5}
                      readOnly
                      sx={{
                        fontSize: "1rem", 
                      }}
                    />

                    <Button
                      onClick={() => addToCart(movie)}
                      sx={{
                        display: "flex",
                        justifyContent: "center", 
                        alignItems: "center", 
                        height: "100%",
                        border: "2px solid #FF9463",
                        borderRadius: 2,
                        gap: 0.5, 
                        ":hover": {
                          backgroundColor: "#FFC28B",
                        },
                      }}
                    >
                      <ShoppingCartOutlinedIcon
                        style={{ fontSize: "20px", color: "#FF9463" }}
                      />
                      <Typography
                        variant="caption"
                        color="#FF9463"
                        fontWeight={"bold"}
                        marginTop={"auto"}
                      >
                        ฿1000
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default MovieList;
