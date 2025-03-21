import React, { useState, useEffect } from "react";
import { Modal, Fade, Box, Typography, Button, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";

function CartDetails({ cart, open, handleClose, setCart, setOpenModal }) {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [promotion, setPromotion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsOrderPopupOpen(false);
    setTimeLeft(60);
  };

  useEffect(() => {
    if (cart.length > 0) {
      const updatedList = cart.map((movie, index) => ({
        id: index + 1,
        title: movie.title,
        price: 1000,
      }));
      setList(updatedList);
    }
  }, [cart]);

  useEffect(() => {
    setTotal(list.length * 1000);
  }, [list]);

  useEffect(() => {
    if (cart.length > 5) {
      setPromotion(2);
      setDiscount(total * 0.2);
    } else if (cart.length > 3) {
      setPromotion(1);
      setDiscount(total * 0.1);
    } else {
      setPromotion(0);
      setDiscount(0);
    }
  }, [cart, total]);

  const handleOrder = () => {
    setIsOrderPopupOpen(true);
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          clearInterval(countdown); // Stop countdown
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second


  };

  const handleClearCart = () => {
    // ขอการยืนยันจากผู้ใช้ก่อน
    const isConfirmed = window.confirm(
      "Are you sure you want to clear all items from your cart?"
    );

    if (isConfirmed) {
      setCart([]); // ลบสินค้าทั้งหมดในตะกร้า
      console.info("Cart has been cleared.");
    } else {
      console.info("Cart clear action was cancelled.");
    }

    setTotal(0);
    setDiscount(0);
    setPromotion(0);
    setIsOrderPopupOpen(false);
    setList([]);
    setOpenModal(false);
    

  };

  const finalPrice = total - discount;

  return (
    <>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#555",
              padding: 4,
              borderRadius: 2,
              boxShadow: 24,
              width: "50%",
              maxHeight: "60vh",
              height: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isOrderPopupOpen === true ? (
              <Box>
                <Typography variant="h6" color="#fff" gutterBottom>
                  Please make your payment within 1 minute.
                </Typography>
                <Typography variant="body1" color="#fff">
                  Payment should be made to:{" "}
                  <strong>Bank Account: 123-456-789</strong>
                </Typography>
                <Typography variant="h4" color="#fff" sx={{ marginTop: 2 }}>
                  Time Remaining: {timeLeft}s
                </Typography>
                <Box sx={{ marginTop: 3 }}>
                  {timeLeft === 0 ? (
                    <Typography variant="h6" color="red">
                      Time is up! Please try again.
                    </Typography>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleClosePopup}
                      sx={{ marginTop: 2 }}
                    >
                      Close
                    </Button>
                  )}
                </Box>
              </Box>
            ) : (
              <Grid
                container
                spacing={2}
                sx={{ width: "100%", height: "100%" }}
              >
                <Grid item size={8}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "calc(60vh - 100px)",
                      borderRadius: 2,
                      backgroundColor: "#fff",
                      overflowY: "auto",
                    }}
                  >
                    <Box padding={2}>
                      {cart.map((movie, index) => (
                        <Box
                          key={index}
                          sx={{
                            marginBottom: 2,
                            maxWidth: "100%",
                            position: "relative",
                            borderRadius: 2,
                            backgroundColor: "#fff",
                            boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item size={3}>
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
                                  borderRadius: 4,
                                }}
                              />
                            </Grid>
                            <Grid item size={9}>
                              <Box>
                                <Typography
                                  variant="h6"
                                  color="black"
                                  sx={{
                                    fontWeight: "bold",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {movie.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {movie.overview.length > 100
                                    ? movie.overview.slice(0, 100) + "..."
                                    : movie.overview}
                                </Typography>
                                {/* <Box
                                  sx={{
                                    width: "30px",
                                    height: "30px",
                                    display: "flex",
                                    position: "absolute",
                                    bottom: 10,
                                    right: 10,
                                    backgroundColor: "#fff",
                                    border: "1px solid #555",
                                    color: "white",
                                    cursor: "pointer",
                                    borderRadius: 1,

                                    justifyContent: "center",
                                    alignItems: "center",
                                    "&:hover": {
                                      backgroundColor: "#999",
                                      border: "1px solid #999",
                                    },
                                  }}
                                >
                                  <DeleteIcon
                                    style={{ color: "#555", fontSize: "20px" }}
                                  />
                                </Box> */}
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Grid>
                <Grid item size={4}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "calc(60vh - 100px)",
                      borderRadius: 2,
                      backgroundColor: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      padding={2}
                      sx={{
                        overflowY: "auto",
                        maxHeight: "100%", // กำหนดให้กล่องนี้ไม่เกินความสูงของพ่อแม่
                      }}
                    >
                      {list.map((movie, index) => (
                        <Box key={index}>
                          <Grid container>
                            <Grid item size={9}>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 300,
                                  color: "gray",
                                }}
                              >
                                - {movie.title}
                              </Typography>
                            </Grid>
                            <Grid item size={3}>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 300,
                                  color: "gray",
                                }}
                              >
                                1000
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                      <Grid container>
                        <Grid item size={9}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 300,
                              color: "gray",
                            }}
                          >
                            Total
                          </Typography>
                        </Grid>
                        <Grid item size={3}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 300,
                              color: "gray",
                            }}
                          >
                            {1000 * list.length}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box padding={2}>
                      <Grid container paddingY={1}>
                        <Grid item size={9}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 300,
                              color: "gray",
                            }}
                          >
                            {promotion === 1
                              ? "Promotion - More than 3 items, 10% off"
                              : promotion === 2
                              ? "Promotion - More than 5 items, 20% off"
                              : "No Promotion"}
                          </Typography>
                        </Grid>
                        <Grid item size={9}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 300,
                              color: "gray",
                            }}
                          >
                            Discount
                          </Typography>
                        </Grid>
                        <Grid item size={3}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 300,
                              color: "gray",
                            }}
                          >
                            {discount}
                          </Typography>
                        </Grid>
                        <Grid item size={9}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 300,
                              color: "gray",
                            }}
                          >
                            Total Price
                          </Typography>
                        </Grid>
                        <Grid item size={3}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 300,
                              color: "gray",
                            }}
                          >
                            {finalPrice}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Link
                          component="button"
                          variant="body2"
                          onClick={handleClearCart}
                        >
                          <Typography sx={{ fontSize: "14px" }}>
                            Clear All
                          </Typography>
                        </Link>
                        <Button
                          sx={{
                            width: "80px",
                            height: "30px",
                            border: "1px solid #555",
                            padding: "10px 20px",
                            color: "black",
                            backgroundColor: "#fff",
                            "&:hover": {
                              backgroundColor: "#f5f5f5",
                            },
                          }}
                          onClick={handleOrder}
                        >
                          <Typography sx={{ fontSize: "10px" }}>
                            Check Out
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default CartDetails;
