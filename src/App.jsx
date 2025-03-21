import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import MovieList from "./component/Movielist";
import Container from "./component/Container";
import CartButton from "./component/CartButton";
import CartDetails from "./component/CartDetails";
import axios from "axios";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const addToCart = (movie) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, movie];
      // บันทึกข้อมูลตะกร้าไปยัง localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleCartClick = () => {
    setOpenModal(true);
    console.log("cart");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchMovies = async (searchQuery = '1') => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=39a3f4065da732655864aec28f0506d1&query=${searchQuery}`;

    try {
      const response = await axios.get(apiUrl);
      let movieResults = response.data.results;

      movieResults = movieResults.filter((movie) => movie.poster_path !== null);

      setMovies(movieResults);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart)); // โหลดข้อมูลตะกร้าจาก localStorage
    }
  }, []);

  const handleSearch = (searchQuery) => {
    setLoading(true);
    fetchMovies(searchQuery);
  };
  
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Container>
        <MovieList movies={movies} loading={loading} error={error} addToCart={addToCart} />
      </Container>
      <CartButton cart={cart} onClick={handleCartClick} />
      <CartDetails 
        cart={cart} 
        open={openModal} 
        handleClose={handleCloseModal}
        setCart={setCart}
        setOpenModal={setOpenModal}        
        />
    </>
  );
};

export default App;
